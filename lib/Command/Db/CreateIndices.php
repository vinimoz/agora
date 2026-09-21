<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Db;

use OCA\Agora\Command\Command;
use OCA\Agora\Db\IndexManager;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;

/**
 * @psalm-api
 */
class CreateIndices extends Command
{
    protected string $name = parent::NAME_PREFIX . 'index:create';
    protected string $description = 'Add all indices and foreign key constraints';
    protected array $operationHints = [
        'Adds indices and foreign key constraints.',
        'NO data migration will be executed, so make sure you have a backup of your database.',
    ];

    public function __construct(
        private IndexManager $indexManager,
        private IDBConnection $connection,
    ) {
	    parent::__construct();
    }

    protected function runCommands(): int
    {
	    $schema = $this->connection->createSchema();
	    $this->indexManager->setSchema($schema);

	    // Indices first so FKs referencing indexed columns can be created
	    // safely on all DB platforms (notably MySQL).
	    $this->addIndices();
	    $this->addForeignKeyConstraints();

	    $this->connection->migrateToSchema($schema);
	    return 0;
    }

    /**
     * add an on delete fk constraint to all tables referencing the main inquiries table
     */
    private function addForeignKeyConstraints(): void
    {
	    $this->printComment('Add foreign key constraints');
	    $messages = $this->indexManager->createForeignKeyConstraints();
	    $this->printInfo($messages, ' - ');
    }

    /**
     * Create index for $table
     */
    private function addIndices(): void
    {
	    $this->printComment('Add indices');
	    $messages = $this->indexManager->createAllIndices();
	    $this->printInfo($messages, ' - ');
    }
}
