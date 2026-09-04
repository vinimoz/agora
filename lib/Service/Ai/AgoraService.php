<?php

namespace OCA\Agora\Service\Ai;

use OCA\Agora\Service\AIService;
use OCA\Agora\Service\Ai\Document\DocumentParser;
use OCA\Agora\Service\Ai\GeneralAssistant;

class AgoraService {
    private $promptRepository;
    private $aiService;
    private $documentParser;
    private $structureAnalyzer;

    public function __construct(
        PromptRepository $promptRepository,
        AIService $aiService,
        DocumentParser $documentParser = null,
        $structureAnalyzer = null
    ) {
        $this->promptRepository = $promptRepository;
        $this->aiService = $aiService;
        $this->documentParser = $documentParser;
        $this->structureAnalyzer = $structureAnalyzer;
    }

    public function getGeneralAssistant(): GeneralAssistant {
        return new GeneralAssistant(
            $this->promptRepository,
            $this->aiService
        );
    }

    public function getSummarizer(): Summarizer {
        return new Summarizer($this->promptRepository);
    }

    public function getClassifier(): Classifier {
        return new Classifier($this->promptRepository);
    }

    public function getDuplicateDetector(): DuplicateDetector {
        return new DuplicateDetector($this->promptRepository);
    }

    public function getOptionGenerator(): OptionGenerator {
        return new OptionGenerator(
            $this->promptRepository,
            $this->aiService  // FIXED: Pass the actual AIService
        );
    }

    public function getDebateAssistant(): DebateAssistant {
        return new DebateAssistant($this->promptRepository);
    }

    public function getTranslator(): Translator {
        return new Translator($this->promptRepository);
    }
}
