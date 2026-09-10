<?php

namespace OCA\Agora\Command\Trending;

use OCA\Agora\Service\TrendingService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;


class UpdateScores extends Command
{
    public function __construct(
        private TrendingService $trendingService,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('agora:trending:update')
            ->setDescription('Update trending scores for all active inquiries');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Updating trending scores...');
        
        try {
            $updated = $this->trendingService->updateAllTrendingScores();
            $output->writeln(sprintf('Updated scores for %d inquiries.', $updated));
            return 0;
        } catch (\Exception $e) {
            $output->writeln('<error>Error: ' . $e->getMessage() . '</error>');
            return 1;
        }
    }
}
