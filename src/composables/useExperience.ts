/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

// Import types from the single source of truth
import {
  EXPERIENCE_VALUES,
  CONTENT_VALUES,
  SOURCE_VALUES,
  DISPLAY_TYPE_VALUES,
  INQUIRY_TOOLS,
  OPTION_TOOLS,
  MARKETPLACE_TOOLS,
  ALL_TOOLS,
  type DisplayType,
  type ToolKey,
  type ExperienceKey,
} from '../Types/experience.types'

// Re‑export types for convenience
export type { DisplayType, ToolKey, ExperienceKey }

// ============================================================
// EXPERIENCE DEFINITIONS - Single source of truth
// ============================================================

export const EXPERIENCE_DEFINITIONS = {
  // ============================================================
  // DASHBOARD - Overview with statistics and activity
  // ============================================================
  dashboard: {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'Home',
    description: 'Understand and see what is happening',
    verb: 'Understand',
    question: 'What is happening here and where can I go?',
    defaultTools: ['quorum', 'analytics'] as ToolKey[],
    defaultDisplay: 'cards' as DisplayType,
    allowedDisplays: ['cards', 'list', 'feed'] as DisplayType[],
    allowedTools: ['quorum', 'analytics', 'resources'] as ToolKey[],
    layout: 'grid',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['project', 'consultation', 'decision', 'initiative_group', 'assembly']
  },

  // ============================================================
  // SOCIAL - Feed-based social interaction
  // ============================================================
  social: {
    key: 'social',
    label: 'Social',
    icon: 'Users',
    description: 'Follow and participate',
    verb: 'Follow',
    question: 'What are others thinking?',
    defaultTools: ['support', 'debate', 'vote'] as ToolKey[],
    defaultDisplay: 'feed' as DisplayType,
    allowedDisplays: ['feed', 'cards', 'list'] as DisplayType[],
    allowedTools: ['support', 'debate', 'vote'] as ToolKey[],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['consultation', 'debate', 'social', 'poll_group']
  },

  // ============================================================
  // MARKETPLACE - Browse and discover like Airbnb
  // ============================================================
  marketplace: {
    key: 'marketplace',
    label: 'Marketplace',
    icon: 'Storefront',
    description: 'Browse and discover',
    verb: 'Discover',
    question: 'What is available?',
    defaultTools: ['search', 'filter', 'compare'] as ToolKey[],
    defaultDisplay: 'cards' as DisplayType,
    allowedDisplays: ['cards', 'list'] as DisplayType[],
    allowedTools: ['search', 'filter', 'compare', 'resources'] as ToolKey[],
    layout: 'grid',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['project', 'consultation', 'marketplace', 'initiative_group', 'offer']
  },

  // ============================================================
  // KANBAN - Board view for inquiries
  // ============================================================
  kanban: {
    key: 'kanban',
    label: 'Kanban',
    icon: 'Board',
    description: 'Build and track',
    verb: 'Build',
    question: 'Where is the process?',
    defaultTools: ['kanban', 'support'] as ToolKey[],
    defaultDisplay: 'tool' as DisplayType,
    defaultTool: 'kanban' as ToolKey,
    allowedDisplays: ['tool', 'list', 'cards'] as DisplayType[],
    allowedTools: ['kanban', 'support', 'timeline', 'resources'] as ToolKey[],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['project', 'decision', 'workflow', 'maintenance_board', 'working_group']
  },

  // ============================================================
  // TIMELINE - Chronological history
  // ============================================================
  timeline: {
    key: 'timeline',
    label: 'Timeline',
    icon: 'Clock',
    description: 'Understand the evolution',
    verb: 'Understand',
    question: 'How has this evolved?',
    defaultTools: ['timeline', 'wiki'] as ToolKey[],
    defaultDisplay: 'tool' as DisplayType,
    defaultTool: 'timeline' as ToolKey,
    allowedDisplays: ['tool', 'list'] as DisplayType[],  // removed 'full'
    allowedTools: ['timeline', 'wiki', 'analytics', 'resources'] as ToolKey[],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['project', 'decision', 'consultation', 'investigation_case']
  },

  // ============================================================
  // WIKI - Document-style reading with structure
  // ============================================================
  wiki: {
    key: 'wiki',
    label: 'Wiki',
    icon: 'Book',
    description: 'Understand the content',
    verb: 'Understand',
    question: 'What does this information mean / contain?',
    defaultTools: ['wiki', 'structure'] as ToolKey[],
    defaultDisplay: 'book' as DisplayType,
    allowedDisplays: ['book', 'list'] as DisplayType[],  // removed 'full'
    allowedTools: ['wiki', 'structure', 'resources'] as ToolKey[],
    layout: 'sidebar',
    showHeader: true,
    showBreadcrumb: true,
    showStats: false,
    supportedGroupTypes: ['wiki', 'structure', 'documentation', 'municipal_reports', 'chapter']
  },

  // ============================================================
  // DECISION_ROOM - Full decision-making interface
  // ============================================================
  decision_room: {
    key: 'decision_room',
    label: 'Decision Room',
    icon: 'Scale',
    description: 'Decide',
    verb: 'Decide',
    question: 'How do we decide?',
    defaultTools: ['debate', 'vote', 'consensus'] as ToolKey[],
    defaultDisplay: 'book' as DisplayType,  // was 'full'
    allowedDisplays: ['book', 'list'] as DisplayType[],  // was ['full', 'split', 'grid'] – now using display types
    allowedTools: ['debate', 'vote', 'consensus', 'resources'] as ToolKey[],
    layout: 'split',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['decision', 'consultation', 'debate', 'citizen_jury', 'commission', 'chapter', 'ethics_review', 'investigation_case']
  }
} as const

