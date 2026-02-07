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
 * @method         string getType()
 * @method         void setType(string $value)
 * @method         string getOptionType()
 * @method         void setOptionType(string $value)
 * @method         string getFamily()
 * @method         void setFamily(string $value)
 * @method         string getLabel()
 * @method         void setLabel(string $value)
 * @method         ?string getDescription()
 * @method         void setDescription(?string $value)
 * @method         ?array getFields()
 * @method         void setFields(?array $value)
 * @method         ?array getAllowedResponse()
 * @method         void setAllowedResponse(?array $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 */

class InquiryOptionType extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_inq_option_type';

    // schema columns
    public $id = null;
    protected string $optionType = '';
    protected string $label = '';
    protected string $icon = '';
    protected string $family = 'deliberative';
    protected ?string $description = null;
    protected ?array $fields = null;
    protected ?array $allowedResponse = null;
    protected int $created = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('optionType', 'string');
        $this->addType('label', 'string');
        $this->addType('icon', 'string');
        $this->addType('family', 'string');
        $this->addType('description', 'string');
        $this->addType('fields', 'json');
        $this->addType('allowedResponse', 'json');
        $this->addType('created', 'integer');
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
            'optionType' => $this->getOptionType(),
            'label' => $this->getLabel(),
            'family' => $this->getFamily(),
            'icon' => $this->getIcon(),
            'description' => $this->getDescription(),
            'fields' => $this->getFields(),
            'allowedResponse' => $this->getAllowedResponse(),
            'created' => $this->getCreated(),
        ];
    }
}
