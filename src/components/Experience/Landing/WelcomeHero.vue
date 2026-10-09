<template>
  <div class="welcome-hero" :style="heroStyle">
    <div class="hero-content">
      <span v-if="cityName" class="hero-city">{{ cityName }}</span>
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <p v-if="tagline" class="hero-tagline">{{ tagline }}</p>

<div v-if="stats" class="hero-stats">
  <div class="stat">
    <span class="stat-value">{{ stats.shared }}</span>
    <span class="stat-label">{{ t('agora', 'Shared with you') }}</span>
  </div>
  <div class="stat">
    <span class="stat-value">{{ stats.participated }}</span>
    <span class="stat-label">{{ t('agora', 'You participated in') }}</span>
  </div>
  <div class="stat">
    <span class="stat-value">{{ stats.owned }}</span>
    <span class="stat-label">{{ t('agora', 'Your inquiries') }}</span>
  </div>
  <div class="stat">
    <span class="stat-value">{{ stats.groupInquiries }}</span>
    <span class="stat-label">{{ t('agora', 'In your spaces') }}</span>
  </div>
</div>

      <div class="hero-actions">
        <button
          v-for="action in actions"
          :key="action.key"
          class="hero-action"
          :style="{ '--action-color': action.color }"
          @click="emit('action', action.key)"
        >
          <span class="action-icon">
            <component :is="action.icon" :size="22" />
          </span>
          <span class="action-text">
            <span class="action-label">{{ action.label }}</span>
            <span class="action-hint">{{ action.hint }}</span>
          </span>
        </button>
      </div>
    </div>

    <div v-if="weather" class="hero-weather">
      <component :is="Icons.WeatherSunny" :size="22" />
      <span class="temp">{{ weather.temp }}°C</span>
      <span class="location">{{ weather.location }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'

const props = defineProps<{
  title?: string
  subtitle?: string
  tagline?: string                
  cityName?: string            
  backgroundUrl?: string
  actions?: any[]
  weather?: { temp: number; location: string } | null
  stats?: { shared: number; participated: number; owned: number; groupInquiries: number }
}>()

const emit = defineEmits<{ action: [key: string] }>()

const title = computed(() => props.title || t('agora', 'Welcome to Agora'))
const subtitle = computed(
  () => props.subtitle ||
    t('agora', 'Your civic space for a more direct and participatory democracy'),
)

/**
 * Resolve a hero background image:
 *  - Absolute URL or path starting with `/` → used as-is
 *  - Numeric fileId → Nextcloud preview endpoint
 */
function resolveHeroImage(src?: string): string {
  if (!src) return ''
  const s = String(src)
  if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s
  if (/^\d+$/.test(s)) {
    return `${window.location.origin}/index.php/core/preview?fileId=${s}&x=1920&y=1080&a=1`
  }
  return s
}

const heroStyle = computed(() => {
  const url = resolveHeroImage(props.backgroundUrl)
  return {
    backgroundImage: url
      ? `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55)), url(${url})`
      : 'linear-gradient(135deg, #0891b2, #0e7490)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})

const actions = computed(() => props.actions || [
  { key: 'participate', label: t('agora','Participate'), hint: t('agora','Give your opinion'), icon: Icons.CheckCircle,    color: '#16a34a' },
  { key: 'decide',      label: t('agora','Decide'),      hint: t('agora','Vote and deliberate'), icon: Icons.Scale,        color: '#7c3aed' },
  { key: 'propose',     label: t('agora','Propose'),     hint: t('agora','Share your ideas'),    icon: Icons.Lightbulb,    color: '#f59e0b' },
  { key: 'debate',      label: t('agora','Debate'),      hint: t('agora','Exchange with others'), icon: Icons.MessageSquare, color: '#0ea5e9' },
])
</script>

<style lang="scss" scoped>
.welcome-hero {
  position: relative;
  border-radius: 16px;
  padding: 28px 32px 24px;
  color: white;
  overflow: hidden;
  min-height: 240px;

  .hero-city {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.18);
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 12px;
    backdrop-filter: blur(4px);
  }

  .hero-tagline {
    margin: 0 0 20px 0;
    font-size: 14px;
    font-style: italic;
    opacity: 0.9;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 720px;
  }

  .hero-title {
    margin: 0 0 8px 0;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.15;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  }
.hero-stats {
  display: flex;
  gap: 24px;
  margin: 0 0 20px 0;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  width: fit-content;

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2;

    .stat-value {
      font-size: 22px;
      font-weight: 800;
    }
    .stat-label {
      font-size: 11px;
      opacity: 0.85;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
  }
}

  .hero-subtitle {
    margin: 0 0 24px 0;
    font-size: 16px;
    opacity: 0.95;
    max-width: 520px;
    line-height: 1.5;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    padding: 10px;
  }

  .hero-action {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--color-main-text);
    cursor: pointer;
    text-align: left;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .action-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--action-color) 15%, transparent);
      color: var(--action-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .action-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .action-label {
      font-weight: 700;
      font-size: 14px;
    }

    .action-hint {
      font-size: 11px;
      color: var(--color-text-lighter);
    }
  }

  .hero-weather {
    position: absolute;
    top: 20px;
    right: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    font-size: 14px;

    .temp {
      font-weight: 700;
    }

    .location {
      opacity: 0.8;
      font-size: 12px;
    }
  }
}

@media (max-width: 900px) {
  .welcome-hero .hero-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
