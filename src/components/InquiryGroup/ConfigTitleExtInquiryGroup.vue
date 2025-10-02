<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { InputDiv } from '../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts'

const emit = defineEmits(['change'])

const inquiryGroupsStore = useInquiryGroupsStore()

const inquiryGroupTitleExt = computed({
  get() {
    return inquiryGroupsStore.currentInquiryGroup?.titleExt || ''
  },
  set(value: string) {
    inquiryGroupsStore.setCurrentInquiryGroup({
      ...inquiryGroupsStore.currentInquiryGroup,
      titleExt: value,
    })
  },
})
const inputProps = {
  placeholder: t('agora', 'Enter extended title'),
  helperText: t('inquiries', 'Optionally choose a more meaningful title for the overview page'),
}
</script>

<template>
  <InputDiv
    v-model="inquiryGroupTitleExt"
    v-bind="inputProps"
    class="input-textarea"
    type="text"
    @change="emit('change')"
  />
</template>
