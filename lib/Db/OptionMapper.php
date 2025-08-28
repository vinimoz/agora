<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapperWithUser<Option>
 */
class OptionMapper extends QBMapperWithUser
{
    public const TABLE = Option::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     * @psalm-suppress UnusedProperty
     */
    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, Option::TABLE, Option::class);
    }

    /**
     * @throws       \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return       Option[]
     * @psalm-return array<array-key, Option>
     */
    public function getAll(bool $includeNull = false): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')->from($this->getTableName());

        if (!$includeNull) {
            $qb->where($qb->expr()->isNotNull(self::TABLE . '.inquiry_id'));
        }

        return $this->findEntities($qb);
    }

    /**
     * @return       Option[]
     * @param        int  $inquiryId
     * @param        bool $hideResults Whether the results should be hidden
     * @param        bool $getDeleted  also search for deleted options
     * @psalm-return array<array-key, Option>
     */
    public function findByInquiry(int $inquiryId, bool $hideResults = false, bool $getDeleted = false): array
    {
        $qb = $this->buildQuery($hideResults);
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    /**
     * @return Option
     * @param  int    $inquiryId
     * @param  string $inquiryOptionText option text
     * @param  bool   $getDeleted        also search for deleted options
     */
    public function findByInquiryAndText(int $inquiryId, string $inquiryOptionText, bool $getDeleted = false): Option
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq(self::TABLE . '.inquiry_option_text', $qb->createNamedParameter($inquiryOptionText, IQueryBuilder::PARAM_STR)));
        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntity($qb);
    }

    /**
     * @return Option
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     */
    public function find(int $id): Option
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->isNotNull(self::TABLE . '.inquiry_id'));

        return $this->findEntity($qb);
    }

    /**
     * @return       Option[]
     * @psalm-return array<array-key, Option>
     */
    public function findConfirmed(int $inquiryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gt(self::TABLE . '.confirmed', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    /**
     * @return (int|null)[]
     */
    public function getOrderBoundaries(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->selectAlias($qb->func()->max('order'), 'max')
            ->selectAlias($qb->func()->min('order'), 'min')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeQuery()->fetchAll()[0];
    }

    /**
     * Get the minimum date of all options in a inquiry
     *
     * @param  int $inquiryId
     * @return int|false Returns the minimum timestamp or false if no options are found
     */
    public function getMinDate(int $inquiryId): int|false
    {
        $qb = $this->db->getQueryBuilder();

        $qb->selectAlias($qb->func()->min('timestamp'), 'min_date')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeQuery()->fetchOne();
    }


    /**
     * Get the maximum date of all options in a inquiry
     *
     * @param          int $inquiryId
     * @return         int|false Returns the maximum timestamp or false if no options are found
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function getMaxDate(int $inquiryId): int|false
    {
        $qb = $this->db->getQueryBuilder();

        $qb->selectAlias($qb->func()->max('timestamp'), 'max_date')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeQuery()->fetchOne();
    }

    /**
     * @return Option[]
     */
    public function findOptionsWithDuration(): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where(
                $qb->expr()->eq('duration', $qb->createNamedParameter(86400, IQueryBuilder::PARAM_INT))
            )
            ->orderBy('order', 'ASC');

        return $this->findEntities($qb);
    }

    public function renameUserId(string $userId, string $replacementName, ?int $inquiryId = null): void
    {
        $query = $this->db->getQueryBuilder();
        $query->update($this->getTableName())
            ->set('owner', $query->createNamedParameter($replacementName))
            ->where($query->expr()->eq('owner', $query->createNamedParameter($userId)));

        if ($inquiryId !== null) {
            $query->andWhere($query->expr()->eq('inquiry_id', $query->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        }

        $query->executeStatement();
    }

    public function purgeDeletedOptions(int $offset): int
    {
        $query = $this->db->getQueryBuilder();
        $query->delete($this->getTableName())
            ->andWhere(
                $query->expr()->gt('deleted', $query->expr()->literal(0, IQueryBuilder::PARAM_INT))
            )
            ->andWhere(
                $query->expr()->lt('deleted', $query->expr()->literal($offset, IQueryBuilder::PARAM_INT))
            );
        return $query->executeStatement();
    }

    /**
     * Build the enhanced query with joined tables
     *
     * @param bool $hideResults Whether inquiry results are defined as beeing hidden
     *                          injects the inquiry permission allowdSeeResults into the query
     */
    protected function buildQuery(bool $hideResults = false): IQueryBuilder
    {
        $currentUserId = $this->userSession->getCurrentUserId();
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id')
            ->orderBy('order', 'ASC');


        $this->joinInquiryForLimits($qb, self::TABLE);
        $this->joinAnon($qb, self::TABLE);
        $this->joinShareRole($qb, self::TABLE, $currentUserId);


        return $qb;
    }

    /**
     * Joins inquiry to fetch option_limit and support_limit
     */
    protected function joinInquiryForLimits(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'limits',
    ): void {
        // force value into a MIN function to avoid grouping errors
        $qb->selectAlias($qb->func()->min($joinAlias . '.support_limit'), 'support_limit');

        $qb->leftJoin(
            $fromAlias,
            Inquiry::TABLE,
            $joinAlias,
            $qb->expr()->eq($joinAlias . '.id', $fromAlias . '.inquiry_id'),
        );
    }

}
