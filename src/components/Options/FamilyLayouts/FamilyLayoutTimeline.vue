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

			<div class="right-controls">
				<!-- Period navigation controls (only for timeline view) -->
				<div v-if="viewMode === 'timeline'" class="period-controls">
					<NcButton size="small" @click="moveTimeline(-1)">
						<template #icon>
							<component :is="InquiryOptionIcons.ChevronLeft" :size="18" />
						</template>
					</NcButton>
					
					<div class="period-selector">
						<NcButton 
							size="small"
							:type="scale === 'day' ? 'primary' : 'tertiary'"
							@click="scale = 'day'"
						>
							{{ t('agora', 'Day') }}
						</NcButton>
						<NcButton 
							size="small"
							:type="scale === 'week' ? 'primary' : 'tertiary'"
							@click="scale = 'week'"
						>
							{{ t('agora', 'Week') }}
						</NcButton>
						<NcButton 
							size="small"
							:type="scale === 'month' ? 'primary' : 'tertiary'"
							@click="scale = 'month'"
						>
							{{ t('agora', 'Month') }}
						</NcButton>
					</div>
					
					<NcButton size="small" @click="moveTimeline(1)">
						<template #icon>
							<component :is="InquiryOptionIcons.ChevronRight" :size="18" />
						</template>
					</NcButton>
					
					<NcButton size="small" @click="centerOnToday">
						<template #icon>
							<component :is="InquiryOptionIcons.CalendarToday" :size="18" />
						</template>
						{{ t('agora', 'Today') }}
					</NcButton>
				</div>

				<!-- Calendar navigation controls -->
				<div v-if="viewMode === 'calendar'" class="calendar-nav-controls">
					<NcButton size="small" @click="moveTimeline(-1)">
						<template #icon>
							<component :is="InquiryOptionIcons.ChevronLeft" :size="18" />
						</template>
					</NcButton>
					
					<div class="current-period-display">
						<component 
							:is="InquiryOptionIcons.Calendar" 
							:size="16" 
							class="period-icon"
						/>
						<span class="period-text">{{ currentPeriodText }}</span>
					</div>
					
					<NcButton size="small" @click="moveTimeline(1)">
						<template #icon>
							<component :is="InquiryOptionIcons.ChevronRight" :size="18" />
						</template>
					</NcButton>
					
					<NcButton size="small" @click="centerOnToday">
						<template #icon>
							<component :is="InquiryOptionIcons.CalendarToday" :size="18" />
						</template>
						{{ t('agora', 'Today') }}
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
				
				<!-- Add to timeline button -->
				<NcButton
					type="primary"
					class="add-timeline-btn"
					@click="showAddModal = true"
				>
					<template #icon>
						<component :is="InquiryOptionIcons.Plus" :size="18" />
					</template>
					{{ t('agora', 'Add to timeline') }}
				</NcButton>
			</div>
		</div>

		<!-- Add option modal -->
		<NcModal 
			v-if="showAddModal"
			name="add-to-timeline" 
			size="normal"
			:title="t('agora', 'Add option to timeline')"
			@close="showAddModal = false"
		>
			<div class="add-timeline-modal">
				<!-- Search for existing option -->
				<div class="search-section">
					<h4>{{ t('agora', 'Add existing option') }}</h4>
					<p class="section-desc">{{ t('agora', 'Search and add an option to the timeline') }}</p>
					
					<div class="search-controls">
						<SearchSelect
							v-model="selectedOption"
							type="options"
							:inquiry-id="inquiryId"
							:placeholder="t('agora', 'Search for an option by title or #id…')"
							class="search-select"
						/>

						<!-- Date range selection -->
						<div v-if="selectedOption" class="date-selector">
							<div class="date-field">
								<label>{{ t('agora', 'Start date') }}</label>
								<NcDateTimePickerNative
									v-model="startDate"
									type="date"
									:placeholder="t('agora', 'Select start date')"
									:clearable="false"
									required
								/>
							</div>
							
							<div class="date-field">
								<label>{{ t('agora', 'End date (optional)') }}</label>
								<NcDateTimePickerNative
									v-model="endDate"
									type="date"
									:placeholder="t('agora', 'Select end date')"
									:clearable="true"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="modal-actions">
					<NcButton @click="showAddModal = false">
						{{ t('agora', 'Cancel') }}
					</NcButton>
					<NcButton
						type="primary"
						:disabled="!canAddToTimeline"
						@click="addToTimeline"
					>
						<template #icon>
							<component :is="InquiryOptionIcons.Timeline" :size="18" />
						</template>
						{{ t('agora', 'Add to timeline') }}
					</NcButton>
				</div>
			</div>
		</NcModal>

		<!-- FullCalendar component – single instance with dynamic options -->
		<FullCalendar
			ref="calendarRef"
			:options="calendarOptions"
			class="calendar-wrapper"
		/>
	</div>
