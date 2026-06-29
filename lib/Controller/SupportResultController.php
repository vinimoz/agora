<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SupportResultService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class SupportResultController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportResultService $supportResultService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get results for a support engine
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{engineId}/results')]
    public function getResults(int $engineId): JSONResponse
    {
        return $this->response(fn () => [
            'results' => $this->supportResultService->getResultsByEngine($engineId),
        ]);
    }

    /**
     * Calculate/refresh results for an engine
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/engine/{engineId}/calculate')]
    public function calculate(int $engineId): JSONResponse
    {
        return $this->response(fn () => [
            'results' => $this->supportResultService->calculateResults($engineId),
        ]);
    }

    /**
     * Export engine results
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{engineId}/results/export')]
    public function export(int $engineId): JSONResponse
    {
        $format = $this->request->getParam('format', 'json');
        $data = $this->supportResultService->exportResults($engineId, $format);
        if ($format === 'csv') {
            return new JSONResponse(['csv' => $data]); // Or use StreamResponse for file download
        }
        return new JSONResponse(['results' => $data]);
    }

    /**
     * Get results for a specific target
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/results/{targetType}/{targetId}')]
    public function getByTarget(string $targetType, int $targetId): JSONResponse
    {
        $engineId = $this->request->getParam('engineId', 0);
        return $this->response(fn () => [
            'results' => $this->supportResultService->getResultsByTarget($targetType, $targetId, (int) $engineId),
        ]);
    }
}
