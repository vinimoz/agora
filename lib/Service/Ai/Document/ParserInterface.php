<?php

namespace OCA\Agora\Service\Ai\Document;

interface ParserInterface {
    public function parse(string $path): DocumentContent;
}
