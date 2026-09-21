/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

import {
  type DisplayType,
  type ToolKey,
  type ExperienceKey,
  type ExperienceDefinition,
} from '../Types/experience.types'

// Re-export for convenience
export type { DisplayType, ToolKey, ExperienceKey, ExperienceDefinition }

// ============================================================
// LOCAL TYPES
// ============================================================

export type DisplayMode = DisplayType
export type DisplayModeWithVariant =
  | DisplayMode
  | 'compact'
  | 'summary'
  | 'horizontal'

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
// EXPERIENCE DEFINITIONS - Single source of truth
// ============================================================

export const EXPERIENCE_DEFINITIONS: Record<ExperienceKey, ExperienceDefinition> = {
  dashboard: {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'Home',
    description: 'Understand and see what is happening',
    verb: 'Understand',
    question: 'What is happening here and where can I go?',
    defaultTools: ['quorum', 'analytics'],
    defaultDisplay: 'cards',
    allowedDisplays: ['cards', 'list', 'feed'],
    allowedTools: ['quorum', 'analytics', 'resources'],
    layout: 'grid',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: [
      'project', 'consultation', 'decision', 'initiative_group', 'assembly',
    ],
  },

  social: {
    key: 'social',
    label: 'Social',
    icon: 'Users',
    description: 'Follow and participate',
    verb: 'Follow',
    question: 'What are others thinking?',
    defaultTools: ['support', 'debate', 'vote'],
    defaultDisplay: 'feed',
    allowedDisplays: ['feed', 'cards', 'list'],
    allowedTools: ['support', 'debate', 'vote'],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: ['consultation', 'debate', 'social', 'poll_group'],
  },

  marketplace: {
    key: 'marketplace',
    label: 'Marketplace',
    icon: 'Storefront',
    description: 'Browse and discover',
    verb: 'Discover',
    question: 'What is available?',
    defaultTools: ['search', 'filter', 'compare'],
    defaultDisplay: 'cards',
    allowedDisplays: ['cards', 'list'],
    allowedTools: ['search', 'filter', 'compare', 'resources'],
    layout: 'grid',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: [
      'project', 'consultation', 'marketplace', 'initiative_group', 'offer',
    ],
  },

  kanban: {
    key: 'kanban',
    label: 'Kanban',
    icon: 'Board',
    description: 'Build and track',
    verb: 'Build',
    question: 'Where is the process?',
    defaultTools: ['kanban', 'support'],
    defaultDisplay: 'tool',
    defaultTool: 'kanban',
    allowedDisplays: ['tool', 'list', 'cards'],
    allowedTools: ['kanban', 'support', 'timeline', 'resources'],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: [
      'project', 'decision', 'workflow', 'maintenance_board', 'working_group',
    ],
  },

  timeline: {
    key: 'timeline',
    label: 'Timeline',
    icon: 'Clock',
    description: 'Understand the evolution',
    verb: 'Understand',
    question: 'How has this evolved?',
    defaultTools: ['timeline', 'wiki'],
    defaultDisplay: 'tool',
    defaultTool: 'timeline',
    allowedDisplays: ['tool', 'list'],
    allowedTools: ['timeline', 'wiki', 'analytics', 'resources'],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: [
      'project', 'decision', 'consultation', 'investigation_case',
    ],
  },

  wiki: {
    key: 'wiki',
    label: 'Wiki',
    icon: 'Book',
    description: 'Understand the content',
    verb: 'Understand',
    question: 'What does this information mean / contain?',
    defaultTools: ['wiki', 'structure'],
    defaultDisplay: 'book',
    allowedDisplays: ['book', 'list'],
    allowedTools: ['wiki', 'structure', 'resources'],
    layout: 'sidebar',
    showHeader: true,
    showBreadcrumb: true,
    showStats: false,
    supportedGroupTypes: [
      'wiki', 'structure', 'documentation', 'municipal_reports', 'chapter',
    ],
  },

  decision_room: {
    key: 'decision_room',
    label: 'Decision Room',
    icon: 'Scale',
    description: 'Decide',
    verb: 'Decide',
    question: 'How do we decide?',
    defaultTools: ['debate', 'vote', 'consensus'],
    defaultDisplay: 'book',
    allowedDisplays: ['book', 'list'],
    allowedTools: ['debate', 'vote', 'consensus', 'resources'],
    layout: 'split',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: [
      'decision', 'consultation', 'debate', 'citizen_jury', 'commission',
      'chapter', 'ethics_review', 'investigation_case',
    ],
  },

  navigation: {
    key: 'navigation',
    label: 'Navigation',
    icon: 'Menu',
    description: 'Browse structure',
    verb: 'Browse',
    question: 'Where can I go?',
    defaultTools: [],
    defaultDisplay: 'list',
    allowedDisplays: ['list', 'navigation'],
    allowedTools: [],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: false,
    supportedGroupTypes: [],
  },

  classic: {
    key: 'classic',
    label: 'Classic View',
    icon: 'Home',
    description: 'Standard group layout',
    verb: 'View',
    question: 'Default view',
    defaultTools: [],
    defaultDisplay: 'list',
    allowedDisplays: ['list', 'cards'],
    allowedTools: [],
    layout: 'full',
    showHeader: true,
    showBreadcrumb: true,
    showStats: true,
    supportedGroupTypes: [],
  },
}

