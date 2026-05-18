<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCA\Agora\Db\SupportResult;
use OCA\Agora\Db\SupportResultMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\SupportEngineMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\OptionMapper;
use Psr\Log\LoggerInterface;

class SupportResultService
{
    public function __construct(
        private SupportResultMapper $resultMapper,
        private SupportMapper $supportMapper,
        private SupportEngineMapper $engineMapper,
        private InquiryMapper $inquiryMapper,
        private OptionMapper $optionMapper,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Calculate results for a specific target
     */
    public function calculateTargetResults(?int $engineId, string $targetType, int $targetId): ?SupportResult
    {
        $this->logger->info('Calculating target results', [
            'engineId' => $engineId,
            'targetType' => $targetType,
            'targetId' => $targetId
        ]);
        
        // Get supports for this specific target
        $supports = $this->getSupportsForTarget($engineId, $targetType, $targetId);
        
        // Get the support feature/engine type
        $supportType = $this->getSupportType($engineId, $targetType, $targetId);
        
        // Calculate result based on type
        $resultData = $this->calculateByType($supportType, $supports);
        
        // Store the result
        return $this->resultMapper->upsertResult(
            $engineId,
            $targetType,
            $targetId,
            $resultData
        );
    }

    /**
     * Calculate results based on type for a single target
     */
        private function calculateByType(string $type, array $supports): array
{
    $this->debug('calculateByType called', [
        'type' => $type,
        'supportsCount' => count($supports)
    ]);
    
    if (empty($supports)) {
        $emptyResult = $this->getEmptyResult($type);
        $this->debug('No supports, returning empty result', ['result' => $emptyResult]);
        return $emptyResult;
    }
    
    $result = match($type) {
        'ternary' => $this->calculateTernaryResults($supports),
        'score' => $this->calculateScoreResults($supports),
        'star' => $this->calculateStarResults($supports),
        'reaction' => $this->calculateReactionResults($supports),
        'approval' => $this->calculateApprovalResults($supports),
        'ranking' => $this->calculateRankingResults($supports),
        'binary' => $this->calculateBinaryResults($supports),
        default => $this->calculateBinaryResults($supports),
    };
    
    $this->debug('calculateByType result', ['result' => $result]);
    
    return $result;
}
    /**
     * Calculate binary results
     */
    private function calculateBinaryResults(array $supports): array
{
    $yes = 0;
    $no = 0;
    
    foreach ($supports as $support) {
        $value = $support->getValue();
        $weight = $support->getWeight();
        
        $this->debug('Processing binary support', [
            'user_id' => $support->getUserId(),
            'raw_value' => $value,
            'value_type' => gettype($value),
            'weight' => $weight
        ]);
        
        // Extract value from JSON format: {"value":1} or {"type":"binary","value":1}
        $voteValue = 0;
        if (is_array($value)) {
            $voteValue = $value['value'] ?? 0;
            $this->debug('Value is array', ['voteValue' => $voteValue, 'array_keys' => array_keys($value)]);
        } elseif (is_string($value)) {
            $decoded = json_decode($value, true);
            $voteValue = $decoded['value'] ?? (int)$value;
            $this->debug('Value is string', ['decoded' => $decoded, 'voteValue' => $voteValue]);
        } else {
            $voteValue = (int)$value;
            $this->debug('Value is other type', ['voteValue' => $voteValue]);
        }
        
        if ($voteValue === 1) {
            $yes += $weight;
            $this->debug('Added to YES', ['weight' => $weight, 'total_yes' => $yes]);
        } elseif ($voteValue === -1) {
            $no += $weight;
            $this->debug('Added to NO', ['weight' => $weight, 'total_no' => $no]);
        } else {
            $this->debug('Ignored value (not yes or no)', ['voteValue' => $voteValue]);
        }
    }
    
    $total = $yes + $no;
    $result = [
        'type' => 'binary',
        'totals' => ['yes' => $yes, 'no' => $no],
        'percentages' => [
            'yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
            'no' => $total > 0 ? round(($no / $total) * 100, 2) : 0
        ]
    ];
    
    $this->debug('Binary result final', ['result' => $result]);
    
    return $result;
}
    /**
     * Calculate ternary results
     */
        private function calculateTernaryResults(array $supports): array
{
    $yes = 0;
    $no = 0;
    $abstain = 0;
    
    foreach ($supports as $support) {
        $value = $support->getValue();
        $weight = $support->getWeight();
        
        $this->debug('Processing ternary support', [
            'user_id' => $support->getUserId(),
            'raw_value' => $value,
            'value_type' => gettype($value),
            'weight' => $weight
        ]);
        
        // Extract value from JSON format: {"value":1} or {"type":"ternary","value":1}
        $voteValue = 0;
        if (is_array($value)) {
            $voteValue = $value['value'] ?? 0;
        } elseif (is_string($value)) {
            $decoded = json_decode($value, true);
            $voteValue = $decoded['value'] ?? (int)$value;
        } else {
            $voteValue = (int)$value;
        }
        
        $this->debug('Extracted vote value', ['voteValue' => $voteValue]);
        
        if ($voteValue === 1) {
            $yes += $weight;
            $this->debug('Added to YES', ['weight' => $weight, 'total_yes' => $yes]);
        } elseif ($voteValue === -1) {
            $no += $weight;
            $this->debug('Added to NO', ['weight' => $weight, 'total_no' => $no]);
        } else {
            $abstain += $weight;
            $this->debug('Added to ABSTAIN', ['weight' => $weight, 'total_abstain' => $abstain]);
        }
    }
    
    $total = $yes + $no + $abstain;
    $result = [
        'type' => 'ternary',
        'totals' => ['yes' => $yes, 'no' => $no, 'abstain' => $abstain],
        'percentages' => [
            'yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
            'no' => $total > 0 ? round(($no / $total) * 100, 2) : 0,
            'abstain' => $total > 0 ? round(($abstain / $total) * 100, 2) : 0
        ]
    ];
    
    $this->debug('Ternary result final', ['result' => $result]);
    
    return $result;
        }


    /**
     * Calculate score results
     */
    private function calculateScoreResults(array $supports): array
    {
        $total = 0;
        $sum = 0;
        
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            
            // Extract score from JSON format: {"type":"score","value":7}
            $score = is_array($value) ? ($value['value'] ?? 0) : (int)$value;
            
            $total += $weight;
            $sum += $score * $weight;
        }
        
        return [
            'type' => 'score',
            'totals' => [
                'total' => $total,
                'average' => $total > 0 ? round($sum / $total, 2) : 0
            ]
        ];
    }

