<?php
namespace OCA\Agora\Service\Ai;

class OptionGenerator {
    private $promptRepository;
    private $aiClient;
    private $documentParser;
    private $structureAnalyzer;

    public function __construct(
        PromptRepository $promptRepository, 
        $aiClient,
        DocumentParser $documentParser,
        StructureAnalyzer $structureAnalyzer
    ) {
        $this->promptRepository = $promptRepository;
        $this->aiClient = $aiClient;
        $this->documentParser = $documentParser;
        $this->structureAnalyzer = $structureAnalyzer;
    }

    /**
     * Generate options from document content with structure awareness
     */
    public function generateOptionsFromDocument(
        string $documentPath, 
        string $optionType = 'chapter', 
        array $options = []
    ): array {
        // Parse document
        $documentContent = $this->documentParser->parse($documentPath);
        
        // Analyze document structure
        $structure = $this->structureAnalyzer->analyze($documentContent);
        
        // Generate options based on structure type
        switch ($optionType) {
            case 'chapter':
                return $this->generateChapterOptions($structure, $options);
            case 'section':
                return $this->generateSectionOptions($structure, $options);
            case 'subsection':
                return $this->generateSubsectionOptions($structure, $options);
            case 'paragraph':
                return $this->generateParagraphOptions($structure, $options);
            case 'custom':
                return $this->generateCustomStructureOptions($structure, $options);
            default:
                return $this->generateGenericOptions($structure, $options);
        }
    }

    /**
     * Generate chapter-based options from document
     */
    private function generateChapterOptions(array $structure, array $options = []): array {
        $chapters = $structure['chapters'] ?? [];
        $result = [];

        foreach ($chapters as $index => $chapter) {
            $option = [
                'id' => $options['prefix'] ?? 'ch' . ($index + 1),
                'type' => 'chapter',
                'title' => $chapter['title'] ?? "Chapter " . ($index + 1),
                'content' => $chapter['content'] ?? '',
                'summary' => $this->generateOptionSummary($chapter['content'] ?? ''),
                'sections' => $this->extractSections($chapter),
                'metadata' => [
                    'position' => $index + 1,
                    'page' => $chapter['page'] ?? null,
                    'length' => str_word_count($chapter['content'] ?? '')
                ]
            ];

            // Add AI-generated insights
            if ($options['with_insights'] ?? false) {
                $option['insights'] = $this->generateInsights($chapter['content'] ?? '');
            }

            $result[] = $option;
        }

        return $result;
    }

    /**
     * Generate section-based options from document
     */
    private function generateSectionOptions(array $structure, array $options = []): array {
        $sections = $this->extractAllSections($structure);
        $result = [];

        foreach ($sections as $index => $section) {
            $option = [
                'id' => $options['prefix'] ?? 'sec' . ($index + 1),
                'type' => 'section',
                'title' => $section['title'] ?? "Section " . ($index + 1),
                'parent_chapter' => $section['parent_chapter'] ?? null,
                'content' => $section['content'] ?? '',
                'summary' => $this->generateOptionSummary($section['content'] ?? ''),
                'subsections' => $section['subsections'] ?? [],
                'metadata' => [
                    'position' => $index + 1,
                    'level' => $section['level'] ?? 1,
                    'page' => $section['page'] ?? null
                ]
            ];

            // Add key concepts if requested
            if ($options['extract_concepts'] ?? false) {
                $option['key_concepts'] = $this->extractKeyConcepts($section['content'] ?? '');
            }

            $result[] = $option;
        }

        return $result;
    }

    /**
     * Generate subsection-based options
     */
    private function generateSubsectionOptions(array $structure, array $options = []): array {
        $subsections = $this->extractAllSubsections($structure);
        $result = [];

        foreach ($subsections as $index => $subsection) {
            $option = [
                'id' => $options['prefix'] ?? 'sub' . ($index + 1),
                'type' => 'subsection',
                'title' => $subsection['title'] ?? "Subsection " . ($index + 1),
                'parent_section' => $subsection['parent_section'] ?? null,
                'parent_chapter' => $subsection['parent_chapter'] ?? null,
                'content' => $subsection['content'] ?? '',
                'summary' => $this->generateOptionSummary($subsection['content'] ?? ''),
                'metadata' => [
                    'position' => $index + 1,
                    'level' => $subsection['level'] ?? 2,
                    'page' => $subsection['page'] ?? null
                ]
            ];

            // Add topic tags if requested
            if ($options['add_tags'] ?? false) {
                $option['tags'] = $this->extractTags($subsection['content'] ?? '');
            }

            $result[] = $option;
        }

        return $result;
    }

