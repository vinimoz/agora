<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcModal
    size="large"
    :name="modalTitle"
    @close="$emit('close')"
  >
    <div class="engine-selector-modal">
      <div class="modal-header">
        <div class="header-icon">
          <Vote :size="40" />
        </div>
        <h3>{{ modalTitle }}</h3>
        <p class="modal-description">
          {{ t('agora', 'Different voting methods offer different ways to express preferences. Choose the one that best fits your decision-making process.') }}
        </p>
      </div>

      <!-- Basic Info Fields - Only for create/edit mode, not for deliberative -->
      <div v-if="mode !== 'deliberative'" class="engine-basic-info">
        <div class="field">
          <label>{{ t('agora', 'Title') }} <span class="required">*</span></label>
          <NcTextField
            v-model="localTitle"
            :label="t('agora', 'Title')"

            :placeholder="t('agora', 'e.g., Final Vote 2025, Community Decision')"
            :error="!!titleError"
          />
          <p v-if="titleError" class="field-error">{{ titleError }}</p>
        </div>
        <div class="field">
          <label>{{ t('agora', 'Description (optional)') }}</label>
          <textarea
            v-model="localDescription"
            :label="t('agora', 'Description')"

            :placeholder="t('agora', 'Describe the voting method or purpose')"
            rows="2"
            class="textarea-input"
          />
        </div>
        <div class="field">
          <label>{{ t('agora', 'Purpose') }} <span class="required">*</span></label>
          <NcSelect
            v-model="selectedPurpose"
            :options="purposeOptions"
            :placeholder="t('agora', 'Select the purpose of this voting method')"
            :reduce="option => option.value"
            label="label"
            :label-outside="true"
            class="purpose-select"
          />
        </div>
      </div>

      <!-- Engine Grid with custom scrollbar -->
      <div class="engine-grid-wrapper">
        <div class="engine-grid">
          <div
            v-for="engine in availableEngines"
            :key="engine.id"
            class="engine-card"
            :class="{
              selected: selectedEngine === engine.id,
              [engine.scope]: true
            }"
            @click="selectEngine(engine.id)"
          >
            <div class="engine-card-header">
                <div class="engine-icon">
                    <component :is="getEngineIcon(engine.id)" :size="28" />
                </div>
              <div class="engine-badge" :class="engine.voteScope">
                  {{ getScopeLabel(engine.voteScope) }}
              </div>
            </div>

            <div class="engine-card-content">
                <h4>{{ engine.label }}</h4>
                <p>{{ engine.description || getEngineDescription(engine.id) }}</p>
                <div v-if="engine.constraints && (engine.constraints.min_options || engine.constraints.max_options)" class="engine-constraints">
                    <span v-if="engine.constraints.min_options" class="constraint-badge">
                        {{ t('agora', 'Min {n}', { n: engine.constraints.min_options }) }}
                    </span>
                    <span v-if="engine.constraints.max_options" class="constraint-badge">
                        {{ t('agora', 'Max {n}', { n: engine.constraints.max_options }) }}
                    </span>
                </div>
            </div>

            <div v-if="selectedEngine === engine.id" class="engine-check">
                <CheckCircle :size="20" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      <!-- Subtype selection for Condorcet methods -->
      <div v-if="selectedEngine === 'condorcet'" class="subtype-selection-section">
          <div class="subtype-header">
              <Brain :size="18" />
              <h5>{{ t('agora', 'Select Condorcet method') }}</h5>
          </div>
          <NcSelect
                  v-model="selectedVariant"
                  :options="condorcetVariants"
                  :placeholder="t('agora', 'Choose a Condorcet variant …')"
                  :reduce="option => option.id"
                  label="label"
                  :label-outside="true"
                  :aria-label="t('agora', 'Select specific Condorcet method variant')"
                  class="subtype-select"
                  >
                  <template #option="option">
                      <div class="variant-option">
                          <component :is="getVariantIcon(option.id)" :size="16" class="variant-icon" />
                          <div class="variant-content">
                              <div class="variant-label">{{ option.label }}</div>
                              <div class="variant-description">{{ option.description }}</div>
                          </div>
                      </div>
                  </template>
          </NcSelect>
      </div>

      <!-- Grade configuration for Majority Judgment -->
      <div v-if="selectedEngine === 'majority_judgment'" class="grade-config-section">
          <div class="config-header">
              <Gauge :size="18" />
              <h5>{{ t('agora', 'Configure grades') }}</h5>
          </div>

          <div class="grades-list">
              <div v-for="(grade, index) in (tempConfig.grades || defaultGrades)" :key="index" class="grade-item">
                  <NcTextField
                          v-model="tempConfig.grades[index]"
                          label-outside
                          :placeholder="t('agora', 'Grade {n}', { n: index + 1 })"
                          class="grade-input"
                          />
                  <NcButton
                          v-if="(tempConfig.grades || defaultGrades).length > 2"
                          class="grade-remove"
                          :aria-label="t('agora', 'Remove grade')"
                          @click="removeGrade(index)"
                          >
                          <Minus :size="14" />
                  </NcButton>
              </div>
          </div>

          <NcButton class="grade-add" @click="addGrade">
          <Plus :size="16" />
          {{ t('agora', 'Add grade') }}
          </NcButton>
      </div>

      <!-- Reactions configuration -->
      <div v-if="selectedEngine === 'reaction'" class="reactions-config-section">
          <div class="config-header">
              <Heart :size="18" />
              <h5>{{ t('agora', 'Select reactions') }}</h5>
          </div>

          <div class="reactions-grid">
              <div
                      v-for="reaction in reactionOptions"
                      :key="reaction.value"
                      class="reaction-item"
                      :class="{ selected: isReactionSelected(reaction.value) }"
                      @click="toggleReaction(reaction.value)"
                      >
                      <div class="reaction-emoji">{{ reaction.emoji }}</div>
                      <div class="reaction-label">{{ reaction.label }}</div>
                      <div v-if="isReactionSelected(reaction.value)" class="reaction-check">
                          <CheckCircle :size="16" fill="currentColor" />
                      </div>
              </div>
          </div>

          <div class="reaction-limit">
              <label>{{ t('agora', 'Max reactions per user') }}</label>
	         <NcTextField
        id="max-reactions-input"
        v-model.number="tempConfig.max_per_user"
        type="number"
        class="limit-input"
        label-outside
        :label="t('agora', 'Max reactions per user')"
    />
          </div>
      </div>

      <!-- Config Settings Button -->
      <div v-if="selectedEngine && currentConfigSchema && Object.keys(currentConfigSchema).length > 0 && !isSpecialEngine" class="engine-config-section">
          <NcButton class="config-settings-trigger" @click="showConfigDialog = true">
          <Settings :size="20" />
          <span>{{ t('agora', 'Configure Settings') }}</span>
          <span class="config-count-badge">{{ Object.keys(currentConfigSchema).length }}</span>
          </NcButton>
      </div>

      <div v-else-if="selectedEngine && !isSpecialEngine && (!currentConfigSchema || Object.keys(currentConfigSchema).length === 0)" class="engine-info-section">
          <div class="info-message">
              <Info :size="18" />
              <span>{{ t('agora', 'This voting method requires no additional configuration.') }}</span>
          </div>
      </div>

      <!-- Status for edit mode -->
      <div v-if="mode === 'edit' && existingEngine" class="engine-status-section">
          <div class="status-header">
              <Info :size="18" />
              <h5>{{ t('agora', 'Status') }}</h5>
          </div>
          <NcRadioGroup
                  v-model="tempStatus"
                  :label="t('agora', 'Voting method status')"
                  :hide-label="true"
                  >
                  <NcCheckboxRadioSwitch
                          type="radio"
                          value="active"
                          :disabled="hasVotes"
                          >
                          {{ t('agora', 'Active') }}
                          <span v-if="hasVotes" class="status-hint">{{ t('agora', '(Cannot change - votes exist)') }}</span>
                  </NcCheckboxRadioSwitch>
          <NcCheckboxRadioSwitch
                  type="radio"
                  value="closed"
                  >
                  {{ t('agora', 'Closed') }}
          </NcCheckboxRadioSwitch>
          <NcCheckboxRadioSwitch
                  type="radio"
                  value="draft"
                  >
                  {{ t('agora', 'Draft') }}
          </NcCheckboxRadioSwitch>
          </NcRadioGroup>
      </div>

      <div class="modal-footer">
          <NcButton class="btn-secondary" @click="$emit('close')">
          {{ t('agora', 'Cancel') }}
          </NcButton>
          <NcButton
                  class="btn-primary"
                  :disabled="isSaveDisabled"
                  @click="save"
                  >
                  <Vote :size="16" />
                  {{ mode === 'create' ? t('agora', 'Create Voting Method') : t('agora', 'Update Voting Method') }}
          </NcButton>
      </div>
    </div>

    <!-- Settings Dialog -->
    <NcDialog
            v-if="showConfigDialog"
            :name="t('agora', 'Configure {engine} Settings', { engine: getEngineLabel(selectedEngine) })"
            :close-on-click-outside="true"
            size="normal"
            @close="showConfigDialog = false"
            >
            <div class="settings-dialog-content">
                <div class="settings-header">
                    <div class="settings-icon">
                        <Settings :size="32" />
                    </div>
    <h4>{{ t('agora', 'Configuration Settings') }}</h4>
    <p>{{ t('agora', 'Adjust the settings for this voting method') }}</p>
                </div>

                <div class="settings-fields">
                    <div v-for="(schema, key) in currentConfigSchema" :key="key" class="settings-field">
                        <label :for="`config-${key}`" class="settings-field-label">
                            {{ schema.label || key }}
                            <span v-if="schema.type === 'number' && schema.min !== undefined && schema.max !== undefined" class="field-hint">
                                ({{ schema.min }}-{{ schema.max }})
                            </span>
                        </label>

                        <div class="settings-field-input">
                            <!-- Number input with slider -->
                            <div v-if="schema.type === 'number'" class="number-config">
                                <div v-if="schema.nullable || key === 'max_choices'" class="null-number-control">
                                    <NcCheckboxRadioSwitch
                                            type="checkbox"
                                            :checked="tempConfig[key] === null"
                                            @update:model-value="(checked) => setUnlimited(key, checked)"
                                            >
                                            {{ t('agora', 'Unlimited') }}
                                    </NcCheckboxRadioSwitch>
                                </div>

                                <div v-if="tempConfig[key] !== null || !(schema.nullable || key === 'max_choices')" class="slider-control">
                                    <input
                                            :id="`config-${key}`"
                                            v-model.number="tempConfig[key]"
                                            type="range"
                                            :min="schema.min ?? 0"
                                            :max="schema.max ?? 100"
                                            :step="schema.step ?? 1"
                                            class="settings-range-input"
                                            :style="{ '--range-progress': getRangeProgress(tempConfig[key], schema.min ?? 0, schema.max ?? 100) + '%' }"
                                            />
                                    <div class="slider-value">
                                        <span class="value-number">{{ tempConfig[key] ?? schema.default ?? 0 }}</span>
                                        <NcProgressBar
                                                :value="getRangeProgress(tempConfig[key], schema.min ?? 0, schema.max ?? 100)"
                                                :show-value="true"
                                                size="small"
                                                />
                                    </div>
                                </div>
                                <span v-else-if="tempConfig[key] === null" class="null-indicator">
                                    {{ t('agora', 'Unlimited (no restriction)') }}
                                </span>
                            </div>

                            <!-- Text input -->
                            <NcTextField
                                    v-else-if="schema.type === 'string' && !schema.options"
                                    :id="`config-${key}`"
                                    v-model="tempConfig[key]"
                                    :placeholder="schema.placeholder || ''"
                                    class="settings-text-input"
                                    />

                            <!-- Boolean toggle -->
                            <div v-else-if="schema.type === 'boolean'" class="boolean-config">
                                <NcCheckboxRadioSwitch
                                        v-model="tempConfig[key]"
                                        type="switch"
                                        class="settings-switch"
                                        >
                                        {{ tempConfig[key] ? t('agora', 'Enabled') : t('agora', 'Disabled') }}
                                </NcCheckboxRadioSwitch>
                            </div>

                            <!-- Select dropdown -->
                            <NcSelect
                                    v-else-if="schema.options"
                                    :id="`config-${key}`"
                                    v-model="tempConfig[key]"
                                    :options="getSelectOptions(schema)"
                                    :placeholder="t('agora', 'Select an option')"
                                    :clearable="false"
                                    :label-outside="true"
                                    class="settings-select"
                                    />
                        </div>

                        <p v-if="schema.description" class="settings-field-description">
                        {{ schema.description }}
                        </p>
                    </div>
                </div>
            </div>

            <template #actions>
                <NcButton @click="showConfigDialog = false">
                {{ t('agora', 'Close') }}
                </NcButton>
            </template>
    </NcDialog>
  </NcModal>
