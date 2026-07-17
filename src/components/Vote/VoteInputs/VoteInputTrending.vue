<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-trending">
    <div class="trending-info">
      <TrendingUp :size="14" />
      <span class="trend-score">{{ displayScore }}</span>
      <span class="trend-label">{{ t('agora', 'trending score') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { TrendingUp } from 'lucide-vue-next'
import type { SupportData, Option } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: Option
  userVote?: SupportData
}>()

const displayScore = computed(() => {
  // If userVote contains a score, display it; otherwise show a placeholder
  if (props.userVote?.value && typeof props.userVote.value === 'number') {
    return props.userVote.value.toFixed(1)
  }
  return '—'
})
</script>

<style scoped lang="scss">
.vote-input-trending {
  .trending-info {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--color-background-dark);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;

    .trend-score {
      font-weight: 600;
      color: var(--color-primary-element);
    }

    .trend-label {
      color: var(--color-text-lighter);
    }
  }
}
</style>
