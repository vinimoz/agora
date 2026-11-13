<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { t } from "@nextcloud/l10n";
import NcButton from "@nextcloud/vue/components/NcButton";
import NcInputField from "@nextcloud/vue/components/NcInputField";
import NcSelect from "@nextcloud/vue/components/NcSelect";
import { showError, showSuccess } from "@nextcloud/dialogs";
import { useAppSettingsStore } from "../../../stores/appSettings.ts";
import { AppSettingsAPI } from "../../../Api/index.ts";
import {
  getHomeTemplate,
  HOME_TEMPLATES,
} from "../../../composables/homeDefaults";
import {
  ORGANIZATION_TYPES,
  type OrganizationType,
} from "../../../Types/experience.types";

import type {
  HomeConfig,
  HomeConfigData,
  HomeConfigPayload,
  HomeConfigRecord,
} from "../../../Types/appSettings.types.ts";

const store = useAppSettingsStore();

// ── Org type helpers ───────────────────────────────────────
function orgTypeLabel(key: OrganizationType): string {
  const labels: Record<OrganizationType, string> = {
    municipality: t("agora", "Municipality"),
    university: t("agora", "University"),
    association: t("agora", "Association"),
    cooperative: t("agora", "Cooperative"),
    company: t("agora", "Company"),
  };
  return labels[key];
}

function isOrgType(v: unknown): v is OrganizationType {
  return (
    typeof v === "string" &&
    (ORGANIZATION_TYPES as readonly string[]).includes(v)
  );
}

function currentOrgType(): OrganizationType {
  const c = store.getOrganizationType;
  return isOrgType(c) ? c : "municipality";
}

// ── Filters ────────────────────────────────────────────────
const roleOptions = [
  { id: "all", label: t("agora", "All") },
  { id: "template", label: t("agora", "Templates") },
  { id: "instance", label: t("agora", "Instance") },
];
const roleFilter = ref<"all" | "template" | "instance">("all");

// ── Unified row model ──────────────────────────────────────
interface UnifiedRow {
  /** DB id, or null for a bundled template */
  id: number | null;
  source: "bundled" | "db";
  configKey: string;
  role: "template" | "instance";
  label: string;
  description: string;
  sortOrder: number;
  updated: number | null;
  isDefault: boolean;
  isBundled: boolean;
  /** DB record for `source === "db"` rows */
  record?: HomeConfigRecord;
}

const activeType = computed<OrganizationType>(() => currentOrgType());

const allTemplates = computed<UnifiedRow[]>(() => {
  const active = activeType.value;
  const rows: UnifiedRow[] = [];

  // ── 1. Bundled templates (read-only, non-removable) ──────
  for (const key of ORGANIZATION_TYPES) {
    const override = store.homeConfigs.find(
      (c) => c.role === "template" && c.config_key === key,
    );
    rows.push({
      id: null,
      source: "bundled",
      configKey: key,
      role: "template",
      label: orgTypeLabel(key),
      description: override
        ? t("agora", "Overridden by DB template #{id}", { id: override.id })
        : t("agora", "Shipped template — cannot be removed"),
      sortOrder: 0,
      updated: null,
      // Bundled row is only “default” when no DB override exists
      isDefault: active === key && !override,
      isBundled: true,
    });
  }

  // ── 2. DB templates / instance rows ──────────────────────
  for (const rec of store.homeConfigs) {
    const isTemplate = rec.role === "template";
    rows.push({
      id: rec.id,
      source: "db",
      configKey: rec.config_key,
      role: rec.role,
      label: rec.label,
      description: rec.description ?? "",
      sortOrder: rec.sort_order,
      updated: rec.updated ?? null,
      isDefault: isTemplate && rec.config_key === active,
      isBundled: false,
      record: rec,
    });
  }

  // ── 3. Filter ────────────────────────────────────────────
  if (roleFilter.value === "all") return rows;
  return rows.filter((r) => r.role === roleFilter.value);
});

function getOverrideRecord(key: string): HomeConfigRecord | undefined {
  return store.homeConfigs.find(
    (c) => c.role === "template" && c.config_key === key,
  );
}

