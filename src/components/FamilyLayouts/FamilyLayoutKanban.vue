<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from "vue";
import { t } from "@nextcloud/l10n";
import NcButton from "@nextcloud/vue/components/NcButton";
import NcActions from "@nextcloud/vue/components/NcActions";
import NcActionButton from "@nextcloud/vue/components/NcActionButton";
import { InquiryOptionIcons } from "../../utils/icons.ts";
import ItemCard from "./ItemCard.vue";
import AddItemToFamily from "../Modals/AddItemToFamily.vue";
import type {
  Item,
  InquiryOptionType,
  OptionFamily,
  InquiryFamily,
  KanbanStatusField,
  KanbanMode,
  KanbanColumn,
  KanbanPermissions,
} from "../../Types/index.ts";
import { useOptionsStore } from "../../stores/options";
import { useInquiriesStore } from "../../stores/inquiries";
import { showSuccess, showError } from "@nextcloud/dialogs";
import { getItemsForFamily } from "../../helpers/modules/itemHelpers";

const props = defineProps<{
  items: Item[];
  parentId: number;
  targetType: "option" | "inquiry";
  optionTypes: InquiryOptionType[];
  familyOptionTypes?: InquiryOptionType[];
  family?: OptionFamily | InquiryFamily | null;
  familyKey?: string;
  isReadonly?: boolean;
  appSettings?: Record<string, unknown>;
  statusField?: KanbanStatusField;
  kanbanMode?: KanbanMode;
  kanbanColumns?: KanbanColumn[];
  kanbanPermissions?: Partial<KanbanPermissions>;
  kanbanFilters?: { types?: string[]; families?: string[] };
}>();

const emit = defineEmits<{
  addOption: [optionType: string, parentId?: number];
  addInquiry: [inquiryType: string, parentId?: number];
  openDetail: [item: Item];
  updateItems: [];
  statusChange: [
    payload: {
      itemId: number;
      field: KanbanStatusField;
      oldValue: string;
      newValue: string;
      mode: KanbanMode;
    },
  ];
}>();

const optionsStore = useOptionsStore();
const inquiriesStore = useInquiriesStore();

const showAddModal = ref(false);
const draggingItemId = ref<number | null>(null);

// ---------------------------------------------------------------------------
// Status field & mode resolution
// ---------------------------------------------------------------------------

const resolvedStatusField = computed<KanbanStatusField>(() => {
  if (props.statusField) return props.statusField;
  return props.targetType === "option" ? "optionStatus" : "inquiryStatus";
});

const resolvedMode = computed<KanbanMode>(() => props.kanbanMode ?? "status");

const permissions = computed<KanbanPermissions>(() => ({
  view: true,
  move: !props.isReadonly,
  changeStatus: !props.isReadonly && resolvedMode.value === "status",
  ...props.kanbanPermissions,
}));

// ---------------------------------------------------------------------------
// Column resolution
// ---------------------------------------------------------------------------

const PUBLICATION_STATUSES: KanbanColumn[] = [
  { value: "draft", label: t("agora", "Draft"), color: "#949494" },
  { value: "pending", label: t("agora", "Pending"), color: "#f39c12" },
  { value: "published", label: t("agora", "Published"), color: "#27ae60" },
  { value: "archived", label: t("agora", "Archived"), color: "#7f8c8d" },
  { value: "deleted", label: t("agora", "Deleted"), color: "#e74c3c" },
];

const MODERATION_STATUSES: KanbanColumn[] = [
  { value: "draft", label: t("agora", "Draft"), color: "#949494" },
  { value: "pending", label: t("agora", "Pending"), color: "#f39c12" },
  { value: "accepted", label: t("agora", "Accepted"), color: "#27ae60" },
  { value: "rejected", label: t("agora", "Rejected"), color: "#e74c3c" },
];

/** Normalise a family's `statuses` into KanbanColumn[]. Accepts both:
 *  - `['draft:Draft', 'active:Active', ...]` (legacy seed strings)
 *  - `[{ value: 'draft', label: 'Draft', color: '#…' }]` (rich objects)
 */
function normaliseFamilyStatuses(raw: unknown): KanbanColumn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s: any): KanbanColumn | null => {
      if (typeof s === "string") {
        const idx = s.indexOf(":");
        if (idx >= 0) {
          return {
            value: s.substring(0, idx),
            label: t("agora", s.substring(idx + 1)),
          };
        }
        return { value: s, label: s };
      }
      if (s && typeof s === "object" && s.value) {
        return {
          value: String(s.value),
          label: t("agora", String(s.label ?? s.value)),
          color: s.color,
        };
      }
      return null;
    })
    .filter((c): c is KanbanColumn => c !== null);
}

