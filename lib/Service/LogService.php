<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Log;
use OCA\Agora\Db\LogMapper;
use OCA\Agora\UserSession;

class LogService
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private LogMapper $logMapper,
        private Log $log,
        private UserSession $userSession,
    ) {
    }

    /**
     * Log inquiry activity
     */
    public function setLog(int $inquiryId, string $messageId, ?string $userId = null): void
    {
        $this->log = new Log();
        $this->log->setInquiryId($inquiryId);
        $this->log->setCreated(time());
        $this->log->setMessageId($messageId);
        $this->log->setUserId($userId ?? $this->userSession->getCurrentUserId());

        $this->logMapper->insert($this->log);
    }
}
