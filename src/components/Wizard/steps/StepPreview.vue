<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { NcButton, NcTextField, NcTextArea, NcNoteCard, NcLoadingIcon } from '@nextcloud/vue'
import { useTemplateWizardStore } from '../../../stores/templateWizard'

const wizardStore = useTemplateWizardStore()

const editableData = computed(() => wizardStore.editableData)
const duplicateAnalysis = ref<any>(null)
const isAnalyzing = ref(false)
const analysisError = ref<string | null>(null)

// Section state management
const expandedSections = ref<Record<string, boolean>>({
	inquiry_families: true,
	inquiry_types: false,
	inquiry_statuses: false,
	option_types: false,
	inquiry_group_types: false,
	categories: false,
	locations: false,
})

const editingItem = ref<{ section: string; index: number } | null>(null)
const editingItemData = ref<any>(null)

interface Section {
	key: string
	label: string
	icon: string
	count: number
	itemLabelKey: string
	itemTypeKey: string
}

const sections = computed((): Section[] => {
	if (!editableData.value) return []

	return [
		{
			key: 'inquiry_families',
			label: t('agora', 'Inquiry Families'),
			icon: '📁',
			count: editableData.value.inquiry_families?.length || 0,
			itemLabelKey: 'label',
			itemTypeKey: 'family_type',
		},
		{
			key: 'inquiry_types',
			label: t('agora', 'Inquiry Types'),
			icon: '📋',
			count: editableData.value.inquiry_types?.length || 0,
			itemLabelKey: 'label',
			itemTypeKey: 'inquiry_type',
		},
		{
			key: 'inquiry_statuses',
			label: t('agora', 'Inquiry Statuses'),
			icon: '📊',
			count: editableData.value.inquiry_statuses?.length || 0,
			itemLabelKey: 'label',
			itemTypeKey: 'status_key',
		},
		{
			key: 'option_types',
			label: t('agora', 'Option Types'),
			icon: '🎯',
			count: editableData.value.option_types?.length || 0,
			itemLabelKey: 'label',
			itemTypeKey: 'option_type',
		},
		{
			key: 'inquiry_group_types',
			label: t('agora', 'Inquiry Group Types'),
			icon: '👥',
			count: editableData.value.inquiry_group_types?.length || 0,
			itemLabelKey: 'label',
			itemTypeKey: 'group_type',
		},
		{
			key: 'categories',
			label: t('agora', 'Categories'),
			icon: '🏷️',
			count: editableData.value.categories?.length || 0,
			itemLabelKey: 'name',
			itemTypeKey: 'category_id',
		},
		{
			key: 'locations',
			label: t('agora', 'Locations'),
			icon: '📍',
			count: editableData.value.locations?.length || 0,
			itemLabelKey: 'name',
			itemTypeKey: 'location_id',
		},
	].filter(section => section.count > 0)
})

const toggleSection = (key: string) => {
	expandedSections.value[key] = !expandedSections.value[key]
}

const startEdit = (section: string, index: number) => {
	const item = editableData.value?.[section]?.[index]
	if (item) {
		editingItem.value = { section, index }
		editingItemData.value = JSON.parse(JSON.stringify(item))
	}
}

const cancelEdit = () => {
	editingItem.value = null
	editingItemData.value = null
}

const saveEdit = () => {
	if (editingItem.value && editingItemData.value) {
		wizardStore.updateEditableItem(
			editingItem.value.section,
			editingItem.value.index,
			editingItemData.value
		)
		editingItem.value = null
		editingItemData.value = null
	}
}

const removeItem = (section: string, index: number) => {
	if (confirm(t('agora', 'Are you sure you want to remove this item?'))) {
		wizardStore.removeEditableItem(section, index)
	}
}

const isEditing = (section: string, index: number) => {
	return editingItem.value?.section === section && editingItem.value?.index === index
}

