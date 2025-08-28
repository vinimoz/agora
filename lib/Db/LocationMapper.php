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
 * @template-extends QBMapper<Location>
 */
class LocationMapper extends QBMapper
{
    public const TABLE = Location::TABLE;

    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, Location::class);
    }

    public function find(int $id): Location
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        
        return $this->findEntity($qb);
    }

    /**
     * @return Location[]
     */
    public function findAll(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('name', 'ASC');
        
        return $this->findEntities($qb);
    }

    /**
     * @return Location[]
     */
    public function findByParentId(?int $parentId = null): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName());
        
        if ($parentId === null) {
            $qb->where($qb->expr()->isNull('parent_id'));
        } else {
            $qb->where($qb->expr()->eq('parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)));
        }
        
        $qb->orderBy('name', 'ASC');
        
        return $this->findEntities($qb);
    }

    public function deleteById(int $id): void
    {
        $location = $this->find($id);
        $this->delete($location);
        
        // Delete children recursively
        $this->deleteChildren($id);
    }

    private function deleteChildren(int $parentId): void
    {
        $children = $this->findByParentId($parentId);
        foreach ($children as $child) {
            $this->deleteById($child->getId());
        }
    }
}
