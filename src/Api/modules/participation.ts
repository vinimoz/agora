/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'

export interface ParticipationPolicy {
  id?: number
  targetType: string
  targetId: number
  policyType: 'everyone' | 'users' | 'groups' | 'lottery'
  policyConfig: Record<string, any>
  createdAt?: number
  updatedAt?: number
  createdBy?: string
}

const participation = {
  // ============================================================
  // PARTICIPATION
  // ============================================================

  getParticipation(targetType: string, targetId: number): Promise<AxiosResponse<{ participation: ParticipationPolicy }>> {
    return httpInstance.request({
      method: 'GET',
      url: `participation/${targetType}/${targetId}`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getParticipation.name].handleRequestCancellation().token,
    })
  },

  setParticipation(
    targetType: string,
    targetId: number,
    policyType: string,
    policyConfig: Record<string, any> = {}
  ): Promise<AxiosResponse<{ participation: ParticipationPolicy }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `participation/${targetType}/${targetId}`,
      data: { policyType, policyConfig },
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.setParticipation.name].handleRequestCancellation().token,
    })
  },

  deleteParticipation(targetType: string, targetId: number): Promise<AxiosResponse<{ deleted: boolean }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `participation/${targetType}/${targetId}`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.deleteParticipation.name].handleRequestCancellation().token,
    })
  },

  // ============================================================
  // LOTTERY METHODS
  // ============================================================

  getLotteryStatus(targetType: string, targetId: number): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'GET',
      url: `participation/${targetType}/${targetId}/lottery/status`,
      cancelToken: cancelTokenHandlerObject[this.getLotteryStatus.name].handleRequestCancellation().token,
    })
  },

  getEligiblePool(targetType: string, targetId: number): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'GET',
      url: `participation/${targetType}/${targetId}/lottery/pool`,
      cancelToken: cancelTokenHandlerObject[this.getEligiblePool.name].handleRequestCancellation().token,
    })
  },

  runLottery(targetType: string, targetId: number, seed?: string): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'POST',
      url: `participation/${targetType}/${targetId}/lottery/run`,
      data: { seed },
      cancelToken: cancelTokenHandlerObject[this.runLottery.name].handleRequestCancellation().token,
    })
  },

  validateLottery(targetType: string, targetId: number): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'POST',
      url: `participation/${targetType}/${targetId}/lottery/validate`,
      cancelToken: cancelTokenHandlerObject[this.validateLottery.name].handleRequestCancellation().token,
    })
  },

  resetlLottery(targetType: string, targetId: number): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'POST',
      url: `participation/${targetType}/${targetId}/lottery/reset`,
      cancelToken: cancelTokenHandlerObject[this.resetLottery.name].handleRequestCancellation().token,
    })
  },

  cancelLottery(targetType: string, targetId: number, reason: string): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'POST',
      url: `participation/${targetType}/${targetId}/lottery/cancel`,
      data: { reason },
      cancelToken: cancelTokenHandlerObject[this.cancelLottery.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(participation)

export default participation
