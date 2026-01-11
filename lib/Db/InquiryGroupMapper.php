<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Exception;
use OCA\Agora\Helper\SqlHelper;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<InquiryGroup>
 */
class InquiryGroupMapper extends QBMapper
{
    public const TABLE = InquiryGroup::TABLE;
    public const CONCAT_SEPARATOR = ',';

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, InquiryGroup::TABLE, InquiryGroup::class);
    }

    /**
     * List all InquiryGroups
     *
     * @return InquiryGroup[]
     */
    public function list(): array
    {
        $qb = $this->buildQuery();
        $qb->orderBy('title', 'ASC');
        $inquiryGroups = $this->findEntities($qb);
        
        // Load dynamic fields for all inquiry groups in one query
        $this->loadDynamicFieldsForMultiple($inquiryGroups);
        
        return $inquiryGroups;
    }

    /**
     * Find a InquiryGroup by its ID
     *
     * @param  int $id id off inquiry group
     * @return InquiryGroup
     */
    public function find(int $id): InquiryGroup
    {
        $qb = $this->buildQuery();

        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id)));

        $inquiryGroup = $this->findEntity($qb);
        $this->loadDynamicFields($inquiryGroup);
        
        return $inquiryGroup;
    }

    /**
     * Load misc fields for an InquiryGroup (similar to InquiryMapper)
     *
     * @param InquiryGroup $inquiryGroup
     */
    public function loadFieldsMisc(InquiryGroup $inquiryGroup): void
    {
        $this->loadDynamicFields($inquiryGroup);
    }

    /**
     * Get InquiryGroup with misc fields loaded
     *
     * @param int $id
     * @param bool $getDeleted
     * @param bool $withMiscFields
     * @return InquiryGroup
     */
    public function get(int $id, bool $getDeleted = false, bool $withMiscFields = true): InquiryGroup
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }
        
        $inquiryGroup = $this->findEntity($qb);
        
        if ($withMiscFields) {
            $this->loadDynamicFields($inquiryGroup);
        }
        
        return $inquiryGroup;
    }

    /**
     * Find active (non-deleted) InquiryGroups with misc fields
     *
     * @return InquiryGroup[]
     */
    public function findActive(): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0)))
           ->orderBy('created', 'ASC')
           ->addOrderBy('title', 'ASC');
           
        $inquiryGroups = $this->findEntities($qb);
        
        // Load dynamic fields for all inquiry groups in one query
        $this->loadDynamicFieldsForMultiple($inquiryGroups);
        
        return $inquiryGroups;
    }

    /**
     * Find expired InquiryGroups with misc fields
     *
     * @return InquiryGroup[]
     */
    public function findExpired(): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->lt(self::TABLE . '.expire', $qb->createNamedParameter(time())))
           ->andWhere($qb->expr()->isNotNull(self::TABLE . '.expire'))
           ->orderBy('created', 'ASC')
           ->addOrderBy('title', 'ASC');
           
        $inquiryGroups = $this->findEntities($qb);
        
        // Load dynamic fields for all inquiry groups in one query
        $this->loadDynamicFieldsForMultiple($inquiryGroups);
        
        return $inquiryGroups;
    }

    public function addInquiryToGroup(int $inquiryId, int $groupId): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->insert(InquiryGroup::RELATION_TABLE)
           ->setValue('inquiry_id', $qb->createNamedParameter($inquiryId))
           ->setValue('group_id', $qb->createNamedParameter($groupId));
        $qb->executeStatement();
    }

    /**
     * Remove a Inquiry from a InquiryGroup
     *
     * @param  int $inquiryId id of inquiry
     * @param  int $groupId   id of group
     * @throws Exception
     */
    public function removeInquiryFromGroup(int $inquiryId, int $groupId): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete(InquiryGroup::RELATION_TABLE)
           ->where(
               $qb->expr()->andX(
                   $qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId)),
                   $qb->expr()->eq('group_id', $qb->createNamedParameter($groupId))
               )
           );
        $qb->executeStatement();
    }

    public function add(InquiryGroup $inquiryGroup): InquiryGroup
    {
        $inquiryGroup->setCreated(time());
        $inquiryGroup->setOwner($this->userSession->getCurrentUserId());
        return $this->insert($inquiryGroup);
    }

    public function tidyInquiryGroups(): void
    {
        $qb = $this->db->getQueryBuilder();

        $subquery = $this->db->getQueryBuilder();
        $subquery->selectDistinct('group_id')->from(InquiryGroup::RELATION_TABLE);

        $qb->delete(InquiryGroup::TABLE)
           ->where(
               $qb->expr()->notIn(
                   'id',
                   $qb->createFunction($subquery->getSQL()),
                   IQueryBuilder::PARAM_INT_ARRAY
               )
           );
        $qb->executeStatement();
    }

    /**
     * Get inquiry IDs for a group
     */
    public function getInquiryIdsForGroup(int $groupId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('inquiry_id')
           ->from(InquiryGroup::RELATION_TABLE)
           ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId)));

        $result = $qb->executeQuery();
        $inquiryIds = [];
        while ($row = $result->fetch()) {
            $inquiryIds[] = (int) $row['inquiry_id'];
        }
        $result->closeCursor();

        return $inquiryIds;
    }

    /**
     * Count inquiries in a group
     */
    public function countInquiriesInGroup(int $groupId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('*', 'count'))
           ->from(InquiryGroup::RELATION_TABLE)
           ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId)));

        $result = $qb->executeQuery();
        $count = (int) $result->fetchOne();
        $result->closeCursor();

        return $count;
    }

    /**
     * Find InquiryGroups by parent ID
     *
     * @param  int $parentId
     * @return InquiryGroup[]
     */
    public function findByParentId(int $parentId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.parent_id', $qb->createNamedParameter($parentId)))
           ->orderBy('created', 'ASC')
           ->addOrderBy('title', 'ASC');
           
        $inquiryGroups = $this->findEntities($qb);
        
        // Load dynamic fields for all inquiry groups in one query
        $this->loadDynamicFieldsForMultiple($inquiryGroups);
        
        return $inquiryGroups;
    }

    /**
     * Find InquiryGroups by type
     *
     * @param  string $type
     * @return InquiryGroup[]
     */
    public function findByType(string $type): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.type', $qb->createNamedParameter($type)))
           ->orderBy('created', 'ASC')
           ->addOrderBy('title', 'ASC');
           
        $inquiryGroups = $this->findEntities($qb);
        
        // Load dynamic fields for all inquiry groups in one query
        $this->loadDynamicFieldsForMultiple($inquiryGroups);
        
        return $inquiryGroups;
    }

    /**
     * Find InquiryGroups by status
     *
     * @param  string $status
     * @return InquiryGroup[]
     */
    public function findByStatus(string $status): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.group_status', $qb->createNamedParameter($status)))
           ->orderBy('created', 'ASC')
           ->addOrderBy('title', 'ASC');
           
        $inquiryGroups = $this->findEntities($qb);
        
        // Load dynamic fields for all inquiry groups in one query
        $this->loadDynamicFieldsForMultiple($inquiryGroups);
        
        return $inquiryGroups;
    }

    /**
     * Save dynamic fields to InquiryGroupMisc and update miscFields in InquiryGroup
     */
    public function saveDynamicFields(InquiryGroup $inquiryGroup, array $fieldsDefinition): void
    {
        $inquiryGroupId = $inquiryGroup->getId();
        if (empty($fieldsDefinition)) {
            return;
        }

        $qb = $this->db->getQueryBuilder();

        $qb->delete(InquiryGroupMisc::TABLE)
           ->where($qb->expr()->eq('inquiry_group_id', $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)))
           ->executeStatement();

        foreach ($fieldsDefinition as $fieldDef) {
            $key = $fieldDef['key'];
            $value = $this->castValueByType($fieldDef['default'] ?? null, $fieldDef);

            $qb->insert(InquiryGroupMisc::TABLE)
               ->values(
                   [
                       'inquiry_group_id' => $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT),
                       'key'        => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                       'value'      => $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
                   ]
               )
               ->executeStatement();

            $inquiryGroup->setMiscField($key, $value);
        }
    }

    /**
     * Update only specified dynamic fields in InquiryGroupMisc and miscFields
     */
    public function updateDynamicFields(InquiryGroup $inquiryGroup, array $fieldsToUpdate, array $fieldsDefinition): void
    {
        $inquiryGroupId = $inquiryGroup->getId();
        if (empty($fieldsToUpdate)) {
            return;
        }

        $qb = $this->db->getQueryBuilder();

        foreach ($fieldsToUpdate as $key => $value) {
            $key = (string)$key;

            $fieldDef = array_filter($fieldsDefinition, fn($f) => $f['key'] === $key);
            $fieldDef = array_shift($fieldDef) ?: ['type'=>'string', 'default'=>null];

            $value = $this->castValueByType($value ?? $fieldDef['default'], $fieldDef);

            $existing = $qb->select('id')
                           ->from(InquiryGroupMisc::TABLE)
                           ->where($qb->expr()->eq('inquiry_group_id', $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)))
                           ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)))
                           ->executeQuery()
                           ->fetchOne();

            if ($existing) {
                $qb->update(InquiryGroupMisc::TABLE)
                   ->set('value', $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR))
                   ->where($qb->expr()->eq('id', $qb->createNamedParameter($existing, IQueryBuilder::PARAM_INT)))
                   ->executeStatement();
            } else {
                $qb->insert(InquiryGroupMisc::TABLE)
                   ->values(
                       [
                           'inquiry_group_id' => $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT),
                           'key'        => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                           'value'      => $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
                       ]
                   )
                   ->executeStatement();
            }

            $inquiryGroup->setMiscField($key, $value);
        }
    }

    /**
     * Convert a value to the type defined in fields (similar to InquiryMapper)
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
<<<<<<< HEAD
     * Join misc settings from InquiryGroupMisc table
    protected function joinMiscs(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'inq_group_misc_settings'
    ): void {
        $qb->addSelect($qb->createFunction('GROUP_CONCAT(DISTINCT CONCAT(' . $joinAlias . '.key, ":", ' . $joinAlias . '.value)) AS misc_group_settings_concat'));

        $qb->leftJoin(
            $fromAlias,
            InquiryGroupMisc::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_group_id', $fromAlias . '.id'),
            )
        );
    }
     */
