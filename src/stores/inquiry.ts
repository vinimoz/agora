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
import { PublicAPI, InquiriesAPI } from '../Api/index.ts'
import { Chunking, createDefault, Event, StatusResults, User, UserType } from '../Types/index.ts'

import { useOptionsStore } from './options.ts'
import { useInquiriesStore } from './inquiries.ts'
import { useSessionStore } from './session.ts'
import { useSubscriptionStore } from './subscription.ts'
import { useSharesStore } from './shares.ts'
import { useCommentsStore } from './comments.ts'
import { useAttachmentsStore } from './attachments.ts'
import { AxiosError } from '@nextcloud/axios'

export type AccessType = 'private' | 'open' | 'public'
export type ShowResults = 'always' | 'closed' | 'never'
export type AllowSuggestions = 'allow' | 'disallow'
export type SortParticipants = 'alphabetical' | 'supportCount' | 'unordered'

type Meta = {
  chunking: Chunking
  status: StatusResults
}

export type InquiryConfiguration = {
  access: AccessType
  anonymous: boolean
  autoReminder: boolean
  collapseDescription: boolean
  description: string
  expire: number
  forceConfidentialComments: boolean
  hideBookedUp: boolean
  maxInquiriesPerOption: number
  maxInquiriesPerUser: number
  suggestionsExpire: number
  showResults: ShowResults
}

export type InquiryStatus = {
  anonymizeLevel: string
  lastInteraction: number
  created: number
  isAnonymous: boolean
  isArchived: boolean
  isExpired: boolean
  isRealAnonymous: boolean
  relevantThreshold: number
  deletionDate: number
  archivedDate: number
  countParticipants: number
  countComments: number
  countSupports: number
  moderationStatus: ModerationWorkflowStatus
}

export type InquiryPermissions = {
  view: boolean
  edit: boolean
  delete: boolean
  archive: boolean
  support: boolean
  comment: boolean
  addOptions: boolean
  addShares: boolean
  addSharesExternal: boolean
  changeForeignInquiries: boolean
  changeOwner: boolean
  confirmOptions: boolean
  deanonymize: boolean
  reorderOptions: boolean
  seeResults: boolean
  seeUsernames: boolean
  subscribe: boolean
  takeOver: boolean
}

export type CurrentUserStatus = {
  groupInvitations: string[]
  isInvolved: boolean
  hasSupported: boolean
  isLocked: boolean
  isLoggedIn: boolean
  isOwner: boolean
  orphanedInquiries: number
  shareToken: string
  userId: string
  userRole: UserType
  countInquiries: number
}

