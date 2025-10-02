<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Exceptions;

use OCA\Agora\Db\Share;
use OCP\AppFramework\Http;

class ShareAlreadyExistsException extends Exception
{
    public function __construct(
        string $e = 'Share already exists',
        private ?Share $existingShare = null,
    ) {
        parent::__construct($e, Http::STATUS_OK);
    }
    public function getShare(): ?Share
    {
        return $this->existingShare;
    }
}
