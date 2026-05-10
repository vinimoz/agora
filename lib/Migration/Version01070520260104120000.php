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

    // Use the actual table names with oc_ prefix for raw SQL
    private const T_SUPPORTS = 'oc_agora_supports';
    private const T_ENGINES = 'oc_agora_support_engines';
    private const T_RESULTS = 'oc_agora_support_results';
    private const T_INQUIRIES = 'oc_agora_inquiries';
    private const T_OPTIONS = 'oc_agora_options';

    // Schema wrapper uses different names (without prefix)
    private const S_SUPPORTS = 'agora_supports';
    private const S_ENGINES = 'agora_support_engines';
    private const S_RESULTS = 'agora_support_results';

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

        // Create tables
        $this->createEngineTable();
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

        // 1. Convert value column from SMALLINT to JSON
        $this->convertValueColumnToJson();
        
        // 3. Add unique index on results
        $this->addResultUniqueIndex();
        
        // 4. Migrate existing supports to results
        $this->migrateExistingSupportsToResults();

        // 5. Add indices
        $this->addIndices();

        // 6. Add foreign keys
        $this->addForeignKeys();

        $this->log('Migration complete!');
    }

    // ====================================================================
    // TABLE CREATION
    // ====================================================================

    private function createEngineTable(): void
    {
        if ($this->schema->hasTable(self::S_ENGINES)) {
            $this->log("  Skip: " . self::S_ENGINES . " exists");
            return;
        }
        
        $this->log("  Create: " . self::S_ENGINES);
        $table = $this->schema->createTable(self::S_ENGINES);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('title', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 128]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('engine', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_group_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('config', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '{}']));
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'option', 'length' => 32]);
        $table->addColumn('target_ids', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '[]']));
        $table->addColumn('metadata', Types::JSON, $this->jsonOpts(['notnull' => false, 'default' => null]));
        $table->setPrimaryKey(['id']);
        $table->addIndex(['inquiry_id'], 'engine_inquiry_idx');
        $table->addIndex(['inquiry_group_id'], 'engine_inquiry_group_idx');
        $table->addIndex(['engine'], 'engine_type_idx');
        $table->addIndex(['status'], 'engine_status_idx');
        $table->addIndex(['created'], 'engine_created_idx');
    }

    private function createResultTable(): void
    {
        if ($this->schema->hasTable(self::S_RESULTS)) {
            $this->log("  Skip: " . self::S_RESULTS . " exists");
            return;
        }
        
        $this->log("  Create: " . self::S_RESULTS);
        $table = $this->schema->createTable(self::S_RESULTS);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        // Make nullable for historical data that has no engine
        $table->addColumn('support_engine_id', Types::BIGINT, [
            'notnull' => true,
            'default' => 0,
            'unsigned' => true,
            'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]);
        $table->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('result', Types::JSON, $this->jsonOpts(['notnull' => true, 'default' => '{}']));
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addIndex(['support_engine_id'], 'result_engine_idx');
        $table->addIndex(['target_type', 'target_id'], 'result_target_idx');
        $table->addIndex(['updated'], 'result_updated_idx');
    }

    private function modifySupportsTable(): void
    {
        if ($this->schema->hasTable(self::S_SUPPORTS)) {
            $this->log("  Modify: " . self::S_SUPPORTS);
            $table = $this->schema->getTable(self::S_SUPPORTS);

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
            $this->log("  Create: " . self::S_SUPPORTS);
            $table = $this->schema->createTable(self::S_SUPPORTS);
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
    // POST-SCHEMA: Convert value column using value_new approach
    // ====================================================================

    private function convertValueColumnToJson(): void
    {
        $this->log('Converting value column: SMALLINT → JSON...');
        $this->log('  Using: Create value_new, copy data, drop value, rename value_new -> value');

        try {
            $tableName = self::T_SUPPORTS;
            $this->log('  Table: ' . $tableName);

            // Step 1: Add new JSON column value_new
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE \"" . $tableName . "\" ADD COLUMN value_new JSON DEFAULT '0'::json"
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE `" . $tableName . "` ADD COLUMN value_new JSON DEFAULT (JSON_ARRAY(0))"
                );
            } else {
                // SQLite
                $this->connection->executeStatement(
                    "ALTER TABLE \"" . $tableName . "\" ADD COLUMN value_new TEXT DEFAULT '0'"
                );
            }
            $this->log('  ✓ Added value_new column');

            // Step 2: Copy and convert data from value to value_new
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "UPDATE \"" . $tableName . "\" SET value_new = to_json(value::integer)::json WHERE value IS NOT NULL"
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "UPDATE `" . $tableName . "` SET `value_new` = JSON_ARRAY(CAST(`value` AS SIGNED)) WHERE `value` IS NOT NULL"
                );
            } else {
                // SQLite
                $this->connection->executeStatement(
                    "UPDATE \"" . $tableName . "\" SET value_new = CAST(value AS TEXT) WHERE value IS NOT NULL"
                );
            }
            $this->log('  ✓ Copied data to value_new');

            // Step 3: Set default for any remaining null values
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "UPDATE \"" . $tableName . "\" SET value_new = '0'::json WHERE value_new IS NULL"
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "UPDATE `" . $tableName . "` SET `value_new` = JSON_ARRAY(0) WHERE `value_new` IS NULL"
                );
            } else {
                $this->connection->executeStatement(
                    "UPDATE \"" . $tableName . "\" SET value_new = '0' WHERE value_new IS NULL"
                );
            }
            $this->log('  ✓ Set defaults for null values');

            // Step 4: Drop old value column
            $this->connection->executeStatement(
                "ALTER TABLE \"" . $tableName . "\" DROP COLUMN value"
            );
            $this->log('  ✓ Dropped old value column');

            // Step 5: Rename value_new to value
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE \"" . $tableName . "\" RENAME COLUMN value_new TO value"
                );
                // Set NOT NULL
                $this->connection->executeStatement(
                    "ALTER TABLE \"" . $tableName . "\" ALTER COLUMN value SET NOT NULL"
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE `" . $tableName . "` RENAME COLUMN value_new TO value"
                );
                // Set NOT NULL with default
                $this->connection->executeStatement(
                    "ALTER TABLE `" . $tableName . "` MODIFY COLUMN `value` JSON NOT NULL DEFAULT (JSON_ARRAY(0))"
                );
            } else {
                // SQLite
                $this->connection->executeStatement(
                    "ALTER TABLE \"" . $tableName . "\" RENAME COLUMN value_new TO value"
                );
            }
            $this->log('  ✓ Renamed value_new to value');
            $this->log('  ✓✓ value column successfully converted to JSON!');

        } catch (\Exception $e) {
            $this->log('  ERROR: ' . $e->getMessage());
        }
    }


    // ====================================================================
    // POST-SCHEMA: Migrate existing supports to results
    // ====================================================================
    
    private function migrateExistingSupportsToResults(): void
    {
        $this->log('Migrating existing supports to results...');

        $count = $this->getSupportsCount();
        if ($count === 0) {
            $this->log('  No supports to migrate');
            return;
        }

        $this->log("  Found {$count} support records to process");

        $targets = $this->getDistinctTargets();
        $this->log("  Processing " . count($targets) . " distinct targets...");

        foreach ($targets as $target) {
            $inquiryId = (int) $target['inquiry_id'];
            $optionId = (int) $target['option_id'];

            $this->log("  Target: inquiry_id={$inquiryId}, option_id={$optionId}");

            if ($optionId > 0) {
                $targetType = 'option';
                $targetId = $optionId;
                $supportFeature = $this->getOptionSupportFeature($optionId);
            } else {
                $targetType = 'inquiry';
                $targetId = $inquiryId;
                $supportFeature = $this->getInquirySupportFeature($inquiryId);
            }

            $this->log("    targetType={$targetType}, targetId={$targetId}, supportFeature={$supportFeature}");

            $result = $this->calculateResult($inquiryId, $optionId, $supportFeature);

            if ($result !== null) {
                $this->log("    Result: " . json_encode($result));
                $this->insertResult($targetType, $targetId, $result);
            } else {
                $this->log("    Result is NULL, skipping");
            }
        }

        $this->log('  ✓ Supports migrated to results');
    }

    private function getSupportsCount(): int
    {
        try {
            $result = $this->connection->executeQuery(
                "SELECT COUNT(*) FROM \"" . self::T_SUPPORTS . "\""
            );
            return (int) $result->fetchOne();
        } catch (\Exception $e) {
            $this->log('  Error counting supports: ' . $e->getMessage());
            return 0;
        }
    }

    private function getDistinctTargets(): array
    {
        try {
            $result = $this->connection->executeQuery(
                "SELECT DISTINCT inquiry_id, option_id FROM \"" . self::T_SUPPORTS . "\" ORDER BY inquiry_id, option_id"
            );
            return $result->fetchAllAssociative();
        } catch (\Exception $e) {
            $this->log('  Error getting targets: ' . $e->getMessage());
            return [];
        }
    }

    private function getInquirySupportFeature(int $inquiryId): string
    {
        try {
            $result = $this->connection->executeQuery(
                "SELECT support_feature FROM \"" . self::T_INQUIRIES . "\" WHERE id = ?",
                [$inquiryId]
            );
            $feature = $result->fetchOne();
            return $feature ?: 'binary';
        } catch (\Exception $e) {
            return 'binary';
        }
    }

    private function getOptionSupportFeature(int $optionId): string
    {
        try {
            $result = $this->connection->executeQuery(
                "SELECT support_feature FROM \"" . self::T_OPTIONS . "\" WHERE id = ?",
                [$optionId]
            );
            $feature = $result->fetchOne();
            return $feature ?: 'binary';
        } catch (\Exception $e) {
            return 'binary';
        }
    }

    private function calculateResult(int $inquiryId, int $optionId, string $supportFeature): ?array
    {
        try {
            $this->log("    Calculating for inquiry={$inquiryId}, option={$optionId}");

            $supports = $this->connection->executeQuery(
                "SELECT value, weight FROM \"" . self::T_SUPPORTS . "\" 
                WHERE inquiry_id = ? AND option_id = ?",
                [$inquiryId, $optionId]
            )->fetchAllAssociative();

            $this->log("    Found " . count($supports) . " supports");

            if (empty($supports)) {
                return null;
            }

            switch ($supportFeature) {
                case 'binary':
                    return $this->calculateBinary($supports);
                case 'ternary':
                    return $this->calculateTernary($supports);
                case 'none':
                    $total = count($supports);
                    return ['type' => 'trending', 'score' => $total];
                default:
                    return $this->calculateBinary($supports);
            }
        } catch (\Exception $e) {
            $this->log('  Error calculating result: ' . $e->getMessage());
            return null;
        }
    }

    private function calculateBinary(array $supports): array
    {
        $yes = 0;
        $no = 0;
        foreach ($supports as $support) {
            // Handle JSON values from PostgreSQL - they might be returned as strings
            $value = $support['value'];
            if (is_string($value)) {
                $value = json_decode($value, true);
            }
            $value = (int) $value;
            $weight = (int) ($support['weight'] ?? 1);
            if ($value > 0) {
                $yes += $weight;
            } else {
                $no += $weight;
            }
        }
        $total = $yes + $no;
        return [
            'type' => 'binary',
            'total_yes' => $yes,
            'total_no' => $no,
            'percentage_yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
            'percentage_no' => $total > 0 ? round(($no / $total) * 100, 2) : 0,
        ];
    }

    private function calculateTernary(array $supports): array
    {
        $for = 0;
        $against = 0;
        $abstain = 0;
        foreach ($supports as $support) {
            $value = $support['value'];
            if (is_string($value)) {
                $value = json_decode($value, true);
            }
            $value = (int) $value;
            $weight = (int) ($support['weight'] ?? 1);
            if ($value > 0) {
                $for += $weight;
            } elseif ($value < 0) {
                $against += $weight;
            } else {
                $abstain += $weight;
            }
        }
        $total = $for + $against + $abstain;
        return [
            'type' => 'ternary',
            'total_for' => $for,
            'total_against' => $against,
            'total_abstain' => $abstain,
            'percentage_for' => $total > 0 ? round(($for / $total) * 100, 2) : 0,
            'percentage_against' => $total > 0 ? round(($against / $total) * 100, 2) : 0,
            'percentage_abstain' => $total > 0 ? round(($abstain / $total) * 100, 2) : 0,
        ];
    }

    private function insertResult(string $targetType, int $targetId, array $result): void
    {
        try {
            $now = time();
            $resultJson = json_encode($result, JSON_UNESCAPED_UNICODE);
            
            // support_engine_id is NULL for historically migrated data (pre-engine system)
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "INSERT INTO \"" . self::T_RESULTS . "\" 
                     (support_engine_id, target_type, target_id, result, updated) 
                     VALUES (0, ?, ?, ?::json, ?)
                     ON CONFLICT (target_type, target_id) 
                     DO UPDATE SET result = EXCLUDED.result, updated = EXCLUDED.updated",
                    [$targetType, $targetId, $resultJson, $now]
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "INSERT INTO `" . self::T_RESULTS . "` 
                     (support_engine_id, target_type, target_id, result, updated) 
                     VALUES (0, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE result = VALUES(result), updated = VALUES(updated)",
                    [$targetType, $targetId, $resultJson, $now]
                );
            } else {
                // SQLite
                $this->connection->executeStatement(
                    "INSERT OR REPLACE INTO \"" . self::T_RESULTS . "\" 
                     (support_engine_id, target_type, target_id, result, updated) 
                     VALUES (0, ?, ?, ?, ?)",
                    [$targetType, $targetId, $resultJson, $now]
                );
            }
        } catch (\Exception $e) {
            $this->log('  Error inserting result: ' . $e->getMessage());
        }
    }

    // ====================================================================
    // UTILITIES
    // ====================================================================

    private function addResultUniqueIndex(): void
    {
        $this->log('Adding unique index on results table...');
        try {
            $this->connection->executeStatement(
                "CREATE UNIQUE INDEX IF NOT EXISTS result_target_uniq 
                 ON \"" . self::T_RESULTS . "\" (target_type, target_id)"
            );
            $this->log('  ✓ result_target_uniq');
        } catch (\Exception $e) {
            $this->log('  Unique index skipped: ' . $e->getMessage());
        }
    }

    private function addIndices(): void
    {
        $this->log('Adding indices...');

        $indices = [
            "CREATE INDEX IF NOT EXISTS supports_inq_opt_idx ON \"" . self::T_SUPPORTS . "\" (inquiry_id, option_id)",
            "CREATE INDEX IF NOT EXISTS supports_inq_user_idx ON \"" . self::T_SUPPORTS . "\" (inquiry_id, user_id)",
            "CREATE INDEX IF NOT EXISTS supports_opt_user_idx ON \"" . self::T_SUPPORTS . "\" (option_id, user_id)",
            "CREATE INDEX IF NOT EXISTS supports_engine_idx ON \"" . self::T_SUPPORTS . "\" (support_engine_id)",
            "CREATE INDEX IF NOT EXISTS supports_weight_idx ON \"" . self::T_SUPPORTS . "\" (weight)",
            "CREATE INDEX IF NOT EXISTS supports_created_idx ON \"" . self::T_SUPPORTS . "\" (created)",
            "CREATE INDEX IF NOT EXISTS supports_inq_created_idx ON \"" . self::T_SUPPORTS . "\" (inquiry_id, created)",
            "CREATE INDEX IF NOT EXISTS engine_inquiry_status_idx ON \"" . self::T_ENGINES . "\" (inquiry_id, status)",
            "CREATE INDEX IF NOT EXISTS engine_target_type_idx ON \"" . self::T_ENGINES . "\" (target_type)",
        ];

        foreach ($indices as $sql) {
            try {
                $this->connection->executeStatement($sql);
            } catch (\Exception $e) {
                // Skip
            }
        }
        $this->log('  Indices done');
    }

    private function addForeignKeys(): void
    {
        $this->log('Adding foreign keys...');

        $fks = [
            "ALTER TABLE \"" . self::T_SUPPORTS . "\" ADD CONSTRAINT IF NOT EXISTS fk_supports_engine FOREIGN KEY (support_engine_id) REFERENCES \"" . self::T_ENGINES . "\"(id) ON DELETE SET NULL",
            "ALTER TABLE \"" . self::T_RESULTS . "\" ADD CONSTRAINT IF NOT EXISTS fk_results_engine FOREIGN KEY (support_engine_id) REFERENCES \"" . self::T_ENGINES . "\"(id) ON DELETE CASCADE",
        ];

        foreach ($fks as $sql) {
            try {
                $this->connection->executeStatement($sql);
            } catch (\Exception $e) {
                // Skip
            }
        }
        $this->log('  Foreign keys done');
    }

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
