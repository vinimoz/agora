<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import moment from '@nextcloud/moment'
import { t, n } from '@nextcloud/l10n'

import NcUserBubble from '@nextcloud/vue/components/NcUserBubble'

import OwnerIcon from 'vue-material-design-icons/Crown.vue'
import SubscribedIcon from 'vue-material-design-icons/Bell.vue'
import SuggestionsAllowedIcon from 'vue-material-design-icons/Offer.vue'
import TimezoneIcon from 'vue-material-design-icons/MapClockOutline.vue'
import OptionsIcon from 'vue-material-design-icons/FormatListCheckbox.vue'
import ParticipantsIcon from 'vue-material-design-icons/AccountGroup.vue'
import ShowResultsIcon from 'vue-material-design-icons/Monitor.vue'
import ShowResultsOnClosedIcon from 'vue-material-design-icons/MonitorLock.vue'
import HideResultsIcon from 'vue-material-design-icons/MonitorOff.vue'
import AnoymousIcon from 'vue-material-design-icons/Incognito.vue'
import ClosedIcon from 'vue-material-design-icons/Lock.vue'
import CreationIcon from 'vue-material-design-icons/ClockOutline.vue'
import PrivateInquiryIcon from 'vue-material-design-icons/Key.vue'
import OpenInquiryIcon from 'vue-material-design-icons/Earth.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import EmailIcon from 'vue-material-design-icons/Email.vue'

import { BadgeDiv } from '../Base/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useSubscriptionStore } from '../../stores/subscription.ts'
import { useOptionsStore } from '../../stores/options.ts'

const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()
const subscriptionStore = useSubscriptionStore()
const optionsStore = useOptionsStore()

const suggestionsStatus = computed(() => {
  if (inquiryStore.isSuggestionOpen && !inquiryStore.isSuggestionExpirySet) {
    return t('agora', 'Suggestions are allowed')
  }
  if (inquiryStore.isSuggestionExpirySet && !inquiryStore.isSuggestionExpired) {
    return t('agora', 'Suggestion period ends {timeRelative}', {
      timeRelative: inquiryStore.suggestionsExpireRelative,
    })
  }
  if (inquiryStore.isSuggestionExpirySet && inquiryStore.isSuggestionExpired) {
    return t('agora', 'Suggestion period ended {timeRelative}', {
      timeRelative: inquiryStore.suggestionsExpireRelative,
    })
  }
  return t('agora', 'No suggestions are allowed')
})

const resultsCaption = computed(() => {
  if (inquiryStore.configuration.showResults === 'closed' && !inquiryStore.isClosed) {
    return t('agora', 'Results are hidden until closing inquiry')
  }
  if (inquiryStore.configuration.showResults === 'closed' && inquiryStore.isClosed) {
    return t('agora', 'Results are visible since closing inquiry')
  }
  if (inquiryStore.configuration.showResults === 'never') {
    return t('agora', 'Results are always hidden')
  }
  return t('agora', 'Results are visible')
})

const accessCaption = computed(() =>
  inquiryStore.configuration.access === 'private'
    ? t('agora', 'Private inquiry')
    : t('agora', 'Openly accessible inquiry')
)
const dateCreatedRelative = computed(() => moment.unix(inquiryStore.status.created).fromNow())
const dateExpiryRelative = computed(() => moment.unix(inquiryStore.configuration.expire).fromNow())
const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const countUsedInquiries = computed(
  () => inquiryStore.configuration.maxInquiriesPerUser - inquiryStore.currentUserStatus.yesInquiries
)
</script>

<template>
  <div class="inquiry-information">
    <BadgeDiv>
      <template #icon>
        <OwnerIcon />
      </template>
      {{ t('agora', 'Inquiry owner:') }}
      <NcUserBubble
        v-if="inquiryStore.owner.id"
        :user="inquiryStore.owner.id"
        :display-name="inquiryStore.owner.displayName"
      />
    </BadgeDiv>
    <BadgeDiv>
      <template #icon>
        <PrivateInquiryIcon v-if="inquiryStore.configuration.access === 'private'" />
        <OpenInquiryIcon v-else />
      </template>
      {{ accessCaption }}
    </BadgeDiv>
    <BadgeDiv>
      <template #icon>
        <CreationIcon />
      </template>
      {{
        t('agora', 'Created {dateRelative}', {
          dateRelative: dateCreatedRelative,
        })
      }}
    </BadgeDiv>
    <BadgeDiv v-if="inquiryStore.configuration.expire">
      <template #icon>
        <ClosedIcon />
      </template>
      {{
        t('agora', 'Closing: {dateRelative}', {
          dateRelative: dateExpiryRelative,
        })
      }}
    </BadgeDiv>
    <BadgeDiv v-if="inquiryStore.status.isAnonymous">
      <template #icon>
        <AnoymousIcon />
      </template>
      {{ t('agora', 'Anonymous inquiry') }}
    </BadgeDiv>
    <BadgeDiv>
      <template #icon>
        <HideResultsIcon v-if="inquiryStore.configuration.showResults === 'never'" />
        <ShowResultsOnClosedIcon
          v-else-if="inquiryStore.configuration.showResults === 'closed' && inquiryStore.isClosed"
        />
        <ShowResultsIcon v-else />
      </template>
      {{ resultsCaption }}
    </BadgeDiv>
    <BadgeDiv v-if="inquiryStore.status.countParticipants && inquiryStore.permissions.seeResults">
      <template #icon>
        <ParticipantsIcon />
      </template>
      {{ n('agora', '%n Participant', '%n Participants', inquiryStore.status.countParticipants) }}
    </BadgeDiv>
    <BadgeDiv>
      <template #icon>
        <OptionsIcon />
      </template>
      {{ n('agora', '%n option', '%n options', optionsStore.options.length) }}
    </BadgeDiv>
    <BadgeDiv>
      <template #icon>
        <TimezoneIcon />
      </template>
      {{
        t('agora', 'Time zone: {timezoneString}', {
          timezoneString: currentTimeZone,
        })
      }}
    </BadgeDiv>
    <BadgeDiv v-if="inquiryStore.isSuggestionAllowed">
      <template #icon>
        <SuggestionsAllowedIcon />
      </template>
      {{ suggestionsStatus }}
    </BadgeDiv>
    <BadgeDiv v-if="inquiryStore.configuration.maxInquiriesPerUser">
      <template #icon>
        <CheckIcon />
      </template>
      {{
        n(
          'agora',
          '{usedInquiries} of %n support left.',
          '{usedInquiries} of %n agora left.',
          inquiryStore.configuration.maxInquiriesPerUser,
          { usedInquiries: countUsedInquiries }
        )
      }}
    </BadgeDiv>
    <BadgeDiv v-if="inquiryStore.configuration.maxInquiriesPerOption">
      <template #icon>
        <CloseIcon />
      </template>
      {{
        n(
          'agora',
          'Only %n support per option.',
          'Only %n inquiries per option.',
          inquiryStore.configuration.maxInquiriesPerOption
        )
      }}
    </BadgeDiv>
    <BadgeDiv v-if="$route.name === 'publicInquiry' && sessionStore.currentUser.emailAddress">
      <template #icon>
        <EmailIcon />
      </template>
      {{ sessionStore.currentUser.emailAddress }}
    </BadgeDiv>
    <BadgeDiv v-if="subscriptionStore.subscribed">
      <template #icon>
        <SubscribedIcon />
      </template>
      {{ t('agora', 'You subscribed to this inquiry') }}
    </BadgeDiv>
  </div>
</template>

<style lang="scss">
.inquiry-information {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
