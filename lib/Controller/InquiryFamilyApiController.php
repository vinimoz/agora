<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryFamilyService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class InquiryFamilyApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquiryFamilyService $inquiryFamilyService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all inquiry type families
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-families', requirements: ['apiVersion' => '(v2)'])]
    public function list(): DataResponse
    {
        return $this->response(
            fn () => ['families' => $this->inquiryFamilyService->findAllSorted()]
        );
    }

    /**
     * Get a specific inquiry type family
     *
     * @param int $id Family ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-family/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $id): DataResponse
    {
        return $this->response(
            fn () => ['family' => $this->inquiryFamilyService->find($id)]
        );
    }

    /**
     * Get inquiry type family by type
     *
     * @param string $inquiryType Inquiry type
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-family/{inquiryType}', requirements: ['apiVersion' => '(v2)'])]
    public function getByType(string $inquiryType): DataResponse
    {
        return $this->response(
            fn () => ['family' => $this->inquiryFamilyService->findByInquiry($inquiryType)]
        );
    }

    /**
     * Create a new inquiry type family
     *
     * @param string      $inquiryType Inquiry type
     * @param string      $label       Family label
     * @param string|null $description Family description
     * @param string      $icon        Family icon
     * @param int|null    $sortOrder   Sort order
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry-amily', requirements: ['apiVersion' => '(v2)'])]
    public function create(
        string $inquiryType,
        string $label,
        ?string $description = null,
        string $icon = '',
        ?int $sortOrder = null
    ): DataResponse {
        return $this->response(
            fn () => [
                'family' => $this->inquiryFamilyService->create(
                    $inquiryType,
                    $label,
                    $description,
                    $icon,
                    $sortOrder
                )
            ]
        );
    }

    /**
     * Delete an inquiry type family
     *
     * @param int $id Family ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry-family/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $id): DataResponse
    {
        return $this->response(
            fn () => ['family' => $this->inquiryFamilyService->delete($id)]
        );
    }
}
