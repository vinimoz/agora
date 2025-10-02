<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Comment;
use OCA\Agora\Db\CommentMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Event\CommentAddEvent;
use OCA\Agora\Event\CommentDeleteEvent;
use OCA\Agora\Exceptions\Exception;
use OCA\Agora\UserSession;
use OCP\EventDispatcher\IEventDispatcher;

class CommentService
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private CommentMapper $commentMapper,
        private Comment $comment,
        private IEventDispatcher $eventDispatcher,
        private UserSession $userSession,
        private InquiryMapper $inquiryMapper,
    ) {
    }

    /**
     * Get comments
     * Read all comments of a inquiry based on the inquiry id and return list as array
     *
     * @return Comment[]
     */
    public function list(int $inquiryId): array
    {
        try {
            $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_COMMENT_ADD);
        } catch (Exception $e) {
            return [];
        }
        $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_COMMENT_ADD);

        $comments = $this->commentMapper->findByInquiry($inquiryId);
        // treat comments from the same user within 5 minutes as grouped comments
        $timeTolerance = 5 * 60;
        // init predecessor as empty Comment
        $predecessor = new Comment();

        foreach ($comments as &$comment) {
            if ($comment->getUserId() === $predecessor->getUserId()
                && $comment->getTimestamp() - $predecessor->getTimestamp() < $timeTolerance
                && $comment->getConfidential() === $predecessor->getConfidential()
            ) {
                $comment->setParent($predecessor->getId());
            } else {
                $predecessor = $comment;
            }
        }

        return $comments;
    }

    /**
     * Add comment
     */
    public function add(string $message, int $inquiryId, ?bool $confidential = false): Comment
    {
        $inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
        $inquiry->request(Inquiry::PERMISSION_COMMENT_ADD);

        if ($inquiry->getForceConfidentialComments()) {
            $confidential = true;
        }

        $this->comment = new Comment();
        $this->comment->setInquiryId($inquiryId);
        $this->comment->setUserId($this->userSession->getCurrentUserId());
        $this->comment->setComment($message);
        $this->comment->setConfidential($confidential ? Comment::CONFIDENTIAL_YES : Comment::CONFIDENTIAL_NO);
        $this->comment->setRecipient($confidential ? $inquiry->getOwner() : null);
        $this->comment->setTimestamp(time());
        $this->comment = $this->commentMapper->insert($this->comment);

        $this->eventDispatcher->dispatchTyped(new CommentAddEvent($this->comment));

        return $this->comment;
    }
    
    public function countByInquiryId(int $inquiryId): int
    {
         return $this->commentMapper->countByInquiryId($inquiryId);
    }
        

    /**
     * Restore comment
     *
     * @param int $commentId id of Comment to restore
     */
    public function restore(int $commentId): Comment
    {
        return $this->delete($commentId, true);
    }

    /**
     * Delete or restore comment
     *
     * @param int  $commentId id of Comment to delete or restore
     * @param bool $restore   Set true, if comment is to be restored
     */
    public function delete(int $commentId, bool $restore = false): Comment
    {
        $this->comment = $this->commentMapper->find($commentId);

        if (!$this->comment->getCurrentUserIsEntityUser()) {
            $this->inquiryMapper->get($this->comment->getInquiryId(), withRoles: true)->request(Inquiry::PERMISSION_COMMENT_DELETE);
        }

        $this->comment->setDeleted($restore ? 0 : time());
        $this->commentMapper->update($this->comment);
        $this->eventDispatcher->dispatchTyped(new CommentDeleteEvent($this->comment));

        return $this->comment;
    }
}
