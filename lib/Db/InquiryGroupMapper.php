<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Exception;
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
 * List all InquiryGroups (no soft-delete filter — use findActive() for that).
 *
 * @return InquiryGroup[]
 */
public function list(): array
{
    $qb = $this->buildQuery();
    $qb->orderBy('title', 'ASC')
       ->addOrderBy(self::TABLE . '.id', 'ASC');

    $inquiryGroups = $this->findEntities($qb);

    // Batched hydration — one query per relation type, never per row.
    $this->loadDynamicFieldsForMultiple($inquiryGroups);   
    $this->loadVisibilityGroupsForMultiple($inquiryGroups); 
    $this->loadVisibilityUsersForMultiple($inquiryGroups);  
    $this->loadInquiryIdsForMultiple($inquiryGroups);        

    return $inquiryGroups;
}
	/**
	 * Find an InquiryGroup by its ID
	 */
	public function find(int $id): InquiryGroup
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

		$inquiryGroup = $this->findEntity($qb);
		$this->loadDynamicFields($inquiryGroup);
		$inquiryGroup->setVisibilityGroups($this->getVisibilityGroupsForGroup($id));
		$inquiryGroup->setVisibilityUsers($this->getVisibilityUsersForGroup($id));

		return $inquiryGroup;
	}

	public function loadFieldsMisc(InquiryGroup $inquiryGroup): void
	{
		$this->loadDynamicFields($inquiryGroup);
	}

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

		$inquiryGroup->setVisibilityGroups($this->getVisibilityGroupsForGroup($id));
		$inquiryGroup->setVisibilityUsers($this->getVisibilityUsersForGroup($id));

		return $inquiryGroup;
	}

	/**
	 * @return InquiryGroup[]
	 */
	public function findActive(): array
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0)))
			->orderBy('created', 'ASC')
			->addOrderBy('title', 'ASC');

		$inquiryGroups = $this->findEntities($qb);
		$this->loadDynamicFieldsForMultiple($inquiryGroups);

		return $inquiryGroups;
	}

	/**
	 * @return InquiryGroup[]
	 */
	public function findExpired(): array
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->lt(self::TABLE . '.expire', $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->isNotNull(self::TABLE . '.expire'))
			->orderBy('created', 'ASC')
			->addOrderBy('title', 'ASC');

		$inquiryGroups = $this->findEntities($qb);
		$this->loadDynamicFieldsForMultiple($inquiryGroups);

		return $inquiryGroups;
	}

	/**
	 * Get visibility groups for an inquiry group
	 */
	public function getVisibilityGroupsForGroup(int $groupId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('group_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter(GroupRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter(GroupRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR)));

		$result = $qb->executeQuery();
		$groupIds = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();

		return array_map('strval', $groupIds);
	}

	public function saveVisibilityGroups(InquiryGroup $inquiryGroup): void
	{
		$this->deleteVisibilityGroupsForGroup($inquiryGroup->getId());

		$groupIds = $inquiryGroup->getVisibilityGroups() ?? [];
		if (empty($groupIds)) {
			return;
		}

		$now = time();
		foreach ($groupIds as $groupId) {
			if (empty($groupId)) {
				continue;
			}

			$qb = $this->db->getQueryBuilder();
			$qb->insert(GroupRelation::TABLE)
				->values([
					'target_type' => $qb->createNamedParameter(GroupRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR),
					'target_id' => $qb->createNamedParameter($inquiryGroup->getId(), IQueryBuilder::PARAM_INT),
					'relation_type' => $qb->createNamedParameter(GroupRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR),
					'group_id' => $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_STR),
					'created_at' => $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT),
				])
				->executeStatement();
		}
	}

	public function deleteVisibilityGroupsForGroup(int $groupId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter(GroupRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter(GroupRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR)));

		return $qb->executeStatement();
	}

	public function loadVisibilityGroupsForMultiple(array $groups): void
	{
		if (empty($groups)) {
			return;
		}

		$groupIds = array_map(fn ($group) => $group->getId(), $groups);

		$qb = $this->db->getQueryBuilder();
		$qb->select('target_id', 'group_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter(GroupRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter(GroupRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('target_id', $qb->createNamedParameter($groupIds, IQueryBuilder::PARAM_INT_ARRAY)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$groupsByTarget = [];
		foreach ($rows as $row) {
			$targetId = (int) $row['target_id'];
			$groupsByTarget[$targetId][] = (string) $row['group_id'];
		}

		foreach ($groups as $group) {
			$group->setVisibilityGroups($groupsByTarget[$group->getId()] ?? []);
		}
	}

	public function getVisibilityUsersForGroup(int $groupId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('user_id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter(UserRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter(UserRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR)));

		$result = $qb->executeQuery();
		$userIds = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();

		return array_map('strval', $userIds);
	}

	public function saveVisibilityUsers(InquiryGroup $inquiryGroup): void
	{
		$this->deleteVisibilityUsersForGroup($inquiryGroup->getId());

		$userIds = $inquiryGroup->getVisibilityUsers() ?? [];
		if (empty($userIds)) {
			return;
		}

		$now = time();
		foreach ($userIds as $userId) {
			if (empty($userId)) {
				continue;
			}

			$qb = $this->db->getQueryBuilder();
			$qb->insert(UserRelation::TABLE)
				->values([
					'target_type' => $qb->createNamedParameter(UserRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR),
					'target_id' => $qb->createNamedParameter($inquiryGroup->getId(), IQueryBuilder::PARAM_INT),
					'relation_type' => $qb->createNamedParameter(UserRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR),
					'user_id' => $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR),
					'created_at' => $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT),
				])
				->executeStatement();
		}
	}

	public function deleteVisibilityUsersForGroup(int $groupId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter(UserRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter(UserRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR)));

		return $qb->executeStatement();
	}

	public function loadVisibilityUsersForMultiple(array $groups): void
	{
		if (empty($groups)) {
			return;
		}

		$groupIds = array_map(fn ($group) => $group->getId(), $groups);

		$qb = $this->db->getQueryBuilder();
		$qb->select('target_id', 'user_id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter(UserRelation::TARGET_INQUIRY_GROUP, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter(UserRelation::RELATION_VISIBILITY, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('target_id', $qb->createNamedParameter($groupIds, IQueryBuilder::PARAM_INT_ARRAY)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$usersByTarget = [];
		foreach ($rows as $row) {
			$targetId = (int) $row['target_id'];
			$usersByTarget[$targetId][] = (string) $row['user_id'];
		}

		foreach ($groups as $group) {
			$group->setVisibilityUsers($usersByTarget[$group->getId()] ?? []);
		}
	}

	/**
	 * Add an inquiry to a group
	 */
	public function addInquiryToGroup(int $inquiryId, int $groupId): void
	{
		$qb = $this->db->getQueryBuilder();
		$qb->insert(InquiryGroup::RELATION_TABLE)
			->setValue('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT))
			->setValue('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT))
			->executeStatement();
	}

	/**
	 * Remove an inquiry from a group
	 */
	public function removeInquiryFromGroup(int $inquiryId, int $groupId): void
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(InquiryGroup::RELATION_TABLE)
			->where(
				$qb->expr()->andX(
					$qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)),
					$qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT))
				)
			)
			->executeStatement();
	}

	/**
	 * Update the ordering of inquiries within a group.
	 *
	 * The relation table may or may not have an "order" column. If it does,
	 * we persist it; otherwise we replace the relations (preserving the
	 * logical order by re-inserting rows).
	 *
	 * @param int[] $inquiryIds ordered list of inquiry IDs
	 */
	public function updateInquiryOrder(int $groupId, array $inquiryIds): void
	{
		$inquiryIds = array_values(array_map('intval', $inquiryIds));

		// If an "order" column exists on the relation table, update it.
		if ($this->hasRelationOrderColumn()) {
			foreach ($inquiryIds as $index => $inquiryId) {
				$qb = $this->db->getQueryBuilder();
				$qb->update(InquiryGroup::RELATION_TABLE)
					->set('order', $qb->createNamedParameter($index, IQueryBuilder::PARAM_INT))
					->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
					->andWhere($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
					->executeStatement();
			}
			return;
		}

		// Fallback: rebuild the relations in the requested order.
		$this->db->beginTransaction();
		try {
			$qb = $this->db->getQueryBuilder();
			$qb->delete(InquiryGroup::RELATION_TABLE)
				->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)))
				->executeStatement();

			foreach ($inquiryIds as $inquiryId) {
				$this->addInquiryToGroup($inquiryId, $groupId);
			}
			$this->db->commit();
		} catch (Exception $e) {
			$this->db->rollBack();
			throw $e;
		}
	}

	private function hasRelationOrderColumn(): bool
	{
		static $hasOrder = null;
		if ($hasOrder !== null) {
			return $hasOrder;
		}
		try {
			$schema = $this->db->createSchema();
			$table = $schema->getTable($this->getTableName());
			$hasOrder = $table->hasColumn('order');
		} catch (\Throwable $e) {
			$hasOrder = false;
		}
		return $hasOrder;
	}

	public function add(InquiryGroup $inquiryGroup): InquiryGroup
	{
		$inquiryGroup->setCreated(time());
		$inquiryGroup->setOwner($this->userSession->getCurrentUserId());
		return $this->insert($inquiryGroup);
	}

	public function tidyInquiryGroups(): void
	{
		$subquery = $this->db->getQueryBuilder();
		$subquery->selectDistinct('group_id')->from(InquiryGroup::RELATION_TABLE);

		$qb = $this->db->getQueryBuilder();
		$qb->delete(InquiryGroup::TABLE)
			->where(
				$qb->expr()->notIn(
					'id',
					$qb->createFunction($subquery->getSQL()),
					IQueryBuilder::PARAM_INT_ARRAY
				)
			)
			->executeStatement();
	}

	/**
	 * @return int[]
	 */
	public function getInquiryIdsForGroup(int $groupId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('inquiry_id')
			->from(InquiryGroup::RELATION_TABLE)
			->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)));

		$result = $qb->executeQuery();
		$inquiryIds = [];
		while ($row = $result->fetch()) {
			$inquiryIds[] = (int) $row['inquiry_id'];
		}
		$result->closeCursor();

		return $inquiryIds;
	}

	public function countInquiriesInGroup(int $groupId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('*', 'count'))
			->from(InquiryGroup::RELATION_TABLE)
			->where($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)));

		$result = $qb->executeQuery();
		$count = (int) $result->fetchOne();
		$result->closeCursor();

		return $count;
	}

	/**
	 * @return InquiryGroup[]
	 */
	public function findByParentId(int $parentId): array
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)))
			->orderBy('created', 'ASC')
			->addOrderBy('title', 'ASC');

		$inquiryGroups = $this->findEntities($qb);
		$this->loadDynamicFieldsForMultiple($inquiryGroups);

		return $inquiryGroups;
	}

	/**
	 * @return InquiryGroup[]
	 */
	public function findByType(string $type): array
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.type', $qb->createNamedParameter($type, IQueryBuilder::PARAM_STR)))
			->orderBy('created', 'ASC')
			->addOrderBy('title', 'ASC');

		$inquiryGroups = $this->findEntities($qb);
		$this->loadDynamicFieldsForMultiple($inquiryGroups);

		return $inquiryGroups;
	}

	/**
	 * @return InquiryGroup[]
	 */
	public function findByStatus(string $status): array
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.group_status', $qb->createNamedParameter($status, IQueryBuilder::PARAM_STR)))
			->orderBy('created', 'ASC')
			->addOrderBy('title', 'ASC');

		$inquiryGroups = $this->findEntities($qb);
		$this->loadDynamicFieldsForMultiple($inquiryGroups);

		return $inquiryGroups;
	}

	/**
	 * Persist dynamic fields for an inquiry group.
	 *
	 * @param array      $fieldsDefinition definitions with 'key', 'type', 'default', ...
	 * @param array|null $miscValues       optional key => value overrides (used e.g. by clone/saveMiscFields)
	 */
	public function saveDynamicFields(
		InquiryGroup $inquiryGroup,
		array $fieldsDefinition,
		?array $miscValues = null,
	): void {
		$inquiryGroupId = $inquiryGroup->getId();
		if (empty($fieldsDefinition)) {
			return;
		}

		$deleteQb = $this->db->getQueryBuilder();
		$deleteQb->delete(InquiryGroupMisc::TABLE)
			->where($deleteQb->expr()->eq('inquiry_group_id', $deleteQb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)))
			->executeStatement();

		foreach ($fieldsDefinition as $fieldDef) {
			if (!isset($fieldDef['key'])) {
				continue;
			}

			$key = (string) $fieldDef['key'];

			if (is_array($miscValues) && array_key_exists($key, $miscValues)) {
				$raw = $miscValues[$key];
			} elseif (array_key_exists('default', $fieldDef)) {
				$raw = $fieldDef['default'];
			} else {
				$raw = null;
			}

			$value = $this->castValueByType($raw, $fieldDef);

			$insertQb = $this->db->getQueryBuilder();
			$insertQb->insert(InquiryGroupMisc::TABLE)
				->values([
					'inquiry_group_id' => $insertQb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT),
					'key' => $insertQb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
					'value' => $insertQb->createNamedParameter((string) $value, IQueryBuilder::PARAM_STR),
				])
				->executeStatement();

			$inquiryGroup->setMiscField($key, $value);
		}
	}

	/**
	 * Update only the specified dynamic fields.
	 */
	public function updateDynamicFields(InquiryGroup $inquiryGroup, array $fieldsToUpdate, array $fieldsDefinition): void
	{
		$inquiryGroupId = $inquiryGroup->getId();
		if (empty($fieldsToUpdate)) {
			return;
		}

		foreach ($fieldsToUpdate as $key => $value) {
			$key = (string) $key;

			$fieldDef = array_values(array_filter($fieldsDefinition, fn ($f) => ($f['key'] ?? null) === $key));
			$fieldDef = $fieldDef[0] ?? ['type' => 'string', 'default' => null];

			$value = $this->castValueByType($value ?? ($fieldDef['default'] ?? null), $fieldDef);

			$selectQb = $this->db->getQueryBuilder();
			$existing = $selectQb->select('id')
				->from(InquiryGroupMisc::TABLE)
				->where($selectQb->expr()->eq('inquiry_group_id', $selectQb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT)))
				->andWhere($selectQb->expr()->eq('key', $selectQb->createNamedParameter($key, IQueryBuilder::PARAM_STR)))
				->executeQuery()
				->fetchOne();

			if ($existing !== false && $existing !== null) {
				$updateQb = $this->db->getQueryBuilder();
				$updateQb->update(InquiryGroupMisc::TABLE)
					->set('value', $updateQb->createNamedParameter((string) $value, IQueryBuilder::PARAM_STR))
					->where($updateQb->expr()->eq('id', $updateQb->createNamedParameter((int) $existing, IQueryBuilder::PARAM_INT)))
					->executeStatement();
			} else {
				$insertQb = $this->db->getQueryBuilder();
				$insertQb->insert(InquiryGroupMisc::TABLE)
					->values([
						'inquiry_group_id' => $insertQb->createNamedParameter($inquiryGroupId, IQueryBuilder::PARAM_INT),
						'key' => $insertQb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
						'value' => $insertQb->createNamedParameter((string) $value, IQueryBuilder::PARAM_STR),
					])
					->executeStatement();
			}

			$inquiryGroup->setMiscField($key, $value);
		}
	}

	private function castValueByType(mixed $value, array $fieldDef): mixed
	{
		$type = $fieldDef['type'] ?? 'string';

		if ($value === null) {
			return null;
		}

		switch ($type) {
			case 'integer':
			case 'int':
			case 'number':
				return (int) $value;

			case 'boolean':
			case 'bool':
			case 'checkbox':
				return (bool) $value;

			case 'float':
			case 'double':
				return (float) $value;

			case 'datetime':
				return is_numeric($value) ? (int) $value : $value;

			case 'json':
			case 'array':
			case 'multiselect':
			case 'users':
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
			case 'text':
			default:
				return (string) $value;
		}
	}

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
				$inquiryGroup->setMiscField((string) $data['key'], $data['value']);
			}
		}
	}

	public function loadDynamicFieldsForMultiple(array $inquiryGroups): void
	{
		if (empty($inquiryGroups)) {
			return;
		}

		$ids = array_map(fn ($group) => $group->getId(), $inquiryGroups);

		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(InquiryGroupMisc::TABLE)
			->where($qb->expr()->in('inquiry_group_id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)));

		$stmt = $qb->executeQuery();
		$allData = $stmt->fetchAll();
		$stmt->closeCursor();

		$groupedData = [];
		foreach ($allData as $data) {
			$groupId = (int) $data['inquiry_group_id'];
			$groupedData[$groupId][] = $data;
		}

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

	protected function buildQuery(): IQueryBuilder
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select(self::TABLE . '.*')
			->from($this->getTableName(), self::TABLE);

		return $qb;
	}

	public function loadInquiryIds(InquiryGroup $inquiryGroup): void
	{
		$inquiryGroup->setInquiryIds($this->getInquiryIdsForGroup($inquiryGroup->getId()));
	}

	public function loadInquiryIdsForMultiple(array $inquiryGroups): void
	{
		if (empty($inquiryGroups)) {
			return;
		}

		$ids = array_map(fn ($group) => $group->getId(), $inquiryGroups);

		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(InquiryGroup::RELATION_TABLE)
			->where($qb->expr()->in('group_id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)));

		$stmt = $qb->executeQuery();
		$allData = $stmt->fetchAll();
		$stmt->closeCursor();

		$groupedData = [];
		foreach ($allData as $data) {
			$groupId = (int) $data['group_id'];
			$groupedData[$groupId][] = (int) $data['inquiry_id'];
		}

		foreach ($inquiryGroups as $inquiryGroup) {
			$groupId = $inquiryGroup->getId();
			$inquiryGroup->setInquiryIds($groupedData[$groupId] ?? []);
		}
	}
}
