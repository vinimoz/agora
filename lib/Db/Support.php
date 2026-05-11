<?php
// Db/Support.php

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
 * @method         mixed getValue()
 * @method         void setValue(mixed $value)
 * @method         string getSupportHash()
 * @method         void setSupportHash(string $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         int getOptionId()
 * @method         void setOptionId(int $value)
 * @method         string getUserId()
 * @method         void setUserId(string $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         int getUpdated()
 * @method         void setUpdated(int $value)
 * @method         int getWeight()
 * @method         void setWeight(int $value)
 * @method         int|null getSupportEngineId()
 * @method         void setSupportEngineId(?int $value)
 */
class Support extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_supports';

    // Schema columns
    protected int $inquiryId = 0;
    protected int $optionId = 0;
    protected mixed $value = null;
    protected int $weight = 1;
    protected string $supportHash = '';
    protected string $userId = '';
    protected int $created = 0;
    protected ?int $supportEngineId = null;
    protected int $updated = 0; 

    // Computed attributes
    protected ?UserBase $user = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('optionId', 'integer');
        $this->addType('value', 'json');
        $this->addType('weight', 'integer');
        $this->addType('userId', 'string');
        $this->addType('created', 'integer');
        $this->addType('updated', 'integer');
        $this->addType('supportEngineId', 'integer');
    }

    public function getUser(): ?UserBase
    {
        if ($this->user === null && $this->userId !== '') {
            try {
                /* @var UserMapper $userMapper */
                $userMapper = \OCP\Server::get(UserMapper::class);
                $this->user = $userMapper->getParticipant($this->userId, $this->inquiryId);
            } catch (\Exception $e) {
                return null;
            }
        }
        return $this->user;
    }

    public function setUser(UserBase $user): void
    {
        $this->user = $user;
        $this->setUserId($user->getId());
    }

    /**
     * Set value with JSON encoding
     */
    public function setValue(mixed $value): void
    {
        if (is_array($value) || is_object($value)) {
            $this->value = json_encode($value);
        } else {
            $this->value = $value;
        }
    }

    /**
     * Get the value as a decoded PHP array/object
     */
    public function getValueDecoded(): mixed
    {
        $value = $this->getValue();
        if (is_string($value)) {
            return json_decode($value, true);
        }
        return $value;
    }

    /**
     * Set the value, automatically encoding if needed
     */
    public function setValueEncoded(mixed $value): void
    {
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value, JSON_UNESCAPED_UNICODE);
        }
        $this->setValue($value);
    }

    /**
     * Get value with JSON decoding if needed
     */
    public function getValue(): mixed
    {
        if (is_string($this->value)) {
            $decoded = json_decode($this->value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $decoded;
            }
        }
        return $this->value;
    }

    /**
     * Get raw value (for database operations)
     */
    public function getRawValue(): mixed
    {
        return $this->value;
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
            'inquiryId' => $this->getInquiryId(),
            'optionId' => $this->getOptionId(),
            'supportHash' => $this->getSupportHash(),
            'userId' => $this->getUserId(),
            'user' => $this->getUser(),
            'value' => $this->getValue(),
            'weight' => $this->getWeight(),
            'created' => $this->getCreated(),
            'updated' => $this->getUpdated(),
            'supportEngineId' => $this->getSupportEngineId(),
        ];
    }
}
