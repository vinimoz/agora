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

class SupportService
{
    public function __construct(
        private InquiryMapper $inquiryMapper,
        private SupportMapper $supportMapper
    ) {
    }

    /**
     * @return Support[] list by userID
     */
    public function getSupportByUserId(string $userId): array
    {
        return $this->supportMapper->findByUserId($userId);
    }


    /**
     * @return Support[]
     */
    public function list(int $inquiryId, bool $wRoles = true): array
    {
        try {
            if ($wroles) {
            $this->inquiryMapper
                ->get($inquiryId, withRoles: $wRoles)
                ->request(Inquiry::PERMISSION_SUPPORT_ADD);
            }
            else {
              $this->inquiryMapper->get($inquiryId, withRoles: $wRoles);
            }
        } catch (Exception $e) {
            return [];
        }

        return $result = $this->supportMapper->findByInquiryId($inquiryId);
    }

    /**
     * @return Support[]
     */
    public function getSupportByInquiryId(int $inquiryId): array
    {
        return $this->supportMapper->findByInquiryId($inquiryId);
    }

    public function getSupport(int $inquiryId, string $userId): ?Support
    {
        return $this->supportMapper->findSupport($inquiryId, $userId);
    }

    public function addSupport(int $inquiryId, string $userId, int $value, int $optionId): Support
    {
        // Check if support already exists
        $existing = $this->supportMapper->findSupport($inquiryId, $userId, $optionId);
        if ($existing !== null) {
            return $existing;
        }
        return $this->supportMapper->addSupport($inquiryId, $userId, $value, $optionId);
    }

    public function updateSupport(int $inquiryId, string $userId, int $value, int $optionId): Support
    {
        // Check if support already exists
        $existing = $this->supportMapper->findSupport($inquiryId, $userId, $optionId);
        $existing->setValue($value);
        return $this->supportMapper->update($existing);
    }

    public function removeSupport(int $inquiryId, string $userId, int $optionId): bool
    {
        return $this->supportMapper->removeSupport($inquiryId, $userId, $optionId);
    }

    public function removeAllSupportForInquiry(int $inquiryId): int
    {
        return $this->supportMapper->removeAllSupportForInquiry($inquiryId);
    }

    public function generateHash(Support $support): string
    {
        return hash('sha256', $support->getInquiryId() . '|' . $support->getUserId() . '|' . $support->getOptionId());
    }


    public function countByInquiry(int $inquiryId): int
    {
        return $this->supportMapper->countByInquiry($inquiryId);
    }

    public function countByUser(string $userId): int
    {
        return $this->supportMapper->countByUser($userId);
    }
}
