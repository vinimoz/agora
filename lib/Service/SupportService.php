<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Support;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Service\SupportEngineService;
use OCA\Agora\Service\SupportResultService;

use Psr\Log\LoggerInterface;

class SupportService
{
    private array $supportsCache = [];

    public function __construct(
        private InquiryMapper $inquiryMapper,
        private SupportMapper $supportMapper,
        private SupportResultService $supportResultService,
        private SupportEngineService $engineService,
        private LoggerInterface $logger,
    ) {
    }

        /**
     * Get supports for a target without causing dirty reads
     * Uses cache within the request to avoid multiple DB reads
     */
    private function getSupportsForTarget(int $inquiryId, int $optionId): array
    {
        $cacheKey = "{$inquiryId}_{$optionId}";
        
        if (!isset($this->supportsCache[$cacheKey])) {
            $this->supportsCache[$cacheKey] = $this->supportMapper->findByInquiryIdAndOption($inquiryId, $optionId);
        }
        
        return $this->supportsCache[$cacheKey];
    }

/*
    public function addSupport(
    int $inquiryId,
    string $userId,
    mixed $value = 1,
    int $optionId = 0,
    int $weight = 1,
    ?int $engineId = null
): Support {
    $engineId = ($engineId === 0) ? null : $engineId;

    // Check permission
    $inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
    $inquiry->request(Inquiry::PERMISSION_SUPPORT_ADD);

    $this->logger->debug('DEBUG ADDDD', [
        'inquiryId' => $inquiryId,
        'original_value' => $value
    ]);

    // Normalize the value to standard JSON format
    $normalizedValue = $this->normalizeToJsonFormat($inquiry, $value);

    $this->logger->debug('NORMALIZED VALUE DEBUG ADDDD', [
        'inquiryId' => $inquiryId,
        'Normalized value' => json_encode($normalizedValue)
    ]);

    // Validate after normalization
    $this->validateSupportValue($inquiry, $normalizedValue);

    // Check if support already exists
    $existing = $this->supportMapper->findSupport($inquiryId, $userId, $optionId, $engineId);

    $support = null;
    if ($existing !== null) {
        // Update existing support
        $existing->setValue($normalizedValue);
        $existing->setWeight($weight);
        $existing->setUpdated(time());
        if ($engineId !== null) {
            $existing->setSupportEngineId($engineId);
        }
        $support = $this->supportMapper->updateSupport($existing);
        $this->logger->debug('UPDATED SUPPORT', [
            'support_id' => $support->getId(),
            'value' => $support->getValue()
        ]);
    } else {
        // Add new support
        $support = $this->supportMapper->addSupport(
            $inquiryId,
            $userId,
            $normalizedValue,
            $optionId,
            $weight,
            $engineId
        );
        $this->logger->debug('CREATED NEW SUPPORT', [
            'support_id' => $support->getId(),
            'value' => $support->getValue()
        ]);
    }

    // Get current supports for cache
    $currentSupports = $this->getSupportsForTarget($inquiryId, $optionId);

    // Update cache with new supports
    $cacheKey = "{$inquiryId}_{$optionId}";
    $this->supportsCache[$cacheKey] = $currentSupports;

    // Calculate and store result using the array (no DB read needed)
    $this->supportResultService->calculateFromSupports(
        $inquiryId,
        $optionId,
        $currentSupports,
        $engineId
    );

    $this->logger->debug('SUPPORT ADDED WITHOUT RESULT CALCULATION', [
        'support_value' => $support->getValue(),
        'raw_value' => $support->getRawValue()
    ]);

    return $support;
    }*/

