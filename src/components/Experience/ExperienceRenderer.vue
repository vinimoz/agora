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
          `display-${zone.display?.type || 'cards'}`,
          { 'is-empty': !hasZoneData(zone) || !isZoneRenderable(zone) },
        ]"
        :style="getZoneStyle(zone)"
      >
        <!-- Zone header -->
        <div class="zone-header">
          <component :is="getContentIcon(zone.content)" :size="16" />
          <span class="zone-title">{{ getZoneLabel(zone , String(zoneKey)) }}</span>
          <span v-if="hasZoneData(zone) && isZoneRenderable(zone)" class="zone-count">
            {{ getZoneCount(zone) }}
          </span>
        </div>

        <!-- Zone body -->
        <div class="zone-content">
          <!-- Render component when data exists AND zone is renderable -->
          <template v-if="hasZoneData(zone) && isZoneRenderable(zone)">
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

          <!-- Structured empty state -->
          <div v-else class="zone-empty-state">
            <component :is="getEmptyIcon(zone)" :size="40" class="empty-icon" />
            <p class="empty-title">{{ getEmptyTitle(zone) }}</p>
            <p class="empty-hint">{{ getEmptyHint(zone) }}</p>
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
            <div
              v-if="displayedInquiries && displayedInquiries.length > 0"
              class="inquiries-grid"
              :class="displayModeClass"
            >
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
            <SideBarTabComments
              v-if="selectedInquiry || (inquiries && inquiries[0])"
              :inquiry="selectedInquiry || (inquiries && inquiries[0])"
            />
          </div>
        </div>

        <!-- Resources -->
        <div v-if="showResources" class="layout-resources">
          <div>
            <SideBarTabResources
              v-if="selectedInquiry || (inquiries && inquiries[0])"
              :inquiry="selectedInquiry || (inquiries && inquiries[0])"
            />
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
import type { DisplayZone, GridPosition, InteractionAction, InteractionTarget } from '../Types/experience.types'
import { useSessionStore } from '../../stores/session'
import { useCommentsStore } from '../../stores/comments'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups'
import { getExperienceArchitecture } from '../../composables/experienceArchitecture'
import { EXPERIENCE_DEFINITIONS, type ExperienceKey, type DisplayMode } from '../../composables/useExperience'
import { processZoneData } from '../../helpers/modules/filterHelpers'
import SearchBar from './Landing/SearchBar.vue'
import WelcomeHero from './Landing/WelcomeHero.vue'
import CurrentMomentWidget from './Landing/CurrentMomentWidget.vue'
import MySpacesWidget from './Landing/MySpacesWidget.vue'
import ExploreWidget from './Landing/ExploreWidget.vue'
import NewsWidget from './Landing/NewsWidget.vue'
import ServicesWidget from './Landing/ServicesWidget.vue'
import UpcomingWidget from './Landing/UpcomingWidget.vue'
import PromoCard from './Landing/PromoCard.vue'



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

import { useHomeConfig } from '../../composables/useHomeConfig'
import { useRelevance } from '../../composables/useRelevance'


import type { Inquiry, Option, Item } from '../../Types/index.ts'
import { toItems } from '../../helpers/modules/itemHelpers'
import { useUserContext } from '../../composables/useUserContext'

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
  selectedGroup?: InquiryGroup | null
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
  selectInquiry: [inquiry: Inquiry]
  selectGroup: [group: InquiryGroup]
  comment: [inquiryId: number, comment: any]
  support: [inquiryId: number, value: any]
  retry: []
  createInquiry: []
  sidebarNavigate: [target: string]
  experienceChange: [experience: ExperienceKey]
  displayChange: [mode: DisplayMode]
  openPanel: [payload: { inquiry: Inquiry; zone: string; target: string }]
  navigateTo: [target: any]
}>()

// ============================================================
// STATE - Two-click interaction
// ============================================================
const selectedInquiryId = ref<number | null>(null)
const selectedGroupId = ref<number | null>(null)
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

const { context } = useUserContext()
const { config: homeConfig } = useHomeConfig()
const { rank } = useRelevance()
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
  const def = EXPERIENCE_DEFINITIONS[experience.value as ExperienceKey]
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

