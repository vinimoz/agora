<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import type { AxiosError } from '@nextcloud/axios'
import type { Sheet, WorkBook } from 'xlsx'
import type { ApiEmailAdressList } from '../../Api/index.ts'

import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import DOMPurify from 'dompurify'
import { saveAs } from 'file-saver'
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { utils as xlsxUtils, write as xlsxWrite } from 'xlsx'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import CsvIcon from 'vue-material-design-icons/FileDelimitedOutline.vue'
import ExportIcon from 'vue-material-design-icons/FileDownloadOutline.vue'
import FileTableIcon from 'vue-material-design-icons/FileTableOutline.vue'
import ExcelIcon from 'vue-material-design-icons/MicrosoftExcel.vue'
import XmlIcon from 'vue-material-design-icons/Xml.vue'
import { InquiriesAPI } from '../../Api/index.ts'
import { useOptionsStore } from '../../stores/options.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { Logger } from '../../helpers/modules/logger'

type ArrayStyle = 'symbols' | 'raw' | 'generic'
type ExportFormat = 'html' | 'xlsx' | 'ods' | 'csv'

const route = useRoute()
const inquiryStore = useInquiryStore()
const inquiriesStore = useInquiriesStore()
const optionsStore = useOptionsStore()

const regex = /[:\\/?*[\]]/g

const workBook = ref<null | WorkBook>(null)
const sheetData = ref<Sheet>([])
const emailAddresses = ref<ApiEmailAdressList[]>([])
const sheetName = computed(() =>
	inquiryStore.configuration.title.replaceAll(regex, '').slice(0, 31),
)

function s2ab(s: string) {
	const buf = new ArrayBuffer(s.length) // convert s to arrayBuffer
	const view = new Uint8Array(buf) // create uint8array as viewer
	for (let i = 0; i < s.length; i++) {
		view[i] = s.charCodeAt(i) & 0xff
	} // convert to octet
	return buf
}

/**
 *
 * @param exportFormat - export type
 */
async function exportFile(exportFormat: ExportFormat) {
	const participantsHeader = [t('agora', 'Participants')]
	const fromHeader = [t('agora', 'From')]
	const toHeader = [t('agora', 'To')]
	workBook.value = xlsxUtils.book_new()
	workBook.value.SheetNames.push(sheetName.value)
	sheetData.value = []

	if (['html', 'xlsx', 'ods'].includes(exportFormat)) {
		sheetData.value.push(
			[DOMPurify.sanitize(inquiryStore.title)],
			[DOMPurify.sanitize(inquiryStore.description)],
		)
	}

	if (inquiryStore.permissions.edit) {
		try {
			participantsHeader.push(t('agora', 'Email address'))
			fromHeader.push('')
			toHeader.push('')
			const response = await InquiriesAPI.getParticipantsEmailAddresses(
				route.params.id,
			)
			emailAddresses.value = response.data
		} catch (error) {
			if ((error as AxiosError).name === 'CanceledError') {
				return
			}
		}
	}

	if (inquiryStore.type === 'textInquiry') {
		if (['html'].includes(exportFormat)) {
			sheetData.value.push([
				...participantsHeader,
				...optionsStore.options.map((item) => DOMPurify.sanitize(item.text)),
			])
		} else {
			sheetData.value.push([
				...participantsHeader,
				...optionsStore.options.map((item) => item.text),
			])
		}
	} else if (['csv'].includes(exportFormat)) {
		sheetData.value.push([
			...participantsHeader,
			...optionsStore.options,
		])
	} else if (['html'].includes(exportFormat)) {
		sheetData.value.push([
			...participantsHeader,
			...optionsStore.options,
		])
	} else {
		sheetData.value.push([
			...fromHeader,
			...optionsStore.options,
		])
		sheetData.value.push([
			...toHeader,
			...optionsStore.options,
		])
	}

	if (['html', 'ods', 'xlsx'].includes(exportFormat)) {
		addInquiriesArray('symbols')
	} else if (['csv'].includes(exportFormat)) {
		addInquiriesArray('raw')
	} else {
		addInquiriesArray('generic')
	}
	try {
		const workBookOutput = xlsxWrite(workBook.value, {
			bookType: exportFormat,
			type: 'binary',
		})
		saveAs(
			new Blob([s2ab(workBookOutput)], { type: 'application/octet-stream' }),
			`inquiryStore.${exportFormat}`,
		)
	} catch (error) {
		Logger.error('Error exporting file.', { error })
		showError(t('agora', 'Error exporting file.'))
	}
}

/**
 *
 * @param style - style
 */
function addInquiriesArray(style: ArrayStyle) {
	if (!workBook.value) {
		return
	}

	inquiriesStore.participants.forEach((participant) => {
		const inquiriesLine = [participant.displayName]
		try {
			if (inquiryStore.permissions.edit) {
				inquiriesLine.push(
					emailAddresses.value.find(
						(item) => item.displayName === participant.displayName,
					)?.emailAddress ?? '',
				)
			}

			optionsStore.options.forEach((option) => {
				if (style === 'symbols') {
					inquiriesLine.push(
						inquiriesStore.getInquiry({
							user: participant,
							option,
						}).answerSymbol ?? '❌',
					)
				} else if (style === 'raw') {
					inquiriesLine.push(
						inquiriesStore.getInquiry({
							user: participant,
							option,
						}).answer,
					)
				} 
			})

			sheetData.value.push(inquiriesLine)
		} catch {
			// just skip this participant
		}
	})

	const workSheet = xlsxUtils.aoa_to_sheet(sheetData.value as unknown[][])
	workBook.value.Sheets[sheetName.value] = workSheet
}
</script>

<template>
	<NcActions>
		<template #icon>
			<ExportIcon />
		</template>
		<NcActionButton
			closeAfterClick
			:name="t('agora', 'Download Excel spreadsheet')"
			:aria-label="t('agora', 'Download Excel spreadsheet')"
			@click="exportFile('xlsx')">
			<template #icon>
				<ExcelIcon />
			</template>
		</NcActionButton>

		<NcActionButton
			closeAfterClick
			:name="t('agora', 'Download Open Document spreadsheet')"
			:aria-label="t('agora', 'Download Open Document spreadsheet')"
			@click="exportFile('ods')">
			<template #icon>
				<FileTableIcon />
			</template>
		</NcActionButton>

		<NcActionButton
			closeAfterClick
			:name="t('agora', 'Download CSV file')"
			::aria-label="t('agora', 'Download CSV file')"
			@click="exportFile('csv')">
			<template #icon>
				<CsvIcon />
			</template>
		</NcActionButton>

		<NcActionButton
			closeAfterClick
			:name="t('agora', 'Download HTML file')"
			:aria-label="t('agora', 'Download HTML file')"
			@click="exportFile('html')">
			<template #icon>
				<XmlIcon />
			</template>
		</NcActionButton>
	</NcActions>
</template>