    public function addSupport(
    int $inquiryId,
    string $userId,
    mixed $value = 1,
    int $optionId = 0,
    int $weight = 1,
    ?int $engineId = null
): Support {
    $engineId = ($engineId === 0) ? null : $engineId;

    $inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
    $inquiry->request(Inquiry::PERMISSION_SUPPORT_ADD);

    $normalizedValue = $this->normalizeToJsonFormat($inquiry, $value,$engineId);
    $this->validateSupportValue($inquiry, $normalizedValue,$engineId);

    $existing = $this->supportMapper->findSupport($inquiryId, $userId, $optionId, $engineId);

    $support = null;
    $isNew = false;

    if ($existing !== null) {
        $existing->setValue($normalizedValue);
        $existing->setWeight($weight);
        $existing->setUpdated(time());
        if ($engineId !== null) {
            $existing->setSupportEngineId($engineId);
        }
        $support = $this->supportMapper->updateSupport($existing,$engineId);
        $this->logger->debug('UPDATED SUPPORT', [
            'support_id' => $support->getId(),
            'value' => $support->getValue(),
            'EXISTING' => $existing,
            'ENIGNE ID' => $engineId
        ]);
    } else {
        $support = $this->supportMapper->addSupport(
            $inquiryId,
            $userId,
            $normalizedValue,
            $optionId,
            $weight,
            $engineId
        );
        $isNew = true;
        $this->logger->debug('CREATED NEW SUPPORT', [
            'support_id' => $support->getId(),
            'value' => $support->getValue()
        ]);
    }

    // Clear cache to force fresh read
    $cacheKey = "{$inquiryId}_{$optionId}";
    unset($this->supportsCache[$cacheKey]);

    // Get fresh supports from mapper
    $currentSupports = $this->supportMapper->findByInquiryIdAndOption($inquiryId, $optionId);

    // Update cache
    $this->supportsCache[$cacheKey] = $currentSupports;

    // Calculate and store result using the updated supports
    $this->supportResultService->calculateFromSupports(
        $inquiryId,
        $optionId,
        $currentSupports,
        $engineId
    );

    return $support;
}
    
