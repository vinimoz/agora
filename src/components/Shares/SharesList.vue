<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@nextcloud/l10n'

import NcModal from '@nextcloud/vue/components/NcModal'

import ShareIcon from 'vue-material-design-icons/ShareVariant.vue'

import { ConfigBox, QrModal } from '../Base/index.ts'
import ShareItem from './ShareItem.vue'
import UserSearch from '../User/UserSearch.vue'
import SharePublicAdd from './SharePublicAdd.vue'
import MarkDownDescription from '../Inquiry/MarkDownDescription.vue'

import { useInquiryStore } from '../../stores/inquiry.ts'
import { useSharesStore, Share } from '../../stores/shares.ts'
import { useSessionStore } from '../../stores/session.ts'
import { showError } from '@nextcloud/dialogs'
import { User } from '../../Types/index.ts'

const inquiryStore = useInquiryStore()
const sharesStore = useSharesStore()
const sessionStore = useSessionStore()

const qrModal = ref(false)
const qrText = ref('')
const configBoxProps = {
  sharesList: {
    name: t('agora', 'Shares'),
  },
}

/**
 *
 * @param share
 */
function openQrModal(share: Share) {
  qrText.value = share.URL
  qrModal.value = true
}

async function addShare(user: User) {
  try {
    await sharesStore.add(user)
  } catch {
    showError(t('agora', 'Error while adding share'))
  }
}
</script>

<template>
  <ConfigBox v-bind="configBoxProps.sharesList">
    <template #icon>
      <ShareIcon />
    </template>

    <UserSearch
      class="add-share"
      :aria-label="t('agora', 'Add shares')"
      :placeholder="t('agora', 'Type to add an individual share')"
      @user-selected="(user: User) => addShare(user)"
    />

    <SharePublicAdd
      v-if="
        sessionStore.appPermissions.publicShares &&
        sessionStore.appPermissions.addSharesExternal
      "
    />

    <div v-if="sharesStore.active.length" class="shares-list shared">
      <TransitionGroup tag="div" name="list" :css="false">
        <ShareItem
          v-for="share in sharesStore.active"
          :key="share.id"
          :share="share"
          @show-qr-code="openQrModal(share)"
        />
      </TransitionGroup>
    </div>

    <NcModal v-if="qrModal" size="small" @close="qrModal = false">
      <QrModal
        :name="inquiryStore.title"
        :description="inquiryStore.description"
        :encode-text="qrText"
        class="modal__content"
      >
        <template #description>
          <MarkDownDescription />
        </template>
      </QrModal>
    </NcModal>
  </ConfigBox>
</template>

<style lang="scss">
.shares-list.shared {
  border-top: 1px solid var(--color-border);
  padding-top: 24px;
  margin-top: 16px;
}
</style>