</template>

<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcRadioGroup from '@nextcloud/vue/components/NcRadioGroup'
import NcProgressBar from '@nextcloud/vue/components/NcProgressBar'
import {
  Vote,
  CheckCircle,
  Settings,
  Info,
  ThumbsUp,
  Scale,
  Heart,
  Star,
  TrendingUp,
  Award,
  Brain,
  Gauge,
  Users,
  BarChart3,
  ListChecks,
  Plus,
  Minus,
} from 'lucide-vue-next'

import { 
  ENGINE_DEFINITIONS, 
  initializeEngineConfig,
  type ConfigSchemaField 
} from '../../Types/votingType'
import type { SupportEngine } from '../../Types/index'

const props = defineProps<{
  mode: 'deliberative' | 'create' | 'edit'
  existingEngine?: SupportEngine | null
  hasVotes?: boolean
  availableEngines: ENGINE_DEFINITIONS
}>()

const emit = defineEmits<{
  close: []
  save: [data: {
    title?: string
    description?: string
    engine: string
    purpose?: string
    config: Record<string, unknown>
    status?: 'draft' | 'active' | 'closed'
  }]
}>()

const localTitle = ref(props.existingEngine?.title || '')
const localDescription = ref(props.existingEngine?.description || '')
const selectedEngine = ref(props.existingEngine?.engine || 'binary')
const selectedVariant = ref('schulze')
const tempConfig = ref<Record<string, unknown>>(props.existingEngine?.config || {})
const tempStatus = ref<'draft' | 'active' | 'closed'>(props.existingEngine?.status || 'active')
const showConfigDialog = ref(false)

