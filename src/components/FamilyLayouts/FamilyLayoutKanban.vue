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
import { showError, showSuccess } from "@nextcloud/dialogs";
import { InquiryOptionIcons } from "../../utils/icons.ts";
import ItemCard from "./ItemCard.vue";
import AddItemToFamily from "../Modals/AddItemToFamily.vue";
import { OptionsAPI, InquiriesAPI } from "../../Api/index.ts";

import type {
  Item,
  InquiryOptionType,
  OptionFamily,
  InquiryFamily,
  KanbanStatusField,
  KanbanMode,
  KanbanColumn,
  KanbanPermissions,
  FamilyStatus,
} from "../../Types/index.ts";

import { useOptionStore } from "../../stores/option";   // singular
import { useInquiryStore } from "../../stores/inquiry"; // singular
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

const optionStore = useOptionStore();
const inquiryStore = useInquiryStore();

const showAddModal = ref(false);
const draggingItemId = ref<number | null>(null);

// ---------------------------------------------------------------------------
// Status field resolution + guard
// ---------------------------------------------------------------------------

const resolvedStatusField = computed<KanbanStatusField>(() => {
  const requested =
    props.statusField ??
    (props.targetType === "option" ? "optionStatus" : "inquiryStatus");

  // Options have no publication/moderation axis — coerce to optionStatus.
  if (props.targetType === "option" && requested !== "optionStatus") {
    console.warn(
      `[kanban] statusField "${requested}" is invalid for options; using "optionStatus"`,
    );
    return "optionStatus";
  }
  return requested;
});

const resolvedMode = computed<KanbanMode>(() => props.kanbanMode ?? "status");

const boardPermissions = computed<KanbanPermissions>(() => ({
  view: true,
  move: !props.isReadonly,
  changeStatus: !props.isReadonly && resolvedMode.value === "status",
  ...props.kanbanPermissions,
}));

/** Per-item: can the *user* move this card? */
function canMoveItem(item: Item): boolean {
  if (!boardPermissions.value.move) return false;
  if (resolvedMode.value === "organization") return true; // visual only
  return item.raw?.permissions?.edit === true;
}

// ---------------------------------------------------------------------------
// Column resolution — single source per kind
// ---------------------------------------------------------------------------

const INQUIRY_GENERIC: KanbanColumn[] = [
  { value: "draft", label: t("agora", "Draft"), color: "#949494" },
  { value: "active", label: t("agora", "Active"), color: "#3498db" },
  { value: "closed", label: t("agora", "Closed"), color: "#7f8c8d" },
  { value: "rejected", label: t("agora", "Rejected"), color: "#e74c3c" },
  { value: "archived", label: t("agora", "Archived"), color: "#95a5a6" },
];

const OPTION_GENERIC: KanbanColumn[] = [
  { value: "draft", label: t("agora", "Draft"), color: "#949494" },
  { value: "active", label: t("agora", "Active"), color: "#3498db" },
  { value: "closed", label: t("agora", "Closed"), color: "#7f8c8d" },
  { value: "archived", label: t("agora", "Archived"), color: "#95a5a6" },
];

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


const changeStatus = async (itemId: number, newStatus: string) => {
  const item = kanbanItems.value.find((i) => i.id === itemId);
  if (!item) return;

  const oldValue = getItemStatusValue(item);
  if (oldValue === newStatus) return;

  if (resolvedMode.value === "organization") {
    emit("statusChange", { itemId, field: resolvedStatusField.value, oldValue, newValue: newStatus, mode: "organization" });
    showSuccess(t("agora", "Card moved (visual only — status not changed)"));
    return;
  }

  if (!permissions.value.changeStatus) {
    showError(t("agora", "You are not allowed to change this status."));
    return;
  }

  const field = resolvedStatusField.value;

  try {
    if (field === "optionStatus") {
      if (props.targetType !== "option") {
        showError(t("agora", "This board cannot change option status on inquiries."));
        return;
      }
      await OptionsAPI.setOptionStatus(itemId, newStatus);
      // ← the missing piece: patch the plural store so reactivity fires
      optionsStore.$patch((state: any) => {
        const opt = state.options.find((o: any) => o.id === itemId);
        if (opt?.status) opt.status.optionStatus = newStatus;
      });
    } else if (field === "inquiryStatus") {
      if (props.targetType !== "inquiry") {
        showError(t("agora", "This board cannot change inquiry status on options."));
        return;
      }
      await InquiriesAPI.updateInquiryStatus(itemId, newStatus);
      inquiriesStore.$patch((state: any) => {
        const inq = state.inquiries.find((i: any) => i.id === itemId);
        if (inq?.status) inq.status.inquiryStatus = newStatus;
      });
    } else if (field === "moderationStatus") {
      if (props.targetType !== "inquiry") {
        showError(t("agora", "This board cannot change moderation status on options."));
        return;
      }
      // Requires moderation rights — check on the item
      if (!item.raw?.permissions?.edit) {
        showError(t("agora", "You do not have permission to moderate this item."));
        return;
      }
      await InquiriesAPI.updateModerationStatus(itemId, newStatus);
      inquiriesStore.$patch((state: any) => {
        const inq = state.inquiries.find((i: any) => i.id === itemId);
        if (inq?.status) inq.status.moderationStatus = newStatus;
      });
    } else {
      showError(t("agora", "Changing {field} is not yet supported.", { field }));
      return;
    }

    emit("statusChange", { itemId, field, oldValue, newValue: newStatus, mode: "status" });
    showSuccess(t("agora", "Item moved to {column}", { column: getStatusLabel(newStatus) }));
    emit("updateItems");
  } catch (err) {
    console.error("[kanban] status change failed", err);
    showError(t("agora", "Item status could not be updated"));
  }
};

