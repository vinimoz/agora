<?php
declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCP\AI\ITextProcessing;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use Psr\Log\LoggerInterface;

/**
 */
class AIService {

    private ?ITextProcessing $textProcessing;
    private LoggerInterface $logger;

    public function __construct(
        ?ITextProcessing $textProcessing,
        LoggerInterface $logger
    ) {
        $this->textProcessing = $textProcessing;
        $this->logger = $logger;
    }

    /**
     */
    public function enhanceText(string $text): string {
        if ($this->textProcessing === null) {
            $this->logger->warning('AIService: no service available, install AI nextcloud.');
            return $text;
        }

        try {
            $enhanced = $this->textProcessing->enhanceText($text);
            return $enhanced ?: $text;
        } catch (\Throwable $e) {
            $this->logger->error('IA Nextcloud Error : ' . $e->getMessage(), ['exception' => $e]);
            return $text;
        }
    }

    /**
     */
    public function isAvailable(): bool {
        return $this->textProcessing !== null;
    }
}
