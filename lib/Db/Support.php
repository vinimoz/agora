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
    protected string $userId = '';
    protected string $created = '';

    // Computed attributes
    protected ?UserBase $user = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
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
            'userId' => $this->getUserId(),
            'user' => $this->getUser(),
            'created' => $this->getCreated(),
        ];
    }
}
