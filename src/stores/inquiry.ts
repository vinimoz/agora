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
import { AxiosError } from '@nextcloud/axios'

import { Logger } from '../helpers/index.ts'
import { PublicAPI, InquiriesAPI } from '../Api/index.ts'
import { 
  Chunking, 
  createDefault, 
  Event, 
  StatusResults, 
  User, 
  UserType,
  SupportResult,
  SupportEngine 
} from '../Types/index.ts'

import { useInquiriesStore } from './inquiries.ts'
import { useSessionStore } from './session.ts'
import { useSubscriptionStore } from './subscription.ts'
import { useSharesStore } from './shares.ts'
import { useCommentsStore } from './comments.ts'
import { useSupportEngineStore } from './supportEngine.ts'
import { useAttachmentsStore } from './attachments.ts'
import { useAppSettingsStore } from '../stores/appSettings.ts'

// Type definitions matching PHP constants
export type AccessType = 'hidden' | 'public' | 'moderate' | 'private' | 'open'
export type ShowResultsType = 'always' | 'closed' | 'never'
export type InquiryType = 'debate' | 'proposal'
export type ModerationWorkflowStatus = 'draft' | 'pending' | 'accepted' | 'rejected'
export type InquiryWorkflowStatus = 'draft' | 'waiting_approval' | 'active' | 'closed' | 'rejected'
export type SortParticipants = 'alphabetical' | 'supportCount' | 'unordered'

// Meta information for loading states
export type Meta = {
  chunking: Chunking
  status: StatusResults
}

// Configuration matching PHP InquiryConfiguration
export type InquiryConfiguration = {
  access: AccessType
  autoReminder: boolean
  expire: number
  forceConfidentialComments: boolean
  allowComment: number | null
  supportFeature: string
  supportEngine: SupportEngine[]
}

// Status matching PHP getStatusArray()
export type InquiryStatus = {
  moderationStatus: ModerationWorkflowStatus
  inquiryStatus: InquiryWorkflowStatus
  lastInteraction: number
  created: number
  isAnonymous: boolean
  isArchived: boolean
  isExpired: boolean
  relevantThreshold: number
  deletionDate: number
  archivedDate: number
  supportResult: SupportResult | null
  countParticipants: number
  countComments: number
  countSupports: number
}

// Permissions matching PHP getPermissionsArray()
export type InquiryPermissions = {
  view: boolean
  edit: boolean
  delete: boolean
  archive: boolean
  support: boolean
  comment: boolean
  addShares: boolean
  addSharesExternal: boolean
  changeForeignInquiries: boolean
  changeOwner: boolean
  reorderOptions: boolean
  seeResults: boolean
  seeUsernames: boolean
  subscribe: boolean
  takeOver: boolean
  deanonymize: boolean
  addOptions: boolean
  confirmOptions: boolean
  clone: boolean
}

// Current user status matching PHP getCurrentUserStatus()
export type CurrentUserStatus = {
  groupInvitations: string[]
  isInvolved: boolean
  hasSupported: boolean
  supportValue: string | null
  isLocked: boolean
  isLoggedIn: boolean
  isOwner: boolean
  shareToken: string
  userId: string
  userRole: UserType
  countInquiries: number
  orphanedInquiries: number
}

// Main Inquiry type matching PHP jsonSerialize()
export type Inquiry = {
  id: number
  type: InquiryType
  family: string
  coverId: number
  title: string
  description: string
  descriptionSafe: string
  parentId: number
  locationId: number
  categoryId: number
  owner: User
  ownedGroup: string
  inquiryGroups: number[]
  childs: Inquiry[] 
  miscFields: Record<string, unknown>
  configuration: InquiryConfiguration
  status: InquiryStatus
  currentUserStatus: CurrentUserStatus
  permissions: InquiryPermissions
  revealParticipants: boolean
  sortParticipants: SortParticipants
  meta: Meta
}

const markedPrefix = {
  prefix: 'desc-',
}

