/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import { AxiosError } from 'axios'

import { Logger } from '../helpers/index.ts'
import { InquiryGroupsAPI } from '../Api/index.ts'
import type { UserType, SupportResult } from '../Types/index.ts'
import { useSessionStore } from './session.ts'
import { useInquiriesStore } from './inquiries.ts'
import { useInquiryGroupsStore } from './inquiryGroups.ts'
import type {
  InquiryGroup,
  InquiryGroupType,
  InquiryGroupConfiguration,
  InquiryGroupStatus,
  PublicationStatus,
  InquiryGroupWorkflowStatus,
  VisibilityType,
  InquiryGroupUIConfig,
  DisplayZone,
} from './inquiryGroups.types.ts'

// ===== TYPES =====
export type InquiryGroupPermissions = {
  view: boolean
  edit: boolean
  delete: boolean
  addInquiries: boolean
  reorderInquiries: boolean
  changeOwner: boolean
  archive: boolean
  clone: boolean
}

export type CurrentUserInquiryGroupStatus = {
  isOwner: boolean
  isLoggedIn: boolean
  userId: string
  userRole: UserType
  canEdit: boolean
  isProtected: boolean
}

// ===== STORE =====
export const useInquiryGroupStore = defineStore('inquiryGroup', {
  // ============================================================
  // STATE - Now matches inquiry.ts pattern with permissions in state
  // ============================================================
  state: () => ({
    id: 0,
    parentId: null as number | null,
    created: 0,
    updated: undefined as number | undefined,
    deleted: 0,
    description: '',
    ownedGroup: '',
    metadata: null as string | null,
    protected_: false,
    allowEdit: false,
    order: 0,
    expire: null as number | null,
    type: 'default',
    title: '',
    titleExt: '',
    slug: '',
    inquiryIds: [] as number[],
    childs: [] as number[],
    coverId: null as number | null,
    miscFields: {} as Record<string, string>,
    trendingScore: undefined as number | undefined,
    meta: 'loaded' as 'loaded' | 'loading' | 'error',
    updating: false,

    // Configuration
    configuration: {
      visibility: 'private' as VisibilityType,
      visibilityGroups: [] as string[],
      visibilityUsers: [] as string[],
      expire: null as number | null,
      supportEngine: [],
      description: '',
      protected: false,
      titleExt: null as string | null,
      ui: {
        experience: 'dashboard',
        features: [] as string[],
        layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
        displayArchitecture: undefined,
      } as InquiryGroupUIConfig,
    },

    // Status - matches inquiry.ts pattern
    status: {
      groupStatus: 'draft' as InquiryGroupWorkflowStatus,
      publicationStatus: 'draft' as PublicationStatus,
      created: 0,
      deleted: 0,
      updated: 0,
      supportResult: [] as SupportResult[],
    } as InquiryGroupStatus,

    // Owner - matches inquiry.ts pattern
    owner: {
      id: '',
      displayName: '',
      type: 'user' as UserType,
      isOwner: false,
      groups: [] as string[],
    },

    // ============================================================
    // ============================================================
    permissions: {
      view: false,
      edit: false,
      delete: false,
      addInquiries: false,
      reorderInquiries: false,
      changeOwner: false,
      archive: false,
      clone: false,
    } as InquiryGroupPermissions,
  }),

  // ============================================================
  // ============================================================
  getters: {
    /**
     * Get the type template from session store
     */
    typeTemplate(): InquiryGroupType | undefined {
      if (!this.type) return undefined
      const sessionStore = useSessionStore()
      return sessionStore.appSettings?.inquiryGroupTypeTab?.find(
        (t: InquiryGroupType) => t.type === this.type || t.group_type === this.type
      )
    },

    /**
     * Get UI configuration from template
     */
    ui(): InquiryGroupUIConfig {
      const template = this.typeTemplate
      if (!template) {
        return {
          experience: 'dashboard',
          features: [],
          layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
        }
      }

      if (Array.isArray(template.ui)) {
        return {
          experience: 'dashboard',
          features: template.ui,
          layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
        }
      }

      const uiConfig = template.ui as InquiryGroupUIConfig
      if (!uiConfig.displayArchitecture) {
        return {
          ...uiConfig,
          displayArchitecture: {},
        }
      }

      if ('display_architecture' in uiConfig && !uiConfig.displayArchitecture) {
        return {
          ...uiConfig,
          displayArchitecture: (uiConfig as any).display_architecture as Record<string, DisplayZone>,
        }
      }

      return uiConfig
    },

    /**
     * Get family from template
     */
    family(): string {
      return this.typeTemplate?.family || ''
    },

    /**
     * Get display architecture from UI config
     */
    displayArchitecture(): Record<string, DisplayZone> | undefined {
      return this.ui?.displayArchitecture
    },

    /**
     * Get experience mode from UI config
     */
    experience(): string {
      return this.ui?.experience || 'dashboard'
    },

    /**
     * Get layout from UI config
     */
    layout(): { type: string; columns: number; rows: number; responsive: boolean } {
      return this.ui?.layout || { type: 'grid', columns: 2, rows: 2, responsive: true }
    },

    /**
     * Get features from UI config
     */
    features(): string[] {
      return this.ui?.features || []
    },

    /**
     * Get allowed inquiry types from template
     */
    allowedInquiryTypes(): string[] {
      const template = this.typeTemplate
      if (!template) return []
      const types = template.allowedInquiryTypes || template.allowed_inquiry_types
      if (typeof types === 'string') {
        return types.split(',').map((s) => s.trim())
      }
      return types || []
    },

    /**
     * Get is_root from template
     */
    isRoot(): boolean {
      return this.typeTemplate?.is_root || false
    },

    /**
     * Get actions from template
     */
    actions(): string[] {
      return this.typeTemplate?.actions || []
    },

    /**
     * Get icon from template
     */
    icon(): string {
      return this.typeTemplate?.icon || 'Folder'
    },

    /**
     * Get label from template
     */
    label(): string {
      return this.typeTemplate?.label || this.type || 'Group'
    },

    /**
     * Get description from template
     */
    templateDescription(): string {
      return this.typeTemplate?.description || ''
    },

    /**
     * Get rules from template
     */
    rules(): Record<string, unknown> {
      return this.typeTemplate?.rules || {}
    },

    /**
     * Get allowed response from template
     */
    allowedResponse(): string[] {
      const template = this.typeTemplate
      if (!template) return []
      const response = template.allowed_response
      if (typeof response === 'string') {
        return response.split(',').map((s) => s.trim())
      }
      return response || []
    },

    /**
     * Get fields from template
     */
    fields(): string[] {
      return this.typeTemplate?.fields || []
    },

    // ============================================================
    // COMPUTED - Basic status (matches inquiry.ts pattern)
    // ============================================================
    isDraft(): boolean {
      return this.status.groupStatus === 'draft'
    },

    isActive(): boolean {
      return this.status.groupStatus === 'active'
    },

    isArchived(): boolean {
      return this.status.groupStatus === 'archived'
    },

    isClosed(): boolean {
      return this.status.groupStatus === 'closed'
    },

    isPublished(): boolean {
      return this.status.publicationStatus === 'published'
    },

    isPending(): boolean {
      return this.status.publicationStatus === 'pending'
    },

    // ============================================================
    // Current user status (matches inquiry.ts pattern)
    // ============================================================
    currentUserStatus(): CurrentUserInquiryGroupStatus {
      const sessionStore = useSessionStore()
      return {
        isOwner: this.owner.id === sessionStore.currentUser.id,
        isLoggedIn: sessionStore.currentUser.id !== '',
        userId: sessionStore.currentUser.id,
        userRole: sessionStore.currentUser.type,
        canEdit: this.allowEdit,
        isProtected: this.protected_,
      }
    },

    // ============================================================
    // Visibility shortcuts (matches inquiry.ts pattern)
    // ============================================================
    visibility: {
      get(): VisibilityType {
        return this.configuration.visibility || 'private'
      },
      set(value: VisibilityType) {
        this.configuration.visibility = value
        void this.updateConfiguration({ visibility: value })
      },
    },

    visibilityGroups: {
      get(): string[] {
        return this.configuration.visibilityGroups || []
      },
      set(groups: string[]) {
        this.configuration.visibilityGroups = groups
        void this.updateConfiguration({ visibilityGroups: groups })
      },
    },

    visibilityUsers: {
      get(): string[] {
        return this.configuration.visibilityUsers || []
      },
      set(users: string[]) {
        this.configuration.visibilityUsers = users
        void this.updateConfiguration({ visibilityUsers: users })
      },
    },

    // ============================================================
    // Full inquiry group object (matches inquiry.ts pattern)
    // ============================================================
    inquiryGroup(): InquiryGroup {
      return {
        id: this.id,
        parentId: this.parentId,
        created: this.created,
        deleted: this.deleted,
        description: this.description || null,
        owner: this.owner,
        type: this.type,
        configuration: {
          visibility: this.configuration.visibility,
          visibilityGroups: this.configuration.visibilityGroups,
          visibilityUsers: this.configuration.visibilityUsers,
          expire: this.configuration.expire,
          supportEngine: this.configuration.supportEngine,
          description: this.configuration.description,
          protected: this.configuration.protected,
          titleExt: this.configuration.titleExt,
          ui: this.configuration.ui,
        },
        status: {
          groupStatus: this.status.groupStatus,
          publicationStatus: this.status.publicationStatus,
          created: this.status.created,
          deleted: this.status.deleted,
          updated: this.status.updated || 0,
          supportResult: this.status.supportResult || null,
        },
        title: this.title,
        titleExt: this.titleExt || null,
        ownedGroup: this.ownedGroup || null,
        order: this.order,
        expire: this.expire,
        metadata: this.metadata,
        coverId: this.coverId,
        protected: this.protected_,
        allowEdit: this.allowEdit,
        inquiryIds: this.inquiryIds,
        childs: this.childs,
        slug: this.slug,
        miscFields: this.miscFields,
        trendingScore: this.trendingScore,
        inquiryGroupType: this.typeTemplate,
        permissions: this.permissions,
      }
    },
  },

  // ============================================================
  // ============================================================
  actions: {
    /**
     * Check if a specific feature is enabled
     */
    hasFeature(featureName: string): boolean {
      return this.features.includes(featureName)
    },

    /**
     * Check if a specific zone exists
     */
    hasZone(zoneName: string): boolean {
      return !!this.displayArchitecture?.[zoneName]
    },

    /**
     * Get UI configuration for a specific zone
     */
    getZoneConfig(zoneName: string): DisplayZone | undefined {
      return this.displayArchitecture?.[zoneName]
    },

    /**
     * Get zone content for a specific zone
     */
    getZoneContent(zoneName: string): string | undefined {
      return this.displayArchitecture?.[zoneName]?.content
    },

    /**
     * Get zone scope for a specific zone
     */
    getZoneScope(zoneName: string): Record<string, unknown> | undefined {
      return this.displayArchitecture?.[zoneName]?.scope
    },

    /**
     * Get zone display config for a specific zone
     */
    getZoneDisplay(zoneName: string): Record<string, unknown> | undefined {
      return this.displayArchitecture?.[zoneName]?.display
    },

    /**
     * Get the default experience for this group type
     */
    getDefaultExperience(): string {
      return this.experience
    },

    /**
     * Sync current group state to the collection store
     */
    syncToCollectionStore() {
      if (this.id === 0) return
      const inquiryGroupsStore = useInquiryGroupsStore()
      inquiryGroupsStore.addOrUpdateInquiryGroupInList({
        inquiryGroup: this.inquiryGroup,
      })
    },

    /**
     * Sync UI configuration from template to configuration.ui
     */
    syncUIToTemplate() {
      const template = this.typeTemplate
      
      if (!this.configuration.ui) {
        this.configuration.ui = {}
      }

      if (!template) {
        if (!this.configuration.ui.experience) {
          this.configuration.ui.experience = 'dashboard'
        }
        if (!this.configuration.ui.layout) {
          this.configuration.ui.layout = { type: 'grid', columns: 2, rows: 2, responsive: true }
        }
        if (!this.configuration.ui.displayArchitecture) {
          this.configuration.ui.displayArchitecture = {}
        }
        this.syncToCollectionStore()
        return
      }

      let uiConfig: InquiryGroupUIConfig
      if (Array.isArray(template.ui)) {
        uiConfig = {
          experience: 'dashboard',
          features: template.ui,
          layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
          displayArchitecture: {},
        }
      } else {
        uiConfig = template.ui as InquiryGroupUIConfig
      }

      if (uiConfig && 'display_architecture' in uiConfig && !uiConfig.displayArchitecture) {
        uiConfig = {
          ...uiConfig,
          displayArchitecture: (uiConfig as any).display_architecture as Record<string, DisplayZone>,
        }
      }

      if (!uiConfig.displayArchitecture) {
        uiConfig.displayArchitecture = {}
      }

      if (!uiConfig.layout) {
        uiConfig.layout = { type: 'grid', columns: 2, rows: 2, responsive: true }
      }

      this.configuration.ui = {
        ...this.configuration.ui,
        ...uiConfig,
        displayArchitecture: {
          ...(this.configuration.ui?.displayArchitecture || {}),
          ...(uiConfig.displayArchitecture || {}),
        },
      }

      this.syncToCollectionStore()
    },

    // ============================================================
    // ============================================================
    calculatePermissions(): void {
      const sessionStore = useSessionStore()
      const isOwner = this.owner.id === sessionStore.currentUser.id
      const isAdmin = sessionStore.currentUser.isAdmin
      const isGroupEditor = sessionStore.currentUser.isGroupEditor
      const isProtected = this.protected_

      this.permissions = {
        view: true,
        edit: (this.allowEdit || isOwner || isAdmin || isGroupEditor) && (!isProtected || isGroupEditor || isAdmin),
        delete: (isOwner || isAdmin) && !isProtected,
        addInquiries: (this.allowEdit || isOwner || isAdmin || isGroupEditor) && ( !isProtected || isAdmin || isGroupEditor ),
        reorderInquiries: (this.allowEdit || isOwner || isAdmin) && !isProtected,
        changeOwner: (isOwner || isAdmin) && !isProtected,
        archive: (isOwner || isAdmin) && !isProtected,
        clone: true,
      }
    },

    /**
     * Patch state from API response - 
     */
    patchFromResponse(data: Partial<InquiryGroup>) {
      // Basic fields
      if (data.id !== undefined) this.id = data.id
      if (data.parentId !== undefined) this.parentId = data.parentId
      if (data.created !== undefined) this.created = data.created
      if (data.updated !== undefined) this.updated = data.updated
      if (data.deleted !== undefined) this.deleted = data.deleted
      if (data.description !== undefined) this.description = data.description || ''
      if (data.ownedGroup !== undefined) this.ownedGroup = data.ownedGroup || ''
      if (data.metadata !== undefined) this.metadata = data.metadata || null
      if (data.protected !== undefined) this.protected_ = data.protected || false
      if (data.allowEdit !== undefined) this.allowEdit = data.allowEdit || false
      if (data.order !== undefined) this.order = data.order || 0
      if (data.expire !== undefined) this.expire = data.expire || null
      if (data.type !== undefined) this.type = data.type || 'default'
      if (data.title !== undefined) this.title = data.title || ''
      if (data.titleExt !== undefined) this.titleExt = data.titleExt || ''
      if (data.slug !== undefined) this.slug = data.slug || ''
      if (data.inquiryIds !== undefined) this.inquiryIds = data.inquiryIds || []
      if (data.childs !== undefined) this.childs = data.childs || []
      if (data.coverId !== undefined) this.coverId = data.coverId || null
      if (data.miscFields !== undefined) this.miscFields = data.miscFields || {}
      if (data.trendingScore !== undefined) this.trendingScore = data.trendingScore
      if (data.owner !== undefined) this.owner = data.owner || this.owner

      // Handle status
      if (data.status) {
        this.status = {
          groupStatus: data.status.groupStatus || this.status.groupStatus || 'draft',
          publicationStatus: data.status.publicationStatus || this.status.publicationStatus || 'draft',
          created: data.status.created !== undefined ? data.status.created : this.status.created,
          deleted: data.status.deleted !== undefined ? data.status.deleted : this.status.deleted,
          updated: data.status.updated !== undefined ? data.status.updated : this.status.updated,
          supportResult: data.status.supportResult || this.status.supportResult || [],
        }
      }

      // Handle configuration
      if (data.configuration) {
        this.configuration = {
          ...this.configuration,
          ...data.configuration,
          ui: data.configuration.ui ? {
            ...this.configuration.ui,
            ...data.configuration.ui,
          } : this.configuration.ui,
        }
      } else if (data.configuration === null) {
        this.resetConfiguration()
      }

      // ============================================================
      // ============================================================
      this.calculatePermissions()

      this.syncUIToTemplate()
      this.syncToCollectionStore()
    },

    resetConfiguration() {
      this.configuration = {
        visibility: 'private',
        visibilityGroups: [],
        visibilityUsers: [],
        expire: null,
        supportEngine: [],
        description: '',
        protected: false,
        titleExt: null,
        ui: {
          experience: 'dashboard',
          features: [],
          layout: { type: 'grid', columns: 2, rows: 2, responsive: true },
          displayArchitecture: {},
        },
      }
      this.status = {
        groupStatus: 'draft',
        publicationStatus: 'draft',
        created: 0,
        deleted: 0,
        updated: 0,
        supportResult: [],
      }
    },

    reset() {
      this.id = 0
      this.parentId = null
      this.created = 0
      this.updated = undefined
      this.deleted = 0
      this.description = ''
      this.ownedGroup = ''
      this.metadata = null
      this.protected_ = false
      this.allowEdit = false
      this.order = 0
      this.expire = null
      this.type = 'default'
      this.title = ''
      this.titleExt = ''
      this.slug = ''
      this.inquiryIds = []
      this.childs = []
      this.coverId = null
      this.miscFields = {}
      this.trendingScore = undefined
      this.resetConfiguration()
      this.owner = {
        id: '',
        displayName: '',
        type: 'user',
        isOwner: false,
        groups: [],
      }
      this.meta = 'loaded'
      this.updating = false
      // Reset permissions
      this.permissions = {
        view: false,
        edit: false,
        delete: false,
        addInquiries: false,
        reorderInquiries: false,
        changeOwner: false,
        archive: false,
        clone: false,
      }
    },

    /**
     * Load inquiry group by ID
     */
    async load(inquiryGroupId?: number | null): Promise<InquiryGroup | void> {
      let groupId = inquiryGroupId
      console.log(' WE LOAD THE GROUP INTO THE STORE ', inquiryGroupId)
      const sessionStore = useSessionStore()
      if (!groupId && sessionStore.route?.params?.id) {
        groupId = Number(sessionStore.route.params.id)
      }

      if (!groupId || groupId === 0) {
        throw new Error('No inquiry group ID provided')
      }

      this.meta = 'loading'
      try {
        const response = await InquiryGroupsAPI.getInquiryGroup(groupId)

        if (!response.data?.inquiryGroup) {
          throw new Error('No inquiry group data in response')
        }

        const groupData = response.data.inquiryGroup
        this.patchFromResponse(groupData)
        this.meta = 'loaded'

        return groupData
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.meta = 'error'
        Logger.error('Error loading inquiry group', { error })
        showError(t('agora', 'Failed to load inquiry group'))
        throw error
      }
    },

    /**
     * Create a new inquiry group
     */
    async add(payload: {
      title?: string
      titleExt?: string
      description?: string
      type?: string
      parentId?: number
      protected?: boolean
      ownedGroup?: string
      groupStatus?: string
      inquiryIds?: number[]
    }): Promise<InquiryGroup | void> {
      try {
        const response = await InquiryGroupsAPI.addGroup({
          title: payload.title,
          titleExt: payload.titleExt,
          type: payload.type || 'default',
          parentId: payload.parentId || null,
          protected: payload.protected || true,
          ownedGroup: payload.ownedGroup,
          groupStatus: payload.groupStatus || 'draft',
        })

        if (response.data?.inquiryGroup) {
          const group = response.data.inquiryGroup
          this.patchFromResponse(group)
          return group
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error adding inquiry group:', { error, payload })
        throw error
      }
    },

    /**
     * Update the current inquiry group
     */
    async update(payload: {
      title?: string
      titleExt?: string
      description?: string
      type?: string
      parentId?: number
      protected?: boolean
      ownedGroup?: string
      groupStatus?: InquiryGroupWorkflowStatus
      expire?: number
      publicationStatus?: PublicationStatus
      configuration?: InquiryGroupConfiguration
    }): Promise<InquiryGroup | void> {
      try {
	   console.log(" UPDATEING publication", payload.publicationStatus)
        const response = await InquiryGroupsAPI.updateGroup(this.id, {
          title: payload.title,
          titleExt: payload.titleExt,
          description: payload.description,
          type: payload.type,
          parentId: payload.parentId,
          protected: payload.protected,
          ownedGroup: payload.ownedGroup,
          groupStatus: payload.groupStatus,
          expire: payload.expire,
          publicationStatus: payload.publicationStatus,
          configuration: payload.configuration,
        })

        if (response.data?.inquiryGroup) {
          this.patchFromResponse(response.data.inquiryGroup)

          emit('update:inquiry-group', {
            store: 'inquiryGroup',
            message: t('agora', 'Inquiry group updated'),
          })

          return response.data.inquiryGroup
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error updating inquiry group', { error, payload })
        throw error
      }
    },

    /**
     * Update configuration only
     */
    async updateConfiguration(configUpdate: Partial<InquiryGroupConfiguration>): Promise<void> {
      if (this.id === 0) return

      this.configuration = {
        ...this.configuration,
        ...configUpdate,
      }

      if (this.updating) return

      try {
        this.updating = true
        await this.update({
          configuration: this.configuration,
        })
        this.syncUIToTemplate()
      } catch (error) {
        Logger.error('Error updating configuration', { error, configUpdate })
        throw error
      } finally {
        this.updating = false
      }
    },

    /**
     * Update publication status
     */
    async updatePublicationStatus(status: PublicationStatus): Promise<void> {
      this.status.publicationStatus = status

      const groupStatusMap: Record<PublicationStatus, InquiryGroupWorkflowStatus> = {
        draft: 'draft',
        pending: 'pending',
        published: 'active',
        archived: 'archived',
        deleted: 'archived',
      }

      try {
        await this.update({
          publicationStatus: status,
        })
      } catch (error) {
        Logger.error('Error updating publication status', { error, status })
        throw error
      }
    },

    /**
     * Update visibility
     */
    async updateVisibility(params: {
      visibility: VisibilityType
      visibilityGroups?: string[]
      visibilityUsers?: string[]
    }): Promise<void> {
      this.configuration.visibility = params.visibility
      if (params.visibilityGroups !== undefined) {
        this.configuration.visibilityGroups = params.visibilityGroups
      }
      if (params.visibilityUsers !== undefined) {
        this.configuration.visibilityUsers = params.visibilityUsers
      }
console.log(" CONFIGRAUTOION UPDATE ", this.configuration)
      try {
        await this.update({ configuration: this.configuration })
      } catch (error) {
        Logger.error('Error updating visibility', { error, params })
        throw error
      }
    },

    /**
     * Add inquiry to group
     */
    async addInquiry(inquiryId: number): Promise<void> {
      try {
        const response = await InquiryGroupsAPI.addInquiryToGroup(inquiryId, this.id)

        if (response.data?.inquiryGroup?.inquiryIds) {
          this.inquiryIds = response.data.inquiryGroup.inquiryIds
          this.syncToCollectionStore()
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error adding inquiry to group', {
          error,
          inquiryId,
          inquiryGroupId: this.id,
        })
        throw error
      }
    },

    /**
     * Remove inquiry from group
     */
    async removeInquiry(inquiryId: number): Promise<void> {
      const inquiryGroupsStore = useInquiryGroupsStore()
      const inquiriesStore = useInquiriesStore()

      try {
        const response = await InquiryGroupsAPI.removeInquiryFromGroup(this.id, inquiryId)

        if (response.data?.inquiryGroup === null) {
          this.reset()
          inquiryGroupsStore.removeInquiryGroup(this.id)
        } else if (response.data?.inquiryGroup?.inquiryIds) {
          this.inquiryIds = response.data.inquiryGroup.inquiryIds
          this.syncToCollectionStore()
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error removing inquiry from group', {
          error,
          inquiryId,
          inquiryGroupId: this.id,
        })
        throw error
      } finally {
        inquiriesStore.load()
      }
    },

    /**
     * Write all changes to API
     */
    async write(): Promise<void> {
      if (!this.title) {
        showError(t('inquiries', 'Group title must not be empty!'))
        return
      }

      this.updating = true
      try {
        const response = await InquiryGroupsAPI.updateGroup(this.id, {
          title: this.title,
          titleExt: this.titleExt,
          description: this.description,
          type: this.type,
          parentId: this.parentId,
          protected: this.protected_,
          ownedGroup: this.ownedGroup,
          groupStatus: this.status.groupStatus,
          configuration: this.configuration,
        })

        if (response.data?.inquiryGroup) {
          this.patchFromResponse(response.data.inquiryGroup)

          emit('update:inquiry-group', {
            store: 'inquiryGroup',
            message: t('inquiries', 'Inquiry group updated'),
          })
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error writing inquiry group:', { error })
        showError(t('inquiries', 'Error writing inquiry group'))
        throw error
      } finally {
        this.updating = false
        const inquiriesStore = useInquiriesStore()
        inquiriesStore.load()
      }
    },

    /**
     * Archive the current inquiry group
     */
    async archive(inquiryGroupId?: number): Promise<void> {
      const groupId = inquiryGroupId || this.id
      try {
        const response = await InquiryGroupsAPI.updateGroup(groupId, {
          groupStatus: 'archived',
        })
        if (response.data?.inquiryGroup) {
          this.patchFromResponse(response.data.inquiryGroup)
          emit('archive:inquiry-group', {
            store: 'inquiryGroup',
            message: t('inquiries', 'Inquiry group archived'),
          })
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error archiving inquiry group', {
          error,
          inquiryGroupId: groupId,
        })
        throw error
      }
    },

    /**
     * Restore an archived inquiry group
     */
    async restore(): Promise<void> {
      try {
        const response = await InquiryGroupsAPI.updateGroup(this.id, {
          groupStatus: 'active',
        })
        if (response.data?.inquiryGroup) {
          this.patchFromResponse(response.data.inquiryGroup)
          emit('restore:inquiry-group', {
            store: 'inquiryGroup',
            message: t('inquiries', 'Inquiry group restored'),
          })
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error restoring inquiry group', {
          error,
          inquiryGroupId: this.id,
        })
        throw error
      }
    },

    /**
     * Delete the current inquiry group
     */
    async deleteGroup(inquiryGroupId?: number): Promise<void> {
      const groupId = inquiryGroupId || this.id
      const inquiryGroupsStore = useInquiryGroupsStore()
      try {
        await InquiryGroupsAPI.deleteGroup(groupId)
        // Clear the current group data after deletion
        this.reset()
        inquiryGroupsStore.removeInquiryGroup(groupId)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error deleting inquiry group', {
          error,
          inquiryGroupId: groupId,
        })
        throw error
      }
    },

    /**
     * Update misc field
     */
    async updateMiscField(key: string, value: string): Promise<void> {
      try {
        await InquiryGroupsAPI.updateMiscField(this.id, { key, value })
        this.miscFields = { ...this.miscFields, [key]: value }
        this.syncToCollectionStore()
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error updating misc field:', { error, key, value })
        throw error
      }
    },

    /**
     * Reorder inquiries
     */
    async reorderInquiries(inquiryIds: number[]): Promise<void> {
      try {
        const response = await InquiryGroupsAPI.reorderInquiriesInGroup(this.id, inquiryIds)
        if (response.data?.inquiryGroup) {
          this.patchFromResponse(response.data.inquiryGroup)
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error reordering inquiries', { error, inquiryGroupId: this.id })
        throw error
      }
    },

    /**
     * Clone the group
     */
    async clone(): Promise<InquiryGroup | void> {
      const inquiryGroupsStore = useInquiryGroupsStore()
      try {
        const response = await InquiryGroupsAPI.cloneGroup(this.id)
        if (response.data?.inquiryGroup) {
          const newGroup = response.data.inquiryGroup
          inquiryGroupsStore.addInquiryGroup(newGroup)
          return newGroup
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error cloning inquiry group', { error, inquiryGroupId: this.id })
        throw error
      }
    },
  },
})
