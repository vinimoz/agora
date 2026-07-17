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
 * @method int getId()
 * @method void setId(int $value)
 * @method int getParticipationId()
 * @method void setParticipationId(int $value)
 * @method string|null getSeed()
 * @method void setSeed(?string $value)
 * @method string getStatus()
 * @method void setStatus(string $value)
 * @method int getPoolSize()
 * @method void setPoolSize(int $value)
 * @method int getSelectionCount()
 * @method void setSelectionCount(int $value)
 * @method array|null getResultSummary()
 * @method void setResultSummary(?array $value)
 * @method int getCreatedAt()
 * @method void setCreatedAt(int $value)
 * @method int|null getCompletedAt()
 * @method void setCompletedAt(?int $value)
 * @method array|null getMetadata()
 * @method void setMetadata(?array $value)
 */
class LotteryRun extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_lottery_run';

    // Status constants
    public const STATUS_PENDING = 'pending';
    public const STATUS_RUNNING = 'running';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_VALIDATED = 'validated';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_FAILED = 'failed';

    protected int $participationId = 0;
    protected ?string $seed = null;
    protected string $status = self::STATUS_PENDING;
    protected int $poolSize = 0;
    protected int $selectionCount = 0;
    protected ?array $resultSummary = null;
    protected int $createdAt = 0;
    protected ?int $completedAt = null;
    protected ?array $metadata = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('participationId', 'integer');
        $this->addType('poolSize', 'integer');
        $this->addType('selectionCount', 'integer');
        $this->addType('createdAt', 'integer');
        $this->addType('completedAt', 'integer');
        $this->addType('resultSummary', 'json');
        $this->addType('metadata', 'json');
    }


    public function isValidated(): bool
    {
        return $this->status === self::STATUS_VALIDATED;
    }

    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    public function isFailed(): bool
    {
        return $this->status === self::STATUS_FAILED;
    }

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isRunning(): bool
    {
        return $this->status === self::STATUS_RUNNING;
    }

    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'participation_id' => $this->getParticipationId(),
            'seed' => $this->getSeed(),
            'status' => $this->getStatus(),
            'pool_size' => $this->getPoolSize(),
            'selection_count' => $this->getSelectionCount(),
            'result_summary' => $this->getResultSummary(),
            'created_at' => $this->getCreatedAt(),
            'completed_at' => $this->getCompletedAt(),
            'metadata' => $this->getMetadata(),
        ];
    }
}
