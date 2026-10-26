<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Helper\Container;
use OCA\Agora\UserSession;
use OCP\IGroupManager;

/**
 * @psalm-api
 * @method int getId()
 * @method void setId(int $value)
 * @method ?int getParentId()
 * @method void setParentId(?int $value)
 * @method int getCreated()
 * @method void setCreated(int $value)
 * @method int getDeleted()
 * @method void setDeleted(int $value)
 * @method ?string getDescription()
 * @method void setDescription(?string $value)
 * @method string getGroupStatus()
 * @method void setGroupStatus(string $value)
 * @method string getType()
 * @method void setType(string $value)
 * @method string getOwner()
 * @method void setOwner(string $value)
 * @method string getTitle()
 * @method void setTitle(string $value)
 * @method ?string getTitleExt()
 * @method void setTitleExt(?string $value)
 * @method ?string getOwnedGroup()
 * @method void setOwnedGroup(?string $value)
 * @method int getOrder()
 * @method void setOrder(int $value)
 * @method ?int getExpire()
 * @method void setExpire(?int $value)
 * @method ?string getMetadata()
 * @method void setMetadata(?string $value)
 * @method ?int getCoverId()
 * @method void setCoverId(?int $value)
 * @method string getVisibility()
 * @method void setVisibility(string $value)
 */
