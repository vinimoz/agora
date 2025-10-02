<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SubscriptionService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SubscriptionController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SubscriptionService $subscriptionService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get subscription status
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/subscription')]
    public function get(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'subscribed' => $this->subscriptionService->get($inquiryId)
            ]
        );
    }

    /**
     * Subscribe
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/subscribe')]
    public function subscribe(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'subscribed' => $this->subscriptionService->set(true, $inquiryId)
            ]
        );
    }

    /**
     * Unsubscribe
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/unsubscribe')]
    public function unsubscribe(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'subscribed' => $this->subscriptionService->set(false, $inquiryId)
            ]
        );
    }
}
