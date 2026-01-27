<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="structure-tree-view">
    <!-- Document header -->
    <div class="document-header">
      <div class="document-title">
        <component :is="InquiryOptionIcons.BookOpen" :size="24" />
        <h2>{{ proposalTitle }}</h2>
        <NcButton 
          v-if="canAddOption('chapter')"
          type="tertiary" 
          @click="openAddOptionModal('chapter')"
        >
          + {{ t('agora', 'Add Chapter') }}
        </NcButton>
      </div>
      <div class="document-meta">
        <span class="meta-item">
          <component :is="InquiryOptionIcons.ClockOutline" :size="16" />
          {{ t('agora', 'Last updated') }}: {{ formatDate(lastUpdated) }}
        </span>
      </div>
    </div>

    <!-- Tree navigation -->
    <div class="tree-navigation">
      <button 
        v-for="chapter in rootChapters" 
        :key="chapter.id"
        :class="['nav-chapter', { 'active': activeChapterId === chapter.id }]"
        @click="setActiveChapter(chapter.id)"
      >
        {{ chapter.label }}
      </button>
    </div>

    <!-- Main tree content -->
    <div class="tree-content">
      <!-- Active chapter editing -->
      <div v-if="activeChapter" class="chapter-editor">
        <div class="chapter-header">
          <div class="chapter-title">
            <component :is="InquiryOptionIcons.BookOpenVariant" :size="20" />
            <h3>{{ activeChapter.label }}</h3>
            <NcButton 
              v-if="canAddOption('section', activeChapter.id)"
              type="tertiary" 
              @click="openAddOptionModal('section', activeChapter.id)"
            >
              + {{ t('agora', 'Add Section') }}
            </NcButton>
            <NcButton 
              v-if="canAddOption('article', activeChapter.id)"
              type="tertiary" 
              @click="openAddOptionModal('article', activeChapter.id)"
            >
              + {{ t('agora', 'Add Article') }}
            </NcButton>
          </div>
        </div>

        <!-- Sections -->
        <div v-for="section in getChildOptions(activeChapter.id, 'section')" :key="section.id" class="section-block">
          <div class="section-header">
            <component :is="InquiryOptionIcons.FormatListBulleted" :size="18" />
            <h4>{{ section.label }}</h4>
            <NcButton 
              v-if="canAddOption('article', section.id)"
              type="tertiary" 
              @click="openAddOptionModal('article', section.id)"
            >
              + {{ t('agora', 'Add Article') }}
            </NcButton>
          </div>
          
          <!-- Articles in this section -->
          <div class="articles-container">
            <div 
              v-for="article in getChildOptions(section.id, 'article')" 
              :key="article.id"
              :class="['article-item', { 'active': activeArticleId === article.id }]"
            >
              <div class="article-header">
                <component :is="InquiryOptionIcons.FileDocument" :size="16" />
                <h5>{{ article.label }}</h5>
                <div class="article-actions">
                  <NcButton 
                    v-if="canAddOption('amendment', article.id)"
                    type="tertiary" 
                    @click.stop="openAddOptionModal('amendment', article.id)"
                  >
                    + {{ t('agora', 'Amendment') }}
                  </NcButton>
                  <button 
                    class="toggle-details"
                    @click.stop="toggleArticleDetails(article.id)"
                  >
                    <component 
                      :is="showDetails[article.id] ? InquiryOptionIcons.ChevronUp : InquiryOptionIcons.ChevronDown" 
                      :size="16" 
                    />
                  </button>
                </div>
              </div>
              
              <!-- Article content and details -->
              <Transition name="slide-fade">
                <div v-if="showDetails[article.id]" class="article-details">
                  <!-- Article content editing -->
                  <div class="article-content-editor">
                    <div class="editor-header">
                      <h6>{{ t('agora', 'Content') }}</h6>
                      <div class="editor-actions">
                        <NcButton 
                          type="primary" 
                          @click="saveArticle(article)"
                          :disabled="!canEditArticle(article)"
                        >
                          {{ t('agora', 'Save') }}
                        </NcButton>
                        <NcButton 
                          type="tertiary" 
                          @click="cancelEdit(article.id)"
                        >
                          {{ t('agora', 'Cancel') }}
                        </NcButton>
                      </div>
                    </div>
                    <NcTextField 
                      v-model="editedContents[article.id]" 
                      :label="t('agora', 'Article text')"
                      type="textarea"
                      :rows="6"
                      full-width
                      :disabled="!canEditArticle(article)"
                    />
                  </div>
                  
                  <!-- Support & Comments side panel -->
                  <div class="article-side-panel">
                    <!-- Support panel -->
                    <div class="support-panel">
                      <h6>{{ t('agora', 'Support') }}</h6>
                      <div class="support-stats">
                        <div class="stat-item positive">
                          <component :is="InquiryOptionIcons.ThumbUp" :size="20" />
                          <span class="stat-value">{{ article.support_for || 0 }}</span>
                          <span class="stat-label">{{ t('agora', 'For') }}</span>
                        </div>
                        <div class="stat-item negative">
                          <component :is="InquiryOptionIcons.ThumbDown" :size="20" />
                          <span class="stat-value">{{ article.support_against || 0 }}</span>
                          <span class="stat-label">{{ t('agora', 'Against') }}</span>
                        </div>
                      </div>
                      <TernarySupportButton
                        v-if="canSupportArticle(article)"
                        :support-value="article.user_support"
                        :option-id="article.id"
                        :inquiry-id="inquiryId"
                        @support-changed="handleSupportChanged(article.id, $event)"
                      />
                    </div>
                    
                    <!-- Comments panel -->
                    <div class="comments-panel">
                      <h6>{{ t('agora', 'Comments') }}</h6>
                      <div class="comments-container">
                        <Comments
                          v-if="article.id"
                          :inquiry-id="inquiryId"
                          :option-id="article.id"
                        />
                        <CommentAdd
                          v-if="canCommentOnArticle(article)"
                          :inquiry-id="inquiryId"
                          :option-id="article.id"
                          @comment-added="handleCommentAdded(article.id)"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Amendments list -->
                  <div v-if="getChildOptions(article.id, 'amendment').length > 0" class="amendments-section">
                    <h6>{{ t('agora', 'Proposed Amendments') }}</h6>
                    <div class="amendments-list">
                      <OptionCard
                        v-for="amendment in getChildOptions(article.id, 'amendment')"
                        :key="amendment.id"
                        :option="amendment"
                        :inquiry-id="inquiryId"
                        compact
                        @click="openAmendmentDetail(amendment)"
                        @support-changed="handleAmendmentSupportChanged"
                        @comment-added="handleAmendmentCommentAdded"
                      />
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Articles without sections -->
        <div v-if="getChildOptions(activeChapter.id, 'article').length > 0" class="articles-no-section">
          <div class="section-header">
            <h4>{{ t('agora', 'Articles') }}</h4>
          </div>
          <div class="articles-container">
            <div 
              v-for="article in getChildOptions(activeChapter.id, 'article')" 
              :key="article.id"
              :class="['article-item', { 'active': activeArticleId === article.id }]"
            >
              <!-- Same article structure as above -->
              <div class="article-header">
                <component :is="InquiryOptionIcons.FileDocument" :size="16" />
                <h5>{{ article.label }}</h5>
                <div class="article-actions">
                  <NcButton 
                    v-if="canAddOption('amendment', article.id)"
                    type="tertiary" 
                    @click.stop="openAddOptionModal('amendment', article.id)"
                  >
                    + {{ t('agora', 'Amendment') }}
                  </NcButton>
                  <button 
                    class="toggle-details"
                    @click.stop="toggleArticleDetails(article.id)"
                  >
                    <component 
                      :is="showDetails[article.id] ? InquiryOptionIcons.ChevronUp : InquiryOptionIcons.ChevronDown" 
                      :size="16" 
                    />
                  </button>
                </div>
              </div>
              
              <!-- Article details (same as above) -->
              <Transition name="slide-fade">
                <div v-if="showDetails[article.id]" class="article-details">
                  <!-- Same structure as above -->
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- No chapter selected -->
      <div v-else class="no-chapter-selected">
        <component :is="InquiryOptionIcons.BookOpenVariant" :size="48" />
        <h4>{{ t('agora', 'Select a chapter') }}</h4>
        <p>{{ t('agora', 'Click on a chapter in the navigation to view and edit its content') }}</p>
      </div>
    </div>

    <!-- Modals -->
    <AddOptionModal
      v-if="showAddOptionModal"
      :inquiry-id="inquiryId"
      :option-type="selectedOptionTypeKey"
      :parent-id="selectedParentId"
      @close="closeAddOptionModal"
      @created="handleOptionCreated"
    />
    
    <AmendmentDetailModal
  v-if="showAmendmentModal"
  :amendment-id="selectedAmendmentId"
  :inquiry-id="inquiryId"
  @close="closeAmendmentModal"
  @updated="handleAmendmentUpdated"
  @deleted="handleAmendmentDeleted"
  @view-article="handleViewArticle"
