<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import {
  CardAddSuggestions,
  CardClosedInquiry,
  CardLimitedInquiries,
  CardLocked,
  CardRegister,
  CardSendConfirmations,
  CardUnpublishedInquiry,
} from './index.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useOptionsStore } from '../../stores/options.ts'
import { useSharesStore } from '../../stores/shares.ts'
import { useSessionStore } from '../../stores/session.ts'

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sharesStore = useSharesStore()
const sessionStore = useSessionStore()

const showUnpublishedInquiryCard = computed(
  () =>
    inquiryStore.configuration.access === 'private' &&
    !sharesStore.hasShares &&
    inquiryStore.permissions.edit &&
    optionsStore.options.length
)
const showAddSuggestionsCard = computed(
  () =>
    inquiryStore.permissions.addOptions && inquiryStore.isSuggestionOpen && !inquiryStore.isClosed
)
const showClosedCard = computed(() => inquiryStore.isClosed && !showSendConfirmationsCard.value)
const showSendConfirmationsCard = computed(
  () => inquiryStore.permissions.edit && inquiryStore.isClosed && optionsStore.confirmed.length > 0
)
const showLimitCard = computed(
  () =>
    inquiryStore.permissions.inquiry &&
    !inquiryStore.isClosed &&
    (inquiryStore.configuration.maxInquiriesPerOption ||
      inquiryStore.configuration.maxInquiriesPerUser)
)
const showRegisterCard = computed(
  () =>
    sessionStore.route.name === 'publicInquiry' &&
    ['public', 'email', 'contact'].includes(inquiryStore.currentUserStatus.userRole) &&
    !inquiryStore.isClosed &&
    !inquiryStore.currentUserStatus.isLocked &&
    !!inquiryStore.id
)
</script>

<template>
  <TransitionGroup tag="div" class="inquiry-info-cards">
    <CardLimitedInquiries v-if="showLimitCard" :key="2" />
    <CardUnpublishedInquiry v-if="showUnpublishedInquiryCard" :key="0" />
    <CardClosedInquiry v-if="showClosedCard" :key="3" />
    <CardLocked v-if="inquiryStore.currentUserStatus.isLocked" :key="5" />
    <CardAddSuggestions v-if="showAddSuggestionsCard" :key="1" />
    <CardSendConfirmations v-if="showSendConfirmationsCard" :key="4" />
    <CardRegister v-if="showRegisterCard" :key="6" />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.inquiry-info-cards {
  // margin: auto;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    flex: 1;
  }

  // remove margin from notecard in favor of flexbox gap
  .notecard {
    margin: unset;
    flex: 1 calc(var(--cap-width) / 2);
    max-width: var(--cap-width);
  }
}
</style>
