/** * SPDX-FileCopyrightText: 2026 Nextcloud contributors * SPDX-License-Identifier:
AGPL-3.0-or-later */

<template>
  <section class="news-widget">
    <header class="section-header">
      <div class="header-left">
        <component
          :is="Icons.Megaphone"
          :size="20"
          class="header-icon"
        />
        <h2>{{ title || t('agora', 'Your news') }}</h2>
      </div>
    </header>

    <ul class="news-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="news-item"
        @click="emit('click', item)"
      >
        <div
          class="news-thumb"
          :style="{ backgroundImage: `url(${resolveCoverUrl(item.coverId)})` }"
        />
        <div class="news-body">
          <h3 class="news-title">
            {{ item.title }}
          </h3>
          <p class="news-summary">
            {{ item.description }}
          </p>
          <div class="news-meta">
            <span class="news-date">{{ item.created }}</span>
          </div>
        </div>
      </li>

      <li
        v-if="items.length === 0"
        class="news-empty"
      >
        <component
          :is="Icons.Megaphone"
          :size="32"
        />
        <p>{{ t('agora', 'No news yet') }}</p>
      </li>
    </ul>

    <a
      class="news-all-link"
      @click="emit('viewAll')"
    > {{ t('agora', 'See all news') }} → </a>
  </section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'

export interface NewsItem {
  id: number
  title: string
  description: string
  created: string | number
  coverId?: number | string
  tag?: string
  tagColor?: string
  tagBg?: string
}

withDefaults(
  defineProps<{
    items?: NewsItem[]
    title?: string
  }>(),
  { items: () => [], title: '' }
)

const emit = defineEmits<{
  click: [item: NewsItem]
  viewAll: []
}>()

function resolveCoverUrl(src?: number | string): string {
  if (!src) return ''
  const s = String(src)
  if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s
  if (/^\d+$/.test(s)) {
    return `${window.location.origin}/index.php/core/preview?fileId=${s}&x=1200&y=400&a=1`
  }
  return s
}
</script>
<style lang="scss" scoped>
.news-widget {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;

      .header-icon {
        color: #dc2626;
      }

      h2 {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
      }
    }

    .header-link {
      font-size: 12px;
      color: var(--color-primary-element);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .news-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .news-item {
    display: flex;
    gap: 10px;
    cursor: pointer;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-border-light);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:hover .news-title {
      color: var(--color-primary-element);
    }

    .news-thumb {
      width: 70px;
      height: 60px;
      border-radius: 8px;
      background-size: cover;
      background-position: center;
      background-color: var(--color-background-dark);
      flex-shrink: 0;
    }

    .news-body {
      flex: 1;
      min-width: 0;
    }

    .news-title {
      margin: 0 0 3px 0;
      font-size: 13px;
      font-weight: 700;
      line-height: 1.3;
      color: var(--color-main-text);
      transition: color 0.15s ease;
    }

    .news-summary {
      margin: 0 0 6px 0;
      font-size: 11px;
      line-height: 1.35;
      color: var(--color-text-lighter);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .news-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .news-date {
        font-size: 10px;
        color: var(--color-text-maxcontrast);
      }

      .news-tag {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 10px;
      }
    }
  }

  .news-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 20px;
    color: var(--color-text-lighter);
    font-size: 13px;
  }

  .news-all-link {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary-element);
    cursor: pointer;
    text-align: right;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
