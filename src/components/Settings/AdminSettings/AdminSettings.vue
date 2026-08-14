<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAppSettingsDialog from '@nextcloud/vue/components/NcAppSettingsDialog'

// Import components
import AdminFamiliesManager from './AdminFamiliesManager.vue'
import AdminTypesManager from './AdminTypesManager.vue'
import TypeSettingsModal from './TypeSettingsModal.vue'

const currentView = ref('families')
const selectedFamily = ref(null)
const selectedType = ref(null)
const settingsModalOpen = ref(false)

// Navigation breadcrumb
const breadcrumb = computed(() => {
  const items = [
    { label: t('agora', 'Inquiry families'), view: 'families' }
  ]
  
  if (selectedFamily.value) {
    items.push({ 
      label: selectedFamily.value.label, 
      view: 'types' 
    })
  }
  
  return items
})

// Event handlers
const handleFamilySelected = (family) => {
  selectedFamily.value = family
  currentView.value = 'types'
}

const handleTypeSelected = (type) => {
  selectedType.value = type
  settingsModalOpen.value = true
}

const handleBreadcrumbClick = (view) => {
  if (view === 'families') {
    selectedFamily.value = null
    selectedType.value = null
  }
  currentView.value = view
}

const handleSettingsModalClose = () => {
  settingsModalOpen.value = false
  selectedType.value = null
}

// Composant actuel
const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'types':
      return AdminTypesManager
    case 'families':
    default:
      return AdminFamiliesManager
  }
})
</script>

<template>
  <div class="admin-settings-container">
    <!-- Breadcrumb Navigation -->
    <div v-if="breadcrumb.length > 0" class="breadcrumb">
      <span
        v-for="(item, index) in breadcrumb"
        :key="item.view"
        class="breadcrumb-item"
      >
        <button
          v-if="index < breadcrumb.length - 1"
          class="breadcrumb-link"
          @click="handleBreadcrumbClick(item.view)"
        >
          {{ item.label }}
        </button>
        <span v-else class="breadcrumb-current">
          {{ item.label }}
        </span>
        <span v-if="index < breadcrumb.length - 1" class="breadcrumb-separator">
          /
        </span>
      </span>
    </div>

    <!-- Main Content -->
    <div class="settings-content">
      <component 
        :is="currentComponent"
        :selected-family="selectedFamily"
        @family-selected="handleFamilySelected"
        @type-selected="handleTypeSelected"
        @back-to-families="handleBreadcrumbClick('families')"
      />
    </div>

    <NcAppSettingsDialog
      v-model:open="settingsModalOpen"
      :show-navigation="false"
      :name="t('agora', 'Settings - {type}', { type: selectedType?.label || '' })"
      class="large-modal"
      @close="handleSettingsModalClose"
    >
      <TypeSettingsModal
        v-if="selectedType"
        :selected-type="selectedType"
        @close="handleSettingsModalClose"
      />
    </NcAppSettingsDialog>
  </div>
</template>

<style scoped>
.admin-settings-container {
  min-height: 600px;
  background: var(--color-main-background);
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 25px;
  padding: 15px 20px;
  background: var(--color-background-dark);
  border-radius: 8px;
  font-size: 1em;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.breadcrumb-link {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.breadcrumb-link:hover {
  background: var(--color-background-hover);
}

.breadcrumb-current {
  color: var(--color-text-light);
  font-weight: 600;
  padding: 4px 8px;
}

.breadcrumb-separator {
  margin: 0 10px;
  color: var(--color-text-lighter);
}

.settings-content {
  flex: 1;
  overflow-y: auto;
}

:deep(.large-modal) {
  --width: 95vw;
  --height: 90vh;
  max-width: 1200px;
  max-height: 800px;
}

:deep(.large-modal .modal-container) {
  width: 95vw;
  height: 90vh;
  max-width: 1200px;
  max-height: 800px;
}
</style>