const titleError = computed(() => {
  // Only validate title in create/edit mode, not in deliberative mode
  if (props.mode !== 'deliberative' && !localTitle.value.trim()) {
    return t('agora', 'Title is required')
  }
  return null
})

const isSaveDisabled = computed(() => {
  // In deliberative mode, only need selected engine
  if (props.mode === 'deliberative') {
    return !selectedEngine.value
  }
  // In create/edit mode, need title and selected engine
  return !selectedEngine.value || !localTitle.value.trim()
})

const modalTitle = computed(() => {
  if (props.mode === 'deliberative') return t('agora', 'Select Support Method')
  if (props.mode === 'create') return t('agora', 'Configure Voting Method')
  return t('agora', 'Edit Voting Method')
})

const selectedPurpose = ref(props.existingEngine?.purpose || 'vote')

const purposeOptions = [
  { value: 'vote', label: t('agora', 'Vote'), description: t('agora', 'General voting on options') },
  { value: 'deliberation', label: t('agora', 'Deliberation'), description: t('agora', 'Deliberative process with voting') },
  { value: 'election', label: t('agora', 'Election'), description: t('agora', 'Elect candidates to positions') },
  { value: 'consultation', label: t('agora', 'Consultation'), description: t('agora', 'Public consultation on matters') },
  { value: 'moderation', label: t('agora', 'Moderation'), description: t('agora', 'Content moderation decisions') },
  { value: 'prioritization', label: t('agora', 'Prioritization'), description: t('agora', 'Prioritize items or tasks') },
  { value: 'referendum', label: t('agora', 'Referendum'), description: t('agora', 'Referendum on specific issues') },
]

