<?php

declare(strict_types=1);

namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Db\IndexManager;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class RemoveIndices implements IRepairStep
{
    public function __construct(
        private IndexManager $indexManager,
        private IDBConnection $connection,
    ) {
    }

    public function getName(): string
    {
        return 'Agora - Remove foreign key constraints and unique indices';
    }

    public function run(IOutput $output): void
    {
        $schema = $this->connection->createSchema();
        $this->indexManager->setSchema($schema);

        foreach ($this->indexManager->removeAllForeignKeyConstraints() as $msg) {
            $output->info($msg);
        }

        foreach ($this->indexManager->removeAllUniqueIndices() as $msg) {
            $output->info($msg);
        }

        $this->connection->migrateToSchema($schema);
    }
}
