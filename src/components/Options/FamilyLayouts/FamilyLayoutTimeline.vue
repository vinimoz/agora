<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
	<div class="timeline-layout">
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
							<component :is="InquiryOptionIcons.List" :size="16" />
						</template>
						{{ t('agora', 'List') }}
					</NcButton>
					<NcButton
						:type="viewMode === 'calendar' ? 'primary' : 'tertiary'"
						size="small"
						@click="switchView('calendar')"
					>
						<template #icon>
							<component :is="InquiryOptionIcons.Calendar" :size="16" />
						</template>
						{{ t('agora', 'Calendar') }}
					</NcButton>
					<NcButton
						:type="viewMode === 'timeline' ? 'primary' : 'tertiary'"
						size="small"
						@click="switchView('timeline')"
					>
						<template #icon>
							<component :is="InquiryOptionIcons.Timeline" :size="16" />
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
							<component :is="InquiryOptionIcons.ChevronLeft" :size="16" />
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
						<NcButton 
							size="small"
							:type="scale === 'year' ? 'primary' : 'tertiary'"
							@click="setScale('year')"
						>
							{{ t('agora', 'Year') }}
						</NcButton>
					</div>
					
					<NcButton size="small" @click="moveTimeline(1)">
						<template #icon>
							<component :is="InquiryOptionIcons.ChevronRight" :size="16" />
						</template>
					</NcButton>
					
					<NcButton size="small" @click="centerOnToday">
						<template #icon>
							<component :is="InquiryOptionIcons.CalendarToday" :size="16" />
						</template>
						{{ t('agora', 'Today') }}
					</NcButton>
				</div>
			</div>

			<!-- Actions group -->
			<div class="control-group">
				<div class="filter-controls">
					<NcTextField
						:value="dateFilter"
						:label="t('agora', 'Filter by date')"
						type="date"
						@update:value="dateFilter = $event"
					/>
				</div>
				
				<NcButton
					type="primary"
					class="add-timeline-btn"
					@click="showAddModal = true"
				>
					<template #icon>
						<component :is="InquiryOptionIcons.Plus" :size="16" />
					</template>
					{{ t('agora', 'Add to timeline') }}
				</NcButton>
			</div>
		</div>

		<!-- Draggable options pool -->
		<div v-if="showDraggablePool" class="draggable-pool">
			<h4>{{ t('agora', 'Draggable options') }}</h4>
			<div class="draggable-items">
				<div 
					v-for="option in options" 
					:key="option.id"
					class="draggable-item"
					:data-event="JSON.stringify({
						title: option.title || option.label,
						duration: '02:00',
                        extendedProps: { optionId: option.id, option }
                        })"
                    >
                    <component :is="getOptionTypeIcon(option.type)" :size="16" />
                    <span>{{ option.title || option.label }}</span>
                </div>
            </div>
        </div>

        <NcPopover
                v-if="contextMenu.visible"
                :show="contextMenu.visible"
                :style="popoverStyle"
                @close="contextMenu.visible = false"
                >
                <NcActions>
                <NcActionButton @click="handleContextMenuDelete">
                {{ t('agora', 'Delete') }}
                </NcActionButton>
        <NcActionButton @click="handleRemoveFromView">
        {{ t('agora', 'Remove from timeline') }}
        </NcActionButton>
                </NcActions>
        </NcPopover>

        <DeleteConfirmationDialog
                v-model:visible="showDeleteDialog"
                :option-title="selectedOption?.title || selectedOption?.label || ''"
                :is-imported="selectedOption ? isImportedFromView(selectedOption,family.key) : false"
                :view-type="'timeline'"
		:option="selectedOption"
                @confirm="handleConfirmDelete"
                @remove-from-view="handleRemoveFromView"
                />
        <AddOptionToFamily
                v-if="showAddModal"
                family-type="timeline"
                :inquiry-id="inquiryId"
                @close="showAddModal = false"
                @success="handleAddSuccess"
                />

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
import NcTextField from '@nextcloud/vue/components/NcTextField'
import { DateTime } from 'luxon'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import { 
  filterOptionsByLayout,
  getTimelineStartDate,
  isImportedFromView,
  getTimelineEndDate,
  getOptionTypeIconComponent
} from '../../../helpers/modules/InquiryOptionHelper'
import type { Option, InquiryOptionType, OptionFamily } from '../../../Types/index.ts'
import AddOptionToFamily from '../../Modals/AddOptionToFamily.vue'
import NcPopover from '@nextcloud/vue/components/NcPopover'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import scrollGridPlugin from '@fullcalendar/scrollgrid'
// import adaptivePlugin from '@fullcalendar/adaptive'
import type { EventClickArg, DropArg } from '@fullcalendar/core/index.js'
import DeleteConfirmationDialog from '../../Modals/DeleteConfirmationDialog.vue'

