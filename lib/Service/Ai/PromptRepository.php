<?php

namespace OCA\Agora\Service\Ai;

class PromptRepository {
    private $prompts = [];

    public function __construct() {
        $this->initializePrompts();
    }

    private function initializePrompts(): void {
        $this->prompts = [
            // ============ OPTION GENERATION ============
            
            'options_from_context' => [
                'template' => "Based on the following discussion topic and description, generate {count} clear, actionable options that participants could vote on or discuss.\n\nTitle: {title}\nDescription: {description}\nType: {type}\n\nGenerate {count} distinct options. Each option should be a clear, concise statement that can stand alone as a choice. Format each option as a numbered list.",
                'system' => "You are an expert facilitator helping to generate options for group discussion. Create options that are clear, actionable, and cover different perspectives."
            ],
            
            'decision_options' => [
                'template' => "For the following problem, generate decision options with pros and cons:\n\nProblem: {problem}\nConstraints: {constraints}\n\nReturn JSON with options array containing id, title, pros list, and cons list.",
                'system' => "You are a decision analysis expert. Generate balanced options with clear pros and cons."
            ],
            
            'creative_ideas' => [
                'template' => "Generate {count} creative ideas about this topic:\n\nTopic: {topic}\n\nReturn each idea as a bullet point.",
                'system' => "You are a creative thinking expert. Generate innovative and diverse ideas."
            ],

            // ============ GENERAL AI ============
            
            'enhance_content' => [
                'template' => "Based on the following context and prompt, generate or enhance content:\n\nContext:\nTitle: {title}\nDescription: {description}\n\nPrompt: {prompt}\n\nGenerate appropriate content that fits the context.",
                'system' => "You are a helpful writing assistant. Generate clear, professional content that matches the context."
            ],

            // ============ SUMMARIZATION ============
            
            'summarize' => [
                'template' => "Summarize the following discussion messages in a {format} format:\n\n{messages}",
                'system' => "You are a discussion summarizer. Provide clear, neutral summaries."
            ],
            
            'sentiment' => [
                'template' => "Analyze the sentiment of this text and return JSON with sentiment (positive/neutral/negative), score (0-1), and confidence (0-1):\n\n{text}",
                'system' => "You are a sentiment analysis expert."
            ],
        ];
    }

    public function getPrompt(string $key, array $params = []): string {
        if (!isset($this->prompts[$key])) {
            throw new \InvalidArgumentException("Prompt not found: {$key}");
        }

        $promptConfig = $this->prompts[$key];
        $template = $promptConfig['template'];
        
        $compiled = $template;
        foreach ($params as $param => $value) {
            $compiled = str_replace('{' . $param . '}', $value, $compiled);
        }

        if (isset($promptConfig['system'])) {
            $compiled = $promptConfig['system'] . "\n\n" . $compiled;
        }

        return $compiled;
    }
}
