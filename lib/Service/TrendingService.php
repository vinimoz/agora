<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Option;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\CommentMapper;
use OCA\Agora\Db\OptionMapper;
use Psr\Log\LoggerInterface;
use OCP\Cache\IMemcache;
use OCP\ICacheFactory;
use OCP\ICache;

class TrendingService
{
    // Weight constants for trending calculation
    private const VOTE_WEIGHT = 0.4;
    private const COMMENT_WEIGHT = 0.3;
    private const RECENCY_WEIGHT = 0.2;
    private const ENGAGEMENT_WEIGHT = 0.1;

    // Cache TTL in seconds (5 minutes)
    private const CACHE_TTL = 300;
    private const CACHE_PREFIX = 'trending_';

    private ?ICache $cache = null;

    public function __construct(
        private SupportMapper $supportMapper,
        private CommentMapper $commentMapper,
        private OptionMapper $optionMapper,
        private LoggerInterface $logger,
        ICacheFactory $cacheFactory,
    ) {
        // Use the factory to create a cache instance
        try {
            // Try to create a distributed cache
            if (method_exists($cacheFactory, 'createDistributed')) {
                $cache = $cacheFactory->createDistributed(self::CACHE_PREFIX);
                if ($cache instanceof ICache) {
                    $this->cache = $cache;
                }
            } elseif (method_exists($cacheFactory, 'create')) {
                $cache = $cacheFactory->create(self::CACHE_PREFIX);
                if ($cache instanceof ICache) {
                    $this->cache = $cache;
                }
            }
        } catch (\Exception $e) {
            $this->logger->warning('Could not initialize cache for TrendingService: ' . $e->getMessage());
            $this->cache = null;
        }
    }

    /**
     * Get trending scores for an inquiry (with caching)
     */
    public function getTrendingScores(int $inquiryId, bool $useCache = true): array
    {
        $cacheKey = $this->getCacheKey($inquiryId);

        if ($useCache && $this->cache !== null) {
            $cached = $this->cache->get($cacheKey);
            if ($cached !== null && is_array($cached)) {
                $this->logger->debug('Trending scores served from cache', ['inquiryId' => $inquiryId]);
                return $cached;
            }
        }

        try {
            $scores = $this->calculateTrendingScores($inquiryId);
            
            if ($this->cache !== null) {
                $this->cache->set($cacheKey, $scores, self::CACHE_TTL);
                $this->logger->debug('Trending scores cached', ['inquiryId' => $inquiryId]);
            }
            
            return $scores;
        } catch (\Exception $e) {
            $this->logger->error('Failed to calculate trending scores', [
                'inquiryId' => $inquiryId,
                'error' => $e->getMessage()
            ]);
            return [];
        }
    }

    /**
     * Calculate trending scores for all options in an inquiry
     */
    private function calculateTrendingScores(int $inquiryId, ?array $options = null): array
    {
        if ($options === null) {
            $options = $this->optionMapper->findByTargetId($inquiryId);
        }

        $trendingScores = [];
        $currentTime = time();

        // Get all supports for this inquiry (deliberative mode only)
        $supports = $this->supportMapper->findByInquiryId($inquiryId);
        
        // Get all comments for this inquiry
        $comments = $this->commentMapper->findByInquiryId($inquiryId);

        // Group supports by option ID
        $supportsByOption = [];
        foreach ($supports as $support) {
            $optionId = $support->getOptionId();
            if (!isset($supportsByOption[$optionId])) {
                $supportsByOption[$optionId] = [];
            }
            $supportsByOption[$optionId][] = $support;
        }

        // Group comments by option ID
        $commentsByOption = [];
        foreach ($comments as $comment) {
            $optionId = $comment->getOptionId();
            if (!isset($commentsByOption[$optionId])) {
                $commentsByOption[$optionId] = [];
            }
            $commentsByOption[$optionId][] = $comment;
        }

        // Also get supports at inquiry level (option_id = 0) - these contribute to all options
        $inquirySupports = $supportsByOption[0] ?? [];

        foreach ($options as $option) {
            $optionId = $option->getId();
            
            // Merge option-specific supports with inquiry-level supports
            $optionSupports = array_merge(
                $supportsByOption[$optionId] ?? [],
                $inquirySupports
            );
            
            $optionComments = $commentsByOption[$optionId] ?? [];

            $trendingScores[$optionId] = $this->calculateTrendingScore(
                $option,
                $optionSupports,
                $optionComments,
                $currentTime
            );
        }

        return $trendingScores;
    }

