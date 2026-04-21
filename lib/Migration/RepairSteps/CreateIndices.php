<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration\RepairSteps;

use Doctrine\DBAL\Schema\Schema;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\IndexManager;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class CreateIndices implements IRepairStep
{
    public function __construct(
        private IndexManager $indexManager,
        private IDBConnection $connection,
        private Schema $schema,
    ) {
    }

    public function getName()
    {
        return 'Agora - Create all unique and optional indices';
    }

    public function run(IOutput $output): void
    {
        $messages = [];
        $this->schema = $this->connection->createSchema();
        $this->indexManager->setSchema($this->schema);

        $messages = array_merge($messages, $this->indexManager->removeForeignKeysFromTable(Share::TABLE));
        $messages = array_merge($messages, $this->indexManager->createUniqueIndices());
        $messages = array_merge($messages, $this->indexManager->createOptionalIndices());
        
        $this->connection->migrateToSchema($this->schema);

        foreach ($messages as $message) {
            $output->info($message);
        }

        $output->info('Agora - Indices created.');
    }
}
