<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="timeline-layout">
    <!-- Timeline controls -->
    <div class="timeline-controls">
      <div class="view-mode">
        <NcButton
          :type="viewMode === 'list' ? 'primary' : 'tertiary'"
          :size="'small'"
          @click="viewMode = 'list'"
        >
          <template #icon>
            <component :is="InquiryOptionIcons.List" :size="18" />
          </template>
          {{ t('agora', 'List') }}
        </NcButton>
        <NcButton
          :type="viewMode === 'timeline' ? 'primary' : 'tertiary'"
          :size="'small'"
          @click="viewMode = 'timeline'"
        >
          <template #icon>
            <component :is="InquiryOptionIcons.Timeline" :size="18" />
          </template>
          {{ t('agora', 'Timeline') }}
        </NcButton>
        <NcButton
          :type="viewMode === 'calendar' ? 'primary' : 'tertiary'"
          :size="'small'"
          @click="viewMode = 'calendar'"
        >
          <template #icon>
            <component :is="InquiryOptionIcons.Calendar" :size="18" />
          </template>
          {{ t('agora', 'Calendar') }}
        </NcButton>
      </div>

      <div class="filter-controls">
        <NcTextField
          :value="dateFilter"
          :label="t('agora', 'Filter by date')"
          type="date"
          @update:value="dateFilter = $event"
        />
      </div>
    </div>

    <!-- Timeline view -->
    <div v-if="viewMode === 'timeline'" class="timeline-view">
      <div class="timeline-header">
        <div class="timeline-scale">
          <button 
            class="scale-btn" 
            :class="{ active: scale === 'day' }"
            @click="scale = 'day'"
          >
            {{ t('agora', 'Day') }}
          </button>
          <button 
            class="scale-btn" 
            :class="{ active: scale === 'week' }"
            @click="scale = 'week'"
          >
            {{ t('agora', 'Week') }}
          </button>
          <button 
            class="scale-btn" 
            :class="{ active: scale === 'month' }"
            @click="scale = 'month'"
          >
            {{ t('agora', 'Month') }}
          </button>
        </div>
      </div>

      <div class="timeline-container">
        <!-- Time markers -->
        <div class="time-markers">
          <div 
            v-for="marker in timeMarkers" 
            :key="marker.timestamp"
            class="time-marker"
            :style="{ left: `${marker.position}%` }"
          >
            <span class="marker-label">{{ marker.label }}</span>
          </div>
        </div>

        <!-- Timeline items -->
        <div class="timeline-items">
          <div 
            v-for="option in sortedOptions" 
            :key="option.id"
            class="timeline-item-wrapper"
            :style="getItemPosition(option)"
          >
            <div 
              class="timeline-item"
              :class="`type-${option.type}`"
              @click="$emit('openDetail', option)"
            >
              <div class="item-content">
                <div class="item-icon">
                  <component :is="getOptionTypeIcon(option.type)" :size="16" />
                </div>
                <div class="item-details">
                  <div class="item-title">{{ option.title || option.label }}</div>
                  <div class="item-dates">
                    <span v-if="option.startDate" class="date">
                      {{ formatDate(option.startDate) }}
                    </span>
                    <span v-if="option.endDate" class="date">
                      → {{ formatDate(option.endDate) }}
                    </span>
                  </div>
                </div>
                <div 
                  v-if="option.status"
                  class="status-indicator"
                  :style="{ backgroundColor: getStatusColor(option.status) }"
                  :title="option.status"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List view (fallback to cards) -->
    <div v-else-if="viewMode === 'list'" class="list-view">
      <div class="options-list">
        <OptionCard
          v-for="option in sortedOptions"
          :key="option.id"
          :option="option"
          :inquiry-id="inquiryId"
          :compact="true"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>

    <!-- Calendar view -->
    <div v-else-if="viewMode === 'calendar'" class="calendar-view">
      <div class="calendar-header">
        <NcButton type="tertiary" size="small" @click="previousMonth">
          <template #icon>
            <component :is="InquiryOptionIcons.ChevronLeft" :size="18" />
          </template>
        </NcButton>
        <h3>{{ currentMonthLabel }}</h3>
        <NcButton type="tertiary" size="small" @click="nextMonth">
          <template #icon>
            <component :is="InquiryOptionIcons.ChevronRight" :size="18" />
          </template>
        </NcButton>
        <NcButton type="secondary" size="small" @click="currentMonth = new Date()">
          {{ t('agora', 'Today') }}
        </NcButton>
      </div>

      <div class="calendar-grid">
        <div v-for="day in weekDays" :key="day" class="calendar-weekday">
          {{ day }}
        </div>
        
        <div 
          v-for="day in calendarDays" 
          :key="day.date"
          class="calendar-day"
          :class="{
            'other-month': !day.currentMonth,
            'today': day.isToday
          }"
        >
          <div class="day-header">
            <span class="day-number">{{ day.day }}</span>
            <span v-if="day.events.length" class="event-count">
              {{ day.events.length }}
            </span>
          </div>
          
          <div class="day-events">
            <div 
              v-for="event in day.events" 
              :key="event.id"
              class="calendar-event"
              :class="`type-${event.type}`"
              @click="$emit('openDetail', event)"
            >
              <span class="event-title">{{ event.title || event.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="sortedOptions.length === 0" class="empty-state">
      <component :is="InquiryOptionIcons.Timeline" :size="48" />
      <h4>{{ t('agora', 'No timeline items yet') }}</h4>
      <p>{{ t('agora', 'Add milestones, events or deadlines') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import { DateTime } from 'luxon'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'
import { getOptionTypeIconComponent } from '../../../helpers/modules/InquiryOptionHelper'
import type { Option } from '../../Types/index.ts'

const props = defineProps<{
  options: Option[]
  // family: OptionFamily
  inquiryId: number
  // optionTypes: InquiryOptionType[]
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  'addOption': [optionType: string]
  'openDetail': [option: Option]
  'option-updated': [option: Option]
  'option-deleted': [optionId: number]
}>()

// View state
const viewMode = ref<'list' | 'timeline' | 'calendar'>('timeline')
const scale = ref<'day' | 'week' | 'month'>('week')
const dateFilter = ref('')
const currentMonth = ref(new Date())

// Sort options by date
const sortedOptions = computed(() => {
  let filtered = [...props.options]
  
  // Apply date filter
  if (dateFilter.value) {
    const filterDate = DateTime.fromISO(dateFilter.value)
    filtered = filtered.filter(opt => {
      const optDate = opt.date ? DateTime.fromISO(opt.date) : null
      return optDate && optDate.hasSame(filterDate, 'day')
    })
  }
  
  // Sort by date
  return filtered.sort((a, b) => {
    const dateA = a.startDate || a.date || 0
    const dateB = b.startDate || b.date || 0
    return dateA - dateB
  })
})

// Generate time markers for timeline view
const timeMarkers = computed(() => {
  if (sortedOptions.value.length === 0) return []
  
  const firstDate = sortedOptions.value[0].startDate || sortedOptions.value[0].date
  const lastDate = sortedOptions.value[sortedOptions.value.length - 1].endDate || 
                   sortedOptions.value[sortedOptions.value.length - 1].date
  
  if (!firstDate || !lastDate) return []
  
  const start = DateTime.fromMillis(firstDate * 1000)
  const end = DateTime.fromMillis(lastDate * 1000)
  const totalDuration = end.diff(start).as('milliseconds')
  
  const markers = []
  let current = start
  
  while (current <= end) {
    const position = (current.diff(start).as('milliseconds') / totalDuration) * 100
    markers.push({
      timestamp: current.toMillis(),
      label: current.toFormat('MMM d'),
      position
    })
    
    current = current.plus({ [scale.value]: 1 })
  }
  
  return markers
})

// Calculate item position for timeline
const getItemPosition = (option: Option) => {
  if (!option.startDate && !option.date) return { display: 'none' }
  
  const firstDate = sortedOptions.value[0]?.startDate || sortedOptions.value[0]?.date
  const lastDate = sortedOptions.value[sortedOptions.value.length - 1]?.endDate || 
                   sortedOptions.value[sortedOptions.value.length - 1]?.date
  
  if (!firstDate || !lastDate) return {}
  
  const start = DateTime.fromMillis(firstDate * 1000)
  const end = DateTime.fromMillis(lastDate * 1000)
  const totalDuration = end.diff(start).as('milliseconds')
  
  const itemStart = DateTime.fromMillis((option.startDate || option.date) * 1000)
  const itemEnd = option.endDate ? DateTime.fromMillis(option.endDate * 1000) : itemStart
  
  const left = (itemStart.diff(start).as('milliseconds') / totalDuration) * 100
  const width = (itemEnd.diff(itemStart).as('milliseconds') / totalDuration) * 100
  
  return {
    left: `${left}%`,
    width: `${Math.max(width, 2)}%` // Minimum width for visibility
  }
}

// Calendar helpers
const weekDays = computed(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => 
    t('agora', day)
  ))

const currentMonthLabel = computed(() => DateTime.fromJSDate(currentMonth.value).toFormat('MMMM yyyy'))

const calendarDays = computed(() => {
  const firstDay = DateTime.fromJSDate(currentMonth.value).startOf('month')
  const lastDay = firstDay.endOf('month')
  
  const start = firstDay.startOf('week')
  const end = lastDay.endOf('week')
  
  const days = []
  let current = start
  
  while (current <= end) {
    const events = sortedOptions.value.filter(opt => {
      const optDate = opt.date ? DateTime.fromMillis(opt.date * 1000) : null
      return optDate && optDate.hasSame(current, 'day')
    })
    
    days.push({
      date: current.toISO(),
      day: current.day,
      currentMonth: current.hasSame(firstDay, 'month'),
      isToday: current.hasSame(DateTime.now(), 'day'),
      events
    })
    
    current = current.plus({ days: 1 })
  }
  
  return days
})

const previousMonth = () => {
  currentMonth.value = DateTime.fromJSDate(currentMonth.value)
    .minus({ months: 1 })
    .toJSDate()
}

const nextMonth = () => {
  currentMonth.value = DateTime.fromJSDate(currentMonth.value)
    .plus({ months: 1 })
    .toJSDate()
}

// Helper functions
const formatDate = (timestamp: number) => DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)

const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, [])

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: '#949494',
    active: '#3498db',
    completed: '#27ae60',
    cancelled: '#e74c3c'
  }
  return colors[status] || '#949494'
}
</script>

