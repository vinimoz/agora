<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\Entity;
use JsonSerializable;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         string getName()
 * @method         void setName(string $value)
 * @method         int getParentId()
 * @method         void setParentId(int $value)
 */
class Location extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_location';

    protected string $name = '';
    protected int $parentId = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('name', 'string');
        $this->addType('parentId', 'integer');
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'parentId' => $this->getParentId()
        ];
    }
}
