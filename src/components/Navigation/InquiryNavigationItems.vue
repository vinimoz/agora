<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { computed, ref } from 'vue'

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import { Inquiry } from '../../Types/index.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { useSessionStore } from '../../stores/session.ts'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { showError, showSuccess } from '@nextcloud/dialogs'

import DeleteInquiryDialog from '../Modals/DeleteInquiryDialog.vue'
import TransferInquiryDialog from '../Modals/TransferInquiryDialog.vue'
import ArchiveRestoreInquiryDialog from '../Modals/ArchiveRestoreInquiryDialog.vue'

import {
  canArchive,
  canRestore,
  canDelete,
  canTransfer,
  createInquiryContext,
} from '../../utils/permissions.ts'

const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()

const { inquiry } = defineProps<{ inquiry: Inquiry }>()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

// Dialog visibility
const showDeleteDialog = ref(false)
const showTransferDialog = ref(false)
const showArchiveRestoreDialog = ref(false)

// Get inquiry type data
const inquiryTypeData = computed(() => {
  const inquiryTypes = sessionStore.appSettings.inquiryTypeTab || []
  return getInquiryTypeData(inquiry.type, inquiryTypes)
})

const context = computed(() => createInquiryContext(inquiry, sessionStore.appSettings))

async function toggleArchive() {
  try {
    await inquiriesStore.toggleArchive({ inquiryId: inquiry.id })
    if (inquiry.status.isArchived) {
      showSuccess(t('agora', 'Inquiry successfully restored'))
    } else {
      showSuccess(t('agora', 'Inquiry successfully archived'))
    }
  } catch {
    showError(t('agora', 'Error archiving or restoring the inquiry'))
  }
}

const onInquiryDeleted = () => {
  showSuccess(t('agora', 'Inquiry successfully deleted'))
  emit('deleted')
}
</script>

<template>
  <NcAppNavigationItem
    :name="inquiry.title"
    :to="inquiry.permissions.view ? { name: 'inquiry', params: { id: inquiry.id } } : null"
    :class="{ closed: inquiry.status.isExpired, 'inquiry-navigation-item': true }"
  >
    <template #icon>
      <div class="type-icon">
        <component :is="inquiryTypeData.icon" />
      </div>
    </template>

    <template #actions>
      <!-- Archive/Restore Button -->
      <NcActionButton
        v-if="canArchive(context) || canRestore(context)"
        :name="inquiry.status.isArchived ? t('agora', 'Restore inquiry') : t('agora', 'Archive inquiry')"
        :aria-label="inquiry.status.isArchived ? t('agora', 'Restore inquiry') : t('agora', 'Archive inquiry')"
        close-after-click
        @click="toggleArchive()"
      >
        <template #icon>
          <component :is="inquiry.status.isArchived ? InquiryGeneralIcons.Restore : InquiryGeneralIcons.Archive" :size="20" />
        </template>
      </NcActionButton>

      <!-- Delete Button -->
      <NcActionButton
        v-if="canDelete(context)"
        class="danger"
        :name="t('agora', 'Delete inquiry')"
        :aria-label="t('agora', 'Delete inquiry')"
        close-after-click
        @click="showDeleteDialog = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Delete" :size="20" />
        </template>
      </NcActionButton>

      <!-- Transfer Button -->
      <NcActionButton
        v-if="canTransfer(context)"
        :name="t('agora', 'Transfer inquiry')"
        :aria-label="t('agora', 'Transfer inquiry ownership')"
        close-after-click
        @click="showTransferDialog = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Transfer" :size="20" />
        </template>
      </NcActionButton>
    </template>
  </NcAppNavigationItem>

  <!-- Dialogs -->
  <TransferInquiryDialog
    v-model="showTransferDialog"
    :inquiry="inquiry"
    @close="showTransferDialog = false"
  />

  <ArchiveRestoreInquiryDialog
    v-model="showArchiveRestoreDialog"
    :inquiry="inquiry"
    @close="showArchiveRestoreDialog = false"
  />

  <DeleteInquiryDialog
    v-model="showDeleteDialog"
    :inquiry="inquiry"
    @close="showDeleteDialog = false"
    @deleted="onInquiryDeleted"
  />
</template>

<style scoped>
.type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.closed {
  opacity: 0.6;
}

.danger {
  color: var(--color-error);
}

:deep(.app-navigation-entry__actions) {
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
}

:deep(.app-navigation-entry-link) {
  display: flex !important;
  align-items: center !important;
}

:deep(.app-navigation-entry__title) {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
}

:deep(.action-button) {
  padding: 4px !important;
  margin: 0 !important;
}

:deep(.action-button__icon) {
  margin-right: 0 !important;
}
</style>
