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
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         string getEngine()
 * @method         void setEngine(string $value)
 * @method         string getType()
 * @method         void setType(string $value)
 * @method         int getGroupId()
 * @method         void setGroupId(int $value)
 * @method         string getStatus()
 * @method         void setStatus(string $value)
 * @method         array getConfig()
 * @method         void setConfig(array $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         string getTargetType()
 * @method         void setTargetType(string $value)
 * @method         array getTargetIds()
 * @method         void setTargetIds(array $value)
 * @method         array getMetadata()
 * @method         void setMetadata(array $value)
 */
class SupportEngine extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_support_engines';

    // Status constants
    public const STATUS_DRAFT = 'draft';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_CLOSED = 'closed';

    // Target type constants
    public const TARGET_INQUIRY = 'inquiry';
    public const TARGET_OPTION = 'option';

    // Schema columns
    protected string $engine = '';
    protected string $type = '';
    protected int $groupId = 0;
    protected string $status = self::STATUS_DRAFT;
    protected array $config = [];
    protected int $created = 0;
    protected string $targetType = self::TARGET_INQUIRY;
    protected array $targetIds = [];
    protected array $metadata = [];

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('groupId', 'integer');
        $this->addType('created', 'integer');
        $this->addType('config', 'json');
        $this->addType('targetIds', 'json');
        $this->addType('metadata', 'json');
    }

    public function setConfig(array|string $config): void
    {
        if (is_string($config)) {
            $this->config = json_decode($config, true) ?? [];
        } else {
            $this->config = $config;
        }
    }

    public function setTargetIds(array|string $targetIds): void
    {
        if (is_string($targetIds)) {
            $this->targetIds = json_decode($targetIds, true) ?? [];
        } else {
            $this->targetIds = $targetIds;
        }
    }

    public function setMetadata(array|string $metadata): void
    {
        if (is_string($metadata)) {
            $this->metadata = json_decode($metadata, true) ?? [];
        } else {
            $this->metadata = $metadata;
        }
    }

    public function isValid(): bool
    {
        return in_array($this->status, [self::STATUS_DRAFT, self::STATUS_ACTIVE, self::STATUS_CLOSED])
            && in_array($this->targetType, [self::TARGET_INQUIRY, self::TARGET_OPTION]);
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'engine' => $this->engine,
            'type' => $this->type,
            'group_id' => $this->groupId,
            'status' => $this->status,
            'config' => $this->config,
            'created' => $this->created,
            'target_type' => $this->targetType,
            'target_ids' => $this->targetIds,
            'metadata' => $this->metadata,
        ];
    }
}