    /**
     * Generate paragraph-level options
     */
    private function generateParagraphOptions(array $structure, array $options = []): array {
        $paragraphs = $this->extractAllParagraphs($structure);
        $result = [];

        // Group paragraphs by section/chapter context
        $groupedParagraphs = $this->groupParagraphsByContext($paragraphs);

        foreach ($groupedParagraphs as $index => $group) {
            $option = [
                'id' => $options['prefix'] ?? 'p' . ($index + 1),
                'type' => 'paragraph_group',
                'title' => $this->generateParagraphGroupTitle($group),
                'content' => $group['text'] ?? '',
                'context' => $group['context'] ?? [],
                'summary' => $this->generateOptionSummary($group['text'] ?? ''),
                'paragraphs' => $group['individual_paragraphs'] ?? [],
                'metadata' => [
                    'position' => $index + 1,
                    'paragraph_count' => count($group['individual_paragraphs'] ?? []),
                    'page_range' => $group['page_range'] ?? null
                ]
            ];

            // Add sentiment analysis if requested
            if ($options['analyze_sentiment'] ?? false) {
                $option['sentiment'] = $this->analyzeTextSentiment($group['text'] ?? '');
            }

            $result[] = $option;
        }

        return $result;
    }

    /**
     * Generate custom structure options
     */
    private function generateCustomStructureOptions(array $structure, array $options = []): array {
        $customType = $options['custom_type'] ?? 'segment';
        $segments = $this->segmentDocumentByCustomRules($structure, $options);

        return array_map(function($segment, $index) use ($customType, $options) {
            return [
                'id' => $options['prefix'] ?? $customType[0] . ($index + 1),
                'type' => $customType,
                'title' => $this->generateCustomTitle($segment, $index, $options),
                'content' => $segment['content'] ?? '',
                'summary' => $this->generateOptionSummary($segment['content'] ?? ''),
                'custom_metadata' => $segment['metadata'] ?? [],
                'metadata' => [
                    'position' => $index + 1,
                    'segment_size' => str_word_count($segment['content'] ?? '')
                ]
            ];
        }, $segments, array_keys($segments));
    }

    /**
     * Generate generic options (fallback)
     */
    private function generateGenericOptions(array $structure, array $options = []): array {
        $content = $structure['full_text'] ?? '';
        $segments = $this->splitIntoCoherentSegments($content, $options);

        return array_map(function($segment, $index) use ($options) {
            return [
                'id' => $options['prefix'] ?? 'opt' . ($index + 1),
                'type' => 'generic',
                'title' => $this->generateGenericTitle($segment, $index),
                'content' => $segment,
                'summary' => $this->generateOptionSummary($segment),
                'metadata' => [
                    'position' => $index + 1,
                    'length' => str_word_count($segment)
                ]
            ];
        }, $segments, array_keys($segments));
    }

    /**
     * Generate AI-powered summary for option content
     */
    private function generateOptionSummary(string $content): string {
        $prompt = $this->promptRepository->getPrompt('option_summary', [
            'content' => $content
        ]);

        return $this->aiClient->complete($prompt);
    }

