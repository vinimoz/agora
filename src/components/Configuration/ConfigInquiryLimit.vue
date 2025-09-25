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
import { useOptionsStore } from '../../stores/options.ts'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()

const useLimit = computed({
  get: () => !!inquiryStore.configuration.maxInquiriesPerUser,
  set(value) {
    inquiryStore.configuration.maxInquiriesPerUser = value ? 1 : 0
  },
})

/**
 *
 */
function validateLimit() {
  if (!useLimit.value) {
    inquiryStore.configuration.maxInquiriesPerUser = 0
  } else if (inquiryStore.configuration.maxInquiriesPerUser < 1) {
    inquiryStore.configuration.maxInquiriesPerUser = 1
  } else if (inquiryStore.configuration.maxInquiriesPerUser > optionsStore.options.length) {
    inquiryStore.configuration.maxInquiriesPerUser = optionsStore.options.length
  }

  emit('change')
}
</script>

<template>
  <div>
    <NcCheckboxRadioSwitch v-model="useLimit" type="switch" @update:model-value="validateLimit()">
      {{ t('agora', 'Limit "Yes" inquiries per participant') }}
    </NcCheckboxRadioSwitch>

    <InputDiv
      v-if="useLimit"
      v-model="inquiryStore.configuration.maxInquiriesPerUser"
      class="indented"
      type="number"
      inputmode="numeric"
      use-num-modifiers
      :num-min="1"
      :num-max="optionsStore.options.length"
      num-wrap
      @change="emit('change')"
    />
  </div>
</template>
