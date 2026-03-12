# Creating Custom Agora Templates with AI

This comprehensive guide explains how to create powerful custom templates for Agora that leverage all available features, using AI assistants like ChatGPT, Claude, Gemini, or local LLMs.

## Quick Start

1. **Download the schema**: Get the `agora-template-schema.json` file
2. **Choose your AI**: Use ChatGPT, Claude, Gemini, or a local LLM
3. **Generate your template**: Use the prompts below with your requirements
4. **Upload and test**: Import the generated JSON template via the Template Wizard

---

## Table of Contents

1. [Full Capabilities Overview](#full-capabilities-overview)
2. [AI Prompt Templates](#ai-prompt-templates)
3. [Inquiry Families](#inquiry-families)
4. [Inquiry Types and Hierarchies](#inquiry-types-and-hierarchies)
5. [Advanced Field Schemas](#advanced-field-schemas)
6. [Option Types](#option-types)
7. [Inquiry Group Types](#inquiry-group-types)
8. [Hierarchical Categories](#hierarchical-categories)
9. [Hierarchical Locations](#hierarchical-locations)
10. [Complex Workflows](#complex-workflows)
11. [Voting and Poll Configuration](#voting-and-poll-configuration)
12. [Status Workflows](#status-workflows)
13. [Multi-Language Best Practices](#multi-language-best-practices)
14. [Complete Examples](#complete-examples)
15. [Troubleshooting](#troubleshooting)
16. [Available Icons](#available-icons)

---

## 1. Full Capabilities Overview

Agora supports a comprehensive set of features for participatory democracy and organizational decision-making:

### Inquiry Families (7 Built-in)
- **deliberative**: Citizen-driven processes (debates, proposals, petitions, deliberations)
- **legislative**: Law proposals, amendments, constitutional workshops
- **administrative**: Administrative requests and grievances
- **service**: Social and citizen service requests
- **collective**: Assemblies, consultations, grouped processes
- **social**: Social support requests (housing, childcare, scholarships)
- **official**: Official responses from authorities

### 30+ Inquiry Types Available
See [Section 4](#inquiry-types-and-hierarchies) for the complete list.

### Advanced Features
- **Voting Systems**: Simple, majority judgment, Condorcet, approval, ranked choice
- **Quorum & Signatures**: Signature collection for initiatives and petitions
- **Hierarchical Structures**: Multi-level categories and geographic locations
- **Complex Workflows**: Inquiry transformations and response chains
- **Field Schemas**: Custom fields for each inquiry type
- **Multi-language**: Support for en, fr, de, gsw, and more

---

## 2. AI Prompt Templates

### Basic Template Prompt

```
I need to create a custom Agora template following the JSON schema provided.

[Paste the contents of agora-template-schema.json here]

Use case: [DESCRIBE YOUR USE CASE]

Requirements:
- Category: [e.g., "citizen_participation", "enterprise_it", "education"]
- Languages: ["en", "fr", "de", "gsw"]
- Inquiry families: [List families to use]
- Inquiry types: [List types needed]
- Status workflows: [Describe lifecycle for each type]
- Categories: [List categories]
- Locations: [List locations if applicable]

Generate a complete, valid JSON template.
```

### Comprehensive Template Prompt

```
Create a comprehensive Agora template that leverages all available features.

[Paste the agora-template-schema.json]

Use case: [DESCRIBE USE CASE]

Include:
1. All 7 inquiry families
2. At least 15 inquiry types covering:
   - Legislative processes (law_proposal, amendment, constitutional_workshop)
   - Deliberative processes (proposal, petition, initiative, deliberation, objection, suggestion)
   - Collective processes (assembly, consultation, poll)
   - Administrative processes (admin_request, grievance)
   - Service processes (service_request)
3. Complete status workflows for each inquiry type (5-7 statuses each)
4. Option types for debates and law proposals
5. Inquiry group types including hierarchical structures
6. Hierarchical categories (5 main categories with 3-5 subcategories each)
7. Hierarchical locations (country → regions → cities)
8. Advanced field schemas including:
   - Quorum and signature fields
   - Voting configuration (type_of_vote, poll_method, tie_break_rule)
   - Timeline fields (support_start, support_end, deadline)
   - Facilitator and participant fields
   - Custom form schemas
9. Complex workflow configurations (allowed_response, allowed_transformation)
10. All labels and descriptions in 4 languages: en, fr, de, gsw

Generate a production-ready comprehensive template.
```

### Specialized Domain Prompt

```
Create a specialized Agora template for [DOMAIN: e.g., "Swiss Democratic Processes"].

[Paste schema]

Requirements:
- Focus on [SPECIFIC FEATURES: e.g., "referendum and initiative processes"]
- Include referendum_group and initiative_group types
- Add Swiss territorial hierarchy: Switzerland → Cantons → Districts → Communes
- Configure voting systems: simple majority, qualified majority, double majority
- Set up signature collection workflows with quorums
- Create binding vs. consultative referendum types
- Languages: en, fr, de, gsw (Swiss German)

Generate specialized template optimized for this domain.
```

---

## 3. Inquiry Families

Families group related inquiry types. You can use built-in families or create custom ones.

### Built-in Families

```json
{
  "inquiry_families": [
    {
      "family_type": "deliberative",
      "label": {
        "en": "Deliberative",
        "fr": "Délibératif",
        "de": "Beratend",
        "gsw": "Berotend"
      },
      "description": {
        "en": "Citizen-driven processes such as debates, proposals, petitions, projects, and deliberations.",
        "fr": "Processus citoyens tels que débats, propositions, pétitions, projets et délibérations.",
        "de": "Bürgergetriebene Prozesse wie Debatten, Vorschläge, Petitionen, Projekte und Beratungen.",
        "gsw": "Bürger-tribeeni Prozäss wie Debatte, Vorschläg, Petitione, Projäkt und Berotige"
      },
      "icon": "AccountGroup",
      "sort_order": 1
    }
  ]
}
```

### Custom Families

You can create domain-specific families:

```json
{
  "family_type": "research",
  "label": {
    "en": "Research",
    "de": "Forschung"
  },
  "description": {
    "en": "Research proposals and academic collaboration",
    "de": "Forschungsvorschläge und akademische Zusammenarbeit"
  },
  "icon": "Microscope",
  "sort_order": 1
}
```

---

## 4. Inquiry Types and Hierarchies

Agora supports 30+ inquiry types. Types can be **root** (user-initiated) or **response** types (replies to other inquiries).

### Complete List of Available Inquiry Types

#### Legislative Family
- **law_proposal**: Draft or amendment of a law
- **amendment**: Amendment to a specific article
- **constitutional_workshop**: Constitutional text drafting
- **policy_consultation**: Policy consultation with impact assessment

#### Deliberative Family
- **proposal**: Citizen proposal for improvement
- **petition**: Petition requiring signatures
- **initiative**: Citizen initiative with signature threshold
- **vision**: Long-term strategic vision/roadmap
- **deliberation**: Structured deliberative process
- **debate**: Structured debate with pro/con arguments
- **objection**: Objection to another inquiry (response type)
- **suggestion**: Suggestion to resolve objections (response type)
- **project**: Project proposal with feasibility review
- **project_review**: Review of completed projects
- **hearing**: Public hearing or consultation session

#### Collective Family
- **assembly**: Citizen assembly or gathering
- **consultation**: Public consultation process
- **poll**: Voting/polling mechanism
- **news**: News announcement
- **announcement**: Official announcement
- **bulletin**: Regular bulletin/newsletter
- **meeting**: Meeting or session
- **gathering**: Community gathering
- **conference**: Conference or summit
- **citizen_jury_recommendation**: Recommendation from citizen jury

#### Administrative Family
- **admin_request**: Administrative request to authorities
- **grievance**: Formal complaint or grievance

#### Service Family
- **service_request**: General service request
- **scholarship_request**: Scholarship application
- **childcare_request**: Childcare assistance request
- **housing_request**: Housing support request

#### Official Family
- **official**: Official response from authorities (response type)
- **official_response**: Formal official response
- **official_document**: Official document publication

### Root vs. Response Types

**Root types** (`is_root: true`): Can be created directly by users
- proposal, petition, initiative, law_proposal, debate, assembly, etc.

**Response types** (`is_root: false`): Created in response to other inquiries
- objection, suggestion, official, amendment

### Example with Hierarchy

```json
{
  "inquiry_types": [
    {
      "inquiry_type": "proposal",
      "family": "deliberative",
      "is_root": true,
      "allowed_response": ["objection", "suggestion", "official"],
      "allowed_transformation": ["law_proposal"]
    },
    {
      "inquiry_type": "objection",
      "family": "deliberative",
      "is_root": false,
      "allowed_response": ["suggestion"]
    }
  ]
}
```

This creates a workflow: **Proposal → Objection → Suggestion**

---

## 5. Advanced Field Schemas

Each inquiry type can have custom fields defined in a `fields` array. This enables complex workflows like signature collection, voting, and deadline management.

### Available Field Types

- **string**: Short text (max 255 characters)
- **text**: Long text
- **integer**: Whole numbers
- **float**: Decimal numbers
- **boolean**: True/false
- **datetime**: Date and time
- **date**: Date only
- **enum**: Predefined list of values
- **json**: Complex structured data
- **users**: User/facilitator selection
- **groups**: Group selection
- **location**: Geographic location
- **list**: Array of values

### Common Field Patterns

#### Signature Collection Fields
```json
{
  "fields": [
    {
      "key": "quorum",
      "label": "Required Signatures",
      "type": "integer",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "required_signatures",
      "label": "Signature Threshold",
      "type": "integer",
      "required": true,
      "default": null,
      "rules": []
    },
    {
      "key": "collection_deadline",
      "label": "Collection Deadline",
      "type": "datetime",
      "required": false,
      "default": null,
      "rules": []
    }
  ]
}
```

#### Voting Configuration Fields
```json
{
  "fields": [
    {
      "key": "type_of_vote",
      "label": "Type of Vote",
      "type": "enum",
      "required": false,
      "default": "simple",
      "allowed_values": [
        "simple",
        "majority_judgement_beneficial",
        "majority_judgement_number",
        "condorcet",
        "approval",
        "nauru"
      ],
      "rules": []
    },
    {
      "key": "poll_method",
      "label": "Poll Method",
      "type": "enum",
      "required": false,
      "default": "standard",
      "allowed_values": ["standard", "ranked_choice", "score", "approval"],
      "rules": []
    },
    {
      "key": "tie_break_rule",
      "label": "Tie Break Rule",
      "type": "enum",
      "required": false,
      "default": "none",
      "allowed_values": ["none", "random", "oldest", "moderator_decides"],
      "rules": []
    },
    {
      "key": "allow_multiple_choices",
      "label": "Allow Multiple Choices",
      "type": "boolean",
      "required": false,
      "default": false,
      "rules": []
    }
  ]
}
```

#### Timeline Fields
```json
{
  "fields": [
    {
      "key": "support_start",
      "label": "Support Period Start",
      "type": "datetime",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "support_end",
      "label": "Support Period End",
      "type": "datetime",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "voting_start",
      "label": "Voting Start",
      "type": "datetime",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "voting_end",
      "label": "Voting End",
      "type": "datetime",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "deadline",
      "label": "Final Deadline",
      "type": "datetime",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "auto_reminder",
      "label": "Auto Reminder",
      "type": "boolean",
      "required": true,
      "default": true,
      "rules": []
    }
  ]
}
```

#### Facilitator and Participant Fields
```json
{
  "fields": [
    {
      "key": "facilitator_id",
      "label": "Facilitator",
      "type": "users",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "co_owners",
      "label": "Co-owners",
      "type": "string",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "participants_list",
      "label": "Participants",
      "type": "users",
      "required": false,
      "default": null,
      "rules": []
    },
    {
      "key": "sponsor_ids",
      "label": "Sponsors",
      "type": "users",
      "required": false,
      "default": null,
      "rules": []
    }
  ]
}
```

#### Display Configuration Fields
```json
{
  "fields": [
    {
      "key": "layout_zone",
      "label": "Layout Position",
      "type": "enum",
      "required": false,
      "default": "main",
      "allowed_values": ["sidebar", "main", "footer", "header"],
      "rules": []
    },
    {
      "key": "render_mode",
      "label": "Render Mode",
      "type": "enum",
      "required": false,
      "default": "rich_html",
      "allowed_values": ["cards", "list", "full", "summary", "rich_html"],
      "rules": []
    },
    {
      "key": "open_mode",
      "label": "Open Mode",
      "type": "enum",
      "required": false,
      "default": "page",
      "allowed_values": ["page", "modal", "popup"],
      "rules": []
    },
    {
      "key": "allow_anonymous",
      "label": "Allow Anonymous Feedback",
      "type": "boolean",
      "required": false,
      "default": false,
      "rules": []
    }
  ]
}
```

**Note on render_mode**: The default value should be `"rich_html"` to enable the full-featured TipTap rich text editor for inquiry descriptions. This provides users with formatting capabilities including:
- Bold, italic, underline, strikethrough
- Headings (H1, H2, H3)
- Bullet lists, numbered lists, task lists
- Text alignment
- Blockquotes and code blocks
- Links and images with alignment
- Tables
- Word document import
- AI-assisted content generation

**Note on allow_anonymous**: When set to `true`, users can submit feedback anonymously. This is useful for sensitive topics like HR feedback, student evaluations, or whistleblower scenarios.

#### Custom Form Schema
```json
{
  "fields": [
    {
      "key": "form_schema",
      "label": "Custom Form Schema",
      "type": "json",
      "required": false,
      "default": null,
      "rules": []
    }
  ]
}
```

### Multi-Language Field Labels

Field definitions within inquiry types can include multi-language labels, just like other translatable content. The template import system recursively extracts the selected language from all nested structures, including field labels.

**Example with multi-language field labels:**
```json
{
  "inquiry_type": "proposal",
  "fields": [
    {
      "key": "priority",
      "label": {
        "en": "Priority Level",
        "fr": "Niveau de priorité",
        "de": "Prioritätsstufe",
        "gsw": "Prioritäts-Stufe"
      },
      "type": "enum",
      "required": true,
      "default": "normal",
      "allowed_values": ["low", "normal", "high", "critical"]
    },
    {
      "key": "department",
      "label": {
        "en": "Department",
        "fr": "Département",
        "de": "Abteilung",
        "gsw": "Abteilig"
      },
      "type": "string",
      "required": false,
      "default": null
    }
  ]
}
```

**Simplified format (English only):**
```json
{
  "fields": [
    {"key": "priority", "label": "Priority Level", "type": "enum", "required": true, "default": "normal", "allowed_values": ["low", "normal", "high", "critical"]}
  ]
}
```

Both formats are supported. When a multi-language object is detected, the system extracts the selected language (with fallback to English, then first available).

### Localized Enum Values

For user-facing enum fields (e.g., priority selectors, category dropdowns), you can provide localized labels for each enum option. This ensures users see translated labels instead of raw identifiers like `"low"` or `"critical"`.

**Simple enum (technical values, not user-facing):**
```json
{
  "key": "layout_zone",
  "type": "enum",
  "allowed_values": ["sidebar", "main", "footer", "header"]
}
```

**Localized enum (user-facing values):**
```json
{
  "key": "priority",
  "label": {
    "en": "Priority",
    "de": "Priorität"
  },
  "type": "enum",
  "required": true,
  "default": "low",
  "allowed_values": [
    {"value": "low", "label": {"en": "Low", "de": "Niedrig", "fr": "Basse"}},
    {"value": "medium", "label": {"en": "Medium", "de": "Mittel", "fr": "Moyenne"}},
    {"value": "high", "label": {"en": "High", "de": "Hoch", "fr": "Haute"}},
    {"value": "critical", "label": {"en": "Critical", "de": "Kritisch", "fr": "Critique"}}
  ]
}
```

**How it works:**
- The `value` field is stored as the internal identifier (used in database/code)
- The `label` field is displayed to users in their selected language
- The system falls back to English, then first available translation

**When to use localized enums:**
- Priority selectors (low, medium, high, critical)
- Status types (pending, approved, rejected)
- Category types (public, internal, confidential)
- Any dropdown where end-users see and select values

**When to keep simple enums:**
- Technical configuration options (render_mode, layout_zone, open_mode)
- System identifiers that only administrators configure

### Standard Fields (Required for All Inquiry Types)

Every inquiry type should include these standard fields at the end of the `fields` array to ensure consistent behavior across the application:

```json
{
  "fields": [
    // ... domain-specific fields first ...

    // Standard fields (always include these):
    {"key": "layout_zone", "label": "Layout Zone", "type": "enum", "required": false, "default": "main", "allowed_values": ["sidebar", "main", "footer", "header"], "rules": []},
    {"key": "render_mode", "label": "Render Mode", "type": "enum", "required": false, "default": "rich_html", "allowed_values": ["cards", "list", "full", "summary", "rich_html"], "rules": []},
    {"key": "open_mode", "label": "Open Mode", "type": "enum", "required": false, "default": "page", "allowed_values": ["page", "modal", "popup"], "rules": []},
    {"key": "allow_anonymous", "label": "Allow Anonymous Feedback", "type": "boolean", "required": false, "default": false, "rules": []}
  ]
}
```

**Why these fields are important:**
- `layout_zone`: Controls where responses appear in the UI layout
- `render_mode`: **Must default to `rich_html`** to enable the TipTap rich text editor
- `open_mode`: Controls how inquiry details are displayed (full page, modal, or popup)
- `allow_anonymous`: Enables anonymous feedback for sensitive use cases

### Complete Example: Law Proposal

```json
{
  "inquiry_type": "law_proposal",
  "family": "legislative",
  "icon": "BookOpenVariant",
  "label": {
    "en": "Law Proposal",
    "fr": "Proposition de loi",
    "de": "Gesetzesvorschlag",
    "gsw": "Gsetzesvorschlag"
  },
  "fields": [
    {"key": "parent_law_id", "label": "Parent Law", "type": "integer", "required": false, "default": null},
    {"key": "article_map", "label": "Article Map", "type": "string", "required": false, "default": null},
    {"key": "legal_status", "label": "Legal Status", "type": "enum", "required": true, "allowed_values": ["pending", "validated", "rejected"], "default": "pending"},
    {"key": "topic", "label": "Topic", "type": "string", "required": true, "default": null},
    {"key": "form_schema", "label": "Form Schema", "type": "json", "required": false, "default": null},
    {"key": "type_of_vote", "label": "Type of Vote", "type": "enum", "required": false, "default": "simple", "allowed_values": ["simple", "majority_judgement_beneficial", "majority_judgement_number"]},
    {"key": "support_start", "label": "Support Start", "type": "datetime", "required": false, "default": null},
    {"key": "support_end", "label": "Support End", "type": "datetime", "required": false, "default": null},
    {"key": "facilitator_id", "label": "Facilitator", "type": "users", "required": false, "default": null},
    {"key": "auto_reminder", "label": "Auto Reminder", "type": "boolean", "required": true, "default": true},
    {"key": "layout_zone", "label": "Layout Zone", "type": "enum", "required": false, "default": "main", "allowed_values": ["sidebar", "main", "footer", "header"]},
    {"key": "render_mode", "label": "Render Mode", "type": "enum", "required": false, "default": "cards", "allowed_values": ["cards", "list", "full", "summary", "rich_html"]},
    {"key": "open_mode", "label": "Open Mode", "type": "enum", "required": false, "default": "page", "allowed_values": ["page", "modal", "popup"]}
  ],
  "allowed_response": ["amendment", "objection", "official"],
  "allowed_transformation": [],
  "is_root": true
}
```

---

## 6. Option Types

Option types define structured choices within inquiries (e.g., debate arguments, law articles, poll options).

### Available Option Types

#### Debate Options
```json
{
  "option_types": [
    {
      "family": "debate",
      "option_type": "debate_for",
      "icon": "ThumbUp",
      "label": {"en": "For", "de": "Dafür"},
      "description": {"en": "Argument in favor", "de": "Argument dafür"},
      "allowed_response": ["suggestion", "proposal", "official"]
    },
    {
      "family": "debate",
      "option_type": "debate_against",
      "icon": "ThumbDown",
      "label": {"en": "Against", "de": "Dagegen"},
      "description": {"en": "Argument against", "de": "Argument dagegen"},
      "allowed_response": ["suggestion", "proposal", "official"]
    },
    {
      "family": "debate",
      "option_type": "debate_choice",
      "icon": "CheckboxMultiple",
      "label": {"en": "Choice", "de": "Auswahl"},
      "description": {"en": "Selectable choice", "de": "Wählbare Option"},
      "allowed_response": []
    },
    {
      "family": "debate",
      "option_type": "debate_accepted",
      "icon": "CheckCircle",
      "label": {"en": "Accepted", "de": "Akzeptiert"},
      "description": {"en": "Accepted argument", "de": "Akzeptiertes Argument"},
      "fields": [
        {"key": "resolved_by_suggestion_id", "type": "integer", "required": false}
      ],
      "allowed_response": ["official"]
    }
  ]
}
```

#### Law Proposal Options
```json
{
  "option_types": [
    {
      "family": "law_proposal",
      "option_type": "chapter",
      "icon": "BookOpenVariant",
      "label": {"en": "Chapter", "de": "Kapitel"},
      "description": {"en": "Law chapter", "de": "Gesetzeskapitel"},
      "allowed_response": ["article", "official"]
    },
    {
      "family": "law_proposal",
      "option_type": "article",
      "icon": "FileDocument",
      "label": {"en": "Article", "de": "Artikel"},
      "description": {"en": "Law article", "de": "Gesetzesartikel"},
      "allowed_response": ["amendment", "official"]
    },
    {
      "family": "law_proposal",
      "option_type": "amendment",
      "icon": "FileDocumentEdit",
      "label": {"en": "Amendment", "de": "Änderungsantrag"},
      "description": {"en": "Article amendment", "de": "Artikeländerung"},
      "fields": [
        {"key": "article_ref", "type": "integer", "required": true}
      ],
      "allowed_response": ["official"]
    }
  ]
}
```

#### Consultation Options
```json
{
  "option_types": [
    {
      "family": "consultation",
      "option_type": "consultation_question",
      "icon": "HelpCircle",
      "label": {"en": "Question", "de": "Frage"},
      "description": {"en": "Consultation question", "de": "Konsultationsfrage"},
      "allowed_response": ["suggestion", "official"]
    },
    {
      "family": "consultation",
      "option_type": "poll_option",
      "icon": "CheckboxMarked",
      "label": {"en": "Poll Option", "de": "Abstimmungsoption"},
      "description": {"en": "Voting option", "de": "Abstimmungsoption"},
      "allowed_response": []
    },
    {
      "family": "consultation",
      "option_type": "consultation_accepted",
      "icon": "Check",
      "label": {"en": "Accepted", "de": "Akzeptiert"},
      "description": {"en": "Accepted response", "de": "Akzeptierte Antwort"},
      "allowed_response": ["official"]
    }
  ]
}
```

---

## 7. Inquiry Group Types

Group types organize multiple inquiries under a common theme, project, or territorial unit.

### Types of Groups

#### Root Collective Groups
These are top-level organizational structures:

```json
{
  "inquiry_group_types": [
    {
      "group_type": "initiative_group",
      "icon": "Flag",
      "label": {"en": "Citizens Initiative", "de": "Bürgerinitiative"},
      "description": {"en": "Citizen-driven initiative", "de": "Bürgergetriebene Initiative"},
      "fields": [
        {"key": "required_signatures", "label": "Required Signatures", "type": "integer", "required": true},
        {"key": "collection_deadline", "label": "Deadline", "type": "datetime", "required": false},
        {"key": "initiative_scope", "label": "Scope", "type": "string", "required": false},
        {"key": "sponsor_ids", "label": "Sponsors", "type": "users", "required": false}
      ],
      "allowed_inquiry_types": ["consultation", "deliberation", "proposal", "law_proposal"],
      "is_root": true,
      "sort_order": 1
    },
    {
      "group_type": "referendum_group",
      "icon": "CheckCircle",
      "label": {"en": "Referendum", "de": "Referendum"},
      "description": {"en": "Referendum process", "de": "Referendumsprozess"},
      "fields": [
        {"key": "binding", "label": "Binding", "type": "boolean", "required": false, "default": true},
        {"key": "required_turnout", "label": "Required Turnout", "type": "integer", "required": false},
        {"key": "referendum_type", "label": "Type", "type": "enum", "allowed_values": ["mandatory", "optional", "consultative"], "required": true}
      ],
      "allowed_inquiry_types": ["consultation", "deliberation", "proposal", "law_proposal"],
      "is_root": true,
      "sort_order": 2
    },
    {
      "group_type": "assembly",
      "icon": "AccountMultiple",
      "label": {"en": "Assembly", "de": "Versammlung"},
      "description": {"en": "Citizen assembly", "de": "Bürgerversammlung"},
      "is_root": true,
      "sort_order": 3
    },
    {
      "group_type": "program",
      "icon": "BookMultiple",
      "label": {"en": "Program", "de": "Programm"},
      "description": {"en": "Multi-year program", "de": "Mehrjahresprogramm"},
      "is_root": true,
      "sort_order": 4
    }
  ]
}
```

#### Territorial Hierarchy (Swiss Model)

```json
{
  "inquiry_group_types": [
    {
      "group_type": "canton",
      "icon": "MapMarker",
      "label": {"en": "Canton", "de": "Kanton", "gsw": "Kanton"},
      "description": {"en": "Swiss canton", "de": "Schweizer Kanton", "gsw": "Schwiizer Kanton"},
      "is_root": true,
      "sort_order": 10
    },
    {
      "group_type": "district",
      "icon": "MapMarkerRadius",
      "label": {"en": "District", "de": "Bezirk", "gsw": "Bezirk"},
      "description": {"en": "District within canton", "de": "Bezirk im Kanton", "gsw": "Bezirk im Kanton"},
      "is_root": false,
      "sort_order": 11
    },
    {
      "group_type": "commune",
      "icon": "HomeCity",
      "label": {"en": "Commune", "de": "Gemeinde", "gsw": "Gmei"},
      "description": {"en": "Local commune", "de": "Lokale Gemeinde", "gsw": "Lokali Gmei"},
      "is_root": false,
      "sort_order": 12
    }
  ]
}
```

#### Organizational Subgroups

```json
{
  "inquiry_group_types": [
    {
      "group_type": "working_group",
      "icon": "AccountGroup",
      "label": {"en": "Working Group", "de": "Arbeitsgruppe"},
      "description": {"en": "Specialized working group", "de": "Spezialisierte Arbeitsgruppe"},
      "is_root": false,
      "sort_order": 20
    },
    {
      "group_type": "commission",
      "icon": "Gavel",
      "label": {"en": "Commission", "de": "Kommission"},
      "description": {"en": "Official commission", "de": "Offizielle Kommission"},
      "is_root": false,
      "sort_order": 21
    },
    {
      "group_type": "citizen_jury",
      "icon": "AccountMultipleCheck",
      "label": {"en": "Citizen Jury", "de": "Bürgerjury"},
      "description": {"en": "Random citizen jury", "de": "Zufällige Bürgerjury"},
      "fields": [
        {"key": "selection_method", "label": "Selection Method", "type": "enum", "allowed_values": ["random", "stratified", "volunteer"], "required": true},
        {"key": "jury_size", "label": "Jury Size", "type": "integer", "required": true}
      ],
      "is_root": false,
      "sort_order": 22
    },
    {
      "group_type": "theme",
      "icon": "Tag",
      "label": {"en": "Theme", "de": "Thema"},
      "description": {"en": "Thematic grouping", "de": "Thematische Gruppierung"},
      "is_root": false,
      "sort_order": 30
    },
    {
      "group_type": "project",
      "icon": "FolderMultiple",
      "label": {"en": "Project", "de": "Projekt"},
      "description": {"en": "Project grouping", "de": "Projektgruppierung"},
      "is_root": false,
      "sort_order": 31
    }
  ]
}
```

---

## 8. Hierarchical Categories

Categories can be nested to create multi-level taxonomies.

### Structure

Categories use:
- `category_id`: Unique identifier (string)
- `name`: Multi-language object with category names
- `parent`: String reference to parent `category_id`, or `null` for root categories

### Example: Comprehensive Categorical System

```json
{
  "categories": [
    {
      "category_id": "ecology",
      "name": {
        "en": "Ecology & Resources",
        "fr": "Écologie & Ressources",
        "de": "Ökologie & Ressourcen",
        "gsw": "Ökologii & Ressource"
      },
      "parent": null
    },
    {
      "category_id": "biodiversity",
      "name": {
        "en": "Biodiversity",
        "fr": "Biodiversité",
        "de": "Biodiversität",
        "gsw": "Biodiversitäät"
      },
      "parent": "ecology"
    },
    {
      "category_id": "water",
      "name": {
        "en": "Water & Lagoon",
        "fr": "Eau & Lagune",
        "de": "Wasser & Lagune",
        "gsw": "Wasser & Laguune"
      },
      "parent": "ecology"
    },
    {
      "category_id": "planning",
      "name": {
        "en": "Planning & Development",
        "fr": "Planification & Développement",
        "de": "Planung & Entwicklung",
        "gsw": "Planig & Entwicklig"
      },
      "parent": null
    },
    {
      "category_id": "housing",
      "name": {
        "en": "Housing & Urbanism",
        "fr": "Logement & Urbanisme",
        "de": "Wohnen & Städtebau",
        "gsw": "Wohne & Städtebau"
      },
      "parent": "planning"
    },
    {
      "category_id": "transport",
      "name": {
        "en": "Transport",
        "fr": "Transport",
        "de": "Verkehr",
        "gsw": "Verkehr"
      },
      "parent": "planning"
    }
  ]
}
```

### Best Practices

- Use descriptive `category_id` values (lowercase, underscores)
- Limit to 3-4 levels maximum
- Keep main categories broad (5-7 main categories)
- Use 3-5 subcategories per main category
- Always include all 4 languages (en, fr, de, gsw) in `name` objects

---

## 9. Hierarchical Locations

Locations support geographic hierarchies (country → region → city).

### Structure

Locations use:
- `location_id`: Unique identifier (string)
- `name`: Multi-language object with location names
- `parent_id`: String reference to parent `location_id`, or `null` for root locations

### Example: Swiss Geographic Hierarchy

```json
{
  "locations": [
    {
      "location_id": "switzerland",
      "name": {
        "en": "Switzerland",
        "fr": "Suisse",
        "de": "Schweiz",
        "gsw": "Schwiz"
      },
      "parent_id": null
    },
    {
      "location_id": "geneva_canton",
      "name": {
        "en": "Geneva",
        "fr": "Genève",
        "de": "Genf",
        "gsw": "Gämf"
      },
      "parent_id": "switzerland"
    },
    {
      "location_id": "city_geneva",
      "name": {
        "en": "City of Geneva",
        "fr": "Ville de Genève",
        "de": "Stadt Genf",
        "gsw": "Stadt Gämf"
      },
      "parent_id": "geneva_canton"
    },
    {
      "location_id": "vaud_canton",
      "name": {
        "en": "Vaud",
        "fr": "Vaud",
        "de": "Waadt",
        "gsw": "Waadt"
      },
      "parent_id": "switzerland"
    },
    {
      "location_id": "nyon_district",
      "name": {
        "en": "Nyon District",
        "fr": "District de Nyon",
        "de": "Bezirk Nyon",
        "gsw": "Bezirk Nyon"
      },
      "parent_id": "vaud_canton"
    },
    {
      "location_id": "nyon_city",
      "name": {
        "en": "Nyon",
        "fr": "Nyon",
        "de": "Nyon",
        "gsw": "Nyon"
      },
      "parent_id": "nyon_district",
      "sort_order": 6
    }
  ]
}
```

### Adapting to Other Countries

**Germany Example:**
```
Germany → Bundesländer (States) → Landkreise (Districts) → Gemeinden (Municipalities)
```

**France Example:**
```
France → Régions (Regions) → Départements (Departments) → Communes (Communes)
```

**USA Example:**
```
United States → States → Counties → Cities
```

---

## 10. Complex Workflows

Configure inquiry relationships using `allowed_response` and `allowed_transformation`.

### Allowed Response

Defines which inquiry types can be created as responses:

```json
{
  "inquiry_type": "proposal",
  "allowed_response": ["objection", "suggestion", "official"]
}
```

This creates: **Proposal → [Objection, Suggestion, Official Response]**

### Allowed Transformation

Defines how inquiries can evolve into other types:

```json
{
  "inquiry_type": "suggestion",
  "allowed_transformation": ["proposal", "law_proposal"]
}
```

This allows: **Suggestion → transforms into → Proposal or Law Proposal**

### Complete Workflow Example

```json
{
  "inquiry_types": [
    {
      "inquiry_type": "debate",
      "is_root": true,
      "allowed_response": ["suggestion", "official"],
      "allowed_transformation": ["proposal"]
    },
    {
      "inquiry_type": "suggestion",
      "is_root": false,
      "allowed_response": null,
      "allowed_transformation": ["proposal", "law_proposal"]
    },
    {
      "inquiry_type": "proposal",
      "is_root": true,
      "allowed_response": ["objection", "suggestion", "official"],
      "allowed_transformation": ["law_proposal"]
    },
    {
      "inquiry_type": "objection",
      "is_root": false,
      "allowed_response": ["suggestion"],
      "allowed_transformation": null
    },
    {
      "inquiry_type": "law_proposal",
      "is_root": true,
      "allowed_response": ["amendment", "objection", "official"],
      "allowed_transformation": null
    },
    {
      "inquiry_type": "amendment",
      "is_root": false,
      "allowed_response": ["official"],
      "allowed_transformation": null
    }
  ]
}
```

**Workflow:**
1. **Debate** → Suggestion → transforms into → **Proposal**
2. **Proposal** → Objection → Suggestion → transforms into → **Law Proposal**
3. **Law Proposal** → Amendment → Official Response

---

## 11. Voting and Poll Configuration

Agora supports multiple voting systems configured through field schemas.

### Voting Types

Available values for `type_of_vote` field:

1. **simple**: Simple yes/no majority
2. **majority_judgement_beneficial**: Majority judgment with benefit scale
3. **majority_judgement_number**: Majority judgment with numeric scale
4. **condorcet**: Condorcet method (ranked pairs)
5. **approval**: Approval voting
6. **nauru**: Nauru/Dowdall method (weighted preferences)

### Poll Methods

Available values for `poll_method` field:

1. **standard**: Standard poll
2. **ranked_choice**: Ranked choice voting
3. **score**: Score-based voting
4. **approval**: Approval voting

### Complete Voting Configuration

```json
{
  "inquiry_type": "poll",
  "fields": [
    {
      "key": "type_of_vote",
      "label": "Voting System",
      "type": "enum",
      "required": true,
      "default": "simple",
      "allowed_values": [
        "simple",
        "majority_judgement_beneficial",
        "majority_judgement_number",
        "condorcet",
        "approval",
        "nauru"
      ]
    },
    {
      "key": "poll_method",
      "label": "Poll Method",
      "type": "enum",
      "required": false,
      "default": "standard",
      "allowed_values": ["standard", "ranked_choice", "score", "approval"]
    },
    {
      "key": "allow_multiple_choices",
      "label": "Multiple Choices",
      "type": "boolean",
      "required": false,
      "default": false
    },
    {
      "key": "tie_break_rule",
      "label": "Tie Break Rule",
      "type": "enum",
      "required": false,
      "default": "none",
      "allowed_values": ["none", "random", "oldest", "moderator_decides"]
    },
    {
      "key": "result_visibility",
      "label": "Result Visibility",
      "type": "enum",
      "required": false,
      "default": "after_vote",
      "allowed_values": ["immediate", "after_vote", "after_deadline", "never"]
    },
    {
      "key": "vote_secret",
      "label": "Secret Vote",
      "type": "boolean",
      "required": false,
      "default": true
    },
    {
      "key": "voting_start",
      "label": "Voting Start",
      "type": "datetime",
      "required": false
    },
    {
      "key": "voting_end",
      "label": "Voting End",
      "type": "datetime",
      "required": false
    }
  ]
}
```

### Support Feature Types

Set at the inquiry type level:

- **"binary"**: Yes/No voting (most common)
- **"ternary"**: Yes/No/Abstain
- **"none"**: No voting (e.g., official responses, announcements)
- **"majority_judgment"**: Majority judgment scale
- **"score"**: Numeric score voting

```json
{
  "inquiry_type": "proposal",
  "support_feature": "binary"
}
```

---

## 12. Status Workflows

Define the lifecycle of each inquiry type through status definitions.

### Status Structure

```json
{
  "inquiry_statuses": [
    {
      "inquiry_type": "proposal",
      "status_key": "draft",
      "label": {"en": "Draft", "de": "Entwurf"},
      "description": {"en": "Work in progress", "de": "In Arbeit"},
      "is_final": false,
      "icon": "FileDocumentEdit",
      "sort_order": 1
    },
    {
      "inquiry_type": "proposal",
      "status_key": "published",
      "label": {"en": "Published", "de": "Veröffentlicht"},
      "description": {"en": "Published and open", "de": "Veröffentlicht und offen"},
      "is_final": false,
      "icon": "Send",
      "sort_order": 2
    },
    {
      "inquiry_type": "proposal",
      "status_key": "accepted",
      "label": {"en": "Accepted", "de": "Akzeptiert"},
      "description": {"en": "Accepted for implementation", "de": "Zur Umsetzung angenommen"},
      "is_final": true,
      "icon": "CheckCircle",
      "sort_order": 3
    },
    {
      "inquiry_type": "proposal",
      "status_key": "rejected",
      "label": {"en": "Rejected", "de": "Abgelehnt"},
      "description": {"en": "Rejected", "de": "Abgelehnt"},
      "is_final": true,
      "icon": "CloseCircle",
      "sort_order": 4
    }
  ]
}
```

### Status Workflow Patterns

#### Simple Workflow (3 states)
```
Draft → Published → Completed
```

#### Standard Workflow (5 states)
```
Draft → Published → Under Review → Accepted/Rejected
```

#### Complex Workflow with Support Collection (7 states)
```
Draft → Published → Collecting Support → Quorum Reached/Failed → Under Review → Accepted/Rejected
```

### Complete Status Examples

#### Proposal Statuses
```json
[
  {"status_key": "draft", "is_final": false, "sort_order": 1},
  {"status_key": "published", "is_final": false, "sort_order": 2},
  {"status_key": "under_review", "is_final": false, "sort_order": 3},
  {"status_key": "collecting_support", "is_final": false, "sort_order": 4},
  {"status_key": "quorum_reached", "is_final": false, "sort_order": 5},
  {"status_key": "accepted", "is_final": true, "sort_order": 6},
  {"status_key": "rejected", "is_final": true, "sort_order": 7}
]
```

#### Petition Statuses
```json
[
  {"status_key": "draft", "is_final": false, "sort_order": 1},
  {"status_key": "published", "is_final": false, "sort_order": 2},
  {"status_key": "collecting_signatures", "is_final": false, "sort_order": 3},
  {"status_key": "signature_goal_reached", "is_final": false, "sort_order": 4},
  {"status_key": "signature_goal_failed", "is_final": true, "sort_order": 5},
  {"status_key": "submitted_to_authorities", "is_final": false, "sort_order": 6},
  {"status_key": "accepted", "is_final": true, "sort_order": 7},
  {"status_key": "rejected", "is_final": true, "sort_order": 8}
]
```

#### Law Proposal Statuses
```json
[
  {"status_key": "draft", "is_final": false, "sort_order": 1},
  {"status_key": "under_review", "is_final": false, "sort_order": 2},
  {"status_key": "committee_review", "is_final": false, "sort_order": 3},
  {"status_key": "public_consultation", "is_final": false, "sort_order": 4},
  {"status_key": "first_reading", "is_final": false, "sort_order": 5},
  {"status_key": "second_reading", "is_final": false, "sort_order": 6},
  {"status_key": "final_vote", "is_final": false, "sort_order": 7},
  {"status_key": "adopted", "is_final": true, "sort_order": 8},
  {"status_key": "rejected", "is_final": true, "sort_order": 9}
]
```

### Icons for Statuses

Common status icons:
- **Draft**: `FileDocumentEdit`, `FileOutline`
- **Published**: `Send`, `PublishOutline`
- **Under Review**: `ClockOutline`, `ClipboardText`
- **Collecting Support**: `Offer`, `HandHeart`
- **Accepted**: `CheckCircle`, `Check`
- **Rejected**: `CloseCircle`, `Cancel`
- **Completed**: `CheckAll`, `CheckCircleOutline`
- **Archived**: `Archive`, `PackageDown`

---

## 13. Multi-Language Best Practices

### Supported Languages

Agora supports any ISO 639 language codes. Common ones:
- **en**: English
- **fr**: French
- **de**: German
- **gsw**: Swiss German
- **it**: Italian
- **es**: Spanish
- **pt**: Portuguese
- **nl**: Dutch

### Translation Structure

All translatable fields must have all declared languages:

```json
{
  "available_languages": ["en", "fr", "de", "gsw"],
  "label": {
    "en": "Proposal",
    "fr": "Proposition",
    "de": "Vorschlag",
    "gsw": "Vorschlag"
  }
}
```

### Swiss German Specifics

Swiss German (gsw) has dialectal variations. General patterns:

**Common transformations:**
- "ei" → "i": Arbeit → Arbeit
- "ch" remains: Sprache → Spraach
- Diminutive "-li": Kind → Chindli
- Vowel shifts: Haus → Huus

**Key phrases:**
- Versammlung → Versammlig
- Vorschlag → Vorschlag
- Projekt → Projäkt
- Gemeinde → Gmei
- Bürger → Bürger

### Translation Tips

1. **Consistency**: Use the same term for the same concept
2. **Professional review**: Have native speakers review
3. **Context**: Provide context to translators
4. **Fallback**: System falls back to English if translation missing
5. **AI assistance**: Use AI with language context:

```
Translate this Agora template section to Swiss German (gsw):
[paste English version]

Note: This is for a citizen participation platform. Keep formal tone but accessible.
```

---

## 14. Complete Examples

### Minimal Template

```json
{
  "template_info": {
    "name": "simple_feedback",
    "version": "1.0.0",
    "description": "Simple feedback template",
    "author": "Your Name",
    "use_case": "feedback",
    "available_languages": ["en"]
  },
  "inquiry_families": [
    {
      "family_type": "feedback",
      "label": {"en": "Feedback"},
      "description": {"en": "User feedback"},
      "icon": "Comment",
      "sort_order": 1
    }
  ],
  "inquiry_types": [
    {
      "inquiry_type": "suggestion",
      "family": "feedback",
      "icon": "Lightbulb",
      "label": {"en": "Suggestion"},
      "description": {"en": "Improvement suggestion"},
      "is_root": true,
      "support_feature": "binary"
    }
  ],
  "inquiry_statuses": [
    {
      "inquiry_type": "suggestion",
      "status_key": "submitted",
      "label": {"en": "Submitted"},
      "description": {"en": "Waiting for review"},
      "is_final": false,
      "icon": "Send",
      "sort_order": 1
    },
    {
      "inquiry_type": "suggestion",
      "status_key": "completed",
      "label": {"en": "Completed"},
      "description": {"en": "Implemented"},
      "is_final": true,
      "icon": "Check",
      "sort_order": 2
    }
  ]
}
```

### See Also

For complete comprehensive examples, see the included templates:
- `advanced_citizen_participation.json` - Full-featured citizen participation
- `enterprise_it_services.json` - IT department template
- `education_research.json` - Academic research template

---

## 15. Troubleshooting

### Validation Errors

**"Missing required field"**
- Ensure all required fields in schema are present
- Check template_info section is complete

**"Invalid inquiry_type"**
- Use only lowercase, numbers, and underscores
- Make type names descriptive: "budget_proposal" not "bp"

**"Missing translations"**
- All languages in `available_languages` must have translations
- Check every label and description object

**"Invalid JSON"**
- Use jsonlint.com to validate syntax
- Check for missing commas, brackets
- Ensure proper quote escaping

### Upload Failures

**"Template already exists"**
- Change the template name in template_info
- Or delete existing template first

**"Unknown inquiry_type reference"**
- Ensure inquiry_types referenced in allowed_response exist
- Check spelling and case sensitivity

**"Circular reference"**
- Check allowed_response chains don't loop
- Example of problem: A → B → A

### Import Issues

**"Data imported but not visible"**
- Check admin permissions
- Verify user has access to inquiry families
- Check status workflow allows visibility

**"Duplicate entries"**
- System skips existing entries by design
- Use unique inquiry_type names to avoid conflicts

### AI Generation Issues

**AI produces invalid schema**
- Simplify request: start with fewer types
- Provide the schema as reference
- Ask AI to validate against schema before outputting

**Translations are inconsistent**
- Request professional translation
- Use AI with specific language instructions
- Review and edit AI output

**Too complex/overwhelming**
- Start with basic template
- Add features incrementally
- Test each addition before expanding

---

## Support and Resources

### Getting Help

- **GitHub Issues**: https://github.com/vinimoz/agora/issues
- **Documentation**: [Agora Documentation]
- **Community Forum**: [Link to forum]

### Reference Templates

Browse the Templates directory for examples:
- Basic: `default_citizen_participation.json`
- Advanced: `advanced_citizen_participation.json`
- Specialized: `enterprise_*.json`, `education_*.json`

### Schema Files

- **Template Schema**: `agora-template-schema.json`
- **This Guide**: `agora-template-instructions.md`

---

## 16. Available Icons

Agora uses Material Design Icons (MDI) for visual elements throughout templates. Icon names are specified in **PascalCase** format.

### Icon Naming Convention

- Use PascalCase: `AccountGroup`, not `account-group`
- Icons must exist in the MDI library
- Choose icons that clearly represent the concept

### Icons by Category

#### Inquiry Family Icons
| Icon | Description | Use For |
|------|-------------|---------|
| `AccountGroup` | Group of people | Deliberative, collective processes |
| `Gavel` | Judge's gavel | Legislative, legal processes |
| `OfficeBuilding` | Building | Administrative, official |
| `Offer` | Handshake | Service requests |
| `Heart` | Heart symbol | Social support |
| `Seal` | Official seal | Official responses |
| `School` | School building | Education |
| `Microscope` | Microscope | Research |
| `Monitor` | Computer monitor | IT services |
| `Hammer` | Hammer | Facility management |
| `AccountTie` | Person in tie | Human resources |

#### Inquiry Type Icons
| Icon | Description | Use For |
|------|-------------|---------|
| `LightbulbOn` | Light bulb on | Proposals, ideas |
| `Lightbulb` | Light bulb | Suggestions |
| `ClipboardText` | Clipboard with text | Petitions, requests |
| `RocketLaunch` | Rocket | Initiatives, projects |
| `Forum` | Speech bubbles | Debates, discussions |
| `AlertCircle` | Alert | Objections, warnings |
| `BookOpenVariant` | Open book | Law proposals, documents |
| `FileDocument` | Document | Amendments, reports |
| `FileDocumentEdit` | Document with pencil | Draft documents |
| `FileDocumentOutline` | Document outline | Generic documents |
| `MessageReply` | Reply message | Responses |
| `CommentText` | Comment bubble | Feedback, comments |
| `AccountMultiple` | Multiple people | Assemblies, gatherings |
| `ChartBox` | Chart | Polls, statistics |
| `ClipboardCheck` | Checked clipboard | Reviews, evaluations |
| `HelpCircle` | Question mark | Consultations, questions |
| `Bullhorn` | Megaphone | Announcements |
| `Newspaper` | Newspaper | News, bulletins |
| `CalendarClock` | Calendar with clock | Meetings, events |
| `AccountVoice` | Speaking person | Hearings |
| `Star` | Star | Vision, goals |
| `Email` | Envelope | Grievances, complaints |
| `HandHeart` | Hand with heart | Social support requests |
| `GraduationCap` | Graduation cap | Scholarships |
| `HomeGroup` | House with people | Housing requests |
| `HumanChild` | Parent with child | Childcare requests |

#### Status Icons
| Icon | Description | Use For |
|------|-------------|---------|
| `FileDocumentEdit` | Document with pencil | Draft status |
| `FileOutline` | Document outline | Draft alternative |
| `Send` | Paper plane | Published, submitted |
| `Eye` | Eye | Under review, visible |
| `ClockOutline` | Clock outline | Pending, waiting |
| `Progress` | Progress indicator | In progress |
| `CheckCircle` | Check in circle | Accepted, approved |
| `CloseCircle` | X in circle | Rejected, denied |
| `Check` | Checkmark | Completed, done |
| `CheckAll` | Double checkmark | Fully completed |
| `Cancel` | Cancel icon | Cancelled |
| `Archive` | Archive box | Archived |
| `PackageDown` | Package down | Archived alternative |
| `Offer` | Handshake | Collecting support |
| `HandHeart` | Hand with heart | Collecting signatures |
| `Flag` | Flag | Milestone reached |
| `AlertCircle` | Alert | Requires attention |
| `Lock` | Lock | Locked, closed |
| `LockOpen` | Open lock | Open, unlocked |

#### Option Type Icons
| Icon | Description | Use For |
|------|-------------|---------|
| `ThumbUp` | Thumbs up | For, support, positive |
| `ThumbDown` | Thumbs down | Against, oppose, negative |
| `CheckboxMarked` | Checked checkbox | Selected choice |
| `CheckboxMultiple` | Multiple checkboxes | Multiple choices |
| `Check` | Checkmark | Accepted option |
| `HelpCircle` | Question mark | Question options |
| `BookOpenVariant` | Open book | Chapters |
| `FileDocument` | Document | Articles |
| `FileDocumentEdit` | Document edit | Amendments |

#### Group Type Icons
| Icon | Description | Use For |
|------|-------------|---------|
| `Flag` | Flag | Initiatives |
| `CheckCircle` | Check circle | Referendums |
| `AccountMultiple` | Multiple people | Assemblies |
| `BookMultiple` | Multiple books | Programs |
| `MapMarker` | Map marker | Geographic (canton) |
| `MapMarkerRadius` | Map marker radius | Geographic (district) |
| `HomeCity` | City | Geographic (commune) |
| `AccountGroup` | Group | Working groups |
| `Gavel` | Gavel | Commissions |
| `AccountMultipleCheck` | People with check | Citizen juries |
| `Tag` | Tag | Themes |
| `FolderMultiple` | Multiple folders | Projects |

#### Domain-Specific Icons

**Education/Research:**
| Icon | Description |
|------|-------------|
| `Microscope` | Research, studies |
| `Flask` | Laboratory, experiments |
| `School` | Educational institutions |
| `BookEducation` | Educational materials |
| `GraduationCap` | Degrees, graduation |
| `Certificate` | Certifications |
| `Teach` | Teaching, instruction |

**IT/Technology:**
| Icon | Description |
|------|-------------|
| `Monitor` | Computers, screens |
| `Cog` | Settings, configuration |
| `Server` | Servers, infrastructure |
| `Security` | Security requests |
| `Database` | Data management |
| `Wifi` | Network issues |
| `LaptopAccount` | User accounts |
| `Bug` | Bug reports |
| `Wrench` | Maintenance |
| `Sync` | Updates, sync |

**Facility Management:**
| Icon | Description |
|------|-------------|
| `OfficeBuildingCog` | Building management, facilities |
| `Hammer` | Maintenance, repairs |
| `Tools` | General maintenance, tools |
| `WrenchOutline` | Wrench, maintenance |
| `Desk` | Workspace, furniture |
| `Leaf` | Sustainability, environmental |
| `Thermometer` | HVAC, temperature |
| `Water` | Plumbing, water |
| `Fire` | Emergency, fire safety |
| `Parking` | Parking facilities |
| `CarParking` | Parking (alias) |
| `Bike` | Bicycle facilities |
| `EvStation` | Electric vehicle charging |
| `Bus` | Public transportation |
| `CarMultiple` | Fleet, vehicles |
| `Lightbulb` | Electrical, lighting |
| `Calendar` | Scheduling |

**Human Resources:**
| Icon | Description |
|------|-------------|
| `AccountTie` | HR, professional |
| `CardAccountDetails` | Personal info |
| `CalendarOff` | Leave requests |
| `ClockCheck` | Time tracking |
| `FileSign` | Contracts |
| `School` | Training |
| `AccountAlert` | Concerns, issues |
| `FileDocumentMultiple` | Documentation |
| `AccountClock` | Scheduling |

### Usage Examples

**Inquiry Family:**
```json
{
  "family_type": "deliberative",
  "icon": "AccountGroup",
  "label": {"en": "Deliberative"}
}
```

**Inquiry Type:**
```json
{
  "inquiry_type": "proposal",
  "icon": "LightbulbOn",
  "label": {"en": "Proposal"}
}
```

**Status:**
```json
{
  "status_key": "accepted",
  "icon": "CheckCircle",
  "label": {"en": "Accepted"}
}
```

**Option Type:**
```json
{
  "option_type": "debate_for",
  "icon": "ThumbUp",
  "label": {"en": "For"}
}
```

### Icon Best Practices

1. **Consistency**: Use the same icon for the same concept across the template
2. **Clarity**: Choose icons that clearly represent the action or state
3. **Familiarity**: Prefer commonly understood icons (checkmark for success, X for rejection)
4. **Hierarchy**: Use bolder icons for families, detailed icons for specific types
5. **Color context**: Icons are colored by the application based on context (status colors, family colors)

### Finding More Icons

Browse the complete Material Design Icons library:
- **Official MDI site**: https://materialdesignicons.com/
- **Search by keyword**: Type concepts like "document", "check", "user" to find related icons
- **Preview icons**: Test how icons look before adding to templates

When using icons from MDI:
1. Find the icon on materialdesignicons.com
2. Note the PascalCase name (e.g., `account-group` → `AccountGroup`)
3. Use the PascalCase version in your template

---

## Quick Reference

### Template Structure
```
template_info          (required)
inquiry_families       (required, min 1)
inquiry_types          (required, min 1)
inquiry_statuses       (required, min 1 per type)
option_types           (optional)
inquiry_group_types    (optional)
categories             (optional)
locations              (optional)
```

### Common Field Patterns
- Signature collection: `quorum`, `required_signatures`, `collection_deadline`
- Voting: `type_of_vote`, `poll_method`, `tie_break_rule`
- Timeline: `support_start`, `support_end`, `voting_start`, `voting_end`
- People: `facilitator_id`, `co_owners`, `sponsor_ids`
- Display: `layout_zone`, `render_mode` (default: `rich_html`), `open_mode`
- Privacy: `allow_anonymous` (default: `false`)

### Voting Types
- `simple`, `majority_judgement_beneficial`, `majority_judgement_number`
- `condorcet`, `approval`, `nauru`

### Support Features
- `binary`, `ternary`, `none`, `majority_judgment`, `score`

---

**Version**: 2.0.0
**Last Updated**: January 2026
**Agora Version Compatibility**: 1.7.0+
