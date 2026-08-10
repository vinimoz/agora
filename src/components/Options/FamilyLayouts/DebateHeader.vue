<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="debate-header">
    <div class="header-top">
      <div class="header-left">
        <NcButton type="tertiary" size="small" @click="$emit('back')">
          <template #icon>
            <component :is="InquiryGeneralIcons.Back" :size="16" />
          </template>
          {{ t('agora', 'Back to debates') }}
        </NcButton>
      </div>
      <div class="header-right">
        <span class="status-badge" :class="statusClass">
          <span class="status-dot"></span>
          {{ statusLabel }}
        </span>
      </div>
    </div>

    <h1 class="debate-title">{{ question }}</h1>

    <div class="header-metrics">
      <div class="metric-group">
        <div class="metric">
          <component :is="InquiryOptionIcons.Users" :size="16" />
          <span>{{ metrics.participants || 0 }}</span>
          <span class="metric-label">{{ t('agora', 'participants') }}</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric">
          <component :is="InquiryOptionIcons.Comment" :size="16" />
          <span>{{ metrics.arguments || 0 }}</span>
          <span class="metric-label">{{ t('agora', 'arguments') }}</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric">
          <component :is="InquiryOptionIcons.AlertCircle" :size="16" />
          <span>{{ metrics.objections || 0 }}</span>
          <span class="metric-label">{{ t('agora', 'objections') }}</span>
        </div>
      </div>

      <div class="balance-summary">
        <div class="balance-bar">
          <div class="for-bar" :style="{ width: `${balance.for || 50}%` }"></div>
          <div class="against-bar" :style="{ width: `${balance.against || 50}%` }"></div>
        </div>
        <div class="balance-labels">
          <span class="for-label">{{ t('agora', 'For') }} {{ balance.for || 50 }}%</span>
          <span class="against-label">{{ t('agora', 'Against') }} {{ balance.against || 50 }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryGeneralIcons, InquiryOptionIcons } from '../../../utils/icons.ts'

// ============================================
// Props
// ============================================

const props = defineProps<{
  question: string
  status?: string
  // eslint-disable-next-line
  phase?: string
  metrics: {
    participants: number
    arguments: number
    objections: number
  }
  balance: {
    for: number
    against: number
  }
}>()

// ============================================
// Emits
// ============================================

defineEmits<{
  back: []
}>()

// ============================================
// Computed
// ============================================

const statusClass = computed(() => {
  const statusMap: Record<string, string> = {
    'open': 'status-open',
    'closed': 'status-closed',
    'draft': 'status-draft',
    'active': 'status-active',
  }
  return statusMap[props.status || ''] || 'status-open'
})

const statusLabel = computed(() => {
  const labelMap: Record<string, string> = {
    'open': t('agora', 'Open'),
    'closed': t('agora', 'Closed'),
    'draft': t('agora', 'Draft'),
    'active': t('agora', 'Active'),
  }
  return labelMap[props.status || ''] || t('agora', 'Open')
})
</script>

<style scoped lang="scss">
.debate-header {
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  padding: 20px 24px;

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
      }

      &.status-open {
        background: var(--color-success-light);
        color: var(--color-success);

        .status-dot {
          background: var(--color-success);
        }
      }

      &.status-closed {
        background: var(--color-error-light);
        color: var(--color-error);

        .status-dot {
          background: var(--color-error);
        }
      }

      &.status-draft {
        background: var(--color-warning-light);
        color: var(--color-warning);

        .status-dot {
          background: var(--color-warning);
        }
      }

      &.status-active {
        background: var(--color-primary-light);
        color: var(--color-primary-element);

        .status-dot {
          background: var(--color-primary-element);
        }
      }
    }
  }

  .debate-title {
    margin: 0 0 16px 0;
    font-size: 24px;
    font-weight: 700;
    color: var(--color-main-text);
    line-height: 1.3;
  }

  .header-metrics {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    .metric-group {
      display: flex;
      align-items: center;
      gap: 12px;

      .metric {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        font-weight: 500;
        color: var(--color-text-light);

        .metric-label {
          font-weight: 400;
          color: var(--color-text-lighter);
          font-size: 12px;
          margin-left: 2px;
        }
      }

      .metric-divider {
        width: 1px;
        height: 20px;
        background: var(--color-border);
      }
    }

    .balance-summary {
      min-width: 200px;

      .balance-bar {
        display: flex;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
        background: var(--color-background-darker);

        .for-bar {
          background: var(--color-success);
          transition: width 0.6s ease;
        }

        .against-bar {
          background: var(--color-error);
          transition: width 0.6s ease;
        }
      }

      .balance-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
        font-size: 11px;

        .for-label {
          color: var(--color-success);
          font-weight: 500;
        }

        .against-label {
          color: var(--color-error);
          font-weight: 500;
        }
      }
    }
  }
}
</style>