// Default grades for majority judgment
const defaultGrades = ['Reject', 'Insufficient', 'Passable', 'Fairly Good', 'Good', 'Very Good', 'Excellent']

// Condorcet variants
const condorcetVariants = [
  { id: 'schulze', label: 'Schulze Method', description: 'Also known as Beatpath method, considered one of the most robust Condorcet methods' },
  { id: 'copeland', label: 'Copeland Method', description: 'Simple method based on win-loss record against other candidates' },
  { id: 'minimax', label: 'Minimax', description: 'Also known as Simpson-Kramer method, minimizes the largest opposition' },
  { id: 'ranked_pairs', label: 'Ranked Pairs', description: 'Tideman method that builds a ranking from strongest to weakest majorities' },
  { id: 'kemeny_young', label: 'Kemeny-Young', description: 'Finds the most likely ranking based on voters preferences' },
]

// Reaction options
const reactionOptions = [
  { value: '👍', label: 'Thumbs Up', emoji: '👍' },
  { value: '❤️', label: 'Heart', emoji: '❤️' },
  { value: '😊', label: 'Smile', emoji: '😊' },
  { value: '🎉', label: 'Celebrate', emoji: '🎉' },
  { value: '🤔', label: 'Thinking', emoji: '🤔' },
  { value: '👎', label: 'Thumbs Down', emoji: '👎' },
  { value: '😢', label: 'Sad', emoji: '😢' },
  { value: '😡', label: 'Angry', emoji: '😡' },
]


