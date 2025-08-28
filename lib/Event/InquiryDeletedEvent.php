<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Inquiry;

use OCA\Agora\Notification\Notifier;

class InquiryDeletedEvent extends InquiryEvent
{
    public function __construct(
        protected Inquiry $inquiry,
    ) {
        parent::__construct($inquiry);
        $this->eventId = self::DELETE;
    }


    public function getNotification(): array
    {
        if ($this->getActor() === $this->getInquiryOwner()) {
            return [];
        }

        return [
        'msgId' => Notifier::NOTIFY_INQUIRY_DELETED_BY_OTHER,
        'objectType' => 'inquiry',
        'objectValue' => $this->getInquiryId(),
        'recipient' => $this->getInquiryOwner(),
        'actor' => $this->getActor(),
        'inquiryTitle' => $this->getInquiryTitle(),
        ];
    }
}
