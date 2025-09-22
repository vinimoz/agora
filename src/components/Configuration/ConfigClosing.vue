<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import moment from '@nextcloud/moment'
import { t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/components/NcButton'
import DateTimePicker from '../../components/Base/modules/DateTimePicker.vue'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import OpenInquiryIcon from 'vue-material-design-icons/LockOpenVariant.vue'
import CloseInquiryIcon from 'vue-material-design-icons/Lock.vue'

import { useInquiryStore } from '../../stores/inquiry.ts'

const inquiryStore = useInquiryStore()

const expire = computed({
  get: () => moment.unix(inquiryStore.configuration.expire)._d,
  set: (value) => {
    inquiryStore.configuration.expire = moment(value).unix()
    inquiryStore.write()
  },
})

const useExpire = computed({
  get: () => !!inquiryStore.configuration.expire,
  set: (value) => {
    if (value) {
      inquiryStore.configuration.expire = moment().add(1, 'week').unix()
    } else {
      inquiryStore.configuration.expire = 0
    }
    inquiryStore.write()
  },
})

/**
 *
 */
function clickToggleClosed() {
  if (inquiryStore.isClosed) {
    inquiryStore.reopen()
  } else {
    inquiryStore.close()
  }
}
</script>

<template>
  <div>
    <NcButton @click="clickToggleClosed()">
      <template #icon>
        <OpenInquiryIcon v-if="inquiryStore.isClosed" />
        <CloseInquiryIcon v-else />
      </template>
      <template #default>
        {{ inquiryStore.isClosed ? t('agora', 'Reopen inquiry') : t('agora', 'Close inquiry') }}
      </template>
    </NcButton>
    <NcCheckboxRadioSwitch v-show="!inquiryStore.isClosed" v-model="useExpire" type="switch">
      {{ t('agora', 'Inquiry closing date') }}
    </NcCheckboxRadioSwitch>
    <DateTimePicker
      v-show="useExpire && !inquiryStore.isClosed"
      v-model="expire"
      type="datetime-local"
    />
  </div>
</template>
