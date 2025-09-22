<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

import { useSessionStore } from '../../stores/session.ts'
import { Inquiry } from '../../stores/inquiry.ts'
import { computed } from 'vue'

import { NcDialog } from '@nextcloud/vue'
import { showError } from '@nextcloud/dialogs'
import { ButtonVariant } from '@nextcloud/vue/components/NcButton'
import { useInquiriesStore } from '../../stores/inquiries.ts'

const model = defineModel<boolean>({ required: true })
const { inquiry } = defineProps<{ inquiry: Inquiry }>()
const emit = defineEmits(['deleted'])

const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()

const adminAccess = computed(() => !inquiry.permissions.view && sessionStore.currentUser.isAdmin)

function dialogOK() {
  try {
    inquiriesStore.delete({ inquiryId: inquiry.id })
    emit('deleted')
  } catch {
    showError(t('agora', 'Error deleting inquiry.'))
  }
}

const dialogText = adminAccess.value
  ? t('inquiries', 'This will finally delete the inquiry and {username} will get notified.', {
      username: inquiry.owner.displayName,
    })
  : t('agora', 'This will finally delete the inquiry.')

const dialogProps = {
  name: t('agora', 'Delete inquiry'),
  noClose: true,
  closeOnClickOutside: true,
  buttons: [
    { label: t('agora', 'Cancel') },
    {
      label: t('agora', 'OK'),
      variant: 'primary' as ButtonVariant,
      callback: () => {
        dialogOK()
      },
    },
  ],
}
</script>

<template>
  <NcDialog v-model:open="model" v-bind="dialogProps">
    <span>
      {{ dialogText }}
    </span>
  </NcDialog>
</template>
