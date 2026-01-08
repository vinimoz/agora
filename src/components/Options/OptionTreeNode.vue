<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="tree-node" :class="{ 'has-children': hasChildren, 'expanded': expanded }">
    <!-- Node Content -->
    <div 
      class="node-content"
      :style="{ 'padding-left': `${depth * 24 + 16}px` }"
      @click="$emit('select', option)"
    >
      <!-- Expand/Collapse Toggle -->
      <button
        v-if="hasChildren"
        class="toggle-btn"
        :aria-label="expanded ? t('agora', 'Collapse') : t('agora', 'Expand')"
        @click.stop="toggleExpand"
      >
        <component :is="expanded ? InquiryGeneralIcons.ChevronDown : InquiryGeneralIcons.ChevronRight" :size="16" />
      </button>

      <!-- Node Header -->
      <div class="node-header">
        <div class="node-type" :style="{ color: option.typeColor }">
          <component :is="option.typeIcon" :size="14" />
          <span>{{ option.typeDisplayName }}</span>
        </div>

        <div class="node-text">
          {{ truncatedText }}
          <button
            v-if="isTruncated && !expandedText"
            class="read-more-btn"
            @click.stop="expandedText = true"
          >
            {{ t('agora', 'Read more') }}
          </button>
        </div>

        <div class="node-stats">
          <span v-if="option.canSupport" class="stat-item">
            <TernarySupportIcon
              v-if="inquiryStore.configuration.supportMode === 'ternary'"
              :support-value="option.currentUserStatus?.supportValue"
              :size="14"
            />
            <ThumbIcon
              v-else
              :supported="option.currentUserStatus?.hasSupported"
              :size="14"
            />
            <span class="stat-count">{{ option.currentUserStatus?.countSupports || 0 }}</span>
          </span>

          <span class="stat-item">
            <component :is="InquiryGeneralIcons.Comment" :size="14" />
            <span class="stat-count">{{ option.currentUserStatus?.countComments || 0 }}</span>
          </span>
        </div>

        <div class="node-actions">
          <NcButton
            v-if="option.canAddChildren"
            type="tertiary"
            :aria-label="t('agora', 'Add child')"
            @click.stop="$emit('add-child', option)"
          >
            <template #icon>
              <component :is="InquiryGeneralIcons.Add" :size="14" />
            </template>
          </NcButton>

          <NcButton
            v-if="option.permissions.support"
            type="tertiary"
            :aria-label="t('agora', 'Support')"
            @click.stop="$emit('support', option)"
          >
            <template #icon>
              <TernarySupportIcon
                v-if="inquiryStore.configuration.supportMode === 'ternary'"
                :support-value="option.currentUserStatus?.supportValue"
                :size="14"
              />
              <ThumbIcon
                v-else
                :supported="option.currentUserStatus?.hasSupported"
                :size="14"
              />
            </template>
          </NcButton>

          <NcButton
            v-if="option.permissions.comment"
            type="tertiary"
            :aria-label="t('agora', 'Comment')"
            @click.stop="$emit('comment', option)"
          >
            <template #icon>
              <component :is="InquiryGeneralIcons.Comment" :size="14" />
            </template>
          </NcButton>
        </div>
      </div>
    </div>

    <!-- Children -->
    <transition name="slide">
      <div v-if="expanded && hasChildren" class="children-container">
        <OptionTreeNode
          v-for="child in children"
          :key="child.id"
          :option="child"
          :depth="depth + 1"
          :children="getChildOptions(child.id)"
          @select="$emit('select', $event)"
          @add-child="$emit('add-child', $event)"
          @support="$emit('support', $event)"
          @comment="$emit('comment', $event)"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { TernarySupportIcon, ThumbIcon } from '../AppIcons'
import { Option } from '../../stores/option.ts'

// Props
const props = defineProps<{
  option: Option
  depth: number
  children?: Option[]
  maxTextLength?: number
}>()

const emit = defineEmits<{
  select: [option: Option]
  'add-child': [option: Option]
  support: [option: Option]
  comment: [option: Option]
}>()

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()

// State
const expanded = ref(false)
const expandedText = ref(false)

// Computed
const hasChildren = computed(() => props.children && props.children.length > 0)

const truncatedText = computed(() => {
  const maxLength = props.maxTextLength || 100
  if (expandedText.value || props.option.text.length <= maxLength) {
    return props.option.text
  }
  return `${props.option.text.substring(0, maxLength)  }...`
})

const isTruncated = computed(() => {
  const maxLength = props.maxTextLength || 100
  return props.option.text.length > maxLength
})

// Methods
const toggleExpand = () => {
  expanded.value = !expanded.value
}

const getChildOptions = (parentId: number) => optionsStore.childOptions(parentId)
</script>

<style scoped lang="scss">
.tree-node {
  border-bottom: 1px solid var(--color-border);
  
  &:last-child {
    border-bottom: none;
  }

  &.has-children {
    .node-content {
      border-left: 2px solid var(--color-border);
      
      &:hover {
        border-left-color: var(--color-primary-element);
      }
    }
  }

  &.expanded {
    .node-content {
      border-left-color: var(--color-primary-element);
    }
  }
}

.node-content {
  position: relative;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 60px;

  &:hover {
    background: var(--color-background-dark);
    
    .toggle-btn {
      opacity: 1;
    }
  }

  .toggle-btn {
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: var(--color-main-background);
    border: 2px solid var(--color-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2;

    &:hover {
      border-color: var(--color-primary-element);
      background: var(--color-primary-light);
      
      svg {
        color: var(--color-primary-element);
      }
    }

    svg {
      color: var(--color-text-light);
      transition: color 0.3s ease;
    }
  }
}

.node-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;

  .node-type {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 4px 8px;
    background: var(--color-background-dark);
    border-radius: 8px;
    flex-shrink: 0;
  }

  .node-text {
    flex: 1;
    min-width: 200px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-main-text);

    .read-more-btn {
      background: none;
      border: none;
      color: var(--color-primary-element);
      font-size: 12px;
      font-weight: 600;
      margin-left: 8px;
      cursor: pointer;
      
      &:hover {
        color: var(--color-primary-element-hover);
      }
    }
  }

  .node-stats {
    display: flex;
    gap: 12px;
    flex-shrink: 0;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background: var(--color-background-dark);
      border-radius: 8px;
      font-size: 12px;

      svg {
        color: var(--color-text-light);
      }

      .stat-count {
        font-weight: 600;
        color: var(--color-main-text);
      }
    }
  }

  .node-actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;

    button {
      padding: 4px 8px;
      min-height: 28px;
      
      &:deep(svg) {
        margin: 0;
      }
    }
  }
}

.children-container {
  margin-left: 24px;
  border-left: 2px solid var(--color-border);
}

// Transitions
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

@media (max-width: 768px) {
  .node-header {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    .node-text {
      min-width: 100%;
      order: 2;
    }

    .node-stats {
      order: 3;
      justify-content: flex-start;
    }

    .node-actions {
      order: 1;
      justify-content: flex-end;
    }
  }

  .node-content {
    .toggle-btn {
      opacity: 1;
      left: -12px;
    }
  }
}
</style>
