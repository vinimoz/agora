<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionCheckbox from '@nextcloud/vue/components/NcActionCheckbox'
import NcActionInput from '@nextcloud/vue/components/NcActionInput'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'

import SettingsIcon from 'vue-material-design-icons/Cog.vue'
import SendLinkPerEmailIcon from 'vue-material-design-icons/LinkVariant.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ClippyIcon from 'vue-material-design-icons/ClipboardArrowLeftOutline.vue'
import ResetSupportsIcon from 'vue-material-design-icons/Undo.vue'
import EditAccountIcon from 'vue-material-design-icons/AccountEdit.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import EditEmailIcon from 'vue-material-design-icons/EmailEditOutline.vue'
import ListViewIcon from 'vue-material-design-icons/ViewListOutline.vue'
import TableViewIcon from 'vue-material-design-icons/Table.vue'
import SortByOriginalOrderIcon from 'vue-material-design-icons/FormatListBulletedSquare.vue'
import SortByRankIcon from 'vue-material-design-icons/FormatListNumbered.vue'
import SortByDateOptionIcon from 'vue-material-design-icons/SortClockAscendingOutline.vue'

import { InquiriesAPI, ValidatorAPI } from '../../Api/index.ts'
import { useOptionsStore } from '../../stores/options.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { usePreferencesStore } from '../../stores/preferences.ts'
import { useSessionStore } from '../../stores/session.ts'
import { useSubscriptionStore } from '../../stores/subscription.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'

import { StatusResults, Event } from '../../Types/index.ts'

import { deleteCookieByValue, findCookieByValue } from '../../helpers/index.ts'
import { NcActionButtonGroup } from '@nextcloud/vue'
import { AxiosError } from '@nextcloud/axios'

type InputProps = {
  success: boolean
  error: boolean
  showTrailingButton: boolean
  labelOutside: boolean
  label: string
}

const optionsStore = useOptionsStore()
const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()
const subscriptionStore = useSubscriptionStore()
const preferencesStore = usePreferencesStore()
const inquiriesStore = useInquiriesStore()
const router = useRouter()
const hasCookie = !!findCookieByValue(sessionStore.publicToken)
const viewMode = computed({
  get() {
    return inquiryStore.viewMode
  },
  set() {
    changeView()
  },
})

/**
 *
 */
function logout() {
  const reRouteTo = deleteCookieByValue(sessionStore.publicToken)
  if (reRouteTo) {
    router.push({
      name: 'publicInquiry',
      params: {
        token: reRouteTo,
      },
    })
  }
}

/**
 *
 */
async function writeSubscription() {
  subscriptionStore.write()
}

/**
 *
 */
async function deleteEmailAddress() {
  try {
    await sessionStore.deleteEmailAddress()
    showSuccess(t('agora', 'Email address deleted.'))
  } catch {
    showError(
      t('agora', 'Error deleting email address {emailAddress}', {
        emailAddress: sessionStore.share.user.emailAddress,
      })
    )
  }
}

/**
 *
 */
async function resendInvitation() {
  try {
    const response = await sessionStore.resendInvitation()
    if (response) {
      showSuccess(
        t('agora', 'Invitation resent to {emailAddress}', {
          emailAddress: response.data.share.user.emailAddress,
        })
      )
    }
  } catch {
    showError(
      t('agora', 'Mail could not be resent to {emailAddress}', {
        emailAddress: sessionStore.share.user.emailAddress,
      })
    )
  }
}

/**
 *
 */
function changeView(): void {
  emit(Event.TransitionsOff, 500)
  if (inquiryStore.type === 'project') {
    preferencesStore.setViewProject(
      inquiryStore.viewMode === 'table-view' ? 'list-view' : 'table-view'
    )
  } else if (inquiryStore.type === 'proposal') {
    preferencesStore.setViewProposal(
      inquiryStore.viewMode === 'table-view' ? 'list-view' : 'table-view'
    )
  } else if (inquiryStore.type === 'debate') {
    preferencesStore.setViewDebate(
      inquiryStore.viewMode === 'table-view' ? 'list-view' : 'table-view'
    )
  } else if (inquiryStore.type === 'grievance') {
    preferencesStore.setViewGrievance(
      inquiryStore.viewMode === 'table-view' ? 'list-view' : 'table-view'
    )
  } else if (inquiryStore.type === 'petition') {
    preferencesStore.setViewPetition(
      inquiryStore.viewMode === 'table-view' ? 'list-view' : 'table-view'
    )
  }
}

