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
class AttachmentApiController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private AttachmentService $attachmentService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all attachments for an inquiry
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/api/v1/inquiry/{inquiryId}/attachments')]
    public function getAll(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'attachments' => $this->attachmentService->getAll($inquiryId)
            ]
        );
    }
    /**
     * Handle file upload via API
  *
     * @param int $inquiryId ID of the inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/api/v1/inquiry/{inquiryId}/attachment')]
    public function add(int $inquiryId): JSONResponse
    {
        try {
            $file = $this->request->getUploadedFile('file');

            if ($file === null || $file['error'] !== UPLOAD_ERR_OK) {
                throw new \Exception('Invalid file upload');
            }

            $uploadedFile = new \OCP\Files\SimpleFS\SimpleFile(
                $file['tmp_name'],
                $file['name'],
                $file['type'],
                $file['size']
            );

            return $this->response(
                fn () => [
                    'attachment' => $this->attachmentService->add($uploadedFile, $inquiryId)
                ]
            );

        } catch (\Exception $e) {
            return new JSONResponse(
                [
                'error' => $e->getMessage()
                ], 400
            );
        }
    }
    /**
     * Remove an attachment
  *
     * @param int $attachmentId Id of attachment to remove
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/api/v1/attachment/{attachmentId}')]
    public function remove(int $attachmentId): JSONResponse
    {
        return $this->response(
            fn () => [
                'attachment' => $this->attachmentService->remove($attachmentId)
            ]
        );
    }
}
