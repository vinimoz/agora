<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use Exception;
use OCA\Agora\AppConstants;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Exceptions\InvalidUsernameException;
use OCA\Agora\Exceptions\TooShortException;
use OCA\Agora\Model\Group\Circle;
use OCA\Agora\Model\Group\ContactGroup;
use OCA\Agora\Model\Group\Group;
use OCA\Agora\Model\Settings\SystemSettings;
use OCA\Agora\Model\User\Contact;
use OCA\Agora\Model\User\Email;
use OCA\Agora\Model\User\User;
use OCP\Collaboration\Collaborators\ISearch;
use OCP\L10N\IFactory;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

class SystemService
{
    public const TYPE_CONTACT = 51;
    public const TYPE_ALL = 99;
    public const VALID_SEARCH_TYPES = [
    IShare::TYPE_USER,
    IShare::TYPE_GROUP,
    IShare::TYPE_USERGROUP,
    IShare::TYPE_CIRCLE,
    IShare::TYPE_EMAIL,
    SystemService::TYPE_CONTACT,
    SystemService::TYPE_ALL,
    ];

    private const REGEX_INVALID_USERNAME_CHARACTERS = '/[\x{2000}-\x{206F}]/u';
    private const MAX_SEARCH_RESULTS = 200;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private IFactory $transFactory,
        private ISearch $userSearch,
        private LoggerInterface $logger,
        private ShareMapper $shareMapper,
        private SupportMapper $supportMapper,
        private UserMapper $userMapper,
        private SystemSettings $systemSettings,
    ) {
    }

    /**
     * Get a list of groups
     *
     * @return Group[]
     */
    public function getGroups(string $query = ''): array
    {
        $groups = Group::search($query);
        return $groups;
    }

    /**
     * Get a combined list of users, groups, circles, contact groups and contacts
     *
     * @param  list<int> $types list of types to search for
     * @return (Circle|Email|Group|User|Contact|ContactGroup|mixed)[]
     *
     * @psalm-return array<array-key, Circle|Email|Group|User|Contact|ContactGroup|mixed>
     */
    public function getSiteUsersAndGroups(string $query, array $types): array
    {
        $list = [];

        try {
            if (!$this->systemSettings->getExternalShareCreationAllowed()) {
                throw new ForbiddenException();
            }
            // try to identify an email address
            $result = MailService::extractEmailAddressAndName($query);
            $list[] = new Email($result['emailAddress'], $result['displayName'], $result['emailAddress']);
        } catch (Exception $e) {
            // catch silent
        }
        // search more matches in circles, users, groups and contacts
        $list = array_merge($list, $this->search($query, $types));

        return $list;
    }

    /**
     * get a list of user objects from the backend matching the query string
     *
     * @param       string $query search string
     * @param       array  $types list of types to search for
     * @psalm-param list<integer> $types
     */
    private function search(string $query, array $types): array
    {
        // if no query or no types are given, return empty array
        // if sharing is not allowed, return empty array
        if (!$query
            || !$types
            || !$this->systemSettings->getShareCreateAllowed()
        ) {
            return [];
        }

        $IShareTypes = [];
        $searchContacts = false;
        $searchAll = false;

        foreach ($types as $type) {
            if (!in_array($type, self::VALID_SEARCH_TYPES)) {
                $this->logger->error('Invalid search type {type}', ['type' => $type]);
                continue;
            }
            switch (intval($type)) {
            case IShare::TYPE_USER:
                $IShareTypes[] = IShare::TYPE_USER;
                break;
            case IShare::TYPE_GROUP:
                $IShareTypes[] = IShare::TYPE_GROUP;
                break;
            case IShare::TYPE_EMAIL:
                $IShareTypes[] = IShare::TYPE_EMAIL;
                break;
            case IShare::TYPE_CIRCLE:
                $this->logger->error('Search for circles found');
                $IShareTypes[] = IShare::TYPE_CIRCLE;
                break;
            case self::TYPE_CONTACT:
                $searchContacts = true;
                break;
            case self::TYPE_ALL:
                $searchAll = true;
                break;
            }
        }

        if ($searchAll) {
            $IShareTypes = [
            IShare::TYPE_USER,
            IShare::TYPE_GROUP,
            IShare::TYPE_EMAIL,
            IShare::TYPE_CIRCLE,
            ];
            $searchContacts = true;
        }

        // test again, if no valid search types are found
        if (count($IShareTypes) < 1 && !$searchContacts) {
            return [];
        }

        $startSearchTimer = microtime(true);

        $items = [];

        if (count($IShareTypes) > 0) {

            $startCollaborationSearchTimer = microtime(true);
            [$result, $more] = $this->userSearch->search($query, $IShareTypes, false, self::MAX_SEARCH_RESULTS, 0);

            $this->logger->debug('Search took {time}s', ['time' => microtime(true) - $startCollaborationSearchTimer]);

            if ($more) {
                $this->logger->info('Only first {maxResults} matches will be returned.', ['maxResults' => self::MAX_SEARCH_RESULTS]);
            }

            foreach (($result['users'] ?? []) as $item) {
                if (isset($item['value']['shareWith'])) {
                    $items[] = $this->userMapper->getUserFromUserBase($item['value']['shareWith'])->getRichUserArray();
                } else {
                    $this->handleFailedSearchResult($query, $item, 'users');
                }
            }

            foreach (($result['exact']['users'] ?? []) as $item) {
                if (isset($item['value']['shareWith'])) {
                    $items[] = $this->userMapper->getUserFromUserBase($item['value']['shareWith'])->getRichUserArray();
                } else {
                    $this->handleFailedSearchResult($query, $item, 'exact users');
                }
            }

            foreach (($result['groups'] ?? []) as $item) {
                if (isset($item['value']['shareWith'])) {
                    $items[] = (new Group($item['value']['shareWith']))->getRichUserArray();
                } else {
                    $this->handleFailedSearchResult($query, $item, 'groups');
                }
            }

            foreach (($result['exact']['groups'] ?? []) as $item) {
                if (isset($item['value']['shareWith'])) {
                    $items[] = (new Group($item['value']['shareWith']))->getRichUserArray();
                } else {
                    $this->handleFailedSearchResult($query, $item, 'exact groups');
                }
            }

            foreach (($result['circles'] ?? []) as $item) {
                $items[] = $this->userMapper->getUserObject(Circle::TYPE, $item['value']['shareWith'])->getRichUserArray();
            }

            foreach (($result['exact']['circles'] ?? []) as $item) {
                $items[] = $this->userMapper->getUserObject(Circle::TYPE, $item['value']['shareWith'])->getRichUserArray();
            }
        }

        if (Contact::isEnabled()
            && $searchContacts
            && $this->systemSettings->getExternalShareCreationAllowed()
        ) {

            foreach (Contact::search($query) as $contact) {
                $items[] = $contact->getRichUserArray();
            }
            foreach (ContactGroup::search($query) as $contact) {
                $items[] = $contact->getRichUserArray();
            }
            // $items = array_merge($items, Contact::search($query));
            // $items = array_merge($items, ContactGroup::search($query));
        }

        $this->logger->debug('Search took {time}s overall', ['time' => microtime(true) - $startSearchTimer]);

        return $items;
    }

    private function handleFailedSearchResult(string $query, mixed $item, string $type = 'unspecified'): void
    {
        $this->logger->debug(
            'Unrecognized search result', [
            'query' => $query,
            'result' => json_encode($item),
            'type' => $type,
            ]
        );
    }

    /**
     * find appropriate language
     */
    public function getGenericLanguage(): string
    {
        return $this->transFactory->findGenericLanguage(AppConstants::APP_ID);
    }

    /**
     * Validate if the user name is reserved
     * return false, if the requested userId or displayName exists as a user or as
     * a participant of refenced inquiry
     * The check spans over userId and displayName
     *
     * @param  string $userName displayName or userId to check for existance
     * @param  string $token    the share referencing the inquiry
     * @return string returns the allowed username
     */
    public function validatePublicUsernameByToken(string $userName, string $token): string
    {
        $share = $this->shareMapper->findByToken($token);
        return $this->validatePublicUsername($userName, $share);
    }

    /**
     * Validate if the user name is reserved
     * return false, if the requested userId or displayName exists as a user or as
     * a participant of refenced inquiry
     * The check spans over userId and displayName
     *
     * @param  string $userName displayName or userId to check for existance
     * @param  Share  $share    the share referencing the inquiry
     * @return string returns the allowed username
     */
    public function validatePublicUsername(string $userName, Share $share): string
    {
        $userName = trim(preg_replace(self::REGEX_INVALID_USERNAME_CHARACTERS, '', $userName));

        if (!$userName) {
            throw new TooShortException('Username must not be empty');
        }

        if ($share->getDisplayName() === $userName) {
            return $userName;
        }

        $compareUserName = strtolower($userName);

        // reserved usernames
        if (str_contains($compareUserName, 'deleted user') || str_contains($compareUserName, 'anonymous')) {
            throw new InvalidUsernameException;
        }

        // get all groups, that include the requested username in their gid
        // or displayname and check if any match completely
        foreach (Group::search($compareUserName) as $group) {
            if ($group->hasName($compareUserName)) {
                throw new InvalidUsernameException;
            }
        }

        // get all users
        foreach (User::search($compareUserName) as $user) {
            if ($user->hasName($compareUserName)) {
                throw new InvalidUsernameException;
            }
        }
        // get all participants
        foreach ($this->supportMapper->findParticipantsByInquiry($share->getInquiryId()) as $support) {
            if ($support->getUser()->hasName($compareUserName)) {
                throw new InvalidUsernameException;
            }
        }

        // get all shares for this inquiry
        foreach ($this->shareMapper->findByInquiry($share->getInquiryId()) as $share) {
            if ($share->getType() !== Circle::TYPE && $share->getUser()->hasName($compareUserName)) {
                throw new InvalidUsernameException;
            }
        }
        // return $userName, if username is allowed
        return $userName;
    }
}
