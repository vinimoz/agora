/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User, UserType } from './user.types'
import type { SupportResult } from './support.types'
import type { Chunking, StatusResults } from './inquiry.types'

// ============================================================================
// OPTION STATUS
// ============================================================================

export type OptionStatus = 'draft' | 'published' | 'archived' | 'deleted'

export type OptionConfiguration = {
  visibility: 'private' | 'everyone' | 'groups' | 'participants'
  showResults: string
  allowComment: number | null
  supportFeature: string
  family: string
  expire?: number
}

export type OptionCurrentStatus = {
  created: number
  updated: number
  isArchived: boolean
  isDeleted: boolean
  isExpired: boolean
  countParticipants: number
  countComments: number
  countSupports: number
  trendingScore: number
  optionStatus: string
  supportResult: SupportResult | null
  publicationStatus: 'draft' | 'pending' | 'published' | 'archived' | 'deleted'
}

export type CurrentUserOptionStatus = {
  isInvolved: boolean
  hasSupported: boolean
  supportValue: string | null
  supportResult: SupportResult | null
  isLoggedIn: boolean
  isOwner: boolean
  shareToken: string
  userId: string
  userRole: UserType
}

export type OptionPermissions = {
  view: boolean
  edit: boolean
  delete: boolean
  archive: boolean
  support: boolean
  comment: boolean
  addShares: boolean
  addSharesExternal: boolean
  changeForeignSupports: boolean
  changeOwner: boolean
  reorderOptions: boolean
  seeResults: boolean
  seeUsernames: boolean
  subscribe: boolean
  takeOver: boolean
  addOption: boolean
  confirmOption: boolean
}

// ============================================================================
// OPTION
// ============================================================================

export type Option = {
  id: number
  targetId: number
  parentId: number
  type: string
  family: string
  title: string
  text: string
  textSafe: string
  sortOrder: number
  configuration: OptionConfiguration
  miscFields: Record<string, { key: string; value: string }>
  ownedGroup: string
  owner: User
  currentUserStatus: CurrentUserOptionStatus
  permissions: OptionPermissions
  status: OptionCurrentStatus
  childs: Option[]
  meta: {
    chunking: Chunking
    status: StatusResults
  }
  inquiryInfo: {
    targetId: number
    inquiryTitle: string
    inquiryType: string
    inquiryAccess: string
  }
  _typeInfo?: InquiryOptionType
  _familyInfo?: {
    name: string
    color: string
    icon: string
    description: string
  }
}

// ============================================================================
// OPTION GROUPS (used by the options store)
// ============================================================================

export type OptionGroup = {
  id: number
  name: string
  description: string
  family: string
  color: string
  icon: string
  options: Option[]
}

export type OptionsByFamily = {
  [key: string]: OptionGroup[]
}

export type OptionsState = {
  options: Option[]
  families: OptionFamily[]
  groups: OptionGroup[]
  optionsByFamily: OptionsByFamily
  loading: boolean
  error: string | null
  lastUpdated: number
}

// ============================================================================
// OPTION TYPE / FAMILY
// ============================================================================

// Types/option.types.ts — replace InquiryOptionType
export interface InquiryOptionType {
  // Backend fields
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
  defaultStatus?: string
  features?: string[]

  // Client-side aliases written by stores & helpers
  key?: string
  name?: string
  color?: string
  sortOrder?: number
  text?: string
  optionType?: string
}

export interface FamilyFeatures {
  create_option_button?: boolean
  real_time_results?: boolean
  ranking?: boolean
  tie_breaking?: boolean
  quorum_tracking?: boolean
  [key: string]: unknown
}

// Types/option.types.ts — replace the whole OptionFamily interface
export interface OptionFamily {
  // Backend-only fields (present on server objects, absent on client-built ones)
  id?: number
  family_type?: string
  sort_order?: number
  created?: number

  // Present on both
  label: string
  description?: string
  icon?: string
  ui?: string[] | Record<string, unknown>
  features?: FamilyFeatures | string[]
  rules?: string[]
  actions?: string[] | Array<{ key: string; label: string; icon?: string }>

  // Client-side aliases (already there)
  key?: string
  name?: string
  color?: string
  sortOrder?: number
  types?: InquiryOptionType[]
}

export interface OptionFamilyEvent {
  optionId: number
  familyKey: 'vote' | 'kanban' | 'timeline'
  action: 'added' | 'removed'
}
