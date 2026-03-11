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
                    size="small"
                    @click="viewMode = 'list'"
                >
                    <template #icon>
                        <component :is="InquiryOptionIcons.List" :size="18" />
                    </template>
                    {{ t('agora', 'List') }}
                </NcButton>
                <NcButton
                    :type="viewMode === 'timeline' ? 'primary' : 'tertiary'"
                    size="small"
                    @click="viewMode = 'timeline'"
                >
                    <template #icon>
                        <component :is="InquiryOptionIcons.Timeline" :size="18" />
                    </template>
                    {{ t('agora', 'Timeline') }}
                </NcButton>
                <NcButton
                    :type="viewMode === 'calendar' ? 'primary' : 'tertiary'"
                    size="small"
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
                <div class="timeline-info">
                    <span v-if="visibleTimeRange.start">
                        {{ formatDateRange(visibleTimeRange.start, visibleTimeRange.end, scale) }}
                    </span>
                </div>
            </div>

            <div class="timeline-container" :class="`scale-${scale}`">
                <!-- Time markers header -->
                <div class="timeline-markers-header">
                    <div 
                        v-for="marker in timeMarkers" 
                        :key="marker.timestamp"
                        class="marker-cell"
                        :class="{ 'month-marker': scale === 'month' }"
                        :style="{ width: scale === 'month' ? '100px' : `${marker.width}%` }"
                    >
                        <span class="marker-label">{{ marker.label }}</span>
                    </div>
                </div>

                <!-- Timeline grid for options -->
                <div class="timeline-grid">
                    <!-- Vertical lines (background) -->
                    <div class="grid-vertical-lines">
                        <div 
                            v-for="marker in timeMarkers" 
                            :key="marker.timestamp"
                            class="grid-line"
                            :class="{ 'month-line': scale === 'month' }"
                            :style="{ left: scale === 'month' ? `${marker.position}px` : `${marker.position}%` }"
                        ></div>
                    </div>

                    <!-- Option rows - like Kanban cards -->
                    <div 
                        v-for="(option, rowIndex) in visibleProcessOptions" 
                        :key="option.id"
                        class="timeline-row"
                        :class="{ 'alternate': rowIndex % 2 === 1 }"
                    >
                        <!-- Option card positioned in the grid - now smaller like Kanban -->
                        <div 
                            class="timeline-item"
                            :class="`type-${option.type}`"
                            :style="getItemPosition(option)"
                            @click="$emit('openDetail', option)"
                        >
                            <div class="item-content">
                                <div class="item-icon">
                                    <component :is="getOptionTypeIcon(option.type)" :size="14" />
                                </div>
                                <div class="item-details">
                                    <div class="item-title">{{ option.title }}</div>
                                    <div class="item-dates">
                                        <span class="date">
                                            {{ formatDateTime(option.status.created, scale) }}
                                        </span>
                                    </div>
                                </div>
                                <div 
                                    v-if="option.status?.optionStatus"
                                    class="status-indicator"
                                    :style="{ backgroundColor: getStatusColor(option.status.optionStatus) }"
                                    :title="option.status.optionStatus"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <!-- List view -->
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
                                        <span class="event-title">{{ event.title }}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <!-- Empty states -->
            <div v-if="viewMode === 'list' && sortedOptions.length === 0" class="empty-state">
                <component :is="InquiryOptionIcons.Timeline" :size="48" />
                <h4>{{ t('agora', 'No items yet') }}</h4>
                <p>{{ t('agora', 'Add milestones, events or deadlines') }}</p>
            </div>
            <div v-else-if="viewMode === 'timeline' && processOptionsForTimeline.length === 0" class="empty-state">
                <component :is="InquiryOptionIcons.Timeline" :size="48" />
                <h4>{{ t('agora', 'No timeline items yet') }}</h4>
                <p>{{ t('agora', 'Add milestones, events or deadlines') }}</p>
            </div>
            <div v-else-if="viewMode === 'calendar' && processOptionsForCalendar.length === 0" class="empty-state">
                <component :is="InquiryOptionIcons.Calendar" :size="48" />
                <h4>{{ t('agora', 'No calendar items yet') }}</h4>
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
import { getOptionTypeIconComponent, getOptionTypeFamily } from '../../../helpers/modules/InquiryOptionHelper'
import type { Option } from '../../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'

