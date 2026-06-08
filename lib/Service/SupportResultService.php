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
 * Calculate Borda Count results
 * Points: if there are N options, rank 1 gets N points, rank 2 gets N-1, ... last rank gets 1.
 * Options not ranked receive 0 points (or could be given lowest points – here we give 0).
 */
private function calculateBordaResults(array $supports, ?int $engineId = null): array
{
    $maxRank = $this->getMaxRankForEngine($engineId);
    $allOptions = $this->getEngineOptionIds($engineId);
    $numOptions = count($allOptions);
    $scores = array_fill_keys($allOptions, 0);

    if (empty($allOptions)) {
        // Fallback: extract from rankings
        $allOptions = [];
        foreach ($supports as $support) {
             $value = $support->getValue();
        $weight = $support->getWeight();
        $rankingMap = is_array($value) ? ($value['ranking'] ?? []) : [];
        if ($maxRank !== null) {
            $rankingMap = array_filter($rankingMap, fn($rank) => $rank <= $maxRank);
        }
         foreach ($rankingMap as $oid => $rank) {
            $points = ($numOptions - $rank + 1) * $weight;
            $scores[(int)$oid] += $points;
        }

            foreach (array_keys($rankingMap) as $oid) {
                $allOptions[$oid] = true;

            }
        }
        $allOptions = array_keys($allOptions);
    }
    sort($allOptions);
    $numOptions = count($allOptions);
    if ($numOptions === 0) {
        return ['type' => 'borda', 'scores' => [], 'ranking' => []];
    }

    // Initialize scores
    $scores = array_fill_keys($allOptions, 0);

    foreach ($supports as $support) {
        $value = $support->getValue();
        $weight = $support->getWeight();
        $rankingMap = is_array($value) ? ($value['ranking'] ?? []) : [];

        // For each ranked option, calculate points = (numOptions - rank + 1) * weight
        foreach ($rankingMap as $oid => $rank) {
            $points = ($numOptions - $rank + 1) * $weight;
            $scores[(int)$oid] += $points;
        }
        // Unranked options receive 0 points (no action needed)
    }

    // Sort options by score descending
    arsort($scores);
    $rank = 1;
    $ranking = [];
    $prevScore = null;
    $skip = 0;
    foreach ($scores as $oid => $score) {
        if ($score !== $prevScore) {
            $rank += $skip;
            $skip = 0;
        } else {
            $skip++;
        }
        $ranking[$oid] = $rank;
        $prevScore = $score;
    }

    return [
        'type' => 'borda',
        'scores' => $scores,
        'ranking' => $ranking,
        'total_voters' => count($supports)
    ];
}


/**
 * Get all option IDs for a specific engine (from its target_ids)
 */
private function getEngineOptionIds(?int $engineId): array
{
    if (!$engineId) {
        return [];
    }
    try {
        $engine = $this->engineMapper->find($engineId);
        return $engine ? $engine->getTargetIds() : [];
    } catch (\Exception $e) {
        return [];
    }
}

private function getMaxRankForEngine(?int $engineId): ?int
{
    if ($engineId === null) {
        return null;
    }
    try {
        $engine = $this->engineMapper->find($engineId);
        if ($engine) {
            $config = $engine->getConfig();
            $maxRank = $config['max_rank'] ?? null;
            // null means unlimited (allow all ranks)
            return $maxRank === null ? null : (int)$maxRank;
        }
    } catch (\Exception $e) {
        $this->logger->error('Failed to get max_rank for engine', ['error' => $e->getMessage()]);
    }
    return null;
}

/**
 * Calculate Condorcet results (pairwise comparison)
 * For each pair of options, count how many voters prefer one over the other.
 * The Condorcet winner is the option that beats every other option in pairwise comparisons.
 */
