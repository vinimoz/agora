/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SupportEngine, EngineConfig } from '../Types/index'
import { SupportAPI } from '../Api/index'

export const useSupportEngineStore = defineStore('supportEngine', () => {
  const engines = ref<SupportEngine[]>([])
  const currentEngine = ref<SupportEngine | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeEngines = computed(() => 
    engines.value.filter(engine => engine.status === 'active')
  )

  const getEngineById = (id: number) => 
    engines.value.find(engine => engine.id === id)

  const getEngineByType = (type: string) =>
    engines.value.find(engine => engine.engine === type)

  async function loadEngines(groupId: number): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportAPI.getEngines(groupId)
      engines.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load engines'
      console.error('Error loading support engines:', err)
    } finally {
      loading.value = false
    }
  }

  async function createEngine(engine: Omit<SupportEngine, 'id' | 'created'>): Promise<SupportEngine | null> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportAPI.createEngine(engine)
      engines.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create engine'
      console.error('Error creating support engine:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateEngine(id: number, config: EngineConfig): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const response = await SupportAPI.updateEngine(id, { config })
      const index = engines.value.findIndex(e => e.id === id)
      if (index !== -1) {
        engines.value[index] = response.data
      }
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update engine'
      console.error('Error updating support engine:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function deleteEngine(id: number): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      await SupportAPI.deleteEngine(id)
      engines.value = engines.value.filter(e => e.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete engine'
      console.error('Error deleting support engine:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  function setCurrentEngine(engine: SupportEngine | null): void {
    currentEngine.value = engine
  }

  return {
    engines,
    currentEngine,
    loading,
    error,
    activeEngines,
    getEngineById,
    getEngineByType,
    loadEngines,
    createEngine,
    updateEngine,
    deleteEngine,
    setCurrentEngine
  }
})
