<?php

namespace OCA\Agora\Service\Ai\Document;

class StructureAnalyzer {
    private $aiClient;
    private $promptRepository;

    public function __construct($aiClient, $promptRepository) {
        $this->aiClient = $aiClient;
        $this->promptRepository = $promptRepository;
    }

    public function analyze(DocumentContent $content): array {
        return [
            'chapters' => $content->chapters ?? [],
            'sections' => $content->sections ?? [],
            'subsections' => [],
            'headings' => $content->headings ?? [],
            'paragraphs' => $content->paragraphs ?? [],
            'tables' => $content->tables ?? [],
            'hierarchy' => $this->buildHierarchy($content),
            'structure_type' => 'generic',
            'full_text' => $content->fullText ?? ''
        ];
    }

    private function buildHierarchy(DocumentContent $content): array {
        $hierarchy = [];
        
        foreach ($content->chapters ?? [] as $chapter) {
            $chapterNode = [
                'title' => $chapter['title'] ?? 'Untitled Chapter',
                'level' => 0,
                'children' => []
            ];
            
            foreach ($content->sections ?? [] as $section) {
                if (($section['parent_chapter'] ?? null) === $chapter['title']) {
                    $sectionNode = [
                        'title' => $section['title'] ?? 'Untitled Section',
                        'level' => 1,
                        'children' => []
                    ];
                    
                    $chapterNode['children'][] = $sectionNode;
                }
            }
            
            $hierarchy[] = $chapterNode;
        }
        
        return $hierarchy;
    }
}
