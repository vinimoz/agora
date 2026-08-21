<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-tree">
    <!-- Tree Controls -->
    <div class="tree-controls">
      <div class="controls-left">
        <button 
          class="control-btn"
          :title="t('agora', 'Expand all')"
          @click="expandAll"
        >
          <component :is="Icons.Plus" :size="18" />
        </button>
        <button 
          class="control-btn"
          :title="t('agora', 'Collapse all')"
          @click="collapseAll"
        >
          <component :is="Icons.Minus" :size="18" />
        </button>
        <span class="tree-count">{{ flattenedNodes.length }} items</span>
      </div>
      <div class="controls-right">
        <input 
          v-model="searchQuery" 
          type="text" 
          class="search-input"
          :placeholder="t('agora', 'Search...')"
        />
      </div>
    </div>

    <!-- Tree Content -->
    <div class="tree-container">
      <div v-if="filteredRoots.length === 0" class="empty-state">
        <component :is="Icons.Tree" :size="48" />
        <h3>{{ t('agora', 'No items to display') }}</h3>
        <p>{{ searchQuery ? t('agora', 'No results found for your search') : t('agora', 'This tree is empty') }}</p>
      </div>

      <TreeBranch
        v-for="node in filteredRoots"
        :key="node.id"
        :node="node"
        :expanded="isExpanded(node.id)"
        :depth="0"
        :selected-id="selectedId"
        @toggle="toggleNode"
        @select="selectNode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import TreeBranch from './TreeBranch.vue'
import type { Inquiry } from '../../Types'

interface TreeNode extends Inquiry {
  children: TreeNode[]
  parentId: number | null
}

const props = defineProps<{
  inquiries: Inquiry[]
  parentId?: number | null
}>()

const emit = defineEmits<{
  select: [inquiry: Inquiry]
}>()

const searchQuery = ref('')
const expandedNodes = ref<Set<number>>(new Set())
const selectedId = ref<number | null>(null)

// Build tree structure
const treeData = computed<TreeNode[]>(() => {
  const map = new Map<number, TreeNode>()
  const roots: TreeNode[] = []
  
  // Create nodes
  props.inquiries.forEach(inquiry => {
    map.set(inquiry.id, { ...inquiry, children: [] })
  })
  
  // Build relationships
  map.forEach((node) => {
    const parentId = node.parentId || props.parentId
    if (parentId && map.has(parentId)) {
      map.get(parentId)!.children.push(node)
    } else {
      // Only add as root if no parent or parent not in list
      if (!node.parentId) {
        roots.push(node)
      }
    }
  })
  
  return roots
})

const filteredRoots = computed(() => {
  if (!searchQuery.value) return treeData.value
  
  const query = searchQuery.value.toLowerCase()
  
  function filterNode(node: TreeNode): TreeNode | null {
    const matches = node.title.toLowerCase().includes(query) ||
                    node.description?.toLowerCase().includes(query) ||
                    false
    
    const filteredChildren = node.children
      .map(child => filterNode(child))
      .filter((child): child is TreeNode => child !== null)
    
    if (matches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren
      }
    }
    return null
  }
  
  return treeData.value
    .map(node => filterNode(node))
    .filter((node): node is TreeNode => node !== null)
})

// Flatten for counting
const flattenedNodes = computed(() => {
  function flatten(nodes: TreeNode[]): TreeNode[] {
    let result: TreeNode[] = []
    nodes.forEach(node => {
      result.push(node)
      result = result.concat(flatten(node.children))
    })
    return result
  }
  return flatten(filteredRoots.value)
})

function toggleNode(id: number) {
  if (expandedNodes.value.has(id)) {
    expandedNodes.value.delete(id)
  } else {
    expandedNodes.value.add(id)
  }
}

function isExpanded(id: number): boolean {
  return expandedNodes.value.has(id)
}

function expandAll() {
  flattenedNodes.value.forEach(node => {
    if (node.children.length > 0) {
      expandedNodes.value.add(node.id)
    }
  })
}

function collapseAll() {
  expandedNodes.value.clear()
}

function selectNode(node: TreeNode) {
  selectedId.value = node.id
  emit('select', node)
}
</script>

<style lang="scss" scoped>
.inquiry-tree {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.tree-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);
  flex-wrap: wrap;
  gap: 12px;

  .controls-left {
    display: flex;
    align-items: center;
    gap: 8px;

    .control-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: var(--color-main-background);
      color: var(--color-text-lighter);
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: var(--color-primary-element);
        color: var(--color-primary-element);
        background: var(--color-primary-light);
      }
    }

    .tree-count {
      font-size: 13px;
      color: var(--color-text-lighter);
      margin-left: 8px;
    }
  }

  .controls-right {
    .search-input {
      padding: 6px 12px 6px 32px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: var(--color-main-background);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: 10px center;
      font-size: 14px;
      transition: all 0.2s;
      width: 200px;

      &:focus {
        outline: none;
        border-color: var(--color-primary-element);
        box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
        width: 250px;
      }
    }
  }
}

.tree-container {
  padding: 8px 0;
  max-height: 600px;
  overflow-y: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  color: var(--color-text-lighter);

  svg {
    opacity: 0.3;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: var(--color-main-text);
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .tree-controls {
    flex-direction: column;
    align-items: stretch;

    .controls-right {
      .search-input {
        width: 100%;

        &:focus {
          width: 100%;
        }
      }
    }
  }
}
</style>
