<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="vote-input-container" :class="`engine-${engineId}`">
    <!-- Binary -->
    <VoteInputBinary
      v-if="engineId === 'binary'"
      :item="item"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :current-score="currentScore"
      :disabled="disabled"
      @update:score="(id, val) => $emit('update:score', id, val)"
    />

    <!-- Ternary -->
    <VoteInputTernary
      v-else-if="engineId === 'ternary'"
      :item="item"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :current-score="currentScore"
      :disabled="disabled"
      @update:score="(id, val) => $emit('update:score', id, val)"
    />

    <!-- Reaction -->
    <VoteInputReaction
      v-else-if="engineId === 'reaction'"
      :item="item"
      :engine-config="engineConfig"
      :user-vote="userVote"
      @update:reactions="(id, val) => $emit('update:reaction', id, val)"
    />

    <!-- Star -->
    <VoteInputStar
      v-else-if="engineId === 'star'"
      :item="item"
      :engine-config="engineConfig"
      :current-star="currentStar"
      @update:star="(id, val) => $emit('update:star', id, val)"
    />
    <!-- Score -->
    <VoteInputScore
      v-else-if="engineId === 'score'"
      :item="item"
      :engine-config="engineConfig"
      :current-score="currentScore"
      @update:score="(id, val) => $emit('update:score', id, val)"
    />
    <!-- Approval -->
    <VoteInputApproval
      v-else-if="engineId === 'approval'"
      :item="item"
      :engine-config="engineConfig"
      :is-selected="isSelected"
      :disabled="disabled"
      @toggle="handleApprovalToggle"
    />
    <!-- Ranking -->
    <VoteInputRanking
      v-else-if="engineId === 'ranking'"
      :item="item"
      :engine-config="engineConfig"
      :rank="currentRank"
      :disabled="disabled"
      :total-items="totalItems"
      @change-rank="(rank) => $emit('changeRank', rank)"
    />
    <!-- Majority Judgment -->
    <VoteInputMajorityJudgment
      v-else-if="engineId === 'majority_judgment'"
      :item="item"
      :engine-config="engineConfig"
      :grade="currentGrade"
      :disabled="disabled"
      @change-grade="(grade) => $emit('changeGrade', grade)"
    />
    <!-- Quadratic -->
    <VoteInputQuadratic
      v-else-if="engineId === 'quadratic'"
      :item="item"
      :engine-config="engineConfig"
      :current-votes="currentQuadraticVotes"
      :disabled="disabled"
      @update:quadratic="(id, val) => $emit('update:quadratic', id, val)"
    />
    <!-- Token Weighted -->
    <VoteInputTokenWeighted
      v-else-if="engineId === 'token_weighted'"
      :item="item"
      :engine-config="engineConfig"
      :current-weight="currentTokenWeight"
      @update:token_weight="(id, val) => $emit('update:token_weight', id, val)"
    />
    <!-- Condorcet -->
    <VoteInputCondorcet
      v-else-if="engineId === 'condorcet'"
      :item="item"
      :engine-config="engineConfig"
      :rank="currentRank"
      :disabled="disabled"
      :total-items="totalItems"
      @change-rank="(rank) => $emit('changeRank', rank)"
    />
    <!-- Borda -->
    <VoteInputBorda
      v-else-if="engineId === 'borda'"
      :item="item"
      :engine-config="engineConfig"
      :rank="currentRank"
      :disabled="disabled"
      :total-items="totalItems"
      @change-rank="(rank) => $emit('changeRank', rank)"
    />
    <!-- Phased Voting -->
    <VoteInputPhasedVoting
      v-else-if="engineId === 'phased_voting'"
      :item="item"
      :engine-config="engineConfig"
      :user-vote="userVote"
      :disabled="disabled"
      @vote="handleVote"
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
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { X } from 'lucide-vue-next'
import type { Option, Inquiry, SupportData, SupportValue } from '../../Types/index'

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
import VoteInputNone from './VoteInputs/VoteInputNone.vue'

const props = defineProps<{
  engineId: string
  engineConfig: Record<string, unknown>
  item: Option | Inquiry
  disabled?: boolean
  userVote?: SupportData
  isMultiEngine?: boolean
  isSelected?: boolean
  currentRank?: number | null
  currentGrade?: string | null
  currentScore?: number | null
  currentStar?: number | null
  currentQuadraticVotes?: number | null
  currentTokenWeight?: number | null
  canResetVote?: boolean
  totalItems?: number
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
  'approvalToggle': [itemId: number]
  'changeRank': [rank: number | null]
  'changeGrade': [grade: string | null]
  'resetVote': []
  'update:score': [itemId: number, score: number | null]
  'update:star': [itemId: number, star: number | null]
  'update:reaction': [itemId: number, reaction: string[] | null]
  'update:quadratic': [itemId: number, votes: number | null]
  'update:token_weight': [itemId: number, weight: number | null]
}>()

function handleVote(value: SupportValue) {
  emit('vote', value)
}
function handleApprovalToggle() {
  emit('approvalToggle', props.item.id)
}

function handleResetVote() {
  if (!props.disabled) emit('resetVote')
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
