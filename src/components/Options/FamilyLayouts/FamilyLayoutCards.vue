<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="cards-layout">
    <!-- grid -->
    <div v-if="viewMode === 'grid'" class="options-grid">
      <ItemCard
        v-for="item in filtered"
        :key="`${item.kind}-${item.id}`"
        :item="item"
        :parent-id="parentId"
	:target-type="targetType"
	:family-type="familyKey"
        @click="emit('openDetail', item)"
      />
    </div>

    <!-- list -->
    <div v-else-if="viewMode === 'list'" class="options-list">
      <ItemCard
        v-for="item in filtered"
        :key="`${item.kind}-${item.id}`"
        :item="item"
        :parent-id="parentId"
	:target-type="targetType"
	:family-type="familyKey"
        @click="emit('openDetail', item)"
      />
    </div>

    <!-- compact -->
    <div v-else class="options-compact">
      <ItemCard
        v-for="item in filtered"
        :key="`${item.kind}-${item.id}`"
        :item="item"
        :parent-id="parentId"
	:target-type="targetType"
	:family-type="familyKey"
        @click="emit('openDetail', item)"
      />
    </div>

    <!-- empty -->
    <div v-if="items.length === 0" class="empty-state">
      <component :is="getFamilyIcon()" :size="48" />
      <h4>{{ t('agora', 'No options yet') }}</h4>
      <p>{{ t('agora', 'Be the first to contribute') }}</p>

      <div v-if="optionTypes.length > 0" class="quick-add-actions">
        <NcButton
          v-for="type in optionTypes"
          :key="type.option_type"
          type="secondary"
          @click="emit('addOption', type.option_type)"
        >
          <template #icon>
            <component :is="getOptionTypeIcon(type.option_type)" :size="16" />
          </template>
          {{ type.label }}
        </NcButton>
      </div>
    </div>

    <!-- view toggle -->
    <div v-if="items.length > 0 && hasMultipleViewModes" class="view-mode-toggle">
      <NcButton :type="viewMode === 'grid' ? 'primary' : 'tertiary'" @click="viewMode = 'grid'">
        <template #icon><component :is="InquiryOptionIcons.Grid" :size="18" /></template>
      </NcButton>
      <NcButton :type="viewMode === 'list' ? 'primary' : 'tertiary'" @click="viewMode = 'list'">
        <template #icon><component :is="InquiryOptionIcons.List" :size="18" /></template>
      </NcButton>
      <NcButton :type="viewMode === 'compact' ? 'primary' : 'tertiary'" @click="viewMode = 'compact'">
        <template #icon><component :is="InquiryOptionIcons.Collapse" :size="18" /></template>
      </NcButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import ItemCard from '../../FamilyLayouts/ItemCard.vue'
import {
  getFamilyIconComponent,
  getOptionTypeIconComponent,
} from '../../../helpers/modules/InquiryOptionHelper'
import type { Item, InquiryOptionType, OptionFamily } from '../../Types/index.ts'
import { getItemsForFamily } from '../../../helpers/modules/itemHelpers'

const props = defineProps<{
  items: Item[]
  family?: OptionFamily | null
  parentId: number
  targetType: 'option' | 'inquiry'
  optionTypes: InquiryOptionType[]
  familyOptionTypes?: InquiryOptionType[]
  familyKey?: string
  isReadonly?: boolean
  appSettings?: Record<string, unknown>
}>()

const emit = defineEmits<{
  addOption: [optionType: string, parentId?: number]
  openDetail: [item: Item]
  optionUpdated: [item: Item]
  optionDeleted: [itemId: number]
}>()

const familyKey = computed(() => props.familyKey ?? props.family?.family_type ?? '')

const filtered = computed(() =>
  getItemsForFamily(props.items, familyKey.value)
)

// Debug
console.log('[Cards] familyKey =', familyKey.value, '| items =', props.items.length, '| filtered =', filtered.value.length)

const viewMode = ref<'grid' | 'list' | 'compact'>('grid')

const hasMultipleViewModes = computed(() =>
  (props.family?.ui as any)?.viewModes?.length > 1
)

const getFamilyIcon = () => getFamilyIconComponent(props.family?.key || 'default')
const getOptionTypeIcon = (type: string) =>
  getOptionTypeIconComponent(type, props.optionTypes)
console.log(" ITEMS IN CARD  ",props.items)
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

    svg { color: var(--color-text-lighter); margin-bottom: 20px; }
    h4 { margin: 0 0 8px 0; font-size: 18px; }
    p { margin: 0 0 24px 0; color: var(--color-text-lighter); font-style: italic; }

    .quick-add-actions {
      display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    }
  }
}

@media (max-width: 768px) {
  .cards-layout {
    .view-mode-toggle { position: static; margin-bottom: 16px; justify-content: center; }
    .options-grid { grid-template-columns: 1fr; }
  }
}
</style>
