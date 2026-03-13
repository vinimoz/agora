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

		<!-- FullCalendar component – single instance with dynamic options -->
		<FullCalendar
			ref="calendarRef"
			:options="calendarOptions"
			class="calendar-wrapper"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import { DateTime } from 'luxon'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import { getOptionTypeIconComponent, getOptionTypeFamily } from '../../../helpers/modules/InquiryOptionHelper'
import type { Option } from '../../../Types/index.ts'
import { useOptionsStore } from '../../../stores/options'
import { useInquiryStore } from '../../../stores/inquiry'

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline' // 👈 key plugin

const props = defineProps<{
	options: Option[]
	inquiryId?: number
}>()

const emit = defineEmits<{
	'openDetail': [option: Option]
}>()

// Stores
const optionsStore = useOptionsStore()
let inquiryStore
try {
	inquiryStore = useInquiryStore()
} catch (e) {
	inquiryStore = { inquiry: null }
}

// Calendar ref
const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null)

// ---------- Date parsing ----------
const parseDate = (value: number | string | undefined): DateTime | null => {
	if (!value || value === 0) return null
	if (typeof value === 'string') {
		const dt = DateTime.fromISO(value)
		return dt.isValid ? dt.toLocal() : null
	} else {
		const isSeconds = value < 10000000000
		const dt = isSeconds ? DateTime.fromSeconds(value) : DateTime.fromMillis(value)
		return dt.toLocal()
	}
}

const getStartDate = (option: Option): DateTime | null => {
	const value = option.miscFields?.start_date ||
		option.miscFields?.voting_start ||
		option.miscFields?.support_start
	return parseDate(value)
}

const getEndDate = (option: Option): DateTime | null => {
	return parseDate(option.miscFields?.end_date)
}

// ---------- Process options ----------
const processOptions = computed(() => {
	return props.options.filter(opt => {
		const family = getOptionTypeFamily(opt.type, optionsStore.getOptionTypesArray)
		return family === 'process'
	})
})

// Transform options into FullCalendar resources (each option becomes a row)
const resources = computed(() => {
	return processOptions.value.map(opt => ({
		id: opt.id.toString(),
		title: opt.title,
		// You can add more fields here for resourceAreaColumns if needed
	}))
})

// Transform options into FullCalendar events (each option's time span)
const events = computed(() => {
	return processOptions.value
		.map(opt => {
			const start = getStartDate(opt)
			if (!start) return null

			// Apply date filter if set
			if (dateFilter.value) {
				const filterDate = DateTime.fromISO(dateFilter.value).toLocal()
				if (!start.hasSame(filterDate, 'day')) return null
			}

			const end = getEndDate(opt)
			let endDate = undefined
			if (end) {
				// For all-day events, end is exclusive – add one day to include the end day
				endDate = end.plus({ days: 1 }).toJSDate()
			}

			return {
				resourceId: opt.id.toString(), // link to the resource
				title: opt.title,
				start: start.toJSDate(),
				end: endDate,
				allDay: true,
				extendedProps: { option: opt },
				backgroundColor: getStatusColor(opt.status?.optionStatus),
				borderColor: getStatusColor(opt.status?.optionStatus),
				textColor: '#ffffff',
			}
		})
		.filter(Boolean)
})

// Helper for status color
const getStatusColor = (status: string) => {
	const colors: Record<string, string> = {
		draft: '#949494',
		active: '#3498db',
		completed: '#27ae60',
		cancelled: '#e74c3c'
	}
	return colors[status] || '#949494'
}

// ---------- View state ----------
const viewMode = ref<'list' | 'timeline' | 'calendar'>('timeline')
const scale = ref<'day' | 'week' | 'month'>('week')
const dateFilter = ref('')

