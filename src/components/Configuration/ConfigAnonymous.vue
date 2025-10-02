<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../stores/inquiry.ts'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { NcDialog } from '@nextcloud/vue'
import NcButton, { ButtonVariant } from '@nextcloud/vue/components/NcButton'

const emit = defineEmits(['change'])

const showAnonDialog = ref(false)
const anonDialog = {
  message: t('inquiries', 'Once enabled, the anonymous setting cannot be reverted anymore.'),
  name: t('agora', 'Anonymize inquiry irrevocably'),

  buttons: [
    {
      label: t('agora', 'Cancel'),
      callback: () => {
        inquiryStore.configuration.anonymous = false
      },
    },
    {
      label: t('agora', 'Ok'),
      variant: 'primary' as ButtonVariant,
      callback: () => {
        lockAnonymous()
      },
    },
  ],
}

const showLockAnonymous = computed(
  () =>
    inquiryStore.permissions.deanonymize &&
    inquiryStore.status.isAnonymous &&
    !inquiryStore.status.isRealAnonymous
)

/**
 *
 * @param forceDialog
 */
function spawnConfirmationDialog(forceDialog: boolean = false) {
  if (forceDialog) {
    showAnonDialog.value = true
    return
  }
  emit('change')
}

/**
 *
 */
function lockAnonymous() {
  inquiryStore.LockAnonymous()
  emit('change')
}

const inquiryStore = useInquiryStore()
const disabledState = computed(
  () =>
    (inquiryStore.status.isAnonymous && !inquiryStore.permissions.deanonymize) ||
    inquiryStore.status.isRealAnonymous
)
</script>

<template>
  <NcCheckboxRadioSwitch
    v-model="inquiryStore.configuration.anonymous"
    type="switch"
    :disabled="disabledState"
    @update:model-value="spawnConfirmationDialog(!inquiryStore.permissions.deanonymize)"
  >
    {{ t('agora', 'Anonymous inquiry') }}
  </NcCheckboxRadioSwitch>

  <NcButton v-if="showLockAnonymous" class="indented" @click="spawnConfirmationDialog(true)">
    {{ t('agora', 'Anonymize inquiry irrevocably') }}
  </NcButton>

  <NcDialog v-model:open="showAnonDialog" v-bind="anonDialog" />
</template>
