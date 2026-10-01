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
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'
import { InquiryGeneralIcons } from '../../../utils/icons.ts'

interface Props {
  selectedFamily?: {
    family_type: string
    label?: string
  } | null
}

const props = defineProps<Props>()
const emit = defineEmits(['typeSelected', 'backToFamilies'])

const appSettingsStore = useAppSettingsStore()

// ============================================================
// FAMILY
// ============================================================
const familyKey = computed(() => props.selectedFamily?.family_type ?? '')
const familyLabel = computed(() => props.selectedFamily?.label ?? familyKey.value)

// ============================================================
// STATE
// ============================================================
const searchQuery = ref('')
const editingType = ref<unknown>(null)
const savingType = ref(false)
const editTab = ref('basic')
const expandedTypeId = ref<number | null>(null)

const newType = ref(emptyType())
const newField = ref('')
const newAllowedResponse = ref('')
const newAllowedTransformation = ref('')
const newAllowedOptionType = ref('')

function emptyType() {
  return {
    inquiry_type: '',
    label: '',
    family: familyKey.value,
    icon: null as unknown,
    description: '',
    fields: [] as string[],
    allowed_response: [] as string[],
    allowed_transformation: [] as string[],
    allowed_option_type: [] as string[],
  }
}

// ============================================================
// ICONS
// ============================================================
const availableIcons = computed(() =>
  Object.keys(InquiryGeneralIcons)
    .filter((key) => key !== 'default')
    .map((iconId) => ({
      id: iconId,
      label: t('agora', iconId.replace(/([A-Z])/g, ' $1').trim()),
    })),
)

const getIconComponent = (iconName: unknown) => {
  const id = typeof iconName === 'object' ? iconName?.id : iconName
  return InquiryGeneralIcons[id] || InquiryGeneralIcons.default
}

const findIconById = (iconId: unknown) => {
  if (!iconId) return null
  if (typeof iconId === 'object') return iconId
  return availableIcons.value.find((i) => i.id === iconId) || null
}

const extractIconId = (icon: unknown) => {
  if (!icon) return ''
  if (typeof icon === 'string') return icon
  if (typeof icon === 'object') return icon.id || ''
  return String(icon)
}

// ============================================================
// NORMALIZATION
// ============================================================
const normalizeArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'string' ? v : (v?.key ?? String(v))))
  }
  if (typeof value === 'string' && value) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed)
        ? parsed.map((v) => (typeof v === 'string' ? v : (v?.key ?? String(v))))
        : []
    } catch {
      return []
    }
  }
  return []
}

// ============================================================
// COMPUTED
// ============================================================
const allTypes = computed<unknown[]>(() => appSettingsStore.inquiryTypeTab ?? [])

const familyTypes = computed(() =>
  familyKey.value
    ? allTypes.value.filter((type: unknown) => type.family === familyKey.value)
    : allTypes.value,
)

const filteredTypes = computed(() => {
  let list = familyTypes.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (type: unknown) =>
        type.inquiry_type?.toLowerCase().includes(q) ||
        type.label?.toLowerCase().includes(q) ||
        type.description?.toLowerCase().includes(q),
    )
  }
  return list.map((type: unknown) => ({
    ...type,
    fields: normalizeArray(type.fields),
    allowed_response: normalizeArray(type.allowed_response),
    allowed_transformation: normalizeArray(type.allowed_transformation),
    allowed_option_type: normalizeArray(type.allowed_option_type),
  }))
})

/** All inquiry group types attached to the current family */
const groupTypesInFamily = computed<unknown[]>(() => {
  const all = appSettingsStore.inquiryGroupTypeTab ?? []
  if (!familyKey.value) return all
  return all.filter((gt: unknown) => gt.family === familyKey.value)
})

/**
 * How munknown group types reference a given inquiry type
 * @param inquiryType
 */
const getUsageCount = (inquiryType: string): number =>
  groupTypesInFamily.value.filter((gt: unknown) =>
    normalizeArray(gt.allowed_inquiry_types).includes(inquiryType),
  ).length

