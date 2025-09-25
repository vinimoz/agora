<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
// import ComboInquirySelect from './ComboInquirySelectView.vue'
import UserItem from '../User/UserItem.vue'
import { useComboStore } from '../../stores/combo.ts'
import { ViewMode } from '../../Types/index.ts'

const { viewMode } = defineProps<{ viewMode: ViewMode }>()

const comboStore = useComboStore()
</script>

<template>
  <div :class="['combo-table', viewMode]">
    <div class="user-column">
      <div class="spacer" />
      <div
        v-for="inquiry in comboStore.inquiries"
        :key="inquiry.id"
        :title="inquiry.title"
        class="inquiry-group"
      >
        <div
          v-for="participant in comboStore.participantsInInquiry(inquiry.id)"
          :key="`${participant.user.id}_${participant.inquiryId}`"
          class="participant"
        >
          <UserItem v-bind="participant" condensed />
        </div>
      </div>
    </div>

    <TransitionGroup name="list" tag="div" class="inquiry-grid">
      <!--	<InquiryColumn
				v-for="option in comboStore.uniqueOptions"
				:key="option.id"
				:option="option" />-->
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.combo-title {
  margin-bottom: 16px;
}

.combo-table {
  display: flex;
  flex: 1;

  .spacer {
    flex: 1;
  }

  .inquiry-group {
    display: flex;
    flex-direction: column;
  }

  .participant,
  .inquiry-item {
    flex: 0 0 auto;
    height: 4.5em;
    line-height: 1.5em;
    padding: 4px;
    border-top: solid 1px var(--color-border-dark);
  }

  .user-column {
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    margin-bottom: 4px;
    .participant {
      display: flex;
      max-width: 245px;
    }
  }

  .inquiry-grid {
    display: flex;
    flex: 1;
    overflow-x: scroll;
  }

  .user-column::after,
  .inquiry-column::after {
    content: '';
    height: 8px;
  }
}
</style>
