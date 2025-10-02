<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { CardDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../../stores/inquiry.ts'

const cardType = 'warning'
const inquiryStore = useInquiryStore()
</script>

<template>
  <CardDiv v-if="inquiryStore.status.isRealAnonymous" type="info">
    {{
      t(
        'inquiries',
        'This inquiry is an anonymous inquiry for everyone, including the owner. Deanonymizing is disabled for this inquiry.'
      )
    }}
    {{
      t('inquiries', 'But be aware that your name is not stored in an encrypted or obfuscated way.')
    }}
  </CardDiv>
  <CardDiv v-else :type="cardType">
    {{
      t(
        'inquiries',
        'This inquiry is an anonymous inquiry for everyone, except for the owner and delegated inquiry administration.'
      )
    }}
    {{
      t(
        'inquiries',
        'Anonymization of this inquiry can be removed at any time by the owner and delegated inquiry administration.'
      )
    }}
  </CardDiv>
</template>
