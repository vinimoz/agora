/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import type { SupportProcess, SupportResult } from '../Types/index.ts'

export const supportProcess = {
    /**
     * Get all processes for an engine
     * @param engineId - The engine ID
     */
    getProcessesByEngine(engineId: number): Promise<AxiosResponse<{ processes: SupportProcess[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/process/engine/${engineId}`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getProcessesByEngine.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get active process for an engine
     * @param engineId - The engine ID
     */
    getActiveProcess(engineId: number): Promise<AxiosResponse<{ process: SupportProcess }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/process/engine/${engineId}/active`,
            cancelToken: cancelTokenHandlerObject[this.getActiveProcess.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get processes by target
     * @param targetType - The target type (inquiry or option)
     * @param targetId - The target ID
     */
    getProcessesByTarget(
        targetType: 'inquiry' | 'option',
        targetId: number
    ): Promise<AxiosResponse<{ processes: SupportProcess[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/process/target/${targetType}/${targetId}`,
            cancelToken: cancelTokenHandlerObject[this.getProcessesByTarget.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get a single process with its results
     * @param id - The process ID
     */
    getProcess(id: number): Promise<AxiosResponse<{ process: SupportProcess }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/process/${id}`,
            cancelToken: cancelTokenHandlerObject[this.getProcess.name].handleRequestCancellation().token,
        })
    },

    /**
     * Create a new process
     * @param process - The process data
     * @param process.engine_id - The engine ID
     * @param process.target_type - The target type
     * @param process.target_id - The target ID
     * @param process.phase - The phase
     * @param process.metadata - Optional metadata
     */
    createProcess(process: {
        engine_id: number
        target_type: 'inquiry' | 'option'
        target_id: number
        phase?: string
        metadata?: Record<string, unknown>
    }): Promise<AxiosResponse<SupportProcess>> {
        return httpInstance.request({
            method: 'POST',
            url: 'support/process',
            data: process,
            cancelToken: cancelTokenHandlerObject[this.createProcess.name].handleRequestCancellation().token,
        })
    },

    /**
     * Update process status
     * @param id - The process ID
     * @param status - The new status
     */
    updateStatus(
        id: number, 
        status: 'pending' | 'active' | 'completed' | 'cancelled'
    ): Promise<AxiosResponse<{ process: SupportProcess }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `support/process/${id}/status`,
            data: { status },
            cancelToken: cancelTokenHandlerObject[this.updateStatus.name].handleRequestCancellation().token,
        })
    },

    /**
     * Update process phase
     * @param id - The process ID
     * @param phase - The new phase
     */
    updatePhase(
        id: number, 
        phase: string
    ): Promise<AxiosResponse<{ process: SupportProcess }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `support/process/${id}/phase`,
            data: { phase },
            cancelToken: cancelTokenHandlerObject[this.updatePhase.name].handleRequestCancellation().token,
        })
    },

    /**
     * Delete all processes for an engine
     * @param engineId - The engine ID
     */
    deleteProcessesByEngine(engineId: number): Promise<AxiosResponse<{ success: boolean }>> {
        return httpInstance.request({
            method: 'DELETE',
            url: `support/process/engine/${engineId}`,
            cancelToken: cancelTokenHandlerObject[this.deleteProcessesByEngine.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get process results
     * @param processId - The process ID
     */
    getProcessResults(processId: number): Promise<AxiosResponse<{ results: SupportResult[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/process/${processId}/results`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getProcessResults.name].handleRequestCancellation().token,
        })
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(SupportProcessAPI)

export default supportProcess
