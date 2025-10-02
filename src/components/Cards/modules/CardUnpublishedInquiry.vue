<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { CardDiv } from '../../Base/index.ts'
import ActionOpenSharesSidebar from '../../Actions/modules/ActionOpenSharesSidebar.vue'
import { t } from '@nextcloud/l10n'
import { useInquiriesStore } from '../../../stores/inquiries.ts'

const inquiriesStore = useInquiriesStore()
const cardType = 'warning'
</script>

<template>
  <CardDiv :type="cardType">
    {{ t('agora', 'This inquiry is unpublished.') }}
    <span v-if="inquiriesStore.inquiries.length"
      >{{ t('agora', 'Existing participants will still have access.') }}
    </span>
    {{ t('agora', 'Invite users or allow internal access for all site users.') }}
    <template #button>
      <ActionOpenSharesSidebar />
    </template>
  </CardDiv>
</template>
