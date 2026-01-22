<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcModal
    v-if="show && amendmentId"
    :name="modalTitle"
    size="large"
    @close="closeModal"
  >
    <div class="amendment-detail-modal">
      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        <NcLoadingIcon :size="48" />
        <p>{{ t('agora', 'Loading amendment details...') }}</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <NcNoteCard type="error">
          {{ error }}
        </NcNoteCard>
        <NcButton @click="loadAmendment">
          {{ t('agora', 'Retry') }}
        </NcButton>
      </div>

      <!-- Content -->
      <div v-else-if="amendment" class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <div class="header-left">
            <div class="amendment-type-indicator">
              <component :is="InquiryOptionIcons.FileDocumentEdit" :size="24" />
            </div>
            <div class="header-text">
              <h2 class="amendment-title">{{ amendment.label }}</h2>
              <div class="amendment-meta">
                <span class="amendment-status" :class="`status-${amendment.status || 'proposed'}`">
                  {{ getStatusText(amendment.status || 'proposed') }}
                </span>
                <span class="amendment-date">{{ formatDate(amendment.created) }}</span>
              </div>
            </div>
          </div>
          
          <div class="header-right">
            <!-- Quick actions -->
            <div class="quick-actions">
              <TernarySupportIcon
                :support-value="userSupport"
                :size="20"
                class="support-icon"
                @click="toggleSupport"
              />
              
              <NcButton
                type="tertiary"
                class="comment-btn"
                @click="scrollToComments"
              >
                <component :is="InquiryOptionIcons.Comment" :size="16" />
                <span>{{ amendment.comment_count || 0 }}</span>
              </NcButton>
            </div>
            
            <!-- Status actions -->
            <NcActions
              v-if="canChangeStatus"
              :force-menu="true"
              :aria-label="t('agora', 'Status actions')"
            >
              <NcActionButton
                v-for="status in availableStatuses"
                :key="status.value"
                :close-after-click="true"
                @click="changeStatus(status.value)"
              >
                <template #icon>
                  <component :is="getStatusIcon(status.value)" :size="16" />
                </template>
                {{ status.label }}
              </NcActionButton>
            </NcActions>
            
            <!-- Main actions -->
            <NcActions
              v-if="canEditOrDelete"
              :force-menu="true"
              :aria-label="t('agora', 'Amendment actions')"
            >
              <NcActionButton
                v-if="canEdit"
                :close-after-click="true"
                @click="editAmendment"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Edit" :size="20" />
                </template>
                {{ t('agora', 'Edit') }}
              </NcActionButton>
              
              <NcActionButton
                v-if="canAddResponse"
                :close-after-click="true"
                @click="openAddResponseModal"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Plus" :size="20" />
                </template>
                {{ t('agora', 'Add response') }}
              </NcActionButton>
              
              <NcActionSeparator v-if="canDelete" />
              
              <NcActionButton
                v-if="canDelete"
                :close-after-click="true"
                @click="confirmDelete"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Delete" :size="20" />
                </template>
                {{ t('agora', 'Delete') }}
              </NcActionButton>
            </NcActions>
          </div>
        </div>

        <!-- Main content -->
        <div class="main-content">
          <!-- Article reference -->
          <div v-if="parentArticle" class="article-reference">
            <div class="reference-label">
              <component :is="InquiryOptionIcons.ArrowUp" :size="16" />
              {{ t('agora', 'Proposed amendment to:') }}
            </div>
            <div class="article-info">
              <component :is="InquiryOptionIcons.FileDocument" :size="20" />
              <span class="article-title">{{ parentArticle.label }}</span>
              <NcButton
                type="tertiary"
                size="small"
                @click="viewParentArticle"
              >
                {{ t('agora', 'View article') }}
              </NcButton>
            </div>
          </div>

          <!-- Amendment content -->
          <div class="content-section">
            <div v-if="isEditing" class="editor-container">
              <NcTextField
                v-model="editForm.label"
                :label="t('agora', 'Title')"
                :placeholder="t('agora', 'Enter amendment title')"
                required
                full-width
              />
              
              <NcTextField
                v-model="editForm.text"
                :label="t('agora', 'Amendment text')"
                :placeholder="t('agora', 'Describe the proposed changes...')"
                type="textarea"
                :rows="6"
                full-width
              />
              
              <div class="edit-actions">
                <NcButton type="tertiary" @click="cancelEdit">
                  {{ t('agora', 'Cancel') }}
                </NcButton>
                <NcButton type="primary" :disabled="!canSaveEdit" @click="saveEdit">
                  {{ t('agora', 'Save') }}
                </NcButton>
              </div>
            </div>
            
            <div v-else class="content-display">
              <div v-if="amendment.text" class="text-content">
                <h4>{{ t('agora', 'Proposed Change') }}</h4>
                <div class="text-text">
                  {{ amendment.text }}
                </div>
              </div>
              
              <!-- Article reference field -->
              <div v-if="amendment.article_ref" class="article-ref-display">
                <h4>{{ t('agora', 'Article Reference') }}</h4>
                <div class="article-ref-value">
                  {{ formatArticleRef(amendment.article_ref) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Support stats -->
          <div class="support-section">
            <h4>{{ t('agora', 'Support') }}</h4>
            <div class="support-stats">
              <div class="stat-item positive">
                <TernarySupportIcon
                  :support-value="'for'"
                  :size="20"
                />
                <div class="stat-content">
                  <span class="stat-value">{{ amendment.support_for || 0 }}</span>
                  <span class="stat-label">{{ t('agora', 'In favor') }}</span>
                </div>
              </div>
              
              <div class="stat-item negative">
                <TernarySupportIcon
                  :support-value="'against'"
                  :size="20"
                  :invert="true"
                />
                <div class="stat-content">
                  <span class="stat-value">{{ amendment.support_against || 0 }}</span>
                  <span class="stat-label">{{ t('agora', 'Against') }}</span>
                </div>
              </div>
              
              <div class="stat-actions">
                <TernarySupportIcon
                  v-if="!userSupport || userSupport === 'neutral'"
                  :support-value="null"
                  :size="24"
                  class="neutral-support"
                  @click="setSupport('for')"
                />
                <TernarySupportIcon
                  v-else
                  :support-value="userSupport"
                  :size="24"
                  @click="toggleSupport"
                />
                <span class="support-hint">{{ getSupportHint() }}</span>
              </div>
            </div>
          </div>

          <!-- Responses -->
          <div class="responses-section">
            <div class="section-header">
              <h4>{{ t('agora', 'Responses') }}</h4>
              <NcButton
                v-if="canAddResponse"
                type="primary"
                @click="openAddResponseModal"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Plus" :size="16" />
                </template>
                {{ t('agora', 'Add response') }}
              </NcButton>
            </div>
            
            <div class="responses-list">
              <div v-if="responses.length === 0" class="empty-responses">
                <component :is="InquiryOptionIcons.MessageText" :size="48" />
                <h5>{{ t('agora', 'No responses yet') }}</h5>
                <p>{{ t('agora', 'Be the first to respond to this amendment') }}</p>
              </div>
              
              <div v-else class="response-items">
                <OptionCard
                  v-for="response in responses"
                  :key="response.id"
                  :option="response"
                  :inquiry-id="inquiryId"
                  :compact="true"
                  @click="openResponseDetail(response)"
                />
              </div>
            </div>
          </div>

          <!-- Comments -->
          <div ref="commentsSection" class="comments-section">
            <div class="section-header">
              <h4>{{ t('agora', 'Comments') }}</h4>
              <NcButton
                type="primary"
                @click="showCommentForm = !showCommentForm"
              >
                <template #icon>
                  <component :is="showCommentForm ? InquiryOptionIcons.Close : InquiryOptionIcons.Comment" :size="16" />
                </template>
                {{ showCommentForm ? t('agora', 'Cancel') : t('agora', 'Add comment') }}
              </NcButton>
            </div>
            
            <!-- Comment form -->
            <transition name="fade">
              <div v-if="showCommentForm" class="comment-form">
                <CommentAdd
                  :inquiry-id="inquiryId"
                  :option-id="amendment.id"
                  @comment-added="handleCommentAdded"
                />
              </div>
            </transition>
            
            <!-- Comments list -->
            <div v-if="comments.length > 0" class="comments-list">
              <Comments
                :inquiry-id="inquiryId"
                :option-id="amendment.id"
              />
            </div>
            
            <div v-else-if="!showCommentForm" class="no-comments">
              <component :is="InquiryOptionIcons.Comment" :size="48" />
              <h5>{{ t('agora', 'No comments yet') }}</h5>
              <p>{{ t('agora', 'Start the discussion about this amendment') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NcModal>
  
  <!-- Response detail modal -->
  <OptionDetailModal
    v-if="showResponseModal"
    :option-id="selectedResponseId"
    :inquiry-id="inquiryId"
    @close="closeResponseModal"
    @updated="handleResponseUpdated"
    @deleted="handleResponseDeleted"
  />
  
  <!-- Add response modal -->
  <AddOptionModal
    v-if="showAddResponseModal"
    :inquiry-id="inquiryId"
    :option-type="selectedResponseType"
    :parent-id="amendment?.id"
    @close="closeAddResponseModal"
    @created="handleResponseCreated"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'

import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { TernarySupportIcon } from '../../utils/AppIcons.ts'

// Import components
import Comments from '../Comments/Comments.vue'
import CommentAdd from '../Comments/CommentAdd.vue'
import OptionCard from './OptionCard.vue'
import OptionDetailModal from './OptionDetailModal.vue'
import AddOptionModal from './AddOptionModal.vue'

// Types
import type { Option } from '../../Types/index.ts'

// Props
const props = defineProps<{
  amendmentId: number | null
  inquiryId: number
}>()

// Emits
const emit = defineEmits<{
  close: []
  updated: [amendment: Option]
  deleted: [amendmentId: number]
  viewArticle: [articleId: number]
}>()

// Stores
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const show = ref(true)
const loading = ref(false)
const error = ref<string | null>(null)
const amendment = ref<Option | null>(null)
const parentArticle = ref<Option | null>(null)
const responses = ref<Option[]>([])
const comments = ref<any[]>([])
const showCommentForm = ref(false)
const isEditing = ref(false)
const editForm = ref({
  label: '',
  text: ''
})
const userSupport = ref<'for' | 'against' | null>(null)
const showResponseModal = ref(false)
const selectedResponseId = ref<number | null>(null)
const showAddResponseModal = ref(false)
const selectedResponseType = ref<string | null>(null)

const commentsSection = ref<HTMLElement | null>(null)

// Computed
const modalTitle = computed(() => {
  return amendment.value?.label || t('agora', 'Amendment Details')
})

const canEdit = computed(() => {
  if (!amendment.value?.owner) return false
  return sessionStore.currentUser?.id === amendment.value.owner.id
})

const canDelete = computed(() => {
  if (!amendment.value?.owner) return false
  return sessionStore.currentUser?.id === amendment.value.owner.id
})

const canAddResponse = computed(() => {
  if (!amendment.value?.id) return false
  return sessionStore.currentUser?.id !== undefined
})

const canEditOrDelete = computed(() => {
  return canEdit.value || canDelete.value || canAddResponse.value
})

const canChangeStatus = computed(() => {
  // Check if user can change amendment status (e.g., article owner or admin)
  if (!amendment.value?.parentId || !parentArticle.value) return false
  
  // Article owner can change amendment status
  return parentArticle.value.owner?.id === sessionStore.currentUser?.id
})

const canSaveEdit = computed(() => {
  return editForm.value.label.trim().length > 0
})

const availableStatuses = computed(() => {
  const statuses = [
    { value: 'proposed', label: t('agora', 'Proposed'), icon: 'Lightbulb' },
    { value: 'under_review', label: t('agora', 'Under Review'), icon: 'ClockOutline' },
    { value: 'accepted', label: t('agora', 'Accepted'), icon: 'Check' },
    { value: 'rejected', label: t('agora', 'Rejected'), icon: 'Cancel' }
  ]
  
  // Filter out current status
  const currentStatus = amendment.value?.status || 'proposed'
  return statuses.filter(status => status.value !== currentStatus)
})

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'proposed': t('agora', 'Proposed'),
    'under_review': t('agora', 'Under Review'),
    'accepted': t('agora', 'Accepted'),
    'rejected': t('agora', 'Rejected'),
    'draft': t('agora', 'Draft'),
    'published': t('agora', 'Published')
  }
  return statusMap[status] || status
}

const getStatusIcon = (status: string) => {
  const iconMap: Record<string, any> = {
    'proposed': InquiryOptionIcons.Lightbulb,
    'under_review': InquiryOptionIcons.ClockOutline,
    'accepted': InquiryOptionIcons.Check,
    'rejected': InquiryOptionIcons.Cancel,
    'draft': InquiryOptionIcons.Pencil,
    'published': InquiryOptionIcons.CheckCircle
  }
  return iconMap[status] || InquiryOptionIcons.Circle
}

const formatArticleRef = (articleRef: any) => {
  if (typeof articleRef === 'number') {
    const article = optionsStore.options.find(opt => opt.id === articleRef)
    return article?.label || `Article #${articleRef}`
  }
  return articleRef.toString()
}

const getSupportHint = () => {
  if (!userSupport.value) return t('agora', 'Click to support')
  if (userSupport.value === 'for') return t('agora', 'You support this amendment')
  if (userSupport.value === 'against') return t('agora', 'You oppose this amendment')
  return t('agora', 'Click to support')
}

const loadAmendment = async () => {
  if (!props.amendmentId) return
  
  loading.value = true
  error.value = null
  
  try {
    // Find amendment in store
    const foundAmendment = optionsStore.options.find(opt => opt.id === props.amendmentId)
    if (foundAmendment) {
      amendment.value = foundAmendment
      editForm.value = {
        label: foundAmendment.label || '',
        text: foundAmendment.text || ''
      }
      
      // Load user support
      if (foundAmendment.user_support !== undefined) {
        userSupport.value = foundAmendment.user_support
      }
      
      // Load parent article
      if (foundAmendment.parentId) {
        parentArticle.value = optionsStore.options.find(opt => opt.id === foundAmendment.parentId) || null
        
        // Also check article_ref field
        if (foundAmendment.article_ref && !parentArticle.value) {
          parentArticle.value = optionsStore.options.find(opt => 
            opt.id === foundAmendment.article_ref || 
            opt.id === parseInt(foundAmendment.article_ref)
          ) || null
        }
      }
      
      // Load responses
      responses.value = optionsStore.options.filter(opt => 
        opt.parentId === foundAmendment.id
      )
      
      // Load comments (TODO: Load actual comments)
      comments.value = []
    } else {
      error.value = t('agora', 'Amendment not found')
    }
  } catch (err) {
    console.error('Error loading amendment:', err)
    error.value = t('agora', 'Failed to load amendment details')
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  show.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

const toggleSupport = () => {
  if (!amendment.value) return
  
  if (userSupport.value === 'for') {
    userSupport.value = null
    if (amendment.value.support_for > 0) {
      amendment.value.support_for--
    }
  } else if (userSupport.value === 'against') {
    userSupport.value = 'for'
    amendment.value.support_for = (amendment.value.support_for || 0) + 1
    if (amendment.value.support_against > 0) {
      amendment.value.support_against--
    }
  } else {
    userSupport.value = 'for'
    amendment.value.support_for = (amendment.value.support_for || 0) + 1
  }
  
  // Update in store
  const index = optionsStore.options.findIndex(opt => opt.id === amendment.value?.id)
  if (index >= 0) {
    optionsStore.options[index] = {
      ...optionsStore.options[index],
      user_support: userSupport.value,
      support_for: amendment.value.support_for,
      support_against: amendment.value.support_against
    }
  }
  
  emit('updated', amendment.value)
}

const setSupport = (support: 'for' | 'against') => {
  if (!amendment.value) return
  
  if (support === 'for') {
    if (userSupport.value === 'for') {
      userSupport.value = null
      if (amendment.value.support_for > 0) {
        amendment.value.support_for--
      }
    } else {
      userSupport.value = 'for'
      amendment.value.support_for = (amendment.value.support_for || 0) + 1
      
      // If previously against, decrement against count
      if (userSupport.value === 'against' && amendment.value.support_against > 0) {
        amendment.value.support_against--
      }
    }
  } else if (support === 'against') {
    if (userSupport.value === 'against') {
      userSupport.value = null
      if (amendment.value.support_against > 0) {
        amendment.value.support_against--
      }
    } else {
      userSupport.value = 'against'
      amendment.value.support_against = (amendment.value.support_against || 0) + 1
      
      // If previously for, decrement for count
      if (userSupport.value === 'for' && amendment.value.support_for > 0) {
        amendment.value.support_for--
      }
    }
  }
  
  // Update in store
  const index = optionsStore.options.findIndex(opt => opt.id === amendment.value?.id)
  if (index >= 0) {
    optionsStore.options[index] = {
      ...optionsStore.options[index],
      user_support: userSupport.value,
      support_for: amendment.value.support_for,
      support_against: amendment.value.support_against
    }
  }
  
  emit('updated', amendment.value)
}

const scrollToComments = () => {
  if (commentsSection.value) {
    commentsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const editAmendment = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  if (amendment.value) {
    editForm.value = {
      label: amendment.value.label || '',
      text: amendment.value.text || ''
    }
  }
}

const saveEdit = async () => {
  if (!amendment.value || !canSaveEdit.value) return
  
  try {
    // Update amendment in store
    const updatedAmendment = {
      ...amendment.value,
      label: editForm.value.label,
      text: editForm.value.text,
      modified: new Date().toISOString()
    }
    
    const index = optionsStore.options.findIndex(opt => opt.id === amendment.value?.id)
    if (index >= 0) {
      optionsStore.options[index] = updatedAmendment
    }
    
    amendment.value = updatedAmendment
    isEditing.value = false
    
    emit('updated', updatedAmendment)
  } catch (err) {
    console.error('Error saving edit:', err)
    error.value = t('agora', 'Failed to save changes')
  }
}

const changeStatus = async (status: string) => {
  if (!amendment.value) return
  
  try {
    const updatedAmendment = {
      ...amendment.value,
      status: status,
      modified: new Date().toISOString()
    }
    
    const index = optionsStore.options.findIndex(opt => opt.id === amendment.value?.id)
    if (index >= 0) {
      optionsStore.options[index] = updatedAmendment
    }
    
    amendment.value = updatedAmendment
    
    emit('updated', updatedAmendment)
  } catch (err) {
    console.error('Error changing status:', err)
    error.value = t('agora', 'Failed to change status')
  }
}

const confirmDelete = () => {
  if (confirm(t('agora', 'Are you sure you want to delete this amendment?'))) {
    deleteAmendment()
  }
}

const deleteAmendment = async () => {
  if (!amendment.value) return
  
  try {
    // Remove from store
    const index = optionsStore.options.findIndex(opt => opt.id === amendment.value?.id)
    if (index >= 0) {
      optionsStore.options.splice(index, 1)
    }
    
    emit('deleted', amendment.value.id)
    closeModal()
  } catch (err) {
    console.error('Error deleting amendment:', err)
    error.value = t('agora', 'Failed to delete amendment')
  }
}

const viewParentArticle = () => {
  if (parentArticle.value) {
    emit('viewArticle', parentArticle.value.id)
    closeModal()
  }
}

const openAddResponseModal = () => {
  // Amendments can have arguments_for, arguments_against, official_summary as responses
  // Let user choose
  selectedResponseType.value = 'argument_for' // Default
  showAddResponseModal.value = true
}

const closeAddResponseModal = () => {
  showAddResponseModal.value = false
  selectedResponseType.value = null
}

const handleResponseCreated = (newResponse: Option) => {
  optionsStore.options.push(newResponse)
  closeAddResponseModal()
  loadAmendment() // Reload to update responses list
}

const openResponseDetail = (response: Option) => {
  selectedResponseId.value = response.id
  showResponseModal.value = true
}

const closeResponseModal = () => {
  showResponseModal.value = false
  selectedResponseId.value = null
}

const handleResponseUpdated = (updatedResponse: Option) => {
  // Update response in store
  const index = optionsStore.options.findIndex(opt => opt.id === updatedResponse.id)
  if (index >= 0) {
    optionsStore.options[index] = updatedResponse
  }
}

const handleResponseDeleted = (deletedResponseId: number) => {
  // Remove response from store
  const index = optionsStore.options.findIndex(opt => opt.id === deletedResponseId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
  }
  
  // Reload amendment to update responses list
  loadAmendment()
}

const handleCommentAdded = () => {
  // Update comment count
  if (amendment.value) {
    amendment.value.comment_count = (amendment.value.comment_count || 0) + 1
    
    // Update in store
    const index = optionsStore.options.findIndex(opt => opt.id === amendment.value?.id)
    if (index >= 0) {
      optionsStore.options[index] = amendment.value
    }
    
    emit('updated', amendment.value)
  }
}

// Lifecycle
onMounted(() => {
  loadAmendment()
})

watch(() => props.amendmentId, (newId) => {
  if (newId) {
    loadAmendment()
  }
})
</script>

<style scoped lang="scss">
.amendment-detail-modal {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 800px;

  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 40px;
    text-align: center;
    
    p {
      margin-top: 16px;
      color: var(--color-text-lighter);
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-main-background);
    flex-shrink: 0;

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
      min-width: 0;

      .amendment-type-indicator {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary-light);
        border-radius: 10px;
        color: var(--color-primary-element);
      }

      .header-text {
        flex: 1;
        min-width: 0;

        .amendment-title {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-main-text);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .amendment-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--color-text-lighter);

          .amendment-status {
            padding: 2px 8px;
            border-radius: 8px;
            font-weight: 600;
            
            &.status-proposed {
              background: var(--color-warning-light);
              color: var(--color-warning);
            }
            
            &.status-under_review {
              background: var(--color-info-light);
              color: var(--color-info);
            }
            
            &.status-accepted {
              background: var(--color-success-light);
              color: var(--color-success);
            }
            
            &.status-rejected {
              background: var(--color-error-light);
              color: var(--color-error);
            }
          }
        }
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;

      .quick-actions {
        display: flex;
        align-items: center;
        gap: 8px;

        .support-icon {
          cursor: pointer;
          color: var(--color-text-light);
          transition: color 0.2s ease;
          
          &:hover {
            color: var(--color-primary-element);
          }
        }

        .comment-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .article-reference {
      padding: 16px;
      background: var(--color-background-dark);
      border-radius: 12px;
      border: 1px solid var(--color-border);

      .reference-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--color-text-lighter);
        margin-bottom: 8px;
      }

      .article-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .article-title {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-main-text);
        }
      }
    }

    .content-section {
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 12px;
        border: 1px solid var(--color-border);

        .edit-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }
      }

      .content-display {
        .text-content {
          margin-bottom: 20px;

          h4 {
            margin: 0 0 12px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--color-main-text);
          }

          .text-text {
            font-size: 16px;
            line-height: 1.6;
            color: var(--color-main-text);
            white-space: pre-wrap;
            padding: 16px;
            background: var(--color-background-dark);
            border-radius: 8px;
            border: 1px solid var(--color-border);
          }
        }

        .article-ref-display {
          h4 {
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--color-text-light);
          }

          .article-ref-value {
            font-size: 16px;
            color: var(--color-main-text);
            padding: 12px;
            background: var(--color-background-dark);
            border-radius: 8px;
            border: 1px solid var(--color-border);
          }
        }
      }
    }

    .support-section {
      h4 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .support-stats {
        display: flex;
        align-items: center;
        gap: 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 12px;
        border: 1px solid var(--color-border);

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          min-width: 120px;

          &.positive {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.negative {
            background: var(--color-error-light);
            color: var(--color-error);
          }

          .stat-content {
            display: flex;
            flex-direction: column;
            gap: 2px;

            .stat-value {
              font-size: 24px;
              font-weight: 700;
            }

            .stat-label {
              font-size: 12px;
              font-weight: 600;
            }
          }
        }

        .stat-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-left: auto;

          .neutral-support {
            cursor: pointer;
            color: var(--color-text-lighter);
            transition: color 0.2s ease;
            
            &:hover {
              color: var(--color-primary-element);
            }
          }

          .support-hint {
            font-size: 12px;
            color: var(--color-text-lighter);
            text-align: center;
            max-width: 120px;
          }
        }
      }
    }

    .responses-section {
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-main-text);
        }
      }

      .responses-list {
        .empty-responses {
          text-align: center;
          padding: 40px 20px;
          background: var(--color-background-dark);
          border: 2px dashed var(--color-border);
          border-radius: 16px;

          svg {
            color: var(--color-text-lighter);
            margin-bottom: 16px;
          }

          h5 {
            margin: 0 0 8px 0;
            color: var(--color-main-text);
            font-size: 16px;
          }

          p {
            margin: 0;
            color: var(--color-text-lighter);
            font-style: italic;
          }
        }

        .response-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }
    }

    .comments-section {
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-main-text);
        }
      }

      .comment-form {
        margin-bottom: 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 12px;
        border: 1px solid var(--color-border);
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

        h5 {
          margin: 0 0 8px 0;
          color: var(--color-main-text);
          font-size: 16px;
        }

        p {
          margin: 0;
          color: var(--color-text-lighter);
          font-style: italic;
        }
      }
    }
  }
}

// Fade transition for comment form
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .amendment-detail-modal {
    height: 90vh;

    .modal-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      .header-left {
        width: 100%;
      }

      .header-right {
        width: 100%;
        justify-content: space-between;
      }
    }

    .main-content {
      padding: 16px;

      .support-section {
        .support-stats {
          flex-direction: column;
          align-items: stretch;
          gap: 16px;

          .stat-actions {
            margin-left: 0;
            margin-top: 16px;
          }
        }
      }
    }
  }
}
</style>
