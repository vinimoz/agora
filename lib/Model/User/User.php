<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Model\User;

use OCA\Agora\Helper\Container;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\UserBase;
use OCP\IConfig;
use OCP\IUser;
use OCP\IUserManager;
use OCA\Agora\Model\Group\Group; 

class User extends UserBase
{
    /**
     * @var string 
     */
    public const TYPE = 'user';
    /**
     * @var string 
     */
    public const PRINCIPAL_PREFIX = 'principals/users/';
    public const GROUP_MODERATOR = 'agora_moderator';
    public const GROUP_OFFICIAL = 'agora_official';
    private IConfig $config;
    private IUser $user;

    public function __construct(
        string $id,
        string $type = self::TYPE,
    ) {
        parent::__construct($id, $type);
        $this->description = $this->l10n->t('User');

        $this->setUp();
    }

    /**
     * setUp
     */
    private function setUp(): void
    {
        $this->config = Container::queryClass(IConfig::class);
        $this->user = Container::queryClass(IUserManager::class)->get($this->id);
        // $this->appSettings = Container::queryClass(AppSettings::class);
        $this->displayName = $this->user->getDisplayName();
        $this->emailAddress = (string)$this->user->getEmailAddress();
        $this->languageCode = $this->config->getUserValue($this->id, 'core', 'lang');
        $this->localeCode = $this->config->getUserValue($this->id, 'core', 'locale');
        $this->timeZoneName = $this->config->getUserValue($this->id, 'core', 'timezone');
    }
    /**
     * Return the logical role of the user ('moderator', 'official'), or null
     */
    public function getRole(): ?string
    {
        if ($this->getIsInGroup(self::GROUP_MODERATOR)) {
            return 'moderator';
        }
        if ($this->getIsInGroup(self::GROUP_OFFICIAL)) {
            return 'official';
        }
        return null;
    }
    /**
     * Return list of all roles (logical) the user has
     */
    public function getRoles(): array
    {
        $roles = [];
        if ($this->getIsInGroup(self::GROUP_MODERATOR)) {
            $roles[] = 'moderator';
        }
        if ($this->getIsInGroup(self::GROUP_OFFICIAL)) {
            $roles[] = 'official';
        }
        return $roles;
    }
    
    /**
     * Check if user is a moderator
     */
    public function isModerator(): bool
    {
        return $this->getRole() === 'moderator';
    }

    /**
     * Check if user is an official
     */
    public function isOfficial(): bool
    {
        return $this->getRole() === 'official';
    }


    /**
     * Check if the user is a member of a specific Nextcloud group
     *
     * @param  string $groupName The exact name of the Nextcloud group
     * @return bool True if user is in the group, false otherwise
     */
    public function getIsInGroup(string $groupName): bool
    {
        $group = $this->groupManager->get($groupName);
        if ($group === null) {
            return false;
        }

        $user = \OC::$server->getUserManager()->get($this->id);
        if ($user === null) {
            return false;
        }

        return $group->inGroup($user);
    }

    /**
     * Check if the user is in any of the given groups
     *
     * @param  array $groupNames List of group names to check
     * @return bool True if user is in any of the groups
     */
    public function getIsInGroupArray(array $groupNames): bool
    {
        foreach ($groupNames as $groupName) {
            if ($this->getIsInGroup($groupName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if the user has a specific role (same as group name)
     *
     * @param  string $role One of the defined role constants
     * @return bool True if the user has that role
     */
    public function hasRole(string $role): bool
    {
        return $this->getIsInGroup($role);
    }
    public function getInternalUserId(): ?string
    {
        return $this->getId();
    }

    public function isEnabled(): bool
    {
        return $this->user->isEnabled();
    }

    public function getDescription(): string
    {
        if ($this->getEmailAddress()) {
            return $this->getEmailAddress();
        }
        return $this->description;
    }

    public function getPrincipalUri(): string
    {
        return self::PRINCIPAL_PREFIX . $this->getId();
    }

    public function getIsUnrestrictedInquiryOwner(): bool
    {
        // Unrestricted owner setting enabled globally?
        if ($this->appSettings->getBooleanSetting(AppSettings::SETTING_UNRESTRICTED_INQUIRY_OWNER)) {
            return true;
        }

        // Unrestricted owner setting enabled for groups this user is member of?
        $groups = $this->appSettings->getGroupSetting(AppSettings::SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS);
        if ($this->getIsInGroupArray($groups)) {
            return true;
        }
        return false;
    }

    /**
     * Return true if the user has the 'moderator' role
     */
    public function getIsModerator(): bool
    {
        return $this->groupManager->isInGroup($this->getId(), Group::GROUP_MODERATOR); 
    }

    /**
     * Return true if the user has the 'official' role
     */
    public function getIsOfficial(): bool
    {
        return $this->groupManager->isInGroup($this->getId(), Group::GROUP_OFFICIAL); 
    }

    public function getIsAdmin(): bool
    {
        return $this->groupManager->isAdmin($this->getId());
    }


    /**
     * @return User[]
     *
     * @psalm-return list<User>
     */
    public static function search(string $query = '', array $skip = []): array
    {
        $users = [];

        foreach (Container::queryClass(IUserManager::class)->search($query) as $user) {
            if (!in_array($user->getUID(), $skip)) {
                $users[] = new self($user->getUID());
            }
        }
        return $users;
    }
}
