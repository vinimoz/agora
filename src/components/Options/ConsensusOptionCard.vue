<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div 
    v-if="option" 
    :class="[
      'consensus-option-card',
      `type-${option.type}`,
      `status-${currentStatus}`,
      { 
        'highlighted': highlight,
        'has-resolution': hasResolution,
        'interactive': true,
        'compact': compact,
        'inline': inline,
        'is-blocking': isBlocking
      }
    ]"
    @click="handleCardClick"
  >
    <!-- ======================================== -->
    <!-- HEADER -->
    <!-- ======================================== -->
    <div class="card-header">
      <div class="header-left">
        <div class="type-icon" :style="{ color: optionTypeColor }">
          <component :is="optionIcon" :size="compact ? 16 : 20" />
        </div>
        
        <div class="title-section">
          <h5 class="option-title">{{ displayTitle }}</h5>
          <div class="meta-info">
            <span class="type-badge" :class="`type-${option.type}`">
              {{ optionTypeLabel }}
            </span>
            <span v-if="showStatus" class="status-badge" :class="`status-${currentStatus}`">
              <component :is="getStatusIcon(currentStatus)" :size="12" />
              {{ getStatusLabel(currentStatus) }}
            </span>
            <span v-if="option.status?.countSupports !== undefined" class="support-count">
              <component :is="InquiryOptionIcons.Users" :size="12" />
              {{ option.status.countSupports }}
            </span>
            <span class="timestamp">{{ formatDate(option.status?.created || option.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Resolution indicator -->
      <div v-if="showResolution && hasResolution" class="resolution-indicator" :class="resolutionStatusClass">
        <component :is="InquiryOptionIcons.CheckCircle" :size="16" class="resolution-icon" />
        <span class="resolution-label">{{ resolutionStatusLabel }}</span>
      </div>

      <!-- Actions -->
      <div v-if="canEditOrDelete && showAction" class="header-right" @click.stop>
        <NcActions
          :force-menu="true"
          :aria-label="t('agora', 'Option actions')"
          class="card-actions"
        >
          <NcActionButton
            v-if="canEdit"
            :close-after-click="true"
            @click="handleEdit"
          >
            <template #icon>
              <component :is="InquiryOptionIcons.Pencil" :size="20" />
            </template>
            {{ t('agora', 'Edit') }}
          </NcActionButton>

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

    <!-- ======================================== -->
    <!-- CONTENT -->
    <!-- ======================================== -->
    <div class="card-content">
      <p class="option-description">{{ displayText }}</p>
      
      <!-- Resolution details from child resolution option -->
      <div v-if="showResolution && resolutionChild" class="resolution-details">
        <div class="resolution-box" :class="`resolution-status-${resolutionChild.status || 'proposed'}`">
          <div class="resolution-header">
            <component :is="InquiryOptionIcons.FileText" :size="14" />
            <span class="resolution-title">{{ t('agora', 'Resolution') }}</span>
            <span class="resolution-status-badge" :class="`status-${resolutionChild.status || 'proposed'}`">
              {{ getStatusLabel(resolutionChild.status || 'proposed') }}
            </span>
          </div>
          <p class="resolution-text">{{ resolutionChild.text || resolutionChild.resolution_text }}</p>
          <div class="resolution-meta">
            <span class="resolved-date">
              <component :is="InquiryOptionIcons.Calendar" :size="12" />
              {{ t('agora', 'Proposed {date}', { date: formatDate(resolutionChild.createdAt || resolutionChild.status?.created) }) }}
            </span>
            <span v-if="resolutionChild.owner" class="resolved-by">
              <component :is="InquiryOptionIcons.Account" :size="12" />
              {{ t('agora', 'by {user}', { user: resolutionChild.owner.displayName }) }}
            </span>
            <span v-if="resolutionChild.status?.countSupports !== undefined" class="support-count">
              <component :is="InquiryOptionIcons.ThumbUp" :size="12" />
              {{ resolutionChild.status.countSupports }}
            </span>
          </div>
        </div>
      </div>

      <!-- Discussion summary -->
      <div v-if="showDiscussion && discussionCount > 0" class="discussion-summary">
        <div class="discussion-stats">
          <span class="stat">
            <component :is="InquiryOptionIcons.MessageSquare" :size="12" />
            {{ discussionCount }} {{ t('agora', 'responses') }}
          </span>
          <span v-if="proposedSolutionCount > 0" class="stat">
            <component :is="InquiryOptionIcons.FileText" :size="12" />
            {{ proposedSolutionCount }} {{ t('agora', 'proposed solutions') }}
          </span>
          <span v-if="participantCount > 0" class="stat">
            <component :is="InquiryOptionIcons.Users" :size="12" />
            {{ participantCount }} {{ t('agora', 'participants') }}
	  </span>
	</div>
      </div>

      <!-- Raised by info -->
      <div v-if="raisedByCount > 0" class="raised-by">
	      <component :is="InquiryOptionIcons.AccountMultiple" :size="12" />
	      <span>
		      {{ n(
		      'agora',
		      'Raised by %n participant',
		      'Raised by %n participants',
		      raisedByCount
		      ) }}
	      </span>
      </div>
      </div>

    <!-- ======================================== -->
    <!-- ACTIONS -->
    <!-- ======================================== -->
    <div class="card-actions" @click.stop>
      <!-- Discuss -->
      <NcButton
        v-if="canDiscuss && canDiscussAction"
        type="secondary"
        size="small"
        @click="$emit('discuss', option.id)"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.MessageSquare" :size="14" />
        </template>
        {{ t('agora', 'Discuss') }}
      </NcButton>

      <!-- Propose Resolution -->
      <NcButton
        v-if="canProposeResolution && !hasResolution"
        type="secondary"
        size="small"
        @click="openResolutionModal"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.FileText" :size="14" />
        </template>
        {{ t('agora', 'Propose Resolution') }}
      </NcButton>

      <!-- Accept Resolution -->
      <NcButton
        v-if="canResolve && hasResolution && resolutionChild?.status === 'proposed'"
        type="primary"
        size="small"
        @click="acceptResolution"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.CheckCircle" :size="14" />
        </template>
        {{ t('agora', 'Accept Resolution') }}
      </NcButton>

      <!-- Implement Resolution -->
      <NcButton
        v-if="canResolve && hasResolution && resolutionChild?.status === 'accepted'"
        type="success"
        size="small"
        @click="implementResolution"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Check" :size="14" />
        </template>
        {{ t('agora', 'Implement') }}
      </NcButton>

      <!-- Reopen -->
      <NcButton
        v-if="canReopen && (currentStatus === 'resolved' || currentStatus === 'accepted')"
        type="secondary"
        size="small"
        @click="$emit('reopen', option.id)"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Refresh" :size="14" />
        </template>
        {{ t('agora', 'Reopen') }}
      </NcButton>

      <!-- Status change dropdown -->
      <NcActions v-if="canChangeStatus" :force-menu="true">
        <template #icon>
          <component :is="InquiryOptionIcons.Cog" :size="16" />
        </template>
        <NcActionButton @click="changeStatus('open')">
          {{ t('agora', 'Mark Open') }}
        </NcActionButton>
        <NcActionButton @click="changeStatus('under_discussion')">
          {{ t('agora', 'Mark Under Discussion') }}
        </NcActionButton>
        <NcActionButton @click="changeStatus('addressed')">
          {{ t('agora', 'Mark Addressed') }}
        </NcActionButton>
        <NcActionButton @click="changeStatus('withdrawn')">
          {{ t('agora', 'Mark Withdrawn') }}
        </NcActionButton>
        <NcActionButton @click="changeStatus('blocked')">
          {{ t('agora', 'Mark Blocked') }}
        </NcActionButton>
        <NcActionButton @click="changeStatus('deferred')">
          {{ t('agora', 'Mark Deferred') }}
        </NcActionButton>
        <NcActionButton @click="changeStatus('resolved')">
          {{ t('agora', 'Mark Resolved') }}
        </NcActionButton>
      </NcActions>
    </div>

    <!-- ======================================== -->
    <!-- QUORUM DISPLAY -->
    <!-- ======================================== -->
    <div v-if="showQuorum && option.status?.countSupports !== undefined" class="quorum-display">
      <div class="quorum-bar">
        <div 
          class="quorum-fill" 
          :style="{ width: `${quorumPercentage}%` }"
          :class="quorumClass"
        />
      </div>
      <div class="quorum-info">
        <span class="quorum-text">
          {{ option.status.countSupports }} {{ t('agora', 'supports') }}
        </span>
        <span v-if="quorumNeeded" class="quorum-required">
          {{ t('agora', 'need {count} more', { count: Math.max(0, quorumNeeded - (option.status.countSupports || 0)) }) }}
        </span>
      </div>
    </div>

    <!-- ======================================== -->
    <!-- MODALS -->
    <!-- ======================================== -->
    <ResolutionModal
      v-if="showResolutionModal"
      :visible="showResolutionModal"
      :option="option"
      :inquiry-id="inquiryId"
      @close="showResolutionModal = false"
      @submit="handleResolutionSubmit"
    />

    <DeleteConfirmationDialog
      v-model:visible="showDeleteDialog"
      :option-title="option?.title || option?.label || ''"
      :option="option"
      :is-imported="isImportedFromView"
      :view-type="familyType || 'view'"
      :has-children="hasChildren"
      :children-count="childrenCount"
      @confirm="handleConfirmDelete"
      @remove-from-view="handleRemoveFromView"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import {
  getOptionTypeLabel,
  getOptionTypeIconComponent,
  getOptionTypeColor,
} from '../../helpers/modules/InquiryOptionHelper'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { 
  createOptionContext,
  canEditOption,
  canDeleteOption,
} from '../../utils/permissions.ts'
import DeleteConfirmationDialog from '../Modals/DeleteConfirmationDialog.vue'
import ResolutionModal from '../Modals/ResolutionModal.vue'
import type { Option } from '../../Types/index.ts'

// ========================================
// PROPS
// ========================================
const props = defineProps<{
  option: Option
  inquiryId: number
  highlight?: boolean
  showQuorum?: boolean
  showStatus?: boolean
  showResolution?: boolean
  showDiscussion?: boolean
  showAction?: boolean
  compact?: boolean
  inline?: boolean
  quorumNeeded?: number
  canDiscuss?: boolean
  canProposeResolution?: boolean
  canResolve?: boolean
  canReopen?: boolean
  canChangeStatus?: boolean
  familyType?: string
}>()

// ========================================
// EMITS
// ========================================
const emit = defineEmits<{
  click: [option: Option]
  discuss: [optionId: number]
  proposeResolution: [optionId: number]
  resolve: [optionId: number]
  reopen: [optionId: number]
  statusChange: [optionId: number, status: string]
  edit: [option: Option]
  delete: [optionId: number]
  removeFromView: [optionId: number, updatedForceLayouts: string[]]
}>()

// ========================================
// STORES
// ========================================
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// ========================================
// STATE
// ========================================
const showDeleteDialog = ref(false)
const showResolutionModal = ref(false)

// ========================================
// COMPUTED: Status
// ========================================
const currentStatus = computed(() => {
  // Get status from option's miscFields or from the option type definition
  const miscStatus = props.option.miscFields?.status
  if (typeof miscStatus === 'string') return miscStatus
  
  // Fallback to option's own status
  const status = props.option.status?.status || props.option.status?.optionStatus
  if (status) return status
  
  // Default based on type
  if (props.option.type === 'objection' || props.option.type === 'blocking_objection') {
    return 'open'
  }
  if (props.option.type === 'consultation_question') {
    return 'open'
  }
  if (props.option.type === 'exception') {
    return 'open'
  }
  return 'draft'
})

const isBlocking = computed(() => props.option.type === 'objection' || props.option.type === 'blocking_objection')

// ========================================
// COMPUTED: Resolution Child
// ========================================

const getOptionStatus = (option: Option): string => {
  if (!option) return 'open'

  // Check miscFields first (where status is often stored)
  if (option.miscFields?.status && typeof option.miscFields.status === 'string') {
    return option.miscFields.status
  }

  // Check status object
  if (option.status) {
    if (typeof option.status === 'string') return option.status
    if (option.status.status) return option.status.status
    if (option.status.optionStatus) return option.status.optionStatus
  }

  // Default based on type
  if (option.type === 'objection' || option.type === 'blocking_objection') return 'open'
  if (option.type === 'consultation_question') return 'open'
  if (option.type === 'exception') return 'open'
  if (option.type === 'resolution') return 'proposed'
  if (option.type === 'recommendation') return 'draft'

  return 'draft'
}


const resolutionChildStatus = computed(() => {
  if (!resolutionChild.value) return null
  return getOptionStatus(resolutionChild.value)
})

const hasResolution = computed(() => !!resolutionChild.value)

const resolutionStatusLabel = computed(() => {
  if (!resolutionChild.value) return t('agora', 'No resolution')
  return getStatusLabel(resolutionChildStatus.value || 'proposed')
})


	const resolutionChild = computed(() => 
  // Use the options store to find children
   optionsStore.options.find(
    opt => opt.parentId === props.option.id && opt.type === 'resolution'
  )
)


const resolutionStatusClass = computed(() => {
  if (!resolutionChild.value) return ''
  const status = resolutionChild.value.status?.status || resolutionChild.value.status?.optionStatus || 'proposed'
  return `resolution-${status}`
})

// ========================================
// COMPUTED: Discussion Stats
// ========================================
	const discussionCount = computed(() => optionsStore.options.filter(
    opt => opt.parentId === props.option.id && opt.type === 'message'
  ).length)

const proposedSolutionCount = computed(() => optionsStore.options.filter(
    opt => opt.parentId === props.option.id && 
    (opt.type === 'amendment' || opt.type === 'proposal')
  ).length)

const participantCount = computed(() => {
  // Count unique participants from children
  const childParticipants = new Set()
  optionsStore.options
    .filter(opt => opt.parentId === props.option.id)
    .forEach(opt => {
      if (opt.owner?.id) childParticipants.add(opt.owner.id)
    })
  return childParticipants.size
})

const raisedByCount = computed(() => {
  // Count unique participants who have supported or commented
  const participants = new Set()
  optionsStore.options
    .filter(opt => opt.parentId === props.option.id)
    .forEach(opt => {
      if (opt.owner?.id) participants.add(opt.owner.id)
    })
  return participants.size
})

// ========================================
// COMPUTED: Display Helpers
// ========================================
const displayTitle = computed(() => {
  if (props.option.title) return props.option.title
  if (props.option.label) return props.option.label
  if (props.option.text && typeof props.option.text === 'string') {
    try {
      const parsed = JSON.parse(props.option.text)
      return parsed.title || parsed.label || parsed.content || props.option.text.substring(0, 50)
    } catch {
      return props.option.text.substring(0, 50)
    }
  }
  return t('agora', 'Untitled')
})

const displayText = computed(() => {
  if (props.option.content) return props.option.content
  if (props.option.text && typeof props.option.text === 'string') {
    try {
      const parsed = JSON.parse(props.option.text)
      return parsed.content || parsed.text || parsed.description || props.option.text
    } catch {
      return props.option.text
    }
  }
  return ''
})

// ========================================
// COMPUTED: Type Info
// ========================================
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

const optionTypeLabel = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return t('agora', 'Option')
  }
  return getOptionTypeLabel(props.option.type, allOptionTypes.value, t('agora', 'Option'))
})

