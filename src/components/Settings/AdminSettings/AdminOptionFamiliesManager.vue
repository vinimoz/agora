<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcInputField from '@nextcloud/vue/components/NcInputField'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { useAppSettingsStore } from '../../../stores/appSettings.ts'
import { InquiryOptionIcons } from '../../../utils/icons.ts'

const emit = defineEmits(['familySelected'])
const appSettingsStore = useAppSettingsStore()

// ============================================================
// STATE
// ============================================================
const editingFamily = ref(null)
const savingFamily = ref(false)
const searchQuery = ref('')
const expandedFamilyId = ref(null)
const editTab = ref('basic') // basic | ui | rules | features | actions

const emptyFamily = () => ({
  family_type: '',
  label: '',
  description: '',
  icon: null,
  sort_order: appSettingsStore.optionFamilyTab?.length ?? 0,
  ui: {},
  rules: {},
  features: [],
  actions: [],
})

const newFamily = ref(emptyFamily())
const newFeature = ref('')
const newAction = ref({ key: '', label: '', icon: '' })

// ============================================================
// ICONS
// ============================================================
const availableIcons = computed(() =>
  Object.keys(InquiryOptionIcons)
    .filter((key) => key !== 'default')
    .map((iconId) => ({
      id: iconId,
      label: t('agora', iconId.replace(/([A-Z])/g, ' $1').trim()),
    })),
)

const findIconById = (iconId) => {
  if (!iconId) return null
  if (typeof iconId === 'object') return iconId
  return availableIcons.value.find((icon) => icon.id === iconId) || null
}

const getIconComponent = (iconName) => {
  const id = typeof iconName === 'object' ? iconName?.id : iconName
  return InquiryOptionIcons[id] || InquiryOptionIcons.default
}

const extractIconId = (icon) => {
  if (!icon) return ''
  if (typeof icon === 'string') return icon
  if (typeof icon === 'object') return icon.id || ''
  return String(icon)
}

// ============================================================
// COMPUTED
// ============================================================
const familiesWithStats = computed(() => {
  const families = appSettingsStore.optionFamilyTab ?? []
  return families.map((family) => {
    const typesCount = (appSettingsStore.optionTypeTab ?? []).filter(
      (type) => type.family === family.family_type,
    ).length

    let parsedUi = family.ui
    let parsedRules = family.rules
    let parsedFeatures = family.features
    let parsedActions = family.actions

    try {
      if (typeof parsedUi === 'string') parsedUi = JSON.parse(parsedUi || '{}')
      if (typeof parsedRules === 'string') parsedRules = JSON.parse(parsedRules || '{}')
      if (typeof parsedFeatures === 'string') parsedFeatures = JSON.parse(parsedFeatures || '[]')
      if (typeof parsedActions === 'string') parsedActions = JSON.parse(parsedActions || '[]')
    } catch (e) {
      // keep raw
    }

    return {
      ...family,
      typesCount,
      parsedUi,
      parsedRules,
      parsedFeatures: Array.isArray(parsedFeatures) ? parsedFeatures : [],
      parsedActions: Array.isArray(parsedActions) ? parsedActions : [],
    }
  })
})

const filteredFamilies = computed(() => {
  if (!searchQuery.value.trim()) return familiesWithStats.value
  const q = searchQuery.value.toLowerCase()
  return familiesWithStats.value.filter(
    (f) =>
      f.family_type?.toLowerCase().includes(q) ||
      f.label?.toLowerCase().includes(q) ||
      f.description?.toLowerCase().includes(q),
  )
})

