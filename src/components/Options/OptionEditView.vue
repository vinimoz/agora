<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <div class="inquiry-options-view">
        <!-- Family Tabs with NcCounterBubble -->
        <div v-if="hasVisibleFamilies" class="family-tabs-container">
            <div class="family-tabs">
                <NcButton
                    v-for="family in familiesWithOptions"
                    :key="family.key"
                    :class="['family-tab', { 'active': activeFamily === family.key }]"
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
            <!-- Family Header -->
            <div class="family-header">
                <h2 class="family-title">{{ activeFamilyData.label }}</h2>
                <p class="family-text">{{ activeFamilyData.description }}</p>

                <!-- Action Bar -->
                <div
                    v-if="(activeFamilyData.actions?.length > 0 || showCreateOptionButtons) && 
                          (!isReadOnly || (activeFamilyData.isOfficial && inquiryStore.user?.isOfficial))"
                    class="family-actions-wrapper"
                >
                    <!-- Left side: Create option buttons (conditionally shown based on family features) -->
                    <div
                        v-if="showCreateOptionButtons && activeFamilyData.optionTypes.length > 0"
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
                                <component :is="getOptionTypeIconHelper(optionType.option_type)" :size="18" />
                            </template>
                            + {{ optionType.label || optionType.option_type }}
                        </NcButton>
                    </div>

                    <!-- No engine message for vote family -->
                    <div
                        v-else-if="!hasActiveEngineForActiveFamily && activeFamilyData.key === 'vote' && !isReadOnly"
                        class="no-engine-message"
                    >
                        <component :is="InquiryOptionIcons.Settings" :size="20" />
                        <span>{{ t('agora', 'Configure a voting method first to enable option creation') }}</span>
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
                    <span>{{ t('agora', 'Official content - view only') }}</span>
                </div>
            </div>

            <!-- Dynamic Modals Container -->
		  <component
            :is="currentActionComponent"
            v-if="currentActionComponent && showActionComponent"
            :show="showActionComponent"
            :inquiry-id="inquiryStore.id"
            :action-key="currentActionKey"
            :action-data="currentActionData"
            @close="closeActionComponent"
            @action-completed="handleActionCompleted"
        />

            <!-- Dynamic Family Layout Component -->
            <component
                :is="currentFamilyLayout"
                ref="currentFamilyLayoutRef"
                :options="familyOptions"
                :family="activeFamilyData"
                :inquiry-id="inquiryStore.id"
                :option-types="activeFamilyData.optionTypes"
		:family-option-types="familyOptionTypes"
                :options-by-inquiry="optionsByInquiry"
                :is-readonly="isReadOnly"
                :is-official-user="inquiryStore.user?.isOfficial || false"
                :can-manage-vote="canManageVote"
                :can-add-options="showCreateOptionButtons"
                @add-option="openAddOptionModal"
                @open-detail="openOptionDetail"
                @option-updated="handleOptionUpdated"
                @option-deleted="handleOptionDeleted"
                @configure-engine="handleConfigureEngine"
                @add-to-vote="handleAddToVote"
                @option-family-changed="handleOptionFamilyChanged"
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
            v-if="showAddOptionModal && !isReadOnly && showCreateOptionButtons"
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
import { ref, computed, onMounted, watch, markRaw, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { useSupportEngineStore } from '../../stores/supportEngine'
import { InquiryOptionIcons } from '../../utils/icons.ts'

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
import OptionAddModal from '../Modals/OptionAddModal.vue'
import OptionDetailModal from '../Modals/OptionDetailModal.vue'

// Import all helpers
import {
    getFamiliesWithOptionTypes,
    getFamilyIconComponent,
    getFamilyColor as importedGetFamilyColor,
    getLayoutForFamily,
    getOptionTypeIconComponent,
    isOptionTypeInFamily,
    getOptionsCountByFamily,
    getFamilyOptionsByTarget,
    getOptionTypesForFamily,
} from '../../helpers/modules/InquiryOptionHelper'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  hasVisibleFamilies: boolean
}>()


// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()
const engineStore = useSupportEngineStore()

const route = useRoute()

// State
const activeFamily = ref<string>('')
const showAddOptionModal = ref(false)
const showOptionDetail = ref(false)
const selectedOptionTypeKey = ref<string | null>(null)
const selectedParentId = ref<number | null>(null)
const selectedOptionId = ref<number | null>(null)

// Modal state for dynamic actions
// const showModal = ref(false)
const currentActionKey = ref<string | null>(null)
const currentActionData = ref<unknown>(null)
// const currentModalComponent = ref<Component | null>(null)
const currentActionComponent = ref<Component | null>(null)
const showActionComponent = ref(false)

