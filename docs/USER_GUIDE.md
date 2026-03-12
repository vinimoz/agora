Agora – Complete System Documentation
📋 Overview
This comprehensive guide combines user documentation, template configuration, and database initialization for the Agora participatory democracy platform. It is designed for both end users and system administrators.

📖 Part 1: User Guide
🌟 Welcome to Agora
Agora is a participatory democracy application for Nextcloud that enables communities and organizations to create, debate, and decide together through structured democratic processes.

Core Philosophy: Transparency, inclusion, and democratic participation for all.

🏛️ Understanding the Building Blocks
🔍 What is an Inquiry?
An Inquiry is the central element in Agora—any topic, request, proposal, or process opened by users.

Inquiry Type	Purpose	Example
Petition	Gather citizen support	"Plant 1000 trees in the city"
Proposal	Introduce new ideas	"Create a community garden"
Debate	Structured discussion	"Should we ban single-use plastics?"
Consultation	Public feedback collection	"New park design preferences"
Law Proposal	Legislative drafting	"Amendment to housing law"
Service Request	Administrative assistance	"Request for childcare support"
📦 What are Options?
Options are structured contributions inside an inquiry—they build the content and arguments.

Option Type	Description	Visual Icon
argument_for	Supporting arguments	👍
argument_against	Opposing viewpoints	👎
amendment	Proposed modifications	✏️
chapter	Document sections	📑
poll_option	Selectable choices	📊
official_summary	Final conclusions	✅
🗂️ What are Inquiry Groups?
Inquiry Groups organize multiple inquiries into hierarchical structures—perfect for complex democratic processes.

Group Type	Use Case	Example
Assembly	Citizen gatherings	Town hall meetings
Referendum	Binding votes	Constitutional referendum
Program	Multi-phase projects	5-year urban plan
Working Group	Focused committees	Environmental task force
👥 User Roles & Permissions
Agora uses six specialized groups to manage access and responsibilities:

Group	Capabilities	Badge
Agora Users	Create inquiries, support, comment	👤
Agora Moderator	Approve/reject content, archive	🛡️
Agora Official	Post official responses, bypass moderation	👔
Agora Legislative	Manage law-related content	⚖️
Agora Administrative	Handle service requests	📋
Agora Collective	Facilitate group processes	👥
Note: You must belong to Agora Users to see attached files and inquiry covers.

🚀 Getting Started
Step 1: Access Agora
Open Nextcloud and click the Agora app icon from the menu

Step 2: Create Your First Inquiry
Click "New Inquiry" button

Choose your role/group (User, Official, etc.)

Fill in the required fields:

Title – Clear, concise headline

Description – Detailed explanation

Category – Thematic classification

Location – Geographic scope

Optional: Add attachments and cover image

Click "Publish"

💡 Tip: If moderation is enabled, your inquiry will appear in the "To Moderate" menu until approved.

Step 3: Engage with the Community
💬 Comment on inquiries

👍 Support proposals you agree with

🔄 Create child inquiries (if permitted)

📎 Share files to strengthen arguments

🎯 Practical Examples
Example 1: Citizen Petition
Role: Regular User

Create a Petition inquiry: "Install bike lanes on Main Street"

Add location: "Downtown district"

Category: "Transport & Mobility"

Collect supports from neighbors

After reaching threshold, an Official responds

Example 2: Legislative Amendment
Role: Legislative Group Member

Create Law Proposal inquiry

Structure with chapters and articles

Receive amendments from citizens

Facilitate debate on controversial articles

Publish official_summary with final text

Example 3: Community Consultation
Role: Collective Group Member

Create Consultation inquiry

Add consultation_questions as options

Collect public feedback

Analyze responses in official_result

🔧 Moderation System
When moderation is enabled, all content requires review:

Moderator Dashboard
📥 To Moderate – Pending approvals

✅ Approved – Publicly visible

❌ Rejected – Not published

📦 Archived – Closed processes

Moderation Actions
Action	Effect
Approve	Makes content public
Reject	Returns to creator with feedback
Archive	Closes but preserves history
Delete	Removes permanently
🔧 Part 2: Administrator's Configuration Guide
🎛️ Template Architecture
Agora's flexibility comes from its template system—configurable blueprints that define how inquiries behave.

Template Components
text
INQUIRY TEMPLATE
├── Basic Properties
│   ├── inquiry_type (unique identifier)
│   ├── family (deliberative, legislative, etc.)
│   ├── icon (visual representation)
│   └── label (display name)
├── Fields (custom data)
├── Allowed Responses (child types)
├── Allowed Transformations (workflow stages)
├── Allowed Option Types (structural elements)
└── Workflow Statuses
📊 Database Structure Reference
Core Tables
Table	Purpose	Key Fields
agora_inquiry_types	Defines inquiry templates	inquiry_type, family, fields
agora_option_types	Defines option templates	option_type, family, statuses
agora_group_types	Defines group templates	group_type, allowed_inquiry_types
agora_inquiry_families	Inquiry categories	family_type, icon, sort_order
agora_option_families	Option categories	family_type, ui, rules
agora_statuses	Workflow states	inquiry_type, status_key, is_final
⚙️ Field Configuration
Field Properties
Property	Required	Description	Example
key	✅	Unique identifier	"support_deadline"
type	✅	Data type	"datetime"
label	❌	Display name	"Support Deadline"
required	❌	Must be filled	true
default	❌	Default value	null
allowed_values	❌	Enum options	["low","medium","high"]
Allowed Field Types
Type	Description	Use Case
string	Short text	Titles, names
text	Long text	Descriptions, content
enum	Predefined list	Priority levels
number	Numeric value	Budget, count
boolean	Yes/No	Toggle options
date	Date only	Deadlines
datetime	Date and time	Meeting times
location	Geographic	Places
category	Agora categories	Classification
users	User references	Assignees
groups	Group references	Teams
json	Complex data	Form schemas
🎨 UI Layout Configuration
Agora supports multiple visual layouts for different process types:

Layout	Best For	Visual
tree	Structured documents	🌳
kanban	Workflow tracking	📋
paired	Pro/Con debates	⚖️
timeline	Sequential processes	📅
process	Multi-stage workflows	🔄
consensus	Agreement building	🤝
Layout Configuration Example
json
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


