<?php
namespace OCA\Agora\Service\Ai\Document;

class PdfParser implements ParserInterface {
    public function parse(string $path): DocumentContent {
        // Use a PDF parsing library like Smalot\PdfParser
        $parser = new \Smalot\PdfParser\Parser();
        $pdf = $parser->parseFile($path);
        
        $content = new DocumentContent();
        $content->fullText = $pdf->getText();
        $content->metadata = [
            'title' => $pdf->getDetails()['Title'] ?? null,
            'author' => $pdf->getDetails()['Author'] ?? null,
            'pages' => count($pdf->getPages())
        ];
        
        // Extract structure
        $content->chapters = $this->extractChaptersFromPdf($pdf);
        $content->sections = $this->extractSectionsFromPdf($pdf);
        $content->headings = $this->extractHeadingsFromPdf($pdf);
        $content->paragraphs = $this->extractParagraphsFromPdf($pdf);
        
        return $content;
    }
    
    private function extractChaptersFromPdf($pdf): array {
        $chapters = [];
        $text = $pdf->getText();
        
        // Detect chapter headings (e.g., "Chapter 1", "CHAPTER 1", etc.)
        $pattern = '/(?:Chapter|CHAPTER|Chapitre|Kapitel)\s+(\d+)\s*[:.]\s*([^\n]+)/';
        preg_match_all($pattern, $text, $matches, PREG_OFFSET_CAPTURE);
        
        foreach ($matches[0] as $index => $match) {
            $chapter = [
                'title' => $matches[2][$index][0] ?? "Chapter " . ($index + 1),
                'number' => $matches[1][$index][0] ?? ($index + 1),
                'content' => $this->extractSectionContent($text, $match[1], $matches[0][$index + 1][1] ?? null),
                'page' => $this->estimatePageNumber($match[1], $pdf)
            ];
            $chapters[] = $chapter;
        }
        
        return $chapters;
    }
    
    private function extractHeadingsFromPdf($pdf): array {
        $headings = [];
        $text = $pdf->getText();
        
        // Detect various heading patterns
        $patterns = [
            '/^([A-Z][A-Z\s]{2,})$/m', // ALL CAPS HEADINGS
            '/^([A-Z][a-z]+\s+[A-Z][a-z]+)/m', // CamelCase headings
            '/^(\d+\.\s+[A-Z][a-z])/m', // Numbered headings
        ];
        
        foreach ($patterns as $pattern) {
            preg_match_all($pattern, $text, $matches, PREG_OFFSET_CAPTURE);
            foreach ($matches[1] as $match) {
                $headings[] = [
                    'text' => trim($match[0]),
                    'position' => $match[1],
                    'level' => $this->determineHeadingLevel($match[0]),
                    'page' => $this->estimatePageNumber($match[1], $pdf)
                ];
            }
        }
        
        return $headings;
    }
    
    private function estimatePageNumber(int $position, $pdf): int {
        // Estimate page number based on position in text
        $totalPages = count($pdf->getPages());
        $fullText = $pdf->getText();
        $percentage = $position / strlen($fullText);
        return max(1, min($totalPages, ceil($percentage * $totalPages)));
    }
}
