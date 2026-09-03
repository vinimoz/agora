<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="experience-renderer" :class="`experience-${experience}`">
    <!-- ============================================================ -->
    <!-- EXPERIENCE CONTROLS                                          -->
    <!-- ============================================================ -->
    <div class="experience-controls">
      <div class="controls-left">
        <ExperienceSwitcher
          :current-experience="experience"
          :available-experiences="availableExperiences"
          :default-experience="defaultExperience"
          @change="handleExperienceChange"
        />
      </div>
      <div class="controls-right">
        <DisplayModeSwitcher
          v-if="availableDisplays.length > 1 && !displayArchitecture"
          :current-mode="displayMode"
          :available-modes="availableDisplays"
          @change="handleDisplayChange"
        />
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- LOADING STATE                                                -->
    <!-- ============================================================ -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner" />
      <p>{{ t('agora', 'Loading experience…') }}</p>
    </div>

    <!-- ============================================================ -->
    <!-- ERROR STATE                                                  -->
    <!-- ============================================================ -->
    <div v-else-if="hasError" class="error-state">
      <component :is="Icons.AlertCircle" :size="48" />
      <h3>{{ t('agora', 'Error loading experience') }}</h3>
      <p>{{ errorMessage }}</p>
      <NcButton type="primary" @click="emit('retry')">
        {{ t('agora', 'Retry') }}
      </NcButton>
    </div>

    <!-- ============================================================ -->
    <!-- DYNAMIC LAYOUT - Based on displayArchitecture              -->
    <!-- ============================================================ -->
    <div
      v-else-if="filteredArchitecture && Object.keys(filteredArchitecture).length > 0" 
      class="architecture-grid"
      :style="gridStyle"
    >
      <div
        v-for="(zone, zoneKey) in filteredArchitecture"
        :key="zoneKey"
        class="architecture-zone"
        :class="[
          `zone-${zoneKey}`,
          `content-${zone.content || 'inquiries'}`,
          `display-${zone.display?.type || 'cards'}`
        ]"
        :style="getZoneStyle(zone)"
      >
        <!-- Zone Content -->
        <div class="zone-content">
          <!-- Show component if data exists -->
          <template v-if="hasZoneData(zone)">
            <component
              :is="getZoneComponent(zone)"
              v-bind="getZoneProps(zone)"
              :columns="getColumns(zone)"
              @view-inquiry="(inquiry) => handleInquiryClick(inquiry, zoneKey)"
              @view-option="(option) => handleOptionClick(option, zoneKey)"
              @view-group="handleViewGroup"
              @click="(item) => handleInquiryClick(item, zoneKey)"
              @select="handleViewGroup"
              @view="(item) => handleInquiryClick(item, zoneKey)"
            />
          </template>
          <!-- Show empty message if no data -->
          <div v-else class="zone-empty-message">
            {{ t('agora', 'No content available for this zone') }}
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- STANDARD LAYOUT - Fallback when no architecture defined      -->
    <!-- ============================================================ -->
    <div v-else class="standard-layout" :class="`layout-${layoutConfig.type}`">
      <!-- Sidebar -->
      <div v-if="layoutConfig.type === 'sidebar'" class="layout-sidebar">
        <ExperienceSidebar
          :group="group"
          :inquiries="inquiries"
          :options="options"
          :tools="tools"
          :show-resources="showResources"
          :show-comments="showComments"
          @navigate="handleSidebarNavigate"
          @toggle-resources="toggleResources"
          @toggle-comments="toggleComments"
        />
      </div>

      <!-- Main Content -->
      <div class="layout-main">
        <!-- Header -->
        <div v-if="showHeader" class="layout-header">
          <h1 class="layout-title">{{ groupTitle }}</h1>
          <p v-if="groupDescription" class="layout-description">{{ groupDescription }}</p>
          
          <div v-if="showStats" class="layout-stats">
            <div class="stat-item">
              <span class="stat-value">{{ inquiries ? inquiries.length : 0 }}</span>
              <span class="stat-label">{{ t('agora', 'Inquiries') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ options ? options.length : 0 }}</span>
              <span class="stat-label">{{ t('agora', 'Options') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ group?.participantCount || 0 }}</span>
              <span class="stat-label">{{ t('agora', 'Participants') }}</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="layout-content">
          <slot>
            <!-- Inquiries Grid -->
            <div v-if="displayedInquiries && displayedInquiries.length > 0" class="inquiries-grid" :class="displayModeClass">
              <template v-for="inquiry in displayedInquiries" :key="inquiry.id">
                <component
                  v-if="inquiry"
                  :is="getDisplayComponent(displayMode)"
                  :inquiry="inquiry"
                  :inquiries="displayedInquiries"
                  :mode="displayMode"
                  :horizontal="displayMode === 'horizontal'"
                  :compact="displayMode === 'compact'"
                  :show-cover="true"
                  :show-meta="true"
                  :show-stats="true"
                  :show-author="true"
                  :show-description="true"
                  :show-expiry="true"
                  :show-type="true"
                  :show-status="true"
                  :show-comments="true"
                  :show-support="true"
                  :show-participants="true"
                  :open-mode="'page'"
                  @click="handleInquiryClick(inquiry, 'fallback')"
                  @view="handleInquiryClick(inquiry, 'fallback')"
                />
              </template>
            </div>
            
            <!-- Empty State -->
            <div v-else class="empty-state">
              <component :is="Icons.FolderMultiple" :size="48" />
              <h3>{{ t('agora', 'No inquiries') }}</h3>
              <p>{{ t('agora', 'This group has no inquiries yet') }}</p>
              <NcButton v-if="canCreateInquiry" type="primary" @click="emit('createInquiry')">
                <template #icon>
                  <component :is="Icons.Plus" :size="18" />
                </template>
                {{ t('agora', 'Create Inquiry') }}
              </NcButton>
            </div>
          </slot>
        </div>

        <!-- Comments -->
        <div v-if="showComments" class="layout-comments">
          <div class="comments-header">
            <h3>{{ t('agora', 'Comments') }}</h3>
            <span class="comments-count">{{ totalComments }}</span>
          </div>
          <div>
            <SideBarTabComments :inquiry="selectedInquiry || (inquiries && inquiries[0])" />
          </div>
        </div>

        <!-- Resources -->
        <div v-if="showResources" class="layout-resources">
          <div>
            <SideBarTabResources :inquiry="selectedInquiry || (inquiries && inquiries[0])" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================
