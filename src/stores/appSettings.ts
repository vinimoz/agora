/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { t } from '@nextcloud/l10n'
import { AppSettingsAPI } from '../Api/index.ts'
import { Logger } from '../helpers/index.ts'
import {
  BaseEntry,
  InquiryType,
  InquiryOptionType,
  InquiryFamily,
  OptionFamily,
} from '../Types/index.ts'
import { AxiosError } from '@nextcloud/axios'
import type { InquiryGroupType } from './inquiryGroups.types'

import type { InquiryTypeRights, ModeratorRights, OfficialRights } from '../utils/permissions.ts'
import { DefaultModeratorRights, DefaultOfficialRights } from '../utils/permissions.ts'

export type UpdateType = 'noInquirying' | 'periodicInquirying' | 'longInquirying'


export interface HeroActionConfig {
  key: string
  label: string
  icon: string
  color: string
  hint?: string
}

export interface HomeConfig {
  sections: string[]
  hero: {
    title?: string
    subtitle?: string
    actions: HeroActionConfig[]
  }
  services: Array<{ key: string; label: string; icon: string }>
  relevance: {
    tiers: Array<{ key: string; label: string }>
    weights: Record<string, number>
  }
}

export interface NavigationConfig {
  [key: string]: unknown
}

export type Group = {
  id: string
  userId: string
  displayName: string
  emailAddress: string
  type: string
}

// Simple interfaces for category and location tables
export interface Category {
  id: number
  name: string
  parentId: number | null
}

export interface Location {
  id: number
  name: string
  parentId: number | null
}

export interface InquiryStatus {
  id: number
  inquiryType: string
  statusKey: string
  label: string
  description?: string
  isFinal: boolean
  icon: string
  order?: number
}

export type AppSettings = {
  allAccessGroups: string[]
  allowPublicShares: boolean
  allowAllAccess: boolean
  allowInquiryCreation: boolean
  allowInquiryDownload: boolean
  autoExpire: boolean
  autoExpireOffset: number
  autoArchive: boolean
  autoArchiveOffset: number
  autoDelete: boolean
  autoDeleteOffset: number
  defaultPrivacyUrl: string
  defaultImprintUrl: string
  disclaimer: string
  imprintUrl: string
  legalTermsInEmail: boolean
  privacyUrl: string
  showMailAddresses: boolean
  showLogin: boolean
  unrestrictedOwner: boolean
  updateType: UpdateType
  useActivity: boolean
  useCollaboration: boolean
  useModeration: boolean
  officialBypassModeration: boolean
  useSiteLegalTerms: boolean
  navigationInquiriesInList: boolean
  finalPrivacyUrl: string
  finalImprintUrl: string
  publicSharesGroups: string[]
  inquiryCreationGroups: string[]
  inquiryDownloadGroups: string[]
  showMailAddressesGroups: string[]
  unrestrictedOwnerGroups: string[]
  home?: HomeConfig
  navigation?: NavigationConfig  	
  categoryTab: Category[]
  locationTab: Location[]
  inquiryStatusTab: InquiryStatus[]
  inquiryTypeTab: InquiryType[]
  inquiryOptionTypeTab: InquiryOptionType[]
  inquiryGroupTypeTab: InquiryGroupType[]
  inquiryFamilyTab: InquiryFamily[]
  optionFamilyTab: OptionFamily[]
  groups: Group[]
  inquiryTypeRights: Record<string, InquiryTypeRights>
  moderatorRights: ModeratorRights
  officialRights: OfficialRights
  status: {
    loadingGroups: boolean
  }
}

