<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import ItemCard from './ItemCard.vue'
import AddItemToFamily from '../Modals/AddItemToFamily.vue'
import type { Item, InquiryOptionType, OptionFamily } from '../../Types/index.ts'
import { useOptionsStore } from '../../stores/options'
import { useInquiriesStore } from '../../stores/inquiries'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { getItemsForFamily } from '../../helpers/modules/itemHelpers'

const props = defineProps<{
  items: Item[]
  parentId: number
  targetType: 'option' | 'inquiry'
  optionTypes: InquiryOptionType[]
  familyOptionTypes?: InquiryOptionType[]
  family?: OptionFamily | null
  familyKey?: string
  isReadonly?: boolean
  appSettings?: Record<string, unknown>
}>()

const emit = defineEmits<{
  addOption: [optionType: string, parentId?: number]
  openDetail: [item: Item]
  updateItems: []
}>()

const optionsStore = useOptionsStore()
const inquiriesStore = useInquiriesStore()

const showAddModal = ref(false)
const draggingItemId = ref<number | null>(null)

const statusColumns = computed(() => {
  const cfg = (props.appSettings as any)?.optionFamilyTab?.[props.family?.key || 'kanban']
    ?.ui?.kanban_column
  if (Array.isArray(cfg) && cfg.length) {
    return cfg.map((c: any) => ({
      value: c.value,
      label: t('agora', c.label),
      color: c.color,
    }))
  }
  return [
    { value: 'draft',     label: t('agora', 'Draft'),     color: '#949494' },
    { value: 'active',    label: t('agora', 'Active'),    color: '#3498db' },
    { value: 'completed', label: t('agora', 'Completed'), color: '#27ae60' },
    { value: 'cancelled', label: t('agora', 'Cancelled'), color: '#e74c3c' },
  ]
})

const columnCount = computed(() => statusColumns.value.length)

/** Filter items for this layout (family + force_layouts) */
const familyKey = computed(() => props.familyKey ?? props.family?.family_type ?? '')
const kanbanItems = computed(() => {
	return  getItemsForFamily(props.items, familyKey.value)
})

const getItemsByStatus = (status: string) =>
  kanbanItems.value.filter(i => i.statusKey === status)

const getStatusLabel = (status: string) =>
  statusColumns.value.find(s => s.value === status)?.label || status

const handleDragStart = (e: DragEvent, item: Item) => {
  draggingItemId.value = item.id
  e.dataTransfer?.setData('text/plain', item.id.toString())
  e.dataTransfer!.effectAllowed = 'move'
}

const handleDragEnd = () => { draggingItemId.value = null }

const handleDrop = async (e: DragEvent, newStatus: string) => {
  e.preventDefault()
  const id = e.dataTransfer?.getData('text/plain')
  if (!id) return
  await changeStatus(parseInt(id, 10), newStatus)
}

const changeStatus = async (itemId: number, newStatus: string) => {
  try {
    if (props.targetType === 'option') {
      await optionsStore.setOptionStatus(itemId, newStatus)
    } else {
      await inquiriesStore.updateInquiryStatus(itemId, newStatus)
    }
    showSuccess(t('agora', 'Item moved to {column}', { column: getStatusLabel(newStatus) }))
    emit('updateItems')
  } catch (err) {
    console.error('Unable to change item status', err)
    showError(t('agora', 'Item status could not be updated'))
  }
}
console.log(" ITEMS IN KANBAN  ",props.items)
</script>

