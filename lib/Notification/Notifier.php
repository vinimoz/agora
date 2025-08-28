<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Notification;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Service\NotificationService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;
use Psr\Log\LoggerInterface;

class Notifier implements INotifier
{
    public const NOTIFY_INQUIRY_DELETED_BY_OTHER = 'deleteInquiryByOther';
    public const NOTIFY_INQUIRY_ARCHIVED_BY_OTHER = 'softDeleteInquiryByOther';
    public const NOTIFY_INQUIRY_TAKEOVER = 'takeOverInquiry';
    public const NOTIFY_INQUIRY_CHANGED_OWNER = 'InquiryChangedOwner';
    public const NOTIFY_INVITATION = 'invitation';
    private const SUBJECT_PARSED = 'parsedSubject';
    private const SUBJECT_RICH = 'richSubject';

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        protected IFactory $l10nFactory,
        protected IURLGenerator $urlGenerator,
        protected InquiryMapper $inquiryMapper,
        private UserMapper $userMapper,
        private NotificationService $notificationService,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Identifier of the notifier, only use [a-z0-9_]
     */
    public function getID(): string
    {
        return AppConstants::APP_ID;
    }

    /**
     * Returns the subject parameters
     * Since 8.0.0 we changed the structure of the parameters
     *
     * @return string[]
     */
    private function extractParameters(INotification $notification): array
    {
        $parameters = $notification->getSubjectParameters();

        // old array - deprecated since v8.0.0
        if (isset($parameters['inquiryTitle']) && is_array($parameters['inquiryTitle'])) {
            return $parameters['inquiryTitle'];
        }

        // new array - since v8.0.0
        if (isset($parameters['inquiry']) && is_array($parameters['inquiry'])) {
            return $parameters['inquiry'];
        }

        throw new UnknownNotificationException('Invalid parameters for Inquiry notification');
    }

    /**
     * Extracts the inquiry from the notification
     *
     * @throws DoesNotExistException
     */
    private function extractInquiry(INotification $notification): Inquiry
    {
        if ($notification->getObjectType() !== 'inquiry') {
            // probably an 'activity_notification' notification
            $inquiryId = $this->extractParameters($notification)['id'] ?? null;
        } else {
            $inquiryId = $notification->getObjectId();
        }
        return $this->inquiryMapper->get(intval($inquiryId));
    }

    private function extractActorId(INotification $notification): ?string
    {
        // actor is set in the subject parameters
        $parameters = $this->extractParameters($notification);
        if (isset($parameters['actor']) && $parameters['actor'] !== '') {
            return $parameters['actor'];
        }
        // fallback to owner, if no actor is set
        if (isset($parameters['owner']) && $parameters['owner'] !== '') {
            return $parameters['owner'];
        }
        return null;
    }

    /**
     * Human readable name describing the notifier
     */
    public function getName(): string
    {
        return $this->l10nFactory->get(AppConstants::APP_ID)->t('Agora');
    }

    public function prepare(INotification $notification, string $languageCode): INotification
    {
        if ($notification->getApp() !== AppConstants::APP_ID) {
            // not for inquiries, don't bother me
            throw new UnknownNotificationException();
        }

        $l = $this->l10nFactory->get(AppConstants::APP_ID, $languageCode);


        $notification->setIcon(
            $this->urlGenerator->getAbsoluteURL(
                $this->urlGenerator->imagePath(AppConstants::APP_ID, 'agora-dark.svg')
            )
        );

        $parameters = $this->extractParameters($notification);

        try {
            $inquiry = $this->extractInquiry($notification);
        } catch (DoesNotExistException $e) {
            $this->logger->info(
                'Notification silently removed, inquiry not found', [
                'notification' => $notification->getObjectId(),
                'error' => $e->getMessage(),
                ]
            );
            $this->notificationService->removeNotification($notification);
            return $notification;
        }

        $actorId = $this->extractActorId($notification) ?? $inquiry->getOwner();
        $actor = $this->userMapper->getUserFromUserBase($actorId);

        $inquiryTitle = $inquiry->getTitle();
        $notification->setLink($inquiry->getSupportUrl());

        // TODO: tidy subjects and parameters
        $subjects = match ($notification->getSubject()) {
            self::NOTIFY_INVITATION => [
            self::SUBJECT_PARSED => $l->t('%s invited you to a inquiry', $actor->getDisplayName()),
            self::SUBJECT_RICH => $l->t('{actor} has invited you to the inquiry "%s".', $inquiryTitle),
            ],
            self::NOTIFY_INQUIRY_TAKEOVER => [
            self::SUBJECT_PARSED => $l->t('%s took over your inquiry', $actor->getDisplayName()),
            self::SUBJECT_RICH => $l->t('{actor} took over your inquiry "%s" and is the new owner.', $inquiryTitle),
            ],
            self::NOTIFY_INQUIRY_CHANGED_OWNER => [
            self::SUBJECT_PARSED => $l->t('%s is the new owner of your inquiry.', $parameters['newOwner']),
            self::SUBJECT_RICH => $l->t('{actor} transfered your inquiry "%s" to {newOwner}. You are no more the owner.', $inquiryTitle),
            ],
            self::NOTIFY_INQUIRY_DELETED_BY_OTHER => [
            self::SUBJECT_PARSED => $l->t('%s deleted your inquiry', $actor->getDisplayName()),
            self::SUBJECT_RICH => $l->t('{actor} deleted your inquiry "%s".', $inquiryTitle),
            ],
            self::NOTIFY_INQUIRY_ARCHIVED_BY_OTHER => [
            self::SUBJECT_PARSED => $l->t('%s archived your inquiry', $actor->getDisplayName()),
            self::SUBJECT_RICH => $l->t('{actor} archived your inquiry "%s".', $inquiryTitle),
            ],
            // Unknown subject => Unknown notification => throw
            default => throw new UnknownNotificationException(),
            // for debugging purposes, uncomment to see the default subject
            // default => [
            //     self::SUBJECT_PARSED => $l->t('ohoh ', $actor->getDisplayName()),
            //     self::SUBJECT_RICH => $l->t('{actor} unknown notification "%s".', $inquiryTitle),
            // ],
        };

        switch ($notification->getSubject()) {
        case self::NOTIFY_INQUIRY_CHANGED_OWNER:
            $newOwner = $this->userMapper->getUserFromUserBase($parameters['newOwner']);
            // overwrite the subject with the new owner
            $notification->setParsedSubject(
                $l->t('%s is the new owner of your inquiry.', $newOwner->getDisplayName())
            );

            $notification->setRichSubject(
                $subjects[self::SUBJECT_RICH],
                [
                'actor' => $actor->getRichObjectString(),
                'newOwner' => $newOwner->getRichObjectString(),
                ]
            );
            break;

        default:
            $notification->setParsedSubject($subjects[self::SUBJECT_PARSED]);
            $notification->setRichSubject(
                $subjects[self::SUBJECT_RICH],
                [
                'actor' => $actor->getRichObjectString(),
                ]
            );
            break;
        }

        return $notification;
    }
}
