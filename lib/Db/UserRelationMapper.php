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
 * @template-extends QBMapper<UserRelation>
 */
class UserRelationMapper extends QBMapper
{
	public const TABLE = UserRelation::TABLE;

	public function __construct(
		IDBConnection $db,
	) {
		parent::__construct($db, UserRelation::TABLE, UserRelation::class);
	}

	/**
	 * Get all user IDs for a specific target with a specific relation type
	 * 
	 * @return string[] List of user IDs
	 */
	public function getUserIdsForTarget(string $targetType, int $targetId, string $relationType): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('user_id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)));

		$result = $qb->executeQuery();
		$userIds = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();

		return array_map('strval', $userIds);
	}

	/**
	 * Get users grouped by target ID for multiple targets
	 * 
	 * @param string $targetType Target type
	 * @param int[] $targetIds List of target IDs
	 * @param string $relationType Relation type
	 * @return array<int, string[]> Array mapping target_id => list of user_ids
	 */
	public function getUsersByTargets(string $targetType, array $targetIds, string $relationType): array
	{
		if (empty($targetIds)) {
			return [];
		}

		$qb = $this->db->getQueryBuilder();
		$qb->select('target_id', 'user_id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('target_id', $qb->createNamedParameter($targetIds, IQueryBuilder::PARAM_INT_ARRAY)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$usersByTarget = [];
		foreach ($rows as $row) {
			$targetId = (int)$row['target_id'];
			if (!isset($usersByTarget[$targetId])) {
				$usersByTarget[$targetId] = [];
			}
			$usersByTarget[$targetId][] = (string)$row['user_id'];
		}

		return $usersByTarget;
	}

	/**
	 * Get target IDs grouped by their associated user IDs
	 * 
	 * @param string $targetType Target type
	 * @param string $relationType Relation type
	 * @param int[] $targetIds List of target IDs
	 * @return array<int, string[]> Array mapping target_id => list of user_ids
	 */
	public function getUserIdsByTargets(
		string $targetType,
		string $relationType,
		array $targetIds
	): array {
		if (empty($targetIds)) {
			return [];
		}

		$qb = $this->db->getQueryBuilder();
		$qb->select('target_id', 'user_id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('target_id', $qb->createNamedParameter($targetIds, IQueryBuilder::PARAM_INT_ARRAY)));

		$result = $qb->executeQuery();
		$rows = $result->fetchAll();
		$result->closeCursor();

		$userIdsByTarget = [];
		foreach ($rows as $row) {
			$targetId = (int)$row['target_id'];
			if (!isset($userIdsByTarget[$targetId])) {
				$userIdsByTarget[$targetId] = [];
			}
			$userIdsByTarget[$targetId][] = (string)$row['user_id'];
		}

		// Ensure all target IDs are present in the result, even those without users
		foreach ($targetIds as $targetId) {
			if (!isset($userIdsByTarget[$targetId])) {
				$userIdsByTarget[$targetId] = [];
			}
		}

		return $userIdsByTarget;
	}

	/**
	 * Set users for a target (replaces all existing)
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string[] $userIds List of user IDs
	 * @param array|null $metadata Optional metadata to store
	 * @return int Number of inserted relations
	 */
	public function setUsersForTarget(string $targetType, int $targetId, string $relationType, array $userIds, ?array $metadata = null): int
	{
		$this->deleteUsersForTarget($targetType, $targetId, $relationType);

		if (empty($userIds)) {
			return 0;
		}

		$inserted = 0;
		$now = time();

		foreach ($userIds as $userId) {
			if (empty($userId)) {
				continue;
			}

			$qb = $this->db->getQueryBuilder();
			$qb->insert(UserRelation::TABLE)
				->values([
					'target_type' => $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR),
					'target_id' => $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT),
					'relation_type' => $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR),
					'user_id' => $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR),
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
	 * Delete all users for a target with a specific relation type
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @return int Number of deleted rows
	 */
	public function deleteUsersForTarget(string $targetType, int $targetId, string $relationType): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)));

		return $qb->executeStatement();
	}

	/**
	 * Check if a target has a specific user for a relation
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string $userId User ID to check
	 * @return bool True if the relation exists
	 */
	public function hasUserForTarget(string $targetType, int $targetId, string $relationType, string $userId): bool
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)))
			->setMaxResults(1);

		$result = $qb->executeQuery();
		$exists = $result->fetchOne() !== false;
		$result->closeCursor();

		return $exists;
	}

	/**
	 * Get target IDs that have a relation with any of the given users
	 * 
	 * @param string $targetType Target type
	 * @param string $relationType Relation type
	 * @param string[] $userIds List of user IDs
	 * @return int[] List of target IDs
	 */
	public function getTargetIdsForUsers(
		string $targetType,
		string $relationType,
		array $userIds
	): array {
		if (empty($userIds)) {
			return [];
		}

		$qb = $this->db->getQueryBuilder();
		$qb->selectDistinct('target_id')
			->from(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->in('user_id', $qb->createNamedParameter($userIds, IQueryBuilder::PARAM_STR_ARRAY)));

		$result = $qb->executeQuery();
		$ids = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();

		return array_map('intval', $ids);
	}

	/**
	 * Add a single user relation
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string $userId User ID
	 * @param array|null $metadata Optional metadata
	 * @return bool True if inserted, false if already exists or invalid
	 */
	public function addUserRelation(string $targetType, int $targetId, string $relationType, string $userId, ?array $metadata = null): bool
	{
		if (empty($userId) || $this->hasUserForTarget($targetType, $targetId, $relationType, $userId)) {
			return false;
		}

		$qb = $this->db->getQueryBuilder();
		$qb->insert(UserRelation::TABLE)
			->values([
				'target_type' => $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR),
				'target_id' => $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT),
				'relation_type' => $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR),
				'user_id' => $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR),
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
	 * Remove a user relation
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @param string $relationType Relation type
	 * @param string $userId User ID
	 * @return int Number of deleted rows (0 or 1)
	 */
	public function removeUserRelation(string $targetType, int $targetId, string $relationType, string $userId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete(UserRelation::TABLE)
			->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('relation_type', $qb->createNamedParameter($relationType, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

		return $qb->executeStatement();
	}

	/**
	 * Get all relations for a specific target
	 * 
	 * @param string $targetType Target type
	 * @param int $targetId Target ID
	 * @return array<string, string[]> Array mapping relation_type => list of user_ids
	 */
	public function getRelationsForTarget(string $targetType, int $targetId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('relation_type', 'user_id')
			->from(UserRelation::TABLE)
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
			$relations[$relationType][] = (string)$row['user_id'];
		}

		return $relations;
	}
}
