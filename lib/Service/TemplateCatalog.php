<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

/**
 * Service for discovering and cataloging available templates
 */
class TemplateCatalog
{
	private string $templateDirectory;

	public function __construct()
	{
		$this->templateDirectory = __DIR__ . '/../Templates';
	}

	/**
	 * Get all available templates
	 *
	 * @return array Array of template metadata
	 */
	public function getAllTemplates(): array
	{
		$templates = [];
		$templateFiles = glob($this->templateDirectory . '/*.json');

		if ($templateFiles === false) {
			return [];
		}

		foreach ($templateFiles as $templatePath) {
			$templateData = $this->parseTemplate($templatePath);
			if ($templateData !== null) {
				$templates[] = $templateData;
			}
		}

		// Sort by name
		usort($templates, function ($a, $b) {
			return strcmp($a['name'], $b['name']);
		});

		return $templates;
	}

	/**
	 * Parse template file and extract metadata
	 *
	 * @param string $templatePath Path to template file
	 * @return array|null Template metadata or null if invalid
	 */
	private function parseTemplate(string $templatePath): ?array
	{
		if (!file_exists($templatePath)) {
			return null;
		}

		$jsonContent = file_get_contents($templatePath);
		if ($jsonContent === false) {
			return null;
		}

		$template = json_decode($jsonContent, true);
		if (json_last_error() !== JSON_ERROR_NONE) {
			return null;
		}

		if (!isset($template['template_info'])) {
			return null;
		}

		$info = $template['template_info'];

		// Count items in each section
		$counts = [
			'inquiry_families' => count($template['inquiry_families'] ?? []),
			'inquiry_types' => count($template['inquiry_types'] ?? []),
			'inquiry_statuses' => count($template['inquiry_statuses'] ?? []),
			'option_types' => count($template['option_types'] ?? []),
			'inquiry_group_types' => count($template['inquiry_group_types'] ?? []),
			'categories' => count($template['categories'] ?? []),
			'locations' => count($template['locations'] ?? []),
		];

		// Calculate total items
		$totalItems = array_sum($counts);

		return [
			'path' => $templatePath,
			'filename' => basename($templatePath),
			'name' => $info['name'] ?? 'Unknown',
			'version' => $info['version'] ?? 'Unknown',
			'description' => $info['description'] ?? '',
			'author' => $info['author'] ?? 'Unknown',
			'use_case' => $info['use_case'] ?? 'general',
			'available_languages' => $info['available_languages'] ?? [],
			'counts' => $counts,
			'total_items' => $totalItems,
		];
	}

	/**
	 * Get template by name
	 *
	 * @param string $name Template name
	 * @return array|null Template metadata or null if not found
	 */
	public function getTemplateByName(string $name): ?array
	{
		$templates = $this->getAllTemplates();
		foreach ($templates as $template) {
			if ($template['name'] === $name) {
				return $template;
			}
		}
		return null;
	}

	/**
	 * Get template by filename
	 *
	 * @param string $filename Template filename
	 * @return array|null Template metadata or null if not found
	 */
	public function getTemplateByFilename(string $filename): ?array
	{
		$templates = $this->getAllTemplates();
		foreach ($templates as $template) {
			if ($template['filename'] === $filename) {
				return $template;
			}
		}
		return null;
	}

	/**
	 * Get templates by use case
	 *
	 * @param string $useCase Use case identifier
	 * @return array Array of template metadata
	 */
	public function getTemplatesByUseCase(string $useCase): array
	{
		$templates = $this->getAllTemplates();
		return array_filter($templates, function ($template) use ($useCase) {
			return $template['use_case'] === $useCase;
		});
	}
}
