<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryLinkService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;

/**
 * @psalm-api
 */
class InquiryLinkController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquiryLinkService $inquiryLinkService,
        IUserSession $userSession,
    ) {
        parent::__construct($appName, $request);
    }
    /**
     * Get all links for an inquiry
     *
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/links')]
    public function listByInquiry(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'links' => $this->inquiryLinkService->findByInquiryId($inquiryId)
            ]
        );
    }

    /**
     * Get links by target
     *
     * @param string $targetApp  Target application
     * @param string $targetType Target type
     * @param string $targetId   Target ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/links/target/{targetApp}/{targetType}/{targetId}')]
    public function listByTarget(string $targetApp, string $targetType, string $targetId): JSONResponse
    {
        return $this->response(
            fn () => [
                'links' => $this->inquiryLinkService->findByTarget($targetApp, $targetType, $targetId)
            ]
        );
    }

    /**
     * Get links by target application
     *
     * @param string $targetApp Target application
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/links/target-app/{targetApp}')]
    public function listByTargetApp(string $targetApp): JSONResponse
    {
        return $this->response(
            fn () => [
                'links' => $this->inquiryLinkService->findByTargetApp($targetApp)
            ]
        );
    }

    /**
     * Get a specific link
     *
     * @param int $id Link ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/link/{id}')]
    public function get(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'link' => $this->inquiryLinkService->find($id)
            ]
        );
    }

    /**
     * Create a new link
     *
     * @param int    $inquiryId  Inquiry ID
     * @param string $targetApp  Target application
     * @param string $targetType Target type
     * @param string $targetId   Target ID
     * @param string $metadata   Target URL
     * @param int    $sortOrder  Sort order
     * @param int    $createdBy  Created by user ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/link')]
    public function create(
        int $inquiryId,
        string $targetApp,
        string $targetType,
        string $targetId,
        string $metadata,
        int $sortOrder = 0,
        int $createdBy = 0
    ): JSONResponse {
        return $this->response(
            fn () => [
                'link' => $this->inquiryLinkService->create(
                    $inquiryId,
                    $targetApp,
                    $targetType,
                    $targetId,
                    $metadata,
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
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/links')]
    public function createMultiple(int $inquiryId, array $links): JSONResponse
    {
        return $this->response(
            fn () => [
                'links' => $this->inquiryLinkService->createLinksForInquiry($inquiryId, $links)
            ]
        );
    }

    /**
     * Update a link
     *
     * @param int    $id         Link ID
     * @param string $targetApp  Target application
     * @param string $targetType Target type
     * @param string $targetId   Target ID
     * @param int    $sortOrder  Sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/link/{id}')]
    public function update(
        int $id,
        string $targetApp,
        string $targetType,
        string $targetId,
        string $metadata,
        int $sortOrder = 0
    ): JSONResponse {
        return $this->response(
            fn () => [
                'link' => $this->inquiryLinkService->update(
                    $id,
                    $targetApp,
                    $targetType,
                    $targetId,
                    $metadata,
                    $sortOrder
                )
            ]
        );
    }

    /**
     * Delete a link
     *
     * @param int $id Link ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/link/{id}')]
    public function delete(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'link' => $this->inquiryLinkService->delete($id)
            ]
        );
    }

    /**
     * Delete all links for an inquiry
     *
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/{inquiryId}/links')]
    public function deleteByInquiry(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'deleted' => $this->inquiryLinkService->deleteByInquiryId($inquiryId)
            ]
        );
    }
}
