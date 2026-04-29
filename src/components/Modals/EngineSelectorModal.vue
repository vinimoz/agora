<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcModal
    size="normal"
    :name="t('agora', 'Choose Voting Method')"
    @close="$emit('close')"
  >
    <div class="engine-selector-modal">
      <div class="modal-header">
        <div class="header-icon">
          <Vote :size="32" />
        </div>
        <h3>{{ t('agora', 'Select a voting method') }}</h3>
        <p class="modal-description">
          {{ t('agora', 'Different voting methods offer different ways to express preferences. Choose the one that best fits your decision-making process.') }}
        </p>
      </div>

      <div class="engine-grid">
        <div
          v-for="engine in availableEngines"
          :key="engine.id"
          class="engine-card"
          :class="{
            selected: selectedEngine === engine.id,
            [engine.behavior]: true
          }"
          @click="selectEngine(engine.id)"
        >
          <div class="engine-card-header">
            <div class="engine-icon">
              <component :is="getEngineIcon(engine.id)" :size="24" />
            </div>
            <div class="engine-badge" :class="engine.behavior">
              {{ getBehaviorLabel(engine.behavior) }}
            </div>
          </div>

          <div class="engine-card-content">
            <h4>{{ engine.label }}</h4>
            <p>{{ engine.description || getEngineDescription(engine.id) }}</p>
            <div v-if="engine.constraints" class="engine-constraints">
              <span v-if="engine.constraints.min_options" class="constraint-badge">
                {{ t('agora', 'Min {n} candidates', { n: engine.constraints.min_options }) }}
              </span>
              <span v-if="engine.constraints.max_options" class="constraint-badge">
                {{ t('agora', 'Max {n} candidates', { n: engine.constraints.max_options }) }}
              </span>
            </div>
          </div>

          <div v-if="selectedEngine === engine.id" class="engine-check">
            <CheckCircle :size="20" />
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
          <div v-for="(grade, index) in tempConfig.grades || defaultGrades" :key="index" class="grade-item">
            <input 
              v-model="tempConfig.grades[index]" 
              type="text" 
              class="grade-input"
              :placeholder="t('agora', 'Grade {n}', { n: index + 1 })"
            />
            <button 
              v-if="(tempConfig.grades || defaultGrades).length > 2" 
              class="grade-remove" 
              :aria-label="t('agora', 'Remove grade')"
              @click="removeGrade(index)"
            >
              <Minus :size="14" />
            </button>
          </div>
        </div>
        
        <button class="grade-add" @click="addGrade">
          <Plus :size="16" />
          {{ t('agora', 'Add grade') }}
        </button>
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
              <CheckCircle :size="16" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedEngine && currentConfigSchema && Object.keys(currentConfigSchema).length > 0 && !isSpecialEngine" class="engine-config-section">
        <div class="config-header">
          <Settings :size="18" />
          <h5>{{ t('agora', 'Configure settings') }}</h5>
        </div>

        <div class="config-fields">
          <div v-for="(schema, key) in currentConfigSchema" :key="key" class="config-field">
            <label :for="`config-${key}`">
              {{ schema.label || key }}
              <span v-if="schema.type === 'number' && schema.min !== undefined && schema.max !== undefined" class="field-hint">
                {{ t('agora', '({min}-{max})', { min: schema.min, max: schema.max }) }}
              </span>
            </label>

            <div class="field-input">
              <!-- Number input (range) -->
              <div v-if="schema.type === 'number'" class="range-container">
                <input
                  :id="`config-${key}`"
                  v-model.number="tempConfig[key]"
                  type="range"
                  :min="schema.min ?? 0"
                  :max="schema.max ?? 100"
                  :step="schema.step ?? 1"
                  class="range-input"
                  :style="{ '--range-progress': getRangeProgress(tempConfig[key], schema.min ?? 0, schema.max ?? 100) + '%' }"
                />
                <span class="range-value-display">{{ tempConfig[key] ?? schema.default ?? 0 }}</span>
              </div>

              <!-- Text input -->
              <input
                v-else-if="schema.type === 'string' && !schema.options"
                :id="`config-${key}`"
                v-model="tempConfig[key]"
                type="text"
                :placeholder="schema.placeholder || ''"
                class="text-input"
              />

              <!-- Boolean toggle -->
              <div v-else-if="schema.type === 'boolean'" class="boolean-field">
                <label class="toggle-switch">
                  <input v-model="tempConfig[key]" type="checkbox" />
                  <span class="toggle-slider"></span>
                </label>
                <span class="boolean-label">{{ tempConfig[key] ? t('agora', 'Enabled') : t('agora', 'Disabled') }}</span>
              </div>

              <!-- NcSelect for other options -->
              <NcSelect
                v-else-if="schema.options"
                :id="`config-${key}`"
                v-model="tempConfig[key]"
                :options="getSelectOptions(schema)"
                :placeholder="t('agora', 'Select an option')"
                :clearable="false"
                class="select-input"
              />
            </div>

            <p v-if="schema.description" class="field-description">
              {{ schema.description }}
            </p>
          </div>
        </div>
      </div>

      <div v-else-if="selectedEngine && !isSpecialEngine && (!currentConfigSchema || Object.keys(currentConfigSchema).length === 0)" class="engine-info-section">
        <div class="info-message">
          <Info :size="18" />
          <span>{{ t('agora', 'This voting method requires no additional configuration.') }}</span>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" @click="$emit('close')">
          {{ t('agora', 'Cancel') }}
        </button>
        <button
          class="btn-primary"
          :disabled="!selectedEngine"
          @click="apply"
        >
          <Vote :size="16" />
          {{ t('agora', 'Apply {engine}', { engine: getEngineLabel(selectedEngine) }) }}
        </button>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcSelect from '@nextcloud/vue/components/NcSelect'
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
  Hash,
  Plus,
  Minus,
} from 'lucide-vue-next'

