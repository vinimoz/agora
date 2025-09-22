<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { InputDiv } from '../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts'
import { computed } from 'vue'

const emit = defineEmits(['change'])

const inquiryGroupsStore = useInquiryGroupsStore()

const inquiryGroupName = computed({
  get() {
    return inquiryGroupsStore.currentInquiryGroup?.name || ''
  },
  set(value: string) {
    inquiryGroupsStore.setCurrentInquiryGroup({
      ...inquiryGroupsStore.currentInquiryGroup,
      name: value,
    })
  },
})
const checkName = computed(() => (inquiryGroupsStore.currentInquiryGroup?.name ? '' : 'error'))

const inputProps = {
  placeholder: t('agora', 'Enter title'),
  helperText: t('inquiries', 'Choose a brief title for the navigation bar and the slug'),
}
</script>

<template>
  <InputDiv
    v-model="inquiryGroupName"
    v-bind="inputProps"
    :signaling-class="checkName"
    type="text"
    @change="emit('change')"
  />
</template>
