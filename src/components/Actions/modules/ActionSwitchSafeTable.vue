<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../../stores/inquiry.ts'

import NcButton from '@nextcloud/vue/components/NcButton'

const inquiryStore = useInquiryStore()
const caption = t('agora', 'Reveal them')
</script>

<template>
  <div class="action toggle-sidebar">
    <NcButton
      :variant="'primary'"
      :aria-label="caption"
      @click="inquiryStore.revealParticipants = true"
    >
      {{ caption }}
    </NcButton>
  </div>
</template>
