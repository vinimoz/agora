<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { watch, computed, ref, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { useSessionStore } from '../../stores/session.ts'
import { FilterType, useInquiriesStore } from '../../stores/inquiries.ts'
import { NcButton, NcSelect, NcTextField, NcCheckboxRadioSwitch } from '@nextcloud/vue'

const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()

const selectedType = ref<FilterType | 'all'>('all')
const selectedInquiryStatus = ref<string>('all')
const selectedCategory = ref<string>('all')
const selectedLocation = ref<string>('all')
const hasComments = ref<boolean | null>(null)
const hasSupports = ref<boolean | null>(null)
const mainInquiriesOnly = ref<boolean>(true)
const searchQuery = ref<string>('')

const isFiltersOpen = ref(false)

function getValue<T>(v: T | { value: T } | null | undefined): T | null | undefined {
	return v && typeof v === 'object' && 'value' in v
		? (v as { value: T }).value
		: v
}

interface Props {
	familyType?: string
}
const props = defineProps<Props>()

watch(() => props.familyType, () => {
	selectedType.value = 'all'
	applyFilters()
})

const filterOptions = computed(() => {
	const baseTypeOptions = [
		{ value: 'all', label: t('agora', 'All types') },
	]

	const typeOptions = props.familyType
		? [
			...baseTypeOptions,
			...(sessionStore.appSettings.inquiryTypeTab
				?.filter(type => type.family === props.familyType)
				.map(type => ({
					value: type.inquiry_type,
					label: type.label || type.inquiry_type,
				})) || []),
		]
		: [
			...baseTypeOptions,
			...(sessionStore.appSettings.inquiryTypeTab
				?.map(type => ({
					value: type.inquiry_type,
					label: type.label || type.inquiry_type,
				})) || []),
		]

	return {
		types: typeOptions,
		categories: [
			{ value: 'all', label: t('agora', 'All categories') },
			...(sessionStore.appSettings.categoryTab?.map((cat) => ({
				value: cat.id,
				label: cat.name,
			})) || []),
		],
		locations: [
			{ value: 'all', label: t('agora', 'All locations') },
			...(sessionStore.appSettings.locationTab?.map((loc) => ({
				value: loc.id,
				label: loc.name,
			})) || []),
		],
		participation: [
			{ value: null, label: t('agora', 'Any comments') },
			{ value: true, label: t('agora', 'With comments') },
			{ value: false, label: t('agora', 'Without comments') },
		],
		support: [
			{ value: null, label: t('agora', 'Any supports') },
			{ value: true, label: t('agora', 'With supports') },
			{ value: false, label: t('agora', 'Without supports') },
		],
	}
})

const applyFilters = () => {
	if (!inquiriesStore) {
		return
	}

	inquiriesStore.setFilters({
		type: getValue(selectedType.value) === 'all'
			? undefined
			: (getValue(selectedType.value) as FilterType),

		inquiryStatus: getValue(selectedInquiryStatus.value) === 'all'
			? undefined
			: getValue(selectedInquiryStatus.value),

		categoryId: getValue(selectedCategory.value) === 'all'
			? undefined
			: getValue(selectedCategory.value),

		locationId: getValue(selectedLocation.value) === 'all'
			? undefined
			: getValue(selectedLocation.value),

		hasComments: getValue(hasComments.value),
		hasSupports: getValue(hasSupports.value),

		parentId: mainInquiriesOnly.value ? null : undefined,

		search: searchQuery.value.trim() || undefined,
		familyType: props.familyType,
	})
}

const resetFilters = () => {
	selectedType.value = 'all'
	selectedCategory.value = 'all'
	selectedLocation.value = 'all'
	hasComments.value = null
	hasSupports.value = null
	mainInquiriesOnly.value = true
	searchQuery.value = ''
	inquiriesStore.resetFilters()
}

const activeFiltersCount = computed(() => {
	let count = 0
	if (getValue(selectedType.value) !== 'all') count += 1
	if (getValue(selectedCategory.value) !== 'all') count += 1
	if (getValue(selectedLocation.value) !== 'all') count += 1
	if (getValue(hasComments.value) !== null) count += 1
	if (getValue(hasSupports.value) !== null) count += 1
	if (searchQuery.value.trim()) count += 1
	return count
})

onUnmounted(() => {
	inquiriesStore.resetFilters()
})
</script>

<template>
	<div class="inquiry-filters">
		<!-- Toolbar: search + filter toggle + clear -->
		<div class="filters-toolbar">
			<div class="search-wrapper">
				<NcTextField
					v-model="searchQuery"
					type="text"
					:placeholder="t('agora', 'Search inquiries')"
					:label="t('agora', 'Search inquiries')"
					:label-visible="false"
					class="search-input"
					@input="applyFilters"
				/>
			</div>

			<div class="toolbar-actions">
				<NcButton
					class="filters-toggle-btn"
					:class="{ active: isFiltersOpen }"
					@click="isFiltersOpen = !isFiltersOpen"
				>
					<template #icon>
						<span class="toggle-icon" aria-hidden="true">{{ isFiltersOpen ? '▲' : '▼' }}</span>
					</template>
					{{ t('agora', 'Filters') }}
					<span v-if="activeFiltersCount > 0" class="filter-count">{{ activeFiltersCount }}</span>
				</NcButton>

				<NcButton
					v-if="activeFiltersCount > 0"
					class="reset-btn"
					@click="resetFilters"
				>
					{{ t('agora', 'Clear all') }}
				</NcButton>
			</div>
		</div>

		<!-- Always-visible main filters -->
		<div class="filters-main">
			<div v-if="filterOptions.locations.length > 1" class="filter-field">
				<label class="filter-label">{{ t('agora', 'Location') }}</label>
				<NcSelect
					v-model="selectedLocation"
					:options="filterOptions.locations"
					:clearable="false"
					:multiple="false"
					:input-label="t('agora', 'Location')"
					label-outside
					value-prop="value"
					label-prop="label"
					@update:model-value="applyFilters"
				/>
			</div>

			<div v-if="filterOptions.categories.length > 1" class="filter-field">
				<label class="filter-label">{{ t('agora', 'Category') }}</label>
				<NcSelect
					v-model="selectedCategory"
					:options="filterOptions.categories"
					:clearable="false"
					:multiple="false"
					:input-label="t('agora', 'Category')"
					value-prop="value"
					label-prop="label"
					label-outside
					@update:model-value="applyFilters"
				/>
			</div>

			<div class="filter-field filter-field--checkbox">
				<NcCheckboxRadioSwitch
					v-model="mainInquiriesOnly"
					type="checkbox"
					@update:model-value="applyFilters"
				>
					{{ t('agora', 'Main inquiries') }}
				</NcCheckboxRadioSwitch>
			</div>
		</div>

		<!-- Expanded filters -->
		<div v-if="isFiltersOpen" class="filters-expanded">
			<div class="filter-field">
				<label class="filter-label">{{ t('agora', 'Type') }}</label>
				<NcSelect
					v-model="selectedType"
					:options="filterOptions.types"
					:clearable="false"
					:multiple="false"
					:input-label="t('agora', 'Type')"
					value-prop="value"
					label-prop="label"
					label-outside
					@update:model-value="applyFilters"
				/>
			</div>

			<div class="filter-field">
				<label class="filter-label">{{ t('agora', 'Comments') }}</label>
				<NcSelect
					v-model="hasComments"
					:options="filterOptions.participation"
					:clearable="false"
					:multiple="false"
					:input-label="t('agora', 'Comments')"
					value-prop="value"
					label-prop="label"
					label-outside
					@update:model-value="applyFilters"
				/>
			</div>

			<div class="filter-field">
				<label class="filter-label">{{ t('agora', 'Supports') }}</label>
				<NcSelect
					v-model="hasSupports"
					:options="filterOptions.support"
					:clearable="false"
					:multiple="false"
					:input-label="t('agora', 'Supports')"
					value-prop="value"
					label-prop="label"
					label-outside
					@update:model-value="applyFilters"
				/>
			</div>
		</div>

		<!-- Active filters summary -->
		<div v-if="activeFiltersCount > 0" class="active-filters-summary">
			<span class="summary-label">{{ t('agora', 'Active filters') }}</span>

			<span v-if="getValue(selectedType) !== 'all'" class="filter-tag">
				{{ filterOptions.types.find(t => t.value === getValue(selectedType))?.label }}
			</span>

			<span v-if="getValue(selectedCategory) !== 'all'" class="filter-tag">
				{{ filterOptions.categories.find(c => c.value === getValue(selectedCategory))?.label }}
			</span>

			<span v-if="getValue(selectedLocation) !== 'all'" class="filter-tag">
				{{ filterOptions.locations.find(l => l.value === getValue(selectedLocation))?.label }}
			</span>

			<span v-if="getValue(hasComments) !== null" class="filter-tag">
				{{ filterOptions.participation.find(p => p.value === getValue(hasComments))?.label }}
			</span>

			<span v-if="getValue(hasSupports) !== null" class="filter-tag">
				{{ filterOptions.support.find(s => s.value === getValue(hasSupports))?.label }}
			</span>

			<span v-if="searchQuery" class="filter-tag">
				{{ t('agora', 'Search') }}: "{{ searchQuery }}"
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.inquiry-filters {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 16px;
	padding: 16px;
	background-color: var(--color-background-dark);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large, 12px);
}

