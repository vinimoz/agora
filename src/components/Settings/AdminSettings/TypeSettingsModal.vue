<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { ref } from 'vue'
import { t } from '@nextcloud/l10n'

import AdminTypeRights from './AdminTypeRights.vue'
import AdminTypeStatus from './AdminTypeStatus.vue'
import { InquiryGeneralIcons } from '../../../utils/icons.ts'
import { useAppSettingsStore } from '../../../stores/appSettings.js'

const appSettingsStore = useAppSettingsStore()

defineEmits(['close'])

const props = defineProps({
  selectedType: {
    type: Object,
    required: true
  }
})


const activeSettingsTab = ref('user-rights')

const getIconComponent = (iconName) => InquiryGeneralIcons[iconName] || InquiryGeneralIcons.default

const settingsTabs = [
  { 
    id: 'user-rights', 
    label: t('agora', 'Inquiry features'), 
    component: AdminTypeRights,
  },
  { 
    id: 'status', 
    label: t('agora', 'Inquiry status'), 
    component: AdminTypeStatus,
  },
]

const updateTypeRights = (typeKey, rights) => {
  appSettingsStore.inquiryTypeRights[typeKey] = rights
  appSettingsStore.write()
}
</script>

<template>
  <div class="type-settings-modal">
    <div class="modal-header">
      <div class="type-info">
        <div class="type-icon">
          <component :is="getIconComponent(selectedType.icon)" :size="20" />
        </div>
        <div class="type-details">
          <h3>{{ props.selectedType.label }}</h3>
          <p class="type-key">{{ props.selectedType.inquiry_type }}</p>
        </div>
      </div>
      <button class="close-button" @click="$emit('close')">
        {{ t('agora', 'Close') }}
      </button>
    </div>

    <div class="simple-menu">
      <button
        v-for="tab in settingsTabs"
        :key="tab.id"
        class="menu-item"
        :class="{ active: activeSettingsTab === tab.id }"
        @click="activeSettingsTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="settings-content">
      <component 
        :is="settingsTabs.find(t => t.id === activeSettingsTab)?.component"
        :selected-type="props.selectedType"
        @update-rights="updateTypeRights"
      />
    </div>
  </div>
</template>

<style scoped>
.type-settings-modal {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  width: 100%;
}

.modal-header {
  padding: 25px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.type-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.type-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: 12px;
  font-size: 28px;
  flex-shrink: 0;
}

.type-details h3 {
  margin: 0 0 8px 0;
  color: var(--color-text-light);
  font-size: 1.5em;
  font-weight: 600;
}

.type-key {
  margin: 0;
  font-family: monospace;
  color: var(--color-text-lighter);
  font-size: 1em;
  background: var(--color-background-darker);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.close-button {
  background: var(--color-background-darker);
  border: 1px solid var(--color-border);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-light);
}

.close-button:hover {
  background: var(--color-background-hover);
}

/* Menu simple */
.simple-menu {
  display: flex;
  background: var(--color-background-dark);
  border-bottom: 1px solid var(--color-border);
  padding: 0;
  flex-shrink: 0;
}

.menu-item {
  flex: 1;
  background: none;
  border: none;
  padding: 16px 20px;
  color: var(--color-text-lighter);
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  font-size: 1em;
  font-weight: 500;
}

.menu-item:hover {
  background: var(--color-background-hover);
  color: var(--color-text-light);
}

.menu-item.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  background: var(--color-background-darker);
}

/* Contenu */
.settings-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: var(--color-main-background);
}
</style>
