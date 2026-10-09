<template>
  <div class="landing-search">
    <component :is="Icons.Magnify" :size="20" class="search-icon" />
    <input
      v-model="query"
      type="search"
      class="search-input"
      :placeholder="t('agora', 'Search for information, a service, a discussion…')"
      @keyup.enter="submit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'

const emit = defineEmits<{ search: [query: string] }>()
const query = ref('')

function submit() {
  if (query.value.trim()) emit('search', query.value.trim())
}
</script>

<style lang="scss" scoped>
.landing-search {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 8px 18px;          // was 10px 20px
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);   // was 0 2px 8px
  max-width: 720px;           // keeps it from stretching absurdly wide
  margin: 0 auto;             // centers it inside the full-width zone
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:focus-within {
    box-shadow: 0 4px 16px rgba(var(--color-primary-rgb), 0.15);
    border-color: var(--color-primary-element);
  }

  .search-icon {
    color: var(--color-text-lighter);
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 15px;
    color: var(--color-main-text);

    &::placeholder {
      color: var(--color-text-lighter);
    }
  }
}
</style>