export const useAppSettingsStore = defineStore('appSettings', {
  state: (): AppSettings => ({
    allAccessGroups: [],
    allowPublicShares: true,
    allowAllAccess: true,
    allowInquiryCreation: true,
    allowInquiryDownload: true,
    autoArchive: false,
    autoExpire: false,
    autoDelete: false,
    autoArchiveOffset: 30,
    autoExpireOffset: 180,
    autoDeleteOffset: 30,
    defaultPrivacyUrl: '',
    defaultImprintUrl: '',
    disclaimer: '',
    imprintUrl: '',
    legalTermsInEmail: false,
    privacyUrl: '',
    showMailAddresses: false,
    showLogin: true,
    unrestrictedOwner: false,
    updateType: 'noInquirying',
    useActivity: false,
    useCollaboration: true,
    useModeration: true,
    officialBypassModeration: true,
    useSiteLegalTerms: true,
    navigationInquiriesInList: true,
    finalPrivacyUrl: '',
    finalImprintUrl: '',
    publicSharesGroups: [],
    inquiryCreationGroups: [],
    inquiryDownloadGroups: [],
    showMailAddressesGroups: [],
    unrestrictedOwnerGroups: [],
    categoryTab: [],
    inquiryTypeTab: [],
    inquiryOptionTypeTab: [],
    inquiryGroupTypeTab: [],
    inquiryFamilyTab: [],
    optionFamilyTab: [],
    locationTab: [],
    inquiryStatusTab: [],
    groups: [],
    inquiryTypeRights: {} as Record<string, InquiryTypeRights>,
    moderatorRights: { ...DefaultModeratorRights } as ModeratorRights,
    officialRights: { ...DefaultOfficialRights } as OfficialRights,
    status: {
      loadingGroups: false,
    },
  }),

  getters: {
	  getFirstStatusKeyByInquiryType(inquiryType: string): string | null {
		  if (!this.inquiryStatusTab.length) {
			  console.warn('[SettingsStore] No statuses available')
			  return null
		  }
		  const statuses = this.inquiryStatusTab
		  .filter(s => s.inquiryType === inquiryType)
		  .sort((a, b) => (a.order || 0) - (b.order || 0))
		  return statuses[0]?.statusKey ?? null
	  },

	  getInquiryTypeRights: (state) => (inquiryType: string) => state.inquiryTypeRights[inquiryType],

		  getMainInquiryTypes: (state) => state.inquiryTypeTab,

		  getMainInquiryOptionTypes: (state) => state.inquiryOptionTypeTab,

		  getMainInquiryGroupTypes: (state) => state.inquiryGroupTypeTab,

		  optionTypeTab: (state) => state.inquiryOptionTypeTab,  


  },

	  actions: {
		  getFirstStatusKeyByInquiryType(inquiryType: string): string | null {
			  if (!this.inquiryStatusTab.length) {
				  console.warn('[SettingsStore] No statuses available')
			  }

			  const statuses = this.inquiryStatusTab.filter((status) => status.inquiryType === inquiryType)

			  if (statuses.length > 0) {
				  const sortedStatuses = [...statuses].sort((a, b) => a.sort_order - b.sort_order)

				  const firstStatus = sortedStatuses[0]
				  return firstStatus.statusKey
			  }

			  return null
		  },

		  initializeInquiryTypeRights(inquiryType: string) {
			  if (!this.inquiryTypeRights[inquiryType]) {
				  this.inquiryTypeRights[inquiryType] = {
					  canEdit: false,
					  canDelete: false,
					  canCreate: false,
				  }
			  }
		  },

		  async load(): Promise<void> {
			  try {
				  const response = await AppSettingsAPI.getAppSettings()
				  // Initialize inquiryStatusTab with defaults if empty
				  const settings = response.data.appSettings

				  this.$patch(settings)
				  return settings
			  } catch (error) {
				  Logger.error('Error getting appSettings', { error })
			  }
		  },

		  async write(): Promise<void> {
			  try {
				  const response = await AppSettingsAPI.writeAppSettings(this.$state)
				  this.$patch(response.data.appSettings)
			  } catch (error) {
				  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					  return
				  }
				  Logger.error('Error writing appSettings', {
					  error,
					  appSettings: this.$state,
				  })
				  throw error
			  }
		  },

		  loadGroups(query: string): void {
			  const debouncedLoad = this.$debounce(async () => {
				  this.status.loadingGroups = true

				  try {
					  const response = await AppSettingsAPI.getGroups(query)
					  this.groups = response.data.groups
					  this.status.loadingGroups = false
				  } catch (error) {
					  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
						  return
					  }
					  Logger.error('Error getting groups', { error })
					  this.status.loadingGroups = false
				  }
			  }, 500)

			  debouncedLoad()
		  },
		  // STORE FOR MODERATION STATUS

		  // Get statuses for a specific inquiry type
		  getStatusesForInquiryType(inquiryType: string): InquiryStatus[] {
			  return this.inquiryStatusTab
			  .filter((status) => status.inquiryType === inquiryType)
			  .sort((a, b) => (a.order || 0) - (b.order || 0))
		  },

		  // Get specific status details by key
		  getStatusByKey(inquiryType: string, statusKey: string): InquiryStatus | undefined {
			  return this.inquiryStatusTab.find(
				  (status) => status.inquiryType === inquiryType && status.statusKey === statusKey
			  )
		  },

		  // Add a new status for an inquiry type
		  async addStatusForInquiryType(
			  inquiryType: string,
			  status: Omit<InquiryStatus, 'inquiryType' | 'order'>
		  ): Promise<void> {
			  const existingStatuses = this.getStatusesForInquiryType(inquiryType)
			  const newOrder = existingStatuses.length
			  const newStatus = {
				  inquiryType,
				  ...status,
				  order: newOrder,
			  }

			  try {
				  const response = await AppSettingsAPI.addInquiryStatus(newStatus)
				  if (response.data.inquiryStatus) {
					  this.inquiryStatusTab.push(response.data.inquiryStatus)
				  } else {
					  this.inquiryStatusTab.push(newStatus)
				  }
			  } catch (error) {
				  Logger.error('Error adding inquiry status', { error })
				  this.inquiryStatusTab.push(newStatus)
			  }
		  },

		  // Update a status for an inquiry type
		  async updateStatusForInquiryType(
			  inquiryType: string,
			  statusId: string,
			  updates: Partial<InquiryStatus>
		  ): Promise<void> {
			  const index = this.inquiryStatusTab.findIndex(
				  (s) => s.inquiryType === inquiryType && s.id === statusId
			  )

			  if (index === -1) {
				  return
			  }
			  const originalStatus = { ...this.inquiryStatusTab[index] }
			  this.inquiryStatusTab[index] = {
				  ...this.inquiryStatusTab[index],
				  ...updates,
			  }

			  try {
				  await AppSettingsAPI.updateInquiryStatus(statusId, {
					  ...originalStatus,
					  ...updates,
				  })
			  } catch (error) {
				  Logger.error('Error updating inquiry status', { error })
				  this.inquiryStatusTab[index] = originalStatus
			  }
		  },

		  // Delete a status for an inquiry type
		  async deleteStatusForInquiryType(inquiryType: string, statusId: string): Promise<void> {
			  const backupIndex = this.inquiryStatusTab.findIndex(
				  s => s.inquiryType === inquiryType && String(s.id) === String(statusId)
			  )
			  if (backupIndex === -1) return
				  const backupStatus = { ...this.inquiryStatusTab[backupIndex] }

			  this.inquiryStatusTab = this.inquiryStatusTab.filter(
				  s => !(s.inquiryType === inquiryType && String(s.id) === String(statusId))
			  )
			  this.reorderStatuses(inquiryType)

			  try {
				  await AppSettingsAPI.deleteInquiryStatus(statusId)
			  } catch (error) {
				  Logger.error('Error deleting inquiry status', { error })
				  this.inquiryStatusTab.splice(backupIndex, 0, backupStatus)
				  this.reorderStatuses(inquiryType)
			  }
		  },

		  // Reorder statuses for an inquiry type
		  reorderStatuses(inquiryType: string): void {
			  const statuses = this.getStatusesForInquiryType(inquiryType)
			  statuses.forEach((status, index) => {
				  const globalIndex = this.inquiryStatusTab.findIndex(
					  s => s.inquiryType === inquiryType && s.id === status.id
				  )
				  if (globalIndex !== -1) this.inquiryStatusTab[globalIndex].order = index
			  })
		  },

		  // Move status up in order
		  moveStatusUp(inquiryType: string, statusId: string): void {
			  const statuses = this.getStatusesForInquiryType(inquiryType)
			  const i = statuses.findIndex(s => String(s.id) === String(statusId))
			  if (i <= 0) return
				  const prev = statuses[i - 1], cur = statuses[i]
			  const pgi = this.inquiryStatusTab.findIndex(s => s.inquiryType === inquiryType && s.id === prev.id)
			  const cgi = this.inquiryStatusTab.findIndex(s => s.inquiryType === inquiryType && s.id === cur.id)
			  if (pgi === -1 || cgi === -1) return
				  const tmp = this.inquiryStatusTab[cgi].order
			  this.inquiryStatusTab[cgi].order = this.inquiryStatusTab[pgi].order
			  this.inquiryStatusTab[pgi].order = tmp
			  this.reorderStatuses(inquiryType)
		  },

		  moveStatusDown(inquiryType: string, statusId: string): void {
			  const statuses = this.getStatusesForInquiryType(inquiryType)
			  const i = statuses.findIndex(s => String(s.id) === String(statusId))
			  if (i === -1 || i >= statuses.length - 1) return
				  const next = statuses[i + 1], cur = statuses[i]
			  const ngi = this.inquiryStatusTab.findIndex(s => s.inquiryType === inquiryType && s.id === next.id)
			  const cgi = this.inquiryStatusTab.findIndex(s => s.inquiryType === inquiryType && s.id === cur.id)
			  if (ngi === -1 || cgi === -1) return
				  const tmp = this.inquiryStatusTab[cgi].order
			  this.inquiryStatusTab[cgi].order = this.inquiryStatusTab[ngi].order
			  this.inquiryStatusTab[ngi].order = tmp
			  this.reorderStatuses(inquiryType)
		  },

		  // STORE FOR CATEGORY AND LOCATION MANAGEMENT
		  async addCategory(name: string, parentId: number = 0): Promise<void> {
			  const maxId = this.categoryTab.length > 0 ? Math.max(...this.categoryTab.map((c) => c.id)) : 0
			  const newId = maxId + 1

			  try {
				  await AppSettingsAPI.addCategory({
					  name,
					  parentId,
				  })

				  this.categoryTab.push({
					  id: newId,
					  name,
					  parentId,
				  })
			  } catch (error) {
				  Logger.error('Error getting appSettings', { error })
			  }
		  },

		  async updateCategory(id: number, name: string, parentId: number): Promise<void> {
			  const category = this.categoryTab.find((c) => c.id === id)
			  try {
				  await AppSettingsAPI.updateCategory(id, name, parentId)

				  if (category) {
					  category.name = name
					  category.parentId = parentId
				  }
			  } catch (error) {
				  Logger.error('Error getting appSettings', { error })
			  }
		  },

		  async deleteCategory(id: number): Promise<void> {
			  const deleteRecursive = (categoryId: number) => {
				  const children = this.categoryTab.filter((c) => c.parentId === categoryId)

				  children.forEach((child) => {
					  deleteRecursive(child.id)
				  })

				  this.categoryTab = this.categoryTab.filter((c) => c.id !== categoryId)
			  }
			  try {
				  await AppSettingsAPI.deleteCategory(id)
				  deleteRecursive(id)
			  } catch (error) {
				  Logger.error('Error deleting category', { error })
			  }
		  },

		  async addLocation(name: string, parentId: number = 0): Promise<void> {
			  const maxId = this.locationTab.length > 0 ? Math.max(...this.locationTab.map((l) => l.id)) : 0
			  const newId = maxId + 1

			  try {
				  await AppSettingsAPI.addLocation({
					  name,
					  parentId,
				  })

				  this.locationTab.push({
					  id: newId,
					  name,
					  parentId,
				  })
			  } catch (error) {
				  Logger.error('Error getting appSettings', { error })
			  }
		  },

		  async updateLocation(id: number, name: string, parentId: number): Promise<void> {
			  const location = this.locationTab.find((l) => l.id === id)
			  try {
				  await AppSettingsAPI.updateLocation(id, name, parentId)

				  if (location) {
					  location.name = name
					  location.parentId = parentId
				  }
			  } catch (error) {
				  Logger.error('Error getting appSettings', { error })
			  }
		  },

		  async deleteLocation(id: number): Promise<void> {
			  const deleteRecursive = (locationId: number) => {
				  const children = this.locationTab.filter((l) => l.parentId === locationId)

				  children.forEach((child) => {
					  deleteRecursive(child.id)
				  })

				  this.locationTab = this.locationTab.filter((l) => l.id !== locationId)
			  }

			  try {
				  await AppSettingsAPI.deleteLocation(id)

				  deleteRecursive(id)
			  } catch (error) {
				  Logger.error('Error deleting location', { error })
			  }
		  },

		  // METHOD FOR FAMILY
		  // STORE FOR INQUIRY FAMILY MANAGEMENT
		  async addFamily(familyData: {
			  family_type: string
			  label: string
			  description?: string
			  icon?: string
			  sort_order?: number
		  }): Promise<void> {
			  const maxId =
				  this.inquiryFamilyTab.length > 0 ? Math.max(...this.inquiryFamilyTab.map((f) => f.id)) : 0
			  const newId = maxId + 1

			  try {
				  await AppSettingsAPI.addInquiryFamily({
					  ...familyData,
					  created: Date.now(),
				  })

				  this.inquiryFamilyTab.push({
					  id: newId,
					  ...familyData,
					  created: Date.now(),
				  })
			  } catch (error) {
				  Logger.error('Error adding inquiry family', { error })
			  }
		  },

		  async updateFamily(
			  id: number,
			  familyData: {
				  family_type?: string
				  label?: string
				  description?: string
				  icon?: string
				  sort_order?: number
			  }
		  ): Promise<void> {
			  const family = this.inquiryFamilyTab.find((f) => f.id === id)
			  try {
				  await AppSettingsAPI.updateInquiryFamily(id, familyData)

				  if (family) {
					  Object.assign(family, familyData)
				  }
			  } catch (error) {
				  Logger.error('Error updating inquiry family', { error })
			  }
		  },

		  async deleteFamily(id: number): Promise<void> {
			  try {
				  await AppSettingsAPI.deleteInquiryFamily(id)
				  this.inquiryFamilyTab = this.inquiryFamilyTab.filter((f) => f.id !== id)
			  } catch (error) {
				  Logger.error('Error deleting inquiry family', { error })
			  }
		  },
		  // ============================================================
		  // INQUIRY GROUP TYPE MANAGEMENT
		  // ============================================================

		  async addInquiryGroupType(typeData: {
			  group_type: string
			  family: string
			  label: string
			  icon?: string
			  description?: string
			  fields?: unknown[]
			  allowed_inquiry_types?: string[]
			  allowed_response?: string[]
			  ui?: Record<string, unknown>
			  rules?: Record<string, unknown>
			  features?: string[]
			  actions?: Array<{ key: string; label: string; icon?: string }>
			  is_root?: boolean
			  sort_order?: number
		  }): Promise<void> {
			  const maxId =
				  this.inquiryGroupTypeTab.length > 0
					  ? Math.max(...this.inquiryGroupTypeTab.map((t) => t.id))
					  : 0
					  const newId = maxId + 1

					  try {
						  const response = await AppSettingsAPI.addInquiryGroupType({
							  ...typeData,
							  created: Date.now(),
						  })
						  const saved = response.data?.groupType ?? {
							  id: newId,
							  ...typeData,
							  created: Date.now(),
						  }
						  this.inquiryGroupTypeTab.push(saved as unknown)
					  } catch (error) {
						  Logger.error('Error adding inquiry group type', { error })
						  throw error
					  }
		  },

		  async updateInquiryGroupType(
			  id: number,
			  typeData: {
				  group_type?: string
				  family?: string
				  label?: string
				  icon?: string
				  description?: string
				  fields?: unknown[]
				  allowed_inquiry_types?: string[]
				  allowed_response?: string[]
				  ui?: Record<string, unknown>
				  rules?: Record<string, unknown>
				  features?: string[]
				  actions?: Array<{ key: string; label: string; icon?: string }>
				  is_root?: boolean
				  sort_order?: number
			  }
		  ): Promise<void> {
			  const type = this.inquiryGroupTypeTab.find((t) => t.id === id)
			  try {
				  await AppSettingsAPI.updateInquiryGroupType(id, typeData)
				  if (type) {
					  Object.assign(type, typeData)
				  }
			  } catch (error) {
				  Logger.error('Error updating inquiry group type', { error })
				  throw error
			  }
		  },

		  async deleteInquiryGroupType(id: number): Promise<void> {
			  try {
				  await AppSettingsAPI.deleteInquiryGroupType(id)
				  this.inquiryGroupTypeTab = this.inquiryGroupTypeTab.filter((t) => t.id !== id)
			  } catch (error) {
				  Logger.error('Error deleting inquiry group type', { error })
				  throw error
			  }
		  },

		  getGroupTypesByFamily(family: string): InquiryGroupType[] {
			  return this.inquiryGroupTypeTab.filter((t) => t.family === family)
		  },

		  // ============================================================
		  // OPTION TYPE MANAGEMENT
		  // ============================================================

		  async addOptionType(typeData: {
			  option_type: string
			  family: string
			  label: string
			  icon?: string
			  description?: string
			  fields?: unknown[]
			  allowed_response?: unknown[]
			  statuses?: unknown[]
			  allow_comment?: boolean
			  support_feature?: string
			  use_title?: boolean
		  }): Promise<void> {
			  const maxId =
				  this.inquiryOptionTypeTab.length > 0
					  ? Math.max(...this.inquiryOptionTypeTab.map((t) => t.id))
					  : 0
					  const newId = maxId + 1

					  try {
						  const response = await AppSettingsAPI.addOptionType({
							  ...typeData,
							  created: Date.now(),
						  })
						  const saved = response.data?.optionType ?? {
							  id: newId,
							  ...typeData,
							  created: Date.now(),
						  }
						  this.inquiryOptionTypeTab.push(saved as unknown)
					  } catch (error) {
						  Logger.error('Error adding option type', { error })
						  throw error
					  }
		  },

		  async updateOptionType(
			  id: number,
			  typeData: {
				  option_type?: string
				  family?: string
				  label?: string
				  icon?: string
				  description?: string
				  fields?: unknown[]
				  allowed_response?: unknown[]
				  statuses?: unknown[]
				  allow_comment?: boolean
				  support_feature?: string
				  use_title?: boolean
			  }
		  ): Promise<void> {
			  const type = this.inquiryOptionTypeTab.find((t) => t.id === id)
			  try {
				  await AppSettingsAPI.updateOptionType(id, typeData)
				  if (type) {
					  Object.assign(type, typeData)
				  }
			  } catch (error) {
				  Logger.error('Error updating option type', { error })
				  throw error
			  }
		  },

		  async deleteOptionType(id: number): Promise<void> {
			  try {
				  await AppSettingsAPI.deleteOptionType(id)
				  this.inquiryOptionTypeTab = this.inquiryOptionTypeTab.filter((t) => t.id !== id)
			  } catch (error) {
				  Logger.error('Error deleting option type', { error })
				  throw error
			  }
		  },

		  // STORE FOR OPTION FAMILY MANAGEMENT
		  async addOptionFamily(familyData: {
			  family_type: string
			  label: string
			  description?: string
			  icon?: string
			  sort_order?: number
			  ui?: Record<string, unknown>
			  rules?: Record<string, unknown>
			  features?: string[]
			  actions?: Array<{ key: string; label: string; icon?: string }>
		  }): Promise<void> {
			  try {
				  const response = await AppSettingsAPI.addOptionFamily({
					  ...familyData,
					  created: Date.now(),
				  })
				  const saved = response.data?.family ?? {
					  id: Date.now(),
					  ...familyData,
					  created: Date.now(),
				  }
				  this.optionFamilyTab.push(saved as unknown)
			  } catch (error) {
				  Logger.error('Error adding option family', { error })
				  throw error
			  }
		  },

		  async updateOptionFamily(id: number, familyData: {
			  family_type?: string
			  label?: string
			  description?: string
			  icon?: string
			  sort_order?: number
			  ui?: Record<string, unknown>
			  rules?: Record<string, unknown>
			  features?: string[]
			  actions?: Array<{ key: string; label: string; icon?: string }>
		  }): Promise<void> {
			  const family = this.optionFamilyTab.find((f) => f.id === id)
			  try {
				  await AppSettingsAPI.updateOptionFamily(id, familyData)
				  if (family) Object.assign(family, familyData)
			  } catch (error) {
				  Logger.error('Error updating option family', { error })
				  throw error
			  }
		  },

		  async deleteOptionFamily(id: number): Promise<void> {
			  try {
				  await AppSettingsAPI.deleteOptionFamily(id)
				  this.optionFamilyTab = this.optionFamilyTab.filter((f) => f.id !== id)
			  } catch (error) {
				  Logger.error('Error deleting option family', { error })
			  }
		  },

		  // METHOD FOR TYPE
		  // STORE FOR INQUIRY TYPE MANAGEMENT
		  async addInquiryType(typeData: {
			  inquiry_type: string
			  family: string
			  label: string
			  icon?: string
			  description?: string
			  fields?: string
			  allowed_response?: string
			  allowed_transformation?: string
			  allowed_option_type?: string
		  }): Promise<void> {
			  const maxId =
				  this.inquiryTypeTab.length > 0 ? Math.max(...this.inquiryTypeTab.map((t) => t.id)) : 0
			  const newId = maxId + 1

			  try {
				  await AppSettingsAPI.addInquiryType({
					  ...typeData,
					  created: Date.now(),
				  })

				  this.inquiryTypeTab.push({
					  id: newId,
					  ...typeData,
					  created: Date.now(),
				  })
			  } catch (error) {
				  Logger.error('Error adding inquiry type', { error })
			  }
		  },

		  async updateInquiryType(
			  id: number,
			  typeData: {
				  inquiry_type?: string
				  family?: string
				  label?: string
				  icon?: string
				  description?: string
				  fields?: string
				  allowed_response?: string
				  allowed_transformation?: string
				  allowed_option_type?: string
			  }
		  ): Promise<void> {
			  const type = this.inquiryTypeTab.find((t) => t.id === id)
			  try {
				  await AppSettingsAPI.updateInquiryType(id, typeData)

				  if (type) {
					  Object.assign(type, typeData)
				  }
			  } catch (error) {
				  Logger.error('Error updating inquiry type', { error })
			  }
		  },

		  async deleteType(id: number): Promise<void> {
			  try {
				  await AppSettingsAPI.deleteInquiryType(id)
				  this.inquiryTypeTab = this.inquiryTypeTab.filter((t) => t.id !== id)
			  } catch (error) {
				  Logger.error('Error deleting inquiry type', { error })
			  }
		  },

		  // Helper to build tree structure from flat list
		  buildTree<T extends { id: number; parentId: number }>(
			  items: T[],
			  parentId: number = 0
		  ): (T & { children: T[] })[] {
			  return items
			  .filter((item) => item.parentId === parentId)
			  .map((item) => ({
				  ...item,
				  children: this.buildTree(items, item.id),
			  }))
		  },

		  // Get parent options for select dropdowns
		  getParentOptions(type: 'category' | 'location', excludeId: number | null = null) {
			  const items = type === 'category' ? this.categoryTab : this.locationTab
			  const tree = this.buildTree(items)

			  const options = [{ id: 0, name: t('agora', 'No parent') }]

			  const flattenTree = (nodes: BaseEntry[], level = 0) => {
				  let results: BaseEntry[] = []
				  nodes.forEach((node) => {
					  if (node.id !== excludeId) {
						  results.push({
							  id: node.id,
							  name: `${'--'.repeat(level)} ${node.name}`,
						  })
					  }
					  if (node.children && node.children.length > 0) {
						  results = results.concat(flattenTree(node.children, level + 1))
					  }
				  })
				  return results
			  }

			  return options.concat(flattenTree(tree))
		  },
	  },
})
