<!--
	SPDX-FileCopyrightText: 2026 Nextcloud contributors
	SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="experience-renderer" :class="`experience-${experience}`">
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
          { 'is-empty': !hasZoneData(zone, String(zoneKey)) || !isZoneRenderable(zone) },
        ]"
        :style="getZoneStyle(zone)"
      >
        <!-- Zone header -->
        <div v-if="showZoneHeader(zone)" class="zone-header">
          <component :is="getZoneHeaderIcon(zone, String(zoneKey))" :size="16" />
          <span class="zone-title">{{ getZoneLabel(zone, String(zoneKey)) }}</span>
          <span
            v-if="hasZoneData(zone, String(zoneKey)) && isZoneRenderable(zone)"
            class="zone-count"
          >
            {{ getZoneCount(zone) }}
          </span>
        </div>

        <!-- Zone body -->
        <div class="zone-content">
          <!-- Render component when data exists AND zone is renderable -->
          <template v-if="hasZoneData(zone, String(zoneKey)) && isZoneRenderable(zone)">
            <component
              :is="getZoneComponent(zone)"
              v-bind="getZoneProps(zone, String(zoneKey))"
              :columns="getColumns(zone)"
              @view-inquiry="(p) => handleZoneEvent('viewInquiry', p, String(zoneKey))"
              @view-option="(p) => handleZoneEvent('viewOption', p, String(zoneKey))"
              @view-group="(p) => handleZoneEvent('viewGroup', p, String(zoneKey))"
              @click="(p) => handleZoneEvent('click', p, String(zoneKey))"
              @select="(p) => handleZoneEvent('select', p, String(zoneKey))"
              @view="(p) => handleZoneEvent('view', p, String(zoneKey))"
              @comments="(p) => handleZoneEvent('comments', p, String(zoneKey))"
              @action="(p) => handleZoneEvent('action', p, String(zoneKey))"
              @search="(p) => handleZoneEvent('search', p, String(zoneKey))"
              @service="(p) => handleZoneEvent('service', p, String(zoneKey))"
              @all="(p) => handleZoneEvent('all', p, String(zoneKey))"
              @view-all="(p) => handleZoneEvent('viewAll', p, String(zoneKey))"
              @category="(p) => handleZoneEvent('category', p, String(zoneKey))"
              @create="(p) => handleZoneEvent('create', p, String(zoneKey))"
              @select-family="(p) => handleZoneEvent('selectFamily', p, String(zoneKey))"
            />
          </template>

          <!-- Structured empty state -->
          <div v-else class="zone-empty-state">
            <component :is="getEmptyIcon(zone)" :size="40" class="empty-icon" />
            <p class="empty-title">
              {{ getEmptyTitle(zone) }}
            </p>
            <p class="empty-hint">
              {{ getEmptyHint(zone) }}
            </p>
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
        <div v-if="shouldShowHeader" class="layout-header">
          <h1 class="layout-title">
            {{ groupTitle }}
          </h1>
          <p v-if="groupDescription" class="layout-description">
            {{ groupDescription }}
          </p>

          <div v-if="shouldShowStats" class="layout-stats">
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
                  :is="getDisplayComponent(displayMode)"
                  v-if="inquiry"
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
        <div v-if="shouldShowComments" class="layout-comments">
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
        <div v-if="shouldShowResources" class="layout-resources">
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
import { useRoute, useRouter } from 'vue-router'

// Experience Components
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
import FamilyLayoutPaired from '../FamilyLayouts/FamilyLayoutPaired.vue'
import FamilyLayoutTree from '../FamilyLayouts/FamilyLayoutTree.vue'
import FamilyLayoutConsensusFlow from '../FamilyLayouts/FamilyLayoutConsensusFlow.vue'
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
import type { InquiryGroup, InquiryGroupUIConfig } from '../../Types/inquiryGroups.types'
import type {
  GridPosition,
  InteractionAction,
  InteractionTarget,
} from '../../Types/experience.types'
import { useSessionStore } from '../../stores/session'
import { useCommentsStore } from '../../stores/comments'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups'
import { getExperienceArchitecture } from '../../composables/experienceArchitecture'
import {
  EXPERIENCE_DEFINITIONS,
  type ExperienceKey,
  type DisplayMode,
} from '../../composables/useExperience'
import { processZoneData } from '../../helpers/modules/filterHelpers'
import SearchBar from './Landing/SearchBar.vue'
import WelcomeHero from './Landing/WelcomeHero.vue'
import CurrentMomentWidget from './Landing/CurrentMomentWidget.vue'
import MySpacesWidget from './Landing/MySpacesWidget.vue'
import ExploreWidget from './Landing/ExploreWidget.vue'
import NewsWidget from './Landing/NewsWidget.vue'
import UpcomingWidget from './Landing/UpcomingWidget.vue'
import PromoCard from './Landing/PromoCard.vue'
import FamilyGroupTypesWidget from './Landing/FamilyGroupTypesWidget.vue'

// ============================================================
// IMPORT VOCABULARY
// ============================================================
import { useHomeConfig } from '../../composables/useHomeConfig'
import { useRelevance } from '../../composables/useRelevance'
import {
  getOptionTypesForFamily,
  getLayoutForFamily,
  getForceLayouts,
} from '../../helpers/modules/InquiryOptionHelper'

import type { Inquiry, Option  } from '../../Types/index.ts'
import { toItems } from '../../helpers/modules/itemHelpers'
import { useUserContext } from '../../composables/useUserContext'

