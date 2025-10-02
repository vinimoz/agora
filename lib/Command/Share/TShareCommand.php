<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Share;

use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Service\ShareService;
use OCP\IGroup;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserManager;
use Stecman\Component\Symfony\Console\BashCompletion\CompletionContext;

trait TShareCommand
{
    public function __construct(
        private InquiryMapper $inquiryMapper,
        private ShareMapper $shareMapper,
        private ShareService $shareService,
        private IUserManager $userManager,
        private IGroupManager $groupManager,
    ) {
        parent::__construct();
    }

    /**
     * @psalm-suppress UnusedMethod
     */
    private function completeUserValues(CompletionContext $context): array
    {
        return array_map(
            function (IUser $user) {
                return $user->getUID();
            }, $this->userManager->search($context->getCurrentWord())
        );
    }

    /**
     * @psalm-suppress UnusedMethod
     */
    private function completeGroupValues(CompletionContext $context): array
    {
        return array_map(
            function (IGroup $group) {
                return $group->getGID();
            }, $this->groupManager->search($context->getCurrentWord())
        );
    }
}
