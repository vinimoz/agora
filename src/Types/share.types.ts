/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './user.types'

export type ShareType =
  | 'email'
  | 'external'
  | 'contact'
  | 'user'
  | 'group'
  | 'admin'
  | 'public'
  | 'circle'
  | 'contactGroup'


export const PARTICIPATION = {
  NONE: 0,
  VOTE: 1,
  COMMENT: 2,
  BOTH: 3,
} as const

export type PublicInquiryEmailConditions = 'mandatory' | 'optional' | 'disabled'

export type SharePurpose = 'inquiry' | 'inquiryGroup'

export type ShareParticipationLevel = 0 | 1 | 2 | 3

export type Share = {
  displayName: string
  id: string
  invitationSent: boolean
  locked: boolean
  inquiryId: number | null
  groupId: number | null
  token: string
  type: ShareType
  emailAddress: string
  userId: string
  publicInquiryEmail: PublicInquiryEmailConditions
  user: User
  reminderSent: boolean
  participationLevel: ShareParticipationLevel
  canVote: boolean
  canComment: boolean
  canParticipate: boolean
  label: string
  URL: string
  supported: boolean
  deleted: boolean
}

export type Shares = { shares: Share[] }
