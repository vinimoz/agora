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
 * @method         string getOptionType()
 * @method         void setOptionType(string $value)
 * @method         string getLabel()
 * @method         void setLabel(string $value)
 * @method         string getIcon()
 * @method         void setIcon(string $value)
 * @method         string getFamily()
 * @method         void setFamily(string $value)
 * @method         ?string getDescription()
 * @method         void setDescription(?string $value)
 * @method         ?array getFields()
 * @method         void setFields(?array $value)
 * @method         ?array getAllowedResponse()
 * @method         void setAllowedResponse(?array $value)
 * @method    int getAllowComment()
 * @method    void setAllowComment(int $value)
 * @method         int getUseTitle()
 * @method         void setUseTitle(int $value)
 * @method         string getSupportFeature()
 * @method         void setSupportFeature(string $value)
 * @method         ?array getStatuses()
 * @method         void setStatuses(?array $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 */

class InquiryOptionType extends EntityWithUser implements JsonSerializable
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
    protected ?int $allowComment = null;
    protected string $supportFeature = '';
    protected ?array $statuses = null;
    protected int $useTitle = 0;
    protected int $created = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('description', 'string');
        $this->addType('family', 'string');
        $this->addType('fields', 'json');
        $this->addType('allowedResponse', 'json');
        $this->addType('allowComment', 'integer');
        $this->addType('supportFeature', 'string');
        $this->addType('statuses', 'json');
        $this->addType('useTitle', 'integer');
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
            'allowed_response' => $this->getAllowedResponse(),
            'allow_comment' => $this->getAllowComment(),
            'use_title' => $this->getUseTitle(),
            'support_feature' => $this->getSupportFeature(),
            'statuses' => $this->getStatuses(),
            'created' => $this->getCreated(),
        ];
    }
}
