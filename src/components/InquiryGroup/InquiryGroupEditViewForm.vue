<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'
import NcButton from '@nextcloud/vue/components/NcButton'
import { useInquiryGroupStore } from '../../stores/inquiryGroup.ts'
import { useInquiriesStore } from '../../stores/inquiries'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types/index.ts'
import { useRoute } from 'vue-router'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

import { 
  getInquiryGroupTypeData,
  getInquiryTypeData,
} from '../../helpers/modules/InquiryHelper.ts'

// Store declarations
const sessionStore = useSessionStore()
const inquiryGroupStore = useInquiryGroupStore()
const inquiriesStore = useInquiriesStore()
const route = useRoute()

// State
const dragItem = ref<Inquiry | null>(null)
const dragOverDropZone = ref(false)

const groupTypeData = computed(() => {
  if (!inquiryGroupStore.type || !sessionStore.appSettings.inquiryGroupTypeTab) {
    return { 
      icon: InquiryGeneralIcons.Question, 
      label: inquiryGroupStore.type || t('agora', 'Unknown'), 
      description: '' 
    }
  }
  
  return getInquiryGroupTypeData(
    inquiryGroupStore.type, 
    sessionStore.appSettings.inquiryGroupTypeTab
  )
})

const getInquiryTypeInfo = (inquiryType: string) => {
  if (!inquiryType || !sessionStore.appSettings.inquiryTypeTab) {
    return { 
      icon: InquiryGeneralIcons.Question, 
      label: inquiryType || t('agora', 'Unknown'), 
      description: '' 
    }
  }
  return getInquiryTypeData(inquiryType, sessionStore.appSettings.inquiryTypeTab)
}

const groupInquiries = computed(() => {
  if (!inquiryGroupStore.inquiryIds || !inquiryGroupStore.inquiryIds.length) return []
  
  return inquiryGroupStore.inquiryIds
    .map(id => inquiriesStore.byId[id])
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by order if available, otherwise by creation date
      const orderA = a.order || a.created
      const orderB = b.order || b.created
      return orderA - orderB
    })
})

const allInquiries = computed(() => Object.values(inquiriesStore.byId).filter(inquiry => 
    inquiry && !inquiryGroupStore.inquiryIds.includes(inquiry.id)
  ))

const allowedInquiryTypes = computed(() => {
  if (!inquiryGroupStore.type || !sessionStore.appSettings.inquiryGroupTab) return []
  
  // Fixed: Changed from sessionStore.appSettings.inquiryGroupTab[inquiryGroupStore.type]
  const groupTypeConfig = sessionStore.appSettings.inquiryGroupTab[inquiryGroupStore.type]
  return groupTypeConfig?.allowed_inquiry_types || []
})

const filteredAvailableInquiries = computed(() => allInquiries.value.filter(inquiry => {
    // If no allowed types are specified, show all inquiries
    if (!allowedInquiryTypes.value.length) return true
    
    // Check if inquiry type is in allowed list
    return allowedInquiryTypes.value.includes(inquiry.type)
  }))

const displayedGroupInquiries = computed(() => groupInquiries.value)

const displayedAvailableInquiries = computed(() => filteredAvailableInquiries.value)

// Improved inquiry count formatting
const formattedInquiryCount = computed(() => {
  const count = groupInquiries.value.length
  if (count === 0) return '0'
  if (count < 1000) return count.toString()
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
  return `${(count / 1000000).toFixed(1)}M`
})

// Drag and Drop handlers
const onDragStart = (inquiry: Inquiry, event: DragEvent) => {
  dragItem.value = inquiry
  event.dataTransfer?.setData('text/plain', inquiry.id.toString())
  event.dataTransfer!.effectAllowed = 'move'
}

const onDragOver = (event: DragEvent, isDropZone: boolean = false) => {
  event.preventDefault()
  if (isDropZone) {
    dragOverDropZone.value = true
  }
}

const onDragLeave = (isDropZone: boolean = false) => {
  if (isDropZone) {
    dragOverDropZone.value = false
  }
}

const onDropToGroup = async (event: DragEvent) => {
  event.preventDefault()
  dragOverDropZone.value = false
  
  if (!dragItem.value || groupInquiries.value.some(i => i.id === dragItem.value!.id)) {
    return
  }
  
  try {
    await inquiryGroupStore.addInquiry(dragItem.value.id)
    showSuccess(t('agora', 'Inquiry added to group'))
    dragItem.value = null
  } catch (error) {
    showError(t('agora', 'Failed to add inquiry to group'))
    console.error('Error adding inquiry to group:', error)
  }
}