// Premium imports
import resourcePlugin from '@fullcalendar/resource'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

// Props
const props = defineProps<{
  options: Option[]
  inquiryId: number
  optionTypes: InquiryOptionType[]
  family: OptionFamily
  optionsByInquiry?: Option[]
  showDraggablePool?: boolean
  // draggableOptions?: Option[]
}>()

// Emit
const emit = defineEmits<{
  openDetail: [option: Option]
  'update:options': []
  eventDrop: [eventData: unknown]
  dateSelect: [dateInfo: unknown]
  eventReceive: [eventInfo: unknown]
  deleteOption: [optionId: number]
  removeFromTimeline: [optionId: number, updatedForceLayouts: string[]]
}>()

// State refs
const calendarRef = ref<unknown>(null)
const calendarInitialized = ref(true)
const calendarKey = ref(0)
let draggableInstance: unknown = null
const showAddModal = ref(false)
const currentPeriodText = ref('')
const viewMode = ref<'list' | 'timeline' | 'calendar' | 'resourceDay' | 'resourceWeek'>('timeline')
const scale = ref<'day' | 'week' | 'month' | 'year'>('week')
const dateFilter = ref('')
const showDeleteDialog = ref(false)
const selectedOption = ref<Option | null>(null)

// Helper functions
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: '#949494',
    active: '#3498db',
    completed: '#27ae60',
    cancelled: '#e74c3c',
    pending: '#f39c12',
    approved: '#2ecc71'
  }
  return colors[status] || '#949494'
}

let pendingCallbacks: {
  onDelete: () => void
  onRemoveFromView: () => void
} | null = null

const handleEventClick = (info: EventClickArg) => {
  // console.log('Event title:', info.event.title)
  
  // Always prevent default to stop browser context menu
  info.jsEvent.preventDefault()
  info.jsEvent.stopPropagation()
  
  // Check for right click (button === 2)
  if (info.jsEvent.button === 2) {
    // console.log('Right click detected - showing context menu')
    
    const option = info.event.extendedProps?.option
    if (option) {
      // Show the NcPopover context menu
      contextMenu.value = {
        visible: true,
        x: info.jsEvent.clientX,
        y: info.jsEvent.clientY,
        event: info.event
      }
    }
  } 
  // Left click (button === 0)
  else if (info.jsEvent.button === 0) {
     // console.log('Left click detected - opening detail')
    emit('openDetail', info.event.extendedProps.option)
  }
}


// Add a global context menu prevention for the calendar container

const preventGlobalContextMenu = (e: MouseEvent) => {
  // Only prevent on event elements, but let eventClick do the main work
  const target = e.target as HTMLElement
  if (target.closest?.('.fc-event, .fc-list-event, .fc-daygrid-event, .fc-timegrid-event')) {
    e.preventDefault()
    e.stopPropagation()
  }
}


const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  event: null as unknown
})

const popoverStyle = computed(() => ({
  position: 'fixed',
  left: `${contextMenu.value.x  }px`,
  top: `${contextMenu.value.y  }px`,
  zIndex: 9999
}))


