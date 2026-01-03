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
 * @method    int getInquiryId()
 * @method    void setInquiryId(int $value)
 * @method    int getParentId()
 * @method    void setParentId(int $value)
 * @method    string getType()
 * @method    void setType(string $value)
 * @method    string getAccess()
 * @method    void setAccess(string $value)
 * @method    string getOptionText()
 * @method    void setOptionText(string $value)
 * @method    string getOwner()
 * @method    void setOwner(string $value)
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
 * @method    int getAllowComment()
 * @method    void setAllowComment(int $value)
 * @method    int getSupportFeature()
 * @method    void setSupportFeature(int $value)
 * @method    int getSortOrder()
 * @method    void setSortOrder(int $value)
 *
 * Magic functions for joined columns
 * @method    string getShareToken()
 * @method    int getCurrentUserSupports()
 * @method    int getCountParticipants()
 * @method    int getCountComments()
 * @method    int getCountSupports()
 */
class Option extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_options';
    public const ACCESS_HIDDEN = 'hidden';
    public const ACCESS_PUBLIC = 'public';
    public const ACCESS_PRIVATE = 'private';
    public const ACCESS_OPEN = 'open';
    public const SHOW_RESULTS_ALWAYS = 'always';
    public const SHOW_RESULTS_CLOSED = 'closed';
    public const SHOW_RESULTS_NEVER = 'never';

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
    protected int $inquiryId = 0;
    protected int $parentId = 0;
    protected string $type = '';
    protected string $access = '';
    protected string $optionText = '';
    protected string $owner = '';
    protected int $created = 0;
    protected int $updated = 0;
    protected string $showResults = '';
    protected int $deleted = 0;
    protected int $archived = 0;
    protected string $status = self::DEFAULT_STATUS_DRAFT;
    protected int $allowComment = 0;
    protected int $allowSupport = 0;
    protected int $sortOrder = 0;

    // joined columns
    protected string $userRole = '';
    protected string $shareToken = '';
    protected int $currentUserSupports = 0;
    protected int $countParticipants = 0;
    protected int $countComments = 0;
    protected int $countSupports = 0;
    protected string $groupShares = '';
    protected string $optionGroups = '';
    protected string $optionGroupUserShares = '';

    // Dynamic fields for option types
    private array $dynamicFields = [];
    private array $optionTypeConfig = [];

    private array $children = [];

    public function __construct()
    {
        $this->addType('inquiryId', 'integer');
        $this->addType('parentId', 'integer');
        $this->addType('created', 'integer');
        $this->addType('updated', 'integer');
        $this->addType('deleted', 'integer');
        $this->addType('archived', 'integer');
        $this->addType('allowComment', 'integer');
        $this->addType('allowSupport', 'integer');
        $this->addType('sortOrder', 'integer');

        // joined Attributes
        $this->addType('currentUserSupports', 'integer');
        $this->addType('countParticipants', 'integer');
        $this->addType('countComments', 'integer');
        $this->addType('countSupports', 'integer');

        $this->urlGenerator = Container::queryClass(IURLGenerator::class);
        $this->systemSettings = Container::queryClass(SystemSettings::class);
        $this->appSettings = Container::queryClass(AppSettings::class);
        $this->userSession = Container::queryClass(UserSession::class);

        // Load option type configurations
        $this->loadOptionTypeConfig();
    }

    public function jsonSerialize(): array
    {
        
        $baseData = [
            'id' => $this->getId(),
            'inquiryId' => $this->getInquiryId(),
            'parentId' => $this->getParentId(),
            'type' => $this->getType(),
            'access' => $this->getAccess(),
            'optionText' => $this->getOptionText(),
            'owner' => $this->getUser(),
            'created' => $this->getCreated(),
            'updated' => $this->getUpdated(),
            'showResults' => $this->getShowResults(),
            'deleted' => $this->getDeleted(),
            'archived' => $this->getArchived(),
            'status' => $this->getStatus(),
            'allowComment' => $this->getAllowComment(),
            'allowSupport' => $this->getSupportFeature(),
            'sortOrder' => $this->getSortOrder(),
            'statusInfo' => $this->getStatusArray(),
            'currentUserStatus' => $this->getCurrentUserStatus(),
            'permissions' => $this->getPermissionsArray(),
            'optionGroups' => $this->getOptionGroups(),
        ];


        return $baseData ;
    }

    public function getStatusArray(): array
    {
        return [
            'created' => $this->getCreated(),
            'updated' => $this->getUpdated(),
            'isArchived' => (bool)$this->getArchived(),
            'isDeleted' => (bool)$this->getDeleted(),
            'countParticipants' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW) ? $this->getCountParticipants() : 0,
            'countComments' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW) ? $this->getCountComments() : 0,
            'countSupports' => $this->getIsAllowed(self::PERMISSION_OPTION_RESULTS_VIEW) ? $this->getCountSupports() : 0,
        ];
    }

    public function getCurrentUserStatus(): array
    {
        return [
            'isInvolved' => $this->getIsInvolved(),
            'hasSupported' => $this->hasSupported(),
            'isLoggedIn' => $this->userSession->getIsLoggedIn(),
            'isOwner' => $this->getIsOptionOwner(),
            'shareToken' => $this->getShareToken(),
            'userId' => $this->userSession->getCurrentUserId(),
            'userRole' => $this->getUserRole(),
            'optionGroupUserShares' => $this->getOptionGroupUserShares(),
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

    public function getExpired(): bool
    {
        // Options don't have expire field in this table structure
        return false;
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
                }
                return self::ROLE_USER;
            }
        }

        if ($evaluatedRole === self::ROLE_ADMIN) {
            return self::ROLE_USER;
        }

        return $evaluatedRole ?: self::ROLE_NONE;
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
        $this->children = $children;
    }

    public function getOptionId(): int
    {
        return $this->getId();
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
            self::PERMISSION_OPTION_ADD => $this->getAllowAddOption(),
            self::PERMISSION_OPTION_CONFIRM => $this->getAllowConfirmOption(),
            self::PERMISSION_OPTION_DELETE => $this->getAllowDeleteOption(),
            self::PERMISSION_OPTIONS_REORDER => $this->getAllowReorderOptions(),
            self::PERMISSION_OVERRIDE => true,
            self::PERMISSION_OPTION_VIEW => $this->getAllowAccessOption(),
            self::PERMISSION_OPTION_EDIT => $this->getAllowEditOption(),
            self::PERMISSION_OPTION_ARCHIVE => $this->getAllowEditOption(),
            self::PERMISSION_OPTION_TAKEOVER => $this->getAllowTakeOver(),
            self::PERMISSION_OPTION_CHANGE_OWNER => $this->getAllowChangeOwner(),
            self::PERMISSION_OPTION_SUBSCRIBE => $this->getAllowSubscribeToOption(),
            self::PERMISSION_OPTION_RESULTS_VIEW => $this->getAllowShowResults(),
            self::PERMISSION_SUPPORT_EDIT => $this->getSupportFeature(),
            self::PERMISSION_SUPPORT_FOREIGN_CHANGE => $this->getAllowChangeForeignSupports(),
            self::PERMISSION_SHARE_ADD => $this->systemSettings->getShareCreateAllowed(),
            self::PERMISSION_SHARE_ADD_EXTERNAL => $this->systemSettings->getExternalShareCreationAllowed(),
            self::PERMISSION_DEANONYMIZE => $this->getAllowDeanonymize(),
            default => false,
        };
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

    private function getIsOpenOption(): bool
    {
        return $this->getAccess() === self::ACCESS_OPEN && $this->userSession->getIsLoggedIn();
    }

    private function hasSupported(): bool
    {
        return $this->getCurrentUserSupports() > 0;
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

    private function getAllowEditOption(): bool
    {
        if (defined('OC_CONSOLE')) {
            return true;
        }

        if ($this->getIsOptionOwner()) {
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
        return $this->getAllowEditOption()
            || $this->userSession->getCurrentUser()->getIsAdmin();
    }

    private function getAllowAccessOption(): bool
    {
        if ($this->getAllowEditOption()) {
            return true;
        }

        if ($this->getDeleted()) {
            return false;
        }

        if ($this->getArchived()) {
            return false;
        }

        if ($this->getIsOpenOption()) {
            return true;
        }

        $share = $this->userSession->getShare();
        return (bool)($share->getId() && $share->getOptionId() === $this->getId());
    }

    private function getAllowDeleteOption(): bool
    {
        if ($this->getAllowEditOption()) {
            return true;
        }

        return $this->userSession->getCurrentUser()->getIsAdmin();
    }

    private function getAllowAddOption(): bool
    {
        if ($this->getAllowEditOption()) {
            return true;
        }

        if (!$this->getAllowAccessOption()) {
            return false;
        }

        if ($this->userSession->getShare()->getType() === 'public') {
            return false;
        }

        return true;
    }

    private function getAllowConfirmOption(): bool
    {
        return $this->getAllowEditOption() && $this->getExpired();
    }

    private function getAllowReorderOptions(): bool
    {
        return $this->getAllowEditOption() && !$this->getExpired();
    }

    public function matchUser(string $userId): bool
    {
        return $this->userSession->getCurrentUser()->getId() === $userId;
    }

    public function getIsOptionOwner(): bool
    {
        return ($this->getUserRole() === self::ROLE_OWNER);
    }

    public function getIsHaveParticipated(): bool
    {
        $userId = $this->userSession->getCurrentUser()->getId();
        foreach ($this->children as $child) {
            if ($child->userId === $userId) {
                return true;
            }
        }
        return false;
    }

    private function getAllowCommenting(): bool
    {
        if (!$this->getAllowAccessOption()) {
            return false;
        }

        if ($this->userSession->getShare()->getType() === 'public') {
            return false;
        }


        return (bool)$this->getAllowComment();
    }

    private function getSupportFeaturing(): bool
    {
        if (!$this->getAllowAccessOption()) {
            return false;
        }

        return (bool)$this->getSupportFeature();
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
        return $this->getAllowEditOption() && $this->getUser()->getIsUnrestrictedOptionOwner();
    }

    private function getAllowDeanonymize(): bool
    {
        return $this->getAllowEditOption() && $this->getUser()->getIsUnrestrictedOptionOwner();
    }

    private function getSupportFeature(): bool
    {
        if (!$this->getAllowAccessOption()) {
            return false;
        }

        if ($this->userSession->getShare()->getType() === 'public') {
            return false;
        }

        return true;
    }

    private function getAllowSubscribeToOption(): bool
    {
        if (!$this->getAllowAccessOption()) {
            return false;
        }

        return $this->userSession->getCurrentUser()->getHasEmail();
    }

    private function getAllowShowResults(): bool
    {
        if ($this->getAllowEditOption()) {
            return true;
        }

        if (!$this->getAllowAccessOption()) {
            return false;
        }

        if ($this->getShowResults() === self::SHOW_RESULTS_CLOSED && $this->getExpired()) {
            return true;
        }

        return $this->getShowResults() === self::SHOW_RESULTS_ALWAYS;
    }
}
