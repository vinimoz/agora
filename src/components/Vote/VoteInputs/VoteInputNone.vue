<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-none">
    <span class="none-badge">
      <EyeOff :size="14" />
      {{ t('agora', 'No voting method') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { EyeOff } from 'lucide-vue-next'
</script>

<style scoped lang="scss">
.vote-input-none {
  .none-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: var(--color-background-dark);
    border-radius: 20px;
    font-size: 11px;
    color: var(--color-text-lighter);
  }
}
</style>