/*
    protected function joinInquiryIds(
        IQueryBuilder $qb,
        string $joinAlias = 'inqs',
    ): void {
        SqlHelper::getConcatenatedArray(
            qb: $qb,
            concatColumn: $joinAlias . '.inquiry_id',
            asColumn: 'inquiry_ids',
            dbProvider: $this->db->getDatabaseProvider(),
        );

        $qb->leftJoin(
            self::TABLE,
            InquiryGroup::RELATION_TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq(self::TABLE . '.id', $joinAlias . '.group_id'),
            )
        );
    }
 */
    protected function joinMiscs(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'inq_group_misc_settings'
    ): void {
        $dbProvider = $this->db->getDatabaseProvider();

        if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
            $concatExpr = $joinAlias . '.key || \':\' || ' . $joinAlias . '.value';
        } else {
            $concatExpr = 'CONCAT(' . $joinAlias . '.key, \':\', ' . $joinAlias . '.value)';
        }

        SqlHelper::getConcatenatedArray(
            qb: $qb,
            concatColumn: $concatExpr,
            asColumn: 'misc_group_settings_concat',
            dbProvider: $dbProvider,
            separator: ','
        );

        $qb->leftJoin(
            $fromAlias,
            InquiryGroupMisc::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_group_id', $fromAlias . '.id'),
            )
        );
    }

    protected function joinInquiryIds(
        IQueryBuilder $qb,
        string $joinAlias = 'inqs',
    ): void {
        SqlHelper::getConcatenatedArray(
            qb: $qb,
            concatColumn: $joinAlias . '.inquiry_id',
            asColumn: 'inquiry_ids',
            dbProvider: $this->db->getDatabaseProvider(),
            separator: ','
        );

        $qb->leftJoin(
            self::TABLE,
            InquiryGroup::RELATION_TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq(self::TABLE . '.id', $joinAlias . '.group_id'),
            )
        );
    }

