<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useInquiryGroupStore } from '../../stores/inquiryGroup.ts'
import { useSessionStore } from '../../stores/session.ts'
import { getAvailableGroupFields } from '../../helpers/modules/InquiryHelper.ts'
import { StatusIcons } from '../../utils/icons.ts'
import { BaseEntry } from '../../Types/index.ts'
import { t } from '@nextcloud/l10n'

// Components
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcDateTimePickerNative from '@nextcloud/vue/components/NcDateTimePickerNative'
import UserSearch from '../User/UserSearch.vue'

const props = defineProps<{
  isReadonly?: boolean
}>()

// Stores
const inquiryGroupStore = useInquiryGroupStore()
const sessionStore = useSessionStore()

// Reactive state
const isLoading = ref(true)
const error = ref<string | null>(null)
const isSaving = ref(false)
const saveTimeouts = ref<Record<string, NodeJS.Timeout>>({})
const selectedUsers = ref<Record<string, User | undefined>>({})
const localCheckboxes = ref<Record<string, boolean>>({})

// Local field values for NcInputField to avoid undefined
const localFieldValues = ref<Record<string, string>>({})

type MiscValue = string | boolean | number | null | undefined | Date | string[] | object

interface Field {
  key: string
  type: string
  label: string
  required?: boolean
  default?: MiscValue
  description?: string
  allowed_values?: any
}

// ============================================================
// SAFE VALUE HELPERS - FIXED
// ============================================================
const getSafeStringValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return ''
    }
  }
  return String(value)
}

const getSafeNumberValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  const num = Number(value)
  if (isNaN(num)) return ''
  return String(num)
}

// ============================================================
// NORMALIZE ALLOWED VALUES
// ============================================================
const normalizeAllowedValues = (allowedValues: any): Array<{ value: string; label: string }> => {
  if (!allowedValues) return []
  
  if (Array.isArray(allowedValues)) {
    if (allowedValues.length > 0 && typeof allowedValues[0] === 'string') {
      return allowedValues.map(val => ({
        value: val,
        label: val.charAt(0).toUpperCase() + val.slice(1)
      }))
    }
    if (allowedValues.length > 0 && typeof allowedValues[0] === 'object' && 'value' in allowedValues[0]) {
      return allowedValues.map(item => ({
        value: item.value,
        label: item.label || item.value
      }))
    }
    return allowedValues
  }
  
  if (typeof allowedValues === 'object' && allowedValues !== null) {
    return Object.entries(allowedValues).map(([value, label]) => ({
      value,
      label: String(label)
    }))
  }
  
  return []
}

// ============================================================
// BUILD HIERARCHY
// ============================================================
function buildHierarchy(list: BaseEntry[], parentId = 0, depth = 0): BaseEntry[] {
  if (!Array.isArray(list)) return []
  
  let result: BaseEntry[] = []
  const items = list.filter((item) => item?.parentId === parentId)
  
  for (const item of items) {
    result.push({
      ...item,
      depth,
    })
    const children = buildHierarchy(list, item.id, depth + 1)
    result = result.concat(children)
  }
  
  return result
}

// ============================================================
// HIERARCHICAL OPTIONS
// ============================================================
const hierarchicalLocation = computed(() => {
  if (!Array.isArray(sessionStore.appSettings?.locationTab)) {
    return []
  }
  
  try {
    return buildHierarchy(sessionStore.appSettings.locationTab).map((item) => ({
      value: item.id,
      label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
      original: item,
    }))
  } catch (e) {
    console.error('Error building location hierarchy:', e)
    return []
  }
})

const hierarchicalCategory = computed(() => {
  if (!Array.isArray(sessionStore.appSettings?.categoryTab)) {
    return []
  }
  
  try {
    return buildHierarchy(sessionStore.appSettings.categoryTab).map((item) => ({
      value: item.id,
      label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
      original: item,
    }))
  } catch (e) {
    console.error('Error building category hierarchy:', e)
    return []
  }
})

function getHierarchyPath(items: BaseEntry[], targetId: number | string): string {
  if (!items || !Array.isArray(items)) return ''
  
  const itemMap: Record<string, BaseEntry> = {}
  items.forEach((item) => {
    itemMap[String(item.id)] = item
  })

  const targetStr = String(targetId)
  if (!itemMap[targetStr]) {
    return 'ID not found'
  }

  function buildPath(item: BaseEntry): string {
    if (item.parentId === 0) {
      return item.name
    }
    const parent = itemMap[String(item.parentId)]
    if (parent) {
      return `${buildPath(parent)} -> ${item.name}`
    }
    return item.name
  }

  return buildPath(itemMap[targetStr])
}

