<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use OCA\Agora\Db\IndexManager;
use OCA\Agora\Db\TableManager;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\DB\Types;

/**
 * Migration from Agora version 1.5 to 1.6
 * Applies schema changes using direct Doctrine operations
 */
class Version01060020251115120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;

    public function __construct(
        private TableManager $tableManager,
        private IndexManager $indexManager,
        private IDBConnection $connection,
    ) {
    }

    public function name(): string
    {
        return 'Migrate Agora from version 1.5 to 1.6';
    }

    public function description(): string
    {
        return 'Updates database schema and migrates data to new structure';
    }

    /**
     * Main schema migration - direct Doctrine operations
     */
    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        $this->schema = $schemaClosure();

        // Apply 1.6 schema changes
        $this->createInquiryGroupTypeTable();
        $this->createQuorumTable();
        $this->addModerationStatusToInquiries();
        $this->addAllowEditToGroups();
        $this->addProtectedToGroups();

        if (!($this->schema instanceof ISchemaWrapper)) {
            return null;
        }

        return $this->schema;
    }

    /**
     * Post-migration steps for data transformation and cleanup
     */
    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;
        $this->logInfo('Finalizing migration');

        // Data cleanup
        $messages = $this->tableManager->removeOrphaned();
        $this->logInfo($messages, 'postMigration:  ');

        $messages = $this->tableManager->migrateShareLabels();
        $this->logInfo($messages, 'postMigration:  ');

        $messages = $this->tableManager->updateHashes();
        $this->logInfo($messages, 'postMigration:  ');

        // Index operations
        $this->indexManager->createSchema();
        $messages = $this->indexManager->createForeignKeyConstraints();
        $this->logInfo($messages, 'postMigration:  ');

        $messages = $this->indexManager->createUniqueIndices();
        $this->logInfo($messages, 'postMigration:  ');

        $this->logInfo('Migration completed successfully');
    }

    private function createInquiryGroupTypeTable(): void
    {
        $tableName = 'agora_inq_group_type';
        if ($this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true]);
        $table->addColumn('family', Types::STRING, ['notnull' => true, 'default' => 'collective', 'length' => 64]);
        $table->addColumn('group_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('icon', Types::STRING, ['notnull' => false, 'default' => '']);
        $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false]);
        $table->addColumn('fields', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allowed_inquiry_types', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allowed_response', Types::TEXT, ['notnull' => false]);
        $table->addColumn('is_root', Types::BOOLEAN, ['notnull' => false]);
        $table->addColumn('ui', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('rules', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('features', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('actions', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['group_type'], 'agora_uniq_group_type');
        
        $this->logInfo("Created {$tableName}");
    }

    private function createQuorumTable(): void
    {
        $tableName = 'agora_quorums';
        if ($this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'length' => 20]);
        $table->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'length' => 20]);
        $table->addColumn('phase', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'length' => 20]);
        $table->addColumn('value', Types::FLOAT, ['notnull' => true, 'default' => 0]);
        $table->addColumn('base', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false]);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        
        $this->logInfo("Created {$tableName}");
    }

    private function addModerationStatusToInquiries(): void
    {
        $tableName = 'agora_inquiries';
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        if (!$table->hasColumn('moderation_status')) {
            $table->addColumn('moderation_status', Types::STRING, [
                'notnull' => true,
                'default' => 'draft',
                'length' => 32
            ]);
            $this->logInfo("Added moderation_status to {$tableName}");
        }
    }

    private function addAllowEditToGroups(): void
    {
        $tableName = 'agora_inq_group';
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        if (!$table->hasColumn('allow_edit')) {
            $table->addColumn('allow_edit', Types::BIGINT, [
                'notnull' => true,
                'default' => 1,
                'length' => 20
            ]);
            $this->logInfo("Added allow_edit to {$tableName}");
        }
    }

    private function addProtectedToGroups(): void
    {
        $tableName = 'agora_inq_group';
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        if (!$table->hasColumn('protected')) {
            $table->addColumn('protected', Types::BOOLEAN, [
                'notnull' => false,
                'default' => false
            ]);
            $this->logInfo("Added protected to {$tableName}");
        }
    }

    /**
     * Logs the given message to the output.
     */
    private function logInfo(string|array $message, string $prefix = ''): void
    {
        if ($this->output) {
            if (is_array($message)) {
                foreach ($message as $msg) {
                    $this->output->info($prefix . 'Agora - ' . $msg);
                }
            } else {
                $this->output->info($prefix . 'Agora - ' . $message);
            }
        }
    }
}
