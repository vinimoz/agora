<?php

declare(strict_types=1);

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\MySQLPlatform;
use Doctrine\DBAL\Platforms\PostgreSQLPlatform;
use Doctrine\DBAL\Platforms\SqlitePlatform;
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
    private bool $isSQLite = false;
    private ?IDBConnection $connection = null;

    private const T_SUPPORTS = 'oc_agora_supports';
    private const T_ENGINES = 'oc_agora_support_engines';
    private const T_RESULTS = 'oc_agora_support_results';
    private const T_INQUIRIES = 'oc_agora_inquiries';
    private const T_OPTIONS = 'oc_agora_options';

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
        $this->isSQLite = $platform instanceof SqlitePlatform;

        $this->log('Agora 1.7.5 - Schema migration');
        $this->log('Platform: ' . ($this->isMySQL ? 'MySQL' : ($this->isPostgreSQL ? 'PostgreSQL' : 'SQLite')));

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

        try {
            // 1. Add unique index on results FIRST
            $this->addResultUniqueIndex();

            // 2. Convert value column from SMALLINT to JSON
            $this->convertValueColumnToJson();

            // 3. Migrate existing supports to results
            $this->migrateExistingSupportsToResults();

            // 4. Fix empty results
            $this->fixEmptyResults();

            // 5. Add indices
            $this->addIndices();

            // 6. Add foreign keys
            $this->addForeignKeys();

            $this->log('✅ Migration complete successfully!');
        } catch (\Exception $e) {
            $this->log('❌ ERROR: ' . $e->getMessage());
            $this->log('Stack trace: ' . $e->getTraceAsString());
            throw $e;
        }
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

    private function createResultTable(): void
    {
        if ($this->schema->hasTable(self::S_RESULTS)) {
            $this->log("  Skip: " . self::S_RESULTS . " exists");
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
            
            // Drop old unique index and create new one with support_engine_id
            if ($table->hasIndex('agora_uniq_supports')) {
                $table->dropIndex('agora_uniq_supports');
            }
            $table->addUniqueIndex(['inquiry_id', 'option_id', 'user_id', 'support_engine_id'], 'agora_uniq_supports');
            
        } else {
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
        }
    }

    // ====================================================================
    // POST-SCHEMA: Convert value column
    // ====================================================================

    private function convertValueColumnToJson(): void
    {
        $this->log('Converting value column: SMALLINT → JSON');

        try {
            $tableName = self::T_SUPPORTS;

            // Check if already converted
            if ($this->isValueColumnAlreadyJson($tableName)) {
                $this->log('  Value column already JSON, skipping');
                return;
            }

            // Check if value_new column exists from previous failed migration
            $columns = $this->getTableColumns($tableName);
            if (in_array('value_new', $columns)) {
                $this->log('  Cleaning up value_new column from previous attempt');
                $this->dropColumnIfExists($tableName, 'value_new');
            }

            if ($this->isPostgreSQL) {
                $this->convertPostgreSQL($tableName);
            } elseif ($this->isMySQL) {
                $this->convertMySQL($tableName);
            } elseif ($this->isSQLite) {
                $this->convertSQLite($tableName);
            }

            $this->log('  ✅ Value column converted to {\"value\": N}');

        } catch (\Exception $e) {
            $this->log('  ❌ Conversion failed: ' . $e->getMessage());
            throw $e;
        }
    }

    private function isValueColumnAlreadyJson(string $tableName): bool
    {
        try {
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
            }
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function getTableColumns(string $tableName): array
    {
        try {
            if ($this->isPostgreSQL || $this->isMySQL) {
                $result = $this->connection->executeQuery(
                    "SELECT column_name FROM information_schema.columns 
                     WHERE table_name = ?",
                    [$tableName]
                );
                return $result->fetchFirstColumn();
            } else {
                // SQLite
                $result = $this->connection->executeQuery(
                    "PRAGMA table_info(" . $tableName . ")"
                );
                $columns = [];
                while ($row = $result->fetchAssociative()) {
                    $columns[] = $row['name'];
                }
                return $columns;
            }
        } catch (\Exception $e) {
            return [];
        }
    }

    private function dropColumnIfExists(string $tableName, string $columnName): void
    {
        try {
            if ($this->isPostgreSQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE \"" . $tableName . "\" DROP COLUMN IF EXISTS " . $columnName
                );
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "ALTER TABLE `" . $tableName . "` DROP COLUMN IF EXISTS `" . $columnName . "`"
                );
            }
        } catch (\Exception $e) {
            // Ignore - column probably doesn't exist
        }
    }

    private function convertPostgreSQL(string $tableName): void
    {
        $this->log('  PostgreSQL conversion...');

        // Step 1: Convert to TEXT first
        $this->connection->executeStatement(
            "ALTER TABLE \"" . $tableName . "\" ALTER COLUMN value TYPE TEXT USING value::text"
        );

        // Step 2: Add new JSONB column
        $this->connection->executeStatement(
            "ALTER TABLE \"" . $tableName . "\" ADD COLUMN value_new JSONB"
        );

        // Step 3: Convert data
        $this->connection->executeStatement(
            "UPDATE \"" . $tableName . "\" SET value_new = 
                CASE 
                    WHEN value IS NULL OR value = '' THEN '{\"value\":0}'::jsonb
                    WHEN value ~ '^[0-9]+$' OR value ~ '^-?[0-9]+$' THEN jsonb_build_object('value', value::int)
                    ELSE value::jsonb
                END"
        );

        // Step 4: Drop old column and rename
        $this->connection->executeStatement(
            "ALTER TABLE \"" . $tableName . "\" DROP COLUMN value"
        );
        $this->connection->executeStatement(
            "ALTER TABLE \"" . $tableName . "\" RENAME COLUMN value_new TO value"
        );
        $this->connection->executeStatement(
            "ALTER TABLE \"" . $tableName . "\" ALTER COLUMN value SET NOT NULL"
        );
        $this->connection->executeStatement(
            "ALTER TABLE \"" . $tableName . "\" ALTER COLUMN value SET DEFAULT '{\"value\":0}'::jsonb"
        );
    }

    private function convertMySQL(string $tableName): void
    {
        $this->log('  MySQL conversion...');

        $this->connection->executeStatement("ALTER TABLE `" . $tableName . "` ADD COLUMN value_new JSON");

        $this->connection->executeStatement(
            "UPDATE `" . $tableName . "` SET value_new = 
                CASE 
                    WHEN `value` IS NULL THEN JSON_OBJECT('value', 0)
                    WHEN JSON_VALID(`value`) AND JSON_TYPE(`value`) = 'OBJECT' AND JSON_CONTAINS_PATH(`value`, 'one', '$.value') THEN `value`
                    WHEN JSON_VALID(`value`) AND JSON_TYPE(`value`) = 'INTEGER' THEN JSON_OBJECT('value', JSON_EXTRACT(`value`, '$'))
                    ELSE JSON_OBJECT('value', CAST(`value` AS SIGNED))
                END"
        );

        $this->connection->executeStatement("ALTER TABLE `" . $tableName . "` DROP COLUMN `value`");
        $this->connection->executeStatement("ALTER TABLE `" . $tableName . "` RENAME COLUMN value_new TO value");
        $this->connection->executeStatement("ALTER TABLE `" . $tableName . "` MODIFY `value` JSON NOT NULL DEFAULT (JSON_OBJECT('value', 0))");
    }

    private function convertSQLite(string $tableName): void
    {
        $this->log('  SQLite conversion (table rebuild)...');

        // Create temp table
        $this->connection->executeStatement("CREATE TABLE \"{$tableName}_temp\" (
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
        )");

        // Try with JSON functions, fallback if not available
        try {
            $this->connection->executeStatement(
                "INSERT INTO \"{$tableName}_temp\" (id, inquiry_id, option_id, user_id, weight, created, updated, support_hash, support_engine_id, value)
                 SELECT id, inquiry_id, option_id, user_id, weight, created, updated, support_hash, support_engine_id,
                        CASE 
                            WHEN value IS NULL THEN '{\"value\":0}'
                            WHEN json_type(value) = 'object' AND json_extract(value, '$.value') IS NOT NULL THEN value
                            WHEN json_type(value) = 'integer' THEN json_object('value', json_extract(value, '$'))
                            ELSE '{\"value\":0}'
                        END
                 FROM \"$tableName\""
            );
        } catch (\Exception $e) {
            $this->log('  JSON functions not available, using fallback');
            $this->connection->executeStatement(
                "INSERT INTO \"{$tableName}_temp\" (id, inquiry_id, option_id, user_id, weight, created, updated, support_hash, support_engine_id, value)
                 SELECT id, inquiry_id, option_id, user_id, weight, created, updated, support_hash, support_engine_id,
                        '{\"value\":' || COALESCE(value, 0) || '}'
                 FROM \"$tableName\""
            );
        }

        $this->connection->executeStatement("DROP TABLE \"$tableName\"");
        $this->connection->executeStatement("ALTER TABLE \"{$tableName}_temp\" RENAME TO \"$tableName\"");
    }

    // ====================================================================
    // POST-SCHEMA: Migrate supports to results
    // ====================================================================

    private function migrateExistingSupportsToResults(): void
    {
        $this->log('Migrating supports to results...');

        try {
            // First, check if we have supports
            $count = $this->connection->executeQuery(
                "SELECT COUNT(*) FROM \"" . self::T_SUPPORTS . "\""
            )->fetchOne();

            if ((int)$count === 0) {
                $this->log('  No supports found, skipping');
                return;
            }

            $this->log("  Found {$count} supports");

            // Get all distinct targets with their support types
            $targets = $this->connection->executeQuery(
                "SELECT 
                    s.inquiry_id,
                    s.option_id,
                    i.support_feature as inquiry_feature,
                    o.support_feature as option_feature,
                    COUNT(*) as support_count
                FROM \"" . self::T_SUPPORTS . "\" s
                LEFT JOIN \"" . self::T_INQUIRIES . "\" i ON s.inquiry_id = i.id
                LEFT JOIN \"" . self::T_OPTIONS . "\" o ON s.option_id = o.id
                WHERE s.support_engine_id IS NULL
                GROUP BY s.inquiry_id, s.option_id, i.support_feature, o.support_feature
                ORDER BY s.inquiry_id, s.option_id"
            )->fetchAllAssociative();

            $this->log("  Processing " . count($targets) . " targets");

            $inserted = 0;
            foreach ($targets as $target) {
                $inquiryId = (int)$target['inquiry_id'];
                $optionId = (int)$target['option_id'];
                
                // Determine support feature
                if ($optionId > 0 && $target['option_feature']) {
                    $feature = $target['option_feature'];
                } elseif ($target['inquiry_feature']) {
                    $feature = $target['inquiry_feature'];
                } else {
                    $feature = 'binary';
                }

                // Determine target type and ID
                if ($optionId > 0) {
                    $targetType = 'option';
                    $targetId = $optionId;
                } else {
                    $targetType = 'inquiry';
                    $targetId = $inquiryId;
                }

                // Check if result already exists
                $exists = $this->connection->executeQuery(
                    "SELECT id FROM \"" . self::T_RESULTS . "\" 
                     WHERE target_type = ? AND target_id = ? AND support_engine_id IS NULL",
                    [$targetType, $targetId]
                )->fetchOne();

                if ($exists !== false) {
                    continue;
                }

                // Calculate result
                $result = $this->calculateResult($inquiryId, $optionId, $feature);
                
                if ($result !== null) {
                    $this->insertResult($targetType, $targetId, $result);
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
            $supports = $this->connection->executeQuery(
                "SELECT value, weight FROM \"" . self::T_SUPPORTS . "\" 
                 WHERE inquiry_id = ? AND option_id = ? AND support_engine_id IS NULL",
                [$inquiryId, $optionId]
            )->fetchAllAssociative();

            if (empty($supports)) {
                return null;
            }

            $yes = 0;
            $no = 0;
            $abstain = 0;

            foreach ($supports as $support) {
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

        if ($this->isPostgreSQL) {
            $this->connection->executeStatement(
                "INSERT INTO \"" . self::T_RESULTS . "\" 
                 (support_engine_id, target_type, target_id, result, updated) 
                 VALUES (NULL, ?, ?, ?::json, ?)",
                [$targetType, $targetId, $resultJson, $now]
            );
        } elseif ($this->isMySQL) {
            $this->connection->executeStatement(
                "INSERT INTO `" . self::T_RESULTS . "` 
                 (support_engine_id, target_type, target_id, result, updated) 
                 VALUES (NULL, ?, ?, ?, ?)",
                [$targetType, $targetId, $resultJson, $now]
            );
        } else {
            $this->connection->executeStatement(
                "INSERT INTO \"" . self::T_RESULTS . "\" 
                 (support_engine_id, target_type, target_id, result, updated) 
                 VALUES (NULL, ?, ?, ?, ?)",
                [$targetType, $targetId, $resultJson, $now]
            );
        }
    }

    // ====================================================================
    // POST-SCHEMA: Fix empty results
    // ====================================================================

    private function fixEmptyResults(): void
    {
        $this->log('Fixing empty results...');

        try {
            $sql = "SELECT id, target_type, target_id FROM \"" . self::T_RESULTS . "\" WHERE ";
            if ($this->isPostgreSQL) {
                $sql .= "result::text = '{}' OR result IS NULL";
            } elseif ($this->isMySQL) {
                $sql .= "result = '{}' OR result IS NULL OR result = ''";
            } else {
                $sql .= "result = '{}' OR result IS NULL OR result = ''";
            }

            $emptyResults = $this->connection->executeQuery($sql)->fetchAllAssociative();

            if (empty($emptyResults)) {
                $this->log('  No empty results found');
                return;
            }

            $this->log("  Found " . count($emptyResults) . " empty results");

            foreach ($emptyResults as $empty) {
                $targetType = $empty['target_type'];
                $targetId = (int)$empty['target_id'];

                // Determine feature
                if ($targetType === 'inquiry') {
                    $feature = $this->getInquiryFeature($targetId);
                } else {
                    $feature = $this->getOptionFeature($targetId);
                }

                $emptyResult = $this->getEmptyResultStructure($feature);
                $resultJson = json_encode($emptyResult, JSON_UNESCAPED_UNICODE);

                $this->connection->executeStatement(
                    "UPDATE \"" . self::T_RESULTS . "\" SET result = ? WHERE id = ?",
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
            $result = $this->connection->executeQuery(
                "SELECT support_feature FROM \"" . self::T_INQUIRIES . "\" WHERE id = ?",
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
            $result = $this->connection->executeQuery(
                "SELECT support_feature FROM \"" . self::T_OPTIONS . "\" WHERE id = ?",
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
    // UTILITIES
    // ====================================================================

    private function addResultUniqueIndex(): void
    {
        $this->log('Adding unique index on results table...');
        try {
            if ($this->isPostgreSQL) {
                $exists = $this->connection->executeQuery(
                    "SELECT indexname FROM pg_indexes WHERE indexname = 'result_target_uniq'"
                )->fetchOne();
                if (!$exists) {
                    $this->connection->executeStatement(
                        "CREATE UNIQUE INDEX result_target_uniq 
                         ON \"" . self::T_RESULTS . "\" (target_type, target_id, support_engine_id)"
                    );
                }
            } elseif ($this->isMySQL) {
                $this->connection->executeStatement(
                    "CREATE UNIQUE INDEX IF NOT EXISTS result_target_uniq 
                     ON `" . self::T_RESULTS . "` (target_type, target_id, support_engine_id)"
                );
            } else {
                $exists = $this->connection->executeQuery(
                    "SELECT name FROM sqlite_master WHERE type='index' AND name='result_target_uniq'"
                )->fetchOne();
                if (!$exists) {
                    $this->connection->executeStatement(
                        "CREATE UNIQUE INDEX result_target_uniq 
                         ON \"" . self::T_RESULTS . "\" (target_type, target_id, support_engine_id)"
                    );
                }
            }
            $this->log('  ✅ result_target_uniq');
        } catch (\Exception $e) {
            $this->log('  ⚠️ Unique index skipped: ' . $e->getMessage());
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
                // Skip if exists
            }
        }
        $this->log('  ✅ Indices added');
    }

    private function addForeignKeys(): void
    {
        $this->log('Adding foreign keys...');

        $fks = [
            "ALTER TABLE \"" . self::T_SUPPORTS . "\" ADD CONSTRAINT IF NOT EXISTS fk_supports_engine FOREIGN KEY (support_engine_id) REFERENCES \"" . self::T_ENGINES . "\"(id) ON DELETE SET NULL",
            "ALTER TABLE \"" . self::T_RESULTS . "\" ADD CONSTRAINT IF NOT EXISTS fk_results_engine FOREIGN KEY (support_engine_id) REFERENCES \"" . self::T_ENGINES . "\"(id) ON DELETE SET NULL",
        ];

        foreach ($fks as $sql) {
            try {
                $this->connection->executeStatement($sql);
            } catch (\Exception $e) {
                // Skip if exists
            }
        }
        $this->log('  ✅ Foreign keys added');
    }

    private function log(string $msg): void
    {
        if ($this->output) {
            $this->output->info('Agora 1.7.5 - ' . $msg);
        }
    }
}