// ============================================================
// TYPES (re‑exported from experience.types)
// ============================================================

export type ExperienceKey = keyof typeof EXPERIENCE_DEFINITIONS

// DisplayMode is now an alias for DisplayType
export type DisplayMode = DisplayType

// Display mode with variants (for internal use)
export type DisplayModeWithVariant = DisplayMode | 'compact' | 'summary' | 'horizontal'

// ToolKey is imported

export interface ExperienceConfig {
  experience: ExperienceKey
  displayMode: DisplayMode
  tools: ToolKey[]
  layout: 'sidebar' | 'full' | 'split' | 'grid'
  showHeader: boolean
  showBreadcrumb: boolean
  showStats: boolean
  showResources: boolean
  showComments: boolean
}

// Extended definition with tool support
export interface ExperienceDefinition {
  key: ExperienceKey
  label: string
  icon: string
  description: string
  verb: string
  question: string
  defaultTools: ToolKey[]
  defaultDisplay: DisplayMode
  defaultTool?: ToolKey  // Required when defaultDisplay === 'tool'
  allowedDisplays: DisplayMode[]
  allowedTools: ToolKey[]
  layout: 'sidebar' | 'full' | 'split' | 'grid'
  showHeader: boolean
  showBreadcrumb: boolean
  showStats: boolean
  supportedGroupTypes: string[]
}

// ============================================================
// COMPOSABLE
// ============================================================

