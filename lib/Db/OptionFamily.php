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
 * @method         string getFamilyType()
 * @method         void setFamilyType(string $value)
 * @method         string getLabel()
 * @method         void setLabel(string $value)
 * @method         ?string getDescription()
 * @method         void setDescription(?string $value)
 * @method         string getIcon()
 * @method         void setIcon(string $value)
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
class OptionFamily extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_opt_families';

    // schema columns
    public $id = null;
    protected string $familyType = '';
    protected string $label = '';
    protected string $description = '';
    protected string $icon = '';
    protected int $sortOrder = 0;
    protected int $created = 0;
    protected ?array $ui = null;
    protected ?array $rules = null;
    protected ?array $features = null;
    protected ?array $actions = null;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('familyType', 'string');
        $this->addType('label', 'string');
        $this->addType('description', 'string');
        $this->addType('icon', 'string');
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
            'family_type' => $this->getFamilyType(),
            'label' => $this->getLabel(),
            'description' => $this->getDescription(),
            'icon' => $this->getIcon(),
            'sort_order' => $this->getSortOrder(),
            'created' => $this->getCreated(),
            'ui' => $this->getUi() ?? [],
            'rules' => $this->getRules() ?? [],
            'features' => $this->getFeatures() ?? [],
            'actions' => $this->getActions() ?? [],
        ];
    }
}
