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
 * @method         int getOptionId()
 * @method         void setOptionId(int $value)
 * @method         string getPhase()
 * @method         void setPhase(string $value)
 * @method         string getType()
 * @method         void setType(string $value)
 * @method         float getValue()
 * @method         void setValue(float $value)
 * @method         string getBase()
 * @method         void setBase(string $value)
 * @method         ?string getDescription()
 * @method         void setDescription(?string $value)
 * @method         int getSortOrder()
 * @method         void setSortOrder(int $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         int getUpdated()
 * @method         void setUpdated(int $value)
 */
class Quorum extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_quorums';

    // Types de quorum
    public const TYPE_PERCENTAGE = 'percentage';
    public const TYPE_ABSOLUTE = 'absolute';
    public const TYPE_MAJORITY = 'majority';

    // Bases de calcul
    public const BASE_TOTAL = 'total';
    public const BASE_PARTICIPANTS = 'participants';
    public const BASE_VOTERS = 'voters';
    public const BASE_ELIGIBLE = 'eligible';

    // Phases
    public const PHASE_VOTE = 'vote';
    public const PHASE_DELIBERATION = 'deliberation';
    public const PHASE_AMENDMENT = 'amendment';
    public const PHASE_FINAL = 'final';

    // schema columns
    public $id = null;
    protected int $inquiryId = 0;
    protected int $optionId = 0;
    protected string $phase = '';
    protected string $type = '';
    protected float $value = 0.0;
    protected string $base = '';
    protected ?string $description = null;
    protected int $sortOrder = 0;
    protected int $created = 0;
    protected int $updated = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('optionId', 'integer');
        $this->addType('value', 'float');
        $this->addType('sortOrder', 'integer');
        $this->addType('created', 'integer');
        $this->addType('updated', 'integer');
    }

    /**
     * Get available quorum types
     */
    public static function getTypes(): array
    {
        return [
            self::TYPE_PERCENTAGE,
            self::TYPE_ABSOLUTE,
            self::TYPE_MAJORITY,
        ];
    }

    /**
     * Get available base types
     */
    public static function getBases(): array
    {
        return [
            self::BASE_TOTAL,
            self::BASE_PARTICIPANTS,
            self::BASE_VOTERS,
            self::BASE_ELIGIBLE,
        ];
    }

    /**
     * Get available phases
     */
    public static function getPhases(): array
    {
        return [
            self::PHASE_VOTE,
            self::PHASE_DELIBERATION,
            self::PHASE_AMENDMENT,
            self::PHASE_FINAL,
        ];
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
            'option_id' => $this->getOptionId(),
            'phase' => $this->getPhase(),
            'type' => $this->getType(),
            'value' => $this->getValue(),
            'base' => $this->getBase(),
            'description' => $this->getDescription(),
            'sort_order' => $this->getSortOrder(),
            'created' => $this->getCreated(),
            'updated' => $this->getUpdated(),
        ];
    }
}