    /**
 * Normalize majority judgment value
 * Majority judgment expects a grade string (e.g., "Excellent", "Good", "Fair", "Poor")
 */
private function normalizeMajorityJudgmentValue(mixed $value): string
{
    // If it's already a string, return it
    if (is_string($value)) {
        return $value;
    }
    
    // If it's an array with 'value' key (from frontend)
    if (is_array($value) && isset($value['value'])) {
        return (string)$value['value'];
    }
    
    // If it's an array with grade directly
    if (is_array($value) && isset($value['grade'])) {
        return (string)$value['grade'];
    }
    
    // Fallback
    return (string)$value;
}


/**
 * Validate support value based on support feature
private function validateSupportValue(Inquiry $inquiry, array $normalizedValue, ?int $engineId = null): void
{
    if ($engineId) {
        $engine = $this->engineService->getEngine($engineId);
        $type = $engine ? $engine->getEngine() : $inquiry->getSupportFeature();
    } else {
        $type = $inquiry->getSupportFeature();
    }

    $value = $normalizedValue['value'] ?? null;

    $complexTypes = ['approval', 'ranking', 'condorcet', 'borda', 'quadratic', 'token_weighted', 'phased_voting','majority_judgment'];
    if (in_array($type, $complexTypes)) {
        return;
    }


    switch ($type) {
    case 'binary':
        if (!in_array($value, [-1, 1], true)) {
            throw new \InvalidArgumentException('Binary value must be -1 or 1');
        }
        break;

    case 'ternary':
        if (!in_array($value, [-1, 0, 1], true)) {
            throw new \InvalidArgumentException('Ternary value must be -1, 0, or 1');
        }
        break;

    case 'score':
        if (!is_int($value) || $value < 0 || $value > 10) {
            throw new \InvalidArgumentException('Score must be between 0 and 10');
        }
        break;

    case 'star':
        if (!is_int($value) || $value < 1 || $value > 5) {
            throw new \InvalidArgumentException('Star rating must be between 1 and 5');
        }
        break;

    case 'reaction':
        $reactions = is_array($value) ? $value : [$value];
        if (empty($reactions)) {
            throw new \InvalidArgumentException('Reaction must have at least one emoji');
        }
        foreach ($reactions as $reaction) {
            if (!is_string($reaction) || $reaction === '') {
                throw new \InvalidArgumentException('Each reaction must be a non‑empty string');
            }
        }

        if ($engineId !== null) {
            $engine = $this->engineService->getEngine($engineId);
            if ($engine) {
                $config = $engine->getConfig();
                $maxPerUser = $config['max_per_user'] ?? null;
                if ($maxPerUser !== null && count($reactions) > $maxPerUser) {
                    throw new \InvalidArgumentException("Maximum {$maxPerUser} reactions allowed per user");
                }
            }
        }
        break;

    case 'approval_delib':
        if (!is_int($value)) {
            throw new \InvalidArgumentException('Approval rating must be 1');
        }
        break;


    case 'approval':
    case 'ranking':
        if (!is_array($value)) {
            throw new \InvalidArgumentException('Value must be an array');
        }
        break;

    case 'majority_judgment': 
        if ($value === null || $value === '') {
            throw new \InvalidArgumentException('Majority judgment value cannot be empty');
        }
        // Allow any scalar (string or numeric)
        if (!is_scalar($value)) {
            throw new \InvalidArgumentException('Majority judgment value must be a string or number');
        }
        break;

    default:
        // Unknown feature, default to binary validation
        if (!in_array($value, [0, 1], true)) {
            throw new \InvalidArgumentException('Invalid support value');
        }
        break;
    }
}
 */



private function validateEngineModeSupportValue(string $type, array $payload): void
{
    switch ($type) {
        case 'binary':
            $allowed = [-1, 1];
            if (!isset($payload['scores']) || !is_array($payload['scores'])) {
                throw new \InvalidArgumentException("Missing 'scores' object for $type engine");
            }
            foreach ($payload['scores'] as $optionId => $value) {
                if (!in_array($value, $allowed, true)) {
                    throw new \InvalidArgumentException("Score for option $optionId must be one of: " . implode(', ', $allowed));
                }
            }
            break;

        case 'ternary':
            $allowed = [-1, 0, 1];
            if (!isset($payload['scores']) || !is_array($payload['scores'])) {
                throw new \InvalidArgumentException("Missing 'scores' object for $type engine");
            }
            foreach ($payload['scores'] as $optionId => $value) {
                if (!in_array($value, $allowed, true)) {
                    throw new \InvalidArgumentException("Score for option $optionId must be one of: " . implode(', ', $allowed));
                }
            }
            break;
        case 'score':
        case 'star':
            if (!isset($payload['scores']) || !is_array($payload['scores'])) {
                throw new \InvalidArgumentException("Missing 'scores' object for $type engine");
            }
            $range = match($type) {
                'binary' => [-1, 1],
                'ternary' => [-1, 0, 1],
                'score' => [0, 10],
                'star' => [1, 5],
            };
            foreach ($payload['scores'] as $optionId => $value) {
                if (!is_int($value) || $value < $range[0] || $value > $range[1]) {
                    throw new \InvalidArgumentException("Score for option $optionId must be between {$range[0]} and {$range[1]}");
                }
            }
            break;

        case 'reaction':
            if (!isset($payload['reactions']) || !is_array($payload['reactions'])) {
                throw new \InvalidArgumentException("Missing 'reactions' object");
            }
            foreach ($payload['reactions'] as $optionId => $reactions) {
                if (!is_array($reactions)) {
                    throw new \InvalidArgumentException("Reactions for option $optionId must be an array");
                }
                foreach ($reactions as $r) {
                    if (!is_string($r) || $r === '') {
                        throw new \InvalidArgumentException("Reaction must be a non‑empty string");
                    }
                }
            }
            break;

        case 'ranking':
        case 'condorcet':
        case 'borda':
            if (!isset($payload['ranking']) || !is_array($payload['ranking'])) {
                throw new \InvalidArgumentException("Missing 'ranking' object");
            }
            foreach ($payload['ranking'] as $optionId => $rank) {
                if (!is_int($rank) || $rank < 1) {
                    throw new \InvalidArgumentException("Rank must be a positive integer");
                }
            }
            break;

        case 'majority_judgment':
            if (!isset($payload['grades']) || !is_array($payload['grades'])) {
                throw new \InvalidArgumentException("Missing 'grades' object");
            }
            foreach ($payload['grades'] as $optionId => $grade) {
                if (!is_string($grade) || $grade === '') {
                    throw new \InvalidArgumentException("Grade must be a non‑empty string");
                }
            }
            break;

        case 'approval':
        case 'phased_voting':
            if (!isset($payload['selected']) || !is_array($payload['selected'])) {
                throw new \InvalidArgumentException("Missing 'selected' array");
            }
            break;

        case 'quadratic':
        case 'token_weighted':
            if (!isset($payload['scores']) || !is_array($payload['scores'])) {
                throw new \InvalidArgumentException("Missing 'scores' object");
            }
            // Quadratic: votes are positive integers; token_weighted: weights are positive integers
            foreach ($payload['scores'] as $optionId => $value) {
                if (!is_int($value) || $value <= 0) {
                    throw new \InvalidArgumentException("Value must be a positive integer");
                }
            }
            break;

        default:
            // Unknown engine – allow any structure (fallback)
            break;
    }
}


private function validateSupportValue(Inquiry $inquiry, array $normalizedValue, ?int $engineId = null): void
{
    if ($engineId !== null) {
        // Engine mode – validate structured payload
        $engine = $this->engineService->getEngine($engineId);
        $type = $engine ? $engine->getEngine() : $inquiry->getSupportFeature();
        $this->validateEngineModeSupportValue($type, $normalizedValue);
        return;
    }

    // Deliberative mode – scalar/wrapped value
    $type = $inquiry->getSupportFeature();
    $isWrapped = array_key_exists('value', $normalizedValue) && count($normalizedValue) === 1;
    $value = $isWrapped ? $normalizedValue['value'] : $normalizedValue;

    switch ($type) {
    case 'binary':
    case 'ternary':
    case 'star':
    case 'score':
        // These are always wrapped (even in engine mode they use wrapper because not in complexTypes)
        $numericValue = is_numeric($value) ? (int)$value : null;
        if ($type === 'binary' && !in_array($numericValue, [-1, 1], true)) {
            throw new \InvalidArgumentException('Binary value must be -1 or 1');
        }
        if ($type === 'ternary' && !in_array($numericValue, [-1, 0, 1], true)) {
            throw new \InvalidArgumentException('Ternary value must be -1, 0, or 1');
        }
        if ($type === 'score' && (!is_int($value) || $value < 0 || $value > 10)) {
            throw new \InvalidArgumentException('Score must be between 0 and 10');
        }
        if ($type === 'star' && (!is_int($value) || $value < 1 || $value > 5)) {
            throw new \InvalidArgumentException('Star rating must be between 1 and 5');
        }
        break;

    case 'reaction':
        // $value can be string (deliberation: {"value":"❤️"}) or array (engine: ["❤️"])
        $reactions = is_array($value) ? $value : [$value];
        if (empty($reactions)) {
            throw new \InvalidArgumentException('Reaction must have at least one emoji');
        }
        foreach ($reactions as $reaction) {
            if (!is_string($reaction) || $reaction === '') {
                throw new \InvalidArgumentException('Each reaction must be a non‑empty string');
            }
        }
        if ($engineId !== null) {
            $engine = $this->engineService->getEngine($engineId);
            if ($engine) {
                $config = $engine->getConfig();
                $maxPerUser = $config['max_per_user'] ?? null;
                if ($maxPerUser !== null && count($reactions) > $maxPerUser) {
                    throw new \InvalidArgumentException("Maximum {$maxPerUser} reactions allowed per user");
                }
            }
        }
        break;

    case 'majority_judgment':
        // $value can be numeric index (deliberation: {"value":4}) or string grade (engine: "Excellent")
        if ($value === null || $value === '' || (is_array($value) && empty($value))) {
            throw new \InvalidArgumentException('Majority judgment value cannot be empty');
        }
        // Allow any scalar – actual grade mapping happens in result calculation
        break;

    case 'approval_delib':
        if (!is_int($value) || $value !== 1) {
            throw new \InvalidArgumentException('Approval value must be 1');
        }
        break;

    case 'approval':
    case 'ranking':
    case 'condorcet':
    case 'borda':
    case 'quadratic':
    case 'token_weighted':
    case 'phased_voting':
        // Complex structures – no additional validation needed
        break;

    default:
        $numericValue = is_numeric($value) ? (int)$value : null;
        if (!in_array($numericValue, [0, 1], true)) {
            throw new \InvalidArgumentException('Invalid support value');
        }
        break;
    }
}


/**
 * Update support value
 */
public function updateSupport(
    int $inquiryId,
    string $userId,
    mixed $value = 1,  
    int $optionId = 0,
    int $weight = 1,
    ?int $engineId = null
): Support {
    return $this->addSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);
}


