<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\CommentService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class CommentApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private CommentService $commentService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Read all comments of a inquiry based on the inquiry id and return list as array
  *
     * @param int inquiryId inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/comments', requirements: ['apiVersion' => '(v2)'])]
    public function list(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['comments' => $this->commentService->list($inquiryId)]);
    }

    /**
     * Add comment
  *
     * @param int    $inquiryId inquiry id
     * @param string $comment   Comment text to add
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/{inquiryId}/comment', requirements: ['apiVersion' => '(v2)'])]
    public function add(int $inquiryId, string $comment): DataResponse
    {
        return $this->response(fn () => ['comment' => $this->commentService->add($comment, $inquiryId)]);
    }

    /**
     * Delete comment
  *
     * @param int $commentId Id of comment to delete
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/comment/{commentId}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $commentId): DataResponse
    {
        return $this->response(fn () => ['comment' => $this->commentService->delete($commentId)]);
    }

    /**
     * Restore comment
  *
     * @param int $commentId Id of comment to restore
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/comment/{commentId}/restore', requirements: ['apiVersion' => '(v2)'])]
    public function restore(int $commentId): DataResponse
    {
        return $this->response(fn () => ['comment' => $this->commentService->restore($commentId)]);
    }
}
