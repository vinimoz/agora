<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcModal
    :show="show"
    size="normal"
    @close="handleClose"
  >
    <div class="modal-content">
      <div class="export-header">
        <component :is="InquiryGeneralIcons.Export" :size="48" class="header-icon" />
        <h2>{{ t('agora', 'Export results') }}</h2>
        <p>{{ t('agora', 'Export voting results in your preferred format') }}</p>
      </div>

      <div class="form-group">
        <label>{{ t('agora', 'Export format') }}</label>
        <NcSelect
          v-model="exportFormat"
          :options="exportFormats"
          :input-label="t('agora', 'Select format')"
        />
      </div>

      <div class="form-group">
        <label>{{ t('agora', 'Options') }}</label>
        <div class="checkbox-group">
          <NcCheckboxRadioSwitch v-model="includeMetadata" type="switch">
            {{ t('agora', 'Include metadata') }}
          </NcCheckboxRadioSwitch>
          <NcCheckboxRadioSwitch v-model="includeTimestamps" type="switch">
            {{ t('agora', 'Include timestamps') }}
          </NcCheckboxRadioSwitch>
        </div>
      </div>

      <div class="modal-actions">
        <NcButton type="tertiary" @click="handleClose">
          {{ t('agora', 'Cancel') }}
        </NcButton>
        <NcButton
          type="primary"
          :loading="exporting"
          @click="exportResults"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.Download" :size="20" />
          </template>
          {{ t('agora', 'Export') }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { InquiryGeneralIcons} from '../../../utils/icons.ts'

interface Props {
  show: boolean
  // inquiryId: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  exported: []
}>()

const exporting = ref(false)
const exportFormat = ref('csv')
const includeMetadata = ref(true)
const includeTimestamps = ref(true)

const exportFormats = [
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'pdf', label: 'PDF' },
]

const exportResults = async () => {
  exporting.value = true
  
  try {
    // TODO: Call actual export API
    // await exportService.exportResults({
    //   inquiryId: props.inquiryId,
    //   format: exportFormat.value,
    //   includeMetadata: includeMetadata.value,
    //   includeTimestamps: includeTimestamps.value
    // })
    
    // Simulate API call
   // await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccess(t('agora', 'To be implemented, results exported successfully as {format}', { 
      format: exportFormat.value.toUpperCase() 
    }))
    
    emit('exported')
    handleClose()
  } catch (error) {
    console.error('Export failed:', error)
    showError(t('agora', 'Failed to export results'))
  } finally {
    exporting.value = false
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modal-content {
  padding: 24px;
  min-width: 450px;
}

.export-header {
  text-align: center;
  margin-bottom: 32px;

  .header-icon {
    color: var(--color-primary-element);
    margin-bottom: 16px;
  }

  h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: var(--color-text-lighter);
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--color-main-text);
  }
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
</style>
