<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Tests\Unit\Db;

use OCA\Agora\Tests\Unit\UnitTestCase;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\OptionMapper;
use OCP\ISession;
use OCP\Server;

class OptionMapperTest extends UnitTestCase {
	private ISession $session;
	private OptionMapper $optionMapper;
	private InquiryMapper $inquiryMapper;
	/** @var Inquiry[] $inquiries */
	private array $inquiries = [];
	/** @var Option[] $options */
	private array $options = [];

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		parent::setUp();
		$this->session = Server::get(ISession::class);
		$this->session->set('ncAgoraUserId', 'TestUser');

		$this->optionMapper = Server::get(OptionMapper::class);
		$this->inquiryMapper = Server::get(InquiryMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Agora\Db\Inquiry')
		];

		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);

			for ($count = 0; $count < 2; $count++) {

				/** @var Option $option */
				$option = $this->fm->instance('OCA\Agora\Db\Option');
				$option->setInquiryId($inquiry->getId());
				$option->syncOption();
				array_push($this->options, $this->optionMapper->insert($option));

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
