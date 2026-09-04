<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Db\IndexManager;
use OCA\Agora\Db\Share;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class CreateIndices implements IRepairStep
{
    public function __construct(
        private IndexManager $indexManager,
        private IDBConnection $connection,
    ) {
    }

    public function getName(): string
    {
        return 'Agora - Create all unique and optional indices';
    }

    public function run(IOutput $output): void
    {
        $messages = [];
        
        // Create schema using the connection (returns ISchemaWrapper in NC35)
        $schema = $this->connection->createSchema();
        
        // Set the schema on the index manager
        $this->indexManager->setSchema($schema);

        // Remove foreign keys from the share table
        $messages = array_merge($messages, $this->indexManager->removeForeignKeysFromTable(Share::TABLE));
        
        // Create indices
        $messages = array_merge($messages, $this->indexManager->createUniqueIndices());
        $messages = array_merge($messages, $this->indexManager->createOptionalIndices());
        
        // Migrate the schema to the database
        $this->connection->migrateToSchema($schema);

        foreach ($messages as $message) {
            if ($message !== '') {
                $output->info($message);
            }
        }

        $output->info('Agora - Indices created.');
    }
}
