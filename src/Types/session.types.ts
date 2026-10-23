/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { WatcherMode, WatcherStatus } from '../composables/useInquiryWatcher.types'
import type { User } from '../Types/index.ts'
import type { ViewMode } from '../Types/inquiry.types'
import type { Share } from './share.types'
import type { TimeZoneTypes } from '@/Types/dateTime'

interface RouteParams {
  id: number
  token: string
  type: FilterType
  slug: string
}

export type Route = {
  currentRoute: string
  name: RouteRecordNameGeneric
  path: string
  params: RouteParams
}

export type UserStatus = {
  isLoggedin: boolean
  isAdmin: boolean
  isModerator: boolean
  isOfficial: boolean
  isGroupEditor: boolean
}

export type SessionSettings = {
  viewModeForced: null | ViewMode
  timezoneName: TimeZoneTypes | string
}

export type Watcher = {
  id: string
  mode: WatcherMode
  status: WatcherStatus
  interval?: number
  lastUpdate: number
  lastMessage?: string
}

export type AppPermissions = {
  addShares: boolean
  addSharesExternal: boolean
  changeForeignVotes: boolean
  publicShares: boolean
  seeMailAddresses: boolean
  unrestrictedOwner: boolean
}

type AppSettings = {
  finalImprintUrl: string
  finalPrivacyUrl: string
  useLogin: boolean
  useActivity: boolean
  updateType: WatcherMode
  currentVersion: string
}

export type Session = {
  appPermissions: AppPermissions
  appSettings: AppSettings
  currentUser: User
  sessionSettings: SessionSettings
  share: Share
  token: string | null
  userStatus: UserStatus
  watcher: Watcher
}

export type SessionStore = Session & {
  navigationStatus: 'idle' | 'loading'
}
