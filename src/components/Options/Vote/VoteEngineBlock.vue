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
                :auto-save="autoSave"
                @toggle-selection="toggleSelection"
                @update:rankings="updateRankings"
                @update:scores="updateScores"
                @update:grades="updateGrades"
                @update:reactions="updateReactions"
                @update:quadratic-votes="updateQuadraticVotes"
                @update:token-weights="updateTokenWeights"
                @vote="(option, value) => submitSingleVote(inquiryId,option, value)"
                @submit-multi-vote="onSubmitMultiVote"
                @remove-my-vote="onRemoveMyVote"
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
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess } from '@nextcloud/dialogs'
import type { Option } from '../../../Types/index'
import { useVoteContext } from '../../../composables/useVoteContext'
import { useSupportsStore } from '../../../stores/supports'
import VoteCardsLayout from './VoteCardsLayout.vue'
import VoteResultsLayout from './VoteResultsLayout.vue'

const props = defineProps<{
  inquiryId: number
  engineId: number
  layout: 'cards' | 'results'
  timeRemaining: string
  enqueueSave?: (engineId: number, task: () => Promise<boolean>) => Promise<boolean>
}>()

const emit = defineEmits<{
  'openSupportsModal': [optionId: number]
  'selectOption': [option: Option]
  'progress': [engineId: number, answered: number, total: number]
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
  loadUserVotesForEngine,
  grades,
  reactions,
  quadraticVotes,
  tokenWeights,
} = useVoteContext(props.inquiryId, props.engineId)

const winner = computed(() => getWinner(votableOptions.value))
const winnerPercentage = computed(() => getWinnerPercentage(votableOptions.value))

const rankedOptions = computed(() => getRankedOptions(votableOptions.value))

const answered = computed(() => votableOptions.value.filter((o) => isSelectedForVote(o.id)).length)
watch(
  [answered, () => votableOptions.value.length],
  ([count, total]) => emit('progress', props.engineId, count, total),
  { immediate: true },
)

const AUTO_SAVE_ENGINES = ['binary', 'ternary', 'majority_judgment']
const supportsStore = useSupportsStore()
const hasLocalAnswers = () => answered.value > 0

// A save sends the whole ballot: never autosave before the stored answers are loaded.
const hydrated = ref(false)
watch(
  [() => supportsStore.getSupportsByInquiryId(props.inquiryId), () => supportsStore.loading],
  () => {
    if (hydrated.value || supportsStore.loading) return
    if (hasUserVoted.value && !hasLocalAnswers()) loadUserVotesForEngine(props.engineId)
    hydrated.value = !hasUserVoted.value || hasLocalAnswers()
  },
  { immediate: true },
)

const autoSave = computed(() => !!props.enqueueSave && hydrated.value
  && AUTO_SAVE_ENGINES.includes(effectiveEngineId.value))
let timer: ReturnType<typeof setTimeout> | undefined
let pending: Promise<boolean> = Promise.resolve(true)

// Stacked mode: every support write goes through the page queue.
const write = (task: () => Promise<boolean>): Promise<boolean> =>
  props.enqueueSave ? props.enqueueSave(props.engineId, task) : task()

async function removeAll(reload: boolean): Promise<boolean> {
  await removeMyVote(reload)
  // removeSupport swallows ERR_CANCELED: trust the store, not the return value.
  return !hasUserVoted.value
}

async function save(): Promise<boolean> {
  if (hasLocalAnswers()) return submitMultiVote(false)
  return hasUserVoted.value ? removeAll(false) : true
}

function flush(): Promise<boolean> {
  if (timer === undefined) return pending
  clearTimeout(timer)
  timer = undefined
  pending = write(save)
  return pending
}

function scheduleSave() {
  if (!autoSave.value) return
  clearTimeout(timer)
  timer = setTimeout(flush, 1000)
}

function onRemoveMyVote() {
  clearTimeout(timer)
  timer = undefined
  pending = write(() => removeAll(true))
}

defineExpose({ flush })

const onSubmitMultiVote = async () => {
  const success = await write(() => submitMultiVote())
  if (success) {
    showSuccess(t('agora', 'Your vote has been recorded.'))
  }
}

function updateRankings(newRankings) {
  rankings.value = newRankings
}
function updateScores(newScores) {
  scores.value = newScores
  scheduleSave()
}
function updateGrades(newGrades) {
  grades.value = newGrades
  scheduleSave()
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
