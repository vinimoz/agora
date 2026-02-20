<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed } from 'vue'
import linkifyStr from 'linkify-string'
import { DateTime } from 'luxon'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'

import ActionDelete from '../Actions/modules/ActionDelete.vue'
import UserItem from '../User/UserItem.vue'
import UserBubble from '../User/UserBubble.vue'

import { useSessionStore } from '../../stores/session'
import { useInquiryStore } from '../../stores/inquiry'
import { useCommentsStore } from '../../stores/comments'
import { usePreferencesStore } from '../../stores/preferences'

import type { Comment } from '../../stores/comments.types'

const sessionStore = useSessionStore()
const inquiryStore = useInquiryStore()
const commentsStore = useCommentsStore()
const preferencesStore = usePreferencesStore()

const props = defineProps<{
  comment?: Comment
  group?: {
    userId: string | number
    user: any
    timestamp: number
    comments: Comment[]
    avatarPosition: 'left' | 'right'
  }
  avatarPosition?: 'left' | 'right'
  isGrouped?: boolean
}>()

// Safe computed properties with null checks
const isGroupMode = computed(() => props.group !== undefined && props.group !== null)

const comments = computed(() => {
  if (isGroupMode.value && props.group?.comments) {
    return props.group.comments
  }
  return props.comment ? [props.comment] : []
})

const user = computed(() => {
  if (isGroupMode.value && props.group?.user) {
    return props.group.user
  }
  return props.comment?.user || { id: 0, displayName: 'Unknown' }
})

const timestamp = computed(() => {
  if (isGroupMode.value && props.group?.timestamp) {
    return props.group.timestamp
  }
  return props.comment?.timestamp || 0
})


const commentedDateTime = computed(() => {
  try {
    return DateTime.fromSeconds(timestamp.value)
  } catch {
    return DateTime.now()
  }
})

const isCurrentUser = computed(() => {
  return sessionStore.currentUser?.id === user.value.id
})

// Check if any comment in group is confidential
const isConfidential = computed(() => {
  return comments.value.some(c => c && c.confidential > 0)
})

const deletable = computed(() => {
  return user.value.id === sessionStore.currentUser?.id
    || inquiryStore.currentUserStatus?.isOwner
})

// Format time for multiple comments
const timeRange = computed(() => {
  if (comments.value.length <= 1) return ''

  try {
    const first = DateTime.fromSeconds(comments.value[0]?.timestamp || 0)
    const last = DateTime.fromSeconds(comments.value[comments.value.length - 1]?.timestamp || 0)

    if (first.hasSame(last, 'minute')) {
      return first.toFormat('HH:mm')
    }
    return `${first.toFormat('HH:mm')} - ${last.toFormat('HH:mm')}`
  } catch {
    return ''
  }
})

// Helper functions
function linkify(text: string) {
  if (!text) return ''
  try {
    return linkifyStr(text)
  } catch {
    return text
  }
}

async function deleteComment(comment: Comment) {
  if (!comment) return
  try {
    await commentsStore.delete({ comment })
  } catch {
    showError(t('inquiries', 'Error while deleting the comment'))
  }
}

async function restoreComment(comment: Comment) {
  if (!comment) return
  try {
    await commentsStore.restore({ comment })
  } catch {
    showError(t('inquiries', 'Error while restoring the comment'))
  }
}

// Track user positions for alternating ONLY in grouped mode
const userPositionsGrouped = new Map<string | number, 'left' | 'right'>()

// Simplified position logic - only alternate in grouped mode
const position = computed(() => {
  if (!isGroupMode.value) {
    // For single comments (option comments), always left
    return 'left'
  }

  // For grouped mode, alternate based on user
  const userId = user.value.id
  const lastPosition = userPositionsGrouped.get(userId)

  let newPosition: 'left' | 'right'
  if (!lastPosition) {
    newPosition = 'left' // First time for this user
  } else {
    newPosition = lastPosition === 'left' ? 'right' : 'left'
  }

  userPositionsGrouped.set(userId, newPosition)
  return newPosition
})

