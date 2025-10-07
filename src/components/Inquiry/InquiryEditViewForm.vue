<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { useInquiryStore } from '../../stores/inquiry'
import { useInquiriesStore } from '../../stores/inquiries'
import { useSupportsStore } from '../../stores/supports'
import { useCommentsStore } from '../../stores/comments'
import { useSessionStore } from '../../stores/session'
import { BaseEntry, Event } from '../../Types/index.ts'
import { t } from '@nextcloud/l10n'
import {
  InquiryTypesUI,
  InquiryTypeValues,
  confirmAction,
} from '../../helpers/modules/InquiryHelper.ts'

import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcButton from '@nextcloud/vue/components/NcButton'
import InquiryItemActions from './InquiryItemActions.vue'
import { InputDiv } from '../Base/index.ts'
import { ThumbIcon } from '../AppIcons'
import InquiryEditor from '../Editor/InquiryEditor.vue'
import { NcTextArea, NcRichText } from '@nextcloud/vue'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import {
  canEdit,
  canSupport,
  canComment,
  canViewToggle,
  createPermissionContextForContent,
  ContentType,
} from '../../utils/permissions.ts'

// Store declarations
const sessionStore = useSessionStore()
const commentsStore = useCommentsStore()
const supportsStore = useSupportsStore()
const inquiryStore = useInquiryStore()
const inquiriesStore = useInquiriesStore()
const router = useRouter()

const context = computed(() => createPermissionContextForContent(
  ContentType.Inquiry,
  inquiryStore.owner.id,
  inquiryStore.configuration.access === 'public',
  inquiryStore.status.isLocked,
  inquiryStore.status.isExpired,
  inquiryStore.status.deletionDate > 0,
  inquiryStore.status.isArchived,
  inquiryStore.inquiryGroups.length > 0,
  inquiryStore.inquiryGroups,
  inquiryStore.type
))

const titleLabel = ref('')

// Form fields
const selectedCategory = ref(inquiryStore.categoryId || 0)
const selectedLocation = ref(inquiryStore.locationId || 0)

const isSaving = ref(false)
const isLoaded = ref(false)

const hasSupported = computed(() => inquiryStore.currentUserStatus.hasSupported)

const isReadonlyDescription = ref(true)

// Get hierarchy path for location and category display
function getHierarchyPath(items, targetId) {
  const itemMap = {}

  items.forEach((item) => {
    itemMap[item.id] = item
  })

  if (!itemMap[targetId]) {
    return 'ID not found'
  }

  function buildPath(item) {
    if (item.parentId === 0) {
      return item.name
    }
    const parent = itemMap[item.parentId]
    if (parent) {
      return `${buildPath(parent)} -> ${item.name}`
    }
    return item.name
  }

  return buildPath(itemMap[targetId])
}

// Watchers for location and category
watch(
  selectedLocation,
  (newVal) => {
    const rawValue = toRaw(newVal)
    if (rawValue) {
      inquiryStore.locationId = rawValue.value
    }
  },
  { deep: true }
)

watch(
  selectedCategory,
  (newVal) => {
    const rawValue = toRaw(newVal)
    if (rawValue) {
      inquiryStore.categoryId = rawValue.value
    }
  },
  { deep: true }
)

// Build hierarchy for location and category dropdowns
function buildHierarchy(list: BaseEntry[], parentId = 0, depth = 0): BaseEntry[] {
  if (!Array.isArray(list)) return []
  return list
    .filter((item) => item?.parentId === parentId)
    .map((item) => {
      const children = buildHierarchy(list, item.id, depth + 1)
      return {
        ...item,
        depth,
        children,
      }
    })
    .flatMap((item) => [item, ...item.children])
}

const hierarchicalLocation = computed(() => {
  if (!Array.isArray(sessionStore.appSettings.locationTab)) return []
  return buildHierarchy(sessionStore.appSettings.locationTab).map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))
})

const hierarchicalCategory = computed(() => {
  if (!Array.isArray(sessionStore.appSettings.categoryTab)) return []
  return buildHierarchy(sessionStore.appSettings.categoryTab).map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))
})

// Initialize location and category
watch(
  hierarchicalLocation,
  (locations) => {
    if (!locations.length) return
    if (inquiryStore.locationId === 0) {
      selectedLocation.value = locations[0]
      inquiryStore.locationId = locations[0].value
    } else {
      const selected = locations.find((loc) => loc.value === inquiryStore.locationId)
      selectedLocation.value = selected || locations[0]
      inquiryStore.locationId = selected?.value || locations[0].value
    }
  },
  { immediate: true }
)

