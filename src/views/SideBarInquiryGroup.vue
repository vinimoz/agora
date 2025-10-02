<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'

import NcAppSidebar from '@nextcloud/vue/components/NcAppSidebar'
import NcAppSidebarTab from '@nextcloud/vue/components/NcAppSidebarTab'
import { Event } from '../Types/index.ts'

import SidebarShareIcon from 'vue-material-design-icons/ShareVariant.vue'

import { SideBarTabInquiryGroupShare } from '../components/SideBar/index.js'
import SidebarConfigurationIcon from 'vue-material-design-icons/Wrench.vue'
import SideBarTabConfigurationInquiryGroup from '../components/SideBar/SideBarTabConfigurationInquiryGroup.vue'

const showSidebar = ref(window.innerWidth > 920)
const activeTab = ref(t('agora', 'Shares').toLowerCase())

onMounted(() => {
  subscribe(Event.SidebarToggle, (payload) => {
    showSidebar.value = payload?.open ?? !showSidebar.value
  })
})

onUnmounted(() => {
  unsubscribe(Event.SidebarToggle, () => {
    activeTab.value = 'sharing'
  })
})

/**
 *
 */
function closeSideBar() {
  emit(Event.SidebarToggle, { open: false })
}
</script>

<template>
  <NcAppSidebar
    v-show="showSidebar"
    v-model="activeTab"
    :name="t('agora', 'Details')"
    @close="closeSideBar()"
  >
    <NcAppSidebarTab id="configuration" :order="1" :name="t('agora', 'Configuration')">
      <template #icon>
        <SidebarConfigurationIcon />
      </template>
      <SideBarTabConfigurationInquiryGroup />
    </NcAppSidebarTab>
    <NcAppSidebarTab id="sharing" :order="2" :name="t('agora', 'Sharing')">
      <template #icon>
        <SidebarShareIcon />
      </template>
      <SideBarTabInquiryGroupShare />
    </NcAppSidebarTab>
  </NcAppSidebar>
</template>
