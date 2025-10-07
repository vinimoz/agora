/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { getCurrentUser } from '@nextcloud/auth'
import { PublicAPI, SessionAPI } from '../Api/index.ts'
import { createDefault, User, AppPermissions } from '../Types/index.ts'
import { AppSettings, UpdateType } from './appSettings.ts'
import {  SessionSettings } from './preferences.ts'
import { FilterType, useInquiriesStore } from './inquiries.ts'
import { Share } from './shares.ts'
import { RouteLocationNormalized, RouteRecordNameGeneric } from 'vue-router'
import { Logger } from '../helpers/index.ts'
import { useInquiryStore } from './inquiry.ts'
import { useSubscriptionStore } from './subscription.ts'
import { AxiosError } from '@nextcloud/axios'
import { t } from '@nextcloud/l10n'
import { useInquiryGroupsStore } from './inquiryGroups.ts'

interface RouteParams {
  id: number
  token: string
  type: FilterType
  slug: string
}

export type Route = {
  currentRoute: string
  name: RouteRecordNameGeneric
  path: string
  params: RouteParams
}

export type UserStatus = {
  isLoggedin: boolean
  isAdmin: boolean
  isOfficial: boolean
  isModerator: boolean
  isCommission: boolean
}

export type Watcher = {
  id: string
  mode: UpdateType
  status: 'running' | 'stopped' | 'error' | 'stopping' | 'idle'
  interval?: number
  lastUpdate: number
  lastMessage?: string
}

export type Session = {
  appPermissions: AppPermissions
  appSettings: AppSettings
  currentUser: User
  route: Route
  sessionSettings: SessionSettings
  share: Share
  token: string | null
  userStatus: UserStatus
  watcher: Watcher
}


let lastLoadedUserId: string | null = null

