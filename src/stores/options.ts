/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import { Component } from '@nextcloud/vue'

import { Logger } from '../helpers/index.ts'
import { OptionsAPI, PublicAPI } from '../Api/index.ts'
import { Option } from './option.ts'
import { OptionFamily, Event, InquiryOptionType } from '../Types/index.ts'
import { useInquiryStore } from './inquiry.ts'
import { useSessionStore } from './session.ts'
import { useCommentsStore } from './comments.ts'
import { useAppSettingsStore } from './appSettings.ts'
import { AxiosError } from '@nextcloud/axios'
import {
    getFamilyColor,
    getFamiliesWithOptionTypes,
    getFamilyFallbackData,
    getFamilyIconComponent,
    getFamilyIconName
} from '../helpers/modules/InquiryOptionHelper.ts'

export type OptionGroup = {
    id: number
    name: string
    description: string
    family: string
    color: string
    icon: string
    options: Option[]
}

export type OptionsByFamily = {
    [key: string]: OptionGroup[]
}

export type OptionsState = {
    options: Option[]
    families: OptionFamily[]
    groups: OptionGroup[]
    optionsByFamily: OptionsByFamily
    loading: boolean
    error: string | null
    lastUpdated: number
}

export const useOptionsStore = defineStore('options', {
    state: (): OptionsState => ({
        options: [],
        families: [],
        groups: [],
        optionsByFamily: {},
        loading: false,
        error: null,
        lastUpdated: 0,
    }),

    getters: {
        // Get all options for current inquiry
        allOptions(): Option[] {
            return this.options
        },

        // Get option type definitions from session store
        getOptionTypes(): Record<string, InquiryOptionType> {
            const sessionStore = useSessionStore()
            return sessionStore.appSettings?.inquiryOptionTypeTab || {}
        },

        // Get option types as array
        getOptionTypesArray(): InquiryOptionType[] {
            const sessionStore = useSessionStore()
            const types = sessionStore.appSettings?.inquiryOptionTypeTab || {}
            return Object.values(types)
        },

        // Get families from option types using helper
        getFamilies(): OptionFamily[] {
            const appSettingsStore = useAppSettingsStore()
            const optionTypesArray = this.getOptionTypesArray
            
            // Get families from appSettings first
            const familiesFromSettings = appSettingsStore.settings?.optionFamilyTab || []
            
            // Create a map of families with their data
            const familiesMap: Record<string, OptionFamily> = {}
            
            // Add families from settings
            familiesFromSettings.forEach((family: OptionFamily) => {
                familiesMap[family.family_type] = {
                    key: family.family_type,
                    name: family.label || family.family_type,
                    label: family.label,
                    description: family.description || '',
                    color: getFamilyColor(family.family_type),
                    icon: family.icon || 'File',
                    sortOrder: family.sort_order || 999,
                    types: []
                }
            })
            
            // Group types by family
            optionTypesArray.forEach((type: InquiryOptionType) => {
                const familyKey = type.family || 'default'
                
                if (!familiesMap[familyKey]) {
                    // Use fallback data if family not in settings
                    const fallbackData = getFamilyFallbackData()
                    const fallback = fallbackData[familyKey] || fallbackData.default
                    
                    familiesMap[familyKey] = {
                        key: familyKey,
                        name: fallback.name || familyKey,
                        label: fallback.label,
                        description: fallback.description || '',
                        color: getFamilyColor(familyKey),
                        icon: fallback.icon || 'File',
                        sortOrder: 999,
                        types: []
                    }
                }
                
                if (!familiesMap[familyKey].types) {
                    familiesMap[familyKey].types = []
                }
                familiesMap[familyKey].types.push(type)
            })

            // Sort families and types within each family
            return Object.values(familiesMap)
                .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999))
                .map(family => ({
                    ...family,
                    types: (family.types || []).sort((a, b) => 
                        (a.sortOrder || 999) - (b.sortOrder || 999)
                    )
                }))
        },

        getFamiliesWithTypes(): Array<OptionFamily & {
            types: InquiryOptionType[]
            color: string
        }> {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()
            const optionTypesArray = this.getOptionTypesArray

            // Use helper to get organized families
            const familiesFromHelper = getFamiliesWithOptionTypes(
                inquiryStore.type,
                sessionStore.appSettings?.inquiryTypeTab || {},
                optionTypesArray
            )

            // Map to include colors and ensure proper structure
            return familiesFromHelper.map(familyHelper => ({
                key: familyHelper.key,
                name: familyHelper.name,
                label: familyHelper.label,
                description: familyHelper.description,
                color: getFamilyColor(familyHelper.key),
                icon: familyHelper.icon,
                sortOrder: familyHelper.sortOrder || 999,
                types: familyHelper.optionTypes || []
            }))
        },

        // Get options by specific type
        getOptionsByType: (state) => (typeKey: string): Option[] =>
            state.options.filter(option => option.type === typeKey),

        // Get options for a specific family
        getOptionsByFamily: (state) => (familyKey: string): Option[] => {
            const typesInFamily = Object.values(state.getOptionTypes)
                .filter(type => type.family === familyKey)
                .map(type => type.key)

            return state.options.filter(option => typesInFamily.includes(option.type))
        },

        // Get parent options (hierarchical)
        parentOptions(): Option[] {
            return this.options.filter(option => option.parentId === 0)
        },

        // Get child options for a specific parent
        childOptions: (state) => (parentId: number): Option[] =>
            state.options.filter(option => option.parentId === parentId),

        // Get hierarchical structure
        hierarchicalOptions(): Array<Option & { children: Option[] }> {
            return this.parentOptions.map(parent => ({
                ...parent,
                children: this.childOptions(parent.id)
            }))
        },

        // Get type information for an option
        getOptionTypeInfo: () => (typeKey: string): InquiryOptionType | undefined => {
            const sessionStore = useSessionStore()
            return sessionStore.appSettings?.inquiryOptionTypeTab?.[typeKey]
        },

        // Check if option type is allowed as child
        isAllowedChildType: (state) => (parentType: string, childType: string): boolean => {
            const typeInfo = state.getOptionTypeInfo(parentType)
            return typeInfo?.allowed_child_types?.includes(childType) || false
        },

        // Get all allowed types for creating new options
        getAllowedTypes(): InquiryOptionType[] {
            const sessionStore = useSessionStore()
            const types = sessionStore.appSettings?.inquiryOptionTypeTab || {}
            
            return Object.values(types)
                .filter(() => true)
                .sort((a, b) => a.sortOrder - b.sortOrder)
        },

        // Get types by family
        getTypesByFamily(): Record<string, InquiryOptionType[]> {
            const families: Record<string, InquiryOptionType[]> = {}

            this.getAllowedTypes.forEach(type => {
                if (!families[type.family]) {
                    families[type.family] = []
                }
                families[type.family].push(type)
            })

            return families
        },

        // Statistics
        totalSupports(): number {
            return this.options.reduce((total, option) =>
                total + (option.currentUserStatus?.countSupports || 0), 0
            )
        },

        totalComments(): number {
            return this.options.reduce((total, option) =>
                total + (option.currentUserStatus?.countComments || 0), 0
            )
        },

        countsByType(): Record<string, number> {
            const counts: Record<string, number> = {}
            this.options.forEach(option => {
                counts[option.type] = (counts[option.type] || 0) + 1
            })
            return counts
        },

        countsByFamily(): Record<string, number> {
            const counts: Record<string, number> = {}
            this.options.forEach(option => {
                const typeInfo = this.getOptionTypeInfo(option.type)
                if (typeInfo) {
                    counts[typeInfo.family] = (counts[typeInfo.family] || 0) + 1
                }
            })
            return counts
        },

        // Check if can add options
        canAddOptions(): boolean {
            const inquiryStore = useInquiryStore()
            return inquiryStore.permissions?.addOptions || false
        },

        // Get options created by current user
        userCreatedOptions(): Option[] {
            const sessionStore = useSessionStore()
            return this.options.filter(option =>
                option.owner?.id === sessionStore.currentUser?.id
            )
        },

        // Get options supported by current user
        userSupportedOptions(): Option[] {
            const sessionStore = useSessionStore()
            return this.options.filter(option =>
                option.currentUserStatus?.hasSupported &&
                option.currentUserStatus.userId === sessionStore.currentUser?.id
            )
        },

        // Ces getters sont maintenant simplifiés car ils utilisent le helper
        // mais on les garde pour la compatibilité
        getFamilyName: () => (familyKey: string): string => {
            const fallbackData = getFamilyFallbackData()
            return fallbackData[familyKey]?.name || fallbackData.default?.name || familyKey
        },

        getFamilyDescription: () => (familyKey: string): string => {
            const fallbackData = getFamilyFallbackData()
            return fallbackData[familyKey]?.description || fallbackData.default?.description || ''
        },

        getFamilyColor: () => (familyKey: string): string => getFamilyColor(familyKey),

        getFamilyIcon: () => (familyKey: string): string => getFamilyIconName(familyKey),

        getFamilyIconComponent: () => (familyKey: string): Component => getFamilyIconComponent(familyKey),

        getFamilySortOrder: () => (familyKey: string): number => {
            const appSettingsStore = useAppSettingsStore()
            const families = appSettingsStore.settings?.optionFamilyTab || []
            const family = families.find((f: OptionFamily) => f.family_type === familyKey)
            return family?.sort_order || 999
        },
    },

    actions: {
        reset(): void {
            this.$reset()
        },
        
        forceUpdateCommentCount() {
            const commentsStore = useCommentsStore()
            
            if (this.id && this.targetId) {
                const count = commentsStore.comments.filter(
                    comment => comment.inquiryId === this.targetId && 
                               comment.optionId === this.id && 
                               comment.deleted === 0
                ).length
                
                if (this.status) {
                    this.status.countComments = count
                }
            }
        },

        // Initialize option types from session store
        initializeOptionTypes(): void {
            this.families = this.getFamilies

            // Initialize empty arrays for each family
            this.families.forEach(family => {
                if (!this.optionsByFamily[family.key]) {
                    this.optionsByFamily[family.key] = []
                }
            })
        },

        // Load all options for current inquiry
        async load(inquiryId?: number, token?: string): Promise<void> {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()
            const targetId = inquiryId || inquiryStore.id

            if (!targetId && !token) {
                this.error = t('agora', 'No inquiry selected')
                return
            }

            this.loading = true
            this.error = null

            try {
                // Initialize option types first
                this.initializeOptionTypes()

                // Load options - handle both authenticated and public routes
                const response = await (() => {
                    if (token || sessionStore.route?.name === 'publicInquiry') {
                        const publicToken = token || sessionStore.route?.params?.token as string
                        return PublicAPI.getOptions(publicToken)
                    }
                    return OptionsAPI.getOptionsByInquiry(targetId)
                })()

                this.options = response.data.options || []
                this.lastUpdated = Date.now()

                // Organize options by family
                this.organizeByFamily()

                emit(Event.OptionsLoaded, {
                    store: 'options',
                    message: t('agora', 'Options loaded'),
                    count: this.options.length
                })
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                this.error = t('agora', 'Failed to load options')
                Logger.error('Error loading options:', { error, inquiryId: targetId, token })
                throw error
            } finally {
                this.loading = false
            }
        },

        updateOptionCommentCount(optionId: number, count: number): void {
            const option = this.options.find(opt => opt.id === optionId)
            if (option && option.status) {
                option.status.countComments = count
            }
        },

        updateOptionSupportCount(optionId: number, count: number): void {
            const option = this.options.find(opt => opt.id === optionId)
            if (option && option.status) {
                option.status.countSupports = count
            }
        },

        // Optional: Update all support-related counts at once
        updateOptionSupportDetails(optionId: number, supportData: {
            countSupports: number
            countPositiveSupports?: number
            countNegativeSupports?: number
            countNeutralSupports?: number
            hasSupported?: boolean
            supportValue?: number | null
        }): void {
            const option = this.options.find(opt => opt.id === optionId)
            if (option) {
                if (option.status) {
                    option.status.countSupports = supportData.countSupports
                    if (supportData.countPositiveSupports !== undefined) {
                        option.status.countPositiveSupports = supportData.countPositiveSupports
                    }
                    if (supportData.countNegativeSupports !== undefined) {
                        option.status.countNegativeSupports = supportData.countNegativeSupports
                    }
                    if (supportData.countNeutralSupports !== undefined) {
                        option.status.countNeutralSupports = supportData.countNeutralSupports
                    }
                }

                // Update current user's support status if provided
                if (option.currentUserStatus) {
                    if (supportData.hasSupported !== undefined) {
                        option.currentUserStatus.hasSupported = supportData.hasSupported
                    }
                    if (supportData.supportValue !== undefined) {
                        option.currentUserStatus.supportValue = supportData.supportValue
                    }
                }
            }
        },

        // Organize options by family based on type definitions
        organizeByFamily(): void {
            // Clear existing groups
            this.optionsByFamily = {}
            this.groups = []

            // Initialize families
            this.families.forEach(family => {
                this.optionsByFamily[family.key] = []
            })

            // Group options by family
            this.options.forEach(option => {
                const typeInfo = this.getOptionTypeInfo(option.type)
                if (typeInfo) {
                    const familyKey = typeInfo.family
                    if (!this.optionsByFamily[familyKey]) {
                        this.optionsByFamily[familyKey] = []
                    }
                    this.optionsByFamily[familyKey].push(option)
                } else {
                    if (!this.optionsByFamily.other) {
                        this.optionsByFamily.other = []
                    }
                    this.optionsByFamily.other.push(option)
                }
            })

            // Create option groups for each type within families
            this.createOptionGroups()
        },

        // Create option groups based on types
        createOptionGroups(): void {
            const groups: OptionGroup[] = []
            const familiesWithTypes = this.getFamiliesWithTypes

            familiesWithTypes.forEach(family => {
                family.types.forEach(type => {
                    const typeOptions = this.options.filter(option => option.type === type.key)
                    if (typeOptions.length > 0) {
                        groups.push({
                            id: type.sortOrder || 0,
                            name: type.name || type.label || type.key,
                            description: type.description || '',
                            family: family.key,
                            color: type.color || family.color,
                            icon: type.icon || family.icon,
                            options: typeOptions
                        })
                    }
                })
            })

            // Add "Other" group for options without valid type
            const otherOptions = this.options.filter(option => {
                const typeInfo = this.getOptionTypeInfo(option.type)
                return !typeInfo
            })

            if (otherOptions.length > 0) {
                groups.push({
                    id: 999,
                    name: t('agora', 'Other Options'),
                    description: t('agora', 'Options without type classification'),
                    family: 'other',
                    color: '#999999',
                    icon: 'icon-category-other',
                    options: otherOptions
                })
            }

            // Sort groups by sort order
            this.groups = groups.sort((a, b) => a.id - b.id)
        },

        // Update a single option in the store
        updateOption(payload: { option: Option }): void {
            const index = this.options.findIndex(
                (option) => option.id === payload.option.id
            )

            if (index < 0) {
                this.options.push(payload.option)
            } else {
                this.options.splice(index, 1, payload.option)
            }

            // Reorganize after update
            this.organizeByFamily()
        },

        // Add a new option with type validation
        async add(payload: {
            title: string
            text: string
            type: string
            parentId?: number
            miscFields?: Record<string, { key: string; value: string }>
        }): Promise<Option | void> {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()

            if (!this.canAddOptions) {
                showError(t('agora', 'You do not have permission to add options'))
                return
            }

            const typeInfo = sessionStore.appSettings?.inquiryOptionTypeTab?.[payload.type]
            if (!typeInfo) {
                showError(t('agora', 'Invalid option type'))
                return
            }

            if (payload.parentId) {
                const parentOption = this.options.find(opt => opt.id === payload.parentId)
                if (parentOption) {
                    const parentTypeInfo = sessionStore.appSettings?.inquiryOptionTypeTab?.[parentOption.type]
                    if (parentTypeInfo?.allowed_child_types &&
                        !parentTypeInfo.allowed_child_types.includes(payload.type)) {
                        showError(t('agora', 'This option type cannot be added as a child to the selected parent'))
                    return
                    }
                }
            }

            try {
                const response = await (() => {
                    if (sessionStore.route?.name === 'publicInquiry') {
                        const token = sessionStore.route.params.token as string
                        return PublicAPI.createOption(token, {
                            title: payload.title,
                            text: payload.text,
                            type: payload.type,
                            parentId: payload.parentId || 0,
                            miscFields: payload.miscFields || {}
                        })
                    }
                    return OptionsAPI.createOption({
                        title: payload.title,
                        text: payload.text,
                        type: payload.type,
                        targetId: inquiryStore.id,
                        parentId: payload.parentId || 0,
                        miscFields: payload.miscFields || {}
                    })
                })()

                const newOption = response.data.option
                this.options.push(newOption)
                this.organizeByFamily()

                emit(Event.OptionAdded, {
                    store: 'options',
                    message: t('agora', 'Option added'),
                    option: newOption
                })

                return newOption
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error adding option:', { error, payload })
                throw error
            }
        },

        // Update an existing option
        async update(payload: { option: Option }): Promise<void> {
            const sessionStore = useSessionStore()

            try {
                const response = await (() => {
                    if (sessionStore.route?.name === 'publicInquiry') {
                        const token = sessionStore.route.params.token as string
                        return PublicAPI.updateOption(token, payload.option)
                    }
                    return OptionsAPI.updateOption(payload.option)
                })()

                this.updateOption({ option: response.data.option })
            } catch (error) {
                Logger.error('Error updating option', { error, payload })
                this.load()
                throw error
            }
        },

        // Delete an option
        async delete(payload: { option: Option }): Promise<void> {
            const sessionStore = useSessionStore()

            try {
                const response = await (() => {
                    if (sessionStore.route?.name === 'publicInquiry') {
                        const token = sessionStore.route.params.token as string
                        return PublicAPI.deleteOption(token, payload.option.id)
                    }
                    return OptionsAPI.deleteOption(payload.option.id)
                })()

                this.updateOption({ option: response.data.option })
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error deleting option', { error, payload })
                throw error
            }
        },

        // Restore a deleted option
        async restore(payload: { option: Option }): Promise<void> {
            const sessionStore = useSessionStore()

            try {
                const response = await (() => {
                    if (sessionStore.route?.name === 'publicInquiry') {
                        const token = sessionStore.route.params.token as string
                        return PublicAPI.restoreOption(token, payload.option.id)
                    }
                    return OptionsAPI.restoreOption(payload.option.id)
                })()

                this.updateOption({ option: response.data.option })
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error restoring option', { error, payload })
                throw error
            }
        },

        // Add support to an option
        async support(optionId: number): Promise<void> {
            const sessionStore = useSessionStore()

            try {
                const response = await (() => {
                    if (sessionStore.route?.name === 'publicInquiry') {
                        const token = sessionStore.route.params.token as string
                        return PublicAPI.supportOption(token, optionId)
                    }
                    return OptionsAPI.supportOption(optionId)
                })()

                this.updateOption({ option: response.data.option })
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error supporting option', { error, optionId })
                throw error
            }
        },

        // Remove support from an option
        async unsupport(optionId: number): Promise<void> {
            const sessionStore = useSessionStore()

            try {
                const response = await (() => {
                    if (sessionStore.route?.name === 'publicInquiry') {
                        const token = sessionStore.route.params.token as string
                        return PublicAPI.unsupportOption(token, optionId)
                    }
                    return OptionsAPI.unsupportOption(optionId)
                })()

                this.updateOption({ option: response.data.option })
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error unsupporting option', { error, optionId })
                throw error
            }
        },

        // Get default misc fields for a type
        getDefaultMiscFields(typeKey: string): Record<string, { key: string; value: string }> {
            const sessionStore = useSessionStore()
            const typeInfo = sessionStore.appSettings?.inquiryOptionTypeTab?.[typeKey]
            const defaults: Record<string, { key: string; value: string }> = {}

            if (typeInfo?.miscFields) {
                typeInfo.miscFields.forEach(field => {
                    if (field.default !== undefined) {
                        defaults[field.key] = field.default
                    }
                })
            }

            return defaults
        },

        // Get allowed child types for a parent option
        getAllowedChildTypes(parentOptionId: number): InquiryOptionType[] {
            const parentOption = this.options.find(opt => opt.id === parentOptionId)
            if (!parentOption) return []

                const sessionStore = useSessionStore()
                const parentTypeInfo = sessionStore.appSettings?.inquiryOptionTypeTab?.[parentOption.type]

                if (!parentTypeInfo?.allowed_child_types) return []

                    return parentTypeInfo.allowed_child_types
                    .map(typeKey => sessionStore.appSettings?.inquiryOptionTypeTab?.[typeKey])
                    .filter(Boolean)
                    .sort((a, b) => (a?.sortOrder || 0) - (b?.sortOrder || 0))
        },

        // Get option type display info
        getTypeDisplayInfo(typeKey: string): {
            name: string
            color: string
            icon: string
            family: string
        } {
            const sessionStore = useSessionStore()
            const typeInfo = sessionStore.appSettings?.inquiryOptionTypeTab?.[typeKey]

            if (typeInfo) {
                return {
                    name: typeInfo.name || typeInfo.label || typeKey,
                    color: typeInfo.color || getFamilyColor(typeInfo.family),
                    icon: typeInfo.icon || 'File',
                    family: typeInfo.family
                }
            }

            return {
                name: typeKey,
                color: '#999999',
                icon: 'File',
                family: 'other'
            }
        },

        // Get family summary statistics
        getFamilySummary(): Array<{
            family: string
            name: string
            color: string
            icon: string
            count: number
            totalSupports: number
            totalComments: number
            types: Array<{
                type: string
                name: string
                count: number
            }>
        }> {
            return this.families.map(family => {
                const familyOptions = this.getOptionsByFamily(family.key)
                const typeCounts: Record<string, number> = {}

                familyOptions.forEach(option => {
                    typeCounts[option.type] = (typeCounts[option.type] || 0) + 1
                })

                return {
                    family: family.key,
                    name: family.name || family.key,
                    color: family.color || getFamilyColor(family.key),
                    icon: family.icon || getFamilyIconName(family.key),
                    count: familyOptions.length,
                    totalSupports: familyOptions.reduce((total, option) =>
                                                        total + (option.currentUserStatus?.countSupports || 0), 0),
                                                        totalComments: familyOptions.reduce((total, option) =>
                                                                                            total + (option.currentUserStatus?.countComments || 0), 0),
                                                                                            types: Object.entries(typeCounts).map(([type, count]) => ({
                                                                                                type,
                                                                                                name: this.getOptionTypeInfo(type)?.name || 
                                                                                                    this.getOptionTypeInfo(type)?.label || 
                                                                                                    type,
                                                                                                count
                                                                                            }))
                }
            }).filter(family => family.count > 0)
        },

        // Refresh option types from session store
        refreshOptionTypes(): void {
            this.initializeOptionTypes()
            this.organizeByFamily()
        },

        // Clear all options
        clear(): void {
            this.options = []
            this.groups = []
            this.optionsByFamily = {}
        }
    }
})
