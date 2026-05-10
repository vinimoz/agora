<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\SupportEngine;
use OCA\Agora\Service\SupportEngineService;
use OCA\Agora\Service\SupportResultService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportEngineController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportEngineService $engineService,
        private SupportResultService $resultService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all engines for an inquiry
     *
     * @psalm-return JSONResponse<array{engines: array<SupportEngine>}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/inquiry/{inquiryId}')]
    public function getEnginesByInquiry(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'engines' => $this->engineService->getEnginesByInquiry($inquiryId)
            ]
        );
    }

    /**
     * Get all engines for an inquiry group
     *
     * @psalm-return JSONResponse<array{engines: array<SupportEngine>}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/inquiry-group/{inquiryGroupId}')]
    public function getEnginesByInquiryGroup(int $inquiryGroupId): JSONResponse
    {
        return $this->response(
            fn () => [
                'engines' => $this->engineService->getEnginesByInquiryGroup($inquiryGroupId)
            ]
        );
    }

    /**
     * Get a single engine
     *
     * @psalm-return JSONResponse<array{engine: SupportEngine}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{id}')]
    public function getEngine(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'engine' => $this->engineService->getEngine($id)
            ]
        );
    }

    /**
     * Create a new engine
     *
     * @psalm-return JSONResponse<SupportEngine>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/engine')]
    public function create(): JSONResponse
    {
        $data = $this->request->getParsedBody();
        return $this->response(
            fn () => $this->engineService->createEngine($data),
            Http::STATUS_CREATED
        );
    }

    /**
     * Update engine configuration
     *
     * @psalm-return JSONResponse<SupportEngine>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/support/engine/{id}')]
    public function update(int $id): JSONResponse
    {
        $data = $this->request->getParsedBody();
        return $this->response(
            fn () => $this->engineService->updateEngine($id, $data)
        );
    }

    /**
     * Delete an engine
     *
     * @psalm-return JSONResponse<array{success: bool}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/support/engine/{id}')]
    public function delete(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'success' => $this->engineService->deleteEngine($id)
            ]
        );
    }

    /**
     * Get engine results
     *
     * @psalm-return JSONResponse<array{results: array}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{engineId}/results')]
    public function getEngineResults(int $engineId): JSONResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->resultService->getResultsByEngine($engineId)
            ]
        );
    }

    /**
     * Calculate results for an engine
     *
     * @psalm-return JSONResponse<array{results: array}>
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
     * Export results
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
}