/**
 *
 */
async function copyLink() {
  const personalLink =
    window.location.origin +
    router.resolve({
      name: 'publicInquiry',
      params: { token: sessionStore.publicToken },
    }).href

  try {
    await navigator.clipboard.writeText(personalLink)
    showSuccess(t('agora', 'Link copied to clipboard'))
  } catch {
    showError(t('agora', 'Error while copying link to clipboard'))
  }
}

/**
 *
 */
async function getAddresses() {
  try {
    const response = await InquiriesAPI.getParticipantsEmailAddresses(sessionStore.route.params.id)
    await navigator.clipboard.writeText(response.data.map((item) => item.combined).join(', '))
    showSuccess(t('agora', 'Link copied to clipboard'))
  } catch (error) {
    if ((error as AxiosError)?.code === 'ERR_CANCELED') {
      return
    }
    showError(t('agora', 'Error while copying link to clipboard'))
  }
}

/**
 *
 */
async function resetInquiries() {
  try {
    await inquiriesStore.resetInquiries()
    showSuccess(t('agora', 'Your inquiries are reset'))
  } catch {
    showError(t('agora', 'Error while resetting inquiries'))
  }
}

const displayNameInputProps = ref<InputProps>({
  success: false,
  error: false,
  showTrailingButton: true,
  labelOutside: false,
  label: t('agora', 'Change name'),
})

const validateDisplayName = debounce(async function () {
  if (sessionStore.share.user.displayName.length < 1) {
    setDisplayNameStatus('error')
    return
  }

  if (sessionStore.share.user.displayName === sessionStore.currentUser.displayName) {
    setDisplayNameStatus('unchanged')
    return
  }

  try {
    await ValidatorAPI.validateName(
      sessionStore.route.params.token,
      sessionStore.share.user.displayName
    )
    setDisplayNameStatus('success')
  } catch {
    setDisplayNameStatus('error')
  }
}, 500)

/**
 *
 * @param status
 */
function setDisplayNameStatus(status: StatusResults) {
  displayNameInputProps.value.success = status === 'success'
  displayNameInputProps.value.error = status === 'error'
  displayNameInputProps.value.showTrailingButton = status === 'success'
}

/**
 *
 */
async function submitDisplayName() {
  try {
    await sessionStore.updateDisplayName({
      displayName: sessionStore.share.user.displayName,
    })
    showSuccess(t('agora', 'Name changed.'))
    setDisplayNameStatus('unchanged')
  } catch {
    showError(t('agora', 'Error changing name.'))
    setDisplayNameStatus('error')
  }
}

const eMailInputProps = ref<InputProps>({
  success: false,
  error: false,
  showTrailingButton: true,
  labelOutside: false,
  label: t('agora', 'Edit email address'),
})

const validateEMail = debounce(async function () {
  if (sessionStore.share.user.emailAddress === sessionStore.currentUser.emailAddress) {
    setEMailStatus('unchanged')
    return
  }

  try {
    await ValidatorAPI.validateEmailAddress(sessionStore.share.user.emailAddress)
    setEMailStatus('success')
  } catch {
    setEMailStatus('error')
  }
}, 500)

/**
 *
 * @param status
 */
function setEMailStatus(status: StatusResults) {
  eMailInputProps.value.success = status === 'success'
  eMailInputProps.value.error = status === 'error'
  eMailInputProps.value.showTrailingButton = status === 'success'
}

/**
 *
 */
async function submitEmail() {
  try {
    await sessionStore.updateEmailAddress({
      emailAddress: sessionStore.share.user.emailAddress,
    })
    showSuccess(
      t('agora', 'Email address {emailAddress} saved.', {
        emailAddress: sessionStore.share.user.emailAddress,
      })
    )
    setEMailStatus('unchanged')
  } catch {
    showError(
      t('agora', 'Error saving email address {emailAddress}', {
        emailAddress: sessionStore.share.user.emailAddress,
      })
    )
    setEMailStatus('error')
  }
}
</script>

