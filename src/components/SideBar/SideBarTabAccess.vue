<!--
	- SPDX-FileCopyrightText: 2026 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
	import { computed, onMounted, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useParticipationStore } from '../../stores/participation.ts'
import { useSharesStore } from '../../stores/shares.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'

import UserSearch from '../User/UserSearch.vue'
import { SEARCH_TYPE_GROUPS, SEARCH_TYPE_USERS } from '../../Types/index.ts'

import ShareList from '../Shares/SharesList.vue'

// ============================================================
// TYPES
// ============================================================

type SearchItem = {
	id?: string
	uid?: string
	userId?: string
	groupId?: string
	value?: string
}

interface ParticipationConfig {
	selection_size: number
	source_groups: string[]
	method: 'random' | 'weighted' | 'stratified'
	user_ids: string[]
	group_ids: string[]
	mode?: 'groups' | 'users' | 'hybrid'
}

// ============================================================
// STORE SETUP
// ============================================================

const participationStore = useParticipationStore()
const sharesStore = useSharesStore()
const inquiryStore = useInquiryStore()

const targetType = computed(() => 'inquiry')
const targetId = computed(() => inquiryStore.id)
const configuration = computed(() => inquiryStore.configuration)

// ============================================================
// LOCAL STATE
// ============================================================

const lotteryStatus = ref<{
	status: 'not_run' | 'running' | 'completed' | 'validated' | 'failed' | 'cancelled'
	run?: any
	is_validated: boolean
	pool_size?: number
	selections?: any[]
} | null>(null)

const lotteryRunId = ref<string | null>(null)
const isLotteryRunning = ref(false)
const showLotteryResults = ref(false)
const showPoolInfo = ref(false)
const poolInfo = ref<Array<{ id: string; displayName: string }>>([])
const showLotteryConfig = ref(false)
const isLoadingLotteryStatus = ref(false)
const lotteryStatusError = ref<string | null>(null)

// Lottery confirmation dialog
const showLotteryConfirm = ref(false)
const pendingLotteryRun = ref<(() => Promise<void>) | null>(null)
const confirmMessage = ref('')
const confirmRequested = ref(0)
const confirmAvailable = ref(0)
const localSelectionSize = ref(10)

// ============================================================
// VISIBILITY
// ============================================================

const visibilityType = computed({
	get: () => configuration.value?.visibility || 'private',
	set: (value: string) => {
		if (configuration.value) {
			configuration.value.visibility = value
			if (value !== 'groups') {
				configuration.value.visibilityGroups = []
			}
			inquiryStore.write()
		}
	}
})

const extractIds = (items: Array<string | SearchItem>): string[] => {
	if (!items || !Array.isArray(items)) return []
	return items
		.map(item => {
			if (typeof item === 'string') return item
			if (typeof item === 'object' && item !== null) {
				return item.id || item.userId || item.groupId || item.uid || item.value || null
			}
			return null
		})
		.filter(Boolean) as string[]
}

const visibilityGroups = computed({
	get: (): string[] => configuration.value?.visibilityGroups || [],
	set: (groups: string[] | any[]): void => {
		const normalized = extractIds(groups)
		if (configuration.value) {
			configuration.value.visibilityGroups = normalized
			inquiryStore.write()
		}
	}
})

const visibilityGroupsForDisplay = computed({
	get: () => {
		const groups = configuration.value?.visibilityGroups || []
		if (Array.isArray(groups) && groups.length > 0 && typeof groups[0] === 'string') {
			return groups.map(id => ({
				id,
				groupId: id,
				displayName: id,
				type: 'group'
			}))
		}
		return groups
	},
	set: (selected: any[]) => {
		const ids = extractIds(selected)
		visibilityGroups.value = ids
	}
})

// ============================================================
// PARTICIPATION - LOCAL STATE WITH DEFERRED SAVE
// ============================================================

const localParticipationType = ref<string>('everyone')
const localParticipationConfig = ref<ParticipationConfig>({
	selection_size: 10,
	source_groups: [],
	method: 'random',
	mode: 'groups',
	user_ids: [],
	group_ids: []
})

const participationType = computed({
	get: () => localParticipationType.value,
	set: (value: string) => {
		localParticipationType.value = value
		const isLottery = value === 'lottery'
		showLotteryConfig.value = isLottery
		if (value !== 'lottery') {
			saveParticipationPolicy(value, localParticipationConfig.value)
		} else {
			loadLotteryStatus()
		}
	}
})

const participationConfig = computed({
	get: (): ParticipationConfig => localParticipationConfig.value,
	set: (config: ParticipationConfig) => {
		localParticipationConfig.value = config
		if (localParticipationType.value !== 'lottery') {
			saveParticipationPolicy(localParticipationType.value, config)
		}
	}
})

const loading = computed(() => participationStore.loading)

// Check if lottery is locked (validated)
const isLotteryLocked = computed(() => lotteryStatus.value?.is_validated === true)

// Check if lottery is completed (for showing results)
const isLotteryCompleted = computed(() => lotteryStatus.value?.status === 'completed' || 
	       lotteryStatus.value?.status === 'validated' ||
	       lotteryStatus.value?.status === 'cancelled')

