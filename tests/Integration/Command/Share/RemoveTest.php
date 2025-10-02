<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Agora\Tests\Integration\Command\Share;

use OCA\Agora\Command\Share\Remove;
use OCA\Agora\Db\Inquiry;
use OCP\AppFramework\Db\DoesNotExistException;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Exception\RuntimeException as ConsoleRuntimeException;
use Symfony\Component\Console\Tester\CommandTester;

class RemoveTest extends TestCase {
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

		$command = new Remove(
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
			->willReturnCallback(static function (int $id): Inquiry {
				throw new DoesNotExistException('');
			});

		$command = new Remove(
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
		$initialShares = [];
		$expectedShares = [];
		$expectedShareCount = 0;

		foreach ($inquiryData['initialShares'] ?? [] as $type => $shares) {
			foreach ($shares as $userId) {
				$share = $this->createShareMock($inquiryData['inquiryId'], $type, $userId);
				$initialShares[] = $share;

				if (in_array($userId, $inquiryData['expectedShares'][$type] ?? [])) {
					$expectedShares[] = $share;
					$expectedShareCount++;
				}
			}
		}

		$this->inquiryMapper
			->expects($this->once())
			->method('find')
			->with($inquiryData['inquiryId'])
			->willReturnCallback([$this, 'createInquiryMock']);

		$this->shareMapper
			->method('findByInquiry')
			->with($inquiryData['inquiryId'])
			->willReturn($initialShares);

		$this->shareService
			->expects($this->exactly($expectedShareCount))
			->method('delete')
			->with($this->logicalOr(...$expectedShares));

		$command = new Remove(
			$this->inquiryMapper,
			$this->shareMapper,
			$this->shareService,
			$this->userManager,
			$this->groupManager
		);

		$tester = new CommandTester($command);
		$tester->execute($input);

		$this->assertEquals("Inquiry invitations successfully revoked.\n", $tester->getDisplay());
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
					'--email' => ['foo@example.com'],
				],
				[
					'inquiryId' => 123,
					'initialShares' => [
						'user' => ['user1', 'user2', 'user3'],
						'group' => ['group1'],
						'email' => ['foo@example.com', 'bar@example.com'],
					],
					'expectedShares' => [
						'user' => ['user1', 'user2'],
						'group' => ['group1'],
						'email' => ['foo@example.com'],
					],
				],
			],
			[
				[
					'id' => 456,
					'--user' => ['user1', 'user2', 'user3', 'user4'],
					'--email' => ['foo@example.com', 'bar@example.com'],
				],
				[
					'inquiryId' => 456,
					'initialShares' => [
						'user' => ['user2', 'user3'],
						'email' => ['foo@example.com', 'baz@example.com'],
						'contact' => ['bar@example.com'],
					],
					'expectedShares' => [
						'user' => ['user2', 'user3'],
						'email' => ['foo@example.com'],
						'contact' => ['bar@example.com'],
					],
				]
			],
			[
				[
					'id' => 789,
					'--group' => ['group1'],
					'--email' => ['foo@example.com', 'baz@example.com'],
				],
				[
					'inquiryId' => 789,
					'initialShares' => [
						'user' => ['user1', 'user2'],
						'email' => ['foo@example.com'],
						'contact' => ['bar@example.com'],
						'external' => ['baz@example.com'],
					],
					'expectedShares' => [
						'email' => ['foo@example.com'],
						'external' => ['baz@example.com'],
					],
				]
			],
		];
	}
}
