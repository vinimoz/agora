<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <div class="inquiry-options-view">
        <!-- Family Tabs with NcCounterBubble -->
        <!-- Family Tabs with NcButton and NcCounterBubble -->
        <div v-if="hasVisibleFamilies" class="family-tabs-container">
            <div class="family-tabs">
                <NcButton
                        v-for="family in familiesWithOptions"
                        :key="family.key"
                        :class="[
                                'family-tab',
                                { 'active': activeFamily === family.key }
                                ]"
                        @click="setActiveFamily(family.key)"
                        >
                        <div class="tab-content">
                            <div class="tab-icon" :style="{ color: getFamilyColorHelper(family.key) }">
                                <component :is="getFamilyIconHelper(family.key)" :size="18" />
                            </div>
                <span class="tab-label">{{ family.label }}</span>
                <NcCounterBubble
                        v-if="familyCounts[family.key]"
                        :count="familyCounts[family.key]"
                        :type="activeFamily === family.key ? 'highlighted' : 'outlined'"
                        class="tab-counter"
                        />
                        </div>
                </NcButton>
            </div>
        </div>

        <!-- Family Content -->
        <div v-if="activeFamilyData" class="family-content">
            <!-- Family Header with Action Buttons -->

            <!-- Family Header with Action Buttons -->
            <div class="family-header">
                <h2 class="family-title">{{ activeFamilyData.label }}</h2>
                <p class="family-text">{{ activeFamilyData.description }}</p>

                <!-- Action Bar with Left and Right sections -->
                <div
                        v-if="(activeFamilyData.actions?.length > 0 || activeFamilyData.optionTypes.length > 0) && (!isReadOnly || (activeFamilyData.isOfficial && inquiryStore.user?.isOfficial))"
                        class="family-actions-wrapper"
                        >
                        <!-- Left side: Create option buttons -->
                    <div
                            v-if="activeFamilyData.optionTypes.length > 0"
                            class="create-options-bar"
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

                    <!-- Right side: Actions dropdown -->
                    <div
                            v-if="activeFamilyData.actions?.length > 0"
                            class="actions-dropdown"
                            >
                            <NcActions>
                            <NcActionButton
                                    v-for="action in activeFamilyData.actions"
                                    :key="action.key"
                                    @click.stop="handleFamilyAction(action)"
                                    >
                                    <template #icon>
                                        <component :is="getActionIcon(action.icon)" :size="18" />
                                    </template>
                            {{ action.label }}
                            </NcActionButton>
                            </NcActions>
                    </div>
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

            <!-- Dynamic Modals Container -->
            <component
                    :is="currentModalComponent"
                    v-if="currentModalComponent && showModal"
                    :show="showModal"
                    :family-key="activeFamilyData.key"
                    :inquiry-id="inquiryStore.id"
                    :action-key="currentActionKey"
                    :action-data="currentActionData"
                    @close="closeModal"
                    @action-completed="handleActionCompleted"
                    />
            <!-- Dynamic Family Layout Component -->
            <component
                    :is="currentFamilyLayout"
                    :options="activeFamilyOptions"
                    :family="activeFamilyData"
                    :inquiry-id="inquiryStore.id"
                    :option-types="activeFamilyData.optionTypes"
                    :options-by-inquiry="optionsByInquiry"
                    :is-readonly="isReadOnly"
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
        <OptionAddModal
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
import type { DefineComponent, Component } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'

// Import types
import type { InquiryType, OptionType, Option, Action } from '../../Types/index.ts'

// Import layout components
import FamilyLayoutTree from './FamilyLayouts/FamilyLayoutTree.vue'
import FamilyLayoutCards from './FamilyLayouts/FamilyLayoutCards.vue'
import FamilyLayoutPaired from './FamilyLayouts/FamilyLayoutPaired.vue'
import FamilyLayoutConsensusFlow from './FamilyLayouts/FamilyLayoutConsensusFlow.vue'
import FamilyLayoutKanban from './FamilyLayouts/FamilyLayoutKanban.vue'
import FamilyLayoutTimeline from './FamilyLayouts/FamilyLayoutTimeline.vue'
import FamilyLayoutVote from './FamilyLayouts/FamilyLayoutVote.vue'

