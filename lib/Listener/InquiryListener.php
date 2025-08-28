<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Listener;

use OCA\Agora\Db\Watch;
use OCA\Agora\Event\InquiryEvent;
use OCA\Agora\Exceptions\InvalidClassException;

class InquiryListener extends BaseListener
{
    // Simulate support and option change due to possible configuration changes
    protected const WATCH_TABLES = [
    Watch::OBJECT_INQUIRIES,
    Watch::OBJECT_SUPPORTS,
    Watch::OBJECT_OPTIONS,
    ];

    protected function checkClass() : void
    {
        if (!($this->event instanceof InquiryEvent)) {
            throw new InvalidClassException;
        }
    }

    protected function createNotification() : void
    {
        if (!($this->event instanceof InquiryEvent)) {
            return;
        }
        if (!empty($this->event->getNotification())) {
            $this->notificationService->createNotification($this->event->getNotification());
        }
    }
}
