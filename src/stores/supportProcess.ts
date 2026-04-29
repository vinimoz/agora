/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SupportProcess } from '../Types/index'
import { SupportProcessAPI } from '../Api/index'
import { Logger } from '../helpers/index'

export const useSupportProcessStore = defineStore('supportProcess', () => {
    // State
    const processes = ref<SupportProcess[]>([])
    const currentProcess = ref<SupportProcess | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const activeProcesses = computed(() => 
        processes.value.filter(p => p.status === 'active')
    )

    const completedProcesses = computed(() => 
        processes.value.filter(p => p.status === 'completed')
    )

    const pendingProcesses = computed(() => 
        processes.value.filter(p => p.status === 'pending')
    )

    const getProcessById = computed(() => (id: number) => 
        processes.value.find(p => p.id === id) || null
    )

    const getProcessesByEngine = computed(() => (engineId: number) =>
        processes.value.filter(p => p.support_engine_id === engineId)
    )

    const getActiveProcessForEngine = computed(() => (engineId: number) =>
        processes.value.find(p => 
            p.support_engine_id === engineId && p.status === 'active'
        ) || null
    )

    const getProcessesByTarget = computed(() => (targetType: 'inquiry' | 'option', targetId: number) =>
        processes.value.filter(p => 
            p.target_type === targetType && p.target_id === targetId
        )
    )

    // Actions
    async function loadProcessesByEngine(engineId: number): Promise<void> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportProcessAPI.getProcessesByEngine(engineId)
            
            // Merge with existing
            const existingIds = new Set(processes.value.map(p => p.id))
            const newProcesses = response.data.processes.filter(p => !existingIds.has(p.id))
            processes.value.push(...newProcesses)
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load processes'
            Logger.error('Error loading processes:', { error: err, engineId })
        } finally {
            loading.value = false
        }
    }

    async function loadActiveProcess(engineId: number): Promise<SupportProcess | null> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportProcessAPI.getActiveProcess(engineId)
            const process = response.data.process
            
            if (process) {
                const index = processes.value.findIndex(p => p.id === process.id)
                if (index !== -1) {
                    processes.value[index] = process
                } else {
                    processes.value.push(process)
                }
            }
            
            return process
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load active process'
            Logger.error('Error loading active process:', { error: err, engineId })
            return null
        } finally {
            loading.value = false
        }
    }

    async function loadProcess(id: number): Promise<SupportProcess | null> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportProcessAPI.getProcess(id)
            const process = response.data.process
            
            if (process) {
                const index = processes.value.findIndex(p => p.id === id)
                if (index !== -1) {
                    processes.value[index] = process
                } else {
                    processes.value.push(process)
                }
                
                currentProcess.value = process
            }
            
            return process
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load process'
            Logger.error('Error loading process:', { error: err, id })
            return null
        } finally {
            loading.value = false
        }
    }

    async function createProcess(
        engineId: number,
        targetType: 'inquiry' | 'option',
        targetId: number,
        phase: string = 'deliberative',
        metadata: Record<string, unknown> = {}
    ): Promise<SupportProcess | null> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportProcessAPI.createProcess({
                engine_id: engineId,
                target_type: targetType,
                target_id: targetId,
                phase,
                metadata
            })
            
            const process = response.data
            processes.value.push(process)
            return process
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to create process'
            Logger.error('Error creating process:', { error: err, engineId, targetType, targetId })
            return null
        } finally {
            loading.value = false
        }
    }

    async function updateProcessStatus(
        id: number, 
        status: 'pending' | 'active' | 'completed' | 'cancelled'
    ): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportProcessAPI.updateStatus(id, status)
            
            const index = processes.value.findIndex(p => p.id === id)
            if (index !== -1) {
                processes.value[index] = response.data.process
            }
            
            if (currentProcess.value?.id === id) {
                currentProcess.value = response.data.process
            }
            
            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to update process status'
            Logger.error('Error updating process status:', { error: err, id, status })
            return false
        } finally {
            loading.value = false
        }
    }

    async function updateProcessPhase(id: number, phase: string): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportProcessAPI.updatePhase(id, phase)
            
            const index = processes.value.findIndex(p => p.id === id)
            if (index !== -1) {
                processes.value[index] = response.data.process
            }
            
            if (currentProcess.value?.id === id) {
                currentProcess.value = response.data.process
            }
            
            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to update process phase'
            Logger.error('Error updating process phase:', { error: err, id, phase })
            return false
        } finally {
            loading.value = false
        }
    }

    async function deleteProcessesByEngine(engineId: number): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            await SupportProcessAPI.deleteProcessesByEngine(engineId)
            processes.value = processes.value.filter(p => p.support_engine_id !== engineId)
            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete processes'
            Logger.error('Error deleting processes:', { error: err, engineId })
            return false
        } finally {
            loading.value = false
        }
    }

    function setCurrentProcess(process: SupportProcess | null): void {
        currentProcess.value = process
    }

    function reset(): void {
        processes.value = []
        currentProcess.value = null
        loading.value = false
        error.value = null
    }

    return {
        // State
        processes,
        currentProcess,
        loading,
        error,
        
        // Getters
        activeProcesses,
        completedProcesses,
        pendingProcesses,
        getProcessById,
        getProcessesByEngine,
        getActiveProcessForEngine,
        getProcessesByTarget,
        
        // Actions
        loadProcessesByEngine,
        loadActiveProcess,
        loadProcess,
        createProcess,
        updateProcessStatus,
        updateProcessPhase,
        deleteProcessesByEngine,
        setCurrentProcess,
        reset
    }
})
