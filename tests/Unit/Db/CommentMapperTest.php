<?php declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Tests\Unit\Db;

use League\FactoryMuffin\Faker\Facade as Faker;
use OCA\Agora\Tests\Unit\UnitTestCase;

use OCA\Agora\Db\Comment;
use OCA\Agora\Db\CommentMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCP\ISession;
use OCP\Server;

class CommentMapperTest extends UnitTestCase {
	private ISession $session;
	private CommentMapper $commentMapper;
	private InquiryMapper $inquiryMapper;
	/** @var Inquiry[] $inquiries */
	private array $inquiries = [];
	/** @var Comment[] $comments */
	private array $comments = [];

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		parent::setUp();
		$this->session = Server::get(ISession::class);
		$this->session->set('ncAgoraUserId', 'TestUser');

		$this->commentMapper = Server::get(CommentMapper::class);
		$this->inquiryMapper = Server::get(InquiryMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Agora\Db\Inquiry')
		];

		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);

			for ($count=0; $count < 2; $count++) {
				$comment = $this->fm->instance('OCA\Agora\Db\Comment');
				$comment->setInquiryId($inquiry->getId());
				array_push($this->comments, $this->commentMapper->insert($comment));
			}
		}
		unset($inquiry);
	}

	 /**
 	 * testFind
 	 */
 	public function testFind() {
 		foreach ($this->comments as $comment) {
 			$this->assertInstanceOf(Comment::class, $this->commentMapper->find($comment->getId()));
 		}
 	}

	/**
	 * testFindByInquiry
	 */
	public function testFindByInquiry() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertTrue(count($this->commentMapper->findByInquiry($inquiry->getId())) > 0);
		}
	}

	/**
	 * testUpdate
	 */
	public function testUpdate() {
		foreach ($this->comments as &$comment) {
			$newComment = Faker::paragraph();
			$comment->setComment($newComment());
			$this->assertInstanceOf(Comment::class, $this->commentMapper->update($comment));
		}
		unset($comment);
	}

	/**
	 * testDelete
	 */
	public function testDelete() {
		foreach ($this->comments as $comment) {
			$this->assertInstanceOf(Comment::class, $this->commentMapper->delete($comment));
		}
	}

	/**
	 * tearDown
	 */
	public function tearDown(): void {
		parent::tearDown();
		foreach ($this->inquiries as $inquiry) {
			$this->inquiryMapper->delete($inquiry);
		}
	}

}
