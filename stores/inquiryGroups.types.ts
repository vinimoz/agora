/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '../Types/index.ts'
import {
  SupportResult,
  SupportEngine,
} from '../Types/index.ts'

// ===== SHARED TYPES =====
export type VisibilityType = 'private' | 'groups' | 'participants' | 'everyone'
export type PublicationStatus = 'draft' | 'pending' | 'published' | 'archived' | 'deleted'
export type InquiryGroupWorkflowStatus = 'draft' | 'active' | 'closed' | 'archived'

// ===== DISPLAY ZONE =====
export interface DisplayZone {
  content: string
  scope?: Record<string, unknown>
  display?: {
    type: string
    tool?: string
    [key: string]: unknown
  }
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
  ui: string[] | Record<string, any>
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

// ============================================================
// UI Configuration for Inquiry Group
// ============================================================
export interface InquiryGroupUIConfig {
  /** Display architecture for the group experience */
  display_architecture?: Record<string, DisplayZone>
  /** Layout configuration */
  layout?: {
    type: 'grid' | 'flex' | 'sidebar' | 'split' | 'full'
    columns?: number
    rows?: number
    responsive?: boolean
  }
  /** Enabled features */
  features?: string[]
  /** Experience mode */
  experience?: string
  /** Default experience mode */
  default_experience?: 'dashboard' | 'social' | 'marketplace' | 'kanban' | 'timeline' | 'wiki' | 'decision_room'
  /** Context configuration */
  context?: {
    type?: string
    selection?: string
    [key: string]: unknown
  }
  /** Theme or styling overrides */
  styles?: {
    primaryColor?: string
    accentColor?: string
    borderRadius?: string
  }
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
  // UI config specific to this group instance (overrides template)
  ui?: InquiryGroupUIConfig
  participation?: {
    type: 'everyone' | 'users' | 'groups'
    groups: string[]
    users: string[]
  }
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

// ===== TEMPLATE-DERIVED FIELDS =====
export interface InquiryGroupTemplateData {
  family: string
  icon: string
  label: string
  allowedInquiryTypes: string[]
  isRoot: boolean
  actions: Array<{ key: string; label: string; icon?: string }>
  rules: Record<string, any>
  allowedResponse: string[]
  fields: Array<{
    key: string
    label: string
    type: string
    required?: boolean
    default?: any
    allowed_values?: any[]
    rules?: any[]
  }>
  templateDescription: string
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
  publicationStatus: PublicationStatus
  configuration: InquiryGroupConfiguration
  // Instance-specific UI overrides
  ui?: InquiryGroupUIConfig
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
  // Template-derived fields (from session store)
  templateData?: InquiryGroupTemplateData
  // Direct access to common template fields for convenience
  family?: string
  icon?: string
  label?: string
}