// ── Editor state ───────────────────────────────────────────
type FormState = {
  id: number | null;
  configKey: string;
  role: "template" | "instance";
  label: string;
  description: string;
  sortOrder: number;
  data: HomeConfigData;
  rawJson: string;
};

const isEditorOpen = ref(false);
const isEditMode = ref(false);
const activeTab = ref("general");
const saving = ref(false);
const slotInputs = ref({});

const form = reactive<FormState>({
  id: null,
  configKey: "municipality",
  role: "template",
  label: "",
  description: "",
  sortOrder: 0,
  data: {},
  rawJson: "{}",
});

const sectionLabelRows = ref([]);

const tabs = [
  { id: "general", label: t("agora", "General") },
  { id: "hero", label: t("agora", "Hero") },
  { id: "promo", label: t("agora", "Promo") },
  { id: "sectionLabels", label: t("agora", "Section labels") },
  { id: "relevance", label: t("agora", "Relevance") },
  { id: "sections", label: t("agora", "Sections") },
  { id: "advanced", label: t("agora", "Advanced (JSON)") },
];

onMounted(() => {
  store
    .loadHomeConfigs()
    .catch(() => showError(t("agora", "Could not load home configurations")));
});

// ── Template ⇄ data adapters ───────────────────────────────
function templateToData(tpl: HomeConfig): HomeConfigData {
  return {
    sections: [...tpl.sections],
    sectionLabels: { ...(tpl.sectionLabels ?? {}) },
    hero: {
      title: tpl.hero.title,
      subtitle: tpl.hero.subtitle,
      // Intentionally NOT copying tpl.hero.backgroundUrl: bundled asset,
      // not a filename — merged config keeps it as fallback.
      actions: (tpl.hero.actions ?? []).map((a) => ({
        label: a.label ?? "",
        url: a.url ?? "",
        type: a.type ?? "primary",
        icon: a.icon,
      })),
    },
    promo: {
      title: tpl.promo.title,
      description: tpl.promo.text,
      cta: { label: tpl.promo.cta },
    },
    relevance: {
      tiers: tpl.relevance.tiers.map((tr) => ({ key: tr.key, label: tr.label })),
      weights: { ...tpl.relevance.weights },
    },
  };
}

function mergeWithTemplate(partial: Partial<HomeConfigData>): HomeConfigData {
  const base = templateToData(getHomeTemplate(currentOrgType()));
  return {
    sections: partial.sections ?? base.sections,
    sectionLabels: { ...base.sectionLabels, ...(partial.sectionLabels ?? {}) },
    hero: {
      ...base.hero,
      ...(partial.hero ?? {}),
      actions: (partial.hero?.actions ?? base.hero.actions ?? []).map((a) => ({
        label: a.label ?? "",
        url: a.url ?? "",
        type: a.type ?? "primary",
        icon: a.icon,
      })),
    },
    promo: {
      ...base.promo,
      ...(partial.promo ?? {}),
      cta: { ...base.promo.cta, ...(partial.promo?.cta ?? {}) },
    },
    relevance: {
      tiers: partial.relevance?.tiers ?? base.relevance.tiers,
      weights: {
        ...base.relevance.weights,
        ...(partial.relevance?.weights ?? {}),
      },
    },
  };
}

// ── Open / close ───────────────────────────────────────────
function openCreate() {
  isEditMode.value = false;
  isEditorOpen.value = true;
  activeTab.value = "general";
  const orgType = currentOrgType();
  const defaultData = templateToData(getHomeTemplate(orgType));
  Object.assign(form, {
    id: null,
    configKey: orgType,
    role: "template",
    label: `${orgTypeLabel(orgType)} (${t("agora", "custom")})`,
    description: "",
    sortOrder: 0,
    data: defaultData,
    rawJson: JSON.stringify(defaultData, null, 2),
  });
  loadSectionLabelRows();
}

