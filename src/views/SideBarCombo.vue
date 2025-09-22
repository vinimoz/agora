<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { emit } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'

import NcAppSidebar from '@nextcloud/vue/components/NcAppSidebar'
import NcAppSidebarTab from '@nextcloud/vue/components/NcAppSidebarTab'

import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import { Event } from '../Types/index.ts'

/**
 *
 */
function closeSideBar() {
  emit(Event.SidebarToggle, { open: false })
}
</script>

<template>
  <NcAppSidebar :name="t('agora', 'Select inquiries to combine')" @close="closeSideBar()">
    <NcAppSidebarTab :id="'agora'" :order="1" :name="t('agora', 'Agora')">
      <template #icon>
        <AgoraAppIcon />
      </template>
    </NcAppSidebarTab>
  </NcAppSidebar>
</template>
