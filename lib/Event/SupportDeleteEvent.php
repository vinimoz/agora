<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Support;

class SupportDeleteEvent extends SupportEvent
{
    public function __construct(
        protected Support $support,
    ) {
        parent::__construct($support);
        $this->log = false;
        $this->eventId = $support->getDeleted() ? self::DELETE : self::RESTORE;
    }
}
