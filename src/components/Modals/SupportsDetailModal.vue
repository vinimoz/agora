<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
	<NcModal size="large" :name="modalTitle" @close="$emit('close')">
		<div class="supports-modal">
			<!-- Header with option type icon -->
			<div class="modal-header">
				<div class="header-left">
					<div class="option-type-indicator" :style="{ color: optionTypeColor }">
						<component :is="optionIcon" :size="24" />
					</div>
					<div class="header-content">
						<h3>{{ option?.title }}</h3>
						<div class="option-meta">
							<span class="option-type-label">{{ optionTypeLabel }}</span>
							<span v-if="option?.text" class="option-text">{{ option.text }}</span>
						</div>
					</div>
				</div>

				<!-- Summary badges -->
				<div v-if="!loading && supports.length > 0" class="summary-badges">
					<span class="badge total">
						<component :is="InquiryOptionIcons.Users" :size="14" />
						{{ supports.length }}
					</span>
					<span v-for="(count, value) in supportsByValue" :key="value" class="badge" :class="getValueClass(value)">
						<component :is="getValueIcon(value)" :size="14" />
						{{ count }}
					</span>
				</div>
			</div>

			<!-- Loading -->
			<div v-if="loading" class="loading-state">
				<NcLoadingIcon :size="32" />
				<span>{{ t('agora', 'Loading supports…') }}</span>
			</div>

			<!-- Empty -->
			<div v-else-if="supports.length === 0" class="empty-state">
				<component :is="InquiryOptionIcons.Inbox" :size="48" />
				<p>{{ t('agora', 'No votes yet for this option.') }}</p>
			</div>

			<!-- List -->
			<div v-else class="supports-list">
				<div
					v-for="support in sortedSupports"
					:key="support.id"
					class="support-item"
					:class="{ 'is-current-user': displayVote && isCurrentUser(support) }"
				>
					<div class="support-user">
						<NcAvatar
							:user="support.userId"
							:display-name="support.userId"
							:size="36"
						/>
						<span class="user-name">{{ support.userId }}</span>
						<span v-if="displayVote && isCurrentUser(support)" class="you-badge">
							{{ t('agora', 'You') }}
						</span>
					</div>

					<div class="support-value" :class="getValueClass(support.value)">
						<component :is="getValueIcon(support.value)" :size="20" />
						<strong>{{ getValueLabel(support.value) }}</strong>
					</div>

					<div class="support-meta">
						<span class="engine-badge">
							<component :is="getEngineIcon(support.supportEngineId)" :size="12" />
							{{ getEngineName(support.supportEngineId) }}
						</span>
						<span class="timestamp">
							<component :is="InquiryOptionIcons.Clock" :size="12" />
							{{ formatDate(support.created) }}
						</span>
					</div>
				</div>
			</div>
		</div>

		<template #actions>
			<NcButton @click="$emit('close')">
				{{ t('agora', 'Close') }}
			</NcButton>
		</template>
	</NcModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { Option } from '../../Types/index.ts'
import { useSupportsStore } from '../../stores/supports'
import { useSupportEngineStore } from '../../stores/supportEngine'
import { useSessionStore } from '../../stores/session'
import {
	getOptionTypeIconComponent,
	getOptionTypeLabel,
	getOptionTypeColor,
} from '../../helpers/modules/InquiryOptionHelper'
import type { Support } from '../../stores/supports'

const props = defineProps<{
	optionId: number
	inquiryId: number
	displayVote?: boolean // highlight current user's vote
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
	close: []
}>()

const supportsStore = useSupportsStore()
const engineStore = useSupportEngineStore()
const sessionStore = useSessionStore()

const supports = ref<Support[]>([])
const loading = ref(true)
const option = ref<Option>(null)

const currentUser = computed(() => sessionStore.user?.uid || '')

// Option type helpers
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])
const optionIcon = computed(() =>
	getOptionTypeIconComponent(option.value?.type, allOptionTypes.value)
)
const optionTypeLabel = computed(() =>
	getOptionTypeLabel(option.value?.type, allOptionTypes.value, t('agora', 'Option'))
)
const optionTypeColor = computed(() =>
	getOptionTypeColor(option.value?.type, allOptionTypes.value)
)

// Modal title
const modalTitle = computed(() =>
	t('agora', 'Votes for {option}', {
		option: option.value?.title || t('agora', 'Option'),
	}),
)

// Summary by value
const supportsByValue = computed(() => {
	const counts: Record<string, number> = {}
	supports.value.forEach((s) => {
		const key = String(s.value)
		counts[key] = (counts[key] || 0) + 1
	})
	return counts
})

// Sorted supports (newest first)
const sortedSupports = computed(() =>
	[...supports.value].sort((a, b) => b.created - a.created),
)

// Helper: get icon for a support value
function getValueIcon(value: Support['value']): string {
	if (value === 1) return InquiryOptionIcons.ThumbUp
	if (value === -1) return InquiryOptionIcons.ThumbDown
	if (value === 0) return InquiryOptionIcons.Minus
	return InquiryOptionIcons.Help
}

// Helper: get label for a support value
function getValueLabel(value: Support['value']): string {
	if (value === 1) return t('agora', 'Yes')
	if (value === -1) return t('agora', 'No')
	if (value === 0) return t('agora', 'Abstain')
	return String(value)
}

// Helper: CSS class for value
function getValueClass(value: Support['value']): string {
	if (value === 1) return 'value-yes'
	if (value === -1) return 'value-no'
	if (value === 0) return 'value-abstain'
	return ''
}

// Check if support belongs to current user
function isCurrentUser(support: Support): boolean {
	return support.userId === currentUser.value
}