/>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'

// Import comment and support components
import Comments from '../Comments/Comments.vue'
import CommentAdd from '../Comments/CommentAdd.vue'
import { TernarySupportIcon, ThumbIcon } from '../AppIcons'

import OptionCard from './OptionCard.vue'
import AddOptionModal from './AddOptionModal.vue'
import OptionDetailDrawer from './OptionDetailDrawer.vue'

// Props
const props = defineProps<{
  inquiryId: number
}>()

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const activeChapterId = ref<number | null>(null)
const activeArticleId = ref<number | null>(null)
const showDetails = ref<Record<number, boolean>>({})
const editedContents = ref<Record<number, string>>({})
const showAddOptionModal = ref(false)
const showOptionDetail = ref(false)
const selectedOptionTypeKey = ref<string | null>(null)
const selectedParentId = ref<number | null>(null)
const selectedOptionId = ref<number | null>(null)
const showAmendmentModal = ref(false)
const selectedAmendmentId = ref<number | null>(null)


// Computed
const proposalTitle = computed(() => {
  return inquiryStore.inquiry?.label || t('agora', 'Untitled Proposal')
})

const lastUpdated = computed(() => {
  const options = optionsStore.options
  if (options.length === 0) return new Date()
  
  const latest = options.reduce((latest, opt) => {
    const optDate = new Date(opt.modified || opt.created || 0)
    return optDate > latest ? optDate : latest
  }, new Date(0))
  
  return latest
})

