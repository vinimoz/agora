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
use OCP\IURLGenerator;

/**
 * @psalm-api
 * @method    int getId()
 * @method    void setId(int $value)
 * @method    int getTargetId()
 * @method    void setTargetId(int $value)
 * @method    int getParentId()
 * @method    void setParentId(int $value)
 * @method    string getType()
 * @method    void setType(string $value)
 * @method    string getTitle()
 * @method    void setTitle(string $value)
 * @method    string getPublicationStatus()
 * @method    void setPublicationStatus(string $value)
 * @method    string getText()
 * @method    void setText(string $value)
 * @method    string getOwner()
 * @method    void setOwner(string $value)
 * @method    string getOwnedGroup()
 * @method    void setOwnedGroup(string $value)
 * @method    int getCreated()
 * @method    void setCreated(int $value)
 * @method    int getUpdated()
 * @method    void setUpdated(int $value)
 * @method    string getShowResults()
 * @method    void setShowResults(string $value)
 * @method    int getDeleted()
 * @method    void setDeleted(int $value)
 * @method    int getArchived()
 * @method    void setArchived(int $value)
 * @method    string getStatus()
 * @method    void setStatus(string $value)
 * @method    string getOptionStatus()
 * @method    void setOptionStatus(string $value)
 * @method    int getAllowComment()
 * @method    void setAllowComment(int $value)
 * @method    string getSupportFeature()
 * @method    void setSupportFeature(string $value)
 * @method    string getFamily()
 * @method    void setFamily(string $value)
 * @method    int getSortOrder()
 * @method    void setSortOrder(int $value)
 *
 * Magic functions for joined columns
 * @method    string getShareToken()
 * @method    int getCurrentUserSupports()
 * @method    int getCountParticipants()
 * @method    int getCountComments()
 */
