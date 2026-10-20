/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'

import { CommentsAPI, PublicAPI } from '../Api'
import { groupComments } from '../helpers/modules/comments'
import { Logger } from '../helpers/modules/logger'
import { useInquiryStore } from './inquiry'
import { useOptionsStore } from './options'   // was: useOptionStore (singular)
import { useSessionStore } from './session'

import type { AxiosError } from '@nextcloud/axios'
import type { Comment, CommentsStore } from '../Types/index.ts'

export const useCommentsStore = defineStore('comments', {
	state: (): CommentsStore => ({
		comments: [],
	}),

	getters: {
		count: (state) => state.comments.length,
		groupedComments: (state) => groupComments(state.comments),

		getInquiryComments: (state) => (inquiryId: number): Comment[] =>
			state.comments.filter(
				(comment) => comment.inquiryId === inquiryId && comment.optionId === 0
			),

		getOptionComments: (state) => (inquiryId: number, optionId: number): Comment[] =>
			state.comments.filter(
				(comment) => comment.inquiryId === inquiryId && comment.optionId === optionId
			),

		getAllInquiryComments: (state) => (inquiryId: number): Comment[] =>
			state.comments.filter((comment) => comment.inquiryId === inquiryId),

		getAllCommentsForOption: (state) => (optionId: number): Comment[] =>
			state.comments.filter((comment) => comment.optionId === optionId),

		inquiryCommentsCount: (state) => (inquiryId: number): number =>
			state.comments.filter(
				(comment) => comment.inquiryId === inquiryId && comment.optionId === 0
			).length,

		optionCommentsCount: (state) => (inquiryId: number, optionId: number): number =>
			state.comments.filter(
				(comment) => comment.inquiryId === inquiryId && comment.optionId === optionId
			).length,
	},

	actions: {
		/**
		 * Load comments for the current context.
		 *
		 * Fix: resolve `targetInquiryId` up-front so that:
		 *  - API call uses it consistently
		 *  - status counts are updated even when `inquiryId` param is null
		 */
		async load(inquiryId: number | null = null): Promise<void> {
			const sessionStore = useSessionStore()

			const targetInquiryId: number | null =
				inquiryId
				?? (['inquiry', 'page'].includes(sessionStore.route.name as string)
					? sessionStore.currentInquiryId
					: null)

			try {
				const response = await (() => {
					if (sessionStore.route.name === 'publicInquiry') {
						return PublicAPI.getComments(
							sessionStore.route.params.token as string,
						)
					}
					if (targetInquiryId) {
						return CommentsAPI.getComments(targetInquiryId)
					}
					return null
				})()

				if (!response) {
					this.$reset()
					return
				}

				this.comments = response.data.comments

				if (targetInquiryId) {
					this.updateStatusCounts(targetInquiryId)
				}
			} catch (error) {
				if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					return
				}
				this.$reset()
			}
		},

		async loadInquiryComments(inquiryId: number): Promise<void> {
			try {
				const response = await CommentsAPI.getInquiryComments(inquiryId)

				const otherComments = this.comments.filter(
					(comment) => !(comment.inquiryId === inquiryId && comment.optionId === 0)
				)

				this.comments = [...otherComments, ...response.data.comments]
				this.updateStatusCounts(inquiryId)
			} catch (error) {
				if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					return
				}
				Logger.error('Error loading inquiry comments', { error, inquiryId })
				throw error
			}
		},

		async loadOptionComments(optionId: number, inquiryId?: number): Promise<void> {
			const sessionStore = useSessionStore()
			try {
				const targetInquiryId = inquiryId || sessionStore.currentInquiryId

				if (!targetInquiryId) {
					Logger.warn('No inquiryId available for loading option comments')
					return
				}

				const response = await CommentsAPI.getOptionComments(targetInquiryId, optionId)

				const otherComments = this.comments.filter(
					(comment) =>
						!(comment.inquiryId === targetInquiryId && comment.optionId === optionId)
				)

				this.comments = [...otherComments, ...response.data.comments]
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
		 * Add a comment.
		 *
		 * Fix: do NOT $reset() when no routable context — that destroyed
		 * every loaded comment. Just log and return.
		 */
		async add(payload: {
			message: string
			confidential: boolean
			optionId?: number
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

					if (
						['inquiry', 'page', 'group-list'].includes(
							sessionStore.route.name as string
						)
					) {
						const targetInquiryId = sessionStore.currentInquiryId

						if (!targetInquiryId) {
							Logger.warn('No inquiryId available for adding comment')
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

				if (!response?.data?.comment) {
					Logger.warn('add() called without a routable inquiry context')
					return
				}

				const newComment = response.data.comment
				this.setItem({ comment: newComment })
				this.updateStatusCounts(newComment.inquiryId)
			} catch (error) {
				if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					return
				}
				Logger.error('Error writing comment', { error, payload })
				throw error
			}
		},

		async delete(payload: { comment: Comment }) {
			const sessionStore = useSessionStore()
			try {
				const response = await (() => {
					if (sessionStore.route.name === 'publicInquiry') {
						return PublicAPI.deleteComment(
							sessionStore.publicToken,
							payload.comment.id
						)
					}
					return CommentsAPI.deleteComment(payload.comment.id)
				})()

				// Fix: guard against unexpected payload
				if (!response?.data?.comment) {
					Logger.warn('delete() returned no comment payload')
					return
				}

				this.setItem({ comment: response.data.comment })
				this.updateStatusCounts(payload.comment.inquiryId)
			} catch (error) {
				if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					return
				}
				Logger.error('Error deleting comment', { error, payload })
				throw error
			}
		},

		async restore(payload: { comment: Comment }) {
			const sessionStore = useSessionStore()
			try {
				const response = await (() => {
					if (sessionStore.route.name === 'publicInquiry') {
						return PublicAPI.restoreComment(
							sessionStore.publicToken,
							payload.comment.id
						)
					}
					return CommentsAPI.restoreComment(payload.comment.id)
				})()

				// Fix: guard against unexpected payload
				if (!response?.data?.comment) {
					Logger.warn('restore() returned no comment payload')
					return
				}

				this.setItem({ comment: response.data.comment })
				this.updateStatusCounts(payload.comment.inquiryId)
			} catch (error) {
				if ((error as AxiosError)?.code === 'ERR_CANCELED') {
					return
				}
				Logger.error('Error restoring comment', { error, payload })
				throw error
			}
		},

		/**
		 * Update `status.countComments` on the current inquiry and on every
		 * option of that inquiry.
		 *
		 * Fix: previously used `useOptionStore` (singular) whose state has
		 * no `options` array — the `if (optionStore.options && ...)` guard
		 * was always false, so option comment counts never updated.
		 */
		updateStatusCounts(inquiryId: number) {
			const inquiryStore = useInquiryStore()
			const optionsStore = useOptionsStore()

			// Inquiry-level comment count (optionId === 0)
			if (inquiryStore.id === inquiryId) {
				const inquiryCommentCount = this.comments.filter(
					(comment) =>
						comment.inquiryId === inquiryId
						&& comment.optionId === 0
						&& comment.deleted === 0
				).length

				if (inquiryStore.status) {
					inquiryStore.status.countComments = inquiryCommentCount
				}
			}

			// Per-option comment counts
			if (optionsStore.options?.length > 0) {
				optionsStore.options.forEach((option) => {
					const optionCommentCount = this.comments.filter(
						(comment) =>
							comment.inquiryId === inquiryId
							&& comment.optionId === option.id
							&& comment.deleted === 0
					).length

					if (option.status) {
						option.status.countComments = optionCommentCount
					}
				})
			}
		},

		setItem(payload: { comment: Comment }) {
			const index = this.comments.findIndex(
				(comment) => comment.id === payload.comment.id
			)

			if (index < 0) {
				this.comments.push(payload.comment)
			} else {
				this.comments[index] = Object.assign(
					this.comments[index],
					payload.comment
				)
			}
		},

		clearInquiryComments(inquiryId: number): void {
			this.comments = this.comments.filter(
				(comment) => !(comment.inquiryId === inquiryId && comment.optionId === 0)
			)
		},

		clearOptionComments(inquiryId: number, optionId: number): void {
			this.comments = this.comments.filter(
				(comment) =>
					!(comment.inquiryId === inquiryId && comment.optionId === optionId)
			)
		},

		clearAllInquiryComments(inquiryId: number): void {
			this.comments = this.comments.filter(
				(comment) => comment.inquiryId !== inquiryId
			)
		},
	},
})
