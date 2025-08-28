/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue';
import { pinia } from './stores/index.ts';

import Dashboard from './views/Dashboard.vue';
import './assets/scss/agora-icon.scss';

// Vue.config.devtools = import.meta.env.MODE !== 'production'
/** global: OCA */

document.addEventListener('DOMContentLoaded', () => {
  // @ts-expect-error: Name not found error
  OCA.Dashboard.register('agora', (el) => {
    const AgoraDashboard = createApp(Dashboard).use(pinia).mount(el);

    return AgoraDashboard;
  });
});
