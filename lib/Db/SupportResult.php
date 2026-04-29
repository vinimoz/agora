<?php
// Db/SupportResult.php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\Entity;
use JsonSerializable;

/**
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         int getSupportProcessId()
 * @method         void setSupportProcessId(int $value)
 * @method         string getTargetType()
 * @method         void setTargetType(string $value)
 * @method         int getTargetId()
 * @method         void setTargetId(int $value)
 * @method         int getOptionId()
 * @method         void setOptionId(int $value)
 * @method         array getResult()
 * @method         void setResult(array $value)
 * @method         int getUpdated()
 * @method         void setUpdated(int $value)
 */
class SupportResult extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_support_results';

    protected int $supportProcessId = 0;
    protected string $targetType = '';
    protected int $targetId = 0;
    protected ?int $optionId = null;
    protected array $result = [];
    protected int $updated = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('supportProcessId', 'integer');
        $this->addType('targetId', 'integer');
        $this->addType('optionId', 'integer');
        $this->addType('updated', 'integer');
        $this->addType('result', 'json');
    }

    public function setResult(array|string $result): void
    {
        if (is_string($result)) {
            $this->result = json_decode($result, true) ?? [];
        } else {
            $this->result = $result;
        }
    }

    public function getResult(): array
    {
        return $this->result;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'support_process_id' => $this->supportProcessId,
            'target_type' => $this->targetType,
            'target_id' => $this->targetId,
            'option_id' => $this->optionId,
            'result' => $this->result,
            'updated' => $this->updated,
        ];
    }
}
