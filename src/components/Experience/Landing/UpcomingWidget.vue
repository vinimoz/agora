<template>
  <section class="upcoming-widget">
    <header class="section-header">
      <div class="header-left">
        <component :is="Icons.Calendar" :size="20" class="header-icon" />
        <h2>{{ t('agora', 'Upcoming') }}</h2>
      </div>
      <a class="header-link" @click="emit('viewAll')">{{ t('agora', 'View all') }}</a>
    </header>

    <ul class="events-list">
      <li
        v-for="event in events"
        :key="event.id"
        class="event-item"
        @click="emit('click', event)"
      >
        <div class="event-date">
          <span class="date-day">{{ event.day }}</span>
          <span class="date-month">{{ event.month }}</span>
        </div>
        <div class="event-body">
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-location">{{ event.location }} – {{ event.time }}</p>
        </div>
      </li>

      <li v-if="events.length === 0" class="events-empty">
        <p>{{ t('agora', 'No upcoming events') }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'

export interface UpcomingEvent {
  id: number | string
  day: string
  month: string
  title: string
  location: string
  time: string
}

withDefaults(defineProps<{ events?: UpcomingEvent[] }>(), { events: () => [] })
const emit = defineEmits<{ click: [event: UpcomingEvent]; viewAll: [] }>()
</script>

<style lang="scss" scoped>
.upcoming-widget {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

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

    .header-link {
      font-size: 12px;
      color: var(--color-primary-element);
      cursor: pointer;

      &:hover { text-decoration: underline; }
    }
  }

  .events-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .event-item {
    display: flex;
    gap: 12px;
    cursor: pointer;
    padding: 8px;
    border-radius: 10px;
    transition: background 0.15s ease;

    &:hover { background: var(--color-background-hover); }

    .event-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      padding: 6px;
      border-radius: 8px;
      background: var(--color-primary-light);
      color: var(--color-primary-element);

      .date-day {
        font-size: 16px;
        font-weight: 800;
        line-height: 1;
      }

      .date-month {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 2px;
      }
    }

    .event-body {
      flex: 1;
      min-width: 0;

      .event-title {
        margin: 0 0 2px 0;
        font-size: 13px;
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1.25;
      }

      .event-location {
        margin: 0;
        font-size: 11px;
        color: var(--color-text-lighter);
      }
    }
  }

  .events-empty {
    text-align: center;
    font-size: 12px;
    color: var(--color-text-lighter);
    padding: 12px;
  }
}
</style>
