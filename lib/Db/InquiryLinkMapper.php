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
 * @template-extends QBMapper<InquiryLink>
 */
class InquiryLinkMapper extends QBMapper
{
    public const TABLE = InquiryLink::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, InquiryLink::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryLink
     */
    public function find(int $id): InquiryLink
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryLink[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryLink[]
     */
    public function findByTarget(string $targetApp, string $targetType, string $targetId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.target_app', $qb->createNamedParameter($targetApp, IQueryBuilder::PARAM_STR)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryLink[]
     */
    public function findByTargetApp(string $targetApp): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.target_app', $qb->createNamedParameter($targetApp, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC');
        return $this->findEntities($qb);
    }

    /**
     * Delete all links for an inquiry
     */
    public function deleteByInquiryId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Build the query with joined tables if needed
     */
    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE);

        return $qb;
    }
}
