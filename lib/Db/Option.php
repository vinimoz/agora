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
use OCA\Agora\Db\Inquiry;

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
 * @method    string getAccess()
 * @method    void setAccess(string $value)
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
 * @method    int getDeleted()
 * @method    void setDeleted(int $value)
 * @method    int getArchived()
 * @method    void setArchived(int $value)
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
    public const ACCESS_PRIVATE = 'private';
    public const ACCESS_OPEN = 'open';
    public const ACCESS_GROUP = 'group';
    public const SHOW_RESULTS_ALWAYS = 'always';
    public const SHOW_RESULTS_CLOSED = 'closed';
    public const SHOW_RESULTS_NEVER = 'never';
    public const URI_PREFIX = 'option/';

    // Option types (for debate inquiries)
    public const TYPE_ARGUMENT_FOR = 'argument_for';
    public const TYPE_ARGUMENT_AGAINST = 'argument_against';
    public const TYPE_PROPOSAL = 'proposal';
    public const TYPE_QUESTION = 'question';
    public const TYPE_IDEA = 'idea';

    public const ROLE_USER = 'user';
    public const ROLE_ADMIN = 'admin';
    public const ROLE_EMAIL = 'email';
    public const ROLE_CONTACT = 'contact';
    public const ROLE_EXTERNAL = 'external';
    public const ROLE_OWNER = 'owner';
    public const ROLE_NONE = 'none';

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

    // schema columns
    public $id = null;
    protected int $targetId = 0;
    protected int $parentId = 0;
    protected string $type = '';
    protected string $access = 'private';
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

    // joined columns
    protected bool $hasSupported = false;
    protected mixed $supportValue = null;
    protected string $userRole = '';
    protected string $shareToken = '';
    protected int $currentUserSupports = 0;
    protected int $countParticipants = 0;
    protected int $countComments = 0;
    protected int $countSupports = 0;
    protected string $groupShares = '';
    protected string $optionGroups = '';
    protected string $optionGroupUserShares = '';
    protected string $inquiryTitle = '';
    protected string $inquiryType = '';
    protected string $inquiryAccess = '';
    protected ?string $miscSettingsConcat = '';

    // Dynamic fields for option types
    protected ?string $supportResult = null;
    protected array $miscFields = [];
    private array $optionTypeConfig = [];
    protected ?float $trendingScore = null;
    private array $childs = [];

    /**
     * The parent Inquiry. When set, all access / edit / config decisions
     * are delegated to it (see getAllow* and getAllowComment et al.).
     */
    protected ?Inquiry $inquiry = null;

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

        // joined Attributes
        $this->addType('currentUserSupports', 'integer');
        $this->addType('countParticipants', 'integer');
        $this->addType('countComments', 'integer');
        $this->addType('miscSettingsConcat', 'string');

        $this->urlGenerator = Container::queryClass(IURLGenerator::class);
        $this->systemSettings = Container::queryClass(SystemSettings::class);
        $this->appSettings = Container::queryClass(AppSettings::class);
        $this->userSession = Container::queryClass(UserSession::class);
    }

    /* ------------------------------------------------------------------ */
    /* Inquiry attachment                                                 */
    /* ------------------------------------------------------------------ */

    public function setInquiry(?Inquiry $inquiry): void
    {
        $this->inquiry = $inquiry;
    }

    public function getInquiry(): ?Inquiry
    {
        return $this->inquiry;
    }

    /* ------------------------------------------------------------------ */
    /* Config inheritance from parent Inquiry                             */
    /* ------------------------------------------------------------------ */

    /**
     * Inherit commenting flag from the parent inquiry. Falls back to the
     * option's local value when no inquiry is attached (e.g. mid-creation,
     * before hydration — see OptionService::create()).
     */
    public function getAllowComment(): ?int
    {
        $inquiry = $this->getInquiry();
        if ($inquiry !== null) {
            return $inquiry->getAllowComment();
        }
        return $this->allowComment;
    }

    public function getSupportFeature(): string
    {
        $inquiry = $this->getInquiry();
        if ($inquiry !== null) {
            return $inquiry->getSupportFeature();
        }
        return $this->supportFeature;
    }

    public function getShowResults(): string
    {
        $inquiry = $this->getInquiry();
        if ($inquiry !== null) {
            return $inquiry->getShowResults();
        }
        return $this->showResults;
    }

    public function getExpired(): bool
    {
        return $this->getInquiry()?->getExpired() ?? false;
    }

    /* ------------------------------------------------------------------ */
    /* Existing behaviour                                                 */
    /* ------------------------------------------------------------------ */

    public function setText(string $text): void
    {
        $this->text = $text;
        $this->markFieldUpdated('text');
    }

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
        ];
    }

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

    public function getCountSupports(): int
    {
        return $this->countSupports;
    }

    public function getConfigurationArray(): array
    {
        return [
            'access' => $this->getAccess(),
            'allowComment' => (bool)$this->getAllowComment(),
            'supportFeature' => $this->getSupportFeature(),
        ];
    }

    public function getMiscArray(): array
    {
        return $this->miscFields;
    }

    public function getTrendingScore(): ?float
    {
        return $this->trendingScore;
    }

    public function setTrendingScore(?float $score): void
    {
        $this->trendingScore = $score;
    }

    /* ------------------------------------------------------------------ */
    /* Permission entry point                                             */
    /* ------------------------------------------------------------------ */

    public function getIsAllowed(string $permission): bool
    {
        return match ($permission) {
            self::PERMISSION_OPTION_VIEW => $this->getAllowAccessOption(),
            self::PERMISSION_OPTION_RESULTS_VIEW => $this->getAllowShowResults(),

            self::PERMISSION_OPTION_EDIT => $this->getAllowEditOption(),
            self::PERMISSION_OPTION_DELETE => $this->getAllowDeleteOption(),
            self::PERMISSION_OPTION_ARCHIVE => $this->getAllowEditOption(),
            self::PERMISSION_OPTION_CHANGE_OWNER => $this->getAllowChangeOwner(),
            self::PERMISSION_OPTIONS_REORDER => $this->getAllowReorderOptions(),
            self::PERMISSION_OPTION_CONFIRM => $this->getAllowConfirmOption(),

            self::PERMISSION_COMMENT_ADD => $this->getAllowCommenting(),
            self::PERMISSION_SUPPORT_ADD => $this->getSupportFeaturing(),

            self::PERMISSION_COMMENT_DELETE => $this->getAllowDeleteComment(),
            self::PERMISSION_SUPPORT_DELETE => $this->getAllowDeleteSupport(),
            self::PERMISSION_SUPPORT_FOREIGN_CHANGE => $this->getAllowChangeForeignSupports(),
            self::PERMISSION_DEANONYMIZE => $this->getAllowDeanonymize(),

            self::PERMISSION_OPTION_TAKEOVER => $this->getAllowTakeOver(),
            self::PERMISSION_OPTION_ADD => $this->getAllowAddOption(),
            self::PERMISSION_OPTION_SUBSCRIBE => $this->getAllowSubscribeToOption(),

            self::PERMISSION_SHARE_ADD => $this->systemSettings->getShareCreateAllowed(),
            self::PERMISSION_SHARE_ADD_EXTERNAL => $this->systemSettings->getExternalShareCreationAllowed(),

            self::PERMISSION_OVERRIDE => true,

            default => false,
        };
    }

    public function getSupportResult(): ?array
    {
        if ($this->supportResult === null || $this->supportResult === '') {
            return null;
        }
        $decoded = json_decode($this->supportResult, true);
        return is_array($decoded) ? $decoded : [];
    }

    /* ------------------------------------------------------------------ */
    /* Access / edit permission implementations                           */
    /* ------------------------------------------------------------------ */

    /**
     * Visibility is fully delegated to the parent Inquiry. If the inquiry
     * is inaccessible (draft, rejected, restricted group, deleted, archived,
     * missing share, …) the option is inaccessible too. This closes the
     * 1.7.14 information-disclosure bug at the model layer.
     */
    private function getAllowAccessOption(): bool
    {
        $inquiry = $this->getInquiry();
        if ($inquiry === null) {
            // targetId=0 never occurs per design; fail-closed.
            return false;
        }
        return $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_VIEW);
    }

    /**
     * See-results follows the inquiry's PERMISSION_INQUIRY_RESULTS_VIEW,
     * which already honours showResults=closed + expiry + never.
     */
    private function getAllowShowResults(): bool
    {
        $inquiry = $this->getInquiry();
        return $inquiry !== null
            && $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_RESULTS_VIEW);
    }

    /**
     * Edit is granted to:
     *  - anyone with edit rights on the inquiry (owner / delegated admin), OR
     *  - the option's own owner, provided they can at least view the inquiry.
     *
     * System admins who are not inquiry owners are deliberately excluded
     * (fixes the 1.7.14 privileged-bypass; see user requirement #2).
     */
    private function getAllowEditOption(): bool
    {
        if (defined('OC_CONSOLE')) {
            return true;
        }
        $inquiry = $this->getInquiry();
        if ($inquiry === null) {
            return false;
        }
        if ($inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_EDIT)) {
            return true;
        }
        return $this->getIsOptionOwner()
            && $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_VIEW);
    }

    private function getAllowDeleteOption(): bool
    {
        return $this->getAllowEditOption();
    }

    private function getAllowDeleteSupport(): bool
    {
        return $this->getAllowEditOption();
    }

    private function getAllowDeleteComment(): bool
    {
        return $this->getAllowEditOption();
    }

    private function getAllowChangeForeignSupports(): bool
    {
        return $this->getAllowEditOption()
            && $this->userSession->getCurrentUser()->getIsUnrestrictedInquiryOwner();
    }

    private function getAllowDeanonymize(): bool
    {
        return $this->getAllowEditOption()
            && $this->userSession->getCurrentUser()->getIsUnrestrictedInquiryOwner();
    }

    private function getAllowTakeOver(): bool
    {
        if (!$this->userSession->getCurrentUser()->getIsAdmin()) {
            return false;
        }
        $inquiry = $this->getInquiry();
        return $inquiry !== null
            && $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_EDIT);
    }

    private function getAllowChangeOwner(): bool
    {
        return $this->getAllowEditOption();
    }

    private function getAllowAddOption(): bool
    {
        $inquiry = $this->getInquiry();
        if ($inquiry === null) {
            return false;
        }
        if ($inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_EDIT)) {
            return true;
        }
        if (!$inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_VIEW)) {
            return false;
        }
        // Debate inquiries accept argument/proposal options from any viewer.
        if ($inquiry->getType() === Inquiry::TYPE_DEBATE) {
            return $this->userSession->getIsLoggedIn();
        }
        return true;
    }

    private function getAllowCommenting(): bool
    {
        return $this->getAllowAccessOption() && (bool)$this->getAllowComment();
    }

    private function getSupportFeaturing(): bool
    {
        return $this->getAllowAccessOption() && $this->getSupportFeature() !== 'none';
    }

    private function getAllowConfirmOption(): bool
    {
        return $this->getAllowEditOption() && $this->getExpired();
    }

    private function getAllowReorderOptions(): bool
    {
        return $this->getAllowEditOption();
    }

    private function getAllowSubscribeToOption(): bool
    {
        return $this->getAllowAccessOption()
            && $this->userSession->getCurrentUser()->getHasEmail();
    }

    /* ------------------------------------------------------------------ */
    /* Current user & permissions arrays                                  */
    /* ------------------------------------------------------------------ */

    public function getCurrentUserStatus(): array
    {
        return [
            'isInvolved' => $this->getIsInvolved(),
            'hasSupported' => $this->hasSupported(),
            'supportValue' => $this->supportValue(),
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

    public function getInquiryInfoArray(): array
    {
        return [
            'targetId' => $this->getTargetId(),
            'inquiryTitle' => $this->inquiryTitle ?: '',
            'inquiryType' => $this->inquiryType ?: '',
            'inquiryAccess' => $this->inquiryAccess ?: '',
        ];
    }

    public function getUserRole(): string
    {
        if ($this->getCurrentUserIsEntityUser()) {
            return self::ROLE_OWNER;
        }

        $evaluatedRole = $this->userRole;

        if ($this->getOptionGroupUserShares() && !$evaluatedRole) {
            foreach ($this->getOptionGroupUserShares() as $shareType) {
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

    public function getOptionUrl(): string
    {
        return $this->urlGenerator->linkToRouteAbsolute(
            AppConstants::APP_ID . '.page.option',
            ['id' => $this->getId()]
        );
    }

    public function setChildren(array $children): void
    {
        $this->childs = $children;
    }

    public function getChildren(): array
    {
        return $this->childs;
    }

    public function getUserId(): string
    {
        return $this->getOwner();
    }

    public function setUserId(string $userId): void
    {
        $this->setOwner($userId);
    }

    /* ------------------------------------------------------------------ */
    /* Group shares / hierarchy                                           */
    /* ------------------------------------------------------------------ */

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

    /* ------------------------------------------------------------------ */
    /* Misc field management                                              */
    /* ------------------------------------------------------------------ */

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

    /**
     * @return static
     */
    public function deserializeArray(array $optionConfiguration): self
    {
        $this->setAccess($optionConfiguration['access'] ?? $this->getAccess());
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

    public function request(string $permission): bool
    {
        if (!$this->getIsAllowed($permission)) {
            throw new ForbiddenException('denied permission ' . $permission);
        }
        return true;
    }

    /* ------------------------------------------------------------------ */
    /* Involvement helpers                                                */
    /* ------------------------------------------------------------------ */

    private function getIsInvolved(): bool
    {
        return (
            $this->getIsOptionOwner()
            || $this->getIsParticipant()
            || $this->getIsPersonallyInvited()
            || $this->getIsInvitedViaGroupShare()
        );
    }

    private function getIsOpenOption(): bool
    {
        return $this->getAccess() === self::ACCESS_OPEN && $this->userSession->getIsLoggedIn();
    }

    private function hasSupported(): bool
    {
        return $this->hasSupported;
    }

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
            fn ($groupName) => $this->userSession->getCurrentUser()->getIsInGroup($groupName)
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
            ],
            true
        );
    }

    private function getIsDelegatedAdmin(): bool
    {
        return $this->getUserRole() === self::ROLE_ADMIN;
    }

    public function matchUser(string $userId): bool
    {
        return $this->userSession->getCurrentUser()->getId() === $userId;
    }

    public function getIsOptionOwner(): bool
    {
        return $this->getUserRole() === self::ROLE_OWNER;
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

    /* ------------------------------------------------------------------ */
    /* Setters used by the service layer                                  */
    /* ------------------------------------------------------------------ */

    public function setInquiryInfo(string $title, string $type, string $access): void
    {
        $this->inquiryTitle = $title;
        $this->inquiryType = $type;
        $this->inquiryAccess = $access;
    }

    public function setSupported(bool $hasSupported, mixed $supportValue = null): void
    {
        $this->hasSupported = $hasSupported;
        $this->supportValue = $supportValue;
    }

    public function loadMiscFromConcat(): void
    {
        if ($this->miscSettingsConcat) {
            $pairs = explode(OptionMisc::CONCAT_SEPARATOR, $this->miscSettingsConcat);
            foreach ($pairs as $pair) {
                if (strpos($pair, '=') !== false) {
                    [$key, $value] = explode('=', $pair, 2);
                    $this->miscFields[$key] = $value;
                }
            }
        }
    }
}
