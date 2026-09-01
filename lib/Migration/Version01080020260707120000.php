<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Platforms\MySQLPlatform;
use Doctrine\DBAL\Platforms\PostgreSQLPlatform;
use Doctrine\DBAL\Platforms\SqlitePlatform;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Migration to add Sortition/Lottery system and new visibility system (version 1.8.0)
 * 
 * Creates:
 * - agora_participation (who can participate)
 * - agora_group_relations (generic group relations for visibility, participation, etc.)
 * - agora_user_relations (generic user relations for visibility, participation, etc.)
 * - agora_lottery_run (executions)
 * - agora_lottery_selection (who was selected)
 * 
 * Modifies:
 * - agora_inquiries: Adds visibility, publication_status columns (replaces 'access')
 * - agora_inq_group: Adds visibility, publication_status columns
 * - agora_options: Adds visibility, publication_status columns
 * 
 * Old access values mapping (for existing data):
 * - 'open'    -> visibility: 'everyone', publication_status: 'published'
 * - 'public'  -> visibility: 'everyone', publication_status: 'published'
 * - 'private' -> visibility: 'private',  publication_status: 'draft'
 * - 'moderate'-> visibility: 'private',  publication_status: 'pending'
 * - 'hidden'  -> visibility: 'private',  publication_status: 'draft'
 * - 'restricted' -> visibility: 'groups', publication_status: 'draft'
 */
