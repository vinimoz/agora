/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '../Types/index.ts'

export type InquiryGroupType = {
  id: number | string
  group_type: string 
  label: string
  family: string
  icon?: string
  description?: string
  allowed_inquiry_types?: string | string[]
  allowed_response?: string | string[]
  ui: string[]
  features: string[]
  rules: string[]
  actions: string[]
  is_root: boolean
  sort_order: number
  fields?: string | string[]
}

export type InquiryGroup = {
  id: number
  cover_id: number | null
  type: string // 
  parent_id: number | null
  created: number
  deleted: number
  description: string | null
  owned_group: string | null
  metadata: string | null
  group_status: string
  protected: number | boolean
  owner: User
  title: string 
  titleExt: string | null 
  inquiryIds: number[]
  allowEdit: boolean
  expire: number | null 
}
