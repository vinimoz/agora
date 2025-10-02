<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\WatchService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class WatchController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private WatchService $watchService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Watch inquiry for updates
  *
     * @param int      $inquiryId inquiry id of inquiry to watch
     * @param int|null $offset    only watch changes after this timestamp
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/watch')]
    public function watchInquiry(int $inquiryId, ?int $offset): JSONResponse
    {
        return $this->response(fn () => ['updates' => $this->watchService->watchUpdates($inquiryId, $offset)]);
    }
}
