<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\MySQLPlatform;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryFamily;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryGroupType;
use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryStatus;
use OCA\Agora\Db\InquiryType;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\Comment;
use OCA\Agora\Db\Log;
use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\OptionFamily;
use OCA\Agora\Db\Preferences;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\Support;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\DB\Types;

/**
 * Migration from Agora version 1.7.0 to 1.7.1
 * This is a comprehensive fix-it-all migration that ensures the database schema
 * matches the definitive TableSchema definition.
 */
class Version01070120260104120000 extends SimpleMigrationStep
{
    private ISchemaWrapper $schema;
    private ?IOutput $output = null;
    private bool $isMySQL = false;

    /**
     * @param IOutput $output
     * @param \Closure $schemaClosure
     * @param array $options
     * @return null|ISchemaWrapper
     */
    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        $this->output = $output;
        $this->schema = $schemaClosure();
        
        // Detect database platform
        $platform = $this->schema->getDatabasePlatform();
        $this->isMySQL = $platform instanceof MySQLPlatform;

        $this->logInfo('Starting Agora 1.7.1 comprehensive schema fix');
        $this->logInfo('Database platform: ' . ($this->isMySQL ? 'MySQL' : 'PostgreSQL'));

        // 1. Fix index collisions first (before any table operations)
        $this->fixIndexCollisions();

        // 2. Fix table name inconsistencies
        $this->fixTableNamePrefixes();

        // 3. Create any missing tables (with platform-aware JSON defaults)
        $this->createMissingTables();

        // 4. Add missing columns to existing tables
        $this->addMissingColumns();

        // 5. Fix column type mismatches and JSON defaults
        $this->fixColumnTypes();

        // 6. Drop obsolete tables and columns
        $this->dropObsoleteItems();

        // 7. Create all indices (COMMON, OPTIONAL, UNIQUE)
        $this->createAllIndices();

        // 8. Create foreign key constraints
       //  $this->createForeignKeyConstraints();

        $this->logInfo('Agora 1.7.1 schema fix completed');