// Determine which view to show in FullCalendar
const getCurrentView = () => {
	switch (viewMode.value) {
		case 'list':
			return 'listWeek' // or listDay, listMonth – you can change
		case 'calendar':
			return 'dayGridMonth'
		case 'timeline':
			// Use resource timeline views
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

// FullCalendar options – computed so they update reactively
const calendarOptions = computed(() => {
	const base = {
		plugins: [
			dayGridPlugin,
			timeGridPlugin,
			interactionPlugin,
			listPlugin,
			resourceTimelinePlugin, // 👈 important
		],
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		headerToolbar: false, // we use our own controls
		initialView: getCurrentView(),
		views: {
			// Optional: configure custom durations for timeline
			resourceTimelineDay: { type: 'resourceTimeline', duration: { days: 1 } },
			resourceTimelineWeek: { type: 'resourceTimeline', duration: { days: 7 } },
			resourceTimelineMonth: { type: 'resourceTimeline', duration: { months: 1 } },
		},
		resources: resources.value,
		events: events.value,
		eventClick: (info: any) => {
			emit('openDetail', info.event.extendedProps.option)
		},
		height: 'auto',
		firstDay: 1, // Monday
		locale: 'en',
		buttonText: {
			today: t('agora', 'Today'),
			month: t('agora', 'Month'),
			week: t('agora', 'Week'),
			day: t('agora', 'Day'),
			list: t('agora', 'List'),
		},
		// Resource timeline specific options
		resourceAreaWidth: '200px', // width of the left column
		resourceLabelText: t('agora', 'Options'), // header for resource column
		// If you want extra columns (like owner, status) uncomment and add fields to resources
		// resourceAreaColumns: [
		//   { field: 'title', headerContent: 'Option' },
		//   { field: 'status', headerContent: 'Status' }
		// ]
	}

	// Add view-specific options
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

// Watch for view mode changes – update the calendar view
watch([viewMode, scale], () => {
	if (!calendarRef.value) return
	const api = calendarRef.value.getApi()
	api.changeView(getCurrentView())
})

// Watch for events changes – refresh events
watch(events, () => {
	if (!calendarRef.value) return
	const api = calendarRef.value.getApi()
	api.refetchEvents()
})

// Navigation methods (used by the template buttons)
const moveTimeline = (direction: number) => {
	if (!calendarRef.value) return
	const api = calendarRef.value.getApi()
	if (direction < 0) {
		api.prev()
	} else {
		api.next()
	}
}

const centerOnToday = () => {
	if (!calendarRef.value) return
	const api = calendarRef.value.getApi()
	api.today()
}

// Expose navigation to parent if needed
defineExpose({ moveTimeline, centerOnToday })

// Helper to format the date range shown in the header
const formatDateRange = (start: Date, end: Date, scale: string) => {
	const startDt = DateTime.fromJSDate(start)
	const endDt = DateTime.fromJSDate(end)
	switch (scale) {
		case 'day': return startDt.toFormat('DDD')
		case 'week': return `${startDt.toFormat('MMM d')} - ${endDt.toFormat('MMM d, yyyy')}`
		case 'month': return startDt.toFormat('MMMM yyyy')
		default: return ''
	}
}

// Reactive visible range text (for the header)
const visibleRangeText = ref('')

watch([viewMode, scale], async () => {
	await nextTick()
	if (!calendarRef.value) return
	const api = calendarRef.value.getApi()
	const view = api.view
	if (view) {
		visibleRangeText.value = formatDateRange(view.currentStart, view.currentEnd, scale.value)
	}
})
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

	.calendar-wrapper {
		margin-top: 20px;
		min-height: 500px;
	}
}
</style>

<!-- Global FullCalendar styles (already in index.html via CDN) -->
<style>
/* Your custom overrides – if any */
.fc-event {
	cursor: pointer;
	padding: 2px 4px;
	border-radius: 4px;
	font-size: 0.85em;
	transition: transform 0.1s ease;
}

.fc-event:hover {
	transform: scale(1.02);
	filter: brightness(1.1);
}

.fc-header-toolbar {
	display: none;
}
</style>
