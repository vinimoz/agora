<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { CardDiv } from '../../Base/index.ts'
import ActionDeleteOrphanedInquiries from '../../Actions/modules/ActionDeleteOrphanedInquiries.vue'
import { t, n } from '@nextcloud/l10n'
import { useInquiryStore } from '../../../stores/inquiry.ts'
import { useOptionsStore } from '../../../stores/options.ts'

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()

const orphanedInquiriesText = computed(() =>
  n(
    'inquiries',
    '%n orphaned inquiry reduces your inquiry quota.',
    '%n orphaned inquiries reduce your inquiry quota.',
    inquiryStore.currentUserStatus.orphanedInquiries
  )
)

const inquiriesLeft = computed(() =>
  inquiryStore.configuration.maxInquiriesPerUser - inquiryStore.currentUserStatus.yesInquiries > 0
    ? inquiryStore.configuration.maxInquiriesPerUser - inquiryStore.currentUserStatus.yesInquiries
    : 0
)

const optionsAvailableText = computed(() => {
  if (optionsStore.countOptionsLeft === 0) {
    return t('agora', 'No more voting options are available.')
  }

  return n(
    'inquiries',
    '%n voting option is available.',
    '%n voting options are available.',
    optionsStore.countOptionsLeft
  )
})

const inquiriesLeftText = computed(() => {
  if (!inquiriesLeft.value) {
    return t('agora', 'You have no inquiries left.')
  }
  return n(
    'inquiries',
    'You have %n inquiry left out of {maxInquiries}.',
    'You have %n inquiries left out of {maxInquiries}.',
    inquiriesLeft.value,
    {
      maxInquiries: inquiryStore.configuration.maxInquiriesPerUser,
    }
  )
})

const cardType = computed(() =>
  inquiryStore.configuration.maxInquiriesPerUser && inquiriesLeft.value < 1 ? 'error' : 'info'
)
</script>

<template>
  <CardDiv :heading="t('agora', 'Limited inquiries.')" :type="cardType">
    <span v-if="inquiryStore.configuration.maxInquiriesPerOption">
      {{ optionsAvailableText }}
    </span>
    <span v-if="inquiryStore.configuration.maxInquiriesPerUser">
      {{ inquiriesLeftText }}
    </span>
    <div
      v-if="
        inquiryStore.currentUserStatus.orphanedInquiries &&
        inquiryStore.configuration.maxInquiriesPerUser
      "
    >
      <b>{{ orphanedInquiriesText }}</b>
    </div>

    <template
      v-if="
        inquiryStore.currentUserStatus.orphanedInquiries &&
        inquiryStore.configuration.maxInquiriesPerUser
      "
      #button
    >
      <ActionDeleteOrphanedInquiries />
    </template>
  </CardDiv>
</template>

<style lang="scss" scoped>
span::after {
  content: ' ';
}
</style>
