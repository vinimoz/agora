// SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * ============================================================================
 * VOTING & SUPPORT TYPE DEFINITIONS
 * Central source of truth for all voting-related types
 * ============================================================================
 */

// ============================================================================
// 🟢 INFORMAL SUPPORT FEATURES (Deliberation Phase)
// ============================================================================

export type SupportFeature =
  | 'binary'              // 👍 Simple Yes/No
  | 'ternary'             // ⚖️ For/Abstain/Against
  | 'reaction'            // ❤️ Emotional reactions
  | 'star'                // ⭐ Rating 1-5 stars
  | 'score'               // 🔢 Free score 0-10
  | 'majority_judgment'   // 🧠 Graded evaluation
  | 'approval'            // ✅ Multi-select approval
  | 'ranking'             // 📊 Prioritization ranking
  | 'trending'            // 🔥 Popularity-based
  | 'none'                // ⛔ Pure discussion


// ============================================================================
// 🔵 VOTING ENGINES - Used in both deliberative and voting phases
// ============================================================================

/**
 * Unified voting engine type
 * Same engines serve as both SupportFeature (deliberative) and VotingEngine (formal)
 */
export type VotingEngine = SupportFeature


// ============================================================================
// 🎨 UI PRESENTATION VIEWS
// ============================================================================

export type OptionViewMode =
  | 'list' | 'kanban' | 'grid' | 'checkbox' | 'radio'
  | 'dropdown' | 'slider' | 'emoji' | 'ranking' | 'matrix'
  | 'calendar' | 'map' | 'gallery' | 'timeline' | 'cards' | 'results'

export type OptionType =
  | 'text' | 'date' | 'location' | 'user' | 'group'
  | 'file' | 'link' | 'number' | 'boolean' | 'color' | 'image'


// ============================================================================
// 🟣 PHASES
// ============================================================================

export type Phase =
  | 'deliberative' | 'voting' | 'hybrid'
  | 'filtration' | 'progressive' | 'liquid'

export type InquiryMode = Phase


// ============================================================================
// ⚙️ CONFIGURATION OPTIONS
// ============================================================================

export interface VotingOptions {
  viewMode?: OptionViewMode
  optionType?: OptionType
  
  defaultOptions?: {
    enabled: boolean
    values?: string[]
    count?: number
    template?: string
  }
  
  scale?: {
    min: number
    max: number
    step?: number
    labels?: Record<number, string>
    showLabels?: boolean
    defaultValue?: number
  }
  
  grades?: {
    values: number[]
    labels: string[]
    defaultGrade?: number
  }
  
  reactions?: {
    available: string[]
    maxPerUser?: number
    allowCustom?: boolean
    showCount?: boolean
  }
  
  ranking?: {
    maxChoices: number
    minChoices?: number
    allowTies: boolean
    showScores?: boolean
  }
  
  approval?: {
    maxChoices: number | null
    minChoices?: number
    defaultSelected?: number[]
  }
  
  quadratic?: {
    creditsPerUser: number
    costFunction: 'square' | 'custom'
    allowNegative?: boolean
    showRemainingCredits?: boolean
  }
  
  tokenWeighted?: {
    tokenType: string
    minBalance: number
    weightFormula: 'linear' | 'sqrt' | 'log'
    maxWeight?: number
  }
  
  phased?: {
    rounds: number
    eliminationRule: 'bottom' | 'threshold' | 'top'
    threshold?: number
    keepPerRound?: number
  }
  
  quorum?: {
    type: 'count' | 'percentage' | 'token'
    value: number
    scope: 'global' | 'group'
    enforceStrict?: boolean
  }
  
  ui?: {
    showResults?: 'always' | 'after_vote' | 'after_close' | 'never'
    anonymousResults?: boolean
    allowComments?: boolean
    requireConfirmation?: boolean
    showProgress?: boolean
    sortOptions?: 'manual' | 'alphabetical' | 'random' | 'popular'
  }
  
  advanced?: {
    allowDelegation?: boolean
    allowProxy?: boolean
    minVotingPower?: number
    cooldownPeriod?: number
    lockAfterVote?: boolean
  }
}