// ============================================================
// SAVE PARTICIPATION POLICY
// ============================================================

const saveParticipationPolicy = async (
	type: string,
	config: Partial<ParticipationConfig>
) => {
	if (!targetId.value) return

	try {
		await participationStore.setParticipation(
			targetType.value,
			targetId.value,
			type,
			config
		)
	} catch (error) {
		console.error('Failed to save participation policy', { error, type, config })
	}
}

// ============================================================
// OPTIONS
// ============================================================

const participationOptions = [
	'everyone',
	'users',
	'groups',
	'lottery',
]

const participationOptionLabels: Record<string, string> = {
	everyone: t('agora', 'Everyone'),
	users: t('agora', 'Specific Users'),
	groups: t('agora', 'Specific Groups'),
	lottery: t('agora', '🎲 Lottery'),
}

const visibilityOptions = [
	'everyone',
	'participants',
	'groups',
	'private',
]

const visibilityOptionLabels: Record<string, string> = {
	everyone: t('agora', 'Everyone'),
	participants: t('agora', 'Participants Only'),
	groups: t('agora', 'Specific Groups'),
	private: t('agora', 'Private'),
}

// ============================================================
// LOAD DATA
// ============================================================

const loadAccessData = async () => {
	if (!targetId.value) return

	try {
		await participationStore.loadParticipation(targetType.value, targetId.value)
		await sharesStore.load('inquiry')

		if (participationStore.participation) {
			localParticipationType.value = participationStore.participation.policyType
			localParticipationConfig.value = {
				...localParticipationConfig.value,
				...participationStore.participation.policyConfig
			}
		}

		const isLottery = participationStore.participation?.policyType === 'lottery'
		showLotteryConfig.value = isLottery

		if (isLottery) {
			await loadLotteryStatus()
		}
	} catch (error) {
		console.error('Failed to load access data:', error)
		showError(t('agora', 'Failed to load access data'))
	}
}

onMounted(() => {
	loadAccessData()
})

// Watch for inquiry ID changes
watch(() => inquiryStore.id, (newId, oldId) => {
	if (newId && newId !== oldId) {
		loadAccessData()
	}
})

// Watch for selection size changes
watch(localSelectionSize, (newVal) => {
	if (!isLotteryLocked.value) {
		handleLotteryConfigChange('selection_size', newVal)
	}
})

// When loading config, update the local ref
watch(() => localParticipationConfig.value.selection_size, (newVal) => {
	localSelectionSize.value = newVal
}, { immediate: true })

// ============================================================
// LOTTERY
// ============================================================

const getStatusLabel = (status: string): string => {
	const labels: Record<string, string> = {
		not_run: t('agora', 'Not Run'),
		running: t('agora', 'Running'),
		completed: t('agora', 'Completed'),
		validated: t('agora', 'Validated'),
		failed: t('agora', 'Failed'),
		cancelled: t('agora', 'Cancelled'),
	}
	return labels[status] || status
}

const getSelectionStatusLabel = (status: string): string => {
	const labels: Record<string, string> = {
		pending: t('agora', 'Pending'),
		accepted: t('agora', 'Accepted'),
		declined: t('agora', 'Declined'),
		expired: t('agora', 'Expired'),
	}
	return labels[status] || status
}

const loadLotteryStatus = async () => {
	if (!targetId.value) return
	if (isLoadingLotteryStatus.value) return

	isLoadingLotteryStatus.value = true
	lotteryStatusError.value = null

	try {
		const status = await participationStore.getLotteryStatus(targetType.value, targetId.value)

		// Normalize the data structure
		lotteryStatus.value = {
			status: status?.status || 'not_run',
			is_validated: status?.is_validated || false,
			run: status?.run || null,
			pool_size: status?.pool_size || 0,
			selections: status?.selections || []
		}

		if (status?.run) {
			lotteryRunId.value = status.run.id
		}

		if (status?.status === 'not_run' || status?.status === 'running') {
			poolInfo.value = await participationStore.getEligiblePool(targetType.value, targetId.value)
		}
	} catch (error: any) {
		if (error?.code === 'ERR_CANCELED' || error?.message?.includes('canceled')) {
			console.debug('Lottery status request was canceled, ignoring')
			return
		}
		console.error('Failed to load lottery status:', error)
		lotteryStatusError.value = error.message || 'Failed to load lottery status'
		lotteryStatus.value = {
			status: 'not_run',
			is_validated: false
		}
	} finally {
		isLoadingLotteryStatus.value = false
	}
}

const confirmLottery = async () => {
	showLotteryConfirm.value = false
	if (pendingLotteryRun.value) {
		await pendingLotteryRun.value()
		pendingLotteryRun.value = null
	}
}

