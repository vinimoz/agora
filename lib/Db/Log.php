<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         int getProcessed()
 * @method         void setProcessed(int $value)
 * @method         string getUserId()
 * @method         void setUserId(string $value)
 * @method         string getDisplayName()
 * @method         void setDisplayName(string $value)
 * @method         string getMessageId()
 * @method         void setMessageId(string $value)
 */
class Log extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_log';
    public const MSG_ID_ADDINQUIRY = 'addInquiry';
    public const MSG_ID_UPDATEINQUIRY = 'updateInquiry';
    public const MSG_ID_DELETEINQUIRY = 'deleteInquiry';
    public const MSG_ID_RESTOREINQUIRY = 'restoreInquiry';
    public const MSG_ID_EXPIREINQUIRY = 'expireInquiry';

    public const MSG_ID_ADDOPTION = 'addOption';
    public const MSG_ID_UPDATEOPTION = 'updateOption';
    public const MSG_ID_CONFIRMOPTION = 'confirmeOption';
    public const MSG_ID_DELETEOPTION = 'deleteOption';
    public const MSG_ID_SETSUPPORT = 'setSupport';
    public const MSG_ID_OWNERCHANGE = 'updateOwner';

    // schema columns
    public $id = null;
    protected int $inquiryId = 0;
    protected ?string $userId = '';
    protected ?string $displayName = '';
    protected ?string $messageId = '';
    protected int $created = 0;
    protected int $processed = 0;

    public function __construct()
    {
        $this->addType('inquiryId', 'integer');
        $this->addType('created', 'integer');
        $this->addType('processed', 'integer');
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
        'created' => $this->getCreated(),
        'processed' => $this->getProcessed(),
        'userId' => $this->getUserId(),
        'displayName' => $this->getDisplayName(),
        'message_id' => $this->getMessageId(),
        ];
    }
}
