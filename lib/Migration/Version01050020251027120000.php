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
 * Migration from Agora version 1.1 to 1.5
 * Applies schema changes using direct Doctrine operations
 */
class Version01050020251027120000 extends SimpleMigrationStep
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
        return 'Migrate Agora from version 1.1 to 1.5';
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

        // CRITICAL: First ensure the base inquiries table exists in the schema
        $this->ensureInquiriesTableExists();
        
        // Apply 1.5 schema changes
        $this->addSupportFeatureToInquiries();
        $this->addFamilyToInquiries();
        $this->createInquiryStatusTable();
        $this->createInquiryFamiliesTable();
        $this->createOptionFamiliesTable();
        $this->ensureInquiryTypeTableExists();
        $this->ensureOptionTypeTableExists();

        if (!($this->schema instanceof ISchemaWrapper)) {
            return null;
        }

        return $this->schema;
    }

    /**
     * Ensure the base inquiries table exists in the schema
     */
    private function ensureInquiriesTableExists(): void
    {
        $tableName = 'agora_inquiries';
        
        // Use schema->hasTable() NOT connection->tableExists()
        if ($this->schema->hasTable($tableName)) {
            $this->logInfo("Table {$tableName} already exists in schema");
            return;
        }

        $this->logInfo("Creating base table {$tableName}");
        
        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => 'petition', 'length' => 64]);
        $table->addColumn('title', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 128]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('owner', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 256]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('expire', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('deleted', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('publication_status', Types::STRING, ['notnull' => true, 'default' => 'private', 'length' => 50]);
        $table->addColumn('inquiry_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->setPrimaryKey(['id']);
        
        $this->logInfo("Created base table {$tableName}");
    }

    private function ensureInquiryTypeTableExists(): void
    {
        $tableName = 'agora_inq_type';
        
        if ($this->schema->hasTable($tableName)) {
            // Update existing table
            $table = $this->schema->getTable($tableName);
            
            if (!$table->hasColumn('family')) {
                $table->addColumn('family', Types::STRING, [
                    'notnull' => true,
                    'default' => 'deliberative',
                    'length' => 64
                ]);
                $this->logInfo("Added family to {$tableName}");
            }
            
            if (!$table->hasColumn('support_feature')) {
                $table->addColumn('support_feature', Types::STRING, [
                    'notnull' => true,
                    'default' => 'none',
                    'length' => 20
                ]);
                $this->logInfo("Added support_feature to {$tableName}");
            }
            
            if (!$table->hasColumn('allowed_option_type')) {
                $table->addColumn('allowed_option_type', Types::TEXT, [
                    'notnull' => false
                ]);
                $this->logInfo("Added allowed_option_type to {$tableName}");
            }
            return;
        }

        // Create new table
        $this->logInfo("Creating table {$tableName}");
        
        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
        $table->addColumn('inquiry_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('family', Types::STRING, ['notnull' => true, 'default' => 'deliberative', 'length' => 64]);
        $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
        $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false]);
        $table->addColumn('fields', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allowed_response', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allowed_transformation', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allowed_option_type', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
        $table->addColumn('support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
        $table->addColumn('is_root', Types::BOOLEAN, ['notnull' => false, 'default' => true]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_type'], 'agora_uniq_inquiry_type');
        
        $this->logInfo("Created {$tableName}");
    }

    private function ensureOptionTypeTableExists(): void
    {
        $tableName = 'agora_inq_option_type';
        
        if ($this->schema->hasTable($tableName)) {
            // Update existing table
            $table = $this->schema->getTable($tableName);
            
            if (!$table->hasColumn('family')) {
                $table->addColumn('family', Types::STRING, [
                    'notnull' => true,
                    'default' => 'debate',
                    'length' => 64
                ]);
                $this->logInfo("Added family to {$tableName}");
            }
            
            if (!$table->hasColumn('support_feature')) {
                $table->addColumn('support_feature', Types::STRING, [
                    'notnull' => true,
                    'default' => 'none',
                    'length' => 20
                ]);
                $this->logInfo("Added support_feature to {$tableName}");
            }
            return;
        }

        // Create new table
        $this->logInfo("Creating table {$tableName}");
        
        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true]);
        $table->addColumn('family', Types::STRING, ['notnull' => true, 'default' => 'debate', 'length' => 64]);
        $table->addColumn('option_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('icon', Types::STRING, ['notnull' => false, 'default' => '']);
        $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false]);
        $table->addColumn('fields', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allowed_response', Types::TEXT, ['notnull' => false]);
        $table->addColumn('allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
        $table->addColumn('support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
        $table->addColumn('statuses', Types::TEXT, ['notnull' => false]);
        $table->addColumn('use_title', Types::BIGINT, ['notnull' => true, 'default' => 1, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['option_type'], 'agora_uniq_option_type');
        
        $this->logInfo("Created {$tableName}");
    }

    private function addSupportFeatureToInquiries(): void
    {
        $tableName = 'agora_inquiries';
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        if (!$table->hasColumn('support_feature')) {
            $table->addColumn('support_feature', Types::STRING, [
                'notnull' => true,
                'default' => 'none',
                'length' => 20
            ]);
            $this->logInfo("Added support_feature to {$tableName}");
        }
    }

    private function addFamilyToInquiries(): void
    {
        $tableName = 'agora_inquiries';
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        if (!$table->hasColumn('family')) {
            $table->addColumn('family', Types::STRING, [
                'notnull' => false,
                'default' => 'deliberative',
                'length' => 64
            ]);
            $this->logInfo("Added family to {$tableName}");
        }
    }

    private function createInquiryStatusTable(): void
    {
        $tableName = 'agora_inq_status';
        if ($this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
        $table->addColumn('inquiry_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('status_key', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('description', Types::TEXT, ['notnull' => true, 'default' => '']);
        $table->addColumn('is_final', Types::BOOLEAN, ['notnull' => false, 'default' => false]);
        $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_type', 'status_key'], 'agora_uniq_inquiry_status');
        
        $this->logInfo("Created {$tableName}");
    }

    private function createInquiryFamiliesTable(): void
    {
        $tableName = 'agora_inq_families';
        if ($this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
        $table->addColumn('family_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('description', Types::TEXT, ['notnull' => true, 'default' => '']);
        $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
        $table->addColumn('ui', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('rules', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('features', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('actions', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['family_type'], 'agora_uniq_family_inquiry_type');
        
        $this->logInfo("Created {$tableName}");
    }

    private function createOptionFamiliesTable(): void
    {
        $tableName = 'agora_opt_families';
        if ($this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
        $table->addColumn('family_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('description', Types::TEXT, ['notnull' => true, 'default' => '']);
        $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
        $table->addColumn('ui', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('rules', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('features', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('actions', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['family_type'], 'agora_uniq_family_option_type');
        
        $this->logInfo("Created {$tableName}");
    }

    /**
     * Post-migration steps for data transformation and cleanup
     * This runs AFTER the schema has been applied to the database
     */
    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;
        $this->logInfo('Finalizing migration');

        // NOW it's safe to use connection->tableExists() because the schema has been applied!
        if ($this->connection->tableExists('agora_inquiries')) {
            $this->tableManager->setConnection($this->connection);
            
            $messages = $this->tableManager->removeOrphaned();
            $this->logInfo($messages, 'postMigration:  ');

            $messages = $this->tableManager->transferModStatusToInqStatus();
            $this->logInfo($messages, 'postMigration:  ');

            $messages = $this->tableManager->migratePublicToOpen();
            $this->logInfo($messages, 'postMigration:  ');

            $messages = $this->tableManager->fixNullishShares();
            $this->logInfo($messages, 'postMigration:  ');

            $messages = $this->tableManager->fixNullishPollGroupRelations();
            $this->logInfo($messages, 'postMigration:  ');
        } else {
            $this->logInfo('Inquiries table does not exist - skipping data cleanup');
        }

        // Index operations
        $this->indexManager->createSchema();
        $messages = $this->indexManager->createForeignKeyConstraints();
        $this->logInfo($messages, 'postMigration:  ');

        $messages = $this->indexManager->createUniqueIndices();
        $this->logInfo($messages, 'postMigration:  ');

        $this->logInfo('Migration completed successfully');
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
