<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div
    class="group-vignette"
    :class="{ archived: isArchived }"
    @click="emit('open')"
  >
    <div v-if="coverUrl" class="vignette-cover">
      <img :src="coverUrl" :alt="group.title" />
      <div class="vignette-cover-overlay"></div>
      <div v-if="isArchived" class="archived-overlay">
        <component :is="NavigationIcons.Archive" :size="12" />
        <span>{{ t('agora', 'Archived') }}</span>
      </div>
    </div>

    <div class="vignette-content">
      <div class="vignette-icon" :class="{ archived: isArchived }">
        <component :is="typeIcon" />
      </div>

      <h4>{{ group.title }}</h4>

      <p v-if="group.description" class="vignette-description">
        {{ truncatedDescription }}
      </p>

      <div class="vignette-stats">
        <div class="stat-item">
          <span class="stat-icon">📝</span>
          <span class="stat-value">{{ group.inquiryIds?.length || 0 }}</span>
        </div>
        <div v-if="childCount > 0" class="stat-item">
          <span class="stat-icon">👥</span>
          <span class="stat-value">{{ childCount }}</span>
        </div>
      </div>

      <div class="vignette-footer">
        <slot name="footer">
          <NcButton class="view-group-button" @click.stop="emit('open')">
            {{ t('agora', 'View group') }}
            <template #icon>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </template>
          </NcButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { NavigationIcons } from '../../utils/icons'
import type { InquiryGroup } from '../../stores/inquiryGroups.types'

/**
 * InquiryGroupVignette
 * --------------------
 * Shared presentation for a group card, used by the group view (active) and
 * the archived-groups list. The consumer wraps it in a `.vignette-container`
 * when an owner menu must be positioned on hover.
 *
 * Slots:
 *   #footer — replaces the default "View group" button. Use this to render
 *             a custom footer (e.g. the "Archived on" label).
 */
const props = withDefaults(
  defineProps<{
    group: InquiryGroup
    /** Pre-resolved cover URL. Empty or undefined hides the cover. */
    coverUrl?: string
    /** Icon component rendered at the top of the content block. */
    typeIcon: Component
    /** Number of child groups. Renders a second stat badge when > 0. */
    childCount?: number
    /** Archived variant: adds the overlay and tints the icon. */
    isArchived?: boolean
    /** Max characters for the description (default 100). */
    descriptionLimit?: number
  }>(),
  {
    coverUrl: '',
    childCount: 0,
    isArchived: false,
    descriptionLimit: 100,
  },
)

const emit = defineEmits<{ open: [] }>()

const truncatedDescription = computed(() => {
  const desc = props.group.description || ''
  if (desc.length <= props.descriptionLimit) return desc
  return `${desc.slice(0, props.descriptionLimit)}…`
})
</script>

<style lang="scss" scoped>
.group-vignette {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 320px;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &.archived {
    border-left: 4px solid #6c757d;
    opacity: 0.9;

    &:hover {
      opacity: 1;
      border-color: #495057;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary, #2196f3);

    .vignette-cover img {
      transform: scale(1.05);
    }
  }

  .vignette-cover {
    height: 120px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .vignette-cover-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
    }

    .archived-overlay {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(108, 117, 125, 0.9);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .vignette-content {
    padding: 16px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .vignette-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      margin-bottom: 10px;

      &.archived {
        background: linear-gradient(135deg, #adb5bd, #6c757d);
      }
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #2c3e50;
      line-height: 1.3;
    }

    .vignette-description {
      color: #7f8c8d;
      font-size: 13px;
      line-height: 1.3;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 0 0 auto;
    }

    .vignette-stats {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;

        .stat-icon {
          opacity: 0.8;
        }

        .stat-value {
          font-weight: 600;
          color: #2c3e50;
        }
      }
    }

    .vignette-footer {
      margin-top: auto;

      :deep(.view-group-button) {
        width: 100%;
        justify-content: center;
        background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
        color: white;
        border: none;
        padding: 8px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 12px;
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
          transform: translateY(-1px);
        }
      }
    }
  }
}
</style>