// ============================================================
// DYNAMIC FIELDS
// ============================================================
const dynamicFields = computed(() => {
  try {
    if (!inquiryGroupStore.type) {
      return []
    }

    const fields = getAvailableGroupFields(
      inquiryGroupStore.type,
      sessionStore.appSettings?.inquiryGroupTypeTab || [],
      inquiryGroupStore.type
    )
    return Array.isArray(fields) ? fields : []
  } catch (e) {
    console.error('Error getting fields:', e)
    return []
  }
})

// ============================================================
// GET MISC VALUE
// ============================================================
const getMiscValue = (key: string): any => {
  try {
    if (!inquiryGroupStore.miscFields || typeof inquiryGroupStore.miscFields !== 'object' || !key) {
      return null
    }
    
    const value = inquiryGroupStore.miscFields[key]
    if (!value) return null
    
    if (typeof value === 'string') {
      if (!isNaN(Number(value)) && value.trim() !== '') {
        return Number(value)
      }
      if (value.startsWith('{') || value.startsWith('[')) {
        try { return JSON.parse(value) } catch { return value }
      }
      return value
    }
    
    return value
  } catch (e) {
    console.warn(`Error getting misc value for ${key}:`, e)
    return null
  }
}

// ============================================================
// GET DISPLAY VALUE
// ============================================================
const getDisplayValue = (value: MiscValue, field: Field) => {
  if (value === null || value === undefined || value === '') {
    return t('Not set')
  }

  try {
    const fieldType = field.type || 'string'

    switch (fieldType) {
      case 'boolean':
        return value ? t('Yes') : t('No')
      case 'datetime':
        return new Date(value).toLocaleString()
      case 'json': {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value
        return typeof parsed === 'object' ? JSON.stringify(parsed, null, 2) : String(value)
      }
      case 'integer':
        return String(value)
      case 'enum': {
        const normalized = normalizeAllowedValues(field.allowed_values)
        const found = normalized.find(opt => opt.value === String(value))
        return found?.label || String(value)
      }
      case 'users':
      case 'groups':
        return Array.isArray(value) ? value.join(', ') : String(value)
      case 'location':
        return getHierarchyPath(sessionStore.appSettings?.locationTab || [], value) || String(value)
      case 'category':
        return getHierarchyPath(sessionStore.appSettings?.categoryTab || [], value) || String(value)
      default:
        return String(value)
    }
  } catch {
    return String(value)
  }
}

// ============================================================
// FIELD FILTERING
// ============================================================
const shouldDisplayField = (field: Field, value: MiscValue) => {
  if (field.default !== undefined && field.default !== null) {
    return true
  }
  if (value === null || value === undefined || value === '') return false
  if (Array.isArray(value) && value.length === 0) return false
  if (typeof value === 'object' && Object.keys(value).length === 0) return false
  return true
}

const displayFields = computed(() => dynamicFields.value
  .map(field => {
    const value = getMiscValue(field.key)
    return {
      ...field,
      value,
      displayValue: getDisplayValue(value, field),
      hasValue: field.type === 'boolean' ? true : shouldDisplayField(field, value)
    }
  })
  .filter(field => field.hasValue)
)

// ============================================================
// ENUM HELPERS
// ============================================================
const getEnumModelValue = (field: Field) => {
  const value = getMiscValue(field.key) || field.default
  const options = normalizeAllowedValues(field.allowed_values)
  
  if (typeof value === 'object' && value !== null && 'value' in value) {
    return options.find(opt => opt.value === value.value) || value
  }
  
  const found = options.find(opt => opt.value === String(value))
  return found || value
}

const getEnumLabel = (option: any): string => {
  if (!option) return ''
  if (typeof option === 'string') {
    return option.charAt(0).toUpperCase() + option.slice(1)
  }
  return option.label || String(option.value || option)
}

// ============================================================
// CHECKBOX HELPERS
// ============================================================
const getCheckboxValue = (key: string) => localCheckboxes.value[key] || false

// ============================================================
// UPDATE FIELD VALUE
// ============================================================
const updateFieldValue = (fieldKey: string, value: any, fieldType: string) => {
  if (saveTimeouts.value[fieldKey]) {
    clearTimeout(saveTimeouts.value[fieldKey])
  }

  let processedValue = value
  
  if (typeof value === 'object' && value !== null && 'value' in value) {
    processedValue = value.value
  }
  
  if ((fieldType === 'users' || fieldType === 'groups') && value && typeof value === 'object') {
    processedValue = value.id || value.displayName || value
  }

  if (fieldType === 'boolean' || fieldType === 'enum' || fieldType === 'datetime' || 
      fieldType === 'users' || fieldType === 'groups' || fieldType === 'location' || 
      fieldType === 'category') {
    saveFieldToDatabase(fieldKey, processedValue)
  } else {
    saveTimeouts.value[fieldKey] = setTimeout(() => {
      saveFieldToDatabase(fieldKey, processedValue)
    }, 1000)
  }
}