// ============================================================
// EFFECTIVE ARCHITECTURE (camelCase)
// ============================================================
const effectiveArchitecture = computed(() => {
  let arch: Record<string, any> = {}
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
// HELPER
// ============================================================
const heroStats = computed(() => {
  const uid = context.value.userId
  const list = props.inquiries || []
  if (!uid) {
    return { shared: 0, participated: 0, owned: 0, groupInquiries: 0 }
  }
  const spaceIds = new Set(context.value.spaces.map(s => s.id))

  const owned = list.filter(i => i.owner?.id === uid).length
  const participated = list.filter(i =>
    (i as any).currentUserStatus?.isInvolved ||
    (i as any).currentUserStatus?.hasSupported,
  ).length
  const groupInquiries = list.filter(i =>
    i.inquiryGroups?.some(gid => spaceIds.has(gid)),
  ).length
  const shared = list.filter(i =>
    (i.configuration as any)?.visibility === 'private' &&
    i.owner?.id !== uid &&
    ((i as any).sharedWith?.includes(uid) || false),
  ).length

  return { shared, participated, owned, groupInquiries }
})

function resolveIcon(icon: any): any {
  if (!icon || typeof icon !== 'string') return icon
  return (Icons as any)[icon] || Icons.CheckCircle
}

function resolveHeroActions(actions: any[]) {
  return (actions || []).map(a => ({ ...a, icon: resolveIcon(a.icon) }))
}
function resolveServices(services: any[]) {
  return (services || []).map(s => ({ ...s, icon: resolveIcon(s.icon) }))
}

function getNestedValue(obj: any, path: string): any {
  if (!obj) return undefined
  return path.split('.').reduce((a, k) => (a == null ? undefined : a[k]), obj)
}

function matchesFilter(item: any, filter: any): boolean {
  if (!filter || typeof filter !== 'object') return true
  for (const [key, value] of Object.entries(filter)) {
    if (key === 'selection') continue
    if (key === 'date') {
      const t = getNestedValue(item, 'created') ?? getNestedValue(item, 'status.created')
      const from = (value as any)?.from
      if (typeof from === 'number' && typeof t === 'number') {
        const absFrom = from < 0 ? Date.now() + from : from
        if (t * 1000 < absFrom) return false
      }
      continue
    }
    const itemValue = getNestedValue(item, key)
    if (Array.isArray(value)) { if (!value.includes(itemValue)) return false }
    else if (value && typeof value === 'object') continue
    else if (itemValue !== value) return false
  }
  return true
}

function applyScope(data: any[], scope: any): any[] {
  if (!scope || !Array.isArray(data)) return data
  let r = [...data]
  if (scope.filter) r = r.filter(i => matchesFilter(i, scope.filter))
  if (scope.sort?.field) {
    const { field, direction } = scope.sort
    const dir = direction === 'desc' ? -1 : 1
    r.sort((a, b) => {
      const av = getNestedValue(a, field), bv = getNestedValue(b, field)
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0
    })
  }
  if (scope.pagination) {
    const { limit = r.length, offset = 0 } = scope.pagination
    r = r.slice(offset, offset + limit)
  }
  return r
}

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
function getZoneData(zone: any): any[] {
  if (!zone) return []
  const content = zone.content || 'inquiries'
  const scope   = zone.scope  || { source: 'all' }
  const source  = scope.source || 'all'
  const raw     = fetchRawData(content, source, scope)

  // 'trending' pseudo-sort → use relevance ranking
  if (scope.sort?.field === 'trending') {
    const ranked = rank(raw).map((r: any) => r.inquiry)
    const limit  = scope.pagination?.limit  ?? ranked.length
    const offset = scope.pagination?.offset ?? 0
    return ranked.slice(offset, offset + limit)
  }
  return applyScope(raw, scope)
}

//// FETCH RAW DATA

function fetchRawData(content: string, source: string, scope: any = {}) {
  switch (content) {
case 'inquiry_groups': {
  const store = useInquiryGroupsStore()
  let groups: InquiryGroup[] = []

  if (source === 'children' && props.group) {
    groups = store.byParentId(props.group.id) || []
  } else if (source === 'selected_group' || source === 'selected') {
    const g = getSelectedGroup(); groups = g ? [g] : []
  } else if (source === 'parent_group' && props.group?.parentId) {
    groups = store.inquiryGroups.filter(g => g.id === props.group!.parentId)
  } else {
    // 'all' — at home, only root groups
    groups = (store.inquiryGroupsSorted || store.inquiryGroups || [])
      .filter(g => g.parentId === null || g.parentId === undefined || g.parentId === 0)
  }
  }

    case 'inquiries': {
      let list: Inquiry[] = []
      if (source === 'selected_inquiry') {
        const s = getSelectedInquiry(); list = s ? [s] : []
      } else if (source === 'featured') {
        list = (props.inquiries || []).filter(i => (i.status as any)?.isFeatured || (i.status as any)?.featured)
      } else {
        list = props.inquiries || []
      }
      if (scope.family || scope.families) {
        const fams = scope.families || [scope.family]
        list = list.filter(i => fams.includes(i.type))
      }
      return list
    }

    case 'inquiry': {
      const s = getSelectedInquiry(); return s ? [s] : []
    }
    case 'options': {
      const s = getSelectedInquiry(); if (!s) return []
      let opts = (props.options || []).filter(o => o.inquiryId === s.id)
      if (scope.family) opts = opts.filter(o => o.family === scope.family)
      return opts
    }
    case 'resources':   return getResourcesForInquiry(getSelectedInquiry())
    case 'messages':
    case 'comments':    return getCommentsForInquiry(getSelectedInquiry())
    case 'statistics':  return props.inquiries || []
    case 'activity':    return props.inquiries || []

    // Landing widgets are self-contained: no external data source
    case 'hero':
    case 'search':
    case 'news':
    case 'services':
    case 'events':
    case 'explore':
    case 'promo':
      return []

    default: return []
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

function getSelectedGroup(): InquiryGroup | null {
  if (props.selectedGroup) return props.selectedGroup
  return null
}

// ============================================================
// DATA & RENDERABILITY GUARDS
// ============================================================

/**
 * Whether the zone has data to display.
 */
function hasZoneData(zone: any): boolean {
  if (!zone) return false
  const content = zone.content || 'inquiries'
  if (['hero','search','news','services','events','explore','promo'].includes(content)) {
    return true
  }
  const data = getZoneData(zone)
  switch (content) {
    case 'inquiry_groups':
    case 'inquiries':
    case 'options':
    case 'resources':
    case 'messages':
    case 'comments':
    case 'statistics':
    case 'activity':      return data.length > 0
    case 'inquiry':       return getSelectedInquiry() !== null
    default:              return data.length > 0
  }
}

/**
 * Whether the zone has all required inputs to render its component.
 * Prevents rendering components that require a selected inquiry/group
 * when nothing is selected.
 */
function isZoneRenderable(zone: any): boolean {
  if (!zone) return false
  const content = zone.content || 'inquiries'
  const source = zone.scope?.source

  // Zones that require a selected inquiry
  if (content === 'resources' || content === 'comments' || content === 'options') {
    return getSelectedInquiry() !== null
  }

  // Zones that require a selected inquiry via scope
  if (content === 'inquiry' || content === 'inquiries') {
    if (source === 'selected_inquiry') {
      return getSelectedInquiry() !== null
    }
  }

  // inquiry_groups with selected_group / selected source requires a selection
  if (content === 'inquiry_groups') {
    if (source === 'selected_group' || source === 'selected') {
      return getSelectedGroup() !== null || props.group != null
    }
  }

  return true
}

// ============================================================
// EMPTY STATE HELPERS
// ============================================================
const sectionLabelByZone = computed<Record<string, string>>(() => {
  const arch = getExperienceArchitecture(experience.value as ExperienceKey)
  const map: Record<string, string> = {}
  for (const sec of arch?.sections ?? []) {
    for (const z of sec.zones ?? []) {
      if (sec.label) map[z] = sec.label
    }
  }
  return map
})

function getZoneLabel(zone: any, zoneKey?: string): string {
  const custom = zoneKey ? sectionLabelByZone.value[zoneKey] : undefined
  if (custom) return custom

  const content = zone?.content || 'inquiries'
  const labels: Record<string, string> = {
    inquiry_groups: t('agora', 'Groups'),
    inquiries:      t('agora', 'Inquiries'),
    inquiry:        t('agora', 'Inquiry'),
    options:        t('agora', 'Options'),
    resources:      t('agora', 'Resources'),
    comments:       t('agora', 'Comments'),
    statistics:     t('agora', 'Statistics'),
    activity:       t('agora', 'Activity'),
  }
  return labels[content] || content
}


/**
 * Icon for the zone header, per content type.
 */
function getContentIcon(content: string) {
  const map: Record<string, any> = {
    inquiry_groups: Icons.FolderMultiple,
    inquiries: Icons.ClipboardList,
    inquiry: Icons.ClipboardList,
    options: Icons.Lightbulb,
    resources: Icons.Document,
    comments: Icons.Comment,
    statistics: Icons.BarChart,
    activity: Icons.Activity,
  }
  return map[content] || Icons.FolderMultiple
}

/**
 * Icon shown in the empty state, per content type.
 */
function getEmptyIcon(zone: any) {
  return getContentIcon(zone?.content || 'inquiries')
}

/**
 * Main line of the empty state.
 * Distinguishes "no selection yet" from "selection has no data".
 */
function getEmptyTitle(zone: any): string {
  const content = zone?.content || 'inquiries'
  const source = zone?.scope?.source

  // Case: zone requires a selected inquiry, but none selected yet
  if (
    (content === 'resources' || content === 'comments' || content === 'options') &&
    !getSelectedInquiry()
  ) {
    return t('agora', 'No inquiry selected')
  }

  if (
    (content === 'inquiry' || (content === 'inquiries' && source === 'selected_inquiry')) &&
    !getSelectedInquiry()
  ) {
    return t('agora', 'No inquiry selected')
  }

  if (
    content === 'inquiry_groups' &&
    (source === 'selected_group' || source === 'selected') &&
    !getSelectedGroup()
  ) {
    return t('agora', 'No group selected')
  }

  // Generic per-content empties
  const titles: Record<string, string> = {
    inquiry_groups: t('agora', 'No groups'),
    inquiries: t('agora', 'No inquiries'),
    inquiry: t('agora', 'No inquiry'),
    options: t('agora', 'No options'),
    resources: t('agora', 'No resources'),
    comments: t('agora', 'No comments'),
    statistics: t('agora', 'No statistics'),
    activity: t('agora', 'No activity'),
  }
  return titles[content] || t('agora', 'Nothing to show')
}

/**
 * Secondary line — tells the user what to do, or why it's empty.
 */
function getEmptyHint(zone: any): string {
  const content = zone?.content || 'inquiries'
  const source = zone?.scope?.source

  if (
    (content === 'resources' || content === 'comments' || content === 'options') &&
    !getSelectedInquiry()
  ) {
    return t('agora', 'Select an inquiry to see its {content}.', { content: getZoneLabel(zone).toLowerCase() })
  }

  if (
    (content === 'inquiry' || (content === 'inquiries' && source === 'selected_inquiry')) &&
    !getSelectedInquiry()
  ) {
    return t('agora', 'Select an inquiry from the list to view it here.')
  }

  if (
    content === 'inquiry_groups' &&
    (source === 'selected_group' || source === 'selected') &&
    !getSelectedGroup()
  ) {
    return t('agora', 'Select a group from the list to view it here.')
  }

  const hints: Record<string, string> = {
    inquiry_groups: t('agora', 'This group has no subgroups yet.'),
    inquiries: t('agora', 'This group has no inquiries yet.'),
    options: t('agora', 'This inquiry has no options yet.'),
    resources: t('agora', 'This inquiry has no resources yet.'),
    comments: t('agora', 'No comments yet.'),
    statistics: t('agora', 'No statistics available yet.'),
    activity: t('agora', 'No activity yet.'),
  }
  return hints[content] || ''
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
  const componentMap: Record<string, Record<string, any>> = {
  	hero:     { banner: WelcomeHero },
  	search:   { search_bar: SearchBar },
  	news:     { news_list: NewsWidget, list: NewsWidget },
  	services: { quick_actions: ServicesWidget, list: ServicesWidget },
  	events:   { calendar: UpcomingWidget, list: UpcomingWidget },
  	explore:  { category_grid: ExploreWidget },
  	promo:    { promo_card: PromoCard },

    // ---- Inquiry Groups ----
    inquiry_groups: {
      'list': InquiryGroupCatalog,
      'cards': InquiryGroupCatalog,
      'tree': InquiryGroupTree,
       'my_spaces': MySpacesWidget,
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
      'current_moment': CurrentMomentWidget,
      'navigation': InquiryListNavigation,
      'tool': getToolComponent(tool, content),
    },

    // ---- Options ----
    options: {
      'tool': getToolComponent(tool, content),
    },

    // ---- Messages ----
    messages: {
  	'feed': SideBarTabComments,
  	'list': SideBarTabComments,
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
  if (!contentComponents) {
    // Unknown content type - do not fall through to InquiryCard
    console.warn(`[ExperienceRenderer] Unknown content type: ${content}`)
    return null
  }

  const component = contentComponents[type]
  if (!component) {
    // Content-specific fallback rather than a global InquiryCard fallback
    const fallbacks: Record<string, any> = {
      inquiry_groups: InquiryGroupCatalog,
      inquiries: InquiryCard,
      options: OptionToolDisplay,
      resources: SideBarTabResources,
      comments: SideBarTabComments,
      statistics: StatisticsWidget,
      activity: ActivityFeed,
    }
    return fallbacks[content] || null
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
      // Groups come from the store; scope decides which subset
      let groupsData: InquiryGroup[] = Array.isArray(data) ? data : []

      if (groupsData.length === 0) {
        const groupsStore = useInquiryGroupsStore()
        if (props.group?.id) {
          groupsData = groupsStore.byParentId(props.group.id) || []
        } else {
          groupsData = groupsStore.inquiryGroups || []
        }
      }

      return {
        ...baseProps,
        groups: groupsData,
        families: zone.scope?.families ?? [],
        activeId: props.group?.id ?? null,
        showCreateButton: true,
        mode: type === 'list' ? 'list' : 'cards',
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

    case 'options': {
      const optionsData = Array.isArray(data) ? (data as Option[]) : []
      return {
        ...baseProps,
        items: toItems(optionsData),
        parentId: selectedInquiry?.id ?? 0,
        targetType: 'option' as const,
        optionTypes: sessionStore.appSettings?.inquiryOptionTypeTab || [],
        family: zone.scope?.family ?? null,
        familyKey: zone.scope?.family ?? null,
        tool,
        families: zone.scope?.families ?? [],
        inquiry: selectedInquiry,
        inquiryId: selectedInquiry?.id,
        options: optionsData,
      }
    }

    case 'inquiries': {
      const inquiriesData = data.length > 0 ? data : props.inquiries || []
      const itemList = toItems(inquiriesData as Inquiry[])
      return {
        ...baseProps,
        items: itemList,
        inquiries: inquiriesData,
        parentId: props.group?.id ?? 0,
        targetType: 'inquiry' as const,
        optionTypes: sessionStore.appSettings?.inquiryOptionTypeTab || [],
        family: zone.scope?.family ?? null,
        familyKey: zone.scope?.family ?? null,
        tool,
        families: zone.scope?.families ?? [],
        group: props.group,
        columns: display.options?.cardsPerRow || display.cardsPerRow || 3,
        selectedInquiry,
        inquiry: inquiriesData.length === 1 ? inquiriesData[0] : null,
        initialInquiry: inquiriesData[0] ?? null,
      }
    }

    case 'resources':
      return {
        ...baseProps,
        inquiry: selectedInquiry,
        inquiryId: selectedInquiry?.id,
        showResources: true,
      }

    case 'messages':
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

    case 'hero':
      return {
        title:    homeConfig.value.hero.title,
        subtitle: homeConfig.value.hero.subtitle,
        actions:  resolveHeroActions(homeConfig.value.hero.actions),
      }

    case 'search':
      return {}

    case 'news':
      return { items: [] }

    case 'services':
      return { services: resolveServices(homeConfig.value.services) }

    case 'events':
      return { events: [] }

    case 'explore':
      return { inquiries: props.inquiries || [] }

    case 'promo':
      return {}

    default:
      return {
        ...baseProps,
        data,
        content,
        group: props.group,
      }
  }
}

// ============================================================
// ZONE HELPERS
// ============================================================
function getZoneCount(zone: any): number | null {
  if (!zone) return null
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
    pagination: scope.pagination,
  })
}

function getZoneStyle(zone: any) {
  if (!zone) return {}
  const styles: Record<string, string> = {}

  // Only assign grid coordinates when we ARE a grid layout
  if (layoutConfig.value.type === 'grid') {
    const pos = getZoneGridPosition(zone)
    if (pos) {
      styles.gridRow    = `${pos.row} / span ${pos.rowSpan || 1}`
      styles.gridColumn = `${pos.column} / span ${pos.columnSpan || 1}`
    }
  }

  // zone.style (not zone.display)
  const s = zone.style || {}
  if (s.width)      styles.width = s.width
  if (s.height)     styles.height = s.height
  if (s.background) styles.background = s.background
  if (s.padding)    styles.padding = s.padding
  return styles
}

// ============================================================
// TWO-CLICK INTERACTION HANDLERS
// ============================================================

/**
 * Inquiry click - phase 1 selects & emits selectInquiry (refresh dependents),
 * phase 2 executes the zone's configured interaction.
 */
function handleInquiryClick(inquiry: Inquiry, zoneKey: string) {
  if (!inquiry) return

  const zone = filteredArchitecture.value[zoneKey]
  const interaction = zone?.interaction as
    | { action?: InteractionAction; target?: InteractionTarget }
    | undefined

  // ---- PHASE 1: not yet selected -> select & emit ----
  if (selectedInquiryId.value !== inquiry.id) {
    selectedInquiryId.value = inquiry.id
    selectedGroupId.value = null
    selectedOptionId.value = null
    emit('selectInquiry', inquiry) // refresh selected_* zones
    return
  }

  // ---- PHASE 2: already selected -> execute action ----
  executeInquiryAction(inquiry, interaction)
}

function executeInquiryAction(
  inquiry: Inquiry,
  interaction?: { action?: InteractionAction; target?: InteractionTarget },
) {
  const action = interaction?.action ?? 'open'
  const target = interaction?.target ?? 'page'

  switch (action) {
    case 'open':
      if (target === 'same_view') {
	return
      }
      emit('viewInquiry', inquiry)
      return

    case 'navigate':
      emit('navigateTo', inquiry)
      return

    case 'select':
      // Explicit select action - confirm selection, refresh dependents
      emit('selectInquiry', inquiry)
      return

    default:
      emit('viewInquiry', inquiry)
  }
}

/**
 * Group click - phase 1 selects & emits selectGroup (refresh dependents),
 * phase 2 executes the zone's configured interaction.
 */
function handleViewGroup(group: InquiryGroup) {
  if (!group) {
    console.warn('Attempted to view null/undefined group')
    return
  }

  const zoneKey = findZoneForGroup(group)
  const zone = zoneKey ? filteredArchitecture.value[zoneKey] : null
  const interaction = zone?.interaction as
    | { action?: InteractionAction; target?: InteractionTarget }
    | undefined

  // ---- PHASE 1: not yet selected -> select & emit ----
  if (selectedGroupId.value !== group.id) {
    selectedGroupId.value = group.id
    selectedInquiryId.value = null
    selectedOptionId.value = null
    emit('selectGroup', group) // refresh selected_group zones
    return
  }

  // ---- PHASE 2: already selected -> execute action ----
  const action = interaction?.action ?? 'navigate'

  switch (action) {
    case 'navigate':
    case 'open':
      emit('viewGroup', group)
      return
    case 'select':
      emit('selectGroup', group)
      return
    default:
      emit('viewGroup', group)
  }
}

/**
 * Option click - phase 1 selects locally, phase 2 executes the interaction.
 */
function handleOptionClick(option: any, zoneKey: string) {
  if (!option) return

  const zone = filteredArchitecture.value[zoneKey]
  const interaction = zone?.interaction as
    | { action?: InteractionAction; target?: InteractionTarget }
    | undefined

  if (selectedOptionId.value !== option.id) {
    selectedOptionId.value = option.id
    selectedInquiryId.value = null
    selectedGroupId.value = null
    return
  }

  const action = interaction?.action ?? 'open'
  switch (action) {
    case 'open':
      emit('viewOption', option)
      return
    case 'select':
      return
    default:
      emit('viewOption', option)
  }
}

// ============================================================
// LEGACY EVENT HANDLERS
// ============================================================
function handleZoneEvent(eventName: string, payload: any, zoneKey: string) {
  const zone = filteredArchitecture.value[zoneKey]
  if (!zone) return
  const content = zone.content || 'inquiries'

  switch (content) {
    case 'inquiry_groups':
      if (['click','select','view','viewGroup'].includes(eventName)) handleViewGroup(payload)
      return
    case 'inquiries':
    case 'inquiry':
      if (['click','view','viewInquiry'].includes(eventName)) handleInquiryClick(payload, zoneKey)
      return
    case 'options':
      if (['click','view','viewOption'].includes(eventName)) handleOptionClick(payload, zoneKey)
      return

    case 'hero':
      if (eventName === 'action') emit('navigateTo', { type: 'hero-action', key: payload })
      return
    case 'search':
      if (eventName === 'search') emit('navigateTo', { type: 'search', query: payload })
      return
    case 'news':
      if (eventName === 'click')       emit('navigateTo', { type: 'news', item: payload })
      else if (eventName === 'viewAll') emit('navigateTo', { type: 'news-all' })
      return
    case 'services':
      if (eventName === 'service') emit('navigateTo', { type: 'service', key: payload })
      else if (eventName === 'all')  emit('navigateTo', { type: 'services-all' })
      return
    case 'events':
      if (eventName === 'click')        emit('navigateTo', { type: 'event', item: payload })
      else if (eventName === 'viewAll') emit('navigateTo', { type: 'events-all' })
      return
    case 'explore':
      if (eventName === 'category')        emit('navigateTo', { type: 'category', key: payload })
      else if (eventName === 'create')     emit('createInquiry')
      else if (eventName === 'viewAll')    emit('navigateTo', { type: 'explore-all' })
      return
    case 'promo':
      if (eventName === 'action') emit('navigateTo', { type: 'promo-action' })
      return
  }
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

function findZoneForGroup(group: InquiryGroup): string | null {
  for (const [key, zone] of Object.entries(filteredArchitecture.value)) {
    if (zone.content === 'inquiry_groups') {
      const data = getZoneData(zone)
      if (data.some((item: any) => item.id === group.id)) {
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
    const nextId = newVal?.id ?? null
    if (nextId !== selectedInquiryId.value) {
      selectedInquiryId.value = nextId
    }
  },
)

watch(
  () => props.selectedGroup,
  (newVal) => {
    const nextId = newVal?.id ?? null
    if (nextId !== selectedGroupId.value) {
      selectedGroupId.value = nextId
    }
  },
)

watch(
  () => props.inquiries,
  (list) => {
    if (
      selectedInquiryId.value != null &&
      !list?.some(i => i.id === selectedInquiryId.value)
    ) {
      selectedInquiryId.value = null
    }
  },
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
  &.architecture-layout-full,
  &.architecture-layout-flex {
    display: flex;
    flex-direction: column;
  }

  &.architecture-layout-sidebar {
    display: grid;
    grid-template-columns: minmax(240px, 300px) 1fr;
    gap: 24px;
    align-items: start;
  }

  &.architecture-layout-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
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
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-background-dark);
      color: var(--color-text-lighter);
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      .zone-title {
        flex: 1;
      }

      .zone-count {
        background: var(--color-background-hover);
        padding: 1px 8px;
        border-radius: 10px;
        font-size: 11px;
      }
    }

    .zone-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      min-height: 100px;
    }

    .zone-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 32px 20px;
      min-height: 140px;
      color: var(--color-text-lighter);

      .empty-icon {
        opacity: 0.25;
        margin-bottom: 12px;
      }

      .empty-title {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .empty-hint {
        margin: 0;
        font-size: 13px;
        color: var(--color-text-lighter);
        max-width: 260px;
      }
    }

    &.is-empty {
      background: var(--color-background-dark);
      border-style: dashed;
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
  to {
    transform: rotate(360deg);
  }
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

@media (max-width: 1400px) {
  .architecture-grid.architecture-layout-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 1024px) {
  .architecture-grid.architecture-layout-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .architecture-grid.architecture-layout-grid {
    grid-template-columns: 1fr !important;
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
