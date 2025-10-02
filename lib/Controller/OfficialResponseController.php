<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\OfficialResponse;
use OCA\Agora\Service\OfficialResponseService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class OfficialResponseController extends Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private OfficialResponseService $responseService
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function index(int $inquiryId): DataResponse
    {
        $responses = $this->responseService->findByInquiry($inquiryId);
        return new DataResponse($responses);
    }

    /**
     * @NoAdminRequired
     */
    public function show(int $id): DataResponse
    {
        try {
            $response = $this->responseService->find($id);
            return new DataResponse($response);
        } catch (DoesNotExistException|MultipleObjectsReturnedException $e) {
            return new DataResponse([], Http::STATUS_NOT_FOUND);
        }
    }

    /**
     * @NoAdminRequired
     */
    public function create(string $title, int $inquiryId, string $userId, int $type, string $response): DataResponse
    {
        $newResponse = $this->responseService->create($title, $inquiryId, $userId, $type, $response);
        return new DataResponse($newResponse, Http::STATUS_CREATED);
    }

    /**
     * @NoAdminRequired
     */
    public function update(int $id, string $title, int $type, string $response): DataResponse
    {
        try {
            $updatedResponse = $this->responseService->update($id, $title, $type, $response);
            return new DataResponse($updatedResponse);
        } catch (DoesNotExistException|MultipleObjectsReturnedException $e) {
            return new DataResponse([], Http::STATUS_NOT_FOUND);
        }
    }

    /**
     * @NoAdminRequired
     */
    public function delete(int $id): DataResponse
    {
        try {
            $deletedResponse = $this->responseService->delete($id);
            return new DataResponse($deletedResponse);
        } catch (DoesNotExistException|MultipleObjectsReturnedException $e) {
            return new DataResponse([], Http::STATUS_NOT_FOUND);
        }
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function count(int $inquiryId): DataResponse
    {
        $count = $this->responseService->countByInquiry($inquiryId);
        return new DataResponse(['count' => $count]);
    }
}