/** Turn a bundled template into a DB override — seeds the editor. */
function customizeBundled(row: UnifiedRow) {
  const key = row.configKey as OrganizationType;
  const defaultData = templateToData(getHomeTemplate(key));
  isEditMode.value = false;
  isEditorOpen.value = true;
  activeTab.value = "general";
  Object.assign(form, {
    id: null,
    configKey: key,
    role: "template",
    label: `${orgTypeLabel(key)} (${t("agora", "custom")})`,
    description: t(
      "agora",
      "Customized override of the bundled {type} template",
      { type: orgTypeLabel(key) },
    ),
    sortOrder: 0,
    data: defaultData,
    rawJson: JSON.stringify(defaultData, null, 2),
  });
  loadSectionLabelRows();
}

function openEdit(record: HomeConfigRecord) {
  isEditMode.value = true;
  isEditorOpen.value = true;
  activeTab.value = "general";
  const data = mergeWithTemplate(JSON.parse(JSON.stringify(record.data ?? {})));
  Object.assign(form, {
    id: record.id,
    configKey: record.config_key,
    role: record.role,
    label: record.label,
    description: record.description ?? "",
    sortOrder: record.sort_order,
    data,
    rawJson: JSON.stringify(data, null, 2),
  });
  loadSectionLabelRows();
}

function closeEditor() {
  isEditorOpen.value = false;
}

// Keep configKey in sync with role
watch(
  () => form.role,
  (role) => {
    if (role === "instance") {
      form.configKey = "default";
    } else if (!isOrgType(form.configKey)) {
      form.configKey = currentOrgType();
    }
  },
);

// ── Set as default ─────────────────────────────────────────
async function setAsDefault(row: UnifiedRow) {
  if (row.role !== "template") {
    showError(t("agora", "Only templates can be set as default"));
    return;
  }
  if (!isOrgType(row.configKey)) {
    showError(
      t(
        "agora",
        "Only templates whose key is an organization type can be default. Recognized: {types}",
        { types: ORGANIZATION_TYPES.join(", ") },
      ),
    );
    return;
  }
  try {
    await store.updateOrganizationType(row.configKey);
    showSuccess(
      t("agora", "Default template set to “{label}”", { label: row.label }),
    );
  } catch {
    showError(t("agora", "Could not update the default template"));
  }
}

// ── Helpers ────────────────────────────────────────────────
function getSlot(slot: keyof HomeConfigData) {
  if (!form.data[slot] || typeof form.data[slot] !== "object") {
    (form.data as Record<string, unknown>)[slot] = {};
  }
  return (form.data as Record<string, any>)[slot];
}

function resetSection(section: keyof HomeConfigData) {
  const tpl = templateToData(getHomeTemplate(currentOrgType()));
  if (section === "sections" || section === "sectionLabels") {
    (form.data as any)[section] = tpl[section];
  } else {
    (form.data as any)[section] = { ...(tpl[section] as object) };
  }
  if (section === "sectionLabels") loadSectionLabelRows();
  refreshRawFromData();
}

// ── Section labels ─────────────────────────────────────────
function loadSectionLabelRows() {
  sectionLabelRows.value = Object.entries(form.data.sectionLabels ?? {}).map(
    ([key, value]) => ({ key, value: String(value) }),
  );
}
function addSectionLabel() {
  sectionLabelRows.value.push({ key: "", value: "" });
}
function removeSectionLabel(i) {
  sectionLabelRows.value.splice(i, 1);
}
function applySectionLabelRows() {
  const map = {};
  for (const row of sectionLabelRows.value) {
    if (row.key.trim()) map[row.key.trim()] = row.value;
  }
  form.data.sectionLabels = map;
}

// ── Relevance / sections JSON editors ──────────────────────
function getRelevanceTiersJson() {
  return JSON.stringify(form.data.relevance?.tiers ?? [], null, 2);
}
function setRelevanceTiersJson(json) {
  if (!form.data.relevance) form.data.relevance = {};
  form.data.relevance.tiers = safeParse(json, []);
}
function getRelevanceWeightsJson() {
  return JSON.stringify(form.data.relevance?.weights ?? {}, null, 2);
}
function setRelevanceWeightsJson(json) {
  if (!form.data.relevance) form.data.relevance = {};
  form.data.relevance.weights = safeParse(json, {});
}
function getSectionsJson() {
  return JSON.stringify(form.data.sections ?? [], null, 2);
}
function setSectionsJson(json) {
  form.data.sections = safeParse(json, []);
}
function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function applyRawJson() {
  try {
    const parsed = JSON.parse(form.rawJson);
    form.data = mergeWithTemplate(parsed);
    loadSectionLabelRows();
    refreshRawFromData();
    showSuccess(t("agora", "JSON applied"));
  } catch (err) {
    showError(t("agora", "Invalid JSON: {msg}", { msg: err.message }));
  }
}

