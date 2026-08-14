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
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\EventDispatcher\Event;

abstract class BaseEvent extends Event
{
    protected ?string $activityObjectType = 'inquiry';
    protected ?string $eventId = null;
    protected array $activitySubjectParams = [];
    protected bool $log = true;
    protected ?Inquiry $inquiry = null;  // Nullable to support Option events without inquiry
    protected UserMapper $userMapper;
    protected UserSession $userSession;

    public function __construct(
        protected Inquiry|Comment|Share|Option|Support $eventObject,
        protected bool $loadInquiry = false
    ) {
        parent::__construct();
        
        $this->userMapper = Container::queryClass(UserMapper::class);
        $this->userSession = Container::queryClass(UserSession::class);

        $inquiryId = $this->getInquiryId();
        
        if ($inquiryId > 0) {
            try {
                $this->inquiry = Container::getInquiry($inquiryId, true);
            } catch (DoesNotExistException $e) {
                $this->inquiry = null;
            }
        }

        // Set default inquiry params if inquiry exists
        if ($this->inquiry !== null) {
            $this->activitySubjectParams['inquiry'] = [
                'type' => 'highlight',
                'id' => (string)$inquiryId,
                'name' => $this->inquiry->getTitle(),
                'link' => $this->inquiry->getInquiryUrl(),
            ];
        }
    }

    public function getInquiryId(): int
    {
        if ($this->eventObject instanceof Option) {
            return $this->eventObject->getTargetId() ?? 0;
        }
        if (method_exists($this->eventObject, 'getInquiryId')) {
            return $this->eventObject->getInquiryId() ?? 0;
        }
        return 0;
    }

    public function getInquiryTitle(): string
    {
        return $this->inquiry?->getTitle() ?? '';
    }

    public function getInquiryOwner(): string
    {
        return $this->inquiry?->getOwner() ?? '';
    }

    public function getActor(): string
    {
        if ($this->userSession->getCurrentUserId() !== '') {
            return $this->userSession->getCurrentUserId();
        }
        if (method_exists($this->eventObject, 'getUserId')) {
            return $this->eventObject->getUserId();
        }
        return '';
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
            return $this->getInquiryId();
        }
        if (method_exists($this->eventObject, 'getId')) {
            return $this->eventObject->getId();
        }
        return 0;
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
