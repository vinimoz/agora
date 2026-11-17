<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use OCA\Agora\Db\IndexDefinitions;
use OCP\DB\ISchemaWrapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Agora 1.7.16 — consolidate index/constraint state.
 *
 * Part 1: add COMMON indices newly declared in IndexDefinitions
 *         (5 re-added after being dropped by 1.7.10 + 3 new).
 * Part 2: re-apply UNIQUE indices and FK constraints that were
 *         silently skipped because IndexManager::createSchema() recursed
 *         and aborted 1.5/1.6 migrations.
 *
 * Fully idempotent: safe to re-run on any install state.
 */
class Version01071620260105120000 extends SimpleMigrationStep
{
    public function __construct(
        private IDBConnection $connection,
    ) {
    }

    /** Delete orphan rows first, as the CASCADE would have: adding the FK fails on them. */
    public function preSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $schema = $schemaClosure();
        foreach (IndexDefinitions::FK_INDICES as $parentName => $children) {
            if (!$schema->hasTable($parentName)) {
                continue;
            }
            foreach ($children as $childName => $fk) {
                $column = $fk['constraintColumn'] ?? null;
                if ($column === null || !$schema->hasTable($childName)
                    || !$schema->getTable($childName)->hasColumn($column)) {
                    continue;
                }
                $deleted = $this->deleteOrphans($parentName, $childName, $column);
                if ($deleted > 0) {
                    $output->info("Agora 1.7.16: deleted {$deleted} orphan rows from {$childName}.{$column}");
                }
            }
        }
    }

    private function deleteOrphans(string $parentName, string $childName, string $column): int
    {
        $parentIds = $this->connection->getQueryBuilder();
        $parentIds->select('id')->from($parentName);

        $qb = $this->connection->getQueryBuilder();
        $qb->delete($childName)
            // 0 means "no parent" for some rows (group attachments): keep them
            ->where($qb->expr()->gt($column, $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->notIn($column, $qb->createFunction($parentIds->getSQL())));
        return $qb->executeStatement();
    }

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $schema = $schemaClosure();
        $changed = false;

        $changed = $this->registerCommonIndices($schema, $output) || $changed;
        $changed = $this->registerUniqueIndices($schema, $output) || $changed;
        $changed = $this->registerForeignKeys($schema, $output)   || $changed;

        return $changed ? $schema : null;
    }


    private function registerCommonIndices(ISchemaWrapper $schema, IOutput $out): bool
    {
        $changed = false;
        foreach (IndexDefinitions::COMMON_INDICES as $def) {
            $t = $def['table'];
            if (!$schema->hasTable($t)) {
                continue;
            }
            $table = $schema->getTable($t);
            if ($table->hasIndex($def['name'])) {
                continue;
            }
            if (!empty($def['unique'])) {
                $table->addUniqueIndex($def['columns'], $def['name']);
            } else {
                $table->addIndex($def['columns'], $def['name']);
            }
            $out->info("Agora 1.7.14 + common {$def['name']} on {$t}");
            $changed = true;
        }
        return $changed;
    }

    private function registerUniqueIndices(ISchemaWrapper $schema, IOutput $out): bool
    {
        $changed = false;
        foreach (IndexDefinitions::UNIQUE_INDICES as $t => $indices) {
            if (!$schema->hasTable($t)) {
                continue;
            }
            $table = $schema->getTable($t);
            foreach ($indices as $name => $def) {
                if ($table->hasIndex($name)) {
                    continue;
                }
                $table->addUniqueIndex($def['columns'], $name);
                $out->info("Agora 1.7.14 + unique {$name} on {$t}");
                $changed = true;
            }
        }
        return $changed;
    }

private function registerForeignKeys(ISchemaWrapper $schema, IOutput $out): bool
{
    $changed = false;

    foreach (IndexDefinitions::FK_INDICES as $parentName => $children) {
        if (!$schema->hasTable($parentName)) {
            $out->info("Agora 1.7.16: skip parent {$parentName}: not in schema");
            continue;
        }
        $parent = $schema->getTable($parentName);
        if ($parent === null) {
            $out->warning("Agora 1.7.16: skip parent {$parentName}: getTable returned null");
            continue;
        }

        foreach ($children as $childName => $fk) {
            if (!$schema->hasTable($childName)) {
                $out->info("Agora 1.7.16: skip child {$childName}: not in schema");
                continue;
            }
            $child = $schema->getTable($childName);
            if ($child === null) {
                $out->warning("Agora 1.7.16: skip child {$childName} (parent {$parentName}): getTable returned null");
                continue;
            }

            $column = $fk['constraintColumn'] ?? null;
            if ($column === null || !$child->hasColumn($column)) {
                $out->warning("Agora 1.7.16: skip FK {$childName}.{$column}: column missing");
                continue;
            }

            // Idempotent check — DBAL 3/4 compatible
            $exists = false;
	    foreach ($child->getForeignKeys() as $existing) {
    $out->info(get_class($existing));
    $out->info(implode(', ', get_class_methods($existing)));
    break;
}
	    if ($exists) {
                $out->info("Agora 1.7.16: FK {$childName}.{$column} already exists");
                continue;
            }

            $fkName = 'fk_' . $childName . '_' . $column;
            if (strlen($fkName) > 63) {
                $fkName = 'fk_' . substr(md5($fkName), 0, 16);
            }

            try {
                $child->addForeignKeyConstraint(
                    $parent,
                    [$column],
                    ['id'],
                    ['onDelete' => $fk['onDelete'] ?? 'CASCADE'],
                    $fkName
                );
                $out->info("Agora 1.7.16 + FK {$fkName}");
                $changed = true;
            } catch (\Throwable $e) {
                $out->warning("Agora 1.7.16: FK {$fkName} failed: " . $e->getMessage());
            }
        }
    }

    return $changed;
}
}
