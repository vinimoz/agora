<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Attachment;

/**
 * @psalm-suppress UnusedProperty
 */
abstract class AttachmentEvent extends BaseEvent
{
    public const ADD = 'attachment_add';
    public const DELETE = 'attachment_delete';
    public const RESTORE = 'attachment_restore';

    public function __construct(
        protected Attachment $attachment,
    ) {
        parent::__construct($attachment);
        $this->activityObjectType = 'inquiry';
        $this->activitySubjectParams['attachment'] = [
        'type' => 'highlight',
        'id' => (string)$attachment->getId(),
        'name' => $attachment->getAttachment(),
        ];
    }
}