const onDropToAvailable = async (inquiry: Inquiry, event: DragEvent) => {
  event.preventDefault()
  
  if (!dragItem.value || dragItem.value.id === inquiry.id) {
    return
  }
  
  // Remove from group
  try {
    await inquiryGroupStore.removeInquiry(dragItem.value.id)
    showSuccess(t('agora', 'Inquiry removed from group'))
    dragItem.value = null
  } catch (error) {
    showError(t('agora', 'Failed to remove inquiry from group'))
    console.error('Error removing inquiry from group:', error)
  }
}

const addInquiryToGroup = async (inquiry: Inquiry) => {
  try {
    await inquiryGroupStore.addInquiry(inquiry.id)
    showSuccess(t('agora', 'Inquiry added to group'))
  } catch (error) {
    showError(t('agora', 'Failed to add inquiry to group'))
    console.error('Error adding inquiry to group:', error)
  }
}

const removeInquiryFromGroup = async (inquiry: Inquiry) => {
  try {
    await inquiryGroupStore.removeInquiry(inquiry.id)
    showSuccess(t('agora', 'Inquiry removed from group'))
  } catch (error) {
    showError(t('agora', 'Failed to remove inquiry from group'))
    console.error('Error removing inquiry from group:', error)
  }
}

// Format helpers
const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString()

onMounted(() => {
    const id = route.params.id
    inquiryGroupStore.load(id)
})
</script>

