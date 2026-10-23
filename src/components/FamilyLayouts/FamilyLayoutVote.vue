<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="family-layout-vote">
    <!-- Loading -->
    <div
      v-if="loadingEngines"
      class="loading-state"
    >
      <NcLoadingIcon :size="40" />
      <p>{{ t('agora', 'Loading vote interface …') }}</p>
    </div>

    <!-- No engines at all -->
    <VoteEmptyState
      v-else-if="!availableEngines.length"
      :no-engine="true"
      :can-manage-vote="canManageVote"
      :is-readonly="isReadonly"
      @configure="showCreateEngineModal = true"
      @add-item="$emit('addItem')"
    />

    <!-- Stacked mode: N disjoint active engines, one shared ballot strip -->
<div v-if="isStacked" class="vote-interface stacked">
  <!-- Optional: engine strip header for the whole page -->
  <div class="stacked-header">
    <h2>{{ t('agora', 'Vote on all methods') }}</h2>
    <span class="stacked-count">
      {{ n('agora', '{count} method', '{count} methods', stackedEngines.length, { count: stackedEngines.length }) }}
    </span>
  </div>

  <section
    v-for="engine in stackedEngines"
    :key="engine.id"
    class="vote-engine-section"
  >
    <div class="engine-strip">
      <h3>{{ engine.title || t('agora', 'Untitled engine') }}</h3>
      <span class="engine-badge engine-badge--type">
        {{ ENGINE_DEFINITIONS[engine.engine]?.label ?? engine.engine }}
      </span>
    </div>

    <VoteEngineBlock
      ref="blocks"
      :parent-id="effectiveParentId ?? 0"
      :target-type="props.targetType"
      :engine-id="engine.id"
      layout="cards"
      :time-remaining="timeRemaining"
      :enqueue-save="enqueueSave"
      :hide-results="hidesResults(engine)"
      @open-supports-modal="openSupportsModal"
      @select-item="$emit('selectItem', $event)"
      @progress="onProgress"
    />
  </section>

  <!-- Shared progress + submit bar -->
  <div class="vote-progress-bar">
    <span>
      {{
        n('agora', '{answered} answer out of {total}', '{answered} answers out of {total}',
          progressTotals[1], { answered: progressTotals[0], total: progressTotals[1] })
      }}
    </span>
    <progress :value="progressTotals[0]" :max="progressTotals[1] || 1" />
    <span v-if="savesRunning">{{ t('agora', 'Saving …') }}</span>
    <span v-else-if="failedSaves.size">
      {{ t('agora', 'Not saved') }}
      <NcButton variant="tertiary" @click="retrySaves">{{ t('agora', 'Retry') }}</NcButton>
    </span>
    <span v-else-if="allSaved">{{ t('agora', 'All your answers are saved') }}</span>
  </div>
