<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use Exception;
use OCA\Agora\Db\Preferences;
use OCA\Agora\Db\PreferencesMapper;
use OCA\Agora\Exceptions\NotAuthorizedException;
use OCA\Agora\Exceptions\NotFoundException;
use OCA\Agora\UserSession;

class PreferencesService
{

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private PreferencesMapper $preferencesMapper,
        private Preferences $preferences,
        private UserSession $userSession,
    ) {
        $this->load();
    }

    public function load(): void
    {
        try {
            $this->preferences = $this->preferencesMapper->find($this->userSession->getCurrentUserId());
            if (!$this->preferences->getPreferences()) {
                throw new NotFoundException('No preferences found');
            }
        } catch (Exception $e) {
            $this->preferences = new Preferences;
        }
    }

    public function get(): Preferences
    {
        return $this->preferences;
    }

    /**
     * Write references
     */
    public function write(array $preferences): Preferences
    {
        if (!$this->userSession->getCurrentUserId()) {
            throw new NotAuthorizedException();
        }

        $preferences = $this->tidyPreferences($preferences);
        $this->preferences->setPreferences(json_encode($preferences));
        $this->preferences->setTimestamp(time());
        $this->preferences->setUserId($this->userSession->getCurrentUserId());

        if ($this->preferences->getId() > 0) {
            return $this->preferencesMapper->update($this->preferences);
        } else {
            return $this->preferencesMapper->insert($this->preferences);

        }
    }

    /**
     * Tidy preferences
     *
     * @param array $preferences
     */
    private function tidyPreferences(array $preferences): array
    {
        // Migrate legacy checkCalendarsBefore to checkCalendarsHoursBefore
        if (isset($preferences['checkCalendarsBefore'])) {
            // Only set if new key doesn't already exist (migration safety)
            if (!isset($preferences['checkCalendarsHoursBefore'])) {
                $preferences['checkCalendarsHoursBefore'] = $preferences['checkCalendarsBefore'];
            }
            unset($preferences['checkCalendarsBefore']);
        }

        // Migrate legacy checkCalendarsAfter to checkCalendarsHoursAfter
        if (isset($preferences['checkCalendarsAfter'])) {
            // Only set if new key doesn't already exist (migration safety)
            if (!isset($preferences['checkCalendarsHoursAfter'])) {
                $preferences['checkCalendarsHoursAfter'] = $preferences['checkCalendarsAfter'];
            }
            unset($preferences['checkCalendarsAfter']);
        }

        return $preferences;
    }

}
