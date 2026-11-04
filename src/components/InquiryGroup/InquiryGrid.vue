<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div ref="gridRef" class="inquiry-grid">
    <InquiryItem
      v-for="(inq, i) in inquiries"
      :key="inq.id"
      :inquiry="inq"
      grid-view
      :compact="compact"
      :featured="isFeatured(inq)"
      :size="getSize(inq)"
      :style="getItemStyle(i)"
      @click="$emit('click', $event)"
    >
      <template #actions>
        <slot name="actions" />
      </template>
    </InquiryItem>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { Inquiry } from '../../Types'
import InquiryItem from '../Inquiry/InquiryItem.vue'

const props = defineProps<{
  inquiries: Inquiry[]
  compact?: boolean
  columns?: number
}>()

const emit = defineEmits<{
  click: [inquiry: Inquiry]
}>()

const sessionStore = useSessionStore()
const gridRef = ref<HTMLElement | null>(null)

function getCoverUrl(inquiry: Inquiry): string | null {
  if (!inquiry.coverId) return null
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${inquiry.coverId}&x=400&y=300`
}

function getTypeLabel(type: string): string {
  const types = sessionStore.appSettings?.inquiryTypeTab || []
  const data = getInquiryTypeData(type, types)
  return data?.label || type || ''
}

function getTypeClass(type: string): string {
  return `type-${type?.toLowerCase() || 'default'}`
}

function isFeatured(inquiry: Inquiry): boolean {
  return inquiry.miscFields?.featured === true || false
}

function getSize(inquiry: Inquiry): 'large' | 'small' | 'normal' {
  if (inquiry.miscFields?.size) return inquiry.miscFields.size
  return 'normal'
}

function getItemStyle(index: number): Record<string, string> {
  const styles: Record<string, string> = {}
  if (props.columns) {
    const col = index % props.columns
    styles['grid-column'] = `${col + 1}`
  }
  return styles
}

function truncateText(text: string, max: number): string {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.substring(0, max)}…`
}

function stripHtml(html: string): string {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

function handleClick(inquiry: Inquiry) {
  emit('click', inquiry)
}
</script>

<style lang="scss" scoped>
.inquiry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 4px;
}

.grid-item {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary-element);
  }

  &.featured {
    grid-column: span 2;
    border-color: var(--color-primary-element);
    background: var(--color-primary-light);
  }

  &.size-lg {
    grid-row: span 2;
  }

  &.size-sm {
    grid-row: span 1;
    .item-title {
      font-size: 14px;
    }
  }

  &.compact {
    .item-content {
      padding: 12px;
    }
    .item-title {
      font-size: 14px;
    }
    .item-description {
      font-size: 12px;
      -webkit-line-clamp: 1;
    }
  }

  .item-cover {
    position: relative;
    height: 160px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .cover-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);

      .type-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        color: white;

        &.type-proposal {
          background: #10b981;
        }
        &.type-survey {
          background: #3b82f6;
        }
        &.type-poll {
          background: #8b5cf6;
        }
        &.type-discussion {
          background: #06b6d4;
        }
        &.type-question {
          background: #f59e0b;
        }
        &.type-default {
          background: #6b7280;
        }
      }
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .item-content {
    padding: 16px;

    &.no-cover {
      padding-top: 12px;
    }

    .item-title {
      margin: 0 0 6px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-main-text);
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .item-description {
      margin: 0 0 12px 0;
      font-size: 13px;
      color: var(--color-text-lighter);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .item-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid var(--color-border-light);

      .meta-author {
        display: flex;
        align-items: center;
        gap: 6px;

        .meta-avatar {
          border: 1px solid var(--color-border);
        }

        .meta-name {
          font-size: 12px;
          color: var(--color-text-lighter);
        }
      }

      .meta-stats {
        display: flex;
        gap: 10px;

        .stat {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 12px;
          color: var(--color-text-lighter);

          svg {
            opacity: 0.6;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .inquiry-grid {
    grid-template-columns: 1fr;
  }

  .grid-item.featured {
    grid-column: span 1;
  }
}
</style>