// ============================================================================
// 🎯 MAIN CONFIGURATION INTERFACE
// ============================================================================

export interface VotingConfiguration {
  supportFeature: SupportFeature
  votingEngine: VotingEngine | null
  phase: Phase
  viewMode: OptionViewMode
  optionType: OptionType
  options?: VotingOptions
  mode?: Phase  // @deprecated
}


// ============================================================================
// 📊 SUPPORT DATA
// ============================================================================

export type SupportValue = number | string | string[] | null

export interface SupportData {
  id?: number
  inquiryId: number
  optionId?: number
  groupId: number
  userId: string
  support_engine_id?: number
  value: SupportValue
  created: number
  updated?: number
  metadata?: {
    reaction?: string
    weight?: number
    delegation?: string
    proof?: string
    comment?: string
  }
}


// ============================================================================
// 📈 RESULT TYPES (for SupportResult.result JSON field)
// ============================================================================

export interface BinaryResult {
  type: 'binary'
  total_yes: number
  total_no: number
  percentage_yes: number
  percentage_no: number
}

export interface TernaryResult {
  type: 'ternary'
  total_yes: number
  total_no: number
  total_abstain: number
  percentage_yes: number
  percentage_no: number
  percentage_abstain: number
}

export interface ScoreResult {
  type: 'score'
  total: number
  average: number
  median?: number
  weight_sum?: number
}

export interface RankingResult {
  type: 'ranking'
  rank: number
  score?: number
}

export interface CondorcetResult {
  type: 'condorcet'
  wins: number
  losses: number
  ties: number
  is_winner: boolean
  score?: number
}

export interface MajorityJudgmentResult {
  type: 'majority_judgment'
  median: number
  distribution: Record<number, number>
}

export interface ReactionResult {
  type: 'reaction'
  counts: Record<string, number>
}

export interface ApprovalResult {
  type: 'approval'
  counts: Record<number, number>
}

export interface TrendingResult {
  type: 'trending'
  score: number
  components?: {
    votes?: number
    activity?: number
    recency?: number
  }
}

export type SupportResultData =
  | BinaryResult
  | TernaryResult
  | ScoreResult
  | RankingResult
  | CondorcetResult
  | MajorityJudgmentResult
  | ReactionResult
  | ApprovalResult
  | TrendingResult


// ============================================================================
// 🔧 ENGINE METADATA
// ============================================================================

export interface ConfigSchemaField {
  type: 'number' | 'string' | 'boolean' | 'select' | 'array' | 'object'
  default?: unknown
  label?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  options?: string[] | Record<string, string>
  description?: string
}

export interface EngineDefinition {
  id: string
  label: string
  behavior: 'single' | 'multi' | 'flex'
  description: string
  
  constraints: {
    min_options?: number
    max_options?: number
    requires_weight_source?: boolean
  }
  
  recommendedViews?: OptionViewMode[]
  compatibleOptionTypes?: OptionType[]
  defaultOptions?: Partial<VotingOptions>
  config_schema?: Record<string, ConfigSchemaField>
}

export interface EngineInfo {
  id: string
  label: string
  behavior: 'single' | 'multi' | 'flex'
  description: string
  constraints?: {
    min_options?: number
    max_options?: number
  }
  recommendedViews?: OptionViewMode[]
  icon?: string
}


// ============================================================================
// 🏭 ENGINE DEFINITIONS - Complete Registry
// ============================================================================

