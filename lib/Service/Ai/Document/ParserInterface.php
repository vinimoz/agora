<?php
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Service\Ai\Document;

interface ParserInterface {
    public function parse(string $path): DocumentContent;
}
