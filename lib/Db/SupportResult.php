<?php
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
 * @method         int getSupportEngineId()
 * @method         void setSupportEngineId(int $value)
 * @method         string getTargetType()
 * @method         void setTargetType(string $value)
 * @method         int getTargetId()
 * @method         void setTargetId(int $value)
 * @method         array getResult()
 * @method         void setResult(array $value)
 * @method         int getUpdated()
 * @method         void setUpdated(int $value)
 */
class SupportResult extends Entity implements JsonSerializable
{
    public const TABLE = 'agora_support_results';

    protected int $supportEngineId = 0;
    protected string $targetType = '';
    protected int $targetId = 0;
    protected array $result = [];
    protected int $updated = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('supportEngineId', 'integer');
        $this->addType('targetId', 'integer');
        $this->addType('targetType', 'string');
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
            'support_engine_id' => $this->supportEngineId,
            'target_type' => $this->targetType,
            'target_id' => $this->targetId,
            'result' => $this->result,
            'updated' => $this->updated,
        ];
    }

    public function getResultSummary(): array
    {
        return [
            'target_type' => $this->targetType,
            'target_id' => $this->targetId,
            'result_type' => $this->result['type'] ?? 'unknown',
            'updated' => $this->updated,
        ];
    }
}
