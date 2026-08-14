<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="tree-node" :style="{ paddingLeft: (node.depth * 16 + 4) + 'px' }">
    <div
      class="node-content"
      :class="{ 
        selected: selectedId === node.id,
        'has-children': node.children.length > 0
      }"
      @click="$emit('select', node)"
    >
      <component :is="getOptionTypeIconComponent(node.type, optionTypes)" :size="14" />
      <span class="node-label">{{ getOptionLabel(node) }}</span>
      <span class="node-type">{{ getOptionTypeLabel(node.type) }}</span>
      <span v-if="node.children.length > 0" class="node-count">
        {{ node.children.length }}
      </span>
    </div>
    
    <!-- Recursive children -->
    <template v-if="node.children.length > 0">
      <DebateTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected-id="selectedId"
        :option-types="optionTypes"
        @select="$emit('select', $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { getOptionTypeIconComponent, getOptionTypeLabel } from '../../../helpers/modules/InquiryOptionHelper'
import type { InquiryOptionType } from '../../Types/index.ts'

interface OptionNode {
  id: number
  type: string
  title?: string
  label?: string
  depth: number
  children: OptionNode[]
  [key: string]: unknown
}

defineProps<{
  node: OptionNode
  selectedId: number | null
  optionTypes: InquiryOptionType[]
}>()


defineEmits<{
  select: [option: OptionNode]
}>()


const getOptionLabel = (option: OptionNode): string => option.title || option.label || getOptionTypeLabel(option.type)
</script>

<style scoped lang="scss">
.tree-node {
  .node-content {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background: var(--color-background-hover);
    }

    &.selected {
      background: var(--color-primary-light);
      color: var(--color-primary-element);
      font-weight: 500;

      .node-type {
        background: var(--color-primary-light);
        color: var(--color-primary-element);
      }
    }

    &.has-children {
      font-weight: 500;
    }

    .node-label {
      flex: 1;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .node-type {
      font-size: 9px;
      color: var(--color-text-lighter);
      background: var(--color-background-dark);
      padding: 0 6px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }

    .node-count {
      font-size: 10px;
      background: var(--color-background-dark);
      padding: 0 8px;
      border-radius: 10px;
      color: var(--color-text-light);
      flex-shrink: 0;
      font-weight: 600;
    }
  }
}
</style>
