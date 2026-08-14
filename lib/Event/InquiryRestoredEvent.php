<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Inquiry;

class InquiryRestoredEvent extends InquiryEvent
{
    public function __construct(
        Inquiry $inquiry,
    ) {
        parent::__construct($inquiry);
        $this->eventId = self::RESTORE;
    }
}
