<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Quorum;
use OCA\Agora\Db\QuorumMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class QuorumService
{
    public function __construct(
        private QuorumMapper $quorumMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Quorum
    {
        return $this->quorumMapper->find($id);
    }

    public function findByInquiryId(int $inquiryId): array
    {
        return $this->quorumMapper->findByInquiryId($inquiryId);
    }

    public function findByOptionId(int $optionId): array
    {
        return $this->quorumMapper->findByOptionId($optionId);
    }

    public function findByInquiryIdAndPhase(int $inquiryId, string $phase): array
    {
        return $this->quorumMapper->findByInquiryIdAndPhase($inquiryId, $phase);
    }

    public function findByOptionIdAndPhase(int $optionId, string $phase): array
    {
        return $this->quorumMapper->findByOptionIdAndPhase($optionId, $phase);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByInquiryIdAndPhaseAndType(int $inquiryId, string $phase, string $type): Quorum
    {
        return $this->quorumMapper->findByInquiryIdAndPhaseAndType($inquiryId, $phase, $type);
    }

    public function getMaxSortOrderForInquiry(int $inquiryId): int
    {
        return $this->quorumMapper->getMaxSortOrderForInquiry($inquiryId);
    }

    public function getMaxSortOrderForOption(int $optionId): int
    {
        return $this->quorumMapper->getMaxSortOrderForOption($optionId);
    }

    public function create(
        int $inquiryId,
        int $optionId,
        string $phase,
        string $type,
        float $value,
        string $base,
        ?string $description = null,
        ?int $sortOrder = null
    ): Quorum {
        // Validate input
        $this->validateQuorumParameters($phase, $type, $base, $value);

        $quorum = new Quorum();
        $quorum->setInquiryId($inquiryId);
        $quorum->setOptionId($optionId);
        $quorum->setPhase($phase);
        $quorum->setType($type);
        $quorum->setValue($value);
        $quorum->setBase($base);
        $quorum->setDescription($description);

        if ($sortOrder === null) {
            $sortOrder = $this->getMaxSortOrderForInquiry($inquiryId) + 1;
        }
        $quorum->setSortOrder($sortOrder);

        $timestamp = time();
        $quorum->setCreated($timestamp);
        $quorum->setUpdated($timestamp);

        return $this->quorumMapper->insert($quorum);
    }

    public function update(
        int $id,
        string $phase,
        string $type,
        float $value,
        string $base,
        ?string $description = null,
        ?int $sortOrder = null
    ): Quorum {
        // Validate input
        $this->validateQuorumParameters($phase, $type, $base, $value);

        $quorum = $this->find($id);
        $quorum->setPhase($phase);
        $quorum->setType($type);
        $quorum->setValue($value);
        $quorum->setBase($base);
        $quorum->setDescription($description);

        if ($sortOrder !== null) {
            $quorum->setSortOrder($sortOrder);
        }

        $quorum->setUpdated(time());

        return $this->quorumMapper->update($quorum);
    }

    public function updateSortOrders(array $sortOrders): void
    {
        $this->quorumMapper->updateSortOrders($sortOrders);
    }

    public function delete(int $id): Quorum
    {
        $quorum = $this->find($id);
        return $this->quorumMapper->delete($quorum);
    }

    public function deleteByInquiryId(int $inquiryId): int
    {
        return $this->quorumMapper->deleteByInquiryId($inquiryId);
    }

    public function deleteByOptionId(int $optionId): int
    {
        return $this->quorumMapper->deleteByOptionId($optionId);
    }

    public function deleteByOptionIds(array $optionIds): int
    {
        return $this->quorumMapper->deleteByOptionIds($optionIds);
    }

    /**
     * Validate quorum parameters
     */
    private function validateQuorumParameters(string $phase, string $type, string $base, float $value): void
    {
        if (!in_array($phase, Quorum::getPhases(), true)) {
            throw new \InvalidArgumentException('Invalid phase: ' . $phase);
        }

        if (!in_array($type, Quorum::getTypes(), true)) {
            throw new \InvalidArgumentException('Invalid type: ' . $type);
        }

        if (!in_array($base, Quorum::getBases(), true)) {
            throw new \InvalidArgumentException('Invalid base: ' . $base);
        }

        if ($value < 0) {
            throw new \InvalidArgumentException('Value cannot be negative');
        }

        if ($type === Quorum::TYPE_PERCENTAGE && $value > 100) {
            throw new \InvalidArgumentException('Percentage value cannot exceed 100');
        }
    }

    /**
     * Calculate if quorum is reached
     */
    public function isQuorumReached(Quorum $quorum, int $actualCount, int $totalCount): bool
    {
        if ($totalCount === 0) {
            return false;
        }

        switch ($quorum->getType()) {
            case Quorum::TYPE_PERCENTAGE:
                $required = ($totalCount * $quorum->getValue()) / 100;
                return $actualCount >= $required;

            case Quorum::TYPE_ABSOLUTE:
                return $actualCount >= $quorum->getValue();

            case Quorum::TYPE_MAJORITY:
                return $actualCount > ($totalCount / 2);

            default:
                return false;
        }
    }
}
