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

const emit = defineEmits(['typeSelected'])
const appSettingsStore = useAppSettingsStore()

// ============================================================
// FAMILY — fixed by parent (AdminSettings)
// ============================================================
const familyKey = computed(() => props.selectedFamily?.family_type ?? '')
const familyLabel = computed(() => props.selectedFamily?.label ?? familyKey.value)

// ============================================================
// STATE
// ============================================================
const searchQuery = ref('')
const editingType = ref(null)
const savingType = ref(false)
const editTab = ref('basic') // basic | fields | responses | statuses
const expandedTypeId = ref(null)

const newType = ref(emptyType())
const newField = ref(emptyField())
const newStatus = ref({ status_key: '', label: '' })
const newAllowedResponse = ref('')

function emptyType() {
  return {
    option_type: '',
    family: familyKey.value,
    icon: null,
    label: '',
    description: '',
    fields: [],
    allowed_response: [],
    allow_comment: true,
    support_feature: 'none',
    statuses: [],
    use_title: false,
  }
}

function emptyField() {
  return {
    key: '',
    label: '',
    type: 'string',
    required: false,
    default: null,
  }
}

const FIELD_TYPES = [
  'string', 'text', 'textarea', 'rich_text', 'integer', 'boolean',
  'datetime', 'date', 'enum', 'array', 'json', 'users', 'groups',
  'files', 'location', 'inquiry',
]

const SUPPORT_FEATURES = [
  'none', 'binary', 'ternary', 'score', 'reaction',
  'majority_judgment', 'approval', 'ranking', 'borda', 'condorcet',
  'quadratic', 'token_weighted',
]

const fieldTypeOptions = computed(() =>
  FIELD_TYPES.map((ft) => ({ id: ft, label: ft })),
)

const supportFeatureOptions = computed(() =>
  SUPPORT_FEATURES.map((s) => ({ id: s, label: s })),
)

// ============================================================
// COMPUTED
// ============================================================
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

// API returns 0/1 for booleans — NcCheckboxRadioSwitch requires real Boolean
const toBool = (value) => value === true || value === 1 || value === '1' || value === 'true'

const allTypes = computed(() => appSettingsStore.optionTypeTab ?? [])

const filteredTypes = computed(() => {
  // Family is fixed by parent — filter automatically
  let list = familyKey.value
    ? allTypes.value.filter((type) => type.family === familyKey.value)
    : allTypes.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (type) =>
        type.option_type?.toLowerCase().includes(q) ||
        type.label?.toLowerCase().includes(q) ||
        type.description?.toLowerCase().includes(q) ||
        type.family?.toLowerCase().includes(q),
    )
  }

  return list.map((type) => ({
    ...type,
    fields: normalizeArray(type.fields),
    allowed_response: normalizeArray(type.allowed_response),
    statuses: normalizeArray(type.statuses),
  }))
})