watch(
  hierarchicalCategory,
  (categories) => {
    if (!categories.length) return
    if (inquiryStore.categoryId === 0) {
      selectedCategory.value = categories[0]
      inquiryStore.categoryId = categories[0].value
    } else {
      const selected = categories.find((loc) => loc.value === inquiryStore.categoryId)
      selectedCategory.value = selected || categories[0]
      inquiryStore.categoryId = selected?.value || categories[0].value
    }
  },
  { immediate: true }
)

const isReadonly = computed(() => {
  const user = sessionStore.currentUser
  if (!user) return true
  return !canEdit(context.value)
})

watch(
  () => inquiryStore.type,
  (newType) => {
    if (newType === 'debate') {
      isReadonlyDescription.value = false
    } else {
      isReadonlyDescription.value = isReadonly.value
    }
  },
  { immediate: true }
)

// Toggle support
const onToggleSupport = async () => {
  const supported = supportsStore.toggleSupport(
    inquiryStore.id,
    sessionStore.currentUser.id,
    inquiryStore,
    inquiriesStore
  )
  if (inquiryStore.currentUserStatus.hasSupported) {
    showSuccess(t('agora', 'Thank you for your support!'), { timeout: 2000 })
  } else {
    showSuccess(t('agora', 'Support removed!'), { timeout: 2000 })
  }
  return supported
}

// Event subscriptions
onMounted(() => {
  subscribe(Event.UpdateComments, () => commentsStore.load())
  isLoaded.value = true
})

onUnmounted(() => {
  isLoaded.value = false
  unsubscribe(Event.UpdateComments, () => commentsStore.load())
})

// Save inquiry changes
const saveChanges = async () => {
  if (isSaving.value) return

  if (!inquiryStore.title || inquiryStore.title.trim() === '') {
    showError(t('agora', 'Title is mandatory'), { timeout: 2000 })
    return
  }

  isSaving.value = true

  try {
    await inquiryStore.update({
      id: inquiryStore.id,
      type: inquiryStore.type,
      title: inquiryStore.title,
      description: inquiryStore.description,
      categoryId: inquiryStore.categoryId,
      locationId: inquiryStore.locationId,
      parentId: inquiryStore.parentId,
    })
    showSuccess(t('agora', 'The inquiry has been saved'), { timeout: 2000 })
  } catch {
    showError(t('agora', 'Error saving inquiry!'), { timeout: 2000 })
  } finally {
    isSaving.value = false
  }
}

// Determine if category/location should be shown as select or label
const showCategoryAsLabel = computed(() => {
  if (inquiryStore.parentId !== 0) return true
  if (isReadonly.value) return true
  return false
})

const showLocationAsLabel = computed(() => {
  if (inquiryStore.parentId !== 0) return true
  if (isReadonly.value) return true
  return false
})

// Create child inquiry
const createChildInquiry = async (type: InquiryTypeValues): Promise<void> => {
  if (isSaving.value) return

  titleLabel.value = ``
  const confirmed = await confirmAction(
    `Do you really want to reply to this inquiry with a ${type}?`
  )
  if (!confirmed) return

  isSaving.value = true

  if (type === 'official')
    titleLabel.value = `${t('agora', 'Official response for')}: ${inquiryStore.title.trim()}`
  else titleLabel.value = `${t('agora', 'Response for')}: ${inquiryStore.title.trim()}`

  try {
    const inquiry = await inquiryStore.add({
      type,
      title: titleLabel.value,
      categoryId: inquiryStore.categoryId,
      locationId: inquiryStore.locationId,
      parentId: inquiryStore.id,
    })

    if (inquiry) {
      showSuccess(t('agora', 'Inquiry {title} added', { title: inquiry.title }))
      router.push({
        name: 'inquiry',
        params: { id: inquiry.id },
      })
    }
  } catch (error) {
    console.error('Create child inquiry error:', error)
    showError(t('agora', error instanceof Error ? error.message : 'Error saving inquiry'), {
      timeout: 2000,
    })
  } finally {
    isSaving.value = false
  }
}

const allowedTypesForActions = computed(() => [
  InquiryTypeValues.PROJECT,
  InquiryTypeValues.PROPOSAL,
  InquiryTypeValues.GRIEVANCE,
])

// Check if actions menu should be shown
const showActionsMenu = computed(
  () => isReadonly.value && allowedTypesForActions.value.includes(inquiryStore.type)
)

// Check if response button should be shown
const showResponseButton = computed(
  () => sessionStore.currentUser?.isOfficial && inquiryStore.type !== InquiryTypeValues.OFFICIAL
)

// Check if save button should be shown
const showSaveButton = computed(() => !isReadonlyDescription.value)
</script>

