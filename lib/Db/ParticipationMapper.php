<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;
use OCP\IGroupManager; 
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http;             
use OCA\Agora\Exceptions\Exception; 
use OCA\Agora\Db\LotteryRunMapper;
use OCA\Agora\Db\LotterySelectionMapper;

/**
 * @template-extends QBMapper<Participation>
 */
class ParticipationMapper extends QBMapper
{
	public const TABLE = Participation::TABLE;

	public function __construct(
		IDBConnection $db,
		private GroupRelationMapper $groupRelationMapper,
		private UserRelationMapper $userRelationMapper,
		private IGroupManager $groupManager,
	        private LotteryRunMapper $lotteryRunMapper, 
        	private LotterySelectionMapper $lotterySelectionMapper,

	) {
		parent::__construct($db, self::TABLE, Participation::class);
	}

/**
 * Find participation by ID
 */
public function find(int $id): ?Participation
{
    $qb = $this->db->getQueryBuilder();
    $qb->select('*')
        ->from($this->getTableName())
        ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

    try {
        return $this->findEntity($qb);
    } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
        return null;
    }
}

	/**
	 * Find participation policy by target
	 */
	public function findByTarget(string $targetType, int $targetId): ?Participation
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
     ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
     ->setMaxResults(1);

		try {
			return $this->findEntity($qb);
		} catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
			return null;
		}
	}

	/**
	 * Find all participation policies for a target type
	 * 
	 * @return Participation[]
	 */
	public function findByTargetType(string $targetType): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
     ->orderBy('created_at', 'DESC');

		return $this->findEntities($qb);
	}

	/**
	 * Find policies by policy type
	 * 
	 * @return Participation[]
	 */
	public function findByPolicyType(string $policyType): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('policy_type', $qb->createNamedParameter($policyType, IQueryBuilder::PARAM_STR)))
     ->orderBy('created_at', 'DESC');

		return $this->findEntities($qb);
	}

	/**
	 * Find policies by target type and policy type
	 * 
	 * @return Participation[]
	 */
	public function findByTargetAndPolicy(string $targetType, string $policyType): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
     ->andWhere($qb->expr()->eq('policy_type', $qb->createNamedParameter($policyType, IQueryBuilder::PARAM_STR)))
     ->orderBy('created_at', 'DESC');

		return $this->findEntities($qb);
	}

	/**
	 * Count policies by target type
	 */
	public function countByTargetType(string $targetType): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('*', 'count'))
     ->from($this->getTableName())
     ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)));

		$result = $qb->executeQuery()->fetch();
		return (int) ($result['count'] ?? 0);
	}

	/**
	 * Delete all policies for a target
	 */
	public function deleteByTarget(string $targetType, int $targetId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
     ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType, IQueryBuilder::PARAM_STR)))
     ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));

		return $qb->executeStatement();
	}

	// ====================================================================
	// PARTICIPATION RELATIONS
	// ====================================================================


	/**
	 * Find participation policy by target with relations loaded
	 public function findByTargetWithRelations(string $targetType, int $targetId): ?Participation
	 {
		 $participation = $this->findByTarget($targetType, $targetId);

		 if ($participation !== null) {
			 // Ensure policyConfig is an array
			 if ($participation->getPolicyConfig() === null) {
				 $participation->setPolicyConfig([]);
}

// Load user IDs if policy type is USERS
if ($participation->usesUsers()) {
	$userIds = $this->getUserIdsForParticipation($targetId, $targetType);
	$config = $participation->getPolicyConfig() ?? [];
	$config['user_ids'] = $userIds;
	$participation->setPolicyConfig($config);
}

// Load group IDs if policy type is GROUPS
if ($participation->usesGroups()) {
	$groupIds = $this->getGroupIdsForParticipation($targetId, $targetType);
	$config = $participation->getPolicyConfig() ?? [];
	$config['group_ids'] = $groupIds;
	$participation->setPolicyConfig($config);
}
}

return $participation;
}
	 */
	public function findByTargetWithRelations(string $targetType, int $targetId): ?Participation
	{
		$participation = $this->findByTarget($targetType, $targetId);

		if ($participation !== null) {
			// Ensure policyConfig is an array
			if ($participation->getPolicyConfig() === null) {
				$participation->setPolicyConfig([]);
			}

			// Load user IDs if policy type is USERS
			if ($participation->usesUsers()) {
				$userIds = $this->getUserIdsForParticipation($targetId, $targetType);
				$config = $participation->getPolicyConfig() ?? [];
				$config['user_ids'] = $userIds;
				$participation->setPolicyConfig($config);
			}

			// Load group IDs if policy type is GROUPS
			if ($participation->usesGroups()) {
				$groupIds = $this->getGroupIdsForParticipation($targetId, $targetType);
				$config = $participation->getPolicyConfig() ?? [];
				$config['group_ids'] = $groupIds;
				$participation->setPolicyConfig($config);
			}

			if ($participation->isLottery()) {
				$config = $participation->getPolicyConfig() ?? [];

				// Get the latest lottery run with selections
				$latestRun = $this->lotteryRunMapper->findLatestByParticipationId($participation->getId());
				if ($latestRun !== null) {
					$selections = $this->lotterySelectionMapper->findByRunId($latestRun->getId());
					$config['lottery'] = [
						'status' => $latestRun->getStatus(),
						'is_validated' => $latestRun->isValidated(),
						'run' => $latestRun->jsonSerialize(),
						'selections' => array_map(fn($s) => $s->jsonSerialize(), $selections),
						'pool_size' => $latestRun->getPoolSize(),
						'selection_count' => $latestRun->getSelectionCount(),
					];
				} else {
					$config['lottery'] = [
						'status' => 'not_run',
						'is_validated' => false,
					];
				}

				$participation->setPolicyConfig($config);
			}
		}

		return $participation;
	}

	/**
	 * Get user IDs for a participation policy
	 * 
	 * @return string[] List of user IDs
	 */
	public function getUserIdsForParticipation(int $targetId, string $targetType): array
	{
		return $this->userRelationMapper->getUserIdsForTarget(
			$targetType,
			$targetId,
			UserRelation::RELATION_PARTICIPATION
		);
	}

	/**
	 * Get group IDs for a participation policy
	 * 
	 * @return string[] List of group IDs
	 */
	public function getGroupIdsForParticipation(int $targetId, string $targetType): array
	{
		return $this->groupRelationMapper->getGroupIdsForTarget(
			$targetType,
			$targetId,
			GroupRelation::RELATION_PARTICIPATION
		);
	}

	/**
	 * Set users for a participation policy
	 */
	public function setUsersForParticipation(int $targetId, string $targetType, array $userIds): int
	{
		return $this->userRelationMapper->setUsersForTarget(
			$targetType,
			$targetId,
			UserRelation::RELATION_PARTICIPATION,
			$userIds
		);
	}

	/**
	 * Set groups for a participation policy
	 */
	public function setGroupsForParticipation(int $targetId, string $targetType, array $groupIds): int
	{
		return $this->groupRelationMapper->setGroupsForTarget(
			$targetType,
			$targetId,
			GroupRelation::RELATION_PARTICIPATION,
			$groupIds
		);
	}


	private function getUserGroups(string $userId): array
	{
		try {
			$user = $this->groupManager->get($userId);
			if ($user !== null) {
				return $this->groupManager->getUserGroupIds($user);
			}
		} catch (\Exception $e) {
			// Log error
		}
		return [];
	}

	private function getUsersFromGroups(array $groupIds): array
	{
		$users = [];
		foreach ($groupIds as $groupId) {
			$group = $this->groupManager->get($groupId);
			if ($group !== null) {
				$userIds = $group->getUsers();
				$users = array_merge($users, $userIds);
			}
		}
		return array_values(array_unique($users));
	}
}