const handleRunLottery = async () => {
	if (isLotteryLocked.value) {
		showError(t('agora', 'Lottery is validated and cannot be re-run'))
		return
	}

	if (isLotteryRunning.value || !targetId.value) return

	try {
		isLotteryRunning.value = true

		await saveParticipationPolicy('lottery', localParticipationConfig.value)

		poolInfo.value = await participationStore.getEligiblePool(targetType.value, targetId.value)

		if (poolInfo.value.length === 0) {
			showError(t('agora', 'No eligible users found for lottery'))
			return
		}

		const config = localParticipationConfig.value
		const requested = config.selection_size || 1

		if (poolInfo.value.length < requested) {
			confirmMessage.value = t('agora', 'Only {available} users are available, but you requested {requested}. Continue?', {
				available: poolInfo.value.length,
				requested
			})
			confirmRequested.value = requested
			confirmAvailable.value = poolInfo.value.length
			pendingLotteryRun.value = executeLottery
			showLotteryConfirm.value = true
			return
		}

		await executeLottery()
	} catch (error: any) {
		showError(t('agora', 'Failed to run lottery: {error}', { error: error.message }))
	} finally {
		isLotteryRunning.value = false
	}
}

const executeLottery = async () => {
	try {
		const result = await participationStore.runLottery(targetType.value, targetId.value)
		await loadLotteryStatus()
		showSuccess(t('agora', 'Lottery completed successfully! {count} users selected.', {
			count: result.selection_count
		}))
	} catch (error: any) {
		showError(t('agora', 'Failed to run lottery: {error}', { error: error.message }))
		throw error
	}
}

const handleValidateLottery = async () => {
	if (!targetId.value) return

	try {
		await participationStore.validateLottery(targetType.value, targetId.value)
		await loadLotteryStatus()
		showSuccess(t('agora', 'Lottery validated successfully!'))
	} catch (error: any) {
		showError(t('agora', 'Failed to validate lottery: {error}', { error: error.message }))
	}
}

const handleCancelLottery = async () => {
	if (!targetId.value) return

	const reason = window.prompt(t('agora', 'Please provide a reason for cancellation:'))
	if (reason === null) return

	try {
		await participationStore.cancelLottery(targetType.value, targetId.value, reason)
		await loadLotteryStatus()
		showSuccess(t('agora', 'Lottery cancelled successfully'))
	} catch (error: any) {
		showError(t('agora', 'Failed to cancel lottery: {error}', { error: error.message }))
	}
}

const resetLottery = async () => {
	if (!targetId.value) return

	if (!confirm(t('agora', 'Are you sure you want to reset this lottery? This will remove all selections and allow a new lottery to be run.'))) {
		return
	}

	try {
		await participationStore.resetLottery(targetType.value, targetId.value)
		await loadLotteryStatus()
		showSuccess(t('agora', 'Lottery reset successfully'))
	} catch (error: any) {
		showError(t('agora', 'Failed to reset lottery: {error}', { error: error.message }))
	}
}

// ============================================================
// PARTICIPATION HANDLERS
// ============================================================

const handleParticipationConfigChange = async (field: keyof ParticipationConfig, value: any) => {
	if (isLotteryLocked.value) {
		showError(t('agora', 'Lottery is validated and cannot be changed'))
		return
	}
	if (Array.isArray(value)) {
		value = extractIds(value)
	}
	const newConfig = { ...localParticipationConfig.value, [field]: value }
	participationConfig.value = newConfig
}

const handleLotteryConfigChange = async (field: keyof ParticipationConfig, value: any) => {
	if (isLotteryLocked.value) {
		showError(t('agora', 'Lottery is validated and cannot be changed'))
		return
	}
	if (field === 'source_groups' && Array.isArray(value)) {
		value = extractIds(value)
	}
	const newConfig = { ...localParticipationConfig.value, [field]: value }
	localParticipationConfig.value = newConfig
}

const resetParticipation = async () => {
	if (!targetId.value) return

	try {
		await participationStore.deleteParticipation(targetType.value, targetId.value)
		localParticipationType.value = 'everyone'
		localParticipationConfig.value = {
			selection_size: 10,
			source_groups: [],
			method: 'random',
			mode: 'groups',
			user_ids: [],
			group_ids: []
		}
		showLotteryConfig.value = false
		lotteryStatus.value = null
		showSuccess(t('agora', 'Participation reset to everyone'))
	} catch (error: any) {
		showError(t('agora', 'Failed to reset participation: {error}', { error: error.message }))
	}
}

// ============================================================
// DISPLAY HELPERS
// ============================================================

const formatSelectedItems = (items: any[], type: 'user' | 'group'): string => {
	if (!items || items.length === 0) return t('agora', 'None selected')
	const count = items.length
	return t('agora', '{count} {type}{s} selected', {
		count,
		type: type === 'user' ? t('agora', 'user') : t('agora', 'group'),
		s: count > 1 ? 's' : ''
	})
}
</script>