const statusColumns = computed<KanbanColumn[]>(() => {
  // 1. Explicit override
  if (props.kanbanColumns?.length) return props.kanbanColumns;

  const field = resolvedStatusField.value;

  // 2. Standard status-field defaults
  if (field === "publicationStatus") return PUBLICATION_STATUSES;
  if (field === "moderationStatus") return MODERATION_STATUSES;
  if (field === "workflowStatus") return []; // future engine — no columns yet

  // 3. Business statuses → family-provided values
  if (field === "inquiryStatus" || field === "optionStatus") {
    // 3a. Family-level statuses (preferred)
    const fromFamily = normaliseFamilyStatuses((props.family as any)?.statuses);
    if (fromFamily.length) return fromFamily;

    // 3b. Legacy option-family UI config (existing behaviour)
    if (field === "optionStatus") {
      const cfg = (props.appSettings as any)?.optionFamilyTab?.[
        (props.family as any)?.family_type || "kanban"
      ]?.ui?.kanban_column;
      if (Array.isArray(cfg) && cfg.length) {
        return cfg.map((c: any) => ({
          value: c.value,
          label: t("agora", c.label),
          color: c.color,
        }));
      }
    }
  }

  // 4. Last-resort fallback for business statuses
  return [
    { value: "draft", label: t("agora", "Draft"), color: "#949494" },
    { value: "active", label: t("agora", "Active"), color: "#3498db" },
    { value: "completed", label: t("agora", "Completed"), color: "#27ae60" },
    { value: "cancelled", label: t("agora", "Cancelled"), color: "#e74c3c" },
  ];
});

const columnCount = computed(() => Math.max(statusColumns.value.length, 1));

// ---------------------------------------------------------------------------
// Item filtering (family + optional kanbanFilters)
// ---------------------------------------------------------------------------

const familyKey = computed(
  () => props.familyKey ?? (props.family as any)?.family_type ?? "",
);

const kanbanItems = computed<Item[]>(() => {
  const key = familyKey.value;
  let list = key ? getItemsForFamily(props.items, key) : props.items;
  // If the family filter removed everything, fall back to the raw list so
  // inquiries whose family doesn't match the layout still render.
  if (!list.length && props.items.length) list = props.items;

  const filters = props.kanbanFilters;
  if (filters) {
    if (filters.types?.length) {
      list = list.filter((i) => filters.types!.includes(i.type));
    }
    if (filters.families?.length) {
      list = list.filter((i) => filters.families!.includes(i.family));
    }
  }
  return list;
});

// ---------------------------------------------------------------------------
// Read / write status per field
// ---------------------------------------------------------------------------

function getItemStatusValue(item: Item): string {
  const raw = item.raw as any;
  switch (resolvedStatusField.value) {
    case "publicationStatus":
      return raw?.status?.publicationStatus ?? "";
    case "moderationStatus":
      return raw?.status?.moderationStatus ?? "";
    case "inquiryStatus":
      return raw?.status?.inquiryStatus ?? "";
    case "optionStatus":
      return raw?.status?.optionStatus ?? "";
    case "workflowStatus":
      return raw?.status?.workflowStatus ?? "";
    default:
      return item.statusKey ?? "";
  }
}

const getItemsByStatus = (status: string): Item[] =>
  kanbanItems.value.filter((i) => getItemStatusValue(i) === status);

const getStatusLabel = (status: string): string =>
  statusColumns.value.find((s) => s.value === status)?.label || status;

const getStatusColor = (status: string): string =>
  statusColumns.value.find((s) => s.value === status)?.color || "#949494";

// ---------------------------------------------------------------------------
// Drag & drop
// ---------------------------------------------------------------------------

const handleDragStart = (e: DragEvent, item: Item) => {
  if (!permissions.value.move) {
    e.preventDefault();
    return;
  }
  draggingItemId.value = item.id;
  e.dataTransfer?.setData("text/plain", item.id.toString());
  if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
};

const handleDragEnd = () => {
  draggingItemId.value = null;
};

const handleDrop = async (e: DragEvent, newStatus: string) => {
  e.preventDefault();
  if (!permissions.value.move) return;
  const id = e.dataTransfer?.getData("text/plain");
  if (!id) return;
  await changeStatus(parseInt(id, 10), newStatus);
};

// ---------------------------------------------------------------------------
// Status change
// ---------------------------------------------------------------------------

