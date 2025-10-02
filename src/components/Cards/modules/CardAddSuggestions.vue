<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { CardDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../../stores/inquiry.ts'
import ActionAddOption from '../../Actions/modules/ActionAddOption.vue'
import OptionsTextAdd from '../../Options/OptionsTextAdd.vue'

const inquiryStore = useInquiryStore()
const cardType = 'info'

const optionAddDatesModalProps = {
  caption: t('agora', 'Add'),
  showCaption: true,
  primary: true,
}
</script>

<template>
  <CardDiv :type="cardType">
    {{ t('agora', 'You are asked to propose more options.') }}
    <p v-if="inquiryStore.isSuggestionExpirySet && !inquiryStore.isSuggestionExpired">
      {{
        t('agora', 'The suggestion period ends {timeRelative}.', {
          timeRelative: inquiryStore.suggestionsExpireRelative,
        })
      }}
    </p>

    <OptionsTextAdd
      v-if="inquiryStore.type === 'textInquiry'"
      :placeholder="t('agora', 'Propose an option')"
    />

    <template v-if="inquiryStore.type === 'dateInquiry'" #button>
      <ActionAddOption v-bind="optionAddDatesModalProps" />
    </template>
  </CardDiv>
</template>
