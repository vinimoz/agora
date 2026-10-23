<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;
use OCA\Agora\AppConstants;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Helper\Container;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\Settings\SystemSettings;
use OCA\Agora\UserSession;
use OCA\Agora\Db\SupportEngine;
use OCP\IGroupManager;
use OCP\IURLGenerator;

/**
 * @psalm-api
 * @method int getId()
 * @method void setId(int $value)
 * @method int getCoverId()
 * @method void setCoverId(int $value)
 * @method string getType()
 * @method void setType(string $value)
 * @method string getTitle()
 * @method void setTitle(string $value)
 * @method void setDescription(string $value)
 * @method string getDescription()
 * @method string getOwner()
 * @method void setOwner(string $value)
 * @method int getCreated()
 * @method void setCreated(int $value)
 * @method int getExpire()
 * @method void setExpire(int $value)
 * @method int getDeleted()
 * @method void setDeleted(int $value)
 * @method void setPublicationStatus(string $value)
 * @method string getPublicationStatus()
 * @method string getModerationStatus()
 * @method void setModerationStatus(string $value)
 * @method string getInquiryStatus()
 * @method void setInquiryStatus(string $value)
 * @method int getAllowComment()
 * @method void setAllowComment(int $value)
 * @method string getSupportFeature()
 * @method void setSupportFeature(string $value)
 * @method string getShowResults()
 * @method void setShowResults(string $value)
 * @method string getOwnedGroup()
 * @method void setOwnedGroup(string $value)
 * @method int getLastInteraction()
 * @method void setLastInteraction(int $value)
 * @method int getCategoryId()
 * @method void setCategoryId(int $value)
 * @method int getLocationId()
 * @method void setLocationId(int $value)
 * @method int getParentId()
 * @method void setParentId(int $value)
 * @method int getArchived()
 * @method void setArchived(int $value)
 * @method string getVisibility()
 * @method void setVisibility(string $value)
 * @method array|null getVisibilityGroups()
 * @method void setVisibilityGroups(array|null $value)
 * Magic functions for joined columns
 * @method string getShareToken()
 * @method int getCurrentUserSupports()
 * @method int getCountParticipants()
 * @method int getCountComments()
 */
class Inquiry extends EntityWithUser implements JsonSerializable
{
	public const TABLE = 'agora_inquiries';

	public const VISIBILITY_PRIVATE = 'private';
	public const VISIBILITY_EVERYONE = 'everyone';
	public const VISIBILITY_GROUPS = 'groups';
	public const VISIBILITY_USERS = 'users';
	public const VISIBILITY_PARTICIPANTS = 'participants';


	// PublicationStatus types
	public const PUBLICATION_STATUS_DRAFT = 'draft';
	public const PUBLICATION_STATUS_PENDING = 'pending';
	public const PUBLICATION_STATUS_PUBLISHED = 'published';
	public const PUBLICATION_STATUS_ARCHIVED = 'archived';
	public const PUBLICATION_STATUS_DELETED = 'deleted';

	// ModerationStatus types
	public const MODERATION_STATUS_DRAFT = 'draft';
	public const MODERATION_STATUS_PENDING = 'pending';
	public const MODERATION_STATUS_PUBLISHED = 'published';
	public const MODERATION_STATUS_REJECTED = 'rejected';

	// Show results types
	public const SHOW_RESULTS_ALWAYS = 'always';
	public const SHOW_RESULTS_CLOSED = 'closed';
	public const SHOW_RESULTS_NEVER = 'never';

	// URI prefix
	public const URI_PREFIX = 'inquiry/';

	// Inquiry types (from main)
	public const TYPE_DEBATE = 'debate';
	public const TYPE_PROPOSAL = 'proposal';

	// User roles
	public const ROLE_USER = 'user';
	public const ROLE_ADMIN = 'admin';
	public const ROLE_EMAIL = 'email';
	public const ROLE_CONTACT = 'contact';
	public const ROLE_EXTERNAL = 'external';
	public const ROLE_OWNER = 'owner';
	public const ROLE_NONE = 'none';
	public const ROLE_COMISSIONS = 'comissions';
	public const ROLE_ASSOCIATIONS = 'associations';
	public const ROLE_MODERATOR = 'moderator';
	public const ROLE_OFFICIAL = 'official';

	// Permissions
	public const PERMISSION_OVERRIDE = 'override_permission';
	public const PERMISSION_INQUIRY_VIEW = 'view';
	public const PERMISSION_INQUIRY_EDIT = 'edit';
	public const PERMISSION_INQUIRY_CHANGE_OWNER = 'changeOwner';
	public const PERMISSION_INQUIRY_DELETE = 'delete';
	public const PERMISSION_INQUIRY_ARCHIVE = 'archive';
	public const PERMISSION_INQUIRY_RESULTS_VIEW = 'seeResults';
	public const PERMISSION_INQUIRY_USERNAMES_VIEW = 'seeUserNames';
	public const PERMISSION_INQUIRY_TAKEOVER = 'takeOver';
	public const PERMISSION_INQUIRY_SUBSCRIBE = 'subscribe';
	public const PERMISSION_COMMENT_ADD = 'addComment';
	public const PERMISSION_SUPPORT_ADD = 'addSupport';
	public const PERMISSION_COMMENT_DELETE = 'deleteComment';
	public const PERMISSION_SUPPORT_DELETE = 'deleteSupport';
	public const PERMISSION_INQUIRY_ADD = 'addInquiry';
	public const PERMISSION_INQUIRY_CONFIRM = 'confirmInquiry';
	public const PERMISSION_INQUIRYS_REORDER = 'reorderInquiries';
	public const PERMISSION_SUPPORT_EDIT = 'support';
	public const PERMISSION_SUPPORT_FOREIGN_CHANGE = 'changeForeignSupports';
	public const PERMISSION_SHARE_ADD = 'shareCreate';
	public const PERMISSION_SHARE_ADD_EXTERNAL = 'shareCreateExternal';
	public const PERMISSION_DEANONYMIZE = 'deanonymize';