/**
 * Normalize support value to standard JSON format
 */
private function normalizeToJsonFormat(Inquiry $inquiry, mixed $value, ?int $engineId): array
{
    // Determine the actual engine type
    if ($engineId) {
        $engine = $this->engineService->getEngine($engineId);
        $type = $engine ? $engine->getEngine() : $inquiry->getSupportFeature();

        $this->logger->debug('Normalizing value', [
            'type' => $type,
            'original_value' => $value,
            'original_type' => gettype($value)
        ]);

        // Define complex engine types that should store the value as‑is (no wrapping)
        $complexTypes = match (true) {
            $engineId !== null => [
                'ternary','binary','score','star','approval', 'ranking', 'condorcet', 'borda', 'reaction',
                'quadratic', 'token_weighted', 'phased_voting', 'majority_judgment'
            ],
            default => [
                'ternary','binary','score','star','approval', 'ranking', 'condorcet', 'borda', 'reaction',
                'quadratic', 'token_weighted', 'phased_voting', 'majority_judgment'
            ]
        };

        if (in_array($type, $complexTypes)) {
            // Store the raw value directly (e.g., {ranking: {...}} or {selected: [...]})
            return is_array($value) ? $value : (array)$value;
        }

    } else {
        $type = $inquiry->getSupportFeature();
        // For simple types, wrap in {"value": ...}
        return match($type) {
            'binary' => ['value' => $this->normalizeBinaryValue($value)],
            'ternary' => ['value' => $this->normalizeTernaryValue($value)],
            'score' => ['value' => $this->normalizeScoreValue($value)],
            'star' => ['value' => $this->normalizeStarValue($value)],
            'reaction' => ['value' => (string)$value],
            'approval_delib' => ['value' => $this->normalizeApprovalValue($value)],
            'majority_judgment' => ['value' => $this->normalizeMajorityJudgmentValue($value)],
            default => ['value' => $this->normalizeBinaryValue($value)]
        };
    }
}

