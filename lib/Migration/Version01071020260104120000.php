<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use OCA\Agora\Db\IndexDefinitions;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Agora 1.7.10
 *
 * Register all indices (common, optional, unique, support) directly inside
 * changeSchema() so Nextcloud's schema diff recognises them and stops
 * emitting "unexpected index" warnings during migration from NC 34 to NC 35.
 *
 * The OBSOLETE_INDICES list must contain ONLY names that are no longer
 * present in OCA\Agora\Db\IndexDefinitions — otherwise the migration drops
 * and immediately re-adds the same index in the same step.
 *
 * This migration is completely prefix-agnostic: it never hardcodes `oc_`.
 * Table names are resolved through ISchemaWrapper, which transparently
 * handles any Nextcloud table prefix (`oc_`, `nc_`, custom, etc.).
 */
class Version01071020260104120000 extends SimpleMigrationStep
{
    /**
     * Indices from earlier Agora versions that must be removed because they
     * are not declared in IndexDefinitions anymore.
     *
     * IMPORTANT: none of these names appear in IndexDefinitions::*
     * (after the 1.7.10 cleanup). If you find yourself needing to add a name
     * here that is also declared in IndexDefinitions, remove it from
     * IndexDefinitions instead — do not leave both.
     *
     * Table names here are UNPREFIXED (Nextcloud's ISchemaWrapper resolves
     * them against the configured prefix automatically).
     *
     * Format: [unprefixedTableName => [indexName => true]]
     */
    private const OBSOLETE_INDICES = [
        // Superseded by inq_owner_deleted / inq_type_family / etc.
        'agora_inquiries' => [
            'inquiries_family_type' => true,
            'inquiries_inquiries_deleted' => true,
            'inquiries_inquiries_owners' => true,
            'inquiries_inquiries_owners_non_deleted' => true,
            'inquiries_status_expire' => true,
        ],
        'agora_inq_group' => [
            'inquirygroup_deleted' => true,
            'inquirygroup_owner' => true,
            'inquirygroup_type_status' => true,
        ],
        'agora_options' => [
            'inquiries_options_non_deleted' => true,
            'inquiries_options_owner' => true,
            'inquiries_options_sort_order' => true,
            'inquiries_options_type_status' => true,
        ],
        // Pre-1.7.2 name — renamed by Version010702 to uq_agora_ginq_ig
        'agora_groups_inquiries' => [
            'agora_uniq_inquiry_group_relation' => true,
        ],
        'agora_inq_group_misc' => [
            'groupmisc_key' => true,
            'groupmisc_group_key' => true,
        ],
        'agora_supports' => [
            'inquiries_supports_hash' => true,
            'inquiries_supports_user_created' => true,
        ],
        'agora_comments' => [
            'comment_inquiry_deleted' => true,
        ],
        'agora_share' => [
            'inquiries_group_shares_user' => true,
            'inquiries_shares_token' => true,
            'inquiries_shares_types' => true,
            'inquiries_shares_user' => true,
        ],
    ];

    private ?IOutput $output = null;

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;

        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();
        $changed = false;

        $this->log('Normalising index state');

        // STEP 1: Drop obsolete indices (best-effort, non-fatal)
        $changed = $this->dropObsoleteIndices($schema) || $changed;

        // STEP 2: Register current indices (idempotent)
        $changed = $this->registerOptionalIndices($schema) || $changed;
        $changed = $this->registerUniqueIndices($schema) || $changed;
        $changed = $this->registerCommonIndices($schema) || $changed;
        $changed = $this->registerSupportIndices($schema) || $changed;
        $changed = $this->registerSupportEngineIndices($schema) || $changed;
        $changed = $this->registerSupportResultIndices($schema) || $changed;

        $this->log($changed
            ? 'Schema changes queued for migration'
            : 'Index state already consistent');