export function useExperience(initialExperience?: ExperienceKey) {
  const route = useRoute()
  const router = useRouter()
  const inquiryGroupsStore = useInquiryGroupsStore()

  // Get experience from URL or initial or default
  const experience = ref<ExperienceKey>(
    (route.query.experience as ExperienceKey) || 
    initialExperience || 
    'dashboard'
  )

  // Get current group from route
  const currentGroup = computed(() => {
    const slug = route.params.slug as string
    if (slug && slug !== 'none' && slug !== 'undefined') {
      return inquiryGroupsStore.bySlug(slug)
    }
    return null
  })

  // Get experience definition
  const definition = computed(() => 
    EXPERIENCE_DEFINITIONS[experience.value] || EXPERIENCE_DEFINITIONS.dashboard
  )

  // Display mode from URL or default
  const displayMode = ref<DisplayMode>(
    (route.query.display as DisplayMode) || definition.value.defaultDisplay
  )

  // Active tools
  const tools = ref<ToolKey[]>([...definition.value.defaultTools])

  // Show/hide toggles
  const showResources = ref(true)
  const showComments = ref(true)

  // Computed config
  const config = computed<ExperienceConfig>(() => {
    const def = definition.value
    return {
      experience: experience.value,
      displayMode: displayMode.value,
      tools: tools.value,
      layout: def.layout as 'sidebar' | 'full' | 'split' | 'grid',
      showHeader: def.showHeader,
      showBreadcrumb: def.showBreadcrumb,
      showStats: def.showStats,
      showResources: showResources.value,
      showComments: showComments.value
    }
  })

  // Get available experiences for current group
  function getAvailableExperiences(): ExperienceKey[] {
    const targetGroup = currentGroup.value
    const allKeys = Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
    
    if (!targetGroup) return allKeys
    
    return allKeys.filter(key => {
      const def = EXPERIENCE_DEFINITIONS[key]
      if (!def.supportedGroupTypes) return true
      return def.supportedGroupTypes.includes(targetGroup.type)
    })
  }

  // Get available display modes
  function getAvailableDisplays(): DisplayMode[] {
    return definition.value.allowedDisplays
  }

  // Get available tools
  function getAvailableTools(): ToolKey[] {
    return definition.value.allowedTools
  }

  // Check if tool can be used
  function canUseTool(tool: ToolKey): boolean {
    return definition.value.allowedTools.includes(tool)
  }

  // Check if display mode is a tool
  function isToolDisplay(mode: DisplayMode): boolean {
    return mode === 'tool'
  }

  // Get default tool for display mode
  function getDefaultTool(): ToolKey | undefined {
    return definition.value.defaultTool
  }

  // Switch experience
  function switchExperience(key: ExperienceKey) {
    if (!EXPERIENCE_DEFINITIONS[key]) return
    
    experience.value = key
    const def = EXPERIENCE_DEFINITIONS[key]
    displayMode.value = def.defaultDisplay as DisplayMode
    tools.value = [...def.defaultTools]
    
    // Update URL
    const query: Record<string, string> = { ...route.query, experience: key, display: def.defaultDisplay }
    if (def.defaultTool) {
      query.tool = def.defaultTool
    }
    router.push({ query })
  }

  // Switch display mode
  function switchDisplay(mode: DisplayMode) {
    if (!definition.value.allowedDisplays.includes(mode)) return
    
    displayMode.value = mode
    const query = { ...route.query, display: mode }
    router.push({ query })
  }

  // Toggle tool
  function toggleTool(tool: ToolKey) {
    const index = tools.value.indexOf(tool)
    if (index > -1) {
      tools.value.splice(index, 1)
    } else {
      tools.value.push(tool)
    }
  }

  // Toggle resources
  function toggleResources() {
    showResources.value = !showResources.value
  }

  // Toggle comments
  function toggleComments() {
    showComments.value = !showComments.value
  }

  // Watch route changes
  watch(
    () => route.query.experience,
    (newExp) => {
      if (newExp && typeof newExp === 'string' && EXPERIENCE_DEFINITIONS[newExp as ExperienceKey]) {
        experience.value = newExp as ExperienceKey
        const def = EXPERIENCE_DEFINITIONS[newExp as ExperienceKey]
        displayMode.value = def.defaultDisplay as DisplayMode
        tools.value = [...def.defaultTools]
      }
    }
  )

  watch(
    () => route.query.display,
    (newDisplay) => {
      if (newDisplay && typeof newDisplay === 'string') {
        displayMode.value = newDisplay as DisplayMode
      }
    }
  )

  return {
    // State
    experience,
    displayMode,
    tools,
    config,
    definition,
    showResources,
    showComments,
    
    // Getters
    currentGroup,
    getAvailableExperiences,
    getAvailableDisplays,
    getAvailableTools,
    canUseTool,
    isToolDisplay,
    getDefaultTool,
    
    // Actions
    switchExperience,
    switchDisplay,
    toggleTool,
    toggleResources,
    toggleComments
  }
}
