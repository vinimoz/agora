<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCA\Agora\Db\SupportResult;
use OCA\Agora\Db\SupportResultMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\SupportEngineMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Service\InquiryMiscService;
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
        private InquiryMiscService $inquiryMiscService,
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
    private function calculateByType(string $type, array $supports, ?int $inquiryId = null, ?int $optionId = null, ?int $engineId=null): array
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

        // **FIX: Handle null inquiryId for majority_judgment**
        if ($type === 'majority_judgment' && ($inquiryId === null || $inquiryId === 0)) {
            // Try to get inquiryId from the first support if available
            foreach ($supports as $support) {
                if ($support->getInquiryId() > 0) {
                    $inquiryId = $support->getInquiryId();
                    $this->debug('Retrieved inquiryId from support', ['inquiryId' => $inquiryId]);
                    break;
                }
            }
        }

        $result = match($type) {
            'ternary' => $this->calculateTernaryResults($supports),
            'score' => $this->calculateScoreResults($supports),
            'star' => $this->calculateStarResults($supports),
            'reaction' => $this->calculateReactionResults($supports),
            'approval' => $this->calculateApprovalResults($supports),
            'approval_delib' => $this->calculateApprovalDeliberativeResults($supports),
            'ranking' => $this->calculateRankingResults($supports),
            'binary' => $this->calculateBinaryResults($supports),
            'majority_judgment' => $this->calculateMajorityJudgmentResults($supports, $inquiryId, $optionId, $engineId),
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
     * Calculate majority judgment results for a single target (inquiry or option)
     *
     * @param array $supports Array of Support entities
     * @param int|null $inquiryId The inquiry ID
     * @param int|null $optionId The option ID (0 or null = inquiry level)
     * @param int|null $engineId Not used for logic, only for logging
     * @return array
     */
    private function calculateMajorityJudgmentResults(array $supports, ?int $inquiryId = null, ?int $optionId = null, ?int $engineId = null): array
    {
        $grades = $this->getMajorityJudgmentGrades($inquiryId, $optionId);
        if (empty($grades)) {
            return $this->getEmptyResult('majority_judgment');
        }

        $gradeOrder = array_flip($grades);
        $targetId = ($optionId !== null && $optionId > 0) ? $optionId : ($inquiryId ?? 0);
        $targetType = ($optionId !== null && $optionId > 0) ? 'option' : 'inquiry';

        $optionsResults = [
            $targetId => [
                'grades' => [],
                'grade_counts' => array_fill_keys($grades, 0),
                'total_weight' => 0
            ]
        ];

        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();

            // Extract raw grade
            $rawGrade = null;
            if (is_array($value)) {
                $rawGrade = $value['value'] ?? null;
            } elseif (is_string($value)) {
                $decoded = json_decode($value, true);
                $rawGrade = $decoded['value'] ?? $value;
            } else {
                $rawGrade = (string)$value;
            }

            // Map numeric grade (1-based) to grade string if needed
            if (is_numeric($rawGrade) && !empty($grades) && is_string($grades[0])) {
                $index = (int)$rawGrade;
                $grade = $grades[$index] ?? null;
            } else {
                $grade = (string)$rawGrade;
            }

            if (!$grade || !in_array($grade, $grades)) {
                $this->logger->warning('Invalid grade', ['grade' => $grade, 'valid' => $grades]);
                continue;
            }

            for ($i = 0; $i < $weight; $i++) {
                $optionsResults[$targetId]['grades'][] = $grade;
            }
            $optionsResults[$targetId]['grade_counts'][$grade] += $weight;
            $optionsResults[$targetId]['total_weight'] += $weight;
        }


        $data = $optionsResults[$targetId];
        $totalVotes = $data['total_weight'];

        // Calculate median and tie‑breaking
        if (empty($data['grades'])) {
            $optionRankings = [
                $targetId => [
                    'median_grade' => null,
                    'median_index' => -1,
                    'above_share' => 0,
                    'below_share' => 0,
                    'grade_distribution' => $data['grade_counts'],
                    'total_votes' => 0
                ]
            ];
        } else {
            // Sort grades from best to worst according to $gradeOrder
            $sortedGrades = $data['grades'];
            usort($sortedGrades, function($a, $b) use ($gradeOrder) {
                return $gradeOrder[$a] <=> $gradeOrder[$b];
            });

            $total = count($sortedGrades);
            $medianIndex = (int)floor(($total - 1) / 2);
            $medianGrade = $sortedGrades[$medianIndex];

            $aboveCount = 0;
            $belowCount = 0;
            foreach ($sortedGrades as $grade) {
                if ($gradeOrder[$grade] < $gradeOrder[$medianGrade]) {
                    $aboveCount++;
                } elseif ($gradeOrder[$grade] > $gradeOrder[$medianGrade]) {
                    $belowCount++;
                }
            }
            $aboveShare = $total > 0 ? $aboveCount / $total : 0;
            $belowShare = $total > 0 ? $belowCount / $total : 0;

            $optionRankings = [
                $targetId => [
                    'median_grade' => $medianGrade,
                    'median_index' => $gradeOrder[$medianGrade],
                    'above_share' => round($aboveShare, 4),
                    'below_share' => round($belowShare, 4),
                    'grade_distribution' => $data['grade_counts'],
                    'total_votes' => $total
                ]
            ];
        }

        // Winner is the only option
        $winnerOptionId = $targetId;
        $winnerRanking = $optionRankings[$targetId];

        // Option name for display
        $optionNames = [];
        if ($targetType === 'option') {
            try {
                $option = $this->optionMapper->find($targetId);
                $optionNames[$targetId] = $option->getOption();
            } catch (\Exception $e) {
                $optionNames[$targetId] = "Option $targetId";
            }
        } else {
            try {
                $inquiry = $this->inquiryMapper->find($targetId);
                $optionNames[$targetId] = $inquiry->getTitle() ?: "Inquiry $targetId";
            } catch (\Exception $e) {
                $optionNames[$targetId] = "Inquiry $targetId";
            }
        }

        return [
            'type' => 'majority_judgment',
            'grades' => $grades,
            'options' => $optionRankings,
            'option_names' => $optionNames,
            'winner' => $winnerOptionId,
            'winner_name' => $optionNames[$winnerOptionId] ?? null,
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
        // First try to get from option
        if ($optionId !== null && $optionId > 0) {
            try {
                $option = $this->optionMapper->find($optionId);
                if ($option) {
                    $miscFields = $option->getMiscFields();
                    if (isset($miscFields['support_template']['grades']) && is_array($miscFields['support_template']['grades'])) {
                        $this->debug('Got grades from option support_template', ['grades' => $miscFields['support_template']['grades']]);
                        return $miscFields['support_template']['grades'];
                    }
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
                    if (isset($miscFields['support_template']['grades'])) {
                        $this->debug('Got grades from inquiry support_template', ['grades' => $miscFields['support_template']['grades']]);
                        return $miscFields['support_template']['grades'];
                    }
                }
                // Fallback: query misc table via service
                $templateJson = $this->inquiryMiscService->getValue($inquiryId, 'support_template');
                if ($templateJson) {
                    $template = json_decode($templateJson, true);
                    if (isset($template['grades'])) {
                        $this->debug('Got grades from inquiry misc service', ['grades' => $template['grades']]);
                        return $template['grades'];
                    }
                }
            } catch (\Exception $e) {
                $this->logger->error('Failed to get inquiry grades', ['error' => $e->getMessage()]);
            }
        }

        // Default fallback
        $defaultGrades = ['Excellent', 'Good', 'Fair', 'Poor'];
        $this->logger->warning('No grades found for majority judgment, using defaults', [
            'inquiryId' => $inquiryId,
            'optionId' => $optionId,
            'defaultGrades' => $defaultGrades
        ]);
        return $defaultGrades;
    }


    /**
     * Calculate approval results for deliberative phase (simple approve/not approve)
     * In deliberative mode, support value is simply 1 (approved) or not set
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

            $this->debug('Processing deliberative support', [
                'user_id' => $support->getUserId(),
                'raw_value' => $value,
                'value_type' => gettype($value)
            ]);

            // Check if value is 1 (approved)
            $isApproved = false;

            if (is_int($value) && $value === 1) {
                $isApproved = true;
            } elseif (is_string($value)) {
                // Handle JSON format: {"value":1}
                $decoded = json_decode($value, true);
                if (isset($decoded['value']) && $decoded['value'] === 1) {
                    $isApproved = true;
                } elseif ($value === '1' || $value === '1') {
                    $isApproved = true;
                }
            } elseif (is_array($value)) {
                // Handle array format: ['value' => 1]
                if (isset($value['value']) && $value['value'] === 1) {
                    $isApproved = true;
                }
            }

            if ($isApproved) {
                $totalApproved++;
                $this->debug('Approved', ['user_id' => $support->getUserId()]);
            }
        }

        $percentage = $totalParticipants > 0 ? round(($totalApproved / $totalParticipants) * 100, 1) : 0;

        return [
            'type' => 'approval_delib',
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
     * Calculate results for deliberative phase (no engine)
     * In deliberative mode, each target has simple approval: 1 (approved) or not
     */
    public function calculateDeliberativeResults(string $targetType, int $targetId): ?SupportResult
    {
        $this->logger->info('Calculating deliberative results', [
            'targetType' => $targetType,
            'targetId' => $targetId
        ]);

        // Get supports for this specific target (engineId = null for deliberative)
        $supports = $this->getSupportsForTarget(null, $targetType, $targetId);

        // Get the support feature type
        $supportType = $this->getSupportType(null, $targetType, $targetId);

        // Get inquiryId and optionId for context
        $inquiryId = $targetType === 'inquiry' ? $targetId : null;
        $optionId = $targetType === 'option' ? $targetId : null;

        // Calculate result based on type
        $resultData = $this->calculateByType($supportType, $supports, $inquiryId, $optionId);

        // Store the result
        return $this->resultMapper->upsertResult(
            null, // engineId = null for deliberative
            $targetType,
            $targetId,
            $resultData
        );
    }

    /**
     * Calculate all deliberative results for all targets
     */
    public function calculateAllDeliberativeResults(): array
    {
        $this->logger->info('Calculating all deliberative results');

        $results = [];

        // Get all inquiries with their supports
        $inquiries = $this->inquiryMapper->findAll();
        foreach ($inquiries as $inquiry) {
            $result = $this->calculateDeliberativeResults('inquiry', $inquiry->getId());
            if ($result) {
                $results[] = $result;
            }

            // Get all options for this inquiry
            $options = $this->optionMapper->findByTargetId($inquiry->getId());
            foreach ($options as $option) {
                $result = $this->calculateDeliberativeResults('option', $option->getId());
                if ($result) {
                    $results[] = $result;
                }
            }
        }

        return $results;
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
            'approval_delib' => [
                'type' => 'approval_delib',
                'totals' => ['approved' => 0, 'total' => 0],
                'percentages' => ['approved' => 0]
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
            // For deliberative/ informal supports, get from inquiry or option
            if ($targetType === 'inquiry') {
                try {
                    $inquiry = $this->inquiryMapper->find($targetId);
                    $feature = $inquiry->getSupportFeature() ?: 'approval_delib';
                    // In deliberative mode, force approval_delib if no feature set
                    return $feature === 'none' ? 'approval_delib' : $feature;
                } catch (\Exception $e) {
                    $this->logger->error('Failed to get inquiry support feature', ['error' => $e->getMessage()]);
                    return 'approval_delib';
                }
            } else {
                try {
                    $option = $this->optionMapper->find($targetId);
                    $feature = $option->getSupportFeature() ?: 'approval_delib';
                    return $feature === 'none' ? 'approval_delib' : $feature;
                } catch (\Exception $e) {
                    $this->logger->error('Failed to get option support feature', ['error' => $e->getMessage()]);
                    return 'approval_delib';
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
            $inquiryIdParam = null;
            $optionIdParam = null;
            if ($targetType === 'inquiry') {
                $inquiryIdParam = (int)$targetId;
            } else {
                $optionIdParam = (int)$targetId;
            }


            // Calculate result based on supports array
            $resultData = $this->calculateByType($supportType, $targetSupports, $inquiryIdParam, $optionIdParam);

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

        $resultData = $this->calculateByType($supportType, $supports, $inquiryId, $optionId,$engineId);
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
