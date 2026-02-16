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

import type { Comment, CommentsGrouped } from '../../stores/comments.types'

const sessionStore = useSessionStore()
const inquiryStore = useInquiryStore()
const commentsStore = useCommentsStore()
const preferencesStore = usePreferencesStore()

const props = defineProps<{ 
  comment: CommentsGrouped | Comment 
}>()

// Type guards
const isGroupedComment = (comment: CommentsGrouped | Comment): comment is CommentsGrouped => {
  return 'comments' in comment && Array.isArray(comment.comments)
}

const isFlatComment = (comment: CommentsGrouped | Comment): comment is Comment => {
  return 'comment' in comment && !('comments' in comment)
}

// Computed properties
const commentType = computed(() => {
  if (isGroupedComment(props.comment)) return 'grouped'
  return 'flat'
})

const hasReplies = computed(() => {
  return isGroupedComment(props.comment) && props.comment.comments.length > 0
})

const displayItems = computed(() => {
  if (isGroupedComment(props.comment)) {
    // For grouped comments, show parent + replies
    return [
      { ...props.comment, isParent: true },
      ...props.comment.comments.map(reply => ({ ...reply, isReply: true }))
    ]
  }
  // For flat comments, just show the comment itself
  return [{ ...props.comment, isSingle: true }]
})

const commentedDateTime = computed(() => DateTime.fromSeconds(props.comment.timestamp))

const isCurrentUser = computed(
  () => sessionStore.currentUser?.id === props.comment.user.id,
)

const isConfidential = computed(() => props.comment.confidential > 0)

const confidentialRecipient = computed(() => {
  if (!isConfidential.value) return ''
  
  if (props.comment.recipient && props.comment.recipient.id !== sessionStore.currentUser.id) {
    return t('inquiries', 'Confidential with {displayName}', {
      displayName: props.comment.recipient.displayName,
    })
  }
  return t('inquiries', 'Confidential')
})

const deletable = computed(
  () => props.comment.user.id === sessionStore.currentUser?.id
    || inquiryStore.currentUserStatus.isOwner,
)

// Helper functions
function linkify(text: string) {
  return linkifyStr(text || '')
}

function getCommentText(item: any): string {
  if ('comment' in item) {
    return item.comment || ''
  }
  return ''
}

async function deleteComment(comment: Comment) {
  try {
    await commentsStore.delete({ comment })
  } catch {
    showError(t('inquiries', 'Error while deleting the comment'))
  }
}

async function restoreComment(comment: Comment) {
  try {
    await commentsStore.restore({ comment })
  } catch {
    showError(t('inquiries', 'Error while restoring the comment'))
  }
}
</script>

<template>
  <div 
    :class="[
      'comment-item',
      { 
        'current-user': isCurrentUser,
        'grouped-comment': commentType === 'grouped',
        'flat-comment': commentType === 'flat',
        'has-replies': hasReplies
      }
    ]"
  >
    <!-- User avatar section (only for main comment) -->
    <UserItem
      v-if="!preferencesStore.user.useCommentsAlternativeStyling"
      :user="comment.user"
      hide-names />

    <div class="comment-item__content">
      <!-- Header section -->
      <div class="comment-item__header">
        <span
          v-if="!preferencesStore.user.useCommentsAlternativeStyling"
          class="comment-item__user">
          {{ comment.user.displayName }}
        </span>

        <UserBubble v-else-if="!isCurrentUser" :user="comment.user" />

        <span
          class="comment-item__date"
          :title="commentedDateTime.toLocaleString(DateTime.DATETIME_SHORT)">
          {{ commentedDateTime.toRelative() }}
        </span>

        <span v-if="isConfidential" class="comment-item__confidential">
          {{ confidentialRecipient }}
        </span>
      </div>

      <!-- Comments tree -->
      <div class="comment-item__tree">
        <div
          v-for="(item, index) in displayItems"
          :key="item.id || index"
          :class="[
            'comment-item__node',
            {
              'parent-comment': item.isParent,
              'reply-comment': item.isReply,
              'single-comment': item.isSingle,
              'deleted': item.deleted,
              'first-reply': index === 1 && hasReplies
            }
          ]"
        >
          <!-- Reply indicator line (for visual threading) -->
          <div v-if="item.isReply" class="reply-indicator" aria-hidden="true">
            <div class="reply-line"></div>
            <div class="reply-dot"></div>
          </div>

          <!-- Comment content -->
          <div class="comment-content">
            <!-- Reply author indicator (compact) -->
            <div v-if="item.isReply" class="reply-author">
              <UserBubble :user="item.user" :compact="true" />
            </div>

            <!-- The actual comment text -->
            <div 
              class="comment-text"
              :class="{ 'has-author-indicator': item.isReply }"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="linkify(getCommentText(item))" />
            </div>

            <!-- Actions -->
            <div class="comment-actions">
              <ActionDelete
                v-if="deletable && !item.isParent"
                :name="
                  item.deleted
                    ? t('inquiries', 'Restore comment')
                    : t('inquiries', 'Delete comment')
                "
                :restore="!!item.deleted"
                :timeout="0"
                @restore="restoreComment(item)"
                @delete="deleteComment(item)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Reply count indicator (for grouped comments) -->
      <div 
        v-if="hasReplies" 
        class="comment-item__reply-count"
        :title="t('inquiries', '{count} replies', { count: (comment as CommentsGrouped).comments.length })"
      >
        <span class="reply-count-line"></span>
        <span class="reply-count-text">
          {{ (comment as CommentsGrouped).comments.length }} 
          {{ (comment as CommentsGrouped).comments.length === 1 ? t('inquiries', 'reply') : t('inquiries', 'replies') }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;

  &.grouped-comment {
    .comment-item__content {
      background: var(--color-background-dark);
      border-radius: 12px;
      padding: 12px;
      transition: background 0.2s ease;

      &:hover {
        background: var(--color-background-hover);
      }
    }
  }

  &.flat-comment {
    .comment-item__content {
      background: var(--color-main-background);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 12px;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--color-primary-element);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
    }
  }

  &.current-user {
    .comment-item__content {
      background: var(--color-primary-light);
      border-color: var(--color-primary-element-light);
    }
  }
}