// Helper to get editable label value (handles multi-language objects)
const getEditableLabelValue = (section: Section): string => {
	if (!editingItemData.value) {
		console.warn('[TemplateWizard] getEditableLabelValue: editingItemData is null')
		return ''
	}

	const labelKey = section.itemLabelKey
	const labelValue = editingItemData.value[labelKey]

	console.log('[TemplateWizard] getEditableLabelValue:', {
		labelKey,
		labelValue,
		typeofLabel: typeof labelValue,
		editingItemData: editingItemData.value
	})

	// Handle null/undefined
	if (labelValue === null || labelValue === undefined) {
		console.warn('[TemplateWizard] Label value is null/undefined for key:', labelKey)
		return ''
	}

	// Handle multi-language objects (shouldn't happen after extraction, but handle as fallback)
	if (typeof labelValue === 'object' && !Array.isArray(labelValue)) {
		const lang = wizardStore.selectedLanguage || 'en'
		const extracted = labelValue[lang] || labelValue.en || Object.values(labelValue).find(v => typeof v === 'string' && v !== '') || ''
		console.log('[TemplateWizard] Extracted from multi-lang object:', extracted)
		return String(extracted)
	}

	// Handle plain string (expected case after extraction)
	return String(labelValue)
}

// Helper to set editable label value
const setEditableLabelValue = (section: Section, newValue: string) => {
	if (!editingItemData.value) return

	const labelKey = section.itemLabelKey
	console.log('[TemplateWizard] setEditableLabelValue:', { labelKey, newValue })

	// After extraction, values should be plain strings, so just set directly
	editingItemData.value[labelKey] = newValue
}

const getItemLabel = (item: any, section: Section) => {
	const labelValue = item[section.itemLabelKey]

	// Handle multi-language objects (e.g., {en: "...", fr: "...", de: "...", gsw: "..."})
	if (labelValue && typeof labelValue === 'object' && !Array.isArray(labelValue)) {
		const lang = wizardStore.selectedLanguage || 'en'
		return labelValue[lang] || labelValue.en || labelValue[Object.keys(labelValue)[0]] || item[section.itemTypeKey] || t('agora', 'Unnamed')
	}

	// Handle plain string values
	return labelValue || item[section.itemTypeKey] || t('agora', 'Unnamed')
}

const getItemType = (item: any, section: Section) => {
	return item[section.itemTypeKey] || ''
}

const totalItems = computed(() => {
	if (!editableData.value) return 0
	return sections.value.reduce((sum, section) => sum + section.count, 0)
})

// Fetch duplicate analysis when component mounts
onMounted(async () => {
	await analyzeDuplicates()
})

// Analyze template for duplicates
const analyzeDuplicates = async () => {
	if (!editableData.value) return

	isAnalyzing.value = true
	analysisError.value = null

	try {
		const url = generateOcsUrl('/apps/agora/api/v1.0/templates/analyze')
		const response = await axios.post(url, {
			templateData: editableData.value,
			language: wizardStore.selectedLanguage,
		})

		if (response.data?.ocs?.data) {
			duplicateAnalysis.value = response.data.ocs.data
		}
	} catch (error) {
		console.error('Failed to analyze template:', error)
		analysisError.value = error instanceof Error ? error.message : 'Failed to analyze template'
	} finally {
		isAnalyzing.value = false
	}
}

// Get status indicator for a section
const getSectionStatus = (sectionKey: string) => {
	if (!duplicateAnalysis.value?.analysis?.[sectionKey]) {
		return { new: 0, existing: 0, total: 0 }
	}

	const data = duplicateAnalysis.value.analysis[sectionKey]
	const newCount = data.new?.length || 0
	const existingCount = data.existing?.length || 0

	return {
		new: newCount,
		existing: existingCount,
		total: newCount + existingCount,
	}
}

