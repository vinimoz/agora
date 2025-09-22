<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import { InquiryTypesUI } from '../../helpers/modules/InquiryHelper.ts'
import { Inquiry } from '../../Types/index.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

const emit = defineEmits(['cloneInquiry', 'toggleArchive', 'deleteInquiry'])
const { inquiry } = defineProps<{ inquiry: Inquiry }>()
</script>

<template>
  <NcAppNavigationItem
    :name="inquiry.title"
    :to="inquiry.permissions.view ? { name: 'inquiry', params: { id: inquiry.id } } : null"
    :class="{ closed: inquiry.status.isExpired }"
  >
    <template #icon>
      <div class="type-icon">
        <component :is="InquiryTypesUI[inquiry.type].icon" />
      </div>
    </template>
    <template #actions>
      <NcActionButton
        v-if="inquiry.permissions.edit && !inquiry.status.isArchived"
        :name="t('agora', 'Archive inquiry')"
        :aria-label="t('agora', 'Archive inquiry')"
        @click="emit('toggleArchive')"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.archive" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-if="inquiry.permissions.edit && inquiry.status.isArchived"
        :name="t('agora', 'Restore inquiry')"
        :aria-label="t('agora', 'Restore inquiry')"
        @click="emit('toggleArchive')"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.restore" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-if="inquiry.permissions.edit"
        class="danger"
        :name="t('agora', 'Delete inquiry')"
        :aria-label="t('agora', 'Delete inquiry')"
        @click="emit('deleteInquiry')"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.delete" />
        </template>
      </NcActionButton>
    </template>
  </NcAppNavigationItem>
</template>
