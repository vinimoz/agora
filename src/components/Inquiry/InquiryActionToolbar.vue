<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { watch, ref, computed, nextTick } from 'vue' 
import { useInquiryStore } from '../../stores/inquiry'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { useSessionStore } from '../../stores/session.ts'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'
import {
  getInquiryTypeData,
} from '../../helpers/modules/InquiryHelper.ts'

import NcButton from '@nextcloud/vue/components/NcButton'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import InquiryItemActions from './InquiryItemActions.vue'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import {
  canViewToggle,
  getAvailableResponseTypesWithPermissions,
  getAvailableTransformTypesWithPermissions,
  createInquiryContext,
} from '../../utils/permissions.ts'

// Props
const props = defineProps<{
  inquiryStore: useInquiryStore
  sessionStore: useSessionStore
  isSaving?: boolean
  isReadonly?: boolean
}>()

const inquiriesStore = useInquiriesStore()


// Emits
const emit = defineEmits<{
  save: []
  allowedResponse: [responseType: string]
  allowedTransformation: [transformType: string]
}>()


// Context for permissions
const context = computed(() => createInquiryContext(props.inquiryStore, props.sessionStore.appSettings))

const selectedStatus = ref(props.inquiryStore.status.moderationStatus || 'pending')

const statusOptions = [
  { id: 'pending', label: t('agora', 'Pending'), value: 'pending' },
  { id: 'accepted', label: t('agora', 'Accepted'), value: 'accepted' },
  { id: 'rejected', label: t('agora', 'Rejected'), value: 'rejected' },
]

const inquiryAccess = computed({
  get: () => props.inquiryStore.status.publicationStatus === 'pending',

  set: async (value) => {
    if (!value) return;

    try {
      const { currentUser, appSettings } = props.sessionStore;
      const { isOfficial } = currentUser;
      const { officialBypassModeration, useModeration } = appSettings;

      const shouldAutoAccept =
        (isOfficial && officialBypassModeration) || !useModeration;
    
      const status = shouldAutoAccept ? 'accepted' : 'pending';
    await setModerationStatus(status);

    } catch (error) {
      console.error('Failed to set moderation status:', error);
    }
  },
});

watch(() => props.inquiryStore.status.moderationStatus, (newStatus) => {
  if (newStatus) {
    selectedStatus.value = newStatus
  }
})

const setModerationStatus = async (status: string) => {
  try {
  if (status === 'accepted') {
    await props.inquiryStore.submitInquiry("submit_for_accepted")
    inquiriesStore.submitInquiry(props.inquiryStore.id,"submit_for_accepted")
    showSuccess(t('agora','Inquiry accepted'))
  } else if (status === 'rejected') {
    await props.inquiryStore.submitInquiry("submit_for_rejected")
    inquiriesStore.submitInquiry(props.inquiryStore.id,"submit_for_rejected")
    showSuccess(t('agora','Inquiry rejected'))
  } else if (status === 'pending') {
      await props.inquiryStore.submitInquiry("submit_for_moderate")
      inquiriesStore.submitInquiry(props.inquiryStore.id,"submit_for_moderate")
      showSuccess(t('agora','Inquiry submitted for moderation'))
  }
    await nextTick()
  } catch {
    showError(t('agora','Failed to submit inquiry for moderation'))
  }

}
// Get available types directly (already filtered by permissions)
const availableResponseTypes = computed(() => {
  const inquiryTypes = props.sessionStore.appSettings.inquiryTypeTab || []
  return getAvailableResponseTypesWithPermissions(props.inquiryStore.type, inquiryTypes, context.value)
})

const availableTransformTypes = computed(() => {
  const inquiryTypes = props.sessionStore.appSettings.inquiryTypeTab || []
  return getAvailableTransformTypesWithPermissions(props.inquiryStore.type, inquiryTypes, context.value)
})

// Check if menus should be shown (just check if any types available)
const showActionsMenu = computed(() => availableResponseTypes.value.length > 0)
const showTransformActionsMenu = computed(() => availableTransformTypes.value.length > 0)

