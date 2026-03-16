<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryFamily;
use OCA\Agora\Db\InquiryFamilyMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class InquiryFamilyService
{
    public function __construct(
        private LoggerInterface $logger,
        private InquiryFamilyMapper $inquiryFamilyMapper,
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryFamily
    {
        return $this->inquiryFamilyMapper->find($id);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByFamilyType(string $familyType): InquiryFamily
    {
        return $this->inquiryFamilyMapper->findByFamilyType($familyType);
    }

    public function findAll(): array
    {
        return $this->inquiryFamilyMapper->findAll();
    }

    public function findAllSorted(): array
    {
        return $this->inquiryFamilyMapper->findAllSorted();
    }

    public function findBySearchTerm(string $searchTerm): array
    {
        return $this->inquiryFamilyMapper->findBySearchTerm($searchTerm);
    }

    public function familyTypeExists(string $familyType): bool
    {
        return $this->inquiryFamilyMapper->familyTypeExists($familyType);
    }

    public function getMaxSortOrder(): int
    {
        return $this->inquiryFamilyMapper->getMaxSortOrder();
    }

    public function create(
        string $familyType,
        string $label,
        ?string $description = '',
        string $icon = '',
        ?int $sortOrder = 0
    ): InquiryFamily {
        if ($this->familyTypeExists($familyType)) {
            throw new \InvalidArgumentException('Family type already exists');
        }


        $inquiryFamily = new InquiryFamily();
        $inquiryFamily->setFamilyType($familyType);
        $inquiryFamily->setLabel($label);
        $inquiryFamily->setDescription($description);
        $inquiryFamily->setIcon($icon);

        if ($sortOrder === 0) {
            $sortOrder = $this->getMaxSortOrder() + 1;
        }
        $inquiryFamily->setSortOrder($sortOrder);

        $inquiryFamily->setCreated(time());

        return $this->inquiryFamilyMapper->insert($inquiryFamily);
    }

    public function update(
        int $id,
        string $familyType,
        string $label,
        ?string $description = '',
        string $icon = '',
        ?int $sortOrder = 0
    ): InquiryFamily {
        $this->logger->warning(' DEBUG : ', ['familyType' => $familyType]);
        $inquiryFamily = $this->find($id);
        $inquiryFamily->setFamilyType($familyType);
        $inquiryFamily->setLabel($label);
        $inquiryFamily->setIcon($icon);
        $inquiryFamily->setDescription($description !== null ? $description : '');
        $inquiryFamily->setSortOrder($sortOrder !== null ? $sortOrder : 0);

        return $this->inquiryFamilyMapper->update($inquiryFamily);
    }

    public function updateSortOrders(array $sortOrders): void
    {
        $this->inquiryFamilyMapper->updateSortOrders($sortOrders);
    }

    public function delete(int $id): InquiryFamily
    {
        $inquiryFamily = $this->find($id);
        return $this->inquiryFamilyMapper->delete($inquiryFamily);
    }

    public function deleteByFamilyType(string $familyType): InquiryFamily
    {
        $inquiryFamily = $this->findByFamilyType($familyType);
        return $this->inquiryFamilyMapper->delete($inquiryFamily);
    }
}
