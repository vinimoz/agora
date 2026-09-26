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
          :can-manage-vote="inquiryStore.permissions.edit"
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
          :inquiry-id="inquiryId"
          :engine-id="engine.id"
          :layout="currentLayout"
          :time-remaining="timeRemaining"
          :enqueue-save="enqueueSave"
          :hide-results="resultsHidden"
          @open-supports-modal="openSupportsModal"
          @select-option="$emit('selectOption', $event)"
          @progress="onProgress"
        />
      </section>
      <div v-if="currentLayout === 'cards'" class="vote-progress-bar">
        <span id="vote-progress-label">
          {{
            n(
              'agora',
              '{answered} answer out of {total}',
              '{answered} answers out of {total}',
              progressTotals[0],
              { answered: progressTotals[0], total: progressTotals[1] }
            )
          }}
        </span>
        <progress
          :value="progressTotals[0]"
          :max="progressTotals[1] || 1"
          aria-labelledby="vote-progress-label"
        />
        <span v-if="savesRunning">{{ t('agora', 'Saving …') }}</span>
        <span v-else-if="savedOnce && !failedSaves.size && !allSaved">{{
          t('agora', 'Saved')
        }}</span>
        <span aria-live="polite">
          <template v-if="!savesRunning && failedSaves.size">{{
            t('agora', 'Not saved')
          }}</template>
          <template v-else-if="allSaved">{{ t('agora', 'All your answers are saved') }}</template>
        </span>
        <NcButton v-if="!savesRunning && failedSaves.size" variant="tertiary" @click="retrySaves">
          {{ t('agora', 'Retry') }}
        </NcButton>
      </div>
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
        :hide-results="resultsHidden"
        @update:layout="currentLayout = $event"
        @update:engine="handleEngineUpdate"
        @create-engine="showCreateEngineModal = true"
        @edit-engine="handleEditEngine"
        @delete-engine="handleDeleteEngine"
        @add-to-vote="onAddToVote"
      />

      <!-- Empty state when no options are linked -->
      <VoteEmptyState
        v-if="!currentEngine.target_ids || currentEngine.target_ids.length === 0"
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

      <VoteEngineBlock
        v-else
        :key="currentEngine.id"
        :inquiry-id="inquiryId"
        :engine-id="currentEngine.id"
        :layout="currentLayout"
        :time-remaining="timeRemaining"
       :hide-results="resultsHidden" 
        @open-supports-modal="openSupportsModal"
        @select-option="$emit('selectOption', $event)"
      />
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
import type { Option, SupportEngine } from '../../Types/index'
import { useVoteContext } from '../../../composables/useVoteContext'
import { useInquiryStore } from '../../../stores/inquiry'
import { useOptionsStore } from '../../../stores/options'
import { useSupportEngineStore } from '../../../stores/supportEngine'
import { useSupportsStore } from '../../../stores/supports'
import VoteHeader from '../Vote/VoteHeader.vue'
import VoteEmptyState from '../Vote/VoteEmptyState.vue'
import VoteEngineBlock from '../Vote/VoteEngineBlock.vue'
import EngineSelectorModal from '../../Modals/EngineSelectorModal.vue'
import AddOptionToFamily from '../../Modals/AddOptionToFamily.vue'
import SupportsDetailModal from '../../Modals/SupportsDetailModal.vue'
import { ENGINE_DEFINITIONS } from '../../../Types/votingType'

const props = defineProps<{
  inquiryId: number
  canManageVote: boolean
  isReadonly: boolean
  canAddOptions: boolean
   optionCount?: number
}>()

const emit = defineEmits<{
  configureEngine: []
  addOption: []
  addToVote: []
  selectOption: [option: Option]
  optionFamilyChanged: [payload: { optionId: number; familyKey: string; action: string }]
}>()

const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const engineStore = useSupportEngineStore()
const allOptions = computed(() => optionsStore.options || [])
const votableOptionIds = computed(() => votableOptions.value.map((opt) => opt.id))
const supportsStore = useSupportsStore()
const showSupportsModal = ref(false)
const selectedOptionId = ref<number | null>(null)

const engineHasVotes = (engineId: number): boolean =>
  supportsStore.supports?.some((s) => s.support_engine_id === engineId) ?? false

const {
  loadingEngines,
  availableEngines,
  currentEngine,
  votableOptions,
  hasActiveEngine,
  totalVotes,
  refreshEngines,
  selectEngine,
} = useVoteContext(props.inquiryId)

// One block per active engine, only when each option belongs to exactly one of them.
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
    [0, 0]
  )
)

// Supports API calls cancel the previous call of the same name, so writes run one at a time.
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
    (blocks.value ?? []).every((b) => b.settled)
)
onBeforeRouteLeave(async () => {
  await Promise.all((blocks.value ?? []).map((b) => b.flush()))
})

// Local UI state
const currentLayout = ref<'cards' | 'results'>('cards')
const resultsHidden = computed(
  () =>
    currentEngine.value?.config?.results_visibility === 'closed' &&
    currentEngine.value?.status !== 'closed' &&
    !inquiryStore.permissions.edit
)
const allowedLayouts = computed(() => (resultsHidden.value ? ['cards'] : ['cards', 'results']))
watch(resultsHidden, (hidden) => {
  if (hidden) {
    currentLayout.value = 'cards'
  }
})
const showCreateEngineModal = ref(false)
const showAddToVoteModal = ref(false)
const showDeleteConfirm = ref(false)
const engineModalMode = ref<'create' | 'edit'>('create')
const engineToEdit = ref<SupportEngine | null>(null)
const engineToDelete = ref<SupportEngine | null>(null)
const voteSession = ref({ start_date: null, end_date: null, quorum: null })
const currentEngineHasVotes = ref(false)

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
      recommendedViews: engine.recommendedViews,
    }))

  if (!props.optionCount) return engines

  return engines.filter((engine) => {
    const constraints = engine.constraints
    if (constraints?.min_options && props.optionCount! < constraints.min_options) return false
    if (constraints?.max_options && props.optionCount! > constraints.max_options) return false
    return true
  })
})

const deleteConfirmMessage = computed(() => {
  if (!engineToDelete.value) return ''
  return t(
    'agora',
    'Are you sure you want to delete the voting method "{title}"? This action cannot be undone.',
    {
      title: engineToDelete.value.title || t('agora', 'Untitled'),
    }
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
      target_ids: [],
    })
  } else if (engineToEdit.value) {
    // Update existing engine
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

function openSupportsModal(optionId: number) {
  if (resultsHidden.value) {
    return
  }
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
  const hours = Math.floor((diff % 86400000) / 3600000)
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
