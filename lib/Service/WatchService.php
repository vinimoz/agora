<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Watch;
use OCA\Agora\Db\WatchMapper;
use OCA\Agora\Exceptions\NoUpdatesException;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\Exception;

class WatchService
{

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private AppSettings $appSettings,
        private InquiryMapper $inquiryMapper,
        private UserSession $userSession,
        private Watch $watch,
        private WatchMapper $watchMapper,
    ) {
    }

    /**
     * Watch inquiry for updates
     */
    public function watchUpdates(int $inquiryId, ?int $offset = null): array
    {
        if ($inquiryId) {
            $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_VIEW);
        }

        $start = time();
        $timeout = 30;
        $offset = $offset ?? $start;

        if ($this->appSettings->getUpdateType() === AppSettings::SETTING_UPDATE_TYPE_LONG_INQUIRYING) {
            while (empty($updates) && time() <= $start + $timeout) {
                sleep(1);
                $updates = $this->getUpdates($inquiryId, $offset);
            }
        } else {
            $updates = $this->getUpdates($inquiryId, $offset);
        }

        if (empty($updates)) {
            throw new NoUpdatesException;
        }

        return $updates;
    }

    /**
     * @return Watch[]
     */
    private function getUpdates(int $inquiryId, int $offset): array
    {
        try {
            return $this->watchMapper->findUpdatesForInquiryId($inquiryId, $offset);
        } catch (DoesNotExistException $e) {
            return [];
        }
    }

    public function writeUpdate(int $inquiryId, string $table): void
    {
        $this->watch = new Watch();
        $this->watch->setInquiryId($inquiryId);
        $this->watch->setTable($table);
        $this->watch->setSessionId($this->userSession->getClientIdHashed());

        try {
            $this->watch = $this->watchMapper->insert($this->watch);
        } catch (Exception $e) {
            if ($e->getReason() !== Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
                throw $e;
            }
            $this->watch = $this->watchMapper->findForInquiryIdAndTable($inquiryId, $table);
        }

        $this->watch->setUpdated(time());
        $this->watchMapper->update($this->watch);
    }
}
