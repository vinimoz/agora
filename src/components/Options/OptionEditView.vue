<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="inquiry-options-view">
    <!-- Family Tabs -->
    <div v-if="hasVisibleFamilies" class="family-tabs-container">
      <div class="family-tabs">
        <button
          v-for="family in familiesWithOptions"
          :key="family.key"
          :class="[
            'family-tab',
            { 'active': activeFamily === family.key }
          ]"
          @click="setActiveFamily(family.key)"
        >
          <div class="tab-icon" :style="{ color: getFamilyColorHelper(family.key) }">
            <component :is="getFamilyIconHelper(family.key)" :size="18" />
          </div>
          <span class="tab-label">{{ family.label }}</span>
          <span v-if="familyCounts[family.key]" class="tab-count">
            {{ familyCounts[family.key] }}
          </span>
        </button>
      </div>
    </div>

    <!-- Family Content -->
    <div v-if="activeFamilyData" class="family-content">
      <!-- Family Header with Action Buttons -->
      <div class="family-header">
        <h2 class="family-title">{{ activeFamilyData.label }}</h2>
        <p class="family-text">{{ activeFamilyData.description }}</p>
        <!-- Action Bar for creating options -->
        <div
          v-if="activeFamilyData.optionTypes.length > 0 && (!isReadOnly || (activeFamilyData.isOfficial && inquiryStore.user?.isOfficial))"
          class="family-actions-bar"
        >
          <NcButton
            v-for="optionType in activeFamilyData.optionTypes"
            :key="optionType.option_type"
            type="primary"
            :class="['create-option-btn', `type-${optionType.option_type}`]"
            @click.stop="openAddOptionModal(optionType.option_type)"
          >
            <template #icon>
              <component :is="getOptionTypeIcon(optionType.option_type)" :size="18" />
            </template>
            + {{ optionType.label || optionType.option_type }}
          </NcButton>
        </div>

        <!-- Read-only indicator for official families -->
        <div
          v-else-if="isReadOnly && activeFamilyData.isOfficial"
          class="read-only-indicator"
        >
          <component :is="InquiryOptionIcons.Lock" :size="16" />
          <span>{{ t('agora', 'Official content - View only') }}</span>
        </div>
      </div>

      <!-- Dynamic Family Layout Component -->
      <component
        :is="currentFamilyLayout"
        :options="activeFamilyOptions"
        :family="activeFamilyData"
        :inquiry-id="inquiryStore.id"
        :option-types="activeFamilyData.optionTypes"
        :read-only="isReadOnly"
        :is-official-user="inquiryStore.user?.isOfficial || false"
        @add-option="openAddOptionModal"
        @open-detail="openOptionDetail"
        @option-updated="handleOptionUpdated"
        @option-deleted="handleOptionDeleted"
      />
    </div>

    <!-- Empty State when no families -->
    <div v-else-if="!hasVisibleFamilies && inquiryStore.type" class="no-families">
      <component :is="InquiryOptionIcons.Options" :size="64" />
      <h3>{{ t('agora', 'No option families available') }}</h3>
      <p>{{ t('agora', 'This inquiry type doesn\'t support any option families') }}</p>
    </div>

    <!-- Modals -->
    <AddOptionModal
      v-if="showAddOptionModal && !isReadOnly"
      :inquiry-id="inquiryStore.id"
      :option-type="selectedOptionTypeKey"
      :parent-id="selectedParentId"
      @close="closeAddOptionModal"
      @created="handleOptionCreated"
    />
    <OptionDetailModal
      v-if="showOptionDetail && !isReadOnly"
      :option-id="selectedOptionId"
      :inquiry-id="inquiryStore.id"
      @close="closeOptionDetail"
      @deleted="handleOptionDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, markRaw } from 'vue'
