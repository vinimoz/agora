<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Option;
use OCA\Agora\Notification\Notifier;

class OptionArchivedEvent extends OptionEvent
{
    public function __construct(
        Option $option,
    ) {
        parent::__construct($option);
        $this->eventId = self::DELETE;
    }

    public function getNotification(): array
    {
        if ($this->getActor() === $this->getOptionyOwner()) {
            return [];
        }

        return [
        'msgId' => Notifier::NOTIFY_OPTION_ARCHIVED_BY_OTHER,
        'objectType' => 'option',
        'objectValue' => $this->getOptionId(),
        'recipient' => $this->getOptionOwner(),
        'actor' => $this->getActor(),
        'optionTitle' => $this->getOptionTitle(),
        ];
    }
}
