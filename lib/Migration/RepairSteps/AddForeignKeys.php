<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Migration\RepairSteps;

use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\Comment;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryGroupMisc;
use OCA\Agora\Db\InquiryLink;
use OCA\Agora\Db\InquiryMisc;
use OCA\Agora\Db\Log;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\OptionMisc;
use OCA\Agora\Db\Quorum;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\Watch;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Schema\Table;

class AddForeignKeys implements IRepairStep
{
    public function __construct(
        private IDBConnection $connection
    ) {}

    public function getName(): string
    {
        return 'Add foreign key constraints to Agora tables';
    }

    public function run(IOutput $output): void
    {
        $output->info('Adding foreign key constraints to Agora tables...');
        
        $schema = new Schema();
        $this->syncTablesFromDatabase($schema);
        
        $added = 0;
        $skipped = 0;
        $failed = [];
        
        // Get parent tables
        $inquiryTable = $schema->getTable($this->getPrefixedName(Inquiry::TABLE));
        $inquiryGroupTable = $schema->getTable($this->getPrefixedName(InquiryGroup::TABLE));
        $optionTable = $schema->getTable($this->getPrefixedName(Option::TABLE));
        
        // Define FKs to add
        $fkDefinitions = [
            // Child table => [local column, parent table, parent column, onDelete]
            $this->getPrefixedName(Log::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Subscription::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Support::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Watch::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(InquiryGroup::RELATION_TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(InquiryMisc::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(InquiryLink::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Comment::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Attachment::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Quorum::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Option::TABLE) => ['parent_id', $inquiryTable, 'id', 'CASCADE'],
            $this->getPrefixedName(Share::TABLE) => ['inquiry_id', $inquiryTable, 'id', 'CASCADE'],
        ];
        
        // Add InquiryGroup FKs
        if ($schema->hasTable($this->getPrefixedName(InquiryGroup::RELATION_TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(InquiryGroup::RELATION_TABLE));
            $this->addForeignKey($table, 'group_id', $inquiryGroupTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        if ($schema->hasTable($this->getPrefixedName(InquiryGroupMisc::TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(InquiryGroupMisc::TABLE));
            $this->addForeignKey($table, 'inquiry_group_id', $inquiryGroupTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        if ($schema->hasTable($this->getPrefixedName(Share::TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(Share::TABLE));
            $this->addForeignKey($table, 'group_id', $inquiryGroupTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        // Add Option FKs
        if ($schema->hasTable($this->getPrefixedName(OptionMisc::TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(OptionMisc::TABLE));
            $this->addForeignKey($table, 'option_id', $optionTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        if ($schema->hasTable($this->getPrefixedName(Support::TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(Support::TABLE));
            $this->addForeignKey($table, 'option_id', $optionTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        if ($schema->hasTable($this->getPrefixedName(Comment::TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(Comment::TABLE));
            $this->addForeignKey($table, 'option_id', $optionTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        if ($schema->hasTable($this->getPrefixedName(Quorum::TABLE))) {
            $table = $schema->getTable($this->getPrefixedName(Quorum::TABLE));
            $this->addForeignKey($table, 'option_id', $optionTable, 'id', 'CASCADE', $added, $skipped, $failed);
        }
        
        // Add all Inquiry FKs
        foreach ($fkDefinitions as $tableName => [$column, $parentTable, $parentColumn, $onDelete]) {
            if ($schema->hasTable($tableName)) {
                $table = $schema->getTable($tableName);
                $this->addForeignKey($table, $column, $parentTable, $parentColumn, $onDelete, $added, $skipped, $failed);
            }
        }
        
        // Generate and execute SQL
        $sql = $schema->toSql($this->connection->getDatabasePlatform());
        
        foreach ($sql as $query) {
            if (str_contains($query, 'ADD CONSTRAINT')) {
                try {
                    $this->connection->executeStatement($query);
                    $added++;
                    $output->info("✓ Executed: " . $query);
                } catch (\Exception $e) {
                    $failed[] = $query . ' - ' . $e->getMessage();
                    $output->warning("✗ Failed: " . $query . ' - ' . $e->getMessage());
                }
            }
        }
        
        $output->info(sprintf('Foreign keys: %d added, %d skipped, %d failed', $added, $skipped, count($failed)));
    }
    
    private function addForeignKey(Table $table, string $localColumn, Table $parentTable, string $parentColumn, string $onDelete, int &$added, int &$skipped, array &$failed): void
    {
        // Check if FK already exists
        foreach ($table->getForeignKeys() as $fk) {
            if ($fk->getForeignTableName() === $parentTable->getName() && 
                in_array($localColumn, $fk->getLocalColumns())) {
                $skipped++;
                return;
            }
        }
        
        // Check if columns exist and are compatible
        if (!$table->hasColumn($localColumn) || !$parentTable->hasColumn($parentColumn)) {
            $failed[] = "Column missing: {$table->getName()}.{$localColumn} or {$parentTable->getName()}.{$parentColumn}";
            return;
        }
        
        $table->addForeignKeyConstraint(
            $parentTable->getName(),
            [$localColumn],
            [$parentColumn],
            ['onDelete' => $onDelete],
            'fk_' . $table->getName() . '_' . $localColumn
        );
    }
    
    private function getPrefixedName(string $tableName): string
    {
        $prefix = $this->connection->getPrefix();
        return $prefix . $tableName;
    }
    
    private function syncTablesFromDatabase(Schema $schema): void
    {
        $sm = $this->connection->createSchemaManager();
        $tables = $sm->listTables();
        
        foreach ($tables as $table) {
            if (str_contains($table->getName(), 'agora')) {
                $schema->createTable($table->getName());
                $schemaTable = $schema->getTable($table->getName());
                
                foreach ($table->getColumns() as $column) {
                    $schemaTable->addColumn($column->getName(), $column->getType()->getName(), [
                        'notnull' => $column->getNotnull(),
                        'unsigned' => $column->getUnsigned(),
                        'length' => $column->getLength(),
                        'autoincrement' => $column->getAutoincrement(),
                    ]);
                }
            }
        }
    }
}
