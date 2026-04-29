/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// ============================================================================
// ============================================================================

// Re-export voting types for backward compatibility
export type {
  BinaryResult,
  TernaryResult,
  ScoreResult,
  RankingResult,
  CondorcetResult,
  MajorityJudgmentResult,
  ReactionResult,
  ApprovalResult,
  TrendingResult,
  SupportResultData,
  SupportFeature,
  VotingEngine,
  Phase,
  VotingConfiguration,
  VotingOptions,
  SupportData,
  SupportValue,
} from './votingType'

export {
  ENGINE_DEFINITIONS,
  getAvailableEngines,
  initializeEngineConfig,
  isValidSupportFeature,
  isValidPhase,
} from './votingType'


// ============================================================================
// SUPPORT ENGINE - Core Structure (Multipurpose)
// ============================================================================

export type SupportResultType = SupportResultData['type']

export type SupportEngineTarget = 'inquiry' | 'option'

export interface SupportEngine {
  id: number
  engine: string           // The voting engine type (binary, score, ranking, etc.)
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
    support_engine_id?: number
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
// UTILITY TYPES
// ============================================================================

export type ButtonMode = 'navigation' | 'actionMenu' | 'native'

export type StatusResults =
  | 'error' | 'warning' | 'success' | 'loading' | 'loaded' | 'unchanged' | ''

export type SignalingType = '' | 'empty' | 'error' | 'valid' | 'invalid' | 'success' | 'checking'

export type UserType =
  | 'email' | 'external' | 'contact' | 'user' | 'group'
  | 'admin' | 'public' | 'circle' | 'contactGroup' | ''

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
