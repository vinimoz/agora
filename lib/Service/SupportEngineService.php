<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryGroupMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\SupportEngine;
use OCA\Agora\Db\SupportEngineMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\SupportResultMapper;
use OCA\Agora\Exceptions\ForbiddenException;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class SupportEngineService
{
    public function __construct(
        private SupportEngineMapper $engineMapper,
        private SupportResultMapper $resultMapper,
        private SupportMapper $supportMapper,
        private SupportResultService $resultService,
        private LoggerInterface $logger,
        private InquiryMapper $inquiryMapper,
        private InquiryGroupMapper $inquiryGroupMapper,
        private OptionMapper $optionMapper,
    ) {
    }

    /**
     * Require the right to edit the inquiry and the inquiry group the
     * engine is attached to
     *
     * @throws ForbiddenException
     */
    public function requestEdit(int $inquiryId, ?int $inquiryGroupId): void
    {
        $hasGroup = $inquiryGroupId !== null && $inquiryGroupId > 0;
        if (!$hasGroup && $inquiryId <= 0) {
            throw new ForbiddenException('Support engine has no inquiry');
        }
        if ($hasGroup) {
            $this->inquiryGroupMapper->get($inquiryGroupId)->request(InquiryGroup::PERMISSION_INQUIRY_GROUP_EDIT);
        }
        if ($inquiryId > 0) {
            $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_EDIT);
        }
    }

    /**
     * Require every target to belong to the engine's inquiry or to an
     * inquiry of its group the user may edit, and a group engine on
     * inquiries to name its targets
     *
     * @throws ForbiddenException
     */
    private function validateTargets(string $targetType, array|string $targetIds, int $inquiryId, ?int $inquiryGroupId): void
    {
        if (is_string($targetIds)) {
            $targetIds = json_decode($targetIds, true);
            if (!is_array($targetIds)) {
                throw new ForbiddenException('Invalid support engine targets');
            }
        }
        $inquiryIds = $inquiryId > 0 ? [$inquiryId] : [];
        if ($inquiryGroupId !== null && $inquiryGroupId > 0) {
            if ($targetIds === [] && $targetType === SupportEngine::TARGET_INQUIRY) {
                throw new ForbiddenException('Group support engine needs explicit targets');
            }
            $inquiryIds = array_merge($inquiryIds, $this->inquiryGroupMapper->getInquiryIdsForGroup($inquiryGroupId));
        }
        $editable = $inquiryId > 0 ? [$inquiryId => true] : [];

        foreach ($targetIds as $targetId) {
            if (!is_int($targetId) && !(is_string($targetId) && ctype_digit($targetId))) {
                throw new ForbiddenException('Invalid support engine target');
            }
            if ($targetType === SupportEngine::TARGET_OPTION) {
                try {
                    $targetId = $this->optionMapper->get((int)$targetId)->getTargetId();
                } catch (DoesNotExistException $e) {
                    throw new ForbiddenException('Support engine target does not exist');
                }
            } elseif ($targetType !== SupportEngine::TARGET_INQUIRY) {
                throw new ForbiddenException('Invalid support engine target type');
            }
            $targetId = (int)$targetId;
            if (!in_array($targetId, $inquiryIds, true)) {
                throw new ForbiddenException('Support engine target is outside its inquiry');
            }
            if (!isset($editable[$targetId])) {
                try {
                    $this->inquiryMapper->get($targetId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_EDIT);
                } catch (DoesNotExistException $e) {
                    throw new ForbiddenException('Support engine target does not exist');
                }
                $editable[$targetId] = true;
            }
        }
    }

    /**
     * Require the right to edit an existing engine
     *
     * @throws DoesNotExistException
     * @throws ForbiddenException
     */
    public function requestEditEngine(int $id): SupportEngine
    {
        $engine = $this->engineMapper->find($id);
        $this->requestEdit($engine->getInquiryId(), $engine->getInquiryGroupId());
        return $engine;
    }

    /**
     * @return SupportEngine[]
     */
    public function getEnginesByInquiry(int $inquiryId): array
    {
        return $this->engineMapper->findByInquiryId($inquiryId);
    }

    /**
     * @return SupportEngine[]
     */
    public function getEnginesByInquiryGroup(int $inquiryGroupId): array
    {
        return $this->engineMapper->findByInquiryGroupId($inquiryGroupId);
    }

    /**
     * @return SupportEngine[]
     */
    public function getEnginesByTarget(string $targetType, int $targetId): array
    {
        return $this->engineMapper->findByTarget($targetType, $targetId);
    }

    /**
     * @return SupportEngine[]
     */
    public function getActiveEnginesByTarget(string $targetType, int $targetId): array
    {
        return $this->engineMapper->findActiveByTarget($targetType, $targetId);
    }

    public function getEngine(int $id): ?SupportEngine
{
    try {
        return $this->engineMapper->find($id);
    } catch (DoesNotExistException $e) {
        $this->logger->warning('Support engine not found: ' . $id);
        return null;
    }
}
    public function createEngine(array $data): SupportEngine
    {
        $this->requestEdit(
            (int)($data['inquiry_id'] ?? 0),
            isset($data['inquiry_group_id']) ? (int)$data['inquiry_group_id'] : null
        );
        $this->validateTargets(
            $data['target_type'] ?? SupportEngine::TARGET_OPTION,
            $data['target_ids'] ?? [],
            (int)($data['inquiry_id'] ?? 0),
            isset($data['inquiry_group_id']) ? (int)$data['inquiry_group_id'] : null
        );

        $engine = new SupportEngine();
        $engine->setEngine($data['engine'] ?? '');
        $engine->setTitle($data['title'] ?? '');
        $engine->setDescription($data['description'] ?? '');
        $engine->setPurpose($data['purpose'] ?? '');
        $engine->setInquiryId($data['inquiry_id'] ?? 0);
        $engine->setInquiryGroupId($data['inquiry_group_id'] ?? null);
        $engine->setStatus($data['status'] ?? SupportEngine::STATUS_DRAFT);
        $engine->setCreated(time());
        $engine->setTargetType($data['target_type'] ?? SupportEngine::TARGET_OPTION);
        $engine->setTargetIds($data['target_ids'] ?? []);
        $engine->setMetadata($data['metadata'] ?? []);
        
        // Set config with phase and timing
        $config = $data['config'] ?? [];
        
        // If activating immediately, set started_at
        if (($data['status'] ?? '') === SupportEngine::STATUS_ACTIVE) {
            $config['started_at'] = time();
            $config['ended_at'] = null;
        }
        
        $engine->setConfig($config);

        return $this->engineMapper->insert($engine);
    }

    public function updateEngine(int $id, array $data): ?SupportEngine
    {
        $engine = $this->getEngine($id);
        if ($engine === null) {
            return null;
        }
        $this->requestEdit($engine->getInquiryId(), $engine->getInquiryGroupId());

        $inquiryId = (int)($data['inquiry_id'] ?? $engine->getInquiryId());
        $inquiryGroupId = isset($data['inquiry_group_id']) ? (int)$data['inquiry_group_id'] : $engine->getInquiryGroupId();
        if ($inquiryId !== $engine->getInquiryId() || $inquiryGroupId !== $engine->getInquiryGroupId()) {
            $this->requestEdit($inquiryId, $inquiryGroupId);
        }
        if (isset($data['target_type']) || isset($data['target_ids'])
            || isset($data['inquiry_id']) || isset($data['inquiry_group_id'])
            || ($data['status'] ?? null) === SupportEngine::STATUS_ACTIVE
        ) {
            $this->validateTargets(
                $data['target_type'] ?? $engine->getTargetType(),
                $data['target_ids'] ?? $engine->getTargetIds(),
                $inquiryId,
                $inquiryGroupId
            );
        }

        // Update config with phase handling
        if (isset($data['config'])) {
            $config = array_merge($engine->getConfig(), $data['config']);
            $engine->setConfig($config);
        }
        
        // Handle status transitions
        $closing = false;
        if (isset($data['status'])) {
            $oldStatus = $engine->getStatus();
            $config = $engine->getConfig();
            
            // Activating engine
            if ($oldStatus !== SupportEngine::STATUS_ACTIVE && $data['status'] === SupportEngine::STATUS_ACTIVE) {
                $config['started_at'] = $config['started_at'] ?? time();
                $config['ended_at'] = null;
            }
            
            // Closing engine
            if ($data['status'] === SupportEngine::STATUS_CLOSED) {
                $config['ended_at'] = time();
                $closing = $oldStatus !== SupportEngine::STATUS_CLOSED;
            }
            
            $engine->setConfig($config);
            $engine->setStatus($data['status']);
        }
        
        if (isset($data['title'])) {
            $engine->setTitle($data['title']);
        }
        if (isset($data['description'])) {
            $engine->setDescription($data['description']);
        }
        if (isset($data['engine'])) {
            $engine->setEngine($data['engine']);
        }
        if (isset($data['purpose'])) {
            $engine->setPurpose($data['purpose']);
        }
        if (isset($data['target_type'])) {
            $engine->setTargetType($data['target_type']);
        }
        if (isset($data['target_ids'])) {
            $engine->setTargetIds($data['target_ids']);
        }
        if (isset($data['config'])) {
            $engine->setConfig($data['config']);
        }
        if (isset($data['metadata'])) {
            $engine->setMetadata($data['metadata']);
        }
        if (isset($data['inquiry_id'])) {
            $engine->setInquiryId($data['inquiry_id']);
        }
        if (isset($data['inquiry_group_id'])) {
            $engine->setInquiryGroupId($data['inquiry_group_id']);
        }

        $engine = $this->engineMapper->update($engine);

        // A closed scrutiny keeps whatever result the last vote left behind,
        // so recount once on the transition rather than serving a stale one.
        // Count every support of the engine, as the vote path does: ballots
        // cast option by option carry an option id.
        if ($closing && $engine->getInquiryId()) {
            try {
                $this->resultService->calculateFromSupports(
                    $engine->getInquiryId(),
                    0,
                    $this->supportMapper->findBySupportEngineId($engine->getId()),
                    $engine->getId()
                );
            } catch (\Exception $e) {
                $this->logger->error('Failed to recalculate results on close: ' . $e->getMessage());
            }
        }

        return $engine;
    }

    public function deleteEngine(int $id): bool
    {
        $engine = $this->getEngine($id);
        if ($engine === null) {
            return false;
        }
        $this->requestEdit($engine->getInquiryId(), $engine->getInquiryGroupId());

        try {
            $this->engineMapper->delete($engine);
            return true;
        } catch (\Exception $e) {
            $this->logger->error('Failed to delete engine: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Check if an engine has votes
     */
    public function hasVotes(int $engineId): bool
    {
        try {
            $count = $this->resultMapper->countByEngine($engineId);
            return $count > 0;
        } catch (\Exception $e) {
            $this->logger->error('Failed to check votes for engine: ' . $engineId, [
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Set active engine for a target
     */
public function setActiveEngine(string $targetType, int $targetId, int $engineId): void
{
    // The engine and its target must both be editable by the current user
    $engine = $this->requestEditEngine($engineId);
    if ($targetType !== $engine->getTargetType()
        || !in_array($targetId, array_map('intval', $engine->getTargetIds()), true)
    ) {
        throw new ForbiddenException('Engine does not target this ID');
    }
    if ($targetType === SupportEngine::TARGET_OPTION) {
        $this->requestEdit($this->optionMapper->get($targetId)->getTargetId(), null);
    } else {
        $this->requestEdit($targetId, null);
    }

    // First, deactivate the active engines of this target in the same inquiry
    $activeEngines = $this->getActiveEnginesByTarget($targetType, $targetId);
    foreach ($activeEngines as $active) {
        if ($active->getId() === $engine->getId()
            || $active->getInquiryId() !== $engine->getInquiryId()
            || $active->getInquiryGroupId() !== $engine->getInquiryGroupId()
        ) {
            continue;
        }
        $active->setStatus(SupportEngine::STATUS_DRAFT);
        $this->engineMapper->update($active);
    }

    // Then activate the specified engine
    $engine->setStatus(SupportEngine::STATUS_ACTIVE);
    $config = $engine->getConfig();
    $config['started_at'] = $config['started_at'] ?? time();
    $config['ended_at'] = null;
    $engine->setConfig($config);
    $this->engineMapper->update($engine);
}
    
    /**
     * Get active engine for a target
     */
    public function getActiveEngine(string $targetType, int $targetId): ?SupportEngine
    {
        $activeEngines = $this->getActiveEnginesByTarget($targetType, $targetId);
        return !empty($activeEngines) ? $activeEngines[0] : null;
    }
}