        return $this->schema;
    }

    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
	    $this->output = $output;
	    $this->logInfo('Post-migration: migrating allow_support boolean to support_feature');

	    $tableName = 'oc_agora_inquiries';

	    try {
		    // Vérifier si la colonne allow_support existe encore
		    $schema = $schemaClosure();
		    if (!$schema->hasTable($tableName)) {
			    $this->logInfo("Table {$tableName} not found, skipping");
			    return;
		    }

		    $table = $schema->getTable($tableName);
		    if (!$table->hasColumn('allow_support')) {
			    $this->logInfo("Column 'allow_support' already removed, skipping data migration");
			    return;
		    }

		    // Migration : allow_support = 1 (true) support_feature = 'binary'
		    $qb = $this->connection->getQueryBuilder();
		    $qb->update($tableName)
	 ->set('support_feature', $qb->expr()->literal('binary'))
	 ->where($qb->expr()->eq('allow_support', $qb->createNamedParameter(1, \OCP\DB\IQueryBuilder::PARAM_INT)));
		    $count = $qb->executeStatement();

		    $this->logInfo("Migrated {$count} inquiries (allow_support = true → support_feature = 'binary')");

		    // Les allow_support = 0 (false) restent � 'none' (valeur par défaut)
		    $this->logInfo("Inquiries with allow_support = false keep default 'none'");

	    } catch (\Exception $e) {
		    $this->logInfo("Failed to migrate allow_support: " . $e->getMessage());
	    }
    }

    /**
     * Fix index name collisions with other apps (especially polls)
     */
    private function fixIndexCollisions(): void
    {
	    // Fix Preferences table index collision
	    $tableName = Preferences::TABLE;
	    $oldIndexName = 'UNIQ_preferences';
	    $newIndexName = 'agora_uniq_preferences';

	    if ($this->schema->hasTable($tableName)) {
		    $table = $this->schema->getTable($tableName);

		    // Drop old conflicting index if it exists
		    if ($table->hasIndex($oldIndexName)) {
			    $table->dropIndex($oldIndexName);
			    $this->logInfo("Dropped conflicting index '{$oldIndexName}' from '{$tableName}'");
		    }

		    // Create new unique index if it doesn't exist
		    if (!$table->hasIndex($newIndexName)) {
			    $table->addUniqueIndex(['user_id'], $newIndexName);
			    $this->logInfo("Added unique index '{$newIndexName}' to '{$tableName}'");
		    }
	    }

	    // Also check oc_agora_preferences variant
	    $ocTableName = 'oc_agora_preferences';
	    if ($this->schema->hasTable($ocTableName)) {
		    $table = $this->schema->getTable($ocTableName);
		    if ($table->hasIndex($oldIndexName)) {
			    $table->dropIndex($oldIndexName);
			    $this->logInfo("Dropped conflicting index '{$oldIndexName}' from '{$ocTableName}'");
		    }
		    if (!$table->hasIndex($newIndexName)) {
			    $table->addUniqueIndex(['user_id'], $newIndexName);
			    $this->logInfo("Added unique index '{$newIndexName}' to '{$ocTableName}'");
		    }
	    }
    }

    /**
     * Fix table names that have 'oc_' prefix when they shouldn't
     */
    private function fixTableNamePrefixes(): void
    {
	    $prefixMap = [
		    'oc_agora_inquiries' => 'agora_inquiries',
		    'oc_agora_inq_type' => 'agora_inq_type',
		    'oc_agora_inq_option_type' => 'agora_inq_option_type',
		    'oc_agora_support' => 'agora_support',
	    ];

	    foreach ($prefixMap as $oldName => $newName) {
		    if ($this->schema->hasTable($oldName) && !$this->schema->hasTable($newName)) {
			    $this->logInfo("Renaming table '{$oldName}' to '{$newName}'");
			    $table = $this->schema->getTable($oldName);
			    $table->setName($newName);
		    }
	    }
    }

    /**
     * Get JSON column options based on database platform
     * MySQL doesn't allow default values for JSON columns
     */
    private function getJsonOptions(array $defaultOptions): array
    {
	    if ($this->isMySQL) {
		    // Remove default value for MySQL
		    unset($defaultOptions['default']);
	    }
	    return $defaultOptions;
    }

    /**
     * Create tables that might be missing from earlier migrations
     */
    private function createMissingTables(): void
    {
	    // InquiryType table
	    if (!$this->schema->hasTable(InquiryType::TABLE)) {
		    $this->logInfo('Creating missing table: ' . InquiryType::TABLE);
		    $table = $this->schema->createTable(InquiryType::TABLE);
		    $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('inquiry_type', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('family', Types::STRING, ['notnull' => true, 'default' => 'deliberative', 'length' => 64]);
		    $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
		    $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
		    $table->addColumn('description', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('fields', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allowed_response', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allowed_transformation', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allowed_option_type', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
		    $table->addColumn('support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
		    $table->addColumn('is_root', Types::BOOLEAN, ['notnull' => false, 'default' => true]);
		    $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->setPrimaryKey(['id']);
	    }

	    // InquiryOptionType table
	    if (!$this->schema->hasTable(InquiryOptionType::TABLE)) {
		    $this->logInfo('Creating missing table: ' . InquiryOptionType::TABLE);
		    $table = $this->schema->createTable(InquiryOptionType::TABLE);
		    $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true]);
		    $table->addColumn('family', Types::STRING, ['notnull' => true, 'default' => 'debate', 'length' => 64]);
		    $table->addColumn('option_type', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('icon', Types::STRING, ['notnull' => false, 'default' => '']);
		    $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
		    $table->addColumn('description', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('fields', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allowed_response', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
		    $table->addColumn('support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
		    $table->addColumn('statuses', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('use_title', Types::BIGINT, ['notnull' => true, 'default' => 1, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true]);
		    $table->setPrimaryKey(['id']);
	    }

	    // InquiryFamily table - with platform-aware JSON defaults
	    if (!$this->schema->hasTable(InquiryFamily::TABLE)) {
		    $this->logInfo('Creating missing table: ' . InquiryFamily::TABLE);
		    $table = $this->schema->createTable(InquiryFamily::TABLE);
		    $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('family_type', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
		    $table->addColumn('description', Types::TEXT, ['notnull' => true, 'default' => '']);
		    $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
		    $table->addColumn('ui', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}']));
		    $table->addColumn('rules', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}']));
		    $table->addColumn('features', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]']));
		    $table->addColumn('actions', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]']));
		    $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->setPrimaryKey(['id']);
	    }

	    // OptionFamily table - with platform-aware JSON defaults
	    if (!$this->schema->hasTable(OptionFamily::TABLE)) {
		    $this->logInfo('Creating missing table: ' . OptionFamily::TABLE);
		    $table = $this->schema->createTable(OptionFamily::TABLE);
		    $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('family_type', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
		    $table->addColumn('description', Types::TEXT, ['notnull' => true, 'default' => '']);
		    $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
		    $table->addColumn('ui', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}']));
		    $table->addColumn('rules', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}']));
		    $table->addColumn('features', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]']));
		    $table->addColumn('actions', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]']));
		    $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->setPrimaryKey(['id']);
	    }

	    // InquiryStatus table
	    if (!$this->schema->hasTable(InquiryStatus::TABLE)) {
		    $this->logInfo('Creating missing table: ' . InquiryStatus::TABLE);
		    $table = $this->schema->createTable(InquiryStatus::TABLE);
		    $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('inquiry_type', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('status_key', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
		    $table->addColumn('description', Types::TEXT, ['notnull' => true, 'default' => '']);
		    $table->addColumn('is_final', Types::BOOLEAN, ['notnull' => false, 'default' => false]);
		    $table->addColumn('icon', Types::STRING, ['notnull' => true, 'default' => '']);
		    $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->setPrimaryKey(['id']);
	    }

	    // InquiryGroupType table - with platform-aware JSON defaults
	    if (!$this->schema->hasTable(InquiryGroupType::TABLE)) {
		    $this->logInfo('Creating missing table: ' . InquiryGroupType::TABLE);
		    $table = $this->schema->createTable(InquiryGroupType::TABLE);
		    $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true]);
		    $table->addColumn('family', Types::STRING, ['notnull' => true, 'default' => 'collective', 'length' => 64]);
		    $table->addColumn('group_type', Types::STRING, ['notnull' => true, 'length' => 50]);
		    $table->addColumn('icon', Types::STRING, ['notnull' => false, 'default' => '']);
		    $table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 100]);
		    $table->addColumn('description', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('fields', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allowed_inquiry_types', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('allowed_response', Types::TEXT, ['notnull' => false]);
		    $table->addColumn('is_root', Types::BOOLEAN, ['notnull' => false]);
		    $table->addColumn('ui', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}']));
		    $table->addColumn('rules', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '{}']));
		    $table->addColumn('features', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]']));
		    $table->addColumn('actions', Types::JSON, $this->getJsonOptions(['notnull' => true, 'default' => '[]']));
		    $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true]);
		    $table->setPrimaryKey(['id']);
	    }
    }

    /**
     * Add missing columns to existing tables based on TableSchema::TABLES
     */
    private function addMissingColumns(): void
    {
	    // Check Inquiry table
	    if ($this->schema->hasTable(Inquiry::TABLE)) {
		    $table = $this->schema->getTable(Inquiry::TABLE);
		    $this->addColumnIfMissing($table, 'cover_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'location_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'category_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'archived', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'last_interaction', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'parent_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'moderation_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
		    $this->addColumnIfMissing($table, 'allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
		    $this->addColumnIfMissing($table, 'support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
		    $this->addColumnIfMissing($table, 'family', Types::STRING, ['notnull' => false, 'default' => 'deliberative', 'length' => 64]);
		    $this->addColumnIfMissing($table, 'show_results', Types::STRING, ['notnull' => true, 'default' => 'always', 'length' => 64]);
		    $this->addColumnIfMissing($table, 'owned_group', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 255]);
	    }

	    // Check oc_agora_inquiries variant
	    if ($this->schema->hasTable('oc_agora_inquiries')) {
		    $table = $this->schema->getTable('oc_agora_inquiries');
		    $this->addColumnIfMissing($table, 'cover_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'location_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'category_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'archived', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'last_interaction', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'parent_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'moderation_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
		    $this->addColumnIfMissing($table, 'allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
		    $this->addColumnIfMissing($table, 'support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
		    $this->addColumnIfMissing($table, 'family', Types::STRING, ['notnull' => false, 'default' => 'deliberative', 'length' => 64]);
		    $this->addColumnIfMissing($table, 'show_results', Types::STRING, ['notnull' => true, 'default' => 'always', 'length' => 64]);
		    $this->addColumnIfMissing($table, 'owned_group', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 255]);
	    }

	    // Check Option table
	    if ($this->schema->hasTable(Option::TABLE)) {
		    $table = $this->schema->getTable(Option::TABLE);
		    $this->addColumnIfMissing($table, 'target_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'publication_status', Types::STRING, ['notnull' => true, 'default' => 'private', 'length' => 32]);
		    $this->addColumnIfMissing($table, 'updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'archived', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'family', Types::STRING, ['notnull' => false, 'default' => 'debate', 'length' => 64]);
		    $this->addColumnIfMissing($table, 'sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'owned_group', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 255]);
		    $this->addColumnIfMissing($table, 'allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
		    $this->addColumnIfMissing($table, 'support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
		    $this->addColumnIfMissing($table, 'show_results', Types::STRING, ['notnull' => true, 'default' => 'always', 'length' => 32]);
	    }

	    // Check InquiryGroup table
	    if ($this->schema->hasTable(InquiryGroup::TABLE)) {
		    $table = $this->schema->getTable(InquiryGroup::TABLE);
		    $this->addColumnIfMissing($table, 'allow_edit', Types::BIGINT, ['notnull' => true, 'default' => 1, 'unsigned' => true, 'length' => 20]);
		    $this->addColumnIfMissing($table, 'protected', Types::BOOLEAN, ['notnull' => false, 'default' => false]);
		    $this->addColumnIfMissing($table, 'cover_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true]);
		    $this->addColumnIfMissing($table, 'title_ext', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 128]);
		    $this->addColumnIfMissing($table, 'owned_group', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
		    $this->addColumnIfMissing($table, 'expire', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true]);
		    $this->addColumnIfMissing($table, 'metadata', Types::TEXT, ['notnull' => false, 'default' => null]);
	    }

	    // Fix token column length in Share table
	    if ($this->schema->hasTable(Share::TABLE)) {
		    $table = $this->schema->getTable(Share::TABLE);
		    if ($table->hasColumn('token')) {
			    $column = $table->getColumn('token');
			    if ($column->getLength() < 64) {
				    $column->setLength(64);
				    $this->logInfo("Updated 'token' column length to 64 in '" . Share::TABLE . "'");
			    }
		    }
	    }
    }

    private function addColumnIfMissing($table, string $columnName, string $type, array $options): void
    {
	    if (!$table->hasColumn($columnName)) {
		    $table->addColumn($columnName, $type, $options);
		    $this->logInfo("Added missing column '{$columnName}' to '" . $table->getName() . "'");
	    }
    }

    /**
     * Fix any column type mismatches
     */
    private function fixColumnTypes(): void
    {
	    // Fix support_feature default value if it's 'binary' instead of 'none'
	    $tablesToFix = [Inquiry::TABLE, 'oc_agora_inquiries', InquiryType::TABLE, 'oc_agora_inq_type', 
		    InquiryOptionType::TABLE, 'oc_agora_inq_option_type', Option::TABLE, 'oc_agora_options'];

	    foreach ($tablesToFix as $tableName) {
		    if ($this->schema->hasTable($tableName)) {
			    $table = $this->schema->getTable($tableName);
			    if ($table->hasColumn('support_feature')) {
				    $column = $table->getColumn('support_feature');
				    if ($column->getDefault() === 'binary') {
					    $column->setDefault('none');
					    $this->logInfo("Fixed support_feature default from 'binary' to 'none' in '{$tableName}'");
				    }
			    }
		    }
	    }

	    // Fix JSON columns in existing tables on MySQL - remove invalid defaults
	    if ($this->isMySQL) {
		    $jsonTables = [
			    InquiryFamily::TABLE => ['ui', 'rules', 'features', 'actions'],
			    OptionFamily::TABLE => ['ui', 'rules', 'features', 'actions'],
			    InquiryGroupType::TABLE => ['ui', 'rules', 'features', 'actions'],
			    'agora_inq_families' => ['ui', 'rules', 'features', 'actions'],
			    'agora_opt_families' => ['ui', 'rules', 'features', 'actions'],
			    'agora_inq_group_type' => ['ui', 'rules', 'features', 'actions'],
		    ];

		    foreach ($jsonTables as $tableName => $columns) {
			    if ($this->schema->hasTable($tableName)) {
				    $table = $this->schema->getTable($tableName);
				    foreach ($columns as $columnName) {
					    if ($table->hasColumn($columnName)) {
						    $column = $table->getColumn($columnName);
						    // Remove default value for JSON columns on MySQL
						    $column->setDefault(null);
						    $this->logInfo("Removed default value from JSON column '{$columnName}' in '{$tableName}' for MySQL compatibility");
					    }
				    }
			    }
		    }
	    }
    }

    /**
     * Drop obsolete tables and columns defined in TableSchema
     */
    private function dropObsoleteItems(): void
    {
	    // Drop obsolete tables
	    $goneTables = [
		    'oc_agora_assembly',
		    'oc_agora_assembly_inq',
		    'oc_agora_mod_status',
		    'agora_assembly',
		    'agora_assembly_inq',
		    'agora_mod_status',
	    ];

	    foreach ($goneTables as $tableName) {
		    if ($this->schema->hasTable($tableName)) {
			    $this->schema->dropTable($tableName);
			    $this->logInfo("Dropped obsolete table '{$tableName}'");
		    }
	    }

	    // Drop obsolete columns
	    $goneColumns = [
		    'agora_inquiries' => [
			    'anonymous', 'suggestions_expire', 'support_limit', 'admin_access',
			    'hide_booked_up', 'misc_settings', 'allow_support', 'level', 'slug', 'tags'
		    ],
		    'oc_agora_inquiries' => [
			    'anonymous', 'suggestions_expire', 'support_limit', 'admin_access',
			    'hide_booked_up', 'misc_settings', 'allow_support', 'level', 'slug', 'tags'
		    ],
		    'agora_options' => [
			    'inquiry_option_hash', 'timestamp', 'duration', 'order', 'confirmed',
			    'allow_support', 'target_type', 'option_text', 'released'
		    ],
		    'oc_agora_options' => [
			    'inquiry_option_hash', 'timestamp', 'duration', 'order', 'confirmed',
			    'allow_support', 'target_type', 'option_text', 'released'
		    ],
		    'agora_inq_group' => ['groupStatus'],
		    'oc_agora_inq_group' => ['groupStatus'],
		    'agora_inq_type' => ['is_option'],
		    'oc_agora_inq_type' => ['is_option'],
	    ];

	    foreach ($goneColumns as $tableName => $columns) {
		    if ($this->schema->hasTable($tableName)) {
			    $table = $this->schema->getTable($tableName);
			    foreach ($columns as $columnName) {
				    if ($table->hasColumn($columnName)) {
					    $table->dropColumn($columnName);
					    $this->logInfo("Dropped obsolete column '{$columnName}' from '{$tableName}'");
				    }
			    }
		    }
	    }
    }

    /**
     * Create all indices defined in TableSchema
     */
    private function createAllIndices(): void
    {
	    $this->createUniqueIndices();
	    $this->createCommonIndices();
    }

    private function createUniqueIndices(): void
    {
	    $uniqueIndices = [
		    InquiryGroup::RELATION_TABLE => [
			    'uq_agora_ginq_ig' => ['inquiry_id', 'group_id']
		    ],
		    InquiryGroupType::TABLE => [
			    'agora_uniq_group_type' => ['group_type']
		    ],
		    InquiryOptionType::TABLE => [
			    'agora_uniq_option_type' => ['option_type']
		    ],
		    InquiryType::TABLE => [
			    'agora_uniq_inquiry_type' => ['inquiry_type']
		    ],
		    InquiryFamily::TABLE => [
			    'agora_uniq_family_inquiry_type' => ['family_type']
		    ],
		    OptionFamily::TABLE => [
			    'agora_uniq_family_option_type' => ['family_type']
		    ],
		    InquiryStatus::TABLE => [
			    'agora_uniq_inquiry_status' => ['inquiry_type', 'status_key']
		    ],
		    Support::TABLE => [
			    'agora_uniq_supports' => ['inquiry_id', 'option_id', 'user_id']
		    ],
		    Share::TABLE => [
			    'agora_uniq_shares' => ['inquiry_id', 'group_id', 'user_id'],
			    'agora_uniq_token' => ['token']
		    ],
		    'agora_inq_group_type' => [
			    'agora_uniq_group_type' => ['group_type']
		    ],
		    'agora_inq_families' => [
			    'agora_uniq_family_inquiry_type' => ['family_type']
		    ],
		    'agora_opt_families' => [
			    'agora_uniq_family_option_type' => ['family_type']
		    ],
	    ];

	    foreach ($uniqueIndices as $tableName => $indices) {
		    if (!$this->schema->hasTable($tableName)) {
			    continue;
		    }

		    $table = $this->schema->getTable($tableName);
		    foreach ($indices as $indexName => $columns) {
			    if (!$table->hasIndex($indexName)) {
				    $table->addUniqueIndex($columns, $indexName);
				    $this->logInfo("Added unique index '{$indexName}' to '{$tableName}'");
			    }
		    }
	    }
    }

    private function createCommonIndices(): void
    {
	    $commonIndices = [
		    Inquiry::TABLE => [
			    'inq_owner_deleted' => ['owner', 'deleted'],
			    'inq_type_family' => ['type', 'family'],
			    'inq_status_created' => ['inquiry_status', 'created'],
			    'inq_pub_stat_owner' => ['publication_status', 'owner'],
			    'inq_expire_status' => ['expire', 'inquiry_status'],
		    ],
		    'oc_agora_inquiries' => [
			    'inq_owner_deleted' => ['owner', 'deleted'],
			    'inq_type_family' => ['type', 'family'],
			    'inq_status_created' => ['inquiry_status', 'created'],
			    'inq_pub_stat_owner' => ['publication_status', 'owner'],
			    'inq_expire_status' => ['expire', 'inquiry_status'],
		    ],
		    Option::TABLE => [
			    'opt_type_status' => ['type', 'option_status'],
		    ],
		    Support::TABLE => [
			    'support_inquiry_user' => ['inquiry_id', 'user_id'],
			    'support_option_user' => ['option_id', 'user_id'],
			    'support_created' => ['created'],
		    ],
		    Comment::TABLE => [
			    'comment_inquiry_timestamp' => ['inquiry_id', 'timestamp'],
			    'comment_option_timestamp' => ['option_id', 'timestamp'],
			    'comment_user_deleted' => ['user_id', 'deleted'],
			    'comment_option_deleted' => ['option_id', 'deleted'],
		    ],
		    InquiryGroup::TABLE => [
			    'inq_group_type_parent' => ['type', 'parent_id'],
			    'inq_group_owner_deleted' => ['owner', 'deleted'],
		    ],
		    Share::TABLE => [
			    'share_inquiry_type' => ['inquiry_id', 'type', 'deleted'],
			    'share_group_type' => ['group_id', 'type', 'deleted'],
			    'share_user_deleted' => ['user_id', 'deleted'],
		    ],
		    Log::TABLE => [
			    'log_inquiry_processed' => ['inquiry_id', 'processed'],
			    'log_user_created' => ['user_id', 'created'],
		    ],
		    Attachment::TABLE => [
			    'attachment_inquiry_created' => ['inquiry_id', 'created'],
		    ],
	    ];

	    foreach ($commonIndices as $tableName => $indices) {
		    if (!$this->schema->hasTable($tableName)) {
			    continue;
		    }

		    $table = $this->schema->getTable($tableName);
		    foreach ($indices as $indexName => $columns) {
			    if (!$table->hasIndex($indexName)) {
				    $table->addIndex($columns, $indexName);
				    $this->logInfo("Added common index '{$indexName}' to '{$tableName}'");
			    }
		    }
	    }
    }

    /**
     * Create foreign key constraints defined in TableSchema::FK_INDICES
     */
    private function createForeignKeyConstraints(): void
    {
	    $fkIndices = [
		    Inquiry::TABLE => [
			    'agora_log' => ['inquiry_id', 'CASCADE'],
			    'agora_subscription' => ['inquiry_id', 'CASCADE'],
			    'agora_support' => ['inquiry_id', 'CASCADE'],
			    'agora_watch' => ['inquiry_id', 'CASCADE'],
			    InquiryGroup::RELATION_TABLE => ['inquiry_id', 'CASCADE'],
			    'agora_inquiry_misc' => ['inquiry_id', 'CASCADE'],
			    'agora_inquiry_link' => ['inquiry_id', 'CASCADE'],
			    'agora_comment' => ['inquiry_id', 'CASCADE'],
			    'agora_attachment' => ['inquiry_id', 'CASCADE'],
			    'agora_quorums' => ['inquiry_id', 'CASCADE'],
		    ],
		    InquiryGroup::TABLE => [
			    'agora_inquiry_group_misc' => ['inquiry_group_id', 'CASCADE'],
			    InquiryGroup::RELATION_TABLE => ['group_id', 'CASCADE'],
		    ],
		    Option::TABLE => [
			    'agora_option_misc' => ['option_id', 'CASCADE'],
		    ],
	    ];

	    foreach ($fkIndices as $parentTable => $children) {
		    if (!$this->schema->hasTable($parentTable)) {
			    continue;
		    }

		    foreach ($children as $childTable => [$column, $onDelete]) {
			    if (!$this->schema->hasTable($childTable)) {
				    continue;
			    }

			    $fkName = 'fk_' . str_replace('agora_', '', $parentTable) . '_' . str_replace('agora_', '', $childTable);

			    $childTableObj = $this->schema->getTable($childTable);
			    $fkExists = false;
			    foreach ($childTableObj->getForeignKeys() as $fk) {
				    if ($fk->getForeignTableName() === $parentTable) {
					    $fkExists = true;
					    break;
				    }
			    }

			    if (!$fkExists && $childTableObj->hasColumn($column)) {
				    $childTableObj->addForeignKeyConstraint(
					    $parentTable,
					    [$column],
					    ['id'],
					    ['onDelete' => $onDelete],
					    $fkName
				    );
				    $this->logInfo("Added FK constraint '{$fkName}' from '{$childTable}' to '{$parentTable}'");
			    }
		    }
	    }
    }

    /**
     * Log info message
     */
    private function logInfo(string $message): void
    {
	    if ($this->output) {
		    $this->output->info('Agora 1.7.1 - ' . $message);
	    }
    }
}
