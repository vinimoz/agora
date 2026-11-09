/** * SPDX-FileCopyrightText: 2026 Nextcloud contributors * SPDX-License-Identifier:
AGPL-3.0-or-later */

<template>
  <div class="inquiry-modal-body">
    <!-- Viewer (default) -->
    <InquirySummary
      v-if="mode === 'view'"
      :inquiry="inquiry"
      :show-meta="true"
      :show-stats="true"
      :show-author="true"
      :show-description="true"
      :show-expiry="true"
      :show-comments="true"
      :show-support="true"
    />

    <!-- Editor (only when the user clicked Edit) -->
    <InquiryEditViewForm
      v-else
      :key="inquiry?.id"
      :inquiry="inquiry"
      :is-readonly="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InquirySummary from '../InquiryGroup/InquirySummary.vue'
import InquiryEditViewForm from './InquiryEditViewForm.vue'
import type { Inquiry } from '../../Types/index.ts'

const props = defineProps<{
  inquiry: Inquiry | null
  mode: 'view' | 'edit'
}>()

// (nothing else — we deliberately don't touch useInquiryStore here)
</script>
