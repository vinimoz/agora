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
use OCA\Agora\Db\Quorum;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\Preferences;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\InquiryStatus;
use OCA\Agora\Db\InquiryType;
use OCA\Agora\Db\InquiryGroupType;
use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryMisc;
use OCA\Agora\Db\InquiryGroupMisc;
use OCA\Agora\Db\OptionMisc;
use OCA\Agora\Db\InquiryFamily;
use OCA\Agora\Db\InquiryLink;
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
            Log::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            Subscription::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            Support::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            Watch::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            InquiryMisc::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            InquiryLink::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            Comment::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            Attachment::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
            Quorum::TABLE => ['constraintColumn' => 'inquiry_id','onDelete' => 'CASCADE'],
        ],

        InquiryGroup::TABLE => [
            InquiryGroupMisc::TABLE => ['constraintColumn' => 'inquiry_group_id','onDelete' => 'CASCADE'],
            InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'group_id','onDelete' => 'CASCADE'],
        ],

        Option::TABLE => [
            OptionMisc::TABLE => ['constraintColumn' => 'option_id','onDelete' => 'CASCADE'],
        ],
    ];

    /**
     * define useful common indices, which are not unique
     * table => ['name' => 'indexName', 'unique' => false, 'columns' => ['column1', 'column2']]
     */
    public const COMMON_INDICES = [
        // INQUIRY - Optimized for common queries
        'inq_owner_deleted' => [
            'table' => Inquiry::TABLE,
            'name' => 'inq_owner_deleted',
            'unique' => false,
            'columns' => ['owner', 'deleted']
        ],
        'inq_type_family' => [
            'table' => Inquiry::TABLE,
            'name' => 'inq_type_family',
            'unique' => false,
            'columns' => ['type', 'family'] // Changed from 'inquiry_type' to 'type'
        ],
        'inq_status_created' => [
            'table' => Inquiry::TABLE,
            'name' => 'inq_status_created',
            'unique' => false,
            'columns' => ['inquiry_status', 'created']
        ],
        'inq_access_owner' => [
            'table' => Inquiry::TABLE,
            'name' => 'inq_access_owner',
            'unique' => false,
            'columns' => ['access', 'owner']
        ],
        'inq_expire_status' => [
            'table' => Inquiry::TABLE,
            'name' => 'inq_expire_status',
            'unique' => false,
            'columns' => ['expire', 'inquiry_status']
        ],

        'opt_type_status' => [
            'table' => Option::TABLE,
            'name' => 'opt_type_status',
            'unique' => false,
            'columns' => ['type', 'option_status']
        ],

        // SUPPORT - Critical for performance
        'support_inquiry_user' => [
            'table' => Support::TABLE,
            'name' => 'support_inquiry_user',
            'unique' => false,
            'columns' => ['inquiry_id', 'user_id']
        ],
        'support_option_user' => [
            'table' => Support::TABLE,
            'name' => 'support_option_user',
            'unique' => false,
            'columns' => ['option_id', 'user_id']
        ],
        'support_created' => [
            'table' => Support::TABLE,
            'name' => 'support_created',
            'unique' => false,
            'columns' => ['created']
        ],

        // COMMENT - Performance optimization
        'comment_inquiry_timestamp' => [
            'table' => Comment::TABLE,
            'name' => 'comment_inquiry_timestamp',
            'unique' => false,
            'columns' => ['inquiry_id', 'timestamp']
        ],
        'comment_option_timestamp' => [
            'table' => Comment::TABLE,
            'name' => 'comment_option_timestamp',
            'unique' => false,
            'columns' => ['option_id', 'timestamp']
        ],
        'comment_user_deleted' => [
            'table' => Comment::TABLE,
            'name' => 'comment_user_deleted',
            'unique' => false,
            'columns' => ['user_id', 'deleted']
        ],

        // INQUIRY GROUP
        'inq_group_type_parent' => [
            'table' => InquiryGroup::TABLE,
            'name' => 'inq_group_type_parent',
            'unique' => false,
            'columns' => ['type', 'parent_id'] // Changed from 'group_type' to 'type'
        ],
        'inq_group_owner_deleted' => [
            'table' => InquiryGroup::TABLE,
            'name' => 'inq_group_owner_deleted',
            'unique' => false,
            'columns' => ['owner', 'deleted']
        ],

        // SHARE - Important for permission checks
        'share_inquiry_type' => [
            'table' => Share::TABLE,
            'name' => 'share_inquiry_type',
            'unique' => false,
            'columns' => ['inquiry_id', 'type', 'deleted']
        ],
        'share_group_type' => [
            'table' => Share::TABLE,
            'name' => 'share_group_type',
            'unique' => false,
            'columns' => ['group_id', 'type', 'deleted']
        ],
        'share_user_deleted' => [
            'table' => Share::TABLE,
            'name' => 'share_user_deleted',
            'unique' => false,
            'columns' => ['user_id', 'deleted']
        ],

        // LOG - Performance for log queries
        'log_inquiry_processed' => [
            'table' => Log::TABLE,
            'name' => 'log_inquiry_processed',
            'unique' => false,
            'columns' => ['inquiry_id', 'processed']
        ],
        'log_user_created' => [
            'table' => Log::TABLE,
            'name' => 'log_user_created',
            'unique' => false,
            'columns' => ['user_id', 'created']
        ],

        // ATTACHMENT
        'attachment_inquiry_created' => [
            'table' => Attachment::TABLE,
            'name' => 'attachment_inquiry_created',
            'unique' => false,
            'columns' => ['inquiry_id', 'created']
        ],
    ];

    /**
     * define useful optional indices, which are not unique
     * tableName => [
     *  indexName => ['columns' => [column1, column2, ...]],
     * ...]
     */
    public const OPTIONAL_INDICES = [
        Inquiry::TABLE => [
            'inquiries_inquiries_owners_non_deleted' => ['columns' => ['owner', 'deleted']],
            'inquiries_inquiries_deleted' => ['columns' => ['deleted']],
            'inquiries_inquiries_owners' => ['columns' => ['owner']],
            'inquiries_family_type' => ['columns' => ['family', 'type']], // Changed from 'inquiry_type' to 'type'
            'inquiries_status_expire' => ['columns' => ['inquiry_status', 'expire']],
        ],
        Option::TABLE => [
            'inquiries_options_non_deleted' => ['columns' => ['parent_id', 'deleted']],
            'inquiries_options_owner' => ['columns' => ['parent_id', 'owner']],
            'inquiries_options_type_status' => ['columns' => ['type', 'option_status']],
            'inquiries_options_sort_order' => ['columns' => ['parent_id', 'sort_order']],
        ],
        Share::TABLE => [
            'inquiries_shares_user' => ['columns' => ['inquiry_id', 'user_id', 'deleted']],
            'inquiries_shares_types' => ['columns' => ['inquiry_id', 'type', 'deleted']],
            'inquiries_group_shares_user' => ['columns' => ['group_id', 'user_id', 'deleted']],
            'inquiries_shares_token' => ['columns' => ['token', 'deleted']],
        ],
        Support::TABLE => [
            'inquiries_supports_hash' => ['columns' => ['inquiry_id', 'support_hash']],
            'inquiries_supports_user_created' => ['columns' => ['user_id', 'created']],
        ],
        InquiryGroup::TABLE => [
            'inquirygroup_deleted' => ['columns' => ['deleted']],
            'inquirygroup_owner' => ['columns' => ['owner']],
            'inquirygroup_type_status' => ['columns' => ['type', 'group_status']], // Changed from 'group_type' to 'type'
        ],
        InquiryGroupMisc::TABLE => [
            'groupmisc_key' => ['columns' => ['key']],
            'groupmisc_group_key' => ['columns' => ['inquiry_group_id', 'key']],
        ],
        Comment::TABLE => [
            'comment_inquiry_deleted' => ['columns' => ['inquiry_id', 'deleted']],
            'comment_option_deleted' => ['columns' => ['option_id', 'deleted']],
        ]
    ];

    /**
     * define unique indices, which are not primary keys
     * table => ['name' => 'indexName', 'unique' => true, 'columns' => ['column1', 'column2']]
     */
    public const UNIQUE_INDICES = [
        InquiryGroupMisc::TABLE => [
            'UNIQ_group_misc' => ['columns' => ['inquiry_group_id', 'key']],
        ],
        InquiryType::TABLE => [
            'UNIQ_inquiry_type' => ['columns' => ['inquiry_type']], // Changed from 'name' to 'inquiry_type'
        ],
        InquiryOptionType::TABLE => [
            'UNIQ_option_type' => ['columns' => ['option_type']], // Changed from 'name' to 'option_type'
        ],
        InquiryGroupType::TABLE => [
            'UNIQ_group_type' => ['columns' => ['group_type']], // Changed from 'name' to 'group_type'
        ],
        Log::TABLE => [
            'UNIQ_unprocessed' => ['columns' => ['processed', 'inquiry_id', 'user_id', 'message_id']],
        ],
        Subscription::TABLE => [
            'UNIQ_subscription' => ['columns' => ['inquiry_id', 'user_id']],
        ],
        Share::TABLE => [
            'UNIQ_shares' => ['columns' => ['inquiry_id', 'group_id', 'user_id']],
            'UNIQ_token' => ['columns' => ['token']],
        ],
        Support::TABLE => [
            'UNIQ_supports' => ['columns' => ['support_hash']],
        ],
        Preferences::TABLE => [
            'UNIQ_preferences' => ['columns' => ['user_id']],
        ],
        Watch::TABLE => [
            'UNIQ_watch' => ['columns' => ['inquiry_id', 'table', 'session_id']],
        ],
        InquiryGroup::RELATION_TABLE => [
            'UNIQ_inquiry_group_relation' => ['columns' => ['inquiry_id', 'group_id']],
        ],
        InquiryMisc::TABLE => [
            'UNIQ_inquiry_misc' => ['columns' => ['inquiry_id', 'key']],
        ],
        OptionMisc::TABLE => [
            'UNIQ_option_misc' => ['columns' => ['option_id', 'key']],
        ],
        InquiryFamily::TABLE => [
            'UNIQ_family_type' => ['columns' => ['family_type']],
        ],
        InquiryStatus::TABLE => [
            'UNIQ_inquiry_status' => ['columns' => ['inquiry_type', 'status_key']],
        ],
    ];

    /**
     * obsolete migration entries, which can be deleted
     */
    public const GONE_MIGRATIONS = [
        '20250715120000',
        '01050020251027120000',
    ];

    /**
     * define obsolete tables to drop
     */
    public const GONE_TABLES = [
        'oc_agora_assembly',           
        'oc_agora_assembly_inq',   
        'oc_agora_mod_status', 
    ];

    /**
     * define obsolete columns to drop
     */
    public const GONE_COLUMNS = [
        'oc_agora_inquiries' => [
            'anonymous',
            'suggestions_expire', 
            'support_limit',
            'admin_access',
            'hide_booked_up',
            'misc_settings',
            'level',
            'slug',
            'tags'
        ],
        'oc_agora_options' => [
            'inquiry_option_hash',
            'timestamp',
            'duration',
            'order',
            'confirmed',
            'released'
        ],
        'oc_agora_groups' => [
            'groupStatus',
        ],
        'oc_agora_inq_type' => [
            'is_option',
        ],
    ];

    /**
     * define table structure
     *
     * IMPORTANT: After adding or deletion check queries in ShareMapper
     */
    public const TABLES = [
        InquiryGroup::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'parent_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null, 'length' => 20]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'title' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 128]],
            'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'default', 'length' => 128]], // This is the actual column name
            'owner' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
            'title_ext' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 128]],
            'owned_group' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 256]],
            'expire' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null]],
            'metadata' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null]],
            'cover_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null]],
            'protected' => ['type' => Types::BOOLEAN, 'options' => ['notnull' => false, 'default' => false]],
            'group_status' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'draft', 'length' => 32]],
            'allow_edit' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
        ],

        InquiryGroup::RELATION_TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'group_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        InquiryGroupMisc::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_group_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'length' => 20]],
            'key' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 64]],
            'value' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
        ],

        InquiryGroupType::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true]],
            'family' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'collective', 'length' => 64]],
            'group_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]], // This is the actual column name
            'icon' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '']],
            'label' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'fields' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'allowed_inquiry_types' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'allowed_response' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'is_root' => ['type' => Types::BOOLEAN, 'options' => ['notnull' => false]],
            'sort_order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0]],
        ],

        InquiryOptionType::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true]],
            'family' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'collective', 'length' => 64]],
            'option_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]], // This is the actual column name
            'icon' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '']],
            'label' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'fields' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'allowed_response' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0]],
        ],

        Inquiry::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'cover_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null,'length' => 20]],
            'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'petition', 'length' => 64]], // This is the actual column name
            'title' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 128]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null, 'length' => 65535]],
            'location_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
            'category_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
            'owner' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '', 'length' => 256]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'archived' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'expire' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'owned_group' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => '', 'length' => 255]],
            'access' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'private', 'length' => 50]],
            'show_results' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'always', 'length' => 64]],
            'last_interaction' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'parent_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => null, 'length' => 20]],
            'moderation_status' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'draft', 'length' => 32]],
            'inquiry_status' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'draft', 'length' => 32]],
            'allow_comment' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
            'allow_support' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
            'support_feature' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'binary', 'length' => 20]],
            'family' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => 'deliberative', 'length' => 64]], // Added missing family column
        ],

        InquiryMisc::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'length' => 20]],
            'key' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 64]],
            'value' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'length' => 256]],
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
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false]],
            'group_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => false]],
            'file_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
            'size' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => '0', 'length' => 255]],
            'name' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 255]],
            'mime_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'application/octet-stream', 'length' => 100]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        InquiryFamily::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'family_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
            'label' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => true, 'default' => '']],
            'icon' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '']],
            'sort_order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        InquiryStatus::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
            'status_key' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
            'label' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => true, 'default' => '']],
            'is_final' => ['type' => Types::BOOLEAN, 'options' => ['notnull' => false, 'default' =>false]],
            'icon' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '']],
            'sort_order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'updated' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        InquiryType::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]], // This is the actual column name
            'family' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'deliberative', 'length' => 64]],
            'icon' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '']],
            'label' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'fields' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'allowed_response' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'allowed_transformation' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'allowed_option_type' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'support_feature' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'binary', 'length' => 20]],
            'is_root' => ['type' => Types::BOOLEAN, 'options' => ['notnull' => false, 'default' => true]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        InquiryLink::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'length' => 20]],
            'target_app' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
            'target_type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
            'target_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 100]],
            'metadata' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'default' => null]],
            'sort_order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'created_by' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 64]],
        ],

        Option::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'target_type' => ['type' => Types::STRING, 'options' => ['notnull' => false, 'default' => null, 'length' => 50]],
            'parent_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'debate', 'length' => 64]], 
            'access' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'private', 'length' => 32]],
            'option_text' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'enter ur text', 'length' => 1024]],
            'owner' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'updated' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'show_results' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'always', 'length' => 32]],
            'deleted' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
            'archived' => ['type' => Types::BIGINT, 'options' => ['notnull' => false, 'default' => 0, 'length' => 20]],
            'option_status' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'draft', 'length' => 32]],
            'allow_comment' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
            'allow_support' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 1, 'length' => 20]],
            'sort_order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        OptionMisc::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'option_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'length' => 20]],
            'key' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 64]],
            'value' => ['type' => Types::TEXT, 'options' => ['notnull' => false, 'length' => 65535]],
        ],

        Quorum::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'length' => 20]],
            'option_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'length' => 20]],
            'phase' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]],
            'type' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 20]], 
            'value' => ['type' => Types::FLOAT, 'options' => ['notnull' => true, 'default' => 0]],
            'base' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 50]], 
            'description' => ['type' => Types::TEXT, 'options' => ['notnull' => false]],
            'sort_order' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'updated' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
        ],

        Support::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'option_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'user_id' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => '', 'length' => 256]],
            'value' => ['type' => Types::SMALLINT, 'options' => ['notnull' => true, 'default' => '0']],
            'created' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'support_hash' => ['type' => Types::STRING, 'options' => ['notnull' => true, 'length' => 64]],
        ],

        Comment::TABLE => [
            'id' => ['type' => Types::BIGINT, 'options' => ['autoincrement' => true, 'notnull' => true, 'length' => 20]],
            'inquiry_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
            'option_id' => ['type' => Types::BIGINT, 'options' => ['notnull' => true, 'default' => 0, 'length' => 20]],
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
                    $messages[] = 'Adding column ' . $columnName . ' to table ' . $tableName;
                    $table->addColumn($columnName, $columnDefinition['type'], $columnDefinition['options']);
                }
            }

            // Always set primary key to ensure it exists
            if (!$table->hasPrimaryKey()) {
                $table->setPrimaryKey(['id']);
            }
        }
        return $messages;
    }
}