// Engine helpers
function getEngineName(engineId?: number): string {
	if (!engineId) return t('agora', 'Unknown')
	const engine = engineStore.getEngineById(engineId)
	return engine?.title || engine?.engine || t('agora', 'Voting method')
}

function getEngineIcon(engineId?: number): string {
	if (!engineId) return InquiryOptionIcons.Help
	// const engine = engineStore.getEngineById(engineId)
	// Map engine types to icons if needed
	return InquiryOptionIcons.Settings
}

function formatDate(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

// Load option data
async function loadOption() {
	const { useOptionsStore } = await import('../../stores/options')
	const optionsStore = useOptionsStore()
	option.value = optionsStore.options.find((o) => o.id === props.optionId)
}

// Load supports
async function loadSupports() {
	loading.value = true
	try {
		await supportsStore.loadSupports(props.inquiryId)
		supports.value = supportsStore.getOptionSupports(props.inquiryId, props.optionId)
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	await Promise.all([loadOption(), loadSupports()])
})
</script>

<style scoped lang="scss">
.supports-modal {
	padding: 0;
	max-width: 750px;

	.modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		padding: 24px 24px 16px;
		border-bottom: 1px solid var(--color-border);

		.header-left {
			display: flex;
			align-items: center;
			gap: 16px;
			flex: 1;
			min-width: 0;

			.option-type-indicator {
				flex-shrink: 0;
				width: 48px;
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: var(--color-background-darker);
				border-radius: 10px;
			}

			.header-content {
				flex: 1;
				min-width: 0;

				h3 {
					margin: 0 0 4px 0;
					font-size: 20px;
					font-weight: 700;
					color: var(--color-main-text);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.option-meta {
					display: flex;
					align-items: center;
					gap: 12px;
					flex-wrap: wrap;
					font-size: 14px;
					color: var(--color-text-lighter);

					.option-type-label {
						background: var(--color-background-dark);
						padding: 2px 8px;
						border-radius: 8px;
						font-weight: 600;
					}

					.option-text {
						margin: 0;
						color: var(--color-text-lighter);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}

		.summary-badges {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
			align-items: center;
			flex-shrink: 0;

			.badge {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				padding: 2px 10px;
				border-radius: 20px;
				font-size: 12px;
				font-weight: 600;
				background: var(--color-background-dark);
				color: var(--color-text-light);

				&.total {
					background: var(--color-primary-element);
					color: var(--color-primary-text);
				}
				&.value-yes {
					background: var(--color-success);
					color: var(--color-main-background);
				}
				&.value-no {
					background: var(--color-error);
					color: var(--color-main-background);
				}
				&.value-abstain {
					background: var(--color-warning);
					color: var(--color-main-text);
				}
			}
		}
	}

	.loading-state,
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 48px;
		color: var(--color-text-lighter);

		svg {
			color: var(--color-text-lighter);
		}
	}

	.supports-list {
		max-height: 500px;
		overflow-y: auto;
		padding: 16px 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;

		.support-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px 16px;
			border-radius: 12px;
			background: var(--color-main-background);
			border: 1px solid var(--color-border);
			transition: all 0.15s ease;
			gap: 12px;
			flex-wrap: wrap;

			&:hover {
				background: var(--color-background-hover);
				border-color: var(--color-border-dark);
			}

			&.is-current-user {
				background: var(--color-primary-light);
				border-color: var(--color-primary-element);
				box-shadow: 0 0 0 1px var(--color-primary-element);
			}

			.support-user {
				display: flex;
				align-items: center;
				gap: 10px;
				min-width: 150px;
				flex: 1;

				.user-name {
					font-weight: 500;
					font-size: 14px;
					color: var(--color-main-text);
				}

				.you-badge {
					background: var(--color-primary-element);
					color: var(--color-primary-text);
					padding: 1px 8px;
					border-radius: 12px;
					font-size: 11px;
					font-weight: 600;
					text-transform: uppercase;
					margin-left: 4px;
				}
			}

			.support-value {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: 15px;
				font-weight: 600;
				padding: 4px 12px;
				border-radius: 20px;
				background: var(--color-background-dark);

				&.value-yes {
					color: var(--color-success);
					background: var(--color-success-bg);
				}
				&.value-no {
					color: var(--color-error);
					background: var(--color-error-bg);
				}
				&.value-abstain {
					color: var(--color-warning);
					background: var(--color-warning-bg);
				}
			}

			.support-meta {
				display: flex;
				align-items: center;
				gap: 16px;
				font-size: 12px;
				color: var(--color-text-lighter);
				flex-shrink: 0;

				.engine-badge {
					display: inline-flex;
					align-items: center;
					gap: 4px;
					background: var(--color-background-dark);
					padding: 2px 10px;
					border-radius: 16px;
				}

				.timestamp {
					display: inline-flex;
					align-items: center;
					gap: 4px;
					white-space: nowrap;
				}
			}
		}
	}

	@media (max-width: 768px) {
		.modal-header {
			padding: 16px;
			flex-direction: column;
			align-items: stretch;

			.header-left {
				.option-meta .option-text {
					white-space: normal;
				}
			}
			.summary-badges {
				margin-top: 8px;
				justify-content: flex-start;
			}
		}
		.supports-list {
			padding: 12px 16px;
			.support-item {
				padding: 12px;
				flex-direction: column;
				align-items: stretch;
				gap: 8px;

				.support-user {
					min-width: unset;
				}
				.support-meta {
					justify-content: flex-start;
					flex-wrap: wrap;
				}
			}
		}
	}
}
</style>
