<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="paired-layout">
    <!-- ========================================== -->
    <!-- DEBATE HEADER                             -->
    <!-- ========================================== -->
    <DebateHeader
      v-if="debateQuestion"
      :question="debateQuestion"
      :status="debateStatus"
      :metrics="debateMetrics"
      :balance="debateBalance"
    />

    <!-- ========================================== -->
    <!-- DEBATE TOOLBAR                            -->
    <!-- ========================================== -->
    <DebateToolbar
      v-model="currentView"
      v-model:display-mode="cardDisplayMode"
      :available-views="availableViews"
      :display-modes="displayModes"
      :has-back="showBackButton"
      @back="goBack"
    />

    <!-- ========================================== -->
    <!-- CANVAS VIEW - Primary debate experience   -->
    <!-- ========================================== -->
    <div v-if="currentView === 'canvas'" class="debate-canvas">
      <!-- Question at the top -->
      <div class="debate-question">
        <h2>{{ debateQuestion }}</h2>
        <span class="debate-phase">{{ debatePhase || t('agora', 'Active') }}</span>
      </div>

      <!-- Debate Axis with columns -->
      <div
class="debate-axis" :class="{ 
        'has-pairs': hasDetectedPairs,
        'single-column': !hasForPositions || !hasAgainstPositions
      }">
        <!-- FOR Column -->
        <div v-if="hasForPositions" class="debate-column for-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.ThumbUp" :size="20" class="for-icon" />
            <h3>{{ getOptionTypeLabel('position_for') }}</h3>
            <span class="column-count">{{ getOptionsByType('position_for').length }}</span>
          </div>
          
          <div class="column-content">
            <div
              v-for="position in getOptionsByType('position_for')"
              :key="position.id"
              class="position-wrapper"
              :class="{
                'selected': selectedOptionId === position.id,
                'expanded': expandedOptionId === position.id
              }"
            >
              <OptionCard
                :option="position"
                :inquiry-id="inquiryId"
                :compact="cardDisplayMode === 'compact'"
                :inline="cardDisplayMode === 'list'"
                :show-action="true"
		:family-type="family?.key"
                @click="selectOption(position)"
                @edit="openDetail(position)"
              />
            </div>
            
            <button v-if="canAddForPosition" class="add-position-btn" @click="openAddOptionDialog('position_for')">
              <component :is="InquiryOptionIcons.Plus" :size="16" />
              {{ t('agora', 'Add position') }}
            </button>
          </div>
        </div>

        <!-- Debate Axis Center - Only shown when pairs exist -->
        <div v-if="hasDetectedPairs" class="debate-center">
          <!-- Balance Indicator -->
          <div class="balance-indicator">
            <div class="balance-bar">
              <div 
                class="balance-fill for-fill" 
                :style="{ width: `${debateBalance.for}%` }"
              ></div>
              <div 
                v-if="hasAgainstPositions"
                class="balance-fill against-fill" 
                :style="{ width: `${debateBalance.against}%` }"
              ></div>
            </div>
            <div class="balance-stats">
              <span class="for-stats">{{ debateBalance.for }}%</span>
              <span class="vs-indicator">{{ t('agora', 'VS') }}</span>
              <span class="against-stats">{{ debateBalance.against }}%</span>
            </div>
          </div>
          
          <!-- Metrics -->
          <div class="center-metrics">
            <div class="metric-item">
              <component :is="InquiryOptionIcons.Users" :size="14" />
              <span>{{ debateMetrics.participants }}</span>
            </div>
            <div class="metric-item">
              <component :is="InquiryOptionIcons.Comment" :size="14" />
              <span>{{ debateMetrics.arguments }}</span>
            </div>
            <div class="metric-item">
              <component :is="InquiryOptionIcons.AlertCircle" :size="14" />
              <span>{{ debateMetrics.objections }}</span>
            </div>
          </div>

          <!-- Paired options info -->
          <div v-if="detectedPairs.length > 0" class="paired-info">
            <div class="paired-info-header">
              <component :is="InquiryOptionIcons.Link" :size="14" />
              <span>{{ t('agora', 'Paired options') }}</span>
            </div>
            <div class="paired-info-content">
              <div v-for="pair in detectedPairs" :key="pair.left + pair.right" class="pair-item">
                <span class="pair-left">{{ getOptionTypeLabel(pair.left) }}</span>
                <component :is="InquiryOptionIcons.SwapHorizontal" :size="12" class="pair-icon" />
                <span class="pair-right">{{ getOptionTypeLabel(pair.right) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- If no pairs detected, show minimal center -->
        <div v-else class="debate-center no-pairs"></div>

        <!-- AGAINST Column -->
        <div v-if="hasAgainstPositions" class="debate-column against-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.ThumbDown" :size="20" class="against-icon" />
            <h3>{{ getOptionTypeLabel('position_against') }}</h3>
            <span class="column-count">{{ getOptionsByType('position_against').length }}</span>
          </div>
          
          <div class="column-content">
            <div
              v-for="position in getOptionsByType('position_against')"
              :key="position.id"
              class="position-wrapper"
              :class="{
                'selected': selectedOptionId === position.id,
                'expanded': expandedOptionId === position.id
              }"
            >
              <OptionCard
                :option="position"
                :inquiry-id="inquiryId"
                :compact="cardDisplayMode === 'compact'"
                :inline="cardDisplayMode === 'list'"
                :show-action="true"
		:family-type="family?.key"
                @click="selectOption(position)"
                @edit="openDetail(position)"
              />
            </div>
            
            <button v-if="canAddAgainstPosition" class="add-position-btn" @click="openAddOptionDialog('position_against')">
              <component :is="InquiryOptionIcons.Plus" :size="16" />
              {{ t('agora', 'Add position') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Unpaired options displayed horizontally at the bottom -->
      <div v-if="hasUnpairedOptions" class="unpaired-options">
        <div class="unpaired-header">
          <component :is="InquiryOptionIcons.Options" :size="16" />
          <h4>{{ t('agora', 'Neutral options') }}</h4>
          <span class="unpaired-count">{{ unpairedOptions.length }}</span>
        </div>
        <div class="unpaired-grid">
          <div
            v-for="option in unpairedOptions"
            :key="option.id"
            class="unpaired-item"
            :class="{
              'selected': selectedOptionId === option.id,
              'expanded': expandedOptionId === option.id
            }"
          >
            <OptionCard
              :option="option"
              :inquiry-id="inquiryId"
              :compact="cardDisplayMode === 'compact'"
              :inline="cardDisplayMode === 'list'"
              :show-action="true"
		:family-type="family?.key"
              @click="selectOption(option)"
              @edit="openDetail(option)"
            />
          </div>
        </div>
      </div>

      <!-- Expanded View for selected option -->
      <div v-if="selectedOption && expandedOptionId === selectedOption.id" class="expanded-view">
        <div class="expanded-content">
          <div class="expanded-header">
            <button class="close-expanded" @click="closeExpandedView">
              <component :is="InquiryOptionIcons.Close" :size="20" />
            </button>
            <div class="expanded-title">
              <component :is="getOptionTypeIconComponent(selectedOption.type, allFamilyOptionTypes)" :size="16" />
              <h4>{{ getOptionLabel(selectedOption) }}</h4>
            </div>
            <span class="expanded-type">{{ getOptionTypeLabel(selectedOption.type) }}</span>
          </div>
          
          <div class="expanded-body">
            <!-- Show the selected option in full detail -->
            <div class="selected-option-detail">
              <OptionCard
                :option="selectedOption"
                :inquiry-id="inquiryId"
                :compact="false"
                :inline="false"
                :show-action="true"
		:family-type="family?.key"
                @edit="openDetail(selectedOption)"
              />
            </div>

            <!-- Child options displayed horizontally -->
            <div v-if="getChildrenCount(selectedOption.id) > 0" class="child-options">
              <div class="child-header">
                <component :is="InquiryOptionIcons.MessageReplyText" :size="14" />
                <span>{{ t('agora', 'Arguments & responses') }}</span>
                <span class="child-count">{{ getChildrenCount(selectedOption.id) }}</span>
              </div>
              <div class="child-grid">
                <div
                  v-for="child in getChildrenForOption(selectedOption.id)"
                  :key="child.id"
                  class="child-item"
                  @click="selectOption(child)"
                >
                  <OptionCard
                    :option="child"
                    :inquiry-id="inquiryId"
                    :compact="true"
                    :inline="false"
                    :show-action="true"
		    :family-type="family?.key"
                    @edit="openDetail(child)"
                  />
                </div>
              </div>
            </div>

            <!-- Add argument/response -->
            <div class="add-argument-area">
              <NcButton
                v-if="canAddChild(selectedOption)"
                type="tertiary"
                size="small"
		@click="addResponse(selectedOption)"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Plus" :size="14" />
                </template>
                {{ t('agora', 'Add argument') }}
              </NcButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- EXPLORE VIEW - Tree navigation            -->
    <!-- ========================================== -->
    <div v-else-if="currentView === 'explore'" class="explore-view">
      <div class="explore-container">
        <!-- Left: Tree Navigation -->
        <div class="explore-nav">
          <div class="nav-header">
            <component :is="InquiryOptionIcons.List" :size="18" />
            <h4>{{ t('agora', 'Debate Tree') }}</h4>
          </div>
          
          <div class="nav-tree">
            <!-- Recursive tree rendering with all levels -->
            <template v-for="node in optionTree" :key="node.id">
              <DebateTreeNode
                :node="node"
                :selected-id="selectedOptionId"
                :option-types="allFamilyOptionTypes"
                @select="selectOption"
              />
            </template>
          </div>
        </div>

        <!-- Right: Detail Inspector -->
        <div class="explore-detail">
          <div class="detail-header">
            <div class="detail-title">
              <component :is="InquiryOptionIcons.MessageReplyText" :size="18" />
              <h4>
                {{ selectedOption 
                  ? getOptionLabel(selectedOption)
                  : t('agora', 'Select an option to inspect') 
                }}
              </h4>
            </div>
            <span class="detail-count">{{ selectedOption ? getChildrenCount(selectedOption.id) : 0 }}</span>
          </div>

          <div class="detail-body">
            <template v-if="selectedOption">
              <!-- Type badge -->
              <div class="option-type-badge">
                <component :is="getOptionTypeIconComponent(selectedOption.type, allFamilyOptionTypes)" :size="14" />
                <span>{{ getOptionTypeLabel(selectedOption.type) }}</span>
              </div>

              <!-- Show selected option as OptionCard -->
              <OptionCard
                :option="selectedOption"
                :inquiry-id="inquiryId"
                :compact="cardDisplayMode === 'compact'"
                :inline="cardDisplayMode === 'list'"
                :show-action="true"
		:family-type="family?.key"
                @edit="openDetail(selectedOption)"
              />

              <!-- Children grouped by type -->
              <div
                v-for="(children, type) in groupedChildren"
                :key="type"
                class="detail-response-group"
              >
                <div class="response-group-label">
                  <component :is="getOptionTypeIconComponent(type,allFamilyOptionTypes)" :size="14" />
                  <span>{{ getOptionTypeLabel(type) }}</span>
                  <span class="response-count">{{ children.length }}</span>
                </div>
                
                <div
                  v-for="child in children"
                  :key="child.id"
                  class="argument-wrapper"
                >
                  <OptionCard
                    :option="child"
                    :inquiry-id="inquiryId"
                    :compact="cardDisplayMode === 'compact'"
                    :inline="cardDisplayMode === 'list'"
                    :show-action="true"
		    :family-type="family?.key"
                    @click="selectOption(child)"
                    @edit="openDetail(child)"
                  />
                </div>
              </div>

              <!-- Add response -->
              <div v-if="canAddChild(selectedOption)" class="add-response-area">
                <NcButton
                  type="tertiary"
                  size="small"
		  @click="addResponse(selectedOption)"
                >
                  <template #icon>
                    <component :is="InquiryOptionIcons.Plus" :size="14" />
                  </template>
                  {{ t('agora', 'Add argument') }}
                </NcButton>
              </div>
            </template>

            <div v-else class="empty-detail">
              <component :is="InquiryOptionIcons.ArrowRight" :size="32" />
              <p>{{ t('agora', 'Click an item in the debate tree') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- ARGUMENT MAP VIEW - Navigable network     -->
    <!-- ========================================== -->
    <div v-else-if="currentView === 'map'" class="map-view">
      <div class="map-container">
        <div class="map-header">
          <h3>{{ t('agora', 'Argument Map') }}</h3>
          <p>{{ t('agora', 'Hover for details, click to navigate') }}</p>
        </div>
        
        <div class="map-canvas">
          <div class="map-network">
            <!-- All root options as branches -->
            <div v-if="rootOptions.length > 0" class="map-level branches-level">
              <div
                v-for="option in rootOptions"
                :key="option.id"
                class="map-branch"
              >
                <div 
                  class="map-node branch-node"
                  :class="{
                    'for-node': option.type === 'position_for',
                    'against-node': option.type === 'position_against',
                    'neutral-node': option.type !== 'position_for' && option.type !== 'position_against',
                    'selected': selectedOptionId === option.id
                  }"
                  @click="selectOption(option)"
                >
                  <div class="node-content">
                    <component :is="getOptionTypeIconComponent(option.type, allFamilyOptionTypes)" :size="16" class="node-icon" />
                    <span class="node-label">{{ getOptionLabel(option) }}</span>
                    <span class="node-type">{{ getOptionTypeLabel(option.type) }}</span>
                    <span v-if="getChildrenCount(option.id) > 0" class="node-badge">
                      {{ getChildrenCount(option.id) }}
                    </span>
                  </div>
                </div>

                <!-- Children nodes with OptionCard in compact mode -->
                <div v-if="getChildrenCount(option.id) > 0" class="map-children">
                  <div
                    v-for="child in getChildrenForOption(option.id)"
                    :key="child.id"
                    class="map-child-wrapper"
                    :class="{ 'selected': selectedOptionId === child.id }"
                    @click="selectOption(child)"
                  >
                    <div class="map-child-tooltip">
                      <OptionCard
                        :option="child"
                        :inquiry-id="inquiryId"
                        :compact="true"
                        :show-action="false"
		        :family-type="family?.key"
                        @edit="openDetail(child)"
                      />
                      <div class="map-tooltip">
                        <OptionCard
                          :option="child"
                          :inquiry-id="inquiryId"
                          :compact="false"
                          :inline="false"
                          :show-action="true"
		        :family-type="family?.key"
                          @edit="openDetail(child)"
                        />
                      </div>
                    </div>
                    
                    <!-- Grandchildren -->
                    <div v-if="getChildrenCount(child.id) > 0" class="map-grandchildren">
                      <div
                        v-for="grandchild in getChildrenForOption(child.id).slice(0, 3)"
                        :key="grandchild.id"
                        class="map-node grandchild-node"
                        :class="{ 'selected': selectedOptionId === grandchild.id }"
                        @click.stop="selectOption(grandchild)"
                      >
                        <div class="node-content tiny">
                          <span class="node-label">{{ getOptionLabel(grandchild) }}</span>
                        </div>
                      </div>
                      <div v-if="getChildrenCount(child.id) > 3" class="map-more">
                        +{{ getChildrenCount(child.id) - 3 }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="rootOptions.length === 0" class="map-empty">
              <component :is="InquiryOptionIcons.Graph" :size="48" />
              <p>{{ t('agora', 'No options to display') }}</p>
              <span class="map-hint">{{ t('agora', 'Add an option to start building the argument map') }}</span>
            </div>
          </div>
        </div>
        
        <div class="map-legend">
          <div class="legend-item">
            <span class="legend-color position-for"></span>
            <span>{{ getOptionTypeLabel('position_for') }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color position-against"></span>
            <span>{{ getOptionTypeLabel('position_against') }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color neutral"></span>
            <span>{{ t('agora', 'Other options') }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color child"></span>
            <span>{{ t('agora', 'Arguments / Children') }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color selected"></span>
            <span>{{ t('agora', 'Selected') }}</span>
          </div>
        </div>
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
import DebateHeader from './DebateHeader.vue'
import DebateToolbar from './DebateToolbar.vue'
import DebateTreeNode from './DebateTreeNode.vue'
import {
  getOptionTypeIconComponent,
  getOptionTypeLabel,
  detectPairedOptionTypes,
  getRootOptionTypesForFamily,
  getOptionTypesForFamily,
  getFamilyOptionsByTarget,
} from '../../../helpers/modules/InquiryOptionHelper'
import type { InquiryOptionType, Option, OptionFamily } from '../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'


// ============================================
// Props
// ============================================

const props = defineProps<{
  family?: OptionFamily
  inquiryId: number
  optionTypes: InquiryOptionType[]
  	familyOptionTypes?: InquiryOptionType[] 
  debateQuestion?: string
  debateStatus?: string
  debatePhase?: string
}>()

// ============================================
// Emits
// ============================================

const emit = defineEmits<{
  'addOption': [optionType: string, parentId?: number]
  'openDetail': [option: Option]
}>()

// ============================================
// State
// ============================================

const currentView = ref<'canvas' | 'explore' | 'map'>('canvas')
const cardDisplayMode = ref<'normal' | 'compact' | 'list'>('normal')
const selectedOptionId = ref<number | null>(null)
const expandedOptionId = ref<number | null>(null)
const optionsStore = useOptionsStore()


// Navigation history
const navigationHistory = ref<Array<number>>([])
const showBackButton = computed(() => navigationHistory.value.length > 0)


// ============================================
// Get ALL option types for this family (for icon lookups, child creation)
// ============================================
const familyOptions = computed(() => 
  // Use the helper to filter by family and inquiry ID
   getFamilyOptionsByTarget(
    optionsStore.options,  // All options
    props.family?.key || 'debate',  // Current family
    props.inquiryId  // Current inquiry ID
  )
)

const allFamilyOptionTypes = computed(() =>
  getOptionTypesForFamily(props.family?.key || 'debate', props.familyOptionTypes)
  		
)

// ============================================
// Root Option Types - computed from familyOptionTypes
// ============================================

const rootOptionTypes = computed(() => 
  getRootOptionTypesForFamily(allFamilyOptionTypes.value, props.family?.key)
)

// ============================================
// Views Configuration
// ============================================


const availableViews = [
  { key: 'canvas', label: t('agora', 'Debate'), icon: InquiryOptionIcons.Scale },
  { key: 'explore', label: t('agora', 'Explore'), icon: InquiryOptionIcons.Columns },
  { key: 'map', label: t('agora', 'Map'), icon: InquiryOptionIcons.Graph },
] as const

const displayModes = [
  { key: 'normal', label: t('agora', 'Normal'), icon: InquiryOptionIcons.Grid },
  { key: 'compact', label: t('agora', 'Compact'), icon: InquiryOptionIcons.Collapse },
  { key: 'list', label: t('agora', 'List'), icon: InquiryOptionIcons.List },
] as const

// ============================================
// Computed - Core Data
// ============================================

// Detect paired option types
const detectedPairs = computed(() => detectPairedOptionTypes(props.optionTypes, props.family?.key))

const hasDetectedPairs = computed(() => detectedPairs.value.length > 0)

// Check if FOR and AGAINST positions exist
const hasForPositions = computed(() => getOptionsByType('position_for').length > 0)
const hasAgainstPositions = computed(() => getOptionsByType('position_against').length > 0)

// Check if user can add positions
const canAddForPosition = computed(() => rootOptionTypes.value.some(t => t.option_type === 'position_for'))

const canAddAgainstPosition = computed(() => rootOptionTypes.value.some(t => t.option_type === 'position_against'))

// Root options (parentId === 0 or undefined)
const rootOptions = computed(() => familyOptions.value.filter(opt => !opt.parentId || opt.parentId === 0))

// Unpaired options (everything else)
const unpairedOptions = computed(() => rootOptions.value.filter(opt => 
    opt.type !== 'position_for' && opt.type !== 'position_against'
  ))

const hasUnpairedOptions = computed(() => unpairedOptions.value.length > 0)

// ============================================
// Debate Metrics
// ============================================

const debateBalance = computed(() => {
  const forPositions = getOptionsByType('position_for')
  const againstPositions = getOptionsByType('position_against')
  const total = forPositions.length + againstPositions.length || 1
  
  return {
    for: Math.round((forPositions.length / total) * 100),
    against: Math.round((againstPositions.length / total) * 100)
  }
})

const debateMetrics = computed(() => {
  const allChildren = familyOptions.value.filter(opt => opt.parentId && opt.parentId > 0)
  const objections = familyOptions.value.filter(opt => opt.type === 'objection')
  
  return {
    participants: new Set(familyOptions.value.map(opt => opt.owner?.id)).size,
    arguments: allChildren.length,
    objections: objections.length
  }
})

// ============================================
// Option Tree for Explore View
// ============================================

interface OptionNode extends Option {
  depth: number
  children: OptionNode[]
}

const buildOptionTree = (parentId: number | null = null, depth: number = 0): OptionNode[] => {
  // Find children of the current parent
  const children = familyOptions.value.filter(opt => {
    // Normalize parentId to number for comparison
    const optParentId = typeof opt.parentId === 'string' ? parseInt(opt.parentId, 10) : opt.parentId
    
    if (parentId === null) {
      // Root level: include options with no parent (null, undefined, 0, or '0')
      return optParentId === null || 
             optParentId === undefined || 
             optParentId === 0
    }
    // Child level: exact match
    return optParentId === parentId
  })
  
  return children.map(opt => ({
    ...opt,
    depth,
    children: buildOptionTree(opt.id, depth + 1)
  }))
}

const optionTree = computed(() => buildOptionTree(null))

// ============================================
// Helper Functions
// ============================================

const getOptionsByType = (type: string): Option[] => familyOptions.value.filter(opt => opt.type === type)

const getOptionLabel = (option: Option | null): string => {
  if (!option) return ''
  return option.title || option.label || getOptionTypeLabel(option.type)
}

const getChildrenForOption = (optionId: number): Option[] => {
  const option = familyOptions.value.find(opt => opt.id === optionId)
  if (!option) return []

  const typeDef = props.optionTypes.find(t => t.option_type === option.type)
  if (!typeDef) return []

  let allowedChildTypes: string[] = []
  if (typeof typeDef.allowed_response === 'string') {
    try {
      const parsed = JSON.parse(typeDef.allowed_response)
      if (Array.isArray(parsed)) {
        allowedChildTypes = parsed
      }
    } catch {
      // ignore
    }
  } else if (Array.isArray(typeDef.allowed_response)) {
    allowedChildTypes = typeDef.allowed_response
  }

  if (allowedChildTypes.length === 0) return []

  return familyOptions.value.filter(opt =>
    opt.parentId === optionId && allowedChildTypes.includes(opt.type)
  )
}


// And selectedOption:
const selectedOption = computed(() => {
  if (!selectedOptionId.value) return null
  return familyOptions.value.find(opt => opt.id === selectedOptionId.value) || null
})



const getChildrenCount = (optionId: number): number => getChildrenForOption(optionId).length

const groupedChildren = computed(() => {
  if (!selectedOptionId.value) return {}
  const children = getChildrenForOption(selectedOptionId.value)
  const groups: Record<string, Option[]> = {}
  for (const child of children) {
    if (!groups[child.type]) {
      groups[child.type] = []
    }
    groups[child.type].push(child)
  }
  return groups
})


// ============================================
// Navigation Methods
// ============================================
const selectOption = (option: Option) => {
  if (selectedOptionId.value === option.id) {
    // If already selected, toggle expanded view
    if (expandedOptionId.value === option.id) {
      closeExpandedView()
    } else {
      expandedOptionId.value = option.id
    }
    return
  }

  if (selectedOptionId.value) {
    navigationHistory.value.push(selectedOptionId.value)
  }
  selectedOptionId.value = option.id
  expandedOptionId.value = option.id
}


const closeExpandedView = () => {
  expandedOptionId.value = null
}

const goBack = () => {
  const last = navigationHistory.value.pop()
  if (last) {
    selectedOptionId.value = last
    expandedOptionId.value = last
  }
}

const openDetail = (option: Option) => {
  emit('openDetail', option)
}

// ============================================
// Action Methods
// ============================================

const canAddChild = (option: Option) => {
  const typeDef = props.optionTypes.find(t => t.option_type === option.type)
  if (!typeDef) return false
  
  let allowedResponses: string[] = []
  if (typeof typeDef.allowed_response === 'string') {
    try {
      const parsed = JSON.parse(typeDef.allowed_response)
      if (Array.isArray(parsed)) {
        allowedResponses = parsed
      }
    } catch {
      // ignore
    }
  } else if (Array.isArray(typeDef.allowed_response)) {
    allowedResponses = typeDef.allowed_response
  }
  return allowedResponses.length > 0
}

const openAddOptionDialog = (type: string, parentId?: number) => {
  emit('addOption',type,parentId)
}


const addResponse = (option: Option) => {
  const typeDef = props.optionTypes.find(t => t.option_type === option.type)
  if (!typeDef) return

  let allowedResponses: string[] = []
  if (typeof typeDef.allowed_response === 'string') {
    try {
      const parsed = JSON.parse(typeDef.allowed_response)
      if (Array.isArray(parsed)) {
        allowedResponses = parsed
      }
    } catch {
      // ignore
    }
  } else if (Array.isArray(typeDef.allowed_response)) {
    allowedResponses = typeDef.allowed_response
  }

  const childType = allowedResponses[0] || ''
  if (childType) {
    // Emit to parent
    emit('addOption', childType, option.id)
  }
}



</script>

<style scoped lang="scss">
// ============================================
// Variables
// ============================================

$transition-speed: 0.3s;
$border-radius: 12px;
$gap: 16px;
$success-color: #2e7d32;
$error-color: #c62828;
$neutral-color: #6c757d;

// ============================================
// Layout Container
// ============================================

.paired-layout {
  display: flex;
  flex-direction: column;
  gap: $gap;
}

// ============================================
// DEBATE CANVAS
// ============================================

.debate-canvas {
  display: flex;
  flex-direction: column;
  gap: $gap;

  .debate-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: var(--color-background-dark);
    border-radius: $border-radius;
    border: 1px solid var(--color-border);

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }

    .debate-phase {
      font-size: 12px;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 12px;
      background: var(--color-primary-light);
      color: var(--color-primary-element);
    }
  }

  .debate-axis {
    display: grid;
    gap: $gap;
    align-items: stretch;

    // When pairs exist: 3 columns
    &.has-pairs {
      grid-template-columns: 1fr minmax(80px, 160px) 1fr;
    }

    // When only one column exists: fill the space
    &.single-column {
      grid-template-columns: 1fr;
      
      .debate-column {
        max-height: none;
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
      }
    }

    // Default: 3 columns with flexible center
    &:not(.has-pairs):not(.single-column) {
      grid-template-columns: 1fr minmax(20px, 60px) 1fr;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr !important;
      gap: $gap * 2;
      
      .debate-column {
        max-height: none;
        max-width: 100%;
        margin: 0;
      }
    }

    .debate-column {
      background: var(--color-background-dark);
      border-radius: $border-radius;
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 600px;

      .column-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: var(--color-background-darker);
        border-bottom: 1px solid var(--color-border);

        .for-icon, .against-icon {
          flex-shrink: 0;
        }

        h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          flex: 1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .column-count {
          font-size: 12px;
          background: var(--color-background-dark);
          padding: 0 10px;
          border-radius: 12px;
          color: var(--color-text-light);
        }
      }

      .column-content {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .position-wrapper {
          &.selected {
            :deep(.option-card) {
              border-color: var(--color-primary-element);
              background: var(--color-primary-light);
            }
          }

          &.expanded {
            :deep(.option-card) {
              border-color: var(--color-primary-element);
              border-width: 2px;
            }
          }
        }

        .add-position-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border: 2px dashed var(--color-border);
          border-radius: 8px;
          background: transparent;
          color: var(--color-text-lighter);
          cursor: pointer;
          transition: all $transition-speed;
          font-size: 13px;

          &:hover {
            border-color: var(--color-primary-element);
            color: var(--color-primary-element);
            background: var(--color-primary-light);
          }
        }
      }

      &.for-column {
        .column-header {
          border-left: 4px solid $success-color;
        }
      }

      &.against-column {
        .column-header {
          border-left: 4px solid $error-color;
        }
      }
    }

    .debate-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
      min-width: 60px;
      max-width: 160px;
      gap: 4px;

      &.no-pairs {
        min-width: 20px;
        max-width: 40px;
        padding: 0;
      }

      .balance-indicator {
        width: 100%;
        margin-bottom: 2px;

        .balance-bar {
          display: flex;
          height: 12px;
          border-radius: 6px;
          overflow: hidden;
          background: var(--color-background-darker);
          border: 1px solid var(--color-border);

          .balance-fill {
            transition: width 0.6s ease;
            height: 100%;

            &.for-fill {
              background: $success-color;
              border-radius: 5px 0 0 5px;
            }

            &.against-fill {
              background: $error-color;
              border-radius: 0 5px 5px 0;
            }
          }
        }

        .balance-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 2px;
          font-size: 9px;
          font-weight: 600;

          .for-stats {
            color: $success-color;
          }

          .against-stats {
            color: $error-color;
          }

          .vs-indicator {
            color: var(--color-text-lighter);
            font-weight: 400;
            font-size: 8px;
          }
        }
      }

      .center-metrics {
        display: flex;
        gap: 6px;
        padding: 2px 8px;
        background: var(--color-background-darker);
        border-radius: 12px;
        border: 1px solid var(--color-border);

        .metric-item {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 9px;
          color: var(--color-text-light);

          svg {
            color: var(--color-text-lighter);
            width: 10px;
            height: 10px;
          }
        }
      }

      .paired-info {
        width: 100%;
        background: var(--color-background-darker);
        border-radius: 6px;
        border: 1px solid var(--color-border);
        padding: 4px 6px;

        .paired-info-header {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          font-weight: 500;
          color: var(--color-text-light);
          padding-bottom: 2px;
          border-bottom: 1px solid var(--color-border-light);
          margin-bottom: 3px;

          svg {
            width: 12px;
            height: 12px;
          }
        }

        .paired-info-content {
          display: flex;
          flex-direction: column;
          gap: 2px;

          .pair-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 9px;
            color: var(--color-text);

            .pair-left {
              color: $success-color;
            }

            .pair-right {
              color: $error-color;
            }

            .pair-icon {
              color: var(--color-text-lighter);
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }
  }

  // Unpaired options section
  .unpaired-options {
    background: var(--color-background-dark);
    border-radius: $border-radius;
    border: 1px solid var(--color-border);
    padding: 12px 16px;

    .unpaired-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--color-border-light);
      margin-bottom: 12px;

      h4 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        flex: 1;
      }

      .unpaired-count {
        font-size: 12px;
        background: var(--color-background-darker);
        padding: 0 10px;
        border-radius: 12px;
        color: var(--color-text-light);
      }
    }

    .unpaired-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 8px;

      .unpaired-item {
        &.selected {
          :deep(.option-card) {
            border-color: var(--color-primary-element);
            background: var(--color-primary-light);
          }
        }

        &.expanded {
          :deep(.option-card) {
            border-color: var(--color-primary-element);
            border-width: 2px;
          }
        }
      }
    }
  }

  // Expanded View
  .expanded-view {
    background: var(--color-background-dark);
    border-radius: $border-radius;
    border: 1px solid var(--color-border);
    overflow: hidden;
    animation: slideDown 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    .expanded-content {
      padding: 20px 24px;

      .expanded-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--color-border-light);

        .close-expanded {
          background: none;
          border: none;
          color: var(--color-text-lighter);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;

          &:hover {
            background: var(--color-background-hover);
            color: var(--color-text);
          }
        }

        .expanded-title {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;

          h4 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
          }
        }

        .expanded-type {
          font-size: 11px;
          font-weight: 500;
          color: var(--color-text-lighter);
          padding: 4px 12px;
          background: var(--color-background-darker);
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
      }

      .expanded-body {
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .selected-option-detail {
          :deep(.option-card) {
            border: 2px solid var(--color-primary-element);
            background: var(--color-primary-light);
          }
        }

        .child-options {
          .child-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--color-border-light);
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 500;
            color: var(--color-text-light);

            .child-count {
              margin-left: auto;
              background: var(--color-background-darker);
              padding: 0 10px;
              border-radius: 12px;
              font-size: 12px;
            }
          }

          .child-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 8px;

            .child-item {
              cursor: pointer;
              
              &:hover {
                :deep(.option-card) {
                  border-color: var(--color-primary-element);
                }
              }
            }
          }
        }

        .add-argument-area {
          margin-top: 8px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}

