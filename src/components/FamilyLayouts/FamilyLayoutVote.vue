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

        <!-- Stacked mode: multiple active engines, each covering disjoint items -->
        <div v-else-if="stackedEngines.length" class="vote-interface stacked">
            <VoteHeader
                part="bar"
                :total-votes="totalVotes"
                :current-engine="currentEngine"
                :available-engines="availableEngines"
                :can-manage-vote="canManageVote"
                :is-readonly="isReadonly"
                :current-layout="currentLayout"
                :allowed-layouts="allowedLayouts"
                :hide-results="resultsHidden"
                @update:layout="currentLayout = $event"
                @create-engine="showCreateEngineModal = true"
            />

            <section
                v-for="engine in stackedEngines"
                :key="engine.id"
                class="vote-engine-section"
                :aria-labelledby="`engine-title-${engine.id}`"
            >
                <VoteHeader
                    part="card"
                    :current-engine="engine"
                    :available-engines="availableEngines"
                    :can-manage-vote="canManageVote"
                    :is-readonly="isReadonly"
                    :total-votes="0"
                    :current-layout="currentLayout"
                    :allowed-layouts="allowedLayouts"
                    @edit-engine="handleEditEngine"
                    @delete-engine="handleDeleteEngine"
                    @add-to-vote="onAddToVote"
                />
                <VoteEngineBlock
                    ref="blocks"
                    :inquiry-id="parentId ?? 0"
                    :engine-id="engine.id"
                    :layout="currentLayout"
                    :time-remaining="timeRemaining"
                    :enqueue-save="enqueueSave"
                    :hide-results="hidesResults(engine)"
                    @open-supports-modal="openSupportsModal"
                    @select-option="$emit('selectOption', $event)"
                    @progress="onProgress"
                />

                <!-- Empty state when no items are linked -->
                <VoteEmptyState
                    v-if="(!engine.target_ids || engine.target_ids.length === 0)"
                    :no-items-linked="true"
                    :can-manage-vote="canManageVote"
                    :is-readonly="isReadonly"
                    @add-to-vote="showAddToVoteModal = true"
                    @configure="showCreateEngineModal = true"
                />

                <!-- Empty state when no votable items exist -->
                <VoteEmptyState
                    v-else-if="votableItems.length === 0"
                    :can-manage-vote="canManageVote"
                    :is-readonly="isReadonly"
                    @add-option="$emit('addOption')"
                />
            </section>

            <!-- Stacked-mode progress bar -->
            <div class="vote-progress-bar stacked">
                <span id="vote-progress-label">
                    {{
                        n(
                            'agora',
                            '{answered} answer out of {total}',
                            '{answered} answers out of {total}',
                            progressTotals[0],
                            { answered: progressTotals[0], total: progressTotals[1] },
                        )
                    }}
                </span>
                <progress
                    :value="progressTotals[0]"
                    :max="progressTotals[1] || 1"
                    aria-labelledby="vote-progress-label"
                />
                <span v-if="savesRunning">{{ t('agora', 'Saving …') }}</span>
                <span v-else-if="savedOnce && !failedSaves.size && !allSaved">
                    {{ t('agora', 'Saved') }}
                </span>
                <span aria-live="polite">
                    <template v-if="!savesRunning && failedSaves.size">
                        {{ t('agora', 'Not saved') }}
                    </template>
                    <template v-else-if="allSaved">
                        {{ t('agora', 'All your answers are saved') }}
                    </template>
                </span>
                <NcButton
                    v-if="!savesRunning && failedSaves.size"
                    variant="tertiary"
                    @click="retrySaves"
                >
                    {{ t('agora', 'Retry') }}
                </NcButton>
            </div>
        </div>

        <!-- Single-engine mode -->
        <div v-else-if="hasActiveEngine && currentEngine" class="vote-interface">
            <VoteHeader
                :total-votes="totalVotes"
                :current-engine="currentEngine"
                :available-engines="availableEngines"
                :can-manage-vote="canManageVote"
                :is-readonly="isReadonly"
                :current-layout="currentLayout"
                :allowed-layouts="allowedLayouts"
                :hide-results="resultsHidden"
                @update:layout="currentLayout = $event"
                @update:engine="handleEngineUpdate"
                @create-engine="showCreateEngineModal = true"
                @edit-engine="handleEditEngine"
                @delete-engine="handleDeleteEngine"
                @add-to-vote="onAddToVote"
            />

            <VoteEmptyState
                v-if="!currentEngine.target_ids || currentEngine.target_ids.length === 0"
                :no-items-linked="true"
                :can-manage-vote="canManageVote"
                :is-readonly="isReadonly"
                @add-to-vote="showAddToVoteModal = true"
                @configure="showCreateEngineModal = true"
            />

            <VoteEmptyState
                v-else-if="votableItems.length === 0"
                :can-manage-vote="canManageVote"
                :is-readonly="isReadonly"
                @add-option="$emit('addOption')"
            />

            <!-- Cards Layout -->
            <div v-else-if="currentLayout === 'cards'" class="cards-layout">
                <VoteCardsLayout
                    :ranked-items="rankedItems"
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
                    @toggle-selection="toggleSelection"
                    @update:rankings="updateRankings"
                    @update:scores="updateScores"
                    @update:grades="updateGrades"
                    @update:reactions="updateReactions"
                    @update:quadratic-votes="updateQuadraticVotes"
                    @update:token-weights="updateTokenWeights"
                    @vote="(item, value) => submitSingleVote(parentId, item, value)"
                    @submit-multi-vote="onSubmitMultiVote"
                    @remove-my-vote="removeMyVote"
                    @select-option="(opt) => emit('selectOption', toItem(opt))"
                    @open-supports-modal="openSupportsModal"
                />

                <!-- Single-engine progress bar -->
                <div class="vote-progress-bar">
                    <span id="vote-progress-label">
                        {{
                            n(
                                'agora',
                                '{answered} answer out of {total}',
                                '{answered} answers out of {total}',
                                progressTotals[0],
                                { answered: progressTotals[0], total: progressTotals[1] },
                            )
                        }}
                    </span>
                    <progress
                        :value="progressTotals[0]"
                        :max="progressTotals[1] || 1"
                        aria-labelledby="vote-progress-label"
                    />
                    <span v-if="savesRunning">{{ t('agora', 'Saving …') }}</span>
                    <span v-else-if="savedOnce && !failedSaves.size && !allSaved">
                        {{ t('agora', 'Saved') }}
                    </span>
                    <span aria-live="polite">
                        <template v-if="!savesRunning && failedSaves.size">
                            {{ t('agora', 'Not saved') }}
                        </template>
                        <template v-else-if="allSaved">
                            {{ t('agora', 'All your answers are saved') }}
                        </template>
                    </span>
                    <NcButton
                        v-if="!savesRunning && failedSaves.size"
                        variant="tertiary"
                        @click="retrySaves"
                    >
                        {{ t('agora', 'Retry') }}
                    </NcButton>
                </div>
            </div>

            <!-- Results Layout -->
            <div v-else-if="currentLayout === 'results'" class="results-layout">
                <VoteResultsLayout
                    :items="votableItems"
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
                    :selected-options="selectedOptions"
                    :can-submit-multi-vote="canSubmitMultiVote"
                    :vote-selection-info="voteSelectionInfo"
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
                    @vote="(item, value) => submitSingleVote(parentId, item, value)"
                    @submit-multi-vote="submitMultiVote"
                    @select-option="(opt) => emit('selectOption', toItem(opt))"
                />
            </div>
        </div>

        <!-- No active engine at all -->
        <VoteEmptyState
            v-else
            :no-engine="true"
            :can-manage-vote="canManageVote"
            :is-readonly="isReadonly"
            @configure="showCreateEngineModal = true"
            @add-option="$emit('addOption')"
        />

        <!-- Supports Modal -->
        <SupportsDetailModal
            v-if="showSupportsModal"
            :option-id="selectedItemId"
            :inquiry-id="parentId ?? 0"
            :display-vote="true"
            @close="showSupportsModal = false"
        />

        <!-- Create/Edit Engine Modal -->
        <EngineSelectorModal
            v-if="showCreateEngineModal"
            :mode="engineModalMode"
            :existing-engine="engineToEdit"
            :item-count="allItems.length"
            :available-engines="availableEnginesSelector"
            :has-votes="currentEngineHasVotes"
            @close="closeEngineModal"
            @save="onEngineSaved"
        />

        <!-- Add Items to Vote Modal -->
        <AddItemToFamily
            v-if="showAddToVoteModal"
            :inquiry-id="parentId ?? 0"
            :family-type="'vote'"
            :current-engine="currentEngine"
            :available-items="allItems"
            :already-linked-item-ids="votableItemIds"
            @close="showAddToVoteModal = false"
            @success="onItemsAdded"
            @option-family-changed="handleOptionFamilyChanged"
        />

        <!-- Delete Confirmation -->
        <NcDialog
            v-if="showDeleteConfirm"
            :name="t('agora', 'Delete voting method')"
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
import { ref, computed, useTemplateRef, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { n, t } from '@nextcloud/l10n'
import { NcLoadingIcon, NcDialog } from '@nextcloud/vue'
import NcButton from '@nextcloud/vue/components/NcButton'

import type { Item, Option, Inquiry, SupportEngine } from '../../Types/index'
import { useVoteContext, type TargetType } from '../../composables/useVoteContext'
import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useInquiriesStore } from '../../stores/inquiries'
import { useSupportEngineStore } from '../../stores/supportEngine'
import { useSupportsStore } from '../../stores/supports'