/* ---------- Toolbar ---------- */
.filters-toolbar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;

	.search-wrapper {
		flex: 1 1 260px;
		min-width: 200px;

		.search-input {
			width: 100%;
		}
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}
}

.filters-toggle-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;

	.toggle-icon {
		font-size: 10px;
		line-height: 1;
	}

	.filter-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		margin-left: 2px;
		background-color: var(--color-error);
		color: #fff;
		border-radius: 9px;
		font-size: 11px;
		font-weight: 600;
		line-height: 1;
	}

	&.active {
		background-color: var(--color-primary-element);
		border-color: var(--color-primary-element);
		color: var(--color-primary-element-text, #fff);
	}
}

/* ---------- Filter fields ---------- */
.filters-main,
.filters-expanded {
	display: grid;
	gap: 12px 16px;
	align-items: end;
}

.filters-main {
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.filters-expanded {
	padding-top: 16px;
	border-top: 1px solid var(--color-border);
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.filter-field {
	display: flex;
	flex-direction: column;
	gap: 6px;
	min-width: 0;

	.filter-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--color-text-lighter);
		line-height: 1.2;
	}

	:deep(.select) {
		width: 100%;
	}
}

.filter-field--checkbox {
	justify-content: flex-end;

	:deep(.checkbox-radio-switch) {
		margin: 0;
	}

	:deep(.checkbox-radio-switch__label) {
		font-size: 13px;
	}
}

/* ---------- Active filters ---------- */
.active-filters-summary {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
	padding-top: 12px;
	border-top: 1px solid var(--color-border);

	.summary-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--color-text-lighter);
	}

	.filter-tag {
		padding: 3px 10px;
		background-color: var(--color-primary-element);
		color: var(--color-primary-element-text, #fff);
		border-radius: 12px;
		font-size: 11px;
		font-weight: 500;
		line-height: 1.6;
	}
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
	.inquiry-filters {
		padding: 12px;
		gap: 12px;
	}

	.filters-main,
	.filters-expanded {
		grid-template-columns: 1fr;
	}

	.filters-toolbar {
		.search-wrapper {
			flex: 1 1 100%;
			min-width: 0;
		}

		.toolbar-actions {
			width: 100%;
			justify-content: flex-end;
		}
	}
}

@media (max-width: 480px) {
	.filters-toolbar {
		.toolbar-actions {
			flex-direction: column;
			align-items: stretch;

			:deep(.button-vue) {
				width: 100%;
				justify-content: center;
			}
		}
	}

	.active-filters-summary {
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>
