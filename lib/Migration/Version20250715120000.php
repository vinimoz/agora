<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Types\Types;
use Doctrine\DBAL\Platforms\MySQLPlatform;
use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\Category;
use OCA\Agora\Db\Comment;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryFamily;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryGroupMisc;
use OCA\Agora\Db\InquiryGroupType;
use OCA\Agora\Db\InquiryLink;
use OCA\Agora\Db\InquiryMisc;
use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryStatus;
use OCA\Agora\Db\InquiryType;
use OCA\Agora\Db\Location;
use OCA\Agora\Db\Log;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\OptionFamily;
use OCA\Agora\Db\OptionMisc;
use OCA\Agora\Db\Preferences;
use OCA\Agora\Db\Quorum;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\Watch;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Base installation migration for Agora.
 * This is the single source of truth for the initial database schema.
 */
class Version20250715120000 extends SimpleMigrationStep
{
    private bool $isMySQL = false;
    
    /**
     * @param IOutput $output
     * @param \Closure $schemaClosure
     * @param array $options
     * @return null|ISchemaWrapper
     */
     public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        // Detect database platform
        $platform = $schema->getDatabasePlatform();
        $this->isMySQL = $platform instanceof MySQLPlatform;

        $output->info('Agora: Creating tables...');

        // Create tables in dependency order (parents before children)
        $this->createInquiryTable($schema);
        $this->createInquiryGroupTable($schema);
        $this->createOptionTable($schema);

        // Create relation/misc tables that depend on parents
        $this->createInquiryGroupRelationTable($schema);
        $this->createInquiryGroupMiscTable($schema);
        $this->createInquiryMiscTable($schema);
        $this->createOptionMiscTable($schema);

        // Create type/lookup tables
        $this->createInquiryGroupTypeTable($schema);
        $this->createInquiryOptionTypeTable($schema);
        $this->createInquiryTypeTable($schema);
        $this->createInquiryStatusTable($schema);
        $this->createInquiryFamilyTable($schema);
        $this->createOptionFamilyTable($schema);

        // Create remaining tables
        $this->createLocationTable($schema);
        $this->createCategoryTable($schema);
        $this->createAttachmentTable($schema);
        $this->createInquiryLinkTable($schema);
        $this->createQuorumTable($schema);
        $this->createSupportTable($schema);
        $this->createCommentTable($schema);
        $this->createShareTable($schema);
        $this->createSubscriptionTable($schema);
        $this->createLogTable($schema);
        $this->createWatchTable($schema);
        $this->createPreferencesTable($schema);

        $output->info('Agora: Tables created, FKs will be added in postSchemaChange');

