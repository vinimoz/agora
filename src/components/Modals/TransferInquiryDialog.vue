<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

import { Inquiry, useInquiryStore } from '../../stores/inquiry.ts'
import { computed, ref } from 'vue'

import { NcDialog } from '@nextcloud/vue'
import UserSearch from '../User/UserSearch.vue'
import { User } from '../../Types/index.ts'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { ButtonVariant } from '@nextcloud/vue/components/NcButton'

const emit = defineEmits(['accessDenied'])
const { inquiry } = defineProps<{ inquiry: Inquiry }>()
const model = defineModel<boolean>({ required: true })

const inquiriesStore = useInquiriesStore()
const inquiryStore = useInquiryStore()
const newUser = ref<User | undefined>(undefined)

async function dialogOK() {
  try {
    await inquiriesStore.changeOwner({
      inquiryId: inquiry.id,
      userId: newUser.value ? newUser.value.id : '',
    })
    showSuccess(
      t('agora', 'Transfered inquiry to {user}.', {
        user: newUser.value ? newUser.value.displayName : '',
      })
    )
  } catch {
    showError(t('agora', 'Error transfering inquiry.'))
  } finally {
    try {
      // reload the inquiry to refresh the configuration
      await inquiryStore.load()
    } catch {
      // if error occurs, we need to emit the accessDenied event
      // since we assume the user has no access to the inquiry anymore
      emit('accessDenied')
    }
  }
}

const dialogText = computed(() => {
  if (inquiry.currentUserStatus.isOwner) {
    if (!newUser.value) {
      return t(
        'inquiries',
        'Transfering a inquiry to another user may result in loss of access to this inquiry.'
      )
    }

    return t(
      'inquiries',
      'Transfering a inquiry to {user} may result in loss of access to this inquiry.',
      {
        user: newUser.value.displayName,
      }
    )
  }
  if (!newUser.value) {
    return t(
      'inquiries',
      'You are not the owner of this inquiry. {owner} will get informed about this action.',
      {
        owner: inquiry.owner.displayName,
      }
    )
  }
  return t(
    'inquiries',
    'You are not the owner of this inquiry. {owner} will get informed about the transfer to {newUser}.',
    {
      owner: inquiry.owner.displayName,
      newUser: newUser.value.displayName,
    }
  )
})

const dialogProps = computed(() => ({
  name: t('agora', 'Transfer inquiry'),
  noClose: true,
  closeOnClickOutside: true,
  buttons: [
    { label: t('agora', 'Cancel') },
    {
      label: t('agora', 'OK'),
      variant: 'primary' as ButtonVariant,
      disabled: !newUser.value,
      callback: () => {
        dialogOK()
      },
    },
  ],
}))
</script>

<template>
  <NcDialog v-model:open="model" v-bind="dialogProps">
    <UserSearch
      v-model="newUser"
      :search-types="[0]"
      :input-label="t('agora', 'Select the user to transfer the ownership to')"
      user-select
      close-on-select
      @user-selected="(user: User) => (newUser = user)"
    />
    <span>
      {{ dialogText }}
    </span>
  </NcDialog>
</template>
