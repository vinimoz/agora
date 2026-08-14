<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="inquiry-timeline">
    <!-- Timeline controls -->
    <div class="timeline-controls">
      <!-- View type group -->
      <div class="control-group">
        <div class="view-mode">
          <NcButton
            :type="viewMode === 'list' ? 'primary' : 'tertiary'"
            size="small"
            @click="switchView('list')"
          >
            <template #icon>
              <component :is="Icons.ViewList" :size="16" />
            </template>
            {{ t('agora', 'List') }}
          </NcButton>
          <NcButton
            :type="viewMode === 'calendar' ? 'primary' : 'tertiary'"
            size="small"
            @click="switchView('calendar')"
          >
            <template #icon>
              <component :is="Icons.Calendar" :size="16" />
            </template>
            {{ t('agora', 'Calendar') }}
          </NcButton>
          <NcButton
            :type="viewMode === 'timeline' ? 'primary' : 'tertiary'"
            size="small"
            @click="switchView('timeline')"
          >
            <template #icon>
              <component :is="Icons.Timeline" :size="16" />
            </template>
            {{ t('agora', 'Timeline') }}
          </NcButton>
        </div>
      </div>

      <!-- Period navigation group -->
      <div class="control-group">
        <div class="period-controls">
          <NcButton size="small" @click="moveTimeline(-1)">
            <template #icon>
              <component :is="Icons.ChevronLeft" :size="16" />
            </template>
          </NcButton>

          <div class="period-selector">
            <NcButton
              size="small"
              :type="scale === 'day' ? 'primary' : 'tertiary'"
              @click="setScale('day')"
            >
              {{ t('agora', 'Day') }}
            </NcButton>
            <NcButton
              size="small"
              :type="scale === 'week' ? 'primary' : 'tertiary'"
              @click="setScale('week')"
            >
              {{ t('agora', 'Week') }}
            </NcButton>
            <NcButton
              size="small"
              :type="scale === 'month' ? 'primary' : 'tertiary'"
              @click="setScale('month')"
            >
              {{ t('agora', 'Month') }}
            </NcButton>
          </div>

          <NcButton size="small" @click="moveTimeline(1)">
            <template #icon>
              <component :is="Icons.ChevronRight" :size="16" />
            </template>
          </NcButton>

          <NcButton size="small" @click="centerOnToday">
            <template #icon>
              <component :is="Icons.CalendarToday" :size="16" />
            </template>
            {{ t('agora', 'Today') }}
          </NcButton>
        </div>
      </div>
    </div>

    <!-- FullCalendar component -->
    <FullCalendar
      v-if="calendarInitialized"
      :key="calendarKey"
      ref="calendarRef"
      :options="currentCalendarOptions"
      class="calendar-wrapper"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { DateTime } from 'luxon'
import type { Inquiry } from '../../stores/inquiry.ts'

// Icons – using the same approach as InquiryGeneralIcons
import TimelineIcon from 'vue-material-design-icons/Timeline.vue'
import ViewListIcon from 'vue-material-design-icons/ViewList.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import CalendarTodayIcon from 'vue-material-design-icons/CalendarToday.vue'

const Icons = {
  Timeline: TimelineIcon,
  ViewList: ViewListIcon,
  Calendar: CalendarIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  CalendarToday: CalendarTodayIcon,
}

const props = defineProps<{
  inquiries: Inquiry[]
}>()
const emit = defineEmits<{
  openDetail: [inquiryId: number]
}>()

// State
const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null)
const calendarInitialized = ref(true)
const calendarKey = ref(0)
const viewMode = ref<'list' | 'timeline' | 'calendar'>('timeline')
const scale = ref<'day' | 'week' | 'month'>('week')

// Helper: get status color
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: '#949494',
    waiting_approval: '#f39c12',
    active: '#3498db',
    closed: '#27ae60',
    rejected: '#e74c3c',
  }
  return colors[status] || '#949494'
}

// Convert inquiries to FullCalendar events
const events = computed(() => props.inquiries
    .map((inquiry) => {
      const start = DateTime.fromSeconds(inquiry.status.created).toJSDate()
      if (!start) return null
      let end: Date | null = null
      if (inquiry.configuration.expire && inquiry.configuration.expire > 0) {
        end = DateTime.fromSeconds(inquiry.configuration.expire).toJSDate()
      }
      return {
        id: inquiry.id.toString(),
        title: inquiry.title || t('agora', 'Untitled'),
        start,
        end,
        allDay: true,
        extendedProps: { inquiry },
        backgroundColor: getStatusColor(inquiry.status.inquiryStatus),
        borderColor: getStatusColor(inquiry.status.inquiryStatus),
        textColor: '#ffffff',
      }
    })
    .filter(Boolean))

// Compute initial view name based on mode and scale
const getViewName = () => {
  if (viewMode.value === 'list') {
    switch (scale.value) {
      case 'day': return 'listDay'
      case 'week': return 'listWeek'
      case 'month': return 'listMonth'
      default: return 'listWeek'
    }
  }
  if (viewMode.value === 'calendar') {
    switch (scale.value) {
      case 'day': return 'timeGridDay'
      case 'week': return 'timeGridWeek'
      case 'month': return 'dayGridMonth'
      default: return 'dayGridMonth'
    }
  }
  // timeline view – use timeGrid for timeline-like look without resources
  switch (scale.value) {
    case 'day': return 'timeGridDay'
    case 'week': return 'timeGridWeek'
    case 'month': return 'dayGridMonth'
    default: return 'timeGridWeek'
  }
}

