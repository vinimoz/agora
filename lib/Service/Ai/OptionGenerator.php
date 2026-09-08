<?php

namespace OCA\Agora\Service\Ai;

use OCA\Agora\Service\AIService;

class OptionGenerator {
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
     * Generate options from inquiry context (title + description)
     */
    /**
     * Generate options from inquiry context (title + description)
     */
    public function generateOptionsFromContext(array $context, int $count = 4): array
    {
        try {
            // Build a more specific prompt
            $prompt = $this->buildPrompt($context, $count);

            // Log the prompt
            error_log('AI Prompt: ' . $prompt);

            // Use AIService's enhanceText method
            $response = $this->aiService->enhanceText($prompt);

            // Log the response
            error_log('AI Response: ' . substr($response, 0, 500));

            // If empty response, use fallback
            if (empty($response)) {
                error_log('AI returned empty response, using fallback');
                return $this->getFallbackOptions($context, $count);
            }

            // Try to parse JSON response first
            $options = $this->parseJsonResponse($response);

            // If JSON parsing failed, try text parsing
            if (empty($options)) {
                $options = $this->parseTextOptions($response);
            }

            // Ensure we return at least something
            if (empty($options)) {
                error_log('No options parsed from AI response, using fallback');
                return $this->getFallbackOptions($context, $count);
            }

            // Limit to requested count
            return array_slice($options, 0, $count);

        } catch (\Throwable $e) {
            error_log('Error generating options: ' . $e->getMessage());
            error_log('Stack trace: ' . $e->getTraceAsString());
            return $this->getFallbackOptions($context, $count);
        }
    }
  private function buildPrompt(array $context, int $count): string
    {
        $title = $context['title'] ?? 'the topic';
        $description = $context['description'] ?? '';
        
        return "Generate $count specific, actionable options for: $title\n\n" .
               "Context: $description\n\n" .
               "Please provide the response as a JSON array of objects, each with these fields:\n" .
               "- title: A short, descriptive title for the option\n" .
               "- text: A detailed description of the option\n" .
               "- description: A brief summary (optional)\n" .
               "- pros: Array of advantages (optional)\n" .
               "- cons: Array of disadvantages (optional)\n" .
               "- tags: Array of relevant keywords (optional)\n\n" .
               "Return ONLY the JSON array, no other text.";
    }

    private function parseJsonResponse(string $response): array
    {
        // Try to extract JSON from the response
        $json = $response;
        
        // If response contains markdown code blocks, extract the JSON
        if (preg_match('/```(?:json)?\s*([\s\S]*?)\s*```/', $response, $matches)) {
            $json = trim($matches[1]);
        }
        
        // Try to parse as JSON
        $decoded = json_decode($json, true);
        
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            return array_map(function($item) {
                return [
                    'title' => $item['title'] ?? $item['text'] ?? '',
                    'text' => $item['text'] ?? $item['description'] ?? '',
                    'description' => $item['description'] ?? '',
                    'pros' => $item['pros'] ?? [],
                    'cons' => $item['cons'] ?? [],
                    'tags' => $item['tags'] ?? []
                ];
            }, $decoded);
        }
        
        return [];
    }

    private function parseTextOptions(string $response): array
    {
        $options = [];
        $lines = explode("\n", $response);
        $currentOption = null;
        $currentText = '';
        
        foreach ($lines as $line) {
            $line = trim($line);
            
            // Check for numbered options (1., 2., etc.)
            if (preg_match('/^(\d+)[\.\)]\s*(.+)/', $line, $matches)) {
                if ($currentOption !== null) {
                    $options[] = [
                        'title' => $currentOption,
                        'text' => $currentText,
                        'description' => $currentText,
                        'pros' => [],
                        'cons' => [],
                        'tags' => []
                    ];
                }
                $currentOption = trim($matches[2]);
                $currentText = $currentOption;
            } 
            // Check for bullet points
            elseif (preg_match('/^[-*•]\s*(.+)/', $line, $matches)) {
                if ($currentOption !== null) {
                    $currentText .= ' ' . trim($matches[1]);
                }
            } 
            // Continue line
            elseif ($line && $currentOption !== null) {
                $currentText .= ' ' . $line;
            }
        }
        
        // Add the last option
        if ($currentOption !== null) {
            $options[] = [
                'title' => $currentOption,
                'text' => $currentText,
                'description' => $currentText,
                'pros' => [],
                'cons' => [],
                'tags' => []
            ];
        }
        
        return $options;
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
