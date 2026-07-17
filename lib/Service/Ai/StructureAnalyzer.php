<?php
namespace OCA\Agora\Service\Ai\Document;

class StructureAnalyzer {
    private $aiClient;
    private $promptRepository;

    public function __construct($aiClient, PromptRepository $promptRepository) {
        $this->aiClient = $aiClient;
        $this->promptRepository = $promptRepository;
    }

    public function analyze(DocumentContent $content): array {
        return [
            'chapters' => $this->detectChapters($content),
            'sections' => $this->detectSections($content),
            'subsections' => $this->detectSubsections($content),
            'headings' => $content->headings,
            'paragraphs' => $content->paragraphs,
            'tables' => $content->tables,
            'hierarchy' => $this->buildHierarchy($content),
            'structure_type' => $this->determineStructureType($content),
            'full_text' => $content->fullText
        ];
    }

    private function detectChapters(DocumentContent $content): array {
        $chapters = [];
        
        // First, check if we have explicit chapters from parsing
        if (!empty($content->chapters)) {
            return $content->chapters;
        }
        
        // Use AI to detect chapters
        $prompt = $this->promptRepository->getPrompt('detect_chapters', [
            'text' => substr($content->fullText, 0, 10000) // Limit for performance
        ]);
        
        $response = $this->aiClient->complete($prompt);
        $detectedChapters = json_decode($response, true);
        
        if ($detectedChapters) {
            return $detectedChapters;
        }
        
        // Fallback: use heading detection
        return $this->createChaptersFromHeadings($content->headings);
    }

    private function detectSections(DocumentContent $content): array {
        // Use AI to detect sections within chapters
        $sections = [];
        foreach ($content->chapters as $chapter) {
            $prompt = $this->promptRepository->getPrompt('detect_sections', [
                'chapter_content' => $chapter['content'] ?? ''
            ]);
            $response = $this->aiClient->complete($prompt);
            $detectedSections = json_decode($response, true);
            
            if ($detectedSections) {
                $sections = array_merge($sections, $detectedSections);
            }
        }
        
        return $sections;
    }

    private function buildHierarchy(DocumentContent $content): array {
        $hierarchy = [];
        
        // Build hierarchical structure from detected chapters and sections
        foreach ($content->chapters as $chapter) {
            $chapterNode = [
                'title' => $chapter['title'] ?? 'Untitled Chapter',
                'level' => 0,
                'children' => []
            ];
            
            // Find sections belonging to this chapter
            foreach ($content->sections as $section) {
                if (($section['parent_chapter'] ?? null) === $chapter['title']) {
                    $sectionNode = [
                        'title' => $section['title'] ?? 'Untitled Section',
                        'level' => 1,
                        'children' => []
                    ];
                    
                    // Find subsections
                    foreach ($content->subsections ?? [] as $subsection) {
                        if (($subsection['parent_section'] ?? null) === $section['title']) {
                            $sectionNode['children'][] = [
                                'title' => $subsection['title'] ?? 'Untitled Subsection',
                                'level' => 2,
                                'children' => []
                            ];
                        }
                    }
                    
                    $chapterNode['children'][] = $sectionNode;
                }
            }
            
            $hierarchy[] = $chapterNode;
        }
        
        return $hierarchy;
    }

    private function determineStructureType(DocumentContent $content): string {
        $patterns = [
            'book' => $this->hasBookStructure($content),
            'report' => $this->hasReportStructure($content),
            'article' => $this->hasArticleStructure($content),
            'academic' => $this->hasAcademicStructure($content),
            'technical' => $this->hasTechnicalStructure($content)
        ];
        
        foreach ($patterns as $type => $matches) {
            if ($matches) {
                return $type;
            }
        }
        
        return 'generic';
    }

    private function hasBookStructure(DocumentContent $content): bool {
        // Check for book-like elements
        $hasChapters = count($content->chapters) > 2;
        $hasTOC = strpos($content->fullText, 'Table of Contents') !== false;
        $hasIndex = strpos($content->fullText, 'Index') !== false;
        
        return $hasChapters && ($hasTOC || $hasIndex);
    }

    private function hasReportStructure(DocumentContent $content): bool {
        // Check for report-like elements
        $hasExecutiveSummary = strpos($content->fullText, 'Executive Summary') !== false;
        $hasRecommendations = strpos($content->fullText, 'Recommendations') !== false;
        $hasSections = count($content->sections) > 5;
        
        return $hasExecutiveSummary || $hasRecommendations || $hasSections;
    }

    private function hasAcademicStructure(DocumentContent $content): bool {
        // Check for academic paper elements
        $hasAbstract = strpos($content->fullText, 'Abstract') !== false;
        $hasReferences = strpos($content->fullText, 'References') !== false || 
                        strpos($content->fullText, 'Bibliography') !== false;
        $hasMethodology = strpos($content->fullText, 'Methodology') !== false;
        
        return ($hasAbstract || $hasMethodology) && $hasReferences;
    }

    private function hasArticleStructure(DocumentContent $content): bool {
        // Check for article elements
        $hasTitle = isset($content->metadata['title']) && !empty($content->metadata['title']);
        $hasAuthor = isset($content->metadata['author']) && !empty($content->metadata['author']);
        $wordCount = str_word_count($content->fullText);
        
        return $hasTitle && $hasAuthor && $wordCount > 500 && $wordCount < 5000;
    }

    private function hasTechnicalStructure(DocumentContent $content): bool {
        // Check for technical document elements
        $hasCode = preg_match('/```[\s\S]*?```/', $content->fullText) > 0;
        $hasTables = !empty($content->tables);
        $hasFigures = strpos($content->fullText, 'Figure') !== false;
        
        return ($hasCode || $hasTables || $hasFigures) && count($content->sections) > 3;
    }

    private function createChaptersFromHeadings(array $headings): array {
        $chapters = [];
        $currentChapter = null;
        
        foreach ($headings as $heading) {
            if ($heading['level'] === 1) {
                if ($currentChapter) {
                    $chapters[] = $currentChapter;
                }
                $currentChapter = [
                    'title' => $heading['text'],
                    'level' => 1,
                    'content' => '',
                    'sections' => []
                ];
            } elseif ($heading['level'] === 2 && $currentChapter) {
                $currentChapter['sections'][] = [
                    'title' => $heading['text'],
                    'level' => 2,
                    'content' => ''
                ];
            }
        }
        
        if ($currentChapter) {
            $chapters[] = $currentChapter;
        }
        
        return $chapters;
    }
}
