<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryStatusMapper;
use OCA\Agora\Db\InquiryStatus;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class InquiryStatusService
{
    public function __construct(
        private InquiryStatusMapper $inquiryStatusMapper,
        private LoggerInterface $logger
    ) {
    }

    /**
     * @return InquiryStatus[]
     */
    public function findAll(): array
    {
        return $this->inquiryStatusMapper->findAll();
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryStatus
    {
        return $this->inquiryStatusMapper->find($id);
    }

    public function findByInquiryType(string $inquiryType): array
    {
        return $this->inquiryStatusMapper->findByInquiryType($inquiryType);
    }

    public function create(
        string $inquiryType,
        string $statusKey,
        string $label,
        ?string $description,
        bool $isFinal,
        string $icon
    ): InquiryStatus {
        $status = new InquiryStatus();
        $status->setInquiryType($inquiryType);
        $status->setStatusKey($statusKey);
        $status->setLabel($label);
        $status->setDescription($description);
        $status->setIsFinal($isFinal);
        $status->setIcon($icon);
        $status->setCreated(time());
        $status->setUpdated(time());

        return $this->inquiryStatusMapper->insert($status);
    }

    public function update(
        int $id,
        string $statusKey,
        string $label,
        ?string $description,
        bool $isFinal,
        string $icon
    ): InquiryStatus {
        $status = $this->inquiryStatusMapper->find($id);
        $status->setStatusKey($statusKey);
        $status->setLabel($label);
        $status->setDescription($description);
        $status->setIsFinal($isFinal);
        $status->setIcon($icon);
        $status->setUpdated(time());

        return $this->inquiryStatusMapper->update($status);
    }

    public function delete(int $id): void
    {
        $status = $this->inquiryStatusMapper->find($id);
        $this->inquiryStatusMapper->delete($status);
    }

    public function reorderStatuses(string $inquiryType, array $newOrder): void
    {
        $this->inquiryStatusMapper->reorderStatuses($inquiryType, $newOrder);
    }
}