<template>
  <div class="inquiry-group-edit-view">
    <!-- Group Info Section with improved icon and design -->
    <div class="group-info-summary">
      <div class="group-header">
        <div class="group-icon-container">
          <component 
            :is="groupTypeData.icon" 
            class="group-type-icon"
            :size="32"
          />
        </div>
        <div class="group-header-content">
          <h2>{{ t('agora', groupTypeData.label) }}</h2>
          <p v-if="groupTypeData.description" class="group-description">
            {{ t('agora', groupTypeData.description) }}
          </p>
        </div>
      </div>
      
      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon"><component :is="InquiryGeneralIcons.ClipboardList" /></div>
          <div class="info-content">
            <span class="info-label">{{ t('agora', 'Title') }}</span>
            <span class="info-value">{{ inquiryGroupStore.title }}</span>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon"><component :is="InquiryGeneralIcons.IdCard" /></div>
          <div class="info-content">
            <span class="info-label">{{ t('agora', 'Second title') }}</span>
            <span class="info-value">{{ inquiryGroupStore.titleExt }}</span>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon"><component :is="InquiryGeneralIcons.Calendar" /></div>
          <div class="info-content">
            <span class="info-label">{{ t('agora', 'Created') }}</span>
            <span class="info-value">{{ formatDate(inquiryGroupStore.created) }}</span>
          </div>
        </div>
        
        <div class="info-item highlight">
          <div class="info-icon"><component :is="InquiryGeneralIcons.Link" /></div>
          <div class="info-content">
            <span class="info-label">{{ t('agora', 'Inquiries') }}</span>
            <span class="info-value">
              {{ formattedInquiryCount }}
              <span v-if="groupInquiries.length > 0" class="count-label">
                ({{ groupInquiries.length }} total)
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Inquiries Management Section -->
    <div class="inquiries-management-section">
      <div class="section-header">
        <div class="section-title-container">
          <h2>{{ t('agora', 'Inquiry management') }}</h2>
          <p class="section-subtitle">{{ t('agora', 'LIST OF INQUIRIES IN THE GROUP') }}</p>
        </div>
      </div>

      <!-- Attached Inquiries Section -->
      <div class="attached-inquiries-section card-section">
        <div class="section-header-with-icon">
          <div class="section-icon success">
            <component :is="InquiryGeneralIcons.CheckCircle" />
          </div>
          <div>
            <h3 class="section-subtitle">{{ t('agora', 'ATTACHED INQUIRIES') }}</h3>
            <p class="section-description">{{ t('agora', 'Drag to remove or click "remove"') }}</p>
          </div>
        </div>
        
        <div class="inquiries-list">
          <div
            v-for="inquiry in displayedGroupInquiries"
            :key="inquiry.id"
            class="inquiry-item attached"
            draggable="true"
            @dragstart="onDragStart(inquiry, $event)"
            @dragover.prevent
            @drop="onDropToAvailable(inquiry, $event)"
          >
            <div class="inquiry-icon">
              <component 
                :is="getInquiryTypeInfo(inquiry.type).icon" 
                class="inquiry-type-icon"
                :size="20"
              />
            </div>
            <div class="inquiry-info">
              <div class="inquiry-header">
                <span class="inquiry-id">[#{{ inquiry.id }}]</span>
                <span class="inquiry-title">{{ inquiry.title }}</span>
              </div>
              <div class="inquiry-meta">
                <span class="inquiry-type-badge">
                  {{ t('agora', getInquiryTypeInfo(inquiry.type).label) }}
                </span>
                <span class="inquiry-date">
                  <component :is="InquiryGeneralIcons.Calendar" :size="12" />
                  {{ formatDate(inquiry.status.created) }}
                </span>
              </div>
            </div>
            <div class="inquiry-actions">
              <component :is="InquiryGeneralIcons.Drag" class="drag-handle" :title="t('agora', 'Drag to remove')" />
              <NcButton
                type="error"
                class="remove-btn"
                @click="removeInquiryFromGroup(inquiry)"
              >
                <template #icon>
                  <component :is="InquiryGeneralIcons.Delete" />
                </template>
                {{ t('agora', 'Remove') }}
              </NcButton>
            </div>
          </div>
          
          <div
            v-if="displayedGroupInquiries.length === 0"
            class="empty-state"
          >
            <div class="empty-icon"><component :is="InquiryGeneralIcons.Empty" /></div>
            <div class="empty-text">
              <h4>{{ t('agora', 'No inquiries in this group') }}</h4>
              <p>{{ t('agora', 'Add inquiries by dragging them from the list below') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Drop Zone -->
      <div 
        class="drop-zone-section"
        :class="{ 'drag-over': dragOverDropZone }"
        @dragover="onDragOver($event, true)"
        @dragleave="onDragLeave(true)"
        @drop="onDropToGroup($event)"
      >
        <div class="drop-zone-content">
          <div class="drop-icon"><component :is="InquiryGeneralIcons.ArrowDown" /></div>
          <div class="drop-main-text">{{ t('agora', 'DROP INQUIRIES HERE') }}</div>
          <div class="drop-subtitle">{{ t('agora', 'Drop zone to add to group') }}</div>
          <div class="drop-hint">{{ t('agora', 'Drag an inquiry from the list below') }}</div>
        </div>
      </div>

      <!-- Available Inquiries Section -->
      <div class="available-inquiries-section card-section">
        <div class="section-header-with-icon">
          <div class="section-icon warning">
            <component :is="InquiryGeneralIcons.ClipboardList" />
          </div>
          <div>
            <h3 class="section-subtitle">{{ t('agora', 'AVAILABLE INQUIRIES') }}</h3>
            <p class="section-description">{{ t('agora', '(draggable items)') }}</p>
          </div>
        </div>
        
        <div class="inquiries-list available">
          <div
            v-for="inquiry in displayedAvailableInquiries"
            :key="inquiry.id"
            class="inquiry-item available"
            draggable="true"
            @dragstart="onDragStart(inquiry, $event)"
          >
            <div class="inquiry-icon">
              <component 
                :is="getInquiryTypeInfo(inquiry.type).icon" 
                class="inquiry-type-icon"
                :size="20"
              />
            </div>
            <div class="inquiry-info">
              <div class="inquiry-header">
                <span class="inquiry-id">[#{{ inquiry.id }}]</span>
                <span class="inquiry-title">{{ inquiry.title }}</span>
              </div>
              <div class="inquiry-meta">
                <span class="inquiry-type-badge">
                  {{ t('agora', getInquiryTypeInfo(inquiry.type).label) }}
                </span>
                <span class="inquiry-date">
                  <component :is="InquiryGeneralIcons.Calendar" :size="12" />
                  {{ formatDate(inquiry.status.created) }}
                </span>
              </div>
            </div>
            <div class="inquiry-actions">
              <component :is="InquiryGeneralIcons.Drag" class="drag-handle" :title="t('agora', 'Drag to add')" />
              <NcButton
                type="primary"
                class="add-btn"
                @click="addInquiryToGroup(inquiry)"
              >
                <component :is="InquiryGeneralIcons.Plus" :title="t('agora', 'Add')" />
                {{ t('agora', 'Add') }}
              </NcButton>
            </div>
          </div>
          
          <div
            v-if="filteredAvailableInquiries.length === 0"
            class="empty-state"
          >
            <div class="empty-icon"><component :is="InquiryGeneralIcons.File" /></div>
            <div class="empty-text">
              <h4>{{ t('agora', 'No inquiries available') }}</h4>
              <p>{{ t('agora', 'All inquiries are already in this group or no types allowed') }}</p>
            </div>
          </div>
          
          <div
            v-if="allowedInquiryTypes.length > 0 && filteredAvailableInquiries.length !== allInquiries.length"
            class="filter-notice"
          >
            <div class="filter-icon">🔍</div>
            <div class="filter-content">
              <strong>{{ t('agora', 'Filtered by allowed types:') }}</strong>
              <div class="allowed-types">
                <span 
                  v-for="type in allowedInquiryTypes" 
                  :key="type"
                  class="type-badge"
                >
                  <component 
                    :is="getInquiryTypeInfo(type).icon" 
                    class="type-icon"
                    :size="12"
                  />
                  {{ t('agora', getInquiryTypeInfo(type).label) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inquiry-group-edit-view {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.group-info-summary {
  background: linear-gradient(135deg, var(--color-main-background) 0%, var(--color-background-dark) 100%);
  border: 2px solid var(--color-border);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  .group-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--color-border);
    
    .group-icon-container {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, var(--color-primary-element), var(--color-primary-element-hover));
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .group-type-icon {
        color: white;
      }
    }
    
    .group-header-content {
      flex: 1;
      
      h2 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
        color: var(--color-main-text);
        background: linear-gradient(135deg, var(--color-primary-element), var(--color-primary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .group-description {
        color: var(--color-text-lighter);
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
      }
    }
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    
    .info-item {
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border-color: var(--color-primary-element);
      }
      
      &.highlight {
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-background-dark));
        border-color: var(--color-primary-element);
        
        .info-icon {
          background: var(--color-primary-element);
          color: white;
        }
        
        .count-badge {
          background: var(--color-primary-element);
          color: white;
        }
      }
      
      .info-icon {
        width: 48px;
        height: 48px;
        background: var(--color-background-dark);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        flex-shrink: 0;
      }
      
      .info-content {
        flex: 1;
        
        .info-label {
          display: block;
          font-size: 12px;
          color: var(--color-text-lighter);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          font-weight: 600;
        }
        
        .info-value {
          display: block;
          font-size: 18px;
          color: var(--color-main-text);
          font-weight: 600;
          
          &.count-badge {
            display: flex;
            flex-direction: column;
            gap: 4px;
            
            .count-label {
              font-size: 12px;
              font-weight: 400;
              color: var(--color-text-lighter);
            }
          }
        }
      }
    }
  }
}

/* Inquiries Management Section */
.inquiries-management-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 3px solid var(--color-border);
    
    .section-title-container {
      h2 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
        color: var(--color-main-text);
      }
      
      .section-subtitle {
        font-size: 14px;
        color: var(--color-text-lighter);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0;
      }
    }
  }
  
  .card-section {
    background: var(--color-main-background);
    border: 2px solid var(--color-border);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    
    .section-header-with-icon {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      
      .section-icon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        
        &.success {
          background: linear-gradient(135deg, var(--color-success), var(--color-success-hover));
          color: white;
        }
        
        &.warning {
          background: linear-gradient(135deg, var(--color-warning), var(--color-warning-hover));
          color: white;
        }
      }
      
      h3.section-subtitle {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--color-main-text);
      }
      
      .section-description {
        font-size: 13px;
        color: var(--color-text-lighter);
        margin: 0;
        font-style: italic;
      }
    }
  }
}

