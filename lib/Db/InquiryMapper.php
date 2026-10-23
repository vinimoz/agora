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
use OCA\Agora\Exceptions\ForbiddenException;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Search\ISearchQuery;
use OCA\Agora\Db\GroupRelation;
use OCA\Agora\Db\GroupRelationMapper;
use OCA\Agora\Db\UserRelation;
use OCA\Agora\Db\UserRelationMapper;
use OCA\Agora\Db\Participation;
use OCA\Agora\Db\ParticipationMapper;
use OCA\Agora\Db\LotterySelection;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\SupportResult;
use OCA\Agora\Db\SupportEngine;
use OCA\Agora\Db\Trending;
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
		private ParticipationMapper $participationMapper,
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
			$userGroups = $this->userSession->getCurrentUser()->getGroups();

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

			// From main — share/visibility filters
			$this->applyVisibilityFilter($qb, $currentUserId);
			$this->joinIsShared($qb, self::TABLE, $currentUserId, $userGroups);

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

		$inquiry = $this->findEntity($qb);

		$inquiry->setVisibilityGroups($this->getVisibilityGroupsForInquiry($id));
		$inquiry->setVisibilityUsers($this->getUserIdsForVisibility($id));
		$this->loadParticipation($inquiry);

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
		$this->joinTrendingScores($qb, self::TABLE);

		// From main — share/visibility filters
		$userGroups = $this->userSession->getCurrentUser()?->getGroups() ?? [];
		$this->joinIsShared($qb, self::TABLE, $currentUserId, $userGroups);

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
	 * Find all inquiries that have the 'trending' support feature enabled.
	 * Used by the cron job - no user context available.
	 *
	 * @return Inquiry[]
	 */
	public function findAllWithTrendingFeature(): array
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('support_feature', $qb->createNamedParameter('trending')));

		return $this->findEntities($qb);
	}

	// ── Participation loading ──

	/**
	 * Attach the fully-loaded Participation (policy + user/group relations +
	 * lottery run data) to an inquiry.
	 *
	 * FIX: if no Participation row exists but the inquiry has
	 * visibility=participants with participation relations, derive a synthetic
	 * Participation object from the relations so that direct loads (find/get)
	 * honour the intended audience.
	 *
	 * Validation is disabled here — legacy incompatible data must not break
	 * fetching.
	 */
	private function loadParticipation(Inquiry $inquiry): void
	{
		$policy = null;
		try {
			$policy = $this->participationMapper->findByTargetWithRelations(
				Participation::TARGET_INQUIRY,
				$inquiry->getId()
			);
		} catch (\Throwable $e) {
			$this->logger->warning(
				'Failed to load participation for inquiry ' . $inquiry->getId() . ': ' . $e->getMessage(),
				['app' => 'agora']
			);
		}

		// Fallback: derive a synthetic policy from relations when
		// visibility=participants and no Participation row exists.
		if ($policy === null
			&& $inquiry->getVisibility() === Inquiry::VISIBILITY_PARTICIPANTS) {
			$policy = $this->deriveParticipationFromRelations($inquiry);
			if ($policy !== null) {
				$this->logger->info(
					'Derived Participation for inquiry ' . $inquiry->getId()
						. ' from relations (no participation row present)',
					['app' => 'agora']
				);
			}
		}

		$inquiry->setParticipationPolicy($policy, false);
	}

	/**
	 * Build a synthetic Participation when a `visibility=participants` inquiry
	 * has participation relations but no Participation row.
	 *
	 * Inference rules (first match wins):
	 *   - participation GROUP relations → POLICY_GROUPS
	 *   - participation USER  relations → POLICY_USERS
	 *   - otherwise → null (treated as "none")
	 */
	private function deriveParticipationFromRelations(Inquiry $inquiry): ?Participation
	{
		$inquiryId = $inquiry->getId();

		$groupIds = $this->groupRelationMapper->getGroupIdsForTarget(
			GroupRelation::TARGET_INQUIRY,
			$inquiryId,
			GroupRelation::RELATION_PARTICIPATION
		);

		if (!empty($groupIds)) {
			$policy = new Participation();
			$policy->setTargetType(Participation::TARGET_INQUIRY);
			$policy->setTargetId($inquiryId);
			$policy->setPolicyType(Participation::POLICY_GROUPS);
			$policy->setPolicyConfig(['group_ids' => $groupIds]);
			return $policy;
		}

		$userIds = $this->userRelationMapper->getUserIdsForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_PARTICIPATION
		);

		if (!empty($userIds)) {
			$policy = new Participation();
			$policy->setTargetType(Participation::TARGET_INQUIRY);
			$policy->setTargetId($inquiryId);
			$policy->setPolicyType(Participation::POLICY_USERS);
			$policy->setPolicyConfig(['user_ids' => $userIds]);
			return $policy;
		}

		return null;
	}

	// ── User relation helpers ──

	public function getUserIdsForVisibility(int $inquiryId): array
	{
		return $this->userRelationMapper->getUserIdsForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_VISIBILITY
		);
	}

	public function saveUserVisibility(Inquiry $inquiry): void
	{
		$this->userRelationMapper->setUsersForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiry->getId(),
			UserRelation::RELATION_VISIBILITY,
			$inquiry->getVisibilityUsers() ?? []
		);
	}

	public function hasUserVisibility(int $inquiryId, string $userId): bool
	{
		return $this->userRelationMapper->hasUserForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_VISIBILITY,
			$userId
		);
	}

	public function getUserIdsForParticipation(int $inquiryId): array
	{
		return $this->userRelationMapper->getUserIdsForTarget(
			UserRelation::TARGET_INQUIRY,
			$inquiryId,
			UserRelation::RELATION_PARTICIPATION
		);
	}

	// ── Visibility filter ──

	/**
	 * Apply visibility filter enforcing the five rules:
	 *   private      → owner only
	 *   groups       → member of a visibility group
	 *   users        → explicitly listed user
	 *   participants → audience derived from the Participation policy
	 *   everyone     → any logged-in user
	 */
	protected function applyVisibilityFilter(
		IQueryBuilder &$qb,
		?string $currentUserId
	): void {
		if ($currentUserId === null) {
			$qb->andWhere(
				$qb->expr()->eq(
					self::TABLE . '.visibility',
					$qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE)
				)
			);
			return;
		}

		$userGroupIds = $this->getUserGroupIds($currentUserId);

				$this->logger->info('agora visibility filter', [
			'app' => 'agora',
			'userId' => $currentUserId,
			'userGroupIds' => $userGroupIds,
			'groupsVisibleInquiries' => $this->groupRelationMapper->getTargetIdsForGroups(
				GroupRelation::TARGET_INQUIRY,
				GroupRelation::RELATION_VISIBILITY,
				$userGroupIds ?: ['']
			),
			'participationVisibleInquiries' => $this->groupRelationMapper->getTargetIdsForGroups(
				GroupRelation::TARGET_INQUIRY,
				GroupRelation::RELATION_PARTICIPATION,
				$userGroupIds ?: ['']
			),
				]);

		$orConditions = [];

		// 1. Owner override
		$orConditions[] = $qb->expr()->eq(
			self::TABLE . '.owner',
			$qb->createNamedParameter($currentUserId)
		);

		// 2. Everyone
		$orConditions[] = $qb->expr()->eq(
			self::TABLE . '.visibility',
			$qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE)
		);

		// 3. Private (owner only — kept for clarity alongside #1)
		$orConditions[] = $qb->expr()->andX(
			$qb->expr()->eq(self::TABLE . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_PRIVATE)),
			$qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($currentUserId))
		);

		// 4. Groups — via GroupRelationMapper
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

		// 5. Users — via UserRelationMapper
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

		// 6. Participants — audience derived from the policy (FIXED)
		$participantInquiryIds = $this->getParticipantsVisibilityInquiryIds(
			$currentUserId,
			$userGroupIds
		);

		if (!empty($participantInquiryIds)) {
			$orConditions[] = $qb->expr()->andX(
				$qb->expr()->eq(
					self::TABLE . '.visibility',
					$qb->createNamedParameter(Inquiry::VISIBILITY_PARTICIPANTS)
				),
				$qb->expr()->in(
					self::TABLE . '.id',
					$qb->createNamedParameter($participantInquiryIds, IQueryBuilder::PARAM_INT_ARRAY)
				)
			);
		}

		// 7. Moderator pending — always visible
		$user = $this->userSession->getCurrentUser();
		if ($user !== null && $user->getIsModerator()) {
			$orConditions[] = $qb->expr()->eq(
				self::TABLE . '.moderation_status',
				$qb->createNamedParameter(Inquiry::MODERATION_STATUS_PENDING, IQueryBuilder::PARAM_STR)
			);
		}

		$qb->andWhere($qb->expr()->orX(...$orConditions));
	}

	/**
	 * Resolve which `visibility=participants` inquiries the current user may see,
	 * according to each inquiry's Participation policy:
	 *
	 *   no policy row   → derive from participation relations (FIXED)
	 *                     - group relation present → treat as POLICY_GROUPS
	 *                     - user  relation present → treat as POLICY_USERS
	 *                     - neither                → not visible
	 *   everyone        → every logged-in user
	 *   users           → user_ids list
	 *   groups          → group_ids membership
	 *   lottery         → user was selected (pending or accepted)
	 *
	 * NOTE: The previous version returned `[]` as soon as the policies query
	 * came back empty. That silently hid inquiries like #2 (which only has a
	 * participation group relation and no `agora_participation` row).
	 */
	private function getParticipantsVisibilityInquiryIds(
		string $currentUserId,
		array $userGroupIds
	): array {
		// 1. All inquiries with visibility=participants (non-deleted)
		$qb = $this->db->getQueryBuilder();
		$qb->select(self::TABLE . '.id')
			->from($this->getTableName(), self::TABLE)
			->where($qb->expr()->eq(
				self::TABLE . '.visibility',
				$qb->createNamedParameter(Inquiry::VISIBILITY_PARTICIPANTS)
			))
			->andWhere($qb->expr()->eq(
				self::TABLE . '.deleted',
				$qb->expr()->literal(0, IQueryBuilder::PARAM_INT)
			));

		$stmt = $qb->executeQuery();
		$allIds = array_map(static fn(array $row): int => (int)$row['id'], $stmt->fetchAll());
		$stmt->closeCursor();

		if (empty($allIds)) {
			return [];
		}

		// 2. Bulk-fetch policies (may be empty — DO NOT early-return)
		$policyQb = $this->db->getQueryBuilder();
		$policyQb->select('*')
			->from(Participation::TABLE)
			->where($policyQb->expr()->eq(
				'target_type',
				$policyQb->createNamedParameter(Participation::TARGET_INQUIRY, IQueryBuilder::PARAM_STR)
			))
			->andWhere($policyQb->expr()->in(
				'target_id',
				$policyQb->createNamedParameter($allIds, IQueryBuilder::PARAM_INT_ARRAY)
			));

		$pStmt = $policyQb->executeQuery();
		$policies = [];
		while ($row = $pStmt->fetch()) {
			$policies[(int)$row['target_id']] = $row;
		}
		$pStmt->closeCursor();

		// 3. Pre-resolve user / group participation memberships
		$userParticipationIds = $this->userRelationMapper->getTargetIdsForUsers(
			UserRelation::TARGET_INQUIRY,
			UserRelation::RELATION_PARTICIPATION,
			[$currentUserId]
		);

		$groupParticipationIds = !empty($userGroupIds)
			? $this->groupRelationMapper->getTargetIdsForGroups(
				GroupRelation::TARGET_INQUIRY,
				GroupRelation::RELATION_PARTICIPATION,
				$userGroupIds
			)
			: [];

		// 4. Pre-resolve lottery wins for the current user.
		//    LotterySelection has NO inquiry_id column → JOIN through Participation.
		$userLotteryIds = [];
		try {
			$lotteryQb = $this->db->getQueryBuilder();
			$lotteryQb->selectDistinct('p.target_id')
				->from(LotterySelection::TABLE, 'ls')
				->innerJoin(
					'ls',
					Participation::TABLE,
					'p',
					$lotteryQb->expr()->eq('p.id', 'ls.participation_id')
				)
				->where($lotteryQb->expr()->eq(
					'p.target_type',
					$lotteryQb->createNamedParameter(Participation::TARGET_INQUIRY, IQueryBuilder::PARAM_STR)
				))
				->andWhere($lotteryQb->expr()->in(
					'p.target_id',
					$lotteryQb->createNamedParameter($allIds, IQueryBuilder::PARAM_INT_ARRAY)
				))
				->andWhere($lotteryQb->expr()->eq(
					'ls.selected_user_id',
					$lotteryQb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)
				))
				->andWhere($lotteryQb->expr()->in(
					'ls.status',
					$lotteryQb->createNamedParameter(
						[LotterySelection::STATUS_PENDING, LotterySelection::STATUS_ACCEPTED],
						IQueryBuilder::PARAM_STR_ARRAY
					)
				));

			$lStmt = $lotteryQb->executeQuery();
			$userLotteryIds = array_map(
				static fn(array $row): int => (int)$row['target_id'],
				$lStmt->fetchAll()
			);
			$lStmt->closeCursor();
		} catch (\Throwable $e) {
			$this->logger->warning(
				'Lottery lookup failed while expanding visibility=participants: ' . $e->getMessage(),
				['app' => 'agora']
			);
		}

		// 5. Compute the allowed set
		$allowed = [];
		foreach ($allIds as $inquiryId) {
			$policy = $policies[$inquiryId] ?? null;

			// ── Fallback: no Participation row → derive from relations ──
			// A participating user/group relation alone is enough to consider
			// the inquiry visible to that user/group.
			if ($policy === null) {
				if (in_array($inquiryId, $userParticipationIds, false)
					|| in_array($inquiryId, $groupParticipationIds, false)
					|| in_array($inquiryId, $userLotteryIds, false)) {
					$allowed[] = $inquiryId;
				}
				continue;
			}

			// ── Normal path: explicit Participation row ──
			switch ($policy['policy_type'] ?? null) {
				case Participation::POLICY_EVERYONE:
					$allowed[] = $inquiryId;
					break;

				case Participation::POLICY_USERS:
					if (in_array($inquiryId, $userParticipationIds, false)) {
						$allowed[] = $inquiryId;
					}
					break;

				case Participation::POLICY_GROUPS:
					if (in_array($inquiryId, $groupParticipationIds, false)) {
						$allowed[] = $inquiryId;
					}
					break;

				case Participation::POLICY_LOTTERY:
					if (in_array($inquiryId, $userLotteryIds, false)) {
						$allowed[] = $inquiryId;
					}
					break;

				default:
					// Unknown or legacy → not visible
					break;
			}
		}

		return $allowed;
	}

		/**
	 * Resolve the current user's group IDs.
	 *
	 * OCA\Agora\UserSession::getCurrentUser() returns the app's User wrapper,
	 * which is NOT an \OCP\IUser — it exposes getGroups() instead. Using
	 * `instanceof IUser` therefore always fails and returns [], which silently
	 * disabled every groups-based visibility check.
	 */
	private function getUserGroupIds(string $userId): array
	{
		try {
			$user = $this->userSession->getCurrentUser();
			if ($user === null) {
				return [];
			}

			// Agora's User wrapper
			if (method_exists($user, 'getGroups')) {
				$groups = $user->getGroups();
				return is_array($groups) ? array_values($groups) : [];
			}

			// Raw IUser fallback
			if ($user instanceof \OCP\IUser) {
				return $this->groupManager->getUserGroupIds($user);
			}
		} catch (\Throwable $e) {
			$this->logger->error('Could not get user groups: ' . $e->getMessage(), [
				'app' => 'agora',
				'userId' => $userId,
			]);
		}
		return [];
	}

	private function hydrateInquiries(array $inquiries): void
	{
		if (empty($inquiries)) {
			return;
		}

		foreach ($inquiries as $inquiry) {
			$this->loadDynamicFields($inquiry);
			$this->loadParticipation($inquiry);
		}

		$this->loadVisibilityGroups($inquiries);
		$this->loadVisibilityUsers($inquiries);
	}

	// ── Query methods ──

	public function find(int $id): Inquiry
	{
		$qb = $this->buildQuery();
		$qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

		$inquiry = $this->findEntity($qb);

		$this->loadDynamicFields($inquiry);
		$this->loadParticipation($inquiry);
		$inquiry->setVisibilityGroups($this->getVisibilityGroupsForInquiry($id));
		$inquiry->setVisibilityUsers($this->getUserIdsForVisibility($id));

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

		$this->applyVisibilityFilter($qb, $currentUserId);

		$stmt = $qb->executeQuery();
		$rows = $stmt->fetchAll();
		$stmt->closeCursor();

		if (empty($rows)) {
			return [];
		}

		return array_map(static fn(array $row): int => (int)$row['id'], $rows);
	}

	// ── Group relations ──

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
		$id = $inquiry->getId();
		if ($id === null) {
			throw new \LogicException(
				'Cannot save visibility groups: inquiry has no ID yet. Persist the inquiry first.'
			);
		}

		$this->groupRelationMapper->setGroupsForTarget(
			GroupRelation::TARGET_INQUIRY,
			(int)$id,
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

	/**
	 * Symmetric counterpart to loadVisibilityGroups() for the `users` visibility.
	 * Uses a per-inquiry loop because UserRelationMapper has no bulk-by-targets
	 * API today. If one is added, switch to that.
	 */
	public function loadVisibilityUsers(array $inquiries): void
	{
		if (empty($inquiries)) {
			return;
		}

		foreach ($inquiries as $inquiry) {
			if ($inquiry instanceof Inquiry) {
				$inquiry->setVisibilityUsers(
					$this->getUserIdsForVisibility($inquiry->getId())
				);
			}
		}
	}

	// ── Joins ──

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
			$qb->expr()->andX(
				$qb->expr()->eq($joinAlias . '.parent_id', $fromAlias . '.id'),
				$qb->expr()->orX(
					$qb->expr()->eq($joinAlias . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_EVERYONE)),
					$qb->expr()->eq($joinAlias . '.visibility', $qb->createNamedParameter(Inquiry::VISIBILITY_GROUPS))
				),
				$qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
				$qb->expr()->eq($joinAlias . '.archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT))
			)
		);
		$qb->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.id)) AS count_participants'));
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

	protected function joinIsShared(
		IQueryBuilder &$qb,
		string $fromAlias,
		?string $currentUserId,
		array $userGroups,
	): void {
		if ($currentUserId === null) {
			$qb->addSelect($qb->createFunction('0 AS is_shared'));
			return;
		}

		$sql = sprintf(
			"CASE WHEN EXISTS (
				SELECT 1 FROM `*PREFIX*%s` s
				WHERE s.inquiry_id = %s.id
				AND s.deleted = 0
				AND s.type IN ('user','admin','group','email','contact','external')
				AND (s.user_id = :is_shared_user OR s.user_id IN (:is_shared_groups))
			) THEN 1 ELSE 0 END AS is_shared",
			Share::TABLE,
			$fromAlias
		);

		$qb->addSelect($qb->createFunction($sql));
		$qb->setParameter('is_shared_user', $currentUserId, IQueryBuilder::PARAM_STR);
		$qb->setParameter('is_shared_groups', $userGroups ?: [''], IQueryBuilder::PARAM_STR_ARRAY);
	}

	// ── Dynamic fields ──

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

	protected function joinTrendingScores(
		IQueryBuilder &$qb,
		string $fromAlias,
		string $joinAlias = 'trending_scores'
	): void {
		$qb->leftJoin(
			$fromAlias,
			TrendingScore::TABLE,
			$joinAlias,
			$qb->expr()->andX(
				$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
				$qb->expr()->eq($joinAlias . '.option_id', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT))
			)
		);

		$qb->addSelect(
			$qb->createFunction('MAX(' . $joinAlias . '.score) AS trending_score')
		);
	}

	public function loadTrendingScoresForInquiries(array $inquiries): array
	{
		if (empty($inquiries)) {
			return $inquiries;
		}

		$inquiryIds = array_map(function ($inquiry) {
			return $inquiry instanceof Inquiry ? $inquiry->getId() : (int)$inquiry;
		}, $inquiries);

		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(TrendingScore::TABLE)
			->where($qb->expr()->in('inquiry_id', $qb->createNamedParameter($inquiryIds, IQueryBuilder::PARAM_INT_ARRAY)))
			->orderBy('updated_at', 'DESC');

		$stmt = $qb->executeQuery();
		$scores = [];
		while ($row = $stmt->fetch()) {
			$inquiryId = (int)$row['inquiry_id'];
			if (!isset($scores[$inquiryId])) {
				$scores[$inquiryId] = [];
			}
			$scores[$inquiryId][$row['option_id']] = [
				'score' => (float)$row['score'],
				'updated_at' => (int)$row['updated_at']
			];
		}
		$stmt->closeCursor();

		foreach ($inquiries as $inquiry) {
			if ($inquiry instanceof Inquiry) {
				$id = $inquiry->getId();
				if (isset($scores[$id])) {
					$inquiry->setTrendingScores($scores[$id]);
					if (isset($scores[$id][0])) {
						$inquiry->setTrendingScore($scores[$id][0]['score']);
					}
				}
			}
		}

		return $inquiries;
	}

	// ── CRUD ──

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

	public function findParticipantsByInquiry(int $inquiryId): array
	{
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
