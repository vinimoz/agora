<!--
  - SPDX-FileCopyrightText: Nextcloud 2026 
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { IconProps } from './types'
import { computed } from 'vue'

const {
  size = 24,
  supported = false,
} = defineProps<IconProps & { supported?: boolean }>()

const emojiSymbol = computed(() => '👍')

const iconColor = computed(() => 
  supported ? '#facc15' : '#9ca3af'
)

const dynamicTitle = computed(() =>
  supported 
    ? t('agora', 'Supported - click to remove support')
    : t('agora', 'Not supported - click to support')
)
</script>

<template>
  <span
    :aria-label="dynamicTitle"
    class="emoji-thumb-icon"
    :class="{ 
      'supported': supported,
      'not-supported': !supported
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
.emoji-thumb-icon {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
}

.emoji-thumb-icon.supported {
  filter: drop-shadow(0 0 2px rgba(250, 204, 21, 0.3));
}

.emoji-thumb-icon.not-supported {
  opacity: 0.6;
  filter: grayscale(0.8);
}

/* Hover effects */
.emoji-thumb-icon:hover {
  transform: scale(1.1);
}

.emoji-thumb-icon.supported:hover {
  filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.5));
}

.emoji-thumb-icon.not-supported:hover {
  opacity: 0.8;
  filter: grayscale(0.5);
}
</style>