const rootChapters = computed(() => {
  return optionsStore.options.filter(opt => 
    opt.type === 'chapter' && (!opt.parentId || opt.parentId === 0)
  )
})

const activeChapter = computed(() => {
  if (!activeChapterId.value) return null
  return optionsStore.options.find(opt => opt.id === activeChapterId.value)
})

// Helper methods
const getChildOptions = (parentId: number, type?: string) => {
  const children = optionsStore.options.filter(opt => opt.parentId === parentId)
  if (type) {
    return children.filter(opt => opt.type === type)
  }
  return children
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Permission checks
const canAddOption = (type: string, parentId?: number) => {
  // Check if user can add this type of option
  // TODO: Implement proper permission check
  return sessionStore.currentUser?.id !== undefined
}

const canEditArticle = (article: any) => {
  // Check if user can edit this article
  // TODO: Implement proper permission check
  return sessionStore.currentUser?.id === article.owner?.id
}

const canSupportArticle = (article: any) => {
  // Check if support is enabled for articles
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === 'article' || opt.optionType === 'article'
  )
  return optionType?.support_feature !== 'none'
}


const canCommentOnArticle = (article: any) => {
  // Check if comments are allowed for articles
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === 'article' || opt.optionType === 'article'
  )
  return optionType?.allow_comment !== false
}

// Methods
const setActiveChapter = (chapterId: number) => {
  activeChapterId.value = chapterId
  activeArticleId.value = null
  // Close all article details when switching chapters
  showDetails.value = {}
}

const toggleArticleDetails = (articleId: number) => {
  showDetails.value[articleId] = !showDetails.value[articleId]
  if (showDetails.value[articleId]) {
    activeArticleId.value = articleId
    // Initialize edited content if not already set
    if (!editedContents.value[articleId]) {
      const article = optionsStore.options.find(opt => opt.id === articleId)
      editedContents.value[articleId] = article?.text || ''
    }
  } else {
    if (activeArticleId.value === articleId) {
      activeArticleId.value = null
    }
  }
}

const cancelEdit = (articleId: number) => {
  showDetails.value[articleId] = false
  delete editedContents.value[articleId]
  if (activeArticleId.value === articleId) {
    activeArticleId.value = null
  }
}

const saveArticle = async (article: any) => {
  if (!editedContents.value[article.id]) return
  
  try {
    // TODO: Implement API call to save article content
    console.log('Saving article:', article.id, editedContents.value[article.id])
    
    // Update local store
    const index = optionsStore.options.findIndex(opt => opt.id === article.id)
    if (index >= 0) {
      optionsStore.options[index] = {
        ...optionsStore.options[index],
        text: editedContents.value[article.id],
        modified: new Date().toISOString()
      }
    }
    
    // Close edit mode
    cancelEdit(article.id)
    
  } catch (error) {
    console.error('Error saving article:', error)
  }
}

