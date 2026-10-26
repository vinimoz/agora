/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { VisibilityType } from './inquiry.types.ts'

export type ParticipationPolicyType =
  | 'none'
  | 'everyone'
  | 'users'
  | 'groups'
  | 'lottery'

export type ParticipationTargetType =
  | 'inquiry'
  | 'option'
  | 'inquiry_group'
  | 'engine'

export type LotteryMode    = 'users' | 'groups'

export type LotteryMethod  = 'random' | 'weighted' | 'stratified'

export type ParticipationPolicyType =
  | 'none' | 'everyone' | 'users' | 'groups' | 'lottery'

export type ParticipationTargetType =
  | 'inquiry' | 'option' | 'inquiry_group' | 'engine'


export const ALLOWED_PARTICIPATION: Record<VisibilityType, ParticipationPolicyType[]> = {
  private:      ['none'],
  groups:       ['groups'],
  users:        ['users'],
  participants: ['none', 'users', 'groups', 'lottery'],
  everyone:     ['none', 'everyone', 'groups', 'users', 'lottery'],
}

export interface ParticipationPolicy {
  id: number
  targetType: ParticipationTargetType
  targetId: number
  policyType: ParticipationPolicyType
  policyConfig: {
    mode?: LotteryMode
    count?: number
    seed?: string | number   
    method?: LotteryMethod
    [key: string]: unknown
  }
  createdAt: number
  updatedAt: number
  createdBy: string | null
}
