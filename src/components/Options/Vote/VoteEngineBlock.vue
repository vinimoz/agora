<!--
    SPDX-FileCopyrightText: 2026 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <!-- Cards Layout -->
    <div v-if="layout === 'cards'" class="cards-layout">
        <VoteCardsLayout
                :options="votableOptions"
                :effective-engine-id="effectiveEngineId"
                :active-engine="currentEngine"
                :can-vote="canVote"
                :has-user-voted="hasUserVoted"
                :rankings="rankings"
                :scores="scores"
                :grades="grades"
                :reactions="reactions"
                :quadratic-votes="quadraticVotes"
                :token-weights="tokenWeights"
                :can-submit-multi-vote="canSubmitMultiVote"
                :vote-selection-info="voteSelectionInfo"
                :get-option-vote-count="getOptionVoteCount"
                :get-percentage="(option) => getPercentage(option)"
                :has-user-voted-for="hasUserVotedFor"
                :is-selected-for-vote="isSelectedForVote"
                :get-user-vote-value-for-option="getUserVoteValueForOption"
                :has-selections-changed="hasSelectionsChanged"
                @toggle-selection="toggleSelection"
                @update:rankings="updateRankings"
                @update:scores="updateScores"
                @update:grades="updateGrades"
                @update:reactions="updateReactions"
                @update:quadratic-votes="updateQuadraticVotes"
                @update:token-weights="updateTokenWeights"
                @vote="(option, value) => submitSingleVote(inquiryId,option, value)"
                @submit-multi-vote="onSubmitMultiVote"
                @remove-my-vote="removeMyVote"
                @select-option="$emit('selectOption', $event)"
                @open-supports-modal="$emit('openSupportsModal', $event)"
                />
    </div>
    <!-- Results Layout -->
    <div v-else class="results-layout">
        <VoteResultsLayout
                :options="votableOptions"
                :total-votes="totalVotes"
                :ranked-options="rankedOptions"
                :current-engine="currentEngine"
                :effective-engine-id="effectiveEngineId"
                :active-engine="currentEngine"
                :can-vote="canVote"
                :has-user-voted="hasUserVoted"
                :rankings="rankings"
                :scores="scores"
                :grades="grades"
                :reactions="reactions"
                :quadratic-votes="quadraticVotes"
                :token-weights="tokenWeights"
                :selected-options="selectedOptions"
                :can-submit-multi-vote="canSubmitMultiVote"
                :vote-selection-info="voteSelectionInfo"
                :get-option-rank="getOptionRank"
                :get-option-vote-count="getOptionVoteCount"
                :get-percentage="(option) => getPercentage(option)"
                :has-user-voted-for="hasUserVotedFor"
                :is-selected-for-vote="isSelectedForVote"
                :winner="winner"
                :winner-percentage="winnerPercentage"
                :time-remaining="timeRemaining"
                @toggle-selection="toggleSelection"
                @update:rankings="rankings = $event"
                @update:scores="scores = $event"
                @update:grades="grades = $event"
                @update:reactions="reactions = $event"
                @update:quadratic-votes="quadraticVotes = $event"
                @update:token-weights="tokenWeights = $event"
                @vote="(option, value) => submitSingleVote(inquiryId,option, value)"
                @submit-multi-vote="submitMultiVote"
                @select-option="$emit('selectOption', $event)"
                />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess } from '@nextcloud/dialogs'
import type { Option } from '../../../Types/index'
import { useVoteContext } from '../../../composables/useVoteContext'
import VoteCardsLayout from './VoteCardsLayout.vue'
import VoteResultsLayout from './VoteResultsLayout.vue'

const props = defineProps<{
  inquiryId: number
  engineId: number
  layout: 'cards' | 'results'
  timeRemaining: string
}>()

defineEmits<{
  'openSupportsModal': [optionId: number]
  'selectOption': [option: Option]
}>()

const {
  currentEngine,
  votableOptions,
  hasSelectionsChanged,
  rankings,
  scores,
  selectedOptions,
  hasUserVoted,
  canVote,
  canSubmitMultiVote,
  voteSelectionInfo,
  hasUserVotedFor,
  isSelectedForVote,
  toggleSelection,
  submitSingleVote,
  submitMultiVote,
  totalVotes,
  getOptionVoteCount,
  getOptionRank,
  getPercentage,
  getRankedOptions,
  getWinner,
  getWinnerPercentage,
  getUserVoteValueForOption,
  effectiveEngineId,
  removeMyVote,
  grades,
  reactions,
  quadraticVotes,
  tokenWeights,
} = useVoteContext(props.inquiryId, props.engineId)

const winner = computed(() => getWinner(votableOptions.value))
const winnerPercentage = computed(() => getWinnerPercentage(votableOptions.value))

const rankedOptions = computed(() => getRankedOptions(votableOptions.value))

const onSubmitMultiVote = async () => {
  const success = await submitMultiVote()
  if (success) {
    showSuccess(t('agora', 'Your vote has been recorded.'))
  }
}

function updateRankings(newRankings) {
  rankings.value = newRankings
}
function updateScores(newScores) {
  scores.value = newScores
}
function updateGrades(newGrades) {
  grades.value = newGrades
}
function updateReactions(newReactions) {
  reactions.value = newReactions
}
function updateQuadraticVotes(newVotes) {
  quadraticVotes.value = newVotes
}
function updateTokenWeights(newWeights) {
  tokenWeights.value = newWeights
}
</script>
