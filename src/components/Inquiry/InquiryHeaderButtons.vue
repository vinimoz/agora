<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import {  onBeforeUnmount } from "vue";
import { useInquiryStore } from "../../stores/inquiry.ts";
import { ActionToggleSidebar } from "../Actions/index.ts";
import { useSessionStore } from "../../stores/session.ts";
import Collapsible from "../Base/modules/Collapsible.vue";

const inquiryStore = useInquiryStore();
const sessionStore = useSessionStore();


onBeforeUnmount(() => {
  inquiryStore.$reset();
});
</script>

<template>
  <Collapsible
    v-if="inquiryStore.description"
    class="sticky-left"
    v-bind="collapsibleProps"
  />
  <div class="inquiry-header-buttons">
    <ActionToggleSidebar
      v-if="
        inquiryStore.permissions.edit ||
          sessionStore.appSettings.inquiryTypeRights[inquiryStore.type]
            ?.inquiryComment
      "
    />
  </div>
</template>

<style lang="scss">
.inquiry-header-buttons {
  display: flex;
  flex: 0;
  gap: 8px;
  align-items: center;
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
