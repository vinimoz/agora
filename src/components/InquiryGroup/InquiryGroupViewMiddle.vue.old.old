<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="consultation-layout">
    <!-- Left Column: Description (70%) -->
    <div class="left-column">
      <div class="description-section">
          <h1 class="section-title">{{ t('agora','Presentation') }}</h1>
        
        <div v-if="group.description" class="description-container">
          <div class="description-content" :class="{ expanded: isDescriptionExpanded }">
            <div ref="descriptionText" class="description-text">
              <div class="rich-text-display">
                <p>{{ group.description }}</p>
              </div>
            </div>
            
            <button 
              v-if="isTruncated" 
              class="expand-button"
              :aria-expanded="isDescriptionExpanded"
              @click="isDescriptionExpanded = !isDescriptionExpanded"
            >
              <span class="button-text">
                {{ isDescriptionExpanded ? t('agora', 'Show less') : t('agora', 'Read more') }}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" :class="{ rotated: isDescriptionExpanded }">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar: Inquiries (30%) -->
    <div class="right-sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">{{ t('agora', 'Inquiries') }}</h2>
        <span class="inquiry-count">{{ inquiryIds.length }}</span>
      </div>

      <!-- Grouped Inquiries -->
      <div v-if="Object.keys(groupedInquiries).length > 0" class="inquiries-container">
        <div 
          v-for="(typeGroup, typeKey) in groupedInquiries" 
          :key="typeKey" 
          class="inquiry-type-group"
        >
        <!-- Type Header -->
          <div class="type-header" @click="toggleType(typeKey)">
            <div class="type-info">
              <div class="type-icon">
                <component :is="getInquiryTypeIcon(typeKey)" />
              </div>
              <h3 class="type-name">{{ getInquiryTypeLabel(typeKey) }}</h3>
              <span class="type-badge">{{ typeGroup.length }}</span>
            </div>
            <div class="type-toggle" :class="{ rotated: expandedTypes.includes(typeKey) }">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>
          </div> 
          
          <!-- Inquiries List -->
          <div v-show="expandedTypes.includes(typeKey)" class="type-inquiries">
            <NcAppNavigationList class="inquiries-list">
              <NcAppNavigationItem
                v-for="inquiry in typeGroup"
                :key="inquiry.id"
                :name="inquiry.title"
                :exact="true"
                :to="getInquiryRoute(inquiry.id)"
                @click="emitViewInquiry(inquiry.id)"
              >
                <template #icon>
                  <div class="inquiry-icon">
                    <component :is="getInquiryIcon(inquiry)" />
                  </div>
                </template>
                
                <template v-if="inquiry.responsesCount" #counter>
                  {{ inquiry.responsesCount }}
                </template>
              </NcAppNavigationItem>
            </NcAppNavigationList>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>{{ t('agora', 'No inquiries yet') }}</h3>
        <p>{{ t('agora', 'Start by creating the first inquiry') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAppNavigationList from '@nextcloud/vue/components/NcAppNavigationList'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'

import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { InquiryGroup } from '../../stores/inquiryGroups.types.ts'
import type { Inquiry } from '../../Types/index.ts'

// Import stores
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { useAppSettingsStore } from '../../stores/appSettings.ts'

interface Props {
  group: InquiryGroup
  inquiryIds: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewInquiry: [id: number]
}>()


// Initialize stores
const inquiriesStore = useInquiriesStore()
const appSettingsStore = useAppSettingsStore()

const expandedTypes = ref<string[]>([])
const isDescriptionExpanded = ref(false)
const isTruncated = ref(false)
const descriptionText = ref<HTMLElement>()

// Get inquiries from store using the IDs
const inquiries = computed(() => {
  const allInquiries = inquiriesStore.inquiries || []
  return allInquiries.filter(inquiry =>
    props.inquiryIds.includes(inquiry.id)
  )
})

// Get inquiry types from appSettings
const inquiryTypes = computed(() => appSettingsStore.inquiryTypeTab || [])

// Group inquiries by type
const groupedInquiries = computed(() => {
  const grouped: Record<string, Inquiry[]> = {}
  
  inquiries.value.forEach(inquiry => {
    const type = inquiry.type || 'default'
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(inquiry)
  })
  
  return grouped
})

// Check if description needs truncation
onMounted(() => {
  nextTick(() => {
    if (descriptionText.value) {
      const lineHeight = parseInt(getComputedStyle(descriptionText.value).lineHeight)
      const maxHeight = lineHeight * 6 // 6 lines max before truncation
      isTruncated.value = descriptionText.value.scrollHeight > maxHeight
    }
  })
})

// Helper functions
function getInquiryTypeIcon(typeKey: string) {
  const typeData = getInquiryTypeData(typeKey, inquiryTypes.value)
  return typeData?.icon || '📝'
}

function getInquiryTypeLabel(typeKey: string) {
  const typeData = getInquiryTypeData(typeKey, inquiryTypes.value)
  return typeData?.label ? t('agora', typeData.label) : typeKey
}

function getInquiryIcon(inquiry: Inquiry) {
  const typeData = getInquiryTypeData(inquiry.type, inquiryTypes.value)
  return typeData?.icon || '📝'
}

function getInquiryRoute(inquiryId: number) {
  return {
    name: 'inquiry',
    params: { id: inquiryId }
  }
}

function toggleType(typeKey: string) {
  const index = expandedTypes.value.indexOf(typeKey)
  if (index > -1) {
    expandedTypes.value.splice(index, 1)
  } else {
    expandedTypes.value.push(typeKey)
  }
}

function emitViewInquiry(id: number) {
  emit('viewInquiry', id)
}

// Auto-expand first type if only one exists
onMounted(() => {
  const typeKeys = Object.keys(groupedInquiries.value)
  if (typeKeys.length === 1) {
    expandedTypes.value = [typeKeys[0]]
  }
})
</script>
<style lang="scss" scoped>
.consultation-layout {
  background: transparent;
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: none; /* Remove max-width constraint */
  margin: 0;
  padding: 16px;
  align-items: flex-start;
  box-sizing: border-box;
}

/* Left Column: Description */
.left-column {
  flex: 0 0 70%; /* Fixed 70% width */
  width: 70%;
  min-width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .description-section {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .section-title {
      font-size: 36px;
      font-weight: 800;
      color: var(--color-main-text);
      margin: 0 0 16px 0;
      line-height: 1.2;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--color-border);
      width: 100%;
    }
  }
}

.description-container {
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.description-content {
  padding: 32px;
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  &.expanded {
    .description-text {
      max-height: none;
    }
    
    .expand-button svg {
      transform: rotate(180deg);
    }
  }
}

.description-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-lighter);
  max-height: 10.8em; /* 6 lines * 1.8 line-height */
  overflow: hidden;
  transition: max-height 0.3s ease;
  width: 100%;
  flex: 1;
  
  p {
    margin: 0 0 16px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    font-weight: 600;
    color: var(--color-main-text);
  }
}

