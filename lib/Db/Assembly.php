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
 * Assembly entity representing a public consultation entry.
 *
 * @method int getId()
 * @method void setId(int $id)
 * @method string getTitle()
 * @method void setTitle(string $title)
 * @method string getDescription()
 * @method void setDescription(string $description)
 * @method int getStartAt()
 * @method void setStartAt(int $startAt)
 * @method int getEndAt()
 * @method void setEndAt(int $endAt)
 * @method string getStatus()
 * @method void setStatus(string $status)
 * @method int getLocationId()
 * @method void setLocationId(int $locationId)
 * @method int getCategoryId()
 * @method void setCategoryId(int $categoryId)
 */
class Assembly extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_assembly';
    public const RELATION_TABLE = 'agora_assembly_inq';

    /**
     * @var string 
     */
    protected string $title = '';

    /**
     * @var string 
     */
    protected string $description = '';

    /**
     * @var int 
     */
    protected int $startAt = 0;

    /**
     * @var int 
     */
    protected int $endAt = 0;

    /**
     * @var string 
     */
    protected string $status = '';

    /**
     * @var int 
     */
    protected int $locationId = 0;

    /**
     * @var int 
     */
    protected int $categoryId = 0;

    public function __construct()
    {
        $this->addType('startAt', 'integer');
        $this->addType('endAt', 'integer');
        $this->addType('locationId', 'integer');
        $this->addType('categoryId', 'integer');
    }

    /**
     * Returns the consultation object as an array for JSON serialization.
     *
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return [
        'id' => $this->getId(),
        'title' => $this->getTitle(),
        'description' => $this->getDescription(),
        'startAt' => $this->getStartAt(),
        'endAt' => $this->getEndAt(),
        'status' => $this->getStatus(),
        'locationId' => $this->getLocationId(),
        'categoryId' => $this->getCategoryId(),
        ];
    }
}

