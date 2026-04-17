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
use OCP\Dashboard\IIconWidget;

class AgoraWidget implements IWidget, IIconWidget
{
    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(
        private IL10N $l10n,
        private IURLGenerator $urlGenerator,
    ) {
        $this->l10n = $l10n;
        $this->urlGenerator = $urlGenerator;
    }
    /**
     * @inheritDoc
     */
    #[\Override]
    public function getId(): string
    {
        return AppConstants::APP_ID;
    }
    /**
     * @inheritDoc
     */
    #[\Override]
    public function getTitle(): string
    {
        return $this->l10n->t('Recent inquiries');
    }
    /**
     * @inheritDoc
     */
    #[\Override]
    public function getOrder(): int
    {
        return 50;
    }

/**
     * @inheritDoc
     */
    #[\Override]
    public function getIconUrl(): string
    {
        return $this->urlGenerator->getAbsoluteURL(
            $this->urlGenerator->imagePath(AppConstants::APP_ID, 'agora-dark.svg')
        );
    }

    /**
     * @inheritDoc
     */
    #[\Override]
    public function getIconClass(): string
    {
        return 'icon-agora-dark';
    }

    /**
     * @inheritDoc
     */
    #[\Override]
    public function getUrl(): ?string
    {
        return $this->urlGenerator->linkToRouteAbsolute(AppConstants::APP_ID . '.page.index');
    }

    public function load(): void
    {
        \OCP\Util::addScript(AppConstants::APP_ID, 'agora-dashboard');
         \OCP\Util::addStyle(AppConstants::APP_ID, '../src/assets/scss/dashboard');
    }
}
