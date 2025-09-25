<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Provider;

use Exception;
use OCA\Agora\AppInfo\Application;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Exceptions\NotFoundException;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\SupportService;
use OCP\Collaboration\Reference\ADiscoverableReferenceProvider;
use OCP\Collaboration\Reference\IReference;
use OCP\Collaboration\Reference\ISearchableReferenceProvider;
use OCP\Collaboration\Reference\Reference;
use OCP\IL10N;
use OCP\IURLGenerator;

class ReferenceProvider extends ADiscoverableReferenceProvider implements ISearchableReferenceProvider
{

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private InquiryService $inquiryService,
        private IURLGenerator $urlGenerator,
        private IL10N $l10n,
        private ?string $userId,
    ) {
    }

    /**
     * @inheritDoc
     */
    public function matchReference(string $referenceText): bool
    {
        // validate url by checking if it contains a inquiry id; This is valid for internal inquiries
        return ($this->extractInquiryId($referenceText) !== 0);
    }

    public function extractInquiryId(string $referenceText): int
    {
        $matchingUrls = [
        $this->urlGenerator->getAbsoluteURL('/apps/' . Application::APP_ID . '/inquiry'), // inquiry url base without index.php
        $this->urlGenerator->getAbsoluteURL('/index.php/apps/' . Application::APP_ID . '/inquiry'), // inquiry url base with index.php
        ];

        foreach ($matchingUrls as $url) {
            preg_match('/^' . preg_quote($url, '/') . '?\/([0-9]+)$/', $referenceText, $matches);
            if ($matches && count($matches) > 1) {
                return (int)$matches[1];
            }
        }
        return 0;
    }


    /**
     * @inheritDoc
     */
    public function resolveReference(string $referenceText): ?IReference
    {
        if ($this->matchReference($referenceText)) {
            $inquiryId = $this->extractInquiryId($referenceText);
            $expired = false;
            $expiry = 0;
            $participated = false;


            if ($inquiryId) {
                try {
                    $inquiry = $this->inquiryService->get($inquiryId);
                    $title = $this->l10n->t('Inquiry: %s', $inquiry->getTitle());
                    $description = $inquiry->getDescription();
                    $ownerId = $inquiry->getUser()->getId();
                    $ownerDisplayName = $inquiry->getUser()->getDisplayName();
                    $url = $inquiry->getSupportUrl();
                    $expired = $inquiry->getExpired();
                    $expiry = $inquiry->getExpire();

                } catch (NotFoundException $e) {
                    $inquiryId = 0;
                    $title = $this->l10n->t('404 - Inquiry not found');
                    $description = $this->l10n->t('This inquiry does not exist (anymore).');
                    $ownerId = null;
                    $ownerDisplayName = $this->l10n->t('No one.');
                    $url = null;

                } catch (ForbiddenException $e) {
                    $owner = $this->inquiryService->getInquiryOwnerFromDB($inquiryId);
                    $title = $this->l10n->t('Access denied');
                    $ownerDisplayName = $owner->getDisplayName();
                    $description = $this->l10n->t('You have no access to this inquiry. Contact %s if you think this is a mistake.', $ownerDisplayName);
                    $ownerId = $owner->getId();
                    $url = $referenceText;

                } catch (Exception $e) {
                    // skip the reference silently
                    return null;
                }

                $reference = new Reference($referenceText);
                $reference->setTitle($title);
                $reference->setDescription($description ? $description : $this->l10n->t('No description available.'));
                $reference->setImageUrl($this->getIconUrl());
                $reference->setRichObject(
                    Application::APP_ID . '_reference_widget', [
                    'id' => $inquiryId,
                    'inquiry' => [
                    'id' => $inquiryId,
                    'title' => $title,
                    'description' => $description ? $description : $this->l10n->t('No description available.'),
                    'ownerDisplayName' => $ownerDisplayName,
                    'ownerId' => $ownerId,
                    'url' => $url,
                    'expired' => $expired,
                    'expiry' => $expiry,
                    'participated' => $participated,
                    ],
                    ]
                );
                return $reference;
            }
        }

        return null;
    }

    public function getCachePrefix(string $referenceId): string
    {
        $inquiryId = $this->extractInquiryId($referenceId);
        if ($inquiryId !== 0) {
            return (string)$inquiryId;
        }

        return $referenceId;
    }

    public function getCacheKey(string $referenceId): ?string
    {
        return $this->userId ?? '';
    }
    public function getId(): string
    {
        return Application::APP_ID;
    }
    public function getTitle(): string
    {
        return $this->l10n->t('Agora');
    }

    public function getIconUrl(): string
    {
        return $this->urlGenerator->imagePath(Application::APP_ID, 'agora.svg');
    }

    public function getOrder(): int
    {
        return 51;
    }

    public function getSupportedSearchProviderIds(): array
    {
        return ['search-inquiry'];
    }
}
