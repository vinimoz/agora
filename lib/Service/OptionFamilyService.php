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

    /**
     * Normalize a JSON-ish field: accepts array/object/null/string(JSON)
     */
    private function normalizeJson(mixed $value, array|string $fallback): string
    {
        if ($value === null || $value === '') {
            return is_array($fallback) ? json_encode($fallback) : $fallback;
        }
        if (is_string($value)) {
            // Validate that it's valid JSON
            json_decode($value);
            return json_last_error() === JSON_ERROR_NONE ? $value : json_encode($fallback);
        }
        return json_encode($value);
    }

    public function create(
        string $familyType,
        string $label,
        ?string $description = '',
        string $icon = '',
        ?int $sortOrder = null,
        mixed $ui = null,
        mixed $rules = null,
        mixed $features = null,
        mixed $actions = null,
    ): OptionFamily {
        if ($this->familyTypeExists($familyType)) {
            throw new \InvalidArgumentException('Family type already exists');
        }


        $optionFamily = new OptionFamily();
        $optionFamily->setFamilyType($familyType);
        $optionFamily->setLabel($label);
        $optionFamily->setDescription($description ?? '');
        $optionFamily->setIcon($icon);

        if ($sortOrder === null || $sortOrder === 0) {
            $sortOrder = $this->getMaxSortOrder() + 1;
        }
        $optionFamily->setSortOrder($sortOrder);

        // JSON columns (mirrors inquiry family structure)
        $optionFamily->setUi($this->normalizeJson($ui, []));
        $optionFamily->setRules($this->normalizeJson($rules, []));
        $optionFamily->setFeatures($this->normalizeJson($features, []));
        $optionFamily->setActions($this->normalizeJson($actions, []));

        $optionFamily->setCreated(time());

        return $this->optionFamilyMapper->insert($optionFamily);
    }

    public function update(
        int $id,
        string $familyType,
        string $label,
        ?string $description = '',
        string $icon = '',
        ?int $sortOrder = null,
        mixed $ui = null,
        mixed $rules = null,
        mixed $features = null,
        mixed $actions = null,
    ): OptionFamily {
        $optionFamily = $this->find($id);

        $optionFamily->setFamilyType($familyType);
        $optionFamily->setLabel($label);
        $optionFamily->setIcon($icon);
        $optionFamily->setDescription($description ?? '');
        $optionFamily->setSortOrder($sortOrder ?? 0);

        if ($ui !== null) {
            $optionFamily->setUi($this->normalizeJson($ui, []));
        }
        if ($rules !== null) {
            $optionFamily->setRules($this->normalizeJson($rules, []));
        }
        if ($features !== null) {
            $optionFamily->setFeatures($this->normalizeJson($features, []));
        }
        if ($actions !== null) {
            $optionFamily->setActions($this->normalizeJson($actions, []));
        }

        return $this->optionFamilyMapper->update($optionFamily);
    }

    public function updateSortOrders(array $sortOrders): void
    {
        $this->optionFamilyMapper->updateSortOrders($sortOrders);
    }

    public function delete(int $id): OptionFamily
    {
        $optionFamily = $this->find($id);
        return $this->optionFamilyMapper->delete($optionFamily);
    }

    public function deleteByFamilyType(string $familyType): OptionFamily
    {
        $optionFamily = $this->findByFamilyType($familyType);
        return $this->optionFamilyMapper->delete($optionFamily);
    }
}