// IMPORTS
// ============================================================
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'

// Experience Components
import ExperienceSwitcher from './ExperienceSwitcher.vue'
import DisplayModeSwitcher from './DisplayModeSwitcher.vue'
import ExperienceSidebar from './ExperienceSidebar.vue'

// ============================================================
// INQUIRY DISPLAY COMPONENTS
// ============================================================
import InquiryCard from '../InquiryGroup/InquiryCard.vue'
import InquiryListItem from '../InquiryGroup/InquiryListItem.vue'
import InquiryGrid from '../InquiryGroup/InquiryGrid.vue'
import InquiryFeed from '../InquiryGroup/InquiryFeed.vue'
import InquiryTree from '../InquiryGroup/InquiryTree.vue'
import InquirySummary from '../InquiryGroup/InquirySummary.vue'
import InquiryRichHTML from '../InquiryGroup/InquiryRichHTML.vue'
import InquiryKanban from '../InquiryGroup/InquiryKanban.vue'
import InquiryTimeline from '../InquiryGroup/InquiryTimeline.vue'
import BookDisplay from '../InquiryGroup/BookDisplay.vue'
import InquiryGroupTree from '../InquiryGroup/InquiryGroupTree.vue'
// ⚠️ IMPORTANT: Add missing import for InquiryListNavigation
import InquiryListNavigation from '../InquiryGroup/InquiryListNavigation.vue'

// ============================================================
// GROUP DISPLAY COMPONENTS
// ============================================================
import InquiryGroupCatalog from '../InquiryGroup/InquiryGroupCatalog.vue'
import InquiryGroupNavigation from '../InquiryGroup/InquiryGroupNavigation.vue'

// ============================================================
// OPTION TOOL COMPONENTS
// ============================================================
import OptionToolDisplay from '../Options/OptionToolDisplay.vue'
import FamilyLayoutPaired from '../Options/FamilyLayouts/FamilyLayoutPaired.vue'
import FamilyLayoutTree from '../Options/FamilyLayouts/FamilyLayoutTree.vue'
import FamilyLayoutConsensusFlow from '../Options/FamilyLayouts/FamilyLayoutConsensusFlow.vue'
import FamilyLayoutKanban from '../FamilyLayouts/FamilyLayoutKanban.vue'
import FamilyLayoutTimeline from '../FamilyLayouts/FamilyLayoutTimeline.vue'
import FamilyLayoutVote from '../FamilyLayouts/FamilyLayoutVote.vue'

// ============================================================
// SIDEBAR COMPONENTS
// ============================================================
import SideBarTabComments from '../SideBar/SideBarTabComments.vue'
import SideBarTabResources from '../SideBar/SideBarTabResources.vue'

// ============================================================
// STATISTICS & ACTIVITY
// ============================================================
import StatisticsWidget from '../InquiryGroup/StatisticsWidget.vue'
import ActivityFeed from '../InquiryGroup/ActivityFeed.vue'

