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
          v-if="availableDisplays.length > 1"
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
    <!-- DYNAMIC LAYOUT - Based on display_architecture              -->
    <!-- ============================================================ -->
    <div
v-else-if="displayArchitecture && Object.keys(displayArchitecture).length > 0" 
         class="architecture-grid" 
         :class="layoutClasses">
      <div
        v-for="(zone, zoneKey) in displayArchitecture"
        :key="zoneKey"
        class="architecture-zone"
        :class="`zone-${zoneKey}`"
        :style="getZoneStyle(zone)"
      >
        <!-- Zone Header -->
        <div v-if="getZoneLabel(zone)" class="zone-header">
          <span class="zone-label">{{ getZoneLabel(zone) }}</span>
          <span v-if="getZoneCount(zone)" class="zone-count">{{ getZoneCount(zone) }}</span>
        </div>

        <!-- Zone Content -->
        <div class="zone-content">
          <component
            :is="getZoneComponent(zone)"
            v-bind="getZoneProps(zone)"
            @view-inquiry="handleViewInquiry"
            @view-option="handleViewOption"
            @view-group="handleViewGroup"
            @comment="handleComment"
            @support="handleSupport"
          />
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
              <span class="stat-value">{{ inquiries.length }}</span>
              <span class="stat-label">{{ t('agora', 'Inquiries') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ options.length }}</span>
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
            <div v-if="inquiries && inquiries.length > 0" class="inquiries-grid" :class="displayModeClass">
		    <component
  :is="getDisplayComponent(displayMode)"
  v-for="inquiry in displayedInquiries"
  :key="inquiry.id"
  :inquiry="inquiry"
  :horizontal="displayMode === 'horizontal'"
  :dense="displayMode === 'compact'"
/>
            </div>
            
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
        <div v-if="showComments && config.showComments !== false" class="layout-comments">
          <div class="comments-header">
            <h3>{{ t('agora', 'Comments') }}</h3>
            <span class="comments-count">{{ totalComments }}</span>
          </div>
          <SideBarTabComments :inquiry="selectedInquiry || inquiries[0]" />
        </div>

        <!-- Resources -->
        <div v-if="showResources && config.showResources !== false" class="layout-resources">
          <SideBarTabResources :inquiry="selectedInquiry || inquiries[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================
// IMPORTS
// ============================================================
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'

// Experience Components
import ExperienceSwitcher from './ExperienceSwitcher.vue'
import DisplayModeSwitcher from './DisplayModeSwitcher.vue'
import ExperienceSidebar from './ExperienceSidebar.vue'

// Display Components
import InquiryCard from '../InquiryGroup/InquiryCard.vue'
import InquiryGroupViewMain from '../InquiryGroup/InquiryGroupViewMain.vue'
import InquiryListItem from '../InquiryGroup/InquiryListItem.vue'
import InquiryFull from '../InquiryGroup/InquiryFull.vue'
import InquiryRichHTML from '../InquiryGroup/InquiryRichHTML.vue'
import InquirySummary from '../InquiryGroup/InquirySummary.vue'
import SideBarTabComments from '../SideBar/SideBarTabComments.vue'
import SideBarTabResources from '../SideBar/SideBarTabResources.vue'


import InquiryFeed from '../InquiryGroup/InquiryFeed.vue'
import InquiryTree from '../InquiryGroup/InquiryTree.vue'
import InquiryGrid from '../InquiryGroup/InquiryGrid.vue'
import InquiryGroupCatalog from '../InquiryGroup/InquiryGroupCatalog.vue'
import InquiryGroupNavigation from '../InquiryGroup/InquiryGroupNavigation.vue'
import OptionCard from '../Options/OptionCard.vue'
import StatisticsWidget from '../InquiryGroup/StatisticsWidget.vue'
import ActivityFeed from '../InquiryGroup/ActivityFeed.vue'
import FamilyLayoutPaired from '../Options/FamilyLayouts/FamilyLayoutPaired.vue'
import FamilyLayoutTree from '../Options/FamilyLayouts/FamilyLayoutTree.vue'

// ============================================================
// IMPORT - Option Tool Display (renamed from FamilyToolsDisplay)
// ============================================================
import OptionToolDisplay from '../Options/OptionToolDisplay.vue'

