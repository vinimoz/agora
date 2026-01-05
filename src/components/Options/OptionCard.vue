<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    :class="[
      'option-card',
      `type-${option.type}`,
      { 'compact': compact },
      { 'creative': creative },
      { 'selected': isSelected },
      { 'has-unread': hasUnreadComments }
    ]"
    @click="$emit('click', option)"
  >
    <!-- Option Header -->
    <div class="option-header">
      <div class="option-type-badge" :style="{ backgroundColor: option.typeColor + '20', color: option.typeColor }">
        <component :is="option.typeIcon" :size="14" />
        <span class="type-name">{{ option.typeDisplayName }}</span>
      </div>
      
      <div class="option-actions">
        <NcButton 
          v-if="showMenu"
          type="tertiary"
          :aria-label="t('agora', 'More actions')"
          @click.stop="toggleMenu"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.More" :size="16" />
          </template>
        </NcButton>
        
        <transition name="fade">
          <div v-if="showContextMenu" class="context-menu">
            <NcButton
              v-if="option.permissions.edit"
              type="tertiary"
              :aria-label="t('agora', 'Edit option')"
              @click="editOption"
            >
              <template #icon>
                <component :is="InquiryGeneralIcons.Edit" :size="16" />
              </template>
              {{ t('agora', 'Edit') }}
            </NcButton>
            
            <NcButton
              v-if="option.permissions.delete"
              type="tertiary-error"
              :aria-label="t('agora', 'Delete option')"
              @click="deleteOption"
            >
              <template #icon>
                <component :is="InquiryGeneralIcons.Delete" :size="16" />
              </template>
              {{ t('agora', 'Delete') }}
            </NcButton>
            
            <NcButton
              v-if="option.canAddChildren"
              type="tertiary"
              :aria-label="t('agora', 'Add child option')"
              @click="addChildOption"
            >
              <template #icon>
                <component :is="InquiryGeneralIcons.Add" :size="16" />
              </template>
              {{ t('agora', 'Add child') }}
            </NcButton>
          </div>
        </transition>
      </div>
    </div>

    <!-- Option Content -->
    <div class="option-content">
      <div class="option-text" :class="{ 'truncated': isTruncated && !expanded }">
        <div v-if="useMarkdown" class="markdown-content" v-html="option.textMarkDown" />
        <p v-else class="plain-text">{{ truncatedText }}</p>
        
        <button
          v-if="isTruncated && !expanded"
          class="read-more-btn"
          @click.stop="expanded = true"
        >
          {{ t('agora', 'Read more') }}
        </button>
      </div>

      <!-- Author Info -->
      <div v-if="!compact" class="option-author">
        <NcAvatar
          :user="option.owner.id"
          :display-name="option.owner.displayName"
          :size="24"
        />
        <div class="author-info">
          <span class="author-name">{{ option.owner.displayName }}</span>
          <span class="option-date">{{ formatDate(option.created) }}</span>
        </div>
      </div>
    </div>

    <!-- Option Stats -->
    <div class="option-stats">
      <!-- Supports -->
      <div 
        v-if="option.canSupport"
        class="stat-item supports"
        :class="{ 'supported': option.currentUserStatus?.hasSupported }"
        @click.stop="$emit('support', option)"
      >
        <div class="stat-icon">
          <TernarySupportIcon
            v-if="inquiryStore.configuration.supportMode === 'ternary'"
            :support-value="option.currentUserStatus?.supportValue"
            :size="18"
          />
          <ThumbIcon
            v-else
            :supported="option.currentUserStatus?.hasSupported"
            :size="18"
          />
        </div>
        <span class="stat-count">{{ option.currentUserStatus?.countSupports || 0 }}</span>
      </div>

      <!-- Comments -->
      <div 
        class="stat-item comments"
        @click.stop="$emit('comment', option)"
      >
        <div class="stat-icon">
          <component :is="InquiryGeneralIcons.Comment" :size="18" />
        </div>
        <span class="stat-count">{{ option.currentUserStatus?.countComments || 0 }}</span>
      </div>

      <!-- Answers (for questions) -->
      <div 
        v-if="option.type === 'question' && showAnswers"
        class="stat-item answers"
        @click.stop="$emit('answer', option)"
      >
        <div class="stat-icon">
          <component :is="InquiryGeneralIcons.Answer" :size="18" />
        </div>
        <span class="stat-count">{{ option.currentUserStatus?.countAnswers || 0 }}</span>
      </div>

      <!-- Refinements (for ideas) -->
      <div 
        v-if="creative && option.type === 'idea'"
        class="stat-item refinements"
        @click.stop="$emit('refine', option)"
      >
        <div class="stat-icon">
          <component :is="InquiryGeneralIcons.Refine" :size="18" />
        </div>
        <span class="stat-count">{{ option.currentUserStatus?.countRefinements || 0 }}</span>
      </div>

      <!-- Children count -->
      <div 
        v-if="option.children && option.children.length > 0"
        class="stat-item children"
      >
        <div class="stat-icon">
          <component :is="InquiryGeneralIcons.Children" :size="18" />
        </div>
        <span class="stat-count">{{ option.children.length }}</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div v-if="!compact" class="quick-actions">
      <NcButton
        v-if="option.canSupport"
        type="secondary"
        :class="['support-btn', { 'supported': option.currentUserStatus?.hasSupported }]"
        @click.stop="$emit('support', option)"
      >
        <template #icon>
          <TernarySupportIcon
            v-if="inquiryStore.configuration.supportMode === 'ternary'"
            :support-value="option.currentUserStatus?.supportValue"
            :size="16"
          />
          <ThumbIcon
            v-else
            :supported="option.currentUserStatus?.hasSupported"
            :size="16"
          />
        </template>
        {{ getSupportLabel() }}
      </NcButton>

      <NcButton
        type="secondary"
        @click.stop="$emit('comment', option)"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Comment" :size="16" />
        </template>
        {{ t('agora', 'Comment') }}
      </NcButton>

      <NcButton
        v-if="creative && option.type === 'idea'"
        type="secondary"
        @click.stop="$emit('refine', option)"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.Refine" :size="16" />
        </template>
        {{ t('agora', 'Refine') }}
      </NcButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { TernarySupportIcon, ThumbIcon } from '../AppIcons'
