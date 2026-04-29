<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SupportProcessService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportProcessApiController extends BaseApiV2Controller
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
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/process/engine/{engineId}', requirements: ['apiVersion' => '(v2)'])]
    public function getProcessesByEngine(int $engineId): DataResponse
    {
        return $this->response(
            fn () => [
                'processes' => $this->processService->getProcessesByEngine($engineId)
            ]
        );
    }

    /**
     * Get active process for an engine
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/process/engine/{engineId}/active', requirements: ['apiVersion' => '(v2)'])]
    public function getActiveProcess(int $engineId): DataResponse
    {
        return $this->response(
            fn () => [
                'process' => $this->processService->getActiveProcess($engineId)
            ]
        );
    }

    /**
     * Get processes by target
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/process/target/{targetType}/{targetId}', requirements: ['apiVersion' => '(v2)'])]
    public function getProcessesByTarget(string $targetType, int $targetId): DataResponse
    {
        return $this->response(
            fn () => [
                'processes' => $this->processService->getProcessesByTarget($targetType, $targetId)
            ]
        );
    }

    /**
     * Get a single process with its results
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/process/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function getProcess(int $id): DataResponse
    {
        return $this->response(
            fn () => [
                'process' => $this->processService->getProcessWithResults($id)
            ]
        );
    }

    /**
     * Create a new process
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/support/process', requirements: ['apiVersion' => '(v2)'])]
    public function create(): DataResponse
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
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/support/process/{id}/status', requirements: ['apiVersion' => '(v2)'])]
    public function updateStatus(int $id): DataResponse
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
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/support/process/{id}/phase', requirements: ['apiVersion' => '(v2)'])]
    public function updatePhase(int $id): DataResponse
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
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/support/process/engine/{engineId}', requirements: ['apiVersion' => '(v2)'])]
    public function deleteProcessesByEngine(int $engineId): DataResponse
    {
        return $this->response(
            function () use ($engineId) {
                $this->processService->deleteProcessesByEngine($engineId);
                return ['success' => true];
            }
        );
    }
}
