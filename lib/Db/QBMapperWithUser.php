<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template         T1 of EntityWithUser
 * @template-extends QBMapper<T1>
 */
abstract class QBMapperWithUser extends QBMapper
{
    /**
     * @param IDBConnection         $db
     * @param string                $tableName
     * @param class-string<T1>|null $entityClass
     */
    public function __construct(
        IDBConnection $db,
        string $tableName,
        ?string $entityClass = null,
    ) {
        parent::__construct($db, $tableName, $entityClass);
    }

    /**
     * Joins share type for evaluating current user's role in a inquiry
     */
    protected function joinShareRole(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $userId,
        string $joinAlias = 'shareRole',
    ): void {

        $qb->selectAlias($joinAlias . '.type', 'share_type')
            ->addGroupBy(
                $joinAlias . '.type',
            );

        $qb->leftJoin(
            $fromAlias,
            Share::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.inquiry_id'),
                $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)),
            )
        );
    }
}
