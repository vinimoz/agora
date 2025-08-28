<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Model\Search;

use OCA\Agora\Db\Inquiry;
use OCP\Search\SearchResultEntry;

class InquiriesSearchResultEntry extends SearchResultEntry
{
    public function __construct(Inquiry $inquiry)
    {
        parent::__construct('', $inquiry->getTitle(), $inquiry->getDescription(), $inquiry->getSupportUrl(), 'icon-agora-dark');
    }
}
