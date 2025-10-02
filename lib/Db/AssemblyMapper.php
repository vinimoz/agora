<?php
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
declare(strict_types=1);

namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Assembly>
 */
class AssemblyMapper extends QBMapper
{
    public const TABLE = Assembly::TABLE;

    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, self::TABLE, Assembly::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
     * @return Assembly
     */
    public function find(int $id): Assembly
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * Find all non-deleted consultations.
     *
     * @return Assembly[]
     */
    public function findAllActive(): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    /**
     * Find consultations by category
     *
     * @param  int $categoryId
     * @return Assembly[]
     */
    public function findByCategory(int $categoryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.category_id', $qb->createNamedParameter($categoryId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    /**
     * Find consultations by location
     *
     * @param  int $locationId
     * @return Assembly[]
     */
    public function findByLocation(int $locationId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.location_id', $qb->createNamedParameter($locationId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    /**
     * Soft-delete a consultation
     */
    public function softDelete(int $id): void
    {
        $query = $this->db->getQueryBuilder();
        $query->update($this->getTableName())
            ->set('deleted', $query->createNamedParameter(1))
            ->where($query->expr()->eq('id', $query->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        $query->executeStatement();
    }

    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id');
        return $qb;
    }
}

