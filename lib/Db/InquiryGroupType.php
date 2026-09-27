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
 * @method         string getGroupType()
 * @method         void setGroupType(string $value)
 * @method         string getFamily()
 * @method         void setFamily(string $value)
 * @method         string getLabel()
 * @method         void setLabel(string $value)
 * @method         ?string getDescription()
 * @method         void setDescription(?string $value)
 * @method         ?array getFields()
 * @method         void setFields(?array $value)
 * @method         ?array getAllowedInquiryTypes()
 * @method         void setAllowedInquiryTypes(?array $value)
 * @method         ?array getAllowedResponse()
 * @method         void setAllowedResponse(?array $value)
 * @method         bool getIsRoot()
 * @method         void setIsRoot(bool $value)
 * @method         int getSortOrder()
 * @method         void setSortOrder(int $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         ?array getUi()
 * @method         void setUi(?array $value)
 * @method         ?array getRules()
 * @method         void setRules(?array $value)
 * @method         ?array getFeatures()
 * @method         void setFeatures(?array $value)
 * @method         ?array getActions()
 * @method         void setActions(?array $value)
 */

class InquiryGroupType extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_inq_group_type';

    // schema columns
    public $id = null;
    protected string $groupType = '';
    protected string $label = '';
    protected string $icon = '';
    protected string $family = 'deliberative';
    protected ?string $description = null;
    protected ?array $fields = null;
    protected ?array $allowedInquiryTypes = null;
    protected ?array $allowedResponse = null;
    protected ?bool $isRoot = false;
    protected int $created = 0;
    protected int $sortOrder = 0;
    protected ?array $ui = null;
    protected ?array $rules = null;
    protected ?array $features = null;
    protected ?array $actions = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('groupType', 'string');
        $this->addType('label', 'string');
        $this->addType('icon', 'string');
        $this->addType('family', 'string');
        $this->addType('description', 'string');
        $this->addType('fields', 'json');
        $this->addType('isRoot', 'boolean');
        $this->addType('allowedInquiryTypes', 'json');
        $this->addType('allowedResponse', 'json');
        $this->addType('sortOrder', 'integer');
        $this->addType('created', 'integer');
        $this->addType('ui', 'json');
        $this->addType('rules', 'json');
        $this->addType('features', 'json');
        $this->addType('actions', 'json');
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
            'group_type' => $this->getGroupType(),
            'label' => $this->getLabel(),
            'family' => $this->getFamily(),
            'icon' => $this->getIcon(),
            'description' => $this->getDescription(),
            'fields' => $this->getFields(),
            'allowed_inquiry_types' => $this->getAllowedInquiryTypes(),
            'allowed_response' => $this->getAllowedResponse(),
            'sort_order' => $this->getSortOrder(),
            'is_root' => $this->getIsRoot() ?? false,
            'created' => $this->getCreated(),
            'ui' => $this->getUi() ?? [],
            'rules' => $this->getRules() ?? [],
            'features' => $this->getFeatures() ?? [],
            'actions' => $this->getActions() ?? [],
        ];
    }
}