const openAddOptionModal = (optionTypeKey: string, parentId?: number) => {
  selectedOptionTypeKey.value = optionTypeKey
  selectedParentId.value = parentId || null
  showAddOptionModal.value = true
}

const closeAddOptionModal = () => {
  showAddOptionModal.value = false
  selectedOptionTypeKey.value = null
  selectedParentId.value = null
}

const openAmendmentDetail = (amendment: any) => {
  selectedOptionId.value = amendment.id
  showOptionDetail.value = true
}

const closeOptionDetail = () => {
  showOptionDetail.value = false
  selectedOptionId.value = null
}

const openAmendmentDetail = (amendment: any) => {
  selectedAmendmentId.value = amendment.id
  showAmendmentModal.value = true
}

const closeAmendmentModal = () => {
  showAmendmentModal.value = false
  selectedAmendmentId.value = null
}

const handleAmendmentUpdated = (updatedAmendment: any) => {
  const index = optionsStore.options.findIndex(opt => opt.id === updatedAmendment.id)
  if (index >= 0) {
    optionsStore.options[index] = updatedAmendment
  }
}

const handleAmendmentDeleted = (deletedAmendmentId: number) => {
  const index = optionsStore.options.findIndex(opt => opt.id === deletedAmendmentId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
  }
  closeAmendmentModal()
}

