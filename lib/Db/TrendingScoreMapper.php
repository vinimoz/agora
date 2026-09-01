<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<TrendingScore>
 */
class TrendingScoreMapper extends QBMapper
{
    public const TABLE = TrendingScore::TABLE;

    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, self::TABLE, TrendingScore::class);
    }

    /**
     * Find a trending score by inquiry ID and option ID
     */
    public function find(int $inquiryId, int $optionId = 0): ?TrendingScore
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('option_id', $qb->createNamedParameter($optionId, IQueryBuilder::PARAM_INT)));

        try {
            return $this->findEntity($qb);
        } catch (\OCP\AppFramework\Db\DoesNotExistException $e) {
            return null;
        }
    }

    /**
     * Get all trending scores for an inquiry
     * @return TrendingScore[]
     */
    public function findByInquiryId(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
            ->orderBy('score', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Get trending scores with option details for an inquiry
     * @return array Array of scores with option details
     */
    public function findByInquiryIdWithOptions(int $inquiryId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select([
            'ts.*',
            'o.id AS option_id',
            'o.title AS option_title',
            'o.type AS option_type'
        ])
        ->from($this->getTableName(), 'ts')
        ->leftJoin('ts', Option::TABLE, 'o', $qb->expr()->eq('ts.option_id', 'o.id'))
        ->where($qb->expr()->eq('ts.inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
        ->orderBy('ts.score', 'DESC');

        $stmt = $qb->executeQuery();
        $results = [];
        while ($row = $stmt->fetch()) {
            $results[] = $row;
        }
        $stmt->closeCursor();
        return $results;
    }

    /**
     * Get the top trending scores across all inquiries (for global trending)
     * @return TrendingScore[]
     */
    public function findTopGlobal(int $limit = 10): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('option_id', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)))
            ->orderBy('score', 'DESC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * Get trending scores that are stale (older than X seconds)
     * @return TrendingScore[]
     */
    public function findStaleScores(int $maxAgeSeconds = 3600): array
    {
        $threshold = time() - $maxAgeSeconds;
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->lt('updated_at', $qb->createNamedParameter($threshold, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    /**
     * Insert or update a trending score
     */
    public function upsert(TrendingScore $score): TrendingScore
    {
        $existing = $this->find($score->getInquiryId(), $score->getOptionId());

        if ($existing !== null) {
            $existing->setScore($score->getScore());
            $existing->setUpdatedAt($score->getUpdatedAt());
            return $this->update($existing);
        }

        return $this->insert($score);
    }

    /**
     * Batch upsert trending scores
     * @param TrendingScore[] $scores
     */
    public function batchUpsert(array $scores): void
    {
        foreach ($scores as $score) {
            $this->upsert($score);
        }
    }

    /**
     * Delete all trending scores for an inquiry
     */
    public function deleteByInquiryId(int $inquiryId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Delete stale trending scores older than X days
     */
    public function deleteStaleScores(int $maxAgeDays = 30): int
    {
        $threshold = time() - ($maxAgeDays * 24 * 3600);
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->lt('updated_at', $qb->createNamedParameter($threshold, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }
}
