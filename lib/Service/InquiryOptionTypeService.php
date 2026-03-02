<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryOptionTypeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class InquiryOptionTypeService
{
    public function __construct(
        private InquiryOptionTypeMapper $optionTypeMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): OptionType
    {
        return $this->optionTypeMapper->find($id);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByType(string $type): OptionType
    {
        return $this->optionTypeMapper->findByType($type);
    }

    public function findAll(): array
    {
        return $this->optionTypeMapper->findAll();
    }

    public function findByFamily(string $family): array
    {
        return $this->optionTypeMapper->findByFamily($family);
    }

    public function delete(int $id): OptionType
    {
        $optionType = $this->find($id);
        return $this->optionTypeMapper->delete($optionType);
    }

    public function optionTypeExists(string $optionType): bool
    {
        return $this->optionTypeMapper->optionTypeExists($optionType);
    }


    public function create(
        string $optionType,
        string $icon = '',
        string $label = '',
        string $family = 'collective',
        ?string $description = null,
        ?string $fields = null,
        ?string $allowedResponse = null,
    ): InquiryOptionType {
        if ($this->optionTypeExists($optionType)) {
            throw new \InvalidArgumentException('Inquiry type already exists');
        }
        $type = new OptionType();
        $type->setOptionType($optionType);
        $type->setFamily($family);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description);
        $type->setFields($fields);
        $type->setAllowedResponse($allowedResponse);
        $type->setCreated(time());

        return $this->optionTypeMapper->insert($type);
    }

    public function update(
        int $id,
        string $optionType,
        string $icon = '',
        string $label = '',
        string $family = 'collective',
        ?string $description = null,
        ?string $fields = null,
        ?string $allowedResponse = null,
    ): InquiryOptionType {
        $type = $this->find($id);
        $type->setOptionType($optionType);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description);
        $type->setFields($fields);
        $type->setAllowedResponse($allowedResponse);

        return $this->optionTypeMapper->update($type);
    }
}
