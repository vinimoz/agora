<?php
namespace OCA\Agora\Service\Ai;

class Summarizer {
    private $promptRepository;
    private $aiClient;

    public function __construct(PromptRepository $promptRepository, $aiClient) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
    }

    /**
     * Generate summary for discussion thread
     */
    public function summarizeThread(array $messages, string $format = 'concise'): string {
        $prompt = $this->promptRepository->getPrompt('summarize', [
            'messages' => json_encode($messages),
            'format' => $format
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Generate bullet-point summary
     */
    public function summarizeKeyPoints(array $messages): array {
        $prompt = $this->promptRepository->getPrompt('summary_key_points', [
            'messages' => json_encode($messages)
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseBulletPoints($response);
    }

    /**
     * Generate TL;DR for long discussions
     */
    public function generateTldr(array $messages, int $maxLength = 100): string {
        $prompt = $this->promptRepository->getPrompt('tldr', [
            'messages' => json_encode($messages),
            'max_length' => $maxLength
        ]);

        return $this->aiClient->complete($prompt);
    }

    private function parseBulletPoints(string $text): array {
        $points = [];
        $lines = explode("\n", $text);
        foreach ($lines as $line) {
            if (preg_match('/^[-*•]\s*(.+)/', trim($line), $matches)) {
                $points[] = $matches[1];
            }
        }
        return $points;
    }
}