const optionIcon = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return InquiryOptionIcons.File
  }
  return getOptionTypeIconComponent(props.option.type, allOptionTypes.value)
})

const optionTypeColor = computed(() => {
  if (!props.option?.type || !allOptionTypes.value) {
    return 'var(--color-text-light)'
  }
  return getOptionTypeColor(props.option.type, allOptionTypes.value)
})

// ========================================
// COMPUTED: Quorum
// ========================================
const quorumPercentage = computed(() => {
  const maxSupport = props.quorumNeeded || 100
  const count = props.option.status?.countSupports || 0
  return Math.min((count / maxSupport) * 100, 100)
})

const quorumClass = computed(() => {
  const pct = quorumPercentage.value
  if (pct >= 100) return 'complete'
  if (pct >= 75) return 'high'
  if (pct >= 50) return 'medium'
  return 'low'
})

// ========================================
// COMPUTED: Permissions
// ========================================
const optionContext = computed(() => {
  if (!props.option) return null
  return createOptionContext(props.option)
})

const canEdit = computed(() => {
  if (!props.option || optionContext.value === null) return false
  return canEditOption(optionContext.value)
})

const canDelete = computed(() => {
  if (!props.option || optionContext.value === null) return false
  return canDeleteOption(optionContext.value)
})

const canEditOrDelete = computed(() => canEdit.value || canDelete.value)