// 👇 Import from single source of truth - MUST be before local type references
import { 
  ENGINE_DEFINITIONS, 
  initializeEngineConfig,
  type EngineInfo, 
  type ConfigSchemaField 
} from '../../Types/votingType'

// 👇 Props - simplified, no longer needs engineDefinitions
const props = defineProps<{
  currentEngineId: string
  currentConfig: Record<string, unknown>
  engines: EngineInfo[]
}>()

const emit = defineEmits<{
  close: []
  apply: [engineId: string, config: Record<string, unknown>]
}>()

const selectedEngine = ref(props.currentEngineId)
const selectedVariant = ref('schulze')
const tempConfig = ref<Record<string, unknown>>({ ...props.currentConfig })

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

const availableEngines = computed(() => props.engines)

// 👇 Fixed: use ENGINE_DEFINITIONS directly instead of props.engineDefinitions
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
if (selectedEngine.value === 'majority_judgment' && !tempConfig.value.grades) {
  tempConfig.value.grades = [...defaultGrades]
}
if (selectedEngine.value === 'reaction' && !tempConfig.value.allowed_reactions) {
  tempConfig.value.allowed_reactions = ['👍', '❤️', '🎉', '🤔', '👎']
  tempConfig.value.max_per_user = 3
}

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

// 👇 Fixed: use imported ConfigSchemaField type
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
    phased_voting: ListChecks,
    trending: TrendingUp,
    none: Vote,
  }
  return icons[engineId] || Vote
}

// 👇 Fixed: use ENGINE_DEFINITIONS directly
const getEngineLabel = (engineId: string): string => ENGINE_DEFINITIONS[engineId]?.label || engineId

const getEngineDescription = (engineId: string): string => ENGINE_DEFINITIONS[engineId]?.description || t('agora', 'Vote using this method')

const getBehaviorLabel = (behavior: string): string => {
  const labels: Record<string, string> = {
    single: t('agora', 'Single choice'),
    multi: t('agora', 'Multiple choices'),
    flex: t('agora', 'Flexible')
  }
  return labels[behavior] || behavior
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
    selectedVariant.value = 'schulze'
  }
}

