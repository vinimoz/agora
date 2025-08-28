<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $value)
 * @method string getInquiryType()
 * @method void setInquiryType(string $value)
 * @method string getStatusKey()
 * @method void setStatusKey(string $value)
 * @method string getLabel()
 * @method void setLabel(string $value)
 * @method string getDescription()
 * @method void setDescription(string $value)
 * @method bool getIsFinal()
 * @method void setIsFinal(bool $value)
 * @method int getCreated()
 * @method void setCreated(int $value)
 * @method int getUpdated()
 * @method void setUpdatedAt(int $value)
 * @method string getIcon()
 * @method void setIcon(string $value)
 * @method int getOrder()
 * @method void setOrder(int $value)
 */
class ModerationStatus extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_mod_status';

    protected string $inquiryType = '';
    protected string $statusKey = '';
    protected string $label = '';
    protected ?string $description = null;
    protected bool $isFinal = false;
    protected int $created;
    protected int $updated;
    protected int $order=0;
    protected string $icon = '';

    public function __construct()
    {
        $this->addType('inquiryType', 'string');
        $this->addType('statusKey', 'string');
        $this->addType('label', 'string');
        $this->addType('description', 'string');
        $this->addType('isFinal', 'boolean');
        $this->addType('created', 'int');
        $this->addType('updated', 'int');
        $this->addType('icon', 'string');
        $this->addType('order', 'int');

        $this->created = time();
        $this->updated = time();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'inquiryType' => $this->getInquiryType(),
            'statusKey' => $this->getStatusKey(),
            'label' => $this->getLabel(),
            'description' => $this->getDescription(),
            'isFinal' => $this->getIsFinal(),
            'created' => $this->getCreated(),
            'order' => $this->getOrder(),
            'updated' => $this->getUpdated(),
            'icon' => $this->getIcon()
        ];
    }
}