import type { DefineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'

// Import types
import type { InquiryType, OptionType, Option } from '../../Types/index.ts'

// Import layout components
import FamilyLayoutTree from './FamilyLayouts/FamilyLayoutTree.vue'
import FamilyLayoutCards from './FamilyLayouts/FamilyLayoutCards.vue'
import FamilyLayoutPaired from './FamilyLayouts/FamilyLayoutPaired.vue'
import FamilyLayoutConsensusFlow from './FamilyLayouts/FamilyLayoutConsensusFlow.vue'
import FamilyLayoutKanban from './FamilyLayouts/FamilyLayoutKanban.vue'
import FamilyLayoutTimeline from './FamilyLayouts/FamilyLayoutTimeline.vue'


// Import option cards and modals
import AddOptionModal from './AddOptionModal.vue'
import OptionDetailModal from './OptionDetailModal.vue'

// Import helpers
import {
  getFamiliesWithOptionTypes,
  getFamilyIconComponent,
  getFamilyColor as importedGetFamilyColor,
  getLayoutForFamily,
} from '../../helpers/modules/InquiryOptionHelper'

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()
const route = useRoute()

// State
const activeFamily = ref<string>('')
const showAddOptionModal = ref(false)
const showOptionDetail = ref(false)
const selectedOptionTypeKey = ref<string | null>(null)
const selectedParentId = ref<number | null>(null)
const selectedOptionId = ref<number | null>(null)

// Computed
const isReadOnly = computed(() => route.name === 'publicInquiry')

// Layout component registry
const layoutComponents: Record<string, DefineComponent> = {
  tree: markRaw(FamilyLayoutTree),
  cards: markRaw(FamilyLayoutCards),
  paired: markRaw(FamilyLayoutPaired),
  consensus_flow: markRaw(FamilyLayoutConsensusFlow),
  kanban: markRaw(FamilyLayoutKanban),
  timeline: markRaw(FamilyLayoutTimeline),
  default: markRaw(FamilyLayoutCards)
}

// Helper methods
const getFamilyIconHelper = (familyKey: string) => getFamilyIconComponent(familyKey)
const getFamilyColorHelper = (familyKey: string) => importedGetFamilyColor(familyKey)

// Computed
const allInquiryTypes = computed<InquiryType[]>(() =>
  sessionStore.appSettings?.inquiryTypeTab || []
)

const allOptionTypes = computed<OptionType[]>(() =>
  sessionStore.appSettings?.inquiryOptionTypeTab || []
)

// Get families with their option types
const familiesWithOptions = computed(() => {
  const inquiryTypeKey = inquiryStore.type

  if (!inquiryTypeKey || !allInquiryTypes.value?.length || !allOptionTypes.value?.length) {
    return []
  }

  const families = getFamiliesWithOptionTypes(
    inquiryTypeKey,
    allInquiryTypes.value,
    allOptionTypes.value
  )
  return families.map(family => ({
    ...family,
    name: t('agora', family.name),
    label: t('agora', family.label),
    description: t('agora', family.description),
    // Get layout_ux for this family (from first option type or family config)
    layout_ux: family.layout_ux || getLayoutForFamily(family.key),
    isOfficial: family.isOfficial || false
  }))
})

const hasVisibleFamilies = computed(() => familiesWithOptions.value.length > 0)

const activeFamilyData = computed(() => {
  if (!activeFamily.value) return null
  return familiesWithOptions.value.find(f => f.key === activeFamily.value)
})

// Get current layout component based on active family's layout_ux
const currentFamilyLayout = computed(() => {
  if (!activeFamilyData.value) return layoutComponents.default

  const layoutKey = activeFamilyData.value.layout_ux || 'default'
  return layoutComponents[layoutKey] || layoutComponents.default
})

// Count options by family
const familyCounts = computed(() => {
  const counts: Record<string, number> = {}
  familiesWithOptions.value.forEach(family => {
    const familyOptionTypeKeys = family.optionTypes.map(opt => opt.option_type)
    counts[family.key] = optionsStore.options.filter(option =>
      familyOptionTypeKeys.includes(option.type)
    ).length
  })
  return counts
})

// Get options for active family
const activeFamilyOptions = computed(() => {
  if (!activeFamilyData.value) return []

  const familyOptionTypeKeys = activeFamilyData.value.optionTypes.map(opt => opt.option_type)

  return optionsStore.options.filter(option =>
    familyOptionTypeKeys.includes(option.type)
  )
})

const getOptionTypeIcon = (optionTypeKey: string) => {
  const optionType = allOptionTypes.value.find(opt =>
    opt.option_type === optionTypeKey || opt.optionType === optionTypeKey
  )

  if (optionType?.icon) {
    return InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File
  }

  return InquiryOptionIcons.File
}

const setActiveFamily = (familyKey: string) => {
  activeFamily.value = familyKey
}

const openAddOptionModal = (optionTypeKey: string, parentId?: number) => {
  // Prevent opening modal in read-only mode
  if (isReadOnly.value) {
    return
  }

  if (!optionTypeKey) {
    console.error('Cannot open add option modal: optionTypeKey is undefined')
    return
  }
  selectedOptionTypeKey.value = optionTypeKey
  selectedParentId.value = parentId || null
  showAddOptionModal.value = true
}

const closeAddOptionModal = () => {
  showAddOptionModal.value = false
  selectedOptionTypeKey.value = null
  selectedParentId.value = null
}

const openOptionDetail = (option: Option) => {
  // Prevent opening detail modal in read-only mode
  if (isReadOnly.value) {
    return
  }

  selectedOptionId.value = option.id
  showOptionDetail.value = true
}

const closeOptionDetail = () => {
  showOptionDetail.value = false
  selectedOptionId.value = null
}

const handleOptionCreated = (newOption: Option) => {
  optionsStore.options.push(newOption)
  closeAddOptionModal()
}

const handleOptionUpdated = (updatedOption: Option) => {
  const index = optionsStore.options.findIndex(opt => opt.id === updatedOption.id)
  if (index >= 0) {
    optionsStore.options[index] = updatedOption
  }
}

const handleOptionDeleted = (deletedOptionId: number) => {
  const index = optionsStore.options.findIndex(opt => opt.id === deletedOptionId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
  }
  closeOptionDetail()
}

// Initialize
onMounted(() => {
  if (inquiryStore.id) {
    optionsStore.load(inquiryStore.id)
  }

  if (familiesWithOptions.value.length > 0) {
    activeFamily.value = familiesWithOptions.value[0].key
  }
})

// Watch for inquiry changes
watch(() => inquiryStore.id, (newId) => {
  if (newId) {
    optionsStore.load(newId)
  }
})

watch(() => inquiryStore.type, () => {
  activeFamily.value = ''
  if (familiesWithOptions.value.length > 0) {
    activeFamily.value = familiesWithOptions.value[0].key
  }
})
</script>

<style scoped lang="scss">
.inquiry-options-view {
  margin-top: 32px;
  padding: 24px;
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.family-tabs-container {
  margin-bottom: 32px;

  .family-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--color-border);

    .family-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: var(--color-background-dark);
      border: 2px solid transparent;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-light);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: var(--color-background-darker);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &.active {
        background: var(--color-primary-light);
        border-color: var(--color-primary-element);
        color: var(--color-primary-element);

        .tab-icon {
          background: var(--color-primary-element);
          color: white !important;
        }
      }

      .tab-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background-darker);
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .tab-label {
        white-space: nowrap;
      }

      .tab-count {
        background: var(--color-background-darker);
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
}

.family-content {
  .family-header {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--color-border);

    .family-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: var(--color-main-text);
    }

    .family-text {
      font-size: 16px;
      color: var(--color-text-lighter);
      margin: 0 0 20px 0;
      max-width: 600px;
      line-height: 1.5;
    }

    .family-actions-bar {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 16px;

      .create-option-btn {
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
    }

    .read-only-indicator {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--color-background-dark);
      border-radius: 12px;
      color: var(--color-text-lighter);
      font-size: 14px;
      margin-top: 8px;

      svg {
        color: var(--color-primary-element);
      }
    }
  }
}

.no-families {
  text-align: center;
  padding: 60px 20px;

  svg {
    color: var(--color-text-lighter);
    margin-bottom: 20px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: var(--color-main-text);
    font-size: 20px;
  }

  p {
    margin: 0;
    color: var(--color-text-lighter);
    font-style: italic;
  }
}

@media (max-width: 768px) {
  .inquiry-options-view {
    padding: 16px;
  }

  .family-tabs {
    overflow-x: auto;
    padding-bottom: 12px;

    .family-tab {
      white-space: nowrap;
      flex-shrink: 0;
    }
  }

  .family-actions-bar {
    flex-direction: column;

    .create-option-btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
