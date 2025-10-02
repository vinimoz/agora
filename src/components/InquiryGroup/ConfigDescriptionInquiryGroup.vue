<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts'

const emit = defineEmits(['change'])

const inquiryGroupsStore = useInquiryGroupsStore()

const inputProps = {
  placeholder: t('agora', 'Enter a description'),
  helperText: t('agora', 'Choose a description for the overview page'),
}
const inquiryGroupDescription = computed({
  get() {
    return inquiryGroupsStore.currentInquiryGroup?.description || ''
  },
  set(value: string) {
    inquiryGroupsStore.setCurrentInquiryGroup({
      ...inquiryGroupsStore.currentInquiryGroup,
      description: value,
    })
  },
})
</script>

<template>
  <textarea
    v-model="inquiryGroupDescription"
    class="input-textarea"
    :placeholder="inputProps.placeholder"
    @change="emit('change')"
  />
  <p class="helper">
    {{ inputProps.helperText }}
  </p>
</template>

<style scoped>
.input-textarea {
  width: 99%;
  resize: vertical;
}
</style>
