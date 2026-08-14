<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCA\Agora\Helper\SqlHelper;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Search\ISearchQuery;
use OCA\Agora\Db\GroupRelation;  
use OCA\Agora\Db\GroupRelationMapper;
use OCA\Agora\Db\UserRelation;  
use OCA\Agora\Db\UserRelationMapper;
use OCA\Agora\Db\Support;        
use OCA\Agora\Db\SupportResult;        
use OCA\Agora\Db\SupportEngine;        
use OCA\Agora\Db\Participation;
use OCP\IGroupManager; 
use Psr\Log\LoggerInterface;

/**
 * @template-extends QBMapper<Inquiry>
 */
class InquiryMapper extends QBMapper
{
	public const TABLE = Inquiry::TABLE;
	public const SUPPORT_RESULT_TABLE = SupportResult::TABLE;
	public const SUPPORT_ENGINE_TABLE = SupportEngine::TABLE;
	public const PARTICIPATION_TABLE = Participation::TABLE;
	public const CONCAT_SEPARATOR = ',';

	public function __construct(
		IDBConnection $db,
		private UserSession $userSession,
		private IGroupManager $groupManager, 
		private GroupRelationMapper $groupRelationMapper,
		private UserRelationMapper $userRelationMapper,
		private LoggerInterface $logger,
	) {
		parent::__construct($db, Inquiry::TABLE, Inquiry::class);
	}


	/**
	 * Get a single inquiry by ID with optional roles and visibility groups
	 */
	public function get(int $id, bool $getDeleted = false, bool $withRoles = false): Inquiry
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select([
			self::TABLE . '.id',
			self::TABLE . '.cover_id',
			self::TABLE . '.type',
			self::TABLE . '.title',
			self::TABLE . '.description',
			self::TABLE . '.location_id',
			self::TABLE . '.category_id',
			self::TABLE . '.owner',
			self::TABLE . '.created',
			self::TABLE . '.archived',
			self::TABLE . '.expire',
			self::TABLE . '.deleted',
			self::TABLE . '.owned_group',
			self::TABLE . '.publication_status',
			self::TABLE . '.show_results',
			self::TABLE . '.last_interaction',
			self::TABLE . '.parent_id',
			self::TABLE . '.moderation_status',
			self::TABLE . '.inquiry_status',
			self::TABLE . '.allow_comment',
			self::TABLE . '.support_feature',
			self::TABLE . '.family',
			self::TABLE . '.visibility',
		])
     ->from($this->getTableName(), self::TABLE)
     ->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

		if (!$getDeleted) {
			$qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
		}

		if ($withRoles) {
			$inquiryGroupsAlias = 'inquiry_groups';
			$currentUserId = $this->userSession->getCurrentUserId();

			$this->joinFamily($qb, self::TABLE);
			$this->joinUserRole($qb, self::TABLE, $currentUserId);
			$this->joinGroupShares($qb, self::TABLE);
			$this->joinHasSupported($qb, self::TABLE, $currentUserId);
			$this->joinInquiryGroups($qb, self::TABLE, $inquiryGroupsAlias);
			$this->joinInquiryGroupShares($qb, $inquiryGroupsAlias, $currentUserId, $inquiryGroupsAlias);
			$this->joinSupportValue($qb, self::TABLE, $currentUserId);
			$this->joinParticipantsCount($qb, self::TABLE);
			$this->joinCommentsCount($qb, self::TABLE);
			$this->joinSupportsCount($qb, self::TABLE);
			$this->joinMiscs($qb, self::TABLE);
			$this->joinSupportResult($qb, self::TABLE);
			$this->joinSupportEngine($qb, self::TABLE);

			$qb->groupBy(self::TABLE . '.id');
			$qb->addGroupBy(self::TABLE . '.cover_id');
			$qb->addGroupBy(self::TABLE . '.type');
			$qb->addGroupBy(self::TABLE . '.title');
			$qb->addGroupBy(self::TABLE . '.description');
			$qb->addGroupBy(self::TABLE . '.location_id');
			$qb->addGroupBy(self::TABLE . '.category_id');
			$qb->addGroupBy(self::TABLE . '.owner');
			$qb->addGroupBy(self::TABLE . '.created');
			$qb->addGroupBy(self::TABLE . '.archived');
			$qb->addGroupBy(self::TABLE . '.expire');
			$qb->addGroupBy(self::TABLE . '.deleted');
			$qb->addGroupBy(self::TABLE . '.owned_group');
			$qb->addGroupBy(self::TABLE . '.publication_status');
			$qb->addGroupBy(self::TABLE . '.show_results');
			$qb->addGroupBy(self::TABLE . '.last_interaction');
			$qb->addGroupBy(self::TABLE . '.parent_id');
			$qb->addGroupBy(self::TABLE . '.moderation_status');
			$qb->addGroupBy(self::TABLE . '.inquiry_status');
			$qb->addGroupBy(self::TABLE . '.allow_comment');
			$qb->addGroupBy(self::TABLE . '.support_feature');
			$qb->addGroupBy(self::TABLE . '.family');
			$qb->addGroupBy(self::TABLE . '.visibility');
		}

