<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SupportEngineService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportEngineApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportEngineService $engineService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all engines for a group
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/engine/group/{groupId}', requirements: ['apiVersion' => '(v2)'])]
    public function getEngines(int $groupId): DataResponse
    {
        return $this->response(
            fn () => [
                'engines' => $this->engineService->getEnginesByGroup($groupId)
            ]
        );
    }

    /**
     * Get engines by target
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/engine/target/{targetType}/{targetId}', requirements: ['apiVersion' => '(v2)'])]
    public function getEnginesByTarget(string $targetType, int $targetId): DataResponse
    {
        return $this->response(
            fn () => [
                'engines' => $this->engineService->getEnginesByTarget($targetType, $targetId)
            ]
        );
    }

    /**
     * Get active engines by target
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/engine/active/{targetType}/{targetId}', requirements: ['apiVersion' => '(v2)'])]
    public function getActiveEnginesByTarget(string $targetType, int $targetId): DataResponse
    {
        return $this->response(
            fn () => [
                'engines' => $this->engineService->getActiveEnginesByTarget($targetType, $targetId)
            ]
        );
    }

    /**
     * Get a single engine
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/support/engine/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function getEngine(int $id): DataResponse
    {
        return $this->response(
            fn () => [
                'engine' => $this->engineService->getEngine($id)
            ]
        );
    }

    /**
     * Create a new engine
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/support/engine', requirements: ['apiVersion' => '(v2)'])]
    public function create(): DataResponse
    {
        $data = $this->request->getParsedBody();
        return $this->response(
            fn () => $this->engineService->createEngine($data)
        );
    }

    /**
     * Update engine configuration
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/support/engine/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function update(int $id): DataResponse
    {
        $data = $this->request->getParsedBody();
        return $this->response(
            fn () => [
                'engine' => $this->engineService->updateEngine($id, $data)
            ]
        );
    }

    /**
     * Delete an engine
     */
    #[CORS]
    #[NoAdminRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/support/engine/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $id): DataResponse
    {
        return $this->response(
            fn () => [
                'success' => $this->engineService->deleteEngine($id)
            ]
        );
    }
}