        return $schema;
    }


    /**
     * Get BIGINT options consistent for foreign keys
     */
    private function getBigIntFkOptions(bool $nullable = false, $default = null): array
    {
        $options = [
            'notnull' => !$nullable,
            'length' => 20,
            'unsigned' => true,  // Important: must match parent table's unsigned setting
        ];

        if ($default !== null || !$nullable) {
            $options['default'] = $default ?? 0;
        }

        return $options;
    }

    /**
     * Get JSON column options based on database platform
     * MySQL doesn't allow default values for JSON columns
     */
    private function getJsonOptions(array $defaultOptions): array
    {
        if ($this->isMySQL) {
            unset($defaultOptions['default']);
        }
        return $defaultOptions;
    }


    private function createSupportTable(ISchemaWrapper $schema): void
    {
        $tableName = Support::TABLE;
        if ($schema->hasTable($tableName)) {
            return;
        }

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, [
            'autoincrement' => true,
            'notnull' => true,
            'unsigned' => true,
            'length' => 20,
        ]);
        $table->addColumn('inquiry_id', Types::BIGINT, [
            'notnull' => true,
            'default' => 0,
            'unsigned' => true,
            'length' => 20,
        ]);
        $table->addColumn('option_id', Types::BIGINT, [
            'notnull' => true,
            'default' => 0,
            'unsigned' => true,
            'length' => 20,
        ]);
        $table->addColumn('user_id', Types::STRING, [
            'notnull' => true,
            'default' => '',
            'length' => 256,
        ]);
        // value column as JSON – stores {"value": N} where N is integer (positive, negative, or zero)
        $table->addColumn('value', Types::JSON, [
            'notnull' => false,
            'default' => null,
        ]);
        $table->addColumn('weight', Types::INTEGER, [
            'notnull' => true,
            'default' => 1,
        ]);
        $table->addColumn('created', Types::BIGINT, [
            'notnull' => true,
            'default' => 0,
            'unsigned' => true,
            'length' => 20,
        ]);
        $table->addColumn('updated', Types::BIGINT, [
            'notnull' => true,
            'default' => 0,
            'unsigned' => true,
            'length' => 20,
        ]);
        $table->addColumn('support_hash', Types::STRING, [
            'notnull' => true,
            'length' => 64,
        ]);
        $table->addColumn('support_engine_id', Types::BIGINT, [
            'notnull' => false,
            'default' => null,
            'unsigned' => true,
            'length' => 20,
        ]);

        $table->setPrimaryKey(['id']);
        // Unique index includes support_engine_id (nullable allowed for uniqueness)
        $table->addUniqueIndex(
            ['inquiry_id', 'option_id', 'user_id', 'support_engine_id'],
            'agora_uniq_supports'
        );
    }


    private function createInquiryGroupTable(ISchemaWrapper $schema): void {
        $tableName = InquiryGroup::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('parent_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('deleted', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('title', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 128]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => 'default', 'length' => 128]);
        $table->addColumn('owner', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('title_ext', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 128]);
        $table->addColumn('owned_group', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $table->addColumn('expire', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true]);
        $table->addColumn('metadata', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('cover_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true]);
        $table->addColumn('protected', Types::BOOLEAN, ['notnull' => false, 'default' => false]);
        $table->addColumn('group_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('allow_edit', Types::BIGINT, ['notnull' => true, 'default' => 1, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
    }

    private function createInquiryGroupRelationTable(ISchemaWrapper $schema): void {
        $tableName = InquiryGroup::RELATION_TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('group_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_id', 'group_id'], 'uq_agora_ginq_ig');
    }

    private function createInquiryGroupMiscTable(ISchemaWrapper $schema): void {
        $tableName = InquiryGroupMisc::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_group_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('key', Types::STRING, ['notnull' => true, 'length' => 64]);
        $table->addColumn('value', Types::TEXT, ['notnull' => false]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_group_id', 'key'], 'agora_uniq_group_misc');
    }

    private function createInquiryGroupTypeTable(ISchemaWrapper $schema): void {
        $tableName = InquiryGroupType::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
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
        $table->addUniqueIndex(['group_type'], 'agora_uniq_group_type');
    }

    private function createInquiryOptionTypeTable(ISchemaWrapper $schema): void {
        $tableName = InquiryOptionType::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
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
        $table->addUniqueIndex(['option_type'], 'agora_uniq_option_type');
    }

    private function createInquiryTable(ISchemaWrapper $schema): void {
        $tableName = Inquiry::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('cover_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => 'petition', 'length' => 64]);
        $table->addColumn('title', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 128]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('location_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('category_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('owner', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 256]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('archived', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('expire', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('deleted', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('owned_group', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 255]);
        $table->addColumn('access', Types::STRING, ['notnull' => true, 'default' => 'private', 'length' => 50]);
        $table->addColumn('show_results', Types::STRING, ['notnull' => true, 'default' => 'always', 'length' => 64]);
        $table->addColumn('last_interaction', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('parent_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('moderation_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('inquiry_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
        $table->addColumn('support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
        $table->addColumn('family', Types::STRING, ['notnull' => false, 'default' => 'deliberative', 'length' => 64]);
        $table->setPrimaryKey(['id']);
    }

    private function createInquiryMiscTable(ISchemaWrapper $schema): void {
        $tableName = InquiryMisc::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('key', Types::STRING, ['notnull' => true, 'length' => 64]);
        $table->addColumn('value', Types::TEXT, ['notnull' => false]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_id', 'key'], 'agora_uniq_inquiry_misc');
    }

    private function createLocationTable(ISchemaWrapper $schema): void {
        $tableName = Location::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('name', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 255]);
        $table->addColumn('parent_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
    }

    private function createCategoryTable(ISchemaWrapper $schema): void {
        $tableName = Category::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('name', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 255]);
        $table->addColumn('parent_id', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
    }

    private function createAttachmentTable(ISchemaWrapper $schema): void {
        $tableName = Attachment::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => false, 'unsigned' => true]);
        $table->addColumn('group_id', Types::BIGINT, ['notnull' => false, 'unsigned' => true]);
        $table->addColumn('file_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 255]);
        $table->addColumn('size', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true]);
        $table->addColumn('name', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 255]);
        $table->addColumn('mime_type', Types::STRING, ['notnull' => true, 'default' => 'application/octet-stream', 'length' => 100]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
    }

    private function createOptionFamilyTable(ISchemaWrapper $schema): void {
        $tableName = OptionFamily::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
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
        $table->addUniqueIndex(['family_type'], 'agora_uniq_family_option_type');
    }

    private function createInquiryFamilyTable(ISchemaWrapper $schema): void {
        $tableName = InquiryFamily::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
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
        $table->addUniqueIndex(['family_type'], 'agora_uniq_family_inquiry_type');
    }

    private function createInquiryStatusTable(ISchemaWrapper $schema): void {
        $tableName = InquiryStatus::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
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
        $table->addUniqueIndex(['inquiry_type', 'status_key'], 'agora_uniq_inquiry_status');
    }

    private function createInquiryTypeTable(ISchemaWrapper $schema): void {
        $tableName = InquiryType::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
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
        $table->addUniqueIndex(['inquiry_type'], 'agora_uniq_inquiry_type');
    }

    private function createInquiryLinkTable(ISchemaWrapper $schema): void {
        $tableName = InquiryLink::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('target_app', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('target_type', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('target_id', Types::STRING, ['notnull' => true, 'length' => 100]);
        $table->addColumn('metadata', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('created_by', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->setPrimaryKey(['id']);
    }

    private function createOptionTable(ISchemaWrapper $schema): void {
        $tableName = Option::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('title', Types::STRING, ['notnull' => true, 'default' => 'Untitled', 'length' => 128]);
        $table->addColumn('target_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('parent_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => 'debate', 'length' => 64]);
        $table->addColumn('access', Types::STRING, ['notnull' => true, 'default' => 'private', 'length' => 32]);
        $table->addColumn('text', Types::STRING, ['notnull' => true, 'default' => 'enter ur text', 'length' => 1024]);
        $table->addColumn('owner', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->addColumn('owned_group', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 255]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('show_results', Types::STRING, ['notnull' => true, 'default' => 'always', 'length' => 32]);
        $table->addColumn('deleted', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('archived', Types::BIGINT, ['notnull' => false, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('option_status', Types::STRING, ['notnull' => true, 'default' => 'draft', 'length' => 32]);
        $table->addColumn('allow_comment', Types::SMALLINT, ['notnull' => false, 'default' => null]);
        $table->addColumn('support_feature', Types::STRING, ['notnull' => true, 'default' => 'none', 'length' => 20]);
        $table->addColumn('family', Types::STRING, ['notnull' => false, 'default' => 'debate', 'length' => 64]);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
    }

    private function createOptionMiscTable(ISchemaWrapper $schema): void {
        $tableName = OptionMisc::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('key', Types::STRING, ['notnull' => true, 'length' => 64]);
        $table->addColumn('value', Types::TEXT, ['notnull' => false]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['option_id', 'key'], 'agora_uniq_option_misc');
    }

    private function createQuorumTable(ISchemaWrapper $schema): void {
        $tableName = Quorum::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('phase', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'length' => 20]);
        $table->addColumn('value', Types::FLOAT, ['notnull' => true, 'default' => 0]);
        $table->addColumn('base', Types::STRING, ['notnull' => true, 'length' => 50]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false]);
        $table->addColumn('sort_order', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
    }


    private function createCommentTable(ISchemaWrapper $schema): void {
        $tableName = Comment::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('option_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('user_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->addColumn('comment', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 1024]);
        $table->addColumn('timestamp', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('deleted', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('confidential', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('recipient', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $table->setPrimaryKey(['id']);
    }

    private function createShareTable(ISchemaWrapper $schema): void {
        $tableName = Share::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('group_id', Types::BIGINT, ['notnull' => false, 'default' => null, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('token', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('type', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('label', Types::STRING, ['notnull' => false, 'default' => '', 'length' => 256]);
        $table->addColumn('user_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->addColumn('display_name', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $table->addColumn('email_address', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $table->addColumn('invitation_sent', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('reminder_sent', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('locked', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('misc_settings', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->addColumn('deleted', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_id', 'group_id', 'user_id'], 'agora_uniq_shares');
        $table->addUniqueIndex(['token'], 'agora_uniq_token');
    }

    private function createSubscriptionTable(ISchemaWrapper $schema): void {
        $tableName = Subscription::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('user_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_id', 'user_id'], 'agora_uniq_subscription');
    }

    private function createLogTable(ISchemaWrapper $schema): void {
        $tableName = Log::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('user_id', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $table->addColumn('display_name', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 256]);
        $table->addColumn('message_id', Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]);
        $table->addColumn('created', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('processed', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['processed', 'inquiry_id', 'user_id', 'message_id'], 'agora_uniq_log_unprocessed');
    }

    private function createWatchTable(ISchemaWrapper $schema): void {
        $tableName = Watch::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('inquiry_id', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('table', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
        $table->addColumn('updated', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('session_id', Types::STRING, ['notnull' => false, 'default' => null]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['inquiry_id', 'table', 'session_id'], 'agora_uniq_watch');
    }

    private function createPreferencesTable(ISchemaWrapper $schema): void {
        $tableName = Preferences::TABLE;
        if ($schema->hasTable($tableName)) return;

        $table = $schema->createTable($tableName);
        $table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('user_id', Types::STRING, ['notnull' => true, 'default' => '', 'length' => 256]);
        $table->addColumn('timestamp', Types::BIGINT, ['notnull' => true, 'default' => 0, 'unsigned' => true, 'length' => 20]);
        $table->addColumn('preferences', Types::TEXT, ['notnull' => false, 'default' => null]);
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['user_id'], 'agora_uniq_preferences');
    }


    /**
     * Find the actual table name in the schema (with or without 'oc_' prefix)
     */
    private function findActualTableName(ISchemaWrapper $schema, string $tableConstant): ?string
    {
        if ($schema->hasTable($tableConstant)) {
            return $tableConstant;
        }
        $prefixedName = 'oc_' . $tableConstant;
        if ($schema->hasTable($prefixedName)) {
            return $prefixedName;
        }
        return null;
    }


}
