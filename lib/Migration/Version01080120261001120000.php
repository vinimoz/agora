<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Agora 1.8.1 —
 *   - add `statuses` (JSON) to `agora_inq_families`
 *   - backfill default statuses for every existing family
 *   - drop obsolete columns after the 1.8.0 data conversion
 *
 * Kept separate from 1.8.0 because the data migration
 * (access → visibility / publication_status) requires the `access`
 * column to still be present when it runs.
 */

namespace OCA\Agora\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version01080120261001120000 extends SimpleMigrationStep
{
    /**
     * @var array<string, string[]> unprefixed table => columns to drop
     */
    private const COLUMNS_TO_DROP = [
        'agora_inquiries' => ['access'],
        'agora_inq_group' => ['access', 'publicationStatus'],
        'agora_options'   => ['access', 'owned_group'],
    ];

    /**
     * Default statuses per family_type.
     * Must stay in sync with InitDbDefault::$inquiryTypeFamilies.
     *
     * @var array<string, array<int, array{value:string,label:string,color:string}>>
     */
    private const DEFAULT_FAMILY_STATUSES = [
        'deliberative' => [
            ['value' => 'draft',              'label' => 'Draft',              'color' => '#949494'],
            ['value' => 'under_process',      'label' => 'Under Process',      'color' => '#f39c12'],
            ['value' => 'discussion_open',    'label' => 'Discussion',         'color' => '#3498db'],
            ['value' => 'collecting_support', 'label' => 'Collecting Support', 'color' => '#9b59b6'],
            ['value' => 'concluded',          'label' => 'Concluded',          'color' => '#27ae60'],
            ['value' => 'rejected',           'label' => 'Rejected',           'color' => '#e74c3c'],
            ['value' => 'archived',           'label' => 'Archived',           'color' => '#7f8c8d'],
        ],
        'legislative' => [
            ['value' => 'draft',        'label' => 'Draft',        'color' => '#949494'],
            ['value' => 'under_review', 'label' => 'Under Review', 'color' => '#f39c12'],
            ['value' => 'accepted',     'label' => 'Accepted',     'color' => '#27ae60'],
            ['value' => 'rejected',     'label' => 'Rejected',     'color' => '#e74c3c'],
        ],
        'administrative' => [
            ['value' => 'submitted',     'label' => 'Submitted',     'color' => '#3498db'],
            ['value' => 'under_process', 'label' => 'Under Process', 'color' => '#f39c12'],
            ['value' => 'resolved',      'label' => 'Resolved',      'color' => '#27ae60'],
            ['value' => 'unresolved',    'label' => 'Unresolved',    'color' => '#e74c3c'],
        ],
        'service' => [
            ['value' => 'submitted',     'label' => 'Submitted',     'color' => '#3498db'],
            ['value' => 'under_process', 'label' => 'Under Process', 'color' => '#f39c12'],
            ['value' => 'resolved',      'label' => 'Resolved',      'color' => '#27ae60'],
            ['value' => 'unresolved',    'label' => 'Unresolved',    'color' => '#e74c3c'],
            ['value' => 'expired',       'label' => 'Expired',       'color' => '#95a5a6'],
        ],
        'collective' => [
            ['value' => 'planned',    'label' => 'Planned',    'color' => '#949494'],
            ['value' => 'open',       'label' => 'Open',       'color' => '#3498db'],
            ['value' => 'in_session', 'label' => 'In Session', 'color' => '#f39c12'],
            ['value' => 'concluded',  'label' => 'Concluded',  'color' => '#27ae60'],
            ['value' => 'closed',     'label' => 'Closed',     'color' => '#7f8c8d'],
            ['value' => 'archived',   'label' => 'Archived',   'color' => '#95a5a6'],
        ],
        'oversight' => [
            ['value' => 'reported',            'label' => 'Reported',      'color' => '#3498db'],
            ['value' => 'under_investigation', 'label' => 'Investigating', 'color' => '#f39c12'],
            ['value' => 'resolved',            'label' => 'Resolved',      'color' => '#27ae60'],
            ['value' => 'dismissed',           'label' => 'Dismissed',     'color' => '#95a5a6'],
            ['value' => 'unresolved',          'label' => 'Unresolved',    'color' => '#e74c3c'],
        ],
        'governance' => [
            ['value' => 'submitted',    'label' => 'Submitted',    'color' => '#3498db'],
            ['value' => 'under_review', 'label' => 'Under Review', 'color' => '#f39c12'],
            ['value' => 'resolved',     'label' => 'Resolved',     'color' => '#27ae60'],
            ['value' => 'unresolved',   'label' => 'Unresolved',   'color' => '#e74c3c'],
        ],
        'official' => [
            ['value' => 'draft',     'label' => 'Draft',        'color' => '#949494'],
            ['value' => 'review',    'label' => 'Under Review', 'color' => '#f39c12'],
            ['value' => 'published', 'label' => 'Published',    'color' => '#27ae60'],
            ['value' => 'archived',  'label' => 'Archived',     'color' => '#7f8c8d'],
        ],
    ];

