# ***Agora – Administrator Guide**

## 🧠 ***System Architecture Overview**

***Agora is a modular and configurable system based on three core layers:**


### ***1. Inquiry Types**

***Define what an inquiry is:**

- ***Petition**

- ***Proposal**

- ***Law**

- ***Consultation**

- ***Debate**

- ***Service Request**

- ***Poll**

***Configured via templates with:**

- ***Custom fields**

- ***Status workflows**

- ***UI layouts**

- ***Allowed response types**


### ***2. Option Types**

***Define what building blocks can be added inside an inquiry:**

| ***Option Type** | ***Description** |
| - | - |
| ***`argument\_for`** | ***Supporting arguments** |
| ***`argument\_against`** | ***Opposing viewpoints** |
| ***`amendment`** | ***Proposed modifications** |
| ***`chapter`** | ***Document sections** |
| ***`article`** | ***Legal articles** |
| ***`poll\_option`** | ***Selectable choices** |
| ***`official\_summary`** | ***Final conclusions** |
| ***`workflow\_item`** | ***Task in a workflow** |

***Each option type has:**

- ***Its own fields**

- ***Statuses**

- ***UI behavior**

- ***Allowed child responses**


### ***3. Group Types**

***Define how to organize inquiries:**

| ***Group Type** | ***Use Case** |
| - | - |
| ***Assembly** | ***Citizen gatherings** |
| ***Referendum** | ***Binding votes** |
| ***Working Group** | ***Focused committees** |
| ***Canton** | ***Regional governance** |
| ***District** | ***Sub-regional level** |
| ***Commune** | ***Municipal level** |

***Groups can be nested and have:**

- ***Custom fields**

- ***Allowed inquiry types**

- ***Hierarchical relationships**


## ⚙️ ***Field Configuration**

### ***Available Field Types**

| ***Type** | ***Description** | ***Example** |
| - | - | - |
| ***`string`** | ***Short text** | ***Title, name** |
| ***`text`** | ***Long text** | ***Description, content** |
| ***`enum`** | ***Predefined list** | ***Priority levels** |
| ***`number`** | ***Numeric value** | ***Budget, count** |
| ***`boolean`** | ***Yes/No** | ***Toggle options** |
| ***`date`** | ***Date only** | ***Deadlines** |
| ***`datetime`** | ***Date and time** | ***Meeting times** |
| ***`location`** | ***Geographic place** | ***Address, region** |
| ***`category`** | ***Agora categories** | ***Classification** |
| ***`users`** | ***User references** | ***Assignees** |
| ***`groups`** | ***Group references** | ***Teams** |
| ***`json`** | ***Complex data** | ***Form schemas** |

### ***Field Properties**

| ***Property** | ***Required** | ***Description** |
| - | - | - |
| ***`key`** | ✅ | ***Unique identifier** |
| ***`type`** | ✅ | ***Data type** |
| ***`label`** | ❌ | ***Display name** |
| ***`required`** | ❌ | ***Must be filled** |
| ***`default`** | ❌ | ***Default value** |
| ***`allowed\_values`** | ❌ | ***Enum options** |

### ***Field Definition Example**

***json**

```
***\{**

  ***"key": "support\_deadline",**

  ***"type": "datetime",**

  ***"label": "Support Deadline",**

  ***"required": true,**

  ***"default": null**

***\}**
```


## 🎨 ***UI Layout Configuration**

### ***Available Layouts**

| ***Layout** | ***Best For** | ***Visual** |
| - | - | - |
| ***`tree`** | ***Structured documents** | 🌳 |
| ***`kanban`** | ***Workflow tracking** | 📋 |
| ***`paired`** | ***Pro/Con debates** | ⚖️ |
| ***`timeline`** | ***Sequential processes** | 📅 |
| ***`process`** | ***Multi-stage workflows** | 🔄 |
| ***`consensus`** | ***Agreement building** | 🤝 |

### ***Layout Configuration Example**

***json**

```
***\{**

  ***"ui": \{**

    ***"layout": "tree",**

    ***"show\_toc": true,**

    ***"collapsible\_sections": true,**

    ***"breadcrumb\_navigation": true**

  ***\},**

  ***"rules": \{**

    ***"max\_depth": 5,**

    ***"require\_numeric\_notation": true,**

    ***"allow\_cross\_references": true**

  ***\},**

  ***"features": \[**

    ***"version\_control",**

    ***"change\_tracking",**

    ***"commentary"**

  ***\],**

  ***"actions": \[**

    ***\{"key": "export\_pdf", "label": "Export as PDF", "icon": "FilePdf"\},**

    ***\{"key": "compare\_versions", "label": "Compare Versions", "icon": "Diff"\}**

  ***\]**

***\}**
```


