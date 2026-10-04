<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Agora 1.8.0 — Sortition / Lottery system and new visibility system.
 *
 * Creates:
 *   - agora_participation       (who can participate)
 *   - agora_group_relations     (generic group relations)
 *   - agora_user_relations      (generic user relations)
 *   - agora_lottery_run         (executions)
 *   - agora_lottery_selection   (who was selected)
 *   - agora_trending_scores     (trending score cache)
 *
 * Modifies:
 *   - agora_inquiries:  adds visibility, publication_status; drops access
 *   - agora_inq_group:  adds visibility, publication_status; drops access, owned_group
 *   - agora_options:    drops access, owned_group
 *   - agora_comments:   adds parent_id
 *   - agora_inq_status: adds family_type
 *
 * Access → visibility / publication_status mapping (inquiries + groups):
 *   'open'       -> visibility 'everyone', publication_status 'published'
 *   'public'     -> visibility 'everyone', publication_status 'published'
 *   'private'    -> visibility 'private',  publication_status 'draft'
 *   'moderate'   -> visibility 'private',  publication_status 'pending'
 *   'hidden'     -> visibility 'private',  publication_status 'draft'
 *   'groups'     -> visibility 'groups',   publication_status 'published'
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

class Version01080020260707120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;
    private bool $isMySQL = false;
    private bool $isPostgreSQL = false;
    private bool $isSQLite = false;
    private ?IDBConnection $connection = null;

    /** @var array<string,string>|null cached unprefixed → real table name */
    private ?array $prefixedNames = null;

    private const S_PARTICIPATION     = 'agora_participation';
    private const S_LOTTERY_RUN       = 'agora_lottery_run';
    private const S_LOTTERY_SELECTION = 'agora_lottery_selection';
    private const S_INQUIRIES         = 'agora_inquiries';
    private const S_INQUIRIES_GROUP   = 'agora_inq_group';
    private const S_OPTIONS           = 'agora_options';
    private const S_GROUP_RELATIONS   = 'agora_group_relations';
    private const S_USER_RELATIONS    = 'agora_user_relations';
    private const S_TRENDING_SCORES   = 'agora_trending_scores';
    private const S_COMMENTS          = 'agora_comments';
    private const S_INQ_STATUS        = 'agora_inq_status';

    public function __construct(
        private ?IDBConnection $dbConnection = null
    ) {
        $this->connection = $dbConnection;
    }

    // ====================================================================
    // SCHEMA
    // ====================================================================

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        $this->schema = $schemaClosure();

        $platform = $this->schema->getDatabasePlatform();
        $this->isMySQL      = $platform instanceof MySQLPlatform;
        $this->isPostgreSQL = $platform instanceof PostgreSQLPlatform;
        $this->isSQLite     = $platform instanceof SqlitePlatform;

        $this->log('Agora 1.8.0 - sortition / visibility / threaded comments');
        $this->log('Platform: ' . ($this->isMySQL ? 'MySQL' : ($this->isPostgreSQL ? 'PostgreSQL' : 'SQLite')));

        // --- Modifications (add columns only here) ---
        $this->modifyInquiriesTable();          // + visibility, publication_status
        $this->modifyInquiryGroupsTable();      // + visibility, publication_status
        // agora_options: NO new columns — spec says drop access + owned_group only
        $this->modifyCommentsTable();           // + parent_id
        $this->modifyInquiryStatusTable();      // + family_type

        // --- New tables ---
        $this->createGroupRelationsTable();
        $this->createUserRelationsTable();
        $this->createParticipationTable();
        $this->createLotteryRunTable();
        $this->createLotterySelectionTable();
        $this->createTrendingScoresTable();

        $this->log('Schema changes queued');
        return $this->schema;
    }

    // ====================================================================
    // POST-SCHEMA
    // ====================================================================

    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;

        if (!$this->connection) {
            $this->log('ERROR: No database connection!');
            return;
        }

        $this->log('POST-SCHEMA: starting');

        try {
            // 1. Convert `access` → (visibility, publication_status) on
            //    inquiries and groups. Must run BEFORE the drop below.
            $this->convertAccessColumn();

            // 2. Indices on the newly-created columns and tables
            $this->addIndices();

            // 3. Foreign keys on the new tables
            $this->addForeignKeys();

            // 4. Drop obsolete columns
            $this->dropObsoleteColumns();

            // 5. Loud-fail verification
            $this->verifyAccessColumnDropped();
            $this->verifyOwnedGroupDropped();

            $this->log('✅ Migration complete successfully');
        } catch (\Throwable $e) {
            $this->log('❌ ERROR: ' . $e->getMessage());
            throw $e;
        }
    }

    // ====================================================================
    // TABLE MODIFICATIONS  (add columns only)
    // ====================================================================

    private function modifyInquiriesTable(): void
    {
        if (!$this->schema->hasTable(self::S_INQUIRIES)) {
            return;
        }
        $t = $this->schema->getTable(self::S_INQUIRIES);

        if (!$t->hasColumn('visibility')) {
            $t->addColumn('visibility', Types::STRING, [
                'notnull' => true, 'default' => 'private', 'length' => 50,
            ]);
        }
        if (!$t->hasColumn('publication_status')) {
            $t->addColumn('publication_status', Types::STRING, [
                'notnull' => true, 'default' => 'draft', 'length' => 50,
            ]);
        }
        $this->log('  + inquiries.visibility, inquiries.publication_status');
    }

    private function modifyInquiryGroupsTable(): void
    {
        if (!$this->schema->hasTable(self::S_INQUIRIES_GROUP)) {
            return;
        }
        $t = $this->schema->getTable(self::S_INQUIRIES_GROUP);

        if (!$t->hasColumn('visibility')) {
            $t->addColumn('visibility', Types::STRING, [
                'notnull' => true, 'default' => 'everyone', 'length' => 50,
            ]);
        }
        if (!$t->hasColumn('publication_status')) {
            $t->addColumn('publication_status', Types::STRING, [
                'notnull' => true, 'default' => 'draft', 'length' => 50,
            ]);
        }
        $this->log('  + groups.visibility, groups.publication_status');
    }

    private function modifyCommentsTable(): void
    {
        if (!$this->schema->hasTable(self::S_COMMENTS)) {
            return;
        }
        $t = $this->schema->getTable(self::S_COMMENTS);

        if (!$t->hasColumn('parent_id')) {
            $t->addColumn('parent_id', Types::BIGINT, [
                'notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20,
            ]);
            $this->log('  + comments.parent_id');
        }
    }

    private function modifyInquiryStatusTable(): void
    {
        if (!$this->schema->hasTable(self::S_INQ_STATUS)) {
            return;
        }
        $t = $this->schema->getTable(self::S_INQ_STATUS);

        if (!$t->hasColumn('family_type')) {
            $t->addColumn('family_type', Types::STRING, [
                'notnull' => true, 'default' => 'deliberative', 'length' => 64,
            ]);
            $this->log('  + inq_status.family_type');
        }
    }

    // ====================================================================
    // NEW TABLES
    // ====================================================================

    private function createGroupRelationsTable(): void
    {
        if ($this->schema->hasTable(self::S_GROUP_RELATIONS)) {
            return;
        }
        $t = $this->schema->createTable(self::S_GROUP_RELATIONS);
        $t->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('target_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $t->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('relation_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $t->addColumn('group_id', Types::STRING, ['notnull' => true, 'length' => 255]);
        $t->addColumn('created_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('metadata', Types::JSON, ['notnull' => false, 'default' => null]);
        $t->setPrimaryKey(['id']);
        $t->addUniqueIndex(['target_type', 'target_id', 'relation_type', 'group_id'], 'group_relation_unique');
        $t->addIndex(['target_type', 'target_id'], 'group_relation_target_idx');
        $t->addIndex(['relation_type'], 'group_relation_type_idx');
        $t->addIndex(['group_id'], 'group_relation_group_idx');
        $this->log('  + table ' . self::S_GROUP_RELATIONS);
    }

    private function createUserRelationsTable(): void
    {
        if ($this->schema->hasTable(self::S_USER_RELATIONS)) {
            return;
        }
        $t = $this->schema->createTable(self::S_USER_RELATIONS);
        $t->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('target_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $t->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('relation_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $t->addColumn('user_id', Types::STRING, ['notnull' => true, 'length' => 255]);
        $t->addColumn('created_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('metadata', Types::JSON, ['notnull' => false, 'default' => null]);
        $t->setPrimaryKey(['id']);
        $t->addUniqueIndex(['target_type', 'target_id', 'relation_type', 'user_id'], 'user_relation_unique');
        $t->addIndex(['target_type', 'target_id'], 'user_relation_target_idx');
        $t->addIndex(['relation_type'], 'user_relation_type_idx');
        $t->addIndex(['user_id'], 'user_relation_user_idx');
        $this->log('  + table ' . self::S_USER_RELATIONS);
    }

    private function createParticipationTable(): void
    {
        if ($this->schema->hasTable(self::S_PARTICIPATION)) {
            return;
        }
        $t = $this->schema->createTable(self::S_PARTICIPATION);
        $t->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('target_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $t->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('policy_type', Types::STRING, ['notnull' => true, 'default' => 'everyone', 'length' => 50]);
        $t->addColumn('policy_config', Types::JSON, ['notnull' => false, 'default' => null]);
        $t->addColumn('created_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('updated_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('created_by', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $t->setPrimaryKey(['id']);
        $t->addUniqueIndex(['target_type', 'target_id'], 'participation_unique_target');
        $this->log('  + table ' . self::S_PARTICIPATION);
    }

    private function createLotteryRunTable(): void
    {
        if ($this->schema->hasTable(self::S_LOTTERY_RUN)) {
            return;
        }
        $t = $this->schema->createTable(self::S_LOTTERY_RUN);
        $t->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('participation_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('seed', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 255]);
        $t->addColumn('status', Types::STRING, ['notnull' => true, 'default' => 'pending', 'length' => 32]);
        $t->addColumn('pool_size', Types::INTEGER, ['notnull' => true, 'default' => 0]);
        $t->addColumn('selection_count', Types::INTEGER, ['notnull' => true, 'default' => 0]);
        $t->addColumn('result_summary', Types::JSON, ['notnull' => false, 'default' => null]);
        $t->addColumn('created_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('completed_at', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('metadata', Types::JSON, ['notnull' => false, 'default' => null]);
        $t->setPrimaryKey(['id']);
        $t->addIndex(['participation_id'], 'run_participation_idx');
        $this->log('  + table ' . self::S_LOTTERY_RUN);
    }

    private function createLotterySelectionTable(): void
    {
        if ($this->schema->hasTable(self::S_LOTTERY_SELECTION)) {
            return;
        }
        $t = $this->schema->createTable(self::S_LOTTERY_SELECTION);
        $t->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('participation_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('run_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('selected_user_id', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $t->addColumn('selected_group_id', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $t->addColumn('rank', Types::INTEGER, ['notnull' => true, 'default' => 0]);
        $t->addColumn('role', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 50]);
        $t->addColumn('status', Types::STRING, ['notnull' => true, 'default' => 'pending', 'length' => 32]);
        $t->addColumn('selected_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('expires_at', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('accepted_at', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('metadata', Types::JSON, ['notnull' => false, 'default' => null]);
        $t->setPrimaryKey(['id']);
        $t->addIndex(['participation_id'], 'selection_participation_idx');
        $t->addIndex(['run_id'], 'selection_run_idx');
        $t->addIndex(['selected_user_id'], 'selection_user_idx');
        $t->addIndex(['status'], 'selection_status_idx');
        $this->log('  + table ' . self::S_LOTTERY_SELECTION);
    }

    private function createTrendingScoresTable(): void
    {
        if ($this->schema->hasTable(self::S_TRENDING_SCORES)) {
            return;
        }
        $t = $this->schema->createTable(self::S_TRENDING_SCORES);
        $t->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $t->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20, 'default' => 0]);
        $t->addColumn('score', Types::FLOAT, ['notnull' => true, 'default' => 0]);
        $t->addColumn('updated_at', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $t->setPrimaryKey(['id']);
        $t->addUniqueIndex(['inquiry_id', 'option_id'], 'trending_inquiry_option_unique');
        $t->addIndex(['inquiry_id'], 'trending_inquiry_idx');
        $t->addIndex(['score'], 'trending_score_idx');
        $t->addIndex(['updated_at'], 'trending_updated_idx');
        $this->log('  + table ' . self::S_TRENDING_SCORES);
    }

    // ====================================================================
    // DATA CONVERSION — access → visibility / publication_status
    // Runs ONLY on tables that received the new columns:
    //   - agora_inquiries
    //   - agora_inq_group
    // agora_options does NOT get visibility/publication_status, so no
    // conversion is possible there — its `access` column is simply dropped.
    // ====================================================================

    private function convertAccessColumn(): void
    {
        $this->log('Converting access → visibility / publication_status');

        $mappings = [
            'open'     => ['visibility' => 'everyone', 'publication_status' => 'published'],
            'public'   => ['visibility' => 'everyone', 'publication_status' => 'published'],
            'private'  => ['visibility' => 'private',  'publication_status' => 'draft'],
            'moderate' => ['visibility' => 'private',  'publication_status' => 'pending'],
            'hidden'   => ['visibility' => 'private',  'publication_status' => 'draft'],
            'groups'   => ['visibility' => 'groups',   'publication_status' => 'published'],
        ];

        // inquiries
        if ($this->columnExists(self::S_INQUIRIES, 'access')) {
            $this->convertTableAccess(self::S_INQUIRIES, $mappings);
        } else {
            $this->log('  ' . self::S_INQUIRIES . '.access not present — skipping');
        }

        // inquiry groups
        if ($this->columnExists(self::S_INQUIRIES_GROUP, 'access')) {
            $this->convertTableAccess(self::S_INQUIRIES_GROUP, $mappings);
        } else {
            $this->log('  ' . self::S_INQUIRIES_GROUP . '.access not present — skipping');
        }

        // agora_options: no target columns → nothing to convert; will just be dropped
        $this->log('  ' . self::S_OPTIONS . ': no target columns — data will be discarded on drop');
    }

    private function convertTableAccess(string $unprefixedTable, array $mappings): void
    {
        // IQueryBuilder resolves dbtableprefix automatically.
        $totalUpdated = 0;

        foreach ($mappings as $access => $values) {
            $qb = $this->connection->getQueryBuilder();
            $qb->update($unprefixedTable)
                ->set('visibility',         $qb->createNamedParameter($values['visibility']))
                ->set('publication_status', $qb->createNamedParameter($values['publication_status']))
                ->where($qb->expr()->eq('access', $qb->createNamedParameter($access)));
            $totalUpdated += $qb->executeStatement();
        }

        // NULL / '' → safest default
        $qb = $this->connection->getQueryBuilder();
        $qb->update($unprefixedTable)
            ->set('visibility',         $qb->createNamedParameter('private'))
            ->set('publication_status', $qb->createNamedParameter('draft'))
            ->where($qb->expr()->isNull('access'))
            ->orWhere($qb->expr()->eq('access', $qb->createNamedParameter('')));
        $totalUpdated += $qb->executeStatement();

        $this->log("  • {$unprefixedTable}: {$totalUpdated} rows converted");
    }

    // ====================================================================
    // DROP OBSOLETE COLUMNS
    // ====================================================================

    private function dropObsoleteColumns(): void
    {
        $this->log('Dropping obsolete columns');

        // inquiries: drop access only (owned_group stays)
        $this->dropColumnIfExists(self::S_INQUIRIES, 'access');

        // inquiry groups: drop access + owned_group
        $this->dropColumnIfExists(self::S_INQUIRIES_GROUP, 'access');
        $this->dropColumnIfExists(self::S_INQUIRIES_GROUP, 'owned_group');

        // options: drop access + owned_group
        $this->dropColumnIfExists(self::S_OPTIONS, 'access');
        $this->dropColumnIfExists(self::S_OPTIONS, 'owned_group');

        $this->log('  ✓ obsolete columns processed');
    }

private function dropColumnIfExists(string $unprefixedTable, string $columnName): void
{
    if ($this->isSQLite) {
        $this->log("    ⚠️ SQLite: cannot drop {$columnName} from {$unprefixedTable}; skipped");
        return;
    }

    $realTable = $this->prefixed($unprefixedTable);

    // Existence check via raw SQL — bypasses Doctrine's in-memory schema cache.
    if (!$this->rawColumnExists($realTable, $columnName)) {
        $this->log("    - {$unprefixedTable}.{$columnName} already absent");
        return;
    }

    // 1. Drop any index that references the column (raw SQL, no cache).
    foreach ($this->rawIndexesOnColumn($realTable, $columnName) as $idxName) {
        $idxQuoted = $this->quoteIdentifier($idxName);
        if ($this->isMySQL) {
            $this->connection->executeStatement(
                "DROP INDEX {$idxQuoted} ON " . $this->quoteIdentifier($realTable)
            );
        } else {
            $this->connection->executeStatement("DROP INDEX {$idxQuoted}");
        }
        $this->log("    • dropped dependent index {$idxName}");
    }

    // 2. Drop any FK that references the column (raw SQL, no cache).
    foreach ($this->rawForeignKeysOnColumn($realTable, $columnName) as $fkName) {
        $fkQuoted = $this->quoteIdentifier($fkName);
        if ($this->isMySQL) {
            $this->connection->executeStatement(
                "ALTER TABLE " . $this->quoteIdentifier($realTable) .
                " DROP FOREIGN KEY {$fkQuoted}"
            );
        } else {
            $this->connection->executeStatement(
                "ALTER TABLE " . $this->quoteIdentifier($realTable) .
                " DROP CONSTRAINT {$fkQuoted}"
            );
        }
        $this->log("    • dropped dependent FK {$fkName}");
    }

    // 3. Drop the column.
    $this->connection->executeStatement(
        "ALTER TABLE " . $this->quoteIdentifier($realTable) .
        " DROP COLUMN " . $this->quoteIdentifier($columnName)
    );
    $this->log("    ✓ dropped {$unprefixedTable}.{$columnName}");
}

    private function verifyAccessColumnDropped(): void
    {
        $stillPresent = [];
        foreach ([self::S_INQUIRIES, self::S_INQUIRIES_GROUP, self::S_OPTIONS] as $t) {
            if ($this->columnExists($t, 'access')) {
                $stillPresent[] = $t;
            }
        }
        if (!empty($stillPresent)) {
            throw new \RuntimeException(
                'access column still present in: ' . implode(', ', $stillPresent)
            );
        }
        $this->log('  ✓ access removed everywhere');
    }

    private function verifyOwnedGroupDropped(): void
    {
        $stillPresent = [];
        foreach ([self::S_INQUIRIES_GROUP, self::S_OPTIONS] as $t) {
            if ($this->columnExists($t, 'owned_group')) {
                $stillPresent[] = $t;
            }
        }
        if (!empty($stillPresent)) {
            throw new \RuntimeException(
                'owned_group column still present in: ' . implode(', ', $stillPresent)
            );
        }
        $this->log('  ✓ owned_group removed from groups and options');
    }

    // ====================================================================
    // INDICES
    // Only for columns/tables that actually exist per the spec:
    //   inquiries:   + visibility, + publication_status  (new)
    //   groups:      + visibility, + publication_status  (new)
    //   comments:    + parent_id                          (new)
    //   inq_status:  + family_type                        (new)
    //   options:     NO new columns → no new indices
    // ====================================================================

    private function addIndices(): void
    {
        $this->addIndexIfNotExists(self::S_INQUIRIES,       'inquiry_visibility_idx', ['visibility']);
        $this->addIndexIfNotExists(self::S_INQUIRIES,       'inquiry_pubstatus_idx',  ['publication_status']);
        $this->addIndexIfNotExists(self::S_INQUIRIES_GROUP, 'group_visibility_idx',   ['visibility']);
        $this->addIndexIfNotExists(self::S_INQUIRIES_GROUP, 'group_pubstatus_idx',    ['publication_status']);

        $this->addIndexIfNotExists(self::S_COMMENTS,        'comment_parent_idx',     ['parent_id']);
        $this->addIndexIfNotExists(self::S_COMMENTS,        'comment_parent_ts_idx',  ['parent_id', 'timestamp']);

        $this->addIndexIfNotExists(self::S_INQ_STATUS,      'status_family_idx',      ['family_type']);

        // New tables
        $this->addIndexIfNotExists(self::S_PARTICIPATION,      'participation_created_idx',   ['created_at']);
        $this->addIndexIfNotExists(self::S_PARTICIPATION,      'participation_policy_idx',    ['policy_type']);
        $this->addIndexIfNotExists(self::S_LOTTERY_RUN,        'run_status_idx',              ['status']);
        $this->addIndexIfNotExists(self::S_LOTTERY_RUN,        'run_created_idx',             ['created_at']);
        $this->addIndexIfNotExists(self::S_LOTTERY_RUN,        'run_completed_idx',           ['completed_at']);
        $this->addIndexIfNotExists(self::S_LOTTERY_SELECTION,  'selection_rank_idx',          ['rank']);
        $this->addIndexIfNotExists(self::S_LOTTERY_SELECTION,  'selection_expires_idx',       ['expires_at']);
        $this->addIndexIfNotExists(self::S_LOTTERY_SELECTION,  'selection_role_idx',          ['role']);
    }

    private function addIndexIfNotExists(string $unprefixedTable, string $indexName, array $columns): void
    {
        try {
            if (!$this->connection->tableExists($unprefixedTable)) {
                return;
            }
            $realTable = $this->prefixed($unprefixedTable);

            $schema = $this->connection->createSchema();
            if ($schema->hasTable($realTable) && $schema->getTable($realTable)->hasIndex($indexName)) {
                return;
            }

            $colList = implode(', ', array_map([$this, 'quoteIdentifier'], $columns));
            $this->connection->executeStatement(
                "CREATE INDEX " . $this->quoteIdentifier($indexName) .
                " ON " . $this->quoteIdentifier($realTable) .
                " (" . $colList . ")"
            );
            $this->log("  + index {$indexName} on {$unprefixedTable}");
        } catch (\Throwable $e) {
            $this->log("  ⚠️ index {$indexName}: " . $e->getMessage());
        }
    }

    // ====================================================================
    // FOREIGN KEYS
    // ====================================================================

    private function addForeignKeys(): void
    {
        if ($this->isSQLite) {
            $this->log('  SQLite: FKs skipped');
            return;
        }

        $this->addFkIfNotExists(self::S_LOTTERY_RUN,       'participation_id', self::S_PARTICIPATION, 'fk_run_participation',       'CASCADE');
        $this->addFkIfNotExists(self::S_LOTTERY_SELECTION, 'participation_id', self::S_PARTICIPATION, 'fk_selection_participation', 'CASCADE');
        $this->addFkIfNotExists(self::S_LOTTERY_SELECTION, 'run_id',           self::S_LOTTERY_RUN,   'fk_selection_run',           'CASCADE');
        $this->addFkIfNotExists(self::S_COMMENTS,          'parent_id',        self::S_COMMENTS,      'fk_comment_parent',          'SET NULL');
    }

    private function addFkIfNotExists(
        string $childTable, string $column,
        string $parentTable, string $fkName, string $onDelete
    ): void {
        try {
            if (!$this->connection->tableExists($childTable)) {
                return;
            }
            if (!$this->connection->tableExists($parentTable)) {
                return;
            }

            $realChild  = $this->prefixed($childTable);
            $realParent = $this->prefixed($parentTable);

            $schema = $this->connection->createSchema();
            if ($schema->hasTable($realChild)) {
                foreach ($schema->getTable($realChild)->getForeignKeys() as $fk) {
                    if ($fk->getName() === $fkName) {
                        return;
                    }
                }
            }

            $this->connection->executeStatement(
                "ALTER TABLE " . $this->quoteIdentifier($realChild) .
                " ADD CONSTRAINT " . $this->quoteIdentifier($fkName) .
                " FOREIGN KEY (" . $this->quoteIdentifier($column) . ")" .
                " REFERENCES " . $this->quoteIdentifier($realParent) . " (" . $this->quoteIdentifier('id') . ")" .
                " ON DELETE {$onDelete}"
            );
            $this->log("  + FK {$fkName}");
        } catch (\Throwable $e) {
            $this->log("  ⚠️ FK {$fkName}: " . $e->getMessage());
        }
    }

    // ====================================================================
    // PREFIX-AWARE HELPERS
    // ====================================================================

    /**
 * Column existence via information_schema — never uses Doctrine's cache.
 */
private function rawColumnExists(string $realTable, string $column): bool
{
    try {
        if ($this->isMySQL) {
            $sql = "SELECT 1 FROM information_schema.columns
                    WHERE table_schema = DATABASE()
                      AND table_name   = ?
                      AND column_name  = ?";
            return (bool)$this->connection->executeQuery($sql, [$realTable, $column])->fetchOne();
	}
	if ($this->isPostgreSQL) {
    $sql = "SELECT 1
            FROM information_schema.columns
            WHERE table_schema = current_schema()
              AND table_name = ?
              AND column_name = ?";

    return (bool)$this->connection
        ->executeQuery($sql, [$realTable, $column])
        ->fetchOne();
}
        // SQLite fallback (shouldn't be reached because we skip SQLite earlier)
        $sql = "SELECT 1 FROM pragma_table_info(?) WHERE name = ?";
        return (bool)$this->connection->executeQuery($sql, [$realTable, $column])->fetchOne();
    } catch (\Throwable $e) {
        return false;
    }
}

/**
 * Names of indexes on $realTable that reference $column.
 * @return string[]
 */
private function rawIndexesOnColumn(string $realTable, string $column): array
{
    $names = [];
    try {
        if ($this->isMySQL) {
            $sql = "SELECT DISTINCT index_name
                    FROM information_schema.statistics
                    WHERE table_schema = DATABASE()
                      AND table_name   = ?
                      AND column_name  = ?
                      AND index_name  <> 'PRIMARY'";
            $res = $this->connection->executeQuery($sql, [$realTable, $column]);
            while ($row = $res->fetch()) {
                $names[] = $row['index_name'];
            }
        } elseif ($this->isPostgreSQL) {
            $sql = "SELECT i.relname AS index_name
                    FROM pg_index ix
                    JOIN pg_class i ON i.oid = ix.indexrelid
                    JOIN pg_class t ON t.oid = ix.indrelid
                    JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
                    WHERE t.relname = ? AND a.attname = ?";
            $res = $this->connection->executeQuery($sql, [$realTable, $column]);
            while ($row = $res->fetch()) {
                $names[] = $row['index_name'];
            }
        }
    } catch (\Throwable $e) {
        // ignore
    }
    return $names;
}

/**
 * Names of foreign keys on $realTable that reference $column.
 * @return string[]
 */
private function rawForeignKeysOnColumn(string $realTable, string $column): array
{
    $names = [];
    try {
        if ($this->isMySQL) {
            $sql = "SELECT constraint_name
                    FROM information_schema.key_column_usage
                    WHERE table_schema    = DATABASE()
                      AND table_name      = ?
                      AND column_name     = ?
                      AND referenced_table_name IS NOT NULL";
            $res = $this->connection->executeQuery($sql, [$realTable, $column]);
            while ($row = $res->fetch()) {
                $names[] = $row['constraint_name'];
            }
        } elseif ($this->isPostgreSQL) {
            $sql = "SELECT con.conname AS constraint_name
                    FROM pg_constraint con
                    JOIN pg_class rel ON rel.oid = con.conrelid
                    JOIN pg_attribute a ON a.attrelid = rel.oid AND a.attnum = ANY(con.conkey)
                    WHERE con.contype = 'f'
                      AND rel.relname = ?
                      AND a.attname   = ?";
            $res = $this->connection->executeQuery($sql, [$realTable, $column]);
            while ($row = $res->fetch()) {
                $names[] = $row['constraint_name'];
            }
        }
    } catch (\Throwable $e) {
        // ignore
    }
    return $names;
}

private function prefixed(string $unprefixed): string
{
    foreach ($this->connection->createSchema()->getTables() as $table) {
        $name = $table->getName();

        if ($name === $unprefixed || str_ends_with($name, '_' . $unprefixed)) {
            return $name;
        }
    }

    return $unprefixed;
}

private function columnExists(string $unprefixedTable, string $column): bool
{
    try {
        $real = $this->prefixed($unprefixedTable);
        return $this->rawColumnExists($real, $column);
    } catch (\Throwable $e) {
        return false;
    }
}

    private function quoteIdentifier(string $identifier): string
    {
        if ($this->isMySQL) {
            return '`' . str_replace('`', '``', $identifier) . '`';
        }
        return '"' . str_replace('"', '""', $identifier) . '"';
    }

    private function log(string $msg): void
    {
        if ($this->output !== null) {
            $this->output->info('Agora 1.8.0 - ' . $msg);
        }
    }
}
