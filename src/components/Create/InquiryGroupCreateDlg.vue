<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud Contributors
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcRadioGroup from '@nextcloud/vue/components/NcRadioGroup'
import type { InquiryGroupType } from '../stores/inquiryGroups.types.ts'

import { ConfigBox, InputDiv } from '../Base/index.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

import { useInquiryGroupStore } from '../../stores/inquiryGroup.ts'
import { useSessionStore } from '../../stores/session.ts'
import { showError, showSuccess } from '@nextcloud/dialogs'
import {
  getAvailableInquiryGroupTypesForCreation,
  getInquiryGroupTypeData,
  getAllowedResponseGroupTypes,
} from '../../helpers/modules/InquiryHelper.ts'

// Define props
interface Props {
  inquiryGroupType?: string | null
  parentGroupId?: string | number | null
  availableGroups?: string[]
  defaultTitle?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  inquiryGroupType: null,
  parentGroupId: null,
  availableGroups: () => [],
  defaultTitle: null,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'added', inquiry: { id: number; title: string }): void
  (e: 'update:selected-groups', groups: string[]): void
}>()

const inquiryGroupStore = useInquiryGroupStore()
const sessionStore = useSessionStore()

const inquiryTitle = ref('')
const inquiryId = ref<number | null>(null)
const adding = ref(false)

const accessType = ref<'user' | 'groups'>('user')
const selectedNextcloudGroup = ref<string | null>(null)

const localInquiryGroupType = ref<string>('')

// Get all inquiry types from app settings
const allInquiryGroupTypes = computed((): InquiryGroupType[] => {
  const types = sessionStore.appSettings.inquiryGroupTypeTab || []
  return types
})

// Find the InquiryGroupType object by group_type string
const findInquiryGroupTypeByType = (typeString: string): InquiryGroupType | null => allInquiryGroupTypes.value.find(type => type.group_type === typeString) || null

// Get the initial inquiry group type object
const initialInquiryGroupType = computed(() => {
  if (props.inquiryGroupType) {
    return findInquiryGroupTypeByType(props.inquiryGroupType)
  }
  return null
})

const availableInquiryGroupTypes = computed(() => {
  
  // CASE 1: No parent ID, use the provided type
  if (!props.parentGroupId && initialInquiryGroupType.value) {
    return [initialInquiryGroupType.value]
  }
  
  // CASE 2: Has parent ID, we need to find parent group type
  if (props.parentGroupId && initialInquiryGroupType.value) {
    
    // Get allowed response types for the parent group type
    const allowedResponses = getAllowedResponseGroupTypes(allInquiryGroupTypes.value, initialInquiryGroupType.value.group_type)
    
    if (allowedResponses && allowedResponses.length > 0) {
      // Return parent type + allowed responses
      const result = [initialInquiryGroupType.value, ...allowedResponses]
      return result
    }
    
    // Fallback: if no allowed responses, just return parent type
    return [initialInquiryGroupType.value]
  }
  
  // Default: return all root types
  const rootTypes = allInquiryGroupTypes.value.filter(type => type.is_root === true)
  const result = getAvailableInquiryGroupTypesForCreation(rootTypes)
  return result
})

const selectedInquiryGroupType = ref<string>('')

const actualSelectedType = computed(() => 
  localInquiryGroupType.value
  || props.inquiryGroupType  
  || availableInquiryGroupTypes.value[0]?.group_type
)

watch(
  [
    () => localInquiryGroupType.value,
    () => initialInquiryGroupType.value?.group_type,
    () => availableInquiryGroupTypes.value[0]?.group_type
  ],
  ([localType, initialType, firstAvailableType]) => {
    selectedInquiryGroupType.value = localType || initialType || firstAvailableType || ''
  },
  { immediate: true }
)

// Data for display
const currentInquiryGroupTypeData = computed(() => {
  const data = getInquiryGroupTypeData(actualSelectedType.value, allInquiryGroupTypes.value)
  return data
})

const showGroupTypeSelector = computed(() => {
  const shouldShow = props.parentGroupId && availableInquiryGroupTypes.value.length > 1
  return shouldShow
})

const dialogTitle = computed(() => {
  if (!props.parentGroupId) {
    const title = t('agora', 'Create {type} Group', { 
      type: currentInquiryGroupTypeData.value?.label || '' 
    })
    return title
  } 
    const title = t('agora', 'Add Group to Parent')
    return title
  
})

const contextDescription = computed(() => {
  if (!props.parentGroupId) {
    const desc = t('agora', 'Creating a new {type} group', {
      type: currentInquiryGroupTypeData.value?.label || ''
    })
    return desc
  } 
    const desc = t('agora', 'Adding a group to the parent. You can create the same type as parent or an allowed response type.')
    return desc
  
})

