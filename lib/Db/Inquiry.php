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
 * @method void setAccess(string $value)
 * @method string getAccess()
 * @method string getModerationStatus()
 * @method void setModerationStatus(string $value)
 * @method string getInquiryStatus()
 * @method void setInquiryStatus(string $value)
 * @method int getAllowComment()
 * @method void setAllowComment(int $value)
 * @method string getSupportFeature()
 * @method void setSupportFeature(string $value)
 * @method int getQuorum()
 * @method void setQuorum(int $value)
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
 *
 * Magic functions for joined columns
 * @method string getShareToken()
 * @method int getCurrentUserSupports()
 * @method int getCountParticipants()
 * @method int getCountComments()
 */
class Inquiry extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inquiries';
    
    // Access types
    public const ACCESS_HIDDEN = 'hidden';
    public const ACCESS_PUBLIC = 'public';
    public const ACCESS_MODERATE = 'moderate';
    public const ACCESS_PRIVATE = 'private';
    public const ACCESS_OPEN = 'open';
    
    // Show results types
    public const SHOW_RESULTS_ALWAYS = 'always';
    public const SHOW_RESULTS_CLOSED = 'closed';
    public const SHOW_RESULTS_NEVER = 'never';
    
    // URI prefix
    public const URI_PREFIX = 'inquiry/';

    // Inquiry types
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

    private IURLGenerator $urlGenerator;
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
    protected string $access = '';
    protected string $showResults = '';
    protected int $lastInteraction = 0;
    protected int $forceConfidentialComments = 0;
    protected ?int $parentId = 0;
    protected string $moderationStatus = self::DEFAULT_STATUS_DRAFT;
    protected string $inquiryStatus = self::DEFAULT_STATUS_DRAFT;
    protected ?int $allowComment = null;
    protected string $supportFeature = 'none';
    protected bool $hasSupported = false;
    protected mixed $supportValue = null;
    protected string $family = '';

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
    
    // Dynamic fields for inquiry types
    protected array $miscFields = [];

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
        $this->addType('lastInteraction', 'integer');
        $this->addType('parentId', 'integer');
        $this->addType('allowComment', 'integer');
        $this->addType('forceConfidentialComments', 'integer');
        
        // Joined Attributes
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

        // If it's already an integer (from MySQL or SQLite)
        if (is_int($this->supportValue)) {
            return $this->supportValue;
        }

        // If it's a JSON string from PostgreSQL or JSON column
        if (is_string($this->supportValue)) {
            $decoded = json_decode($this->supportValue, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                // Extract the actual value from {"value": N} format
                if (is_array($decoded) && isset($decoded['value'])) {
                    return $decoded['value'];  // Return just the number, not the array
                }
                // Handle array with single element (old format)
                if (is_array($decoded) && count($decoded) === 1) {
                    return reset($decoded);
                }
                return $decoded;
            }
            // If it's a simple numeric string
            if (is_numeric($this->supportValue)) {
                return (int)$this->supportValue;
            }
        }

        // If it's already an array (from MySQL JSON column)
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

    /**
     * Get miscellaneous fields array
     */
    public function getMiscArray(): array
    {
        return $this->miscFields;
    }

    /**
     * Get safe HTML description
     */
    public function getDescriptionSafe(): string
    {
        // This should be implemented with proper sanitization
        // For now, returning raw description - sanitize before use
        return $this->getDescription() ?? '';
    }

    /**
     * Get support result as array (decoded from JSON string)
     */
    public function getSupportResult(): ?array
    {
        if ($this->supportResult === null || $this->supportResult === '') {
            return null;
        }
        $decoded = json_decode($this->supportResult, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Get support engine as array (decoded from JSON string)
     */
    public function getSupportEngine(): array
    {
        if ($this->supportEngine === null || $this->supportEngine === '') {
            return [];
        }
        $decoded = json_decode($this->supportEngine, true);
        return is_array($decoded) ? $decoded : [];
    }


    /**
     * Get inquiry status array - matching TypeScript InquiryStatus interface
     */
    public function getStatusArray(): array
    {
        return [
            'moderationStatus' => $this->getModerationStatus(),
            'inquiryStatus' => $this->getInquiryStatus(),
            'lastInteraction' => $this->getLastInteraction(),
            'created' => $this->getCreated(),
            'isAnonymous' => $this->getIsAnonymous(),
            'isArchived' => (bool)$this->getArchived(),
            'isExpired' => $this->getExpired(),
            'relevantThreshold' => $this->getRelevantThreshold(),
            'deletionDate' => $this->getDeleted(),
            'archivedDate' => $this->getArchived(),
            'supportResult' => $this->getSupportResult(),
            'countSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountSupports() : 0,
            'countParticipants' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) 
            ? $this->getCountParticipants() 
            : 0,
            'countComments' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) 
            ? $this->getCountComments() 
            : 0,
        ];
    }

    /**
     * Get current user status - matching TypeScript CurrentUserStatus interface
     */
    public function getCurrentUserStatus(): array
    {
        return [
            'groupInvitations' => $this->getGroupShares(),
            'isInvolved' => $this->getIsInvolved(),
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

    /**
     * Get configuration array - matching TypeScript InquiryConfiguration interface
     */
    public function getConfigurationArray(): array
    {
        return [
            'access' => $this->getAccess(),
            'autoReminder' => $this->getAutoReminder(),
            'expire' => $this->getExpire(),
            'forceConfidentialComments' => $this->getForceConfidentialComments(),
            'allowComment' => $this->getAllowComment(),
            'supportFeature' => $this->getSupportFeature(),
            'supportEngine' => $this->getSupportEngine(),
        ];
    }

    /**
     * Get permissions array - matching TypeScript InquiryPermissions interface
     */
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

    /**
     * Deserialize configuration array
     */
    public function deserializeArray(array $inquiryConfiguration): self
    {
        $this->setAccess($inquiryConfiguration['access'] ?? $this->getAccess());
        $this->setAutoReminder($inquiryConfiguration['autoReminder'] ?? $this->getAutoReminder());
        $this->setAllowComment($inquiryConfiguration['allowComment'] ?? $this->getAllowComment());
        $this->setSupportFeature($inquiryConfiguration['supportFeature'] ?? $this->getSupportFeature());
        $this->setExpire($inquiryConfiguration['expire'] ?? $this->getExpire());
        $this->setForceConfidentialComments($inquiryConfiguration['forceConfidentialComments'] ?? $this->getForceConfidentialComments());
        $this->setShowResults($inquiryConfiguration['showResults'] ?? $this->getShowResults());
        return $this;
    }

    // Status helpers
    public function getExpired(): bool
    {
        $expiry = $this->getExpire();
        return ($expiry > 0 && $expiry < time());
    }

    public function getIsAnonymous(): bool
    {
        // Implement based on your anonymity logic
        return false;
    }

    public function getIsLocked(): bool
    {
        // Implement based on your locking logic
        return false;
    }

    // User role determination
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
        // Implement based on your logic
        return 0;
    }

    // Date helpers
    private function getMaxDate(): int
    {
        if ($this->maxDate === null) {
            return 0;
        }
        return $this->maxDate;
    }

    // Misc field management
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

    // URL generation
    public function getInquiryUrl(): string
    {
        return $this->urlGenerator->linkToRouteAbsolute(
            AppConstants::APP_ID . '.page.inquiry',
            ['id' => $this->getId()]
        );
    }

    // Child management
    public function setChilds(array $childs): void
    {
        $this->childs = $childs;
    }

    public function getChilds(): array
    {
        return $this->childs;
    }

    // User identification
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

    // Group shares
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

    // Threshold calculation
    private function getRelevantThreshold(): int
    {
        return max(
            $this->getCreated(),
            $this->getLastInteraction(),
            $this->getExpire(),
            $this->getMaxDate(),
        );
    }

    // Misc field accessors
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

    // Permission checking
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
            self::PERMISSION_INQUIRY_VIEW => $this->getAllowAccessInquiry(),
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

    // Permission implementations
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
        );
    }

    private function getIsOpenInquiry(): bool
    {
        $access = $this->getAccess();
        return ($access === self::ACCESS_OPEN || $access === self::ACCESS_MODERATE) 
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

        if ($this->getAccess() !== self::ACCESS_PRIVATE) {
            return true;
        }

        if ($this->getIsOpenInquiry()) {
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

    private function getAllowAccessInquiry(): bool
    {
        if ($this->getAllowEditInquiry()) {
            return true;
        }

        if ($this->getDeleted()) {
            return false;
        }

        if ($this->getArchived()) {
            return false;
        }

        if ($this->getIsOpenInquiry()) {
            return true;
        }

        $share = $this->userSession->getShare();
        return (bool)($share->getId() && $share->getInquiryId() === $this->getId());
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

        if (!$this->getAllowAccessInquiry()) {
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

    private function getAllowCommenting(): bool
    {
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        if ($this->userSession->getShare()->getType() === 'public') {
            return false;
        }

        return (bool)$this->getAllowComment();
    }

    private function getSupportFeaturing(): bool
    {
        if (!$this->getAllowAccessInquiry()) {
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
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        return $this->userSession->getCurrentUser()->getHasEmail();
    }

    private function getAllowShowResults(): bool
    {
        if ($this->getAllowEditInquiry()) {
            return true;
        }

        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        if ($this->getShowResults() === self::SHOW_RESULTS_CLOSED && $this->getExpired()) {
            return true;
        }

        return $this->getShowResults() === self::SHOW_RESULTS_ALWAYS;
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
