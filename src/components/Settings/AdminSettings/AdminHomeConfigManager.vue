<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">

import { computed, onMounted, reactive, ref } from "vue";
import { t } from "@nextcloud/l10n";
import NcButton from "@nextcloud/vue/components/NcButton";
import NcInputField from "@nextcloud/vue/components/NcInputField";
import { showError, showSuccess } from "@nextcloud/dialogs";
import { useAppSettingsStore } from "../../../stores/appSettings.ts";
import { AppSettingsAPI } from "../../../Api/index.ts";
import {
  getHomeTemplate,
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

type HomeImageSlot = "hero" | "promo";

interface SectionLabelRow {
  key: string;
  value: string;
}

interface TemplateRow {
  key: OrganizationType;
  label: string;
  description: string;
  isDefault: boolean;
  record?: HomeConfigRecord;
}

type FormState = {
  id: number | null;
  configKey: OrganizationType;
  label: string;
  description: string;
  sortOrder: number;
  data: HomeConfigData;
  rawJson: string;
};

// ── Organization types ─────────────────────────────────────

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

function isOrgType(value: unknown): value is OrganizationType {
  return (
    typeof value === "string"
    && (ORGANIZATION_TYPES as readonly string[]).includes(value)
  );
}

const activeType = computed<OrganizationType>(() => {
  const type = store.getOrganizationType;
  return isOrgType(type) ? type : "municipality";
});

// ── Template list ──────────────────────────────────────────

const allTemplates = computed<TemplateRow[]>(() =>
  ORGANIZATION_TYPES.map((key) => {
    const record = store.homeConfigs.find(
      (config) => config.config_key === key,
    );

    return {
      key,
      label: record?.label ?? orgTypeLabel(key),
      description: record?.description
        ?? t("agora", "Default template provided by Agora"),
      isDefault: activeType.value === key,
      record,
    };
  }),
);

onMounted(() => {
  store.loadHomeConfigs().catch(() => {
    showError(t("agora", "Could not load home configurations"));
  });
});

// ── Editor state ───────────────────────────────────────────

const isEditorOpen = ref(false);
const activeTab = ref("general");
const saving = ref(false);

const slotInputs = ref<
  Partial<Record<HomeImageSlot, HTMLInputElement | null>>
>({});

const sectionLabelRows = ref<SectionLabelRow[]>([]);

const form = reactive<FormState>({
  id: null,
  configKey: "municipality",
  label: "",
  description: "",
  sortOrder: 0,
  data: {},
  rawJson: "{}",
});

const tabs = [
  { id: "general", label: t("agora", "General") },
  { id: "hero", label: t("agora", "Hero") },
  { id: "promo", label: t("agora", "Promo") },
  { id: "sectionLabels", label: t("agora", "Section labels") },
  { id: "relevance", label: t("agora", "Relevance") },
  { id: "sections", label: t("agora", "Sections") },
  { id: "advanced", label: t("agora", "Advanced (JSON)") },
];

// ── Template ⇄ data adapters ───────────────────────────────

function templateToData(template: HomeConfig): HomeConfigData {
  return {
    sections: [...template.sections],
    sectionLabels: { ...(template.sectionLabels ?? {}) },
    hero: {
      title: template.hero.title,
      subtitle: template.hero.subtitle,
      // Bundled images are not stored as uploaded filenames.
      actions: (template.hero.actions ?? []).map((action) => ({
        label: action.label ?? "",
        url: action.url ?? "",
        type: action.type ?? "primary",
        icon: action.icon,
      })),
    },
    promo: {
      title: template.promo.title,
      description: template.promo.text,
      cta: { label: template.promo.cta },
    },
    relevance: {
      tiers: template.relevance.tiers.map((tier) => ({
        key: tier.key,
        label: tier.label,
      })),
      weights: { ...template.relevance.weights },
    },
  };
}

function mergeWithTemplate(
  partial: Partial<HomeConfigData>,
  key: OrganizationType,
): HomeConfigData {
  const base = templateToData(getHomeTemplate(key));

  return {
    sections: partial.sections ?? base.sections,
    sectionLabels: {
      ...base.sectionLabels,
      ...(partial.sectionLabels ?? {}),
    },
    hero: {
      ...base.hero,
      ...(partial.hero ?? {}),
      actions: (partial.hero?.actions ?? base.hero.actions ?? []).map(
        (action) => ({
          label: action.label ?? "",
          url: action.url ?? "",
          type: action.type ?? "primary",
          icon: action.icon,
        }),
      ),
    },
    promo: {
      ...base.promo,
      ...(partial.promo ?? {}),
      cta: {
        ...base.promo.cta,
        ...(partial.promo?.cta ?? {}),
      },
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

// ── Open / close editor ────────────────────────────────────

function customizeTemplate(row: TemplateRow) {
  const data = templateToData(getHomeTemplate(row.key));

  isEditorOpen.value = true;
  activeTab.value = "general";

  Object.assign(form, {
    id: null,
    configKey: row.key,
    label: row.label,
    description: "",
    sortOrder: 0,
    data,
    rawJson: JSON.stringify(data, null, 2),
  });

  loadSectionLabelRows();
}

function openEdit(record: HomeConfigRecord) {
  const key = record.config_key;

  if (!isOrgType(key)) {
    showError(t("agora", "Unknown organization type"));
    return;
  }

  const data = mergeWithTemplate(
    JSON.parse(JSON.stringify(record.data ?? {})) as Partial<HomeConfigData>,
    key,
  );

  isEditorOpen.value = true;
  activeTab.value = "general";

  Object.assign(form, {
    id: record.id,
    configKey: key,
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

// ── Default template ───────────────────────────────────────

async function setAsDefault(row: TemplateRow) {
  if (row.isDefault) {
    return;
  }

  try {
    await store.updateOrganizationType(row.key);
    showSuccess(
      t("agora", "Home template set to {label}", {
        label: row.label,
      }),
    );
  } catch {
    showError(t("agora", "Could not update the default home template"));
  }
}

// ── Template data helpers ──────────────────────────────────

async function ensureRecordExists(): Promise<number> {
    if (form.id !== null) {
        return form.id
    }

    if (!form.label.trim()) {
        throw new Error(t("agora", "Display label is required"))
    }

    applySectionLabelRows()

    const payload: HomeConfigPayload = {
        configKey: form.configKey,
        label: form.label,
        description: form.description || null,
        data: form.data,
        sortOrder: Number(form.sortOrder) || 0,
    }

    const record = await store.createHomeConfigRecord(payload)

    form.id = record.id

    return record.id
}

// ── Template data helpers ──────────────────────────────────

function getSlot(slot: "hero"): NonNullable<HomeConfigData["hero"]>
function getSlot(slot: "promo"): NonNullable<HomeConfigData["promo"]>
function getSlot(
    slot: HomeImageSlot,
): NonNullable<HomeConfigData["hero"]>
    | NonNullable<HomeConfigData["promo"]>

function getSlot(slot: HomeImageSlot) {
    if (slot === "hero") {
        form.data.hero ??= {}
        return form.data.hero
    }

    form.data.promo ??= {}
    return form.data.promo
}

function resetSection(section: keyof HomeConfigData) {
  const defaults = templateToData(getHomeTemplate(form.configKey));
  const value = defaults[section];

  Object.assign(form.data, { [section]: value });

  if (section === "sectionLabels") {
    loadSectionLabelRows();
  }

  refreshRawFromData();
}

// ── Section labels ─────────────────────────────────────────

function loadSectionLabelRows() {
  sectionLabelRows.value = Object.entries(
    form.data.sectionLabels ?? {},
  ).map(([key, value]) => ({
    key,
    value: String(value),
  }));
}

function addSectionLabel() {
  sectionLabelRows.value.push({ key: "", value: "" });
}

function removeSectionLabel(index: number) {
  sectionLabelRows.value.splice(index, 1);
}

function applySectionLabelRows() {
  const labels: Record<string, string> = {};

  for (const row of sectionLabelRows.value) {
    const key = row.key.trim();

    if (key) {
      labels[key] = row.value;
    }
  }

  form.data.sectionLabels = labels;
}

// ── Relevance / sections JSON editors ──────────────────────

function getRelevanceTiersJson(): string {
  return JSON.stringify(form.data.relevance?.tiers ?? [], null, 2);
}

function setRelevanceTiersJson(json: string) {
  form.data.relevance ??= {};
  form.data.relevance.tiers = safeParse(json, []);
}

function getRelevanceWeightsJson(): string {
  return JSON.stringify(form.data.relevance?.weights ?? {}, null, 2);
}

function setRelevanceWeightsJson(json: string) {
  form.data.relevance ??= {};
  form.data.relevance.weights = safeParse(json, {});
}

function getSectionsJson(): string {
  return JSON.stringify(form.data.sections ?? [], null, 2);
}

function setSectionsJson(json: string) {
  form.data.sections = safeParse(json, []);
}

function safeParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

function applyRawJson() {
  try {
    const parsed: unknown = JSON.parse(form.rawJson);

    if (
      parsed === null
      || typeof parsed !== "object"
      || Array.isArray(parsed)
    ) {
      throw new Error(t("agora", "The configuration must be a JSON object"));
    }

    form.data = mergeWithTemplate(
      parsed as Partial<HomeConfigData>,
      form.configKey,
    );

    loadSectionLabelRows();
    refreshRawFromData();
    showSuccess(t("agora", "JSON applied"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showError(t("agora", "Invalid JSON: {msg}", { msg: message }));
  }
}

function refreshRawFromData() {
  form.rawJson = JSON.stringify(form.data, null, 2);
}

// ── Hero actions ──────────────────────────────────────────

function addHeroAction() {
  const hero = getSlot("hero");
  hero.actions ??= [];
  hero.actions.push({
    label: "",
    url: "",
    type: "primary",
  });
}

function removeHeroAction(index: number) {
  getSlot("hero").actions?.splice(index, 1);
}

// ── Images ─────────────────────────────────────────────────

function hasUploadedImage(slot: HomeImageSlot): boolean {
  return Boolean(getSlot(slot).image);
}

function slotImageUrl(slot: HomeImageSlot): string | null {
  if (form.id !== null && hasUploadedImage(slot)) {
    const record = store.homeConfigs.find(
      (config) => config.id === form.id,
    );

    return AppSettingsAPI.homeImageUrl(
      form.id,
      slot,
      record?.updated ?? record?.created ?? 0,
    );
  }

  const template = getHomeTemplate(form.configKey);

  return slot === "hero"
    ? template.hero.backgroundUrl
    : template.promo.imageUrl;
}

function isBundledImage(slot: HomeImageSlot): boolean {
  return !hasUploadedImage(slot);
}

function triggerSlotInput(slot: HomeImageSlot) {
  slotInputs.value[slot]?.click();
}

async function onImageSelected(event: Event, slot: HomeImageSlot) {
    const input = event.target

    if (!(input instanceof HTMLInputElement)) {
        return
    }

    const file = input.files?.[0]
    input.value = ""

    if (!file) {
        return
    }

    try {
        // Create the configuration record automatically if needed.
        const recordId = await ensureRecordExists()

        const record = await store.uploadHomeImage(
            recordId,
            slot,
            file,
        )

        const image = record.data?.[slot]?.image

        if (slot === "hero") {
            form.data.hero ??= {}
            form.data.hero.image = image
        } else {
            form.data.promo ??= {}
            form.data.promo.image = image
        }

        refreshRawFromData()

        showSuccess(t("agora", "Image uploaded"))
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)

        showError(t("agora", "Upload failed: {msg}", { msg: message }))
    }
}

async function removeImage(slot: HomeImageSlot) {
  if (form.id === null) {
    return;
  }

  if (!confirm(t("agora", "Remove this image?"))) {
    return;
  }

  try {
    await store.deleteHomeImage(form.id, slot);

    if (slot === "hero") {
      if (form.data.hero) {
        delete form.data.hero.image;
      }
    } else if (form.data.promo) {
      delete form.data.promo.image;
    }

    refreshRawFromData();
    showSuccess(t("agora", "Image removed"));
  } catch {
    showError(t("agora", "Could not remove image"));
  }
}

// ── Save / reset ───────────────────────────────────────────

async function save() {
  if (!form.label.trim()) {
    showError(t("agora", "Display label is required"));
    return;
  }

  applySectionLabelRows();

  const payload: HomeConfigPayload = {
    configKey: form.configKey,
    label: form.label,
    description: form.description || null,
    data: form.data,
    sortOrder: Number(form.sortOrder) || 0,
  };

  saving.value = true;

  try {
if (form.id !== null) {
    await store.saveHomeConfigRecord(form.id, payload)
} else {
    await store.createHomeConfigRecord(payload)
}
    showSuccess(t("agora", "Template saved"));
    closeEditor();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showError(t("agora", "Save failed: {msg}", { msg: message }));
  } finally {
    saving.value = false;
  }
}

async function resetTemplate(row: TemplateRow) {
  if (!row.record) {
    return;
  }

  if (
    !confirm(
      t(
        "agora",
        "Restore the original Agora template for {label}? Your customizations and uploaded images will be deleted.",
        { label: row.label },
      ),
    )
  ) {
    return;
  }

  try {
    await store.deleteHomeConfigRecord(row.record.id);
    showSuccess(t("agora", "Template restored to Agora defaults"));
  } catch {
    showError(t("agora", "Could not restore the template"));
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
              "Customize the templates provided by Agora and choose which one is used for the home page.",
            )
          }}
        </p>
      </div>
    </div>

    <table class="config-table">
      <thead>
        <tr>
          <th>{{ t("agora", "Organization type") }}</th>
          <th>{{ t("agora", "Description") }}</th>
          <th>{{ t("agora", "Status") }}</th>
          <th>{{ t("agora", "Default") }}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in allTemplates"
          :key="row.key"
          :class="{ 'is-default': row.isDefault }"
        >
          <td>
            <strong>{{ row.label }}</strong>
            <div class="row-description">
              <code>{{ row.key }}</code>
            </div>
          </td>
          <td>{{ row.description }}</td>
          <td>
            <span v-if="row.record" class="badge badge-customized">
              {{ t("agora", "Customized") }}
            </span>
            <span v-else class="badge">
              {{ t("agora", "Original") }}
            </span>
          </td>
          <td>
            <span v-if="row.isDefault" class="default-badge">
              ★ {{ t("agora", "Default") }}
            </span>
          </td>
          <td class="row-actions">
            <NcButton
              v-if="row.record"
              @click="openEdit(row.record)"
            >
              {{ t("agora", "Edit") }}
            </NcButton>
            <NcButton
              v-else
              @click="customizeTemplate(row)"
            >
              {{ t("agora", "Customize") }}
            </NcButton>

            <NcButton
              v-if="!row.isDefault"
              @click="setAsDefault(row)"
            >
              {{ t("agora", "Set as default") }}
            </NcButton>

            <NcButton
              v-if="row.record"
              type="error"
              @click="resetTemplate(row)"
            >
              {{ t("agora", "Restore defaults") }}
            </NcButton>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- ─────────────────────────────────────────────────────
         Editor modal (unchanged except for image preview)
         ───────────────────────────────────────────────────── -->
    <div v-if="isEditorOpen" class="modal-overlay">
      <div class="modal-content">
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
    :model-value="orgTypeLabel(form.configKey)"
    :label="t('agora', 'Organization type')"
    disabled
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
       	        :ref="(el) => (slotInputs.hero = el as HTMLInputElement | null)"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e) => onImageSelected(e, 'hero')"
              >
              <NcButton
                @click="triggerSlotInput('hero')"
              >
                {{
                     t("agora", "Upload")
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
                :ref="(el) => (slotInputs.promo = el as HTMLInputElement | null)"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e) => onImageSelected(e, 'promo')"
              >
              <NcButton
                @click="triggerSlotInput('promo')"
              >
                {{
                    t("agora", "Upload")
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