// Initialize local type when component mounts
onMounted(() => {
  if (availableInquiryGroupTypes.value.length > 0 && !actualSelectedType.value) {
    // Default to parent type if available, otherwise first available
    const parentType = initialInquiryGroupType.value?.group_type
    
    if (parentType && availableInquiryGroupTypes.value.some(t => t.group_type === parentType)) {
      selectedInquiryGroupType.value = parentType
      localInquiryGroupType.value = parentType // Also set local type for consistency
    } else if (availableInquiryGroupTypes.value[0]) {
      selectedInquiryGroupType.value = availableInquiryGroupTypes.value[0].group_type
      localInquiryGroupType.value = availableInquiryGroupTypes.value[0].group_type
    }
  }
})

// Watch to pre-fill title
watch(() => props.defaultTitle, (newTitle) => {
  if (newTitle) {
    inquiryTitle.value = newTitle
  }
}, { immediate: true })

const titleIsEmpty = computed(() => inquiryTitle.value.trim() === '')
const disableAddButton = computed(() => titleIsEmpty.value || adding.value)

interface InquiryGroupData {
  type: string
  title: string
  parentId?: number | null
  ownedGroup?: string
  description?: string
}

async function addGroupInquiry() {
  try {
    adding.value = true
    
    // Validate required fields
    if (!actualSelectedType.value) {
      showError(t('agora', 'Please select a group type'))
      return
    }
    
    if (titleIsEmpty.value) {
      showError(t('agora', 'Please enter a title'))
      return
    }
    
    
    // Prepare inquiry data
    const inquiryData: InquiryGroupData = {
      type: actualSelectedType.value,
      title: inquiryTitle.value.trim(),
    }

    // Add parent ID if provided
    if (props.parentGroupId) {
      inquiryData.parentId = props.parentGroupId
    }
    
    // Add Nextcloud groups if groups access is selected
    if (accessType.value === 'groups' && selectedNextcloudGroup.value) {
      inquiryData.ownedGroup = selectedNextcloudGroup.value
    }
   
    
    // Add the inquiry group
    const inquiry = await inquiryGroupStore.add(inquiryData)
    

    if (inquiry) {
      inquiryId.value = inquiry.id
      
      const successMessage = props.parentGroupId 
        ? t('agora', 'Group "{inquiryTitle}" has been added to parent', {
            inquiryTitle: inquiry.title,
          })
        : t('agora', '"{inquiryTitle}" group has been created', {
            inquiryTitle: inquiry.title,
          })
      
      showSuccess(successMessage)
      
      emit('added', {
        id: inquiry.id,
        title: inquiry.title,
      })
      resetInquiry()
    }
  } catch (error) {
    console.error("Error while creating group",error)
    showError(
      t('agora', 'Error while creating group "{inquiryTitle}"', {
        inquiryTitle: inquiryTitle.value,
      })
    )
  } finally {
    adding.value = false
  }
}

function resetInquiry() {
  inquiryId.value = null
  inquiryTitle.value = ''
  accessType.value = 'user'
  selectedNextcloudGroup.value = null
  emit('update:selected-groups', [])
}
</script>

