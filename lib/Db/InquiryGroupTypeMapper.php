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
 * @template-extends QBMapper<InquiryGroupType>
 */
class InquiryGroupTypeMapper extends QBMapper
{
    public const TABLE = InquiryGroupType::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, InquiryGroupType::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryGroupType
     */
    public function find(int $id): InquiryGroupType
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryGroupType
     */
    public function findByType(string $type): InquiryGroupType
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.group_type', $qb->createNamedParameter($type, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryGroupType[]
     */
    public function findAll(): array
    {
        $qb = $this->buildQuery();
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryGroupType[]
     */
    public function findByFamily(string $family): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.family', $qb->createNamedParameter($family, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.created', 'DESC');

        return $this->findEntities($qb);
    }


    public function groupTypeExists(string $groupType): bool
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*'))
            ->from(self::TABLE)
            ->where($qb->expr()->eq('group_type', $qb->createNamedParameter($groupType)));

        return (int)$qb->executeQuery()->fetchOne() > 0;
    }
    /**
     * @return InquiryGroupType[]
     */
    public function findByInquiryGroupType(string $groupType): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.group_type', $qb->createNamedParameter($groupType, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
            ->addOrderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
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

    /**
     * Get fields JSON value for specific inquiry type
     *
     * @return array
     */
    public function getFields(string $groupType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('fields')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('group_type', $qb->createNamedParameter($groupType)));

        $result = $qb->executeQuery()->fetch();

        if ($result && !empty($result['fields'])) {
            $fields = json_decode($result['fields'], true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($fields)) {
                return $fields;
            }
        }

        return [];
    }

    /**
     * Get allowed_inquiry_types JSON value for specific inquiry type
     *
     * @return array
     */
    public function getAllowedInquiryGroupTypes(string $groupType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('allowed_inquiry_types')
            ->from(InquiryGroupType::TABLE)
            ->where($qb->expr()->eq('group_type', $qb->createNamedParameter($groupType)));

        $result = $qb->execute()->fetch();
        return $result ? json_decode($result['allowed_inquiry_types'], true) ?? [] : [];
    }
}