    /**
     * Calculate star results
     */
    private function calculateStarResults(array $supports): array
    {
        $result = $this->calculateScoreResults($supports);
        $result['type'] = 'star';
        return $result;
    }

    /**
     * Calculate reaction results
     */
    private function calculateReactionResults(array $supports): array
    {
        $counts = [];
        
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            
            // Extract reaction from JSON format: {"type":"reaction","value":"👍"}
            $reaction = is_array($value) ? ($value['value'] ?? null) : (string)$value;
            
            if ($reaction) {
                $counts[$reaction] = ($counts[$reaction] ?? 0) + $weight;
            }
        }
        
        return [
            'type' => 'reaction',
            'counts' => $counts
        ];
    }

    /**
     * Calculate approval results
     */
    private function calculateApprovalResults(array $supports): array
    {
        $counts = [];
        
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            
            // Extract approved options from JSON format: {"type":"approval","value":[1,3,5]}
            $approved = is_array($value) ? ($value['value'] ?? []) : [];
            
            foreach ($approved as $optionId) {
                $optionId = (int)$optionId;
                $counts[$optionId] = ($counts[$optionId] ?? 0) + $weight;
            }
        }
        
        return [
            'type' => 'approval',
            'counts' => $counts
        ];
    }

    /**
     * Calculate ranking results
     */
    private function calculateRankingResults(array $supports): array
    {
        $rankings = [];
        
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            
            // Extract ranking from JSON format: {"type":"ranking","value":[2,1,3]}
            $ranking = is_array($value) ? ($value['value'] ?? []) : [];
            
            foreach ($ranking as $position => $optionId) {
                if (!isset($rankings[$optionId])) {
                    $rankings[$optionId] = ['total' => 0, 'count' => 0];
                }
                $rankings[$optionId]['total'] += $weight * ($position + 1);
                $rankings[$optionId]['count'] += $weight;
            }
        }
        
        // Calculate average ranks
        $averages = [];
        foreach ($rankings as $optionId => $data) {
            $averages[$optionId] = round($data['total'] / $data['count'], 2);
        }
        
        return [
            'type' => 'ranking',
            'rankings' => $averages
        ];
    }

    /**
     * Get empty result structure
     */
    private function getEmptyResult(string $type): array
    {
        return match($type) {
            'ternary' => [
                'type' => 'ternary',
                'totals' => ['yes' => 0, 'no' => 0, 'abstain' => 0],
                'percentages' => ['yes' => 0, 'no' => 0, 'abstain' => 0]
            ],
            'binary' => [
                'type' => 'binary',
                'totals' => ['yes' => 0, 'no' => 0],
                'percentages' => ['yes' => 0, 'no' => 0]
            ],
            'score', 'star' => [
                'type' => $type,
                'totals' => ['total' => 0, 'average' => 0]
            ],
            'reaction' => [
                'type' => 'reaction',
                'counts' => []
            ],
            'approval' => [
                'type' => 'approval',
                'counts' => []
            ],
            'ranking' => [
                'type' => 'ranking',
                'rankings' => []
            ],
            'none' => [
                'type' => 'none',
                'total_participants' => 0
            ],
            default => [
                'type' => 'binary',
                'totals' => ['yes' => 0, 'no' => 0],
                'percentages' => ['yes' => 0, 'no' => 0]
            ]
        };
    }

    /**
     * Get supports for a specific target
     */
    private function getSupportsForTarget(?int $engineId, string $targetType, int $targetId): array
    {
        if ($engineId === null) {
            // Informal supports: get all supports for this target regardless of engine
            if ($targetType === 'inquiry') {
                return $this->supportMapper->findByInquiryIdAndOption($targetId, 0);
            } else {
                return $this->supportMapper->findByOptionId($targetId);
            }
        }
        
        // Formal engine: get supports only for this engine and target
        if ($targetType === 'inquiry') {
            return $this->supportMapper->findByEngineAndInquiry($engineId, $targetId);
        } else {
            return $this->supportMapper->findByEngineAndOption($engineId, $targetId);
        }
    }

    /**
     * Get the support type/engine type for a target
     */
    private function getSupportType(?int $engineId, string $targetType, int $targetId): string
    {
        if ($engineId === null) {
            // For informal supports, get from inquiry or option
            if ($targetType === 'inquiry') {
                try {
                    $inquiry = $this->inquiryMapper->find($targetId);
                    return $inquiry->getSupportFeature() ?: 'binary';
                } catch (\Exception $e) {
                    $this->logger->error('Failed to get inquiry support feature', ['error' => $e->getMessage()]);
                    return 'binary';
                }
            } else {
                try {
                    $option = $this->optionMapper->find($targetId);
                    return $option->getSupportFeature() ?: 'binary';
                } catch (\Exception $e) {
                    $this->logger->error('Failed to get option support feature', ['error' => $e->getMessage()]);
                    return 'binary';
                }
            }
        }
        
        // For formal engines, get from engine config
        try {
            $engine = $this->engineMapper->find($engineId);
            if ($engine) {
                $config = $engine->getConfig();
                return $config['support_feature'] ?? $engine->getEngine() ?? 'binary';
            }
        } catch (\Exception $e) {
            $this->logger->error('Failed to get engine support feature', ['error' => $e->getMessage(), 'engineId' => $engineId]);
        }
        
        return 'binary';
    }
    /**
 * Calculate results for all targets of a specific engine
 * For engineId = null (informal), calculates for all supports without engine
 */