</template>


<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcDateTimePickerNative from '@nextcloud/vue/components/NcDateTimePickerNative'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import { DateTime } from 'luxon'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import { 
  filterOptionsByLayout,
  addToTimeline,
  addLayoutToOption,
  removeFromTimeline,  
  updateTimelineDates,
  clearTimelineDates, 
  getForceLayouts,
  getTimelineStartDate,
  setTimelineDates,
  getTimelineEndDate
} from '../../../helpers/modules/InquiryOptionHelper'
import type { Option, InquiryOptionType, OptionFamily } from '../../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'
import { showSuccess, showError } from '@nextcloud/dialogs'
import SearchSelect from '../../Base/modules/SearchSelect.vue'

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import type { EventClickArg } from '@fullcalendar/core/index.js'

const props = defineProps<{
  options: Option[]
  inquiryId: number
  optionTypes: InquiryOptionType[]
  family: OptionFamily
  optionsByInquiry?: Option[]
}>()

const emit = defineEmits<{
  'openDetail': [option: Option]
  'update:options': []
}>()

// Stores
const optionsStore = useOptionsStore()

// Calendar ref
const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null)

// Modal state
const showAddModal = ref(false)
const selectedOption = ref<Option | null>(null)
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

// Current period display text for calendar view
const currentPeriodText = ref('')

const timelineOptions = computed(() => {
  const sourceOptions = props.optionsByInquiry || props.options
  
  return filterOptionsByLayout(
    sourceOptions,
    'timeline',           // Layout name
    props.optionTypes,
    props.family.key
  )
})

// Process options for timeline (only those with dates)
const processOptions = computed(() => timelineOptions.value.filter(opt => 
    // Need to have start date to show on timeline
     getTimelineStartDate(opt) !== null
  ))

const addSelectedToTimeline = async () => {
  if (!selectedOption.value || !startDate.value) return
  
  try {
    // Use the dedicated addToTimeline function
    await addToTimeline(
      selectedOption.value,
      startDate.value,
      endDate.value,
      optionsStore
    )
    
    showAddModal.value = false
    selectedOption.value = null
    startDate.value = null
    endDate.value = null
    showSuccess(t('agora', 'Option added to timeline'))
    emit('update:options')
  } catch (error) {
    console.error('Failed to add option to timeline:', error)
    showError(t('agora', 'Could not add option to timeline'))
  }
}

const updateOptionDates = async (option: Option, newStartDate: Date, newEndDate?: Date | null) => {
  try {
    await updateTimelineDates(
      option,
      newStartDate,
      newEndDate,
      optionsStore
    )
    
    showSuccess(t('agora', 'Timeline dates updated'))
    emit('update:options')
  } catch (error) {
    console.error('Failed to update dates:', error)
    showError(t('agora', 'Could not update dates'))
  }
}

const removeFromTimelineView = async (option: Option) => {
  try {
    await removeFromTimeline(option, optionsStore)
    
    showSuccess(t('agora', 'Option removed from timeline'))
    emit('update:options')
  } catch (error) {
    console.error('Failed to remove from timeline:', error)
    showError(t('agora', 'Could not remove from timeline'))
  }
}

const clearDates = async (option: Option) => {
  try {
    await clearTimelineDates(option, optionsStore)
    
    showSuccess(t('agora', 'Timeline dates cleared'))
    emit('update:options')
  } catch (error) {
    console.error('Failed to clear dates:', error)
    showError(t('agora', 'Could not clear dates'))
  }
}


// Transform options into FullCalendar resources
const resources = computed(() => processOptions.value.map(opt => ({
  id: opt.id.toString(),
  title: opt.title,
})))

// Transform options into FullCalendar events
const events = computed(() => processOptions.value
  .map(opt => {
    const start = getTimelineStartDate(opt)
    if (!start) return null

    // Apply date filter if set
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
      resourceId: opt.id.toString(),
      title: opt.title,
      start,
      end: endDateObj,
      allDay: true,
      extendedProps: { option: opt },
      backgroundColor: getStatusColor(opt.status?.optionStatus || 'draft'),
      borderColor: getStatusColor(opt.status?.optionStatus || 'draft'),
      textColor: '#ffffff',
      description: opt.description || '',
      status: opt.status?.optionStatus || 'draft',
    }
  })
  .filter(Boolean))

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: '#949494',
    active: '#3498db',
    completed: '#27ae60',
    cancelled: '#e74c3c'
  }
  return colors[status] || '#949494'
}