// ============================================================
// IMPORT - Tool components (can be used for both Options AND Inquiries)
// ============================================================
import FamilyLayoutKanban from '../FamilyLayouts/FamilyLayoutKanban.vue'
import FamilyLayoutTimeline from '../FamilyLayouts/FamilyLayoutTimeline.vue'
import FamilyLayoutVote from '../FamilyLayouts/FamilyLayoutVote.vue'

// ============================================================
// IMPORT - Types and Helpers
// ============================================================
import type { InquiryGroup, InquiryGroupUIConfig } from '../stores/inquiryGroups.types'
import type { Inquiry } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session'
import { useCommentsStore } from '../../stores/comments'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups'

import { EXPERIENCE_DEFINITIONS, type ExperienceKey, type DisplayMode } from '../../composables/useExperience'
import { getExperienceArchitecture } from '../../composables/experienceArchitecture'
import { processScopeData } from '../../helpers/modules/filterHelpers'

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
}>()

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
const layoutConfig = computed(() => props.layoutConfig || { type: 'full', columns: 2, rows: 2 })

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

const layoutClasses = computed(() => ({
  [`layout-${layoutConfig.value.type}`]: true,
  [`cols-${layoutConfig.value.columns || 2}`]: true,
  'is-responsive': layoutConfig.value.responsive !== false,
}))

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

const displayedInquiries = computed(() => {
  if (!props.inquiries) return []
  return props.inquiries
})

// ============================================================
// COMPUTED - Available Displays
// ============================================================
const availableDisplays = computed(() => {
  const def = EXPERIENCE_DEFINITIONS[experience as ExperienceKey]
  return def?.allowedDisplays || ['cards', 'list', 'grid']
})

// ============================================================
// ZONE DATA HELPERS
// ============================================================

/**
 * Get data for a zone based on its scope
 * Applies filters, sorting, and pagination
 * @param zone
 */
function getZoneData(zone: any) {
  const scope = zone.scope || { source: 'all' }
  const source = scope.source || 'all'
  
  let data: any[] = []
  
  switch (source) {
    case 'selected':
    case 'selected_inquiry':
      const selected = getSelectedInquiry()
      data = selected ? [selected] : []
      break
    case 'children':
      data = props.inquiries || []
      break
    case 'group':
      data = props.inquiries || []
      break
    case 'all':
      data = props.inquiries || []
      break
    default:
      data = props.inquiries || []
  }

  // Apply filters, sort, pagination
  return processScopeData(data, {
    filter: scope.filter,
    sort: scope.sort,
    pagination: scope.pagination
  })
}

// ============================================================
// COMPLETE DISPLAY COMPONENT MAP
// ============================================================

function getDisplayComponent(mode: DisplayMode) {
  const map: Record<DisplayMode, any> = {
    // Standard display modes
    cards: InquiryCard,
    list: InquiryListItem,
    grid: InquiryGrid,          // dedicated grid component
    feed: InquiryFeed,          // feed component
    timeline: FamilyLayoutTimeline,
    kanban: FamilyLayoutKanban,
    map: InquiryCard,           // Placeholder - could use a map component
    wiki: InquiryRichHTML,
    full: InquiryFull,
    compact: InquiryCard,       // Uses card with compact prop
    summary: InquirySummary,
    horizontal: InquiryCard,    // Uses card with horizontal prop
    split: InquiryFull,         // Split view shows full with sidebar
    tree: InquiryTree,          //  tree view
    book: InquiryRichHTML,      // Book/reading style
    navigation: InquiryGroupNavigation, // Navigation style
    widget: StatisticsWidget,   // Widget style - uses statistics
  }
  return map[mode] || InquiryCard
}

/**
 * Get options for a zone
 * @param zone
 */
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
  
  return processScopeData(data, {
    filter: scope.filter,
    sort: scope.sort,
    pagination: scope.pagination
  })
}

/**
 * Get inquiry IDs from zone data
 * @param zone
 */
function getZoneInquiryIds(zone: any) {
  const data = getZoneData(zone)
  return data.map((i: any) => i.id)
}

