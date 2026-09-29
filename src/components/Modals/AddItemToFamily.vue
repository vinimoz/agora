<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcModal size="normal" :name="modalTitle" @close="$emit('close')">
    <div class="add-option-to-family-modal">
      <div class="modal-header">
        <div class="header-icon" :class="{ 'vote-icon': familyType === 'vote' }">
          <component :is="headerIcon" :size="32" />
        </div>
        <h3>{{ modalTitle }}</h3>
        <p class="modal-description">{{ modalDescription }}</p>
      </div>

      <div class="modal-content">
        <div class="search-section">
          <label>
            {{ targetType === 'inquiry'
                ? t('agora', 'Select an inquiry from this group')
                : t('agora', 'Select an option') }}
          </label>
          <SearchSelect
            v-model="selectedItem"
            :type="targetType === 'inquiry' ? 'inquiries' : 'options'"
            :inquiry-id="inquiryId"
            :available-item-ids="availableItemIds"
            :placeholder="t('agora', 'Search by title or #id …')"
            class="search-select"
          />
          <p v-if="targetType === 'inquiry' && availableItemIds.length === 0" class="hint">
            {{ t('agora', 'Only inquiries in the same group can be added to this vote.') }}
          </p>
        </div>

        <!-- Date range selection for timeline -->
        <div v-if="familyType === 'timeline' && selectedItem" class="timeline-config-section">
          <div class="config-header">
            <Clock :size="18" />
            <h4>{{ t('agora', 'Date range') }}</h4>
          </div>
          <div class="date-selector">
            <div class="date-field">
              <label>{{ t('agora', 'Start date') }} *</label>
              <NcDateTimePickerNative v-model="startDate" type="date" :clearable="false" required />
            </div>
            <div class="date-field">
              <label>{{ t('agora', 'End date (optional)') }}</label>
              <NcDateTimePickerNative v-model="endDate" type="date" :clearable="true" />
            </div>
          </div>
        </div>

        <!-- Column selection for kanban -->
        <div v-if="familyType === 'kanban' && selectedItem" class="kanban-config-section">
          <div class="config-header">
            <LayoutGrid :size="18" />
            <h4>{{ t('agora', 'Select column') }}</h4>
          </div>
          <div class="column-options">
            <button
              v-for="column in statusColumns"
              :key="column.value"
              class="column-option"
              :class="{ selected: targetStatus === column.value }"
              @click="targetStatus = column.value"
            >
              <span class="column-color" :style="{ backgroundColor: column.color }" />
              <span class="column-label">{{ column.label }}</span>
              <span v-if="targetStatus === column.value" class="check-icon">
                <Check :size="14" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" @click="$emit('close')">
          {{ t('agora', 'Cancel') }}
        </button>
        <button
          class="btn-primary"
          :disabled="!canAdd"
          :class="{ loading }"
          @click="add"
        >
          <component :is="actionIcon" :size="16" />
          {{ loading ? t('agora', 'Adding …') : actionButtonText }}
        </button>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcDateTimePickerNative from '@nextcloud/vue/components/NcDateTimePickerNative'
import { showSuccess, showError } from '@nextcloud/dialogs'
import SearchSelect from '../Base/modules/SearchSelect.vue'

import { useInquiryStore } from '../../stores/inquiry'
import { useInquiriesStore } from '../../stores/inquiries'
import { useOptionsStore } from '../../stores/options'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups'
import { InquiriesAPI } from '../../Api/index.ts'
import { getForceLayouts } from '../../helpers/modules/GenericItemHelper'

import type { Option, Inquiry, FamilyType } from '../../Types/index'
import { Plus, Vote, LayoutGrid, Clock, Check } from 'lucide-vue-next'

// ---------------------------------------------------------------------------
// Props / emits
// ---------------------------------------------------------------------------
type TargetType = 'option' | 'inquiry'
type VotableItem = Option | Inquiry
type MiscUpdateMap = Record<string, unknown>

const props = withDefaults(
  defineProps<{
    familyType: FamilyType
    /** 'option' (default) or 'inquiry' */
    targetType?: TargetType
    /**
     * In `option` mode: the inquiry id.
     * In `inquiry` mode: the inquiry *group* id (see useVoteContext docs).
     */
    inquiryId?: number
    /** Items already linked to this engine (hidden from the picker). */
    alreadyLinkedItemIds?: number[]
  }>(),
  {
    targetType: 'option',
    inquiryId: undefined,
    alreadyLinkedItemIds: () => [],
  },
)