<template>
  <NcActions variant="primary">
    <template #icon>
      <SettingsIcon :size="20" />
    </template>
    <NcActionButtonGroup name="View mode">
      <NcActionButton
        v-model="viewMode"
        :value="'table-view'"
        type="radio"
        :aria-label="t('agora', 'Switch to table view')"
      >
        <template #icon>
          <TableViewIcon />
        </template>
      </NcActionButton>

      <NcActionButton
        v-model="viewMode"
        :value="'list-view'"
        type="radio"
        :aria-label="t('agora', 'Switch to list view')"
      >
        <template #icon>
          <ListViewIcon />
        </template>
      </NcActionButton>
    </NcActionButtonGroup>

    <NcActionButtonGroup name="Options order">
      <NcActionButton
        v-model="optionsStore.ranked"
        value="no"
        type="radio"
        :aria-label="
          inquiryStore.type === 'dateInquiry'
            ? t('agora', 'Switch to date order')
            : t('agora', 'Switch to original order')
        "
      >
        <template #icon>
          <SortByDateOptionIcon v-if="inquiryStore.type === 'dateInquiry'" />
          <SortByOriginalOrderIcon v-else />
        </template>
      </NcActionButton>

      <NcActionButton
        v-model="optionsStore.ranked"
        value="yes"
        type="radio"
        :aria-label="t('agora', 'Switch to ranked order')"
      >
        <template #icon>
          <SortByRankIcon />
        </template>
      </NcActionButton>
    </NcActionButtonGroup>

    <NcActionSeparator />

    <NcActionButton
      v-if="sessionStore.share?.type === 'external'"
      :name="t('agora', 'Copy your personal link to clipboard')"
      :aria-label="t('agora', 'Copy your personal link to clipboard')"
      @click="copyLink()"
    >
      <template #icon>
        <ClippyIcon />
      </template>
    </NcActionButton>

    <NcActionSeparator v-if="sessionStore.share?.type === 'external'" />

    <NcActionInput
      v-if="sessionStore.share?.type === 'external'"
      v-bind="displayNameInputProps"
      v-model="sessionStore.share.user.displayName"
      @update:value-value="validateDisplayName"
      @submit="submitDisplayName"
    >
      <template #icon>
        <EditAccountIcon />
      </template>
      {{ displayNameInputProps.label }}
    </NcActionInput>

    <NcActionInput
      v-if="sessionStore.share?.type === 'external'"
      v-bind="eMailInputProps"
      v-model="sessionStore.share.user.emailAddress"
      @update:model-value="validateEMail"
      @submit="submitEmail"
    >
      <template #icon>
        <EditEmailIcon />
      </template>
      {{ eMailInputProps.label }}
    </NcActionInput>

    <NcActionButton
      v-if="sessionStore.share?.type === 'external'"
      :name="t('agora', 'Get your personal link per mail')"
      :aria-label="t('agora', 'Get your personal link per mail')"
      :disabled="!sessionStore.share.user.emailAddress"
      @click="resendInvitation()"
    >
      <template #icon>
        <SendLinkPerEmailIcon />
      </template>
    </NcActionButton>

    <NcActionCheckbox
      v-if="inquiryStore.viewMode === 'list-view'"
      :model-value="subscriptionStore.subscribed"
      :disabled="!inquiryStore.permissions.subscribe"
      title="check"
      @change="writeSubscription"
    >
      {{ t('agora', 'Subscribe to notifications') }}
    </NcActionCheckbox>

    <NcActionButton
      v-if="sessionStore.share?.type === 'external' && sessionStore.share.user.emailAddress"
      :name="t('agora', 'Remove email address')"
      :aria-label="t('agora', 'Remove email address')"
      @click="deleteEmailAddress"
    >
      <template #icon>
        <DeleteIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="inquiryStore.permissions.edit"
      :name="t('agora', 'Copy list of email addresses to clipboard')"
      :aria-label="t('agora', 'Copy list of email addresses to clipboard')"
      @click="getAddresses()"
    >
      <template #icon>
        <ClippyIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="inquiryStore.permissions.inquiry && inquiryStore.viewMode === 'list-view'"
      :name="t('agora', 'Reset your inquiries')"
      :aria-label="t('agora', 'Reset your inquiries')"
      @click="resetInquiries()"
    >
      <template #icon>
        <ResetSupportsIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="sessionStore.share?.type === 'external' && hasCookie"
      :name="
        t('agora', 'Logout as {name} (delete cookie)', {
          name: sessionStore.currentUser.displayName,
        })
      "
      :aria-label="
        t('agora', 'Logout as {name} (delete cookie)', {
          name: sessionStore.currentUser.displayName,
        })
      "
      @click="logout()"
    >
      <template #icon>
        <LogoutIcon />
      </template>
    </NcActionButton>
  </NcActions>
</template>
