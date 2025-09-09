<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Agora\Tests\Integration\Command\Share;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Service\ShareService;
use OCP\IGroupManager;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;

trait TShareCommandTest {
	protected InquiryMapper|MockObject $inquiryMapper;
	protected ShareMapper|MockObject $shareMapper;
	protected ShareService|MockObject $shareService;
	protected IUserManager|MockObject $userManager;
	protected IGroupManager|MockObject $groupManager;
	protected int $lastShareId = 0;

	protected function setUpMocks(): void {
		$this->inquiryMapper = $this->createMock(InquiryMapper::class);
		$this->shareMapper = $this->createMock(ShareMapper::class);
		$this->shareService = $this->createMock(ShareService::class);
		$this->userManager = $this->createMock(IUserManager::class);
		$this->groupManager = $this->createMock(IGroupManager::class);
	}

	public function createInquiryMock(int $id): Inquiry {
		/** @var Inquiry|MockObject $inquiry */
		$inquiry = $this->createMock(
			Inquiry::class,
			['getId']
		);

		$inquiry->method('getId')
			->willReturn($id);

		return $inquiry;
	}

	public function createShareMock(int $inquiryId, string $type, string $userId): Share {
		/** @var Share|MockObject $share */
		$share = $this->createMock(
			Share::class,
			['getId', 'getInquiryId', 'getEmailAddress', 'getToken'],
			['getType', 'getUserId']
		);

		$id = ++$this->lastShareId;
		$token = $this->getShareToken($inquiryId, $type, $userId);

		$share->method('getId')
			->willReturn($id);

		$share->method('getInquiryId')
			->willReturn($inquiryId);

		$share->method('getType')
			->willReturn($type);

		$share->method('getUserId')
			->willReturn($userId);

		$share->method('getEmailAddress')
			->willReturn($userId);

		$share->method('getToken')
			->willReturn($token);

		return $share;
	}

	public function getShareToken(int $inquiryId, string $type, string $userId): string {
		return substr(md5($inquiryId . '_' . $type . '_' . $userId), 0, 16);
	}

	protected function createMock($originalClassName, array $addMethods = null, array $onlyMethods = null): MockObject {
		$mockBuilder = $this->getMockBuilder($originalClassName)
			->disableOriginalConstructor()
			->disableOriginalClone()
			->disableArgumentCloning()
			->disallowMockingUnknownTypes()
			->disableAutoReturnValueGeneration();

		if ($addMethods !== null) {
			$mockBuilder->addMethods($addMethods);
		}

		if ($onlyMethods !== null) {
			$mockBuilder->onlyMethods($onlyMethods);
		}

		return $mockBuilder->getMock();
	}
}
