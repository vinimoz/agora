<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t, n } from '@nextcloud/l10n'
import { DateTime } from 'luxon'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionCheckbox from '@nextcloud/vue/components/NcActionCheckbox'
import NcActionInput from '@nextcloud/vue/components/NcActionInput'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcButton from '@nextcloud/vue/components/NcButton'

// Icons from icons.ts
import { StatusIcons, UserIcons, NavigationIcons } from '../../utils/icons.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

import { ValidatorAPI } from '../../Api/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { useSubscriptionStore } from '../../stores/subscription.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useOptionsStore } from '../../stores/options.ts'
import { StatusResults } from '../../Types/index.ts'
import { deleteCookieByValue, findCookieByValue } from '../../helpers/index.ts'
import UserBubble from '../User/UserBubble.vue'
import BadgeDiv from '../Base/modules/BadgeDiv.vue'
import ActionInquiryUnified from '../Actions/modules/ActionInquiryUnified.vue'


type InputProps = {
  success: boolean
  error: boolean
  showTrailingButton: boolean
  labelOutside: boolean
  label: string
}

type TabType = 'profile' | 'info' | 'actions'

const sessionStore = useSessionStore()
const subscriptionStore = useSubscriptionStore()
const inquiriesStore = useInquiriesStore()
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const router = useRouter()

const hasCookie = !!findCookieByValue(sessionStore.publicToken)
const showPanel = ref(false)
const activeTab = ref<TabType>('profile')

// ---- Computed ----
const isExternalShare = computed(() => sessionStore.share?.type === 'external')
const hasEmail = computed(() => !!sessionStore.share?.user?.emailAddress)
const displayName = computed(() => sessionStore.share?.user?.displayName || sessionStore.currentUser?.displayName || 'User')
const isSubscribed = computed(() => subscriptionStore.subscribed)

// ---- Inquiry Information ----
const creationDateTime = computed(() =>
  DateTime.fromSeconds(inquiryStore.status.created)
)

const expirationDateTime = computed(() =>
  inquiryStore.configuration.expire
    ? DateTime.fromSeconds(inquiryStore.configuration.expire)
    : null
)

const accessCaption = computed(() => {
  const visibility = inquiryStore.configuration.visibility
  const map: Record<string, string> = {
    'private': t('agora', 'Private'),
    'groups': t('agora', 'Groups only'),
    'participants': t('agora', 'Participants only'),
    'everyone': t('agora', 'Public'),
  }
  return map[visibility] || visibility
})

const resultsCaption = computed(() => {
  const showResults = inquiryStore.configuration.showResults as
    | 'always'
    | 'closed'
    | 'never'
    | undefined
  if (showResults === 'closed' && !inquiryStore.isClosed) {
    return t('agora', 'Hidden until closed')
  }
  if (showResults === 'closed' && inquiryStore.isClosed) {
    return t('agora', 'Visible since closed')
  }
  if (showResults === 'never') {
    return t('agora', 'Always hidden')
  }
  return t('agora', 'Visible')
})

const childCount = computed(() => (inquiryStore.childs || []).length)

const trendingScore = computed(() => {
  return (inquiryStore.miscFields?.trendingScore as number) ?? 0
})

const trendingLevel = computed(() => {
  const score = trendingScore.value
  if (score >= 80) return { label: t('agora', 'Hot'), color: 'var(--color-error)' }
  if (score >= 60) return { label: t('agora', 'Trending'), color: 'var(--color-warning)' }
  if (score >= 40) return { label: t('agora', 'Growing'), color: 'var(--color-success)' }
  if (score >= 20) return { label: t('agora', 'Emerging'), color: 'var(--color-primary-element)' }
  return null
})

// Moderation status - using proper colors without green
const moderationStatus = computed(() => {
  const status = inquiryStore.status.moderationStatus
  const map: Record<string, { label: string; color: string }> = {
    'draft': { label: t('agora', 'Draft'), color: 'var(--color-text-lighter)' },
    'pending': { label: t('agora', 'Pending'), color: 'var(--color-warning)' },
    'accepted': { label: t('agora', 'Accepted'), color: 'var(--color-primary-element)' },
    'rejected': { label: t('agora', 'Rejected'), color: 'var(--color-error)' },
  }
  return map[status] || { label: status, color: 'var(--color-text-lighter)' }
})

