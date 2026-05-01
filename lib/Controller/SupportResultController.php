<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\SupportResult;
use OCA\Agora\Service\SupportResultService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportResultController extends BaseController
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
     *
     * @param int $engineId ID of the support engine
     *
     * @psalm-return JSONResponse<array{results: array<SupportResult>}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{engineId}/results')]
    public function getResultsByEngine(int $engineId): JSONResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->resultService->getResultsByEngine($engineId)
            ]
        );
    }

    /**
     * Get results for a specific target (inquiry or option)
     *
     * @param string $targetType The target type ('inquiry' or 'option')
     * @param int $targetId The target ID
     *
     * @psalm-return JSONResponse<array{results: array<SupportResult>}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/results/{targetType}/{targetId}')]
    public function getResultsByTarget(string $targetType, int $targetId): JSONResponse
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
     *
     * @param int $resultId ID of the result
     *
     * @psalm-return JSONResponse<array{result: SupportResult}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/result/{resultId}')]
    public function getResult(int $resultId): JSONResponse
    {
        return $this->response(
            fn () => [
                'result' => $this->resultService->getResult($resultId)
            ]
        );
    }

    /**
     * Calculate/refresh results for an engine
     *
     * @param int $engineId ID of the support engine
     *
     * @psalm-return JSONResponse<array{results: array<SupportResult>}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/engine/{engineId}/calculate')]
    public function calculateResults(int $engineId): JSONResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->resultService->calculateResults($engineId)
            ]
        );
    }

    /**
     * Calculate results for a specific target
     *
     * @param int $engineId ID of the support engine
     * @param string $targetType The target type ('inquiry' or 'option')
     * @param int $targetId The target ID
     *
     * @psalm-return JSONResponse<array{result: SupportResult}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/engine/{engineId}/calculate/{targetType}/{targetId}')]
    public function calculateTargetResults(int $engineId, string $targetType, int $targetId): JSONResponse
    {
        return $this->response(
            fn () => [
                'result' => $this->resultService->calculateTargetResults($engineId, $targetType, $targetId)
            ]
        );
    }

    /**
     * Get live results (real-time aggregated)
     *
     * @param int $engineId ID of the support engine
     *
     * @psalm-return JSONResponse<array{results: array<SupportResult>}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{engineId}/results/live')]
    public function getLiveResults(int $engineId): JSONResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->resultService->getResultsByEngine($engineId)
            ]
        );
    }

    /**
     * Export results in different formats
     *
     * @param int $engineId ID of the support engine
     *
     * @psalm-return JSONResponse<array{results: mixed}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{engineId}/results/export')]
    public function exportResults(int $engineId): JSONResponse
    {
        $format = $this->request->getParam('format', 'json');
        return $this->response(
            fn () => [
                'results' => $this->resultService->exportResults($engineId, $format)
            ]
        );
    }

    /**
     * Get results history/changelog
     *
     * @param int $resultId ID of the result
     *
     * @psalm-return JSONResponse<array{history: array<SupportResult>}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/result/{resultId}/history')]
    public function getResultHistory(int $resultId): JSONResponse
    {
        return $this->response(
            fn () => [
                'history' => $this->resultService->getResultHistory($resultId)
            ]
        );
    }
}
