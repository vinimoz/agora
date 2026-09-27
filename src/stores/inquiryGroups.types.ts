/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '../Types/index.ts'
import {
  SupportResult,
  SupportEngine,
} from '../Types/index.ts'

// Import unified types from experience.types.ts
import type {
  DisplayZone,
  ExperienceArchitecture,
  ExperienceKey,
  DisplayType,
  ToolKey,
} from './experience.types'

// Re-export for convenience
export type { DisplayZone, ExperienceKey, DisplayType, ToolKey }

// ===== SHARED TYPES =====
export type VisibilityType = 'private' | 'groups' | 'users' | 'everyone'
export type PublicationStatus = 'draft' | 'pending' | 'published' | 'archived' | 'deleted'
export type InquiryGroupWorkflowStatus = 'active' | 'completed' | 'suspended' | 'canceled' 

// ============================================================
// INQUIRY GROUP UI CONFIGURATION
// ============================================================

/**
 * UI configuration for a group instance.
 * Extends the base ExperienceArchitecture and adds group‑specific overrides.
 */
export interface InquiryGroupUIConfig {
  /** Active experience key */
  experience?: ExperienceKey
  /** Default experience (if different from active) */
  defaultExperience?: ExperienceKey
  /** Default display mode for this experience */
  defaultDisplay?: DisplayType
  /** Layout configuration */
  layout?: {
    type: 'grid' | 'flex' | 'sidebar' | 'split' | 'full'
    columns?: number
    rows?: number
    responsive?: boolean
  }
  /** Map of zone names to DisplayZone (camelCase) */
  displayArchitecture?: Record<string, DisplayZone>
  /** Enabled features */
  features?: string[]
  /** Context definition */
  context?: { type: 'group' | 'inquiry'; selection: 'selected' | 'current' | 'all' }
  /** Theme or styling overrides */
  styles?: {
    primaryColor?: string
    accentColor?: string
    borderRadius?: string
  }
  [key: string]: unknown
}

//  ============= PERMISSION ==========
export type InquiryGroupPermissions = {
  view: boolean
  edit: boolean
  delete: boolean
  addInquiries: boolean
  reorderInquiries: boolean
  changeOwner: boolean
  archive: boolean
  clone: boolean
}

// ===== CONFIGURATION =====
export interface InquiryGroupConfiguration {
  visibility: VisibilityType
  visibilityGroups: string[]
  visibilityUsers: string[]
  expire: number | null
  supportEngine: SupportEngine[]
  description: string
  protected: boolean
  titleExt: string | null
  ui: InquiryGroupUIConfig
}

// ===== STATUS =====
export interface InquiryGroupStatus {
  groupStatus: InquiryGroupWorkflowStatus
  publicationStatus: PublicationStatus
  created: number
  deleted: number
  updated: number
  supportResult: SupportResult[] 
}

// ===== INQUIRY GROUP TYPE =====
export interface InquiryGroupType {
  id: number | string
  type: string
  group_type?: string // Backward compatibility
  label: string
  family: string
  icon?: string
  description?: string
  allowed_inquiry_types?: string | string[]
  allowed_response?: string | string[]
  ui: string[] | InquiryGroupUIConfig
  features?: string[]
  rules?: Record<string, any>
  actions?: Array<{ key: string; label: string; icon?: string }>
  is_root: boolean
  sort_order: number
  fields?: Array<{
    key: string
    label: string
    type: string
    required?: boolean
    default?: any
    allowed_values?: any[]
    rules?: any[]
  }>
  created?: number | string
}

// ===== INQUIRY GROUP =====
export interface InquiryGroup {
  id: number
  parentId: number | null
  created: number
  deleted: number
  updated?: number
  description: string | null
  owner: User
  type: string
  trendingScore?: number
  publicationStatus?: PublicationStatus
  configuration: InquiryGroupConfiguration
  status: InquiryGroupStatus
  title: string
  titleExt: string | null
  ownedGroup: string | null
  order: number
  expire: number | null
  metadata: string | null
  coverId: number | null
  protected: boolean
  allowEdit: boolean
  inquiryIds: number[]
  childs: number[]
  slug: string
  miscFields: Record<string, string>
  inquiryGroupType?: InquiryGroupType
  permissions?: InquiryGroupPermissions
}
export type { InquiryGroupPermissions }
