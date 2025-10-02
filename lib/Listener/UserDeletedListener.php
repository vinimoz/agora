<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Listener;

use OCA\Agora\Cron\UserDeletedJob;
use OCA\Agora\Exceptions\InvalidClassException;
use OCA\Agora\Exceptions\OCPEventException;
use OCP\User\Events\UserDeletedEvent;

class UserDeletedListener extends BaseListener
{
    protected function checkClass() : void
    {
        if (!($this->event instanceof UserDeletedEvent)) {
            throw new InvalidClassException;
        }
        throw new OCPEventException;
    }

    protected function addCronJob() : void
    {
        if (!($this->event instanceof UserDeletedEvent)) {
            return;
        }
        $this->jobList->add(UserDeletedJob::class, ['userId' => $this->event->getUser()->getUID()]);
    }
}
