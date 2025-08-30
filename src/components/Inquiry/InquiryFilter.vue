<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue';
import { t } from '@nextcloud/l10n';
import { useSessionStore } from '../../stores/session.ts';
import { FilterType, useInquiriesStore } from '../../stores/inquiries.ts';

const sessionStore = useSessionStore();
const inquiriesStore = useInquiriesStore();

console.log('Inquiries store:', inquiriesStore);

// Références pour les filtres
const selectedType = ref<FilterType | 'all'>('all');
const selectedCategory = ref<string>('all');
const selectedLocation = ref<string>('all');
const hasComments = ref<boolean | null>(null);
const hasSupports = ref<boolean | null>(null);
const searchQuery = ref<string>('');

// État d'ouverture/fermeture des filtres
const isFiltersOpen = ref(false);

// Options de filtre disponibles
const filterOptions = computed(() => ({
  types: [
    { value: 'all', label: t('agora', 'All types') },
    { value: 'proposal', label: t('agora', 'Proposals') },
    { value: 'debate', label: t('agora', 'Debates') },
    { value: 'petition', label: t('agora', 'Petitions') },
    { value: 'project', label: t('agora', 'Projects') },
    { value: 'grievance', label: t('agora', 'Grievances') },
    { value: 'suggestion', label: t('agora', 'Suggestions') },
    { value: 'official', label: t('agora', 'Official') }
  ],
  categories: [
    { value: 'all', label: t('agora', 'All categories') },
    ...(sessionStore.appSettings.categoryTab?.map((cat) => ({
      value: cat.id,
      label: cat.name
    })) || [])
  ],
  locations: [
    { value: 'all', label: t('agora', 'All locations') },
    ...(sessionStore.appSettings.locationTab?.map((loc) => ({
      value: loc.id,
      label: loc.name
    })) || [])
  ],
  participation: [
    { value: null, label: t('agora', 'Any comments') },
    { value: true, label: t('agora', 'With comments') },
    { value: false, label: t('agora', 'Without comments') }
  ],
  support: [
    { value: null, label: t('agora', 'Any supports') },
    { value: true, label: t('agora', 'With supports') },
    { value: false, label: t('agora', 'Without supports') }
  ]
}));

const applyFilters = () => {
	  if (!inquiriesStore) {
    console.error('Inquiries store not initialized');
    return;
  }
  inquiriesStore.setFilters({
    type:
      selectedType.value !== 'all'
        ? (selectedType.value as FilterType)
        : undefined,
    categoryId:
      selectedCategory.value !== 'all' ? selectedCategory.value : undefined,
    locationId:
      selectedLocation.value !== 'all' ? selectedLocation.value : undefined,
    hasComments: hasComments.value,
    hasSupports: hasSupports.value,
    search: searchQuery.value.trim() || undefined
  });
};

const resetFilters = () => {
  selectedType.value = 'all';
  selectedCategory.value = 'all';
  selectedLocation.value = 'all';
  hasComments.value = null;
  hasSupports.value = null;
  searchQuery.value = '';
  inquiriesStore.resetFilters();
};

const activeFiltersCount = computed(() => {
  let count = 0;
  if (selectedType.value !== 'all') count++;
  if (selectedCategory.value !== 'all') count++;
  if (selectedLocation.value !== 'all') count++;
  if (hasComments.value !== null) count++;
  if (hasSupports.value !== null) count++;
  if (searchQuery.value.trim()) count++;
  return count;
});
</script>

