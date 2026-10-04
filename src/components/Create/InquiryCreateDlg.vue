<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud Contributors
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcRadioGroup from '@nextcloud/vue/components/NcRadioGroup'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcPopover from '@nextcloud/vue/components/NcPopover'

import { ConfigBox, RadioGroupDiv, InputDiv } from '../Base/index.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

import { useInquiryStore } from '../../stores/inquiry.ts'
import { useSessionStore } from '../../stores/session.ts'
import { showError, showSuccess } from '@nextcloud/dialogs'
import {
  getAvailableInquiryTypesForCreation,
  getInquiryTypeOptions,
  getInquiryTypeData,
  type InquiryType
} from '../../helpers/modules/InquiryHelper.ts'

import type { AccessType } from '../../stores/inquiry.ts'

// Define props
interface Props {
  inquiryType?: InquiryType | null
  family: string | null,
  responseType?: string | null
  selectedMode?: string
  availableGroups?: string[]
  parentInquiryId?: string | number | null
  defaultTitle?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  inquiryType: null,
  family: null,
  responseType: null,
  selectedMode: null,
  availableGroups: () => [],
  parentInquiryId: null,
  defaultTitle: null
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'added', inquiry: { id: number; title: string }): void
  (e: 'update:selected-groups', groups: string[]): void
}>()

const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()

const inquiryTitle = ref('')
const inquiryId = ref<number | null>(null)
const adding = ref(false)

// UI-level toggle: who owns / opens this inquiry (personal vs. group-owned).
// NOTE: this is NOT the API `access` value — it only controls which sub-form is shown.
const ownerMode = ref<'user' | 'groups'>('user')
const selectedGroup = ref<string | null>(null)

// UI-level access choice for group-owned inquiries. Values mirror the labels,
// not the API constants — the actual `access` payload is derived in `addInquiry()`:
//   'open'       → access: 'private' + ownedGroup (everyone can see; group is owner)
//   'restricted' → access: 'groups'  + ownedGroup (only group members can see)
const groupAccessMode = ref<'open' | 'restricted'>('restricted')

// Get inquiry types from app settings
const inquiryTypes = computed(() => sessionStore.appSettings.inquiryTypeTab || [])

// Filter out official and suggestion types for creation
const availableInquiryTypes = computed(() => getAvailableInquiryTypesForCreation(inquiryTypes.value))

// Inquiry type options for radio group
const inquiryTypeOptions = computed(() => getInquiryTypeOptions(availableInquiryTypes.value))

// Selected inquiry type (for selector display)
const localInquiryType = ref(availableInquiryTypes.value[0]?.inquiry_type || '')

// Final selected type (priority to props)
const selectedType = computed(() => {
  if (props.inquiryType) {
    return props.inquiryType.inquiry_type
  }
  if (props.responseType) {
    return props.responseType
  }
  return localInquiryType.value
})

// Data for display
const currentInquiryTypeData = computed(() => getInquiryTypeData(selectedType.value, inquiryTypes.value))

// Check if type is predefined (don't show selector)
const hasPredefinedType = computed(() => !!(props.inquiryType || props.responseType))

const selectGroup = (group: string | null) => {
  selectedGroup.value = group
  emit('update:selected-groups', group ? [group] : [])
}

// Update local inquiry type
const updateLocalInquiryType = (newType: string) => {
  localInquiryType.value = newType
}

// Watch to pre-fill type when prop changes
watch(() => props.inquiryType, (newType) => {
  if (newType && newType.inquiry_type) {
    localInquiryType.value = newType.inquiry_type
  }
}, { immediate: true })

// Watch to pre-fill title
watch(() => props.defaultTitle, (newTitle) => {
  if (newTitle) {
    inquiryTitle.value = newTitle
  }
}, { immediate: true })

const titleIsEmpty = computed(() => inquiryTitle.value.trim() === '')
const disableAddButton = computed(() => titleIsEmpty.value || adding.value)

interface InquiryData {
  type: string
  title: string
  family: string
  access: AccessType
  parentId?: string | number | null
  locationId?: number | string | null
  categoryId?: number | string | null
  ownedGroup?: string
  description?: string
}

