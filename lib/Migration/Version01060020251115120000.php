<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use OCA\Agora\Db\IndexManager;
use OCA\Agora\Db\TableManager;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Migration from Agora version 1.5 to 1.6
 * Uses TableManager and IndexManager to handle schema changes and data migration
 */
class Version01060020251115120000 extends SimpleMigrationStep {
	private ISchemaWrapper $schema;
	private ?IOutput $output = null;

	public function __construct(
		private TableManager $tableManager,
		private IndexManager $indexManager,
		private IDBConnection $connection,
	) {
	}

	public function name(): string {
		return 'Migrate Agora from version 1.5 to 1.6';
	}

	public function description(): string {
		return 'Updates database schema and migrates data to new structure';
	}

	/**
	 * Main schema migration using TableSchema definitions
	 */
	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$this->output = $output;
		$this->schema = $schemaClosure();
		$this->tableManager->setConnection($this->connection);
		$this->tableManager->setSchema($this->schema);

		$messages = $this->tableManager->createTables();
		$this->logInfo($messages, 'runMigration:  ');

		if (!($this->schema instanceof ISchemaWrapper)) {
			return null;
		}

		return $this->schema;
	}

	/**
	 * Post-migration steps for data transformation and cleanup
	 */
	public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void {
		$this->output = $output;
		$this->logInfo('Finalizing migration');

		// Note: Default data initialization removed - users should use the Template Wizard instead
		// to have full control over which templates to import

		$messages = $this->tableManager->removeOrphaned();
		$this->logInfo($messages, 'postMigration:  ');

		$messages = $this->tableManager->removeObsoleteTables();
		$this->logInfo($messages, 'postMigration: ');

		$messages = $this->tableManager->removeObsoleteColumns();
		$this->logInfo($messages, 'postMigration: ');

		$messages = $this->tableManager->removeObsoleteMigrations();
		$this->logInfo($messages, 'postMigration: ');
        
		$this->indexManager->createSchema();
		$messages = $this->indexManager->createForeignKeyConstraints();
		$this->logInfo($messages, 'postMigration:  ');

		$messages = $this->indexManager->createUniqueIndices();
		$this->logInfo($messages, 'postMigration:  ');
        

		$this->logInfo('Migration completed successfully');
	}

	/**
	 * Logs the given message to the output.
	 */
	private function logInfo(string|array $message, string $prefix = ''): void {
		if ($this->output) {
			if (is_array($message)) {
				foreach ($message as $msg) {
					$this->output->info($prefix . 'Agora - ' . $msg);
				}
			} else {
				$this->output->info($prefix . 'Agora - ' . $message);
			}
		}
	}
}