function refreshRawFromData() {
  form.rawJson = JSON.stringify(form.data, null, 2);
}

// ── Hero CTA ───────────────────────────────────────────────
function addHeroAction() {
  getSlot("hero").actions ??= [];
  getSlot("hero").actions.push({ label: "", url: "", type: "primary" });
}
function removeHeroAction(i) {
  getSlot("hero").actions.splice(i, 1);
}

// ── Images ─────────────────────────────────────────────────
function hasUploadedImage(slot: "hero" | "promo"): boolean {
  return !!((form.data as Record<string, any>)[slot]?.image);
}

/** Preview URL: uploaded file if present, else bundled asset for context. */
function slotImageUrl(slot: "hero" | "promo"): string | null {
  if (form.id !== null && hasUploadedImage(slot)) {
    const record = store.homeConfigs.find((c) => c.id === form.id);
    return AppSettingsAPI.homeImageUrl(
      form.id,
      slot,
      record?.updated ?? record?.created ?? 0,
    );
  }
  const tpl = getHomeTemplate(currentOrgType());
  return slot === "hero" ? tpl.hero.backgroundUrl : tpl.promo.imageUrl;
}

function isBundledImage(slot: "hero" | "promo"): boolean {
  return !hasUploadedImage(slot);
}

function triggerSlotInput(slot) {
  slotInputs.value[slot]?.click();
}

async function onImageSelected(event, slot) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file || form.id === null) return;
  try {
    const record = await store.uploadHomeImage(form.id, slot, file);
    if (!(form.data as any)[slot]) (form.data as any)[slot] = {};
    (form.data as any)[slot].image = (record.data as any)?.[slot]?.image;
    showSuccess(t("agora", "Image uploaded"));
  } catch (err) {
    showError(t("agora", "Upload failed: {msg}", { msg: err?.message ?? "" }));
  }
}

async function removeImage(slot) {
  if (form.id === null) return;
  if (!confirm(t("agora", "Remove this image?"))) return;
  try {
    await store.deleteHomeImage(form.id, slot);
    if ((form.data as any)[slot]) delete (form.data as any)[slot].image;
    showSuccess(t("agora", "Image removed"));
  } catch {
    showError(t("agora", "Could not remove image"));
  }
}

// ── Save ───────────────────────────────────────────────────
async function save() {
  if (!form.label.trim()) {
    showError(t("agora", "Display label is required"));
    return;
  }
  if (!isEditMode.value && !form.configKey.trim()) {
    showError(t("agora", "Config key is required"));
    return;
  }
  // Duplicate guard (role + config_key must be unique)
  if (!isEditMode.value) {
    const dup = store.homeConfigs.find(
      (c) => c.role === form.role && c.config_key === form.configKey,
    );
    if (dup) {
      showError(
        t(
          "agora",
          "A {role} template with key “{key}” already exists (#{id}).",
          { role: form.role, key: form.configKey, id: dup.id },
        ),
      );
      return;
    }
  }
  applySectionLabelRows();
  saving.value = true;
  const payload: HomeConfigPayload = {
    configKey: form.configKey,
    role: form.role,
    label: form.label,
    description: form.description || null,
    data: form.data,
    sortOrder: Number(form.sortOrder) || 0,
  };
  try {
    if (isEditMode.value) {
      await store.saveHomeConfigRecord(form.id, payload);
      showSuccess(t("agora", "Template saved"));
    } else {
      await store.createHomeConfigRecord(payload);
      showSuccess(t("agora", "Template created"));
    }
    closeEditor();
  } catch (err) {
    showError(t("agora", "Save failed: {msg}", { msg: err?.message ?? "" }));
  } finally {
    saving.value = false;
  }
}