/**
 * Normalize binary value (0 or 1)
 */
private function normalizeApprovalValue(mixed $value): int
{
    if (is_bool($value)) {
        return $value ? 1 : 1; // Always 1 if true, but false should never be sent
    }

    if (is_string($value)) {
        return match(strtolower($value)) {
        '1', 'yes', 'true', 'support', 'agree', '👍', '❤️', '🎉' => 1,
            default => 1 // Any non‑empty string → approve
    };
    }

    $intVal = (int)$value;
    return $intVal > 0 ? 1 : 1; // Any positive int → 1
}



/**
 * Normalize binary value (0 or 1)
 */
private function normalizeBinaryValue(mixed $value): int
{
    if (is_bool($value)) {
        return $value ? 1 : -1;
    }

    if (is_string($value)) {
        return match(strtolower($value)) {
        '1', 'yes', 'true', 'support', 'agree', '👍', '❤️', '🎉' => 1,
            '-1', 'no', 'false', 'oppose', 'disagree', '👎' => -1,
            default => -1
    };
    }

    $intVal = (int)$value;
    return (int)$value > 0 ? 1 : -1;
}

/**
 * Normalize ternary value (-1, 0, 1)
 */
private function normalizeTernaryValue(mixed $value): int
{
    if (is_bool($value)) {
        return $value ? 1 : -1;
    }

    if (is_string($value)) {
        return match(strtolower($value)) {
        '1', 'yes', 'true', 'support', 'agree', 'for', '👍', '❤️', '🎉' => 1,
            '-1', 'no', 'false', 'oppose', 'disagree', 'against', '👎' => -1,
            '0', 'abstain', 'neutral' => 0,
            default => 0
    };
    }

    $intVal = (int)$value;
    return min(1, max(-1, $intVal));
}

