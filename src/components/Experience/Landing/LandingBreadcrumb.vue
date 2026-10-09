<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <nav class="landing-breadcrumb" :aria-label="t('agora', 'Breadcrumb')">
    <button
      type="button"
      class="crumb crumb--home"
      @click="goHome"
    >
      <component :is="Icons.Home" :size="14" />
      <span>{{ t('agora', 'Home') }}</span>
    </button>

    <template v-if="label">
      <span class="crumb-separator" aria-hidden="true">›</span>
      <span class="crumb crumb--current">{{ label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'

defineProps<{
  /**
   * Human-readable label of the current landing section.
   * Leave empty to show only the Home button.
   */
  label?: string
}>()

const router = useRouter()

function goHome() {
  router.push({ name: 'home' })
}
</script>

<style lang="scss" scoped>
.landing-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-lighter);
  margin-bottom: 4px;

  .crumb {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 6px;
    background: transparent;
    border: none;
    font: inherit;
    color: inherit;

    &--home {
      cursor: pointer;
      transition: color 0.15s ease, background 0.15s ease;

      &:hover {
        color: var(--color-primary-element);
        background: var(--color-background-hover);
      }
    }

    &--current {
      font-weight: 600;
      color: var(--color-main-text);
      cursor: default;
    }
  }

  .crumb-separator {
    color: var(--color-text-maxcontrast);
    font-weight: 400;
    user-select: none;
  }
}
</style>