<template>
  <div v-if="isLoaded" class="inquiry-edit-view">
    <!-- Action buttons toolbar - ALL ON LEFT -->
    <div class="action-toolbar">
      <div class="left-actions">
        <!-- Action buttons (GRIEVANCE, SUGGESTION, etc.) -->
        <div v-if="showActionsMenu" class="action-buttons">
          <template v-if="inquiryStore.type === InquiryTypeValues.PROJECT">
            <NcButton
              type="secondary"
              :title="t('agora', 'Create Proposal')"
              @click="createChildInquiry(InquiryTypeValues.PROPOSAL)"
            >
              <template #icon>
                <component :is="InquiryTypesUI[InquiryTypeValues.PROPOSAL].icon" class="action-icon" />
              </template>
              {{ t('agora', 'Proposal') }}
            </NcButton>
            <NcButton
              type="secondary"
              :title="t('agora', 'Create Grievance')"
              @click="createChildInquiry(InquiryTypeValues.GRIEVANCE)"
            >
              <template #icon>
                <component :is="InquiryTypesUI[InquiryTypeValues.GRIEVANCE].icon" class="action-icon" />
              </template>
              {{ t('agora', 'Grievance') }}
            </NcButton>
          </template>

          <template v-else-if="inquiryStore.type === InquiryTypeValues.PROPOSAL">
            <NcButton
              type="secondary"
              :title="t('agora', 'Create Suggestion')"
              @click="createChildInquiry(InquiryTypeValues.SUGGESTION)"
            >
              <template #icon>
                <component :is="InquiryTypesUI[InquiryTypeValues.SUGGESTION].icon" class="action-icon" />
              </template>
              {{ t('agora', 'Suggestion') }}
            </NcButton>
            <NcButton
              type="secondary"
              :title="t('agora', 'Create Grievance')"
              @click="createChildInquiry(InquiryTypeValues.GRIEVANCE)"
            >
              <template #icon>
                <component :is="InquiryTypesUI[InquiryTypeValues.GRIEVANCE].icon" class="action-icon" />
              </template>
              {{ t('agora', 'Grievance') }}
            </NcButton>
          </template>

          <template v-else-if="inquiryStore.type === InquiryTypeValues.GRIEVANCE">
            <NcButton
              type="secondary"
              :title="t('agora', 'Create Suggestion')"
              @click="createChildInquiry(InquiryTypeValues.SUGGESTION)"
            >
              <template #icon>
                <component :is="InquiryTypesUI[InquiryTypeValues.SUGGESTION].icon" class="action-icon" />
              </template>
              {{ t('agora', 'Suggestion') }}
            </NcButton>
          </template>
        </div>

        <!-- Save and Response buttons -->
        <div class="primary-actions">
          <NcButton
            v-if="showSaveButton"
            :disabled="isSaving"
            type="primary"
            class="save-button"
            @click.prevent="saveChanges"
          >
            <template #icon>
              <span v-if="isSaving" class="loading-icon"></span>
            </template>
            {{ t('agora', 'Save') }}
          </NcButton>

          <NcButton
            v-if="showResponseButton"
            type="primary"
            class="response-button"
            @click="createChildInquiry(InquiryTypeValues.OFFICIAL)"
          >
            {{ t('agora', 'Official Response') }}
          </NcButton>
        </div>
      </div>

      <!-- Right: Item actions toggle -->
      <div class="right-actions">
        <div
          v-if="canViewToggle(context)"
          class="item-actions"
        >
          <InquiryItemActions :key="`actions-${inquiryStore.id}`" :inquiry="inquiryStore" />
        </div>
      </div>
    </div>

    <!-- Inquiry form -->
    <form class="inquiry-form">
      <!-- Basic Information Section -->
      <div class="form-section">
        <div class="section-header">
          <div class="title-section">
            <span class="section-title">{{ t('agora', 'Title') }}:</span>
            <div v-if="isReadonly" class="title-content">
              <span class="type-field inline">{{ inquiryStore.title }}</span>
            </div>
            <div v-else class="title-content">
              <InputDiv
                v-model="inquiryStore.title"
                type="text"
                :disabled="isReadonly"
                :readonly="isReadonly"
                class="form-input"
                label="Title"
                :placeholder="t('agora', 'Enter inquiry title')"
              />
            </div>
          </div>

          <div class="counters">
            <div v-if="canComment(context)" class="counter-item">
              <component :is="InquiryGeneralIcons.comment" :size="24" />
              <span>{{ commentsStore.comments.length || 0 }}</span>
            </div>
            <div v-if="canSupport(context)" class="counter-item" @click="onToggleSupport">
              <ThumbIcon :supported="hasSupported" />
              <span>{{ inquiryStore.status.countSupports || 0 }}</span>
            </div>
          </div>
        </div>

        <div class="form-row double-columns">
          <div class="form-field">
            <label class="type-label">{{ t('agora', 'Location') }}:</label>
            <NcSelect
              v-if="!showLocationAsLabel"
              v-model="selectedLocation"
              :options="hierarchicalLocation"
              :clearable="false"
              :label-outside="true"
              class="select-field location-select"
              required
            />
            <div v-else class="readonly-value">
              {{
                getHierarchyPath(sessionStore.appSettings.locationTab, inquiryStore.locationId) ||
                t('agora', 'Inherited from parent')
              }}
            </div>
          </div>
          <div class="form-field">
            <label class="type-label">{{ t('agora', 'Category') }}:</label>
            <NcSelect
              v-if="!showCategoryAsLabel"
              v-model="selectedCategory"
              :options="hierarchicalCategory"
              :clearable="false"
              :label-outside="true"
              class="select-field category-select"
              required
            />
            <div v-else class="readonly-value">
              {{
                getHierarchyPath(sessionStore.appSettings.categoryTab, inquiryStore.categoryId) ||
                t('agora', 'Inherited from parent')
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- Description Section -->
      <div
        v-if="sessionStore.appSettings.inquiryTypeRights[inquiryStore.type].editorType === 'wysiwyg'"
        class="form-section"
      >
        <div class="form-container">
          <span class="section-title">{{ t('agora', 'Detailed Description') }}</span>
          <InquiryEditor v-model="inquiryStore.description" :readonly="isReadonlyDescription" />
        </div>
      </div>

      <div
        v-else-if="sessionStore.appSettings.inquiryTypeRights[inquiryStore.type].editorType === 'texteditor'"
        class="form-section"
      >
        <div class="form-container">
          <span class="section-title">{{ t('agora', 'Detailed Description') }}</span>
          <NcRichText
            v-model="inquiryStore.description"
            :autolink="true"
            :use-markdown="true"
            :disabled="isReadonlyDescription"
            class="rich-text-editor"
          />
        </div>
      </div>

      <div v-else class="form-section">
        <div class="form-container">
          <span class="section-title">{{ t('agora', 'Detailed Description') }}</span>
          <NcTextArea
            v-model="inquiryStore.description"
            :disabled="isReadonlyDescription"
            class="text-area-editor"
            :rows="8"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.inquiry-edit-view {
  padding: 10px;
  background: var(--color-main-background);
  border-radius: var(--border-radius-large);
}

/* Action toolbar styles - ALL LEFT ALIGNED */
.action-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 0.5rem; 
  padding: 1rem;
  background: var(--color-background-dark);
  border-radius: var(--border-radius-large);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.left-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
}

.right-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 0;
  justify-content: flex-end;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.primary-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.save-button,
.response-button {
  min-width: 120px;
  white-space: nowrap;
}

.item-actions {
  display: flex;
  align-items: center;
}

/* Form styles */
.inquiry-form {
  display: flex;
  flex-direction: column;
  gap: 1rem; 
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-background-dark);
  border-radius: var(--border-radius-large);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 0;
}