import VoteHeader from '../Vote/VoteHeader.vue'
import VoteEmptyState from '../Vote/VoteEmptyState.vue'
import VoteCardsLayout from '../Vote/VoteCardsLayout.vue'
import VoteResultsLayout from '../Vote/VoteResultsLayout.vue'
import VoteEngineBlock from '../Vote/VoteEngineBlock.vue'
import EngineSelectorModal from '../Modals/EngineSelectorModal.vue'
import AddItemToFamily from '../Modals/AddItemToFamily.vue'
import SupportsDetailModal from '../Modals/SupportsDetailModal.vue'
import { ENGINE_DEFINITIONS } from '../../Types/votingType'
import { showSuccess } from '@nextcloud/dialogs'
import { toItem } from '../../helpers/modules/itemHelpers'

const props = defineProps<{
    items: Item[]
    parentId: number | null
    targetType: TargetType
    canManageVote: boolean
    isReadonly: boolean
}>()

const emit = defineEmits<{
    configureEngine: []
    addOption: []
    addToVote: []
    selectOption: [item: Item]
    itemFamilyChanged: [payload: { itemId: number; familyKey: string; action: string }]
}>()

// ---------------------------------------------------------------
// Stores
// ---------------------------------------------------------------
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const inquiriesStore = useInquiriesStore()
const engineStore = useSupportEngineStore()
const supportsStore = useSupportsStore()

