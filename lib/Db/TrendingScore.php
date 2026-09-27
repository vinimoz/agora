<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\Entity;
use JsonSerializable;

/**
 * @method int getId()
 * @method void setId(int $value)
 * @method int getInquiryId()
 * @method void setInquiryId(int $value)
 * @method int getOptionId()
 * @method void setOptionId(int $value)
 * @method float getScore()
 * @method void setScore(float $value)
 * @method int getUpdatedAt()
 * @method void setUpdatedAt(int $value)
 */
class TrendingScore extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_trending_scores';

    protected int $inquiryId = 0;
    protected int $optionId = 0;
    protected float $score = 0.0;
    protected int $updatedAt = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('optionId', 'integer');
        $this->addType('score', 'float');
        $this->addType('updatedAt', 'integer');
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'inquiryId' => $this->getInquiryId(),
            'optionId' => $this->getOptionId(),
            'score' => $this->getScore(),
            'updatedAt' => $this->getUpdatedAt(),
        ];
    }
}
