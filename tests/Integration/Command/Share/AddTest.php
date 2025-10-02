<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Agora\Tests\Integration\Command\Share;

use OCA\Agora\Command\Share\Add;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\Share;
use OCA\Agora\Exceptions\ShareAlreadyExistsException;
use OCA\Agora\Model\User\Email;
use OCA\Agora\Model\Group\Group;
use OCA\Agora\Model\User\User;
use OCP\AppFramework\Db\DoesNotExistException;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Exception\RuntimeException as ConsoleRuntimeException;
use Symfony\Component\Console\Tester\CommandTester;

class AddTest extends TestCase {
	use TShareCommandTest;

	public function setUp(): void {
		parent::setUp();

		$this->setUpMocks();
	}

	public function testMissingArguments(): void {
		$this->inquiryMapper
			->expects($this->never())
			->method('find');

		$this->expectException(ConsoleRuntimeException::class);
		$this->expectExceptionMessage('Not enough arguments (missing: "id").');

		$command = new Add(
			$this->inquiryMapper,
			$this->shareMapper,
			$this->shareService,
			$this->userManager,
			$this->groupManager
		);

		$tester = new CommandTester($command);
		$tester->execute([]);
	}

	public function testInquiryNotFound(): void {
		$inquiryId = 123;

		$this->inquiryMapper
			->expects($this->once())
			->method('find')
			->with($inquiryId)
			->willReturnCallback(function (int $id): Inquiry {
				throw new DoesNotExistException('');
			});

		$command = new Add(
			$this->inquiryMapper,
			$this->shareMapper,
			$this->shareService,
			$this->userManager,
			$this->groupManager
		);

		$tester = new CommandTester($command);
		$tester->execute(['id' => $inquiryId]);

		$this->assertEquals("Inquiry not found.\n", $tester->getDisplay());
	}

	/**
	 * @dataProvider validProvider
	 */
	public function testValid(array $input, array $inquiryData): void {
		$expectedShareCount = count($inquiryData['expectedShares']['user'] ?? [])
			+ count($inquiryData['expectedShares']['group'] ?? [])
			+ count($inquiryData['expectedShares']['email'] ?? []);
		$expectedInvitationCount = count($inquiryData['expectedInvitations']['user'] ?? [])
			+ count($inquiryData['expectedInvitations']['group'] ?? [])
			+ count($inquiryData['expectedInvitations']['email'] ?? []);

		$expectedShares = [];

		foreach ($inquiryData['expectedInvitations'] ?? [] as $type => $shares) {
			foreach ($shares as $userId) {
				if (!in_array($userId, $inquiryData['initialShares'][$type] ?? [])) {
					$share = $this->createShareMock($inquiryData['inquiryId'], $type, $userId);
					$mockedShares[$type][$userId] = $share;
					$expectedShares[] = $share;
				}
			}
		}

		$this->inquiryMapper
			->expects($this->once())
			->method('find')
			->with($inquiryData['inquiryId'])
			->willReturnCallback([$this, 'createInquiryMock']);

		$this->shareService
			->expects($this->exactly($expectedShareCount))
			->method('add')
			->with($inquiryData['inquiryId'], $this->logicalOr(User::TYPE, Group::TYPE, Email::TYPE), $this->anything())
			->willReturnCallback(function (int $inquiryId, string $type, string $userId = '') use ($inquiryData, $mockedShares): Share {
				$userIdConstraint = $this->logicalOr(...$inquiryData['expectedShares'][$type] ?? []);
				$userIdConstraint->evaluate($userId);

				if (in_array($userId, $inquiryData['initialShares'][$type] ?? [])) {
					throw new ShareAlreadyExistsException();
				}

				return $mockedShares[$type][$userId];
			});

		$this->shareService
			->expects($this->exactly($expectedInvitationCount))
			->method('sendInvitation')
			->with($this->logicalOr(...$expectedShares));

		$command = new Add(
			$this->inquiryMapper,
			$this->shareMapper,
			$this->shareService,
			$this->userManager,
			$this->groupManager
		);

		$tester = new CommandTester($command);
		$tester->execute($input);

		$this->assertEquals("Users successfully invited to inquiry.\n", $tester->getDisplay());
	}

	public function validProvider(): array {
		return [
			[
				[
					'id' => 1,
				],
				[
					'inquiryId' => 1,
				],
			],
			[
				[
					'id' => 123,
					'--user' => ['user1', 'user2'],
					'--group' => ['group1'],
					'--email' => ['foo@example.com', 'bar@example.com'],
				],
				[
					'inquiryId' => 123,
					'expectedShares' => [
						'user' => ['user1', 'user2'],
						'group' => ['group1'],
						'email' => ['foo@example.com', 'bar@example.com'],
					],
					'expectedInvitations' => [
						'user' => ['user1', 'user2'],
						'group' => ['group1'],
						'email' => ['foo@example.com', 'bar@example.com'],
					],
				],
			],
			[
				[
					'id' => 456,
					'--user' => ['user2', 'user3', 'user4'],
					'--email' => ['foo@example.com', 'bar@example.com'],
				],
				[
					'inquiryId' => 456,
					'initialShares' => [
						'user' => ['user1', 'user2'],
						'email' => ['foo@example.com'],
					],
					'expectedShares' => [
						'user' => ['user2', 'user3', 'user4'],
						'email' => ['foo@example.com', 'bar@example.com'],
					],
					'expectedInvitations' => [
						'user' => ['user3', 'user4'],
						'email' => ['bar@example.com'],
					],
				],
			],
		];
	}
}
