<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { NcButton } from '@nextcloud/vue'
import { useTemplateWizardStore } from '../../../stores/templateWizard'

const wizardStore = useTemplateWizardStore()

const importResult = computed(() => wizardStore.importResult)
const hasErrors = computed(() => importResult.value?.failed.length > 0)
const hasSuccess = computed(() => importResult.value?.success.length > 0)
const hasSkipped = computed(() => importResult.value?.skipped.length > 0)

const goToAgora = () => {
	window.location.href = '/apps/agora'
}

const goToSettings = () => {
	window.location.reload()
}

const closeWizard = () => {
	wizardStore.closeWizard()
}
</script>

<template>
	<div class="results-step">
		<div class="results-header">
			<div v-if="!hasErrors" class="success-icon">✓</div>
			<div v-else class="warning-icon">⚠</div>

			<h2 v-if="!hasErrors">
				{{ t('agora', 'Import Complete!') }}
			</h2>
			<h2 v-else>
				{{ t('agora', 'Import Completed with Warnings') }}
			</h2>
		</div>

		<div v-if="importResult" class="results-content">
			<!-- Success Items -->
			<div v-if="hasSuccess" class="result-section success-section">
				<h3>
					✅ {{ t('agora', 'Successfully Created') }}
					({{ importResult.success.length }} {{ t('agora', 'items') }})
				</h3>
				<ul class="result-list">
					<li v-for="(message, index) in importResult.success" :key="index">
						{{ message }}
					</li>
				</ul>
			</div>

			<!-- Skipped Items -->
			<div v-if="hasSkipped" class="result-section skipped-section">
				<h3>
					⏭️ {{ t('agora', 'Skipped - Already Exist') }}
					({{ importResult.skipped.length }} {{ t('agora', 'items') }})
				</h3>
				<ul class="result-list">
					<li v-for="(message, index) in importResult.skipped" :key="index">
						{{ message }}
					</li>
				</ul>
			</div>

			<!-- Failed Items -->
			<div v-if="hasErrors" class="result-section error-section">
				<h3>
					❌ {{ t('agora', 'Failed to Process') }}
					({{ importResult.failed.length }} {{ t('agora', 'items') }})
				</h3>
				<ul class="result-list">
					<li v-for="(message, index) in importResult.failed" :key="index">
						{{ message }}
					</li>
				</ul>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="results-actions">
			<NcButton type="primary" @click="goToAgora">
				{{ t('agora', 'Go to Agora') }}
			</NcButton>
			<NcButton type="secondary" @click="goToSettings">
				{{ t('agora', 'Admin Settings') }}
			</NcButton>
			<NcButton type="tertiary" @click="closeWizard">
				{{ t('agora', 'Close') }}
			</NcButton>
		</div>
	</div>
</template>

<style scoped lang="scss">
.results-step {
	padding: 20px;
	max-width: 900px;
	margin: 0 auto;
}

.results-header {
	text-align: center;
	margin-bottom: 40px;

	.success-icon,
	.warning-icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 48px;
		margin: 0 auto 20px;
	}

	.success-icon {
		background: #1a7f37; // Dark green for light mode
		color: white;
		@media (prefers-color-scheme: dark) {
			background: #3fb950; // Bright green for dark mode
		}
	}

	.warning-icon {
		background: #9a6700; // Dark orange for light mode
		color: white;
		@media (prefers-color-scheme: dark) {
			background: #e09b13; // Bright orange for dark mode
		}
	}

	h2 {
		font-size: 28px;
		font-weight: 600;
	}
}

.result-section {
	background: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	padding: 20px;
	margin-bottom: 20px;

	h3 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	&.success-section {
		border-color: #1a7f37; // Dark green for light mode
		@media (prefers-color-scheme: dark) {
			border-color: #3fb950; // Bright green for dark mode
		}

		h3 {
			color: #1a7f37; // Dark green for light mode
			@media (prefers-color-scheme: dark) {
				color: #3fb950; // Bright green for dark mode
			}
		}
	}

	&.skipped-section {
		border-color: #9a6700; // Dark orange for light mode
		@media (prefers-color-scheme: dark) {
			border-color: #e09b13; // Bright orange for dark mode
		}

		h3 {
			color: #9a6700; // Dark orange for light mode
			@media (prefers-color-scheme: dark) {
				color: #e09b13; // Bright orange for dark mode
			}
		}
	}

	&.error-section {
		border-color: #d73a49; // Dark red for light mode
		@media (prefers-color-scheme: dark) {
			border-color: #f85149; // Bright red for dark mode
		}

		h3 {
			color: #d73a49; // Dark red for light mode
			@media (prefers-color-scheme: dark) {
				color: #f85149; // Bright red for dark mode
			}
		}
	}
}

.result-list {
	list-style: none;
	padding: 0;
	margin: 0;
	max-height: 200px;
	overflow-y: auto;

	li {
		padding: 8px 12px;
		background: var(--color-background-dark);
		border-radius: var(--border-radius);
		margin-bottom: 8px;
		font-size: 14px;
		font-family: monospace;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.results-actions {
	display: flex;
	gap: 12px;
	justify-content: center;
	padding-top: 30px;
	border-top: 1px solid var(--color-border);
}
</style>