// Add these handler functions
const handleConfirmDelete = () => {
  if (pendingCallbacks?.onDelete) {
    pendingCallbacks.onDelete()
    showSuccess(t('agora', 'Option deleted successfully'))
  }
  pendingCallbacks = null
  selectedOption.value = null
}

const handleRemoveFromView = () => {
  if (pendingCallbacks?.onRemoveFromView) {
    pendingCallbacks.onRemoveFromView()
    showSuccess(t('agora', 'Option removed from timeline'))
  }
  pendingCallbacks = null
  selectedOption.value = null
}


const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, props.optionTypes)

const updateCurrentPeriodText = () => {
  if (!calendarRef.value) return
  const api = calendarRef.value.getApi()
  const currentDate = api.getDate()
  currentPeriodText.value = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
}

// Computed properties
const timelineOptions = computed(() => {
  const sourceOptions = props.optionsByInquiry || props.options
  return filterOptionsByLayout(
    sourceOptions,
    'timeline',
    props.optionTypes,
    props.family.key
  )
})

const processOptions = computed(() => timelineOptions.value.filter(opt => getTimelineStartDate(opt) !== null))

const resources = computed(() => processOptions.value.map(opt => ({
    id: opt.id.toString(),
    title: opt.title || opt.label || 'Untitled',
    eventColor: getStatusColor(opt.status?.optionStatus || 'draft')
  })))

const events = computed(() => processOptions.value
    .map(opt => {
      const start = getTimelineStartDate(opt)
      if (!start) return null

      if (dateFilter.value) {
        const filterDate = DateTime.fromISO(dateFilter.value).toLocal()
        const startDateObj = DateTime.fromJSDate(start)
        if (!startDateObj.hasSame(filterDate, 'day')) return null
      }

      const end = getTimelineEndDate(opt)
      let endDateObj: Date | undefined
      if (end) {
        endDateObj = DateTime.fromJSDate(end).plus({ days: 1 }).toJSDate()
      }

      return {
        id: opt.id.toString(),
        resourceId: opt.id.toString(),
        title: opt.title || opt.label || 'Untitled',
        start,
        end: endDateObj,
        allDay: true,
        extendedProps: { option: opt },
        backgroundColor: getStatusColor(opt.status?.optionStatus || 'draft'),
        borderColor: getStatusColor(opt.status?.optionStatus || 'draft'),
        textColor: '#ffffff'
      }
    })
    .filter(Boolean))

// Event Handlers
const handleExternalDrop = async (dropInfo: DropArg) => {
  const eventData = dropInfo.draggedEl?.getAttribute('data-event')
  if (eventData) {
    try {
      const parsedEvent = JSON.parse(eventData)
      const startDate = dropInfo.date
      const endDate = new Date(startDate)
      endDate.setHours(endDate.getHours() + 2)

      const newEvent = {
        title: parsedEvent.title,
        start: startDate,
        end: endDate,
        allDay: dropInfo.allDay,
        resourceId: dropInfo.resource?.id,
        extendedProps: {
          ...parsedEvent.extendedProps,
          created: Date.now()
        }
      }

      emit('eventDrop', newEvent)
      showSuccess(t('agora', 'Event added to timeline'))

      if (calendarRef.value) {
        calendarRef.value.getApi().refetchEvents()
      }
    } catch (e) {
      console.error('Error parsing event data:', e)
      showError(t('agora', 'Failed to add event'))
    }
  }
}

const handleEventDrop = async (dropInfo: unknown) => {
  const event = dropInfo.event
  const optionId = parseInt(event.id)
  const option = timelineOptions.value.find((opt: Option) => opt.id === optionId)

  if (option) {
    emit('eventDrop', {
      optionId,
      newStart: event.start,
      newEnd: event.end,
      newResourceId: event.resource?.id,
      option
    })
    showSuccess(t('agora', 'Event updated'))
  }
}