// ============================================================
// HELPERS
// ============================================================
const normalizeJsonField = (value, fallback) => {
  if (value === null || value === undefined || value === '') return fallback
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

// ============================================================
// ACTIONS
// ============================================================
const startEditing = (family) => {
  editingFamily.value = {
    ...deepClone(family),
    icon: findIconById(family.icon),
    ui: normalizeJsonField(family.ui, {}),
    rules: normalizeJsonField(family.rules, {}),
    features: normalizeJsonField(family.features, []),
    actions: normalizeJsonField(family.actions, []),
  }
  editTab.value = 'basic'
}

const cancelEditing = () => {
  editingFamily.value = null
  editTab.value = 'basic'
}

const validateFamily = (family, isEdit = false) => {
  if (!family.family_type?.trim()) {
    showError(t('agora', 'Family type key is mandatory'))
    return false
  }
  if (!family.label?.trim()) {
    showError(t('agora', 'Display label is mandatory'))
    return false
  }
  if (!/^[a-z][a-z0-9_]*$/i.test(family.family_type)) {
    showError(t('agora', 'Family type key must be alphanumeric (underscores allowed), starting with a letter'))
    return false
  }
  if (!isEdit) {
    const exists = (appSettingsStore.optionFamilyTab ?? []).some(
      (f) => f.family_type === family.family_type,
    )
    if (exists) {
      showError(t('agora', 'A family with this key already exists'))
      return false
    }
  }
  return true
}

const addFamily = async () => {
  if (!validateFamily(newFamily.value, false)) return
  savingFamily.value = true
  try {
    await appSettingsStore.addOptionFamily({
      ...newFamily.value,
      icon: extractIconId(newFamily.value.icon),
      created: Date.now(),
    })
    showSuccess(t('agora', 'Family added'))
    newFamily.value = emptyFamily()
  } catch (e) {
    showError(t('agora', 'Failed to add family: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingFamily.value = false
  }
}

const updateFamily = async (family) => {
  if (!family) return
  if (!validateFamily(family, true)) return
  savingFamily.value = true
  try {
    await appSettingsStore.updateOptionFamily(family.id, {
      ...family,
      icon: extractIconId(family.icon),
      ui: normalizeJsonField(family.ui, {}),
      rules: normalizeJsonField(family.rules, {}),
      features: normalizeJsonField(family.features, []),
      actions: normalizeJsonField(family.actions, []),
    })
    showSuccess(t('agora', 'Family updated'))
    editingFamily.value = null
  } catch (e) {
    showError(t('agora', 'Failed to update family: {msg}', { msg: e?.message ?? '' }))
  } finally {
    savingFamily.value = false
  }
}

const deleteFamily = async (family) => {
  const typesCount = family.typesCount ?? 0
  const message =
    typesCount > 0
      ? t('agora', 'This family contains {count} option types. Delete anyway?', { count: typesCount })
      : t('agora', 'Are you sure you want to delete this family?')
  if (!confirm(message)) return
  try {
    await appSettingsStore.deleteOptionFamily(family.id)
    showSuccess(t('agora', 'Family deleted'))
    if (expandedFamilyId.value === family.id) expandedFamilyId.value = null
  } catch (e) {
    showError(t('agora', 'Failed to delete family: {msg}', { msg: e?.message ?? '' }))
  }
}

const selectFamily = (family) => {
  emit('familySelected', family)
}

const toggleExpand = (familyId) => {
  expandedFamilyId.value = expandedFamilyId.value === familyId ? null : familyId
}

// ============================================================
// FEATURE / ACTION LIST MANAGEMENT
// ============================================================
const addFeature = () => {
  const value = newFeature.value?.trim()
  if (!value) return
  if (!Array.isArray(editingFamily.value.features)) editingFamily.value.features = []
  if (editingFamily.value.features.includes(value)) {
    showError(t('agora', 'Feature already present'))
    return
  }
  editingFamily.value.features.push(value)
  newFeature.value = ''
}

const removeFeature = (index) => {
  editingFamily.value.features.splice(index, 1)
}

const addAction = () => {
  const { key, label, icon } = newAction.value
  if (!key?.trim() || !label?.trim()) {
    showError(t('agora', 'Action key and label are required'))
    return
  }
  if (!Array.isArray(editingFamily.value.actions)) editingFamily.value.actions = []
  editingFamily.value.actions.push({
    key: key.trim(),
    label: label.trim(),
    icon: icon?.trim() || '',
  })
  newAction.value = { key: '', label: '', icon: '' }
}

const removeAction = (index) => {
  editingFamily.value.actions.splice(index, 1)
}

const addNewFamilyFeature = () => {
  const value = newFeature.value?.trim()
  if (!value) return
  if (!Array.isArray(newFamily.value.features)) newFamily.value.features = []
  if (!newFamily.value.features.includes(value)) {
    newFamily.value.features.push(value)
  }
  newFeature.value = ''
}

const removeNewFamilyFeature = (index) => {
  newFamily.value.features.splice(index, 1)
}

const addNewFamilyAction = () => {
  const { key, label, icon } = newAction.value
  if (!key?.trim() || !label?.trim()) {
    showError(t('agora', 'Action key and label are required'))
    return
  }
  if (!Array.isArray(newFamily.value.actions)) newFamily.value.actions = []
  newFamily.value.actions.push({ key: key.trim(), label: label.trim(), icon: icon?.trim() || '' })
  newAction.value = { key: '', label: '', icon: '' }
}

const removeNewFamilyAction = (index) => {
  newFamily.value.actions.splice(index, 1)
}

watch(
  () => appSettingsStore.optionFamilyTab,
  () => {
    // Keep computed lists reactive
  },
  { deep: true },
)
</script>

<template>
  <div class="option-families-manager">
    <header class="manager-header">
      <div>
        <h2>{{ t('agora', 'Option families management') }}</h2>
        <p class="description">
          {{
            t(
              'agora',
              'Manage option families that group different types of options (e.g., debate, vote, proposal). Each family defines layout, rules, features and actions shared by its option types.',
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
  :placeholder="t('agora', 'Filter families…')"
  class="search-field"
/>

      </div>
    </header>

    <!-- ==================== EXISTING FAMILIES ==================== -->
    <section class="families-list">
      <h3>
        {{ t('agora', 'Existing families') }}
        <span class="count-badge">{{ filteredFamilies.length }}</span>
      </h3>

      <div v-if="!filteredFamilies.length" class="empty-state">
        {{ t('agora', 'No families found.') }}
      </div>

      <div
        v-for="family in filteredFamilies"
        :key="family.id"
        class="family-card"
        :class="{ expanded: expandedFamilyId === family.id }"
      >
        <div class="family-row" @click="selectFamily(family)">
          <div class="family-icon">
            <component :is="getIconComponent(family.icon)" :size="22" />
          </div>

          <div class="family-info">
            <div class="family-title-row">
              <h4>{{ family.label || family.family_type }}</h4>
              <code class="family-type">{{ family.family_type }}</code>
            </div>
            <p v-if="family.description" class="family-description">
              {{ family.description }}
            </p>
            <div class="family-stats">
              <span class="stat-chip types">
                {{ t('agora', '{count} types', { count: family.typesCount }) }}
              </span>
              <span v-if="family.parsedFeatures?.length" class="stat-chip">
                {{ t('agora', '{count} features', { count: family.parsedFeatures.length }) }}
              </span>
              <span v-if="family.parsedActions?.length" class="stat-chip">
                {{ t('agora', '{count} actions', { count: family.parsedActions.length }) }}
              </span>
              <span v-if="family.parsedUi?.layout" class="stat-chip layout">
                {{ t('agora', 'layout: {layout}', { layout: family.parsedUi.layout }) }}
              </span>
            </div>
          </div>

          <div class="family-actions" @click.stop>
            <NcButton
              :aria-label="t('agora', 'Show details')"
              @click="toggleExpand(family.id)"
            >
              {{ expandedFamilyId === family.id ? t('agora', 'Hide') : t('agora', 'Details') }}
            </NcButton>
            <NcButton @click="startEditing(family)">
              {{ t('agora', 'Edit') }}
            </NcButton>
            <NcButton type="error" @click="deleteFamily(family)">
              {{ t('agora', 'Delete') }}
            </NcButton>
          </div>
        </div>

        <!-- Expanded details -->
        <div v-if="expandedFamilyId === family.id" class="family-details">
          <div class="detail-section">
            <h5>{{ t('agora', 'UI') }}</h5>
            <pre>{{ JSON.stringify(family.parsedUi, null, 2) }}</pre>
          </div>
          <div class="detail-section">
            <h5>{{ t('agora', 'Rules') }}</h5>
            <pre>{{ JSON.stringify(family.parsedRules, null, 2) }}</pre>
          </div>
          <div class="detail-section">
            <h5>{{ t('agora', 'Features') }}</h5>
            <ul class="pill-list">
              <li v-for="(f, i) in family.parsedFeatures" :key="i" class="pill">{{ f }}</li>
              <li v-if="!family.parsedFeatures?.length" class="muted">
                {{ t('agora', 'None') }}
              </li>
            </ul>
          </div>
          <div class="detail-section">
            <h5>{{ t('agora', 'Actions') }}</h5>
            <ul class="action-list">
              <li v-for="(a, i) in family.parsedActions" :key="i">
                <code>{{ a.key }}</code> — {{ a.label }}
                <span v-if="a.icon" class="muted"> ({{ a.icon }})</span>
              </li>
              <li v-if="!family.parsedActions?.length" class="muted">
                {{ t('agora', 'None') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== ADD NEW FAMILY ==================== -->
    <section class="add-family-form">
      <h3>{{ t('agora', 'Add new family') }}</h3>

      <div class="form-grid">
        <NcInputField
          v-model="newFamily.family_type"
          :label="t('agora', 'Family type key')"
          :placeholder="t('agora', 'E.g., debate, vote, proposal')"
          required
          class="form-field"
        />

        <NcInputField
          v-model="newFamily.label"
          :label="t('agora', 'Display label')"
          :placeholder="t('agora', 'E.g., Debate options')"
          required
          class="form-field"
        />
<NcSelect
  v-model="newFamily.icon"
  :input-label="t('agora', 'Icon')"
  :label-outside="true"
  :options="availableIcons"
  track-by="id"
  :clearable="false"
  :placeholder="t('agora', 'Select an icon')"
  class="form-field"
/>

        <NcInputField
          v-model="newFamily.sort_order"
          :label="t('agora', 'Sort order')"
          type="number"
          :min="0"
          class="form-field"
        />

        <NcInputField
          v-model="newFamily.description"
          :label="t('agora', 'Description')"
          :placeholder="t('agora', 'Optional description')"
          type="textarea"
          class="full-width"
        />

        <!-- Features inline editor -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Features') }}</label>
          <div class="inline-editor">
            <NcInputField
  v-model="newFeature"
  :label="t('agora', 'Feature')"
  :label-outside="true"
  :placeholder="t('agora', 'e.g., argument_rating')"
  class="inline-input"
  @keydown.enter.prevent="addNewFamilyFeature"
/>
		  <NcButton type="secondary" @click="addNewFamilyFeature">
              {{ t('agora', 'Add') }}
            </NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(f, i) in newFamily.features"
              :key="i"
              class="pill removable"
              @click="removeNewFamilyFeature(i)"
            >
              {{ f }} ✕
            </span>
          </div>
        </div>

        <!-- Actions inline editor -->
        <div class="full-width">
          <label class="field-label">{{ t('agora', 'Actions') }}</label>
          <div class="inline-editor action-editor">
            <NcInputField
  v-model="newAction.key"
  :label="t('agora', 'Action key')"
  :label-outside="true"
  :placeholder="t('agora', 'key (e.g., export_thread)')"
/>
<NcInputField
  v-model="newAction.label"
  :label="t('agora', 'Action label')"
  :label-outside="true"
  :placeholder="t('agora', 'Label')"
/>
<NcInputField
  v-model="newAction.icon"
  :label="t('agora', 'Action icon')"
  :label-outside="true"
  :placeholder="t('agora', 'Icon name')"
/>
		  <NcButton type="secondary" @click="addNewFamilyAction">
              {{ t('agora', 'Add action') }}
            </NcButton>
          </div>
          <ul class="action-list">
            <li v-for="(a, i) in newFamily.actions" :key="i">
              <code>{{ a.key }}</code> — {{ a.label }}
              <NcButton type="tertiary" @click="removeNewFamilyAction(i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <div class="form-actions full-width">
          <NcButton
            type="primary"
            :disabled="
              savingFamily ||
              !newFamily.family_type ||
              !newFamily.label
            "
            @click="addFamily"
          >
            <NcLoadingIcon v-if="savingFamily" :size="16" />
            <span v-else>{{ t('agora', 'Add family') }}</span>
          </NcButton>
        </div>
      </div>
    </section>

    <!-- ==================== EDIT FAMILY MODAL ==================== -->
    <div v-if="editingFamily" class="modal-overlay" @click.self="cancelEditing">
      <div class="modal-content large-modal">
        <header class="modal-header">
          <h3>{{ t('agora', 'Edit family') }}: {{ editingFamily.label }}</h3>
          <NcButton type="tertiary" @click="cancelEditing">✕</NcButton>
        </header>

        <nav class="tabs">
          <button
            v-for="tab in ['basic', 'ui', 'rules', 'features', 'actions']"
            :key="tab"
            class="tab"
            :class="{ active: editTab === tab }"
            @click="editTab = tab"
          >
            {{ t('agora', tab) }}
          </button>
        </nav>

        <!-- BASIC TAB -->
        <div v-if="editTab === 'basic'" class="tab-panel form-grid">
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
          <NcInputField
            v-model="editingFamily.sort_order"
            :label="t('agora', 'Sort order')"
            type="number"
            :min="0"
            class="form-field"
          />
          <NcInputField
            v-model="editingFamily.description"
            :label="t('agora', 'Description')"
            type="textarea"
            class="full-width"
          />
        </div>

        <!-- UI TAB -->
        <div v-if="editTab === 'ui'" class="tab-panel">
          <p class="help-text">
            {{ t('agora', 'UI configuration as JSON. Defines the layout and display options for this family.') }}
          </p>
          <textarea
            v-model="editingFamily.uiRaw"
            class="json-editor"
            rows="12"
            @input="
              (e) => {
                try {
                  editingFamily.ui = JSON.parse(e.target.value)
                } catch (_) {
                  /* keep raw */
                }
              }
            "
          >{{ JSON.stringify(editingFamily.ui, null, 2) }}</textarea>
        </div>

        <!-- RULES TAB -->
        <div v-if="editTab === 'rules'" class="tab-panel">
          <p class="help-text">
            {{ t('agora', 'Rules configuration as JSON. Defines validation and behavior constraints.') }}
          </p>
          <textarea
            v-model="editingFamily.rulesRaw"
            class="json-editor"
            rows="12"
            @input="
              (e) => {
                try {
                  editingFamily.rules = JSON.parse(e.target.value)
                } catch (_) {
                  /* keep raw */
                }
              }
            "
          >{{ JSON.stringify(editingFamily.rules, null, 2) }}</textarea>
        </div>

        <!-- FEATURES TAB -->
        <div v-if="editTab === 'features'" class="tab-panel">
          <div class="inline-editor">
            <NcInputField
  v-model="newFeature"
  :label="t('agora', 'Feature')"
  :label-outside="true"
  :placeholder="t('agora', 'Feature identifier')"
  @keydown.enter.prevent="addFeature"
/>
		  <NcButton type="secondary" @click="addFeature">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <div class="pill-list">
            <span
              v-for="(f, i) in editingFamily.features"
              :key="i"
              class="pill removable"
              @click="removeFeature(i)"
            >
              {{ f }} ✕
            </span>
          </div>
        </div>

        <!-- ACTIONS TAB -->
        <div v-if="editTab === 'actions'" class="tab-panel">
          <div class="inline-editor action-editor">
		  <NcInputField v-model="newAction.key"   :label="t('agora', 'Action key')"   :label-outside="true" :placeholder="t('agora', 'key')" />
<NcInputField v-model="newAction.label" :label="t('agora', 'Action label')" :label-outside="true" :placeholder="t('agora', 'Label')" />
<NcInputField v-model="newAction.icon"  :label="t('agora', 'Action icon')"  :label-outside="true" :placeholder="t('agora', 'Icon')" />

            <NcButton type="secondary" @click="addAction">{{ t('agora', 'Add') }}</NcButton>
          </div>
          <ul class="action-list">
            <li v-for="(a, i) in editingFamily.actions" :key="i">
              <code>{{ a.key }}</code> — {{ a.label }}
              <NcButton type="tertiary" @click="removeAction(i)">✕</NcButton>
            </li>
          </ul>
        </div>

        <footer class="modal-actions">
          <NcButton @click="cancelEditing">{{ t('agora', 'Cancel') }}</NcButton>
          <NcButton
            type="primary"
            :disabled="savingFamily"
            @click="updateFamily(editingFamily)"
          >
            <NcLoadingIcon v-if="savingFamily" :size="16" />
            <span v-else>{{ t('agora', 'Save changes') }}</span>
          </NcButton>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-families-manager {
  padding: 20px;
  max-width: 1200px;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

.manager-header h2 {
  margin: 0 0 6px 0;
}

.description {
  color: var(--color-text-lighter);
  margin: 0;
  max-width: 720px;
}

.search-field {
  width: 260px;
}

.count-badge {
  font-size: 0.8em;
  background: var(--color-primary-element-light);
  color: var(--color-primary);
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
}

.families-list {
  margin-bottom: 40px;
}

.family-card {
  background: var(--color-background-dark);
  border-radius: 10px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: background 0.15s ease;
}

.family-card:hover {
  background: var(--color-background-hover);
}

.family-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
}

.family-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-radius: 12px;
  flex-shrink: 0;
}

.family-info {
  flex: 1;
  min-width: 0;
}

.family-title-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.family-title-row h4 {
  margin: 0;
}

.family-type {
  font-size: 0.85em;
  color: var(--color-text-lighter);
  background: var(--color-background-hover);
  padding: 2px 6px;
  border-radius: 4px;
}

.family-description {
  margin: 4px 0 0 0;
  color: var(--color-text-lighter);
  font-size: 0.9em;
}

.family-stats {
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

.stat-chip.types {
  background: var(--color-primary-element-light);
  color: var(--color-primary);
}

.stat-chip.layout {
  background: var(--color-warning, #f5a623);
  color: white;
}

.family-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.family-details {
  padding: 0 16px 16px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.detail-section h5 {
  margin: 0 0 6px 0;
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

.add-family-form {
  padding: 24px;
  background: var(--color-background-dark);
  border-radius: 10px;
  margin-bottom: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.form-field {
  margin: 0;
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
}

.inline-editor .inline-input {
  flex: 1;
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
  display: flex;
  flex-direction: column;
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

.help-text {
  color: var(--color-text-lighter);
  font-size: 0.9em;
  margin: 0 0 10px 0;
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
