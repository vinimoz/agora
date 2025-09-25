<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { InputDiv } from '../Base/index.ts'

import { useInquiryStore } from '../../stores/inquiry.ts'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()
const useLimit = computed({
  get: () => !!inquiryStore.configuration.maxInquiriesPerOption,
  set: (value) => {
    inquiryStore.configuration.maxInquiriesPerOption = value ? 1 : 0
  },
})

/**
 *
 */
function validateLimit() {
  if (!useLimit.value) {
    inquiryStore.configuration.maxInquiriesPerOption = 0
  } else if (inquiryStore.configuration.maxInquiriesPerOption < 1) {
    inquiryStore.configuration.maxInquiriesPerOption = 1
  }

  emit('change')
}
</script>

<template>
  <div>
    <NcCheckboxRadioSwitch v-model="useLimit" type="switch" @update:model-value="validateLimit()">
      {{ t('agora', 'Limit inquiries per option') }}
    </NcCheckboxRadioSwitch>

    <InputDiv
      v-if="useLimit"
      v-model="inquiryStore.configuration.maxInquiriesPerOption"
      class="indented"
      type="number"
      inputmode="numeric"
      :num-min="1"
      use-num-modifiers
      @change="emit('change')"
    />

    <NcCheckboxRadioSwitch
      v-if="inquiryStore.configuration.maxInquiriesPerOption"
      v-model="inquiryStore.configuration.hideBookedUp"
      class="indented"
      type="switch"
      @update:model-value="emit('change')"
    >
      {{ t('agora', 'Hide unavailable Options') }}
    </NcCheckboxRadioSwitch>
  </div>
</template>
