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
            // FIX (Bug 19 from earlier audit): Share references Inquiry too
            Share::TABLE => ['constraintColumn' => 'inquiry_id', 'onDelete' => 'CASCADE'],
        ],

        InquiryGroup::TABLE => [
            InquiryGroupMisc::TABLE => ['constraintColumn' => 'inquiry_group_id', 'onDelete' => 'CASCADE'],
            InquiryGroup::RELATION_TABLE => ['constraintColumn' => 'group_id', 'onDelete' => 'CASCADE'],
            // FIX: Share references InquiryGroup too
            Share::TABLE => ['constraintColumn' => 'group_id', 'onDelete' => 'CASCADE'],
        ],

        Option::TABLE => [
            OptionMisc::TABLE => ['constraintColumn' => 'option_id', 'onDelete' => 'CASCADE'],
            // FIX: Comment, Support, Quorum reference Option
            Comment::TABLE => ['constraintColumn' => 'option_id', 'onDelete' => 'CASCADE'],
            Support::TABLE => ['constraintColumn' => 'option_id', 'onDelete' => 'CASCADE'],
            Quorum::TABLE => ['constraintColumn' => 'option_id', 'onDelete' => 'CASCADE'],
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

        'agora_comment_option_deleted' => [
            'table' => Comment::TABLE,
            'name' => 'agora_comment_option_deleted',
            'unique' => false,
            'columns' => ['option_id', 'deleted']
        ],
        'agora_support_option_user' => [
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
     *
     * FIX (Bug D): Removed all entries that are superseded by COMMON_INDICES
     * with a different name. These 21 entries used to appear both here AND in
     * the OBSOLETE_INDICES list of Version010710, causing the migration to
     * drop and immediately re-add each one. Removed entries are listed below
     * the array for reference.
     */
    public const OPTIONAL_INDICES = [
        Inquiry::TABLE => [
            // Removed: inquiries_inquiries_owners_non_deleted  → use inq_owner_deleted
            // Removed: inquiries_inquiries_deleted             → use inq_owner_deleted
            // Removed: inquiries_inquiries_owners              → use inq_owner_deleted
            // Removed: inquiries_family_type                   → use inq_type_family
            // Removed: inquiries_status_expire                 → use inq_expire_status
        ],
        Option::TABLE => [
            // Removed: inquiries_options_non_deleted    → use opt_type_status
            // Removed: inquiries_options_owner          → no replacement
            // Removed: inquiries_options_type_status    → use opt_type_status
            // Removed: inquiries_options_sort_order     → no replacement
        ],
        Share::TABLE => [
            // Removed: inquiries_shares_user            → use share_user_deleted
            // Removed: inquiries_shares_types           → use share_inquiry_type
            // Removed: inquiries_group_shares_user      → use share_group_type
            // Removed: inquiries_shares_token           → use agora_uniq_token
        ],
        Support::TABLE => [
            // Removed: inquiries_supports_hash          → no replacement
            // Removed: inquiries_supports_user_created  → no replacement
        ],
        InquiryGroup::TABLE => [
            // Removed: inquirygroup_deleted             → use inq_group_owner_deleted
            // Removed: inquirygroup_owner               → use inq_group_owner_deleted
            // Removed: inquirygroup_type_status         → use inq_group_type_parent
        ],
        InquiryGroupMisc::TABLE => [
            // Removed: groupmisc_key                    → no replacement
            // Removed: groupmisc_group_key              → use agora_uniq_group_misc
        ],
        Comment::TABLE => [
            // Removed: comment_inquiry_deleted          → no replacement
            // Removed: comment_option_deleted           → use agora_comment_option_deleted
        ],
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
        // FIX (Issue 7): Must include support_engine_id to match the
        // definition created by Version20250715120000::createSupportTable()
        // and modified by Version010705.
        Support::TABLE => [
            'agora_uniq_supports' => [
                'columns' => ['inquiry_id', 'option_id', 'user_id', 'support_engine_id']
            ],
        ],
        Preferences::TABLE => [
            'agora_uniq_preferences' => ['columns' => ['user_id']],
        ],
        Watch::TABLE => [
            'agora_uniq_watch' => ['columns' => ['inquiry_id', 'table', 'session_id']],
        ],
        // FIX (Issue 3): Renamed to match Version010702's rename.
        // The old name 'agora_uniq_inquiry_group_relation' is dropped by
        // Version010702 and replaced by 'uq_agora_ginq_ig'.
        InquiryGroup::RELATION_TABLE => [
            'uq_agora_ginq_ig' => ['columns' => ['inquiry_id', 'group_id']],
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
            'result_target_uniq' => [
                'columns' => ['target_type', 'target_id', 'support_engine_id'],
                'unique' => true,
            ],
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

    public static function getUniqueIndices(): array
    {
        return self::UNIQUE_INDICES;
    }

    public static function getCommonIndices(): array
    {
        return self::COMMON_INDICES;
    }

    public static function getOptionalIndices(): array
    {
        return self::OPTIONAL_INDICES;
    }

    public static function getFkIndices(): array
    {
        return self::FK_INDICES;
    }
}
