<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Attributes;

use Attribute;

/**
 * Attribute for permission check against existing share
 */
#[Attribute]
class ShareTokenRequired
{
}
