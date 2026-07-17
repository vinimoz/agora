<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<GroupRelation>
 */
class GroupRelationMapper extends QBMapper
{
	public const TABLE = GroupRelation::TABLE;

	public function __construct(
		IDBConnection $db,
	) {
		parent::__construct($db, GroupRelation::TABLE, GroupRelation::class);
	}

	/**
	 * Get all group IDs for a specific target with a specific relation type
	 * 
	 * @return string[] List of group IDs
	 */
	public function getGroupIdsForTarget(string $targetType, int $targetId, string $relationType): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('group_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)));

		$result = $qb->executeQuery();
		$groupIds = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();

		return array_map('strval', $groupIds);
	}

	/**
	 * Get groups grouped by target ID for multiple targets
	 * 
	 * @param string $targetType Target type
	 * @param int[] $targetIds List of target IDs
	 * @param string $relationType Relation type
	 * @return array<int, string[]> Array mapping target_id => list of group_ids
	 */
	public function getGroupsByTargets(string $targetType, array $targetIds, string $relationType): array
	{
		if (empty($targetIds)) {
			return [];
		}

		$qb = $this->db->getQueryBuilder();
		$qb->select('target_id', 'group_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('target_id', $qb->createNamedParameter($targetIds, IQueryBuilder::PARAM_INT_ARRAY)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$groupsByTarget = [];
		foreach ($rows as $row) {
			$targetId = (int)$row['target_id'];
			if (!isset($groupsByTarget[$targetId])) {
				$groupsByTarget[$targetId] = [];
			}
			$groupsByTarget[$targetId][] = (string)$row['group_id'];
		}

		return $groupsByTarget;
	}

	/**
	 * Get target IDs grouped by their associated group IDs
	 * Useful for bulk operations where you need to know which targets have which groups
	 * 
	 * @param string $targetType Target type
	 * @param string $relationType Relation type
	 * @param int[] $targetIds List of target IDs
	 * @return array<int, string[]> Array mapping target_id => list of group_ids
	 */
	public function getGroupIdsByTargets(
		string $targetType,
		string $relationType,
		array $targetIds
	): array {
		if (empty($targetIds)) {
			return [];
		}

		$qb = $this->db->getQueryBuilder();
		$qb->select('target_id', 'group_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('target_id', $qb->createNamedParameter($targetIds, IQueryBuilder::PARAM_INT_ARRAY)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$groupIdsByTarget = [];
		foreach ($rows as $row) {
			$targetId = (int)$row['target_id'];
			if (!isset($groupIdsByTarget[$targetId])) {
				$groupIdsByTarget[$targetId] = [];
			}
			$groupIdsByTarget[$targetId][] = (string)$row['group_id'];
		}

		// Ensure all target IDs are present in the result, even those without groups
		foreach ($targetIds as $targetId) {
			if (!isset($groupIdsByTarget[$targetId])) {
				$groupIdsByTarget[$targetId] = [];
			}
		}

		return $groupIdsByTarget;
	}

	/**
	 * Set groups for a target (replaces all existing)
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string[] $groupIds List of group IDs
	 * @param array|null $metadata Optional metadata to store
	 * @return int Number of inserted relations
	 */
	public function setGroupsForTarget(string $targetType, int $targetId, string $relationType, array $groupIds, ?array $metadata = null): int
	{
		$this->deleteGroupsForTarget($targetType, $targetId, $relationType);

		if (empty($groupIds)) {
			return 0;
		}

		$inserted = 0;
		$now = time();

		foreach ($groupIds as $groupId) {
			if (empty($groupId)) {
				continue;
			}

			$qb = $this->db->getQueryBuilder();
			$qb->insert(GroupRelation::TABLE)
				->values([
					'target_type' => $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR),
					'target_id' => $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT),
					'relation_type' => $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR),
					'group_id' => $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_STR),
					'created_at' => $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT),
					'metadata' => $qb->createNamedParameter(
						$metadata !== null ? json_encode($metadata, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE) : null,
						IQueryBuilder::PARAM_STR
					),
				])
				->executeStatement();

			$inserted++;
		}

		return $inserted;
	}

	/**
	 * Delete all groups for a target with a specific relation type
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @return int Number of deleted rows
	 */
	public function deleteGroupsForTarget(string $targetType, int $targetId, string $relationType): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)));

		return $qb->executeStatement();
	}

	/**
	 * Check if a target has a specific group for a relation
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string $groupId Group ID to check
	 * @return bool True if the relation exists
	 */
	public function hasGroupForTarget(string $targetType, int $targetId, string $relationType, string $groupId): bool
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_STR)))
			->setMaxResults(1);

		$result = $qb->executeQuery();
		$exists = $result->fetchOne() !== false;
		$result->closeCursor();

		return $exists;
	}

	/**
	 * Get target IDs that have a relation with any of the given groups
	 * 
	 * @param string $targetType Target type
	 * @param string $relationType Relation type
	 * @param string[] $groupIds List of group IDs
	 * @return int[] List of target IDs
	 */
	public function getTargetIdsForGroups(
		string $targetType,
		string $relationType,
		array $groupIds
	): array {
		if (empty($groupIds)) {
			return [];
		}

		$qb = $this->db->getQueryBuilder();
		$qb->selectDistinct('target_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('group_id', $qb->createNamedParameter($groupIds, IQueryBuilder::PARAM_STR_ARRAY)));

		$result = $qb->executeQuery();
		$ids = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();

		return array_map('intval', $ids);
	}

	/**
	 * Add a single group relation
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string $groupId Group ID
	 * @param array|null $metadata Optional metadata
	 * @return bool True if inserted, false if already exists or invalid
	 */
	public function addGroupRelation(string $targetType, int $targetId, string $relationType, string $groupId, ?array $metadata = null): bool
	{
		if (empty($groupId) || $this->hasGroupForTarget($targetType, $targetId, $relationType, $groupId)) {
			return false;
		}

		$qb = $this->db->getQueryBuilder();
		$qb->insert(GroupRelation::TABLE)
			->values([
				'target_type' => $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR),
				'target_id' => $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT),
				'relation_type' => $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR),
				'group_id' => $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_STR),
				'created_at' => $qb->createNamedParameter(time(), IQueryBuilder::PARAM_INT),
				'metadata' => $qb->createNamedParameter(
					$metadata !== null ? json_encode($metadata, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE) : null,
					IQueryBuilder::PARAM_STR
				),
			])
			->executeStatement();

		return true;
	}

	/**
	 * Remove a group relation
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string $groupId Group ID
	 * @return int Number of deleted rows (0 or 1)
	 */
	public function removeGroupRelation(string $targetType, int $targetId, string $relationType, string $groupId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('group_id', $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_STR)));

		return $qb->executeStatement();
	}

	/**
	 * Get all relations for a specific target
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @return array<string, string[]> Array mapping relation_type => list of group_ids
	 */
	public function getRelationsForTarget(string $targetType, int $targetId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('relation_type', 'group_id')
			->from(GroupRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$relations = [];
		foreach ($rows as $row) {
			$relationType = (string)$row['relation_type'];
			if (!isset($relations[$relationType])) {
				$relations[$relationType] = [];
			}
			$relations[$relationType][] = (string)$row['group_id'];
		}

		return $relations;
	}
}
