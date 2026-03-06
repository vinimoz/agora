<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Search\ISearchQuery;
use Psr\Log\LoggerInterface;
use OCA\Agora\Helper\SqlHelper;

/**
 * @template-extends QBMapper<Option>
 */
class OptionMapper extends QBMapper
{
    public const TABLE = Option::TABLE;
    public const CONCAT_SEPARATOR = ',';

    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
        protected LoggerInterface $logger,
    ) {
        $this->logger = $logger;
        parent::__construct($db, Option::TABLE, Option::class);
    }

    public function get(int $id, bool $getDeleted = false, bool $withRoles = false): Option
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.*')
           ->from($this->getTableName(), self::TABLE)
           ->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        if ($withRoles) {
            $currentUserId = $this->userSession->getCurrentUserId();

            $this->addHasSupportedSubquery($qb, self::TABLE, $currentUserId);
            $this->addSupportValueSubquery($qb, self::TABLE, $currentUserId);
            $this->addParticipantsCountSubquery($qb, self::TABLE);
            $this->addSupportsCountSubquery($qb, self::TABLE);
            $this->addNegativeSupportsCountSubquery($qb, self::TABLE);
            $this->addPositiveSupportsCountSubquery($qb, self::TABLE);
            $this->addNeutralSupportsCountSubquery($qb, self::TABLE);
            $this->addCommentsCountSubquery($qb, self::TABLE);
            $this->addMiscsSubquery($qb, self::TABLE);
        }

        return $this->findEntity($qb);
    }

    public function find(int $id): Option
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    public function findByTargetId(int $targetId): array
    {
        $qb = $this->buildQuery();

        $qb->where($qb->expr()->eq(self::TABLE . '.target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->orderBy(self::TABLE . '.sort_order', 'ASC')
           ->addOrderBy(self::TABLE . '.created', 'ASC');

        $options = $this->findEntities($qb);
        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function findByParentId(int $parentId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->orderBy(self::TABLE . '.sort_order', 'ASC')
           ->addOrderBy(self::TABLE . '.created', 'ASC');

        $options = $this->findEntities($qb);

        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function findByType(string $type, int $targetId = 0): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.type', $qb->createNamedParameter($type, IQueryBuilder::PARAM_STR)))
           ->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        if ($targetId > 0) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));
        }

        $qb->orderBy(self::TABLE . '.sort_order', 'ASC')
           ->addOrderBy(self::TABLE . '.created', 'ASC');

        $options = $this->findEntities($qb);

        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function findForMe(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->andWhere(
               $qb->expr()->orX(
                   $qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)),
                   $qb->expr()->eq(self::TABLE . '.access', $qb->createNamedParameter(Option::ACCESS_OPEN, IQueryBuilder::PARAM_STR))
               )
           );

        $options = $this->findEntities($qb);

        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function listByOwner(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)))
           ->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        $options = $this->findEntities($qb);

        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function search(ISearchQuery $query): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->andWhere(
               $qb->expr()->orX(
                   ...array_map(
                       function (string $token) use ($qb) {
                           return $qb->expr()->iLike(
                               self::TABLE . '.text',
                               $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($token) . '%', IQueryBuilder::PARAM_STR)
                           );
                       },
                       explode(' ', $query->getTerm())
                   )
               )
           );

        $options = $this->findEntities($qb);

        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function findForAdmin(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->neq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)))
           ->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        $options = $this->findEntities($qb);

        // Load dynamic fields for all options
        foreach ($options as $option) {
            $this->loadDynamicFields($option);
        }

        return $options;
    }

    public function archiveExpiredOptions(int $offset): int
    {
        $archiveDate = time();
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('archived', $qb->createNamedParameter($archiveDate, IQueryBuilder::PARAM_INT))
           ->where($qb->expr()->lt('updated', $qb->createNamedParameter($offset, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->gt('updated', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    public function setOptionStatus(int $optionId, string $status): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('status', $qb->createNamedParameter($status, IQueryBuilder::PARAM_STR))
           ->set('updated', $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT))
           ->where($qb->expr()->eq('id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    public function deleteArchivedOptions(int $offset): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
           ->where($qb->expr()->lt('archived', $qb->createNamedParameter($offset, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->gt('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    public function updateSortOrder(int $optionId, int $sortOrder): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('sort_order', $qb->createNamedParameter($sortOrder, IQueryBuilder::PARAM_INT))
           ->set('updated', $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT))
           ->where($qb->expr()->eq('id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    public function reorderOptions(array $optionIds): void
    {
        $qb = $this->db->getQueryBuilder();
        $timestamp = time();

        foreach ($optionIds as $index => $optionId) {
            $qb->update($this->getTableName())
               ->set('sort_order', $qb->createNamedParameter($index, IQueryBuilder::PARAM_INT))
               ->set('updated', $qb->createNamedParameter($timestamp, IQueryBuilder::PARAM_INT))
               ->where($qb->expr()->eq('id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
               ->executeStatement();
        }
    }

    public function deleteByUserId(string $userId): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
           ->where('owner = :userId')
           ->setParameter('userId', $userId);
        $qb->executeStatement();
    }

    public function deleteByTargetId(int $targetId): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('deleted', $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT))
           ->set('updated', $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT))
           ->where($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }


    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
           ->from($this->getTableName(), self::TABLE)
           ->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        $currentUserId = $this->userSession->getCurrentUserId();


        $this->addHasSupportedSubquery($qb, self::TABLE, $currentUserId);
        $this->addSupportValueSubquery($qb, self::TABLE, $currentUserId);
        $this->addParticipantsCountSubquery($qb, self::TABLE);
        $this->addSupportsCountSubquery($qb, self::TABLE);
        $this->addNegativeSupportsCountSubquery($qb, self::TABLE);
        $this->addPositiveSupportsCountSubquery($qb, self::TABLE);
        $this->addNeutralSupportsCountSubquery($qb, self::TABLE);
        $this->addCommentsCountSubquery($qb, self::TABLE);
        $this->addMiscsSubquery($qb, self::TABLE);



        return $qb;
    }

    /**
     * Get the full table name with prefix
     */
    private function getFullTableName(string $tableName): string
    {
        return $this->db->getQueryBuilder()->getTableName($tableName);
    }

    /**
     * Add correlated subquery for has_supported flag - always returns 0 or 1, never NULL
     */
    protected function addHasSupportedSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        ?string $currentUserId
    ): void {
        if ($currentUserId === null) {
            $qb->addSelect('0 AS has_supported');
            return;
        }

        $userIdParam = $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR);

        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT 1 FROM ' . $this->getFullTableName(Support::TABLE) . ' s ' .
                'WHERE s.option_id = ' . $tableAlias . '.id ' .
                'AND s.user_id = ' . $userIdParam . ' ' .
                'LIMIT 1), 0) AS has_supported'
            )
        );
    }

    /**
     * Add correlated subquery for support value - can be NULL
     */
    protected function addSupportValueSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        ?string $currentUserId
    ): void {
        if ($currentUserId === null) {
            $qb->addSelect('NULL AS support_value');
            return;
        }

        $userIdParam = $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR);

        $qb->addSelect(
            $qb->createFunction(
                '(SELECT s.value FROM ' . $this->getFullTableName(Support::TABLE) . ' s ' .
                'WHERE s.option_id = ' . $tableAlias . '.id ' .
                'AND s.user_id = ' . $userIdParam . ' ' .
                'LIMIT 1) AS support_value'
            )
        );
    }

    /**
     * Add correlated subquery for negative supports count - always returns 0 or positive integer
     */
    protected function addNegativeSupportsCountSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'count_negative_supports'
    ): void {
        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT COUNT(s.user_id) FROM ' . $this->getFullTableName(Support::TABLE) . ' s ' .
                'WHERE s.option_id = ' . $tableAlias . '.id ' .
                'AND s.value = -1), 0) AS ' . $alias
            )
        );
    }

    /**
     * Add correlated subquery for neutral supports count - always returns 0 or positive integer
     */
    protected function addNeutralSupportsCountSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'count_neutral_supports'
    ): void {
        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT COUNT(s.user_id) FROM ' . $this->getFullTableName(Support::TABLE) . ' s ' .
                'WHERE s.option_id = ' . $tableAlias . '.id ' .
                'AND s.value = 0), 0) AS ' . $alias
            )
        );
    }

    /**
     * Add correlated subquery for positive supports count - always returns 0 or positive integer
     */
    protected function addPositiveSupportsCountSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'count_positive_supports'
    ): void {
        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT COUNT(s.user_id) FROM ' . $this->getFullTableName(Support::TABLE) . ' s ' .
                'WHERE s.option_id = ' . $tableAlias . '.id ' .
                'AND s.value = 1), 0) AS ' . $alias
            )
        );
    }

    /**
     * Add correlated subquery for total supports count - always returns 0 or positive integer
     */
    protected function addSupportsCountSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'count_supports'
    ): void {
        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT COUNT(DISTINCT s.user_id) FROM ' . $this->getFullTableName(Support::TABLE) . ' s ' .
                'WHERE s.option_id = ' . $tableAlias . '.id), 0) AS ' . $alias
            )
        );
    }

    /**
     * Add correlated subquery for comments count - always returns 0 or positive integer
     */
    protected function addCommentsCountSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'count_comments'
    ): void {
        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT COUNT(c.id) FROM ' . $this->getFullTableName(Comment::TABLE) . ' c ' .
                'WHERE c.option_id = ' . $tableAlias . '.id ' .
                'AND c.deleted = 0), 0) AS ' . $alias
            )
        );
    }

    /**
     * Add correlated subquery for participants count - always returns 0 or positive integer
     */
    protected function addParticipantsCountSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'count_participants'
    ): void {
        $qb->addSelect(
            $qb->createFunction(
                'COALESCE(' .
                '(SELECT COUNT(p.id) FROM ' . $this->getFullTableName(Option::TABLE) . ' p ' .
                'WHERE p.parent_id = ' . $tableAlias . '.id ' .
                'AND (p.access = \'' . Option::ACCESS_OPEN . '\' OR p.access = \'' . Option::ACCESS_PUBLIC . '\')), 0) AS ' . $alias
            )
        );
    }

    /**
     * Add subquery for misc settings using GROUP_CONCAT - can be NULL if no misc settings
     */
    /**
     * Add subquery for misc settings using platform-specific concatenation
     */
    protected function addMiscsSubquery(
        IQueryBuilder &$qb,
        string $tableAlias,
        string $alias = 'misc_settings_concat'
    ): void {
        $platform = $this->db->getDatabasePlatform()->getName();

        if ($platform === 'postgresql') {
            // For PostgreSQL, we need to use a subquery approach without string_agg
            // This avoids the GROUP BY issue
            $qb->addSelect(
                $qb->createFunction(
                    '(SELECT COALESCE(' .
                    'string_agg(CONCAT(m.key, \':\', m.value), \',\'), ' .
                    '\'\') FROM ' . $this->getFullTableName(OptionMisc::TABLE) . ' m ' .
                    'WHERE m.option_id = ' . $tableAlias . '.id' .
                    ') AS ' . $alias
                )
            );
        } else {
            // MySQL and others use GROUP_CONCAT
            $qb->addSelect(
                $qb->createFunction(
                    '(SELECT GROUP_CONCAT(CONCAT(m.key, \':\', m.value) SEPARATOR \',\') ' .
                    'FROM ' . $this->getFullTableName(OptionMisc::TABLE) . ' m ' .
                    'WHERE m.option_id = ' . $tableAlias . '.id) AS ' . $alias
                )
            );
        }
    }

    /**
     * Join misc settings from OptionMisc table (kept for backward compatibility)
     */
    protected function joinMiscs(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'option_misc_settings'
    ): void {
        $this->addMiscsSubquery($qb, $fromAlias);
    }

    private function loadDynamicFields(Option $option): void
    {
        $optionId = $option->getId();

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from(OptionMisc::TABLE)
           ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        while ($row = $result->fetch()) {
            if (isset($row['key'], $row['value'])) {
                $option->setMiscField($row['key'], $row['value']);
            }
        }
        $result->closeCursor();
    }

    /**
     * Convert a value to the type defined in fields
     */
    private function castValueByType($value, array $fieldDef)
    {
        $type = $fieldDef['type'] ?? 'string';

        if ($value === null) {
            return null;
        }

        switch ($type) {
        case 'integer':
        case 'int':
            return (int)$value;
        case 'boolean':
        case 'bool':
            return (bool)$value;
        case 'float':
        case 'double':
            return (float)$value;
        case 'datetime':
            return is_numeric($value) ? (int)$value : $value;
        case 'json':
            if (is_array($value) || is_object($value)) {
                return json_encode($value);
            }
            return $value;
        case 'enum':
            $allowed = $fieldDef['allowed_values'] ?? [];
            if (in_array($value, $allowed, true)) {
                return $value;
            }
            return $fieldDef['default'] ?? null;
        case 'string':
        default:
        return (string)$value;
        }
    }

    /**
     * Save dynamic fields to OptionMisc and update miscFields in Option
     */
    public function saveDynamicFields(Option $option, array $fieldsDefinition): void
    {
        $optionId = $option->getId();
        if (empty($fieldsDefinition)) {
            return;
        }

        // Delete existing misc fields
        $deleteQb = $this->db->getQueryBuilder();
        $deleteQb->delete(OptionMisc::TABLE)
                 ->where($deleteQb->expr()->eq('option_id', $deleteQb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
                 ->executeStatement();

        // Insert new misc fields
        foreach ($fieldsDefinition as $fieldDef) {
            $key = $fieldDef['key'];
            $value = $this->castValueByType($fieldDef['default'] ?? null, $fieldDef);

            $insertQb = $this->db->getQueryBuilder();
            $insertQb->insert(OptionMisc::TABLE)
                     ->values(
                         [
                             'option_id' => $insertQb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT),
                             'key'       => $insertQb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                             'value'     => $insertQb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
                         ]
                     )
                     ->executeStatement();

            $option->setMiscField($key, $value);
        }
    }

    /**
     * Update only specified dynamic fields in OptionMisc and miscFields
     */
    public function updateDynamicFields(Option $option, array $fieldsToUpdate, array $fieldsDefinition): void
    {
        $optionId = $option->getId();
        if (empty($fieldsToUpdate)) {
            return;
        }

        foreach ($fieldsToUpdate as $key => $value) {
            $key = (string)$key;

            $fieldDef = array_filter($fieldsDefinition, fn($f) => $f['key'] === $key);
            $fieldDef = array_shift($fieldDef) ?: ['type' => 'string', 'default' => null];

            $value = $this->castValueByType($value ?? $fieldDef['default'], $fieldDef);

            // Check if field exists
            $checkQb = $this->db->getQueryBuilder();
            $existing = $checkQb->select('id')
                                ->from(OptionMisc::TABLE)
                                ->where($checkQb->expr()->eq('option_id', $checkQb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
                                ->andWhere($checkQb->expr()->eq('key', $checkQb->createNamedParameter($key, IQueryBuilder::PARAM_STR)))
                                ->executeQuery()
                                ->fetchOne();

            if ($existing) {
                $updateQb = $this->db->getQueryBuilder();
                $updateQb->update(OptionMisc::TABLE)
                         ->set('value', $updateQb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR))
                         ->where($updateQb->expr()->eq('id', $updateQb->createNamedParameter($existing, IQueryBuilder::PARAM_INT)))
                         ->executeStatement();
            } else {
                $insertQb = $this->db->getQueryBuilder();
                $insertQb->insert(OptionMisc::TABLE)
                         ->values(
                             [
                                 'option_id' => $insertQb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT),
                                 'key'       => $insertQb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                                 'value'     => $insertQb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
                             ]
                         )
                         ->executeStatement();
            }

            $option->setMiscField($key, $value);
        }
    }

    /**
     * Join inquiry information for the option
     */
    protected function joinInquiryInfo(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'inquiry_info'
    ): void {
        $qb->addSelect($joinAlias . '.title AS inquiry_title')
           ->addSelect($joinAlias . '.type AS inquiry_type')
           ->addSelect($joinAlias . '.access AS inquiry_access')
           ->leftJoin(
               $fromAlias,
               Inquiry::TABLE,
               $joinAlias,
               $qb->expr()->andX(
                   $qb->expr()->eq($joinAlias . '.id', $fromAlias . '.target_id'),
                   $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT))
               )
           );
    }

    /**
     * Get the maximum sort order for options in a specific target (inquiry)
     */
    public function getMaxSortOrder(int $targetId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->max('sort_order', 'max_sort'))
           ->from($this->getTableName())
           ->where($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery()->fetch();
        return (int)($result['max_sort'] ?? 0);
    }

    /**
     * Get options with their child options for hierarchical display
     */
    public function findWithChildren(int $targetId): array
    {
        // First get all parent options
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq(self::TABLE . '.parent_id', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->orderBy(self::TABLE . '.sort_order', 'ASC')
           ->addOrderBy(self::TABLE . '.created', 'ASC');

        $parentOptions = $this->findEntities($qb);

        // For each parent option, get its children
        foreach ($parentOptions as $parentOption) {
            $childOptions = $this->findByParentId($parentOption->getId());
            $parentOption->setChildren($childOptions);
        }

        return $parentOptions;
    }
}
