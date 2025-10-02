<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Exceptions;

class ShareNotFoundException extends NotFoundException
{
    public function __construct(
        string $e = 'Share not found',
    ) {
        parent::__construct($e);
    }
}