const currentConfigSchema = computed(() => {
  if (!selectedEngine.value) return null
  const engine = ENGINE_DEFINITIONS[selectedEngine.value]
  return engine?.config_schema || null
})

const isSpecialEngine = computed(() => 
  selectedEngine.value === 'condorcet' || 
  selectedEngine.value === 'majority_judgment' || 
  selectedEngine.value === 'reaction'
)

// Initialize config for special engines
watch(selectedEngine, (newEngine) => {
  if (newEngine === 'majority_judgment' && !tempConfig.value.grades) {
    tempConfig.value.grades = [...defaultGrades]
  }
  if (newEngine === 'reaction' && !tempConfig.value.allowed_reactions) {
    tempConfig.value.allowed_reactions = ['👍', '❤️', '🎉', '🤔', '👎']
    if (!tempConfig.value.max_per_user) tempConfig.value.max_per_user = 3
  }
  if (newEngine === 'condorcet' && !tempConfig.value.variant) {
    tempConfig.value.variant = selectedVariant.value
  }
}, { immediate: true })

const getRangeProgress = (value: unknown, min: number, max: number): number => {
  const numValue = typeof value === 'number' ? value : (min + (max - min) / 2)
  return ((numValue - min) / (max - min)) * 100
}

const getVariantIcon = (variantId: string) => {
  const icons: Record<string, unknown> = {
    schulze: Brain,
    copeland: BarChart3,
    minimax: TrendingUp,
    ranked_pairs: ListChecks,
    kemeny_young: Award
  }
  return icons[variantId] || Brain
}

const getEngineLabel = (engineId: string): string => ENGINE_DEFINITIONS[engineId]?.label || engineId

const isReactionSelected = (value: string): boolean => {
  const reactions = tempConfig.value.allowed_reactions as string[] || []
  return reactions.includes(value)
}

const toggleReaction = (value: string) => {
  const reactions = tempConfig.value.allowed_reactions as string[] || []
  if (reactions.includes(value)) {
    tempConfig.value.allowed_reactions = reactions.filter(r => r !== value)
  } else {
    tempConfig.value.allowed_reactions = [...reactions, value]
  }
}

const addGrade = () => {
  const grades = tempConfig.value.grades as string[] || defaultGrades
  tempConfig.value.grades = [...grades, '']
}

const removeGrade = (index: number) => {
  const grades = tempConfig.value.grades as string[] || defaultGrades
  if (grades.length > 2) {
    tempConfig.value.grades = grades.filter((_, i) => i !== index)
  }
}

const getSelectOptions = (schema: ConfigSchemaField) => {
  if (!schema.options) return []

  const options = Array.isArray(schema.options) 
    ? schema.options 
    : Object.values(schema.options)

  return options.map((opt: string) => ({
    value: opt,
    label: opt.charAt(0).toUpperCase() + opt.slice(1).replace(/_/g, ' ')
  }))
}

const setUnlimited = (key: string, checked: boolean) => {
  if (checked) {
    tempConfig.value[key] = null
  } else {
    const schema = currentConfigSchema.value?.[key]
    tempConfig.value[key] = schema?.default ?? 1
  }
}

const getEngineIcon = (engineId: string) => {
  const icons: Record<string, unknown> = {
    binary: ThumbsUp,
    ternary: Scale,
    reaction: Heart,
    star: Star,
    score: Star,
    approval: CheckCircle,
    ranking: TrendingUp,
    borda: Award,
    condorcet: Brain,
    majority_judgment: Gauge,
    token_weighted: Users,
    quadratic: TrendingUp,
    trending: TrendingUp,
  }
  return icons[engineId] || Vote
}

const getEngineDescription = (engineId: string): string => 
  ENGINE_DEFINITIONS[engineId]?.description || t('agora', 'Vote using this method')

const getScopeLabel = (scope: string): string => {
  const labels: Record<string, string> = {
    per_option: t('agora', 'Per option'),
    cross_option: t('agora', 'Cross option'),
    flex: t('agora', 'Flexible'),
    none: t('agora', 'No voting')
  }
  return labels[scope] || scope
}

