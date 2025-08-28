<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Listener;

use OCA\Agora\Db\Watch;
use OCA\Agora\Event\SupportEvent;
use OCA\Agora\Exceptions\InvalidClassException;

class SupportListener extends BaseListener
{
    protected const WATCH_TABLES = [Watch::OBJECT_SUPPORTS];

    protected function checkClass() : void
    {
        if (!($this->event instanceof SupportEvent)) {
            throw new InvalidClassException;
        }
    }
}
