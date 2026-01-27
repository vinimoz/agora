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
    ) {
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
            $optionGroupsAlias = 'option_groups';
            $currentUserId = $this->userSession->getCurrentUserId();
        
            //$this->joinUserRole($qb, self::TABLE, $currentUserId);
            $this->joinHasSupported($qb, self::TABLE, $currentUserId);
            $this->joinSupportValue($qb, self::TABLE, $currentUserId);
            $this->joinParticipantsCount($qb, self::TABLE);
            $this->joinSupportsCount($qb, self::TABLE);
            $this->joinNegativeSupportsCount($qb, self::TABLE);
            $this->joinPositiveSupportsCount($qb, self::TABLE);
            $this->joinNeutralSupportsCount($qb, self::TABLE);
            $this->joinCommentsCount($qb, self::TABLE);
            $this->joinMiscs($qb, self::TABLE);
            // $this->joinInquiryInfo($qb, self::TABLE);
        }
        return $this->findEntity($qb);
    }

    public function find(int $id): Option
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        $option = $this->findEntity($qb);

        return $option;
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
                           return $qb->expr()->orX(
                               $qb->expr()->iLike(
                                   self::TABLE . '.text',
                                   $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($token) . '%', IQueryBuilder::PARAM_STR),
                                   IQueryBuilder::PARAM_STR
                               )
                           );
                       }, explode(' ', $query->getTerm())
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
        $optionGroupsAlias = 'option_groups';
        //$this->joinUserRole($qb, self::TABLE, $currentUserId);
        $this->joinHasSupported($qb, self::TABLE, $currentUserId);
        $this->joinSupportValue($qb, self::TABLE, $currentUserId);
  
        $this->joinParticipantsCount($qb, self::TABLE);
        $this->joinSupportsCount($qb, self::TABLE);
        $this->joinNegativeSupportsCount($qb, self::TABLE);
        $this->joinPositiveSupportsCount($qb, self::TABLE);
        $this->joinNeutralSupportsCount($qb, self::TABLE);
        $this->joinCommentsCount($qb, self::TABLE);
        $this->joinMiscs($qb, self::TABLE);
        $this->joinInquiryInfo($qb, self::TABLE);

        return $qb;
    }

    /**
     * Join misc settings from OptionMisc table
     */
    protected function joinMiscs(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'option_misc_settings'
    ): void {
        $qb->addSelect($qb->createFunction('GROUP_CONCAT(DISTINCT CONCAT(' . $joinAlias . '.key, ":", ' . $joinAlias . '.value)) AS misc_settings_concat'));

        $qb->leftJoin(
            $fromAlias,
            OptionMisc::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
            )
        );
    }

    private function loadDynamicFields(Option $option): void
    {
        $optionId = $option->getId();

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from(OptionMisc::TABLE)
           ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        $stmt = $qb->executeQuery();
        $storedData = $stmt->fetchAll();
        $stmt->closeCursor();

        $miscFields = [];

        foreach ($storedData as $data) {
            if (is_array($data) && isset($data['key'], $data['value'])) {
                $key = (string) $data['key'];
                $value = $data['value']; 

                $miscFields[$key] = $value;
                $option->setMiscField($key, $value);
            }
        }
    }

    /**
     * Convert a value to the type defined in fields
     */
    private function castValueByType($value, array $fieldDef)
    {
        $type = $fieldDef['type'] ?? 'string';

        // If value is null, return null
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
                // If it's already JSON, keep it as is
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

        $qb = $this->db->getQueryBuilder();

        $qb->delete(OptionMisc::TABLE)
           ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
           ->executeStatement();

        foreach ($fieldsDefinition as $fieldDef) {
            $key = $fieldDef['key'];
            $value = $this->castValueByType($fieldDef['default'] ?? null, $fieldDef);

            $qb->insert(OptionMisc::TABLE)
               ->values(
                   [
                       'option_id' => $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT),
                       'key'       => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                       'value'     => $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
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

        $qb = $this->db->getQueryBuilder();

        foreach ($fieldsToUpdate as $key => $value) {
            $key = (string)$key;

            $fieldDef = array_filter($fieldsDefinition, fn($f) => $f['key'] === $key);
            $fieldDef = array_shift($fieldDef) ?: ['type' => 'string', 'default' => null];

            $value = $this->castValueByType($value ?? $fieldDef['default'], $fieldDef);

            $existing = $qb->select('id')
                           ->from(OptionMisc::TABLE)
                           ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
                           ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)))
                           ->executeQuery()
                           ->fetchOne();

            if ($existing) {
                $qb->update(OptionMisc::TABLE)
                   ->set('value', $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR))
                   ->where($qb->expr()->eq('id', $qb->createNamedParameter($existing, IQueryBuilder::PARAM_INT)))
                   ->executeStatement();
            } else {
                $qb->insert(OptionMisc::TABLE)
                   ->values(
                       [
                           'option_id' => $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT),
                           'key'       => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                           'value'     => $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
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
           ->addSelect($joinAlias . '.access AS inquiry_access');

        $qb->leftJoin(
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
    protected function joinUserRole(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $currentUserId,
        string $joinAlias = 'user_shares',
    ): void {
        $emptyString = $qb->expr()->literal('');

        $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.type, ' . $emptyString . ') AS user_role'))
           ->addGroupBy($joinAlias . '.type');

        $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.token, ' . $emptyString . ') AS share_token'))
           ->addGroupBy($joinAlias . '.token');

        $qb->leftJoin(
            $fromAlias,
            Share::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
                $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
            )
        );
    }
    **/
    protected function joinHasSupported(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $currentUserId,
        string $joinAlias = 'current_user_support'
    ): void {
        if ($currentUserId === null) {
            $qb->addSelect($qb->createFunction('0 AS has_supported'));
            return;
        }

        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR))
            )
        );

        $qb->addSelect(
            $qb->createFunction('CASE WHEN ' . $joinAlias . '.user_id IS NOT NULL THEN 1 ELSE 0 END AS has_supported')
        );
    }

    protected function joinSupportValue(
        IQueryBuilder &$qb,
        string $fromAlias,
        ?string $currentUserId,
        string $joinAlias = 'current_user_support_value'
    ): void {
        if ($currentUserId === null) {
            $qb->addSelect($qb->createFunction('NULL AS support_value'));
            return;
        }

        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR))
            )
        );

        $qb->addSelect(
            $qb->createFunction($joinAlias . '.value AS support_value')
        );
    }

    protected function joinNegativeSupportsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'supports_negative',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.value', $qb->createNamedParameter(-1))
            )
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.user_id)) AS count_negative_supports'));
    }

    protected function joinNeutralSupportsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'supports_neutral',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.value', $qb->createNamedParameter(0))
            )
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.user_id)) AS count_neutral_supports'));
    }

    protected function joinPositiveSupportsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'supports_positive',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.value', $qb->createNamedParameter(1))
            )
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.user_id)) AS count_positive_supports'));
    }

    protected function joinSupportsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'supports',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id')
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.user_id)) AS count_supports'));
        $qb->groupBy($fromAlias . '.id');
    }

    protected function joinCommentsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'comments',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Comment::TABLE,
            $joinAlias,
            $qb->expr()->eq($joinAlias . '.option_id', $fromAlias . '.id')
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.id)) AS count_comments'));
        $qb->groupBy($fromAlias . '.id');
    }

    protected function joinParticipantsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'participants',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Option::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.parent_id', $fromAlias . '.id'),
                $qb->expr()->orX(
                    $qb->expr()->eq($joinAlias . '.access', $qb->createNamedParameter(Option::ACCESS_OPEN, IQueryBuilder::PARAM_STR)),
                    $qb->expr()->eq($joinAlias . '.access', $qb->createNamedParameter(Option::ACCESS_PUBLIC, IQueryBuilder::PARAM_STR))
                )
            )
        );
        $qb->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.id)) AS count_participants'));
    }

    /**
     * Get the maximum sort order for options in a specific target (inquiry)
     */
    public function getMaxSortOrder(int $targetId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->createFunction('COALESCE(MAX(sort_order), 0) as max_sort'))
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