/**
 * Get the selected inquiry (from props or first in list)
 */
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

const zoneComponentMap: Record<string, any> = {
  // Inquiries
  'inquiries_cards': InquiryCard,
  'inquiries_list': InquiryListItem,
  'inquiries_full': InquiryFull,
  'inquiries_summary': InquirySummary,
  'inquiries_feed': InquiryFeed,        
  'inquiries_tree': InquiryTree,     
  // Options
  'options_cards': OptionCard,
  'options_list': OptionCard,
  // Resources
  'resources_list': SideBarTabResources,
  // Comments
  'comments_feed': SideBarTabComments,
  // Groups
  'inquiry_groups_cards': InquiryGroupCatalog,
  'inquiry_groups_navigation': InquiryGroupNavigation,
  // Fallback by content type
  'inquiries': InquiryGroupViewMain,
  'options': OptionToolDisplay,
  'resources': SideBarTabResources,
  'comments': SideBarTabComments,
  'inquiry_groups': InquiryGroupCatalog,
  'statistics': StatisticsWidget,
  'activity': ActivityFeed,
}

/**
 * Get the appropriate component for a display zone
 * 
 * Implements the architecture from "La séparation est maintenant claire.txt":
 * - display.type === 'tool' + content === 'options' → OptionToolDisplay
 * - display.type === 'tool' + content === 'inquiries' → direct tool mapping
 * - Otherwise → standard display modes
 */

// ============================================================
// ZONE COMPONENT RESOLVER - Complete
// ============================================================

function getZoneComponent(zone: any) {
  const content = zone.content || 'inquiries'
  const display = zone.display || { type: 'cards' }

  // ============================================================
  // CASE 1: TOOL DISPLAY
  // ============================================================
  if (display.type === 'tool' && display.tool) {

    // 1a. OPTIONS CONTENT → Specific tool or OptionToolDisplay
    if (content === 'options') {
      const toolMap: Record<string, any> = {
        debate: FamilyLayoutPaired,
        consensus: FamilyLayoutTree,
        structure: FamilyLayoutTree,
        kanban: FamilyLayoutKanban,
        timeline: FamilyLayoutTimeline,
        vote: FamilyLayoutVote,
      }
      return toolMap[display.tool] || OptionToolDisplay
    }

    // 1b. INQUIRIES CONTENT → Direct tool mapping
    if (content === 'inquiries') {
      const inquiryToolMap: Record<string, any> = {
        kanban: FamilyLayoutKanban,
        timeline: FamilyLayoutTimeline,
        vote: FamilyLayoutVote,
        feed: InquiryFeed,
        tree: InquiryTree,
      }
      return inquiryToolMap[display.tool] || InquiryGroupViewMain
    }
  }

  // ============================================================
  // CASE 2: FAMILY TOOLS (legacy compatibility)
  // ============================================================
  if (display.type === 'family_tools') {
    return OptionToolDisplay
  }

  // ============================================================
  // CASE 3: STANDARD DISPLAY MODES
  // ============================================================
  const displayTypeMap: Record<string, string> = {
    'list': '_list',
    'card': '_cards',
    'cards': '_cards',
    'grid': '_grid',
    'book': '_book',
    'full': '_full',
    'summary': '_summary',
    'tree': '_tree',
    'navigation': '_navigation',
    'feed': '_feed',
    'widget': '_widget',
    'horizontal': '_horizontal',
    'compact': '_compact',
    'rich_html': '_rich_html',
    'debate': '_debate',
    'consensus': '_consensus',
    'structure': '_structure',
    'kanban': '_kanban',
    'timeline': '_timeline',
    'vote': '_vote',
  }

  if (display.type in displayTypeMap) {
    const key = `${content}${displayTypeMap[display.type]}`
    const component = zoneComponentMap[key] || zoneComponentMap[content] || InquiryGroupViewMain
    return component
  }

  // ============================================================
  // CASE 4: CONTENT-BASED FALLBACK
  // ============================================================
  return zoneComponentMap[content] || InquiryGroupViewMain
}

// ============================================================
// ZONE PROPS RESOLVER
// ============================================================

