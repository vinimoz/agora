<?php
// Db/SupportProcessMapper.php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;

/**
 * @template-extends QBMapper<SupportProcess>
 */
class SupportProcessMapper extends QBMapper
{
    public const TABLE = SupportProcess::TABLE;

    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, self::TABLE, SupportProcess::class);
    }

    /**
     * @return SupportProcess[]
     */
    public function findByEngineId(int $engineId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)))
            ->orderBy('started_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Get active process for an engine
     */
    public function findActiveByEngine(int $engineId): ?SupportProcess
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('status', $qb->createNamedParameter('active', IQueryBuilder::PARAM_STR)))
            ->setMaxResults(1);

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * @return SupportProcess[]
     */
    public function findByTarget(string $targetType, int $targetId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
            ->orderBy('started_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return SupportProcess[]
     */
    public function findByStatus(string $status): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter($status, IQueryBuilder::PARAM_STR)))
            ->orderBy('started_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Create a new process
     */
    public function createProcess(
        int $engineId,
        string $targetType,
        int $targetId,
        string $phase = 'deliberative',
        array $metadata = []
    ): SupportProcess {
        $process = new SupportProcess();
        $process->setSupportEngineId($engineId);
        $process->setTargetType($targetType);
        $process->setTargetId($targetId);
        $process->setPhase($phase);
        $process->setStatus(SupportProcess::STATUS_PENDING);
        $process->setStartedAt(time());
        $process->setMetadata($metadata);

        return $this->insert($process);
    }

    /**
     * Update process status
     */
    public function updateStatus(int $id, string $status): ?SupportProcess
    {
        $process = $this->find($id);
        if ($process === null) {
            return null;
        }

        $process->setStatus($status);

        if ($status === SupportProcess::STATUS_COMPLETED || $status === SupportProcess::STATUS_CANCELLED) {
            $process->setEndedAt(time());
        }

        return $this->update($process);
    }

    /**
     * Update process phase
     */
    public function updatePhase(int $id, string $phase): ?SupportProcess
    {
        $process = $this->find($id);
        if ($process === null) {
            return null;
        }

        $process->setPhase($phase);
        return $this->update($process);
    }

    /**
     * Delete all processes for an engine
     */
    public function deleteByEngine(int $engineId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Get completed processes count
     */
    public function countByStatus(string $status): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter($status, IQueryBuilder::PARAM_STR)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }
}