	// Default status
	public const DEFAULT_STATUS_DRAFT = 'draft';

	/**
	 * Whitelist of participation policies allowed for each visibility.
	 * Enforced in setParticipationPolicy() so illegal combinations cannot
	 * be persisted through any code path.
	 *
	 *   private      → none
	 *   groups       → groups           (same group IDs as visibility)
	 *   users        → users            (same user IDs as visibility)
	 *   participants → none, everyone, users, groups, lottery
	 *   everyone     → none, everyone, users, groups, lottery
	 *   invitation   → none, everyone, users, groups, lottery
	 */
	private const ALLOWED_PARTICIPATION_BY_VISIBILITY = [
		self::VISIBILITY_PRIVATE => [
			Participation::POLICY_NONE,
		],
		self::VISIBILITY_GROUPS => [
			Participation::POLICY_GROUPS,
		],
		self::VISIBILITY_USERS => [
			Participation::POLICY_USERS,
		],
		self::VISIBILITY_PARTICIPANTS => [
			Participation::POLICY_NONE,
			Participation::POLICY_EVERYONE,
			Participation::POLICY_USERS,
			Participation::POLICY_GROUPS,
			Participation::POLICY_LOTTERY,
		],
		self::VISIBILITY_EVERYONE => [
			Participation::POLICY_NONE,
			Participation::POLICY_EVERYONE,
			Participation::POLICY_USERS,
			Participation::POLICY_GROUPS,
			Participation::POLICY_LOTTERY,
		],
	];

	private IURLGenerator $urlGenerator;
	private IGroupManager $groupManager;
	protected SystemSettings $systemSettings;
	protected AppSettings $appSettings;
	protected UserSession $userSession;

	// Schema columns
	public $id = null;
	protected ?int $coverId = null;
	protected string $type = '';
	protected string $title = '';
	protected ?string $description = null;
	protected int $locationId = 0;
	protected int $categoryId = 0;
	protected string $owner = '';
	protected int $created = 0;
	protected int $archived = 0;
	protected int $expire = 0;
	protected int $deleted = 0;
	protected string $ownedGroup = '';
	protected string $publicationStatus = '';
	protected string $showResults = '';
	protected int $lastInteraction = 0;
	protected int $forceConfidentialComments = 0;
	protected ?int $parentId = null;
	protected string $moderationStatus = self::DEFAULT_STATUS_DRAFT;
	protected string $inquiryStatus = self::DEFAULT_STATUS_DRAFT;
	protected ?int $allowComment = null;
	protected string $supportFeature = 'none';
	protected bool $hasSupported = false;
	protected mixed $supportValue = null;
	protected string $family = '';

	// 1.8 visibility model
	protected string $visibility = 'private';
	protected ?array $visibilityGroups = [];
	protected ?array $visibilityUsers = [];
	protected ?Participation $participationPolicy = null;
	protected bool $canParticipate = false;

	// Joined columns
	protected string $userRole = '';
	protected string $shareToken = '';
	protected int $currentUserSupports = 0;
	protected int $countParticipants = 0;
	protected int $countComments = 0;
	protected int $countSupports = 0;
	protected ?int $maxDate = 0;
	protected ?string $groupShares = '';
	protected ?string $inquiryGroups = '';
	protected ?string $inquiryGroupUserShares = '';
	protected ?string $miscSettingsConcat = '';
	protected ?string $supportResult = null;
	protected ?string $supportEngine = null;
	protected array $childs = [];

	// From main: share flag
	protected bool $isShared = false;

	// Dynamic fields for inquiry types
	protected array $miscFields = [];
	protected ?float $trendingScore = null;

	public function __construct()
	{
		$this->addType('coverId', 'integer');
		$this->addType('locationId', 'integer');
		$this->addType('categoryId', 'integer');
		$this->addType('created', 'integer');
		$this->addType('archived', 'integer');
		$this->addType('expire', 'integer');
		$this->addType('deleted', 'integer');
		$this->addType('ownedGroup', 'string');
		$this->addType('quorum', 'integer');
		$this->addType('visibility', 'string');
		$this->addType('visibilityGroups', 'json');
		$this->addType('lastInteraction', 'integer');
		$this->addType('parentId', 'integer');
		$this->addType('allowComment', 'integer');
		$this->addType('forceConfidentialComments', 'integer');

		// Joined Attributes
		$this->addType('isShared', 'boolean');
		$this->addType('currentUserSupports', 'integer');
		$this->addType('countParticipants', 'integer');
		$this->addType('countComments', 'integer');
		$this->addType('countSupports', 'integer');
		$this->addType('miscSettingsConcat', 'string');
		$this->addType('maxDate', 'integer');
		$this->addType('hasSupported', 'boolean');
		$this->addType('supportValue', 'string');
		$this->addType('supportResult', 'string');
		$this->addType('supportEngine', 'string');

		$this->urlGenerator = Container::queryClass(IURLGenerator::class);
		$this->groupManager = Container::queryClass(IGroupManager::class);
		$this->systemSettings = Container::queryClass(SystemSettings::class);
		$this->appSettings = Container::queryClass(AppSettings::class);
		$this->userSession = Container::queryClass(UserSession::class);
	}

