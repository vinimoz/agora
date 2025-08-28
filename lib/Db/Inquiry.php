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
use OCA\Agora\Db\CommentMapper;
use OCA\Agora\Db\SupportMapper;
/**
 * @psalm-api
 * @method    int getId()
 * @method    void setId(int $value)
 * @method    string getType()
 * @method    void setType(string $value)
 * @method    string getTitle()
 * @method    void setTitle(string $value)
 * @method    void setDescription(string $value)
 * @method    string getOwner()
 * @method    void setOwner(string $value)
 * @method    int getCreated()
 * @method    void setCreated(int $value)
 * @method    int getExpire()
 * @method    void setExpire(int $value)
 * @method    int getDeleted()
 * @method    void setDeleted(int $value)
 * @method    void setAccess(string $value)
 * @method    int getAnonymous()
 * @method    void setAnonymous(int $value)
 * @method    int getAllowComment()
 * @method    void setAllowComment(int $value)
 * @method    int getSuggestionsExpire()
 * @method    void setSuggestionsExpire(int $value)
 * @method    int getSupportLimit()
 * @method    void setSupportLimit(int $value)
 * @method    string getShowResults()
 * @method    void setShowResults(string $value)
 * @method    int getAdminAccess()
 * @method    void setAdminAccess(int $value)
 * @method    int getHideBookedUp()
 * @method    void setHideBookedUp(int $value)
 * @method    int getUseNo()
 * @method    void setUseNo(int $value)
 * @method    int getLastInteraction()
 * @method    void setLastInteraction(int $value)
 * @method    string getMiscSettings()
 * @method    void setMiscSettings(string $value)
 * @method    string getStatus()
 * @method    void setStatus(string $value)
 * @method    int getCategoryId()
 * @method    void setCategoryId(int $value)
 * @method    int getLocationId()
 * @method    void setLocationId(int $value)
 * @method    int getParentId()
 * @method    void setParentId(int $value)

 * Magic functions for joined columns
 * @method    int getShareToken()
 * @method    int getCurrentUserSupports()
 * @method    int getCountParticipants()
 * @method    int getCountComments()
 * @method    int getCountSupports()
 *
 * Magic functions for subqueried columns
 */

