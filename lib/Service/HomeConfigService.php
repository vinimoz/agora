<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\HomeConfig;
use OCA\Agora\Db\HomeConfigMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class HomeConfigService
{
	public function __construct(
		private HomeConfigMapper $mapper,
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
		return $this->mapper->delete($config);
	}

	/**
	 * Resolve the effective home config for the current session:
	 * template for the org type, deep-merged with the instance override.
	 */
	public function resolveForOrganization(string $organizationType): array
	{
		$template = [];
		try {
			$template = $this->mapper->findByKeyAndRole($organizationType, HomeConfig::ROLE_TEMPLATE)->getData() ?? [];
		} catch (DoesNotExistException) {
			// no template for this org type — start from empty
		}

		$override = [];
		try {
			$override = $this->mapper->findByKeyAndRole('default', HomeConfig::ROLE_INSTANCE)->getData() ?? [];
		} catch (DoesNotExistException) {
			// no instance override yet
		}

		return array_replace_recursive($template, $override);
	}
}
