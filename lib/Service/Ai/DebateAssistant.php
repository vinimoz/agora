<?php
namespace OCA\Agora\Service\Ai;

class DebateAssistant {
    private $promptRepository;
    private $aiClient;

    public function __construct(PromptRepository $promptRepository, $aiClient) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
    }

    /**
     * Generate arguments for a position
     */
    public function generateArguments(string $topic, string $position, int $count = 3): array {
        $prompt = $this->promptRepository->getPrompt('debate_arguments', [
            'topic' => $topic,
            'position' => $position,
            'count' => $count
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseArguments($response);
    }

    /**
     * Generate counter-arguments
     */
    public function generateCounterArguments(string $topic, array $arguments): array {
        $prompt = $this->promptRepository->getPrompt('counter_arguments', [
            'topic' => $topic,
            'arguments' => json_encode($arguments)
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseCounterArguments($response);
    }

    /**
     * Analyze debate structure
     */
    public function analyzeDebate(array $messages): array {
        $prompt = $this->promptRepository->getPrompt('debate_analysis', [
            'messages' => json_encode($messages)
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? [];
    }

    /**
     * Generate debate summary
     */
    public function generateDebateSummary(array $messages): string {
        $prompt = $this->promptRepository->getPrompt('debate_summary', [
            'messages' => json_encode($messages)
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Suggest compromise position
     */
    public function suggestCompromise(string $topic, array $positions): array {
        $prompt = $this->promptRepository->getPrompt('compromise', [
            'topic' => $topic,
            'positions' => json_encode($positions)
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? [];
    }

    /**
     * Generate rebuttal to specific point
     */
    public function generateRebuttal(string $point, array $context = []): string {
        $prompt = $this->promptRepository->getPrompt('rebuttal', [
            'point' => $point,
            'context' => json_encode($context)
        ]);

        return $this->aiClient->complete($prompt);
    }

    private function parseArguments(string $response): array {
        $arguments = [];
        $current = ['point' => '', 'evidence' => []];
        $lines = explode("\n", $response);
        
        foreach ($lines as $line) {
            if (preg_match('/^(?:Argument|Point)\s*\d+[:.]\s*(.+)/i', trim($line), $matches)) {
                if (!empty($current['point'])) {
                    $arguments[] = $current;
                }
                $current = ['point' => trim($matches[1]), 'evidence' => []];
            } elseif (preg_match('/^[-*•]\s*(.+)/', trim($line), $matches) && !empty($current['point'])) {
                $current['evidence'][] = trim($matches[1]);
            }
        }
        
        if (!empty($current['point'])) {
            $arguments[] = $current;
        }
        
        return $arguments;
    }

    private function parseCounterArguments(string $response): array {
        return json_decode($response, true) ?? [];
    }
}
