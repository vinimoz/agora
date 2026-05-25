<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\SupportEngine;
use OCA\Agora\Db\SupportEngineMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class SupportEngineService
{
    public function __construct(
        private SupportEngineMapper $engineMapper,
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
        $config['phase'] = $data['phase'] ?? SupportEngine::PHASE_DELIBERATIVE;
        
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
                $config['phase'] = $config['phase'] ?? SupportEngine::PHASE_VOTING;
            }
            
            // Closing engine
            if ($data['status'] === SupportEngine::STATUS_CLOSED) {
                $config['ended_at'] = time();
                $config['phase'] = SupportEngine::PHASE_CLOSED;
            }
            
            $engine->setConfig($config);
            $engine->setStatus($data['status']);
        }
        
        // Update phase independently
        if (isset($data['phase'])) {
            $config = $engine->getConfig();
            $config['phase'] = $data['phase'];
            $engine->setConfig($config);
        }
        
        if (isset($data['title'])) {
            $engine->setTitle($data['title']);
        }
        if (isset($data['description'])) {
            $engine->setDescription($data['description']);
        }
        if (isset($data['target_type'])) {
            $engine->setTargetType($data['target_type']);
        }
        if (isset($data['target_ids'])) {
            $engine->setTargetIds($data['target_ids']);
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
 * Get support feature for a target (inquiry or option)
 */
private function getTargetSupportFeature(string $targetType, int $targetId): string
{
    try {
        if ($targetType === 'inquiry') {
            $inquiry = $this->inquiryMapper->find($targetId);
            return $inquiry->getSupportFeature() ?: 'binary';
        } else { // option
            $option = $this->optionMapper->find($targetId);
            return $option->getSupportFeature() ?: 'binary';
        }
    } catch (\Exception $e) {
        $this->logger->error('Failed to get target support feature', [
            'targetType' => $targetType,
            'targetId' => $targetId,
            'error' => $e->getMessage()
        ]);
        return 'binary';
    }
}

}
