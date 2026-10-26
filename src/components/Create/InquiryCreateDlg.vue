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
  type InquiryType,
} from '../../helpers/modules/InquiryHelper.ts'
import type { InquiryFamily } from '../../Types/inquiry.types.ts'

// Define props
interface Props {
  inquiryType?: InquiryType | null
  family: string | null
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
  defaultTitle: null,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'added', inquiry: { id: number; title: string }): void
  (e: 'update:selected-groups', groups: string[]): void
}>()

const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()

// ----------------------------------------------------------------------------
// Wizard state
// ----------------------------------------------------------------------------
type WizardStep = 'family' | 'type' | 'details'

const hasPredefinedType = computed(() => !!(props.inquiryType || props.responseType))
const showStepIndicator = computed(() => !hasPredefinedType.value)

const selectedFamily = ref<string | null>(props.family ?? null)
const localInquiryType = ref<string>(
  props.inquiryType?.inquiry_type ?? props.responseType ?? ''
)

const currentStep = ref<WizardStep>(
  hasPredefinedType.value ? 'details' : props.family ? 'type' : 'family'
)

// ----------------------------------------------------------------------------
// Data sources
// ----------------------------------------------------------------------------
const inquiryTypes = computed(() => sessionStore.appSettings.inquiryTypeTab || [])

const availableInquiryTypes = computed(() =>
  getAvailableInquiryTypesForCreation(inquiryTypes.value)
)

const availableFamilies = computed<InquiryFamily[]>(() => {
  const families = sessionStore.appSettings.inquiryFamilyTab || []
  const familiesWithTypes = new Set(availableInquiryTypes.value.map((t) => t.family))
  return families.filter((f) => familiesWithTypes.has(f.family_type))
})

const availableTypesForFamily = computed(() => {
  if (!selectedFamily.value) return []
  return availableInquiryTypes.value.filter((t) => t.family === selectedFamily.value)
})

const inquiryTypeOptions = computed(() => getInquiryTypeOptions(availableTypesForFamily.value))

const selectedType = computed(() => {
  if (props.inquiryType) {
    return props.inquiryType.inquiry_type
  }
  if (props.responseType) {
    return props.responseType
  }
  return localInquiryType.value
})

const currentInquiryTypeData = computed(() =>
  getInquiryTypeData(selectedType.value, inquiryTypes.value)
)

const selectedFamilyData = computed<InquiryFamily | null>(() => {
  if (!selectedFamily.value) return null
  return availableFamilies.value.find((f) => f.family_type === selectedFamily.value) ?? null
})

// ----------------------------------------------------------------------------
// Navigation helpers
// ----------------------------------------------------------------------------
const canGoBack = computed(() => {
  if (hasPredefinedType.value) return false
  if (currentStep.value === 'details') return true
  if (currentStep.value === 'type' && !props.family) return true
  return false
})

const canProceed = computed(() => {
  if (currentStep.value === 'family') return !!selectedFamily.value
  if (currentStep.value === 'type') return !!localInquiryType.value
  return false
})

function onFamilySelect(family: string) {
  if (selectedFamily.value !== family) {
    localInquiryType.value = ''
  }
  selectedFamily.value = family
}

function handleNext() {
  if (currentStep.value === 'family') currentStep.value = 'type'
  else if (currentStep.value === 'type') currentStep.value = 'details'
}

function handleBack() {
  if (currentStep.value === 'details') currentStep.value = 'type'
  else if (currentStep.value === 'type') currentStep.value = 'family'
}

function getFamilyIcon(family: InquiryFamily) {
  return InquiryGeneralIcons[family.icon] || InquiryGeneralIcons.Activity
}

function stepStatus(step: WizardStep): 'upcoming' | 'active' | 'done' {
  const order: WizardStep[] = ['family', 'type', 'details']
  const currentIdx = order.indexOf(currentStep.value)
  const stepIdx = order.indexOf(step)
  if (stepIdx < currentIdx) return 'done'
  if (stepIdx === currentIdx) return 'active'
  return 'upcoming'
}

