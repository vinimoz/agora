<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCA\Agora\Db\LotteryRun;
use OCA\Agora\Db\LotteryRunMapper;
use OCA\Agora\Db\LotterySelection;
use OCA\Agora\Db\LotterySelectionMapper;
use OCA\Agora\Db\Participation;
use OCA\Agora\Db\ParticipationMapper;
use OCA\Agora\Exceptions\Exception;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCA\Agora\UserSession;
use Psr\Log\LoggerInterface;

class LotteryService
{
    public function __construct(
        private ParticipationMapper $participationMapper,
        private LotteryRunMapper $lotteryRunMapper,
        private LotterySelectionMapper $lotterySelectionMapper,
        private IGroupManager $groupManager,
        private IUserManager $userManager,
        private LoggerInterface $logger,
        private UserSession $userSession,
    ) {
    }

    /**
     * Get lottery status for a target
     */
    public function getLotteryStatus(string $targetType, int $targetId): array
    {
        $participation = $this->participationMapper->findByTarget($targetType, $targetId);
        if ($participation === null || !$participation->isLottery()) {
            return [
                'has_lottery' => false,
                'status' => 'not_configured',
            ];
        }

        $latestRun = $this->lotteryRunMapper->findLatestByParticipationId($participation->getId());
        if ($latestRun === null) {
            return [
                'has_lottery' => true,
                'status' => 'not_run',
                'participation_id' => $participation->getId(),
            ];
        }

        return [
            'has_lottery' => true,
            'status' => $latestRun->getStatus(),
            'is_validated' => $latestRun->isValidated(),
            'run' => $latestRun->jsonSerialize(),
            'participation_id' => $participation->getId(),
            'can_run' => $latestRun->isFailed() || $latestRun->isCompleted(),
            'can_validate' => $latestRun->isCompleted() && !$latestRun->isValidated(),
        ];
    }

    /**
     * Run lottery with full validation
     */
    public function runLottery(Participation $participation, ?string $seed = null): LotteryRun
{
    if ($participation->getPolicyType() !== Participation::POLICY_LOTTERY) {
        throw new Exception('Participation policy is not a lottery');
    }

    $participationId = $participation->getId();
    if ($participationId === null) {
        throw new Exception('Participation policy must be persisted before running the lottery');
    }

    // Guard: one active/completed run per participation
    $latest = $this->lotteryRunMapper->findLatestByParticipationId($participationId);
    if ($latest !== null && in_array($latest->getStatus(), [
        LotteryRun::STATUS_PENDING,
        LotteryRun::STATUS_RUNNING,
        LotteryRun::STATUS_COMPLETED,
        LotteryRun::STATUS_VALIDATED,
    ], true)) {
        throw new Exception('A lottery run already exists for this participation; reset first');
    }

    $method = $participation->getLotteryMethod();
    $count  = $participation->getLotteryCount();
    $pool   = $this->buildPoolFromPolicy($participation);
    $seed ??= $this->generateSeed();

    // Create the run row (running)
    $run = new LotteryRun();
    $run->setParticipationId($participationId);
    $run->setSeed($seed);
    $run->setStatus(LotteryRun::STATUS_RUNNING);
    $run->setPoolSize(count($pool));
    $run->setSelectionCount(0);
    $run->setCreatedAt(time());
    $run->setMetadata([
        'executed_by' => $this->userSession->getCurrentUserId(),
        'method'      => $method,
        'requested'   => $count,
    ]);
    $run = $this->lotteryRunMapper->insert($run);

    try {
        if ($method !== Participation::LOTTERY_METHOD_RANDOM) {
            throw new Exception("Lottery method '{$method}' is not implemented");
        }
        if (count($pool) < $count) {
            throw new Exception(sprintf(
                'Not enough eligible participants: pool=%d, requested=%d',
                count($pool),
                $count
            ));
        }

        $selected = $this->selectRandom($pool, $count, $seed);

        $rank = 1;
        foreach ($selected as $userId) {
            $sel = new LotterySelection();
            $sel->setParticipationId($participationId);
            $sel->setRunId($run->getId());
            $sel->setSelectedUserId($userId);
            $sel->setRank($rank++);
            $sel->setStatus(LotterySelection::STATUS_PENDING);
            $sel->setSelectedAt(time());
            $sel->setExpiresAt(time() + 7 * 86400);
            $this->lotterySelectionMapper->insert($sel);
        }

        $run->setStatus(LotteryRun::STATUS_COMPLETED);
        $run->setSelectionCount(count($selected));
        $run->setCompletedAt(time());
        $run->setResultSummary([
            'method'         => $method,
            'requested_size' => $count,
            'pool_size'      => count($pool),
            'selected'       => array_values($selected),
            'seed'           => $seed,
        ]);
        return $this->lotteryRunMapper->update($run);

    } catch (\Throwable $e) {
        $run->setStatus(LotteryRun::STATUS_FAILED);
        $run->setCompletedAt(time());
        $meta = $run->getMetadata() ?? [];
        $meta['error'] = $e->getMessage();
        $run->setMetadata($meta);
        $this->lotteryRunMapper->update($run);
        throw $e;
    }
    }