/**
 * Normalize score value (0-10)
 */
private function normalizeScoreValue(mixed $value): int
{
    $intVal = (int)$value;
    return min(10, max(0, $intVal));
}

/**
 * Normalize star value (1-5)
 */
private function normalizeStarValue(mixed $value): int
{
    $intVal = (int)$value;
    return min(5, max(1, $intVal));
}

/**
 * Normalize array value (for approval/ranking)
 */
private function normalizeArrayValue(mixed $value): array
{
    if (is_string($value)) {
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [];
    }

    return is_array($value) ? $value : [];
}

private function validateTernary($value): void
{
    if (!in_array($value, [-1, 0, 1], true)) {
        throw new \InvalidArgumentException('Ternary value must be -1, 0, or 1');
    }
}

private function validateApprovalDeliberative($value): void
{
    if (!in_array($value, [1], true)) {
        throw new \InvalidArgumentException('Binary value must 1');
    }
}

private function validateBinary($value): void
{
    if (!in_array($value, [0, 1], true)) {
        throw new \InvalidArgumentException('Binary value must be 0 or 1');
    }
}

private function validateStar($value): void
{
    if (!is_int($value) || $value < 1 || $value > 5) {
        throw new \InvalidArgumentException('Star rating must be between 1 and 5');
    }
}

private function validateScore($value): void
{
    if (!is_int($value) || $value < 0 || $value > 10) {
        throw new \InvalidArgumentException('Score must be between 0 and 10');
    }
}

private function validateReaction($value): void
{
    if (!is_string($value) || empty($value)) {
        throw new \InvalidArgumentException('Reaction must be a non-empty string');
    }
}

private function validateArray($value): void
{
    if (!is_array($value)) {
        throw new \InvalidArgumentException('Value must be an array');
    }
}

public function removeSupport(int $inquiryId, string $userId, int $optionId = 0, ?int $engineId = null): bool
{
    $engineId = ($engineId === 0) ? null : $engineId;

    $this->logger->debug('REMOVE SUPPORT ', [
        'inquiry_id' => $inquiryId,
        'user_id' => $userId,
        'option_id' => $optionId,
        'engine_id' => $engineId
    ]);

    // First, perform the deletion from database
    $deleted = $this->supportMapper->removeSupport($inquiryId, $userId, $optionId, $engineId);

    if (!$deleted) {
        return false;
    }

    // Now get current supports AFTER deletion
    $currentSupports = $this->getSupportsForTarget($inquiryId, $optionId);

    // Update cache with current supports
    $cacheKey = "{$inquiryId}_{$optionId}";
    $this->supportsCache[$cacheKey] = array_values($currentSupports);

    // Calculate and store result using the current supports
    $this->supportResultService->calculateFromSupports(
        $inquiryId,
        $optionId,
        array_values($currentSupports), // Re-index array
        $engineId
    );

    return true;
}