export const ENGINE_DEFINITIONS: Record<string, EngineDefinition> = {
  // === Simple Voting ===
  binary: {
    id: 'binary',
    label: 'Yes / No',
    behavior: 'single',
    description: 'Simple yes/no voting on options',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'list', 'radio'],
    compatibleOptionTypes: ['text', 'boolean'],
    config_schema: {}
  },
  
  ternary: {
    id: 'ternary',
    label: 'For / Abstain / Against',
    behavior: 'single',
    description: 'Three-way voting with abstention option',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'list', 'radio'],
    compatibleOptionTypes: ['text'],
    config_schema: {}
  },
  
  // === Rated Voting ===
  star: {
    id: 'star',
    label: 'Star Rating',
    behavior: 'single',
    description: 'Rate options from 1 to 5 stars',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'grid', 'slider'],
    compatibleOptionTypes: ['text', 'number'],
    config_schema: {
      min: { type: 'number', default: 1, label: 'Minimum stars', min: 1, max: 5 },
      max: { type: 'number', default: 5, label: 'Maximum stars', min: 1, max: 10 }
    }
  },
  
  score: {
    id: 'score',
    label: 'Score Voting',
    behavior: 'single',
    description: 'Rate options on a numeric scale (0-10)',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'list', 'slider'],
    compatibleOptionTypes: ['text', 'number'],
    config_schema: {
      min: { type: 'number', default: 0, label: 'Minimum score', min: 0 },
      max: { type: 'number', default: 10, label: 'Maximum score', max: 100 }
    }
  },
  
  majority_judgment: {
    id: 'majority_judgment',
    label: 'Majority Judgment',
    behavior: 'multi',
    description: 'Grade each option, median grade determines winner',
    constraints: { min_options: 2 },
    recommendedViews: ['cards', 'matrix'],
    compatibleOptionTypes: ['text'],
    config_schema: {
      grades: {
        type: 'array',
        default: ['Reject', 'Insufficient', 'Passable', 'Fairly Good', 'Good', 'Very Good', 'Excellent'],
        label: 'Grade options'
      }
    }
  },
  
  // === Approval-Based ===
  approval: {
    id: 'approval',
    label: 'Approval Voting',
    behavior: 'multi',
    description: 'Select all options you approve of',
    constraints: { min_options: 2 },
    recommendedViews: ['cards', 'list', 'checkbox'],
    compatibleOptionTypes: ['text'],
    config_schema: {
      min_choices: { type: 'number', default: 1, label: 'Minimum choices', min: 1 },
      max_choices: { type: 'number', default: null, label: 'Maximum choices (null = unlimited)' }
    }
  },
  
  // === Ranked Methods ===
  ranking: {
    id: 'ranking',
    label: 'Ranked Choice',
    behavior: 'multi',
    description: 'Rank options in order of preference',
    constraints: { min_options: 2 },
    recommendedViews: ['cards', 'list', 'ranking'],
    compatibleOptionTypes: ['text'],
    config_schema: {
      max_rank: { type: 'number', default: null, label: 'Maximum rank (null = rank all)' },
      allow_ties: { type: 'boolean', default: false, label: 'Allow tied ranks' }
    }
  },
  
  borda: {
    id: 'borda',
    label: 'Borda Count',
    behavior: 'multi',
    description: 'Rank options, points assigned by rank position',
    constraints: { min_options: 2 },
    recommendedViews: ['cards', 'ranking'],
    compatibleOptionTypes: ['text'],
    config_schema: {}
  },
  
  condorcet: {
    id: 'condorcet',
    label: 'Condorcet',
    behavior: 'multi',
    description: 'Pairwise comparison voting method',
    constraints: { min_options: 2 },
    recommendedViews: ['cards', 'ranking', 'matrix'],
    compatibleOptionTypes: ['text'],
    config_schema: {
      variant: {
        type: 'select',
        default: 'schulze',
        label: 'Condorcet method',
        options: ['schulze', 'copeland', 'minimax', 'ranked_pairs', 'kemeny_young']
      }
    }
  },
  
  // === Advanced Methods ===
  quadratic: {
    id: 'quadratic',
    label: 'Quadratic Voting',
    behavior: 'flex',
    description: 'Vote with quadratic cost mechanism',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'slider'],
    compatibleOptionTypes: ['text', 'number'],
    config_schema: {
      credits_per_user: { type: 'number', default: 100, label: 'Credits per user', min: 1 }
    }
  },
  
  token_weighted: {
    id: 'token_weighted',
    label: 'Token / Weighted',
    behavior: 'flex',
    description: 'Vote with weighted tokens',
    constraints: { min_options: 1, requires_weight_source: true },
    recommendedViews: ['cards', 'slider'],
    compatibleOptionTypes: ['text', 'number'],
    config_schema: {
      weight_source: { type: 'object', default: null, label: 'Weight source' },
      normalization: {
        type: 'select',
        default: 'none',
        label: 'Normalization',
        options: ['none', 'min-max', 'z-score']
      }
    }
  },
  
  phased_voting: {
    id: 'phased_voting',
    label: 'Phased Voting',
    behavior: 'flex',
    description: 'Multi-round elimination voting',
    constraints: { min_options: 3 },
    recommendedViews: ['cards', 'list'],
    compatibleOptionTypes: ['text'],
    config_schema: {
      rounds: { type: 'number', default: 2, label: 'Number of rounds', min: 2 },
      elimination_rule: {
        type: 'select',
        default: 'bottom',
        label: 'Elimination rule',
        options: ['bottom', 'threshold', 'top']
      }
    }
  },
  
  // === Reaction Support (Informal) ===
  reaction: {
    id: 'reaction',
    label: 'Reactions',
    behavior: 'multi',
    description: 'React with emojis to show your opinion',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'emoji', 'grid'],
    compatibleOptionTypes: ['text'],
    config_schema: {
      allowed_reactions: {
        type: 'array',
        default: ['👍', '❤️', '🎉', '🤔', '👎'],
        label: 'Allowed reactions'
      },
      max_per_user: { type: 'number', default: 3, label: 'Max reactions per user' }
    }
  },
  
  // === Additional support features (no formal voting) ===
  trending: {
    id: 'trending',
    label: 'Trending',
    behavior: 'single',
    description: 'Popularity-based trending (votes + activity)',
    constraints: { min_options: 1 },
    recommendedViews: ['cards', 'list'],
    compatibleOptionTypes: ['text'],
    config_schema: {}
  },
  
  none: {
    id: 'none',
    label: 'No Support',
    behavior: 'single',
    description: 'Pure discussion without support features',
    constraints: {},
    recommendedViews: ['list'],
    compatibleOptionTypes: ['text'],
    config_schema: {}
  }
}


