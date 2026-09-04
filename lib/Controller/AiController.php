<?php
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Agora\Controller;

use OCA\Agora\Service\Ai\AgoraService;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\CommentService;
use OCA\Agora\Service\Ai\Document\DocumentParser;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class AiController extends BaseController
{
    private AgoraService $agoraService;
    private DocumentParser $documentParser;
    private InquiryService $inquiryService;
    private OptionService $optionService;
    private CommentService $commentService;
    private LoggerInterface $logger;

    public function __construct(
        string $appName,
        IRequest $request,
        AgoraService $agoraService,
        DocumentParser $documentParser,
        InquiryService $inquiryService,
        OptionService $optionService,
        CommentService $commentService,
        LoggerInterface $logger
    ) {
        parent::__construct($appName, $request);
        $this->agoraService = $agoraService;
        $this->documentParser = $documentParser;
        $this->inquiryService = $inquiryService;
        $this->optionService = $optionService;
        $this->commentService = $commentService;
        $this->logger = $logger;
    }

    // ============ GENERAL AI ============

    /**
     * Enhance or generate content with AI
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/enhance')]
    public function enhanceContent(int $inquiryId, string $prompt): JSONResponse
    {
        try {
            $context = $this->getInquiryContext($inquiryId);
            $enhanced = $this->agoraService->getGeneralAssistant()->enhanceContent($prompt, $context);
		
	    $this->logger->info('AI enhancement request received', [
        'inquiryId' => $inquiryId,
        'prompt' => $prompt,
        'prompt_length' => strlen($prompt),
    ]);


            return $this->response(
                function () use ($enhanced) {
                    return ['enhanced' => $enhanced];
                }
            );
        } catch (\Throwable $e) {
            $this->logger->error('AI enhancement failed', [
                'error' => $e->getMessage(),
                'inquiryId' => $inquiryId
            ]);
            
            // Return a helpful response even on error
            $fallback = $this->getFallbackContent($prompt, $this->getInquiryContext($inquiryId));
            return $this->response(
                function () use ($fallback) {
                    return ['enhanced' => $fallback];
                }
            );
        }
    }
 
    
    // ============ OPTION GENERATION ============

    /**
     * Generate options from inquiry title and description
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/generate-options')]
public function generateOptionsFromInquiry(int $inquiryId, int $count = 4): JSONResponse
{
    // Set a timeout for the AI request
    set_time_limit(60); // 60 seconds
    
    return $this->response(
        function () use ($inquiryId, $count) {
            try {
                $inquiry = $this->getInquiry($inquiryId);
                $context = $this->buildOptionContext($inquiry);
                
                // Log start time
                $start = microtime(true);
                
                $options = $this->agoraService->getOptionGenerator()
                    ->generateOptionsFromContext($context, $count);
                
                // Log duration
                $duration = microtime(true) - $start;
                $this->logger->info('Option generation completed', [
                    'duration' => $duration,
                    'count' => count($options)
                ]);
                
                return ['options' => $options];
            } catch (\Throwable $e) {
                $this->logger->error('Option generation failed', [
                    'error' => $e->getMessage(),
                    'inquiryId' => $inquiryId
                ]);
                return ['options' => [], 'error' => $e->getMessage()];
            }
        }
    );
}

    /**
     * Generate options from uploaded document
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/document-options')]
    public function generateDocumentOptions(
        int $inquiryId,
        string $documentPath,
        string $optionType = 'section',
        array $options = []
    ): JSONResponse {
        return $this->response(
            function () use ($inquiryId, $documentPath, $optionType, $options) {
                try {
                    $result = $this->agoraService->getOptionGenerator()->generateOptionsFromDocument(
                        $documentPath,
                        $optionType,
                        $options
                    );
                    return ['options' => $result];
                } catch (\Throwable $e) {
                    $this->logger->error('Document option generation failed', [
                        'error' => $e->getMessage(),
                        'inquiryId' => $inquiryId
                    ]);
                    return ['options' => [], 'error' => $e->getMessage()];
                }
            }
        );
    }

    /**
     * Generate decision options with pros and cons
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/decision-options')]
    public function generateDecisionOptions(int $inquiryId, array $constraints = []): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId, $constraints) {
                try {
                    $inquiry = $this->getInquiry($inquiryId);
                    $options = $this->agoraService->getOptionGenerator()->generateDecisionOptions(
                        $inquiry['title'] ?? '',
                        $constraints
                    );
                    return ['options' => $options];
                } catch (\Throwable $e) {
                    $this->logger->error('Decision options generation failed', [
                        'error' => $e->getMessage(),
                        'inquiryId' => $inquiryId
                    ]);
                    return ['options' => [], 'error' => $e->getMessage()];
                }
            }
        );
    }

    /**
     * Generate creative ideas
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/creative-ideas')]
    public function generateCreativeIdeas(int $inquiryId, int $count = 5): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId, $count) {
                try {
                    $inquiry = $this->getInquiry($inquiryId);
                    $ideas = $this->agoraService->getOptionGenerator()->generateCreativeIdeas(
                        $inquiry['title'] ?? '',
                        $count
                    );
                    return ['ideas' => $ideas];
                } catch (\Throwable $e) {
                    $this->logger->error('Creative ideas generation failed', [
                        'error' => $e->getMessage(),
                        'inquiryId' => $inquiryId
                    ]);
                    return ['ideas' => [], 'error' => $e->getMessage()];
                }
            }
        );
    }

    // ============ SUMMARIZATION ============

    /**
     * Summarize discussion
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/summarize')]
    public function summarizeInquiry(int $inquiryId, string $format = 'concise'): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId, $format) {
                try {
                    $messages = $this->getMessagesForInquiry($inquiryId);
                    $summary = $this->agoraService->getSummarizer()->summarizeThread($messages, $format);
                    return ['summary' => $summary];
                } catch (\Throwable $e) {
                    $this->logger->error('Summarization failed', [
                        'error' => $e->getMessage(),
                        'inquiryId' => $inquiryId
                    ]);
                    return ['summary' => '', 'error' => $e->getMessage()];
                }
            }
        );
    }

    /**
     * Analyze sentiment
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/sentiment')]
    public function analyzeSentiment(int $inquiryId): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId) {
                try {
                    $text = $this->getDiscussionText($inquiryId);
                    $sentiment = $this->agoraService->getClassifier()->classifySentiment($text);
                    return ['sentiment' => $sentiment];
                } catch (\Throwable $e) {
                    $this->logger->error('Sentiment analysis failed', [
                        'error' => $e->getMessage(),
                        'inquiryId' => $inquiryId
                    ]);
                    return ['sentiment' => null, 'error' => $e->getMessage()];
                }
            }
        );
    }


 // ============ HELPER METHODS ============

    private function getFallbackContent(string $prompt, array $context): string {
        $title = $context['title'] ?? 'the topic';
        $description = $context['description'] ?? '';

        if (!empty($description)) {
            return "Based on the discussion about '{$title}':\n\n" .
                   "Current description: " . substr($description, 0, 150) . "...\n\n" .
                   "Regarding: " . $prompt . "\n\n" .
                   "I suggest building on the existing content and adding more specific details about implementation.";
        }

        return "I'll help with: " . $prompt . "\n\n" .
               "Topic: " . $title . "\n\n" .
               "To develop this, consider:\n" .
               "1. What is the core problem or opportunity?\n" .
               "2. Who are the key stakeholders?\n" .
               "3. What are the desired outcomes?\n" .
               "4. What resources are available?";
    }

    private function getInquiry(int $inquiryId): array
    {
        $inquiry = $this->inquiryService->get($inquiryId);
        
        if (method_exists($inquiry, 'jsonSerialize')) {
            return $inquiry->jsonSerialize();
        }
        
        return [
            'id' => $inquiry->getId(),
            'title' => $inquiry->getTitle(),
            'description' => $inquiry->getDescription(),
            'type' => $inquiry->getType(),
            'family' => $inquiry->getFamily(),
        ];
    }

    private function getInquiryContext(int $inquiryId): array
    {
        $inquiry = $this->getInquiry($inquiryId);
        return [
            'title' => $inquiry['title'] ?? '',
            'description' => $inquiry['description'] ?? '',
            'type' => $inquiry['type'] ?? 'proposal',
        ];
    }

    private function getMessagesForInquiry(int $inquiryId): array
    {
        try {
            $comments = $this->commentService->getCommentsForInquiry($inquiryId);
            return array_map(function($comment) {
                return $comment['message'] ?? '';
            }, $comments);
        } catch (\Throwable $e) {
            return [];
        }
    }

    private function getDiscussionText(int $inquiryId): string
    {
        return implode("\n", $this->getMessagesForInquiry($inquiryId));
    }

}