function getZoneProps(zone: any) {
  const baseProps = {
    group: props.group,
    inquiries: getZoneData(zone),
    options: getZoneOptions(zone),
    showResources: props.showResources,
    showComments: props.showComments,
  }
  
  const content = zone.content || 'inquiries'
  
  switch (content) {
    case 'options':
      return {
        ...baseProps,
        inquiryId: getSelectedInquiry()?.id,
        specificFamily: zone.scope?.family,
        families: zone.scope?.families,
      }
    
    case 'inquiries':
      return {
        ...baseProps,
        selectedInquiry: getSelectedInquiry(),
        inquiryIds: getZoneInquiryIds(zone),
      }
    
    case 'resources':
    case 'comments':
      return {
        ...baseProps,
        inquiry: getSelectedInquiry() || props.inquiries?.[0],
      }
    
    case 'inquiry_groups':
      return {
        ...baseProps,
        groups: getChildGroups(),
        onNavigate: handleViewGroup,
      }
    
    default:
      return baseProps
  }
}

// ============================================================
// ZONE LABEL & COUNT HELPERS
// ============================================================

function getZoneLabel(zone: any): string {
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
  const content = zone.content || 'inquiries'
  
  switch (content) {
    case 'inquiry_groups':
      return getChildGroups().length
    case 'inquiries':
      return getZoneData(zone).length
    case 'options':
      return getZoneOptions(zone).length
    default:
      return null
  }
}

function getZoneStyle(zone: any) {
  const display = zone.display || {}
  const styles: Record<string, string> = {}
  
  if (display.width) styles['--zone-width'] = display.width
  if (display.height) styles['--zone-height'] = display.height
  if (display.background) styles['--zone-background'] = display.background
  
  return styles
}


function getChildGroups(): InquiryGroup[] {
  const store = useInquiryGroupsStore()
  if (!props.group?.id) return []
  return store.byParentId(props.group.id)
}

// ============================================================
// EVENT HANDLERS
// ============================================================

function handleViewInquiry(inquiry: Inquiry) {
  emit('viewInquiry', inquiry)
}

function handleViewOption(option: any) {
  emit('viewOption', option)
}

function handleViewGroup(group: InquiryGroup) {
  emit('viewGroup', group)
}

function handleComment(inquiryId: number, comment: any) {
  emit('comment', inquiryId, comment)
}

function handleSupport(inquiryId: number, value: any) {
  emit('support', inquiryId, value)
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
/* ARCHITECTURE GRID                                            */
/* ============================================================ */
.architecture-grid {
  display: grid;
  gap: 20px;
  min-height: 400px;

  &.layout-grid {
    grid-template-columns: repeat(2, 1fr);
    
    &.cols-1 { grid-template-columns: 1fr; }
    &.cols-2 { grid-template-columns: repeat(2, 1fr); }
    &.cols-3 { grid-template-columns: repeat(3, 1fr); }
    &.cols-4 { grid-template-columns: repeat(4, 1fr); }
  }

  &.layout-flex {
    display: flex;
    flex-wrap: wrap;
    
    .architecture-zone {
      flex: 1;
      min-width: 300px;
    }
  }

  &.layout-sidebar {
    grid-template-columns: 280px 1fr;
  }

  &.layout-split {
    grid-template-columns: 1fr 1fr;
  }

  .architecture-zone {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 200px;

    .zone-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--color-background-dark);
      border-bottom: 1px solid var(--color-border);

      .zone-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .zone-count {
        font-size: 12px;
        font-weight: 500;
        background: var(--color-background-darker);
        padding: 2px 10px;
        border-radius: 12px;
        color: var(--color-text-lighter);
      }
    }

    .zone-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
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
/* RESPONSIVE                                                   */
/* ============================================================ */
@media (max-width: 1024px) {
  .architecture-grid {
    &.layout-sidebar {
      grid-template-columns: 1fr;
    }
    
    &.layout-split {
      grid-template-columns: 1fr;
    }
    
    &.layout-grid {
      &.cols-3 { grid-template-columns: repeat(2, 1fr); }
      &.cols-4 { grid-template-columns: repeat(2, 1fr); }
    }
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
    &.layout-grid {
      grid-template-columns: 1fr !important;
    }
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
