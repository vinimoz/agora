<template>
  <section class="explore">
    <header class="section-header">
      <div class="header-left">
        <component :is="Icons.Compass" :size="22" class="header-icon" />
        <div>
          <h2>{{ t('agora', 'Explore / Participate') }}</h2>
          <p class="section-subtitle">{{ t('agora', 'Discover, propose, debate…') }}</p>
        </div>
      </div>
      <a class="header-link" @click="emit('viewAll')">
        {{ t('agora', 'View all categories') }} →
      </a>
    </header>

    <div class="explore-body">
      <div class="categories-grid">
        <div
          v-for="cat in categories"
          :key="cat.key"
          class="category-tile"
          :style="{ '--tile-color': cat.color }"
          @click="emit('category', cat.key)"
        >
          <span class="tile-icon">
            <component :is="cat.icon" :size="20" />
          </span>
          <div class="tile-text">
            <span class="tile-label">{{ cat.label }}</span>
            <span class="tile-count">{{ cat.count }}</span>
          </div>
        </div>
      </div>

      <aside class="cta-card">
        <h3>{{ t('agora', 'An idea for your city?') }}</h3>
        <p>{{ t('agora', 'Propose, debate, vote!') }}</p>
        <button class="cta-button" @click="emit('create')">
          {{ t('agora', 'Create a proposal') }}
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'
import type { Inquiry } from '../../../Types'

const props = defineProps<{ inquiries?: Inquiry[] }>()
const emit = defineEmits<{ category: [key: string]; create: []; viewAll: [] }>()

const categories = computed(() => [
  { key: 'proposals',     label: t('agora', 'Proposals'),     count: t('agora', '{n} active',     { n: countOf('proposal') }),     icon: Icons.Lightbulb,     color: '#16a34a' },
  { key: 'debates',       label: t('agora', 'Debates'),       count: t('agora', '{n} in progress',{ n: countOf('discussion') }), icon: Icons.MessageSquare, color: '#2563eb' },
  { key: 'consultations', label: t('agora', 'Consultations'), count: t('agora', '{n} open',       { n: countOf('survey') }),       icon: Icons.ClipboardList, color: '#0ea5e9' },
  { key: 'petitions',     label: t('agora', 'Petitions'),     count: t('agora', '{n} open',       { n: countOf('petition') }),     icon: Icons.Megaphone,     color: '#dc2626' },
  { key: 'consultations2',label: t('agora', 'Consultations'), count: t('agora', '{n} in progress',{ n: countOf('consultation') }), icon: Icons.Scale,         color: '#f59e0b' },
  { key: 'surveys',       label: t('agora', 'Surveys'),       count: t('agora', '{n} active',     { n: countOf('question') }),     icon: Icons.Question,      color: '#2563eb' },
  { key: 'projects',      label: t('agora', 'Projects'),      count: t('agora', '{n} active',     { n: countOf('project') }),      icon: Icons.Folder,        color: '#16a34a' },
  { key: 'events',        label: t('agora', 'Events'),        count: t('agora', '{n} upcoming',   { n: 14 }),                       icon: Icons.Calendar,      color: '#7c3aed' },
  { key: 'other',         label: t('agora', 'Other'),         count: t('agora', 'View all'),                                        icon: Icons.DotsHorizontal,color: '#6b7280' },
])

function countOf(type: string): number {
  return (props.inquiries || []).filter((i) => i.type === type).length
}
</script>

<style lang="scss" scoped>
.explore {
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

  .explore-body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
    align-items: stretch;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    background: var(--color-main-background);
    padding: 14px;
    border-radius: 14px;
    border: 1px solid var(--color-border);
  }

  .category-tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    background: color-mix(in srgb, var(--tile-color) 6%, transparent);
    transition: background 0.15s ease, transform 0.15s ease;

    &:hover {
      background: color-mix(in srgb, var(--tile-color) 12%, transparent);
      transform: translateY(-2px);
    }

    .tile-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--tile-color) 15%, transparent);
      color: var(--tile-color);
      flex-shrink: 0;
    }

    .tile-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 0;
    }

    .tile-label {
      font-weight: 700;
      font-size: 13px;
      color: var(--color-main-text);
    }

    .tile-count {
      font-size: 11px;
      color: var(--color-text-lighter);
    }
  }

  .cta-card {
    background: linear-gradient(135deg, #0e7490, #0891b2);
    color: white;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 40%),
        radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1), transparent 40%);
      pointer-events: none;
    }

    h3 {
      margin: 0;
      font-size: 17px;
      font-weight: 700;
      position: relative;
    }

    p {
      margin: 0;
      font-size: 13px;
      opacity: 0.9;
      position: relative;
    }

    .cta-button {
      margin-top: 8px;
      padding: 10px 16px;
      border: none;
      border-radius: 10px;
      background: white;
      color: #0e7490;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      align-self: flex-start;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      position: relative;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
    }
  }

  @media (max-width: 900px) {
    .explore-body { grid-template-columns: 1fr; }
    .categories-grid { grid-template-columns: repeat(2, 1fr); }
  }
}
</style>
