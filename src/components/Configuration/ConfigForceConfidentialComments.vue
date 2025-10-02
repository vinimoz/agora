<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../stores/inquiry.ts'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { useSessionStore } from '../../stores/session.ts'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()
const description =
  inquiryStore.owner.id === sessionStore.currentUser.id
    ? t('inquiries', 'Force confidential comments (only visible to you and the author)')
    : t('inquiries', 'Force confidential comments (only visible to {displayName} and the author)', {
        displayName: inquiryStore.owner.displayName,
      })
</script>

<template>
  <NcCheckboxRadioSwitch
    v-model="inquiryStore.configuration.forceConfidentialComments"
    type="switch"
    @update:model-value="emit('change')"
  >
    {{ description }}
  </NcCheckboxRadioSwitch>
</template>
