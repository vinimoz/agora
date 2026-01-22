<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    :class="[
      'option-card',
      `family-${optionFamily}`,
      `type-${option.type}`,
      { 
        'compact': compact,
        'official': official,
        'highlight': highlight,
        'show-poll': showPoll,
        'has-support': hasSupportFeature,
        'has-comments': hasComments,
        'has-children': hasChildren
      }
    ]"
    @click="!preventClick && $emit('click', option)"
  >
    <!-- Header section -->
    <div class="card-header">
      <div class="header-left">
        <!-- Type icon -->
        <div class="type-icon" :style="{ color: getFamilyColor(optionFamily) }">
          <component :is="optionIcon" :size="compact ? 16 : 20" />
        </div>
        
        <!-- Title with status -->
        <div class="title-section">
          <h4 class="card-title">{{ option.label }}</h4>
          
          <!-- Status badge (if any) -->
          <span v-if="statusBadge" class="status-badge" :class="statusClass">
            <component :is="statusIcon" :size="12" />
            {{ statusText }}
          </span>
          
          <!-- Official badge -->
          <span v-if="official" class="official-badge">
            <component :is="InquiryOptionIcons.ShieldCheck" :size="12" />
            {{ t('agora', 'Official') }}
          </span>
        </div>
      </div>
      
      <!-- Metadata -->
      <div class="header-right">
        <!-- Timestamp -->
        <span v-if="option.created" class="timestamp">
          {{ formatDate(option.created) }}
        </span>
        
        <!-- Poll percentage (if showPoll) -->
        <span v-if="showPoll && option.poll_percentage !== undefined" class="poll-percentage">
          {{ Math.round(option.poll_percentage) }}%
        </span>
    <NcActions
      v-if="canEditOrDelete || hasChildren"
      :force-menu="true"
      :aria-label="t('agora', 'Option actions')"
      class="card-actions"
    >
      <!-- Edit action -->
      <NcActionButton
        v-if="canEdit"
        :close-after-click="true"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Edit" :size="20" />
        </template>
        {{ t('agora', 'Edit') }}
      </NcActionButton>

      <!-- Add response submenu -->
      <NcActionButton
        v-if="hasChildren"
        :is-menu="true"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Plus" :size="20" />
        </template>
        {{ t('agora', 'Add Response') }}
        
        <!-- Response type submenu -->
        <NcActionButton
          v-for="responseType in availableResponseTypes"
          :key="responseType.option_type"
          :close-after-click="true"
          @click.stop="openAddResponseModal(responseType.option_type)"
        >
          <template #icon>
            <component :is="getOptionTypeIcon(responseType.option_type)" :size="16" />
          </template>
          {{ responseType.label }}
        </NcActionButton>
      </NcActionButton>

      <!-- Delete action -->
      <NcActionButton
        v-if="canDelete"
        :close-after-click="true"
        @click.stop="confirmDelete"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Delete" :size="20" />
        </template>
        {{ t('agora', 'Delete') }}
      </NcActionButton>
    </NcActions>

      </div>
    </div>
    
    <!-- Content section -->
    <div v-if="!compact" class="card-content">
      <!-- Description -->
      <p v-if="option.text" class="card-text">
        {{ truncateText(option.text, 200) }}
      </p>
      
      <!-- Structure-specific: Parent reference -->
      <div v-if="option.parentId && optionFamily === 'structure'" class="parent-ref">
        <component :is="InquiryOptionIcons.ArrowUp" :size="12" />
        {{ getParentLabel(option.parentId) }}
      </div>
      
      <!-- Support summary -->
      <div v-if="hasSupportFeature" class="support-summary">
        <div class="support-item positive">
          <TernarySupportIcon
            v-if="supportFeature === 'ternary'"
            :support-value="userSupport"
            :size="14"
          />
          <ThumbIcon
            v-else-if="supportFeature === 'binary'"
            :supported="userSupport === 'for'"
            :size="14"
          />
          <span>{{ option.support_for || 0 }}</span>
        </div>
        
        <div v-if="supportFeature === 'ternary'" class="support-item negative">
          <TernarySupportIcon
            :support-value="userSupport === 'against' ? 'against' : null"
            :size="14"
            :invert="true"
          />
          <span>{{ option.support_against || 0 }}</span>
        </div>
      </div>
      
      <!-- Consensus-specific: Objection indicator -->
      <div v-if="option.type === 'objection' && option.blocking" class="blocking-indicator">
        <component :is="InquiryOptionIcons.AlertCircle" :size="14" />
        {{ t('agora', 'Blocking') }}
      </div>
      
      <!-- Children preview -->
      <div v-if="hasChildren && !compact" class="children-preview">
        <div class="children-preview-header">
          <h6>{{ t('agora', 'Responses') }}</h6>
          <NcButton 
            type="tertiary"
            size="small"
            @click.stop="openAddChildModal"
          >
            <template #icon>
              <component :is="InquiryOptionIcons.Plus" :size="12" />
            </template>
            {{ t('agora', 'Add response') }}
          </NcButton>
        </div>
        <div class="children-preview-list">
          <div 
            v-for="childType in allowedResponses" 
            :key="childType"
            class="child-type-preview"
            @click.stop="showChildren(childType)"
          >
            <component :is="getOptionTypeIcon(childType)" :size="14" />
            <span class="child-type-label">{{ getOptionTypeLabel(childType) }}</span>
            <span class="child-count">{{ childCounts[childType] || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer section -->
    <div class="card-footer">
      <!-- Quick action buttons (support/comment) -->
      <div class="quick-actions">
        <!-- Support buttons based on support feature type -->
        <template v-if="supportFeature === 'ternary'">
          <button 
            class="support-btn for"
            :class="{ 'active': userSupport === 'for' }"
            @click.stop="toggleSupport('for')"
            :title="t('agora', 'Support')"
          >
            <TernarySupportIcon
              :support-value="userSupport === 'for' ? 'for' : null"
              :size="14"
            />
            <span v-if="option.support_for">{{ option.support_for }}</span>
          </button>
          
          <button 
            class="support-btn against"
            :class="{ 'active': userSupport === 'against' }"
            @click.stop="toggleSupport('against')"
            :title="t('agora', 'Oppose')"
          >
            <TernarySupportIcon
              :support-value="userSupport === 'against' ? 'against' : null"
              :size="14"
              :invert="true"
            />
            <span v-if="option.support_against">{{ option.support_against }}</span>
          </button>
        </template>
        
        <template v-else-if="supportFeature === 'binary'">
          <button 
            class="support-btn binary"
            :class="{ 'active': userSupport === 'for' }"
            @click.stop="toggleSupport('for')"
            :title="t('agora', userSupport === 'for' ? 'Remove support' : 'Support')"
          >
            <ThumbIcon
              :supported="userSupport === 'for'"
              :size="14"
            />
            <span v-if="option.support_for">{{ option.support_for }}</span>
          </button>
        </template>
        
        <!-- Comment button -->
        <button 
          v-if="allowComment"
          class="comment-btn"
          @click.stop="toggleCommentsPanel"
          :class="{ 'active': showCommentsPanel }"
          :title="t('agora', 'Comments')"
        >
          <component :is="InquiryOptionIcons.Comment" :size="14" />
          <span>{{ option.comment_count || 0 }}</span>
        </button>
      </div>
      
      <!-- Author info -->
      <div v-if="option.owner" class="owner-info">
        <NcAvatar 
          v-if="option.owner.id" 
          :user="option.owner.id" 
          :display-name="option.owner.displayName" 
          :size="20" 
        />
        <span class="owner-name">{{ option.owner.displayName }}</span>
      </div>
    </div>
    
    <!-- Inline comments panel (Google Docs style) -->
    <Transition name="slide-fade">
      <div v-if="showCommentsPanel" class="side-panel comments-panel">
        <div class="panel-header">
          <h5>{{ t('agora', 'Comments') }}</h5>
          <button class="close-panel" @click.stop="showCommentsPanel = false">
            <component :is="InquiryOptionIcons.Close" :size="16" />
          </button>
        </div>
        <div class="panel-content">
          <Comments
            v-if="option.id"
            :inquiry-id="inquiryId"
            :option-id="option.id"
          />
          <CommentAdd
            v-if="allowComment"
            :inquiry-id="inquiryId"
            :option-id="option.id"
            @comment-added="handleCommentAdded"
          />
        </div>
      </div>
    </Transition>
    
    <!-- Child details modal -->
    <NcModal
      v-if="showChildrenModal"
      :name="childrenModalTitle"
      size="large"
      @close="closeChildrenModal"
    >
      <div class="children-modal">
        <div class="modal-header">
          <h2>{{ childrenModalTitle }}</h2>
          <p class="modal-subtitle">{{ t('agora', 'Responses to: {option}', { option: option.label }) }}</p>
        </div>
        
        <div class="modal-content">
          <!-- Child type tabs -->
          <div v-if="allowedResponses.length > 1" class="child-type-tabs">
            <button
              v-for="childType in allowedResponses"
              :key="childType"
              :class="['child-type-tab', { 'active': activeChildType === childType }]"
              @click="activeChildType = childType"
            >
              <component :is="getOptionTypeIcon(childType)" :size="16" />
              {{ getOptionTypeLabel(childType) }}
              <span class="tab-count">{{ childCounts[childType] || 0 }}</span>
            </button>
          </div>
          
          <!-- Children list for active type -->
          <div class="children-list-section">
            <div class="section-header">
              <h4>{{ getOptionTypeLabel(activeChildType || allowedResponses[0]) }}</h4>
              <NcButton 
                type="primary"
                @click="openAddChildModalFromModal"
              >
                <template #icon>
                  <component :is="InquiryOptionIcons.Plus" :size="16" />
                </template>
                {{ t('agora', 'Add {type}', { type: getOptionTypeLabel(activeChildType || allowedResponses[0]) }) }}
              </NcButton>
            </div>
            
            <div class="children-list">
              <div v-if="filteredChildren.length === 0" class="empty-children">
                <component :is="getOptionTypeIcon(activeChildType || allowedResponses[0])" :size="48" />
                <h5>{{ t('agora', 'No responses yet') }}</h5>
                <p>{{ t('agora', 'Be the first to add a response') }}</p>
                <NcButton 
                  type="primary"
                  @click="openAddChildModalFromModal"
                >
                  + {{ t('agora', 'Add {type}', { type: getOptionTypeLabel(activeChildType || allowedResponses[0]) }) }}
                </NcButton>
              </div>
              
              <div v-else class="children-items">
                <OptionCard
                  v-for="child in filteredChildren"
                  :key="child.id"
                  :option="child"
                  :inquiry-id="inquiryId"
                  @click="handleChildClick(child)"
                />
              </div>
            </div>
          </div>
          
          <!-- Add response options -->
          <div v-if="allowedResponses.length > 0" class="add-response-section">
            <h4>{{ t('agora', 'Add a response') }}</h4>
            <p class="section-text">{{ t('agora', 'Choose the type of response you want to add') }}</p>
            
            <div class="response-type-grid">
              <button
                v-for="responseType in allowedResponses"
                :key="responseType"
                class="response-type-card"
                @click="openAddChildModalWithType(responseType)"
              >
                <div class="response-type-icon">
                  <component :is="getOptionTypeIcon(responseType)" :size="24" />
                </div>
                <h5>{{ getOptionTypeLabel(responseType) }}</h5>
                <p class="response-text">
                  {{ getOptionTypeDescription(responseType) }}
                </p>
                <div class="response-count">
                  {{ childCounts[responseType] || 0 }} {{ t('agora', 'existing') }}
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <NcButton type="tertiary" @click="closeChildrenModal">
            {{ t('agora', 'Close') }}
          </NcButton>
        </div>
      </div>
    </NcModal>
    
    <!-- Add child modal -->
    <AddOptionModal
      v-if="showAddChildModal"
      :inquiry-id="inquiryId"
      :option-type="selectedChildType"
      :parent-id="option.id"
      @close="closeAddChildModal"
      @created="handleChildCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'

import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import { TernarySupportIcon, ThumbIcon } from '../AppIcons'
import { 
  getOptionTypeData,
  getFamilyColor,
  getFamilyIconComponent,
  getOptionTypeOptions
} from '../../helpers/modules/InquiryOptionHelper'

import { 
  createOptionContext,
  canEditOption,
  canDeleteOption,
  canChangeStatus,
  canCommentOption,
  canSupportOption
} from '../../utils/permissions.ts'

// Import comment components
import Comments from '../Comments/Comments.vue'
import CommentAdd from '../Comments/CommentAdd.vue'
import AddOptionModal from './AddOptionModal.vue'

// Types
import type { Option, OptionType } from '../../Types/index.ts'

// Props
const props = defineProps<{
  option: {
    type: Option,
    default: null 
  }
  inquiryId: number
  compact?: boolean
  official?: boolean
  highlight?: boolean
  showPoll?: boolean
  preventClick?: boolean
}>()

// Emits
const emit = defineEmits<{
  click: [option: Option]
  supportChanged: [optionId: number, support: string]
  commentAdded: [optionId: number]
  childAdded: [parentId: number, childType: string]
  childClicked: [child: Option]
}>()

// State
const showCommentsPanel = ref(false)
const showChildrenModal = ref(false)
const showAddChildModal = ref(false)
const activeChildType = ref<string | null>(null)
const userSupport = ref<'for' | 'against' | null>(null)
const selectedChildType = ref<string | null>(null)

// Stores
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// Create context once as computed

const optionContext = computed(() => {
  if (!props.option) {
    return null
  }
  console.log(" PROP OPTION PAS NULLLLLLLLLLLLLLLL ", props.option)
  return createOptionContext(props.option)
})

// Permission checks as computed properties
const canEdit = computed(() => {
  if (!props.option || optionContext.value === null) {
    return true
  }
  return canEditOption(optionContext.value)
})

const canDelete = computed(() => {
  if (!props.option || optionContext.value === null) {
    return true
  }
  return canDeleteOption(optionContext.value)
})

const canChangeOptionStatus = computed(() => {
  if (!props.option || optionContext.value === null) {
    return true
  }
  return canChangeStatus(optionContext.value)
})

const canComment = computed(() => {
  if (!props.option || optionContext.value === null) {
    return false
  }
  return canCommentOption(optionContext.value)
})

const canSupport = computed(() => {
  if (!props.option || optionContext.value === null) {
    return false
  }
  return canSupportOption(optionContext.value)
})

const isCreationMode = computed(() => !props.option)

              
// Computed properties
const availableResponseTypes = computed(() => {
  if (!allowedResponses.value.length) return []

  const allOptionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
                
  return allowedResponses.value
    .map(responseType => {
      const optionType = allOptionTypes.find(opt =>
        opt.option_type === responseType || opt.optionType === responseType
      )
      return optionType ? {
        option_type: optionType.option_type || optionType.optionType || responseType,
        label: optionType.label || responseType,
        icon: optionType.icon || 'File'
      } : null
    })
    .filter((type): type is { option_type: string; label: string; icon: string } => type !== null)
    .sort((a, b) => a.label.localeCompare(b.label))
})

// Computed
const optionFamily = computed(() => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === props.option.type || opt.optionType === props.option.type
  )
  return optionType?.family || 'default'
})

