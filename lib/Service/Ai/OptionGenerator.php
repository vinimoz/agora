<?php

namespace OCA\Agora\Service\Ai;

use OCA\Agora\Service\AIService;

class OptionGenerator {
    private $promptRepository;
    private $aiService;  // Changed from $aiClient to $aiService

    public function __construct(
        PromptRepository $promptRepository, 
        AIService $aiService  // Type hint with AIService
    ) {
        $this->promptRepository = $promptRepository;
        $this->aiService = $aiService;
    }

    /**
     * Generate options from inquiry context (title + description)
     */
    public function generateOptionsFromContext(array $context, int $count = 4): array
    {
        try {
            $prompt = $this->promptRepository->getPrompt('options_from_context', [
                'title' => $context['title'] ?? '',
                'description' => $context['description'] ?? '',
                'type' => $context['type'] ?? 'proposal',
                'count' => $count
            ]);

            // Use AIService's enhanceText method
            $response = $this->aiService->enhanceText($prompt);
            
            // If empty response, use fallback
            if (empty($response)) {
                return $this->getFallbackOptions($context, $count);
            }
            
            $options = $this->parseOptions($response);
            
            // Ensure we return at least something
            if (empty($options)) {
                return $this->getFallbackOptions($context, $count);
            }
            
            return array_slice($options, 0, $count);
            
        } catch (\Throwable $e) {
            // Log the error
            error_log('Error generating options: ' . $e->getMessage());
            return $this->getFallbackOptions($context, $count);
        }
    }

    /**
     * Generate decision options with pros and cons
     */
    public function generateDecisionOptions(string $problem, array $constraints = []): array
    {
        try {
            $prompt = $this->promptRepository->getPrompt('decision_options', [
                'problem' => $problem,
                'constraints' => json_encode($constraints)
            ]);

            $response = $this->aiService->enhanceText($prompt);
            
            if (empty($response)) {
                return $this->getFallbackDecisionOptions($problem);
            }
            
            $result = json_decode($response, true);
            return is_array($result) ? $result : $this->getFallbackDecisionOptions($problem);
            
        } catch (\Throwable $e) {
            error_log('Error generating decision options: ' . $e->getMessage());
            return $this->getFallbackDecisionOptions($problem);
        }
    }

    /**
     * Generate creative ideas
     */
    public function generateCreativeIdeas(string $topic, int $count = 5): array
    {
        try {
            $prompt = $this->promptRepository->getPrompt('creative_ideas', [
                'topic' => $topic,
                'count' => $count
            ]);

            $response = $this->aiService->enhanceText($prompt);
            
            if (empty($response)) {
                return $this->getFallbackIdeas($topic, $count);
            }
            
            $ideas = $this->parseIdeas($response);
            
            if (empty($ideas)) {
                return $this->getFallbackIdeas($topic, $count);
            }
            
            return array_slice($ideas, 0, $count);
            
        } catch (\Throwable $e) {
            error_log('Error generating creative ideas: ' . $e->getMessage());
            return $this->getFallbackIdeas($topic, $count);
        }
    }

    /**
     * Generate options from document (placeholder for future implementation)
     */
    public function generateOptionsFromDocument(
        string $documentPath, 
        string $optionType = 'chapter', 
        array $options = []
    ): array {
        // For now, return empty array or use a simple prompt
        // This will be implemented when document parsing is fully set up
        return [
            [
                'id' => 'doc1',
                'type' => 'document',
                'title' => 'Document option',
                'content' => 'Document parsing not fully implemented yet.',
                'summary' => 'Coming soon...',
                'metadata' => ['document' => $documentPath]
            ]
        ];
    }

    // ============ PARSING METHODS ============

    private function parseOptions(string $response): array
    {
        $options = [];
        $lines = explode("\n", $response);
        $currentOption = null;

        foreach ($lines as $line) {
            $line = trim($line);
            if (preg_match('/^[0-9]+[\.\)]\s*(.+)/', $line, $matches)) {
                if ($currentOption) {
                    $options[] = $currentOption;
                }
                $currentOption = trim($matches[1]);
            } elseif ($currentOption && preg_match('/^[-*•]\s*(.+)/', $line, $matches)) {
                $currentOption .= ' - ' . trim($matches[1]);
            } elseif ($line && $currentOption) {
                $currentOption .= ' ' . $line;
            }
        }

        if ($currentOption) {
            $options[] = $currentOption;
        }

        return $options;
    }

    private function parseIdeas(string $response): array
    {
        $ideas = [];
        $lines = explode("\n", $response);
        foreach ($lines as $line) {
            if (preg_match('/^[-*•]\s*(.+)/', trim($line), $matches)) {
                $ideas[] = trim($matches[1]);
            }
        }
        return $ideas;
    }

    // ============ FALLBACK METHODS ============

    private function getFallbackOptions(array $context, int $count): array
    {
        $title = $context['title'] ?? 'the topic';
        $options = [];
        
        $suggestions = [
            "Develop a comprehensive plan for '$title'",
            "Research best practices for '$title'",
            "Engage stakeholders in discussions about '$title'",
            "Create a roadmap for implementing '$title'",
            "Analyze the costs and benefits of '$title'",
            "Develop metrics to measure success for '$title'",
            "Create a timeline for '$title' implementation",
            "Identify key challenges and solutions for '$title'"
        ];
        
        return array_slice($suggestions, 0, $count);
    }

    private function getFallbackDecisionOptions(string $problem): array
    {
        return [
            [
                'option' => 'Option A: Full implementation',
                'pros' => ['Maximum impact', 'Long-term benefits'],
                'cons' => ['Higher cost', 'More resources needed']
            ],
            [
                'option' => 'Option B: Phased approach',
                'pros' => ['Manageable risk', 'Can adjust based on feedback'],
                'cons' => ['Takes longer', 'May lose momentum']
            ],
            [
                'option' => 'Option C: Pilot program',
                'pros' => ['Low risk', 'Test before full commitment'],
                'cons' => ['Limited impact', 'May not scale well']
            ]
        ];
    }

    private function getFallbackIdeas(string $topic, int $count): array
    {
        $ideas = [
            "Innovative approach to '$topic'",
            "Community-driven solution for '$topic'",
            "Technology-enabled transformation of '$topic'",
            "Sustainable model for '$topic'",
            "Collaborative framework for '$topic'",
            "Data-driven strategy for '$topic'",
            "User-centered design for '$topic'",
            "Scalable solution for '$topic'"
        ];
        return array_slice($ideas, 0, $count);
    }
}
