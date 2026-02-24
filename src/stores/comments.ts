/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'

import { CommentsAPI, PublicAPI } from '../Api'
import { groupComments } from '../helpers/modules/comments'
import { Logger } from '../helpers/modules/logger'
import { useInquiryStore } from './inquiry' 
import { useOptionStore } from './option' 
import { useSessionStore } from './session'

import type { AxiosError } from '@nextcloud/axios'
import type { Comment, CommentsStore } from './comments.types'

export const useCommentsStore = defineStore('comments', {
	state: (): CommentsStore => ({
		comments: [], // Stores ALL comments (both inquiry and option)
	}),

	getters: {
		count: (state) => state.comments.length,
		groupedComments: (state) => groupComments(state.comments),
		
		/**
		 * Get ONLY inquiry-level comments (optionId = 0)
		 * @param state
		 */
		getInquiryComments: (state) => (inquiryId: number): Comment[] => state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === 0
			),
		
		/**
		 * Get ONLY option-specific comments (optionId > 0)
		 * @param state
		 */
		getOptionComments: (state) => (inquiryId: number, optionId: number): Comment[] => state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === optionId
			),
		
		/**
		 * Get ALL comments for an inquiry (both inquiry and option comments)
		 * This is what your original load() returns
		 * @param state
		 */
		getAllInquiryComments: (state) => (inquiryId: number): Comment[] => state.comments.filter(comment => comment.inquiryId === inquiryId),
		
		/**
		 * Get ALL comments for a specific option (across all inquiries if needed)
		 * @param state
		 */
		getAllCommentsForOption: (state) => (optionId: number): Comment[] => state.comments.filter(comment => comment.optionId === optionId),
		
		/**
		 * Count inquiry comments
		 * @param state
		 */
		inquiryCommentsCount: (state) => (inquiryId: number): number => state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === 0
			).length,
		
		/**
		 * Count option comments
		 * @param state
		 */
		optionCommentsCount: (state) => (inquiryId: number, optionId: number): number => state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === optionId
			).length,
	},

	actions: {

          /**
     * @param inquiryId
     */
    async load(inquiryId: number | null = null): Promise<void> {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getComments(
              sessionStore.route.params.token as string,
            )
          }
          if (sessionStore.route.name === 'inquiry') {
            return CommentsAPI.getComments(sessionStore.currentInquiryId)
          }
          if (inquiryId) {
            return CommentsAPI.getComments(inquiryId)
          }
          return null
        })()

        if (!response) {
          this.$reset()
          return
        }

        // This stores ALL comments for the inquiry
        this.comments = response.data.comments
        
        // Update status counts after loading comments
        if (inquiryId) {
          this.updateStatusCounts(inquiryId)
        }
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.$reset()
      }
    },

    /**
     * @param inquiryId
     */
    async loadInquiryComments(inquiryId: number): Promise<void> {
      try {
        const response = await CommentsAPI.getInquiryComments(inquiryId)
        
        // Remove existing inquiry comments for this inquiry
        const otherComments = this.comments.filter(
          comment => !(comment.inquiryId === inquiryId && comment.optionId === 0)
        )
        
        // Add the new inquiry comments
        this.comments = [...otherComments, ...response.data.comments]
        
        // Update status counts
        this.updateStatusCounts(inquiryId)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error loading inquiry comments', {
          error,
          inquiryId,
        })
        throw error
      }
    },

    /**
     * @param optionId
     * @param inquiryId
     */
    async loadOptionComments(optionId: number, inquiryId?: number): Promise<void> {
      const sessionStore = useSessionStore()
      try {
        const targetInquiryId = inquiryId || sessionStore.currentInquiryId
        
        if (!targetInquiryId) {
          console.warn('No inquiryId available for loading option comments')
          return
        }

        const response = await CommentsAPI.getOptionComments(targetInquiryId, optionId)
        
        // Remove existing comments for this specific option
        const otherComments = this.comments.filter(
          comment => !(comment.inquiryId === targetInquiryId && comment.optionId === optionId)
        )
        
        // Add the new option comments
        this.comments = [...otherComments, ...response.data.comments]
        
        // Update status counts
        this.updateStatusCounts(targetInquiryId)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error loading option comments', {
          error,
          optionId,
          inquiryId,
        })
        throw error
      }
    },

    /**
     * Add a comment
     */
    async add(payload: { 
      message: string; 
      confidential: boolean;
      optionId?: number;
    }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.addComment(
              sessionStore.publicToken,
              payload.message,
              payload.confidential,
              payload.optionId || 0
            )
          }

          if (sessionStore.route.name === 'inquiry' || sessionStore.route.name === 'group-list') {
            const targetInquiryId = sessionStore.currentInquiryId

            if (!targetInquiryId) {
              console.warn('No inquiryId available for adding comment')
              return null
            }

            return CommentsAPI.addComment(
              targetInquiryId,
              payload.message,
              payload.confidential,
              payload.optionId || 0
            )
          }
          return null
        })()

        if (!response) {
          this.$reset()
          return
        }

        const newComment = response.data.comment
        this.setItem({ comment: newComment })
        
        // Update status counts after adding comment
        this.updateStatusCounts(newComment.inquiryId)
        
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

    /**
     * Delete
     */
    async delete(payload: { comment: Comment }) {
      const sessionStore = useSessionStore()

      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.deleteComment(
              sessionStore.publicToken,
              payload.comment.id,
            )
          }
          return CommentsAPI.deleteComment(payload.comment.id)
        })()

        this.setItem({ comment: response.data.comment })
        
        // Update status counts after deletion
        this.updateStatusCounts(payload.comment.inquiryId)
        
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

    /**
     * Restore
     */
    async restore(payload: { comment: Comment }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.restoreComment(
              sessionStore.publicToken,
              payload.comment.id,
            )
          }
          return CommentsAPI.restoreComment(payload.comment.id)
        })()

        this.setItem({ comment: response.data.comment })
        
        // Update status counts after restoration
        this.updateStatusCounts(payload.comment.inquiryId)
        
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

    /**
     * Update status.countComments in both inquiry and option stores
     */
    updateStatusCounts(inquiryId: number) {
      const inquiryStore = useInquiryStore()
      const optionStore = useOptionStore()
      
      // Update inquiry comment count (optionId = 0)
      if (inquiryStore.id === inquiryId) {
        const inquiryCommentCount = this.comments.filter(
          comment => comment.inquiryId === inquiryId && comment.optionId === 0 && comment.deleted === 0
        ).length
        
        if (inquiryStore.status) {
          inquiryStore.status.countComments = inquiryCommentCount
        }
      }
      
      // Update option comment counts for this inquiry
      if (optionStore.options && optionStore.options.length > 0) {
        optionStore.options.forEach(option => {
          const optionCommentCount = this.comments.filter(
            comment => comment.inquiryId === inquiryId && comment.optionId === option.id && comment.deleted === 0
          ).length
          
          if (option.status) {
            option.status.countComments = optionCommentCount
          }
        })
      }
    },


		/**
		 * Set item -
		 * @param payload
		 * @param payload.comment
		 */
		setItem(payload: { comment: Comment }) {
			const index = this.comments.findIndex(
				(comment) => comment.id === payload.comment.id,
			)

			if (index < 0) {
				this.comments.push(payload.comment)
			} else {
				this.comments[index] = Object.assign(
					this.comments[index],
					payload.comment,
				)
			}
		},


		/**
		 * Clear ONLY inquiry-level comments
		 * @param inquiryId
		 */
		clearInquiryComments(inquiryId: number): void {
			this.comments = this.comments.filter(
				comment => !(comment.inquiryId === inquiryId && comment.optionId === 0)
			)
		},

		/**
		 * Clear ONLY option-specific comments
		 * @param inquiryId
		 * @param optionId
		 */
		clearOptionComments(inquiryId: number, optionId: number): void {
			this.comments = this.comments.filter(
				comment => !(comment.inquiryId === inquiryId && comment.optionId === optionId)
			)
		},

		/**
		 * Clear ALL comments for an inquiry (both inquiry and option)
		 * @param inquiryId
		 */
		clearAllInquiryComments(inquiryId: number): void {
			this.comments = this.comments.filter(
				comment => comment.inquiryId !== inquiryId
			)
		},
	},
})