const handleEventResize = async (resizeInfo: unknown) => {
  const event = resizeInfo.event
  const optionId = parseInt(event.id)
  const option = timelineOptions.value.find((opt: Option) => opt.id === optionId)

  if (option) {
    emit('eventDrop', {
      optionId,
      newStart: event.start,
      newEnd: event.end,
      option,
      resized: true
    })
    showSuccess(t('agora', 'Event duration updated'))
  }
}

const handleDateSelect = (selectInfo: unknown) => {
  emit('dateSelect', {
    start: selectInfo.start,
    end: selectInfo.end,
    allDay: selectInfo.allDay,
    resource: selectInfo.resource
  })
}

// View configurations
const listViewOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  headerToolbar: false,
  initialView: scale.value === 'day' ? 'listDay' : scale.value === 'week' ? 'listWeek' : 'listMonth',
  views: {
    listDay: { type: 'list', duration: { days: 1 } },
    listWeek: { type: 'list', duration: { days: 7 } },
    listMonth: { type: 'list', duration: { months: 1 } }
  },
  events: events.value,
  eventClick: handleEventClick,
  height: 'auto',
  firstDay: 1,
  locale: 'en',
  droppable: true,
  drop: handleExternalDrop,
  datesSet: () => {
    updateCurrentPeriodText()
  }
}))

const calendarViewOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin],
  headerToolbar: false,
  initialView: scale.value === 'day' ? 'timeGridDay' : scale.value === 'week' ? 'timeGridWeek' : 'dayGridMonth',
  views: {
    timeGridDay: { type: 'timeGrid', duration: { days: 1 } },
    timeGridWeek: { type: 'timeGrid', duration: { days: 7 } },
    dayGridMonth: { type: 'dayGrid', duration: { months: 1 } }
  },
  events: events.value,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
  eventResize: handleEventResize,
  droppable: true,
  drop: handleExternalDrop,
  selectable: true,
  select: handleDateSelect,
  height: 'auto',
  firstDay: 1,
  locale: 'en',
  datesSet: () => {
    updateCurrentPeriodText()
  }
}))

const resourceDayViewOptions = computed(() => ({
  plugins: [resourcePlugin, resourceTimeGridPlugin, interactionPlugin],
  schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
  headerToolbar: false,
  initialView: 'resourceTimeGridDay',
  resources: resources.value,
  events: events.value,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
  eventResize: handleEventResize,
  droppable: true,
  drop: handleExternalDrop,
  selectable: true,
  select: handleDateSelect,
  height: 'auto',
  firstDay: 1,
  locale: 'en',
  datesSet: () => {
    updateCurrentPeriodText()
  }
}))

const handleContextMenuDelete = () => {
  // console.log('Delete clicked from context menu') // Debug log
  if (contextMenu.value.event) {
    const option = contextMenu.value.event.extendedProps?.option
    if (option) {
      selectedOption.value = option
      pendingCallbacks = {
        onDelete: () => {
          emit('deleteOption', option.id)
          if (calendarRef.value) {
            setTimeout(() => {
              (calendarRef.value as unknown).getApi().refetchEvents()
            }, 100)
          }
        },
        onRemoveFromView: () => {
          let currentLayouts = option.miscFields?.force_layouts || []
          if (typeof currentLayouts === 'string') {
            try {
              currentLayouts = JSON.parse(currentLayouts)
            } catch {
              currentLayouts = []
            }
          }
          const updatedLayouts = currentLayouts.filter((l: string) => l !== 'timeline')
          emit('removeFromTimeline', option.id, updatedLayouts)
          if (calendarRef.value) {
            setTimeout(() => {
              (calendarRef.value as unknown).getApi().refetchEvents()
            }, 100)
          }
        }
      }
      showDeleteDialog.value = true
    }
  }
  contextMenu.value.visible = false
}


// Update onMounted to remove the calendar wrapper specific listener (not needed anymore)
onMounted(() => {
  setTimeout(updateCurrentPeriodText, 200)
  if (props.showDraggablePool) {
    initDraggable()
  }
  // Keep global prevention but simplified
  document.addEventListener('contextmenu', preventGlobalContextMenu, true)
})

