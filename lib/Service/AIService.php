<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToTextReformulation;
use Psr\Log\LoggerInterface;

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
     */
    public function enhanceText(string $text): string
    {
        // If no AI service is available, return the original text
        if ($this->taskProcessingManager === null) {
            $this->logger->warning('AIService: no service available, install AI nextcloud.');
            return $text;
        }

        try {
            // Log the request
            $this->logger->info('AI request received', [
                'text_length' => strlen($text),
                'text_preview' => substr($text, 0, 100)
            ]);

            // Create a task using TextToTextReformulation
            $task = new Task(
                TextToTextReformulation::ID,
                ['input' => $text],
                'agora',
                null // userId - null for current user
            );

            // Run the task synchronously
            $resultTask = $this->taskProcessingManager->runTask($task);
            
            // Check if the task completed successfully
            if ($resultTask->getStatus() === Task::STATUS_SUCCESSFUL) {
                $output = $resultTask->getOutput();
                $result = $output['output'] ?? '';
                
                // Log success
                $this->logger->info('AI request successful', [
                    'result_length' => strlen($result)
                ]);
                
                return $result;
            }
            
            // Task failed or returned no output
            $this->logger->warning('AI task failed or returned no output', [
                'status' => $resultTask->getStatus(),
                'error' => $resultTask->getErrorMessage()
            ]);
            
            // Return the original text as fallback
            return $text;
            
        } catch (\Throwable $e) {
            $this->logger->error('AI Error: ' . $e->getMessage(), ['exception' => $e]);
            return $text;
        }
    }

    /**
     * Generate content with context
     */
    public function generateWithContext(string $prompt, array $context): string
    {
        $fullPrompt = $this->buildPrompt($prompt, $context);
        return $this->enhanceText($fullPrompt);
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
     * Check if AI service is available
     */
    public function isAvailable(): bool
    {
        return $this->taskProcessingManager !== null;
    }
}
