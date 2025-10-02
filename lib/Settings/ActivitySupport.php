<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Settings;

/**
 * @psalm-suppress UnusedClass
 */
class ActivitySupport extends ActivitySettings
{
    public function getIdentifier() : string
    {
        return 'support_set';
    }

    public function getName() : string
    {
        return $this->l10n->t('Someone supported in a <strong>inquiry</strong>');
    }
}
