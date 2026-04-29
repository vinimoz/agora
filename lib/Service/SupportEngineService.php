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
        private SupportProcessService $processService,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * @return SupportEngine[]
     */
    public function getEnginesByGroup(int $groupId): array
    {
        return $this->engineMapper->findByGroupId($groupId);
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
        $engine->setType($data['type'] ?? '');
        $engine->setGroupId($data['group_id'] ?? 0);
        $engine->setStatus($data['status'] ?? SupportEngine::STATUS_DRAFT);
        $engine->setConfig($data['config'] ?? []);
        $engine->setCreated(time());
        $engine->setTargetType($data['target_type'] ?? SupportEngine::TARGET_INQUIRY);
        $engine->setTargetIds($data['target_ids'] ?? []);
        $engine->setMetadata($data['metadata'] ?? []);

        $created = $this->engineMapper->insert($engine);
        
        // Create initial process if engine is active
        if ($created->getStatus() === SupportEngine::STATUS_ACTIVE) {
            foreach ($created->getTargetIds() as $targetId) {
                $this->processService->createProcess(
                    $created->getId(),
                    $created->getTargetType(),
                    $targetId,
                    $data['phase'] ?? 'deliberative'
                );
            }
        }

        return $created;
    }

    public function updateEngine(int $id, array $data): ?SupportEngine
    {
        $engine = $this->getEngine($id);
        if ($engine === null) {
            return null;
        }

        if (isset($data['config'])) {
            $engine->setConfig($data['config']);
        }
        if (isset($data['status'])) {
            $oldStatus = $engine->getStatus();
            $engine->setStatus($data['status']);
            
            if ($oldStatus !== SupportEngine::STATUS_ACTIVE && $data['status'] === SupportEngine::STATUS_ACTIVE) {
                foreach ($engine->getTargetIds() as $targetId) {
                    $existingProcess = $this->processService->getActiveProcess($id);
                    if ($existingProcess === null) {
                        $this->processService->createProcess(
                            $id,
                            $engine->getTargetType(),
                            $targetId,
                            $data['phase'] ?? 'deliberative'
                        );
                    }
                }
            }
            
            if ($data['status'] === SupportEngine::STATUS_CLOSED) {
                $processes = $this->processService->getProcessesByEngine($id);
                foreach ($processes as $process) {
                    if ($process->getStatus() === 'active') {
                        $this->processService->updateStatus($process->getId(), 'completed');
                    }
                }
            }
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

        return $this->engineMapper->update($engine);
    }

    public function deleteEngine(int $id): bool
    {
        $engine = $this->getEngine($id);
        if ($engine === null) {
            return false;
        }

        try {
            $this->processService->deleteProcessesByEngine($id);
            $this->engineMapper->delete($engine);
            return true;
        } catch (\Exception $e) {
            $this->logger->error('Failed to delete engine: ' . $e->getMessage());
            return false;
        }
    }
}
