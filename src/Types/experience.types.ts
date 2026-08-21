// ============================================================
//
// ============================================================
// FILE: types/experience.types.ts
// ============================================================

/**
 * Filter criteria for scoping data
 */
export interface ScopeFilter {
  /** Filter by specific type(s) */
  type?: string | string[]
  /** Filter by status(es) */
  status?: string | string[]
  /** Filter by family (for options) */
  family?: string | string[]
  /** Filter by date range */
  date?: {
    from?: number // timestamp
    to?: number   // timestamp
  }
  /** Filter by selection (for marketplace/selection modes) */
  selection?: {
    /** Filter by user selection */
    userId?: string
    /** Filter by group selection */
    groupId?: number
    /** Filter by category selection */
    category?: string
    /** Filter by location selection */
    location?: string
    /** Filter by tag selection */
    tags?: string[]
    /** Filter by custom selection criteria */
    custom?: Record<string, unknown>
  }
  /** Custom fields from miscFields */
  [key: string]: unknown
}

/**
 * Scope definition with filters
 */
export interface Scope {
  /** Source of the data */
  source: 'children' | 'selected' | 'selected_inquiry' | 'selected_group' | 'group' | 'all'
  /** Optional: filter by family (for options) - DEPRECATED, use filter.family */
  family?: string
  /** Optional: list of families - DEPRECATED, use filter.family */
  families?: string[]
  /** Advanced filtering criteria */
  filter?: ScopeFilter
  /** Optional: sorting */
  sort?: {
    field: string
    direction: 'asc' | 'desc'
  }
  /** Optional: pagination */
  pagination?: {
    limit: number
    offset: number
  }
}

/**
 * Content types - What data to display
 */
export type ContentType = 
  | 'inquiry_groups'    // Child InquiryGroups for navigation
  | 'inquiries'         // Inquiries in the current group
  | 'inquiry'           // A single selected Inquiry (full view)
  | 'options'           // Options belonging to an Inquiry (grouped by family)
  | 'resources'         // Resources attached to an Inquiry
  | 'messages'          // Comments/discussions on an Inquiry
  | 'statistics'        // Calculated metrics and data
  | 'activity'          // Activity feed (events, not comments)

/**
 * Display types - How to render the content
 */
export type DisplayType =
  | 'list'              // Vertical list
  | 'cards'             // Individual cards
  | 'full'              // Full display of an object
  | 'feed'              // Chronological/social flow
  | 'tree'              // Hierarchical tree
  | 'navigation'        // Structured navigation
  | 'book'              // Paginated document-like reading
  | 'widget'            // Compact data/statistics widget
  | 'tool'              // Functional tool component

/**
 * Tool keys - Functional components
 */
export type ToolKey = 
  // Option-exclusive tools (Section 15)
  | 'debate'      // FamilyLayoutPaired
  | 'consensus'   // FamilyLayoutConsensusFlow
  | 'structure'   // FamilyLayoutTree
  // Tools that work on both Options AND Inquiries (Section 16)
  | 'kanban'      // FamilyLayoutKanban
  | 'timeline'    // FamilyLayoutTimeline
  | 'vote'        // FamilyLayoutVote
  // Marketplace tools
  | 'search'      // Search functionality
  | 'filter'      // Filter functionality
  | 'compare'     // Compare functionality

/**
 * Display zone configuration
 */
export interface DisplayZone {
  /** What data to display */
  content: ContentType
  /** Where the data comes from */
  scope: Scope
  /** How to display the data */
  display: {
    type: DisplayType
    /** Required when display.type === 'tool' */
    tool?: ToolKey
    /** Optional: display mode variant */
    mode?: string
    /** Optional: pagination strategy */
    pagination?: 'infinite' | 'paged'
  }
  /** Optional: zone styling */
  style?: {
    width?: string
    height?: string
    background?: string
    padding?: string
  }
}

/**
 * Experience architecture configuration
 * @see La séparation est maintenant claire.txt - Section 8-11
 */
export interface ExperienceArchitecture {
  /** The experience key */
  experience: ExperienceKey
  /** Layout configuration */
  layout: {
    type: 'grid' | 'flex' | 'sidebar' | 'split' | 'full'
    columns?: number
    rows?: number
    responsive?: boolean
  }
  /** Display zones mapping */
  display_architecture: Record<string, DisplayZone>
  /** Features enabled for this experience */
  features?: string[]
  /** Context settings */
  context?: {
    type: 'group' | 'inquiry' | 'option'
    selection: 'selected' | 'current' | 'all'
  }
}