const canDiscussAction = computed(() => currentStatus.value === 'open' || 
         currentStatus.value === 'under_discussion' || 
         currentStatus.value === 'blocked')

// ========================================
// COMPUTED: Other
// ========================================
const isImportedFromView = computed(() => props.option.family !== props.familyType)

const hasChildren = computed(() => optionsStore.options.some(opt => opt.parentId === props.option.id))

const childrenCount = computed(() => optionsStore.options.filter(opt => opt.parentId === props.option.id).length)

// ========================================
// METHODS: Status Helpers
// ========================================
const getStatusLabel = (status?: string) => {
  const labels: Record<string, string> = {
    open: t('agora', 'Open'),
    under_discussion: t('agora', 'Under Discussion'),
    addressed: t('agora', 'Addressed'),
    withdrawn: t('agora', 'Withdrawn'),
    accepted: t('agora', 'Accepted'),
    resolved: t('agora', 'Resolved'),
    blocked: t('agora', 'Blocked'),
    deferred: t('agora', 'Deferred'),
    proposed: t('agora', 'Proposed'),
    under_review: t('agora', 'Under Review'),
    rejected: t('agora', 'Rejected'),
    implemented: t('agora', 'Implemented'),
    draft: t('agora', 'Draft'),
    published: t('agora', 'Published'),
    closed: t('agora', 'Closed'),
    answered: t('agora', 'Answered'),
    active: t('agora', 'Active'),
  }
  return status ? labels[status] || status : t('agora', 'No status')
}

