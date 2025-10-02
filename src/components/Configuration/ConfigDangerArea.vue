<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref } from 'vue'
import { router } from '../../router.ts'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiryStore } from '../../stores/inquiry.ts'

import DeleteInquiryDialog from '../Modals/DeleteInquiryDialog.vue'
import RestoreInquiryIcon from 'vue-material-design-icons/Recycle.vue'
import ArchiveInquiryIcon from 'vue-material-design-icons/Archive.vue'
import DeleteInquiryIcon from 'vue-material-design-icons/Delete.vue'
import TransferInquiryIcon from 'vue-material-design-icons/AccountSwitchOutline.vue'
import TransferInquiryDialog from '../Modals/TransferInquiryDialog.vue'

const inquiryStore = useInquiryStore()
const showDeleteDialog = ref(false)
const showTransferDialog = ref(false)

/**
 *
 */
function toggleArchive() {
  try {
    inquiryStore.toggleArchive({ inquiryId: inquiryStore.id })
  } catch {
    showError(
      t('agora', 'Error {action} inquiry.', {
        action: inquiryStore.status.isArchived ? 'restoring' : 'archiving',
      })
    )
  }
}

function routeAway() {
  router.push({
    name: 'list',
    params: {
      type: 'relevant',
    },
  })
}
</script>

<template>
  <div class="delete-area">
    <NcButton @click="toggleArchive()">
      <template #icon>
        <RestoreInquiryIcon v-if="inquiryStore.status.isArchived" />
        <ArchiveInquiryIcon v-else />
      </template>
      <template #default>
        {{
          inquiryStore.status.isArchived
            ? t('agora', 'Restore inquiry')
            : t('agora', 'Archive inquiry')
        }}
      </template>
    </NcButton>

    <NcButton :variant="'error'" @click="showDeleteDialog = true">
      <template #icon>
        <DeleteInquiryIcon />
      </template>
      <template #default>
        {{ t('agora', 'Delete inquiry') }}
      </template>
    </NcButton>
    <NcButton @click="showTransferDialog = true">
      <template #icon>
        <TransferInquiryIcon />
      </template>
      <template #default>
        {{ t('agora', 'Transfer inquiry') }}
      </template>
    </NcButton>
  </div>
  <DeleteInquiryDialog
    v-model="showDeleteDialog"
    :inquiry="inquiryStore"
    @deleted="routeAway"
    @close="showDeleteDialog = false"
  />
  <TransferInquiryDialog
    v-model="showTransferDialog"
    :inquiry="inquiryStore"
    @access-denied="routeAway"
    @close="showTransferDialog = false"
  />
</template>

<style lang="scss">
.delete-area {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
