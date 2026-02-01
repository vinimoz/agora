<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Category;
use OCA\Agora\Db\CategoryMapper;
use OCA\Agora\Db\InquiryFamily;
use OCA\Agora\Db\InquiryFamilyMapper;
use OCA\Agora\Db\InquiryGroupType;
use OCA\Agora\Db\InquiryGroupTypeMapper;
use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryOptionTypeMapper;
use OCA\Agora\Db\InquiryStatus;
use OCA\Agora\Db\InquiryStatusMapper;
use OCA\Agora\Db\InquiryType;
use OCA\Agora\Db\InquiryTypeMapper;
use OCA\Agora\Db\Location;
use OCA\Agora\Db\LocationMapper;
use Psr\Log\LoggerInterface;

class TemplateLoader
{
	public function __construct(
		private CategoryMapper $categoryMapper,
		private InquiryFamilyMapper $inquiryFamilyMapper,
		private InquiryGroupTypeMapper $inquiryGroupTypeMapper,
		private InquiryOptionTypeMapper $inquiryOptionTypeMapper,
		private InquiryStatusMapper $inquiryStatusMapper,
		private InquiryTypeMapper $inquiryTypeMapper,
		private LocationMapper $locationMapper,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Load a template from a JSON file with a specific language
	 *
	 * @param string $templatePath Path to the JSON template file
	 * @param string $language Language code to extract from multi-language fields (e.g., 'en', 'fr', 'de')
	 * @return array Messages about the loading process
	 */
	public function loadTemplate(string $templatePath, string $language = 'en'): array
	{
		$messages = [];

		// Validate file exists
		if (!file_exists($templatePath)) {
			$messages[] = "Error: Template file not found: {$templatePath}";
			return $messages;
		}

		// Read and parse JSON
		$jsonContent = file_get_contents($templatePath);
		$template = json_decode($jsonContent, true);

		if (json_last_error() !== JSON_ERROR_NONE) {
			$messages[] = 'Error: Invalid JSON in template file: ' . json_last_error_msg();
			return $messages;
		}

		// Validate template structure
		if (!isset($template['template_info'])) {
			$messages[] = 'Error: Template missing required "template_info" section';
			return $messages;
		}

		// Check if the requested language is available
		$availableLanguages = $template['template_info']['available_languages'] ?? [];
		if (!empty($availableLanguages) && !in_array($language, $availableLanguages)) {
			$messages[] = "Warning: Language '{$language}' not listed in available_languages. Attempting to load anyway...";
		}

		$messages[] = 'Loading template: ' . ($template['template_info']['name'] ?? 'unknown');
		$messages[] = 'Description: ' . ($template['template_info']['description'] ?? 'No description');
		$messages[] = "Language: {$language}";

		// Load each section
		try {
			if (isset($template['inquiry_families'])) {
				$messages = array_merge($messages, $this->loadInquiryFamilies($template['inquiry_families'], $language));
			}

			if (isset($template['inquiry_types'])) {
				$messages = array_merge($messages, $this->loadInquiryTypes($template['inquiry_types'], $language));
			}

			if (isset($template['inquiry_statuses'])) {
				$messages = array_merge($messages, $this->loadInquiryStatuses($template['inquiry_statuses'], $language));
			}

			if (isset($template['option_types'])) {
				$messages = array_merge($messages, $this->loadOptionTypes($template['option_types'], $language));
			}

			if (isset($template['inquiry_group_types'])) {
				$messages = array_merge($messages, $this->loadInquiryGroupTypes($template['inquiry_group_types'], $language));
			}

			if (isset($template['categories'])) {
				$messages = array_merge($messages, $this->loadCategories($template['categories'], $language));
			}

			if (isset($template['locations'])) {
				$messages = array_merge($messages, $this->loadLocations($template['locations'], $language));
			}

			$messages[] = 'Template loaded successfully!';
		} catch (\Exception $e) {
			$messages[] = 'Error loading template: ' . $e->getMessage();
			$this->logger->error('Template loading failed', ['exception' => $e]);
		}

		return $messages;
	}

	/**
	 * Load inquiry families from template
	 */
	private function loadInquiryFamilies(array $families, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading inquiry families...';

		foreach ($families as $familyData) {
			try {
				$familyType = $familyData['family_type'];

				// Check if family already exists
				if ($this->inquiryFamilyMapper->familyTypeExists($familyType)) {
					$messages[] = "  - Family already exists: {$familyType} (skipped)";
					continue;
				}

				$family = new InquiryFamily();
				$family->setFamilyType($familyType);
				$family->setLabel($this->extractText($familyData['label'] ?? '', $language));
				$family->setDescription($this->extractText($familyData['description'] ?? '', $language));
				$family->setIcon($familyData['icon'] ?? '');
				$family->setSortOrder($familyData['sort_order'] ?? 0);
				$family->setCreated(time());

				$this->inquiryFamilyMapper->insert($family);
				$messages[] = "  - Created family: {$familyType}";
			} catch (\Exception $e) {
				$messages[] = "  - Error creating family {$familyData['family_type']}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Load inquiry types from template
	 */
	private function loadInquiryTypes(array $types, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading inquiry types...';

		foreach ($types as $typeData) {
			try {
				$type = new InquiryType();
				$type->setInquiryType($typeData['inquiry_type']);
				$type->setFamily($typeData['family'] ?? '');
				$type->setIcon($typeData['icon'] ?? '');
				$type->setLabel($this->extractText($typeData['label'] ?? '', $language));
				$type->setDescription($this->extractText($typeData['description'] ?? '', $language));
				$type->setIsRoot($typeData['is_root'] ?? false);

				// Handle allowed_response (use empty array instead of null for consistency)
				$type->setAllowedResponse($typeData['allowed_response'] ?? []);

				// Handle allowed_transformation
				$type->setAllowedTransformation($typeData['allowed_transformation'] ?? []);

				// Handle allowed_option_type
				$type->setAllowedOptionType($typeData['allowed_option_type'] ?? []);

				// Handle support_feature
				$type->setSupportFeature($typeData['support_feature'] ?? 'binary');

				// Handle fields (use empty array instead of null)
				$type->setFields($typeData['fields'] ?? []);

				$type->setCreated(time());

				$this->inquiryTypeMapper->insert($type);
				$messages[] = "  - Created type: {$typeData['inquiry_type']}";
			} catch (\Exception $e) {
				$messages[] = "  - Error creating type {$typeData['inquiry_type']}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Load inquiry statuses from template
	 */
	private function loadInquiryStatuses(array $statuses, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading inquiry statuses...';

		foreach ($statuses as $statusData) {
			try {
				$status = new InquiryStatus();
				$status->setInquiryType($statusData['inquiry_type']);
				$status->setStatusKey($statusData['status_key']);
				$status->setLabel($this->extractText($statusData['label'] ?? '', $language));
				$status->setDescription($this->extractText($statusData['description'] ?? '', $language));
				$status->setIsFinal($statusData['is_final'] ?? false);
				$status->setIcon($statusData['icon'] ?? '');
				$status->setSortOrder($statusData['sort_order'] ?? 0);
				$status->setCreated(time());

				$this->inquiryStatusMapper->insert($status);
				$messages[] = "  - Created status: {$statusData['status_key']} for {$statusData['inquiry_type']}";
			} catch (\Exception $e) {
				$messages[] = "  - Error creating status {$statusData['status_key']}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Load option types from template
	 */
	private function loadOptionTypes(array $optionTypes, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading option types...';

		foreach ($optionTypes as $optionTypeData) {
			try {
				$optionType = new InquiryOptionType();
				$optionType->setFamily($optionTypeData['family'] ?? '');
				$optionType->setOptionType($optionTypeData['option_type']);
				$optionType->setIcon($optionTypeData['icon'] ?? '');
				$optionType->setLabel($this->extractText($optionTypeData['label'] ?? '', $language));
				$optionType->setDescription($this->extractText($optionTypeData['description'] ?? '', $language));

				// Handle allowed_response
				if (isset($optionTypeData['allowed_response']) && is_array($optionTypeData['allowed_response'])) {
					$optionType->setAllowedResponse($optionTypeData['allowed_response']);
				} else {
					$optionType->setAllowedResponse(null);
				}

				// Handle fields if present
				if (isset($optionTypeData['fields']) && is_array($optionTypeData['fields'])) {
					$optionType->setFields($optionTypeData['fields']);
				}

				$optionType->setCreated(time());

				$this->inquiryOptionTypeMapper->insert($optionType);
				$messages[] = "  - Created option type: {$optionTypeData['option_type']}";
			} catch (\Exception $e) {
				$messages[] = "  - Error creating option type {$optionTypeData['option_type']}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Load inquiry group types from template
	 */
	private function loadInquiryGroupTypes(array $groupTypes, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading inquiry group types...';

		foreach ($groupTypes as $groupTypeData) {
			try {
				$groupType = new InquiryGroupType();
				$groupType->setGroupType($groupTypeData['group_type']);
				$groupType->setFamily($groupTypeData['family'] ?? 'deliberative');
				$groupType->setLabel($this->extractText($groupTypeData['label'] ?? '', $language));
				$groupType->setDescription($this->extractText($groupTypeData['description'] ?? '', $language));
				$groupType->setIcon($groupTypeData['icon'] ?? '');
				$groupType->setFields($groupTypeData['fields'] ?? []);
				$groupType->setAllowedInquiryTypes($groupTypeData['allowed_inquiry_types'] ?? []);
				$groupType->setAllowedResponse($groupTypeData['allowed_response'] ?? []);
				$groupType->setIsRoot($groupTypeData['is_root'] ?? false);
				$groupType->setSortOrder($groupTypeData['sort_order'] ?? 0);
				$groupType->setCreated(time());

				$this->inquiryGroupTypeMapper->insert($groupType);
				$messages[] = "  - Created group type: {$groupTypeData['group_type']}";
			} catch (\Exception $e) {
				$messages[] = "  - Error creating group type {$groupTypeData['group_type']}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Load categories from template
	 * Supports hierarchical categories with string-based parent references
	 */
	private function loadCategories(array $categories, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading categories...';

		// First pass: Create all categories without parent relationships
		// Build a lookup map of category_id -> database ID
		$categoryIdMap = [];

		foreach ($categories as $categoryData) {
			try {
				// Support both old format (label/category_key) and new format (name/category_id)
				$categoryName = $this->extractText(
					$categoryData['name'] ?? $categoryData['label'] ?? $categoryData['category_key'] ?? '',
					$language
				);

				// Check if category already exists
				$existingCategory = $this->categoryMapper->findByName($categoryName);
				if ($existingCategory !== null) {
					$messages[] = "  - Category already exists: {$categoryName} (skipped)";
					// Store in map for parent resolution
					if (isset($categoryData['category_id'])) {
						$categoryIdMap[$categoryData['category_id']] = $existingCategory->getId();
					}
					continue;
				}

				$category = new Category();
				$category->setName($categoryName);
				$category->setParentId(0); // Set parent to 0 initially

				$insertedCategory = $this->categoryMapper->insert($category);
				$messages[] = "  - Created category: {$categoryName}";

				// Store category_id -> database ID mapping for parent resolution
				if (isset($categoryData['category_id'])) {
					$categoryIdMap[$categoryData['category_id']] = $insertedCategory->getId();
				}
			} catch (\Exception $e) {
				$categoryKey = $categoryData['category_id'] ?? $categoryData['category_key'] ?? 'unknown';
				$messages[] = "  - Error creating category {$categoryKey}: " . $e->getMessage();
			}
		}

		// Second pass: Update parent relationships using string references
		foreach ($categories as $categoryData) {
			try {
				// Skip if no category_id or parent reference
				if (!isset($categoryData['category_id'])) {
					continue;
				}

				$categoryId = $categoryData['category_id'];
				$parentRef = $categoryData['parent'] ?? null;

				// Skip if no parent or parent is null/0
				if ($parentRef === null || $parentRef === 0) {
					continue;
				}

				// Resolve parent string reference to database ID
				if (isset($categoryIdMap[$parentRef])) {
					$parentDatabaseId = $categoryIdMap[$parentRef];

					// Get the category by its database ID and update parent
					if (isset($categoryIdMap[$categoryId])) {
						$databaseId = $categoryIdMap[$categoryId];
						$category = $this->categoryMapper->find($databaseId);

						if ($category !== null) {
							$category->setParentId((int)$parentDatabaseId);
							$this->categoryMapper->update($category);
							$messages[] = "  - Set parent for '{$category->getName()}' -> parent ID {$parentDatabaseId}";
						}
					}
				} else {
					$messages[] = "  - Warning: Parent category '{$parentRef}' not found for '{$categoryId}'";
				}
			} catch (\Exception $e) {
				$categoryKey = $categoryData['category_id'] ?? 'unknown';
				$messages[] = "  - Error setting parent for category {$categoryKey}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Load locations from template
	 * Supports hierarchical locations with string-based parent references
	 */
	private function loadLocations(array $locations, string $language): array
	{
		$messages = [];
		$messages[] = 'Loading locations...';

		// First pass: Create all locations without parent relationships
		// Build a lookup map of location_id -> database ID
		$locationIdMap = [];

		foreach ($locations as $locationData) {
			try {
				// Support both old format (label/location_key) and new format (name/location_id)
				$locationName = $this->extractText(
					$locationData['name'] ?? $locationData['label'] ?? $locationData['location_key'] ?? '',
					$language
				);

				// Check if location already exists
				$existingLocation = $this->locationMapper->findByName($locationName);
				if ($existingLocation !== null) {
					$messages[] = "  - Location already exists: {$locationName} (skipped)";
					// Store in map for parent resolution
					if (isset($locationData['location_id'])) {
						$locationIdMap[$locationData['location_id']] = $existingLocation->getId();
					}
					continue;
				}

				$location = new Location();
				$location->setName($locationName);
				$location->setParentId(0); // Set parent to 0 initially

				$insertedLocation = $this->locationMapper->insert($location);
				$locationKey = $locationData['location_id'] ?? $locationData['location_key'] ?? $locationName;
				$messages[] = "  - Created location: {$locationKey}";

				// Store location_id -> database ID mapping for parent resolution
				if (isset($locationData['location_id'])) {
					$locationIdMap[$locationData['location_id']] = $insertedLocation->getId();
				}
			} catch (\Exception $e) {
				$locationKey = $locationData['location_id'] ?? $locationData['location_key'] ?? 'unknown';
				$messages[] = "  - Error creating location {$locationKey}: " . $e->getMessage();
			}
		}

		// Second pass: Update parent relationships using string references
		foreach ($locations as $locationData) {
			try {
				// Skip if no location_id
				if (!isset($locationData['location_id'])) {
					continue;
				}

				$locationId = $locationData['location_id'];
				$parentRef = $locationData['parent_id'] ?? null;

				// Skip if no parent or parent is null
				if ($parentRef === null) {
					continue;
				}

				// Resolve parent string reference to database ID
				if (isset($locationIdMap[$parentRef])) {
					$parentDatabaseId = $locationIdMap[$parentRef];

					// Get the location by its database ID and update parent
					if (isset($locationIdMap[$locationId])) {
						$databaseId = $locationIdMap[$locationId];
						$location = $this->locationMapper->find($databaseId);

						if ($location !== null) {
							$location->setParentId((int)$parentDatabaseId);
							$this->locationMapper->update($location);
							$messages[] = "  - Set parent for '{$location->getName()}' -> parent ID {$parentDatabaseId}";
						}
					}
				} else {
					$messages[] = "  - Warning: Parent location '{$parentRef}' not found for '{$locationId}'";
				}
			} catch (\Exception $e) {
				$locationKey = $locationData['location_id'] ?? 'unknown';
				$messages[] = "  - Error setting parent for location {$locationKey}: " . $e->getMessage();
			}
		}

		return $messages;
	}

	/**
	 * Analyze a template and return what will be created vs skipped
	 *
	 * @param array $template Parsed template array
	 * @param string $language Language code to extract from multi-language fields
	 * @return array Analysis results with 'new', 'existing', and 'error' counts for each section
	 */
	public function analyzeTemplate(array $template, string $language = 'en'): array
	{
		$analysis = [
			'inquiry_families' => ['new' => [], 'existing' => [], 'errors' => []],
			'inquiry_types' => ['new' => [], 'existing' => [], 'errors' => []],
			'inquiry_statuses' => ['new' => [], 'existing' => [], 'errors' => []],
			'option_types' => ['new' => [], 'existing' => [], 'errors' => []],
			'inquiry_group_types' => ['new' => [], 'existing' => [], 'errors' => []],
			'categories' => ['new' => [], 'existing' => [], 'errors' => []],
			'locations' => ['new' => [], 'existing' => [], 'errors' => []],
		];

		// Analyze inquiry families
		if (isset($template['inquiry_families'])) {
			foreach ($template['inquiry_families'] as $familyData) {
				$familyType = $familyData['family_type'];
				$label = $this->extractText($familyData['label'] ?? '', $language);

				if ($this->inquiryFamilyMapper->familyTypeExists($familyType)) {
					$analysis['inquiry_families']['existing'][] = [
						'type' => $familyType,
						'label' => $label,
					];
				} else {
					$analysis['inquiry_families']['new'][] = [
						'type' => $familyType,
						'label' => $label,
					];
				}
			}
		}

		// Analyze inquiry types
		if (isset($template['inquiry_types'])) {
			foreach ($template['inquiry_types'] as $typeData) {
				$inquiryType = $typeData['inquiry_type'];
				$label = $this->extractText($typeData['label'] ?? '', $language);

				if ($this->inquiryTypeMapper->inquiryTypeExists($inquiryType)) {
					$analysis['inquiry_types']['existing'][] = [
						'type' => $inquiryType,
						'label' => $label,
					];
				} else {
					$analysis['inquiry_types']['new'][] = [
						'type' => $inquiryType,
						'label' => $label,
					];
				}
			}
		}

		// Analyze inquiry statuses
		if (isset($template['inquiry_statuses'])) {
			foreach ($template['inquiry_statuses'] as $statusData) {
				$inquiryType = $statusData['inquiry_type'];
				$statusKey = $statusData['status_key'];
				$label = $this->extractText($statusData['label'] ?? '', $language);

				$existing = $this->inquiryStatusMapper->findByStatusKey($inquiryType, $statusKey);
				if ($existing !== null) {
					$analysis['inquiry_statuses']['existing'][] = [
						'type' => "{$inquiryType}:{$statusKey}",
						'label' => $label,
					];
				} else {
					$analysis['inquiry_statuses']['new'][] = [
						'type' => "{$inquiryType}:{$statusKey}",
						'label' => $label,
					];
				}
			}
		}

		// Analyze option types
		if (isset($template['option_types'])) {
			foreach ($template['option_types'] as $optionTypeData) {
				$optionType = $optionTypeData['option_type'];
				$label = $this->extractText($optionTypeData['label'] ?? '', $language);

				if ($this->inquiryOptionTypeMapper->optionTypeExists($optionType)) {
					$analysis['option_types']['existing'][] = [
						'type' => $optionType,
						'label' => $label,
					];
				} else {
					$analysis['option_types']['new'][] = [
						'type' => $optionType,
						'label' => $label,
					];
				}
			}
		}

		// Analyze inquiry group types
		if (isset($template['inquiry_group_types'])) {
			foreach ($template['inquiry_group_types'] as $groupTypeData) {
				$groupType = $groupTypeData['group_type'];
				$label = $this->extractText($groupTypeData['label'] ?? '', $language);

				if ($this->inquiryGroupTypeMapper->groupTypeExists($groupType)) {
					$analysis['inquiry_group_types']['existing'][] = [
						'type' => $groupType,
						'label' => $label,
					];
				} else {
					$analysis['inquiry_group_types']['new'][] = [
						'type' => $groupType,
						'label' => $label,
					];
				}
			}
		}

		// Analyze categories
		if (isset($template['categories'])) {
			foreach ($template['categories'] as $categoryData) {
				// Support both old format (label/category_key) and new format (name/category_id)
				$categoryName = $this->extractText(
					$categoryData['name'] ?? $categoryData['label'] ?? $categoryData['category_key'] ?? '',
					$language
				);
				$categoryKey = $categoryData['category_id'] ?? $categoryData['category_key'] ?? '';

				$existing = $this->categoryMapper->findByName($categoryName);
				if ($existing !== null) {
					$analysis['categories']['existing'][] = [
						'type' => $categoryKey,
						'label' => $categoryName,
					];
				} else {
					$analysis['categories']['new'][] = [
						'type' => $categoryKey,
						'label' => $categoryName,
					];
				}
			}
		}

		// Analyze locations
		if (isset($template['locations'])) {
			foreach ($template['locations'] as $locationData) {
				// Support both old format (label/location_key) and new format (name/location_id)
				$locationName = $this->extractText(
					$locationData['name'] ?? $locationData['label'] ?? $locationData['location_key'] ?? '',
					$language
				);
				$locationKey = $locationData['location_id'] ?? $locationData['location_key'] ?? '';

				$existing = $this->locationMapper->findByName($locationName);
				if ($existing !== null) {
					$analysis['locations']['existing'][] = [
						'type' => $locationKey,
						'label' => $locationName,
					];
				} else {
					$analysis['locations']['new'][] = [
						'type' => $locationKey,
						'label' => $locationName,
					];
				}
			}
		}

		return $analysis;
	}

	/**
	 * Extract text from a multi-language field or return as-is if it's a plain string
	 *
	 * @param mixed $field The field value (can be string or array with language keys)
	 * @param string $language The language code to extract
	 * @return string The extracted text
	 */
	private function extractText($field, string $language): string
	{
		// If it's an array, extract the language-specific text
		if (is_array($field)) {
			// Try to get the requested language
			if (isset($field[$language])) {
				return $field[$language];
			}

			// Fallback to English if available
			if (isset($field['en'])) {
				return $field['en'];
			}

			// Fallback to the first available language
			if (!empty($field)) {
				return reset($field);
			}

			return '';
		}

		// If it's already a string, return as-is
		return (string)$field;
	}
}
