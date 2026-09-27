<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="tree-branch" :style="{ paddingLeft: `${depth * 20}px` }">
    <!-- Node -->
    <div 
      class="tree-node"
      :class="{
        'has-children': node.children.length > 0,
        'expanded': expanded,
        'selected': node.id === selectedId,
        [`depth-${depth}`]: true
      }"
      @click="handleClick"
    >
      <!-- Toggle Button -->
      <button 
        v-if="node.children.length > 0"
        class="toggle-btn"
        @click.stop="emit('toggle', node.id)"
      >
        <component :is="expanded ? Icons.ChevronDown : Icons.ChevronRight" :size="16" />
      </button>
      <span v-else class="toggle-placeholder"></span>

      <!-- Icon -->
      <div class="node-icon" :class="getTypeClass(node.type)">
        <component :is="getTypeIcon(node.type)" :size="16" />
      </div>

      <!-- Content -->
      <div class="node-content">
        <div class="node-title">
          {{ node.title }}
          <span v-if="node.status?.countComments" class="comment-badge">
            <component :is="Icons.MessageSquare" :size="12" />
            {{ node.status.countComments }}
          </span>
        </div>
        <div v-if="node.description" class="node-description">
          {{ truncateText(stripHtml(node.description), 80) }}
        </div>
        <div class="node-meta">
          <span class="node-type-label">{{ getTypeLabel(node.type) }}</span>
          <span class="node-author">{{ node.owner?.displayName || node.ownedGroup }}</span>
          <span class="node-date">{{ formatTime(node.status?.created) }}</span>
        </div>
      </div>
    </div>

    <!-- Children -->
    <div v-if="expanded && node.children.length > 0" class="tree-children">
      <TreeBranch
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :expanded="isChildExpanded(child.id)"
        :selected-id="selectedId"
        @toggle="emit('toggle', $event)"
        @select="emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types'

const props = defineProps<{
  node: Inquiry & { children: Inquiry[] }
  depth: number
  expanded: boolean
  selectedId: number | null
}>()

const emit = defineEmits<{
  toggle: [id: number]
  select: [node: Inquiry]
}>()

const sessionStore = useSessionStore()

function getTypeIcon(type: string) {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.icon || Icons.FolderMultiple
}

function getTypeLabel(type: string): string {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.label || type || 'Unknown'
}

function getTypeClass(type: string): string {
  return `type-${type?.toLowerCase() || 'default'}`
}

function isChildExpanded(id: number): boolean {
  // Children expansion state is managed by parent via expandedNodes Set
  return false // This will be overridden by the parent's expanded state
}

function truncateText(text: string, max: number): string {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.substring(0, max)  }…`
}

function stripHtml(html: string): string {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

function formatTime(timestamp?: number): string {
  if (!timestamp) return ''
  try {
    return new Date(timestamp * 1000).toLocaleDateString()
  } catch {
    return ''
  }
}

function handleClick() {
  emit('select', props.node)
}
</script>

<style lang="scss" scoped>
.tree-branch {
  .tree-node {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
    margin: 2px 8px;

    &:hover {
      background: var(--color-background-hover);
    }

    &.selected {
      background: var(--color-primary-light);
      border-left: 3px solid var(--color-primary-element);

      .node-title {
        color: var(--color-primary-element);
      }
    }

    &.depth-0 {
      font-weight: 600;
      
      .node-title {
        font-size: 16px;
      }
    }

    &.depth-1 {
      .node-title {
        font-size: 15px;
      }
    }

    &.depth-2 {
      .node-title {
        font-size: 14px;
      }
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: none;
      color: var(--color-text-lighter);
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      margin-top: 2px;

      &:hover {
        color: var(--color-primary-element);
        background: var(--color-background-hover);
        border-radius: 4px;
      }
    }

    .toggle-placeholder {
      width: 24px;
      flex-shrink: 0;
    }

    .node-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;

      &.type-proposal { background: rgba(16, 185, 129, 0.1); color: #10b981; }
      &.type-survey { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
      &.type-poll { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
      &.type-discussion { background: rgba(6, 182, 212, 0.1); color: #06b6d4; }
      &.type-question { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
      &.type-default { background: var(--color-background-dark); color: var(--color-text-lighter); }
    }

    .node-content {
      flex: 1;
      min-width: 0;

      .node-title {
        font-size: 15px;
        font-weight: 500;
        color: var(--color-main-text);
        display: flex;
        align-items: center;
        gap: 8px;

        .comment-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 400;
          color: var(--color-text-lighter);
          background: var(--color-background-dark);
          padding: 0 6px;
          border-radius: 10px;
        }
      }

      .node-description {
        font-size: 13px;
        color: var(--color-text-lighter);
        margin-top: 2px;
        line-height: 1.4;
      }

      .node-meta {
        display: flex;
        gap: 12px;
        margin-top: 4px;
        font-size: 11px;
        color: var(--color-text-lighter);

        .node-type-label {
          background: var(--color-background-dark);
          padding: 0 8px;
          border-radius: 10px;
        }

        .node-author {
          opacity: 0.8;
        }

        .node-date {
          opacity: 0.6;
        }
      }
    }
  }

  .tree-children {
    margin-top: 2px;
  }
}
</style>
