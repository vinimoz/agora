<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCA\Agora\Db\Participation;
use OCA\Agora\Db\ParticipationMapper;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\LotteryRun;
use OCA\Agora\Db\LotteryRunMapper;
use OCA\Agora\Db\LotterySelection;
use OCA\Agora\Db\LotterySelectionMapper;
use OCA\Agora\Exceptions\Exception;
use OCA\Agora\UserSession;
use Psr\Log\LoggerInterface;
use OCP\AppFramework\Db\DoesNotExistException;

class ParticipationService
{
    public function __construct(
        private ParticipationMapper $participationMapper,
        private LotteryRunMapper $lotteryRunMapper,
        private LotterySelectionMapper $lotterySelectionMapper,
        private InquiryMapper $inquiryMapper,
        private UserSession $userSession,
        private IGroupManager $groupManager,
        private IUserManager $userManager,
        private LoggerInterface $logger,
        private LotteryService $lotteryService,
    ) {}

    // ====================================================================
    // PARTICIPATION POLICIES
    // ====================================================================

    public function getPolicy(string $targetType, int $targetId): ?Participation
    {
        return $this->participationMapper->findByTarget($targetType, $targetId);
    }

    public function getPolicyWithRelations(string $targetType, int $targetId): ?Participation
    {
        return $this->participationMapper->findByTargetWithRelations($targetType, $targetId);
    }

    public function setPolicy(
    string $targetType,
    int $targetId,
    string $policyType,
    array $policyConfig = []
): Participation {
    $participation = $this->participationMapper->findByTarget($targetType, $targetId);

    $this->logger->warning('Setting participation POLICY', [
        'targetType'   => $targetType,
        'targetId'     => $targetId,
        'policyType'   => $policyType,
        'hasExisting'  => $participation !== null,
        'policyConfig' => $policyConfig,
    ]);

    if ($participation === null) {
        $participation = new Participation();
        $participation->setTargetType($targetType);
        $participation->setTargetId($targetId);
        $participation->setCreatedAt(time());
        $participation->setCreatedBy($this->userSession->getCurrentUserId());
    }

    $userIds  = $policyConfig['user_ids']  ?? [];
    $groupIds = $policyConfig['group_ids'] ?? [];
    unset($policyConfig['user_ids'], $policyConfig['group_ids']);

    // ============ NORMALIZE FIRST (before persisting) ============
    if ($policyType === Participation::POLICY_LOTTERY) {
        if (!isset($policyConfig['count']) && isset($policyConfig['selection_size'])) {
            $policyConfig['count'] = (int)$policyConfig['selection_size'];
        }
        if (empty($groupIds) && !empty($policyConfig['source_groups'])) {
            $groupIds = $policyConfig['source_groups'];
        }
        if (empty($userIds) && !empty($policyConfig['source_users'])) {
            $userIds = $policyConfig['source_users'];
        }

        if (!isset($policyConfig['mode'])) {
            throw new Exception('Lottery mode is required');
        }
        if (!in_array($policyConfig['mode'], [
            Participation::LOTTERY_MODE_USERS,
            Participation::LOTTERY_MODE_GROUPS,
        ], true)) {
            throw new Exception('Invalid lottery mode');
        }
        $policyConfig['count'] ??= 1;
        if ($policyConfig['count'] < 1) {
            throw new Exception('Lottery count must be at least 1');
        }
    }

    $participation->setPolicyType($policyType);
    $participation->setPolicyConfig($policyConfig);   // ← now includes "count":3
    $participation->setUpdatedAt(time());

    $this->logger->warning('Saving participation policy', [
        'policyType'   => $policyType,
        'policyConfig' => $policyConfig,
    ]);

    // ============ PERSIST ONCE ============
    if ($participation->getId() === null) {
        $participation = $this->participationMapper->insert($participation);
    } else {
        $participation = $this->participationMapper->update($participation);
    }

    // ============ PERSIST RELATIONS ============
    if ($policyType === Participation::POLICY_USERS && !empty($userIds)) {
        $this->participationMapper->setUsersForParticipation($targetId, $targetType, $userIds);
    } elseif ($policyType === Participation::POLICY_GROUPS && !empty($groupIds)) {
        $this->participationMapper->setGroupsForParticipation($targetId, $targetType, $groupIds);
    } elseif ($policyType === Participation::POLICY_LOTTERY) {
        if ($policyConfig['mode'] === Participation::LOTTERY_MODE_GROUPS && !empty($groupIds)) {
            $this->participationMapper->setGroupsForParticipation($targetId, $targetType, $groupIds);
        } elseif ($policyConfig['mode'] === Participation::LOTTERY_MODE_USERS && !empty($userIds)) {
            $this->participationMapper->setUsersForParticipation($targetId, $targetType, $userIds);
        }
    }

    return $participation;
    }

