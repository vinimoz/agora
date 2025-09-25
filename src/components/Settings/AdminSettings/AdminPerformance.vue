<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { RadioGroupDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'

const appSettingsStore = useAppSettingsStore()
const updateTypeOptions = [
  {
    value: 'longInquirying',
    label: t('agora', 'Enable "long inquirying" for instant updates'),
  },
  {
    value: 'periodicInquirying',
    label: t('agora', 'Enable periodic requests of inquiry updates from the client'),
  },
  {
    value: 'noInquirying',
    label: t('agora', 'Disable automatic updates (inquiry must be reloaded to get updates)'),
  },
]
</script>

<template>
  <div class="user_settings">
    <RadioGroupDiv
      v-model="appSettingsStore.updateType"
      :options="updateTypeOptions"
      @update="appSettingsStore.write()"
    />
  </div>
</template>
