<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora;

use Exception;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Db\LocationMapper;
use OCA\Agora\Db\CategoryMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Db\ModerationStatusMapper;
use OCA\Agora\Model\User\Cron;
use OCA\Agora\Model\User\Ghost;
use OCA\Agora\Model\UserBase;
use OCP\ISession;
use OCP\IUserSession;

class UserSession
{
    /**
     * @var string 
     */
    public const SESSION_KEY_CRON_JOB = AppConstants::SESSION_KEY_CRON_JOB;
    /**
     * @var string 
     */
    public const SESSION_KEY_USER_ID = 'ncAgoraUserId';
    /**
     * @var string 
     */
    public const SESSION_KEY_SHARE_TOKEN = 'ncAgoraPublicToken';
    /**
     * @var string 
     */
    public const SESSION_KEY_SHARE_TYPE = 'ncAgoraShareType';
    /**
     * @var string 
     */
    public const CLIENT_ID = 'ncAgoraClientId';
    /**
     * @var string 
     */
    public const CLIENT_TZ = 'ncAgoraClientTimeZone';
    /**
     * @var string 
     */
    public const TABLE = Share::TABLE;

    protected ?UserBase $currentUser = null;
    // protected Share|null $share = null;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        protected ISession $session,
        protected IUserSession $userSession,
        protected UserMapper $userMapper,
        protected ShareMapper $shareMapper,
        protected Share $share,
        protected LocationMapper $locationMapper,
        protected CategoryMapper $categoryMapper,
        protected ModerationStatusMapper $moderationStatusMapper,
    ) {
    }

    /**
     * Get current user
     *
     * Returns a UserBase child for the current (share|nextcloud) user based on
     * - the logged in user or
     * - the stored session share token
     */
    public function getCurrentUser(): UserBase
    {
        if (!$this->currentUser) {

            try {
                if ($this->getIsLoggedIn()) {
                    $this->currentUser = $this->userMapper->getUserFromUserBase((string)$this->userSession->getUser()?->getUID());
                } elseif ($this->session->get(self::SESSION_KEY_CRON_JOB)) {
                    $this->currentUser = new Cron();
                } else {
                    $this->currentUser = $this->userMapper->getUserFromShareToken($this->getShareToken());
                }
            } catch (Exception $e) {
                // In case of system jobs, we do not get a valid user, so we return a Ghost user
                // can happen while running cron jobs or during app updates
                $this->currentUser = new Ghost();
            }
        }

        return $this->currentUser;
    }

    public function getCurrentUserId(): string
    {
        if (defined('OC_CONSOLE')) {
            return 'CONSOLE';
        }

        if (!$this->session->get(self::SESSION_KEY_USER_ID)) {
            $this->session->set(self::SESSION_KEY_USER_ID, $this->getCurrentUser()->getId());
        }

        return (string)$this->session->get(self::SESSION_KEY_USER_ID);
    }

    public function getIsLoggedIn(): bool
    {
        return $this->userSession->isLoggedIn();
    }

    public function cleanSession(): void
    {
        $this->session->remove(self::SESSION_KEY_SHARE_TOKEN);
        $this->session->remove(self::SESSION_KEY_SHARE_TYPE);
        $this->session->remove(self::SESSION_KEY_USER_ID);
        $this->share = new Share();
        $this->currentUser = null;
    }

    /**
     * Set share token in case user accesses via a share token
     *
     * @param string $token
     */
    public function setShareToken(string $token): void
    {
        if ($this->getShareToken() !== $token) {
            // invalidate session if token changes
            // $this->cleanSession();
        }
        $this->session->set(self::SESSION_KEY_SHARE_TOKEN, $token);
    }

    /**
     * Get share token
     *
     * Returns the stored session share token
     *
     * @return string
     */
    public function getShareToken(): string
    {
        return (string)$this->session->get(self::SESSION_KEY_SHARE_TOKEN);
    }

    /**
     * Has share
     *
     * Returns true if a share token is stored in the session
     *
     * @return bool
     */
    public function hasShare(): bool
    {
        return (bool)$this->getShareToken();
    }

    /**
     * Get share
     *
     * Returns a Share object based on the stored session share token
     *
     * @return Share
     */
    public function getShare(): Share
    {
        if ($this->hasShare() && !$this->share->getId()) {
            $this->share = $this->shareMapper->findByToken($this->getShareToken());
        }
        return $this->share;
    }

    /**
     * Get share type
     *
     * Returns the stored session share type
     *
     * @return string
     */
    public function getShareType(): string
    {
        if (!$this->hasShare()) {
            return '';
        }

        if (!$this->session->get(self::SESSION_KEY_SHARE_TYPE)) {
            $this->session->set(self::SESSION_KEY_SHARE_TYPE, $this->getShare()->getType());
        }

        return (string)$this->session->get(self::SESSION_KEY_SHARE_TYPE);
    }

    public function getClientId(): string
    {
        return (string)$this->session->get(self::CLIENT_ID);
    }
    public function getCategory(): array
    {
        return (array)$this->categoryMapper->findall();
    }

    public function getLocation(): array
    {
        return (array)$this->locationMapper->findall();
    }

    public function getModerationStatus(): array
    {
        return (array)$this->moderationStatusMapper->findall();
        return [];
    }

    /**
     *
     * @return non-empty-string
     */

    public function getClientIdHashed(): string
    {
        return hash('md5', $this->getClientId());
    }

    public function setClientId(string $clientId): void
    {
        $this->session->set(self::CLIENT_ID, $clientId);
    }

    /**
     *
     * @return non-empty-string
     */
    public function getClientTimeZone(): string
    {
        return $this->session->get(self::CLIENT_TZ) ?? date_default_timezone_get();
    }

    public function setClientTimeZone(string $clientTimeZone): void
    {
        $this->session->set(self::CLIENT_TZ, $clientTimeZone);
    }
}