// ============================================================
// SAVE TO DATABASE
// ============================================================
const saveFieldToDatabase = async (fieldKey: string, value: any) => {
  try {
    isSaving.value = true

    let stringValue: string
    if (value === null || value === undefined) {
      stringValue = ''
    } else if (typeof value === 'object') {
      stringValue = JSON.stringify(value)
    } else if (typeof value === 'boolean') {
      stringValue = value ? 'true' : 'false'
    } else {
      stringValue = String(value)
    }

    await inquiryGroupStore.updateMiscField(fieldKey, stringValue)
    
    // Update local field value cache
    localFieldValues.value[fieldKey] = stringValue
  } catch (e) {
    console.error(`Error saving field ${fieldKey}:`, e)
  } finally {
    isSaving.value = false
  }
}

// ============================================================
// HANDLE USER SELECTED
// ============================================================
const handleUserSelected = (fieldKey: string, user: User) => {
  selectedUsers.value[fieldKey] = user
  updateFieldValue(fieldKey, user?.id || '', 'users')
}

// ============================================================
// GET FORMATTED DATE
// ============================================================
const getFormattedDate = (key: string) => {
  const value = getMiscValue(key)
  if (!value) return null

  try {
    const strValue = String(value)
    const year = parseInt(strValue.substring(0, 4))
    const month = parseInt(strValue.substring(5, 7)) - 1
    const day = parseInt(strValue.substring(8, 10))
    const hours = parseInt(strValue.substring(11, 13))
    const minutes = parseInt(strValue.substring(14, 16))
    
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return new Date(year, month, day, hours || 0, minutes || 0)
    }
    return null
  } catch (e) {
    console.error("Manual date construction failed:", e)
    return null
  }
}

// ============================================================
// INITIALIZE
// ============================================================
const initializeMiscFields = () => {
  dynamicFields.value.forEach(field => {
    if (inquiryGroupStore.miscFields[field.key] === undefined) {
      let defaultValue = field.default
      if (defaultValue === null || defaultValue === undefined) {
        defaultValue = ''
      } else if (typeof defaultValue === 'boolean') {
        defaultValue = defaultValue ? 'true' : 'false'
      } else if (typeof defaultValue === 'object') {
        defaultValue = JSON.stringify(defaultValue)
      } else {
        defaultValue = String(defaultValue)
      }
      inquiryGroupStore.miscFields[field.key] = defaultValue
    }
    // Initialize local field values for NcInputField
    const value = inquiryGroupStore.miscFields[field.key]
    localFieldValues.value[field.key] = value !== undefined && value !== null ? String(value) : ''
  })
}

const initializeLocalCheckboxes = () => {
  dynamicFields.value.forEach(field => {
    if (field.type === 'boolean') {
      const raw = getMiscValue(field.key)
      localCheckboxes.value[field.key] = raw === true || raw === 'true'
    }
  })
}

const loadMiscData = () => {
  try {
    isLoading.value = true
    error.value = null
    initializeMiscFields()
    initializeLocalCheckboxes()

    dynamicFields.value.forEach(field => {
      if (field.type === 'users' || field.type === 'groups') {
        const existingValue = getMiscValue(field.key)
        if (existingValue) {
          selectedUsers.value[field.key] = {
            id: existingValue,
            displayName: existingValue
          } as User
        }
      }
    })
  } catch (e) {
    console.error('Error loading misc data:', e)
    error.value = t('Error loading settings data')
  } finally {
    isLoading.value = false
  }
}

const showLocationAsLabel = ref(false)
const showCategoryAsLabel = ref(false)

onMounted(() => {
  loadMiscData()
})
</script>

