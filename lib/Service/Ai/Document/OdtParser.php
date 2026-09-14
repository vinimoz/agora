<?php

namespace OCA\Agora\Service\Ai\Document;

class OdtParser implements ParserInterface {
    public function parse(string $path): DocumentContent {
        $content = new DocumentContent();
        $content->fullText = '';
        $content->chapters = [];
        $content->sections = [];
        $content->headings = [];
        $content->paragraphs = [];
        $content->metadata = [];
        $content->tables = [];
        $content->images = [];
        $content->footnotes = [];
        
        try {
            $zip = new \ZipArchive();
            if ($zip->open($path) === true) {
                $xml = $zip->getFromName('content.xml');
                $zip->close();
                
                if ($xml) {
                    $dom = new \DOMDocument();
                    $dom->loadXML($xml);
                    $content->fullText = strip_tags($dom->saveXML());
                }
            }
        } catch (\Throwable $e) {
            // Fallback to empty content
        }
        
        return $content;
    }
}