private function calculateCondorcetResults(array $supports, ?int $engineId = null): array
{
    // Get all options from engine target_ids
    $maxRank = $this->getMaxRankForEngine($engineId);
    $allOptions = $this->getEngineOptionIds($engineId);
    if (empty($allOptions)) {
        // Fallback: extract from rankings
        $allOptions = [];
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            $rankingMap = is_array($value) ? ($value['ranking'] ?? []) : [];
            if ($maxRank !== null) {
            $rankingMap = array_filter($rankingMap, fn($rank) => $rank <= $maxRank);
            }
asort($rankingMap); // sort by rank ascending
        $ordered = array_keys($rankingMap);

            foreach (array_keys($rankingMap) as $oid) {
                $allOptions[$oid] = true;
            }
        }
        $allOptions = array_keys($allOptions);
    }
    sort($allOptions);

    // Initialize pairwise matrix: $preferences[$a][$b] = number of voters preferring a over b
    $preferences = [];
    foreach ($allOptions as $a) {
        foreach ($allOptions as $b) {
            if ($a !== $b) {
                $preferences[$a][$b] = 0;
            }
        }
    }

    // Process each support (each voter's ranking)
    foreach ($supports as $support) {
        $value = $support->getValue();
        $weight = $support->getWeight(); // may be >1 for weighted votes
        $rankingMap = is_array($value) ? ($value['ranking'] ?? []) : [];

        // Convert ranking map to a sorted list by rank (lower rank = better)
        $sorted = [];
        foreach ($rankingMap as $oid => $rank) {
            $sorted[$oid] = $rank;
        }
        asort($sorted); // sort by rank ascending (1 is best)
        $ordered = array_keys($sorted); // options ordered from best to worst

        // For every pair (a, b) where a appears before b in the ordered list, increment preference a->b
        $count = count($ordered);
        for ($i = 0; $i < $count; $i++) {
            for ($j = $i + 1; $j < $count; $j++) {
                $a = $ordered[$i];
                $b = $ordered[$j];
                $preferences[$a][$b] += $weight;
            }
        }
    }

    // Determine Condorcet winner(s)
    $wins = [];
    $losses = [];
    $ties = [];
    foreach ($allOptions as $a) {
        $wins[$a] = 0;
        $losses[$a] = 0;
        $ties[$a] = 0;
        foreach ($allOptions as $b) {
            if ($a === $b) continue;
            $prefAB = $preferences[$a][$b] ?? 0;
            $prefBA = $preferences[$b][$a] ?? 0;
            if ($prefAB > $prefBA) {
                $wins[$a]++;
            } elseif ($prefBA > $prefAB) {
                $losses[$a]++;
            } else {
                $ties[$a]++;
            }
        }
    }

    // Find options that beat or tie all others (Condorcet winner / weak winner)
    $winner = null;
    foreach ($allOptions as $a) {
        if ($losses[$a] === 0) {
            $winner = $a;
            break; // strong Condorcet winner (no losses)
        }
    }
    // If no strong winner, pick one with fewest losses (simple tie-breaking)
    if ($winner === null && !empty($allOptions)) {
        $minLoss = min($losses);
        $candidates = array_keys(array_filter($losses, fn($l) => $l === $minLoss));
        $winner = $candidates[0] ?? null;
    }

    return [
        'type' => 'condorcet',
        'preferences' => $preferences,
        'wins' => $wins,
        'losses' => $losses,
        'ties' => $ties,
        'winner' => $winner,
        'total_voters' => count($supports)
    ];
}

    /**
     * Get existing results for a specific support engine
     *
     * @param int $engineId The engine ID
     * @return SupportResult[] Array of support results
     */
    public function getResultsByEngine(int $engineId): array
    {
        $this->logger->info('Getting results by engine', ['engineId' => $engineId]);

        // This assumes your SupportResultMapper has a findByEngineId method
        // If not, you'll need to add it there too
        return $this->resultMapper->findByEngineId($engineId);
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
            'condorcet' => $this->calculateCondorcetResults($supports, $engineId),
             'borda' => $this->calculateBordaResults($supports, $engineId),
            'quadratic' => $this->calculateQuadraticResults($supports),
            'token_weighted' => $this->calculateTokenWeightedResults($supports),
            'phased_voting' => $this->calculatePhasedVotingResults($supports, $inquiryId,$engineId),
            'binary' => $this->calculateBinaryResults($supports),
            'majority_judgment' => $this->calculateMajorityJudgmentResults($supports, $inquiryId, $optionId, $engineId),
            default => $this->calculateBinaryResults($supports),
        };
        $this->debug('calculateByType result', ['result' => $result]);

        return $result;
    }

    /**
     * Calculate approval results (multi‑select)
     */
    private function calculateApprovalResults(array $supports): array
    {
        $counts = [];
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight();
            // Stored as {selected: [105, 130]}
            $selected = is_array($value) ? ($value['selected'] ?? []) : [];
            foreach ($selected as $optionId) {
                $counts[(int)$optionId] = ($counts[(int)$optionId] ?? 0) + $weight;
            }
        }
        return ['type' => 'approval', 'counts' => $counts];
    }

    /**
     * Calculate ranking results (rank order)
     */
    private function calculateRankingResults(array $supports, ?int $engineId = null): array
{
    $maxRank = $this->getMaxRankForEngine($engineId);
    $rankings = [];
    foreach ($supports as $support) {
        $value = $support->getValue();
        $weight = $support->getWeight();
        $rankingMap = is_array($value) ? ($value['ranking'] ?? []) : [];
        foreach ($rankingMap as $optionId => $rank) {
            $rank = (int)$rank;
            // Filter out ranks exceeding maxRank
            if ($maxRank !== null && $rank > $maxRank) {
                continue;
            }
            $optionId = (int)$optionId;
            if (!isset($rankings[$optionId])) {
                $rankings[$optionId] = ['sum' => 0, 'count' => 0];
            }
            $rankings[$optionId]['sum'] += $rank * $weight;
            $rankings[$optionId]['count'] += $weight;
        }
    }
    $averages = [];
    foreach ($rankings as $oid => $data) {
        $averages[$oid] = $data['count'] ? round($data['sum'] / $data['count'], 2) : 0;
    }
    return [
        'type' => 'ranking',
        'rankings' => $averages,
        'total_voters' => count($supports)
    ];
}
    /**
     * Calculate quadratic voting results
     */
    private function calculateQuadraticResults(array $supports): array
    {
        $totalCredits = 0;
        $totalVotes = 0;
        $scores = [];
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight(); // weight = 1 for quadratic (credits per vote)
            // Stored as {scores: {105: 3, 120: 2}} where value = votes
            $voteMap = is_array($value) ? ($value['scores'] ?? []) : [];
            foreach ($voteMap as $optionId => $votes) {
                $votes = (int)$votes;
                $credits = $votes * $votes;
                $totalCredits += $credits;
                $totalVotes += $votes;
                $scores[(int)$optionId] = ($scores[(int)$optionId] ?? 0) + $votes;
            }
        }
        return [
            'type' => 'quadratic',
            'total_credits' => $totalCredits,
            'total_votes' => $totalVotes,
            'scores' => $scores
        ];
    }

    /**
     * Calculate token‑weighted results
     */
    private function calculateTokenWeightedResults(array $supports): array
    {
        $totalWeight = 0;
        $weights = [];
        foreach ($supports as $support) {
            $value = $support->getValue();
            $weight = $support->getWeight(); // the actual weight assigned to this vote
            // Stored as {scores: {105: 100}} where value = weight
            $weightMap = is_array($value) ? ($value['scores'] ?? []) : [];
            foreach ($weightMap as $optionId => $w) {
                $w = (int)$w;
                $totalWeight += $w;
                $weights[(int)$optionId] = ($weights[(int)$optionId] ?? 0) + $w;
            }
        }
        return [
            'type' => 'token_weighted',
            'total_weight' => $totalWeight,
            'weights' => $weights,
            'participant_count' => count($supports)
        ];
    }

    /**
     * Phased voting – each round stores {selected: [optionId], round: N}
     * The result can be the current leader after the last round.
     */
    private function calculatePhasedVotingResults(array $supports, ?int $inquiryId = null, ?int $engineId = null): array
{
    // Get current round from engine config
    $currentRound = 1;
    if ($engineId !== null) {
        try {
            $engine = $this->engineMapper->find($engineId);
            if ($engine) {
                $config = $engine->getConfig();
                $currentRound = $config['current_round'] ?? 1;
            }
        } catch (\Exception $e) {
            $this->logger->error('Failed to get current round', ['error' => $e->getMessage()]);
        }
    }

    $counts = [];
    foreach ($supports as $support) {
        $value = $support->getValue();
        // Extract round number from stored value
        $round = isset($value['round']) ? (int)$value['round'] : 1;
        // Only count supports for the current round
        if ($round !== $currentRound) {
            continue;
        }
        $selected = isset($value['selected']) && is_array($value['selected']) ? $value['selected'] : [];
        foreach ($selected as $optionId) {
            $counts[(int)$optionId] = ($counts[(int)$optionId] ?? 0) + 1;
        }
    }
    return ['type' => 'phased_voting', 'counts' => $counts];
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
        $grades = $this->getMajorityJudgmentGrades($inquiryId, $optionId, $engineId);
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
    private function getMajorityJudgmentGrades(?int $inquiryId, ?int $optionId = null, ?int $engineId = null): array
{
    // NEW: If engineId is provided, read grades from engine config
    if ($engineId !== null) {
        try {
            $engine = $this->engineMapper->find($engineId);
            if ($engine) {
                $config = $engine->getConfig();
                if (isset($config['grades']) && is_array($config['grades'])) {
                    $this->debug('Got grades from engine config', ['grades' => $config['grades']]);
                    return $config['grades'];
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('Failed to get engine grades', ['error' => $e->getMessage()]);
        }
    }

    // Then try option (for per-option overrides)
    if ($optionId !== null && $optionId > 0) {
        try {
            $option = $this->optionMapper->find($optionId);
            if ($option) {
                $miscFields = $option->getMiscFields();
                if (isset($miscFields['support_template']['grades']) && is_array($miscFields['support_template']['grades'])) {
                    return $miscFields['support_template']['grades'];
                }
                if (isset($miscFields['grades']) && is_array($miscFields['grades'])) {
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
                    return $miscFields['support_template']['grades'];
                }
            }
            $templateJson = $this->inquiryMiscService->getValue($inquiryId, 'support_template');
            if ($templateJson) {
                $template = json_decode($templateJson, true);
                if (isset($template['grades'])) {
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
        'engineId' => $engineId,
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
            // Value can be array of strings (multi‑reaction)
            $reactions = is_array($value) ? $value : (array)$value;
            foreach ($reactions as $reaction) {
                $counts[$reaction] = ($counts[$reaction] ?? 0) + $weight;
            }
        }
        return ['type' => 'reaction', 'counts' => $counts];
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
            'quadratic' => [
                'type' => 'quadratic',
                'total_credits' => 0,
                'total_votes' => 0,
                'scores' => []
            ],
            'condorcet' => [
                'type' => 'condorcet',
                'preferences' => [],
                'wins' => [],
                'losses' => [],
                'ties' => [],
                'winner' => null,
                'total_voters' => 0
            ],
            'borda' => [
                'type' => 'borda',
                'scores' => [],
                'ranking' => [],
                'total_voters' => 0
            ],
            'phased_voting' => [
                'type' => 'phased_voting',
                'counts' => []
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
            $resultData = $this->calculateByType($supportType, $targetSupports, $inquiryIdParam, $optionIdParam,$engineId);

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
