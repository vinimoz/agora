<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted } from 'vue'
import { t } from '@nextcloud/l10n'

import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'

import { FlexSettings } from '../components/Base/index.ts'
import { FeatureSettings, StyleSettings } from '../components/Settings/UserSettings/index.ts'
import { usePreferencesStore } from '../stores/preferences.ts'

const preferencesStore = usePreferencesStore()

const sections = {
  personalSettings: {
    name: t('agora', 'Personal preferences'),
    description: t('agora', 'Set your personal preferences for the agora app'),
  },
  styleSettings: {
    name: t('agora', 'Experimental styles'),
    description: t('agora', 'Some visual styling options.'),
  },
}

onMounted(() => {
  preferencesStore.load()
  // preferencesStore.getCalendars()
})
</script>

<template>
  <FlexSettings>
    <NcSettingsSection v-bind="sections.personalSettings">
      <FeatureSettings />
    </NcSettingsSection>

    <NcSettingsSection v-bind="sections.styleSettings">
      <StyleSettings />
    </NcSettingsSection>
  </FlexSettings>
</template>