class Option extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_options';

    // Visibility types (inherit from inquiry)
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

    public const SHOW_RESULTS_ALWAYS = 'always';
    public const SHOW_RESULTS_CLOSED = 'closed';
    public const SHOW_RESULTS_NEVER = 'never';
    public const URI_PREFIX = 'option/';

    // Option types
    public const TYPE_ARGUMENT_FOR = 'argument_for';
    public const TYPE_ARGUMENT_AGAINST = 'argument_against';
    public const TYPE_PROPOSAL = 'proposal';
    public const TYPE_QUESTION = 'question';
    public const TYPE_IDEA = 'idea';

    // User roles (delegated from inquiry)
    public const ROLE_USER = 'user';
    public const ROLE_ADMIN = 'admin';
    public const ROLE_EMAIL = 'email';
    public const ROLE_CONTACT = 'contact';
    public const ROLE_EXTERNAL = 'external';
    public const ROLE_OWNER = 'owner';
    public const ROLE_NONE = 'none';

    // Permissions
    public const PERMISSION_OVERRIDE = 'override_permission';
    public const PERMISSION_OPTION_VIEW = 'view';
    public const PERMISSION_OPTION_EDIT = 'edit';
    public const PERMISSION_OPTION_CHANGE_OWNER = 'changeOwner';
    public const PERMISSION_OPTION_DELETE = 'delete';
    public const PERMISSION_OPTION_ARCHIVE = 'archive';
    public const PERMISSION_OPTION_RESULTS_VIEW = 'seeResults';
    public const PERMISSION_OPTION_USERNAMES_VIEW = 'seeUserNames';
    public const PERMISSION_OPTION_TAKEOVER = 'takeOver';
    public const PERMISSION_OPTION_SUBSCRIBE = 'subscribe';
    public const PERMISSION_COMMENT_ADD = 'addComment';
    public const PERMISSION_SUPPORT_ADD = 'addSupport';
    public const PERMISSION_COMMENT_DELETE = 'deleteComment';
    public const PERMISSION_SUPPORT_DELETE = 'deleteSupport';
    public const PERMISSION_OPTION_ADD = 'addOption';
    public const PERMISSION_OPTION_CONFIRM = 'confirmOption';
    public const PERMISSION_OPTIONS_REORDER = 'reorderOptions';
    public const PERMISSION_SUPPORT_EDIT = 'support';
    public const PERMISSION_SUPPORT_FOREIGN_CHANGE = 'changeForeignSupports';
    public const PERMISSION_SHARE_ADD = 'shareCreate';
    public const PERMISSION_SHARE_ADD_EXTERNAL = 'shareCreateExternal';
    public const PERMISSION_DEANONYMIZE = 'deanonymize';

    public const DEFAULT_STATUS_DRAFT = 'draft';

    private IURLGenerator $urlGenerator;
    protected SystemSettings $systemSettings;
    protected AppSettings $appSettings;
    protected UserSession $userSession;

    // Schema columns
    public $id = null;
    protected int $targetId = 0;
    protected int $parentId = 0;
    protected string $type = 'debate';
    protected string $publicationStatus = 'draft';
    protected string $text = '';
    protected string $title = '';
    protected string $owner = '';
    protected string $ownedGroup = '';
    protected int $created = 0;
    protected int $updated = 0;
    protected string $showResults = 'always';
    protected int $deleted = 0;
    protected int $archived = 0;
    protected string $optionStatus = self::DEFAULT_STATUS_DRAFT;
    protected ?int $allowComment = null;
    protected string $supportFeature = '';
    protected string $family = 'debate';
    protected int $sortOrder = 0;
    protected string $visibility = 'inherit';
    	

    // Visibility relations (loaded from GroupRelation/UserRelation)
    protected ?array $visibilityGroups = [];
    protected ?array $visibilityUsers = [];

    // Joined columns from inquiry
    protected ?string $inquiryVisibility = '';
    protected ?string $inquiryPublicationStatus = '';

    // Support/participation flags
    protected bool $hasSupported = false;
    protected mixed $supportValue = null;
    protected int $currentUserSupports = 0;
    protected int $countParticipants = 0;
    protected int $countComments = 0;
    protected int $countSupports = 0;
    protected string $groupShares = '';
    protected string $optionGroups = '';
    protected string $optionGroupUserShares = '';
    
    // Dynamic fields
    protected ?string $supportResult = null;
    protected array $miscFields = [];
    protected ?float $trendingScore = null;
    private array $childs = [];
    protected ?string $miscSettingsConcat = '';
    protected ?string $shareToken = '';
    protected ?Inquiry $parentInquiry = null;

    public function __construct()
    {
        $this->addType('targetId', 'integer');
        $this->addType('parentId', 'integer');
        $this->addType('created', 'integer');
        $this->addType('updated', 'integer');
        $this->addType('deleted', 'integer');
        $this->addType('archived', 'integer');
        $this->addType('allowComment', 'integer');
        $this->addType('sortOrder', 'integer');
        $this->addType('type', 'string');
        $this->addType('title', 'string');
        $this->addType('optionStatus', 'string');
        $this->addType('supportResult', 'string');
        $this->addType('visibility', 'string');
        $this->addType('visibilityGroups', 'json');
        $this->addType('visibilityUsers', 'json');
	$this->addType('publicationStatus', 'string'); 

        // Joined attributes
        $this->addType('currentUserSupports', 'integer');
        $this->addType('countParticipants', 'integer');
        $this->addType('countComments', 'integer');
        $this->addType('countSupports', 'integer');
        $this->addType('hasSupported', 'boolean');
        $this->addType('supportValue', 'string');
        
        // Inquiry joined fields
        $this->addType('inquiryVisibility', 'string');
        $this->addType('inquiryPublicationStatus', 'string');

        $this->urlGenerator = Container::queryClass(IURLGenerator::class);
        $this->systemSettings = Container::queryClass(SystemSettings::class);
        $this->appSettings = Container::queryClass(AppSettings::class);
        $this->userSession = Container::queryClass(UserSession::class);
    }

    // ====================================================================
    // PARENT INQUIRY
    // ====================================================================

    public function setParentInquiry(?Inquiry $inquiry): void
    {
        $this->parentInquiry = $inquiry;
        if ($inquiry !== null) {
            $this->inquiryVisibility = $inquiry->getVisibility();
            $this->inquiryPublicationStatus = $inquiry->getPublicationStatus();
        }
    }

    public function getParentInquiry(): ?Inquiry
    {
        return $this->parentInquiry;
    }

    // ====================================================================
    // VISIBILITY RELATIONS (GroupRelation/UserRelation)
    // ====================================================================

    /**
     * Get visibility groups from relation table
     *
     * @return string[]
     */
    public function getVisibilityGroups(): array
    {
        return $this->visibilityGroups ?? [];
    }

    /**
     * Set visibility groups (from relation table)
     *
     * @param string[] $visibilityGroups
     */
    public function setVisibilityGroups(array $visibilityGroups): void
    {
        $this->visibilityGroups = $visibilityGroups;
    }

