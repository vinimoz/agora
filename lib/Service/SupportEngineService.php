<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\SupportEngine;
use OCA\Agora\Db\SupportEngineMapper;
use OCA\Agora\Db\SupportResultMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class SupportEngineService
{
    public function __construct(
        private SupportEngineMapper $engineMapper,
        private SupportResultMapper $resultMapper,
        private LoggerInterface $logger,
    ) {
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

        // Update config with phase handling
        if (isset($data['config'])) {
            $config = array_merge($engine->getConfig(), $data['config']);
            $engine->setConfig($config);
        }
        
        // Handle status transitions
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

        return $this->engineMapper->update($engine);
    }

    public function deleteEngine(int $id): bool
    {
        $engine = $this->getEngine($id);
        if ($engine === null) {
            return false;
        }

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
    // First, deactivate all active engines for this target
    $activeEngines = $this->getActiveEnginesByTarget($targetType, $targetId);
    foreach ($activeEngines as $engine) {
        $engine->setStatus(SupportEngine::STATUS_DRAFT);
        $this->engineMapper->update($engine);
    }

    // Then activate the specified engine
    $engine = $this->getEngine($engineId);
    if ($engine) {
        // Check if target_ids contains this target
        $targetIds = $engine->getTargetIds();
        if (!in_array($targetId, $targetIds)) {
            $this->logger->warning('Engine does not target this ID', [
                'engineId' => $engineId,
                'targetId' => $targetId,
                'targetIds' => $targetIds
            ]);
        }

        $engine->setStatus(SupportEngine::STATUS_ACTIVE);
        $config = $engine->getConfig();
        $config['started_at'] = $config['started_at'] ?? time();
        $config['ended_at'] = null;
        $engine->setConfig($config);
        $this->engineMapper->update($engine);
    }
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
