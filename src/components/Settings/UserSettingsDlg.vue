<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'

import NcAppSettingsDialog from '@nextcloud/vue/components/NcAppSettingsDialog'
import NcAppSettingsSection from '@nextcloud/vue/components/NcAppSettingsSection'

import { FeatureSettings, StyleSettings } from './UserSettings/index.ts'
import { usePreferencesStore } from '../../stores/preferences.ts'
import { Event } from '../../Types/index.ts'

const preferencesStore = usePreferencesStore()
const show = ref(false)

/**
 *
 */
function loadPreferences(): void {
  preferencesStore.load()
  preferencesStore.getCalendars()
}

onMounted(() => {
  subscribe(Event.ShowSettings, () => {
    show.value = true
    loadPreferences()
  })
})

onUnmounted(() => {
  unsubscribe(Event.ShowSettings, () => {})
})
</script>

<template>
  <NcAppSettingsDialog v-model:open="show" show-navigation>
    <NcAppSettingsSection id="div-settings" :name="t('agora', 'Personal preferences')">
      <FeatureSettings />
    </NcAppSettingsSection>

    <NcAppSettingsSection id="styles" :name="t('agora', 'Styles')">
      <StyleSettings />
    </NcAppSettingsSection>
  </NcAppSettingsDialog>
</template>
