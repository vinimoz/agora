<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useSessionStore } from '../../../stores/session'

import { t } from '@nextcloud/l10n'

import ButtonModal from '../../Base/modules/ButtonModal.vue'
import { ButtonMode } from '../../../Types'
import InquiryCreateDlg from '../../Create/InquiryCreateDlg.vue'

import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { NcDialog } from '@nextcloud/vue'
import { ButtonVariant } from '@nextcloud/vue/components/NcButton'

interface Props {
  caption?: string
  modalSize?: string
  buttonMode?: ButtonMode
}

const {
  caption = t('agora', 'Add inquiry'),
  modalSize = 'normal',
  buttonMode = 'native',
} = defineProps<Props>()

const router = useRouter()
const sessionStore = useSessionStore()

const newInquiry = ref({
  id: 0,
  title: '',
})

const showModal = ref(false)

/**
 *
 * @param payLoad
 * @param payLoad.id
 * @param payLoad.title
 */
function addedInquiry(payLoad: { id: number; title: string }) {
  newInquiry.value = payLoad

  // close modal and show the confirmation dialog
  showModal.value = false
  showConfirmationDialog.value = true
}

const confirmationDialogMessage = computed(() =>
  t('agora', '"{inquiryTitle}" has been successfully created.', {
    inquiryTitle: newInquiry.value.title,
  })
)
const confirmationDialogName = t('agora', 'Inquiry created')
const showConfirmationDialog = ref(false)
const confirmationDialogProps = {
  buttons: [
    {
      label: t('agora', 'Add another inquiry'),
      callback: () => {
        addAnotherInquiry()
      },
    },
    {
      label: t('agora', 'Open inquiry now'),
      variant: 'primary' as ButtonVariant,
      callback: () => {
        router.push({
          name: 'inquiry',
          params: { id: newInquiry.value.id },
        })
      },
    },
  ],
}

/**
 *
 */
function addAnotherInquiry() {
  showModal.value = true
  showConfirmationDialog.value = false
}
</script>

<template>
  <ButtonModal
    v-if="sessionStore.appPermissions.inquiryCreation"
    v-model:show-modal="showModal"
    :button-caption="buttonMode === 'navigation' ? t('agora', 'New inquiry') : caption"
    :modal-size="modalSize"
    :button-mode="buttonMode"
    :button-variant="'primary'"
  >
    <template #icon>
      <PlusIcon :size="20" decorative />
    </template>
    <template #modal-content>
      <InquiryCreateDlg @added="addedInquiry" @close="showModal = false" />
    </template>
  </ButtonModal>
  <NcDialog
    v-model:open="showConfirmationDialog"
    v-bind="confirmationDialogProps"
    :name="confirmationDialogName"
    :message="confirmationDialogMessage"
  />
</template>
