# Agora – Complete System Documentation

## 📋 Overview

This comprehensive guide combines **user documentation**, **template configuration**, and **database initialization** for the Agora participatory democracy platform. It is designed for both **end users** and **system administrators**.

---

# 📖 Part 1: User Guide

## 🌟 Welcome to Agora

Agora is a **participatory democracy application** for Nextcloud that enables communities and organizations to **create, debate, and decide** together through structured democratic processes.

> **Core Philosophy**: Transparency, inclusion, and democratic participation for all.

---

## 🏛️ Understanding the Building Blocks

### 🔍 What is an Inquiry?

An **Inquiry** is the central element in Agora—any topic, request, proposal, or process opened by users.

| Inquiry Type | Purpose | Example |
|--------------|---------|---------|
| **Petition** | Gather citizen support | "Plant 1000 trees in the city" |
| **Proposal** | Introduce new ideas | "Create a community garden" |
| **Debate** | Structured discussion | "Should we ban single-use plastics?" |
| **Consultation** | Public feedback collection | "New park design preferences" |
| **Law Proposal** | Legislative drafting | "Amendment to housing law" |
| **Service Request** | Administrative assistance | "Request for childcare support" |

### 📦 What are Options?

**Options** are structured contributions *inside* an inquiry—they build the content and arguments.

| Option Type | Description | Visual Icon |
|-------------|-------------|-------------|
| `argument_for` | Supporting arguments | 👍 |
| `argument_against` | Opposing viewpoints | 👎 |
| `amendment` | Proposed modifications | ✏️ |
| `chapter` | Document sections | 📑 |
| `poll_option` | Selectable choices | 📊 |
| `official_summary` | Final conclusions | ✅ |

### 🗂️ What are Inquiry Groups?

**Inquiry Groups** organize multiple inquiries into hierarchical structures—perfect for complex democratic processes.

| Group Type | Use Case | Example |
|------------|----------|---------|
| **Assembly** | Citizen gatherings | Town hall meetings |
| **Referendum** | Binding votes | Constitutional referendum |
| **Program** | Multi-phase projects | 5-year urban plan |
| **Working Group** | Focused committees | Environmental task force |

---

## 👥 User Roles & Permissions

Agora uses **six specialized groups** to manage access and responsibilities:

| Group | Capabilities | Badge |
|-------|--------------|-------|
| `Agora Users` | Create inquiries, support, comment | 👤 |
| `Agora Moderator` | Approve/reject content, archive | 🛡️ |
| `Agora Official` | Post official responses, bypass moderation | 👔 |
| `Agora Legislative` | Manage law-related content | ⚖️ |
| `Agora Editor Group` | Group inquiry management | 📋 |

> **Note**: You must belong to `Agora Users` to see attached files and inquiry covers.

---

## 🚀 Getting Started

### Step 1: Access Agora
- Open Nextcloud and click the **Agora** app icon from the menu

### Step 2: Create Your First Inquiry
1. Click **"New Inquiry"** button
2. Choose your **role/group** (User, Official, etc.)
3. Fill in the required fields:
   - **Title** – Clear, concise headline
   - **Description** – Detailed explanation
   - **Category** – Thematic classification
   - **Location** – Geographic scope
4. **Optional**: Add attachments and cover image
5. Click **"Publish"**

> 💡 **Tip**: If moderation is enabled, your inquiry will appear in the "To Moderate" menu until approved.

### Step 3: Engage with the Community
- 💬 **Comment** on inquiries
- 👍 **Support** proposals you agree with
- 🔄 **Create child inquiries** (if permitted)
- 📎 **Share Ressources** share ur ressources, files, polls, collectives, etc...

---

## 🎯 Practical Examples

### Example 1: Citizen Petition
**Role**: Regular User
1. Create a **Petition** inquiry: "Install bike lanes on Main Street"
2. Add location: "Downtown district"
3. Category: "Transport & Mobility"
4. Collect **supports** from neighbors
5. After reaching threshold, an **Official** responds