// ============================================================
// TYPES & HELPERS
// ============================================================
import type { InquiryGroup, InquiryGroupUIConfig } from '../stores/inquiryGroups.types'
import type { Inquiry } from '../../Types/index.ts'
import type { DisplayZone, GridPosition } from '../Types/experience.types'
import { useSessionStore } from '../../stores/session'
import { useCommentsStore } from '../../stores/comments'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups'
import { getExperienceArchitecture } from '../../composables/experienceArchitecture'
import { EXPERIENCE_DEFINITIONS, type ExperienceKey, type DisplayMode } from '../../composables/useExperience'
import { processZoneData } from '../../helpers/modules/filterHelpers'

// ============================================================
// IMPORT VOCABULARY
// ============================================================
import {
  DISPLAY_TYPE_VALUES,
  VALID_DISPLAYS_BY_CONTENT,
  VALID_TOOLS_BY_CONTENT,
  type DisplayTypeValue,
  type ToolValue,
} from '../Types/experience.types'

// ============================================================
// PROPS
// ============================================================
const props = defineProps<{
  group?: InquiryGroup | null
  inquiries?: Inquiry[]
  options?: any[]
  experience?: string
  displayMode?: string
  displayArchitecture?: Record<string, any> | null
  layoutConfig?: { type: string; columns?: number; rows?: number; responsive?: boolean }
  uiConfig?: InquiryGroupUIConfig | null
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string
  showHeader?: boolean
  showStats?: boolean
  showResources?: boolean
  showComments?: boolean
  tools?: string[]
  selectedInquiry?: Inquiry | null
  availableExperiences?: ExperienceKey[]
  defaultExperience?: ExperienceKey
}>()

// ============================================================
// EMITS
// ============================================================
const emit = defineEmits<{
  viewInquiry: [inquiry: Inquiry]
  viewOption: [option: any]
  viewGroup: [group: InquiryGroup]
  comment: [inquiryId: number, comment: any]
  support: [inquiryId: number, value: any]
  retry: []
  createInquiry: []
  sidebarNavigate: [target: string]
  experienceChange: [experience: ExperienceKey]
  displayChange: [mode: DisplayMode]
  selectInquiry: [inquiry: Inquiry]
  openPanel: [payload: { inquiry: Inquiry; zone: string; target: string }]
  navigateTo: [target: any]
}>()

// ============================================================
// STATE - Two-click interaction
// ============================================================
const selectedInquiryId = ref<number | null>(null)
const selectedOptionId = ref<number | null>(null)

// ============================================================
// STATE - UI toggles
// ============================================================
const internalShowResources = ref(props.showResources ?? true)
const internalShowComments = ref(props.showComments ?? true)

// ============================================================
// STORES
// ============================================================
const sessionStore = useSessionStore()
const commentsStore = useCommentsStore()

// ============================================================
// COMPUTED - Basic
// ============================================================
const experience = computed(() => props.experience || 'dashboard')
const displayArchitecture = computed(() => props.displayArchitecture || null)
const layoutConfig = computed(() => props.layoutConfig || { type: 'grid', columns: 3, rows: 2, responsive: true })

// ============================================================
// COMPUTED - Grid Style using position row/column/span (camelCase)
// ============================================================
const gridStyle = computed(() => {
  const cols = layoutConfig.value.columns || 3
  const rows = layoutConfig.value.rows || 2
  return {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '20px',
  }
})

// ============================================================
// COMPUTED - Available Experiences
// ============================================================
const availableExperiences = computed(() => {
  if (props.availableExperiences) {
    return props.availableExperiences
  }
  return Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
})

const defaultExperience = computed(() => props.defaultExperience || 'dashboard')

// ============================================================
// COMPUTED - Display Mode
// ============================================================
const displayModeClass = computed(() => {
  const mode = props.displayMode || 'cards'
  return `display-${mode}`
})

// ============================================================
// COMPUTED - Group Data
// ============================================================
const groupTitle = computed(() => props.group?.title || props.group?.name || t('agora', 'Group'))
const groupDescription = computed(() => props.group?.description || '')

const totalComments = computed(() => {
  if (!props.selectedInquiry && !props.inquiries?.length) return 0
  const targetId = props.selectedInquiry?.id || props.inquiries?.[0]?.id
  if (!targetId) return 0
  return commentsStore.comments.filter(c => c.inquiryId === targetId).length
})

const canCreateInquiry = computed(() => sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor)

// ============================================================
// Filter out null/undefined inquiries
// ============================================================
const displayedInquiries = computed(() => {
  if (!props.inquiries) return []
  return props.inquiries.filter(item => item != null)
})

