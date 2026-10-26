/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { ParticipationAPI } from '../Api'
import { Logger } from '../helpers/modules/logger'
import { useInquiryStore } from './inquiry'
import {
  canParticipateInInquiry,
  getParticipationStatus,
  createInquiryContext,
} from '../utils/permissions'
import type { AxiosError } from '@nextcloud/axios'
import type {
  ParticipationPolicy,
  ParticipationPolicyType,
  ParticipationTargetType,
  LotteryMode,
  LotteryMethod,
} from '../Types/participation.types.ts'

export interface ParticipationStore {
  participation: ParticipationPolicy | null
  loading: { participation: boolean; lottery: boolean }
}

export const useParticipationStore = defineStore('participation', {
  state: (): ParticipationStore => ({
    participation: null,
    loading: { participation: false, lottery: false },
  }),

  getters: {
    // ── “no policy” semantics ────────────────────────────────
    isNone: (state) =>
      state.participation === null || state.participation.policyType === 'none',

    hasPolicy: (state) =>
      state.participation !== null && state.participation.policyType !== 'none',

    participationType: (state): ParticipationPolicyType =>
      state.participation?.policyType ?? 'none',

    isLottery: (state) => state.participation?.policyType === 'lottery',

    lotteryConfig: (state) => state.participation?.policyConfig ?? {},

    // Mirror Participation::getLotteryConfig() defaults
    lotteryMode: (state): LotteryMode =>
      (state.participation?.policyConfig?.mode as LotteryMode) ?? 'users',

    lotteryCount: (state): number =>
      Number(state.participation?.policyConfig?.count ?? 1),

    lotterySeed: (state): string | number | null =>
      (state.participation?.policyConfig?.seed as string | number | null) ?? null,

    lotteryMethod: (state): LotteryMethod => {
      const m = state.participation?.policyConfig?.method
      return m === 'random' || m === 'weighted' || m === 'stratified'
        ? m
        : 'random'
    },

    canCurrentUserParticipate(): boolean {
      const inquiryStore = useInquiryStore()
      const ctx = createInquiryContext(inquiryStore)
      if (!ctx) return false
      return canParticipateInInquiry(ctx, this.participation)
    },

    participationStatus() {
      const inquiryStore = useInquiryStore()
      const ctx = createInquiryContext(inquiryStore)
      if (!ctx) return { canParticipate: false }
      return getParticipationStatus(ctx, this.participation)
    },
  },

  actions: {
    async loadParticipation(
      targetType: ParticipationTargetType,
      targetId: number,
    ): Promise<void> {
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
      targetType: ParticipationTargetType,
      targetId: number,
      policyType: ParticipationPolicyType,
      policyConfig: Record<string, unknown> = {},
    ): Promise<void> {
      // Single source of truth for “no policy”
      if (policyType === 'none') {
        return this.deleteParticipation(targetType, targetId)
      }
      try {
        const response = await ParticipationAPI.setParticipation(
          targetType, targetId, policyType, policyConfig,
        )
        this.participation = response.data.participation
        Logger.info('Participation policy updated', { targetType, targetId, policyType })
      } catch (error) {
        Logger.error('Error setting participation', { error, targetType, targetId, policyType })
        throw error
      }
    },

    async deleteParticipation(
      targetType: ParticipationTargetType,
      targetId: number,
    ): Promise<void> {
      try {
        await ParticipationAPI.deleteParticipation(targetType, targetId)
        this.participation = null
        Logger.info('Participation policy deleted', { targetType, targetId })
      } catch (error) {
        Logger.error('Error deleting participation', { error, targetType, targetId })
        throw error
      }
    },

    async getLotteryStatus(targetType: ParticipationTargetType, targetId: number) {
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

    async resetLottery(targetType: ParticipationTargetType, targetId: number): Promise<void> {
      try {
        const response = await ParticipationAPI.resetLottery(targetType, targetId)
        this.participation = response.data.participation
        Logger.info('Lottery reset', { targetType, targetId })
      } catch (error) {
        Logger.error('Error resetting lottery', { error, targetType, targetId })
        throw error
      }
    },

    async getEligiblePool(targetType: ParticipationTargetType, targetId: number) {
      try {
        const response = await ParticipationAPI.getEligiblePool(targetType, targetId)
        return response.data
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return []
        Logger.error('Error getting eligible pool', { error, targetType, targetId })
        throw error
      }
    },

    async runLottery(
      targetType: ParticipationTargetType,
      targetId: number,
      seed?: string | number,
    ) {
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

    async validateLottery(targetType: ParticipationTargetType, targetId: number) {
      this.loading.lottery = true
      try {
        const response = await ParticipationAPI.validateLottery(targetType, targetId)
        return response.data
      } catch (error) {
        Logger.error('Error validating lottery', { error, targetType, targetId })
        throw error
      } finally {
        this.loading.lottery = false
      }
    },

    async cancelLottery(
      targetType: ParticipationTargetType,
      targetId: number,
      reason: string,
    ) {
      this.loading.lottery = true
      try {
        const response = await ParticipationAPI.cancelLottery(targetType, targetId, reason)
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
