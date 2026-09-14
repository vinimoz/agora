<?php
namespace OCA\Agora\Service\Ai;

class Translator {
    private $promptRepository;
    private $aiClient;
    private $supportedLanguages = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'ru', 'zh', 'ja'];

    public function __construct(PromptRepository $promptRepository, $aiClient) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
    }

    /**
     * Translate content to target language
     */
    public function translate(string $content, string $targetLanguage, string $sourceLanguage = 'auto'): string {
        $this->validateLanguage($targetLanguage);
        
        $prompt = $this->promptRepository->getPrompt('translate', [
            'content' => $content,
            'source_language' => $sourceLanguage,
            'target_language' => $targetLanguage
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Detect content language
     */
    public function detectLanguage(string $content): string {
        $prompt = $this->promptRepository->getPrompt('language_detection', [
            'content' => $content
        ]);

        return trim($this->aiClient->complete($prompt));
    }

    /**
     * Translate multiple messages
     */
    public function translateBatch(array $messages, string $targetLanguage): array {
        $translated = [];
        foreach ($messages as $key => $message) {
            $translated[$key] = $this->translate($message, $targetLanguage);
        }
        return $translated;
    }

    /**
     * Get translation with context awareness
     */
    public function translateWithContext(string $content, string $targetLanguage, array $context = []): string {
        $prompt = $this->promptRepository->getPrompt('translate_context', [
            'content' => $content,
            'target_language' => $targetLanguage,
            'context' => json_encode($context)
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Generate multilingual summary
     */
    public function generateMultilingualSummary(array $messages, array $languages): array {
        $summaries = [];
        $baseSummary = $this->generateBaseSummary($messages);
        
        foreach ($languages as $language) {
            $summaries[$language] = $this->translate($baseSummary, $language);
        }
        
        return $summaries;
    }

    private function generateBaseSummary(array $messages): string {
        $prompt = $this->promptRepository->getPrompt('summary_concise', [
            'messages' => json_encode($messages)
        ]);
        
        return $this->aiClient->complete($prompt);
    }

    private function validateLanguage(string $language): void {
        if (!in_array($language, $this->supportedLanguages)) {
            throw new \InvalidArgumentException("Unsupported language: {$language}");
        }
    }

    public function getSupportedLanguages(): array {
        return $this->supportedLanguages;
    }

    public function addSupportedLanguage(string $language): void {
        if (!in_array($language, $this->supportedLanguages)) {
            $this->supportedLanguages[] = $language;
        }
    }
}