		// $this->logger->error($qb->getSQL());
		$inquiry = $this->findEntity($qb);

		$inquiry->setVisibilityGroups(
			$this->getVisibilityGroupsForInquiry($id)
		);

		return $inquiry;
	}

	/**
	 * Build the complete query for inquiries with all joins and selections
	 */
	protected function buildQuery(): IQueryBuilder
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select([
			self::TABLE . '.id',
			self::TABLE . '.cover_id',
			self::TABLE . '.type',
			self::TABLE . '.title',
			self::TABLE . '.description',
			self::TABLE . '.location_id',
			self::TABLE . '.category_id',
			self::TABLE . '.owner',
			self::TABLE . '.created',
			self::TABLE . '.archived',
			self::TABLE . '.expire',
			self::TABLE . '.deleted',
			self::TABLE . '.owned_group',
			self::TABLE . '.publication_status',
			self::TABLE . '.show_results',
			self::TABLE . '.last_interaction',
			self::TABLE . '.parent_id',
			self::TABLE . '.moderation_status',
			self::TABLE . '.inquiry_status',
			self::TABLE . '.allow_comment',
			self::TABLE . '.support_feature',
			self::TABLE . '.family',
			self::TABLE . '.visibility',
		])
     ->from($this->getTableName(), self::TABLE);

		$currentUserId = $this->userSession->getCurrentUserId();
		$this->applyVisibilityFilter($qb, $currentUserId);

		$inquiryGroupsAlias = 'inquiry_groups';
		$this->joinFamily($qb, self::TABLE);
		$this->joinUserRole($qb, self::TABLE, $currentUserId);
		$this->joinGroupShares($qb, self::TABLE);
		$this->joinHasSupported($qb, self::TABLE, $currentUserId);
		$this->joinSupportValue($qb, self::TABLE, $currentUserId);
		$this->joinInquiryGroups($qb, self::TABLE, $inquiryGroupsAlias);
		$this->joinInquiryGroupShares($qb, $inquiryGroupsAlias, $currentUserId, $inquiryGroupsAlias);
		$this->joinParticipantsCount($qb, self::TABLE);
		$this->joinCommentsCount($qb, self::TABLE);
		$this->joinSupportsCount($qb, self::TABLE);
		$this->joinMiscs($qb, self::TABLE);
		$this->joinSupportResult($qb, self::TABLE);
		$this->joinSupportEngine($qb, self::TABLE);

		$qb->groupBy(self::TABLE . '.id');
		$qb->addGroupBy(self::TABLE . '.cover_id');
		$qb->addGroupBy(self::TABLE . '.type');
		$qb->addGroupBy(self::TABLE . '.title');
		$qb->addGroupBy(self::TABLE . '.description');
		$qb->addGroupBy(self::TABLE . '.location_id');
		$qb->addGroupBy(self::TABLE . '.category_id');
		$qb->addGroupBy(self::TABLE . '.owner');
		$qb->addGroupBy(self::TABLE . '.created');
		$qb->addGroupBy(self::TABLE . '.archived');
		$qb->addGroupBy(self::TABLE . '.expire');
		$qb->addGroupBy(self::TABLE . '.deleted');
		$qb->addGroupBy(self::TABLE . '.owned_group');
		$qb->addGroupBy(self::TABLE . '.publication_status');
		$qb->addGroupBy(self::TABLE . '.show_results');
		$qb->addGroupBy(self::TABLE . '.last_interaction');
		$qb->addGroupBy(self::TABLE . '.parent_id');
		$qb->addGroupBy(self::TABLE . '.moderation_status');
		$qb->addGroupBy(self::TABLE . '.inquiry_status');
		$qb->addGroupBy(self::TABLE . '.allow_comment');
		$qb->addGroupBy(self::TABLE . '.support_feature');
		$qb->addGroupBy(self::TABLE . '.family');
		$qb->addGroupBy(self::TABLE . '.visibility');
		return $qb;
	}


	/**
	 * Get user IDs for an inquiry visibility
	 */
	public function getUserIdsForVisibility(int $inquiryId): array
	{
		return $this->userRelationMapper->getUserIdsForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_VISIBILITY
		);
	}

	/**
	 * Save user visibility for an inquiry
	 */
	public function saveUserVisibility(Inquiry $inquiry): void
	{
		$this->userRelationMapper->setUsersForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiry->getId(),
			UserRelation::RELATION_VISIBILITY,
			$inquiry->getVisibilityUsers() ?? []
		);
	}

	/**
	 * Check if user has visibility access to an inquiry
	 */
	public function hasUserVisibility(int $inquiryId, string $userId): bool
	{
		return $this->userRelationMapper->hasUserForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_VISIBILITY,
			$userId
		);
	}

	/**
	 * Get user IDs for participation on an inquiry
	 */
	public function getUserIdsForParticipation(int $inquiryId): array
	{
		return $this->userRelationMapper->getUserIdsForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_PARTICIPATION
		);
	}

	/**
	 * Apply visibility filter using GroupRelationMapper and UserRelationMapper
	protected function applyVisibilityFilter(
		IQueryBuilder &$qb,
		?string $currentUserId
	): void {
		if ($currentUserId === null) {
			$qb->andWhere(
				$qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE))
			);
			return;
		}

		$userGroupIds = $this->getUserGroupIds($currentUserId);

		$orConditions = [];

		// 1. Everyone
		$orConditions[] = $qb->expr()->eq(
			self::TABLE . '.visibility', 
			$qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE)
		);

		// 2. Private (owner only)
		$orConditions[] = $qb->expr()->andX(
			$qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_PRIVATE)),
			$qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($currentUserId))
		);

		// 3. Groups - use GroupRelationMapper
		if (!empty($userGroupIds)) {
			$visibleInquiryIds = $this->groupRelationMapper->getTargetIdsForGroups(
				GroupRelation::TARGET_INQUIRY,
				GroupRelation::RELATION_VISIBILITY,
				$userGroupIds
			);

			if (!empty($visibleInquiryIds)) {
				$orConditions[] = $qb->expr()->andX(
					$qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_GROUPS)),
					$qb->expr()->in(
						self::TABLE . '.id',
						$qb->createNamedParameter($visibleInquiryIds, IQueryBuilder::PARAM_INT_ARRAY)
					)
				);
			}
		}

		// 4. Users - use UserRelationMapper
		$userVisibleInquiryIds = $this->userRelationMapper->getTargetIdsForUsers(
			UserRelation::TARGET_INQUIRY,
			UserRelation::RELATION_VISIBILITY,
			[$currentUserId]
		);

		if (!empty($userVisibleInquiryIds)) {
			$orConditions[] = $qb->expr()->andX(
				$qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_USERS)),
				$qb->expr()->in(
					self::TABLE . '.id',
					$qb->createNamedParameter($userVisibleInquiryIds, IQueryBuilder::PARAM_INT_ARRAY)
				)
			);
		}

		// 5. Participants - Use the existing left join to Support table
		$orConditions[] = $qb->expr()->andX(
			$qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_PARTICIPANTS)),
			$qb->expr()->isNotNull('current_user_support.user_id')
		);

		// Apply all conditions
		$qb->andWhere($qb->expr()->orX(...$orConditions));
	}
	 */
	protected function applyVisibilityFilter(
    IQueryBuilder &$qb,
    ?string $currentUserId
): void {
    if ($currentUserId === null) {
        // Non-logged-in users can only see public inquiries
        $qb->andWhere(
            $qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE))
        );
        return;
    }

    $userGroupIds = $this->getUserGroupIds($currentUserId);

    $orConditions = [];

    // ✅ 1. OWNER OVERRIDE - Owner can always see their own inquiry
    $orConditions[] = $qb->expr()->eq(
        self::TABLE . '.owner',
        $qb->createNamedParameter($currentUserId)
    );

    // 2. Everyone
    $orConditions[] = $qb->expr()->eq(
        self::TABLE . '.visibility',
        $qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE)
    );

    // 3. Private (owner only - already covered by owner override, but keep for clarity)
    $orConditions[] = $qb->expr()->andX(
        $qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_PRIVATE)),
        $qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($currentUserId))
    );

    // 4. Groups
    if (!empty($userGroupIds)) {
        $visibleInquiryIds = $this->groupRelationMapper->getTargetIdsForGroups(
            GroupRelation::TARGET_INQUIRY,
            GroupRelation::RELATION_VISIBILITY,
            $userGroupIds
        );

        if (!empty($visibleInquiryIds)) {
            $orConditions[] = $qb->expr()->andX(
                $qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_GROUPS)),
                $qb->expr()->in(
                    self::TABLE . '.id',
                    $qb->createNamedParameter($visibleInquiryIds, IQueryBuilder::PARAM_INT_ARRAY)
                )
            );
        }
    }

    // 5. Users
    $userVisibleInquiryIds = $this->userRelationMapper->getTargetIdsForUsers(
        UserRelation::TARGET_INQUIRY,
        UserRelation::RELATION_VISIBILITY,
        [$currentUserId]
    );

    if (!empty($userVisibleInquiryIds)) {
        $orConditions[] = $qb->expr()->andX(
            $qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_USERS)),
            $qb->expr()->in(
                self::TABLE . '.id',
                $qb->createNamedParameter($userVisibleInquiryIds, IQueryBuilder::PARAM_INT_ARRAY)
            )
        );
    }

    // 6. Participants
    $orConditions[] = $qb->expr()->andX(
        $qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_PARTICIPANTS)),
        $qb->expr()->isNotNull('current_user_support.user_id')
    );

    // Apply all conditions
    $qb->andWhere($qb->expr()->orX(...$orConditions));
}

	/**
	 * Apply participation filter using ParticipationMapper, GroupRelationMapper, and UserRelationMapper
	 */
	protected function applyParticipationFilter(
		IQueryBuilder &$qb,
		?string $currentUserId
	): void {
		if ($currentUserId === null) {
			$qb->andWhere(
				$qb->expr()->orX(
					$qb->expr()->isNull('participation.id'),
					$qb->expr()->eq('participation.policy_type', $qb->createNamedParameter(Participation::POLICY_EVERYONE))
				)
			);
			return;
		}

		$userGroupIds = $this->getUserGroupIds($currentUserId);

		$orConditions = [
			$qb->expr()->isNull('participation.id')
		];

		// EVERYONE
		$orConditions[] = $qb->expr()->eq(
			'participation.policy_type',
			$qb->createNamedParameter(Participation::POLICY_EVERYONE)
		);

		// USERS - use UserRelationMapper
		$allowedParticipationIds = $this->userRelationMapper->getTargetIdsForUsers(
			Participation::TARGET_ENGINE,
			UserRelation::RELATION_PARTICIPATION,
			[$currentUserId]
		);

		if (!empty($allowedParticipationIds)) {
			$orConditions[] = $qb->expr()->andX(
				$qb->expr()->eq('participation.policy_type', $qb->createNamedParameter(Participation::POLICY_USERS)),
				$qb->expr()->in(
					self::TABLE . '.id',
					$qb->createNamedParameter($allowedParticipationIds, IQueryBuilder::PARAM_INT_ARRAY)
				)
			);
		}

		// GROUPS - use GroupRelationMapper
		if (!empty($userGroupIds)) {
			$allowedParticipationIds = $this->groupRelationMapper->getTargetIdsForGroups(
				GroupRelation::TARGET_INQUIRY,
				GroupRelation::RELATION_PARTICIPATION,
				$userGroupIds
			);

			if (!empty($allowedParticipationIds)) {
				$orConditions[] = $qb->expr()->andX(
					$qb->expr()->eq('participation.policy_type', $qb->createNamedParameter(Participation::POLICY_GROUPS)),
					$qb->expr()->in(
						self::TABLE . '.id',
						$qb->createNamedParameter($allowedParticipationIds, IQueryBuilder::PARAM_INT_ARRAY)
					)
				);
			}
		}

		// LOTTERY - For filtering, lottery should allow access if user is a candidate
		// Or we can handle it differently - this depends on business logic
		// For now, we'll allow lottery policies to be visible to all
		$orConditions[] = $qb->expr()->eq(
			'participation.policy_type',
			$qb->createNamedParameter(Participation::POLICY_LOTTERY)
		);

		$qb->andWhere($qb->expr()->orX(...$orConditions));
	}

	/**
	 * Get user's group IDs using IGroupManager
	 */
	private function getUserGroupIds(string $userId): array
	{
		try {
			$user = $this->userSession->getUser();
			if ($user !== null && $user instanceof \OCP\IUser) {
				return $this->groupManager->getUserGroupIds($user);
			}
		} catch (\Exception $e) {
			\OC::$server->getLogger()->error('Could not get user groups: ' . $e->getMessage(), [
				'app' => 'agora',
				'userId' => $userId
			]);
		}
		return [];
	}

	/**
	 * Hydrate a list of inquiries with their dynamic fields and visibility groups
	 */
	private function hydrateInquiries(array $inquiries): void
	{
		if (empty($inquiries)) {
			return;
		}

		foreach ($inquiries as $inquiry) {
			$this->loadDynamicFields($inquiry);
		}

		$this->loadVisibilityGroups($inquiries);
	}

	// ====================================================================
	// QUERY METHODS
	// ====================================================================

	public function find(int $id): Inquiry
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

		$inquiry = $this->findEntity($qb);

		$this->loadDynamicFields($inquiry);
		$inquiry->setVisibilityGroups(
			$this->getVisibilityGroupsForInquiry($id)
		);

		return $inquiry;
	}

	public function findForMe(string $userId): array
	{
		$qb = $this->buildQuery();
		$qb->andWhere(
			$qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT))
		);

		$inquiries = $this->findEntities($qb);
		$this->hydrateInquiries($inquiries);

		return $inquiries;
	}

	public function findAutoReminderInquiries(): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

		$inquiries = $this->findEntities($qb);
		$this->hydrateInquiries($inquiries);

		return $inquiries;
	}

	public function listByOwner(string $userId): array
	{
		$qb = $this->buildQuery();
		$qb->andWhere(
			$qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR))
		);

		$inquiries = $this->findEntities($qb);
		$this->hydrateInquiries($inquiries);

		return $inquiries;
	}

	public function findForAdmin(string $userId): array
	{
		$qb = $this->buildQuery();
		$qb->andWhere(
			$qb->expr()->neq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR))
		);

		$inquiries = $this->findEntities($qb);
		$this->hydrateInquiries($inquiries);

		return $inquiries;
	}

	public function search(ISearchQuery $query): array
	{
		$qb = $this->buildQuery();
		$qb->andWhere(
			$qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT))
		)->andWhere(
			$qb->expr()->orX(
				...array_map(
					function (string $token) use ($qb) {
						return $qb->expr()->orX(
							$qb->expr()->iLike(
								self::TABLE . '.title',
								$qb->createNamedParameter('%' . $this->db->escapeLikeParameter($token) . '%', IQueryBuilder::PARAM_STR),
								IQueryBuilder::PARAM_STR
							),
							$qb->expr()->iLike(
								self::TABLE . '.description',
								$qb->createNamedParameter('%' . $this->db->escapeLikeParameter($token) . '%', IQueryBuilder::PARAM_STR),
								IQueryBuilder::PARAM_STR
							)
						);
					},
					explode(' ', $query->getTerm())
				)
			)
		);

		$inquiries = $this->findEntities($qb);
		$this->hydrateInquiries($inquiries);

		return $inquiries;
	}

	public function getChildInquiryIds(int $parentId): array
	{
		$currentUserId = $this->userSession->getCurrentUserId();
		$qb = $this->db->getQueryBuilder();
		$qb->select(self::TABLE . '.id')
     ->from($this->getTableName(), self::TABLE)
     ->where($qb->expr()->eq(self::TABLE . '.parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->neq(self::TABLE . '.visibility', $qb->createNamedParameter('private')));

		if ($currentUserId !== null) {
			$qb->andWhere($qb->expr()->neq(self::TABLE . '.owner', $qb->createNamedParameter($currentUserId)));
		}

		$stmt = $qb->executeQuery();
		$rows = $stmt->fetchAll();
		$stmt->closeCursor();

		if (empty($rows)) {
			return [];
		}

		return array_map(static fn(array $row): int => (int)$row['id'], $rows);
	}

	// ====================================================================
	// GROUP RELATIONS - DELEGATED TO GroupRelationMapper
	// ====================================================================

	public function getVisibilityGroupsForInquiry(int $inquiryId): array
	{
		return $this->groupRelationMapper->getGroupIdsForTarget(
			GroupRelation::TARGET_INQUIRY,
			$inquiryId,
			GroupRelation::RELATION_VISIBILITY
		);
	}

	public function saveVisibilityGroups(Inquiry $inquiry): void
	{
		$this->groupRelationMapper->setGroupsForTarget(
			GroupRelation::TARGET_INQUIRY,
			$inquiry->getId(),
			GroupRelation::RELATION_VISIBILITY,
			$inquiry->getVisibilityGroups()
		);
	}

	public function removeVisibilityGroup(int $inquiryId, string $groupId): int
	{
		return $this->groupRelationMapper->removeGroupRelation(
			GroupRelation::TARGET_INQUIRY,
			$inquiryId,
			GroupRelation::RELATION_VISIBILITY,
			$groupId
		);
	}

	public function addVisibilityGroup(int $inquiryId, string $groupId): bool
	{
		return $this->groupRelationMapper->addGroupRelation(
			GroupRelation::TARGET_INQUIRY,
			$inquiryId,
			GroupRelation::RELATION_VISIBILITY,
			$groupId
		);
	}

	public function getInquiriesForGroups(array $groupIds): array
	{
		return $this->groupRelationMapper->getTargetIdsForGroups(
			GroupRelation::TARGET_INQUIRY,
			GroupRelation::RELATION_VISIBILITY,
			$groupIds
		);
	}

	public function loadVisibilityGroups(array $inquiries): void
	{
		if (empty($inquiries)) {
			return;
		}

		$inquiryIds = array_map(function ($inquiry) {
			return $inquiry instanceof Inquiry ? $inquiry->getId() : (int)$inquiry;
		}, $inquiries);

		$groupsByTarget = $this->groupRelationMapper->getGroupsByTargets(
			GroupRelation::TARGET_INQUIRY,
			$inquiryIds,
			GroupRelation::RELATION_VISIBILITY
		);

		foreach ($inquiries as $inquiry) {
			if ($inquiry instanceof Inquiry) {
				$id = $inquiry->getId();
				$inquiry->setVisibilityGroups($groupsByTarget[$id] ?? []);
			}
		}
	}

	// ====================================================================
	// JOIN METHODS
	// ====================================================================

	protected function joinSupportResult(
		IQueryBuilder &$qb,
		string $fromAlias,
		string $joinAlias = 'support_result'
	): void {
		$dbProvider = $this->db->getDatabaseProvider();
		$table = '*PREFIX*' . self::SUPPORT_RESULT_TABLE;

		if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
			$qb->addSelect($qb->createFunction(
				"COALESCE(
					(SELECT json_agg(json_build_object(
						'id', sr.id,
						'support_engine_id', sr.support_engine_id,
						'target_type', sr.target_type,
						'target_id', sr.target_id,
						'result', sr.result,
						'updated', sr.updated
			))
			FROM $table sr
			WHERE sr.target_type = 'inquiry' AND sr.target_id = {$fromAlias}.id),
			'[]'::json
			)::text AS support_result"
	    ));
	} else {
	    $qb->addSelect($qb->createFunction(
		"COALESCE(
		    (SELECT CONCAT('[', GROUP_CONCAT(
			JSON_OBJECT(
			    'id', sr.id,
			    'support_engine_id', sr.support_engine_id,
			    'target_type', sr.target_type,
			    'target_id', sr.target_id,
			    'result', sr.result,
			    'updated', sr.updated
			) SEPARATOR ','
		    ), ']')
		    FROM $table sr
		    WHERE sr.target_type = 'inquiry' AND sr.target_id = {$fromAlias}.id),
		    '[]'
		) AS support_result"
	    ));
	}
    }

    protected function joinSupportEngine(
	IQueryBuilder &$qb,
	string $fromAlias,
	string $joinAlias = 'support_engine'
    ): void {
	$dbProvider = $this->db->getDatabaseProvider();
	$table = '*PREFIX*' . self::SUPPORT_ENGINE_TABLE;

	if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
	    $qb->addSelect($qb->createFunction(
		"COALESCE(
		    (SELECT json_agg(json_build_object(
			'id', se.id,
			'title', se.title,
			'description', se.description,
			'engine', se.engine,
			'purpose', se.purpose,
			'inquiry_id', se.inquiry_id,
			'status', se.status,
			'config', se.config,
			'created', se.created,
			'target_type', se.target_type,
			'target_ids', se.target_ids
		    ))
		    FROM $table se
		    WHERE se.target_type = 'option' AND se.inquiry_id = {$fromAlias}.id),
		    '[]'::json
		)::text AS support_engine"
	    ));
	} else {
	    $qb->addSelect($qb->createFunction(
		"COALESCE(
		    (SELECT CONCAT('[', GROUP_CONCAT(
			JSON_OBJECT(
			    'id', se.id,
			    'title', se.title,
			    'description', se.description,
			    'engine', se.engine,
			    'purpose', se.purpose,
			    'inquiry_id', se.inquiry_id,
			    'status', se.status,
			    'config', se.config,
			    'created', se.created,
			    'target_type', se.target_type,
			    'target_ids', se.target_ids
			) SEPARATOR ','
		    ), ']')
		    FROM $table se
		    WHERE se.target_type = 'option' AND se.inquiry_id = {$fromAlias}.id),
		    '[]'
		) AS support_engine"
	    ));
	}
    }

    protected function joinFamily(
	IQueryBuilder &$qb,
	string $fromAlias,
	string $joinAlias = 'inquiry_type_family'
    ): void {
	$dbProvider = $this->db->getDatabaseProvider();

	if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
	    $qb->addSelect($qb->createFunction(
		'MAX(COALESCE(' . $joinAlias . '.family, ' . $fromAlias . '.family)) AS family'
	    ));
	} else {
	    $qb->addSelect($qb->createFunction(
		'COALESCE(' . $joinAlias . '.family, ' . $fromAlias . '.family) AS family'
	    ));
	}

	$qb->leftJoin(
	    $fromAlias,
	    InquiryType::TABLE,
	    $joinAlias,
	    $qb->expr()->eq($joinAlias . '.inquiry_type', $fromAlias . '.type')
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
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		$qb->expr()->eq($joinAlias . '.option_id', $qb->createNamedParameter(0)),
		$qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
		$qb->expr()->isNull($joinAlias . '.support_engine_id')
	    )
	);

	$dbProvider = $this->db->getDatabaseProvider();

	if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
	    $qb->addSelect($qb->createFunction(
		'MAX(' . $joinAlias . '.value::text) AS support_value'
	    ));
	} else {
	    $qb->addSelect($qb->createFunction(
		$joinAlias . '.value AS support_value'
	    ));
	}
    }

    protected function joinMiscs(
	IQueryBuilder &$qb,
	string $fromAlias,
	string $joinAlias = 'inquiry_misc_settings'
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
	    asColumn: 'misc_settings_concat',
	    dbProvider: $dbProvider,
	    separator: ','
	);

	$qb->leftJoin(
	    $fromAlias,
	    InquiryMisc::TABLE,
	    $joinAlias,
	    $qb->expr()->andX(
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
	    )
	);
    }

    protected function joinUserRole(
	IQueryBuilder &$qb,
	string $fromAlias,
	string $currentUserId,
	string $joinAlias = 'user_shares',
    ): void {
	$dbProvider = $this->db->getDatabaseProvider();

	if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
	    $qb->addSelect($qb->createFunction('MAX(coalesce(' . $joinAlias . '.type, \'\')) AS user_role'));
	    $qb->addSelect($qb->createFunction('MAX(coalesce(' . $joinAlias . '.token, \'\')) AS share_token'));
	} else {
	    $emptyString = $qb->expr()->literal('');
	    $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.type, ' . $emptyString . ') AS user_role'));
	    $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.token, ' . $emptyString . ') AS share_token'));
	}

	$qb->leftJoin(
	    $fromAlias,
	    Share::TABLE,
	    $joinAlias,
	    $qb->expr()->andX(
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		$qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
		$qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
	    )
	);
    }

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
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		$qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
		$qb->expr()->isNull($joinAlias . '.support_engine_id')
	    )
	);

	$dbProvider = $this->db->getDatabaseProvider();

	if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
	    $qb->addSelect(
		$qb->createFunction('MAX(CASE WHEN ' . $joinAlias . '.user_id IS NOT NULL THEN 1 ELSE 0 END) AS has_supported')
	    );
	} else {
	    $qb->addSelect(
		$qb->createFunction('CASE WHEN ' . $joinAlias . '.user_id IS NOT NULL THEN 1 ELSE 0 END AS has_supported')
	    );
	}
    }

    protected function joinGroupShares(
	IQueryBuilder &$qb,
	string $fromAlias,
	string $joinAlias = 'group_shares',
    ): void {
	$dbProvider = $this->db->getDatabaseProvider();

	SqlHelper::getConcatenatedArray(
	    qb: $qb,
	    concatColumn: $joinAlias . '.user_id',
	    asColumn: 'group_shares',
	    dbProvider: $dbProvider,
	    separator: ','
	);

	$qb->leftJoin(
	    $fromAlias,
	    Share::TABLE,
	    $joinAlias,
	    $qb->expr()->andX(
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		$qb->expr()->eq($joinAlias . '.type', $qb->expr()->literal('group')),
		$qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
	    )
	);
    }

    protected function joinInquiryGroups(
	IQueryBuilder $qb,
	string $fromAlias,
	string $joinAlias = 'inquiry_groups',
    ): void {
	$dbProvider = $this->db->getDatabaseProvider();

	SqlHelper::getConcatenatedArray(
	    qb: $qb,
	    concatColumn: $joinAlias . '.group_id',
	    asColumn: 'inquiry_groups',
	    dbProvider: $dbProvider,
	    separator: ','
	);

	$qb->leftJoin(
	    $fromAlias,
	    InquiryGroup::RELATION_TABLE,
	    $joinAlias,
	    $qb->expr()->andX(
		$qb->expr()->eq(self::TABLE . '.id', $joinAlias . '.inquiry_id'),
	    )
	);
    }

    protected function joinInquiryGroupShares(
	IQueryBuilder $qb,
	string $fromAlias,
	string $currentUserId,
	string $inquiryGroupsAlias,
	string $joinAlias = 'inquiry_group_shares',
    ): void {
	$dbProvider = $this->db->getDatabaseProvider();

	SqlHelper::getConcatenatedArray(
	    qb: $qb,
	    concatColumn: $joinAlias . '.type',
	    asColumn: 'inquiry_group_user_shares',
	    dbProvider: $dbProvider,
	    separator: ','
	);

	$qb->leftJoin(
	    $fromAlias,
	    Share::TABLE,
	    $joinAlias,
	    $qb->expr()->andX(
		$qb->expr()->eq($joinAlias . '.group_id', $inquiryGroupsAlias . '.group_id'),
		$qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
		$qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
	    )
	);
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
	    $qb->expr()->andX(
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		$qb->expr()->isNull($joinAlias . '.support_engine_id')
	    )
	)
	->addSelect(
	    $qb->createFunction(
		'COUNT(DISTINCT CASE WHEN ' . $joinAlias . '.option_id = 0 THEN ' . $joinAlias . '.user_id ELSE NULL END) AS count_supports'
	    )
	);
    }

    protected function joinParticipantsCount(
	IQueryBuilder &$qb,
	string $fromAlias,
	string $joinAlias = 'participants',
    ): void {
	$qb->leftJoin(
	    $fromAlias,
	    Inquiry::TABLE,
	    $joinAlias,
	    $qb->expr()->eq($joinAlias . '.parent_id', $fromAlias . '.id')
	);
	$qb->addSelect(
	    $qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.id)) AS count_participants')
	);
    }

    protected function joinCommentsCount(
	IQueryBuilder $qb,
	string $fromAlias,
	string $joinAlias = 'comments',
    ): void {
	$qb->leftJoin(
	    $fromAlias,
	    Comment::TABLE,
	    $joinAlias,
	    $qb->expr()->andX(
		$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		$qb->expr()->eq($joinAlias . '.option_id', $qb->createNamedParameter(0)),
		$qb->expr()->eq($joinAlias . '.deleted', $qb->createNamedParameter(0))
	    )
	);

	$qb->addSelect(
	    $qb->createFunction(
		'COUNT(DISTINCT ' . $joinAlias . '.id) AS count_comments'
	    )
	);
    }

    protected function joinParticipation(
	IQueryBuilder &$qb,
	string $fromAlias,
	?string $currentUserId
    ): void {
	$qb->leftJoin(
	    $fromAlias,
	    Participation::TABLE,
	    'participation',
	    $qb->expr()->andX(
		$qb->expr()->eq('participation.target_type', $qb->expr()->literal('inquiry')),
		$qb->expr()->eq('participation.target_id', $fromAlias . '.id')
	    )
	);

	$qb->addSelect([
	    'participation.id AS participation_id',
	    'participation.policy_type AS participation_policy_type',
	    'participation.policy_config AS participation_policy_config',
	    'participation.created_at AS participation_created_at',
	    'participation.updated_at AS participation_updated_at',
	    'participation.created_by AS participation_created_by'
	]);

	$this->applyParticipationFilter($qb, $currentUserId);
    }


    // ====================================================================
    // DYNAMIC FIELDS
    // ====================================================================

    private function loadDynamicFields(Inquiry $inquiry): void
    {
	$inquiryId = $inquiry->getId();

	$qb = $this->db->getQueryBuilder();
	$qb->select('*')
	   ->from(InquiryMisc::TABLE)
	   ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

	$stmt = $qb->executeQuery();
	$storedData = $stmt->fetchAll();
	$stmt->closeCursor();

	foreach ($storedData as $data) {
	    if (is_array($data) && isset($data['key'], $data['value'])) {
		$inquiry->setMiscField((string)$data['key'], $data['value']);
	    }
	}
    }

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
            case 'object':
            case 'array':
                    if (is_string($value)) {
                            return $value;
                    }
                    if (is_array($value) || is_object($value)) {
                            return json_encode($value, JSON_UNESCAPED_UNICODE);
                    }
                    return (string)$value;


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

    public function saveDynamicFields(Inquiry $inquiry, array $fieldsDefinition): void
    {
	$inquiryId = $inquiry->getId();
	if (empty($fieldsDefinition)) {
	    return;
	}

	$qb = $this->db->getQueryBuilder();

	$qb->delete(InquiryMisc::TABLE)
	   ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
	   ->executeStatement();

	foreach ($fieldsDefinition as $fieldDef) {
	    $key = $fieldDef['key'];
	    $value = $this->castValueByType($fieldDef['default'] ?? null, $fieldDef);
	    $stringValue = is_array($value) ? json_encode($value) : (string)$value;

	    $qb->insert(InquiryMisc::TABLE)
	       ->values([
		   'inquiry_id' => $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT),
		   'key' => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
		   'value' => $qb->createNamedParameter($stringValue, IQueryBuilder::PARAM_STR),
	       ])
	       ->executeStatement();

	    $inquiry->setMiscField($key, $value);
	}
    }

    public function updateDynamicFields(Inquiry $inquiry, array $fieldsToUpdate, array $fieldsDefinition): void
    {
	$inquiryId = $inquiry->getId();
	if (empty($fieldsToUpdate)) {
	    return;
	}

	$qb = $this->db->getQueryBuilder();

	foreach ($fieldsToUpdate as $key => $value) {
	    $key = (string)$key;

	    $fieldDef = array_filter($fieldsDefinition, fn($f) => $f['key'] === $key);
	    $fieldDef = array_shift($fieldDef) ?: ['type' => 'string', 'default' => null];

	    $value = $this->castValueByType($value ?? $fieldDef['default'], $fieldDef);
	    $stringValue = is_array($value) ? json_encode($value) : (string)$value;

	    $existing = $qb->select('id')
			   ->from(InquiryMisc::TABLE)
			   ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
			   ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)))
			   ->executeQuery()
			   ->fetchOne();

	    if ($existing) {
		$qb->update(InquiryMisc::TABLE)
		   ->set('value', $qb->createNamedParameter($stringValue, IQueryBuilder::PARAM_STR))
		   ->where($qb->expr()->eq('id', $qb->createNamedParameter($existing, IQueryBuilder::PARAM_INT)))
		   ->executeStatement();
	    } else {
		$qb->insert(InquiryMisc::TABLE)
		   ->values([
		       'inquiry_id' => $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT),
		       'key' => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
		       'value' => $qb->createNamedParameter($stringValue, IQueryBuilder::PARAM_STR),
		   ])
		   ->executeStatement();
	    }

	    $inquiry->setMiscField($key, $value);
	}
    }

    // ====================================================================
    // CRUD OPERATIONS
    // ====================================================================

    public function archiveExpiredInquiries(int $offset): int
    {
	$archiveDate = time();
	$qb = $this->db->getQueryBuilder();
	$qb->update($this->getTableName())
	   ->set('archived', $qb->createNamedParameter($archiveDate))
	   ->where($qb->expr()->lt('expire', $qb->createNamedParameter($offset)))
	   ->andWhere($qb->expr()->gt('expire', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
	   ->andWhere($qb->expr()->eq('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
	return $qb->executeStatement();
    }

    public function setInquiryStatus(int $inquiryId, string $mstatus): void
    {
	$qb = $this->db->getQueryBuilder();
	$qb->update($this->getTableName())
	   ->set('inquiry_status', $qb->createNamedParameter($mstatus))
	   ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
	$qb->executeStatement();
    }

    public function setModerationStatus(int $inquiryId, string $mstatus): void
    {
	$qb = $this->db->getQueryBuilder();
	$qb->update($this->getTableName())
	   ->set('moderation_status', $qb->createNamedParameter($mstatus))
	   ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
	$qb->executeStatement();
    }

    public function deleteArchivedInquiries(int $offset): int
    {
	$qb = $this->db->getQueryBuilder();
	$qb->delete($this->getTableName())
	   ->where($qb->expr()->lt('archived', $qb->createNamedParameter($offset)))
	   ->andWhere($qb->expr()->gt('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
	return $qb->executeStatement();
    }

    public function setLastInteraction(int $inquiryId): void
    {
	$timestamp = time();
	$qb = $this->db->getQueryBuilder();
	$qb->update($this->getTableName())
	   ->set('last_interaction', $qb->createNamedParameter($timestamp, IQueryBuilder::PARAM_INT))
	   ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
	$qb->executeStatement();
    }

    public function deleteByUserId(string $userId): void
    {
	$qb = $this->db->getQueryBuilder();
	$qb->delete($this->getTableName())
	   ->where('owner = :userId')
	   ->setParameter('userId', $userId);
	$qb->executeStatement();
    }

    public function findParticipantsByInquiry(int $inquiryId): array {
	$qb = $this->db->getQueryBuilder();

	$qb->selectDistinct([self::TABLE . '.owner', self::TABLE . '.id'])
	   ->from($this->getTableName(), self::TABLE)
	   ->groupBy(self::TABLE . '.owner', self::TABLE . '.id')
	   ->where(
	       $qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT))
	   );

	return $this->findEntities($qb);
    }
}