const props = defineProps<{
    options: Option[]
    inquiryId: number
}>()

const optionsStore = useOptionsStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
    'openDetail': [option: Option]
}>()

// View state
const viewMode = ref<'list' | 'timeline' | 'calendar'>('timeline')
const scale = ref<'day' | 'week' | 'month'>('week')
const dateFilter = ref('')
const currentMonth = ref(new Date())

// Get process family options only
const processOptions = computed(() => props.options.filter(opt => {
        const family = getOptionTypeFamily(opt.type, optionsStore.getOptionTypesArray)
        return family === 'process'
    }))

const sortedOptions = computed(() => {
    let filtered = [...props.options]

    // Apply date filter
    if (dateFilter.value) {
        const filterDate = DateTime.fromISO(dateFilter.value)
        filtered = filtered.filter(opt => {
            const optDate = opt.status?.created ? DateTime.fromMillis(opt.status.created * 1000) : null
            return optDate && optDate.hasSame(filterDate, 'day')
        })
    }

    // Sort by created date
    return filtered.sort((a, b) => {
        const dateA = a.status?.created || 0
        const dateB = b.status?.created || 0
        return dateA - dateB
    })
})

// FOR TIMELINE VIEW: Process options with valid dates
const processOptionsForTimeline = computed(() => processOptions.value
        .filter(opt => opt.status?.created && opt.status.created > 0)
        .sort((a, b) => (a.status?.created || 0) - (b.status?.created || 0)))

// FOR CALENDAR VIEW: Process options (keep all, calendar will filter by date)
const processOptionsForCalendar = computed(() => processOptions.value.filter(opt => opt.status?.created && opt.status.created > 0))

// Get the visible time range based on scale and all items
const visibleTimeRange = computed(() => {
    const items = processOptionsForTimeline.value
    if (items.length === 0) {
        const now = DateTime.now()
        return {
            start: now.startOf(scale.value),
            end: now.endOf(scale.value)
        }
    }

    // Use the most recent item as the target date
    const sortedItems = [...items].sort((a, b) => 
        (b.status.created || 0) - (a.status.created || 0)
    )
    const targetDate = DateTime.fromMillis(sortedItems[0].status.created * 1000)

    switch (scale.value) {
        case 'day':
            return {
                start: targetDate.startOf('day'),
                end: targetDate.endOf('day')
            }
            
        case 'week':
            // Show the week containing the most recent item
            return {
                start: targetDate.startOf('week'), // Monday of that week
                end: targetDate.endOf('week')      // Sunday of that week
            }
            
        case 'month':
            return {
                start: targetDate.startOf('month'),
                end: targetDate.endOf('month')
            }
    }
    return {
        start,
        end
    } 
})

// Get visible options (those within the current range)
const visibleProcessOptions = computed(() => {
    const { start, end } = visibleTimeRange.value
    return processOptionsForTimeline.value.filter(opt => {
        const itemTime = DateTime.fromMillis(opt.status.created * 1000)
        return itemTime >= start && itemTime <= end
    })
})


// Generate time markers based on visible range and scale
const timeMarkers = computed(() => {
    const { start, end } = visibleTimeRange.value
    
    const markers = []
    let current = start.startOf(scale.value)
    let interval
    let totalDuration
    
    if (scale.value === 'month') {
        interval = { days: 1 }
        let position = 0
        const markerWidth = 100 // Slightly smaller: 100px per day
        
        while (current <= end) {
            markers.push({
                timestamp: current.toMillis(),
                label: current.toFormat('d MMM'),
                position,
                width: markerWidth
            })
            position += markerWidth
            current = current.plus(interval)
        }
    } else {
        // For DAY and WEEK - use percentage-based positioning
        totalDuration = end.diff(start).as('milliseconds')
        
        switch (scale.value) {
            case 'day':
                interval = { hours: 1 }
                break
            case 'week':
                interval = { days: 1 }
                break
        }
        
        while (current <= end) {
            const position = (current.diff(start).as('milliseconds') / totalDuration) * 100
            
            const nextCurrent = current.plus(interval)
            const nextPosition = (nextCurrent.diff(start).as('milliseconds') / totalDuration) * 100
            const width = nextPosition - position
            
            let label = ''
            switch (scale.value) {
                case 'day':
                    label = current.toFormat('HH:mm')
                    break
                case 'week':
                    label = current.toFormat('EEE d')
                    break
            }
            
            markers.push({
                timestamp: current.toMillis(),
                label,
                position: Math.min(100, Math.max(0, position)),
                width: Math.min(100 - position, width)
            })
            
            current = current.plus(interval)
        }
    }
    
    return markers
})

