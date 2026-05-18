!--
  - SPDX-FileCopyrightText: Nextcloud 2026
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { IconProps } from './types'
import { computed } from 'vue'

const {
  size = 24,
  supportValue = null, 
} = defineProps<IconProps & { supportValue?: number | null }>()

const emojiSymbol = computed(() => {
  if (supportValue === 1) return '👍'
  if (supportValue === 0) return '😐'
  if (supportValue === -1) return '👎'
  return '👍' // no participation → grey thumb up
})

const iconColor = computed(() => {
  if (supportValue === 1) return '#facc15' // yellow
  if (supportValue === 0) return '#facc15' // yellow
  if (supportValue === -1) return '#facc15' // yellow
  return '#9ca3af' // solid grey for null
})

const dynamicTitle = computed(() => {
  if (supportValue === 1) return t('agora', 'Support - Click for neutral')
  if (supportValue === -1) return t('agora', 'Against - Click to remove participation')
  if (supportValue === 0) return t('agora', 'Neutral - Click for against')
  return t('agora', 'No participation - Click for support')
})
</script>

<template>
  <span
    :aria-label="dynamicTitle"
    class="emoji-support-icon"
    :class="{ 
      'against': supportValue === -1,
      'neutral': supportValue === 0,
      'support': supportValue === 1,
      'no-participation': supportValue === null
    }"
    role="img"
    :title="dynamicTitle"
    :style="{
      color: iconColor,
      fontSize: `${size}px`,
      lineHeight: `${size}px`,
    }"
  >
    {{ emojiSymbol }}
  </span>
</template>

<style scoped>
.emoji-support-icon {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
}

.emoji-support-icon.against {
  transform: scaleX(-1);
}

.emoji-support-icon.neutral {
  opacity: 1;
}

.emoji-support-icon.support {
  opacity: 1;
}

/* Null state: solid grey, no transparency or grayscale */
.emoji-support-icon.no-participation {
  opacity: 1;
  filter: none;
  color: #9ca3af;
}

/* Hover effects */
.emoji-support-icon:hover {
  transform: scale(1.1);
}

.emoji-support-icon.against:hover {
  transform: scaleX(-1) scale(1.1);
}

.emoji-support-icon.no-participation:hover {
  opacity: 1;
  filter: none;
  transform: scale(1.1);
}
</style>
