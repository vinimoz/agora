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
 * @template-extends QBMapperWithUser<Comment>
 */
class CommentMapper extends QBMapperWithUser
{
    public const TABLE = Comment::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, self::TABLE, Comment::class);
    }


    public function countByInquiryId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
               $qb->select('COUNT(*) AS count')
                   ->from($this->tableName)
                   ->where(
                    $qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId))
                );

        $result = $qb->executeQuery()->fetchOne();
        return (int)$result;
    }


    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return Comment
     */
    public function find(int $id): Comment
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @param  int  $inquiryId  id of inquiry to get comments from
     * @param  bool $getDeleted Get deleted comments as well
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return Comment[]
     */
    public function findByInquiry(int $inquiryId, bool $getDeleted = false): array
    {
        $currentUserId = $this->userSession->getCurrentUserId();

        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere(
            $qb->expr()->orX(
                $qb->expr()->eq(self::TABLE . '.confidential', $qb->createNamedParameter(Comment::CONFIDENTIAL_NO, IQueryBuilder::PARAM_INT)),
                $qb->expr()->eq(self::TABLE . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
                $qb->expr()->andX(
                    $qb->expr()->eq(self::TABLE . '.confidential', $qb->createNamedParameter(Comment::CONFIDENTIAL_YES, IQueryBuilder::PARAM_INT)),
                    $qb->expr()->eq(self::TABLE . '.recipient', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
                )
            )
        );

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    /**
     * @return void
     */
    public function renameUserId(string $userId, string $replacementId, ?int $inquiryId = null): void
    {
        $query = $this->db->getQueryBuilder();
        $query->update($this->getTableName(), self::TABLE)
            ->set('user_id', $query->createNamedParameter($replacementId))
            ->where($query->expr()->eq('user_id', $query->createNamedParameter($userId)));

        if ($inquiryId !== null) {
            $query->andWhere($query->expr()->eq('inquiry_id', $query->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        }

        $query->executeStatement();
    }

    public function purgeDeletedComments(int $offset): int
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
     * Build the enhanced query with joined tables
     */
    protected function buildQuery(): IQueryBuilder
    {
        $currentUserId = $this->userSession->getCurrentUserId();
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->groupBy(self::TABLE . '.id');

        $this->joinAnon($qb, self::TABLE);
        $this->joinShareRole($qb, self::TABLE, $currentUserId);
        return $qb;
    }
}
