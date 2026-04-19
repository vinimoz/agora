<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Db;

use OCA\Agora\Command\Command;
use OCA\Agora\Db\TableManager;
use OCP\IDBConnection;

/**
 * @psalm-api
 */
class ResetWatch extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:reset-watch';
    protected string $description = 'Resets the Watch table';
    protected array $operationHints = [
        'This command will DROP and RECREATE the watch table.',
        'All existing watch data will be lost.',
        'Make sure you have a backup of your database.',
    ];

    public function __construct(
        private TableManager $tableManager,
        private IDBConnection $connection,
    ) {
        parent::__construct();
    }

    protected function runCommands(): int
    {
        $this->tableManager->setConnection($this->connection);
        
        $this->printComment('Resetting watch table...');
        $messages = $this->tableManager->resetWatchTable();
        $this->printInfo($messages, '   ');
        
        $this->printInfo('✅ Watch table has been reset successfully.');
        
        return 0;
    }
}