<template>
	<div class="sidebar-participation">
		<!-- Header -->
		<div class="participation-header">
			<h2>{{ t('agora', 'Access & Participation') }}</h2>
			<p class="subtitle">{{ t('agora', 'Manage who can view, participate, and share this inquiry') }}</p>
		</div>

		<!-- ============================================================
			VISIBILITY SECTION
			============================================================ -->
			<div class="participation-section">
				<div class="section-header">
					<h3>{{ t('agora', 'Visibility') }}</h3>
					<div class="section-badge">
						<span class="badge">{{ visibilityOptionLabels[visibilityType] || visibilityType }}</span>
					</div>
				</div>
				<p class="section-desc">{{ t('agora', 'Who can view this inquiry') }}</p>

				<NcSelect
						:model-value="visibilityType"
						:options="visibilityOptions"
						:label-outside="true"
						:option-label="(opt: string) => visibilityOptionLabels[opt] || opt"
						:label="t('agora', 'Visibility')"
						@update:model-value="(val: string) => visibilityType = val"
						/>

						<div v-if="visibilityType === 'groups'" class="config-panel">
							<div class="config-group">
								<label>{{ t('agora', 'Select Groups') }}</label>
								<UserSearch
										:model-value="visibilityGroupsForDisplay"
										:search-types="[SEARCH_TYPE_GROUPS]"
										multiple
										:placeholder="t('agora', 'Type to search for groups')"
										:aria-label="t('agora', 'Select groups that can view this inquiry')"
										@update:model-value="(val) => visibilityGroupsForDisplay = val"
										/>
										<span v-if="visibilityGroups.length === 0" class="hint">
											{{ t('agora', 'No groups selected. Only you can view this inquiry.') }}
										</span>
										<span v-else class="hint">
											{{ t('agora', '{count} groups selected', { count: visibilityGroups.length }) }}
										</span>
							</div>
						</div>
			</div>

			<!-- ============================================================
				PARTICIPATION SECTION
				============================================================ -->
				<div class="participation-section">
					<div class="section-header">
						<h3>{{ t('agora', 'Participation') }}</h3>
						<div class="section-badge">
							<span class="badge">{{ participationOptionLabels[participationType] || participationType }}</span>
						</div>
					</div>
					<p class="section-desc">{{ t('agora', 'Who can participate (vote, comment, contribute)') }}</p>

					<NcSelect
							:model-value="participationType"
							:options="participationOptions"
							:label-outside="true"
							:option-label="(opt: string) => participationOptionLabels[opt] || opt"
							:label="t('agora', 'Participation Policy')"
							:loading="loading.participation"
							:disabled="isLotteryLocked"
							@update:model-value="(val) => participationType = val"
							/>

							<!-- Users participation type -->
							<div v-if="participationType === 'users'" class="config-panel">
								<div class="config-group">
									<label>{{ t('agora', 'Select Users') }}</label>
									<UserSearch
											:model-value="participationConfig.user_ids || []"
											:search-types="[SEARCH_TYPE_USERS]"
											multiple
											:placeholder="t('agora', 'Type to search for users')"
											:aria-label="t('agora', 'Select users who can participate')"
											:disabled="isLotteryLocked"
											@update:model-value="(val) => handleParticipationConfigChange('user_ids', val)"
											/>
											<span v-if="!participationConfig.user_ids?.length" class="hint">
												{{ t('agora', 'No users selected. Only you can participate.') }}
											</span>
											<span v-else class="hint">
												{{ t('agora', '{count} users selected', { count: participationConfig.user_ids.length }) }}
											</span>
								</div>
							</div>

							<!-- Groups participation type -->
							<div v-if="participationType === 'groups'" class="config-panel">
								<div class="config-group">
									<label>{{ t('agora', 'Select Groups') }}</label>
									<UserSearch
											:model-value="participationConfig.group_ids || []"
											:search-types="[SEARCH_TYPE_GROUPS]"
											multiple
											:placeholder="t('agora', 'Type to search for groups')"
											:aria-label="t('agora', 'Select groups that can participate')"
											:disabled="isLotteryLocked"
											@update:model-value="(val) => handleParticipationConfigChange('group_ids', val)"
											/>
											<span v-if="!participationConfig.group_ids?.length" class="hint">
												{{ t('agora', 'No groups selected. Only you can participate.') }}
											</span>
											<span v-else class="hint">
												{{ t('agora', '{count} groups selected', { count: participationConfig.group_ids.length }) }}
											</span>
								</div>
							</div>

							<!-- Lottery Config -->
							<div v-if="showLotteryConfig" class="config-panel">
								<!-- Locked notification -->
								<div v-if="isLotteryLocked" class="locked-notification">
									<span class="lock-icon">🔒</span>
									{{ t('agora', 'This lottery is validated and locked. Configuration cannot be changed.') }}
								</div>

								<div class="config-group">
									<label>{{ t('agora', 'Selection Size') }}</label>
									<NcTextField
											v-model="localSelectionSize"
											type="number"
											min="1"
											max="100"
											:disabled="isLotteryLocked"
											:label="t('agora', 'Number of participants to select')"
											/>
								</div>

								<div class="config-group">
									<label>{{ t('agora', 'Source Groups') }}</label>
									<UserSearch
											:model-value="participationConfig.source_groups || []"
											:search-types="[SEARCH_TYPE_GROUPS]"
											multiple
											:disabled="isLotteryLocked"
											:placeholder="t('agora', 'Type to search for groups')"
											:aria-label="t('agora', 'Select groups to include in lottery')"
											@update:model-value="(val) => handleLotteryConfigChange('source_groups', val)"
											/>
											<span v-if="!participationConfig.source_groups?.length" class="hint">
												{{ t('agora', 'No groups selected. All users eligible.') }}
											</span>
											<span v-else class="hint">
												{{ t('agora', '{count} groups selected as source', { count: participationConfig.source_groups.length }) }}
											</span>
								</div>

								<div class="config-group">
									<label>{{ t('agora', 'Selection Method') }}</label>
									<NcSelect
											:model-value="participationConfig.method || 'random'"
											:options="['random', 'weighted', 'stratified']"
											:label-outside="true"
											:disabled="isLotteryLocked"
											:option-label="(opt: string) => t('agora', opt.charAt(0).toUpperCase() + opt.slice(1))"
											:placeholder="t('agora', 'Select selection method')"
											@update:model-value="(val: string) => handleLotteryConfigChange('method', val)"
											/>
								</div>

								<!-- Lottery Status & Actions -->
								<div class="lottery-status">
									<!-- Loading state -->
									<div v-if="isLoadingLotteryStatus" class="status-loading">
										<span class="spinner"></span>
										{{ t('agora', 'Loading lottery status...') }}
									</div>

									<!-- Error state 
									<div v-else-if="lotteryStatusError" class="status-error">
										<span class="error-message">⚠️ {{ t('agora', 'Error loading lottery status') }}</span>
										<button 
										      class="action-button run"
										      @click="loadLotteryStatus"
										      >
										      {{ t('agora', 'Retry') }}
										</button>
									</div> -->

									<!-- Normal state -->
									<div v-else-if="lotteryStatus" class="status-display">
										<div class="status-info">
											<span class="status-label">{{ t('agora', 'Status:') }}</span>
											<span class="status-value" :class="lotteryStatus.status">
												{{ getStatusLabel(lotteryStatus.status) }}
											</span>
											<span v-if="lotteryStatus.is_validated" class="validation-badge">
												✅ {{ t('agora', 'Validated') }}
											</span>
											<span v-if="lotteryStatus.pool_size" class="pool-size">
												{{ t('agora', 'Pool: {count} users', { count: lotteryStatus.pool_size }) }}
											</span>
										</div>

										<!-- Actions based on status -->
										<!-- Actions based on status -->
										<div class="lottery-actions">
											<!-- Run button for all non-validated states (except running) -->
											<template v-if="!isLotteryLocked && lotteryStatus.status !== 'running'">
												<button 
												  class="action-button run"
												  :disabled="isLotteryRunning || loading.lottery"
												  @click="handleRunLottery"
												  >
												  <span v-if="isLotteryRunning" class="spinner"></span>
												  {{ isLotteryRunning ? t('agora', 'Running...') : t('agora', 'Run Lottery') }}
												</button>

												<!-- Cancel button for failed or cancelled -->
												<button 
																v-if="lotteryStatus.status === 'failed' || lotteryStatus.status === 'cancelled'"
																class="action-button cancel"
																@click="handleCancelLottery"
																>
																{{ t('agora', 'Cancel') }}
												</button>

													<!-- View results button (if there's a previous run) -->
													<button 
																v-if="lotteryStatus.run"
																class="action-button view"
																@click="showLotteryResults = !showLotteryResults"
																>
																{{ showLotteryResults ? t('agora', 'Hide Results') : t('agora', 'View Results') }}
													</button>
											</template>

											<!-- Validate button - only show for completed non-validated -->
											<div v-if="lotteryStatus.status === 'completed' && !lotteryStatus.is_validated" class="validate-action">
												<button 
																					class="action-button validate"
																					@click="handleValidateLottery"
																					>
																					{{ t('agora', 'Validate Lottery') }}
												</button>
											<!--	<button 
																					class="action-button view"
																					@click="showLotteryResults = !showLotteryResults"
																					>
																					{{ showLotteryResults ? t('agora', 'Hide Results') : t('agora', 'View Results') }}
											</button> -->
											</div>

											<!-- Running state -->
											<div v-if="lotteryStatus.status === 'running'" class="running-info">
												<span class="spinner"></span>
												{{ t('agora', 'Lottery in progress...') }}
											</div>

											<!-- Validated state -->
											<div v-if="lotteryStatus.is_validated" class="validated-info">
												<span class="success-message">✅ {{ t('agora', 'Lottery validated and active') }}</span>
												<button 
												      class="action-button view"
												      @click="showLotteryResults = !showLotteryResults"
												      >
												      {{ showLotteryResults ? t('agora', 'Hide Results') : t('agora', 'View Results') }}
												</button>
													<button 
												      class="action-button reset"
												      @click="resetLottery"
												      >
												      {{ t('agora', 'Reset Lottery') }}
													</button>
											</div>
										<!-- Cancelled state - show re-run option -->
										<div v-if="lotteryStatus.status === 'cancelled'" class="cancelled-actions">
											<span class="info-message">ℹ️ {{ t('agora', 'Lottery was cancelled') }}</span>
											<button 
											      class="action-button run"
											      :disabled="isLotteryRunning || loading.lottery || isLotteryLocked"
											      @click="handleRunLottery"
											      >
											      {{ t('agora', 'Run New Lottery') }}
											</button>
												<button 
											      class="action-button view"
											      @click="showLotteryResults = !showLotteryResults"
											      >
											      {{ showLotteryResults ? t('agora', 'Hide Results') : t('agora', 'View Results') }}
												</button>
										</div>
									</div>

									<!-- Pool information (only for not_run) -->
									<div v-if="lotteryStatus.status === 'not_run'" class="pool-info">
										<button 
														       class="action-button info"
														       @click="showPoolInfo = !showPoolInfo"
														       >
														       {{ showPoolInfo ? t('agora', 'Hide Pool Info') : t('agora', 'Show Pool Info') }}
										</button>
											<div v-if="showPoolInfo" class="pool-details">
												<p>{{ t('agora', 'Available users: {count}', { count: poolInfo?.length || 0 }) }}</p>
												<p>{{ t('agora', 'Requested: {count}', { count: participationConfig.selection_size || 1 }) }}</p>
												<p v-if="poolInfo && poolInfo.length < (participationConfig.selection_size || 1)" class="warning">
												⚠️ {{ t('agora', 'Warning: Requested more users than available') }}
												</p>
											</div>
									</div>
								</div>

								<!-- Results display -->
								<div v-if="showLotteryResults && lotteryStatus?.run" class="results-display">
									<h4>{{ t('agora', 'Lottery Results') }}</h4>
									<div class="results-meta">
										<span>{{ t('agora', 'Run ID:') }} {{ lotteryStatus.run.id }}</span>
										<span>{{ t('agora', 'Status:') }} {{ getStatusLabel(lotteryStatus.run.status) }}</span>
										<span>{{ t('agora', 'Selected:') }} {{ lotteryStatus.run.selection_count || 0 }} {{ t('agora', 'users') }}</span>
									</div>
									<div class="results-grid">
										<div v-for="selection in (lotteryStatus.run.selections || [])" :key="selection.id" class="result-item">
											<span class="rank">#{{ selection.rank }}</span>
											<span class="user">{{ selection.selected_user_id || 'Unknown' }}</span>
											<span class="status" :class="selection.status">
												{{ getSelectionStatusLabel(selection.status) }}
											</span>
											<span v-if="selection.accepted_at" class="accepted-date">
												{{ new Date(selection.accepted_at * 1000).toLocaleDateString() }}
											</span>
										</div>
									</div>
								</div>
							</div>

							<!-- Reset to everyone option -->
							<div class="config-group reset-group">
								<button 
							     class="reset-button"
							     :disabled="isLotteryLocked"
							     @click="resetParticipation"
							     >
							     {{ t('agora', 'Reset to everyone') }}
								</button>
									<span class="hint">
										{{ t('agora', 'Remove participation restrictions') }}
									</span>
							</div>
				</div>
	</div>

	<!-- ============================================================
		PUBLIC ACCESS SECTION
		============================================================ -->
		<div class="participation-section shares-section">
			<div class="section-header">
				<h3>{{ t('agora', 'Public Access') }}</h3>
				<div class="section-badge">
					<span class="badge">{{ sharesStore.public.length }} {{ t('agora', 'public links') }}</span>
				</div>
			</div>
			<p class="section-desc">{{ t('agora', 'Create public links for external participation') }}</p>
			<ShareList />
		</div>

		<!-- ============================================================
			LOTTERY CONFIRMATION DIALOG
			============================================================ -->
			<NcDialog
					v-if="showLotteryConfirm"
					:name="t('agora', 'Run lottery?')"
					@closing="showLotteryConfirm = false"
					>
					<p>{{ confirmMessage }}</p>

					<template #actions>
						<NcButton @click="showLotteryConfirm = false">
						{{ t('agora', 'Cancel') }}
						</NcButton>

						<NcButton
								type="primary"
								@click="confirmLottery"
								>
								{{ t('agora', 'Continue') }}
						</NcButton>
					</template>
			</NcDialog>
			</div>
</template>
<style lang="scss" scoped>
// ============================================================
// LOTTERY STATUS STYLES
// ============================================================

.lottery-status {
	margin-top: 16px;
	padding-top: 16px;
	border-top: 1px solid var(--color-border);

	.status-loading,
	.status-error {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		border-radius: 6px;

		.error-message {
			color: var(--color-error);
		}
	}

	.status-error {
		background: var(--color-error-light);
	}

	.status-display {
		.status-info {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 12px;
			flex-wrap: wrap;

			.status-label {
				font-weight: 600;
				color: var(--color-text-maxcontrast);
				font-size: 13px;
			}

			.status-value {
				font-weight: 600;
				padding: 4px 14px;
				border-radius: 20px;
				font-size: 13px;
				background: var(--color-background-dark);
				color: var(--color-text);

				&.not_run {
					color: var(--color-text-maxcontrast);
					background: var(--color-background-dark);
					border: 1px solid var(--color-border);
				}
				&.running {
					color: #0066cc;
					background: #d4e8ff;
					border: 1px solid #0066cc;
				}
				&.completed {
					color: #1a7a3a;
					background: #d4edda;
					border: 1px solid #1a7a3a;
				}
				&.validated {
					color: #1a7a3a;
					background: #d4edda;
					border: 1px solid #1a7a3a;
				}
				&.failed {
					color: #b91c1c;
					background: #fde8e8;
					border: 1px solid #b91c1c;
				}
				&.cancelled {
					color: #856404;
					background: #fff3cd;
					border: 1px solid #856404;
				}
			}

			.validation-badge {
				font-weight: 600;
				color: #1a7a3a;
				background: #d4edda;
				padding: 2px 10px;
				border-radius: 12px;
				font-size: 12px;
			}

			.pool-size {
				font-size: 12px;
				color: var(--color-text-maxcontrast);
				background: var(--color-background-dark);
				padding: 2px 10px;
				border-radius: 12px;
			}
		}

		.lottery-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
			margin: 12px 0;

			.action-button {
				padding: 8px 18px;
				border: none;
				border-radius: 8px;
				font-weight: 600;
				cursor: pointer;
				transition: all 0.2s;
				font-size: 13px;
				letter-spacing: 0.3px;

				&:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				&.run {
					background: #0066cc;
					color: #ffffff;
					box-shadow: 0 2px 4px rgba(0, 102, 204, 0.2);

					&:hover:not(:disabled) {
						background: #004d99;
						transform: translateY(-1px);
						box-shadow: 0 4px 8px rgba(0, 102, 204, 0.3);
					}
				}
				&.validate {
					background: #1a7a3a;
					color: #ffffff;
					box-shadow: 0 2px 4px rgba(26, 122, 58, 0.2);

					&:hover:not(:disabled) {
						background: #135a2a;
						transform: translateY(-1px);
						box-shadow: 0 4px 8px rgba(26, 122, 58, 0.3);
					}
				}
				&.cancel {
					background: #b91c1c;
					color: #ffffff;
					box-shadow: 0 2px 4px rgba(185, 28, 28, 0.2);

					&:hover:not(:disabled) {
						background: #8a1515;
						transform: translateY(-1px);
						box-shadow: 0 4px 8px rgba(185, 28, 28, 0.3);
					}
				}
				&.view {
					background: var(--color-background-dark);
					color: var(--color-text);
					border: 1px solid var(--color-border);

					&:hover:not(:disabled) {
						background: var(--color-background-hover);
						border-color: var(--color-primary-element);
					}
				}
				&.info {
					background: var(--color-background-dark);
					color: var(--color-text);
					border: 1px solid var(--color-border);

					&:hover:not(:disabled) {
						background: var(--color-background-hover);
						border-color: var(--color-primary-element);
					}
				}
				&.reset {
					background: #856404;
					color: #ffffff;
					box-shadow: 0 2px 4px rgba(133, 100, 4, 0.2);

					&:hover:not(:disabled) {
						background: #634a03;
						transform: translateY(-1px);
						box-shadow: 0 4px 8px rgba(133, 100, 4, 0.3);
					}
				}
			}

			.validate-action {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
				width: 100%;
			}

			.completed-actions {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
				width: 100%;
			}

			.cancelled-actions {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
				width: 100%;
				align-items: center;

				.info-message {
					color: var(--color-text);
					padding: 6px 12px;
					background: var(--color-background-dark);
					border-radius: 6px;
					font-size: 13px;
					border: 1px solid var(--color-border);
				}
			}

			.validated-info {
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 10px 14px;
				border-radius: 8px;
				background: #d4edda;
				width: 100%;
				flex-wrap: wrap;
				border: 1px solid #1a7a3a;

				.success-message {
					color: #1a7a3a;
					font-weight: 600;
					font-size: 14px;
				}
			}

			.running-info {
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 10px 14px;
				border-radius: 8px;
				background: #d4e8ff;
				width: 100%;
				color: #0066cc;
				font-weight: 500;
				border: 1px solid #0066cc;
			}
		}

		.pool-info {
			margin: 8px 0;

			.pool-details {
				margin-top: 8px;
				padding: 14px;
				background: var(--color-background-dark);
				border-radius: 8px;
				color: var(--color-text);
				border: 1px solid var(--color-border);

				p {
					margin: 6px 0;
					font-size: 13px;
				}

				.warning {
					color: #856404;
					font-weight: 600;
					background: #fff3cd;
					padding: 8px 12px;
					border-radius: 6px;
					margin-top: 8px;
				}
			}
		}
	}
}