// Calculate item position for timeline based on visible range
const getItemPosition = (option: Option) => {
    if (!option.status?.created || option.status.created === 0) return { display: 'none' }
    
    const { start, end } = visibleTimeRange.value
    const itemTime = DateTime.fromMillis(option.status.created * 1000)
    
    // Check if item is in visible range
    if (itemTime < start || itemTime > end) {
        return { display: 'none' }
    }
    
    if (scale.value === 'month') {
        // Pixel-based positioning for month view - exact day column
        const daysDiff = Math.floor(itemTime.diff(start, 'days').days)
        // Center the card in the day column (100px per day)
        const left = daysDiff * 100 + 50
        
        return {
            left: `${left}px`,
            transform: 'translateX(-50%)',
            width: '90px', // Smaller width to fit in one day column
        }
    } 
        // Percentage-based positioning for day/week views
        const totalDuration = end.diff(start).as('milliseconds')
        const itemOffset = itemTime.diff(start).as('milliseconds')
        const left = (itemOffset / totalDuration) * 100
        
        return {
            left: `${left}%`,
            transform: 'translateX(-50%)',
            width: '140px', // Reasonable width for day/week views
        }
    
}

// Format date range for display
const formatDateRange = (start: DateTime, end: DateTime, scale: string) => {
    switch (scale) {
        case 'day':
            return start.toFormat('DDD')
        case 'week':
            return `${start.toFormat('MMM d')} - ${end.toFormat('MMM d, yyyy')}`
        case 'month':
            return start.toFormat('MMMM yyyy')
        default:
            return ''
    }
}

// Format date/time based on scale
const formatDateTime = (timestamp: number, scale: string) => {
    if (!timestamp || timestamp === 0) return ''
    const dt = DateTime.fromMillis(timestamp * 1000)
    switch (scale) {
        case 'day':
            return dt.toFormat('HH:mm')
        case 'week':
            return dt.toFormat('EEE HH:mm')
        case 'month':
            return dt.toFormat('MMM d, HH:mm')
        default:
            return dt.toFormat('HH:mm')
    }
}