// ----------------------------------------------------------------------------
// Existing state
// ----------------------------------------------------------------------------
const inquiryTitle = ref('')
const inquiryId = ref<number | null>(null)
const adding = ref(false)
const visibilityType = ref<'user' | 'groups'>('user')
const selectedGroup = ref<string | null>(null)
const groupVisibilityMode = ref<'open' | 'restricted'>('restricted')

const selectGroup = (group: string | null) => {
  selectedGroup.value = group
  emit('update:selected-groups', group ? [group] : [])
}

const updateLocalInquiryType = (newType: string) => {
  localInquiryType.value = newType
}

// Keep local type in sync with props
watch(
  () => props.inquiryType,
  (newType) => {
    if (newType && newType.inquiry_type) {
      localInquiryType.value = newType.inquiry_type
    }
  },
  { immediate: true }
)

watch(
  () => props.responseType,
  (newType) => {
    if (newType) {
      localInquiryType.value = newType
    }
  }
)

// Keep local family in sync with props
watch(
  () => props.family,
  (newFamily) => {
    if (newFamily) {
      selectedFamily.value = newFamily
      if (currentStep.value === 'family') currentStep.value = 'type'
    }
  }
)

// Pre-fill title
watch(
  () => props.defaultTitle,
  (newTitle) => {
    if (newTitle) {
      inquiryTitle.value = newTitle
    }
  },
  { immediate: true }
)

const titleIsEmpty = computed(() => inquiryTitle.value.trim() === '')
const disableAddButton = computed(() => titleIsEmpty.value || adding.value)

interface InquiryData {
  type: string
  title: string
  family: string
  visibility?: 'private' | 'groups' | 'everyone'
  parentId?: string | number | null
  locationId?: number | string | null
  categoryId?: number | string | null
  ownedGroup?: string
  description?: string
}

