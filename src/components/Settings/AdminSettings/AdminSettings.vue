<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcAppSettingsDialog from '@nextcloud/vue/components/NcAppSettingsDialog'

import AdminFamiliesManager from './AdminFamiliesManager.vue'
import AdminTypesManager from './AdminTypesManager.vue'
import AdminOptionFamiliesManager from './AdminOptionFamiliesManager.vue'
import AdminOptionTypesManager from './AdminOptionTypesManager.vue'
import AdminInquiryGroupTypesManager from './AdminInquiryGroupTypesManager.vue'
import TypeSettingsModal from './TypeSettingsModal.vue'

// ============================================================
// STATE
// ============================================================
const domains = [
  { id: 'inquiry', label: t('agora', 'Inquiry Families') },
  { id: 'option', label: t('agora', 'Option Families') },
]

const activeDomainId = ref('inquiry')         // 'inquiry' | 'option'
const selectedFamily = ref(null)              // family object when drilled in
const activeSubTab = ref('types')             // 'types' | 'group-types'
const selectedType = ref(null)
const settingsModalOpen = ref(false)

// ============================================================
// COMPUTED
// ============================================================

/** Sub-tabs available once a family is selected */
const subTabs = computed(() => {
  if (activeDomainId.value === 'inquiry') {
    return [
      { id: 'types', label: t('agora', 'Inquiry Types') },
      { id: 'group-types', label: t('agora', 'Inquiry Group Types') },
    ]
  }
  return [
    { id: 'types', label: t('agora', 'Option Types') },
  ]
})

/** Which component renders right now */
const currentComponent = computed(() => {
  // Level 1 — no family selected → show family list
  if (!selectedFamily.value) {
    return activeDomainId.value === 'inquiry'
      ? AdminFamiliesManager
      : AdminOptionFamiliesManager
  }

  // Level 2 — family selected → show sub-manager
  if (activeDomainId.value === 'inquiry') {
    return activeSubTab.value === 'group-types'
      ? AdminInquiryGroupTypesManager
      : AdminTypesManager
  }
  return AdminOptionTypesManager
})

// ============================================================
// HANDLERS
// ============================================================
const switchDomain = (id) => {
  if (activeDomainId.value === id) return
  activeDomainId.value = id
  selectedFamily.value = null
  activeSubTab.value = 'types'
}

const handleFamilySelected = (family) => {
  selectedFamily.value = family
  activeSubTab.value = 'types' // always default to first sub-tab
}

const goBackToFamilies = () => {
  selectedFamily.value = null
  activeSubTab.value = 'types'
}

const handleTypeSelected = (type) => {
  selectedType.value = type
  settingsModalOpen.value = true
}

const handleSettingsModalClose = () => {
  settingsModalOpen.value = false
  selectedType.value = null
}
</script>

<template>
  <div class="admin-settings-container">
    <!-- ============================================================
         LEVEL 1 — Domain tabs (hidden once you drill in)
         ============================================================ -->
    <nav v-if="!selectedFamily" class="domain-tabs">
      <button
        v-for="domain in domains"
        :key="domain.id"
        class="domain-tab"
        :class="{ active: activeDomainId === domain.id }"
        @click="switchDomain(domain.id)"
      >
        {{ domain.label }}
      </button>
    </nav>

    <!-- ============================================================
         LEVEL 2 — Family context + sub-tabs (only when drilled in)
         ============================================================ -->
    <template v-if="selectedFamily">
      <div class="family-header">
        <NcButton @click="goBackToFamilies">
          ← {{ t('agora', 'Back to families') }}
        </NcButton>
        <div class="family-title">
          <h2>{{ selectedFamily.label || selectedFamily.family_type }}</h2>
          <code class="family-key">{{ selectedFamily.family_type }}</code>
        </div>
      </div>

      <nav class="sub-tabs" :class="{ single: subTabs.length === 1 }">
        <button
          v-for="tab in subTabs"
          :key="tab.id"
          class="sub-tab"
          :class="{ active: activeSubTab === tab.id }"
          :disabled="subTabs.length === 1"
          @click="activeSubTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>
    </template>

    <!-- ============================================================
         ACTIVE COMPONENT
         ============================================================ -->
    <div class="settings-content">
      <component
        :is="currentComponent"
        :key="`${activeDomainId}-${selectedFamily?.family_type ?? 'root'}-${activeSubTab}`"
        :selected-family="selectedFamily"
        @family-selected="handleFamilySelected"
        @type-selected="handleTypeSelected"
        @group-type-selected="handleTypeSelected"
        @back-to-families="goBackToFamilies"
      />
    </div>

    <!-- ============================================================
         SETTINGS MODAL (existing flow)
         ============================================================ -->
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

/* ---------- LEVEL 1 ---------- */
.domain-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.domain-tab {
  flex: 1;
  padding: 14px 20px;
  background: var(--color-background-dark);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text-lighter);
  font-size: 1.05em;
  font-weight: 600;
  text-align: center;
  transition: all 0.15s ease;
}

.domain-tab:hover {
  background: var(--color-background-hover);
  color: var(--color-main-text);
}

.domain-tab.active {
  background: var(--color-primary-element);
  color: var(--color-primary-element-text);
  border-color: var(--color-primary);
}

/* ---------- LEVEL 2 — Family header ---------- */
.family-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  background: var(--color-background-dark);
  border-radius: 10px;
  margin-bottom: 16px;
}

.family-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.family-title h2 {
  margin: 0;
  font-size: 1.15em;
}

.family-key {
  font-size: 0.85em;
  background: var(--color-background-hover);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--color-text-lighter);
}

/* ---------- LEVEL 2 — Sub-tabs ---------- */
.sub-tabs {
  display: flex;
  gap: 2px;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 24px;
}

.sub-tabs.single {
  border-bottom: 1px solid var(--color-border);
}

.sub-tab {
  background: transparent;
  border: none;
  padding: 12px 22px;
  cursor: pointer;
  color: var(--color-text-lighter);
  border-bottom: 3px solid transparent;
  font-size: 0.95em;
  font-weight: 500;
  margin-bottom: -2px;
  transition: all 0.15s ease;
}

.sub-tab:hover:not(:disabled) {
  color: var(--color-main-text);
  background: var(--color-background-hover);
}

.sub-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}

.sub-tab:disabled {
  cursor: default;
  opacity: 1;
}

/* ---------- Content ---------- */
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