/** Inquiry family statuses arrive as FamilyStatus[] (post type fix). */
function normaliseFamilyStatuses(raw: unknown): KanbanColumn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s): KanbanColumn | null => {
      if (typeof s === "string") {
        const idx = s.indexOf(":");
        return idx >= 0
          ? { value: s.slice(0, idx), label: s.slice(idx + 1) }
          : { value: s, label: s };
      }
      if (s && typeof s === "object" && "value" in s) {
        const fs = s as FamilyStatus;
        return {
          value: String(fs.value),
          label: String(fs.label ?? fs.value),
          color: fs.color,
        };
      }
      return null;
    })
    .filter((c): c is KanbanColumn => c !== null);
}

/** Option-type statuses arrive as "value:Label" strings (InitDbDefault). */
function normaliseTypeStatuses(raw: string[] | undefined): KanbanColumn[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((s) => {
    const idx = s.indexOf(":");
    return idx >= 0
      ? { value: s.slice(0, idx), label: t("agora", s.slice(idx + 1)) }
      : {
          value: s,
          label: s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        };
  });
}


/** Aggregate statuses across the option types present in this board. */
function optionTypeColumns(): KanbanColumn[] {
  const source = props.familyOptionTypes?.length
    ? props.familyOptionTypes
    : props.optionTypes;

  const filter = props.kanbanFilters?.types;
  const relevant = filter?.length
    ? source.filter((typ) => filter.includes(typ.option_type))
    : source;

  const seen = new Set<string>();
  const columns: KanbanColumn[] = [];
  for (const typ of relevant) {
    for (const col of normaliseTypeStatuses(typ.statuses)) {
      if (!seen.has(col.value)) {
        seen.add(col.value);
        columns.push(col);
      }
    }
  }
  return columns;
}

const statusColumns = computed<KanbanColumn[]>(() => {
  // 1. Explicit override always wins
  if (props.kanbanColumns?.length) return props.kanbanColumns;

  const field = resolvedStatusField.value;

  // 2. Orthogonal inquiry axes
  if (field === "publicationStatus") return PUBLICATION_STATUSES;
  if (field === "moderationStatus")  return MODERATION_STATUSES;

  // 3. Inquiry workflow — family.statuses → generic
  if (field === "inquiryStatus") {
    const fromFamily = normaliseFamilyStatuses(
      (props.family as InquiryFamily | null | undefined)?.statuses,
    );
    return fromFamily.length ? fromFamily : INQUIRY_GENERIC;
  }

  // 4. Option workflow — SINGLE type only, never aggregated, never family
  if (field === "optionStatus") {
    const typeFilter = props.kanbanFilters?.types;
    if (typeFilter?.length === 1) {
      const typeInfo = props.optionTypes.find(
        (t) => t.option_type === typeFilter[0],
      );
      const cols = normaliseTypeStatuses(typeInfo?.statuses);
      if (cols.length) return cols;
    }
    // Mixed-type board → generic set
    return OPTION_GENERIC;
  }

  return INQUIRY_GENERIC;
});

const columnCount = computed(() => Math.max(statusColumns.value.length, 1));

// ---------------------------------------------------------------------------
// Item filtering
// ---------------------------------------------------------------------------

const effectiveFamilyKey = computed(() => {
  if (props.familyKey) return props.familyKey;
  if (props.targetType === "inquiry") {
    return (props.family as InquiryFamily | null | undefined)?.family_type ?? "";
  }
  return (props.family as OptionFamily | null | undefined)?.family_type ?? "";
});