const publicationStatus = computed(() => {
  const status = inquiryStore.status.publicationStatus
  const map: Record<string, string> = {
    'draft': t('agora', 'Draft'),
    'pending': t('agora', 'Pending review'),
    'published': t('agora', 'Published'),
    'archived': t('agora', 'Archived'),
    'deleted': t('agora', 'Deleted'),
  }
  return map[status] || status
})

// ---- Current User Status (from inquiryStore.currentUserStatus) ----
const currentUserStatus = computed(() => inquiryStore.currentUserStatus)

const isOwner = computed(() => currentUserStatus.value.isOwner)
const isInvolved = computed(() => currentUserStatus.value.isInvolved)
const hasSupported = computed(() => currentUserStatus.value.hasSupported)
const userRole = computed(() => currentUserStatus.value.userRole || 'Participant')
const countInquiries = computed(() => currentUserStatus.value.countInquiries || 0)
const orphanedInquiries = computed(() => currentUserStatus.value.orphanedInquiries || 0)

// ---- Owner Info ----
const owner = computed(() => inquiryStore.owner)
const ownerDisplayName = computed(() => owner.value?.displayName || 'Unknown')
const ownerEmail = computed(() => owner.value?.emailAddress || '')
const ownerIsAdmin = computed(() => owner.value?.isAdmin || false)
const ownerIsModerator = computed(() => owner.value?.isModerator || false)

const currentTimeZone = sessionStore.currentTimezoneName

// ---- Methods ----
function togglePanel() {
  showPanel.value = !showPanel.value
  if (showPanel.value) {
    activeTab.value = 'profile'
  }
}

function switchTab(tab: TabType) {
  activeTab.value = tab
}

function logout() {
  const reRouteTo = deleteCookieByValue(sessionStore.publicToken)
  if (reRouteTo) {
    router.push({
      name: 'publicInquiry',
      params: { token: reRouteTo },
    })
  }
  showPanel.value = false
}

async function toggleSubscription() {
  try {
    await subscriptionStore.write()
    showSuccess(
      subscriptionStore.subscribed
        ? t('agora', 'Subscribed')
        : t('agora', 'Unsubscribed')
    )
  } catch {
    showError(t('agora', 'Could not update subscription'))
  }
}

async function deleteEmailAddress() {
  try {
    await sessionStore.deleteEmailAddress()
    showSuccess(t('agora', 'Email address deleted'))
  } catch {
    showError(t('agora', 'Error deleting email address'))
  }
}

async function resendInvitation() {
  try {
    const response = await sessionStore.resendInvitation()
    if (response) {
      showSuccess(t('agora', 'Invitation resent'))
    }
  } catch {
    showError(t('agora', 'Mail could not be resent'))
  }
}

async function copyLink() {
  const personalLink = window.location.origin + router.resolve({
    name: 'publicInquiry',
    params: { token: sessionStore.publicToken },
  }).href

  try {
    await navigator.clipboard.writeText(personalLink)
    showSuccess(t('agora', 'Link copied'))
  } catch {
    showError(t('agora', 'Error copying link'))
  }
}

// ---- Display Name ----
const displayNameInputProps = ref<InputProps>({
  success: false,
  error: false,
  showTrailingButton: true,
  labelOutside: false,
  label: t('agora', 'Change name'),
})