### Example 2: Legislative Amendment
**Role**: Legislative Group Member
1. Create **Law Proposal** inquiry
2. Structure with **chapters** and **articles**
3. Receive **amendments** from citizens
4. Facilitate **debate** on controversial articles
5. Publish **official_summary** with final text

### Example 3: Community Consultation
**Role**: Collective Group Member
1. Create **Consultation** inquiry
2. Add **consultation_questions** as options
3. Collect public feedback
4. Analyze responses in **official_result**

---

## 🔧 Moderation System

When moderation is **enabled**, all content requires review:

### Moderator Dashboard
- 📥 **To Moderate** – Pending approvals
- ✅ **Approved** – Publicly visible
- ❌ **Rejected** – Not published
- 📦 **Archived** – Closed processes

### Moderation Actions
| Action | Effect |
|--------|--------|
| **Approve** | Makes content public |
| **Reject** | Returns to creator with feedback |
| **Archive** | Closes but preserves history |
| **Delete** | Removes permanently |

---

# 🔧 Part 2: Administrator's Configuration Guide

## 🎛️ Template Architecture

Agora's flexibility comes from its **template system**—configurable blueprints that define how inquiries behave.

### Template Components



---

## 📊 Database Structure Reference

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `agora_inquiry_types` | Defines inquiry templates | `inquiry_type`, `family`, `fields` |
| `agora_option_types` | Defines option templates | `option_type`, `family`, `statuses` |
| `agora_group_types` | Defines group templates | `group_type`, `allowed_inquiry_types` |
| `agora_inquiry_families` | Inquiry categories | `family_type`, `icon`, `sort_order` |
| `agora_option_families` | Option categories | `family_type`, `ui`, `rules` |
| `agora_statuses` | Workflow states | `inquiry_type`, `status_key`, `is_final` |

---

## ⚙️ Field Configuration

### Field Properties

| Property | Required | Description | Example |
|----------|----------|-------------|---------|
| `key` | ✅ | Unique identifier | `"support_deadline"` |
| `type` | ✅ | Data type | `"datetime"` |
| `label` | ❌ | Display name | `"Support Deadline"` |
| `required` | ❌ | Must be filled | `true` |
| `default` | ❌ | Default value | `null` |
| `allowed_values` | ❌ | Enum options | `["low","medium","high"]` |

### Allowed Field Types

| Type | Description | Use Case |
|------|-------------|----------|
| `string` | Short text | Titles, names |
| `text` | Long text | Descriptions, content |
| `enum` | Predefined list | Priority levels |
| `number` | Numeric value | Budget, count |
| `boolean` | Yes/No | Toggle options |
| `date` | Date only | Deadlines |
| `datetime` | Date and time | Meeting times |
| `location` | Geographic | Places |
| `category` | Agora categories | Classification |
| `users` | User references | Assignees |
| `groups` | Group references | Teams |
| `json` | Complex data | Form schemas |

---

## 🎨 UI Layout Configuration

Agora supports multiple **visual layouts** for different process types:

| Layout | Best For | Visual |
|--------|----------|--------|
| `tree` | Structured documents | 🌳 |
| `kanban` | Workflow tracking | 📋 |
| `paired` | Pro/Con debates | ⚖️ |
| `timeline` | Sequential processes | 📅 |
| `process` | Multi-stage workflows | 🔄 |
| `consensus` | Agreement building | 🤝 |

### Layout Configuration Example

