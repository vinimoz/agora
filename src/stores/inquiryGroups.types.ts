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
export type InquiryGroupWorkflowStatus = 'draft' | 'active' | 'closed' | 'archived'

// ============================================================
// INQUIRY GROUP UI CONFIGURATION
// ============================================================

/**
 * UI configuration for a group instance.
 * Extends the base ExperienceArchitecture and adds group‑specific overrides.
 */
export interface InquiryGroupUIConfig extends Partial<ExperienceArchitecture> {
  /** Theme or styling overrides */
  styles?: {
    primaryColor?: string
    accentColor?: string
    borderRadius?: string
  }
  // Additional custom fields can be added here
  [key: string]: unknown
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
  ui?: InquiryGroupUIConfig
}

// ===== STATUS =====
export interface InquiryGroupStatus {
  groupStatus: InquiryGroupWorkflowStatus
  publicationStatus: PublicationStatus
  created: number
  deleted: number
  updated?: number
  supportResult: SupportResult[] | null
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
  description: string | null
  owner: User
  type: string
  groupStatus: InquiryGroupWorkflowStatus
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
}
