<?php
namespace OCA\Agora\Service\Ai;

class DuplicateDetector {
    private $promptRepository;
    private $aiClient;
    private $similarityThreshold = 0.8;

    public function __construct(PromptRepository $promptRepository, $aiClient) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
    }

    /**
     * Check if content is duplicate of existing content
     */
    public function isDuplicate(string $newContent, array $existingContent): bool {
        $prompt = $this->promptRepository->getPrompt('duplicate_check', [
            'new_content' => $newContent,
            'existing_content' => json_encode($existingContent)
        ]);

        $response = $this->aiClient->complete($prompt);
        $result = json_decode($response, true);

        return ($result['is_duplicate'] ?? false) && 
               ($result['similarity_score'] ?? 0) >= $this->similarityThreshold;
    }

    /**
     * Find similar content
     */
    public function findSimilarContent(string $content, array $corpus): array {
        $prompt = $this->promptRepository->getPrompt('similarity_search', [
            'content' => $content,
            'corpus' => json_encode($corpus)
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? [];
    }

    /**
     * Get duplicate groups from content collection
     */
    public function findDuplicateGroups(array $contents): array {
        $prompt = $this->promptRepository->getPrompt('duplicate_groups', [
            'contents' => json_encode($contents)
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? [];
    }

    /**
     * Generate semantic hash for content
     */
    public function generateContentHash(string $content): string {
        $prompt = $this->promptRepository->getPrompt('semantic_hash', [
            'content' => $content
        ]);

        return $this->aiClient->complete($prompt);
    }

    public function setSimilarityThreshold(float $threshold): void {
        $this->similarityThreshold = $threshold;
    }
}