const validateDisplayName = debounce(async function () {
  if (!sessionStore.share) return
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

function setDisplayNameStatus(status: StatusResults) {
  displayNameInputProps.value.success = status === 'success'
  displayNameInputProps.value.error = status === 'error'
  displayNameInputProps.value.showTrailingButton = status === 'success'
}

async function submitDisplayName() {
  if (!sessionStore.share) return
  try {
    await sessionStore.updateDisplayName({
      displayName: sessionStore.share.user.displayName,
    })
    showSuccess(t('agora', 'Name changed'))
    setDisplayNameStatus('unchanged')
  } catch {
    showError(t('agora', 'Error changing name'))
    setDisplayNameStatus('error')
  }
}

// ---- Email ----
const eMailInputProps = ref<InputProps>({
  success: false,
  error: false,
  showTrailingButton: true,
  labelOutside: false,
  label: t('agora', 'Edit email'),
})

const validateEMail = debounce(async function () {
  if (!sessionStore.share) return
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

function setEMailStatus(status: StatusResults) {
  eMailInputProps.value.success = status === 'success'
  eMailInputProps.value.error = status === 'error'
  eMailInputProps.value.showTrailingButton = status === 'success'
}

async function submitEmail() {
  if (!sessionStore.share) return
  try {
    await sessionStore.updateEmailAddress({
      emailAddress: sessionStore.share.user.emailAddress,
    })
    showSuccess(t('agora', 'Email saved'))
    setEMailStatus('unchanged')
  } catch {
    showError(t('agora', 'Error saving email'))
    setEMailStatus('error')
  }
}
</script>

<template>
  <div class="user-context">
    <!-- Trigger Button -->
    <button 
      class="user-trigger" 
      @click="togglePanel"
      :aria-label="t('agora', 'User settings')"
      :title="t('agora', 'User settings')"
    >
      <component :is="UserIcons.Settings" :size="24" class="user-icon" />
      <component :is="NavigationIcons.ChevronDown" :size="14" class="dropdown-arrow" />
    </button>

    <!-- Panel -->
    <div v-if="showPanel" class="context-panel" @click.stop>
      <div class="panel-header">
        <div class="panel-header-left">
          <component :is="UserIcons.Settings" :size="20" />
          <h3 class="panel-title">{{ t('agora', 'Settings') }}</h3>
        </div>
        <button class="close-btn" @click="showPanel = false">
          <component :is="InquiryGeneralIcons.Close" :size="18" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'profile' }"
          @click="switchTab('profile')"
        >
          <component :is="StatusIcons.AccountMultiple" :size="16" />
          {{ t('agora', 'Profile') }}
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'info' }"
          @click="switchTab('info')"
        >
          <component :is="InquiryGeneralIcons.Info" :size="16" />
          {{ t('agora', 'Info') }}
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'actions' }"
          @click="switchTab('actions')"
        >
          <component :is="InquiryGeneralIcons.Tools" :size="16" />
          {{ t('agora', 'Actions') }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- PROFILE TAB -->
        <div v-show="activeTab === 'profile'" class="tab-panel">
          <div class="user-info">
            <UserBubble :user="sessionStore.currentUser" :size="48" />
            <div class="user-info-text">
              <span class="user-name">{{ displayName }}</span>
              <span class="user-email" v-if="hasEmail">
                {{ sessionStore.share.user.emailAddress }}
              </span>
              <span class="user-role" v-if="sessionStore.currentUser.isAdmin">
                {{ t('agora', 'Administrator') }}
              </span>
              <span class="user-role" v-if="sessionStore.currentUser.isModerator">
                {{ t('agora', 'Moderator') }}
              </span>
            </div>
          </div>

          <NcActions class="settings-actions" :force-menu="true">
            <template v-if="isExternalShare">
              <NcActionButton :name="t('agora', 'Copy link')" @click="copyLink()">
                <template #icon>
                  <component :is="UserIcons.ListView" />
                </template>
                {{ t('agora', 'Copy link') }}
              </NcActionButton>

              <NcActionInput
                v-bind="displayNameInputProps"
                v-model="sessionStore.share.user.displayName"
                @update:value="validateDisplayName"
                @submit="submitDisplayName"
              >
                <template #icon>
                  <component :is="UserIcons.EditAccount" />
                </template>
              </NcActionInput>

              <NcActionInput
                v-bind="eMailInputProps"
                v-model="sessionStore.share.user.emailAddress"
                @update:model-value="validateEMail"
                @submit="submitEmail"
              >
                <template #icon>
                  <component :is="UserIcons.EditEmail" />
                </template>
              </NcActionInput>

              <NcActionButton
                :name="t('agora', 'Resend invitation')"
                :disabled="!hasEmail"
                @click="resendInvitation()"
              >
                <template #icon>
                  <component :is="InquiryGeneralIcons.Share" />
                </template>
                {{ t('agora', 'Resend invitation') }}
              </NcActionButton>

              <NcActionButton
                v-if="hasEmail"
                :name="t('agora', 'Remove email')"
                @click="deleteEmailAddress"
              >
                <template #icon>
                  <component :is="InquiryGeneralIcons.Delete" />
                </template>
                {{ t('agora', 'Remove email') }}
              </NcActionButton>

              <NcActionSeparator />

              <NcActionButton
                v-if="hasCookie"
                :name="t('agora', 'Logout')"
                @click="logout()"
              >
                <template #icon>
                  <component :is="UserIcons.Logout" />
                </template>
                {{ t('agora', 'Logout') }}
              </NcActionButton>
            </template>
          </NcActions>
        </div>

        <!-- INFO TAB -->
        <div v-show="activeTab === 'info'" class="tab-panel info-panel">
          <!-- Status -->
          <div class="info-section">
            <div class="status-row">
              <span class="status-badge" :style="{ color: moderationStatus.color }">
                {{ moderationStatus.label }}
              </span>
              <span class="publication-badge">
                {{ publicationStatus }}
              </span>
            </div>
            
            <BadgeDiv v-if="trendingLevel" class="trending-badge">
              <template #icon>
                <component :is="InquiryGeneralIcons.Activity" :size="16" />
              </template>
              <span :style="{ color: trendingLevel.color, fontWeight: 'bold' }">
                {{ trendingLevel.label }}
              </span>
              <span class="trending-score">({{ trendingScore }})</span>
            </BadgeDiv>
          </div>

          <!-- Owner Info -->
          <div class="info-section">
            <div class="section-label">{{ t('agora', 'Owner') }}</div>
            <BadgeDiv>
              <template #icon>
                <component :is="StatusIcons.Owner" :size="16" />
              </template>
              <UserBubble :user="owner" :size="24" />
            </BadgeDiv>
            <BadgeDiv v-if="ownerEmail">
              <template #icon>
                <component :is="StatusIcons.EmailIcon" :size="16" />
              </template>
              {{ ownerEmail }}
            </BadgeDiv>
            <div class="owner-badges">
              <span v-if="ownerIsAdmin" class="role-badge admin">{{ t('agora', 'Admin') }}</span>
              <span v-if="ownerIsModerator" class="role-badge moderator">{{ t('agora', 'Moderator') }}</span>
            </div>
          </div>

          <!-- Current User Status -->
          <div class="info-section">
            <div class="section-label">{{ t('agora', 'Your Status') }}</div>
            <BadgeDiv>
              <template #icon>
                <component :is="StatusIcons.AccountMultiple" :size="16" />
              </template>
              {{ t('agora', 'Role:') }} {{ userRole }}
            </BadgeDiv>
            <BadgeDiv v-if="isOwner">
              <template #icon>
                <component :is="StatusIcons.Owner" :size="16" />
              </template>
              {{ t('agora', 'You are the owner') }}
            </BadgeDiv>
            <BadgeDiv v-if="isInvolved">
              <template #icon>
                <component :is="InquiryGeneralIcons.Comment" :size="16" />
              </template>
              {{ t('agora', 'You are involved') }}
            </BadgeDiv>
            <BadgeDiv v-if="hasSupported">
              <template #icon>
                <component :is="InquiryGeneralIcons.ThumbUp" :size="16" />
              </template>
              {{ t('agora', 'You have supported this') }}
            </BadgeDiv>
            <BadgeDiv v-if="countInquiries > 0">
              <template #icon>
                <component :is="StatusIcons.Plus" :size="16" />
              </template>
              {{ n('agora', '%n inquiry created', '%n inquiries created', countInquiries) }}
            </BadgeDiv>
            <BadgeDiv v-if="orphanedInquiries > 0">
              <template #icon>
                <component :is="StatusIcons.AlertCircleOutline" :size="16" />
              </template>
              {{ n('agora', '%n orphaned inquiry', '%n orphaned inquiries', orphanedInquiries) }}
            </BadgeDiv>
          </div>

          <!-- Inquiry Basic Info -->
          <div class="info-section">
            <div class="section-label">{{ t('agora', 'Inquiry Details') }}</div>
            <BadgeDiv>
              <template #icon>
                <component :is="inquiryStore.configuration.visibility === 'private' ? StatusIcons.PrivateInquiry : StatusIcons.OpenInquiry" :size="16" />
              </template>
              {{ accessCaption }}
            </BadgeDiv>
            <BadgeDiv>
              <template #icon>
                <component :is="StatusIcons.Creation" :size="16" />
              </template>
              {{ t('agora', 'Created') }} {{ creationDateTime.toRelative() }}
            </BadgeDiv>
            <BadgeDiv v-if="inquiryStore.configuration.expire">
              <template #icon>
                <component :is="StatusIcons.Expiration" :size="16" />
              </template>
              {{ t('agora', 'Closes') }} {{ expirationDateTime?.toRelative() }}
            </BadgeDiv>
            <BadgeDiv>
              <template #icon>
                <component :is="StatusIcons.Timezone" :size="16" />
              </template>
              {{ currentTimeZone }}
            </BadgeDiv>
          </div>

          <!-- Stats -->
          <div class="info-section">
            <div class="section-label">{{ t('agora', 'Statistics') }}</div>
            <BadgeDiv v-if="inquiryStore.status.countParticipants && inquiryStore.permissions.seeResults">
              <template #icon>
                <component :is="StatusIcons.Participants" :size="16" />
              </template>
              {{ n('agora', '%n participant', '%n participants', inquiryStore.status.countParticipants) }}
            </BadgeDiv>
            <BadgeDiv>
              <template #icon>
                <component :is="StatusIcons.Options" :size="16" />
              </template>
              {{ n('agora', '%n option', '%n options', optionsStore.options.length) }}
            </BadgeDiv>
            <BadgeDiv v-if="childCount > 0">
              <template #icon>
                <component :is="InquiryGeneralIcons.FileTree" :size="16" />
              </template>
              {{ n('agora', '%n child inquiry', '%n child inquiries', childCount) }}
            </BadgeDiv>
            <BadgeDiv>
              <template #icon>
                <component :is="inquiryStore.configuration.showResults === 'never' ? StatusIcons.HideResults : StatusIcons.ShowResults" :size="16" />
              </template>
              {{ resultsCaption }}
            </BadgeDiv>
            <BadgeDiv v-if="inquiryStore.status.isAnonymous">
              <template #icon>
                <component :is="StatusIcons.AnonymousIcon" :size="16" />
              </template>
              {{ t('agora', 'Anonymous') }}
            </BadgeDiv>
          </div>
        </div>

        <!-- ACTIONS TAB - Uses InquiryItemActions -->
        <div v-show="activeTab === 'actions'" class="tab-panel actions-panel">
          <div class="action-group">
            <div class="section-label">{{ t('agora', 'Inquiry Actions') }}</div>
            <ActionInquiryUnified :inquiry="inquiryStore" />
          </div>

          <div class="action-group" v-if="isExternalShare">
            <div class="section-label">{{ t('agora', 'Subscription') }}</div>
            <NcActions class="settings-actions" :force-menu="true">
              <NcActionCheckbox
                v-model="subscriptionStore.subscribed"
                @change="toggleSubscription"
              >
                <template #icon>
                  <component :is="isSubscribed ? InquiryGeneralIcons.Bell : InquiryGeneralIcons.BellOutline" :size="20" />
                </template>
                {{ isSubscribed ? t('agora', 'Unsubscribe') : t('agora', 'Subscribe') }}
              </NcActionCheckbox>

              <NcActionSeparator />

              <NcActionButton
                :name="t('agora', 'Reset inquiries')"
                @click="inquiriesStore.resetInquiries()"
              >
                <template #icon>
                  <component :is="UserIcons.Reset" />
                </template>
                {{ t('agora', 'Reset inquiries') }}
              </NcActionButton>
            </NcActions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-context {
  position: relative;
  display: inline-block;
}

// Trigger Button
.user-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 44px;
  height: 44px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-main-background);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    border-color: var(--color-primary-element);
    background: var(--color-primary-light);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  .user-icon {
    color: var(--color-main-text);
    opacity: 0.8;
  }

  .dropdown-arrow {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--color-main-background);
    border-radius: 50%;
    padding: 2px;
    opacity: 0.6;
    transition: transform 0.2s ease;
  }
}

