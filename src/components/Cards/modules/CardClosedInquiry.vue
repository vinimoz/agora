<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { CardDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../../stores/inquiry.ts'

const inquiryStore = useInquiryStore()
const cardType = 'warning'
</script>

<template>
  <CardDiv :type="cardType">
    {{ t('agora', 'This inquiry is closed.') }}
    <span v-if="!inquiryStore.permissions.edit">
      {{ t('agora', 'No further action is possible.') }}
    </span>
  </CardDiv>
</template>
