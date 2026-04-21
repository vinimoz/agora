<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcSelect
    v-model="selected"
    :options="filteredResults"
    :placeholder="placeholder"
    :loading="isSearching"
    :filterable="false"
    :searchable="true"
    :clearable="clearable"
    :close-on-select="closeOnSelect"
    :aria-label-combobox="placeholder"
    :label-outside="true"
    @search="handleSearch"
    @option:selected="emitSelected"
  >
    <template #option="item">
      <div class="search-option-item">
        <span class="item-id">#{{ item.id }}</span>
        <span class="item-title">{{ item.title || item.label || t('agora', 'Untitled') }}</span>
      </div>
    </template>
    <template #selected-option="item">
      <div class="selected-option">
        <span class="item-id">#{{ item.id }}</span>
        <span class="item-title">{{ item.title || item.label || t('agora', 'Untitled') }}</span>
      </div>
    </template>
    <template #no-options>
      {{ t('agora', 'No results found') }}
    </template>
  </NcSelect>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { useOptionsStore } from '../../../stores/options'
import { useInquiriesStore } from '../../../stores/inquiries'
import { useSearch } from '../../../composables/useSearch'
import type { Option, Inquiry } from '../../../Types'

const props = defineProps<{
  modelValue?: Option | Inquiry | null | string | number
  type: 'options' | 'inquiries'
  placeholder?: string
  inquiryId?: number
  clearable?: boolean
  closeOnSelect?: boolean
  availableOptions?: Option[] 
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Option | Inquiry | null]
  'selected': [item: Option | Inquiry]
}>()

const optionsStore = useOptionsStore()
const inquiriesStore = useInquiriesStore()
const { query, results } = useSearch(props.type, props.inquiryId)

const selected = ref<Option | Inquiry | null>(null)
const isSearching = ref(false)
const localOptions = ref<(Option | Inquiry)[]>([])

// Load initial options if needed
onMounted(() => {
  if (props.type === 'options') {
    localOptions.value = optionsStore.options
  } else {
    localOptions.value = inquiriesStore.inquiries
  }
})

// Initialize selected value from modelValue
const initSelected = () => {
  const val = props.modelValue
  if (!val) {
    selected.value = null
    return
  }

  // If it's a string or number (ID), find the corresponding option/inquiry
  if (typeof val === 'string' || typeof val === 'number') {
    const id = typeof val === 'string' ? parseInt(val) : val
    if (props.type === 'options') {
      selected.value = optionsStore.options.find(opt => opt.id === id) || null
    } else {
      selected.value = inquiriesStore.inquiries.find(inq => inq.id === id) || null
    }
  } else if (typeof val === 'object' && val !== null) {
    // It's already an object
    selected.value = val as Option | Inquiry
  } else {
    selected.value = null
  }
}

// Watch for modelValue changes
watch(() => props.modelValue, () => {
  initSelected()
}, { immediate: true, deep: true })

// Watch for store updates
watch(() => props.type === 'options' ? optionsStore.options : inquiriesStore.inquiries, (newOptions) => {
  localOptions.value = newOptions
  initSelected() // Re-initialize selected in case the object changed
}, { deep: true })

// Filter results based on search query
const filteredResults = computed(() => {
  const q = query.value.toLowerCase().trim()
  
  // Get search results from the composable
  let searchResults = results.value
  
  // If there's no search query, return empty array (don't show all options)
  if (!q) {
    return []
  }
  
  // If availableOptions is provided, filter to only those
  if (props.availableOptions && props.type === 'options' && props.availableOptions.length > 0) {
    const availableIds = new Set(props.availableOptions.map(opt => opt.id))
    searchResults = searchResults.filter((item: Option | Inquiry) => 
      availableIds.has((item as Option).id)
    )
  }
  
  return searchResults
})

const handleSearch = (searchQuery: string) => {
  isSearching.value = true
  query.value = searchQuery
  // Simple loading indicator
  setTimeout(() => {
    isSearching.value = false
  }, 200)
}

const emitSelected = (item: Option | Inquiry) => {
  selected.value = item
  emit('update:modelValue', item)
  emit('selected', item)
}

// Expose for parent components
defineExpose({
  clear: () => {
    selected.value = null
    query.value = ''
  }
})
</script>

<style scoped lang="scss">
.search-option-item,
.selected-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;

  .item-id {
    font-family: monospace;
    background: var(--color-background-dark);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    color: var(--color-text-lighter);
    white-space: nowrap;
  }

  .item-title {
    font-weight: normal;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

:deep(.vs__selected) {
  .selected-option {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
