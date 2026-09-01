/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import { AxiosError } from 'axios'

import { Logger } from '../helpers/index.ts'
import { InquiryGroupsAPI } from '../Api/index.ts'
import { UserType, SupportResult } from '../Types/index.ts'
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
export const useInquiryGroupStore = defineStore('inquiryGroup', () => {
  // ============================================================
  // DEPENDENCIES
  // ============================================================
  const sessionStore = useSessionStore()
  const inquiriesStore = useInquiriesStore()
  const inquiryGroupsStore = useInquiryGroupsStore()

  // ============================================================
  // STATE
  // ============================================================
  const id = ref(0)
  const parentId = ref<number | null>(null)
  const created = ref(0)
  const updated = ref<number | undefined>(undefined)
  const deleted = ref(0)
  const description = ref('')
  const ownedGroup = ref('')
  const metadata = ref<string | null>(null)
  const protected_ = ref(false)
  const allowEdit = ref(false)
  const order = ref(0)
  const expire = ref<number | null>(null)
  const groupStatus = ref<InquiryGroupWorkflowStatus>('draft')
  const publicationStatus = ref<PublicationStatus>('draft')
  const type = ref<string>('default')
  const title = ref('')
  const titleExt = ref('')
  const slug = ref('')
  const inquiryIds = ref<number[]>([])
  const childs = ref<number[]>([])
  const coverId = ref<number | null>(null)
  const miscFields = ref<Record<string, string>>({})
  const trendingScore = ref<number | undefined>(undefined)
  const supportResult = ref<SupportResult[] | null>(null)
  const meta = ref<'loaded' | 'loading' | 'error'>('loaded')
  const updating = ref(false)

  // Configuration
  const configuration = ref<InquiryGroupConfiguration>({
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
      layout: { type: 'grid', columns: 1, rows: 1, responsive: true },
      displayArchitecture: undefined,
    } as InquiryGroupUIConfig,
  })

  // Owner
  const owner = ref({
    id: '',
    displayName: '',
    type: 'user' as UserType,
    isOwner: false,
    groups: [],
  })

  // ============================================================
  // COMPUTED - Template-based getters from sessionStore
  // ============================================================

  /**
   * Get the type template from session store
   */
  const typeTemplate = computed((): InquiryGroupType | undefined => {
    if (!type.value) return undefined

    // Find the type template in session store
    return sessionStore.appSettings?.inquiryGroupTypeTab?.find(
      (t: InquiryGroupType) => t.type === type.value || t.group_type === type.value
    )
  })

  /**
   * Get UI configuration from template
   */
  const ui = computed((): InquiryGroupUIConfig | undefined => {
    const template = typeTemplate.value
    console.log(' WE GET THE TEMPLATE UI ', template)
    if (!template) return undefined

    // If ui is a string array, convert to proper config
    if (Array.isArray(template.ui)) {
      return {
        experience: 'dashboard',
        features: template.ui,
        layout: { type: 'grid', columns: 1, rows: 1, responsive: true },
      } as InquiryGroupUIConfig
    }

    const uiConfig = template.ui as InquiryGroupUIConfig

    // If the config has display_architecture (snake_case from API), convert to displayArchitecture (camelCase)
    if (uiConfig && 'display_architecture' in uiConfig && !uiConfig.displayArchitecture) {
      return {
        ...uiConfig,
        displayArchitecture: uiConfig.display_architecture as Record<string, DisplayZone>,
      }
    }

    return uiConfig
  })

  /**
   * Get family from template
   */
  const family = computed(() => typeTemplate.value?.family || '')

  /**
   * Get display architecture from UI config
   */
  const displayArchitecture = computed(() => ui.value?.displayArchitecture)

  /**
   * Get experience mode from UI config
   */
  const experience = computed(() => ui.value?.experience || 'dashboard')

  /**
   * Get layout from UI config
   */
  const layout = computed(
    () => ui.value?.layout || { type: 'grid', columns: 1, rows: 1, responsive: true }
  )

  /**
   * Get features from UI config
   */
  const features = computed(() => ui.value?.features || [])

  /**
   * Get allowed inquiry types from template
   */
  const allowedInquiryTypes = computed((): string[] => {
    const template = typeTemplate.value
    if (!template) return []

    const types = template.allowedInquiryTypes || template.allowed_inquiry_types
    if (typeof types === 'string') {
      return types.split(',').map((s) => s.trim())
    }
    return types || []
  })

  /**
   * Get is_root from template
   */
  const isRoot = computed(() => typeTemplate.value?.is_root || false)

  /**
   * Get actions from template
   */
  const actions = computed(() => typeTemplate.value?.actions || [])

  /**
   * Get icon from template
   */
  const icon = computed(() => typeTemplate.value?.icon || 'Folder')

  /**
   * Get label from template
   */
  const label = computed(() => typeTemplate.value?.label || type.value || 'Group')

  /**
   * Get description from template
   */
  const templateDescription = computed(() => typeTemplate.value?.description || '')

  /**
   * Get rules from template
   */
  const rules = computed(() => typeTemplate.value?.rules || {})

  /**
   * Get allowed response from template
   */
  const allowedResponse = computed((): string[] => {
    const template = typeTemplate.value
    if (!template) return []

    const response = template.allowed_response
    if (typeof response === 'string') {
      return response.split(',').map((s) => s.trim())
    }
    return response || []
  })

  /**
   * Get fields from template
   */
  const fields = computed(() => typeTemplate.value?.fields || [])

  /**
   * Check if a specific feature is enabled
   * @param featureName
   */
  function hasFeature(featureName: string): boolean {
    return features.value.includes(featureName)
  }

  /**
   * Check if a specific zone exists
   * @param zoneName
   */
  function hasZone(zoneName: string): boolean {
    return !!displayArchitecture.value?.[zoneName]
  }

  /**
   * Get UI configuration for a specific zone
   * @param zoneName
   */
  function getZoneConfig(zoneName: string): DisplayZone | undefined {
    return displayArchitecture.value?.[zoneName]
  }

  /**
   * Get zone content for a specific zone
   * @param zoneName
   */
  function getZoneContent(zoneName: string): string | undefined {
    return displayArchitecture.value?.[zoneName]?.content
  }

  /**
   * Get zone scope for a specific zon
   * @param zoneName
   */
  function getZoneScope(zoneName: string): Record<string, unknown> | undefined {
    return displayArchitecture.value?.[zoneName]?.scope
  }

  /**
   * Get zone display config for a specific zone
   * @param zoneName
   */
  function getZoneDisplay(zoneName: string): Record<string, unknown> | undefined {
    return displayArchitecture.value?.[zoneName]?.display
  }

  /**
   * Get the default experience for this group type
   */
  function getDefaultExperience(): string {
    return experience.value
  }

  // ============================================================
  // COMPUTED - Basic
  // ============================================================
  const status = computed<InquiryGroupStatus>(() => ({
    groupStatus: groupStatus.value,
    publicationStatus: publicationStatus.value,
    created: created.value,
    deleted: deleted.value,
    updated: updated.value,
    supportResult: supportResult.value,
  }))

  const isDraft = computed(() => groupStatus.value === 'draft')
  const isActive = computed(() => groupStatus.value === 'active')
  const isArchived = computed(() => groupStatus.value === 'archived')
  const isClosed = computed(() => groupStatus.value === 'closed')

  const isPublished = computed(() => publicationStatus.value === 'published')
  const isPending = computed(() => publicationStatus.value === 'pending')

  const currentUserStatus = computed<CurrentUserInquiryGroupStatus>(() => ({
    isOwner: owner.value.id === sessionStore.currentUser.id,
    isLoggedIn: sessionStore.currentUser.id !== '',
    userId: sessionStore.currentUser.id,
    userRole: sessionStore.currentUser.type,
    canEdit: allowEdit.value,
    isProtected: protected_.value,
  }))

  const permissions = computed<InquiryGroupPermissions>(() => {
    const isOwner = owner.value.id === sessionStore.currentUser.id
    const isAdmin = sessionStore.currentUser.type === 'admin'
    const isProtected = protected_.value

    return {
      view: true,
      edit: (allowEdit.value || isOwner || isAdmin) && !isProtected,
      delete: (isOwner || isAdmin) && !isProtected,
      addInquiries: (allowEdit.value || isOwner || isAdmin) && !isProtected,
      reorderInquiries: (allowEdit.value || isOwner || isAdmin) && !isProtected,
      changeOwner: (isOwner || isAdmin) && !isProtected,
      archive: (isOwner || isAdmin) && !isProtected,
      clone: true,
    }
  })

  // Visibility shortcuts
  const visibility = computed({
    get: () => configuration.value.visibility || 'private',
    set: (value: VisibilityType) => {
      configuration.value.visibility = value
      void updateConfiguration({ visibility: value })
    },
  })

  const visibilityGroups = computed({
    get: () => configuration.value.visibilityGroups || [],
    set: (groups: string[]) => {
      configuration.value.visibilityGroups = groups
      void updateConfiguration({ visibilityGroups: groups })
    },
  })

  const visibilityUsers = computed({
    get: () => configuration.value.visibilityUsers || [],
    set: (users: string[]) => {
      configuration.value.visibilityUsers = users
      void updateConfiguration({ visibilityUsers: users })
    },
  })

  // Full inquiry group object - EXACTLY matching InquiryGroup interface
  const inquiryGroup = computed<InquiryGroup>(() => ({
    id: id.value,
    parentId: parentId.value,
    created: created.value,
    deleted: deleted.value,
    description: description.value || null,
    owner: owner.value,
    type: type.value,
    configuration: {
      visibility: configuration.value.visibility,
      visibilityGroups: configuration.value.visibilityGroups,
      visibilityUsers: configuration.value.visibilityUsers,
      expire: configuration.value.expire,
      supportEngine: configuration.value.supportEngine,
      description: configuration.value.description,
      protected: configuration.value.protected,
      titleExt: configuration.value.titleExt,
      ui: configuration.value.ui,
    },
    status: {
      groupStatus: groupStatus.value,
      publicationStatus: publicationStatus.value,
      created: created.value,
      deleted: deleted.value,
      updated: updated.value,
      supportResult: supportResult.value,
    },
    title: title.value,
    titleExt: titleExt.value || null,
    ownedGroup: ownedGroup.value || null,
    order: order.value,
    expire: expire.value,
    metadata: metadata.value,
    coverId: coverId.value,
    protected: protected_.value,
    allowEdit: allowEdit.value,
    inquiryIds: inquiryIds.value,
    childs: childs.value,
    slug: slug.value,
    miscFields: miscFields.value,
    trendingScore: trendingScore.value,
    inquiryGroupType: typeTemplate.value,
  }))

  // ============================================================
  // SYNC HELPERS
  // ============================================================

  /**
   * Sync current group state to the collection store
   * This ensures inquiryGroupsStore is always up to date
   */
  function syncToCollectionStore() {
    if (id.value === 0) return
    inquiryGroupsStore.addOrUpdateInquiryGroupInList({
      inquiryGroup: inquiryGroup.value,
    })
  }


  /**
 * Sync UI configuration from template to configuration.ui
 * This should be called whenever the type changes or the group loads
 */
function syncUIToTemplate() {
  const template = typeTemplate.value
  if (!template?.ui) return

  // If UI is an array (legacy), convert to object
  let uiConfig: InquiryGroupUIConfig
  if (Array.isArray(template.ui)) {
    uiConfig = {
      experience: 'dashboard',
      features: template.ui,
      layout: { type: 'grid', columns: 1, rows: 1, responsive: true },
    }
  } else {
    uiConfig = template.ui as InquiryGroupUIConfig
  }

  // Convert snake_case to camelCase if needed
  if (uiConfig && 'display_architecture' in uiConfig && !uiConfig.displayArchitecture) {
    uiConfig = {
      ...uiConfig,
      displayArchitecture: uiConfig.display_architecture as Record<string, DisplayZone>,
    }
  }

  configuration.value.ui = uiConfig
  syncToCollectionStore()
}

  /**
   * Patch state from API response
   * @param data
   */
  function patchFromResponse(data: Partial<InquiryGroup>) {
    if (data.id !== undefined) id.value = data.id
    if (data.parentId !== undefined) parentId.value = data.parentId
    if (data.created !== undefined) created.value = data.created
    if (data.updated !== undefined) updated.value = data.updated
    if (data.deleted !== undefined) deleted.value = data.deleted
    if (data.description !== undefined) description.value = data.description || ''
    if (data.ownedGroup !== undefined) ownedGroup.value = data.ownedGroup || ''
    if (data.metadata !== undefined) metadata.value = data.metadata || null
    if (data.protected !== undefined) protected_.value = data.protected || false
    if (data.allowEdit !== undefined) allowEdit.value = data.allowEdit || false
    if (data.order !== undefined) order.value = data.order || 0
    if (data.expire !== undefined) expire.value = data.expire || null
    if (data.groupStatus !== undefined) groupStatus.value = data.groupStatus || 'draft'
    if (data.publicationStatus !== undefined)
      publicationStatus.value = data.publicationStatus || 'draft'
    if (data.type !== undefined) type.value = data.type || 'default'
    if (data.title !== undefined) title.value = data.title || ''
    if (data.titleExt !== undefined) titleExt.value = data.titleExt || ''
    if (data.slug !== undefined) slug.value = data.slug || ''
    if (data.inquiryIds !== undefined) inquiryIds.value = data.inquiryIds || []
    if (data.childs !== undefined) childs.value = data.childs || []
    if (data.coverId !== undefined) coverId.value = data.coverId || null
    if (data.miscFields !== undefined) miscFields.value = data.miscFields || {}
    if (data.trendingScore !== undefined) trendingScore.value = data.trendingScore
    if (data.owner !== undefined) owner.value = data.owner || owner.value

    // Handle status-related fields from nested status object
    if (data.status) {
      if (data.status.updated !== undefined) updated.value = data.status.updated
      if (data.status.supportResult !== undefined) supportResult.value = data.status.supportResult
      if (data.status.groupStatus !== undefined) groupStatus.value = data.status.groupStatus
      if (data.status.publicationStatus !== undefined)
        publicationStatus.value = data.status.publicationStatus
      if (data.status.created !== undefined) created.value = data.status.created
      if (data.status.deleted !== undefined) deleted.value = data.status.deleted
    }

    // Handle configuration
    if (data.configuration !== undefined) {
      configuration.value = {
        ...configuration.value,
        ...data.configuration,
      }
    }

    syncUIToTemplate()
    
    // Sync to collection store
    syncToCollectionStore()
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  function reset() {
    id.value = 0
    parentId.value = null
    created.value = 0
    updated.value = undefined
    deleted.value = 0
    description.value = ''
    ownedGroup.value = ''
    metadata.value = null
    protected_.value = false
    allowEdit.value = false
    order.value = 0
    expire.value = null
    groupStatus.value = 'draft'
    publicationStatus.value = 'draft'
    type.value = 'default'
    title.value = ''
    titleExt.value = ''
    slug.value = ''
    inquiryIds.value = []
    childs.value = []
    coverId.value = null
    miscFields.value = {}
    trendingScore.value = undefined
    supportResult.value = null
    configuration.value = {
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
        layout: { type: 'grid', columns: 1, rows: 1, responsive: true },
        displayArchitecture: undefined,
      } as InquiryGroupUIConfig,
    }
    owner.value = {
      id: '',
      displayName: '',
      type: 'user',
      isOwner: false,
      groups: [],
    }
    meta.value = 'loaded'
    updating.value = false
  }

  /**
   * Load inquiry group by ID
   * @param inquiryGroupId
   */
  async function load(inquiryGroupId?: number | null): Promise<InquiryGroup | void> {
    let groupId = inquiryGroupId
    console.log(' WE LOAD THE GROUP INTO THE STORE ', inquiryGroupId)
    if (!groupId && sessionStore.route?.params?.id) {
      groupId = Number(sessionStore.route.params.id)
    }

    if (!groupId || groupId === 0) {
      throw new Error('No inquiry group ID provided')
    }

    meta.value = 'loading'
    try {
      const response = await InquiryGroupsAPI.getInquiryGroup(groupId)

      if (!response.data?.inquiryGroup) {
        throw new Error('No inquiry group data in response')
      }

      const groupData = response.data.inquiryGroup
      patchFromResponse(groupData)
      meta.value = 'loaded'

      return groupData
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      meta.value = 'error'
      Logger.error('Error loading inquiry group', { error })
      showError(t('agora', 'Failed to load inquiry group'))
      throw error
    }
  }

  /**
   * Create a new inquiry group
   * @param payload
   */
  async function add(payload: {
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
        patchFromResponse(group)
        return group
      }
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error adding inquiry group:', { error, payload })
      throw error
    }
  }

  /**
   * Update the current inquiry group
   * @param payload
   */
  async function update(payload: {
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
      const response = await InquiryGroupsAPI.updateGroup(id.value, {
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
        patchFromResponse(response.data.inquiryGroup)

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
  }

  /**
   * Update configuration only
   * @param configUpdate
   */
  async function updateConfiguration(
    configUpdate: Partial<InquiryGroupConfiguration>
  ): Promise<void> {
    if (id.value === 0) return

    configuration.value = {
      ...configuration.value,
      ...configUpdate,
    }

    if (updating.value) return

    try {
      updating.value = true
      await update({
        configuration: configuration.value,
      })
    syncUIToTemplate()
    } catch (error) {
      Logger.error('Error updating configuration', { error, configUpdate })
      throw error
    } finally {
      updating.value = false
    }
  }

  /**
   * Update publication status
   * @param status
   */
  async function updatePublicationStatus(status: PublicationStatus): Promise<void> {
    publicationStatus.value = status

    const groupStatusMap: Record<PublicationStatus, InquiryGroupWorkflowStatus> = {
      draft: 'draft',
      pending: 'draft',
      published: 'active',
      archived: 'archived',
      deleted: 'archived',
    }

    try {
      await update({
        publicationStatus: status,
        groupStatus: groupStatusMap[status],
      })
    } catch (error) {
      Logger.error('Error updating publication status', { error, status })
      throw error
    }
  }

  /**
   * Update visibility
   * @param params
   */
  async function updateVisibility(params: {
    visibility: VisibilityType
    visibilityGroups?: string[]
    visibilityUsers?: string[]
  }): Promise<void> {
    configuration.value.visibility = params.visibility
    if (params.visibilityGroups !== undefined) {
      configuration.value.visibilityGroups = params.visibilityGroups
    }
    if (params.visibilityUsers !== undefined) {
      configuration.value.visibilityUsers = params.visibilityUsers
    }

    try {
      await update({ configuration: configuration.value })
    } catch (error) {
      Logger.error('Error updating visibility', { error, params })
      throw error
    }
  }

  /**
   * Add inquiry to group
   * @param inquiryId
   */
  async function addInquiry(inquiryId: number): Promise<void> {
    try {
      const response = await InquiryGroupsAPI.addInquiryToGroup(inquiryId, id.value)

      if (response.data?.inquiryGroup?.inquiryIds) {
        inquiryIds.value = response.data.inquiryGroup.inquiryIds
        syncToCollectionStore()
      }
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error adding inquiry to group', {
        error,
        inquiryId,
        inquiryGroupId: id.value,
      })
      throw error
    }
  }

  /**
   * Remove inquiry from group
   * @param inquiryId
   */
  async function removeInquiry(inquiryId: number): Promise<void> {
    try {
      const response = await InquiryGroupsAPI.removeInquiryFromGroup(id.value, inquiryId)

      if (response.data?.inquiryGroup === null) {
        reset()
        inquiryGroupsStore.removeInquiryGroup(id.value)
      } else if (response.data?.inquiryGroup?.inquiryIds) {
        inquiryIds.value = response.data.inquiryGroup.inquiryIds
        syncToCollectionStore()
      }
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error removing inquiry from group', {
        error,
        inquiryId,
        inquiryGroupId: id.value,
      })
      throw error
    } finally {
      inquiriesStore.load()
    }
  }

  /**
   * Write all changes to API
   */
  async function write(): Promise<void> {
    if (!title.value) {
      showError(t('inquiries', 'Group title must not be empty!'))
      return
    }

    updating.value = true
    try {
      const response = await InquiryGroupsAPI.updateGroup(id.value, {
        title: title.value,
        titleExt: titleExt.value,
        description: description.value,
        type: type.value,
        parentId: parentId.value,
        protected: protected_.value,
        ownedGroup: ownedGroup.value,
        groupStatus: groupStatus.value,
        configuration: configuration.value,
      })

      if (response.data?.inquiryGroup) {
        patchFromResponse(response.data.inquiryGroup)

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
      updating.value = false
      inquiriesStore.load()
    }
  }

  /**
   * Archive the current inquiry group
   * @param inquiryGroupId - Optional group ID to archive (defaults to current group)
   */
  async function archive(inquiryGroupId?: number): Promise<void> {
    const groupId = inquiryGroupId || id.value
    try {
      const response = await InquiryGroupsAPI.updateGroup(groupId, {
        groupStatus: 'archived',
      })
      if (response.data?.inquiryGroup) {
        patchFromResponse(response.data.inquiryGroup)
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
  }

  /**
   * Restore an archived inquiry group
   */
  async function restore(): Promise<void> {
    try {
      const response = await InquiryGroupsAPI.updateGroup(id.value, {
        groupStatus: 'active',
      })
      if (response.data?.inquiryGroup) {
        patchFromResponse(response.data.inquiryGroup)
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
        inquiryGroupId: id.value,
      })
      throw error
    }
  }

  /**
   * Delete the current inquiry group
   * @param inquiryGroupId - Optional group ID to delete
   */
  async function deleteGroup(inquiryGroupId?: number): Promise<void> {
    const groupId = inquiryGroupId || id.value
    try {
      await InquiryGroupsAPI.deleteGroup(groupId)
      // Clear the current group data after deletion
      reset()
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
  }

  /**
   * Update misc field
   * @param key
   * @param value
   */
  async function updateMiscField(key: string, value: string): Promise<void> {
    try {
      await InquiryGroupsAPI.updateMiscField(id.value, { key, value })
      miscFields.value = { ...miscFields.value, [key]: value }
      syncToCollectionStore()
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error updating misc field:', { error, key, value })
      throw error
    }
  }

  /**
   * Reorder inquiries
   * @param inquiryIds
   */
  async function reorderInquiries(inquiryIds: number[]): Promise<void> {
    try {
      const response = await InquiryGroupsAPI.reorderInquiriesInGroup(id.value, inquiryIds)
      if (response.data?.inquiryGroup) {
        patchFromResponse(response.data.inquiryGroup)
      }
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error reordering inquiries', { error, inquiryGroupId: id.value })
      throw error
    }
  }

  /**
   * Clone the group
   */
  async function clone(): Promise<InquiryGroup | void> {
    try {
      const response = await InquiryGroupsAPI.cloneGroup(id.value)
      if (response.data?.inquiryGroup) {
        const newGroup = response.data.inquiryGroup
        inquiryGroupsStore.addInquiryGroup(newGroup)
        return newGroup
      }
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error cloning inquiry group', { error, inquiryGroupId: id.value })
      throw error
    }
  }

  // ============================================================
  // WATCHERS - Auto-sync on changes
  // ============================================================

  watch(
    [
      id,
      parentId,
      created,
      updated,
      deleted,
      description,
      owner,
      type,
      groupStatus,
      publicationStatus,
      configuration,
      title,
      titleExt,
      ownedGroup,
      order,
      expire,
      metadata,
      coverId,
      protected_,
      allowEdit,
      inquiryIds,
      childs,
      slug,
      miscFields,
      trendingScore,
      supportResult,
    ],
    () => {
      if (id.value > 0) {
        syncToCollectionStore()
      }
    },
    { deep: true }
  )

  // ============================================================
  // RETURN
  // ============================================================
  return {
    // State
    id,
    parentId,
    created,
    updated,
    deleted,
    description,
    ownedGroup,
    metadata,
    protected: protected_,
    allowEdit,
    order,
    expire,
    groupStatus,
    publicationStatus,
    type,
    title,
    titleExt,
    slug,
    inquiryIds,
    childs,
    coverId,
    miscFields,
    trendingScore,
    supportResult,
    configuration,
    owner,
    meta,
    updating,

    // Computed - Basic
    status,
    isDraft,
    isActive,
    isArchived,
    isClosed,
    isPublished,
    isPending,
    currentUserStatus,
    permissions,
    visibility,
    visibilityGroups,
    visibilityUsers,
    inquiryGroup,

    // Computed - Template-based
    typeTemplate,
    ui,
    family,
    displayArchitecture,
    experience,
    layout,
    features,
    allowedInquiryTypes,
    isRoot,
    actions,
    icon,
    label,
    templateDescription,
    rules,
    allowedResponse,
    fields,
    syncUIToTemplate,

    // Template helper methods
    hasFeature,
    hasZone,
    getZoneConfig,
    getZoneContent,
    getZoneScope,
    getZoneDisplay,
    getDefaultExperience,

    // Actions
    reset,
    load,
    add,
    update,
    updateConfiguration,
    updatePublicationStatus,
    updateVisibility,
    addInquiry,
    removeInquiry,
    write,
    archive,
    restore,
    deleteGroup,
    updateMiscField,
    reorderInquiries,
    clone,
    syncToCollectionStore,
    patchFromResponse,
  }
})
