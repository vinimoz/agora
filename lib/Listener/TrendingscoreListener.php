<?php
// lib/Listener/TrendingScoreListener.php

namespace OCA\Agora\Listener;

use OCA\Agora\Event\InquiryCreatedEvent;
use OCA\Agora\Event\InquiryUpdatedEvent;
use OCA\Agora\Service\TrendingService;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

class TrendingScoreListener implements IEventListener
{
    public function __construct(
        private TrendingService $trendingService,
        private LoggerInterface $logger,
    ) {}

    public function handle(Event $event): void
    {
        if ($event instanceof InquiryUpdatedEvent || $event instanceof InquiryCreatedEvent) {
            $inquiry = $event->getInquiry();
            
            // Only update if trending feature is enabled
            if ($inquiry->getSupportFeature() === 'trending') {
                try {
                    // Queue update or calculate
                    $this->trendingService->calculateAndStoreTrendingScores($inquiry->getId());
                } catch (\Exception $e) {
                    $this->logger->error('Failed to update trending score: ' . $e->getMessage());
                }
            }
        }
    }
}
