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
 * @method         int getValue()
 * @method         void setValue(int $value)
 * @method         string getSupportHash()
 * @method         void setSupportHash(string $value)
 * @method         string getSupportHash()
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         int getOptionId()
 * @method         void setOptionId(int $value)
 * @method         string getUserId()
 * @method         void setUserId(string $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         string getUserId()
 * @method         void setUserId(string $value)
 */
class Support extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_supports';

    // Schema columns
    protected int $inquiryId = 0;
    protected int $optionId = 0;
    protected int $value = 0;
    protected string $supportHash = '';
    protected string $userId = '';
    protected string $created = '';

    // Computed attributes
    protected ?UserBase $user = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('value', 'integer');
        $this->addType('optionId', 'integer');
        $this->addType('userId', 'string');
        $this->addType('created', 'integer');
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
            'created' => $this->getCreated(),
        ];
    }
}
