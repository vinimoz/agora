<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Db\TableManager;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

/**
 * @psalm-suppress UnusedClass
 */
class UpdateInteraction implements IRepairStep
{
    public function __construct(
        private TableManager $tableManager,
        private IDBConnection $connection,
    ) {
    }

    public function getName()
    {
        return 'Agora - Validate and set last inquiry interaction';
    }

    public function run(IOutput $output): void
    {
        $this->tableManager->setConnection($this->connection);

        $messages = $this->tableManager->resetLastInteraction();
        foreach ($messages as $message) {
            $output->info($message);
        }
    }
}
