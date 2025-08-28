<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Inquiries\Tests\Unit\Db;

use OCA\Inquiries\Tests\Unit\UnitTestCase;

use OCA\Inquiries\Db\Inquiry;
use OCA\Inquiries\Db\InquiryMapper;
use OCA\Inquiries\Db\Option;
use OCA\Inquiries\Db\OptionMapper;
use OCA\Inquiries\Db\Vote;
use OCA\Inquiries\Db\VoteMapper;
use OCP\ISession;
use OCP\Server;

class VoteMapperTest extends UnitTestCase {
	private ISession $session;
	private OptionMapper $optionMapper;
	private InquiryMapper $inquiryMapper;
	private VoteMapper $voteMapper;
	/** @var Inquiry[] $inquiries */
	private array $inquiries = [];
	/** @var Option[] $options */
	private array $options = [];
	/** @var Vote[] $votes */
	private array $votes = [];

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		parent::setUp();
		$this->session = Server::get(ISession::class);
		$this->session->set('ncInquiriesUserId', 'TestUser');

		$this->inquiryMapper = Server::get(InquiryMapper::class);
		$this->voteMapper = Server::get(VoteMapper::class);
		$this->optionMapper = Server::get(OptionMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Inquiries\Db\Inquiry')
		];

		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);

			for ($optionsCount = 0; $optionsCount < 2; $optionsCount++) {
				$option = $this->fm->instance('OCA\Inquiries\Db\Option');
				$option->setInquiryId($inquiry->getId());
				$option->syncOption();
				array_push($this->options, $this->optionMapper->insert($option));
				$vote = $this->fm->instance('OCA\Inquiries\Db\Vote');
				$vote->setInquiryId($option->getInquiryId());
				$vote->setUserId('voter');
				$vote->setVoteOptionText($option->getInquiryOptionText());
				array_push($this->votes, $this->voteMapper->insert($vote));
			}
		}
		unset($inquiry);
	}

	/**
	 * testFindByInquiry
	 */
	public function testFindByInquiry() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertTrue(count($this->voteMapper->findByInquiry($inquiry->getId())) > 0);
		}
	}

	/**
	 * testFindByInquiryAndUser
	 */
	public function testFindByInquiryAndUser() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertTrue(count($this->voteMapper->findByInquiryAndUser($inquiry->getId(), 'voter')) > 0);
		}
	}

	/**
	 * testFindSingleVote
	 */
	public function testFindSingleVote() {
		foreach ($this->votes as $vote) {
			$this->assertInstanceOf(Vote::class, $this->voteMapper->findSingleVote($vote->getInquiryId(), $vote->getVoteOptionText(), $vote->getUserId()));
		}
	}

	/**
	 * testParticipantsByInquiry
	 */
	public function testParticipantsByInquiry() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertTrue(count($this->voteMapper->findParticipantsByInquiry($inquiry->getId())) > 0);
		}
	}

	/**
	 * testUpdate
	 */
	public function testUpdate() {
		foreach ($this->votes as &$vote) {
			$vote->setVoteAnswer('no');
			$this->assertInstanceOf(Vote::class, $this->voteMapper->update($vote));
		}
		unset($vote);
	}

	/**
	 * testDeleteByInquiryAndUser
	 */
	public function testDeleteByInquiryAndUserId(): void {
		foreach ($this->inquiries as $inquiry) {
			$this->expectNotToPerformAssertions();
			$this->voteMapper->deleteByInquiryAndUserId($inquiry->getId(), 'voter');
		}
	}

	/**
	 * tearDown
	 */
	public function tearDown(): void {
		parent::tearDown();
		foreach ($this->options as $option) {
			$this->optionMapper->delete($option);
		}
		foreach ($this->inquiries as $inquiry) {
			$this->inquiryMapper->delete($inquiry);
		}
	}
}
