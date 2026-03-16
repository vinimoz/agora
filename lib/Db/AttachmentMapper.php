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

/**
 * @template-extends QBMapperWithUser<Attachment>
 */
class AttachmentMapper extends QBMapperWithUser
{
    public const TABLE = Attachment::TABLE;

    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, self::TABLE, Attachment::class);
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
     * @throws \OCP\AppFramework\Db\DoesNotExistException
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
     */
    public function find(int $id): Attachment
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }
    /**
     * Find attachment by file ID and inquiry ID
     *
     * @param  int    $inquiryId The inquiry ID
     * @param  string $fileId    The file ID to search for
     * @return Attachment
     * @throws \OCP\AppFramework\Db\DoesNotExistException
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
     */
    public function findByFileGroupId(int $inquiryId, int $fileId): Attachment
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.file_id', $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq(self::TABLE . '.group_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * Find attachment by file ID and inquiry ID
     *
     * @param  int    $inquiryId The inquiry ID
     * @param  string $fileId    The file ID to search for
     * @return Attachment
     * @throws \OCP\AppFramework\Db\DoesNotExistException
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
     */
    public function findByFileId(int $inquiryId, int $fileId): Attachment
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.file_id', $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * Delete an attachment by its ID
     *
     * @param  int $attachmentId ID of the attachment to delete
     * @return Attachment The deleted attachment (with only ID set)
     */
    public function deleteById(int $attachmentId): Attachment
    {
        $qb = $this->db->getQueryBuilder();

        // First get the attachment to return it
        $attachment = $this->findById($attachmentId);

        // Then delete it
        $qb->delete($this->getTableName())
            ->where(
                $qb->expr()->eq('id', $qb->createNamedParameter($attachmentId, IQueryBuilder::PARAM_INT))
            );

        $qb->executeStatement();

        // Return the deleted attachment (with only ID set)
        $deletedAttachment = new Attachment();
        $deletedAttachment->setId($attachmentId);
        return $deletedAttachment;
    }

    /**
     * Find a single attachment by its ID
     *
     * @param  int $id Attachment ID
     * @return Attachment
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     */
    public function findById(int $id): Attachment
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where(
                $qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT))
            );

        return $this->findEntity($qb);
    }
    /**
     * @return Attachment[]
     */
    public function findByGroupId(int $inquiryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.group_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    /**
     * @return Attachment[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    public function deleteByGroupId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }


    public function deleteByInquiryId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE);
        return $qb;
    }
}
