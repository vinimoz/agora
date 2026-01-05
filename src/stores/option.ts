/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import domPurify from 'dompurify'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { t } from '@nextcloud/l10n'
import moment from '@nextcloud/moment'
import { showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'

import { Logger } from '../helpers/index.ts'
import { PublicAPI, OptionsAPI } from '../Api/index.ts'
import { Chunking, createDefault, Event, StatusResults, User, UserType } from '../Types/index.ts'

import { useInquiryStore } from './inquiry.ts'
import { useSessionStore } from './session.ts'
import { useSubscriptionStore } from './subscription.ts'
import { useSharesStore } from './shares.ts'
import { useCommentsStore } from './comments.ts'
import { useSupportsStore } from './supports.ts'
import { useAppSettingsStore } from '../stores/appSettings.ts'
import { AxiosError } from '@nextcloud/axios'

export type OptionAccessType = 'private' | 'public' | 'open' | 'hidden'
export type OptionStatus = 'draft' | 'published' | 'archived' | 'deleted'

export type OptionConfiguration = {
    access: OptionAccessType
    showResults: string
    allowComment: number
    supportFeature: string
    family: string
}

export type OptionCurrentStatus = {
    created: number
    updated: number
    isArchived: boolean
    isDeleted: boolean
    countParticipants: number
    countComments: number
    countSupports: number
    countPositiveSupports: number
    countNegativeSupports: number
    countNeutralSupports: number
}

export type CurrentUserOptionStatus = {
    isInvolved: boolean
    hasSupported: boolean
    supportValue: number | null
    isLoggedIn: boolean
    isOwner: boolean
    shareToken: string
    userId: string
    userRole: UserType
    optionGroupUserShares: string[]
}

export type OptionPermissions = {
    view: boolean
    edit: boolean
    delete: boolean
    archive: boolean
    support: boolean
    comment: boolean
    addShares: boolean
    addSharesExternal: boolean
    changeForeignSupports: boolean
    changeOwner: boolean
    reorderOptions: boolean
    seeResults: boolean
    seeUsernames: boolean
    subscribe: boolean
    takeOver: boolean
    addOption: boolean
    confirmOption: boolean
}

export type OptionTypeDefinition = {
    key: string
    name: string
    description: string
    family: string
    color: string
    icon: string
    features: string[]
    allowed_child_types?: string[]
    sortOrder: number
    defaultStatus: string
    miscFields?: Array<{
        key: string
        type: string
        label: string
        description?: string
        default?: any
        required?: boolean
        options?: Array<{ value: string; label: string }>
    }>
}

export type Option = {
    id: number
    targetId: number
    parentId: number
    type: string
    text: string
    textSafe: string
    status: string
    sortOrder: number
    configuration: OptionConfiguration
    miscFields: Record<string, any>
    ownedGroup: string
    owner: User
    optionGroups: number[]
    currentUserStatus: CurrentUserOptionStatus
    permissions: OptionPermissions
    children: Option[]
    meta: {
        chunking: Chunking
        status: StatusResults
    }
    inquiryInfo: {
        targetId: number
        inquiryTitle: string
        inquiryType: string
        inquiryAccess: string
    }
    // Computed properties (not in API response)
    _typeInfo?: OptionTypeDefinition
    _familyInfo?: {
        name: string
        color: string
        icon: string
        description: string
    }
}

const markedPrefix = {
    prefix: 'opt-',
}

export const useOptionStore = defineStore('option', {
    state: (): Option => ({
        id: 0,
        targetId: 0,
        parentId: 0,
        type: 'debate',
        text: '',
        textSafe: '',
        status: 'draft',
        sortOrder: 0,
        configuration: {
            access: 'private',
            showResults: 'always',
            allowComment: 1,
            supportFeature: 'none',
            family: 'deliberative',
        },
        miscFields: {},
        ownedGroup: '',
        owner: createDefault<User>(),
        optionGroups: [],
        currentUserStatus: {
            isInvolved: false,
            hasSupported: false,
            supportValue: null,
            isLoggedIn: false,
            isOwner: false,
            shareToken: '',
            userId: '',
            userRole: '',
            optionGroupUserShares: [],
        },
        permissions: {
            view: false,
            edit: false,
            delete: false,
            archive: false,
            support: false,
            comment: false,
            addShares: false,
            addSharesExternal: false,
            changeForeignSupports: false,
            changeOwner: false,
            reorderOptions: false,
            seeResults: false,
            seeUsernames: false,
            subscribe: false,
            takeOver: false,
            addOption: false,
            confirmOption: false,
        },
        children: [],
        meta: {
            chunking: {
                size: 0,
                loaded: 0,
            },
            status: 'loaded',
        },
        inquiryInfo: {
            targetId: 0,
            inquiryTitle: '',
            inquiryType: '',
            inquiryAccess: '',
        },
        _typeInfo: undefined,
        _familyInfo: undefined,
    }),

    getters: {
        // Get option type definition from session store
        typeInfo(): OptionTypeDefinition | undefined {
            const sessionStore = useSessionStore()
            return sessionStore.appSettings?.optionTypesTab?.[this.type]
        },

        // Get family info from type definition
        familyInfo(): { name: string; color: string; icon: string; description: string } | undefined {
            if (!this.typeInfo) return undefined
            
            const familyNames: Record<string, string> = {
                'deliberative': t('agora', 'Deliberative'),
                'consultative': t('agora', 'Consultative'),
                'creative': t('agora', 'Creative'),
                'administrative': t('agora', 'Administrative'),
                'technical': t('agora', 'Technical'),
                'other': t('agora', 'Other')
            }
            
            const familyColors: Record<string, string> = {
                'deliberative': '#4a86e8',
                'consultative': '#6aa84f',
                'creative': '#f1c232',
                'administrative': '#a64d79',
                'technical': '#e69138',
                'other': '#999999'
            }
            
            const familyIcons: Record<string, string> = {
                'deliberative': 'icon-discussion',
                'consultative': 'icon-question',
                'creative': 'icon-lightbulb',
                'administrative': 'icon-settings',
                'technical': 'icon-code',
                'other': 'icon-category-other'
            }
            
            const familyDescriptions: Record<string, string> = {
                'deliberative': t('agora', 'Discussion, arguments, and proposals'),
                'consultative': t('agora', 'Questions and feedback gathering'),
                'creative': t('agora', 'Ideas and innovative suggestions'),
                'administrative': t('agora', 'Procedural and organizational matters'),
                'technical': t('agora', 'Technical details and implementation'),
                'other': t('agora', 'Other types of contributions')
            }
            
            return {
                name: familyNames[this.typeInfo.family] || this.typeInfo.family,
                color: this.typeInfo.color || familyColors[this.typeInfo.family] || '#cccccc',
                icon: this.typeInfo.icon || familyIcons[this.typeInfo.family] || 'icon-file',
                description: familyDescriptions[this.typeInfo.family] || ''
            }
        },

        // Get type display name
        typeDisplayName(): string {
            return this.typeInfo?.name || this.type
        },

        // Get type color
        typeColor(): string {
            return this.typeInfo?.color || this.familyInfo?.color || '#999999'
        },

        // Get type icon
        typeIcon(): string {
            return this.typeInfo?.icon || this.familyInfo?.icon || 'icon-file'
        },

        // Get type description
        typeDescription(): string {
            return this.typeInfo?.description || ''
        },

        // Get allowed features for this option type
        typeFeatures(): string[] {
            return this.typeInfo?.features || []
        },

        // Check if option type supports a specific feature
        supportsFeature: (state) => (feature: string): boolean => {
            return state.typeInfo?.features?.includes(feature) || false
        },

        // Get allowed child types for this option
        allowedChildTypes(): string[] {
            return this.typeInfo?.allowed_child_types || []
        },

        // Check if this option can have children
        canHaveChildren(): boolean {
            return this.allowedChildTypes.length > 0
        },

        // Check if a specific child type is allowed
        isChildTypeAllowed: (state) => (childType: string): boolean => {
            return state.allowedChildTypes.includes(childType)
        },

        // Get misc fields configuration for this option type
        miscFieldsConfig(): Array<{
            key: string
            type: string
            label: string
            description?: string
            default?: any
            required?: boolean
            options?: Array<{ value: string; label: string }>
        }> {
            return this.typeInfo?.miscFields || []
        },

        // Check if option has required misc fields
        hasRequiredMiscFields(): boolean {
            return this.miscFieldsConfig.some(field => field.required)
        },

        // Check if all required misc fields are filled
        allRequiredMiscFieldsFilled(): boolean {
            return this.miscFieldsConfig
                .filter(field => field.required)
                .every(field => {
                    const value = this.miscFields[field.key]
                    return value !== undefined && value !== null && value !== ''
                })
        },

        // Status checks
        isClosed(): boolean {
            return this.status === 'archived' || this.status === 'deleted'
        },

        isPublished(): boolean {
            return this.status === 'published'
        },

        isDraft(): boolean {
            return this.status === 'draft'
        },

        // Permission checks with type features
        canComment(): boolean {
            return this.permissions.comment && 
                   this.configuration.allowComment === 1 &&
                   this.supportsFeature('comments')
        },

        canSupport(): boolean {
            return this.permissions.support && 
                   this.configuration.supportFeature !== 'none' &&
                   this.supportsFeature('supports')
        },

        canAddChildren(): boolean {
            return this.permissions.addOption && 
                   this.canHaveChildren &&
                   !this.isClosed
        },

        hasChildren(): boolean {
            return this.children && this.children.length > 0
        },

        // Type-specific checks
        isArgumentFor(): boolean {
            return this.type === 'argument_for'
        },

        isArgumentAgainst(): boolean {
            return this.type === 'argument_against'
        },

        isDebateArgument(): boolean {
            return this.isArgumentFor || this.isArgumentAgainst
        },

        isProposal(): boolean {
            return this.type === 'proposal'
        },

        isQuestion(): boolean {
            return this.type === 'question'
        },

        isIdea(): boolean {
            return this.type === 'idea'
        },

        // Text rendering
        textMarkDown(): string {
            marked.use(gfmHeadingId(markedPrefix))
            return domPurify.sanitize(marked.parse(this.text).toString())
        },

        formattedCreatedDate(): string {
            return moment.unix(this.meta.chunking.loaded).format('LLL')
        },

        formattedUpdatedDate(): string {
            return moment.unix(this.meta.chunking.size).format('LLL')
        },

        // Parent inquiry information
        parentInquiry(): any {
            const inquiryStore = useInquiryStore()
            return inquiryStore.id === this.targetId ? inquiryStore : null
        },

        belongsToCurrentInquiry(): boolean {
            const inquiryStore = useInquiryStore()
            return this.targetId === inquiryStore.id
        },

        // Validation
        isValid(): boolean {
            if (this.text.trim() === '') return false
            if (this.hasRequiredMiscFields && !this.allRequiredMiscFieldsFilled) return false
            return true
        },

        // Get default status from type definition
        defaultStatus(): string {
            return this.typeInfo?.defaultStatus || 'draft'
        },

        // Get available status transitions for this type
        availableStatuses(): string[] {
            // This would come from type configuration in a real app
            // For now, return basic statuses
            const baseStatuses = ['draft', 'published']
            
            if (this.typeInfo?.features?.includes('archivable')) {
                baseStatuses.push('archived')
            }
            
            return baseStatuses
        },

        // Check if status can be changed to target status
        canChangeStatusTo: (state) => (targetStatus: string): boolean => {
            return state.availableStatuses.includes(targetStatus)
        }
    },

    actions: {
        reset(): void {
            this.$reset()
        },

        // Initialize type info after loading option
        initializeTypeInfo(): void {
            const sessionStore = useSessionStore()
            this._typeInfo = sessionStore.appSettings?.optionTypesTab?.[this.type]
            
            if (this._typeInfo) {
                this._familyInfo = {
                    name: this.familyInfo?.name || '',
                    color: this.familyInfo?.color || '',
                    icon: this.familyInfo?.icon || '',
                    description: this.familyInfo?.description || ''
                }
            }
        },

        async load(optionId: number | null = null): Promise<void> {
            const sessionStore = useSessionStore()
            const sharesStore = useSharesStore()
            const commentsStore = useCommentsStore()
            const supportsStore = useSupportsStore()
            const subscriptionStore = useSubscriptionStore()

            this.meta.status = 'loading'
            try {
                const response = await (() => {
                    if (sessionStore.route.name === 'publicOption') {
                        return PublicAPI.getOption(sessionStore.route.params.token)
                    }
                    if (sessionStore.route.name === 'option') {
                        return OptionsAPI.getFullOption(optionId ?? sessionStore.currentOptionId)
                    }
                })()

                if (!response) {
                    this.$reset()
                    return
                }
                this.$patch(response.data.option)
                sharesStore.shares = response.data.shares
                commentsStore.comments = response.data.comments
                supportsStore.supports = response.data.supports
                subscriptionStore.subscribed = response.data.subscribed

                if (response.data.option.owner.id === sessionStore.currentUser.id)
                    sessionStore.currentUser.isOwner = true
                else sessionStore.currentUser.isOwner = false
                
                // Initialize type info after loading
                this.initializeTypeInfo()
                
                this.meta.status = 'loaded'
                return response
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                this.meta.status = 'error'
                Logger.error('Error loading option', { error })
                throw error
            }
        },

        async loadChildren(): Promise<void> {
            try {
                const response = await OptionsAPI.getChildOptions(this.id)
                this.children = response.data.options
                
                // Initialize type info for children
                this.children.forEach(child => {
                    const sessionStore = useSessionStore()
                    child._typeInfo = sessionStore.appSettings?.optionTypesTab?.[child.type]
                })
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error loading option children', { error })
                throw error
            }
        },

        async create(payload: {
            text: string
            type: string
            targetId?: number
            parentId?: number
            ownedGroup?: string
            access?: string
            showResults?: string
            allowComment?: number
            supportFeature?: string
            family?: string
            status?: string
            miscFields?: Record<string, any>
        }): Promise<Option | void> {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()

            // Validate option type exists
            const typeInfo = sessionStore.appSettings?.optionTypesTab?.[payload.type]
            if (!typeInfo) {
                showError(t('agora', 'Invalid option type'))
                return
            }

            // Validate parent if provided
            if (payload.parentId) {
                const parentOption = await this.getOptionById(payload.parentId)
                if (parentOption && parentOption.typeInfo) {
                    if (parentOption.typeInfo.allowed_child_types && 
                        !parentOption.typeInfo.allowed_child_types.includes(payload.type)) {
                        showError(t('agora', 'This option type cannot be added as a child to the selected parent'))
                        return
                    }
                }
            }

            try {
                // Set defaults from type definition
                const defaultMiscFields = this.getDefaultMiscFieldsForType(payload.type)
                const mergedMiscFields = { ...defaultMiscFields, ...(payload.miscFields || {}) }

                const response = await OptionsAPI.createOption({
                    text: payload.text,
                    type: payload.type,
                    targetId: payload.targetId || inquiryStore.id,
                    parentId: payload.parentId || 0,
                    ownedGroup: payload.ownedGroup || '',
                    access: payload.access || typeInfo?.defaultAccess || 'private',
                    showResults: payload.showResults || 'always',
                    allowComment: payload.allowComment !== undefined ? payload.allowComment : 
                                 (typeInfo?.features?.includes('comments') ? 1 : 0),
                    supportFeature: payload.supportFeature || 
                                   (typeInfo?.features?.includes('supports') ? 'binary' : 'none'),
                    family: payload.family || typeInfo?.family || 'deliberative',
                    status: payload.status || typeInfo?.defaultStatus || 'draft',
                    miscFields: mergedMiscFields,
                })

                const newOption = response.data.option
                // Initialize type info for the new option
                newOption._typeInfo = typeInfo
                
                return newOption
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error creating option:', {
                    error,
                    payload,
                    state: this.$state,
                })

                throw error
            } finally {
                // Reload parent inquiry to update option list
                if (inquiryStore.id) {
                    inquiryStore.load()
                }
            }
        },

        // Get default misc fields for a type
        getDefaultMiscFieldsForType(typeKey: string): Record<string, any> {
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

        // Validate misc fields against type configuration
        validateMiscFields(): { valid: boolean; errors: string[] } {
            const errors: string[] = []
            
            if (!this.typeInfo) {
                return { valid: true, errors } // No validation without type info
            }
            
            this.miscFieldsConfig.forEach(field => {
                if (field.required) {
                    const value = this.miscFields[field.key]
                    if (value === undefined || value === null || value === '') {
                        errors.push(t('agora', '{field} is required', { field: field.label }))
                    }
                }
                
                // Add more validation based on field type if needed
                if (field.type === 'number' && this.miscFields[field.key]) {
                    const numValue = Number(this.miscFields[field.key])
                    if (isNaN(numValue)) {
                        errors.push(t('agora', '{field} must be a number', { field: field.label }))
                    }
                }
            })
            
            return {
                valid: errors.length === 0,
                errors
            }
        },

        async update(payload: {
            id?: number
            text?: string
            type?: string
            targetId?: number
            parentId?: number
            ownedGroup?: string
            access?: string
            showResults?: string
            allowComment?: number
            supportFeature?: string
            family?: string
            status?: string
            miscFields?: Record<string, any>
        }): Promise<Option | void> {
            const inquiryStore = useInquiryStore()
            const sessionStore = useSessionStore()
            
            // Validate type change if provided
            if (payload.type && payload.type !== this.type) {
                const newTypeInfo = sessionStore.appSettings?.optionTypesTab?.[payload.type]
                if (!newTypeInfo) {
                    showError(t('agora', 'Invalid option type'))
                    return
                }
                
                // Validate misc fields for new type
                if (payload.miscFields) {
                    const newTypeMiscConfig = newTypeInfo.miscFields || []
                    const requiredFields = newTypeMiscConfig.filter(f => f.required)
                    const missingFields = requiredFields.filter(f => !(f.key in payload.miscFields))
                    
                    if (missingFields.length > 0) {
                        showError(t('agora', 'Missing required fields for new type: {fields}', {
                            fields: missingFields.map(f => f.label).join(', ')
                        }))
                        return
                    }
                }
            }

            const debouncedLoad = this.$debounce(async () => {
                try {
                    const response = await OptionsAPI.updateOption(payload.id || this.id, {
                        text: payload.text,
                        type: payload.type,
                        targetId: payload.targetId,
                        parentId: payload.parentId,
                        ownedGroup: payload.ownedGroup,
                        access: payload.access,
                        showResults: payload.showResults,
                        allowComment: payload.allowComment,
                        supportFeature: payload.supportFeature,
                        family: payload.family,
                        status: payload.status,
                        miscFields: payload.miscFields,
                    })
                    
                    const updatedOption = response.data.option
                    
                    // Update type info if type changed
                    if (payload.type && payload.type !== this.type) {
                        updatedOption._typeInfo = sessionStore.appSettings?.optionTypesTab?.[payload.type]
                    }
                    
                    return updatedOption
                } catch (error) {
                    if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                        return
                    }
                    Logger.error('Error updating option', {
                        error,
                        state: this.$state,
                    })
                    throw error
                } finally {
                    this.load()
                    if (inquiryStore.id) {
                        inquiryStore.load()
                    }
                }
            }, 500)
            debouncedLoad()
        },

        // Helper method to get option by ID (would need to be implemented)
        async getOptionById(optionId: number): Promise<Option | undefined> {
            // This would typically call an API or check a store
            // For now, return undefined
            return undefined
        },

        // ... rest of the actions remain similar but enhanced with type info
        // (write, delete, archive, restore, clone, transfer, etc.)
        // All should call initializeTypeInfo() after loading/updating

        // Enhanced write action with type validation
        write(): void {
            const inquiryStore = useInquiryStore()
            const debouncedLoad = this.$debounce(async () => {
                if (this.text === '') {
                    showError(t('agora', 'Text must not be empty!'))
                    return
                }

                // Validate misc fields
                const validation = this.validateMiscFields()
                if (!validation.valid) {
                    showError(t('agora', 'Validation errors: {errors}', {
                        errors: validation.errors.join(', ')
                    }))
                    return
                }

                try {
                    const response = await OptionsAPI.updateOptionConfig(this.id, this.configuration)
                    this.$patch(response.data.option)
                    this.initializeTypeInfo() // Re-initialize type info
                    
                    emit(Event.UpdateOption, {
                        store: 'option',
                        message: t('agora', 'Option updated'),
                    })
                } catch (error) {
                    if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                        return
                    }
                    Logger.error('Error updating option:', {
                        error,
                        option: this.$state,
                    })
                    showError(t('agora', 'Error writing option'))
                    throw error
                } finally {
                    this.load()
                    if (inquiryStore.id) {
                        inquiryStore.load()
                    }
                }
            }, 500)
            debouncedLoad()
        },

        // Enhanced updateMiscField with type validation
        async updateMiscField(key: string, value: any): Promise<void> {
            // Validate against field configuration if exists
            const fieldConfig = this.miscFieldsConfig.find(f => f.key === key)
            if (fieldConfig) {
                if (fieldConfig.type === 'number' && value && isNaN(Number(value))) {
                    showError(t('agora', '{field} must be a number', { field: fieldConfig.label }))
                    return
                }
                
                if (fieldConfig.options && !fieldConfig.options.some(opt => opt.value === value)) {
                    showError(t('agora', 'Invalid value for {field}', { field: fieldConfig.label }))
                    return
                }
            }

            try {
                await OptionsAPI.updateOptionMiscField(this.id, { key, value })
                this.miscFields[key] = value
            } catch (error) {
                if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                    return
                }
                Logger.error('Error updating option misc field:', {
                    error,
                    state: this.$state,
                })
                throw error
            }
        }
    }
})
