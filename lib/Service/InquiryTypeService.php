<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryType;
use OCA\Agora\Db\InquiryTypeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class InquiryTypeService
{
    public function __construct(
        private InquiryTypeMapper $inquiryTypeMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryType
    {
        return $this->inquiryTypeMapper->find($id);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByType(string $type): InquiryType
    {
        return $this->inquiryTypeMapper->findByType($type);
    }

    public function findAll(): array
    {
        return $this->inquiryTypeMapper->findAll();
    }

    public function findByFamily(string $family): array
    {
        return $this->inquiryTypeMapper->findByFamily($family);
    }

    public function delete(int $id): InquiryType
    {
        $inquiryType = $this->find($id);
        return $this->inquiryTypeMapper->delete($inquiryType);
    }

    public function inquiryTypeExists(string $inquiryType): bool
    {
        return $this->inquiryTypeMapper->inquiryTypeExists($inquiryType);
    }


    public function create(
        string $inquiryType,
        string $family = 'deliberative',
        string $icon = '',
        string $label = '',
        ?string $description = null,
        ?string $fields = null,
        ?string $allowedResponse = null,
        ?string $allowedTransformation = null,
        ?string $allowedOptionType = null
    ): InquiryType {
        if ($this->inquiryTypeExists($inquiryType)) {
            throw new \InvalidArgumentException('Inquiry type already exists');
        }
        $type = new InquiryType();
        $type->setInquiryType($inquiryType);
        $type->setFamily($family);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description);
        $type->setFields($fields);
        $type->setAllowedResponse($allowedResponse);
        $type->setAllowedTransformation($allowedTransformation);
        $type->setAllowedOptionType($allowedOptionType);
        $type->setCreated(time());

        return $this->inquiryTypeMapper->insert($type);
    }

    public function update(
        int $id,
        string $inquiryType,
        string $family = 'deliberative',
        string $icon = '',
        string $label = '',
        ?string $description = null,
        ?string $fields = null,
        ?string $allowedResponse = null,
        ?string $allowedTransformation = null,
        ?string $allowedOptionType = null
    ): InquiryType {
        $type = $this->find($id);
        $type->setInquiryType($inquiryType);
        $type->setFamily($family);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description);
        $type->setFields($fields);
        $type->setAllowedResponse($allowedResponse);
        $type->setAllowedTransformation($allowedTransformation);
        $type->setAllowedOptionType($allowedOptionType);

        return $this->inquiryTypeMapper->update($type);
    }
}
