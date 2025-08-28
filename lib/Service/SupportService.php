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
    public function list(int $inquiryId): array
    {
        try {
            $this->inquiryMapper
                ->get($inquiryId, withRoles: true)
                ->request(Inquiry::PERMISSION_SUPPORT_ADD);
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

    public function addSupport(int $inquiryId, string $userId): Support
    {
        // Check if support already exists
        $existing = $this->supportMapper->findSupport($inquiryId, $userId);
        if ($existing !== null) {
            return $existing;
        }

        return $this->supportMapper->addSupport($inquiryId, $userId);
    }

    public function removeSupport(int $inquiryId, string $userId): bool
    {
        return $this->supportMapper->removeSupport($inquiryId, $userId);
    }

    public function removeAllSupportForInquiry(int $inquiryId): int
    {
        return $this->supportMapper->removeAllSupportForInquiry($inquiryId);
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