const getStatusIcon = (status?: string) => {
  const icons: Record<string, string> = {
    open: InquiryOptionIcons.HelpCircle,
    under_discussion: InquiryOptionIcons.MessageSquare,
    addressed: InquiryOptionIcons.FileText,
    withdrawn: InquiryOptionIcons.Close,
    accepted: InquiryOptionIcons.CheckCircle,
    resolved: InquiryOptionIcons.CheckCircle,
    blocked: InquiryOptionIcons.AlertCircle,
    deferred: InquiryOptionIcons.Clock,
    proposed: InquiryOptionIcons.FileText,
    under_review: InquiryOptionIcons.Clock,
    rejected: InquiryOptionIcons.Close,
    implemented: InquiryOptionIcons.CheckCircle,
    draft: InquiryOptionIcons.File,
    published: InquiryOptionIcons.Check,
    closed: InquiryOptionIcons.Lock,
    answered: InquiryOptionIcons.MessageSquare,
    active: InquiryOptionIcons.Play,
  }
  return status ? icons[status] || InquiryOptionIcons.HelpCircle : InquiryOptionIcons.HelpCircle
}

const formatDate = (date: string | Date | number | undefined) => {
  if (!date) return ''
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(d)
}

const changeStatus = (status: string) => {
  emit('statusChange', props.option.id, status)
}

