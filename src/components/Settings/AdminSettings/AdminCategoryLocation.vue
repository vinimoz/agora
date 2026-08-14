/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { ref, onMounted, computed } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import TreeItem from './TreeItem.vue'
import BaseEntry from '../../../Types/index.ts'
import { useAppSettingsStore } from '../../../stores/appSettings'

const appSettingsStore = useAppSettingsStore()

// Form fields - maintenant des objets pour NcSelect
const selectedCategory = ref({ value: 0, label: t('agora', 'No parent') })
const selectedLocation = ref({ value: 0, label: t('agora', 'No parent') })

// FOR BUILD THE TREE
const categories = computed(() => appSettingsStore.categoryTab || [])
const locations = computed(() => appSettingsStore.locationTab || [])

// FOR THE SELECT
const newCategory = ref({ name: '', parentId: 0 })
const newLocation = ref({ name: '', parentId: 0 })

const editingItem = ref(null)
const activeTab = ref('categories')
const isLoaded = ref(false)

// MOUNTED
onMounted(() => {
  isLoaded.value = true
})

const hierarchicalCategory = computed(() => {
  if (!Array.isArray(appSettingsStore.categoryTab)) return []

  const categoriesList = buildHierarchy(appSettingsStore.categoryTab).map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))

  return [{ value: 0, label: t('agora', 'No parent') }, ...categoriesList]
})

const hierarchicalLocation = computed(() => {
  if (!Array.isArray(appSettingsStore.locationTab)) return []

  const locationsList = buildHierarchy(appSettingsStore.locationTab).map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))
  return [{ value: 0, label: t('agora', 'No parent') }, ...locationsList]
})

function buildHierarchy(list: BaseEntry[], parentId = 0, depth = 0): BaseEntry[] {
  if (!Array.isArray(list)) return []
  return list
    .filter((item) => item?.parentId === parentId)
    .map((item) => {
      const children = buildHierarchy(list, item.id, depth + 1)
      return {
        ...item,
        depth,
        children,
      }
    })
    .flatMap((item) => [item, ...item.children])
}

// METHODS USED INTO BUILD THE TREE
const editingOptions = computed(() => {
  if (!editingItem.value) return []

  if (editingItem.value.type === 'category') {
    return hierarchicalCategory.value.filter((opt) => opt.value !== editingItem.value.id)
  }
  return hierarchicalLocation.value.filter((opt) => opt.value !== editingItem.value.id)
})

const addCategory = () => {
  if (newCategory.value.name.trim()) {
    const parentId = selectedCategory.value?.value || 0
    appSettingsStore.addCategory(newCategory.value.name, parentId)
    newCategory.value.name = ''
    selectedCategory.value = { value: 0, label: t('agora', 'No parent') }
  }
}

const addLocation = () => {
  if (newLocation.value.name.trim()) {
    const parentId = selectedLocation.value?.value || 0
    appSettingsStore.addLocation(newLocation.value.name, parentId)
    newLocation.value.name = ''
    selectedLocation.value = { value: 0, label: t('agora', 'No parent') }
  }
}

const editingParent = computed({
  get: () => {
    if (!editingItem.value) return { value: 0, label: t('agora', 'No parent') }

    const parentId = editingItem.value.parentId || 0
    if (editingItem.value.type === 'category') {
      return (
        hierarchicalCategory.value.find((opt) => opt.value === parentId) || {
          value: 0,
          label: t('agora', 'No parent'),
        }
      )
    }
    return (
      hierarchicalLocation.value.find((opt) => opt.value === parentId) || {
        value: 0,
        label: t('agora', 'No parent'),
      }
    )
  },
  set: (selectedOption) => {
    if (editingItem.value && selectedOption) {
      editingItem.value.parentId = Number(selectedOption.value) || 0
    }
  },
})

const editItem = (item, type) => {
  editingItem.value = {
    ...item,
    type,
    parentId: item.parentId || 0,
  }
}

