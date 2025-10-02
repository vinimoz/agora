<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Inquiry;

abstract class InquiryEvent extends BaseEvent
{
    public const ADD = 'inquiry_add';
    public const UPDATE = 'inquiry_update';
    public const DELETE = 'inquiry_delete';
    public const RESTORE = 'inquiry_restore';
    public const EXPIRE = 'inquiry_expire';
    public const CLOSE = 'inquiry_closed';
    public const REOPEN = 'inquiry_reopened';
    public const OWNER_CHANGE = 'inquiry_change_owner';
    public const OPTION_REORDER = 'inquiry_option_reorder';

    public function __construct(
        protected Inquiry $inquiry,
    ) {
        parent::__construct($inquiry);
        $this->activityObjectType = 'inquiry';
    }
}
