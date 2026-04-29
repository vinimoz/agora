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

export const useSupportEngineStore = defineStore('supportEngine', () => {
  // State
  const engines = ref<SupportEngine[]>([])
  const currentEngine = ref<SupportEngine | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  
  // Integration with results store
  const resultStore = useSupportResultStore()

  // Getters
  const activeEngines = computed(() => 
    engines.value.filter(engine => engine.status === 'active')
  )

  const draftEngines = computed(() => 
    engines.value.filter(engine => engine.status === 'draft')
  )

  const closedEngines = computed(() => 
    engines.value.filter(engine => engine.status === 'closed')
  )

  const getEngineById = computed(() => (id: number) => 
    engines.value.find(engine => engine.id === id) || null
  )

  const getEngineByType = computed(() => (type: string) =>
    engines.value.find(engine => engine.engine === type) || null
  )

  const getEnginesByTarget = computed(() => (targetType: 'inquiry' | 'option', targetId: number) =>
    engines.value.filter(engine => 
      engine.target_type === targetType && engine.target_ids.includes(targetId)
    )
  )

  const getEnginesByGroup = computed(() => (groupId: number) =>
    engines.value.filter(engine => engine.group_id === groupId)
  )

  const getActiveEngineForTarget = computed(() => (targetType: 'inquiry' | 'option', targetId: number) =>
    engines.value.find(engine => 
      engine.status === 'active' &&
      engine.target_type === targetType && 
      engine.target_ids.includes(targetId)
    ) || null
  )

  const isEngineActive = computed(() => (engineId: number) => {
    const engine = engines.value.find(e => e.id === engineId)
    return engine?.status === 'active'
  })

  const getEngineConfig = computed(() => (engineId: number): Record<string, unknown> => {
    const engine = engines.value.find(e => e.id === engineId)
    return engine?.config || {}
  })

  const hasActiveEngine = computed(() => activeEngines.value.length > 0)

  // Actions
  async function loadEngines(groupId: number): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportEngineAPI.getEngines(groupId)
      engines.value = response.data.engines
      initialized.value = true
      
      // Load results for active engines
      await loadActiveEngineResults()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load engines'
      Logger.error('Error loading support engines:', { error: err, groupId })
      throw err
    } finally {
      loading.value = false
    }
  }

  async function loadEnginesForTarget(
    targetType: 'inquiry' | 'option',
    targetId: number
  ): Promise<SupportEngine[]> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportEngineAPI.getEnginesByTarget(targetType, targetId)
      const targetEngines = response.data.engines
      
      // Merge with existing engines
      const existingIds = new Set(engines.value.map(e => e.id))
      const newEngines = targetEngines.filter(e => !existingIds.has(e.id))
      engines.value.push(...newEngines)
      
      return targetEngines
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load target engines'
      Logger.error('Error loading engines for target:', { error: err, targetType, targetId })
      return []
    } finally {
      loading.value = false
    }
  }

  async function createEngine(engine: Omit<SupportEngine, 'id' | 'created'>): Promise<SupportEngine | null> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportEngineAPI.createEngine(engine)
      const newEngine = response.data
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

  async function updateEngineConfig(
    id: number, 
    config: Record<string, unknown>
  ): Promise<SupportEngine | null> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportEngineAPI.updateEngine(id, config)
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
      Logger.error('Error updating support engine:', { error: err, id, config })
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateEngineStatus(
    id: number, 
    status: 'draft' | 'active' | 'closed'
  ): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportEngineAPI.updateEngineStatus(id, status)
      const updatedEngine = response.data
      
      const index = engines.value.findIndex(e => e.id === id)
      if (index !== -1) {
        engines.value[index] = updatedEngine
      }
      
      if (status === 'active') {
        await resultStore.calculateAndGetResults(id)
      }
      
      emit(Event.UpdateSupports, { action: 'engine-status-changed', engine: updatedEngine })
      
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update engine status'
      Logger.error('Error updating engine status:', { error: err, id, status })
      return false
    } finally {
      loading.value = false
    }
  }

  async function deleteEngine(id: number): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      await SupportEngineAPI.deleteEngine(id)
      engines.value = engines.value.filter(e => e.id !== id)
      
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

  function setCurrentEngine(engine: SupportEngine | null): void {
    currentEngine.value = engine
  }

  /**
   * Activate an engine and load its results
   * @param engine - The engine to activate
   */
  async function activateEngine(engine: SupportEngine): Promise<void> {
    if (engine.status !== 'active') {
      await updateEngineStatus(engine.id, 'active')
    }
    
    setCurrentEngine(engine)
    
    if (resultStore.needsRecalculation(engine.id)) {
      await resultStore.calculateAndGetResults(engine.id)
    } else {
      await resultStore.loadEngineResults(engine.id)
    }
  }

  function getCurrentEngineResults(): SupportResult[] {
    if (!currentEngine.value) return []
    return resultStore.getResultsByEngine(currentEngine.value.id)
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
    const active = activeEngines.value
    for (const engine of active) {
      await resultStore.loadEngineResults(engine.id)
    }
  }

  /**
   * Apply engine to options
   * @param engineId - The engine ID
   * @param optionIds - The option IDs to apply to
   */
  async function applyEngineToOptions(
    engineId: number, 
    optionIds: number[]
  ): Promise<boolean> {
    try {
      await SupportEngineAPI.updateEngineTargets(engineId, optionIds)
      
      const engine = engines.value.find(e => e.id === engineId)
      if (engine) {
        engine.target_ids = optionIds
      }
      
      return true
    } catch (err) {
      Logger.error('Error applying engine to options:', { error: err, engineId, optionIds })
      return false
    }
  }

  /**
   * Validate engine configuration
   * @param engineType - The engine type
   * @param config - The configuration to validate
   */
  function validateEngineConfig(
    engineType: string, 
    config: Record<string, unknown>
  ): { valid: boolean; errors: string[] } {
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

  /**
   * Get engine definition from registry
   * @param engineType - The engine type
   */
  function getEngineDefinition(engineType: string): EngineDefinition | null {
    return ENGINE_DEFINITIONS[engineType] || null
  }

  /**
   * Clone an engine configuration
   * @param engineId - The engine ID to clone
   * @param targetIds - The new target IDs
   */
  async function cloneEngine(engineId: number, targetIds: number[]): Promise<SupportEngine | null> {
    const source = engines.value.find(e => e.id === engineId)
    if (!source) return null
    
    const cloned = {
      engine: source.engine,
      type: source.type,
      group_id: source.group_id,
      status: 'draft' as const,
      config: { ...source.config },
      target_type: source.target_type,
      target_ids: targetIds,
      metadata: source.metadata ? { ...source.metadata } : undefined
    }
    
    return await createEngine(cloned)
  }

  /**
   * Duplicate engine for different phase
   * @param engineId - The engine ID to duplicate
   * @param phase - The new phase
   */
  async function duplicateForPhase(
    engineId: number, 
    phase: Phase
  ): Promise<SupportEngine | null> {
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

  function reset(): void {
    engines.value = []
    currentEngine.value = null
    loading.value = false
    error.value = null
    initialized.value = false
  }

  return {
    engines,
    currentEngine,
    loading,
    error,
    initialized,
    activeEngines,
    draftEngines,
    closedEngines,
    getEngineById,
    getEngineByType,
    getEnginesByTarget,
    getEnginesByGroup,
    getActiveEngineForTarget,
    isEngineActive,
    getEngineConfig,
    hasActiveEngine,
    loadEngines,
    loadEnginesForTarget,
    createEngine,
    updateEngineConfig,
    updateEngineStatus,
    deleteEngine,
    setCurrentEngine,
    activateEngine,
    getCurrentEngineResults,
    calculateAllActiveResults,
    loadActiveEngineResults,
    applyEngineToOptions,
    validateEngineConfig,
    getEngineDefinition,
    cloneEngine,
    duplicateForPhase,
    reset
  }
})