async function addInquiry() {
  try {
    adding.value = true
    // Prepare inquiry data with proper typing
    const inquiryData: InquiryData = {
      type: selectedType.value,
      title: inquiryTitle.value.trim(),
      family: props.family ?? '',
      access: 'private',
    }

    if (props.parentInquiryId) {
      inquiryData.parentId = props.parentInquiryId
    }

    if (inquiryStore.locationId) {
      inquiryData.locationId = inquiryStore.locationId
    }

    if (inquiryStore.categoryId) {
      inquiryData.categoryId = inquiryStore.categoryId
    }

    // Group-owned inquiry: set owner and map UI choice → API access.
    if (ownerMode.value === 'groups' && selectedGroup.value) {
      inquiryData.ownedGroup = selectedGroup.value
      // 'open'       → access: 'private' (informal / open, group is only the owner)
      // 'restricted' → access: 'groups'  (only group members can see/participate)
      inquiryData.access = groupAccessMode.value === 'open' ? 'private' : 'groups'
    } else {
      inquiryData.access = 'private'
    }

    if (props.selectedMode === 'transform') {
      inquiryData.description = inquiryStore.description
      // Clone the inquiry with the new mode.
      // Archive the old one
    }

    // Add the inquiry
    const inquiry = await inquiryStore.add(inquiryData)

    if (inquiry) {
      inquiryId.value = inquiry.id
      showSuccess(
        t('agora', '"{inquiryTitle}" has been added', {
          inquiryTitle: inquiry.title,
        })
      )
      emit('added', {
        id: inquiry.id,
        title: inquiry.title,
      })
      resetInquiry()
    }
  } catch {
    showError(
      t('agora', 'Error while creating Inquiry "{inquiryTitle}"', {
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
  ownerMode.value = 'user'
  selectedGroup.value = null
  groupAccessMode.value = 'restricted'
  emit('update:selected-groups', [])
}
</script>

<template>
  <div class="dialog-overlay" @click="emit('close')">
    <!-- Dialog container -->
    <div class="create-dialog" @click.stop>
      <!-- Access Configuration -->
      <ConfigBox
        v-if="availableGroups.length > 0"
        :name="t('agora', 'Access settings')"
      >
        <template #icon>
          <Component :is="InquiryGeneralIcons.AccountGroup" />
        </template>
        <div class="access-settings">
          <NcRadioGroup
            :model-value="ownerMode"
            :label="t('agora','Choose who is opening this inquiry')"
            class="access-radio-group"
            :description="t('agora', 'Choose who is opening this inquiry')"
            @update:model-value="ownerMode = $event"
          >
            <NcCheckboxRadioSwitch value="user">
              {{ t('agora', 'Only me (personal inquiry)') }}
            </NcCheckboxRadioSwitch>

            <NcCheckboxRadioSwitch value="groups">
              {{ t('agora', 'Open with this group') }}
            </NcCheckboxRadioSwitch>
          </NcRadioGroup>

          <!-- Group Selection -->
          <div v-if="ownerMode === 'groups'" class="groups-selection">
            <h4 class="groups-title">
              {{ t('agora', 'Select group') }}
            </h4>
            <div class="groups-list">
              <NcRadioGroup
                :model-value="selectedGroup"
                :label="t('agora', 'Choose the group that will own this inquiry')"
                :description="t('agora', 'Choose which of your groups is responsible for this inquiry')"
                @update:model-value="selectGroup($event)"
              >
                <div
                  v-for="group in availableGroups"
                  :key="group"
                  class="group-item"
                >
                  <NcCheckboxRadioSwitch
                    :value="group"
                    type="radio"
                    name="group-selection"
                  >
                    {{ group }}
                  </NcCheckboxRadioSwitch>
                </div>
              </NcRadioGroup>
            </div>

            <!-- Group access mode: only meaningful once a group is selected -->
	    <!-- Group access mode: only meaningful once a group is selected -->
<div
  v-if="selectedGroup"
  class="group-mode-selection"
>
  <NcRadioGroup
    :model-value="groupAccessMode"
    :label="t('agora', 'How should this group access the inquiry?')"
    @update:model-value="groupAccessMode = $event"
  >
    <div class="mode-option">
      <NcCheckboxRadioSwitch value="open">
        <span class="mode-label">
          {{ t('agora', 'Open, owned by the group') }}
          <NcPopover
            :triggers="['hover', 'focus']"
            :delay="200"
            placement="top"
            popover-base-class="agora-tooltip-popover"
          >
            <template #trigger>
              <span
                class="mode-help-icon"
                role="button"
                tabindex="0"
                :aria-label="t('agora', 'More information about this option')"
              >ⓘ</span>
            </template>
            <div class="tooltip-content">
              {{ t('agora', 'Everyone can see and participate in this inquiry. The selected group is recorded as the owner (useful for reporting, moderation and follow-up).') }}
            </div>
          </NcPopover>
        </span>
      </NcCheckboxRadioSwitch>
      <p class="mode-description">
        {{ t('agora', 'Access: open · Owner: {group}', { group: selectedGroup }) }}
      </p>
    </div>

    <div class="mode-option">
      <NcCheckboxRadioSwitch value="restricted">
        <span class="mode-label">
          {{ t('agora', 'Restricted to group members') }}
          <NcPopover
            :triggers="['hover', 'focus']"
            :delay="200"
            placement="top"
            popover-base-class="agora-tooltip-popover"
          >
            <template #trigger>
              <span
                class="mode-help-icon"
                role="button"
                tabindex="0"
                :aria-label="t('agora', 'More information about this option')"
              >ⓘ</span>
            </template>
            <div class="tooltip-content">
              {{ t('agora', 'Only members of the selected group can see and participate in this inquiry. It will not be visible to other users.') }}
            </div>
          </NcPopover>
        </span>
      </NcCheckboxRadioSwitch>
      <p class="mode-description">
        {{ t('agora', 'Access: group · Owner: {group}', { group: selectedGroup }) }}
      </p>
    </div>
  </NcRadioGroup>

  <NcNoteCard
    type="info"
    class="group-mode-help"
  >
    <template v-if="groupAccessMode === 'open'">
      {{ t('agora', 'The inquiry is public; the group is only the owner. Choose this if you want the group to be credited or responsible for the inquiry, but everyone can still take part.') }}
    </template>
    <template v-else>
      {{ t('agora', 'The inquiry is private to the group. Choose this if only members of the selected group should see and take part in the inquiry.') }}
    </template>
  </NcNoteCard>
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
          :placeholder="t('agora', 'Enter title')"
          :helper-text="t('agora', 'Choose a meaningful title for your inquiry')"
          :label="t('agora', 'Enter title')"
          @update:model-value="inquiryTitle = $event"
          @submit="addInquiry"
        />
      </ConfigBox>

      <!-- Inquiry Type Selector -->
      <ConfigBox
        v-if="!hasPredefinedType"
        :name="t('agora', 'Inquiry type')"
        :label="t('agora', 'Inquiry type')"
      >
        <template #icon>
          <Component :is="InquiryGeneralIcons.Check" />
        </template>
        <RadioGroupDiv
          :model-value="localInquiryType"
          :options="inquiryTypeOptions"
          @update:model-value="updateLocalInquiryType($event)"
        />
      </ConfigBox>

      <!-- Selected Type Display -->
      <ConfigBox
        v-else
        :name="t('agora', 'Inquiry type')"
        :label="t('agora', 'Inquiry type')"
      >
        <template #icon>
          <Component :is="InquiryGeneralIcons.Check" />
        </template>
        <div class="selected-type">
          <strong>{{ currentInquiryTypeData?.label }}</strong>
          <p v-if="currentInquiryTypeData?.description" class="type-description">
            {{ currentInquiryTypeData.description }}
          </p>
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
          @click="addInquiry"
        >
          {{ adding ? t('agora', 'Creating …') : t('agora', 'Create inquiry') }}
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
  padding: 20px;
  max-width: 400px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin: 20px;
}

.create-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.selected-type {
  padding: 8px 0;
}

.type-description {
  color: var(--color-text-lighter);
  font-size: 0.9em;
  margin-top: 4px;
}

.access-settings {
  padding: 8px 0;
}

.access-radio-group {
  margin-bottom: 16px;
}

.groups-selection {
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

.group-mode-selection {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
}

.mode-option {
  padding: 6px 0;
}

.mode-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.mode-help-icon {
  cursor: help;
  color: var(--color-text-lighter);
  font-size: 0.9em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.mode-help-icon:focus-visible {
  color: var(--color-primary-element);
}

.mode-description {
  margin: 2px 0 0 26px;
  color: var(--color-text-lighter);
  font-size: 0.85em;
}

.group-mode-help {
  margin-top: 12px;
}
</style>

<style lang="css">
/* Unscoped because NcPopover mounts its content outside the component tree */
.agora-tooltip-popover .tooltip-content,
.tooltip-content {
  max-width: 280px;
  padding: 8px 10px;
  font-size: 0.85em;
  line-height: 1.4;
  color: var(--color-main-text);
}
</style>
