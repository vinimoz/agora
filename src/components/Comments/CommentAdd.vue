<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcButton from '@nextcloud/vue/components/NcButton'
import UserItem from '../User/UserItem.vue'
import { useSessionStore } from '../../stores/session.ts'
import { useCommentsStore } from '../../stores/comments.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'

interface Props {
  inquiryId?: number
  optionId?: number
}

const props = defineProps<Props>()

const commentsStore = useCommentsStore()
const sessionStore = useSessionStore()
const inquiryStore = useInquiryStore()

const comment = ref('')
const confidential = ref(false)
const isSubmitting = ref(false)

// Determine which inquiry to use
const currentInquiry = computed(() => {
  // If inquiryStore has an inquiry, use it
  if (inquiryStore.id) {
    return inquiryStore
  }
  
  // Otherwise, try to find the inquiry by ID in the store or use minimal data
  if (props.inquiryId) {
    return {
      id: props.inquiryId,
      configuration: {
        forceConfidentialComments: false
      },
      // Default owner is the current user if not available
      owner: inquiryStore.inquiry?.owner || { 
        id: sessionStore.currentUser.id, 
        displayName: sessionStore.currentUser.displayName 
      }
    }
  }
  
  return null
})

// Load comments if we have an inquiryId from props
if (props.inquiryId && (!inquiryStore.inquiry?.id || inquiryStore.inquiry.id !== props.inquiryId)) {
  // You might want to load the inquiry from the store or API here
  // For now, we'll just load comments
  commentsStore.load(props.inquiryId)
}

// Confidential text based on inquiry owner
const confidentialText = computed(() => {
  if (!currentInquiry.value) return t('agora', 'Only visible to me')
  
  const owner = currentInquiry.value.owner
  if (!owner || owner.id === sessionStore.currentUser.id) {
    return t('agora', 'Only visible to me')
  }
  
  return t('agora', 'Only visible to {displayName}', {
    displayName: owner.displayName || t('agora', 'The owner'),
  })
})

// Check if confidential comments are forced
const isConfidentialForced = computed(() => {
  if (!currentInquiry.value) return false
  return currentInquiry.value.configuration?.forceConfidentialComments || false
})

/**
 * Write a comment
 */
async function writeComment() {
  
  if (!comment.value || !currentInquiry.value || isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    const inquiryId = currentInquiry.value.id
    
    await commentsStore.add({
      message: comment.value,
      confidential: confidential.value || isConfidentialForced.value,
      optionId: props.optionId,
    }, inquiryId)
    
    comment.value = ''
    confidential.value = false
    
    // Reload comments to show the new one
    if (props.optionId){
        commentsStore.load(inquiryId, props.optionId)
    }
    else commentsStore.load(inquiryId)
    
  } catch (error) {
    console.error('Error saving comment:', error)
    showError(t('agora', 'Error while saving comment'))
  } finally {
    isSubmitting.value = false
  }
}

// Handle keyboard submit (Ctrl+Enter or Cmd+Enter)
function handleKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault()
    writeComment()
  }
}
</script>

<template>
  <div class="comment-add">
    <UserItem 
      :user="sessionStore.currentUser" 
      hide-names 
    />
    <div class="comment-add__input">
      <div class="comment-add__editor">
        <NcRichContenteditable
          v-model="comment"
          :placeholder="t('agora', 'Write a comment …')"
                  :autolink="true"
                  :use-markdown="true"
                  :emoji-autocomplete="true"
                  :link-autocomplete="true"
          :maxlength="150"
          :disabled="!currentInquiry || isSubmitting"
          @submit="writeComment"
          @keydown="handleKeydown"
        />
        <NcButton
          class="comment-add__submit"
          type="primary"
          :disabled="!comment.trim() || !currentInquiry || isSubmitting"
          :loading="isSubmitting"
          @click="writeComment"
        >
          {{ t('agora', 'Send') }}
        </NcButton>
      </div>
      
      <div class="comment-add__options">
        <NcCheckboxRadioSwitch
          v-if="!isConfidentialForced"
          v-model="confidential"
          type="switch"
          :disabled="!currentInquiry || isSubmitting"
        >
          {{ confidentialText }}
        </NcCheckboxRadioSwitch>
        
        <div 
          v-else 
          class="confidential-forced"
          :class="{ 'disabled': !currentInquiry }"
        >
          <span class="confidential-icon">🔒</span>
          {{ confidentialText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-add {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
  width: 100%;

  .user-item {
    align-items: flex-start;
    flex-shrink: 0;
  }

  .comment-add__input {
    flex: 1;
    min-width: 0;
    width: 100%;
  }

  .comment-add__editor {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    width: 100%;
  }

  .rich-contenteditable {
  width: 100%;
  }

  .comment-add__submit {
    flex-shrink: 0;
    align-self: flex-start;
    min-width: 70px;
    height: 42px;
    padding: 0 16px;
    white-space: nowrap;
    border-radius: var(--border-radius-pill);
  }

  .comment-add__options {
    margin-top: 8px;
    display: flex;
    align-items: center;

    .nc-checkbox-radio-switch__label {
      font-size: 13px;
    }

    .confidential-forced {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--color-text-lighter);
      padding: 4px 10px;
      background: var(--color-background-dark);
      border-radius: var(--border-radius);

      &.disabled {
        opacity: 0.5;
      }

      .confidential-icon {
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 768px) {
  .comment-add {
    flex-direction: column;
    gap: 8px;

    .comment-add__editor {
      flex-direction: column;
      gap: 8px;
      align-items: stretch;

      }

      .comment-add__submit {
        align-self: flex-end;
        width: 100%;
      }
    }
  }

</style>
