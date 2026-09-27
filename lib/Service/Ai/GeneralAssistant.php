<?php
// lib/Service/Ai/GeneralAssistant.php

namespace OCA\Agora\Service\Ai;

use OCA\Agora\Service\AIService;

class GeneralAssistant {
    private $promptRepository;
    private $aiService;

    public function __construct(
        PromptRepository $promptRepository,
        AIService $aiService
    ) {
        $this->promptRepository = $promptRepository;
        $this->aiService = $aiService;
    }

    /**
     * Enhance or generate content based on context and prompt
     */
    public function enhanceContent(string $prompt, array $context): string {
        // Use the AI service (synchronous)
        if ($this->aiService->isAvailable()) {
            try {
                $result = $this->aiService->generateWithContext($prompt, $context);
                if (!empty($result)) {
                    return $result;
                }
            } catch (\Throwable $e) {
                $this->aiService->logger->warning('AI service failed, using fallback', [
                    'error' => $e->getMessage()
                ]);
            }
        }

        // Fallback response
        return $this->generateFallback($prompt, $context);
    }

    /**
     * Generate a fallback response
     */
    private function generateFallback(string $prompt, array $context): string {
        $title = $context['title'] ?? 'the topic';
        $description = $context['description'] ?? '';

        if (!empty($description)) {
            return "Based on the discussion about '{$title}':\n\n" .
                   "Current description: " . substr($description, 0, 150) . "...\n\n" .
                   "Regarding: " . $prompt . "\n\n" .
                   "I suggest building on the existing content and adding more specific details about implementation.\n\n" .
                   "Key areas to address:\n" .
                   "1. Clarify the main objectives\n" .
                   "2. Consider different stakeholder perspectives\n" .
                   "3. Define success criteria\n" .
                   "4. Outline next steps and timelines";
        }

        return "I'll help with: " . $prompt . "\n\n" .
               "Topic: " . $title . "\n\n" .
               "To develop this, consider:\n" .
               "1. What is the core problem or opportunity?\n" .
               "2. Who are the key stakeholders?\n" .
               "3. What are the desired outcomes?\n" .
               "4. What resources are available?\n" .
               "5. What are the potential risks and mitigations?";
    }
}
