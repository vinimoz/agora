<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <transition name="slide">
    <div v-if="show" class="option-detail-drawer-overlay" @click.self="closeDrawer">
      <div class="option-detail-drawer">
        <!-- Header -->
        <div class="drawer-header">
          <div class="header-left">
            <NcButton
              type="tertiary"
              :aria-label="t('agora', 'Close')"
              @click="closeDrawer"
            >
              <template #icon>
                <component :is="InquiryOptionIcons.Close" :size="20" />
              </template>
            </NcButton>
            <div class="option-type-badge" :style="{ backgroundColor: option?.typeColor + '20', color: option?.typeColor }">
              <component :is="option?.typeIcon" :size="16" />
              <span class="type-name">{{ option?.typeDisplayName }}</span>
            </div>
          </div>
          
          <div class="header-right">
            <NcActions
              v-if="canEditOrDelete"
              :force-menu="true"
              :aria-label="t('agora', 'Option actions')"
            >
              <NcActionButton
                v-if="option?.permissions?.edit"
                :close-after-click="true"
                @click="editOption"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Edit" :size="20" />
                </template>
                {{ t('agora', 'Edit option') }}
              </NcActionButton>
              
              <NcActionButton
                v-if="option?.permissions?.delete"
                :close-after-click="true"
                @click="confirmDelete"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Delete" :size="20" />
                </template>
                {{ t('agora', 'Delete option') }}
              </NcActionButton>
              
              <NcActionSeparator v-if="option?.canAddChildren" />
              
              <NcActionButton
                v-if="option?.canAddChildren"
                :close-after-click="true"
                @click="addChildOption"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Add" :size="20" />
                </template>
                {{ t('agora', 'Add child option') }}
              </NcActionButton>
            </NcActions>
          </div>
        </div>

        <!-- Content -->
        <div v-if="loading" class="drawer-loading">
          <NcLoadingIcon :size="48" />
          <p>{{ t('agora', 'Loading option details...') }}</p>
        </div>

        <div v-else-if="error" class="drawer-error">
          <NcNoteCard type="error">
            {{ error }}
          </NcNoteCard>
          <NcButton @click="loadOption">
            {{ t('agora', 'Retry') }}
          </NcButton>
        </div>

        <div v-else-if="option" class="drawer-content">
          <div class="scrollable-content">
            <!-- Option Content -->
            <div class="option-content-section">
              <div class="option-text">
                <div v-if="isEditing" class="editor-container">
                  <NcRichText
                    v-if="supportsMarkdown"
                    v-model="editForm.text"
                    :autolink="true"
                    :use-markdown="true"
                    :placeholder="t('agora', 'Edit option text...')"
                    class="edit-rich-text"
                    :rows="8"
                  />
                  <NcTextArea
                    v-else
                    v-model="editForm.text"
                    :placeholder="t('agora', 'Edit option text...')"
                    class="edit-textarea"
                    :rows="8"
                  />
                  <div class="edit-actions">
                    <NcButton type="secondary" @click="cancelEdit">
                      {{ t('agora', 'Cancel') }}
                    </NcButton>
                    <NcButton type="primary" :disabled="!editForm.text.trim()" @click="saveEdit">
                      {{ t('agora', 'Save changes') }}
                    </NcButton>
                  </div>
                </div>
                <div v-else class="display-text">
                  <div v-if="useMarkdown" class="markdown-content" v-html="option.textMarkDown" />
                  <p v-else class="plain-text">{{ option.text }}</p>
                </div>
              </div>

              <!-- Option Metadata -->
              <div class="option-metadata">
                <div class="author-info">
                  <NcAvatar
                    :user="option.owner.id"
                    :display-name="option.owner.displayName"
                    :size="32"
                  />
                  <div class="author-details">
                    <span class="author-name">{{ option.owner.displayName }}</span>
                    <span class="creation-date">{{ formatDate(option.created) }}</span>
                  </div>
                </div>
                
                <div class="option-stats">
                  <div class="stat-item" @click="scrollToComments">
                    <component :is="InquiryOptionIcons.Comment" :size="16" />
                    <span class="stat-count">{{ option.currentUserStatus?.countComments || 0 }}</span>
                    <span class="stat-label">{{ t('agora', 'Comments') }}</span>
                  </div>
                  
                  <div v-if="option.canSupport" class="stat-item" @click="toggleSupport">
                    <TernarySupportIcon
                      v-if="inquiryStore.configuration.supportMode === 'ternary'"
                      :support-value="option.currentUserStatus?.supportValue"
                      :size="16"
                    />
                    <ThumbIcon
                      v-else
                      :supported="option.currentUserStatus?.hasSupported"
                      :size="16"
                    />
                    <span class="stat-count">{{ option.currentUserStatus?.countSupports || 0 }}</span>
                    <span class="stat-label">{{ t('agora', 'Supports') }}</span>
                  </div>
                  
                  <div v-if="option.children?.length" class="stat-item">
                    <component :is="InquiryOptionIcons.Children" :size="16" />
                    <span class="stat-count">{{ option.children.length }}</span>
                    <span class="stat-label">{{ t('agora', 'Children') }}</span>
                  </div>
                </div>
              </div>

              <!-- Misc Fields -->
              <div v-if="hasMiscFields" class="misc-fields-section">
                <h4 class="section-title">{{ t('agora', 'Additional Information') }}</h4>
                <div class="misc-fields-grid">
                  <div
                    v-for="field in miscFields"
                    :key="field.key"
                    class="misc-field"
                  >
                    <strong class="field-label">{{ t('agora', field.label) }}:</strong>
                    <span class="field-value">{{ formatMiscField(field, option.miscFields?.[field.key]) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Comments Section -->
            <div v-if="option.allowComment" ref="commentsSection" class="comments-section">
              <div class="section-header">
                <h3 class="section-title">
                  <component :is="InquiryOptionIcons.Comment" :size="20" />
                  {{ t('agora', 'Comments') }}
                  <span class="comment-count">({{ option.currentUserStatus?.countComments || 0 }})</span>
                </h3>
                <NcButton
                  v-if="canComment"
                  type="primary"
                  @click="showCommentForm = !showCommentForm"
                >
                  <template #icon>
                    <component :is="InquiryOptionIcons.Add" :size="16" />
                  </template>
                  {{ t('agora', 'Add comment') }}
                </NcButton>
              </div>

              <!-- Comment Form -->
              <transition name="fade">
                <div v-if="showCommentForm" class="comment-form">
                  <NcRichText
                    v-model="newComment"
                    :autolink="true"
                    :use-markdown="true"
                    :placeholder="t('agora', 'Write a comment...')"
                    class="comment-input"
                    :rows="4"
                  />
                  <div class="comment-form-actions">
                    <NcButton type="secondary" @click="showCommentForm = false">
                      {{ t('agora', 'Cancel') }}
                    </NcButton>
                    <NcButton type="primary" :disabled="!newComment.trim()" @click="submitComment">
                      {{ t('agora', 'Post comment') }}
                    </NcButton>
                  </div>
                </div>
              </transition>

              <!-- Comments List -->
              <div v-if="comments.length > 0" class="comments-list">
                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="comment-item"
                >
                  <div class="comment-header">
                    <NcAvatar
                      :user="comment.author.id"
                      :display-name="comment.author.displayName"
                      :size="24"
                    />
                    <div class="comment-author">
                      <span class="author-name">{{ comment.author.displayName }}</span>
                      <span class="comment-date">{{ formatDate(comment.timestamp) }}</span>
                    </div>
                    <div v-if="comment.canDelete" class="comment-actions">
                      <NcButton
                        type="tertiary-error"
                        :aria-label="t('agora', 'Delete comment')"
                        @click="deleteComment(comment.id)"
                      >
                        <template #icon>
                          <component :is="InquiryOptionIcons.Delete" :size="14" />
                        </template>
                      </NcButton>
                    </div>
                  </div>
                  <div class="comment-text">
                    <div class="markdown-content" v-html="comment.textMarkDown" />
                  </div>
                </div>
              </div>

              <div v-else class="no-comments">
                <component :is="InquiryOptionIcons.Comment" :size="48" />
                <h4>{{ t('agora', 'No comments yet') }}</h4>
                <p>{{ t('agora', 'Be the first to comment on this option') }}</p>
              </div>
            </div>

            <!-- Children Section -->
            <div v-if="option.children?.length" class="children-section">
              <h3 class="section-title">
                <component :is="InquiryOptionIcons.Children" :size="20" />
                {{ t('agora', 'Child Options') }}
                <span class="children-count">({{ option.children.length }})</span>
              </h3>
              
              <div class="children-list">
                <OptionCard
                  v-for="child in option.children"
                  :key="child.id"
                  :option="child"
                  :inquiry-id="inquiryId"
                  :compact="true"
                  @click="openChildDetail(child)"
                  @support="handleChildSupport"
                  @comment="handleChildComment"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcRichText from '@nextcloud/vue/components/NcRichText'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { TernarySupportIcon, ThumbIcon } from '../AppIcons'
import { Option } from '../../stores/option.ts'

import OptionCard from './OptionCard.vue'

// Props
const props = defineProps<{
  optionId: number | null
  inquiryId: number
}>()

const emit = defineEmits<{
  close: []
  updated: [option: Option]
  deleted: [optionId: number]
}>()

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const show = ref(true)
const loading = ref(false)
const error = ref<string | null>(null)
const option = ref<Option | null>(null)
const comments = ref<any[]>([])
const newComment = ref('')
const showCommentForm = ref(false)
const isEditing = ref(false)
const editForm = ref({
  text: ''
})

const commentsSection = ref<HTMLElement | null>(null)

// Computed
const canComment = computed(() => option.value?.allowComment && option.value?.permissions?.comment)

const canEditOrDelete = computed(() => option.value?.permissions?.edit || option.value?.permissions?.delete || option.value?.canAddChildren)

const useMarkdown = computed(() => sessionStore.appSettings?.optionTypesTab?.[option.value?.type || '']?.features?.includes('markdown') || false)

const supportsMarkdown = computed(() => sessionStore.appSettings?.optionTypesTab?.[option.value?.type || '']?.features?.includes('markdown') || false)

const miscFields = computed(() => sessionStore.appSettings?.optionTypesTab?.[option.value?.type || '']?.miscFields || [])

const hasMiscFields = computed(() => miscFields.value.length > 0 && Object.keys(option.value?.miscFields || {}).length > 0)

// Methods
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return `${date.toLocaleDateString()  } ${  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}

const formatMiscField = (field: any, value: any) => {
  if (value === null || value === undefined || value === '') {
    return t('agora', 'Not specified')
  }
  
  if (field.type === 'date' || field.type === 'datetime') {
    return formatDate(value)
  }
  
  if (field.type === 'boolean' || field.type === 'checkbox') {
    return value ? t('agora', 'Yes') : t('agora', 'No')
  }
  
  if (field.type === 'select') {
    const option = field.options?.find((opt: any) => opt.value === value)
    return option ? t('agora', option.label) : value
  }
  
  return value
}

const loadOption = async () => {
  if (!props.optionId) return
  
  loading.value = true
  error.value = null
  
  try {
    // Load option details
    // const response = await api.getOption(props.optionId)
    // option.value = response.data
    
    // For now, find in store
    const foundOption = optionsStore.options.find(opt => opt.id === props.optionId)
    if (foundOption) {
      option.value = foundOption
      editForm.value.text = foundOption.text
      
      // Load comments
      // const commentsResponse = await api.getOptionComments(props.optionId)
      // comments.value = commentsResponse.data
      
      // Mock comments for now
      comments.value = []
    } else {
      error.value = t('agora', 'Option not found')
    }
  } catch (err) {
    console.error('Error loading option:', err)
    error.value = t('agora', 'Failed to load option details')
  } finally {
    loading.value = false
  }
}

const closeDrawer = () => {
  show.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

const toggleSupport = async () => {
  if (!option.value || !option.value.canSupport) return
  
  try {
    // Toggle support via API
    // await api.toggleOptionSupport(option.value.id)
    
    // Update local state
    if (option.value.currentUserStatus) {
      const currentSupport = option.value.currentUserStatus.hasSupported
      option.value.currentUserStatus.hasSupported = !currentSupport
      option.value.currentUserStatus.countSupports += currentSupport ? -1 : 1
      
      // Emit update
      emit('updated', option.value)
    }
  } catch (err) {
    console.error('Error toggling support:', err)
  }
}

const editOption = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editForm.value.text = option.value?.text || ''
}

const saveEdit = async () => {
  if (!option.value || !editForm.value.text.trim()) return
  
  try {
    // Save via API
    // const response = await api.updateOption(option.value.id, { text: editForm.value.text })
    // option.value = response.data
    
    // Update local state
    option.value.text = editForm.value.text
    isEditing.value = false
    
    // Emit update
    emit('updated', option.value)
  } catch (err) {
    console.error('Error saving edit:', err)
    error.value = t('agora', 'Failed to save changes')
  }
}

const confirmDelete = () => {
  if (confirm(t('agora', 'Are you sure you want to delete this option?'))) {
    deleteOption()
  }
}

const deleteOption = async () => {
  if (!option.value) return
  
  try {
    // Delete via API
    // await api.deleteOption(option.value.id)
    
    // Emit deletion
    emit('deleted', option.value.id)
    closeDrawer()
  } catch (err) {
    console.error('Error deleting option:', err)
    error.value = t('agora', 'Failed to delete option')
  }
}

const addChildOption = () => {
  // This would trigger the parent to open the AddOptionModal with this option as parent
  closeDrawer()
  // The parent component should handle opening the modal
}

const submitComment = async () => {
  if (!option.value || !newComment.value.trim()) return
  
  try {
    // Submit comment via API
    // const response = await api.addComment(option.value.id, { text: newComment.value })
    // const newCommentObj = response.data
    
    // Add to local state
    const newCommentObj = {
      id: Date.now(),
      text: newComment.value,
      textMarkDown: newComment.value, // In real app, this would be processed
      author: sessionStore.currentUser,
      timestamp: Math.floor(Date.now() / 1000),
      canDelete: true
    }
    
    comments.value.unshift(newCommentObj)
    
    // Update comment count
    if (option.value.currentUserStatus) {
      option.value.currentUserStatus.countComments = (option.value.currentUserStatus.countComments || 0) + 1
    }
    
    // Reset form
    newComment.value = ''
    showCommentForm.value = false
    
    // Emit update
    emit('updated', option.value)
  } catch (err) {
    console.error('Error submitting comment:', err)
  }
}

const deleteComment = async (commentId: number) => {
  try {
    // Delete via API
    // await api.deleteComment(commentId)
    
    // Remove from local state
    const index = comments.value.findIndex(c => c.id === commentId)
    if (index !== -1) {
      comments.value.splice(index, 1)
      
      // Update comment count
      if (option.value?.currentUserStatus && option.value.currentUserStatus.countComments > 0) {
        option.value.currentUserStatus.countComments--
      }
      
      // Emit update
      if (option.value) {
        emit('updated', option.value)
      }
    }
  } catch (err) {
    console.error('Error deleting comment:', err)
  }
}

const scrollToComments = () => {
  if (commentsSection.value) {
    commentsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const openChildDetail = (childOption: Option) => {
  // In a real implementation, this might open a new drawer or navigate
  console.log('Open child detail:', childOption.id)
}

const handleChildSupport = (childOption: Option) => {
  console.log('Support child:', childOption.id)
}

const handleChildComment = (childOption: Option) => {
  console.log('Comment on child:', childOption.id)
}

// Lifecycle
onMounted(() => {
  loadOption()
})

watch(() => props.optionId, (newId) => {
  if (newId) {
    loadOption()
  }
})
</script>

<style scoped lang="scss">
.option-detail-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.3s ease;
}

.option-detail-drawer {
  width: 100%;
  max-width: 800px;
  height: 100%;
  background: var(--color-main-background);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 2px solid var(--color-border);
  background: var(--color-main-background);
  flex-shrink: 0;
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .option-type-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
}

.drawer-loading,
.drawer-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  flex: 1;
  text-align: center;
  
  p {
    margin-top: 16px;
    color: var(--color-text-lighter);
  }
}

.drawer-error {
  gap: 24px;
}

.drawer-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.option-content-section {
  margin-bottom: 32px;
  
  .option-text {
    margin-bottom: 24px;
    
    .editor-container {
      .edit-rich-text,
      .edit-textarea {
        width: 100%;
        border: 2px solid var(--color-border);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
        
        &:focus {
          border-color: var(--color-primary-element);
          outline: none;
        }
      }
      
      .edit-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
    }
    
    .display-text {
      .markdown-content {
        font-size: 16px;
        line-height: 1.6;
        
        :deep(*) {
          margin: 0 0 16px 0;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
        
        :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
          margin-top: 24px;
          margin-bottom: 12px;
        }
        
        :deep(ul), :deep(ol) {
          padding-left: 24px;
          margin-bottom: 16px;
        }
      }
      
      .plain-text {
        font-size: 16px;
        line-height: 1.6;
        white-space: pre-wrap;
        margin: 0;
      }
    }
  }
  
  .option-metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--color-background-dark);
    border-radius: 12px;
    border: 2px solid var(--color-border);
    
    .author-info {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .author-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
        
        .author-name {
          font-weight: 600;
          color: var(--color-main-text);
        }
        
        .creation-date {
          font-size: 12px;
          color: var(--color-text-lighter);
        }
      }
    }
    
    .option-stats {
      display: flex;
      gap: 24px;
      
      .stat-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        background: var(--color-main-background);
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        &:hover {
          background: var(--color-background-darker);
        }
        
        svg {
          color: var(--color-text-light);
        }
        
        .stat-count {
          font-weight: 600;
          color: var(--color-main-text);
        }
        
        .stat-label {
          font-size: 12px;
          color: var(--color-text-lighter);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }
  
  .misc-fields-section {
    margin-top: 24px;
    
    .section-title {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
    }
    
    .misc-fields-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
      background: var(--color-background-dark);
      border-radius: 12px;
      border: 2px solid var(--color-border);
      
      .misc-field {
        .field-label {
          display: block;
          font-size: 14px;
          color: var(--color-text-lighter);
          margin-bottom: 4px;
        }
        
        .field-value {
          display: block;
          font-size: 15px;
          color: var(--color-main-text);
          word-break: break-word;
        }
      }
    }
  }
}

.comments-section {
  margin-bottom: 32px;
  padding-top: 24px;
  border-top: 2px solid var(--color-border);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      font-size: 20px;
      color: var(--color-main-text);
      
      .comment-count {
        font-size: 16px;
        color: var(--color-text-lighter);
      }
    }
  }
  
  .comment-form {
    margin-bottom: 32px;
    padding: 16px;
    background: var(--color-background-dark);
    border: 2px solid var(--color-border);
    border-radius: 12px;
    
    .comment-input {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .comment-form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
  }
  
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .comment-item {
      padding: 16px;
      background: var(--color-background-dark);
      border: 2px solid var(--color-border);
      border-radius: 12px;
      
      .comment-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        
        .comment-author {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          
          .author-name {
            font-weight: 600;
            color: var(--color-main-text);
          }
          
          .comment-date {
            font-size: 12px;
            color: var(--color-text-lighter);
          }
        }
        
        .comment-actions {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        &:hover .comment-actions {
          opacity: 1;
        }
      }
      
      .comment-text {
        font-size: 14px;
        line-height: 1.5;
        color: var(--color-main-text);
        
        .markdown-content :deep(*) {
          margin: 0;
          font-size: 14px;
        }
      }
    }
  }
  
  .no-comments {
    text-align: center;
    padding: 40px 20px;
    background: var(--color-background-dark);
    border: 2px dashed var(--color-border);
    border-radius: 16px;
    
    svg {
      color: var(--color-text-lighter);
      margin-bottom: 16px;
    }
    
    h4 {
      margin: 0 0 8px 0;
      color: var(--color-main-text);
      font-size: 18px;
    }
    
    p {
      margin: 0;
      color: var(--color-text-lighter);
      font-style: italic;
    }
  }
}

.children-section {
  padding-top: 24px;
  border-top: 2px solid var(--color-border);
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 20px 0;
    font-size: 20px;
    color: var(--color-main-text);
    
    .children-count {
      font-size: 16px;
      color: var(--color-text-lighter);
    }
  }
  
  .children-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

// Animations
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  .option-detail-drawer {
    transform: translateX(100%);
  }
  
  .option-detail-drawer-overlay {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Responsive
@media (max-width: 768px) {
  .option-detail-drawer {
    max-width: 100%;
  }
  
  .drawer-header {
    padding: 12px 16px;
  }
  
  .scrollable-content {
    padding: 16px;
  }
  
  .option-metadata {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start !important;
    
    .option-stats {
      width: 100%;
      justify-content: space-between;
    }
  }
  
  .misc-fields-grid {
    grid-template-columns: 1fr !important;
  }
  
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start !important;
  }
  
  .children-section {
    .children-list {
      .option-card {
        margin: 0 -16px;
        border-radius: 0;
        border-left: none;
        border-right: none;
      }
    }
  }
}

@media (max-width: 480px) {
  .option-stats {
    flex-direction: column;
    gap: 12px !important;
    align-items: flex-start !important;
  }
}
</style>
