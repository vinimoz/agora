<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { NcNoteCard } from '@nextcloud/vue'
import { useTemplateWizardStore } from '../../../stores/templateWizard'

const wizardStore = useTemplateWizardStore()

const availableLanguages = computed(() => wizardStore.availableLanguages)

const languageNames: Record<string, string> = {
	en: t('agora', 'English'),
	fr: t('agora', 'French'),
	de: t('agora', 'German'),
	gsw: t('agora', 'Swiss German'),
	it: t('agora', 'Italian'),
	es: t('agora', 'Spanish'),
	pt: t('agora', 'Portuguese'),
	nl: t('agora', 'Dutch'),
}

const getLanguageName = (code: string): string => {
	return languageNames[code] || code.toUpperCase()
}

const selectLanguage = (language: string) => {
	wizardStore.selectLanguage(language)
}
</script>

<template>
	<div class="language-selection">
		<div class="language-header">
			<h2>{{ t('agora', 'Choose Your Language') }}</h2>
			<p class="subtitle">
				{{ t('agora', 'Select the language for your template content') }}
			</p>
		</div>

		<NcNoteCard type="info" class="language-note">
			<p>
				{{ t('agora', 'Only the selected language will be imported into the database. The template contains embedded translations, but you must choose which language to use for your instance.') }}
			</p>
		</NcNoteCard>

		<div class="language-grid">
			<div
				v-for="lang in availableLanguages"
				:key="lang"
				class="language-card"
				:class="{ selected: wizardStore.selectedLanguage === lang }"
				@click="selectLanguage(lang)">
				<div class="language-flag">
					{{ lang.toUpperCase() }}
				</div>
				<div class="language-name">
					{{ getLanguageName(lang) }}
				</div>
				<div v-if="wizardStore.selectedLanguage === lang" class="selected-check">
					✓
				</div>
			</div>
		</div>

		<div v-if="wizardStore.selectedLanguage" class="selection-summary">
			<strong>{{ t('agora', 'Selected:') }}</strong>
			{{ getLanguageName(wizardStore.selectedLanguage) }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.language-selection {
	padding: 20px;
	max-width: 800px;
	margin: 0 auto;
}

.language-header {
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

.language-note {
	margin-bottom: 30px;
}

.language-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 16px;
	margin-bottom: 30px;
}

.language-card {
	background: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	padding: 24px 16px;
	text-align: center;
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
		background: var(--color-primary-element-light);
		box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);
	}
}

.language-flag {
	font-size: 32px;
	font-weight: 700;
	color: var(--color-primary-element);
	margin-bottom: 8px;
}

.language-name {
	font-size: 14px;
	font-weight: 600;
}

.selected-check {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 24px;
	height: 24px;
	background: var(--color-primary-element);
	color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
}

.selection-summary {
	text-align: center;
	padding: 16px;
	background: var(--color-background-dark);
	border-radius: var(--border-radius);
	font-size: 16px;

	strong {
		margin-right: 8px;
	}
}
</style>
