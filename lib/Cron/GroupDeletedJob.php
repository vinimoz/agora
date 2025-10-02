<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Cron;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\QueuedJob;
use OCP\ISession;
use Psr\Log\LoggerInterface;

class GroupDeletedJob extends QueuedJob
{
    /**
     * @psalm-api
     */
    public function __construct(
        private ShareMapper $shareMapper,
        protected ITimeFactory $time,
        private LoggerInterface $logger,
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
        $group = $argument['group'];
        $this->logger->info(
            'Removing group shares for deleted group', [
            'group' => $group
            ]
        );

        $this->shareMapper->deleteByIdAndType($group, Share::TYPE_GROUP);
        $this->session->remove(AppConstants::SESSION_KEY_CRON_JOB);
    }
}
