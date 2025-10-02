/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue'
import { pinia } from './stores/index.ts'

import AdminSettingsPage from './views/AdminSettingsPage.vue'

// Vue.config.devtools = import.meta.env.MODE !== 'production'

const Agora = createApp(AdminSettingsPage).use(pinia)
Agora.mount('#content_agora')
