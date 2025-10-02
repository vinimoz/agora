<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'

import InformationIcon from 'vue-material-design-icons/InformationVariant.vue'
import AutoReminderInformation from './AutoReminderInformation.vue'

import { useInquiryStore } from '../../stores/inquiry.ts'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()
</script>

<template>
  <div class="auto-reminder-switch">
    <NcCheckboxRadioSwitch
      v-model="inquiryStore.configuration.autoReminder"
      type="switch"
      @update:model-value="emit('change')"
    >
      {{ t('agora', 'Use Autoreminder') }}
    </NcCheckboxRadioSwitch>
    <NcPopover :focus-trap="false">
      <template #trigger>
        <NcActions>
          <NcActionButton
            :name="t('agora', 'Autoreminder information')"
            :aria-label="t('agora', 'Autoreminder information')"
          >
            <template #icon>
              <InformationIcon />
            </template>
          </NcActionButton>
        </NcActions>
      </template>
      <AutoReminderInformation />
    </NcPopover>
  </div>
</template>

<style lang="scss">
.auto-reminder-switch {
  display: flex;
  .information-icon {
    margin-inline-start: 12px;
  }
}
</style>
