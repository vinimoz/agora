<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\Exceptions\InvalidShareTypeException;
use OCA\Agora\Exceptions\ShareNotFoundException;
use OCA\Agora\Exceptions\UserNotFoundException;
use OCA\Agora\Model\Group\Circle;
use OCA\Agora\Model\Group\ContactGroup;
use OCA\Agora\Model\Group\Group;
use OCA\Agora\Model\User\Admin;
use OCA\Agora\Model\User\Contact;
use OCA\Agora\Model\User\Email;
use OCA\Agora\Model\User\GenericUser;
use OCA\Agora\Model\User\Ghost;
use OCA\Agora\Model\User\User;
use OCA\Agora\Model\UserBase;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IGroupManager;

/**
 * @template-extends QBMapper<Share>
 *
 * This is a pseudo mapper for low level user operations to simplyfy unique handling of share users and nextcloud users
 */
class UserMapper extends QBMapper
{
    public const TABLE = Share::TABLE;
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        IDBConnection $db,
        protected IUserManager $userManager,
    ) {
        parent::__construct($db, Share::TABLE, Share::class);
    }


    /**
     * Get inquiry participant
     *
     * Returns a UserBase child from share determined by userId and inquiryId or from userbase by userId
     *
     * @param  string $userId
     * @param  int    $inquiryId Can only be used together with $userId and will return the internal user or the share user
     * @return UserBase
     **/
    public function getParticipant(string $userId, ?int $inquiryId): UserBase
    {
        if ($userId === '') {
            return new UserBase($userId, UserBase::TYPE_EMPTY);
        }

        try {
            return $this->getUserFromUserBase($userId, $inquiryId);
        } catch (UserNotFoundException $e) {
            // just catch and continue if not found and try to find user by share;
        }

        try {
            $share = $this->getShareByInquiryAndUser($userId, $inquiryId);
            return $this->getUserFromShare($share);
        } catch (ShareNotFoundException $e) {
            // User seems to be probaly deleted, use fake share
        }

        return new Ghost($userId);
    }

    /**
     * Get participans of a inquiry as array of user objects
     *
     * @return UserBase[]
     */
    public function getParticipants(?int $inquiryId): array
    {
        $users = [];
        // get the distict list of usernames from the supports
        $participants = $this->findParticipantsByInquiry($inquiryId);

        foreach ($participants as &$participant) {
            $users[] = $this->getParticipant($participant->getUserId(), $inquiryId);
        }
        return $users;
    }

    /**
     * Get a user from the userbase
     *
     * Returns a User child build from the userId and
     * if inquiryId is given, it will check if the user has admin rights for the inquiry
     *
     * @param  string   $userId
     * @param  int|null $inquiryId
     * @return User
     * @throws UserNotFoundException
     */
    public function getUserFromUserBase(string $userId, ?int $inquiryId = null): User
    {
        $user = $this->userManager->get($userId);

        if ($user instanceof IUser) {
            try {
                // check if we find a share, where the user got admin rights for the particular inquiry
                if ($inquiryId !== null && $this->getShareByInquiryAndUser($userId, $inquiryId)->getType() === Share::TYPE_ADMIN) {
                    return new Admin($userId);
                }
            } catch (ShareNotFoundException $e) {
                // No share found, user has no admin delegation granted by share
                // silent catch
            }
            return new User($userId);
        }
        throw new UserNotFoundException();
    }

    /**
     * Get participans of a inquiry as array of user objects
     *
     * Returns a UserBase child build from a share
     *
     * @return Circle|Contact|ContactGroup|Email|GenericUser|Ghost|Group|User
     */
    public function getUserFromShare(Share $share): GenericUser|Email|User|ContactGroup|Contact|Circle|Group|Ghost
    {
        return $this->getUserObject(
            $share->getType(),
            $share->getUserId(),
            $share->getDisplayName(),
            $share->getEmailAddress(),
            $share->getLanguage(),
            $share->getLocale(),
            $share->getTimeZoneName()
        );
    }

    public function getUserFromShareToken(string $token): UserBase
    {
        $share = $this->getShareByToken($token);

        return $this->getUserFromShare($share);
    }

    private function getShareByToken(string $token): Share
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('token', $qb->createNamedParameter($token, IQueryBuilder::PARAM_STR)));

        return $this->findEntity($qb);
    }

    /**
     * @param  string $userId
     * @param  int    $inquiryId
     * @return Share
     * @throws ShareNotFoundException
     */
    private function getShareByInquiryAndUser(string $userId, int $inquiryId): Share
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        try {
            return $this->findEntity($qb);
        } catch (DoesNotExistException $e) {
            throw new ShareNotFoundException('Share not found by userId and inquiryId');
        }
    }

    /**
     * @throws InvalidShareTypeException
     */
    public function getUserObject(string $type, string $id, string $displayName = '', string $emailAddress = '', string $language = '', string $locale = '', string $timeZoneName = ''): Ghost|Group|Circle|Contact|ContactGroup|User|Email|GenericUser
    {
        return match ($type) {
            Ghost::TYPE => new Ghost($id),
            Group::TYPE => new Group($id),
            Circle::TYPE => new Circle($id),
            Contact::TYPE => new Contact($id),
            ContactGroup::TYPE => new ContactGroup($id),
            User::TYPE => new User($id),
            Admin::TYPE => new Admin($id),
            Email::TYPE => new Email($id, $displayName, $emailAddress, $language),
            UserBase::TYPE_EXTERNAL => new GenericUser($id, UserBase::TYPE_EXTERNAL, $displayName, $emailAddress, $language, $locale, $timeZoneName),
            UserBase::TYPE_PUBLIC => new GenericUser($id, UserBase::TYPE_PUBLIC, $displayName),
            default => throw new InvalidShareTypeException('Invalid user type (' . $type . ')'),
        };
    }

    /**
     * Get distinct participans as of an inquiry
     *
     * @return Share[]
     *
     * @psalm-return array<Share>
     */
    private function findParticipantsByInquiry(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->selectDistinct(['user_id', 'inquiry_id'])
            ->from(Inquiry::TABLE)
            ->where(
                $qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT))
            );

        return $this->findEntities($qb);
    }
}
