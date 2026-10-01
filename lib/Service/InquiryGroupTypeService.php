<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryGroupType;
use OCA\Agora\Db\InquiryGroupTypeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class InquiryGroupTypeService
{
    public function __construct(
        private InquiryGroupTypeMapper $groupTypeMapper,
        private LoggerInterface $logger
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryGroupType
    {
        return $this->groupTypeMapper->find($id);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByType(string $type): InquiryGroupType
    {
        return $this->groupTypeMapper->findByType($type);
    }

    public function findAll(): array
    {
        return $this->groupTypeMapper->findAll();
    }

    public function findAllSorted(): array
    {
        if (method_exists($this->groupTypeMapper, 'findAllSorted')) {
            return $this->groupTypeMapper->findAllSorted();
        }
        return $this->groupTypeMapper->findAll();
    }

    public function findByFamily(string $family): array
    {
        return $this->groupTypeMapper->findByFamily($family);
    }

    public function groupTypeExists(string $groupType): bool
    {
        return $this->groupTypeMapper->groupTypeExists($groupType);
    }

    public function getMaxSortOrder(): int
    {
        if (method_exists($this->groupTypeMapper, 'getMaxSortOrder')) {
            return $this->groupTypeMapper->getMaxSortOrder();
        }
        return 0;
    }

    /**
     * Normalize a JSON-ish field.
     */
    private function normalizeJson(mixed $value, array|string $fallback): ?array
    {
        if ($value === null || $value === '') {
            return is_array($fallback) ? $fallback : (json_decode($fallback, true) ?: []);
        }
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            return json_last_error() === JSON_ERROR_NONE ? $decoded : (json_decode($fallback, true) ?: []);
        }
        if (is_array($value)) {
            return $value;
        }
        return is_array($fallback) ? $fallback : [];
    }

    public function create(
        string $groupType,
        string $icon = '',
        string $label = '',
        string $family = 'deliberative',
        ?string $description = null,
        mixed $fields = null,
        mixed $allowedResponse = null,
        mixed $allowedInquiryTypes = null,
        mixed $ui = null,
        mixed $rules = null,
        mixed $features = null,
        mixed $actions = null,
        bool $isRoot = false,
        ?int $sortOrder = null,
    ): InquiryGroupType {
        if ($this->groupTypeExists($groupType)) {
            throw new \InvalidArgumentException('Inquiry group type already exists');
        }

        $type = new InquiryGroupType();
        $type->setGroupType($groupType); 
        $type->setFamily($family);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description ?? '');
        $type->setFields($this->normalizeJson($fields, []));
        $type->setAllowedInquiryTypes($this->normalizeJson($allowedInquiryTypes, []));
        $type->setAllowedResponse($this->normalizeJson($allowedResponse, []));
        $type->setUi($this->normalizeJson($ui, []));
        $type->setRules($this->normalizeJson($rules, []));
        $type->setFeatures($this->normalizeJson($features, []));
        $type->setActions($this->normalizeJson($actions, []));
        $type->setIsRoot($isRoot);

        if ($sortOrder === null || $sortOrder === 0) {
            $sortOrder = $this->getMaxSortOrder() + 1;
        }
        $type->setSortOrder($sortOrder);
        $type->setCreated(time());

        return $this->groupTypeMapper->insert($type);
    }

    public function update(
        int $id,
        string $groupType,
        string $icon = '',
        string $label = '',
        string $family = 'deliberative',
        ?string $description = null,
        mixed $fields = null,
        mixed $allowedResponse = null,
        mixed $allowedInquiryTypes = null,
        mixed $ui = null,
        mixed $rules = null,
        mixed $features = null,
        mixed $actions = null,
        ?bool $isRoot = null,
        ?int $sortOrder = null,
    ): InquiryGroupType {
        $type = $this->find($id);

        $type->setGroupType($groupType);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setFamily($family);
        $type->setDescription($description ?? '');

        if ($fields !== null) {
            $type->setFields($this->normalizeJson($fields, []));
        }
        if ($allowedInquiryTypes !== null) {
            $type->setAllowedInquiryTypes($this->normalizeJson($allowedInquiryTypes, []));
        }
        if ($allowedResponse !== null) {
            $type->setAllowedResponse($this->normalizeJson($allowedResponse, []));
        }
        if ($ui !== null) {
            $type->setUi($this->normalizeJson($ui, []));
        }
        if ($rules !== null) {
            $type->setRules($this->normalizeJson($rules, []));
        }
        if ($features !== null) {
            $type->setFeatures($this->normalizeJson($features, []));
        }
        if ($actions !== null) {
            $type->setActions($this->normalizeJson($actions, []));
        }
        if ($isRoot !== null) {
            $type->setIsRoot($isRoot);
        }
        if ($sortOrder !== null) {
            $type->setSortOrder($sortOrder);
        }

        return $this->groupTypeMapper->update($type);
    }

    public function delete(int $id): InquiryGroupType
    {
        $groupType = $this->find($id);
        return $this->groupTypeMapper->delete($groupType);
    }
}
