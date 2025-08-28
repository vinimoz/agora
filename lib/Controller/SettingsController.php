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
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SettingsController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SettingsService $settingsService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Read app settings
     */
    #[NoAdminRequired]
    #[PublicPage]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/settings/app')]
    public function getAppSettings(): JSONResponse
    {
        return $this->response(fn () => ['appSettings' => $this->settingsService->getAppSettings()]);
    }

    /**
     * Write app settings
  *
     * @param array $appSettings Settings as array
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/settings/app')]
    public function writeAppSettings(array $appSettings): JSONResponse
    {
        $this->settingsService->writeAppSettings($appSettings);
        return $this->response(fn () => ['appSettings' => $this->settingsService->getAppSettings()]);
    }

    /**
     * Add a category
  *
     * @param array $category Category data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/settings/categories')]
    public function addCategory(array $category): JSONResponse
    {
        $newCategory = $this->settingsService->addCategory($category);
        return $this->response(fn () => ['category' => $newCategory]);
    }

    /**
     * Delete a category
  *
     * @param string $categoryId Category ID
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/settings/categories/{categoryId}')]
    public function deleteCategory(string $categoryId): JSONResponse
    {
        $this->settingsService->deleteCategory($categoryId);
        return $this->response(fn () => []);
    }

    /**
     * Update a category
  *
     * @param string $categoryId Category ID
     * @param array  $category   Category data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/settings/categories/{categoryId}')]
    public function updateCategory(string $categoryId): JSONResponse
    {
        $category = $this->request->getParams();
        if ($category === null && json_last_error() !== JSON_ERROR_NONE) {
              return new JSONResponse(['error' => 'Invalid JSON data'], Http::STATUS_BAD_REQUEST);
        }
    
            $updatedCategory = $this->settingsService->updateCategory($categoryId, (array)$category);
            return $this->response(fn () => ['category' => (array) $updatedCategory]);    
    }

    /**
     * Add a location
  *
     * @param array $location Location data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/settings/locations')]
    public function addLocation(array $location): JSONResponse
    {
        $newLocation = $this->settingsService->addLocation($location);
        return $this->response(fn () => ['location' => $newLocation]);
    }

    /**
     * Delete a location
  *
     * @param string $locationId Location ID
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/settings/locations/{locationId}')]
    public function deleteLocation(string $locationId): JSONResponse
    {
        $this->settingsService->deleteLocation($locationId);
        return $this->response(fn () => []);
    }

    /**
     * Update a location
  *
     * @param string $locationId Location ID
     * @param array  $location   Location data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/settings/locations/{locationId}')]
    public function updateLocation(string $locationId): JSONResponse
    {
        $location = $this->request->getParams();
        if ($location === null && json_last_error() !== JSON_ERROR_NONE) {
              return new JSONResponse(['error' => 'Invalid JSON data'], Http::STATUS_BAD_REQUEST);
        }
    
            $updatedLocation = $this->settingsService->updateLocation($locationId, (array)$location);
        return $this->response(fn () => ['location' => $updatedLocation]);
    }

    /**
     * Add a moderation status
  *
     * @param array $moderationStatus Moderation status data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/settings/moderation-statuses')]
    public function addModerationStatus(array $moderationStatus): JSONResponse
    {
        $newModerationStatus = $this->settingsService->addModerationStatus($moderationStatus);
        return $this->response(fn () => ['moderationStatus' => $newModerationStatus]);
    }

    /**
     * Delete a moderation status
  *
     * @param string $moderationStatusId Moderation status ID
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/settings/moderation-statuses/{moderationStatusId}')]
    public function deleteModerationStatus(string $moderationStatusId): JSONResponse
    {
        $this->settingsService->deleteModerationStatus($moderationStatusId);
        return $this->response(fn () => []);
    }

    /**
     * Update a moderation status
  *
     * @param string $moderationStatusId Moderation status ID
     * @param array  $moderationStatus   Moderation status data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/settings/moderation-statuses/{moderationStatusId}')]
    public function updateModerationStatus(string $moderationStatusId, array $moderationStatus): JSONResponse
    {
        $updatedModerationStatus = $this->settingsService->updateModerationStatus($moderationStatusId, $moderationStatus);
        return $this->response(fn () => ['moderationStatus' => $updatedModerationStatus]);
    }

    /**
     * Add a type
  *
     * @param array $type Type data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/settings/types')]
    public function addType(array $type): JSONResponse
    {
        $newType = $this->settingsService->addType($type);
        return $this->response(fn () => ['type' => $newType]);
    }

    /**
     * Delete a type
  *
     * @param string $typeId Type ID
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/settings/types/{typeId}')]
    public function deleteType(string $typeId): JSONResponse
    {
        $this->settingsService->deleteType($typeId);
        return $this->response(fn () => []);
    }

    /**
     * Update a type
  *
     * @param string $typeId Type ID
     * @param array  $type   Type data
     */
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/settings/types/{typeId}')]
    public function updateType(string $typeId, array $type): JSONResponse
    {
        $updatedType = $this->settingsService->updateType($typeId, $type);
        return $this->response(fn () => ['type' => $updatedType]);
    }
}
