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
 * @template-extends QBMapper<ModerationStatus>
 */
class ModerationStatusMapper extends QBMapper
{
    public const TABLE = ModerationStatus::TABLE;

    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, ModerationStatus::class);
    }

    public function find(int $id): ModerationStatus
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        
        return $this->findEntity($qb);
    }

    /**
     * @return ModerationStatus[]
     */
    public function findAll(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('order', 'ASC'); 
        
        return $this->findEntities($qb);
    }

    /**
     * @return ModerationStatus[]
     */
    public function findByInquiryType(string $inquiryType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType, IQueryBuilder::PARAM_STR)))
            ->orderBy('order', 'ASC'); // SUPPRIMEZ LES BACKTICKS
        
        return $this->findEntities($qb);
    }

    public function findByStatusKey(string $inquiryType, string $statusKey): ?ModerationStatus
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType, IQueryBuilder::PARAM_STR)))
            ->andWhere($qb->expr()->eq('status_key', $qb->createNamedParameter($statusKey, IQueryBuilder::PARAM_STR)));
        
        try {
            return $this->findEntity($qb);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function create(string $inquiryType, string $statusKey, string $label, 
        ?string $description, bool $isFinal, string $icon
    ): ModerationStatus {
        $status = new ModerationStatus();
        $status->setInquiryType($inquiryType);
        $status->setStatusKey($statusKey);
        $status->setLabel($label);
        $status->setDescription($description);
        $status->setIsFinal($isFinal);
        $status->setIcon($icon);
        
        // Set order to last position
        $maxOrder = $this->getMaxOrderForInquiryType($inquiryType);
        $status->setOrder($maxOrder + 1);
        
        return $this->insert($status);
    }

    public function updateStatus(ModerationStatus $status): ModerationStatus
    {
        return $this->update($status);
    }

    public function deleteById(int $id): void
    {
        $status = $this->find($id);
        $this->delete($status);
        
        // Reorder remaining statuses
        $this->reorderAfterDeletion($status->getInquiryType());
    }

    private function getMaxOrderForInquiryType(string $inquiryType): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->max('order'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType, IQueryBuilder::PARAM_STR)));
        
        $result = $qb->executeQuery();
        $maxOrder = (int)$result->fetchOne();
        $result->closeCursor();
        
        return $maxOrder;
    }

    public function reorderStatuses(string $inquiryType, array $newOrder): void
    {
        $qb = $this->db->getQueryBuilder();
        
        foreach ($newOrder as $index => $statusId) {
            $qb->update($this->getTableName())
                ->set('order', $qb->createNamedParameter($index, IQueryBuilder::PARAM_INT)) 
                ->where($qb->expr()->eq('id', $qb->createNamedParameter($statusId, IQueryBuilder::PARAM_INT)))
                ->andWhere($qb->expr()->eq('inquiry_type', $qb->createNamedParameter($inquiryType, IQueryBuilder::PARAM_STR)))
                ->executeStatement();
        }
    }

        

    private function reorderAfterDeletion(string $inquiryType): void
    {
        $statuses = $this->findByInquiryType($inquiryType);
        
        $qb = $this->db->getQueryBuilder();
        foreach ($statuses as $index => $status) {
            $qb->update($this->getTableName())
                ->set('order', $qb->createNamedParameter($index, IQueryBuilder::PARAM_INT)) // SUPPRIMEZ LES BACKTICKS
                ->where($qb->expr()->eq('id', $qb->createNamedParameter($status->getId(), IQueryBuilder::PARAM_INT)))
                ->executeStatement();
        }
    }
}