class Version01080020260707120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;
    private bool $isMySQL = false;
    private bool $isPostgreSQL = false;
    private bool $isSQLite = false;
    private ?IDBConnection $connection = null;
    
    private const S_PARTICIPATION = 'agora_participation';
    private const S_LOTTERY_RUN = 'agora_lottery_run';
    private const S_LOTTERY_SELECTION = 'agora_lottery_selection';
    private const S_INQUIRIES = 'agora_inquiries';
    private const S_INQUIRIES_GROUP = 'agora_inq_group';
    private const S_OPTIONS = 'agora_options';
    private const S_GROUP_RELATIONS = 'agora_group_relations';
    private const S_USER_RELATIONS = 'agora_user_relations';
    private const S_TRENDING_SCORES = 'agora_trending_scores';

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

        $this->log('Agora 1.8.0 - Adding Sortition/Lottery and visibility systems');
        $this->log('Platform: ' . ($this->isMySQL ? 'MySQL' : ($this->isPostgreSQL ? 'PostgreSQL' : 'SQLite')));
        
        // Create/modify tables
        $this->modifyInquiriesTable();
        $this->modifyInquiryGroupsTable();
        $this->modifyOptionsTable();
        
        // Create new tables
        $this->createGroupRelationsTable();
        $this->createUserRelationsTable();
        $this->createParticipationTable();
        $this->createLotteryRunTable();
        $this->createLotterySelectionTable();
	$this->createTrendingScoresTable();

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

        $this->log('POST-SCHEMA: Converting access data, adding indices and foreign keys...');

        try {
            // Convert access column data to new visibility system (for existing inquiries)
            $this->convertAccessColumn();

            // Add indices and foreign keys
            $this->addIndices();
            $this->addForeignKeys();

            // Drop the old access column after data conversion
            $this->dropAccessColumn();

            $this->log('✅ Migration complete successfully!');
        } catch (\Exception $e) {
            $this->log('❌ ERROR: ' . $e->getMessage());
            throw $e;
        }
    }

    // ====================================================================
    // TABLE MODIFICATIONS - Add new columns
    // ====================================================================

    private function modifyInquiriesTable(): void
    {
        $this->log("  Modification: " . self::S_INQUIRIES);
        if ($this->schema->hasTable(self::S_INQUIRIES)) {
            $table = $this->schema->getTable(self::S_INQUIRIES);
            
            // Add visibility column
            if (!$table->hasColumn('visibility')) {
                $table->addColumn('visibility', Types::STRING, [
                    'notnull' => true,
                    'default' => 'private',
                    'length' => 50,
                ]);
            }
            
            // Add publication_status column
            if (!$table->hasColumn('publication_status')) {
                $table->addColumn('publication_status', Types::STRING, [
                    'notnull' => true,
                    'default' => 'draft',
                    'length' => 50,
                ]);
            }

            $this->log("    ✓ Added visibility, publication_status columns");
        }
    }

    private function modifyInquiryGroupsTable(): void
    {
        $this->log("  Modification: " . self::S_INQUIRIES_GROUP);
        if ($this->schema->hasTable(self::S_INQUIRIES_GROUP)) {
            $table = $this->schema->getTable(self::S_INQUIRIES_GROUP);
            
            if (!$table->hasColumn('visibility')) {
                $table->addColumn('visibility', Types::STRING, [
                    'notnull' => true,
                    'default' => 'everyone',
                    'length' => 50,
                ]);
            }

            if (!$table->hasColumn('publication_status')) {
                $table->addColumn('publication_status', Types::STRING, [
                    'notnull' => true,
                    'default' => 'draft',
                    'length' => 50,
                ]);
            }

            $this->log("    ✓ Added visibility, publication_status columns");
        }
    }

    private function modifyOptionsTable(): void
    {
        $this->log("  Modification: " . self::S_OPTIONS);
        if ($this->schema->hasTable(self::S_OPTIONS)) {
            $table = $this->schema->getTable(self::S_OPTIONS);
            
            if (!$table->hasColumn('visibility')) {
                $table->addColumn('visibility', Types::STRING, [
                    'notnull' => true,
                    'default' => 'everyone',
                    'length' => 50,
                ]);
            }

            if (!$table->hasColumn('publication_status')) {
                $table->addColumn('publication_status', Types::STRING, [
                    'notnull' => true,
                    'default' => 'draft',
                    'length' => 50,
                ]);
            }

            $this->log("    ✓ Added visibility, publication_status columns");
        }
    }

    // ====================================================================
    // TABLE CREATION
    // ====================================================================

    private function createTrendingScoresTable(): void
{
    if ($this->schema->hasTable(self::S_TRENDING_SCORES)) {
        return;
    }

    $this->log("  Create: " . self::S_TRENDING_SCORES);
    $table = $this->schema->createTable(self::S_TRENDING_SCORES);

    $table->addColumn('id', Types::BIGINT, [
        'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
    ]);
    $table->addColumn('inquiry_id', Types::BIGINT, [
        'notnull' => true, 'unsigned' => true, 'length' => 20
    ]);
    $table->addColumn('option_id', Types::BIGINT, [
        'notnull' => true, 'unsigned' => true, 'length' => 20,
        'default' => 0
    ]);
    $table->addColumn('score', Types::FLOAT, [
        'notnull' => true, 'default' => 0
    ]);
    $table->addColumn('updated_at', Types::BIGINT, [
        'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
    ]);

    $table->setPrimaryKey(['id']);
    $table->addUniqueIndex(
        ['inquiry_id', 'option_id'],
        'trending_inquiry_option_unique'
    );
    $table->addIndex(['inquiry_id'], 'trending_inquiry_idx');
    $table->addIndex(['score'], 'trending_score_idx');
    $table->addIndex(['updated_at'], 'trending_updated_idx');

    // Add foreign key to inquiries table
    if (!$this->isSQLite) {
        $this->log("    ✓ Adding foreign key to inquiries");
    }

    $this->addIndexIfNotExists(self::S_TRENDING_SCORES, 'trending_inquiry_idx', ['inquiry_id']);
    $this->addIndexIfNotExists(self::S_TRENDING_SCORES, 'trending_score_idx', ['score']);
    $this->addIndexIfNotExists(self::S_TRENDING_SCORES, 'trending_updated_idx', ['updated_at']);

    $this->log('  ✓ Indices added');

    $this->log("  ✓ Table created");
}


    private function createGroupRelationsTable(): void
    {
        if ($this->schema->hasTable(self::S_GROUP_RELATIONS)) {
            return;
        }

        $this->log("  Create: " . self::S_GROUP_RELATIONS . " (generic group relations table)");
        $table = $this->schema->createTable(self::S_GROUP_RELATIONS);

        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, [
            'notnull' => true, 'length' => 50
        ]);
        $table->addColumn('target_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('relation_type', Types::STRING, [
            'notnull' => true, 'length' => 50
        ]);
        $table->addColumn('group_id', Types::STRING, [
            'notnull' => true, 'length' => 255
        ]);
        $table->addColumn('created_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('metadata', Types::JSON, [
            'notnull' => false, 'default' => null
        ]);

        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['target_type', 'target_id', 'relation_type', 'group_id'], 'group_relation_unique');
        $table->addIndex(['target_type', 'target_id'], 'group_relation_target_idx');
        $table->addIndex(['relation_type'], 'group_relation_type_idx');
        $table->addIndex(['group_id'], 'group_relation_group_idx');

        $this->log("  ✓ Table created");
    }

    private function createUserRelationsTable(): void
    {
        if ($this->schema->hasTable(self::S_USER_RELATIONS)) {
            return;
        }

        $this->log("  Create: " . self::S_USER_RELATIONS . " (generic user relations table)");
        $table = $this->schema->createTable(self::S_USER_RELATIONS);

        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, [
            'notnull' => true, 'length' => 50
        ]);
        $table->addColumn('target_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('relation_type', Types::STRING, [
            'notnull' => true, 'length' => 50
        ]);
        $table->addColumn('user_id', Types::STRING, [
            'notnull' => true, 'length' => 255
        ]);
        $table->addColumn('created_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('metadata', Types::JSON, [
            'notnull' => false, 'default' => null
        ]);

        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['target_type', 'target_id', 'relation_type', 'user_id'], 'user_relation_unique');
        $table->addIndex(['target_type', 'target_id'], 'user_relation_target_idx');
        $table->addIndex(['relation_type'], 'user_relation_type_idx');
        $table->addIndex(['user_id'], 'user_relation_user_idx');

        $this->log("  ✓ Table created");
    }

    private function createParticipationTable(): void
    {
        if ($this->schema->hasTable(self::S_PARTICIPATION)) {
            return;
        }

        $this->log("  Create: " . self::S_PARTICIPATION);
        $table = $this->schema->createTable(self::S_PARTICIPATION);

        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('target_type', Types::STRING, [
            'notnull' => true, 'length' => 50
        ]);
        $table->addColumn('target_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('policy_type', Types::STRING, [
            'notnull' => true, 'default' => 'everyone', 'length' => 50
        ]);
        $table->addColumn('policy_config', Types::JSON, [
            'notnull' => false,
            'default' => null,
        ]);
        $table->addColumn('created_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('updated_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('created_by', Types::STRING, [
            'notnull' => false, 'default' => null, 'length' => 256
        ]);

        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['target_type', 'target_id'], 'participation_unique_target');

        $this->log("  ✓ Table created");
    }

    private function createLotteryRunTable(): void
    {
        if ($this->schema->hasTable(self::S_LOTTERY_RUN)) {
            return;
        }

        $this->log("  Create: " . self::S_LOTTERY_RUN);
        $table = $this->schema->createTable(self::S_LOTTERY_RUN);

        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('participation_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('seed', Types::STRING, [
            'notnull' => false, 'default' => null, 'length' => 255
        ]);
        $table->addColumn('status', Types::STRING, [
            'notnull' => true, 'default' => 'pending', 'length' => 32
        ]);
        $table->addColumn('pool_size', Types::INTEGER, [
            'notnull' => true, 'default' => 0
        ]);
        $table->addColumn('selection_count', Types::INTEGER, [
            'notnull' => true, 'default' => 0
        ]);
        $table->addColumn('result_summary', Types::JSON, [
            'notnull' => false, 'default' => null
        ]);
        $table->addColumn('created_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('completed_at', Types::BIGINT, [
            'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('metadata', Types::JSON, [
            'notnull' => false, 'default' => null
        ]);

        $table->setPrimaryKey(['id']);
        $table->addIndex(['participation_id'], 'run_participation_idx');

        $this->log("  ✓ Table created");
    }

    private function createLotterySelectionTable(): void
    {
        if ($this->schema->hasTable(self::S_LOTTERY_SELECTION)) {
            return;
        }

        $this->log("  Create: " . self::S_LOTTERY_SELECTION);
        $table = $this->schema->createTable(self::S_LOTTERY_SELECTION);

        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('participation_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('run_id', Types::BIGINT, [
            'notnull' => true, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('selected_user_id', Types::STRING, [
            'notnull' => false, 'default' => null, 'length' => 256
        ]);
        $table->addColumn('selected_group_id', Types::STRING, [
            'notnull' => false, 'default' => null, 'length' => 256
        ]);
        $table->addColumn('rank', Types::INTEGER, [
            'notnull' => true, 'default' => 0
        ]);
        $table->addColumn('role', Types::STRING, [
            'notnull' => false, 'default' => null, 'length' => 50
        ]);
        $table->addColumn('status', Types::STRING, [
            'notnull' => true, 'default' => 'pending', 'length' => 32
        ]);
        $table->addColumn('selected_at', Types::BIGINT, [
            'notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('expires_at', Types::BIGINT, [
            'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('accepted_at', Types::BIGINT, [
            'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20
        ]);
        $table->addColumn('metadata', Types::JSON, [
            'notnull' => false, 'default' => null
        ]);

        $table->setPrimaryKey(['id']);
        $table->addIndex(['participation_id'], 'selection_participation_idx');
        $table->addIndex(['run_id'], 'selection_run_idx');
        $table->addIndex(['selected_user_id'], 'selection_user_idx');
        $table->addIndex(['status'], 'selection_status_idx');

        $this->log("  ✓ Table created");
    }

    // ====================================================================
    // POST-SCHEMA: Data Conversion (only for existing 'access' column)
    // ====================================================================

    private function convertAccessColumn(): void
    {
        $this->log('Converting access column data...');

        // Check if access column exists in inquiries table
        if (!$this->columnExists(self::S_INQUIRIES, 'access')) {
            $this->log('  ⚠️ access column does not exist in ' . self::S_INQUIRIES . ' - skipping conversion');
            return;
        }

        // Mapping: access -> (visibility, publication_status)
        $mappings = [
            'open' => ['visibility' => 'everyone', 'publication_status' => 'published'],
            'public' => ['visibility' => 'everyone', 'publication_status' => 'published'],
            'private' => ['visibility' => 'private', 'publication_status' => 'draft'],
            'moderate' => ['visibility' => 'private', 'publication_status' => 'pending'],
            'hidden' => ['visibility' => 'private', 'publication_status' => 'draft'],
            'restricted' => ['visibility' => 'groups', 'publication_status' => 'draft'],
        ];

        // Convert inquiries
        $this->convertTableAccess(self::S_INQUIRIES, $mappings);

        // Convert inquiry groups
        if ($this->columnExists(self::S_INQUIRIES_GROUP, 'access')) {
            $this->convertTableAccess(self::S_INQUIRIES_GROUP, $mappings);
        }

        // Convert options
        if ($this->columnExists(self::S_OPTIONS, 'access')) {
            $this->convertTableAccess(self::S_OPTIONS, $mappings);
        }

        $this->log('  ✓ Access data converted');
    }

    private function convertTableAccess(string $tableName, array $mappings): void
    {
        $this->log("  Converting $tableName...");
        $totalUpdated = 0;

        foreach ($mappings as $access => $values) {
            $qb = $this->connection->getQueryBuilder();
            $qb->update($tableName)
                ->set('visibility', $qb->createNamedParameter($values['visibility']))
                ->set('publication_status', $qb->createNamedParameter($values['publication_status']))
                ->where($qb->expr()->eq('access', $qb->createNamedParameter($access)));

            $count = $qb->executeStatement();
            if ($count > 0) {
                $this->log("    • $access → visibility: {$values['visibility']}, publication_status: {$values['publication_status']} ($count records)");
                $totalUpdated += $count;
            }
        }

        // Handle NULL or empty access values
        $qb = $this->connection->getQueryBuilder();
        $qb->update($tableName)
            ->set('visibility', $qb->createNamedParameter('private'))
            ->set('publication_status', $qb->createNamedParameter('draft'))
            ->where($qb->expr()->isNull('access'))
            ->orWhere($qb->expr()->eq('access', $qb->createNamedParameter('')));

        $count = $qb->executeStatement();
        if ($count > 0) {
            $this->log("    • NULL/empty → visibility: private, publication_status: draft ($count records)");
            $totalUpdated += $count;
        }

        $this->log("    ✓ Converted $totalUpdated records");
    }

    private function dropAccessColumn(): void
    {
        $this->log('Dropping old access column...');

        // Drop from inquiries
        $this->dropColumnIfExists(self::S_INQUIRIES, 'access');

        // Drop from inquiry groups
        if ($this->columnExists(self::S_INQUIRIES_GROUP, 'access')) {
            $this->dropColumnIfExists(self::S_INQUIRIES_GROUP, 'access');
        }

        // Drop from options
        if ($this->columnExists(self::S_OPTIONS, 'access')) {
            $this->dropColumnIfExists(self::S_OPTIONS, 'access');
        }

        $this->log('  ✓ Access column dropped');
    }

    private function dropColumnIfExists(string $tableName, string $columnName): void
    {
        try {
            if ($this->isSQLite) {
                // SQLite doesn't support DROP COLUMN directly
                $this->log("    ⚠️ SQLite: Cannot drop column $columnName from $tableName (not supported)");
                return;
            }

            $schema = $this->connection->createSchema();
            if (!$schema->hasTable($tableName)) {
                return;
            }

            $table = $schema->getTable($tableName);
            if (!$table->hasColumn($columnName)) {
                return;
            }

            $qb = $this->connection->getQueryBuilder();
            $sql = "ALTER TABLE " . $this->quoteIdentifier($tableName) . 
                   " DROP COLUMN " . $this->quoteIdentifier($columnName);
            
            $this->connection->executeStatement($sql);
            $this->log("    ✓ Dropped $columnName from $tableName");
        } catch (\Exception $e) {
            $this->log("    ⚠️ Could not drop $columnName from $tableName: " . $e->getMessage());
        }
    }

    // ====================================================================
    // POST-SCHEMA: Indices and Foreign Keys
    // ====================================================================

    private function addIndices(): void
    {
        $this->log('Adding indices...');

        // Group relations indices
        $this->addIndexIfNotExists(self::S_GROUP_RELATIONS, 'gr_target_idx', ['target_type', 'target_id']);
        $this->addIndexIfNotExists(self::S_GROUP_RELATIONS, 'gr_relation_idx', ['relation_type']);
        $this->addIndexIfNotExists(self::S_GROUP_RELATIONS, 'gr_group_idx', ['group_id']);

        // User relations indices
        $this->addIndexIfNotExists(self::S_USER_RELATIONS, 'ur_target_idx', ['target_type', 'target_id']);
        $this->addIndexIfNotExists(self::S_USER_RELATIONS, 'ur_relation_idx', ['relation_type']);
        $this->addIndexIfNotExists(self::S_USER_RELATIONS, 'ur_user_idx', ['user_id']);

        // Participation indices
        $this->addIndexIfNotExists(self::S_PARTICIPATION, 'participation_created_idx', ['created_at']);
        $this->addIndexIfNotExists(self::S_PARTICIPATION, 'participation_policy_idx', ['policy_type']);

        // Lottery run indices
        $this->addIndexIfNotExists(self::S_LOTTERY_RUN, 'run_status_idx', ['status']);
        $this->addIndexIfNotExists(self::S_LOTTERY_RUN, 'run_created_idx', ['created_at']);
        $this->addIndexIfNotExists(self::S_LOTTERY_RUN, 'run_completed_idx', ['completed_at']);

        // Lottery selection indices
        $this->addIndexIfNotExists(self::S_LOTTERY_SELECTION, 'selection_rank_idx', ['rank']);
        $this->addIndexIfNotExists(self::S_LOTTERY_SELECTION, 'selection_expires_idx', ['expires_at']);
        $this->addIndexIfNotExists(self::S_LOTTERY_SELECTION, 'selection_role_idx', ['role']);

        // Inquiry indices
        $this->addIndexIfNotExists(self::S_INQUIRIES, 'inquiry_visibility_idx', ['visibility']);
        $this->addIndexIfNotExists(self::S_INQUIRIES, 'inquiry_publication_status_idx', ['publication_status']);

        $this->log('  ✓ Indices added');
    }

    private function addIndexIfNotExists(string $table, string $indexName, array $columns): void
    {
        try {
            $schema = $this->connection->createSchema();
            if (!$schema->hasTable($table)) {
                return;
            }
            $tableObj = $schema->getTable($table);
            if ($tableObj->hasIndex($indexName)) {
                return;
            }

            $colList = implode(', ', array_map([$this, 'quoteIdentifier'], $columns));
            $sql = "CREATE INDEX " . $this->quoteIdentifier($indexName) . 
                    " ON " . $this->quoteIdentifier($table) . " (" . $colList . ")";
            $this->connection->executeStatement($sql);
            $this->log("  + " . $indexName);
        } catch (\Exception $e) {
            $this->log("  ⚠️ Could not create index " . $indexName . ": " . $e->getMessage());
        }
    }

    private function addForeignKeys(): void
    {
        $this->log('Adding foreign keys...');

        // SQLite doesn't support foreign keys well in migrations
        if ($this->isSQLite) {
            $this->log('  ⚠️ SQLite: Foreign keys skipped (not supported in migrations)');
            return;
        }

        try {
            $schema = $this->connection->createSchema();

            // FK: lottery_run → participation
            if ($schema->hasTable(self::S_LOTTERY_RUN) && $schema->hasTable(self::S_PARTICIPATION)) {
                $runTable = $schema->getTable(self::S_LOTTERY_RUN);
                if (!$this->hasForeignKey($runTable, 'fk_run_participation')) {
                    $this->connection->executeStatement(
                        "ALTER TABLE " . $this->quoteIdentifier(self::S_LOTTERY_RUN) . 
                        " ADD CONSTRAINT " . $this->quoteIdentifier('fk_run_participation') . 
                        " FOREIGN KEY (" . $this->quoteIdentifier('participation_id') . ")" .
                        " REFERENCES " . $this->quoteIdentifier(self::S_PARTICIPATION) . " (" . $this->quoteIdentifier('id') . ")" .
                        " ON DELETE CASCADE"
                    );
                    $this->log("  + fk_run_participation (CASCADE)");
                }
            }

            // FK: lottery_selection → participation
            if ($schema->hasTable(self::S_LOTTERY_SELECTION) && $schema->hasTable(self::S_PARTICIPATION)) {
                $selectionTable = $schema->getTable(self::S_LOTTERY_SELECTION);
                if (!$this->hasForeignKey($selectionTable, 'fk_selection_participation')) {
                    $this->connection->executeStatement(
                        "ALTER TABLE " . $this->quoteIdentifier(self::S_LOTTERY_SELECTION) . 
                        " ADD CONSTRAINT " . $this->quoteIdentifier('fk_selection_participation') . 
                        " FOREIGN KEY (" . $this->quoteIdentifier('participation_id') . ")" .
                        " REFERENCES " . $this->quoteIdentifier(self::S_PARTICIPATION) . " (" . $this->quoteIdentifier('id') . ")" .
                        " ON DELETE CASCADE"
                    );
                    $this->log("  + fk_selection_participation (CASCADE)");
                }
            }

            // FK: lottery_selection → lottery_run
            if ($schema->hasTable(self::S_LOTTERY_SELECTION) && $schema->hasTable(self::S_LOTTERY_RUN)) {
                $selectionTable = $schema->getTable(self::S_LOTTERY_SELECTION);
                if (!$this->hasForeignKey($selectionTable, 'fk_selection_run')) {
                    $this->connection->executeStatement(
                        "ALTER TABLE " . $this->quoteIdentifier(self::S_LOTTERY_SELECTION) . 
                        " ADD CONSTRAINT " . $this->quoteIdentifier('fk_selection_run') . 
                        " FOREIGN KEY (" . $this->quoteIdentifier('run_id') . ")" .
                        " REFERENCES " . $this->quoteIdentifier(self::S_LOTTERY_RUN) . " (" . $this->quoteIdentifier('id') . ")" .
                        " ON DELETE CASCADE"
                    );
                    $this->log("  + fk_selection_run (CASCADE)");
                }
            }

            $this->log('  ✓ Foreign keys added');
        } catch (\Exception $e) {
            $this->log('  ⚠️ Foreign keys error: ' . $e->getMessage());
        }
    }

    private function hasForeignKey($table, string $fkName): bool
    {
        foreach ($table->getForeignKeys() as $fk) {
            if ($fk->getName() === $fkName) {
                return true;
            }
        }
        return false;
    }

    // ====================================================================
    // HELPERS
    // ====================================================================

    private function columnExists(string $tableName, string $columnName): bool
    {
        try {
            $schema = $this->connection->createSchema();
            if (!$schema->hasTable($tableName)) {
                return false;
            }
            $table = $schema->getTable($tableName);
            return $table->hasColumn($columnName);
        } catch (\Exception $e) {
            return false;
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
            $this->output->info('Agora 1.8.0 - ' . $msg);
        }
    }
}
