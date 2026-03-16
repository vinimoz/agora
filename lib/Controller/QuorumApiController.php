<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\QuorumService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class QuorumApiController extends BaseApiV2Controller
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
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/quorums', requirements: ['apiVersion' => '(v2)'])]
    public function listByInquiry(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => ['quorums' => $this->quorumService->findByInquiryId($inquiryId)]
        );
    }

    /**
     * Get all quorums for an option
     *
     * @param int $optionId Option ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/option/{optionId}/quorums', requirements: ['apiVersion' => '(v2)'])]
    public function listByOption(int $optionId): DataResponse
    {
        return $this->response(
            fn () => ['quorums' => $this->quorumService->findByOptionId($optionId)]
        );
    }

    /**
     * Get a specific quorum
     *
     * @param int $id Quorum ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/quorum/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $id): DataResponse
    {
        return $this->response(
            fn () => ['quorum' => $this->quorumService->find($id)]
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
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/quorum', requirements: ['apiVersion' => '(v2)'])]
    public function create(
        int $inquiryId,
        int $optionId,
        string $phase,
        string $type,
        float $value,
        string $base,
        ?string $description = null,
        ?int $sortOrder = null
    ): DataResponse {
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
     * Delete a quorum
     *
     * @param int $id Quorum ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/quorum/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $id): DataResponse
    {
        return $this->response(
            fn () => ['quorum' => $this->quorumService->delete($id)]
        );
    }

    /**
     * Check if quorum is reached
     *
     * @param int $id          Quorum ID
     * @param int $actualCount Actual count
     * @param int $totalCount  Total count
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/quorum/{id}/check', requirements: ['apiVersion' => '(v2)'])]
    public function checkQuorum(int $id, int $actualCount, int $totalCount): DataResponse
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