class InquiryGroup extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inq_group';
    public const RELATION_TABLE = 'agora_groups_inquiries';
    public const CONCAT_SEPARATOR = ',';

    public const STATUS_ACTIVE = 'active';
    public const STATUS_ARCHIVED = 'archived';
    public const STATUS_DRAFT = 'draft';

    public const PERMISSION_VIEW = 'view';
    public const PERMISSION_EDIT = 'edit';
    public const PERMISSION_DELETE = 'delete';
    public const PERMISSION_ADD_INQUIRIES = 'addInquiries';
    public const PERMISSION_REORDER_INQUIRIES = 'reorderInquiries';
    public const PERMISSION_CHANGE_OWNER = 'changeOwner';
    public const PERMISSION_ARCHIVE = 'archive';
    public const PERMISSION_CLONE = 'clone';

    public const VISIBILITY_INVITATION = 'invitation';
    public const VISIBILITY_PRIVATE = 'private';
    public const VISIBILITY_EVERYONE = 'everyone';
    public const VISIBILITY_GROUPS = 'groups';
    public const VISIBILITY_USERS = 'users';
    public const VISIBILITY_PARTICIPANTS = 'participants';

    protected UserSession $userSession;
    protected IGroupManager $groupManager;

    // ── Schema columns ────────────────────────────────────────────────
    public $id = null;
    protected ?int $parentId = null;
    protected int $created = 0;
    protected int $deleted = 0;
    protected string $title = '';
    protected string $owner = '';
    protected string $type = 'default';
    protected string $visibility = self::VISIBILITY_EVERYONE;
    /** @var string[] */
    protected array $visibilityGroups = [];
    /** @var string[] */
    protected array $visibilityUsers = [];
    protected string $groupStatus = self::STATUS_ACTIVE;
    protected ?string $ownedGroup = null;
    protected ?string $description = null;
    protected ?string $titleExt = null;
    protected int $order = 0;
    protected ?int $expire = null;
    protected ?array $metadata = null;
    protected ?int $coverId = null;
    protected ?bool $protected = false;
    protected ?bool $allowEdit = false;
    protected ?string $supportResult = null;
    protected ?string $supportEngine = null;

    // ── Joined / injected data ───────────────────────────────────────
    protected ?string $inquiryIds = '';
    protected array $miscFields = [];
    protected array $childs = [];

    public function __construct()
    {
        $this->addType('parentId', 'integer');
        $this->addType('created', 'integer');
        $this->addType('deleted', 'integer');
        $this->addType('title', 'string');
        $this->addType('owner', 'string');
        $this->addType('type', 'string');
        $this->addType('visibility', 'string');
        $this->addType('visibilityGroups', 'json');
        $this->addType('visibilityUsers', 'json');
        $this->addType('groupStatus', 'string');
        $this->addType('ownedGroup', 'string');
        $this->addType('description', 'string');
        $this->addType('titleExt', 'string');
        $this->addType('order', 'integer');
        $this->addType('expire', 'integer');
        $this->addType('metadata', 'json');
        $this->addType('coverId', 'integer');
        $this->addType('protected', 'boolean');
        $this->addType('allowEdit', 'boolean');
        $this->addType('supportResult', 'string');
        $this->addType('supportEngine', 'string');
        $this->addType('inquiryIds', 'string');
        $this->addType('miscFields', 'json');
        $this->addType('childs', 'json');

        $this->userSession = Container::queryClass(UserSession::class);
        $this->groupManager = Container::queryClass(IGroupManager::class);
    }

    // ── Visibility ────────────────────────────────────────────────────

    public function getVisibility(): string
    {
        return $this->visibility;
    }

    public function setVisibility(string $visibility): void
    {
        $allowed = [
            self::VISIBILITY_INVITATION,
            self::VISIBILITY_PRIVATE,
            self::VISIBILITY_EVERYONE,
            self::VISIBILITY_GROUPS,
            self::VISIBILITY_USERS,
            self::VISIBILITY_PARTICIPANTS,
        ];
        $this->visibility = in_array($visibility, $allowed, true)
            ? $visibility
            : self::VISIBILITY_EVERYONE;
    }

    /**
     * @return string[]
     */
    public function getVisibilityGroups(): array
    {
        return $this->visibilityGroups ?? [];
    }

    public function setVisibilityGroups(?array $visibilityGroups): void
    {
        $this->visibilityGroups = $visibilityGroups ?? [];
    }

    /**
     * @return string[]
     */
    public function getVisibilityUsers(): array
    {
        return $this->visibilityUsers ?? [];
    }

    public function setVisibilityUsers(?array $visibilityUsers): void
    {
        $this->visibilityUsers = $visibilityUsers ?? [];
    }

    // ── Protected / allowEdit ─────────────────────────────────────────

    public function getProtected(): bool
    {
        return $this->protected ?? false;
    }

    public function setProtected(bool $protected): void
    {
        $this->protected = $protected ?? false;
    }

    public function getAllowEdit(): bool
    {
        return $this->allowEdit ?? false;
    }

    public function setAllowEdit(bool $allow): void
    {
        $this->allowEdit = $allowi ?? false;
    }

    // ── Support ───────────────────────────────────────────────────────

    public function getSupportResult(): ?array
    {
        if ($this->supportResult === null || $this->supportResult === '') {
            return null;
        }
        $decoded = json_decode($this->supportResult, true);
        return is_array($decoded) ? $decoded : [];
    }

    public function setSupportResult(?array $value): void
    {
        $this->supportResult = $value === null ? null : json_encode($value);
    }

    public function getSupportEngine(): array
    {
        if ($this->supportEngine === null || $this->supportEngine === '') {
            return [];
        }
        $decoded = json_decode($this->supportEngine, true);
        return is_array($decoded) ? $decoded : [];
    }

    public function setSupportEngine(?array $value): void
    {
        $this->supportEngine = $value === null ? null : json_encode($value);
    }

    // ── Inquiry IDs ───────────────────────────────────────────────────

    /**
     * @return int[]
     */
    public function getInquiryIds(): array
    {
        if (!$this->inquiryIds) {
            return [];
        }
        return array_map('intval', explode(self::CONCAT_SEPARATOR, $this->inquiryIds));
    }

    public function setInquiryIds(array $inquiryIds): void
    {
        $this->inquiryIds = implode(self::CONCAT_SEPARATOR, array_map('intval', $inquiryIds));
    }

    public function hasInquiry(int $inquiryId): bool
    {
        return in_array($inquiryId, $this->getInquiryIds(), true);
    }

    // ── Children ──────────────────────────────────────────────────────

    public function getChilds(): array
    {
        return $this->childs;
    }

    public function setChilds(array $childs): void
    {
        $this->childs = $childs;
    }

    // ── Misc fields ───────────────────────────────────────────────────

    public function getMiscArray(): array
    {
        return $this->miscFields;
    }

    /** Alias of {@see getMiscArray()} for callers that prefer the plural form. */
    public function getMiscFields(): array
    {
        return $this->miscFields;
    }

    /**
     * Accepts either:
     *   - a list of ['key' => ..., 'value' => ...] entries, or
     *   - a plain key => value map.
     */
    public function setMiscFields(array $misc): void
    {
        foreach ($misc as $key => $value) {
            if (is_array($value) && isset($value['key'])) {
                // list-of-definitions format
                $fieldKey = (string) $value['key'];
                $this->miscFields[$fieldKey] = $value['value'] ?? null;
                continue;
            }
            // plain key => value map
            if (is_string($key) || is_int($key)) {
                $this->miscFields[(string) $key] = $value;
            }
        }
    }

    public function initializeMiscFields(array $fieldsDefinition): void
    {
        foreach ($fieldsDefinition as $field) {
            $key = $field['key'] ?? null;
            if ($key !== null) {
                $this->miscFields[(string) $key] = $field['default'] ?? null;
            }
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

    // ── Slug ──────────────────────────────────────────────────────────

    public function getSlug(): string
    {
        $slug = preg_replace('/[^a-zA-Z0-9\s]/', '', $this->getTitle() ?: 'group');
        if ($slug === '' || $slug === null) {
            $slug = 'group';
        }
        return strtolower(str_replace(' ', '-', $slug)) . '-' . $this->getId();
    }

    // ── Role ──────────────────────────────────────────────────────────

    public function getUserRole(): string
    {
        $currentUserId = $this->userSession->getCurrentUserId();
        if ($this->getOwner() === $currentUserId) {
            return 'owner';
        }
        if ($this->userSession->isAdmin()) {
            return 'admin';
        }
        return 'user';
    }

    // ── Frontend objects ──────────────────────────────────────────────

    public function getConfigurationArray(): array
    {
        return [
            'visibility' => $this->getVisibility(),
            'visibilityGroups' => $this->getVisibilityGroups(),
            'visibilityUsers' => $this->getVisibilityUsers(),
            'expire' => $this->getExpire(),
            'supportEngine' => $this->getSupportEngine(),
            'description' => $this->getDescription(),
            'protected' => $this->getProtected(),
            'titleExt' => $this->getTitleExt(),
        ];
    }

    public function getStatusArray(): array
    {
        return [
            'groupStatus' => $this->getGroupStatus(),
            'created' => $this->getCreated(),
            'deleted' => $this->getDeleted(),
            'supportResult' => $this->getSupportResult(),
        ];
    }

/**
 * True when the current user has an explicit "participation" relation
 * on this inquiry-group, or matches the group's Participation policy
 * (everyone / users / groups / lottery selections).
 */
private function isCurrentUserParticipant(): bool
{
    $logger = \OC::$server->get(\Psr\Log\LoggerInterface::class);

    try {
        $userId = $this->userSession->getCurrentUserId();
    } catch (\Throwable $e) {
        $logger->warning('Agora isCurrentUserParticipant: getCurrentUserId failed', ['exception' => $e]);
        return false;
    }

    $groupId = $this->getId();
    if ($groupId === null || $userId === '' || $userId === 'CONSOLE') {
        // $logger->info('Agora isCurrentUserParticipant: bail', ['groupId' => $groupId, 'userId' => $userId]);
        return false;
    }

    // 1) Explicit user relation
    try {
        /** @var UserRelationMapper $userRelationMapper */
        $userRelationMapper = Container::queryClass(UserRelationMapper::class);
        if ($userRelationMapper->hasUserForTarget(
            UserRelation::TARGET_INQUIRY_GROUP,
            $groupId,
            UserRelation::RELATION_PARTICIPATION,
            $userId
        )) {
            return true;
        }
    } catch (\Throwable $e) {
        $logger->warning('Agora isCurrentUserParticipant: UserRelationMapper failed', ['exception' => $e]);
        // do NOT return false here — still try the policy below
    }

    // 2) Participation policy
    try {
        /** @var ParticipationMapper $participationMapper */
        $participationMapper = Container::queryClass(ParticipationMapper::class);
        $participation = $participationMapper->findByTargetWithRelations(
            Participation::TARGET_INQUIRY_GROUP,
            $groupId
        );

        if ($participation === null) {
            $logger->info('Agora isCurrentUserParticipant: no Participation row', ['groupId' => $groupId]);
            return false;
        }

//        $logger->info('Agora isCurrentUserParticipant: policy', [
//            'groupId'    => $groupId,
//            'policyType' => $participation->getPolicyType(),
//            'config'     => $participation->getPolicyConfig(),
//            'userId'     => $userId,
//        ]);

        if ($participation->isEveryone()) {
            return true;
        }

        $config   = $participation->getPolicyConfig() ?? [];
        $userIds  = $config['user_ids']  ?? [];
        $groupIds = $config['group_ids'] ?? [];

        if (in_array($userId, $userIds, true)) {
            return true;
        }

        if (!empty($groupIds)) {
            $userGroups = $this->userSession->getCurrentUser()->getGroups();
            if (!empty(array_intersect($groupIds, $userGroups))) {
                return true;
            }
        }

        if ($participation->isLottery()) {
            $selections = $config['lottery']['selections'] ?? [];
            $userGroups = $this->userSession->getCurrentUser()->getGroups();
            foreach ($selections as $sel) {
                $type = $sel['selected_type'] ?? $sel['type'] ?? null;
                $id   = $sel['selected_id']   ?? $sel['id']   ?? null;
                if ($type === 'user'  && $id === $userId) {
                    return true;
                }
                if ($type === 'group' && in_array($id, $userGroups, true)) {
                    return true;
                }
            }
        }
    } catch (\Throwable $e) {
        $logger->error('Agora isCurrentUserParticipant: policy check failed', [
            'groupId'   => $groupId,
            'exception' => $e,
        ]);
        return false;
    }

    return false;
}

public function getCurrentUserStatus(): array
{
    $isOwner     = $this->getOwner() === $this->userSession->getCurrentUserId();
    $isLoggedIn  = $this->userSession->getIsLoggedIn();
    $isAdmin     = $this->userSession->isAdmin();
    $isGroupEditor = $isLoggedIn && (bool) $this->userSession->getCurrentUser()->getIsGroupEditor();
    $isParticipant = $isLoggedIn && $this->isCurrentUserParticipant();

    return [
        'isOwner'       => $isOwner,
        'isLoggedIn'    => $isLoggedIn,
        'userId'        => $this->userSession->getCurrentUserId(),
        'userRole'      => $this->getUserRole(),
        'canEdit'       => $this->getAllowEdit() || $isAdmin,
        'isProtected'   => $this->getProtected(),
        'isGroupEditor' => $isGroupEditor,
        'isParticipant' => $isParticipant,
    ];
}

public function getPermissionsArray(): array
{
    $currentUserId = $this->userSession->getCurrentUserId();
    $isLoggedIn    = $this->userSession->getIsLoggedIn();
    $isAdmin       = $this->userSession->isAdmin();
    $isOwner       = $this->getOwner() === $currentUserId;
    $isProtected   = $this->getProtected();

    $canEdit       = $this->getAllowEdit() || $isOwner || $isAdmin;

    $isGroupEditor = false;
    $isParticipant = false;
    if ($isLoggedIn) {
        try {
            $isGroupEditor = (bool) $this->userSession->getCurrentUser()->getIsGroupEditor();
        } catch (\Throwable $e) {
            $isGroupEditor = false;
        }
        $isParticipant = $this->isCurrentUserParticipant();
    }

    $canAddInquiries = $isLoggedIn
        && ($isOwner || $isAdmin || $isGroupEditor || $isParticipant)
        && !$isProtected;

    // ─── DIAGNOSTIC ──────────────────────────────────────────────
    \OC::$server->get(\Psr\Log\LoggerInterface::class)->warning(
        'Agora PERMISSION_ADD_INQUIRIES check',
        [
            'groupId'        => $this->getId(),
            'groupOwner'     => $this->getOwner(),
            'groupProtected' => $isProtected,
            'allowEdit'      => $this->getAllowEdit(),
            'currentUserId'  => $currentUserId,
            'isLoggedIn'     => $isLoggedIn,
            'isAdmin'        => $isAdmin,
            'isOwner'        => $isOwner,
            'isGroupEditor'  => $isGroupEditor,
            'isParticipant'  => $isParticipant,
            'canAddInquiries'=> $canAddInquiries,
            'userClass'      => $isLoggedIn ? get_class($this->userSession->getCurrentUser()) : null,
        ]
    );
    // ─────────────────────────────────────────────────────────────

    return [
        self::PERMISSION_VIEW              => true,
        self::PERMISSION_EDIT              => $canEdit && !$isProtected,
        self::PERMISSION_DELETE            => ($isOwner || $isAdmin) && !$isProtected,
        self::PERMISSION_ADD_INQUIRIES     => $canAddInquiries,
        self::PERMISSION_REORDER_INQUIRIES => ($isOwner || $isAdmin) && !$isProtected,
        self::PERMISSION_CHANGE_OWNER      => ($isOwner || $isAdmin) && !$isProtected,
        self::PERMISSION_ARCHIVE           => ($isOwner || $isAdmin) && !$isProtected,
        self::PERMISSION_CLONE             => true,
    ];
}

    // ── JSON ──────────────────────────────────────────────────────────

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'parentId' => $this->getParentId(),
            'created' => $this->getCreated(),
            'deleted' => $this->getDeleted(),
            'description' => $this->getDescription(),
            'owner' => $this->getOwner(),
            'type' => $this->getType(),
            'groupStatus' => $this->getGroupStatus(),
            'ownedGroup' => $this->getOwnedGroup(),
            'title' => $this->getTitle(),
            'titleExt' => $this->getTitleExt(),
            'order' => $this->getOrder(),
            'expire' => $this->getExpire(),
            'metadata' => $this->getMetadata(),
            'coverId' => $this->getCoverId(),
            'protected' => $this->getProtected(),
            'allowEdit' => $this->getAllowEdit(),
            'inquiryIds' => $this->getInquiryIds(),
            'childs' => $this->getChilds(),
            'slug' => $this->getSlug(),
            'miscFields' => $this->getMiscArray(),

            'configuration' => $this->getConfigurationArray(),
            'status' => $this->getStatusArray(),
            'permissions' => $this->getPermissionsArray(),
            'currentUserStatus' => $this->getCurrentUserStatus(),
        ];
    }

    // ── Permissions ───────────────────────────────────────────────────

    public function getIsAllowed(string $permission): bool
    {
        $perms = $this->getPermissionsArray();
        return $perms[$permission] ?? false;
    }

    public function request(string $permission): bool
    {
        if (!$this->getIsAllowed($permission)) {
            throw new ForbiddenException('Permission denied: ' . $permission);
        }
        return true;
    }

    // ── Legacy aliases ────────────────────────────────────────────────

    public function getUserId(): string
    {
        return $this->getOwner();
    }

    public function setUserId(string $userId): void
    {
        $this->setOwner($userId);
    }

    public function getName(): string
    {
        return $this->getTitle();
    }

    public function setName(string $name): void
    {
        $this->setTitle($name);
    }
}
