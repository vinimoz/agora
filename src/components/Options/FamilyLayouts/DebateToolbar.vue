<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="debate-toolbar">
    <div class="toolbar-left">
      <div class="view-group">
        <button
          v-for="view in availableViews"
          :key="view.key"
          class="view-btn"
          :class="{ active: modelValue === view.key }"
          :title="view.label"
          @click="updateView(view.key)"
        >
          <component :is="view.icon" :size="18" />
          <span class="view-label">{{ view.label }}</span>
        </button>
      </div>
    </div>

    <div class="toolbar-right">
      <div class="display-group">
        <button
          v-for="mode in displayModes"
          :key="mode.key"
          class="mode-btn"
          :class="{ active: displayMode === mode.key }"
          :title="mode.label"
          @click="updateDisplayMode(mode.key)"
        >
          <component :is="mode.icon" :size="16" />
        </button>
      </div>

      <div v-if="hasBack" class="toolbar-actions">
        <NcButton type="tertiary" size="small" @click="$emit('back')">
          <template #icon>
            <component :is="InquiryGeneralIcons.Back" :size="16" />
          </template>
        </NcButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryGeneralIcons } from '../../../utils/icons.ts'

// ============================================
// Props
// ============================================

  // eslint-disable-next-line 
const props = defineProps<{
  modelValue: string
  displayMode: string
  availableViews: Array<{ key: string; label: string; icon: string }>
  displayModes: Array<{ key: string; label: string; icon: string }>
  hasBack?: boolean
}>()

// ============================================
// Emits
// ============================================

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:displayMode': [value: string]
  'back': []
}>()

// ============================================
// Methods
// ============================================

const updateView = (key: string) => {
  emit('update:modelValue', key)
}

const updateDisplayMode = (key: string) => {
  emit('update:displayMode', key)
}
</script>

<style scoped lang="scss">
.debate-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 8px;

  .toolbar-left {
    .view-group {
      display: flex;
      gap: 4px;
      background: var(--color-background-darker);
      padding: 4px;
      border-radius: 8px;

      .view-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: none;
        background: transparent;
        border-radius: 6px;
        color: var(--color-text-lighter);
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
          color: var(--color-main-text);
          background: var(--color-background-hover);
        }

        &.active {
          background: var(--color-primary-element);
          color: var(--color-primary-text);

          .view-label {
            color: var(--color-primary-text);
          }
        }

        .view-label {
          font-size: 13px;
          font-weight: 500;

          @media (max-width: 600px) {
            display: none;
          }
        }
      }
    }
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 8px;

    .display-group {
      display: flex;
      gap: 2px;
      background: var(--color-background-darker);
      padding: 4px;
      border-radius: 6px;

      .mode-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 8px;
        border: none;
        background: transparent;
        border-radius: 4px;
        color: var(--color-text-lighter);
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
          color: var(--color-main-text);
          background: var(--color-background-hover);
        }

        &.active {
          background: var(--color-primary-element);
          color: var(--color-primary-text);
        }
      }
    }

    .toolbar-actions {
      display: flex;
      gap: 4px;
    }
  }
}
</style>
