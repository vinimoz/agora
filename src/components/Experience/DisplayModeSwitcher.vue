<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="display-mode-switcher" :title="t('agora', 'Switch display mode')">
    <button
      v-for="mode in availableModes"
      :key="mode"
      class="mode-button"
      :class="{ active: mode === currentMode }"
      :title="getModeLabel(mode)"
      @click="emit('change', mode)"
    >
      <component :is="getModeIcon(mode)" :size="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { type DisplayMode } from '../../composables/useExperience'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'

defineProps<{
  currentMode: DisplayMode
  availableModes: DisplayMode[]
}>()

const emit = defineEmits<{
  change: [mode: DisplayMode]
}>()

// Only include valid DisplayMode values from experience.types.ts
const modeLabels: Partial<Record<DisplayMode, string>> = {
  cards: t('agora', 'Cards'),
  list: t('agora', 'List'),
  feed: t('agora', 'Feed'),
  tree: t('agora', 'Tree'),
  navigation: t('agora', 'Navigation'),
  timeline: t('agora', 'Timeline'),
  kanban: t('agora', 'Kanban'),
  book: t('agora', 'Book'),
  widget: t('agora', 'Widget'),
  tool: t('agora', 'Tool'),
}

const modeIcons: Partial<Record<DisplayMode, any>> = {
  cards: Icons.Grid,
  list: Icons.List,
  feed: Icons.Activity,
  tree: Icons.FolderTree,
  navigation: Icons.Navigation,
  timeline: Icons.Clock,
  kanban: Icons.Board,
  book: Icons.Book,
  widget: Icons.Widget,
  tool: Icons.Tool,
}

function getModeLabel(mode: DisplayMode): string {
  return modeLabels[mode] || mode
}

function getModeIcon(mode: DisplayMode) {
  return modeIcons[mode] || Icons.Grid
}
</script>

<style lang="scss" scoped>
.display-mode-switcher {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-background-dark);
  border-radius: 10px;
  border: 1px solid var(--color-border);
}

.mode-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-lighter);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-main-text);
    background: var(--color-background-hover);
  }

  &.active {
    color: white;
    background: var(--color-primary-element);
    box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.3);
  }
}
</style>