// ============================================================
// PROPS
// ============================================================
const props = defineProps<{
  group?: InquiryGroup | null
  inquiries?: Inquiry[]
  options?: Option[]
  experience?: string
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
  openPanel: [payload: { inquiry: Inquiry; zone: string; target: string }]
}>()

const route = useRoute()
const router = useRouter()
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

const layoutConfig = computed(() => {
  const archLayout = getExperienceArchitecture(
    (props.experience || 'dashboard') as ExperienceKey
  )?.layout

  const fromProps = props.layoutConfig
  const type = fromProps?.type ?? archLayout?.type ?? 'grid'

  // Only substitute when the caller didn't supply a value.
  // (The primary fix belongs in useGroupExperience; this is belt-and-braces.)
  const columns = fromProps?.columns ?? archLayout?.columns ?? 3
  const rows = fromProps?.rows ?? archLayout?.rows ?? 2

  return {
    type,
    columns,
    rows,
    responsive: fromProps?.responsive ?? archLayout?.responsive ?? true,
  }
})

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
    '--grid-cols': String(cols),
    '--grid-rows': String(rows),
    gap: '20px',
  } as Record<string, string>
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
  return commentsStore.comments.filter((c) => c.inquiryId === targetId).length
})

const canCreateInquiry = computed(
  () => sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor
)

const isReadonly = computed(() => route.name === 'publicInquiry')

// Same source of truth OptionEditView uses today (it hardcodes `true`;
// this is the closest real equivalent available in this component).
const canManageVote = computed(
  () =>
    !isReadonly.value &&
    (sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor)
)

// ============================================================
// Filter out null/undefined inquiries
// ============================================================
const displayedInquiries = computed(() => {
  if (!props.inquiries) return []
  return props.inquiries.filter((item) => item != null)
})

// ============================================================
// COMPUTED - Show-* flags, prop-first with experience-definition fallback
// ============================================================
const activeDefinition = computed(
  () =>
    EXPERIENCE_DEFINITIONS[experience.value as ExperienceKey] ?? EXPERIENCE_DEFINITIONS.dashboard
)

const shouldShowHeader = computed(() => props.showHeader ?? activeDefinition.value.showHeader)
const shouldShowStats = computed(() => props.showStats ?? activeDefinition.value.showStats)
const shouldShowResources = computed(() => props.showResources ?? internalShowResources.value)
const shouldShowComments = computed(() => props.showComments ?? internalShowComments.value)

const displayModeClass = computed(
  () => `display-${props.uiConfig?.defaultDisplay ?? activeDefinition.value.defaultDisplay}`
)

function handleSidebarNavigate(target: string) {
  emit('sidebarNavigate', target)
}

// ============================================================
// COMPUTED - Filtered Architecture - Show all zones
// ============================================================
// const filteredArchitecture = computed(() => {
//  return effectiveArchitecture.value
// })
// ===========================================================
// For most experiences this is a pass-through of `effectiveArchitecture`.
// ============================================================
const filteredArchitecture = computed(() => {
  const arch = effectiveArchitecture.value

  // Only `home` supports section-level ordering / visibility.
  if (experience.value !== 'home') return arch

  // If the group authored its own home architecture, render it verbatim.
  // Section filtering is a global-home concern — the group's zones are
  // the group's concern.
  const groupUi = props.uiConfig
  const isCustomHome =
    props.experience === groupUi?.defaultExperience &&
    !!props.displayArchitecture &&
    Object.keys(props.displayArchitecture).length > 0
  if (isCustomHome) return arch

  const sectionKeys = homeConfig.value.sections ?? []
  if (sectionKeys.length === 0) return arch

  const archSections = getExperienceArchitecture('home').sections ?? []
  const sectionById = new Map(archSections.map((s) => [s.key, s]))

  const ordered: Record<string, (typeof arch)[string]> = {}
  for (const sectionKey of sectionKeys) {
    const section = sectionById.get(sectionKey)
    if (!section) continue
    for (const zoneKey of section.zones ?? []) {
      const zone = arch[zoneKey]
      if (zone) ordered[zoneKey] = zone
    }
  }

  // If section filtering removed everything (misconfigured tenant config),
  // fall back to the full architecture rather than a blank page.
  return Object.keys(ordered).length > 0 ? ordered : arch
})

// ============================================================
// COMPUTED - Zone Data Cache (to avoid recomputation)
// ============================================================
// const zoneDataCache = computed(() => {
//   const arch = filteredArchitecture.value
//   const cache: Record<string, any[]> = {}
//   for (const key in arch) {
//     cache[key] = getZoneData(arch[key])
//   }
//  return cache
// })

const zoneDataCache = computed(() => {
  const arch = filteredArchitecture.value
  const cache: Record<string, any[]> = {}
  for (const key in arch) {
    cache[key] = computeZoneData(arch[key])
  }
  return cache
})

// ============================================================
// EFFECTIVE ARCHITECTURE (camelCase)
// ============================================================
/*const effectiveArchitecture = computed(() => {
  let arch: Record<string, any> = {}
  try {
    const exp = props.experience || 'dashboard'
    const groupDefault = props.uiConfig?.defaultExperience || 'dashboard'

    const hasCustomArch =
      props.displayArchitecture && Object.keys(props.displayArchitecture).length > 0

    // Group customization only applies when we're on the group's configured
    // default experience. Switching to any other experience (via escape
    // hatch) always uses the global architecture for that experience.
    if (exp === groupDefault && hasCustomArch) {
      arch = props.displayArchitecture
    } else {
      arch = getExperienceArchitecture(exp as ExperienceKey)?.displayArchitecture || {}
    }
  } catch (e) {
    console.warn('[ExperienceRenderer] Error computing architecture:', e)
    arch = {}
  }
  return Object.fromEntries(Object.entries(arch).filter(([_, v]) => v != null))
})*/

