<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Notification\Notifier;

class InquiryOwnerChangeEvent extends InquiryEvent
{
    public function __construct(
        protected Inquiry $inquiry,
        protected string $oldOwner,
        protected string $newOwner,
    ) {
        parent::__construct($inquiry);
        $this->eventId = self::OWNER_CHANGE;
    }
    public function getNotification(): array
    {
        return [
        'msgId' => Notifier::NOTIFY_INQUIRY_CHANGED_OWNER,
        'objectType' => 'inquiry',
        'objectValue' => $this->getInquiryId(),
        'recipient' => $this->oldOwner,
        'newOwner' => $this->newOwner,
        'actor' => $this->getActor(),
        'inquiryTitle' => $this->getInquiryTitle(),
        ];
    }
}