</script>
<template>
  <div 
    v-if="comments.length > 0"
    :class="[
      'comment-item',
      { 
        'current-user': isCurrentUser,
        'grouped': isGroupMode,
        'single': !isGroupMode,
        'avatar-left': position === 'left',
        'avatar-right': position === 'right',
        'has-multiple': comments.length > 1
      }
    ]"
  >
    <!-- Avatar - only show in grouped mode, hidden in single mode -->
    <div v-if="isGroupMode" class="comment-item__avatar">
      <UserItem
        v-if="!preferencesStore.user?.useCommentsAlternativeStyling"
        :user="user"
        hide-names />
      <UserBubble v-else :user="user" />
    </div>

    <!-- Content - full width in single mode -->
    <div 
      class="comment-item__content"
      :class="{ 'full-width': !isGroupMode }"
    >
      <!-- Header - always left aligned -->
      <div class="comment-item__header">
        <span class="comment-item__user">
          {{ user.displayName || t('inquiries', 'Unknown user') }}
        </span>
        <span
          class="comment-item__date"
          :title="commentedDateTime.toLocaleString(DateTime.DATETIME_SHORT)">
          {{ commentedDateTime.toRelative() }}
        </span>
        <span v-if="timeRange" class="comment-item__timerange">
          {{ timeRange }}
        </span>
        <span v-if="isConfidential" class="comment-item__confidential">
          {{ t('inquiries', 'Confidential') }}
        </span>
        <span v-if="comments.length > 1" class="comment-item__count">
          {{ comments.length }}
        </span>
      </div>

      <!-- Comments - with smaller spacing -->
      <div class="comment-item__comments">
        <div
          v-for="(singleComment, index) in comments"
          :key="singleComment?.id || index"
          class="comment-item__single"
          :class="{ 'deleted': singleComment?.deleted }"
        >
          <!-- Comment text - smaller font for single mode -->
          <div class="comment-item__text">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="linkify(singleComment?.comment || '')" />
          </div>

          <!-- Actions -->
          <div class="comment-item__actions">
            <ActionDelete
              v-if="deletable && singleComment"
              :name="singleComment.deleted ? t('inquiries', 'Restore comment') : t('inquiries', 'Delete comment')"
              :restore="!!singleComment.deleted"
              :timeout="0"
              @restore="restoreComment(singleComment)"
              @delete="deleteComment(singleComment)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  margin-bottom: 8px; // Reduced from 12px
  gap: 8px; // Reduced from 12px
  
  // For single mode (option comments) - no avatar, smaller box
  &.single {
    .comment-item__content {
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 8px; // Smaller radius
      padding: 6px 10px; // Reduced padding
      margin-left: 0; // No margin since no avatar
      
      .comment-item__user {
        font-size: 0.8em; // Smaller
      }
      
      .comment-item__date {
        font-size: 0.7em; // Smaller
      }
      
      .comment-item__text {
        font-size: 0.85em; // Smaller
        line-height: 1.4;
      }
    }
    
    // Header always left in single mode
    .comment-item__header {
      justify-content: flex-start;
    }
  }
  
  // For grouped mode
  &.grouped {
    .comment-item__content {
      background: var(--color-background-dark);
      border-radius: 10px; // Slightly smaller
      padding: 8px 12px; // Reduced padding
      
      .comment-item__single {
        margin-bottom: 6px;
        padding-bottom: 6px;
        
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
        }
      }
    }
    
    // Avatar positioning only affects grouped mode
    &.avatar-left {
      flex-direction: row;
    }
    
    &.avatar-right {
      flex-direction: row-reverse;
    }
  }
  
  // Current user styling
  &.current-user {
    .comment-item__content {
      background: var(--color-primary-light);
      border-color: var(--color-primary-element-light);
    }
  }
}

.comment-item__avatar {
  flex-shrink: 0;
  margin-top: 2px; // Align better with first line
}

.comment-item__content {
  flex: 1;
  min-width: 0;
  transition: all 0.2s ease;
  
  &.full-width {
    width: 100%;
  }
  
  &:hover {
    background: var(--color-background-hover);
    border-color: var(--color-primary-element);
  }
}

.comment-item__header {
  display: flex;
  align-items: center;
  gap: 6px; // Reduced gap
  margin-bottom: 4px; // Reduced margin
  flex-wrap: wrap;
  
  // Always left aligned
  justify-content: flex-start !important;
}

.comment-item__user {
  font-weight: 600;
  font-size: 0.85em; // Smaller
  color: var(--color-main-text);
}

.comment-item__date {
  opacity: 0.5;
  font-size: 0.75em; // Smaller
  
  &::before {
    content: '•';
    margin-right: 4px;
    opacity: 0.5;
  }
}

.comment-item__timerange {
  font-size: 0.7em;
  background: var(--color-background-darker);
  padding: 2px 6px;
  border-radius: 8px;
  color: var(--color-text-light);
}

.comment-item__confidential {
  opacity: 0.5;
  font-size: 0.7em;
  background: var(--color-background-darker);
  padding: 2px 6px;
  border-radius: 8px;
  
  &::before {
    content: '🔒';
    margin-right: 4px;
    font-size: 0.85em;
  }
}

.comment-item__count {
  font-size: 0.65em; // Smaller
  font-weight: 600;
  background: var(--color-primary-element);
  color: var(--color-primary-text);
  padding: 2px 6px;
  border-radius: 8px;
  margin-left: auto;
}

.comment-item__comments {
  display: flex;
  flex-direction: column;
  gap: 4px; // Reduced gap
}

.comment-item__single {
  position: relative;
  
  &.deleted {
    opacity: 0.6;
  }
}

.comment-item__text {
  font-size: 0.9em; // Slightly smaller
  line-height: 1.5;
  word-break: break-word;
  padding-right: 36px; // Slightly less space
  
  :deep(a) {
    color: var(--color-primary-element);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.comment-item__actions {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  :deep(.action-delete) {
    button {
      height: 24px !important;
      width: 24px !important;
    }
  }
}

.comment-item__single:hover .comment-item__actions {
  opacity: 1;
}

// Comment input styling
.comments-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-input {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 12px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  
  :deep(.nc-rich-contenteditable) {
    flex: 1;
    min-height: 36px;
    max-height: 120px;
    overflow-y: auto;
    background: var(--color-main-background);
    border-radius: 8px;
    padding: 8px 12px;
    
    &:focus {
      border-color: var(--color-primary-element);
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .comment-item {
    margin-bottom: 6px;
  }
  
  .comment-item__text {
    padding-right: 30px;
    font-size: 0.85em;
  }
  
  .comment-input {
    flex-direction: column;
    
    button {
      align-self: flex-end;
    }
  }
}
</style>
