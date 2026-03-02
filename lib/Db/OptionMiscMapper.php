<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\AppFramework\Db\QBMapper;

/**
 * @template-extends QBMapper<OptionMisc>
 */
class OptionMiscMapper extends QBMapper
{
    public const TABLE = OptionMisc::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, OptionMisc::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return OptionMisc
     */
    public function find(int $id): OptionMisc
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @return OptionMisc[]
     */
    public function findByOptionId(int $optionId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return OptionMisc
     */
    public function findByOptionIdAndKey(int $optionId, string $key): OptionMisc
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * @return OptionMisc[]
     */
    public function findByKey(string $key): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));
        return $this->findEntities($qb);
    }

    /**
     * Get a setting value by option ID and key
     */
    public function getValue(int $optionId, string $key): ?string
    {
        try {
            $setting = $this->findByOptionIdAndKey($optionId, $key);
            return $setting->getValue();
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        } catch (\OCP\AppFramework\Db\MultipleObjectsReturnedException $e) {
            // En cas de doublon, on prend le premier
            $settings = $this->findByOptionIdAndKeyMultiple($optionId, $key);
            return !empty($settings) ? $settings[0]->getValue() : null;
        }
    }

    /**
     * Set a setting value (create or update)
     */
    public function setValue(int $optionId, string $key, ?string $value): OptionMisc
    {
        try {
            // Update existing
            $setting = $this->findByOptionIdAndKey($optionId, $key);
            $setting->setValue($value);
            return $this->update($setting);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            // Create new
            $setting = new OptionMisc();
            $setting->setOptionId($optionId);
            $setting->setKey($key);
            $setting->setValue($value);
            return $this->insert($setting);
        }
    }

    /**
     * Delete all settings for an option
     */
    public function deleteByOptionId(int $optionId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Delete all settings for multiple options
     */
    public function deleteByOptionIds(array $optionIds): int
    {
        if (empty($optionIds)) {
            return 0;
        }

        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->in('option_id', $qb->createNamedParameter($optionIds, IQueryBuilder::PARAM_INT_ARRAY)));

        return $qb->executeStatement();
    }

    /**
     * Delete a specific setting by option ID and key
     */
    public function deleteByOptionIdAndKey(int $optionId, string $key): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));

        return $qb->executeStatement();
    }

    /**
     * Find multiple settings by option ID and key (in case of duplicates)
     *
     * @return OptionMisc[]
     */
    private function findByOptionIdAndKeyMultiple(int $optionId, string $key): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));
        return $this->findEntities($qb);
    }

    /**
     * Build the query
     */
    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE);

        return $qb;
    }
}
