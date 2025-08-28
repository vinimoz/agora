<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\Model\UserBase;
use OCP\AppFramework\Db\Entity;
use JsonSerializable;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         string getName()
 * @method         void setName(string $value)
 * @method         string getMimeType()
 * @method         void setMimeType(string $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         int getFileId()
 * @method         void setFileId(int $value)
 * @method         int getType()
 * @method         void setType(int $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 */

class Attachment extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_attachments';

    // Schema columns
    protected ?string $name = null;
    protected ?string $mimeType = null;
    protected int $inquiryId = 0;
    protected ?int $fileId = 0;
    protected int $size = 0;
    protected int $created = 0;


    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('name', 'string');
        $this->addType('mimeType', 'string');
        $this->addType('inquiryId', 'integer');
        $this->addType('fileId', 'integer');
        $this->addType('size', 'integer');
        $this->addType('created', 'integer');
    }

    /**
     * @return array
     *
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'size' => $this->getSize(),
            'mimeType' => $this->getMimeType(),
            'inquiryId' => $this->getInquiryId(),
            'fileId' => $this->getFileId(),
            'created' => $this->getCreated(),
        ];
    }
}
