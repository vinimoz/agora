<?php

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
 * @template-extends QBMapper<LotteryRun>
 */
class LotteryRunMapper extends QBMapper
{
    public const TABLE = LotteryRun::TABLE;

    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, self::TABLE, LotteryRun::class);
    }

    /**
     * Find a run by ID
     */
    public function find(int $id): ?LotteryRun
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }


    /**
     * Find runs by participation ID
     *
     * @return LotteryRun[]
     */
    public function findByParticipationId(int $participationId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('participation_id', $qb->createNamedParameter($participationId, IQueryBuilder::PARAM_INT)))
            ->orderBy('created_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Find latest run by participation ID
     */
    public function findLatestByParticipationId(int $participationId): ?LotteryRun
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('participation_id', $qb->createNamedParameter($participationId, IQueryBuilder::PARAM_INT)))
            ->orderBy('created_at', 'DESC')
            ->setMaxResults(1);

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Find runs by status
     *
     * @return LotteryRun[]
     */
    public function findByStatus(string $status): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter($status, IQueryBuilder::PARAM_STR)))
            ->orderBy('created_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Find completed runs since a timestamp
     *
     * @return LotteryRun[]
     */
    public function findCompletedSince(int $timestamp): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(LotteryRun::STATUS_COMPLETED, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->gt('completed_at', $qb->createNamedParameter($timestamp, IQueryBuilder::PARAM_INT)))
            ->orderBy('completed_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Count runs by participation ID
     */
    public function countByParticipationId(int $participationId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('participation_id', $qb->createNamedParameter($participationId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }

    /**
     * Update run status
     */
    public function updateStatus(int $id, string $status): ?LotteryRun
    {
        $run = $this->find($id);
        if ($run === null) {
            return null;
        }

        $run->setStatus($status);
        if ($status === LotteryRun::STATUS_COMPLETED) {
            $run->setCompletedAt(time());
        }
        return $this->update($run);
    }
}