const apply = (): void => {
  if (selectedEngine.value) {
    const config = { ...tempConfig.value }
    
    // Add variant for condorcet
    if (selectedEngine.value === 'condorcet') {
      config.variant = selectedVariant.value
    }
    
    emit('apply', selectedEngine.value, config)
    emit('close')
  }
}
</script>

<style scoped lang="scss">
.engine-selector-modal {
  padding: 0;
  max-width: 700px;
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
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
      border-radius: 32px;
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

  .engine-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    padding: 24px;
    max-height: 400px;
    overflow-y: auto;

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
          width: 48px;
          height: 48px;
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

          &.single { background: #3498db20; color: #3498db; }
          &.multi { background: #9b59b620; color: #9b59b6; }
          &.flex { background: #e67e2220; color: #e67e22; }
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
          padding: 8px 12px;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          background: var(--color-main-background);
          font-size: 13px;
          transition: all 0.2s;

          &:focus {
            outline: none;
            border-color: var(--color-primary-element);
            box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
          }
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
  }

  .engine-config-section {
    margin: 0 24px 24px 24px;
    padding: 20px;
    background: var(--color-background-dark);
    border-radius: 16px;
    border: 1px solid var(--color-border);

    .config-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--color-border);

      svg {
        color: var(--color-primary-element);
      }

      h5 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
      }
    }

    .config-fields {
      .config-field {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 500;

          .field-hint {
            font-size: 11px;
            color: var(--color-text-lighter);
            font-weight: normal;
          }
        }

        .field-input {
          position: relative;

          .range-container {
            position: relative;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;

            .range-input {
              flex: 1;
              height: 6px;
              -webkit-appearance: none;
              background: linear-gradient(to right, 
                var(--color-primary-element) 0%, 
                var(--color-primary-element) var(--range-progress, 0%), 
                var(--color-border) var(--range-progress, 0%), 
                var(--color-border) 100%);
              border-radius: 3px;
              outline: none;

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

            .range-value-display {
              min-width: 40px;
              text-align: center;
              font-size: 14px;
              font-weight: 600;
              color: var(--color-primary-element);
              background: rgba(var(--color-primary-element-rgb), 0.1);
              padding: 4px 8px;
              border-radius: 12px;
            }
          }

          .text-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid var(--color-border);
            border-radius: 8px;
            background: var(--color-main-background);
            font-size: 13px;
            transition: all 0.2s;

            &:focus {
              outline: none;
              border-color: var(--color-primary-element);
              box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
            }
          }

          .boolean-field {
            display: flex;
            align-items: center;
            gap: 12px;

            .toggle-switch {
              position: relative;
              display: inline-block;
              width: 44px;
              height: 24px;

              input {
                opacity: 0;
                width: 0;
                height: 0;

                &:checked + .toggle-slider {
                  background-color: var(--color-primary-element);
                }

                &:checked + .toggle-slider:before {
                  transform: translateX(20px);
                }
              }

              .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--color-border);
                transition: 0.3s;
                border-radius: 34px;

                &:before {
                  position: absolute;
                  content: "";
                  height: 18px;
                  width: 18px;
                  left: 3px;
                  bottom: 3px;
                  background-color: white;
                  transition: 0.3s;
                  border-radius: 50%;
                }
              }
            }

            .boolean-label {
              font-size: 13px;
            }
          }

          :deep(.select-input) {
            .v-select {
              .vs__dropdown-toggle {
                border: 1px solid var(--color-border);
                border-radius: 8px;
                background: var(--color-main-background);
                padding: 4px 8px;
              }

              .vs__selected-options {
                padding: 0;
              }

              .vs__search {
                padding: 0;
                margin: 0;
              }
            }
          }
        }

        .field-description {
          margin: 4px 0 0 0;
          font-size: 11px;
          color: var(--color-text-lighter);
        }
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
</style>
