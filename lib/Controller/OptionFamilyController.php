<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\OptionFamilyService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class OptionFamilyController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private OptionTypeFamilyService $optionTypeFamilyService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all inquiry type families
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option-families')]
    public function list(): JSONResponse
    {
        return $this->response(
            fn () => [
                'families' => $this->optionTypeFamilyService->findAllSorted()
            ]
        );
    }

    /**
     * Search inquiry type families
     *
     * @param string $searchTerm Search term
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option-families/search/{searchTerm}')]
    public function search(string $searchTerm): JSONResponse
    {
        return $this->response(
            fn () => [
                'families' => $this->optionTypeFamilyService->findBySearchTerm($searchTerm)
            ]
        );
    }

    /**
     * Get a specific inquiry type family
     *
     * @param int $id Family ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option-family/{id}')]
    public function get(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'family' => $this->optionTypeFamilyService->find($id)
            ]
        );
    }

    /**
     * Get inquiry type family by type
     *
     * @param string $optionType Inquiry type
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option-family/type/{optionType}')]
    public function getByType(string $optionType): JSONResponse
    {
        return $this->response(
            fn () => [
                'family' => $this->optionTypeFamilyService->findByInquiryType($optionType)
            ]
        );
    }

    /**
     * Check if inquiry type exists
     *
     * @param string $optionType Inquiry type to check
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option-family/check/{optionType}')]
    public function checkExists(string $optionType): JSONResponse
    {
        return $this->response(
            fn () => [
                'exists' => $this->optionTypeFamilyService->optionTypeExists($inquiryType)
            ]
        );
    }

    /**
     * Create a new inquiry type family
     *
     * @param string      $optionType Inquiry type
     * @param string      $label       Family label
     * @param string|null $description Family description
     * @param string      $icon        Family icon
     * @param int|null    $sortOrder   Sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/option-family')]
    public function create(
        string $optionType,
        string $label,
        ?string $description = null,
        string $icon = '',
        ?int $sortOrder = null
    ): JSONResponse {
        return $this->response(
            fn () => [
                'family' => $this->optionTypeFamilyService->create(
                    $optionType,
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
     * @param string      $optionType Inquiry type
     * @param string      $label       Family label
     * @param string|null $description Family description
     * @param string      $icon        Family icon
     * @param int|null    $sortOrder   Sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option-family/{id}')]
    public function update(
        int $id,
        string $optionType,
        string $label,
        ?string $description = null,
        string $icon = '',
        ?int $sortOrder = null
    ): JSONResponse {
        return $this->response(
            fn () => [
                'family' => $this->optionTypeFamilyService->update(
                    $id,
                    $optionType,
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
    #[FrontpageRoute(verb: 'PUT', url: '/option-families/sort-orders')]
    public function updateSortOrders(array $sortOrders): JSONResponse
    {
        return $this->response(
            fn () => [
                'success' => $this->optionTypeFamilyService->updateSortOrders($sortOrders)
            ]
        );
    }

    /**
     * Delete an inquiry type family
     *
     * @param int $id Family ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/option-family/{id}')]
    public function delete(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'family' => $this->optionTypeFamilyService->delete($id)
            ]
        );
    }
}
