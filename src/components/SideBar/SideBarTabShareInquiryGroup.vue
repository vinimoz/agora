<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

import { useSharesStore } from '../../stores/shares.ts'

import SharesList from '../Shares/SharesListInquiryGroup.vue'
import { t } from '@nextcloud/l10n'

const sharesStore = useSharesStore()
const infoText = t(
  'inquiries',
  'Shares for a inquiry group grant voting access to the inquiries contained in the inquiry group.'
)

onMounted(() => {
  sharesStore.load('inquiryGroup')
})

onBeforeRouteUpdate(async () => {
  sharesStore.load('inquiryGroup')
})
</script>

<template>
  <div class="sidebar-share">
    <div>
      {{
        t(
          'inquiries',
          'Shares for a inquiry group grant voting access to the inquiries contained in the inquiry group.'
        )
      }}
    </div>
    <SharesList class="shares effective" :info="infoText" />
  </div>
</template>

<style lang="scss">
.sidebar-share {
  display: flex;
  flex-direction: column;
}

.shares-list {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  padding-top: 8px;

  > li {
    display: flex;
    align-items: stretch;
    margin: 4px 0;
  }
}

.share-item {
  display: flex;
  flex: 1;
  align-items: center;
  max-width: 100%;
}

.share-item__description {
  flex: 1;
  min-width: 50px;
  color: var(--color-text-maxcontrast);
  padding-inline-start: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
