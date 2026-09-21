<?php

declare(strict_types=1);

namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Db\IndexDefinitions;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

/**
 * Diagnostic repair step: reports missing indices but does not create them.
 * The migration chain is now the source of truth for schema state.
 * Run `occ agora:index:create` manually if you need to repair a broken DB.
 */
class CreateIndices implements IRepairStep
{
    public function __construct(
        private IDBConnection $connection,
    ) {
    }

    public function getName(): string
    {
        return 'Agora - Verify required indices are present';
    }

    public function run(IOutput $output): void
    {
        $schema = $this->connection->createSchema();
        $missing = [];

        // Optional
        foreach (IndexDefinitions::OPTIONAL_INDICES as $table => $indices) {
            if (!$schema->hasTable($table)) {
                continue;
            }
            $t = $schema->getTable($table);
            foreach ($indices as $name => $def) {
                if (!$t->hasIndex($name)) {
                    $missing[] = "{$table}.{$name}";
                }
            }
        }

        // Unique
        foreach (IndexDefinitions::UNIQUE_INDICES as $table => $indices) {
            if (!$schema->hasTable($table)) {
                continue;
            }
            $t = $schema->getTable($table);
            foreach ($indices as $name => $def) {
                if (!$t->hasIndex($name)) {
                    $missing[] = "{$table}.{$name} (unique)";
                }
            }
        }

        // Common
        foreach (IndexDefinitions::COMMON_INDICES as $def) {
            $table = $def['table'];
            $name = $def['name'];
            if (!$schema->hasTable($table)) {
                continue;
            }
            $t = $schema->getTable($table);
            if (!$t->hasIndex($name)) {
                $missing[] = "{$table}.{$name}";
            }
        }

        // Support
        foreach (['SUPPORT_INDICES', 'SUPPORT_ENGINE_INDICES', 'SUPPORT_RESULT_INDICES'] as $group) {
            $const = "OCA\\Agora\\Db\\IndexDefinitions::{$group}";
            foreach (constant($const) as $table => $indices) {
                if (!$schema->hasTable($table)) {
                    continue;
                }
                $t = $schema->getTable($table);
                foreach ($indices as $name => $def) {
                    if (!$t->hasIndex($name)) {
                        $missing[] = "{$table}.{$name}";
                    }
                }
            }
        }

        if ($missing !== []) {
            $output->warning(sprintf(
                'Agora: %d required index(es) are missing. Run `occ agora:index:create` to repair.',
                count($missing)
            ));
            foreach ($missing as $m) {
                $output->info('  missing: ' . $m);
            }
        } else {
            $output->info('Agora: all required indices are present.');
        }
    }
}