const effectiveArchitecture = computed(() => {
  let arch: Record<string, any> = {}
  try {
    const exp = props.experience || 'dashboard'
    const groupDefault = props.uiConfig?.defaultExperience || 'dashboard'
    const hasCustomArch =
      props.displayArchitecture && Object.keys(props.displayArchitecture).length > 0

    if (exp === groupDefault && hasCustomArch) {
      arch = props.displayArchitecture
    } else {
      arch = getExperienceArchitecture(exp as ExperienceKey)?.displayArchitecture || {}
    }
  } catch (e) {
    console.warn('[ExperienceRenderer] Error computing architecture:', e)
    arch = {}
  }
  return Object.fromEntries(Object.entries(arch).filter(([_, v]) => v != null))
})

// ============================================================
// HELPER
// ============================================================
const heroStats = computed(() => {
  const uid = context.value.userId
  const list = props.inquiries || []
  if (!uid) {
    return { shared: 0, withParticipants: 0, owned: 0, groupInquiries: 0 }
  }

  // Only count inquiries the user can actually see and that aren't archived
  const visible = list.filter((i) => !i.status?.isArchived && i.permissions?.view)

  const owned = visible.filter((i) => i.currentUserStatus?.isOwner).length

  const withParticipants = visible.filter((i) => (i.status?.countParticipants ?? 0) > 0).length

  const groupInquiries = visible.filter((i) => i.configuration?.visibility === 'groups').length

  const shared = visible.filter((i) => i.currentUserStatus?.isShared).length

  return { shared, withParticipants, owned, groupInquiries }
})

function resolveHeroImage(src: string | number | undefined | null): string {
  if (!src) return ''
  const s = String(src)
  if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s
  if (/^\d+$/.test(s)) {
    return `${window.location.origin}/index.php/core/preview?fileId=${s}&x=1920&y=1080&a=1`
  }
  return s
}

function resolveIcon(icon: any): any {
  if (!icon || typeof icon !== 'string') return icon
  return (Icons as any)[icon] || Icons.CheckCircle
}

function resolveHeroActions(actions: any[]) {
  return (actions || []).map((a) => ({ ...a, icon: resolveIcon(a.icon) }))
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
/* function getZoneData(zone: any): any[] {
  if (!zone) return []
  const content = zone.content || 'inquiries'
  const scope = zone.scope || { source: 'all' }
  const source = scope.source || 'all'
  const raw = fetchRawData(content, source, scope)

  // 'trending' pseudo-sort → use relevance ranking
  if (scope.sort?.field === 'trending') {
    const ranked = rank(raw).map((r: any) => r.inquiry)
    const limit = scope.pagination?.limit ?? ranked.length
    const offset = scope.pagination?.offset ?? 0
    return ranked.slice(offset, offset + limit)
  }

  // Options have an extra union rule the generic pipeline can't express.
  if (content === 'options') return processOptionZoneData(raw, zone)

  // Everything else: shared filter / sort / pagination.
  // zone.filter + zone.scope.sort + zone.scope.pagination.
  return processZoneData(raw, zone)
} */

function getZoneData(zone: any, zoneKey?: string): any[] {
  if (!zone) return []
  if (zoneKey) {
    const cached = zoneDataCache.value[zoneKey]
    if (cached) return cached
  }
  return computeZoneData(zone)
}

function computeZoneData(zone: any): any[] {
  if (!zone) return []
  const content = zone.content || 'inquiries'
  const scope = zone.scope || { source: 'all' }
  const source = scope.source || 'all'
  const raw = fetchRawData(content, source, scope)

  if (scope.sort?.field === 'trending') {
    /* … */
  }
  if (content === 'options') return processOptionZoneData(raw, zone)
  return processZoneData(raw, zone)
}

/**
 * Options zone resolver.
 *
 * An option belongs to the zone if EITHER:
 *   1. its own `family` matches `zone.scope.optionFamily`, OR
 *   2. its `miscFields.force_layouts` contains the layout the current tool
 *      renders with (debate → 'paired', structure → 'tree',
 *      workflow → 'kanban', process → 'timeline', …).
 *
 * Remaining `zone.filter` keys (status, …) are handed to the shared
 * filter engine, and sort/pagination come from `zone.scope` as usual.
 *
 * `zone.scope.optionFamily` is populated by the normalizer, which
 * migrates legacy `filter.family` into it. Downstream code should never
 * read `filter.family` directly.
 */
function processOptionZoneData(options: Option[], zone: any): Option[] {
  const filterIn = { ...(zone.filter ?? {}) }
  const family = zone.scope?.optionFamily as string | undefined
  const tool = zone?.display?.tool as string | undefined
  const layout = tool ? getLayoutForFamily(family ?? '') : null

  const kept = options.filter((opt) => {
    const familyMatch = !family || opt.family === family
    const forcedIntoLayout = !!layout && getForceLayouts(opt).includes(layout)
    return familyMatch || forcedIntoLayout
  })

  // `family` is applied above; strip any residual filter-family so the
  // shared engine doesn't try to re-interpret it as a status/type key.
  // (Normalizer should have removed it already; belt and braces.)
  delete filterIn.family

  const restZone = {
    scope: zone.scope ?? {},
    filter: Object.keys(filterIn).length ? filterIn : undefined,
  }

  return processZoneData(kept, restZone)
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
        const g = getSelectedGroup()
        groups = g ? [g] : []
      } else if (source === 'parent_group' && props.group?.parentId) {
        groups = store.inquiryGroups.filter((g) => g.id === props.group!.parentId)
      } else {
        // 'all' — at home, only root groups
        groups = (store.inquiryGroupsSorted || store.inquiryGroups || []).filter(
          (g) => g.parentId === null || g.parentId === undefined || g.parentId === 0
        )
      }
      return groups
    }

    case 'inquiries': {
      let list: Inquiry[] = []
      if (source === 'selected_inquiry') {
        const s = getSelectedInquiry()
        list = s ? [s] : []
      } else if (source === 'featured') {
        list = (props.inquiries || []).filter(
          (i) => (i.status as any)?.isFeatured || (i.status as any)?.featured
        )
      } else {
        list = props.inquiries || []
      }
      const fams = scope.inquiryFamilies ?? (scope.inquiryFamily ? [scope.inquiryFamily] : null)
      if (fams && fams.length > 0) {
        list = list.filter((i) => fams.includes(i.type))
      }
      return list
    }

    case 'inquiry': {
      const s = getSelectedInquiry()
      return s ? [s] : []
    }
    case 'options': {
      const s = getSelectedInquiry()
      if (!s) return []
      return (props.options || []).filter((o) => o.inquiryId === s.id)
    }
    case 'resources':
      return getResourcesForInquiry(getSelectedInquiry())
    case 'messages':
    case 'comments':
      return getCommentsForInquiry(getSelectedInquiry())
    case 'statistics':
      return props.inquiries || []
    case 'activity':
      return props.inquiries || []

    // Landing widgets are self-contained: no external data source
    case 'hero':
    case 'search':
    case 'news':
    case 'group_types':
    case 'events':
    case 'explore':
    case 'promo':
      return []

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
  return commentsStore.comments.filter((c) => c.inquiryId === inquiry.id)
}