async function addInquiry() {
  try {
    adding.value = true
    const inquiryData: InquiryData = {
      type: selectedType.value,
      title: inquiryTitle.value.trim(),
      // Family from props (transform/response flow) or from the wizard step 1
      family: props.family || selectedFamily.value || '',
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

    // Add groups if groups visibility is selected
    if (visibilityType.value === 'groups' && selectedGroup.value) {
      inquiryData.ownedGroup = selectedGroup.value
      inquiryData.visibility = groupVisibilityMode.value === 'open' ? 'private' : 'groups'
    } else {
      inquiryData.visibility = 'private'
    }

    if (props.selectedMode === 'transform') {
      inquiryData.description = inquiryStore.description
    }

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
  visibilityType.value = 'user'
  selectedGroup.value = null
  groupVisibilityMode.value = 'restricted'
  emit('update:selected-groups', [])

  // Reset the wizard as well
  selectedFamily.value = props.family ?? null
  localInquiryType.value = props.inquiryType?.inquiry_type ?? props.responseType ?? ''
  currentStep.value = hasPredefinedType.value
    ? 'details'
    : props.family
      ? 'type'
      : 'family'
}
</script>

<template>
  <!-- Overlay pour le fond flou -->
  <div
    class="dialog-overlay"
    @click="emit('close')"
  >
    <!-- Dialog container -->
    <div
      class="create-dialog"
      @click.stop
    >
      <!-- Wizard step indicator (only shown when no type is predefined) -->
      <div
        v-if="showStepIndicator"
        class="wizard-steps"
        role="progressbar"
      >
        <div
          class="wizard-step"
          :class="stepStatus('family')"
        >
          <span class="step-number">{{ stepStatus('family') === 'done' ? '✓' : '1' }}</span>
          <span class="step-label">{{ t('agora', 'Family') }}</span>
        </div>
        <div
          class="wizard-step"
          :class="stepStatus('type')"
        >
          <span class="step-number">{{ stepStatus('type') === 'done' ? '✓' : '2' }}</span>
          <span class="step-label">{{ t('agora', 'Type') }}</span>
        </div>
        <div
          class="wizard-step"
          :class="stepStatus('details')"
        >
          <span class="step-number">3</span>
          <span class="step-label">{{ t('agora', 'Details') }}</span>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- STEP 1 — FAMILY                                                       -->
      <!-- ===================================================================== -->
      <ConfigBox
        v-if="currentStep === 'family'"
        :name="t('agora', 'Choose a family')"
      >
        <template #icon>
          <Component :is="InquiryGeneralIcons.Activity" />
        </template>
        <p class="step-description">
          {{ t('agora', 'Select the family that best matches your inquiry.') }}
        </p>

        <NcRadioGroup
          :model-value="selectedFamily"
          :label="t('agora', 'Inquiry family')"
          :description="t('agora', 'A family groups related inquiry types together.')"
          @update:model-value="onFamilySelect($event)"
        >
          <div
            v-for="family in availableFamilies"
            :key="family.family_type"
            class="family-item"
          >
            <NcCheckboxRadioSwitch
              :value="family.family_type"
              type="radio"
              name="family-selection"
            >
              <span class="family-label">
                <Component :is="getFamilyIcon(family)" />
                {{ family.label }}
              </span>
              <span
                v-if="family.description"
                class="family-description"
              >{{ family.description }}</span>
            </NcCheckboxRadioSwitch>
          </div>
        </NcRadioGroup>
      </ConfigBox>

      <!-- ===================================================================== -->
      <!-- STEP 2 — TYPE                                                         -->
      <!-- ===================================================================== -->
      <ConfigBox
        v-else-if="currentStep === 'type'"
        :name="t('agora', 'Choose the inquiry type')"
      >
        <template #icon>
          <Component :is="InquiryGeneralIcons.Check" />
        </template>
        <p class="step-description">
          <template v-if="selectedFamilyData">
            {{ t('agora', 'Choose the inquiry type within "{family}".', { family: selectedFamilyData.label }) }}
          </template>
          <template v-else>
            {{ t('agora', 'Select the type of inquiry you want to create.') }}
          </template>
        </p>
        <RadioGroupDiv
          :model-value="localInquiryType"
          :options="inquiryTypeOptions"
          @update:model-value="updateLocalInquiryType($event)"
        />
      </ConfigBox>

      <!-- ===================================================================== -->
      <!-- STEP 3 — DETAILS                                                      -->
      <!-- ===================================================================== -->
      <template v-else>
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
              :model-value="visibilityType"
              :label="t('agora', 'Choose who is opening this inquiry')"
              class="access-radio-group"
              :description="t('agora', 'Choose who is opening this inquiry')"
              @update:model-value="visibilityType = $event"
            >
              <NcCheckboxRadioSwitch value="user">
                {{ t('agora', 'Only me (personal inquiry)') }}
              </NcCheckboxRadioSwitch>

              <NcCheckboxRadioSwitch value="groups">
                {{ t('agora', 'Open with this group') }}
              </NcCheckboxRadioSwitch>
            </NcRadioGroup>

            <!-- Group Selection -->
            <div
              v-if="visibilityType === 'groups'"
              class="groups-selection"
            >
              <h4 class="groups-title">
                {{ t('agora', 'Select group') }}
              </h4>
              <div class="groups-list">
                <NcRadioGroup
                  :model-value="selectedGroup"
                  :label="t('agora', 'Choose the group that will own this inquiry')"
                  :description="
                    t('agora', 'Choose which of your groups is responsible for this inquiry')
                  "
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

              <!-- Group visibility mode -->
              <div
                v-if="selectedGroup"
                class="group-mode-selection"
              >
                <NcRadioGroup
                  :model-value="groupVisibilityMode"
                  :label="t('agora', 'How should this group access the inquiry?')"
                  @update:model-value="groupVisibilityMode = $event"
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
                            {{
                              t(
                                'agora',
                                'Everyone can see and participate in this inquiry. The selected group is recorded as the owner (useful for reporting, moderation and follow-up).'
                              )
                            }}
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
                            {{
                              t(
                                'agora',
                                'Only members of the selected group can see and participate in this inquiry. It will not be visible to other users.'
                              )
                            }}
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
                  <template v-if="groupVisibilityMode === 'open'">
                    {{
                      t(
                        'agora',
                        'The inquiry is public; the group is only the owner. Choose this if you want the group to be credited or responsible for the inquiry, but everyone can still take part.'
                      )
                    }}
                  </template>
                  <template v-else>
                    {{
                      t(
                        'agora',
                        'The inquiry is private to the group. Choose this if only members of the selected group should see and take part in the inquiry.'
                      )
                    }}
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

        <!-- Selected family + type summary -->
        <ConfigBox
          :name="t('agora', 'Inquiry type')"
          :label="t('agora', 'Inquiry type')"
        >
          <template #icon>
            <Component :is="InquiryGeneralIcons.Check" />
          </template>
          <div class="selected-type">
            <strong>{{ currentInquiryTypeData?.label }}</strong>
            <p
              v-if="currentInquiryTypeData?.description"
              class="type-description"
            >
              {{ currentInquiryTypeData.description }}
            </p>
            <p
              v-if="selectedFamilyData"
              class="type-family"
            >
              {{ t('agora', 'Family:') }} {{ selectedFamilyData.label }}
            </p>
          </div>
        </ConfigBox>
      </template>

      <!-- ===================================================================== -->
      <!-- BUTTONS                                                               -->
      <!-- ===================================================================== -->
      <div class="create-buttons">
        <NcButton @click="emit('close')">
          {{ t('agora', 'Cancel') }}
        </NcButton>

        <NcButton
          v-if="canGoBack"
          @click="handleBack"
        >
          {{ t('agora', 'Back') }}
        </NcButton>

        <NcButton
          v-if="currentStep !== 'details'"
          :disabled="!canProceed"
          variant="primary"
          @click="handleNext"
        >
          {{ t('agora', 'Next') }}
        </NcButton>

        <NcButton
          v-else
          :disabled="disableAddButton"
          variant="primary"
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
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin: 20px;
}

/* ------------------------------------------------------------------------- */
/* Wizard step indicator                                                      */
/* ------------------------------------------------------------------------- */
.wizard-steps {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.wizard-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0.55;
  transition: opacity 0.2s ease;
}

.wizard-step.active {
  opacity: 1;
}

.wizard-step.done {
  opacity: 0.85;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-background-dark);
  color: var(--color-main-text);
  font-weight: 600;
  font-size: 0.85em;
  border: 2px solid var(--color-border);
}

