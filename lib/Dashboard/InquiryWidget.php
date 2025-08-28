<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Dashboard;

use OCA\Agora\AppConstants;
use OCP\Dashboard\IWidget;
use OCP\IL10N;
use OCP\IURLGenerator;

class InquiryWidget implements IWidget
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private IL10N $l10n,
        private IURLGenerator $urlGenerator,
    ) {
    }

    public function getId(): string
    {
        return AppConstants::APP_ID;
    }

    public function getTitle(): string
    {
        return $this->l10n->t('Agora');
    }

    public function getOrder(): int
    {
        return 50;
    }

    public function getIconClass(): string
    {
        return 'icon-agora-dark';
    }

    public function getUrl(): ?string
    {
        return $this->urlGenerator->linkToRouteAbsolute(AppConstants::APP_ID . '.page.indexindex');
    }

    public function load(): void
    {
        \OCP\Util::addScript(AppConstants::APP_ID, 'agora-dashboard');
    }
}
