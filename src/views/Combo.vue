<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'

import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'

import ComboTable from '../components/Combo/ComboTable.vue'
import LoadingOverlay from '../components/Base/modules/LoadingOverlay.vue'
import { ActionToggleSidebar } from '../components/Actions'
import { HeaderBar } from '../components/Base/index.ts'
import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import { useComboStore } from '../stores/combo.ts'

const comboStore = useComboStore()
const isLoading = ref(false)
const title = t('agora', 'Combined inquiries')
const description = t('agora', 'Combine multiple date inquiries in a single view')

onMounted(() => {
  comboStore.verifyInquiriesFromSettings()
})
</script>

<template>
  <NcAppContent>
    <HeaderBar>
      <template #title>
        {{ title }}
      </template>
      <template #right>
        <div class="inquiry-header-buttons">
          <ActionToggleSidebar />
        </div>
      </template>
      {{ description }}
    </HeaderBar>

    <div class="area__main">
      <ComboTable v-show="comboStore.inquiries.length" />

      <NcEmptyContent
        v-if="!comboStore.inquiries.length"
        :name="t('agora', 'No inquiries selected')"
        :description="t('agora', 'Select inquiries by clicking on them in the right sidebar!')"
      >
        <template #icon>
          <AgoraAppIcon />
        </template>
      </NcEmptyContent>
    </div>

    <LoadingOverlay v-if="isLoading" />
  </NcAppContent>
</template>
