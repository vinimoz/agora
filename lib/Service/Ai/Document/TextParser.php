<?php

namespace OCA\Agora\Service\Ai\Document;

class TextParser implements ParserInterface {
    public function parse(string $path): DocumentContent {
        $content = new DocumentContent();
        $content->fullText = file_get_contents($path) ?: '';
        $content->chapters = [];
        $content->sections = [];
        $content->headings = [];
        $content->paragraphs = [];
        $content->metadata = [];
        $content->tables = [];
        $content->images = [];
        $content->footnotes = [];
        return $content;
    }
}
