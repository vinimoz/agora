<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Exceptions;

use OCP\AppFramework\Http;

class EmptyTextException extends Exception
{
    public function __construct(
        string $e = 'Option text must not be empty',
    ) {
        parent::__construct($e, Http::STATUS_CONFLICT);
    }
}
