/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { Logger } from '../helpers/index.ts'

export interface TemplateMetadata {
	path: string
	filename: string
	name: string
	version: string
	description: string
	author: string
	use_case: string
	available_languages: string[]
	counts: {
		inquiry_families: number
		inquiry_types: number
		inquiry_statuses: number
		option_types: number
		inquiry_group_types: number
		categories: number
		locations: number
	}
	total_items: number
}

export interface TemplateContent {
	template_info: {
		name: string
		version: string
		description?: string
		author?: string
		use_case?: string
		available_languages: string[]
	}
	inquiry_families?: unknown[]
	inquiry_types?: unknown[]
	inquiry_statuses?: unknown[]
	categories?: unknown[]
	locations?: unknown[]
	option_types?: unknown[]
	inquiry_group_types?: unknown[]
}

export interface Template extends TemplateMetadata {
	content?: TemplateContent
}

export type WizardStep =
	| 'use-case'
	| 'template-selection'
	| 'language'
	| 'preview'
	| 'customization'
	| 'summary'
	| 'importing'
	| 'results'

export type UseCase = 'citizen_participation' | 'enterprise' | 'education' | 'custom'

export interface ImportResult {
	success: string[]
	skipped: string[]
	failed: string[]
}

export interface WizardState {
	isOpen: boolean
	currentStep: WizardStep
	steps: WizardStep[]
	templates: Template[]
	loadingTemplates: boolean
	selectedUseCase: UseCase | null
	selectedTemplate: Template | null
	selectedLanguage: string | null
	customTemplate: TemplateContent | null
	editableData: TemplateContent | null
	importing: boolean
	importResult: ImportResult | null
	importError: string | null
	isDatabaseEmpty: boolean | null
}

type EditableSection =
	| 'inquiry_families'
	| 'inquiry_types'
	| 'inquiry_statuses'
	| 'option_types'
	| 'inquiry_group_types'
	| 'categories'
	| 'locations'

