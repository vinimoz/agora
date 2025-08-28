<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\CommentService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class CommentController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private CommentService $commentService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Write a new comment to the db and returns the new comment as array
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/comments')]
    public function list(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'comments' => $this->commentService->list($inquiryId)
            ]
        );
    }

    /**
     * Write a new comment to the db and returns the new comment as array
  *
     * @param int    $inquiryId Inquiry id
     * @param string $message   Comment text to add
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/comment')]
    public function add(int $inquiryId, string $message, bool $confidential): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->commentService->add($message, $inquiryId, $confidential)
            ]
        );
    }

    /**
     * Delete Comment
  *
     * @param int $commentId Id of comment to delete
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/comment/{commentId}')]
    public function delete(int $commentId): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->commentService->delete($commentId)
            ]
        );
    }

    /**
     * Restore deleted Comment
  *
     * @param int $commentId Id of comment to restore
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/comment/{commentId}/restore')]
    public function restore(int $commentId): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->commentService->delete($commentId, true)
            ]
        );
    }
}
