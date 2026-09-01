<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { emit } from '@nextcloud/event-bus'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionCheckbox from '@nextcloud/vue/components/NcActionCheckbox'
import NcActionInput from '@nextcloud/vue/components/NcActionInput'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'

// Icons from icons.ts
import { UserIcons, StatusIcons, InquiryGeneralIcons } from '../../../utils/icons.ts'

import { ValidatorAPI, InquiriesAPI } from '../../../Api/index.ts'
import { useSessionStore } from '../../../stores/session.ts'
import { useSubscriptionStore } from '../../../stores/subscription.ts'
import { useInquiriesStore } from '../../../stores/inquiries.ts'
import { useInquiryStore } from '../../../stores/inquiry.ts'
import { StatusResults, Event } from '../../../Types/index.ts'
import { deleteCookieByValue, findCookieByValue } from '../../../helpers/index.ts'
import { canArchive, canRestore, canDelete, canTransfer, createInquiryContext } from '../../../utils/permissions.ts'
import UserBubble from '../../User/UserBubble.vue'
import DeleteInquiryDialog from '../../Modals/DeleteInquiryDialog.vue'
import TransferInquiryDialog from '../../Modals/TransferInquiryDialog.vue'
import ArchiveRestoreInquiryDialog from '../../Modals/ArchiveRestoreInquiryDialog.vue'

type InputProps = {
  success: boolean
  error: boolean
  showTrailingButton: boolean
  labelOutside: boolean
  label: string
}

// ---- Stores ----
const sessionStore = useSessionStore()
const subscriptionStore = useSubscriptionStore()
const inquiriesStore = useInquiriesStore()
const inquiryStore = useInquiryStore()
const router = useRouter()

// ---- State ----
const showDeleteDialog = ref(false)
const showTransferDialog = ref(false)
const showArchiveRestoreDialog = ref(false)
const isNavigating = ref(false)

// ---- Computed ----
const hasCookie = !!findCookieByValue(sessionStore.publicToken)
const isExternalShare = computed(() => sessionStore.share?.type === 'external')
const hasEmail = computed(() => !!sessionStore.share?.user?.emailAddress)
const displayName = computed(() => sessionStore.share?.user?.displayName || sessionStore.currentUser?.displayName || 'User')
const isSubscribed = computed(() => subscriptionStore.subscribed)
const context = computed(() => createInquiryContext(inquiryStore, sessionStore.appSettings))

// Permissions
const canArchiveAction = computed(() => canArchive(context.value))
const canRestoreAction = computed(() => canRestore(context.value))
const canDeleteAction = computed(() => canDelete(context.value))
const canTransferAction = computed(() => canTransfer(context.value))

