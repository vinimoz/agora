<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-input-container" :class="`engine-${engineId}`">
    <!-- Binary -->
    <VoteInputBinary
      v-if="engineId === 'binary'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :current-score="currentScore"
      :disabled="disabled"
      @update:score="(id, val) => $emit('update:score', id, val)"
    />

    <!-- Ternary -->
    <VoteInputTernary
      v-else-if="engineId === 'ternary'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :current-score="currentScore"
      :disabled="disabled"
      @update:score="(id, val) => $emit('update:score', id, val)"
    />

    <!-- Reaction -->
    <VoteInputReaction
      v-else-if="engineId === 'reaction'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      @update:reactions="(id, val) => $emit('update:reaction', id, val)"
    />

    <!-- Star -->
    <VoteInputStar
      v-else-if="engineId === 'star'"
      :option="option"
      :engine-config="engineConfig"
      :current-star="currentStar"
      @update:star="(id, val) => $emit('update:star', id, val)"
    />
    <!-- Score -->
    <VoteInputScore
      v-else-if="engineId === 'score'"
      :option="option"
      :engine-config="engineConfig"
      :current-score="currentScore"
      @update:score="(id, val) => $emit('update:score', id, val)"
    />
    <!-- Approval -->
    <VoteInputApproval
      v-else-if="engineId === 'approval'"
      :option="option"
      :engine-config="engineConfig"
      :is-selected="isSelected"
      :disabled="disabled"
      @toggle="handleApprovalToggle"
    />
    <!-- Ranking -->
    <VoteInputRanking
      v-else-if="engineId === 'ranking'"
      :option="option"
      :engine-config="engineConfig"
      :rank="currentRank"
      :disabled="disabled"
      :total-options="totalOptions"
      @change-rank="(rank) => $emit('change-rank', rank)"
    />
    <!-- Majority Judgment -->
    <VoteInputMajorityJudgment
      v-else-if="engineId === 'majority_judgment'"
      :option="option"
      :engine-config="engineConfig"
      :grade="currentGrade"
      :disabled="disabled"
      @change-grade="(grade) => $emit('change-grade', grade)"
    />
    <!-- Quadratic -->
    <VoteInputQuadratic
      v-else-if="engineId === 'quadratic'"
      :option="option"
      :engine-config="engineConfig"
      :current-votes="currentQuadraticVotes"
      :disabled="disabled"
      @update:quadratic="(id, val) => $emit('update:quadratic', id, val)"
    />
    <!-- Token Weighted -->
    <VoteInputTokenWeighted
      v-else-if="engineId === 'token_weighted'"
      :option="option"
      :engine-config="engineConfig"
      :current-weight="currentTokenWeight"
      @update:token_weight="(id, val) => $emit('update:token_weight', id, val)"
    />
    <!-- Condorcet -->
    <VoteInputCondorcet
      v-else-if="engineId === 'condorcet'"
      :option="option"
      :engine-config="engineConfig"
      :rank="currentRank"
      :disabled="disabled"
      :total-options="totalOptions"
      @change-rank="(rank) => $emit('change-rank', rank)"
    />
    <!-- Borda -->
    <VoteInputBorda
      v-else-if="engineId === 'borda'"
      :option="option"
      :engine-config="engineConfig"
      :rank="currentRank"
      :disabled="disabled"
      :total-options="totalOptions"
      @change-rank="(rank) => $emit('change-rank', rank)"
    />
    <!-- Phased Voting -->
    <VoteInputPhasedVoting
      v-else-if="engineId === 'phased_voting'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
    />
    <!-- Approval Deliberative -->
    <VoteInputApprovalDelib
      v-else-if="engineId === 'approval_delib'"
      :option="option"
      :engine-config="engineConfig"
      :is-selected="isSelected"
      :disabled="disabled"
      @toggle="handleApprovalToggle"
    />
    <!-- Trending -->
    <VoteInputTrending
      v-else-if="engineId === 'trending'"
      :option="option"
      :engine-config="engineConfig"
      :user-vote="userVote"
    />
    <!-- None -->
    <VoteInputNone v-else-if="engineId === 'none'" />

    <!-- Reset vote button for single-choice engines -->
    <NcButton
      v-if="userVote && !isMultiEngine && canResetVote"
      type="tertiary"
      size="small"
      class="reset-vote-btn"
      @click="handleResetVote"
    >
      <X :size="14" />
      {{ t('agora', 'Reset') }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type { Option, SupportData, SupportValue } from '../../Types/index'

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
import VoteInputCondorcet from './VoteInputs/VoteInputCondorcet.vue'
import VoteInputPhasedVoting from './VoteInputs/VoteInputPhasedVoting.vue'
import VoteInputBorda from './VoteInputs/VoteInputBorda.vue'
import VoteInputApprovalDelib from './VoteInputs/VoteInputApprovalDelib.vue'
import VoteInputTrending from './VoteInputs/VoteInputTrending.vue'
import VoteInputNone from './VoteInputs/VoteInputNone.vue'

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
  currentScore?: number | null
  currentStar?: number | null
  currentReaction?: string[] | null
  currentQuadraticVotes?: number | null
  currentTokenWeight?: number | null
  canResetVote?: boolean
  totalOptions?: number
  isMultiEngine?: boolean
  canResetVote?: boolean
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
  'approval-toggle': [optionId: number]
  'change-rank': [optionId: number, rank: number | null]
  'change-grade': [optionId: number, grade: string | null]
  'reset-vote': []
  'update:score': [optionId: number, score: number | null]
  'update:star': [optionId: number, star: number | null]
  'update:reaction': [optionId: number, reaction: string[] | null]
  'update:quadratic': [optionId: number, votes: number | null]
  'update:token_weight': [optionId: number, weight: number | null]
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
function handleResetVote() {
  if (!props.disabled) emit('reset-vote')
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

  .reset-vote-btn {
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