public function getInquiryId(): int
{
    return $this->getTargetId();
}

    /**
     * Get visibility users from relation table
     *
     * @return string[]
     */
    public function getVisibilityUsers(): array
    {
        return $this->visibilityUsers ?? [];
    }

    /**
     * Set visibility users (from relation table)
     *
     * @param string[] $visibilityUsers
     */
    public function setVisibilityUsers(array $visibilityUsers): void
    {
        $this->visibilityUsers = $visibilityUsers;
    }

    /**
     * Check if a specific group can see this option
     */
    public function isVisibleToGroup(string $groupId): bool
    {
        return in_array($groupId, $this->visibilityGroups ?? [], true);
    }

    /**
     * Check if a specific user can see this option
     */
    public function isVisibleToUser(string $userId): bool
    {
        return in_array($userId, $this->visibilityUsers ?? [], true);
    }

    // ====================================================================
    // SERIALIZATION
    // ====================================================================

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'targetId' => $this->getTargetId(),
            'parentId' => $this->getParentId(),
            'type' => $this->getType(),
            'title' => $this->getTitle(),
            'text' => $this->getText(),
            'owner' => $this->getUser(),
            'ownedGroup' => $this->getOwnedGroup(),
            'showResults' => $this->getShowResults(),
            'status' => $this->getStatusArray(),
            'configuration' => $this->getConfigurationArray(),
            'family' => $this->getFamily(),
            'sortOrder' => $this->getSortOrder(),
            'currentUserStatus' => $this->getCurrentUserStatus(),
            'permissions' => $this->getPermissionsArray(),
            'optionGroups' => $this->getOptionGroups(),
            'inquiryInfo' => $this->getInquiryInfoArray(),
            'miscFields' => $this->getMiscArray(),
            'childs' => $this->getChildren(),
            'supportResult' => $this->getSupportResult(),
            'trendingScore' => $this->getTrendingScore(),
            // Visibility relations
            'visibility' => $this->getInquiryVisibility(),
            'visibilityGroups' => $this->getVisibilityGroups(),
            'visibilityUsers' => $this->getVisibilityUsers(),
        ];
    }

    // ====================================================================
    // STATUS & CONFIGURATION
    // ====================================================================

    public function getStatusArray(): array
    {
        return [
            'optionStatus' => $this->getOptionStatus(),
            'updated' => $this->getUpdated(),
            'created' => $this->getCreated(),
            'archivedDate' => $this->getArchived(),
            'supportResult' => $this->getSupportResult(),
            'countSupports' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW) ? $this->getCountSupports() : 0,
            'countParticipants' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW)
                ? $this->getCountParticipants()
                : 0,
            'countComments' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW)
                ? $this->getCountComments()
                : 0,
        ];
    }

    public function getConfigurationArray(): array
    {
        return [
            'publicationStatus' => $this->getPublicationStatus(),
            'allowComment' => boolval($this->getAllowComment()),
            'supportFeature' => $this->getSupportFeature(),
        ];
    }

    public function getInquiryInfoArray(): array
    {
        return [
            'targetId' => $this->getTargetId(),
            'inquiryVisibility' => $this->inquiryVisibility ?: '',
            'inquiryPublicationStatus' => $this->inquiryPublicationStatus ?: '',
        ];
    }

    // ====================================================================
    // PERMISSIONS (delegated to parent inquiry)
    // ====================================================================

    public function getIsAllowed(string $permission): bool
    {
        if ($this->parentInquiry === null) {
            return $this->getIsOptionOwner();
        }

        $inquiry = $this->parentInquiry;
        $canViewInquiry = $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_VIEW);
        $canEditInquiry = $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_EDIT);
        $canParticipate = $inquiry->canParticipate();
        $isOptionOwner = $this->getIsOptionOwner();

        return match ($permission) {
            self::PERMISSION_OPTION_VIEW => $canViewInquiry,

            self::PERMISSION_OPTION_EDIT,
            self::PERMISSION_OPTION_DELETE,
            self::PERMISSION_OPTION_ARCHIVE,
            self::PERMISSION_OPTION_CHANGE_OWNER,
            self::PERMISSION_OPTIONS_REORDER => $canEditInquiry || $isOptionOwner,

            self::PERMISSION_OPTION_CONFIRM => ($canEditInquiry || $isOptionOwner) && $this->getExpired(),

            self::PERMISSION_COMMENT_ADD => $canViewInquiry 
                && $canParticipate 
                && (bool)$this->getAllowComment()
                && $this->userSession->getIsLoggedIn(),

            self::PERMISSION_SUPPORT_ADD => $canViewInquiry 
                && $canParticipate 
                && $this->getSupportFeature() !== 'none'
                && $this->userSession->getIsLoggedIn(),

            self::PERMISSION_COMMENT_DELETE,
            self::PERMISSION_SUPPORT_DELETE,
            self::PERMISSION_SUPPORT_FOREIGN_CHANGE => $canEditInquiry || $isOptionOwner,

            self::PERMISSION_OPTION_RESULTS_VIEW => $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_RESULTS_VIEW),
            self::PERMISSION_OPTION_USERNAMES_VIEW => $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_USERNAMES_VIEW),

            self::PERMISSION_DEANONYMIZE => $canEditInquiry || $isOptionOwner,

            self::PERMISSION_OPTION_TAKEOVER => $this->userSession->getCurrentUser()->getIsAdmin(),

            self::PERMISSION_OPTION_ADD => $canViewInquiry 
                && $canParticipate 
                && $this->userSession->getIsLoggedIn(),

            self::PERMISSION_SHARE_ADD => $this->systemSettings->getShareCreateAllowed(),
            self::PERMISSION_SHARE_ADD_EXTERNAL => $this->systemSettings->getExternalShareCreationAllowed(),

            self::PERMISSION_OPTION_SUBSCRIBE => $canViewInquiry 
                && $this->userSession->getCurrentUser()->getHasEmail(),

            self::PERMISSION_SUPPORT_EDIT => $this->getIsAllowed(self::PERMISSION_SUPPORT_ADD),

            self::PERMISSION_OVERRIDE => true,

            default => false,
        };
    }

    public function request(string $permission): bool
    {
        if (!$this->getIsAllowed($permission)) {
            throw new ForbiddenException('denied permission ' . $permission);
        }
        return true;
    }

    // ====================================================================
    // CURRENT USER STATUS
    // ====================================================================

    public function getCurrentUserStatus(): array
    {
        return [
            'isInvolved' => $this->getIsInvolved(),
            'hasSupported' => $this->hasSupported(),
            'supportValue' => $this->getSupportValue(),
            'isLoggedIn' => $this->userSession->getIsLoggedIn(),
            'isOwner' => $this->getIsOptionOwner(),
            'shareToken' => $this->getShareToken(),
            'userId' => $this->userSession->getCurrentUserId(),
            'userRole' => $this->getUserRole(),
        ];
    }

    public function getPermissionsArray(): array
    {
        return [
            'addOption' => $this->getIsAllowed(self::PERMISSION_OPTION_ADD),
            'addShares' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD),
            'addSharesExternal' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD_EXTERNAL),
            'archive' => $this->getIsAllowed(self::PERMISSION_OPTION_ARCHIVE),
            'changeForeignSupports' => $this->getIsAllowed(self::PERMISSION_SUPPORT_FOREIGN_CHANGE),
            'changeOwner' => $this->getIsAllowed(self::PERMISSION_OPTION_CHANGE_OWNER),
            'comment' => $this->getIsAllowed(self::PERMISSION_COMMENT_ADD),
            'support' => $this->getIsAllowed(self::PERMISSION_SUPPORT_ADD),
            'confirmOption' => $this->getIsAllowed(self::PERMISSION_OPTION_CONFIRM),
            'delete' => $this->getIsAllowed(self::PERMISSION_OPTION_DELETE),
            'edit' => $this->getIsAllowed(self::PERMISSION_OPTION_EDIT),
            'reorderOptions' => $this->getIsAllowed(self::PERMISSION_OPTIONS_REORDER),
            'seeResults' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW),
            'seeUsernames' => $this->getIsAllowed(self::PERMISSION_OPTION_USERNAMES_VIEW),
            'subscribe' => $this->getIsAllowed(self::PERMISSION_OPTION_SUBSCRIBE),
            'takeOver' => $this->getIsAllowed(self::PERMISSION_OPTION_TAKEOVER),
            'view' => $this->getIsAllowed(self::PERMISSION_OPTION_VIEW),
        ];
    }

    // ====================================================================
    // HELPERS
    // ====================================================================

    public function getUserRole(): string
    {
        if ($this->getIsOptionOwner()) {
            return self::ROLE_OWNER;
        }

        if ($this->parentInquiry !== null) {
            $inquiryRole = $this->parentInquiry->getUserRole();
            if ($inquiryRole === Inquiry::ROLE_ADMIN) {
                return self::ROLE_ADMIN;
            }
        }

        if ($this->getOptionGroupUserShares() && !empty($this->getOptionGroupUserShares())) {
            foreach ($this->getOptionGroupUserShares() as $shareType) {
                if ($shareType === self::ROLE_ADMIN) {
                    return self::ROLE_ADMIN;
                }
            }
        }

        return self::ROLE_NONE;
    }

    public function getExpired(): bool
    {
        if ($this->parentInquiry !== null) {
            return $this->parentInquiry->getExpired();
        }
        return false;
    }

    public function getIsOptionOwner(): bool
    {
        $currentUserId = $this->userSession->getCurrentUserId();
        return $currentUserId !== null && $this->getOwner() === $currentUserId;
    }

    public function getOptionUrl(): string
    {
        return $this->urlGenerator->linkToRouteAbsolute(
            AppConstants::APP_ID . '.page.option',
            ['id' => $this->getId()]
        );
    }

    public function getUserId(): string
    {
        return $this->getOwner();
    }

    public function setUserId(string $userId): void
    {
        $this->setOwner($userId);
    }

    public function matchUser(string $userId): bool
    {
        return $this->userSession->getCurrentUser()->getId() === $userId;
    }

    // ====================================================================
    // CHILDREN
    // ====================================================================

    public function setChildren(array $children): void
    {
        $this->childs = $children;
    }

    public function getChildren(): array
    {
        return $this->childs;
    }

    // ====================================================================
    // GROUPS
    // ====================================================================

    private function getGroupShares(): array
    {
        if ($this->groupShares !== null && $this->groupShares !== '') {
            return array_filter(explode(OptionMapper::CONCAT_SEPARATOR, $this->groupShares));
        }
        return [];
    }

    public function getOptionGroups(): array
    {
        if (!$this->optionGroups) {
            return [];
        }
        return array_map('intval', explode(OptionGroup::CONCAT_SEPARATOR, $this->optionGroups));
    }

    public function getOptionGroupUserShares(): array
    {
        if (!$this->optionGroupUserShares) {
            return [];
        }
        return explode(OptionGroup::CONCAT_SEPARATOR, $this->optionGroupUserShares);
    }

    private function getIsInvolved(): bool
    {
        return (
            $this->getIsOptionOwner()
            || $this->getIsParticipant()
            || $this->getIsPersonallyInvited()
            || $this->getIsInvitedViaGroupShare()
        );
    }

    private function hasSupported(): bool
    {
        return $this->hasSupported;
    }

    private function getSupportValue(): mixed
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

    public function getCountSupports(): int
    {
        return $this->countSupports;
    }

    public function getMiscArray(): array
    {
        return $this->miscFields;
    }

    public function getMiscField(string $key): mixed
    {
        return $this->miscFields[$key] ?? null;
    }

    public function setMiscField(string $key, mixed $value): void
    {
        $this->miscFields[$key] = $value;
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

    public function getTrendingScore(): ?float
    {
        return $this->trendingScore;
    }

    public function setTrendingScore(?float $score): void
    {
        $this->trendingScore = $score;
    }

    public function getSupportResult(): ?array
    {
        if ($this->supportResult === null || $this->supportResult === '') {
            return null;
        }
        $decoded = json_decode($this->supportResult, true);
        return is_array($decoded) ? $decoded : [];
    }

    public function deserializeArray(array $optionConfiguration): self
    {
        $this->setPublicationStatus($optionConfiguration['publicationStatus'] ?? $this->getPublicationStatus());
        $this->setAllowComment($optionConfiguration['allowComment'] ?? $this->getAllowComment());
        $this->setSupportFeature($optionConfiguration['supportFeature'] ?? $this->getSupportFeature());
        $this->setShowResults($optionConfiguration['showResults'] ?? $this->getShowResults());

        if (isset($optionConfiguration['miscFields']) && is_array($optionConfiguration['miscFields'])) {
            foreach ($optionConfiguration['miscFields'] as $key => $value) {
                $this->setMiscField($key, $value);
            }
        }

        return $this;
    }

    // Getters/Setters for inquiry joined fields
    public function getInquiryVisibility(): string { return $this->inquiryVisibility; }
    public function getInquiryPublicationStatus(): string { return $this->inquiryPublicationStatus; }

    public function setInquiryVisibility(string $value): void { $this->inquiryVisibility = $value; }
    public function setInquiryPublicationStatus(string $value): void { $this->inquiryPublicationStatus = $value; }

    public function setSupported(bool $hasSupported, mixed $supportValue = null): void
    {
        $this->hasSupported = $hasSupported;
        $this->supportValue = $supportValue;
    }
}