// View state
const viewMode = ref<'list' | 'timeline' | 'calendar'>('timeline')
const scale = ref<'day' | 'week' | 'month'>('week')
const dateFilter = ref('')

// Modal computed - can add if option doesn't already have timeline in force_layouts
const canAddToTimeline = computed(() => {
  if (!selectedOption.value || !startDate.value) return false
  
  // Check if option already has timeline in force_layouts
  const forceLayouts = getForceLayouts(selectedOption.value)
  return !forceLayouts.includes('timeline')
})

const addToTimeline = async () => {
  if (!selectedOption.value || !startDate.value) return
  
  try {
    // Step 1: Set the timeline dates
    let updatedOption = setTimelineDates(
      selectedOption.value,
      startDate.value,
      endDate.value
    )
    
    // Step 2: Add 'timeline' to force_layouts (just like Kanban does)
    updatedOption = addLayoutToOption(updatedOption, 'timeline')
    
      // Update the option
    await optionsStore.updateOptionFromModal(
      updatedOption.id,
      updatedOption.status.optionStatus,
     updatedOption.miscFields 
    )

    
    showAddModal.value = false
    selectedOption.value = null
    startDate.value = null
    endDate.value = null
    showSuccess(t('agora', 'Option added to timeline'))
    emit('update:options')
  } catch (error) {
    console.error('Failed to add option to timeline:', error)
    showError(t('agora', 'Could not add option to timeline'))
  }
}

// Update current period text for calendar view
const updateCurrentPeriodText = () => {
  if (!calendarRef.value || viewMode.value !== 'calendar') return
  
  const api = calendarRef.value.getApi()
  const currentDate = api.getDate()
  currentPeriodText.value = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
}

// FullCalendar options
const calendarOptions = computed(() => {
  const base = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin,
      resourceTimelinePlugin,
    ],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    headerToolbar: false,
    initialView: getCurrentView(),
    views: {
      resourceTimelineDay: { type: 'resourceTimeline', duration: { days: 1 } },
      resourceTimelineWeek: { type: 'resourceTimeline', duration: { days: 7 } },
      resourceTimelineMonth: { type: 'resourceTimeline', duration: { months: 1 } },
      listDay: {
        type: 'list',
        duration: { days: 1 },
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
      },
      listWeek: {
        type: 'list',
        duration: { days: 7 },
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
      },
      listMonth: {
        type: 'list',
        duration: { months: 1 },
        titleFormat: { year: 'numeric', month: 'long' },
      },
    },
    resources: resources.value,
    events: events.value,
    eventClick: (info: EventClickArg) => {
      emit('openDetail', info.event.extendedProps.option)
    },
    height: 'auto',
    firstDay: 1,
    locale: 'en',
    buttonText: {
      today: t('agora', 'Today'),
      month: t('agora', 'Month'),
      week: t('agora', 'Week'),
      day: t('agora', 'Day'),
      list: t('agora', 'List'),
    },
    resourceAreaWidth: '200px',
    resourceGroupField: 'title',
    datesSet: () => {
      updateCurrentPeriodText()
    },
  }

  // List view enhancements
  if (viewMode.value === 'list') {
    return {
      ...base,
      eventDisplay: 'block',
      listDayFormat: 'dddd, MMMM d, yyyy',
      listDaySideFormat: 'dddd',
      dayHeaderFormat: { weekday: 'long', month: 'long', day: 'numeric' },
      eventTimeFormat: { hour: 'numeric', minute: '2-digit' },
      views: {
        listDay: {
          type: 'list',
          duration: { days: 1 },
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
        },
        listWeek: {
          type: 'list',
          duration: { days: 7 },
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
        },
        listMonth: {
          type: 'list',
          duration: { months: 1 },
          titleFormat: { year: 'numeric', month: 'long' },
        },
      },
      eventContent: (arg: any) => ({
          html: `
            <div class="custom-list-event">
              <div class="event-title">${arg.event.title}</div>
              <div class="event-meta">
                <span class="event-date">${arg.timeText}</span>
                ${arg.event.extendedProps.description ? `<span class="event-description">${arg.event.extendedProps.description}</span>` : ''}
                <span class="event-status status-${arg.event.extendedProps.status}">${arg.event.extendedProps.status}</span>
              </div>
            </div>
          `
        })
    }
  }

  if (viewMode.value !== 'list') {
    return {
      ...base,
      slotMinTime: '00:00:00',
      slotMaxTime: '24:00:00',
      allDaySlot: false,
      nowIndicator: true,
      editable: false,
      selectable: false,
    }
  }
  return base
})

