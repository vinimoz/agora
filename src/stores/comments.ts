/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { CommentsAPI, PublicAPI } from '../Api/index.ts'
import { User } from '../Types/index.ts'
import { groupComments, Logger } from '../helpers/index.ts'
import { useSessionStore } from './session.ts'
import type { AxiosError } from '@nextcloud/axios'

export type Comment = {
  comment: string
  deleted: number
  id: number
  parent: number
  inquiryId: number
  timestamp: number
  user: User
  confidential: number
  recipient: User | null
}

export type ShortComment = {
  comment: string
  deleted: number
  id: number
}

export type Comments = {
  comments: Comment[]
}

export interface CommentsGrouped extends Comment {
  comments: Comment[]
}

export const useCommentsStore = defineStore('comments', {
  state: (): Comments => ({
    comments: [],
  }),

  getters: {
    count: (state) => state.comments.length,
    groupedComments: (state) => groupComments(state.comments),
  },
  actions: {
    async load() {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getComments(sessionStore.route.params.token as string)
          }
          if (sessionStore.route.name === 'inquiry') {
            return CommentsAPI.getComments(sessionStore.currentInquiryId)
          }

          return null
        })()

        if (!response) {
          this.$reset()
          return
        }

        this.comments = response.data.comments
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.$reset()
      }
    },

    async add(payload: { message: string; confidential: boolean }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.addComment(
              sessionStore.publicToken,
              payload.message,
              payload.confidential
            )
          }
          if (sessionStore.route.name === 'inquiry') {
            return CommentsAPI.addComment(
              sessionStore.currentInquiryId,
              payload.message,
              payload.confidential
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
        Logger.error('Error writing comment', {
          error,
          payload,
        })
        throw error
      }
    },

    setItem(payload: { comment: Comment }) {
      const index = this.comments.findIndex((comment) => comment.id === payload.comment.id)

      if (index < 0) {
        this.comments.push(payload.comment)
      } else {
        this.comments[index] = Object.assign(this.comments[index], payload.comment)
      }
    },

    async delete(payload: { comment: Comment }) {
      const sessionStore = useSessionStore()

      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.deleteComment(sessionStore.publicToken, payload.comment.id)
          }
          return CommentsAPI.deleteComment(payload.comment.id)
        })()

        this.setItem({ comment: response.data.comment })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error deleting comment', {
          error,
          payload,
        })
        throw error
      }
    },

    async restore(payload: { comment: Comment }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.restoreComment(sessionStore.publicToken, payload.comment.id)
          }
          return CommentsAPI.restoreComment(payload.comment.id)
        })()

        this.setItem({ comment: response.data.comment })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error restoring comment', {
          error,
          payload,
        })
        throw error
      }
    },
  },
})
