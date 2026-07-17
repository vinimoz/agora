/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ref, computed, watch  } from 'vue'
import { useSessionStore } from '../../stores/session'
import { useInquiryStore } from '../../stores/inquiry'
import { Location, Category , BaseEntry } from '../../Types/index.ts'
import { canEdit, createPermissionContextForContent, ContentType } from '../../utils/permissions.ts'
import { t } from '@nextcloud/l10n'

interface HierarchyItem extends BaseEntry {
	id: number | bigint
	name: string
	parent_id?: number | bigint
	parentId?: number | bigint
	depth?: number
	children?: HierarchyItem[]
}

interface SelectOption {
	value: number | bigint
	label: string
	original: HierarchyItem
}

/**
 */
export function useHierarchicalSelect() {
	const sessionStore = useSessionStore()

	// Build hierarchy for location and category dropdowns
	function buildHierarchy(list: HierarchyItem[], parentId: number | bigint = 0, depth = 0): HierarchyItem[] {
		if (!Array.isArray(list)) return []
		
		return list
			.filter((item) => {
				const itemParentId = item.parent_id ?? item.parentId ?? 0
				return itemParentId.toString() === parentId.toString()
			})
			.map((item) => {
				const children = buildHierarchy(list, item.id, depth + 1)
				return {
					...item,
					depth,
					children,
				}
			})
	}

	const hierarchicalLocation = computed((): SelectOption[] => {
		const locations = sessionStore.appSettings.locationTab
		if (!Array.isArray(locations)) return []

		const locationsArray = JSON.parse(JSON.stringify(locations))
		const hierarchy = buildHierarchy(locationsArray as HierarchyItem[])
		
		return hierarchy.map((item) => ({
			value: item.id,
			label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
			original: item,
		}))
	})

	const hierarchicalCategory = computed((): SelectOption[] => {
		const categories = sessionStore.appSettings.categoryTab
		if (!Array.isArray(categories)) return []

		const categoriesArray = JSON.parse(JSON.stringify(categories))
		const hierarchy = buildHierarchy(categoriesArray as HierarchyItem[])
		
		return hierarchy.map((item) => ({
			value: item.id,
			label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
			original: item,
		}))
	})

	// Get hierarchy path for location and category display
	function getHierarchyPath(items: HierarchyItem[], targetId: number | bigint): string {
		if (!items || !Array.isArray(items)) return t('agora', 'Not defined')

		const itemsArray = JSON.parse(JSON.stringify(items))
		const itemMap: Record<string, HierarchyItem> = {}
		
		itemsArray.forEach((item: HierarchyItem) => {
			itemMap[item.id.toString()] = item
		})

		if (!itemMap[targetId.toString()]) {
			return t('agora', 'Not found')
		}

		function buildPath(item: HierarchyItem): string {
			const parentId = item.parent_id ?? item.parentId ?? 0
			if (!parentId || parentId.toString() === '0') {
				return item.name || t('agora', 'No name')
			}
			const parent = itemMap[parentId.toString()]
			if (parent) {
				return `${buildPath(parent)} → ${item.name}`
			}
			return item.name || t('agora', 'No name')
		}

		return buildPath(itemMap[targetId.toString()])
	}

	return {
		hierarchicalLocation,
		hierarchicalCategory,
		getHierarchyPath
	}
}

/**
 * @param inquiryStore
 */
