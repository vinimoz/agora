<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCA\Agora\Db\SupportSqlRepository;
use OCA\Agora\Db\SupportEngine;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;
use OCP\AppFramework\Db\Entity; 
use OCP\AppFramework\Db\DoesNotExistException; 
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

/**
 * @template-extends QBMapper<Support>
 */
class SupportMapper extends QBMapperWithUser
{
	public const TABLE = Support::TABLE;

	public function __construct(
		IDBConnection $db,
		private UserSession $userSession,
		private SupportSqlRepository $sqlRepo,
	) {
		parent::__construct($db, self::TABLE, Support::class);
	}

	/**
	 * Find a support by its ID
	 * @return ?Support
	 */
	public function findSupportById(int $id): ?Support
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		try {
			return $this->findEntity($qb);
		} catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
			return null;
		}
	}

	public function getAll(bool $includeNull = false): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')->from($this->getTableName());

		if (!$includeNull) {
			$qb->where($qb->expr()->isNotNull('inquiry_id'));
		}

		return $this->findEntities($qb);
	}

	/**
	 * @return Support[]
	 */
	public function findByUserId(string $userId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

		return $this->findEntities($qb);
	}

	/**
	 * @return Support[]
	 */
	public function findByInquiryId(int $inquiryId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

		return $this->findEntities($qb);
	}

	/**
	 * Find supports by inquiry ID and option ID
	 */
	public function findByInquiryIdAndOption(int $inquiryId, int $optionId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

		return $this->findEntities($qb);
	}

	/**
	 * Find supports by option ID
	 */
	public function findByOptionId(int $optionId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

		return $this->findEntities($qb);
	}

	/**
	 * Find supports by engine ID and inquiry
	 */
	public function findByEngineAndInquiry(int $engineId, int $inquiryId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));

		return $this->findEntities($qb);
	}

	/**
	 * Find supports by engine ID and option
	 */
	public function findByEngineAndOption(int $engineId, int $optionId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

		return $this->findEntities($qb);
	}

	/**
	 * Find support by inquiry, user, option, and engine
	 public function findSupport(int $inquiryId, string $userId, int $optionId = 0, ?int $engineId = null): ?Support
	 {
		 $qb = $this->db->getQueryBuilder()  ;
		 $qb->select('*')
       ->from($this->getTableName())
       ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
       ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
       ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

		 if ($engineId !== null && $engineId !== 0) {
			 $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
}

try {
	return $this->findEntity($qb);
} catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
	return null;
}
return $this->findOne($qb);
}*/
	public function findSupport(int $inquiryId, string $userId, int $optionId = 0, ?int $engineId = null): ?Support
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId)))
     ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
     ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId)));

		if ($engineId === null) {
			$qb->andWhere($qb->expr()->isNull('support_engine_id'));
		} else {
			$qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId)));
		}

		try {
			return $this->findEntity($qb);
		} catch (DoesNotExistException $e) {
			return null;
		} catch (MultipleObjectsReturnedException $e) {
			// Fresh QB: do not reuse the one findEntity() just executed.
			$fb = $this->db->getQueryBuilder();
			$fb->select('*')
      ->from($this->getTableName())
      ->where($fb->expr()->eq('inquiry_id', $fb->createNamedParameter($inquiryId)))
      ->andWhere($fb->expr()->eq('user_id', $fb->createNamedParameter($userId)))
      ->andWhere($fb->expr()->eq('option_id', $fb->createNamedParameter($optionId)));
			if ($engineId === null) {
				$fb->andWhere($fb->expr()->isNull('support_engine_id'));
			} else {
				$fb->andWhere($fb->expr()->eq('support_engine_id', $fb->createNamedParameter($engineId)));
			}
			$fb->orderBy('updated', 'DESC')->setMaxResults(1);
			return $this->findEntity($fb);
		}
	}

	/**
	 * Add support with proper JSON casting using SQL Repository
	 */
	public function addSupport(
		int $inquiryId,
		string $userId,
		mixed $value,
		int $optionId,
		int $weight = 1,
		?int $engineId = null
	): Support {

		$now = time();
		$supportHash = hash('sha256', $inquiryId . '_' . $optionId . '_' . $userId . '_' . $now);

		$prefixedTable = self::TABLE;

		$id = $this->sqlRepo->insertSupportWithJson(
			$prefixedTable,
			[
				'inquiry_id' => $inquiryId,
				'user_id' => $userId,
				'value' => $value,
				'option_id' => $optionId,
				'weight' => $weight,
				'support_engine_id' => $engineId,
				'created' => $now,
				'updated' => $now,
				'support_hash' => $supportHash,
			],
			'value',
			true
		);

		return $this->findSupportById($id);
	}

	/**
	 * Update support with proper JSON casting using SQL Repository
	 */

	public function updateSupport(Support $support, ?int $engineId = null): Support
	{
		$prefixedTable =self::TABLE;
		$this->sqlRepo->updateSupportWithJson(
			$prefixedTable,
			[
				'value' => $support->getValue(),
				'weight' => $support->getWeight(),
				'updated' => time(),
				'support_engine_id' => $engineId,
			],
			'value',
			$support->getId(),
			true
		);

		return $this->findSupportById($support->getId());
	}

	/**
	 * Find supports by engine ID (including NULL for informal)
	 * @return Support[]
	 */
	public function findBySupportEngineId(?int $engineId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName());

		if ($engineId === null) {
			$qb->where($qb->expr()->isNull('support_engine_id'));
		} else {
			$qb->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
		}

		return $this->findEntities($qb);
	}

	/**
 * Case 4 supports — engine-scoped ballots on an inquiry group.
 *
 * Supports do not carry inquiry_group_id; the group is resolved through
 * the engine. We join on support_engine_id and match
 * agora_support_engines.inquiry_group_id.
 *
 * @return Support[]
 */
