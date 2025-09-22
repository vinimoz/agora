<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { CardDiv } from '../../Base/index.ts'
import ActionRegister from '../../Actions/modules/ActionRegister.vue'
import { t } from '@nextcloud/l10n'
import { useSessionStore } from '../../../stores/session.ts'

const sessionStore = useSessionStore()
const cardType = 'info'

const registrationInvitationText = computed(() => {
  if (sessionStore.share?.publicInquiryEmail === 'mandatory') {
    return t('inquiries', 'To participate, register with your email address and a name.')
  }
  if (sessionStore.share?.publicInquiryEmail === 'optional') {
    return t('inquiries', 'To participate, register a name and optionally with your email address.')
  }
  return t('agora', 'To participate, register with a name.')
})
</script>

<template>
  <CardDiv :type="cardType">
    {{ registrationInvitationText }}
    <template #button>
      <ActionRegister />
    </template>
  </CardDiv>
</template>
