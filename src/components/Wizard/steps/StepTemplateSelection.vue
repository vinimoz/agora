<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { NcLoadingIcon, NcEmptyContent, NcButton, NcNoteCard } from '@nextcloud/vue'
import { useTemplateWizardStore, type Template, type TemplateContent } from '../../../stores/templateWizard'

const wizardStore = useTemplateWizardStore()

const templates = computed(() => wizardStore.availableTemplates)
const isLoading = computed(() => wizardStore.loadingTemplates)
const fileInput = ref<HTMLInputElement | null>(null)
const uploadError = ref<string | null>(null)
const showHelp = ref(false)

onMounted(async () => {
	// Ensure templates are loaded when component mounts
	if (wizardStore.templates.length === 0 && !wizardStore.loadingTemplates) {
		await wizardStore.loadTemplates()
	}
})

const selectTemplate = (template: Template) => {
	wizardStore.selectTemplate(template)
}

const formatCount = (count: number, label: string) => {
	return `${count} ${label}${count !== 1 ? 's' : ''}`
}

const triggerFileUpload = () => {
	fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
	const target = event.target as HTMLInputElement
	const file = target.files?.[0]

	if (!file) return

	uploadError.value = null

	try {
		const text = await file.text()
		const template = JSON.parse(text) as TemplateContent

		// Validate template has required structure
		if (!template.template_info || !template.template_info.name) {
			throw new Error('Invalid template format: missing template_info')
		}

		// Optionally validate with backend
		await wizardStore.validateTemplate(template)

		// Upload successful - store custom template
		wizardStore.uploadCustomTemplate(template)

	} catch (error) {
		uploadError.value = error instanceof Error ? error.message : 'Failed to parse template file'
		console.error('Template upload error:', error)
	}
}

const downloadSchema = async () => {
	try {
		const url = generateOcsUrl('/apps/agora/api/v1.0/templates/schema')
		const response = await axios.get(url)

		if (response.data?.ocs?.data?.error) {
			throw new Error(response.data.ocs.data.error)
		}

		const schema = response.data.ocs.data
		const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' })
		const downloadUrl = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = downloadUrl
		a.download = 'agora-template-schema.json'
		document.body.appendChild(a)
		a.click()
		window.URL.revokeObjectURL(downloadUrl)
		document.body.removeChild(a)
	} catch (error) {
		console.error('Failed to download schema:', error)
		uploadError.value = error instanceof Error ? error.message : 'Failed to download schema file'
	}
}

const downloadInstructions = async () => {
	try {
		const url = generateOcsUrl('/apps/agora/api/v1.0/templates/instructions')
		const response = await axios.get(url)

		if (response.data?.ocs?.data?.error) {
			throw new Error(response.data.ocs.data.error)
		}

		const instructions = response.data.ocs.data.content
		const blob = new Blob([instructions], { type: 'text/markdown' })
		const downloadUrl = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = downloadUrl
		a.download = response.data.ocs.data.filename || 'agora-template-instructions.md'
		document.body.appendChild(a)
		a.click()
		window.URL.revokeObjectURL(downloadUrl)
		document.body.removeChild(a)
	} catch (error) {
		console.error('Failed to download instructions:', error)
		uploadError.value = error instanceof Error ? error.message : 'Failed to download instructions file'
	}
}

const toggleHelp = () => {
	showHelp.value = !showHelp.value
}
</script>

