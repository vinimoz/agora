<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\OptionFamily;
use OCA\Agora\Db\OptionFamilyMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class OptionFamilyService
{
    public function __construct(
        private LoggerInterface $logger,
        private OptionFamilyMapper $optionFamilyMapper,
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): OptionFamily
    {
        return $this->optionFamilyMapper->find($id);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByFamilyType(string $familyType): OptionFamily
    {
        return $this->optionFamilyMapper->findByFamilyType($familyType);
    }

    public function findAll(): array
    {
        return $this->optionFamilyMapper->findAll();
    }

    public function findAllSorted(): array
    {
        return $this->optionFamilyMapper->findAllSorted();
    }

    public function findBySearchTerm(string $searchTerm): array
    {
        return $this->optionFamilyMapper->findBySearchTerm($searchTerm);
    }

    public function familyTypeExists(string $familyType): bool
    {
        return $this->optionFamilyMapper->familyTypeExists($familyType);
    }

    public function getMaxSortOrder(): int
    {
        return $this->optionFamilyMapper->getMaxSortOrder();
    }

    public function create(
        string $familyType,
        string $label,
        ?string $description = '',
        string $icon = '',
        ?int $sortOrder = 0
    ): OptionFamily {
        if ($this->familyTypeExists($familyType)) {
            throw new \InvalidArgumentException('Family type already exists');
        }
    

        $optionFamily = new OptionFamily();
        $optionFamily->setFamilyType($familyType);
        $optionFamily->setLabel($label);
        $optionFamily->setDescription($description);
        $optionFamily->setIcon($icon);
        
        if ($sortOrder === 0) {
            $sortOrder = $this->getMaxSortOrder() + 1;
        }
        $optionFamily->setSortOrder($sortOrder);
        
        $optionFamily->setCreated(time());

        return $this->optionFamilyMapper->insert($inquiryFamily);
    }

    public function update(
        int $id,
        string $familyType,
        string $label,
        ?string $description = '',
        string $icon = '',
        ?int $sortOrder = 0
    ): OptionFamily {
        $this->logger->warning(' DEBUG : ', ['familyType' =>$familyType]);
        $optionFamily = $this->find($id);
        $optionFamily->setFamilyType($familyType);
        $optionFamily->setLabel($label);
        $optionFamily->setIcon($icon);
        $optionFamily->setDescription($description !== null ? $description : '');
        $optionFamily->setSortOrder($sortOrder !== null ? $sortOrder : 0);

        return $this->optionFamilyMapper->update($inquiryFamily);
    }

    public function updateSortOrders(array $sortOrders): void
    {
        $this->optionFamilyMapper->updateSortOrders($sortOrders);
    }

    public function delete(int $id): OptionFamily
    {
        $optionFamily = $this->find($id);
        return $this->optionFamilyMapper->delete($inquiryFamily);
    }

    public function deleteByFamilyType(string $familyType): OptionFamily
    {
        $optionFamily = $this->findByFamilyType($familyType);
        return $this->optionFamilyMapper->delete($inquiryFamily);
    }
}
