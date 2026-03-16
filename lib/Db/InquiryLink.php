<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         string getMetadata()
 * @method         void setMetadata(string $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         string getTargetApp()
 * @method         void setTargetApp(string $value)
 * @method         string getTargetType()
 * @method         void setTargetType(string $value)
 * @method         string getTargetId()
 * @method         void setTargetId(string $value)
 * @method         int getSortOrder()
 * @method         void setSortOrder(int $value)
 * @method         int getCreatedBy()
 * @method         void setCreatedBy(int $value)
 */
class InquiryLink extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inq_links';

    // schema columns
    public $id = null;
    protected int $inquiryId = 0;
    protected string $targetApp = '';
    protected string $targetType = '';
    protected string $targetId = '';
    protected string $metadata = '';
    protected int $sortOrder = 0;
    protected int $createdBy = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('targetApp', 'string');
        $this->addType('targetType', 'string');
        $this->addType('targetId', 'string');
        $this->addType('metadata', 'string');
        $this->addType('sortOrder', 'integer');
        $this->addType('createdBy', 'integer');
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
            'inquiry_id' => $this->getInquiryId(),
            'target_app' => $this->getTargetApp(),
            'target_type' => $this->getTargetType(),
            'target_id' => $this->getTargetId(),
            'metadata' => $this->getMetadata(),
            'sort_order' => $this->getSortOrder(),
            'created_by' => $this->getCreatedBy(),
        ];
    }
}
