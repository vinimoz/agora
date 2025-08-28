<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\OfficialResponse;
use OCA\Agora\Db\OfficialResponseMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class OfficialResponseService
{

    public function __construct(
        private OfficialResponseMapper $responseMapper
    ) {
    }

    public function find(int $id): OfficialResponse
    {
        return $this->responseMapper->find($id);
    }

    /**
     * @return OfficialResponse[]
     */
    public function findByInquiry(int $inquiryId): array
    {
        return $this->responseMapper->findByInquiry($inquiryId);
    }

    /**
     * @return OfficialResponse[]
     */
    public function findByUser(string $userId): array
    {
        return $this->responseMapper->findByUser($userId);
    }

    public function create(string $title, int $inquiryId, string $userId, int $type, string $response): OfficialResponse
    {
        $officialResponse = new OfficialResponse();
        $officialResponse->setTitle($title);
        $officialResponse->setInquiryId($inquiryId);
        $officialResponse->setUserId($userId);
        $officialResponse->setType($type);
        $officialResponse->setResponse($response);
        $officialResponse->setCreated(time());

        return $this->responseMapper->insert($officialResponse);
    }

    public function update(int $id, string $title, int $type, string $response): OfficialResponse
    {
        $officialResponse = $this->responseMapper->find($id);
        $officialResponse->setTitle($title);
        $officialResponse->setType($type);
        $officialResponse->setResponse($response);
        return $this->responseMapper->update($officialResponse);
    }

    public function delete(int $id): OfficialResponse
    {
        $officialResponse = $this->responseMapper->find($id);
        $this->responseMapper->delete($officialResponse);
        return $officialResponse;
    }

    public function deleteByInquiry(int $inquiryId): int
    {
        return $this->responseMapper->deleteByInquiryId($inquiryId);
    }

    public function countByInquiry(int $inquiryId): int
    {
        return $this->responseMapper->countByInquiryId($inquiryId);
    }
}