const selectEngine = (engineId: string): void => {
  selectedEngine.value = engineId

  // Initialize config for newly selected engine
  const engine = ENGINE_DEFINITIONS[engineId]
  if (engine?.config_schema) {
    const newConfig = initializeEngineConfig(engineId)
    tempConfig.value = { ...newConfig }
  } else {
    tempConfig.value = {}
  }

  // Special initialization
  if (engineId === 'majority_judgment') {
    tempConfig.value.grades = [...defaultGrades]
  } else if (engineId === 'reaction') {
    tempConfig.value.allowed_reactions = ['👍', '❤️', '🎉', '🤔', '👎']
    tempConfig.value.max_per_user = 3
  } else if (engineId === 'condorcet') {
    tempConfig.value.variant = selectedVariant.value
  }
}


const save = (): void => {
    if (isSaveDisabled.value) return

    const config = { ...tempConfig.value }

    // Add variant for condorcet
    if (selectedEngine.value === 'condorcet') {
        config.variant = selectedVariant.value
    }

    // Clean up empty grades
    if (selectedEngine.value === 'majority_judgment' && config.grades) {
        config.grades = (config.grades as string[]).filter(g => g.trim() !== '')
    }

    // VALIDATION: Ensure min < max for score/star
    if (selectedEngine.value === 'score' || selectedEngine.value === 'star') {
        const min = config.min as number
        const max = config.max as number
        if (min !== undefined && max !== undefined && min >= max) {
            console.warn(`Invalid config: min (${min}) >= max (${max}), swapping values`)
            // Swap them to be valid
            const temp = config.min
            config.min = config.max
            config.max = temp
        }
    }

    // VALIDATION: Ensure credits_per_user is set for quadratic
    if (selectedEngine.value === 'quadratic' && !config.credits_per_user) {
        config.credits_per_user = 100
    }

    // VALIDATION: Ensure max_rank is properly handled for ranking engines
    if (['ranking', 'condorcet', 'borda'].includes(selectedEngine.value)) {
        if (config.max_rank === undefined || config.max_rank === null) {
            config.max_rank = null  // null means rank all options
        }
    }

    const saveData: {
        engine: string
        config: Record<string, unknown>
        status?: 'draft' | 'active' | 'closed'
        title?: string
        description?: string
        purpose?: string
    } = {
        engine: selectedEngine.value,
        config,
        status: props.mode === 'edit' ? tempStatus.value : 'draft'
    }

    // Only include title, description, purpose in create/edit mode
    if (props.mode !== 'deliberative') {
        saveData.title = localTitle.value.trim()
        saveData.description = localDescription.value.trim()
        saveData.purpose = selectedPurpose.value
    }

    emit('save', saveData)
    emit('close')
}


onMounted(() => {
  if (props.mode === 'edit' && props.existingEngine?.engine === 'condorcet') {
    const variant = props.existingEngine.config?.variant as string
    if (variant && condorcetVariants.some(v => v.id === variant)) {
      selectedVariant.value = variant
      if (!tempConfig.value.variant) tempConfig.value.variant = variant
    }
  }
})
</script>

