// supportResultApi.ts
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import type { SupportResult, SupportResultData } from '../Types/index.ts'

export const SupportResultAPI = {
    /**
     * Get results for a specific support engine
     */
    getResultsByEngine(engineId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${engineId}/results`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getResultsByEngine.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get results for a specific target (inquiry or option)
     */
    getResultsByTarget(
        targetType: 'inquiry' | 'option',
        targetId: number,
        engineId?: number
    ): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/results/${targetType}/${targetId}`,
            params: {
                time: +new Date(),
                engineId
            },
            cancelToken: cancelTokenHandlerObject[this.getResultsByTarget.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get a single result by ID
     */
    getResult(resultId: number): Promise<AxiosResponse<{ result: SupportResult }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/result/${resultId}`,
            cancelToken: cancelTokenHandlerObject[this.getResult.name].handleRequestCancellation().token,
        })
    },

    /**
     * Calculate/refresh results for an engine
     */
    calculateResults(engineId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'POST',
            url: `support/engine/${engineId}/calculate`,
            cancelToken: cancelTokenHandlerObject[this.calculateResults.name].handleRequestCancellation().token,
        })
    },

    /**
     * Calculate results for a specific target
     */
    calculateTargetResults(
        engineId: number,
        targetType: 'inquiry' | 'option',
        targetId: number
    ): Promise<AxiosResponse<{ result: SupportResult }>> {
        return httpInstance.request({
            method: 'POST',
            url: `support/engine/${engineId}/calculate/${targetType}/${targetId}`,
            cancelToken: cancelTokenHandlerObject[this.calculateTargetResults.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get live results (real-time aggregated)
     */
    getLiveResults(engineId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${engineId}/results/live`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getLiveResults.name].handleRequestCancellation().token,
        })
    },

    /**
     * Export results in different formats
     */
    exportResults(
        engineId: number,
        format: 'json' | 'csv' | 'pdf' = 'json'
    ): Promise<AxiosResponse<Blob>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/${engineId}/results/export`,
            params: { format },
            responseType: 'blob',
            cancelToken: cancelTokenHandlerObject[this.exportResults.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get results history/changelog
     */
    getResultHistory(resultId: number): Promise<AxiosResponse<{ history: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/result/${resultId}/history`,
            cancelToken: cancelTokenHandlerObject[this.getResultHistory.name].handleRequestCancellation().token,
        })
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(SupportResultAPI)

export default SupportResultAPI