public function findByGroupId(int $groupId): array
{
    $qb = $this->db->getQueryBuilder();

    $qb->select('s.*')
       ->from($this->getTableName(), 's')
       ->innerJoin(
           's',
           SupportEngine::TABLE,
           'e',
           's.support_engine_id = e.id'
       )
       ->where($qb->expr()->eq(
           'e.inquiry_group_id',
           $qb->createNamedParameter($groupId, IQueryBuilder::PARAM_INT)
       ))
       ->andWhere($qb->expr()->eq(
           's.inquiry_id',
           $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)
       ))
       ->andWhere($qb->expr()->eq(
           's.option_id',
           $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)
       ));

    return $this->findEntities($qb);
}



	public function findByEngineId(int $engineId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId)));
		return $this->findEntities($qb);
	}

	/**
	 * Find supports by inquiry ID and target option ID
	 */
	public function findByInquiryIdAndTarget(int $inquiryId, int $optionId): array
	{
		return $this->findByInquiryIdAndOption($inquiryId, $optionId);
	}

	/**
	 * Find supports by engine ID and target
	 */
	public function findByEngineAndTarget(int $engineId, string $targetType, int $targetId): array
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
     ->from($this->getTableName())
     ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));

		if ($targetType === 'inquiry') {
			$qb->andWhere($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)))
      ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));
		} else {
			$qb->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));
		}

		return $this->findEntities($qb);
	}

	public function removeSupport(int $inquiryId, string $userId, int $optionId, ?int $engineId = null): bool
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

		if ($engineId === null) {
			$qb->andWhere($qb->expr()->isNull('support_engine_id'));
		} else {
			$qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
		}

		return $qb->executeStatement() > 0;
	}

	public function removeAllSupportForInquiry(int $inquiryId, ?int $engineId = null): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

		if ($engineId !== null) {
			$qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
		}

		return $qb->executeStatement();
	}

	public function removeAllByEngine(int $engineId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
     ->where($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
		return $qb->executeStatement();
	}

	public function removeAllByUserForInquiry(int $inquiryId, string $userId, bool $deleteOnlyOrphaned = false): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
     ->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

		if ($deleteOnlyOrphaned) {
			// Orphaned = points at an option id that no longer exists.
			// (option_id = 0 for inquiry-level rows is never orphaned.)
			$subSql = $this->db->getQueryBuilder()
		      ->select('id')->from('agora_options')->getSQL();
			$qb->andWhere($qb->expr()->gt('option_id', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)))
      ->andWhere($qb->expr()->notIn('option_id', $subSql));
		}

		return $qb->executeStatement();
	}

	public function countByInquiry(int $inquiryId, ?int $engineId = 0): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('*', 'count'))
     ->from($this->getTableName())
     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

		if ($engineId !== null && $engineId !== 0) {
			$qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
		}

		$result = $qb->executeQuery()->fetch();
		return (int) ($result['count'] ?? 0);
	}

	public function countByUser(string $userId): int
	{
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('*', 'count'))
     ->from($this->getTableName())
     ->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

		$result = $qb->executeQuery()->fetch();
		return (int) ($result['count'] ?? 0);
	}
}
