<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Share;

use OC\Core\Command\Base;
use OCA\Agora\AppConstants;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Exceptions\ShareAlreadyExistsException;
use OCA\Agora\Model\Group\Group;
use OCA\Agora\Model\User\Email;
use OCA\Agora\Model\User\User;
use OCP\AppFramework\Db\DoesNotExistException;
use Stecman\Component\Symfony\Console\BashCompletion\CompletionContext;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @psalm-api
 */
class Add extends Base
{
    use TShareCommand;

    protected function configure(): void
    {
        $this
            ->setName(AppConstants::APP_ID . ':share:add')
            ->setDescription('Invites users to a inquiry')
            ->addArgument(
                'id',
                InputArgument::REQUIRED,
                'ID of the inquiry to invite users to'
            )->addOption(
                'user',
                null,
                InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY,
                'Invites the given users to the inquiry'
            )->addOption(
                'group',
                null,
                InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY,
                'Invites all members of the given groups to the inquiry'
            )->addOption(
                'email',
                null,
                InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY,
                'Sends invitation e-mails to the given addresses to participate in the inquiry'
            );
    }

    /**
     * @psalm-suppress PossiblyUnusedParam
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $inquiryId = $input->getArgument('id');
        $users = $input->getOption('user');
        $groups = $input->getOption('group');
        $emails = $input->getOption('email');

        try {
            $inquiry = $this->inquiryMapper->get($inquiryId);
        } catch (DoesNotExistException $e) {
            $output->writeln('<error>Inquiry not found.</error>');
            return 1;
        }

        $this->inviteUsers($inquiry, $users);
        $this->inviteGroups($inquiry, $groups);
        $this->inviteEmails($inquiry, $emails);

        $output->writeln('<info>Users successfully invited to inquiry.</info>');
        return 0;
    }

    /**
     * @param          Inquiry  $inquiry
     * @param          string[] $userIds
     * @psalm-suppress UnusedMethod
     */
    private function inviteUsers(Inquiry $inquiry, array $userIds): void
    {
        foreach ($userIds as $userId) {
            try {
                $share = $this->shareService->add($inquiry->getId(), User::TYPE, $userId);
                $this->shareService->sendInvitation($share);
            } catch (ShareAlreadyExistsException $e) {
                // silently ignore already existing shares
            }
        }
    }

    /**
     * @param          Inquiry  $inquiry
     * @param          string[] $groupIds
     * @psalm-suppress UnusedMethod
     */
    private function inviteGroups(Inquiry $inquiry, array $groupIds): void
    {
        foreach ($groupIds as $groupId) {
            try {
                $share = $this->shareService->add($inquiry->getId(), Group::TYPE, $groupId);
                $this->shareService->sendInvitation($share);
            } catch (ShareAlreadyExistsException $e) {
                // silently ignore already existing shares
            }
        }
    }

    /**
     * @param          Inquiry  $inquiry
     * @param          string[] $emails
     * @psalm-suppress UnusedMethod
     */
    private function inviteEmails(Inquiry $inquiry, array $emails): void
    {
        foreach ($emails as $email) {
            try {
                $share = $this->shareService->add($inquiry->getId(), Email::TYPE, $email);
                $this->shareService->sendInvitation($share);
            } catch (ShareAlreadyExistsException $e) {
                // silently ignore already existing shares
            }
        }
    }

    /**
     * @psalm-suppress PossiblyUnusedParam
     */
    public function completeOptionValues($optionName, CompletionContext $context)
    {
        return match ($optionName) {
            'user' => $this->completeUserValues($context),
            'group' => $this->completeGroupValues($context),
            default => parent::completeOptionValues($optionName, $context),
        };
    }
}