const kanbanItems = computed<Item[]>(() => {
  const key = effectiveFamilyKey.value;

  // Inquiries: family-specific filtering only
  if (props.targetType === "inquiry") {
    return key ? getItemsForFamily(props.items, key) : props.items;
  }

  // Options: historical fallback when family yields nothing
  let list = key ? getItemsForFamily(props.items, key) : props.items;
  if (!list.length && props.items.length) list = props.items;

  const filters = props.kanbanFilters;
  if (filters?.types?.length) {
    list = list.filter((i) => filters.types!.includes(i.type));
  }
  if (filters?.families?.length) {
    list = list.filter((i) => filters.families!.includes(i.family));
  }
  return list;
});

// ---------------------------------------------------------------------------
// Status read (per field)
// ---------------------------------------------------------------------------

function getItemStatusValue(item: Item): string {
  const s = item.raw?.status as Record<string, unknown> | undefined;
  switch (resolvedStatusField.value) {
    case "publicationStatus":
      return typeof s?.publicationStatus === "string" ? s.publicationStatus : "";
    case "moderationStatus":
      return typeof s?.moderationStatus === "string" ? s.moderationStatus : "";
    case "inquiryStatus":
      return typeof s?.inquiryStatus === "string" ? s.inquiryStatus : "";
    case "optionStatus":
      return typeof s?.optionStatus === "string" ? s.optionStatus : "";
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
// Orthogonal-axis badges
// ---------------------------------------------------------------------------

function badgesFor(item: Item): Array<{ value: string; label: string }> {
  const s = item.raw?.status as Record<string, unknown> | undefined;
  const field = resolvedStatusField.value;
  const out: Array<{ value: string; label: string }> = [];

  if (
    props.targetType === "inquiry" &&
    field !== "publicationStatus" &&
    typeof s?.publicationStatus === "string" &&
    s.publicationStatus
  ) {
    out.push({ value: s.publicationStatus, label: s.publicationStatus });
  }
  if (
    props.targetType === "inquiry" &&
    field !== "moderationStatus" &&
    typeof s?.moderationStatus === "string" &&
    s.moderationStatus
  ) {
    out.push({ value: s.moderationStatus, label: s.moderationStatus });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Drag & drop
// ---------------------------------------------------------------------------

function handleDragStart(e: DragEvent, item: Item) {
  if (!canMoveItem(item)) {
    e.preventDefault();
    return;
  }
  draggingItemId.value = item.id;
  e.dataTransfer?.setData("text/plain", String(item.id));
  if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
}

function handleDragEnd() {
  draggingItemId.value = null;
}

async function handleDrop(e: DragEvent, newStatus: string) {
  e.preventDefault();
  if (!boardPermissions.value.move) return;
  const raw = e.dataTransfer?.getData("text/plain");
  if (!raw) return;
  await changeStatus(Number.parseInt(raw, 10), newStatus);
}

// ---------------------------------------------------------------------------
// Status change — load into singleton, call the action, sync back
// ---------------------------------------------------------------------------

</script>

<template>
  <div v-if="!boardPermissions.view" class="kanban-layout kanban-forbidden">
    <p>{{ t("agora", "You do not have access to this board.") }}</p>
  </div>

  <div v-else class="kanban-layout">
    <div class="kanban-actions">
      <NcButton
        v-if="!isReadonly"
        type="primary"
        class="add-kanban-btn"
        @click="showAddModal = true"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Plus" :size="18" />
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
        :style="{ borderBottomColor: status.color || '#949494' }"
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
              'drag-disabled': !canMoveItem(item),
            }"
            :draggable="canMoveItem(item)"
            @dragstart="handleDragStart($event, item)"
            @dragend="handleDragEnd"
          >
            <div v-if="badgesFor(item).length" class="item-badges">
              <span
                v-for="b in badgesFor(item)"
                :key="b.value"
                class="badge"
                :class="`badge-${b.value}`"
              >{{ b.label }}</span>
            </div>

            <ItemCard
              :item="item"
              :compact="true"
              :parent-id="parentId"
              :target-type="targetType"
              :show-action="true"
              :family-type="effectiveFamilyKey || 'kanban'"
              @click="emit('openDetail', item)"
            />

            <div class="item-footer">
              <span class="item-id">#{{ item.id }}</span>
              <div class="item-actions">
                <NcActions v-if="canMoveItem(item) && boardPermissions.changeStatus">
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
                        :style="{ backgroundColor: target.color || getStatusColor(target.value) }"
                      />
                    </template>
                    {{ t("agora", "Move to {column}", { column: target.label }) }}
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
.item-badges {
  display: flex;
  gap: 4px;
  padding: 6px 10px 0;

  .badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 8px;
    background: var(--color-background-dark);
    color: var(--color-text-light);
    text-transform: capitalize;

    &.badge-published,
    &.badge-accepted {
      background: #27ae60;
      color: #fff;
    }
    &.badge-pending {
      background: #f39c12;
      color: #fff;
    }
    &.badge-rejected {
      background: #e74c3c;
      color: #fff;
    }
  }
}

.status-dot-small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
