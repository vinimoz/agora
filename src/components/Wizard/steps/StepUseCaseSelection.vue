<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { useTemplateWizardStore, type UseCase } from '../../../stores/templateWizard'

const wizardStore = useTemplateWizardStore()

interface UseCaseOption {
	id: UseCase
	title: string
	description: string
	icon: string
	examples: string[]
}

const useCases: UseCaseOption[] = [
	{
		id: 'citizen_participation',
		title: t('agora', 'Citizen Participation'),
		description: t('agora', 'For municipalities, cantons, communes and government entities'),
		icon: '🏛️',
		examples: [
			t('agora', 'Deliberative processes (debates, proposals, petitions)'),
			t('agora', 'Legislative processes (law proposals, amendments)'),
			t('agora', 'Administrative requests and grievances'),
			t('agora', 'Social services (housing, childcare, scholarships)'),
		],
	},
	{
		id: 'enterprise',
		title: t('agora', 'Enterprise & Business'),
		description: t('agora', 'For companies, departments and business operations'),
		icon: '🏢',
		examples: [
			t('agora', 'IT Services (ideas, automation, service requests)'),
			t('agora', 'Human Resources (training, policies, workplace)'),
			t('agora', 'Facility Management (infrastructure, sustainability)'),
			t('agora', 'Finance & Procurement (budget, vendor feedback)'),
		],
	},
	{
		id: 'education',
		title: t('agora', 'Education & Research'),
		description: t('agora', 'For schools, universities and research institutions'),
		icon: '🎓',
		examples: [
			t('agora', 'Student feedback and suggestions'),
			t('agora', 'Research project proposals'),
			t('agora', 'Course evaluations and improvements'),
			t('agora', 'Campus facility requests'),
		],
	},
	{
		id: 'custom',
		title: t('agora', 'Custom Setup'),
		description: t('agora', 'Start from scratch or import your own template'),
		icon: '🛠️',
		examples: [
			t('agora', 'Upload AI-generated template'),
			t('agora', 'Import custom JSON configuration'),
			t('agora', 'Start with empty configuration'),
			t('agora', 'Use community templates'),
		],
	},
]

const selectUseCase = (useCase: UseCase) => {
	wizardStore.selectUseCase(useCase)
}
</script>

<template>
	<div class="use-case-selection">
		<div class="use-case-header">
			<h2>{{ t('agora', 'What is your primary use case?') }}</h2>
			<p class="subtitle">
				{{ t('agora', 'Select the option that best matches your organization\'s needs') }}
			</p>
		</div>

		<div class="use-case-grid">
			<div
				v-for="useCase in useCases"
				:key="useCase.id"
				class="use-case-card"
				:class="{ selected: wizardStore.selectedUseCase === useCase.id }"
				@click="selectUseCase(useCase.id)">
				<div class="card-icon">{{ useCase.icon }}</div>
				<h3 class="card-title">{{ useCase.title }}</h3>
				<p class="card-description">{{ useCase.description }}</p>
				<ul class="card-examples">
					<li v-for="(example, index) in useCase.examples" :key="index">
						{{ example }}
					</li>
				</ul>
				<div v-if="wizardStore.selectedUseCase === useCase.id" class="selected-indicator">
					<span class="check-icon">✓</span>
					{{ t('agora', 'Selected') }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.use-case-selection {
	padding: 20px;
}

.use-case-header {
	text-align: center;
	margin-bottom: 40px;

	h2 {
		font-size: 24px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.subtitle {
		color: var(--color-text-maxcontrast);
		font-size: 14px;
	}
}

.use-case-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 20px;
	max-width: 1200px;
	margin: 0 auto;
}

.use-case-card {
	background: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	padding: 24px;
	cursor: pointer;
	transition: all 0.2s ease;
	position: relative;

	&:hover {
		border-color: var(--color-primary-element);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	&.selected {
		border-color: var(--color-primary-element);
		border-width: 3px;
		box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);
	}
}

.card-icon {
	font-size: 48px;
	margin-bottom: 16px;
	text-align: center;
}

.card-title {
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 8px;
}

.card-description {
	color: var(--color-text-maxcontrast);
	font-size: 14px;
	margin-bottom: 16px;
}

.card-examples {
	list-style: none;
	padding: 0;
	margin: 0;
	font-size: 13px;
	color: var(--color-text-maxcontrast);

	li {
		padding: 4px 0;
		padding-left: 20px;
		position: relative;

		&::before {
			content: '•';
			position: absolute;
			left: 8px;
			color: var(--color-primary-element);
		}
	}
}

.selected-indicator {
	position: absolute;
	top: 12px;
	right: 12px;
	background: var(--color-primary-element);
	color: var(--color-primary-element-text);
	padding: 4px 12px;
	border-radius: var(--border-radius-pill);
	font-size: 12px;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 4px;

	.check-icon {
		font-size: 14px;
	}
}
</style>