// Panel
.context-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 420px;
  max-width: 95vw;
  max-height: 80vh;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  animation: slideDown 0.25s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}

// Header
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);
}

.panel-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-main-text);
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text-lighter);
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-background-darker);
    color: var(--color-main-text);
  }
}

// Tabs
.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);
  padding: 0 8px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-lighter);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-main-text);
    background: var(--color-background-darker);
  }

  &.active {
    color: var(--color-primary-element);
    border-bottom-color: var(--color-primary-element);
  }
}

// Tab Content
.tab-content {
  max-height: calc(80vh - 120px);
  overflow-y: auto;
  padding: 0;
}

.tab-panel {
  padding: 16px;

  &.info-panel {
    padding: 12px 16px;
  }

  &.actions-panel {
    padding: 12px 16px;
  }
}

// Profile Tab
.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: var(--color-background-dark);
  border-radius: 10px;
  margin-bottom: 16px;

  .user-info-text {
    display: flex;
    flex-direction: column;
    min-width: 0;

    .user-name {
      font-weight: 600;
      font-size: 15px;
      color: var(--color-main-text);
    }

    .user-email {
      font-size: 12px;
      color: var(--color-text-lighter);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-role {
      font-size: 11px;
      color: var(--color-primary-element);
      font-weight: 500;
      margin-top: 2px;
    }
  }
}

