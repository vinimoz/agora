<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Inquiry;

class InquiryExpiredEvent extends InquiryEvent
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        protected Inquiry $inquiry,
    ) {
        parent::__construct($inquiry);
        $this->eventId = self::EXPIRE;
    }
}
