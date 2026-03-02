<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'
import { useSessionStore } from '../stores/session.ts'
import { useInquiryStore } from '../stores/inquiry.ts'

import NcAppSidebar from '@nextcloud/vue/components/NcAppSidebar'
import NcAppSidebarTab from '@nextcloud/vue/components/NcAppSidebarTab'
import { Event } from '../Types/index.ts'

import { InquiryGeneralIcons } from '../utils/icons.ts'
import {
  canComment,
  canUseResource,
  canShare,
  canEdit,
  createInquiryContext,
} from '../utils/permissions.ts'
import {
  SideBarTabComments,
  SideBarTabShare,
  SideBarTabResources,
  SideBarTabMisc,
} from '../components/SideBar/index.js'


const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()

// Context for permissions
const context = computed(() => createInquiryContext(inquiryStore, sessionStore.appSettings))


// Compute isReadonly
const isReadonly = computed(() => {
  const user = sessionStore.currentUser
  if (inquiryStore.status.moderationStatus === 'rejected' || inquiryStore.status.moderationStatus === 'pending') return true
  if (!user) {
    return true
  }
  const canEditResult = canEdit(context.value)
  return !canEditResult
})

const showSidebar = ref(window.innerWidth > 920)
const activeTab = ref('comments') // Use lowercase string directly

const shouldDisplay = computed(() => {
  if (!inquiryStore || typeof inquiryStore.status !== 'object') {
    return false
  }
  return inquiryStore.status.forceEditMode === true
})

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
  unsubscribe(Event.SidebarToggle)
  unsubscribe(Event.SidebarChangeTab)
})

function closeSideBar() {
  emit(Event.SidebarToggle, { open: false })
}
</script>

<template>
    <aside v-if="shouldDisplay && inquiryStore">
        <NcAppSidebar
                v-show="showSidebar"
                v-model="activeTab"
                :name="t('agora', 'Details')"
                @close="closeSideBar()"
                >
         <NcAppSidebarTab
                        v-if="canComment(context)"
                        id="comments"
                        :order="1"
                        :name="t('agora', 'Comments')"
                        >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.Comment" />
                        </template>
                <SideBarTabComments />
        </NcAppSidebarTab>
        
        <NcAppSidebarTab
                        id="misc"
                        :order="2"
                        :name="t('agora', 'Settings')"
                        >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.Map" />
                        </template>
                <SideBarTabMisc :is-readonly="isReadonly"/>
        </NcAppSidebarTab>

        <NcAppSidebarTab
                v-if="canUseResource(context)"
                id="links"
                :order="4"
                :name="t('agora', 'Resources')"
                >
                <template #icon>
                    <component :is="InquiryGeneralIcons.LinkIcon" />
                </template>
                <SideBarTabResources :inquiry="inquiryStore"/>
        </NcAppSidebarTab>
        
        <NcAppSidebarTab
                v-if="canShare(context)"
                id="sharing"
                :order="5"
                :name="t('agora', 'Sharing')"
                >
                <template #icon>
                    <component :is="InquiryGeneralIcons.Share" />
                </template>
                <SideBarTabShare :inquiry="inquiryStore"/>
        </NcAppSidebarTab>

        </NcAppSidebar>
    </aside>
</template>
