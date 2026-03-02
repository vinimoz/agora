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

class InquiryGroupTypeService
{
    public function __construct(
        private InquiryGroupTypeMapper $groupTypeMapper
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

    public function findByFamily(string $family): array
    {
        return $this->groupTypeMapper->findByFamily($family);
    }

    public function delete(int $id): InquiryGroupType
    {
        $groupType = $this->find($id);
        return $this->groupTypeMapper->delete($groupType);
    }

    public function groupTypeExists(string $groupType): bool
    {
        return $this->groupTypeMapper->groupTypeExists($groupType);
    }


    public function create(
        string $groupType,
        string $icon = '',
        string $label = '',
        string $family = 'deliberative',
        ?string $description = null,
        ?string $fields = null,
        ?string $allowedResponse = null,
        ?string $allowedInquiryTypes = null
    ): InquiryGroupType {
        if ($this->groupTypeExists($groupType)) {
            throw new \InvalidArgumentException('Inquiry type already exists');
        }
        $type = new InquiryGroupType();
        $type->setInquiryGroupType($groupType);
        $type->setFamily($family);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description);
        $type->setFields($fields);
        $type->setAllowedInquiryTypes($allowedInquiryTypes);
        $type->setCreated(time());

        return $this->groupTypeMapper->insert($type);
    }

    public function update(
        int $id,
        string $groupType,
        string $icon = '',
        string $label = '',
        ?string $description = null,
        ?string $fields = null,
        ?string $allowedResponse = null,
        ?string $allowedInquiryTypes = null
    ): InquiryGroupType {
        $type = $this->find($id);
        $type->setInquiryGroupType($groupType);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description);
        $type->setFields($fields);
        $type->setAllowedInquiryTypes($allowedInquiryTypes);

        return $this->groupTypeMapper->update($type);
    }
}
