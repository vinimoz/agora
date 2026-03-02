<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryLink;
use OCA\Agora\Db\InquiryLinkMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class InquiryLinkService
{
    public function __construct(
        private InquiryLinkMapper $inquiryLinkMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryLink
    {
        return $this->inquiryLinkMapper->find($id);
    }

    public function findByInquiryId(int $inquiryId): array
    {
        return $this->inquiryLinkMapper->findByInquiryId($inquiryId);
    }

    public function findByTarget(string $targetApp, string $targetType, string $targetId): array
    {
        return $this->inquiryLinkMapper->findByTarget($targetApp, $targetType, $targetId);
    }

    public function findByTargetApp(string $targetApp): array
    {
        return $this->inquiryLinkMapper->findByTargetApp($targetApp);
    }

    public function delete(int $id): InquiryLink
    {
        $inquiryLink = $this->find($id);
        return $this->inquiryLinkMapper->delete($inquiryLink);
    }

    public function deleteByInquiryId(int $inquiryId): int
    {
        return $this->inquiryLinkMapper->deleteByInquiryId($inquiryId);
    }

    public function create(
        int $inquiryId,
        string $targetApp,
        string $targetType,
        string $targetId,
        string $metadata,
        int $sortOrder = 0,
        int $createdBy = 0
    ): InquiryLink {
        $inquiryLink = new InquiryLink();
        $inquiryLink->setInquiryId($inquiryId);
        $inquiryLink->setTargetApp($targetApp);
        $inquiryLink->setTargetType($targetType);
        $inquiryLink->setTargetId($targetId);
        $inquiryLink->setMetadata($metadata);
        $inquiryLink->setSortOrder($sortOrder);
        $inquiryLink->setCreatedBy($createdBy);

        return $this->inquiryLinkMapper->insert($inquiryLink);
    }

    public function update(
        int $id,
        string $targetApp,
        string $targetType,
        string $targetId,
        string $metadata,
        int $sortOrder = 0
    ): InquiryLink {
        $inquiryLink = $this->find($id);
        $inquiryLink->setTargetApp($targetApp);
        $inquiryLink->setTargetType($targetType);
        $inquiryLink->setTargetId($targetId);
        $inquiryLink->setMetadata($metadata);
        $inquiryLink->setSortOrder($sortOrder);

        return $this->inquiryLinkMapper->update($inquiryLink);
    }

    /**
     * Create multiple links for an inquiry
     *
     * @param array $links Array of link data [target_app, target_type, target_id, sort_order, created_by]
     */
    public function createLinksForInquiry(int $inquiryId, array $links): array
    {
        $createdLinks = [];
        foreach ($links as $linkData) {
            $inquiryLink = new InquiryLink();
            $inquiryLink->setInquiryId($inquiryId);
            $inquiryLink->setTargetApp($linkData['target_app']);
            $inquiryLink->setTargetType($linkData['target_type']);
            $inquiryLink->setTargetId($linkData['target_id']);
            $inquiryLink->setMetadata($linkData['metadata']);
            $inquiryLink->setSortOrder($linkData['sort_order'] ?? 0);
            $inquiryLink->setCreatedBy($linkData['created_by'] ?? 0);

            $createdLinks[] = $this->create($inquiryLink);
        }

        return $createdLinks;
    }
}
