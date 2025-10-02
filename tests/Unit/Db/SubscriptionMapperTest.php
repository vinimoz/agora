<?php declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Tests\Unit\Db;

use OCA\Agora\Tests\Unit\UnitTestCase;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Db\SubscriptionMapper;
use OCP\Server;

class SubscriptionMapperTest extends UnitTestCase {
	private SubscriptionMapper $subscriptionMapper;
	private InquiryMapper $inquiryMapper;
	/** @var Inquiry[] $inquiries */
	private array $inquiries = [];
	/** @var Subscription[] $subscriptions */ 
	private array $subscriptions = [];
	private array $users = [];

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		parent::setUp();
		$this->subscriptionMapper = Server::get(SubscriptionMapper::class);
		$this->inquiryMapper = Server::get(InquiryMapper::class);

		$this->inquiries = [
			$this->fm->instance('OCA\Agora\Db\Inquiry')
		];

		foreach ($this->inquiries as &$inquiry) {
			$inquiry = $this->inquiryMapper->insert($inquiry);

			for ($count=0; $count < 2; $count++) {
				$subscription = $this->fm->instance('OCA\Agora\Db\Subscription');
				$subscription->setInquiryId($inquiry->getId());
				array_push($this->subscriptions, $this->subscriptionMapper->insert($subscription));
			}
			$this->users[$inquiry->getId()] = $subscription->getUserId();
		}
		unset($inquiry);
	}

	/**
	 * testFindAllByInquiry
	 */
	public function testFindAllByInquiry() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertTrue(count($this->subscriptionMapper->findAllByInquiry($inquiry->getId())) > 0);
		}
	}

	/**
	 * testfindByInquiryAndUser
	 */
	public function testfindByInquiryAndUser() {
		foreach ($this->inquiries as $inquiry) {
			$this->assertInstanceOf(Subscription::class, $this->subscriptionMapper->findByInquiryAndUser($inquiry->getId(), $this->users[$inquiry->getId()]));
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