// Calendar options
const currentCalendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  initialView: getViewName(),
  events: events.value,
  eventClick: (info: unknown) => {
    const inquiryId = parseInt(info.event.id)
    emit('openDetail', inquiryId)
  },
  // Event drop (if we ever allow dragging from pool – currently not used)
  droppable: false,
  // Allow selection
  selectable: false,
  height: 'auto',
  firstDay: 1,
  locale: 'en',
  headerToolbar: false,
  // Hide weekend days if preferred? Keep default.
  nowIndicator: true,
  eventTimeFormat: false, // hide time for all-day events
  allDaySlot: true,
  slotMinTime: '00:00:00',
  slotMaxTime: '24:00:00',
}))

/* Navigation methods
const moveTimeline = (direction: number) => {
  if (!calendarRef.value) return
  const api = calendarRef.value.getApi()
  // direction < 0 ? api.prev() : api.next()
  // update period text if needed (optional)
} */

const centerOnToday = () => {
  if (!calendarRef.value) return
  calendarRef.value.getApi().today()
}

const switchView = async (newView: 'list' | 'timeline' | 'calendar') => {
  if (viewMode.value === newView) return
  viewMode.value = newView
  // Force re-render by toggling initialization
  calendarInitialized.value = false
  await nextTick()
  calendarKey.value = calendarKey.value + 1
  calendarInitialized.value = true
}

const setScale = async (newScale: 'day' | 'week' | 'month') => {
  if (scale.value === newScale) return
  scale.value = newScale
  // For non-list views, we need to change view
  if (viewMode.value !== 'list') {
    calendarInitialized.value = false
    await nextTick()
    calendarKey.value = calendarKey.value + 1
    calendarInitialized.value = true
  }
}

// Watch for changes in inquiries to refetch events
watch(
  () => props.inquiries,
  () => {
    if (calendarRef.value && calendarInitialized.value) {
      try {
        calendarRef.value.getApi().refetchEvents()
      } catch (e) {
        console.warn('Error refetching events:', e)
      }
    }
  },
  { deep: true }
)

// Watch viewMode and scale to update calendar view without full re-render
watch([viewMode, scale], () => {
  if (calendarRef.value && calendarInitialized.value) {
    const api = calendarRef.value.getApi()
    const viewName = getViewName()
    try {
      api.changeView(viewName)
    } catch (e) {
      console.warn('Error changing view:', e)
    }
  }
})

onMounted(() => {
  // initial load
  if (calendarRef.value) {
    calendarRef.value.getApi().refetchEvents()
  }
})

onBeforeUnmount(() => {
  calendarInitialized.value = false
})
</script>

<style scoped lang="scss">
.inquiry-timeline {
  .timeline-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    padding: 12px 20px;
    background: var(--color-background-dark);
    border-radius: 16px;
    flex-wrap: wrap;

    .control-group {
      display: flex;
      align-items: center;
      gap: 12px;

      &:not(:last-child) {
        padding-right: 16px;
        border-right: 1px solid var(--color-border);
      }
    }

    .view-mode {
      display: flex;
      gap: 4px;
      background: var(--color-background-hover);
      padding: 4px;
      border-radius: 12px;
    }

    .period-controls {
      display: flex;
      gap: 8px;
      align-items: center;

      .period-selector {
        display: flex;
        gap: 4px;
        background: var(--color-background-hover);
        padding: 4px;
        border-radius: 12px;
      }
    }
  }

  .calendar-wrapper {
    margin-top: 20px;
    min-height: 500px;
  }
}

// Responsive tweaks
@media (max-width: 1200px) {
  .inquiry-timeline .timeline-controls {
    flex-direction: column;
    align-items: stretch;

    .control-group {
      justify-content: space-between;

      &:not(:last-child) {
        padding-right: 0;
        border-right: none;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--color-border);
      }
    }

    .view-mode,
    .period-controls {
      flex-wrap: wrap;
    }
  }
}

@media (max-width: 768px) {
  .inquiry-timeline .timeline-controls .control-group {
    flex-direction: column;
    align-items: stretch;

    .view-mode,
    .period-controls {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>

<style>
/* FullCalendar Global Styles (same as original) */
.fc {
  max-width: 100%;
}

.fc-event,
.fc-event-main,
.fc-event-main-frame {
  user-select: none;
  -webkit-user-select: none;
}

.fc-event {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85em;
  transition: all 0.2s ease;
}

.fc-event:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.fc-header-toolbar {
  display: none;
}

.fc-day-today {
  background: rgba(var(--color-primary-element-rgb), 0.1) !important;
}

.fc-highlight {
  background: rgba(var(--color-primary-element-rgb), 0.2) !important;
}

.fc-list-table {
  border-radius: 12px;
  overflow: hidden;
}

.fc-list-day-cushion {
  background: var(--color-background-dark);
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
}

.fc-list-table td {
  padding: 12px 16px;
}

.fc-list-event {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.fc-list-event:hover {
  background-color: var(--color-background-hover);
}

.fc-daygrid-day {
  transition: background-color 0.2s ease;
}

.fc-daygrid-day:hover {
  background-color: var(--color-background-hover);
}

.fc-daygrid-day-number {
  font-weight: 500;
  padding: 8px;
}

.fc-daygrid-event {
  margin: 2px 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
}

.fc-dragging {
  opacity: 0.7;
}

.fc-event-dragging {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.fc-event-resizing {
  opacity: 0.8;
}
</style>