<template>
  <div class="sidebar-tab-misc">
    <div class="tab-content">
      <!-- Loading state -->
      <div v-if="isLoading" class="loading-state">
        <div class="icon-loading"></div>
        <p>{{ t('Loading settings...') }}</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <component :is="StatusIcons.AlertCircleOutline" class="error-icon" />
        <p>{{ error }}</p>
      </div>

      <!-- No data state -->
      <div v-else-if="!displayFields.length && isReadonly" class="no-data-state">
        <component :is="StatusIcons.Info" class="no-data-icon" />
        <p>{{ t('No additional settings configured.') }}</p>
      </div>

      <!-- Readonly mode -->
      <div v-else-if="isReadonly" class="misc-fields-readonly">
        <div class="misc-fields-list">
          <div
            v-for="field in displayFields"
            :key="field.key"
            class="misc-field-item"
          >
            <div class="field-row">
              <label class="field-label">{{ field.label }}:</label>
              <div class="field-value">
                <pre v-if="field.type === 'json'" class="json-value">{{ field.displayValue }}</pre>
                <span v-else>{{ field.displayValue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Editable fields -->
      <div v-else class="misc-fields-edit">
        <div v-if="isSaving" class="saving-indicator">
          <div class="icon-loading-small"></div>
          <span>{{ t('agora', 'Saving …') }}</span>
        </div>

        <div class="edit-fields">
          <div
            v-for="field in dynamicFields.slice()"
            :key="field.key"
            class="edit-field-item"
          >
            <!-- Checkbox field -->
            <div v-if="field.type === 'boolean'" class="checkbox-field">
              <div class="checkbox-wrapper">
                <input
                  :id="`checkbox-${field.key}`"
                  type="checkbox"
                  :checked="getCheckboxValue(field.key)"
                  :name="field.key"
                  :disabled="isSaving"
                  @change="(e) => updateFieldValue(field.key, (e.target as HTMLInputElement).checked, 'boolean')"
                />
                <label :for="`checkbox-${field.key}`" class="checkbox-label">
                  {{ field.label }}
                  <span v-if="!field.required" class="optional-label">({{ t('agora','optional') }})</span>
                </label>
              </div>
            </div>

            <!-- Other fields -->
            <div v-else class="standard-field">
              <label class="edit-field-label">
                {{ field.label }}
                <span v-if="field.required" class="required-asterisk">*</span>
                <span v-else class="optional-label">({{ t('agora','optional') }})</span>
              </label>

              <div class="edit-field-input">
                <!-- ============================================================
                     LOCATION FIELD - FIXED
                     ============================================================ -->
                <div v-if="field.type === 'location'" class="location-field">
                  <div v-if="showLocationAsLabel" class="metadata-value">
                    {{ getHierarchyPath(sessionStore.appSettings?.locationTab, getMiscValue(field.key)) || t('agora', 'Inherited from parent') }}
                  </div>
                  <NcSelect
                    v-else
                    :model-value="getMiscValue(field.key)"
                    :options="hierarchicalLocation"
                    :clearable="!field.required"
                    :label-outside="true"
                    :option-label="(option: any) => option?.label || option"
                    :option-value="(option: any) => option?.value || option"
                    :disabled="isSaving"
                    class="select-field location-select"
                    :placeholder="t('Select location')"
                    :required="field.required"
                    @update:model-value="(val) => updateFieldValue(field.key, val, 'location')"
                  />
                </div>

                <!-- ============================================================
                     CATEGORY FIELD - FIXED
                     ============================================================ -->
                <div v-else-if="field.type === 'category'" class="category-field">
                  <div v-if="showCategoryAsLabel" class="metadata-value">
                    {{ getHierarchyPath(sessionStore.appSettings?.categoryTab, getMiscValue(field.key)) || t('agora', 'Inherited from parent') }}
                  </div>
                  <NcSelect
                    v-else
                    :model-value="getMiscValue(field.key)"
                    :options="hierarchicalCategory"
                    :clearable="!field.required"
                    :label-outside="true"
                    :option-label="(option: any) => option?.label || option"
                    :option-value="(option: any) => option?.value || option"
                    :disabled="isSaving"
                    class="select-field category-select"
                    :placeholder="t('Select category')"
                    :required="field.required"
                    @update:model-value="(val) => updateFieldValue(field.key, val, 'category')"
                  />
                </div>

                <!-- ============================================================
                     ENUM FIELD - FIXED
                     ============================================================ -->
                <NcSelect
                  v-else-if="field.type === 'enum'"
                  :model-value="getEnumModelValue(field)"
                  :options="normalizeAllowedValues(field.allowed_values)"
                  :option-label="(option: any) => option?.label || option"
                  :option-value="(option: any) => option?.value || option"
                  :clearable="!field.required"
                  :label-outside="true"
                  :disabled="isSaving"
                  :placeholder="t('Select an option')"
                  @update:model-value="(val: any) => updateFieldValue(field.key, val, 'enum')"
                />

                <!-- ============================================================
                     INTEGER FIELD
                     ============================================================ -->
                <NcInputField
                  v-else-if="field.type === 'integer'"
                  :model-value="getSafeNumberValue(getMiscValue(field.key))"
                  type="number"
                  :label="field.label"
                  :disabled="isSaving"
                  @update:model-value="(val: string) => updateFieldValue(field.key, val ? parseInt(val) : null, 'integer')"
                />

                <!-- ============================================================
                     DATETIME FIELD
                     ============================================================ -->
                <NcDateTimePickerNative
                  v-else-if="field.type === 'datetime'"
                  :model-value="getFormattedDate(field.key)"
                  type="date"
                  :label="field.label"
                  :disabled="isSaving"
                  @update:model-value="(val: string) => updateFieldValue(field.key, val, 'datetime')"
                />

                <!-- ============================================================
                     USERS/GROUPS FIELD
                     ============================================================ -->
                <UserSearch
                  v-else-if="field.type === 'users' || field.type === 'groups'"
                  :model-value="selectedUsers[field.key]"
                  :search-types="field.type === 'users' ? [99] : [1]"
                  :placeholder="t('Type to search for users')"
                  :aria-label="field.label"
                  :close-on-select="true"
                  @update:model-value="(user) => handleUserSelected(field.key, user)"
                />

                <!-- ============================================================
                     JSON FIELD
                     ============================================================ -->
                <div v-else-if="field.type === 'json'" class="json-field">
                  <NcInputField
                    :model-value="getSafeStringValue(getMiscValue(field.key))"
                    type="textarea"
                    :rows="5"
                    :label="field.label"
                    :disabled="isSaving"
                    @update:model-value="(val: string) => {
                      try {
                        const parsed = val ? JSON.parse(val) : null
                        updateFieldValue(field.key, parsed, 'json')
                      } catch {
                        updateFieldValue(field.key, val, 'json')
                      }
                    }"
                  />
                </div>

                <!-- ============================================================
                     DEFAULT STRING FIELD
                     ============================================================ -->
                <NcInputField
                  v-else
                  :model-value="getSafeStringValue(getMiscValue(field.key))"
                  type="text"
                  :label="field.label"
                  :disabled="isSaving"
                  @update:model-value="(val: string) => updateFieldValue(field.key, val, 'string')"
                />
              </div>
            </div>

            <div v-if="field.description" class="field-description">
              {{ field.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.optional-label {
    color: var(--color-text-maxcontrast);
    font-size: 0.75rem;
    font-weight: normal;
    font-style: italic;
    margin-left: 4px;
}

.checkbox-main-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    cursor: pointer;
}

.checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

.standard-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.sidebar-tab-misc {
    padding: 12px;
    height: 100%;
}

.tab-content {
    height: 100%;
    overflow-y: auto;
}

.field-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 0;
}

.field-label {
    font-weight: 600;
    min-width: 120px;
    color: var(--color-text-lighter);
}

.field-value {
    flex: 1;
    word-break: break-word;
}

.loading-state,
.error-state,
.no-data-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    color: var(--color-text-maxcontrast);
    height: 100%;
}

