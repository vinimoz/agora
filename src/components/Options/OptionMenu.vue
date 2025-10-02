<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcModal from '@nextcloud/vue/components/NcModal'

import CloneDateIcon from 'vue-material-design-icons/CalendarMultiple.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import RestoreIcon from 'vue-material-design-icons/Recycle.vue'
import ConfirmIcon from 'vue-material-design-icons/CheckboxBlankOutline.vue'
import UnconfirmIcon from 'vue-material-design-icons/CheckboxMarkedOutline.vue'

import OptionCloneDate from './OptionCloneDate.vue'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useOptionsStore, Option } from '../../stores/options.ts'

interface Props {
  option: Option
}

const { option = false } = defineProps<Props>()

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()

const cloneModal = ref(false)

const deleteOrRestoreStaticText = computed(() =>
  option.deleted ? t('agora', 'Restore option') : t('agora', 'Delete option')
)

const deleteAllowed = computed(
  () => (option.isOwner || inquiryStore.permissions.edit) && !inquiryStore.isClosed
)
const confirmAllowed = computed(
  () => !option.deleted && inquiryStore.isClosed && inquiryStore.permissions.edit
)
const cloneAllowed = computed(
  () => !option.deleted && !inquiryStore.isClosed && inquiryStore.permissions.edit
)

/**
 *
 */
function cloneOptionModal() {
  cloneModal.value = true
}

/**
 *
 */
function deleteRestoreOption() {
  if (option.deleted) {
    optionsStore.restore({ option })
    return
  }
  optionsStore.delete({ option })
}

/**
 *
 */
function confirmOption() {
  optionsStore.confirm({ option })
}
</script>

<template>
  <NcActions class="option-menu">
    <NcActionButton
      v-if="deleteAllowed"
      :name="deleteOrRestoreStaticText"
      close-after-click
      @click="deleteRestoreOption()"
    >
      <template #icon>
        <DeleteIcon v-if="!option.deleted" />
        <RestoreIcon v-else />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="cloneAllowed"
      :name="t('agora', 'Clone option')"
      close-after-click
      @click="cloneOptionModal()"
    >
      <template #icon>
        <CloneDateIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      v-if="confirmAllowed"
      :name="option.confirmed ? t('agora', 'Unconfirm option') : t('agora', 'Confirm option')"
      close-after-click
      @click="confirmOption()"
    >
      <template #icon>
        <UnconfirmIcon v-if="option.confirmed" />
        <ConfirmIcon v-else />
      </template>
      {{ option.confirmed ? t('agora', 'Unconfirm option') : t('agora', 'Confirm option') }}
    </NcActionButton>

    <NcActionButton
      v-if="useSort && inquiryStore.permissions.edit"
      close-after-click
      :name="t('agora', 'Sort')"
      @click="inquirieStore.setSort({ optionId: option.id })"
    >
      <template #icon>
        <OptionSortIcon />
      </template> </NcActionButton
    >-->
  </NcActions>

  <NcModal v-if="cloneModal" size="small" no-close>
    <OptionCloneDate :option="option" class="modal__content" @close="cloneModal = false" />
  </NcModal>
</template>
