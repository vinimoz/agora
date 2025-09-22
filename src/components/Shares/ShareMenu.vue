<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

import NcActionCaption from '@nextcloud/vue/components/NcActionCaption'
import NcActionInput from '@nextcloud/vue/components/NcActionInput'
import NcActionRadio from '@nextcloud/vue/components/NcActionRadio'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'

import { AxiosError } from '@nextcloud/axios'

import { useSharesStore, Share } from '../../stores/shares.ts'
import { SentResults } from '../../Api/modules/shares.ts'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { ShareIcons } from '../../utils/icons.ts'

const emit = defineEmits(['showQrCode'])

const { share } = defineProps<{ share: Share }>()

const sharesStore = useSharesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const inquiryStore = useInquiryStore()

const isDirectShare = computed(
  () =>
    share.groupId === inquiryGroupsStore.currentInquiryGroup?.id ||
    share.inquiryId === inquiryStore.id
)

const resolving = ref(false)
const label = ref({
  inputValue: '',
  inputProps: {
    success: false,
    error: false,
    showTrailingButton: true,
    labelOutside: false,
    label: t('agora', 'Share label'),
  },
})

const isActivePublicShare = computed(() => !share.deleted && share.type === 'public')

type ButtonProps = {
  activate: boolean
  name: string
  action?: () => void
}

const resendInvitation = computed<ButtonProps>(() => ({
  activate:
    !share.groupId && !share.deleted && (!!share.user.emailAddress || share.type === 'group'),
  name: share.invitationSent
    ? t('agora', 'Resend invitation mail')
    : t('agora', 'Send invitation mail'),
  action: async () => {
    try {
      const result = await sharesStore.sendInvitation({ share })
      if (result?.sentResult) {
        handleInvitationResults(result.sentResult)
      }
    } catch {
      showError(t('agora', 'Error sending invitation'))
    }
  },
}))

function handleInvitationResults(sentResult: SentResults) {
  if (sentResult?.sentMails) {
    sentResult.sentMails.forEach((item) => {
      showSuccess(
        t('agora', 'Invitation sent to {displayName} ({emailAddress})', {
          emailAddress: item.emailAddress,
          displayName: item.displayName,
        })
      )
    })
  }
  if (sentResult?.abortedMails) {
    sentResult.abortedMails.forEach((item) => {
      showError(
        t('agora', 'Error sending invitation to {displayName} ({emailAddress})', {
          emailAddress: item.emailAddress,
          displayName: item.displayName,
        })
      )
    })
  }
}

const resolveGroups = computed<ButtonProps>(() => ({
  activate:
    !share.groupId &&
    !resolving.value &&
    !share.deleted &&
    ['contactGroup', 'circle'].includes(share.type),
  name: t('agora', 'Resolve group into individual invitations'),
  action: async () => {
    if (resolving.value) return

    try {
      resolving.value = true
      await sharesStore.resolveGroup({ share })
    } catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        const message = (error as AxiosError).response?.data as string
        resolveGroupResolveError(message)
        return
      }
    } finally {
      resolving.value = false
    }
  },
}))

function resolveGroupResolveError(message: string) {
  switch (message) {
    case 'Contacts is not enabled':
      return t('agora', 'Resolving of {name} is not possible. The contacts app is not enabled.', {
        name: share.user.displayName,
      })
    case 'Circles is not enabled for this user':
      return t('agora', 'Resolving of {name} is not possible. The circles app is not enabled.', {
        name: share.user.displayName,
      })
    default:
      return t('agora', 'Error resolving {name}.', {
        name: share.user.displayName,
      })
  }
}

const switchAdmin = computed<ButtonProps>(() => ({
  activate: !share.groupId && !share.deleted && (share.type === 'user' || share.type === 'admin'),
  name:
    share.type === 'user'
      ? t('agora', 'Grant administrative inquiry access')
      : t('agora', 'Withdraw administrative inquiry access'),
  action: () => {
    sharesStore.switchAdmin({ share })
  },
}))

const copyLinkButton = computed<ButtonProps>(() => ({
  activate: !share.groupId && !share.deleted && !!share.URL,
  name: t('agora', 'Copy link to clipboard'),
  action: () => {
    try {
      navigator.clipboard.writeText(share.URL)
      showSuccess(t('agora', 'Link copied to clipboard'))
    } catch {
      showError(t('agora', 'Error while copying link to clipboard'))
    }
  },
}))

const showQrCodeButton = computed<ButtonProps>(() => ({
  activate: !share.groupId && !share.deleted && !!share.URL,
  name: t('agora', 'Show QR code'),
  action: () => {
    emit('showQrCode')
  },
}))

const lockShareButton = computed<ButtonProps>(() => ({
  activate: !share.groupId && !share.deleted,
  name: share.locked ? t('agora', 'Unlock share') : t('agora', 'Lock share'),
  action: () => {
    try {
      if (share.locked) {
        sharesStore.unlock({ share })
      } else {
        sharesStore.lock({ share })
      }
    } catch {
      showError(
        t('agora', 'Error while changing lock status of share {displayName}', {
          displayName: share.user.displayName,
        })
      )
    }
  },
}))