export type Inquiry = {
  id: number
  type: InquiryType
  descriptionSafe: string
  configuration: InquiryConfiguration
  parentId: number
  locationId: number
  categoryId: number
  owner: User
  inquiryGroups: number[]
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
    title: '',
    type: 'proposal',
    description: '',
    descriptionSafe: '',
    moderationStatus: 'draft',
    parentId: 0,
    locationId: 0,
    categoryId: 0,
    childs: [],
    configuration: {
      description: '',
      access: 'private',
      anonymous: false,
      autoReminder: false,
      collapseDescription: true,
      expire: 0,
      forceConfidentialComments: false,
      hideBookedUp: false,
      suggestionsExpire: 0,
      showResults: 'always',
      maxInquiriesPerOption: 0,
      maxInquiriesPerUser: 0,
    },
    owner: createDefault<User>(),
    inquiryGroups: [],
    status: {
      forceEditMode: false,
      anonymizeLevel: 'ANON_NONE',
      lastInteraction: 0,
      created: 0,
      isAnonymous: false,
      isArchived: false,
      isExpired: false,
      isRealAnonymous: false,
      relevantThreshold: 0,
      deletionDate: 0,
      archivedDate: 0,
      countParticipants: 0,
      countComments: 0,
      countSupports: 0,
    },
    currentUserStatus: {
      groupInvitations: [],
      isInvolved: false,
      hasSupported: false,
      isLocked: false,
      isLoggedIn: false,
      isOwner: false,
      orphanedInquiries: 0,
      shareToken: '',
      userId: '',
      userRole: '',
      countInquiries: 0,
    },
    permissions: {
      addOptions: false,
      addShares: false,
      addSharesExternal: false,
      archive: false,
      changeForeignInquiries: false,
      changeOwner: false,
      clone: false,
      comment: false,
      support: false,
      confirmOptions: false,
      deanonymize: false,
      delete: false,
      edit: false,
      reorderOptions: false,
      seeResults: false,
      seeUsernames: false,
      subscribe: false,
      takeOver: false,
      view: false,
      suppport: false,
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
   
    safeParticipants(): User[] {
      const sessionStore = useSessionStore()
      const inquiriesStore = useInquiriesStore()
      if (this.viewMode === 'list-view') {
        return [sessionStore.currentUser]
      }
      return inquiriesStore.getChunkedParticipants
    },

    displayResults(state): boolean {
      return (
        state.configuration.showResults === 'always' ||
        (state.configuration.showResults === 'closed' && !this.status.isExpired)
      )
    },

    isConfirmationAllowed(state): boolean {
      return state.permissions.confirmOptions || !this.isClosed
    },

    isOptionCloneAllowed(state): boolean {
      return !this.isClosed && state.permissions.edit
    },

    isSuggestionExpired(state): boolean {
      return (
        this.isSuggestionAllowed &&
        state.configuration.suggestionsExpire > 0 &&
        moment.unix(state.configuration.suggestionsExpire).diff() < 0
      )
    },

    isSuggestionExpirySet(state): boolean {
      return this.isSuggestionAllowed && state.configuration.suggestionsExpire > 0
    },

    suggestionsExpireRelative(state): string {
      return moment.unix(state.configuration.suggestionsExpire).fromNow()
    },

    suggestionsExpire_d(state): Date {
      return moment.unix(state.configuration.suggestionsExpire)._d
    },

    isClosed(state): boolean {
      return (
        state.status.isExpired ||
        (state.configuration.expire > 0 && moment.unix(state.configuration.expire).diff() < 1000)
      )
    },

    descriptionMarkDown(): string {
      marked.use(gfmHeadingId(markedPrefix))
      return domPurify.sanitize(marked.parse(this.description).toString())
    },
  },

  actions: {
    reset(): void {
      this.$reset()
    },


    setSuggestionExpiration(payload: { expire: number }): void {
      this.configuration.suggestionsExpire = moment(payload.expire).unix()
      this.write()
    },

    setExpiration(payload: { expire: number }): void {
      this.configuration.suggestionsExpire = moment(payload.expire).unix()
      this.write()
    },

    async getEchanceText(payload: {text: string}): Promise<void> {
      try {
        const response = await InquiriesAPI.getEchanceText(payload.text)
        this.$patch(response.data.inquiry)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error getting IA response', {
          error,
        })
        throw error
      } 
    },

    async resetInquiry(): Promise<void> {
      const inquiriesStore = useInquiriesStore()
      const optionsStore = useOptionsStore()
      const sharesStore = useSharesStore()
      const commentsStore = useCommentsStore()
      const supportsStore = useSupportsStore()
      // const subscriptionStore = useSubscriptionStore()
      this.$reset()
      inquiriesStore.$reset()
      optionsStore.$reset()
      sharesStore.$reset()
      commentsStore.$reset()
      supportsStore.$reset()
      // subscriptionStore.$reset()
    },

    async load(inquiryId: number | null = null): Promise<void> {
      const sessionStore = useSessionStore()
      const optionsStore = useOptionsStore()
      const sharesStore = useSharesStore()
      const commentsStore = useCommentsStore()
      const attachmentsStore = useAttachmentsStore()
      const subscriptionStore = useSubscriptionStore()

      this.meta.status = 'loading'
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getInquiry(sessionStore.route.params.token)
          }
          if (sessionStore.route.name === 'inquiry') {
            return InquiriesAPI.getFullInquiry(inquiryId ?? sessionStore.currentInquiryId)
          }
        })()

        if (!response) {
          this.$reset()
          return
        }
        this.$patch(response.data.inquiry)
        optionsStore.options = response.data.options
        sharesStore.shares = response.data.shares
        commentsStore.comments = response.data.comments
        subscriptionStore.subscribed = response.data.subscribed
        attachmentsStore.attachments = response.data.attachments

        if (response.data.inquiry.owner.id === sessionStore.currentUser.id)
          sessionStore.currentUser.isOwner = true
        else sessionStore.currentUser.isOwner = false
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
      type?: InquiryTypeValues
      title?: string
      description?: string
      configuration?: InquiryConfiguration
      parentId?: number
      locationId?: number
      categoryId?: number
      owner?: User
      currentUserStatus?: CurrentUserStatus
      permissions?: InquiryPermissions
    }): Promise<Inquiry | void> {
      const inquiriesStore = useInquiriesStore()

      try {
        const response = await InquiriesAPI.addInquiry({
          title: payload.title,
          type: payload.type,
          configuration: payload.configuration,
          description: payload.description,
          parentId: payload.parentId,
          locationId: payload.locationId,
          categoryId: payload.categoryId,
          owner: payload.owner,
          currentUserStatus: payload.currentUserStatus,
          permissions: payload.permissions,
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
      } finally {
        inquiriesStore.load()
      }
    },

    /* Update */
    async update(payload: {
      id?: number | 0
      title?: string
      type?: string
      description?: string
      parentId?: number | null
      locationId?: number | null
      categoryId?: number | null
    }): Promise<Inquiry | void> {
      const inquiriesStore = useInquiriesStore()

      const debouncedLoad = this.$debounce(async () => {
        try {
          const response = await InquiriesAPI.updateInquiry(payload.id, {
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
          this.load()
          inquiriesStore.load()
        }
      }, 500)
      debouncedLoad()
    },

    async setModerationStatus(moderation: string): Promise<void> {
      try {
        await InquiriesAPI.updateModerationStatus(this.id, moderation)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error setting moderation status:', {
          error,
          state: this.$state,
        })
        throw error
      }
    },

    async LockAnonymous(): Promise<void> {
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
        // reload the inquiry
        this.load()
      }
    },

    write(): void {
      const inquiriesStore = useInquiriesStore()

      const debouncedLoad = this.$debounce(async () => {
        if (this.title === '') {
          showError(t('agora', 'Title must not be empty!'))
          return
        }

        try {
          const response = await InquiriesAPI.updateInquiryConfig(this.id, this.configuration)
          this.$patch(response.data.inquiry)
          emit(Event.UpdateInquiry, {
            store: 'inquiry',
            message: t('inquiries', 'Inquiry updated'),
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
          this.load()
          inquiriesStore.load()
        }
      }, 500)
      debouncedLoad()
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
        this.load()
        throw error
      } finally {
        inquiriesStore.load()
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
        this.load()
        throw error
      } finally {
        inquiriesStore.load()
      }
    },

    async toggleArchive(payload: { inquiryId: number }): Promise<void> {
      const inquiriesStore = useInquiriesStore()

      try {
        const response = await InquiriesAPI.toggleArchive(payload.inquiryId)
        if (this.id === payload.inquiryId) {
          this.$patch(response.data.inquiry)
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error archiving/restoring', {
          error,
          payload,
        })
        throw error
      } finally {
        inquiriesStore.load()
      }
    },
  },
})
