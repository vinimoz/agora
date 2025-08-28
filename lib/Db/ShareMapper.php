<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Exception;
use OCA\Agora\Exceptions\ShareNotFoundException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Share>
 */
class ShareMapper extends QBMapper
{
    public const TABLE = Share::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        IDBConnection $db,
    ) {
        parent::__construct($db, Share::TABLE, Share::class);
    }

    /**
     * @throws       \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return       Share[]
     * @psalm-return array<array-key, Share>
     */
    public function findByInquiry(int $inquiryId, array $groupIds = [], bool $getDeleted = false): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id')
            ->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        if (!empty($groupIds)) {
            $qb->orWhere(
                $qb->expr()->in(self::TABLE . '.group_id', $qb->createNamedParameter($groupIds, IQueryBuilder::PARAM_INT_ARRAY))
            );
        }
        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        $this->joinUserSupportCount($qb, self::TABLE);
        $this->joinAnon($qb, self::TABLE);

        return $this->findEntities($qb);
    }
    /**
     * @throws       \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return       Share[]
     * @psalm-return array<array-key, Share>
     */
    public function findByInquiryGroup(int $inquiryGroupId, bool $getDeleted = false): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id')
            ->where($qb->expr()->eq(self::TABLE . '.group_id', $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    /**
     * @throws       \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return       Share[]
     * @psalm-return array<array-key, Share>
     */
    public function findByInquiryNotInvited(int $inquiryId, bool $getDeleted = false): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('invitation_sent', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    /**
     * @throws       \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return       Share[]
     * @psalm-return array<array-key, Share>
     */
    public function findByInquiryUnreminded(int $inquiryId, bool $getDeleted = false): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('reminder_sent', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    /**
     * @throws ShareNotFoundException if not found
     */
    public function findByInquiryAndUser(int $inquiryId, string $userId, bool $findDeleted = false): Share
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id')
            ->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq(self::TABLE . '.user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->isNotNull(self::TABLE . '.id'));

        if (!$findDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }
        $this->joinUserSupportCount($qb, self::TABLE);
        $this->joinAnon($qb, self::TABLE);

        try {
            return $this->findEntity($qb);
        } catch (Exception $e) {
            throw new ShareNotFoundException('Share not found by userId and inquiryId');
        }
    }

    /**
     * @throws ShareNotFoundException
     */
    public function findByToken(string $token, bool $getDeleted = false): Share
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id')
            ->where($qb->expr()->eq(self::TABLE . '.token', $qb->createNamedParameter($token, IQueryBuilder::PARAM_STR)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        $this->joinUserSupportCount($qb, self::TABLE);
        $this->joinAnon($qb, self::TABLE);

        try {
            return $this->findEntity($qb);
        } catch (DoesNotExistException $e) {
            throw new ShareNotFoundException('Token ' . $token . ' does not exist');
        }
    }

    /**
     * @return void
     */
    public function deleteByIdAndType(string $id, string $type): void
    {
        $query = $this->db->getQueryBuilder();
        $query->delete($this->getTableName())
            ->where('user_id = :id')
            ->andWhere('type = :type')
            ->setParameter('id', $id)
            ->setParameter('type', $type);
        $query->executeStatement();
    }

    public function purgeDeletedShares(int $offset): int
    {
        $query = $this->db->getQueryBuilder();
        $query->delete($this->getTableName())
            ->where(
                $query->expr()->gt('deleted', $query->expr()->literal(0, IQueryBuilder::PARAM_INT))
            )
            ->andWhere(
                $query->expr()->lt('deleted', $query->createNamedParameter($offset))
            );
        return $query->executeStatement();
    }

    /**
     * Joins supports count of the share user in the given inquiry
     */
    protected function joinUserSupportCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'supports',
    ): void {

        $qb->addSelect($qb->func()->count($joinAlias . '.id', 'supported'));

        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.inquiry_id'),
                $qb->expr()->eq($joinAlias . '.user_id', $fromAlias . '.user_id'),
            )
        );
    }

    /**
     * Joins anonymous setting of inquiry
     */
    protected function joinAnon(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'anon',
    ): void {

        $qb->selectAlias($joinAlias . '.anonymous', 'anonymizedSupports')
            ->addGroupBy(
                $joinAlias . '.anonymous',
            );

        $qb->leftJoin(
            $fromAlias,
            Inquiry::TABLE,
            $joinAlias,
            $qb->expr()->eq($joinAlias . '.id', $fromAlias . '.inquiry_id'),
        );
    }
}
