<?php
// Db/SupportResultMapper.php

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
 * @template-extends QBMapper<SupportResult>
 */
class SupportResultMapper extends QBMapper
{
    public const TABLE = SupportResult::TABLE;

    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, self::TABLE, SupportResult::class);
    }

    /**
     * @return SupportResult[]
     */
    public function findByProcessId(int $processId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('support_process_id', $qb->createNamedParameter($processId, IQueryBuilder::PARAM_INT)))
            ->orderBy('updated', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return SupportResult[]
     */
    public function findByTarget(string $targetType, int $targetId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
            ->orderBy('updated', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Get result for specific option within a process
     */
    public function findOptionResult(int $processId, int $optionId): ?SupportResult
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('support_process_id', $qb->createNamedParameter($processId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Get latest result for a target
     */
    public function findLatestByTarget(string $targetType, int $targetId): ?SupportResult
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
            ->orderBy('updated', 'DESC')
            ->setMaxResults(1);

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Create or update a result
     */
    public function upsertResult(
        int $processId,
        string $targetType,
        int $targetId,
        array $result,
        ?int $optionId = null
    ): SupportResult {
        // Try to find existing
        $existing = null;
        if ($optionId !== null) {
            $existing = $this->findOptionResult($processId, $optionId);
        } else {
            $qb = $this->db->getQueryBuilder();
            $qb->select('*')
                ->from($this->getTableName())
                ->where($qb->expr()->eq('support_process_id', $qb->createNamedParameter($processId, IQueryBuilder::PARAM_INT)))
                ->andWhere($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
                ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));

            try {
                $existing = $this->findEntity($qb);
            } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
                // Will create new below
            }
        }

        if ($existing !== null) {
            $existing->setResult($result);
            $existing->setUpdated(time());
            return $this->update($existing);
        }

        // Create new result
        $supportResult = new SupportResult();
        $supportResult->setSupportProcessId($processId);
        $supportResult->setTargetType($targetType);
        $supportResult->setTargetId($targetId);
        $supportResult->setResult($result);
        $supportResult->setUpdated(time());

        if ($optionId !== null) {
            $supportResult->setOptionId($optionId);
        }

        return $this->insert($supportResult);
    }

    /**
     * Delete all results for a process
     */
    public function deleteByProcess(int $processId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('support_process_id', $qb->createNamedParameter($processId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Get results with history (for changelog)
     */
    public function getResultHistory(int $resultId): array
    {
        // Since we use upsert, history would need to be in a separate table
        // For now, just return the current result
        $result = $this->find($resultId);
        return $result ? [$result] : [];
    }
}
