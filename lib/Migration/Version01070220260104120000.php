<?php

declare(strict_types=1);

namespace OCA\Agora\Migration;

use OCA\Agora\Db\InquiryGroup;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Fix too-long index name on agora_groups_inquiries table for Agora 1.7.2
 * Compatible with MySQL, MariaDB, and PostgreSQL.
 */
class Version01070220260104120000 extends SimpleMigrationStep
{
    private IOutput $output;

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        $schema = $schemaClosure();

        $tableName = InquiryGroup::RELATION_TABLE; // 'agora_groups_inquiries'
        if (!$schema->hasTable($tableName)) {
            $this->logInfo("Table $tableName not found, skipping.");
            return null;
        }

        $table = $schema->getTable($tableName);
        $columns = ['inquiry_id', 'group_id'];
        $newIndexName = 'uq_agora_ginq_ig';

        // Drop any existing unique index on the same columns (any name)
        foreach ($table->getIndexes() as $index) {
            if ($index->isUnique() && $index->getColumns() === $columns) {
                $oldName = $index->getName();
                $table->dropIndex($oldName);
                $this->logInfo("Dropped old unique index '$oldName' on (" . implode(',', $columns) . ").");
            }
        }

        // Add the new short-named unique index if not already present
        if (!$table->hasIndex($newIndexName)) {
            $table->addUniqueIndex($columns, $newIndexName);
            $this->logInfo("Added unique index '$newIndexName' on (" . implode(',', $columns) . ").");
        }

        return $schema;
    }

    private function logInfo(string $message): void
    {
        $this->output->info('Agora 1.7.2 fix: ' . $message);
    }
}
