<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Agora 1.8.0 patch 3 — reconcile declared schema with actual DB.
 *
 *  - Declares the 14 indices that 1.8.0 created only through raw SQL in
 *    postSchemaChange(), so Nextcloud stops reporting them as "unexpected".
 *  - Drops agora_inq_group.owned_group via changeSchema() (it was only
 *    dropped in postSchemaChange before), so the schema check stops
 *    reporting it as "missing".
 *
 * Idempotent: safe on fresh installs and on installs where 1.8.0 already ran.
 */

namespace OCA\Agora\Migration;

use OCA\Agora\Db\IndexDefinitions;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version01080020260707120003 extends SimpleMigrationStep
{
    private ?IOutput $output = null;

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();
        $changed = false;

        // 1. Declare the 1.8.0 indices inside changeSchema().
        foreach (IndexDefinitions::V18_INDICES as $tableName => $indices) {
            if (!$schema->hasTable($tableName)) {
                continue;
            }
            $table = $schema->getTable($tableName);
            foreach ($indices as $indexName => $def) {
                if ($table->hasIndex($indexName)) {
                    continue;
                }
                $missing = [];
                foreach ($def['columns'] as $col) {
                    if (!$table->hasColumn($col)) {
                        $missing[] = $col;
                    }
                }
                if (!empty($missing)) {
                    $this->log("skip {$indexName}: missing column(s) " . implode(',', $missing));
                    continue;
                }
                $table->addIndex($def['columns'], $indexName);
                $this->log("+ index {$indexName} on {$tableName}");
                $changed = true;
            }
        }

        // 2. Drop agora_inq_group.owned_group inside changeSchema().
        if ($schema->hasTable('agora_inq_group')) {
            $table = $schema->getTable('agora_inq_group');
            if ($table->hasColumn('owned_group')) {
                foreach ($table->getIndexes() as $index) {
                    if (in_array('owned_group', $index->getColumns(), true)) {
                        $table->dropIndex($index->getName());
                        $this->log("- dependent index {$index->getName()} on agora_inq_group");
                    }
                }
                foreach ($table->getForeignKeys() as $fk) {
                    if (in_array('owned_group', $fk->getLocalColumns(), true)) {
                        $table->removeForeignKey($fk->getName());
                        $this->log("- dependent FK {$fk->getName()} on agora_inq_group");
                    }
                }
                $table->dropColumn('owned_group');
                $this->log('- agora_inq_group.owned_group');
                $changed = true;
            }
        }

        return $changed ? $schema : null;
    }

    private function log(string $msg): void
    {
        $this->output?->info('Agora 1.8.0 patch 3 - ' . $msg);
    }
}
