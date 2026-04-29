<?php
// Db/SupportEngineMapper.php

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
 * @template-extends QBMapper<SupportEngine>
 */
class SupportEngineMapper extends QBMapper
{
    public const TABLE = SupportEngine::TABLE;

    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, self::TABLE, SupportEngine::class);
    }

    /**
     * @return SupportEngine[]
     */
    public function findByGroupId(int $groupId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
            ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return SupportEngine[]
     */
    public function findByTarget(string $targetType, int $targetId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
            ->andWhere(
                $qb->expr()->like(
                    'target_ids',
                    $qb->createNamedParameter('%' . $targetId . '%', IQueryBuilder::PARAM_STR)
                )
            )
            ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return SupportEngine[]
     */
    public function findByStatus(string $status): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter($status, IQueryBuilder::PARAM_STR)))
            ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return SupportEngine[]
     */
    public function findActiveByTarget(string $targetType, int $targetId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq('status', $qb->createNamedParameter('active', IQueryBuilder::PARAM_STR)))
            ->andWhere(
                $qb->expr()->like(
                    'target_ids',
                    $qb->createNamedParameter('%' . $targetId . '%', IQueryBuilder::PARAM_STR)
                )
            )
            ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Get engine by engine type and group
     */
    public function findByEngineType(int $groupId, string $engineType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('engine', $qb->createNamedParameter($engineType, IQueryBuilder::PARAM_STR)))
            ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Update engine status
     */
    public function updateStatus(int $id, string $status): ?SupportEngine
    {
        $engine = $this->find($id);
        if ($engine === null) {
            return null;
        }

        $engine->setStatus($status);
        return $this->update($engine);
    }

    /**
     * Update engine configuration
     */
    public function updateConfig(int $id, array $config): ?SupportEngine
    {
        $engine = $this->find($id);
        if ($engine === null) {
            return null;
        }

        $engine->setConfig($config);
        return $this->update($engine);
    }

    /**
     * Count engines by group
     */
    public function countByGroup(int $groupId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }

    /**
     * Delete all engines for a group
     */
    public function deleteByGroup(int $groupId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }
}
