/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
// ============================================================
// Experience Architecture Types - Single Source of Truth
// ============================================================

// ---------- Re-usable filter & scope ----------
export interface ScopeFilter {
  inquiry_type?: string | string[]
  group_type?: string | string[]
  type?: string | string[]
  status?: string | string[]
  family?: string | string[]
  date?: { from?: number; to?: number }
  from?: number
  to?: number
  selection?: {
    userId?: string
    groupId?: number
    category?: string
    location?: string
    tags?: string[]
    custom?: Record<string, unknown>
  }
  [key: string]: unknown
}

export interface Scope {
  source: 'children' | 'selected' | 'selected_inquiry' | 'selected_group' | 'group' | 'all'
  family?: string
  families?: string[]
  filter?: ScopeFilter
  sort?: { field: string; direction: 'asc' | 'desc' }
  pagination?: { limit: number; offset: number }
}

// ---------- Content / Display / Tool types ----------
export type ContentType =
  | 'inquiry_groups'
  | 'inquiries'
  | 'options'
  | 'resources'
  | 'messages'
  | 'statistics'
  | 'activity'

export type DisplayType =
  | 'list'
  | 'cards'
  | 'feed'
  | 'tree'
  | 'navigation'
  | 'timeline'
  | 'kanban'
  | 'book'
  | 'widget'
  | 'tool'

export type ToolKey =
  | 'debate'
  | 'consensus'
  | 'structure'
  | 'kanban'
  | 'timeline'
  | 'vote'
  | 'search'
  | 'filter'
  | 'compare'
  | 'wiki'
  | 'analytics'
  | 'resources'
  | 'quorum'
  | 'support'

// ---------- Grid position (camelCase) ----------
export interface GridPosition {
  row: number          // 1‑based
  column: number       // 1‑based
  rowSpan?: number     // default 1
  columnSpan?: number  // default 1
}

// ---------- Display Zone (merged with inquiryGroups.types.ts) ----------
export interface DisplayZone {
  /** What is displayed */
  content: ContentType

  /** Defines where the content comes from (and optional filters/sort) */
  scope: Scope

  /** Grid position – required for grid layouts */
  position: GridPosition

  /** How the content is displayed */
  display: {
    type: DisplayType
    /** Required when display.type === 'tool' */
    tool?: ToolKey
    mode?: string
    pagination?: 'infinite' | 'paged'
    options?: {
      showIcon?: boolean
      showCover?: boolean
      showMeta?: boolean
      showStats?: boolean
      showAuthor?: boolean
      showDescription?: boolean
      showExpiry?: boolean
      showType?: boolean
      showStatus?: boolean
      showSupport?: boolean
      showParticipants?: boolean
      horizontal?: boolean
      dense?: boolean
      compact?: boolean
      interactive?: boolean
      openMode?: 'page' | 'panel' | 'modal' | 'dialog' | 'none'
      cardsPerRow?: number
    }
  }

  /** Optional styling */
  style?: { width?: string; height?: string; background?: string; padding?: string }

  /** What happens when the selected item is clicked (second click) */
  interaction?: {
    action?: 'open' | 'navigate' | 'none' | 'select' | 'vote' | 'edit' | 'comment' | 'support'
    target?: 'modal' | 'page' | 'panel' | 'dialog' | 'same_view'
  }

  /** Legacy: top‑level filter (optional) – kept for compatibility, but prefer using scope.filter */
  filter?: Record<string, unknown>
}

// ---------- Experience Architecture ----------
export interface ExperienceArchitecture {
  /** Active experience key */
  experience: ExperienceKey
  /** Default experience (if different from active) */
  defaultExperience?: ExperienceKey
  /** Default display mode for this experience */
  defaultDisplay?: DisplayType
  /** Layout configuration */
  layout: {
    type: 'grid' | 'flex' | 'sidebar' | 'split' | 'full'
    columns?: number
    rows?: number
    responsive?: boolean
  }
  /** Map of zone names to DisplayZone (camelCase) */
  displayArchitecture: Record<string, DisplayZone>
  /** Enabled features */
  features?: string[]
  /** Context definition */
  context?: { type: 'group' | 'inquiry'; selection: 'selected' | 'current' | 'all' }
}

// ============================================================
// VOCABULARY – Single Source of Truth
// ============================================================

export const EXPERIENCE_VALUES = [
  'dashboard', 'social', 'marketplace', 'kanban', 'timeline', 'wiki', 'decision_room', 'navigation'
] as const
export type ExperienceKey = typeof EXPERIENCE_VALUES[number]

export const CONTEXT_TYPE_VALUES = ['group', 'inquiry'] as const
export type ContextTypeValue = typeof CONTEXT_TYPE_VALUES[number]

export const CONTEXT_SELECTION_VALUES = ['selected', 'current', 'all'] as const
export type ContextSelectionValue = typeof CONTEXT_SELECTION_VALUES[number]

export const LAYOUT_TYPE_VALUES = ['grid', 'flex', 'sidebar', 'split', 'full'] as const
export type LayoutTypeValue = typeof LAYOUT_TYPE_VALUES[number]

