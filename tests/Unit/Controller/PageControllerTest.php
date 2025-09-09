<?php declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Tests\Unit\Controller;

use OCA\Agora\Controller\PageController;
use OCA\Agora\Tests\Unit\UnitTestCase;
use OCP\AppFramework\Http\TemplateResponse;

class PageControllerTest extends UnitTestCase {
	private PageController $controller;

	/**
	 * {@inheritDoc}
	 */
	protected function setUp(): void {
		$request = $this->getMockBuilder('OCP\IRequest')
			->disableOriginalConstructor()
			->getMock();
		$notificationService = $this->getMockBuilder('OCA\Agora\Service\NotificationService')
			->disableOriginalConstructor()
			->getMock();
		$eventDispatcher = $this->getMockBuilder('OCP\EventDispatcher\IEventDispatcher')
			->disableOriginalConstructor()
			->getMock();

		$this->controller = new PageController(
			'inquiries',
			$request,
			$notificationService,
			$eventDispatcher,
		);
	}

	/**
	 * Basic controller index route test.
	 */
	public function testIndex() {
		$result = $this->controller->index();

		$this->assertEquals('main', $result->getTemplateName());
		$this->assertInstanceOf(TemplateResponse::class, $result);
	}
}