// ========================================
// METHODS: Resolution
// ========================================
const openResolutionModal = () => {
  showResolutionModal.value = true
}

const handleResolutionSubmit = async (resolutionData: { text: string; status: string }) => {
  try {
    await optionsStore.add({
      title: 'Resolution',
      text: resolutionData.text,
      type: 'resolution',
      parentId: props.option.id,
      miscFields: {
        resolution_text: { key: 'resolution_text', value: resolutionData.text },
        status: { key: 'status', value: resolutionData.status }
      }
    })
    showResolutionModal.value = false
    showSuccess(t('agora', 'Resolution proposed successfully'))
  } catch (error) {
    console.error('Failed to add resolution:', error)
    showError(t('agora', 'Failed to propose resolution'))
  }
}

const acceptResolution = async () => {
  if (!resolutionChild.value) return
  try {
    await optionsStore.update({
      id: resolutionChild.value.id,
      miscFields: {
        ...resolutionChild.value.miscFields,
        status: { key: 'status', value: 'accepted' }
      }
    })
    // Also update parent status
    await optionsStore.update({
      id: props.option.id,
      miscFields: {
        ...props.option.miscFields,
        status: { key: 'status', value: 'addressed' }
      }
    })
    showSuccess(t('agora', 'Resolution accepted'))
  } catch (error) {
    console.error('Failed to accept resolution:', error)
    showError(t('agora', 'Failed to accept resolution'))
  }
}

