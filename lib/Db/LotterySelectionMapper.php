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
 * @template-extends QBMapper<LotterySelection>
 */
class LotterySelectionMapper extends QBMapper
{
    public const TABLE = LotterySelection::TABLE;

    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, self::TABLE, LotterySelection::class);
    }

    /**
     * Find selections by run ID
     * 
     * @return LotterySelection[]
     */
    public function findByRunId(int $runId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('run_id', $qb->createNamedParameter($runId, IQueryBuilder::PARAM_INT)))
            ->orderBy('rank', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Find selections by participation ID
     * 
     * @return LotterySelection[]
     */
    public function findByParticipationId(int $participationId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('participation_id', $qb->createNamedParameter($participationId, IQueryBuilder::PARAM_INT)))
            ->orderBy('selected_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Find selections by user ID
     * 
     * @return LotterySelection[]
     */
    public function findByUserId(string $userId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('selected_user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)))
            ->orderBy('selected_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Find selection by user and participation
     */
    public function findByUserAndParticipation(string $userId, int $participationId): ?LotterySelection
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('selected_user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq('participation_id', $qb->createNamedParameter($participationId, IQueryBuilder::PARAM_INT)))
            ->setMaxResults(1);

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Find pending selections that are about to expire
     * 
     * @return LotterySelection[]
     */
    public function findExpiring(int $threshold): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(LotterySelection::STATUS_PENDING, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->lt('expires_at', $qb->createNamedParameter($threshold, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    /**
     * Count selections by run ID
     */
    public function countByRunId(int $runId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('run_id', $qb->createNamedParameter($runId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }

    /**
     * Update selection status
     */
    public function updateStatus(int $id, string $status, ?int $acceptedAt = null): ?LotterySelection
    {
        $selection = $this->find($id);
        if ($selection === null) {
            return null;
        }

        $selection->setStatus($status);
        if ($acceptedAt !== null) {
            $selection->setAcceptedAt($acceptedAt);
        }
        return $this->update($selection);
    }

    /**
     * Count selections by status
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
