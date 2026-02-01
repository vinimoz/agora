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
 * @method         string getInquiryType()
 * @method         void setInquiryType(string $value)
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
 * @method         ?array getAllowedTransformation()
 * @method         void setAllowedTransformation(?array $value)
 * @method         ?array getAllowedOptionType()
 * @method         void setAllowedOptionType(?array $value)
 * @method         string getSupportFeature()
 * @method         void setSupportFeature(string $value)
 * @method         bool getIsRoot()
 * @method         void setIsRoot(bool $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 */

class InquiryType extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_inq_type';

    // schema columns
    public $id = null;
    protected string $inquiryType = '';
    protected string $family = 'deliberative';
    protected string $label = '';
    protected string $icon = '';
    protected string $description = '';
    protected ?array $fields = null;
    protected ?array $allowedResponse = null;
    protected ?array $allowedTransformation = null;
    protected ?array $allowedOptionType = null;
    protected string $supportFeature = 'binary';
    protected ?bool $isRoot = false;
    protected int $created = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('created', 'integer');
        $this->addType('icon', 'string');
        $this->addType('family', 'string');
        $this->addType('label', 'string');
        $this->addType('description', 'string');
        $this->addType('inquiryType', 'string');
        $this->addType('fields', 'json');
        $this->addType('allowedResponse', 'json');
        $this->addType('isRoot', 'boolean');
        $this->addType('allowedTransformation', 'json');
        $this->addType('allowedOptionType', 'json');
        $this->addType('supportFeature', 'string');
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
            'inquiry_type' => $this->getInquiryType(),
            'family' => $this->getFamily(),
            'label' => $this->getLabel(),
            'icon' => $this->getIcon(),
            'description' => $this->getDescription(),
            'fields' => $this->getFields(),
            'allowed_response' => $this->getAllowedResponse(),
            'allowed_transformation' => $this->getAllowedTransformation(),
            'allowed_option_type' => $this->getAllowedOptionType(),
            'support_feature' => $this->getSupportFeature(),
            'is_root' => $this->getIsRoot() ?? false,
            'created' => $this->getCreated(),
        ];
    }
}