    public function deletePolicy(string $targetType, int $targetId): bool
    {
	    $participation = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($participation === null) {
		    return false;
	    }

	    $this->participationMapper->delete($participation);
	    return true;
    }

    public function canParticipate(string $userId, string $targetType, int $targetId): bool
    {
	    $policy = $this->participationMapper->findByTarget($targetType, $targetId);

	    if ($policy === null) {
		    return true;
	    }

	    switch ($policy->getPolicyType()) {
	    case Participation::POLICY_EVERYONE:
		    return true;

	    case Participation::POLICY_USERS:
		    $userIds = $policy->getPolicyConfig()['user_ids'] ?? [];
		    return in_array($userId, $userIds);

	    case Participation::POLICY_GROUPS:
		    $groupIds = $policy->getPolicyConfig()['group_ids'] ?? [];
		    return $this->userInGroups($userId, $groupIds);

	    case Participation::POLICY_LOTTERY:
		    $selection = $this->lotterySelectionMapper->findByUserAndParticipation($userId, $policy->getId());
		    if ($selection === null) {
			    return false;
		    }
		    if ($selection->isExpired() || ($selection->isPending() && $selection->getExpiresAt() < time())) {
			    return false;
		    }
		    return $selection->isAccepted();

	    default:
		    return false;
	    }
    }

    // ====================================================================
    // LOTTERY OPERATIONS
    // ====================================================================

    /**
     * Expire pending selections older than expiration time
     */
    public function expireOldSelections(): int
    {
	    $now = time();
	    $expired = $this->lotterySelectionMapper->findExpiring($now);
	    $count = 0;
	    foreach ($expired as $selection) {
		    if ($selection->isPending() && $selection->getExpiresAt() <= $now) {
			    $selection->setStatus(LotterySelection::STATUS_EXPIRED);
			    $this->lotterySelectionMapper->update($selection);
			    $count++;
		    }
	    }
	    return $count;
    }

    public function runLotteryForTarget(
	    string $targetType,
	    int $targetId,
	    ?string $seed = null
    ): LotteryRun {
	    $participation = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($participation === null) {
		    throw new Exception('Participation policy not found for target');
	    }
	    return $this->lotteryService->runLottery($participation, $seed);
    }
    /*
	public function validateLotteryForTarget(string $targetType, int $targetId): array
	{
	    $policy = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($policy === null || !$policy->isLottery()) {
		throw new Exception('No lottery policy found for this target');
	    }

	    // Get the latest run
	    $latestRun = $this->lotteryRunMapper->findLatestByParticipationId($policy->getId());

	    if ($latestRun === null) {
		throw new Exception('No lottery run found');
	    }

	    if ($latestRun->getStatus() !== LotteryRun::STATUS_COMPLETED) {
		throw new Exception('Cannot validate a lottery that is not completed');
	    }

	    // Validate the lottery
	    $validatedRun = $this->lotteryService->validateLottery($latestRun->getId());

	    return [
		'run' => $validatedRun->jsonSerialize(),
		'status' => 'validated',
		'is_validated' => true,
	    ];
    }*/
    public function validateLotteryForTarget(string $targetType, int $targetId): LotteryRun  // Change return type
    {
	    $policy = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($policy === null || !$policy->isLottery()) {
		    throw new Exception('No lottery policy found for this target');
	    }

	    // Get the latest run
	    $latestRun = $this->lotteryRunMapper->findLatestByParticipationId($policy->getId());

	    if ($latestRun === null) {
		    throw new Exception('No lottery run found');
	    }

	    if ($latestRun->getStatus() !== LotteryRun::STATUS_COMPLETED) {
		    throw new Exception('Cannot validate a lottery that is not completed');
	    }

	    // Validate the lottery and return the run object
	    return $this->lotteryService->validateLottery($latestRun->getId());
    }

    public function getLotteryStatus(string $targetType, int $targetId): array
    {
	    return $this->lotteryService->getLotteryStatus($targetType, $targetId);
    }