// ============================================
// EXPLORE VIEW
// ============================================

.explore-view {
  .explore-container {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: $gap;
    min-height: 500px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .explore-nav {
      background: var(--color-background-dark);
      border-radius: $border-radius;
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 600px;

      .nav-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 16px;
        background: var(--color-background-darker);
        border-bottom: 1px solid var(--color-border);

        h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          flex: 1;
        }
      }

      .nav-tree {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
    }

    .explore-detail {
      background: var(--color-background-dark);
      border-radius: $border-radius;
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .detail-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        background: var(--color-background-darker);
        border-bottom: 1px solid var(--color-border);

        .detail-title {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;

          h4 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .detail-count {
          font-size: 12px;
          background: var(--color-background-dark);
          padding: 0 10px;
          border-radius: 12px;
          color: var(--color-text-light);
        }
      }

      .detail-body {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .option-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px 4px 8px;
          background: var(--color-background-darker);
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-light);
          align-self: flex-start;
        }

        .detail-response-group {
          .response-group-label {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 500;
            color: var(--color-text-light);
            padding: 4px 0 6px 0;
            border-bottom: 1px solid var(--color-border-light);
            margin-bottom: 6px;

            .response-count {
              margin-left: auto;
              background: var(--color-background-darker);
              padding: 0 8px;
              border-radius: 10px;
              font-size: 11px;
            }
          }

          .argument-wrapper {
            margin-bottom: 4px;
          }
        }

        .add-response-area {
          margin-top: 8px;
          display: flex;
          justify-content: center;
        }

        .empty-detail {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          flex: 1;
          color: var(--color-text-lighter);

          p {
            margin: 0;
            font-style: italic;
          }

          svg {
            opacity: 0.3;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}

// ============================================
// ARGUMENT MAP VIEW
// ============================================

.map-view {
  .map-container {
    background: var(--color-background-dark);
    border-radius: $border-radius;
    border: 1px solid var(--color-border);
    padding: 24px;

    .map-header {
      text-align: center;
      margin-bottom: 24px;

      h3 {
        margin: 0 0 8px 0;
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text);
      }

      p {
        margin: 0;
        color: var(--color-text-lighter);
        font-size: 14px;
      }
    }

    .map-canvas {
      min-height: 400px;
      background: var(--color-background-darker);
      border-radius: $border-radius;
      border: 1px solid var(--color-border);
      padding: 24px;

      .map-network {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        .branches-level {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          width: 100%;
        }

        .map-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          min-width: 120px;
        }

        .map-child-wrapper {
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          max-width: 280px;
          position: relative;
          
          &.selected {
            :deep(.option-card) {
              border-color: var(--color-primary-element);
              box-shadow: 0 0 0 2px var(--color-primary-element);
            }
          }
          
          &:hover {
            transform: translateY(-2px);
            
            .map-tooltip {
              visibility: visible;
              opacity: 1;
            }
          }

          .map-child-tooltip {
            position: relative;
            
            .map-tooltip {
              visibility: hidden;
              opacity: 0;
              position: absolute;
              bottom: calc(100% + 10px);
              left: 50%;
              transform: translateX(-50%);
              z-index: 1000;
              min-width: 300px;
              max-width: 400px;
              background: var(--color-main-background);
              border: 1px solid var(--color-border);
              border-radius: 8px;
              padding: 12px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
              transition: all 0.3s ease;
              pointer-events: none;
              
              &::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 8px solid transparent;
                border-top-color: var(--color-main-background);
              }
            }
          }

          .map-grandchildren {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 4px;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px dashed var(--color-border-light);
          }

          .map-more {
            font-size: 10px;
            color: var(--color-text-lighter);
            padding: 2px 8px;
            background: var(--color-background-dark);
            border-radius: 12px;
            display: inline-block;
            margin-top: 4px;
          }
        }

        .map-node {
          background: var(--color-main-background);
          border: 2px solid var(--color-border);
          border-radius: 10px;
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          }

          &.selected {
            border-color: var(--color-primary-element);
            box-shadow: 0 0 0 2px var(--color-primary-element);
          }

          .node-content {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;

            &.small {
              font-size: 12px;
            }

            &.tiny {
              font-size: 10px;
            }

            .node-icon {
              flex-shrink: 0;
            }

            .node-label {
              flex: 1;
              font-weight: 500;
            }

            .node-type {
              font-size: 9px;
              color: var(--color-text-lighter);
              background: var(--color-background-dark);
              padding: 0 6px;
              border-radius: 8px;
              text-transform: uppercase;
              letter-spacing: 0.3px;
            }

            .node-badge {
              font-size: 10px;
              background: var(--color-primary-light);
              color: var(--color-primary-element);
              padding: 0 8px;
              border-radius: 10px;
              font-weight: 600;
            }
          }

          &.branch-node {
            padding: 12px 20px;
            min-width: 120px;

            &.for-node {
              border-color: $success-color;
              background: rgba($success-color, 0.08);
            }

            &.against-node {
              border-color: $error-color;
              background: rgba($error-color, 0.08);
            }

            &.neutral-node {
              border-color: $neutral-color;
              background: rgba($neutral-color, 0.08);
            }
          }

          &.grandchild-node {
            border-color: var(--color-border-light);
            background: var(--color-background-darker);
            padding: 4px 10px;
            min-width: auto;
            font-size: 10px;
          }

          .map-children {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px dashed var(--color-border-light);
          }
        }

        .map-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 60px;
          color: var(--color-text-lighter);

          svg {
            opacity: 0.3;
          }

          p {
            margin: 0;
            font-size: 16px;
          }

          .map-hint {
            font-size: 13px;
            font-style: italic;
          }
        }
      }
    }

    .map-legend {
      display: flex;
      gap: 16px;
      margin-top: 16px;
      padding: 12px 16px;
      background: var(--color-background-darker);
      border-radius: 8px;
      flex-wrap: wrap;
      justify-content: center;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--color-text-light);

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid var(--color-border);

          &.position-for {
            background: $success-color;
          }
          &.position-against {
            background: $error-color;
          }
          &.neutral {
            background: $neutral-color;
          }
          &.child {
            background: var(--color-border-dark);
          }
          &.selected {
            background: var(--color-primary-element);
            border-color: var(--color-primary-element);
          }
        }
      }
    }
  }
}

// ============================================
// Animations
// ============================================

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ============================================
// Scrollbars
// ============================================

.column-content,
.nav-tree,
.detail-body,
.map-canvas,
.unpaired-grid,
.child-grid {
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--color-text-lighter);
  }
}
</style>