</div>

    <!-- Main interface -->
    <template v-else>
      <!-- Tab bar + primary action -->
      <div class="vote-header-row">
        <nav
          class="vote-tabs"
          role="tablist"
          :aria-label="t('agora', 'Vote sections')"
        >
          <button
            v-for="tab in visibleTabs"
            :id="`vote-tab-${tab.key}`"
            :key="tab.key"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.key ? 'true' : 'false'"
            :aria-controls="`vote-panel-${tab.key}`"
            :class="[
              'vote-tab',
              `vote-tab--${tab.key}`,
              { 'vote-tab--active': activeTab === tab.key },
            ]"
            @click="activeTab = tab.key"
          >
            <span class="vote-tab__dot" />
            <span class="vote-tab__label">{{ tab.label }}</span>
            <span
              v-if="tab.count > 0"
              class="vote-tab__count"
            >{{ tab.count }}</span>
          </button>
        </nav>

        <NcButton
          v-if="canManageVote"
          variant="primary"
          @click="showCreateEngineModal = true"
        >
          <template #icon>
            <PlusIcon :size="20" />
          </template>
          {{ t('agora', 'New engine') }}
        </NcButton>
      </div>

      <!-- Tab panels -->
      <div
        :id="`vote-panel-${activeTab}`"
        role="tabpanel"
        :aria-labelledby="`vote-tab-${activeTab}`"
        class="vote-panel"
      >
        <!-- Draft / Active / Closed panels -->
        <template v-if="activeTab !== 'results'">
          <VoteEmptyState
            v-if="!enginesForTab.length"
            :no-engine="true"
            :can-manage-vote="canManageVote"
            :is-readonly="isReadonly"
            @configure="showCreateEngineModal = true"
            @add-item="$emit('addItem')"
          />

          <template v-else>
            <!-- Engine picker (only when more than one of this status) -->
            <div
              v-if="enginesForTab.length > 1"
              class="engine-picker"
            >
              <NcSelect
                v-model="enginePickerValue"
                :options="enginePickerOptions"
                :input-label="t('agora', 'Voting engine')"
                label="label"
                :reduce="(o: EngineOption) => o.id"
                :clearable="false"
                :searchable="false"
                :placeholder="t('agora', 'Select engine')"
              />
            </div>

            <!-- Engine info strip -->
            <div
              v-if="currentEngine"
              class="engine-strip"
            >
              <div class="engine-strip__main">
                <div class="engine-strip__title-row">
                  <h2 class="engine-strip__title">
                    {{ currentEngine.title || t('agora', 'Untitled engine') }}
                  </h2>

                  <!-- voting method type -->
                  <span class="engine-badge engine-badge--type">
                    {{ ENGINE_DEFINITIONS[currentEngine.engine]?.label ?? currentEngine.engine }}
                  </span>

                  <!-- purpose -->
                  <span
                    v-if="currentEngine.purpose"
                    class="engine-badge engine-badge--purpose"
                  >
                    {{ currentEngine.purpose }}
                  </span>

                  <!-- lifecycle status -->
                  <span
                    class="engine-badge"
                    :class="`engine-badge--${currentEngine.status}`"
                  >
                    {{ capitalize(currentEngine.status) }}
                  </span>

                  <!-- phase, if the engine has one -->
                  <span
                    v-if="currentEngine.metadata?.phase"
                    class="engine-badge engine-badge--phase"
                  >
                    {{ currentEngine.metadata.phase }}
                  </span>

                  <span class="engine-strip__votes">
                    {{
                      n('agora', '{count} vote', '{count} votes', totalVotes, { count: totalVotes })
                    }}
                  </span>
                </div>

                <p
                  v-if="currentEngine.description"
                  class="engine-strip__description"
                >
                  {{ currentEngine.description }}
                </p>

                <!-- config summary -->
                <ul class="engine-strip__config">
                  <li v-if="currentEngine.target_ids?.length">
                    <strong>{{ t('agora', 'Items') }}:</strong>
                    {{ currentEngine.target_ids.length }}
                  </li>
                  <li v-if="currentEngine.config?.quorum">
                    <strong>{{ t('agora', 'Quorum') }}:</strong>
                    {{ currentEngine.config.quorum }}
                  </li>
                  <li v-if="currentEngine.config?.max_votes_per_user">
                    <strong>{{ t('agora', 'Max votes/user') }}:</strong>
                    {{ currentEngine.config.max_votes_per_user }}
                  </li>
                  <li v-if="currentEngine.config?.credits_per_user">
                    <strong>{{ t('agora', 'Credits/user') }}:</strong>
                    {{ currentEngine.config.credits_per_user }}
                  </li>
                  <li
                    v-if="
                      currentEngine.config?.min !== undefined &&
                        currentEngine.config?.max !== undefined
                    "
                  >
                    <strong>{{ t('agora', 'Range') }}:</strong>
                    {{ currentEngine.config.min }} – {{ currentEngine.config.max }}
                  </li>
                  <li v-if="currentEngine.metadata?.started_at">
                    <strong>{{ t('agora', 'Started') }}:</strong>
                    {{ new Date(currentEngine.metadata.started_at * 1000).toLocaleDateString() }}
                  </li>
                  <li v-if="currentEngine.metadata?.ended_at">
                    <strong>{{ t('agora', 'Ended') }}:</strong>
                    {{ new Date(currentEngine.metadata.ended_at * 1000).toLocaleDateString() }}
                  </li>
                </ul>
              </div>

              <div
                v-if="canManageVote && currentEngine && currentEngine.status === 'draft'"
                class="engine-strip__actions"
              >
                <NcButton
                  variant="tertiary"
                  @click="handleEditEngine(currentEngine)"
                >
                  {{ t('agora', 'Edit') }}
                </NcButton>
                <NcButton
                  variant="tertiary"
                  @click="handleDeleteEngine(currentEngine)"
                >
                  {{ t('agora', 'Delete') }}
                </NcButton>
                <NcButton
                  variant="tertiary"
                  @click="onAddToVote(currentEngine)"
                >
                  {{ t('agora', 'Add items') }}
                </NcButton>
              </div>
            </div>

            <!-- Empty: no items linked -->
            <VoteEmptyState
              v-if="
                currentEngine &&
                  (!currentEngine.target_ids || currentEngine.target_ids.length === 0)
              "
              :no-items-linked="true"
              :can-manage-vote="canManageVote"
              :is-readonly="isReadonly"
              @add-to-vote="onAddToVote(currentEngine)"
              @configure="showCreateEngineModal = true"
            />

            <!-- Empty: no votable items -->
            <VoteEmptyState
              v-else-if="currentEngine && votableItems.length === 0"
              :can-manage-vote="canManageVote"
              :is-readonly="isReadonly"
              @add-item="$emit('addItem')"
            />

            <!-- Ballot -->
            <VoteCardsLayout
              v-else-if="currentEngine"
              :items="votableFullItems"
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
	      :get-item-majority-judgment="getMajorityJudgment"
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
              @vote="(item, value) => submitSingleVote(effectiveParentId ?? 0, item, value)"
              @submit-multi-vote="onSubmitMultiVote"
              @remove-my-vote="removeMyVote"
              @select-item="$emit('selectItem', $event)"
              @open-supports-modal="openSupportsModal"
            />
          </template>
        </template>

        <!-- Results panel -->
        <template v-else>
          <!-- Engine picker on top of the Results panel so users can switch -->
          <div
            v-if="activeEngines.length > 1"
            class="engine-picker"
          >
            <NcSelect
              :model-value="resultsEngine?.id ?? null"
              :options="
                activeEngines.map((e) => ({
                  id: e.id,
                  label: e.title || t('agora', 'Untitled engine'),
                }))
              "
              :input-label="t('agora', 'Voting engine')"
              label="label"
              :reduce="(o: EngineOption) => o.id"
              :clearable="false"
              :searchable="false"
              @update:model-value="(id) => selectEngine(id)"
            />
          </div>

          <VoteResultsLayout
            v-if="resultsEngine && votableItems.length && !resultsHidden"
            :total-votes="totalVotes"
            :ranked-items="rankedItems"
            :effective-engine-id="resultsEngine.engine"
            :active-engine="resultsEngine"
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
            :get-item-vote-count="getItemVoteCount"
            :get-item-rank="getItemRank"
            :get-percentage="(item) => getPercentage(item)"
            :is-selected-for-vote="isSelectedForVote"
            :winner="winner"
            :winner-percentage="winnerPercentage"
            :time-remaining="timeRemaining"
            @update:rankings="updateRankings"
            @update:scores="updateScores"
            @update:grades="updateGrades"
            @update:reactions="updateReactions"
            @update:quadratic-votes="updateQuadraticVotes"
            @update:token-weights="updateTokenWeights"
            @vote="(item, value) => submitSingleVote(effectiveParentId ?? 0, item, value)"
            @submit-multi-vote="onSubmitMultiVote"
            @select-item="$emit('selectItem', $event)"
          />
          <VoteEmptyState
            v-else
            :no-engine="true"
            :can-manage-vote="canManageVote"
            :is-readonly="isReadonly"
            @configure="showCreateEngineModal = true"
          />
        </template>
      </div>
    </template>

    <!-- Modals -->
    <SupportsDetailModal
      v-if="showSupportsModal"
      :item-id="selectedItemId"
      :inquiry-id="effectiveParentId ?? 0"
      :display-vote="true"
      @close="showSupportsModal = false"
    />

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

    <AddItemToFamily
      v-if="showAddToVoteModal"
      :family-type="'vote'"
      :target-type="props.targetType"
      :inquiry-id="effectiveParentId ?? 0"
      :engine-id="targetEngineId ?? undefined"
      :already-linked-item-ids="votableItemIds"
      @close="showAddToVoteModal = false"
      @success="onItemsAdded"
      @option-family-changed="handleItemFamilyChanged"
    />

    <NcDialog
      v-if="showDeleteConfirm"
      :name="t('agora', 'Delete voting method')"
      :message="deleteConfirmMessage"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    >
      <template #actions>
        <NcButton
          type="primary"
          @click="confirmDelete"
        >
          {{ t('agora', 'Delete') }}
        </NcButton>
        <NcButton
          type="tertiary"
          @click="cancelDelete"
        >
          {{ t('agora', 'Cancel') }}
        </NcButton>
      </template>
    </NcDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, useTemplateRef } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { n, t } from '@nextcloud/l10n'
