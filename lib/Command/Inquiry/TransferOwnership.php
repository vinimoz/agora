<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Inquiry;

use OCA\Agora\AppConstants;
use OCA\Agora\Service\InquiryService;
use OCP\IUser;
use OCP\IUserManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

/**
 * @psalm-api
 */
class TransferOwnership extends Command
{
    public function __construct(
        private IUserManager $userManager,
        private InquiryService $inquiryService,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setName(AppConstants::APP_ID . ':inquiry:transfer-ownership')
            ->setDescription('Transfer the ownership of one user\'s inquiries to another user.')
            ->addArgument(
                'source-user',
                InputArgument::REQUIRED,
                'User id to transfer the inquiries from'
            )
            ->addArgument(
                'target-user',
                InputArgument::REQUIRED,
                'User id to transfer the inquiries to'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        if ($this->requestConfirmation($input, $output)) {
            return 1;
        }

        if (!$this->userManager->get($input->getArgument('target-user')) instanceof IUser) {
            $output->writeln('<error>  Unknown destination user ' . $input->getArgument('target-user') . '</error>');
            return 1;
        }

        $transferredInquiries = $this->inquiryService->transferInquiries($input->getArgument('source-user'), $input->getArgument('target-user'));

        if (sizeof($transferredInquiries) < 1) {
            $output->writeln('<info>No inquiries were transferred from ' . $input->getArgument('source-user') . '</info>');
        } elseif (sizeof($transferredInquiries) === 1) {
            $output->writeln('<info>One inquiry was transferred from ' . $input->getArgument('source-user') . ' to ' . $input->getArgument('target-user') . '</info>');
            $output->writeln('<info> * ' . $transferredInquiries[0]->getId() . ' - ' . $transferredInquiries[0]->getTitle() . '</info>');
        } else {
            $output->writeln('<info>' . sizeof($transferredInquiries) . ' inquiries were transferred from ' . $input->getArgument('source-user') . ' to ' . $input->getArgument('target-user') . '</info>');
            foreach ($transferredInquiries as $inquiry) {
                $output->writeln('<info> * ' . $inquiry->getId() . ' - ' . $inquiry->getTitle() . '</info>');
            }
        }

        return 0;
    }

    private function requestConfirmation(InputInterface $input, OutputInterface $output): int
    {
        if ($input->isInteractive()) {
            /**
       * @var QuestionHelper 
*/
            $helper = $this->getHelper('question');
            $output->writeln('<comment>This command will change the ownership of all inquiries of ' . $input->getArgument('source-user') . ' to ' . $input->getArgument('target-user') . '.</comment>');
            $output->writeln('<comment>NO notifications will be sent to the users.</comment>');
            $output->writeln('');

            $question = new ConfirmationQuestion('Continue with the transfer (y/n)? [n] ', false);
            if (!$helper->ask($input, $output, $question)) {
                return 1;
            }
        }
        return 0;
    }
}
