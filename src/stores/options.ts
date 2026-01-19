/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'

import { Logger } from '../helpers/index.ts'
import { OptionsAPI } from '../Api/index.ts'
import { Event } from '../Types/index.ts'
import { InquiryOptionType } from '../Types/index.ts'
import { useInquiryStore } from './inquiry.ts'
import { useOptionStore } from './option.ts'
import { useSessionStore } from './session.ts'
import { AxiosError } from '@nextcloud/axios'

export type OptionFamily = {
    key: string
    name: string
    description: string
    color: string
    icon: string
    sortOrder: number
    types: InquiryOptionType[]
}

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
    optionTypes: Record<string, InquiryOptionType>
    families: OptionFamily[]
    groups: OptionGroup[]
    optionsByFamily: OptionsByFamily
    loading: boolean
    error: string | null
    lastUpdated: number
    meta: {
        totalOptions: number
        totalGroups: number
        loadedOptions: number
        chunkSize: number
    }
}

export const useOptionsStore = defineStore('options', {
    state: (): OptionsState => ({
        options: [],
        optionTypes: {},
        families: [],
        groups: [],
        optionsByFamily: {},
        loading: false,
        error: null,
        lastUpdated: 0,
        meta: {
            totalOptions: 0,
            totalGroups: 0,
            loadedOptions: 0,
            chunkSize: 20
        }
    }),

    getters: {
        // Get all options for current inquiry
        allOptions(): Option[] {
            return this.options
        },

        // Get option type definitions from session store
        getOptionTypes(): Record<string, InquiryOptionType> {
            const sessionStore = useSessionStore()
            return sessionStore.appSettings?.optionTypesTab || {}
        },

        // Get families from option types
        getFamilies(): OptionFamily[] {
            const types = this.getOptionTypes
            const familiesMap: Record<string, OptionFamily> = {}
            
            // Group types by family
            Object.values(types).forEach((type: InquiryOptionType) => {
                if (!familiesMap[type.family]) {
                    familiesMap[type.family] = {
                        key: type.family,
                        name: this.getFamilyName(type.family),
                        description: this.getFamilyDescription(type.family),
                        color: this.getFamilyColor(type.family),
                        icon: this.getFamilyIcon(type.family),
                        sortOrder: this.getFamilySortOrder(type.family),
                        types: []
                    }
                }
                familiesMap[type.family].types.push(type)
            })
            
            // Sort families and types within each family
            return Object.values(familiesMap)
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(family => ({
                    ...family,
                    types: family.types.sort((a, b) => a.sortOrder - b.sortOrder)
                }))
        },

        // Get options by specific type
        getOptionsByType: (state) => (typeKey: string): Option[] => state.options.filter(option => option.type === typeKey),

        // Get options for a specific family
        getOptionsByFamily: (state) => (familyKey: string): Option[] => {
            const typesInFamily = Object.values(state.optionTypes)
                .filter(type => type.family === familyKey)
                .map(type => type.key)
            
            return state.options.filter(option => typesInFamily.includes(option.type))
        },

        // Get parent options (hierarchical)
        parentOptions(): Option[] {
            return this.options.filter(option => option.parentId === 0)
        },

        // Get child options for a specific parent
        childOptions: (state) => (parentId: number): Option[] => state.options.filter(option => option.parentId === parentId),

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
            return sessionStore.appSettings?.optionTypesTab?.[typeKey]
        },

        // Check if option type is allowed as child
        isAllowedChildType: () => (parentType: string, childType: string): boolean => {
            const typeInfo = this.getOptionTypeInfo(parentType)
            return typeInfo?.allowed_child_types?.includes(childType) || false
        },

        // Get misc fields configuration for a type
        getMiscFieldsForType: () => (typeKey: string): Array<any> => {
            const typeInfo = this.getOptionTypeInfo(typeKey)
            return typeInfo?.miscFields || []
        },

        // Get all allowed types for creating new options
        getAllowedTypes(): InquiryOptionType[] {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()
            const types = sessionStore.appSettings?.optionTypesTab || {}
            
            return Object.values(types)
                .filter(type => {
                    // Check if type is allowed for current inquiry type
                    const inquiryType = inquiryStore.type
                    // Add logic here to filter types based on inquiry type if needed
                    return true
                })
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
            return inquiryStore.permissions.addOptions || false
        },

        // Get options created by current user
        userCreatedOptions(): Option[] {
            const sessionStore = useSessionStore()
            return this.options.filter(option => 
                option.owner.id === sessionStore.currentUser.id
            )
        },

        // Get options supported by current user
        userSupportedOptions(): Option[] {
            const sessionStore = useSessionStore()
            return this.options.filter(option => 
                option.currentUserStatus?.hasSupported && 
                option.currentUserStatus.userId === sessionStore.currentUser.id
            )
        },

        // Helper getters for family display properties
        getFamilyName: () => (familyKey: string): string => {
            const familyNames: Record<string, string> = {
                'deliberative': t('agora', 'Deliberative'),
                'consultative': t('agora', 'Consultative'),
                'creative': t('agora', 'Creative'),
                'administrative': t('agora', 'Administrative'),
                'technical': t('agora', 'Technical'),
                'other': t('agora', 'Other')
            }
            return familyNames[familyKey] || familyKey
        },

        getFamilyDescription: () => (familyKey: string): string => {
            const familyDescriptions: Record<string, string> = {
                'deliberative': t('agora', 'Discussion, arguments, and proposals'),
                'consultative': t('agora', 'Questions and feedback gathering'),
                'creative': t('agora', 'Ideas and innovative suggestions'),
                'administrative': t('agora', 'Procedural and organizational matters'),
                'technical': t('agora', 'Technical details and implementation'),
                'other': t('agora', 'Other types of contributions')
            }
            return familyDescriptions[familyKey] || ''
        },

        getFamilyColor: () => (familyKey: string): string => {
            const familyColors: Record<string, string> = {
                'deliberative': '#4a86e8', // Blue
                'consultative': '#6aa84f', // Green
                'creative': '#f1c232',    // Yellow
                'administrative': '#a64d79', // Purple
                'technical': '#e69138',    // Orange
                'other': '#999999'         // Gray
            }
            return familyColors[familyKey] || '#cccccc'
        },

        getFamilyIcon: () => (familyKey: string): string => {
            const familyIcons: Record<string, string> = {
                'deliberative': 'icon-discussion',
                'consultative': 'icon-question',
                'creative': 'icon-lightbulb',
                'administrative': 'icon-settings',
                'technical': 'icon-code',
                'other': 'icon-category-other'
            }
            return familyIcons[familyKey] || 'icon-file'
        },

        getFamilySortOrder: () => (familyKey: string): number => {
            const familyOrder: Record<string, number> = {
                'deliberative': 1,
                'consultative': 2,
                'creative': 3,
                'administrative': 4,
                'technical': 5,
                'other': 99
            }
            return familyOrder[familyKey] || 100
        }
    },

    actions: {
        reset(): void {
            this.$reset()
        },

        // Initialize option types from session store
        initializeOptionTypes(): void {
            const sessionStore = useSessionStore()
            const optionTypes = sessionStore.appSettings?.optionTypesTab || {}
            
            this.optionTypes = optionTypes
            this.families = this.getFamilies
            
            // Initialize empty arrays for each family
            this.families.forEach(family => {
                if (!this.optionsByFamily[family.key]) {
                    this.optionsByFamily[family.key] = []
                }
            })
        },

        // Load all options for current inquiry
        async load(inquiryId?: number): Promise<void> {
            const inquiryStore = useInquiryStore()
            const targetId = inquiryId || inquiryStore.id
            
            if (!targetId) {
                this.error = t('agora', 'No inquiry selected')
                return
            }

            this.loading = true
            this.error = null

            try {
                // Initialize option types first
                this.initializeOptionTypes()
                
                // Load options
                const response = await OptionsAPI.getOptionsByInquiry(targetId)
                this.options = response.data.options
                this.lastUpdated = Date.now()
                this.meta.totalOptions = this.options.length
                
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
                Logger.error('Error loading options:', { error, inquiryId: targetId })
                throw error
            } finally {
                this.loading = false
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
                    // If type not found, put in 'other' family
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
            
            // For each family, create groups for each type
            this.families.forEach(family => {
                family.types.forEach(type => {
                    const typeOptions = this.options.filter(option => option.type === type.key)
                    if (typeOptions.length > 0) {
                        groups.push({
                            id: type.sortOrder, // Use sortOrder as temporary ID
                            name: type.name,
                            description: type.description,
                            family: family.key,
                            color: type.color || family.color,
                            icon: type.icon,
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
            
            this.groups = groups
        },

        // Add a new option with type validation
        async add(payload: {
            text: string
            type: string
            parentId?: number
            miscFields?: Record<string, any>
        }): Promise<Option | void> {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()

            // Check permissions
            if (!this.canAddOptions) {
                showError(t('agora', 'You do not have permission to add options'))
                return
            }

            // Validate option type exists
            const typeInfo = sessionStore.appSettings?.optionTypesTab?.[payload.type]
            if (!typeInfo) {
                showError(t('agora', 'Invalid option type'))
                return
            }

            // Validate parent type if parentId is provided
            if (payload.parentId) {
                const parentOption = this.options.find(opt => opt.id === payload.parentId)
                if (parentOption) {
                    const parentTypeInfo = sessionStore.appSettings?.optionTypesTab?.[parentOption.type]
                    if (parentTypeInfo?.allowed_child_types && 
                        !parentTypeInfo.allowed_child_types.includes(payload.type)) {
                        showError(t('agora', 'This option type cannot be added as a child to the selected parent'))
                        return
                    }
                }
            }

            try {
                const response = await OptionsAPI.createOption({
                    text: payload.text,
                    type: payload.type,
                    targetId: inquiryStore.id,
                    parentId: payload.parentId || 0,
                    miscFields: payload.miscFields || {}
                })

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

        // Get default misc fields for a type
        getDefaultMiscFields(typeKey: string): Record<string, any> {
            const sessionStore = useSessionStore()
            const typeInfo = sessionStore.appSettings?.optionTypesTab?.[typeKey]
            const defaults: Record<string, any> = {}
            
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
            const parentTypeInfo = sessionStore.appSettings?.optionTypesTab?.[parentOption.type]
            
            if (!parentTypeInfo?.allowed_child_types) return []
            
            return parentTypeInfo.allowed_child_types
                .map(typeKey => sessionStore.appSettings?.optionTypesTab?.[typeKey])
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
            const typeInfo = sessionStore.appSettings?.optionTypesTab?.[typeKey]
            
            if (typeInfo) {
                return {
                    name: typeInfo.name,
                    color: typeInfo.color || this.getFamilyColor(typeInfo.family),
                    icon: typeInfo.icon,
                    family: typeInfo.family
                }
            }
            
            return {
                name: typeKey,
                color: '#999999',
                icon: 'icon-file',
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
                    name: family.name,
                    color: family.color,
                    icon: family.icon,
                    count: familyOptions.length,
                    totalSupports: familyOptions.reduce((total, option) => 
                        total + (option.currentUserStatus?.countSupports || 0), 0),
                    totalComments: familyOptions.reduce((total, option) => 
                        total + (option.currentUserStatus?.countComments || 0), 0),
                    types: Object.entries(typeCounts).map(([type, count]) => ({
                        type,
                        name: this.getOptionTypeInfo(type)?.name || type,
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
