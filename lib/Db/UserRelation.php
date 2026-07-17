<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $value)
 * @method string getTargetType()
 * @method void setTargetType(string $value)
 * @method int getTargetId()
 * @method void setTargetId(int $value)
 * @method string getRelationType()
 * @method void setRelationType(string $value)
 * @method string getUserId()
 * @method void setUserId(string $value)
 * @method int getCreatedAt()
 * @method void setCreatedAt(int $value)
 * @method array|null getMetadata()
 * @method void setMetadata(array|null $value)
 */
class UserRelation extends Entity
{
    public const TABLE = 'agora_user_relations';
    
    // Relation types constants
    public const RELATION_VISIBILITY = 'visibility';
    public const RELATION_PARTICIPATION = 'participation';
    public const RELATION_MODERATOR = 'moderator';

    // Target types constants
public const TARGET_INQUIRY = 'inquiry';
public const TARGET_OPTION = 'option';
public const TARGET_ENGINE = 'engine';
public const TARGET_INQUIRY_GROUP = 'inquiry_group';



    protected string $targetType = '';
    protected int $targetId = 0;
    protected string $relationType = '';
    protected string $userId = '';
    protected int $createdAt = 0;
    protected ?array $metadata = null;

    public function __construct()
    {
        $this->addType('targetType', 'string');
        $this->addType('targetId', 'integer');
        $this->addType('relationType', 'string');
        $this->addType('userId', 'string');
        $this->addType('createdAt', 'integer');
        $this->addType('metadata', 'json');
    }
}