// ---- User Actions ----
function logout() {
  const reRouteTo = deleteCookieByValue(sessionStore.publicToken)
  if (reRouteTo) {
    router.push({
      name: 'publicInquiry',
      params: { token: reRouteTo },
    })
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

async function deleteEmailAddress() {
  try {
    await sessionStore.deleteEmailAddress()
    showSuccess(t('agora', 'Email address deleted'))
  } catch {
    showError(t('agora', 'Error deleting email address'))
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

// ---- Subscription ----
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

// ---- Inquiry Actions ----
async function toggleArchive() {
  try {
    await inquiriesStore.toggleArchive({ inquiryId: inquiryStore.id })
    showSuccess(t('agora', 'Inquiry archived'))
  } catch {
    showError(t('agora', 'Error archiving the inquiry'))
  }
}

async function resetInquiries() {
  try {
    await inquiriesStore.resetInquiries()
    showSuccess(t('agora', 'Your inquiries are reset'))
  } catch {
    showError(t('agora', 'Error while resetting inquiries'))
  }
}

async function getAddresses() {
  try {
    const response = await InquiriesAPI.getParticipantsEmailAddresses(sessionStore.route.params.id)
    await navigator.clipboard.writeText(response.data.map((item) => item.combined).join(', '))
    showSuccess(t('agora', 'Email addresses copied to clipboard'))
  } catch (error) {
    if ((error as Error)?.message?.includes('canceled')) return
    showError(t('agora', 'Error while copying email addresses'))
  }
}

const onInquiryDeleted = () => {
  showSuccess(t('agora', 'Inquiry successfully deleted'))
  emit(Event.UpdateInquiry, { store: 'inquiries', message: t('agora', 'Inquiry deleted') })
  router.push({
    name: 'list',
    params: { type: 'relevant' },
    query: { viewMode: 'view' }
  }).finally(() => {
    isNavigating.value = false
  })
}
</script>

<template>
  <div class="unified-actions">
    <!-- User Section -->
    <div class="action-section user-section">
      <NcActions class="actions-list" :force-menu="true">
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

    <!-- Subscription Section -->
    <div class="action-section subscription-section">
      <div class="section-header">
        <component :is="InquiryGeneralIcons.Bell" :size="16" />
        <span class="section-title">{{ t('agora', 'Notifications') }}</span>
      </div>

      <NcActions class="actions-list" :force-menu="true">
        <NcActionCheckbox
          v-if="inquiryStore.permissions.subscribe"
          :model-value="isSubscribed"
          @change="toggleSubscription"
        >
          <template #icon>
            <component :is="isSubscribed ? InquiryGeneralIcons.Bell : InquiryGeneralIcons.BellOutline" :size="20" />
          </template>
          {{ isSubscribed ? t('agora', 'Unsubscribe') : t('agora', 'Subscribe') }}
        </NcActionCheckbox>
      </NcActions>
    </div>

    <!-- Inquiry Actions Section -->
    <div class="action-section inquiry-actions-section">
      <div class="section-header">
        <component :is="InquiryGeneralIcons.Tools" :size="16" />
        <span class="section-title">{{ t('agora', 'Inquiry') }}</span>
      </div>

      <NcActions class="actions-list" :force-menu="true">
        <!-- Archive -->
        <NcActionButton          v-if="canArchiveAction"
          :name="t('agora', 'Archive inquiry')"
          @click="toggleArchive()"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Archive" :size="24" />
          </template>
        </NcActionButton>

        <!-- Restore -->
        <NcActionButton
          v-if="canRestoreAction"
          :name="t('agora', 'Restore inquiry')"
          @click="showArchiveRestoreDialog = true"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Restore" :size="24" />
          </template>
        </NcActionButton>

        <!-- Delete -->
        <NcActionButton
          v-if="canDeleteAction"
          class="danger"
          :name="t('agora', 'Delete inquiry')"
          @click="showDeleteDialog = true"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Delete" :size="24" />
          </template>
        </NcActionButton>

        <!-- Transfer -->
        <NcActionButton
          v-if="canTransferAction"
          class="danger"
          :name="t('agora', 'Transfer ownership')"
          @click="showTransferDialog = true"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Transfer" :size="24" />
          </template>
        </NcActionButton>

        <NcActionSeparator v-if="inquiryStore.permissions.edit" />

        <!-- Copy emails -->
        <NcActionButton
          v-if="inquiryStore.permissions.edit"
          :name="t('agora', 'Copy participant emails')"
          @click="getAddresses()"
        >
          <template #icon>
            <component :is="StatusIcons.EmailIcon" />
          </template>
        </NcActionButton>

        <!-- Reset inquiries -->
        <NcActionButton
          v-if="inquiryStore.viewMode === 'list-view'"
          :name="t('agora', 'Reset your inquiries')"
          @click="resetInquiries()"
        >
          <template #icon>
            <component :is="UserIcons.Reset" />
          </template>
        </NcActionButton>
      </NcActions>
    </div>

    <!-- Dialogs -->
    <TransferInquiryDialog
      v-model="showTransferDialog"
      :inquiry="inquiryStore"
      @close="showTransferDialog = false"
    />

    <ArchiveRestoreInquiryDialog
      v-model="showArchiveRestoreDialog"
      :inquiry="inquiryStore"
      @close="showArchiveRestoreDialog = false"
    />

    <DeleteInquiryDialog
      v-model="showDeleteDialog"
      :inquiry="inquiryStore"
      @close="showDeleteDialog = false"
      @deleted="onInquiryDeleted"
    />
  </div>
</template>

<style scoped lang="scss">
.unified-actions {
  width: 100%;
}

.action-section {
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0 8px 0;

  .section-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-lighter);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--color-background-dark);
  border-radius: 8px;
  margin-bottom: 8px;

  .user-info-text {
    display: flex;
    flex-direction: column;
    min-width: 0;

    .user-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--color-main-text);
    }

    .user-email {
      font-size: 12px;
      color: var(--color-text-lighter);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.actions-list {
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

      &.danger {
        color: var(--color-error);

        &:hover {
          background: var(--color-error-light);
        }
      }
    }

    .action-item__icon {
      margin-right: 8px;
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
</style>