// ---------------------------------------------------------------
// All items
// ---------------------------------------------------------------
const allItems = computed<(Option | Inquiry)[]>(() => {
    if (props.items?.length) {
        return props.items.map((i) => i.raw as Option | Inquiry)
    }
    return props.targetType === 'option'
        ? optionsStore.options || []
        : inquiriesStore.inquiries || []
})

// ---------------------------------------------------------------
// Vote context
// ---------------------------------------------------------------
const {
    loadingEngines,
    availableEngines,
    currentEngine,
    votableItems,
    hasActiveEngine,
    hasSelectionsChanged,
    rankings,
    scores,
    grades,
    reactions,
    quadraticVotes,
    tokenWeights,
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
    getItemVoteCount,
    getPercentage,
    getRankedItems,
    getWinner,
    getWinnerPercentage,
    getUserVoteValueForItem,
    refreshEngines,
    effectiveEngineId,
    selectEngine,
    removeMyVote,
} = useVoteContext(props.parentId, props.targetType)

// ---------------------------------------------------------------
// Stacked engines (from main)
// ---------------------------------------------------------------
const stackedEngines = computed<SupportEngine[]>(() => {
    const active = availableEngines.value.filter((e) => e.status === 'active')
    if (
        active.length < 2 ||
        active.some((e) => e.engine === 'phased_voting' || !e.target_ids?.length)
    ) {
        return []
    }
    const covered = new Set<number>()
    for (const e of active) {
        for (const id of e.target_ids) {
            if (covered.has(id)) return []
            covered.add(id)
        }
    }
    const shown = availableEngines.value.flatMap((e) => e.target_ids ?? [])
    if (shown.some((id) => !covered.has(id))) return []
    return [...active].sort((a, b) => a.id - b.id)
})