export const useTemplateWizardStore = defineStore('templateWizard', {
	state: (): WizardState => ({
		isOpen: false,
		currentStep: 'use-case',
		steps: ['use-case', 'template-selection', 'language', 'preview', 'summary', 'importing', 'results'],
		templates: [],
		loadingTemplates: false,
		selectedUseCase: null,
		selectedTemplate: null,
		selectedLanguage: null,
		customTemplate: null,
		editableData: null,
		importing: false,
		importResult: null,
		importError: null,
		isDatabaseEmpty: null,
	}),

	getters: {
		currentStepIndex(state): number {
			return state.steps.indexOf(state.currentStep)
		},

		canGoNext(state): boolean {
			switch (state.currentStep) {
				case 'use-case':
					return state.selectedUseCase !== null
				case 'template-selection':
					return state.selectedTemplate !== null || state.customTemplate !== null
				case 'language':
					return state.selectedLanguage !== null
				case 'preview':
					return state.editableData !== null
				case 'summary':
					return true
				default:
					return false
			}
		},

		canGoPrevious(state): boolean {
			return state.steps.indexOf(state.currentStep) > 0 && !state.importing
		},

		availableTemplates(state): Template[] {
			if (!state.selectedUseCase) return state.templates
			if (state.selectedUseCase === 'custom') {
				return state.templates.filter((t) => {
					const useCase = t.use_case || ''
					return !useCase.startsWith('citizen_')
						&& !useCase.startsWith('default_')
						&& !useCase.startsWith('enterprise_')
						&& !useCase.startsWith('business_')
						&& !useCase.startsWith('education_')
						&& !useCase.startsWith('research_')
				})
			}
			if (state.selectedUseCase === 'citizen_participation') {
				return state.templates.filter((t) => {
					const useCase = t.use_case || ''
					return useCase.startsWith('citizen_') || useCase.startsWith('default_')
				})
			}
			if (state.selectedUseCase === 'enterprise') {
				return state.templates.filter((t) => {
					const useCase = t.use_case || ''
					return useCase.startsWith('enterprise_') || useCase.startsWith('business_')
				})
			}
			if (state.selectedUseCase === 'education') {
				return state.templates.filter((t) => {
					const useCase = t.use_case || ''
					return useCase.startsWith('education_') || useCase.startsWith('research_')
				})
			}
			return state.templates
		},

		availableLanguages(state): string[] {
			if (state.selectedTemplate?.content) {
				return state.selectedTemplate.content.template_info.available_languages || []
			}
			if (state.customTemplate) {
				return state.customTemplate.template_info.available_languages || []
			}
			return []
		},
	},

	actions: {
		async loadTemplates() {
			this.loadingTemplates = true
			try {
				const url = generateOcsUrl('/apps/agora/api/v1.0/templates')
				const response = await axios.get(url)
				const raw = (response.data as { ocs?: { data?: unknown } })?.ocs?.data
				this.templates = Array.isArray(raw)
					? raw.filter((item): item is Template => {
							return typeof item === 'object'
								&& item !== null
								&& typeof (item as { name?: unknown }).name === 'string'
					  })
					: []
				Logger.info('Loaded templates', { count: this.templates.length })
			} catch (error) {
				Logger.error('Failed to load templates', { error: String(error) })
				throw error
			} finally {
				this.loadingTemplates = false
			}
		},

		async loadTemplateDetails(identifier: string) {
			try {
				const url = generateOcsUrl(`/apps/agora/api/v1.0/templates/${identifier}`)
				const response = await axios.get(url)
				const raw = (response.data as { ocs?: { data?: unknown } })?.ocs?.data
				this.selectedTemplate =
					typeof raw === 'object' && raw !== null && typeof (raw as { name?: unknown }).name === 'string'
						? (raw as Template)
						: null
			} catch (error) {
				Logger.error('Failed to load template details', { error: String(error) })
				throw error
			}
		},

		async checkDatabaseEmpty() {
			try {
				const url = generateOcsUrl('/apps/agora/api/v1.0/templates/check-empty')
				const response = await axios.get(url)
				const raw = (response.data as { ocs?: { data?: { empty?: unknown } } })?.ocs?.data
				this.isDatabaseEmpty = raw?.empty === true
			} catch (error) {
				Logger.error('Failed to check database', { error: String(error) })
				throw error
			}
		},

		async importTemplate() {
			if (!this.editableData) throw new Error('No editable data available')
			if (!this.selectedLanguage) throw new Error('No language selected')

			this.importing = true
			this.importError = null
			this.currentStep = 'importing'

			try {
				const url = generateOcsUrl('/apps/agora/api/v1.0/templates/import-data')
				const response = await axios.post(url, {
					templateData: this.editableData,
					language: this.selectedLanguage,
				})
				const raw = (response.data as { ocs?: { data?: { results?: unknown } } })?.ocs?.data
				const results = raw?.results
				this.importResult =
					typeof results === 'object' && results !== null
						? (results as ImportResult)
						: { success: [], skipped: [], failed: [] }
				this.currentStep = 'results'
			} catch (error) {
				this.importError = error instanceof Error ? error.message : 'Unknown error'
				Logger.error('Import failed', { error: String(error) })
				throw error
			} finally {
				this.importing = false
			}
		},

		async validateTemplate(template: TemplateContent) {
			try {
				const url = generateOcsUrl('/apps/agora/api/v1.0/templates/validate')
				const response = await axios.post(url, { template })
				return (response.data as { ocs?: { data?: unknown } })?.ocs?.data
			} catch (error) {
				Logger.error('Template validation failed', { error: String(error) })
				throw error
			}
		},

		openWizard() {
			this.isOpen = true
			this.currentStep = 'use-case'
			this.loadTemplates()
			this.checkDatabaseEmpty()
		},

		closeWizard() {
			this.isOpen = false
			this.reset()
		},

		nextStep() {
			const currentIndex = this.currentStepIndex
			if (currentIndex < this.steps.length - 1) {
				const nextStep = this.steps[currentIndex + 1]
				if (nextStep === 'preview' && this.selectedLanguage) {
					this.prepareEditableData()
				}
				this.currentStep = nextStep
			}
		},

		previousStep() {
			const currentIndex = this.currentStepIndex
			if (currentIndex > 0) {
				this.currentStep = this.steps[currentIndex - 1]
			}
		},

		goToStep(step: WizardStep) {
			this.currentStep = step
		},

		selectUseCase(useCase: UseCase) {
			this.selectedUseCase = useCase
		},

		async selectTemplate(template: Template) {
			this.selectedTemplate = template
			this.customTemplate = null
			if (!template.content) {
				await this.loadTemplateDetails(template.name)
			}
		},

		selectLanguage(language: string) {
			this.selectedLanguage = language
		},

		uploadCustomTemplate(template: TemplateContent) {
			this.customTemplate = template
			this.selectedTemplate = null
		},

		prepareEditableData() {
			const template = this.selectedTemplate?.content || this.customTemplate
			if (!template || !this.selectedLanguage) {
				Logger.error('Cannot prepare editable data: missing template or language')
				return
			}
			const cloned = JSON.parse(JSON.stringify(template)) as TemplateContent
			this.editableData = this.extractLanguageText(cloned, this.selectedLanguage)
		},

		extractLanguageText(template: TemplateContent, language: string): TemplateContent {
			return {
				template_info: template.template_info,
				inquiry_families: this.extractSection(template.inquiry_families, language),
				inquiry_types: this.extractSection(template.inquiry_types, language),
				inquiry_statuses: this.extractSection(template.inquiry_statuses, language),
				option_types: this.extractSection(template.option_types, language),
				inquiry_group_types: this.extractSection(template.inquiry_group_types, language),
				categories: this.extractSection(template.categories, language),
				locations: this.extractSection(template.locations, language),
			}
		},

		extractSection(section: unknown, language: string): unknown[] {
			if (!Array.isArray(section)) return []
			return section.map((item) => this.extractLanguageValue(item, language))
		},

		extractLanguageValue(value: unknown, language: string): unknown {
			if (value === null || value === undefined) return value
			if (typeof value === 'string') return value
			if (typeof value === 'number' || typeof value === 'boolean') return value

			if (Array.isArray(value)) {
				return value.map((entry) => this.extractLanguageValue(entry, language))
			}

			if (typeof value === 'object') {
				const obj = value as Record<string, unknown>
				if (this.isMultiLangObject(obj)) {
					return this.pickLanguage(obj, language)
				}
				const out: Record<string, unknown> = {}
				for (const [key, sub] of Object.entries(obj)) {
					out[key] = this.extractLanguageValue(sub, language)
				}
				return out
			}

			return value
		},

		isMultiLangObject(obj: Record<string, unknown>): boolean {
			const keys = Object.keys(obj)
			if (keys.length === 0) return false
			const langKeys = ['en', 'fr', 'de', 'gsw', 'it', 'es', 'pt', 'nl', 'ru', 'zh', 'ja', 'ko']
			if (!keys.some((k) => langKeys.includes(k))) return false
			return keys.every((k) => langKeys.includes(k) && typeof obj[k] === 'string')
		},

		pickLanguage(obj: Record<string, unknown>, language: string): string {
			const direct = obj[language]
			if (typeof direct === 'string' && direct !== '') return direct
			const en = obj.en
			if (typeof en === 'string' && en !== '') return en
			for (const value of Object.values(obj)) {
				if (typeof value === 'string' && value !== '') return value
			}
			return ''
		},

		updateEditableItem(section: EditableSection, index: number, updatedItem: unknown) {
			const arr = this.editableData?.[section]
			if (Array.isArray(arr)) arr[index] = updatedItem
		},

		removeEditableItem(section: EditableSection, index: number) {
			const arr = this.editableData?.[section]
			if (Array.isArray(arr)) arr.splice(index, 1)
		},

		addEditableItem(section: EditableSection, item: unknown) {
			if (!this.editableData) return
			const arr = this.editableData[section]
			if (!Array.isArray(arr)) {
				this.editableData[section] = [item]
			} else {
				arr.push(item)
			}
		},

		reset() {
			this.currentStep = 'use-case'
			this.selectedUseCase = null
			this.selectedTemplate = null
			this.selectedLanguage = null
			this.customTemplate = null
			this.editableData = null
			this.importing = false
			this.importResult = null
			this.importError = null
		},
	},
})
