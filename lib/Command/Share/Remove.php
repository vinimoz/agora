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
use OCA\Agora\Db\Share;
use OCA\Agora\Model\Group\Group;
use OCA\Agora\Model\User\Contact;
use OCA\Agora\Model\User\Email;
use OCA\Agora\Model\User\GenericUser;
use OCA\Agora\Model\User\User;
use OCP\AppFramework\Db\DoesNotExistException;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @psalm-api
 */
class Remove extends Base
{
    use TShareCommand;

    protected function configure(): void
    {
        $this
            ->setName(AppConstants::APP_ID . ':share:remove')
            ->setDescription('Remove user invitations from a inquiry')
            ->addArgument(
                'id',
                InputArgument::REQUIRED,
                'ID of the inquiry to remove invitations from'
            )->addOption(
                'user',
                null,
                InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY,
                'Removes invitation of the given users from the inquiry'
            )->addOption(
                'group',
                null,
                InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY,
                'Removes invitations for all members of the given groups from the inquiry'
            )->addOption(
                'email',
                null,
                InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY,
                'Removes invitations for all users with the given e-mail addresses from the inquiry'
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

        $this->removeUsers($inquiry, $users);
        $this->removeGroups($inquiry, $groups);
        $this->removeEmails($inquiry, $emails);

        $output->writeln('<info>Inquiry invitations successfully revoked.</info>');
        return 0;
    }

    /**
     * @param          Inquiry  $inquiry
     * @param          string[] $userIds
     * @psalm-suppress UnusedMethod
     */
    private function removeUsers(Inquiry $inquiry, array $userIds): void
    {
        foreach ($this->getUserShares($inquiry) as $share) {
            if (in_array($share->getUserId(), $userIds, true)) {
                $this->shareService->delete($share);
            }
        }
    }

    /**
     * @param          Inquiry  $inquiry
     * @param          string[] $groupIds
     * @psalm-suppress UnusedMethod
     */
    private function removeGroups(Inquiry $inquiry, array $groupIds): void
    {
        foreach ($this->getGroupShares($inquiry) as $share) {
            if (in_array($share->getUserId(), $groupIds, true)) {
                $this->shareService->delete($share);
            }
        }
    }

    /**
     * @param          Inquiry  $inquiry
     * @param          string[] $emails
     * @psalm-suppress UnusedMethod
     */
    private function removeEmails(Inquiry $inquiry, array $emails): void
    {
        foreach ($this->getEmailShares($inquiry) as $share) {
            if (in_array($share->getEmailAddress(), $emails, true)) {
                $this->shareService->delete($share);
            }
        }
    }

    /**
     * @param          Inquiry $inquiry
     * @return         Share[]
     * @psalm-suppress UnusedMethod
     */
    private function getUserShares(Inquiry $inquiry): array
    {
        $shares = $this->shareMapper->findByInquiry($inquiry->getId());
        return array_values(
            array_filter(
                $shares, static function (Share $share): bool {
                    return ($share->getType() === User::TYPE);
                }
            )
        );
    }

    /**
     * @param          Inquiry $inquiry
     * @return         Share[]
     * @psalm-suppress UnusedMethod
     */
    private function getGroupShares(Inquiry $inquiry): array
    {
        $shares = $this->shareMapper->findByInquiry($inquiry->getId());
        return array_values(
            array_filter(
                $shares, static function (Share $share): bool {
                    return ($share->getType() === Group::TYPE);
                }
            )
        );
    }

    /**
     * @param          Inquiry $inquiry
     * @return         Share[]
     * @psalm-suppress UnusedMethod
     */
    private function getEmailShares(Inquiry $inquiry): array
    {
        $shares = $this->shareMapper->findByInquiry($inquiry->getId());
        return array_values(
            array_filter(
                $shares, static function (Share $share): bool {
                    if (($share->getType() === GenericUser::TYPE) && $share->getEmailAddress()) {
                        return true;
                    }

                    return (($share->getType() === Email::TYPE) || ($share->getType() === Contact::TYPE));
                }
            )
        );
    }
}