## 🗃️ ***Database Initialization**

### ***Run the Default Data Command**

***bash**

```
***php occ agora:db:init-default**
```

### ***What This Command Does**

| ***Action** | ***Description** |
| - | - |
| ✅ | ***Creates default categories and locations** |
| ✅ | ***Inserts inquiry families and option families** |
| ✅ | ***Populates inquiry types, option types, and group types** |
| ✅ | ***Adds workflow statuses for all inquiry types** |
| ✅ | ***Creates required Nextcloud groups** |

### ***Nextcloud Groups Created**

| ***Group** | ***Purpose** |
| - | - |
| ***`Agora Users`** | ***Basic access** |
| ***`Agora Moderator`** | ***Content moderation** |
| ***`Agora Official`** | ***Official responses** |
| ***`Agora Legislative`** | ***Legal content** |
| ***`Agora Editor Group`** | ***Group management** |


## 📊 ***Core Database Tables**

| ***Table** | ***Purpose** | ***Key Fields** |
| - | - | - |
| ***`agora\_inquiry\_types`** | ***Defines inquiry templates** | ***`inquiry\_type`, `family`, `fields`** |
| ***`agora\_option\_types`** | ***Defines option templates** | ***`option\_type`, `family`, `statuses`** |
| ***`agora\_group\_types`** | ***Defines group templates** | ***`group\_type`, `allowed\_inquiry\_types`** |
| ***`agora\_inquiry\_families`** | ***Inquiry categories** | ***`family\_type`, `icon`, `sort\_order`** |
| ***`agora\_option\_families`** | ***Option categories** | ***`family\_type`, `ui`, `rules`** |
| ***`agora\_statuses`** | ***Workflow states** | ***`inquiry\_type`, `status\_key`, `is\_final`** |


## 🔧 ***Moderation System**

### ***Moderator Dashboard Sections**

| ***Section** | ***Content** |
| - | - |
| 📥 ***To Moderate** | ***Pending approvals** |
| ✅ ***Approved** | ***Publicly visible** |
| ❌ ***Rejected** | ***Not published** |
| 📦 ***Archived** | ***Closed processes** |

### ***Moderation Actions**

| ***Action** | ***Effect** |
| - | - |
| ***Approve** | ***Makes content public** |
| ***Reject** | ***Returns to creator with feedback** |
| ***Archive** | ***Closes but preserves history** |
| ***Delete** | ***Removes permanently** |


## 👥 ***User Groups & Permissions (Detailed)**

| ***Group** | ***Capabilities** |
| - | - |
| ***`Agora Users`** | ***Create inquiries, support, comment, view attachments** |
| ***`Agora Moderator`** | ***Approve/reject content, archive, delete** |
| ***`Agora Official`** | ***Post official responses, bypass moderation** |
| ***`Agora Legislative`** | ***Manage law-related content, draft laws** |
| ***`Agora Editor Group`** | ***Group inquiry management, create groups** |

***Note: Users must belong to `Agora Users` to see attached files and inquiry covers.**


## 🏷️ ***Default Categories (Hierarchical)**

### ***Ecology & Resources**

- ***Biodiversity**

- ***Water & Lagoon**

- ***Energy**

### ***Planning & Development**

- ***Housing & Urbanism**

- ***Transport**

- ***Public Works**

### ***Health & Wellbeing**

- ***Care & Prevention**

- ***Sports**

### ***Citizenship & Society**

- ***Participation**

- ***Culture & Heritage**

### ***Education & Spirituality**

- ***School**

- ***Training**


## 📍 ***Default Locations (Swiss Model)**

***text**

```
***Switzerland**

├── ***Geneva**

│   └── ***City of Geneva**

├── ***Vaud**

│   └── ***Nyon District**

│       └── ***Nyon**

├── ***Bern**

│   └── ***Bern-Mittelland**

└── ***Zürich**

    ├── ***Winterthur District**

    └── ***Winterthur**
```


## 🔄 ***Inquiry Status Workflows**

### ***Proposal Statuses**

| ***Status** | ***Description** | ***Final** |
| - | - | - |
| ***`under\_process`** | ***Being reviewed** | ❌ |
| ***`need\_revised`** | ***Changes required** | ❌ |
| ***`rejected`** | ***Not accepted** | ✅ |
| ***`collecting\_support`** | ***Open for support** | ❌ |
| ***`quorum\_reached`** | ***Required support met** | ✅ |

