<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         string getKey()
 * @method         void setKey(string $value)
 * @method         ?string getValue()
 * @method         void setValue(?string $value)
 */
class InquiryMisc extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inq_misc';

    // schema columns
    public $id = null;
    protected int $inquiryId = 0;
    protected string $key = '';
    protected ?string $value = null;

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
            'inquiry_id' => $this->getInquiryId(),
            'key' => $this->getKey(),
            'value' => $this->getValue(),
        ];
    }
}