    /**
     * Generate AI insights for content
     */
    private function generateInsights(string $content): array {
        $prompt = $this->promptRepository->getPrompt('content_insights', [
            'content' => $content
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? [];
    }

    /**
     * Extract key concepts from content
     */
    private function extractKeyConcepts(string $content): array {
        $prompt = $this->promptRepository->getPrompt('extract_concepts', [
            'content' => $content
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseConcepts($response);
    }

    /**
     * Extract tags from content
     */
    private function extractTags(string $content): array {
        $prompt = $this->promptRepository->getPrompt('extract_tags', [
            'content' => $content
        ]);

        $response = $this->aiClient->complete($prompt);
        return $this->parseTags($response);
    }

    /**
     * Analyze text sentiment
     */
    private function analyzeTextSentiment(string $text): array {
        $prompt = $this->promptRepository->getPrompt('sentiment_analysis', [
            'text' => $text
        ]);

        $response = $this->aiClient->complete($prompt);
        return json_decode($response, true) ?? ['sentiment' => 'neutral'];
    }

    // Helper methods for document structure extraction
    private function extractSections(array $chapter): array {
        return $chapter['sections'] ?? [];
    }

    private function extractAllSections(array $structure): array {
        $sections = [];
        foreach ($structure['chapters'] ?? [] as $chapter) {
            foreach ($chapter['sections'] ?? [] as $section) {
                $section['parent_chapter'] = $chapter['title'] ?? null;
                $sections[] = $section;
            }
        }
        return $sections;
    }

    private function extractAllSubsections(array $structure): array {
        $subsections = [];
        foreach ($this->extractAllSections($structure) as $section) {
            foreach ($section['subsections'] ?? [] as $subsection) {
                $subsection['parent_section'] = $section['title'] ?? null;
                $subsection['parent_chapter'] = $section['parent_chapter'] ?? null;
                $subsections[] = $subsection;
            }
        }
        return $subsections;
    }

    private function extractAllParagraphs(array $structure): array {
        $paragraphs = [];
        // Recursively extract paragraphs from all levels
        $this->recursiveExtractParagraphs($structure, $paragraphs);
        return $paragraphs;
    }

    private function recursiveExtractParagraphs(array $node, array &$paragraphs, array $context = []) {
        if (isset($node['paragraphs'])) {
            foreach ($node['paragraphs'] as $paragraph) {
                $paragraph['context'] = $context;
                $paragraphs[] = $paragraph;
            }
        }

        // Check for children nodes
        foreach (['chapters', 'sections', 'subsections'] as $childKey) {
            if (isset($node[$childKey])) {
                foreach ($node[$childKey] as $child) {
                    $newContext = array_merge($context, [
                        'parent_type' => $childKey,
                        'parent_title' => $child['title'] ?? null
                    ]);
                    $this->recursiveExtractParagraphs($child, $paragraphs, $newContext);
                }
            }
        }
    }

    private function groupParagraphsByContext(array $paragraphs): array {
        $groups = [];
        $currentGroup = [];
        $currentContext = null;

        foreach ($paragraphs as $paragraph) {
            $context = $this->getParagraphContext($paragraph);
            if ($context !== $currentContext) {
                if (!empty($currentGroup)) {
                    $groups[] = [
                        'text' => implode("\n\n", $currentGroup),
                        'context' => $currentContext,
                        'individual_paragraphs' => $currentGroup,
                        'page_range' => $this->getPageRange($currentGroup)
                    ];
                }
                $currentGroup = [];
                $currentContext = $context;
            }
            $currentGroup[] = $paragraph['text'] ?? '';
        }

        // Add last group
        if (!empty($currentGroup)) {
            $groups[] = [
                'text' => implode("\n\n", $currentGroup),
                'context' => $currentContext,
                'individual_paragraphs' => $currentGroup,
                'page_range' => $this->getPageRange($currentGroup)
            ];
        }

        return $groups;
    }

    private function getParagraphContext(array $paragraph): string {
        return implode(' > ', array_map(function($ctx) {
            return $ctx['parent_title'] ?? 'unknown';
        }, $paragraph['context'] ?? []));
    }

    private function getPageRange(array $paragraphs): ?array {
        // Extract page numbers from paragraphs if available
        $pages = [];
        foreach ($paragraphs as $p) {
            if (isset($p['page'])) {
                $pages[] = $p['page'];
            }
        }
        return !empty($pages) ? [min($pages), max($pages)] : null;
    }

    private function splitIntoCoherentSegments(string $content, array $options): array {
        $segmentSize = $options['segment_size'] ?? 3; // number of paragraphs
        $paragraphs = preg_split('/\n\s*\n/', $content);
        $segments = [];
        
        for ($i = 0; $i < count($paragraphs); $i += $segmentSize) {
            $segment = implode("\n\n", array_slice($paragraphs, $i, $segmentSize));
            if (!empty(trim($segment))) {
                $segments[] = $segment;
            }
        }
        
        return $segments;
    }

    private function generateParagraphGroupTitle(array $group): string {
        $firstParagraph = explode("\n", $group['text'] ?? '')[0] ?? '';
        $title = substr($firstParagraph, 0, 50);
        return strlen($title) < strlen($firstParagraph) ? $title . '...' : $title;
    }

    private function generateCustomTitle(array $segment, int $index, array $options): string {
        $title = $segment['metadata']['title'] ?? null;
        if ($title) {
            return $title;
        }
        return ($options['custom_type'] ?? 'Segment') . ' ' . ($index + 1);
    }

    private function generateGenericTitle(string $segment, int $index): string {
        $firstLine = explode("\n", $segment)[0] ?? '';
        $title = substr($firstLine, 0, 60);
        return strlen($title) < strlen($firstLine) ? $title . '...' : $title;
    }

    private function parseConcepts(string $response): array {
        $concepts = [];
        $lines = explode("\n", $response);
        foreach ($lines as $line) {
            if (preg_match('/^[-*•]\s*(.+)/', trim($line), $matches)) {
                $concepts[] = trim($matches[1]);
            }
        }
        return $concepts;
    }

    private function parseTags(string $response): array {
        $tags = [];
        $lines = explode("\n", $response);
        foreach ($lines as $line) {
            if (preg_match('/^[-*•]\s*(.+)/', trim($line), $matches)) {
                $tags[] = trim($matches[1]);
            }
        }
        return $tags;
    }

    private function segmentDocumentByCustomRules(array $structure, array $options): array {
        // Implement custom segmentation logic based on provided rules
        $rules = $options['segmentation_rules'] ?? [];
        $segments = [];
        
        // Default: split by headings if available
        if (isset($structure['headings'])) {
            foreach ($structure['headings'] as $heading) {
                $segments[] = [
                    'content' => $heading['content'] ?? '',
                    'metadata' => [
                        'title' => $heading['title'] ?? null,
                        'level' => $heading['level'] ?? null
                    ]
                ];
            }
        }
        
        return $segments;
    }
}