/**
 * Selected inquiry resolver.
 *
 * The internal `selectedInquiryId` (set on phase-1 click) is the source of
 * truth for dependent zones (options / resources / comments / selected_*).
 * Falls back to the prop and then to the first available inquiry so that
 * experiences without an explicit selection still render something.
 */
function getSelectedInquiry(): Inquiry | null {
  // 1. Internal selection wins when it's been set
  if (selectedInquiryId.value != null) {
    if (props.selectedInquiry?.id === selectedInquiryId.value) {
      return props.selectedInquiry
    }
    const fromList = props.inquiries?.find((i) => i.id === selectedInquiryId.value)
    if (fromList) return fromList
  }
  // 2. Explicit parent-driven selection
  if (props.selectedInquiry) return props.selectedInquiry
  // 3. Last resort: first inquiry in the list
  if (props.inquiries && props.inquiries.length > 0) {
    return props.inquiries[0]
  }
  return null
}

/**
 * Selected group resolver.
 *
 * Mirrors getSelectedInquiry: internal selection wins, then the prop,
 * then — when we're inside a group page — the current group itself.
 * The last fallback lets `scope.source: 'selected_group'` zones render
 * as soon as a slug is present in the URL, without requiring a click
 * on a child group first.
 */
function getSelectedGroup(): InquiryGroup | null {
  if (selectedGroupId.value != null) {
    if (props.selectedGroup?.id === selectedGroupId.value) {
      return props.selectedGroup
    }
    const groupsStore = useInquiryGroupsStore()
    const fromStore = groupsStore.inquiryGroups.find((g) => g.id === selectedGroupId.value)
    if (fromStore) return fromStore
  }
  if (props.selectedGroup) return props.selectedGroup
  return props.group ?? null
}

// ============================================================
// DATA & RENDERABILITY GUARDS
// ============================================================

/**
 * Whether the zone has data to display.
 */