const emit = defineEmits<{
  close: []
  success: []
  optionFamilyChanged: [payload: { optionId: number; familyKey: string; action: 'added' }]
}>()

// ---------------------------------------------------------------------------
// Stores
// ---------------------------------------------------------------------------
const inquiryStore = useInquiryStore()
const inquiriesStore = useInquiriesStore()
const optionsStore = useOptionsStore()
const inquiryGroupsStore = useInquiryGroupsStore()

// ---------------------------------------------------------------------------
// Which items may be selected?
// ---------------------------------------------------------------------------
/**
 * Options: every option of the current inquiry, minus already-linked ones.
 * Inquiries: **only** the ones in the current inquiry group.
 *
 * The "only group" rule is a hard product constraint: votes for inquiries are
 * scoped to a group. See `getEnginesByTarget` in supportEngine.ts.
 */
const availableItemIds = computed<number[]>(() => {
  const linked = new Set(props.alreadyLinkedItemIds ?? [])

  if (props.targetType === 'inquiry') {
    // Priority 1: resolved current group
    const currentGroup = inquiryGroupsStore.currentInquiryGroup
    const groupIds = currentGroup?.inquiryIds ?? []

    // Priority 2: any group the current inquiry belongs to
    let fallbackIds: number[] = []
    if (!groupIds.length) {
      const currentInquiryGroups =
        (inquiriesStore.byId[inquiryStore.id]?.inquiryGroups as number[] | undefined) ?? []
      fallbackIds = currentInquiryGroups.flatMap(
        (gid) => inquiryGroupsStore.byId(gid)?.inquiryIds ?? [],
      )
    }

    const ids = groupIds.length ? groupIds : fallbackIds
    return ids.filter((id) => !linked.has(id))
  }

  return (optionsStore.options ?? [])
    .map((o) => o.id)
    .filter((id) => !linked.has(id))
})

// ---------------------------------------------------------------------------
// Local state
// ---------------------------------------------------------------------------
const selectedItem = ref<VotableItem | null>(null)
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const targetStatus = ref<string | null>(null)
const loading = ref(false)

const statusColumns = [
  { value: 'draft', label: t('agora', 'Draft'), color: '#949494' },
  { value: 'active', label: t('agora', 'Active'), color: '#3498db' },
  { value: 'completed', label: t('agora', 'Completed'), color: '#27ae60' },
  { value: 'cancelled', label: t('agora', 'Cancelled'), color: '#e74c3c' },
]

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------
const modalTitle = computed(() => {
  const noun = props.targetType === 'inquiry' ? t('agora', 'inquiry') : t('agora', 'option')
  switch (props.familyType) {
    case 'vote':     return t('agora', 'Add {noun} to vote', { noun })
    case 'timeline': return t('agora', 'Add {noun} to timeline', { noun })
    case 'kanban':   return t('agora', 'Add {noun} to board', { noun })
    default:         return t('agora', 'Add {noun}', { noun })
  }
})

const modalDescription = computed(() => {
  if (props.familyType === 'vote' && props.targetType === 'inquiry') {
    return t('agora', 'Add an inquiry from this group to become a voting candidate.')
  }
  const noun = props.targetType === 'inquiry' ? t('agora', 'inquiry') : t('agora', 'option')
  switch (props.familyType) {
    case 'vote':     return t('agora', 'Add an existing {noun} to become a voting candidate.', { noun })
    case 'timeline': return t('agora', 'Add an existing {noun} to the timeline view.', { noun })
    case 'kanban':   return t('agora', 'Add an existing {noun} to the kanban board.', { noun })
    default:         return t('agora', 'Add an existing {noun} to this view.', { noun })
  }
})

const headerIcon = computed(() => {
  switch (props.familyType) {
    case 'vote':     return Vote
    case 'timeline': return Clock
    case 'kanban':   return LayoutGrid
    default:         return Plus
  }
})
const actionIcon = headerIcon