// Import option cards and modals
import OptionAddModal from './OptionAddModal.vue'
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

// Modal state for dynamic actions
const showModal = ref(false)
const currentActionKey = ref<string | null>(null)
const currentActionData = ref<unknown>(null)
const currentModalComponent = ref<Component | null>(null)

// Cache for dynamically imported components
const modalComponentCache = new Map<string, Component>()

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
  vote: markRaw(FamilyLayoutVote),
  default: markRaw(FamilyLayoutCards)
}

// Helper methods
const getFamilyIconHelper = (familyKey: string) => getFamilyIconComponent(familyKey)
const getFamilyColorHelper = (familyKey: string) => importedGetFamilyColor(familyKey)

/**
 * Dynamically imports a modal component based on action key
 * Converts snake_case to PascalCase and adds 'Modal' suffix
 * Example: 'import_document' → 'ImportDocumentModal'
 * @param actionKey
 */
const loadModalComponent = async (actionKey: string): Promise<Component | null> => {
  // Check cache first
  if (modalComponentCache.has(actionKey)) {
    return modalComponentCache.get(actionKey)!
  }

  try {
    // Convert action key to component name
    // import_document -> ImportDocumentModal
    const componentName = `${actionKey
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')  }Modal`

    // Dynamically import the component
    const module = await import(`./Actions/${componentName}.vue`)
    const component = markRaw(module.default || module)

    // Cache for future use
    modalComponentCache.set(actionKey, component)

    return component
  } catch (error) {
    console.error(`Failed to load modal component for action "${actionKey}":`, error)
    return null
  }
}

/**
 * Get icon component for action
 * Can be either a string key from InquiryOptionIcons or a direct component
 * @param icon
 */
const getActionIcon = (icon: string | Component): Component => {
  if (typeof icon === 'string') {
    // Try to get from InquiryOptionIcons
    return InquiryOptionIcons[icon] || InquiryOptionIcons.File
  }
  return icon
}

/**
 * Handle family action click
 * @param action
 */
const handleFamilyAction = async (action: Action) => {
  if (action.modal) {
    const modalComponent = await loadModalComponent(action.key)

    if (modalComponent) {
      currentModalComponent.value = modalComponent
      currentActionKey.value = action.key
      currentActionData.value = action.data || {}
      showModal.value = true
      return
    }

    if (action.handler) {
      await action.handler(action.data)
      console.warn(`Handler or modal found for action: ${action.key}`)
      return
    }

    console.warn(`No handler or modal found for action: ${action.key}`)
    return
  }

  if (action.handler) {
    await action.handler(action.data)
    return
  }

  console.warn(`No handler or modal defined for action: ${action.key}`)
}


/**
 * Close modal and clean up
 */
const closeModal = () => {
  showModal.value = false
  currentModalComponent.value = null
  currentActionKey.value = null
  currentActionData.value = null
}

/**
 * Handle action completion (import, export, etc.)
 * @param result
 */