import { NcLoadingIcon, NcDialog } from '@nextcloud/vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import PlusIcon from 'vue-material-design-icons/Plus.vue'

import type { Item, Option, OptionFamily, Inquiry, SupportEngine } from '../../Types/index'
import { useVoteContext, type TargetType } from '../../composables/useVoteContext'
import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useInquiriesStore } from '../../stores/inquiries'
import { useSupportEngineStore } from '../../stores/supportEngine'
import { useSupportsStore } from '../../stores/supports'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups'
import { useSupportResultStore } from '../../stores/supportResult'

import VoteEmptyState from '../Vote/VoteEmptyState.vue'
import VoteCardsLayout from '../Vote/VoteCardsLayout.vue'
import VoteResultsLayout from '../Vote/VoteResultsLayout.vue'
import EngineSelectorModal from '../Modals/EngineSelectorModal.vue'
import AddItemToFamily from '../Modals/AddItemToFamily.vue'
import SupportsDetailModal from '../Modals/SupportsDetailModal.vue'
import { ENGINE_DEFINITIONS } from '../../Types/votingType'
import { showSuccess } from '@nextcloud/dialogs'
import { getItemsForFamily } from '../../helpers/modules/itemHelpers'

type TabKey = 'draft' | 'active' | 'closed' | 'results'

