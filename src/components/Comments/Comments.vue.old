<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import CommentItem from './CommentItem.vue'
import { t } from '@nextcloud/l10n'
import { usePreferencesStore } from '../../stores/preferences.ts'
import { useCommentsStore } from '../../stores/comments.ts'
import { useSessionStore } from '../../stores/session.ts' // Add this

const commentsStore = useCommentsStore()
const preferencesStore = usePreferencesStore()
const sessionStore = useSessionStore() // Add this

// Define props for filtering
const props = defineProps<{
  optionId?: number // Optional: if provided, show only this option's comments
  inquiryOnly?: boolean // Optional: if true, show only inquiry-level comments
}>()

// Computed property to get filtered comments
const filteredComments = computed(() => {
  console.log(" INTO COMMMENT ",props.optionId)
  console.log(" INTO COMMMENT iNQUIRY ONLY ",props.inquiryOnly)
  console.log(" ALLLLLLLLLLLLLL COMMMENT ",commentsStore.comments)
  console.log(" COMMMENT GROUPED PROPS ID ",commentsStore.groupedComments)
  console.log(" FILTER COMMMENT GROUPED PROPS ID ",commentsStore.groupedComments.filter( comment => comment.optionId === 0 ))
  if (props.optionId !== undefined) {
    
    return commentsStore.comments
      .filter(comment => comment.optionId === props.optionId)
      .sort((a, b) => b.timestamp - a.timestamp) 
  }
  
  if (props.inquiryOnly) {
    // Show only inquiry-level comments (optionId = 0)
    return commentsStore.groupedComments.filter(
      comment => comment.optionId === 0
    )
  }
  
  // Default: show all comments (original behavior)
  return commentsStore.groupedComments
})

const cssVar = {
  '--content-deleted': `"(${t('agora', 'deleted')})"`,
}
const alternativestyle = preferencesStore.user.useCommentsAlternativeStyling
</script>

<template>
  <TransitionGroup tag="ul" name="list" :class="['comments', { alternativestyle }]" :style="cssVar">
    <CommentItem
      v-for="comment in filteredComments"
      :key="comment.id"
      :comment="comment"
      tag="li"
    />
  </TransitionGroup>
</template>
