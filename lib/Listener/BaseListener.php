<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Listener;

use OCA\Agora\Event\BaseEvent;
use OCA\Agora\Event\InquiryArchivedEvent;
use OCA\Agora\Event\InquiryDeletedEvent;
use OCA\Agora\Event\InquiryExpiredEvent;
use OCA\Agora\Event\InquiryOwnerChangeEvent;
use OCA\Agora\Exceptions\InvalidClassException;
use OCA\Agora\Exceptions\OCPEventException;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Service\ActivityService;
use OCA\Agora\Service\LogService;
use OCA\Agora\Service\NotificationService;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\WatchService;
use OCP\BackgroundJob\IJobList;
use OCP\DB\Exception;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Group\Events\GroupDeletedEvent;
use OCP\User\Events\UserDeletedEvent;

/**
 * @template-implements IEventListener<Event>
 */
abstract class BaseListener implements IEventListener
{
    protected Event|BaseEvent|GroupDeletedEvent|UserDeletedEvent|null $event = null;
    protected const WATCH_TABLES = [];

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        protected ActivityService $activityService,
        protected AppSettings $appSettings,
        protected IJobList $jobList,
        protected LogService $logService,
        protected NotificationService $notificationService,
        protected WatchService $watchService,
        protected InquiryService $inquiryService,
    ) {
    }

    public function handle(Event $event) : void
    {
        $this->event = $event;
        try {
            // check if event is child of \OCA\Agora\Event\BaseEvent
            $this->checkClass();
            $this->updateLastInteraction();
            $this->addLog();
            $this->addActivity();

        } catch (InvalidClassException $e) {
            return;
        } catch (OCPEventException $e) {
            // Event is no inquiries internal event, continue with general jobs
        } catch (Exception $e) {
            if ($e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
                // Avoid spamming
                // TODO: report some important events anyways
                // since NC22
                // if ($this->appSettings->getUseActivity()) {
                //     $this->addActivity();
                // }
            } else {
                throw $e;
            }
        }
        // add a cron job, if necessary (i.e. for removed users and groups)
        $this->addCronJob();

        // if a direct notification should be sent
        $this->createNotification();

        // update watch tables to inform clients about inquiry changes (watch inquirying)
        $this->writeWatch();
    }

    /**
     * Check the class of $event. This method has to be declared in every
     * child class.
     *
     * @throws InvalidClassException
     */
    protected function checkClass() : void
    {
        throw new InvalidClassException('child class must be checked in child class');
    }

    protected function updateLastInteraction(): void
    {
        // Update last interaction, exept event is one of the of excluded events
        if ($this->event instanceof InquiryOwnerChangeEvent
            || $this->event instanceof InquiryExpiredEvent
            || $this->event instanceof InquiryDeletedEvent
            || $this->event instanceof InquiryArchivedEvent
        ) {
            return;
        }
        $this->inquiryService->setLastInteraction($this->getInquiryId());
    }
    /**
     * Default logging for email notifications.
     *
     * @throws Exception
     */
    protected function addLog() : void
    {
        if (!($this->event instanceof BaseEvent)) {
            return;
        }
        if ($this->event->getLogId()) {
            $this->logService->setLog(
                $this->event->getInquiryId(),
                $this->event->getLogId(),
                $this->event->getActor()
            );
        }
    }

    /**
     * No default, define in child class
     */
    protected function createNotification() : void
    {
        return;
    }

    /**
     * No default, define in child class
     */
    protected function addCronJob() : void
    {
        return;
    }

    /**
     * Return the inquiry id
     */
    protected function getInquiryId() : int
    {
        if (($this->event instanceof BaseEvent)) {
            return $this->event->getInquiryId();
        }
        return 0;
    }

    /**
     * Default for activity notification.
     */
    protected function addActivity() : void
    {
        if (($this->event instanceof BaseEvent)
            && $this->appSettings->getUseActivity()
            && boolval($this->event->getActivityType())
            && boolval($this->event->getActivityObjectType())
        ) {
            $this->activityService->addActivity($this->event);
        }
    }

    /**
     * Default for watch
     * Tables to watch are defined in WATCH_TABLES
     */
    protected function writeWatch() : void
    {
        if (!($this->event instanceof BaseEvent)) {
            return;
        }

        foreach (static::WATCH_TABLES as $table) {
            $this->watchService->writeUpdate($this->event->getInquiryId(), $table);
        }
    }
}
