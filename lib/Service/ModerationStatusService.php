<?php
declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\ModerationStatusMapper;
use OCA\Agora\Db\ModerationStatus;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class ModerationStatusService
{

    public function __construct(
        private ModerationStatusMapper $moderationStatusMapper,
        private LoggerInterface $logger
    ) {
    }

    /**
     * @return ModerationStatus[]
     */
    public function findAll(): array
    {
        return $this->moderationStatusMapper->findAll();
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): ModerationStatus
    {
        return $this->moderationStatusMapper->find($id);
    }

    public function findByInquiryType(string $inquiryType): array
    {
        return $this->moderationStatusMapper->findByInquiryType($inquiryType);
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
        $status->setCreated(time());
        $status->setUpdated(time());
        
        return $this->moderationStatusMapper->insert($status);
    }

    public function update(int $id, string $statusKey, string $label, 
        ?string $description, bool $isFinal, string $icon
    ): ModerationStatus {
        $status = $this->moderationStatusMapper->find($id);
        $status->setStatusKey($statusKey);
        $status->setLabel($label);
        $status->setDescription($description);
        $status->setIsFinal($isFinal);
        $status->setIcon($icon);
        $status->setUpdated(time());
        
        return $this->moderationStatusMapper->update($status);
    }

    public function delete(int $id): void
    {
        $status = $this->moderationStatusMapper->find($id);
        $this->moderationStatusMapper->delete($status);
    }

    public function reorderStatuses(string $inquiryType, array $newOrder): void
    {
        $this->moderationStatusMapper->reorderStatuses($inquiryType, $newOrder);
    }
}
