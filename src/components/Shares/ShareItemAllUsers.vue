<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import UserItem from '../User/UserItem.vue'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { VirtualUserItemType } from '../../Types/index.ts'

const inquiryStore = useInquiryStore()

const userItemProps = computed<{
  label: string
  type: VirtualUserItemType
  disabled?: boolean
  description?: string
}>(() => ({
  label: t('agora', 'Internal visibility'),
  type: 'internalAccess',
  disabled: inquiryStore.configuration.visibility === 'private',
  description:
    inquiryStore.configuration.visibility === 'private'
      ? t('agora', 'This inquiry is private')
      : t('agora', 'This is an openly accessible inquiry'),
}))

const inquiryAccess = computed({
  get() {
    return inquiryStore.configuration.visibility === 'everyone'
  },
  set(value) {
    inquiryStore.configuration.visibility = value ? 'everyone' : 'private'
    inquiryStore.write()
  },
})
</script>

<template>
  <UserItem v-bind="userItemProps">
    <template #status>
      <div class="inquir-status" />
    </template>
    <NcCheckboxRadioSwitch v-model="inquiryAccess" type="switch" />
  </UserItem>
</template>