const optionIcon = computed(() => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === props.option.type || opt.optionType === props.option.type
  )
  
  if (optionType?.icon) {
    return InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File
  }
  return InquiryOptionIcons.File
})

const optionTypeConfig = computed(() => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  return optionTypes.find(opt => 
    opt.option_type === props.option.type || opt.optionType === props.option.type
  )
})

const supportFeature = computed(() => {
  return optionTypeConfig.value?.support_feature || 'none'
})

const allowComment = computed(() => {
  return optionTypeConfig.value?.allow_comment || false
})

const hasSupportFeature = computed(() => {
  return supportFeature.value !== 'none'
})

const hasComments = computed(() => {
  return allowComment.value && props.option.comment_count > 0
})

const allowedResponses = computed(() => {
  if (!optionTypeConfig.value?.allowed_response) return []
  
  // Parse if string, otherwise use array
  let responses: string[] = []
  if (typeof optionTypeConfig.value.allowed_response === 'string') {
    try {
      responses = JSON.parse(optionTypeConfig.value.allowed_response)
    } catch {
      responses = []
    }
  } else if (Array.isArray(optionTypeConfig.value.allowed_response)) {
    responses = optionTypeConfig.value.allowed_response
  }
  
  // Filter out any invalid response types
  const allOptionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  return responses.filter(responseType => 
    allOptionTypes.some(opt => 
      opt.option_type === responseType || opt.optionType === responseType
    )
  )
})