	/**
	 * Serialize to JSON with consistent structure matching TypeScript interface
	 */
	public function jsonSerialize(): array
	{
		return [
			'id' => $this->getId(),
			'type' => $this->getType(),
			'family' => $this->getFamily(),
			'coverId' => $this->getCoverId(),
			'title' => $this->getTitle(),
			'description' => $this->getDescription(),
			'descriptionSafe' => $this->getDescriptionSafe(),
			'parentId' => $this->getParentId(),
			'locationId' => $this->getLocationId(),
			'categoryId' => $this->getCategoryId(),
			'owner' => $this->getUser(),
			'ownedGroup' => $this->getOwnedGroup(),
			'inquiryGroups' => $this->getInquiryGroups(),
			'childs' => $this->getChilds(),
			'miscFields' => $this->getMiscArray(),
			'configuration' => $this->getConfigurationArray(),
			'status' => $this->getStatusArray(),
			'currentUserStatus' => $this->getCurrentUserStatus(),
			'permissions' => $this->getPermissionsArray(),
			'trendingScore' => $this->getTrendingScore(),
			'participation' => $this->getParticipationPolicy()?->jsonSerialize(),
			'canParticipate' => $this->canParticipate(),
			'viewableByUser' => $this->isViewableByUser(),
		];
	}

	/**
	 * Get support value - handles JSON from database
	 * Returns the decoded value (could be int, string, array, etc.)
	 */
	private function supportValue(): mixed
	{
		if ($this->supportValue === null) {
			return null;
		}

		if (is_int($this->supportValue)) {
			return $this->supportValue;
		}

		if (is_string($this->supportValue)) {
			$decoded = json_decode($this->supportValue, true);
			if (json_last_error() === JSON_ERROR_NONE) {
				if (is_array($decoded) && isset($decoded['value'])) {
					return $decoded['value'];
				}
				if (is_array($decoded) && count($decoded) === 1) {
					return reset($decoded);
				}
				return $decoded;
			}
			if (is_numeric($this->supportValue)) {
				return (int)$this->supportValue;
			}
		}

		if (is_array($this->supportValue)) {
			if (isset($this->supportValue['value'])) {
				return $this->supportValue['value'];
			}
			if (count($this->supportValue) === 1) {
				return reset($this->supportValue);
			}
			return $this->supportValue;
		}

		return $this->supportValue;
	}

	// ── From main: share flag accessors ──
	public function getIsShared(): bool
	{
		return $this->isShared;
	}

	public function setIsShared(bool $value): void
	{
		$this->isShared = $value;
	}

	public function getTrendingScore(): ?float
	{
		return $this->trendingScore;
	}

	public function setTrendingScore(?float $score): void
	{
		$this->trendingScore = $score;
	}

	public function getMiscArray(): array
	{
		return $this->miscFields;
	}

	public function getDescriptionSafe(): string
	{
		return $this->getDescription() ?? '';
	}

	public function getSupportResult(): ?array
	{
		if ($this->supportResult === null || $this->supportResult === '') {
			return null;
		}
		$decoded = json_decode($this->supportResult, true);
		return is_array($decoded) ? $decoded : [];
	}

	private function getVisibleSupportResult(): ?array
	{
		$results = $this->getSupportResult();
		if (!$results || $this->getIsAllowed(self::PERMISSION_INQUIRY_EDIT)) {
			return $results;
		}
		$hidden = [];
		foreach ($this->getSupportEngine() as $engine) {
			$config = is_string($engine['config'] ?? null) ? json_decode($engine['config'], true) : ($engine['config'] ?? []);
			if (SupportEngine::hidesResults($config ?? [], $engine['status'] ?? '')) {
				$hidden[] = (int)$engine['id'];
			}
		}
		return array_values(array_filter(
			$results,
			fn ($r) => !in_array((int)($r['support_engine_id'] ?? 0), $hidden, true),
		));
	}

	public function getSupportEngine(): array
	{
		if ($this->supportEngine === null || $this->supportEngine === '') {
			return [];
		}
		$decoded = json_decode($this->supportEngine, true);
		return is_array($decoded) ? $decoded : [];
	}