// Enriched types for display
const enrichedResponseTypes = computed(() => {
  const inquiryTypes = props.sessionStore.appSettings.inquiryTypeTab || []
  return availableResponseTypes.value.map(responseType => {
    const typeData = getInquiryTypeData(responseType.inquiry_type, inquiryTypes)
    return {
      ...responseType,
      icon: typeData.icon,
      label: typeData.label
    }
  })
})

const enrichedTransformTypes = computed(() => {
  const inquiryTypes = props.sessionStore.appSettings.inquiryTypeTab || []

  return availableTransformTypes.value.map(transformType => {
    const typeData = getInquiryTypeData(transformType.inquiry_type, inquiryTypes)
    return {
      ...transformType,
      icon: typeData.icon,
      label: typeData.label
    }
  })
})


const getStatusLabel = (status: string) => {
  const option = statusOptions.find(opt => opt.value === status)
  return option ? option.label : status
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'rejected':
      return 'color: var(--color-error)'
    case 'accepted':
      return 'color: var(--color-success)'
    case 'pending':
      return 'color: var(--color-warning)'
    default:
      return ''
  }
}

const canEditInquiry = computed(() => !props.isReadonly)

// Check if save button should be shown
const showSaveButton = computed(() => canEditInquiry.value)

// Handle save
const handleSave = () => {
  emit('save')
}

// Handle allowed response
const handleAllowedResponse = (responseType: string) => {
  emit('allowedResponse', responseType)
}

// Handle allowed transformation
const handleAllowedTransformation = (transformType: string) => {
  emit('allowedTransformation', transformType)
}
</script>

<template>
	<div class="inquiry-action-toolbar">
		<div class="left-actions">
			<!-- Save and Response buttons -->
			<div class="primary-actions">
				<NcButton
					v-if="showSaveButton"
					:disabled="isSaving"
					type="primary"
					class="save-button"
					@click.prevent="handleSave"
				>
					<template #icon>
						<component :is="InquiryGeneralIcons.Save" :size="16" />
					</template>
					{{ t('agora', 'Save') }}
					<span v-if="isSaving" class="loading-icon"></span>
				</NcButton>

                <!-- Allowed Response types menu -->
				<NcActions
						v-if="showActionsMenu && enrichedResponseTypes.length > 0"
						menu-name="Allowed Response"
						class="response-actions"
						>
						<template #icon>
							<component :is="InquiryGeneralIcons.Reply" :size="20" />
						</template>
				<NcActionButton
						v-for="responseType in enrichedResponseTypes"
						:key="responseType.inquiry_type"
						@click="handleAllowedResponse(responseType.inquiry_type)"
						>
						<template #icon>
							<component
									:is="responseType.icon"
									v-if="responseType.icon"
									:size="20"
									/>
							<span v-else>📄</span>
						</template>
						{{ responseType.label }}
				</NcActionButton>
				</NcActions>

                <!-- Allowed Transformation Type -->
                <NcActions
						v-if="showTransformActionsMenu && enrichedTransformTypes.length > 0"
						menu-name="Allowed Transformation"
						class="transform-actions"
						>
						<template #icon>
							<component :is="InquiryGeneralIcons.Transform" :size="20" />
						</template>
				<NcActionButton
						v-for="transformType in enrichedTransformTypes"
						:key="transformType.inquiry_type"
						@click="handleAllowedTransformation(transformType.inquiry_type)"
						>
						<template #icon>
							<component
									:is="transformType.icon"
									v-if="transformType.icon"
									:size="20"
									/>
							<span v-else>🔄</span>
						</template>
						{{ transformType.label }}
				</NcActionButton>
				</NcActions>

            </div>
        </div>

        <!-- Right: Access switch and item actions -->
        <div class="right-actions">
            <div class="moderation-controls">
                <div v-if="inquiryStore.configuration.visibility === 'private' && inquiryStore.status.moderationStatus !== 'rejected'" class="access-control">
                    <label class="control-label">{{ t('agora', 'Submit to moderation') }}</label>
                    <NcCheckboxRadioSwitch
                            v-model="inquiryAccess"
                            type="switch"
                            class="moderation-switch"
                            />
                </div>

                <div v-if="sessionStore.currentUser.isModerator">
                    <div v-if="inquiryStore.status.publicationStatus === 'pending' && inquiryStore.status.moderationStatus === 'pending'" class="access-control">
                        <label class="control-label">{{ t('agora', 'Moderate') }}</label>
                        <NcSelect
                                v-model="selectedStatus"
                                :options="statusOptions"
                                :clearable="false"
                                :multiple="false"
				:label-outside="true"
                                class="status-select"
                                @update:model-value="(selected) => setModerationStatus(selected.value)"
                                />
                    </div>
                </div>
            </div>

            <div class="status-section">
                <div class="status-badge" :style="getStatusColor(inquiryStore.status.moderationStatus)">
                    {{ getStatusLabel(inquiryStore.status.moderationStatus) }}
                </div>
            </div>

            <div
                    v-if="canViewToggle(context)"
                    class="item-actions"
                    >
                    <InquiryItemActions :key="`actions-${inquiryStore.id}`" :inquiry="inquiryStore" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.inquiry-action-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 12px 20px;
    background: linear-gradient(135deg, var(--color-background-dark), var(--color-background-darker));
    border: 2px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    height: 56px;
}

