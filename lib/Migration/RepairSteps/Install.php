<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Command\Db\InitDbDefault;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class Install implements IRepairStep
{
    public function __construct(
        private IDBConnection $connection,
        private InitDbDefault $initDbDefault,
    ) {
    }

    public function getName(): string
    {
        return 'Agora - Ensure default configuration exists';
    }

    public function run(IOutput $output): void
    {
        // No schema manipulation here — the migration chain owns the schema.
        // This step only ensures default rows exist in lookup tables.
        $output->info('Agora - Initializing default configuration...');
        $this->initDbDefault->runCommands($output);
        $output->info('Agora - Default configuration ready.');
    }
}
