/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { SupportsAPI, PublicAPI } from '../Api/index.ts'
import { groupSupports, Logger } from '../helpers/index.ts'
import { useSessionStore } from './session.ts'
import type { AxiosError } from '@nextcloud/axios'

export type Support = {
  inquiryId: number
  userId: string
  created: number
}

export type Supports = {
  supports: Support[]
}

export interface SupportsGrouped extends Support {
  supports: Support[]
}

export const useSupportsStore = defineStore('supports', {
  state: () => ({
    supports: [] as Array<{
      inquiryId: string
      userId: string
      created: number
    }>,
  }),

  getters: {
    count: (state) => state.supports.length,
    groupedSupports: (state) => groupSupports(state.supports),
  },

  actions: {
    async toggleSupport(inquiryId, userId, inquiryStore, inquiriesStore) {
      const inquiryInList = inquiriesStore.inquiries.find((i) => i.id === inquiryId)
      const inquiryInChilds = inquiryStore?.childs?.find((i) => i.id === inquiryId)
      const isCurrentInquiry = inquiryStore?.id === inquiryId

      const sourceInquiry =
        inquiryInList || inquiryInChilds || (isCurrentInquiry ? inquiryStore : null)

      if (!sourceInquiry) {
        console.error('Inquiry not found in any store')
        return
      }

      const oldState = sourceInquiry.currentUserStatus?.hasSupported ?? false
      const oldCount = sourceInquiry.status?.countSupports ?? 0


      if (inquiryInList) {
        inquiryInList.currentUserStatus.hasSupported = !oldState
        inquiryInList.status.countSupports += oldState ? -1 : 1
      }

      if (inquiryInChilds) {
        inquiryInChilds.currentUserStatus.hasSupported = !oldState
        inquiryInChilds.status.countSupports += oldState ? -1 : 1
      }

      if (isCurrentInquiry) {
        inquiryStore.currentUserStatus.hasSupported = !oldState
        inquiryStore.status.countSupports += oldState ? -1 : 1
      }

      const hasSupported = !oldState

      try {
        if (hasSupported) {
          await SupportsAPI.addSupport(inquiryId, userId)
        } else {
          await SupportsAPI.removeSupport(inquiryId, userId)
        }

        return hasSupported
      } catch (error) {
        if (inquiryInList) {
          inquiryInList.currentUserStatus.hasSupported = oldState
          inquiryInList.status.countSupports = oldCount
        }

        if (inquiryInChilds) {
          inquiryInChilds.currentUserStatus.hasSupported = oldState
          inquiryInChilds.status.countSupports = oldCount
        }

        if (isCurrentInquiry) {
          inquiryStore.currentUserStatus.hasSupported = oldState
          inquiryStore.status.countSupports = oldCount
        }

        throw error
      }
    },

    async load() {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getSupports(sessionStore.route.params.token as string)
          }
          if (sessionStore.route.name === 'inquiry') {
            return SupportsAPI.getInquiryId(sessionStore.currentInquiryId)
          }

          return null
        })()

        if (!response) {
          this.$reset()
          return
        }

        this.supports = response.data.supports
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.$reset()
      }
    },

    async add() {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.addSupport(
              sessionStore.publicToken,
              sessionStore.currentInquiryId,
              sessionStore.currentUser.id
            )
          }
          if (sessionStore.route.name === 'inquiry') {
            return SupportsAPI.addSupport(
              sessionStore.currentInquiryId,
              sessionStore.currentUser.id
            )
          }
          return null
        })()

        if (!response) {
          this.$reset()
          return
        }

        this.load()
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error writing support', {
          error,
        })
        throw error
      }
    },

    async remove() {
      const sessionStore = useSessionStore()

      try {
        await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.removeSupport(
              sessionStore.publicToken,
              sessionStore.currentInquiryId,
              sessionStore.currentUser.id
            )
          }
          return SupportsAPI.removeSupport(
            sessionStore.currentInquiryId,
            sessionStore.currentUser.id
          )
        })()
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error deleting support', {
          error,
        })
        throw error
      }
    },

    /**
     * Restore support for an inquiry
     * @param inquiryId The inquiry ID to remove support from
     */

    async restore(payload: { support: Support }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.restoreSupport(sessionStore.publicToken, payload.support.id)
          }
          return SupportsAPI.restoreSupport(payload.support.id)
        })()

        this.setItem({ support: response.data.support })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error restoring support', {
          error,
          payload,
        })
        throw error
      }
    },
  },
})
