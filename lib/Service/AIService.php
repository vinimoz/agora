<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToTextReformulation;
use Psr\Log\LoggerInterface;

/**
 * Service for interacting with Nextcloud's AI capabilities
 */
class AIService
{
    private ?IManager $taskProcessingManager;
    private LoggerInterface $logger;

    public function __construct(
        ?IManager $taskProcessingManager,
        LoggerInterface $logger
    ) {
        $this->taskProcessingManager = $taskProcessingManager;
        $this->logger = $logger;
    }

    /**
     * Enhance or generate text using AI via Task Processing API (synchronous)
     * 
     * @param string $text The text to enhance or prompt for generation
     * @return string The enhanced/generated text
     */
    public function enhanceText(string $text): string
    {
        if ($this->taskProcessingManager === null) {
            $this->logger->warning('AIService: no service available, install AI nextcloud.');
            return $text;
        }

        try {
            // Create a task using TextToTextReformulation
            $task = new Task(
                TextToTextReformulation::ID,
                ['input' => $text],
                'agora',
                null // userId - null for current user
            );

            // Run the task synchronously - this returns a Task object
            $resultTask = $this->taskProcessingManager->runTask($task);
            
            // Check if the task completed successfully
            if ($resultTask->getStatus() === Task::STATUS_SUCCESSFUL) {
                $output = $resultTask->getOutput();
                if (isset($output['output']) && !empty($output['output'])) {
                    return $output['output'];
                }
                return $text;
            }
            
            // Task failed or returned no output
            $this->logger->warning('AI task failed or returned no output', [
                'status' => $resultTask->getStatus(),
                'error' => $resultTask->getErrorMessage()
            ]);
            return $text;
        } catch (\Throwable $e) {
            $this->logger->error('IA Nextcloud Error : ' . $e->getMessage(), ['exception' => $e]);
            return $this->getFallbackResponse($text);
        }
    }

    /**
     * Generate content with context
     * 
     * @param string $prompt The user prompt
     * @param array $context Additional context (title, description, etc.)
     * @return string The generated content
     */
    public function generateWithContext(string $prompt, array $context): string
    {
        if ($this->taskProcessingManager === null) {
            $this->logger->warning('AIService: no service available, install AI nextcloud.');
            return $this->getFallbackResponse($prompt);
        }

        try {
            // Build a comprehensive prompt with context
            $fullPrompt = $this->buildPrompt($prompt, $context);
            return $this->enhanceText($fullPrompt);
        } catch (\Throwable $e) {
            $this->logger->error('IA Nextcloud Error : ' . $e->getMessage(), ['exception' => $e]);
            return $this->getFallbackResponse($prompt);
        }
    }

    /**
     * Build the full prompt with context
     */
    private function buildPrompt(string $prompt, array $context): string
    {
        $fullPrompt = "Context:\n";
        foreach ($context as $key => $value) {
            if (!empty($value)) {
                $fullPrompt .= ucfirst($key) . ": " . $value . "\n";
            }
        }
        $fullPrompt .= "\nUser request: " . $prompt;
        $fullPrompt .= "\n\nGenerate appropriate content based on the context and request.";
        return $fullPrompt;
    }

    /**
     * Get a fallback response when AI is not available
     */
    private function getFallbackResponse(string $prompt): string
    {
        return "I'll help with: " . $prompt . "\n\n" .
               "To develop this, consider:\n" .
               "1. What is the core problem or opportunity?\n" .
               "2. Who are the key stakeholders?\n" .
               "3. What are the desired outcomes?\n" .
               "4. What resources are available?\n" .
               "5. What are the potential risks and mitigations?\n\n" .
               "Would you like me to elaborate on any of these areas?";
    }

    /**
     * Check if AI service is available
     * 
     * @return bool True if AI service is available
     */
    public function isAvailable(): bool
    {
        return $this->taskProcessingManager !== null;
    }

    /**
     * Get the task manager
     * 
     * @return IManager|null The task manager
     */
    public function getTaskManager(): ?IManager
    {
        return $this->taskProcessingManager;
    }
}
