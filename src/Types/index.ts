/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// ============================================================================
// SUPPORT DATA - Results
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
// SUPPORT ENGINE - Core Structure (Multipurpose)
// ============================================================================


export type SupportResultType = SupportResultData['type']

export type SupportEngineTarget = 'inquiry' | 'option'

// ============================================================================
// PHASES (formerly)
// ============================================================================

export type Phase =
  | 'deliberative'    // Discussion / support only
  | 'voting'          // Formal voting only
  | 'hybrid'          // Deliberation → Vote
  | 'filtration'      // Top selection → final vote
  | 'progressive'     // Iterative consensus
  | 'liquid'          // Liquid democracy


export interface SupportEngine {
  id: number
  engine: string           // The voting engine type (binary, score, ranked, etc.)
  type: string             // The support feature type
  group_id: number
  status: 'draft' | 'active' | 'closed'
  config: Record<string, unknown>  // Engine-specific configuration
  created: number
  
  // Multipurpose scope - can apply to inquiries OR options
  target_type: SupportEngineTarget  // 'inquiry' or 'option'
  target_ids: number[]               // IDs of inquiries or options this engine applies to
  
  // Optional: metadata about the voting process
  metadata?: {
    phase?: Phase                    // Current phase if this is the active engine
    started_at?: number
    ended_at?: number
    quorum?: number
    participation_threshold?: number
  }
}

// ============================================================================
// SUPPORT PROCESS & RESULTS
// ============================================================================
export interface SupportResult {
  id: number
  support_process_id: number
  target_type: SupportEngineTarget
  target_id: number        // inquiry_id OR option_id depending on target_type
  option_id?: number       // For option-specific results (if target_type is 'option')
  result: SupportResultData
  updated: number
}



export interface SupportProcess {
  id: number
  support_engine_id: number
  target_type: SupportEngineTarget
  target_id: number
  phase: Phase
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  started_at: number
  ended_at?: number
  results?: SupportResult[]
  metadata?: Record<string, unknown>
}


// ============================================================================
// SUPPORT DATA (User votes/supports)
// ============================================================================

export type SupportFeature =
  | 'binary'
  | 'ternary'
  | 'reaction'
  | 'star'
  | 'score'
  | 'majority_judgment'
  | 'approval'
  | 'ranking'
  | 'trending'
  | 'none'

export type VotingEngine =
  | 'binary_voting'
  | 'ternary_voting'
  | 'star_voting'
  | 'majority_judgment'
  | 'approval_voting'
  | 'score_voting'
  | 'ranked_choice'
  | 'borda_count'
  | 'condorcet'
  | 'nauru'
  | 'schulze'
  | 'copeland'
  | 'quadratic'
  | 'token_weighted'
  | 'phased_voting'

export type SupportValue =
  | number              // score, binary, ternary
  | number[]            // ranking
  | string              // reaction
  | string[]            // multi reaction / approval
  | null

export interface SupportData {
  id?: number
  inquiryId: number
  optionId?: number        // Nullable - can be support for the inquiry itself
  groupId: number
  userId: string
  support_engine_id?: number  // Which engine this support belongs to
  value: SupportValue
  created: number
  metadata?: {
    reaction?: string
    weight?: number
    delegation?: string
    proof?: string          // For cryptographic voting
  }
}

export type SupportInputType = SupportFeature

// ============================================================================
// VOTING CONFIGURATION
// ============================================================================

export interface VotingOptions {
  scale?: {
    min: number
    max: number
    labels?: Record<number, string>
  }
  grades?: {
    values: number[]
    labels: string[]
  }
  reactions?: {
    available: string[]
    maxPerUser?: number
  }
  ranking?: {
    maxChoices: number
    allowTies: boolean
  }
  approval?: {
    maxChoices: number | null
  }
  quadratic?: {
    creditsPerUser: number
    costFunction: 'square' | 'custom'
  }
  tokenWeighted?: {
    tokenType: string
    minBalance: number
    weightFormula: 'linear' | 'sqrt' | 'log'
  }
  phased?: {
    rounds: number
    eliminationRule: 'bottom' | 'threshold'
    threshold?: number
  }
  quorum?: {
    type: 'count' | 'percentage' | 'token'
    value: number
    scope: 'global' | 'group'
  }
}

export interface VotingConfiguration {
  supportFeature: SupportFeature
  votingEngine: VotingEngine | null
  phase: Phase 
  options?: VotingOptions
}


// ============================================================================
// INQUIRY & OPTION TYPES
// ============================================================================

export interface InquiryType {
  id: number
  inquiry_type: string
  family: string
  icon: string
  label: string
  description?: string
  fields: string[]
  allowed_response: string[]
  allowed_transformation: string[]
  allowed_option_type: string[]
  allow_comment: number
  support_feature: string
  created: number
}

