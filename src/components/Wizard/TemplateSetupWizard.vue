<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { NcModal, NcButton, NcEmptyContent } from '@nextcloud/vue'
import { useTemplateWizardStore } from '../../stores/templateWizard'

// Step components
import StepUseCaseSelection from './steps/StepUseCaseSelection.vue'
import StepTemplateSelection from './steps/StepTemplateSelection.vue'
import StepLanguageSelection from './steps/StepLanguageSelection.vue'
import StepPreview from './steps/StepPreview.vue'
import StepSummary from './steps/StepSummary.vue'
import StepImporting from './steps/StepImporting.vue'
import StepResults from './steps/StepResults.vue'

const wizardStore = useTemplateWizardStore()

// Computed properties
const isOpen = computed({
	get: () => wizardStore.isOpen,
	set: (value: boolean) => {
		if (!value) {
			wizardStore.closeWizard()
		}
	},
})

const currentStepComponent = computed(() => {
	const stepMap = {
		'use-case': StepUseCaseSelection,
		'template-selection': StepTemplateSelection,
		'language': StepLanguageSelection,
		'preview': StepPreview,
		'summary': StepSummary,
		'importing': StepImporting,
		'results': StepResults,
	}
	return stepMap[wizardStore.currentStep] || StepUseCaseSelection
})

const stepTitle = computed(() => {
	const titles = {
		'use-case': t('agora', 'Choose Your Use Case'),
		'template-selection': t('agora', 'Select Template'),
		'language': t('agora', 'Choose Language'),
		'preview': t('agora', 'Preview Template'),
		'summary': t('agora', 'Review & Confirm'),
		'importing': t('agora', 'Importing Template'),
		'results': t('agora', 'Import Complete'),
	}
	return titles[wizardStore.currentStep] || ''
})

const getStepTitle = (step: string): string => {
	const titles = {
		'use-case': t('agora', 'Use Case'),
		'template-selection': t('agora', 'Template'),
		'language': t('agora', 'Language'),
		'preview': t('agora', 'Preview'),
		'summary': t('agora', 'Confirm'),
		'importing': t('agora', 'Importing'),
		'results': t('agora', 'Results'),
	}
	return titles[step] || ''
}

const canShowNavigation = computed(() => {
	return !['importing', 'results'].includes(wizardStore.currentStep)
})

const nextButtonLabel = computed(() => {
	if (wizardStore.currentStep === 'summary') {
		return t('agora', 'Import Template')
	}
	return t('agora', 'Next')
})

// Actions
const handleNext = async () => {
	if (wizardStore.currentStep === 'summary') {
		// Trigger import
		try {
			await wizardStore.importTemplate()
		} catch (error) {
			console.error('Import failed:', error)
		}
	} else {
		wizardStore.nextStep()
	}
}

const handlePrevious = () => {
	wizardStore.previousStep()
}

const handleClose = () => {
	wizardStore.closeWizard()
}

// Watch for auto-launch when database is empty
watch(
	() => wizardStore.isDatabaseEmpty,
	(isEmpty) => {
		if (isEmpty && !wizardStore.isOpen) {
			// Auto-launch wizard for empty database
			// This can be controlled by a user preference later
			console.info('Database is empty - wizard can be auto-launched')
		}
	}
)
</script>

<template>
	<NcModal
		v-if="isOpen"
		:can-close="!wizardStore.importing"
		:name="stepTitle"
		size="large"
		@close="handleClose">
		<!-- Step Content -->
		<div class="wizard-container">
			<!-- Progress Indicator -->
			<div v-if="canShowNavigation" class="wizard-progress">
				<div
					v-for="(step, index) in wizardStore.steps.filter(s => !['importing', 'results'].includes(s))"
					:key="step"
					class="progress-step"
					:class="{
						active: wizardStore.currentStep === step,
						completed: index < wizardStore.currentStepIndex,
					}">
					<div class="progress-dot">
						<span v-if="index < wizardStore.currentStepIndex">✓</span>
						<span v-else>{{ index + 1 }}</span>
					</div>
					<div class="progress-label">
						{{ getStepTitle(step) }}
					</div>
				</div>
			</div>

			<!-- Dynamic Step Component -->
			<div class="wizard-content">
				<component :is="currentStepComponent" />
			</div>

			<!-- Navigation Buttons -->
			<div v-if="canShowNavigation" class="wizard-actions">
				<NcButton
					v-if="wizardStore.canGoPrevious"
					type="tertiary"
					@click="handlePrevious">
					{{ t('agora', 'Back') }}
				</NcButton>

				<div class="spacer" />

				<NcButton
					type="secondary"
					@click="handleClose">
					{{ t('agora', 'Cancel') }}
				</NcButton>

				<NcButton
					type="primary"
					:disabled="!wizardStore.canGoNext"
					@click="handleNext">
					{{ nextButtonLabel }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<style scoped lang="scss">
.wizard-container {
	display: flex;
	flex-direction: column;
	min-height: 500px;
	padding: 20px;
}

.wizard-progress {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;
	padding: 0 20px;
}

.progress-step {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	position: relative;

	&:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 18px;
		left: 50%;
		right: -50%;
		height: 2px;
		background-color: var(--color-border-dark);
		z-index: -1;
	}

	&.completed::after {
		background-color: var(--color-primary-element);
	}
}

.progress-dot {
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background-color: var(--color-background-dark);
	border: 2px solid var(--color-border-dark);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	margin-bottom: 8px;
	position: relative;
	z-index: 1;

	.progress-step.active & {
		background-color: var(--color-primary-element);
		border-color: var(--color-primary-element);
		color: var(--color-primary-element-text);
	}

	.progress-step.completed & {
		background-color: var(--color-primary-element);
		border-color: var(--color-primary-element);
		color: var(--color-primary-element-text);
	}
}

.progress-label {
	font-size: 12px;
	text-align: center;
	color: var(--color-text-maxcontrast);

	.progress-step.active & {
		color: var(--color-main-text);
		font-weight: 600;
	}
}

.wizard-content {
	flex: 1;
	overflow-y: auto;
	padding: 20px 0;
}

.wizard-actions {
	display: flex;
	gap: 12px;
	padding-top: 20px;
	border-top: 1px solid var(--color-border);
}

.spacer {
	flex: 1;
}
</style>
