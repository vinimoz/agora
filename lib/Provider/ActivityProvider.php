<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Provider;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Model\UserBase;
use OCA\Agora\Service\ActivityService;
use OCP\Activity\Exceptions\UnknownActivityException;
use OCP\Activity\IEvent;
use OCP\Activity\IEventMerger;
use OCP\Activity\IManager as ActivityManager;
use OCP\Activity\IProvider;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;

/**
 * @psalm-suppress UnusedClass
 */
class ActivityProvider implements IProvider
{
    public function __construct(
        protected ActivityManager $activityManager,
        protected ActivityService $activityService,
        protected IEventMerger $eventMerger,
        protected IFactory $transFactory,
        protected IURLGenerator $urlGenerator,
        protected ShareMapper $shareMapper,
        protected IL10N $l10n,
        protected UserMapper $userMapper,
    ) {
    }

    public function parse($language, IEvent $event, ?IEvent $previousEvent = null)
    {
        if ($event->getApp() !== AppConstants::APP_ID) {
            throw new UnknownActivityException();
        }

        $this->l10n = $this->transFactory->get($event->getApp(), $language);
        $event->setIcon($this->urlGenerator->getAbsoluteURL($this->urlGenerator->imagePath($event->getApp(), 'agora-dark.svg')));
        $subject = $this->activityService->getActivityMessage($event, $language, $this->activityManager->isFormattingFilteredObject());
        if (!$subject) {
            throw new UnknownActivityException();
        }
        $this->setSubjects($event, $subject);
        return $event;
    }

    private function patchParameters(array $parameters) : array
    {
        // add an ugly fix, because there are some activities that have misconfigured inquiry references
        // the inquiry can exist as $parameters['inquiry'] or as $parameters['inquiryTitle']
        // fix it to $parameters['inquiryTitle'] for consistency
        // this to avoid massive translation changes in transifex

        if (isset($parameters['inquiry']) && !isset($parameters['inquiryTitle'])) {
            $parameters['inquiryTitle'] = $parameters['inquiry'];
        }

        return $parameters;
    }

    protected function setSubjects(IEvent $event, string $subject): void
    {
        $parameters = $this->patchParameters($event->getSubjectParameters());

        try {
            $actor = $this->userMapper->getParticipant($event->getAuthor(), $event->getObjectId());
            $parameters['actor'] = [
            'type' => $actor->getSimpleType(),
            'id' => $actor->getId(),
            'name' => $actor->getDisplayName(),
            ];
        } catch (\Exception $e) {
            $parameters['actor'] = [
            'type' => UserBase::TYPE_GUEST,
            'id' => $event->getAuthor(),
            'name' => 'An unknown participant',
            ];
        }


        $placeholders = $replacements = [];
        foreach ($parameters as $placeholder => $parameter) {
            $placeholders[] = '{' . $placeholder . '}';
            $replacements[] = $parameter['name'];
        }
        $event->setParsedSubject(str_replace($placeholders, $replacements, $subject))
            ->setRichSubject($subject, $parameters);
    }
}