    private ?IOutput $output = null;
    private ?IDBConnection $connection = null;

    public function __construct(?IDBConnection $dbConnection = null)
    {
        $this->connection = $dbConnection;
    }

    // ================================================================
    // SCHEMA
    // ================================================================

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;

        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();
        $changed = false;

        // -------------------------------------------------------------
        // ADD: agora_inq_families.statuses (JSON, nullable)
        // -------------------------------------------------------------
        if ($schema->hasTable('agora_inq_families')) {
            $families = $schema->getTable('agora_inq_families');
            if (!$families->hasColumn('statuses')) {
                $families->addColumn('statuses', Types::JSON, [
                    'notnull' => false,
                    'default' => null,
                ]);
                $changed = true;
                $this->log('  + agora_inq_families.statuses');
            } else {
                $this->log('agora_inq_families.statuses already present');
            }
        } else {
            $this->log('table agora_inq_families not found, skipping statuses addition');
        }

        // -------------------------------------------------------------
        // DROP: obsolete columns
        // -------------------------------------------------------------
        foreach (self::COLUMNS_TO_DROP as $tableName => $columns) {
            if (!$schema->hasTable($tableName)) {
                $this->log("table {$tableName} not found, skipping");
                continue;
            }

            $table = $schema->getTable($tableName);

            foreach ($columns as $column) {
                if (!$table->hasColumn($column)) {
                    $this->log("{$tableName}.{$column} already absent");
                    continue;
                }

                // Drop dependent indexes / FKs first — Doctrine also does this
                // automatically, but doing it explicitly is safer on MariaDB
                // and PostgreSQL.
                foreach ($table->getIndexes() as $index) {
                    if (in_array($column, $index->getColumns(), true)) {
                        $table->dropIndex($index->getName());
                        $this->log("  - dependent index {$index->getName()} on {$tableName}");
                    }
                }
                foreach ($table->getForeignKeys() as $fk) {
                    if (in_array($column, $fk->getLocalColumns(), true)) {
                        $table->removeForeignKey($fk->getName());
                        $this->log("  - dependent FK {$fk->getName()} on {$tableName}");
                    }
                }

                $table->dropColumn($column);
                $changed = true;
                $this->log("  - {$tableName}.{$column}");
            }
        }

        return $changed ? $schema : null;
    }

    // ================================================================
    // DATA BACKFILL
    // ================================================================

    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;

        if (!$this->connection) {
            $this->log('No DB connection — skipping statuses backfill');
            return;
        }

        $this->backfillFamilyStatuses();
    }

    /**
     * Populate `agora_inq_families.statuses` for every family that
     * currently has no statuses set (NULL, empty string, or '[]').
     *
     * Idempotent: rows that already have a non-empty statuses array
     * are never touched.
     */
    private function backfillFamilyStatuses(): void
    {
        $this->log('Backfilling default statuses for existing inquiry families...');

        if (!$this->connection->tableExists('agora_inq_families')) {
            $this->log('  agora_inq_families table not found — nothing to backfill');
            return;
        }

        $total = 0;

        foreach (self::DEFAULT_FAMILY_STATUSES as $familyType => $statuses) {
            $encoded = json_encode($statuses);
            if ($encoded === false) {
                $this->log("  ⚠️ {$familyType}: json_encode failed, skipping");
                continue;
            }

            $qb = $this->connection->getQueryBuilder();
            $qb->update('agora_inq_families')
                ->set('statuses', $qb->createNamedParameter($encoded))
                ->where($qb->expr()->eq(
                    'family_type',
                    $qb->createNamedParameter($familyType)
                ))
                ->andWhere($qb->expr()->orX(
                    $qb->expr()->isNull('statuses'),
                    $qb->expr()->eq('statuses', $qb->createNamedParameter('')),
                    $qb->expr()->eq('statuses', $qb->createNamedParameter('[]'))
                ));

            $updated = $qb->executeStatement();
            $total += $updated;

            if ($updated > 0) {
                $this->log("  • {$familyType}: {$updated} row(s) updated");
            } else {
                $this->log("  - {$familyType}: already populated");
            }
        }

        $this->log("Statuses backfill finished ({$total} row(s) updated)");
    }

    // ================================================================
    // LOGGING
    // ================================================================

    private function log(string $msg): void
    {
        if ($this->output !== null) {
            $this->output->info('Agora 1.8.1 - ' . $msg);
        }
    }
}
