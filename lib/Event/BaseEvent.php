<?php

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Event;

use OCA\Agora\Db\Comment;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Db\Support;
use OCA\Agora\Helper\Container;
use OCA\Agora\UserSession;
use OCP\EventDispatcher\Event;

abstract class BaseEvent extends Event
{
    protected ?string $activityObjectType = 'inquiry';
    protected ?string $eventId = null;
    protected array $activitySubjectParams = [];
    protected bool $log = true;
    protected Inquiry $inquiry;
    protected UserMapper $userMapper;
    protected UserSession $userSession;


    public function __construct(
        protected Inquiry|Comment|Share|Option|Support $eventObject,
        protected bool $loadInquiry = false
    ) {
	    parent::__construct();
	      try {
     		   $this->inquiry = Container::getInquiry($this->getInquiryId(), true); 
    		} catch (DoesNotExistException $e) {
        		throw new \Exception("Inquiry not found: " . $this->getInquiryId());
		}

        $this->userMapper = Container::queryClass(UserMapper::class);
        $this->userSession = Container::queryClass(UserSession::class);

        // Default
        $this->activitySubjectParams['inquiry'] = [
        'type' => 'highlight',
        'id' => (string)$this->eventObject->getInquiryId(),
        'name' => $this->inquiry->getTitle(),
        'link' => $this->inquiry->getSupportUrl(),
        ];
    }

    public function getInquiryId(): int
    {
        return $this->eventObject->getInquiryId() ?? 0;
    }

    public function getInquiryTitle(): string
    {
        return $this->inquiry->getTitle();
    }

    public function getInquiryOwner(): string
    {
        return $this->inquiry->getOwner();
    }

    public function getActor(): string
    {
        if ($this->userSession->getCurrentUserId() !== '') {
            return $this->userSession->getCurrentUserId();
        }
        return $this->eventObject->getUserId();
    }

    public function getLogId(): string
    {
        if ($this->log && boolval($this->eventId)) {
            return (string)$this->eventId;
        }
        return '';
    }

    public function getNotification(): array
    {
        return [];
    }

    public function getActivityObjectType(): ?string
    {
        return $this->activityObjectType;
    }

    public function getActivityObjectId(): int
    {
        if ($this->activityObjectType === 'inquiry') {
            return $this->eventObject->getInquiryId() ?? 0;
        }
        return $this->eventObject->getId();
    }

    public function getActivityType(): ?string
    {
        return $this->eventId;
    }

    public function getActivitySubjectParams(): array
    {
        return $this->activitySubjectParams;
    }
}
