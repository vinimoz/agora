<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="kanban-item"
    :class="[
      `status-${inquiry.status?.inquiryStatus || 'draft'}`,
      { 'is-dragging': isDragging }
    ]"
    draggable="true"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="item-header">
      <div class="item-type">
        <component :is="typeIcon" :size="14" />
      </div>
      <span class="item-title">{{ inquiry.title }}</span>
    </div>

    <div v-if="shortDescription" class="item-description">
      {{ shortDescription }}
    </div>

    <div class="item-footer">
      <div class="item-meta">
        <span v-if="inquiry.ownedGroup || inquiry.owner?.displayName" class="meta-author">
          {{ inquiry.ownedGroup || inquiry.owner?.displayName }}
        </span>
        <span v-if="inquiry.status?.countComments" class="meta-item">
          <component :is="Icons.Comment" :size="12" />
          {{ inquiry.status.countComments }}
        </span>
        <span v-if="inquiry.status?.countSupports" class="meta-item">
          <component :is="Icons.ThumbUp" :size="12" />
          {{ inquiry.status.countSupports }}
        </span>
      </div>

      <div v-if="inquiry.status?.created" class="item-time">
        {{ formatTime(inquiry.status.created) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types'

interface Props {
  inquiry: Inquiry
  draggable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  draggable: true
})

const emit = defineEmits<{
  click: [inquiry: Inquiry]
  dragstart: [event: DragEvent, inquiry: Inquiry]
  dragend: [event: DragEvent]
}>()

const sessionStore = useSessionStore()
const isDragging = ref(false)

const inquiryTypes = computed(() => sessionStore.appSettings?.inquiryTypeTab || [])

const typeData = computed(() => getInquiryTypeData(props.inquiry.type, inquiryTypes.value))

const typeIcon = computed(() => {
  if (typeData.value?.icon) {
    return typeData.value.icon
  }
  const iconMap: Record<string, any> = {
    'survey': Icons.ClipboardList,
    'poll': Icons.CheckCircle,
    'question': Icons.Question,
    'discussion': Icons.MessageSquare,
    'news': Icons.Newspaper,
    'announcement': Icons.Megaphone,
    'meeting': Icons.Users,
    'document': Icons.Document,
    'proposal': Icons.Scale,
    'general': Icons.FolderMultiple,
  }
  return iconMap[props.inquiry.type?.toLowerCase()] || Icons.FolderMultiple
})

const shortDescription = computed(() => {
  if (!props.inquiry.description) return ''
  const plain = props.inquiry.description.replace(/<[^>]*>/g, '')
  return plain.length > 60 ? `${plain.substring(0, 60)}…` : plain
})

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) {
    return t('agora', 'Now')
  }
  if (hours < 24) {
    return t('agora', '{h}h ago', { h: hours })
  }
  return date.toLocaleDateString('default', { month: 'short', day: 'numeric' })
}

function handleClick() {
  emit('click', props.inquiry)
}

function handleDragStart(event: DragEvent) {
  isDragging.value = true
  emit('dragstart', event, props.inquiry)
}

function handleDragEnd(event: DragEvent) {
  isDragging.value = false
  emit('dragend', event)
}
</script>

<style lang="scss" scoped>
.kanban-item {
  background: var(--color-main-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: 12px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: var(--color-primary-element);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &.is-dragging {
    opacity: 0.5;
    transform: scale(0.95);
  }

  // Status colors
  &.status-active {
    border-left: 3px solid var(--color-success);
  }
  &.status-open {
    border-left: 3px solid var(--color-success);
  }
  &.status-closed {
    border-left: 3px solid var(--color-error);
  }
  &.status-draft {
    border-left: 3px solid var(--color-text-lighter);
    opacity: 0.7;
  }
  &.status-waiting_approval {
    border-left: 3px solid var(--color-warning);
  }
  &.status-rejected {
    border-left: 3px solid var(--color-error);
    opacity: 0.6;
  }

  .item-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;

    .item-type {
      flex-shrink: 0;
      color: var(--color-text-lighter);
    }

    .item-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-main-text);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .item-description {
    font-size: 12px;
    color: var(--color-text-lighter);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 4px 0 8px 22px;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid var(--color-border-light);

    .item-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 11px;
      color: var(--color-text-lighter);

      .meta-author {
        font-weight: 500;
        color: var(--color-text-lighter);
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 3px;

        svg {
          color: var(--color-text-maxcontrast);
        }
      }
    }

    .item-time {
      font-size: 11px;
      color: var(--color-text-lighter);
    }
  }
}
</style>