<template>
  <div class="inquiry-filters">
    <div class="filters-header">
      <div class="search-box compact">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('agora', 'Search inquiries...')"
          class="search-input"
          @input="applyFilters"
        />
        <span class="search-icon">🔍</span>
      </div>

      <button
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
      </button>

      <button
        v-if="activeFiltersCount > 0"
        class="reset-btn compact"
        @click="resetFilters"
      >
      {{ t('agora', 'Clear all') }}
      </button>
    </div>

    <div v-if="isFiltersOpen" class="filters-expanded">
	    <div class="filters-grid">
		    <!-- Filtre par type -->
		    <div class="filter-group">
			    <label>{{ t('agora', 'Type') }}</label>
			    <select v-model="selectedType" @change="applyFilters">
				    <option
						    v-for="option in filterOptions.types"
						    :key="option.value"
						    :value="option.value"
						    >
						    {{ option.label }}
				    </option>
			    </select>
		    </div>

		    <div v-if="filterOptions.categories.length > 1" class="filter-group">
			    <label>{{ t('agora', 'Category') }}</label>
			    <select v-model="selectedCategory" @change="applyFilters">
				    <option
						    v-for="option in filterOptions.categories"
						    :key="option.value"
						    :value="option.value"
						    >
						    {{ option.label }}
				    </option>
			    </select>
		    </div>

		    <div v-if="filterOptions.locations.length > 1" class="filter-group">
			    <label>{{ t('agora', 'Location') }}</label>
			    <select v-model="selectedLocation" @change="applyFilters">
				    <option
						    v-for="option in filterOptions.locations"
						    :key="option.value"
						    :value="option.value"
						    >
						    {{ option.label }}
				    </option>
			    </select>
		    </div>

		    <div class="filter-group">
			    <label>{{ t('agora', 'Comments') }}</label>
			    <select v-model="hasComments" @change="applyFilters">
				    <option
						    v-for="option in filterOptions.participation"
						    :key="String(option.value)"
						    :value="option.value"
						    >
						    {{ option.label }}
				    </option>
			    </select>
		    </div>

		    <div class="filter-group">
			    <label>{{ t('agora', 'Supports') }}</label>
			    <select v-model="hasSupports" @change="applyFilters">
				    <option
						    v-for="option in filterOptions.support"
						    :key="String(option.value)"
						    :value="option.value"
						    >
						    {{ option.label }}
				    </option>
			    </select>
		    </div>
	    </div>
    </div>

    <div v-if="activeFiltersCount > 0" class="active-filters-summary">
	    <span class="summary-label">{{ t('agora', 'Active:') }}</span>

	    <span v-if="selectedType !== 'all'" class="filter-tag">
		    {{ filterOptions.types.find((t) => t.value === selectedType)?.label }}
	    </span>

	    <span v-if="selectedCategory !== 'all'" class="filter-tag">
		    {{
		    filterOptions.categories.find((c) => c.value === selectedCategory)
		    ?.label
		    }}
	    </span>

	    <span v-if="selectedLocation !== 'all'" class="filter-tag">
		    {{
		    filterOptions.locations.find((l) => l.value === selectedLocation)
		    ?.label
		    }}
	    </span>

	    <span v-if="hasComments !== null" class="filter-tag">
		    {{
		    filterOptions.participation.find((p) => p.value === hasComments)
		    ?.label
		    }}
	    </span>

	    <span v-if="hasSupports !== null" class="filter-tag">
		    {{ filterOptions.support.find((s) => s.value === hasSupports)?.label }}
	    </span>

	    <span v-if="searchQuery" class="filter-tag"> "{{ searchQuery }}" </span>
    </div>
  </div>
</template>

<style lang="scss">
.inquiry-filters {
	margin-bottom: 10px;
	padding: 8px;
	background-color: var(--color-background-dark);
	border-radius: 12px;
	border: 1px solid var(--color-border);

	.filters-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;

		.search-box.compact {
			position: relative;
			flex: 1;
			max-width: 300px;

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
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 8px 12px;
			background-color: var(--color-background-darker);
			border: 1px solid var(--color-border);
			border-radius: 6px;
			color: var(--color-text-lighter);
			font-size: 13px;
			font-weight: 500;
			cursor: pointer;
			transition: all 0.2s ease;

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

		.reset-btn.compact {
			padding: 8px 12px;
			background-color: transparent;
			border: 1px solid var(--color-border);
			border-radius: 6px;
			color: var(--color-text-lighter);
			font-size: 13px;
			cursor: pointer;

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

				select {
					padding: 8px 10px;
					border: 1px solid var(--color-border);
					border-radius: 6px;
					background-color: var(--color-main-background);
					color: var(--color-main-text);
					font-size: 13px;
					cursor: pointer;

					&:focus {
						outline: none;
						border-color: var(--color-primary-element);
					}
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

      // Responsive design
@media (max-width: 1024px) {
	      .inquiry-filters {
		      .filters-header {
			      flex-wrap: wrap;

			      .search-box.compact {
				      max-width: none;
				      min-width: 200px;
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
			      gap: 8px;

			      .search-box.compact {
				      min-width: 150px;
			      }

			      .filters-toggle-btn {
				      font-size: 12px;
				      padding: 6px 10px;
			      }

			      .reset-btn.compact {
				      font-size: 12px;
				      padding: 6px 10px;
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

			      .search-box.compact {
				      max-width: none;
			      }

			      .filters-toggle-btn,
			      .reset-btn.compact {
				      justify-content: center;
			      }
		      }
	      }
      }

</style>
