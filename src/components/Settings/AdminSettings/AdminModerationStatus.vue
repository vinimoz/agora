<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { ref, computed, onMounted, watch } from 'vue'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'
import { InquiryTypeValues } from '../../../helpers/modules/InquiryHelper.ts'
import { StatusIcons } from '../../../utils/icons.ts'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'

interface StatusForm {
  id?: number
  statusKey: string
  label: string
  description: string
  isFinal: boolean
  icon: string
}

interface InquiryTypeOption {
  id: string
  label: string
}

const appSettingsStore = useAppSettingsStore()
const activeInquiryType = ref<InquiryTypeOption | null>(null)
const editingStatus = ref<StatusForm | null>(null)
const newStatus = ref<StatusForm>({
  statusKey: '',
  label: '',
  description: '',
  isFinal: false,
  icon: 'ClockOutline',
})

const activeInquiryTypeId = computed(
  () => activeInquiryType.value?.id || InquiryTypeValues.PETITION
)

const currentInquiryTypeLabel = computed(
  () => activeInquiryType.value?.label || InquiryTypeValues.PETITION.replace(/_/g, ' ')
)

onMounted(() => {
  if (!activeInquiryType.value) {
    activeInquiryType.value =
      inquiryTypes.value.find((t) => t.id === InquiryTypeValues.PETITION) || inquiryTypes.value[0]
  }
})

const availableIcons = computed(() =>
  Object.keys(StatusIcons)
    .filter((key) => key !== 'default')
    .map((iconId) => ({
      id: iconId,
      label: t('agora', iconId.replace(/([A-Z])/g, ' $1').trim()),
    }))
)

// Get the icon component for a given icon name
const getIconComponent = (iconName: string) => StatusIcons[iconName] || StatusIcons.ClockOutline

// Get available inquiry types
const inquiryTypes = computed<InquiryTypeOption[]>(() =>
  Object.values(InquiryTypeValues).map((type) => ({
    id: type,
    label: t(
      'agora',
      type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    ),
  }))
)

// Get statuses for the active inquiry type
const statuses = computed(() =>
  appSettingsStore.getStatusesForInquiryType(activeInquiryTypeId.value)
)

// Watch for inquiry type changes and reset editing
watch(activeInquiryTypeId, () => {
  editingStatus.value = null
})

// Add a new status
const addStatus = () => {
  if (!newStatus.value.statusKey || !newStatus.value.label) {
    return
  }

  appSettingsStore.addStatusForInquiryType(activeInquiryTypeId.value, {
    ...newStatus.value,
    icon: String(newStatus.value.icon),
  })

  // Reset form
  newStatus.value = {
    statusKey: '',
    label: '',
    description: '',
    isFinal: false,
    icon: 'ClockOutline',
  }
}

// Edit a status
const editStatus = (status) => {
  editingStatus.value = {
    id: status.id,
    statusKey: status.statusKey,
    label: status.label,
    description: status.description || '',
    isFinal: status.isFinal,
    icon: status.icon || 'ClockOutline',
  }
}

const saveUpdateStatus = () => {
  if (editingStatus.value) {
    appSettingsStore.updateStatusForInquiryType(activeInquiryTypeId.value, editingStatus.value.id, {
      ...editingStatus.value,
      icon: editingStatus.value.icon?.id || String(editingStatus.value.icon),
    })
    editingStatus.value = null
  }
}

// Delete a status
const deleteStatus = (statusId) => {
  if (confirm(t('agora', 'Are you sure you want to delete this status?'))) {
    appSettingsStore.deleteStatusForInquiryType(activeInquiryTypeId.value, statusId)
  }
}

// Move status up
const moveStatusUp = (statusId) => {
  appSettingsStore.moveStatusUp(activeInquiryTypeId.value, statusId)
}

// Move status down
const moveStatusDown = (statusId) => {
  appSettingsStore.moveStatusDown(activeInquiryTypeId.value, statusId)
}

// Cancel editing
const cancelEdit = () => {
  editingStatus.value = null
}
</script>

