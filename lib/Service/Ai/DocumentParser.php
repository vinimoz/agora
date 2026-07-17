<?php
namespace OCA\Agora\Service\Ai\Document;

class DocumentParser {
    private $supportedFormats = ['pdf', 'doc', 'docx', 'odt', 'txt', 'rtf'];
    
    public function parse(string $documentPath): DocumentContent {
        $extension = strtolower(pathinfo($documentPath, PATHINFO_EXTENSION));
        
        if (!in_array($extension, $this->supportedFormats)) {
            throw new \InvalidArgumentException("Unsupported document format: {$extension}");
        }
        
        $parser = $this->getParser($extension);
        return $parser->parse($documentPath);
    }
    
    private function getParser(string $format): ParserInterface {
        switch ($format) {
            case 'pdf':
                return new PdfParser();
            case 'doc':
            case 'docx':
                return new DocxParser();
            case 'odt':
                return new OdtParser();
            case 'txt':
            case 'rtf':
                return new TextParser();
            default:
                throw new \InvalidArgumentException("No parser available for format: {$format}");
        }
    }
    
    public function addSupportedFormat(string $format, ParserInterface $parser): void {
        $this->supportedFormats[] = $format;
        // Store parser for custom formats
    }
}

interface ParserInterface {
    public function parse(string $path): DocumentContent;
}

class DocumentContent {
    public string $fullText;
    public array $chapters;
    public array $sections;
    public array $headings;
    public array $paragraphs;
    public array $metadata;
    public array $tables;
    public array $images;
    public array $footnotes;
}
