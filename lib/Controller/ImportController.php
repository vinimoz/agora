<?php

namespace OCA\Agora\Controller;
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\ILogger;

class ImportController extends Controller {
    
    private $logger;
    
    public function __construct(
        string $appName,
        IRequest $request,
        ILogger $logger
    ) {
        parent::__construct($appName, $request);
        $this->logger = $logger;
    }
    
    /**
     * @NoAdminRequired
     */
    public function importFile(): JSONResponse {
        try {
            $uploadedFile = $this->request->getUploadedFile('file');
            if (!$uploadedFile) {
                return new JSONResponse(['success' => false, 'error' => 'No file uploaded'], 400);
            }

            if ($uploadedFile['size'] > 10 * 1024 * 1024) {
                throw new \Exception('File too large');
            }

            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mime = $finfo->file($filePath);

            $allowed = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.oasis.opendocument.text',
                'text/plain',
                'text/html'
            ];

            if (!in_array($mime, $allowed)) {
                throw new \Exception('Invalid file type');
            }


            $filePath = $uploadedFile['tmp_name'];
            $fileName = $uploadedFile['name'];
            $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            $content = $this->extractText($filePath, $fileExtension);
            $metadata = $this->analyzeStructure($content);

            return new JSONResponse([
                'success' => true,
                'content' => $content,
                'title' => pathinfo($fileName, PATHINFO_FILENAME),
                'metadata' => $metadata
            ]);

        } catch (\Exception $e) {
            $this->logger->error('Import error: ' . $e->getMessage());
            return new JSONResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function extractText(string $filePath, string $extension): string {
        switch ($extension) {
        case 'docx':
            return $this->extractDocxText($filePath);
        case 'doc':
            return $this->extractDocText($filePath);
        case 'odt':
            return $this->extractOdtText($filePath);
        case 'pdf':
            return $this->extractPdfText($filePath);
        case 'html':
        case 'htm':
            return $this->extractHtmlText($filePath);
        case 'md':
        case 'markdown':
        case 'txt':
            return file_get_contents($filePath);
        default:
            throw new \Exception("Unsupported file format: {$extension}");
        }
    }

    private function extractDocxText(string $filePath): string {
        $zip = new \ZipArchive();
        $text = '';

        if ($zip->open($filePath) === true) {
            $content = $zip->getFromName('word/document.xml');
            $zip->close();

            if ($content) {
                $content = str_replace('</w:p>', "\n", $content);
                $text = strip_tags($content);
                $text = html_entity_decode($text, ENT_QUOTES | ENT_XML1, 'UTF-8');
            }
        }

        if (empty($text)) {
            throw new \Exception('Could not extract text from DOCX file');
        }

        return $text;
    }


    private function extractDocText(string $filePath): string {
        $content = file_get_contents($filePath);
        $text = preg_replace('/[^\p{L}\p{N}\s\.\,\!\?\;\:\'\"\(\)\[\]\{\}\<\>\/\-\=\+\*\&\^\%@\#\$\€\£\\\|]/u', ' ', $content);
        $text = preg_replace('/\s+/', ' ', $text);

        if (empty(trim($text))) {
            throw new \Exception('Could not extract text from DOC file. Please convert to DOCX format.');
        }

        return $text;
    }

    private function extractOdtText(string $filePath): string {
        $zip = new \ZipArchive();
        $text = '';

        if ($zip->open($filePath) === true) {
            $content = $zip->getFromName('content.xml');
            $zip->close();

            if ($content) {
                $content = str_replace('</text:p>', "\n", $content);
                $text = strip_tags($content);
                $text = html_entity_decode($text, ENT_QUOTES | ENT_XML1, 'UTF-8');
            }
        }

        if (empty($text)) {
            throw new \Exception('Could not extract text from ODT file');
        }

        return $text;
    }

    private function extractPdfText(string $filePath): string {
        throw new \Exception('PDF text extraction is not supported. Please convert to a supported format.');
    }

    private function extractHtmlText(string $filePath): string {
        $html = file_get_contents($filePath);
        $html = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $html);
        $html = preg_replace('/<style\b[^>]*>(.*?)<\/style>/is', '', $html);
        $text = strip_tags($html);
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        return $text;
    }

    private function analyzeStructure(string $content): array {
        $lines = explode("\n", $content);
        $sections = [];
        $chapterCount = 0;
        $hasIntroduction = false;
        $hasConclusion = false;
        $hasArticles = false;
        $wordCount = str_word_count($content);

        foreach ($lines as $lineNum => $line) {
            $line = trim($line);
            if (empty($line)) continue;

            $lowerLine = strtolower($line);

            // Check for introduction/conclusion first
            if (!$hasIntroduction && preg_match('/^(introduction|intro|preamble)/i', $lowerLine)) {
                $hasIntroduction = true;
                $sections[] = ['title' => $line, 'level' => 1, 'type' => 'introduction', 'lineNumber' => $lineNum];
                continue;
            }

            if (!$hasConclusion && preg_match('/^(conclusion|summary|closing)/i', $lowerLine)) {
                $hasConclusion = true;
                $sections[] = ['title' => $line, 'level' => 1, 'type' => 'conclusion', 'lineNumber' => $lineNum];
                continue;
            }

            // Detect articles
            if (preg_match('/^(article|art\.|§)\s+(\d+)/i', $line, $matches)) {
                $sections[] = ['title' => $line, 'level' => 2, 'type' => 'article', 'lineNumber' => $lineNum];
                $hasArticles = true;
                $chapterCount++;
                continue;
            }

            // Detect numbered sections
            if (preg_match('/^(\d+(?:\.\d+)*)\s+(.+)$/', $line, $matches)) {
                $level = substr_count($matches[1], '.') + 1;
                $type = $level === 1 ? 'chapter' : 'subsection';
                $sections[] = [
                    'title' => $matches[2],
                    'level' => $level,
                    'type' => $type,
                    'number' => $matches[1],
                    'lineNumber' => $lineNum
                ];
                if ($type === 'chapter') $chapterCount++;
            }
        }

        return [
            'wordCount' => $wordCount,
            'chapterCount' => $chapterCount,
            'sections' => array_slice($sections, 0, 50),
            'detectedStructure' => [
                'hasIntroduction' => $hasIntroduction,
                'hasChapters' => $chapterCount > 0,
                'hasArticles' => $hasArticles,
                'hasConclusion' => $hasConclusion
            ]
        ];
    }
}