const handleActionCompleted = (result: unknown) => {
  // Refresh options if needed
  if (result?.refreshOptions) {
    optionsStore.load(inquiryStore.id)
  }

  // Show success message if provided
  if (result?.message) {
    console.error('Action completed:', result.message)
  }

  closeModal()
}

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
const optionsByInquiry = computed(() => {
  if (!optionsStore.options) return []

  return optionsStore.getOptionsByTargetId(inquiryStore.id)
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

                    // Add to global styles or component
                        .family-action-btn {
                        padding: 10px 20px;
                        border-radius: 12px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        &.action-import_document {
                            background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
                            color: white;

                            &:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                            }
                        }
                    }

                    // Markdown preview styles
                        .markdown-preview {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                        line-height: 1.6;

                        pre {
                            background: var(--color-background-darker);
                            padding: 12px;
                            border-radius: 6px;
                            overflow-x: auto;
                        }

                        code {
                            background: var(--color-background-darker);
                            padding: 2px 4px;
                            border-radius: 3px;
                            font-family: 'Courier New', monospace;
                            font-size: 0.9em;
                        }

                        blockquote {
                            border-left: 4px solid var(--color-primary-element);
                            margin: 0;
                            padding-left: 16px;
                            color: var(--color-text-lighter);
                        }

                        table {
                            border-collapse: collapse;
                            width: 100%;

                            th, td {
                                border: 1px solid var(--color-border);
                                padding: 8px;
                                text-align: left;
                            }

                            th {
                                background: var(--color-background-dark);
                            }
                        }
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
                                // Reset NcButton default styles
                                    background: var(--color-background-dark) !important;
                                border: 2px solid transparent !important;
                                border-radius: 16px !important;
                                padding: 0 !important;
                                margin: 0 !important;
                                min-height: auto !important;
                                transition: all 0.3s ease !important;

                                // Ensure consistent sizing
                                    :deep(.button-vue) {
                                    padding: 12px 20px !important;
                                    background: transparent !important;
                                    border: none !important;
                                    min-height: auto !important;
                                }

                                // Override NcButton hover styles
                                    &:hover {
                                    transform: translateY(-2px);
                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

                                    :deep(.button-vue) {
                                        background: transparent !important;
                                    }
                                }

                                &.active {
                                    background: var(--color-primary-light) !important;
                                    border-color: var(--color-primary-element) !important;

                                    .tab-icon {
                                        background: var(--color-primary-element);
                                        color: white !important;
                                    }

                                    .tab-label {
                                        color: var(--color-primary-element);
                                    }
                                }

                                .tab-content {
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                    padding: 12px 20px;
                                    width: 100%;
                                    min-width: max-content;
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
                                    flex-shrink: 0;
                                }

                                .tab-label {
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: var(--color-text-light);
                                    white-space: nowrap;
                                }

                                .tab-counter {
                                    margin-left: 4px;
                                    flex-shrink: 0;

                                    // Ensure consistent counter bubble sizing
                                        :deep(.counter-bubble) {
                                        min-width: 24px;
                                        height: 24px;
                                        font-size: 12px;
                                        font-weight: 600;
                                    }
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

                            .family-actions-wrapper {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 16px;
                                margin-top: 16px;

                                .create-options-bar {
                                    display: flex;
                                    gap: 12px;
                                    flex-wrap: wrap;
                                    flex: 1;

                                    .create-option-btn {
                                        padding: 10px 20px;
                                        border-radius: 12px;
                                        font-weight: 600;
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                        transition: all 0.3s ease;

                                        &:hover {
                                            transform: translateY(-2px);
                                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                                        }
                                    }
                                }

                                .actions-dropdown {
                                    flex-shrink: 0;
                                    margin-left: auto;

                                    // Style the NcActions button to match the design
                                        :deep(.action-item) {
                                        .action-item__menutoggle {
                                            padding: 10px 16px;
                                            border-radius: 12px;
                                            background: var(--color-background-dark);
                                            border: 1px solid var(--color-border);

                                            &:hover {
                                                background: var(--color-background-darker);
                                                transform: translateY(-2px);
                                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                                            }
                                        }
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

                        .family-actions-wrapper {
                            flex-direction: column;
                            align-items: stretch !important;

                            .create-options-bar {
                                width: 100%;

                                .create-option-btn {
                                    flex: 1;
                                    justify-content: center;
                                }
                            }

                            .actions-dropdown {
                                width: 100%;
                                margin-left: 0 !important;

                                :deep(.action-item) {
                                    width: 100%;

                                    .action-item__menutoggle {
                                        width: 100%;
                                        justify-content: center;
                                    }
                                }
                            }
                        }
                    }
</style>
