<?php
// Db/SupportProcess.php

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
 * @method         int getSupportEngineId()
 * @method         void setSupportEngineId(int $value)
 * @method         string getTargetType()
 * @method         void setTargetType(string $value)
 * @method         int getTargetId()
 * @method         void setTargetId(int $value)
 * @method         string getPhase()
 * @method         void setPhase(string $value)
 * @method         string getStatus()
 * @method         void setStatus(string $value)
 * @method         int getStartedAt()
 * @method         void setStartedAt(int $value)
 * @method         int getEndedAt()
 * @method         void setEndedAt(int $value)
 * @method         array getMetadata()
 * @method         void setMetadata(array $value)
 */
class SupportProcess extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_support_processes';

    public const STATUS_PENDING = 'pending';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    protected int $supportEngineId = 0;
    protected string $targetType = '';
    protected int $targetId = 0;
    protected string $phase = 'deliberative';
    protected string $status = self::STATUS_PENDING;
    protected int $startedAt = 0;
    protected ?int $endedAt = null;
    protected array $metadata = [];

    // Relations
    protected ?SupportEngine $supportEngine = null;
    protected array $results = [];

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('supportEngineId', 'integer');
        $this->addType('targetId', 'integer');
        $this->addType('startedAt', 'integer');
        $this->addType('endedAt', 'integer');
        $this->addType('metadata', 'json');
    }

    public function setSupportEngine(SupportEngine $engine): void
    {
        $this->supportEngine = $engine;
    }

    public function getSupportEngine(): ?SupportEngine
    {
        return $this->supportEngine;
    }

    public function setResults(array $results): void
    {
        $this->results = $results;
    }

    public function getResults(): array
    {
        return $this->results;
    }

    public function setMetadata(array|string $metadata): void
    {
        if (is_string($metadata)) {
            $this->metadata = json_decode($metadata, true) ?? [];
        } else {
            $this->metadata = $metadata;
        }
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'support_engine_id' => $this->supportEngineId,
            'target_type' => $this->targetType,
            'target_id' => $this->targetId,
            'phase' => $this->phase,
            'status' => $this->status,
            'started_at' => $this->startedAt,
            'ended_at' => $this->endedAt,
            'metadata' => $this->metadata,
            'supportEngine' => $this->supportEngine,
            'results' => $this->results,
        ];
    }
}