const confirmDelete = () => {
  if (confirm(t('agora', 'Are you sure you want to delete this option?'))) {
    deleteOption()
  }
}

const canEditOrDelete = computed(() => {
  return canEdit.value || canDelete.value
})

const hasChildren = computed(() => {
  return allowedResponses.value.length > 0
})

const childCounts = computed(() => {
  const counts: Record<string, number> = {}
  
  if (!props.option.id) return counts
  
  const children = optionsStore.options.filter(opt => opt.parentId === props.option.id)
  
  // Initialize counts for allowed responses
  allowedResponses.value.forEach((type: string) => {
    counts[type] = 0
  })
  
  // Count children by type
  children.forEach(child => {
    if (counts[child.type] !== undefined) {
      counts[child.type]++
    }
  })
  
  return counts
})

const totalChildrenCount = computed(() => {
  return Object.values(childCounts.value).reduce((sum, count) => sum + count, 0)
})

const filteredChildren = computed(() => {
  const typeToFilter = activeChildType.value || allowedResponses.value[0]
  if (!typeToFilter || !props.option.id) return []
  
  return optionsStore.options.filter(opt => 
    opt.parentId === props.option.id && opt.type === typeToFilter
  )
})

const childrenModalTitle = computed(() => {
  return t('agora', 'Responses to "{option}"', { option: props.option.label })
})

