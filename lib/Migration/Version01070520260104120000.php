/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

<?php

declare(strict_types=1);

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Platforms\MySQLPlatform;
use Doctrine\DBAL\Platforms\PostgreSQLPlatform;
use Doctrine\DBAL\Platforms\SqlitePlatform;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version01070520260104120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;
    private bool $isMySQL = false;
    private bool $isPostgreSQL = false;
    private bool $isSQLite = false;
    private ?IDBConnection $connection = null;
    
    private bool $valueNewAddedBySchema = false;

    private const S_SUPPORTS = 'agora_supports';
    private const S_ENGINES = 'agora_support_engines';
    private const S_RESULTS = 'agora_support_results';
    private const T_INQUIRIES = 'agora_inquiries';
    private const T_OPTIONS = 'agora_options';

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
        $this->isSQLite = $platform instanceof SqlitePlatform;

        $this->log('Agora 1.7.5 - Schema upgrade');
        $this->log('Platform: ' . ($this->isMySQL ? 'MySQL' : ($this->isPostgreSQL ? 'PostgreSQL' : 'SQLite')));

        $this->createSupportEnginesTable();
        $this->createSupportResultsTable();

        if (!$this->schema->hasTable(self::S_SUPPORTS)) {
            $this->log(self::S_SUPPORTS . ' does not exist – fresh install, creating');
            $this->createSupportsTable();
            return $this->schema;
        }

        if ($this->isValueColumnAlreadyJsonInSchema()) {
            $this->log(self::S_SUPPORTS . ' already has JSON column – fresh install, skipping modifications');
            return $this->schema;
        }

        $this->log('Upgrading ' . self::S_SUPPORTS . ' from SMALLINT to JSON');
        $this->modifySupportsTable();

        $this->log('Schema changes queued');
        return $this->schema;
    }

    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;

        if (!$this->connection) {
            $this->log('ERROR: No database connection!');
            return;
        }

        $this->log('POST-SCHEMA: Running data migration...');

        try {
            if (!$this->schema->hasTable(self::S_SUPPORTS)) {
                $this->log('Supports table does not exist – fresh install, skipping');
                return;
            }

            if ($this->isValueColumnAlreadyJson()) {
                $this->log('Already migrated – skipping post-migration operations');
                return;
            }

            $this->ensureValueNewColumnExists();
            $this->convertValueColumnToJson();
            $this->initializeSupportHashes();
            $this->addResultUniqueIndex();
            $this->migrateExistingSupportsToResults();
            $this->fixEmptyResults(); // Fixed version
            $this->addIndices();
            $this->addForeignKeys();

            $this->log('✅ Migration complete successfully!');
        } catch (\Exception $e) {
            $this->log('❌ ERROR: ' . $e->getMessage());
            $this->log('Stack trace: ' . $e->getTraceAsString());
            throw $e;
        }
    }

    private function ensureValueNewColumnExists(): void
    {
        $this->log('Ensuring value_new column exists...');
        
        try {
            $tableName = $this->getTableNameWithPrefix(self::S_SUPPORTS);
            
            if ($this->columnExists($tableName, 'value_new')) {
                $this->log('  value_new column already exists');
                return;
            }
            
            $this->log('  Adding value_new column via SQL...');
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE " . $this->quoteIdentifier($tableName) . " ADD COLUMN value_new JSONB"
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE " . $this->quoteIdentifier($tableName) . " ADD COLUMN value_new JSON"
                );
            }
            $this->log('  ✅ value_new column added');
            
        } catch (\Exception $e) {
            if (strpos($e->getMessage(), 'already exists') !== false || 
                strpos($e->getMessage(), 'duplicate column') !== false) {
                $this->log('  Column already exists, continuing...');
                return;
            }
            throw $e;
        }
    }

    private function columnExists(string $tableName, string $columnName): bool
    {
        try {
            if ($this->isPostgreSQL) {
                $result = $this->connection->executeQuery(
                    "SELECT 1 FROM information_schema.columns 
                     WHERE table_name = ? AND column_name = ?",
                    [$tableName, $columnName]
                );
                return (bool)$result->fetchOne();
            } elseif ($this->isMySQL) {
                $result = $this->connection->executeQuery(
                    "SELECT 1 FROM information_schema.columns 
                     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?",
                    [$tableName, $columnName]
                );
                return (bool)$result->fetchOne();
            } else {
                $result = $this->connection->executeQuery(
                    "SELECT name FROM pragma_table_info(?) WHERE name = ?",
                    [$tableName, $columnName]
                );
                return (bool)$result->fetchOne();
            }
        } catch (\Exception $e) {
            return false;
        }
    }

    // ====================================================================
    // CREATE TABLES
    // ====================================================================

    private function createSupportEnginesTable(): void
    {
        if ($this->schema->hasTable(self::S_ENGINES)) {
            return;
        }

        $this->log("  Create: " . self::S_ENGINES);
        $table = $this->schema->createTable(self::S_ENGINES);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('title', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 128]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('engine', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('purpose', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_group_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('config', Types::JSON, ['notnull' => true, 'default' => '{}']);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'option', 'length' => 32]);
        $table->addColumn('target_ids', Types::JSON, ['notnull' => true, 'default' => '[]']);
        $table->addColumn('metadata', Types::JSON, ['notnull' => false, 'default' => null]);
        $table->setPrimaryKey(['id']);
        $table->addIndex(['inquiry_id'], 'engine_inquiry_idx');
        $table->addIndex(['inquiry_group_id'], 'engine_inquiry_group_idx');
        $table->addIndex(['engine'], 'engine_type_idx');
        $table->addIndex(['status'], 'engine_status_idx');
        $table->addIndex(['created'], 'engine_created_idx');
    }

    private function createSupportResultsTable(): void
    {
        if ($this->schema->hasTable(self::S_RESULTS)) {
            return;
        }

        $this->log("  Create: " . self::S_RESULTS);
        $table = $this->schema->createTable(self::S_RESULTS);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('support_engine_id', Types::BIGINT, [
            'notnull' => false,
            'default' => null,
            'unsigned' => true,
            'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'default' => 'inquiry', 'length' => 32]);
        $table->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $defaultEmptyResult = json_encode([
            'type' => 'binary',
            'totals' => ['yes' => 0, 'no' => 0],
            'percentages' => ['yes' => 0, 'no' => 0]
        ]);
        $table->addColumn('result', Types::JSON, ['notnull' => true, 'default' => $defaultEmptyResult]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addIndex(['support_engine_id'], 'result_engine_idx');
        $table->addIndex(['target_type', 'target_id'], 'result_target_idx');
        $table->addIndex(['updated'], 'result_updated_idx');
    }

    private function createSupportsTable(): void
    {
        $this->log("  Create: " . self::S_SUPPORTS);
        $table = $this->schema->createTable(self::S_SUPPORTS);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('user_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->addColumn('value', Types::JSON, ['notnull' => false, 'default' => null]);
        $table->addColumn('weight', Types::INTEGER, ['notnull' => true, 'default' => 1]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('support_hash', Types::STRING, ['notnull' => true, 'length' => 64]);
        $table->addColumn('support_engine_id', Types::BIGINT, [
            'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
        ]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_id', 'option_id', 'user_id', 'support_engine_id'], 'agora_uniq_supports');
        $table->addIndex(['inquiry_id'], 'supports_inquiry_idx');
        $table->addIndex(['option_id'], 'supports_option_idx');
        $table->addIndex(['user_id'], 'supports_user_idx');
        $table->addIndex(['support_engine_id'], 'supports_engine_idx');
    }

    private function modifySupportsTable(): void
    {
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
        if (!$table->hasColumn('support_hash')) {
            $table->addColumn('support_hash', Types::STRING, ['notnull' => true, 'length' => 64]);
            $this->log("    + support_hash");
        }

        if (!$table->hasColumn('value_new')) {
            $table->addColumn('value_new', Types::JSON, ['notnull' => false, 'default' => null]);
            $this->valueNewAddedBySchema = true;
            $this->log("    + value_new (new JSON column)");
        } else {
            $this->log("    value_new already exists, skipping");
            $this->valueNewAddedBySchema = false;
        }

        if ($table->hasIndex('agora_uniq_supports')) {
            $table->dropIndex('agora_uniq_supports');
            $this->log("    - dropped old unique index");
        }
        $table->addUniqueIndex(['inquiry_id', 'option_id', 'user_id', 'support_engine_id'], 'agora_uniq_supports');
        $this->log("    + new unique index");
        
        if (!$table->hasIndex('supports_inq_opt_idx')) {
            $table->addIndex(['inquiry_id', 'option_id'], 'supports_inq_opt_idx');
        }
        if (!$table->hasIndex('supports_inq_user_idx')) {
            $table->addIndex(['inquiry_id', 'user_id'], 'supports_inq_user_idx');
        }
        if (!$table->hasIndex('supports_opt_user_idx')) {
            $table->addIndex(['option_id', 'user_id'], 'supports_opt_user_idx');
        }
        if (!$table->hasIndex('supports_engine_idx')) {
            $table->addIndex(['support_engine_id'], 'supports_engine_idx');
        }
        if (!$table->hasIndex('supports_weight_idx')) {
            $table->addIndex(['weight'], 'supports_weight_idx');
        }
        if (!$table->hasIndex('supports_created_idx')) {
            $table->addIndex(['created'], 'supports_created_idx');
        }
        if (!$table->hasIndex('supports_inq_created_idx')) {
            $table->addIndex(['inquiry_id', 'created'], 'supports_inq_created_idx');
        }
        $this->log("    + indices added");
    }

    // ====================================================================
    // CONVERT VALUE COLUMN
    // ====================================================================

    private function convertValueColumnToJson(): void
    {
        $this->log('Converting value column: SMALLINT → JSON');

        try {
            $tableName = $this->getTableNameWithPrefix(self::S_SUPPORTS);

            if ($this->isValueColumnAlreadyJson()) {
                $this->log('  Value column already JSON, skipping');
                return;
            }

            if ($this->isPostgreSQL) {
                $this->convertPostgreSQL($tableName);
            } elseif ($this->isMySQL) {
                $this->convertMySQL($tableName);
            } elseif ($this->isSQLite) {
                $this->convertSQLite($tableName);
            }

            $this->log('  ✅ Value column converted to JSON');

        } catch (\Exception $e) {
            $this->log('  ❌ Conversion failed: ' . $e->getMessage());
            throw $e;
        }
    }

    private function convertPostgreSQL(string $tableName): void
    {
        $this->log('  PostgreSQL conversion...');

        $this->connection->executeStatement(
            "UPDATE " . $this->quoteIdentifier($tableName) . " 
             SET value = 0 
             WHERE value IS NULL"
        );

        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " 
             ALTER COLUMN value TYPE TEXT USING value::text"
        );

        $this->connection->executeStatement(
            "UPDATE " . $this->quoteIdentifier($tableName) . " 
             SET value_new = 
                 CASE 
                     WHEN value ~ '^[0-9]+$' OR value ~ '^-?[0-9]+$' 
                     THEN jsonb_build_object('value', value::int)
                     ELSE '{\"value\":0}'::jsonb
                 END"
        );

        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " DROP COLUMN value"
        );
        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " RENAME COLUMN value_new TO value"
        );
        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " ALTER COLUMN value SET NOT NULL"
        );
        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " ALTER COLUMN value SET DEFAULT '{\"value\":0}'::jsonb"
        );
    }

    private function convertMySQL(string $tableName): void
    {
        $this->log('  MySQL conversion...');

        $this->connection->executeStatement(
            "UPDATE " . $this->quoteIdentifier($tableName) . " SET value_new = 
                CASE 
                    WHEN `value` IS NULL THEN JSON_OBJECT('value', 0)
                    WHEN `value` REGEXP '^-?[0-9]+$' THEN JSON_OBJECT('value', CAST(`value` AS SIGNED))
                    ELSE JSON_OBJECT('value', 0)
                END"
        );

        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " DROP COLUMN `value`"
        );
        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " RENAME COLUMN value_new TO value"
        );
        $this->connection->executeStatement(
            "ALTER TABLE " . $this->quoteIdentifier($tableName) . " MODIFY `value` JSON NOT NULL DEFAULT (JSON_OBJECT('value', 0))"
        );
    }

    private function convertSQLite(string $tableName): void
    {
        $this->log('  SQLite conversion (table rebuild)...');

        $tempTable = $tableName . '_temp';
        $exists = $this->connection->executeQuery(
            "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
            [$tempTable]
        )->fetchOne();
        if ($exists) {
            $this->connection->executeStatement("DROP TABLE \"" . $tempTable . "\"");
        }

        $this->connection->executeStatement(
            "CREATE TABLE \"" . $tempTable . "\" (
                id INTEGER PRIMARY KEY,
                inquiry_id INTEGER NOT NULL DEFAULT 0,
                option_id INTEGER NOT NULL DEFAULT 0,
                user_id TEXT NOT NULL DEFAULT '',
                value TEXT NOT NULL DEFAULT '{\"value\":0}',
                weight INTEGER NOT NULL DEFAULT 1,
                created INTEGER NOT NULL DEFAULT 0,
                updated INTEGER NOT NULL DEFAULT 0,
                support_hash TEXT NOT NULL,
                support_engine_id INTEGER NULL
            )"
        );

        $this->connection->executeStatement(
            "INSERT INTO \"" . $tempTable . "\" 
             (id, inquiry_id, option_id, user_id, weight, created, updated, support_hash, support_engine_id, value)
             SELECT id, inquiry_id, option_id, user_id, weight, created, updated, support_hash, support_engine_id,
                    CASE 
                        WHEN value IS NULL THEN '{\"value\":0}'
                        ELSE '{\"value\":' || COALESCE(CAST(value AS INTEGER), 0) || '}'
                    END
             FROM \"" . $tableName . "\""
        );

        $this->connection->executeStatement("DROP TABLE \"" . $tableName . "\"");
        $this->connection->executeStatement("ALTER TABLE \"" . $tempTable . "\" RENAME TO \"" . $tableName . "\"");
    }

    // ====================================================================
    // INITIALIZE SUPPORT HASHES
    // ====================================================================

    private function initializeSupportHashes(): void
    {
        $this->log('Initializing support_hash for existing records...');

        try {
            $tableName = $this->getTableNameWithPrefix(self::S_SUPPORTS);

            $sql = "SELECT id, inquiry_id, user_id, option_id, support_engine_id 
                    FROM " . $this->quoteIdentifier($tableName) . " 
                    WHERE support_hash IS NULL OR support_hash = ''";
            
            $result = $this->connection->executeQuery($sql);
            $records = [];
            while ($row = $result->fetch()) {
                $records[] = $row;
            }

            if (empty($records)) {
                $this->log('  No records need hash initialization');
                return;
            }

            $this->log('  Found ' . count($records) . ' records to update');

            foreach ($records as $record) {
                $hash = hash('sha256', 
                    $record['inquiry_id'] . '_' . 
                    $record['user_id'] . '_' . 
                    $record['option_id'] . '_' . 
                    ($record['support_engine_id'] ?? '')
                );
                
                $this->connection->executeStatement(
                    "UPDATE " . $this->quoteIdentifier($tableName) . " 
                     SET support_hash = ? 
                     WHERE id = ?",
                    [$hash, $record['id']]
                );
            }

            $this->log('  ✅ support_hash initialized for ' . count($records) . ' records');

        } catch (\Exception $e) {
            $this->log('  ⚠️ Failed to initialize support_hash: ' . $e->getMessage());
        }
    }

    // ====================================================================
    // ADD RESULT UNIQUE INDEX
    // ====================================================================

    private function addResultUniqueIndex(): void
    {
        $this->log('Adding unique index on results table...');
        try {
            $tableName = $this->getTableNameWithPrefix(self::S_RESULTS);
            
            $indexExists = false;
            if ($this->isPostgreSQL) {
                $exists = $this->connection->executeQuery(
                    "SELECT 1 FROM pg_indexes WHERE indexname = 'result_target_uniq'"
                )->fetchOne();
                $indexExists = (bool)$exists;
            } elseif ($this->isMySQL) {
                $exists = $this->connection->executeQuery(
                    "SELECT 1 FROM information_schema.statistics 
                     WHERE table_schema = DATABASE() 
                     AND table_name = ? 
                     AND index_name = 'result_target_uniq'",
                    [$tableName]
                )->fetchOne();
                $indexExists = (bool)$exists;
            } else {
                $exists = $this->connection->executeQuery(
                    "SELECT 1 FROM sqlite_master 
                     WHERE type='index' AND name='result_target_uniq'"
                )->fetchOne();
                $indexExists = (bool)$exists;
            }

            if (!$indexExists) {
                $this->connection->executeStatement(
                    "CREATE UNIQUE INDEX result_target_uniq 
                     ON " . $this->quoteIdentifier($tableName) . " (target_type, target_id, support_engine_id)"
                );
            }
            $this->log('  ✅ result_target_uniq');
        } catch (\Exception $e) {
            $this->log('  ⚠️ Unique index skipped: ' . $e->getMessage());
        }
    }

    // ====================================================================
    // MIGRATE SUPPORTS TO RESULTS
    // ====================================================================

    private function migrateExistingSupportsToResults(): void
    {
        $this->log('Migrating supports to results...');

        try {
            $supportsTable = $this->getTableNameWithPrefix(self::S_SUPPORTS);
            $resultsTable = $this->getTableNameWithPrefix(self::S_RESULTS);
            $inquiriesTable = $this->getTableNameWithPrefix(self::T_INQUIRIES);
            $optionsTable = $this->getTableNameWithPrefix(self::T_OPTIONS);

            $count = $this->connection->executeQuery(
                "SELECT COUNT(*) FROM " . $this->quoteIdentifier($supportsTable)
            )->fetchOne();

            if ((int)$count === 0) {
                $this->log('  No supports found, skipping');
                return;
            }

            $this->log("  Found {$count} supports");

            $sql = "SELECT 
                        s.inquiry_id,
                        s.option_id,
                        i.support_feature as inquiry_feature,
                        o.support_feature as option_feature,
                        COUNT(*) as support_count
                    FROM " . $this->quoteIdentifier($supportsTable) . " s
                    LEFT JOIN " . $this->quoteIdentifier($inquiriesTable) . " i ON s.inquiry_id = i.id
                    LEFT JOIN " . $this->quoteIdentifier($optionsTable) . " o ON s.option_id = o.id
                    WHERE s.support_engine_id IS NULL
                    GROUP BY s.inquiry_id, s.option_id, i.support_feature, o.support_feature
                    ORDER BY s.inquiry_id, s.option_id";

            $result = $this->connection->executeQuery($sql);
            $targets = [];
            while ($row = $result->fetch()) {
                $targets[] = $row;
            }

            $this->log("  Processing " . count($targets) . " targets");

            $inserted = 0;
            foreach ($targets as $target) {
                $inquiryId = (int)$target['inquiry_id'];
                $optionId = (int)$target['option_id'];
                
                if ($optionId > 0 && !empty($target['option_feature'])) {
                    $feature = $target['option_feature'];
                } elseif (!empty($target['inquiry_feature'])) {
                    $feature = $target['inquiry_feature'];
                } else {
                    $feature = 'binary';
                }

                if ($optionId > 0) {
                    $targetType = 'option';
                    $targetId = $optionId;
                } else {
                    $targetType = 'inquiry';
                    $targetId = $inquiryId;
                }

                $exists = $this->connection->executeQuery(
                    "SELECT id FROM " . $this->quoteIdentifier($resultsTable) . " 
                     WHERE target_type = ? AND target_id = ? AND support_engine_id IS NULL",
                    [$targetType, $targetId]
                )->fetchOne();

                if ($exists !== false) {
                    continue;
                }

                $resultData = $this->calculateResult($inquiryId, $optionId, $feature);
                
                if ($resultData !== null) {
                    $this->insertResult($targetType, $targetId, $resultData);
                    $inserted++;
                }
            }

            $this->log("  ✅ Inserted {$inserted} new results");

        } catch (\Exception $e) {
            $this->log('  ❌ Migration failed: ' . $e->getMessage());
            throw $e;
        }
    }

    private function calculateResult(int $inquiryId, int $optionId, string $feature): ?array
    {
        try {
            $tableName = $this->getTableNameWithPrefix(self::S_SUPPORTS);
            
            $sql = "SELECT value, weight FROM " . $this->quoteIdentifier($tableName) . " 
                    WHERE inquiry_id = ? AND option_id = ? AND support_engine_id IS NULL";
            
            $supports = $this->connection->executeQuery($sql, [$inquiryId, $optionId]);
            
            $rows = [];
            while ($row = $supports->fetch()) {
                $rows[] = $row;
            }

            if (empty($rows)) {
                return null;
            }

            $yes = 0;
            $no = 0;
            $abstain = 0;

            foreach ($rows as $support) {
                $value = $this->extractValue($support['value']);
                $weight = (int)($support['weight'] ?? 1);

                if ($value > 0) {
                    $yes += $weight;
                } elseif ($value < 0) {
                    $no += $weight;
                } else {
                    $abstain += $weight;
                }
            }

            $total = $yes + $no;

            if ($feature === 'ternary') {
                $total = $yes + $no + $abstain;
                return [
                    'type' => 'ternary',
                    'totals' => ['yes' => $yes, 'no' => $no, 'abstain' => $abstain],
                    'percentages' => [
                        'yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
                        'no' => $total > 0 ? round(($no / $total) * 100, 2) : 0,
                        'abstain' => $total > 0 ? round(($abstain / $total) * 100, 2) : 0
                    ]
                ];
            }

            return [
                'type' => 'binary',
                'totals' => ['yes' => $yes, 'no' => $no],
                'percentages' => [
                    'yes' => $total > 0 ? round(($yes / $total) * 100, 2) : 0,
                    'no' => $total > 0 ? round(($no / $total) * 100, 2) : 0
                ]
            ];

        } catch (\Exception $e) {
            $this->log('    Error calculating result: ' . $e->getMessage());
            return null;
        }
    }

    private function extractValue($value): int
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return (int)($decoded['value'] ?? 0);
            }
            if (is_numeric($value)) {
                return (int)$value;
            }
            return 0;
        }

        if (is_array($value)) {
            return (int)($value['value'] ?? 0);
        }

        return (int)$value;
    }

    private function insertResult(string $targetType, int $targetId, array $result): void
    {
        $now = time();
        $resultJson = json_encode($result, JSON_UNESCAPED_UNICODE);
        $tableName = $this->getTableNameWithPrefix(self::S_RESULTS);

        $sql = "INSERT INTO " . $this->quoteIdentifier($tableName) . " 
                (support_engine_id, target_type, target_id, result, updated) 
                VALUES (NULL, ?, ?, ?, ?)";

        $this->connection->executeStatement($sql, [$targetType, $targetId, $resultJson, $now]);
    }

    // ====================================================================
    // FIX EMPTY RESULTS - FIXED FOR POSTGRESQL
    // ====================================================================

    private function fixEmptyResults(): void
    {
        $this->log('Fixing empty results...');

        try {
            $tableName = $this->getTableNameWithPrefix(self::S_RESULTS);
            
            // Build platform-specific empty detection
            if ($this->isPostgreSQL) {
                // Fixed: Cast result to text for safe comparison
                $sql = "SELECT id, target_type, target_id FROM " . $this->quoteIdentifier($tableName) . " 
                        WHERE result IS NULL 
                        OR result::text = 'null'
                        OR result::text = '{}'
                        OR result::text = '{\"type\":\"binary\",\"totals\":{\"yes\":0,\"no\":0},\"percentages\":{\"yes\":0,\"no\":0}}'";
            } elseif ($this->isMySQL) {
                $sql = "SELECT id, target_type, target_id FROM " . $this->quoteIdentifier($tableName) . " 
                        WHERE result IS NULL 
                        OR result = '{}' 
                        OR result = '' 
                        OR result = 'null' 
                        OR JSON_LENGTH(result) = 0";
            } else {
                // SQLite - treat as text
                $sql = "SELECT id, target_type, target_id FROM " . $this->quoteIdentifier($tableName) . " 
                        WHERE result IS NULL 
                        OR result = '{}' 
                        OR result = '' 
                        OR result = 'null'";
            }

            $result = $this->connection->executeQuery($sql);
            $emptyResults = [];
            while ($row = $result->fetch()) {
                $emptyResults[] = $row;
            }

            if (empty($emptyResults)) {
                $this->log('  No empty results found');
                return;
            }

            $this->log("  Found " . count($emptyResults) . " empty results");

            foreach ($emptyResults as $empty) {
                $targetType = $empty['target_type'];
                $targetId = (int)$empty['target_id'];

                if ($targetType === 'inquiry') {
                    $feature = $this->getInquiryFeature($targetId);
                } else {
                    $feature = $this->getOptionFeature($targetId);
                }

                $emptyResult = $this->getEmptyResultStructure($feature);
                $resultJson = json_encode($emptyResult, JSON_UNESCAPED_UNICODE);

                $this->connection->executeStatement(
                    "UPDATE " . $this->quoteIdentifier($tableName) . " SET result = ? WHERE id = ?",
                    [$resultJson, $empty['id']]
                );
            }

            $this->log('  ✅ Empty results fixed');

        } catch (\Exception $e) {
            $this->log('  ❌ Failed: ' . $e->getMessage());
        }
    }

    private function getInquiryFeature(int $inquiryId): string
    {
        try {
            $tableName = $this->getTableNameWithPrefix(self::T_INQUIRIES);
            $result = $this->connection->executeQuery(
                "SELECT support_feature FROM " . $this->quoteIdentifier($tableName) . " WHERE id = ?",
                [$inquiryId]
            );
            return $result->fetchOne() ?: 'binary';
        } catch (\Exception $e) {
            return 'binary';
        }
    }

    private function getOptionFeature(int $optionId): string
    {
        try {
            $tableName = $this->getTableNameWithPrefix(self::T_OPTIONS);
            $result = $this->connection->executeQuery(
                "SELECT support_feature FROM " . $this->quoteIdentifier($tableName) . " WHERE id = ?",
                [$optionId]
            );
            return $result->fetchOne() ?: 'binary';
        } catch (\Exception $e) {
            return 'binary';
        }
    }

    private function getEmptyResultStructure(string $type): array
    {
        if ($type === 'ternary') {
            return [
                'type' => 'ternary',
                'totals' => ['yes' => 0, 'no' => 0, 'abstain' => 0],
                'percentages' => ['yes' => 0, 'no' => 0, 'abstain' => 0]
            ];
        }

        return [
            'type' => 'binary',
            'totals' => ['yes' => 0, 'no' => 0],
            'percentages' => ['yes' => 0, 'no' => 0]
        ];
    }

    // ====================================================================
    // ADD INDICES AND FOREIGN KEYS
    // ====================================================================

    private function addIndices(): void
    {
        $this->log('Adding indices...');

        $supportsTable = $this->getTableNameWithPrefix(self::S_SUPPORTS);
        $enginesTable = $this->getTableNameWithPrefix(self::S_ENGINES);

        $indices = [
            ['supports_inq_opt_idx', "CREATE INDEX supports_inq_opt_idx ON " . $this->quoteIdentifier($supportsTable) . " (inquiry_id, option_id)"],
            ['supports_inq_user_idx', "CREATE INDEX supports_inq_user_idx ON " . $this->quoteIdentifier($supportsTable) . " (inquiry_id, user_id)"],
            ['supports_opt_user_idx', "CREATE INDEX supports_opt_user_idx ON " . $this->quoteIdentifier($supportsTable) . " (option_id, user_id)"],
            ['supports_engine_idx', "CREATE INDEX supports_engine_idx ON " . $this->quoteIdentifier($supportsTable) . " (support_engine_id)"],
            ['supports_weight_idx', "CREATE INDEX supports_weight_idx ON " . $this->quoteIdentifier($supportsTable) . " (weight)"],
            ['supports_created_idx', "CREATE INDEX supports_created_idx ON " . $this->quoteIdentifier($supportsTable) . " (created)"],
            ['supports_inq_created_idx', "CREATE INDEX supports_inq_created_idx ON " . $this->quoteIdentifier($supportsTable) . " (inquiry_id, created)"],
            ['engine_inquiry_status_idx', "CREATE INDEX engine_inquiry_status_idx ON " . $this->quoteIdentifier($enginesTable) . " (inquiry_id, status)"],
            ['engine_target_type_idx', "CREATE INDEX engine_target_type_idx ON " . $this->quoteIdentifier($enginesTable) . " (target_type)"],
        ];

        foreach ($indices as [$indexName, $sql]) {
            try {
                $exists = false;
                if ($this->isPostgreSQL) {
                    $exists = (bool)$this->connection->executeQuery(
                        "SELECT 1 FROM pg_indexes WHERE indexname = ?",
                        [$indexName]
                    )->fetchOne();
                } elseif ($this->isMySQL) {
                    $exists = (bool)$this->connection->executeQuery(
                        "SELECT 1 FROM information_schema.statistics 
                         WHERE table_schema = DATABASE() 
                         AND index_name = ?",
                        [$indexName]
                    )->fetchOne();
                } else {
                    $exists = (bool)$this->connection->executeQuery(
                        "SELECT 1 FROM sqlite_master WHERE type='index' AND name = ?",
                        [$indexName]
                    )->fetchOne();
                }

                if (!$exists) {
                    $this->connection->executeStatement($sql);
                }
            } catch (\Exception $e) {
                $this->log('  ⚠️ Could not create index ' . $indexName . ': ' . $e->getMessage());
            }
        }
        $this->log('  ✅ Indices added');
    }

    private function addForeignKeys(): void
    {
        $this->log('Adding foreign keys...');

        $supportsTable = $this->getTableNameWithPrefix(self::S_SUPPORTS);
        $resultsTable = $this->getTableNameWithPrefix(self::S_RESULTS);
        $enginesTable = $this->getTableNameWithPrefix(self::S_ENGINES);

        if (!$this->isSQLite) {
            $fks = [
                'fk_supports_engine' => [
                    'table' => $supportsTable,
                    'constraint' => "ALTER TABLE " . $this->quoteIdentifier($supportsTable) . " 
                     ADD CONSTRAINT fk_supports_engine 
                     FOREIGN KEY (support_engine_id) REFERENCES " . $this->quoteIdentifier($enginesTable) . "(id) ON DELETE SET NULL"
                ],
                'fk_results_engine' => [
                    'table' => $resultsTable,
                    'constraint' => "ALTER TABLE " . $this->quoteIdentifier($resultsTable) . " 
                     ADD CONSTRAINT fk_results_engine 
                     FOREIGN KEY (support_engine_id) REFERENCES " . $this->quoteIdentifier($enginesTable) . "(id) ON DELETE SET NULL"
                ],
            ];

            foreach ($fks as $fkName => $fkData) {
                try {
                    $exists = false;
                    if ($this->isPostgreSQL) {
                        $exists = (bool)$this->connection->executeQuery(
                            "SELECT 1 FROM information_schema.table_constraints 
                             WHERE constraint_name = ? AND table_name = ?",
                            [$fkName, $fkData['table']]
                        )->fetchOne();
                    } elseif ($this->isMySQL) {
                        $exists = (bool)$this->connection->executeQuery(
                            "SELECT 1 FROM information_schema.table_constraints 
                             WHERE constraint_name = ? AND table_name = ?",
                            [$fkName, $fkData['table']]
                        )->fetchOne();
                    }

                    if (!$exists) {
                        $this->connection->executeStatement($fkData['constraint']);
                    }
                } catch (\Exception $e) {
                    $this->log('  ⚠️ Could not add foreign key ' . $fkName . ': ' . $e->getMessage());
                }
            }
            $this->log('  ✅ Foreign keys added');
        } else {
            $this->log('  ⚠️ Foreign keys skipped for SQLite');
        }
    }

    private function isValueColumnAlreadyJsonInSchema(): bool
    {
        try {
            if (!$this->schema->hasTable(self::S_SUPPORTS)) {
                return false;
            }
            $table = $this->schema->getTable(self::S_SUPPORTS);
            if (!$table->hasColumn('value')) {
                return false;
            }
            $column = $table->getColumn('value');
            $type = $column->getType()->getName();
            return $type === Types::JSON || $type === 'jsonb';
        } catch (\Exception $e) {
            return false;
        }
    }

    private function isValueColumnAlreadyJson(): bool
    {
        try {
            $tableName = $this->getTableNameWithPrefix(self::S_SUPPORTS);
            
            if ($this->isPostgreSQL) {
                $type = $this->connection->executeQuery(
                    "SELECT data_type FROM information_schema.columns 
                     WHERE table_name = ? AND column_name = 'value'",
                    [$tableName]
                )->fetchOne();
                return $type === 'jsonb' || $type === 'json';
            } elseif ($this->isMySQL) {
                $type = $this->connection->executeQuery(
                    "SELECT data_type FROM information_schema.columns 
                     WHERE table_name = ? AND column_name = 'value'",
                    [$tableName]
                )->fetchOne();
                return $type === 'json';
            } else {
                $sql = "SELECT type FROM pragma_table_info(?) WHERE name = 'value'";
                $type = $this->connection->executeQuery($sql, [$tableName])->fetchOne();
                return $type === 'TEXT';
            }
        } catch (\Exception $e) {
            return false;
        }
    }

    private function getTableNameWithPrefix(string $table): string
    {
        try {
            $schema = $this->connection->createSchema();
            
            foreach ($schema->getTables() as $t) {
                if (str_ends_with($t->getName(), $table)) {
                    return $t->getName();
                }
            }
            
            foreach ($schema->getTables() as $t) {
                if ($t->getShortestName($schema->getName()) === $table) {
                    return $t->getName();
                }
            }
            
            return $table;
        } catch (\Exception $e) {
            return $table;
        }
    }

    private function quoteIdentifier(string $identifier): string
    {
        if ($this->isMySQL) {
            return '`' . str_replace('`', '``', $identifier) . '`';
        } else {
            return '"' . str_replace('"', '""', $identifier) . '"';
        }
    }

    private function log(string $msg): void
    {
        if ($this->output) {
            $this->output->info('Agora 1.7.5 - ' . $msg);
        }
    }
}
