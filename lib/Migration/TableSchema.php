<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use Doctrine\DBAL\Types\Type;
use OCA\Agora\Db\Comment;
use OCA\Agora\Db\Log;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\Preferences;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\Assembly;
use OCA\Agora\Db\ModerationStatus;
use OCA\Agora\Db\Location;
use OCA\Agora\Db\Category;
use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\Watch;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;

/**
 * Database definition for installing and migrations
 * These definitions contain the base database layout
 * used for initial migration to version 3.x from all prior versions
 */

abstract class TableSchema
{
    public const FK_PARENT_TABLE = Inquiry::TABLE;
    public const FK_CHILD_TABLES = [];
    public const FK_OTHER_TABLES = [];

    /**
     * define all foreign key indices
     * Parentable => [Childable => ['constraintColumn' => 'columnName']]
     */
    public const FK_INDICES = [
    Inquiry::TABLE => [
    Comment::TABLE => ['constraintColumn' => 'inquiry_id'],
    Log::TABLE => ['constraintColumn' => 'inquiry_id'],
    Subscription::TABLE => ['constraintColumn' => 'inquiry_id'],
    Option::TABLE => ['constraintColumn' => 'inquiry_id'],
    Support::TABLE => ['constraintColumn' => 'inquiry_id'],
    Watch::TABLE => ['constraintColumn' => 'inquiry_id'],
    InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'inquiry_id'],
    Assembly::RELATION_TABLE => ['constraintColumn' => 'inquiry_id'],
    Attachment::TABLE => ['constraintColumn' => 'inquiry_id'],
    ],
    InquiryGroup::TABLE => [
    InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'group_id'],
    ],
    Assembly::TABLE => [
    Assembly::RELATION_TABLE => ['constraintColumn' => 'assembly_id'],
    ],
    ];

    /**
     * define useful common indices, which are not unique
     * table => ['name' => 'indexName', 'unique' => false, 'columns' => ['column1', 'column2']]
     */
    public const COMMON_INDICES = [
    'inqs_inqs_owners_non_deleted' => ['table' => Inquiry::TABLE, 'name' => 'inqs_inqs_owners_non_deleted', 'unique' => false, 'columns' => ['owner', 'deleted']],
    'attachments_inquiry' => ['table' => Attachment::TABLE, 'name' => 'IDX_attachments_inquiry', 'unique' => false, 'columns' => ['inquiry_id']],
    ];

    /**
     * define unique indices, which are not primary keys
     * table => ['name' => 'indexName', 'unique' => true, 'columns' => ['column1', 'column2']]
     */
    public const UNIQUE_INDICES = [
    Option::TABLE => ['name' => 'UNIQ_options', 'unique' => true, 'columns' => ['inquiry_id', 'inquiry_option_hash', 'timestamp']],
    Log::TABLE => ['name' => 'UNIQ_unprocessed', 'unique' => true, 'columns' => ['processed', 'inquiry_id', 'user_id', 'message_id']],
    Subscription::TABLE => ['name' => 'UNIQ_subscription', 'unique' => true, 'columns' => ['inquiry_id', 'user_id']],
    Share::TABLE => ['name' => 'UNIQ_shares', 'unique' => true, 'columns' => ['inquiry_id', 'group_id', 'user_id']],
    Support::TABLE => ['name' => 'UNIQ_supports', 'unique' => true, 'columns' => ['inquiry_id', 'user_id']],
    Preferences::TABLE => ['name' => 'UNIQ_preferences', 'unique' => true, 'columns' => ['user_id']],
    Watch::TABLE => ['name' => 'UNIQ_watch', 'unique' => true, 'columns' => ['inquiry_id', 'table', 'session_id']],
    InquiryGroup::RELATION_TABLE => ['name' => 'UNIQ_inquiry_group_relation', 'unique' => true, 'columns' => ['inquiry_id', 'group_id']],
    Assembly::RELATION_TABLE => ['name' => 'UNIQ_consultation_inquiry', 'unique' => true, 'columns' => ['inquiry_id','assembly_id']],
    ];

    /**
     * obsolete migration entries, which can be deleted
     */
    public const GONE_MIGRATIONS = [
    ];

    /**
     * define obsolete tables to drop
     */
    public const GONE_TABLES = [
    ];

    /**
     * define obsolete columns to drop
     */
    public const GONE_COLUMNS = [
    ];

    /**
     * define table structure
     *
     * IMPORTANT: After adding or deletion check queries in ShareMapper
     */
    public const TABLES = [
    InquiryGroup::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'title' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 128]],
    'owner' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
    'title_ext' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 128]],
    ],
    InquiryGroup::RELATION_TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'group_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Inquiry::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'dateInquiry', 'length' => 64]],
    'title' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 128]],
    'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
    'location_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
    'category_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
    'owner' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '', 'length' => 256]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'archived' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'expire' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'access' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'private', 'length' => 1024]],
    'anonymous' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'suggestions_expire' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'support_limit' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'show_results' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'always', 'length' => 64]],
    'admin_access' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'hide_booked_up' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
    'allow_comment' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
    'last_interaction' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'misc_settings' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
    'level' => ['type' => Types::INTEGER, 'options' => ['notnull' => true, 'default' => 0]],
    'slug' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => 'proposal', 'length' => 255]],
    'tags' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => '']],
    'parent_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0]],
    'parent__law_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0]],
    'moderation_status' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'draft', 'length' => 50]],
    ],
    Assembly::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'title' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
    'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
    'group_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
    'facilitator_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
    'description' => ['type' => Types::TEXT, 'options' => ['notnull' => true, 'default' => '']],
    'status' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 50]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'start_date' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'end_date' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'updated' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Assembly::RELATION_TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'assembly_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Location::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'name' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
    'parent_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
    ],
    Category::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'name' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
    'parent_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
    ],
    Attachment::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'file_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
    'size' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => '0', 'length' => 255]],
    'name' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
    'mime_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'application/octet-stream', 'length' => 100]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    ModerationStatus::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
    'status_key' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
    'label' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
    'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
    'is_final' => ['type' => Types::BOOLEAN, 'options' => ['notnull' => false, 'default' =>0]],
    'icon' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '']],
    'order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'updated' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Option::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'inquiry_option_text' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 1024]],
    'inquiry_option_hash' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '', 'length' => 256]],
    'timestamp' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'duration' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'confirmed' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'owner' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    'released' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Support::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Comment::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    'comment' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 1024]],
    'timestamp' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'confidential' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'recipient' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 256]],
    ],
    Share::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null, 'length' => 20]],
    'group_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null, 'length' => 20]],
    'token' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 64]],
    'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 64]],
    'label' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '', 'length' => 256]],
    'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    'display_name' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 256]],
    'email_address' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 256]],
    'invitation_sent' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'reminder_sent' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'locked' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'misc_settings' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
    'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Subscription::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    ],
    Log::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 256]],
    'display_name' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 256]],
    'message_id' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 64]],
    'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'processed' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    ],
    Watch::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'table' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 64]],
    'updated' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'session_id' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null]],
    ],
    Preferences::TABLE => [
    'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
    'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
    'timestamp' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
    'preferences' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
    ],
    ];

    /**
     * Iterate over tables and make sure, they are created or updated
     * according to the currently valid schema
     *
     * @psalm-api
     */
    public static function createOrUpdateSchema(ISchemaWrapper &$schema): array
    {
        $messages = [];
        foreach (self::TABLES as $tableName => $columns) {
            $tableCreated = false;

            if ($schema->hasTable($tableName)) {
                $messages[] = 'Validating table ' . $tableName;
                $table = $schema->getTable($tableName);
            } else {
                $messages[] = 'Creating table ' . $tableName;
                $table = $schema->createTable($tableName);
                $tableCreated = true;
            }

            foreach ($columns as $columnName => $columnDefinition) {
                if ($table->hasColumn($columnName)) {
                    $column = $table->getColumn($columnName);
                    $column->setOptions($columnDefinition['options']);
                    if (Type::lookupName($column->getType()) !== $columnDefinition['type']) {
                        $messages[] = 'Migrating type of ' . $tableName . ', ' . $columnName . ' to ' . $columnDefinition['type'];
                        $column->setType(Type::getType($columnDefinition['type']));
                    }

                    // force change to current options definition
                    $table->modifyColumn($columnName, $columnDefinition['options']);
                } else {
                    $table->addColumn($columnName, $columnDefinition['type'], $columnDefinition['options']);
                }
            }

            if ($tableCreated) {
                $table->setPrimaryKey(['id']);
            }
        }
        return $messages;
    }
}
