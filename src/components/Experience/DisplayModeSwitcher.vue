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

const modeLabels: Record<DisplayMode, string> = {
  cards: t('agora', 'Cards'),
  list: t('agora', 'List'),
  grid: t('agora', 'Grid'),
  feed: t('agora', 'Feed'),
  timeline: t('agora', 'Timeline'),
  kanban: t('agora', 'Kanban'),
  map: t('agora', 'Map'),
  wiki: t('agora', 'Wiki'),
  full: t('agora', 'Full'),
  compact: t('agora', 'Compact'),
  summary: t('agora', 'Summary'),
  horizontal: t('agora', 'Horizontal'),
  split: t('agora', 'Split')
}

const modeIcons: Record<DisplayMode, any> = {
  cards: Icons.Grid,
  list: Icons.List,
  grid: Icons.Grid,
  feed: Icons.Activity,
  timeline: Icons.Clock,
  kanban: Icons.Board,
  map: Icons.MapPin,
  wiki: Icons.Book,
  full: Icons.Maximize,
  compact: Icons.Collapse,
  summary: Icons.FileText,
  horizontal: Icons.AlignHorizontal,
  split: Icons.Columns
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
