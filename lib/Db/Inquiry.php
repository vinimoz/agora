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
use OCA\Agora\Db\InquiryMisc;
use OCP\IURLGenerator;

/**
 * @psalm-api
 * @method    int getId()
 * @method    void setId(int $value)
 * @method    int getCoverId()
 * @method    void setCoverId(int $value)
 * @method    string getType()
 * @method    void setType(string $value)
 * @method    string getTitle()
 * @method    void setTitle(string $value)
 * @method    void setDescription(string $value)
 * @method    string getDescription()
 * @method    string getOwner()
 * @method    void setOwner(string $value)
 * @method    int getCreated()
 * @method    void setCreated(int $value)
 * @method    int getExpire()
 * @method    void setExpire(int $value)
 * @method    int getDeleted()
 * @method    void setDeleted(int $value)
 * @method    void setAccess(string $value)
 * @method    string getAccess()
 * @method    void setAccess(string $access)
 * @method    string getModerationStatus()
 * @method    void setModerationStatus(string $value)
 * @method    string getInquiryStatus()
 * @method    void setInquiryStatus(string $value)
 * @method    int getAllowComment()
 * @method    void setAllowComment(int $value)
 * @method    int getAllowSupport()
 * @method    void setAllowSupport(int $value)
 * @method    string getSupportFeature()
 * @method    void setSupportFeature(string $value)
 * @method    int getQuorum()
 * @method    void setQuorum(int $value)
 * @method    string getShowResults()
 * @method    void setShowResults(string $value)
 * @method    string getOwnedGroup()
 * @method    void setOwnedGroup(string $value)
 * @method    int getLastInteraction()
 * @method    void setLastInteraction(int $value)
 * @method    int getCategoryId()
 * @method    void setCategoryId(int $value)
 * @method    int getLocationId()
 * @method    void setLocationId(int $value)
 * @method    int getParentId()
 * @method    void setParentId(int $value)
 * @method    int getArchived()
 * @method    void setArchived(int $value)
 * @method    string getSupportMode()
 * @method    void setSupportMode(string $value)
 *
 * Magic functions for joined columns
 * @method    string getShareToken()
 * @method    int getCurrentUserSupports()
 * @method    int getCountParticipants()
 * @method    int getCountComments()
 * @method    int getCountSupports()
 * @method    int getCountPositiveSupports()
 * @method    int getCountNegativeSupports()
 * @method    int getCountNeutralSupports()
 */