.settings-actions {
  width: 100%;

  :deep(.action-item) {
    margin: 2px 0;
    width: 100%;

    .action-item__button {
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 13px;
      width: 100%;
      justify-content: flex-start;

      &:hover {
        background: var(--color-primary-light);
      }
    }
  }

  :deep(.action-item--input) {
    .action-item__input-wrapper {
      border-radius: 8px;
      border: 1px solid var(--color-border);
      padding: 4px 10px;
      margin: 2px 0;

      &:focus-within {
        border-color: var(--color-primary-element);
      }

      input {
        background: transparent;
        border: none;
        outline: none;
        font-size: 13px;
        padding: 4px 0;
        width: 100%;
        color: var(--color-main-text);
      }

      .action-item__trailing-button {
        background: var(--color-primary-element);
        color: white;
        border-radius: 6px;
        padding: 2px 10px;
        font-size: 11px;
        font-weight: 600;
        border: none;
        cursor: pointer;

        &:hover {
          background: var(--color-primary-element-hover);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }
}

// Info Tab
.info-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-lighter);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 4px 0;

  .status-badge,
  .publication-badge {
    font-size: 12px;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 12px;
    background: var(--color-background-dark);
    border: 1px solid var(--color-border);
  }

  .status-badge {
    font-weight: 700;
  }
}

.owner-badges {
  display: flex;
  gap: 6px;
  padding: 2px 0;

  .role-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3px;

    &.admin {
      background: var(--color-primary-light);
      color: var(--color-primary-element);
    }

    &.moderator {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }
  }
}

.trending-badge {
  .trending-score {
    font-size: 11px;
    opacity: 0.6;
    margin-left: 2px;
  }
}

:deep(.badge-div) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  min-height: 28px;
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-background-dark);
  }

  .badge-div__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    opacity: 0.6;
  }

  .user-bubble {
    margin-left: 2px;
  }
}

// Actions Tab
.action-group {
  .section-label {
    margin-bottom: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }

  :deep(.action-item) {
    margin: 2px 0;
    width: 100%;

    .action-item__button {
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 13px;
      width: 100%;
      justify-content: flex-start;

      &:hover {
        background: var(--color-primary-light);
      }
    }
  }

  :deep(.nc-actions) {
    display: block;
    width: 100%;
  }
}

// Responsive
@media (max-width: 480px) {
  .context-panel {
    right: -10px;
    width: 100vw;
    max-width: 100vw;
    border-radius: 8px;
  }

  .tab-btn {
    padding: 8px 10px;
    font-size: 12px;
  }

  .tab-panel {
    padding: 12px;
  }
}
</style> 
