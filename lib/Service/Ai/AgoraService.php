<?php
// lib/Service/Ai/AgoraService.php
namespace OCA\Agora\Service\Ai;

class AgoraService {
    private $promptRepository;
    private $localAiClient;

    public function __construct(PromptRepository $promptRepository, LocalAiClient $localAiClient) {
        $this->promptRepository = $promptRepository;
        $this->localAiClient = $localAiClient;
    }

    public function getSummarizer(): Summarizer {
        return new Summarizer($this->promptRepository, $this->localAiClient);
    }

    public function getClassifier(): Classifier {
        return new Classifier($this->promptRepository, $this->localAiClient);
    }

    public function getDuplicateDetector(): DuplicateDetector {
        return new DuplicateDetector($this->promptRepository, $this->localAiClient);
    }

    public function getOptionGenerator(): OptionGenerator {
        return new OptionGenerator($this->promptRepository, $this->localAiClient);
    }

    public function getDebateAssistant(): DebateAssistant {
        return new DebateAssistant($this->promptRepository, $this->localAiClient);
    }

    public function getTranslator(): Translator {
        return new Translator($this->promptRepository, $this->localAiClient);
    }
}
