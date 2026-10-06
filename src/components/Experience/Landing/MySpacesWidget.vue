<template>
  <section class="my-spaces">
    <header class="section-header">
      <div class="header-left">
        <component :is="Icons.Users" :size="22" class="header-icon" />
        <div>
          <h2>{{ t('agora', 'My spaces') }}</h2>
          <p class="section-subtitle">{{ t('agora', 'Your participation spaces') }}</p>
        </div>
      </div>
      <a class="header-link" @click="emit('viewAll')">
        {{ t('agora', 'View all spaces') }} →
      </a>
    </header>

    <div class="spaces-grid">
      <article
        v-for="group in groups"
        :key="group.id"
        class="space-card"
        @click="emit('click', group)"
      >
        <div
          v-if="getCoverUrl(group)"
          class="space-cover"
          :style="{ backgroundImage: `url(${getCoverUrl(group)})` }"
        />
        <div v-else class="space-cover placeholder">
          <component :is="getGroupIcon(group.type)" :size="32" />
        </div>

        <div class="space-body">
          <h3 class="space-title">{{ group.title }}</h3>
          <p class="space-count">
            {{ t('agora', '{n} activities', { n: group.inquiryIds?.length || 0 }) }}
          </p>
        </div>

        <span class="space-arrow">→</span>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'
import { getInquiryGroupTypeData } from '../../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../../stores/session'
import type { InquiryGroup } from '../../../stores/inquiryGroups.types'

const props = defineProps<{ groups: InquiryGroup[] }>()
const emit = defineEmits<{ click: [group: InquiryGroup]; viewAll: [] }>()

const sessionStore = useSessionStore()

function getCoverUrl(group: InquiryGroup): string | null {
  if (!group.coverId) return null
  return `${window.location.origin}/index.php/core/preview?fileId=${group.coverId}&x=400&y=200`
}

function getGroupIcon(type: string) {
  const types = sessionStore.appSettings?.inquiryGroupTypeTab || []
  return getInquiryGroupTypeData(type, types)?.icon || Icons.FolderMultiple
}
</script>

<style lang="scss" scoped>
.my-spaces {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;

      .header-icon { color: var(--color-primary-element); }

      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }

      .section-subtitle {
        margin: 2px 0 0 0;
        font-size: 13px;
        color: var(--color-text-lighter);
      }
    }

    .header-link {
      font-size: 13px;
      color: var(--color-primary-element);
      cursor: pointer;
      font-weight: 500;

      &:hover { text-decoration: underline; }
    }
  }

  .spaces-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }

  .space-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
      border-color: var(--color-primary-element);

      .space-arrow { transform: translateX(3px); }
    }

    .space-cover {
      height: 90px;
      background-size: cover;
      background-position: center;

      &.placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-background-dark));
        color: var(--color-primary-element);
      }
    }

    .space-body {
      padding: 12px 14px 14px;

      .space-title {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .space-count {
        margin: 0;
        font-size: 12px;
        color: var(--color-text-lighter);
      }
    }

    .space-arrow {
      position: absolute;
      right: 14px;
      bottom: 14px;
      color: var(--color-primary-element);
      font-weight: 700;
      transition: transform 0.2s ease;
    }
  }

  @media (max-width: 1100px) { .spaces-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 600px)  { .spaces-grid { grid-template-columns: repeat(2, 1fr); } }
}
</style>