public function calculateResults(?int $engineId = null): array
{
    $this->logger->info('Calculating all results', ['engineId' => $engineId]);
    
    // Get all supports for this engine (or all informal if engineId = null)
    $supports = $this->getSupportsForEngine($engineId);
    
    // Group supports by target
    $grouped = $this->groupSupportsByTarget($supports);
    
    // Calculate results for each target
    $results = [];
    foreach ($grouped as $targetKey => $targetSupports) {
        [$targetType, $targetId] = explode('-', $targetKey);
        
        // Get support type for this target
        $supportType = $this->getSupportTypeForTarget((int)$targetId, $targetType);
        
        // Calculate result
        $resultData = $this->calculateByType($supportType, $targetSupports);
        
        // Store result
        $stored = $this->resultMapper->upsertResult(
            $engineId,
            $targetType,
            (int)$targetId,
            $resultData
        );
        $results[] = $stored;
    }
    
    return $results;
}

/**
 * Get all supports for a specific engine (or informal if null)
 */
private function getSupportsForEngine(?int $engineId): array
{
    if ($engineId === null) {
        // Get all informal supports (support_engine_id IS NULL)
        // You may need to add this method to SupportMapper
        return $this->supportMapper->findBySupportEngineId(null);
    }
    
    return $this->supportMapper->findBySupportEngineId($engineId);
}

