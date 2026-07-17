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
        if ($participation === null) {
            throw new Exception('Participation policy not found');
        }

        if ($participation->getPolicyType() !== Participation::POLICY_LOTTERY) {
            throw new Exception('Participation policy is not a lottery');
        }

        $participationId = $participation->getId();

        // Check if there's already a running or completed run
        $existingRun = $this->lotteryRunMapper->findLatestByParticipationId($participationId);
        if ($existingRun !== null) {
            if ($existingRun->isRunning()) {
                throw new Exception('A lottery is already running');
            }
            if ($existingRun->isCompleted() && !$existingRun->isValidated()) {
                throw new Exception('A completed but unvalidated lottery exists. Please validate or create a new run.');
            }
        }

        // Build pool from policy configuration
        $pool = $this->buildPoolFromPolicy($participation);
        if (empty($pool)) {
            throw new Exception('No eligible users found for lottery');
        }

        $config = $participation->getPolicyConfig();
        $selectionSize = (int)($config['selection_size'] ?? $config['count'] ?? 1);
        $maxSelection = min($selectionSize, count($pool));

        if ($maxSelection < $selectionSize) {
            $this->logger->warning('Lottery requested more users than available', [
                'requested' => $selectionSize,
                'available' => count($pool),
                'participation_id' => $participationId,
            ]);
        }

        // Create run
        $run = new LotteryRun();
        $run->setParticipationId($participationId);
        $run->setSeed($seed ?? $this->generateSeed());
        $run->setStatus(LotteryRun::STATUS_RUNNING);
        $run->setPoolSize(count($pool));
        $run->setCreatedAt(time());
        $run->setMetadata([
            'executed_by' => $this->userSession->getCurrentUserId(),
            'executed_at' => time(),
            'pool_build_info' => $this->getPoolBuildInfo($participation),
            'requested_count' => $selectionSize,
            'available_count' => count($pool),
        ]);
        $this->lotteryRunMapper->insert($run);

        try {
            // Perform selection
            $selected = $this->selectRandom($pool, $maxSelection, $run->getSeed());

            // Save selections
            $rank = 1;
            foreach ($selected as $userId) {
                $selection = new LotterySelection();
                $selection->setParticipationId($participationId);
                $selection->setRunId($run->getId());
                $selection->setSelectedUserId($userId);
                $selection->setRank($rank++);
                $selection->setStatus(LotterySelection::STATUS_PENDING);
                $selection->setSelectedAt(time());
                $selection->setExpiresAt(time() + (7 * 24 * 60 * 60)); // 7 days to respond
                $this->lotterySelectionMapper->insert($selection);
            }

            // Mark run as completed
            $run->setStatus(LotteryRun::STATUS_COMPLETED);
            $run->setSelectionCount(count($selected));
            $run->setCompletedAt(time());
            $run->setResultSummary([
                'pool_size' => count($pool),
                'selection_size' => count($selected),
                'requested_size' => $selectionSize,
                'seed' => $run->getSeed(),
                'full_pool' => $pool, // For audit purposes
                'selected_users' => $selected,
            ]);
            $this->lotteryRunMapper->update($run);

            $this->logger->info('Lottery completed successfully', [
                'participation_id' => $participationId,
                'run_id' => $run->getId(),
                'selected_count' => count($selected),
            ]);

            return $run;

        } catch (\Exception $e) {
            $run->setStatus(LotteryRun::STATUS_FAILED);
            $run->setMetadata(array_merge($run->getMetadata() ?? [], [
                'error' => $e->getMessage(),
                'failed_at' => time(),
            ]));
            $this->lotteryRunMapper->update($run);
            
            $this->logger->error('Lottery execution failed', [
                'participation_id' => $participationId,
                'error' => $e->getMessage(),
            ]);
            
            throw new Exception('Lottery execution failed: ' . $e->getMessage());
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

        $this->logger->info('Lottery validated', [
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
        // Use seed for reproducibility
        mt_srand(crc32($seed));
        
        // Shuffle using the seeded random
        $keys = array_keys($pool);
        shuffle($keys);
        
        // Reset seed
        mt_srand();
        
        // Return selected items
        $selected = [];
        foreach (array_slice($keys, 0, $count) as $key) {
            $selected[] = $pool[$key];
        }
        
        return $selected;
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
