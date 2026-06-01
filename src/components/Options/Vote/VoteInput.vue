<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-container" :class="`engine-${engineId}`">
    <!-- Binary Voting -->
    <VoteInputBinary
      v-if="engineId === 'binary'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      @vote="handleVote"
    />

    <!-- Ternary Voting -->
    <VoteInputTernary
      v-else-if="engineId === 'ternary'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />

    <!-- Star Rating -->
    <VoteInputStar
      v-else-if="engineId === 'star'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />

    <!-- Score Voting -->
    <VoteInputScore
      v-else-if="engineId === 'score'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />

    <!-- Reaction Voting -->
    <VoteInputReaction
      v-else-if="engineId === 'reaction'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />

    <!-- Approval Voting (multi-option) -->
    <VoteInputApproval
      v-else-if="engineId === 'approval'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :is-selected="isSelected"
      :disabled="disabled"
      @toggle="handleApprovalToggle"
    />

    <!-- Ranking Voting -->
    <VoteInputRanking
      v-else-if="engineId === 'ranking'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :rank="currentRank"
      :disabled="disabled"
      @change-rank="handleRankChange"
    />

    <!-- Majority Judgment -->
    <VoteInputMajorityJudgment
      v-else-if="engineId === 'majority_judgment'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :grade="currentGrade"
      :disabled="disabled"
      @change-grade="handleGradeChange"
    />

    <!-- Quadratic Voting -->
    <VoteInputQuadratic
      v-else-if="engineId === 'quadratic'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />

    <!-- Token Weighted Voting -->
    <VoteInputTokenWeighted
      v-else-if="engineId === 'token_weighted'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />

    <!-- Condorcet (complex - usually handled at inquiry level) -->
    <div v-else-if="engineId === 'condorcet'" class="condorcet-placeholder">
      <Info :size="16" />
      <span>{{ t('agora', 'Condorcet voting requires ranking all options') }}</span>
    </div>

    <!-- Phased Voting (special case) -->
    <div v-else-if="engineId === 'phased_voting'" class="phased-placeholder">
      <Info :size="16" />
      <span>{{ t('agora', 'Phased voting is managed by the system') }}</span>
    </div>

    <!-- Unsupported -->
    <div v-else class="unsupported-engine">
      <AlertCircle :size="16" />
      <span>{{ t('agora', 'Voting method not supported') }}</span>
    </div>

    <!-- Remove vote button for single-choice engines -->
    <NcButton
      v-if="userVote && !isMultiEngine && canRemoveVote"
      type="tertiary"
      size="small"
      class="remove-vote-btn"
      @click="handleRemoveVote"
    >
      <X :size="14" />
      {{ t('agora', 'Remove') }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Info, AlertCircle, X } from 'lucide-vue-next'
import type { Option, SupportData, SupportValue } from '../../Types/index'

// Import all input components
import VoteInputBinary from './VoteInputs/VoteInputBinary.vue'
import VoteInputTernary from './VoteInputs/VoteInputTernary.vue'
import VoteInputStar from './VoteInputs/VoteInputStar.vue'
import VoteInputScore from './VoteInputs/VoteInputScore.vue'
import VoteInputReaction from './VoteInputs/VoteInputReaction.vue'
import VoteInputApproval from './VoteInputs/VoteInputApproval.vue'
import VoteInputRanking from './VoteInputs/VoteInputRanking.vue'
import VoteInputMajorityJudgment from './VoteInputs/VoteInputMajorityJudgment.vue'
import VoteInputQuadratic from './VoteInputs/VoteInputQuadratic.vue'
import VoteInputTokenWeighted from './VoteInputs/VoteInputTokenWeighted.vue'

const props = defineProps<{
  engineId: string
  engineConfig: Record<string, unknown>
  option: Option
  disabled?: boolean
  userVote?: SupportData
  isMultiEngine?: boolean
  isSelected?: boolean
  currentRank?: number | null
  currentGrade?: string | null
  canRemoveVote?: boolean
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
  'approval-toggle': [optionId: number]
  'change-rank': [optionId: number, rank: number | null]
  'change-grade': [optionId: number, grade: string | null]
  'remove-vote': []
}>()

function handleVote(value: SupportValue) {
  emit('vote', value)
}

function handleApprovalToggle() {
  emit('approval-toggle', props.option.id)
}

function handleRankChange(rank: number | null) {
  emit('change-rank', props.option.id, rank)
}

function handleGradeChange(grade: string | null) {
  emit('change-grade', props.option.id, grade)
}

function handleRemoveVote() {
   if (props.disabled) return 
  emit('remove-vote')
}
</script>

<style scoped lang="scss">
.vote-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  flex-wrap: wrap;

  .remove-vote-btn {
    margin-left: auto;
  }

  .condorcet-placeholder,
  .phased-placeholder,
  .unsupported-engine {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: var(--color-background-dark);
    border-radius: 8px;
    font-size: 12px;
    color: var(--color-text-lighter);
  }
}
</style>
