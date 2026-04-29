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
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class SupportService
{
    public function __construct(
        private InquiryMapper $inquiryMapper,
        private SupportMapper $supportMapper,
        private InquiryTypeMapper $inquiryTypeMapper,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Add support for an inquiry
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
        if ($existing !== null) {
            $existing->setValue($value);
            $existing->setWeight($weight);
            return $this->supportMapper->update($existing);
        }

        return $this->supportMapper->addSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);
    }

    /**
     * Update support value
     */
    public function updateSupport(
        int $inquiryId,
        string $userId,
        int $value,
        int $optionId = 0,
        int $weight = 1,
        ?int $engineId = null
    ): Support {
        $existing = $this->supportMapper->findSupport($inquiryId, $userId, $optionId, $engineId);
        if ($existing === null) {
            return $this->addSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);
        }

        $existing->setValue($value);
        $existing->setWeight($weight);
        return $this->supportMapper->update($existing);
    }

    /**
     * Remove support
     */
    public function removeSupport(int $inquiryId, string $userId, int $optionId = 0, ?int $engineId = null): bool
    {
        return $this->supportMapper->removeSupport($inquiryId, $userId, $optionId, $engineId);
    }

    /**
     * Remove all supports for an inquiry
     */
    public function removeAllSupportForInquiry(int $inquiryId, ?int $engineId = null): int
    {
        return $this->supportMapper->removeAllSupportForInquiry($inquiryId, $engineId);
    }

    /**
     * Get supports for a user (matching your existing method name)
     */
    public function getSupportsForUser(string $userId): array
    {
        return $this->supportMapper->findByUserId($userId);
    }

    /**
     * Get supports by user ID (alias)
     */
    public function getSupportByUserId(string $userId): array
    {
        return $this->getSupportsForUser($userId);
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
     * Get supports by option ID
     */
    public function getSupportByOptionId(int $inquiryId, int $optionId): array
    {
        return $this->supportMapper->findByOptionId($inquiryId, $optionId);
    }

    /**
     * Get supports by engine ID
     */
    public function getSupportByEngineId(int $engineId): array
    {
        return $this->supportMapper->findBySupportEngineId($engineId);
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
     * Generate support hash
     */
    public function generateHash(Support $support): string
    {
        return hash('sha256', $support->getInquiryId() . '|' . $support->getUserId() . '|' . $support->getOptionId());
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

    /**
     * Get statistics grouped by inquiry type (matching your existing method)
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
}
