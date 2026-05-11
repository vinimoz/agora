<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\SupportResult;
use OCA\Agora\Db\SupportResultMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\SupportEngineMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class SupportResultService
{
    public function __construct(
        private SupportResultMapper $resultMapper,
        private SupportMapper $supportMapper,
        private SupportEngineMapper $engineMapper,
        private LoggerInterface $logger,
    ) {
    }

    public function getResultsByEngine(int $engineId): array
    {
        $engines = $this->processMapper->findByEngineId($engineId);
        $results = [];
        
        foreach ($engines as $process) {
            $engineResults = $this->resultMapper->findByEngineId($process->getId());
            $results = array_merge($results, $engineResults);
        }
        
        return $results;
    }

    public function getResultsByTarget(string $targetType, int $targetId, ?int $engineId = 0): array
    {
        $results = $this->resultMapper->findByTarget($targetType, $targetId);
        
        if ($engineId !== 0) {
            $engines = $this->processMapper->findByEngineId($engineId);
            $engineIds = array_map(fn($p) => $p->getId(), $processes);
            
            $results = array_filter($results, function($result) use ($engineIds) {
                return in_array($result->getSupportEngineId(), $engineIds);
            });
        }
        
        return array_values($results);
    }

    public function getResult(int $resultId): ?SupportResult
    {
        try {
            return $this->resultMapper->find($resultId);
        } catch (DoesNotExistException $e) {
            $this->logger->warning('Support result not found: ' . $resultId);
            return null;
        }
    }


    public function calculateResults(int $engineId): array
    {
        $engine = $this->engineMapper->find($engineId);
        if ($engine === null) {
            throw new \InvalidArgumentException('Engine not found');
        }

        $supports = $this->supportMapper->findBySupportEngineId($engineId);
        $grouped = $this->groupSupportsByTarget($supports);
        $results = $this->calculateByEngineType($engine->getEngine(), $grouped);

        $engines = $this->processMapper->findByEngineId($engineId);
        $storedResults = [];
        
        foreach ($engines as $process) {
            foreach ($results as $targetId => $resultData) {
                $stored = $this->resultMapper->upsertResult(
                    $engine->getId(),
                    $engine->getTargetType(),
                    $targetId,
                    $resultData
                );
                $storedResults[] = $stored;
            }
        }

        return $storedResults;
    }


/**
     * Calculate results for a specific target
     */
    public function calculateTargetResults(int $engineId, string $targetType, int $targetId): ?SupportResult
    {
        $engine = $this->engineMapper->find($engineId);
        if ($engine === null) {
            throw new \InvalidArgumentException('Engine not found');
        }

        $supports = $this->supportMapper->findBySupportEngineId($engineId);
        $grouped = $this->groupSupportsByTarget($supports);
        $results = $this->calculateByEngineType($engine->getEngine(), $grouped);

        $engines = $this->processMapper->findByEngineId($engineId);
        $engine = $processes[0] ?? null;
        
        if ($engine && isset($results[$targetId])) {
            return $this->resultMapper->upsertResult(
                $engine->getId(),
                $targetType,
                $targetId,
                $results[$targetId]
            );
        }

        return null;
    }

    /**
     * Group supports by target_id (not option_id)
     */
    private function groupSupportsByTarget(array $supports): array
    {
        $grouped = [];
        foreach ($supports as $support) {
            // Group by what we're voting ON
            // If the support has an option_id > 0, that's the target
            // Otherwise, the inquiry_id is the target
            $targetId = $support->getOptionId() > 0 
                ? $support->getOptionId() 
                : $support->getInquiryId();
            
            if (!isset($grouped[$targetId])) {
                $grouped[$targetId] = [];
            }
            $grouped[$targetId][] = $support;
        }
        return $grouped;
    }
    
    public function exportResults(int $engineId, string $format = 'json'): mixed
    {
        $results = $this->getResultsByEngine($engineId);
        
        return match ($format) {
            'csv' => $this->exportToCsv($results),
            default => $results,
        };
    }

    private function calculateByEngineType(string $engineType, array $grouped): array
    {
        return match ($engineType) {
            'binary' => $this->calculateBinaryResults($grouped),
            'ternary' => $this->calculateTernaryResults($grouped),
            'score', 'star' => $this->calculateScoreResults($grouped),
            'approval' => $this->calculateApprovalResults($grouped),
            'reaction' => $this->calculateReactionResults($grouped),
            default => $this->calculateDefaultResults($grouped),
        };
    }

    private function calculateBinaryResults(array $grouped): array
    {
        $results = [];
        foreach ($grouped as $optionId => $supports) {
            $yes = $no = 0;
            foreach ($supports as $support) {
                $value = $support->getValue();
                if ($value === 1 || $value === 'yes' || $value === true) {
                    $yes += $support->getWeight();
                } else {
                    $no += $support->getWeight();
                }
            }
            $total = $yes + $no;
            $results[$optionId] = [
                'type' => 'binary',
                'total_yes' => $yes,
                'total_no' => $no,
                'percentage_yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
                'percentage_no' => $total > 0 ? round(($no / $total) * 100, 2) : 0,
            ];
        }
        return $results;
    }

    private function calculateTernaryResults(array $grouped): array
    {
        $results = [];
        foreach ($grouped as $optionId => $supports) {
            $yes = $no = $abstain = 0;
            foreach ($supports as $support) {
                $value = $support->getValue();
                if ($value === 1 || $value === 'yes') {
                    $yes += $support->getWeight();
                } elseif ($value === -1 || $value === 'no') {
                    $no += $support->getWeight();
                } else {
                    $abstain += $support->getWeight();
                }
            }
            $total = $yes + $no + $abstain;
            $results[$optionId] = [
                'type' => 'ternary',
                'total_yes' => $yes,
                'total_no' => $no,
                'total_abstain' => $abstain,
                'percentage_yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
                'percentage_no' => $total > 0 ? round(($no / $total) * 100, 2) : 0,
                'percentage_abstain' => $total > 0 ? round(($abstain / $total) * 100, 2) : 0,
            ];
        }
        return $results;
    }

    private function calculateScoreResults(array $grouped): array
    {
        $results = [];
        foreach ($grouped as $optionId => $supports) {
            $total = $weightSum = 0;
            foreach ($supports as $support) {
                $value = (float) $support->getValue();
                $total += $value * $support->getWeight();
                $weightSum += $support->getWeight();
            }
            $results[$optionId] = [
                'type' => 'score',
                'total' => $total,
                'average' => $weightSum > 0 ? round($total / $weightSum, 2) : 0,
                'weight_sum' => $weightSum,
            ];
        }
        return $results;
    }

    private function calculateApprovalResults(array $grouped): array
    {
        $results = [];
        foreach ($grouped as $optionId => $supports) {
            $counts = [];
            foreach ($supports as $support) {
                $value = $support->getValue();
                $key = is_array($value) ? implode(',', $value) : (string) $value;
                $counts[$key] = ($counts[$key] ?? 0) + $support->getWeight();
            }
            $results[$optionId] = [
                'type' => 'approval',
                'counts' => $counts,
            ];
        }
        return $results;
    }

    private function calculateReactionResults(array $grouped): array
    {
        $results = [];
        foreach ($grouped as $optionId => $supports) {
            $counts = [];
            foreach ($supports as $support) {
                $value = (string) $support->getValue();
                $counts[$value] = ($counts[$value] ?? 0) + 1;
            }
            $results[$optionId] = [
                'type' => 'reaction',
                'counts' => $counts,
            ];
        }
        return $results;
    }

    private function calculateDefaultResults(array $grouped): array
    {
        $results = [];
        foreach ($grouped as $optionId => $supports) {
            $total = array_sum(array_map(fn($s) => $s->getWeight(), $supports));
            $results[$optionId] = [
                'type' => 'trending',
                'score' => $total,
            ];
        }
        return $results;
    }

    private function exportToCsv(array $results): string
    {
        if (empty($results)) {
            return '';
        }

        $csv = '';
        foreach ($results as $result) {
            if ($result instanceof SupportResult) {
                $data = $result->getResult();
                if (empty($csv)) {
                    $csv .= 'Type,' . implode(',', array_keys($data)) . "\n";
                }
                $csv .= ($data['type'] ?? 'unknown') . ',' . implode(',', array_values($data)) . "\n";
            }
        }

        return $csv;
    }

    /**
     * Get result history (for changelog)
     */
    public function getResultHistory(int $resultId): array
    {
        $result = $this->getResult($resultId);
        if ($result === null) {
            return [];
        }
        // For now, return the current result as history
        // Future: implement actual history tracking with a separate table
        return [$result];
    }
}