.form-container {
  flex-grow: 1;
  min-height: 300px;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-main-background);
  padding: 1rem;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 800;
}

.title-content {
  flex-grow: 1;
  
  .form-input {
    width: 100%;
    max-width: 500px;
  }
}

.section-title {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
  padding: 0;
}

.counters {
  display: flex;
  gap: 1.5rem;
}

.counter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  span {
    font-weight: bold;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &.double-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.form-field {
  width: 100%;
}

.type-label {
  font-weight: 600;
  color: var(--color-primary);
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  display: block;
}

.select-field {
  width: 100%;
  
  &.location-select,
  &.category-select {
    max-width: 300px;
  }
}

.readonly-value {
  padding: 8px 12px;
  background: var(--color-background-darker);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  color: var(--color-text-lighter);
}

.rich-text-editor,
.text-area-editor {
  width: 100%;
}

.inline {
  display: inline;
  margin: 0;
  padding: 0;
}

/* Loading animation */
.loading-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .action-toolbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 0.5rem; 
  }
  
  .left-actions {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .action-buttons,
  .primary-actions {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  
  .right-actions {
    width: 100%;
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .counters {
    width: 100%;
    justify-content: space-between;
  }
  
  .select-field.location-select,
  .select-field.category-select {
    max-width: 100%;
  }
}

/* Hide input labels */
.input-div :deep(.nc-input-field__label),
.input-div :deep(label) {
  display: none !important;
}
</style>

