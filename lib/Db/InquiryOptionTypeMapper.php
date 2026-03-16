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
 * @template-extends QBMapper<InquiryOptionType>
 */
class InquiryOptionTypeMapper extends QBMapper
{
    public const TABLE = InquiryOptionType::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, InquiryOptionType::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryOptionType
     */
    public function find(int $id): InquiryOptionType
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryOptionType
     */
    public function findByType(string $type): InquiryOptionType
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_type', $qb->createNamedParameter($type, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryOptionType[]
     */
    public function findAll(): array
    {
        $qb = $this->buildQuery();
        $qb->orderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryOptionType[]
     */
    public function findByFamily(string $family): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.family', $qb->createNamedParameter($family, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
    }


    public function optionTypeExists(string $optionType): bool
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*'))
            ->from(self::TABLE)
            ->where($qb->expr()->eq('option_type', $qb->createNamedParameter($optionType)));

        return (int)$qb->executeQuery()->fetchOne() > 0;
    }
    /**
     * @return InquiryOptionType[]
     */
    public function findByInquiryOptionType(string $optionType): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_type', $qb->createNamedParameter($optionType, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.created', 'DESC');
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
    public function getFields(string $optionType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('fields')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('option_type', $qb->createNamedParameter($optionType)));

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
     * Get allowed_response JSON value for specific inquiry type
     *
     * @return array
     */
    public function getAllowedResponse(string $optionType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('allowed_response')
            ->from(InquiryOptionType::TABLE)
            ->where($qb->expr()->eq('option_type', $qb->createNamedParameter($optionType)));

        $result = $qb->executeQuery()->fetch();
        return $result ? json_decode($result['allowed_response'], true) ?? [] : [];
    }

    public function getFamilyFromType(string $type): string
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('family')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('option_type', $qb->createNamedParameter($type)));

        $result = $qb->executeQuery()->fetch();

        return $result['family'];
    }
}
