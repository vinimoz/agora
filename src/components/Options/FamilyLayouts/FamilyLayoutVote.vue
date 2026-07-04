<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <div class="family-layout-vote">
        <div v-if="loadingEngines" class="loading-state">
            <NcLoadingIcon :size="40" />
            <p>{{ t('agora', 'Loading vote interface …') }}</p>
        </div>

        <!-- Show header when there's an active engine, even without options -->
        <div v-else-if="hasActiveEngine && currentEngine" class="vote-interface">
            <VoteHeader
                    :vote-session="voteSession"
                    :total-votes="totalVotes"
                    :current-engine="currentEngine"
                    :available-engines="availableEngines"
                    :can-manage-vote="canManageVote"
                    :is-readonly="isReadonly"
                    :current-layout="currentLayout"
                    :allowed-layouts="allowedLayouts"
                    @update:layout="currentLayout = $event"
                    @update:engine="handleEngineUpdate"
                    @create-engine="showCreateEngineModal = true"
                    @edit-engine="handleEditEngine"
                    @delete-engine="handleDeleteEngine"
                    @add-to-vote="showAddToVoteModal = true"
                    />

            <!-- Empty state when no options are linked -->
            <VoteEmptyState
                    v-if="(!currentEngine.target_ids || currentEngine.target_ids.length === 0)"
                    :no-options-linked="true"
                    :can-manage-vote="canManageVote"
                    :is-readonly="isReadonly"
                    @add-to-vote="showAddToVoteModal = true"
                    @configure="showCreateEngineModal = true"
                    />

            <!-- Empty state when no votable options exist -->
            <VoteEmptyState
                    v-else-if="votableOptions.length === 0"
                    :show-add-button="canAddOptions"
                    :can-manage-vote="canManageVote && canAddOptions"
                    :is-readonly="isReadonly"
                    @add-option="$emit('addOption')"
                    />

            <!-- Cards Layout -->
            <div v-else-if="currentLayout === 'cards'" class="cards-layout">
                <VoteCardsLayout
                        :ranked-options="rankedOptions"
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
                        @open-supports-modal="openSupportsModal"
                        />
            </div>
            <!-- Results Layout -->
            <div v-else-if="currentLayout === 'results'" class="results-layout">
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
        </div>


        <SupportsDetailModal
                v-if="showSupportsModal"
                :option-id="selectedOptionId"
                :inquiry-id="inquiryId"
                 :display-vote="true"
                @close="showSupportsModal = false"
                />

        <!-- Show empty state when no engine exists -->
        <VoteEmptyState
                v-else-if="!hasActiveEngine"
                :no-engine="true"
                :can-manage-vote="canManageVote"
                :is-readonly="isReadonly"
                @configure="showCreateEngineModal = true"
                @add-option="$emit('addOption')"
                />

        <!-- Create/Edit Engine Modal -->
        <EngineSelectorModal
                v-if="showCreateEngineModal"
                :mode="engineModalMode"
                :existing-engine="engineToEdit"
                :option-count="allOptions.length"
                :available-engines="availableEnginesSelector"
                :has-votes="currentEngineHasVotes"
                @close="closeEngineModal"
                @save="onEngineSaved"
                />

        <!-- Add Options to Vote Modal -->
        <AddOptionToFamily
                v-if="showAddToVoteModal"
                :inquiry-id="inquiryId"
                family-type="vote"
                :current-engine="currentEngine"
                :available-options="allOptions"
                :already-linked-option-ids="votableOptionIds"
                @close="showAddToVoteModal = false"
                @options-added="onOptionsAdded"
                @option-family-changed="handleOptionFamilyChanged"
                />

        <!-- Delete Confirmation Dialog -->
        <NcDialog
                v-if="showDeleteConfirm"
                :name="t('agora', 'Delete Voting Method')"
                :message="deleteConfirmMessage"
                @confirm="confirmDelete"
                @cancel="cancelDelete"
                >
                <template #actions>
                    <NcButton type="primary" @click="confirmDelete">
                    {{ t('agora', 'Delete') }}
                    </NcButton>
        <NcButton type="tertiary" @click="cancelDelete">
        {{ t('agora', 'Cancel') }}
        </NcButton>
                </template>
        </NcDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { NcLoadingIcon, NcDialog } from '@nextcloud/vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import type { Option, SupportEngine } from '../../Types/index'
import { useVoteContext } from '../../../composables/useVoteContext'
import { useOptionsStore } from '../../../stores/options'
import { useSupportEngineStore } from '../../../stores/supportEngine'
import { useSupportsStore } from '../../../stores/supports'
import VoteHeader from '../Vote/VoteHeader.vue'
import VoteEmptyState from '../Vote/VoteEmptyState.vue'
import VoteCardsLayout from '../Vote/VoteCardsLayout.vue'
import VoteResultsLayout from '../Vote/VoteResultsLayout.vue'
import EngineSelectorModal from '../../Modals/EngineSelectorModal.vue'
import AddOptionToFamily from '../../Modals/AddOptionToFamily.vue'
import SupportsDetailModal from '../../Modals/SupportsDetailModal.vue'
import { ENGINE_DEFINITIONS } from '../../../Types/votingType'
import { showSuccess } from '@nextcloud/dialogs'

const props = defineProps<{
  inquiryId: number
  canManageVote: boolean
  isReadonly: boolean
  canAddOptions: boolean
}>()

const emit = defineEmits<{
  'configureEngine': []
  'addOption': []
  'addToVote': []
  'selectOption': [option: Option]
  'optionFamilyChanged': [payload: { optionId: number, familyKey: string, action: string }]
}>()