const getCurrentView = () => {
  switch (viewMode.value) {
    case 'list':
      return 'listWeek'
    case 'calendar':
      return 'dayGridMonth'
    case 'timeline':
      switch (scale.value) {
        case 'day': return 'resourceTimelineDay'
        case 'week': return 'resourceTimelineWeek'
        case 'month': return 'resourceTimelineMonth'
        default: return 'resourceTimelineWeek'
      }
    default:
      return 'dayGridMonth'
  }
}

// Watchers
watch([viewMode, scale], () => {
  if (!calendarRef.value) return
  const api = calendarRef.value.getApi()
  api.changeView(getCurrentView())
  setTimeout(updateCurrentPeriodText, 100)
})

watch(events, () => {
  if (!calendarRef.value) return
  const api = calendarRef.value.getApi()
  api.refetchEvents()
})

// Navigation methods
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

onMounted(() => {
  setTimeout(updateCurrentPeriodText, 200)
})

defineExpose({ moveTimeline, centerOnToday })
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

		.right-controls {
			display: flex;
			gap: 16px;
			align-items: center;

			.period-controls, .calendar-nav-controls {
				display: flex;
				gap: 8px;
				align-items: center;
				padding: 4px 8px;
				background: var(--color-background-hover);
				border-radius: 24px;

				.period-selector {
					display: flex;
					gap: 4px;
				}

				.current-period-display {
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 0 12px;
					font-weight: 600;
					font-size: 14px;
					color: var(--color-main-text);
					min-width: 150px;
					justify-content: center;

					.period-icon {
						opacity: 0.7;
					}

					.period-text {
						font-weight: 600;
					}
				}
			}

			.filter-controls {
				width: 200px;
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
	}

	.calendar-wrapper {
		margin-top: 20px;
		min-height: 500px;
	}
}

// Modal styles
.add-timeline-modal {
	padding: 24px;
	max-width: 500px;

	h4 {
		margin: 0 0 4px 0;
		font-size: 16px;
		font-weight: 600;
		color: var(--color-main-text);
	}

	.section-desc {
		margin: 0 0 16px 0;
		font-size: 13px;
		color: var(--color-text-lighter);
	}

	.search-section {
		margin-bottom: 24px;

		.search-select {
			margin-bottom: 20px;
		}

		.date-selector {
			display: flex;
			flex-direction: column;
			gap: 16px;

			.date-field {
				label {
					display: block;
					margin-bottom: 8px;
					font-weight: 600;
					font-size: 14px;
					color: var(--color-main-text);
				}
			}
		}
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		margin-top: 32px;
		padding-top: 20px;
		border-top: 1px solid var(--color-border);
	}
}
</style>

<!-- Global FullCalendar styles -->
<style>
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

/* Enhanced List View Styles */
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

.custom-list-event {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.custom-list-event .event-title {
	font-weight: 600;
	font-size: 14px;
	color: var(--color-main-text);
}

.custom-list-event .event-meta {
	display: flex;
	gap: 12px;
	align-items: center;
	font-size: 12px;
}

.custom-list-event .event-date {
	color: var(--color-text-lighter);
	font-family: monospace;
}

.custom-list-event .event-description {
	color: var(--color-text-maxcontrast);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 300px;
}

.custom-list-event .event-status {
	padding: 2px 8px;
	border-radius: 12px;
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
}

.custom-list-event .event-status.status-draft {
	background: rgba(148, 148, 148, 0.2);
	color: #949494;
}

.custom-list-event .event-status.status-active {
	background: rgba(52, 152, 219, 0.2);
	color: #3498db;
}

.custom-list-event .event-status.status-completed {
	background: rgba(39, 174, 96, 0.2);
	color: #27ae60;
}

.custom-list-event .event-status.status-cancelled {
	background: rgba(231, 76, 60, 0.2);
	color: #e74c3c;
}

/* Calendar View Enhancements */
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

/* Timeline View Enhancements */
.fc-timeline .fc-resource-area td {
	padding: 12px 8px;
	font-weight: 500;
}

.fc-timeline-event {
	border-radius: 6px;
	padding: 4px 8px;
}
</style>
