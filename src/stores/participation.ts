/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ParticipationAPI } from '../Api'
import { Logger } from '../helpers/modules/logger'
import { useInquiryStore } from './inquiry'
import { canParticipate, canParticipateInInquiry, getParticipationStatus, createInquiryContext } from '../utils/permissions'
import type { AxiosError } from '@nextcloud/axios'
import type { ParticipationPolicy } from '../Api/modules/participation'

export interface ParticipationStore {
	participation: ParticipationPolicy | null
	loading: {
		participation: boolean
		lottery: boolean
	}
}

export const useParticipationStore = defineStore('participation', {
	state: (): ParticipationStore => ({
		participation: null,
		loading: {
			participation: false,
			lottery: false,
		},
	}),

	getters: {
		participationType: (state) => state.participation?.policyType || 'everyone',
			isLottery: (state) => state.participation?.policyType === 'lottery',
			lotteryConfig: (state) => state.participation?.policyConfig || {},
    canCurrentUserParticipate: (state) => {
        const inquiryStore = useInquiryStore()
        const context = createInquiryContext(inquiryStore, {})
        return canParticipateInInquiry(inquiryStore, state.participation)
    },

    participationStatus: (state) => {
        const inquiryStore = useInquiryStore()
        const context = createInquiryContext(inquiryStore, {})
        return getParticipationStatus(context, state.participation)
    },
	},

		actions: {
			async loadParticipation(targetType: string, targetId: number): Promise<void> {
				this.loading.participation = true
				try {
					const response = await ParticipationAPI.getParticipation(targetType, targetId)
					this.participation = response.data.participation
				} catch (error) {
					if ((error as AxiosError)?.code === 'ERR_CANCELED') return
						Logger.error('Error loading participation', { error, targetType, targetId })
					this.participation = null
				} finally {
					this.loading.participation = false
				}
			},

			async setParticipation(
				targetType: string,
				targetId: number,
				policyType: string,
				policyConfig: Record<string, any> = {}
			): Promise<void> {
				try {
					const response = await ParticipationAPI.setParticipation(targetType, targetId, policyType, policyConfig)
					this.participation = response.data.participation
					Logger.info('Participation policy updated', { targetType, targetId, policyType })
				} catch (error) {
					Logger.error('Error setting participation', { error, targetType, targetId, policyType })
					throw error
				}
			},

			async deleteParticipation(targetType: string, targetId: number): Promise<void> {
				try {
					await ParticipationAPI.deleteParticipation(targetType, targetId)
					this.participation = null
					Logger.info('Participation policy deleted', { targetType, targetId })
				} catch (error) {
					Logger.error('Error deleting participation', { error, targetType, targetId })
					throw error
				}
			},

			async getLotteryStatus(targetType: string, targetId: number) {
				this.loading.lottery = true
				try {
					const response = await ParticipationAPI.getLotteryStatus(targetType, targetId)
					return response.data
				} catch (error) {
					Logger.error('Error getting lottery status', { error, targetType, targetId })
					throw error
				} finally {
					this.loading.lottery = false
				}
			},

			async resetLottery(targetType: string, targetId: number): Promise<void> {
				try {
					const response = await ParticipationAPI.resetLottery(targetType, targetId)
					this.participation = response.data.participation
					Logger.info('Lottery reset', { targetType, targetId })
				} catch (error) {
					Logger.error('Error resetting lottery', { error, targetType, targetId })
					throw error
				}
			},

			async getEligiblePool(targetType: string, targetId: number) {
				try {
					const response = await ParticipationAPI.getEligiblePool(targetType, targetId)
					return response.data
				} catch (error) {
					// Skip cancelled errors silently
					if ((error as AxiosError)?.code === 'ERR_CANCELED') {
						return []
					}
					Logger.error('Error getting eligible pool', { error, targetType, targetId })
					return []
				}
			},

			async runLottery(targetType: string, targetId: number, seed?: string) {
				this.loading.lottery = true
				try {
					const response = await ParticipationAPI.runLottery(targetType, targetId, seed)
					Logger.info('Lottery run completed', { targetType, targetId })
					return response.data
				} catch (error) {
					Logger.error('Error running lottery', { error, targetType, targetId })
					throw error
				} finally {
					this.loading.lottery = false
				}
			},

			async validateLottery(targetType: string, targetId: number) {
				this.loading.lottery = true
				try {
					const response = await ParticipationAPI.validateLottery(targetType, targetId)
					Logger.info('Lottery validated', { targetType, targetId })
					return response.data
				} catch (error) {
					Logger.error('Error validating lottery', { error, targetType, targetId })
					throw error
				} finally {
					this.loading.lottery = false
				}
			},

			async cancelLottery(targetType: string, targetId: number, reason: string) {
				this.loading.lottery = true
				try {
					const response = await ParticipationAPI.cancelLottery(targetType, targetId, reason)
					Logger.info('Lottery cancelled', { targetType, targetId, reason })
					return response.data
				} catch (error) {
					Logger.error('Error cancelling lottery', { error, targetType, targetId })
					throw error
				} finally {
					this.loading.lottery = false
				}
			},

			reset(): void {
				this.participation = null
				this.loading = { participation: false, lottery: false }
			},
		},
})