import { Option } from '../../stores/option.ts'

// Props
const props = defineProps<{
  option: Option
  inquiryId: number
  compact?: boolean
  creative?: boolean
  showAnswers?: boolean
  showMenu?: boolean
  maxLength?: number
}>()

const emit = defineEmits<{
  click: [option: Option]
  support: [option: Option]
  comment: [option: Option]
  answer: [option: Option]
  refine: [option: Option]
  edit: [option: Option]
  delete: [option: Option]
  'add-child': [option: Option]
}>()

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const expanded = ref(false)
const showContextMenu = ref(false)

// Computed
const truncatedText = computed(() => {
  if (!props.maxLength || props.option.text.length <= props.maxLength) {
    return props.option.text
  }
  return props.option.text.substring(0, props.maxLength) + '...'
})

const isTruncated = computed(() => {
  return props.maxLength && props.option.text.length > props.maxLength
})

const isSelected = computed(() => {
  // Check if this option is currently selected in detail view
  return false // Would need to implement selection logic
})

const hasUnreadComments = computed(() => {
  // Check if option has unread comments
  return false // Would need to implement read tracking
})

const useMarkdown = computed(() => {
  return sessionStore.appSettings?.optionTypesTab?.[props.option.type]?.features?.includes('markdown') || false
})

// Methods
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString()
}

const getSupportLabel = () => {
  if (!props.option.currentUserStatus?.hasSupported) {
    return t('agora', 'Support')
  }
  
  if (inquiryStore.configuration.supportMode === 'ternary') {
    const value = props.option.currentUserStatus.supportValue
    if (value === 1) return t('agora', 'Supported')
    if (value === 0) return t('agora', 'Neutral')
    if (value === -1) return t('agora', 'Against')
  }
  
  return t('agora', 'Supported')
}

const toggleMenu = () => {
  showContextMenu.value = !showContextMenu.value
}

const editOption = () => {
  emit('edit', props.option)
  showContextMenu.value = false
}

const deleteOption = () => {
  if (confirm(t('agora', 'Are you sure you want to delete this option?'))) {
    emit('delete', props.option)
    showContextMenu.value = false
  }
}