// ============================================================================
// 🛠 UTILITY FUNCTIONS
// ============================================================================

/**
 * Get available engines filtered by option count
 * @param optionCount
 */
export function getAvailableEngines(optionCount: number): EngineInfo[] {
  return Object.entries(ENGINE_DEFINITIONS)
    .filter(([, engine]) => {
      const c = engine.constraints
      if (c.min_options && optionCount < c.min_options) return false
      if (c.max_options && optionCount > c.max_options) return false
      return true
    })
    .map(([id, engine]) => ({
      id,
      label: engine.label,
      behavior: engine.behavior,
      description: engine.description,
      constraints: engine.constraints,
      recommendedViews: engine.recommendedViews
    }))
}

/**
 * Initialize engine config from schema defaults
 * @param engineId
 */
export function initializeEngineConfig(engineId: string): Record<string, unknown> {
  const engine = ENGINE_DEFINITIONS[engineId]
  if (!engine?.config_schema) return {}
  
  const config: Record<string, unknown> = {}
  for (const [key, schema] of Object.entries(engine.config_schema)) {
    config[key] = schema.default
  }
  return config
}

/**
 * Type guard for SupportFeature
 * @param feature
 */
export function isValidSupportFeature(feature: string): feature is SupportFeature {
  return Object.keys(ENGINE_DEFINITIONS).includes(feature)
}

/**
 * Type guard for Phase
 * @param phase
 */
export function isValidPhase(phase: string): phase is Phase {
  return ['deliberative', 'voting', 'hybrid', 'filtration', 'progressive', 'liquid'].includes(phase)
}

/**
 * Get recommended view modes for an engine
 * @param engineId
 */
export function getRecommendedViews(engineId: string): OptionViewMode[] {
  return ENGINE_DEFINITIONS[engineId]?.recommendedViews || ['cards', 'list']
}