    public function getLotteryResults(string $targetType, int $targetId): array
    {
	    $policy = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($policy === null || !$policy->isLottery()) {
		    return [];
	    }

	    $runs = $this->lotteryRunMapper->findByParticipationId($policy->getId());

	    $results = [];
	    foreach ($runs as $run) {
		    $selections = $this->lotterySelectionMapper->findByRunId($run->getId());
		    $results[] = [
			    'run' => $run->jsonSerialize(),
			    'selections' => array_map(fn($s) => $s->jsonSerialize(), $selections),
		    ];
	    }

	    return $results;
    }

    public function resetLottery(string $targetType, int $targetId): array
    {
	    $policy = $this->participationMapper->findByTarget($targetType, $targetId);
	    if ($policy === null || !$policy->isLottery()) {
		    throw new Exception('Lottery policy not found');
	    }

	    $this->logger->warning('Resetting lottery', [
		    'targetType'       => $targetType,
		    'targetId'         => $targetId,
		    'participationId'  => $policy->getId(),
	    ]);

	    // Selections first (potential FK to runs), then runs.
	    $deletedSelections = $this->lotterySelectionMapper->deleteByParticipationId($policy->getId());
	    $deletedRuns       = $this->lotteryRunMapper->deleteByParticipationId($policy->getId());

	    return [
		    'deleted'           => true,
		    'deletedRuns'       => $deletedRuns,
		    'deletedSelections' => $deletedSelections,
	    ];
    }

    public function acceptSelection(int $selectionId): LotterySelection
    {
	    $selection = $this->lotterySelectionMapper->find($selectionId);
	    if ($selection === null) {
		    throw new DoesNotExistException('Selection not found');
	    }

	    if (!$selection->isPending()) {
		    throw new Exception('Selection already ' . $selection->getStatus());
	    }

	    $selection->setStatus(LotterySelection::STATUS_ACCEPTED);
	    $selection->setAcceptedAt(time());
	    return $this->lotterySelectionMapper->update($selection);
    }

    public function declineSelection(int $selectionId): LotterySelection
    {
	    $selection = $this->lotterySelectionMapper->find($selectionId);
	    if ($selection === null) {
		    throw new DoesNotExistException('Selection not found');
	    }

	    if (!$selection->isPending()) {
		    throw new Exception('Selection already ' . $selection->getStatus());
	    }

	    $selection->setStatus(LotterySelection::STATUS_DECLINED);
	    return $this->lotterySelectionMapper->update($selection);
    }

    public function getEligibleUsers(string $targetType, int $targetId): array
    {
	    $policy = $this->participationMapper->findByTargetWithRelations($targetType, $targetId);
	    if ($policy === null) {
		    return array_map(fn($user) => $user->getUID(), $this->userManager->search(''));
	    }

	    switch ($policy->getPolicyType()) {
	    case Participation::POLICY_EVERYONE:
		    return array_map(fn($user) => $user->getUID(), $this->userManager->search(''));
	    case Participation::POLICY_USERS:
		    return $policy->getPolicyConfig()['user_ids'] ?? [];
	    case Participation::POLICY_GROUPS:
		    $groupIds = $policy->getPolicyConfig()['group_ids'] ?? [];
		    return $this->getUsersFromGroups($groupIds);
	    case Participation::POLICY_LOTTERY:
		    $selections = $this->lotterySelectionMapper->findByParticipationId($policy->getId());
		    return array_filter(
			    array_map(fn($s) => $s->isAccepted() ? $s->getSelectedUserId() : null, $selections)
		    );
	    default:
		    return [];
	    }
    }

    // ====================================================================
    // HELPERS
    // ====================================================================

    private function userInGroups(string $userId, array $groupIds): bool
    {
	    if (empty($groupIds)) {
		    return false;
	    }

	    try {
		    $user = $this->groupManager->getUser($userId);
		    if ($user === null) {
			    $this->logger->warning('User not found for group check', [
				    'userId' => $userId,
				    'app' => 'agora',
			    ]);
			    return false;
		    }

		    $userGroups = $this->groupManager->getUserGroups($user);
		    $userGroupIds = array_map(function ($group) {
			    return $group->getGID();
		    }, $userGroups);

		    return !empty(array_intersect($userGroupIds, $groupIds));
	    } catch (\Exception $e) {
		    $this->logger->error('Failed to check user groups', [
			    'userId' => $userId,
			    'error' => $e->getMessage(),
			    'app' => 'agora',
		    ]);
		    return false;
	    }
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
}
