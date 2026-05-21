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

        // Get inquiryId and optionId for context
        $inquiryId = $targetType === 'inquiry' ? $targetId : null;
        $optionId = $targetType === 'option' ? $targetId : null;

        // Calculate result based on type
        $resultData = $this->calculateByType($supportType, $supports, $inquiryId, $optionId);

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
    private function calculateByType(string $type, array $supports, ?int $inquiryId = null, ?int $optionId = null): array
    {
        $this->debug('calculateByType called', [
            'type' => $type,
            'supportsCount' => count($supports),
            'inquiryId' => $inquiryId,
            'optionId' => $optionId
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
            'majority_judgment' => $this->calculateMajorityJudgmentResults($supports, $inquiryId, $optionId),
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
     * Calculate majority judgment results
     *
     * Majority judgment: Each voter assigns a grade to each option.
     * Grades are defined in the inquiry/option miscFields or supportTemplate
     *
     * @param array $supports Array of Support entities
     * @param int|null $inquiryId The inquiry ID
     * @param int|null $optionId The option ID
     * @return array
     */
    private function calculateMajorityJudgmentResults(array $supports, ?int $inquiryId = null, ?int $optionId = null): array
    {
        // Get grade scale from inquiry/option configuration
        $grades = $this->getMajorityJudgmentGrades($inquiryId, $optionId);

        if (empty($grades)) {
            $this->logger->error('No grades defined for majority judgment vote', [
                'inquiryId' => $inquiryId,
                'optionId' => $optionId
            ]);
            return $this->getEmptyResult('majority_judgment');
        }

        // Create grade order mapping (higher index = better rank? depends on order)
        // We assume grades are ordered from best to worst as stored
        $gradeOrder = array_flip($grades);

        // Group supports by option
        $optionsResults = [];
        $totalVotes = 0;

        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            $supportOptionId = $support->getOptionId();

            if ($supportOptionId <= 0) {
                continue; // Skip if not associated with an option
            }

            // Extract grade from JSON format: {"type":"majority_judgment","value":"Good"}
            // or just the grade string directly
            $grade = null;
            if (is_array($value)) {
                $grade = $value['value'] ?? null;
            } elseif (is_string($value)) {
                $decoded = json_decode($value, true);
                $grade = $decoded['value'] ?? $value;
            } else {
                $grade = (string)$value;
            }

            // Validate grade exists in defined scale
            if (!in_array($grade, $grades)) {
                $this->logger->warning('Invalid grade for majority judgment', [
                    'grade' => $grade,
                    'valid_grades' => $grades,
                    'optionId' => $supportOptionId,
                    'userId' => $support->getUserId()
                ]);
                continue;
            }

            // Initialize option if not exists
            if (!isset($optionsResults[$supportOptionId])) {
                $optionsResults[$supportOptionId] = [
                    'grades' => [], // All grades (weighted, flattened for median calculation)
                    'grade_counts' => array_fill_keys($grades, 0),
                    'total_weight' => 0
                ];
            }

            // Add weighted grade (flatten by weight for median calculation)
            for ($i = 0; $i < $weight; $i++) {
                $optionsResults[$supportOptionId]['grades'][] = $grade;
            }
            $optionsResults[$supportOptionId]['grade_counts'][$grade] += $weight;
            $optionsResults[$supportOptionId]['total_weight'] += $weight;
            $totalVotes += $weight;
        }

        // Calculate median grade and tie-breaking for each option
        $optionRankings = [];
        foreach ($optionsResults as $optionId => $data) {
            if (empty($data['grades'])) {
                $optionRankings[$optionId] = [
                    'median_grade' => null,
                    'median_index' => -1,
                    'above_share' => 0,
                    'below_share' => 0,
                    'grade_distribution' => $data['grade_counts'],
                    'total_votes' => 0
                ];
                continue;
            }

            // Sort grades according to defined order (best first)
            $sortedGrades = $data['grades'];
            usort($sortedGrades, function($a, $b) use ($gradeOrder) {
                return $gradeOrder[$a] <=> $gradeOrder[$b];
            });

            $total = count($sortedGrades);
            $medianIndex = (int)floor(($total - 1) / 2);
            $medianGrade = $sortedGrades[$medianIndex];

            // Calculate majority judgment tie-breaking
            // Count votes strictly above and below the median grade
            $aboveCount = 0;
            $belowCount = 0;

            foreach ($sortedGrades as $grade) {
                if ($gradeOrder[$grade] < $gradeOrder[$medianGrade]) {
                    $aboveCount++; // Better than median
                } elseif ($gradeOrder[$grade] > $gradeOrder[$medianGrade]) {
                    $belowCount++; // Worse than median
                }
            }

            $aboveShare = $total > 0 ? $aboveCount / $total : 0;
            $belowShare = $total > 0 ? $belowCount / $total : 0;

            $optionRankings[$optionId] = [
                'median_grade' => $medianGrade,
                'median_index' => $gradeOrder[$medianGrade],
                'above_share' => round($aboveShare, 4),
                'below_share' => round($belowShare, 4),
                'grade_distribution' => $data['grade_counts'],
                'total_votes' => $total
            ];
        }

        // Sort options by majority judgment rule:
        // 1. Higher median grade (lower index = better) wins
        // 2. If tied, the option with more grades ABOVE median wins
        // 3. If still tied, the option with fewer grades BELOW median wins
        uasort($optionRankings, function($a, $b) {
            // No votes case
            if ($a['median_grade'] === null && $b['median_grade'] === null) return 0;
            if ($a['median_grade'] === null) return 1;
            if ($b['median_grade'] === null) return -1;

            // Compare median indices (lower = better)
            if ($a['median_index'] != $b['median_index']) {
                return $a['median_index'] <=> $b['median_index'];
            }

            // Tie: compare above shares (higher is better)
            if ($a['above_share'] != $b['above_share']) {
                return $b['above_share'] <=> $a['above_share'];
            }

            // Still tied: compare below shares (lower is better)
            return $a['below_share'] <=> $b['below_share'];
        });

        // Determine winner (first option after sort)
        $winnerOptionId = null;
        $winnerRanking = null;
        if (!empty($optionRankings)) {
            $winnerOptionId = array_key_first($optionRankings);
            $winnerRanking = $optionRankings[$winnerOptionId];
        }

        return [
            'type' => 'majority_judgment',
            'grades' => $grades, // Dynamic grades from configuration
            'options' => $optionRankings,
            'winner' => $winnerOptionId,
            'winner_details' => $winnerRanking,
            'total_votes' => $totalVotes
        ];
    }

    /**
     * Get majority judgment grades from inquiry/option configuration
     *
     * Grades are stored in:
     * - For inquiries: miscFields['support_template']['grades'] or direct 'grades' field
     * - For options: miscFields['grades'] or supportTemplate['grades']
     *
     * @param int|null $inquiryId
     * @param int|null $optionId
     * @return array List of grades ordered from best to worst
     */
    private function getMajorityJudgmentGrades(?int $inquiryId, ?int $optionId = null): array
    {
        // First try to get from option (if provided and has its own grade scale)
        if ($optionId !== null && $optionId > 0) {
            try {
                $option = $this->optionMapper->find($optionId);
                if ($option) {
                    $miscFields = $option->getMiscFields();

                    // Check for grades in supportTemplate
                    if (isset($miscFields['support_template']['grades']) && is_array($miscFields['support_template']['grades'])) {
                        $this->debug('Got grades from option support_template', ['grades' => $miscFields['support_template']['grades']]);
                        return $miscFields['support_template']['grades'];
                    }

                    // Check for direct grades field
                    if (isset($miscFields['grades']) && is_array($miscFields['grades'])) {
                        $this->debug('Got grades from option miscFields', ['grades' => $miscFields['grades']]);
                        return $miscFields['grades'];
                    }
                }
            } catch (\Exception $e) {
                $this->logger->error('Failed to get option grades', ['error' => $e->getMessage()]);
            }
        }

        // Fall back to inquiry configuration
        if ($inquiryId !== null) {
            try {
                $inquiry = $this->inquiryMapper->find($inquiryId);
                if ($inquiry) {
                    $miscFields = $inquiry->getMiscFields();

                    // Check for grades in supportTemplate
                    if (isset($miscFields['support_template']['grades']) && is_array($miscFields['support_template']['grades'])) {
                        $this->debug('Got grades from inquiry support_template', ['grades' => $miscFields['support_template']['grades']]);
                        return $miscFields['support_template']['grades'];
                    }

                    // Check for direct grades field
                    if (isset($miscFields['grades']) && is_array($miscFields['grades'])) {
                        $this->debug('Got grades from inquiry miscFields', ['grades' => $miscFields['grades']]);
                        return $miscFields['grades'];
                    }
                }
            } catch (\Exception $e) {
                $this->logger->error('Failed to get inquiry grades', ['error' => $e->getMessage()]);
            }
        }

        // Default fallback (should not happen if vote is properly configured)
        $defaultGrades = ['Excellent', 'Good', 'Fair', 'Poor'];
        $this->logger->warning('No grades found for majority judgment, using defaults', [
            'inquiryId' => $inquiryId,
            'optionId' => $optionId,
            'defaultGrades' => $defaultGrades
        ]);

        return $defaultGrades;
    }

    /**
    private function calculateApprovalDeliberativeResults(array $supports, array $options = []): array
    {
        $counts = [];
        $totalVotes = 0;

        // Initialize counts for all options
        foreach ($options as $optionId) {
            $counts[$optionId] = 0;
        }

        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();

            // Parse the value - support value can be:
            // 1. Direct array: [1, 3, 5]
            // 2. JSON string: {"value": [1, 3, 5]} or {"type":"approval","value":[1,3,5]}
            // 3. Single value: 1 (for simple approval)
            $approvedOptions = [];

            if (is_array($value)) {
                // Check if it's the new format with 'value' key
                if (isset($value['value']) && is_array($value['value'])) {
                    $approvedOptions = $value['value'];
                } elseif (isset($value['type']) && $value['type'] === 'approval' && isset($value['value'])) {
                    $approvedOptions = $value['value'];
                } else {
                    // Assume array of option IDs
                    $approvedOptions = $value;
                }
            } elseif (is_string($value)) {
                // Try to parse JSON
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    if (isset($decoded['value']) && is_array($decoded['value'])) {
                        $approvedOptions = $decoded['value'];
                    } elseif (isset($decoded['type']) && $decoded['type'] === 'approval' && isset($decoded['value'])) {
                        $approvedOptions = $decoded['value'];
                    } elseif (is_array($decoded)) {
                        $approvedOptions = $decoded;
                    }
                } else {
                    // Single numeric value
                    $numericValue = (int)$value;
                    if ($numericValue > 0) {
                        $approvedOptions = [$numericValue];
                    }
                }
            } elseif (is_numeric($value)) {
                // Single numeric value (option ID or 1 for simple approval)
                $numericValue = (int)$value;
                if ($numericValue > 0) {
                    $approvedOptions = [$numericValue];
                }
            }

            // Count each approved option
            foreach ($approvedOptions as $optionId) {
                $optionId = (int)$optionId;
                if ($optionId > 0) {
                    $counts[$optionId] = ($counts[$optionId] ?? 0) + $weight;
                    $totalVotes++;
                }
            }
        }

        // Calculate percentages if needed
        $percentages = [];
        foreach ($counts as $optionId => $count) {
            $percentages[$optionId] = $totalVotes > 0 ? round(($count / $totalVotes) * 100, 1) : 0;
        }

        return [
            'type' => 'approval',
            'counts' => $counts,
            'percentages' => $percentages,
            'total_votes' => $totalVotes
        ];
    }*/

    /**
 * Calculate approval results for deliberative phase (simple approve/not approve)
 *
 * @param array $supports Array of support objects
 * @return array Result structure for approval voting
 */
private function calculateApprovalDeliberativeResults(array $supports): array
{
    $totalApproved = 0;
    $totalParticipants = count($supports);

    foreach ($supports as $support) {
        $value = $support->getValue();

        // Simple check: value is 1 (approved) or null/0 (not approved)
        if ($value === 1 || $value === '1') {
            $totalApproved++;
        }
        // Also handle JSON format
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (isset($decoded['value']) && $decoded['value'] === 1) {
                $totalApproved++;
            }
        }
    }

    $percentage = $totalParticipants > 0 ? round(($totalApproved / $totalParticipants) * 100, 1) : 0;

    return [
        'type' => 'approval',
        'totals' => [
            'approved' => $totalApproved,
            'total' => $totalParticipants
        ],
        'percentages' => [
            'approved' => $percentage
        ]
    ];
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
            'majority_judgment' => [
                'type' => 'majority_judgment',
                'grades' => [], // Will be filled by caller if needed
                'options' => [],
                'winner' => null,
                'winner_details' => null,
                'total_votes' => 0
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
