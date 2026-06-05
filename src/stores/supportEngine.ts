/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { emit } from '@nextcloud/event-bus'
import type { 
    SupportEngine, 
    SupportResult, 
    EngineDefinition,
    Phase,
} from '../Types/index'
import { ENGINE_DEFINITIONS , Event } from '../Types/index'
import { SupportEngineAPI } from '../Api/index'
import { useSupportResultStore } from './supportResult'
import { Logger } from '../helpers/index'
import { useSupportsStore } from './supports'

export const useSupportEngineStore = defineStore('supportEngine', () => {
    const engines = ref<SupportEngine[]>([])
    const currentEngine = ref<SupportEngine | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const initialized = ref(false)
    const isLoadingEngines = ref(false)

    // Integration with results store
    const resultStore = useSupportResultStore()

    // Getters
    function setCurrentEngine(engine: SupportEngine | null): void {
        currentEngine.value = engine
    }

    const activeEngines = computed(() => {
        if (!engines.value || !Array.isArray(engines.value)) return []
        return engines.value.filter(engine => engine.status === 'active')
    })

    const draftEngines = computed(() => {
        if (!engines.value || !Array.isArray(engines.value)) return []
        return engines.value.filter(engine => engine.status === 'draft')
    })

    const closedEngines = computed(() => {
        if (!engines.value || !Array.isArray(engines.value)) return []
        return engines.value.filter(engine => engine.status === 'closed')
    })

    const getEngineById = computed(() => (id: number) => {
        if (!engines.value || !Array.isArray(engines.value)) return null
        return engines.value.find(engine => engine.id === id) || null
    })

    const getEngineByType = computed(() => (type: string) => {
        if (!engines.value || !Array.isArray(engines.value)) return null
        return engines.value.find(engine => engine.engine === type) || null
    })

    const getEnginesByInquiry = computed(() => (inquiryId: number) => {
        console.log('[supportEngine] getEnginesByInquiry:', {
            requestedId: inquiryId,
            enginesCount: engines.value?.length || 0,
            hasEngines: !!engines.value
        })
        
        // Ensure we return an array even if engines.value is undefined
        if (!engines.value || !Array.isArray(engines.value)) {
            return []
        }
        return engines.value
    })

    const getEnginesByInquiryGroup = computed(() => (inquiryGroupId: number) => {
        if (!engines.value || !Array.isArray(engines.value)) return []
        return engines.value.filter(engine => engine.inquiry_group_id === inquiryGroupId)
    })

    const getEnginesByTarget = computed(() => (targetType: 'inquiry' | 'option', targetId: number) => {
        if (!engines.value || !Array.isArray(engines.value)) return []
        return engines.value.filter(engine => 
            engine.target_type === targetType && engine.target_ids.includes(targetId)
        )
    })

    const getActiveEngineForTarget = computed(() => (targetType: 'inquiry' | 'option', targetId: number) => {
        if (!engines.value || !Array.isArray(engines.value)) return null
        return engines.value.find(engine => 
            engine.status === 'active' &&
            engine.target_type === targetType && 
            engine.target_ids.includes(targetId)
        ) || null
    })

    const isEngineActive = computed(() => (engineId: number) => {
        if (!engines.value || !Array.isArray(engines.value)) return false
        const engine = engines.value.find(e => e.id === engineId)
        return engine?.status === 'active'
    })

    const getEngineConfig = computed(() => (engineId: number): Record<string, unknown> => {
        if (!engines.value || !Array.isArray(engines.value)) return {}
        const engine = engines.value.find(e => e.id === engineId)
        return engine?.config || {}
    })

    const hasActiveEngine = computed(() => {
        if (!engines.value || !Array.isArray(engines.value)) return false
        return activeEngines.value.length > 0
    })

    // ====================================================================
    // ACTIONS
    // ====================================================================

    async function loadEnginesByInquiry(inquiryId: number): Promise<void> {
        if (isLoadingEngines.value) {
            console.log('[supportEngine] Already loading engines, skipping')
            return
        }
        
        console.log('[supportEngine] Loading engines for inquiry:', inquiryId)
        isLoadingEngines.value = true
        loading.value = true
        error.value = null
        
        try {
            const response = await SupportEngineAPI.getEnginesByInquiry(inquiryId)
            
            const loadedEngines = response.data?.engines || []
            engines.value = loadedEngines
            console.log('[supportEngine] Loaded engines:', engines.value.length)
            
            initialized.value = true

            // Set current engine
            if (engines.value.length > 0) {
                const active = engines.value.find(e => e.status === 'active')
                if (active) {
                    currentEngine.value = active
                    console.log('[supportEngine] Set current engine to active:', active.id)
                } else {
                    currentEngine.value = engines.value[0]
                    console.log('[supportEngine] Set current engine to first:', engines.value[0].id)
                }
            } else {
                currentEngine.value = null
            }

            // Load results for active engines
             await loadActiveEngineResults()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load engines'
            Logger.error('Error loading support engines for inquiry:', { error: err, inquiryId })
            engines.value = []
            throw err
        } finally {
            loading.value = false
            isLoadingEngines.value = false
        }
    }

    async function loadEnginesByInquiryGroup(inquiryGroupId: number): Promise<void> {
        if (isLoadingEngines.value) return
        
        isLoadingEngines.value = true
        loading.value = true
        error.value = null
        try {
            const response = await SupportEngineAPI.getEnginesByInquiryGroup(inquiryGroupId)
            engines.value = response.data?.engines || []
            initialized.value = true
            await loadActiveEngineResults()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load engines'
            Logger.error('Error loading support engines for group:', { error: err, inquiryGroupId })
            engines.value = []
            throw err
        } finally {
            loading.value = false
            isLoadingEngines.value = false
        }
    }

    async function createEngine(engine: Omit<SupportEngine, 'id' | 'created'>): Promise<SupportEngine | null> {
        loading.value = true
        error.value = null
        try {
            const response = await SupportEngineAPI.createEngine(engine)
            const newEngine = response.data
            if (!engines.value) engines.value = []
            engines.value.push(newEngine)

            emit(Event.UpdateSupports, { action: 'engine-created', engine: newEngine })
            return newEngine
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to create engine'
            Logger.error('Error creating support engine:', { error: err, engine })
            return null
        } finally {
            loading.value = false
        }
    }

    async function updateEngine(id: number, data: Partial<SupportEngine>): Promise<SupportEngine | null> {
        if (!engines.value || !Array.isArray(engines.value)) return null
        
        const engine = engines.value.find(e => e.id === id)
        if (!engine) return null

        const hasExistingSupports = await hasSupports(id)
        const allowedUpdatesForActive = ['status']
        const requestedKeys = Object.keys(data)

        if (hasExistingSupports && !requestedKeys.every(k => allowedUpdatesForActive.includes(k))) {
            error.value = 'Cannot modify engine configuration after votes have been cast. Only status changes are allowed.'
            return null
        }
        loading.value = true
        error.value = null
        try {
            const response = await SupportEngineAPI.updateEngine(id, data)
            const updatedEngine = response.data

            const index = engines.value.findIndex(e => e.id === id)
            if (index !== -1) {
                engines.value[index] = updatedEngine
            }

            if (currentEngine.value?.id === id) {
                currentEngine.value = updatedEngine
            }

            emit(Event.UpdateSupports, { action: 'engine-updated', engine: updatedEngine })
            return updatedEngine
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to update engine'
            Logger.error('Error updating support engine:', { error: err, id, data })
            return null
        } finally {
            loading.value = false
        }
    }

    async function hasSupports(engineId: number): Promise<boolean> {
        const { supports } = useSupportsStore()
        if (!supports.value) return false
        return supports.value.some(s => s.supportEngineId === engineId)
    }

    async function deleteEngine(id: number): Promise<boolean> {
        loading.value = true
        error.value = null
        try {
            await SupportEngineAPI.deleteEngine(id)
            if (engines.value && Array.isArray(engines.value)) {
                engines.value = engines.value.filter(e => e.id !== id)
            }

            if (currentEngine.value?.id === id) {
                currentEngine.value = null
            }

            emit(Event.UpdateSupports, { action: 'engine-deleted', id })
            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete engine'
            Logger.error('Error deleting support engine:', { error: err, id })
            return false
        } finally {
            loading.value = false
        }
    }

    function clearEngines(): void {
        engines.value = []
        currentEngine.value = null
        initialized.value = false
    }

    function setEngines(enginesList: SupportEngine[] | []): void {
        engines.value = enginesList || []
        initialized.value = true
    }

    async function initializeFromInquiry(inquiryId: number, enginesList: SupportEngine[] | null): Promise<void> {
        if (!enginesList) {
            await loadEnginesByInquiry(inquiryId)
            return
        }

        engines.value = enginesList || []
        initialized.value = true

        if (engines.value.length > 0) {
            const active = engines.value.find(e => e.status === 'active')
            currentEngine.value = active || engines.value[0]
        } else {
            currentEngine.value = null
        }
       // await loadActiveEngineResults()
    }

    async function activateEngine(engine: SupportEngine): Promise<void> {
        if (engine.status !== 'active') {
            await updateEngine(engine.id, { status: 'active' })
        }

        setCurrentEngine(engine)

        if (resultStore.needsRecalculation(engine.id)) {
            await resultStore.calculateAndGetResults(engine.id)
        } else {
            await resultStore.loadEngineResults(engine.id)
        }
    }
    function getCurrentEngine(): SupportEngine[] {
        return currentEngine.value
    }

    async function calculateAllActiveResults(): Promise<void> {
        const active = activeEngines.value
        for (const engine of active) {
            if (resultStore.needsRecalculation(engine.id)) {
                await resultStore.calculateAndGetResults(engine.id)
            }
        }
    }

    async function loadActiveEngineResults(): Promise<void> {
        if (!engines.value || !Array.isArray(engines.value)) return
        const active = activeEngines.value
        for (const engine of active) {
            await resultStore.loadEngineResults(engine.id)
        }
    }

    async function cloneEngine(engineId: number, targetIds: number[]): Promise<SupportEngine | null> {
        if (!engines.value || !Array.isArray(engines.value)) return null
        
        const source = engines.value.find(e => e.id === engineId)
        if (!source) return null

        const cloned = {
            engine: source.engine,
            type: source.type,
            title: source.title,
            description: source.description,
            inquiry_id: source.inquiry_id,
            inquiry_group_id: source.inquiry_group_id,
            status: 'draft' as const,
            config: { ...source.config },
            target_type: source.target_type,
            target_ids: targetIds,
            metadata: source.metadata ? { ...source.metadata } : undefined
        }

        return await createEngine(cloned)
    }

    async function duplicateForPhase(engineId: number, phase: Phase): Promise<SupportEngine | null> {
        if (!engines.value || !Array.isArray(engines.value)) return null
        
        const source = engines.value.find(e => e.id === engineId)
        if (!source) return null

        return await createEngine({
            ...source,
            status: 'draft',
            metadata: {
                ...source.metadata,
                phase
            }
        })
    }

    function validateEngineConfig(engineType: string, config: Record<string, unknown>): { valid: boolean; errors: string[] } {
        const errors: string[] = []

        switch (engineType) {
            case 'quadratic':
                if (config.credits_per_user && (config.credits_per_user as number) <= 0) {
                    errors.push('Credits per user must be positive')
                }
                break
            case 'phased_voting':
                if (config.rounds && (config.rounds as number) < 2) {
                    errors.push('Phased voting requires at least 2 rounds')
                }
                break
            case 'token_weighted':
                if (!config.weight_source) {
                    errors.push('Token-weighted voting requires a weight source')
                }
                break
        }

        return { valid: errors.length === 0, errors }
    }

    function getEngineDefinition(engineType: string): EngineDefinition | null {
        return ENGINE_DEFINITIONS[engineType] || null
    }

    function reset(): void {
        engines.value = []
        currentEngine.value = null
        loading.value = false
        error.value = null
        initialized.value = false
        isLoadingEngines.value = false
    }

    return {
        // State
        engines,
        currentEngine,
        loading,
        error,
        initialized,
        // Getters
        activeEngines,
        draftEngines,
        closedEngines,
        getEngineById,
        getCurrentEngine,
        getEngineByType,
        getEnginesByInquiry,
        getEnginesByInquiryGroup,
        getEnginesByTarget,
        getActiveEngineForTarget,
        isEngineActive,
        getEngineConfig,
        hasActiveEngine,
        // Actions
        loadEnginesByInquiry,
        loadEnginesByInquiryGroup,
        createEngine,
        updateEngine,
        deleteEngine,
        setCurrentEngine,
        activateEngine,
       // getCurrentEngineResults,
        calculateAllActiveResults,
        loadActiveEngineResults,
        validateEngineConfig,
        getEngineDefinition,
        cloneEngine,
        setEngines,
        initializeFromInquiry,
        duplicateForPhase,
        clearEngines,
        reset
    }
})
