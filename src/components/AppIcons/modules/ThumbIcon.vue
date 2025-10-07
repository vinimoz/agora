<!--
  - SPDX-FileCopyrightText: Nextcloud 2026 
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { IconProps } from './types'

const {
  title = t('agora', 'Support status'),
  fillColor = '#9ca3af',
  size = 24,
  supported = false,
} = defineProps<IconProps & { supported?: boolean }>()
</script>

<template>
  <span
    :aria-hidden="!title"
    :aria-label="title"
    class="material-design-icon agora-thumb-icon"
    role="img"
  >
    <svg
      :fill="supported ? '#facc15' : fillColor"
      :stroke="supported ? '#facc15' : fillColor"
      class="material-design-icon__svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 21h4V9H2v12zM22 10c0-1.1-.9-2-2-2h-5.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h7c.74 0 1.38-.4 1.73-1.03l3.58-6.49c.11-.19.18-.41.18-.65v-3.5l-.01-.01L22 10z"
      />
    </svg>
  </span>
</template>

<style scoped>
.agora-thumb-icon {
  display: inline-block;
  vertical-align: middle;
  transition: fill 0.3s ease;
}

.material-design-icon__svg {
  pointer-events: none;
}
</style>
