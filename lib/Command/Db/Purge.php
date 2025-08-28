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
class Purge extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:purge';
    protected string $description = 'Remove all agora related tables and records';
    protected array $operationHints = [
    'This command will remove Agora completely from your instance',
    ' - delete all oc_agora_* tables, ',
    ' - delete Agora\'s migration records from oc_migrations, ',
    ' - delete Agora\'s app config records from oc_appconfig.',
    ' ',
    'after running this command call \'occ app:remove agora \'',
    ];

    public function __construct(
        private IDBConnection $connection,
        private TableManager $tableManager,
    ) {
        parent::__construct();
    }

    protected function runCommands(): int
    {
        $this->tableManager->setConnection($this->connection);
        $messages = $this->tableManager->purgeTables();
        $this->printInfo($messages, ' - ');
        return 0;
    }
}
