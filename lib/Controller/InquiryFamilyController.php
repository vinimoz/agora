<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryFamilyService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class InquiryFamilyController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquiryTypeFamilyService $inquiryTypeFamilyService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all inquiry type families
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry-families')]
    public function list(): JSONResponse
    {
        return $this->response(
            fn () => [
                'families' => $this->inquiryTypeFamilyService->findAllSorted()
            ]
        );
    }

    /**
     * Search inquiry type families
     *
     * @param string $searchTerm Search term
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry-families/search/{searchTerm}')]
    public function search(string $searchTerm): JSONResponse
    {
        return $this->response(
            fn () => [
                'families' => $this->inquiryTypeFamilyService->findBySearchTerm($searchTerm)
            ]
        );
    }

    /**
     * Get a specific inquiry type family
     *
     * @param int $id Family ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry-family/{id}')]
    public function get(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'family' => $this->inquiryTypeFamilyService->find($id)
            ]
        );
    }

    /**
     * Get inquiry type family by type
     *
     * @param string $inquiryType Inquiry type
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry-family/type/{inquiryType}')]
    public function getByType(string $inquiryType): JSONResponse
    {
        return $this->response(
            fn () => [
                'family' => $this->inquiryTypeFamilyService->findByInquiryType($inquiryType)
            ]
        );
    }

    /**
     * Check if inquiry type exists
     *
     * @param string $inquiryType Inquiry type to check
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry-family/check/{inquiryType}')]
    public function checkExists(string $inquiryType): JSONResponse
    {
        return $this->response(
            fn () => [
                'exists' => $this->inquiryTypeFamilyService->inquiryTypeExists($inquiryType)
            ]
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
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry-family')]
    public function create(
        string $inquiryType,
        string $label,
        ?string $description = null,
        string $icon = '',
        ?int $sortOrder = null
    ): JSONResponse {
        return $this->response(
            fn () => [
                'family' => $this->inquiryTypeFamilyService->create(
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
     * Update an inquiry type family
     *
     * @param int         $id          Family ID
     * @param string      $inquiryType Inquiry type
     * @param string      $label       Family label
     * @param string|null $description Family description
     * @param string      $icon        Family icon
     * @param int|null    $sortOrder   Sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry-family/{id}')]
    public function update(
        int $id,
        string $inquiryType,
        string $label,
        ?string $description = null,
        string $icon = '',
        ?int $sortOrder = null
    ): JSONResponse {
        return $this->response(
            fn () => [
                'family' => $this->inquiryTypeFamilyService->update(
                    $id,
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
     * Update sort orders for multiple families
     *
     * @param array $sortOrders Array of [id => sortOrder] pairs
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry-families/sort-orders')]
    public function updateSortOrders(array $sortOrders): JSONResponse
    {
        return $this->response(
            fn () => [
                'success' => $this->inquiryTypeFamilyService->updateSortOrders($sortOrders)
            ]
        );
    }

    /**
     * Delete an inquiry type family
     *
     * @param int $id Family ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry-family/{id}')]
    public function delete(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'family' => $this->inquiryTypeFamilyService->delete($id)
            ]
        );
    }
}
