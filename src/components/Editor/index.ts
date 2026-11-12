/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { App } from "vue";
import InquiryEditor from "./InquiryEditor.vue";

export default {
  install(app: App) {
    app.component("InquiryEditor", InquiryEditor);
  },
};

export { InquiryEditor };