.left-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
}

.right-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
}

.primary-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.save-button,
:deep(.response-actions button),
:deep(.transform-actions button) {
    padding: 10px 18px;
    height: 40px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    white-space: nowrap;
    min-width: 120px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

.save-button {
    background: linear-gradient(135deg, var(--color-primary-element), var(--color-primary-element-hover));
    border: 2px solid var(--color-primary-element);
    color: white;

    &:hover {
        background: linear-gradient(135deg, var(--color-primary-element-hover), var(--color-primary-element));
        border-color: var(--color-primary-element-hover);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
}

/* Fix NcActions button styling */
:deep(.response-actions),
:deep(.transform-actions) {
    .action-item {
        display: flex;
        align-items: center;
        justify-content: center;
        
        button {
            padding: 10px 18px;
            height: 40px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            background: var(--color-main-background);
            border: 2px solid var(--color-border);
            color: var(--color-main-text);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-width: 140px;
            
            &:hover {
                border-color: var(--color-primary-element);
                background: var(--color-primary-light);
            }
            
            .action-button__icon {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 6px;
            }
        }
    }
    
    /* Dropdown menu styling */
    .menu {
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid var(--color-border);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        margin-top: 8px;
        
        .action-button {
            padding: 10px 16px;
            border-radius: 8px;
            margin: 4px;
            font-size: 14px;
            min-height: 40px;
            display: flex;
            align-items: center;
            gap: 10px;
            
            &:hover {
                background: var(--color-primary-light);
            }
            
            .action-button__icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}

.moderation-controls {
    display: flex;
    align-items: center;
    gap: 16px;
}

.access-control {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: var(--color-main-background);
    border: 2px solid var(--color-border);
    border-radius: 12px;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: var(--color-primary-light);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .control-label {
        font-weight: 600;
        color: var(--color-text-lighter);
        white-space: nowrap;
        margin: 0;
        font-size: 13px;
    }
}

.moderation-switch {
    :deep(.checkbox-radio-switch) {
        .checkbox-radio-switch__switch {
            width: 40px;
            height: 22px;
            border-radius: 11px;

            &::after {
                width: 18px;
                height: 18px;
                border-radius: 9px;
            }
        }
    }
}

.status-section {
    .status-badge {
        font-weight: 700;
        padding: 8px 16px;
        border-radius: 12px;
        font-size: 13px;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        min-width: 100px;
        text-align: center;
        transition: all 0.2s ease;
        
        /* Force darker text colors with better contrast */
        &[style*="color: var(--color-success)"] {
            color: #0a5228 !important; /* Even darker green for better contrast */
            background: linear-gradient(135deg, #e6f4ea, #d4eedd);
            border: 2px solid #2ecc71;
            font-weight: 800;
        }
        
        &[style*="color: var(--color-error)"] {
            color: #a83232 !important; /* Darker red */
            background: linear-gradient(135deg, #fdeaea, #fbd5d5);
            border: 2px solid #e74c3c;
            font-weight: 800;
        }
        
        &[style*="color: var(--color-warning)"] {
            color: #7a5900 !important; /* Darker orange/brown */
            background: linear-gradient(135deg, #fff8e6, #ffefcc);
            border: 2px solid #f39c12;
            font-weight: 800;
        }
        
        /* Fallback for any other status */
        &:not([style*="color: var(--color-"]) {
            color: var(--color-main-text) !important;
            background: linear-gradient(135deg, var(--color-background-darker), var(--color-background-dark));
            border: 2px solid var(--color-border);
        }
    }
}

.status-select {
    width: 140px;
    
    :deep(.v-select) {
        .vs__dropdown-toggle {
            border: 2px solid var(--color-border);
            border-radius: 10px;
            padding: 6px 12px;
            background: var(--color-main-background);
            min-height: 36px;
            font-size: 13px;
            
            &:hover {
                border-color: var(--color-primary-element);
            }
        }
        
        .vs__selected {
            font-weight: 600;
            color: var(--color-main-text);
            font-size: 13px;
        }
        
        .vs__actions {
            padding: 0;
        }
        
        .vs__dropdown-menu {
            border: 2px solid var(--color-border);
            border-radius: 10px;
            margin-top: 4px;
            max-height: 200px;
            overflow-y: auto;
            
            .vs__dropdown-option {
                padding: 8px 12px;
                font-size: 13px;
                
                &--highlight {
                    background: var(--color-primary-light);
                    color: var(--color-primary-element);
                }
            }
        }
    }
}

.item-actions {
    :deep(.nc-actions) {
        button {
            padding: 10px 18px;
            height: 40px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            background: var(--color-background-dark);
            border: 2px solid var(--color-border);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            white-space: nowrap;
            min-width: 120px;
            
            &:hover {
                background: var(--color-primary-light);
                border-color: var(--color-primary-element);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

.loading-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 8px;
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
@media (max-width: 1024px) {
    .inquiry-action-toolbar {
        flex-wrap: wrap;
        height: auto;
        padding: 16px;
        gap: 12px;
        min-height: auto;
    }
    
    .left-actions,
    .right-actions {
        width: 100%;
        justify-content: center;
    }
    
    .primary-actions {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
    
    .moderation-controls {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
    
    .status-section {
        .status-badge {
            min-width: 80px;
            padding: 6px 12px;
        }
    }
}

@media (max-width: 768px) {
    .inquiry-action-toolbar {
        padding: 12px;
    }
    
    .save-button,
    :deep(.response-actions button),
    :deep(.transform-actions button),
    .item-actions :deep(.nc-actions button) {
        font-size: 13px;
        padding: 8px 14px;
        height: 36px;
        min-width: 100px;
    }
    
    :deep(.response-actions),
    :deep(.transform-actions) {
        .action-item button {
            min-width: 120px;
        }
    }
    
    .access-control {
        padding: 6px 10px;
        gap: 8px;
        
        .control-label {
            font-size: 12px;
        }
    }
    
    .status-select {
        width: 120px;
        
        :deep(.v-select .vs__dropdown-toggle) {
            padding: 4px 10px;
            min-height: 34px;
            font-size: 12px;
        }
    }
    
    .moderation-switch :deep(.checkbox-radio-switch .checkbox-radio-switch__switch) {
        width: 36px;
        height: 20px;
        
        &::after {
            width: 16px;
            height: 16px;
        }
    }
}

@media (max-width: 480px) {
    .inquiry-action-toolbar {
        padding: 10px;
    }
    
    .primary-actions {
        flex-direction: column;
        width: 100%;
        
        .save-button,
        :deep(.response-actions),
        :deep(.transform-actions) {
            width: 100%;
            justify-content: center;
        }
    }
    
    .right-actions {
        flex-direction: column;
        width: 100%;
        gap: 12px;
    }
    
    .moderation-controls {
        width: 100%;
        justify-content: space-between;
    }
    
    .access-control {
        flex: 1;
        justify-content: space-between;
    }
    
    .status-section {
        width: 100%;
        display: flex;
        justify-content: center;
        
        .status-badge {
            width: 100%;
            max-width: 200px;
        }
    }
    
    .item-actions {
        width: 100%;
        display: flex;
        justify-content: center;
        
        :deep(.nc-actions button) {
            width: 100%;
            max-width: 200px;
        }
    }
}
</style>
