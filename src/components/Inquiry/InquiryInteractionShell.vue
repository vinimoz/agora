<template>
  <NcAppSidebar
    v-if="target === 'panel' && isOpen"
    :name="inquiry?.title || t('agora', 'Inquiry')"
    @close="close"
  >
    <InquiryEditViewForm :is-readonly="false" />
  </NcAppSidebar>

  <NcDialog
    v-else-if="(target === 'dialog' || target === 'modal') && isOpen"
    :name="inquiry?.title || t('agora', 'Inquiry')"
    size="large"
    @closing="close"
  >
    <InquiryEditViewForm :is-readonly="false" />
    <template #actions>
      <NcButton type="primary" @click="close">
        {{ t('agora', 'Done') }}
      </NcButton>
    </template>
  </NcDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NcAppSidebar from '@nextcloud/vue/components/NcAppSidebar'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import NcButton from '@nextcloud/vue/components/NcButton'
import InquiryEditViewForm from './InquiryEditViewForm.vue'

const isOpen = ref(false)
const target = ref<'panel' | 'dialog' | 'modal'>('dialog')
const inquiry = ref<any>(null)

function open(payload: { inquiry: any; target: 'panel' | 'dialog' | 'modal' }) {
  inquiry.value = payload.inquiry
  target.value = payload.target
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

defineExpose({ open, close })
</script>