// ============================================================
// COMPUTED - Available Displays
// ============================================================
const availableDisplays = computed(() => {
  const def = EXPERIENCE_DEFINITIONS[experience as ExperienceKey]
  return def?.allowedDisplays || ['cards', 'list']
})

// ============================================================
// COMPUTED - Filtered Architecture - Show all zones
// ============================================================
const filteredArchitecture = computed(() => {
  return effectiveArchitecture.value
})

// ============================================================
// COMPUTED - Zone Data Cache (to avoid recomputation)
// ============================================================
const zoneDataCache = computed(() => {
  const arch = filteredArchitecture.value
  const cache: Record<string, any[]> = {}
  for (const key in arch) {
    cache[key] = getZoneData(arch[key])
  }
  return cache
})

function hasZoneData(zone: any): boolean {
  if (!zone) return false
  const content = zone.content || 'inquiries'
  
  // Use cached data if available
  const zoneKey = Object.keys(filteredArchitecture.value).find(
    key => filteredArchitecture.value[key] === zone
  )
  const data = zoneKey && zoneDataCache.value[zoneKey] 
    ? zoneDataCache.value[zoneKey] 
    : getZoneData(zone)
  
  if (content === 'inquiry_groups') {
    return data && data.length > 0
  }
  if (content === 'inquiries') {
    return data && data.length > 0
  }
  if (content === 'inquiry') {
    const selected = getSelectedInquiry()
    return selected !== null
  }
  if (content === 'options') {
    const options = getZoneOptions(zone)
    return options && options.length > 0
  }
  if (content === 'comments') {
    const selected = getSelectedInquiry()
    if (!selected) return false
    const comments = commentsStore.comments.filter(c => c.inquiryId === selected.id)
    return comments && comments.length > 0
  }
  if (content === 'statistics') {
    return props.inquiries && props.inquiries.length > 0
  }
  if (content === 'activity') {
    return props.inquiries && props.inquiries.length > 0
  }
  return true
}

// ============================================================
// EFFECTIVE ARCHITECTURE (camelCase)
// ============================================================
const effectiveArchitecture = computed(() => {
  let arch = {}
  try {
    const exp = props.experience || 'dashboard'
    const groupDefault = props.uiConfig?.defaultExperience || 'dashboard'
    if (exp !== groupDefault) {
      const globalArch = getExperienceArchitecture(exp as ExperienceKey)
      arch = globalArch?.displayArchitecture || {}
    } else if (props.displayArchitecture && Object.keys(props.displayArchitecture).length > 0) {
      arch = props.displayArchitecture
    } else {
      arch = getExperienceArchitecture('dashboard')?.displayArchitecture || {}
    }
  } catch (e) {
    console.warn('Error computing architecture:', e)
    arch = {}
  }
  return Object.fromEntries(
    Object.entries(arch).filter(([_, value]) => value != null)
  )
})

// ============================================================
// ZONE GRID POSITION HELPER (camelCase)
// ============================================================
function getZoneGridPosition(zone: any): GridPosition | null {
  if (!zone || !zone.position) return null
  
  const pos = zone.position
  return {
    row: pos.row || 1,
    column: pos.column || 1,
    rowSpan: pos.rowSpan || 1,
    columnSpan: pos.columnSpan || 1,
  }
}

function getColumns(zone: any): number {
  const display = zone.display || { type: 'cards' }
  return display.options?.cardsPerRow || 3
}

// ============================================================
// ZONE DATA HELPERS
// ============================================================
function getZoneData(zone: any) {
  if (!zone) return []

  const content = zone.content || 'inquiries'
  const scope = zone.scope || { source: 'all' }
  const source = scope.source || 'all'

  const rawData = fetchRawData(content, source)

  return rawData
  /*
  return processZoneData(rawData, {
    filter: zone.filter,
    sort: scope.sort,
    pagination: scope.pagination
  })*/
}

function fetchRawData(content: string, source: string) {
  switch (content) {
    case 'inquiry_groups':
      const groupsStore = useInquiryGroupsStore()
      if (source === 'children' && props.group) {
	const children = groupsStore.byParentId(props.group.id)
        return children || []

      }
      // return props.groups || []
       return groupsStore.inquiryGroups || []

    case 'inquiries':
      if (source === 'selected_inquiry') {
        const selected = getSelectedInquiry()
        return selected ? [selected] : []
      }
      return props.inquiries || []

    case 'inquiry':
      const selected = getSelectedInquiry()
      return selected ? [selected] : []

    case 'options':
      const sel = getSelectedInquiry()
      if (!sel) return []
      return (props.options || []).filter(opt => opt.inquiryId === sel.id)

    case 'resources':
      return getResourcesForInquiry(getSelectedInquiry())

    case 'comments':
      return getCommentsForInquiry(getSelectedInquiry())

    case 'statistics':
      return props.inquiries || []

    case 'activity':
      return props.inquiries || []

    default:
      return []
  }
}

