<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;

/**
 * @template-extends QBMapper<HomeConfig>
 */
class HomeConfigMapper extends QBMapper
{
	public const TABLE = HomeConfig::TABLE;

	public function __construct(IDBConnection $db)
	{
		parent::__construct($db, self::TABLE, HomeConfig::class);
	}

	/**
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 */
	public function find(int $id): HomeConfig
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(self::TABLE)
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		return $this->findEntity($qb);
	}

	/**
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 */
	public function findByKeyAndRole(string $configKey, string $role): HomeConfig
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(self::TABLE)
			->where($qb->expr()->eq('config_key', $qb->createNamedParameter($configKey, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('role', $qb->createNamedParameter($role, IQueryBuilder::PARAM_STR)));
		return $this->findEntity($qb);
	}

	public function exists(string $configKey, string $role): bool
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('*'))
			->from(self::TABLE)
			->where($qb->expr()->eq('config_key', $qb->createNamedParameter($configKey, IQueryBuilder::PARAM_STR)))
			->andWhere($qb->expr()->eq('role', $qb->createNamedParameter($role, IQueryBuilder::PARAM_STR)));
		return (int) $qb->executeQuery()->fetchOne() > 0;
	}

	/**
	 * @return HomeConfig[]
	 */
	public function findAll(): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(self::TABLE)
			->orderBy('sort_order', 'ASC')
			->addOrderBy('created', 'DESC');
		return $this->findEntities($qb);
	}

	/**
	 * @return HomeConfig[]
	 */
	public function findByRole(string $role): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from(self::TABLE)
			->where($qb->expr()->eq('role', $qb->createNamedParameter($role, IQueryBuilder::PARAM_STR)))
			->orderBy('sort_order', 'ASC');
		return $this->findEntities($qb);
	}
}