function hasZoneData(zone: any, zoneKey?: string): boolean {
  if (!zone) return false
  const content = zone.content || 'inquiries'
  if (['hero', 'search', 'news', 'events', 'group_types', 'explore', 'promo'].includes(content)) {
    return true
  }
  const data = getZoneData(zone, zoneKey)
  switch (content) {
    case 'inquiry_groups':
    case 'inquiries':
    case 'options':
    case 'resources':
    case 'messages':
    case 'comments':
    case 'statistics':
    case 'activity':
      return data.length > 0
    case 'inquiry':
      return getSelectedInquiry() !== null
    default:
      return data.length > 0
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
  const overrides = homeConfig.value.sectionLabels ?? {}
  const map: Record<string, string> = {}

  for (const sec of arch?.sections ?? []) {
    // HomeConfig.sectionLabels keys by section key, not zone key.
    const custom = overrides[sec.key]
    const label = custom ?? sec.label
    if (!label) continue
    for (const z of sec.zones ?? []) {
      map[z] = label
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
    inquiries: t('agora', 'Inquiries'),
    inquiry: t('agora', 'Inquiry'),
    options: t('agora', 'Options'),
    resources: t('agora', 'Resources'),
    comments: t('agora', 'Comments'),
    statistics: t('agora', 'Statistics'),
    activity: t('agora', 'Activity'),
  }
  return labels[content] || content
}

/**
 * Icon for the zone header, per content type.
 */
function getContentIcon(content: string) {
  const map: Record<string, any> = {
    // core data zones
    inquiry_groups: Icons.FolderMultiple,
    inquiries: Icons.ClipboardList,
    inquiry: Icons.ClipboardList,
    options: Icons.Lightbulb,
    resources: Icons.Document,
    comments: Icons.Comment,
    messages: Icons.Comment,
    statistics: Icons.BarChart,
    activity: Icons.Activity,

    // landing zones
    search: Icons.Magnify,
    hero: Icons.Home,
    news: Icons.Megaphone,
    services: Icons.Apps,
    events: Icons.Calendar,
    explore: Icons.Compass,
    promo: Icons.Lightbulb,
  }
  return map[content] || Icons.DotsHorizontal
}

/**
 * Better icon for a zone header: prefer the section key (which is what
 * homeDefaults sections actually mean) over the generic content type.
 */
function getZoneHeaderIcon(zone: any, zoneKey: string) {
  const bySection: Record<string, any> = {
    search: Icons.Magnify,
    hero: Icons.Home,
    news: Icons.Megaphone,
    current_moment: Icons.Flash,
    spaces: Icons.Users,
    services: Icons.Apps,
    explore: Icons.Compass,
    agenda: Icons.Calendar,
    promo: Icons.Lightbulb,
  }
  return bySection[zoneKey] || getContentIcon(zone?.content || 'inquiries')
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
    return t('agora', 'Select an inquiry to see its {content}.', {
      content: getZoneLabel(zone).toLowerCase(),
    })
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

  // Resolve the tool component lazily — only the `tool` display type
  // actually consumes it. Resolving it for every zone (as the map used
  // to) fired spurious "No component for tool=undefined" warnings for
  // any non-tool zone.
  if (type === 'tool') {
    const toolComp = getToolComponent(tool, content)
    if (toolComp) return toolComp
  }


  // COMPONENT MAP - using only valid DisplayType values
  const componentMap: Record<string, Record<string, any>> = {
    hero: { banner: WelcomeHero },
    search: { search_bar: SearchBar },
    news: { news_list: NewsWidget, list: NewsWidget },
    events: { calendar: UpcomingWidget, list: UpcomingWidget },
    explore: { category_grid: ExploreWidget },
    promo: { promo_card: PromoCard },

    // ---- Inquiry Groups ----
    inquiry_groups: {
      list: InquiryGroupCatalog,
      cards: InquiryGroupCatalog,
      tree: InquiryGroupTree,
      navigation: InquiryGroupNavigation,
    },

    group_types: {
      tiles: FamilyGroupTypesWidget,
      grid: FamilyGroupTypesWidget,
      list: FamilyGroupTypesWidget,
      my_spaces: MySpacesWidget,
    },

    // ---- Inquiries (plural) ----
    inquiries: {
      list: InquiryGrid,
      cards: InquiryGrid,
      feed: InquiryFeed,
      tree: InquiryTree,
      timeline: InquiryTimeline,
      kanban: InquiryKanban,
      book: BookDisplay,
      current_moment: CurrentMomentWidget,
      navigation: InquiryListNavigation,
    },

    // ---- Options ----
    options: {
    },

    // ---- Messages ----
    messages: {
      feed: SideBarTabComments,
      list: SideBarTabComments,
    },

    // ---- Resources ----
    resources: {
      list: SideBarTabResources,
      full: SideBarTabResources,
    },

    // ---- Comments ----
    comments: {
      feed: SideBarTabComments,
      list: SideBarTabComments,
    },

    // ---- Statistics ----
    statistics: {
      widget: StatisticsWidget,
      list: StatisticsWidget,
      cards: StatisticsWidget,
    },

    // ---- Activity ----
    activity: {
      feed: ActivityFeed,
      list: ActivityFeed,
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
    vote: FamilyLayoutVote,
    timeline: FamilyLayoutTimeline,
    kanban: FamilyLayoutKanban,
    consensus: FamilyLayoutConsensusFlow,
    debate: FamilyLayoutPaired,
    structure: FamilyLayoutTree,
  }

  const comp = toolMap[tool]
  if (comp) return comp

  if (content === 'options') return OptionToolDisplay

  if (import.meta.env.DEV) {
    console.warn(
      `[ExperienceRenderer] No component for tool="${tool}" on content="${content}". ` +
        `Zone will fall back to InquiryCard. Check displayArchitecture — this is ` +
        `almost certainly a misconfiguration.`
    )
  }
  return InquiryCard
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
function getZoneProps(zone: any, zoneKey?: string) {
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
    showDescription:
      displayOptions.showDescription !== undefined ? displayOptions.showDescription : true,
    showExpiry: displayOptions.showExpiry !== undefined ? displayOptions.showExpiry : true,
    showType: displayOptions.showType !== undefined ? displayOptions.showType : true,
    showStatus: displayOptions.showStatus !== undefined ? displayOptions.showStatus : true,
    showSupport: displayOptions.showSupport !== undefined ? displayOptions.showSupport : true,
    showParticipants:
      displayOptions.showParticipants !== undefined ? displayOptions.showParticipants : true,
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
      const groupsData: InquiryGroup[] = Array.isArray(data) ? data : []

      // ---- Default: catalog / tree / navigation ----
      let resolvedGroups = groupsData
      if (resolvedGroups.length === 0) {
        const groupsStore = useInquiryGroupsStore()
        if (props.group?.id) {
          resolvedGroups = groupsStore.byParentId(props.group.id) || []
        } else {
          // No-slug case: only root groups
          resolvedGroups = (
            groupsStore.inquiryGroupsSorted ||
            groupsStore.inquiryGroups ||
            []
          ).filter((g) => g.parentId === null || g.parentId === undefined || g.parentId === 0)
        }
      }

      return {
        ...baseProps,
        groups: resolvedGroups,
        families: zone.scope?.groupFamilies ?? [],
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
      const inquiry = selectedInquiry
      const familyKey = zone.scope?.optionFamily ?? null
      const allOptionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []

      return {
        ...baseProps,
        items: toItems(optionsData),
        parentId: inquiry?.id ?? 0,
        targetType: 'option' as const,
        optionTypes: allOptionTypes,
        family: familyKey,
        familyKey,
        tool,
        families: zone.scope?.optionFamilies ?? [],
        inquiry,
        inquiryId: inquiry?.id,
        options: optionsData,

        // required by FamilyLayoutVote
        canManageVote: canManageVote.value,
        isReadonly: isReadonly.value,

        // consumed by FamilyLayoutKanban / FamilyLayoutTimeline
        appSettings: sessionStore.appSettings,
        familyOptionTypes: familyKey ? getOptionTypesForFamily(familyKey, allOptionTypes) : [],
      }
    }

    case 'group_types': {
      const opts = displayOptions as Record<string, unknown>
      const isMySpaces = type === 'my_spaces'

      if (isMySpaces) {
        return {
          variant: (opts.variant as 'stacked' | 'compact' | 'chips') ?? 'stacked',
          families: (opts.families as string[]) ?? [],
          limitPerFamily: (opts.limit as number) ?? 0,
          showCtaPerFamily: opts.showCtaPerFamily === true,
          minColumnWidth: (opts.minColumnWidth as number) ?? 320,
          showDescription: opts.showDescription !== false,
          showStats: opts.showStats !== false,
        }
      }

      // single-family widget
      const family = (zone.scope?.groupFamily ?? opts.family) as string | undefined
      if (!family) {
        console.warn('[ExperienceRenderer] group_types zone missing scope.groupFamily')
        return {}
      }
      return {
        family,
        layout: 'card',
        limit: (opts.limit as number) ?? 0,
        showHeader: opts.showHeader !== false,
        showCta: opts.showCta !== false,
        title: opts.title as string | undefined,
        subtitle: opts.subtitle as string | undefined,
        ctaLabel: opts.ctaLabel as string | undefined,
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
	title: zoneKey ? sectionLabelByZone.value[zoneKey] : undefined,
        subtitle: undefined, 
        optionTypes: sessionStore.appSettings?.inquiryOptionTypeTab || [],
        family: zone.scope?.inquiryFamily ?? null,
        familyKey: zone.scope?.inquiryFamily ?? null,
        tool,
        families: zone.scope?.inquiryFamilies ?? [],
        group: props.group,
        columns: display.options?.cardsPerRow || display.cardsPerRow || 3,
        selectedInquiry,
        inquiry: inquiriesData.length === 1 ? inquiriesData[0] : undefined,
        initialInquiry: inquiriesData[0] ?? null,
        // Timeline / compact-display hints — ignored by other consumers
        compact: displayOptions.compact || false,
        hideControls: displayOptions.hideControls || false,
        limit: displayOptions.limit || 0,
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
        title: homeConfig.value.hero?.title,
        subtitle: homeConfig.value.hero?.subtitle,
        tagline: homeConfig.value.hero?.tagline,
        cityName: homeConfig.value.hero?.cityName,
        backgroundUrl: resolveHeroImage(homeConfig.value.hero?.backgroundUrl),
        weather: homeConfig.value.hero?.showWeather ? homeConfig.value.hero?.weather : null,
        actions: resolveHeroActions(homeConfig.value.hero?.actions || []),
        stats: heroStats.value,
      }

    case 'promo':
      return {
        title: homeConfig.value.promo?.title ?? t('agora', "Together, let's build tomorrow"),
        text:
          homeConfig.value.promo?.text ?? t('agora', 'Participate in the life of your community!'),
        cta: homeConfig.value.promo?.cta ?? t('agora', 'Discover'),
        imageUrl: resolveHeroImage(homeConfig.value.promo?.imageUrl),
      }

    case 'search':
      return {}

    case 'news':
      return { items: [], title: sectionLabelByZone.value[zoneKey] }

    case 'events':
      return { events: [] }

    case 'explore':
      return { inquiries: props.inquiries || [], title: sectionLabelByZone.value[zoneKey] }

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
function getZoneCount(zone: any, zoneKey?: string): number | null {
  if (!zone) return null
  return getZoneData(zone, zoneKey).length
}

function handleHeroAction(key: string) {
  const configured = homeConfig.value.hero?.actions?.find((a) => a.key === key)
  if (configured?.route) {
    const { name, params, query } = configured.route
    return router.push({ name, params, query })
  }
  return legacyHeroAction(key)
}

function legacyHeroAction(key: string) {
  switch (key) {
    case 'participate':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { filter: 'for_you' },
      })
    case 'decide':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { filter: 'to_vote' },
      })
    case 'debate':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { filter: 'debates' },
      })
    case 'propose':
      return router.push({
        name: 'home',
        params: { type: 'proposal' },
        query: { viewMode: 'create' },
      })
    default:
      return router.push({ name: 'explore', params: { type: 'relevant' } })
  }
}

