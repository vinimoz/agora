<?php declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Tests\Unit\Db;

use OCA\Agora\Db\Log;
use OCA\Agora\Db\LogMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Tests\Unit\UnitTestCase;
use OCP\Server;

class LogMapperTest extends UnitTestCase {
	private LogMapper $logMapper;
	private InquiryMapper $inquiryMapper;
	/** @var Log[] $logs*/
	private array $logs = [];
	/** @var Inquiry[] $inquiries*/
	private array $inquiries = [];

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		parent::setUp();
		$this->logMapper = Server::get(LogMapper::class);
		$this->inquiryMapper = Server::get(InquiryMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Agora\Db\Inquiry')
		];

		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);

			for ($count=0; $count < 2; $count++) {
				$log = $this->fm->instance('OCA\Agora\Db\Log');
				$log->setInquiryId($inquiry->getId());
				array_push($this->logs, $this->logMapper->insert($log));
			}
		}
		unset($inquiry);
	}

	/**
	 * testFindUnprocessed
	 */
	public function testFindUnprocessed() {
		$this->assertTrue(count($this->logMapper->findUnprocessed()) > 0);
	}

	/**
	 * testUpdate
	 * includes testFind
	 */
	public function testUpdate() {
		foreach ($this->logs as &$log) {
			$log->setMessageId(Log::MSG_ID_UPDATEINQUIRY);
			$this->assertInstanceOf(Log::class, $this->logMapper->update($log));
		}
		unset($log);
	}


	/**
	 * testDelete
	 */
	public function testDelete() {
		foreach ($this->logs as $log) {
			// $before = $this->logMapper->find($log->getId());
			$this->assertInstanceOf(Log::class, $this->logMapper->delete($log));
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
