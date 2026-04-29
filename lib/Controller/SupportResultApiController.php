<?php
// Controller/SupportResultApiController.php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SupportResultService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportResultApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportResultService $resultService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get results for a specific support engine
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/engine/{engineId}/results', requirements: ['apiVersion' => '(v2)'])]
    public function getResultsByEngine(int $engineId): DataResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->resultService->getResultsByEngine($engineId)
            ]
        );
    }

    /**
     * Get results for a specific target
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/results/{targetType}/{targetId}', requirements: ['apiVersion' => '(v2)'])]
    public function getResultsByTarget(string $targetType, int $targetId): DataResponse
    {
        $engineId = $this->request->getParam('engineId') ? (int) $this->request->getParam('engineId') : null;
        
        return $this->response(
            fn () => [
                'results' => $this->resultService->getResultsByTarget($targetType, $targetId, $engineId)
            ]
        );
    }

    /**
     * Get a single result by ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/result/{resultId}', requirements: ['apiVersion' => '(v2)'])]
    public function getResult(int $resultId): DataResponse
    {
        return $this->response(
            fn () => [
                'result' => $this->resultService->getResult($resultId)
            ]
        );
    }

    /**
     * Calculate/refresh results for an engine
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/support/engine/{engineId}/calculate', requirements: ['apiVersion' => '(v2)'])]
    public function calculateResults(int $engineId): DataResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->resultService->calculateResults($engineId)
            ]
        );
    }

    /**
     * Calculate results for a specific target
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/support/engine/{engineId}/calculate/{targetType}/{targetId}', requirements: ['apiVersion' => '(v2)'])]
    public function calculateTargetResults(int $engineId, string $targetType, int $targetId): DataResponse
    {
        return $this->response(
            fn () => [
                'result' => $this->resultService->calculateTargetResults($engineId, $targetType, $targetId)
            ]
        );
    }

    /**
     * Export results
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/engine/{engineId}/results/export', requirements: ['apiVersion' => '(v2)'])]
    public function exportResults(int $engineId): DataResponse
    {
        $format =
