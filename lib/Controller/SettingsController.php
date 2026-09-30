<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\SettingsService;
use OCA\Agora\Service\InquiryOptionTypeService;
use OCA\Agora\Service\InquiryGroupTypeService;
use OCA\Agora\Service\OptionFamilyService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\AppFramework\Db\DoesNotExistException;

/**
 * @psalm-api
 */
class SettingsController extends BaseController
{
	public function __construct(
		string $appName,
		IRequest $request,
		private SettingsService $settingsService,
	private InquiryOptionTypeService $inquiryOptionTypeService,     
	private InquiryGroupTypeService $inquiryGroupTypeService,     
	private OptionFamilyService $optionFamilyService,
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

	//CATEGORY

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

	//LOCATION

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


	//INQUIRYSTATUS
	/**
	 * Add a inquiry status
	 *
	 * @param array $inquiryStatus Inquiry status data
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'POST', url: '/settings/inquiry-statuses')]
	public function addInquiryStatus(array $inquiryStatus): JSONResponse
	{
		$newInquiryStatus = $this->settingsService->addInquiryStatus($inquiryStatus);
		return $this->response(fn () => ['inquiryStatus' => $newInquiryStatus]);
	}

	/**
	 * Delete a inquiry status
	 *
	 * @param string $inquiryStatusId Inquiry status ID
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'DELETE', url: '/settings/inquiry-statuses/{inquiryStatusId}')]
	public function deleteInquiryStatus(string $inquiryStatusId): JSONResponse
	{
		$this->settingsService->deleteInquiryStatus($inquiryStatusId);
		return $this->response(fn () => []);
	}

	/**
	 * Update a inquiry status
	 *
	 * @param string $inquiryStatusId Inquiry status ID
	 * @param array  $inquiryStatus   Inquiry status data
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'PUT', url: '/settings/inquiry-statuses/{inquiryStatusId}')]
	public function updatInquiryStatus(string $inquiryStatusId, array $inquiryStatus): JSONResponse
	{
		$updatedInquiryStatus = $this->settingsService->updateInquiryStatus($inquiryStatusId, $inquiryStatus);
		return $this->response(fn () => ['inquiryStatus' => $updatedInquiryStatus]);
	}

	//MODERATIONSTATUS

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


	//INQUIRY TYPE

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

	//INQUIRY TYPE METHODS
	/**
	 * Add an inquiry type
	 *
	 * @param array $type Type data
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'POST', url: '/inquiry/types')]
	public function addInquiryType(array $type): JSONResponse
	{
		$newType = $this->settingsService->addInquiryType($type);
		return $this->response(fn () => ['type' => $newType]);
	}

	/**
	 * Delete an inquiry type
	 *
	 * @param string $typeId Type ID
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'DELETE', url: '/inquiry/types/{typeId}')]
	public function deleteInquiryType(string $typeId): JSONResponse
	{
		$this->settingsService->deleteInquiryType($typeId);
		return $this->response(fn () => []);
	}

	/**
	 * Update an inquiry type
	 *
	 * @param string $typeId Type ID
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'PUT', url: '/inquiry/types/{typeId}')]
	public function updateInquiryType(string $typeId): JSONResponse
	{
		$type = $this->request->getParams();
		if ($type === null && json_last_error() !== JSON_ERROR_NONE) {
			return new JSONResponse(['error' => 'Invalid JSON data'], Http::STATUS_BAD_REQUEST);
		}

		$updatedType = $this->settingsService->updateInquiryType($typeId, (array)$type);
		return $this->response(fn () => ['type' => (array) $updatedType]);
	}

	//FAMILY METHODS
	/**
	 * Add an inquiry family
	 *
	 * @param array $family Family data
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'POST', url: '/inquiry/families')]
	public function addInquiryFamily(array $family): JSONResponse
	{
		$newFamily = $this->settingsService->addInquiryFamily($family);
		return $this->response(fn () => ['family' => $newFamily]);
	}

	/**
	 * Delete an inquiry family
	 *
	 * @param string $familyId Family ID
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'DELETE', url: '/inquiry/families/{familyId}')]
	public function deleteInquiryFamily(string $familyId): JSONResponse
	{
		$this->settingsService->deleteInquiryFamily($familyId);
		return $this->response(fn () => []);
	}

	/**
	 * Update an inquiry family
	 *
	 * @param string $familyId Family ID
	 */
	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'PUT', url: '/inquiry/families/{familyId}')]
	public function updateInquiryFamily(string $familyId): JSONResponse
	{
		$family = $this->request->getParams('familyData');

		if ($family === null && json_last_error() !== JSON_ERROR_NONE) {
			return new JSONResponse(['error' => 'Invalid JSON data'], Http::STATUS_BAD_REQUEST);
		}

		$updatedFamily = $this->settingsService->updateInquiryFamily($familyId, (array)$family);
		return $this->response(fn () => ['family' => (array) $updatedFamily]);
	}


	// ============================================================
	// OPTION TYPE ROUTES
	// ============================================================

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'POST', url: '/option/types')]
	public function addOptionType(array $type): JSONResponse
	{
		try {
			$result = $this->inquiryOptionTypeService->create(
				optionType: $type['option_type'],
				icon: $type['icon'] ?? '',
				label: $type['label'] ?? '',
				family: $type['family'] ?? 'debate',
				description: $type['description'] ?? null,
				fields: $type['fields'] ?? null,
				allowedResponse: $type['allowed_response'] ?? null,
				statuses: $type['statuses'] ?? null,
				allowComment: $type['allow_comment'] ?? null,
				supportFeature: $type['support_feature'] ?? 'none',
				useTitle: (bool)($type['use_title'] ?? false),
			);
			return new JSONResponse(['optionType' => $result], Http::STATUS_CREATED);
		} catch (\InvalidArgumentException $e) {
			return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_CONFLICT);
		}
	}

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'PUT', url: '/option/types/{id}')]
	public function updateOptionType(int $id, array $typeData): JSONResponse
	{
		try {
			$result = $this->inquiryOptionTypeService->update(
				id: $id,
				optionType: $typeData['option_type'] ?? '',
				icon: $typeData['icon'] ?? '',
				label: $typeData['label'] ?? '',
				family: $typeData['family'] ?? 'debate',
				description: $typeData['description'] ?? null,
				fields: $typeData['fields'] ?? null,
				allowedResponse: $typeData['allowed_response'] ?? null,
				statuses: $typeData['statuses'] ?? null,
				allowComment: $typeData['allow_comment'] ?? null,
				supportFeature: $typeData['support_feature'] ?? null,
				useTitle: isset($typeData['use_title']) ? (bool)$typeData['use_title'] : null,
			);
			return new JSONResponse(['optionType' => $result]);
		} catch (DoesNotExistException $e) {
			return new JSONResponse(['error' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'DELETE', url: '/option/types/{id}')]
	public function deleteOptionType(int $id): JSONResponse
	{
		try {
			$result = $this->inquiryOptionTypeService->delete($id);
			return new JSONResponse(['optionType' => $result]);
		} catch (DoesNotExistException $e) {
			return new JSONResponse(['error' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	// ============================================================
	// OPTION FAMILY ROUTES (extend existing to accept ui/rules/features/actions)
	// ============================================================

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'POST', url: '/option/families')]
	public function addOptionFamily(array $family): JSONResponse
	{
		try {
			$newFamily = $this->optionFamilyService->create(
				familyType: $family['family_type'],
				label: $family['label'] ?? '',
				description: $family['description'] ?? null,
				icon: $family['icon'] ?? '',
				sortOrder: isset($family['sort_order']) ? (int)$family['sort_order'] : null,
				ui: $family['ui'] ?? null,
				rules: $family['rules'] ?? null,
				features: $family['features'] ?? null,
				actions: $family['actions'] ?? null,
			);
			return new JSONResponse(['family' => $newFamily], Http::STATUS_CREATED);
		} catch (\InvalidArgumentException $e) {
			return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_CONFLICT);
		}
	}

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'PUT', url: '/option/families/{id}')]
	public function updateOptionFamily(int $id, array $familyData): JSONResponse
	{
		try {
			$updated = $this->optionFamilyService->update(
				id: $id,
				familyType: $familyData['family_type'] ?? '',
				label: $familyData['label'] ?? '',
				description: $familyData['description'] ?? null,
				icon: $familyData['icon'] ?? '',
				sortOrder: isset($familyData['sort_order']) ? (int)$familyData['sort_order'] : null,
				ui: $familyData['ui'] ?? null,
				rules: $familyData['rules'] ?? null,
				features: $familyData['features'] ?? null,
				actions: $familyData['actions'] ?? null,
			);
			return new JSONResponse(['family' => $updated]);
		} catch (DoesNotExistException $e) {
			return new JSONResponse(['error' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'DELETE', url: '/option/families/{id}')]
	public function deleteOptionFamily(int $id): JSONResponse
	{
		try {
			$result = $this->optionFamilyService->delete($id);
			return new JSONResponse(['family' => $result]);
		} catch (DoesNotExistException $e) {
			return new JSONResponse(['error' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	// ============================================================
	// INQUIRY GROUP TYPE ROUTES
	// ============================================================

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'POST', url: '/inquiry/group-types')]
	public function addInquiryGroupType(array $type): JSONResponse
	{
		try {
			$result = $this->inquiryGroupTypeService->create(
				groupType: $type['group_type'],
				icon: $type['icon'] ?? '',
				label: $type['label'] ?? '',
				family: $type['family'] ?? 'deliberative',
				description: $type['description'] ?? null,
				fields: $type['fields'] ?? null,
				allowedResponse: $type['allowed_response'] ?? null,
				allowedInquiryTypes: $type['allowed_inquiry_types'] ?? null,
				ui: $type['ui'] ?? null,
				rules: $type['rules'] ?? null,
				features: $type['features'] ?? null,
				actions: $type['actions'] ?? null,
				isRoot: (bool)($type['is_root'] ?? false),
				sortOrder: isset($type['sort_order']) ? (int)$type['sort_order'] : null,
			);
			return new JSONResponse(['groupType' => $result], Http::STATUS_CREATED);
		} catch (\InvalidArgumentException $e) {
			return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_CONFLICT);
		}
	}

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'PUT', url: '/inquiry/group-types/{id}')]
	public function updateInquiryGroupType(int $id, array $typeData): JSONResponse
	{
		try {
			$result = $this->inquiryGroupTypeService->update(
				id: $id,
				groupType: $typeData['group_type'] ?? '',
				icon: $typeData['icon'] ?? '',
				label: $typeData['label'] ?? '',
				family: $typeData['family'] ?? 'deliberative',
				description: $typeData['description'] ?? null,
				fields: $typeData['fields'] ?? null,
				allowedResponse: $typeData['allowed_response'] ?? null,
				allowedInquiryTypes: $typeData['allowed_inquiry_types'] ?? null,
				ui: $typeData['ui'] ?? null,
				rules: $typeData['rules'] ?? null,
				features: $typeData['features'] ?? null,
				actions: $typeData['actions'] ?? null,
				isRoot: isset($typeData['is_root']) ? (bool)$typeData['is_root'] : null,
				sortOrder: isset($typeData['sort_order']) ? (int)$typeData['sort_order'] : null,
			);
			return new JSONResponse(['groupType' => $result]);
		} catch (DoesNotExistException $e) {
			return new JSONResponse(['error' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[OpenAPI(OpenAPI::SCOPE_IGNORE)]
	#[FrontpageRoute(verb: 'DELETE', url: '/inquiry/group-types/{id}')]
	public function deleteInquiryGroupType(int $id): JSONResponse
	{
		try {
			$result = $this->inquiryGroupTypeService->delete($id);
			return new JSONResponse(['groupType' => $result]);
		} catch (DoesNotExistException $e) {
			return new JSONResponse(['error' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

}
