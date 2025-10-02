<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Share;

class ShareDeletedEvent extends ShareEvent
{
    public function __construct(
        protected Share $share,
    ) {
        parent::__construct($share);
        $this->eventId = $share->getDeleted() ? self::DELETE : self::RESTORE;
    }
}
