/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import type { SupportResult } from '../Types/index.ts'

export const supportResultApi = {
    // Get results for a specific engine
    getResultsByEngine(engineId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${engineId}/results`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getResultsByEngine.name].handleRequestCancellation().token,
        })
    },

    // Calculate/refresh results for an engine
    calculateResults(engineId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'POST',
            url: `support/engine/${engineId}/calculate`,
            cancelToken: cancelTokenHandlerObject[this.calculateResults.name].handleRequestCancellation().token,
        })
    },

    // Export results
    exportResults(engineId: number, format: 'json' | 'csv' = 'json'): Promise<AxiosResponse<Blob>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${engineId}/results/export`,
            params: { format },
            responseType: 'blob',
            cancelToken: cancelTokenHandlerObject[this.exportResults.name].handleRequestCancellation().token,
        })
    },

    createEmptyResult(data: {
    support_engine_id: number
    target_type: 'inquiry' | 'option'
    target_id: number
  }): Promise<AxiosResponse<{ result: SupportResult }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'support/result/empty',
      data,
      cancelToken: cancelTokenHandlerObject[this.createEmptyResult.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(supportResultApi)

export default supportResultApi
