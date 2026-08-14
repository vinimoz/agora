<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'
import { InquiryGeneralIcons } from '../../../utils/icons.ts'
import { showError } from '@nextcloud/dialogs'


interface Props {
  selectedFamily?: {
    family_type: string
  }
}

const props = defineProps<Props>()

const emit = defineEmits(['typeSelected', 'backToFamilies'])

const appSettingsStore = useAppSettingsStore()
const editingType = ref(null)
const newType = ref({
  inquiry_type: '',
  label: '',
  family: props.selectedFamily?.family_type || '',
  icon: '',
  description: '',
  fields: '[]',
  allowed_response: '[]',
  allowed_transformation: '[]',
  allowed_option_type: '[]'
})

const getIconComponent = (iconName) => InquiryGeneralIcons[iconName] || InquiryGeneralIcons.default


// Get statuses for the selected inquiry type
const availableIcons = computed(() =>
  Object.keys(InquiryGeneralIcons)
    .filter((key) => key !== 'default')
    .map((iconId) => ({
      id: iconId,
      label: t('agora', iconId.replace(/([A-Z])/g, ' $1').trim()),
    }))
)

const extractIconId = (icon) => {
  if (!icon) return ''
  if (typeof icon === 'string') return icon
  if (typeof icon === 'object') return icon.id || ''
  return String(icon)
}

// Filter types for selected family
const familyTypes = computed(() => 
  appSettingsStore.inquiryTypeTab.filter(
    type => type.family === props.selectedFamily?.family_type
  )
)

const convertToJsonString = (value) => {
  if (typeof value === 'string') return value
  return JSON.stringify(value || [])
}

const addType = async () => {
  if (!newType.value.inquiry_type ) {
  	showError(t('agora', 'Inquiry type is mandatory'), { timeout: 2000 })
  	return
  }

  await appSettingsStore.addInquiryType({
    ...newType.value,
    family: props.selectedFamily.family_type,
    created: Date.now(),
    icon: extractIconId(newType.value.icon),
    description: newType.value.description || '',
    fields: convertToJsonString(newType.value.fields),
    allowed_response: convertToJsonString(newType.value.allowed_response),
    allowed_transformation: convertToJsonString(newType.value.allowed_transformation),
    allowed_option_type: convertToJsonString(newType.value.allowed_option_type)
  })
  
  // Reset form
  newType.value = {
    inquiry_type: '',
    label: '',
    family: props.selectedFamily.family_type,
    icon: '',
    description: '',
    fields: '[]',
    allowed_response: '[]',
    allowed_transformation: '[]',
    allowed_option_type: '[]'
  }
}

const updateType = async (type) => {
  if (!type.inquiry_type ){
  	showError(t('agora', 'Inquiry type is mandatory'), { timeout: 2000 })
  	return
  }

  await appSettingsStore.updateInquiryType(type.id, {
    ...type,
    icon: extractIconId(type.icon),
    fields: convertToJsonString(type.fields),
    allowed_response: convertToJsonString(type.allowed_response),
    allowed_transformation: convertToJsonString(type.allowed_transformation),
    allowed_option_type: convertToJsonString(type.allowed_option_type)
  })
  editingType.value = null
}

const deleteType = async (typeId) => {
  if (confirm(t('agora', 'Are you sure you want to delete this inquiry type?'))) {
    await appSettingsStore.deleteType(typeId)
  }
}

const openTypeSettings = (type) => {
  emit('typeSelected', type)
}
</script>

