<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SettingsService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 **/

class LocationController extends BaseController
{
    private LocationMapper $locationMapper;

    public function __construct(
        string $appName,
        IRequest $request,
        LocationMapper $locationMapper
    ) {
        parent::__construct($appName, $request);
        $this->locationMapper = $locationMapper;
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function getAll(): JSONResponse
    {
        return new JSONResponse($this->locationMapper->findAll());
    }
}