/**
 * Get support type for a target by ID and type
 */
private function getSupportTypeForTarget(int $targetId, string $targetType): string
{
    if ($targetType === 'inquiry') {
        try {
            $inquiry = $this->inquiryMapper->find($targetId);
            return $inquiry->getSupportFeature() ?: 'binary';
        } catch (\Exception $e) {
            return 'binary';
        }
    } else {
        try {
            $option = $this->optionMapper->find($targetId);
            return $option->getSupportFeature() ?: 'binary';
        } catch (\Exception $e) {
            return 'binary';
        }
    }
}

/**
 * Debug method for SupportService
 */
private function debug(string $message, array $context = []): void
{
    $this->logger->debug('[SupportService] ' . $message, array_merge([
        'trace' => debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2)[1]['function'] ?? 'unknown'
    ], $context));
}

/**
 * Calculate results from a provided array of supports (no DB read)
 * This avoids dirty table reads by using already fetched data
 * 
 * @param int $inquiryId
 * @param int $optionId
 * @param array $supports Array of Support entities
 * @param int|null $engineId
 * @return array The calculated result
 */

public function calculateFromSupports(int $inquiryId, int $optionId, array $supports, ?int $engineId = null): array
{
    $targetType = $optionId > 0 ? 'option' : 'inquiry';
    $targetId = $optionId > 0 ? $optionId : $inquiryId;

    $this->debug('=== calculateFromSupports START ===', [
        'inquiryId' => $inquiryId,
        'optionId' => $optionId,
        'targetType' => $targetType,
        'targetId' => $targetId,
        'engineId' => $engineId,
        'supportsCount' => count($supports)
    ]);

    // Debug each support
    foreach ($supports as $index => $support) {
        $this->debug("Support #{$index}", [
            'userId' => $support->getUserId(),
            'optionId' => $support->getOptionId(),
            'value_raw' => $support->getValue(),
            'value_decoded' => is_string($support->getValue()) ? json_decode($support->getValue(), true) : $support->getValue(),
            'weight' => $support->getWeight()
        ]);
    }

    // Get the support feature type for this target
    $supportType = $this->getSupportTypeFromTarget($inquiryId, $optionId);
    $this->debug('Support type', ['type' => $supportType]);

    // Calculate result based on supports array
    $resultData = $this->calculateByType($supportType, $supports);
    $this->debug('Calculated result', ['result' => $resultData]);

    // Store the result
    $stored = $this->resultMapper->upsertResult(
        $engineId,
        $targetType,
        $targetId,
        $resultData
    );

    $this->debug('Result stored', [
        'resultId' => $stored->getId(),
        'stored_result' => $stored->getResult()
    ]);

    $this->debug('=== calculateFromSupports END ===');

    return $resultData;
}

/**
 * Get support type from inquiry or option without reading supports table
 */
private function getSupportTypeFromTarget(int $inquiryId, int $optionId): string
{
    if ($optionId > 0) {
        try {
            $option = $this->optionMapper->find($optionId);
            return $option->getSupportFeature() ?: 'binary';
        } catch (\Exception $e) {
            $this->logger->error('Failed to get option support feature', ['error' => $e->getMessage()]);
            return 'binary';
        }
    }
    
    try {
        $inquiry = $this->inquiryMapper->find($inquiryId);
        return $inquiry->getSupportFeature() ?: 'binary';
    } catch (\Exception $e) {
        $this->logger->error('Failed to get inquiry support feature', ['error' => $e->getMessage()]);
        return 'binary';
    }
}

/**
 * Group supports by target
 */
private function groupSupportsByTarget(array $supports): array
{
    $grouped = [];
    foreach ($supports as $support) {
        $targetType = $support->getOptionId() > 0 ? 'option' : 'inquiry';
        $targetId = $support->getOptionId() > 0 ? $support->getOptionId() : $support->getInquiryId();
        $key = $targetType . '-' . $targetId;
        
        if (!isset($grouped[$key])) {
            $grouped[$key] = [];
        }
        $grouped[$key][] = $support;
    }
    return $grouped;
}
}