const saveEdit = () => {
  if (editingItem.value) {
    if (editingItem.value.type === 'category') {
      appSettingsStore.updateCategory(
        editingItem.value.id,
        editingItem.value.name,
        editingItem.value.parentId
      )
    } else {
      appSettingsStore.updateLocation(
        editingItem.value.id,
        editingItem.value.name,
        editingItem.value.parentId
      )
    }
    editingItem.value = null
  }
}

const deleteItem = (id, type) => {
  if (confirm(t('agora', 'Are you sure you want to delete this item?'))) {
    try {
      if (type === 'category') {
        appSettingsStore.deleteCategory(id)
      } else {
        appSettingsStore.deleteLocation(id)
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert(t('agora', 'Error deleting item'))
    }
  }
}

const rootCategories = computed(() => categories.value.filter((item) => item.parentId === 0))

const rootLocations = computed(() => locations.value.filter((item) => item.parentId === 0))
</script>

<template>
  <div class="category-location-manager">
    <div v-if="!isLoaded" class="loading">
      {{ t('agora', 'Loading categories and locations') }}
    </div>

    <div v-else>
      <div class="tabs">
        <NcButton :class="{ active: activeTab === 'categories' }" @click="activeTab = 'categories'">
          {{ t('agora', 'Categories') }}
        </NcButton>
        <NcButton :class="{ active: activeTab === 'locations' }" @click="activeTab = 'locations'">
          {{ t('agora', 'Locations') }}
        </NcButton>
      </div>

      <div v-if="activeTab === 'categories'" class="tab-content">
        <div class="add-form">
          <h3>{{ t('agora', 'Add new category') }}</h3>
          <div class="form-fields">
            <NcInputField
              v-model="newCategory.name"
              :label="t('agora', 'Category name')"
              :placeholder="t('agora', 'Enter category name')"
            />
            <NcSelect
              v-model="selectedCategory"
              :options="hierarchicalCategory"
              :clearable="false"
              :placeholder="t('agora', 'Select parent category')"
            />
            <NcButton type="primary" :disabled="!newCategory.name.trim()" @click="addCategory">
              {{ t('agora', 'Add category') }}
            </NcButton>
          </div>
        </div>

        <div class="tree-view">
          <h3>{{ t('agora', 'Categories tree') }}</h3>
          <div class="tree-container">
            <TreeItem
              v-for="item in rootCategories"
              :key="'cat-' + item.id"
              :item="item"
              :items="categories"
              :level="0"
              type="category"
              @edit="editItem"
              @delete="deleteItem"
            />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'locations'" class="tab-content">
        <div class="add-form">
          <h3>{{ t('agora', 'Add new location') }}</h3>
          <div class="form-fields">
            <NcInputField
              v-model="newLocation.name"
              :label="t('agora', 'Location name')"
              :placeholder="t('agora', 'Enter location name')"
            />
            <NcSelect
              v-model="selectedLocation"
              :options="hierarchicalLocation"
              :clearable="false"
              :placeholder="t('agora', 'Select parent location')"
            />
            <NcButton type="primary" :disabled="!newLocation.name.trim()" @click="addLocation">
              {{ t('agora', 'Add location') }}
            </NcButton>
          </div>
        </div>

        <div class="tree-view">
          <h3>{{ t('agora', 'Locations tree') }}</h3>
          <div class="tree-container">
            <TreeItem
              v-for="item in rootLocations"
              :key="'loc-' + item.id"
              :item="item"
              :items="locations"
              :level="0"
              type="location"
              @edit="editItem"
              @delete="deleteItem"
            />
          </div>
        </div>
      </div>

      <!-- Modal d'édition -->
      <div v-if="editingItem" class="modal">
        <div class="modal-content">
          <h3>
            {{ t('agora', 'Edit') }}
            {{ editingItem.type === 'category' ? t('agora', 'Category') : t('agora', 'Location') }}
          </h3>
          <NcInputField
            v-model="editingItem.name"
            :label="
              editingItem.type === 'category'
                ? t('agora', 'Category name')
                : t('agora', 'Location name')
            "
          />
          <NcSelect
            v-model="editingParent"
            :options="editingOptions"
            :clearable="false"
            :placeholder="t('agora', 'Select parent')"
          />
          <div class="modal-actions">
            <NcButton @click="editingItem = null">
              {{ t('agora', 'Cancel') }}
            </NcButton>
            <NcButton type="primary" @click="saveEdit">
              {{ t('agora', 'Save') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-location-manager {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  min-height: 80vh;
  background: var(--color-main-background);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Menu simple appliqué aux tabs - Style forcé */
.tabs {
  display: flex;
  background: var(--color-background-dark);
  border-bottom: 1px solid var(--color-border);
  padding: 0;
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
}

.tabs :deep(.button-vue) {
  flex: 1 !important;
  background: none !important;
  border: none !important;
  padding: 16px 20px !important;
  color: var(--color-text-lighter) !important;
  cursor: pointer;
  transition: all 0.2s ease !important;
  border-bottom: 3px solid transparent !important;
  font-size: 1em !important;
  font-weight: 500 !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.tabs :deep(.button-vue):hover {
  background: var(--color-background-hover) !important;
  color: var(--color-text-light) !important;
}

.tabs :deep(.button-vue.active) {
  color: var(--color-primary) !important;
  border-bottom-color: var(--color-primary) !important;
  background: var(--color-background-darker) !important;
}

.tabs :deep(.button-vue--vue-secondary) {
  --button-background-hover: var(--color-background-hover) !important;
  --button-color-hover: var(--color-text-light) !important;
}

.tabs :deep(.button-vue--vue-secondary.active) {
  --button-background: var(--color-background-darker) !important;
  --button-color: var(--color-primary) !important;
  --button-border-color: transparent !important;
}

.tab-content {
  margin-top: 0;
  background: var(--color-main-background);
  border-radius: 0 0 12px 12px;
  padding: 30px;
  height: auto;
  overflow: visible;
  flex: 1;
}

.add-form {
  margin-bottom: 30px;
  padding: 25px;
  background: var(--color-background-dark);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.add-form h3 {
  margin: 0 0 20px 0;
  color: var(--color-text);
  font-weight: 600;
  font-size: 18px;
}

.form-fields {
  display: flex;
  gap: 15px;
  align-items: end;
  flex-wrap: wrap;
}

.form-fields .nc-input-field,
.form-fields .nc-select {
  flex: 1;
  min-width: 200px;
}

.tree-view {
  margin-top: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tree-view h3 {
  margin: 0 0 20px 0;
  color: var(--color-text);
  font-weight: 600;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-border);
}

.tree-container {
  margin-top: 15px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  background: var(--color-background-dark);
  max-height: 500px;
  overflow-y: auto;
  flex: 1;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  color: var(--color-text-lighter);
  font-size: 16px;
}

.error {
  color: var(--color-error);
  background: var(--color-error-background);
  border: 1px solid var(--color-error-border);
  border-radius: 8px;
  margin: 20px 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--color-main-background);
  padding: 30px;
  border-radius: 12px;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin: 0 0 20px 0;
  color: var(--color-text);
  font-weight: 600;
  font-size: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.category-location-manager > div:last-child {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Responsive design */
@media (max-width: 768px) {
  .category-location-manager {
    padding: 0;
    min-height: auto;
    margin: 10px;
  }

  .tabs {
    flex-direction: column;
    gap: 0;
  }

  .tabs :deep(.button-vue) {
    padding: 16px 20px !important;
    border-bottom: 2px solid transparent !important;
    border-right: 3px solid transparent !important;
    text-align: left !important;
  }

  .tabs :deep(.button-vue.active) {
    border-bottom-color: transparent !important;
    border-right-color: var(--color-primary) !important;
  }

  .tab-content {
    padding: 20px;
  }

  .form-fields {
    flex-direction: column;
    align-items: stretch;
  }

  .form-fields .nc-input-field,
  .form-fields .nc-select {
    min-width: auto;
  }

  .modal-content {
    min-width: auto;
    margin: 20px;
    padding: 20px;
    max-height: 70vh;
  }

  .tree-container {
    max-height: 400px;
  }
}

.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-location-manager {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.category-location-manager > div:last-child {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