.wizard-step.active .step-number {
  background: var(--color-primary-element);
  color: var(--color-primary-element-text);
  border-color: var(--color-primary-element);
}

.wizard-step.done .step-number {
  background: var(--color-success);
  color: var(--color-primary-element-text);
  border-color: var(--color-success);
}

.step-label {
  font-size: 0.8em;
  text-align: center;
  color: var(--color-text-lighter);
}

.step-description {
  margin: 0 0 12px 0;
  color: var(--color-text-lighter);
  font-size: 0.95em;
}

/* ------------------------------------------------------------------------- */
/* Family selection                                                          */
/* ------------------------------------------------------------------------- */
.family-item {
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.family-item:last-child {
  border-bottom: none;
}

.family-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.family-description {
  display: block;
  margin-top: 4px;
  margin-left: 24px;
  font-size: 0.85em;
  color: var(--color-text-lighter);
}

/* ------------------------------------------------------------------------- */
/* Bottom buttons                                                            */
/* ------------------------------------------------------------------------- */
.create-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

/* ------------------------------------------------------------------------- */
/* Step 3 – selected type summary                                            */
/* ------------------------------------------------------------------------- */
.selected-type {
  padding: 8px 0;
}

.type-description {
  color: var(--color-text-lighter);
  font-size: 0.9em;
  margin-top: 4px;
}

.type-family {
  color: var(--color-text-lighter);
  font-size: 0.85em;
  margin-top: 2px;
  font-style: italic;
}

/* ------------------------------------------------------------------------- */
/* Access settings (unchanged)                                               */
/* ------------------------------------------------------------------------- */
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
