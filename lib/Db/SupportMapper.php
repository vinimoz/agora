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
 * @template-extends QBMapper<Support>
 */
class SupportMapper extends QBMapper
{
    public const TABLE = Support::TABLE;

    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, Support::class);
    }

    /**
     * @return Support[]
     */
    public function findByUserId(string $userId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('inquiry_id', 'created')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        return $this->findEntities($qb);
    }


    /**
     * @return Support[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('user_id', 'created')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    public function findSupport(int $inquiryId, string $userId): ?Support
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    public function addSupport(int $inquiryId, string $userId): Support
    {
        $support = new Support();
        $support->setInquiryId($inquiryId);
        $support->setUserId($userId);
        $support->setCreated(time());

        return $this->insert($support);
    }

    public function removeSupport(int $inquiryId, string $userId): bool
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        return $qb->executeStatement() > 0;
    }

    public function removeAllSupportForInquiry(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    public function countByInquiry(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }

    public function countByUser(string $userId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        $result = $qb->executeQuery()->fetch();
        return (int) ($result['count'] ?? 0);
    }
}