// Refs to dynamic layout components
const currentFamilyLayoutRef = ref<InstanceType<typeof FamilyLayoutVote> | null>(null)

// Cache for dynamically imported components
const modalComponentCache = new Map<string, Component>()

// Computed
const isReadOnly = computed(() => route.name === 'publicInquiry')
const canManageVote = computed(() => inquiryStore.currentUserStatus?.isOwner || sessionStore.currentUser?.isAdmin || sessionStore.currentUser?.isOfficial)

// Layout component registry
const layoutComponents: Record<string, Component> = {
    tree: markRaw(FamilyLayoutTree),
    cards: markRaw(FamilyLayoutCards),
    paired: markRaw(FamilyLayoutPaired),
    consensus_flow: markRaw(FamilyLayoutConsensusFlow),
    kanban: markRaw(FamilyLayoutKanban),
    timeline: markRaw(FamilyLayoutTimeline),
    vote: markRaw(FamilyLayoutVote),
    default: markRaw(FamilyLayoutCards)
}

// Helper methods using the imported functions
const getFamilyIconHelper = (familyKey: string) => getFamilyIconComponent(familyKey)
const getFamilyColorHelper = (familyKey: string) => importedGetFamilyColor(familyKey)
const getOptionTypeIconHelper = (optionTypeKey: string) => getOptionTypeIconComponent(optionTypeKey, allOptionTypes.value)

// Check if the vote family has an active engine
const hasActiveEngineForActiveFamily = computed(() => {
    if (activeFamilyData.value?.key !== 'vote') return true
    const engines = engineStore.engines
    return engines.length > 0
})

// Check if we should show create option buttons based on family features
const showCreateOptionButtons = computed(() => {
    const family = activeFamilyData.value
    if (!family) return false
    const allowCreation = true
   
    // For vote family, additionally check if there's an active engine
    if (family.key === 'vote') {
        return allowCreation && hasActiveEngineForActiveFamily.value
    }
    
    return allowCreation
})

const getActionIcon = (icon: string | Component): Component => {
    if (typeof icon === 'string') {
        return InquiryOptionIcons[icon] || InquiryOptionIcons.File
    }
    return icon
}


const loadActionComponent = async (familyKey: string, actionKey: string): Promise<Component | null> => {
    const cacheKey = `${familyKey}-${actionKey}`

    if (modalComponentCache.has(cacheKey)) {
        return modalComponentCache.get(cacheKey)!
    }

    try {
        let component: Component | null = null

        // For vote family, always use ActionVue.vue
        if (familyKey === 'vote') {
            const module = await import(`./Actions/ActionVote.vue`)
            component = markRaw(module.default || module)
        }
        // For structure family, use ActionStructure.vue
        else if (familyKey === 'structure') {
            const module = await import(`./Actions/ActionStructure.vue`)
            component = markRaw(module.default || module)
        }
        // For other families, try to load individual action modals
        else {
            const componentName = `${actionKey
                .split('_')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('')}Modal`

            const module = await import(`./Actions/${componentName}.vue`)
            component = markRaw(module.default || module)
        }

        if (component) {
            modalComponentCache.set(cacheKey, component)
            return component
        }

        return null
    } catch (error) {
        console.error(`Failed to load action component for family "${familyKey}" action "${actionKey}":`, error)
        return null
    }
}

const handleFamilyAction = async (action: Action) => {
    // For all actions, load the appropriate component
    const familyKey = activeFamilyData.value?.key

    if (!familyKey) {
        console.warn('No active family found')
        return
    }

    const actionComponent = await loadActionComponent(familyKey, action.key)

    if (actionComponent) {
        currentActionComponent.value = actionComponent
        currentActionKey.value = action.key
        currentActionData.value = action.data || {}
        showActionComponent.value = true
        return
    }

    // If no component found, try direct handler
    if (action.handler) {
        await action.handler(action.data)
        return
    }

    console.warn(`No handler or component defined for action: ${action.key}`)
}

const closeActionComponent = () => {
    showActionComponent.value = false
    currentActionComponent.value = null
    currentActionKey.value = null
    currentActionData.value = null
}

const handleActionCompleted = (result: unknown) => {
    if (result?.refreshOptions) {
        optionsStore.load(inquiryStore.id)
    }
    closeActionComponent()
}


// Computed for families and options
const allInquiryTypes = computed<InquiryType[]>(() =>
    sessionStore.appSettings?.inquiryTypeTab || []
)