class Inquiry extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inquiries';
    public const ACCESS_HIDDEN = 'hidden';
    public const ACCESS_PUBLIC = 'public';
    public const ACCESS_MODERATE = 'moderate';
    public const ACCESS_PRIVATE = 'private';
    public const ACCESS_OPEN = 'open';
    public const SHOW_RESULTS_ALWAYS = 'always';
    public const SHOW_RESULTS_CLOSED = 'closed';
    public const SHOW_RESULTS_NEVER = 'never';
    public const URI_PREFIX = 'inquiry/';

    // STATIC TYPE
    public const TYPE_DEBATE = 'debate';

    public const ROLE_USER = 'user';
    public const ROLE_ADMIN = 'admin';
    public const ROLE_EMAIL = 'email';
    public const ROLE_CONTACT = 'contact';
    public const ROLE_EXTERNAL = 'external';
    public const ROLE_OWNER = 'owner';
    public const ROLE_NONE = 'none';
    public const ROLE_COMISSIONS = 'comissions';
    public const ROLE_ASSOCIATIONS = 'assocations';
    public const ROLE_MODERATOR = 'moderator';
    public const ROLE_OFFICIAL = 'official';

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

    public const DEFAULT_STATUS_DRAFT = 'draft';

    private IURLGenerator $urlGenerator;
    protected SystemSettings $systemSettings;
    protected AppSettings $appSettings;
    protected UserSession $userSession;

    // schema columns
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
    protected ?int $parentId = 0;
    protected string $moderationStatus = self::DEFAULT_STATUS_DRAFT;
    protected string $inquiryStatus = self::DEFAULT_STATUS_DRAFT;
    protected int $allowComment = 0;
    protected int $allowSupport = 0;
    protected string $supportFeature = 'binary';
    protected bool $hasSupported = false; 
    protected ?int $supportValue = null; 
    protected string $supportMode = 'simple'; 
    protected string $family='';

    // joined columns
    protected string $userRole = '';
    protected string $shareToken = '';
    protected int $currentUserSupports = 0;
    protected int $countParticipants = 0;
    protected int $countComments = 0;
    protected int $countSupports = 0;
    protected int $countPositiveSupports = 0;
    protected int $countNeutralSupports = 0;
    protected int $countNegativeSupports = 0;
    protected ?int $maxDate = 0;
    protected ?string $groupShares = '';
    protected ?string $inquiryGroups = '';
    protected ?string $inquiryGroupUserShares = '';
    protected ?string $miscSettingsConcat = '';

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
        $this->addType('supportFeature', 'string');

        // joined Attributes
        $this->addType('currentUserSupports', 'integer');
        $this->addType('countParticipants', 'integer');
        $this->addType('countComments', 'integer');
        $this->addType('countSupports', 'integer');
        $this->addType('countPositiveSupports', 'integer');
        $this->addType('countNegativeSupports', 'integer');
        $this->addType('countNeutraveSupports', 'integer');
        $this->addType('miscSettingsConcat', 'string');
        $this->addType('maxDate', 'integer');

        $this->urlGenerator = Container::queryClass(IURLGenerator::class);
        $this->systemSettings = Container::queryClass(SystemSettings::class);
        $this->appSettings = Container::queryClass(AppSettings::class);
        $this->userSession = Container::queryClass(UserSession::class);

    }

    public function jsonSerialize(): array
    {

        $baseData = [
        'id' => $this->getId(),
        'coverId' => $this->getCoverId(),
        'type' => $this->getType(),
        'title' => $this->getTitle(),
        'family' => $this->getFamily(),
        'description' => $this->getDescription(),
        'owner' => $this->getUser(),
        'status' => $this->getStatusArray(),
        'currentUserStatus' => $this->getCurrentUserStatus(),
        'permissions' => $this->getPermissionsArray(),
        'inquiryGroups' => $this->getInquiryGroups(),
        'locationId' => $this->getLocationId(),
        'categoryId' => $this->getCategoryId(),
        'parentId' => $this->getParentId(),
        'ownedGroup' => $this->getOwnedGroup(),
        'access' => $this->getAccess(),
        'showResults' => $this->getShowResults(),
        'allowComment' => $this->getAllowComment(),
        'allowSupport' => $this->getAllowSupport(),
        'supportFeature' => $this->getSupportFeature(),
        'archived' => $this->getArchived(),
        'deleted' => $this->getDeleted(),
        'lastInteraction' => $this->getLastInteraction(),
        'configuration' => $this->getConfigurationArray(),
        'miscFields' => $this->getMiscArray(),
        'childs' => $this->getChilds(),
        ];
        return $baseData;
    }
    
    public function getMiscArray(): array
    {
        $prefixedMiscFields = [];
        foreach ($this->miscFields as $key => $value) {
            $prefixedMiscFields["$key"] = $value;
        }
        return $prefixedMiscFields;
    }


    public function getStatusArray(): array
    {
        return [
        'moderationStatus' => $this->getModerationStatus(),
        'inquiryStatus' => $this->getInquiryStatus(),
        'lastInteraction' => $this->getLastInteraction(),
        'created' => $this->getCreated(),
        'isArchived' => (bool)$this->getArchived(),
        'isExpired' => $this->getExpired(),
	'archivedDate' => $this->getDeleted(),
        'relevantThreshold' => $this->getRelevantThreshold(),
        'countParticipants' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountParticipants() : 0,
        'countComments' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountComments() : 0,
        'countSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountSupports() : 0,
        'countPositiveSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountPositiveSupports() : 0,
        'countNegativeSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountNegativeSupports() : 0,
        'countNeutralSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountNeutralSupports() : 0,
        ];
    }

    public function getCurrentUserStatus(): array
    {
        return [
        'groupInvitations' => $this->getGroupShares(),
        'isInvolved' => $this->getIsInvolved(),
        'hasSupported' => $this->hasSupported(),
        'supportValue' => $this->supportValue(),
        'isLoggedIn' => $this->userSession->getIsLoggedIn(),
        'isOwner' => $this->getIsInquiryOwner(),
        'shareToken' => $this->getShareToken(),
        'userId' => $this->userSession->getCurrentUserId(),
        'userRole' => $this->getUserRole(),
        'inquiryGroupUserShares' => $this->getInquiryGroupUserShares(),
        ];
    }

    public function getConfigurationArray(): array
    {
        return [
        'access' => $this->getAccess(),
        'autoReminder' => $this->getAutoReminder(),
        'expire' => $this->getExpire(),
        'forceConfidentialComments' => $this->getForceConfidentialComments(),
        'allowComment' => boolval($this->getAllowComment()),
        'showResults' => $this->getShowResults(),
        'supportMode' => $this->getSupportMode(),
        ];
    }

    public function getPermissionsArray(): array
    {
        return [
        'addInquiry' => $this->getIsAllowed(self::PERMISSION_INQUIRY_ADD),
        'addShares' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD),
        'addSharesExternal' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD_EXTERNAL),
        'archive' => $this->getIsAllowed(self::PERMISSION_INQUIRY_ARCHIVE),
        'changeForeignSupports' => $this->getIsAllowed(self::PERMISSION_SUPPORT_FOREIGN_CHANGE),
        'changeOwner' => $this->getIsAllowed(self::PERMISSION_INQUIRY_CHANGE_OWNER),
        'comment' => $this->getIsAllowed(self::PERMISSION_COMMENT_ADD),
        'support' => $this->getIsAllowed(self::PERMISSION_SUPPORT_ADD),
        'confirmInquiry' => $this->getIsAllowed(self::PERMISSION_INQUIRY_CONFIRM),
        'delete' => $this->getIsAllowed(self::PERMISSION_INQUIRY_DELETE),
        'edit' => $this->getIsAllowed(self::PERMISSION_INQUIRY_EDIT),
        'reorderInquiries' => $this->getIsAllowed(self::PERMISSION_INQUIRYS_REORDER),
        'seeResults' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW),
        'seeUsernames' => $this->getIsAllowed(self::PERMISSION_INQUIRY_USERNAMES_VIEW),
        'subscribe' => $this->getIsAllowed(self::PERMISSION_INQUIRY_SUBSCRIBE),
        'takeOver' => $this->getIsAllowed(self::PERMISSION_INQUIRY_TAKEOVER),
        'view' => $this->getIsAllowed(self::PERMISSION_INQUIRY_VIEW),
        ];
    }

    /**
     * @return static
     */
    public function deserializeArray(array $inquiryConfiguration): self
    {
        $this->setAccess($inquiryConfiguration['access'] ?? $this->getAccess());
        $this->setAutoReminder($inquiryConfiguration['autoReminder'] ?? $this->getAutoReminder());
        $this->setAllowComment($inquiryConfiguration['allowComment'] ?? $this->getAllowComment()); 
        $this->setExpire($inquiryConfiguration['expire'] ?? $this->getExpire());
        $this->setForceConfidentialComments($inquiryConfiguration['forceConfidentialComments'] ?? $this->getForceConfidentialComments());
        $this->setShowResults($inquiryConfiguration['showResults'] ?? $this->getShowResults());
        return $this;
    }


    public function getExpired(): bool
    {
        $expiry = $this->getExpire();
        return ($expiry > 0 && $expiry < time());
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

    public function setSupportModestring(string $mode)
    {
        return $this->supportMode=$mode;
    }

    public function setMiscField(string $key, mixed $value): void
    {
        $this->miscFields[$key] = $value;
    }

    public function getInquiryUrl(): string
    {
        return $this->urlGenerator->linkToRouteAbsolute(
            AppConstants::APP_ID . '.page.vote',
            ['id' => $this->getId()]
        );
    }

    public function getSupportUrl(): string
    {
        return $this->urlGenerator->linkToRouteAbsolute(
            AppConstants::APP_ID . '.page.support',
            ['id' => $this->getId()]
        );
    }
    // Setting childs for setting rights

    public function setChilds(array $childs): void
    {
        $this->childs = $childs;
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
        return $this->getMiscField('autoReminder') ?? false; 
    }

    private function setAutoReminder(bool|int $value): void
    {
        $this->setMiscField('autoReminder', (bool)$value);
    }

    private function setForceConfidentialComments(bool|int $value): void
    {
        $this->setMiscField('forceConfidentialComments', (bool)$value);
    }

    public function getForceConfidentialComments(): bool
    {
        return $this->getMiscField('forceConfidentialComments') ?? false; 
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
            self::PERMISSION_SUPPORT_ADD => $this->getAllowSupporting(),
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
            self::PERMISSION_SUPPORT_EDIT => $this->getAllowSupport(),
            self::PERMISSION_SUPPORT_FOREIGN_CHANGE => $this->getAllowChangeForeignSupports(),
            self::PERMISSION_SHARE_ADD => $this->systemSettings->getShareCreateAllowed(),
            self::PERMISSION_SHARE_ADD_EXTERNAL => $this->systemSettings->getExternalShareCreationAllowed(),
            default => false,
        };
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
        $access=$this->getAccess();
        return ($access === self::ACCESS_OPEN || $access === self::ACCESS_MODERATE) && $this->userSession->getIsLoggedIn();
    }

    /**
     * getCurrentUserUSpprt - Is user has supported this inquiry?
     *
     * @return bool Returns true, if the current user is already a supporter of the current inquiry.
     */
    private function hasSupported(): bool
    {
        return $this->hasSupported;
    }

    private function supportValue(): ?int
    {
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

        if ($this->getAccess()) {
            return true;
        }
        
        if ($this->getIsOpenInquiry()) {
            return true;
        }
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
        foreach ($this->children as $child) {
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

    private function getAllowSupporting(): bool
    {
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        return (bool)$this->getAllowSupport();
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

    private function getAllowSupport(): bool
    {
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        if ($this->userSession->getShare()->getType() === 'public') {
            return false;
        }

        return !$this->getExpired();
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

    public function setFamily(?string $family): void
    {
        $this->family = $family;
    }

    public function getFamily(): ?string
    {
        return $this->family;
    }


}
