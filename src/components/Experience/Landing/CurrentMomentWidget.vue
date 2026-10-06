<template>
  <section class="current-moment">
    <header class="section-header">
      <div class="header-left">
        <component :is="Icons.Flash" :size="22" class="header-icon" />
        <div>
          <h2>{{ t('agora', 'Right now') }}</h2>
          <p class="section-subtitle">{{ t('agora', 'Topics that need your attention') }}</p>
        </div>
      </div>
      <a class="header-link" @click="emit('viewAll')">
        {{ t('agora', 'View all') }} →
      </a>
    </header>

    <div class="moment-grid">
      <article
        v-for="inquiry in inquiries"
        :key="inquiry.id"
        class="moment-card"
        @click="emit('click', inquiry)"
      >
        <div class="card-top">
          <span class="type-badge" :style="{ background: getTypeColor(inquiry.type) }">
            {{ getTypeLabel(inquiry.type) }}
          </span>
          <span class="deadline">{{ getDeadline(inquiry) }}</span>
        </div>

        <div
          v-if="getCoverUrl(inquiry)"
          class="card-cover"
          :style="{ backgroundImage: `url(${getCoverUrl(inquiry)})` }"
        />

        <div class="card-body">
          <h3 class="card-title">{{ inquiry.title }}</h3>
          <p v-if="inquiry.description" class="card-question">
            {{ stripHtml(inquiry.description) }}
          </p>

          <!-- Progress bar for votes/participation -->
          <div v-if="showProgress(inquiry)" class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: getProgress(inquiry) + '%', background: getTypeColor(inquiry.type) }"
            />
            <span class="progress-label">{{ getProgressLabel(inquiry) }}</span>
          </div>
        </div>

        <button class="card-action" :style="{ color: getTypeColor(inquiry.type) }">
          {{ getActionLabel(inquiry.type) }} →
        </button>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'
import type { Inquiry } from '../../../Types'

const props = defineProps<{ inquiries: Inquiry[] }>()
const emit = defineEmits<{ click: [inquiry: Inquiry]; viewAll: [] }>()

const TYPE_META: Record<string, { color: string; label: string; action: string }> = {
  vote:         { color: '#16a34a', label: 'VOTE',         action: 'Vote now' },
  debate:       { color: '#2563eb', label: 'DEBATE',       action: 'Join the debate' },
  consultation: { color: '#f59e0b', label: 'CONSULTATION', action: 'Answer the survey' },
  proposal:     { color: '#ea580c', label: 'PROPOSAL',     action: 'View proposals' },
  poll:         { color: '#16a34a', label: 'POLL',         action: 'Vote now' },
  discussion:   { color: '#2563eb', label: 'DISCUSSION',   action: 'Join the debate' },
}

function meta(type: string) { return TYPE_META[type] || { color: '#6b7280', label: type?.toUpperCase() || 'INQUIRY', action: 'Open' } }
function getTypeColor(type: string) { return meta(type).color }
function getTypeLabel(type: string) { return meta(type).label }
function getActionLabel(type: string) { return t('agora', meta(type).action) }

function getCoverUrl(inquiry: Inquiry): string | null {
  if (!inquiry.coverId) return null
  return `${window.location.origin}/index.php/core/preview?fileId=${inquiry.coverId}&x=400&y=200`
}

function getDeadline(inquiry: Inquiry): string {
  const expire = inquiry.configuration?.expire
  if (!expire) return ''
  const days = Math.ceil((expire * 1000 - Date.now()) / 86400000)
  if (days < 0) return t('agora', 'Closed')
  if (days === 0) return t('agora', 'Ends today')
  return t('agora', '{n} days left', { n: days })
}

function stripHtml(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || '').slice(0, 80)
}

function showProgress(inquiry: Inquiry): boolean {
  return (inquiry.status?.countSupports || 0) > 0 || (inquiry.status?.countParticipants || 0) > 0
}

function getProgress(inquiry: Inquiry): number {
  const total = inquiry.status?.countParticipants || 100
  const current = inquiry.status?.countSupports || 0
  return Math.min(100, Math.round((current / total) * 100))
}

function getProgressLabel(inquiry: Inquiry): string {
  return t('agora', '{n} votes', { n: inquiry.status?.countSupports || 0 })
}
</script>

<style lang="scss" scoped>
.current-moment {
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
        color: var(--color-main-text);
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

  .moment-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .moment-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
      border-color: var(--color-primary-element);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px 6px;

      .type-badge {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: white;
        padding: 3px 9px;
        border-radius: 10px;
      }

      .deadline {
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-lighter);
        background: var(--color-background-dark);
        padding: 3px 8px;
        border-radius: 10px;
      }
    }

    .card-cover {
      height: 100px;
      margin: 4px 12px;
      border-radius: 10px;
      background-size: cover;
      background-position: center;
    }

    .card-body {
      padding: 10px 14px 8px;
      flex: 1;

      .card-title {
        margin: 0 0 4px 0;
        font-size: 15px;
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1.25;
      }

      .card-question {
        margin: 0 0 10px 0;
        font-size: 12px;
        color: var(--color-text-lighter);
        line-height: 1.4;
      }

      .progress-bar {
        position: relative;
        height: 6px;
        background: var(--color-background-dark);
        border-radius: 3px;
        overflow: hidden;
        margin-top: auto;

        .progress-fill {
          height: 100%;
          transition: width 0.4s ease;
        }

        .progress-label {
          display: block;
          margin-top: 6px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-lighter);
        }
      }
    }

    .card-action {
      background: transparent;
      border: none;
      border-top: 1px solid var(--color-border);
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: left;
      transition: background 0.15s ease;

      &:hover { background: var(--color-background-hover); }
    }
  }

  @media (max-width: 1100px) { .moment-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .moment-grid { grid-template-columns: 1fr; } }
}
</style>
