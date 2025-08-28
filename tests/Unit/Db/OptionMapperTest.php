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

class OptionMapperTest extends UnitTestCase {
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

		$this->voteMapper = Server::get(VoteMapper::class);
		$this->optionMapper = Server::get(OptionMapper::class);
		$this->inquiryMapper = Server::get(InquiryMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Inquiries\Db\Inquiry')
		];

		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);

			for ($count = 0; $count < 2; $count++) {

				/** @var Option $option */
				$option = $this->fm->instance('OCA\Inquiries\Db\Option');
				$option->setInquiryId($inquiry->getId());
				$option->syncOption();
				array_push($this->options, $this->optionMapper->insert($option));

				/** @var Vote $vote */
				$vote = $this->fm->instance('OCA\Inquiries\Db\Vote');
				$vote->setInquiryId($option->getInquiryId());
				$vote->setUserId('TestUser');
				$vote->setVoteOptionText($option->getInquiryOptionText());
				array_push($this->votes, $this->voteMapper->insert($vote));
			}
		}
		unset($inquiry);
	}

	/**
	 * testFind
	 */
	public function testFind() {
		foreach ($this->options as $option) {
			$this->assertInstanceOf(Option::class, $this->optionMapper->find($option->getId()));
		}
	}

	/**
	 * testFindByInquiry
	 */
	public function testFindByInquiry() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertTrue(count($this->optionMapper->findByInquiry($inquiry->getId())) > 0);
		}
	}

	/**
	 * testUpdate
	 * includes testFind
	 */
	public function testUpdate() {
		$i = 0;
		foreach ($this->options as &$option) {
			$option->setInquiryOptionText('Changed option' . ++$i);
			$option->syncOption();
			$this->assertInstanceOf(Option::class, $this->optionMapper->update($option));
		}
	}

	/**
	 * testDelete
	 */
	public function testDelete() {
		foreach ($this->options as $option) {
			$this->assertInstanceOf(Option::class, $this->optionMapper->delete($option));
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
