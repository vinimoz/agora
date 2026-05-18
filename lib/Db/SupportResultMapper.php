<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\Db\SupportResultSqlRepository;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class SupportResultMapper extends QBMapper
{
    
    public const TABLE = SupportResult::TABLE;
    public function __construct(
    IDBConnection $db,
    private SupportResultSqlRepository $sqlRepo)
    {
        parent::__construct($db, 'agora_support_results', SupportResult::class);
    }

    /**
 * Find a result by its ID
 * @return ?SupportResult
 */
public function findResultById(int $id): ?SupportResult
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
     * Find single result by target and engine
     */
    public function findByTargetAndEngine(string $targetType, int $targetId, ?int $engineId): ?SupportResult
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType)))
           ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));

        if ($engineId === null) {
            $qb->andWhere($qb->expr()->isNull('support_engine_id'));
        } else {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Insert or update a result
     */
    public function upsertResult(?int $engineId, string $targetType, int $targetId, array $result): SupportResult
    {
        $id = $this->sqlRepo->upsertResultWithJson(
            self::TABLE,
            $engineId,
            $targetType,
            $targetId,
            $result
        );

        return $this->findResultById($id);
    }

    public function updateResult(SupportResult $result): SupportResult
    {
        $this->sqlRepo->updateResultWithJson(
            self::TABLE,
            $result->getId(),
            $result->getResult(),
            $result->getUpdated()
        );

        return $this->findResultById($result->getId());
    }

    /**
     * Find results by target
     */
    public function findResultsByTarget(string $targetType, int $targetId, ?int $engineId = null): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType)))
           ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));

        if ($engineId !== null) {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    /**
     * Find results by engine
     */
    public function findByEngineId(?int $engineId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName());

        if ($engineId === null) {
            $qb->where($qb->expr()->isNull('support_engine_id'));
        } else {
            $qb->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }
}
