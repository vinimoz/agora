<?php
namespace OCA\Agora\Service\Ai;

class Classifier {
    private $promptRepository;
    private $aiClient;

    public function __construct(PromptRepository $promptRepository, $aiClient) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
    }

    /**
     * Classify discussion sentiment
     */
    public function classifySentiment(string $text): array {
        $prompt = $this->promptRepository->getPrompt('sentiment', [
            'text' => $text
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseSentiment($response);
    }

    /**
     * Classify topic/category
     */
    public function classifyTopic(string $text, array $categories): string {
        $prompt = $this->promptRepository->getPrompt('topic_classification', [
            'text' => $text,
            'categories' => json_encode($categories)
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Detect urgency level
     */
    public function classifyUrgency(string $text): string {
        $prompt = $this->promptRepository->getPrompt('urgency', [
            'text' => $text
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Detect if content contains actionable items
     */
    public function detectActionItems(string $text): array {
        $prompt = $this->promptRepository->getPrompt('action_items', [
            'text' => $text
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseActionItems($response);
    }

    private function parseSentiment(string $response): array {
        // Expected JSON: {"sentiment": "positive|neutral|negative", "score": 0.8, "confidence": 0.9}
        return json_decode($response, true) ?? [
            'sentiment' => 'neutral',
            'score' => 0.5,
            'confidence' => 0.0
        ];
    }

    private function parseActionItems(string $response): array {
        $items = [];
        $lines = explode("\n", $response);
        foreach ($lines as $line) {
            if (preg_match('/^-?\s*(.+)/', trim($line), $matches)) {
                $items[] = $matches[1];
            }
        }
        return $items;
    }
}