.locked-notification {
	background: #fff3cd;
	color: #856404;
	padding: 12px 16px;
	border-radius: 8px;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 600;
	font-size: 13px;
	border: 1px solid #856404;

	.lock-icon {
		font-size: 20px;
	}
}

.results-display {
	margin-top: 12px;
	padding: 16px;
	background: var(--color-background-dark);
	border-radius: 8px;
	border: 1px solid var(--color-border);

	h4 {
		margin: 0 0 12px;
		font-size: 15px;
		font-weight: 600;
		color: var(--color-text);
	}

	.results-meta {
		display: flex;
		gap: 16px;
		font-size: 12px;
		color: var(--color-text-maxcontrast);
		margin-bottom: 12px;
		flex-wrap: wrap;

		span {
			background: var(--color-background);
			padding: 2px 10px;
			border-radius: 4px;
		}
	}

	.results-grid {
		display: grid;
		gap: 6px;
		max-height: 300px;
		overflow-y: auto;

		.result-item {
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 6px 12px;
			border-radius: 6px;
			background: var(--color-background);
			color: var(--color-text);
			border: 1px solid var(--color-border);

			.rank {
				font-weight: 700;
				color: var(--color-text-maxcontrast);
				min-width: 30px;
				font-size: 12px;
			}

			.user {
				flex: 1;
				color: var(--color-text);
				font-weight: 500;
				font-size: 13px;
			}

			.status {
				font-size: 11px;
				padding: 2px 12px;
				border-radius: 12px;
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.5px;

				&.pending {
					background: #fff3cd;
					color: #856404;
				}
				&.accepted {
					background: #d4edda;
					color: #1a7a3a;
				}
				&.declined {
					background: #fde8e8;
					color: #b91c1c;
				}
				&.expired {
					background: var(--color-background-hover);
					color: var(--color-text-maxcontrast);
				}
			}

			.accepted-date {
				font-size: 11px;
				color: var(--color-text-maxcontrast);
			}
		}
	}
}