const allOptionTypes = computed<OptionType[]>(() =>
    sessionStore.appSettings?.inquiryOptionTypeTab || []
)

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
        layout_ux: family.layout_ux || getLayoutForFamily(family.key),
        isOfficial: family.isOfficial || false,
        features: family.features || {},
    }))
})


// Handle vote-specific actions
const handleConfigureEngine = () => {
    // console.log('Configure voting engine')
}

const handleAddToVote = () => {
    // console.log('Add options to vote')
}

const activeFamilyData = computed(() => {
    if (!activeFamily.value) return null
    return familiesWithOptions.value.find(f => f.key === activeFamily.value)
})

const currentFamilyLayout = computed(() => {
    if (!activeFamilyData.value) return layoutComponents.default
    const layoutKey = activeFamilyData.value.layout_ux || 'default'
    return layoutComponents[layoutKey] || layoutComponents.default
})

// Use helper for family counts
const familyCounts = computed(() => getOptionsCountByFamily(optionsStore.options, allOptionTypes.value))

const optionsByInquiry = computed(() => {
    if (!optionsStore.options) return []
    return optionsStore.getOptionsByTargetId(inquiryStore.id)
})

/**
 * Get all options that belong to the current inquiry (targetId)
 * and match the active family's option types
 */
const familyOptions = computed(() => {
    if (!activeFamilyData.value) return []

    return getFamilyOptionsByTarget(
        optionsStore.options,
        activeFamilyData.value.key,
        inquiryStore.id
    )
})


/**
 * Get all option types that belong to the current family
 * (from the full option types tab, not filtered by inquiry)
 */
const familyOptionTypes = computed(() => {
    if (!activeFamilyData.value) return []

    const familyKey = activeFamilyData.value.key || 'debate'

    // Get ALL option types for this family from the full option types list
    return getOptionTypesForFamily(familyKey, allOptionTypes.value)
})




const setActiveFamily = (familyKey: string) => {
    activeFamily.value = familyKey
}

const openAddOptionModal = (optionTypeKey: string, parentId?: number) => {
    if (isReadOnly.value) return
    if (!showCreateOptionButtons.value) return

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
    if (isReadOnly.value) return
    selectedOptionId.value = option.id
    showOptionDetail.value = true
}

const closeOptionDetail = () => {
    showOptionDetail.value = false
    selectedOptionId.value = null
}

// Use helper for checking option type family
const handleOptionCreated = async (newOption: Option) => {
    optionsStore.options.push(newOption)
    closeAddOptionModal()

    // Use helper to check if option belongs to vote family
    if (isOptionTypeInFamily(newOption.type, 'vote', allOptionTypes.value)) {
        const activeEngine = engineStore.getCurrentEngine()
        if (activeEngine && !activeEngine.target_ids.includes(newOption.id)) {
            const newTargetIds = [...activeEngine.target_ids, newOption.id]
            await engineStore.updateEngine(activeEngine.id, { target_ids: newTargetIds })
        }
    }
}

const handleOptionFamilyChanged = async ({ optionId, familyKey, action }: { optionId: number; familyKey: string; action: string }) => {
    if (familyKey !== 'vote') return
    if (action !== 'added') return

    const activeEngine = engineStore.getCurrentEngine()

    if (activeEngine && !activeEngine.target_ids.includes(optionId)) {
        const newTargetIds = [...activeEngine.target_ids, optionId]
        await engineStore.updateEngine(activeEngine.id, { target_ids: newTargetIds })
    }
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
    if (familiesWithOptions.value.length > 0) {
        activeFamily.value = familiesWithOptions.value[0].key
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

    .family-tabs-container {
        margin-bottom: 32px;

        .family-tabs {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            padding-bottom: 16px;
            border-bottom: 2px solid var(--color-border);

            .family-tab {
                background: var(--color-background-dark) !important;
                border: 2px solid transparent !important;
                border-radius: 16px !important;
                padding: 0 !important;
                margin: 0 !important;
                min-height: auto !important;
                transition: all 0.3s ease !important;

                :deep(.button-vue) {
                    padding: 12px 20px !important;
                    background: transparent !important;
                    border: none !important;
                    min-height: auto !important;
                }

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

                .no-engine-message {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    background: var(--color-background-dark);
                    border-radius: 12px;
                    color: var(--color-text-lighter);
                    font-size: 13px;

                    svg {
                        color: var(--color-primary-element);
                    }
                }

                .actions-dropdown {
                    flex-shrink: 0;
                    margin-left: auto;

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
        padding: 16px;

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
}
</style>
