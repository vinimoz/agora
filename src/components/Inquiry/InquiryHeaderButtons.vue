<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'

import { ActionToggleSidebar } from '../Actions/index.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useSessionStore } from '../../stores/session.ts'

const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()

onBeforeUnmount(() => {
  inquiryStore.$reset()
})
</script>

<template>
  <div class="inquiry-header-buttons">
    <ActionToggleSidebar
      v-if="
        inquiryStore.permissions.edit ||
        sessionStore.appSettings.inquiryTypeRights[inquiryStore.type].inquiryComment
      "
    />
  </div>
</template>

<style lang="scss">
.inquiry-header-buttons {
  display: flex;
  flex: 0;
  justify-content: flex-end;
  align-self: flex-end;
  border-radius: var(--border-radius-pill);
}

.icon.icon-settings.active {
  display: block;
  width: 44px;
  height: 44px;
}
</style>