// ---------------------------------------------------------------
// Progress bookkeeping
// ---------------------------------------------------------------
const progress = ref<Record<number, [number, number]>>({})
const onProgress = (engineId: number, count: number, total: number) => {
    progress.value[engineId] = [count, total]
}
const progressTotals = computed(() =>
    stackedEngines.value.reduce(
        ([count, total], e) => [
            count + (progress.value[e.id]?.[0] ?? 0),
            total + (progress.value[e.id]?.[1] ?? 0),
        ],
        [0, 0],
    ),
)

// ---------------------------------------------------------------
// Save queue
// ---------------------------------------------------------------
let queue: Promise<unknown> = Promise.resolve()
const savesRunning = ref(0)
const savedOnce = ref(false)
const failedSaves = ref(new Map<number, () => Promise<boolean>>())

const enqueueSave = (engineId: number, task: () => Promise<boolean>): Promise<boolean> => {
    savesRunning.value += 1
    const run = queue
        .then(task)
        .catch(() => false)
        .then((ok) => {
            savesRunning.value -= 1
            savedOnce.value = true
            if (ok) failedSaves.value.delete(engineId)
            else failedSaves.value.set(engineId, task)
            return ok
        })
    queue = run
    return run
}

const retrySaves = () => {
    for (const [engineId, task] of failedSaves.value) enqueueSave(engineId, task)
}

const blocks = useTemplateRef<InstanceType<typeof VoteEngineBlock>[]>('blocks')
const allSaved = computed(
    () =>
        progressTotals.value[1] > 0 &&
        progressTotals.value[0] === progressTotals.value[1] &&
        !savesRunning.value &&
        !failedSaves.value.size &&
        (blocks.value ?? []).every((b) => b.settled),
)
onBeforeRouteLeave(async () => {
    await Promise.all((blocks.value ?? []).map((b) => b.flush()))
})

// ---------------------------------------------------------------
// Layout
// ---------------------------------------------------------------
const currentLayout = ref<'cards' | 'results'>('cards')
const hidesResults = (engine?: SupportEngine | null) =>
    engine?.config?.results_visibility === 'closed' &&
    engine?.status !== 'closed' &&
    !props.canManageVote
const resultsHidden = computed(() => hidesResults(currentEngine.value))
const allowedLayouts = computed(() => {
    const engines = stackedEngines.value.length ? stackedEngines.value : [currentEngine.value]
    return engines.every(hidesResults) ? ['cards'] : ['cards', 'results']
})
watch(allowedLayouts, (layouts) => {
    if (!layouts.includes(currentLayout.value)) {
        currentLayout.value = 'cards'
    }
})

// ---------------------------------------------------------------
// Modals state
// ---------------------------------------------------------------
const showCreateEngineModal = ref(false)
const showAddToVoteModal = ref(false)
const showDeleteConfirm = ref(false)
const showSupportsModal = ref(false)
const engineModalMode = ref<'create' | 'edit'>('create')
const engineToEdit = ref<SupportEngine | null>(null)
const engineToDelete = ref<SupportEngine | null>(null)
const selectedItemId = ref<number | null>(null)
const currentEngineHasVotes = ref(false)
const voteSession = ref({ start_date: null, end_date: null, quorum: null })

// ---------------------------------------------------------------
// Engine helpers
// ---------------------------------------------------------------
const engineHasVotes = (engineId: number): boolean => {
    const supports = supportsStore.getSupportsByParent(props.parentId, props.targetType)
    return supports?.some((s) => s.support_engine_id === engineId) ?? false
}

const availableEnginesSelector = computed(() => {
    const engines = Object.entries(ENGINE_DEFINITIONS)
        .filter(([id]) => id !== 'none')
        .map(([id, engine]) => ({
            id,
            label: engine.label,
            voteScope: engine.voteScope,
            inputModel: engine.inputModel,
            description: engine.description,
            constraints: engine.constraints,
            recommendedViews: engine.recommendedViews,
        }))

    const count = props.items.length
    if (!count) return engines

    return engines.filter((engine) => {
        const c = engine.constraints
        if (c?.min_options && count < c.min_options) return false
        if (c?.max_options && count > c.max_options) return false
        return true
    })
})

