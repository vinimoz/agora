<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'

import NcAppSidebar from '@nextcloud/vue/components/NcAppSidebar'
import NcAppSidebarTab from '@nextcloud/vue/components/NcAppSidebarTab'
import { Event } from '../Types/index.ts'

import { InquiryGeneralIcons } from '../utils/icons.ts'
import {
  canComment,
  canShare,
  createPermissionContextForContent,
  ContentType,
} from '../utils/permissions.ts'
import {
  SideBarTabComments,
  SideBarTabShare,
  SideBarTabAttachments,
  SideBarTabActivity,
} from '../components/SideBar/index.js'
import { useInquiryStore } from '../stores/inquiry.ts'
import { useSessionStore } from '../stores/session.ts'

const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()

const context = computed(() => createPermissionContextForContent(
    ContentType.Inquiry,
    inquiryStore.owner.id,
    inquiryStore.configuration.access === 'public',
    inquiryStore.status.isLocked,
    inquiryStore.status.isExpired,
    inquiryStore.status.deletionDate > 0,
    inquiryStore.status.isArchived,
    inquiryStore.inquiryGroups.length > 0,
    inquiryStore.inquiryGroups,
    inquiryStore.type
  ))


const showSidebar = ref(window.innerWidth > 920)
const activeTab = ref(t('agora', 'Comments').toLowerCase())

const shouldDisplay = computed(() => inquiryStore.status.forceEditMode)

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
  <aside v-if="shouldDisplay">
    <NcAppSidebar
      v-show="showSidebar"
      v-model="activeTab"
      :name="t('agora', 'Details')"
      @close="closeSideBar()"
    >
      <NcAppSidebarTab
        v-if="canComment(context) && sessionStore.appSettings.inquiryTypeRights[inquiryStore.type].commentInquiry"
        id="comments"
        :order="1"
        :name="t('agora', 'Comments')"
      >
        <template #icon>
	   <component :is="InquiryGeneralIcons.comment" />
        </template>
        <SideBarTabComments />
      </NcAppSidebarTab>

      <NcAppSidebarTab
        v-if="sessionStore.appSettings.inquiryTypeRights[inquiryStore.type].attachFileInquiry"
        id="attachments"
        :order="2"
        :name="t('agora', 'Attachments')"
      >
        <template #icon>
	   <component :is="InquiryGeneralIcons.attachment" />
        </template>
        <SideBarTabAttachments />
      </NcAppSidebarTab>

      <NcAppSidebarTab
        v-if="canShare(context)"
        id="sharing"
        :order="3"
        :name="t('agora', 'Sharing')"
      >
        <template #icon>
	   <component :is="InquiryGeneralIcons.share" />
        </template>
        <SideBarTabShare />
      </NcAppSidebarTab>

      <NcAppSidebarTab
        v-if="inquiryStore.permissions.edit && sessionStore.appSettings.useActivity"
        id="activity"
        :order="4"
        :name="t('agora', 'Activity')"
      >
        <template #icon>
	   <component :is="InquiryGeneralIcons.activity" />
        </template>
        <SideBarTabActivity />
      </NcAppSidebarTab>
    </NcAppSidebar>
  </aside>
</template>
