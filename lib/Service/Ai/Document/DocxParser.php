<?php
namespace OCA\Agora\Service\Ai\Document;

class DocxParser implements ParserInterface {
    public function parse(string $path): DocumentContent {
        $zip = new \ZipArchive();
        $zip->open($path);
        $xml = $zip->getFromName('word/document.xml');
        $zip->close();
        
        $dom = new \DOMDocument();
        $dom->loadXML($xml);
        
        $content = new DocumentContent();
        $content->fullText = $this->extractText($dom);
        $content->metadata = $this->extractMetadata($dom);
        $content->chapters = $this->extractChapters($dom);
        $content->sections = $this->extractSections($dom);
        $content->headings = $this->extractHeadings($dom);
        $content->paragraphs = $this->extractParagraphs($dom);
        $content->tables = $this->extractTables($dom);
        
        return $content;
    }
    
    private function extractText(\DOMDocument $dom): string {
        $xpath = new \DOMXPath($dom);
        $xpath->registerNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main');
        
        $textNodes = $xpath->query('//w:t');
        $text = '';
        foreach ($textNodes as $node) {
            $text .= $node->nodeValue . ' ';
        }
        return trim($text);
    }
    
    private function extractMetadata(\DOMDocument $dom): array {
        $xpath = new \DOMXPath($dom);
        $xpath->registerNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main');
        $xpath->registerNamespace('dc', 'http://purl.org/dc/elements/1.1/');
        
        return [
            'title' => $this->getNodeValue($xpath, '//dc:title'),
            'author' => $this->getNodeValue($xpath, '//dc:creator'),
            'created' => $this->getNodeValue($xpath, '//dcterms:created'),
            'modified' => $this->getNodeValue($xpath, '//dcterms:modified')
        ];
    }
    
    private function extractHeadings(\DOMDocument $dom): array {
        $xpath = new \DOMXPath($dom);
        $xpath->registerNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main');
        
        $headings = [];
        $styles = [
            'Heading1' => 1,
            'Heading2' => 2,
            'Heading3' => 3,
            'Heading4' => 4,
            'Heading5' => 5,
            'Heading6' => 6
        ];
        
        foreach ($styles as $style => $level) {
            $query = "//w:p[w:pPr/w:pStyle/@w:val='{$style}']";
            $nodes = $xpath->query($query);
            foreach ($nodes as $node) {
                $text = $this->extractParagraphText($node);
                if (!empty($text)) {
                    $headings[] = [
                        'text' => $text,
                        'level' => $level,
                        'style' => $style
                    ];
                }
            }
        }
        
        return $headings;
    }
    
    private function extractParagraphText(\DOMNode $node): string {
        $xpath = new \DOMXPath($node->ownerDocument);
        $xpath->registerNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main');
        
        $text = '';
        $textNodes = $xpath->query('.//w:t', $node);
        foreach ($textNodes as $textNode) {
            $text .= $textNode->nodeValue;
        }
        return trim($text);
    }
    
    // Additional extraction methods...
}
