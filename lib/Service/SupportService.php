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
use OCA\Agora\Db\InquiryTypeMapper;
use Psr\Log\LoggerInterface;

class SupportService
{
    public function __construct(
        private InquiryMapper $inquiryMapper,
        private SupportMapper $supportMapper,
        private InquiryTypeMapper $inquiryTypeMapper,
        private SupportResultService $supportResultService,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Add support for an inquiry (will update if exists)
     */
    public function addSupport(
        int $inquiryId,
        string $userId,
        int $value = 1,
        int $optionId = 0,
        int $weight = 1,
        ?int $engineId = null
    ): Support {
        // Check permission
        $inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
        $inquiry->request(Inquiry::PERMISSION_SUPPORT_ADD);

        // Check if support already exists
        $existing = $this->supportMapper->findSupport($inquiryId, $userId, $optionId, $engineId);
        
        $support = null;
        
        if ($existing !== null) {
            // Update existing support
            $this->logger->info('Updating existing support', [
                'id' => $existing->getId(),
                'inquiryId' => $inquiryId,
                'userId' => $userId,
                'optionId' => $optionId,
                'oldValue' => $existing->getValue(),
                'newValue' => $value
            ]);
            
            $existing->setValue($value);
            $existing->setWeight($weight);
            $existing->setUpdated(time());
            if ($engineId !== null && $engineId !== 0) {
                $existing->setSupportEngineId($engineId);
            }
            
            $support = $this->supportMapper->update($existing);
        } else {
            // Create new support
            $this->logger->info('Creating new support', [
                'inquiryId' => $inquiryId,
                'userId' => $userId,
                'optionId' => $optionId,
                'value' => $value
            ]);
            
            $support = $this->supportMapper->addSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);
        }

        // Recalculate results after support change if engine is involved
        if ($engineId !== null && $engineId !== 0) {
            try {
                $this->supportResultService->calculateTargetResults(
                    $engineId,
                    $optionId > 0 ? 'option' : 'inquiry',
                    $optionId > 0 ? $optionId : $inquiryId
                );
                $this->logger->info('Results recalculated for engine ' . $engineId);
            } catch (\Exception $e) {
                $this->logger->error('Failed to recalculate results: ' . $e->getMessage());
            }
        }

        return $support;
    }

    /**
     * Update support value (same as addSupport with upsert logic)
     */
    public function updateSupport(
        int $inquiryId,
        string $userId,
        int $value = 1,
        int $optionId = 0,
        int $weight = 1,
        ?int $engineId = null
    ): Support {
        return $this->addSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);
    }

    /**
     * Remove support
     */
    public function removeSupport(int $inquiryId, string $userId, int $optionId = 0, ?int $engineId = null): bool
    {
        $result = $this->supportMapper->removeSupport($inquiryId, $userId, $optionId, $engineId);
        
        // Recalculate results after removal if engine is involved
        if ($result && $engineId !== null && $engineId !== 0) {
            try {
                $this->supportResultService->calculateTargetResults(
                    $engineId,
                    $optionId > 0 ? 'option' : 'inquiry',
                    $optionId > 0 ? $optionId : $inquiryId
                );
            } catch (\Exception $e) {
                $this->logger->error('Failed to recalculate results after removal: ' . $e->getMessage());
            }
        }
        
        return $result;
    }

    /**
     * Remove all supports for an inquiry
     */
    public function removeAllSupportForInquiry(int $inquiryId, ?int $engineId = null): int
    {
        $count = $this->supportMapper->removeAllSupportForInquiry($inquiryId, $engineId);
        
        if ($count > 0 && $engineId !== null && $engineId !== 0) {
            try {
                $this->supportResultService->calculateResults($engineId);
            } catch (\Exception $e) {
                $this->logger->error('Failed to recalculate results after bulk removal: ' . $e->getMessage());
            }
        }
        
        return $count;
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
        return $this->supportMapper->countByInquiry($inquiryId, $engineId);
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
        return hash('sha256', $support->getInquiryId() . '|' . $support->getUserId() . '|' . $support->getOptionId());
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