function getResourcesForInquiry(inquiry: Inquiry | null): any[] {
  if (!inquiry) return []
  return inquiry.miscFields?.resources || []
}

function getCommentsForInquiry(inquiry: Inquiry | null): any[] {
  if (!inquiry) return []
  return commentsStore.comments.filter(c => c.inquiryId === inquiry.id)
}

function getSelectedInquiry(): Inquiry | null {
  if (props.selectedInquiry) return props.selectedInquiry
  if (props.inquiries && props.inquiries.length > 0) {
    return props.inquiries[0]
  }
  return null
}

// ============================================================
// ZONE COMPONENT RESOLVER
// ============================================================
function getZoneComponent(zone: any) {
  if (!zone) return null

  const content = zone.content || 'inquiries'
  const display = zone.display || { type: 'cards' }
  const type = display.type || 'cards'
  const tool = display.tool

  // COMPONENT MAP - using only valid DisplayType values
  const componentMap: Record<string, any> = {
    // ---- Inquiry Groups ----
    inquiry_groups: {
      'list': InquiryGroupCatalog,
      'cards': InquiryGroupCatalog,
      'tree': InquiryGroupTree,
      'navigation': InquiryGroupNavigation,
    },

    // ---- Inquiries (plural) ----
    inquiries: {
      'list': InquiryListItem,
      'cards': InquiryGrid,
      'feed': InquiryFeed,
      'tree': InquiryTree,
      'timeline': InquiryTimeline,
      'kanban': InquiryKanban,
      'book': BookDisplay,
      'navigation': InquiryListNavigation, // ✅ Now properly imported
      'tool': getToolComponent(tool, content),
    },

    // ---- Options ----
    options: {
      'tool': getToolComponent(tool, content),
    },

    // ---- Resources ----
    resources: {
      'list': SideBarTabResources,
      'full': SideBarTabResources,
    },

    // ---- Comments ----
    comments: {
      'feed': SideBarTabComments,
      'list': SideBarTabComments,
    },

    // ---- Statistics ----
    statistics: {
      'widget': StatisticsWidget,
      'list': StatisticsWidget,
      'cards': StatisticsWidget,
    },

    // ---- Activity ----
    activity: {
      'feed': ActivityFeed,
      'list': ActivityFeed,
    },
  }

  const contentComponents = componentMap[content]
  if (!contentComponents) return InquiryCard

  const component = contentComponents[type]
  if (!component) {
    return contentComponents['cards'] || InquiryCard
  }

  return component
}

// ============================================================
// TOOL COMPONENT RESOLVER
// ============================================================
function getToolComponent(tool: string, content: string) {
  const toolMap: Record<string, any> = {
    'vote': FamilyLayoutVote,
    'timeline': FamilyLayoutTimeline,
    'kanban': FamilyLayoutKanban,
    'consensus': FamilyLayoutConsensusFlow,
    'debate': FamilyLayoutPaired,
    'structure': FamilyLayoutTree,
  }

  const comp = toolMap[tool]
  if (comp) return comp

  return content === 'options' ? OptionToolDisplay : InquiryCard
}

// ============================================================
// DISPLAY COMPONENT (fallback) - only valid DisplayType
// ============================================================
function getDisplayComponent(mode: string) {
  const map: Record<string, any> = {
    cards: InquiryCard,
    list: InquiryListItem,
    feed: InquiryFeed,
    tree: InquiryTree,
    timeline: InquiryTimeline,
    kanban: InquiryKanban,
    book: InquiryRichHTML,
    widget: InquiryCard,
    tool: InquiryCard,
    navigation: InquiryGroupNavigation,
  }
  
  return map[mode] || InquiryCard
}

