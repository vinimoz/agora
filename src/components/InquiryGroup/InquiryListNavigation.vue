<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-navigation-list">
    <div class="nav-header">
      <span class="nav-title">{{ t('agora', 'Inquiries') }}</span>
      <span class="nav-count">{{ inquiries.length }}</span>
    </div>
    <div class="nav-list">
      <div
        v-for="inquiry in inquiries"
        :key="inquiry.id"
        class="nav-item"
        @click="handleClick(inquiry)"
      >
        <div class="nav-item-icon">
          <component :is="getTypeIcon(inquiry.type)" :size="16" />
        </div>
        <div class="nav-item-content">
          <span class="nav-item-title">{{ inquiry.title }}</span>
          <span class="nav-item-meta">
            {{ inquiry.owner?.displayName || inquiry.ownedGroup }}
          </span>
        </div>
        <span v-if="inquiry.status?.countComments" class="nav-item-badge">
          {{ inquiry.status.countComments }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types'

const props = defineProps<{
  inquiries: Inquiry[]
}>()

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

const sessionStore = useSessionStore()

function getTypeIcon(type: string) {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.icon || 'div'
}

function handleClick(inquiry: Inquiry) {
  emit('click', inquiry)
}
</script>

<style lang="scss" scoped>
.inquiry-navigation-list {
  background: var(--color-main-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--color-background-dark);
  border-bottom: 1px solid var(--color-border);

  .nav-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--color-main-text);
  }

  .nav-count {
    font-size: 12px;
    font-weight: 500;
    background: var(--color-background-darker);
    padding: 0 10px;
    border-radius: 12px;
    color: var(--color-text-lighter);
  }
}

.nav-list {
  padding: 4px 0;
  max-height: 400px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-background-hover);
  }

  .nav-item-icon {
    flex-shrink: 0;
    color: var(--color-text-lighter);
  }

  .nav-item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;

    .nav-item-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--color-main-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-item-meta {
      font-size: 11px;
      color: var(--color-text-lighter);
    }
  }

  .nav-item-badge {
    font-size: 11px;
    font-weight: 600;
    background: var(--color-background-dark);
    padding: 1px 8px;
    border-radius: 10px;
    color: var(--color-text-lighter);
  }
}
</style>
