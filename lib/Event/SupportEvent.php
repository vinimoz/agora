<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Support;

/**
 * @psalm-suppress UnusedProperty
 */
abstract class SupportEvent extends BaseEvent
{
    public const ADD = 'support_add';
    public const DELETE = 'support_delete';
    public const RESTORE = 'support_restore';

    public function __construct(
        protected Support $support,
    ) {
        parent::__construct($support);
        $this->activityObjectType = 'inquiry';
        $this->activitySubjectParams['support'] = [
        'type' => 'highlight',
        'id' => (string)$support->getId(),
        'name' => $support->getSupport(),
        ];
    }
}