const addChildOption = () => {
  emit('add-child', props.option)
  showContextMenu.value = false
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})
</script>

<style scoped lang="scss">
.option-card {
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary-light);
  }

  &.selected {
    border-color: var(--color-primary-element);
    background: var(--color-primary-light);
  }

  &.has-unread {
    border-left: 4px solid var(--color-primary-element);
  }

  &.compact {
    padding: 16px;
    
    .option-header {
      margin-bottom: 12px;
    }
    
    .option-text {
      font-size: 14px;
    }
    
    .option-stats {
      margin-top: 12px;
    }
  }

  &.creative {
    background: linear-gradient(135deg, var(--color-background-dark), var(--color-main-background));
    border-color: var(--color-warning-light);
    
    &:hover {
      border-color: var(--color-warning);
      background: linear-gradient(135deg, var(--color-warning-light), var(--color-background-dark));
    }
  }

  // Type-specific styling
  &.type-argument_for {
    border-left: 4px solid #4a86e8;
    
    &:hover {
      border-color: #4a86e8;
    }
  }

  &.type-argument_against {
    border-left: 4px solid #cc0000;
    
    &:hover {
      border-color: #cc0000;
    }
  }

  &.type-proposal {
    border-left: 4px solid #6aa84f;
    
    &:hover {
      border-color: #6aa84f;
    }
  }

  &.type-question {
    border-left: 4px solid #3c8dbc;
    
    &:hover {
      border-color: #3c8dbc;
    }
  }

  &.type-idea {
    border-left: 4px solid #f1c232;
    
    &:hover {
      border-color: #f1c232;
    }
  }
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .option-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .option-actions {
    position: relative;

    .context-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--color-main-background);
      border: 2px solid var(--color-border);
      border-radius: 12px;
      padding: 8px;
      min-width: 160px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 4px;

      button {
        justify-content: flex-start;
        padding: 8px 12px;
        border-radius: 8px;
        
        &:hover {
          background: var(--color-background-dark);
        }
      }
    }
  }
}

.option-content {
  margin-bottom: 16px;

  .option-text {
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-main-text);
    margin-bottom: 16px;

    &.truncated {
      max-height: 120px;
      overflow: hidden;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(transparent, var(--color-main-background));
      }
    }

    .markdown-content {
      :deep(*) {
        margin: 0 0 8px 0;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
      
      :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
        margin-top: 16px;
        margin-bottom: 8px;
      }
      
      :deep(ul), :deep(ol) {
        padding-left: 20px;
        margin-bottom: 8px;
      }
    }

    .plain-text {
      margin: 0;
      white-space: pre-wrap;
    }

    .read-more-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: transparent;
      border: none;
      color: var(--color-primary-element);
      font-size: 14px;
      font-weight: 600;
      padding: 8px;
      text-align: center;
      cursor: pointer;
      z-index: 1;
      
      &:hover {
        color: var(--color-primary-element-hover);
      }
    }
  }

  .option-author {
    display: flex;
    align-items: center;
    gap: 12px;

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .author-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .option-date {
        font-size: 12px;
        color: var(--color-text-lighter);
      }
    }
  }
}

.option-stats {
  display: flex;
  gap: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--color-border);

  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 12px;
    background: var(--color-background-dark);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background: var(--color-background-darker);
      transform: translateY(-2px);
    }

    &.supported {
      background: var(--color-success-light);
      border-color: var(--color-success);
    }

    .stat-icon {
      display: flex;
      align-items: center;
      
      svg {
        color: var(--color-text-light);
      }
    }

    &.supports.supported .stat-icon svg {
      color: var(--color-success);
    }

    .stat-count {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-main-text);
    }
  }
}

.quick-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--color-border);

  .support-btn {
    &.supported {
      background: var(--color-success-light);
      border-color: var(--color-success);
      color: var(--color-success);
      
      &:hover {
        background: var(--color-success);
        border-color: var(--color-success-hover);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .option-card {
    padding: 16px;
  }

  .option-stats {
    gap: 12px;
    flex-wrap: wrap;
    
    .stat-item {
      flex: 1;
      min-width: 60px;
      justify-content: center;
    }
  }

  .quick-actions {
    flex-direction: column;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
