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
          <h3>{{ t('agora', 'Add New Category') }}</h3>
          <div class="form-fields">
            <NcInputField
              v-model="newCategory.name"
              :label="t('agora', 'Category Name')"
              :placeholder="t('agora', 'Enter category name')"
            />
            <NcSelect
              v-model="selectedCategory"
              :options="hierarchicalCategory"
              :clearable="false"
              :placeholder="t('agora', 'Select parent category')"
            />
            <NcButton type="primary" :disabled="!newCategory.name.trim()" @click="addCategory">
              {{ t('agora', 'Add Category') }}
            </NcButton>
          </div>
        </div>

        <div class="tree-view">
          <h3>{{ t('agora', 'Categories Tree') }}</h3>
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
          <h3>{{ t('agora', 'Add New Location') }}</h3>
          <div class="form-fields">
            <NcInputField
              v-model="newLocation.name"
              :label="t('agora', 'Location Name')"
              :placeholder="t('agora', 'Enter location name')"
            />
            <NcSelect
              v-model="selectedLocation"
              :options="hierarchicalLocation"
              :clearable="false"
              :placeholder="t('agora', 'Select parent location')"
            />
            <NcButton type="primary" :disabled="!newLocation.name.trim()" @click="addLocation">
              {{ t('agora', 'Add Location') }}
            </NcButton>
          </div>
        </div>

        <div class="tree-view">
          <h3>{{ t('agora', 'Locations Tree') }}</h3>
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
                ? t('agora', 'Category Name')
                : t('agora', 'Location Name')
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
/* Vos styles existants */
.category-location-manager {
  padding: 20px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.tabs NcButton {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tabs NcButton.active {
  border-bottom-color: var(--color-primary);
  color: var(--color-primary);
}

.tab-content {
  margin-top: 20px;
}

.add-form {
  margin-bottom: 30px;
  padding: 20px;
  background: var(--color-background-dark);
  border-radius: 8px;
}

.form-fields {
  display: flex;
  gap: 15px;
  align-items: end;
}

.tree-view {
  margin-top: 30px;
}

.tree-container {
  margin-top: 15px;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  color: var(--color-text-lighter);
}

.error {
  color: var(--color-error);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-main-background);
  padding: 30px;
  border-radius: 12px;
  min-width: 400px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