const optionsStore = useOptionsStore()
const engineStore = useSupportEngineStore()
const allOptions = computed(() => optionsStore.options || [])
const votableOptionIds = computed(() => votableOptions.value.map(opt => opt.id))
const supportsStore = useSupportsStore()
const showSupportsModal = ref(false)
const selectedOptionId = ref<number | null>(null)

const engineHasVotes = (engineId: number): boolean => supportsStore.supports?.some(s => s.support_engine_id === engineId) ?? false

const {
  loadingEngines,
  availableEngines,
  currentEngine,
  votableOptions,
  hasActiveEngine,
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
  getPercentage,
  getRankedOptions,
  getWinner,
  getWinnerPercentage,
  getUserVoteValueForOption,
  refreshEngines,
  effectiveEngineId,
  selectEngine,
  removeMyVote,
  grades,
  reactions,
  quadraticVotes,
  tokenWeights,
} = useVoteContext(props.inquiryId)

// Local UI state
const currentLayout = ref<'cards' | 'results'>('cards')
const allowedLayouts = ['cards', 'results']
const showCreateEngineModal = ref(false)
const showAddToVoteModal = ref(false)
const showDeleteConfirm = ref(false)
const engineModalMode = ref<'create' | 'edit'>('create')
const engineToEdit = ref<SupportEngine | null>(null)
const engineToDelete = ref<SupportEngine | null>(null)
const voteSession = ref({ start_date: null, end_date: null, quorum: null })
const winner = computed(() => getWinner(votableOptions.value))
const winnerPercentage = computed(() => getWinnerPercentage(votableOptions.value))
const currentEngineHasVotes = ref(false)

const rankedOptions = computed(() => getRankedOptions(votableOptions.value))

const availableEnginesSelector = computed(() => {
  const engines = Object.entries(ENGINE_DEFINITIONS)
    .filter(([id]) => id !== 'none') // Exclude 'none' from selection
    .map(([id, engine]) => ({
      id,
      label: engine.label,
       voteScope: engine.voteScope,
       inputModel: engine.inputModel,
      description: engine.description,
      constraints: engine.constraints,
      recommendedViews: engine.recommendedViews
    }))

  if (!props.optionCount) return engines

  return engines.filter(engine => {
    const constraints = engine.constraints
    if (constraints?.min_options && props.optionCount! < constraints.min_options) return false
    if (constraints?.max_options && props.optionCount! > constraints.max_options) return false
    return true
  })
})

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

const deleteConfirmMessage = computed(() => {
  if (!engineToDelete.value) return ''
  return t('agora', 'Are you sure you want to delete the voting method "{title}"? This action cannot be undone.', {
    title: engineToDelete.value.title || t('agora', 'Untitled')
  })
})

const handleEditEngine = (engine: SupportEngine) => {
  engineToEdit.value = engine
  engineModalMode.value = 'edit'
  showCreateEngineModal.value = true
  currentEngineHasVotes.value = engineHasVotes(engine.id)
}

const handleDeleteEngine = (engine: SupportEngine) => {
  engineToDelete.value = engine
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  if (engineToDelete.value) {
    try {
      await engineStore.deleteEngine(engineToDelete.value.id)
      await refreshEngines()

      // After deletion, select another engine if available
      if (availableEngines.value.length > 0) {
        selectEngine(availableEngines.value[0].id)
      }
    } catch (error) {
      console.error('Failed to delete engine:', error)
    }
  }
  showDeleteConfirm.value = false
  engineToDelete.value = null
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  engineToDelete.value = null
}

const onEngineSaved = async (data: {
  title: string
  description: string
  engine: string
  purpose: string
  config: Record<string, unknown>
  status?: 'draft' | 'active' | 'closed'
}) => {
  if (engineModalMode.value === 'create') {
    // Create new engine
    await engineStore.createEngine({
      inquiry_id: props.inquiryId,
      title: data.title,
      description: data.description,
      engine: data.engine,
      purpose: data.purpose,
      config: data.config,
      status: data.status || 'draft',
      target_type: 'option',
      target_ids: []
    })
  } else if (engineToEdit.value) {
    // Update existing engine
    await engineStore.updateEngine(engineToEdit.value.id, {
      title: data.title,
      description: data.description,
      engine: data.engine,
      purpose: data.purpose,
      config: data.config,
      status: data.status
    })
  }

  await refreshEngines()
  closeEngineModal()
}

const closeEngineModal = () => {
  showCreateEngineModal.value = false
  engineToEdit.value = null
  engineModalMode.value = 'create'
}

const handleEngineUpdate = (engineId: number | null) => {
  if (engineId) {
    selectEngine(engineId)
  }
}

function openSupportsModal(optionId: number) {
  selectedOptionId.value = optionId
  showSupportsModal.value = true
}

const timeRemaining = computed(() => {
  if (!voteSession.value?.end_date) return t('agora', 'No end date')
  const end = new Date(voteSession.value.end_date)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  if (diff <= 0) return t('agora', 'Ended')
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (86400000)) / (3600000))
  return days > 0 ? `${days}d ${hours}h` : `${hours}h`
})

const handleOptionFamilyChanged = (payload) => {
  emit('optionFamilyChanged', payload)
}


const onOptionsAdded = () => {
  showAddToVoteModal.value = false
}
</script>

<style scoped lang="scss">
.family-layout-vote {
    .vote-interface {
        animation: fadeIn 0.3s ease;
    }

    .debug-panel {
        background: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 16px;
        margin: 16px;

        pre {
            background: #fff;
            padding: 12px;
            overflow-x: auto;
            font-size: 12px;
        }
    }

    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px;
        gap: 16px;
    }
}

                      @keyframes fadeIn {
                          from {
                              opacity: 0;
                              transform: translateY(10px);
                          }
                          to {
                              opacity: 1;
                              transform: translateY(0);
                          }
                      }
</style>