// ---------- Vocabulary: TOOL ----------
function showZoneHeader(zone: any): boolean {
  if (!zone) return false
  const explicit = zone.display?.options?.showHeader
  if (explicit === false) return false
  if (explicit === true) return true

  if (
    [
      'search',
      'inquiries',
      'events',
      'group_types',
      'explore',
      'news',
      'hero',
      'events',
      'promo',
    ].includes(zone.content)
  )
    return false

  return true
}

function getZoneStyle(zone: any) {
  if (!zone) return {}
  const styles: Record<string, string> = {}

  if (layoutConfig.value.type === 'grid') {
    const pos = getZoneGridPosition(zone)
    if (pos) {
      // Custom properties so media queries can neutralise them.
      styles['--zone-row'] = `${pos.row} / span ${pos.rowSpan || 1}`
      styles['--zone-col'] = `${pos.column} / span ${pos.columnSpan || 1}`
    }
  }

  const s = zone.style || {}
  if (s.width) styles.width = s.width
  if (s.height) styles.height = s.height
  if (s.background) styles.background = s.background
  if (s.padding) styles.padding = s.padding
  return styles
}

// ROUTING
function onNavigate(target: any) {
  if (!target) return

  switch (target.type) {
    case 'group-type':
      return router.push({
        name: 'group-list',
        params: { slug: '' },
        query: { family: target.family, group_type: target.key, viewMode: 'group' },
      })

    case 'family':
      return router.push({
        name: 'group-list',
        params: { slug: '' },
        query: { family: target.family, viewMode: 'group' },
      })

    case 'group-types-all':
      return router.push({ name: 'explore-spaces' })

    case 'services-all':
      return router.push({
        name: 'group-list',
        params: { slug: '' },
        query: { family: 'service', viewMode: 'group' },
      })

    case 'explore-all':
      return router.push({ name: 'explore-spaces' })

    case 'create':
      return router.push({
        name: 'home',
        params: { slug: '' },
        query: {
          viewMode: 'create',
          ...(target.inquiryType ? { inquiryType: target.inquiryType } : {}),
          ...(target.family ? { family: target.family } : {}),
        },
      })

    case 'promo-action':
      return router.push({
        name: 'home',
        query: {
          ...route.query,
          viewMode: 'create',
          ...(target.inquiryType ? { inquiryType: target.inquiryType } : {}),
          ...(target.family ? { family: target.family } : {}),
        },
      })

    // ── EVERYTHING ELSE STAYS EXACTLY AS YOU WROTE IT ────────
    case 'inquiry':
      return router.push({ name: 'inquiry', params: { id: String(target.inquiry?.id) } })

    case 'group':
      return target.group?.slug
        ? router.push({ name: 'group-list', params: { slug: target.group.slug } })
        : router.push({ name: 'group', params: { id: String(target.group?.id) } })

    case 'hero-action':
      return handleHeroAction(target.key)
    case 'search':
      return router.push({ name: 'explore', query: { q: target.query } })
    case 'news-all':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { family: 'collective', display: 'feed' },
      })
    case 'service':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { family: 'service', group_type: target.key },
      })
    case 'news':
    case 'event':
      return handleInquiryClick(target.item, '')
    case 'events-all':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { display: 'timeline' },
      })
    case 'category':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { types: target.key },
      })
    case 'inquiries-all':
      if (target.zone === 'agenda') {
        return router.push({
          name: 'explore',
          params: { type: 'relevant' },
          query: { display: 'timeline' },
        })
      }
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { sort: 'lastInteraction' },
      })
    case 'groups-all':
      return router.push({ name: 'explore-spaces' })

    default:
      return router.push({ name: 'home' })
  }
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
    { action?: InteractionAction; target?: InteractionTarget } | undefined

  // ---- PHASE 1: not yet selected -> select & emit ----
  if (selectedInquiryId.value !== inquiry.id) {
    selectedInquiryId.value = inquiry.id
    selectedGroupId.value = null
    selectedOptionId.value = null
    emit('selectInquiry', inquiry) // refresh selected_* zones
    return
  }

  // ---- PHASE 2: already selected -> execute action ----
  executeInquiryAction(inquiry, interaction, zoneKey)
}

