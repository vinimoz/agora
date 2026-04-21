<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcDialog
    :open="visible"
    :name="dialogTitle"
    :close-on-click-outside="false"
    @update:open="handleClose"
  >
    <div class="delete-confirmation-content">
      <p>{{ message }}</p>
      <p v-if="isImported" class="imported-warning">
        {{ t('agora', 'This option was imported from another view. Removing it from this view will keep it available elsewhere.') }}
      </p>
    </div>
    
    <template #actions>
      <NcButton @click="handleCancel">
        {{ t('agora', 'Cancel') }}
      </NcButton>
      <NcButton v-if="isImported" @click="handleRemoveFromView">
        {{ t('agora', 'Remove from this view') }}
      </NcButton>
      <NcButton type="error" @click="handleConfirm">
        {{ isImported ? t('agora', 'Delete permanently') : t('agora', 'Delete') }}
      </NcButton>
    </template>
  </NcDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import NcButton from '@nextcloud/vue/components/NcButton'

interface Props {
  visible: boolean
  optionTitle?: string
  isImported?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  optionTitle: '',
  isImported: false,
  viewType: 'view'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  removeFromView: []
  'update:visible': [value: boolean]
}>()

const dialogTitle = computed(() => 
  props.isImported 
    ? t('agora', 'Imported Option Action')
    : t('agora', 'Delete Option')
)

const message = computed(() => {
  if (props.isImported) {
    return t('agora', 'What would you like to do with "{option}"?', { option: props.optionTitle })
  }
  return t('agora', 'Are you sure you want to delete "{option}"?', { option: props.optionTitle })
})

const handleConfirm = () => {
  emit('confirm')
  emit('update:visible', false)
}

const handleRemoveFromView = () => {
  emit('removeFromView')
  emit('update:visible', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

const handleClose = (value: boolean) => {
  if (!value) {
    emit('cancel')
  }
  emit('update:visible', value)
}
</script>

<style scoped lang="scss">
.delete-confirmation-content {
  padding: 8px 0;
  
  .imported-warning {
    margin-top: 12px;
    padding: 8px;
    background: var(--color-warning-light, rgba(255, 193, 7, 0.1));
    border-left: 3px solid var(--color-warning, #ffc107);
    font-size: 0.9em;
    color: var(--color-text-light);
  }
}
</style>