```json
{
  "ui": {
    "layout": "tree",
    "show_toc": true,
    "collapsible_sections": true,
    "breadcrumb_navigation": true
  },
  "rules": {
    "max_depth": 5,
    "require_numeric_notation": true,
    "allow_cross_references": true
  },
  "features": [
    "version_control",
    "change_tracking",
    "commentary"
  ],
  "actions": [
    {"key": "export_pdf", "label": "Export as PDF", "icon": "FilePdf"},
    {"key": "compare_versions", "label": "Compare Versions", "icon": "Diff"}
  ]
}
🗃️ Default Data Initialization
The InitDbDefault.php command populates Agora with sensible defaults. Below is the complete structure.

1. Family Types
php
$inquiryTypeFamilies = [
    [
        'family_type' => 'deliberative',
        'label' => 'Deliberative',
        'description' => 'Citizen-driven processes such as debates, proposals, petitions, projects, and deliberations.',
        'icon' => 'AccountGroup',
        'sort_order' => 1
    ],
    [
        'family_type' => 'legislative',
        'label' => 'Legislative',
        'description' => 'Law proposals, amendments, constitutional workshops, and official legislative responses.',
        'icon' => 'Gavel',
        'sort_order' => 2
    ],
    [
        'family_type' => 'administrative',
        'label' => 'Administrative',
        'description' => 'Administrative requests and grievances addressed to institutions.',
        'icon' => 'OfficeBuilding',
        'sort_order' => 3
    ],
    [
        'family_type' => 'service',
        'label' => 'Service',
        'description' => 'Social and citizen service requests such as housing, childcare, or scholarships.',
        'icon' => 'Offer',
        'sort_order' => 4
    ],
    [
        'family_type' => 'collective',
        'label' => 'Collective',
        'description' => 'Assemblies and grouped consultations on themes or topics, could be used for submit it to polls',
        'icon' => 'AccountMultiple',
        'sort_order' => 5
    ],
    [
        'family_type' => 'social',
        'label' => 'Social',
        'description' => 'Social request by citizens to help them in their daily life',
        'icon' => 'Heart',
        'sort_order' => 6
    ],
    [
        'family_type' => 'official',
        'label' => 'Official',
        'description' => 'Responses and contributions from official entities such as city hall, experts, or commissions.',
        'icon' => 'Seal',
        'sort_order' => 7
    ]
];
2. Option Family Types
php
$optionTypeFamilies = [
    [
        'family_type' => 'debate',
        'label' => 'Debate',
        'description' => 'Debate positions, arguments, and alternatives',
        'icon' => 'Discussion',
        'ui' => [
            'layout' => 'paired',
            'show_metrics' => true,
            'thread_visualization' => 'tree'
        ],
        'rules' => [
            'require_initial_position' => true,
            'max_thread_depth' => 10,
            'min_arguments_before_summary' => 3
        ],
        'features' => [
            'argument_rating',
            'thread_collapsing',
            'consensus_indicators'
        ],
        'actions' => [
            ['key' => 'export_thread', 'label' => 'Export Debate Thread', 'icon' => 'Download'],
            ['key' => 'generate_summary', 'label' => 'Generate Summary', 'icon' => 'Summarize']
        ],
        'sort_order' => 1
    ],
    [
        'family_type' => 'structure',
        'label' => 'Structure',
        'description' => 'Structured documents with chapters and articles',
        'icon' => 'Settings',
        'ui' => [
            'layout' => 'tree',
            'show_toc' => true,
            'collapsible_sections' => true,
            'breadcrumb_navigation' => true
        ],
        'rules' => [
            'max_depth' => 5,
            'require_numeric_notation' => true,
            'allow_cross_references' => true
        ],
        'features' => [
            'version_control',
            'change_tracking',
            'commentary'
        ],
        'actions' => [
            ['key' => 'import_document', 'label' => 'Import Document', 'icon' => 'Upload'],
            ['key' => 'export_pdf', 'label' => 'Export as PDF', 'icon' => 'FilePdf'],
            ['key' => 'export_markdown', 'label' => 'Export as Markdown', 'icon' => 'Markdown']
        ],
        'sort_order' => 2
    ]
    // Additional families: consensus, decision, proposal, workflow, process
];
3. Option Types (Detailed Examples)
Workflow Family
php
[
    'family' => 'workflow',
    'option_type' => 'workflow_item',
    'icon' => 'Task',
    'label' => 'Workflow Item',
    'description' => 'Task or decision moving through workflow stages.',
    'fields' => [
        ['key' => 'priority', 'type' => 'enum', 'required' => true, 
         'allowed_values' => ['low', 'medium', 'high', 'critical']],
        ['key' => 'assigned_to', 'type' => 'users', 'required' => false],
        ['key' => 'due_date', 'type' => 'datetime', 'required' => false]
    ],
    'allowed_response' => [
        'workflow_comment',
        'workflow_blocker',
        'workflow_transition',
        'message'
    ],
    'allow_comment' => true,
    'support_feature' => 'binary',
    'statuses' => [
        'draft:Draft',
        'in_progress:Progress',
        'review:Review',
        'validated:Check',
        'rejected:Cancel'
    ],
    'use_title' => true
]
Debate Family
php
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
        'official_summary'
    ],
    'allow_comment' => true,
    'support_feature' => 'ternary',
    'statuses' => [],
    'use_title' => false
]
4. Inquiry Types (Selected Examples)
Law Proposal
php
[
    'inquiry_type' => 'law_proposal',
    'family' => 'legislative',
    'icon' => 'BookOpenVariant',
    'label' => 'Law Proposal',
    'description' => 'Draft or amendment of a law, with mapped articles and status.',
    'fields' => [
        ["key" => "parent_law_id", "label" => "Parent Law", "type" => "integer"],
        ["key" => "article_map", "label" => "Article Reference", "type" => "string"],
        ["key" => "legal_status", "label" => "Legal Status", "type" => "enum", 
         "allowed_values" => ["pending", "validated", "rejected"], "default" => "pending"],
        ["key" => "topic", "label" => "Topic", "type" => "string", "required" => true],
        ["key" => "type_of_vote", "label" => "Type of Vote", "type" => "enum",
         "allowed_values" => ["simple", "majority_judgement_beneficial", "majority_judgement_number"]],
        ["key" => "support_start", "label" => "Support Start", "type" => "datetime"],
        ["key" => "support_end", "label" => "Support End", "type" => "datetime"],
        ["key" => "facilitator_id", "label" => "Facilitator", "type" => "users"]
    ],
    'allowed_response' => ['amendment', 'objection', 'official'],
    'allowed_option_type' => [
        'article', 'chapter', 'amendment', 'official_summary',
        'process_phase', 'process_event', 'milestone'
    ],
    'allow_comment' => true,
    'support_feature' => 'binary',
    'is_root' => true
]
Poll
php
[
    'inquiry_type' => 'poll',
    'family' => 'collective',
    'icon' => 'BarChart',
    'label' => 'Poll',
    'description' => 'A specific voting process with multiple methods.',
    'fields' => [
        ["key" => "topic", "label" => "Topic", "type" => "string", "required" => true],
        ["key" => "voting_start", "label" => "Voting Start", "type" => "datetime", "required" => true],
        ["key" => "voting_end", "label" => "Voting End", "type" => "datetime", "required" => true],
        ["key" => "poll_method", "label" => "Poll Method", "type" => "enum", "required" => true,
         "allowed_values" => [
             "simple", "majority_judgement_beneficial", "majority_judgement_number",
             "condorcet", "approval", "nauru"
         ], "default" => "simple"],
        ["key" => "allow_multiple_choices", "label" => "Allow Multiple Choices", "type" => "boolean", "default" => false],
        ["key" => "tie_break_rule", "label" => "Tie Break Rule", "type" => "enum",
         "allowed_values" => ["random", "condorcet_priority", "highest_median"]],
        ["key" => "result_visibility", "label" => "Result Visibility", "type" => "enum",
         "allowed_values" => ["always", "after_close", "partial"]],
        ["key" => "vote_secret", "label" => "Secret Vote", "type" => "boolean", "default" => true]
    ],
    'allowed_response' => ['official'],
    'allowed_option_type' => ['poll_option', 'official_result'],
    'allow_comment' => false,
    'support_feature' => 'none',
    'is_root' => true
]
5. Inquiry Group Types
php
$inquiryGroupTypes = [
    // Root Collective Types
    [
        'family' => 'collective',
        'group_type' => 'assembly',
        'icon' => 'Bank',
        'label' => 'Assembly',
        'description' => 'A general citizen assembly.',
        'fields' => [
            ["key" => "quorum", "label" => "Quorum", "type" => "integer"],
            ["key" => "meeting_frequency", "label" => "Meeting Frequency", "type" => "string"],
            ["key" => "facilitator_id", "label" => "Facilitator", "type" => "users"],
            ["key" => "location", "label" => "Location", "type" => "location"]
        ],
        'allowed_inquiry_types' => ['deliberation', 'consultation', 'proposal', 'law_proposal'],
        'allowed_response' => ['canton', 'district', 'commune', 'working_group'],
        'is_root' => true,
        'sort_order' => 1
    ],
    [
        'family' => 'collective',
        'group_type' => 'referendum_group',
        'icon' => 'CheckCircle',
        'label' => 'Referendum',
        'description' => 'Organizes all processes related to referendums.',
        'fields' => [
            ["key" => "binding", "label" => "Binding", "type" => "boolean", "default" => true],
            ["key" => "required_turnout", "label" => "Required Turnout", "type" => "integer"],
            ["key" => "referendum_type", "label" => "Referendum Type", "type" => "enum",
             "allowed_values" => ["mandatory", "optional", "consultative"]]
        ],
        'allowed_inquiry_types' => ['consultation', 'deliberation', 'proposal', 'law_proposal'],
        'allowed_response' => ['chapter', 'delib_block'],
        'is_root' => true,
        'sort_order' => 2
    ],
    // Territorial Hierarchy (Swiss Model)
    [
        'family' => 'collective',
        'group_type' => 'canton',
        'icon' => 'Map',
        'label' => 'Canton',
        'description' => 'A Swiss canton level of governance.',
        'fields' => [
            ["key" => "name", "label" => "Name", "type" => "string", "required" => true],
            ["key" => "code", "label" => "Code", "type" => "string"],
            ["key" => "population", "label" => "Population", "type" => "integer"]
        ],
        'allowed_inquiry_types' => ['consultation', 'deliberation', 'proposal'],
        'allowed_response' => ['district', 'commune', 'working_group'],
        'is_root' => false,
        'sort_order' => 1
    ]
];
6. Inquiry Statuses
php
$inquiryStatuses = [
    'proposal' => [
        ['status_key' => 'under_process', 'label' => 'Under Process', 
         'description' => 'The proposal is being reviewed.', 'is_final' => false, 
         'icon' => 'ClockOutline', 'sort_order' => 1],
        ['status_key' => 'need_revised', 'label' => 'Need Revised', 
         'description' => 'The proposal requires changes.', 'is_final' => false, 
         'icon' => 'ClockOutline', 'sort_order' => 2],
        ['status_key' => 'rejected', 'label' => 'Rejected', 
         'description' => 'The proposal was not accepted.', 'is_final' => true, 
         'icon' => 'Cancel', 'sort_order' => 3],
        ['status_key' => 'collecting_support', 'label' => 'Collecting Support', 
         'description' => 'The proposal is open for support.', 'is_final' => false, 
         'icon' => 'Offer', 'sort_order' => 4],
        ['status_key' => 'quorum_reached', 'label' => 'Quorum Reached', 
         'description' => 'The proposal reached required support.', 'is_final' => true, 
         'icon' => 'Check', 'sort_order' => 5]
    ],
    'law_proposal' => [
        ['status_key' => 'draft', 'label' => 'Draft', 
         'description' => 'The law proposal is being drafted.', 'is_final' => false, 
         'icon' => 'FileOutline', 'sort_order' => 1],
        ['status_key' => 'under_review', 'label' => 'Under Review', 
         'description' => 'The law proposal is under discussion.', 'is_final' => false, 
         'icon' => 'ClockOutline', 'sort_order' => 2],
        ['status_key' => 'accepted', 'label' => 'Accepted', 
         'description' => 'The law proposal was accepted.', 'is_final' => true, 
         'icon' => 'Check', 'sort_order' => 3],
        ['status_key' => 'rejected', 'label' => 'Rejected', 
         'description' => 'The law proposal was rejected.', 'is_final' => true, 
         'icon' => 'Cancel', 'sort_order' => 4]
    ]
];
7. Categories and Locations
php
$categories = [
    // Ecology & Resources
    ['name' => 'Ecology & Resources', 'parent' => 0],
    ['name' => 'Biodiversity', 'parent' => 'Ecology & Resources'],
    ['name' => 'Water & Lagoon', 'parent' => 'Ecology & Resources'],
    ['name' => 'Energy', 'parent' => 'Ecology & Resources'],
    
    // Planning & Development
    ['name' => 'Planning & Development', 'parent' => 0],
    ['name' => 'Housing & Urbanism', 'parent' => 'Planning & Development'],
    ['name' => 'Transport', 'parent' => 'Planning & Development'],
    ['name' => 'Public Works', 'parent' => 'Planning & Development'],
    
    // Health & Wellbeing
    ['name' => 'Health & Wellbeing', 'parent' => 0],
    ['name' => 'Care & Prevention', 'parent' => 'Health & Wellbeing'],
    ['name' => 'Sports', 'parent' => 'Health & Wellbeing'],
    
    // Citizenship & Society
    ['name' => 'Citizenship & Society', 'parent' => 0],
    ['name' => 'Participation', 'parent' => 'Citizenship & Society'],
    ['name' => 'Culture & Heritage', 'parent' => 'Citizenship & Society'],
    
    // Education & Spirituality
    ['name' => 'Education & Spirituality', 'parent' => 0],
    ['name' => 'School', 'parent' => 'Education & Spirituality'],
    ['name' => 'Training', 'parent' => 'Education & Spirituality']
];

$locations = [
    // Country
    ['name' => 'Switzerland', 'parent' => 0],
    
    // Cantons
    ['name' => 'Geneva', 'parent' => 'Switzerland'],
    ['name' => 'Vaud', 'parent' => 'Switzerland'],
    ['name' => 'Bern', 'parent' => 'Switzerland'],
    ['name' => 'Zürich', 'parent' => 'Switzerland'],
    
    // Districts
    ['name' => 'Bern-Mittelland', 'parent' => 'Bern'],
    ['name' => 'Nyon District', 'parent' => 'Vaud'],
    ['name' => 'Winterthur District', 'parent' => 'Zürich'],
    
    // Cities / Communes
    ['name' => 'City of Geneva', 'parent' => 'Geneva'],
    ['name' => 'Nyon', 'parent' => 'Nyon District'],
    ['name' => 'Winterthur', 'parent' => 'Winterthur District']
];

You can as well use the template feature in Admin settings.

🚀 Running the Database Initialization
bash
# From your Nextcloud directory
php occ agora:db:init-default 

This command will:

✅ Create default categories and locations

✅ Insert inquiry families and option families

✅ Populate inquiry types, option types, and group types

✅ Add workflow statuses for all inquiry types

✅ Create required Nextcloud groups (Agora Users, Moderator, Official, etc.)

📋 Summary
Agora's flexible template system enables:

Feature	Configuration Point
Process Types	Inquiry Types + Families
Content Structure	Option Types + Statuses
Organization	Group Types + Hierarchy
Visual Layout	UI Configuration
Workflows	Transformations + Statuses
Data Collection	Custom Fields
This documentation provides everything needed to understand, use, and configure Agora for any democratic process—from simple petitions to complex legislative workflows.
