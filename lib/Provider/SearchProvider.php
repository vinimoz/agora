<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);


namespace OCA\Agora\Provider;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Model\Search\InquiriesSearchResultEntry;
use OCA\Agora\Service\InquiryService;
use OCP\IL10N;
use OCP\IUser;
use OCP\Search\IProvider;
use OCP\Search\ISearchQuery;
use OCP\Search\SearchResult;

class SearchProvider implements IProvider
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private IL10N $l10n,
        // private IURLGenerator $urlGenerator,
        private InquiryService $inquiryService,
    ) {
    }

    public function getId(): string
    {
        return 'search-inquiry';
    }

    public function getName(): string
    {
        return $this->l10n->t('Agora');
    }

    public function search(IUser $user, ISearchQuery $query): SearchResult
    {
        $inquiries = $this->inquiryService->search($query);

        $results = array_map(
            function (Inquiry $inquiry) {
                return [
                'object' => $inquiry,
                'entry' => new InquiriesSearchResultEntry($inquiry)
                ];
            }, $inquiries
        );

        $resultEntries = array_map(
            function (array $result) {
                return $result['entry'];
            }, $results
        );

        return SearchResult::complete(
            $this->l10n->t('Inquiries'),
            $resultEntries
        );
    }

    public function getOrder(string $route, array $routeParameters): int
    {
        if (in_array(strtolower($route), [AppConstants::APP_ID . '.page.indexindex', AppConstants::APP_ID . '.page.support'])) {
            return -5;
        }
        return 51;
    }
}
