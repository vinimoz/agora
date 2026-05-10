/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import type { SupportEngine, SupportResult } from '../Types/index.ts'

export const supportEngineApi = {
    // Get all engines for an inquiry
    getEnginesByInquiry(inquiryId: number): Promise<AxiosResponse<{ engines: SupportEngine[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/inquiry/${inquiryId}`,
            cancelToken: cancelTokenHandlerObject[this.getEnginesByInquiry.name].handleRequestCancellation().token,
        })
    },

    // Get all engines for an inquiry group
    getEnginesByInquiryGroup(inquiryGroupId: number): Promise<AxiosResponse<{ engines: SupportEngine[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/inquiry-group/${inquiryGroupId}`,
            cancelToken: cancelTokenHandlerObject[this.getEnginesByInquiryGroup.name].handleRequestCancellation().token,
        })
    },

    // Get a single engine
    getEngine(id: number): Promise<AxiosResponse<{ engine: SupportEngine }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${id}`,
            cancelToken: cancelTokenHandlerObject[this.getEngine.name].handleRequestCancellation().token,
        })
    },

    // Create new engine
    createEngine(data: Record<string, unknown>): Promise<AxiosResponse<SupportEngine>> {
        return httpInstance.request({
            method: 'POST',
            url: 'support/engine',
            data,
            cancelToken: cancelTokenHandlerObject[this.createEngine.name].handleRequestCancellation().token,
        })
    },

    // Update engine
    updateEngine(id: number, data: Record<string, unknown>): Promise<AxiosResponse<SupportEngine>> {
        return httpInstance.request({
            method: 'PUT',
            url: `support/engine/${id}`,
            data,
            cancelToken: cancelTokenHandlerObject[this.updateEngine.name].handleRequestCancellation().token,
        })
    },

    // Delete engine
    deleteEngine(id: number): Promise<AxiosResponse<void>> {
        return httpInstance.request({
            method: 'DELETE',
            url: `support/engine/${id}`,
            cancelToken: cancelTokenHandlerObject[this.deleteEngine.name].handleRequestCancellation().token,
        })
    },

    // Get engine results
    getEngineResults(engineId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${engineId}/results`,
            cancelToken: cancelTokenHandlerObject[this.getEngineResults.name].handleRequestCancellation().token,
        })
    },

    // Calculate results for an engine
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
}

const cancelTokenHandlerObject = createCancelTokenHandler(supportEngineApi)

export default supportEngineApi
