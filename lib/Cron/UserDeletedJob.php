<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Cron;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\CommentMapper;
use OCA\Agora\Db\LogMapper;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\InquiryMapper;

use OCA\Agora\Db\PreferencesMapper;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Db\SubscriptionMapper;
use OCA\Agora\Db\SupportMapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\QueuedJob;
use OCP\ISession;
use OCP\Security\ISecureRandom;
use Psr\Log\LoggerInterface;

/**
 * @psalm-api
 */
class UserDeletedJob extends QueuedJob
{
    public function __construct(
        private CommentMapper $commentMapper,
        private ISecureRandom $secureRandom,
        protected ITimeFactory $time,
        private LoggerInterface $logger,
        private LogMapper $logMapper,
        private OptionMapper $optionMapper,
        private InquiryMapper $inquiryMapper,
        private PreferencesMapper $preferencesMapper,
        private ShareMapper $shareMapper,
        private SubscriptionMapper $subscriptionMapper,
        private SupportMapper $supportMapper,
        private ISession $session,
    ) {
        parent::__construct($time);
    }

    /**
     * @param  mixed $argument
     * @return void
     */
    protected function run($argument)
    {
        $this->session->set(AppConstants::SESSION_KEY_CRON_JOB, true);
        $userId = $argument['userId'];
        $this->logger->info(
            'Deleting inquiries for deleted user', [
            'userId' => $userId
            ]
        );

        $replacementName = 'deleted_' . $this->secureRandom->generate(
            8,
            ISecureRandom::CHAR_DIGITS
            . ISecureRandom::CHAR_LOWER
            . ISecureRandom::CHAR_UPPER
        );

        $this->inquiryMapper->deleteByUserId($userId);
        $this->logMapper->deleteByUserId($userId);
        $this->shareMapper->deleteByIdAndType($userId, Share::TYPE_USER);
        $this->preferencesMapper->deleteByUserId($userId);
        $this->subscriptionMapper->deleteByUserId($userId);
        $this->commentMapper->renameUserId($userId, $replacementName);
        $this->optionMapper->renameUserId($userId, $replacementName);
        $this->supportMapper->renameUserId($userId, $replacementName);
        $this->session->remove(AppConstants::SESSION_KEY_CRON_JOB);
    }
}