class Inquiry extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inquiries';
    public const TYPE_PROPOSAL = 'proposal';
    public const TYPE_DEBATE = 'debate';
    public const TYPE_PROJECT = 'project';
    public const TYPE_GRIEVANCE = 'grievance';
    public const TYPE_PETITION = 'petition';
    public const TYPE_SUGGESTION = 'suggestion';
    public const TYPE_OFFICIAL= 'official';
    public const INQ_VALID_TYPE = [
            self::TYPE_PROPOSAL,
               self::TYPE_DEBATE,
                self::TYPE_PROJECT,
            self::TYPE_GRIEVANCE,
                    self::TYPE_PETITION,
                    self::TYPE_SUGGESTION,
                    self::TYPE_OFFICIAL,
    ];
    public const VARIANT_SIMPLE = 'simple';
    public const ACCESS_HIDDEN = 'hidden';
    public const ACCESS_PUBLIC = 'public';
    public const ACCESS_PRIVATE = 'private';
    public const ACCESS_OPEN = 'open';
    public const SHOW_RESULTS_ALWAYS = 'always';
    public const SHOW_RESULTS_CLOSED = 'closed';
    public const SHOW_RESULTS_NEVER = 'never';
    public const SUGGESTION_DISALLOW = 'disallow';
    public const SUGGESTION_ALLOW = 'allow';
    public const SUGGESTION_REVIEW = 'review';
    public const URI_PREFIX = 'inquiry/';
    public const FIVE_DAYS = 432000;
    public const FOUR_DAYS = 345600;
    public const THREE_DAYS = 259200;
    public const TWO_DAYS = 172800;
    public const ONE_AND_HALF_DAY = 129600;

    public const ROLE_USER = Share::TYPE_USER;
    public const ROLE_ADMIN = Share::TYPE_ADMIN;
    public const ROLE_EMAIL = Share::TYPE_EMAIL;
    public const ROLE_CONTACT = Share::TYPE_CONTACT;
    public const ROLE_EXTERNAL = Share::TYPE_EXTERNAL;
    public const ROLE_OWNER = 'owner';
    public const ROLE_NONE = 'none';

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
    public const PERMISSION_OPTION_ADD = 'addOptions';
    public const PERMISSION_OPTION_CONFIRM = 'confirmOption';
    public const PERMISSION_OPTION_DELETE = 'deleteOption';
    public const PERMISSION_OPTIONS_REORDER = 'reorderOptions';
    public const PERMISSION_SUPPORT_EDIT = 'support';
    public const PERMISSION_SUPPORT_FOREIGN_CHANGE = 'changeForeignSupports';
    public const PERMISSION_SHARE_ADD = 'shareCreate';
    public const PERMISSION_SHARE_ADD_EXTERNAL = 'shareCreateExternal';
    public const PERMISSION_DEANONYMIZE = 'deanonymize';
    public const LEVEL_DRAFT = 0;
    public const LEVEL_VALIDATION = 1;
    public const LEVEL_COMMITTEE = 2;
    public const LEVEL_OFFICIAL = 3;

    public const STATUS_DRAFT = 'draft';
    public const STATUS_OPEN = 'open';
    public const STATUS_UNDER_REVIEW = 'under_review';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_REJECTED = 'rejected';

    private IURLGenerator $urlGenerator;
    protected SystemSettings $systemSettings;
    protected AppSettings $appSettings;
    protected UserSession $userSession;

    // schema columns
    public $id = null;
    protected string $type = '';
    protected string $title = '';
    protected ?string $description = '';
    protected ?string $owner = '';
    protected int $created = 0;
    protected int $expire = 0;
    protected int $deleted = 0;
    protected int $archived = 0;
    protected string $access = '';
    protected int $anonymous = 0;
    protected int $suggestionsExpire = 0;
    protected int $supportLimit = 0;
    protected string $showResults = '';
    protected int $adminAccess = 0;
    protected int $allowComment = 0;
    protected int $hideBookedUp = 0;
    protected int $lastInteraction = 0;
    protected ?string $miscSettings = '';
    protected string $moderationStatus = self::STATUS_DRAFT;
    protected int $categoryId = 0;
    protected int $locationId = 0;
    protected int $level = 0;
    protected string $slug = '';
    protected ?string $tags = '';
    protected int $parentId = 0;

    // joined columns
    protected ?int $isCurrentUserLocked = 0;
    protected string $userRole = self::ROLE_NONE;
    protected string $shareToken = '';
    protected ?string $groupShares = '';
    protected ?string $inquiryGroups = '';
    protected ?string $inquiryGroupUserShares = '';
    protected int $currentUserSupports = 0;
    protected int $countParticipants = 0;
    protected int $countComments = 0;
    protected int $countSupports = 0;
    protected ?int $maxDate = 0;
    protected int $currentUserOrphanedSupports = 0;

    private array $childs = [];

    public function __construct()
    {
        $this->addType('created', 'integer');
        $this->addType('expire', 'integer');
        $this->addType('deleted', 'integer');
        $this->addType('anonymous', 'integer');
        $this->addType('suggestionsExpire', 'integer');
        $this->addType('supportLimit', 'integer');
        $this->addType('adminAccess', 'integer');
        $this->addType('allowComment', 'integer');
        $this->addType('hideBookedUp', 'integer');
        $this->addType('lastInteraction', 'integer');
        $this->addType('level', 'integer');
            $this->addType('parentId', 'integer');
            $this->addType('deleted', 'integer');
            $this->addType('archived', 'integer');
            $this->addType('lastInteraction', 'integer');

        // joined columns
        $this->addType('isCurrentUserLocked', 'integer');
        $this->addType('maxDate', 'integer');
        $this->addType('currentUserSupports', 'integer');
        $this->addType('countParticipants', 'integer');
        $this->addType('countComments', 'integer');
        $this->addType('countSupports', 'integer');
        $this->addType('currentUserOrphanedSupports', 'integer');

        $this->urlGenerator = Container::queryClass(IURLGenerator::class);
        $this->systemSettings = Container::queryClass(SystemSettings::class);
        $this->appSettings = Container::queryClass(AppSettings::class);
        $this->userSession = Container::queryClass(UserSession::class);
    }

    /**
     * @return array
     *
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function jsonSerialize(): array
    {
        return [
        'id' => $this->getId(),
        'type' => $this->getType(),
        'title' => $this->getTitle(),
        'description' => $this->getDescription(),
        // editable settings
        'configuration' => $this->getConfigurationArray(),
        // read only properties
        'descriptionSafe' => $this->getDescriptionSafe(),
        'owner' => $this->getUser(),
        'moderationStatus' => $this->getModerationStatus(),
        'status' => $this->getStatusArray(),
        'currentUserStatus' => $this->getCurrentUserStatus(),
        'permissions' => $this->getPermissionsArray(),
        'inquiryGroups' => $this->getInquiryGroups(),
        'locationId' => $this->getLocationId(),
                    'categoryId' => $this->getCategoryId(),
                    'parentId' => $this->getParentId(),

        ];
    }

    public function getStatusArray(): array
    {
        return [
        'lastInteraction' => $this->getLastInteraction(),
        'created' => $this->getCreated(),
        'isAnonymous' => boolval($this->getAnonymous()),
        'isArchived' => boolval($this->getArchived()),
        'isExpired' => $this->getExpired(),
        'isRealAnonymous' => $this->getAnonymous() < 0,
        'relevantThreshold' => $this->getRelevantThreshold(),
        'deletionDate' => $this->getDeletionDate(),
        'archivedDate' => $this->getArchived(),
        'countParticipants' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountParticipants() : 0,
        'countComments' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountComments() : 0,
        'countSupports' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW) ? $this->getCountSupports() : 0,

        ];
    }
    public function getConfigurationArray(): array
    {
        return [
        'access' => $this->getAccess(),
        'anonymous' => boolval($this->getAnonymous()),
        'autoReminder' => $this->getAutoReminder(),
        'collapseDescription' => $this->getCollapseDescription(),
        'expire' => $this->getExpire(),
        'forceConfidentialComments' => $this->getForceConfidentialComments(),
        'allowComment' => boolval($this->getAllowComment()),
        'hideBookedUp' => boolval($this->getHideBookedUp()),
        'maxInquiriesPerUser' => $this->getSupportLimit(),
        'suggestionsExpire' => $this->getSuggestionsExpire(),
        'showResults' => $this->getShowResults(),
        ];
    }

    public function getCurrentUserStatus(): array
    {
        return [
        'groupInvitations' => $this->getGroupShares(),
        'isInvolved' => $this->getIsInvolved(),
        'isLocked' => boolval($this->getIsCurrentUserLocked()),
        'isLoggedIn' => $this->userSession->getIsLoggedIn(),
        'isOwner' => $this->getIsInquiryOwner(),
        'shareToken' => $this->getShareToken(),
        'userId' => $this->userSession->getCurrentUserId(),
        'userRole' => $this->getUserRole(),
        'inquiryGroupUserShares' => $this->getInquiryGroupUserShares(),
        ];
    }
    public function getPermissionsArray(): array
    {
        return [
        'addOptions' => $this->getIsAllowed(self::PERMISSION_OPTION_ADD),
        'addShares' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD),
        'addSharesExternal' => $this->getIsAllowed(self::PERMISSION_SHARE_ADD_EXTERNAL),
        'archive' => $this->getIsAllowed(self::PERMISSION_INQUIRY_ARCHIVE),
        'changeForeignSupports' => $this->getIsAllowed(self::PERMISSION_SUPPORT_FOREIGN_CHANGE),
        'changeOwner' => $this->getIsAllowed(self::PERMISSION_INQUIRY_CHANGE_OWNER),
        'comment' => $this->getIsAllowed(self::PERMISSION_COMMENT_ADD),
        'support' => $this->getIsAllowed(self::PERMISSION_SUPPORT_ADD),
        'confirmOptions' => $this->getIsAllowed(self::PERMISSION_OPTION_CONFIRM),
        'deanonymize' => $this->getIsAllowed(self::PERMISSION_DEANONYMIZE),
        'delete' => $this->getIsAllowed(self::PERMISSION_INQUIRY_DELETE),
        'edit' => $this->getIsAllowed(self::PERMISSION_INQUIRY_EDIT),
        'reorderOptions' => $this->getIsAllowed(self::PERMISSION_OPTIONS_REORDER),
        'seeResults' => $this->getIsAllowed(self::PERMISSION_INQUIRY_RESULTS_VIEW),
        'seeUsernames' => $this->getIsAllowed(self::PERMISSION_INQUIRY_USERNAMES_VIEW),
        'subscribe' => $this->getIsAllowed(self::PERMISSION_INQUIRY_SUBSCRIBE),
        'takeOver' => $this->getIsAllowed(self::PERMISSION_INQUIRY_TAKEOVER),
        'view' => $this->getIsAllowed(self::PERMISSION_INQUIRY_VIEW),
        'support' => $this->getIsAllowed(self::PERMISSION_SUPPORT_EDIT),
        ];
    }

    /**
     * @return static
     */
    public function deserializeArray(array $inquiryConfiguration): self
    {
        $this->setAccess($inquiryConfiguration['access'] ?? $this->getAccess());
        $this->setAnonymousSafe($inquiryConfiguration['anonymous'] ?? $this->getAnonymous());
        $this->setAutoReminder($inquiryConfiguration['autoReminder'] ?? $this->getAutoReminder());
        $this->setAllowComment($pollConfiguration['allowComment'] ?? $this->getAllowComment());
        $this->setCollapseDescription($inquiryConfiguration['collapseDescription'] ?? $this->getCollapseDescription());
        $this->setExpire($inquiryConfiguration['expire'] ?? $this->getExpire());
        $this->setForceConfidentialComments($inquiryConfiguration['forceConfidentialComments'] ?? $this->getForceConfidentialComments());
        $this->setHideBookedUp($inquiryConfiguration['hideBookedUp'] ?? $this->getHideBookedUp());
        $this->setSuggestionsExpire($inquiryConfiguration['suggestionsExpire'] ?? $this->getSuggestionsExpire());
        $this->setShowResults($inquiryConfiguration['showResults'] ?? $this->getShowResults());
        $this->setSupportLimit($inquiryConfiguration['maxSupportsPerUser'] ?? $this->getSupportLimit());
        return $this;
    }

    public function getExpired(): bool
    {
        $compareTime = time();
        $expiry = $this->getExpire();

        return (
        $expiry > 0
        && $expiry < $compareTime
        );
    }

    public function getCirclesArray(): array
    {
        $misc = $this->getMiscSettingsArray();
        return $misc['circles'] ?? [];
    }

    public function getTagsArray(): array
    {
        if ($this->getTags()) {
            return explode(',', $this->getTags());
        }
        return [];
    }


    public function getUserRole(): string
    {
        if ($this->getCurrentUserIsEntityUser()) {
            return self::ROLE_OWNER;
        }

        $evaluatedRole = $this->userRole;

        // If user is not a inquiry admin (set by normal inquiry share) and inquiry group shares exist,
        // iterate over the share types and return the higher role
        if ($this->getInquiryGroupUserShares() && !$evaluatedRole) {
            // return the higher role of the group shares
            foreach ($this->getInquiryGroupUserShares() as $shareType) {
                if ($shareType === self::ROLE_ADMIN) {
                    $evaluatedRole = self::ROLE_ADMIN;
                }
                return self::ROLE_USER;
            }
        }

        if ($this->getIsCurrentUserLocked() && $this->userRole === self::ROLE_ADMIN) {
            return self::ROLE_USER;
        }

        if ($this->userSession->getShareType() === Share::TYPE_PUBLIC) {
            return Share::TYPE_PUBLIC;
        }

        return $evaluatedRole;
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


    /**
     * Set anonymous setting
     * If setting has negative value, it is locked and cannot be changed
     *
     * @param bool|int $value - true for anonymous, false for non-anonymous
     */
    public function setAnonymousSafe(bool|int $value): void
    {
        // if anonymous is locked, do not allow changes
        if ($this->getAnonymous() < 0) {
            return;
        }

        if (!$this->getAllowDeanonymize() && $value > 0) {
            // if the owner of the inquiry is restricted, lock the anonymous
            // setting once it is set
            // lock anonymous setting by setting it to negative value
            $value = -1;
        }
        $this->setAnonymous((int)$value);
    }

    private function setAutoReminder(bool|int $value): void
    {
        $this->setMiscSettingsByKey('autoReminder', (bool)$value);
    }

    private function getAutoReminder(): bool
    {
        return $this->getMiscSettingsArray()['autoReminder'] ?? false;
    }

    private function setForceConfidentialComments(bool|int $value): void
    {
        $this->setMiscSettingsByKey('forceConfidentialComments', (bool)$value);
    }

    public function getForceConfidentialComments(): bool
    {
        return $this->getMiscSettingsArray()['forceConfidentialComments'] ?? false;
    }

    private function setCollapseDescription(bool|int $value): void
    {
        $this->setMiscSettingsByKey('collapseDescription', (bool)$value);
    }

    private function getCollapseDescription(): bool
    {
        return $this->getMiscSettingsArray()['collapseDescription'] ?? true;
    }

    // alias of getId()
    public function getInquiryId(): int
    {
        return $this->getId();
    }

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

    private function getGroupShares(): array
    {
        if ($this->groupShares !== null && $this->groupShares !== '') {
            // explode with separator and remove empty elements
            return array_filter(explode(InquiryMapper::CONCAT_SEPARATOR, InquiryMapper::CONCAT_SEPARATOR . $this->groupShares));
        }

        return [];
    }

    /**
     * Return the inquiry groups this inquiry belongs to
     *
     * @return int[]
     *
     * @psalm-return list<int>
     */
    public function getInquiryGroups(): array
    {
        if (!$this->inquiryGroups) {
            return [];
        }
        return array_map('intval', explode(InquiryGroup::CONCAT_SEPARATOR, $this->inquiryGroups));
    }

    /**
     * Returns the sharetypes of the inquiry group this inquiry belongs to
     *
     * @return string[]
     *
     * @psalm-return list<string>
     */
    public function getInquiryGroupUserShares(): array
    {
        if (!$this->inquiryGroupUserShares) {
            return [];
        }
        return explode(InquiryGroup::CONCAT_SEPARATOR, $this->inquiryGroupUserShares);
    }

    private function getAccess(): string
    {
        if ($this->access === self::ACCESS_PUBLIC) {
            return self::ACCESS_OPEN;
        }
        if ($this->access === self::ACCESS_HIDDEN) {
            return self::ACCESS_PRIVATE;
        }
        return $this->access;
    }

    private function getSuggestionsExpired(): bool
    {
        return (
        $this->getSuggestionsExpire() > 0
        && $this->getSuggestionsExpire() < time()
        );
    }

    public function getInquiryShowResults()
    {
        // avoiding migration, expired has been renamed to closed
        return $this->showResults === 'expired' ? Inquiry::SHOW_RESULTS_CLOSED : $this->showResults;
    }

    public function getDescription(): string
    {
        return $this->description ?? '';
    }

    private function getDescriptionSafe(): string
    {
        return htmlspecialchars($this->getDescription());
    }

    private function getMaxDate(): int
    {
        if ($this->maxDate === null) {
            return 0;
        }
        return $this->maxDate;
    }


    private function setMiscSettingsArray(array $value): void
    {
        $this->setMiscSettings(json_encode($value));
    }

    private function getMiscSettingsArray(): array
    {
        if ($this->getMiscSettings()) {
            return json_decode($this->getMiscSettings(), true);
        }

        return [];
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

    private function getDeletionDate(): int
    {
        if ($this->getDeleted() > 0 && $this->appSettings->getAutoDeleteEnabled()) {
            return $this->getDeleted() + ($this->appSettings->getAutoDeleteOffsetDays() * 60 * 60 * 24);
        }
        return 0;
    }

    private function getIsCurrentUserLocked(): bool
    {
        return boolval($this->isCurrentUserLocked);
    }

    /**
     * @param bool|string|int|array $value
     */
    private function setMiscSettingsByKey(string $key, $value): void
    {
        $miscSettings = $this->getMiscSettingsArray();
        $miscSettings[$key] = $value;
        $this->setMiscSettingsArray($miscSettings);
    }

    /**
     * Check Permissions
     */

    /**
     * Request a permission level and get exception if denied
     *
     * @throws ForbiddenException Thrown if access is denied
     */
    public function request(string $permission): bool
    {
        if (!$this->getIsAllowed($permission)) {
            throw new ForbiddenException('denied permission ' . $permission);
        }
        return true;
    }

    /**
     * Check particular rights and inform via boolean value, if the right is granted or denied
     */
    public function getIsAllowed(string $permission): bool
    {
        return match ($permission) {
            self::PERMISSION_COMMENT_ADD => $this->getAllowCommenting(),
            self::PERMISSION_SUPPORT_ADD => $this->getAllowSupporting(),
            self::PERMISSION_COMMENT_DELETE => $this->getAllowDeleteComment(),
            self::PERMISSION_SUPPORT_DELETE => $this->getAllowDeleteSupport(),
            self::PERMISSION_OPTION_ADD => $this->getAllowAddOptions(),
            self::PERMISSION_OPTION_CONFIRM => $this->getAllowConfirmOption(),
            self::PERMISSION_OPTION_DELETE => $this->getAllowDeleteOption(),
            self::PERMISSION_OPTIONS_REORDER => $this->getAllowReorderOptions(),
            self::PERMISSION_OVERRIDE => true,
            self::PERMISSION_INQUIRY_VIEW => $this->getAllowAccessInquiry(),
            self::PERMISSION_INQUIRY_EDIT => $this->getAllowEditInquiry(),
            self::PERMISSION_INQUIRY_DELETE => $this->getAllowDeleteInquiry(),
            self::PERMISSION_INQUIRY_ARCHIVE => $this->getAllowEditInquiry(),
            self::PERMISSION_INQUIRY_TAKEOVER => $this->getAllowTakeOver(),
            self::PERMISSION_INQUIRY_CHANGE_OWNER => $this->getAllowChangeOwner(),
            self::PERMISSION_INQUIRY_SUBSCRIBE => $this->getAllowSubscribeToInquiry(),
            self::PERMISSION_INQUIRY_RESULTS_VIEW => $this->getAllowShowResults(),
            self::PERMISSION_INQUIRY_USERNAMES_VIEW => $this->getAllowEditInquiry() || !$this->getAnonymous(),
            self::PERMISSION_SUPPORT_EDIT => $this->getAllowSupport(),
            self::PERMISSION_SUPPORT_FOREIGN_CHANGE => $this->getAllowChangeForeignSupports(),
            self::PERMISSION_SHARE_ADD => $this->systemSettings->getShareCreateAllowed(),
            self::PERMISSION_SHARE_ADD_EXTERNAL => $this->systemSettings->getExternalShareCreationAllowed(),
            self::PERMISSION_DEANONYMIZE => $this->getAllowDeanonymize(),
            default => false,
        };
    }

    /**
     * getIsInvolved - Is current user involved in current inquiry?
     *
     * @return bool Returns true, if the current user is involved in the inquiry via share, as a participant or as the inquiry owner.
     */
    private function getIsInvolved(): bool
    {
        return (
        $this->getIsInquiryOwner()
        || $this->getIsParticipant()
        || $this->getIsPersonallyInvited())
        || $this->getIsInvitedViaGroupShare();
    }

    /**
     * Check, if inquiry settings is set to open access for internal users
     */
    private function getIsOpenInquiry(): bool
    {
        return $this->getAccess() === Inquiry::ACCESS_OPEN && $this->userSession->getIsLoggedIn();
    }

    /**
     * getIsParticipant - Is user a participant?
     *
     * @return bool Returns true, if the current user is already a particitipant of the current inquiry.
     */
    private function getIsParticipant(): bool
    {
        return $this->getCurrentUserSupports() > 0;
    }

    /**
     * getIsInvitedViaGroupShare - Is the inquiry shared via group share?
     * where the current user is member of. This only affects logged in users.
     *
     * @return bool Returns true, if the current inquiry contains a group share with a group,
     */
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
            $this->getGroupShares(), function ($groupName) {
                return ($this->userSession->getCurrentUser()->getIsInGroup($groupName));
            }
        );
    }
    /**
     * getIsPersonallyInvited - Is the inquiry shared via user share with the current user?
     * Checking via user role
     *
     * @return bool Returns true, if the current inquiry contains a user role which matches a share type
     */
    private function getIsPersonallyInvited(): bool
    {
        return in_array(
            $this->getUserRole(), [
            Inquiry::ROLE_ADMIN,
            Inquiry::ROLE_USER,
            Inquiry::ROLE_EXTERNAL,
            Inquiry::ROLE_EMAIL,
            Inquiry::ROLE_CONTACT,
            ]
        );
    }

    /**
     * The detailed checks - For the sake of readability, the queries and selections
     * were kept detailed and with low complexity
     */

    /**
     * Checks, if the user has delegated admin rights to edit inquiry settings via share
     */
    private function getIsDelegatedAdmin(): bool
    {
        return $this->getUserRole() === Inquiry::ROLE_ADMIN
        && !$this->getIsCurrentUserLocked();
    }

    /**
     * Checks, if user is allowed to edit the inquiry configuration
     **/
    private function getAllowEditInquiry(): bool
    {
        // Console has god mode
        if (defined('OC_CONSOLE')) {
            return true;
        }

        if ($this->getIsInquiryOwner()) {
            return true;
        }

        // user has delegated owner rights
        if ($this->getIsDelegatedAdmin()) {
            return true;
        }

        // deny edit rights in all other cases
        return false;
    }

    private function getAllowTakeOver(): bool
    {
        return $this->userSession->getCurrentUser()->getIsAdmin();
    }

    /**
     * Checks, if user is allowed to edit the inquiry configuration
     **/
    private function getAllowChangeOwner(): bool
    {
        return $this->getAllowEditInquiry()
        || $this->userSession->getCurrentUser()->getIsAdmin();
    }

    /**
     * Checks, if user is allowed to access (view) inquiry
     */
    private function getAllowAccessInquiry(): bool
    {
        // edit rights include access to inquiry
        if ($this->getAllowEditInquiry()) {
            return true;
        }

        // No further access to inquiry, if it is deleted
        if ($this->getDeleted()) {
            return false;
        }

        // No further access to inquiry, if it is deleted
        if ($this->getArchived()) {
            return false;
        }

        // grant access if inquiry inquiry is an open inquiry (for logged in users)
        //if ($this->getIsOpenInquiry() && $this->userSession->getIsLoggedIn()) {
        if ($this->getIsOpenInquiry()) {
            return true;
        }

        $share = $this->userSession->getShare();
        // return check result of an existing valid share for this user
        return boolval($share->getId() && $share->getInquiryId() === $this->getId());
    }

    /**
     * Checks, if user is allowed to delete the inquiry
     * includes the right to archive and take over
     **/
    private function getAllowDeleteInquiry(): bool
    {
        if ($this->getAllowEditInquiry()) {
            // users with edit rights are allowed to delete the inquiry
            return true;
        }

        // additionally site admins are allowed to delete inquiries, in all other cases deny inquiry deletion right
        return $this->userSession->getCurrentUser()->getIsAdmin();
    }

    /**
     * Checks, if user is allowed to add add support options
     **/
    private function getAllowAddOptions(): bool
    {
        // Edit right includes adding new options
        if ($this->getAllowEditInquiry()) {
            return true;
        }

        // deny, if user has no access right to this inquiry
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        // public shares are not allowed to add options
        if ($this->userSession->getShare()->getType() === Share::TYPE_PUBLIC) {
            return false;
        }

        // Request for option suggestions is expired, deny
        if ($this->getSuggestionsExpired()) {
            return false;
        }

        // Locked Users are not allowed to add options
        if (boolval($this->getIsCurrentUserLocked())) {
            return false;
        }
        return true;
    }


    /**
     * Is current user allowed to delete options from inquiry
     */
    private function getAllowDeleteOption(): bool
    {
        return $this->getIsInquiryOwner() || $this->getIsDelegatedAdmin();
    }

    /**
     * Is current user allowed to confirm options
     */
    private function getAllowConfirmOption(): bool
    {
        return $this->getAllowEditInquiry() && $this->getExpired();
    }

    /**
     * Is current user allowed to confirm options
     */
    private function getAllowReorderOptions(): bool
    {
        return $this->getAllowEditInquiry() && !$this->getExpired();
    }

    /**
     * Compare $userId with current user's id
     */
    public function matchUser(string $userId): bool
    {
        return (bool)$this->userSession->getCurrentUser()->getId() && $this->userSession->getCurrentUser()->getId() === $userId;
    }

    /**
     * Checks, if the current user is the inquiry owner
     **/
    public function getIsInquiryOwner(): bool
    {
        return ($this->getUserRole() === Inquiry::ROLE_OWNER);
    }

    /**
     * Checks, if the current user have participated to this inquiry
     **/
    public function getIsHaveParticipated(): bool
    {
        $userId = $this->userSession->getCurrentUser()->getId();

        foreach ($this->childs as $child) {
            if ($child->userId === $userId) {
                 return true;
            }
        }
        return false;
    }

    /**
     * Permission checks
     */
    /**
     * Checks, if user is allowed to see and write comments
     **/
    private function getAllowCommenting(): bool
    {
        // user has no access right to this inquiry
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        // public shares are not allowed to comment
        if ($this->userSession->getShare()->getType() === Share::TYPE_PUBLIC) {
            return false;
        }

        // public shares are not allowed to comment
        if (boolval($this->getIsCurrentUserLocked())) {
            return false;
        }

        // return the poll setting for comments
        return (bool)$this->getAllowComment();
    }
    
    
    private function getAllowSupporting(): bool
    {
        // user has no access right to this inquiry
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        // public shares are not allowed to comment
        if ($this->userSession->getShare()->getType() === Share::TYPE_PUBLIC) {
            return false;
        }

        // public shares are not allowed to comment
        if (boolval($this->getIsCurrentUserLocked())) {
            return false;
        }

        // return the inquiry setting for comments
        return (bool)$this->getAllowSupport();
    }

    /**
     * Checks, if user is allowed to delete comments from inquiry
     **/
    private function getAllowDeleteSupport(): bool
    {
        return $this->getAllowEditInquiry();
    }

    /**
     * Checks, if user is allowed to delete comments from inquiry
     **/
    private function getAllowDeleteComment(): bool
    {
        return $this->getAllowEditInquiry();
    }

    /**
     * Checks, if inquiry owner is allowed to change supports
     **/
    private function getAllowChangeForeignSupports(): bool
    {
        return $this->getAnonymous() > -1 && $this->getAllowEditInquiry() && $this->getUser()->getIsUnrestrictedInquiryOwner();
    }

    /**
     * Checks, if inquiry owner is allowed to deanonymize supports
     **/
    private function getAllowDeanonymize(): bool
    {
        // Current user is allowed to edit the inquiry and the owner of the inquiry is unrestricted
        return $this->getAnonymous() > -1 && $this->getAllowEditInquiry() && $this->getUser()->getIsUnrestrictedInquiryOwner();
    }

    /**
     * Checks, if user is allowed to support
     **/
    private function getAllowSupport(): bool
    {
        // user has no access right to this inquiry
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        // public shares are not allowed to support
        if ($this->userSession->getShare()->getType() === Share::TYPE_PUBLIC) {
            return false;
        }

        // Locked users are not allowed to support
        if (boolval($this->getIsCurrentUserLocked())) {
            return false;
        }

        // deny supports, if inquiry is expired
        return !$this->getExpired();
    }

    /**
     * Checks, if user is allowed to subscribe to updates
     **/
    private function getAllowSubscribeToInquiry(): bool
    {
        // user with access to inquiry are always allowed to subscribe
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        return $this->userSession->getCurrentUser()->getHasEmail();
    }

    /**
     * Checks, if user is allowed to see results of current inquiry
     **/
    private function getAllowShowResults(): bool
    {
        // edit rights include access to results
        if ($this->getAllowEditInquiry()) {
            return true;
        }

        // no access to inquiry, deny
        if (!$this->getAllowAccessInquiry()) {
            return false;
        }

        // show results, when inquiry is closed
        if ($this->getShowResults() === Inquiry::SHOW_RESULTS_CLOSED && $this->getExpired()) {
            return true;
        }
        // return inquiry settings
        return $this->getShowResults() === Inquiry::SHOW_RESULTS_ALWAYS;
    }


}