<template>
  <div class="moderation-status-settings">
    <!-- Inquiry type selector -->
    <div class="inquiry-type-selector">
      <h3>{{ t('agora', 'Select Inquiry Type') }}</h3>
      <NcSelect
        v-model="activeInquiryType"
        :options="inquiryTypes"
        label="label"
        :input-label="t('agora', 'Inquiry Type')"
      />
    </div>

    <!-- Status list for current inquiry type -->
    <div class="status-list">
      <h3>
        {{
          t('agora', 'Statuses for {type}', {
            type: currentInquiryTypeLabel,
          })
        }}
      </h3>

      <div v-if="statuses.length === 0" class="empty-state">
        <p>
          {{ t('agora', 'No statuses configured for this inquiry type.') }}
        </p>
      </div>

      <div v-else class="status-items">
        <div v-for="(status, index) in statuses" :key="status.statusKey" class="status-item">
          <div class="status-content">
            <div class="status-icon" :title="status.icon">
              <component :is="getIconComponent(status.icon)" :size="20" />
            </div>
            <div class="status-info">
              <h4>{{ status.label }}</h4>
              <p class="status-key">
                {{ status.statusKey }}
              </p>
              <p v-if="status.description" class="status-description">
                {{ status.description }}
              </p>
              <div class="status-properties">
                <span :class="['status-badge', status.isFinal ? 'final' : 'non-final']">
                  {{ status.isFinal ? t('agora', 'Final') : t('agora', 'Non-Final') }}
                </span>
              </div>
            </div>
          </div>

          <div class="status-actions">
            <NcButton :disabled="index === 0" @click="moveStatusUp(status.statusKey)">
              {{ t('agora', 'Up') }}
            </NcButton>
            <NcButton
              :disabled="index === statuses.length - 1"
              @click="moveStatusDown(status.statusKey)"
            >
              {{ t('agora', 'Down') }}
            </NcButton>
            <NcButton @click="editStatus(status)">
              {{ t('agora', 'Edit') }}
            </NcButton>
            <NcButton @click="deleteStatus(status.id)">
              {{ t('agora', 'Delete') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Add new status form -->
    <div class="add-status-form">
      <h3>{{ t('agora', 'Add New Status') }}</h3>

      <div class="form-grid">
        <NcInputField
          v-model="newStatus.statusKey"
          :label="t('agora', 'Status Key')"
          :placeholder="t('agora', 'Enter unique status key')"
          required
        />

        <NcInputField
          v-model="newStatus.label"
          :label="t('agora', 'Label')"
          :placeholder="t('agora', 'Enter display label')"
          required
        />

        <NcInputField
          v-model="newStatus.description"
          :label="t('agora', 'Description')"
          :placeholder="t('agora', 'Enter description (optional)')"
          type="textarea"
        />

        <NcSelect
          v-model="newStatus.icon"
          :options="availableIcons"
          label="label"
          :input-label="t('agora', 'Select Icon')"
        />

        <div class="checkbox-field">
          <NcCheckboxRadioSwitch v-model="newStatus.isFinal" type="switch">
            {{ t('agora', 'Final Status') }}
          </NcCheckboxRadioSwitch>
          <p class="field-description">
            {{ t('agora', 'Final statuses cannot be changed once set') }}
          </p>
        </div>

        <NcButton
          type="primary"
          :disabled="!newStatus.statusKey || !newStatus.label"
          @click="addStatus"
        >
          {{ t('agora', 'Add Status') }}
        </NcButton>
      </div>
    </div>

    <!-- Edit status modal -->
    <div v-if="editingStatus" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ t('agora', 'Edit Status') }}</h3>

        <div class="form-grid">
          <NcInputField
            v-model="editingStatus.statusKey"
            :label="t('agora', 'Status Key')"
            :placeholder="t('agora', 'Enter unique status key')"
            required
          />

          <NcInputField
            v-model="editingStatus.label"
            :label="t('agora', 'Label')"
            :placeholder="t('agora', 'Enter display label')"
            required
          />

          <NcInputField
            v-model="editingStatus.description"
            :label="t('agora', 'Description')"
            :placeholder="t('agora', 'Enter description (optional)')"
            type="textarea"
          />

          <NcSelect
            v-model="editingStatus.icon"
            :options="availableIcons"
            label="label"
            :input-label="t('agora', 'Select Icon')"
          />

          <div class="checkbox-field">
            <NcCheckboxRadioSwitch v-model="editingStatus.isFinal" type="switch">
              {{ t('agora', 'Final Status') }}
            </NcCheckboxRadioSwitch>
            <p class="field-description">
              {{ t('agora', 'Final statuses cannot be changed once set') }}
            </p>
          </div>
        </div>

        <div class="modal-actions">
          <NcButton @click="cancelEdit">
            {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton
            type="primary"
            :disabled="!editingStatus.statusKey || !editingStatus.label"
            @click="saveUpdateStatus"
          >
            {{ t('agora', 'Save Changes') }}
          </NcButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.moderation-status-settings {
  padding: 20px;
  max-width: 1000px;
}

.settings-description {
  margin-bottom: 25px;
  color: var(--color-text-lighter);
}

.inquiry-type-selector {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--color-background-dark);
  border-radius: 8px;
}

.status-list {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--color-background-dark);
  border-radius: 8px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--color-text-lighter);
}

.status-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--color-background-darker);
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.status-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  flex: 1;
}

.status-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: white;
  border-radius: 8px;
  flex-shrink: 0;
}

.status-icon :deep(svg) {
  fill: white;
}

.status-info h4 {
  margin: 0 0 5px 0;
  font-weight: 600;
}

.status-key {
  margin: 0 0 8px 0;
  font-size: 0.9em;
  color: var(--color-text-lighter);
  font-family: monospace;
}

.status-description {
  margin: 0 0 10px 0;
  color: var(--color-text-lighter);
  font-size: 0.95em;
}

.status-properties {
  display: flex;
  gap: 10px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.status-badge.final {
  background-color: var(--color-success);
  color: white;
}

.status-badge.non-final {
  background-color: var(--color-warning);
  color: white;
}

.status-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.add-status-form {
  padding: 20px;
  background-color: var(--color-background-dark);
  border-radius: 8px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.checkbox-field {
  grid-column: span 2;
}

.field-description {
  margin: 5px 0 0 0;
  font-size: 0.9em;
  color: var(--color-text-lighter);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--color-main-background);
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .status-item {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .status-actions {
    justify-content: center;
  }
}
</style>