// ============================================================
// COMPOSABLE
// ============================================================

export function useExperience(initialExperience?: ExperienceKey) {
  const route = useRoute()
  const router = useRouter()
  const inquiryGroupsStore = useInquiryGroupsStore()

  const experience = ref<ExperienceKey>(
    (route.query.experience as ExperienceKey) ||
      initialExperience ||
      'dashboard',
  )

  const currentGroup = computed(() => {
    const slug = route.params.slug as string
    if (slug && slug !== 'none' && slug !== 'undefined') {
      return inquiryGroupsStore.bySlug(slug)
    }
    return null
  })

  const definition = computed<ExperienceDefinition>(
    () =>
      EXPERIENCE_DEFINITIONS[experience.value] ||
      EXPERIENCE_DEFINITIONS.dashboard,
  )

  const displayMode = ref<DisplayMode>(
    (route.query.display as DisplayMode) || definition.value.defaultDisplay,
  )

  const tools = ref<ToolKey[]>([...definition.value.defaultTools])

  const showResources = ref(true)
  const showComments = ref(true)

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
      showComments: showComments.value,
    }
  })

  function getAvailableExperiences(): ExperienceKey[] {
    const targetGroup = currentGroup.value
    const allKeys = Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
    if (!targetGroup) return allKeys

    return allKeys.filter((key) => {
      const def = EXPERIENCE_DEFINITIONS[key]
      if (!def.supportedGroupTypes || def.supportedGroupTypes.length === 0) {
        return true
      }
      return def.supportedGroupTypes.includes(targetGroup.type)
    })
  }

  function getAvailableDisplays(): DisplayMode[] {
    return definition.value.allowedDisplays
  }

  function getAvailableTools(): ToolKey[] {
    return definition.value.allowedTools
  }

  function canUseTool(tool: ToolKey): boolean {
    return definition.value.allowedTools.includes(tool)
  }

  function isToolDisplay(mode: DisplayMode): boolean {
    return mode === 'tool'
  }

  function getDefaultTool(): ToolKey | undefined {
    return definition.value.defaultTool
  }

  function buildQuery(extra: Record<string, string>): Record<string, string> {
    return {
      ...Object.fromEntries(
        Object.entries(route.query).filter(
          ([, v]) => typeof v === 'string',
        ) as [string, string][],
      ),
      ...extra,
    }
  }

  function switchExperience(key: ExperienceKey) {
    if (!EXPERIENCE_DEFINITIONS[key]) return

    experience.value = key
    const def = EXPERIENCE_DEFINITIONS[key]
    displayMode.value = def.defaultDisplay
    tools.value = [...def.defaultTools]

    const query = buildQuery({
      experience: key,
      display: def.defaultDisplay,
    })
    if (def.defaultTool) query.tool = def.defaultTool
    router.push({ query })
  }

  function switchDisplay(mode: DisplayMode) {
    if (!definition.value.allowedDisplays.includes(mode)) return
    displayMode.value = mode
    router.push({ query: buildQuery({ display: mode }) })
  }

  function toggleTool(tool: ToolKey) {
    const index = tools.value.indexOf(tool)
    if (index > -1) tools.value.splice(index, 1)
    else tools.value.push(tool)
  }

  function toggleResources() {
    showResources.value = !showResources.value
  }

  function toggleComments() {
    showComments.value = !showComments.value
  }

  watch(
    () => route.query.experience,
    (newExp) => {
      if (
        newExp &&
        typeof newExp === 'string' &&
        EXPERIENCE_DEFINITIONS[newExp as ExperienceKey]
      ) {
        experience.value = newExp as ExperienceKey
        const def = EXPERIENCE_DEFINITIONS[newExp as ExperienceKey]
        displayMode.value = def.defaultDisplay
        tools.value = [...def.defaultTools]
      }
    },
  )

  watch(
    () => route.query.display,
    (newDisplay) => {
      if (newDisplay && typeof newDisplay === 'string') {
        displayMode.value = newDisplay as DisplayMode
      }
    },
  )

  return {
    experience,
    displayMode,
    tools,
    config,
    definition,
    showResources,
    showComments,

    currentGroup,
    getAvailableExperiences,
    getAvailableDisplays,
    getAvailableTools,
    canUseTool,
    isToolDisplay,
    getDefaultTool,

    switchExperience,
    switchDisplay,
    toggleTool,
    toggleResources,
    toggleComments,
  }
}
