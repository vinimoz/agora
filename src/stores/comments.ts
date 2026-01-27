/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'

import { CommentsAPI, PublicAPI } from '../Api'
import { groupComments } from '../helpers/modules/comments'
import { Logger } from '../helpers/modules/logger'

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
		 */
		getInquiryComments: (state) => (inquiryId: number): Comment[] => {
			return state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === 0
			)
		},
		
		/**
		 * Get ONLY option-specific comments (optionId > 0)
		 */
		getOptionComments: (state) => (inquiryId: number, optionId: number): Comment[] => {
			return state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === optionId
			)
		},
		
		/**
		 * Get ALL comments for an inquiry (both inquiry and option comments)
		 * This is what your original load() returns
		 */
		getAllInquiryComments: (state) => (inquiryId: number): Comment[] => {
			return state.comments.filter(comment => comment.inquiryId === inquiryId)
		},
		
		/**
		 * Get ALL comments for a specific option (across all inquiries if needed)
		 */
		getAllCommentsForOption: (state) => (optionId: number): Comment[] => {
			return state.comments.filter(comment => comment.optionId === optionId)
		},
		
		/**
		 * Count inquiry comments
		 */
		inquiryCommentsCount: (state) => (inquiryId: number): number => {
			return state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === 0
			).length
		},
		
		/**
		 * Count option comments
		 */
		optionCommentsCount: (state) => (inquiryId: number, optionId: number): number => {
			return state.comments.filter(
				comment => comment.inquiryId === inquiryId && comment.optionId === optionId
			).length
		},
	},

	actions: {
		/**
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
			} catch (error) {
				if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					return
				}
				this.$reset()
			}
		},

		/**
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
		 * Add a comment - 
		 */
		async add(payload: { 
			message: string; 
			confidential: boolean;
			optionId?: number; // Optional: if not provided, defaults to 0 (inquiry comment)
		}) {
			const sessionStore = useSessionStore()
			try {
				const response = await (() => {
					if (sessionStore.route.name === 'publicInquiry') {
						return PublicAPI.addComment(
							sessionStore.publicToken,
							payload.message,
							payload.confidential,
							payload.optionId || 0 // Default to 0 for inquiry comments
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
							payload.optionId || 0 // Default to 0 for inquiry comments
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
		 * Set item -
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
		 * Delete -
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
		 * Restore - 
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
		 * Clear ONLY inquiry-level comments
		 */
		clearInquiryComments(inquiryId: number): void {
			this.comments = this.comments.filter(
				comment => !(comment.inquiryId === inquiryId && comment.optionId === 0)
			)
		},

		/**
		 * Clear ONLY option-specific comments
		 */
		clearOptionComments(inquiryId: number, optionId: number): void {
			this.comments = this.comments.filter(
				comment => !(comment.inquiryId === inquiryId && comment.optionId === optionId)
			)
		},

		/**
		 * Clear ALL comments for an inquiry (both inquiry and option)
		 */
		clearAllInquiryComments(inquiryId: number): void {
			this.comments = this.comments.filter(
				comment => comment.inquiryId !== inquiryId
			)
		},
	},
})
