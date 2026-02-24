<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CommentItem from './CommentItem.vue'
import { t } from '@nextcloud/l10n'
import { usePreferencesStore } from '../../stores/preferences.ts'
import { useCommentsStore } from '../../stores/comments.ts'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'


const newCommentText = ref('')
const isSubmitting = ref(false)
const commentsStore = useCommentsStore()
const preferencesStore = usePreferencesStore()

const props = defineProps<{
  optionId?: number
  inquiryOnly?: boolean
}>()


// Add a ref to force re-renders
const updateTrigger = ref(0)


// Store user positions outside computed to prevent recreation
const userPositions = new Map<string | number, 'left' | 'right'>()

// Group comments by user + time proximity (within 60 seconds)
function groupCommentsByUserAndTime(comments: any[]) {
  if (!comments || comments.length === 0) return []

  const groups: any[] = []
  let currentGroup: any = null

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i]

    // Skip if comment is invalid
    if (!comment || !comment.user) continue

    if (!currentGroup) {
      // Start first group
      currentGroup = {
        userId: comment.user.id,
        user: comment.user,
        timestamp: comment.timestamp,
        comments: [comment]
      }
      continue
    }

    const timeDiff = Math.abs(comment.timestamp - currentGroup.timestamp)

    // Same user and within 60 seconds = same group
    if (comment.user.id === currentGroup.userId && timeDiff <= 60) {
      currentGroup.comments.push(comment)
    } else {
      // Push current group and start new one
      groups.push(currentGroup)
      currentGroup = {
        userId: comment.user.id,
        user: comment.user,
        timestamp: comment.timestamp,
        comments: [comment]
      }
    }
  }

  // Don't forget the last group
  if (currentGroup) {
    groups.push(currentGroup)
  }

  return groups
}

function getAvatarPosition(userId: string | number): 'left' | 'right' {
  // Get last position for this user
  const lastPosition = userPositions.get(userId)

  // Determine new position
  let position: 'left' | 'right'
  if (!lastPosition) {
    // First time for this user - start with left
    position = 'left'
  } else {
    // Alternate
    position = lastPosition === 'left' ? 'right' : 'left'
  }

  // Store for next time
  userPositions.set(userId, position)
  return position
}

// In Comments.vue, update the filteredComments computed property
const filteredComments = computed(() => {
  console.log("Comments updated - total comments:", commentsStore.comments?.length)
  console.log("Filtering for optionId:", props.optionId)
  console.log("Filtering for inquiryOnly:", props.inquiryOnly)
  
  // Force recomputation by accessing the store directly
  const allComments = commentsStore.comments || []
  
  // Reset positions for new filter
  userPositions.clear()

  // Default: use groupedComments
  if (props.optionId === undefined && !props.inquiryOnly) {
    return commentsStore.groupedComments || []
  }

  // Get base comments
  let baseComments = []
  if (props.optionId !== undefined) {
    baseComments = allComments
      .filter(comment => comment && comment.optionId === props.optionId)
      .sort((a, b) => b.timestamp - a.timestamp)
    
    console.log(`Found ${baseComments.length} comments for option ${props.optionId}`)
  } else if (props.inquiryOnly) {
    baseComments = allComments
      .filter(comment => comment && comment.optionId === 0)
      .sort((a, b) => b.timestamp - a.timestamp)
    
    console.log(`Found ${baseComments.length} inquiry comments`)
  }

  // Group by user + time
  const groups = groupCommentsByUserAndTime(baseComments)

  // Assign avatar positions
  return groups.map(group => ({
    ...group,
    avatarPosition: getAvatarPosition(group.userId)
  }))
})

// Improve the watch to detect all changes
watch(() => commentsStore.comments, (newComments, oldComments) => {
  console.log('Comments changed:', {
    oldCount: oldComments?.length,
    newCount: newComments?.length,
    optionId: props.optionId
  })
  updateTrigger.value++
}, { deep: true, immediate: true })


// Watch for changes in commentsStore.comments
watch(() => commentsStore.comments, () => {
  updateTrigger.value++
}, { deep: true })

const cssVar = {
  '--content-deleted': `"(${t('agora', 'deleted')})"`,
}
const alternativestyle = preferencesStore.user?.useCommentsAlternativeStyling || false
</script>

<template>
  <TransitionGroup tag="ul" name="list" :class="['comments', { alternativestyle }]" :style="cssVar">
    <!-- Grouped view for option/inquiry comments -->
    <template v-if="filteredComments.length > 0 && filteredComments[0]?.comments">
      <li
        v-for="(group, index) in filteredComments"
        :key="`group-${group.userId}-${group.timestamp}-${index}`"
        class="comment-group"
      >
        <CommentItem
          :group="group"
          :avatar-position="group.avatarPosition"
          :is-grouped="true"
        />
      </li>
    </template>

    <!-- Default threaded view -->
    <template v-else-if="filteredComments.length > 0">
      <CommentItem
        v-for="comment in filteredComments"
        :key="comment.id"
        :comment="comment"
        :is-grouped="false"
      />
    </template>

    <!-- Empty state -->
    <li v-else class="no-comments">
      {{ t('agora', 'No comments yet') }}
    </li>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.comments {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-group {
  list-style: none;
  margin-bottom: 16px;
}

.no-comments {
  padding: 20px;
  text-align: center;
  color: var(--color-text-lighter);
  font-style: italic;
  list-style: none;
}

// Transition animations
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