export function useCategoryLocationSelection(inquiryStore: ReturnType<typeof useInquiryStore>) {
	const sessionStore = useSessionStore() 
	const { hierarchicalLocation, hierarchicalCategory, getHierarchyPath } = useHierarchicalSelect()

	const selectedCategory = ref<number | bigint>(inquiryStore.categoryId || 0)
	const selectedLocation = ref<number | bigint>(inquiryStore.locationId || 0)

	// Watchers for location and category
	const setupCategoryLocationWatchers = () => {
		const locationStop = watch(
			selectedLocation,
			(newVal) => {
				if (newVal) {
					inquiryStore.locationId = newVal
				}
			},
			{ deep: true }
		)

		const categoryStop = watch(
			selectedCategory,
			(newVal) => {
				if (newVal) {
					inquiryStore.categoryId = newVal
				}
			},
			{ deep: true }
		)

		return { locationStop, categoryStop }
	}

	// Initialize location and category
	const initializeCategoryLocation = () => {
		// Convertir les Proxies pour l'initialisation
		const locationsArray = JSON.parse(JSON.stringify(sessionStore.appSettings.locationTab))
		const categoriesArray = JSON.parse(JSON.stringify(sessionStore.appSettings.categoryTab))

		// Initialize location
		if (Array.isArray(locationsArray) && locationsArray.length > 0) {
			if (!inquiryStore.locationId || inquiryStore.locationId.toString() === '0') {
				selectedLocation.value = locationsArray[0].id
				inquiryStore.locationId = locationsArray[0].id
			} else {
				const selected = locationsArray.find((loc: Location) => loc.id.toString() === inquiryStore.locationId.toString())
				selectedLocation.value = selected?.id || locationsArray[0].id
				inquiryStore.locationId = selected?.id || locationsArray[0].id
			}
		}

		// Initialize category
		if (Array.isArray(categoriesArray) && categoriesArray.length > 0) {
			if (!inquiryStore.categoryId || inquiryStore.categoryId.toString() === '0') {
				selectedCategory.value = categoriesArray[0].id
				inquiryStore.categoryId = categoriesArray[0].id
			} else {
				const selected = categoriesArray.find((cat: Category) => cat.id.toString() === inquiryStore.categoryId.toString())
				selectedCategory.value = selected?.id || categoriesArray[0].id
				inquiryStore.categoryId = selected?.id || categoriesArray[0].id
			}
		}
	}

	return {
		selectedCategory,
		selectedLocation,
		hierarchicalLocation,
		hierarchicalCategory,
		getHierarchyPath,
		setupCategoryLocationWatchers,
		initializeCategoryLocation
	}
}

/**
 * @param inquiryStore
 */
export function useInquiryPermissions(inquiryStore: ReturnType<typeof useInquiryStore>) {
	const sessionStore = useSessionStore()

	const context = computed(() => createPermissionContextForContent(
		ContentType.Inquiry,
		inquiryStore.owner.id,
		inquiryStore.configuration.visibility === 'everyone',
		inquiryStore.status.isLocked,
		inquiryStore.status.isExpired,
		inquiryStore.status.deletionDate > 0,
		inquiryStore.status.isArchived,
		inquiryStore.inquiryGroups.length > 0,
		inquiryStore.inquiryGroups,
		inquiryStore.type
	))

	const isReadonly = computed(() => {
		const user = sessionStore.currentUser
		if (!user) return true
		return !canEdit(context.value)
	})

	const isReadonlyDescription = computed(() => {
		if (inquiryStore.type === 'debate') {
			return false
		}
		return isReadonly.value
	})

	// Determine if category/location should be shown as select or label
	const showCategoryAsLabel = computed(() => {
		if (inquiryStore.parentId !== 0) return true
		if (isReadonly.value) return true
		return false
	})

	const showLocationAsLabel = computed(() => {
		if (inquiryStore.parentId !== 0) return true
		if (isReadonly.value) return true
		return false
	})

	return {
		context,
		isReadonly,
		isReadonlyDescription,
		showCategoryAsLabel,
		showLocationAsLabel
	}
}

/**
 * Fonction for UI actions
 * @param inquiryStore
 */
export function useInquiryActions(inquiryStore: ReturnType<typeof useInquiryStore>) {
	const sessionStore = useSessionStore()
	const { isReadonly, isReadonlyDescription } = useInquiryPermissions(inquiryStore)

	const allowedTypesForActions = ref(['standard', 'debate', 'official'])

	// Check if actions menu should be shown
	const showActionsMenu = computed(() => !isReadonly.value && allowedTypesForActions.value.includes(inquiryStore.type))

	const showResponseButton = computed(() => sessionStore.currentUser?.isOfficial)

	const showSaveButton = computed(() => !isReadonlyDescription.value)

	return {
		allowedTypesForActions,
		showActionsMenu,
		showResponseButton,
		showSaveButton
	}
}
