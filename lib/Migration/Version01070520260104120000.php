<?php

declare(strict_types=1);

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\MySQLPlatform;
use Doctrine\DBAL\Platforms\PostgreSQLPlatform;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\DB\Types;

class Version01070520260104120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;
    private bool $isMySQL = false;
    private bool $isPostgreSQL = false;
    private ?IDBConnection $connection = null;

    private const T_SUPPORTS = 'agora_supports';
    private const T_ENGINES = 'agora_support_engines';
    private const T_PROCESSES = 'agora_support_processes';
    private const T_RESULTS = 'agora_support_results';

    public function __construct(
        private ?IDBConnection $dbConnection = null
    ) {
        $this->connection = $dbConnection;
    }

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        $this->schema = $schemaClosure();
        $platform = $this->schema->getDatabasePlatform();
        $this->isMySQL = $platform instanceof MySQLPlatform;
        $this->isPostgreSQL = $platform instanceof PostgreSQLPlatform;

        $this->log('Agora 1.7.5 - Schema migration');
        $this->log('Platform: ' . ($this->isMySQL ? 'MySQL' : ($this->isPostgreSQL ? 'PostgreSQL' : 'SQLite')));

        // Create tables (without UNIQUE indices on JSON columns)
        $this->createEngineTable();
        $this->createProcessTable();
        $this->createResultTable();
        $this->modifySupportsTable();

        $this->log('Schema queued, executing after return...');
        return $this->schema;
    }

    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;
        
        if (!$this->connection) {
            $this->log('ERROR: No database connection!');
            return;
        }

        $this->log('POST-SCHEMA: Running post-migration operations...');

        // Convert value column if needed
        $this->convertValueColumnToJson();
        
        // Add indices that are safe
        $this->addIndices();
        
        // Add foreign keys
        $this->addForeignKeys();
        
        // Add the unique index on result table (using expression for PostgreSQL)
        $this->addResultUniqueIndex();

        $this->log('Migration complete!');
    }

    // ====================================================================
    // TABLE CREATION
    // ====================================================================

    private function createEngineTable(): void
    {
        if ($this->schema->hasTable(self::T_ENGINES)) {
            $this->log("  Skip: " . self::T_ENGINES . " exists");
            return;
        }
        
        $this->log("  Create: " . self::T_ENGINES);
        $table = $this->schema->createTable(self::T_ENGINES);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('engine', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('group_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('config', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '{}']));
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]);
        // target_ids is JSON - NO unique index on this column!
        $table->addColumn('target_ids', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '[]']));
        $table->addColumn('metadata', Types::JSON, $this->jsonOpts(['notnull' => false, 'default' => null]));
        $table->setPrimaryKey(['id']);
        $table->addIndex(['group_id'], 'engine_group_idx');
        $table->addIndex(['engine'], 'engine_type_idx');
        $table->addIndex(['status'], 'engine_status_idx');
        $table->addIndex(['created'], 'engine_created_idx');
    }

    private function createProcessTable(): void
    {
        if ($this->schema->hasTable(self::T_PROCESSES)) {
            $this->log("  Skip: " . self::T_PROCESSES . " exists");
            return;
        }
        
        $this->log("  Create: " . self::T_PROCESSES);
        $table = $this->schema->createTable(self::T_PROCESSES);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('support_engine_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]);
        $table->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('phase', Types::STRING, ['notnull' => true, 'default' => 'deliberative', 'length' => 64]);
        $table->addColumn('status', Types::STRING, ['notnull' => true, 'default' => 'pending', 'length' => 32]);
        $table->addColumn('started_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('ended_at', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('metadata', Types::JSON, $this->jsonOpts(['notnull' => false, 'default' => null]));
        $table->setPrimaryKey(['id']);
        $table->addIndex(['support_engine_id'], 'process_engine_idx');
        $table->addIndex(['status'], 'process_status_idx');
        $table->addIndex(['started_at'], 'process_started_idx');
    }

    private function createResultTable(): void
    {
        if ($this->schema->hasTable(self::T_RESULTS)) {
            $this->log("  Skip: " . self::T_RESULTS . " exists");
            return;
        }
        
        $this->log("  Create: " . self::T_RESULTS);
        $table = $this->schema->createTable(self::T_RESULTS);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('support_process_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]);
        $table->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('option_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('result', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '{}']));
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        // NO unique index on columns that include JSON - done in postSchemaChange
        $table->addIndex(['support_process_id'], 'result_process_idx');
        $table->addIndex(['target_type', 'target_id'], 'result_target_idx');
        $table->addIndex(['updated'], 'result_updated_idx');
    }

    private function modifySupportsTable(): void
    {
        if ($this->schema->hasTable(self::T_SUPPORTS)) {
            $this->log("  Modify: " . self::T_SUPPORTS);
            $table = $this->schema->getTable(self::T_SUPPORTS);

            if (!$table->hasColumn('weight')) {
                $table->addColumn('weight', Types::INTEGER, ['notnull' => true, 'default' => 1]);
                $this->log("    + weight");
            }
            if (!$table->hasColumn('support_engine_id')) {
                $table->addColumn('support_engine_id', Types::BIGINT, [
                    'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
                ]);
                $this->log("    + support_engine_id");
            }
            if (!$table->hasColumn('updated')) {
                $table->addColumn('updated', Types::BIGINT, [
                    'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
                ]);
                $this->log("    + updated");
            }
        } else {
            $this->log("  Create: " . self::T_SUPPORTS);
            $table = $this->schema->createTable(self::T_SUPPORTS);
            $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
            $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
            $table->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
            $table->addColumn('user_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
            $table->addColumn('value', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '0']));
            $table->addColumn('weight', Types::INTEGER, ['notnull' => true, 'default' => 1]);
            $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
            $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
            $table->addColumn('support_hash', Types::STRING, ['notnull' => true, 'length' => 64]);
            $table->addColumn('support_engine_id', Types::BIGINT, [
                'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
            ]);
            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['inquiry_id', 'option_id', 'user_id'], 'agora_uniq_supports');
        }
    }

    // ====================================================================
    // POST-SCHEMA
    // ====================================================================

    /**
     * Add the unique index on support_results table
     * Uses expression for nullable option_id in PostgreSQL
     */
    private function addResultUniqueIndex(): void
    {
        $this->log('Adding unique index on results table...');
        
        try {
            if ($this->isPostgreSQL) {
                // PostgreSQL: use expression to handle nullable option_id
                $this->connection->executeStatement(
                    "CREATE UNIQUE INDEX IF NOT EXISTS result_process_target_uniq 
                     ON " . self::T_RESULTS . " 
                     (support_process_id, target_type, target_id, COALESCE(option_id, 0))"
                );
            } else {
                // MySQL/SQLite
                $this->connection->executeStatement(
                    "CREATE UNIQUE INDEX IF NOT EXISTS result_process_target_uniq 
                     ON " . self::T_RESULTS . " 
                     (support_process_id, target_type, target_id, option_id)"
                );
            }
            $this->log('  ✓ result_process_target_uniq');
        } catch (\Exception $e) {
            $this->log('  Unique index skipped: ' . $e->getMessage());
        }
    }

    private function convertValueColumnToJson(): void
    {
        try {
            if ($this->isPostgreSQL) {
                $result = $this->connection->executeQuery(
                    "SELECT data_type FROM information_schema.columns 
                     WHERE table_name = $1 AND column_name = 'value'",
                    [self::T_SUPPORTS]
                );
                $currentType = $result->fetchOne();
                
                if ($currentType === 'json' || $currentType === 'jsonb') {
                    $this->log('value column already JSON, skipping');
                    return;
                }
                
                $this->log('Converting value: ' . ($currentType ?? 'unknown') . ' → JSON');
                
                $this->connection->executeStatement(
                    "ALTER TABLE " . self::T_SUPPORTS . " 
                     ALTER COLUMN value TYPE JSON 
                     USING CASE 
                         WHEN value IS NULL THEN '0'::json
                         ELSE to_json(value::integer)::json
                     END"
                );
                $this->log('  ✓ value converted');
            }
        } catch (\Exception $e) {
            $this->log('Value conversion note: ' . $e->getMessage());
        }
    }

    private function addIndices(): void
    {
        $this->log('Adding indices...');
        
        // Only regular B-tree indices (no JSON columns!)
        $indices = [
            "CREATE INDEX IF NOT EXISTS supports_inq_opt_idx ON " . self::T_SUPPORTS . " (inquiry_id, option_id)",
            "CREATE INDEX IF NOT EXISTS supports_inq_user_idx ON " . self::T_SUPPORTS . " (inquiry_id, user_id)",
            "CREATE INDEX IF NOT EXISTS supports_opt_user_idx ON " . self::T_SUPPORTS . " (option_id, user_id)",
            "CREATE INDEX IF NOT EXISTS supports_engine_idx ON " . self::T_SUPPORTS . " (support_engine_id)",
            "CREATE INDEX IF NOT EXISTS supports_weight_idx ON " . self::T_SUPPORTS . " (weight)",
            "CREATE INDEX IF NOT EXISTS supports_created_idx ON " . self::T_SUPPORTS . " (created)",
            "CREATE INDEX IF NOT EXISTS supports_inq_created_idx ON " . self::T_SUPPORTS . " (inquiry_id, created)",
            "CREATE INDEX IF NOT EXISTS engine_group_status_idx ON " . self::T_ENGINES . " (group_id, status)",
            "CREATE INDEX IF NOT EXISTS engine_target_type_idx ON " . self::T_ENGINES . " (target_type)",
            "CREATE INDEX IF NOT EXISTS process_engine_status_idx ON " . self::T_PROCESSES . " (support_engine_id, status)",
            "CREATE INDEX IF NOT EXISTS process_target_idx ON " . self::T_PROCESSES . " (target_type, target_id)",
            "CREATE INDEX IF NOT EXISTS process_phase_idx ON " . self::T_PROCESSES . " (phase)",
            "CREATE INDEX IF NOT EXISTS result_option_idx ON " . self::T_RESULTS . " (option_id)",
            "CREATE INDEX IF NOT EXISTS result_process_opt_idx ON " . self::T_RESULTS . " (support_process_id, option_id)",
        ];

        foreach ($indices as $sql) {
            try {
                $this->connection->executeStatement($sql);
            } catch (\Exception $e) {
                // Skip - likely already exists
            }
        }
        $this->log('  Indices done');
    }

    private function addForeignKeys(): void
    {
        $this->log('Adding foreign keys...');
        
        $fks = [
            "ALTER TABLE " . self::T_SUPPORTS . " ADD CONSTRAINT IF NOT EXISTS fk_supports_engine FOREIGN KEY (support_engine_id) REFERENCES " . self::T_ENGINES . "(id) ON DELETE SET NULL",
            "ALTER TABLE " . self::T_PROCESSES . " ADD CONSTRAINT IF NOT EXISTS fk_processes_engine FOREIGN KEY (support_engine_id) REFERENCES " . self::T_ENGINES . "(id) ON DELETE CASCADE",
            "ALTER TABLE " . self::T_RESULTS . " ADD CONSTRAINT IF NOT EXISTS fk_results_process FOREIGN KEY (support_process_id) REFERENCES " . self::T_PROCESSES . "(id) ON DELETE CASCADE",
        ];

        foreach ($fks as $sql) {
            try {
                $this->connection->executeStatement($sql);
            } catch (\Exception $e) {
                // Skip - already exists
            }
        }
        $this->log('  Foreign keys done');
    }

    // ====================================================================
    // UTILITIES
    // ====================================================================

    private function jsonOpts(array $opts): array
    {
        if ($this->isMySQL) {
            unset($opts['default']);
        }
        return $opts;
    }

    private function log(string $msg): void
    {
        if ($this->output) {
            $this->output->info('Agora 1.7.5 - ' . $msg);
        }
    }
}
