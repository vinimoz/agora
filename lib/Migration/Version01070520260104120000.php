<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\MySQLPlatform;
use Doctrine\DBAL\Platforms\PostgreSQLPlatform;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\SupportEngine;
use OCA\Agora\Db\SupportProcess;
use OCA\Agora\Db\SupportResult;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\DB\Types;

/**
 * Migration from Agora version 1.7.1 to 1.7.5
 * 
 * Changes:
 * 1. Modify supports table: value → JSON, add weight, add support_engine_id
 * 2. Create support_engines table
 * 3. Create support_processes table  
 * 4. Create support_results table
 * 5. Add performance indices on all new/modified tables
 */
class Version01070520260104120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;
    private bool $isMySQL = false;
    private bool $isPostgreSQL = false;
    private ?IDBConnection $connection = null;

    public function __construct(
        private ?IDBConnection $dbConnection = null
    ) {
        $this->connection = $dbConnection;
    }

    /**
     * @param IOutput $output
     * @param \Closure $schemaClosure
     * @param array $options
     * @return null|ISchemaWrapper
     */
    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        $this->schema = $schemaClosure();
        
        // Detect database platform
        $platform = $this->schema->getDatabasePlatform();
        $this->isMySQL = $platform instanceof MySQLPlatform;
        $this->isPostgreSQL = $platform instanceof PostgreSQLPlatform;

        $this->logInfo('Starting Agora 1.7.5 migration - Support System Enhancement');
        $this->logInfo('Database platform: ' . ($this->isMySQL ? 'MySQL' : ($this->isPostgreSQL ? 'PostgreSQL' : 'SQLite')));

        // 1. Modify existing supports table (value → JSON, add weight, add support_engine_id)
        $this->migrateSupportsTable();

        // 2. Create new support system tables
        $this->createSupportEnginesTable();
        $this->createSupportProcessesTable();
        $this->createSupportResultsTable();

        // 3. Create all performance indices
        $this->createSupportsIndices();
        $this->createSupportEnginesIndices();
        $this->createSupportProcessesIndices();
        $this->createSupportResultsIndices();

        // 4. Create foreign key constraints (if supported)
        $this->createForeignKeyConstraints();

        $this->logInfo('Agora 1.7.5 schema migration completed');

        return $this->schema;
    }

    /**
     * Post-migration steps for data transformation
     */
    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;
        $this->logInfo('Finalizing 1.7.5 migration');

        // Migrate existing supports data from INTEGER to JSON
        if ($this->connection) {
            $this->migrateExistingSupportsData();
        } else {
            $this->logInfo('No database connection available - skipping data migration');
        }

        $this->logInfo('1.7.5 post-migration completed');
    }

    /**
     * Modify the supports table
     */
    private function migrateSupportsTable(): void
    {
        $tableNames = [Support::TABLE, 'agora_support', 'oc_agora_support', 'oc_agora_supports'];
        
        foreach ($tableNames as $currentTableName) {
            if (!$this->schema->hasTable($currentTableName)) {
                continue;
            }

            $table = $this->schema->getTable($currentTableName);
            $this->logInfo("Migrating supports table: {$currentTableName}");

            // 1. Change value from SMALLINT to JSON
            if ($table->hasColumn('value')) {
                $column = $table->getColumn('value');
                $currentType = $column->getType()->getName();
                
                if ($currentType !== Types::JSON) {
                    $table->dropColumn('value');
                    $table->addColumn('value', Types::JSON, 
                        $this->getJsonOptions(['notnull' => true, 'default' => '0'])
                    );
                    $this->logInfo("  Changed 'value' column: {$currentType} → JSON");
                }
            }

            // 2. Add weight column
            if (!$table->hasColumn('weight')) {
                $table->addColumn('weight', Types::INTEGER, [
                    'notnull' => true,
                    'default' => 1,
                    'unsigned' => false
                ]);
                $this->logInfo("  Added 'weight' column (INTEGER, default 1)");
            }

            // 3. Add support_engine_id column (nullable FK to support_engines)
            if (!$table->hasColumn('support_engine_id')) {
                $table->addColumn('support_engine_id', Types::BIGINT, [
                    'notnull' => false,
                    'default' => null,
                    'unsigned' => true,
                    'length' => 20
                ]);
                $this->logInfo("  Added 'support_engine_id' column (nullable FK)");
            }

            // 4. Add updated column for tracking modifications
            if (!$table->hasColumn('updated')) {
                $table->addColumn('updated', Types::BIGINT, [
                    'notnull' => true,
                    'default' => 0,
                    'unsigned' => true,
                    'length' => 20
                ]);
                $this->logInfo("  Added 'updated' column");
            }

            break;
        }
    }

    /**
     * Create the support_engines table
     */
    private function createSupportEnginesTable(): void
    {
        $tableName = SupportEngine::TABLE;
        
        if ($this->schema->hasTable($tableName)) {
            $this->logInfo("Table '{$tableName}' already exists - ensuring columns");
            $this->ensureSupportEnginesColumns($tableName);
            return;
        }

        $this->logInfo("Creating table '{$tableName}'");
        $table = $this->schema->createTable($tableName);
        
        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('engine', Types::STRING, [
            'notnull' => true, 'default' => '', 'length' => 64
        ]);
        $table->addColumn('type', Types::STRING, [
            'notnull' => true, 'default' => '', 'length' => 64
        ]);
        $table->addColumn('group_id', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('status', Types::STRING, [
            'notnull' => true, 'default' => 'draft', 'length' => 32
        ]);
        $table->addColumn('config', Types::JSON, 
            $this->getJsonOptions(['notnull' => true, 'default' => '{}'])
        );
        $table->addColumn('created', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, [
            'notnull' => true, 'default' => 'inquiry', 'length' => 32
        ]);
        $table->addColumn('target_ids', Types::JSON, 
            $this->getJsonOptions(['notnull' => true, 'default' => '[]'])
        );
        $table->addColumn('metadata', Types::JSON, 
            $this->getJsonOptions(['notnull' => false, 'default' => null])
        );
        
        $table->setPrimaryKey(['id']);

        // Add unique constraint: one engine type per group/status combination
        if ($this->isMySQL) {
            // MySQL can't have unique on JSON columns, skip target_ids
        } else {
            // PostgreSQL can handle expression indices if needed
        }
        
        $this->logInfo("Created table '{$tableName}'");
    }

    /**
     * Create the support_processes table
     */
    private function createSupportProcessesTable(): void
    {
        $tableName = SupportProcess::TABLE;
        
        if ($this->schema->hasTable($tableName)) {
            $this->logInfo("Table '{$tableName}' already exists - ensuring columns");
            $this->ensureSupportProcessesColumns($tableName);
            return;
        }

        $this->logInfo("Creating table '{$tableName}'");
        $table = $this->schema->createTable($tableName);
        
        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('support_engine_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, [
            'notnull' => true, 'default' => 'inquiry', 'length' => 32
        ]);
        $table->addColumn('target_id', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('phase', Types::STRING, [
            'notnull' => true, 'default' => 'deliberative', 'length' => 64
        ]);
        $table->addColumn('status', Types::STRING, [
            'notnull' => true, 'default' => 'pending', 'length' => 32
        ]);
        $table->addColumn('started_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('ended_at', Types::BIGINT, [
            'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('metadata', Types::JSON, 
            $this->getJsonOptions(['notnull' => false, 'default' => null])
        );
        
        $table->setPrimaryKey(['id']);
        
        $this->logInfo("Created table '{$tableName}'");
    }

    /**
     * Create the support_results table
     */
    private function createSupportResultsTable(): void
    {
        $tableName = SupportResult::TABLE;
        
        if ($this->schema->hasTable($tableName)) {
            $this->logInfo("Table '{$tableName}' already exists - ensuring columns");
            $this->ensureSupportResultsColumns($tableName);
            return;
        }

        $this->logInfo("Creating table '{$tableName}'");
        $table = $this->schema->createTable($tableName);
        
        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('support_process_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, [
            'notnull' => true, 'default' => 'inquiry', 'length' => 32
        ]);
        $table->addColumn('target_id', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('option_id', Types::BIGINT, [
            'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('result', Types::JSON, 
            $this->getJsonOptions(['notnull' => true, 'default' => '{}'])
        );
        $table->addColumn('updated', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        
        $table->setPrimaryKey(['id']);
        
        $this->logInfo("Created table '{$tableName}'");
    }

    // ============================================================================
    // INDEX CREATION - Performance Optimization
    // ============================================================================

    /**
     * Create performance indices on supports table
     * 
     * Query patterns to optimize:
     * - Get all supports for an inquiry: WHERE inquiry_id = ? AND option_id = 0
     * - Get all supports for an option: WHERE inquiry_id = ? AND option_id = ?
     * - Get user's support: WHERE inquiry_id = ? AND user_id = ? AND option_id = ?
     * - Count supports by engine: WHERE support_engine_id = ?
     * - Weighted calculations: WHERE inquiry_id = ? ORDER BY weight
     * - Recent activity: WHERE inquiry_id = ? ORDER BY created DESC
     * - Composite queries: WHERE inquiry_id = ? AND option_id = ? AND support_engine_id = ?
     */
    private function createSupportsIndices(): void
    {
        $tableNames = [Support::TABLE, 'agora_support', 'oc_agora_support', 'oc_agora_supports'];
        
        foreach ($tableNames as $tableName) {
            if (!$this->schema->hasTable($tableName)) {
                continue;
            }

            $table = $this->schema->getTable($tableName);
            $this->logInfo("Creating indices on '{$tableName}'");

            // PRIMARY INDEXES
            // Unique constraint: one support per user per inquiry/option per engine
            if (!$table->hasIndex('agora_uniq_supports')) {
                try {
                    $table->addUniqueIndex(
                        ['inquiry_id', 'option_id', 'user_id', 'support_engine_id'], 
                        'agora_uniq_supports'
                    );
                } catch (\Exception $e) {
                    // Index might exist in different form, try without engine_id
                    if (!$table->hasIndex('agora_uniq_supports_v2')) {
                        $table->addUniqueIndex(
                            ['inquiry_id', 'option_id', 'user_id'], 
                            'agora_uniq_supports_v2'
                        );
                    }
                }
            }

            // PERFORMANCE INDICES - Ordered by query frequency

            // 1. Primary lookup: by inquiry + option (most common query)
            if (!$table->hasIndex('supports_inq_opt_idx')) {
                $table->addIndex(['inquiry_id', 'option_id'], 'supports_inq_opt_idx');
                $this->logInfo("  + supports_inq_opt_idx (inquiry_id, option_id)");
            }

            // 2. User lookup: by inquiry + user (check if user supported)
            if (!$table->hasIndex('supports_inq_user_idx')) {
                $table->addIndex(['inquiry_id', 'user_id'], 'supports_inq_user_idx');
                $this->logInfo("  + supports_inq_user_idx (inquiry_id, user_id)");
            }

            // 3. Option-specific: by option + user
            if (!$table->hasIndex('supports_opt_user_idx')) {
                $table->addIndex(['option_id', 'user_id'], 'supports_opt_user_idx');
                $this->logInfo("  + supports_opt_user_idx (option_id, user_id)");
            }

            // 4. Engine grouping: for calculating results per engine
            if (!$table->hasIndex('supports_engine_idx')) {
                $table->addIndex(['support_engine_id'], 'supports_engine_idx');
                $this->logInfo("  + supports_engine_idx (support_engine_id)");
            }

            // 5. Composite: engine + option for result calculations
            if (!$table->hasIndex('supports_engine_opt_idx')) {
                $table->addIndex(['support_engine_id', 'option_id'], 'supports_engine_opt_idx');
                $this->logInfo("  + supports_engine_opt_idx (support_engine_id, option_id)");
            }

            // 6. Weight-based: for weighted calculations
            if (!$table->hasIndex('supports_weight_idx')) {
                $table->addIndex(['weight'], 'supports_weight_idx');
                $this->logInfo("  + supports_weight_idx (weight)");
            }

            // 7. Time-based: for recent activity
            if (!$table->hasIndex('supports_created_idx')) {
                $table->addIndex(['created'], 'supports_created_idx');
                $this->logInfo("  + supports_created_idx (created)");
            }

            // 8. Composite time: inquiry + created for sorted views
            if (!$table->hasIndex('supports_inq_created_idx')) {
                $table->addIndex(['inquiry_id', 'created'], 'supports_inq_created_idx');
                $this->logInfo("  + supports_inq_created_idx (inquiry_id, created)");
            }

            // 9. Updated time: for sync checks
            if ($table->hasColumn('updated') && !$table->hasIndex('supports_updated_idx')) {
                $table->addIndex(['updated'], 'supports_updated_idx');
                $this->logInfo("  + supports_updated_idx (updated)");
            }

            // 10. Hash lookup: for deduplication
            if ($table->hasColumn('support_hash') && !$table->hasIndex('supports_hash_idx')) {
                $table->addIndex(['support_hash'], 'supports_hash_idx');
                $this->logInfo("  + supports_hash_idx (support_hash)");
            }
        }
    }

    /**
     * Create performance indices on support_engines table
     * 
     * Query patterns:
     * - Get engines for a group: WHERE group_id = ?
     * - Get active engines: WHERE status = 'active'
     * - Get engines by type: WHERE engine = ?
     * - Get engines for target: WHERE target_type = ? AND target_ids CONTAINS ?
     * - Get engines by group + status: WHERE group_id = ? AND status = ?
     * - Ordered by creation: ORDER BY created DESC
     */
    private function createSupportEnginesIndices(): void
    {
        $tableName = SupportEngine::TABLE;
        
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        $this->logInfo("Creating indices on '{$tableName}'");

        // 1. Group lookup: primary access pattern
        if (!$table->hasIndex('engine_group_idx')) {
            $table->addIndex(['group_id'], 'engine_group_idx');
            $this->logInfo("  + engine_group_idx (group_id)");
        }

        // 2. Group + status: get active engines for a group
        if (!$table->hasIndex('engine_group_status_idx')) {
            $table->addIndex(['group_id', 'status'], 'engine_group_status_idx');
            $this->logInfo("  + engine_group_status_idx (group_id, status)");
        }

        // 3. Engine type: filter by voting engine type
        if (!$table->hasIndex('engine_type_idx')) {
            $table->addIndex(['engine'], 'engine_type_idx');
            $this->logInfo("  + engine_type_idx (engine)");
        }

        // 4. Status: get all active/closed engines
        if (!$table->hasIndex('engine_status_idx')) {
            $table->addIndex(['status'], 'engine_status_idx');
            $this->logInfo("  + engine_status_idx (status)");
        }

        // 5. Target type: filter by target_type
        if (!$table->hasIndex('engine_target_type_idx')) {
            $table->addIndex(['target_type'], 'engine_target_type_idx');
            $this->logInfo("  + engine_target_type_idx (target_type)");
        }

        // 6. Creation time: for recent engines
        if (!$table->hasIndex('engine_created_idx')) {
            $table->addIndex(['created'], 'engine_created_idx');
            $this->logInfo("  + engine_created_idx (created)");
        }

        // 7. Composite: group + engine type
        if (!$table->hasIndex('engine_group_type_idx')) {
            $table->addIndex(['group_id', 'engine'], 'engine_group_type_idx');
            $this->logInfo("  + engine_group_type_idx (group_id, engine)");
        }

        // 8. Composite: target_type + status (active engines for inquiries/options)
        if (!$table->hasIndex('engine_target_status_idx')) {
            $table->addIndex(['target_type', 'status'], 'engine_target_status_idx');
            $this->logInfo("  + engine_target_status_idx (target_type, status)");
        }
    }

    /**
     * Create performance indices on support_processes table
     * 
     * Query patterns:
     * - Get processes for an engine: WHERE support_engine_id = ?
     * - Get active process: WHERE support_engine_id = ? AND status = 'active'
     * - Get processes by target: WHERE target_type = ? AND target_id = ?
     * - Get processes by status: WHERE status = ?
     * - Get processes by phase: WHERE phase = ?
     * - Time-range queries: WHERE started_at >= ? AND ended_at <= ?
     */
    private function createSupportProcessesIndices(): void
    {
        $tableName = SupportProcess::TABLE;
        
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        $this->logInfo("Creating indices on '{$tableName}'");

        // 1. Engine lookup: primary access pattern
        if (!$table->hasIndex('process_engine_idx')) {
            $table->addIndex(['support_engine_id'], 'process_engine_idx');
            $this->logInfo("  + process_engine_idx (support_engine_id)");
        }

        // 2. Engine + status: get active/completed processes for engine
        if (!$table->hasIndex('process_engine_status_idx')) {
            $table->addIndex(['support_engine_id', 'status'], 'process_engine_status_idx');
            $this->logInfo("  + process_engine_status_idx (support_engine_id, status)");
        }

        // 3. Target lookup: get processes for a specific inquiry/option
        if (!$table->hasIndex('process_target_idx')) {
            $table->addIndex(['target_type', 'target_id'], 'process_target_idx');
            $this->logInfo("  + process_target_idx (target_type, target_id)");
        }

        // 4. Status only: get all active/completed processes
        if (!$table->hasIndex('process_status_idx')) {
            $table->addIndex(['status'], 'process_status_idx');
            $this->logInfo("  + process_status_idx (status)");
        }

        // 5. Phase: filter by phase
        if (!$table->hasIndex('process_phase_idx')) {
            $table->addIndex(['phase'], 'process_phase_idx');
            $this->logInfo("  + process_phase_idx (phase)");
        }

        // 6. Start time: for time-based queries
        if (!$table->hasIndex('process_started_idx')) {
            $table->addIndex(['started_at'], 'process_started_idx');
            $this->logInfo("  + process_started_idx (started_at)");
        }

        // 7. End time: for completed process queries
        if ($table->hasColumn('ended_at') && !$table->hasIndex('process_ended_idx')) {
            $table->addIndex(['ended_at'], 'process_ended_idx');
            $this->logInfo("  + process_ended_idx (ended_at)");
        }

        // 8. Composite: target + status
        if (!$table->hasIndex('process_target_status_idx')) {
            $table->addIndex(['target_type', 'target_id', 'status'], 'process_target_status_idx');
            $this->logInfo("  + process_target_status_idx (target_type, target_id, status)");
        }

        // 9. Composite: engine + phase
        if (!$table->hasIndex('process_engine_phase_idx')) {
            $table->addIndex(['support_engine_id', 'phase'], 'process_engine_phase_idx');
            $this->logInfo("  + process_engine_phase_idx (support_engine_id, phase)");
        }
    }

    /**
     * Create performance indices on support_results table
     * 
     * Query patterns:
     * - Get results for a process: WHERE support_process_id = ?
     * - Get results for a target: WHERE target_type = ? AND target_id = ?
     * - Get result for specific option: WHERE support_process_id = ? AND option_id = ?
     * - Get latest results: ORDER BY updated DESC
     * - Refresh check: WHERE updated < ?
     * - Composite: process + target + option
     */
    private function createSupportResultsIndices(): void
    {
        $tableName = SupportResult::TABLE;
        
        if (!$this->schema->hasTable($tableName)) {
            return;
        }

        $table = $this->schema->getTable($tableName);
        $this->logInfo("Creating indices on '{$tableName}'");

        // 1. Primary: one result per process/target/option combination
        if (!$table->hasIndex('result_process_target_uniq')) {
            try {
                $table->addUniqueIndex(
                    ['support_process_id', 'target_type', 'target_id', 'option_id'], 
                    'result_process_target_uniq'
                );
                $this->logInfo("  + result_process_target_uniq (UNIQUE: support_process_id, target_type, target_id, option_id)");
            } catch (\Exception $e) {
                // If unique constraint fails, create regular index
                if (!$table->hasIndex('result_process_target_idx')) {
                    $table->addIndex(
                        ['support_process_id', 'target_type', 'target_id', 'option_id'], 
                        'result_process_target_idx'
                    );
                    $this->logInfo("  + result_process_target_idx (support_process_id, target_type, target_id, option_id)");
                }
            }
        }

        // 2. Process lookup: get all results for a process
        if (!$table->hasIndex('result_process_idx')) {
            $table->addIndex(['support_process_id'], 'result_process_idx');
            $this->logInfo("  + result_process_idx (support_process_id)");
        }

        // 3. Target lookup: get results for inquiry/option
        if (!$table->hasIndex('result_target_idx')) {
            $table->addIndex(['target_type', 'target_id'], 'result_target_idx');
            $this->logInfo("  + result_target_idx (target_type, target_id)");
        }

        // 4. Option-specific: get result for specific option
        if (!$table->hasIndex('result_option_idx')) {
            $table->addIndex(['option_id'], 'result_option_idx');
            $this->logInfo("  + result_option_idx (option_id)");
        }

        // 5. Time-based: get latest results
        if (!$table->hasIndex('result_updated_idx')) {
            $table->addIndex(['updated'], 'result_updated_idx');
            $this->logInfo("  + result_updated_idx (updated)");
        }

        // 6. Process + option: get result for specific option in process
        if (!$table->hasIndex('result_process_opt_idx')) {
            $table->addIndex(['support_process_id', 'option_id'], 'result_process_opt_idx');
            $this->logInfo("  + result_process_opt_idx (support_process_id, option_id)");
        }

        // 7. Process + time: for ordered results
        if (!$table->hasIndex('result_process_updated_idx')) {
            $table->addIndex(['support_process_id', 'updated'], 'result_process_updated_idx');
            $this->logInfo("  + result_process_updated_idx (support_process_id, updated)");
        }

        // 8. Target + option: for option-level results lookup
        if (!$table->hasIndex('result_target_opt_idx')) {
            $table->addIndex(['target_type', 'target_id', 'option_id'], 'result_target_opt_idx');
            $this->logInfo("  + result_target_opt_idx (target_type, target_id, option_id)");
        }
    }

    // ============================================================================
    // FOREIGN KEY CONSTRAINTS
    // ============================================================================

    /**
     * Create foreign key constraints for data integrity
     */
    private function createForeignKeyConstraints(): void
    {
        $this->logInfo('Creating foreign key constraints...');

        // FK: supports.support_engine_id → support_engines.id
        $this->addForeignKeyIfPossible(
            Support::TABLE,
            'support_engine_id',
            SupportEngine::TABLE,
            'id',
            'CASCADE'
        );

        // Also check alternate table names
        foreach (['agora_support', 'oc_agora_support'] as $supportsTable) {
            $this->addForeignKeyIfPossible(
                $supportsTable,
                'support_engine_id',
                SupportEngine::TABLE,
                'id',
                'CASCADE'
            );
        }

        // FK: support_processes.support_engine_id → support_engines.id
        $this->addForeignKeyIfPossible(
            SupportProcess::TABLE,
            'support_engine_id',
            SupportEngine::TABLE,
            'id',
            'CASCADE'
        );

        // FK: support_results.support_process_id → support_processes.id
        $this->addForeignKeyIfPossible(
            SupportResult::TABLE,
            'support_process_id',
            SupportProcess::TABLE,
            'id',
            'CASCADE'
        );
    }

    /**
     * Try to add a foreign key constraint if both tables and columns exist
     */
    private function addForeignKeyIfPossible(
        string $childTable,
        string $childColumn,
        string $parentTable,
        string $parentColumn,
        string $onDelete = 'CASCADE'
    ): void {
        if (!$this->schema->hasTable($childTable) || !$this->schema->hasTable($parentTable)) {
            return;
        }

        $child = $this->schema->getTable($childTable);
        $parent = $this->schema->getTable($parentTable);

        if (!$child->hasColumn($childColumn) || !$parent->hasColumn($parentColumn)) {
            return;
        }

        // Check if FK already exists
        foreach ($child->getForeignKeys() as $fk) {
            if ($fk->getForeignTableName() === $parentTable 
                && in_array($childColumn, $fk->getLocalColumns())) {
                return; // FK already exists
            }
        }

        try {
            $fkName = 'fk_' . str_replace('agora_', '', $childTable) . '_' . str_replace('agora_', '', $parentTable);
            
            $child->addForeignKeyConstraint(
                $parentTable,
                [$childColumn],
                [$parentColumn],
                ['onDelete' => $onDelete],
                $fkName
            );
            
            $this->logInfo("  + FK: {$childTable}.{$childColumn} → {$parentTable}.{$parentColumn} (ON DELETE {$onDelete})");
        } catch (\Exception $e) {
            $this->logInfo("  Could not create FK constraint: " . $e->getMessage());
        }
    }

    // ============================================================================
    // HELPER METHODS
    // ============================================================================

    /**
     * Ensure all columns exist in support_engines table
     */
    private function ensureSupportEnginesColumns(string $tableName): void
    {
        $table = $this->schema->getTable($tableName);
        
        $columns = [
            'engine'      => [Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]],
            'type'        => [Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]],
            'group_id'    => [Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]],
            'status'      => [Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]],
            'config'      => [Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}'])],
            'created'     => [Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]],
            'target_type' => [Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]],
            'target_ids'  => [Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]'])],
            'metadata'    => [Types::JSON, $this->getJsonOptions(['notnull' => false, 'default' => null])],
        ];

        foreach ($columns as $name => [$type, $options]) {
            $this->addColumnIfMissing($table, $name, $type, $options);
        }
    }

    /**
     * Ensure all columns exist in support_processes table
     */
    private function ensureSupportProcessesColumns(string $tableName): void
    {
        $table = $this->schema->getTable($tableName);
        
        $columns = [
            'support_engine_id' => [Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]],
            'target_type'       => [Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]],
            'target_id'         => [Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]],
            'phase'             => [Types::STRING, ['notnull' => true, 'default' => 'deliberative', 'length' => 64]],
            'status'            => [Types::STRING, ['notnull' => true, 'default' => 'pending', 'length' => 32]],
            'started_at'        => [Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]],
            'ended_at'          => [Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]],
            'metadata'          => [Types::JSON, $this->getJsonOptions(['notnull' => false, 'default' => null])],
        ];

        foreach ($columns as $name => [$type, $options]) {
            $this->addColumnIfMissing($table, $name, $type, $options);
        }
    }

    /**
     * Ensure all columns exist in support_results table
     */
    private function ensureSupportResultsColumns(string $tableName): void
    {
        $table = $this->schema->getTable($tableName);
        
        $columns = [
            'support_process_id' => [Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]],
            'target_type'        => [Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]],
            'target_id'          => [Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]],
            'option_id'          => [Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]],
            'result'             => [Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}'])],
            'updated'            => [Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]],
        ];

        foreach ($columns as $name => [$type, $options]) {
            $this->addColumnIfMissing($table, $name, $type, $options);
        }
    }

    // ============================================================================
    // DATA MIGRATION
    // ============================================================================

    /**
     * Migrate existing supports data: convert integer values to JSON format
     */
    private function migrateExistingSupportsData(): void
    {
        $tableNames = [Support::TABLE, 'agora_support', 'oc_agora_support', 'oc_agora_supports'];

        $actualTableName = null;
        foreach ($tableNames as $name) {
            try {
                $result = $this->connection->executeQuery(
                    "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = :name",
                    ['name' => $name]
                );
                if ((int) $result->fetchOne() > 0) {
                    $actualTableName = $name;
                    break;
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        if ($actualTableName === null) {
            $this->logInfo('No supports table found - skipping data migration');
            return;
        }

        $this->logInfo("Migrating supports data in '{$actualTableName}'");

        try {
            if ($this->isMySQL) {
                $countSQL = "SELECT COUNT(*) FROM `{$actualTableName}` WHERE `value` IS NOT NULL AND `value` REGEXP '^-?[0-9]+$' AND JSON_VALID(`value`) = 0";
            } elseif ($this->isPostgreSQL) {
                $countSQL = "SELECT COUNT(*) FROM \"{$actualTableName}\" WHERE \"value\" IS NOT NULL AND \"value\"::text ~ '^-?[0-9]+\$'";
            } else {
                $countSQL = "SELECT COUNT(*) FROM \"{$actualTableName}\" WHERE \"value\" IS NOT NULL";
            }

            $count = (int) $this->connection->executeQuery($countSQL)->fetchOne();
            $this->logInfo("Found {$count} support records to migrate");

            if ($count === 0) {
                return;
            }

            if ($this->isMySQL) {
                $sql = "UPDATE `{$actualTableName}` SET `value` = CAST(`value` AS JSON) WHERE `value` IS NOT NULL AND `value` REGEXP '^-?[0-9]+$' AND JSON_VALID(`value`) = 0";
            } elseif ($this->isPostgreSQL) {
                $sql = "UPDATE \"{$actualTableName}\" SET \"value\" = to_json(\"value\"::integer)::text WHERE \"value\" IS NOT NULL AND \"value\"::text ~ '^-?[0-9]+\$'";
            } else {
                $sql = "UPDATE \"{$actualTableName}\" SET \"value\" = CAST(\"value\" AS TEXT) WHERE \"value\" IS NOT NULL AND typeof(\"value\") = 'integer'";
            }

            $affected = $this->connection->executeStatement($sql);
            $this->logInfo("Data migration complete: {$affected} rows updated");
            $this->logInfo('Value mapping: -1 → -1 (JSON), 0 → 0 (JSON), 1 → 1 (JSON)');

        } catch (\Exception $e) {
            $this->logInfo('Error migrating supports data: ' . $e->getMessage());
        }
    }

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================

    /**
     * Get JSON column options based on database platform
     */
    private function getJsonOptions(array $defaultOptions): array
    {
        if ($this->isMySQL) {
            unset($defaultOptions['default']);
        }
        return $defaultOptions;
    }

    /**
     * Helper to add a column if it doesn't exist
     */
    private function addColumnIfMissing($table, string $columnName, string $type, array $options): void
    {
        if (!$table->hasColumn($columnName)) {
            $table->addColumn($columnName, $type, $options);
            $this->logInfo("  Added missing column '{$columnName}' to '" . $table->getName() . "'");
        }
    }

    /**
     * Log info message
     */
    private function logInfo(string $message): void
    {
        if ($this->output) {
            $this->output->info('Agora 1.7.5 - ' . $message);
        }
    }
}
