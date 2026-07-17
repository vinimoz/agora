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
 * @method int getRunId()
 * @method void setRunId(int $value)
 * @method string|null getSelectedUserId()
 * @method void setSelectedUserId(?string $value)
 * @method string|null getSelectedGroupId()
 * @method void setSelectedGroupId(?string $value)
 * @method int getRank()
 * @method void setRank(int $value)
 * @method string|null getRole()
 * @method void setRole(?string $value)
 * @method string getStatus()
 * @method void setStatus(string $value)
 * @method int getSelectedAt()
 * @method void setSelectedAt(int $value)
 * @method int|null getExpiresAt()
 * @method void setExpiresAt(?int $value)
 * @method int|null getAcceptedAt()
 * @method void setAcceptedAt(?int $value)
 * @method array|null getMetadata()
 * @method void setMetadata(?array $value)
 */
class LotterySelection extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_lottery_selection';

    // Status constants
    public const STATUS_PENDING = 'pending';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_DECLINED = 'declined';
    public const STATUS_EXPIRED = 'expired';

    protected int $participationId = 0;
    protected int $runId = 0;
    protected ?string $selectedUserId = null;
    protected ?string $selectedGroupId = null;
    protected int $rank = 0;
    protected ?string $role = null;
    protected string $status = self::STATUS_PENDING;
    protected int $selectedAt = 0;
    protected ?int $expiresAt = null;
    protected ?int $acceptedAt = null;
    protected ?array $metadata = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('participationId', 'integer');
        $this->addType('runId', 'integer');
        $this->addType('rank', 'integer');
        $this->addType('selectedAt', 'integer');
        $this->addType('expiresAt', 'integer');
        $this->addType('acceptedAt', 'integer');
        $this->addType('metadata', 'json');
    }

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isAccepted(): bool
    {
        return $this->status === self::STATUS_ACCEPTED;
    }

    public function isDeclined(): bool
    {
        return $this->status === self::STATUS_DECLINED;
    }

    public function isExpired(): bool
    {
        return $this->status === self::STATUS_EXPIRED;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'participation_id' => $this->getParticipationId(),
            'run_id' => $this->getRunId(),
            'selected_user_id' => $this->getSelectedUserId(),
            'selected_group_id' => $this->getSelectedGroupId(),
            'rank' => $this->getRank(),
            'role' => $this->getRole(),
            'status' => $this->getStatus(),
            'selected_at' => $this->getSelectedAt(),
            'expires_at' => $this->getExpiresAt(),
            'accepted_at' => $this->getAcceptedAt(),
            'metadata' => $this->getMetadata(),
        ];
    }
}