export const CONTENT_VALUES = [
  'inquiry_groups', 'inquiries', 'options', 'resources', 'messages', 'statistics', 'activity'
] as const
export type ContentValue = typeof CONTENT_VALUES[number]

export const SOURCE_VALUES = [
  'group', 'children', 'parent_group', 'selected_group', 'selected_inquiry', 'all'
] as const
export type SourceValue = typeof SOURCE_VALUES[number]

export const VALID_SOURCES_BY_CONTENT: Record<ContentValue, SourceValue[]> = {
  'inquiry_groups': ['children', 'selected_group', 'parent_group', 'group', 'all'],
  'inquiries': ['children', 'selected_group', 'group', 'all'],
  'options': ['selected_inquiry'],
  'resources': ['selected_inquiry'],
  'messages': ['selected_inquiry'],
  'statistics': ['group', 'selected_group', 'selected_inquiry'],
  'activity': ['group', 'children', 'all'],
}

export const DISPLAY_TYPE_VALUES = [
  'list', 'cards', 'feed', 'tree', 'navigation', 'book', 'widget', 'tool'
] as const
export type DisplayTypeValue = typeof DISPLAY_TYPE_VALUES[number]

export const VALID_DISPLAYS_BY_CONTENT: Record<ContentValue, DisplayTypeValue[]> = {
  'inquiry_groups': ['list', 'cards', 'tree', 'navigation'],
  'inquiries': ['list', 'cards', 'book', 'tree', 'feed', 'timeline', 'kanban', 'tool'],
  'options': ['tool'],
  'resources': ['list'],
  'messages': ['list'],
  'statistics': ['widget', 'list', 'cards'],
  'activity': ['feed', 'list'],
}

export const INQUIRY_TOOLS = ['vote', 'timeline', 'kanban'] as const
export type InquiryTool = typeof INQUIRY_TOOLS[number]
export const OPTION_TOOLS = ['vote', 'consensus', 'debate', 'timeline', 'kanban', 'structure'] as const
export type OptionTool = typeof OPTION_TOOLS[number]
export const MARKETPLACE_TOOLS = ['search', 'filter', 'compare'] as const
export type MarketplaceTool = typeof MARKETPLACE_TOOLS[number]
export const ALL_TOOLS = [
  ...INQUIRY_TOOLS,
  ...OPTION_TOOLS,
  ...MARKETPLACE_TOOLS,
  'wiki',
  'analytics',
  'resources',
  'quorum',
  'support'
] as const
export type ToolValue = typeof ALL_TOOLS[number]

export const VALID_TOOLS_BY_CONTENT: Record<ContentValue, ToolValue[]> = {
  'inquiry_groups': [],
  'inquiries': [...INQUIRY_TOOLS, 'wiki', 'analytics', 'resources', 'quorum', 'support'],
  'options': [...OPTION_TOOLS, 'wiki', 'analytics', 'resources'],
  'resources': [],
  'messages': [],
  'statistics': [],
  'activity': [],
}

export const INTERACTION_ACTIONS = ['select', 'open', 'navigate', 'vote', 'edit', 'comment', 'support'] as const
export type InteractionAction = typeof INTERACTION_ACTIONS[number]
export const INTERACTION_TARGETS = ['same_view', 'dialog', 'page', 'panel', 'modal'] as const
export type InteractionTarget = typeof INTERACTION_TARGETS[number]

// ============================================================
// VALIDATION FUNCTION (camelCase)
// ============================================================

export interface ValidatedUIDefinition {
  experience: ExperienceKey
  context: { type: ContextTypeValue; selection: ContextSelectionValue }
  layout: { type: LayoutTypeValue; columns?: number; rows?: number; responsive?: boolean }
  displayArchitecture: Record<string, {
    content: ContentValue
    scope: { source: SourceValue; filter?: ScopeFilter }
    position: GridPosition
    display: {
      type: DisplayTypeValue
      tool?: ToolValue
      pagination?: 'infinite' | 'paged'
      mode?: 'compact' | 'horizontal' | 'detailed' | 'summary'
      cardsPerRow?: number
      options?: DisplayZone['display']['options']
    }
    interaction?: { action: InteractionAction; target: InteractionTarget }
  }>
}

