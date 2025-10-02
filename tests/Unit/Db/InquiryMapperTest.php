<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Tests\Unit\Db;

use League\FactoryMuffin\Faker\Facade as Faker;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Tests\Unit\UnitTestCase;
use OCP\Server;

class InquiryMapperTest extends UnitTestCase {
	private InquiryMapper $inquiryMapper;
	/** @var Inquiry[] $inquiries*/
	private array $inquiries = [];

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		parent::setUp();
		$this->inquiryMapper = Server::get(InquiryMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Agora\Db\Inquiry'),
			$this->fm->instance('OCA\Agora\Db\Inquiry'),
			$this->fm->instance('OCA\Agora\Db\Inquiry')
		];
		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);
		}
		unset($inquiry);
	}

	/**
	 * testUpdate
	 */
	public function testUpdate() {
		foreach ($this->inquiries as &$inquiry) {
			$newTitle = Faker::sentence(10);
			$newDescription = Faker::paragraph();
			$inquiry->setTitle($newTitle());
			$inquiry->setDescription($newDescription());

			$this->assertInstanceOf(Inquiry::class, $this->inquiryMapper->update($inquiry));
		}
		unset($inquiry);
	}

	/**
	 * Delete the previously created entry from the database.
	 */
	public function testFind() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertInstanceOf(Inquiry::class, $this->inquiryMapper->find($inquiry->getId()));
		}
	}

	/**
	 * Delete the previously created entry from the database.
	 */
	public function testDelete() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertInstanceOf(Inquiry::class, $this->inquiryMapper->delete($inquiry));
		}
	}

	/**
	 * tearDown
	 */
	public function tearDown(): void {
		parent::tearDown();
		// no tidy neccesary, inquiries got deleted via testDelete()
	}
}
