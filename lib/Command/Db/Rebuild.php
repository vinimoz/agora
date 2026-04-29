/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

<?php

declare(strict_types=1);

namespace OCA\Agora\Command\Db;

use OCA\Agora\Command\Command;
use OCA\Agora\Db\IndexManager;
use OCA\Agora\Db\TableManager;
use OCA\Agora\Migration\Version20250715120000;
use OCP\IDBConnection;
use OCP\Migration\IOutput;

class Rebuild extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:rebuild';
    protected string $description = 'Rebuilds Agora\'s table structure from the base migration';
    protected array $operationHints = [
        'WARNING: This drops and recreates all Agora tables!',
        'Make sure you have a backup of your database before proceeding.',
    ];

    public function __construct(
        private TableManager $tableManager,
        private IndexManager $indexManager,
        private IDBConnection $connection,
    ) {
        parent::__construct();
    }

    protected function runCommands(): int
    {
        $this->printComment('Step 1. Removing foreign key constraints...');
        $this->removeForeignKeyConstraints();

        $this->printComment('Step 2. Purging all Agora tables...');
        $messages = $this->tableManager->purgeTables();
        $this->printInfo($messages, '   ');

        $this->printComment('Step 3. Recreating tables from base migration...');
        $this->recreateTablesFromBaseMigration();

        $this->printComment('Step 4. Recreating indices and constraints...');
        $this->recreateIndicesAndConstraints();

        $this->printInfo('✅ Database schema rebuilt successfully.');
        $this->printInfo('Run \'occ agora:db:init-default\' to restore default configuration.');

        return 0;
    }

    private function removeForeignKeyConstraints(): void
    {
        $schema = $this->connection->createSchema();
        $this->indexManager->setSchema($schema);
        $this->indexManager->removeAllForeignKeyConstraints();
        $this->connection->migrateToSchema($schema);
    }

    private function recreateTablesFromBaseMigration(): void
    {
        $output = new class implements IOutput {
            public function debug($message) {}
            public function info($message) {}
            public function warning($message) {}
            public function startProgress($max = 0) {}
            public function advance($step = 1, $description = '') {}
            public function finishProgress() {}
        };

        $migration = new Version20250715120000();
        $schema = $this->connection->createSchema();
        
        $schemaClosure = function() use ($schema) {
            return $schema;
        };
        
        $migration->changeSchema($output, $schemaClosure, []);
        $this->connection->migrateToSchema($schema);
        
        $this->printInfo('   Base migration applied successfully');
    }

    private function recreateIndicesAndConstraints(): void
    {
        $schema = $this->connection->createSchema();
        $this->indexManager->setSchema($schema);
        $this->indexManager->createIndices();
        $this->indexManager->createForeignKeyConstraints();
        $this->indexManager->createUniqueIndices();
        $this->connection->migrateToSchema($schema);
    }
}
