<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiriesStore } from '../../../stores/inquiries.ts'

const inquiriesStore = useInquiriesStore()
const caption = t('agora', 'Delete orphaned')
</script>

<template>
  <div class="action toggle-sidebar">
    <NcButton
      :variant="'primary'"
      :aria-label="caption"
      @click="inquiriesStore.removeOrphanedInquiries()"
    >
      {{ caption }}
    </NcButton>
  </div>
</template>