// ============================================================
// VALIDATION
// ============================================================
const validateType = (type, isEdit = false) => {
  if (!type.option_type?.trim()) {
    showError(t('agora', 'Option type key is mandatory'))
    return false
  }
  if (!/^[a-z][a-z0-9_]*$/i.test(type.option_type)) {
    showError(
      t('agora', 'Option type key must be alphanumeric (underscores allowed), starting with a letter'),
    )
    return false
  }
  if (!type.label?.trim()) {
    showError(t('agora', 'Label is mandatory'))
    return false
  }
  if (!isEdit) {
    const exists = allTypes.value.some((existing) => existing.option_type === type.option_type)
    if (exists) {
      showError(t('agora', 'An option type with this key already exists'))
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
    await appSettingsStore.addOptionType({
      ...newType.value,
      family: familyKey.value,
      icon: extractIconId(newType.value.icon),
      created: Date.now(),
    })
    showSuccess(t('agora', 'Option type added'))
    newType.value = emptyType()
  } catch (e) {
    showError(t('agora', 'Failed to add option type: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingType.value = false
  }
}

const startEditing = (type) => {
  editingType.value = {
    ...JSON.parse(JSON.stringify(type)),
    icon: findIconById(type.icon),
    fields: normalizeArray(type.fields),
    allowed_response: normalizeArray(type.allowed_response),
    statuses: normalizeArray(type.statuses),
    allow_comment: toBool(type.allow_comment),
    use_title: toBool(type.use_title),
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
    await appSettingsStore.updateOptionType(type.id, {
      ...type,
      family: familyKey.value,
      icon: extractIconId(type.icon),
      allow_comment: type.allow_comment ? 1 : 0,
      use_title: type.use_title ? 1 : 0,
    })
    showSuccess(t('agora', 'Option type updated'))
    editingType.value = null
  } catch (e) {
    showError(t('agora', 'Failed to update option type: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingType.value = false
  }
}

const deleteType = async (type) => {
  if (
    !confirm(
      t('agora', 'Are you sure you want to delete the option type "{label}"?', {
        label: type.label || type.option_type,
      }),
    )
  ) {
    return
  }
  try {
    await appSettingsStore.deleteOptionType(type.id)
    showSuccess(t('agora', 'Option type deleted'))
  } catch (e) {
    showError(t('agora', 'Failed to delete option type: {msg}', { msg: e?.message ?? '' }))
  }
}

const toggleExpand = (id) => {
  expandedTypeId.value = expandedTypeId.value === id ? null : id
}

// ============================================================
// FIELD MANAGEMENT
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
// ALLOWED RESPONSE MANAGEMENT
// ============================================================
const addAllowedResponse = (target) => {
  const val = newAllowedResponse.value?.trim()
  if (!val) return
  const arr = target === 'new' ? newType.value.allowed_response : editingType.value.allowed_response
  if (!arr.includes(val)) arr.push(val)
  newAllowedResponse.value = ''
}

const removeAllowedResponse = (target, index) => {
  const arr = target === 'new' ? newType.value.allowed_response : editingType.value.allowed_response
  arr.splice(index, 1)
}

// ============================================================
// STATUS MANAGEMENT
// ============================================================
const addStatus = (target) => {
  const { statusKey, label } = newStatus.value
  if (!statusKey?.trim()) {
    showError(t('agora', 'Status key is required'))
    return
  }
  const arr = target === 'new' ? newType.value.statuses : editingType.value.statuses
  arr.push({
    statusKey: statusKey.trim(),
    label: (label || statusKey).trim(),
  })
  newStatus.value = { statusKey: '', label: '' }
}

const removeStatus = (target, index) => {
  const arr = target === 'new' ? newType.value.statuses : editingType.value.statuses
  arr.splice(index, 1)
}

defineExpose({ editingType, newType })
</script>

<template>
  <div class="option-types-manager">
    <header class="manager-header">
      <div>
        <h2>
          {{ t('agora', 'Option types — {family}', { family: familyLabel }) }}
        </h2>
        <p class="description">
          {{
            t(
              'agora',
              'Configure option types available in the "{family}" family (fields, allowed responses, support engines and statuses).',
              { family: familyLabel },
            )
          }}
        </p>
      </div>
      <div class="header-actions">
        <NcInputField
          v-model="searchQuery"
          type="text"
          :label="t('agora', 'Search')"
          :label-outside="true"
          :placeholder="t('agora', 'Search option types…')"
          class="search-field"
        />
      </div>
    </header>

    <!-- ==================== EXISTING TYPES ==================== -->
    <section class="types-list">
      <h3>
        {{ t('agora', 'Existing option types') }}
        <span class="count-badge">{{ filteredTypes.length }}</span>
      </h3>

      <div v-if="!filteredTypes.length" class="empty-state">
        {{ t('agora', 'No option types match your filters.') }}
      </div>

      <div
        v-for="type in filteredTypes"
        :key="type.id"
        class="type-card"
        :class="{ expanded: expandedTypeId === type.id }"
      >
        <div class="type-row" @click="emit('typeSelected', type)">
          <div class="type-icon">
            <component :is="getIconComponent(type.icon)" :size="20" />
          </div>

          <div class="type-info">
            <div class="type-title-row">
              <h4>{{ type.label || type.option_type }}</h4>
              <code class="type-key">{{ type.option_type }}</code>
              <span class="family-badge">{{ type.family }}</span>
            </div>
            <p v-if="type.description" class="type-description">{{ type.description }}</p>
            <div class="type-stats">
              <span class="stat-chip">
                {{ t('agora', '{count} fields', { count: type.fields.length }) }}
              </span>
              <span v-if="type.allowed_response?.length" class="stat-chip">
                {{ t('agora', '{count} responses', { count: type.allowed_response.length }) }}
              </span>
              <span v-if="type.statuses?.length" class="stat-chip">
                {{ t('agora', '{count} statuses', { count: type.statuses.length }) }}
              </span>
              <span
                v-if="type.support_feature && type.support_feature !== 'none'"
                class="stat-chip support"
              >
                {{ type.support_feature }}
              </span>
              <span v-if="type.use_title" class="stat-chip title-flag">
                {{ t('agora', 'uses title') }}
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
            <h5>{{ t('agora', 'Allowed responses') }}</h5>
            <ul class="pill-list">
              <li v-for="(r, i) in type.allowed_response" :key="i" class="pill">{{ r }}</li>
              <li v-if="!type.allowed_response?.length" class="muted">{{ t('agora', 'None') }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Statuses') }}</h5>
            <ul class="pill-list">
              <li v-for="(s, i) in type.statuses" :key="i" class="pill">
                {{ s.label || s.status_key }}
              </li>
              <li v-if="!type.statuses?.length" class="muted">{{ t('agora', 'None') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== ADD NEW TYPE ==================== -->
    <section class="add-type-form">
      <h3>{{ t('agora', 'Add new option type to {family}', { family: familyLabel }) }}</h3>

      <div class="form-grid">
        <NcInputField
          v-model="newType.option_type"
          :label="t('agora', 'Type key')"
          :placeholder="t('agora', 'e.g., argument_for')"
          required
        />
        <!-- Family is fixed by parent: display only -->
        <NcInputField
          :model-value="familyLabel"
          :label="t('agora', 'Family')"
          disabled
          readonly
        />
        <NcInputField
          v-model="newType.label"
          :label="t('agora', 'Label')"
          :placeholder="t('agora', 'Argument For')"
          required
        />
        <NcSelect
          v-model="newType.icon"
          :input-label="t('agora', 'Icon')"
          :label-outside="true"
          :options="availableIcons"
          label="label"
          track-by="id"
          :clearable="false"
          :placeholder="t('agora', 'Select an icon')"
        />
        <NcSelect
          v-model="newType.support_feature"
          :input-label="t('agora', 'Support feature')"
          :label-outside="true"
          :options="supportFeatureOptions"
          label="label"
          track-by="id"
          :clearable="false"
          :placeholder="t('agora', 'Support feature')"
        />
        <NcCheckboxRadioSwitch v-model="newType.allow_comment" type="switch">
          {{ t('agora', 'Allow comments') }}
        </NcCheckboxRadioSwitch>
        <NcCheckboxRadioSwitch v-model="newType.use_title" type="switch">
          {{ t('agora', 'Use title') }}
        </NcCheckboxRadioSwitch>

        <NcInputField
          v-model="newType.description"
          :label="t('agora', 'Description')"
          type="textarea"
          class="full-width"
        />

        <!-- Inline fields editor -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Custom fields') }}</label>
          <div class="inline-editor field-editor">
            <NcInputField
              v-model="newField.key"
              :label="t('agora', 'Key')"
              :label-outside="true"
              :placeholder="t('agora', 'key')"
            />
            <NcInputField
              v-model="newField.label"
              :label="t('agora', 'Label')"
              :label-outside="true"
              :placeholder="t('agora', 'Label')"
            />
            <NcSelect
              v-model="newField.type"
              :input-label="t('agora', 'Type')"
              :label-outside="true"
              :options="fieldTypeOptions"
              label="label"
              track-by="id"
              :clearable="false"
            />
            <NcCheckboxRadioSwitch v-model="newField.required" type="checkbox">
              {{ t('agora', 'Required') }}
            </NcCheckboxRadioSwitch>
            <NcButton type="secondary" @click="addField('new')">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <ul class="field-list">
            <li v-for="(f, i) in newType.fields" :key="i">
              <code>{{ f.key }}</code> — {{ f.label }} ({{ f.type }})
              <NcButton type="tertiary" @click="removeField('new', i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <!-- Inline allowed responses -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Allowed responses') }}</label>
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedResponse"
              :label="t('agora', 'Response type key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., message')"
              @keydown.enter.prevent="addAllowedResponse('new')"
            />
            <NcButton type="secondary" @click="addAllowedResponse('new')">
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

        <!-- Inline statuses -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Statuses') }}</label>
          <div class="inline-editor">
            <NcInputField
              v-model="newStatus.status_key"
              :label="t('agora', 'Status key')"
              :label-outside="true"
              :placeholder="t('agora', 'status_key')"
            />
            <NcInputField
              v-model="newStatus.label"
              :label="t('agora', 'Status label')"
              :label-outside="true"
              :placeholder="t('agora', 'Label')"
            />
            <NcButton type="secondary" @click="addStatus('new')">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(s, i) in newType.statuses"
              :key="i"
              class="pill removable"
              @click="removeStatus('new', i)"
            >
              {{ s.label || s.status_key }} ✕
            </span>
          </div>
        </div>

        <div class="form-actions full-width">
          <NcButton
            type="primary"
            :disabled="savingType || !newType.option_type || !newType.label || !familyKey"
            @click="addType"
          >
            <NcLoadingIcon v-if="savingType" :size="16" />
            <span v-else>{{ t('agora', 'Add option type') }}</span>
          </NcButton>
        </div>
      </div>
    </section>

    <!-- ==================== EDIT MODAL ==================== -->
    <div v-if="editingType" class="modal-overlay" @click.self="cancelEditing">
      <div class="modal-content large-modal">
        <header class="modal-header">
          <h3>{{ t('agora', 'Edit option type') }}: {{ editingType.label }}</h3>
          <NcButton type="tertiary" @click="cancelEditing">✕</NcButton>
        </header>

        <nav class="tabs">
          <button
            v-for="tab in ['basic', 'fields', 'responses', 'statuses']"
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
          <NcInputField v-model="editingType.option_type" :label="t('agora', 'Type key')" required />
          <NcInputField
            :model-value="familyLabel"
            :label="t('agora', 'Family')"
            disabled
            readonly
          />
          <NcInputField v-model="editingType.label" :label="t('agora', 'Label')" required />
          <NcSelect
            v-model="editingType.icon"
            :input-label="t('agora', 'Icon')"
            :label-outside="true"
            :options="availableIcons"
            label="label"
            track-by="id"
            :clearable="false"
          />
          <NcSelect
            v-model="editingType.support_feature"
            :input-label="t('agora', 'Support feature')"
            :label-outside="true"
            :options="supportFeatureOptions"
            label="label"
            track-by="id"
            :clearable="false"
          />
          <NcCheckboxRadioSwitch v-model="editingType.allow_comment" type="switch">
            {{ t('agora', 'Allow comments') }}
          </NcCheckboxRadioSwitch>
          <NcCheckboxRadioSwitch v-model="editingType.use_title" type="switch">
            {{ t('agora', 'Use title') }}
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
            <NcInputField
              v-model="newField.key"
              :label="t('agora', 'Key')"
              :label-outside="true"
              :placeholder="t('agora', 'key')"
            />
            <NcInputField
              v-model="newField.label"
              :label="t('agora', 'Label')"
              :label-outside="true"
              :placeholder="t('agora', 'Label')"
            />
            <NcSelect
              v-model="newField.type"
              :input-label="t('agora', 'Type')"
              :label-outside="true"
              :options="fieldTypeOptions"
              label="label"
              track-by="id"
              :clearable="false"
            />
            <NcCheckboxRadioSwitch v-model="newField.required" type="checkbox">
              {{ t('agora', 'Required') }}
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
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedResponse"
              :label="t('agora', 'Response type key')"
              :label-outside="true"
              :placeholder="t('agora', 'Allowed response type')"
              @keydown.enter.prevent="addAllowedResponse('edit')"
            />
            <NcButton type="secondary" @click="addAllowedResponse('edit')">
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

        <!-- STATUSES -->
        <div v-if="editTab === 'statuses'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
              v-model="newStatus.status_key"
              :label="t('agora', 'Status key')"
              :label-outside="true"
              :placeholder="t('agora', 'status_key')"
            />
            <NcInputField
              v-model="newStatus.label"
              :label="t('agora', 'Status label')"
              :label-outside="true"
              :placeholder="t('agora', 'Label')"
            />
            <NcButton type="secondary" @click="addStatus('edit')">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(s, i) in editingType.statuses"
              :key="i"
              class="pill removable"
              @click="removeStatus('edit', i)"
            >
              {{ s.label || s.status_key }} ✕
            </span>
          </div>
        </div>

        <footer class="modal-actions">
          <NcButton @click="cancelEditing">{{ t('agora', 'Cancel') }}</NcButton>
          <NcButton type="primary" :disabled="savingType" @click="updateType(editingType)">
            <NcLoadingIcon v-if="savingType" :size="16" />
            <span v-else>{{ t('agora', 'Save changes') }}</span>
          </NcButton>
        </footer>
      </div>
    </div>
  </div>
  
  <EngineSelectorModal
  v-if="showEngineSelector"
  mode="deliberative"
  :available-engines="supportEngines"
  :existing-engine="existingSupportEngine"
  @close="showEngineSelector = false"
  @save="onSupportEngineSaved"
/>
</template>

<style scoped>
.option-types-manager {
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

.stat-chip.support {
  background: var(--color-success, #2ecc71);
  color: white;
}

.stat-chip.title-flag {
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

.field-list code {
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}
</style>
