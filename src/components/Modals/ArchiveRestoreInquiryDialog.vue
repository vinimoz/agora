<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { computed } from 'vue'

import { useSessionStore } from '../../stores/session.ts'
import { Inquiry } from '../../stores/inquiry.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'

import { NcDialog } from '@nextcloud/vue'
import { showError } from '@nextcloud/dialogs'

const model = defineModel<boolean>({ required: true })
const { inquiry } = defineProps<{ inquiry: Inquiry }>()
const emit = defineEmits(['toggle']) 

const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()

const adminAccess = computed(() => !inquiry.permissions.view && sessionStore.currentUser.isAdmin)

function dialogOK() {
  try {
    inquiriesStore.toggleArchive({ 
      inquiryId: inquiry.id,
      archive: !isArchived.value // Pass whether to archive or restore
    })
    emit('toggle')
  } catch {
    showError(t('agora', 'Error archiving or restoring the inquiry'))
  }
}

const isArchived = computed(() => inquiry.status?.isArchived ?? false)

const dialogText = computed(() => {
  if (isArchived.value) {
    return t('agora', 'Are you sure you want to restore this inquiry?')
  } 
    if (adminAccess.value) {
      return t('agora', 'Are you sure you want to archive the inquiry? {username} will be notified.', {
        username: inquiry.owner.displayName,
      })
    } 
      return t('agora', 'Are you sure you want to archive this inquiry?')
    
  
})

const dialogProps = {
  name: isArchived.value 
    ? t('agora', 'Restore inquiry')
    : t('agora', 'Archive inquiry'),
  noClose: true,
  closeOnClickOutside: true,
  buttons: [
    { label: t('agora', 'Cancel') },
    {
      label: isArchived.value 
        ? t('agora', 'Restore') 
        : t('agora', 'Archive'),
      variant: isArchived.value ? 'success' : 'primary',
      callback: () => dialogOK(),
    },
  ]
}
</script>

<template>
  <NcDialog v-model:open="model" v-bind="dialogProps">
    <span>
      {{ dialogText }}
    </span>
  </NcDialog>
</template>