// Get item status (new or existing)
const getItemStatus = (sectionKey: string, itemType: string): 'new' | 'existing' | 'unknown' => {
	if (!duplicateAnalysis.value?.analysis?.[sectionKey]) return 'unknown'
	if (!itemType) return 'unknown'

	const data = duplicateAnalysis.value.analysis[sectionKey]

	// Check if item exists in new or existing lists
	// The backend returns items with a 'type' property that matches the item's type key value
	// Also check 'identifier' as fallback for different section types
	const matchItem = (item: any) => {
		return item.type === itemType ||
			item.identifier === itemType ||
			item.key === itemType ||
			item.id === itemType
	}

	const isNew = data.new?.some(matchItem)
	const isExisting = data.existing?.some(matchItem)

	console.log(`[getItemStatus] ${sectionKey}/${itemType}: new=${isNew}, existing=${isExisting}`, {
		newItems: data.new?.map((i: any) => i.type || i.identifier || i.key),
		existingItems: data.existing?.map((i: any) => i.type || i.identifier || i.key)
	})

	if (isNew) return 'new'
	if (isExisting) return 'existing'
	return 'unknown'
}

// Watch for editable data changes to initialize editing
watch(() => editableData.value, () => {
	if (editableData.value) {
		// Expand first section by default
		if (sections.value.length > 0) {
			expandedSections.value[sections.value[0].key] = true
		}
		// Re-analyze when data changes
		analyzeDuplicates()
	}
})
</script>