const actionButtonText = computed(() => {
  switch (props.familyType) {
    case 'vote':     return t('agora', 'Add to vote')
    case 'timeline': return t('agora', 'Add to timeline')
    case 'kanban':   return t('agora', 'Add to board')
    default:         return t('agora', 'Add')
  }
})

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const canAdd = computed(() => {
  if (!selectedItem.value) return false
  switch (props.familyType) {
    case 'timeline': return startDate.value !== null
    case 'kanban':   return targetStatus.value !== null
    default:         return true
  }
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildForceLayoutsUpdate(
  item: VotableItem,
  layout: 'vote' | 'timeline' | 'kanban',
): string[] {
  const current = getForceLayouts(item)
  return current.includes(layout) ? current : [...current, layout]
}

function currentStatusOf(item: VotableItem): string {
  if ('status' in item && item.status) {
    if (typeof item.status === 'object' && 'optionStatus' in item.status) {
      return (item.status as { optionStatus?: string }).optionStatus || 'draft'
    }
    if (typeof item.status === 'string') return item.status
  }
  return 'draft'
}

async function patchOption(item: Option, patch: MiscUpdateMap, status?: string): Promise<void> {
  const merged = { ...(item.miscFields || {}), ...patch }
  await optionsStore.updateOptionFromModal(
    item.id,
    status || currentStatusOf(item),
    merged as never,
  )
}

/**
 * Persist a miscFields patch on an Inquiry.
 * `inquiriesStore` has no action for this — call the API and refresh the list.
 */
async function patchInquiry(item: Inquiry, patch: MiscUpdateMap): Promise<void> {
  await inquiriesStore.updateInquiryMiscFields(item.id, patch)
}

async function patchItem(item: VotableItem, patch: MiscUpdateMap, status?: string): Promise<void> {
  if (props.targetType === 'inquiry') {
    await patchInquiry(item as Inquiry, patch)
  } else {
    await patchOption(item as Option, patch, status)
  }
}

// ---------------------------------------------------------------------------
// Family actions
// ---------------------------------------------------------------------------
async function addToVote(): Promise<void> {
  const item = selectedItem.value
  if (!item) return
  const updatedLayouts = buildForceLayoutsUpdate(item, 'vote')
  await patchItem(item, { force_layouts: JSON.stringify(updatedLayouts) })
  emit('optionFamilyChanged', { optionId: item.id, familyKey: 'vote', action: 'added' })
}

async function addToTimeline(): Promise<void> {
  const item = selectedItem.value
  if (!item || !startDate.value) return
  const updatedLayouts = buildForceLayoutsUpdate(item, 'timeline')
  const patch: MiscUpdateMap = {
    force_layouts: JSON.stringify(updatedLayouts),
    start_date: startDate.value.toISOString(),
  }
  if (endDate.value) patch.end_date = endDate.value.toISOString()
  await patchItem(item, patch)
  emit('optionFamilyChanged', { optionId: item.id, familyKey: 'timeline', action: 'added' })
}

async function addToKanban(): Promise<void> {
  const item = selectedItem.value
  if (!item || !targetStatus.value) return
  const updatedLayouts = buildForceLayoutsUpdate(item, 'kanban')
  await patchItem(
    item,
    { force_layouts: JSON.stringify(updatedLayouts) },
    targetStatus.value,
  )
  emit('optionFamilyChanged', { optionId: item.id, familyKey: 'kanban', action: 'added' })
}

async function add(): Promise<void> {
  if (!selectedItem.value) return

  loading.value = true
  try {
    switch (props.familyType) {
      case 'kanban':   await addToKanban(); break
      case 'timeline': await addToTimeline(); break
      case 'vote':     await addToVote(); break
    }

    try {
      await inquiryStore.load()
      await optionsStore.load()
      await inquiriesStore.load(true)
    } catch (refreshError) {
      console.warn('Refresh after add failed (non-fatal):', refreshError)
    }

    showSuccess(
      t('agora', '{noun} added successfully!', {
        noun: props.targetType === 'inquiry' ? t('agora', 'Inquiry') : t('agora', 'Option'),
      }),
    )
    emit('success')
    emit('close')
  } catch (error) {
    console.error(`Error adding ${props.targetType} to ${props.familyType}:`, error)
    showError(t('agora', 'Failed to add to {family}', { family: props.familyType }))
  } finally {
    loading.value = false
  }
}

watch(selectedItem, (v) => {
  if (v && !props.inquiryId) {
    console.warn('Selected item but no inquiry id was provided')
  }
})

onMounted(() => {
  if (!props.inquiryId) {
    console.warn('AddItemToFamily mounted without an inquiry id')
  }
})
</script>

<style scoped lang="scss">
.add-option-to-family-modal {
    padding: 0;
    max-width: 600px;
    background: var(--color-main-background);
    border-radius: 24px;
    overflow: hidden;

    .modal-header {
        text-align: center;
        padding: 32px 32px 24px;
        background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
        border-bottom: 1px solid var(--color-border);

        .header-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
            border-radius: 32px;
            margin-bottom: 16px;
            color: white;

            &.vote-icon {
                background: linear-gradient(135deg, #3498db 0%, #9b59b6 100%);
            }
        }

        h3 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 700;
        }

        .modal-description {
            margin: 0;
            font-size: 14px;
            color: var(--color-text-lighter);
        }
    }

    .modal-content {
        padding: 24px;

        .search-section {
            margin-bottom: 24px;

            label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                font-size: 14px;
            }

            .search-select {
                width: 100%;
            }
        }

        .timeline-config-section,
        .kanban-config-section,
        .vote-config-section {
            margin-top: 24px;

            .config-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid var(--color-border);

                svg {
                    color: var(--color-primary-element);
                }

                h4 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 600;
                }
            }
        }

        .date-selector {
            display: flex;
            flex-direction: column;
            gap: 16px;

            .date-field {
                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    font-size: 13px;
                }
            }
        }

        .column-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;

            .column-option {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 12px;
                background: var(--color-background-dark);
                border: 2px solid transparent;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;

                .column-color {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .column-label {
                    flex: 1;
                    font-size: 13px;
                    font-weight: 500;
                }

                .check-icon {
                    color: var(--color-success);
                }

                &:hover {
                    background: var(--color-background-hover);
                }

                &.selected {
                    border-color: var(--color-primary-element);
                    background: rgba(var(--color-primary-element-rgb), 0.05);
                }
            }
        }

        .vote-config-section {
            .engine-info-message {
                margin-bottom: 20px;
                padding: 16px;
                background: var(--color-background-dark);
                border-radius: 12px;

                .engine-badge-display {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: var(--color-main-background);
                    border-radius: 20px;
                    margin-bottom: 12px;
                    font-weight: 500;
                    font-size: 13px;

                    .engine-badge-mini {
                        font-size: 9px;
                        padding: 2px 8px;
                        border-radius: 12px;

                        &.single { background: #3498db20; color: #3498db; }
                        &.multi { background: #9b59b620; color: #9b59b6; }
                        &.flex { background: #e67e2220; color: #e67e22; }
                    }
                }

                .engine-description {
                    margin: 0;
                    font-size: 13px;
                    color: var(--color-text-lighter);
                    line-height: 1.5;
                }
            }

            .engine-config-details {
                padding: 16px;
                background: var(--color-background-dark);
                border-radius: 12px;

                .config-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;

                    .config-field {
                        label {
                            display: block;
                            margin-bottom: 6px;
                            font-size: 12px;
                            font-weight: 600;
                        }

                        .config-input, .config-select {
                            width: 100%;
                            padding: 8px 12px;
                            border: 1px solid var(--color-border);
                            border-radius: 8px;
                            background: var(--color-main-background);
                            font-size: 13px;
                            transition: all 0.2s;

                            &:focus {
                                outline: none;
                                border-color: var(--color-primary-element);
                                box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
                            }
                        }

                        .checkbox-label {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            cursor: pointer;

                            input {
                                width: 16px;
                                height: 16px;
                                cursor: pointer;
                            }

                            span {
                                font-size: 13px;
                                font-weight: normal;
                            }
                        }

                        .config-description {
                            margin: 4px 0 0 0;
                            font-size: 11px;
                            color: var(--color-text-lighter);
                        }
                    }
                }
            }
        }
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 20px 24px;
        background: var(--color-background-dark);
        border-top: 1px solid var(--color-border);

        .btn-secondary, .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }

        .btn-secondary {
            background: var(--color-background-hover);
            color: var(--color-main-text);

            &:hover:not(:disabled) {
                background: var(--color-background-dark);
                transform: translateY(-1px);
            }
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
            color: white;

            &.loading {
                opacity: 0.7;
                cursor: wait;
            }

            &:hover:not(:disabled):not(.loading) {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
            }
        }
    }
}
</style>
