<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { useSessionStore } from '../../stores/session.ts'
import { FilterType, useInquiriesStore } from '../../stores/inquiries.ts'
import { NcButton, NcSelect, NcTextField, NcCheckboxRadioSwitch } from '@nextcloud/vue'

const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()

const selectedType = ref<FilterType | 'all'>('all')
const selectedModerationStatus = ref<string>('all')
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



const filterOptions = computed(() => ({
  types: [
    { value: 'all', label: t('agora', 'All types') },
    { value: 'proposal', label: t('agora', 'Proposals') },
    { value: 'debate', label: t('agora', 'Debates') },
    { value: 'petition', label: t('agora', 'Petitions') },
    { value: 'project', label: t('agora', 'Projects') },
    { value: 'grievance', label: t('agora', 'Grievances') },
    { value: 'suggestion', label: t('agora', 'Suggestions') },
    { value: 'official', label: t('agora', 'Official') },
  ],
  moderationStatuses: [
    { value: 'all', label: t('agora', 'All statuses') },
    ...(sessionStore.appSettings.moderationStatusTab?.map((status) => ({
      value: status.id,
      label: status.name,
    })) || []),
  ],
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
}))

const applyFilters = () => {
  if (!inquiriesStore) {
    console.error('Inquiries store not initialized')
    return
  }
   
  inquiriesStore.setFilters({
    type: getValue(selectedType.value) === 'all' 
      ? undefined
      : (getValue(selectedType.value) as FilterType),

    moderationStatus: getValue(selectedModerationStatus.value) === 'all'
      ? undefined
      : getValue(selectedModerationStatus.value),

    categoryId: getValue(selectedCategory.value) === 'all'
      ? undefined
      : getValue(selectedCategory.value),

    locationId: getValue(selectedLocation.value) === 'all'
      ? undefined
      : getValue(selectedLocation.value),

    hasComments: getValue(hasComments.value), 
    hasSupports: getValue(hasSupports.value), 

    parentId: mainInquiriesOnly.value ? 0 : undefined,

    search: searchQuery.value.trim() || undefined,
  })
}


const resetFilters = () => {
  selectedType.value = 'all'
  selectedModerationStatus.value = 'all'
  selectedCategory.value = 'all'
  selectedLocation.value = 'all'
  hasComments.value = null
  hasSupports.value = null
  mainInquiriesOnly.value = true // Reset to checked by default
  searchQuery.value = ''
  inquiriesStore.resetFilters()
}