const implementResolution = async () => {
  if (!resolutionChild.value) return
  try {
    await optionsStore.update({
      id: resolutionChild.value.id,
      miscFields: {
        ...resolutionChild.value.miscFields,
        status: { key: 'status', value: 'implemented' }
      }
    })
    await optionsStore.update({
      id: props.option.id,
      miscFields: {
        ...props.option.miscFields,
        status: { key: 'status', value: 'resolved' }
      }
    })
    showSuccess(t('agora', 'Resolution implemented successfully'))
  } catch (error) {
    console.error('Failed to implement resolution:', error)
    showError(t('agora', 'Failed to implement resolution'))
  }
}

// ========================================
// METHODS: Event Handlers
// ========================================
const handleCardClick = () => {
  emit('click', props.option)
}

const handleEdit = () => {
  emit('edit', props.option)
}

const confirmDelete = () => {
  showDeleteDialog.value = true
}

const handleConfirmDelete = async () => {
  showDeleteDialog.value = false
  try {
    await optionsStore.deleteOption(props.option.id)
    emit('delete', props.option.id)
    showSuccess(t('agora', 'Option deleted successfully'))
  } catch (err) {
    console.error('Error deleting option:', err)
    showError(t('agora', 'Failed to delete option'))
  }
}

const handleRemoveFromView = async () => {
  try {
    let currentLayouts = props.option.miscFields?.force_layouts || []
    if (typeof currentLayouts === 'string') {
      try {
        currentLayouts = JSON.parse(currentLayouts)
      } catch {
        currentLayouts = []
      }
    }
    if (!Array.isArray(currentLayouts)) {
      currentLayouts = []
    }
    const updatedLayouts = currentLayouts.filter((layout: string) => layout !== props.familyType)
    await optionsStore.update({
      ...props.option,
      miscFields: {
        ...props.option.miscFields,
        force_layouts: updatedLayouts
      }
    })
    emit('removeFromView', props.option.id, updatedLayouts)
    showSuccess(t('agora', 'Option removed from view'))
  } catch (err) {
    console.error('Error removing option from view:', err)
    showError(t('agora', 'Failed to remove option from view'))
  }
}
</script>

<style scoped lang="scss">
// ========================================
// CARD BASE
// ========================================
.consensus-option-card {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &.highlighted {
    border-color: var(--color-error);
    background: var(--color-error-light);
    animation: pulse-highlight 2s ease-in-out infinite;
  }

  // Status border
  &.status-open {
    border-left: 4px solid var(--color-text-lighter);
  }
  &.status-under_discussion {
    border-left: 4px solid var(--color-primary);
  }
  &.status-addressed {
    border-left: 4px solid var(--color-primary-element);
  }
  &.status-withdrawn {
    border-left: 4px solid var(--color-text-lighter);
    opacity: 0.7;
  }
  &.status-accepted {
    border-left: 4px solid var(--color-success);
  }
  &.status-resolved {
    border-left: 4px solid var(--color-success);
    opacity: 0.85;
  }
  &.status-blocked {
    border-left: 4px solid var(--color-error);
    background: var(--color-error-light);
  }
  &.status-deferred {
    border-left: 4px solid var(--color-warning);
  }

  &.has-resolution {
    border-color: var(--color-success);
  }

  &.is-blocking {
    .option-title {
      font-weight: 600;
    }
  }
}

