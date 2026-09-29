<!--
    SPDX-FileCopyrightText: 2026 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <!-- Cards Layout -->
    <div v-if="layout === 'cards' || hideResults" class="cards-layout">
        <VoteCardsLayout
                :items="votableItems"
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
                :get-item-vote-count="getItemVoteCount"
                :get-percentage="(item) => getPercentage(item)"
                :has-user-voted-for="hasUserVotedFor"
                :is-selected-for-vote="isSelectedForVote"
                :get-user-vote-value-for-item="getUserVoteValueForItem"
                :has-selections-changed="hasSelectionsChanged"
                :auto-save="autoSave"
                :hide-results="hideResults"
                @toggle-selection="toggleSelection"
                @update:rankings="updateRankings"
                @update:scores="updateScores"
                @update:grades="updateGrades"
                @update:reactions="updateReactions"
                @update:quadratic-votes="updateQuadraticVotes"
                @update:token-weights="updateTokenWeights"
                @vote="(item, value) => submitSingleVote(inquiryId,item, value)"
                @submit-multi-vote="onSubmitMultiVote"
                @remove-my-vote="onRemoveMyVote"
                @select-item="$emit('selectItem', $event)"
                @open-supports-modal="!hideResults && $emit('openSupportsModal', $event)"
                />
    </div>
    <!-- Results Layout -->
    <div v-else class="results-layout">
        <VoteResultsLayout
                :total-votes="totalVotes"
                :ranked-items="rankedItems"
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
                :selected-items="selectedItems"
                :can-submit-multi-vote="canSubmitMultiVote"
                :vote-selection-info="voteSelectionInfo"
                :get-item-rank="getItemRank"
                :get-item-vote-count="getItemVoteCount"
                :get-percentage="(item) => getPercentage(item)"
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
                @vote="(item, value) => submitSingleVote(inquiryId,item, value)"
                @submit-multi-vote="submitMultiVote"
                @select-item="$emit('selectItem', $event)"
                />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess } from '@nextcloud/dialogs'
import type { Item } from '../../Types/index'
import { useVoteContext } from '../../composables/useVoteContext'
import { useSupportsStore } from '../../stores/supports'
import VoteCardsLayout from './VoteCardsLayout.vue'
import VoteResultsLayout from './VoteResultsLayout.vue'

const props = defineProps<{
  inquiryId: number
  engineId: number
  targetType: 'option' | 'inquiry'  
  layout: 'cards' | 'results'
  timeRemaining: string
  enqueueSave?: (engineId: number, task: () => Promise<boolean>) => Promise<boolean>
  hideResults?: boolean
}>()

const emit = defineEmits<{
  'openSupportsModal': [itemId: number]
  'selectItem': [item: Item]
  'progress': [engineId: number, answered: number, total: number]
}>()

const {
  currentEngine,
  votableItems,
  hasSelectionsChanged,
  rankings,
  scores,
  selectedItems,
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
  getItemVoteCount,
  getItemRank,
  getPercentage,
  getRankedItems,
  getWinner,
  getWinnerPercentage,
  getUserVoteValueForItem,
  effectiveEngineId,
  removeMyVote,
  loadUserVotesForEngine,
  grades,
  reactions,
  quadraticVotes,
  tokenWeights,
  } = useVoteContext(props.inquiryId, props.targetType, props.engineId)

const winner = computed(() => getWinner(votableItems.value))
const winnerPercentage = computed(() => getWinnerPercentage(votableItems.value))

const rankedItems = computed(() => getRankedItems(votableItems.value))

const answered = computed(() => votableItems.value.filter((o) => isSelectedForVote(o.id)).length)
watch(
  [answered, () => votableItems.value.length],
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
const waiting = ref(false)
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
  waiting.value = false
  pending = write(save)
  return pending
}

function scheduleSave() {
  if (!autoSave.value) return
  clearTimeout(timer)
  timer = setTimeout(flush, 1000)
  waiting.value = true
}

async function onRemoveMyVote() {
  clearTimeout(timer)
  timer = undefined
  waiting.value = false
  const success = await write(() => removeAll(true))
  if (success) {
    showSuccess(t('agora', 'Your vote has been removed.'))
  }
}

// Every answer of this block is stored or on its way to the page queue.
const settled = computed(() => {
  if (!autoSave.value) return hasLocalAnswers() === false || !!props.enqueueSave
  return !waiting.value
})

defineExpose({ flush, settled })

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
