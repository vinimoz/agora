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
 * @method         string getTitle()
 * @method         void setTitle(string $value)
 * @method         void setDescription(string $value)
 * @method         string getDescription()
 * @method         string getType()
 * @method         void setType(string $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         int getInquiryGroupId()
 * @method         void setInquiryGroupId(int $value)
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

    // Phase constants (stored in config)
    public const PHASE_DELIBERATIVE = 'deliberative';
    public const PHASE_VOTING = 'voting';
    public const PHASE_CLOSED = 'closed';

    // Schema columns
    protected string $title = '';
    protected ?string $description = null;
    protected string $engine = '';
    protected string $type = '';
    protected int $inquiryId = 0;
    protected ?int $inquiryGroupId = null; // Nullable: links to inquiry OR inquiry group
    protected string $status = self::STATUS_DRAFT;
    protected array $config = [];
    protected int $created = 0;
    protected string $targetType = self::TARGET_OPTION; // Default to options for now
    protected array $targetIds = [];
    protected array $metadata = [];

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('inquiryGroupId', 'integer');
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

    // Helper methods for config-driven fields

    public function getPhase(): string
    {
        return $this->config['phase'] ?? self::PHASE_DELIBERATIVE;
    }

    public function setPhase(string $phase): void
    {
        $this->config['phase'] = $phase;
    }

    public function getStartedAt(): ?int
    {
        return $this->config['started_at'] ?? null;
    }

    public function setStartedAt(?int $timestamp): void
    {
        $this->config['started_at'] = $timestamp;
    }

    public function getEndedAt(): ?int
    {
        return $this->config['ended_at'] ?? null;
    }

    public function setEndedAt(?int $timestamp): void
    {
        $this->config['ended_at'] = $timestamp;
    }

    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function isLinkedToGroup(): bool
    {
        return $this->inquiryGroupId !== null && $this->inquiryGroupId > 0;
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
            'title' => $this->getTitle(),
            'description' => $this->getDescription(),
            'type' => $this->type,
            'inquiry_id' => $this->inquiryId,
            'inquiry_group_id' => $this->inquiryGroupId,
            'status' => $this->status,
            'config' => $this->config,
            'created' => $this->created,
            'target_type' => $this->targetType,
            'target_ids' => $this->targetIds,
            'metadata' => $this->metadata,
        ];
    }
}
