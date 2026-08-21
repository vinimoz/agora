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

import { InquiryGeneralIcons } from '../utils/icons.ts'
import {
  SideBarTabConfigurationInquiryGroup,
  SideBarTabAccessInquiryGroup,
  SideBarTabGroupMisc,
} from '../components/SideBar/index.js'

const showSidebar = ref(window.innerWidth > 920)
const activeTab = ref(t('agora', 'Comments').toLowerCase())


onMounted(() => {
  subscribe(Event.SidebarToggle, (payload) => {
    showSidebar.value = payload?.open ?? !showSidebar.value
    activeTab.value = payload?.activeTab ?? activeTab.value
  })
  subscribe(Event.SidebarChangeTab, (payload) => {
    activeTab.value = payload?.activeTab ?? activeTab.value
  })
})

onUnmounted(() => {
  unsubscribe(Event.SidebarToggle, () => {
    activeTab.value = 'comments'
  })
  unsubscribe(Event.SidebarChangeTab, () => {
    showSidebar.value = false
  })
})

function closeSideBar() {
  emit(Event.SidebarToggle, { open: false })
}
</script>

<template>
    <aside>
        <NcAppSidebar
                v-show="showSidebar"
                v-model="activeTab"
                :name="t('agora', 'Details')"
                @close="closeSideBar()"
                >
                <NcAppSidebarTab id="configuration" :order="1" :name="t('agora', 'Configuration')"> 
                <template #icon> 
                    <component :is="InquiryGeneralIcons.Wrench" />
                </template> 
                <SideBarTabConfigurationInquiryGroup /> 
                </NcAppSidebarTab>

                <NcAppSidebarTab
                        id="misc"
                        :order="2"
                        :name="t('agora', 'Settings')"
                        >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.Map" />
                        </template>
                 <SideBarTabGroupMisc /> 
                </NcAppSidebarTab>

                <NcAppSidebarTab
                        id="sharing"
                        :order="3"
                        :name="t('agora', 'Access')"
                        >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.Share" />
                        </template>
                <SideBarTabAccessInquiryGroup />
                </NcAppSidebarTab>

        </NcAppSidebar>
    </aside>
</template>
