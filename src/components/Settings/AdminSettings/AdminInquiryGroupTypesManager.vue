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
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'
import { InquiryOptionIcons } from '../../../utils/icons.ts'


const props = defineProps({
  selectedFamily: { type: Object, default: null },
})

const familyKey = computed(() => props.selectedFamily?.family_type ?? '')
const familyLabel = computed(() => props.selectedFamily?.label ?? familyKey.value)

const emit = defineEmits(['groupTypeSelected'])
const appSettingsStore = useAppSettingsStore()

const toBool = (value) => value === true || value === 1 || value === '1' || value === 'true'
// ============================================================
// STATE
// ============================================================
const searchQuery = ref('')
const editingType = ref(null)
const savingType = ref(false)
const editTab = ref('basic') // basic | fields | responses | ui | rules | features | actions
const expandedTypeId = ref(null)

const newType = ref(emptyType())
const newField = ref(emptyField())
const newAllowedResponse = ref('')
const newAllowedInquiryType = ref('')

// ============================================================
// HELPERS
// ============================================================
function emptyType() {
  return {
    group_type: '',
    family: familyKey.value,  
    icon: null,
    label: '',
    description: '',
    fields: [],
    allowed_inquiry_types: [],
    allowed_response: [],
    ui: {},
    rules: {},
    features: [],
    actions: [],
    is_root: false,
    sort_order: 0,
  }
}

function emptyField() {
  return { key: '', label: '', type: 'string', required: false, default: null }
}

const FIELD_TYPES = [
  'string', 'text', 'textarea', 'rich_text', 'integer', 'boolean',
  'datetime', 'date', 'enum', 'array', 'json', 'users', 'groups',
  'files', 'location', 'inquiry',
]

// ============================================================
// COMPUTED
// ============================================================
const familyOptions = computed(() =>
  (appSettingsStore.inquiryFamilyTab ?? []).map((f) => ({
    id: f.family_type,
    label: `${f.label} (${f.family_type})`,
  })),
)

const inquiryTypeOptions = computed(() =>
  (appSettingsStore.inquiryTypeTab ?? []).map((t) => ({
    id: t.inquiry_type,
    label: `${t.label || t.inquiry_type} (${t.inquiry_type})`,
  })),
)

const groupTypeOptions = computed(() =>
  (appSettingsStore.inquiryGroupTypeTab ?? []).map((t) => ({
    id: t.group_type,
    label: `${t.label || t.group_type} (${t.group_type})`,
  })),
)

const availableIcons = computed(() =>
  Object.keys(InquiryOptionIcons)
    .filter((key) => key !== 'default')
    .map((iconId) => ({
      id: iconId,
      label: t('agora', iconId.replace(/([A-Z])/g, ' $1').trim()),
    })),
)

const getIconComponent = (iconName) => {
  const id = typeof iconName === 'object' ? iconName?.id : iconName
  return InquiryOptionIcons[id] || InquiryOptionIcons.default
}

const findIconById = (iconId) => {
  if (!iconId) return null
  if (typeof iconId === 'object') return iconId
  return availableIcons.value.find((i) => i.id === iconId) || null
}

const extractIconId = (icon) => {
  if (!icon) return ''
  if (typeof icon === 'string') return icon
  if (typeof icon === 'object') return icon.id || ''
  return String(icon)
}

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

const normalizeObject = (value) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value
  if (typeof value === 'string' && value) {
    try {
      const parsed = JSON.parse(value)
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
    } catch {
      return {}
    }
  }
  return {}
}

const allTypes = computed(() => appSettingsStore.inquiryGroupTypeTab ?? [])

const filteredTypes = computed(() => {
  let list = familyKey.value
    ? allTypes.value.filter((t) => t.family === familyKey.value)
    : allTypes.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (t) =>
        t.group_type?.toLowerCase().includes(q) ||
        t.label?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.family?.toLowerCase().includes(q),
    )
  }
  return list.map((type) => ({
    ...type,
    fields: normalizeArray(type.fields),
    allowed_inquiry_types: normalizeArray(type.allowed_inquiry_types),
    allowed_response: normalizeArray(type.allowed_response),
    features: normalizeArray(type.features),
    actions: normalizeArray(type.actions),
    ui: normalizeObject(type.ui),
    rules: normalizeObject(type.rules),
    is_root: toBool(type.is_root),   // ← convert 0/1 to Boolean
  }))
})