const handleViewArticle = (articleId: number) => {
  // Find and expand the article
  const article = optionsStore.options.find(opt => opt.id === articleId)
  if (article) {
    // Set active chapter if needed
    if (article.parentId) {
      const parent = optionsStore.options.find(opt => opt.id === article.parentId)
      if (parent?.type === 'chapter') {
        setActiveChapter(parent.id)
      }
    }
    
    // Expand article details
    toggleArticleDetails(articleId)
    
    // Scroll to article
    setTimeout(() => {
      const articleElement = document.querySelector(`[data-article-id="${articleId}"]`)
      if (articleElement) {
        articleElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }
}


const handleSupportChanged = (articleId: number, support: string) => {
  // Update article support in local store
  const index = optionsStore.options.findIndex(opt => opt.id === articleId)
  if (index >= 0) {
    const article = optionsStore.options[index]
    if (support === 'for') {
      article.support_for = (article.support_for || 0) + 1
      if (article.user_support === 'against') {
        article.support_against = Math.max(0, (article.support_against || 0) - 1)
      }
    } else if (support === 'against') {
      article.support_against = (article.support_against || 0) + 1
      if (article.user_support === 'for') {
        article.support_for = Math.max(0, (article.support_for || 0) - 1)
      }
    } else if (support === 'neutral') {
      if (article.user_support === 'for') {
        article.support_for = Math.max(0, (article.support_for || 0) - 1)
      } else if (article.user_support === 'against') {
        article.support_against = Math.max(0, (article.support_against || 0) - 1)
      }
    }
    
    article.user_support = support === 'neutral' ? null : support
  }
}

const handleCommentAdded = (articleId: number) => {
  // Update comment count in local store
  const index = optionsStore.options.findIndex(opt => opt.id === articleId)
  if (index >= 0) {
    const article = optionsStore.options[index]
    article.comment_count = (article.comment_count || 0) + 1
  }
}

const handleAmendmentSupportChanged = (amendmentId: number, support: string) => {
  // TODO: Handle amendment support changes
  console.log('Amendment support changed:', amendmentId, support)
}

const handleAmendmentCommentAdded = (amendmentId: number) => {
  // TODO: Handle amendment comment added
  console.log('Amendment comment added:', amendmentId)
}

const handleOptionCreated = (newOption: any) => {
  optionsStore.options.push(newOption)
  closeAddOptionModal()
  
  // If it's a chapter, set it as active
  if (newOption.type === 'chapter') {
    setActiveChapter(newOption.id)
  }
}

const handleOptionUpdated = (updatedOption: any) => {
  const index = optionsStore.options.findIndex(opt => opt.id === updatedOption.id)
  if (index >= 0) {
    optionsStore.options[index] = updatedOption
  }
}

const handleOptionDeleted = (deletedOptionId: number) => {
  const index = optionsStore.options.findIndex(opt => opt.id === deletedOptionId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
  }
  closeOptionDetail()
}

// Initialize
onMounted(() => {
  optionsStore.load(inquiryStore.id)
  
  // Set first chapter as active if available
  if (rootChapters.value.length > 0) {
    setActiveChapter(rootChapters.value[0].id)
  }
})
</script>

<style scoped lang="scss">
.structure-tree-view {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  gap: 24px;
  height: calc(100vh - 200px);
  min-height: 600px;

  .document-header {
    grid-column: 1 / -1;
    background: var(--color-main-background);
    border: 2px solid var(--color-border);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;

    .document-title {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;

      h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        color: var(--color-main-text);
        flex: 1;
      }
    }

    .document-meta {
      display: flex;
      gap: 16px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--color-text-lighter);
      }
    }
  }

  .tree-navigation {
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 400px;
    overflow-y: auto;

    .nav-chapter {
      padding: 12px 16px;
      background: var(--color-background-dark);
      border: 2px solid var(--color-border);
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-light);
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--color-background-darker);
        transform: translateX(4px);
      }

      &.active {
        background: var(--color-primary-light);
        border-color: var(--color-primary-element);
        color: var(--color-primary-element);
      }
    }
  }

  .tree-content {
    grid-column: 2 / 3;
    overflow-y: auto;
    padding-right: 16px;

    .chapter-editor {
      background: var(--color-main-background);
      border: 2px solid var(--color-border);
      border-radius: 16px;
      padding: 24px;

      .chapter-header {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid var(--color-border);

        .chapter-title {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;

          h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: var(--color-main-text);
            flex: 1;
          }
        }
      }

      .section-block,
      .articles-no-section {
        margin-bottom: 32px;

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;

          h4 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: var(--color-text-light);
            flex: 1;
          }
        }
      }

      .articles-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .article-item {
          background: var(--color-background-dark);
          border: 2px solid var(--color-border);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;

          &:hover {
            border-color: var(--color-primary-element);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          &.active {
            border-color: var(--color-primary-element);
            background: var(--color-primary-light);
          }

          .article-header {
            display: flex;
            align-items: center;
            gap: 12px;

            h5 {
              margin: 0;
              font-size: 16px;
              font-weight: 600;
              color: var(--color-main-text);
              flex: 1;
            }

            .article-actions {
              display: flex;
              align-items: center;
              gap: 8px;

              .toggle-details {
                background: none;
                border: none;
                color: var(--color-text-lighter);
                cursor: pointer;
                padding: 4px;
              }
            }
          }

          .article-details {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--color-border);
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 24px;

            .article-content-editor {
              .editor-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;

                h6 {
                  margin: 0;
                  font-size: 14px;
                  font-weight: 600;
                  color: var(--color-text-light);
                }
              }
            }

            .article-side-panel {
              display: flex;
              flex-direction: column;
              gap: 20px;

              .support-panel,
              .comments-panel {
                background: var(--color-main-background);
                border: 1px solid var(--color-border);
                border-radius: 12px;
                padding: 16px;

                h6 {
                  margin: 0 0 12px 0;
                  font-size: 14px;
                  font-weight: 600;
                  color: var(--color-text-light);
                }

                .support-stats {
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 16px;

                  .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;

                    .stat-value {
                      font-size: 20px;
                      font-weight: 700;
                    }

                    .stat-label {
                      font-size: 12px;
                      color: var(--color-text-lighter);
                    }

                    &.positive {
                      color: var(--color-success);
                    }

                    &.negative {
                      color: var(--color-error);
                    }
                  }
                }

                .comments-container {
                  max-height: 300px;
                  overflow-y: auto;
                }
              }
            }

            .amendments-section {
              grid-column: 1 / -1;
              margin-top: 20px;

              h6 {
                margin: 0 0 12px 0;
                font-size: 14px;
                font-weight: 600;
                color: var(--color-text-light);
              }

              .amendments-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
              }
            }
          }
        }
      }
    }

    .no-chapter-selected {
      text-align: center;
      padding: 60px 20px;
      background: var(--color-background-dark);
      border: 2px dashed var(--color-border);
      border-radius: 16px;

      svg {
        color: var(--color-text-lighter);
        margin-bottom: 20px;
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
}

// Animation for article details
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 1024px) {
  .structure-tree-view {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;

    .tree-navigation {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      flex-direction: row;
      overflow-x: auto;
      max-height: none;
      padding-bottom: 8px;

      .nav-chapter {
        white-space: nowrap;
        flex-shrink: 0;
      }
    }

    .tree-content {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
      padding-right: 0;

      .chapter-editor {
        .article-details {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .structure-tree-view {
    .tree-content {
      .chapter-editor {
        padding: 16px;

        .chapter-header {
          .chapter-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }

        .article-item {
          .article-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;

            .article-actions {
              width: 100%;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
}
</style>
