<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'
import { InquiryGeneralIcons } from '../../../utils/icons.ts'
import { showError } from '@nextcloud/dialogs'

const emit = defineEmits(['familySelected'])
const appSettingsStore = useAppSettingsStore()
const editingFamily = ref(null)
const newFamily = ref({
  family_type: '',
  label: '',
  description: '',
  icon: null,
  sort_order: 0
})

// Helper to find icon object by id
const findIconById = (iconId) => {
  if (!iconId) return null
  return availableIcons.value.find(icon => icon.id === iconId) || null
}

const startEditing = (family) => {
  editingFamily.value = { 
    ...family,
    icon: findIconById(family.icon) // Convert string icon to object for NcSelect
  }
}

// Get statuses for the selected inquiry type
const availableIcons = computed(() =>
  Object.keys(InquiryGeneralIcons)
    .filter((key) => key !== 'default')
    .map((iconId) => ({
      id: iconId,
      label: t('agora', iconId.replace(/([A-Z])/g, ' $1').trim()),
    }))
)

const getIconComponent = (iconName) => InquiryGeneralIcons[iconName] || InquiryGeneralIcons.default

// Calculate types count for each family
const familiesWithStats = computed(() => appSettingsStore.inquiryFamilyTab.map(family => {
    const typesCount = appSettingsStore.inquiryTypeTab.filter(
      type => type.family === family.family_type
    ).length
    
    return {
      ...family,
      typesCount
    }
  }))

const extractIconId = (icon) => {
  if (!icon) return ''
  if (typeof icon === 'string') return icon
  if (typeof icon === 'object') return icon.id || ''
  return String(icon)
}

const addFamily = async () => {
  if (!newFamily.value.family_type ) {
  	showError(t('agora', 'Inquiry family type is mandatory'), { timeout: 2000 })
 	return 
  }
  
  await appSettingsStore.addFamily({
    ...newFamily.value,
    icon: extractIconId(newFamily.value.icon),
    created: Date.now()
  })    
          
  // Reset form 
  newFamily.value = {
    family_type: '',
    label: '',
    description: '',
    icon: '',
    sort_order: appSettingsStore.inquiryFamilyTab.length
  }         
}

const updateFamily = async (family) => {
  await appSettingsStore.updateFamily(family.id, {
    ...family,
    icon: extractIconId(family.icon),
  })
  editingFamily.value = null
}         

const deleteFamily = async (familyId) => {
  if (confirm(t('agora', 'Are you sure you want to delete this family?'))) {
    await appSettingsStore.deleteFamily(familyId)
  }
}

const selectFamily = (family) => {
  emit('familySelected', family)
}
</script>

