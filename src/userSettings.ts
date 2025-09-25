/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue'
import { pinia } from './stores/index.ts'

import UserSettingsPage from './views/UserSettingsPage.vue'

// Vue.config.devtools = import.meta.env.MODE !== 'production'

const Agora = createApp(UserSettingsPage).use(pinia)
Agora.mount('#content_agora')
