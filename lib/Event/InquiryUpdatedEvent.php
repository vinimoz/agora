<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Inquiry;
use OCP\EventDispatcher\Event;

class InquiryUpdatedEvent extends InquiryEvent
{
    public const CREATE = 'create';
    public const UPDATE = 'update';
    public const DELETE = 'delete';
    
    protected ?Inquiry $inquiry;
    protected ?string $eventId = '';
    
    public function __construct(
        Inquiry $inquiry,
    ) {
        parent::__construct($inquiry);
        $this->eventId = self::UPDATE;
    }

    public function getInquiry(): Inquiry
    {
        return $this->inquiry;
    }
}