async function remove(record: HomeConfigRecord) {
  if (
    !confirm(
      t("agora", "Delete template “{label}” and all of its images?", {
        label: record.label,
      }),
    )
  ) {
    return;
  }
  try {
    await store.deleteHomeConfigRecord(record.id);
    showSuccess(t("agora", "Deleted"));
  } catch {
    showError(t("agora", "Delete failed"));
  }
}
</script>

<template>
  <div class="home-config-manager">
    <div class="toolbar">
      <div>
        <h2>{{ t("agora", "Home templates") }}</h2>
        <p class="description">
          {{
            t(
              "agora",
              "Bundled templates ship with the installation and cannot be removed. " +
                "Custom templates are stored in the database. " +
                "The default template is the one currently used to render the home page.",
            )
          }}
        </p>
      </div>
      <div class="toolbar-actions">
        <NcSelect
          v-model="roleFilter"
          :options="roleOptions"
          :reduce="(opt) => opt.id"
          label="label"
          :input-label="t('agora', 'Filter by role')"
          :label-outside="true"
          :clearable="false"
        />
        <NcButton
          type="primary"
          @click="openCreate"
        >
          {{ t("agora", "New template") }}
        </NcButton>
      </div>
    </div>

    <table class="config-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>{{ t("agora", "Key") }}</th>
          <th>{{ t("agora", "Role") }}</th>
          <th>{{ t("agora", "Label") }}</th>
          <th>{{ t("agora", "Sort") }}</th>
          <th>{{ t("agora", "Updated") }}</th>
          <th>{{ t("agora", "Default") }}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in allTemplates"
          :key="row.source === 'bundled' ? `b-${row.configKey}` : `db-${row.id}`"
          :class="{
            'is-default': row.isDefault,
            'is-bundled': row.isBundled,
          }"
        >
          <td>
            <span v-if="row.isBundled" class="muted">—</span>
            <span v-else>{{ row.id }}</span>
          </td>
          <td>
            <code>{{ row.configKey }}</code>
          </td>
          <td>
            <span
              class="badge"
              :class="`badge-${row.role}`"
            >{{ row.role }}</span>
            <span
              v-if="row.isBundled"
              class="badge badge-bundled"
            >{{ t("agora", "Bundled") }}</span>
          </td>
          <td>
            {{ row.label }}
            <div
              v-if="row.description"
              class="row-description"
            >
              {{ row.description }}
            </div>
          </td>
          <td>{{ row.sortOrder }}</td>
          <td>
            <span v-if="row.updated">
              {{ new Date(row.updated * 1000).toLocaleString() }}
            </span>
            <span v-else class="muted">—</span>
          </td>
          <td>
            <span v-if="row.isDefault" class="default-badge">
              ★ {{ t("agora", "Default") }}
            </span>
          </td>
          <td class="row-actions">
            <!-- Bundled: customize / edit override -->
            <template v-if="row.isBundled">
              <NcButton
                v-if="!getOverrideRecord(row.configKey)"
                @click="customizeBundled(row)"
              >
                {{ t("agora", "Customize") }}
              </NcButton>
              <NcButton
                v-else
                @click="openEdit(getOverrideRecord(row.configKey)!)"
              >
                {{ t("agora", "Edit override") }}
              </NcButton>
            </template>

            <!-- DB: set as default / edit / delete -->
            <template v-else>
              <NcButton
                v-if="!row.isDefault && row.role === 'template' && isOrgType(row.configKey)"
                @click="setAsDefault(row)"
              >
                {{ t("agora", "Set as default") }}
              </NcButton>
              <NcButton @click="openEdit(row.record!)">
                {{ t("agora", "Edit") }}
              </NcButton>
              <NcButton
                type="error"
                @click="remove(row.record!)"
              >
                {{ t("agora", "Delete") }}
              </NcButton>
            </template>
          </td>
        </tr>
        <tr v-if="!allTemplates.length">
          <td colspan="8" class="empty">
            {{ t("agora", "No templates match the current filter.") }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ─────────────────────────────────────────────────────
         Editor modal (unchanged except for image preview)
         ───────────────────────────────────────────────────── -->
    <div v-if="isEditorOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>
          {{
            isEditMode
              ? t("agora", "Edit template #{id}", { id: form.id })
              : t("agora", "New template")
          }}
        </h3>

        <nav class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- General -->
        <section v-if="activeTab === 'general'" class="tab-body">
          <div class="form-row">
            <NcInputField
              v-model="form.configKey"
              :label="t('agora', 'Config key')"
              :placeholder="t('agora', 'E.g., default, university, municipality')"
              :disabled="isEditMode || form.role === 'instance'"
              required
            />
            <NcSelect
              v-model="form.role"
              :options="[
                { id: 'template', label: t('agora', 'Template') },
                { id: 'instance', label: t('agora', 'Instance override') },
              ]"
              :reduce="(opt) => opt.id"
              label="label"
              :input-label="t('agora', 'Role')"
              :label-outside="true"
              :clearable="false"
              :disabled="isEditMode"
            />
            <NcInputField
              v-model.number="form.sortOrder"
              :label="t('agora', 'Sort order')"
              type="number"
              :min="0"
            />
          </div>
          <NcInputField
            v-model="form.label"
            :label="t('agora', 'Display label')"
            required
          />
          <NcInputField
            v-model="form.description"
            :label="t('agora', 'Description')"
            type="textarea"
          />
          <p v-if="form.role === 'instance'" class="hint">
            {{
              t(
                "agora",
                "The instance override is applied on top of whichever template is set as default.",
              )
            }}
          </p>
        </section>

        <!-- Hero -->
        <section v-if="activeTab === 'hero'" class="tab-body">
          <div class="tab-header">
            <NcButton @click="resetSection('hero')">
              {{ t("agora", "Reset hero to defaults") }}
            </NcButton>
          </div>
          <NcInputField
            :model-value="getSlot('hero').title ?? ''"
            :label="t('agora', 'Title')"
            @update:model-value="(v) => (getSlot('hero').title = v)"
          />
          <NcInputField
            :model-value="getSlot('hero').subtitle ?? ''"
            :label="t('agora', 'Subtitle')"
            type="textarea"
            @update:model-value="(v) => (getSlot('hero').subtitle = v)"
          />

          <h4>{{ t("agora", "Hero image") }}</h4>
          <div class="image-block">
            <img
              v-if="slotImageUrl('hero')"
              :src="slotImageUrl('hero')"
              class="preview"
              :alt="t('agora', 'Hero image preview')"
            >
            <div v-else class="placeholder">
              {{ t("agora", "No image") }}
            </div>
            <div class="actions">
              <p v-if="isBundledImage('hero')" class="hint">
                {{ t("agora", "Bundled default — upload to override") }}
              </p>
              <input
                :ref="(el) => (slotInputs['hero'] = el)"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e) => onImageSelected(e, 'hero')"
              >
              <NcButton
                :disabled="form.id === null"
                @click="triggerSlotInput('hero')"
              >
                {{
                  form.id === null
                    ? t("agora", "Save first to upload")
                    : t("agora", "Upload")
                }}
              </NcButton>
              <NcButton
                v-if="hasUploadedImage('hero')"
                type="error"
                @click="removeImage('hero')"
              >
                {{ t("agora", "Remove") }}
              </NcButton>
            </div>
          </div>

          <h4>{{ t("agora", "Call-to-action buttons") }}</h4>
          <div
            v-for="(action, i) in getSlot('hero').actions ?? []"
            :key="i"
            class="cta-row"
          >
            <NcInputField
              :model-value="action.label ?? ''"
              :label="t('agora', 'Label')"
              @update:model-value="(v) => (action.label = v)"
            />
            <NcInputField
              :model-value="action.url ?? ''"
              :label="t('agora', 'URL')"
              @update:model-value="(v) => (action.url = v)"
            />
            <NcInputField
              :model-value="action.type ?? 'primary'"
              :label="t('agora', 'Type')"
              placeholder="primary / secondary"
              @update:model-value="(v) => (action.type = v)"
            />
            <NcButton type="error" @click="removeHeroAction(i)">×</NcButton>
          </div>
          <NcButton @click="addHeroAction">
            {{ t("agora", "Add action") }}
          </NcButton>
        </section>

        <!-- Promo -->
        <section v-if="activeTab === 'promo'" class="tab-body">
          <div class="tab-header">
            <NcButton @click="resetSection('promo')">
              {{ t("agora", "Reset promo to defaults") }}
            </NcButton>
          </div>
          <NcInputField
            :model-value="getSlot('promo').title ?? ''"
            :label="t('agora', 'Title')"
            @update:model-value="(v) => (getSlot('promo').title = v)"
          />
          <NcInputField
            :model-value="getSlot('promo').description ?? ''"
            :label="t('agora', 'Description')"
            type="textarea"
            @update:model-value="(v) => (getSlot('promo').description = v)"
          />

          <h4>{{ t("agora", "Promo image") }}</h4>
          <div class="image-block">
            <img
              v-if="slotImageUrl('promo')"
              :src="slotImageUrl('promo')"
              class="preview"
              :alt="t('agora', 'Promo image preview')"
            >
            <div v-else class="placeholder">
              {{ t("agora", "No image") }}
            </div>
            <div class="actions">
              <p v-if="isBundledImage('promo')" class="hint">
                {{ t("agora", "Bundled default — upload to override") }}
              </p>
              <input
                :ref="(el) => (slotInputs['promo'] = el)"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e) => onImageSelected(e, 'promo')"
              >
              <NcButton
                :disabled="form.id === null"
                @click="triggerSlotInput('promo')"
              >
                {{
                  form.id === null
                    ? t("agora", "Save first to upload")
                    : t("agora", "Upload")
                }}
              </NcButton>
              <NcButton
                v-if="hasUploadedImage('promo')"
                type="error"
                @click="removeImage('promo')"
              >
                {{ t("agora", "Remove") }}
              </NcButton>
            </div>
          </div>

          <h4>{{ t("agora", "Call to action") }}</h4>
          <div class="form-row">
            <NcInputField
              :model-value="getSlot('promo').cta?.label ?? ''"
              :label="t('agora', 'Label')"
              @update:model-value="
                (v) => {
                  getSlot('promo').cta = { ...(getSlot('promo').cta ?? {}), label: v };
                }
              "
            />
            <NcInputField
              :model-value="getSlot('promo').cta?.url ?? ''"
              :label="t('agora', 'URL')"
              @update:model-value="
                (v) => {
                  getSlot('promo').cta = { ...(getSlot('promo').cta ?? {}), url: v };
                }
              "
            />
          </div>
        </section>

        <!-- Section labels -->
        <section v-if="activeTab === 'sectionLabels'" class="tab-body">
          <div class="tab-header">
            <NcButton @click="resetSection('sectionLabels')">
              {{ t("agora", "Reset to defaults") }}
            </NcButton>
          </div>
          <p class="description">
            {{ t("agora", "Override the labels shown for each home page section.") }}
          </p>
          <div
            v-for="(row, i) in sectionLabelRows"
            :key="i"
            class="kv-row"
          >
            <NcInputField v-model="row.key" :label="t('agora', 'Section key')" />
            <NcInputField v-model="row.value" :label="t('agora', 'Label')" />
            <NcButton type="error" @click="removeSectionLabel(i)">×</NcButton>
          </div>
          <NcButton @click="addSectionLabel">
            {{ t("agora", "Add label") }}
          </NcButton>
        </section>

        <!-- Relevance -->
        <section v-if="activeTab === 'relevance'" class="tab-body">
          <div class="tab-header">
            <NcButton @click="resetSection('relevance')">
              {{ t("agora", "Reset to defaults") }}
            </NcButton>
          </div>
          <h4>{{ t("agora", "Tiers (JSON array)") }}</h4>
          <textarea
            class="json-editor"
            :value="getRelevanceTiersJson()"
            @change="setRelevanceTiersJson($event.target.value)"
          />
          <h4>{{ t("agora", "Weights (JSON object)") }}</h4>
          <textarea
            class="json-editor"
            :value="getRelevanceWeightsJson()"
            @change="setRelevanceWeightsJson($event.target.value)"
          />
        </section>

        <!-- Sections -->
        <section v-if="activeTab === 'sections'" class="tab-body">
          <div class="tab-header">
            <NcButton @click="resetSection('sections')">
              {{ t("agora", "Reset to defaults") }}
            </NcButton>
          </div>
          <p class="description">
            {{ t("agora", "Ordered list of enabled section keys for the home page.") }}
          </p>
          <textarea
            class="json-editor"
            :value="getSectionsJson()"
            @change="setSectionsJson($event.target.value)"
          />
        </section>

        <!-- Advanced -->
        <section v-if="activeTab === 'advanced'" class="tab-body">
          <p class="description">
            {{
              t(
                "agora",
                "Full raw data blob. Use carefully — invalid JSON will be rejected.",
              )
            }}
          </p>
          <textarea v-model="form.rawJson" class="json-editor large" />
          <div class="advanced-actions">
            <NcButton @click="applyRawJson">
              {{ t("agora", "Apply JSON") }}
            </NcButton>
            <NcButton @click="refreshRawFromData">
              {{ t("agora", "Refresh from form") }}
            </NcButton>
          </div>
        </section>

        <footer class="modal-actions">
          <NcButton @click="closeEditor">
            {{ t("agora", "Cancel") }}
          </NcButton>
          <NcButton type="primary" :disabled="saving" @click="save">
            {{ saving ? t("agora", "Saving…") : t("agora", "Save") }}
          </NcButton>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-config-manager { padding: 20px; }
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}
.toolbar-actions { display: flex; gap: 12px; align-items: center; }
.description { color: var(--color-text-lighter); margin: 4px 0 0 0; }
.hint {
  font-size: 0.85em;
  color: var(--color-text-lighter);
  margin: 0 0 4px;
}
.config-table { width: 100%; border-collapse: collapse; }
.config-table th,
.config-table td {
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}
.config-table tr.is-default {
  background: var(--color-primary-element-light, #e6f0ff);
}
.config-table tr.is-bundled td { color: var(--color-text-lighter); }
.config-table .empty {
  text-align: center;
  padding: 20px;
  color: var(--color-text-lighter);
}
.row-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8em;
  font-weight: 500;
  margin-right: 4px;
  background: var(--color-background-hover);
  color: var(--color-text-lighter);
}
.badge-template {
  background: var(--color-primary-element-light, #e6f0ff);
  color: var(--color-primary);
}
.badge-instance { background: #fef3c7; color: #92400e; }
.badge-bundled { background: #f3e8ff; color: #6b21a8; }
.default-badge {
  color: var(--color-primary);
  font-weight: 600;
  white-space: nowrap;
}
.row-description {
  font-size: 0.85em;
  color: var(--color-text-lighter);
  margin-top: 2px;
}
.muted { color: var(--color-text-lighter); }
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
  width: 960px;
  max-width: 95vw;
  max-height: 92vh;
  overflow-y: auto;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 16px;
}
.tabs button {
  padding: 8px 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: var(--color-text-lighter);
}
.tabs button.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}
.tab-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 240px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}
.kv-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  align-items: end;
}
.cta-row {
  display: grid;
  grid-template-columns: 1fr 1fr 120px auto;
  gap: 8px;
  align-items: end;
  margin-bottom: 8px;
}
.image-block { display: flex; gap: 16px; align-items: center; }
.image-block .preview {
  max-width: 260px;
  max-height: 140px;
  border-radius: 6px;
}
.image-block .placeholder {
  width: 260px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-hover);
  color: var(--color-text-lighter);
  border-radius: 6px;
}
.image-block .actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hidden { display: none; }
.json-editor {
  width: 100%;
  min-height: 140px;
  font-family: monospace;
  font-size: 13px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-dark);
  color: var(--color-main-text);
}
.json-editor.large { min-height: 320px; }
.advanced-actions { display: flex; gap: 12px; }
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
