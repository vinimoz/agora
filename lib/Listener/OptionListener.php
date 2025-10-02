<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Listener;

use OCA\Agora\Db\Watch;
use OCA\Agora\Event\OptionEvent;
use OCA\Agora\Exceptions\InvalidClassException;

class OptionListener extends BaseListener
{
    // simulate support change to force recalculating of supports
    protected const WATCH_TABLES = [
    Watch::OBJECT_OPTIONS,
    Watch::OBJECT_SUPPORTS,
    ];

    protected function checkClass() : void
    {
        if (!($this->event instanceof OptionEvent)) {
            throw new InvalidClassException;
        }
    }
}
