<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Dto;

use JsonSerializable;
use OCA\Agora\Entity\InquiryType;
use OCA\Agora\Model\User;

class InquiryDto implements JsonSerializable
{
    public function __construct(
        public string $title,
        public string $type,
        public string $ownedGroup,
        public ?string $description = '',
        public ?int $parentId = 0,
        public ?int $locationId = 0,
        public ?int $categoryId = 0,
        public ?array $miscFields = [],
    ) {
        $this->validate();
    }

    private function validate(): void
    {
        if (empty($this->title)) {
            throw new \InvalidArgumentException("Title cannot be empty");
        }
    }

    public static function fromRequestData(array $data): self
    {
        return new self(
            $data['title'],
            $data['type'],
            $data['ownedGroup'] ?? '',
            $data['description'] ?? '',
            $data['parentId'] ?? 0,
            $data['locationId'] ?? 0,
            $data['categoryId'] ?? 0,
            $data['miscFields'] ?? [],
        );
    }

    public function jsonSerialize(): array
    {
        return [
            'title' => $this->title,
            'type' => $this->type->value,
            'ownedGroup' => $this->ownedGroup,
            'description' => $this->description,
            'parentId' => $this->parentId,
            'locationId' => $this->locationId,
            'categoryId' => $this->categoryId,
            'miscFields' => $this->miscFields,
        ];
    }

    public function toServiceArray(): array
    {
        $miscFields = [];
        foreach ($this->miscFields as $key => $value) {
            if (str_starts_with($key, 'misc.')) {
                $newKey = substr($key, 5);
                $miscFields[$newKey] = $value;
            } else {
                $miscFields[$key] = $value;
            }
        }
        return [
        'title' => $this->title,
        'type' => $this->type,
        'ownedGroup' => $this->ownedGroup,
        'description' => $this->description,
        'parent_id' => $this->parentId,
        'location_id' => $this->locationId,
        'category_id' => $this->categoryId,
        'misc_fields' => $miscFields,
        ];
    }
}
