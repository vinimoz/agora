<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Migration\RepairSteps;

use Doctrine\DBAL\Schema\Schema;
use OCA\Agora\Db\IndexManager;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;
use OCA\Agora\Command\Db\InitDbDefault;

/**
 * @psalm-suppress UnusedClass
 */
class Install implements IRepairStep
{
    private InitDbDefault $initDbDefault;
    
    public function __construct(
        private IndexManager $indexManager,
        private IDBConnection $connection,
	private Schema $schema,
	InitDbDefault $initDbDefault
    ) {
	      $this->initDbDefault = $initDbDefault;
    }

    public function getName()
    {
        return 'Agora - Install';
    }

    public function run(IOutput $output): void
    {
        $messages = [];
        $this->schema = $this->connection->createSchema();
        $this->indexManager->setSchema($this->schema);

        $messages = array_merge($messages, $this->indexManager->createForeignKeyConstraints());
        $messages = array_merge($messages, $this->indexManager->createIndices());

        $this->connection->migrateToSchema($this->schema);

        foreach ($messages as $message) {
            $output->info($message);
        }

        $output->info('Agora - Foreign key contraints created.');
	$output->info('Agora - Indices created.');
	$this->initDbDefault->runCommands($output);
	$output->info('Agora - default values inserted.');
    }
}
