<?php
// lib/Service/Ai/OptionGenerator.php

namespace OCA\Agora\Service\Ai;

class OptionGenerator {
    private $promptRepository;
    private $aiClient;

    public function __construct(
        PromptRepository $promptRepository, 
        $aiClient
    ) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
    }

    /**
     * Generate options from inquiry context (title + description)
     */
    public function generateOptionsFromContext(array $context, int $count = 4): array
    {
        $prompt = $this->promptRepository->getPrompt('options_from_context', [
            'title' => $context['title'] ?? '',
            'description' => $context['description'] ?? '',
            'type' => $context['type'] ?? 'proposal',
            'count' => $count
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseOptions($response);
    }

    /**
     * Generate decision options with pros and cons
     */
    public function generateDecisionOptions(string $problem, array $constraints = []): array
    {
        $prompt = $this->promptRepository->getPrompt('decision_options', [
            'problem' => $problem,
            'constraints' => json_encode($constraints)
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? [];
    }

    /**
     * Generate creative ideas
     */
    public function generateCreativeIdeas(string $topic, int $count = 5): array
    {
        $prompt = $this->promptRepository->getPrompt('creative_ideas', [
            'topic' => $topic,
            'count' => $count
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseIdeas($response);
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
}
