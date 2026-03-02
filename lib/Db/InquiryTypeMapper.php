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
 * @template-extends QBMapper<InquiryType>
 */
class InquiryTypeMapper extends QBMapper
{
    public const TABLE = InquiryType::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, InquiryType::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryType
     */
    public function find(int $id): InquiryType
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryType
     */
    public function findByType(string $type): InquiryType
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_type', $qb->createNamedParameter($type, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryType[]
     */
    public function findAll(): array
    {
        $qb = $this->buildQuery();

        $qb->orderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
    }

    /**
     * @return InquiryType[]
     */
    public function findByFamily(string $family): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.family', $qb->createNamedParameter($family, IQueryBuilder::PARAM_STR)));
        $qb->orderBy(self::TABLE . '.created', 'DESC');
        return $this->findEntities($qb);
    }


    public function inquiryTypeExists(string $inquiryType): bool
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*'))
            ->from(self::TABLE)
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType)));

        return (int)$qb->executeQuery()->fetchOne() > 0;
    }
    /**
     * @return InquiryType[]
     */
    public function findByInquiryType(string $inquiryType): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_type', $qb->createNamedParameter($inquiryType, IQueryBuilder::PARAM_STR)));
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
    public function getFields(string $inquiryType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('fields')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType)));

        $result = $qb->executeQuery()->fetch();

        if ($result && !empty($result['fields'])) {
            $fields = json_decode($result['fields'], true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($fields)) {
                return $fields;
            }
        }

        return [];
    }


    public function getFamilyFromType(string $type): string
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('family')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($type)));

        $result = $qb->execute()->fetch();

        return $result['family'];
    }

    /**
     * Get allowed_response JSON value for specific inquiry type
     *
     * @return array
     */
    public function getAllowedResponse(string $inquiryType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('allowed_response')
            ->from(InquiryType::TABLE)
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType)));

        $result = $qb->execute()->fetch();
        return $result ? json_decode($result['allowed_response'], true) ?? [] : [];
    }

    /**
     * Get allowed_option_type JSON value for specific inquiry type
     *
     * @return array
     */
    public function getAllowedOptionType(string $inquiryType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('allowed_option_type')
            ->from(InquiryType::TABLE)
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType)));

        $result = $qb->execute()->fetch();
        return $result ? json_decode($result['allowed_option_type'], true) ?? [] : [];
    }
    /**
     * Get allowed_transformation JSON value for specific inquiry type
     *
     * @return array
     */
    public function getAllowedTransformation(string $inquiryType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('allowed_transformation')
            ->from(InquiryType::TABLE)
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType)));

        $result = $qb->execute()->fetch();
        return $result ? json_decode($result['allowed_transformation'], true) ?? [] : [];
    }
}