// ============================================================
// VALIDATION
// ============================================================
const validateType = (type: unknown, isEdit = false) => {
  if (!type.inquiry_type?.trim()) {
    showError(t('agora', 'Inquiry type key is mandatory'))
    return false
  }
  if (!/^[a-z][a-z0-9_]*$/i.test(type.inquiry_type)) {
    showError(
      t('agora', 'Inquiry type key must be alphanumeric (underscores allowed), starting with a letter'),
    )
    return false
  }
  if (!type.label?.trim()) {
    showError(t('agora', 'Label is mandatory'))
    return false
  }
  if (!isEdit) {
    const exists = allTypes.value.some(
      (existing: unknown) => existing.inquiry_type === type.inquiry_type,
    )
    if (exists) {
      showError(t('agora', 'An inquiry type with this key already exists'))
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
    await appSettingsStore.addInquiryType({
      ...newType.value,
      family: familyKey.value,
      created: Date.now(),
      icon: extractIconId(newType.value.icon),
      description: newType.value.description || '',
      fields: JSON.stringify(newType.value.fields),
      allowed_response: JSON.stringify(newType.value.allowed_response),
      allowed_transformation: JSON.stringify(newType.value.allowed_transformation),
      allowed_option_type: JSON.stringify(newType.value.allowed_option_type),
    })
    showSuccess(t('agora', 'Inquiry type added'))
    newType.value = emptyType()
  } catch (e: unknown) {
    showError(t('agora', 'Failed to add inquiry type: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingType.value = false
  }
}

const startEditing = (type: unknown) => {
  editingType.value = {
    ...JSON.parse(JSON.stringify(type)),
    icon: findIconById(type.icon),
    fields: normalizeArray(type.fields),
    allowed_response: normalizeArray(type.allowed_response),
    allowed_transformation: normalizeArray(type.allowed_transformation),
    allowed_option_type: normalizeArray(type.allowed_option_type),
  }
  editTab.value = 'basic'
}

const cancelEditing = () => {
  editingType.value = null
  editTab.value = 'basic'
}

const updateType = async (type: unknown) => {
  if (!type || !validateType(type, true)) return
  savingType.value = true
  try {
    await appSettingsStore.updateInquiryType(type.id, {
      ...type,
      family: familyKey.value,
      icon: extractIconId(type.icon),
      fields: JSON.stringify(type.fields),
      allowed_response: JSON.stringify(type.allowed_response),
      allowed_transformation: JSON.stringify(type.allowed_transformation),
      allowed_option_type: JSON.stringify(type.allowed_option_type),
    })
    showSuccess(t('agora', 'Inquiry type updated'))
    editingType.value = null
  } catch (e: unknown) {
    showError(t('agora', 'Failed to update inquiry type: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingType.value = false
  }
}

const deleteType = async (type: unknown) => {
  if (
    !confirm(
      t('agora', 'Are you sure you want to delete the inquiry type "{label}"?', {
        label: type.label || type.inquiry_type,
      }),
    )
  ) {
    return
  }
  try {
    await appSettingsStore.deleteType(type.id)
    showSuccess(t('agora', 'Inquiry type deleted'))
  } catch (e: unknown) {
    showError(t('agora', 'Failed to delete inquiry type: {msg}', { msg: e?.message ?? '' }))
  }
}

const toggleExpand = (id: number) => {
  expandedTypeId.value = expandedTypeId.value === id ? null : id
}

// ============================================================
// ARRAY FIELD MANAGEMENT
// ============================================================
type ArrayKey = 'fields' | 'allowed_response' | 'allowed_transformation' | 'allowed_option_type'

const addArrayItem = (target: 'new' | 'edit', key: ArrayKey, value: string) => {
  const val = value?.trim()
  if (!val) return
  const arr = target === 'new' ? (newType.value as unknown)[key] : (editingType.value as unknown)[key]
  if (!arr.includes(val)) arr.push(val)
}

const removeArrayItem = (target: 'new' | 'edit', key: ArrayKey, index: number) => {
  const arr = target === 'new' ? (newType.value as unknown)[key] : (editingType.value as unknown)[key]
  arr.splice(index, 1)
}

const addField = (target: 'new' | 'edit') => {
  addArrayItem(target, 'fields', newField.value)
  newField.value = ''
}
const removeField = (target: 'new' | 'edit', index: number) =>
  removeArrayItem(target, 'fields', index)

const addAllowedResponse = (target: 'new' | 'edit') => {
  addArrayItem(target, 'allowed_response', newAllowedResponse.value)
  newAllowedResponse.value = ''
}
const removeAllowedResponse = (target: 'new' | 'edit', index: number) =>
  removeArrayItem(target, 'allowed_response', index)

const addAllowedTransformation = (target: 'new' | 'edit') => {
  addArrayItem(target, 'allowed_transformation', newAllowedTransformation.value)
  newAllowedTransformation.value = ''
}
const removeAllowedTransformation = (target: 'new' | 'edit', index: number) =>
  removeArrayItem(target, 'allowed_transformation', index)

const addAllowedOptionType = (target: 'new' | 'edit') => {
  addArrayItem(target, 'allowed_option_type', newAllowedOptionType.value)
  newAllowedOptionType.value = ''
}
const removeAllowedOptionType = (target: 'new' | 'edit', index: number) =>
  removeArrayItem(target, 'allowed_option_type', index)
</script>

<template>
  <div class="inquiry-types-manager">
    <!-- ==================== HEADER ==================== -->
    <header class="manager-header">
      <div class="header-text">
        <NcButton class="back-btn" @click="emit('backToFamilies')">
          ← {{ t('agora', 'Back to families') }}
        </NcButton>
        <h2>
          {{ t('agora', 'Inquiry types — {family}', { family: familyLabel }) }}
        </h2>
        <p class="description">
          {{
            t(
              'agora',
              'Configure inquiry types available in the "{family}" family (fields, allowed responses, transformations and option types).',
              { family: familyLabel },
            )
          }}
        </p>
      </div>

      <div class="header-actions">
        <div class="family-stats">
          <div class="stat-block">
            <span class="stat-value">{{ filteredTypes.length }}</span>
            <span class="stat-label">{{ t('agora', 'inquiry types') }}</span>
          </div>
          <div class="stat-block accent">
            <span class="stat-value">{{ groupTypesInFamily.length }}</span>
            <span class="stat-label">{{ t('agora', 'group types') }}</span>
          </div>
        </div>
        <NcInputField
          v-model="searchQuery"
          type="text"
          :label="t('agora', 'Search')"
          :label-outside="true"
          :placeholder="t('agora', 'Search inquiry types…')"
          class="search-field"
        />
      </div>
    </header>

    <!-- ==================== EXISTING TYPES ==================== -->
    <section class="types-list">
      <h3>
        {{ t('agora', 'Existing inquiry types') }}
        <span class="count-badge">{{ filteredTypes.length }}</span>
      </h3>

      <div v-if="!filteredTypes.length" class="empty-state">
        {{ t('agora', 'No inquiry types match your filters.') }}
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
              <h4>{{ type.label || type.inquiry_type }}</h4>
              <code class="type-key">{{ type.inquiry_type }}</code>
              <span class="family-badge">{{ type.family }}</span>
              <span
                v-if="getUsageCount(type.inquiry_type) > 0"
                class="usage-badge"
                :title="
                  t('agora', 'Used by {count} group type(s) in this family', {
                    count: getUsageCount(type.inquiry_type),
                  })
                "
              >
                {{ t('agora', '{n} groups', { n: getUsageCount(type.inquiry_type) }) }}
              </span>
            </div>
            <p v-if="type.description" class="type-description">{{ type.description }}</p>
            <div class="type-stats">
              <span class="stat-chip">
                {{ t('agora', '{count} fields', { count: type.fields.length }) }}
              </span>
              <span v-if="type.allowed_response.length" class="stat-chip">
                {{ t('agora', '{count} responses', { count: type.allowed_response.length }) }}
              </span>
              <span v-if="type.allowed_transformation.length" class="stat-chip">
                {{
                  t('agora', '{count} transformations', {
                    count: type.allowed_transformation.length,
                  })
                }}
              </span>
              <span v-if="type.allowed_option_type.length" class="stat-chip">
                {{
                  t('agora', '{count} option types', { count: type.allowed_option_type.length })
                }}
              </span>
            </div>
          </div>

          <div class="type-actions" @click.stop>
            <NcButton @click="toggleExpand(type.id)">
              {{ expandedTypeId === type.id ? t('agora', 'Hide') : t('agora', 'Details') }}
            </NcButton>
            <NcButton type="primary" @click="emit('typeSelected', type)">
              {{ t('agora', 'Configure') }}
            </NcButton>
            <NcButton @click="startEditing(type)">{{ t('agora', 'Edit') }}</NcButton>
            <NcButton type="error" @click="deleteType(type)">
              {{ t('agora', 'Delete') }}
            </NcButton>
          </div>
        </div>

        <!-- ============ EXPANDED DETAILS ============ -->
        <div v-if="expandedTypeId === type.id" class="type-details">
          <div class="detail-section">
            <h5>{{ t('agora', 'Fields') }}</h5>
            <ul class="pill-list">
              <li v-for="(f, i) in type.fields" :key="i" class="pill">{{ f }}</li>
              <li v-if="!type.fields.length" class="muted">{{ t('agora', 'None') }}</li>
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
            <h5>{{ t('agora', 'Allowed transformations') }}</h5>
            <ul class="pill-list">
              <li v-for="(r, i) in type.allowed_transformation" :key="i" class="pill">{{ r }}</li>
              <li v-if="!type.allowed_transformation.length" class="muted">
                {{ t('agora', 'None') }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h5>{{ t('agora', 'Allowed option types') }}</h5>
            <ul class="pill-list">
              <li v-for="(r, i) in type.allowed_option_type" :key="i" class="pill">{{ r }}</li>
              <li v-if="!type.allowed_option_type.length" class="muted">
                {{ t('agora', 'None') }}
              </li>
            </ul>
          </div>

          <div class="detail-section full-width">
            <h5>{{ t('agora', 'Used by group types') }}</h5>
            <ul class="pill-list">
              <li
                v-for="gt in groupTypesInFamily.filter((g) =>
                  normalizeArray(g.allowed_inquiry_types).includes(type.inquiry_type),
                )"
                :key="gt.id"
                class="pill group-pill"
              >
                {{ gt.label || gt.group_type }}
              </li>
              <li
                v-if="
                  !groupTypesInFamily.some((g) =>
                    normalizeArray(g.allowed_inquiry_types).includes(type.inquiry_type),
                  )
                "
                class="muted"
              >
                {{ t('agora', 'No group types reference this inquiry type yet') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== ADD NEW TYPE ==================== -->
    <section class="add-type-form">
      <h3>{{ t('agora', 'Add new inquiry type to {family}', { family: familyLabel }) }}</h3>

      <div class="form-grid">
        <NcInputField
          v-model="newType.inquiry_type"
          :label="t('agora', 'Type key')"
          :placeholder="t('agora', 'e.g., petition')"
          required
        />
        <NcInputField
          :model-value="familyLabel"
          :label="t('agora', 'Family')"
          disabled
          readonly
        />
        <NcInputField
          v-model="newType.label"
          :label="t('agora', 'Display label')"
          :placeholder="t('agora', 'e.g., Public petition')"
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

        <NcInputField
          v-model="newType.description"
          :label="t('agora', 'Description')"
          type="textarea"
          class="full-width"
        />

        <!-- FIELDS -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Fields') }}</label>
          <div class="inline-editor">
            <NcInputField
              v-model="newField"
              :label="t('agora', 'Field key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., deadline')"
              @keydown.enter.prevent="addField('new')"
            />
            <NcButton type="secondary" @click="addField('new')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(f, i) in newType.fields"
              :key="i"
              class="pill removable"
              @click="removeField('new', i)"
            >
              {{ f }} ✕
            </span>
            <span v-if="!newType.fields.length" class="muted">
              {{ t('agora', 'No fields added yet') }}
            </span>
          </div>
        </div>

        <!-- ALLOWED RESPONSES -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Allowed responses') }}</label>
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedResponse"
              :label="t('agora', 'Response key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., comment')"
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
            <span v-if="!newType.allowed_response.length" class="muted">
              {{ t('agora', 'None') }}
            </span>
          </div>
        </div>

        <!-- ALLOWED TRANSFORMATIONS -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Allowed transformations') }}</label>
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedTransformation"
              :label="t('agora', 'Transformation key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., official_proposal')"
              @keydown.enter.prevent="addAllowedTransformation('new')"
            />
            <NcButton type="secondary" @click="addAllowedTransformation('new')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in newType.allowed_transformation"
              :key="i"
              class="pill removable"
              @click="removeAllowedTransformation('new', i)"
            >
              {{ r }} ✕
            </span>
            <span v-if="!newType.allowed_transformation.length" class="muted">
              {{ t('agora', 'None') }}
            </span>
          </div>
        </div>

        <!-- ALLOWED OPTION TYPES -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Allowed option types') }}</label>
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedOptionType"
              :label="t('agora', 'Option type key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., argument_for')"
              @keydown.enter.prevent="addAllowedOptionType('new')"
            />
            <NcButton type="secondary" @click="addAllowedOptionType('new')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in newType.allowed_option_type"
              :key="i"
              class="pill removable"
              @click="removeAllowedOptionType('new', i)"
            >
              {{ r }} ✕
            </span>
            <span v-if="!newType.allowed_option_type.length" class="muted">
              {{ t('agora', 'None') }}
            </span>
          </div>
        </div>

        <div class="form-actions full-width">
          <NcButton
            type="primary"
            :disabled="savingType || !newType.inquiry_type || !newType.label || !familyKey"
            @click="addType"
          >
            <NcLoadingIcon v-if="savingType" :size="16" />
            <span v-else>{{ t('agora', 'Add inquiry type') }}</span>
          </NcButton>
        </div>
      </div>
    </section>

    <!-- ==================== EDIT MODAL ==================== -->
    <div v-if="editingType" class="modal-overlay" @click.self="cancelEditing">
      <div class="modal-content large-modal">
        <header class="modal-header">
          <h3>{{ t('agora', 'Edit inquiry type') }}: {{ editingType.label }}</h3>
          <NcButton type="tertiary" @click="cancelEditing">✕</NcButton>
        </header>

        <nav class="tabs">
          <button
            v-for="tab in ['basic', 'fields', 'responses', 'transformations', 'option-types']"
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
          <NcInputField
            v-model="editingType.inquiry_type"
            :label="t('agora', 'Type key')"
            required
          />
          <NcInputField
            :model-value="familyLabel"
            :label="t('agora', 'Family')"
            disabled
            readonly
          />
          <NcInputField v-model="editingType.label" :label="t('agora', 'Display label')" required />
          <NcSelect
            v-model="editingType.icon"
            :input-label="t('agora', 'Icon')"
            :label-outside="true"
            :options="availableIcons"
            label="label"
            track-by="id"
            :clearable="false"
          />
          <NcInputField
            v-model="editingType.description"
            :label="t('agora', 'Description')"
            type="textarea"
            class="full-width"
          />
        </div>

        <!-- FIELDS -->
        <div v-if="editTab === 'fields'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
              v-model="newField"
              :label="t('agora', 'Field key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., deadline')"
              @keydown.enter.prevent="addField('edit')"
            />
            <NcButton type="secondary" @click="addField('edit')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(f, i) in editingType.fields"
              :key="i"
              class="pill removable"
              @click="removeField('edit', i)"
            >
              {{ f }} ✕
            </span>
            <span v-if="!editingType.fields.length" class="muted">
              {{ t('agora', 'No fields added yet') }}
            </span>
          </div>
        </div>

        <!-- RESPONSES -->
        <div v-if="editTab === 'responses'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedResponse"
              :label="t('agora', 'Response key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., comment')"
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
            <span v-if="!editingType.allowed_response.length" class="muted">
              {{ t('agora', 'None') }}
            </span>
          </div>
        </div>

        <!-- TRANSFORMATIONS -->
        <div v-if="editTab === 'transformations'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedTransformation"
              :label="t('agora', 'Transformation key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., official_proposal')"
              @keydown.enter.prevent="addAllowedTransformation('edit')"
            />
            <NcButton type="secondary" @click="addAllowedTransformation('edit')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in editingType.allowed_transformation"
              :key="i"
              class="pill removable"
              @click="removeAllowedTransformation('edit', i)"
            >
              {{ r }} ✕
            </span>
            <span v-if="!editingType.allowed_transformation.length" class="muted">
              {{ t('agora', 'None') }}
            </span>
          </div>
        </div>

        <!-- OPTION TYPES -->
        <div v-if="editTab === 'option-types'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
              v-model="newAllowedOptionType"
              :label="t('agora', 'Option type key')"
              :label-outside="true"
              :placeholder="t('agora', 'e.g., argument_for')"
              @keydown.enter.prevent="addAllowedOptionType('edit')"
            />
            <NcButton type="secondary" @click="addAllowedOptionType('edit')">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(r, i) in editingType.allowed_option_type"
              :key="i"
              class="pill removable"
              @click="removeAllowedOptionType('edit', i)"
            >
              {{ r }} ✕
            </span>
            <span v-if="!editingType.allowed_option_type.length" class="muted">
              {{ t('agora', 'None') }}
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
</template>

<style scoped>
.inquiry-types-manager {
  padding: 20px;
  max-width: 1200px;
}

/* ============ HEADER ============ */
.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.header-text {
  flex: 1;
  min-width: 280px;
}

.back-btn {
  margin-bottom: 12px;
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
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.family-stats {
  display: flex;
  gap: 10px;
}

.stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  padding: 8px 14px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.stat-block.accent {
  background: var(--color-primary-element-light);
  border-color: var(--color-primary-element);
}

.stat-value {
  font-size: 1.5em;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.1;
}

.stat-block.accent .stat-value {
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.72em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-lighter);
}

.search-field {
  width: 240px;
}

/* ============ TYPES LIST ============ */
.types-list {
  margin-bottom: 40px;
}

.count-badge {
  font-size: 0.8em;
  background: var(--color-primary-element-light);
  color: var(--color-primary);
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
}

.type-card {
  background: var(--color-background-dark);
  border-radius: 12px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: background 0.2s;
  border: 2px solid transparent;
}

.type-card:hover {
  background: var(--color-background-hover);
}

.type-card.expanded {
  border-color: var(--color-primary-element);
}

.type-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  cursor: pointer;
}

.type-icon {
  width: 44px;
  height: 44px;
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

.usage-badge {
  font-size: 0.72em;
  background: var(--color-success, #2ecc71);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
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

.type-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* ============ DETAILS ============ */
.type-details {
  padding: 0 16px 20px 70px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.detail-section h5 {
  margin: 0 0 8px 0;
  color: var(--color-text-lighter);
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.group-pill {
  background: var(--color-success, #2ecc71) !important;
  color: white !important;
}

/* ============ ADD FORM ============ */
.add-type-form {
  padding: 24px;
  background: var(--color-background-dark);
  border-radius: 12px;
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
  min-width: 140px;
}

.inline-editor :deep(.button-vue) {
  flex: 0 0 auto;
}

/* ============ PILLS ============ */
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

/* ============ MODAL ============ */
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

.modal-content.large-modal {
  width: 1000px;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}
</style>