export interface InquiryOptionType {
  id: number
  option_type: string
  family: string
  icon: string
  label: string
  description?: string
  fields: string[]
  allowed_response: string[]
  allow_comment: number
  support_feature: string
  statuses: string[]
  use_title: boolean
}

export interface Option {
  id: number
  title: string
  text?: string
  type: string
  targetId?: number
  parentId?: number
  ownedGroup?: string
  configuration?: VotingConfiguration
  status?: string
  family?: string
  miscFields?: Record<string, unknown>
  metadata?: {
    votes?: number
    status?: 'leading' | 'selected' | 'normal'
    support_engine_id?: number  // Active support engine for this option
    [key: string]: unknown
  }
}

// ============================================================================
// FAMILY TYPES
// ============================================================================

export interface OptionFamily {
  id: number
  family_type: string
  label: string
  description?: string
  icon: string
  ui: string[]
  features: string[]
  rules: string[]
  actions: string[]
  sort_order: number
  created: number
}

export interface InquiryFamily {
  id: number
  family_type: string
  label: string
  description?: string
  icon: string
  sort_order: number
  ui: string[]
  features: string[]
  rules: string[]
  actions: string[]
  created: number
}

// ============================================================================
// ENGINE CONFIGURATION HELPERS
// ============================================================================

export interface EngineConfig {
  min_choices?: number
  max_choices?: number | null
  max_rank?: number | null
  min?: number
  max?: number
  grades?: string[]
  allowed_reactions?: string[]
  method?: string
  credits_per_user?: number
  weight_source?: unknown
  normalization?: string
  // Phase-specific configs
  phase_transition?: {
    auto_advance: boolean
    conditions?: Record<string, unknown>
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ButtonMode = 'navigation' | 'actionMenu' | 'native'

export type StatusResults =
  | 'error'
  | 'warning'
  | 'success'
  | 'loading'
  | 'loaded'
  | 'unchanged'
  | ''

export type SignalingType = '' | 'empty' | 'error' | 'valid' | 'invalid' | 'success' | 'checking'

export type UserType =
  | 'email'
  | 'external'
  | 'contact'
  | 'user'
  | 'group'
  | 'admin'
  | 'public'
  | 'circle'
  | 'contactGroup'
  | ''

export type VirtualUserItemType = 'addPublicLink' | 'internalAccess' | 'deleted' | 'anonymous'

export type ISearchType = 0 | 1 | 2 | 4 | 7 | 51 | 99

export type Chunking = {
  size: number
  loaded: number
}

export type ApiEmailAdressList = {
  displayName: string
  emailAddress: string
  combined: string
}

export type AppPermissions = {
  addShares: boolean
  addSharesExternal: boolean
  allAccess: boolean
  changeForeignInquiries: boolean
  deanonymizeInquiry: boolean
  inquiryCreation: boolean
  inquiryDownload: boolean
  publicShares: boolean
  seeMailAddresses: boolean
  unrestrictedOwner: boolean
}

export interface User {
  id: string
  displayName: string
  emailAddress: string
  isAdmin: boolean
  isOfficial: boolean
  isModerator: boolean
  isLegislative: boolean
  isGroupEditor: boolean
  isNoUser: boolean
  location: string | null
  type: UserType
  subName: string | null
  subtitle: string | null
  desc: string | null
  organisation: string | null
  languageCode: string
  languageCodeIntl: string
  localeCode: string | null
  localeCodeIntl: string | null
  timeZone: string | null
  groups: string[] | null
  categories: string[] | null
}

export interface Participant {
  inquiryId: number
  user: User
}

export enum Event {
  TransitionsOff = 'agora:transitions:off',
  TransitionsOn = 'agora:transitions:on',
  UpdateInquiry = 'agora:inquiry:update',
  LoadInquiry = 'agora:inquiry:load',
  SidebarChangeTab = 'agora:sidebar:changeTab',
  SidebarToggle = 'agora:sidebar:toggle',
  ChangeShares = 'agora:change:shares',
  UpdateOptions = 'agora:options:update',
  AddDate = 'agora:options:add-date',
  UpdateComments = 'agora:comments:update',
  UpdateSupports = 'agora:supports:update',
  UpdateActivity = 'agora:activity:update',
  ShowSettings = 'agora:settings:show',
}

export interface BaseEntry {
  id: number
  name: string
  parentId?: number
}

export function createDefault<T>(): T {
  return {} as T
}

// Type guards
export function isValidSupportFeature(feature: string): feature is SupportFeature {
  return ['binary', 'ternary', 'reaction', 'star', 'score', 'majority_judgment', 'approval', 'ranking', 'trending', 'none'].includes(feature)
}

export function isValidPhase(phase: string): phase is Phase {
  return ['deliberative', 'voting', 'hybrid', 'filtration', 'progressive', 'liquid'].includes(phase)
}
