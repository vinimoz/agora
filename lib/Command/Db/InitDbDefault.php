<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Db;

use OCP\IGroupManager;
use OCA\Agora\Command\Command;
use OCP\IDBConnection;
use OCA\Agora\Db\Category;
use OCA\Agora\Db\Location;
use OCA\Agora\Db\InquiryStatus;
use OCA\Agora\Db\InquiryType;
use OCA\Agora\Db\InquiryGroupType;
use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryFamily;
use OCA\Agora\Db\OptionFamily;
use OCP\Migration\IOutput;

class InitDbDefault extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:init-default';
    protected string $description = 'Initialize default Agora categories and locations';
    private IGroupManager $groupManager;
    private IDBConnection $connection;

    private array $inquiryTypeFamilies = [
        [
            'family_type' => 'deliberative',
            'label' => 'Deliberative',
            'description' => 'Citizen-driven processes such as debates, proposals, petitions, projects, and deliberations.',
            'icon' => 'AccountGroup',
            'sort_order' => 1,
            'created' => '',
        ],
        [
            'family_type' => 'legislative',
            'label' => 'Legislative',
            'description' => 'Law proposals, amendments, constitutional workshops, and official legislative responses.',
            'icon' => 'Gavel',
            'sort_order' => 2,
            'created' => '',
        ],
        [
            'family_type' => 'administrative',
            'label' => 'Administrative',
            'description' => 'Administrative requests and grievances addressed to institutions.',
            'icon' => 'OfficeBuilding',
            'sort_order' => 3,
            'created' => '',
        ],
        [
            'family_type' => 'service',
            'label' => 'Service',
            'description' => 'Social and citizen service requests such as housing, childcare, or scholarships.',
            'icon' => 'Offer',
            'sort_order' => 4,
            'created' => '',
        ],
        [
            'family_type' => 'collective',
            'label' => 'Collective',
            'description' => 'Assemblies and grouped consultations on themes or topics, could be used for submit it to polls',
            'icon' => 'AccountMultiple',
            'sort_order' => 5,
            'created' => '',
        ],
        [
            'family_type' => 'oversight',
            'label' => 'Oversight',
            'description' => 'Citizen oversight, transparency mechanisms and investigation processes to prevent corruption and ensure accountability.',
            'icon' => 'EyeCheck',
            'sort_order' => 6,
            'created' => '',
        ],
        [
            'family_type' => 'governance',
            'label' => 'Governance',
            'description' => 'Citizen oversight, accountability, audits and performance evaluation of public entities.',
            'icon' => 'ShieldAccount',
            'sort_order' => 8,
            'created' => '',
        ],
        [
            'family_type' => 'official',
            'label' => 'Official',
            'description' => 'Responses and contributions from official entities such as city hall, experts, or commissions.',
            'icon' => 'Seal',
            'sort_order' => 7,
            'created' => '',
        ],
    ];



    private array $optionTypeFamilies = [
        [
            'family_type' => 'debate',
            'label' => 'Debate',
            'description' => 'Debate positions, arguments, and alternatives',
            'icon' => 'Discussion',
            'ui' => [
                'layout' => 'paired', 
                'layout_style' => 'vertical',
                'allowed_layout' => 'paired',
                'show_metrics' => true, 
                'thread_visualization' => 'tree', 
            ],
            'rules' => [
                'require_initial_position' => true,
                'max_thread_depth' => 10,
                'min_arguments_before_summary' => 3,
            ],
            'features' => [
                'argument_rating',
                'thread_collapsing',
            ],
            'actions' => [
                ['key' => 'export_thread', 'label' => 'Export Debate Thread', 'icon' => 'Download'],
                ['key' => 'generate_summary', 'label' => 'Generate Summary', 'icon' => 'Summarize'],
                ['key' => 'visualize_network', 'label' => 'View Argument Network', 'icon' => 'Graph'],
            ],
            'sort_order' => 1,
            'created' => '',
        ],
        [
            'family_type' => 'structure',
            'label' => 'Structure',
            'description' => 'Structured documents with chapters and articles',
            'icon' => 'Settings',
            'ui' => [
                'layout' => 'tree',
                'allowed_layout' => 'tree',
                'show_toc' => true,
                'collapsible_sections' => true,
                'breadcrumb_navigation' => true,
            ],
            'rules' => [
                'max_depth' => 5,
                'require_numeric_notation' => true,
                'allow_cross_references' => true,
            ],
            'features' => [
                'version_control',
                'change_tracking',
                'commentary',
            ],
            'actions' => [
                ['key' => 'import_document', 'label' => 'Import Document', 'icon' => 'Upload' , 'modal' => true],
                ['key' => 'export_pdf', 'label' => 'Export as PDF', 'icon' => 'FilePdf' , 'modal' => true],
                ['key' => 'export_markdown', 'label' => 'Export as Markdown', 'icon' => 'Markdown' , 'modal' => true],
                ['key' => 'print_view', 'label' => 'Print View', 'icon' => 'Printer' , 'modal' => true],
                ['key' => 'compare_versions', 'label' => 'Compare Versions', 'icon' => 'Diff' , 'modal' => true],
            ],
            'sort_order' => 2,
            'created' => '',
        ],
        [
            'family_type' => 'consensus',
            'label' => 'Consensus',
            'description' => 'Consultation questions and consensus building',
            'icon' => 'ThumbUp',
            'ui' => [
                'layout' => 'consensus_flow',
                'show_consensus_meter' => true,
                'highlight_objections' => true,
                'visualize_progress' => true,
            ],
            'rules' => [
                'consensus_threshold' => 0.8,
                'require_objection_response' => true,
                'objection_escalation_time' => 7, // days
            ],
            'features' => [
                'consensus_tracking',
                'objection_management',
                'poll_integration',
            ],
            'actions' => [
                ['key' => 'export_consensus_report', 'label' => 'Export Consensus Report', 'icon' => 'Report'],
                ['key' => 'generate_minutes', 'label' => 'Generate Minutes', 'icon' => 'Minutes'],
                ['key' => 'visualize_consensus', 'label' => 'View Consensus Map', 'icon' => 'Map'],
                ['key' => 'schedule_facilitation', 'label' => 'Schedule Facilitation', 'icon' => 'Calendar'],
            ],
            'sort_order' => 3,
            'created' => '',
        ],
        [
            'family_type' => 'decision',
            'label' => 'Decision',
            'description' => 'Official decisions and results',
            'icon' => 'Checkmark',
            'ui' => [
                'layout' => 'cards',
                'show_metadata' => true,
                'highlight_authority' => true,
                'timeline_view' => true,
            ],
            'rules' => [
                'require_official_endorsement' => true,
                'min_approval_count' => 1,
                'appeal_period_days' => 14,
            ],
            'features' => [
                'legal_binding',
                'appeal_mechanism',
                'implementation_tracking',
            ],
            'actions' => [
                ['key' => 'generate_legal_document', 'label' => 'Generate Legal Document', 'icon' => 'Gavel'],
                ['key' => 'export_decision', 'label' => 'Export Decision', 'icon' => 'FileExport'],
                ['key' => 'notify_stakeholders', 'label' => 'Notify Stakeholders', 'icon' => 'Bell'],
                ['key' => 'track_implementation', 'label' => 'Track Implementation', 'icon' => 'ProgressCheck'],
            ],
            'sort_order' => 4,
            'created' => '',
        ],
        [
            'family_type' => 'vote',
            'label' => 'Vote',
            'description' => 'Voting and decision-making system',
            'icon' => 'Vote',

            'ui' => [
                'layout' => ['type' => 'string', 'default' => 'vote'],
                'show_results' => ['type' => 'boolean', 'default' => true],
                'show_progress' => ['type' => 'boolean', 'default' => true],
                'show_ranking' => ['type' => 'boolean', 'default' => true],
                'allow_comparison' => ['type' => 'boolean', 'default' => true],
                'phase_indicator' => ['type' => 'boolean', 'default' => false],
            ],

            'rules' => [
                'require_candidates' => ['type' => 'boolean', 'default' => true],
                'allow_multiple_votes' => ['type' => 'boolean', 'default' => false],
                'vote_limit_per_user' => ['type' => 'number', 'default' => 1],

                'require_quorum' => ['type' => 'boolean', 'default' => false],
                'auto_close_on_expire' => ['type' => 'boolean', 'default' => true],

                'one_engine_per_phase' => ['type' => 'boolean', 'default' => true],
                'immutable_after_close' => ['type' => 'boolean', 'default' => true],
            ],

            'features' => [

                'engines' => [

                    'binary' => [
                        'label' => 'Yes / No',
                        'input' => 'binary',
                        'behavior' => 'single',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 1],
                            'max_candidates' => ['type' => 'number', 'default' => 1],
                        ],
                        'config_schema' => [],
                    ],

                    'ternary' => [
                        'label' => 'For / Abstain / Against',
                        'input' => 'ternary',
                        'behavior' => 'single',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 1],
                            'max_candidates' => ['type' => 'number', 'default' => 1],
                        ],
                        'config_schema' => [],
                    ],

                    'reaction' => [
                        'label' => 'Reactions',
                        'input' => 'reaction',
                        'behavior' => 'single',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 1],
                            'max_candidates' => ['type' => 'number', 'default' => 1],
                        ],
                        'config_schema' => [
                            'allowed_reactions' => [
                                'type' => 'array',
                                'default' => ['👍','👎','❤️','😂','😢']
                            ]
                        ],
                    ],

                    'score' => [
                        'label' => 'Score',
                        'input' => 'score',
                        'behavior' => 'single',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 1],
                            'max_candidates' => ['type' => 'number', 'default' => 1],
                        ],
                        'config_schema' => [
                            'min' => ['type' => 'number', 'default' => 0],
                            'max' => ['type' => 'number', 'default' => 10],
                        ],
                    ],

                    'approval' => [
                        'label' => 'Approval',
                        'input' => 'approval',
                        'behavior' => 'multi',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 2],
                        ],
                        'config_schema' => [
                            'min_choices' => ['type' => 'number', 'default' => 1],
                            'max_choices' => ['type' => 'number|null', 'default' => null],
                        ],
                    ],

                    'ranked' => [
                        'label' => 'Ranked Choice',
                        'input' => 'ranking',
                        'behavior' => 'multi',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 2],
                        ],
                        'config_schema' => [
                            'max_rank' => ['type' => 'number|null', 'default' => null],
                        ],
                    ],

                    'borda' => [
                        'label' => 'Borda',
                        'input' => 'ranking',
                        'behavior' => 'multi',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 2],
                        ],
                        'config_schema' => [],
                    ],

                    'condorcet' => [
                        'label' => 'Condorcet',
                        'input' => 'ranking',
                        'behavior' => 'multi',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 2],
                        ],
                        'config_schema' => [
                            'method' => [
                                'type' => 'string',
                                'default' => 'schulze'
                            ]
                        ],
                    ],

                    'majority_judgment' => [
                        'label' => 'Majority Judgment',
                        'input' => 'grade',
                        'behavior' => 'multi',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 2],
                        ],
                        'config_schema' => [
                            'grades' => [
                                'type' => 'array',
                                'default' => ['Reject','Poor','Fair','Good','Excellent']
                            ]
                        ],
                    ],

                    'token_weighted' => [
                        'label' => 'Token / Weight',
                        'input' => 'weighted',
                        'behavior' => 'flex',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 1],
                            'requires_weight_source' => ['type' => 'boolean', 'default' => true],
                        ],
                        'config_schema' => [
                            'weight_source' => [
                                'type' => 'object',
                                'default' => null
                            ],
                            'normalization' => [
                                'type' => 'string',
                                'default' => 'none'
                            ],
                        ],
                    ],

                    'quadratic' => [
                        'label' => 'Quadratic',
                        'input' => 'score',
                        'behavior' => 'flex',
                        'constraints' => [
                            'min_candidates' => ['type' => 'number', 'default' => 1],
                        ],
                        'config_schema' => [
                            'credits_per_user' => ['type' => 'number', 'default' => 100],
                        ],
                    ],
                ],

                'real_time_results' => ['type' => 'boolean', 'default' => true],
                'ranking' => ['type' => 'boolean', 'default' => true],
                'tie_breaking' => ['type' => 'boolean', 'default' => true],
                'quorum_tracking' => ['type' => 'boolean', 'default' => false],
            ],
            'actions' => [
                ['key' => 'start_vote', 'label' => 'Start Vote', 'icon' => 'Play'],
                ['key' => 'close_vote', 'label' => 'Close Vote', 'icon' => 'Lock'],
                ['key' => 'next_phase', 'label' => 'Next Phase', 'icon' => 'ArrowRight'],
                ['key' => 'view_results', 'label' => 'View Results', 'icon' => 'ChartBar'],
                ['key' => 'export_results', 'label' => 'Export Results', 'icon' => 'FileExport'],
            ],
            'sort_order' => 5,
            'created' => '',

        ],
        [
            'family_type' => 'proposal',
            'label' => 'Proposal',
            'description' => 'Initial proposals and suggestions',
            'icon' => 'Lightbulb',
            'ui' => [
                'layout' => 'cards',
                'show_support_meter' => true,
                'highlight_impact' => true,
                'proposal_template' => 'standard',
            ],
            'rules' => [
                'requires_cost_estimate' => false,
                'requires_impact_assessment' => true,
                'min_support_threshold' => 5,
            ],
            'features' => [
                'budget_estimation',
                'impact_analysis',
                'community_feedback',
            ],
            'actions' => [
                ['key' => 'duplicate_proposal', 'label' => 'Duplicate Proposal', 'icon' => 'ContentCopy'],
                ['key' => 'merge_proposals', 'label' => 'Merge with Similar', 'icon' => 'CallMerge'],
                ['key' => 'export_proposal', 'label' => 'Export Proposal', 'icon' => 'FileExport'],
                ['key' => 'request_review', 'label' => 'Request Expert Review', 'icon' => 'AccountReview'],
            ],
            'sort_order' => 6,
            'created' => '',
        ],
        [
            'family_type' => 'workflow',
            'label' => 'Workflow',
            'description' => 'Project and decision workflow management',
            'icon' => 'ViewKanban',
            'ui' => [
                'layout' => 'kanban',
                'kanban_column' => [
                    ['value' => 'draft', 'label' => 'Draft', 'color' => '#949494'],
                    ['value' => 'active', 'label' => 'Active', 'color' => '#3498db'],
                    ['value' => 'completed', 'label' => 'Completed', 'color' => '#27ae60'],
                    ['value' => 'cancelled', 'label' => 'Cancelled', 'color' => '#e74c3c'],
                ],
                'show_swimlanes' => true,
                'wip_limits' => true,
                'cycle_time_visualization' => true,
            ],
            'rules' => [
                'require_status_transitions' => true,
                'enforce_wip_limits' => true,
                'auto_assign_on_move' => false,
            ],
            'features' => [
                'automated_transitions',
                'blocker_detection',
                'sla_tracking',
            ],
            'actions' => [
                ['key' => 'export_board', 'label' => 'Export Board', 'icon' => 'FileExport'],
                ['key' => 'generate_flow_report', 'label' => 'Flow Report', 'icon' => 'ChartLine'],
                ['key' => 'configure_workflow', 'label' => 'Configure Workflow', 'icon' => 'Cog'],
                ['key' => 'bulk_transition', 'label' => 'Bulk Transition', 'icon' => 'ArrowRightBold'],
            ],
            'sort_order' => 7,
            'created' => '',
        ],
        [
            'family_type' => 'process',
            'label' => 'Process',
            'description' => 'Timeline and procedural events',
            'icon' => 'Timeline',
            'ui' => [
                'layout' => 'timeline',
                'show_gantt' => true,
                'milestone_highlight' => true,
                'dependency_lines' => true,
            ],
            'rules' => [
                'chronological_order' => true,
                'require_dates' => true,
                'allow_overlap' => false,
            ],
            'features' => [
                'gantt_chart',
                'critical_path',
                'resource_allocation',
            ],
            'actions' => [
                ['key' => 'export_gantt', 'label' => 'Export Gantt', 'icon' => 'FileExport'],
                ['key' => 'print_timeline', 'label' => 'Print Timeline', 'icon' => 'Printer'],
                ['key' => 'adjust_schedule', 'label' => 'Adjust Schedule', 'icon' => 'CalendarClock'],
                ['key' => 'identify_bottlenecks', 'label' => 'Identify Bottlenecks', 'icon' => 'AlertCircle'],
            ],
            'sort_order' => 8,
            'created' => '',
        ],
    ];

    private array $optionTypes = [
        // ====================================================
        // Vote Family
        // Root: candidate
        // ====================================================
        [
            'family' => 'vote',
            'option_type' => 'candidate',
            'icon' => 'Account',
            'label' => 'Candidate',
            'description' => 'A candidate or option to vote for.',

            'fields' => [
                ['key' => 'description', 'label' => 'Description', 'type' => 'textarea', 'required' => false],
                ['key' => 'image', 'label' => 'Image', 'type' => 'file', 'required' => false],
                ['key' => 'start_date', 'label' => 'Start date', 'type' => 'datetime', 'required' => false], 
                ['key' => 'status', 'label' => 'Status', 'type' => 'string', 'required' => false], 
            ],

            'allowed_response' => [
            ],

            'allow_comment' => true,
            'support_feature' => 'voting',

            'statuses' => [
                'draft:Draft',
                'active:Active',
                'leading:Leading',
                'selected:Selected',
                'rejected:Rejected',
            ],

            'use_title' => true,
        ],

        // ====================================================
        // Workflow Family
        // Root: workflow_item
        // ====================================================
        [
            'family' => 'workflow',
            'option_type' => 'workflow_item',
            'icon' => 'Task',
            'label' => 'Workflow Item',
            'description' => 'Task or decision moving through workflow stages.',
            'fields' => [
                ['key' => 'priority', 'label' => 'Priority', 'type' => 'enum', 'required' => true, 'allowed_values' => ['low', 'medium', 'high', 'critical']],
                ['key' => 'assigned_to', 'label' => 'Assisgned to', 'type' => 'users', 'required' => false],
                ['key' => 'due_date', 'label' => ' Due date', 'type' => 'datetime', 'required' => false],
            ],
            'allowed_response' => [
                'workflow_comment',
                'workflow_blocker',
                'workflow_transition',
                'message',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'statuses' => [
                'draft:Draft',
                'in_progress:Progress',
                'review:Review',
                'validated:Check',
                'rejected:Cancel',
            ],
            'use_title' => true,
        ],
        [
            'family' => 'workflow',
            'option_type' => 'workflow_transition',
            'icon' => 'ArrowRight',
            'label' => 'Workflow Transition',
            'description' => 'State change within workflow.',
            'fields' => [
                ['key' => 'from_status', 'type' => 'string', 'required' => true],
                ['key' => 'to_status', 'type' => 'string', 'required' => true],
                ['key' => 'justification', 'type' => 'text', 'required' => false],
            ],
            'allowed_response' => [
                'message',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => false,
        ],
        [
            'family' => 'workflow',
            'option_type' => 'workflow_blocker',
            'icon' => 'Warning',
            'label' => 'Workflow Blocker',
            'description' => 'Blocking issue preventing progress.',
            'fields' => [
                ['key' => 'severity', 'type' => 'enum', 'required' => true, 'allowed_values' => ['minor', 'major', 'critical']],
                ['key' => 'reason', 'type' => 'text', 'required' => true],
            ],
            'allowed_response' => [
                'message',
                'workflow_transition',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'statuses' => [
                'active:Alert',
                'resolved:Check',
            ],
            'use_title' => false,
        ],
        [
            'family' => 'workflow',
            'option_type' => 'workflow_comment',
            'icon' => 'Comment',
            'label' => 'Workflow Comment',
            'description' => 'Comment related to workflow item.',
            'fields' => [],
            'allowed_response' => [
                'message',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => false,
        ],

        // ====================================================
        // Process Family
        // Root: process_phase
        // ====================================================
        [
            'family' => 'process',
            'option_type' => 'process_phase',
            'icon' => 'Layers',
            'label' => 'Process Phase',
            'description' => 'Time period structuring the process.',
            'fields' => [
                ['key' => 'start_date', 'type' => 'datetime', 'required' => true],
                ['key' => 'end_date', 'type' => 'datetime', 'required' => false],
            ],
            'allowed_response' => [
                'process_event',
                'milestone',
                'deadline',
                'status_change',
                'message',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [
                'open:LockOpen',
                'closed:Lock',
            ],
            'use_title' => true,
        ],
        [
            'family' => 'process',
            'option_type' => 'process_event',
            'icon' => 'Calendar',
            'label' => 'Process Event',
            'description' => 'Significant event in process timeline.',
            'fields' => [
                ['key' => 'event_date', 'type' => 'datetime', 'required' => true],
                ['key' => 'event_type', 'type' => 'string', 'required' => true],
            ],
            'allowed_response' => [
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'process',
            'option_type' => 'milestone',
            'icon' => 'Flag',
            'label' => 'Milestone',
            'description' => 'Key milestone in the process.',
            'fields' => [
                ['key' => 'milestone_date', 'type' => 'datetime', 'required' => true],
            ],
            'allowed_response' => [
                'message',
                'official_summary',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'process',
            'option_type' => 'deadline',
            'icon' => 'Clock',
            'label' => 'Deadline',
            'description' => 'Formal deadline for action.',
            'fields' => [
                ['key' => 'due_date', 'type' => 'datetime', 'required' => true],
                ['key' => 'scope', 'type' => 'string', 'required' => false],
            ],
            'allowed_response' => [
                'message',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [
                'active:Clock',
                'expired:ClockAlert',
            ],
            'use_title' => false,
        ],
        [
            'family' => 'process',
            'option_type' => 'status_change',
            'icon' => 'History',
            'label' => 'Status Change',
            'description' => 'Historical change of status.',
            'fields' => [
                ['key' => 'old_status', 'type' => 'string', 'required' => true],
                ['key' => 'new_status', 'type' => 'string', 'required' => true],
                ['key' => 'change_date', 'type' => 'datetime', 'required' => true],
            ],
            'allowed_response' => [
                'message',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => false,
        ],

        // ====================================================
        // Debate Family
        // Roots: position_for, position_against, alternative
        // ====================================================
        [
            'family' => 'debate',
            'option_type' => 'position_for',
            'icon' => 'ThumbUp',
            'label' => 'Position – For',
            'description' => 'Support position in a debate.',
            'fields' => [],
            'allowed_response' => [
                'argument_for',
                'argument_against',
                'alternative',
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'ternary',
            'statuses' => [],
            'use_title' => false,
        ],
        [
            'family' => 'debate',
            'option_type' => 'position_against',
            'icon' => 'ThumbDown',
            'label' => 'Position – Against',
            'description' => 'Opposition position in a debate (can be conditional).',
            'fields' => [
                ['key' => 'conditional_support', 'type' => 'json', 'required' => false],
            ],
            'allowed_response' => [
                'argument_for',
                'argument_against',
                'alternative',
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'ternary',
            'statuses' => [],
            'use_title' => false,
        ],
        [
            'family' => 'debate',
            'option_type' => 'alternative',
            'icon' => 'SwapHorizontal',
            'label' => 'Alternative',
            'description' => 'Alternative proposal that may lift objections.',
            'fields' => [],
            'allowed_response' => [
                'argument_for',
                'argument_against',
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'ternary',
            'statuses' => [
                'active:Check',
                'resolved:ThumbUp',
            ],
            'use_title' => true,
        ],
        [
            'family' => 'debate',
            'option_type' => 'argument_for',
            'icon' => 'MessagePlus',
            'label' => 'Argument – For',
            'description' => 'Argument supporting a position.',
            'fields' => [],
            'allowed_response' => [
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'statuses' => [],
            'use_title' => false,
        ],
        [
            'family' => 'debate',
            'option_type' => 'argument_against',
            'icon' => 'MessageMinus',
            'label' => 'Argument – Against',
            'description' => 'Argument opposing a position.',
            'fields' => [],
            'allowed_response' => [
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'statuses' => [],
            'use_title' => false,
        ],
        [
            'family' => 'debate',
            'option_type' => 'message',
            'icon' => 'MessageText',
            'label' => 'Message',
            'description' => 'Free discussion message.',
            'fields' => [],
            'allowed_response' => [
                'message',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => false,
        ],
        [
            'family' => 'debate',
            'option_type' => 'official_summary',
            'icon' => 'CheckCircle',
            'label' => 'Official Summary',
            'description' => 'Final synthesis or accepted outcome.',
            'fields' => [
                ['key' => 'resolved_option_ids', 'type' => 'json', 'required' => false],
            ],
            'allowed_response' => [],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [
                'draft:Draft',
                'published:Check',
            ],
            'use_title' => true,
        ],

        // ====================================================
        // Structure Family
        // Roots: structure_intro, chapter
        // ====================================================
        [
            'family' => 'structure',
            'option_type' => 'structure_intro',
            'icon' => 'TextBox',
            'label' => 'Introduction',
            'description' => 'Preamble or introductory text of a structured document.',
            'fields' => [],
            'allowed_response' => [
                'chapter',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'structure',
            'option_type' => 'chapter',
            'icon' => 'BookOpenVariant',
            'label' => 'Chapter',
            'description' => 'Top-level chapter in a structured proposal.',
            'fields' => [],
            'allowed_response' => [
                'section',
                'article',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [
                'draft:Draft',
                'published:Check',
            ],
            'use_title' => true,
        ],
        [
            'family' => 'structure',
            'option_type' => 'section',
            'icon' => 'FormatListBulleted',
            'label' => 'Section',
            'description' => 'Subdivision of a chapter to organize articles.',
            'fields' => [],
            'allowed_response' => [
                'article',
            ],
            'allow_comment' => false,
            'support_feature' => 'none',
            'statuses' => [
                'draft:Draft',
                'published:Check',
            ],
            'use_title' => true,
        ],
        [
            'family' => 'structure',
            'option_type' => 'article',
            'icon' => 'FileDocument',
            'label' => 'Article',
            'description' => 'Normative article within a chapter or section.',
            'fields' => [],
            'allowed_response' => [
                'amendment',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'structure',
            'option_type' => 'amendment',
            'icon' => 'FileDocumentEdit',
            'label' => 'Amendment',
            'description' => 'Proposed modification to an article.',
            'fields' => [
                ['key' => 'article_ref', 'type' => 'integer', 'required' => true],
            ],
            'allowed_response' => [
                'argument_for',
                'argument_against',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'ternary',
            'statuses' => [
                'proposed:Lightbulb',
                'under_review:ClockOutline',
                'accepted:Check',
                'rejected:Cancel',
            ],
            'use_title' => true,
        ],

        // ====================================================
        // Consensus Family
        // Roots: consultation_question
        // ====================================================
        [
            'family' => 'consensus',
            'option_type' => 'consultation_question',
            'icon' => 'HelpCircle',
            'label' => 'Consultation Question',
            'description' => 'Question posed to a collective.',
            'fields' => [],
            'allowed_response' => [
                'poll_option',
                'argument_for',
                'argument_against',
                'objection',
                'exception',
                'official_result',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'consensus',
            'option_type' => 'poll_option',
            'icon' => 'BarChart2',
            'label' => 'Poll Option',
            'description' => 'Selectable option in a poll.',
            'fields' => [],
            'allowed_response' => [
                'official_result',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'consensus',
            'option_type' => 'objection',
            'icon' => 'AlertCircle',
            'label' => 'Formal Objection',
            'description' => 'Blocks consensus until resolved.',
            'fields' => [
                ['key' => 'blocking', 'type' => 'boolean', 'required' => true],
            ],
            'allowed_response' => [
                'amendment',
                'exception',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],
        [
            'family' => 'consensus',
            'option_type' => 'exception',
            'icon' => 'AlertOutline',
            'label' => 'Exception',
            'description' => 'Negative feedback that does not block consensus.',
            'fields' => [],
            'allowed_response' => [
                'amendment',
                'message',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],

        // ====================================================
        // Decision Family
        // Roots: official_result
        // ====================================================
        [
            'family' => 'decision',
            'option_type' => 'official_result',
            'icon' => 'CheckCircle',
            'label' => 'Official Result',
            'description' => 'Final result or synthesis.',
            'fields' => [
                ['key' => 'poll_provider', 'type' => 'string', 'required' => false],
                ['key' => 'poll_id', 'type' => 'string', 'required' => false],
            ],
            'allowed_response' => [],
            'allow_comment' => true,
            'support_feature' => 'none',
            'statuses' => [],
            'use_title' => true,
        ],

        // ====================================================
        // Proposal Family
        // Roots: proposal
        // ====================================================
        [
            'family' => 'proposal',
            'option_type' => 'proposal',
            'icon' => 'Lightbulb',
            'label' => 'Proposal',
            'description' => 'Initial proposal.',
            'fields' => [],
            'allowed_response' => [
                'argument_for',
                'argument_against',
                'objection',
                'amendment',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'ternary',
            'statuses' => [],
            'use_title' => true,
        ],
    ];


    private array $inquiryTypes = [
        [
            'inquiry_type' => 'law_proposal',
            'family' => 'legislative',
            'icon' => 'BookOpenVariant',
            'label' => 'Law Proposal',
            'description' => 'Draft or amendment of a law, with mapped articles and status.',
            'fields' => [
                ["key" => "parent_law_id","label" => "Loi parente","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "article_map","label" => "Article associé","type" => "string","required" => false,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "legal_status","label" => "Statut juridique","type" => "enum","required" => true,"allowed_values" => ["pending","validated","rejected"],"default" => "pending","rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","required" => false,"default" => "simple","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"rules" => []],
                ["key" => "start_date","label" => "Supporting Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "end_date","label" => "Supporting End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "facilitator_id","label" => "Facilitateur","type" => "users","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],

            ],
            'allowed_response' => ['amendment','objection','official'],
            'allowed_transformation' => [],
            'allowed_option_type' => [
                'article',
                'chapter',
                'amendment',
                'official_summary',
                'process_phase',
                'process_event',
                'milestone',
            ],

            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'amendment',
            'family' => 'legislative',
            'icon' => 'FileDocumentEdit',
            'label' => 'Amendment',
            'description' => 'Amendment targeting a specific article of a law or proposal.',
            'fields' => [
                ["key" => "parent_law_id","label" => "Parent Law","type" => "integer","required" => true,"default" => null,"rules" => []],
                ["key" => "article_ref","label" => "Article Reference","type" => "integer","required" => true,"default" => null,"rules" => []],
                ["key" => "facilitator_id","label" => "Facilitator","type" => "users","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => null,
            'allowed_transformation' => null,
            'allowed_option_type' => [
                'amendment',
                'argument_for',
                'argument_against',
                'official_summary',
                'process_phase',
                'milestone',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => false,
            'created' => '',
        ],
        [
            'inquiry_type' => 'constitutional_workshop',
            'family' => 'legislative',
            'icon' => 'Library',
            'label' => 'Constitutional Workshop',
            'fields' => [
                ["key" => "draft_text","label" => "Draft Text","type" => "text","required" => true,"default" => null,"rules" => []],
                ["key" => "article_map","label" => "Article Map","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "facilitator_id","label" => "Facilitator","type" => "users","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['law_proposal'],
            'allowed_transformation' => null,
            'allowed_option_type' => [
                'chapter',
                'position_for',
                'position_against',
                'alternative',
                'process_phase',
                'milestone',
                'process_event',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'policy_consultation',
            'family' => 'legislative',
            'icon' => 'AccountVoice',
            'label' => 'Policy Consultation',
            'description' => 'Consultation on public policies with impact evaluation.',
            'fields' => [
                ["key" => "policy_area","label" => "Policy Area","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "impact_assessment","label" => "Impact Assessment","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['law_proposal','response'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['consultation_question','position_for','position_against','official_result'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],

        // --- Deliberative ---
        [
            'inquiry_type' => 'objection',
            'family' => 'deliberative',
            'icon' => 'AlertCircle',
            'label' => 'Objection',
            'description' => 'Objection linked to another inquiry, can be resolved via suggestions.',
            'fields' => [
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['position_for','position_against','alternative','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => false,
            'created' => '',
        ],

        [
            'inquiry_type' => 'suggestion',
            'family' => 'deliberative',
            'icon' => 'Lightbulb',
            'label' => 'Suggestion',
            'description' => 'Suggestion to solve or refine an objection or debate argument.',
            'fields' => [
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => null,
            'allowed_transformation' => ['proposal','law_proposal'],
            'allowed_option_type' => ['objection','amendment','exception'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => false,
            'created' => '',
        ],
        [
            'inquiry_type' => 'proposal',
            'family' => 'deliberative',
            'icon' => 'LightbulbOn',
            'label' => 'Proposal',
            'description' => 'Citizen proposal requiring support or linked to a future law.',
            'fields' => [
                ["key" => "quorum","label" => "Quorum","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "parent_law_id","label" => "Parent Law","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","required" => false,"default" => "simple","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"rules" => []],
                ["key" => "support_start","label" => "Supporting Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "support_end","label" => "Supporting End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['objection','suggestion','official'],
            'allowed_transformation' => ['law_proposal'],
            'allowed_option_type' => ['candidate','proposal','chapter','workflow_item','process_phase','position_for','position_against','alternative','consultation_question'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'petition',
            'family' => 'deliberative',
            'icon' => 'ClipboardText',
            'label' => 'Petition',
            'description' => 'Petition requiring citizen signatures.',
            'fields' => [
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","required" => false,"default" => "simple","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"rules" => []],
                ["key" => "support_start","label" => "Supporting Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "support_end","label" => "Supporting End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => ['initiative'],
            'allowed_option_type' => ['position_for','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'vision',
            'family' => 'deliberative',
            'icon' => 'Map',
            'label' => 'Vision / Roadmap',
            'description' => 'Long-term citizen roadmap or strategic vision.',
            'fields' => [
                ["key" => "horizon_year","label" => "Horizon Year","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion'],
            'allowed_transformation' => ['roadmap'],
            'allowed_option_type' => ['proposal','chapter','position_for','alternative'],
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'initiative',
            'family' => 'deliberative',
            'icon' => 'RocketLaunch',
            'label' => 'Initiative',
            'description' => 'Collective citizen initiative requiring a threshold of support.',
            'fields' => [
                ["key" => "co_owners","label" => "Co-owners","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "quorum","label" => "Quorum","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","required" => false,"default" => "simple","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"rules" => []],
                ["key" => "support_start","label" => "Supporting Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "support_end","label" => "Supporting End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['proposal','objection','suggestion','official'],
            'allowed_transformation' => ['law_proposal'],
            'allowed_option_type' => ['proposal','position_for','position_against','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'deliberation',
            'family' => 'deliberative',
            'icon' => 'AccountMultipleCheck',
            'label' => 'Deliberation',
            'description' => 'Citizen jury or deliberation assembly with defined participants.',
            'fields' => [
                ["key" => "facilitator_id","label" => "Facilitator","type" => "users","required" => false,"default" => null,"rules" => []],
                ["key" => "participants_list","label" => "Participants List","type" => "groups","required" => true,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['proposal','suggestion','official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['position_for','position_against','alternative','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'participatory_budget',
            'family' => 'deliberative',
            'icon' => 'CurrencyUsd',
            'label' => 'Participatory Budget',
            'description' => 'Citizen-driven allocation of public budget funds.',
            'fields' => [
                ["key" => "total_budget", "label" => "Total Budget", "type" => "integer", "required" => true],
                ["key" => "currency", "label" => "Currency", "type" => "string", "required" => false, "default" => "CHF"],
                ["key" => "min_project_amount", "label" => "Minimum Project Amount", "type" => "integer", "required" => false],
                ["key" => "max_project_amount", "label" => "Maximum Project Amount", "type" => "integer", "required" => false],
                ["key" => "budget_year", "label" => "Budget Year", "type" => "integer", "required" => true],
                ["key" => "district_allocation", "label" => "District Allocation", "type" => "json", "required" => false],
                ["key" => "eligible_categories", "label" => "Eligible Categories", "type" => "json", "required" => false],
                ["key" => "submission_deadline", "label" => "Submission Deadline", "type" => "datetime", "required" => true],
                ["key" => "voting_period_start", "label" => "Voting Period Start", "type" => "datetime", "required" => true],
                ["key" => "voting_period_end", "label" => "Voting Period End", "type" => "datetime", "required" => true],
                ["key" => "max_votes_per_citizen", "label" => "Max Votes per Citizen", "type" => "integer", "required" => false, "default" => 5],
                ["key" => "voting_method", "label" => "Voting Method", "type" => "enum", "required" => true, "default" => "cumulative",
                "allowed_values" => ["cumulative", "ranked_choice", "approval", "weighted"]],
                ["key" => "technical_evaluation_required", "label" => "Technical Evaluation Required", "type" => "boolean", "required" => false, "default" => true],
                ["key" => "feasibility_check_by", "label" => "Feasibility Check By", "type" => "users", "required" => false],
            ],
             'allowed_response' => ['official_response', 'project', 'proposal'], 
    'allowed_transformation' => [],
    'allowed_option_type' => ['proposal', 'candidate', 'position_for', 'official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        // --- Project / Review ---
        [
            'inquiry_type' => 'project',
            'family' => 'deliberative',
            'icon' => 'BriefcaseCheck',
            'label' => 'Project',
            'description' => 'Concrete project with cost, responsible unit, and deadline.',
            'fields' => [
                ["key" => "budget","label" => "Budget","type" => "integer","required" => true,"default" => null,"rules" => []],
                ["key" => "deadline","label" => "Deadline","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","required" => false,"default" => "simple","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"rules" => []],
                ["key" => "support_start","label" => "Supporting Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "support_end","label" => "Supporting End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['project_review','suggestion','objection','official'],
            'allowed_transformation' => [],
            'allowed_option_type' => ['proposal','chapter','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],

        // PROJECT REVIEW
        [
            'inquiry_type' => 'project_review',
            'family' => 'deliberative',
            'icon' => 'ClipboardCheck',
            'label' => 'Project Review',
            'description' => 'Evaluation of an ongoing or completed project.',
            'fields' => [
                ["key" => "project_id","label" => "Project ID","type" => "integer","required" => true,"default" => null,"rules" => []],
                ["key" => "evaluation","label" => "Evaluation","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['position_for','position_against','objection','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => false,
            'created' => '',
        ],

        // --- CITIZEN REQUEST ---
        [
            'inquiry_type' => 'accountability_request',
            'family' => 'governance',
            'icon' => 'HelpCircle',
            'label' => 'Accountability Request',
            'description' => 'Citizen request for justification or explanation from an elected official or administration.',
            'fields' => [
                ["key" => "target_entity","label" => "Target Entity","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "scope","label" => "Scope","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "period","label" => "Period","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "severity","label" => "Severity","type" => "enum","required" => true,"default" => "medium","allowed_values" => ["low","medium","high","critical"],"rules" => []],
                ["key" => "deadline","label" => "Response Deadline","type" => "datetime","required" => false,"default" => null,"rules" => []],

                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "main","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "full","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official_response','audit_request','performance_review'],
            'allowed_transformation' => [],
            'allowed_option_type' => [
                'position_for',
                'position_against',
                'argument_for',
                'argument_against',
                'official_summary',
                'process_phase',
                'deadline',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'performance_review',
            'family' => 'governance',
            'icon' => 'ChartLine',
            'label' => 'Performance Review',
            'description' => 'Evaluation of an elected official, institution or public program.',
            'fields' => [
                ["key" => "target","label" => "Target","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "period","label" => "Evaluation Period","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "objectives","label" => "Objectives","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "results","label" => "Results","type" => "json","required" => false,"default" => null,"rules" => []],

                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "main","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "full","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official_response','audit_request'],
            'allowed_transformation' => [],
            'allowed_option_type' => [
                'position_for',
                'position_against',
                'argument_for',
                'argument_against',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'ternary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'audit_request',
            'family' => 'governance',
            'icon' => 'ClipboardSearch',
            'label' => 'Audit Request',
            'description' => 'Request for an investigation or audit on a public matter.',
            'fields' => [
                ["key" => "target","label" => "Target","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "reason","label" => "Reason","type" => "text","required" => true,"default" => null,"rules" => []],
                ["key" => "priority","label" => "Priority","type" => "enum","required" => true,"default" => "medium","allowed_values" => ["low","medium","high","critical"],"rules" => []],

                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "main","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "full","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official_response','performance_review'],
            'allowed_transformation' => [],
            'allowed_option_type' => [
                'process_phase',
                'milestone',
                'official_summary',
            ],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => false,
            'created' => '',
        ],

        // --- COLLECTIVE ---
        // NEWS
        [
            'inquiry_type' => 'news',
            'family' => 'collective',
            'icon' => 'Newspaper',
            'label' => 'News',
            'description' => 'Public informational notice.',
            'fields' => [
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => [],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        // ANNOUNCEMENT
        [
            'inquiry_type' => 'announcement',
            'family' => 'collective',
            'icon' => 'Megaphone',
            'label' => 'Announcement',
            'description' => 'Administrative or public announcement.',

            'fields' => [
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],

            ],
            'allowed_response' => [],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        //BULLETIN
        [
            'inquiry_type' => 'bulletin',
            'family' => 'collective',
            'icon' => 'ClipboardList',
            'label' => 'Bulletin',
            'description' => 'Periodic update or report.',
            'fields' => [
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => [],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        //MEETING
        [
            'inquiry_type' => 'meeting',
            'family' => 'collective',
            'icon' => 'Calendar',
            'label' => 'Meeting',
            'description' => 'Scheduled in-person or online meeting.',
            'fields' => [
                ["key" => "location","label" => "Location","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "meeting_date","label" => "Meeting Date","type" => "datetime","required" => true,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['agenda_item','message','official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        //GATHERING
        [
            'inquiry_type' => 'gathering',
            'family' => 'collective',
            'icon' => 'Users',
            'label' => 'Gathering',
            'description' => 'Public citizen gathering or workshop.',
            'fields' => [
                ["key" => "location","label" => "Location","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "start","label" => "Start Date","type" => "datetime","required" => true,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['agenda_item','message','official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],


        //CONFERENCE
        [
            'inquiry_type' => 'conference',
            'family' => 'collective',
            'icon' => 'Presentation',
            'label' => 'Conference',
            'description' => 'Public event presenting information or expert insights.',
            'fields' => [
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "speakers","label" => "Speakers","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['agenda_item','message','official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],



        // --- Debate ---
        //
        [
            'inquiry_type' => 'debate',
            'family' => 'collective',
            'icon' => 'Forum',
            'label' => 'Debate',
            'description' => 'Public debate with a neutral facilitator and optional quorum.',
            'fields' => [
                ["key" => "facilitator_id","label" => "Facilitator","type" => "users","required" => false,"default" => null,"rules" => []],
                ["key" => "quorum","label" => "Quorum","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","required" => false,"default" => "simple","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"rules" => []],
                ["key" => "support_start","label" => "Supporting Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "support_end","label" => "Supporting End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['suggestion','proposal','petition','official'],
            'allowed_transformation' => ['law_proposal','policy_consultation'],
            'allowed_option_type' => ['position_for','position_against','alternative','official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        // --- Poll ---
        [
            'inquiry_type' => 'poll',
            'family' => 'collective',
            'icon' => 'BarChart',
            'label' => 'Poll',
            'description' => 'A specific voting process with multiple methods.',
            'fields' => [
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => ["maxLength" => 255]],
                ["key" => "voting_start","label" => "Voting Start","type" => "datetime","required" => true,"default" => null,"rules" => []],
                ["key" => "voting_end","label" => "Voting End","type" => "datetime","required" => true,"default" => null,"rules" => []],
                ["key" => "poll_method","label" => "Poll Method","type" => "enum","required" => true,"default" => "simple","allowed_values" => [
                    "simple",
                    "majority_judgement_beneficial",
                    "majority_judgement_number",
                    "condorcet",
                    "approval",
                    "nauru"
                ],"rules" => []],
                ["key" => "allow_multiple_choices","label" => "Allow Multiple Choices","type" => "boolean","required" => true,"default" => false,"rules" => []],
                ["key" => "tie_break_rule","label" => "Tie Break Rule","type" => "enum","required" => true,"default" => "random","allowed_values" => ["random","condorcet_priority","highest_median"],"rules" => []],
                ["key" => "result_visibility","label" => "Result Visibility","type" => "enum","required" => true,"default" => "after_close","allowed_values" => ["always","after_close","partial"],"rules" => []],
                ["key" => "vote_secret","label" => "Secret Vote","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['poll_option','official_result'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        // --- Citizen Jury Recommendation ---
        [
            'inquiry_type' => 'citizen_jury_recommendation',
            'family' => 'collective',
            'icon' => 'Gavel',
            'label' => 'Citizen Jury Recommendation',
            'description' => 'Recommendation issued by a randomly selected citizen jury.',
            'fields' => [
                ["key" => "title","label" => "Title","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "mandate","label" => "Mandate","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "jury_id","label" => "Jury ID","type" => "users","required" => true,"default" => null,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['proposal','law_proposal','official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['recommendation','objection','official_result'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        // --- Consultation ---
        [
            'inquiry_type' => 'consultation',
            'family' => 'collective',
            'icon' => 'Gavel',
            'label' => 'Citizen Consultation',
            'description' => 'A public consultation process allowing citizens to submit opinions, proposals, or feedback.',
            'fields' => [
                [
                    "key" => "mandate",
                    "label" => "Mandate",
                    "type" => "text",
                    "required" => false,
                    "default" => null,
                    "rules" => []
                ],
                [
                    "key" => "deadline",
                    "label" => "Deadline",
                    "type" => "date",
                    "required" => false,
                    "default" => null,
                    "rules" => []
                ],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['proposal', 'law_proposal', 'official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['consultation_question','objection','exception','official_result'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // OFFICIAL
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [
            'inquiry_type' => 'official_announcement',
            'family' => 'official',
            'icon' => 'Megaphone',
            'label' => 'Official Announcement',
            'description' => 'Official announcement from the municipality.',
            'fields' => [
                ["key" => "title","label" => "Title","type" => "string","required" => true],
                ["key" => "content","label" => "Content","type" => "rich_text","required" => true],
                ["key" => "published_by","label" => "Published by","type" => "users","required" => false],
                ["key" => "expiration_date","label" => "Expiration Date","type" => "date","required" => false],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'municipal_report',
            'family' => 'official',
            'icon' => 'FileBarChart',
            'label' => 'Municipal Report',
            'description' => 'Official municipal report publication.',
            'fields' => [
                ["key" => "title","label" => "Title","type" => "string","required" => true],
                ["key" => "year","label" => "Year","type" => "integer","required" => true],
                ["key" => "document","label" => "Document","type" => "files","required" => false],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['official_summary'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'official',
            'family' => 'official',
            'icon' => 'ClipboardCheck',
            'label' => 'Official Response',
            'description' => 'Official answer to an inquiry (accepted, rejected, under review).',
            'fields' => [
                ["key" => "responder_id","label" => "Responder","type" => "users","required" => true,"default" => null,"rules" => []],
                ["key" => "resolution_status","label" => "Resolution Status","type" => "enum","required" => true,"default" => "pending","allowed_values" => ["pending","accepted","rejected"],"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => null,
            'allowed_transformation' => null,
            'allowed_option_type' => [],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        //////////////////////////////////////////////////////////////////////////////////
        // ADMINISTRATIVE
        ///////////////////////////////////////////////////////////////////////////////////
        // --- Administrative / Service / Social ---
        [
            'inquiry_type' => 'admin_request',
            'family' => 'administrative',
            'icon' => 'FileDocument',
            'label' => 'Administrative Request',
            'description' => 'General citizen administrative requests.',
            'fields' => [
                ["key" => "request_type","label" => "Request Type","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "processing_deadline","label" => "Processing Deadline","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "resolution_date","label" => "Resolution Date","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto load forms","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'grievance',
            'family' => 'administrative',
            'icon' => 'AlertOctagon',
            'label' => 'Grievance',
            'description' => 'Complaint or report regarding an administrative issue.',
            'fields' => [
                ["key" => "severity","label" => "Severity","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "resolution_date","label" => "Resolution Date","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto load forms","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "footer","allowed_values" => ["sidebar","main","footer","header"],"rules" => []],
                ["key" => "render_mode","label" => "Render mode of inquiries","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"],"rules" => []],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"],"rules" => []],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => [],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'information_request',
            'family' => 'administrative',
            'icon' => 'Info',
            'label' => 'Information Request',
            'description' => 'Citizen request for public information or documents.',
            'fields' => [
                ["key" => "subject","label" => "Subject","type" => "string","required" => true],
                ["key" => "requested_document","label" => "Requested Document","type" => "string","required" => false],
                ["key" => "deadline","label" => "Desired Deadline","type" => "date","required" => false],
            ],
            'allowed_response' => ['official','message'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'permit_request',
            'family' => 'administrative',
            'icon' => 'FileCheck',
            'label' => 'Permit Request',
            'description' => 'Request for an official permit or authorization.',
            'fields' => [
                ["key" => "permit_type","label" => "Permit Type","type" => "string","required" => true],
                ["key" => "description","label" => "Description","type" => "text","required" => false],
                ["key" => "location","label" => "Location","type" => "location","required" => false],
                ["key" => "attachments","label" => "Attachments","type" => "files","required" => false],
            ],
            'allowed_response' => ['official','proposal'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],

        //////////////////////////////////////////////////////////////////////////////////
        //SERVICE
        ///////////////////////////////////////////////////////////////////////////////////
        [
            'inquiry_type' => 'service_request',
            'family' => 'service',
            'icon' => 'Offer',
            'label' => 'Service / Social Request',
            'description' => 'General service request or social support demand.',
            'fields' => [
                ["key" => "support_type","label" => "Support Type","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "eligibility","label" => "Eligibility","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "processing_deadline","label" => "Processing Deadline","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "resolution_date","label" => "Resolution Date","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto load forms","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []]
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => [],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'maintenance_request',
            'family' => 'service',
            'icon' => 'Wrench',
            'label' => 'Maintenance Request',
            'description' => 'Citizen report of infrastructure problems or needed repairs.',
            'fields' => [
                ["key" => "location","label" => "Location","type" => "location","required" => true],
                ["key" => "issue","label" => "Issue Description","type" => "text","required" => true],
                ["key" => "priority","label" => "Priority","type" => "enum","required" => false,"allowed_values" => ["low","medium","high"]],
                ["key" => "attachments","label" => "Photos","type" => "files","required" => false],
            ],
            'allowed_response' => ['official','proposal'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message','task'],
            'allow_comment' => true,
            'support_feature' => 'support_vote',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'booking_request',
            'family' => 'service',
            'icon' => 'Calendar',
            'label' => 'Booking Request',
            'description' => 'Request to book a municipal room or public space.',
            'fields' => [
                ["key" => "location","label" => "Location","type" => "location","required" => true],
                ["key" => "start_date","label" => "Start Date","type" => "datetime","required" => true],
                ["key" => "end_date","label" => "End Date","type" => "datetime","required" => true],
                ["key" => "purpose","label" => "Purpose","type" => "text","required" => false],
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['booking_slot','message'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'classified_ad',
            'family' => 'service',
            'icon' => 'Megaphone',
            'label' => 'Classified Ad',
            'description' => 'Citizen classified advertisement.',
            'fields' => [
                ["key" => "title","label" => "Title","type" => "string","required" => true],
                ["key" => "description","label" => "Description","type" => "text","required" => true],
                ["key" => "price","label" => "Price","type" => "integer","required" => false],
                ["key" => "contact","label" => "Contact","type" => "string","required" => false],
            ],
            'allowed_response' => ['message'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message'],
            'allow_comment' => true,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        ////////////////////////////////////////////////////////////////////////////
        // OVERSIGHT /////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        [
            'inquiry_type' => 'investigation_request',
            'family' => 'oversight',
            'icon' => 'Magnify',
            'label' => 'Investigation Request',
            'description' => 'Citizen request to investigate a public issue, corruption suspicion, or administrative failure.',
            'fields' => [
                ["key" => "subject","label" => "Subject","type" => "string","required" => true],
                ["key" => "reason","label" => "Reason / Evidence","type" => "text","required" => true],
                ["key" => "requested_by","label" => "Requested by","type" => "users","required" => false],
                ["key" => "deadline","label" => "Requested deadline","type" => "date","required" => false],
                ["key" => "layout_zone","label" => "Position display into the layout","type" => "enum","required" => false,"default" => "main","allowed_values" => ["sidebar","main","footer","header"]],
                ["key" => "render_mode","label" => "Render mode","type" => "enum","required" => false,"default" => "cards","allowed_values" => ["cards","list","full","summary","rich_html"]],
                ["key" => "open_mode","label" => "Open Mode","type" => "enum","required" => false,"default" => "page","allowed_values" => ["page","modal","none"]],
            ],
            'allowed_response' => ['official','proposal'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'recall_initiative',
            'family' => 'oversight',
            'icon' => 'AccountCancel',
            'label' => 'Recall Initiative',
            'description' => 'Citizen initiative to recall/remove an elected official before term end.',
            'fields' => [
                ["key" => "target_official_id", "label" => "Target Official", "type" => "users", "required" => true],
                ["key" => "official_position", "label" => "Official Position", "type" => "string", "required" => true],
                ["key" => "recall_grounds", "label" => "Grounds for Recall", "type" => "rich_text", "required" => true],
                ["key" => "signatures_required", "label" => "Signatures Required", "type" => "integer", "required" => true],
                ["key" => "signatures_collected", "label" => "Signatures Collected", "type" => "integer", "required" => false, "default" => 0],
                ["key" => "collection_deadline", "label" => "Collection Deadline", "type" => "datetime", "required" => true],
                ["key" => "recall_election_date", "label" => "Recall Election Date", "type" => "datetime", "required" => false],
                ["key" => "legal_review_status", "label" => "Legal Review Status", "type" => "enum", "required" => false, "default" => "pending",
                "allowed_values" => ["pending", "approved_for_circulation", "rejected", "qualified_for_ballot"]],
                ["key" => "proponent_committee", "label" => "Proponent Committee", "type" => "users", "required" => true],
                ["key" => "official_response", "label" => "Official Response", "type" => "rich_text", "required" => false],
            ],
            'allowed_inquiry_types' => ['proposal', 'petition'],
            'allowed_response' => ['official_response', 'official_result'],
            'allowed_option_type' => ['position_for', 'position_against', 'official_summary'],
            'allow_comment' => false,
            'support_feature' => 'binary',
            'is_root' => true,
        ],
        [
            'inquiry_type' => 'public_spending_review',
            'family' => 'oversight',
            'icon' => 'CurrencyUsd',
            'label' => 'Public Spending Review',
            'description' => 'Citizen review of public spending and municipal budget allocations.',
            'fields' => [
                ["key" => "project_name","label" => "Project Name","type" => "string","required" => true],
                ["key" => "amount","label" => "Budget Amount","type" => "integer","required" => true],
                ["key" => "description","label" => "Description","type" => "text","required" => false],
                ["key" => "documents","label" => "Documents","type" => "files","required" => false],
                ["key" => "layout_zone","label" => "Position display","type" => "enum","required" => false,"default" => "main","allowed_values" => ["sidebar","main","footer","header"]],
            ],
            'allowed_response' => ['analysis','official'],
            'allowed_transformation' => null,
            'allowed_option_type' => ['message','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
        ],
        [
            'inquiry_type' => 'contract_review',
            'family' => 'oversight',
            'icon' => 'FileSearch',
            'label' => 'Public Contract Review',
            'description' => 'Review of a public contract or procurement process.',
            'fields' => [
                ["key" => "contract_name","label" => "Contract Name","type" => "string","required" => true],
                ["key" => "contractor","label" => "Contractor","type" => "string","required" => false],
                ["key" => "contract_value","label" => "Contract Value","type" => "integer","required" => false],
                ["key" => "documents","label" => "Documents","type" => "files","required" => false],
            ],
            'allowed_response' => ['proposal','official'],
            'allowed_option_type' => ['message','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
        ],
        [
            'inquiry_type' => 'conflict_of_interest',
            'family' => 'oversight',
            'icon' => 'AlertOctagon',
            'label' => 'Conflict of Interest Inquiry',
            'description' => 'Investigation of potential conflicts of interest involving public officials.',
            'fields' => [
                ["key" => "official","label" => "Official Concerned","type" => "users","required" => true],
                ["key" => "decision","label" => "Decision Concerned","type" => "string","required" => true],
                ["key" => "evidence","label" => "Evidence","type" => "text","required" => false],
            ],
            'allowed_response' => ['analysis','official'],
            'allowed_option_type' => ['message','official_summary'],
            'allow_comment' => true,
            'support_feature' => 'binary',
            'is_root' => true,
        ],
        [
            'inquiry_type' => 'whistleblower_case',
            'family' => 'oversight',
            'icon' => 'ShieldAlert',
            'label' => 'Whistleblower Case',
            'description' => 'Protected report from a whistleblower about corruption or illegal actions.',
            'fields' => [
                ["key" => "subject","label" => "Subject","type" => "string","required" => true],
                ["key" => "description","label" => "Description","type" => "text","required" => true],
                ["key" => "anonymous","label" => "Anonymous","type" => "boolean","required" => false],
            ],
            'allowed_response' => ['investigation','official'],
            'allowed_option_type' => ['official_summary'],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
        ],


        ///////////////////////////////////////////////////////////////////////////
        // --- Social / Childcare / Housing / Scholarship (examples) ---
        ///////////////////////////////////////////////////////////////////////////
        [
            'inquiry_type' => 'scholarship_request',
            'family' => 'service',
            'icon' => 'School',
            'label' => 'Scholarship Request',
            'description' => 'Request for scholarship or educational aid.',
            'fields' => [
                ["key" => "student_id","label" => "Student ID","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "requested_amount","label" => "Requested Amount","type" => "integer","required" => true,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto load forms","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []]
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => [],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'childcare_request',
            'family' => 'service',
            'icon' => 'BabyCarriage',
            'label' => 'Childcare Request',
            'description' => 'Request for childcare support or enrollment.',
            'fields' => [
                ["key" => "child_id","label" => "Child ID","type" => "users","required" => true,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto load forms","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []]
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => [],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ],
        [
            'inquiry_type' => 'housing_request',
            'family' => 'service',
            'icon' => 'Home',
            'label' => 'Housing Request',
            'description' => 'Request for housing support or allocation.',
            'fields' => [
                ["key" => "applicant_id","label" => "Applicant ID","type" => "users","required" => true,"default" => null,"rules" => []],
                ["key" => "priority_status","label" => "Priority Status","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "assigned_unit","label" => "Assigned Unit","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto load forms","type" => "boolean","required" => true,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => true,"default" => true,"rules" => []]
            ],
            'allowed_response' => ['official'],
            'allowed_transformation' => null,
            'allowed_option_type' => [],
            'allow_comment' => false,
            'support_feature' => 'none',
            'is_root' => true,
            'created' => '',
        ]
    ];

    private array $inquiryGroupTypes = [
        // Maintenance Board
        [
            'family' => 'service',
            'group_type' => 'maintenance_board',
            'icon' => 'Tool',
            'label' => 'Maintenance Board',
            'description' => 'Public infrastructure maintenance and repair tracking.',
            'fields' => [
                ["key" => "location","label" => "Location","type" => "location","required" => false,"default" => null,"rules" => []],
                ["key" => "priority","label" => "Priority","type" => "string","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['maintenance_request','incident_report'],
            'allowed_response' => ['official','message'],
            'is_root' => true,
            'sort_order' => 1,
            'created' => '',
        ],

        // Public Space Booking
        [
            'family' => 'service',
            'group_type' => 'public_space_booking',
            'icon' => 'Calendar',
            'label' => 'Public Space Booking',
            'description' => 'Booking of municipal rooms or public spaces.',
            'fields' => [
                ["key" => "location","label" => "Location","type" => "location","required" => false,"default" => null,"rules" => []],
                ["key" => "capacity","label" => "Capacity","type" => "integer","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['booking_request'],
            'allowed_response' => ['booking_slot'],
            'is_root' => true,
            'sort_order' => 2,
            'created' => '',
        ],

        // Classified Ads
        [
            'family' => 'service',
            'group_type' => 'classified_ads',
            'icon' => 'Megaphone',
            'label' => 'Classified Ads',
            'description' => 'Local classified ads for services, jobs, and goods.',
            'fields' => [
                ["key" => "category","label" => "Category","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "price","label" => "Price","type" => "integer","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['classified_ad','service_offer','job_offer'],
            'allowed_response' => ['message'],
            'is_root' => true,
            'sort_order' => 3,
            'created' => '',
        ],
        // Audit Case
        [
            'family' => 'oversight',
            'group_type' => 'audit_case',
            'icon' => 'Search',
            'label' => 'Audit Case',
            'description' => 'A public audit case reviewing municipal spending or actions.',
            'fields' => [
                ["key" => "target_entity","label" => "Target Entity","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "status","label" => "Status","type" => "string","required" => false,"default" => "open","rules" => []],
            ],
            'allowed_inquiry_types' => ['investigation_request','public_spending_review','proposal'],
            'allowed_response' => ['official','report'],
            'is_root' => true,
            'sort_order' => 1,
            'created' => '',
        ],

        // Investigation Case
        [
            'family' => 'oversight',
            'group_type' => 'investigation_case',
            'icon' => 'AlertTriangle',
            'label' => 'Investigation Case',
            'description' => 'A citizen or official investigation into a public concern.',
            'fields' => [
                ["key" => "subject","label" => "Subject","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "priority","label" => "Priority","type" => "string","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['investigation_request'],
            'allowed_response' => ['official','report'],
            'is_root' => true,
            'sort_order' => 2,
            'created' => '',
        ],

        // Ethics Review
        [
            'family' => 'oversight',
            'group_type' => 'ethics_review',
            'icon' => 'Shield',
            'label' => 'Ethics Review',
            'description' => 'Review of ethics or conflict of interest involving public officials.',
            'fields' => [
                ["key" => "official_id","label" => "Official ID","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "decision_reference","label" => "Decision Reference","type" => "string","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['conflict_of_interest','investigation_request'],
            'allowed_response' => ['official','report'],
            'is_root' => true,
            'sort_order' => 3,
            'created' => '',
        ],
        // Official Announcements
        [
            'family' => 'official',
            'group_type' => 'official_announcements',
            'icon' => 'Megaphone',
            'label' => 'Official Announcements',
            'description' => 'Official announcements from the municipality.',
            'fields' => [
                ["key" => "priority","label" => "Priority","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "expiration_date","label" => "Expiration Date","type" => "date","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['official'],
            'allowed_response' => ['official_summary'],
            'is_root' => true,
            'sort_order' => 1,
            'created' => '',
        ],

        // Municipal Reports
        [
            'family' => 'official',
            'group_type' => 'municipal_reports',
            'icon' => 'FileBarChart',
            'label' => 'Municipal Reports',
            'description' => 'Publication of official municipal reports.',
            'fields' => [
                ["key" => "year","label" => "Year","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "department","label" => "Department","type" => "string","required" => false,"default" => null,"rules" => []],
            ],
            'allowed_inquiry_types' => ['official'],
            'allowed_response' => ['official_summary'],
            'is_root' => true,
            'sort_order' => 2,
            'created' => '',
        ],
        // ==========================================================
        // ROOT COLLECTIVE TYPES (TOP LEVEL)
        // ==========================================================

        // Citizen Jury
        [
            'family' => 'collective',
            'group_type' => 'citizen_jury',
            'icon' => 'Gavel',
            'label' => 'Citizen Jury',
            'description' => 'A randomly selected citizen jury for deliberation and recommendations on public issues.',
            'fields' => [
                // Core identification
                ["key" => "title", "label" => "Title", "type" => "string", "required" => true, "default" => null, "rules" => ["maxLength" => 255]],
                ["key" => "mandate", "label" => "Mandate / Question", "type" => "rich_text", "required" => true, "default" => null, "rules" => []],
                ["key" => "topic", "label" => "Topic", "type" => "string", "required" => true, "default" => null, "rules" => ["maxLength" => 255]],

                // Selection configuration
                ["key" => "selection_method", "label" => "Selection Method", "type" => "enum", "required" => true, "default" => "stratified_sortition",
                "allowed_values" => [
                    "pure_sortition" => "Pure Sortition (Random)",
                    "stratified_sortition" => "Stratified Sortition (Demographic Quotas)",
                    "volunteer_pool_sortition" => "Volunteer Pool + Sortition",
                    "mixed_hybrid" => "Mixed (Elected + Sortition)",
                    "civic_lottery" => "Civic Lottery"
                ],
                "rules" => []
                ],

                // Jury composition
                ["key" => "jury_size", "label" => "Jury Size", "type" => "integer", "required" => true, "default" => 24, "rules" => ["min" => 12, "max" => 150]],
                ["key" => "alternates_count", "label" => "Number of Alternates", "type" => "integer", "required" => false, "default" => 4, "rules" => ["min" => 0, "max" => 20]],

                // Stratification criteria (if stratified_sortition)
                ["key" => "stratification_criteria", "label" => "Stratification Criteria", "type" => "json", "required" => false, "default" => [
                    "gender" => ["male" => 50, "female" => 50, "other" => "proportional"],
                    "age_groups" => ["18-35" => 25, "36-55" => 40, "56+" => 35],
                    "geographic_distribution" => true,
                    "socioeconomic_diversity" => "optional"
                ], "rules" => []],

                // Eligibility
                ["key" => "eligibility_criteria", "label" => "Eligibility Criteria", "type" => "json", "required" => false, "default" => [
                    "min_age" => 16,
                    "residency_requirement" => "municipal_resident",
                    "voter_registration_required" => false,
                    "excluded_positions" => ["elected_official", "municipal_employee", "direct_stakeholder"],
                    "language_requirements" => ["official_languages"]
                ], "rules" => []],

                ["key" => "population_pool", "label" => "Selection Pool", "type" => "enum", "required" => true, "default" => "municipal_residents",
                "allowed_values" => [
                    "municipal_residents" => "All Municipal Residents",
                    "registered_voters" => "Registered Voters Only",
                    "specific_district" => "Specific District/Neighborhood",
                    "volunteer_registry" => "Civic Volunteer Registry",
                    "thematic_experts" => "Thematic Interest Group"
                ],
                "rules" => []
                ],

                // Compensation
                ["key" => "compensation", "label" => "Compensation", "type" => "json", "required" => false, "default" => [
                    "amount" => 150,
                    "currency" => "CHF",
                    "unit" => "per_day",
                    "expenses_covered" => true,
                    "childcare_provided" => true,
                    "employer_compensation_letter" => true
                ], "rules" => []],

                ["key" => "compensation_amount", "label" => "Compensation Amount", "type" => "integer", "required" => false, "default" => null, "rules" => ["min" => 0]],
                ["key" => "compensation_unit", "label" => "Compensation Unit", "type" => "enum", "required" => false, "default" => "per_day",
                "allowed_values" => ["per_hour", "per_half_day", "per_day", "lump_sum", "voluntary"], "rules" => []],

                // Timeline and logistics
                ["key" => "start_date", "label" => "Start Date", "type" => "datetime", "required" => true, "default" => null, "rules" => []],
                ["key" => "end_date", "label" => "End Date", "type" => "datetime", "required" => false, "default" => null, "rules" => []],
                ["key" => "session_count", "label" => "Number of Sessions", "type" => "integer", "required" => false, "default" => 4, "rules" => ["min" => 1, "max" => 20]],
                ["key" => "session_duration_hours", "label" => "Session Duration (hours)", "type" => "integer", "required" => false, "default" => 4, "rules" => ["min" => 2, "max" => 8]],
                ["key" => "session_schedule", "label" => "Session Schedule", "type" => "json", "required" => false, "default" => [
                    "weekend_sessions" => true,
                    "evening_sessions" => true,
                    "consecutive_days" => false
                ], "rules" => []],

                // Location and format
                ["key" => "location", "label" => "Location", "type" => "location", "required" => true, "default" => null, "rules" => []],
                ["key" => "format", "label" => "Format", "type" => "enum", "required" => true, "default" => "in_person",
                "allowed_values" => ["in_person", "hybrid", "fully_online"], "rules" => []],
                ["key" => "online_platform", "label" => "Online Platform", "type" => "string", "required" => false, "default" => null, "rules" => []],
                ["key" => "accessibility_accommodations", "label" => "Accessibility Accommodations", "type" => "json", "required" => false, "default" => [
                    "wheelchair_access" => true,
                    "sign_language_interpretation" => false,
                    "translation_services" => false,
                    "transportation_assistance" => true
                ], "rules" => []],

                // Facilitation
                ["key" => "facilitator_ids", "label" => "Facilitators", "type" => "users", "required" => true, "default" => null, "rules" => []],
                ["key" => "expert_witness_ids", "label" => "Expert Witnesses", "type" => "users", "required" => false, "default" => null, "rules" => []],
                ["key" => "observer_ids", "label" => "Observers", "type" => "users", "required" => false, "default" => null, "rules" => []],

                // Deliberation rules
                ["key" => "decision_rule", "label" => "Decision Rule", "type" => "enum", "required" => true, "default" => "consensus_aim",
                "allowed_values" => [
                    "consensus_aim" => "Consensus Aim (fallback to supermajority)",
                    "supermajority_66" => "⅔ Supermajority",
                    "supermajority_75" => "¾ Supermajority",
                    "majority_vote" => "Simple Majority",
                    "unanimity" => "Unanimity Required"
                ], "rules" => []],

                ["key" => "quorum_requirement", "label" => "Quorum Requirement (%)", "type" => "integer", "required" => false, "default" => 75, "rules" => ["min" => 50, "max" => 100]],
                ["key" => "allow_dissent_opinion", "label" => "Allow Dissenting Opinion", "type" => "boolean", "required" => false, "default" => true, "rules" => []],
                ["key" => "deliberation_protocol", "label" => "Deliberation Protocol", "type" => "enum", "required" => false, "default" => "structured",
                "allowed_values" => ["open_discussion", "structured", "fishbowl", "world_cafe", "citizen_assembly_format"], "rules" => []],

                // Transparency and output
                ["key" => "public_observation", "label" => "Public Observation", "type" => "enum", "required" => true, "default" => "partial",
                "allowed_values" => ["closed_deliberation", "livestream_only", "public_gallery", "fully_public"], "rules" => []],
                ["key" => "transparency_level", "label" => "Transparency Level", "type" => "enum", "required" => true, "default" => "transparent",
                "allowed_values" => ["confidential", "anonymized_output", "attributed_output", "fully_transparent"], "rules" => []],
                ["key" => "output_format", "label" => "Expected Output", "type" => "enum", "required" => true, "default" => "recommendation_report",
                "allowed_values" => [
                    "recommendation_report" => "Recommendation Report",
                    "binding_decision" => "Binding Decision",
                    "advisory_opinion" => "Advisory Opinion",
                    "policy_proposal" => "Policy Proposal",
                    "evaluation_report" => "Evaluation Report"
                ], "rules" => []],

                // Official response requirements
                ["key" => "official_response_required", "label" => "Official Response Required", "type" => "boolean", "required" => true, "default" => true, "rules" => []],
                ["key" => "response_deadline_days", "label" => "Response Deadline (days)", "type" => "integer", "required" => false, "default" => 60, "rules" => ["min" => 14, "max" => 180]],
                ["key" => "implementation_tracking", "label" => "Track Implementation", "type" => "boolean", "required" => false, "default" => true, "rules" => []],

                // Metadata and status
                ["key" => "status", "label" => "Status", "type" => "enum", "required" => false, "default" => "planning",
                "allowed_values" => [
                    "planning" => "Planning",
                    "recruiting" => "Recruiting",
                    "selected" => "Jury Selected",
                    "in_session" => "In Session",
                    "deliberating" => "Deliberating",
                    "drafting" => "Drafting Report",
                    "completed" => "Completed",
                    "archived" => "Archived"
                ], "rules" => []],

                ["key" => "sortition_transparency", "label" => "Sortition Transparency", "type" => "enum", "required" => false, "default" => "full",
                "allowed_values" => [
                    "full" => "Full Disclosure (public algorithm and selection)",
                    "auditable" => "Auditable by Third Party",
                    "verifiable_anonymized" => "Verifiable with Privacy",
                    "private" => "Private Process"
                ], "rules" => []],

                ["key" => "sortition_algorithm", "label" => "Sortition Algorithm", "type" => "string", "required" => false, "default" => "cryptographic_random", "rules" => []],
                ["key" => "random_seed_public", "label" => "Public Random Seed", "type" => "string", "required" => false, "default" => null, "rules" => []],

                // Evaluation
                ["key" => "evaluation_metrics", "label" => "Evaluation Metrics", "type" => "json", "required" => false, "default" => [
                    "participant_satisfaction" => true,
                    "deliberation_quality" => true,
                    "representativeness" => true,
                    "influence_on_policy" => true
                ], "rules" => []],

                // UI configuration (standard across all types)
                ["key" => "layout_zone", "label" => "Position display into the layout", "type" => "enum", "required" => false, "default" => "main",
                "allowed_values" => ["sidebar", "main", "footer", "header"], "rules" => []],
                ["key" => "render_mode", "label" => "Render mode of inquiries", "type" => "enum", "required" => false, "default" => "full",
                "allowed_values" => ["cards", "list", "full", "summary", "rich_html"], "rules" => []],
                ["key" => "open_mode", "label" => "Open Mode", "type" => "enum", "required" => false, "default" => "page",
                "allowed_values" => ["page", "modal", "none"], "rules" => []],
            ],

            'allowed_inquiry_types' => [
                'deliberation',
                'proposal',
                'consultation',
                'poll',
                'law_proposal'
            ],

            'allowed_response' => [
                'citizen_jury_recommendation',
                'official_response',
                'proposal',
                'report'
            ],

            'allowed_option_type' => [
                'consultation_question',
                'position_for',
                'position_against',
                'alternative',
                'official_summary',
                'poll_option',
                'chapter',
                'process_phase',
                'milestone'
            ],

            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

        // Citizens Initiative
        [
            'family' => 'collective',
            'group_type' => 'initiative_group',
            'icon' => 'Flag',
            'label' => 'Citizens Initiative',
            'description' => 'A citizen-driven initiative handling signatures, validation and deliberation.',
            'fields' => [
                ["key" => "required_signatures","label" => "Required Signatures","type" => "integer","required" => true,"default" => null,"rules" => []],
                ["key" => "collection_deadline","label" => "Collection Deadline","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "initiative_scope","label" => "Initiative Scope","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "sponsor_ids","label" => "Sponsor IDs","type" => "users","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['consultation','deliberation','proposal','law_proposal'],
            'allowed_response' => ['chapter','delib_block'],
            'is_root' => true,
            'sort_order' => 3,
            'created' => '',
        ],

        // Referendum Group
        [
            'family' => 'collective',
            'group_type' => 'referendum_group',
            'icon' => 'CheckCircle',
            'label' => 'Referendum',
            'description' => 'Organizes all processes related to referendums.',
            'fields' => [
                ["key" => "binding","label" => "Binding","type" => "boolean","required" => false,"default" => true,"rules" => []],
                ["key" => "required_turnout","label" => "Required Turnout","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "referendum_type","label" => "Referendum Type","type" => "enum","allowed_values" => ["mandatory","optional","consultative"],"required" => true,"default" => null,"rules" => []],
                ["key" => "topic","label" => "Topic","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "form_schema","label" => "Form Schema","type" => "json","required" => false,"default" => null,"rules" => []],
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"required" => true,"default" => "simple","rules" => []],
                ["key" => "support_start","label" => "Support Start","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "support_end","label" => "Support End","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "auto_load","label" => "Auto Load","type" => "boolean","required" => false,"default" => true,"rules" => []],
                ["key" => "auto_reminder","label" => "Auto Reminder","type" => "boolean","required" => false,"default" => true,"rules" => []],
            ],

            'allowed_inquiry_types' => ['consultation','deliberation','proposal','law_proposal'],
            'allowed_response' => ['chapter','delib_block'],
            'is_root' => true,
            'sort_order' => 2,
            'created' => '',
        ],

        // Program
        [
            'family' => 'collective',
            'group_type' => 'program',
            'icon' => 'Calendar',
            'label' => 'Program',
            'description' => 'A multi-phase governance or thematic program.',
            'fields' => [
                ["key" => "start_date", "label" => "Start Date","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "end_date", "label" => "End Date","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "color_calendar", "label" => "Calendar Color","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "visibility", "label" => "Visibility","type" => "enum","allowed_values" => ["public","restricted","private"],"required" => true,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['assembly','consultation','deliberation','proposal','law_proposal','amendment'],
            'allowed_response' => ['canton','district','commune','working_group','commission','citizen_jury','chapter','delib_block'],
            'is_root' => true,
            'sort_order' => 5,
            'created' => '',
        ],

        // Assembly (top-level citizen assembly)
        [
            'family' => 'collective',
            'group_type' => 'assembly',
            'icon' => 'Bank',
            'label' => 'Assembly',
            'description' => 'A general citizen assembly.',
            'fields' => [
                ["key" => "quorum", "label" => "Quorum","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "meeting_frequency", "label" => "Meeting Frequency","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "voting_rules", "label" => "Voting Rules","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "agenda", "label" => "Agenda","type" => "text","required" => true,"default" => null,"rules" => []],
                ["key" => "facilitator_id","label" => "Facilitator","type" => "users","required" => false,"default" => null,"rules" => []],
                ["key" => "location","label" => "Location","type" => "location","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['deliberation','consultation','proposal','law_proposal'],
            'allowed_response' => ['canton','district','commune','working_group','chapter','delib_block'],
            'is_root' => true,
            'sort_order' => 1,
            'created' => '',
        ],

        // Bundle
        [
            'family' => 'collective',
            'group_type' => 'bundle',
            'icon' => 'Layers',
            'label' => 'Bundle',
            'description' => 'A generic container for multiple grouped inquiries.',
            'fields' => [
                ["key" => "version", "label" => "Version","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "tags", "label" => "Tags","type" => "list","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['assembly','consultation','deliberation','proposal','law_proposal','amendment'],
            'allowed_response' => ['assembly','canton','district','commune','working_group','chapter','delib_block','consultation_set','citizen_jury'],
            'is_root' => true,
            'sort_order' => 6,
            'created' => '',
        ],

        // Poll Group
        [
            'family' => 'collective',
            'group_type' => 'poll_group',
            'icon' => 'ChartBar',
            'label' => 'Poll Group',
            'description' => 'A group that organizes official or public polls.',
            'fields' => [
                ["key" => "type_of_vote","label" => "Type of Vote","type" => "enum","allowed_values" => ["simple","majority_judgement_beneficial","majority_judgement_number"],"required" => true,"default" => "simple","rules" => []],
                ["key" => "mandate", "label" => "Mandate","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "jury_size", "label" => "Jury Size","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "selection_method", "label" => "Selection Method","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "scope", "label" => "Scope","type" => "string","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['poll','official'],
            'allowed_response' => ['official'],
            'is_root' => true,
            'sort_order' => 4,
            'created' => '',
        ],


        // ==========================================================
        // TERRITORIAL HIERARCHY (SWISS MODEL)
        // ==========================================================

        // Canton
        [
            'family' => 'collective',
            'group_type' => 'canton',
            'icon' => 'Map',
            'label' => 'Canton',
            'description' => 'A Swiss canton level of governance.',
            'fields' => [
                ["key" => "name","label" => "Name","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "code","label" => "Code","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "population","label" => "Population","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "location","label" => "Location","type" => "location","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['consultation','deliberation','proposal'],
            'allowed_response' => ['district','commune','chapter','working_group','commission','referendum_group'],
            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

        // District
        [
            'family' => 'collective',
            'group_type' => 'district',
            'icon' => 'Map',
            'label' => 'District',
            'description' => 'A district or regional administrative level.',
            'fields' => [
                ["key" => "name","label" => "Name","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "population","label" => "Population","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "location","label" => "Location","type" => "location","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['consultation','deliberation','proposal','news','announcement'],
            'allowed_response' => ['commune','chapter','refenrendum_group'],
            'is_root' => false,
            'sort_order' => 2,
            'created' => '',
        ],

        // Commune
        [
            'family' => 'collective',
            'group_type' => 'commune',
            'icon' => 'HomeGroup',
            'label' => 'Commune',
            'description' => 'The lowest administrative level.',
            'fields' => [
                ["key" => "name","label" => "Name","type" => "string","required" => true,"default" => null,"rules" => []],
                ["key" => "population","label" => "Population","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "location","label" => "Location","type" => "location","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['consultation','proposal','news','meeting','announcement','gathering'],
            'allowed_response' => ['chapter','initiative_group','referendum_group'],
            'is_root' => false,
            'sort_order' => 3,
            'created' => '',
        ],


        // ==========================================================
        // SUBGROUPS
        // ==========================================================

        // Working Group
        [
            'family' => 'collective',
            'group_type' => 'working_group',
            'icon' => 'UsersCog',
            'label' => 'Working Group',
            'description' => 'A collaborative subgroup inside any collective.',
            'fields' => [
                ["key" => "parent_id", "label" => "Parent ID","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "scope", "label" => "Scope","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "public", "label" => "Public","type" => "boolean","required" => false,"default" => true,"rules" => []],
            ],

            'allowed_inquiry_types' => ['deliberation','proposal','consultation'],
            'allowed_response' => ['chapter','delib_block'],
            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

        // Commission
        [
            'family' => 'collective',
            'group_type' => 'commission',
            'icon' => 'GitBranch',
            'label' => 'Commission',
            'fields' => [
                ["key" => "mandate", "label" => "Mandate","type" => "text","required" => false,"default" => null,"rules" => []],
                ["key" => "jury_size", "label" => "Jury Size","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "selection_method", "label" => "Selection Method","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "scope","label" => "Scope","type" => "string","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['deliberation','proposal','official'],
            'allowed_response' => ['chapter','delib_block'],
            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

        // Chapter
        [
            'family' => 'collective',
            'group_type' => 'chapter',
            'icon' => 'BookOpen',
            'label' => 'Chapter',
            'description' => 'A structural content container.',
            'fields' => [
                ["key" => "order", "label" => "Order","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "subtitle", "label" => "Subtitle","type" => "string","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['assembly','consultation','deliberation','proposal','law_proposal','amendment'],
            'allowed_response' => ['bundle'],
            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

        // Deliberation Block
        [
            'family' => 'collective',
            'group_type' => 'delib_block',
            'icon' => 'MessageSquare',
            'label' => 'Deliberation Block',
            'description' => 'A block grouping multiple deliberations.',
            'fields' => [
                ["key" => "deadline", "label" => "Deadline","type" => "datetime","required" => false,"default" => null,"rules" => []],
                ["key" => "quorum", "label" => "Quorum","type" => "integer","required" => false,"default" => null,"rules" => []],
                ["key" => "max_items", "label" => "Max Items","type" => "integer","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['deliberation'],
            'allowed_response' => [],
            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

        // Consultation Set
        [
            'family' => 'collective',
            'group_type' => 'consultation_set',
            'icon' => 'CalendarMultiselect',
            'label' => 'Consultation Set',
            'description' => 'A set of thematic consultations.',
            'fields' => [
                ["key" => "theme", "label" => "Theme","type" => "string","required" => false,"default" => null,"rules" => []],
                ["key" => "target_audience", "label" => "Target Audience","type" => "string","required" => false,"default" => null,"rules" => []],
            ],

            'allowed_inquiry_types' => ['consultation'],
            'allowed_response' => [],
            'is_root' => false,
            'sort_order' => 1,
            'created' => '',
        ],

    ];


    private array $inquiryStatuses = [

        // ----------------------
        // DELIBERATIVE FAMILY
        // ----------------------
        'proposal' => [
            ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The proposal is being reviewed.',              'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'need_revised',       'label' => 'Need Revised',       'description' => 'The proposal requires changes.',               'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 2],
            ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The proposal was not accepted.',               'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
            ['status_key' => 'collecting_support', 'label' => 'Collecting Support', 'description' => 'The proposal is open for support.',             'is_final' => false, 'icon' => 'Offer',       'sort_order' => 4],
            ['status_key' => 'quorum_reached',     'label' => 'Quorum Reached',     'description' => 'The proposal reached required support.',       'is_final' => true,  'icon' => 'Check',       'sort_order' => 5],
        ],
        'petition' => [
            ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The petition is under review.',                'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'need_revised',       'label' => 'Need Revised',       'description' => 'The petition needs improvements.',             'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 2],
            ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The petition was not accepted.',               'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
            ['status_key' => 'collecting_support', 'label' => 'Collecting Support', 'description' => 'The petition is open for signatures.',          'is_final' => false, 'icon' => 'Offer',       'sort_order' => 4],
            ['status_key' => 'quorum_reached',     'label' => 'Quorum Reached',     'description' => 'The petition reached the required signatures.', 'is_final' => true,  'icon' => 'Check',       'sort_order' => 5],
        ],
        'initiative' => [
            ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The initiative is being reviewed.',            'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'collecting_support', 'label' => 'Collecting Support', 'description' => 'The initiative is open for support.',           'is_final' => false, 'icon' => 'Offer',       'sort_order' => 2],
            ['status_key' => 'quorum_reached',     'label' => 'Quorum Reached',     'description' => 'The initiative reached required support.',      'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The initiative was not accepted.',              'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 4],
        ],
        'debate' => [
            ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The debate is being prepared.',                 'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'discussion_open',  'label' => 'Discussion Open',  'description' => 'The debate is open for contributions.',          'is_final' => false, 'icon' => 'ForumOutline', 'sort_order' => 2],
            ['status_key' => 'concluded',        'label' => 'Concluded',        'description' => 'The debate has ended with conclusions.',         'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'rejected',         'label' => 'Rejected',         'description' => 'The debate was cancelled.',                      'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 4],
        ],
        'deliberation' => [
            ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The deliberation is being prepared.',            'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'in_session',       'label' => 'In Session',       'description' => 'The deliberation is currently ongoing.',          'is_final' => false, 'icon' => 'ForumOutline', 'sort_order' => 2],
            ['status_key' => 'concluded',        'label' => 'Concluded',        'description' => 'The deliberation ended with conclusions.',        'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
        ],
        'vision' => [
            ['status_key' => 'draft',            'label' => 'Draft',            'description' => 'The vision document is being drafted.',          'is_final' => false, 'icon' => 'FileOutline',  'sort_order' => 1],
            ['status_key' => 'under_review',     'label' => 'Under Review',     'description' => 'The vision is being discussed.',                 'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 2],
            ['status_key' => 'validated',        'label' => 'Validated',        'description' => 'The vision has been validated.',                 'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'archived',         'label' => 'Archived',         'description' => 'The vision has been archived.',                  'is_final' => true,  'icon' => 'Archive',     'sort_order' => 4],
        ],
        'objection' => [
            ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The objection is being reviewed.',               'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'resolved',         'label' => 'Resolved',         'description' => 'The objection was resolved.',                    'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
            ['status_key' => 'dismissed',        'label' => 'Dismissed',        'description' => 'The objection was dismissed.',                   'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
        ],
        'suggestion' => [
            ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The suggestion is under review.',                'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'integrated',       'label' => 'Integrated',       'description' => 'The suggestion has been integrated.',             'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
            ['status_key' => 'discarded',        'label' => 'Discarded',        'description' => 'The suggestion was not accepted.',                'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
        ],
        'project' => [
            ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The project is being prepared.',              'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'feasibility_review', 'label' => 'Feasibility Review', 'description' => 'The project is being checked for feasibility.','is_final' => false, 'icon' => 'EyeOutline',   'sort_order' => 2],
            ['status_key' => 'funded',             'label' => 'Funded',             'description' => 'The project has received funding.',            'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'not_funded',         'label' => 'Not Funded',         'description' => 'The project will not be financed.',            'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 4],
        ],
        'project_review' => [
            ['status_key' => 'in_progress',      'label' => 'In Progress',      'description' => 'The project review is ongoing.',                 'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'completed',        'label' => 'Completed',        'description' => 'The project review has been completed.',          'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
        ],

        // ----------------------
        // COLLECTIVE FAMILY
        // ----------------------
        'assembly' => [
            ['status_key' => 'planned',          'label' => 'Planned',          'description' => 'The assembly is planned but not started.',       'is_final' => false, 'icon' => 'Calendar',     'sort_order' => 1],
            ['status_key' => 'in_session',       'label' => 'In Session',       'description' => 'The assembly is ongoing.',                       'is_final' => false, 'icon' => 'ForumOutline', 'sort_order' => 2],
            ['status_key' => 'concluded',        'label' => 'Concluded',        'description' => 'The assembly ended with conclusions.',            'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
        ],
        'consultation' => [
            ['status_key' => 'open',             'label' => 'Open',             'description' => 'The consultation is open for contributions.',     'is_final' => false, 'icon' => 'ForumOutline', 'sort_order' => 1],
            ['status_key' => 'closed',           'label' => 'Closed',           'description' => 'The consultation has ended.',                     'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
        ],

        // ----------------------
        // LEGISLATIVE FAMILY
        // ----------------------
        'law_proposal' => [
            ['status_key' => 'draft',            'label' => 'Draft',            'description' => 'The law proposal is being drafted.',              'is_final' => false, 'icon' => 'FileOutline',  'sort_order' => 1],
            ['status_key' => 'under_review',     'label' => 'Under Review',     'description' => 'The law proposal is under discussion.',           'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 2],
            ['status_key' => 'accepted',         'label' => 'Accepted',         'description' => 'The law proposal was accepted.',                  'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'rejected',         'label' => 'Rejected',         'description' => 'The law proposal was rejected.',                  'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 4],
        ],
        'amendment' => [
            ['status_key' => 'draft',            'label' => 'Draft',            'description' => 'The amendment is being drafted.',                 'is_final' => false, 'icon' => 'FileOutline',  'sort_order' => 1],
            ['status_key' => 'under_review',     'label' => 'Under Review',     'description' => 'The amendment is under review.',                  'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 2],
            ['status_key' => 'accepted',         'label' => 'Accepted',         'description' => 'The amendment was accepted.',                     'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'rejected',         'label' => 'Rejected',         'description' => 'The amendment was rejected.',                     'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 4],
        ],
        'constitutional_workshop' => [
            ['status_key' => 'drafting',         'label' => 'Drafting',         'description' => 'The constitutional workshop is drafting text.',   'is_final' => false, 'icon' => 'FileOutline',  'sort_order' => 1],
            ['status_key' => 'reviewing',        'label' => 'Reviewing',        'description' => 'The workshop text is being reviewed.',            'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 2],
            ['status_key' => 'validated',        'label' => 'Validated',        'description' => 'The constitutional text has been validated.',     'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
        ],
        'policy_consultation' => [
            ['status_key' => 'open',             'label' => 'Open',             'description' => 'The policy consultation is open.',                'is_final' => false, 'icon' => 'ForumOutline', 'sort_order' => 1],
            ['status_key' => 'closed',           'label' => 'Closed',           'description' => 'The policy consultation is closed.',              'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
        ],
        'response' => [
            ['status_key' => 'under_review',     'label' => 'Under Review',     'description' => 'The response is being reviewed.',                 'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'accepted',         'label' => 'Accepted',         'description' => 'The response was accepted.',                      'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
            ['status_key' => 'rejected',         'label' => 'Rejected',         'description' => 'The response was rejected.',                      'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
        ],

        // ----------------------
        // ADMINISTRATIVE FAMILY
        // ----------------------
        'admin_request' => [
            ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The request is being processed.',                 'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'resolved',         'label' => 'Resolved',         'description' => 'The request was resolved.',                       'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
            ['status_key' => 'unresolved',       'label' => 'Unresolved',       'description' => 'The request could not be resolved.',              'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
        ],
        'grievance' => [
            ['status_key' => 'under_investigation',  'label' => 'Under Investigation',  'description' => 'The grievance is being investigated.',       'is_final' => false, 'icon' => 'Magnify',     'sort_order' => 1],
            ['status_key' => 'resolved_by_proposal', 'label' => 'Resolved by Proposal', 'description' => 'The grievance was resolved via proposal.',   'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
            ['status_key' => 'resolved_directly',    'label' => 'Resolved Directly',    'description' => 'The grievance was resolved directly.',       'is_final' => true,  'icon' => 'Check',       'sort_order' => 3],
            ['status_key' => 'unresolved',           'label' => 'Unresolved',           'description' => 'The grievance could not be resolved.',       'is_final' => true,  'icon' => 'AlertCircleOutline', 'sort_order' => 4],
        ],

        // ----------------------
        // SERVICE FAMILY
        // ----------------------
        'service_request' => [
            ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The service request is being processed.',         'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'resolved',         'label' => 'Resolved',         'description' => 'The service request was resolved.',               'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
            ['status_key' => 'unresolved',       'label' => 'Unresolved',       'description' => 'The service request could not be resolved.',      'is_final' => true,  'icon' => 'Cancel',      'sort_order' => 3],
        ],

        // ----------------------
        // OFFICIAL FAMILY
        // ----------------------
        'official_response' => [
            ['status_key' => 'under_review',     'label' => 'Under Review',     'description' => 'The official response is under review.',          'is_final' => false, 'icon' => 'ClockOutline', 'sort_order' => 1],
            ['status_key' => 'published',        'label' => 'Published',        'description' => 'The official response was published.',            'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
        ],
        'official_document' => [
            ['status_key' => 'draft',            'label' => 'Draft',            'description' => 'The official document is in draft.',              'is_final' => false, 'icon' => 'FileOutline',  'sort_order' => 1],
            ['status_key' => 'published',        'label' => 'Published',        'description' => 'The official document is published.',             'is_final' => true,  'icon' => 'Check',       'sort_order' => 2],
        ],
    ];


    private array $categories = [
        // 1. Ecology & Resources
        ['name' => 'Ecology & Resources', 'parent' => 0],
        ['name' => 'Biodiversity', 'parent' => 'Ecology & Resources'],
        ['name' => 'Water & Lagoon', 'parent' => 'Ecology & Resources'],
        ['name' => 'Land & Farming', 'parent' => 'Ecology & Resources'],
        ['name' => 'Energy', 'parent' => 'Ecology & Resources'],
        ['name' => 'Waste & Recycling', 'parent' => 'Ecology & Resources'],

        // 2. Planning & Development
        ['name' => 'Planning & Development', 'parent' => 0],
        ['name' => 'Housing & Urbanism', 'parent' => 'Planning & Development'],
        ['name' => 'Transport', 'parent' => 'Planning & Development'],
        ['name' => 'Public Works', 'parent' => 'Planning & Development'],
        ['name' => 'Tourism', 'parent' => 'Planning & Development'],
        ['name' => 'Local Economy', 'parent' => 'Planning & Development'],

        // 3. Health & Wellbeing
        ['name' => 'Health & Wellbeing', 'parent' => 0],
        ['name' => 'Care & Prevention', 'parent' => 'Health & Wellbeing'],
        ['name' => 'Health Access', 'parent' => 'Health & Wellbeing'],
        ['name' => 'Sports', 'parent' => 'Health & Wellbeing'],
        ['name' => 'Food & Nutrition', 'parent' => 'Health & Wellbeing'],
        ['name' => 'Healthy Environment', 'parent' => 'Health & Wellbeing'],

        // 4. Citizenship & Society
        ['name' => 'Citizenship & Society', 'parent' => 0],
        ['name' => 'Participation', 'parent' => 'Citizenship & Society'],
        ['name' => 'Associations', 'parent' => 'Citizenship & Society'],
        ['name' => 'Culture & Heritage', 'parent' => 'Citizenship & Society'],
        ['name' => 'Safety', 'parent' => 'Citizenship & Society'],
        ['name' => 'Youth & Seniors', 'parent' => 'Citizenship & Society'],

        // 5. Education & Spirituality
        ['name' => 'Education & Spirituality', 'parent' => 0],
        ['name' => 'School', 'parent' => 'Education & Spirituality'],
        ['name' => 'Training', 'parent' => 'Education & Spirituality'],
        ['name' => 'Language & Identity', 'parent' => 'Education & Spirituality'],
        ['name' => 'Spirituality', 'parent' => 'Education & Spirituality'],
        ['name' => 'Arts & Creativity', 'parent' => 'Education & Spirituality'],
    ];

    private array $locations = [
        // --- Country ---
        ['name' => 'Switzerland', 'parent' => 0],

        // --- Cantons ---
        ['name' => 'Geneva', 'parent' => 'Switzerland'],
        ['name' => 'Vaud',   'parent' => 'Switzerland'],
        ['name' => 'Bern',   'parent' => 'Switzerland'],
        ['name' => 'Zürich', 'parent' => 'Switzerland'],

        // --- Bern Districts ---
        ['name' => 'Bern-Mittelland', 'parent' => 'Bern'],

        // --- Zürich Regions ---
        ['name' => 'Winterthur District', 'parent' => 'Zürich'],
        ['name' => 'Limmattal',           'parent' => 'Zürich'],

        // --- Vaud Districts ---
        ['name' => 'Nyon District', 'parent' => 'Vaud'],

        // --- Cities / Communes (Geneva) ---
        ['name' => 'City of Geneva', 'parent' => 'Geneva'],

        // --- Cities / Communes (Vaud) ---
        ['name' => 'Nyon',      'parent' => 'Nyon District'],
        ['name' => 'Prangins',  'parent' => 'Nyon District'],

        // --- Zürich Cities ---
        ['name' => 'Winterthur', 'parent' => 'Winterthur District'],
        ['name' => 'Dietikon',   'parent' => 'Limmattal'],

        // --- Composite Locations (derived from misc table) ---
        ['name' => 'Nyon, Vaud',            'parent' => 'Nyon District'],
        ['name' => 'Winterthur, Zürich',    'parent' => 'Winterthur District'],
        ['name' => 'Limmattal, Zürich',     'parent' => 'Zürich'],
    ];


    public function __construct(IDBConnection $connection, IGroupManager $groupManager)
    {
        parent::__construct();
        $this->name = parent::NAME_PREFIX . 'db:init-default';
        $this->connection = $connection;
        $this->groupManager = $groupManager;
    }

    private function log(?IOutput $output, string $message): void
    {
        if ($output !== null) {
            $output->info($message);
        } else {
            $this->output->writeln('[InitDbDefault] ' . $message);
        }
    }


    public function runCommands(?IOutput $output = null): int
    {
        $this->log($output, 'Initializing default statuses...');


        $this->insertDefaultCategories($output);
        $this->insertDefaultLocations($output);
        $this->insertDefaultInquiryStatuses($output);
        $this->insertDefaultInquiryFamilies($output);
        $this->insertDefaultOptionFamilies($output);
        $this->insertDefaultInquiryTypes($output);
        $this->insertDefaultInquiryOptionTypes($output);
        $this->insertDefaultInquiryGroupTypes($output);
        $this->createDefaultGroups($output);
        return 0;
    }

    private function insertDefaultCategories(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default categories...');

        $inserted = [];

        foreach ($this->categories as $category) {
            $query = $this->connection->prepare('SELECT `id` FROM `*PREFIX*' . Category::TABLE . '` WHERE `name` = ?');
            $cursor = $query->execute([$category['name']]);
            $row = $cursor->fetch();

            if ($row !== false) {
                $this->log($output, 'Category already exists: ' . $category['name']);
                $inserted[$category['name']] = (int) $row['id'];
                continue;
            }

            $parentId = $category['parent'] !== 0 && isset($inserted[$category['parent']]) ? $inserted[$category['parent']] : 0;

            $insert = $this->connection->prepare('INSERT INTO `*PREFIX*' . Category::TABLE . '` (`name`, `parent_id`) VALUES (?, ?)');
            $insert->execute([$category['name'], $parentId]);

            $id = (int) $this->connection->lastInsertId('*PREFIX*' . Category::TABLE);

            $inserted[$category['name']] = $id;


            $this->log($output, 'Inserted category: ' . $category['name']);
        }
    }

    private function insertDefaultLocations(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default locations...');

        $inserted = [];

        foreach ($this->locations as $location) {
            $query = $this->connection->prepare('SELECT `id` FROM `*PREFIX*' . Location::TABLE . '` WHERE `name` = ?');
            $cursor = $query->execute([$location['name']]);
            $row = $cursor->fetch();

            if ($row !== false) {
                $this->log($output, 'Location already exists: ' . $location['name']);
                $inserted[$location['name']] = (int) $row['id'];
                continue;
            }

            $parentId = $location['parent'] !== 0 && isset($inserted[$location['parent']]) ? $inserted[$location['parent']] : 0;

            $insert = $this->connection->prepare('INSERT INTO `*PREFIX*' . Location::TABLE . '` (`name`, `parent_id`) VALUES (?, ?)');
            $insert->execute([$location['name'], $parentId]);

            $id = (int) $this->connection->lastInsertId('*PREFIX*' . Location::TABLE);
            $inserted[$location['name']] = $id;

            $this->log($output, 'Inserted location: ' . $location['name']);
        }
    }

    private function insertDefaultInquiryStatuses(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default inquiry statuses...');

        foreach ($this->inquiryStatuses as $inquiryType => $statuses) {
            foreach ($statuses as $status) {
                $query = $this->connection->prepare(
                    'SELECT `id` FROM `*PREFIX*' . InquiryStatus::TABLE . '`
                    WHERE `inquiry_type` = ? AND `status_key` = ?'
                );
                $cursor = $query->execute([$inquiryType, $status['status_key']]);
                $row = $cursor->fetch();

                if ($row !== false) {
                    $this->log($output, 'Inquiry status already exists: ' . $inquiryType . ' -> ' . $status['status_key']);
                    continue;
                }
                $insert = $this->connection->prepare(
                    'INSERT INTO `*PREFIX*' . InquiryStatus::TABLE . '` 
                    (`inquiry_type`, `status_key`, `label`, `description`, `icon`, `is_final`, `sort_order`) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)'
                );
                $insert->execute(
                    [
                    $inquiryType,
                    $status['status_key'],
                    $status['label'],
                    $status['description'],
                    $status['icon'],
                    (int) $status['is_final'],
                    $status['sort_order'],
                    ]
                );
            }
        }
    }

    //Inquiry Types
    private function insertDefaultInquiryTypes(?IOutput $output = null): void
{
    $this->log($output, 'Inserting default inquiry types...');

    $inserted = [];

    foreach ($this->inquiryTypes as $inquiryType) {
        $uniqueKey = $inquiryType['inquiry_type'];

        if (isset($inserted[$uniqueKey])) {
            $this->log($output, 'Inquiry type already processed: ' . $inquiryType['inquiry_type']);
            continue;
        }

        $tableName = '*PREFIX*' . InquiryType::TABLE;

        $query = $this->connection->prepare(
            'SELECT `id`, `family` FROM `' . $tableName . '`
            WHERE `inquiry_type` = ?'
        );

        $cursor = $query->execute([$inquiryType['inquiry_type']]);
        $row = $cursor->fetch();

        if ($row !== false) {
            $this->log($output, 'Inquiry type already exists in DB: ' . $inquiryType['inquiry_type'] . ' (family: ' . $row['family'] . ')');
            $inserted[$uniqueKey] = (int) $row['id'];
            continue;
        }

        $insert = $this->connection->prepare(
            'INSERT INTO `' . $tableName . '`
            (`inquiry_type`, `family`, `icon`, `label`, `description`, `fields`, `allowed_response`, `allowed_transformation`, `allowed_option_type`, `allow_comment`, `support_feature`, `is_root`, `created`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        $created = !empty($inquiryType['created']) ? (int)$inquiryType['created'] : time();
        $icon = !empty($inquiryType['icon']) ? $inquiryType['icon'] : '';
        $isRoot = isset($inquiryType['is_root']) && $inquiryType['is_root'] ? 1 : 0;
        $description = !empty($inquiryType['description']) ? $inquiryType['description'] : '';
        $fields = !empty($inquiryType['fields']) ? json_encode($inquiryType['fields']) : '';
        $allowedResponse = !empty($inquiryType['allowed_response']) ? json_encode($inquiryType['allowed_response']) : '';
        $allowedTransformation = !empty($inquiryType['allowed_transformation']) ? json_encode($inquiryType['allowed_transformation']) : '';
        $supportFeature = !empty($inquiryType['support_feature']) ? $inquiryType['support_feature'] : 'none';
        $allowComment = array_key_exists('allow_comment', $inquiryType) ? (int)(bool)$inquiryType['allow_comment'] : 1;
        $allowedOptionType = !empty($inquiryType['allowed_option_type']) ? json_encode($inquiryType['allowed_option_type']) : '';

        try {
            $insert->execute([
                $inquiryType['inquiry_type'],
                $inquiryType['family'],
                $icon,
                $inquiryType['label'],
                $description,
                $fields,
                $allowedResponse,
                $allowedTransformation,
                $allowedOptionType,
                $allowComment,
                $supportFeature,
                $isRoot,
                $created,
            ]);

            $id = (int)$this->connection->lastInsertId($tableName);
            $inserted[$uniqueKey] = $id;

            $this->log($output, 'Inserted inquiry type: ' . $inquiryType['inquiry_type'] . ' (family: ' . $inquiryType['family'] . ')');
        } catch (\Exception $e) {
            $this->log($output, 'ERROR inserting inquiry type ' . $inquiryType['inquiry_type'] . ': ' . $e->getMessage());
        }
    }
}
    //Option Types
    private function insertDefaultInquiryOptionTypes(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default inquiry types...');

        $inserted = [];

        foreach ($this->optionTypes as $optionType) {
            $uniqueKey = $optionType['option_type'];

            if (isset($inserted[$uniqueKey])) {
                $this->log($output, 'Inquiry option type already processed: ' . $optionType['option_type']);
                continue;
            }

            $tableName = '*PREFIX*' . InquiryOptionType::TABLE;

            $query = $this->connection->prepare(
                'SELECT `id` FROM `' . $tableName . '`
                WHERE `option_type` = ?'
            );

            $cursor = $query->execute(
                [
                $optionType['option_type'],
                ]
            );
            $row = $cursor->fetch();

            if ($row !== false) {
                   $this->log($output, 'Inquiry option already exists in DB: ' . $optionType['option_type']);
                   $inserted[$uniqueKey] = (int) $row['id'];
                   continue;
            }

            $insert = $this->connection->prepare(
                'INSERT INTO `' . $tableName . '`
                (`option_type`, `family`, `icon`, `label`, `description`, `fields`, `allowed_response`, `allow_comment`,`support_feature`,`statuses`,`use_title`,`created`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );

            $created = !empty($optionType['created']) ? (int)$optionType['created'] : time();
            $icon = !empty($optionType['icon']) ? $optionType['icon'] : '';
            $description = !empty($optionType['description']) ? $optionType['description'] : '';
            $fields = !empty($optionType['fields']) ? json_encode($optionType['fields']) : '';
            $allowedResponse = !empty($optionType['allowed_response']) ? json_encode($optionType['allowed_response']) : '';
            $statuses = !empty($optionType['statuses']) ? json_encode($optionType['statuses']) : '';
            $supportFeature = !empty($optionType['support_feature']) ? $optionType['support_feature'] : 'none';
            $allowComment = array_key_exists('allow_comment', $optionType) ? (int) (bool) $optionType['allow_comment'] : null;

            $useTitle = !empty($optionType['use_title']) ? 1 : 0;

            try {
                        $insert->execute(
                            [
                            $optionType['option_type'],
                            $optionType['family'],
                            $icon,
                            $optionType['label'],
                            $description,
                            $fields,
                            $allowedResponse,
                            $allowComment,
                            $supportFeature,
                            $statuses,
                            $useTitle,
                            $created,
                            ]
                        );

                        $id = (int) $this->connection->lastInsertId($tableName);
                        $inserted[$uniqueKey] = $id;

                        $this->log($output, 'Inserted option type: ' . $optionType['option_type'] . ' (family: ' . $optionType['family'] . ')');
            } catch (\Exception $e) {
                  $this->log($output, 'ERROR inserting option type ' . $optionType['option_type'] . ': ' . $e->getMessage());
            }
        }
    }

private function insertDefaultInquiryFamilies(?IOutput $output = null): void
{
    $this->log($output, 'Inserting default inquiry families...');

    $inserted = [];

    foreach ($this->inquiryTypeFamilies as $family) {
        if (isset($inserted[$family['family_type']])) {
            $this->log($output, 'Inquiry family already processed: ' . $family['family_type']);
            continue;
        }

        $query = $this->connection->prepare(
            'SELECT `id` FROM `*PREFIX*' . InquiryFamily::TABLE . '`
            WHERE `family_type` = ?'
        );
        $cursor = $query->execute([$family['family_type']]);
        $row = $cursor->fetch();

        if ($row !== false) {
               $this->log($output, 'Inquiry family already exists in DB: ' . $family['family_type']);
               $inserted[$family['family_type']] = (int) $row['id'];
               continue;
        }

        $insert = $this->connection->prepare(
            'INSERT INTO `*PREFIX*' . InquiryFamily::TABLE . '`
            (`family_type`, `label`, `description`, `icon`, `ui`, `rules`, `features`, `actions`, `sort_order`, `created`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        try {
            $created = !empty($family['created']) ? (int)$family['created'] : time();

            // Default values for missing fields
            $ui = !empty($family['ui']) ? json_encode($family['ui']) : '{}';
            $rules = !empty($family['rules']) ? json_encode($family['rules']) : '{}';
            $features = !empty($family['features']) ? json_encode($family['features']) : '[]';
            $actions = !empty($family['actions']) ? json_encode($family['actions']) : '[]';

            $insert->execute(
                [
                    $family['family_type'],
                    $family['label'],
                    $family['description'] ?? '',
                    $family['icon'] ?? '',
                    $ui,
                    $rules,
                    $features,
                    $actions,
                    $family['sort_order'] ?? 0,
                    $created,
                ]
            );

            $id = (int) $this->connection->lastInsertId('*PREFIX*' . InquiryFamily::TABLE);
            $inserted[$family['family_type']] = $id;

            $this->log($output, 'Inserted inquiry family: ' . $family['family_type']);
        } catch (\Exception $e) {
            $this->log($output, 'ERROR inserting inquiry family ' . $family['family_type'] . ': ' . $e->getMessage());
        }
    }
}

private function insertDefaultInquiryGroupTypes(?IOutput $output = null): void
{
    $this->log($output, 'Inserting default inquiry group types...');

    $inserted = [];

    foreach ($this->inquiryGroupTypes as $inquiryGroupType) {
        $uniqueKey = $inquiryGroupType['group_type'];

        if (isset($inserted[$uniqueKey])) {
            $this->log($output, 'Inquiry group type already processed: ' . $inquiryGroupType['group_type']);
            continue;
        }

        $tableName = '*PREFIX*' . InquiryGroupType::TABLE;

        $query = $this->connection->prepare(
            'SELECT `id` FROM `' . $tableName . '`
            WHERE `group_type` = ?'
        );

        $cursor = $query->execute([$inquiryGroupType['group_type']]);
        $row = $cursor->fetch();

        if ($row !== false) {
            $this->log($output, 'Inquiry group type already exists in DB: ' . $inquiryGroupType['group_type']);
            $inserted[$uniqueKey] = (int) $row['id'];
            continue;
        }

        $insert = $this->connection->prepare(
            'INSERT INTO `' . $tableName . '`
            (`group_type`, `family`, `icon`, `label`, `description`, `fields`, `allowed_inquiry_types`, `allowed_response`, `ui`, `rules`, `features`, `actions`, `is_root`, `sort_order`, `created`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        $icon = !empty($inquiryGroupType['icon']) ? $inquiryGroupType['icon'] : '';
        $family = !empty($inquiryGroupType['family']) ? $inquiryGroupType['family'] : '';
        $description = !empty($inquiryGroupType['description']) ? $inquiryGroupType['description'] : '';
        $fields = !empty($inquiryGroupType['fields']) ? json_encode($inquiryGroupType['fields']) : '';
        $allowedInquiryTypes = !empty($inquiryGroupType['allowed_inquiry_types']) ? json_encode($inquiryGroupType['allowed_inquiry_types']) : '';
        $allowedResponse = !empty($inquiryGroupType['allowed_response']) ? json_encode($inquiryGroupType['allowed_response']) : '';

        // Default values for missing fields
        $ui = !empty($inquiryGroupType['ui']) ? json_encode($inquiryGroupType['ui']) : '{}';
        $rules = !empty($inquiryGroupType['rules']) ? json_encode($inquiryGroupType['rules']) : '{}';
        $features = !empty($inquiryGroupType['features']) ? json_encode($inquiryGroupType['features']) : '[]';
        $actions = !empty($inquiryGroupType['actions']) ? json_encode($inquiryGroupType['actions']) : '[]';

        $isRoot = !empty($inquiryGroupType['is_root']) ? 1 : 0;
        $sortOrder = isset($inquiryGroupType['sort_order']) ? $inquiryGroupType['sort_order'] : 0;

        $created = !empty($inquiryGroupType['created']) ? (int)$inquiryGroupType['created'] : time();

        try {
            $insert->execute([
                $inquiryGroupType['group_type'],
                $family,
                $icon,
                $inquiryGroupType['label'],
                $description,
                $fields,
                $allowedInquiryTypes,
                $allowedResponse,
                $ui,
                $rules,
                $features,
                $actions,
                $isRoot,
                $sortOrder,
                $created,
            ]);

            $id = (int) $this->connection->lastInsertId($tableName);
            $inserted[$uniqueKey] = $id;

            $this->log($output, 'Inserted inquiry group type: ' . $inquiryGroupType['group_type']);
        } catch (\Exception $e) {
            $this->log($output, 'ERROR inserting inquiry group type ' . $inquiryGroupType['group_type'] . ': ' . $e->getMessage());
        }
    }
}

private function insertDefaultOptionFamilies(?IOutput $output = null): void
{
    $this->log($output, 'Inserting default option families...');

    $inserted = [];

    foreach ($this->optionTypeFamilies as $family) {
        if (isset($inserted[$family['family_type']])) {
            $this->log($output, 'Option family already processed: ' . $family['family_type']);
            continue;
        }

        $query = $this->connection->prepare(
            'SELECT `id` FROM `*PREFIX*' . OptionFamily::TABLE . '`
              WHERE `family_type` = ?'
        );
        $cursor = $query->execute([$family['family_type']]);
        $row = $cursor->fetch();

        if ($row !== false) {
            $this->log($output, 'Option family already exists in DB: ' . $family['family_type']);
              $inserted[$family['family_type']] = (int) $row['id'];
              continue;
        }

        $insert = $this->connection->prepare(
            'INSERT INTO `*PREFIX*' . OptionFamily::TABLE . '`
            (`family_type`, `label`, `description`, `icon`, `ui`, `rules`, `features`, `actions`, `sort_order`, `created`)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        try {
            $created = !empty($family['created']) ? (int)$family['created'] : time();

            // Encode JSON fields
            $ui = !empty($family['ui']) ? json_encode($family['ui']) : '{}';
            $rules = !empty($family['rules']) ? json_encode($family['rules']) : '{}';
            $features = !empty($family['features']) ? json_encode($family['features']) : '[]';
            $actions = !empty($family['actions']) ? json_encode($family['actions']) : '[]';

            $insert->execute(
                [
                    $family['family_type'],
                    $family['label'],
                    $family['description'] ?? '',
                    $family['icon'] ?? '',
                    $ui,
                    $rules,
                    $features,
                    $actions,
                    $family['sort_order'] ?? 0,
                    $created,
                ]
            );

            $id = (int) $this->connection->lastInsertId('*PREFIX*' . OptionFamily::TABLE);
            $inserted[$family['family_type']] = $id;

            $this->log($output, 'Inserted option family: ' . $family['family_type']);


        } catch (\Exception $e) {
            $this->log($output, 'ERROR inserting option family ' . $family['family_type'] . ': ' . $e->getMessage());
        }
    }

    $this->log($output, 'Finished inserting option families. Total: ' . count($inserted));
}


    private function createDefaultGroups(?IOutput $output = null): void
    {

        $this->log($output, 'Creating default Nextcloud groups...');

        $groups = ['Agora Users','Agora Moderator', 'Agora Official','Agora Legislative','Agora Group Editor'];

        foreach ($groups as $groupName) {
            $group = $this->groupManager->get($groupName);
            if ($group !== null) {
                $this->log($output, 'Group already exists: ' . $groupName);
                continue;
            }
            $this->groupManager->createGroup($groupName);
        }
    }
}
