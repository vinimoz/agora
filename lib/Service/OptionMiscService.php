<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\OptionMisc;
use OCA\Agora\Db\OptionMiscMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class OptionMiscService
{
    public function __construct(
        private OptionMiscMapper $optionMiscMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): OptionMisc
    {
        return $this->optionMiscMapper->find($id);
    }

    public function findByOptionId(int $optionId): array
    {
        return $this->optionMiscMapper->findByOptionId($optionId);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByOptionIdAndKey(int $optionId, string $key): OptionMisc
    {
        return $this->optionMiscMapper->findByOptionIdAndKey($optionId, $key);
    }

    public function findByKey(string $key): array
    {
        return $this->optionMiscMapper->findByKey($key);
    }

    public function getValue(int $optionId, string $key): ?string
    {
        return $this->optionMiscMapper->getValue($optionId, $key);
    }

    public function setValue(int $optionId, string $key, ?string $value): OptionMisc
    {
        return $this->optionMiscMapper->setValue($optionId, $key, $value);
    }

    public function create(OptionMisc $optionMisc): OptionMisc
    {
        return $this->optionMiscMapper->insert($optionMisc);
    }

    public function update(OptionMisc $optionMisc): OptionMisc
    {
        return $this->optionMiscMapper->update($optionMisc);
    }

    public function delete(int $id): OptionMisc
    {
        $optionMisc = $this->find($id);
        return $this->optionMiscMapper->delete($optionMisc);
    }

    public function deleteByOptionId(int $optionId): int
    {
        return $this->optionMiscMapper->deleteByOptionId($optionId);
    }

    public function deleteByOptionIds(array $optionIds): int
    {
        return $this->optionMiscMapper->deleteByOptionIds($optionIds);
    }

    public function deleteByOptionIdAndKey(int $optionId, string $key): int
    {
        return $this->optionMiscMapper->deleteByOptionIdAndKey($optionId, $key);
    }
}
