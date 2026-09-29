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
  /** Legacy: restrict to these Options (ignored for `inquiries`). */
  availableOptions?: Option[]
  /**
   * Restrict results to these ids. Works for both `options` and `inquiries`.
   * Use this when the caller already computed the allowed set (e.g. the
   * inquiries that belong to the current group).
   */
  availableItemIds?: number[]
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

onMounted(() => {
  localOptions.value = props.type === 'options'
    ? optionsStore.options
    : inquiriesStore.inquiries
})

const initSelected = () => {
  const val = props.modelValue
  if (!val) {
    selected.value = null
    return
  }

  if (typeof val === 'string' || typeof val === 'number') {
    const id = typeof val === 'string' ? parseInt(val) : val
    if (props.type === 'options') {
      selected.value = optionsStore.options.find((opt) => opt.id === id) || null
    } else {
      selected.value = inquiriesStore.inquiries.find((inq) => inq.id === id) || null
    }
  } else if (typeof val === 'object' && val !== null) {
    selected.value = val as Option | Inquiry
  } else {
    selected.value = null
  }
}

watch(() => props.modelValue, () => {
  initSelected()
}, { immediate: true, deep: true })

watch(
  () => props.type === 'options' ? optionsStore.options : inquiriesStore.inquiries,
  (newOptions) => {
    localOptions.value = newOptions
    initSelected()
  },
  { deep: true },
)

const filteredResults = computed(() => {
  const q = query.value.toLowerCase().trim()
  let searchResults = results.value

  // No query → do not dump the full list (matches previous behavior)
  if (!q) return []

  // Legacy Options-only restriction
  if (props.availableOptions && props.type === 'options' && props.availableOptions.length > 0) {
    const allowed = new Set(props.availableOptions.map((opt) => opt.id))
    searchResults = searchResults.filter((item) => allowed.has(item.id))
  }

  // Generic id restriction — works for options AND inquiries
  if (props.availableItemIds && props.availableItemIds.length > 0) {
    const allowed = new Set(props.availableItemIds)
    searchResults = searchResults.filter((item) => allowed.has(item.id))
  }

  return searchResults
})

const handleSearch = (searchQuery: string) => {
  isSearching.value = true
  query.value = searchQuery
  setTimeout(() => {
    isSearching.value = false
  }, 200)
}

const emitSelected = (item: Option | Inquiry) => {
  selected.value = item
  emit('update:modelValue', item)
  emit('selected', item)
}

defineExpose({
  clear: () => {
    selected.value = null
    query.value = ''
  },
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
