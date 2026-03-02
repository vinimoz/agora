<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;

/**
 * @template-extends QBMapper<InquiryFamily>
 */
class InquiryFamilyMapper extends QBMapper
{
    public const TABLE = InquiryFamily::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, InquiryFamily::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryFamily
     */
    public function find(int $id): InquiryFamily
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryFamily
     */
    public function findByFamilyType(string $familyType): InquiryFamily
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.family_type', $qb->createNamedParameter($familyType, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryFamily[]
     */
    public function findAll(): array
    {
        $qb = $this->buildQuery();
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.label', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryFamily[]
     */
    public function findAllSorted(): array
    {
        $qb = $this->buildQuery();
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryFamily[]
     */
    public function findBySearchTerm(string $searchTerm): array
    {
        $qb = $this->buildQuery();
        $qb->where(
            $qb->expr()->orX(
                $qb->expr()->iLike(self::TABLE . '.family_type', $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($searchTerm) . '%', IQueryBuilder::PARAM_STR)),
                $qb->expr()->iLike(self::TABLE . '.label', $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($searchTerm) . '%', IQueryBuilder::PARAM_STR)),
                $qb->expr()->iLike(self::TABLE . '.description', $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($searchTerm) . '%', IQueryBuilder::PARAM_STR))
            )
        );
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.label', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * Check if a family type already exists
     */
    public function familyTypeExists(string $familyType): bool
    {
        try {
            $this->findByFamilyType($familyType);
            return true;
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return false;
        } catch (\OCP\AppFramework\Db\MultipleObjectsReturnedException $e) {
            return true;
        }
    }

    /**
     * Get the highest sort order value
     */
    public function getMaxSortOrder(): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->max('sort_order'))
            ->from($this->getTableName());

        $result = $qb->executeQuery()->fetchOne();
        return $result ? (int)$result : 0;
    }

    /**
     * Update sort order for multiple families
     */
    public function updateSortOrders(array $sortOrders): void
    {
        foreach ($sortOrders as $id => $sortOrder) {
            $qb = $this->db->getQueryBuilder();
            $qb->update($this->getTableName())
                ->set('sort_order', $qb->createNamedParameter((int)$sortOrder, IQueryBuilder::PARAM_INT))
                ->where($qb->expr()->eq('id', $qb->createNamedParameter((int)$id, IQueryBuilder::PARAM_INT)))
                ->executeStatement();
        }
    }

    /**
     * Build the query
     */
    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE);

        return $qb;
    }
}
