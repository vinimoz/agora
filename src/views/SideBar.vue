<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus';
import { t } from '@nextcloud/l10n';

import NcAppSidebar from '@nextcloud/vue/components/NcAppSidebar';
import NcAppSidebarTab from '@nextcloud/vue/components/NcAppSidebarTab';
import { Event } from '../Types/index.ts';

import SidebarShareIcon from 'vue-material-design-icons/ShareVariant.vue';
import SidebarCommentsIcon from 'vue-material-design-icons/CommentProcessing.vue';
import SidebarActivityIcon from 'vue-material-design-icons/LightningBolt.vue';
import SidebarAttachmentsIcon from 'vue-material-design-icons/FileDocument.vue';

import {
  SideBarTabComments,
  SideBarTabShare,
  SideBarTabAttachments,
  SideBarTabActivity
} from '../components/SideBar/index.js';
import { useInquiryStore } from '../stores/inquiry.ts';
import { useSessionStore } from '../stores/session.ts';

const inquiryStore = useInquiryStore();
const sessionStore = useSessionStore();

const showSidebar = ref(window.innerWidth > 920);
const activeTab = ref(t('agora', 'Comments').toLowerCase());

const shouldDisplay = computed(() => inquiryStore.status.forceEditMode);

onMounted(() => {
  subscribe(Event.SidebarToggle, (payload) => {
    showSidebar.value = payload?.open ?? !showSidebar.value;
    activeTab.value = payload?.activeTab ?? activeTab.value;
  });
  subscribe(Event.SidebarChangeTab, (payload) => {
    activeTab.value = payload?.activeTab ?? activeTab.value;
  });
});

onUnmounted(() => {
  unsubscribe(Event.SidebarToggle, () => {
    activeTab.value = 'comments';
  });
  unsubscribe(Event.SidebarChangeTab, () => {
    showSidebar.value = false;
  });
});

function closeSideBar() {
  emit(Event.SidebarToggle, { open: false });
}
</script>

<template>
  <aside v-if="shouldDisplay && inquiryStore.type !== 'suggestion'">
    <NcAppSidebar
      v-show="showSidebar"
      v-model="activeTab"
      :name="t('agora', 'Details')"
      @close="closeSideBar()"
    >
      <NcAppSidebarTab
        v-if="
          sessionStore.appSettings.inquiryTypeRights[inquiryStore.type]
            .commentInquiry
        "
        id="comments"
        :order="1"
        :name="t('agora', 'Comments')"
      >
        <template #icon>
          <SidebarCommentsIcon />
        </template>
        <SideBarTabComments />
      </NcAppSidebarTab>

      <NcAppSidebarTab
        v-if="
          sessionStore.appSettings.inquiryTypeRights[inquiryStore.type]
            .attachFileInquiry
        "
        id="attachments"
        :order="2"
        :name="t('agora', 'Attachments')"
      >
        <template #icon>
          <SidebarAttachmentsIcon />
        </template>
        <SideBarTabAttachments />
      </NcAppSidebarTab>

      <NcAppSidebarTab
        v-if="inquiryStore.permissions.edit"
        id="sharing"
        :order="3"
        :name="t('agora', 'Sharing')"
      >
        <template #icon>
          <SidebarShareIcon />
        </template>
        <SideBarTabShare />
      </NcAppSidebarTab>

      <NcAppSidebarTab
        v-if="
          inquiryStore.permissions.edit && sessionStore.appSettings.useActivity
        "
        id="activity"
        :order="4"
        :name="t('agora', 'Activity')"
      >
        <template #icon>
          <SidebarActivityIcon />
        </template>
        <SideBarTabActivity />
      </NcAppSidebarTab>
    </NcAppSidebar>
  </aside>
</template>