// ========================================
// HEADER
// ========================================
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;

  .header-left {
    display: flex;
    gap: 12px;
    flex: 1;
    min-width: 0;

    .type-icon {
      flex-shrink: 0;
      margin-top: 2px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background-darker);
      border-radius: 8px;
      transition: all 0.2s ease;

      svg {
        width: 20px;
        height: 20px;
        transition: transform 0.2s ease;
      }
    }

    .title-section {
      flex: 1;
      min-width: 0;

      .option-title {
        margin: 0 0 6px 0;
        font-size: 15px;
        font-weight: 500;
        color: var(--color-main-text);
        line-height: 1.4;
        word-break: break-word;
      }

      .meta-info {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;

        .type-badge {
          font-size: 10px;
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;

          &.type-objection,
          &.type-blocking_objection {
            background: var(--color-error-light);
            color: var(--color-error);
          }

          &.type-exception,
          &.type-non_blocking_objection {
            background: var(--color-warning-light);
            color: var(--color-warning);
          }

          &.type-consent,
          &.type-agreement {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.type-consultation_question,
          &.type-question {
            background: var(--color-primary-light);
            color: var(--color-primary);
          }

          &.type-recommendation {
            background: var(--color-primary-light);
            color: var(--color-primary);
          }

          &.type-resolution {
            background: var(--color-success-light);
            color: var(--color-success);
          }
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 500;

          &.status-open {
            background: var(--color-background-darker);
            color: var(--color-text-lighter);
          }

          &.status-under_discussion {
            background: var(--color-primary-light);
            color: var(--color-primary);
          }

          &.status-addressed {
            background: var(--color-primary-element-light);
            color: var(--color-primary-element);
          }

          &.status-withdrawn {
            background: var(--color-background-darker);
            color: var(--color-text-lighter);
          }

          &.status-accepted {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.status-resolved {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.status-blocked {
            background: var(--color-error-light);
            color: var(--color-error);
          }

          &.status-deferred {
            background: var(--color-warning-light);
            color: var(--color-warning);
          }
        }

        .support-count {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-text-lighter);
        }

        .timestamp {
          font-size: 11px;
          color: var(--color-text-lighter);
        }
      }
    }
  }

  .resolution-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    flex-shrink: 0;

    &.resolution-proposed {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }

    &.resolution-under_review {
      background: var(--color-primary-light);
      color: var(--color-primary);
    }

    &.resolution-accepted {
      background: var(--color-success-light);
      color: var(--color-success);
    }

    &.resolution-rejected {
      background: var(--color-error-light);
      color: var(--color-error);
    }

    &.resolution-implemented {
      background: var(--color-success-light);
      color: var(--color-success);
    }

    .resolution-icon {
      width: 14px;
      height: 14px;
    }

    .resolution-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
  }

  .header-right {
    flex-shrink: 0;

    .card-actions {
      :deep(button) {
        background: transparent;
        border: none;
        padding: 4px;
        color: var(--color-text-lighter);
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.2s ease;

        &:hover {
          color: var(--color-primary-element);
          background: var(--color-background-hover);
        }
      }
    }
  }
}

// ========================================
// CONTENT
// ========================================
.card-content {
  margin-bottom: 12px;

  .option-description {
    margin: 0 0 12px 0;
    font-size: 13px;
    color: var(--color-text);
    line-height: 1.6;
    word-break: break-word;
  }

  .resolution-details {
    .resolution-box {
      background: var(--color-background-dark);
      border-radius: 10px;
      padding: 14px 16px;
      margin: 8px 0;
      border: 1px solid var(--color-border);

      &.resolution-status-proposed {
        border-left: 4px solid var(--color-warning);
      }

      &.resolution-status-under_review {
        border-left: 4px solid var(--color-primary);
      }

      &.resolution-status-accepted {
        border-left: 4px solid var(--color-success);
      }

      &.resolution-status-rejected {
        border-left: 4px solid var(--color-error);
      }

      &.resolution-status-implemented {
        border-left: 4px solid var(--color-success);
        background: var(--color-success-light);
      }

      .resolution-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        flex-wrap: wrap;

        .resolution-title {
          font-weight: 600;
          font-size: 13px;
          color: var(--color-text-lighter);
        }

        .resolution-status-badge {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 500;

          &.status-proposed {
            background: var(--color-warning-light);
            color: var(--color-warning);
          }

          &.status-under_review {
            background: var(--color-primary-light);
            color: var(--color-primary);
          }

          &.status-accepted {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.status-rejected {
            background: var(--color-error-light);
            color: var(--color-error);
          }

          &.status-implemented {
            background: var(--color-success-light);
            color: var(--color-success);
          }
        }
      }

      .resolution-text {
        margin: 0 0 10px 0;
        font-size: 13px;
        color: var(--color-main-text);
        line-height: 1.5;
        font-style: italic;
        padding-left: 4px;
        border-left: 2px solid var(--color-border);
        padding-left: 12px;
      }

      .resolution-meta {
        display: flex;
        gap: 16px;
        font-size: 12px;
        color: var(--color-text-lighter);
        flex-wrap: wrap;
        align-items: center;

        .resolved-date,
        .resolved-by,
        .support-count {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }

  .discussion-summary {
    .discussion-stats {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      padding: 8px 12px;
      background: var(--color-background-dark);
      border-radius: 8px;

      .stat {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--color-text-lighter);

        svg {
          opacity: 0.7;
        }
      }
    }
  }

  .raised-by {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    padding: 6px 12px;
    background: var(--color-background-dark);
    border-radius: 6px;
    font-size: 12px;
    color: var(--color-text-lighter);
  }
}

// ========================================
// ACTIONS
// ========================================
.card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);

  :deep(.nc-button) {
    font-size: 12px;
    padding: 4px 12px;
    min-height: 30px;

    .nc-button__icon {
      margin-right: 4px;
    }
  }
}

