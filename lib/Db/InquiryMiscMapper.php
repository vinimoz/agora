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
 * @template-extends QBMapper<InquiryMisc>
 */
class InquiryMiscMapper extends QBMapper
{
    public const TABLE = InquiryMisc::TABLE;

    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, InquiryMisc::class);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryMisc
     */
    public function find(int $id): InquiryMisc
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryMisc[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return InquiryMisc
     */
    public function findByInquiryIdAndKey(int $inquiryId, string $key): InquiryMisc
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->andWhere($qb->expr()->eq(self::TABLE . '.key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));
        return $this->findEntity($qb);
    }

    /**
     * @return InquiryMisc[]
     */
    public function findByKey(string $key): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));
        return $this->findEntities($qb);
    }

    /**
     * Get a setting value by inquiry ID and key
     */
    public function getValue(int $inquiryId, string $key): ?string
    {
        try {
            $setting = $this->findByInquiryIdAndKey($inquiryId, $key);
            return $setting->getValue();
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        } catch (\OCP\AppFramework\Db\MultipleObjectsReturnedException $e) {
            $settings = $this->findByInquiryIdAndKeyMultiple($inquiryId, $key);
            return !empty($settings) ? $settings[0]->getValue() : null;
        }
    }
    /**
     * Set multiple misc fields for an inquiry (create or update)
     */
    public function setValues(int $inquiryId, array $dynamicFields): void
    {
        if (empty($dynamicFields)) {
            return;
        }

    // Delete existing records for this inquiry
        $qb = $this->db->getQueryBuilder();
        $qb->delete(InquiryMisc::TABLE)
        ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();

    // Then insert new settings
        foreach ($dynamicFields as $key => $value) {
            $qb = $this->db->getQueryBuilder();
            $qb->insert(InquiryMisc::TABLE)
            ->values(
                [
                'inquiry_id' => $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT),
                'key' => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                'value' => $qb->createNamedParameter($value, IQueryBuilder::PARAM_STR),
                ]
            )
            ->executeStatement();
        }
    }

    public function setValue(int $inquiryId, string $key, $value): InquiryMisc
    {
        // Create the entity object first
        $miscField = new InquiryMisc();
        $miscField->setInquiryId($inquiryId);
        $miscField->setKey($key);
        $miscField->setValue($value);

        // First delete existing value
        $qb = $this->db->getQueryBuilder();
        $qb->delete(InquiryMisc::TABLE)
        ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
        ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));
        $qb->executeStatement();

        // Then insert new value if not null
        if ($value !== null) {
            $qb = $this->db->getQueryBuilder();
            $qb->insert(InquiryMisc::TABLE)
            ->values(
                [
                'inquiry_id' => $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT),
                'key' => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
                'value' => $qb->createNamedParameter($value, IQueryBuilder::PARAM_STR),
                ]
            )
            ->executeStatement();
        }

        return $miscField;
    }

    /**
     * Delete all settings for an inquiry
     */
    public function deleteByInquiryId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
        ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Delete a specific setting by inquiry ID and key
     */
    public function deleteByInquiryIdAndKey(int $inquiryId, string $key): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
        ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
        ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)));

        return $qb->executeStatement();
    }

    /**
     * Find multiple settings by inquiry ID and key (in case of duplicates)
     *
     * @return InquiryMisc[]
     */
    private function findByInquiryIdAndKeyMultiple(int $inquiryId, string $key): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
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