=======
     * Load dynamic fields for a single inquiry group
     */
>>>>>>> main
    private function loadDynamicFields(InquiryGroup $inquiryGroup): void
    {
        $inquiryGroupId = $inquiryGroup->getId();

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from(InquiryGroupMisc::TABLE)
           ->where($qb->expr()->eq('inquiry_group_id', $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)));

        $stmt = $qb->executeQuery();
        $storedData = $stmt->fetchAll();
        $stmt->closeCursor();

        foreach ($storedData as $data) {
            if (is_array($data) && isset($data['key'], $data['value'])) {
                $key = (string) $data['key'];
                $value = $data['value'];

                $inquiryGroup->setMiscField($key, $value);
            }
        }
    }

    /**
     * Load dynamic fields for multiple inquiry groups in one query
     * This avoids the N+1 query problem
     */
    public function loadDynamicFieldsForMultiple(array $inquiryGroups): void
    {
        if (empty($inquiryGroups)) {
            return;
        }
        
        $ids = array_map(fn($group) => $group->getId(), $inquiryGroups);
        
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from(InquiryGroupMisc::TABLE)
           ->where($qb->expr()->in('inquiry_group_id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)));
        
        $stmt = $qb->executeQuery();
        $allData = $stmt->fetchAll();
        $stmt->closeCursor();
        
        // Organize data by inquiry_group_id
        $groupedData = [];
        foreach ($allData as $data) {
            $groupId = (int) $data['inquiry_group_id'];
            if (!isset($groupedData[$groupId])) {
                $groupedData[$groupId] = [];
            }
            $groupedData[$groupId][] = $data;
        }
        
        // Assign data to each inquiry group
        foreach ($inquiryGroups as $inquiryGroup) {
            $groupId = $inquiryGroup->getId();
            if (isset($groupedData[$groupId])) {
                foreach ($groupedData[$groupId] as $data) {
                    if (isset($data['key'], $data['value'])) {
                        $inquiryGroup->setMiscField((string) $data['key'], $data['value']);
                    }
                }
            }
        }
    }

    /**
     * Build a simple query without problematic joins
     */
    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.*')
           ->from($this->getTableName(), self::TABLE);
        
        // Remove problematic joins that cause PostgreSQL GROUP BY issues
        // $this->joinInquiryIds($qb);
        // $this->joinMiscs($qb, self::TABLE);

        return $qb;
    }

<<<<<<< HEAD
=======
    /**
     * Load inquiry IDs for an InquiryGroup
     */
    public function loadInquiryIds(InquiryGroup $inquiryGroup): void
    {
        $inquiryGroupId = $inquiryGroup->getId();
        
        $qb = $this->db->getQueryBuilder();
        $qb->select('inquiry_id')
           ->from(InquiryGroup::RELATION_TABLE)
           ->where($qb->expr()->eq('group_id', $qb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)));
        
        $result = $qb->executeQuery();
        $inquiryIds = [];
        while ($row = $result->fetch()) {
            $inquiryIds[] = (int) $row['inquiry_id'];
        }
        $result->closeCursor();
        
        // Assuming InquiryGroup has a method to set inquiry IDs
        if (method_exists($inquiryGroup, 'setInquiryIds')) {
            $inquiryGroup->setInquiryIds($inquiryIds);
        }
    }

    /**
     * Load inquiry IDs for multiple inquiry groups in one query
     */
    public function loadInquiryIdsForMultiple(array $inquiryGroups): void
    {
        if (empty($inquiryGroups)) {
            return;
        }
        
        $ids = array_map(fn($group) => $group->getId(), $inquiryGroups);
        
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from(InquiryGroup::RELATION_TABLE)
           ->where($qb->expr()->in('group_id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)));
        
        $stmt = $qb->executeQuery();
        $allData = $stmt->fetchAll();
        $stmt->closeCursor();
        
        // Organize data by group_id
        $groupedData = [];
        foreach ($allData as $data) {
            $groupId = (int) $data['group_id'];
            if (!isset($groupedData[$groupId])) {
                $groupedData[$groupId] = [];
            }
            $groupedData[$groupId][] = (int) $data['inquiry_id'];
        }
        
        // Assign data to each inquiry group
        foreach ($inquiryGroups as $inquiryGroup) {
            $groupId = $inquiryGroup->getId();
            if (isset($groupedData[$groupId])) {
                if (method_exists($inquiryGroup, 'setInquiryIds')) {
                    $inquiryGroup->setInquiryIds($groupedData[$groupId]);
                }
            } else {
                if (method_exists($inquiryGroup, 'setInquiryIds')) {
                    $inquiryGroup->setInquiryIds([]);
                }
            }
        }
    }

>>>>>>> main
}