// ========================================
// QUORUM
// ========================================
.quorum-display {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);

  .quorum-bar {
    width: 100%;
    height: 6px;
    background: var(--color-background-darker);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 6px;

    .quorum-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);

      &.complete {
        background: linear-gradient(90deg, var(--color-success), var(--color-success-light));
      }

      &.high {
        background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
      }

      &.medium {
        background: linear-gradient(90deg, var(--color-warning), var(--color-warning-light));
      }

      &.low {
        background: linear-gradient(90deg, var(--color-error), var(--color-error-light));
      }
    }
  }

  .quorum-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;

    .quorum-text {
      color: var(--color-text-lighter);
      font-weight: 500;
    }

    .quorum-required {
      color: var(--color-text-lighter);
      font-size: 11px;
    }
  }
}

// ========================================
// COMPACT MODE
// ========================================
&.compact {
  padding: 12px;

  .card-header {
    .header-left {
      .type-icon {
        width: 24px;
        height: 24px;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      .title-section {
        .option-title {
          font-size: 13px;
        }

        .meta-info {
          .type-badge,
          .status-badge {
            font-size: 9px;
            padding: 1px 8px;
          }
        }
      }
    }
  }

  .card-content {
    .option-description {
      font-size: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .resolution-details {
      .resolution-box {
        padding: 10px 12px;

        .resolution-text {
          font-size: 12px;
        }
      }
    }
  }

  .card-actions {
    gap: 4px;

    :deep(.nc-button) {
      font-size: 11px;
      padding: 2px 8px;
      min-height: 26px;
    }
  }
}

// ========================================
// INLINE MODE
// ========================================
&.inline {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;

  .card-header {
    margin-bottom: 0;
    flex: 0 0 auto;

    .header-left {
      .type-icon {
        width: 24px;
        height: 24px;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      .title-section {
        .option-title {
          font-size: 13px;
          margin-bottom: 2px;
        }

        .meta-info {
          gap: 4px;

          .type-badge,
          .status-badge {
            font-size: 9px;
            padding: 1px 6px;
          }

          .timestamp {
            font-size: 10px;
          }
        }
      }
    }

    .resolution-indicator {
      padding: 2px 8px;
      font-size: 10px;

      .resolution-icon {
        width: 12px;
        height: 12px;
      }
    }
  }

  .card-content {
    flex: 1;
    min-width: 0;
    margin-bottom: 0;
    padding: 0 10px;

    .option-description {
      font-size: 12px;
      margin-bottom: 0;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .resolution-details,
    .discussion-summary,
    .raised-by {
      display: none;
    }
  }

  .card-actions {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    flex: 0 0 auto;
    gap: 4px;

    :deep(.nc-button) {
      font-size: 10px;
      padding: 2px 6px;
      min-height: 22px;
    }

    :deep(.nc-actions) {
      .nc-actions__button {
        padding: 2px;
        min-height: 22px;
      }
    }
  }

  .quorum-display {
    display: none;
  }
}

// ========================================
// ANIMATIONS
// ========================================
@keyframes pulse-highlight {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(var(--color-error-rgb), 0.2);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(var(--color-error-rgb), 0.1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ========================================
// RESPONSIVE
// ========================================
@media (max-width: 768px) {
  .consensus-option-card {
    padding: 12px;

    .card-header {
      flex-wrap: wrap;

      .resolution-indicator {
        margin-left: auto;
      }
    }

    .card-actions {
      :deep(.nc-button) {
        font-size: 11px;
        padding: 2px 8px;
        min-height: 26px;
      }
    }
  }
}
</style>
