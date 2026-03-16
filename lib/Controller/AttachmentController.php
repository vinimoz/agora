<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\AttachmentService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\Files\File;

/**
 * @psalm-api
 */
class AttachmentController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private AttachmentService $attachmentService,
    ) {
        parent::__construct($appName, $request);
        $this->attachmentService = $attachmentService;
    }

    /**
       * Handle group file upload
   *
       * @param int $group ID of the group
       */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/group/{groupId}/attachment')]
    public function addGroup(int $groupId): JSONResponse
    {
        $uploadedFile = $this->request->getUploadedFile('file');
        $coverIdParam = $this->request->getParam('coverId', 'false');
        $coverId = filter_var($coverIdParam, FILTER_VALIDATE_BOOLEAN);

        if (!$uploadedFile || $uploadedFile['error'] !== UPLOAD_ERR_OK) {
            return new JSONResponse(['error' => 'Fichier invalide'], 400);
        }

        return $this->response(
            fn () => [
                    'attachment' => $this->attachmentService->add($groupId, $uploadedFile, $coverId, true)
                ]
        );
    }
    /**
       * Handle file upload
   *
       * @param int $inquiryId ID of the inquiry
       */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/attachment')]
    public function add(int $inquiryId): JSONResponse
    {
        $uploadedFile = $this->request->getUploadedFile('file');
        $coverIdParam = $this->request->getParam('coverId', 'false');
        $coverId = filter_var($coverIdParam, FILTER_VALIDATE_BOOLEAN);

        if (!$uploadedFile || $uploadedFile['error'] !== UPLOAD_ERR_OK) {
            return new JSONResponse(['error' => 'Fichier invalide'], 400);
        }

        return $this->response(
            fn () => [
                    'attachment' => $this->attachmentService->add($inquiryId, $uploadedFile, $coverId, false)
                ]
        );
    }

    /**
     * Get all attachments for an inquiry
     *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/attachments')]
    public function getAll(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                    'attachments' => $this->attachmentService->getAll($inquiryId, 0)
                ]
        );
    }

    /**
     * Remove an attachment
     *
     * @param int $attachmentId Id of attachment to remove
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/attachment/{attachmentId}')]
    public function remove(int $attachmentId): JSONResponse
    {
        return $this->response(
            fn () => [
                    'attachment' => $this->attachmentService->remove($attachmentId)
                ]
        );
    }
}