<template>
  <div class="dialog-overlay" @click="emit('close')">
    <!-- Dialog container -->
    <div class="create-dialog" @click.stop>
      <!-- Dialog Header -->
      <div class="dialog-header">
        <h3>{{ dialogTitle }}</h3>
        <div v-if="props.parentGroupId" class="mode-badge child">
          {{ t('agora', 'Child Group') }}
        </div>
        <div v-else class="mode-badge creation">
          {{ t('agora', 'New Group') }}
        </div>
      </div>

      <!-- Context description -->
      <div class="context-description">
        <p>{{ contextDescription }}</p>
      </div>

      <!-- Access Configuration - Groups Nextcloud -->
      <ConfigBox
        v-if="props.availableGroups && props.availableGroups.length > 0"
        :name="t('agora', 'Access Settings')"
      >
        <template #icon>
          <Component :is="InquiryGeneralIcons.AccountGroup" />
        </template>
        <div class="access-settings">
          <NcRadioGroup
            :model-value="accessType"
            class="access-radio-group"
            :label="t('agora','Who can access ?')"
            
            :description="t('agora', 'Choose who can access this group')"
            @update:model-value="accessType = $event"
          >
            <NcCheckboxRadioSwitch value="user">
              {{ t('agora', 'Only me (personal group)') }}
            </NcCheckboxRadioSwitch>

            <NcCheckboxRadioSwitch value="groups">
              {{ t('agora', 'Open with Nextcloud group') }}
            </NcCheckboxRadioSwitch>
          </NcRadioGroup>

          <!-- Nextcloud Group Selection -->
          <div v-if="accessType === 'groups'" class="nextcloud-groups-selection">
              <h4 class="groups-title">
                  {{ t('agora', 'Select Nextcloud group') }}
              </h4>
              <div class="groups-list">
                  <NcRadioGroup :label="t('agora','Groups Selections')">
                  <div v-for="group in props.availableGroups" :key="group" class="group-item">
                      <NcCheckboxRadioSwitch
                              v-model="selectedNextcloudGroup"
                              :value="group"
                              type="radio"
                              name="nextcloud-group-selection"
                              >
                              {{ group }}
                      </NcCheckboxRadioSwitch>
                  </div>
                  </NcRadioGroup>

              </div>
          </div>
        </div>
      </ConfigBox>

      <!-- Title -->
      <ConfigBox :name="t('agora', 'Title')">
      <template #icon>
          <Component :is="InquiryGeneralIcons.Bullhorn" />
      </template>
      <InputDiv
              :model-value="inquiryTitle"
              focus
              type="text"
              :placeholder="t('agora', 'Enter group title')"
              :helper-text="t('agora', 'Choose a meaningful title for your group')"
              :label="t('agora', 'Group Title')"
              @update:model-value="inquiryTitle = $event"
              @submit="addGroupInquiry"
              />
      </ConfigBox>

      <!-- Group Type Selection  -->
      <ConfigBox
              v-if="showGroupTypeSelector || (!props.parentGroupId && availableInquiryGroupTypes.length === 1)"
              :name="t('agora', 'Group Type')"
              :label="t('agora', 'Select group type')"
              >
              <template #icon>
                  <Component :is="InquiryGeneralIcons.Check" />
              </template>

      <NcRadioGroup
              v-if="showGroupTypeSelector"
              :label="t('agora','Groups Selections')"
              :model-value="localInquiryGroupType"
              @update:model-value="localInquiryGroupType = $event"
              >
              <div
                      v-for="type in availableInquiryGroupTypes"
                      :key="type.group_type"
                      class="type-item"
                      >
                      <NcCheckboxRadioSwitch
                              :value="type.group_type"
                              type="radio"
                              name="inquiry-group-type-selection"
                              >
                              <div class="type-option">
                                  <strong>{{ type.label }}</strong>
                                  <p v-if="type.description" class="type-description-small">
                                  {{ type.description }}
                                  </p>
                              </div>
                      </NcCheckboxRadioSwitch>
              </div>
      </NcRadioGroup>
      <div v-else class="selected-type">
          <strong>{{ currentInquiryGroupTypeData?.label }}</strong>
          <p v-if="currentInquiryGroupTypeData?.description" class="type-description">
          {{ currentInquiryGroupTypeData.description }}
          </p>
          <div class="type-info">
              <small>{{ t('agora', 'Creating new {type} group', {
                  type: currentInquiryGroupTypeData?.label || 'selected'
                  }) }}</small>
          </div>
      </div>

      <div v-if="props.parentGroupId && showGroupTypeSelector" class="type-help">
          <small>{{ t('agora', 'You can create the same type as parent or choose from allowed response types') }}</small>
      </div>
      <div v-else-if="!props.parentGroupId && showGroupTypeSelector" class="type-help">
          <small>{{ t('agora', 'Select the type of group you want to create') }}</small>
      </div>
      </ConfigBox>

      <!-- Buttons -->
      <div class="create-buttons">
          <NcButton @click="emit('close')">
          {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton
                  :disabled="disableAddButton"
                  :variant="'primary'"
                  @click="addGroupInquiry"
                  >
                  {{ adding ? t('agora', 'Creating …') : 
                  props.parentGroupId ? 
                  t('agora', 'Add to Parent') : 
                  t('agora', 'Create Group') }}
          </NcButton>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.create-dialog {
    background-color: var(--color-main-background);
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin: 20px;
}

.dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color-border);
}

.dialog-header h3 {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-main-text);
}

.mode-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: 600;
}

.mode-badge.child {
    background: var(--color-info);
    color: var(--color-info-text);
}

.mode-badge.creation {
    background: var(--color-success);
    color: var(--color-success-text);
}

.context-description {
    margin-bottom: 20px;
    padding: 12px;
    background: var(--color-background-hover);
    border-radius: 6px;
    border-left: 3px solid var(--color-primary);
}

.context-description p {
    margin: 0;
    color: var(--color-text-lighter);
    font-size: 0.9em;
    line-height: 1.4;
}

.create-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
}

.selected-type {
    padding: 12px 0;
}

.type-description {
    color: var(--color-text-lighter);
    font-size: 0.9em;
    margin-top: 8px;
    line-height: 1.4;
}

.type-info {
    margin-top: 8px;
    color: var(--color-info);
    font-size: 0.85em;
}

.type-help {
    margin-top: 8px;
    color: var(--color-text-lighter);
    font-size: 0.85em;
}

.access-settings {
    padding: 12px 0;
}

.access-description {
    color: var(--color-text-lighter);
    margin-bottom: 16px;
    font-size: 0.95em;
}

.access-radio-group {
    margin-bottom: 20px;
}

.nextcloud-groups-selection {
    margin-top: 16px;
    padding: 16px;
    background: var(--color-background-dark);
    border-radius: 8px;
}

.groups-title {
    margin: 0 0 8px 0;
    font-size: 1em;
    font-weight: 600;
}

.groups-description {
    color: var(--color-text-lighter);
    font-size: 0.9em;
    margin: 0 0 12px 0;
}

.groups-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;
}

.group-item {
    display: flex;
    align-items: center;
    padding: 4px 0;
}
</style>