<template>
  <div class="kanban-layout">
    <div class="kanban-actions">
      <NcButton type="primary" class="add-kanban-btn" @click="showAddModal = true">
        <template #icon>
          <component :is="InquiryOptionIcons.Plus" :size="18" />
        </template>
        {{ t('agora', 'Add to board') }}
      </NcButton>
    </div>

    <AddItemToFamily
      v-if="showAddModal"
      family-type="kanban"
      :parent-id="parentId"
      :target-type="targetType"
      @close="showAddModal = false"
      @success="emit('updateItems')"
    />

    <!-- headers -->
    <div class="kanban-header" :style="{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }">
      <div
        v-for="status in statusColumns"
        :key="status.value"
        class="kanban-column-header"
        @dragover.prevent
        @drop="handleDrop($event, status.value)"
      >
        <div class="header-content">
          <span class="status-badge" :style="{ backgroundColor: status.color }" />
          <span class="status-label">{{ status.label }}</span>
          <span class="item-count">{{ getItemsByStatus(status.value).length }}</span>
        </div>
      </div>
    </div>

    <!-- columns -->
    <div class="kanban-board" :style="{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }">
      <div
        v-for="status in statusColumns"
        :key="status.value"
        class="kanban-column"
        @dragover.prevent
        @drop="handleDrop($event, status.value)"
      >
        <div class="column-items">
          <div
            v-for="item in getItemsByStatus(status.value)"
            :key="item.id"
            class="kanban-item"
            :class="{ dragging: draggingItemId === item.id }"
            draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragend="handleDragEnd"
          >
            <ItemCard
              :item="item"
              :compact="true"
              :parent-id="parentId"
              :target-type="targetType"
              :show-action="true"
              :family-type="familyKey || 'kanban'"
              @click="emit('openDetail', item)"
            />

            <div class="item-footer">
              <span class="item-id">#{{ item.id }}</span>
              <div class="item-actions">
                <NcActions>
                  <NcActionButton
                    v-for="target in statusColumns.filter(s => s.value !== item.statusKey)"
                    :key="target.value"
                    @click="changeStatus(item.id, target.value)"
                  >
                    <template #icon>
                      <div class="status-dot-small" :style="{ backgroundColor: target.color }" />
                    </template>
                    {{ t('agora', 'Move to {column}', { column: target.label }) }}
                  </NcActionButton>
                </NcActions>
              </div>
            </div>
          </div>

          <div
            v-if="getItemsByStatus(status.value).length === 0"
            class="empty-column"
            @dragover.prevent
            @drop="handleDrop($event, status.value)"
          >
            <div class="empty-icon">
              <component :is="InquiryOptionIcons.Board" :size="32" />
            </div>
            <p>{{ t('agora', 'No items in this column') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.kanban-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px;

  .kanban-actions {
    display: flex;
    justify-content: flex-end;

    .add-kanban-btn {
      background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
      border: none;
      color: white;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 20px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
      }
    }
  }

  .kanban-header {
    display: grid;
    gap: 16px;

    .kanban-column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: var(--color-main-background);
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
      border-bottom: 4px solid;

      &.status-draft { border-bottom-color: #949494; }
      &.status-active { border-bottom-color: #3498db; }
      &.status-completed { border-bottom-color: #27ae60; }
      &.status-cancelled { border-bottom-color: #e74c3c; }

      .header-content {
        display: flex;
        align-items: center;
        gap: 10px;

        .status-badge {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 0 2px var(--color-main-background);
        }

        .status-label {
          font-weight: 700;
          font-size: 15px;
        }

        .item-count {
          background: var(--color-background-dark);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-light);
        }
      }
    }
  }

  .kanban-board {
    display: grid;
    gap: 16px;
    min-height: 600px;

    .kanban-column {
      background: var(--color-background-dark);
      border-radius: 16px;
      padding: 20px 16px;

      .column-items {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .kanban-item {
          position: relative;
          cursor: grab;
          transition: all 0.2s ease;
          border-radius: 12px;
          background: var(--color-main-background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

          &:active {
            cursor: grabbing;
          }

          &.dragging {
            opacity: 0.5;
            transform: scale(0.98);
          }

          .item-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            border-top: 1px solid var(--color-border);
            font-size: 11px;
            color: var(--color-text-lighter);

            .item-id {
              font-family: monospace;
              background: var(--color-background-dark);
              padding: 2px 6px;
              border-radius: 4px;
            }

            .item-actions {
              opacity: 0;
              transition: opacity 0.2s ease;
            }
          }

          &:hover .item-footer .item-actions {
            opacity: 1;
          }
        }

        .empty-column {
          text-align: center;
          padding: 40px 20px;
          background: var(--color-background);
          border: 2px dashed var(--color-border);
          border-radius: 16px;

          .empty-icon {
            color: var(--color-text-lighter);
            margin-bottom: 12px;
            opacity: 0.5;
          }

          p {
            margin: 0;
            color: var(--color-text-lighter);
            font-style: italic;
            font-size: 13px;
          }
        }
      }
    }
  }
}

.status-dot-small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