<template>
  <div class="types-manager">
    <div class="header">
      <NcButton @click="emit('backToFamilies')">
        ← {{ t('agora', 'Back to families') }}
      </NcButton>
      <h2>
        {{ t('agora', 'Types for {family}', { family: selectedFamily?.label }) }}
      </h2>
    </div>

    <!-- Types List -->
    <div class="types-list">
      <h3>{{ t('agora', 'Configured types') }}</h3>
      <p class="list-description">
        {{ t('agora', 'Click on a type to configure its rights and status settings') }}
      </p>
      
      <div class="types-grid">
        <div 
          v-for="type in familyTypes" 
          :key="type.id" 
          class="type-card"
          @click="openTypeSettings(type)"
        >
          <div class="type-card-content">
            <div class="type-icon">
		    <component :is="getIconComponent(type.icon)" :size="20" />
            </div>
            <div class="type-info">
              <h4>{{ type.label }}</h4>
              <p class="type-key">{{ type.inquiry_type }}</p>
              <p v-if="type.description" class="type-description">
                {{ type.description }}
              </p>
            </div>
          </div>
          <div class="type-actions">
            <NcButton 
              type="primary"
              class="configure-btn"
              @click.stop="openTypeSettings(type)"
            >
              {{ t('agora', 'Configure') }}
            </NcButton>
            <div class="secondary-actions">
              <NcButton 
                class="edit-btn"
                @click.stop="editingType = { 
                  ...type, 
                  fields: JSON.stringify(type.fields || []), 
                  allowed_response: JSON.stringify(type.allowed_response || []), 
                  allowed_transformation: JSON.stringify(type.allowed_transformation || []),
                  allowed_option_type: JSON.stringify(type.allowed_option_type || []) 
                }"
              >
                {{ t('agora', 'Edit') }}
              </NcButton>
              <NcButton class="delete-btn" @click.stop="deleteType(type.id)">
                {{ t('agora', 'Delete') }}
              </NcButton>
            </div>
          </div>
        </div>
      </div>

      <div v-if="familyTypes.length === 0" class="empty-state">
        <p>{{ t('agora', 'No types configured for this family yet') }}</p>
      </div>
    </div>

    <!-- Add New Type Form -->
    <div class="add-type-form">
      <h3>{{ t('agora', 'Add New Type to {family}', { family: selectedFamily?.label }) }}</h3>
      <div class="form-grid">
        <div class="form-row">
          <NcInputField
            v-model="newType.inquiry_type"
            :label="t('agora', 'Type key')"
            :placeholder="t('agora', 'E.g., petition, survey, poll')"
            required
            class="form-field"
          />
          
          <NcInputField
            v-model="newType.label"
            :label="t('agora', 'Display label')"
            :placeholder="t('agora', 'E.g., public petition, survey')"
            required
            class="form-field"
          />
          
          <NcSelect
            v-model="newType.icon"
            :options="availableIcons"
	    :clearable="false"
            :placeholder="t('agora', 'Select an icon')"
	    label="label"
            class="form-field"
          />
        </div>
        
        <NcInputField
          v-model="newType.description"
          :label="t('agora', 'Description')"
          type="textarea"
          class="full-width"
        />
        
        <div class="form-row">
          <NcInputField
            v-model="newType.fields"
            :label="t('agora', 'Fields configuration (json)')"
            type="textarea"
            :placeholder='`e.g., ["title", "description", "deadline"]`'
            class="form-field"
          />
          
          <NcInputField
            v-model="newType.allowed_response"
            :label="t('agora', 'Allowed responses (json)')"
            type="textarea"
            :placeholder='`e.g., ["vote_yes_no", "comment"]`'
            class="form-field"
          />
          
          <NcInputField
            v-model="newType.allowed_transformation"
            :label="t('agora', 'Allowed transformations (json)')"
            type="textarea"
            :placeholder='`e.g., ["official_proposal"]`'
            class="form-field"
          />
          <NcInputField
            v-model="newType.allowed_option_type"
            :label="t('agora', 'Allowed option types (json)')"
            type="textarea"
            :placeholder='`e.g., ["official_proposal"]`'
            class="form-field"
          />
        </div>

        <div class="form-actions">
          <NcButton 
            type="primary" 
            :disabled="!newType.inquiry_type || !newType.label"
            @click="addType"
          >
            {{ t('agora', 'Add type') }}
          </NcButton>
        </div>
      </div>
    </div>

    <!-- Edit Type Modal -->
    <div v-if="editingType" class="modal-overlay">
      <div class="modal-content large-modal">
        <h3>{{ t('agora', 'Edit inquiry type') }}</h3>
        <div class="form-grid">
          <div class="form-row">
            <NcInputField
              v-model="editingType.inquiry_type"
              :label="t('agora', 'Type key')"
              required
              class="form-field"
            />
            <NcInputField
              v-model="editingType.label"
              :label="t('agora', 'Display label')"
              required
              class="form-field"
            />
            <NcSelect
              v-model="editingType.icon"
              :options="availableIcons"
	      :clearable="false"
              :placeholder="t('agora', 'Select an icon')"
              class="form-field"
            />
          </div>
          <NcInputField
            v-model="editingType.description"
            :label="t('agora', 'Description')"
            type="textarea"
            class="full-width"
          />
          <div class="form-row">
            <NcInputField
              v-model="editingType.fields"
              :label="t('agora', 'Fields configuration (json)')"
              type="textarea"
              class="form-field"
            />
            <NcInputField
              v-model="editingType.allowed_response"
              :label="t('agora', 'Allowed responses (json)')"
              type="textarea"
              class="form-field"
            />
            <NcInputField
              v-model="editingType.allowed_transformation"
              :label="t('agora', 'Allowed transformations (json)')"
              type="textarea"
              class="form-field"
            />
            <NcInputField
              v-model="editingType.allowed_option_type"
              :label="t('agora', 'Allowed option types (json)')"
              type="textarea"
              class="form-field"
            />
          </div>
          <div class="modal-actions">
            <NcButton @click="editingType = null">
              {{ t('agora', 'Cancel') }}
            </NcButton>
            <NcButton 
              type="primary" 
              @click="updateType(editingType)"
            >
              {{ t('agora', 'Save') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.types-manager {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.header h2 {
  margin: 0;
  color: var(--color-text-light);
}

.types-list {
  margin-bottom: 30px;
}

.list-description {
  color: var(--color-text-lighter);
  margin-bottom: 20px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.type-card {
  background: var(--color-background-dark);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.type-card:hover {
  background: var(--color-background-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.type-card-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  flex: 1;
  margin-bottom: 15px;
}

.type-icon {
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

.type-info {
  flex: 1;
}

.type-info h4 {
  margin: 0 0 8px 0;
  color: var(--color-text-light);
  font-size: 1.1em;
}

.type-key {
  margin: 0 0 10px 0;
  font-family: monospace;
  color: var(--color-text-lighter);
  font-size: 0.9em;
  background: var(--color-background-darker);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.type-description {
  margin: 0 0 10px 0;
  color: var(--color-text-lighter);
  font-size: 0.95em;
  line-height: 1.4;
}

.type-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.type-badge.option {
  background: var(--color-warning);
  color: white;
}

.type-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.configure-btn {
  width: 100%;
}

.secondary-actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  flex: 1;
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
  color: var(--color-text-lighter);
  background: var(--color-background-dark);
  border-radius: 12px;
  grid-column: 1 / -1;
}

.empty-state p {
  margin: 0;
  font-size: 1.1em;
}

.add-type-form {
  padding: 25px;
  background: var(--color-background-dark);
  border-radius: 12px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.form-field {
  margin: 0;
}

.full-width {
  grid-column: 1 / -1;
}

.checkbox-field {
  grid-column: 1 / -1;
  padding: 15px;
  background: var(--color-background-darker);
  border-radius: 8px;
}

.field-description {
  margin: 8px 0 0 0;
  font-size: 0.9em;
  color: var(--color-text-lighter);
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
  width: 900px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content.large-modal {
  width: 1000px;
  max-width: 95vw;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
</style>
