<template>
  <section class="services-widget">
    <header class="section-header">
      <div class="header-left">
        <component :is="Icons.Apps" :size="20" class="header-icon" />
        <h2>{{ t('agora', 'Your online services') }}</h2>
      </div>
    </header>
    <p class="section-subtitle">{{ t('agora', 'Requests, reports, appointments…') }}</p>

    <div class="services-grid">
      <button
        v-for="service in services"
        :key="service.key"
        class="service-tile"
        @click="emit('service', service.key)"
      >
        <span class="service-icon">
          <component :is="service.icon" :size="22" />
        </span>
        <span class="service-label">{{ service.label }}</span>
      </button>
    </div>

    <button class="services-cta" @click="emit('all')">
      {{ t('agora', 'Access all services') }} →
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'

const emit = defineEmits<{ service: [key: string]; all: [] }>()

const services = computed(() => [
  { key: 'request',  label: t('agora', 'Service request'), icon: Icons.Document },
  { key: 'report',   label: t('agora', 'Report'),          icon: Icons.AlertCircle },
  { key: 'booking',  label: t('agora', 'Booking'),         icon: Icons.Calendar },
  { key: 'other',    label: t('agora', 'Other requests'),  icon: Icons.MapMarker },
])
</script>

<style lang="scss" scoped>
.services-widget {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px;

  .section-header {
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;

      .header-icon { color: var(--color-primary-element); }

      h2 {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
      }
    }
  }

  .section-subtitle {
    margin: 4px 0 14px 0;
    font-size: 12px;
    color: var(--color-text-lighter);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }

  .service-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 6px;
    background: var(--color-background-dark);
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      border-color: var(--color-primary-element);
      background: var(--color-primary-light);
      transform: translateY(-2px);
    }

    .service-icon {
      color: var(--color-primary-element);
    }

    .service-label {
      font-size: 10px;
      font-weight: 600;
      text-align: center;
      line-height: 1.2;
      color: var(--color-main-text);
    }
  }

  .services-cta {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background: var(--color-primary-element);
    color: white;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover { background: var(--color-primary-element-hover); }
  }
}
</style>
