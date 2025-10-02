<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { CardDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useSessionStore } from '../../../stores/session.ts'

const sessionStore = useSessionStore()
const cardType = 'warning'

const cardText = computed(() =>
  sessionStore.route.name === 'publicInquiry'
    ? t(
        'inquiries',
        'This share is locked and allows only read access. Registering is not possible.'
      )
    : t('agora', 'Voting is locked and you have just read access to this inquiry.')
)
</script>

<template>
  <CardDiv :type="cardType">
    {{ cardText }}
  </CardDiv>
</template>