/**
 * Remove all supports for an inquiry
 */
public function removeAllSupportForInquiry(int $inquiryId, ?int $engineId = null): int
{
    $count = $this->supportMapper->removeAllSupportForInquiry($inquiryId);

    if ($count > 0) {
        try {
            $this->supportResultService->calculateResults($engineId ?? 0);
            $this->logger->info('Results recalculated after bulk removal');
        } catch (\Exception $e) {
            $this->logger->error('Failed to recalculate results after bulk removal: ' . $e->getMessage());
        }
    }

    return $count;
}

/**
 * Get all supports for a specific inquiry
 *
 * Returns all support votes (including those for options and the inquiry itself)
 * without any permission checks.
 *
 * @param int $inquiryId The inquiry ID
 * @return Support[] Array of Support entities
 */
public function getSupportsByInquiry(int $inquiryId): array
{
    $this->logger->debug('Getting supports by inquiry', ['inquiryId' => $inquiryId]);
    return $this->supportMapper->findByInquiryId($inquiryId);
}

/**
 * Get supports for a user
 */
public function getSupportsForUser(string $userId): array
{
    return $this->supportMapper->findByUserId($userId);
}

/**
 * Get supports for an inquiry
 */
public function list(int $inquiryId, bool $wRoles = true): array
{
    try {
        if ($wRoles) {
            $this->inquiryMapper
                 ->get($inquiryId, withRoles: $wRoles)
                 ->request(Inquiry::PERMISSION_SUPPORT_ADD);
        } else {
            $this->inquiryMapper->get($inquiryId, withRoles: $wRoles);
        }
    } catch (\Exception $e) {
        $this->logger->error('Failed to list supports: ' . $e->getMessage());
        return [];
    }

    return $this->supportMapper->findByInquiryId($inquiryId);
}

/**
 * Get supports by inquiry ID
 */
public function getSupportByInquiryId(int $inquiryId): array
{
    return $this->supportMapper->findByInquiryId($inquiryId);
}

/**
 * Get single support
 */
public function getSupport(int $inquiryId, string $userId, ?int $optionId = null, ?int $engineId = null): ?Support
{
    return $this->supportMapper->findSupport(
        $inquiryId,
        $userId,
        $optionId ?? 0,
        $engineId
    );
}

/**
 * Get supports by engine ID
 */
public function getSupportByEngineId(int $engineId): array
{
    return $this->supportMapper->findBySupportEngineId($engineId);
}

/**
 * Count supports by inquiry
 */
public function countByInquiry(int $inquiryId, ?int $engineId = null): int
{
    return $this->supportMapper->countByInquiry($inquiryId, $engineId ?? 0);
}

/**
 * Count supports by user
 */
public function countByUser(string $userId): int
{
    return $this->supportMapper->countByUser($userId);
}

/**
 * Get statistics grouped by inquiry type
 */
public function getStatsGroupedByType(): array
{
    $types = $this->inquiryTypeMapper->findAll();
    $stats = [];

    foreach ($types as $type) {
        $inquiries = $this->inquiryMapper->findByType($type->getId());
        $count = 0;
        foreach ($inquiries as $inquiry) {
            $count += $this->countByInquiry($inquiry->getId());
        }
        $stats[$type->getInquiryType()] = $count;
    }

    return $stats;
}

/**
 * Generate support hash
 */
public function generateHash(Support $support): string
{
    return hash('sha256', $support->getInquiryId() . '_' . $support->getUserId() . '_' . $support->getOptionId());
}

/**
 * Batch add supports
 */
public function batchAddSupports(
    int $inquiryId,
    string $userId,
    array $supports,
    ?int $engineId = null
): array {
    $results = [];
    foreach ($supports as $support) {
        $results[] = $this->addSupport(
            $inquiryId,
            $userId,
            $support['value'] ?? 0,
            $support['optionId'] ?? 0,
            $support['weight'] ?? 1,
            $engineId
        );
    }
    return $results;
}
}