const activeFiltersCount = computed(() => {
  let count = 0
  if (getValue(selectedType.value) !== 'all') count += 1
  if (getValue(selectedModerationStatus.value) !== 'all') count += 1
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
    <div class="filters-header">
      <!-- Search box -->
      <div class="search-box compact">
        <NcTextField
          v-model="searchQuery"
          type="text"
          :placeholder="t('agora', 'Search inquiries')"
          :label="t('agora', 'Search inquiries')"
          :label-visible="false"
          class="search-input"
          @input="applyFilters"
        />
        <span class="search-icon">🔍</span>
      </div>

      <!-- Filters toggle button -->
      <NcButton
        class="filters-toggle-btn"
        :class="{ active: isFiltersOpen }"
        @click="isFiltersOpen = !isFiltersOpen"
      >
        <span class="filter-icon">⚙️</span>
        {{ t('agora', 'Filters') }}
        <span v-if="activeFiltersCount > 0" class="filter-count">
          {{ activeFiltersCount }}
        </span>
        <span class="toggle-arrow">{{ isFiltersOpen ? '▲' : '▼' }}</span>
      </NcButton>

      <!-- Main filters always visible -->
      <div class="main-filters">
        <!-- Location filter -->
        <div v-if="filterOptions.locations.length > 1" class="filter-group compact">
          <label>{{ t('agora', 'Location:') }}</label>
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

        <!-- Category filter -->
        <div v-if="filterOptions.categories.length > 1" class="filter-group compact">
          <label>{{ t('agora', 'Category:') }}</label>
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

        <!-- Main inquiries checkbox -->
        <div class="filter-group compact checkbox-group">
          <NcCheckboxRadioSwitch
            v-model="mainInquiriesOnly"
            type="checkbox"
            @update:model-value="applyFilters"
          >
            {{ t('agora', 'Main inquiries') }}
          </NcCheckboxRadioSwitch>
        </div>
      </div>

      <!-- Clear all button -->
      <NcButton v-if="activeFiltersCount > 0" class="reset-btn compact" @click="resetFilters">
        {{ t('agora', 'Clear all') }}
      </NcButton>
    </div>

    <!-- Expanded filters section -->
    <div v-if="isFiltersOpen" class="filters-expanded">
      <div class="filters-grid">
        <!-- Type filter -->
        <div class="filter-group">
          <label>{{ t('agora', 'Type') }}</label>
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

        <!-- Moderation status filter -->
        <div class="filter-group">
          <label>{{ t('agora', 'Moderation Status') }}</label>
          <NcSelect 
            v-model="selectedModerationStatus"
            :options="filterOptions.moderationStatuses"
            :clearable="false"
            :multiple="false"
            :input-label="t('agora', 'Moderation Status')"
	    value-prop="value"
  	    label-prop="label"
            label-outside
            @update:model-value="applyFilters"
          />
        </div>

        <!-- Comments filter -->
        <div class="filter-group">
          <label>{{ t('agora', 'Comments') }}</label>
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

        <!-- Supports filter -->
        <div class="filter-group">
          <label>{{ t('agora', 'Supports') }}</label>
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
    </div>

    <!-- Active filters summary -->
    <div v-if="activeFiltersCount > 0" class="active-filters-summary">
	    <span class="summary-label">{{ t('agora', 'Active filters:') }}</span>

	    <span v-if="getValue(selectedType) !== 'all'" class="filter-tag">
		    {{ filterOptions.types.find(t => t.value === getValue(selectedType))?.label }}
	    </span>

	    <span v-if="getValue(selectedModerationStatus) !== 'all'" class="filter-tag">
		    {{ filterOptions.moderationStatuses.find(s => s.value === getValue(selectedModerationStatus))?.label }}
	    </span>

	    <span v-if="getValue(selectedCategory) !== 'all'" class="filter-tag">
		    {{ filterOptions.categories.find(c => c.value === getValue(selectedCategory))?.label }}
	    </span>

	    <span v-if="getValue(selectedLocation) !== 'all'" class="filter-tag">
		    {{ filterOptions.locations.find(l => l.value === getValue(selectedLocation))?.label }}
	    </span>

	    <!-- Example for Comments -->
	    <span v-if="getValue(hasComments) !== null" class="filter-tag">
		    {{ filterOptions.participation.find(p => p.value === getValue(hasComments))?.label }}
	    </span>
	    <!-- Example for Supports -->
	    <span v-if="getValue(hasSupports) !== null" class="filter-tag">
		    {{ filterOptions.support.find(s => s.value === getValue(hasSupports))?.label }}
	    </span>
	    <span v-if="searchQuery" class="filter-tag">
		    {{ t('agora', 'Search:') }} "{{ searchQuery }}"
	    </span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.inquiry-filters {
	margin-bottom: 10px;
	padding: 12px;
	background-color: var(--color-background-dark);
	border-radius: 12px;
	border: 1px solid var(--color-border);

	.filters-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
		flex-wrap: nowrap;
		min-width: 0;

		.search-box.compact {
			position: relative;
			flex: 0 0 auto;
			min-width: 250px;
			max-width: 350px;

			.search-input {
				width: 100%;
				padding: 10px 12px 10px 36px;
				border: 1px solid var(--color-border);
				border-radius: 6px;
				font-size: 14px;
				background-color: var(--color-main-background);
				color: var(--color-main-text);

				&:focus {
					outline: none;
					border-color: var(--color-primary-element);
				}
			}

			.search-icon {
				position: absolute;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
				color: var(--color-text-lighter);
				font-size: 14px;
			}
		}

		.filters-toggle-btn {
			position: relative;
			padding-right: 30px;
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 10px 14px;
			background-color: var(--color-background-darker);
			border: 1px solid var(--color-border);
			border-radius: 6px;
			color: var(--color-text-lighter);
			font-size: 13px;
			font-weight: 500;
			cursor: pointer;
			transition: all 0.2s ease;
			white-space: nowrap;
			flex-shrink: 0;
			min-width: auto;
			height: fit-content;

			&:hover {
				background-color: var(--color-background-hover);
				color: var(--color-main-text);
			}

			&.active {
				background-color: var(--color-primary-element);
				color: white;
				border-color: var(--color-primary-element);
			}

			.filter-icon {
				font-size: 14px;
			}
			.filter-count {
				position: absolute;
				right: 8px;
				top: 50%;
				transform: translateY(-50%);
				background-color: var(--color-error);
				color: white;
				border-radius: 50%;
				width: 18px;
				height: 18px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 11px;
				font-weight: 600;
			}

			.toggle-arrow {
				margin-left: 4px;
				font-size: 12px;
			}
		}

		.main-filters {
			display: flex;
			align-items: center;
			gap: 16px;
			flex: 1;
			justify-content: flex-start;
			min-width: 0;
			flex-wrap: nowrap;

			.filter-group.compact {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 8px;
				white-space: nowrap;
				flex-shrink: 0;

				label {
					font-weight: 600;
					font-size: 12px;
					color: var(--color-text-lighter);
					margin-bottom: 0;
					flex-shrink: 0;
				}

				:deep(.nc-select) {
					min-width: 150px;
					flex-shrink: 0;
				}
			}

			.checkbox-group {
				flex-shrink: 0;
				white-space: nowrap;

				:deep(.checkbox-radio-switch) {
					margin: 0;
				}

				:deep(.checkbox-radio-switch__label) {
					font-size: 12px;
					white-space: nowrap;
				}
			}
		}

		.reset-btn.compact {
			padding: 10px 14px;
			background-color: transparent;
			border: 1px solid var(--color-border);
			border-radius: 6px;
			color: var(--color-text-lighter);
			font-size: 13px;
			cursor: pointer;
			white-space: nowrap;
			flex-shrink: 0;
			min-width: auto;
			height: fit-content;

			&:hover {
				background-color: var(--color-background-hover);
				color: var(--color-main-text);
			}
		}
	}

	.filters-expanded {
		margin-bottom: 16px;
		padding-top: 16px;
		border-top: 1px solid var(--color-border-light);

		.filters-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 16px;

			.filter-group {
				display: flex;
				flex-direction: column;
				gap: 6px;

				label {
					font-weight: 600;
					font-size: 12px;
					color: var(--color-text-lighter);
				}

				:deep(.nc-select) {
					width: 100%;
				}
			}
		}
	}

	.active-filters-summary {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		padding-top: 16px;
		border-top: 1px solid var(--color-border-light);

		.summary-label {
			font-weight: 600;
			font-size: 12px;
			color: var(--color-text-lighter);
		}

		.filter-tag {
			padding: 4px 8px;
			background-color: var(--color-primary-element);
			color: white;
			border-radius: 12px;
			font-size: 11px;
			font-weight: 500;
		}
	}
}

															      @media (max-width: 1400px) {
																      .inquiry-filters {
																	      .filters-header {
																		      gap: 12px;

																		      .search-box.compact {
																			      min-width: 200px;
																			      max-width: 300px;
																		      }

																		      .main-filters {
																			      gap: 12px;

																			      .filter-group.compact {
																				      :deep(.nc-select) {
																					      min-width: 130px;
																				      }
																			      }
																		      }
																	      }
																      }
															      }

															      @media (max-width: 1200px) {
																      .inquiry-filters {
																	      .filters-header {
																		      gap: 10px;

																		      .search-box.compact {
																			      min-width: 180px;
																			      max-width: 250px;
																		      }

																		      .main-filters {
																			      gap: 10px;

																			      .filter-group.compact {
																				      :deep(.nc-select) {
																					      min-width: 120px;
																				      }
																			      }
																		      }
																	      }
																      }
															      }

															      @media (max-width: 1024px) {
																      .inquiry-filters {
																	      .filters-header {
																		      flex-wrap: wrap;
																		      gap: 12px;

																		      .search-box.compact {
																			      max-width: none;
																			      min-width: 200px;
																			      order: 1;
																			      flex: 1;
																		      }

																		      .filters-toggle-btn {
																			      order: 2;
																			      flex-shrink: 0;
																		      }

																		      .main-filters {
																			      order: 3;
																			      flex-basis: 100%;
																			      margin-top: 12px;
																			      justify-content: flex-start;
																			      gap: 12px;
																			      flex-wrap: wrap;
																		      }

																		      .reset-btn.compact {
																			      order: 4;
																			      flex-shrink: 0;
																		      }
																	      }

																	      .filters-expanded {
																		      .filters-grid {
																			      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
																			      gap: 12px;
																		      }
																	      }
																      }
															      }

															      @media (max-width: 768px) {
																      .inquiry-filters {
																	      padding: 12px;

																	      .filters-header {
																		      gap: 10px;

																		      .search-box.compact {
																			      min-width: 150px;
																			      flex: 1;
																		      }

																		      .main-filters {
																			      gap: 10px;
																			      flex-wrap: wrap;

																			      .filter-group.compact {
																				      flex: 1;
																				      min-width: 140px;
																			      }
																		      }

																		      .filters-toggle-btn {
																			      font-size: 12px;
																			      padding: 8px 12px;
																		      }

																		      .reset-btn.compact {
																			      font-size: 12px;
																			      padding: 8px 12px;
																		      }
																	      }

																	      .filters-expanded {
																		      .filters-grid {
																			      grid-template-columns: 1fr;
																			      gap: 12px;
																		      }
																	      }

																	      .active-filters-summary {
																		      flex-direction: column;
																		      align-items: flex-start;
																		      gap: 6px;

																		      .summary-label {
																			      margin-bottom: 2px;
																		      }
																	      }
																      }
															      }

															      @media (max-width: 480px) {
																      .inquiry-filters {
																	      .filters-header {
																		      flex-direction: column;
																		      align-items: stretch;
																		      gap: 10px;

																		      .search-box.compact {
																			      max-width: none;
																			      order: 1;
																			      min-width: auto;
																		      }

																		      .filters-toggle-btn {
																			      order: 2;
																			      justify-content: center;
																		      }

																		      .main-filters {
																			      order: 3;
																			      flex-direction: column;
																			      align-items: stretch;
																			      gap: 10px;

																			      .filter-group.compact {
																				      min-width: auto;
																				      justify-content: space-between;
																			      }
																		      }

																		      .reset-btn.compact {
																			      order: 4;
																			      justify-content: center;
																		      }
																	      }
																      }
															      }
</style>
