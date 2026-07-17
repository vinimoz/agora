

# Agora – User Guide (v1.7.5)

## 🌟 Welcome to Agora

Agora is a participatory democracy platform for Nextcloud. It helps communities, organizations, institutions, associations, and citizen groups **discuss, deliberate, collaborate, and make decisions together**.

More than just a discussion tool, Agora combines structured participation, voting systems, project management, consultations, petitions, and collective governance tools in a single, transparent platform.

> **Philosophy:** Transparent, structured, inclusive, and democratic collaboration.


## 📚 Table of Contents

1. [Core Concepts](#-core-concepts)

2. [Participation & Support Methods](#-participation--support-methods)

3. [Voting Methods](#-voting-methods)

4. [Views & Layouts](#-views--layouts)

5. [Getting Started](#-getting-started)

6. [Practical Examples](#-practical-examples)

7. [User Roles & Permissions](#-user-roles--permissions)

8. [Moderation System](#-moderation-system)

9. [Frequently Asked Questions](#-frequently-asked-questions)

10. [Getting Help](#-getting-help)


## 🧠 Core Concepts

Understanding these three elements is essential to using Agora effectively.

### 🔍 Inquiry (The Main Object)

An **Inquiry** is the central container of any collaborative process in Agora. Everything starts with an inquiry. It can represent a wide variety of collaborative activities.

| Type | Purpose | Example |
| - | - | - |
| **Petition** | Gather support for a cause. | "Plant 1000 trees in the city." |
| **Proposal** | Introduce a new idea or plan. | "Create a community garden on Elm Street." |
| **Debate** | Facilitate a structured discussion on a topic. | "Should we ban single-use plastics?" |
| **Consultation** | Collect public feedback on a plan. | "Provide feedback on the new park design." |
| **Project** | Organize and manage a collaborative project. | "Main Street Renovation Project." |
| **Law Proposal** | Draft and refine legislation. | "Amendment to the city housing law." |
| **Service Request** | Request assistance for an administrative task. | "Request for additional childcare support." |
| **Survey** | Gather structured, quantitative feedback. | "Annual resident satisfaction survey." |


### 🗂️ Inquiry Groups (The Organization Layer)

**Inquiry Groups** are used to organize multiple inquiries into larger, structured views. They act as folders and navigation systems for complex processes.

| Group Type | Purpose | Example |
| - | - | - |
| **Assembly** | Organize discussions for a specific council. | "City Council Discussions." |
| **Committee** | Focus on a specific thematic area. | "Environmental Committee." |
| **Working Group** | Organize a task force for a specific goal. | "2027 Budget Working Group." |
| **Referendum** | Structure a binding public vote. | "Constitutional Referendum 2030." |
| **Program** | Oversee a multi-phase, long-term project. | "The 5-Year Urban Plan." |


### 🧩 Options (The Building Blocks)

**Options** are the structured contributions and elements that live *inside* an Inquiry. They are more powerful than simple comments and form the building blocks of the final outcome.

| Option Type | Purpose | Visual Icon |
| - | - | - |
| `alternative` | Present a choice or solution. | 🗳️ |
| `argument\_for` / `argument\_against` | Present supporting or opposing viewpoints. | 👍 / 👎 |
| `amendment` | Propose a modification to a text or plan. | ✏️ |
| `task` | Represent a unit of work in a project. | ✔️ |
| `milestone` | Mark a significant event in a timeline. | 🏁 |
| `chapter` / `article` | Structure a document (e.g., a law). | 📑 |
| `poll\_option` | Represent a selectable choice in a poll. | 📊 |
| `official\_summary` | Summarize the final conclusions. | ✅ |



## 👍 Participation & Support Methods

Agora offers a variety of participation methods to suit different goals. The inquiry creator or administrator chooses the most appropriate one.

| Method | Description | Best For |
| - | - | - |
| **Binary Support** | Simple Yes/No support. | Petitions, quick consultations. |
| **Ternary Support** | Choose: For, Against, or Abstain. | Political decisions, organizational votes. |
| **Approval Support** | Approve as many options as you like. | Situations with multiple good alternatives. |
| **Majority Judgment** | Grade options (e.g., Reject to Excellent). | Evaluating proposals, ranking priorities. |
| **Score Voting** | Assign a numerical score (e.g., 0-10). | Detailed evaluations, budget prioritization. |
| **Star Rating** | Rate options using a star system (e.g., 1-5). | Feedback on ideas, services, or projects. |
| **Reactions** | React using emojis (👍, ❤️, 🎉, 🤔, 👎). | Quick feedback during discussions. |
| **Trending** | Algorithmically highlights popular content. | Surfacing active and important discussions. |
| **Discussion Only** | Only commenting is allowed. | Pure brainstorming, idea exploration. |



## 🏛 Voting Methods

When a formal decision is needed, Agora provides multiple advanced voting systems.

| Method | Description |
| - | - |
| **Approval Voting** | Participants approve all acceptable options. The one with the most approvals wins. |
| **Ranked Choice Voting** | Participants rank options in order of preference. |
| **Condorcet** | Participants rank options. The winner is the one that beats every other in a one-on-one comparison. *Supported variants: Schulze, Copeland, Minimax, Ranked Pairs, Kemeny-Young.* |
| **Borda Count** | Participants rank options. Points are assigned based on position (e.g., 1st place gets 3 points). The highest total wins. |
| **Majority Judgment** | Participants grade every option. The option with the highest median grade wins. |
| **Quadratic Voting** | Participants distribute voting credits to express preference intensity. |
| **Weighted Voting** | Votes are assigned different weights based on the voter's role, shares, or delegated power. |
| **Phased Voting** | Voting occurs in multiple rounds, with options eliminated between rounds. |



## 🎨 Views & Layouts

Agora offers different visual presentations to best suit the type of work being done.

| View | Description | Best For |
| - | - | - |
| **List View** | A simple, vertical list of options. | Discussions, petitions, consultations. |
| **Cards View** | Visual cards for each option. | Proposals, projects, alternatives. |
| **Grid View** | Compact, organized grid layout. | Browsing large collections of options. |
| **Kanban View** | Workflow management with columns (e.g., To Do, In Progress, Done). | Project management, task tracking. |
| **Timeline View** | Chronological representation of events. | Visualizing milestones, deadlines, and processes. |
| **Consensus View** | Highlights objections, reservations, and agreements. | Building consensus in collaborative governance. |
| **Tree View** | Hierarchical, nested structure. | Drafting laws, documentation, structured debates. |



## 🚀 Getting Started

### Step 1: Access Agora

1. Open your Nextcloud instance.

2. Click the **Agora** app icon from the main application menu.

### Step 2: Create Your First Inquiry

1. Click the **"New Inquiry"** button.

2. Fill in the required and optional fields:

   - **Title**: A clear, concise headline.

   - **Description**: A detailed explanation of the topic.

   - **Category**: Select a thematic classification.

   - **Location**: (Optional) Specify a geographic scope.

   - **Cover Image**: (Optional) Add a representative image.

3. Click **"Publish"**.

> 💡 **Tip**: If moderation is enabled, your inquiry will be placed in a moderation queue until approved.

### Step 3: Configure Participation

1. Choose the **Participation Method** (Binary, Ternary, Majority Judgment, etc.) that fits your goal.

2. If a vote is needed, select the appropriate **Voting Method** (Approval, Condorcet, etc.).

### Step 4: Add Options

Depending on your inquiry type, add your building blocks:

- Add **Alternatives** for a consultation.

- Add **Arguments** for a debate.

- Add **Tasks** for a project.

- Add **Chapters** for a law proposal.

### Step 5: Engage and Participate

Now that your inquiry is live, users can:

- 💬 **Comment** and reply.

- 👍 **Support** or **React** to proposals.

- 🗳️ **Vote** when the voting phase opens.

- 📎 **Share resources** (files, links).


## 🎯 Practical Examples

### Example 1: Citizen Petition

1. Create a **Petition** inquiry: "Install bike lanes on Main Street."

2. Set the participation method to **Binary Support**.

3. Share the link to gather **supports** from the community.

4. After reaching a threshold, an Official can respond.

### Example 2: Legislative Amendment

1. A Legislative Group member creates a **Law Proposal** inquiry.

2. The text is structured using the **Tree View** with **chapters** and **articles**.

3. Citizens propose **amendments**.

4. A debate is facilitated on controversial articles.

5. An **official\_summary** is published with the final, amended text.

### Example 3: Budget Prioritization

1. A committee creates a **Consultation** inquiry for "2027 Budget."

2. Options (e.g., "New Library," "Public Transport") are added.

3. The participation method is set to **Majority Judgment**.

4. Citizens grade each option.

5. Results are analyzed based on the median grades.

### Example 4: Project Management

1. A working group creates a **Project** inquiry: "Website Redesign."

2. The **Kanban View** is selected.

3. **Tasks** are added to columns like "To Do," "In Progress," and "Done."

4. This provides a transparent workflow for the team.


## 👥 User Roles & Permissions

Agora uses dedicated Nextcloud groups to manage access and responsibilities.

| Group | Capabilities | Badge |
| - | - | - |
| `Agora Users` | Create inquiries, support, comment, participate. | 👤 |
| `Agora Moderator` | Approve/reject content, archive items, manage the moderation queue. | 🛡️ |
| `Agora Official` | Post official responses, bypass moderation. | 👔 |
| `Agora Legislative` | Manage and structure law-related content. | ⚖️ |
| `Agora Editor Group` | Create and manage inquiry groups. | 📋 |


> **Note**: You must belong to the `Agora Users` group to see attached files and inquiry covers.


## 🛡 Moderation System

When moderation is **enabled**, all content requires review before becoming public.

### Moderator Dashboard

| Section | Content |
| - | - |
| 📥 **To Moderate** | All content pending review and approval. |
| ✅ **Approved** | Content that has been reviewed and made public. |
| ❌ **Rejected** | Content that was not published, with feedback. |
| 📦 **Archived** | Closed processes that are preserved for history. |


### Moderation Actions

| Action | Effect |
| - | - |
| **Approve** | Makes the content public. |
| **Reject** | Returns content to the creator with feedback. |
| **Archive** | Closes the process but preserves its history. |
| **Delete** | Removes the content permanently (use with caution). |



## ❓ Frequently Asked Questions

### Q: What is the difference between an Inquiry and an Option?

**A:** An Inquiry is the container (e.g., a petition or a debate). Options are the structured building blocks inside it (e.g., arguments, amendments, tasks, or chapters).

### Q: Can I edit my inquiry after publishing?

**A:** Yes, but depending on the platform settings, edits may be sent back to the moderation queue.

### Q: How do I know if my inquiry is approved?

**A:** You will receive a notification. You can also check its status in the "To Moderate" menu if you are a moderator.

### Q: Which voting methods are available?

**A:** Approval, Ranked Choice, Condorcet (with several variants), Borda, Majority Judgment, Quadratic, Weighted, and Phased voting. Availability depends on the administrator's configuration.

### Q: Can I create an inquiry group?

**A:** Yes, if you have the `Agora Editor Group` role.

### Q: What is the Difference Between Ternary Support and a Vote?

**A:** "Ternary Support" is a participation method for gauging sentiment (For/Against/Abstain). A formal "Vote" is a structured decision process that can use methods like Condorcet or Approval to select a final winner.


## 📞 Getting Help

- 📖 **Check the Administrator Guide** for technical and installation questions.

- 💬 **Ask your Agora Moderator** for platform-specific help and guidance.

- 🐛 **Report bugs** to your Nextcloud administrator or through the project's issue tracker.


## 🎯 Key Idea

Agora is not just a discussion tool. It is a comprehensive system designed to help communities and organizations **structure their thinking, manage their processes, and make transparent decisions together**.

