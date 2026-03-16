<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryMisc;
use OCA\Agora\Db\InquiryMiscMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class InquiryMiscService
{
    public function __construct(
        private InquiryMiscMapper $inquiryMiscMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryMisc
    {
        return $this->inquiryMiscMapper->find($id);
    }

    public function findByInquiryId(int $inquiryId): array
    {
        return $this->inquiryMiscMapper->findByInquiryId($inquiryId);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByInquiryIdAndKey(int $inquiryId, string $key): InquiryMisc
    {
        return $this->inquiryMiscMapper->findByInquiryIdAndKey($inquiryId, $key);
    }

    public function findByKey(string $key): array
    {
        return $this->inquiryMiscMapper->findByKey($key);
    }

    public function getValue(int $inquiryId, string $key): ?string
    {
        return $this->inquiryMiscMapper->getValue($inquiryId, $key);
    }

    public function setValue(int $inquiryId, string $key, ?string $value): InquiryMisc
    {
        return $this->inquiryMiscMapper->setValue($inquiryId, $key, $value);
    }

    public function create(InquiryMisc $inquiryMisc): InquiryMisc
    {
        return $this->inquiryMiscMapper->insert($inquiryMisc);
    }

    public function update(InquiryMisc $inquiryMisc): InquiryMisc
    {
        return $this->inquiryMiscMapper->update($inquiryMisc);
    }

    public function delete(int $id): InquiryMisc
    {
        $inquiryMisc = $this->find($id);
        return $this->inquiryMiscMapper->delete($inquiryMisc);
    }

    public function deleteByInquiryId(int $inquiryId): int
    {
        return $this->inquiryMiscMapper->deleteByInquiryId($inquiryId);
    }

    public function deleteByInquiryIdAndKey(int $inquiryId, string $key): int
    {
        return $this->inquiryMiscMapper->deleteByInquiryIdAndKey($inquiryId, $key);
    }
}