<style scoped lang="scss">
.timeline-layout {
  .timeline-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 16px;
    background: var(--color-background-dark);
    border-radius: 12px;

    .view-mode {
      display: flex;
      gap: 8px;
    }

    .filter-controls {
      width: 200px;
    }
  }

  .timeline-view {
    position: relative;
    min-height: 400px;
    padding: 20px 0;

    .timeline-header {
      margin-bottom: 20px;

      .timeline-scale {
        display: flex;
        gap: 4px;
        background: var(--color-background-dark);
        padding: 4px;
        border-radius: 8px;
        width: fit-content;

        .scale-btn {
          padding: 6px 12px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;

          &.active {
            background: var(--color-primary-element);
            color: white;
          }
        }
      }
    }

    .timeline-container {
      position: relative;
      height: 300px;
      overflow-x: auto;

      .time-markers {
        position: relative;
        height: 30px;
        border-bottom: 2px solid var(--color-border);

        .time-marker {
          position: absolute;
          transform: translateX(-50%);

          .marker-label {
            font-size: 12px;
            color: var(--color-text-lighter);
            white-space: nowrap;
          }

          &::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            width: 1px;
            height: 200px;
            background: var(--color-border);
            opacity: 0.3;
          }
        }
      }

      .timeline-items {
        position: relative;
        height: 250px;
        margin-top: 20px;

        .timeline-item-wrapper {
          position: absolute;
          height: 60px;
          padding: 0 4px;

          .timeline-item {
            height: 100%;
            background: var(--color-main-background);
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
              border-color: var(--color-primary-element);
            }

            .item-content {
              display: flex;
              align-items: center;
              gap: 8px;
              height: 100%;

              .item-icon {
                flex-shrink: 0;
                color: var(--color-text-light);
              }

              .item-details {
                flex: 1;
                min-width: 0;

                .item-title {
                  font-weight: 600;
                  font-size: 13px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                .item-dates {
                  font-size: 11px;
                  color: var(--color-text-lighter);

                  .date {
                    margin-right: 4px;
                  }
                }
              }

              .status-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                flex-shrink: 0;
              }
            }
          }
        }
      }
    }
  }

  .list-view {
    .options-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  .calendar-view {
    .calendar-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      padding: 16px;
      background: var(--color-background-dark);
      border-radius: 12px;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;

      .calendar-weekday {
        text-align: center;
        font-weight: 600;
        padding: 8px;
        background: var(--color-background-dark);
        border-radius: 8px;
        font-size: 14px;
      }

      .calendar-day {
        min-height: 100px;
        background: var(--color-main-background);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 8px;

        &.other-month {
          opacity: 0.5;
          background: var(--color-background-dark);
        }

        &.today {
          border: 2px solid var(--color-primary-element);
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .day-number {
            font-weight: 600;
            font-size: 14px;
          }

          .event-count {
            background: var(--color-primary-element);
            color: white;
            padding: 2px 6px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
          }
        }

        .day-events {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .calendar-event {
            padding: 4px 6px;
            background: var(--color-background-dark);
            border-left: 3px solid var(--color-primary-element);
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:hover {
              background: var(--color-background-hover);
            }

            .event-title {
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: var(--color-background-dark);
    border: 2px dashed var(--color-border);
    border-radius: 16px;

    svg {
      color: var(--color-text-lighter);
      margin-bottom: 20px;
    }

    h4 {
      margin: 0 0 8px 0;
      color: var(--color-main-text);
      font-size: 18px;
    }

    p {
      margin: 0;
      color: var(--color-text-lighter);
      font-style: italic;
    }
  }
}
</style>
