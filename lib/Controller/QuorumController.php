<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\QuorumService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class QuorumController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private QuorumService $quorumService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all quorums for an inquiry
     *
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/quorums')]
    public function listByInquiry(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorums' => $this->quorumService->findByInquiryId($inquiryId)
            ]
        );
    }

    /**
     * Get all quorums for an option
     *
     * @param int $optionId Option ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}/quorums')]
    public function listByOption(int $optionId): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorums' => $this->quorumService->findByOptionId($optionId)
            ]
        );
    }

    /**
     * Get quorums for an inquiry and phase
     *
     * @param int    $inquiryId Inquiry ID
     * @param string $phase     Phase
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/quorums/phase/{phase}')]
    public function listByInquiryAndPhase(int $inquiryId, string $phase): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorums' => $this->quorumService->findByInquiryIdAndPhase($inquiryId, $phase)
            ]
        );
    }

    /**
     * Get quorums for an option and phase
     *
     * @param int    $optionId Option ID
     * @param string $phase    Phase
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}/quorums/phase/{phase}')]
    public function listByOptionAndPhase(int $optionId, string $phase): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorums' => $this->quorumService->findByOptionIdAndPhase($optionId, $phase)
            ]
        );
    }

    /**
     * Get a specific quorum
     *
     * @param int $id Quorum ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/quorum/{id}')]
    public function get(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorum' => $this->quorumService->find($id)
            ]
        );
    }

    /**
     * Get quorum by inquiry, phase and type
     *
     * @param int    $inquiryId Inquiry ID
     * @param string $phase     Phase
     * @param string $type      Type
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/quorum/phase/{phase}/type/{type}')]
    public function getByInquiryPhaseType(int $inquiryId, string $phase, string $type): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorum' => $this->quorumService->findByInquiryIdAndPhaseAndType($inquiryId, $phase, $type)
            ]
        );
    }

    /**
     * Create a new quorum
     *
     * @param int         $inquiryId   Inquiry ID
     * @param int         $optionId    Option ID
     * @param string      $phase       Phase
     * @param string      $type        Type
     * @param float       $value       Value
     * @param string      $base        Base
     * @param string|null $description Description
     * @param int|null    $sortOrder   Sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/quorum')]
    public function create(
        int $inquiryId,
        int $optionId,
        string $phase,
        string $type,
        float $value,
        string $base,
        ?string $description = null,
        ?int $sortOrder = null
    ): JSONResponse {
        return $this->response(
            fn () => [
                'quorum' => $this->quorumService->create(
                    $inquiryId,
                    $optionId,
                    $phase,
                    $type,
                    $value,
                    $base,
                    $description,
                    $sortOrder
                )
            ]
        );
    }

    /**
     * Update a quorum
     *
     * @param int         $id          Quorum ID
     * @param string      $phase       Phase
     * @param string      $type        Type
     * @param float       $value       Value
     * @param string      $base        Base
     * @param string|null $description Description
     * @param int|null    $sortOrder   Sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/quorum/{id}')]
    public function update(
        int $id,
        string $phase,
        string $type,
        float $value,
        string $base,
        ?string $description = null,
        ?int $sortOrder = null
    ): JSONResponse {
        return $this->response(
            fn () => [
                'quorum' => $this->quorumService->update(
                    $id,
                    $phase,
                    $type,
                    $value,
                    $base,
                    $description,
                    $sortOrder
                )
            ]
        );
    }

    /**
     * Update sort orders for multiple quorums
     *
     * @param array $sortOrders Array of [id => sortOrder] pairs
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/quorums/sort-orders')]
    public function updateSortOrders(array $sortOrders): JSONResponse
    {
        return $this->response(
            fn () => [
                'success' => $this->quorumService->updateSortOrders($sortOrders)
            ]
        );
    }

    /**
     * Delete a quorum
     *
     * @param int $id Quorum ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/quorum/{id}')]
    public function delete(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'quorum' => $this->quorumService->delete($id)
            ]
        );
    }

    /**
     * Delete all quorums for an inquiry
     *
     * @param int $inquiryId Inquiry ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/{inquiryId}/quorums')]
    public function deleteByInquiry(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'deleted' => $this->quorumService->deleteByInquiryId($inquiryId)
            ]
        );
    }

    /**
     * Delete all quorums for an option
     *
     * @param int $optionId Option ID
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/option/{optionId}/quorums')]
    public function deleteByOption(int $optionId): JSONResponse
    {
        return $this->response(
            fn () => [
                'deleted' => $this->quorumService->deleteByOptionId($optionId)
            ]
        );
    }

    /**
     * Check if quorum is reached
     *
     * @param int $id          Quorum ID
     * @param int $actualCount Actual count
     * @param int $totalCount  Total count
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/quorum/{id}/check')]
    public function checkQuorum(int $id, int $actualCount, int $totalCount): JSONResponse
    {
        return $this->response(
            fn () => [
                'reached' => $this->quorumService->isQuorumReached(
                    $this->quorumService->find($id),
                    $actualCount,
                    $totalCount
                )
            ]
        );
    }
}
