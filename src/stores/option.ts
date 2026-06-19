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
import { OptionsAPI } from '../Api/index.ts'
import {
  Chunking,
  createDefault,
  Event,
  StatusResults,
  User,
  UserType,
  InquiryOptionType,
  SupportResult,
} from '../Types/index.ts'
import { getFamilyColor } from '../helpers/modules/InquiryOptionHelper.ts'

import { useInquiryStore } from './inquiry.ts'
import { useSessionStore } from './session.ts'
import { AxiosError } from '@nextcloud/axios'
import { useSupportResultStore } from './supportResult.ts'

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
  optionStatus: string
  supportResult: SupportResult | null
}

export type CurrentUserOptionStatus = {
  isInvolved: boolean
  hasSupported: boolean
  supportValue: string | null
  supportResult: SupportResult | null
  isLoggedIn: boolean
  isOwner: boolean
  shareToken: string
  userId: string
  userRole: UserType
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

export type Option = {
  id: number
  targetId: number
  parentId: number
  type: string
  family: string
  title: string
  text: string
  textSafe: string
  sortOrder: number
  configuration: OptionConfiguration
  miscFields: array
  ownedGroup: string
  owner: User
  currentUserStatus: CurrentUserOptionStatus
  permissions: OptionPermissions
  status: OptionCurrentStatus
  childs: Option[]
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
  _typeInfo?: InquiryOptionType
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
    type: '',
    family: 'debate',
    text: '',
    title: '',
    textSafe: '',
    sortOrder: 0,
    configuration: {
      access: 'private',
      showResults: 'always',
      allowComment: null,
      supportFeature: 'none',
      family: 'deliberative',
    },
    miscFields: [],
    ownedGroup: '',
    owner: createDefault<User>(),
    currentUserStatus: {
      isInvolved: false,
      hasSupported: false,
      supportValue: null,
      isLoggedIn: false,
      isOwner: false,
      shareToken: '',
      userId: '',
      userRole: '',
    },
    status: {
      created: 0,
      isArchived: false,
      isExpired: false,
      isDeleted: false,
      countParticipants: 0,
      countComments: 0,
      countSupports: 0,
      optionStatus: 'draft',
      supportResult: null,
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
    childs: [],
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
    formattedExpireDate(): string {
      if (this.configuration.expire > 0) {
        return moment.unix(this.configuration.expire).format('LLL')
      }
      return ''
    },

    isExpired(): boolean {
      return this.configuration.expire > 0 && moment.unix(this.configuration.expire).diff() < 1000
    },

    isClosed(): boolean {
      return (
        this.status.optionStatus === 'archived' ||
        this.status.optionStatus === 'deleted' ||
        this.status.isExpired
      )
    },

    isDraft(): boolean {
      return this.status.optionStatus === 'draft'
    },

    isPublished(): boolean {
      return this.status.optionStatus === 'published'
    },

    hasChildren(): boolean {
      return this.childs && this.childs.length > 0
    },

    childCount(): number {
      return (this.childs?.length || 0) + (this.childs?.length || 0)
    },

    // Get option type definition from session store
    typeInfo(): InquiryOptionType | undefined {
      const sessionStore = useSessionStore()
      const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
      return optionTypes.find(
        (opt: InquiryOptionType) => opt.option_type === this.type || opt.optionType === this.type
      )
    },

    familyInfo(): { name: string; color: string; icon: string; description: string } | undefined {
      if (!this.typeInfo?.family) return undefined

      const sessionStore = useSessionStore()
      const family = sessionStore.appSettings?.optionFamilyTab?.find(
        (f) => f.family_type === this.typeInfo!.family
      )

      return {
        name: family?.label || this.typeInfo.family,
        color: getFamilyColor(this.typeInfo.family), // Use the helper
        icon: family?.icon || 'File',
        description: family?.description || this.typeInfo.description || '',
      }
    },

    // Check if option has required misc fields
    hasRequiredMiscFields(): boolean {
      return this.miscFields.some((field) => field.required)
    },

    // Check if all required misc fields are filled
    allRequiredMiscFieldsFilled(): boolean {
      return this.miscFields
        .filter((field) => field.required)
        .every((field) => {
          const value = this.miscFields[field.key]
          return value !== undefined && value !== null && value !== ''
        })
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
    parentInquiry(): int {
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
    canChangeStatusTo:
      (state) =>
      (targetStatus: string): boolean =>
        state.availableStatuses.includes(targetStatus),
  },

  actions: {
    reset(): void {
      this.$reset()
    },

    setOptions(options: Option[]) {
      this.options = options.map((option) => ({
        ...option,
        // Ensure status exists with comment count
        status: option.status || { countComments: 0 },
      }))
    },

    addOption(option: Option) {
      this.options.push({
        ...option,
        status: option.status || { countComments: 0 },
      })
    },

    updateOptionCommentCount(optionId: number, count: number) {
      const option = this.options.find((opt) => opt.id === optionId)
      if (option && option.status) {
        option.status.countComments = count
      }
    },

    // Bulk update all option comment counts
    updateAllCommentCounts(inquiryId: number, comments: Comment[]) {
      this.options.forEach((option) => {
        const count = comments.filter(
          (comment) =>
            comment.inquiryId === inquiryId &&
            comment.optionId === option.id &&
            comment.deleted === 0
        ).length

        if (option.status) {
          option.status.countComments = count
        }
      })
    },

    // Helper method to get option by ID (would need to be implemented)
    async getOptionById(optionId: number): Promise<Option | undefined> {
      try {
        if (optionId) {
          const response = await OptionsAPI.getFullOption(optionId)
          if (response) {
            return response.data
          }
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error getting option by the id :', {
          error,
          state: this.$state,
        })
        throw error
      }

      return undefined
    },

    async setOptionStatus(optionStatus: string): Promise<void> {
      try {
        await OptionsAPI.updateOptionStatus(this.id, optionStatus)
        this.status.optionStatus = optionStatus
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error setting option status:', {
          error,
          state: this.$state,
        })
        throw error
      }
    },
    async toggleArchive(payload: { optionId: number }): Promise<void> {
      const inquiryStore = useInquiryStore()
      try {
        const response = await OptionsAPI.toggleArchive(payload.optionId)
        if (this.id === payload.optionId) {
          this.$patch(response.data.option)
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error archiving/restoring option', {
          error,
          payload,
        })
        throw error
      } finally {
        if (inquiryStore.id) {
          inquiryStore.load()
        }
      }
    },

    async getEnhancedText(payload: { text: string }): Promise<void> {
      try {
        const response = await OptionsAPI.getEnhancedText(payload.text)
        this.text = response.data.enhancedText || this.text
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error getting AI response for option text', {
          error,
        })
        throw error
      }
    },

    async submitOption(action: string): Promise<void> {
      try {
        if (action === 'submit_for_accepted') {
          this.status.optionStatus = 'published'
          this.configuration.access = 'open'
        } else if (action === 'submit_for_rejected') {
          this.status.optionStatus = 'rejected'
          this.configuration.access = 'private'
        } else if (action === 'submit_for_moderate') {
          this.status.optionStatus = 'pending'
          this.configuration.access = 'moderate'
        }
        const response = await OptionsAPI.submitOption(this.id, action)
        if (!response || !response.data) {
          this.$reset()
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error submitting option', { error })
        throw error
      }
    },

    async close(): Promise<void> {
      const inquiryStore = useInquiryStore()
      try {
        const response = await OptionsAPI.closeOption(this.id)
        this.$patch(response.data.option)
        this.status.optionStatus = 'archived'
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error closing option', {
          error,
          optionId: this.id,
        })
        this.load()
        throw error
      } finally {
        if (inquiryStore.id) {
          inquiryStore.load()
        }
      }
    },

    async reopen(): Promise<void> {
      const inquiryStore = useInquiryStore()
      try {
        const response = await OptionsAPI.reopenOption(this.id)
        this.$patch(response.data.option)
        this.status.optionStatus = 'published'
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error reopening option', {
          error,
          optionId: this.id,
        })
        this.load()
        throw error
      } finally {
        if (inquiryStore.id) {
          inquiryStore.load()
        }
      }
    },

    // Initialize type info after loading option
    initializeTypeInfo(): void {
      const sessionStore = useSessionStore()
      const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
      this._typeInfo = optionTypes.find((opt: InquiryOptionType) => opt.option_type === this.type)

      if (this._typeInfo?.family) {
        const family = sessionStore.appSettings?.optionFamilyTab?.find(
          (f) => f.family_type === this._typeInfo!.family
        )

        this._familyInfo = {
          name: family?.label || this._typeInfo.family,
          color: getFamilyColor(this._typeInfo.family), // Use helper
          icon: family?.icon || 'File',
          description: family?.description || this._typeInfo.description || '',
        }
      }
    },

    async load(optionId: number | null = null): Promise<void> {
      const sessionStore = useSessionStore()

      this.meta.status = 'loading'
      try {
        /*
        const response = await (() => {
          if (sessionStore.route.name === 'publicOption') {
            return PublicAPI.getOption(sessionStore.route.params.token)
          }
          if (sessionStore.route.name === 'option') {
            return OptionsAPI.getFullOption(optionId ?? sessionStore.currentOptionId)
          }
        })()*/

        const response = await (() => OptionsAPI.getFullOption(optionId ?? sessionStore.currentOptionId))()

        if (!response) {
          this.$reset()
          return
        }
        this.$patch(response.data.option)

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

    async create(payload: {
      title: string
      text: string
      type: string
      targetId?: number
      parentId?: number
      ownedGroup?: string
      access?: string
      supportFeature?: string
      allowComment?: number
      family: string
      status?: string
      miscFields?: Record<string, { key: string; value: string }>
    }): Promise<Option | void> {
      const inquiryStore = useInquiryStore()

      // Validate parent if provided
      if (payload.parentId) {
        const parentOption = await this.getOptionById(payload.parentId)
        if (parentOption && parentOption.typeInfo) {
          if (
            parentOption.typeInfo.allowed_response &&
            !parentOption.typeInfo.allowed_response.includes(payload.type)
          ) {
            showError(
              t('agora', 'This option type cannot be added as a child to the selected parent')
            )
            return
          }
        }
      }

      try {
        // Set defaults from type definition
        const sessionStore = useSessionStore()
        const typeInfo = sessionStore.appSettings?.inquiryOptionTypeTab?.find(
          (opt: OptionType) => opt.option_type === payload.type
        )

        const defaultMiscFields: Record<string, { key: string; value: string }> = {}
        if (typeInfo?.fields) {
          const fields = Array.isArray(typeInfo.fields) ? typeInfo.fields : []
          fields.forEach((field: { key: string; value: string }) => {
            if (field.default !== undefined) {
              defaultMiscFields[field.key] = field.default
            }
          })
        }

        const mergedMiscFields = { ...defaultMiscFields, ...(payload.miscFields || {}) }

        const response = await OptionsAPI.createOption({
          title: payload.title,
          text: payload.text,
          type: payload.type,
          targetId: payload.targetId || inquiryStore.id,
          parentId: payload.parentId || 0,
          ownedGroup: payload.ownedGroup || '',
          owner: payload.owner || '',
          family: payload.family || '',
          access: payload.access || 'private',
          status: payload.status || 'draft',
          supportFeature: payload.supportFeature || 'none',
          allowComment: payload.allowComment || 0,
          miscFields: mergedMiscFields,
        })

        const newOption = response.data.option
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

    // Validate misc fields against type configuration
    validateMiscFields(): { valid: boolean; errors: string[] } {
      const errors: string[] = []

      if (!this.typeInfo) {
        return { valid: true, errors } // No validation without type info
      }

      this.miscFields.forEach((field) => {
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
        errors,
      }
    },

    async update(
      payload: Partial<{
        id: number
        title: string
        text: string
        type: string
        targetId: number
        parentId: number
        ownedGroup: string
        access: string
        showResults: string
        allowComment: number
        supportFeature: string
        family: string
        status: string
        miscFields: Record<string, { key: string; value: string }>
      }>
    ): Promise<Option | void> {
      if (!payload || typeof payload !== 'object') {
        Logger.error('updateOption called with invalid payload', { payload })
        return
      }

      const debouncedLoad = this.$debounce(async () => {
        let updatedOption: Option | undefined

        try {
          const response = await OptionsAPI.updateOption(payload.id ?? this.id, {
            title: payload.title ?? '',
            text: payload.text ?? '',
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
            miscFields: payload.miscFields ?? {},
          })

          updatedOption = response?.data?.option

          if (!updatedOption?.id) {
            throw new Error('No option returned from API')
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
          if (updatedOption?.id) {
            this.load(updatedOption.id)
          }
        }
      }, 500)

      debouncedLoad()
    },

    async loadChildren(): Promise<void> {
      try {
        const response = await OptionsAPI.getChildOptions(this.id)
        this.childs = response.data.options

        // Initialize type info for childs
        const sessionStore = useSessionStore()
        const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []

        this.childs.forEach((child) => {
          child._typeInfo = optionTypes.find(
            (opt: InquiryOptionType) => opt.option_type === child.type
          )
        })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error loading option children', { error })
        throw error
      }
    },

    async addChild(payload: {
      text?: string
      type?: string
      ownedGroup?: string
      access?: string
      status?: string
      miscFields?: Record<string, { key: string; value: string }>
    }): Promise<Option | void> {
      try {
        const response = await OptionsAPI.addChildOption(this.id, {
          text: payload.text || '',
          type: payload.type || 'debate',
          ownedGroup: payload.ownedGroup || '',
          access: payload.access || 'private',
          status: payload.status || 'draft',
          miscFields: payload.miscFields || {},
        })

        const newChild = response.data.option
        this.childs.push(newChild)

        return newChild
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error adding child option:', {
          error,
          payload,
        })
        throw error
      }
    },

    async delete(): Promise<void> {
      const sessionStore = useSessionStore()

      try {
        // Check if option can be deleted
        if (!this.permissions.delete) {
          showError(t('agora', 'You do not have permission to delete this option'))
          return
        }

        // Confirm deletion for published/archived options
        if (this.isPublished || this.isClosed) {
          // Should show a confirmation dialog in UI
          const confirmed = confirm(t('agora', 'Are you sure you want to delete this option?'))
          if (!confirmed) return
        }

        // Emit event
        emit(Event.DeleteOption, {
          optionId: this.id,
          message: t('agora', 'Option deleted'),
        })

        // Reset store if this is the current option
        if (sessionStore.currentOptionId === this.id) {
          this.reset()
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error deleting option:', {
          error,
          optionId: this.id,
        })

        if (error.response?.status === 403) {
          showError(t('agora', 'You do not have permission to delete this option'))
        } else if (error.response?.status === 409) {
          showError(t('agora', 'Cannot delete option with children. Please delete children first.'))
        } else {
          showError(t('agora', 'Error deleting option'))
        }
        throw error
      }
    },

    async deleteRecursive(): Promise<void> {
      const inquiryStore = useInquiryStore()

      try {
        // Check if has children
        if (!this.hasChildren) {
          return this.delete() // Use regular delete if no children
        }

        // Confirm recursive deletion
        const confirmed = confirm(
          t('agora', 'This option has {count} children. Delete them too?', {
            count: this.children.length,
          })
        )
        if (!confirmed) return

        const deleteChildrenRecursively = async (option: Option): Promise<void> => {
          // Load children if not loaded
          if (!option.children || option.children.length === 0) {
            await this.loadChildren()
          }

          // Delete children first (depth-first)
          for (const child of option.children) {
            await deleteChildrenRecursively(child)
          }

          // Delete this option
          await OptionsAPI.deleteOption(option.id)
        }

        await deleteChildrenRecursively(this)

        emit(Event.DeleteOption, {
          optionId: this.id,
          recursive: true,
          message: t('agora', 'Option and children deleted'),
        })

        this.reset()

        if (inquiryStore.id) {
          inquiryStore.load()
        }
      } catch (error) {
        Logger.error('Error recursively deleting option:', {
          error,
          optionId: this.id,
        })
        throw error
      }
    },

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
          showError(
            t('agora', 'Validation errors: {errors}', {
              errors: validation.errors.join(', '),
            })
          )
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
    async updateMiscField(key: string, value: { key: string; value: string }): Promise<void> {
      // Validate against field configuration if exists
      if (this.miscFields && Array.isArray(this.miscFields)) {
        const fieldConfig = this.miscFields.find((f) => f.key === key)
        if (fieldConfig) {
          if (fieldConfig.type === 'number' && value && isNaN(Number(value))) {
            showError(t('agora', '{field} must be a number', { field: fieldConfig.label }))
            return
          }

          if (fieldConfig.options && !fieldConfig.options.some((opt) => opt.value === value)) {
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
    },
  },
})
