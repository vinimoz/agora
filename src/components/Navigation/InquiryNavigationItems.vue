<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { computed } from 'vue'

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import { Inquiry } from '../../Types/index.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { useSessionStore } from '../../stores/session.ts'
import { 
  getInquiryTypeData
} from '../../helpers/modules/InquiryHelper.ts'

import {
  canArchive,
  // canRestore,
  canDelete,
  canTransfer,
  // canEdit,
  creatorContent,
  createInquiryContext,
} from '../../utils/permissions.ts'

const sessionStore = useSessionStore()

const emit = defineEmits(['cloneInquiry', 'toggleArchive', 'deleteInquiry', 'transferInquiry'])
const { inquiry } = defineProps<{ inquiry: Inquiry }>()

// Get inquiry type data
const inquiryTypeData = computed(() => {
  const inquiryTypes = sessionStore.appSettings.inquiryTypeTab || []
  return getInquiryTypeData(inquiry.type, inquiryTypes)
})

const context = createInquiryContext(inquiry, sessionStore.appSettings)

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
        v-if="canArchive(context)"
        :name="inquiry.status.isArchived ? t('agora', 'Restore inquiry') : t('agora', 'Archive inquiry')"
        :aria-label="inquiry.status.isArchived ? t('agora', 'Restore inquiry') : t('agora', 'Archive inquiry')"
        close-after-click
        @click="emit('toggleArchive')"
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
        @click="emit('deleteInquiry')"
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
        @click="emit('transferInquiry')"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Transfer" :size="20" />
        </template>
      </NcActionButton>
    </template>
  </NcAppNavigationItem>
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
