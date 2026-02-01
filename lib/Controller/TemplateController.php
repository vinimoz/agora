<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\TemplateCatalog;
use OCA\Agora\Service\TemplateLoader;
use OCA\Agora\Db\InquiryFamilyMapper;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * Controller for template management and wizard
 * @psalm-api
 */
class TemplateController extends BaseApiV2Controller
{
	public function __construct(
		string $appName,
		IRequest $request,
		private TemplateCatalog $templateCatalog,
		private TemplateLoader $templateLoader,
		private InquiryFamilyMapper $familyMapper,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Get all available templates from the catalog
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'GET', url: '/api/v1.0/templates', requirements: ['apiVersion' => '(v2)'])]
	public function index(): DataResponse
	{
		try {
			$templates = $this->templateCatalog->getAllTemplates();
			return new DataResponse($templates);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Check if the database is empty (for auto-launch detection)
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'GET', url: '/api/v1.0/templates/check-empty', requirements: ['apiVersion' => '(v2)'])]
	public function checkEmpty(): DataResponse
	{
		try {
			// Check if inquiry_families table is empty
			$families = $this->familyMapper->findAll();
			$isEmpty = count($families) === 0;

			return new DataResponse([
				'empty' => $isEmpty,
				'family_count' => count($families),
			]);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Get the template schema JSON file
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'GET', url: '/api/v1.0/templates/schema', requirements: ['apiVersion' => '(v2)'])]
	public function getSchema(): DataResponse
	{
		try {
			$schemaPath = dirname(__DIR__, 2) . '/public/agora-template-schema.json';

			if (!file_exists($schemaPath)) {
				return new DataResponse(
					['error' => 'Schema file not found'],
					Http::STATUS_NOT_FOUND
				);
			}

			$schemaContent = file_get_contents($schemaPath);
			$schema = json_decode($schemaContent, true);

			if ($schema === null) {
				return new DataResponse(
					['error' => 'Invalid schema file'],
					Http::STATUS_INTERNAL_SERVER_ERROR
				);
			}

			return new DataResponse($schema);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => 'Failed to load schema: ' . $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Get the template instructions markdown file
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'GET', url: '/api/v1.0/templates/instructions', requirements: ['apiVersion' => '(v2)'])]
	public function getInstructions(): DataResponse
	{
		try {
			$instructionsPath = dirname(__DIR__, 2) . '/public/agora-template-instructions.md';

			if (!file_exists($instructionsPath)) {
				return new DataResponse(
					['error' => 'Instructions file not found'],
					Http::STATUS_NOT_FOUND
				);
			}

			$instructions = file_get_contents($instructionsPath);

			return new DataResponse([
				'content' => $instructions,
				'filename' => 'agora-template-instructions.md',
			]);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => 'Failed to load instructions: ' . $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Analyze a template to detect duplicates before importing
	 *
	 * @param array $templateData Template data to analyze
	 * @param string $language Language code to use for labels
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'POST', url: '/api/v1.0/templates/analyze', requirements: ['apiVersion' => '(v2)'])]
	public function analyze(array $templateData, string $language = 'en'): DataResponse
	{
		try {
			// Analyze the template for duplicates
			$analysis = $this->templateLoader->analyzeTemplate($templateData, $language);

			// Calculate totals
			$totals = [
				'new' => 0,
				'existing' => 0,
				'errors' => 0,
			];

			foreach ($analysis as $section => $data) {
				$totals['new'] += count($data['new']);
				$totals['existing'] += count($data['existing']);
				$totals['errors'] += count($data['errors']);
			}

			return new DataResponse([
				'success' => true,
				'analysis' => $analysis,
				'totals' => $totals,
			]);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Import a template with specified language
	 *
	 * @param string $templatePath Path to template file
	 * @param string $language Language code to import
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'POST', url: '/api/v1.0/templates/import', requirements: ['apiVersion' => '(v2)'])]
	public function import(string $templatePath, string $language): DataResponse
	{
		try {
			// Validate template path
			if (!file_exists($templatePath)) {
				return new DataResponse(
					['error' => 'Template file not found'],
					Http::STATUS_NOT_FOUND
				);
			}

			// Load template using existing service
			$messages = $this->templateLoader->loadTemplate($templatePath, $language);

			// Parse messages to categorize results
			$results = $this->parseImportMessages($messages);

			return new DataResponse([
				'success' => true,
				'results' => $results,
				'messages' => $messages,
			]);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Validate a template JSON structure
	 *
	 * @param array $template Template data to validate
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'POST', url: '/api/v1.0/templates/validate', requirements: ['apiVersion' => '(v2)'])]
	public function validate(array $template): DataResponse
	{
		try {
			$errors = [];
			$warnings = [];

			// Check required template_info fields
			if (!isset($template['template_info'])) {
				$errors[] = 'Missing template_info section';
			} else {
				$info = $template['template_info'];

				if (!isset($info['name'])) {
					$errors[] = 'Missing template name';
				}
				if (!isset($info['available_languages']) || !is_array($info['available_languages'])) {
					$errors[] = 'Missing or invalid available_languages';
				}
			}

			// Check for at least one section
			$sections = ['inquiry_families', 'inquiry_types', 'inquiry_statuses', 'categories', 'locations'];
			$hasContent = false;
			foreach ($sections as $section) {
				if (isset($template[$section]) && is_array($template[$section]) && count($template[$section]) > 0) {
					$hasContent = true;
					break;
				}
			}

			if (!$hasContent) {
				$warnings[] = 'Template has no content in any section';
			}

			// Validate multi-language structure
			if (isset($template['inquiry_families'])) {
				foreach ($template['inquiry_families'] as $family) {
					if (isset($family['label']) && is_array($family['label'])) {
						// Check if label has at least one language
						if (empty($family['label'])) {
							$errors[] = "Family '{$family['family_type']}' has empty label object";
						}
					}
				}
			}

			$isValid = empty($errors);

			return new DataResponse([
				'valid' => $isValid,
				'errors' => $errors,
				'warnings' => $warnings,
			]);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Import template data directly (used by wizard after customization)
	 *
	 * @param array $templateData Template data to import
	 * @param string $language Language code (for logging/context)
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'POST', url: '/api/v1.0/templates/import-data', requirements: ['apiVersion' => '(v2)'])]
	public function importData(array $templateData, string $language): DataResponse
	{
		try {
			// Create a temporary file with the template data
			$tempFile = tempnam(sys_get_temp_dir(), 'agora_template_');
			file_put_contents($tempFile, json_encode($templateData));

			try {
				// Use the existing TemplateLoader with the temp file
				$messages = $this->templateLoader->loadTemplate($tempFile, $language);

				// Parse messages to categorize results
				$results = $this->parseImportMessages($messages);

				return new DataResponse([
					'success' => true,
					'results' => $results,
					'messages' => $messages,
				]);
			} finally {
				// Clean up temp file
				if (file_exists($tempFile)) {
					unlink($tempFile);
				}
			}
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Get a specific template by name or filename
	 *
	 * @param string $identifier Template name or filename
	 */
	#[CORS]
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[ApiRoute(verb: 'GET', url: '/api/v1.0/templates/{identifier}', requirements: ['apiVersion' => '(v2)'])]
	public function show(string $identifier): DataResponse
	{
		try {
			// Try to find by name first
			$template = $this->templateCatalog->getTemplateByName($identifier);

			// If not found, try by filename
			if ($template === null) {
				$template = $this->templateCatalog->getTemplateByFilename($identifier);
			}

			if ($template === null) {
				return new DataResponse(
					['error' => 'Template not found'],
					Http::STATUS_NOT_FOUND
				);
			}

			// Load the full template content
			$templatePath = $template['path'];
			if (!file_exists($templatePath)) {
				return new DataResponse(
					['error' => 'Template file not found'],
					Http::STATUS_NOT_FOUND
				);
			}

			$jsonContent = file_get_contents($templatePath);
			$fullTemplate = json_decode($jsonContent, true);

			if (json_last_error() !== JSON_ERROR_NONE) {
				return new DataResponse(
					['error' => 'Invalid template JSON: ' . json_last_error_msg()],
					Http::STATUS_BAD_REQUEST
				);
			}

			// Merge metadata with full content
			$response = array_merge($template, ['content' => $fullTemplate]);

			return new DataResponse($response);
		} catch (\Exception $e) {
			return new DataResponse(
				['error' => $e->getMessage()],
				Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * Parse import messages into categorized results
	 *
	 * @param array $messages Import messages from TemplateLoader
	 * @return array Categorized results
	 */
	private function parseImportMessages(array $messages): array
	{
		$results = [
			'success' => [],
			'skipped' => [],
			'failed' => [],
		];

		foreach ($messages as $message) {
			// Parse message to categorize
			if (str_contains($message, 'successfully')) {
				$results['success'][] = $message;
			} elseif (str_contains($message, 'already exists') || str_contains($message, 'skipped')) {
				$results['skipped'][] = $message;
			} elseif (str_contains($message, 'failed') || str_contains($message, 'error')) {
				$results['failed'][] = $message;
			} else {
				$results['success'][] = $message;
			}
		}

		return $results;
	}
}
