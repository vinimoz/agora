# 📖 Agora – User Guide

## 🔹 Overview
Agora is a participatory democracy application for Nextcloud.  
It allows users to create, support, and comment on different types of contributions (*inquiries*).  
---

## 🔹 Inquiry Types
Users can create or respond with the following types of inquiries:

- **Project** → long-term initiative or plan.  
- **Proposal** → concrete suggestion, can be linked to a project.  
- **Debate** → open discussion, cannot have children.  
- **Petition** → citizen demand, cannot have children.  
- **Grievance** → complaint or issue, can be linked to a project or proposal.  
- **Suggestion** → improvement or alternative idea, can be linked to a grievance or proposal.  
- **Official Response** → response created by an *official* account, linked to a project, proposal, or grievance.  

⚠️ **Debates, petitions, suggestions, and official responses cannot have children.**  

---

## 🔹 Features
- **Create inquiries** (proposals, debates, petitions, projects, grievances, suggestions).  
- **Reply with a child inquiry** depending on the parent type.  
- **Add comments** to any inquiry.  
- **Support inquiries** (similar to voting or endorsement).  
- **Attach files** to inquiries.  
- **Archive** inquiries (visible but no longer editable).  
- **Soft delete** inquiries (hidden but not permanently erased).  

---

## 🔹 Permissions and Groups
Access and permissions are controlled by **Nextcloud groups**:

- `Agora Users` → regular users, can create and support inquiries.  
- `Agora Moderators` → can moderate content (archive, delete, update status), depending of the settings in admin configuration.  
- `Agora Officials` → can post official responses, and other rights defined in admin configuration.

📂 **Attachments**: only visible to users who belong to one of the Agora groups.  

---

## 🔹 Administration
Administrators can configure the following via the **Admin settings** panel:

- **Locations** → list of geographical locations (e.g., cities, districts).  
- **Categories** → thematic classification (e.g., environment, education, transport).  
- **Moderation statuses** → workflow states (e.g., *collecting_support*, *under_process*, *discussion_open*, *integrated*).  
- **Inquiry permissions** → define which inquiry types can reply to others.  

---

## 🔹 Usage
1. **Open Agora** from the Nextcloud app menu.  
2. **Create a new inquiry**:
   - Click *New Inquiry* and choose a type.  
   - Provide title, description, location, category.  
   - Save and publish.  
3. **Interact with existing inquiries**:
   - Add a **comment**.  
   - Add a **support**.  
   - If allowed, create a **child inquiry** (e.g., grievance on a proposal).  
4. **Attach files** (if authorized and group member).  
5. **Moderate** (moderators or officials only):
   - Change moderation status.  
   - Archive or delete inquiries.  
   - Post official responses (official accounts only).  

---

## 🔹 Practical Examples
- A **user** (`Agora User`) can create a petition to protect local reefs and receive supports.  
- A **moderator** (`Agora Moderator`) can archive an old debate or mark a grievance as under investigation.  
- An **official** (`Agora Official`) can reply to a project with an official response.  
- A **proposal** can be linked to a project (child).  
- A **grievance** can be linked to a project or proposal.  
- A **suggestion** can be linked to a grievance or proposal.  

---
