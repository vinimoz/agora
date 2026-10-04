<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Agora 1.8.1 — drop obsolete columns after the 1.8.0 data conversion.
 *
 * Uses ISchemaWrapper::dropColumn() so Doctrine generates the correct
 * cross-platform DDL (MySQL/MariaDB/PostgreSQL/SQLite) and takes care of
 * dropping dependent indexes and foreign keys itself.
 *
 * Kept separate from 1.8.0 because the data migration
 * (access → visibility / publication_status) requires the `access`
 * column to still be present when it runs.
 */

namespace OCA\Agora\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version01080120261001120000 extends SimpleMigrationStep
{
    /**
     * @var array<string, string[]> unprefixed table => columns to drop
     */
    private const COLUMNS_TO_DROP = [
        'agora_inquiries' => ['access'],
        'agora_inq_group' => ['access', 'owned_group'],
        'agora_options'   => ['access', 'owned_group'],
    ];

    private ?IOutput $output = null;

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;

        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();
        $changed = false;

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

                // Doctrine will drop dependent indexes / FKs automatically on
                // most platforms. To be extra safe on PostgreSQL and MariaDB,
                // drop them explicitly first — the code below is a no-op when
                // no such index/FK exists.
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

    private function log(string $msg): void
    {
        if ($this->output !== null) {
            $this->output->info('Agora 1.8.1 - ' . $msg);
        }
    }
}