// ============================================================
// VALIDATION
// ============================================================
const validateType = (type, isEdit = false) => {
  if (!type.group_type?.trim()) {
    showError(t('agora', 'Group type key is mandatory'))
    return false
  }
  if (!/^[a-z][a-z0-9_]*$/i.test(type.group_type)) {
    showError(
      t('agora', 'Group type key must be alphanumeric (underscores allowed), starting with a letter'),
    )
    return false
  }
  if (!type.family?.trim()) {
    showError(t('agora', 'Family is mandatory'))
    return false
  }
  if (!type.label?.trim()) {
    showError(t('agora', 'Label is mandatory'))
    return false
  }
  if (!isEdit) {
    const exists = allTypes.value.some((t) => t.group_type === type.group_type)
    if (exists) {
      showError(t('agora', 'A group type with this key already exists'))
      return false
    }
  }
  return true
}

// ============================================================
// CRUD
// ============================================================
const addType = async () => {
  if (!validateType(newType.value, false)) return
  savingType.value = true
  try {
    await appSettingsStore.addInquiryGroupType({
  ...newType.value,
  family: familyKey.value,        
  icon: extractIconId(newType.value.icon),
  is_root: newType.value.is_root ? 1 : 0,
  created: Date.now(),
})

    showSuccess(t('agora', 'Group type added'))
    newType.value = emptyType()
  } catch (e) {
    showError(t('agora', 'Failed to add group type: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingType.value = false
  }
}

const startEditing = (type) => {
  editingType.value = {
  ...JSON.parse(JSON.stringify(type)),
  icon: findIconById(type.icon),
  is_root: toBool(type.is_root),      
  fields: normalizeArray(type.fields),
  allowed_inquiry_types: normalizeArray(type.allowed_inquiry_types),
  allowed_response: normalizeArray(type.allowed_response),
  ui: normalizeObject(type.ui),
  rules: normalizeObject(type.rules),
  features: normalizeArray(type.features),
  actions: normalizeArray(type.actions),
}
  editTab.value = 'basic'
}

const cancelEditing = () => {
  editingType.value = null
  editTab.value = 'basic'
}

const updateType = async (type) => {
  if (!type || !validateType(type, true)) return
  savingType.value = true
  try {
    await appSettingsStore.updateInquiryGroupType(type.id, {
  ...type,
  family: familyKey.value,     
  icon: extractIconId(type.icon),
  is_root: type.is_root ? 1 : 0,
})

    showSuccess(t('agora', 'Group type updated'))
    editingType.value = null
  } catch (e) {
    showError(t('agora', 'Failed to update group type: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingType.value = false
  }
}

const deleteType = async (type) => {
  if (
    !confirm(
      t('agora', 'Are you sure you want to delete the group type "{label}"?', {
        label: type.label || type.group_type,
      }),
    )
  ) {
    return
  }
  try {
    await appSettingsStore.deleteInquiryGroupType(type.id)
    showSuccess(t('agora', 'Group type deleted'))
  } catch (e) {
    showError(t('agora', 'Failed to delete group type: {msg}', { msg: e?.message ?? '' }))
  }
}

const toggleExpand = (id) => {
  expandedTypeId.value = expandedTypeId.value === id ? null : id
}

// ============================================================
// FIELD EDITOR
// ============================================================
const addField = (target) => {
  const field = newField.value
  if (!field.key?.trim()) {
    showError(t('agora', 'Field key is required'))
    return
  }
  if (!/^[a-z][a-z0-9_]*$/i.test(field.key)) {
    showError(t('agora', 'Field key must be alphanumeric (underscores allowed)'))
    return
  }
  const arr = target === 'new' ? newType.value.fields : editingType.value.fields
  if (arr.some((f) => f.key === field.key)) {
    showError(t('agora', 'A field with this key already exists'))
    return
  }
  arr.push({ ...field })
  newField.value = emptyField()
}

const removeField = (target, index) => {
  const arr = target === 'new' ? newType.value.fields : editingType.value.fields
  arr.splice(index, 1)
}

// ============================================================
// ALLOWED RESPONSE / INQUIRY TYPES
// ============================================================
const addAllowedResponse = (target, value) => {
  const val = (value ?? '').trim()
  if (!val) return
  const arr =
    target === 'new' ? newType.value.allowed_response : editingType.value.allowed_response
  if (!arr.includes(val)) arr.push(val)
  newAllowedResponse.value = ''
}

const removeAllowedResponse = (target, index) => {
  const arr =
    target === 'new' ? newType.value.allowed_response : editingType.value.allowed_response
  arr.splice(index, 1)
}

const addAllowedInquiryType = (target, value) => {
  const val = (value ?? '').trim()
  if (!val) return
  const arr =
    target === 'new'
      ? newType.value.allowed_inquiry_types
      : editingType.value.allowed_inquiry_types
  if (!arr.includes(val)) arr.push(val)
  newAllowedInquiryType.value = ''
}

const removeAllowedInquiryType = (target, index) => {
  const arr =
    target === 'new'
      ? newType.value.allowed_inquiry_types
      : editingType.value.allowed_inquiry_types
  arr.splice(index, 1)
}

// ============================================================
// FEATURE LIST
// ============================================================
const newFeature = ref('')
const addFeature = (target) => {
  const value = newFeature.value?.trim()
  if (!value) return
  const arr = target === 'new' ? newType.value.features : editingType.value.features
  if (!arr.includes(value)) arr.push(value)
  newFeature.value = ''
}
const removeFeature = (target, index) => {
  const arr = target === 'new' ? newType.value.features : editingType.value.features
  arr.splice(index, 1)
}

// ============================================================
// ACTION LIST
// ============================================================
const newAction = ref({ key: '', label: '', icon: '' })
const addAction = (target) => {
  const { key, label, icon } = newAction.value
  if (!key?.trim() || !label?.trim()) {
    showError(t('agora', 'Action key and label are required'))
    return
  }
  const arr = target === 'new' ? newType.value.actions : editingType.value.actions
  arr.push({ key: key.trim(), label: label.trim(), icon: icon?.trim() || '' })
  newAction.value = { key: '', label: '', icon: '' }
}
const removeAction = (target, index) => {
  const arr = target === 'new' ? newType.value.actions : editingType.value.actions
  arr.splice(index, 1)
}
</script>

<template>
  <div class="group-types-manager">
    <header class="manager-header">
      <div>
        <h2>{{ t('agora', 'Inquiry group types management') }}</h2>
        <p class="description">
          {{
            t(
              'agora',
              'Configure inquiry group types (e.g., citizen_jury, investigation_case). Each group type belongs to an inquiry family and defines the UI layout, rules, features and actions shared by all groups of this type.',
            )
          }}
        </p>
      </div>
    </header>

    <!-- ==================== EXISTING TYPES ==================== -->
    <section class="types-list">
      <h3>
        {{ t('agora', 'Existing group types') }}
        <span class="count-badge">{{ filteredTypes.length }}</span>
      </h3>

      <div v-if="!filteredTypes.length" class="empty-state">
        {{ t('agora', 'No group types match your filters.') }}
      </div>

      <div
        v-for="type in filteredTypes"
        :key="type.id"
        class="type-card"
        :class="{ expanded: expandedTypeId === type.id }"
      >
        <div class="type-row" @click="emit('groupTypeSelected', type)">
          <div class="type-icon">
            <component :is="getIconComponent(type.icon)" :size="20" />
          </div>

          <div class="type-info">
            <div class="type-title-row">
              <h4>{{ type.label || type.group_type }}</h4>
              <code class="type-key">{{ type.group_type }}</code>
              <span class="family-badge">{{ type.family }}</span>
              <span v-if="type.is_root" class="root-badge">{{ t('agora', 'root') }}</span>
            </div>
            <p v-if="type.description" class="type-description">{{ type.description }}</p>
            <div class="type-stats">
              <span class="stat-chip">
                {{ t('agora', '{count} fields', { count: type.fields.length }) }}
              </span>
              <span v-if="type.allowed_inquiry_types.length" class="stat-chip">
                {{ t('agora', '{count} inquiry types', { count: type.allowed_inquiry_types.length }) }}
              </span>
              <span v-if="type.allowed_response.length" class="stat-chip">
                {{ t('agora', '{count} responses', { count: type.allowed_response.length }) }}
              </span>
              <span v-if="type.features.length" class="stat-chip">
                {{ t('agora', '{count} features', { count: type.features.length }) }}
              </span>
              <span v-if="type.actions.length" class="stat-chip">
                {{ t('agora', '{count} actions', { count: type.actions.length }) }}
              </span>
              <span v-if="type.ui?.experience" class="stat-chip layout">
                {{ type.ui.experience }}
              </span>
            </div>
          </div>

          <div class="type-actions" @click.stop>
            <NcButton @click="toggleExpand(type.id)">
              {{ expandedTypeId === type.id ? t('agora', 'Hide') : t('agora', 'Details') }}
            </NcButton>
            <NcButton @click="startEditing(type)">{{ t('agora', 'Edit') }}</NcButton>
            <NcButton type="error" @click="deleteType(type)">
              {{ t('agora', 'Delete') }}
            </NcButton>
          </div>
        </div>

        <div v-if="expandedTypeId === type.id" class="type-details">
          <div class="detail-section">
            <h5>{{ t('agora', 'Fields') }}</h5>
            <table v-if="type.fields.length" class="mini-table">
              <thead>
                <tr>
                  <th>{{ t('agora', 'Key') }}</th>
                  <th>{{ t('agora', 'Label') }}</th>
                  <th>{{ t('agora', 'Type') }}</th>
                  <th>{{ t('agora', 'Required') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(f, i) in type.fields" :key="i">
                  <td><code>{{ f.key }}</code></td>
                  <td>{{ f.label }}</td>
                  <td>{{ f.type }}</td>
                  <td>{{ f.required ? '✓' : '—' }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else class="muted">{{ t('agora', 'No custom fields') }}</p>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Allowed inquiry types') }}</h5>
            <ul class="pill-list">
              <li v-for="(r, i) in type.allowed_inquiry_types" :key="i" class="pill">{{ r }}</li>
              <li v-if="!type.allowed_inquiry_types.length" class="muted">{{ t('agora', 'None') }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Allowed responses') }}</h5>
            <ul class="pill-list">
              <li v-for="(r, i) in type.allowed_response" :key="i" class="pill">{{ r }}</li>
              <li v-if="!type.allowed_response.length" class="muted">{{ t('agora', 'None') }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Features') }}</h5>
            <ul class="pill-list">
              <li v-for="(f, i) in type.features" :key="i" class="pill">{{ f }}</li>
              <li v-if="!type.features.length" class="muted">{{ t('agora', 'None') }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Actions') }}</h5>
            <ul class="action-list">
              <li v-for="(a, i) in type.actions" :key="i">
                <code>{{ a.key }}</code> — {{ a.label }}
                <span v-if="a.icon" class="muted"> ({{ a.icon }})</span>
              </li>
              <li v-if="!type.actions.length" class="muted">{{ t('agora', 'None') }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'UI') }}</h5>
            <pre>{{ JSON.stringify(type.ui, null, 2) }}</pre>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Rules') }}</h5>
            <pre>{{ JSON.stringify(type.rules, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== ADD NEW TYPE ==================== -->
    <section class="add-type-form">
      <h3>{{ t('agora', 'Add new group type') }}</h3>

      <div class="form-grid">
        <NcInputField
          v-model="newType.group_type"
          :label="t('agora', 'Group type key')"
          :placeholder="t('agora', 'e.g., citizen_jury')"
          required
        />
	<NcInputField :model-value="familyLabel" :label="t('agora', 'Family')" disabled readonly />
        <NcInputField
          v-model="newType.label"
          :label="t('agora', 'Label')"
          :placeholder="t('agora', 'Citizen Jury')"
          required
        />
<NcSelect
  v-model="newType.icon"
  :input-label="t('agora', 'Icon')"
  :label-outside="true"
  :options="availableIcons"
  track-by="id"
  :clearable="false"
  :placeholder="t('agora', 'Select an icon')"
/>

        <NcInputField
          v-model="newType.sort_order"
          :label="t('agora', 'Sort order')"
          type="number"
          :min="0"
        />
        <NcCheckboxRadioSwitch v-model="newType.is_root" type="switch">
          {{ t('agora', 'Is root group') }}
        </NcCheckboxRadioSwitch>

        <NcInputField
          v-model="newType.description"
          :label="t('agora', 'Description')"
          type="textarea"
          class="full-width"
        />

        <!-- Fields -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Custom fields') }}</label>
          <div class="inline-editor field-editor">
            <NcInputField v-model="newField.key"   :label="t('agora', 'Field key')"   :label-outside="true" :placeholder="t('agora', 'key')" />
<NcInputField v-model="newField.label" :label="t('agora', 'Field label')" :label-outside="true" :placeholder="t('agora', 'Label')" />
<NcSelect
  v-model="newField.type"
  :input-label="t('agora', 'Field type')"
  :label-outside="true"
  :options="FIELD_TYPES.map((ft) => ({ id: ft, label: ft }))"
  label="label"
  track-by="id"
  :clearable="false"
/>
		  <NcCheckboxRadioSwitch v-model="newField.required" type="checkbox">
              {{ t('agora', 'Req.') }}
            </NcCheckboxRadioSwitch>
            <NcButton type="secondary" @click="addField('new')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <ul class="field-list">
            <li v-for="(f, i) in newType.fields" :key="i">
              <code>{{ f.key }}</code> — {{ f.label }} ({{ f.type }})
              <NcButton type="tertiary" @click="removeField('new', i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <!-- Allowed inquiry types -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Allowed inquiry types') }}</label>
          <div class="inline-editor">
		 <NcSelect
  v-model="newAllowedInquiryType"
  :input-label="t('agora', 'Inquiry type')"
  :label-outside="true"
  :options="inquiryTypeOptions"
  label="label"
  track-by="id"
  :clearable="true"
  :placeholder="t('agora', 'Pick an inquiry type')"
  class="inline-input"
/>
            <NcButton type="secondary" @click="addAllowedInquiryType('new', newAllowedInquiryType?.id)">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in newType.allowed_inquiry_types"
              :key="i"
              class="pill removable"
              @click="removeAllowedInquiryType('new', i)"
            >
              {{ r }} ✕
            </span>
          </div>
        </div>

        <!-- Allowed responses -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Allowed responses (group types)') }}</label>
          <div class="inline-editor">
            <NcSelect
  v-model="newAllowedResponse"
  :input-label="t('agora', 'Group type')"
  :label-outside="true"
  :options="groupTypeOptions"
  label="label"
  track-by="id"
  :clearable="true"
  :placeholder="t('agora', 'Pick a group type')"
  class="inline-input"
/>
		  <NcButton type="secondary" @click="addAllowedResponse('new', newAllowedResponse?.id)">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in newType.allowed_response"
              :key="i"
              class="pill removable"
              @click="removeAllowedResponse('new', i)"
            >
              {{ r }} ✕
            </span>
          </div>
        </div>

        <!-- Features -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Features') }}</label>
          <div class="inline-editor">
		  <NcInputField
  v-model="newFeature"
  :label="t('agora', 'Feature')"
  :label-outside="true"
  :placeholder="t('agora', 'e.g., inquiry_selection')"
  class="inline-input"
  @keydown.enter.prevent="addFeature('new')"
/>

            <NcButton type="secondary" @click="addFeature('new')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(f, i) in newType.features"
              :key="i"
              class="pill removable"
              @click="removeFeature('new', i)"
            >
              {{ f }} ✕
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Actions') }}</label>
          <div class="inline-editor action-editor">
		  <NcInputField v-model="newAction.key"   :label="t('agora', 'Action key')"   :label-outside="true" :placeholder="t('agora', 'key')" />
<NcInputField v-model="newAction.label" :label="t('agora', 'Action label')" :label-outside="true" :placeholder="t('agora', 'Label')" />
<NcInputField v-model="newAction.icon"  :label="t('agora', 'Action icon')"  :label-outside="true" :placeholder="t('agora', 'Icon')" />
            <NcButton type="secondary" @click="addAction('new')">
              {{ t('agora', 'Add action') }}
            </NcButton>
          </div>
          <ul class="action-list">
            <li v-for="(a, i) in newType.actions" :key="i">
              <code>{{ a.key }}</code> — {{ a.label }}
              <NcButton type="tertiary" @click="removeAction('new', i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <!-- UI / Rules JSON text areas -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'UI (JSON)') }}</label>
          <textarea
            class="json-editor"
            rows="6"
            :value="JSON.stringify(newType.ui, null, 2)"
            @input="
              (e) => {
                try {
                  newType.ui = JSON.parse(e.target.value)
                } catch (_) {
                  /* keep raw */
                }
              }
            "
          />
        </div>
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Rules (JSON)') }}</label>
          <textarea
            class="json-editor"
            rows="6"
            :value="JSON.stringify(newType.rules, null, 2)"
            @input="
              (e) => {
                try {
                  newType.rules = JSON.parse(e.target.value)
                } catch (_) {
                  /* keep raw */
                }
              }
            "
          />
        </div>

        <div class="form-actions full-width">
          <NcButton
            type="primary"
            :disabled="savingType || !newType.group_type || !newType.label || !newType.family"
            @click="addType"
          >
            <NcLoadingIcon v-if="savingType" :size="16" />
            <span v-else>{{ t('agora', 'Add group type') }}</span>
          </NcButton>
        </div>
      </div>
    </section>

    <!-- ==================== EDIT MODAL ==================== -->
    <div v-if="editingType" class="modal-overlay" @click.self="cancelEditing">
      <div class="modal-content large-modal">
        <header class="modal-header">
          <h3>{{ t('agora', 'Edit group type') }}: {{ editingType.label }}</h3>
          <NcButton type="tertiary" @click="cancelEditing">✕</NcButton>
        </header>

        <nav class="tabs">
          <button
            v-for="tab in ['basic', 'fields', 'responses', 'ui', 'rules', 'features', 'actions']"
            :key="tab"
            class="tab"
            :class="{ active: editTab === tab }"
            @click="editTab = tab"
          >
            {{ t('agora', tab) }}
          </button>
        </nav>

        <!-- BASIC -->
        <div v-if="editTab === 'basic'" class="tab-panel form-grid">
          <NcInputField v-model="editingType.group_type" :label="t('agora', 'Group type key')" required />
	  <NcInputField :model-value="familyLabel" :label="t('agora', 'Family')" disabled readonly />
	  <NcInputField v-model="editingType.label" :label="t('agora', 'Label')" required />
          <NcSelect
  v-model="editingType.icon"
  :input-label="t('agora', 'Icon')"
  :label-outside="true"
  :options="availableIcons"
  track-by="id"
  :clearable="false"
/>
	  <NcInputField
            v-model="editingType.sort_order"
            :label="t('agora', 'Sort order')"
            type="number"
            :min="0"
          />
          <NcCheckboxRadioSwitch v-model="editingType.is_root" type="switch">
            {{ t('agora', 'Is root group') }}
          </NcCheckboxRadioSwitch>
          <NcInputField
            v-model="editingType.description"
            :label="t('agora', 'Description')"
            type="textarea"
            class="full-width"
          />
        </div>

        <!-- FIELDS -->
        <div v-if="editTab === 'fields'" class="tab-panel">
          <div class="inline-editor field-editor">
            <NcInputField v-model="newField.key" :placeholder="t('agora', 'key')" />
            <NcInputField v-model="newField.label" :placeholder="t('agora', 'Label')" />
            <NcSelect
              v-model="newField.type"
              :options="FIELD_TYPES.map((ft) => ({ id: ft, label: ft }))"
              label="label"
              track-by="id"
              :clearable="false"
            />
            <NcCheckboxRadioSwitch v-model="newField.required" type="checkbox">
              {{ t('agora', 'Req.') }}
            </NcCheckboxRadioSwitch>
            <NcButton type="secondary" @click="addField('edit')">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <ul class="field-list">
            <li v-for="(f, i) in editingType.fields" :key="i">
              <code>{{ f.key }}</code> — {{ f.label }} ({{ f.type }})
              <NcButton type="tertiary" @click="removeField('edit', i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <!-- RESPONSES -->
        <div v-if="editTab === 'responses'" class="tab-panel">
          <label class="field-label">{{ t('agora', 'Allowed inquiry types') }}</label>
          <div class="inline-editor">
            <NcSelect
              v-model="newAllowedInquiryType"
              :options="inquiryTypeOptions"
              label="label"
              track-by="id"
              :clearable="true"
              class="inline-input"
            />
            <NcButton type="secondary" @click="addAllowedInquiryType('edit', newAllowedInquiryType?.id)">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in editingType.allowed_inquiry_types"
              :key="i"
              class="pill removable"
              @click="removeAllowedInquiryType('edit', i)"
            >
              {{ r }} ✕
            </span>
          </div>

          <label class="field-label" style="margin-top: 20px;">
            {{ t('agora', 'Allowed responses (group types)') }}
          </label>
          <div class="inline-editor">
            <NcSelect
              v-model="newAllowedResponse"
              :options="groupTypeOptions"
              label="label"
              track-by="id"
              :clearable="true"
              class="inline-input"
            />
            <NcButton type="secondary" @click="addAllowedResponse('edit', newAllowedResponse?.id)">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in editingType.allowed_response"
              :key="i"
              class="pill removable"
              @click="removeAllowedResponse('edit', i)"
            >
              {{ r }} ✕
            </span>
          </div>
        </div>

        <!-- UI -->
        <div v-if="editTab === 'ui'" class="tab-panel">
          <p class="help-text">
            {{ t('agora', 'UI configuration as JSON (experience, layout, display_architecture…).') }}
          </p>
          <textarea
            class="json-editor"
            rows="14"
            :value="JSON.stringify(editingType.ui, null, 2)"
            @input="
              (e) => {
                try {
                  editingType.ui = JSON.parse(e.target.value)
                } catch (_) {
                  /* keep raw */
                }
              }
            "
          />
        </div>

        <!-- RULES -->
        <div v-if="editTab === 'rules'" class="tab-panel">
          <p class="help-text">{{ t('agora', 'Rules configuration as JSON.') }}</p>
          <textarea
            class="json-editor"
            rows="14"
            :value="JSON.stringify(editingType.rules, null, 2)"
            @input="
              (e) => {
                try {
                  editingType.rules = JSON.parse(e.target.value)
                } catch (_) {
                  /* keep raw */
                }
              }
            "
          />
        </div>

        <!-- FEATURES -->
        <div v-if="editTab === 'features'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
              v-model="newFeature"
              :placeholder="t('agora', 'Feature identifier')"
              @keydown.enter.prevent="addFeature('edit')"
            />
            <NcButton type="secondary" @click="addFeature('edit')">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(f, i) in editingType.features"
              :key="i"
              class="pill removable"
              @click="removeFeature('edit', i)"
            >
              {{ f }} ✕
            </span>
          </div>
        </div>

        <!-- ACTIONS -->
        <div v-if="editTab === 'actions'" class="tab-panel">
          <div class="inline-editor action-editor">
            <NcInputField v-model="newAction.key" :placeholder="t('agora', 'key')" />
            <NcInputField v-model="newAction.label" :placeholder="t('agora', 'Label')" />
            <NcInputField v-model="newAction.icon" :placeholder="t('agora', 'Icon')" />
            <NcButton type="secondary" @click="addAction('edit')">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <ul class="action-list">
            <li v-for="(a, i) in editingType.actions" :key="i">
              <code>{{ a.key }}</code> — {{ a.label }}
              <NcButton type="tertiary" @click="removeAction('edit', i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <footer class="modal-actions">
          <NcButton @click="cancelEditing">{{ t('agora', 'Cancel') }}</NcButton>
          <NcButton
            type="primary"
            :disabled="savingType"
            @click="updateType(editingType)"
          >
            <NcLoadingIcon v-if="savingType" :size="16" />
            <span v-else>{{ t('agora', 'Save changes') }}</span>
          </NcButton>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-types-manager {
  padding: 20px;
  max-width: 1200px;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.manager-header h2 {
  margin: 0 0 6px 0;
}

.description {
  color: var(--color-text-lighter);
  margin: 0;
  max-width: 720px;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.filter-select {
  min-width: 200px;
}

.search-field {
  width: 240px;
}

.count-badge {
  font-size: 0.8em;
  background: var(--color-primary-element-light);
  color: var(--color-primary);
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
}

.types-list {
  margin-bottom: 40px;
}

.type-card {
  background: var(--color-background-dark);
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

.type-card:hover {
  background: var(--color-background-hover);
}

.type-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  cursor: pointer;
}

.type-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-element-light);
  color: var(--color-primary);
  border-radius: 10px;
  flex-shrink: 0;
}

.type-info {
  flex: 1;
  min-width: 0;
}

.type-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
}

.type-title-row h4 {
  margin: 0;
}

.type-key {
  font-size: 0.82em;
  background: var(--color-background-hover);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--color-text-lighter);
}

.family-badge {
  font-size: 0.75em;
  background: var(--color-primary);
  color: var(--color-primary-text);
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.root-badge {
  font-size: 0.72em;
  background: var(--color-success, #2ecc71);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
}

.type-description {
  margin: 4px 0 0 0;
  color: var(--color-text-lighter);
  font-size: 0.9em;
}

.type-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.stat-chip {
  font-size: 0.78em;
  background: var(--color-background-hover);
  color: var(--color-text-light);
  padding: 2px 8px;
  border-radius: 10px;
}

.stat-chip.layout {
  background: var(--color-warning, #f5a623);
  color: white;
}

.type-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.type-details {
  padding: 0 16px 16px 70px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.detail-section h5 {
  margin: 0 0 8px 0;
  color: var(--color-text-lighter);
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-section pre {
  background: var(--color-background-darker, #1a1a1a);
  color: var(--color-text-light);
  padding: 10px;
  border-radius: 6px;
  font-size: 0.8em;
  overflow: auto;
  max-height: 200px;
  margin: 0;
}

.mini-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85em;
}

.mini-table th,
.mini-table td {
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.mini-table th {
  color: var(--color-text-lighter);
  font-weight: 500;
}

.add-type-form {
  padding: 24px;
  background: var(--color-background-dark);
  border-radius: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.full-width {
  grid-column: 1 / -1;
}

.field-label {
  display: block;
  font-size: 0.85em;
  color: var(--color-text-lighter);
  margin-bottom: 6px;
  font-weight: 500;
}

.inline-editor {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.inline-editor > * {
  flex: 1;
  min-width: 120px;
}

.inline-editor.field-editor {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1fr auto auto;
  gap: 8px;
  align-items: flex-end;
}

.inline-editor.action-editor {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 8px;
}

.pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.pill {
  display: inline-block;
  background: var(--color-primary-element-light);
  color: var(--color-primary);
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.82em;
}

.pill.removable {
  cursor: pointer;
}

.pill.removable:hover {
  background: var(--color-error);
  color: white;
}

.action-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.action-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9em;
}

.field-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.field-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9em;
}

.field-list code,
.action-list code {
  background: var(--color-background-hover);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
}

.empty-state {
  padding: 30px;
  text-align: center;
  color: var(--color-text-lighter);
  background: var(--color-background-dark);
  border-radius: 8px;
}

.muted {
  color: var(--color-text-lighter);
  font-style: italic;
  font-size: 0.9em;
}

.help-text {
  color: var(--color-text-lighter);
  font-size: 0.9em;
  margin: 0 0 10px 0;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-main-background);
  padding: 24px;
  border-radius: 12px;
  width: 900px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-header h3 {
  margin: 0;
}

.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab {
  background: transparent;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  color: var(--color-text-lighter);
  border-bottom: 2px solid transparent;
  text-transform: capitalize;
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}

.tab-panel {
  min-height: 220px;
}

.json-editor {
  width: 100%;
  font-family: monospace;
  font-size: 0.85em;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-dark);
  color: var(--color-text-light);
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}
</style>
