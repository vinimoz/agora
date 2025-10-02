<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SupportService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportService $supportService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Add support for an inquiry
  *
     * @param int    $inquiryId ID of the inquiry to support
     * @param string $userId    User ID adding support
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/support/{inquiryId}/{userId}', requirements: ['apiVersion' => '(v2)'])]
    public function add(int $inquiryId, string $userId): DataResponse
    {
        return $this->response(fn () => ['support' => $this->supportService->addSupport($inquiryId, $userId)]);
    }

    /**
     * Remove support from an user of an inquiry
  *
     * @param int    $inquiryId ID of the inquiry
     * @param string $userId    User ID removing support
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry/support/{inquiryId}/{userId}', requirements: ['apiVersion' => '(v2)'])]
    public function remove(int $inquiryId, string $userId): DataResponse
    {
        return $this->response(fn () => ['support' => $this->supportService->removeSupport($inquiryId, $userId)]);
    }

    /**
     * Remove all supports for an inquiry
  *
     * @param int $inquiryId ID of the inquiry
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry/support/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function removeAll(int $inquiryId): DataResponse
    {
        return $this->response(
            function () use ($inquiryId) {
                $this->supportService->removeAllSupportForInquiry($inquiryId);
                return ['status' => 'success'];
            }
        );
    }

    /**
     * Get all supports for a user
  *
     * @param string $userId User ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/user/{userId}/supports', requirements: ['apiVersion' => '(v2)'])]
    public function getByUser(string $userId): DataResponse
    {
        return $this->response(
            fn () => [
                    'supports' => $this->supportService->getSupportsForUser($userId)
                ]
        );
    }

    /**
     * Get all supports for an inquiry
  *
     * @param int $inquiryId ID of the inquiry
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/supports', requirements: ['apiVersion' => '(v2)'])]
    public function getByInquiryId(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => [
                    'supports' => $this->supportService->getSupportByInquiryId($inquiryId)
                ]
        );
    }

    /**
     * Get support statistics grouped by inquiry type
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/supports/stats/grouped', requirements: ['apiVersion' => '(v2)'])]
    public function getGroupedStats(): DataResponse
    {
        return $this->response(
            fn () => $this->supportService->getStatsGroupedByType()
        );
    }

}
