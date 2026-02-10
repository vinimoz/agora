<!--
  - SPDX-FileCopyrightText: 2016 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<!--
  - SPDX-FileCopyrightText: 2016 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Agora 1.7.0

[![Dependabot status](https://img.shields.io/badge/Dependabot-enabled-brightgreen.svg?longCache=true\&style=flat-square\&logo=dependabot)](https://dependabot.com)
[![Software License](https://img.shields.io/badge/license-AGPL-brightgreen.svg?style=flat-square)](COPYING)
[![REUSE status](https://api.reuse.software/badge/github.com/vinimoz/agora)](https://api.reuse.software/info/github.com/vinimoz/agora)

Agora is a **Nextcloud app for participatory democracy**, inspired by [Decidim](https://decidim.org) and built on [Nextcloud Polls](https://github.com/nextcloud/polls).
It enables communities and organizations to collaborate on **proposals, debates, petitions, and projects** in a transparent and structured way.

---

## 🚀 What’s New in 1.7.0
Update: Introduction of a full Options system enabling real decision-making workflows (vote, choice, consultation) directly inside inquiries and template creation with IA assistant.

## 🚀🗳 Options

Agora 1.7.0 introduces a native Options system that allows inquiries to move beyond simple comments and supports.

With Options, you can:

Define multiple choices for an inquiry

Allow users to vote / select options

Combine options + comments + supports

Build real consultation and decision-making workflows

This feature is the foundation for future quorums, workflows, and referendums.

### 🧰 Templates 

Agora introduces **ready-to-use templates** to quickly bootstrap participatory spaces for different contexts:

* **Template 1 – Option-based workflow**
  Ideal for consultations and decision-making with predefined options.

* **Template 2 – Thematic / structured template**
  Designed for democracy initiatives, universities, companies, and custom organizational workflows.

📄 **Instructions**: `agora-template-instructions.md`
🧪 **Example**: `agora-template-instructions.json`

🙏 **Thanks to contributor**: [LexioJ](https://github.com/LexioJ)

---

* 🧱 **Architecture Database** – New database design for better scalability and structure
* 🎨 **New UX Landing Page** – A more modern and user-friendly entry point
* 🆔 **Cover ID for Inquiries** – Visual cover and unique identifiers
* 🧩 **Linked Families** – Inquiries are now linked to families; create your own families
* ⚙️ **Custom Inquiry Types** – Define reply formats and transformation possibilities
* 🧑⚖️ **Real Moderation Mode** – Fully functional moderation (can be deactivated)

---

## ✨ Key Features

* 💬 Comments and discussions
* 👍 Supports (likes / neutral / against)
* 🧩 Custom inquiry families and types
* 🧾 Multiple inquiry formats (proposals, debates, petitions, projects…)
* 📂 Categorization and filtering by family or location
* 🧱 Scalable architecture and modern UX
* 🔒 Secure and private — all data stays on your Nextcloud server
* 🔗 Integration with Forms, Polls, Deck, Collectives, …
* 🏛 Collectives design UX
* 🗣 Real debate features (structured replies, multi-thread discussions)
* 📜 Project law reading with article-level comments and supports
* 🧰 Templates for democracy, university, company, and custom use cases

---

## 📥 Installation / Update

### Requirements

* Nextcloud 31+
* PHP 8.1+

### Install Latest Release

Install directly from the [Nextcloud App Store](https://apps.nextcloud.com/apps/agora).

### From Git

```bash
git clone https://github.com/vinimoz/agora.git
cd agora
make setup-dev   # Dev environment
make setup-build # Runtime environment
npm run build    # Compile JS
make appstore    # Full build
occ app:enable agora
```

---

## 🤝 Contribution

Please read our [Code of Conduct](https://vinimoz.com/community/code-of-conduct/) to ensure collaboration in a positive and respectful way.