<template>
  <div class="families-manager">
    <h2>{{ t('agora', 'Inquiry families management') }}</h2>
    <p class="description">
      {{ t('agora', 'Manage inquiry families to organize different types of inquiries. Each family can contain multiple inquiry types.') }}
    </p>

    <!-- Families List -->
    <div class="families-list">
      <h3>{{ t('agora', 'Existing families') }}</h3>
      <div 
        v-for="family in familiesWithStats" 
        :key="family.id" 
        class="family-item"
        @click="selectFamily(family)"
      >
        <div class="family-content">
          <div class="family-icon">
	  	<component :is="getIconComponent(family.icon)" :size="20" />
          </div>
          <div class="family-info">
            <h4>{{ family.label }}</h4>
            <p class="family-type">{{ family.family_type }}</p>
            <p v-if="family.description" class="family-description">
              {{ family.description }}
            </p>
            <div class="family-stats">
              <span class="types-count">
                {{ t('agora', '{count} types', { count: family.typesCount }) }}
              </span>
            </div>
          </div>
        </div>
        <div class="family-actions">
          <NcButton @click.stop="startEditing(family)">
            {{ t('agora', 'Edit') }}
          </NcButton>
          <NcButton @click.stop="deleteFamily(family.id)">
            {{ t('agora', 'Delete') }}
          </NcButton>
        </div>
      </div>
    </div>

    <!-- Add New Family Form -->
    <div class="add-family-form">
      <h3>{{ t('agora', 'Add new family') }}</h3>
      <div class="form-grid">
        <div class="form-row">
          <NcInputField
            v-model="newFamily.family_type"
            :label="t('agora', 'Family type key')"
            :placeholder="t('agora', 'E.g., deliberative, consultative')"
            required
            class="form-field"
          />
          
          <NcInputField
            v-model="newFamily.label"
            :label="t('agora', 'Display label')"
            :placeholder="t('agora', 'E.g., deliberative process')"
            required
           class="form-field"
          />
          
          <NcSelect
            v-model="newFamily.icon"
            :options="availableIcons"
	    :clearable="false"
	    track-by="id"
            :placeholder="t('agora', 'Select an icon')"
            class="form-field"
          />
        </div>
        
        <NcInputField
	  v-model="newFamily.description"
          :label="t('agora', 'Description')"
          :placeholder="t('agora', 'Optional description')"
          type="textarea"
          class="full-width"
        />
        
        <NcInputField
          v-model="newFamily.sort_order"
          :label="t('agora', 'Sort order')"
          type="number"
          :min="0"
          class="form-field"
        />
        
        <div class="form-actions">
          <NcButton 
            type="primary" 
            :disabled="!newFamily.family_type || !newFamily.label"
            @click="addFamily"
          >
            {{ t('agora', 'Add family') }}
          </NcButton>
        </div>
      </div>
    </div>

    <!-- Edit Family Modal -->
    <div v-if="editingFamily" class="modal-overlay">
      <div class="modal-content large-modal">
        <h3>{{ t('agora', 'Edit family') }}</h3>
        <div class="form-grid">
          <div class="form-row">
            <NcInputField
              v-model="editingFamily.family_type"
              :label="t('agora', 'Family type key')"
              required
              class="form-field"
            />
            <NcInputField
              v-model="editingFamily.label"
              :label="t('agora', 'Display label')"
              required
              class="form-field"
            />
            <NcSelect
              v-model="editingFamily.icon"
              :options="availableIcons"
	      track-by="id"
	      :clearable="false"
              :placeholder="t('agora', 'Select an icon')"
              class="form-field"
          />
        </div>
        </div>
	<div>
          <NcInputField
	   v-model="editingFamily.description"
            :label="t('agora', 'Description')"
            type="textarea"
            class="full-width"
          />
          <div class="modal-actions">
            <NcButton @click="editingFamily = null">
              {{ t('agora', 'Cancel') }}
            </NcButton>
            <NcButton 
              type="primary" 
              @click="updateFamily(editingFamily)"
            >
              {{ t('agora', 'Save changes') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.families-manager {
  padding: 20px;
}

.families-list {
  margin-bottom: 30px;
}

.families-list h3 {
  margin-bottom: 15px;
  color: var(--color-text-lighter);
}

.family-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: var(--color-background-dark);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.family-item:hover {
  background: var(--color-background-hover);
}

.family-content {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.family-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: 10px;
  font-size: 24px;
  flex-shrink: 0;
}

.family-info h4 {
  margin: 0 0 5px 0;
  color: var(--color-text-light);
}

.family-type {
  margin: 0;
  font-family: monospace;
  color: var(--color-text-lighter);
  font-size: 0.9em;
}

.family-description {
  margin: 5px 0 0 0;
  color: var(--color-text-lighter);
}

.family-stats {
  margin-top: 8px;
}

.types-count {
  font-size: 0.8em;
  color: var(--color-primary);
  background: var(--color-primary-element-light);
  padding: 2px 8px;
  border-radius: 12px;
}

.family-actions {
  display: flex;
  gap: 10px;
}

.add-family-form {
  padding: 20px;
  background: var(--color-background-dark);
  border-radius: 8px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  align-items: start;
}

.form-field {
  margin: 0;
}

.full-width {
  grid-column: 1 / -1;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
}

.modal-overlay {
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
  width: 800px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content.large-modal {
  width: 900px;
  max-width: 95vw;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
