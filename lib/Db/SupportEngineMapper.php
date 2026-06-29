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
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\Entity;
use OCA\Agora\Db\SupportEngineSqlRepository;

/**
 * @template-extends QBMapper<SupportEngine>
 */
class SupportEngineMapper extends QBMapper
{
    public const TABLE = SupportEngine::TABLE;

    public function __construct(
        IDBConnection $db,
        private SupportEngineSqlRepository $sqlRepo,
    ) {
        parent::__construct($db, self::TABLE, SupportEngine::class);
    }

    /**
     * Find engine by this ID
     *
     * @return ?SupportEngine
     */
    public function find(int $engineId): ?SupportEngine
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));

        try {
            return $this->findEntity($qb);
        } catch (DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Override insert to handle all JSON columns
     * Must match parent signature: insert(Entity $entity): Entity
     */
    public function insert(Entity $entity): Entity
    {
        /** @var SupportEngine $entity */
        $data = [
            'engine' => $entity->getEngine(),
            'title' => $entity->getTitle(),
            'description' => $entity->getDescription(),
            'purpose' => $entity->getPurpose(),
            'inquiry_id' => $entity->getInquiryId(),
            'inquiry_group_id' => $entity->getInquiryGroupId(),
            'status' => $entity->getStatus(),
            'config' => $entity->getConfig(),
            'created' => $entity->getCreated(),
            'target_type' => $entity->getTargetType(),
            'target_ids' => $entity->getTargetIds(),
            'metadata' => $entity->getMetadata(),
        ];
        
        $id = $this->sqlRepo->insertEngineWithJson(
            self::TABLE, 
            $data,
            ['config', 'target_ids', 'metadata']
        );
        
        return $this->find($id);
    }

    /**
     * Override update to handle all JSON columns
     * Must match parent signature: update(Entity $entity): Entity
     */
    public function update(Entity $entity): Entity
    {
        if (!($entity instanceof SupportEngine)) {
            throw new \InvalidArgumentException('Expected SupportEngine instance');
        }

        // Get the original entity from database to compare
        $original = $this->find($entity->getId());
        
        if (!$original) {
            throw new DoesNotExistException('Entity not found for update');
        }
        
        $data = [];
        
        // Compare and only include changed fields
        if ($entity->getEngine() !== $original->getEngine()) {
            $data['engine'] = $entity->getEngine();
        }
        if ($entity->getTitle() !== $original->getTitle()) {
            $data['title'] = $entity->getTitle();
        }
        if ($entity->getDescription() !== $original->getDescription()) {
            $data['description'] = $entity->getDescription();
        }
        if ($entity->getPurpose() !== $original->getPurpose()) {
            $data['purpose'] = $entity->getPurpose();
        }
        if ($entity->getInquiryId() !== $original->getInquiryId()) {
            $data['inquiry_id'] = $entity->getInquiryId();
        }
        if ($entity->getInquiryGroupId() !== $original->getInquiryGroupId()) {
            $data['inquiry_group_id'] = $entity->getInquiryGroupId();
        }
        if ($entity->getStatus() !== $original->getStatus()) {
            $data['status'] = $entity->getStatus();
        }
        if ($entity->getConfig() !== $original->getConfig()) {
            $data['config'] = $entity->getConfig();
        }
        if ($entity->getTargetType() !== $original->getTargetType()) {
            $data['target_type'] = $entity->getTargetType();
        }
        if ($entity->getTargetIds() !== $original->getTargetIds()) {
            $data['target_ids'] = $entity->getTargetIds();
        }
        if ($entity->getMetadata() !== $original->getMetadata()) {
            $data['metadata'] = $entity->getMetadata();
        }
        
        if (!empty($data)) {
            $this->sqlRepo->updateEngineWithJson(
                self::TABLE, 
                $data, 
                ['config', 'target_ids', 'metadata'],
                $entity->getId()
            );
        }
        
        return $this->find($entity->getId());
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
     * Checks if target_id exists in the target_ids JSON array
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
            // PostgreSQL: Use JSONB contains operator @>
            $qb->andWhere(
                $qb->expr()->eq(
                    $qb->createFunction('target_ids::jsonb @> ' . $qb->createNamedParameter('[' . $targetId . ']', IQueryBuilder::PARAM_STR) . '::jsonb'),
                    $qb->expr()->literal(true)
                )
            );
        } elseif ($dbProvider === IDBConnection::PLATFORM_MYSQL) {
            // MySQL 5.7+: Use JSON_CONTAINS
            $qb->andWhere(
                $qb->expr()->eq(
                    $qb->createFunction('JSON_CONTAINS(target_ids, ' . $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_STR) . ')'),
                    $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)
                )
            );
        } else {
            // SQLite or fallback: Use LIKE (less precise but works)
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
           ->andWhere($qb->expr()->eq('status', $qb->createNamedParameter(SupportEngine::STATUS_ACTIVE, IQueryBuilder::PARAM_STR)));

        $dbProvider = $this->db->getDatabaseProvider();

        if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
            // PostgreSQL: Use JSONB contains operator
            $qb->andWhere(
                $qb->expr()->eq(
                    $qb->createFunction('target_ids::jsonb @> ' . $qb->createNamedParameter('[' . $targetId . ']', IQueryBuilder::PARAM_STR) . '::jsonb'),
                    $qb->expr()->literal(true)
                )
            );
        } elseif ($dbProvider === IDBConnection::PLATFORM_MYSQL) {
            // MySQL: Use JSON_CONTAINS
            $qb->andWhere(
                $qb->expr()->eq(
                    $qb->createFunction('JSON_CONTAINS(target_ids, ' . $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_STR) . ')'),
                    $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)
                )
            );
        } else {
            // SQLite or fallback: Use LIKE
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