    /**
     * Calculate trending score for a single option
     */
    public function calculateTrendingScore(
        Option $option,
        array $supports,
        array $comments,
        int $currentTime
    ): float {
        $voteScore = $this->calculateVoteScore($supports);
        $commentScore = $this->calculateCommentScore($comments);
        $recencyScore = $this->calculateRecencyScore($option, $currentTime);
        $engagementScore = $this->calculateEngagementScore($supports, $comments);

        $score = ($voteScore * self::VOTE_WEIGHT) +
                 ($commentScore * self::COMMENT_WEIGHT) +
                 ($recencyScore * self::RECENCY_WEIGHT) +
                 ($engagementScore * self::ENGAGEMENT_WEIGHT);

        return round($score, 2);
    }

    private function calculateVoteScore(array $supports): float
    {
        if (empty($supports)) {
            return 0;
        }

        $totalNormalized = 0;
        $count = 0;

        foreach ($supports as $support) {
            $value = $support->getValue();
            $normalized = $this->normalizeSupportValue($value);
            $totalNormalized += $normalized;
            $count++;
        }

        return min(100, ($totalNormalized / $count) * 100);
    }

    private function normalizeSupportValue(mixed $value): float
    {
        if (is_numeric($value)) {
            $num = (float)$value;
            if ($num >= -1 && $num <= 1) {
                return ($num + 1) * 50;
            }
            if ($num >= 0 && $num <= 10) {
                return $num * 10;
            }
            if ($num >= 1 && $num <= 5) {
                return (($num - 1) / 4) * 100;
            }
            return min(100, max(0, $num));
        }

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                if (isset($decoded['value'])) {
                    return $this->normalizeSupportValue($decoded['value']);
                }
                if (isset($decoded['grade']) && is_string($decoded['grade'])) {
                    return 100;
                }
                if (is_string($decoded) || isset($decoded['reaction'])) {
                    return 100;
                }
            }
            return $value !== '' ? 100 : 0;
        }

        if (is_array($value)) {
            if (isset($value['selected']) && is_array($value['selected'])) {
                return 100;
            }
            if (isset($value['ranking']) && is_array($value['ranking'])) {
                $ranks = array_values($value['ranking']);
                if (!empty($ranks)) {
                    $minRank = min($ranks);
                    $maxRank = max($ranks);
                    if ($maxRank > $minRank) {
                        return 100 - (($ranks[0] - $minRank) / ($maxRank - $minRank)) * 100;
                    }
                    return 100;
                }
            }
            if (isset($value['grades']) && is_array($value['grades'])) {
                return 100;
            }
            return !empty($value) ? 100 : 0;
        }

        if (is_bool($value)) {
            return $value ? 100 : 0;
        }

        return $value !== null && $value !== '' ? 100 : 0;
    }

    private function calculateCommentScore(array $comments): float
    {
        $count = count($comments);
        if ($count === 0) {
            return 0;
        }
        return min(100, log($count + 1, 2) * 25);
    }

    private function calculateRecencyScore(Option $option, int $currentTime): float
    {
        $created = $option->getCreated();
        if ($created === 0) {
            return 0;
        }
        $ageInDays = ($currentTime - $created) / (24 * 3600);
        return max(0, 100 - ($ageInDays * 10));
    }

    private function calculateEngagementScore(array $supports, array $comments): float
    {
        $uniqueUserIds = [];

        foreach ($supports as $support) {
            $userId = $support->getUserId();
            if ($userId !== '') {
                $uniqueUserIds[$userId] = true;
            }
        }

        foreach ($comments as $comment) {
            $userId = $comment->getUserId();
            if ($userId !== '') {
                $uniqueUserIds[$userId] = true;
            }
        }

        $participantCount = count($uniqueUserIds);
        if ($participantCount === 0) {
            return 0;
        }
        return min(100, $participantCount * 10);
    }

    public function getTopTrendingOptions(int $inquiryId, int $limit = 5, bool $useCache = true): array
    {
        $scores = $this->getTrendingScores($inquiryId, $useCache);
        arsort($scores);
        return array_slice($scores, 0, $limit, true);
    }

    public function invalidateCache(int $inquiryId): void
    {
        if ($this->cache !== null) {
            $cacheKey = $this->getCacheKey($inquiryId);
            $this->cache->remove($cacheKey);
            $this->logger->debug('Trending cache invalidated', ['inquiryId' => $inquiryId]);
        }
    }

    private function getCacheKey(int $inquiryId): string
    {
        return self::CACHE_PREFIX . 'inquiry_' . $inquiryId;
    }
}
