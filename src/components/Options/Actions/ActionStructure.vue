<template>
  <ImportDocumentModal
    :show="show"
    :family-key="familyKey"
    :inquiry-id="inquiryId"
    @close="handleClose"
    @imported="handleImported"
  />
</template>

<script setup lang="ts">
import ImportDocumentModal from './ImportDocumentModal.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  show: boolean
  familyKey: string
  inquiryId: number
}

const emit = defineEmits<{
  close: []
  'actionCompleted': [result: unknown]
}>()

const handleClose = () => {
  emit('close')
}

const handleImported = (result: unknown) => {
  emit('actionCompleted', {
    ...result,
    refreshOptions: true,
    message: 'Document imported successfully'
  })
}
</script>