const timelineViewOptions = computed(() => {
  const getViewName = () => {
    switch (scale.value) {
      case 'day': return 'resourceTimelineDay'
      case 'week': return 'resourceTimelineWeek'
      case 'month': return 'resourceTimelineMonth'
      case 'year': return 'resourceTimelineYear'
      default: return 'resourceTimelineWeek'
    }
  }

  return {
    plugins: [resourcePlugin, resourceTimelinePlugin, interactionPlugin, scrollGridPlugin],
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    headerToolbar: false,
    initialView: getViewName(),
    views: {
      resourceTimelineDay: { type: 'resourceTimeline', duration: { days: 1 } },
      resourceTimelineWeek: { type: 'resourceTimeline', duration: { days: 7 } },
      resourceTimelineMonth: { type: 'resourceTimeline', duration: { months: 1 } },
      resourceTimelineYear: { type: 'resourceTimeline', duration: { years: 1 } }
    },
    resources: resources.value,
    events: events.value,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
    eventResize: handleEventResize,
    droppable: true,
    drop: handleExternalDrop,
    selectable: true,
    select: handleDateSelect,
    height: 'auto',
    firstDay: 1,
    locale: 'en',
    resourceAreaWidth: '200px',
    datesSet: () => {
      updateCurrentPeriodText()
    }
  }
})

const resourceWeekViewOptions = computed(() => ({
  plugins: [resourcePlugin, resourceTimeGridPlugin, interactionPlugin],
  schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
  headerToolbar: false,
  initialView: 'resourceTimeGridWeek',
  resources: resources.value,
  events: events.value,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
  eventResize: handleEventResize,
  droppable: true,
  drop: handleExternalDrop,
  selectable: true,
  select: handleDateSelect,
  height: 'auto',
  firstDay: 1,
  locale: 'en',
  datesSet: () => {
    updateCurrentPeriodText()
  }
}))
    

const currentCalendarOptions = computed(() => {
  switch (viewMode.value) {
    case 'list': return listViewOptions.value
    case 'calendar': return calendarViewOptions.value
    case 'resourceDay': return resourceDayViewOptions.value
    case 'resourceWeek': return resourceWeekViewOptions.value
    default: return timelineViewOptions.value
  }
})

// Navigation methods
const switchView = async (newView: 'list' | 'timeline' | 'calendar' | 'resourceDay' | 'resourceWeek') => {
  if (viewMode.value === newView) return

  calendarInitialized.value = false
  await new Promise(resolve => setTimeout(resolve, 50))
  viewMode.value = newView
  calendarKey.value = calendarKey.value + 1
  calendarInitialized.value = true
}

const setScale = async (newScale: 'day' | 'week' | 'month' | 'year') => {
  if (scale.value === newScale) return
  scale.value = newScale

  if (viewMode.value !== 'resourceDay' && viewMode.value !== 'resourceWeek') {
    calendarInitialized.value = false
    await new Promise(resolve => setTimeout(resolve, 50))
    calendarKey.value = calendarKey.value + 1
    calendarInitialized.value = true
  }
}

const moveTimeline = (direction: number) => {
  if (!calendarRef.value) return
  const api = calendarRef.value.getApi()
  if (direction < 0) {
    api.prev()
  } else {
    api.next()
  }
  setTimeout(updateCurrentPeriodText, 100)
}

const centerOnToday = () => {
  if (!calendarRef.value) return
  const api = calendarRef.value.getApi()
  api.today()
  setTimeout(updateCurrentPeriodText, 100)
}

const handleAddSuccess = () => {
  emit('update:options')
  calendarInitialized.value = false
  setTimeout(() => {
    calendarKey.value = calendarKey.value + 1 
    calendarInitialized.value = true
  }, 50)
}