const winner = computed(() => getWinner(votableItems.value))
const winnerPercentage = computed(() => getWinnerPercentage(votableItems.value))
const rankedItems = computed(() => getRankedItems(votableItems.value))
const votableItemIds = computed(() => votableItems.value.map((item) => item.id))

// ---------------------------------------------------------------
// Supports modal
// ---------------------------------------------------------------
function openSupportsModal(itemId: number) {
    if (resultsHidden.value) return
    selectedItemId.value = itemId
    showSupportsModal.value = true
}

// ---------------------------------------------------------------
// Multi-vote
// ---------------------------------------------------------------
const onSubmitMultiVote = async () => {
    const success = await submitMultiVote()
    if (success) {
        showSuccess(t('agora', 'Your vote has been recorded.'))
    }
}

// ---------------------------------------------------------------
// Ranking updates
// ---------------------------------------------------------------
function updateRankings(newRankings: Record<number, number>) {
    rankings.value = newRankings
}
function updateScores(newScores: Record<number, number>) {
    scores.value = newScores
}
function updateGrades(newGrades: Record<number, string | null>) {
    grades.value = newGrades
}
function updateReactions(newReactions: Record<number, string[] | null>) {
    reactions.value = newReactions
}
function updateQuadraticVotes(newVotes: Record<number, number>) {
    quadraticVotes.value = newVotes
}
function updateTokenWeights(newWeights: Record<number, number>) {
    tokenWeights.value = newWeights
}

// ---------------------------------------------------------------
// Engine CRUD
// ---------------------------------------------------------------
const deleteConfirmMessage = computed(() => {
    if (!engineToDelete.value) return ''
    return t(
        'agora',
        'Are you sure you want to delete the voting method "{title}"? This action cannot be undone.',
        { title: engineToDelete.value.title || t('agora', 'Untitled') },
    )
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
        await engineStore.createEngine({
            inquiry_id: props.parentId,
            title: data.title,
            description: data.description,
            engine: data.engine,
            purpose: data.purpose,
            config: data.config,
            status: data.status || 'draft',
            target_type: props.targetType,
            target_ids: [],
        })
    } else if (engineToEdit.value) {
        await engineStore.updateEngine(engineToEdit.value.id, {
            title: data.title,
            description: data.description,
            engine: data.engine,
            purpose: data.purpose,
            config: data.config,
            status: data.status,
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

const onAddToVote = (engine: SupportEngine) => {
    selectEngine(engine.id)
    showAddToVoteModal.value = true
}

const handleEngineUpdate = (engineId: number | null) => {
    if (engineId) {
        selectEngine(engineId)
    }
}

// ---------------------------------------------------------------
// Item added / family changed
// ---------------------------------------------------------------
const onItemsAdded = () => {
    showAddToVoteModal.value = false
}

const handleOptionFamilyChanged = (payload: {
    optionId: number
    familyKey: string
    action: string
}) => {
    emit('itemFamilyChanged', {
        itemId: payload.optionId,
        familyKey: payload.familyKey,
        action: payload.action,
    })
}

// ---------------------------------------------------------------
// Time remaining
// ---------------------------------------------------------------
const timeRemaining = computed(() => {
    if (!voteSession.value?.end_date) return t('agora', 'No end date')
    const end = new Date(voteSession.value.end_date)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    if (diff <= 0) return t('agora', 'Ended')
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % 86400000) / 3600000)
    return days > 0 ? `${days}d ${hours}h` : `${hours}h`
})
</script>

<style scoped lang="scss">
.family-layout-vote {
    .vote-interface {
        animation: fadeIn 0.3s ease;
    }

    .vote-interface.stacked {
        .vote-engine-section + .vote-engine-section {
            margin-top: 32px;
        }

        :deep(.submit-vote-section) {
            position: static;
        }

        .vote-progress-bar {
            position: sticky;
            bottom: 0;
            z-index: 10;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px 16px;
            padding: 12px 16px;
            background: var(--color-main-background);
            border-top: 1px solid var(--color-border);

            progress {
                flex: 1 1 160px;
            }
        }

        &:has([contenteditable]:focus) .vote-progress-bar {
            position: static;
        }
    }

    .vote-progress-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 16px;
        padding: 12px 16px;
        background: var(--color-main-background);
        border-top: 1px solid var(--color-border);

        progress {
            flex: 1 1 160px;
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