	public function getStatusArray(): array
	{
		return [
			'moderationStatus' => $this->getModerationStatus(),
			'inquiryStatus' => $this->getInquiryStatus(),
			'publicationStatus' => $this->getPublicationStatus(),
			'lastInteraction' => $this->getLastInteraction(),
			'created' => $this->getCreated(),
			'isAnonymous' => $this->getIsAnonymous(),
			'isArchived' => (bool)$this->getArchived(),
			'isExpired' => $this->getExpired(),
			'relevantThreshold' => $this->getRelevantThreshold(),
			'deletionDate' => $this->getDeleted(),
			'archivedDate' => $this->getArchived(),
			'supportResult' => $this->getVisibleSupportResult(),
			'countSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountSupports() : 0,
			'countParticipants' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW)
				? $this->getCountParticipants()
				: 0,
			'countComments' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW)
				? $this->getCountComments()
				: 0,
		];
	}

	public function getCurrentUserStatus(): array
	{
		return [
			'groupInvitations' => $this->getGroupShares(),
			'isInvolved' => $this->getIsInvolved(),
			'isShared' => $this->getIsShared(),       // ← from main
			'hasSupported' => $this->hasSupported(),
			'supportValue' => $this->supportValue(),
			'isLocked' => $this->getIsLocked(),
			'isLoggedIn' => $this->userSession->getIsLoggedIn(),
			'isOwner' => $this->getIsInquiryOwner(),
			'shareToken' => $this->getShareToken(),
			'userId' => $this->userSession->getCurrentUserId(),
			'userRole' => $this->getUserRole(),
			'orphanedInquiries' => $this->getOrphanedInquiries(),
		];
	}

	public function getConfigurationArray(): array
	{
		return [
			'autoReminder' => $this->getAutoReminder(),
			'expire' => $this->getExpire(),
			'forceConfidentialComments' => $this->getForceConfidentialComments(),
			'allowComment' => $this->getAllowComment(),
			'supportFeature' => $this->getSupportFeature(),
			'supportEngine' => $this->getSupportEngine(),
			'visibility' => $this->getVisibility(),
			'visibilityGroups' => $this->getVisibilityGroups(),
		];
	}

	public function getPermissionsArray(): array
	{
		return [
			'view' => $this->getIsAllowed(self::PERMISSION_INQUIRY_VIEW),
			'edit' => $this->getIsAllowed(self::PERMISSION_INQUIRY_EDIT),
			'delete' => $this->getIsAllowed(self::PERMISSION_INQUIRY_DELETE),
			'archive' => $this->getIsAllowed(self::PERMISSION_INQUIRY_ARCHIVE),
			'support' => $this->getIsAllowed(self::PERMISSION_SUPPORT_ADD),
			'comment' => $this->getIsAllowed(self::PERMISSION_COMMENT_ADD),
			'addShares' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD),
			'addSharesExternal' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD_EXTERNAL),
			'changeForeignInquiries' => $this->getIsAllowed(self::PERMISSION_SUPPORT_FOREIGN_CHANGE),
			'changeOwner' => $this->getIsAllowed(self::PERMISSION_INQUIRY_CHANGE_OWNER),
			'reorderOptions' => $this->getIsAllowed(self::PERMISSION_INQUIRYS_REORDER),
			'seeResults' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW),
			'seeUsernames' => $this->getIsAllowed(self::PERMISSION_INQUIRY_USERNAMES_VIEW),
			'subscribe' => $this->getIsAllowed(self::PERMISSION_INQUIRY_SUBSCRIBE),
			'takeOver' => $this->getIsAllowed(self::PERMISSION_INQUIRY_TAKEOVER),
			'deanonymize' => $this->getIsAllowed(self::PERMISSION_DEANONYMIZE),
			'addOptions' => $this->getIsAllowed(self::PERMISSION_INQUIRY_ADD),
			'confirmOptions' => $this->getIsAllowed(self::PERMISSION_INQUIRY_CONFIRM),
			'clone' => $this->getAllowClone(),
		];
	}

	public function deserializeArray(array $inquiryConfiguration): self
	{
		$this->setPublicationStatus($inquiryConfiguration['publicationStatus'] ?? $this->getPublicationStatus());
		$this->setAutoReminder($inquiryConfiguration['autoReminder'] ?? $this->getAutoReminder());
		$this->setAllowComment($inquiryConfiguration['allowComment'] ?? $this->getAllowComment());
		$this->setSupportFeature($inquiryConfiguration['supportFeature'] ?? $this->getSupportFeature());
		$this->setExpire($inquiryConfiguration['expire'] ?? $this->getExpire());
		$this->setForceConfidentialComments($inquiryConfiguration['forceConfidentialComments'] ?? $this->getForceConfidentialComments());
		$this->setShowResults($inquiryConfiguration['showResults'] ?? $this->getShowResults());
		return $this;
	}

	// ── 1.8 participation policy ──
	public function getParticipationPolicy(): ?Participation
	{
		return $this->participationPolicy;
	}

	/**
	 * Set the participation policy after validating that it is compatible
	 * with the current visibility. Throws ForbiddenException on illegal
	 * combinations (e.g. private + everyone, groups + everyone, users + groups).
	 */
	public function setParticipationPolicy(?Participation $policy): void
	{
		if ($policy !== null) {
			$allowed = self::ALLOWED_PARTICIPATION_BY_VISIBILITY[$this->getVisibility()] ?? [];
			if (!in_array($policy->getPolicyType(), $allowed, true)) {
				throw new ForbiddenException(sprintf(
					'Participation policy "%s" is not allowed for visibility "%s"',
					$policy->getPolicyType(),
					$this->getVisibility()
				));
			}
		}

		$this->participationPolicy = $policy;
		$this->canParticipate = $this->evaluateCanParticipate();
	}

	/**
	 * Public entry point for "can the current user participate?".
	 * Delegates to evaluateCanParticipate() so the policy + visibility
	 * intersection logic lives in a single place.
	 */
	public function canParticipate(): bool
	{
		return $this->evaluateCanParticipate();
	}

	private function userIsInGroups(string $userId, array $groupIds): bool
	{
		try {
			$user = $this->userSession->getCurrentUser();
			if ($user === null) {
				return false;
			}

			// Agora's User wrapper
			if (method_exists($user, 'getGroups')) {
				$userGroups = $user->getGroups();
				return is_array($userGroups)
					&& !empty(array_intersect($groupIds, $userGroups));
			}

			// Raw IUser fallback
			if ($user instanceof \OCP\IUser) {
				$userGroups = $this->groupManager->getUserGroupIds($user);
				return !empty(array_intersect($groupIds, $userGroups));
			}
		} catch (\Exception $e) {
			// swallow
		}
		return false;
	}

	public function isViewableByUser(): bool
	{
		return $this->getIsAllowed(self::PERMISSION_INQUIRY_VIEW);
	}

	/**
	 * Whether the current user matches the visibility audience
	 * (groups → must be in a visibility group; users → must be listed;
	 * invitation → must be involved; everyone/participants → no extra filter).
	 */
	private function matchesVisibilityAudience(string $userId): bool
	{
		return match ($this->getVisibility()) {
			self::VISIBILITY_PRIVATE => false,
			self::VISIBILITY_GROUPS => $this->userIsInGroups($userId, $this->getVisibilityGroups()),
			self::VISIBILITY_USERS => in_array($userId, $this->getVisibilityUsers(), true),
			default => true,
		};
	}

	/**
	 * Core logic: resolve whether the current user may participate,
	 * taking both visibility defaults and the configured policy into account.
	 *
	 * Rules enforced:
	 *   private      + none                                            → none (owner excepted)
	 *   groups       + groups                                          → same group IDs
	 *   users        + users                                           → same user IDs
	 *   participants + none | everyone | users | groups | lottery      → audience = policy
	 *   everyone     + none | everyone | users | groups | lottery      → open view, policy restricts participation
	 */
	private function evaluateCanParticipate(): bool
	{
		$userId = $this->userSession->getCurrentUserId();
		$visibility = $this->getVisibility();
		$policyType = $this->participationPolicy?->getPolicyType();

		// The owner is never "external" — always allowed to act on their own inquiry.
		if ($userId !== null && $this->getIsInquiryOwner()) {
			return true;
		}

		// ── No policy configured → derive from visibility ──
		if ($policyType === null) {
			if ($userId === null) {
				// Anonymous can only participate in an "everyone" inquiry
				return $visibility === self::VISIBILITY_EVERYONE;
			}

			return match ($visibility) {
				self::VISIBILITY_PRIVATE => false,
				self::VISIBILITY_GROUPS => $this->userIsInGroups($userId, $this->getVisibilityGroups()),
				self::VISIBILITY_USERS => in_array($userId, $this->getVisibilityUsers(), true),
				// "participants" without a policy has no defined audience
				self::VISIBILITY_PARTICIPANTS => false,
				// "everyone" is open by default
				default => true,
			};
		}

		// ── Policy configured ──
		if ($userId === null) {
			return $policyType === Participation::POLICY_EVERYONE
				&& $visibility === self::VISIBILITY_EVERYONE;
		}

		$policy = $this->participationPolicy;

		switch ($policyType) {
			case Participation::POLICY_NONE:
				return false;

			case Participation::POLICY_EVERYONE:
				// Even under groups/users visibility, "everyone" still means
				// "everyone who can already see it" → intersect with audience.
				return $this->matchesVisibilityAudience($userId);

			case Participation::POLICY_USERS:
				// Rule: users-visibility ⇒ same user IDs for visibility and participation.
				if ($visibility === self::VISIBILITY_USERS) {
					return in_array($userId, $this->getVisibilityUsers(), true);
				}
				$config = $policy->getPolicyConfig();
				$allowedUsers = $config['user_ids'] ?? [];
				if (!in_array($userId, $allowedUsers, true)) {
					return false;
				}
				return $this->matchesVisibilityAudience($userId);

			case Participation::POLICY_GROUPS:
				// Rule: groups-visibility ⇒ same group IDs for visibility and participation.
				if ($visibility === self::VISIBILITY_GROUPS) {
					return $this->userIsInGroups($userId, $this->getVisibilityGroups());
				}
				$config = $policy->getPolicyConfig();
				$allowedGroups = $config['group_ids'] ?? [];
				return !empty($allowedGroups)
					&& $this->userIsInGroups($userId, $allowedGroups);

			case Participation::POLICY_LOTTERY:
				$config = $policy->getLotteryConfig();
				return $this->userIsInLotteryPool($userId, $config);

			default:
				return false;
		}
	}

	private function userIsInLotteryPool(string $userId, array $config): bool
	{
		$pool = $config['pool'] ?? [];
		return in_array($userId, $pool);
	}

	// Status helpers
	public function getExpired(): bool
	{
		$expiry = $this->getExpire();
		return ($expiry > 0 && $expiry < time());
	}

	public function getIsAnonymous(): bool
	{
		return false;
	}

	public function getIsLocked(): bool
	{
		return false;
	}

	public function getUserRole(): string
	{
		if ($this->getCurrentUserIsEntityUser()) {
			return self::ROLE_OWNER;
		}

		$evaluatedRole = $this->userRole;

		if ($this->getInquiryGroupUserShares() && !$evaluatedRole) {
			foreach ($this->getInquiryGroupUserShares() as $shareType) {
				if ($shareType === self::ROLE_ADMIN) {
					$evaluatedRole = self::ROLE_ADMIN;
					break;
				}
			}
		}

		if ($evaluatedRole === self::ROLE_ADMIN) {
			return self::ROLE_ADMIN;
		}

		if ($evaluatedRole) {
			return $evaluatedRole;
		}

		return self::ROLE_NONE;
	}

	public function getOrphanedInquiries(): int
	{
		return 0;
	}

	private function getMaxDate(): int
	{
		if ($this->maxDate === null) {
			return 0;
		}
		return $this->maxDate;
	}

	public function setMiscFields(array $misc): void
	{
		foreach ($misc as $field) {
			$key = $field->getKey();
			$this->miscFields[$key] = $field->getValue() ?? null;
		}
	}

	public function initializeMiscFields(array $fieldsDefinition): void
	{
		foreach ($fieldsDefinition as $field) {
			$key = $field['key'];
			$this->miscFields[$key] = $field['default'] ?? null;
		}
	}

	public function getMiscField(string $key): mixed
	{
		return $this->miscFields[$key] ?? null;
	}

	public function setMiscField(string $key, mixed $value): void
	{
		$this->miscFields[$key] = $value;
	}

	public function getInquiryUrl(): string
	{
		return $this->urlGenerator->linkToRouteAbsolute(
			AppConstants::APP_ID . '.page.inquiry',
			['id' => $this->getId()]
		);
	}

	public function setChilds(array $childs): void
	{
		$this->childs = $childs;
	}

	public function getChilds(): array
	{
		return $this->childs;
	}

	public function getInquiryId(): int
	{
		return (int)$this->getId();
	}

	public function getUserId(): string
	{
		return $this->getOwner();
	}

	public function setUserId(string $userId): void
	{
		$this->setOwner($userId);
	}

	private function getGroupShares(): array
	{
		if ($this->groupShares !== null && $this->groupShares !== '') {
			return array_filter(explode(InquiryMapper::CONCAT_SEPARATOR, InquiryMapper::CONCAT_SEPARATOR . $this->groupShares));
		}
		return [];
	}

	public function getInquiryGroups(): array
	{
		if (!$this->inquiryGroups) {
			return [];
		}
		return array_map('intval', explode(InquiryGroup::CONCAT_SEPARATOR, $this->inquiryGroups));
	}

	public function getInquiryGroupUserShares(): array
	{
		if (!$this->inquiryGroupUserShares) {
			return [];
		}
		return explode(InquiryGroup::CONCAT_SEPARATOR, $this->inquiryGroupUserShares);
	}

	private function getRelevantThreshold(): int
	{
		return max(
			$this->getCreated(),
			$this->getLastInteraction(),
			$this->getExpire(),
			$this->getMaxDate(),
		);
	}

	private function getAutoReminder(): bool
	{
		return (bool)($this->getMiscField('autoReminder') ?? false);
	}

	private function setAutoReminder(bool|int $value): void
	{
		$this->setMiscField('autoReminder', (bool)$value);
	}

	public function setForceConfidentialComments(bool|int $value): void
	{
		$this->setMiscField('forceConfidentialComments', (bool)$value);
	}

	public function getForceConfidentialComments(): bool
	{
		return (bool)($this->getMiscField('forceConfidentialComments') ?? false);
	}

	public function request(string $permission): bool
	{
		if (!$this->getIsAllowed($permission)) {
			throw new ForbiddenException('denied permission ' . $permission);
		}
		return true;
	}

	public function getIsAllowed(string $permission): bool
	{
		return match ($permission) {
			self::PERMISSION_COMMENT_ADD => $this->getAllowCommenting(),
			self::PERMISSION_SUPPORT_ADD => $this->getSupportFeaturing(),
			self::PERMISSION_COMMENT_DELETE => $this->getAllowDeleteComment(),
			self::PERMISSION_SUPPORT_DELETE => $this->getAllowDeleteSupport(),
			self::PERMISSION_INQUIRY_ADD => $this->getAllowAddInquiry(),
			self::PERMISSION_INQUIRY_CONFIRM => $this->getAllowConfirmInquiry(),
			self::PERMISSION_INQUIRY_DELETE => $this->getAllowDeleteInquiry(),
			self::PERMISSION_INQUIRYS_REORDER => $this->getAllowReorderInquiries(),
			self::PERMISSION_OVERRIDE => true,
			self::PERMISSION_INQUIRY_VIEW => $this->getAllowVisibilityInquiry(),
			self::PERMISSION_INQUIRY_EDIT => $this->getAllowEditInquiry(),
			self::PERMISSION_INQUIRY_ARCHIVE => $this->getAllowEditInquiry(),
			self::PERMISSION_INQUIRY_TAKEOVER => $this->getAllowTakeOver(),
			self::PERMISSION_INQUIRY_CHANGE_OWNER => $this->getAllowChangeOwner(),
			self::PERMISSION_INQUIRY_SUBSCRIBE => $this->getAllowSubscribeToInquiry(),
			self::PERMISSION_INQUIRY_RESULTS_VIEW => $this->getAllowShowResults(),
			self::PERMISSION_SUPPORT_EDIT => $this->getSupportFeaturing(),
			self::PERMISSION_SUPPORT_FOREIGN_CHANGE => $this->getAllowChangeForeignSupports(),
			self::PERMISSION_SHARE_ADD => $this->systemSettings->getShareCreateAllowed(),
			self::PERMISSION_SHARE_ADD_EXTERNAL => $this->systemSettings->getExternalShareCreationAllowed(),
			self::PERMISSION_DEANONYMIZE => $this->getAllowDeanonymize(),
			default => false,
		};
	}

	private function getAllowClone(): bool
	{
		return $this->getAllowEditInquiry() && !$this->getExpired();
	}

	private function getIsInvolved(): bool
	{
		return (
			$this->getIsInquiryOwner()
			|| $this->getIsParticipant()
			|| $this->getIsPersonallyInvited()
			|| $this->getIsInvitedViaGroupShare()
			|| $this->getIsShared()          // ← from main
		);
	}

	/**
	 * Open-inquiry shortcut: only for public (visibility=everyone) inquiries.
	 * NOTE: this no longer unlocks edit — see getAllowEditInquiry().
	 */
	private function getIsOpenInquiry(): bool
	{
		return $this->getVisibility() === self::VISIBILITY_EVERYONE
			&& $this->userSession->getIsLoggedIn();
	}

	private function hasSupported(): bool
	{
		return $this->hasSupported;
	}

	private function getIsParticipant(): bool
	{
		return $this->getCurrentUserSupports() > 0;
	}

	private function getIsInvitedViaGroupShare(): bool
	{
		if (!$this->userSession->getIsLoggedIn()) {
			return false;
		}
		return count($this->getGroupSharesForUser()) > 0;
	}

	private function getGroupSharesForUser(): array
	{
		return array_filter(
			$this->getGroupShares(),
			function ($groupName) {
				return $this->userSession->getCurrentUser()->getIsInGroup($groupName);
			}
		);
	}

	private function getIsPersonallyInvited(): bool
	{
		return in_array(
			$this->getUserRole(),
			[
				self::ROLE_ADMIN,
				self::ROLE_USER,
				self::ROLE_EXTERNAL,
				self::ROLE_EMAIL,
				self::ROLE_CONTACT,
			]
		);
	}

	private function getIsDelegatedAdmin(): bool
	{
		return $this->getUserRole() === self::ROLE_ADMIN;
	}

	/**
	 * Edit permission is strictly: console, owner, or delegated admin.
	 *
	 * The previous `getIsOpenInquiry()` short-circuit has been removed:
	 * it allowed any logged-in user to edit any `everyone`-visible inquiry,
	 * which is a privilege escalation that bypasses every visibility rule.
	 */
	private function getAllowEditInquiry(): bool
	{
		if (defined('OC_CONSOLE')) {
			return true;
		}

		if ($this->getIsInquiryOwner()) {
			return true;
		}

		if ($this->getIsDelegatedAdmin()) {
			return true;
		}

		return false;
	}

	private function getAllowTakeOver(): bool
	{
		return $this->userSession->getCurrentUser()->getIsAdmin();
	}

	private function getAllowChangeOwner(): bool
	{
		return $this->getAllowEditInquiry()
			|| $this->userSession->getCurrentUser()->getIsAdmin();
	}

	/**
	 * Visibility gate — enforces the "who can view" half of the rules:
	 *   private      → owner/admin only (handled above)
	 *   groups       → member of a visibility group
	 *   users        → explicitly listed user
	 *   participants → derived from the participation policy
	 *   invitation   → involved user (share / invited)
	 *   everyone     → any logged-in user
	 */
	private function getAllowVisibilityInquiry(): bool
	{
		if (defined('OC_CONSOLE')) {
			return true;
		}

		if ($this->getAllowEditInquiry()) {
			return true;
		}

		if ($this->getDeleted() || $this->getArchived()) {
			return false;
		}

		$user = $this->userSession->getCurrentUser();
		if ($user === null) {
			// Anonymous: only public (everyone) inquiries are reachable here;
			// share-token flows are handled by the share/controller layer.
			return $this->getVisibility() === self::VISIBILITY_EVERYONE;
		}

		if ($user->getIsModerator()
			&& $this->getModerationStatus() === self::MODERATION_STATUS_PENDING) {
			return true;
		}

		if (in_array($this->getModerationStatus(), [
			self::MODERATION_STATUS_DRAFT,
			self::MODERATION_STATUS_REJECTED,
		], true)) {
			return false;
		}

		switch ($this->getVisibility()) {
			case self::VISIBILITY_PRIVATE:
				// Owner/admin already returned above → no one else can view.
				return false;

			case self::VISIBILITY_GROUPS:
				return $this->isVisibleToAnyGroup($user->getGroups());

			case self::VISIBILITY_USERS:
				return in_array($user->getId(), $this->getVisibilityUsers(), true);

			case self::VISIBILITY_PARTICIPANTS:
				// The audience is derived from the participation policy.
				return $this->canParticipate();

			case self::VISIBILITY_EVERYONE:
				return $this->userSession->getIsLoggedIn();

			default:
				// Legacy fallback for pre-1.8 records
				if ($this->getIsOpenInquiry()) {
					return true;
				}
				if ($this->getIsPersonallyInvited() || $this->getIsInvitedViaGroupShare()) {
					return true;
				}
				$share = $this->userSession->getShare();
				return (bool)($share->getId() && $share->getInquiryId() === $this->getId());
		}
	}

	private function getAllowDeleteInquiry(): bool
	{
		if ($this->getAllowEditInquiry()) {
			return true;
		}
		return $this->userSession->getCurrentUser()->getIsAdmin();
	}

	private function getAllowAddInquiry(): bool
	{
		if ($this->getAllowEditInquiry()) {
			return true;
		}

		if (!$this->getAllowVisibilityInquiry()) {
			return false;
		}

		if ($this->userSession->getShare()->getType() === 'public') {
			return false;
		}

		return true;
	}

	private function getAllowConfirmInquiry(): bool
	{
		return $this->getAllowEditInquiry() && $this->getExpired();
	}

	private function getAllowReorderInquiries(): bool
	{
		return $this->getAllowEditInquiry() && !$this->getExpired();
	}

	public function matchUser(string $userId): bool
	{
		return $this->userSession->getCurrentUser()->getId() === $userId;
	}

	public function getIsInquiryOwner(): bool
	{
		return ($this->getUserRole() === self::ROLE_OWNER);
	}

	public function getIsHaveParticipated(): bool
	{
		$userId = $this->userSession->getCurrentUser()->getId();
		foreach ($this->childs as $child) {
			if (method_exists($child, 'getUserId') && $child->getUserId() === $userId) {
				return true;
			}
			if (is_array($child) && isset($child['userId']) && $child['userId'] === $userId) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Comments are participation — the user must be able to see the inquiry
	 * AND be allowed to participate according to the visibility/policy rules.
	 */
	private function getAllowCommenting(): bool
	{
		if (!$this->getAllowVisibilityInquiry()) {
			return false;
		}

		if (!$this->canParticipate()) {
			return false;
		}

		if ($this->userSession->getShare()->getType() === 'public') {
			return false;
		}

		return (bool)$this->getAllowComment();
	}

	/**
	 * Voting/support is participation — same gate as commenting.
	 */
	private function getSupportFeaturing(): bool
	{
		if (!$this->getAllowVisibilityInquiry()) {
			return false;
		}

		if (!$this->canParticipate()) {
			return false;
		}

		if ($this->getSupportFeature() === 'none') {
			return false;
		}
		return true;
	}

	private function getAllowDeleteSupport(): bool
	{
		return $this->getAllowEditInquiry();
	}

	private function getAllowDeleteComment(): bool
	{
		return $this->getAllowEditInquiry();
	}

	private function getAllowChangeForeignSupports(): bool
	{
		return $this->getAllowEditInquiry() && $this->getUser()->getIsUnrestrictedInquiryOwner();
	}

	private function getAllowDeanonymize(): bool
	{
		return $this->getAllowEditInquiry() && $this->getUser()->getIsUnrestrictedInquiryOwner();
	}

	private function getAllowSubscribeToInquiry(): bool
	{
		if (!$this->getAllowVisibilityInquiry()) {
			return false;
		}

		return $this->userSession->getCurrentUser()->getHasEmail();
	}

	private function getAllowShowResults(): bool
	{
		if ($this->getAllowEditInquiry()) {
			return true;
		}

		if (!$this->getAllowVisibilityInquiry()) {
			return false;
		}

		if ($this->getShowResults() === self::SHOW_RESULTS_CLOSED && $this->getExpired()) {
			return true;
		}

		return $this->getShowResults() === self::SHOW_RESULTS_ALWAYS;
	}

	/**
	 * @return string[]
	 */
	public function getVisibilityUsers(): array
	{
		return $this->visibilityUsers ?? [];
	}

	public function setVisibilityUsers(array $visibilityUsers): void
	{
		$this->visibilityUsers = $visibilityUsers;
	}

	/**
	 * @return string[]
	 */
	public function getVisibilityGroups(): array
	{
		return $this->visibilityGroups ?? [];
	}

	/**
	 * @param string[] $visibilityGroups
	 */
	public function setVisibilityGroups(array $visibilityGroups): void
	{
		$this->visibilityGroups = $visibilityGroups;
	}

	public function getVisibilityGroupsString(): string
	{
		return implode(',', $this->visibilityGroups ?? []);
	}

	public function isVisibleToGroup(string $groupId): bool
	{
		return in_array($groupId, $this->visibilityGroups ?? [], true);
	}

	public function isVisibleToAnyGroup(array $groupIds): bool
	{
		return !empty(array_intersect($groupIds, $this->visibilityGroups ?? []));
	}

	public function hasGroupRelation(string $groupId, string $relationType = 'visibility'): bool
	{
		if ($relationType === 'visibility') {
			return in_array($groupId, $this->visibilityGroups ?? [], true);
		}
		return false;
	}

	public function getGroupsForRelation(string $relationType): array
	{
		if ($relationType === 'visibility') {
			return $this->getVisibilityGroups();
		}
		return [];
	}

	// Family management
	public function setFamily(?string $family): void
	{
		$this->family = $family ?? '';
	}

	public function getFamily(): ?string
	{
		return $this->family;
	}
}