// Status handling
const statusBadge = computed(() => {
  if (!props.option.status) return null
  
  const statuses = optionTypeConfig.value?.statuses || []
  if (Array.isArray(statuses)) {
    const statusConfig = statuses.find((s: any) => s === props.option.status)
    return statusConfig
  }
  
  return props.option.status
})

const statusClass = computed(() => {
  if (!props.option.status) return ''
  
  const statusMap: Record<string, string> = {
    'draft': 'status-draft',
    'published': 'status-published',
    'accepted': 'status-accepted',
    'rejected': 'status-rejected',
    'proposed': 'status-proposed',
    'under_review': 'status-review',
    'active': 'status-active',
    'resolved': 'status-resolved'
  }
  
  return statusMap[props.option.status] || ''
})

const statusText = computed(() => {
  if (!props.option.status) return ''
  
  const statusTextMap: Record<string, string> = {
    'draft': t('agora', 'Draft'),
    'published': t('agora', 'Published'),
    'accepted': t('agora', 'Accepted'),
    'rejected': t('agora', 'Rejected'),
    'proposed': t('agora', 'Proposed'),
    'under_review': t('agora', 'Under Review'),
    'active': t('agora', 'Active'),
    'resolved': t('agora', 'Resolved')
  }
  
  return statusTextMap[props.option.status] || props.option.status
})

