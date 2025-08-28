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
 * @method         string getTable()
 * @method         void setTable(string $value)
 * @method         int getUpdated()
 * @method         void setUpdated(int $value)
 * @method         string getSessionId()
 * @method         void setSessionId(string $value)
 */
class Watch extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_watch';
    public const OBJECT_INQUIRIES = 'inquiries';
    public const OBJECT_SUPPORTS = 'supports';
    public const OBJECT_ATTACHMENTS = 'attachments';
    public const OBJECT_OPTIONS = 'options';
    public const OBJECT_COMMENTS = 'comments';
    public const OBJECT_SHARES = 'shares';

    // schema columns
    public $id = null;
    protected int $inquiryId = 0;
    protected string $table = '';
    protected int $updated = 0;
    protected string $sessionId = '';

    public function __construct()
    {
        $this->addType('inquiryId', 'integer');
        $this->addType('updated', 'integer');
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
        'table' => $this->getTable(),
        'updated' => $this->getUpdated(),
        ];
    }
}
