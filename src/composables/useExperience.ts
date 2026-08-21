/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

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
    defaultTools: ['feed', 'support', 'quorum'],
    defaultDisplay: 'grid',
    allowedDisplays: ['grid', 'cards', 'feed'],
    allowedTools: ['feed', 'support', 'quorum', 'analytics', 'resources'],
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
    defaultTools: ['feed', 'support', 'debate', 'comments'],
    defaultDisplay: 'feed',
    allowedDisplays: ['feed', 'cards', 'list'],
    allowedTools: ['feed', 'support', 'debate', 'vote', 'comments'],
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
    defaultTools: ['search', 'filter', 'compare'],
    defaultDisplay: 'cards',
    allowedDisplays: ['cards', 'grid', 'list', 'map'],
    allowedTools: ['search', 'filter', 'compare', 'support', 'resources'],
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
    defaultTools: ['kanban', 'support'],
    defaultDisplay: 'kanban',
    allowedDisplays: ['kanban', 'list', 'cards'],
    allowedTools: ['kanban', 'support', 'timeline', 'resources'],
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
    defaultTools: ['timeline', 'wiki'],
    defaultDisplay: 'timeline',
    allowedDisplays: ['timeline', 'list', 'full'],
    allowedTools: ['timeline', 'wiki', 'analytics', 'resources'],
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
    defaultTools: ['wiki', 'timeline', 'resources'],
    defaultDisplay: 'wiki',
    allowedDisplays: ['wiki', 'full', 'list'],
    allowedTools: ['wiki', 'timeline', 'debate', 'vote', 'resources', 'comments'],
    layout: 'full',
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
    defaultTools: ['debate', 'vote', 'compare', 'results', 'quorum'],
    defaultDisplay: 'full',
    allowedDisplays: ['full', 'split', 'grid'],
    allowedTools: ['debate', 'vote', 'compare', 'results', 'quorum', 'support', 'comments'],
    layout: 'split',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['decision', 'consultation', 'debate', 'citizen_jury', 'commission', 'chapter', 'ethics_review', 'investigation_case']
  }
} as const

// ============================================================
// TYPES
// ============================================================

export type ExperienceKey = keyof typeof EXPERIENCE_DEFINITIONS
export type DisplayMode = 'cards' | 'list' | 'grid' | 'feed' | 'timeline' | 'kanban' | 'map' | 'wiki' | 'full' | 'compact' | 'summary' | 'horizontal' | 'split'
export type ToolKey = 'debate' | 'vote' | 'kanban' | 'timeline' | 'compare' | 'quorum' | 'results' | 'feed' | 'map' | 'wiki' | 'analytics' | 'decision' | 'resources' | 'comments' | 'consensus' | 'structure' | 'family_tools' | 'search' | 'filter'

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
  const tools = ref<ToolKey[]>(definition.value.defaultTools)

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
      layout: def.layout,
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

  // Switch experience
  function switchExperience(key: ExperienceKey) {
    if (!EXPERIENCE_DEFINITIONS[key]) return
    
    experience.value = key
    const def = EXPERIENCE_DEFINITIONS[key]
    displayMode.value = def.defaultDisplay as DisplayMode
    tools.value = def.defaultTools as ToolKey[]
    
    // Update URL
    const query = { ...route.query, experience: key, display: def.defaultDisplay }
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
        tools.value = def.defaultTools as ToolKey[]
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
    
    // Actions
    switchExperience,
    switchDisplay,
    toggleTool,
    toggleResources,
    toggleComments
  }
}
