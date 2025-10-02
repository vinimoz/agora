<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SubscriptionService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SubscriptionApiController extends BaseApiV2Controller
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
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/subscription', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => [
                'inquiryId' => $inquiryId,
                'subscribed' => $this->subscriptionService->get($inquiryId),
            ]
        );
    }

    /**
     * Subscribe to inquiry
  *
     * @param int $inquiryId inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/subscription', requirements: ['apiVersion' => '(v2)'])]
    public function subscribe(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => [
                'inquiryId' => $inquiryId,
                'subscribed' => $this->subscriptionService->set(true, $inquiryId),
            ]
        );
    }

    /**
     * Unsubscribe from inquiry
  *
     * @param int $inquiryId inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry/{inquiryId}/subscription', requirements: ['apiVersion' => '(v2)'])]
    public function unsubscribe(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => [
                'inquiryId' => $inquiryId,
                'subscribed' => $this->subscriptionService->set(false, $inquiryId),
            ]
        );
    }
}
