/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
// ============================================================
// Experience Architecture Types - Single Source of Truth
// ============================================================

/**
 * Filter criteria for scoping data
 */
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

/**
 * Scope definition with filters
 */
export interface Scope {
  source: 'children' | 'selected' | 'selected_inquiry' | 'selected_group' | 'group' | 'all'
  family?: string
  families?: string[]
  filter?: ScopeFilter
  sort?: { field: string; direction: 'asc' | 'desc' }
  pagination?: { limit: number; offset: number }
}

/**
 * Content types
 */
export type ContentType =
  | 'inquiry_groups'
  | 'inquiries'
  | 'inquiry'
  | 'options'
  | 'resources'
  | 'messages'
  | 'statistics'
  | 'activity'

/**
 * Display types
 */
export type DisplayType =
  | 'list'
  | 'cards'
  | 'full'
  | 'feed'
  | 'tree'
  | 'navigation'
  | 'book'
  | 'widget'
  | 'tool'

/**
 * Tool keys
 */
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

/**
 * Grid position for a zone
 */
export interface GridPosition {
  row: number          // 1‑based
  column: number       // 1‑based
  row_span?: number    // default 1
  column_span?: number // default 1
}

/**
 * Display zone configuration
 */
export interface DisplayZone {
  content: ContentType
  scope: Scope
  display: {
    type: DisplayType
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
  /** Grid position – required for grid layouts */
  position: GridPosition
  style?: { width?: string; height?: string; background?: string; padding?: string }
  /** Two‑click interaction: second click triggers this */
  interaction?: {
    on_click: {
      action: 'select' | 'open' | 'navigate' | 'vote' | 'edit' | 'comment' | 'support'
      target: 'same_view' | 'dialog' | 'page' | 'panel' | 'modal'
    }
  }
}

/**
 * Experience architecture configuration
 */
export interface ExperienceArchitecture {
  experience: ExperienceKey
  layout: {
    type: 'grid' | 'flex' | 'sidebar' | 'split' | 'full'
    columns?: number
    rows?: number
    responsive?: boolean
  }
  display_architecture: Record<string, DisplayZone>
  features?: string[]
  context?: { type: 'group' | 'inquiry'; selection: 'selected' | 'current' | 'all' }
}

// ============================================================
// COMPLETE VOCABULARY – Single Source of Truth
// ============================================================

export const EXPERIENCE_VALUES = [
  'dashboard', 'social', 'marketplace', 'kanban', 'timeline', 'wiki', 'decision_room', 'navigation'
] as const
export type ExperienceValue = typeof EXPERIENCE_VALUES[number]

export const CONTEXT_TYPE_VALUES = ['group', 'inquiry'] as const
export type ContextTypeValue = typeof CONTEXT_TYPE_VALUES[number]

export const CONTEXT_SELECTION_VALUES = ['selected', 'current', 'all'] as const
export type ContextSelectionValue = typeof CONTEXT_SELECTION_VALUES[number]

export const LAYOUT_TYPE_VALUES = ['grid', 'flex', 'sidebar', 'split', 'full'] as const
export type LayoutTypeValue = typeof LAYOUT_TYPE_VALUES[number]

export const CONTENT_VALUES = [
  'inquiry_groups', 'inquiries', 'inquiry', 'options', 'resources', 'comments', 'messages', 'statistics', 'activity'
] as const
export type ContentValue = typeof CONTENT_VALUES[number]

export const SOURCE_VALUES = [
  'group', 'children', 'parent_group', 'selected_group', 'selected_inquiry', 'all'
] as const
export type SourceValue = typeof SOURCE_VALUES[number]

export const VALID_SOURCES_BY_CONTENT: Record<ContentValue, SourceValue[]> = {
  'inquiry_groups': ['children', 'selected_group', 'parent_group', 'group', 'all'],
  'inquiries': ['children', 'selected_group', 'group', 'all'],
  'inquiry': ['selected_inquiry', 'selected_group', 'group'],
  'options': ['selected_inquiry'],
  'resources': ['selected_inquiry'],
  'comments': ['selected_inquiry'],
  'messages': ['selected_inquiry'],
  'statistics': ['group', 'selected_group', 'selected_inquiry'],
  'activity': ['group', 'children', 'all'],
}

export const DISPLAY_TYPE_VALUES = [
  'list', 'cards', 'full', 'feed', 'tree', 'navigation', 'book', 'widget', 'tool'
] as const
export type DisplayTypeValue = typeof DISPLAY_TYPE_VALUES[number]

export const VALID_DISPLAYS_BY_CONTENT: Record<ContentValue, DisplayTypeValue[]> = {
  'inquiry_groups': ['list', 'cards', 'tree', 'navigation'],
  'inquiries': ['list', 'cards', 'book', 'tree', 'feed', 'full', 'tool'],
  'inquiry': ['full', 'book', 'widget'],
  'options': ['tool'],
  'resources': ['list', 'full'],
  'comments': ['feed', 'list'],
  'messages': ['feed', 'list'],
  'statistics': ['widget', 'list', 'cards'],
  'activity': ['feed', 'list'],
}

export const INQUIRY_TOOLS = ['vote', 'timeline', 'kanban'] as const
export type InquiryTool = typeof INQUIRY_TOOLS[number]
export const OPTION_TOOLS = ['vote', 'consensus', 'debate', 'timeline', 'kanban', 'structure'] as const
export type OptionTool = typeof OPTION_TOOLS[number]
export const MARKETPLACE_TOOLS = ['search', 'filter', 'compare'] as const
export type MarketplaceTool = typeof MARKETPLACE_TOOLS[number]
export const ALL_TOOLS = [...INQUIRY_TOOLS, ...OPTION_TOOLS, ...MARKETPLACE_TOOLS] as const
export type ToolValue = typeof ALL_TOOLS[number]

export const VALID_TOOLS_BY_CONTENT: Record<ContentValue, ToolValue[]> = {
  'inquiry_groups': [],
  'inquiries': [...INQUIRY_TOOLS],
  'inquiry': [],
  'options': [...OPTION_TOOLS],
  'resources': [],
  'comments': [],
  'messages': [],
  'statistics': [],
  'activity': [],
}

export const INTERACTION_ACTIONS = ['select', 'open', 'navigate', 'vote', 'edit', 'comment', 'support'] as const
export type InteractionAction = typeof INTERACTION_ACTIONS[number]
export const INTERACTION_TARGETS = ['same_view', 'dialog', 'page', 'panel', 'modal'] as const
export type InteractionTarget = typeof INTERACTION_TARGETS[number]

// ============================================================
// VALIDATION FUNCTION (updated for GridPosition)
// ============================================================

export interface ValidatedUIDefinition {
  experience: ExperienceValue
  context: { type: ContextTypeValue; selection: ContextSelectionValue }
  layout: { type: LayoutTypeValue; columns?: number; rows?: number; responsive?: boolean }
  display_architecture: Record<string, {
    content: ContentValue
    scope: { source: SourceValue }
    filter?: ScopeFilter
    position: GridPosition
    display: {
      type: DisplayTypeValue
      tool?: ToolValue
      pagination?: 'infinite' | 'paged'
      mode?: 'compact' | 'horizontal' | 'detailed' | 'summary'
      cardsPerRow?: number
      options?: DisplayZone['display']['options']
    }
    interaction?: { on_click: { action: InteractionAction; target: InteractionTarget } }
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
  if (!ui.display_architecture || Object.keys(ui.display_architecture).length === 0)
    errors.push('display_architecture is required with at least one zone')
  else {
    const cols = ui.layout?.columns || 3
    const rows = ui.layout?.rows || 2

    for (const [zoneKey, zone] of Object.entries(ui.display_architecture)) {
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
          const rowSpan = p.row_span || 1
          const colSpan = p.column_span || 1
          if (p.row > rows) errors.push(`position.row (${p.row}) exceeds layout.rows (${rows}) for zone ${zoneKey}`)
          if (p.column > cols) errors.push(`position.column (${p.column}) exceeds layout.columns (${cols}) for zone ${zoneKey}`)
          if (p.row + rowSpan - 1 > rows) errors.push(`position.row + row_span exceeds layout.rows for zone ${zoneKey}`)
          if (p.column + colSpan - 1 > cols) errors.push(`position.column + column_span exceeds layout.columns for zone ${zoneKey}`)
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

      // interaction
      if (zone.interaction?.on_click) {
        if (!INTERACTION_ACTIONS.includes(zone.interaction.on_click.action as any))
          errors.push(`invalid interaction.action in ${zoneKey}: ${zone.interaction.on_click.action}. Must be one of: ${INTERACTION_ACTIONS.join(', ')}`)
        if (!INTERACTION_TARGETS.includes(zone.interaction.on_click.target as any))
          errors.push(`invalid interaction.target in ${zoneKey}: ${zone.interaction.on_click.target}. Must be one of: ${INTERACTION_TARGETS.join(', ')}`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