export const useInquiryStore = defineStore('inquiry', {
  state: (): Inquiry => ({
    id: 0,
    type: 'proposal',
    family: '',
    coverId: 0,
    title: '',
    description: '',
    descriptionSafe: '',
    parentId: 0,
    locationId: 0,
    categoryId: 0,
    owner: createDefault<User>(),
    ownedGroup: '',
    inquiryGroups: [],
    childs: [],
    miscFields: {},
    configuration: {
      access: 'private',
      autoReminder: false,
      expire: 0,
      forceConfidentialComments: false,
      allowComment: null,
      supportFeature: 'none',
      supportEngine: [],
    },
    status: {
      moderationStatus: 'draft',
      inquiryStatus: 'draft',
      lastInteraction: 0,
      created: 0,
      isAnonymous: false,
      isArchived: false,
      isExpired: false,
      relevantThreshold: 0,
      deletionDate: 0,
      archivedDate: 0,
      supportResult: null,
      countParticipants: 0,
      countComments: 0,
      countSupports: 0,
    },
    currentUserStatus: {
      groupInvitations: [],
      isInvolved: false,
      hasSupported: false,
      supportValue: null,
      isLocked: false,
      isLoggedIn: false,
      isOwner: false,
      shareToken: '',
      userId: '',
      userRole: '' as UserType,
      countInquiries: 0,
      orphanedInquiries: 0,
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
      changeForeignInquiries: false,
      changeOwner: false,
      reorderOptions: false,
      seeResults: false,
      seeUsernames: false,
      subscribe: false,
      takeOver: false,
      deanonymize: false,
      addOptions: false,
      confirmOptions: false,
      clone: false,
    },
    revealParticipants: false,
    sortParticipants: 'alphabetical',
    meta: {
      chunking: {
        size: 0,
        loaded: 0,
      },
      status: 'loaded',
    },
  }),

  getters: {
    safeParticipants(state): User[] {
      const sessionStore = useSessionStore()
      const inquiriesStore = useInquiriesStore()
      // Note: viewMode is not defined in state - add if needed
      // if (this.viewMode === 'list-view') {
      //   return [sessionStore.currentUser]
      // }
      return inquiriesStore.getChunkedParticipants
    },

    isConfirmationAllowed(state): boolean {
      return state.permissions.confirmOptions || !this.isClosed
    },

    isOptionCloneAllowed(state): boolean {
      return !this.isClosed && state.permissions.edit
    },

    isClosed(state): boolean {
      return (
        state.status.isExpired ||
        (state.configuration.expire > 0 && moment.unix(state.configuration.expire).diff() < 1000)
      )
    },

    descriptionMarkDown(state): string {
      marked.use(gfmHeadingId(markedPrefix))
      return domPurify.sanitize(marked.parse(state.description).toString())
    },
  },

  actions: {
    reset(): void {
      this.$reset()
    },

    updateCommentCount(count: number): void {
      if (this.status) {
        this.status.countComments = count
      }
    },

    async resetInquiry(): Promise<void> {
      const inquiriesStore = useInquiriesStore()
      const sharesStore = useSharesStore()
      const commentsStore = useCommentsStore()
      // const supportsStore = useSupportsStore()
      // const optionsStore = useOptionsStore()
      // const subscriptionStore = useSubscriptionStore()
      
      this.$reset()
      inquiriesStore.$reset()
      // optionsStore.$reset()
      sharesStore.$reset()
      commentsStore.$reset()
      // supportsStore.$reset()
      // subscriptionStore.$reset()
    },

    async submitInquiry(action: 'submit_for_accepted' | 'submit_for_rejected' | 'submit_for_moderate'): Promise<void> {
      const appSettingsStore = useAppSettingsStore()
      try {
        if (action === 'submit_for_accepted') {
          this.status.moderationStatus = 'accepted'
          this.status.inquiryStatus = appSettingsStore.getFirstStatusKeyByInquiryType(this.type) as InquiryWorkflowStatus
          this.configuration.access = 'open'
        } else if (action === 'submit_for_rejected') {
          this.status.moderationStatus = 'rejected'
          this.status.inquiryStatus = 'rejected'
          this.configuration.access = 'private'
        } else if (action === 'submit_for_moderate') {
          this.status.moderationStatus = 'pending'
          this.status.inquiryStatus = 'waiting_approval'
          this.configuration.access = 'moderate'
        }
        
        const response = await InquiriesAPI.submitInquiry(this.id, action)
        if (!response || !response.data) {
          this.$reset()
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error submitting inquiry', { error, action })
        throw error
      }
    },

    async loadByToken(token: string): Promise<void> {
      this.meta.status = 'loading'
      const sharesStore = useSharesStore()
      const commentsStore = useCommentsStore()
      const attachmentsStore = useAttachmentsStore()
      const subscriptionStore = useSubscriptionStore()

      try {
        const response = await PublicAPI.getInquiry(token)
        this.$patch(response.data.inquiry)

        // optionsStore.options = response.data.options
        sharesStore.shares = response.data.shares
        commentsStore.comments = response.data.comments
        subscriptionStore.subscribed = response.data.subscribed
        attachmentsStore.attachments = response.data.attachments
        this.meta.status = 'loaded'
      } catch (error) {
        this.meta.status = 'error'
        Logger.error('Error loading public inquiry', { error, token })
        throw error
      }
    },

    async load(inquiryId: number | null = null): Promise<any> {
      const sessionStore = useSessionStore()
      const inquiriesStore = useInquiriesStore()
      const sharesStore = useSharesStore()
      const commentsStore = useCommentsStore()
      const attachmentsStore = useAttachmentsStore()
      const subscriptionStore = useSubscriptionStore()
      const supportEngineStore = useSupportEngineStore()
      
      this.meta.status = 'loading'
      
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getInquiry(sessionStore.route.params.token)
          }
          if (sessionStore.route.name === 'inquiry' || sessionStore.route.name === 'page') {
            return InquiriesAPI.getFullInquiry(inquiryId ?? sessionStore.currentInquiryId)
          }
          return Promise.resolve(null)
        })()

        if (!response) {
          this.$reset()
          return
        }

        this.$patch(response.data.inquiry)

        // optionsStore.options = response.data.options
        sharesStore.shares = response.data.shares
        commentsStore.comments = response.data.comments
        subscriptionStore.subscribed = response.data.subscribed
        attachmentsStore.attachments = response.data.attachments
        this.supportEngine = response.data.supportEngine
        inquiriesStore.setFamilyType(this.family)

        if (response.data.inquiry.owner.id === sessionStore.currentUser.id) {
          sessionStore.currentUser.isOwner = true
        } else {
          sessionStore.currentUser.isOwner = false
        }
        
        this.meta.status = 'loaded'
        return response
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.meta.status = 'error'
        Logger.error('Error loading inquiry', { error })
        throw error
      }
    },

    async add(payload: {
      title?: string
      type?: InquiryType
      ownedGroup?: string
      description?: string
      parentId?: number
      locationId?: number
      categoryId?: number
      owner?: User
    }): Promise<Inquiry | void> {
      try {
        const response = await InquiriesAPI.addInquiry({
          title: payload.title,
          type: payload.type,
          parentId: payload.parentId,
          locationId: payload.locationId,
          categoryId: payload.categoryId,
          description: payload.description,
          owner: payload.owner,
          ownedGroup: payload.ownedGroup,
        })

        return response.data.inquiry
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error adding inquiry:', {
          error,
          payload,
          state: this.$state,
        })
        throw error
      }
    },

    async update(payload: {
      id?: number
      title?: string
      type?: InquiryType
      description?: string
      parentId?: number | null
      locationId?: number | null
      categoryId?: number | null
    }): Promise<Inquiry | void> {
      const inquiriesStore = useInquiriesStore()

      const debouncedUpdate = this.$debounce(async () => {
        try {
          const response = await InquiriesAPI.updateInquiry(payload.id || this.id, {
            title: payload.title,
            type: payload.type,
            description: payload.description,
            parentId: payload.parentId,
            locationId: payload.locationId,
            categoryId: payload.categoryId,
          })
          return response.data.inquiry
        } catch (error) {
          if ((error as AxiosError)?.code === 'ERR_CANCELED') {
            return
          }
          Logger.error('Error updating inquiry', {
            error,
            state: this.$state,
          })
          throw error
        } finally {
          await this.load()
          await inquiriesStore.load()
        }
      }, 500)
      
      return debouncedUpdate()
    },

    async updateMiscField(key: string, value: any): Promise<void> {
      try {
        await InquiriesAPI.updateMiscField(this.id, { key, value })
        this.miscFields[key] = value
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error updating misc field:', {
          error,
          key,
          value,
          state: this.$state,
        })
        throw error
      }
    },

    async setInquiryStatus(status: InquiryWorkflowStatus): Promise<void> {
      try {
        await InquiriesAPI.updateInquiryStatus(this.id, status)
        this.status.inquiryStatus = status
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error setting inquiry status:', {
          error,
          status,
          state: this.$state,
        })
        throw error
      }
    },

    async setModerationStatus(status: ModerationWorkflowStatus): Promise<void> {
      try {
        await InquiriesAPI.updateModerationStatus(this.id, status)
        this.status.moderationStatus = status
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error setting moderation status:', {
          error,
          status,
          state: this.$state,
        })
        throw error
      }
    },

    async lockAnonymous(): Promise<void> {
      try {
        await InquiriesAPI.lockAnonymous(this.id)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error locking inquiry to anonymous:', {
          error,
          state: this.$state,
        })
        throw error
      } finally {
        await this.load()
      }
    },

    write(): void {
      const inquiriesStore = useInquiriesStore()

      const debouncedWrite = this.$debounce(async () => {
        if (this.title === '') {
          showError(t('agora', 'Title must not be empty!'))
          return
        }

        try {
          const response = await InquiriesAPI.updateInquiryConfig(this.id, this.configuration)
          this.$patch(response.data.inquiry)
          emit(Event.UpdateInquiry, {
            store: 'inquiry',
            message: t('agora', 'Inquiry updated'),
          })
        } catch (error) {
          if ((error as AxiosError)?.code === 'ERR_CANCELED') {
            return
          }
          Logger.error('Error updating inquiry:', {
            error,
            inquiry: this.$state,
          })
          showError(t('agora', 'Error writing inquiry'))
          throw error
        } finally {
          await this.load()
          await inquiriesStore.load()
        }
      }, 500)
      
      debouncedWrite()
    },

    async close(): Promise<void> {
      const inquiriesStore = useInquiriesStore()

      try {
        const response = await InquiriesAPI.closeInquiry(this.id)
        this.$patch(response.data.inquiry)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error closing inquiry', {
          error,
          inquiryId: this.id,
        })
        await this.load()
        throw error
      } finally {
        await inquiriesStore.load()
      }
    },

    async reopen(): Promise<void> {
      const inquiriesStore = useInquiriesStore()

      try {
        const response = await InquiriesAPI.reopenInquiry(this.id)
        this.$patch(response.data.inquiry)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error reopening inquiry', {
          error,
          inquiryId: this.id,
        })
        await this.load()
        throw error
      } finally {
        await inquiriesStore.load()
      }
    },

    async toggleArchive(inquiryId: number): Promise<void> {
      const inquiriesStore = useInquiriesStore()

      try {
        const response = await InquiriesAPI.toggleArchive(inquiryId)
        if (this.id === inquiryId) {
          this.$patch(response.data.inquiry)
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error archiving/restoring', {
          error,
          inquiryId,
        })
        throw error
      } finally {
        await inquiriesStore.load()
      }
    },
  },
})
