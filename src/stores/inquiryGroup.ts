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
import { UserType } from '../Types/index.ts'
import { useSessionStore } from './session.ts'
import { useInquiriesStore } from './inquiries.ts'
import { useInquiryGroupsStore } from './inquiryGroups.ts'
import type { InquiryGroup, InquiryGroupType } from './inquiryGroups.types.ts'

export type InquiryGroupConfiguration = {
  description: string
  protected: boolean
  group_status: string
  expire: number | null
  title_ext: string | null
}

export type InquiryGroupStatus = {
  created: number
  deleted: number
  isDeleted: boolean
  countInquiries: number
  isExpired: boolean
}

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

export const useInquiryGroupStore = defineStore('inquiryGroup', {
  state: () => ({
    id: 0,
    coverId: null as number | null,
    type: 'default' as InquiryGroupType,
    parentId: 0,
    created: 0,
    deleted: 0,
    description: '',
    ownedGroup: '',
    metadata: null as string | null,
    groupStatus: 'draft',
    protected: false,
    owner: {
      id: '',
      displayName: '',
      type: 'user' as UserType,
      isOwner: false,
      groups: [],
    },
    title: '',
    titleExt: '',
    slug: '',
    inquiryIds: [] as number[],
    allowEdit: false,
    miscFields: [],
    childs: [] as InquiryGroup[],
    order: 0,
    expire: null as number | null,
    
    meta: {
      status: 'loaded' as 'loaded' | 'loading' | 'error',
    },
    
    updating: false,
  }),

  getters: {
    /**
     * Current inquiry group configuration
     * @param state
     */
    configuration: (state): InquiryGroupConfiguration => ({
      description: state.description,
      protected: state.protected,
      group_status: state.groupStatus,
      expire: state.expire,
      title_ext: state.titleExt || null,
    }),

    /**
     * Current inquiry group status
     * @param state
     */
    status: (state): InquiryGroupStatus => ({
      created: state.created,
      deleted: state.deleted,
      isDeleted: state.deleted > 0,
      countInquiries: state.inquiryIds.length,
      isExpired: state.expire ? Date.now() / 1000 > state.expire : false,
    }),

    /**
     * Current user status for the inquiry group
     * @param state
     */
    currentUserStatus: (state): CurrentUserInquiryGroupStatus => {
      const sessionStore = useSessionStore()
      return {
        isOwner: state.owner.id === sessionStore.currentUser.id,
        isLoggedIn: sessionStore.currentUser.id !== '',
        userId: sessionStore.currentUser.id,
        userRole: sessionStore.currentUser.type,
        canEdit: state.allowEdit,
        isProtected: state.protected,
      }
    },

    /**
     * Permissions for the current user on the inquiry group
     * @param state
     */
    permissions: (state): InquiryGroupPermissions => {
      const sessionStore = useSessionStore()
      const isOwner = state.owner.id === sessionStore.currentUser.id
      const isAdmin = sessionStore.currentUser.type === 'admin'
      const isProtected = state.protected
      
      return {
        view: true, // Always viewable if you have access
        edit: (state.allowEdit || isOwner || isAdmin) && !isProtected,
        delete: (isOwner || isAdmin) && !isProtected,
        addInquiries: (state.allowEdit || isOwner || isAdmin) && !isProtected,
        reorderInquiries: (state.allowEdit || isOwner || isAdmin) && !isProtected,
        changeOwner: (isOwner || isAdmin) && !isProtected,
        archive: (isOwner || isAdmin) && !isProtected,
        clone: true, // Always allow cloning
      }
    },

    /**
     * Check if group is in draft status
     * @param state
     */
    isDraft: (state): boolean => state.groupStatus === 'draft',

    /**
     * Check if group is active
     * @param state
     */
    isActive: (state): boolean => state.groupStatus === 'active',

    /**
     * Check if group is archived
     * @param state
     */
    isArchived: (state): boolean => state.groupStatus === 'archived',

    /**
     * @param state
     */
    inquiryGroup: (state): InquiryGroup => ({
      id: state.id,
      coverId: state.coverId,
      type: state.type,
      parentId: state.parentId,
      created: state.created,
      deleted: state.deleted,
      description: state.description,
      ownedGroup: state.ownedGroup,
      metadata: state.metadata,
      groupStatus: state.groupStatus,
      protected: state.protected,
      owner: state.owner,
      title: state.title,
      titleExt: state.titleExt,
      slug: state.slug,
      inquiryIds: state.inquiryIds,
      allowEdit: state.allowEdit,
      miscFields: state.miscFields,
      childs: state.childs,
      order: state.order,
      expire: state.expire,
    }),
  },

  actions: {
    /**
     * Reset the inquiry group store to initial state
     */
    reset(): void {
      this.$reset()
    },

    /**
     * Load an inquiry group by ID
     * @param inquiryGroupId
     */
    async load(inquiryGroupId: number | null = null): Promise<void> {
      const sessionStore = useSessionStore()
      
      let groupId = inquiryGroupId
      if (!groupId && sessionStore.route?.params?.id) {
        groupId = Number(sessionStore.route.params.id)
      }
      
      if (!groupId || groupId === 0) {
        console.error('No inquiry group ID provided for load')
        throw new Error('No inquiry group ID provided')
      }
      
      this.meta.status = 'loading'
      try {
        const response = await InquiryGroupsAPI.getInquiryGroup(groupId)
        
        if (!response.data?.inquiryGroup) {
          throw new Error('No inquiry group data in response')
        }
        
        const groupData = response.data.inquiryGroup

        this.$patch(response.data.inquiryGroup)
        // optionsStore.options = response.data.options
        // sharesStore.shares = response.data.shares
        // subscriptionStore.subscribed = response.data.subscribed
    //    attachmentsStore.attachments = response.data.attachments
        this.meta.status = 'loaded'
    return groupData
      } catch (error) {
          if ((error as AxiosError)?.code === 'ERR_CANCELED') {
              return
          }
          this.meta.status = 'error'
          console.error('Error loading inquiry group:', error)
          Logger.error('Error loading inquiry group', { error })
          showError(t('agora', 'Failed to load inquiry group'))
          throw error
      }
    },

    /**
     * Create a new inquiry group
     * @param payload
     * @param payload.title
     * @param payload.titleExt
     * @param payload.description
     * @param payload.type
     * @param payload.parentId
     * @param payload.protected
     * @param payload.ownedGroup
     * @param payload.groupStatus
     * @param payload.inquiryIds
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
                parentId: payload.parentId,
                protected: payload.protected || true,
                ownedGroup: payload.ownedGroup,
                groupStatus: payload.groupStatus || 'draft',
            })

            if (response.data?.inquiryGroup) {
                const group = response.data.inquiryGroup
                this.id = group.id
                this.title = group.title || ''
                this.type = group.type || 'default'
                const inquiryGroupsStore = useInquiryGroupsStore()
                inquiryGroupsStore.addInquiryGroup(group)
                return response.data.inquiryGroup
            }

        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error adding inquiry group:', {
                error,
                payload,
            })
            throw error
        }
    },

    /**
     * Update the current inquiry group
     * @param payload
     * @param payload.title
     * @param payload.titleExt
     * @param payload.description
     * @param payload.type
     * @param payload.parentId
     * @param payload.protected
     * @param payload.ownedGroup
     * @param payload.groupStatus
     * @param payload.expire
     */
    async update(payload: {
        title?: string
        titleExt?: string
        description?: string
        type?: string
        parentId?: number
        protected?: boolean
        ownedGroup?: string
        groupStatus?: string
        expire?: number
    }): Promise<InquiryGroup | void> {
        const inquiriesStore = useInquiriesStore()

        try {
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
            })

            if (response.data?.inquiryGroup) {
                if (payload.title !== undefined) this.title = payload.title
                if (payload.description !== undefined) this.description = payload.description
                if (payload.type !== undefined) this.type = payload.type
                if (payload.groupStatus !== undefined) this.groupStatus = payload.groupStatus
                const inquiryGroupsStore = useInquiryGroupsStore()
                inquiryGroupsStore.updateInquiryGroup(response.data.inquiryGroup)
            }

emit('update:inquiry-group', {
    store: 'inquiryGroup',
    message: t('agora', 'Inquiry group updated'),
})

return response.data
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error updating inquiry group', {
                error,
                payload,
            })
            throw error
        } finally {
            inquiriesStore.load()
        }
    },

    /**
     * Add an inquiry to the current group
     * @param inquiryId
     */
    async addInquiry(inquiryId: number): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.addInquiryToGroup(
                inquiryId,
                this.id
            )

            if (response.data?.inquiryGroup?.inquiryIds) {
                this.inquiryIds = response.data.inquiryGroup.inquiryIds
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
     * Remove an inquiry from the current group
     * @param inquiryId
     */
    async removeInquiry(inquiryId: number): Promise<void> {
        const inquiriesStore = useInquiriesStore()

        try {
            const response = await InquiryGroupsAPI.removeInquiryFromGroup(
                this.id,
                inquiryId
            )

            if (response.data?.inquiryGroup === null) {
                // Group was deleted because it became empty
                this.reset()
            } else if (response.data?.inquiryGroup?.inquiryIds) {
                this.inquiryIds = response.data.inquiryGroup.inquiryIds
            }
            const inquiryGroupsStore = useInquiryGroupsStore()
            inquiryGroupsStore.removeInquiryGroup(response.data.inquiryGroup)
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
     * Restore the current inquiry group
     * @param inquiryGroupId
     */
    async restoreGroup(inquiryGroupId?: number): Promise<void> {
        let groupId: number | undefined

        try {
            groupId = inquiryGroupId || this.inquiryGroup.id

            const response = await InquiryGroupsAPI.updateGroup(groupId, {
                groupStatus: 'active',
            })
            this.inquiryGroup = response.data.inquiryGroup
                const inquiryGroupsStore = useInquiryGroupsStore()
                inquiryGroupsStore.updateInquiryGroup(response.data.inquiryGroup)
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error restoring inquiry group', {
                error,
                inquiryGroupId: groupId,
            })
            throw error
        }
    },

    /**
     * Archive the current inquiry group
     * @param inquiryGroupId
     */
    async archiveGroup(inquiryGroupId: number): Promise<void> {

        try {
            let groupId= this.inquiryGroup.id
            if (inquiryGroupId) groupId=inquiryGroupId

                const response = await InquiryGroupsAPI.updateGroup(groupId, {
                    groupStatus: 'archived',
                })
                this.inquiryGroup = response.data.inquiryGroup
                const inquiryGroupsStore = useInquiryGroupsStore()
                inquiryGroupsStore.updateInquiryGroup(response.data.inquiryGroup)
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
     * Delete the current inquiry group
     * @param inquiryGroupId
     */
    async deleteGroup(inquiryGroupId: number): Promise<void> {

        try {
            let groupId= this.inquiryGroup.id
            if (inquiryGroupId) groupId=inquiryGroupId

                await InquiryGroupsAPI.deleteGroup(groupId)
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error deleting inquiry group', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
            })
            throw error
        }

    },

    /**
     * Archive the current inquiry group
     */
    async archive(): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.updateGroup(this.inquiryGroup.id, {
                groupStatus: 'archived',
            })
            this.inquiryGroup = response.data.inquiryGroup
            emit('archive:inquiry-group', {
                store: 'inquiryGroup',
                message: t('inquiries', 'Inquiry group archived'),
            })
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error archiving inquiry group', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
            })
            throw error
        }
    },

    /**
     * Restore an archived inquiry group
     */
    async restore(): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.updateGroup(this.inquiryGroup.id, {
                groupStatus: 'active',
            })
            this.inquiryGroup = response.data.inquiryGroup
            emit('restore:inquiry-group', {
                store: 'inquiryGroup',
                message: t('inquiries', 'Inquiry group restored'),
            })
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error restoring inquiry group', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
            })
            throw error
        }
    },

    /**
     * Write configuration changes to the API
     */
    async write(): Promise<void> {
        const inquiriesStore = useInquiriesStore()

        if (!this.inquiryGroup.title && !this.inquiryGroup.title) {
            showError(t('inquiries', 'Group title must not be empty!'))
            return
        }

        this.updating = true
        try {
            const response = await InquiryGroupsAPI.updateGroup(this.inquiryGroup.id, {
                title: this.inquiryGroup.title || this.inquiryGroup.title,
                titleExt: this.inquiryGroup.titleExt,
                description: this.inquiryGroup.description,
                type: this.inquiryGroup.group_type,
                parentId: this.inquiryGroup.parent_id,
                protected: this.inquiryGroup.protected,
                ownedGroup: this.inquiryGroup.owned_group,
                groupStatus: this.inquiryGroup.group_status,
            })

            this.inquiryGroup = response.data.inquiryGroup
            emit('update:inquiry-group', {
                store: 'inquiryGroup',
                message: t('inquiries', 'Inquiry group updated'),
            })
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error writing inquiry group:', {
                error,
                inquiryGroup: this.inquiryGroup,
            })
            showError(t('inquiries', 'Error writing inquiry group'))
            throw error
        } finally {
            this.updating = false
            inquiriesStore.load()
        }
    },

    /**
     * Add an inquiry to the current group
     * @param inquiryId
     */
    async addInquiryToGroup(inquiryId: number): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.addInquiryToGroup(
                inquiryId,
                this.inquiryGroup.id
            )
            this.inquiryGroup = response.data.inquiryGroup
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error adding inquiry to group', {
                error,
                inquiryId,
                inquiryGroupId: this.inquiryGroup.id,
            })
            throw error
        }
    },

    /**
     * Remove an inquiry from the current group
     * @param inquiryId
     */
    async removeInquiryFromGroup(inquiryId: number): Promise<void> {
        const inquiriesStore = useInquiriesStore()

        try {
            const response = await InquiryGroupsAPI.removeInquiryFromGroup(
                this.inquiryGroup.id,
                inquiryId
            )

            if (response.data.inquiryGroup === null) {
                // Group was deleted because it became empty
                this.reset()
            } else {
                this.inquiryGroup = response.data.inquiryGroup
            }
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error removing inquiry from group', {
                error,
                inquiryId,
                inquiryGroupId: this.inquiryGroup.id,
            })
            throw error
        } finally {
            inquiriesStore.load()
        }
    },

    /**
     * Reorder inquiries in the group
     * @param inquiryIds
     */
    async reorderInquiries(inquiryIds: number[]): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.reorderInquiriesInGroup(
                this.inquiryGroup.id,
                inquiryIds
            )
            this.inquiryGroup = response.data.inquiryGroup
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error reordering inquiries in group', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
                inquiryIds,
            })
            throw error
        }
    },

    /**
     * Change the owner of the inquiry group
     * @param newOwnerId
     */
    async changeOwner(newOwnerId: string): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.changeGroupOwner(
                this.inquiryGroup.id,
                newOwnerId
            )
            this.inquiryGroup = response.data.inquiryGroup
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error changing inquiry group owner', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
                newOwnerId,
            })
            throw error
        }
    },

    /**
     * Update a single field of the inquiry group
     * @param field
     * @param value
     */
    async updateField<K extends keyof InquiryGroup>(
        field: K,
        value: InquiryGroup[K]
    ): Promise<void> {
        const oldValue = this.inquiryGroup[field]
        this.inquiryGroup[field] = value

        try {
            await this.write()
        } catch (error) {
            // Revert on error
            this.inquiryGroup[field] = oldValue
            throw error
        }
    },

    /**
     * Update group status
     * @param status
     */
    async updateGroupStatus(status: string): Promise<void> {
        try {
            const response = await InquiryGroupsAPI.updateGroup(this.inquiryGroup.id, {
                groupStatus: status,
            })
            this.inquiryGroup = response.data.inquiryGroup
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error updating group status', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
                status,
            })
            throw error
        }
    },

    async updateMiscField(key: string,val: string): Promise<void> {
        try {
            await InquiryGroupsAPI.updateMiscField(this.id, { key, value: val })
            this.miscFields[key]=val
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error setting inquiry status:', {
                error,
                state: this.$state,
            })
            throw error
        }
    },

    async setInquiryGroupStatus(inquiryGroupStatus: string): Promise<void> {
        try {
            await InquiryGroupsAPI.updateInquiryGroupStatus(this.id, inquiryGroupStatus)
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error setting inquiry group status:', {
                error,
                state: this.$state,
            })
            throw error
        }
    },

    /**
     * Clone the current inquiry group
     */
    async clone(): Promise<InquiryGroup | void> {
        try {
            const response = await InquiryGroupsAPI.cloneGroup(this.inquiryGroup.id)
            return response.data.inquiryGroup
        } catch (error) {
            if ((error as AxiosError)?.code === 'ERR_CANCELED') {
                return
            }
            Logger.error('Error cloning inquiry group', {
                error,
                inquiryGroupId: this.inquiryGroup.id,
            })
            throw error
        }
    },
  },
})
