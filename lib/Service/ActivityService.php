<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Share;
use OCA\Agora\Event\BaseEvent;
use OCA\Agora\Event\CommentEvent;
use OCA\Agora\Event\OptionEvent;
use OCA\Agora\Event\InquiryEvent;
use OCA\Agora\Event\ShareEvent;
use OCA\Agora\Event\SupportEvent;
use OCA\Agora\UserSession;
use OCP\Activity\IEvent as ActivityEvent;
use OCP\Activity\IManager as ActivityManager;
use OCP\IL10N;
use OCP\L10N\IFactory;

class ActivityService
{
    protected const APP_ID = AppConstants::APP_ID;
    private ActivityEvent $activityEvent;
    private BaseEvent $baseEvent;

    private string $shareType = '';
    private bool $userIsActor = true;
    private const FIRST_PERSON_FULL = 'firstFull';
    private const THIRD_PERSON_FULL = 'thirdFull';
    private const FIRST_PERSON_FILTERED = 'firstFiltered';
    private const THIRD_PERSON_FILTERED = 'thirdFiltered';

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private ActivityManager $activityManager,
        private IL10N $l10n,
        private IFactory $transFactory,
        private UserSession $userSession,
    ) {
    }

    public function getActivityMessage(ActivityEvent $activityEvent, string $language, bool $filtered = false): string
    {
        $this->activityEvent = $activityEvent;
        $this->l10n = $this->transFactory->get($this->activityEvent->getApp(), $language);

        try {
            $this->userIsActor = $this->activityEvent->getAuthor() === $this->userSession->getCurrentUserId();
        } catch (\Exception $e) {
            $this->userIsActor = false;
        }

        $parameters = $this->activityEvent->getSubjectParameters();
        $this->shareType = $parameters['shareType']['name'] ?? '';

        $messages = $this->getMatchedMessages();

        if ($filtered) {
            return $this->userIsActor ? $messages[self::FIRST_PERSON_FILTERED] : $messages[self::THIRD_PERSON_FILTERED];
        }

        return $this->userIsActor ? $messages[self::FIRST_PERSON_FULL] : $messages[self::THIRD_PERSON_FULL];
    }

    public function addActivity(BaseEvent $baseEvent): void
    {
        $this->baseEvent = $baseEvent;
        $this->createActivityEvent();
        $this->publishActivityEvent();
    }

    private function createActivityEvent(): void
    {
        $this->activityEvent = $this->activityManager->generateEvent();
        $this->activityEvent->setApp(AppConstants::APP_ID)
            ->setType($this->baseEvent->getActivityType() ?? '')
            ->setAuthor($this->baseEvent->getActor())
            ->setObject($this->baseEvent->getActivityObjectType() ?? '', $this->baseEvent->getActivityObjectId())
            ->setSubject($this->baseEvent->getActivityType() ?? '', $this->baseEvent->getActivitySubjectParams())
            ->setTimestamp(time());
    }

    private function publishActivityEvent(): void
    {
        $this->activityEvent->setAffectedUser($this->baseEvent->getActor());
        $this->activityManager->publish($this->activityEvent);

        // add additional event for inquiry owner if not actor
        if ($this->baseEvent->getActor() !== $this->baseEvent->getInquiryOwner()) {
            $this->activityEvent->setAffectedUser($this->baseEvent->getInquiryOwner());
            $this->activityManager->publish($this->activityEvent);
        }
    }

    private function getMatchedMessages(): array
    {
        return match ($this->activityEvent->getType()) {
            SupportEvent::ADD => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have supported this inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has supported this inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have supported'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has supported'),
            ],
            SupportEvent::DELETE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted a support from inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted a support from inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted a support'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted a support'),
            ],    
            CommentEvent::ADD => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have commented on inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has commented on inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have commented'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has commented'),
            ],
            CommentEvent::DELETE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted a comment from inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted a comment from inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted a comment'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted a comment'),
            ],
            CommentEvent::RESTORE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have restored a comment from inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored a comment from inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored a comment'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored a comment'),
            ],
            OptionEvent::ADD => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have added an option to inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has added an option to inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have added an option'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has added an option'),
            ],
            OptionEvent::UPDATE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed an option of inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has changed an option of inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed an option'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has changed an option'),
            ],
            OptionEvent::CONFIRM => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have confirmed option {optionTitle} of inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has confirmed option {optionTitle} of inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have confirmed option {optionTitle}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has confirmed option {optionTitle}'),
            ],
            OptionEvent::UNCONFIRM => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have unconfirmed option {optionTitle} of inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has unconfirmed option {optionTitle} of inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have unconfirmed option {optionTitle}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has unconfirmed option {optionTitle}'),
            ],
            OptionEvent::DELETE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted option {optionTitle} from inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted option {optionTitle} from inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted option {optionTitle}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted option {optionTitle}'),
            ],
            OptionEvent::RESTORE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have restored option {optionTitle} from inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored option {optionTitle} from inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored option {optionTitle}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored option {optionTitle}'),
            ],
            InquiryEvent::ADD => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have added inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has added inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have created this inquiry'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has created this inquiry'),
            ],
            InquiryEvent::UPDATE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed the configuration of inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has changed the configuration of inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed the configuration'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has changed the configuration'),
            ],
            InquiryEvent::DELETE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have archived inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has archived inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have archived this inquiry'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has archived this inquiry'),
            ],
            InquiryEvent::RESTORE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have restored inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored this inquiry'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored this inquiry'),
            ],
            InquiryEvent::EXPIRE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('Inquiry {inquiryTitle} has been closed'),
            self::THIRD_PERSON_FULL => $this->l10n->t('Inquiry {inquiryTitle} has been closed'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('This inquiry has been closed'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('This inquiry has been closed'),
            ],
            InquiryEvent::CLOSE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have closed the inquiry "{inquiryTitle}"'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has closed the inquiry "{inquiryTitle}"'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have closed this inquiry'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has closed this inquiry'),
            ],
            InquiryEvent::REOPEN => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have reopened the inquiry "{inquiryTitle}"'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has reopened the inquiry "{inquiryTitle}"'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have reopened this inquiry'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has reopened this inquiry'),
            ],
            InquiryEvent::OWNER_CHANGE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed the owner of inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has changed the owner of inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed the inquiry owner'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has changed the inquiry owner'),
            ],
            InquiryEvent::OPTION_REORDER => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have reordered the options of inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has reordered the options of inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have reordered the options'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has reordered the options'),
            ],
            ShareEvent::CHANGE_EMAIL => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed your email address'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{sharee} has changed the email address'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed your email address'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('Email address of {sharee} has been changed'),
            ],
            ShareEvent::CHANGE_DISPLAY_NAME => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed your name'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{sharee} has changed the name'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed your name'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('Display name of {sharee} has been changed'),
            ],
            ShareEvent::CHANGE_LABEL => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed the share label'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed the share label'),
            ],
            ShareEvent::CHANGE_TYPE => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed the share type'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has changed the share type'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed the share type'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has changed the share type'),
            ],
            ShareEvent::CHANGE_REG_CONSTR => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have changed the registration constraints for the public share labeled {sharee}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has changed the registration constraints for the public share labeled {sharee}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have changed the registration constraints for the public share labeled {sharee}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has changed the registration constraints for the public share labeled {sharee}'),
            ],
            ShareEvent::REGISTRATION => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have registered to inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{sharee} registered to inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have registered'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{sharee} has registered'),
            ],
            SupportEvent::SET => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have supported in inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has supported in inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have supported'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has supported'),
            ],
            ShareEvent::LOCKED => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have locked the share of {sharee}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has locked the share of {sharee}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have locked the share of {sharee}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has locked the share of {sharee}'),
            ],
            ShareEvent::UNLOCKED => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have unlocked the share of {sharee}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has unlocked the share of {sharee}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have unlocked the share of {sharee}'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has unlocked the share of {sharee}'),
            ],
            ShareEvent::ADD => match ($this->shareType) {
                Share::TYPE_PUBLIC => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have added a public share to inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has added a public share to inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have added a public share'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has added a public share'),

                ],
                Share::TYPE_GROUP => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have shared inquiry {inquiryTitle} with group {sharee}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has shared inquiry {inquiryTitle} with group {sharee}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have shared this inquiry with group {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has shared this inquiry with group {sharee}'),

                ],
                Share::TYPE_CIRCLE => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have shared inquiry {inquiryTitle} with circle {sharee}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has shared inquiry {inquiryTitle} with circle {sharee}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have shared this inquiry with circle {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has shared this inquiry with circle {sharee}'),

                ],
                Share::TYPE_CONTACTGROUP => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have shared inquiry {inquiryTitle} with contact group {sharee}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has shared inquiry {inquiryTitle} with contact group {sharee}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have shared this inquiry with contact group {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has shared this inquiry with contact group {sharee}'),

                ],
                default => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have shared inquiry {inquiryTitle} with {sharee}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has shared inquiry {inquiryTitle} with {sharee}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have shared this inquiry with {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has shared this inquiry with {sharee}'),
                ],
            },

            ShareEvent::DELETE => match ($this->shareType) {
                Share::TYPE_USER, Share::TYPE_EMAIL, Share::TYPE_CONTACT, Share::TYPE_EXTERNAL => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted the share for {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted the share for {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted share of {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted a share'),
                ],
                Share::TYPE_PUBLIC => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted a public share from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted a public share from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted a public share'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted a public share'),
                ],
                Share::TYPE_GROUP => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted the share for group {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted the share for group {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted the share for group {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted the share for group {sharee}'),
                ],
                Share::TYPE_CIRCLE => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted the share for circle {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted the share for circle {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted the share for circle {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted the share for circle {sharee}'),
                ],
                Share::TYPE_CONTACTGROUP => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted the share for contact group {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted the share for contact group {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted the share for contact group {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted the share for contact group {sharee}'),
                ],
                default => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have deleted a share from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has deleted a share from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have deleted share of {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has deleted a share'),
                ],
            },
            ShareEvent::RESTORE => match ($this->shareType) {
                Share::TYPE_USER, Share::TYPE_EMAIL, Share::TYPE_CONTACT, Share::TYPE_EXTERNAL => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have restored the share for {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored the share for {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored share of {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored a share'),
                ],
                Share::TYPE_PUBLIC => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have restored a public share from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored a public share from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored a public share'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored a public share'),
                ],
                Share::TYPE_GROUP => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have restored the share for group {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored the share for group {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored the share for group {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored the share for group {sharee}'),
                ],
                Share::TYPE_CIRCLE => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have restored the share for circle {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored the share for circle {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored the share for circle {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored the share for circle {sharee}'),
                ],
                Share::TYPE_CONTACTGROUP => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have restored the share for contact group {sharee} from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored the share for contact group {sharee} from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored the share for contact group {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored the share for contact group {sharee}'),
                ],
                default => [
                self::FIRST_PERSON_FULL => $this->l10n->t('You have restored a share from inquiry {inquiryTitle}'),
                self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has restored a share from inquiry {inquiryTitle}'),
                self::FIRST_PERSON_FILTERED => $this->l10n->t('You have restored share of {sharee}'),
                self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has restored a share'),
                ],
            },
            default => [
            self::FIRST_PERSON_FULL => $this->l10n->t('You have done something indescribable with inquiry {inquiryTitle}'),
            self::THIRD_PERSON_FULL => $this->l10n->t('{actor} has done something indescribable with inquiry {inquiryTitle}'),
            self::FIRST_PERSON_FILTERED => $this->l10n->t('You have done something indescribable with this inquiry'),
            self::THIRD_PERSON_FILTERED => $this->l10n->t('{actor} has done something indescribable with this inquiry'),
            ],
        };
    }
}
