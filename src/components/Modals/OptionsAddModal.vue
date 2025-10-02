<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import NcModal from '@nextcloud/vue/components/NcModal'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'

import DateInquiryIcon from 'vue-material-design-icons/CalendarBlank.vue'


import { useInquiryStore } from '../../stores/inquiry'
import { Event } from '../../Types'

const inquiryStore = useInquiryStore()
const showModal = ref(false)
const caption = t('agora', 'Add date option')

onMounted(() => {
  subscribe(Event.AddDate, () => {
    showModal.value = true
  })
})

onUnmounted(() => {
  unsubscribe(Event.AddDate, () => {})
})
</script>

<template>
  <NcModal v-model:show="showModal" :name="caption" size="large">
    <div class="screen-container">
      <div v-if="!inquiryStore.isClosed" class="edit-container">
        <OptionsDateAddDialog />
      </div>
      <NcEmptyContent
        v-else
        :name="t('agora', 'This inquiry is closed.')"
        :description="t('agora', 'Adding options is disabled')"
      >
        <template #icon>
          <DateInquiryIcon />
        </template>
      </NcEmptyContent>
      <div class="info-container">
        <h2>{{ t('agora', 'Existing options') }}</h2>
        <OptionsDate />
      </div>
    </div>
  </NcModal>
</template>

<style lang="scss">
.modal-container__content {
  padding: 3rem 1.6rem 1rem;
}

.screen-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  overflow: hidden;

  h2 {
    display: inline-block;
  }

  .edit-container {
    flex: 2 1 22rem;
    > div {
      background-color: var(--container-background-light);
      padding: 0 0.5rem;
    }
    > div:first-child {
      border-radius: var(--border-radius-container-large) var(--border-radius-container-large) 0 0;
    }
    > div:last-child {
      border-radius: 0 0 var(--border-radius-container-large) var(--border-radius-container-large);
    }
  }

  .info-container {
    flex: 1 0 10rem;
    min-width: fit-content;
  }
}
</style>
