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
class CleanInstance extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:clean-instance';
    protected string $description = 'Remove all Agora data to start with a clean instance';
    protected array $operationHints = [
    'This command will remove ALL Agora data from your instance.',
    '',
    'The following data will be permanently deleted:',
    ' - All inquiries, options, comments, and supports',
    ' - All shares and subscriptions',
    ' - All categories and locations',
    ' - All inquiry types, families, statuses, and option types',
    ' - All groups and attachments',
    ' - All logs, preferences, and watch records',
    '',
    '*****************************',
    '**       WARNING           **',
    '*****************************',
    'This operation cannot be undone!',
    'Make sure you have a backup of your database before proceeding.',
    '',
    'After cleaning, you can run \'occ agora:db:init-default\' to',
    'repopulate with default data.',
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

        $this->printComment('Step 1. Cleaning user-created content');
        $this->cleanUserContent();

        $this->printComment('Step 2. Cleaning configuration data');
        $this->cleanConfigurationData();

        $this->printComment('Step 3. Cleaning support tables');
        $this->cleanSupportTables();

        $this->printNewLine();
        $this->printInfo('Instance cleaned successfully.');
        $this->printInfo('Run \'occ agora:db:init-default\' to repopulate with default data.');

        return 0;
    }

    /**
     * Clean all user-created content (inquiries, options, comments, etc.)
     */
    private function cleanUserContent(): void
    {
        $this->printComment(' - Cleaning inquiries and related data');
        $messages = $this->tableManager->cleanInstanceData('user_content');
        $this->printInfo($messages, '   ');
    }

    /**
     * Clean all configuration data (categories, locations, types, etc.)
     */
    private function cleanConfigurationData(): void
    {
        $this->printComment(' - Cleaning categories, locations, types, and statuses');
        $messages = $this->tableManager->cleanInstanceData('configuration');
        $this->printInfo($messages, '   ');
    }

    /**
     * Clean all support tables (logs, preferences, watch, etc.)
     */
    private function cleanSupportTables(): void
    {
        $this->printComment(' - Cleaning logs, preferences, and session data');
        $messages = $this->tableManager->cleanInstanceData('support');
        $this->printInfo($messages, '   ');
    }
}
