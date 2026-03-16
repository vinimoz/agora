<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryGroupMisc;
use OCA\Agora\Db\InquiryGroupMiscMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class InquiryGroupMiscService
{
    public function __construct(
        private InquiryGroupMiscMapper $inquiryGroupMiscMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryGroupMisc
    {
        return $this->inquiryGroupMiscMapper->find($id);
    }

    public function findByInquiryGroupId(int $inquiryGroupId): array
    {
        return $this->inquiryGroupMiscMapper->findByInquiryGroupId($inquiryGroupId);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByInquiryGroupIdAndKey(int $inquiryGroupId, string $key): InquiryGroupMisc
    {
        return $this->inquiryGroupMiscMapper->findByInquiryGroupIdAndKey($inquiryGroupId, $key);
    }

    public function findByKey(string $key): array
    {
        return $this->inquiryGroupMiscMapper->findByKey($key);
    }

    public function getValue(int $inquiryGroupId, string $key): ?string
    {
        return $this->inquiryGroupMiscMapper->getValue($inquiryGroupId, $key);
    }

    public function setValue(int $inquiryGroupId, string $key, ?string $value): InquiryGroupMisc
    {
        return $this->inquiryGroupMiscMapper->setValue($inquiryGroupId, $key, $value);
    }

    public function create(InquiryGroupMisc $inquiryGroupMisc): InquiryGroupMisc
    {
        return $this->inquiryGroupMiscMapper->insert($inquiryGroupMisc);
    }

    public function update(InquiryGroupMisc $inquiryGroupMisc): InquiryGroupMisc
    {
        return $this->inquiryGroupMiscMapper->update($inquiryGroupMisc);
    }

    public function delete(int $id): InquiryGroupMisc
    {
        $inquiryGroupMisc = $this->find($id);
        return $this->inquiryGroupMiscMapper->delete($inquiryGroupMisc);
    }

    public function deleteByInquiryGroupId(int $inquiryGroupId): int
    {
        return $this->inquiryGroupMiscMapper->deleteByInquiryGroupId($inquiryGroupId);
    }

    public function deleteByInquiryGroupIdAndKey(int $inquiryGroupId, string $key): int
    {
        return $this->inquiryGroupMiscMapper->deleteByInquiryGroupIdAndKey($inquiryGroupId, $key);
    }
}
