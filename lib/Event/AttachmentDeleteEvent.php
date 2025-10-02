<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Attachment;

class AttachmentDeleteEvent extends AttachmentEvent
{
    public function __construct(
        protected Attachment $attachment,
    ) {
        parent::__construct($attachment);
        $this->log = false;
        $this->eventId = $attachment->getDeleted() ? self::DELETE : self::RESTORE;
    }
}