const deleteShareButton = computed<ButtonProps>(() => ({
  activate: isDirectShare.value,
  name: share.deleted ? t('agora', 'Restore share') : t('agora', 'Delete share'),
  action: () => {
    try {
      if (share.deleted) {
        sharesStore.restore({ share })
      } else {
        sharesStore.delete({ share })
      }
    } catch {
      showError(
        t('agora', 'Error while changing deleted status of share {displayName}', {
          displayName: share.user.displayName,
        })
      )
    }
  },
}))

onMounted(() => {
  label.value.inputValue = share.label
})

/**
 *
 */
async function submitLabel() {
  sharesStore.writeLabel({
    token: share.token,
    label: label.value.inputValue,
  })
}
</script>

<template>
  <NcActions>
    <NcActionInput
      v-if="isActivePublicShare"
      v-bind="label.inputProps"
      v-model="label.inputValue"
      @submit="submitLabel()"
    >
      <template #icon>
        <component :is="ShareIcons.edit" />
      </template>
    </NcActionInput>

    <NcActionButton
      v-if="resendInvitation.activate"
      close-after-click
      :name="resendInvitation.name"
      :aria-label="resendInvitation.name"
      @click="resendInvitation.action"
    >
      <template #icon>
        <component :is="ShareIcons.sendByMail" />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="resolveGroups.activate"
      close-after-click
      :disabled="resolving"
      :name="resolveGroups.name"
      :aria-label="resolveGroups.name"
      @click="resolveGroups.action"
    >
      <template #icon>
        <component :is="ShareIcons.restore" />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="switchAdmin.activate"
      close-after-click
      :name="switchAdmin.name"
      :aria-label="switchAdmin.name"
      @click="switchAdmin.action"
    >
      <template #icon>
        <component :is="ShareIcons.adminGrant" v-if="share.type === 'user'" />
        <component :is="ShareIcons.adminRevoke" v-else />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="copyLinkButton.activate"
      close-after-click
      :name="copyLinkButton.name"
      :aria-label="copyLinkButton.name"
      @click="copyLinkButton.action"
    >
      <template #icon>
        <component :is="ShareIcons.copyLink" />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="showQrCodeButton.activate"
      close-after-click
      :name="showQrCodeButton.name"
      :aria-label="showQrCodeButton.name"
      @click="showQrCodeButton.action"
    >
      <template #icon>
        <component :is="ShareIcons.qrCode" />
      </template>
    </NcActionButton>

    <NcActionCaption
      v-if="isActivePublicShare"
      :name="t('agora', 'Options for the registration dialog')"
    />

    <NcActionRadio
      v-if="isActivePublicShare"
      name="publicInquiryEmail"
      :value="'optional'"
      :model-value="share.publicInquiryEmail"
      @update:model-value="
        sharesStore.setPublicInquiryEmail({
          share,
          value: 'optional',
        })
      "
    >
      {{ t('agora', 'Email address is optional') }}
    </NcActionRadio>

    <NcActionRadio
      v-if="isActivePublicShare"
      name="publicInquiryEmail"
      :value="'mandatory'"
      :model-value="share.publicInquiryEmail"
      @update:model-value="
        sharesStore.setPublicInquiryEmail({
          share,
          value: 'mandatory',
        })
      "
    >
      {{ t('agora', 'Email address is mandatory') }}
    </NcActionRadio>

    <NcActionRadio
      v-if="isActivePublicShare"
      name="publicInquiryEmail"
      :value="'disabled'"
      :model-value="share.publicInquiryEmail"
      @update:model-value="
        sharesStore.setPublicInquiryEmail({
          share,
          value: 'disabled',
        })
      "
    >
      {{ t('agora', 'Do not ask for an email address') }}
    </NcActionRadio>

    <NcActionButton
      v-if="lockShareButton.activate"
      close-after-click
      :name="lockShareButton.name"
      :aria-label="lockShareButton.name"
      @click="lockShareButton.action"
    >
      <template #icon>
        <component :is="ShareIcons.unlock" v-if="share.locked" />
        <component :is="ShareIcons.lock" v-else />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="deleteShareButton.activate"
      close-after-click
      :name="deleteShareButton.name"
      :aria-label="deleteShareButton.name"
      @click="deleteShareButton.action"
    >
      <template #icon>
        <component :is="ShareIcons.restore" v-if="share.deleted" />
        <component :is="ShareIcons.delete" v-else />
      </template>
    </NcActionButton>
  </NcActions>
</template>

<style lang="scss">
.deleted .user-item .description {
  color: var(--color-error-text);
}

.inquiry-status {
  margin-inline-start: 8px;
  width: 32px;

  &.support {
    color: var(--color-inquiries-foreground-yes);
  }

  &.support {
    color: var(--color-inquiries-foreground-no);
  }
}
</style>