### ***Law Proposal Statuses**

| ***Status** | ***Description** | ***Final** |
| - | - | - |
| ***`draft`** | ***Being drafted** | ❌ |
| ***`under\_review`** | ***Under discussion** | ❌ |
| ***`accepted`** | ***Accepted** | ✅ |
| ***`rejected`** | ***Rejected** | ✅ |


## 📋 ***Inquiry Type Examples**

### ***Law Proposal Configuration**

***php**

```
***\[**

    ***'inquiry\_type' =\> 'law\_proposal',**

    ***'family' =\> 'legislative',**

    ***'icon' =\> 'BookOpenVariant',**

    ***'label' =\> 'Law Proposal',**

    ***'fields' =\> \[**

        ***\["key" =\> "parent\_law\_id", "label" =\> "Parent Law", "type" =\> "integer"\],**

        ***\["key" =\> "topic", "label" =\> "Topic", "type" =\> "string", "required" =\> true\],**

        ***\["key" =\> "type\_of\_vote", "label" =\> "Type of Vote", "type" =\> "enum",**

         ***"allowed\_values" =\> \["simple", "majority\_judgement\_beneficial"\]\],**

        ***\["key" =\> "support\_start", "label" =\> "Support Start", "type" =\> "datetime"\],**

        ***\["key" =\> "support\_end", "label" =\> "Support End", "type" =\> "datetime"\]**

    ***\],**

    ***'allowed\_response' =\> \['amendment', 'objection', 'official'\],**

    ***'allow\_comment' =\> true,**

    ***'support\_feature' =\> 'binary'**

***\]**
```

### ***Poll Configuration**

***php**

```
***\[**

    ***'inquiry\_type' =\> 'poll',**

    ***'family' =\> 'collective',**

    ***'icon' =\> 'BarChart',**

    ***'label' =\> 'Poll',**

    ***'fields' =\> \[**

        ***\["key" =\> "topic", "label" =\> "Topic", "type" =\> "string", "required" =\> true\],**

        ***\["key" =\> "voting\_start", "label" =\> "Voting Start", "type" =\> "datetime", "required" =\> true\],**

        ***\["key" =\> "voting\_end", "label" =\> "Voting End", "type" =\> "datetime", "required" =\> true\],**

        ***\["key" =\> "poll\_method", "label" =\> "Poll Method", "type" =\> "enum", "required" =\> true,**

         ***"allowed\_values" =\> \["simple", "majority\_judgement\_beneficial", "condorcet", "approval"\]\],**

        ***\["key" =\> "vote\_secret", "label" =\> "Secret Vote", "type" =\> "boolean", "default" =\> true\]**

    ***\],**

    ***'allowed\_option\_type' =\> \['poll\_option', 'official\_result'\],**

    ***'allow\_comment' =\> false,**

    ***'support\_feature' =\> 'none'**

***\]**
```


## 🚀 ***Admin Commands Summary**

***bash**

```
***\# Initialize default database content***

***php occ agora:db:init-default**


***\# List all templates (if available)***

***php occ agora:template:list**


***\# Check status of all processes***

***php occ agora:status:check**


***\# Clear cache***

***php occ agora:cache:clear**
```


## 🔐 ***Security Considerations**

| ***Area** | ***Recommendation** |
| - | - |
| ***Moderation** | ***Enable for public instances** |
| ***User Groups** | ***Regularly review membership** |
| ***Voting** | ***Consider secret vote options** |
| ***Attachments** | ***Set file size limits** |
| ***Backups** | ***Regular database backups** |


## 📋 ***Summary Table**

| ***Feature** | ***Configuration Point** |
| - | - |
| ***Process Types** | ***Inquiry Types + Families** |
| ***Content Structure** | ***Option Types + Statuses** |
| ***Organization** | ***Group Types + Hierarchy** |
| ***Visual Layout** | ***UI Configuration** |
| ***Workflows** | ***Statuses + Transitions** |
| ***Data Collection** | ***Custom Fields** |


## 🐛 ***Troubleshooting**

### ***Common Issues**

| ***Issue** | ***Solution** |
| - | - |
| ***Users can't see attachments** | ***Add user to `Agora Users` group** |
| ***Moderation not working** | ***Check moderation settings in config** |
| ***Database errors** | ***Run `php occ agora:db:init-default`** |
| ***Missing groups** | ***Create groups manually in Nextcloud** |

### ***Logs Location**

```
***nextcloud/data/nextcloud.log**
```

