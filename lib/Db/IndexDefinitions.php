<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

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
use OCA\Agora\Db\OptionFamily;
use OCA\Agora\Db\InquiryLink;
use OCA\Agora\Db\Location;
use OCA\Agora\Db\Category;
use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\Watch;

/**
 * Database index definitions for Agora
 * These definitions contain all index structures used by the application
 */
abstract class IndexDefinitions
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
            Log::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            Subscription::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            Support::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            Watch::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            InquiryMisc::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            InquiryLink::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            Comment::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            Attachment::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
            Quorum::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
        ],

        InquiryGroup::TABLE => [
            InquiryGroupMisc::TABLE => ['constraintColumn' => 'inquiry_group_id', 'onDelete' => 'CASCADE'],
            InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'group_id', 'onDelete' => 'CASCADE'],
        ],

        Option::TABLE => [
            OptionMisc::TABLE => ['constraintColumn' => 'option_id', 'onDelete' => 'CASCADE'],
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
            'columns' => ['type', 'family']
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

        'support_option_value' => [
            'table' => Support::TABLE,
            'name' => 'agora_support_option_value',
            'unique' => false,
            'columns' => ['option_id', 'value']
        ],
        'comment_option_deleted' => [
            'table' => Comment::TABLE,
            'name' => 'agora_comment_option_deleted',
            'unique' => false,
            'columns' => ['option_id', 'deleted']
        ],
        'support_option_user' => [
            'table' => Support::TABLE,
            'name' => 'agora_support_option_user',
            'unique' => false,
            'columns' => ['option_id', 'user_id']
        ],

        // INQUIRY GROUP
        'inq_group_type_parent' => [
            'table' => InquiryGroup::TABLE,
            'name' => 'inq_group_type_parent',
            'unique' => false,
            'columns' => ['type', 'parent_id']
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
            'inquiries_family_type' => ['columns' => ['family', 'type']],
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
            'inquirygroup_type_status' => ['columns' => ['type', 'group_status']],
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
            'agora_uniq_group_misc' => ['columns' => ['inquiry_group_id', 'key']],
        ],
        InquiryType::TABLE => [
            'agora_uniq_inquiry_type' => ['columns' => ['inquiry_type']],
        ],
        InquiryOptionType::TABLE => [
            'agora_uniq_option_type' => ['columns' => ['option_type']],
        ],
        InquiryGroupType::TABLE => [
            'agora_uniq_group_type' => ['columns' => ['group_type']],
        ],
        Log::TABLE => [
            'agora_uniq_log_unprocessed' => ['columns' => ['processed', 'inquiry_id', 'user_id', 'message_id']],
        ],
        Subscription::TABLE => [
            'agora_uniq_subscription' => ['columns' => ['inquiry_id', 'user_id']],
        ],
        Share::TABLE => [
            'agora_uniq_shares' => ['columns' => ['inquiry_id', 'group_id', 'user_id']],
            'agora_uniq_token' => ['columns' => ['token']],
        ],
        Support::TABLE => [
            'agora_uniq_supports' => ['columns' => ['inquiry_id', 'option_id', 'user_id']],
        ],
        Preferences::TABLE => [
            'agora_uniq_preferences' => ['columns' => ['user_id']],
        ],
        Watch::TABLE => [
            'agora_uniq_watch' => ['columns' => ['inquiry_id', 'table', 'session_id']],
        ],
        InquiryGroup::RELATION_TABLE => [
            'agora_uniq_inquiry_group_relation' => ['columns' => ['inquiry_id', 'group_id']],
        ],
        InquiryMisc::TABLE => [
            'agora_uniq_inquiry_misc' => ['columns' => ['inquiry_id', 'key']],
        ],
        OptionMisc::TABLE => [
            'agora_uniq_option_misc' => ['columns' => ['option_id', 'key']],
        ],
        InquiryFamily::TABLE => [
            'agora_uniq_family_inquiry_type' => ['columns' => ['family_type']],
        ],
        OptionFamily::TABLE => [
            'agora_uniq_family_option_type' => ['columns' => ['family_type']],
        ],
        InquiryStatus::TABLE => [
            'agora_uniq_inquiry_status' => ['columns' => ['inquiry_type', 'status_key']],
        ],
    ];

    /**
     * Additional indices for Support system (v1.7.5+)
     */
    public const SUPPORT_INDICES = [
        Support::TABLE => [
            'supports_inq_opt_idx' => ['columns' => ['inquiry_id', 'option_id']],
            'supports_inq_user_idx' => ['columns' => ['inquiry_id', 'user_id']],
            'supports_opt_user_idx' => ['columns' => ['option_id', 'user_id']],
            'supports_engine_idx' => ['columns' => ['support_engine_id']],
            'supports_weight_idx' => ['columns' => ['weight']],
            'supports_created_idx' => ['columns' => ['created']],
            'supports_inq_created_idx' => ['columns' => ['inquiry_id', 'created']],
        ],
    ];

    /**
     * Additional indices for Support Engines (v1.7.5+)
     */
    public const SUPPORT_ENGINE_INDICES = [
        'agora_support_engines' => [
            'engine_inquiry_idx' => ['columns' => ['inquiry_id']],
            'engine_inquiry_group_idx' => ['columns' => ['inquiry_group_id']],
            'engine_type_idx' => ['columns' => ['engine']],
            'engine_status_idx' => ['columns' => ['status']],
            'engine_created_idx' => ['columns' => ['created']],
            'engine_inquiry_status_idx' => ['columns' => ['inquiry_id', 'status']],
            'engine_target_type_idx' => ['columns' => ['target_type']],
        ],
    ];

    /**
     * Additional indices for Support Results (v1.7.5+)
     */
    public const SUPPORT_RESULT_INDICES = [
        'agora_support_results' => [
            'result_engine_idx' => ['columns' => ['support_engine_id']],
            'result_target_idx' => ['columns' => ['target_type', 'target_id']],
            'result_updated_idx' => ['columns' => ['updated']],
            'result_target_uniq' => ['columns' => ['target_type', 'target_id', 'support_engine_id'], 'unique' => true],
        ],
    ];

    /**
     * Get all index definitions merged together
     */
    public static function getAllIndices(): array
    {
        return array_merge(
            self::COMMON_INDICES,
            self::OPTIONAL_INDICES,
            self::UNIQUE_INDICES,
            self::SUPPORT_INDICES,
            self::SUPPORT_ENGINE_INDICES,
            self::SUPPORT_RESULT_INDICES
        );
    }

    /**
     * Get unique indices only
     */
    public static function getUniqueIndices(): array
    {
        return self::UNIQUE_INDICES;
    }

    /**
     * Get common indices only
     */
    public static function getCommonIndices(): array
    {
        return self::COMMON_INDICES;
    }

    /**
     * Get optional indices only
     */
    public static function getOptionalIndices(): array
    {
        return self::OPTIONAL_INDICES;
    }

    /**
     * Get foreign key indices only
     */
    public static function getFkIndices(): array
    {
        return self::FK_INDICES;
    }
}
