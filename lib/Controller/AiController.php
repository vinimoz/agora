<?php
// lib/Controller/AiController.php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\Ai\AgoraService;
use OCA\Agora\Service\Ai\Document\DocumentParser;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class AiController extends BaseController
{
    private AgoraService $agoraService;
    private DocumentParser $documentParser;

    public function __construct(
        string $appName,
        IRequest $request,
        AgoraService $agoraService,
        DocumentParser $documentParser
    ) {
        parent::__construct($appName, $request);
        $this->agoraService = $agoraService;
        $this->documentParser = $documentParser;
    }

    // ============ SUMMARIZER ENDPOINTS ============

    /**
     * Summarize discussion thread
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $format Summary format (concise, detailed, bullet_points)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/summarize')]
    public function summarizeInquiry(int $inquiryId, string $format = 'concise'): JSONResponse
    {
        return $this->response(
            fn () => [
                'summary' => $this->agoraService->getSummarizer()->summarizeThread(
                    $this->getMessagesForInquiry($inquiryId),
                    $format
                )
            ]
        );
    }

    /**
     * Generate key points from discussion
     * 
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/key-points')]
    public function getKeyPoints(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'key_points' => $this->agoraService->getSummarizer()->summarizeKeyPoints(
                    $this->getMessagesForInquiry($inquiryId)
                )
            ]
        );
    }

    /**
     * Generate TL;DR for discussion
     * 
     * @param int $inquiryId Inquiry ID
     * @param int $maxLength Maximum length of TL;DR
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/tldr')]
    public function getTldr(int $inquiryId, int $maxLength = 100): JSONResponse
    {
        return $this->response(
            fn () => [
                'tldr' => $this->agoraService->getSummarizer()->generateTldr(
                    $this->getMessagesForInquiry($inquiryId),
                    $maxLength
                )
            ]
        );
    }

    // ============ CLASSIFIER ENDPOINTS ============

    /**
     * Classify sentiment of a message or discussion
     * 
     * @param int $inquiryId Inquiry ID
     * @param int|null $commentId Specific comment ID (optional)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/sentiment')]
    public function analyzeSentiment(int $inquiryId, ?int $commentId = null): JSONResponse
    {
        $text = $commentId 
            ? $this->getCommentText($commentId)
            : $this->getDiscussionText($inquiryId);

        return $this->response(
            fn () => [
                'sentiment' => $this->agoraService->getClassifier()->classifySentiment($text)
            ]
        );
    }

    /**
     * Classify topic of discussion
     * 
     * @param int $inquiryId Inquiry ID
     * @param array $categories List of categories to classify into
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/topic')]
    public function classifyTopic(int $inquiryId, array $categories = []): JSONResponse
    {
        return $this->response(
            fn () => [
                'topic' => $this->agoraService->getClassifier()->classifyTopic(
                    $this->getDiscussionText($inquiryId),
                    $categories
                )
            ]
        );
    }

    /**
     * Detect urgency of discussion
     * 
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/urgency')]
    public function detectUrgency(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'urgency' => $this->agoraService->getClassifier()->classifyUrgency(
                    $this->getDiscussionText($inquiryId)
                )
            ]
        );
    }

    /**
     * Extract action items from discussion
     * 
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/actions')]
    public function extractActions(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'actions' => $this->agoraService->getClassifier()->detectActionItems(
                    $this->getDiscussionText($inquiryId)
                )
            ]
        );
    }

    // ============ DUPLICATE DETECTOR ENDPOINTS ============

    /**
     * Check if content is duplicate
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $content Content to check
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/duplicate-check')]
    public function checkDuplicate(int $inquiryId, string $content): JSONResponse
    {
        $existingContent = $this->getExistingContent($inquiryId);

        return $this->response(
            fn () => [
                'is_duplicate' => $this->agoraService->getDuplicateDetector()->isDuplicate(
                    $content,
                    $existingContent
                )
            ]
        );
    }

    /**
     * Find similar content
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $content Content to find similar
     * @param int $limit Maximum results
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/similar')]
    public function findSimilar(int $inquiryId, string $content, int $limit = 10): JSONResponse
    {
        $corpus = $this->getExistingContent($inquiryId);

        return $this->response(
            fn () => [
                'similar' => array_slice(
                    $this->agoraService->getDuplicateDetector()->findSimilarContent($content, $corpus),
                    0,
                    $limit
                )
            ]
        );
    }

    // ============ OPTION GENERATOR ENDPOINTS ============

    /**
     * Generate  options from discussion
     * 
     * @param int $inquiryId Inquiry ID
     * @param int $count Number of options to generate
     * @param int|null $optionId Base option ID (optional)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/options')]
    public function generateOptions(int $inquiryId, int $count = 4, ?int $optionId = null): JSONResponse
    {
        $topic = $optionId 
            ? $this->getOptionText($optionId)
            : $this->getDiscussionTitle($inquiryId);

        return $this->response(
            fn () => [
                'options' => $this->agoraService->getOptionGenerator()->generateOptions($topic, $count)
            ]
        );
    }

    /**
     * Generate decision options for problem
     * 
     * @param int $inquiryId Inquiry ID
     * @param array $constraints Decision constraints
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/decision-options')]
    public function generateDecisionOptions(int $inquiryId, array $constraints = []): JSONResponse
    {
        $problem = $this->getDiscussionTitle($inquiryId);

        return $this->response(
            fn () => [
                'options' => $this->agoraService->getOptionGenerator()->generateDecisionOptions(
                    $problem,
                    $constraints
                )
            ]
        );
    }

    /**
     * Generate creative ideas
     * 
     * @param int $inquiryId Inquiry ID
     * @param int $count Number of ideas to generate
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/creative-ideas')]
    public function generateCreativeIdeas(int $inquiryId, int $count = 5): JSONResponse
    {
        $topic = $this->getDiscussionTitle($inquiryId);

        return $this->response(
            fn () => [
                'ideas' => $this->agoraService->getOptionGenerator()->generateCreativeIdeas($topic, $count)
            ]
        );
    }

    /**
     * Generate options from uploaded document
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $documentPath Path to uploaded document
     * @param string $optionType Type of options to generate (chapter, section, subsection, paragraph, custom)
     * @param array $options Additional options
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
            fn () => [
                'options' => $this->agoraService->getOptionGenerator()->generateOptionsFromDocument(
                    $documentPath,
                    $optionType,
                    $options
                )
            ]
        );
    }

    // ============ DEBATE ASSISTANT ENDPOINTS ============

    /**
     * Generate arguments for a position
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $position Position to argue for (pro/against)
     * @param int $count Number of arguments
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/arguments')]
    public function generateArguments(int $inquiryId, string $position, int $count = 3): JSONResponse
    {
        $topic = $this->getDiscussionTitle($inquiryId);

        return $this->response(
            fn () => [
                'arguments' => $this->agoraService->getDebateAssistant()->generateArguments(
                    $topic,
                    $position,
                    $count
                )
            ]
        );
    }

    /**
     * Generate counter-arguments
     * 
     * @param int $inquiryId Inquiry ID
     * @param array $arguments Arguments to counter
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/counter-arguments')]
    public function generateCounterArguments(int $inquiryId, array $arguments): JSONResponse
    {
        $topic = $this->getDiscussionTitle($inquiryId);

        return $this->response(
            fn () => [
                'counter_arguments' => $this->agoraService->getDebateAssistant()->generateCounterArguments(
                    $topic,
                    $arguments
                )
            ]
        );
    }

    /**
     * Analyze debate structure
     * 
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/debate-analysis')]
    public function analyzeDebate(int $inquiryId): JSONResponse
    {
        $messages = $this->getMessagesForInquiry($inquiryId);

        return $this->response(
            fn () => [
                'analysis' => $this->agoraService->getDebateAssistant()->analyzeDebate($messages)
            ]
        );
    }

    /**
     * Generate debate summary
     * 
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/debate-summary')]
    public function generateDebateSummary(int $inquiryId): JSONResponse
    {
        $messages = $this->getMessagesForInquiry($inquiryId);

        return $this->response(
            fn () => [
                'summary' => $this->agoraService->getDebateAssistant()->generateDebateSummary($messages)
            ]
        );
    }

    /**
     * Suggest compromise position
     * 
     * @param int $inquiryId Inquiry ID
     * @param array $positions Different positions to compromise
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/compromise')]
    public function suggestCompromise(int $inquiryId, array $positions): JSONResponse
    {
        $topic = $this->getDiscussionTitle($inquiryId);

        return $this->response(
            fn () => [
                'compromise' => $this->agoraService->getDebateAssistant()->suggestCompromise(
                    $topic,
                    $positions
                )
            ]
        );
    }

    /**
     * Generate rebuttal to a point
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $point Point to rebut
     * @param array $context Additional context
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/rebuttal')]
    public function generateRebuttal(int $inquiryId, string $point, array $context = []): JSONResponse
    {
        return $this->response(
            fn () => [
                'rebuttal' => $this->agoraService->getDebateAssistant()->generateRebuttal($point, $context)
            ]
        );
    }

    // ============ TRANSLATOR ENDPOINTS ============

    /**
     * Translate content
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $targetLanguage Target language code
     * @param string $sourceLanguage Source language code (auto if not specified)
     * @param int|null $commentId Specific comment ID (optional)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/translate')]
    public function translateContent(
        int $inquiryId,
        string $targetLanguage,
        string $sourceLanguage = 'auto',
        ?int $commentId = null
    ): JSONResponse {
        $content = $commentId 
            ? $this->getCommentText($commentId)
            : $this->getDiscussionText($inquiryId);

        return $this->response(
            fn () => [
                'translated' => $this->agoraService->getTranslator()->translate(
                    $content,
                    $targetLanguage,
                    $sourceLanguage
                ),
                'detected_language' => $sourceLanguage === 'auto' 
                    ? $this->agoraService->getTranslator()->detectLanguage($content)
                    : $sourceLanguage
            ]
        );
    }

    /**
     * Translate discussion to multiple languages
     * 
     * @param int $inquiryId Inquiry ID
     * @param array $targetLanguages Array of language codes
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/translate-multilingual')]
    public function translateMultilingual(int $inquiryId, array $targetLanguages): JSONResponse
    {
        $content = $this->getDiscussionText($inquiryId);
        $translator = $this->agoraService->getTranslator();

        $translations = [];
        foreach ($targetLanguages as $language) {
            $translations[$language] = $translator->translate($content, $language);
        }

        return $this->response(
            fn () => [
                'translations' => $translations,
                'original_language' => $translator->detectLanguage($content)
            ]
        );
    }

    /**
     * Translate all comments in a discussion
     * 
     * @param int $inquiryId Inquiry ID
     * @param string $targetLanguage Target language code
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/ai/inquiry/{inquiryId}/translate-all')]
    public function translateAllComments(int $inquiryId, string $targetLanguage): JSONResponse
    {
        $messages = $this->getMessagesForInquiry($inquiryId);
        $translator = $this->agoraService->getTranslator();

        return $this->response(
            fn () => [
                'translations' => $translator->translateBatch($messages, $targetLanguage)
            ]
        );
    }

    // ============ HELPER METHODS ============

    /**
     * Get messages for an inquiry
     * This should be implemented to fetch actual messages from your CommentService
     */
    private function getMessagesForInquiry(int $inquiryId): array
    {
        // Get comments from CommentService
        $comments = $this->commentService->list($inquiryId);
        return array_map(function($comment) {
            return $comment['message'] ?? '';
        }, $comments);
    }

    /**
     * Get discussion text
     */
    private function getDiscussionText(int $inquiryId): string
    {
        return implode("\n", $this->getMessagesForInquiry($inquiryId));
    }

    /**
     * Get discussion title
     */
    private function getDiscussionTitle(int $inquiryId): string
    {
        // This should fetch the inquiry title from your InquiryService
        // For now, return a placeholder
        return "Discussion #{$inquiryId}";
    }

    /**
     * Get comment text
     */
    private function getCommentText(int $commentId): string
    {
        // This should fetch the comment from your CommentService
        // For now, return a placeholder
        return "Comment #{$commentId}";
    }

    /**
     * Get option text
     */
    private function getOptionText(int $optionId): string
    {
        // This should fetch the option from your OptionService
        // For now, return a placeholder
        return "Option #{$optionId}";
    }

    /**
     * Get existing content for duplicate detection
     */
    private function getExistingContent(int $inquiryId): array
    {
        $comments = $this->commentService->list($inquiryId);
        $content = [];
        foreach ($comments as $comment) {
            if (!empty($comment['message'])) {
                $content[] = $comment['message'];
            }
        }
        return $content;
    }
}
