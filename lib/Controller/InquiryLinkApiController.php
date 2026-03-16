<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryLinkService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class InquiryLinkApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquiryLinkService $inquiryLinkService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all links for an inquiry
     *
     * @param int $inquiryId Inquiry ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/links', requirements: ['apiVersion' => '(v2)'])]
    public function listByInquiry(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => ['links' => $this->inquiryLinkService->findByInquiryId($inquiryId)]
        );
    }

    /**
     * Get links by target
     *
     * @param string $targetApp  Target application
     * @param string $targetType Target type
     * @param string $targetId   Target ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/links/target/{targetApp}/{targetType}/{targetId}', requirements: ['apiVersion' => '(v2)'])]
    public function listByTarget(string $targetApp, string $targetType, string $targetId): DataResponse
    {
        return $this->response(
            fn () => ['links' => $this->inquiryLinkService->findByTarget($targetApp, $targetType, $targetId)]
        );
    }

    /**
     * Get a specific link
     *
     * @param int $id Link ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/link/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $id): DataResponse
    {
        return $this->response(
            fn () => ['link' => $this->inquiryLinkService->find($id)]
        );
    }

    /**
     * Create a new link
     *
     * @param int    $inquiryId  Inquiry ID
     * @param string $targetApp  Target application
     * @param string $targetType Target type
     * @param string $targetId   Target ID
     * @param int    $sortOrder  Sort order
     * @param int    $createdBy  Created by user ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/link', requirements: ['apiVersion' => '(v2)'])]
    public function create(
        int $inquiryId,
        string $targetApp,
        string $targetType,
        string $targetId,
        int $sortOrder = 0,
        int $createdBy = 0
    ): DataResponse {
        return $this->response(
            fn () => [
                'link' => $this->inquiryLinkService->create(
                    $inquiryId,
                    $targetApp,
                    $targetType,
                    $targetId,
                    $sortOrder,
                    $createdBy
                )
            ]
        );
    }

    /**
     * Create multiple links for an inquiry
     *
     * @param int   $inquiryId Inquiry ID
     * @param array $links     Array of links data
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/{inquiryId}/links', requirements: ['apiVersion' => '(v2)'])]
    public function createMultiple(int $inquiryId, array $links): DataResponse
    {
        return $this->response(
            fn () => ['links' => $this->inquiryLinkService->createLinksForInquiry($inquiryId, $links)]
        );
    }

    /**
     * Delete a link
     *
     * @param int $id Link ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/link/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $id): DataResponse
    {
        return $this->response(
            fn () => ['link' => $this->inquiryLinkService->delete($id)]
        );
    }

    /**
     * Delete all links for an inquiry
     *
     * @param int $inquiryId Inquiry ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry/{inquiryId}/links', requirements: ['apiVersion' => '(v2)'])]
    public function deleteByInquiry(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => ['deleted' => $this->inquiryLinkService->deleteByInquiryId($inquiryId)]
        );
    }
}