const initDraggable = () => {
  if (!props.showDraggablePool) return

  nextTick(() => {
    const containerEl = document.querySelector('.draggable-items')
    if (containerEl && !draggableInstance) {
      draggableInstance = new Draggable(containerEl, {
        itemSelector: '.draggable-item',
        eventData: (eventEl: HTMLElement) => {
          const eventAttr = eventEl.getAttribute('data-event')
          if (eventAttr) {
            return JSON.parse(eventAttr)
          }
          return {
            title: eventEl.innerText,
            duration: '02:00'
          }
        }
      })
    }
  })
}

const destroyDraggable = () => {
  if (draggableInstance) {
    draggableInstance.destroy()
    draggableInstance = null
  }
}

// Watchers
watch(events, () => {
  if (calendarRef.value && calendarInitialized.value) {
    try {
      calendarRef.value.getApi().refetchEvents()
    } catch (e) {
      console.warn('Error refreshing events:', e)
    }
  }
}, { deep: true })

watch(() => props.showDraggablePool, (show) => {
  if (show) {
    initDraggable()
  } else {
    destroyDraggable()
  }
})

// Lifecycle
// Update the onMounted to use event listener properly
onMounted(() => {
  setTimeout(updateCurrentPeriodText, 200)
  if (props.showDraggablePool) {
    initDraggable()
  }
  // Add event listener with capture phase to ensure we catch it early
  document.addEventListener('contextmenu', preventGlobalContextMenu, true)

  // Also add a specific listener for the calendar container
  const calendarEl = document.querySelector('.calendar-wrapper')
  if (calendarEl) {
    calendarEl.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement
      if (target.closest?.('.fc-event')) {
        e.preventDefault()
        e.stopPropagation()
      }
    })
  }
})

onBeforeUnmount(() => {
  calendarInitialized.value = false
  destroyDraggable()
  // Remove global context menu prevention
  document.removeEventListener('contextmenu', preventGlobalContextMenu)
})

defineExpose({ moveTimeline, centerOnToday, switchView, setScale })
</script>
<style scoped lang="scss">
.timeline-layout {
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

        .filter-controls {
            width: 180px;
        }

        .add-timeline-btn {
            background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
            border: none;
            color: white;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 20px;
            transition: all 0.2s ease;
            white-space: nowrap;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
            }
        }
    }

    .draggable-pool {
        margin-bottom: 20px;
        padding: 16px;
        background: var(--color-background-dark);
        border-radius: 12px;
        border: 2px dashed var(--color-border);

        h4 {
            margin: 0 0 12px 0;
            font-size: 14px;
            font-weight: 600;
        }

        .draggable-items {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .draggable-item {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: var(--color-main-background);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                cursor: grab;
                transition: all 0.2s ease;
                font-size: 13px;

                &:active {
                    cursor: grabbing;
                }

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    border-color: var(--color-primary-element);
                }

                svg {
                    color: var(--color-primary-element);
                }
            }
        }
    }

    .calendar-wrapper {
        margin-top: 20px;
        min-height: 500px;
    }
}

                                    // Responsive
                                @media (max-width: 1200px) {
                                        .timeline-layout .timeline-controls {
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

                                            .view-mode, .period-controls {
                                                flex-wrap: wrap;
                                            }
                                        }
                                    }

                                    @media (max-width: 768px) {
                                        .timeline-layout .timeline-controls {
                                            .control-group {
                                                flex-direction: column;
                                                align-items: stretch;

                                                .view-mode, .period-controls, .filter-controls {
                                                    width: 100%;
                                                    justify-content: center;
                                                }
                                            }
                                        }
                                    }
</style>

<style>
/* FullCalendar Global Styles */
.fc {
    max-width: 100%;
}

/* Prevent default context menu on events globally */
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

/* Resource Views */
.fc-resource-area td {
    padding: 12px 8px;
    font-weight: 500;
}

.fc-resource-cell {
    font-weight: 600;
}

/* Timeline View */
.fc-timeline-event {
    border-radius: 6px;
    padding: 4px 8px;
}

.fc-timeline .fc-resource-area tr:hover {
    background: var(--color-background-hover);
}

/* List View */
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

/* Calendar View */
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

/* Drag and Drop */
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
