<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'

import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { useSessionStore } from '../../stores/session.ts'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'

import { useInquiriesStore } from '../../stores/inquiries.ts'
import { Inquiry } from '../../stores/inquiry.ts'

import DeleteInquiryDialog from '../Modals/DeleteInquiryDialog.vue'
import TransferInquiryDialog from '../Modals/TransferInquiryDialog.vue'


import {
  canArchive,
  canRestore,
  canDelete,
  canTransfer,
  createInquiryContext,
} from '../../utils/permissions.ts'

const sessionStore= useSessionStore

const { inquiry } = defineProps<{ inquiry: Inquiry }>()

const inquiriesStore = useInquiriesStore()

const showDeleteDialog = ref(false)
const showTransferDialog = ref(false)
const subMenu = ref<'addToGroup' | 'removeFromGroup' | null>(null)

// Context for permissions
const context = computed(() => {
  return createInquiryContext(inquiry, sessionStore.appSettings)
})


async function toggleArchive() {
  try {
    await inquiriesStore.toggleArchive({ inquiryId: inquiry.id })
  } catch {
    showError(t('agora', 'Error archivingrestoring inquiry'))
  }
}
</script>

<template>
  <NcActions force-menu>
    <template v-if="subMenu">
      <NcActionButton
        :aria-label="t('agora', 'Back')"
        :name="t('agora', 'Back')"
        @click="subMenu = null"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Back" :size="16" />
        </template>
      </NcActionButton>
    </template>

    <template v-else>
      <NcActionButton
        v-show="canArchive(context)"
        :name="t('agora', 'Archive inquiry')"
        :aria-label="t('agora', 'Archive inquiry')"
        close-after-click
        @click="toggleArchive()"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Archive" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="canRestore(context)"
        :name="t('agora', 'Restore inquiry')"
        :aria-label="t('agora', 'Restore inquiry')"
        close-after-click
        @click="toggleArchive()"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Restore" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="canDelete(context)"
        class="danger"
        :name="t('agora', 'Delete inquiry')"
        :aria-label="t('agora', 'Delete inquiry')"
        close-after-click
        @click="showDeleteDialog = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Delete" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="canTransfer(context)"
        class="danger"
        :name="t('agora', 'Transfer inquiry ownership')"
        :aria-label="t('agora', 'Transfer inquiry ownership')"
        close-after-click
        @click="showTransferDialog = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Transfer" :size="24" />
        </template>
      </NcActionButton>
    </template>
  </NcActions>

  <TransferInquiryDialog
    v-model="showTransferDialog"
    :inquiry="inquiry"
    @close="showTransferDialog = false"
  />

  <DeleteInquiryDialog
    v-model="showDeleteDialog"
    :inquiry="inquiry"
    @close="showDeleteDialog = false"
  />
</template>