.expand-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-primary-element);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  
  &:hover {
    background: var(--color-background-hover);
    border-color: var(--color-primary-element);
  }
  
  svg {
    transition: transform 0.2s ease;
    fill: currentColor;
    
    &.rotated {
      transform: rotate(180deg);
    }
  }
}

/* Right Sidebar: Inquiries */
.right-sidebar {
  flex: 0 0 30%; /* Fixed 30% width */
  width: 30%;
  min-width: 30%;
  position: sticky;
  top: 32px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--color-border);
    width: 100%;
  }
  
  .sidebar-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-main-text);
    margin: 0;
  }
  
  .inquiry-count {
    background: var(--color-primary-element);
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    min-width: 32px;
    text-align: center;
  }
}


/* Responsive Design */
@media (max-width: 1200px) {
  .consultation-layout {
    flex-direction: column;
    gap: 32px;
    padding: 24px;
    width: 100%;
  }
  
  .left-column {
    flex: 1;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
  
  .right-sidebar {
    flex: 1;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    position: static;
  }
}

/* Inquiry Type Groups */
.inquiry-type-group {
  margin-bottom: 16px;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.type-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--color-background-dark);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  
  &:hover {
    background: var(--color-background-hover);
  }
}

.type-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  width: 100%;
}

.type-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-element);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.type-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-main-text);
  margin: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.type-badge {
  background: var(--color-background-darker);
  color: var(--color-text-lighter);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  min-width: 28px;
  text-align: center;
}

.type-toggle {
  color: var(--color-text-lighter);
  transition: transform 0.2s ease;
  
  svg {
    fill: currentColor;
  }
  
  &.rotated {
    transform: rotate(180deg);
  }
}

/* Inquiries List */
.type-inquiries {
  margin-top: 8px;
  margin-left: 32px; /* Indent for nested items */
  width: 100%;
}

.inquiries-list {
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
  
  :deep(.app-navigation-entry) {
    margin-bottom: 4px;
    width: 100%;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .app-navigation-entry__content {
      background: white;
      border-radius: 6px;
      border: 1px solid var(--color-border);
      transition: all 0.2s ease;
      width: 100%;
      box-sizing: border-box;
      
      &:hover {
        background: var(--color-background-hover);
        border-color: var(--color-primary-element);
        transform: translateX(4px);
      }
    }
    
    .app-navigation-entry__counter {
      background: var(--color-primary-element);
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
  }
}

.inquiry-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-element);
  
  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 24px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px dashed var(--color-border);
  width: 100%;
  
  .empty-icon {
    font-size: 40px;
    margin-bottom: 16px;
    opacity: 0.3;
  }
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-main-text);
    margin: 0 0 8px 0;
  }
  
  p {
    color: var(--color-text-lighter);
    font-size: 14px;
    margin: 0;
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .consultation-layout {
    flex-direction: column;
    gap: 32px;
    padding: 24px;
  }
  
  .left-column {
    flex: 1;
    max-width: 100%;
    width: 100%;
  }
  
  .right-sidebar {
    flex: 1;
    max-width: 100%;
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .consultation-layout {
    padding: 16px;
    gap: 24px;
  }
  
  .left-column {
    .description-section {
      .section-title {
        font-size: 28px;
        margin-bottom: 24px;
      }
    }
  }
  
  .description-content {
    padding: 24px;
  }
  
  .description-text {
    font-size: 15px;
  }
  
  .type-header {
    padding: 14px;
  }
  
  .type-info {
    gap: 10px;
  }
  
  .type-icon {
    width: 18px;
    height: 18px;
  }
  
  .type-name {
    font-size: 14px;
  }
  
  .type-inquiries {
    margin-left: 24px;
  }
}

@media (max-width: 480px) {
  .description-content {
    padding: 20px;
  }
  
  .type-header {
    padding: 12px;
  }
  
  .type-info {
    gap: 8px;
  }
  
  .type-icon {
    width: 16px;
    height: 16px;
  }
  
  .type-inquiries {
    margin-left: 20px;
  }
}
</style>
