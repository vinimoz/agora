<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Db;

use Doctrine\DBAL\Schema\Schema;
use OCA\Agora\Command\Command;
use OCA\Agora\Db\IndexManager;
use OCA\Agora\Db\TableManager;
use OCA\Agora\Db\Watch;
use OCA\Agora\Migration\TableSchema;
use OCP\IDBConnection;

/**
 * @psalm-api
 */
class ResetWatch extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:reset-watch';
    protected string $description = 'Resets the Watch table';
    protected array $operationHints = [
    'All agora tables will get checked against the current schema.',
    'NO data migration will be executed, so make sure you have a backup of your database.',
    ];

    public function __construct(
        private IndexManager $indexManager,
        private TableManager $tableManager,
        private IDBConnection $connection,
        private Schema $schema,
    ) {
        parent::__construct();
    }

    protected function runCommands(): int
    {
        $tableName = Watch::TABLE;
        $indexValues = TableSchema::UNIQUE_INDICES[$tableName];
        $columns = TableSchema::TABLES[$tableName];

        $messages = $this->tableManager->removeWatch();
        $this->printInfo($messages, ' - ');

        $this->schema = $this->connection->createSchema();
        $this->indexManager->setSchema($this->schema);
        $this->tableManager->setSchema($this->schema);

        $messages = $this->tableManager->createTable($tableName, $columns);
        $messages[] = $this->indexManager->createIndex($tableName, $indexValues['name'], $indexValues['columns'], $indexValues['unique']);

        $this->connection->migrateToSchema($this->schema);

        $this->printInfo($messages, ' - ');
        return 0;
    }

}
