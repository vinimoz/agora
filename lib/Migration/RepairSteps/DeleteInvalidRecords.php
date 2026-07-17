<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Db\TableManager;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

/**
 * Repair step for cleaning up orphaned data records
 * This is the PROPER use of repair steps - data cleanup, not schema changes
 */
class DeleteInvalidRecords implements IRepairStep
{
    public function __construct(
        private TableManager $tableManager,
        private IDBConnection $connection,
    ) {
    }

    public function getName(): string
    {
        return 'Agora - Delete duplicates and orphaned records';
    }

    public function run(IOutput $output): void
    {
        $this->tableManager->setConnection($this->connection);
        
        // Data cleanup - perfectly appropriate for a repair step
        $messages = $this->tableManager->removeOrphaned();
        foreach ($messages as $message) {
            $output->info($message);
        }
    }
}
