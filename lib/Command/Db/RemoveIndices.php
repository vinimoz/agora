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
class RemoveIndices extends Command
{
    protected string $name = parent::NAME_PREFIX . 'index:remove';
    protected string $description = 'Remove all indices and foreign key constraints';
    protected array $operationHints = [
        'Removes all indices and foreign key constraints.',
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
        // Create schema using the connection
        $schema = $this->connection->createSchema();
        
        // Set the schema on the index manager
        $this->indexManager->setSchema($schema);
        
        // Remove constraints and indices
        $this->deleteForeignKeyConstraints();
        $this->deleteGenericIndices();
        $this->deleteUniqueIndices();
        $this->deleteNamedIndices();
        
        // Migrate the schema to the database
        $this->connection->migrateToSchema($schema);
        
        return 0;
    }

    /**
     * remove on delete fk constraint from all tables referencing the main agora table
     */
    private function deleteForeignKeyConstraints(): void
    {
        $this->printComment('Remove foreign key constraints and generic indices');
        $messages = $this->indexManager->removeAllForeignKeyConstraints();
        $this->printInfo($messages, ' - ');
    }

    /**
     * remove all generic indices
     */
    private function deleteGenericIndices(): void
    {
        $this->printComment('Remove generic indices');
        $messages = $this->indexManager->removeAllGenericIndices();
        $this->printInfo($messages, ' - ');
    }

    /**
     * remove all unique indices
     */
    private function deleteUniqueIndices(): void
    {
        $this->printComment('Remove unique indices');
        $messages = $this->indexManager->removeAllUniqueIndices();
        $this->printInfo($messages, ' - ');
    }

    /**
     * remove all named indices
     */
    private function deleteNamedIndices(): void
    {
        $this->printComment('Remove common indices');
        $messages = $this->indexManager->removeNamedIndices();
        $this->printInfo($messages, ' - ');
    }
}