const statusIcon = computed(() => {
  if (!props.option.status) return InquiryOptionIcons.Circle
  
  const statusIconMap: Record<string, any> = {
    'draft': InquiryOptionIcons.Pencil,
    'published': InquiryOptionIcons.Check,
    'accepted': InquiryOptionIcons.CheckCircle,
    'rejected': InquiryOptionIcons.CloseCircle,
    'proposed': InquiryOptionIcons.Lightbulb,
    'under_review': InquiryOptionIcons.ClockOutline,
    'active': InquiryOptionIcons.Check,
    'resolved': InquiryOptionIcons.ThumbUp
  }
  
  return statusIconMap[props.option.status] || InquiryOptionIcons.Circle
})

// Helper methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const getParentLabel = (parentId: number) => {
  const parent = optionsStore.options.find(opt => opt.id === parentId)
  return parent?.label || t('agora', 'Parent')
}

const getOptionTypeIcon = (type: string) => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === type || opt.optionType === type
  )
  
  if (optionType?.icon) {
    return InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File
  }
  return InquiryOptionIcons.File
}

const getOptionTypeLabel = (type: string) => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === type || opt.optionType === type
  )
  
  return optionType?.label || type
}

const getOptionTypeDescription = (type: string) => {
  const optionTypes = sessionStore.appSettings?.inquiryOptionTypeTab || []
  const optionType = optionTypes.find(opt => 
    opt.option_type === type || opt.optionType === type
  )
  
  return optionType?.text || ''
}

// Methods
const toggleCommentsPanel = () => {
  showCommentsPanel.value = !showCommentsPanel.value
}