.spinner {
	display: inline-block;
	width: 16px;
	height: 16px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 0.8s ease-in-out infinite;
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

// ============================================================
// SIDEBAR MAIN STYLES
// ============================================================

.sidebar-participation {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 16px;

	.participation-header {
		margin-bottom: 8px;

		h2 {
			font-size: 20px;
			font-weight: 700;
			margin: 0;
			color: var(--color-text);
			letter-spacing: -0.3px;
		}

		.subtitle {
			font-size: 14px;
			color: var(--color-text-maxcontrast);
			margin: 4px 0 0;
		}
	}

	.participation-section {
		background: var(--color-background-hover);
		border-radius: 12px;
		padding: 20px;
		border: 1px solid var(--color-border);

		.section-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 8px;

			h3 {
				font-size: 16px;
				font-weight: 600;
				margin: 0;
				color: var(--color-text);
			}

			.badge {
				font-size: 11px;
				font-weight: 600;
				text-transform: uppercase;
				background: var(--color-primary-element);
				color: var(--color-primary-text);
				padding: 3px 12px;
				border-radius: 12px;
				letter-spacing: 0.5px;
			}
		}

		.section-desc {
			font-size: 13px;
			color: var(--color-text-maxcontrast);
			margin: 0 0 16px;
		}
	}

	.config-panel {
		margin-top: 12px;
		padding: 16px;
		background: var(--color-background);
		border-radius: 8px;
		border: 1px solid var(--color-border);

		.config-group {
			margin-bottom: 16px;

			&:last-child {
				margin-bottom: 0;
			}

			label {
				display: block;
				font-size: 13px;
				font-weight: 600;
				margin-bottom: 6px;
				color: var(--color-text);
			}

			.hint {
				display: block;
				font-size: 12px;
				color: var(--color-text-maxcontrast);
				margin-top: 6px;
				opacity: 0.8;
			}
		}

		.reset-group {
			margin-top: 16px;
			padding-top: 16px;
			border-top: 1px solid var(--color-border);

			.reset-button {
				background: #856404;
				color: #ffffff;
				border: none;
				padding: 8px 20px;
				border-radius: 8px;
				font-size: 13px;
				font-weight: 600;
				cursor: pointer;
				transition: all 0.2s;
				box-shadow: 0 2px 4px rgba(133, 100, 4, 0.2);

				&:hover:not(:disabled) {
					background: #634a03;
					transform: translateY(-1px);
					box-shadow: 0 4px 8px rgba(133, 100, 4, 0.3);
				}

				&:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
			}
		}
	}

	.shares-section {
		.add-share {
			margin-bottom: 16px;
		}

		.share-lists {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
	}
}

// ============================================================
// DARK MODE FIXES FOR NC COMPONENTS
// ============================================================

// Fix for NcSelect
:deep(.vs__search) {
	color: var(--color-text) !important;
}

:deep(.vs__dropdown-option) {
	color: var(--color-text) !important;
	background: var(--color-background) !important;

	&:hover {
		background: var(--color-background-hover) !important;
	}
}

:deep(.vs__dropdown-option--highlight) {
	background: var(--color-primary-element) !important;
	color: var(--color-primary-text) !important;
}

:deep(.vs__selected) {
	color: var(--color-text) !important;
	background: var(--color-background-dark) !important;
}

:deep(.vs__dropdown-toggle) {
	background: var(--color-background-dark) !important;
	border-color: var(--color-border) !important;
}

:deep(.vs__clear) {
	fill: var(--color-text-maxcontrast) !important;
}

// Fix for NcTextField
:deep(.nc-text-field) {
	input {
		color: var(--color-text) !important;
		background: var(--color-background-dark) !important;
		border-color: var(--color-border) !important;

		&:focus {
			border-color: var(--color-primary-element) !important;
			box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.2) !important;
		}
	}
}

// Fix for NcDialog
:deep(.nc-dialog) {
	.dialog-content {
		color: var(--color-text) !important;
	}

	.dialog-title {
		color: var(--color-text) !important;
	}

	.dialog-actions {
		button {
			color: var(--color-text) !important;
		}
	}
}

// Fix for NcButton in dialog
:deep(.nc-button) {
	&.primary {
		background: var(--color-primary-element) !important;
		color: var(--color-primary-text) !important;

		&:hover {
			background: var(--color-primary-element-dark) !important;
		}
	}
}
</style>
