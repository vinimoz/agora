<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { nextTick, useTemplateRef } from 'vue'
import { t } from '@nextcloud/l10n'
import { useSortable } from '@vueuse/integrations/useSortable'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'

import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import RestoreIcon from 'vue-material-design-icons/Recycle.vue'
import ConfirmIcon from 'vue-material-design-icons/CheckboxBlankOutline.vue'
import UnconfirmIcon from 'vue-material-design-icons/CheckboxMarkedOutline.vue'

import OptionItem from './OptionItem.vue'
import OptionsTextAdd from './OptionsTextAdd.vue'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useOptionsStore } from '../../stores/options.ts'

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const element = useTemplateRef<HTMLElement>('list')

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
  onUpdate: (e: { oldIndex: number; newIndex: number }) => {
    onSort({ oldIndex: e.oldIndex, newIndex: e.newIndex })
    // nextTick required here as moveArrayElement is executed in a microtask
    // so we need to wait until the next tick until that is finished.
    nextTick(() => {
      /* do nothing, wait for nextTick() */
    })
  },
}

useSortable(element, optionsStore.options, dragOptions)

const cssVar = {
  '--content-deleted': `" (${t('agora', 'deleted')})"`,
}

/**
 *
 * @param event
 * @param event.oldIndex
 * @param event.newIndex
 */
function onSort(event: { oldIndex: number; newIndex: number }) {
  optionsStore.changeOrder(event.oldIndex, event.newIndex)
}
</script>

<template>
  <OptionsTextAdd v-if="!inquiryStore.isClosed" />
  <div v-if="optionsStore.options.length" ref="list" :style="cssVar">
    <div v-for="option in optionsStore.options" :key="option.id" class="sortable">
      <OptionItem :key="option.id" :option="option" :draggable="true" show-owner>
        <template v-if="inquiryStore.permissions.edit" #actions>
          <NcActions v-if="!inquiryStore.isClosed" class="action">
            <NcActionButton
              v-if="!option.deleted"
              :name="t('agora', 'Delete option')"
              :aria-label="t('agora', 'Delete option')"
              @click="optionsStore.delete({ option })"
            >
              <template #icon>
                <DeleteIcon />
              </template>
            </NcActionButton>
            <NcActionButton
              v-if="option.deleted"
              :name="t('agora', 'Restore option')"
              :aria-label="t('agora', 'Restore option')"
              @click="optionsStore.restore({ option })"
            >
              <template #icon>
                <RestoreIcon />
              </template>
            </NcActionButton>
            <NcActionButton
              v-if="!option.deleted && !inquiryStore.isClosed"
              :name="
                option.confirmed ? t('agora', 'Unconfirm option') : t('agora', 'Confirm option')
              "
              :aria-label="
                option.confirmed ? t('agora', 'Unconfirm option') : t('agora', 'Confirm option')
              "
              type="tertiary"
              @click="optionsStore.confirm({ option })"
            >
              <template #icon>
                <UnconfirmIcon v-if="option.confirmed" />
                <ConfirmIcon v-else />
              </template>
            </NcActionButton>
          </NcActions>
        </template>
      </OptionItem>
    </div>
  </div>
</template>

<style lang="scss">
.optionAdd {
  display: flex;
}

.newOption {
  margin-inline-start: 40px;
  flex: 1;
  &:empty:before {
    color: grey;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: var(--color-primary-element-hover);
}

.submit-option {
  width: 30px;
  background-color: transparent;
  border: none;
  opacity: 0.3;
  cursor: pointer;
}
</style>