    /**
     * Validate a completed lottery run
     */
    public function validateLottery(int $runId): LotteryRun
    {
	    $run = $this->lotteryRunMapper->find($runId);
	    if ($run === null) {
		    throw new Exception('Lottery run not found');
	    }
	    $this->logger->warning('validateLottery - find result', [
		    'runId' => $runId,
		    'type' => gettype($run),
		    'is_object' => is_object($run),
		    'class' => is_object($run) ? get_class($run) : 'not_object'
	    ]);

	    if (!$run->isCompleted()) {
		    throw new Exception('Only completed lottery runs can be validated');
	    }

	    if ($run->isValidated()) {
		    throw new Exception('Lottery run is already validated');
	    }

	    $run->setStatus(LotteryRun::STATUS_VALIDATED);
	    $metadata = $run->getMetadata() ?? [];
	    $metadata['validated_by'] = $this->userSession->getCurrentUserId();
	    $metadata['validated_at'] = time();
	    $run->setMetadata($metadata);
	    $this->lotteryRunMapper->update($run);

	    $this->logger->warning('Lottery validated', [
		    'run_id' => $runId,
		    'validated_by' => $this->userSession->getCurrentUserId(),
	    ]);

	    return $run;
    }

    /**
     * Cancel a lottery run (only if not validated)
     */
    public function cancelLottery(int $runId, string $reason): LotteryRun
    {
	    $run = $this->lotteryRunMapper->find($runId);
	    if ($run === null) {
		    throw new Exception('Lottery run not found');
	    }

	    if ($run->isValidated()) {
		    throw new Exception('Cannot cancel a validated lottery run');
	    }

	    if (!$run->isCompleted() && !$run->isFailed()) {
		    throw new Exception('Only completed or failed runs can be cancelled');
	    }

	    $run->setStatus(LotteryRun::STATUS_CANCELLED);
	    $metadata = $run->getMetadata() ?? [];
	    $metadata['cancelled_by'] = $this->userSession->getCurrentUserId();
	    $metadata['cancelled_at'] = time();
	    $metadata['cancel_reason'] = $reason;
	    $run->setMetadata($metadata);
	    $this->lotteryRunMapper->update($run);

	    $this->logger->warning('Lottery cancelled', [
		    'run_id' => $runId,
		    'reason' => $reason,
		    'cancelled_by' => $this->userSession->getCurrentUserId(),
	    ]);

	    return $run;
    }

    /**
     * Get eligible pool for a target (without running lottery)
     */
    public function getEligiblePool(string $targetType, int $targetId): array
    {
	    $participation = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($participation === null || !$participation->isLottery()) {
		    return [];
	    }

	    return $this->buildPoolFromPolicy($participation);
    }

    /**
     * Get lottery audit trail
     */
    public function getAuditTrail(int $participationId): array
    {
	    $runs = $this->lotteryRunMapper->findByParticipationId($participationId);
	    $audit = [];

	    foreach ($runs as $run) {
		    $selections = $this->lotterySelectionMapper->findByRunId($run->getId());
		    $audit[] = [
			    'run' => $run->jsonSerialize(),
			    'selections' => array_map(fn($s) => $s->jsonSerialize(), $selections),
			    'status_history' => $this->getStatusHistory($run),
		    ];
	    }

	    return $audit;
    }

    // ====================================================================
    // PRIVATE HELPERS
    // ====================================================================

    private function buildPoolFromPolicy(Participation $participation): array
    {
	    $config = $participation->getPolicyConfig();
	    $mode = $config['mode'] ?? Participation::LOTTERY_MODE_USERS;

	    if ($mode === Participation::LOTTERY_MODE_GROUPS) {
		    $groupIds = $config['source_groups'] ?? [];
		    return $this->getUsersFromGroups($groupIds);
	    }

	    // For 'users' mode, get all users (or from a specific list if configured)
	    if ($mode === Participation::LOTTERY_MODE_USERS) {
		    // If specific users are configured, use them
		    if (isset($config['user_ids']) && !empty($config['user_ids'])) {
			    return $config['user_ids'];
		    }
		    // Otherwise, get all active users
		    return array_map(
			    fn($user) => $user->getUID(),
			    $this->userManager->search('')
		    );
	    }

	    return [];
    }

    private function getUsersFromGroups(array $groupIds): array
    {
	    $users = [];
	    foreach ($groupIds as $groupId) {
		    $group = $this->groupManager->get($groupId);
		    if ($group !== null) {
			    $groupUsers = $group->getUsers();
			    foreach ($groupUsers as $user) {
				    $users[] = $user->getUID();
			    }
		    }
	    }
	    return array_values(array_unique($users));
    }

    private function getPoolBuildInfo(Participation $participation): array
    {
	    $config = $participation->getPolicyConfig();
	    $mode = $config['mode'] ?? Participation::LOTTERY_MODE_USERS;

	    return [
		    'mode' => $mode,
		    'source_groups' => $config['source_groups'] ?? [],
		    'has_specific_users' => isset($config['user_ids']) && !empty($config['user_ids']),
	    ];
    }

    private function selectRandom(array $pool, int $count, string $seed): array
    {
	    $pool = array_values($pool);       // ensure list
	    $n = count($pool);
	    $keys = range(0, $n - 1);

	    // Deterministic Fisher-Yates using an explicit hash-based RNG
	    $hash = hash('sha256', $seed, true);
	    $state = unpack('N', substr($hash, 0, 4))[1];

	    for ($i = $n - 1; $i > 0; $i--) {
		    $state = ($state * 1103515245 + 12345) & 0x7FFFFFFF;
		    $j = $state % ($i + 1);
		    [$keys[$i], $keys[$j]] = [$keys[$j], $keys[$i]];
	    }

	    return array_map(fn($i) => $pool[$i], array_slice($keys, 0, $count));
    }

    private function generateSeed(): string
    {
	    return bin2hex(random_bytes(16)) . '_' . time();
    }

    private function getStatusHistory(LotteryRun $run): array
    {
	    // Would need to track status changes in a separate table or parse metadata
	    // For now, return basic info
	    return [
		    'created_at' => $run->getCreatedAt(),
		    'completed_at' => $run->getCompletedAt(),
		    'status' => $run->getStatus(),
		    'metadata' => $run->getMetadata(),
	    ];
    }
}