.comment-item__content {
  margin-inline-start: 8px;
  flex: 1;
  min-width: 0; // Prevent overflow
}

.comment-item__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.comment-item__user {
  font-weight: 600;
  font-size: 0.9em;
  color: var(--color-main-text);
}

.comment-item__date {
  opacity: 0.5;
  font-size: 0.8em;
  
  &::before {
    content: '•';
    margin-right: 8px;
    opacity: 0.5;
  }
}

.comment-item__confidential {
  opacity: 0.5;
  font-size: 0.8em;
  background: var(--color-background-darker);
  padding: 2px 8px;
  border-radius: 12px;
  
  &::before {
    content: '🔒';
    margin-right: 4px;
    font-size: 0.9em;
  }
}

.comment-item__tree {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-item__node {
  position: relative;
  padding: 4px 0;

  &.parent-comment {
    margin-bottom: 8px;
    font-weight: 500;
  }

  &.reply-comment {
    margin-left: 32px;
    
    .comment-content {
      background: var(--color-main-background);
      border-radius: 8px;
      padding: 8px 12px;
      border: 1px solid transparent;
      
      &:hover {
        border-color: var(--color-border);
      }
    }
  }

  &.first-reply {
    margin-top: 4px;
  }

  &.deleted {
    opacity: 0.6;
    
    .comment-text span::after {
      content: ' (' attr(data-deleted) ')';
      font-style: italic;
      color: var(--color-text-lighter);
    }
  }

  .reply-indicator {
    position: absolute;
    left: -28px;
    top: 0;
    bottom: 0;
    width: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .reply-line {
      flex: 1;
      width: 2px;
      background: linear-gradient(to bottom, 
        var(--color-border-dark) 0%, 
        var(--color-border) 100%
      );
      margin-bottom: 4px;
    }
    
    .reply-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-border-dark);
      margin-top: 4px;
    }
  }
}

.comment-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reply-author {
  font-size: 0.85em;
  opacity: 0.8;
  margin-bottom: 4px;
  
  :deep(.user-bubble) {
    padding: 2px 0;
  }
}

.comment-text {
  font-size: 0.95em;
  line-height: 1.5;
  word-break: break-word;
  
  &.has-author-indicator {
    margin-left: 24px;
  }
  
  :deep(a) {
    color: var(--color-primary-element);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-top: 4px;
}

.comment-item__node:hover .comment-actions {
  opacity: 1;
}

.comment-item__reply-count {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding-left: 32px;
  
  .reply-count-line {
    flex: 0 0 24px;
    height: 2px;
    background: linear-gradient(to right, 
      var(--color-border-dark) 0%, 
      transparent 100%
    );
  }
  
  .reply-count-text {
    font-size: 0.8em;
    opacity: 0.6;
    cursor: help;
    
    &:hover {
      opacity: 1;
    }
  }
}

// Alternative styling
.alternativestyle {
  .comment-item {
    &.current-user {
      flex-direction: row-reverse;
      
      .comment-item__content {
        margin-inline: 88px 0;
      }
    }
  }
  
  .comment-item__node.reply-comment {
    margin-left: 48px;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .comment-item__node.reply-comment {
    margin-left: 16px;
    
    .reply-indicator {
      left: -20px;
      width: 16px;
    }
  }
  
  .comment-item__reply-count {
    padding-left: 16px;
  }
  
  .comment-text.has-author-indicator {
    margin-left: 16px;
  }
}
</style>
