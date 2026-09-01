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
 * @method int getParentId()
 * @method void setParentId(int $value)
 * @method int getCreated()
 * @method void setCreated(int $value)
 * @method int getDeleted()
 * @method void setDeleted(int $value)
 * @method ?string getDescription()
 * @method void setDescription(?string $value)
 * @method string getGroupStatus()
 * @method void setGroupStatus(string $value)
 * @method string getPublicationStatus()
 * @method void setPublicationStatus(string $value)
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
 * @method bool getProtected()
 * @method void setProtected(bool $value)
 * @method bool getAllowEdit()
 * @method void setAllowEdit(bool $value)
 * @method string getVisibility()
 * @method void setVisibility(string $value)
 * @method array|null getVisibilityGroups()
 * @method void setVisibilityGroups(array|null $value)
 * @method array|null getVisibilityUsers()
 * @method void setVisibilityUsers(array|null $value)
 */
class InquiryGroup extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inq_group';
    public const RELATION_TABLE = 'agora_groups_inquiries';
    public const CONCAT_SEPARATOR = ',';

    // Permission constants
    public const PERMISSION_VIEW = 'view';
    public const PERMISSION_EDIT = 'edit';
    public const PERMISSION_DELETE = 'delete';
    public const PERMISSION_ADD_INQUIRIES = 'addInquiries';
    public const PERMISSION_REORDER_INQUIRIES = 'reorderInquiries';
    public const PERMISSION_CHANGE_OWNER = 'changeOwner';
    public const PERMISSION_ARCHIVE = 'archive';
    public const PERMISSION_CLONE = 'clone';

    protected UserSession $userSession;
    protected IGroupManager $groupManager;

    // Schema columns
    public $id = null;
    protected ?int $parentId = null;
    protected int $created = 0;
    protected int $deleted = 0;
    protected string $title = '';
    protected string $owner = '';
    protected string $type = 'default';
    protected string $visibility = 'private';
    protected ?array $visibilityGroups = [];
    protected ?array $visibilityUsers = [];
    protected string $groupStatus = 'draft';
    protected string $publicationStatus = 'draft';
    protected ?string $description = null;
    protected ?string $titleExt = null;
    protected ?string $ownedGroup = null;
    protected int $order = 0;
    protected ?int $expire = null;
    protected ?string $metadata = null;
    protected ?int $coverId = null;
    protected bool $protected = false;
    protected bool $allowEdit = false;
    protected ?string $supportResult = null;
    protected ?string $supportEngine = null;

    // Joined/injected data
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
        $this->addType('publicationStatus', 'string');
        $this->addType('description', 'string');
        $this->addType('titleExt', 'string');
        $this->addType('ownedGroup', 'string');
        $this->addType('order', 'integer');
        $this->addType('expire', 'integer');
        $this->addType('metadata', 'string');
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

    // ─── Basic getters/setters (additional) ──────────────────────────────

    public function getVisibilityUsers(): array
    {
        return $this->visibilityUsers ?? [];
    }

    public function setVisibilityUsers(?array $visibilityUsers): void
    {
        $this->visibilityUsers = $visibilityUsers;
    }


    public function getSupportResult(): ?array
    {
        if ($this->supportResult === null || $this->supportResult === '') {
            return null;
        }
        $decoded = json_decode($this->supportResult, true);
        return is_array($decoded) ? $decoded : [];
    }

    public function getSupportEngine(): array
    {
        if ($this->supportEngine === null || $this->supportEngine === '') {
            return [];
        }
        $decoded = json_decode($this->supportEngine, true);
        return is_array($decoded) ? $decoded : [];
    }

    // ─── Inquiry IDs ──────────────────────────────────────────────────────

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
        $this->inquiryIds = implode(self::CONCAT_SEPARATOR, $inquiryIds);
    }

    public function hasInquiry(int $inquiryId): bool
    {
        return in_array($inquiryId, $this->getInquiryIds(), true);
    }

    // ─── Children ─────────────────────────────────────────────────────────

    public function getChilds(): array
    {
        return $this->childs;
    }

    public function setChilds(array $childs): void
    {
        $this->childs = $childs;
    }

    // ─── Misc fields ──────────────────────────────────────────────────────

    public function getMiscArray(): array
    {
        return $this->miscFields;
    }

    public function setMiscFields(array $misc): void
    {
        foreach ($misc as $field) {
            $key = $field['key'] ?? null;
            if ($key) {
                $this->miscFields[$key] = $field['value'] ?? null;
            }
        }
    }

    public function initializeMiscFields(array $fieldsDefinition): void
    {
        foreach ($fieldsDefinition as $field) {
            $key = $field['key'] ?? null;
            if ($key) {
                $this->miscFields[$key] = $field['default'] ?? null;
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

    // ─── Slug ─────────────────────────────────────────────────────────────

    public function getSlug(): string
    {
        $slug = preg_replace('/[^a-zA-Z0-9\s]/', '', $this->getTitle() ?: 'group');
        if ($slug === '') {
            $slug = 'group';
        }
        return strtolower(str_replace(' ', '-', $slug)) . '-' . $this->getId();
    }

    // ─── User role (simplified) ──────────────────────────────────────────

    public function getUserRole(): string
    {
        $currentUserId = $this->userSession->getCurrentUserId();
        if ($this->getOwner() === $currentUserId) {
            return 'owner';
        }
        if ($this->userSession->isAdmin()) {
            return 'admin';
        }
        // You can extend with group-based roles if needed
        return 'user';
    }

    // ─── Nested objects for frontend ─────────────────────────────────────

    /**
     * Configuration array matching TypeScript InquiryGroupConfiguration
     */
    public function getConfigurationArray(): array
    {
        return [
            'visibility' => $this->getVisibility(),
            'visibilityGroups' => $this->getVisibilityGroups() ?? [],
            'visibilityUsers' => $this->getVisibilityUsers() ?? [],
            'expire' => $this->getExpire(),
            'supportEngine' => $this->getSupportEngine(),
            'description' => $this->getDescription(),
            'protected' => (bool)$this->getProtected(),
            'titleExt' => $this->getTitleExt(),
        ];
    }

    /**
     * Status array matching TypeScript InquiryGroupStatus
     */
    public function getStatusArray(): array
    {
        return [
            'groupStatus' => $this->getGroupStatus(),
            'publicationStatus' => $this->getPublicationStatus(),
            'created' => $this->getCreated(),
            'deleted' => $this->getDeleted(),
            'supportResult' => $this->getSupportResult(),
        ];
    }

    /**
     * Permissions array matching TypeScript InquiryGroupPermissions
     */
    public function getPermissionsArray(): array
    {
        $isOwner = $this->getOwner() === $this->userSession->getCurrentUserId();
        $isAdmin = $this->userSession->isAdmin();
        $canEdit = $this->getAllowEdit() || $isOwner || $isAdmin;
        $isProtected = (bool)$this->getProtected();

        return [
            'view' => true,
            'edit' => $canEdit && !$isProtected,
            'delete' => ($isOwner || $isAdmin) && !$isProtected,
            'addInquiries' => $canEdit && !$isProtected,
            'reorderInquiries' => $canEdit && !$isProtected,
            'changeOwner' => ($isOwner || $isAdmin) && !$isProtected,
            'archive' => ($isOwner || $isAdmin) && !$isProtected,
            'clone' => true,
        ];
    }

    /**
     * Current user status matching TypeScript CurrentUserInquiryGroupStatus
     */
    public function getCurrentUserStatus(): array
    {
        return [
            'isOwner' => $this->getOwner() === $this->userSession->getCurrentUserId(),
            'isLoggedIn' => $this->userSession->getIsLoggedIn(),
            'userId' => $this->userSession->getCurrentUserId(),
            'userRole' => $this->getUserRole(),
            'canEdit' => $this->getAllowEdit() || $this->userSession->isAdmin(),
            'isProtected' => (bool)$this->getProtected(),
        ];
    }

    // ─── JSON Serialization ──────────────────────────────────────────────

    public function jsonSerialize(): array
    {
        return [
            // flat fields (backward compatibility)
            'id' => $this->getId(),
            'parentId' => $this->getParentId(),
            'created' => $this->getCreated(),
            'deleted' => $this->getDeleted(),
            'description' => $this->getDescription(),
            'owner' => $this->getOwner(),
            'type' => $this->getType(),
            'groupStatus' => $this->getGroupStatus(),
            'publicationStatus' => $this->getPublicationStatus(),
            'title' => $this->getTitle(),
            'titleExt' => $this->getTitleExt(),
            'ownedGroup' => $this->getOwnedGroup(),
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

            // nested objects (new)
            'configuration' => $this->getConfigurationArray(),
            'status' => $this->getStatusArray(),
            'permissions' => $this->getPermissionsArray(),
            'currentUserStatus' => $this->getCurrentUserStatus(),
        ];
    }

    // ─── Permission helpers (used by Service) ────────────────────────────

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

    // ─── Legacy / compatibility ──────────────────────────────────────────

    // alias of getOwner()
    public function getUserId(): string
    {
        return $this->getOwner();
    }

    // alias of setOwner($value)
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

    // This method is used by the service to set basic permissions
    public function setAllowEdit(bool $allow): void
    {
        $this->allowEdit = $allow;
    }
}