<template>
	<div class="template-selection">
		<div class="template-header">
			<h2>{{ t('agora', 'Select a Template') }}</h2>
			<p v-if="wizardStore.selectedUseCase === 'custom'" class="subtitle">
				{{ t('agora', 'Choose a pre-configured template or upload your own') }}
			</p>
			<p v-else class="subtitle">
				{{ t('agora', 'Choose a pre-configured template for your use case') }}
			</p>
		</div>

		<!-- Custom Template Upload Section - Only for Custom Setup -->
		<div v-if="wizardStore.selectedUseCase === 'custom'" class="upload-section">
			<NcButton
				type="secondary"
				@click="triggerFileUpload">
				<template #icon>
					<span class="icon-upload" />
				</template>
				{{ t('agora', 'Upload Custom Template') }}
			</NcButton>
			<input
				ref="fileInput"
				type="file"
				accept="application/json,.json"
				style="display: none"
				@change="handleFileUpload">

			<NcNoteCard v-if="uploadError" type="error" class="upload-error">
				{{ uploadError }}
			</NcNoteCard>

			<NcNoteCard v-if="wizardStore.customTemplate" type="success" class="upload-success">
				{{ t('agora', 'Custom template loaded: {name}', { name: wizardStore.customTemplate.template_info.name }) }}
			</NcNoteCard>

			<!-- Help Section for Creating Templates -->
			<div class="help-section">
				<NcButton
					type="tertiary"
					@click="toggleHelp">
					<template #icon>
						<span :class="showHelp ? 'icon-triangle-s' : 'icon-triangle-e'" />
					</template>
					{{ t('agora', 'Need help creating a template?') }}
				</NcButton>

				<div v-if="showHelp" class="help-content">
					<NcNoteCard type="info">
						<p>{{ t('agora', 'Use AI assistants like ChatGPT, Claude, Gemini, or local LLMs to generate custom templates.') }}</p>
					</NcNoteCard>

					<div class="help-actions">
						<NcButton
							type="primary"
							@click="downloadSchema">
							<template #icon>
								<span class="icon-download" />
							</template>
							{{ t('agora', 'Download Schema') }}
						</NcButton>

						<NcButton
							type="secondary"
							@click="downloadInstructions">
							<template #icon>
								<span class="icon-info" />
							</template>
							{{ t('agora', 'Download Instructions') }}
						</NcButton>
					</div>

					<div class="help-instructions">
						<h4>{{ t('agora', 'Quick Guide:') }}</h4>
						<ol>
							<li>{{ t('agora', 'Download the schema and instructions above') }}</li>
							<li>{{ t('agora', 'Open your preferred AI assistant (ChatGPT, Claude, Gemini, or local LLM)') }}</li>
							<li>{{ t('agora', 'Provide the schema and describe your use case') }}</li>
							<li>{{ t('agora', 'Copy the generated JSON and save it as a .json file') }}</li>
							<li>{{ t('agora', 'Upload the file using the button above') }}</li>
						</ol>

						<h4>{{ t('agora', 'Recommended AI Tools:') }}</h4>
						<ul class="ai-list">
							<li><strong>ChatGPT:</strong> {{ t('agora', 'Best for complex templates with many types') }}</li>
							<li><strong>Claude:</strong> {{ t('agora', 'Best for detailed, well-structured templates') }}</li>
							<li><strong>Gemini:</strong> {{ t('agora', 'Best for multilingual templates') }}</li>
							<li><strong>Local LLMs:</strong> {{ t('agora', 'Best for privacy-sensitive use cases (Ollama, LM Studio)') }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div v-if="wizardStore.selectedUseCase === 'custom' && !wizardStore.customTemplate" class="divider">
			<span>{{ t('agora', 'or choose from catalog') }}</span>
		</div>

		<NcLoadingIcon v-if="isLoading && !wizardStore.customTemplate" :size="64" />

		<NcEmptyContent
			v-else-if="templates.length === 0 && !wizardStore.customTemplate"
			:name="t('agora', 'No templates available')"
			:description="t('agora', 'Please check your installation or upload a custom template')">
			<template #icon>
				<span class="icon-folder" />
			</template>
		</NcEmptyContent>

		<div v-else-if="!wizardStore.customTemplate" class="template-list">
			<div
				v-for="template in templates"
				:key="template.name"
				class="template-card"
				:class="{ selected: wizardStore.selectedTemplate?.name === template.name }"
				@click="selectTemplate(template)">
				<div class="template-card-header">
					<h3 class="template-name">
						{{ template.name }}
					</h3>
					<span class="template-version">v{{ template.version }}</span>
				</div>

				<p class="template-description">{{ template.description }}</p>

				<div class="template-meta">
					<div class="meta-item">
						<span class="meta-label">{{ t('agora', 'Author:') }}</span>
						<span class="meta-value">{{ template.author }}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">{{ t('agora', 'Languages:') }}</span>
						<span class="meta-value">{{ template.available_languages.join(', ') }}</span>
					</div>
				</div>

				<div class="template-stats">
					<div class="stat-item">
						<span class="stat-value">{{ template.counts.inquiry_families }}</span>
						<span class="stat-label">{{ t('agora', 'Families') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-value">{{ template.counts.inquiry_types }}</span>
						<span class="stat-label">{{ t('agora', 'Types') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-value">{{ template.counts.inquiry_statuses }}</span>
						<span class="stat-label">{{ t('agora', 'Statuses') }}</span>
					</div>
					<div class="stat-item">
						<span class="stat-value">{{ template.counts.categories }}</span>
						<span class="stat-label">{{ t('agora', 'Categories') }}</span>
					</div>
				</div>

				<div v-if="wizardStore.selectedTemplate?.name === template.name" class="selected-badge">
					<span class="check-icon">✓</span>
					{{ t('agora', 'Selected') }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.template-selection {
	padding: 20px;
}

.template-header {
	text-align: center;
	margin-bottom: 30px;

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

.upload-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	margin-bottom: 20px;
	padding: 20px;
	background: var(--color-background-hover);
	border-radius: var(--border-radius-large);

	.upload-error,
	.upload-success {
		width: 100%;
		max-width: 600px;
	}
}

.help-section {
	width: 100%;
	max-width: 700px;
	margin-top: 20px;
}

.help-content {
	margin-top: 16px;
	padding: 20px;
	background: var(--color-main-background);
	border-radius: var(--border-radius-large);
	border: 1px solid var(--color-border);
}

.help-actions {
	display: flex;
	gap: 12px;
	justify-content: center;
	margin: 16px 0;
}

.help-instructions {
	text-align: left;
	margin-top: 20px;

	h4 {
		font-size: 14px;
		font-weight: 600;
		margin: 16px 0 8px 0;
		color: var(--color-main-text);
	}

	ol, ul {
		margin: 8px 0;
		padding-left: 24px;

		li {
			margin: 6px 0;
			font-size: 13px;
			color: var(--color-text-maxcontrast);
		}
	}

	.ai-list {
		list-style: none;
		padding-left: 0;

		li {
			margin: 10px 0;
			padding-left: 12px;

			strong {
				color: var(--color-main-text);
			}
		}
	}
}

.divider {
	text-align: center;
	margin: 30px 0;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 1px;
		background: var(--color-border);
		z-index: 0;
	}

	span {
		background: var(--color-main-background);
		padding: 0 16px;
		color: var(--color-text-maxcontrast);
		font-size: 13px;
		position: relative;
		z-index: 1;
	}
}

.template-list {
	display: grid;
	gap: 16px;
	max-width: 800px;
	margin: 0 auto;
}

.template-card {
	background: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	padding: 20px;
	cursor: pointer;
	transition: all 0.2s ease;
	position: relative;

	&:hover {
		border-color: var(--color-primary-element);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	&.selected {
		border-color: var(--color-primary-element);
		border-width: 3px;
		box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);
	}
}

.template-card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 12px;
}

.template-name {
	font-size: 18px;
	font-weight: 600;
	margin: 0;
}

.template-version {
	font-size: 12px;
	color: var(--color-text-maxcontrast);
	background: var(--color-background-dark);
	padding: 2px 8px;
	border-radius: var(--border-radius-pill);
}

.template-description {
	color: var(--color-text-maxcontrast);
	font-size: 14px;
	margin-bottom: 16px;
}

.template-meta {
	margin-bottom: 16px;
	padding-bottom: 16px;
	border-bottom: 1px solid var(--color-border);
}

.meta-item {
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	font-size: 13px;
}

.meta-label {
	font-weight: 600;
	margin-right: 8px;
	min-width: 80px;
}

.meta-value {
	color: var(--color-text-maxcontrast);
}

.template-stats {
	display: flex;
	gap: 20px;
	justify-content: space-around;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.stat-value {
	font-size: 24px;
	font-weight: 600;
	color: var(--color-primary-element);
}

.stat-label {
	font-size: 12px;
	color: var(--color-text-maxcontrast);
	margin-top: 4px;
}

.selected-badge {
	position: absolute;
	top: 16px;
	right: 16px;
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
