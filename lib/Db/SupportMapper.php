<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;

/**
 * @template-extends QBMapper<Support>
 */
class SupportMapper extends QBMapperWithUser
{
    public const TABLE = Support::TABLE;

    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, self::TABLE, Support::class);
    }

    public function getAll(bool $includeNull = false): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')->from($this->getTableName());

        if (!$includeNull) {
            $qb->where($qb->expr()->isNotNull('inquiry_id'));
        }

        return $this->findEntities($qb);
    }

    /**
     * @return Support[]
     */
    public function findByUserId(string $userId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
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
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    /**
     * @return Support[]
     */
    public function findByOptionId(int $inquiryId, int $optionId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    /**
     * @return Support[]
     */
    public function findBySupportEngineId(int $engineId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    public function findSupport(int $inquiryId, string $userId, int $optionId, ?int $engineId = null): ?Support
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        if ($engineId !== null) {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    public function addSupport(
        int $inquiryId,
        string $userId,
        mixed $value,
        int $optionId,
        int $weight = 1,
        ?int $engineId = null
    ): Support {
        $support = new Support();
        $support->setInquiryId($inquiryId);
        $support->setUserId($userId);
        $support->setValue($value);
        $support->setOptionId($optionId);
        $support->setWeight($weight);
        $support->setCreated(time());

        if ($engineId !== null) {
            $support->setSupportEngineId($engineId);
        }

        $supportHash = hash('sha256', $inquiryId . '_' . $optionId . '_' . $userId . '_' . time());
        $support->setSupportHash($supportHash);

        return $this->insert($support);
    }

    public function removeSupport(int $inquiryId, string $userId, int $optionId, ?int $engineId = null): bool
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        if ($engineId !== null) {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

        return $qb->executeStatement() > 0;
    }

    public function removeAllSupportForInquiry(int $inquiryId, ?int $engineId = null): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        if ($engineId !== null) {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

        return $qb->executeStatement();
    }

    public function countByInquiry(int $inquiryId, ?int $engineId = null): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        if ($engineId !== null) {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }

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
