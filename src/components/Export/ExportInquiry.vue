<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Sheet, WorkBook, utils as xlsxUtils, write as xlsxWrite } from 'xlsx';
import DOMPurify from 'dompurify';
import { saveAs } from 'file-saver';
import { t } from '@nextcloud/l10n';
import { showError } from '@nextcloud/dialogs';

import NcActions from '@nextcloud/vue/components/NcActions';
import NcActionButton from '@nextcloud/vue/components/NcActionButton';

import ExcelIcon from 'vue-material-design-icons/MicrosoftExcel.vue';
import FileTableIcon from 'vue-material-design-icons/FileTableOutline.vue';
import CsvIcon from 'vue-material-design-icons/FileDelimited.vue';
import XmlIcon from 'vue-material-design-icons/Xml.vue';
import ExportIcon from 'vue-material-design-icons/FileDownloadOutline.vue';

import { ApiEmailAdressList, InquiriesAPI } from '../../Api/index.ts';
import { useInquiryStore } from '../../stores/inquiry.ts';
import { Option, useOptionsStore } from '../../stores/options.ts';
import { AxiosError } from '@nextcloud/axios';
import { DateTime, Interval } from 'luxon';

type ExportFormat = 'html' | 'xlsx' | 'ods' | 'csv';

const route = useRoute();
const inquiryStore = useInquiryStore();
const optionsStore = useOptionsStore();

const regex = /[:\\/?*[\]]/g;

const workBook = ref<null | WorkBook>(null);
const sheetData = ref<Sheet>([]);
const emailAddresses = ref<ApiEmailAdressList[]>([]);
const sheetName = computed(() =>
  inquiryStore.title.replaceAll(regex, '').slice(0, 31)
);

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length); // convert s to arrayBuffer
  const view = new Uint8Array(buf); // create uint8array as viewer
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  } // convert to octet
  return buf;
}

/**
 *
 * @param exportFormat - export type
 */
async function exportFile(exportFormat: ExportFormat) {
  const participantsHeader = [t('agora', 'Participants')];
  const fromHeader = [t('agora', 'From')];
  const toHeader = [t('agora', 'To')];
  workBook.value = xlsxUtils.book_new();
  workBook.value.SheetNames.push(sheetName.value);
  sheetData.value = [];

  if (['html', 'xlsx', 'ods'].includes(exportFormat)) {
    sheetData.value.push(
      [DOMPurify.sanitize(inquiryStore.title)],
      [DOMPurify.sanitize(inquiryStore.description)]
    );
  }

  if (inquiryStore.permissions.edit) {
    try {
      participantsHeader.push(t('agora', 'Email address'));
      fromHeader.push('');
      toHeader.push('');
      const response = await InquiriesAPI.getParticipantsEmailAddresses(
        route.params.id
      );
      emailAddresses.value = response.data;
    } catch (error) {
      if ((error as AxiosError).name === 'CanceledError') {
        return;
      }
    }
  }

  if (inquiryStore.type === 'textInquiry') {
    if (['html'].includes(exportFormat)) {
      sheetData.value.push([
        ...participantsHeader,
        ...optionsStore.options.map((item) => DOMPurify.sanitize(item.text))
      ]);
    } else {
      sheetData.value.push([
        ...participantsHeader,
        ...optionsStore.options.map((item) => item.text)
      ]);
    }
  } else if (['csv'].includes(exportFormat)) {
    sheetData.value.push([
      ...participantsHeader,
      ...optionsStore.options.map((option) => getIntervalIso(option))
    ]);
  } else if (['html'].includes(exportFormat)) {
    sheetData.value.push([
      ...participantsHeader,
      ...optionsStore.options.map((option) => getIntervalRaw(option))
    ]);
  } else {
    sheetData.value.push([
      ...fromHeader,
      ...optionsStore.options.map((option) => getFromFormatted(option))
    ]);
    sheetData.value.push([
      ...toHeader,
      ...optionsStore.options.map((option) => getToFormatted(option))
    ]);
  }

  if (['html', 'ods', 'xlsx'].includes(exportFormat)) {
    addInquiriessArray('symbols');
  } else if (['csv'].includes(exportFormat)) {
    addInquiriesArray('raw');
  } else {
    addInquiriesArray('generic');
  }
  try {
    const workBookOutput = xlsxWrite(workBook.value, {
      bookType: exportFormat,
      type: 'binary'
    });
    saveAs(
      new Blob([s2ab(workBookOutput)], { type: 'application/octet-stream' }),
      `inquiryStore.${exportFormat}`
    );
  } catch (error) {
    console.error(error);
    showError(t('agora', 'Error exporting file.'));
  }
}

/**
 * Get the interval in ISO format (slightly modified)
 * @param option - option
 */
function getIntervalIso(option: Option): string {
  return Interval.fromDateTimes(
    DateTime.fromSeconds(option.timestamp).toUTC(),
    DateTime.fromSeconds(option.timestamp)
      .plus({ seconds: option.duration })
      .toUTC()
  )
    .toISO()
    .replace('/', ' - ');
}

/**
 * Get the interval in local format
 * @param option - option
 */
function getIntervalRaw(option: Option): string {
  return Interval.fromDateTimes(
    DateTime.fromSeconds(option.timestamp),
    DateTime.fromSeconds(option.timestamp).plus({ seconds: option.duration })
  ).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
}

/**
 * Get the start date in local format
 * @param option - option
 */
function getFromFormatted(option: Option): string {
  return DateTime.fromSeconds(option.timestamp).toLocaleString(
    DateTime.DATETIME_MED_WITH_WEEKDAY
  );
}

/**
 * Get the end date in local format
 * @param option - option
 */
function getToFormatted(option: Option): string {
  return DateTime.fromSeconds(option.timestamp)
    .plus({ seconds: option.duration })
    .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
}
</script>

<template>
  <NcActions>
    <template #icon>
      <ExportIcon />
    </template>
    <NcActionButton
      close-after-click
      :name="t('agora', 'Download Excel spreadsheet')"
      :aria-label="t('agora', 'Download Excel spreadsheet')"
      @click="exportFile('xlsx')"
    >
      <template #icon>
        <ExcelIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      close-after-click
      :name="t('agora', 'Download Open Document spreadsheet')"
      :aria-label="t('agora', 'Download Open Document spreadsheet')"
      @click="exportFile('ods')"
    >
      <template #icon>
        <FileTableIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      close-after-click
      :name="t('agora', 'Download CSV file')"
      ::aria-label="t('agora', 'Download CSV file')"
      @click="exportFile('csv')"
    >
      <template #icon>
        <CsvIcon />
      </template>
    </NcActionButton>

    <NcActionButton
      close-after-click
      :name="t('agora', 'Download HTML file')"
      :aria-label="t('agora', 'Download HTML file')"
      @click="exportFile('html')"
    >
      <template #icon>
        <XmlIcon />
      </template>
    </NcActionButton>
  </NcActions>
</template>