<style scoped lang="scss">
.engine-selector-modal {
    padding: 0;
    max-width: 900px;
    background: var(--color-main-background);
    border-radius: 24px;
    overflow: visible;

    .modal-header {
        text-align: center;
        padding: 32px 32px 24px;
        background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
        border-bottom: 1px solid var(--color-border);

        .header-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
            background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
            border-radius: 36px;
            margin-bottom: 16px;
            color: white;
        }

        h3 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 700;
        }

        .modal-description {
            margin: 0;
            font-size: 14px;
            color: var(--color-text-lighter);
        }
    }

    .engine-basic-info {
        padding: 24px 24px 0 24px;

        .field {
            margin-bottom: 16px;

            label {
                display: block;
                margin-bottom: 8px;
                font-size: 13px;
                font-weight: 500;

                .required {
                    color: var(--color-error);
                }
            }

            .textarea-input {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                background: var(--color-main-background);
                font-size: 13px;
                font-family: inherit;
                resize: vertical;
                transition: all 0.2s;

                &:focus {
                    outline: none;
                    border-color: var(--color-primary-element);
                    box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
                }
            }

            .field-error {
                margin: 4px 0 0 0;
                font-size: 11px;
                color: var(--color-error);
            }
        }
    }

    .engine-grid-wrapper {
        padding: 24px;
        max-height: 500px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-track {
            background: var(--color-background-dark);
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--color-border);
            border-radius: 4px;

            &:hover {
                background: var(--color-text-lighter);
            }
        }
    }

    .engine-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;

        .engine-card {
            position: relative;
            padding: 20px;
            background: var(--color-background-dark);
            border: 2px solid var(--color-border);
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                border-color: var(--color-primary-element);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            &.selected {
                border-color: var(--color-primary-element);
                background: rgba(var(--color-primary-element-rgb), 0.05);
            }

            .engine-card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;

                .engine-icon {
                    width: 52px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--color-main-background);
                    border-radius: 12px;
                    color: var(--color-primary-element);
                }

                .engine-badge {
                    font-size: 11px;
                    padding: 4px 8px;
                    border-radius: 20px;
                    font-weight: 500;
                    
  &.per_option { background: #3498db20; color: #3498db; }
  &.cross_option { background: #9b59b620; color: #9b59b6; }
  &.flex { background: #e67e2220; color: #e67e22; }
  &.none { background: #95a5a620; color: #95a5a6; }

                }
            }

            .engine-card-content {
                h4 {
                    margin: 0 0 8px 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                p {
                    margin: 0 0 8px 0;
                    font-size: 12px;
                    color: var(--color-text-lighter);
                    line-height: 1.4;
                }

                .engine-constraints {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;

                    .constraint-badge {
                        font-size: 10px;
                        padding: 2px 6px;
                        background: var(--color-background-hover);
                        border-radius: 12px;
                        color: var(--color-text-lighter);
                    }
                }
            }

            .engine-check {
                position: absolute;
                top: 12px;
                right: 12px;
                color: var(--color-primary-element);
            }
        }
    }

    .subtype-selection-section {
        margin: 0 24px 24px 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 16px;
        border: 1px solid var(--color-border);

        .subtype-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;

            svg {
                color: var(--color-primary-element);
            }

            h5 {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
            }
        }

        .subtype-select {
            :deep(.vs__dropdown-menu) {
                max-height: 300px;
            }

            .variant-option {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 8px;

                .variant-icon {
                    flex-shrink: 0;
                    margin-top: 2px;
                    color: var(--color-primary-element);
                }

                .variant-content {
                    flex: 1;

                    .variant-label {
                        font-weight: 500;
                        margin-bottom: 2px;
                    }

                    .variant-description {
                        font-size: 12px;
                        color: var(--color-text-lighter);
                    }
                }
            }
        }
    }

    .grade-config-section {
        margin: 0 24px 24px 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 16px;
        border: 1px solid var(--color-border);

        .config-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;

            svg {
                color: var(--color-primary-element);
            }

            h5 {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
            }
        }

        .grades-list {
            margin-bottom: 12px;

            .grade-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;

                .grade-input {
                    flex: 1;
                }

                .grade-remove {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border: none;
                    border-radius: 8px;
                    background: var(--color-background-hover);
                    color: var(--color-text-lighter);
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        background: var(--color-error);
                        color: white;
                    }
                }
            }
        }

        .grade-add {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border: 1px dashed var(--color-border);
            border-radius: 8px;
            background: transparent;
            color: var(--color-primary-element);
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background: rgba(var(--color-primary-element-rgb), 0.05);
                border-color: var(--color-primary-element);
            }
        }
    }

    .reactions-config-section {
        margin: 0 24px 24px 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 16px;
        border: 1px solid var(--color-border);

        .config-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;

            svg {
                color: var(--color-primary-element);
            }

            h5 {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
            }
        }

        .reactions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 12px;
            margin-bottom: 16px;

            .reaction-item {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                padding: 16px 12px;
                background: var(--color-main-background);
                border: 2px solid var(--color-border);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s ease;

                &:hover {
                    transform: translateY(-2px);
                    border-color: var(--color-primary-element);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                &.selected {
                    border-color: var(--color-primary-element);
                    background: rgba(var(--color-primary-element-rgb), 0.05);

                    .reaction-emoji {
                        transform: scale(1.1);
                    }
                }

                .reaction-emoji {
                    font-size: 32px;
                    transition: transform 0.2s ease;
                }

                .reaction-label {
                    font-size: 12px;
                    color: var(--color-text-lighter);
                    text-align: center;
                }

                .reaction-check {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    color: var(--color-primary-element);
                }
            }
        }

        .reaction-limit {
            label {
                display: block;
                margin-bottom: 8px;
                font-size: 13px;
                font-weight: 500;
            }

            .limit-input {
                width: 100px;
            }
        }
    }

    .engine-config-section {
        margin: 0 24px 24px 24px;

        .config-settings-trigger {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.08) 0%, rgba(var(--color-primary-element-rgb), 0.03) 100%);
            border: 2px dashed var(--color-border);
            border-radius: 16px;
            color: var(--color-primary-element);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background: rgba(var(--color-primary-element-rgb), 0.12);
                border-color: var(--color-primary-element);
                transform: translateY(-1px);
            }

            .config-count-badge {
                background: var(--color-primary-element);
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
            }
        }
    }

    .engine-info-section {
        margin: 0 24px 24px 24px;
        padding: 16px;
        background: var(--color-background-dark);
        border-radius: 12px;
        border: 1px solid var(--color-border);

        .info-message {
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--color-text-lighter);
            font-size: 13px;

            svg {
                flex-shrink: 0;
                color: var(--color-primary-element);
            }
        }
    }

    .engine-status-section {
        margin: 0 24px 24px 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 16px;
        border: 1px solid var(--color-border);

        .status-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;

            svg {
                color: var(--color-primary-element);
            }

            h5 {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
            }
        }

        .status-hint {
            margin-left: 8px;
            font-size: 11px;
            color: var(--color-text-lighter);
        }
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 20px 24px;
        background: var(--color-background-dark);
        border-top: 1px solid var(--color-border);

        .btn-secondary, .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }

        .btn-secondary {
            background: var(--color-background-hover);
            color: var(--color-main-text);

            &:hover:not(:disabled) {
                background: var(--color-background-dark);
                transform: translateY(-1px);
            }
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
            color: white;

            &:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
            }
        }
    }
}

    // Settings Dialog Styles
        .settings-dialog-content {
        padding: 0;

        .settings-header {
            text-align: center;
            padding: 24px 24px 20px;
            background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.05) 0%, rgba(var(--color-primary-element-rgb), 0.02) 100%);
            border-bottom: 1px solid var(--color-border);
            margin: -8px -8px 0 -8px;

            .settings-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
                border-radius: 28px;
                margin-bottom: 16px;
                color: white;
            }

            h4 {
                margin: 0 0 8px 0;
                font-size: 20px;
                font-weight: 600;
            }

            p {
                margin: 0;
                font-size: 13px;
                color: var(--color-text-lighter);
            }
        }

        .settings-fields {
            padding: 24px;
            max-height: 500px;
            overflow-y: auto;

            .settings-field {
                margin-bottom: 24px;

                &:last-child {
                    margin-bottom: 0;
                }

                .settings-field-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--color-main-text);

                    .field-hint {
                        font-size: 11px;
                        color: var(--color-text-lighter);
                        font-weight: normal;
                    }
                }

                .settings-field-input {
                    .number-config {
                        .null-number-control {
                            margin-bottom: 12px;
                        }

                        .slider-control {
                            .settings-range-input {
                                width: 100%;
                                height: 6px;
                                -webkit-appearance: none;
                                background: linear-gradient(to right, 
                                    var(--color-primary-element) 0%, 
                                    var(--color-primary-element) var(--range-progress, 0%), 
                                    var(--color-border) var(--range-progress, 0%), 
                                    var(--color-border) 100%);
                                border-radius: 3px;
                                outline: none;
                                margin-bottom: 12px;

                                &::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    background: var(--color-primary-element);
                                    cursor: pointer;
                                    transition: all 0.2s;
                                    border: 2px solid white;
                                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

                                    &:hover {
                                        transform: scale(1.1);
                                    }
                                }

                                &::-moz-range-thumb {
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    background: var(--color-primary-element);
                                    cursor: pointer;
                                    transition: all 0.2s;
                                    border: 2px solid white;
                                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                                }
                            }

                            .slider-value {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                gap: 12px;

                                .value-number {
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: var(--color-primary-element);
                                    background: rgba(var(--color-primary-element-rgb), 0.1);
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    min-width: 50px;
                                    text-align: center;
                                }

                                :deep(.progress-bar) {
                                    flex: 1;
                                }
                            }
                        }

                        .null-indicator {
                            font-size: 13px;
                            color: var(--color-text-lighter);
                            font-style: italic;
                            padding: 8px 0;
                            display: inline-block;
                        }
                    }

                    .settings-text-input {
                        width: 100%;
                    }

                    .boolean-config {
                        .settings-switch {
                            :deep(.checkbox-radio-switch) {
                                justify-content: flex-start;
                            }
                        }
                    }

                    .settings-select {
                        width: 100%;
                    }
                }

                .settings-field-description {
                    margin: 8px 0 0 0;
                    font-size: 11px;
                    color: var(--color-text-lighter);
                    line-height: 1.4;
                }
            }
        }
    }
</style>
