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
     * Find engines by inquiry ID
     * 
     * @return SupportEngine[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
           ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Find engines by inquiry group ID
     * 
     * @return SupportEngine[]
     */
    public function findByInquiryGroupId(int $inquiryGroupId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('inquiry_group_id', $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)))
           ->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }


    /**
     * Find engines by status
     * 
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
     * Find engines by target type and ID
     * 
     * @return SupportEngine[]
     */
    public function findByTarget(string $targetType, int $targetId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)));

        $dbProvider = $this->db->getDatabaseProvider();

        if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
            // PostgreSQL: Use JSON operators to check if target_id exists in the JSON array
            // Cast targetId to text and use JSON array contains operator
            $qb->andWhere($qb->expr()->eq(
                $qb->createFunction('CAST(' . $qb->createNamedParameter($targetId) . ' AS text)'),
                $qb->createFunction('ANY(SELECT json_array_elements_text(target_ids))')
            ));
            // Alternative simpler approach using jsonb if column is jsonb:
            // $qb->andWhere($qb->expr()->eq(
            //     $qb->createFunction('target_ids::jsonb @> ' . $qb->createNamedParameter('[' . $targetId . ']', IQueryBuilder::PARAM_STR) . '::jsonb'),
            //     $qb->expr()->literal(true)
            // ));
        } else {
            // MySQL: Use LIKE on JSON
            $qb->andWhere(
                $qb->expr()->like(
                    'target_ids',
                    $qb->createNamedParameter('%' . $targetId . '%', IQueryBuilder::PARAM_STR)
                )
            );
        }

        $qb->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Find active engines by target
     * 
     * @return SupportEngine[]
     */
    public function findActiveByTarget(string $targetType, int $targetId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
           ->andWhere($qb->expr()->eq('status', $qb->createNamedParameter('active', IQueryBuilder::PARAM_STR)));

        $dbProvider = $this->db->getDatabaseProvider();

        if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
            // PostgreSQL: Use JSON operators
            $qb->andWhere($qb->expr()->eq(
                $qb->createFunction('CAST(' . $qb->createNamedParameter($targetId) . ' AS text)'),
                $qb->createFunction('ANY(SELECT json_array_elements_text(target_ids))')
            ));
        } else {
            // MySQL: Use LIKE on JSON
            $qb->andWhere(
                $qb->expr()->like(
                    'target_ids',
                    $qb->createNamedParameter('%' . $targetId . '%', IQueryBuilder::PARAM_STR)
                )
            );
        }

        $qb->orderBy('created', 'DESC');

        return $this->findEntities($qb);
    }


    /**
     * Find engines by type and inquiry
     * 
     * @return SupportEngine[]
     */
    public function findByEngineType(int $inquiryId, string $engineType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
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
     * Count engines by inquiry
     */
    public function countByInquiry(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
           ->from($this->getTableName())
           ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }

    /**
     * Delete all engines for an inquiry
     */
    public function deleteByInquiry(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
           ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }
    }
