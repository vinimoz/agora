/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
// supportEngineApi.ts
export const SupportEngineAPI = {
    // Get all engines for a group
    getEngines(groupId: number): Promise<AxiosResponse<{ engines: SupportEngine[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `support/engine/group/${groupId}`,
            cancelToken: cancelTokenHandlerObject[this.getEngines.name].handleRequestCancellation().token,
        })
    },

    // Create new engine
    createEngine(engine: Omit<SupportEngine, 'id' | 'created'>): Promise<AxiosResponse<SupportEngine>> {
        return httpInstance.request({
            method: 'POST',
            url: 'support/engine',
            data: engine,
            cancelToken: cancelTokenHandlerObject[this.createEngine.name].handleRequestCancellation().token,
        })
    },

    // Update engine config
    updateEngine(id: number, config: Record<string, unknown>): Promise<AxiosResponse<SupportEngine>> {
        return httpInstance.request({
            method: 'PUT',
            url: `support/engine/${id}`,
            data: { config },
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
    }
}
