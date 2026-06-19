<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="cards-layout">
    <!-- Cards grid -->
    <div class="options-grid">
      <OptionCard
        v-for="option in options"
        :key="option.id"
        :option="option"
        :inquiry-id="inquiryId"
        @click="$emit('openDetail', option)"
      />
    </div>

    <!-- Empty state -->
    <div v-if="options.length === 0" class="empty-state">
      <component :is="getFamilyIcon()" :size="48" />
      <h4>{{ t('agora', 'No options yet') }}</h4>
      <p>{{ t('agora', 'Be the first to contribute') }}</p>
      
      <!-- Quick add buttons for this family -->
      <div v-if="optionTypes.length > 0" class="quick-add-actions">
        <NcButton
          v-for="type in optionTypes"
          :key="type.option_type"
          type="secondary"
          @click="$emit('addOption', type.option_type)"
        >
          <template #icon>
            <component :is="getOptionTypeIcon(type.option_type)" :size="16" />
          </template>
          {{ type.label }}
        </NcButton>
      </div>
    </div>

    <!-- View mode toggle (optional) -->
    <div v-if="options.length > 0 && hasMultipleViewModes" class="view-mode-toggle">
      <NcButton
        :type="viewMode === 'grid' ? 'primary' : 'tertiary'"
        @click="viewMode = 'grid'"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Grid" :size="18" />
        </template>
      </NcButton>
      <NcButton
        :type="viewMode === 'list' ? 'primary' : 'tertiary'"
        @click="viewMode = 'list'"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.List" :size="18" />
        </template>
      </NcButton>
      <NcButton
        :type="viewMode === 'compact' ? 'primary' : 'tertiary'"
        @click="viewMode = 'compact'"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Collapse" :size="18" />
        </template>
      </NcButton>
    </div>

    <!-- List view alternative -->
    <div v-if="viewMode === 'list'" class="list-view">
      <div class="options-list">
        <OptionCard
          v-for="option in options"
          :key="option.id"
          :option="option"
          :showAction="true"
          :inquiry-id="inquiryId"
          :compact="false"
          :detailed="true"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>

    <!-- Compact view -->
    <div v-else-if="viewMode === 'compact'" class="compact-view">
      <div class="options-compact">
        <OptionCard
          v-for="option in options"
          :key="option.id"
          :option="option"
          :inquiry-id="inquiryId"
          :compact="true"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'
import { 
  getFamilyIconComponent, 
  getOptionTypeIconComponent 
} from '../../../helpers/modules/InquiryOptionHelper'

import type { InquiryOptionType, Option , OptionFamily } from '../../Types/index.ts'

const props = defineProps<{
  options: Option[]
  family: OptionFamily
  inquiryId: number
  optionTypes: InquiryOptionType[]
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  'addOption': [optionType: string]
  'openDetail': [option: Option]
  'option-updated': [option: Option]
  'option-deleted': [optionId: number]
}>()

// View mode state
const viewMode = ref<'grid' | 'list' | 'compact'>('grid')

// Check if family supports multiple view modes
const hasMultipleViewModes = computed(() => 
  // You can check family.config?.viewModes or default to true for cards layout
   props.family?.ui?.viewModes?.length > 1 || true
)

// Get family icon
const getFamilyIcon = () => getFamilyIconComponent(props.family?.key || 'default')

// Get option type icon
const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, [])
</script>

<style scoped lang="scss">
.cards-layout {
  position: relative;

  .view-mode-toggle {
    position: absolute;
    top: -48px;
    right: 0;
    display: flex;
    gap: 4px;
    background: var(--color-background-dark);
    padding: 4px;
    border-radius: 8px;
    z-index: 5;
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .options-compact {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: var(--color-background-dark);
    border: 2px dashed var(--color-border);
    border-radius: 16px;

    svg {
      color: var(--color-text-lighter);
      margin-bottom: 20px;
    }

    h4 {
      margin: 0 0 8px 0;
      color: var(--color-main-text);
      font-size: 18px;
    }

    p {
      margin: 0 0 24px 0;
      color: var(--color-text-lighter);
      font-style: italic;
    }

    .quick-add-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}

@media (max-width: 768px) {
  .cards-layout {
    .view-mode-toggle {
      position: static;
      margin-bottom: 16px;
      justify-content: center;
    }

    .options-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