// Calendar days
const calendarDays = computed(() => {
    const firstDay = DateTime.fromJSDate(currentMonth.value).startOf('month')
    const lastDay = firstDay.endOf('month')

    const start = firstDay.startOf('week')
    const end = lastDay.endOf('week')

    const days = []
    let current = start
    const processOpts = processOptionsForCalendar.value

    while (current <= end) {
        const events = processOpts.filter(opt => {
            if (!opt.status?.created) return false
            const optDate = DateTime.fromMillis(opt.status.created * 1000)
            return optDate.hasSame(current, 'day')
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

// Calendar helpers
const weekDays = computed(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days.map(day => t('agora', day))
})

const currentMonthLabel = computed(() =>
    DateTime.fromJSDate(currentMonth.value).toFormat('MMMM yyyy')
)

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


const getOptionTypeIcon = (type: string) =>
    getOptionTypeIconComponent(type, optionsStore.getOptionTypesArray)

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
            display: flex;
            justify-content: space-between;
            align-items: center;
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

            .timeline-info {
                color: var(--color-text-lighter);
                font-size: 14px;
                font-weight: 500;
            }
        }

        .timeline-container {
            border: 1px solid var(--color-border);
            border-radius: 12px;
            background: var(--color-main-background);
            overflow-x: auto;

            &.scale-month {
                .timeline-markers-header {
                    width: fit-content;
                    min-width: 100%;

                    .marker-cell.month-marker {
                        flex-shrink: 0;
                        width: 120px;
                        border-right: 1px solid var(--color-border);

                        .marker-label {
                            white-space: nowrap;
                        }
                    }
                }

                .timeline-grid {
                    width: fit-content;
                    min-width: 100%;

                    .grid-vertical-lines {
                        .grid-line.month-line {
                            width: 1px;
                            background: var(--color-border);
                            opacity: 0.2;

                            &:first-child, &:last-child {
                                opacity: 0.5;
                            }
                        }
                    }

                    .timeline-row {
                        width: fit-content;
                        min-width: 100%;
                    }
                }
            }

            &.scale-day, &.scale-week {
                .timeline-markers-header {
                    display: flex;
                    width: 100%;
                }
            }

            .timeline-markers-header {
                display: flex;
                height: 40px;
                background: var(--color-background-dark);
                border-bottom: 2px solid var(--color-border);
                position: sticky;
                top: 0;
                z-index: 20;

                .marker-cell {
                    flex-shrink: 0;
                    position: relative;
                    border-right: 1px solid var(--color-border);

                    &:last-child {
                        border-right: none;
                    }

                    .marker-label {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 11px;
                        color: var(--color-text-lighter);
                        white-space: nowrap;
                        background: var(--color-background-dark);
                        padding: 2px 4px;
                        border-radius: 4px;
                        z-index: 5;
                    }
                }
            }

            .timeline-grid {
                position: relative;
                min-height: 300px;

                .grid-vertical-lines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;

                    .grid-line {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        width: 1px;
                        background: var(--color-border);
                        opacity: 0.2;

                        &:first-child, &:last-child {
                            opacity: 0.5;
                        }
                    }
                }

                .timeline-row {
                    position: relative;
                    height: 80px;
                    border-bottom: 1px solid var(--color-border);

                    &:last-child {
                        border-bottom: none;
                    }

                    &.alternate {
                        background: var(--color-background-dark);
                    }

                    .timeline-item {
                        position: absolute;
                        top: 10px;
                        width: 220px;
                        height: 60px;
                        background: var(--color-main-background);
                        border: 2px solid var(--color-primary-element);
                        border-radius: 8px;
                        padding: 8px 12px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        z-index: 10;

                        &:hover {
                            transform: translateY(-2px) translateX(-50%);
                            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                            border-color: var(--color-primary-element-light);
                            background: var(--color-background-hover);
                            z-index: 30;
                        }

                        .item-content {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            height: 100%;

                            .item-icon {
                                flex-shrink: 0;
                                color: var(--color-primary-element);
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
                                    color: var(--color-main-text);
                                }

                                .item-dates {
                                    font-size: 11px;
                                    color: var(--color-primary-element);
                                    font-weight: 500;
                                }
                            }

                            .status-indicator {
                                width: 8px;
                                height: 8px;
                                border-radius: 50%;
                                flex-shrink: 0;
                                box-shadow: 0 0 0 2px var(--color-main-background);
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
                color: var(--color-main-text);
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
                color: var(--color-main-text);
            }

            .calendar-day {
                min-height: 100px;
                background: var(--color-main-background);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 8px;
                transition: all 0.2s ease;

                &.other-month {
                    opacity: 0.5;
                    background: var(--color-background-dark);
                }

                &.today {
                    border: 2px solid var(--color-primary-element);
                    box-shadow: 0 0 0 1px var(--color-primary-element-light);
                }

                &:hover {
                    border-color: var(--color-primary-element);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .day-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;

                    .day-number {
                        font-weight: 600;
                        font-size: 14px;
                        color: var(--color-main-text);
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
                    max-height: 80px;
                    overflow-y: auto;

                    .calendar-event {
                        padding: 4px 6px;
                        background: var(--color-background-dark);
                        border-left: 3px solid var(--color-primary-element);
                        border-radius: 4px;
                        font-size: 11px;
                        cursor: pointer;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: all 0.2s ease;

                        &:hover {
                            background: var(--color-background-hover);
                            transform: translateX(2px);
                            border-left-width: 4px;
                        }

                        .event-title {
                            font-weight: 500;
                            color: var(--color-main-text);
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