const changeStatus = async (itemId: number, newStatus: string) => {
  const item = kanbanItems.value.find((i) => i.id === itemId);
  if (!item) return;

  const oldValue = getItemStatusValue(item);
  if (oldValue === newStatus) return;

  const field = resolvedStatusField.value;

  // Organization mode: visual-only, do not persist, do not pretend it worked
  if (resolvedMode.value === "organization") {
    emit("statusChange", {
      itemId,
      field,
      oldValue,
      newValue: newStatus,
      mode: "organization",
    });
    showSuccess(
      t("agora", "Card moved in {column} (visual only — status not changed)", {
        column: getStatusLabel(newStatus),
      }),
    );
    // Note: because we don't mutate the underlying data, the card snaps back on
    // the next render. This is the expected behaviour until a separate order
    return;
  }

  // Status mode: requires permission
  if (!permissions.value.changeStatus) {
    showError(t("agora", "You are not allowed to change this status."));
    return;
  }

  try {
    if (field === "optionStatus") {
      if (props.targetType !== "option") {
        showError(
          t("agora", "This board cannot change option status on inquiries."),
        );
        return;
      }
      await optionsStore.setOptionStatus(itemId, newStatus);
    } else if (field === "inquiryStatus") {
      if (props.targetType !== "inquiry") {
        showError(
          t("agora", "This board cannot change inquiry status on options."),
        );
        return;
      }
      await inquiriesStore.updateInquiryStatus(itemId, newStatus);
    } else {
      // publicationStatus / moderationStatus / workflowStatus are not yet
      // persisted by the stores (see French spec §2).
      showError(
        t("agora", "Changing {field} is not yet supported.", { field }),
      );
      return;
    }

    emit("statusChange", {
      itemId,
      field,
      oldValue,
      newValue: newStatus,
      mode: "status",
    });
    showSuccess(
      t("agora", "Item moved to {column}", {
        column: getStatusLabel(newStatus),
      }),
    );
    emit("updateItems");
  } catch (err) {
    console.error("Unable to change item status", err);
    showError(t("agora", "Item status could not be updated"));
  }
};
</script>

<template>
  <div
    v-if="!permissions.view"
    class="kanban-layout kanban-forbidden"
  >
    <p>{{ t("agora", "You do not have access to this board.") }}</p>
  </div>

  <div
    v-else
    class="kanban-layout"
  >
    <div class="kanban-actions">
      <NcButton
        v-if="!isReadonly"
        type="primary"
        class="add-kanban-btn"
        @click="showAddModal = true"
      >
        <template #icon>
          <component
            :is="InquiryOptionIcons.Plus"
            :size="18"
          />
        </template>
        {{ t("agora", "Add to board") }}
      </NcButton>
    </div>

    <AddItemToFamily
      v-if="showAddModal"
      family-type="kanban"
      :inquiry-id="parentId"
      :target-type="targetType"
      @close="showAddModal = false"
      @success="emit('updateItems')"
    />

    <!-- Column headers -->
    <div
      class="kanban-header"
      :style="{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }"
    >
      <div
        v-for="status in statusColumns"
        :key="status.value"
        class="kanban-column-header"
        @dragover.prevent
        @drop="handleDrop($event, status.value)"
      >
        <div class="header-content">
          <span
            class="status-badge"
            :style="{ backgroundColor: status.color || '#949494' }"
          />
          <span class="status-label">{{ status.label }}</span>
          <span class="item-count">{{
            getItemsByStatus(status.value).length
          }}</span>
        </div>
      </div>
    </div>

    <!-- Columns -->
    <div
      class="kanban-board"
      :style="{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }"
    >
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
            :class="{
              dragging: draggingItemId === item.id,
              'drag-disabled': !permissions.move,
            }"
            :draggable="permissions.move"
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
                <NcActions v-if="permissions.changeStatus">
                  <NcActionButton
                    v-for="target in statusColumns.filter(
                      (s) => s.value !== getItemStatusValue(item),
                    )"
                    :key="target.value"
                    @click="changeStatus(item.id, target.value)"
                  >
                    <template #icon>
                      <div
                        class="status-dot-small"
                        :style="{
                          backgroundColor:
                            target.color || getStatusColor(target.value),
                        }"
                      />
                    </template>
                    {{
                      t("agora", "Move to {column}", { column: target.label })
                    }}
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
              <component
                :is="InquiryOptionIcons.Board"
                :size="32"
              />
            </div>
            <p>{{ t("agora", "No items in this column") }}</p>
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
      background: linear-gradient(
        135deg,
        var(--color-primary-element-light) 0%,
        var(--color-primary-element) 100%
      );
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

      &.status-draft {
        border-bottom-color: #949494;
      }
      &.status-active {
        border-bottom-color: #3498db;
      }
      &.status-completed {
        border-bottom-color: #27ae60;
      }
      &.status-cancelled {
        border-bottom-color: #e74c3c;
      }

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
