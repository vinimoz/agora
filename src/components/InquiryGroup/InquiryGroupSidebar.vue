<!--
- SPDX-FileCopyrightText: 2024 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-group-sidebar">
    <div class="sidebar-card">
      <h3 class="sidebar-card__title">
        {{ t('agora', 'Inquiry types in this group') }}
      </h3>
      
      <!-- Inquiry Types List -->
      <div v-if="Object.keys(inquiriesByType).length > 0" class="inquiry-types-list">
        <div 
          v-for="(typeKey) in Object.keys(inquiriesByType)" 
          :key="typeKey"
          class="inquiry-type-item"
          :class="{ 'has-inquiries': inquiriesByType[typeKey].length > 0 }"
          @click="filterByType(typeKey)"
        >
          <div class="inquiry-type-item__icon">
            <component :is="getTypeData(typeKey)?.icon" />
          </div>
          <div class="inquiry-type-item__label">
            {{ t('agora', getTypeData(typeKey)?.label || typeKey) }}
          </div>
          <div class="inquiry-type-item__count">
            ({{ inquiriesByType[typeKey]?.length || 0 }})
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-else class="empty-sidebar">
        <p>{{ t('agora', 'No inquiries in this group yet') }}</p>
      </div>
      
      <!-- Add Inquiry Button -->
      <div v-if="isOwnerOrAdmin" class="sidebar-card__actions">
        <NcButton class="add-inquiry-button" @click="emit('addInquiry')">
          <template #icon>
            <PlusIcon />
          </template>
          {{ t('agora', 'Add inquiry to this group') }}
        </NcButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { useRouter } from 'vue-router'
import NcButton from '@nextcloud/vue/components/NcButton'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import { useSessionStore } from '../../stores/session.ts'
import type { InquiryGroupType } from '../stores/inquiryGroups.types.ts'
import type { InquiryType, Inquiry } from '../../Types/index.ts'

const sessionStore = useSessionStore()
const router = useRouter()

const props = defineProps<{
  inquiryGroup?: InquiryGroupType 
  inquiriesByType?: Record<string, Inquiry[]>
  inquiryTypes?: InquiryType[]
}>()

const emit = defineEmits(['addInquiry'])

const safeInquiryTypes = computed(() => props.inquiryTypes || sessionStore.appSettings.inquiryTypeTab || [])

const isOwnerOrAdmin = computed(() => 
  // Implement ownership check
   false
)

function getTypeData(typeKey: string) {
  return getInquiryTypeData(typeKey, safeInquiryTypes.value)
}

function filterByType(typeKey: string) {
  if (props.inquiryGroup?.slug) {
    router.push({
      name: 'group-list',
      params: { slug: props.inquiryGroup.slug },
      query: { type: typeKey }
    })
  }
}
</script>

<style lang="scss" scoped>
.inquiry-group-sidebar {
  .sidebar-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 24px;
    
    &__title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
      color: var(--color-main-text);
      padding-bottom: 12px;
      border-bottom: 1px solid var(--color-border);
    }
  }
}

.empty-sidebar {
  text-align: center;
  padding: 20px 0;
  color: var(--color-text-lighter);
  font-size: 14px;
}

.inquiry-types-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.inquiry-type-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &.has-inquiries:hover {
    background: var(--color-background-hover);
  }
  
  &__icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    :deep(svg) {
      width: 18px;
      height: 18px;
      color: var(--color-text-lighter);
    }
  }
  
  &__label {
    flex: 1;
    font-size: 14px;
    color: var(--color-main-text);
  }
  
  &__count {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-lighter);
  }
}

.sidebar-card__actions {
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.add-inquiry-button {
  width: 100%;
  justify-content: center;
  
  :deep(.button-vue__icon) {
    margin-right: 8px;
  }
}

@media (max-width: 768px) {
  .sidebar-card {
    padding: 20px;
  }
  
  .inquiry-type-item {
    padding: 10px;
    
    &__label {
      font-size: 13px;
    }
  }
}
</style>
