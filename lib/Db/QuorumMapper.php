<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Quorum>
 */
class QuorumMapper extends QBMapper
{
    public const TABLE = Quorum::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, Quorum::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return Quorum
     */
    public function find(int $id): Quorum
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @return Quorum[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.phase', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @return Quorum[]
     */
    public function findByOptionId(int $optionId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.phase', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @return Quorum[]
     */
    public function findByInquiryIdAndPhase(int $inquiryId, string $phase): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.phase', $qb->createNamedParameter($phase, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @return Quorum[]
     */
    public function findByOptionIdAndPhase(int $optionId, string $phase): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.phase', $qb->createNamedParameter($phase, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return Quorum
     */
    public function findByInquiryIdAndPhaseAndType(int $inquiryId, string $phase, string $type): Quorum
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.phase', $qb->createNamedParameter($phase, IQueryBuilder::PARAM_STR)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.type', $qb->createNamedParameter($type, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * Get the highest sort order value for an inquiry
     */
    public function getMaxSortOrderForInquiry(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->max('sort_order'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetchOne();
        return $result ? (int)$result : 0;
    }

    /**
     * Get the highest sort order value for an option
     */
    public function getMaxSortOrderForOption(int $optionId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->max('sort_order'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetchOne();
        return $result ? (int)$result : 0;
    }

    /**
     * Update sort order for multiple quorums
     */
    public function updateSortOrders(array $sortOrders): void
    {
        foreach ($sortOrders as $id => $sortOrder) {
            $qb = $this->db->getQueryBuilder();
            $qb->update($this->getTableName())
                ->set('sort_order', $qb->createNamedParameter((int)$sortOrder, IQueryBuilder::PARAM_INT))
                ->set('updated', $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT))
                ->where($qb->expr()->eq('id', $qb->createNamedParameter((int)$id, IQueryBuilder::PARAM_INT)))
                ->executeStatement();
        }
    }

    /**
     * Delete all quorums for an inquiry
     */
    public function deleteByInquiryId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Delete all quorums for an option
     */
    public function deleteByOptionId(int $optionId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Delete all quorums for multiple options
     */
    public function deleteByOptionIds(array $optionIds): int
    {
        if (empty($optionIds)) {
            return 0;
        }

        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->in('option_id', $qb->createNamedParameter($optionIds, IQueryBuilder::PARAM_INT_ARRAY)));

        return $qb->executeStatement();
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
