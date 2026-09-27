<?php

namespace OCA\Agora\Listener;

use OCA\Agora\Event\InquiryCreatedEvent;
use OCA\Agora\Event\InquiryUpdatedEvent;
use OCA\Agora\Event\SupportAddEvent;
use OCA\Agora\Event\CommentAddEvent;
use OCA\Agora\Event\OptionCreatedEvent;
use OCA\Agora\Service\TrendingService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use Psr\Log\LoggerInterface;

class TrendingScoreListener implements IEventListener
{
    public function __construct(
        private TrendingService $trendingService,
        private LoggerInterface $logger,
    ) {}

    public function handle(Event $event): void
    {
        $inquiryId = null;
        $shouldUpdate = false;
        
        // Handle different event types
        if ($event instanceof InquiryUpdatedEvent || $event instanceof InquiryCreatedEvent) {
            $inquiry = $event->getInquiry();
            $inquiryId = $inquiry->getId();
            $shouldUpdate = $inquiry->getSupportFeature() === 'trending';
        } elseif ($event instanceof SupportAddEvent) {
            $inquiryId = $event->getInquiryId();
            $shouldUpdate = true;
        } elseif ($event instanceof CommentAddEvent) {
            $inquiryId = $event->getInquiryId();
            $shouldUpdate = true;
        } elseif ($event instanceof OptionCreatedEvent) {
            $option = $event->getOption();
            $inquiryId = $option->getInquiryId();
            $shouldUpdate = true;
        }

        if (!$shouldUpdate || $inquiryId === null) {
            return;
        }

        try {
            // Update trending scores for this inquiry
            $this->trendingService->updateTrendingScoresForInquiry($inquiryId);
            $this->logger->debug('Trending scores updated for inquiry', ['inquiryId' => $inquiryId]);
        } catch (\Exception $e) {
            $this->logger->error('Failed to update trending score: ' . $e->getMessage(), [
                'inquiryId' => $inquiryId,
                'exception' => $e
            ]);
        }
    }
}
