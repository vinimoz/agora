<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\HomeConfig;
use OCA\Agora\Service\HomeImageService;
use OCA\Agora\Db\HomeConfigMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class HomeConfigService
{
	public function __construct(
		private HomeConfigMapper $mapper,
		private HomeImageService $imageService,
		private LoggerInterface $logger
	) {
	}

	/**
	 * @throws DoesNotExistException
	 * @throws MultipleObjectsReturnedException
	 */
	public function find(int $id): HomeConfig
	{
		return $this->mapper->find($id);
	}

	/**
	 * @throws DoesNotExistException
	 * @throws MultipleObjectsReturnedException
	 */
	public function findByKeyAndRole(string $configKey, string $role): HomeConfig
	{
		return $this->mapper->findByKeyAndRole($configKey, $role);
	}

	public function findAll(): array
	{
		return $this->mapper->findAll();
	}

	public function findByRole(string $role): array
	{
		return $this->mapper->findByRole($role);
	}

	public function exists(string $configKey, string $role): bool
	{
		return $this->mapper->exists($configKey, $role);
	}

	/**
	 * Normalize a JSON-ish value into an array — mirrors
	 * InquiryGroupTypeService::normalizeJson().
	 */
	private function normalizeJson(mixed $value): array
	{
		if ($value === null || $value === '') {
			return [];
		}
		if (is_string($value)) {
			$decoded = json_decode($value, true);
			return json_last_error() === JSON_ERROR_NONE && is_array($decoded) ? $decoded : [];
		}
		if (is_array($value)) {
			return $value;
		}
		return [];
	}

	/**
	 * Create a new home config row.
	 *
	 * Two roles are expected:
	 *   - 'template' — fallback for a given org type ('municipality', 'university', …)
	 *   - 'instance' — the override applied on top of the template (one row)
	 */
	public function create(
		string $configKey,
		string $role = HomeConfig::ROLE_TEMPLATE,
		string $label = '',
		?string $description = null,
		mixed $data = null,
		?int $sortOrder = null,
	): HomeConfig {
		if ($this->mapper->exists($configKey, $role)) {
			throw new \InvalidArgumentException(
				sprintf('Home config already exists for (%s, %s)', $configKey, $role)
			);
		}

		$config = new HomeConfig();
		$config->setConfigKey($configKey);
		$config->setRole($role);
		$config->setLabel($label !== '' ? $label : $configKey);
		$config->setDescription($description);
		$config->setData($this->normalizeJson($data));
		$config->setSortOrder($sortOrder ?? 0);
		$config->setCreated(time());

		return $this->mapper->insert($config);
	}

	public function update(
		int $id,
		?string $label = null,
		?string $description = null,
		mixed $data = null,
		?int $sortOrder = null,
	): HomeConfig {
		$config = $this->mapper->find($id);

		if ($label !== null) {
			$config->setLabel($label);
		}
		if ($description !== null) {
			$config->setDescription($description);
		}
		if ($data !== null) {
			$config->setData($this->normalizeJson($data));
		}
		if ($sortOrder !== null) {
			$config->setSortOrder($sortOrder);
		}
		$config->setUpdated(time());

		return $this->mapper->update($config);
	}

	public function delete(int $id): HomeConfig
	{
		$config = $this->mapper->find($id);
		$this->imageService->purgeForConfig($id);
		return $this->mapper->delete($config);
	}

	private function mergeHomeConfig(array $template, array $override): array
	{
		// 1. Deep merge everything (good for sectionLabels, relevance.weights,
		//    hero.title, promo.text, …)
		$merged = array_replace_recursive($template, $override);

		// 2. Lists that must be fully replaced, not positionally merged:
		foreach ([
			['hero',      'actions'],
			['promo',     'actions'],           // if you ever add promo actions
			['relevance', 'tiers'],
		] as [$section, $field]) {
		if (isset($override[$section][$field])) {
			$merged[$section][$field] = $override[$section][$field];
		}
		}
		if (isset($override['sections'])) {
			$merged['sections'] = $override['sections'];
		}

		return $merged;
	}

	/**
	 * Resolve the effective home config for the current session:
	 * template for the org type, deep-merged with the instance override,
	 * with any `*.image` filenames resolved to public URLs.
	 */
	public function resolveForOrganization(string $organizationType): array
	{
		$template = null;
		try {
			$template = $this->mapper->findByKeyAndRole(
				$organizationType,
				HomeConfig::ROLE_TEMPLATE
			);
} catch (DoesNotExistException | MultipleObjectsReturnedException $e) {
    $this->logger->warning('Ambiguous home config row', [
        'config_key' => $organizationType,
        'role' => HomeConfig::ROLE_TEMPLATE,
        'error' => $e->getMessage(),
    ]);
}
		$override = null;
		try {
			$override = $this->mapper->findByKeyAndRole(
				'default',
				HomeConfig::ROLE_INSTANCE
			);
		} catch (DoesNotExistException) {
		}

		$merged = $this->mergeHomeConfig(
			$template?->getData() ?? [],
			$override?->getData() ?? [],
		);

		return $this->resolveImageUrls($merged, $template, $override);
	}

	/**
	 * For every image slot present in $merged, determine which config row
	 * won the merge and rewrite `image` (a filename) into `imageUrl`
	 * (a stable public URL). Also exposes `imageConfigId` so the frontend
	 * can build cache-busting query strings.
	 */
	private function resolveImageUrls(
		array $merged,
		?HomeConfig $template,
		?HomeConfig $override,
	): array {
		foreach (['hero', 'promo', 'logo', 'background'] as $slot) {
			$filename = $merged[$slot]['image'] ?? null;
			if (!is_string($filename) || $filename === '') {
				continue;
			}

			$owner = null;
			if ($override !== null
				&& ($override->getData()[$slot]['image'] ?? null) === $filename) {
				$owner = $override;
			} elseif ($template !== null
				&& ($template->getData()[$slot]['image'] ?? null) === $filename) {
				$owner = $template;
			}
			if ($owner === null) {
				continue;
			}

			if ($this->imageService->getFile($owner->getId(), $slot) === null) {
				continue;   
			}


			$merged[$slot]['imageConfigId'] = $owner->getId();
			$merged[$slot]['imageUrl'] = sprintf(
				'/apps/agora/home-config/%d/images/%s',
				$owner->getId(),
				$slot,
			);
			$merged[$slot]['imageUpdated'] = $owner->getUpdated() ?? $owner->getCreated();
		}
		return $merged;
	}
}