interface EngineOption {
  id: number
  label: string
}

const props = defineProps<{
  items: Item[]
  parentId: number | null
  targetType: TargetType
  canManageVote: boolean
  isReadonly: boolean
  family?: OptionFamily | null
  familyKey?: string
}>()

const emit = defineEmits<{
  configureEngine: []
  addItem: []
  addToVote: []
  selectItem: [item: Item]
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
const inquiryGroupsStore = useInquiryGroupsStore()
const resultStore = useSupportResultStore()

const familyKey = computed(() => props.familyKey ?? props.family?.family_type ?? '')
const voteItems = computed(() => getItemsForFamily(props.items, familyKey.value))
const targetEngineId = ref<number | null>(null)
const activeTab = ref<TabKey>('active')

const capitalize = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')

// ---------------------------------------------------------------
// Effective parent id — mirrors the engine-scoping rule:
//   targetType = 'option'  → parent is the inquiry id
//   targetType = 'inquiry' → parent is the inquiry group id
// ---------------------------------------------------------------
const effectiveParentId = computed<number | null>(() => {
  if (props.targetType === 'inquiry') {
    return inquiryGroupsStore.currentInquiryGroup?.id ?? null
  }
  return props.parentId
})

// ---------------------------------------------------------------
// All items for this family
// ---------------------------------------------------------------
const allItems = computed<(Option | Inquiry)[]>(() => {
  if (voteItems.value.length) {
    return voteItems.value.map((i) => i.raw as Option | Inquiry)
  }
  return props.targetType === 'option' ? optionsStore.options || [] : inquiriesStore.inquiries || []
})

// ---------------------------------------------------------------
// Vote context — parentId passed reactively, so engines reload
// whenever the group/inquiry id becomes available or changes.
// ---------------------------------------------------------------
const {
  loadingEngines,
  availableEngines,
  currentEngine,
  votableItems,
  hasUserVoted,
  hasSelectionsChanged,
  rankings,
  scores,
  grades,
  reactions,
  quadraticVotes,
  tokenWeights,
  selectedItems,
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
  getMajorityJudgment,
  getWinnerPercentage,
  getUserVoteValueForItem,
  refreshEngines,
  effectiveEngineId,
  selectEngine,
  removeMyVote,
} = useVoteContext(effectiveParentId, props.targetType, undefined, () =>
  (props.items || []).map((it: any) => it.raw ?? it).filter(Boolean)
)
// 🔍 DEBUG — one line, runs once at mount
console.log('🔍 FLV-INIT', {
  parentId: props.parentId,
  targetType: props.targetType,
  itemsCount: props.items.length,
  availableEnginesCount: availableEngines.value.length,
  currentEngineId: currentEngine.value?.id,
  currentEngineType: currentEngine.value?.engine,
  votableItemsCount: votableItems.value.length,
})

const draftEngines = computed(() => availableEngines.value.filter((e) => e.status === 'draft'))
const activeEngines = computed(() => availableEngines.value.filter((e) => e.status === 'active'))
const closedEngines = computed(() => availableEngines.value.filter((e) => e.status === 'closed'))

// Stacked mode: two or more engines whose target_ids are disjoint.
// Guard: phased_voting is excluded (its phases interact), and every item
// shown by any engine must be covered by exactly one engine.
const stackedEngines = computed<SupportEngine[]>(() => {
  const active = availableEngines.value.filter((e) => e.status !== 'draft')
  if (
    active.length < 2 ||
    active.some((e) => e.engine === 'phased_voting' || !e.target_ids?.length)
  ) {
    return []
  }
  const covered = new Set<number>()
  for (const e of active) {
    for (const id of e.target_ids) {
      if (covered.has(id)) return []   // overlap → not stackable
      covered.add(id)
    }
  }
  const shown = availableEngines.value.flatMap((e) => e.target_ids ?? [])
  if (shown.some((id) => !covered.has(id))) return []  // not all items covered
  return [...active].sort((a, b) => a.id - b.id)
})

const isStacked = computed(() => stackedEngines.value.length > 0)

// ── Per-engine progress ─────────────────────────────────────────
const progress = ref<Record<number, [number, number]>>({})
const onProgress = (engineId: number, count: number, total: number) => {
  progress.value[engineId] = [count, total]
}
const progressTotals = computed<[number, number]>(() =>
  stackedEngines.value.reduce(
    ([count, total], e) => [
      count + (progress.value[e.id]?.[0] ?? 0),
      total + (progress.value[e.id]?.[1] ?? 0),
    ],
    [0, 0] as [number, number],
  ),
)

// ── Serialised save queue ───────────────────────────────────────
// Supports API cancels previous in-flight calls of the same name, so writes
// must run one at a time. failedSaves keeps the pending task so Retry
// re-enqueues it without re-firing user input.
let queue: Promise<unknown> = Promise.resolve()
const savesRunning = ref(0)
const failedSaves = ref(new Map<number, () => Promise<boolean>>())

const enqueueSave = (engineId: number, task: () => Promise<boolean>): Promise<boolean> => {
  savesRunning.value += 1
  const run = queue
    .then(task)
    .catch(() => false)
    .then((ok) => {
      savesRunning.value -= 1
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

// ── Flush on leave ──────────────────────────────────────────────
const blocks = useTemplateRef<Array<{ flush: () => Promise<boolean>; settled: boolean }>>('blocks')

const allSaved = computed(
  () =>
    progressTotals.value[1] > 0 &&
    progressTotals.value[0] === progressTotals.value[1] &&
    !savesRunning.value &&
    !failedSaves.value.size &&
    (blocks.value ?? []).every((b) => b.settled),
)

onBeforeRouteLeave(async () => {
  if (!isStacked.value) return
  await Promise.all((blocks.value ?? []).map((b) => b.flush()))
})

const votableFullItems = computed<Item[]>(() => {
  const ids = new Set(votableItems.value.map((v) => v.id))
  const result = voteItems.value.filter((it) => ids.has(it.id))
  if (result.length !== ids.size) {
    console.warn(
      '[FamilyLayoutVote] Engine targets item ids not present in props.items:',
      [...ids].filter((id) => !result.some((r) => r.id === id))
    )
  }
  return result
})

const resultsEngine = computed(() => {
  if (currentEngine.value?.status === 'active') return currentEngine.value
  return activeEngines.value[0] ?? null
})

watch(
  [activeTab, () => activeEngines.value.length, () => resultStore.results.length],
  () => {
    if (activeTab.value !== 'results') return
    const current = currentEngine.value
    if (current && resultStore.getResultsByEngine(current.id).length > 0) return

    const withResults = activeEngines.value.filter(
      (e) => resultStore.getResultsByEngine(e.id).length > 0
    )
    const target = withResults[0] ?? activeEngines.value[0]

    console.log('🔍 RESULTS-SWITCH', {
      activeTab: activeTab.value,
      currentEngineId: current?.id,
      currentEngineType: current?.engine,
      currentEngineHasResults: current ? resultStore.getResultsByEngine(current.id).length : null,
      activeEngines: activeEngines.value.map((e) => ({
        id: e.id,
        engine: e.engine,
        hasResults: resultStore.getResultsByEngine(e.id).length,
      })),
      withResultsIds: withResults.map((e) => e.id),
      chosenTargetId: target?.id,
    })

    if (target && current?.id !== target.id) {
      selectEngine(target.id)
    }
  },
  { immediate: true }
)

// ---------------------------------------------------------------
// Tab navigation
// ---------------------------------------------------------------

const enginesForTab = computed<SupportEngine[]>(() => {
  switch (activeTab.value) {
    case 'draft':
      return draftEngines.value
    case 'active':
      return activeEngines.value
    case 'closed':
      return closedEngines.value
    default:
      return []
  }
})

const hidesResults = (engine?: SupportEngine | null) =>
  engine?.config?.results_visibility === 'closed' &&
  engine?.status !== 'closed' &&
  !props.canManageVote

const resultsHidden = computed(() => hidesResults(currentEngine.value))

const visibleTabs = computed<Array<{ key: TabKey; label: string; count: number }>>(() => {
  const tabs: Array<{ key: TabKey; label: string; count: number }> = []

  if (props.canManageVote || draftEngines.value.length) {
    tabs.push({
      key: 'draft',
      label: t('agora', 'Drafts'),
      count: draftEngines.value.length,
    })
  }
  if (activeEngines.value.length) {
    tabs.push({
      key: 'active',
      label: t('agora', 'Active'),
      count: activeEngines.value.length,
    })
  }
  if (closedEngines.value.length) {
    tabs.push({
      key: 'closed',
      label: t('agora', 'Closed'),
      count: closedEngines.value.length,
    })
  }
  if (activeEngines.value.length > 0 && !resultsHidden.value) {
    tabs.push({ key: 'results', label: t('agora', 'Results'), count: 0 })
  }
  return tabs
})

// Remember the last engine picked per status, so tab hopping restores it.
const lastSelectedByStatus = ref<Record<'draft' | 'active' | 'closed', number | null>>({
  draft: null,
  active: null,
  closed: null,
})

watch(currentEngine, (engine) => {
  if (
    engine &&
    (engine.status === 'draft' || engine.status === 'active' || engine.status === 'closed')
  ) {
    lastSelectedByStatus.value = {
      ...lastSelectedByStatus.value,
      [engine.status]: engine.id,
    }
  }
})

/**
 * Keep `currentEngine` in sync with the tab status.
 * - pick the remembered engine for that status if still present
 * - otherwise fall back to the first one in the tab
 */
watch(
  [activeTab, enginesForTab],
  () => {
    if (activeTab.value === 'results') return
    const engines = enginesForTab.value
    if (!engines.length) return
    if (currentEngine.value?.status === activeTab.value) return

    const remembered = lastSelectedByStatus.value[activeTab.value as 'draft' | 'active' | 'closed']
    const target = (remembered && engines.find((e) => e.id === remembered)) || engines[0]
    selectEngine(target.id)
  },
  { immediate: true }
)

// If the current tab disappears (engine deleted / no longer hidden), fall back.
watch(visibleTabs, (tabs) => {
  if (!tabs.some((tab) => tab.key === activeTab.value)) {
    const preferred =
      tabs.find((tab) => tab.key === 'active') ??
      tabs.find((tab) => tab.key === 'draft') ??
      tabs.find((tab) => tab.key === 'closed') ??
      tabs[0]
    if (preferred) activeTab.value = preferred.key
  }
})

// If results become hidden while on the results tab, bounce back.
watch(resultsHidden, (hidden) => {
  if (hidden && activeTab.value === 'results') {
    const preferred =
      visibleTabs.value.find((tab) => tab.key === 'active') ??
      visibleTabs.value.find((tab) => tab.key === 'closed') ??
      visibleTabs.value[0]
    if (preferred) activeTab.value = preferred.key
  }
})

// ---------------------------------------------------------------
// Engine picker (per status)
// ---------------------------------------------------------------
const enginePickerOptions = computed<EngineOption[]>(() =>
  enginesForTab.value.map((e) => ({
    id: e.id,
    label: e.title || t('agora', 'Untitled engine'),
  }))
)

const enginePickerValue = computed<number | null>({
  get: () => {
    const id = currentEngine.value?.id ?? null
    if (id !== null && enginesForTab.value.some((e) => e.id === id)) return id
    return enginesForTab.value[0]?.id ?? null
  },
  set: (id) => {
    if (id !== null) selectEngine(id)
  },
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
const voteSession = ref<{
  start_date: string | null
  end_date: string | null
  quorum: number | null
}>({
  start_date: null,
  end_date: null,
  quorum: null,
})

// ---------------------------------------------------------------
// Derived results data
// ---------------------------------------------------------------
const winner = computed(() => getWinner(votableItems.value))
const winnerPercentage = computed(() => getWinnerPercentage(votableItems.value))
const rankedItems = computed(() => getRankedItems(votableItems.value))
const votableItemIds = computed(() => votableItems.value.map((item) => item.id))

// ---------------------------------------------------------------
// Engine helpers
// ---------------------------------------------------------------

const engineHasVotes = (engineId: number): boolean => {
  const supports = supportsStore.getSupportsByParent(effectiveParentId.value, props.targetType)
  return supports?.some((s) => s.supportEngineId === engineId) ?? false
}

const availableEnginesSelector = computed(() => {
  const UNSUPPORTED_INPUTS = new Set(['none', 'approval_delib'])
  const engines = Object.entries(ENGINE_DEFINITIONS)
    .filter(([id]) => !UNSUPPORTED_INPUTS.has(id))
    .map(([id, engine]) => ({
      id,
      label: engine.label,
      voteScope: engine.voteScope,
      inputModel: engine.inputModel,
      description: engine.description,
      constraints: engine.constraints,
      recommendedViews: engine.recommendedViews,
    }))

  const count = voteItems.value.length
  if (!count) return engines

  return engines.filter((engine) => {
    const c = engine.constraints
    if (c?.min_options && count < c.min_options) return false
    if (c?.max_options && count > c.max_options) return false
    return true
  })
})

// ---------------------------------------------------------------
// Actions
// ---------------------------------------------------------------
const onAddToVote = (engine: SupportEngine) => {
  selectEngine(engine.id)
  targetEngineId.value = engine.id
  showAddToVoteModal.value = true
}

function openSupportsModal(itemId: number) {
  if (resultsHidden.value) return
  selectedItemId.value = itemId
  showSupportsModal.value = true
}

const onSubmitMultiVote = async () => {
  const success = await submitMultiVote()
  if (success) {
    showSuccess(t('agora', 'Your vote has been recorded.'))
  }
}

// ---------------------------------------------------------------
// Ballot state passthrough
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
    { title: engineToDelete.value.title || t('agora', 'Untitled') }
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
      inquiry_id: effectiveParentId.value ?? 0,
      inquiry_group_id: props.targetType === 'inquiry' ? (effectiveParentId.value ?? 0) : 0,
      title: data.title,
      description: data.description,
      engine: data.engine,
      purpose: data.purpose,
      config: data.config,
      status: data.status || 'draft',
      target_type: props.targetType,
      target_ids: [],
    })
    await refreshEngines()
    // Bring the user to the drafts tab so they see their new engine.
    if (draftEngines.value.length) activeTab.value = 'draft'
  } else if (engineToEdit.value) {
    await engineStore.updateEngine(engineToEdit.value.id, {
      title: data.title,
      description: data.description,
      engine: data.engine,
      purpose: data.purpose,
      config: data.config,
      status: data.status,
    })
    await refreshEngines()
  }

  closeEngineModal()
}

const closeEngineModal = () => {
  showCreateEngineModal.value = false
  engineToEdit.value = null
  engineModalMode.value = 'create'
}

// ---------------------------------------------------------------
// Item added / family changed
// ---------------------------------------------------------------
const onItemsAdded = () => {
  showAddToVoteModal.value = false
}

const handleItemFamilyChanged = async (payload: {
  optionId: number
  familyKey: string
  action: string
}) => {
  emit('itemFamilyChanged', {
    itemId: payload.optionId,
    familyKey: payload.familyKey,
    action: payload.action,
  })

  if (payload.familyKey !== 'vote' || payload.action !== 'added') return

  const activeEngine = currentEngine.value
  if (!activeEngine) return
  if (activeEngine.target_ids.includes(payload.optionId)) return

  await engineStore.updateEngine(activeEngine.id, {
    target_ids: [...activeEngine.target_ids, payload.optionId],
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

// 🔍 DEBUG — results tab
watch(
  [
    activeTab,
    currentEngine,
    resultsEngine,
    votableItems,
    votableFullItems,
    () => optionsStore.options.length,
    () => props.items.length,
  ],
  () => {
    if (activeTab.value !== 'results') return
    console.log('🔍 RESULTS-TAB', {
      currentEngine: {
        id: currentEngine.value?.id,
        type: currentEngine.value?.engine,
        status: currentEngine.value?.status,
        targets: currentEngine.value?.target_ids,
      },
      resultsEngine: {
        id: resultsEngine.value?.id,
        type: resultsEngine.value?.engine,
        status: resultsEngine.value?.status,
        targets: resultsEngine.value?.target_ids,
      },
      activeEngineIds: activeEngines.value.map((e) => ({
        id: e.id,
        type: e.engine,
        targets: e.target_ids,
      })),
      votableItemsCount: votableItems.value.length,
      votableFullItemsCount: votableFullItems.value.length,
      optionsStoreCount: optionsStore.options.length,
      propsItemsCount: props.items.length,
      rankedItemsCount: rankedItems.value.length,
      totalVotes: totalVotes.value,
    })
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.family-layout-vote {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    gap: 16px;
    color: var(--color-text-lighter);
  }

  /* ---------------------------------------------------------
	   Tab bar
		   --------------------------------------------------------- */
  .vote-header-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .vote-tabs {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-large);
  }

  .vote-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: var(--border-radius);
    color: var(--color-text-lighter);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-main-text);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary-element);
      outline-offset: 2px;
    }

    &--active {
      background: var(--color-main-background);
      color: var(--color-main-text);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    &__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-border-dark);
      flex: 0 0 auto;
    }

    &--draft &__dot {
      background: var(--color-warning);
    }
    &--active &__dot {
      background: var(--color-success);
    }
    &--closed &__dot {
      background: var(--color-text-maxcontrast);
    }
    &--results &__dot {
      background: var(--color-primary-element);
    }

    &__label {
      line-height: 1;
    }

    &__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: 10px;
      background: var(--color-primary-element-light, var(--color-background-darker));
      color: var(--color-main-text);
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1;
    }

    &--active &__count {
      background: var(--color-primary-element);
      color: var(--color-primary-element-text);
    }
  }

  /* ---------------------------------------------------------
	   Panel content
		   --------------------------------------------------------- */
  .vote-panel {
    min-height: 200px;
    animation: fadeIn 0.2s ease;
  }

  .engine-picker {
    margin-bottom: 12px;
    max-width: 360px;
  }

  .engine-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: capitalize;
    background: var(--color-background-dark);
    color: var(--color-text-lighter);

    &--type {
      background: rgba(var(--color-primary-element-rgb), 0.12);
      color: var(--color-primary-element);
    }
    &--draft {
      background: rgba(241, 196, 15, 0.15);
      color: rgb(241, 196, 15);
    }
    &--active {
      background: rgba(46, 204, 113, 0.15);
      color: rgb(46, 204, 113);
    }
    &--closed {
      background: rgba(231, 76, 60, 0.15);
      color: rgb(231, 76, 60);
    }
  }
  .engine-strip__config {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.82rem;
    color: var(--color-text-lighter);
  }

  .engine-strip {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 18px;
    margin-bottom: 12px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-large);

    &__main {
      flex: 1 1 320px;
      min-width: 0;
    }

    &__title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }

    &__title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-main-text);
    }

    &__votes {
      display: inline-flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 0.75rem;
      background: var(--color-background-dark);
      color: var(--color-text-lighter);
    }

    &__description {
      margin: 6px 0 0;
      color: var(--color-text-lighter);
      font-size: 0.9rem;
      line-height: 1.45;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
