<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Exceptions;

use OCP\AppFramework\Http;

class InvalidInquiryTypeException extends Exception
{
    public function __construct(
        string $e = 'Invalid inquiryType value',
    ) {
        parent::__construct($e, Http::STATUS_CONFLICT);
    }
}