/* Inquiries List improved */
.inquiries-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &.available {
    max-height: 500px;
    overflow-y: auto;
    padding-right: 8px;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--color-background-dark);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 4px;
      
      &:hover {
        background: var(--color-text-lighter);
      }
    }
  }
}

.inquiry-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--color-background-dark);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(8px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
  
  &.attached {
    border-left: 6px solid var(--color-success);
    
    &:hover {
      border-color: var(--color-success-hover);
    }
  }
  
  &.available {
    border-left: 6px solid var(--color-warning);
    cursor: grab;
    
    &:hover {
      border-color: var(--color-warning-hover);
      background: var(--color-background-hover);
    }
    
    &:active {
      cursor: grabbing;
    }
  }
  
  .inquiry-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--color-background-darker), var(--color-background-dark));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    .inquiry-type-icon {
      color: var(--color-primary-element);
    }
  }
  
  .inquiry-info {
    flex: 1;
    
    .inquiry-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      
      .inquiry-id {
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--color-text-lighter);
        background: var(--color-background-darker);
        padding: 4px 10px;
        border-radius: 10px;
        font-weight: 500;
      }
      
      .inquiry-title {
        font-size: 16px;
        color: var(--color-main-text);
        font-weight: 600;
        line-height: 1.4;
      }
    }
    
    .inquiry-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .inquiry-type-badge {
        font-size: 12px;
        color: var(--color-primary-element);
        background: var(--color-primary-light);
        padding: 6px 12px;
        border-radius: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .inquiry-date {
        font-size: 12px;
        color: var(--color-text-lighter);
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }
  
  .inquiry-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
    
    .drag-handle {
      font-size: 16px;
      color: var(--color-text-lighter);
      cursor: move;
      padding: 8px;
      border-radius: 8px;
      background: var(--color-background-darker);
      transition: all 0.2s;
      
      &:hover {
        color: var(--color-primary-element);
        background: var(--color-primary-light);
        transform: scale(1.1);
      }
    }
    
    .add-btn,
    .remove-btn {
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

/* Drop Zone improved */
.drop-zone-section {
  margin: 32px 0;
  padding: 60px 40px;
  background: linear-gradient(135deg, var(--color-main-background), var(--color-background-dark));
  border: 3px dashed var(--color-border);
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, var(--color-primary-light) 100%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  
  &.drag-over {
    border-color: var(--color-primary);
    border-style: solid;
    transform: scale(1.02);
    
    &::before {
      opacity: 0.1;
    }
    
    .drop-zone-content {
      opacity: 1;
      transform: translateY(0);
    }
    
    .drop-icon {
      transform: scale(1.2) translateY(0);
      animation: bounce 0.6s ease infinite;
    }
  }
  
  &:hover {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    
    .drop-icon {
      color: var(--color-primary);
    }
  }
  
  .drop-zone-content {
    opacity: 0.8;
    transition: all 0.4s;
    transform: translateY(-10px);
    position: relative;
    z-index: 1;
    
    .drop-icon {
      font-size: 48px;
      color: var(--color-primary);
      margin-bottom: 20px;
      transition: all 0.4s;
      display: inline-block;
    }
    
    .drop-main-text {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    .drop-subtitle {
      font-size: 16px;
      color: var(--color-text-lighter);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .drop-hint {
      font-size: 13px;
      color: var(--color-text-lighter);
      font-style: italic;
      opacity: 0.8;
    }
  }
}

/* Empty States improved */
.empty-state {
  text-align: center;
  padding: 60px 40px;
  background: var(--color-background-dark);
  border: 2px dashed var(--color-border);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  .empty-icon {
    font-size: 48px;
    color: var(--color-text-lighter);
    opacity: 0.6;
  }
  
  .empty-text {
    h4 {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
      margin-bottom: 8px;
    }
    
    p {
      font-size: 14px;
      color: var(--color-text-lighter);
      margin: 0;
      max-width: 400px;
      line-height: 1.5;
    }
  }
}

.filter-notice {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, var(--color-warning-light), var(--color-background-dark));
  border: 2px solid var(--color-warning);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  .filter-icon {
    font-size: 24px;
    color: var(--color-warning);
  }
  
  .filter-content {
    flex: 1;
    
    strong {
      display: block;
      font-size: 14px;
      color: var(--color-warning);
      margin-bottom: 12px;
      font-weight: 600;
    }
    
    .allowed-types {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      
      .type-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        background: var(--color-main-background);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        font-size: 12px;
        color: var(--color-main-text);
        font-weight: 500;
        
        .type-icon {
          color: var(--color-primary-element);
        }
        
        &:hover {
          background: var(--color-primary-light);
          border-color: var(--color-primary-element);
        }
      }
    }
  }
}

/* Animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1.2);
  }
  50% {
    transform: translateY(-10px) scale(1.2);
  }
}

/* Responsive Design improved */
@media (max-width: 1024px) {
  .inquiry-group-edit-view {
    padding: 16px;
  }
  
  .group-info-summary {
    padding: 24px;
    
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .inquiries-management-section .section-header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
}

@media (max-width: 768px) {
  .group-info-summary {
    .info-grid {
      grid-template-columns: 1fr;
    }
    
    .group-header {
      flex-direction: column;
      text-align: center;
      gap: 16px;
      
      .group-icon-container {
        width: 60px;
        height: 60px;
      }
    }
  }
  
  .inquiry-item {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    
    .inquiry-info {
      .inquiry-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .inquiry-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
    
    .inquiry-actions {
      justify-content: space-between;
    }
  }
  
  .drop-zone-section {
    padding: 40px 20px;
    
    .drop-main-text {
      font-size: 20px;
    }
  }
}

@media (max-width: 480px) {
  .group-info-summary {
    padding: 20px;
  }
  
  .card-section {
    padding: 20px;
  }
}
</style>