function executeInquiryAction(
  inquiry: Inquiry,
  interaction?: { action?: InteractionAction; target?: InteractionTarget },
  zoneKey?: string
) {
  const action = interaction?.action ?? 'open'
  const target = interaction?.target ?? 'page'

  switch (action) {
    case 'open': {
      switch (target) {
        case 'same_view':
          // Phase 1 already refreshed the view; nothing left to do.
          return
        case 'panel':
        case 'dialog':
        case 'modal':
          emit('openPanel', {
            inquiry,
            zone: zoneKey ?? '',
            target,
          })
          return
        case 'page':
        default:
          emit('viewInquiry', inquiry)
          return router.push({ name: 'inquiry', params: { id: String(inquiry.id) } })
      }
    }

    case 'navigate':
      onNavigate({ type: 'inquiry', inquiry })
      return

    case 'select':
      emit('selectInquiry', inquiry)
      return

    default:
      emit('viewInquiry', inquiry)
  }
}

/**
 * InquiryGroup click handler.
 *
 * Per spec: a single click on a group navigates directly to that group.
 * The only exception is a zone whose scope targets `selected_group` /
 * `selected` — those zones feed other dependent zones, so we keep a
 * two-phase pattern (select → refresh dependents → navigate on 2nd click).
 */
function handleViewGroup(group: InquiryGroup, zoneKey: string) {
  if (!group) {
    console.warn('[ExperienceRenderer] viewGroup called with null/undefined')
    return
  }

  const zone = filteredArchitecture.value[zoneKey]
  const source = zone?.scope?.source
  const interaction = zone?.interaction as
    { action?: InteractionAction; target?: InteractionTarget } | undefined

  const needsSelectionRefresh = source === 'selected_group' || source === 'selected'

  if (needsSelectionRefresh && selectedGroupId.value !== group.id) {
    selectedGroupId.value = group.id
    selectedInquiryId.value = null
    selectedOptionId.value = null
    emit('selectGroup', group)
    return
  }

  selectedGroupId.value = group.id
  selectedInquiryId.value = null
  selectedOptionId.value = null
  emit('selectGroup', group)

  const action = interaction?.action ?? 'navigate'
  switch (action) {
    case 'navigate':
    case 'open':
      emit('viewGroup', group)
      return
    case 'select':
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
    { action?: InteractionAction; target?: InteractionTarget } | undefined

  if (selectedOptionId.value !== option.id) {
    selectedOptionId.value = option.id
    selectedInquiryId.value = null
    selectedGroupId.value = null
    return
  }

  const action = interaction?.action ?? 'open'
  switch (action) {
    case 'open':
      // Options have no routed page in this version — panel is the only target.
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
  const interaction = zone.interaction || {}
  const directOpen = interaction.action === 'open'

  switch (content) {
    // ---- Inquiry groups ----
    case 'inquiry_groups': {
      if (['click', 'select', 'view', 'viewGroup'].includes(eventName)) {
        // Pass the zone key so handleViewGroup can read scope.source
        // and pick between single-click nav and two-phase selection.
        handleViewGroup(payload, zoneKey)
      } else if (eventName === 'viewAll') {
        onNavigate({ type: 'groups-all', zone: zoneKey })
      }
      return
    }

    case 'group_types': {
      if (eventName === 'select') {
        onNavigate({
          type: 'group-type',
          family: (payload as any)?.family ?? zone.scope?.groupFamily,
          key: (payload as any)?.key ?? payload,
        })
      } else if (eventName === 'all') {
        onNavigate({
          type: 'group-types-all',
          family: (payload as any)?.family ?? zone.scope?.groupFamily,
        })
      } else if (eventName === 'selectFamily') {
        onNavigate({
          type: 'family',
          family: payload as string, // MySpacesWidget emits the family key directly
        })
      }
      return
    }
    // ---- Inquiries ----
    case 'inquiries':
    case 'inquiry': {
      if (['click', 'view', 'viewInquiry'].includes(eventName)) {
        if (directOpen) {
          onNavigate({ type: 'inquiry', inquiry: payload })
        } else {
          handleInquiryClick(payload, zoneKey)
        }
      } else if (eventName === 'viewAll') {
        onNavigate({ type: 'inquiries-all', zone: zoneKey })
      }
      return
    }

    // ---- Options ----
    case 'options': {
      if (['click', 'view', 'viewOption'].includes(eventName)) {
        handleOptionClick(payload, zoneKey)
      }
      return
    }

    // ---- Landing widgets ----
    case 'hero':
      if (eventName === 'action') onNavigate({ type: 'hero-action', key: payload })
      return

    case 'search':
      if (eventName === 'search') onNavigate({ type: 'search', query: payload })
      return

    case 'news':
      if (eventName === 'click') onNavigate({ type: 'news', item: payload })
      else if (eventName === 'viewAll') onNavigate({ type: 'news-all' })
      return

    case 'events':
      if (eventName === 'click') onNavigate({ type: 'event', item: payload })
      else if (eventName === 'viewAll') onNavigate({ type: 'events-all' })
      return

    case 'explore':
      if (eventName === 'category') {
        onNavigate({ type: 'category', key: payload })
      } else if (eventName === 'create') {
        return onNavigate({
          type: 'create',
          inquiryType: payload?.inquiryType,
          family: payload?.family,
        })
      } else if (eventName === 'viewAll') {
        onNavigate({ type: 'explore-all' })
      }
      return

    case 'promo':
      if (eventName === 'action') onNavigate({ type: 'promo-action' })
      return

    default:
      return
  }
}


function toggleResources() {
  internalShowResources.value = !internalShowResources.value
}

function toggleComments() {
  internalShowComments.value = !internalShowComments.value
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
  }
)

watch(
  () => props.selectedGroup,
  (newVal) => {
    const nextId = newVal?.id ?? null
    if (nextId !== selectedGroupId.value) {
      selectedGroupId.value = nextId
    }
  }
)

watch(
  () => props.inquiries,
  (list) => {
    // Auto-select the first inquiry when the list loads and nothing is selected.
    //   - click on another card → selects it (phase 1)
    if (selectedInquiryId.value == null && list?.length) {
      selectedInquiryId.value = list[0].id
      return
    }
    // If the selected inquiry disappeared from the list, fall back to the first
    if (selectedInquiryId.value != null && !list?.some((i) => i.id === selectedInquiryId.value)) {
      selectedInquiryId.value = list?.[0]?.id ?? null
    }
  },
  { immediate: true }
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
  grid-template-columns: repeat(var(--grid-cols, 3), minmax(0, 1fr));
  grid-template-rows: repeat(var(--grid-rows, 2), auto);
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
    grid-row: var(--zone-row, auto);
    grid-column: var(--zone-col, auto);
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

    &.display-search_bar {
      background: transparent;
      border: none;
      border-radius: 0;
      min-height: 0;

      .zone-content {
        padding: 0;
        overflow: visible;
      }
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    grid-auto-rows: auto;
  }
  .architecture-grid > .architecture-zone {
    grid-row: auto;
    grid-column: auto;
  }
}

@media (max-width: 1024px) {
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
    grid-template-columns: 1fr;
    grid-template-rows: none;
    grid-auto-rows: auto;
  }
  .architecture-grid > .architecture-zone {
    grid-row: auto;
    grid-column: auto;
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