const showChildren = (childType?: string) => {
  if (childType) {
    activeChildType.value = childType
  } else if (allowedResponses.value.length > 0) {
    activeChildType.value = allowedResponses.value[0]
  }
  showChildrenModal.value = true
}

const closeChildrenModal = () => {
  showChildrenModal.value = false
  activeChildType.value = null
}

const openAddChildModal = () => {
  if (allowedResponses.value.length === 1) {
    // If only one response type is allowed, use it directly
    selectedChildType.value = allowedResponses.value[0]
    showAddChildModal.value = true
  } else {
    // Show the children modal which has the response type selection
    showChildrenModal.value = true
  }
}

const openAddChildModalFromModal = () => {
  selectedChildType.value = activeChildType.value || allowedResponses.value[0]
  showAddChildModal.value = true
}

const openAddChildModalWithType = (type: string) => {
  selectedChildType.value = type
  showAddChildModal.value = true
}

const closeAddChildModal = () => {
  showAddChildModal.value = false
  selectedChildType.value = null
}

const handleChildClick = (child: Option) => {
  emit('childClicked', child)
}

const handleChildCreated = (newChild: Option) => {
  optionsStore.options.push(newChild)
  closeAddChildModal()
  emit('childAdded', props.option.id, newChild.type)
}

const toggleSupport = (type: 'for' | 'against') => {
  // Toggle support: if already this type, remove support
  if (userSupport.value === type) {
    userSupport.value = null
    emit('supportChanged', props.option.id, 'neutral')
  } else {
    userSupport.value = type
    emit('supportChanged', props.option.id, type)
  }
}

const handleCommentAdded = () => {
  // Update comment count
  if (props.option.comment_count !== undefined) {
    props.option.comment_count++
  }
  emit('commentAdded', props.option.id)
}

// Load user support state
onMounted(() => {
  // Load initial user support from option data
  if (props.option.user_support !== undefined) {
    userSupport.value = props.option.user_support
  }
})

// Watch for option updates
watch(() => props.option, (newOption) => {
  if (newOption.user_support !== undefined) {
    userSupport.value = newOption.user_support
  }
}, { deep: true })

// Watch for children changes
watch(() => optionsStore.options, () => {
  // Child counts will automatically update through computed property
}, { deep: true })
</script>

<style scoped lang="scss">
.option-card {
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary-element);
  }

  &.compact {
    padding: 12px;
    
    .card-content,
    .card-footer .owner-info {
      display: none;
    }
  }

  // ... (other styles remain the same as before)

  .card-content {
    margin-bottom: 12px;

    .card-text {
      margin: 0 0 8px 0;
      color: var(--color-text-light);
      font-size: 14px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .parent-ref {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--color-text-lighter);
      background: var(--color-background-dark);
      padding: 2px 8px;
      border-radius: 8px;
      margin-top: 4px;
    }

    .support-summary {
      display: flex;
      gap: 12px;
      margin-top: 8px;

      .support-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        padding: 4px 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: var(--color-background-hover);
        }

        &.positive {
          color: var(--color-success);
        }

        &.negative {
          color: var(--color-error);
        }
      }
    }

    .blocking-indicator {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--color-error);
      background: var(--color-error-light);
      padding: 2px 8px;
      border-radius: 8px;
      margin-top: 8px;
    }

    .children-preview {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);

      .children-preview-header {
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

      .children-preview-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .child-type-preview {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: var(--color-background-dark);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          font-size: 12px;
          color: var(--color-text-lighter);
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background: var(--color-background-darker);
            color: var(--color-primary-element);
            border-color: var(--color-primary-element);
          }

          .child-type-label {
            white-space: nowrap;
          }

          .child-count {
            background: var(--color-background-darker);
            padding: 0 4px;
            border-radius: 4px;
            font-weight: 600;
            min-width: 20px;
            text-align: center;
          }
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);

    .quick-actions {
      display: flex;
      gap: 8px;
      align-items: center;

      .support-btn,
      .comment-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: var(--color-background-dark);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        font-size: 12px;
        color: var(--color-text-light);
        cursor: pointer;
        transition: all 0.2s ease;
        min-height: 28px;

        &:hover {
          background: var(--color-background-darker);
        }

        &.active {
          &.for {
            background: var(--color-success-light);
            color: var(--color-success);
            border-color: var(--color-success);
          }

          &.against {
            background: var(--color-error-light);
            color: var(--color-error);
            border-color: var(--color-error);
          }

          &.binary {
            background: var(--color-primary-light);
            color: var(--color-primary-element);
            border-color: var(--color-primary-element);
          }
        }
      }

      .comment-btn.active {
        background: var(--color-primary-light);
        color: var(--color-primary-element);
        border-color: var(--color-primary-element);
      }
    }

    .owner-info {
      display: flex;
      align-items: center;
      gap: 6px;

      .owner-name {
        font-size: 12px;
        color: var(--color-text-lighter);
      }
    }
  }

  // Side panel for comments
  .side-panel.comments-panel {
    position: absolute;
    right: -320px;
    top: 0;
    width: 300px;
    height: 400px;
    background: var(--color-main-background);
    border: 2px solid var(--color-border);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 100;
    display: flex;
    flex-direction: column;

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid var(--color-border);
      flex-shrink: 0;

      h5 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
      }

      .close-panel {
        background: none;
        border: none;
        color: var(--color-text-lighter);
        cursor: pointer;
        padding: 4px;
      }
    }

    .panel-content {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }
  }
}