// ============================================================
// ZONE PROPS RESOLVER
// ============================================================
// ============================================================
// ZONE PROPS RESOLVER - Fixed inquiry_groups case
// ============================================================
function getZoneProps(zone: any) {
  if (!zone) return {}

  const content = zone.content || 'inquiries'
  const display = zone.display || { type: 'cards' }
  const type = display.type || 'cards'
  const tool = display.tool

  const displayOptions = display.options || {}
  
  const baseProps = {
    group: props.group,
    showResources: props.showResources,
    showComments: props.showComments,
    showIcon: displayOptions.showIcon !== undefined ? displayOptions.showIcon : true,
    showCover: displayOptions.showCover !== undefined ? displayOptions.showCover : true,
    showMeta: displayOptions.showMeta !== undefined ? displayOptions.showMeta : true,
    showStats: displayOptions.showStats !== undefined ? displayOptions.showStats : true,
    showAuthor: displayOptions.showAuthor !== undefined ? displayOptions.showAuthor : true,
    showDescription: displayOptions.showDescription !== undefined ? displayOptions.showDescription : true,
    showExpiry: displayOptions.showExpiry !== undefined ? displayOptions.showExpiry : true,
    showType: displayOptions.showType !== undefined ? displayOptions.showType : true,
    showStatus: displayOptions.showStatus !== undefined ? displayOptions.showStatus : true,
    showSupport: displayOptions.showSupport !== undefined ? displayOptions.showSupport : true,
    showParticipants: displayOptions.showParticipants !== undefined ? displayOptions.showParticipants : true,
    horizontal: displayOptions.horizontal || false,
    dense: displayOptions.dense || false,
    compact: displayOptions.compact || false,
    interactive: displayOptions.interactive !== undefined ? displayOptions.interactive : true,
    displayMode: type,
    openMode: displayOptions.openMode || 'page',
    mode: type === 'list' ? 'list' : 'cards',
  }

  const data = getZoneData(zone)
  const selectedInquiry = getSelectedInquiry()

  switch (content) {
    case 'inquiry_groups': {
      // Get groups from the store if data is empty
      let groupsData = data
      if (!groupsData || groupsData.length === 0) {
        const groupsStore = useInquiryGroupsStore()
        if (props.group?.id) {
          groupsData = groupsStore.byParentId(props.group.id)
        } else {
          groupsData = groupsStore.inquiryGroups || []
        }
      }
      
      return {
        ...baseProps,
        groups: groupsData,
        activeId: props.group?.id,
        showCreateButton: true,
        families: zone.scope?.families || [],
        mode: type === 'list' ? 'list' : 'cards',
      }
    }

    case 'inquiries': {
      const inquiriesData = data.length > 0 ? data : props.inquiries || []
      const isSingle = inquiriesData.length === 1
      const singleInquiry = isSingle ? inquiriesData[0] : null
      const cardsPerRow = display.cardsPerRow || 3

      return {
        ...baseProps,
        inquiries: inquiriesData,
        inquiryIds: inquiriesData.map(i => i.id),
        group: props.group,
        columns: cardsPerRow,
        selectedInquiry: selectedInquiry,
        tool: tool,
        families: zone.scope?.families || [],
        family: zone.scope?.family || null,
        optionTypes: sessionStore.appSettings?.inquiryOptionTypeTab || [],
        mode: type === 'list' ? 'list' : 'cards',
        inquiry: singleInquiry,
        initialInquiry: inquiriesData.length > 0 ? inquiriesData[0] : null,
      }
    }

    case 'inquiry': {
      const inquiryData = data.length > 0 ? data[0] : selectedInquiry || props.inquiries?.[0]
      const inquiriesData = data.length > 0 ? data : [inquiryData].filter(Boolean)
      
      return {
        ...baseProps,
        inquiry: inquiryData,
        inquiries: inquiriesData,
        group: props.group,
        displayMode: type === 'book' ? 'book' : type,
        openMode: displayOptions.openMode || 'none',
      }
    }

    case 'options':
      return {
        ...baseProps,
        options: data,
        targetType: selectedInquiry?.type,
        parentId: selectedInquiry?.id,
        inquiry: selectedInquiry,
        inquiryId: selectedInquiry?.id,
        tool: tool,
        families: zone.scope?.families || [],
        family: zone.scope?.family || null,
        optionTypes: sessionStore.appSettings?.inquiryOptionTypeTab || [],
      }

    case 'resources':
      return {
        ...baseProps,
        inquiry: selectedInquiry,
        inquiryId: selectedInquiry?.id,
        showResources: true,
      }

    case 'comments':
      return {
        ...baseProps,
        inquiry: selectedInquiry,
        inquiryId: selectedInquiry?.id,
      }

    case 'statistics':
      return {
        ...baseProps,
        inquiries: data,
        groupId: props.group?.id,
      }

    case 'activity':
      return {
        ...baseProps,
        inquiries: data,
        limit: zone.scope?.pagination?.limit || 20,
      }

    default:
      return {
        ...baseProps,
        data: data,
        content: content,
        group: props.group,
      }
  }
}

// ============================================================
// ZONE HELPERS
// ============================================================
function getZoneLabel(zone: any): string {
  if (!zone) return ''
  const labels: Record<string, string> = {
    inquiry_groups: t('agora', 'Groups'),
    inquiries: t('agora', 'Inquiries'),
    options: t('agora', 'Options'),
    resources: t('agora', 'Resources'),
    comments: t('agora', 'Comments'),
    statistics: t('agora', 'Statistics'),
    activity: t('agora', 'Activity'),
  }
  return labels[zone.content] || ''
}