export function validateUIDefinition(ui: Partial<ValidatedUIDefinition>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate experience
  if (!ui.experience) errors.push('experience is required')
  else if (!EXPERIENCE_VALUES.includes(ui.experience as any))
    errors.push(`invalid experience: ${ui.experience}. Must be one of: ${EXPERIENCE_VALUES.join(', ')}`)

  // Validate context
  if (!ui.context) errors.push('context is required')
  else {
    if (!ui.context.type || !CONTEXT_TYPE_VALUES.includes(ui.context.type as any))
      errors.push(`invalid context.type: ${ui.context.type}. Must be one of: ${CONTEXT_TYPE_VALUES.join(', ')}`)
    if (!ui.context.selection || !CONTEXT_SELECTION_VALUES.includes(ui.context.selection as any))
      errors.push(`invalid context.selection: ${ui.context.selection}. Must be one of: ${CONTEXT_SELECTION_VALUES.join(', ')}`)
  }

  // Validate layout
  if (!ui.layout) errors.push('layout is required')
  else {
    if (!ui.layout.type || !LAYOUT_TYPE_VALUES.includes(ui.layout.type as any))
      errors.push(`invalid layout.type: ${ui.layout.type}. Must be one of: ${LAYOUT_TYPE_VALUES.join(', ')}`)
    if (ui.layout.type === 'grid') {
      if (!ui.layout.columns || ui.layout.columns < 1)
        errors.push('layout.columns is required for grid layout and must be >= 1')
      if (!ui.layout.rows || ui.layout.rows < 1)
        errors.push('layout.rows is required for grid layout and must be >= 1')
    }
  }

  // Validate architecture zones
  if (!ui.displayArchitecture || Object.keys(ui.displayArchitecture).length === 0)
    errors.push('displayArchitecture is required with at least one zone')
  else {
    const cols = ui.layout?.columns || 3
    const rows = ui.layout?.rows || 2

    for (const [zoneKey, zone] of Object.entries(ui.displayArchitecture)) {
      // content
      if (!zone.content || !CONTENT_VALUES.includes(zone.content as any))
        errors.push(`invalid content in ${zoneKey}: ${zone.content}. Must be one of: ${CONTENT_VALUES.join(', ')}`)

      // scope.source
      if (zone.scope) {
        if (!zone.scope.source || !SOURCE_VALUES.includes(zone.scope.source as any))
          errors.push(`invalid scope.source in ${zoneKey}: ${zone.scope.source}. Must be one of: ${SOURCE_VALUES.join(', ')}`)
        const validSources = VALID_SOURCES_BY_CONTENT[zone.content as ContentValue]
        if (validSources && !validSources.includes(zone.scope.source as any))
          errors.push(`invalid source '${zone.scope.source}' for content '${zone.content}' in ${zoneKey}. Allowed: ${validSources.join(', ')}`)
      }

      // position
      if (!zone.position)
        errors.push(`position is required for zone ${zoneKey}`)
      else {
        const p = zone.position
        if (!p.row || p.row < 1) errors.push(`position.row must be >= 1 for zone ${zoneKey}`)
        if (!p.column || p.column < 1) errors.push(`position.column must be >= 1 for zone ${zoneKey}`)
        if (ui.layout?.type === 'grid') {
          const rowSpan = p.rowSpan || 1
          const colSpan = p.columnSpan || 1
          if (p.row > rows) errors.push(`position.row (${p.row}) exceeds layout.rows (${rows}) for zone ${zoneKey}`)
          if (p.column > cols) errors.push(`position.column (${p.column}) exceeds layout.columns (${cols}) for zone ${zoneKey}`)
          if (p.row + rowSpan - 1 > rows) errors.push(`position.row + rowSpan exceeds layout.rows for zone ${zoneKey}`)
          if (p.column + colSpan - 1 > cols) errors.push(`position.column + columnSpan exceeds layout.columns for zone ${zoneKey}`)
        }
      }

      // display.type
      if (zone.display) {
        if (!zone.display.type || !DISPLAY_TYPE_VALUES.includes(zone.display.type as any))
          errors.push(`invalid display.type in ${zoneKey}: ${zone.display.type}. Must be one of: ${DISPLAY_TYPE_VALUES.join(', ')}`)
        const validDisplays = VALID_DISPLAYS_BY_CONTENT[zone.content as ContentValue]
        if (validDisplays && !validDisplays.includes(zone.display.type as any))
          errors.push(`invalid display.type '${zone.display.type}' for content '${zone.content}' in ${zoneKey}. Allowed: ${validDisplays.join(', ')}`)

        if (zone.display.type === 'tool') {
          if (!zone.display.tool) errors.push(`tool is required when display.type === 'tool' in ${zoneKey}`)
          else {
            const validTools = VALID_TOOLS_BY_CONTENT[zone.content as ContentValue]
            if (validTools && !validTools.includes(zone.display.tool as any))
              errors.push(`invalid tool '${zone.display.tool}' for content '${zone.content}' in ${zoneKey}. Allowed: ${validTools.join(', ')}`)
          }
        }
      }

      // interaction (top-level action/target)
      if (zone.interaction) {
        if (zone.interaction.action && !INTERACTION_ACTIONS.includes(zone.interaction.action as any))
          errors.push(`invalid interaction.action in ${zoneKey}: ${zone.interaction.action}. Must be one of: ${INTERACTION_ACTIONS.join(', ')}`)
        if (zone.interaction.target && !INTERACTION_TARGETS.includes(zone.interaction.target as any))
          errors.push(`invalid interaction.target in ${zoneKey}: ${zone.interaction.target}. Must be one of: ${INTERACTION_TARGETS.join(', ')}`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
