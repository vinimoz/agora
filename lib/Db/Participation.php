<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;

/**
 * @method int getId()
 * @method void setId(int $value)
 * @method string getTargetType()
 * @method void setTargetType(string $value)
 * @method int getTargetId()
 * @method void setTargetId(int $value)
 * @method string getPolicyType()
 * @method void setPolicyType(string $value)
 * @method array getPolicyConfig()
 * @method void setPolicyConfig(array $value)
 * @method int getCreatedAt()
 * @method void setCreatedAt(int $value)
 * @method int getUpdatedAt()
 * @method void setUpdatedAt(int $value)
 * @method string|null getCreatedBy()
 * @method void setCreatedBy(?string $value)
 */
class Participation extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_participation';

    // Policy types
    public const POLICY_EVERYONE = 'everyone';
    public const POLICY_USERS = 'users';
    public const POLICY_GROUPS = 'groups';
    public const POLICY_LOTTERY = 'lottery';

    // Target types
    public const TARGET_INQUIRY = 'inquiry';
    public const TARGET_OPTION = 'option';
    public const TARGET_INQUIRY_GROUP = 'inquiry_group';
    public const TARGET_ENGINE = 'engine';

    // Lottery modes
    public const LOTTERY_MODE_USERS = 'users';
    public const LOTTERY_MODE_GROUPS = 'groups';

    // Schema columns - using same pattern as Inquiry.php
    protected ?string $targetType = null;
    protected ?int $targetId = null;
    protected string $policyType = self::POLICY_EVERYONE;
    protected ?array $policyConfig = [];
    protected int $createdAt = 0;
    protected int $updatedAt = 0;
    protected ?string $createdBy = null;

    public function __construct()
    {
        // Define types for database mapping (camelCase → snake_case automatically)
        $this->addType('targetType', 'string');
        $this->addType('targetId', 'integer');
        $this->addType('policyType', 'string');
        $this->addType('policyConfig', 'json');
        $this->addType('createdAt', 'integer');
        $this->addType('updatedAt', 'integer');
        $this->addType('createdBy', 'string');
    }

    /**
     * Set policy config from array, JSON string, or null
     */
    public function setPolicyConfig(array|string|null $config): void
    {
        if ($config === null) {
            $this->policyConfig = [];
            return;
        }

        if (is_string($config)) {
            $decoded = json_decode($config, true);
            $this->policyConfig = is_array($decoded) ? $decoded : [];
        } else {
            $this->policyConfig = $config;
        }
    }

    /**
     * Check if the policy allows everyone
     */
    public function isEveryone(): bool
    {
        return $this->policyType === self::POLICY_EVERYONE;
    }

    /**
     * Check if the policy uses lottery
     */
    public function isLottery(): bool
    {
        return $this->policyType === self::POLICY_LOTTERY;
    }

    /**
     * Get lottery configuration
     */
    public function getLotteryConfig(): array
    {
        if ($this->policyType !== self::POLICY_LOTTERY) {
            return [];
        }
        
        // Ensure policyConfig is an array
        $config = $this->policyConfig ?? [];
        
        return array_merge([
            'mode' => self::LOTTERY_MODE_USERS,
            'count' => 1,
        ], $config);
    }

    /**
     * Get the lottery mode (users or groups)
     */
    public function getLotteryMode(): string
    {
        $config = $this->getLotteryConfig();
        return $config['mode'] ?? self::LOTTERY_MODE_USERS;
    }

    /**
     * Get the number of winners for the lottery
     */
    public function getLotteryCount(): int
    {
        $config = $this->getLotteryConfig();
        return (int)($config['count'] ?? 1);
    }

    /**
     * Get the lottery seed if set
     */
    public function getLotterySeed(): ?int
    {
        $config = $this->getLotteryConfig();
        return $config['seed'] ?? null;
    }

    /**
     * Check if the policy uses user-based selection
     */
    public function usesUsers(): bool
    {
        return $this->policyType === self::POLICY_USERS 
            || ($this->isLottery() && $this->getLotteryMode() === self::LOTTERY_MODE_USERS);
    }

    /**
     * Check if the policy uses group-based selection
     */
    public function usesGroups(): bool
    {
        return $this->policyType === self::POLICY_GROUPS 
            || ($this->isLottery() && $this->getLotteryMode() === self::LOTTERY_MODE_GROUPS);
    }

    /**
     * Serialize to JSON - matching frontend interface
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'targetType' => $this->getTargetType(),
            'targetId' => $this->getTargetId(),
            'policyType' => $this->getPolicyType(),
            'policyConfig' => $this->getPolicyConfig() ?? [],
            'createdAt' => $this->getCreatedAt(),
            'updatedAt' => $this->getUpdatedAt(),
            'createdBy' => $this->getCreatedBy(),
        ];
    }
}