function getZoneCount(zone: any): number | null {
  if (!zone) return null
  const content = zone.content || 'inquiries'
  const data = getZoneData(zone)
  return data.length
}

function getZoneOptions(zone: any) {
  const content = zone.content || 'inquiries'
  if (content !== 'options') return props.options || []
  
  const scope = zone.scope || { source: 'selected_inquiry' }
  const source = scope.source || 'selected_inquiry'
  
  let data: any[] = []
  
  if (source === 'selected_inquiry') {
    const selected = getSelectedInquiry()
    if (selected) {
      data = (props.options || []).filter(o => o.inquiryId === selected.id)
    }
  } else {
    data = props.options || []
  }
  
  return processZoneData(data, {
    filter: zone.filter,
    sort: scope.sort,
    pagination: scope.pagination
  })
}

function getZoneStyle(zone: any) {
  if (!zone) return {}
  
  const pos = getZoneGridPosition(zone)
  const styles: Record<string, string> = {}
  
  if (pos) {
    styles.gridRow = `${pos.row} / span ${pos.rowSpan || 1}`
    styles.gridColumn = `${pos.column} / span ${pos.columnSpan || 1}`
  }
  
  const display = zone.display || {}
  if (display.width) styles.width = display.width
  if (display.height) styles.height = display.height
  if (display.background) styles.background = display.background
  
  return styles
}

// ============================================================
// TWO-CLICK INTERACTION HANDLERS
// ============================================================

function handleInquiryClick(inquiry: Inquiry, zoneKey: string) {
  if (!inquiry) return
  
  const zone = filteredArchitecture.value[zoneKey]
  
  // First click - select the inquiry
  if (selectedInquiryId.value !== inquiry.id) {
    selectedInquiryId.value = inquiry.id
    selectedOptionId.value = null
    emit('selectInquiry', inquiry)
    return
  }
  
  // Second click - perform interaction
  if (zone?.interaction) {
    const { action, target } = zone.interaction
    
    if (target === 'page' || target === 'panel') {
      emit('viewInquiry', inquiry)
      return
    }
    
    switch (action) {
      case 'open':
        emit('viewInquiry', inquiry)
        break
      case 'navigate':
        emit('navigateTo', inquiry)
        break
      case 'select':
        break
      default:
        emit('viewInquiry', inquiry)
    }
  } else {
    emit('viewInquiry', inquiry)
  }
}

function handleOptionClick(option: any, zoneKey: string) {
  if (!option) return
  
  const zone = filteredArchitecture.value[zoneKey]
  
  if (selectedOptionId.value !== option.id) {
    selectedOptionId.value = option.id
    selectedInquiryId.value = null
    return
  }
  
  if (zone?.interaction) {
    const { action, target } = zone.interaction
    if (action === 'open') {
      if (target === 'page' || target === 'panel' || target === 'modal' || target === 'dialog') {
        emit('viewOption', option)
      } else {
        emit('viewOption', option)
      }
    } else {
      emit('viewOption', option)
    }
  } else {
    emit('viewOption', option)
  }
}

// ============================================================
// LEGACY EVENT HANDLERS
// ============================================================
function handleViewInquiry(inquiry: Inquiry) {
  if (!inquiry) return
  const zoneKey = findZoneForInquiry(inquiry)
  handleInquiryClick(inquiry, zoneKey || 'fallback')
}

function handleViewOption(option: any) {
  if (!option) return
  const zoneKey = findZoneForOption(option)
  handleOptionClick(option, zoneKey || 'fallback')
}

function handleViewGroup(group: InquiryGroup) {
  if (!group) {
    console.warn('Attempted to view null/undefined group')
    return
  }
  emit('viewGroup', group)
}

function findZoneForInquiry(inquiry: Inquiry): string | null {
  for (const [key, zone] of Object.entries(filteredArchitecture.value)) {
    if (zone.content === 'inquiries' || zone.content === 'inquiry') {
      const data = getZoneData(zone)
      if (data.some((item: any) => item.id === inquiry.id)) {
        return key
      }
    }
  }
  return null
}

function findZoneForOption(option: any): string | null {
  for (const [key, zone] of Object.entries(filteredArchitecture.value)) {
    if (zone.content === 'options') {
      const data = getZoneData(zone)
      if (data.some((item: any) => item.id === option.id)) {
        return key
      }
    }
  }
  return null
}

function handleSidebarNavigate(target: string) {
  emit('sidebarNavigate', target)
}

function handleExperienceChange(key: ExperienceKey) {
  emit('experienceChange', key)
}

function handleDisplayChange(mode: DisplayMode) {
  emit('displayChange', mode)
}