<template>
	<div class="preview-step">
		<div class="preview-header">
			<h2>{{ t('agora', 'Preview & Customize Template') }}</h2>
			<p class="subtitle">
				{{ t('agora', 'Review and customize the template before import') }}
			</p>
		</div>

		<div v-if="!editableData" class="loading-state">
			<p>{{ t('agora', 'Preparing template data...') }}</p>
		</div>

		<div v-else class="preview-content">
			<!-- Duplicate Analysis Loading -->
			<div v-if="isAnalyzing" class="analysis-loading">
				<NcLoadingIcon :size="32" />
				<p>{{ t('agora', 'Analyzing template for duplicates...') }}</p>
			</div>

			<!-- Analysis Error -->
			<NcNoteCard v-if="analysisError" type="error" class="analysis-error">
				{{ t('agora', 'Failed to analyze template:') }} {{ analysisError }}
			</NcNoteCard>

			<!-- Summary Card with Duplicate Analysis -->
			<div class="summary-card">
				<h3>{{ t('agora', 'Import Preview') }}</h3>
				<div v-if="duplicateAnalysis" class="summary-stats">
					<div class="stat-item">
						<span class="stat-icon">✨</span>
						<span class="stat-value stat-new">{{ duplicateAnalysis.totals.new }}</span>
						<span class="stat-label">{{ t('agora', 'New Items') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-icon">📋</span>
						<span class="stat-value stat-existing">{{ duplicateAnalysis.totals.existing }}</span>
						<span class="stat-label">{{ t('agora', 'Existing (Skipped)') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-icon">📦</span>
						<span class="stat-value">{{ totalItems }}</span>
						<span class="stat-label">{{ t('agora', 'Total Items') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-icon">🌐</span>
						<span class="stat-value">{{ wizardStore.selectedLanguage }}</span>
						<span class="stat-label">{{ t('agora', 'Language') }}</span>
					</div>
				</div>
				<div v-else class="summary-stats">
					<div class="stat-item">
						<span class="stat-icon">📦</span>
						<span class="stat-value">{{ totalItems }}</span>
						<span class="stat-label">{{ t('agora', 'Total Items') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-icon">🌐</span>
						<span class="stat-value">{{ wizardStore.selectedLanguage }}</span>
						<span class="stat-label">{{ t('agora', 'Language') }}</span>
					</div>
				</div>
			</div>

			<!-- Important Note -->
			<NcNoteCard v-if="duplicateAnalysis && duplicateAnalysis.totals.existing > 0" type="info" class="duplicate-notice">
				{{ t('agora', '{count} item(s) already exist in the database and will be skipped during import.', {count: duplicateAnalysis.totals.existing}) }}
			</NcNoteCard>

			<!-- Sections -->
			<div class="sections-container">
				<div
					v-for="section in sections"
					:key="section.key"
					class="section-block">
					<div
						class="section-header"
						@click="toggleSection(section.key)">
						<div class="section-title">
							<span class="section-icon">{{ section.icon }}</span>
							<h3>{{ section.label }}</h3>
							<span class="section-count">({{ section.count }})</span>
							<span v-if="duplicateAnalysis" class="section-status">
								<span v-if="getSectionStatus(section.key).new > 0" class="status-badge status-new">
									{{ getSectionStatus(section.key).new }} new
								</span>
								<span v-if="getSectionStatus(section.key).existing > 0" class="status-badge status-existing">
									{{ getSectionStatus(section.key).existing }} exist
								</span>
							</span>
						</div>
						<span class="expand-icon">
							{{ expandedSections[section.key] ? '▼' : '▶' }}
						</span>
					</div>

					<div v-if="expandedSections[section.key]" class="section-content">
						<div
							v-for="(item, index) in editableData[section.key]"
							:key="index"
							class="item-row">
							<!-- View Mode -->
							<div v-if="!isEditing(section.key, index)" class="item-view">
								<div class="item-info">
									<div class="item-header-row">
										<div class="item-label">{{ getItemLabel(item, section) }}</div>
										<span v-if="duplicateAnalysis && getItemStatus(section.key, getItemType(item, section)) !== 'unknown'"
										class="item-status-badge"
										:class="{
											'badge-new': getItemStatus(section.key, getItemType(item, section)) === 'new',
											'badge-existing': getItemStatus(section.key, getItemType(item, section)) === 'existing'
										}">
										{{ getItemStatus(section.key, getItemType(item, section)) === 'new' ? '✨ New' : '📋 Exists' }}
									</span>
									</div>
									<div class="item-type">{{ getItemType(item, section) }}</div>
									<div v-if="item.description" class="item-description">
										{{ item.description }}
									</div>
								</div>
								<div class="item-actions">
									<NcButton
										type="tertiary"
										@click="startEdit(section.key, index)">
										{{ t('agora', 'Edit') }}
									</NcButton>
									<NcButton
										type="error"
										@click="removeItem(section.key, index)">
										{{ t('agora', 'Remove') }}
									</NcButton>
								</div>
							</div>

							<!-- Edit Mode -->
							<div v-else class="item-edit">
								<div class="edit-form">
									<NcTextField
										v-model="editingItemData[section.itemTypeKey]"
										:label="t('agora', 'Type Key')"
										:placeholder="t('agora', 'Change to avoid duplicates')"
										class="edit-field" />

									<NcTextField
										:model-value="getEditableLabelValue(section)"
										@update:model-value="setEditableLabelValue(section, $event)"
										:label="t('agora', 'Label')"
										class="edit-field" />

									<NcTextArea
										v-if="editingItemData.description !== undefined"
										v-model="editingItemData.description"
										:label="t('agora', 'Description')"
										class="edit-field" />
								</div>
								<div class="edit-actions">
									<NcButton
										type="primary"
										@click="saveEdit">
										{{ t('agora', 'Save') }}
									</NcButton>
									<NcButton
										type="tertiary"
										@click="cancelEdit">
										{{ t('agora', 'Cancel') }}
									</NcButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.preview-step {
	padding: 20px;
	max-width: 900px;
	margin: 0 auto;
}

.preview-header {
	text-align: center;
	margin-bottom: 30px;

	h2 {
		font-size: 24px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.subtitle {
		color: var(--color-text-maxcontrast);
		font-size: 14px;
	}
}

.loading-state {
	text-align: center;
	padding: 40px;
	color: var(--color-text-maxcontrast);
}

.analysis-loading {
	text-align: center;
	padding: 20px;
	background: var(--color-background-hover);
	border-radius: var(--border-radius-large);
	margin-bottom: 20px;

	p {
		margin-top: 12px;
		color: var(--color-text-maxcontrast);
	}
}

.analysis-error {
	margin-bottom: 20px;
}

.duplicate-notice {
	margin-bottom: 20px;
}

.summary-card {
	background: var(--color-primary-element-light);
	border-radius: var(--border-radius-large);
	padding: 20px;
	margin-bottom: 24px;

	h3 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 16px;
		color: var(--color-primary-element);
	}
}

.summary-stats {
	display: flex;
	gap: 32px;
	justify-content: center;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}

.stat-icon {
	font-size: 32px;
}

.stat-value {
	font-size: 24px;
	font-weight: 700;
	color: var(--color-primary-element);

	&.stat-new {
		color: #1a7f37; // Dark green for light mode
		@media (prefers-color-scheme: dark) {
			color: #3fb950; // Bright green for dark mode
		}
	}

	&.stat-existing {
		color: #9a6700; // Dark orange for light mode
		@media (prefers-color-scheme: dark) {
			color: #e09b13; // Bright orange for dark mode
		}
	}
}

.stat-label {
	font-size: 12px;
	color: var(--color-text-maxcontrast);
	text-transform: uppercase;
}

.sections-container {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.section-block {
	background: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	overflow: hidden;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 20px;
	cursor: pointer;
	background: var(--color-background-hover);
	transition: background 0.2s ease;

	&:hover {
		background: var(--color-background-dark);
	}
}

.section-title {
	display: flex;
	align-items: center;
	gap: 12px;

	h3 {
		font-size: 16px;
		font-weight: 600;
		margin: 0;
	}
}

.section-icon {
	font-size: 20px;
}

.section-count {
	color: var(--color-text-maxcontrast);
	font-size: 14px;
}

.section-status {
	display: flex;
	gap: 8px;
	margin-left: auto;
}

.status-badge {
	font-size: 11px;
	padding: 3px 8px;
	border-radius: var(--border-radius-pill);
	font-weight: 600;

	&.status-new {
		background-color: rgba(var(--color-success-rgb), 0.15);
		color: var(--color-success-text);
		border: 1px solid var(--color-success);
	}

	&.status-existing {
		background-color: rgba(var(--color-warning-rgb), 0.15);
		color: var(--color-warning-text);
		border: 1px solid var(--color-warning);
	}
}

.expand-icon {
	color: var(--color-text-maxcontrast);
	font-size: 12px;
}

.section-content {
	padding: 12px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.item-row {
	background: var(--color-background-hover);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);
	padding: 12px 16px;
}

.item-view {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 16px;
}

.item-info {
	flex: 1;
}

.item-header-row {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 4px;
}

.item-label {
	font-size: 15px;
	font-weight: 600;
	flex: 1;
}

.item-status-badge {
	font-size: 11px;
	padding: 3px 10px;
	border-radius: var(--border-radius-pill);
	font-weight: 600;

	&.badge-new {
		background-color: rgba(var(--color-success-rgb), 0.15);
		color: var(--color-success-text);
		border: 1px solid var(--color-success);
	}

	&.badge-existing {
		background-color: rgba(var(--color-warning-rgb), 0.15);
		color: var(--color-warning-text);
		border: 1px solid var(--color-warning);
	}
}

.item-type {
	font-size: 13px;
	color: var(--color-text-maxcontrast);
	font-family: monospace;
	margin-bottom: 4px;
}

.item-description {
	font-size: 13px;
	color: var(--color-text-maxcontrast);
	margin-top: 8px;
}

.item-actions {
	display: flex;
	gap: 8px;
}

.item-edit {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.edit-form {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.edit-field {
	width: 100%;
}

.edit-actions {
	display: flex;
	gap: 8px;
	justify-content: flex-end;
}
</style>
