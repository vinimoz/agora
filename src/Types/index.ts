/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export { Activity, Activities } from '../stores/activity.ts'
export { UpdateType, Group, AppSettings } from '../stores/appSettings.ts'
export { Combo } from '../stores/combo.ts'
export { Comment, Comments, CommentsGrouped } from '../stores/comments.ts'
export { Support, Supports, SupportsGrouped } from '../stores/supports.ts'

export interface BaseEntry {
  id: number
  name: string
  parentId?: number
}

export {
  Inquiry,
  AccessType,
  ShowResults,
  AllowSuggestions,
  InquiryConfiguration,
  InquiryStatus,
  InquiryPermissions,
  CurrentUserStatus,
} from '../stores/inquiry.ts'

export {
  ModeratorRights,
  OfficialRights,
  Category,
  Location,
  ModerationStatus,
} from '../stores/appSettings.ts'

export { SortType, FilterType, InquiryCategory, Meta, InquiryList } from '../stores/inquiries.ts'

export { Option, OptionInquiries, Sequence, SimpleOption, Options } from '../stores/options.ts'

export { Share, Shares, ShareType } from '../stores/shares.ts'
export { Route, UserStatus, Session } from '../stores/session.ts'

export {
  UserPreferences,
  SessionSettings,
  Calendar,
  Preferences,
  ViewMode,
} from '../stores/preferences.ts'

export {
  DateTimeUnit,
  DateTimeUnitType,
  TimeUnitsType,
  DurationType,
} from '../constants/dateUnits.ts'

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

/**
 * Type of search that can be used in the search bar.
 * 0 = User, 1 = Group, 2 = UserGroup, 4 = Email, 7 = Circle, 51 = Contact, 99 = All
 */
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
  comboView: boolean
  deanonymizeInquiry: boolean
  inquiryCreation: boolean
  inquiryDownload: boolean
  publicShares: boolean
  seeMailAddresses: boolean
  unrestrictedOwner: boolean
}

export type User = {
  id: string
  displayName: string
  emailAddress: string
  isAdmin: boolean
  isOfficial: boolean
  isModerator: boolean
  isNoUser: boolean
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
  categories: string[] | null
}

export type Participant = {
  inquiryId: number
  user: User
}

/**
 *
 */
export function createDefault<T>(): T {
  return {} as T
}