.loading-state .icon-loading,
.error-state .icon-error {
    width: 24px;
    height: 24px;
    margin-bottom: 1rem;
}

.loading-state .icon-loading {
    background-image: var(--icon-loading);
    animation: rotate 1s linear infinite;
}

.error-icon,
.no-data-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    opacity: 0.5;
}

/* Readonly styles */
.misc-fields-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.misc-field-item {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 16px;
}

.misc-field-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.field-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.field-label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--color-text-lighter);
}

.field-value {
    font-size: 0.875rem;
    word-break: break-word;
    line-height: 1.4;
}

.json-value {
    background: var(--color-background-dark);
    padding: 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 150px;
    overflow-y: auto;
    margin: 0;
    font-family: monospace;
}

/* Saving indicator */
.saving-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--color-background-dark);
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-maxcontrast);
}

.icon-loading-small {
    width: 16px;
    height: 16px;
    background-image: var(--icon-loading);
    animation: rotate 1s linear infinite;
}

/* Edit mode styles */
.edit-fields {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.edit-field-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 1rem;
    background: var(--color-background-dark);
    border-radius: 8px;
    border: 1px solid var(--color-border);
}

.edit-field-label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--color-text-lighter);
}

.required-asterisk {
    color: var(--color-error);
}

.optional-label {
    color: var(--color-text-maxcontrast);
    font-size: 0.75rem;
    font-weight: normal;
}

.field-description {
    font-size: 0.75rem;
    color: var(--color-text-maxcontrast);
    font-style: italic;
}

.json-field {
    width: 100%;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
