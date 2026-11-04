<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         string getConfigKey()
 * @method         void setConfigKey(string $value)
 * @method         string getRole()
 * @method         void setRole(string $value)
 * @method         string getLabel()
 * @method         void setLabel(string $value)
 * @method         ?string getDescription()
 * @method         void setDescription(?string $value)
 * @method         ?array getData()
 * @method         void setData(?array $value)
 * @method         int getSortOrder()
 * @method         void setSortOrder(int $value)
 * @method         int getCreated()
 * @method         void setCreated(int $value)
 * @method         ?int getUpdated()
 * @method         void setUpdated(?int $value)
 */
class HomeConfig extends Entity implements JsonSerializable
{
	public const TABLE = 'agora_home_configs';

	public const ROLE_TEMPLATE = 'template';
	public const ROLE_INSTANCE = 'instance';

	// schema columns
	public $id = null;
	protected string $configKey = '';
	protected string $role = '';
	protected string $label = '';
	protected ?string $description = null;
	protected ?array $data = null;
	protected int $sortOrder = 0;
	protected ?int $created = null;
	protected ?int $updated = null;

	public function __construct()
	{
		$this->addType('id', 'integer');
		$this->addType('configKey', 'string');
		$this->addType('role', 'string');
		$this->addType('label', 'string');
		$this->addType('description', 'string');
		$this->addType('data', 'json');
		$this->addType('sortOrder', 'integer');
		$this->addType('created', 'integer');
		$this->addType('updated', 'integer');
	}

	/**
	 * @return array
	 *
	 * @psalm-suppress PossiblyUnusedMethod
	 */
	public function jsonSerialize(): array
	{
		return [
			'id' => $this->getId(),
			'config_key' => $this->getConfigKey(),
			'role' => $this->getRole(),
			'label' => $this->getLabel(),
			'description' => $this->getDescription(),
			'data' => $this->getData() ?? [],
			'sort_order' => $this->getSortOrder(),
			'created' => $this->getCreated(),
			'updated' => $this->getUpdated(),
		];
	}
}
