<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="consensus-flow-layout">
    <!-- Consensus Progress Header -->
    <div v-if="uiConfig.show_consensus_meter" class="consensus-progress-header">
      <div class="progress-header-content">
        <div class="status-indicator">
          <div class="health-indicator" :class="consensusHealth.class">
            <component :is="consensusHealth.icon" :size="20" />
            <span class="health-label">{{ consensusHealth.label }}</span>
          </div>
          <span class="health-description">{{ consensusHealth.description }}</span>
        </div>

        <div v-if="uiConfig.visualize_progress" class="progress-steps">
          <div
            v-for="step in progressSteps"
            :key="step.id"
            class="step"
            :class="{
              completed: step.completed,
              active: step.active,
              blocked: step.blocked
            }"
          >
            <div class="step-icon">
              <component :is="step.icon" :size="16" />
            </div>
            <span class="step-label">{{ step.label }}</span>
            <span v-if="step.count !== undefined" class="step-count">
              {{ step.count }}
            </span>
          </div>
        </div>

        <div class="progress-actions">
          <NcButton
            v-for="action in availableActions"
            :key="action.key"
            :type="action.key === 'continue_discussion' ? 'primary' : 'secondary'"
            @click="handleAction(action.key)"
          >
            <template v-if="action.icon" #icon>
              <component :is="getActionIcon(action.icon)" :size="16" />
            </template>
            {{ action.label }}
          </NcButton>
        </div>
      </div>

      <!-- Quorum/Progress Bar -->
      <div v-if="showQuorumProgress" class="quorum-progress">
        <div class="progress-bar-container">
          <div
            class="progress-bar"
            :style="{ width: `${quorumPercentage}%` }"
            :class="quorumProgressClass"
          />
        </div>
        <div class="quorum-stats">
          <span>{{ t('agora', '{count} of {total} objections resolved', {
            count: resolvedObjections,
            total: totalObjections
          }) }}</span>
          <span v-if="quorumNeeded" class="quorum-badge">
            {{ t('agora', 'Quorum: {count}/{total}', {
              count: objectionsQuorum,
              total: quorumNeeded
            }) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Blocking Objections -->
    <div v-if="blockingObjections.length > 0" class="consensus-section">
      <h4 class="section-title blocking">
        <component :is="InquiryOptionIcons.AlertCircle" :size="16" />
        {{ t('agora', 'Blocking objections') }} ({{ blockingObjections.length }})
        <span v-if="blockedCount > 0" class="status-badge blocked">
          {{ t('agora', '{count} blocked', { count: blockedCount }) }}
        </span>
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in blockingObjections"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
	  :highlight="uiConfig.highlight_objections && getOptionStatus(item) === 'blocked'"
          :show-quorum="uiConfig.show_consensus_meter"
          :show-status="true"
          :show-resolution="true"
          :show-discussion="true"
          :can-discuss="hasFeature('objection_management')"
          :can-propose-resolution="hasFeature('objection_management')"
          :can-resolve="hasFeature('consensus_tracking')"
          :can-reopen="hasFeature('consensus_tracking')"
          :can-change-status="hasFeature('objection_management')"
	  :family-type="familyKey"
          @click="emit('openDetail', item)"
          @status-change="emit('optionStatusChange', item.id, status)"
          @propose-resolution="emit('proposeOptionResolution', item.id)"
          @resolve="emit('resolveOption', item.id)"
          @reopen="emit('reopenOption', item.id)"
        />
      </div>
    </div>

    <!-- Active Discussions -->
    <div v-if="activeDiscussions.length > 0" class="consensus-section">
      <h4 class="section-title discussion">
        <component :is="InquiryOptionIcons.MessageSquare" :size="16" />
        {{ t('agora', 'Active discussions') }} ({{ activeDiscussions.length }})
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in activeDiscussions"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
          :show-status="true"
          :show-discussion="true"
          :can-discuss="hasFeature('objection_management')"
          :can-propose-resolution="hasFeature('objection_management')"
	  :family-type="familyKey"
          @click="emit('openDetail', item)"
          @status-change="emit('optionStatusChange', item.id, status)"
        />
      </div>
    </div>

    <!-- Proposed Resolutions -->
    <div v-if="proposedResolutions.length > 0" class="consensus-section">
      <h4 class="section-title resolution">
        <component :is="InquiryOptionIcons.FileText" :size="16" />
        {{ t('agora', 'Proposed resolutions') }} ({{ proposedResolutions.length }})
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in proposedResolutions"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
          :show-resolution="true"
          :can-resolve="hasFeature('consensus_tracking')"
	  :family-type="familyKey"
          @click="$emit('openDetail', item)"
          @resolve="emit('resolveOption', item.id)"
        />
      </div>
    </div>

    <!-- Resolved Concerns -->
    <div v-if="resolvedConcerns.length > 0" class="consensus-section">
      <h4 class="section-title resolved">
        <component :is="InquiryOptionIcons.CheckCircle" :size="16" />
        {{ t('agora', 'Resolved concerns') }} ({{ resolvedConcerns.length }})
        <span v-if="recentlyResolved > 0" class="status-badge resolved">
          {{ t('agora', '{count} recently resolved', { count: recentlyResolved }) }}
        </span>
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in resolvedConcerns"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
          :show-resolution="true"
          :show-resolved-info="true"
          :can-reopen="hasFeature('consensus_tracking')"
	  :family-type="familyKey"
          @click="$emit('openDetail', item)"
          @reopen="emit('reopenOption', item.id)"
        />
      </div>
    </div>

    <!-- Non-blocking Exceptions -->
    <div v-if="exceptions.length > 0" class="consensus-section">
      <h4 class="section-title non-blocking">
        <component :is="InquiryOptionIcons.AlertOutline" :size="16" />
        {{ t('agora', 'Exceptions') }} ({{ exceptions.length }})
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in exceptions"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
          :show-status="true"
	  :family-type="familyKey"
          @click="emit('openDetail', item)"
        />
      </div>
    </div>

    <!-- Consultation Questions -->
    <div v-if="consultationQuestions.length > 0" class="consensus-section">
      <h4 class="section-title consultation">
        <component :is="InquiryOptionIcons.HelpCircle" :size="16" />
        {{ t('agora', 'Consultation questions') }} ({{ consultationQuestions.length }})
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in consultationQuestions"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
          :show-status="true"
	  :family-type="familyKey"
          @click="$emit('openDetail', item)"
        />
      </div>
    </div>

    <!-- Recommendations -->
    <div v-if="recommendations.length > 0" class="consensus-section">
      <h4 class="section-title recommendation">
        <component :is="InquiryOptionIcons.ThumbUp" :size="16" />
        {{ t('agora', 'Recommendations') }} ({{ recommendations.length }})
      </h4>
      <div class="options-list">
        <ConsensusOptionCard
          v-for="item in recommendations"
          :key="item.id"
          :option="item.raw"
          :inquiry-id="parentId"
          :show-status="true"
	  :family-type="familyKey"
          @click="$emit('openDetail', item)"
        />
      </div>
    </div>

    <!-- Consent Given -->
    <div v-if="consents.length > 0" class="consensus-section">
	    <h4 class="section-title consent">
        <component :is="InquiryOptionIcons.CheckCircle" :size="16" />
        {{ t('agora', 'Consent given') }} ({{ consents.length }})
      </h4>
      <div class="options-list">
        <ItemCard
	     v-for="item in consents"
   :key="item.id"
   :item="item"
   :parent-id="parentId"
   :target-type="targetType"
   :family-type="familyKey"
   @click="emit('openDetail', item)"

        />
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="allOptions.length === 0" class="empty-state">
      <component :is="InquiryOptionIcons.AlertCircle" :size="48" />
      <h4>{{ t('agora', 'No consensus items yet') }}</h4>
      <p>{{ t('agora', 'Add objections, exceptions, consultation questions, or recommendations') }}</p>
      
      <div class="quick-add-actions">
        <NcButton
          v-for="type in availableTypes"
          :key="type.option_type"
          type="secondary"
          @click="$emit('addOption', type.option_type)"
        >
          <template #icon>
            <component :is="getOptionTypeIcon(type.option_type)" :size="16" />
          </template>
          {{ type.label }}
        </NcButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import ItemCard from '../../FamilyLayouts/ItemCard.vue'
import ConsensusOptionCard from '../ConsensusOptionCard.vue'
import { 
  getOptionTypeIconComponent,
  getFamilyUIConfig,
  getFamilyFeatures,
  getFamilyActions,
} from '../../../helpers/modules/InquiryOptionHelper'
import type { Item, InquiryOptionType,  OptionFamily } from '../../Types/index.ts'
import { getItemsForFamily } from '../../../helpers/modules/itemHelpers'

interface FamilyAction {
  key: string
  label: string
  icon?: string
}

const props = defineProps<{
  items: Item[]
  parentId: number
  targetType: 'option' | 'inquiry'
  optionTypes: InquiryOptionType[]
  familyOptionTypes?: InquiryOptionType[]
  family?: OptionFamily | null
  familyKey?: string
  isReadonly?: boolean
  appSettings?: Record<string, unknown>
  quorumNeeded?: number
  consensusStatus?: string
  canReopen?: boolean
  canContinueDiscussion?: boolean
  canProposeResolution?: boolean
  recentActivityThreshold?: number
}>()

/** Emit shape uses Item */
const emit = defineEmits<{
  addOption: [optionType: string]
  openDetail: [item: Item]
  optionStatusChange: [optionId: number, status: string]
  proposeOptionResolution: [optionId: number]
  resolveOption: [optionId: number]
  reopenOption: [optionId: number]
  continueDiscussion: []
  proposeResolution: []
  reopenInquiry: []
  action: [actionKey: string]
}>()

const familyKey = computed(() => props.familyKey ?? props.family?.family_type ?? '')

const filtered = computed(() =>
  getItemsForFamily(props.items, familyKey.value)
)


console.log(" FILT ITEMS N CONSENSUS ",filtered.value)
console.log(" FAMILY ITEMS IN CONSENSUS ",familyKey.value)
console.log(" ITEMS IN CONSENSUS", props.items)
// ========================================
// HELPER: Get option status safely
// ========================================
const getOptionStatus = (item: Item) => item.statusKey

const blockingObjections = computed(() =>
  filtered.value.filter(i => i.type === 'objection' || i.type === 'blocking_objection')
)

const activeDiscussions = computed(() =>
  filtered.value.filter(i =>
    (i.type === 'objection' || i.type === 'blocking_objection') &&
    i.statusKey === 'under_discussion'
  )
)

const proposedResolutions = computed(() =>
  filtered.value.filter(i => i.type === 'resolution' && i.statusKey === 'proposed')
)

const resolvedConcerns = computed(() =>
  filtered.value.filter(i =>
    (i.type === 'objection' || i.type === 'blocking_objection') &&
    (i.statusKey === 'resolved' || i.statusKey === 'accepted')
  )
)

const exceptions = computed(() =>
  filtered.value.filter(i => i.type === 'exception' || i.type === 'non_blocking_objection')
)
const consents = computed(() =>
  filtered.value.filter(i => i.type === 'consent' || i.type === 'agreement')
)
const consultationQuestions = computed(() =>
  filtered.value.filter(i => i.type === 'consultation_question' || i.type === 'question')
)
const recommendations = computed(() =>
  filtered.value.filter(i => i.type === 'recommendation')
)

/** Recently resolved — reads raw for resolved_at timestamp */
const recentlyResolved = computed(() => {
  const threshold = props.recentActivityThreshold || 60
  const now = Date.now()
  return resolvedConcerns.value.filter(i => {
    const raw = i.raw as any
    const ts = raw.resolved_at ?? raw.miscFields?.resolved_at
    if (!ts) return false
    return (now - new Date(ts).getTime()) / 1000 / 60 < threshold
  }).length
})

/** Quorum — reads raw for countSupports */
const objectionsQuorum = computed(() =>
  blockingObjections.value.reduce((sum, i) => {
    const raw = i.raw as any
    return sum + (raw.status?.countSupports || 0)
  }, 0)
)

// ========================================
// Get family configuration
// ========================================
const uiConfig = computed(() => {
  const config = getFamilyUIConfig(familyKey.value, props.family)
  return {
    show_consensus_meter: config.show_consensus_meter !== false,
    highlight_objections: config.highlight_objections !== false,
    visualize_progress: config.visualize_progress !== false,
    ...config
  }
})

const features = computed(() => getFamilyFeatures(familyKey.value, props.family))
const actions = computed(() => getFamilyActions(familyKey.value, props.family))

// ========================================
// Helper functions
// ========================================
const hasFeature = (feature: string): boolean => features.value.includes(feature)

const getActionIcon = (iconName: string): unknown => InquiryOptionIcons[iconName] || InquiryOptionIcons.File

const handleAction = (actionKey: string): void => {
  emit('action', actionKey)
  
  if (actionKey === 'continue_discussion') {
    emit('continueDiscussion')
  } else if (actionKey === 'propose_resolution' || actionKey === 'proposeResolution') {
    emit('proposeResolution')
  } else if (actionKey === 'reopen_inquiry' || actionKey === 'reopenInquiry') {
    emit('reopenInquiry')
  }
}

// ========================================
// Available actions
// ========================================
const availableActions = computed(() => {
  const defaultActions: FamilyAction[] = []
  
  if (props.canContinueDiscussion || activeDiscussions.value.length > 0) {
    defaultActions.push({
      key: 'continue_discussion',
      label: t('agora', 'Continue discussion'),
      icon: 'MessageSquare'
    })
  }
  
  if (props.canProposeResolution || activeDiscussions.value.length > 0) {
    defaultActions.push({
      key: 'propose_resolution',
      label: t('agora', 'Propose resolution'),
      icon: 'FileText'
    })
  }
  
  if (props.canReopen || props.consensusStatus === 'resolved') {
    defaultActions.push({
      key: 'reopen_inquiry',
      label: t('agora', 'Reopen'),
      icon: 'Refresh'
    })
  }
  
  const familyActions = actions.value || []
  return [...defaultActions, ...familyActions]
})

// ========================================
// Filter options
// ========================================

const allOptions = computed(() => filtered.value)

// ========================================
// Stats
// ========================================
const totalObjections = computed(() => blockingObjections.value.length)
const resolvedObjections = computed(() => resolvedConcerns.value.length)
const blockedCount = computed(() => 
  blockingObjections.value.filter(opt => getOptionStatus(opt) === 'blocked').length
)

// ========================================
// Quorum
// ========================================

const quorumPercentage = computed(() => {
  if (!props.quorumNeeded || props.quorumNeeded === 0) return 0
  return Math.min((resolvedObjections.value / props.quorumNeeded) * 100, 100)
})

const showQuorumProgress = computed(() => 
  props.quorumNeeded && props.quorumNeeded > 0 && totalObjections.value > 0
)

const quorumProgressClass = computed(() => {
  if (quorumPercentage.value >= 100) return 'complete'
  if (quorumPercentage.value >= 75) return 'good'
  if (quorumPercentage.value >= 50) return 'medium'
  return 'low'
})

// ========================================
// Consensus health
// ========================================
const consensusHealth = computed(() => {
  const hasBlocked = blockedCount.value > 0
  const hasActiveDiscussions = activeDiscussions.value.length > 0
  const hasProposedResolutions = proposedResolutions.value.length > 0
  const allResolved = resolvedObjections.value === totalObjections.value && totalObjections.value > 0

  if (props.consensusStatus === 'resolved') {
    return {
      class: 'resolved',
      icon: InquiryOptionIcons.CheckCircle,
      label: t('agora', 'Resolved'),
      description: t('agora', 'Consensus was reached on this inquiry')
    }
  }

  if (hasBlocked) {
    return {
      class: 'blocked',
      icon: InquiryOptionIcons.AlertCircle,
      label: t('agora', 'Blocked'),
      description: t('agora', 'Consensus blocked by {count} unresolved objections', { count: blockedCount.value })
    }
  }

  if (hasActiveDiscussions) {
    return {
      class: 'progressing',
      icon: InquiryOptionIcons.MessageSquare,
      label: t('agora', 'Progressing'),
      description: t('agora', 'Consensus progressing with {count} active discussions', { count: activeDiscussions.value.length })
    }
  }

  if (hasProposedResolutions) {
    return {
      class: 'reviewing',
      icon: InquiryOptionIcons.FileText,
      label: t('agora', 'Reviewing'),
      description: t('agora', 'Proposed resolutions ready for review')
    }
  }

  if (allResolved) {
    return {
      class: 'ready',
      icon: InquiryOptionIcons.CheckCircle,
      label: t('agora', 'Ready'),
      description: t('agora', 'No blocking objections. Ready for consensus')
    }
  }

  return {
    class: 'proposed',
    icon: InquiryOptionIcons.HelpCircle,
    label: t('agora', 'Proposed'),
    description: t('agora', 'Consensus process initiated')
  }
})

// ========================================
// Progress steps
// ========================================
const progressSteps = computed(() => [
  {
    id: 'proposed',
    label: t('agora', 'Proposed'),
    icon: InquiryOptionIcons.HelpCircle,
    completed: true,
    active: false,
    count: 1
  },
  {
    id: 'consultation',
    label: t('agora', 'Consultation'),
    icon: InquiryOptionIcons.MessageSquare,
    completed: consultationQuestions.value.length > 0 || exceptions.value.length > 0,
    active: consultationQuestions.value.length > 0,
    count: consultationQuestions.value.length
  },
  {
    id: 'discussion',
    label: t('agora', 'Discussion'),
    icon: InquiryOptionIcons.MessageSquare,
    completed: activeDiscussions.value.length === 0 && resolvedObjections.value > 0,
    active: activeDiscussions.value.length > 0,
    blocked: blockedCount.value > 0,
    count: activeDiscussions.value.length
  },
  {
    id: 'resolution',
    label: t('agora', 'Resolution'),
    icon: InquiryOptionIcons.FileText,
    completed: resolvedObjections.value === totalObjections.value && totalObjections.value > 0,
    active: proposedResolutions.value.length > 0,
    count: proposedResolutions.value.length
  },
  {
    id: 'consensus',
    label: t('agora', 'Consensus'),
    icon: InquiryOptionIcons.CheckCircle,
    completed: props.consensusStatus === 'resolved' || 
               (resolvedObjections.value === totalObjections.value && totalObjections.value > 0),
    active: props.consensusStatus === 'ready'
  }
])

// ========================================
// Available types for quick add
// ========================================
const availableTypes = computed(() => {
  const rootTypes = ['objection', 'exception', 'consultation_question', 'recommendation']
  return (props.familyOptionTypes ?? []).filter(type =>
    rootTypes.includes(type.option_type)
  )
})

const getOptionTypeIcon = (type: string) =>
  getOptionTypeIconComponent(type, props.familyOptionTypes ?? [])
</script>

<style scoped lang="scss">
.consensus-flow-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .consensus-progress-header {
    background: var(--color-background-dark);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--color-border);

    .progress-header-content {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .status-indicator {
        display: flex;
        align-items: center;
        gap: 12px;

        .health-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;

          &.proposed {
            background: var(--color-background-darker);
            color: var(--color-text-lighter);
          }

          &.blocked {
            background: var(--color-error-light);
            color: var(--color-error);
          }

          &.progressing {
            background: var(--color-warning-light);
            color: var(--color-warning);
          }

          &.reviewing {
            background: var(--color-primary-light);
            color: var(--color-primary);
          }

          &.ready {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.resolved {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          .health-label {
            font-size: 14px;
          }
        }

        .health-description {
          font-size: 14px;
          color: var(--color-text-lighter);
        }
      }

      .progress-steps {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;

        .step {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--color-background-darker);
          border-radius: 20px;
          font-size: 12px;

          &.completed {
            background: var(--color-success-light);
            color: var(--color-success);
          }

          &.active {
            background: var(--color-primary-light);
            color: var(--color-primary);
          }

          &.blocked {
            background: var(--color-error-light);
            color: var(--color-error);
          }

          .step-count {
            background: var(--color-background-dark);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
          }
        }
      }

      .progress-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 8px;
      }
    }

    .quorum-progress {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);

      .progress-bar-container {
        width: 100%;
        height: 8px;
        background: var(--color-background-darker);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;

        .progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;

          &.complete {
            background: var(--color-success);
          }

          &.good {
            background: var(--color-primary);
          }

          &.medium {
            background: var(--color-warning);
          }

          &.low {
            background: var(--color-error);
          }
        }
      }

      .quorum-stats {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: var(--color-text-lighter);

        .quorum-badge {
          background: var(--color-background-darker);
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 500;
        }
      }
    }
  }

  .consensus-section {
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      
      &.blocking {
        color: var(--color-error);
      }
      
      &.non-blocking {
        color: var(--color-warning);
      }
      
      &.consent {
        color: var(--color-success);
      }

      &.discussion {
        color: var(--color-primary);
      }

      &.resolution {
        color: var(--color-primary-element);
      }

      &.resolved {
        color: var(--color-success);
      }

      &.consultation {
        color: var(--color-primary);
      }

      &.recommendation {
        color: var(--color-primary);
      }

      .status-badge {
        margin-left: auto;
        font-size: 13px;
        font-weight: 500;
        padding: 4px 12px;
        border-radius: 20px;

        &.blocked {
          background: var(--color-error-light);
          color: var(--color-error);
        }

        &.resolved {
          background: var(--color-success-light);
          color: var(--color-success);
        }
      }

      .quorum-badge {
        margin-left: auto;
        font-size: 14px;
        font-weight: normal;
        background: var(--color-background-dark);
        color: var(--color-text-light);
        padding: 4px 12px;
        border-radius: 20px;
      }
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  .empty-state {
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
      margin: 0 0 24px 0;
      color: var(--color-text-lighter);
      font-style: italic;
    }

    .quick-add-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}
</style>
