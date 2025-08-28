<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SystemService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SystemController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SystemService $systemService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get a combined list of NC users, groups and contacts
  *
     * @param string $query Search string
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/search/users/{query}')]
    public function userSearch(string $query, string $types): JSONResponse
    {
        $types = array_map('intval', explode(',', $types));
        // $types = explode(',', $types);
        return new JSONResponse(
            [
            'siteusers' => $this->systemService->getSiteUsersAndGroups($query, $types),
            'types' => $types
            ], Http::STATUS_OK
        );
    }
    /**
     * Get a combined list of all NC groups
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/groups')]
    public function groupAll(): JSONResponse
    {
        return new JSONResponse(['groups' => $this->systemService->getGroups()], Http::STATUS_OK);
    }

    /**
     * Get a combined list of NC groups matching $query
  *
     * @param string $query Search string
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/groups/{query}')]
    public function groupSearch(string $query = ''): JSONResponse
    {
        return new JSONResponse(
            ['groups' => $this->systemService->getGroups(
                $query
            )], Http::STATUS_OK
        );
    }
}
