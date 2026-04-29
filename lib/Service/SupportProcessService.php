<?php
// Service/SupportProcessService.php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\SupportProcess;
use OCA\Agora\Db\SupportProcessMapper;
use OCA\Agora\Db\SupportResultMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class SupportProcessService
{
    public function __construct(
        private SupportProcessMapper $processMapper,
        private SupportResultMapper $resultMapper,
        private LoggerInterface $logger,
    ) {
    }

    public function getProcessesByEngine(int $engineId): array
    {
        return $this->processMapper->findByEngineId($engineId);
    }

    public function getActiveProcess(int $engineId): ?SupportProcess
    {
        return $this->processMapper->findActiveByEngine($engineId);
    }

    public function getProcessesByTarget(string $targetType, int $targetId): array
    {
        return $this->processMapper->findByTarget($targetType, $targetId);
    }

    public function getProcess(int $id): ?SupportProcess
    {
        try {
            return $this->processMapper->find($id);
        } catch (DoesNotExistException $e) {
            $this->logger->warning('Support process not found: ' . $id);
            return null;
        }
    }

    public function createProcess(
        int $engineId,
        string $targetType,
        int $targetId,
        string $phase = 'deliberative',
        array $metadata = []
    ): SupportProcess {
        return $this->processMapper->createProcess($engineId, $targetType, $targetId, $phase, $metadata);
    }

    public function updateStatus(int $id, string $status): ?SupportProcess
    {
        return $this->processMapper->updateStatus($id, $status);
    }

    public function updatePhase(int $id, string $phase): ?SupportProcess
    {
        return $this->processMapper->updatePhase($id, $phase);
    }

    public function getProcessWithResults(int $id): ?SupportProcess
    {
        $process = $this->getProcess($id);
        if ($process === null) {
            return null;
        }

        $results = $this->resultMapper->findByProcessId($id);
        $process->setResults($results);

        return $process;
    }

    public function deleteProcessesByEngine(int $engineId): void
    {
        $processes = $this->getProcessesByEngine($engineId);
        foreach ($processes as $process) {
            $this->resultMapper->deleteByProcess($process->getId());
        }
        
        $this->processMapper->deleteByEngine($engineId);
    }
}