function toggleResources() {
  internalShowResources.value = !internalShowResources.value
  emit('update:showResources', internalShowResources.value)
}

function toggleComments() {
  internalShowComments.value = !internalShowComments.value
  emit('update:showComments', internalShowComments.value)
}

// ============================================================
// WATCHERS
// ============================================================
watch(
  () => props.selectedInquiry,
  (newVal) => {
    if (newVal) {
      selectedInquiryId.value = newVal.id
    }
  }
)

watch(
  () => props.inquiries,
  () => {
    if (selectedInquiryId.value && props.inquiries) {
      const stillExists = props.inquiries.some(i => i.id === selectedInquiryId.value)
      if (!stillExists) {
        selectedInquiryId.value = null
      }
    }
  }
)
</script>

<style lang="scss" scoped>
/* ============================================================ */
/* EXPERIENCE RENDERER STYLES                                   */
/* ============================================================ */
.experience-renderer {
  width: 100%;
  min-height: 400px;
}

.experience-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  .controls-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .controls-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

/* ============================================================ */
/* LOADING & ERROR STATES                                       */
/* ============================================================ */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary-element);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    margin-top: 16px;
    color: var(--color-text-lighter);
  }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  text-align: center;

  svg {
    color: var(--color-error);
    opacity: 0.5;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: var(--color-main-text);
  }

  p {
    margin: 0 0 24px 0;
    color: var(--color-text-lighter);
    max-width: 400px;
  }
}

/* ============================================================ */
/* ARCHITECTURE GRID - Using CSS Grid with row/column positions */
/* ============================================================ */
.architecture-grid {
  display: grid;
  gap: 20px;
  min-height: 400px;

  .architecture-zone {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 200px;

    .zone-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      min-height: 100px;
    }

    .zone-empty-message {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      color: var(--color-text-lighter);
      font-size: 14px;
      font-style: italic;
      text-align: center;
      background: var(--color-background-dark);
      border-radius: 8px;
      min-height: 100px;
    }
  }
}

/* ============================================================ */
/* STANDARD LAYOUT                                              */
/* ============================================================ */
.standard-layout {
  display: flex;
  gap: 24px;

  &.layout-sidebar {
    .layout-sidebar {
      flex: 0 0 280px;
      max-width: 280px;
    }
    .layout-main {
      flex: 1;
      min-width: 0;
    }
  }

  &.layout-split {
    .layout-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
  }

  .layout-sidebar {
    position: sticky;
    top: 0;
    height: fit-content;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding-right: 8px;
  }

  .layout-main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-width: 0;
  }
}

.layout-header {
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-border);

  .layout-title {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: var(--color-main-text);
  }

  .layout-description {
    margin: 0 0 16px 0;
    color: var(--color-text-lighter);
    font-size: 16px;
  }

  .layout-stats {
    display: flex;
    gap: 24px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border-light);

    .stat-item {
      .stat-value {
        display: block;
        font-size: 20px;
        font-weight: 700;
        color: var(--color-main-text);
      }

      .stat-label {
        font-size: 12px;
        color: var(--color-text-lighter);
      }
    }
  }
}

.layout-content {
  .inquiries-grid {
    display: grid;
    gap: 20px;

    &.display-cards {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }

    &.display-horizontal {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &.display-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &.display-compact {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
    }
  }
}

.layout-comments,
.layout-resources {
  padding-top: 20px;
  border-top: 2px solid var(--color-border);
  margin-top: 8px;

  .comments-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .comments-count {
      font-size: 12px;
      font-weight: 600;
      background: var(--color-background-dark);
      padding: 2px 10px;
      border-radius: 12px;
      color: var(--color-text-lighter);
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  text-align: center;

  svg {
    color: var(--color-text-lighter);
    opacity: 0.3;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: var(--color-main-text);
  }

  p {
    margin: 0 0 24px 0;
    color: var(--color-text-lighter);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================================ */
/* RESPONSIVE - Adapt grid to available space                   */
/* ============================================================ */
@media (max-width: 1400px) {
  .architecture-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 1024px) {
  .architecture-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  .standard-layout {
    &.layout-sidebar {
      flex-direction: column;

      .layout-sidebar {
        flex: none;
        max-width: 100%;
        width: 100%;
        position: static;
        max-height: none;
        padding-right: 0;
      }
    }

    &.layout-split {
      .layout-main {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media (max-width: 768px) {
  .architecture-grid {
    grid-template-columns: 1fr !important;
  }

  .layout-content .inquiries-grid {
    &.display-cards {
      grid-template-columns: 1fr;
    }
  }

  .experience-controls {
    flex-direction: column;
    align-items: stretch;

    .controls-left,
    .controls-right {
      justify-content: center;
    }
  }
}
</style>