        return $changed ? $schema : null;
    }

    // ------------------------------------------------------------------
    // Obsolete index removal
    // ------------------------------------------------------------------

    private function dropObsoleteIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;

        foreach (self::OBSOLETE_INDICES as $tableName => $indexNames) {
            if (!$schema->hasTable($tableName)) {
                continue;
            }

            $table = $schema->getTable($tableName);

            foreach (array_keys($indexNames) as $indexName) {
                if (!$table->hasIndex($indexName)) {
                    continue;
                }

                try {
                    $table->dropIndex($indexName);
                    $changed = true;
                    $this->log("  - obsolete index {$indexName} on {$tableName}");
                } catch (\Throwable $e) {
                    // Some DB platforms silently fail when dropping an index
                    // Doctrine doesn't know about. Don't break the migration.
                    $this->log("  ! could not drop {$indexName} on {$tableName}: " . $e->getMessage());
                }
            }
        }

        return $changed;
    }

    // ------------------------------------------------------------------
    // Current index registration
    // ------------------------------------------------------------------

    private function registerOptionalIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;

        foreach (IndexDefinitions::OPTIONAL_INDICES as $tableName => $indices) {
            $table = $this->getTable($schema, $tableName);
            if ($table === null) {
                continue;
            }

            foreach ($indices as $name => $definition) {
                if ($table->hasIndex($name)) {
                    continue;
                }
                $table->addIndex($definition['columns'], $name);
                $changed = true;
                $this->log("  + optional index {$name} on {$tableName}");
            }
        }

        return $changed;
    }

    private function registerUniqueIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;

        foreach (IndexDefinitions::UNIQUE_INDICES as $tableName => $indices) {
            $table = $this->getTable($schema, $tableName);
            if ($table === null) {
                continue;
            }

            foreach ($indices as $name => $definition) {
                if ($table->hasIndex($name)) {
                    continue;
                }
                $table->addUniqueIndex($definition['columns'], $name);
                $changed = true;
                $this->log("  + unique index {$name} on {$tableName}");
            }
        }

        return $changed;
    }

    private function registerCommonIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;
        $seen = []; // Guard against duplicate keys in IndexDefinitions

        foreach (IndexDefinitions::COMMON_INDICES as $definition) {
            $tableName = $definition['table'];
            $indexName = $definition['name'];

            // Deduplicate on (table, indexName) pair. Even after cleaning
            // IndexDefinitions, keep this guard in case future edits re-add
            // duplicate keys.
            $dedupKey = $tableName . '::' . $indexName;
            if (isset($seen[$dedupKey])) {
                continue;
            }
            $seen[$dedupKey] = true;

            $table = $this->getTable($schema, $tableName);
            if ($table === null) {
                continue;
            }

            if ($table->hasIndex($indexName)) {
                continue;
            }

            if (!empty($definition['unique'])) {
                $table->addUniqueIndex($definition['columns'], $indexName);
            } else {
                $table->addIndex($definition['columns'], $indexName);
            }
            $changed = true;
            $this->log("  + common index {$indexName} on {$tableName}");
        }

        return $changed;
    }

    private function registerSupportIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;

        foreach (IndexDefinitions::SUPPORT_INDICES as $tableName => $indices) {
            $table = $this->getTable($schema, $tableName);
            if ($table === null) {
                continue;
            }

            foreach ($indices as $name => $definition) {
                if ($table->hasIndex($name)) {
                    continue;
                }
                $table->addIndex($definition['columns'], $name);
                $changed = true;
                $this->log("  + support index {$name} on {$tableName}");
            }
        }

        return $changed;
    }

    private function registerSupportEngineIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;

        foreach (IndexDefinitions::SUPPORT_ENGINE_INDICES as $tableName => $indices) {
            $table = $this->getTable($schema, $tableName);
            if ($table === null) {
                continue;
            }

            foreach ($indices as $name => $definition) {
                if ($table->hasIndex($name)) {
                    continue;
                }
                if (!empty($definition['unique'])) {
                    $table->addUniqueIndex($definition['columns'], $name);
                } else {
                    $table->addIndex($definition['columns'], $name);
                }
                $changed = true;
                $this->log("  + support engine index {$name} on {$tableName}");
            }
        }

        return $changed;
    }

    private function registerSupportResultIndices(ISchemaWrapper $schema): bool
    {
        $changed = false;

        foreach (IndexDefinitions::SUPPORT_RESULT_INDICES as $tableName => $indices) {
            $table = $this->getTable($schema, $tableName);
            if ($table === null) {
                continue;
            }

            foreach ($indices as $name => $definition) {
                if ($table->hasIndex($name)) {
                    continue;
                }
                if (!empty($definition['unique'])) {
                    $table->addUniqueIndex($definition['columns'], $name);
                } else {
                    $table->addIndex($definition['columns'], $name);
                }
                $changed = true;
                $this->log("  + support result index {$name} on {$tableName}");
            }
        }

        return $changed;
    }

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    /**
     * Resolve an unprefixed table name against the schema wrapper.
     *
     * Nextcloud's ISchemaWrapper::hasTable() / getTable() accept UNPREFIXED
     * names and resolve them against the configured `dbtableprefix`. This
     * helper simply centralises the lookup so we never hardcode `oc_`.
     */
    private function getTable(ISchemaWrapper $schema, string $unprefixedName)
    {
        if (!$schema->hasTable($unprefixedName)) {
            return null;
        }

        return $schema->getTable($unprefixedName);
    }

    private function log(string $message): void
    {
        if ($this->output !== null) {
            $this->output->info('Agora 1.7.10 - ' . $message);
        }
    }
}
