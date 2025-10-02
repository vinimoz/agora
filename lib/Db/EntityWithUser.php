<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Exception;
use OCA\Agora\Helper\Container;
use OCA\Agora\Model\User\Anon;
use OCA\Agora\Model\UserBase;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\Entity;

/**
 * @psalm-suppress UnusedProperty
 * @method         string getUserId()
 * @method         ?int getInquiryId()
 *
 * Joined Attributes
 * @method         int getAnonymized()
 * @method         string getInquiryOwnerId()
 * @method         string getInquiryShowResults()
 * @method         int getInquiryExpire()
 * @method         string getShareType()
 */

abstract class EntityWithUser extends Entity
{
    protected int $anonymized = 0;
    protected string $inquiryOwnerId = '';
    protected string $inquiryShowResults = '';
    protected int $inquiryExpire = 0;
    protected ?string $shareType = '';

    public function __construct()
    {
        // joined Attributes
        $this->addType('anonymized', 'integer');
        $this->addType('inquiry_expire', 'integer');
    }

    /**
     * Is the current user the owner of the entity
     *
     * @return bool
     */
    public function getCurrentUserIsEntityUser(): bool
    {
        $userSession = Container::queryClass(UserSession::class);
        return $userSession->getCurrentUserId() === $this->getUserId();
    }

    private function getEntityAnonymization(): bool
    {
        if ($this->getCurrentUserIsEntityUser()) {
            // if the current user is the owner of the entity, don't anonymize the entity
            return false;
        }

        if ($this->getAnonymized() < 0) {
            // the inquiry is anonymized and locked, anonymize the entity
            return true;
        }

        $userSession = Container::queryClass(UserSession::class);
        if ($this->getInquiryOwnerId() === $userSession->getCurrentUserId()) {
            // if the current user is the inquiry owner, don't anonymize the entity
            return false;
        }

        if ($this->getShareType() === Share::TYPE_ADMIN) {
            // if the current user is a delegated admin, don't anonymize the entity
            return false;
        }

        if ($this->getAnonymized() > 0) {
            // if the current user is not the inquiry owner, anonymize the entity
            return true;
        }

        // the inquiry is not anonymized
        if ($this->getInquiryShowResults() === Inquiry::SHOW_RESULTS_NEVER
            || ($this->getInquiryShowResults() === Inquiry::SHOW_RESULTS_CLOSED
            && !$this->getInquiryExpire() > time())
        ) {

            // Do not anonymize the inquiry owner
            return !($this instanceof Inquiry);
        }

        // in all other cases, don't anonymize the entity
        return false;
    }


    /**
     * @return UserBase Gets owner of the entity
     */
    public function getUser(): UserBase
    {
        if ($this->getEntityAnonymization()) {
            $user = new Anon($this->getUserId());
            return $user;
        }

        $userMapper = (Container::queryClass(UserMapper::class));

        try {
            $inquiryId = $this->getInquiryId();
            if ($inquiryId === null) {
                return $userMapper->getUserFromUserBase($this->getUserId());
            }
            $user = $userMapper->getParticipant($this->getUserId(), $inquiryId);
            // Get user from userbase
        } catch (Exception $e) {
            // If inquiryId is not set, we assume that the user is not a participant of a inquiry
            $user = $userMapper->getUserFromUserBase($this->getUserId());
        }
        return $user;
    }
}
