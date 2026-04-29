<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SupportProcessService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportProcessController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportProcessService $processService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all processes for an engine
     *
     * @psalm-return JSONResponse<array{processes: array}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/process/engine/{engineId}')]
    public function getProcessesByEngine(int $engineId): JSONResponse
    {
        return $this->response(
            fn () => [
                'processes' => $this->processService->getProcessesByEngine($engineId)
            ]
        );
    }

    /**
     * Get active process for an engine
     *
     * @psalm-return JSONResponse<array{process: mixed}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/process/engine/{engineId}/active')]
    public function getActiveProcess(int $engineId): JSONResponse
    {
        return $this->response(
            fn () => [
                'process' => $this->processService->getActiveProcess($engineId)
            ]
        );
    }

    /**
     * Get processes by target
     *
     * @psalm-return JSONResponse<array{processes: array}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/process/target/{targetType}/{targetId}')]
    public function getProcessesByTarget(string $targetType, int $targetId): JSONResponse
    {
        return $this->response(
            fn () => [
                'processes' => $this->processService->getProcessesByTarget($targetType, $targetId)
            ]
        );
    }

    /**
     * Get a single process with results
     *
     * @psalm-return JSONResponse<array{process: mixed}>
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/process/{id}')]
    public function getProcess(int $id): JSONResponse
    {
        return $this->response(
            fn () => [
                'process' => $this->processService->getProcessWithResults($id)
            ]
        );
    }

    /**
     * Create a new process
     *
     * @psalm-return JSONResponse<mixed>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/process')]
    public function create(): JSONResponse
    {
        $data = $this->request->getParsedBody();
        
        return $this->response(
            fn () => $this->processService->createProcess(
                $data['engine_id'],
                $data['target_type'],
                $data['target_id'],
                $data['phase'] ?? 'deliberative',
                $data['metadata'] ?? []
            )
        );
    }

    /**
     * Update process status
     *
     * @psalm-return JSONResponse<array{process: mixed}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/support/process/{id}/status')]
    public function updateStatus(int $id): JSONResponse
    {
        $data = $this->request->getParsedBody();
        
        return $this->response(
            fn () => [
                'process' => $this->processService->updateStatus($id, $data['status'])
            ]
        );
    }

    /**
     * Update process phase
     *
     * @psalm-return JSONResponse<array{process: mixed}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/support/process/{id}/phase')]
    public function updatePhase(int $id): JSONResponse
    {
        $data = $this->request->getParsedBody();
        
        return $this->response(
            fn () => [
                'process' => $this->processService->updatePhase($id, $data['phase'])
            ]
        );
    }

    /**
     * Delete all processes for an engine
     *
     * @psalm-return JSONResponse<array{success: bool}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/support/process/engine/{engineId}')]
    public function deleteProcessesByEngine(int $engineId): JSONResponse
    {
        return $this->response(
            function () use ($engineId) {
                $this->processService->deleteProcessesByEngine($engineId);
                return ['success' => true];
            }
        );
    }
}
