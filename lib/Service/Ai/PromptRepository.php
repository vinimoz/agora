<?php
namespace OCA\Agora\Service\Ai;

class PromptRepository {
    private $prompts = [];

    public function __construct() {
        $this->initializePrompts();
    }

    private function initializePrompts(): void {
        $this->prompts = [
            // Summarizer prompts
            'summarize' => [
                'template' => "Summarize the following discussion messages in a {format} format.\n\nMessages:\n{messages}",
                'format' => 'concise'
            ],
            'summary_key_points' => [
                'template' => "Extract key points from these messages and format them as bullet points:\n\n{messages}"
            ],
            'tldr' => [
                'template' => "Provide a TL;DR (max {max_length} characters) for this discussion:\n\n{messages}"
            ],
            'summary_concise' => [
                'template' => "Provide a concise summary of these messages:\n\n{messages}"
            ],

            // Classifier prompts
            'sentiment' => [
                'template' => "Analyze the sentiment of this text and return JSON with sentiment (positive/neutral/negative), score (0-1), and confidence (0-1):\n\n{text}"
            ],
            'topic_classification' => [
                'template' => "Classify this text into one of these categories: {categories}\n\nText: {text}"
            ],
            'urgency' => [
                'template' => "Determine the urgency level (low/medium/high) of this message:\n\n{text}"
            ],
            'action_items' => [
                'template' => "Extract actionable items from this text:\n\n{text}"
            ],

            // Duplicate Detector prompts
            'duplicate_check' => [
                'template' => "Check if the new content is a duplicate of any existing content. Return JSON with is_duplicate and similarity_score:\n\nNew: {new_content}\nExisting: {existing_content}"
            ],
            'similarity_search' => [
                'template' => "Find content similar to this:\n\nContent: {content}\n\nCorpus: {corpus}\n\nReturn similar items with similarity scores."
            ],
            'duplicate_groups' => [
                'template' => "Group these contents by semantic similarity:\n\n{contents}"
            ],
            'semantic_hash' => [
                'template' => "Generate a semantic hash for this content:\n\n{content}"
            ],

            // Option Generator prompts
            'poll_options' => [
                'template' => "Generate {count} poll options for this topic:\n\n{topic}"
            ],
            'decision_options' => [
                'template' => "Generate decision options for this problem with pros and cons:\n\nProblem: {problem}\nConstraints: {constraints}"
            ],
            'alternatives' => [
                'template' => "Suggest alternatives to this proposed solution:\n\nSolution: {solution}\nContext: {context}"
            ],
            'creative_ideas' => [
                'template' => "Generate {count} creative ideas about:\n\n{topic}"
            ],

            // Debate Assistant prompts
            'debate_arguments' => [
                'template' => "Generate {count} arguments supporting this position on the topic:\n\nTopic: {topic}\nPosition: {position}"
            ],
            'counter_arguments' => [
                'template' => "Generate counter-arguments for these arguments on topic:\n\nTopic: {topic}\nArguments: {arguments}"
            ],
            'debate_analysis' => [
                'template' => "Analyze this debate:\n\n{messages}\n\nReturn JSON with structure analysis."
            ],
            'debate_summary' => [
                'template' => "Summarize this debate:\n\n{messages}"
            ],
            'compromise' => [
                'template' => "Suggest a compromise between these positions on topic:\n\nTopic: {topic}\nPositions: {positions}"
            ],
            'rebuttal' => [
                'template' => "Generate a rebuttal to this point:\n\nPoint: {point}\nContext: {context}"
            ],

            // Translator prompts
            'translate' => [
                'template' => "Translate from {source_language} to {target_language}:\n\n{content}"
            ],
            'language_detection' => [
                'template' => "Detect the language of this content and return the language code:\n\n{content}"
            ],
            'translate_context' => [
                'template' => "Translate from {source_language} to {target_language} considering this context:\n\nContext: {context}\nContent: {content}"
            ]
        ];
    }

    /**
     * Get a compiled prompt
     */
    public function getPrompt(string $key, array $params = []): string {
        if (!isset($this->prompts[$key])) {
            throw new \InvalidArgumentException("Prompt not found: {$key}");
        }

        $promptConfig = $this->prompts[$key];
        $template = $promptConfig['template'];
        
        // Replace placeholders
        $compiled = $template;
        foreach ($params as $param => $value) {
            $compiled = str_replace('{' . $param . '}', $value, $compiled);
        }

        // Add system instruction if defined
        if (isset($promptConfig['system'])) {
            $compiled = $promptConfig['system'] . "\n\n" . $compiled;
        }

        return $compiled;
    }

    /**
     * Add or update a prompt
     */
    public function setPrompt(string $key, string $template, array $config = []): void {
        $this->prompts[$key] = array_merge(['template' => $template], $config);
    }

    /**
     * Get prompt configuration
     */
    public function getPromptConfig(string $key): array {
        return $this->prompts[$key] ?? [];
    }

    /**
     * Check if prompt exists
     */
    public function hasPrompt(string $key): bool {
        return isset($this->prompts[$key]);
    }

    /**
     * Get all prompts
     */
    public function getAllPrompts(): array {
        return $this->prompts;
    }
}
