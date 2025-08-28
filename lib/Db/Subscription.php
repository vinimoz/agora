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
 * @method         string getUserId()
 * @method         void setUserId(string $value)
 */
class Subscription extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_notif';

    // schema columns
    public $id;
    protected int $inquiryId = 0;
    protected string $userId = '';

    /**
     * @var Log[] $logEntries 
     */
    protected array $logEntries = [];


    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
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
        ];
    }

    /**
     * @param Log[] $logs Array of logs for notifications
     */
    public function setNotifyLogs(array $logs) : void
    {
        $inquiryId = $this->getInquiryId();
        $this->logEntries = array_filter(
            $logs, function ($log) use ($inquiryId) {
                return $log->getInquiryId() === $inquiryId;
            }
        );
    }

    /**
     * @return Log[]
     */
    public function getNotifyLogs() : array
    {
        return $this->logEntries;
    }
}
