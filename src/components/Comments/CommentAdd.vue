<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showError } from '@nextcloud/dialogs'
import { InputDiv } from '../Base/index.ts'
import { t } from '@nextcloud/l10n'
import UserItem from '../User/UserItem.vue'
import { useSessionStore } from '../../stores/session.ts'
import { useCommentsStore } from '../../stores/comments.ts'
import { NcCheckboxRadioSwitch } from '@nextcloud/vue'
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
    displayName: owner.displayName || t('agora', 'the owner'),
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
  
  if (!comment.value || !currentInquiry.value) {
    return
  }

  try {
    const inquiryId = currentInquiry.value.id
    
    await commentsStore.add({
      message: comment.value,
      confidential: confidential.value || isConfidentialForced.value,
      optionId: props.optionId,
    },inquiryId)
    
    comment.value = ''
    confidential.value = false
    
    // Reload comments to show the new one
    if (props.optionId){
        commentsStore.load(inquiryId,props.optionId)
    }
    else commentsStore.load(inquiryId)
    
  } catch (error) {
    console.error('Error saving comment:', error)
    showError(t('agora', 'Error while saving comment'))
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
      <InputDiv
        v-model="comment"
        :placeholder="t('agora', 'Write a comment...')"
        :label="t('agora', 'Write a comment...')"
        submit
        :disabled="!currentInquiry"
        @submit="writeComment()"
      />
      
      <NcCheckboxRadioSwitch
        v-if="!isConfidentialForced"
        v-model="confidential"
        type="switch"
        :disabled="!currentInquiry"
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
</template>

<style lang="scss">
.comment-add {
  margin-bottom: 24px;
  display: flex;

  .user-item {
    align-items: first baseline;
  }
  
  .comment-add__input {
    margin-inline-start: 8px;
    flex: 1;
    align-items: center;
    
    .confidential-forced {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      font-size: 13px;
      color: var(--color-text-lighter);
      
      &.disabled {
        opacity: 0.5;
      }
      
      .confidential-icon {
        font-size: 14px;
      }
    }
  }
}
</style>
