/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { AppSettingsAPI } from '../Api/index.ts'
import { Logger } from '../helpers/index.ts'
import { BaseEntry, InquiryType, InquiryOptionType, InquiryFamily } from '../Types/index.ts'
import { AxiosError } from '@nextcloud/axios'
import type { InquiryGroupType } from './inquiryGroups.types'

import type { InquiryTypeRights, ModeratorRights, OfficialRights } from '../utils/permissions.ts'
import {  DefaultModeratorRights, DefaultOfficialRights } from '../utils/permissions.ts'

export type UpdateType = 'noInquirying' | 'periodicInquirying' | 'longInquirying'

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
	categoryTab: Category[]
	locationTab: Location[]
	inquiryStatusTab: InquiryStatus[]
	inquiryTypeTab: InquiryType[]
	inquiryOptionTypeTab: InquiryOptionType[]
	inquiryGroupTypeTab: InquiryGroupType[]
	inquiryFamilyTab: InquiryFamily[]
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
		 getInquiryTypeRights: (state) => (inquiryType: string) => state.inquiryTypeRights[inquiryType],

		 getMainInquiryTypes: (state) => state.inquiryTypeTab,
		 
         getMainInquiryOptionTypes: (state) => state.inquiryOptionTypeTab,
		 
         getMainInquiryGroupTypes: (state) => state.inquiryGroupTypeTab,


	},

	actions: {
		 getFirstStatusKeyByInquiryType(inquiryType: string): string | null {

			if (!this.inquiryStatusTab.length) {
				console.warn('🔧 [SettingsStore] No statuses available')

			}


			const statuses = this.inquiryStatusTab.filter(
				status => status.inquiryType === inquiryType
			)


			if (statuses.length > 0) {
				const sortedStatuses = [...statuses].sort((a, b) =>
									  a.sort_order - b.sort_order
									 )

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
					canCreate: false
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
            status => status.inquiryType === inquiryType &&
                      status.statusKey === statusKey
        );
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
			this.inquiryStatusTab = this.inquiryStatusTab.filter(
				(s) => !(s.inquiryType === inquiryType && s.id === statusId)
			)
			// Reorder remaining statuses
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
					(s) => s.inquiryType === inquiryType && s.id === status.statusId
				)
				if (globalIndex !== -1) {
					this.inquiryStatusTab[globalIndex].order = index
				}
			})
		},

		// Move status up in order
		moveStatusUp(inquiryType: string, statusId: string): void {
			const statuses = this.getStatusesForInquiryType(inquiryType)
			const currentIndex = statuses.findIndex((s) => s.id === statusId)

			if (currentIndex > 0) {
				// Swap orders with previous status
				const previousStatus = statuses[currentIndex - 1]
				const currentStatus = statuses[currentIndex]

				// Update orders in the main array
				const previousGlobalIndex = this.inquiryStatusTab.findIndex(
					(s) => s.inquiryType === inquiryType && s.statusId === previousStatus.statusId
				)
				const currentGlobalIndex = this.inquiryStatusTab.findIndex(
					(s) => s.inquiryType === inquiryType && s.statusId === currentStatus.statusId
				)

				if (previousGlobalIndex !== -1 && currentGlobalIndex !== -1) {
					const tempOrder = this.inquiryStatusTab[currentGlobalIndex].order
					this.inquiryStatusTab[currentGlobalIndex].order =
						this.inquiryStatusTab[previousGlobalIndex].order
					this.inquiryStatusTab[previousGlobalIndex].order = tempOrder
				}

				// Reorder to ensure consistency
				this.reorderStatuses(inquiryType)
			}
		},

		// Move status down in order
		moveStatusDown(inquiryType: string, statusId: string): void {
			const statuses = this.getStatusesForInquiryType(inquiryType)
			const currentIndex = statuses.findIndex((s) => s.id === statusId)

			if (currentIndex < statuses.length - 1) {
				// Swap orders with next status
				const nextStatus = statuses[currentIndex + 1]
				const currentStatus = statuses[currentIndex]

				// Update orders in the main array
				const nextGlobalIndex = this.inquiryStatusTab.findIndex(
					(s) => s.inquiryType === inquiryType && s.statusId === nextStatus.statusId
				)
				const currentGlobalIndex = this.inquiryStatusTab.findIndex(
					(s) => s.inquiryType === inquiryType && s.statusId === currentStatus.statusId
				)

				if (nextGlobalIndex !== -1 && currentGlobalIndex !== -1) {
					const tempOrder = this.inquiryStatusTab[currentGlobalIndex].order
					this.inquiryStatusTab[currentGlobalIndex].order =
						this.inquiryStatusTab[nextGlobalIndex].order
					this.inquiryStatusTab[nextGlobalIndex].order = tempOrder
				}

				// Reorder to ensure consistency
				this.reorderStatuses(inquiryType)
			}
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
			family_type: string;
			label: string;
			description?: string;
			icon?: string;
			sort_order?: number;
		}): Promise<void> {
			const maxId = this.inquiryFamilyTab.length > 0 ? Math.max(...this.inquiryFamilyTab.map((f) => f.id)) : 0;
			const newId = maxId + 1;

			try {
				await AppSettingsAPI.addInquiryFamily({
					...familyData,
					created: Date.now(),
				});

				this.inquiryFamilyTab.push({
					id: newId,
					...familyData,
					created: Date.now(),
				});
			} catch (error) {
				Logger.error('Error adding inquiry family', { error });
			}
		},

		async updateFamily(id: number, familyData: {
			family_type?: string;
			label?: string;
			description?: string;
			icon?: string;
			sort_order?: number;
		}): Promise<void> {
			const family = this.inquiryFamilyTab.find((f) => f.id === id);
			try {
				await AppSettingsAPI.updateInquiryFamily(id, familyData);

				if (family) {
					Object.assign(family, familyData);
				}
			} catch (error) {
				Logger.error('Error updating inquiry family', { error });
			}
		},

		async deleteFamily(id: number): Promise<void> {
			try {
				await AppSettingsAPI.deleteInquiryFamily(id);
				this.inquiryFamilyTab = this.inquiryFamilyTab.filter((f) => f.id !== id);
			} catch (error) {
				Logger.error('Error deleting inquiry family', { error });
			}
		},


		// METHOD FOR TYPE
		// STORE FOR INQUIRY TYPE MANAGEMENT
		async addInquiryType(typeData: {
			inquiry_type: string;
			family: string;
			label: string;
			icon?: string;
			description?: string;
			fields?: string;
			allowed_response?: string;
			allowed_transformation?: string;
		    allowed_option_type?: string;
		}): Promise<void> {
			const maxId = this.inquiryTypeTab.length > 0 ? Math.max(...this.inquiryTypeTab.map((t) => t.id)) : 0;
			const newId = maxId + 1;

			try {
				await AppSettingsAPI.addInquiryType({
					...typeData,
					created: Date.now(),
				});

				this.inquiryTypeTab.push({
					id: newId,
					...typeData,
					created: Date.now(),
				});
			} catch (error) {
				Logger.error('Error adding inquiry type', { error });
			}
		},

		async updateInquiryType(id: number, typeData: {
			inquiry_type?: string;
			family?: string;
			label?: string;
			icon?: string;
			description?: string;
			fields?: string;
			allowed_response?: string;
			allowed_transformation?: string;
		    allowed_option_type?: string;
		}): Promise<void> {
			const type = this.inquiryTypeTab.find((t) => t.id === id);
			try {
				await AppSettingsAPI.updateInquiryType(id, typeData);

				if (type) {
					Object.assign(type, typeData);
				}
			} catch (error) {
				Logger.error('Error updating inquiry type', { error });
			}
		},

		async deleteInquiryType(id: number): Promise<void> {
			try {
				await AppSettingsAPI.deleteInquiryType(id);
				this.inquiryTypeTab = this.inquiryTypeTab.filter((t) => t.id !== id);
			} catch (error) {
				Logger.error('Error deleting inquiry type', { error });
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

			const options = [{ id: 0, name: 'No parent' }]

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
