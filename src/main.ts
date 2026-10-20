/**
 * SPDX-FileCopyrightText: 2018 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { createApp } from 'vue'
import { pinia } from './stores/index.ts'
import { router } from './router.ts'
import App from './App.vue'
import axios from 'axios'


const Agora = createApp(App)
  .use(pinia)
  .use(router)
  .directive('focus', {
    mounted: (el) => el.focus(),
  })
router.isReady().then(() => {
  Agora.mount('#content')
})

