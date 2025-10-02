<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use DateTime;
use OCA\Agora\AppConstants;
use OCA\Agora\Notification\Notifier;
use OCA\Agora\UserSession;
use OCP\Notification\IManager;
use OCP\Notification\INotification;

class NotificationService
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        protected IManager $notificationManager,
        protected UserSession $userSession,
    ) {
    }

    public function removeNotification(INotification $notification): void
    {
        $this->notificationManager->markProcessed($notification);
    }


    /**
     * Remove all notifications for a specific inquiry and the current user.
     *
     * @param int $inquiryId The ID of the inquiry for which notifications should be removed.
     */
    public function removeNotificationsForInquiry(int $inquiryId): void
    {
        $notification = $this->notificationManager->createNotification();

        $notification->setApp(AppConstants::APP_ID)
            ->setObject('inquiry', strval($inquiryId));

        if (!$this->userSession->getIsLoggedIn()) {
            return;
        }

        $notification->setUser($this->userSession->getCurrentUserId());

        $this->notificationManager->markProcessed($notification);
    }

    public function sendInvitation(int $inquiryId, string $recipient): void
    {
        $notification = $this->notificationManager->createNotification();
        $notification->setApp(AppConstants::APP_ID)
            ->setUser($recipient)
            ->setDateTime(new DateTime())
            ->setObject('inquiry', strval($inquiryId))
            ->setSubject(Notifier::NOTIFY_INVITATION, ['inquiryId' => $inquiryId, 'recipient' => $recipient]);
        $this->notificationManager->notify($notification);
    }

    public function createNotification(array $params = []): void
    {
        $notification = $this->notificationManager->createNotification();
        $notification->setApp(AppConstants::APP_ID)
            ->setUser($params['recipient'])
            ->setDateTime(new DateTime())
            ->setObject($params['objectType'], strval($params['objectValue']))
            ->setSubject($params['msgId'], $params);
        $this->notificationManager->notify($notification);
    }
}
