<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Subscription>
 */
class SubscriptionMapper extends QBMapper
{
    public const TABLE = Subscription::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, Subscription::TABLE, Subscription::class);
    }

    /**
     * @throws       \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws       \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return       Subscription[]
     * @psalm-return array<array-key, Subscription>
     */
    public function findAllByInquiry(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where(
                $qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT))
            );

        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     */
    public function findByInquiryAndUser(int $inquiryId, string $userId): Subscription
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where(
                $qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT))
            )
            ->andWhere(
                $qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR))
            );

        return $this->findEntity($qb);
    }

    public function deleteByUserId(string $userId): void
    {
        $query = $this->db->getQueryBuilder();
        $query->delete($this->getTableName())
            ->where('user_id = :userId')
            ->setParameter('userId', $userId);
        $query->executeStatement();
    }

}