export const useSessionStore = defineStore('session', {
  state: (): Session => ({
    appPermissions: {
      addShares: false,
      addSharesExternal: false,
      allAccess: false,
      changeForeignInquiries: false,
      comboView: false,
      deanonymizeInquiry: false,
      inquiryCreation: false,
      inquiryDownload: false,
      publicShares: false,
      seeMailAddresses: false,
      unrestrictedOwner: false,
    },
    appSettings: createDefault<AppSettings>(),
    route: {
      currentRoute: '',
      name: '',
      path: '',
      params: {
        id: 0,
        token: '',
        type: 'relevant',
        slug: '',
      },
    },
    userStatus: {
      isLoggedin: !!getCurrentUser(),
      isAdmin: !!getCurrentUser()?.isAdmin,
      isOfficial: !!getCurrentUser()?.isOfficial,
      isModerator: !!getCurrentUser()?.isModerator,
    },
    watcher: {
      id: '',
      mode: 'noInquirying',
      status: 'stopped',
      lastUpdate: Math.floor(Date.now() / 1000),
    },
    token: null,
    currentUser: createDefault<User>(),
    share: createDefault<Share>(),
    isLoaded: false,
  }),

  getters: {
    publicToken(state): string {
      if (state.route.params.token) {
        return state.route.params.token as string
      }
      return ''
    },

    currentInquiryId(state): number {
      if (state.route.name === 'inquiry') {
        return Number(state.route.params.id)
      }
      return 0
    },

    windowTitle(state): string {
      const inquiryStore = useInquiryStore()

      const windowTitle = {
        prefix: `${t('agora', 'Agora')}`,
        name: 'Nextcloud',
      }

      if (state.route.name === 'list') {
        const inquiriesStore = useInquiriesStore()
        windowTitle.name = inquiriesStore.categories[this.route.params.type as FilterType].titleExt
      } else if (state.route.name === 'group') {
        const inquiryGroupsStore = useInquiryGroupsStore()
        windowTitle.name =
          inquiryGroupsStore.currentInquiryGroup?.titleExt ||
          inquiryGroupsStore.currentInquiryGroup?.name ||
          ''
      } else if (state.route.name === 'publicInquiry') {
        windowTitle.name = inquiryStore.title
      } else if (state.route.name === 'inquiry') {
        windowTitle.name = inquiryStore.title ?? t('agora', 'Enter title')
      }

      return `${windowTitle.prefix} – ${windowTitle.name}`
    },
  },

  actions: {
    generateWatcherId() {
      this.watcher.id = Math.random().toString(36).substring(2)
    },
    async load(
      to: null | RouteLocationNormalized,
      cheapLoading: boolean = false,
      forceReload: boolean = false
    ) {
      Logger.debug('Loading session')
      if (!forceReload && this.isLoaded && this.currentUser.id === lastLoadedUserId) {
        Logger.debug('Session already loaded for same user, skipping, route set to:', to)
        if (to !== null) await this.setRouter(to)
        return
      }

      this.generateWatcherId()

      if (to !== null) {
        Logger.debug('Set requested route', { to })
        await this.setRouter(to)
        Logger.debug('Route set', { route: this.route })
      }

      if (cheapLoading) {
        Logger.debug('Same route, skipping session load')
        return
      }

      try {
        const response = await (() => {
          if (this.route.name === 'publicInquiry') {
            return PublicAPI.getSession(this.publicToken)
          }
          return SessionAPI.getSession()
        })()

        this.$patch(response.data)
        this.isLoaded = true
        lastLoadedUserId = this.currentUser.id
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }

        this.$reset()
        if (this.route.name === null) {
          this.$reset()
        } else {
          throw error
        }
      }
      Logger.debug('Session loaded')
    },

    async setRouter(payload: RouteLocationNormalized) {
      this.route.currentRoute = payload.fullPath
      this.route.name = payload.name
      this.route.path = payload.path
      this.route.params.id = payload.params.id as unknown as number
      this.route.params.token = payload.params.token as string
      this.route.params.type = payload.params.type as FilterType
      this.route.params.slug = payload.params.slug as string
    },

    // Share store
    async loadShare(): Promise<void> {
      if (this.route.name !== 'publicInquiry') {
        this.share = createDefault<Share>()
        return
      }

      try {
        const response = await PublicAPI.getShare(this.publicToken)
        this.share = response.data.share
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error retrieving share', { error })
        throw error
      }
    },

    async updateEmailAddress(payload: { emailAddress: string }): Promise<void> {
      const inquiryStore = useInquiryStore()

      if (this.route.name !== 'publicInquiry') {
        return
      }

      try {
        const response = await PublicAPI.setEmailAddress(this.publicToken, payload.emailAddress)
        this.share = response.data.share
        inquiryStore.load()
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error writing email address', {
          error,
          payload,
        })
        throw error
      }
    },

    async updateDisplayName(payload: { displayName: string }): Promise<void> {
      const inquiryStore = useInquiryStore()

      if (this.route.name !== 'publicInquiry') {
        return
      }

      try {
        const response = await PublicAPI.setDisplayName(this.publicToken, payload.displayName)
        this.share = response.data.share
        inquiryStore.load()
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error changing name', {
          error,
          payload,
        })
        throw error
      }
    },

    async deleteEmailAddress(): Promise<void> {
      const inquiryStore = useInquiryStore()
      const subscriptionStore = useSubscriptionStore()

      if (this.route.name !== 'publicInquiry') {
        return
      }

      try {
        const response = await PublicAPI.deleteEmailAddress(this.publicToken)
        this.share = response.data.share
        subscriptionStore.$state.subscribed = false
        subscriptionStore.write()
        inquiryStore.load()
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error deleting email address', { error })
        throw error
      }
    },

    async resendInvitation() {
      if (this.route.name !== 'publicInquiry') {
        throw new Error('Not on public inquiry page')
      }

      try {
        return await PublicAPI.resendInvitation(this.publicToken)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error sending invitation', {
          error,
          token: this.route.params.token,
        })
        throw error
      }
    },
  },
})