// Children Modal
.children-modal {
  display: flex;
  flex-direction: column;
  max-height: 80vh;

  .modal-header {
    padding: 24px 24px 16px 24px;
    border-bottom: 1px solid var(--color-border);

    h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .modal-subtitle {
      margin: 0;
      color: var(--color-text-lighter);
      font-size: 14px;
      line-height: 1.4;
    }
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;

    .child-type-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--color-border);
      overflow-x: auto;

      .child-type-tab {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: var(--color-background-dark);
        border: 2px solid transparent;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text-light);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.3s ease;

        &:hover {
          background: var(--color-background-darker);
        }

        &.active {
          background: var(--color-primary-light);
          border-color: var(--color-primary-element);
          color: var(--color-primary-element);
        }

        .tab-count {
          background: var(--color-background-darker);
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
        }
      }
    }

    .children-list-section {
      margin-bottom: 32px;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--color-main-text);
        }
      }

      .children-list {
        .empty-children {
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
            font-size: 16px;
            color: var(--color-main-text);
          }

          p {
            margin: 0 0 16px 0;
            color: var(--color-text-lighter);
            font-style: italic;
          }
        }

        .children-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }
    }

    .add-response-section {
      padding-top: 24px;
      border-top: 2px solid var(--color-border);

      h4 {
        margin: 0 0 8px 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .section-text {
        margin: 0 0 20px 0;
        color: var(--color-text-lighter);
        font-size: 14px;
      }

      .response-type-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;

        .response-type-card {
          padding: 20px;
          background: var(--color-background-dark);
          border: 2px solid var(--color-border);
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border-color: var(--color-primary-element);
            background: var(--color-primary-light);
          }

          .response-type-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-background-darker);
            border-radius: 10px;
            margin-bottom: 8px;
          }

          h5 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--color-main-text);
          }

          .response-text {
            margin: 0;
            font-size: 12px;
            color: var(--color-text-lighter);
            line-height: 1.4;
            flex: 1;
          }

          .response-count {
            font-size: 11px;
            color: var(--color-text-lighter);
            background: var(--color-background-darker);
            padding: 2px 8px;
            border-radius: 10px;
            font-weight: 600;
          }
        }
      }
    }
  }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--color-border);
    background: var(--color-background-dark);
    display: flex;
    justify-content: flex-end;
  }
}

card-header {
  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .card-actions {
      :deep(button) {
        background: transparent;
        border: none;
        padding: 4px;
        color: var(--color-text-lighter);
        cursor: pointer;

        &:hover {
          color: var(--color-primary-element);
        }
      }
    }
  }
}

// Animation for side panel
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .option-card {
    .side-panel.comments-panel {
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      z-index: 1000;
    }
    
    .card-footer {
      flex-wrap: wrap;
      gap: 8px;
      
      .owner-info {
        order: -1;
        width: 100%;
        margin-bottom: 8px;
      }
    }
  }

  .children-modal {
    .modal-content {
      .response-type-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
