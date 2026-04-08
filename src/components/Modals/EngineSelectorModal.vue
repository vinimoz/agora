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
              <span v-if="engine.constraints.min_candidates" class="constraint-badge">
                {{ t('agora', 'Min {n} candidates', { n: engine.constraints.min_candidates }) }}
              </span>
              <span v-if="engine.constraints.max_candidates" class="constraint-badge">
                {{ t('agora', 'Max {n} candidates', { n: engine.constraints.max_candidates }) }}
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
          :placeholder="t('agora', 'Choose a Condorcet variant...')"
          :aria-label="t('agora', 'Select specific Condorcet method variant')"
          :reduce="option => option.id"
          label="label"
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
          <template #selected-option="option">
            <div class="selected-variant">
              <component :is="getVariantIcon(option.id)" :size="16" class="variant-icon" />
              <span>{{ option.label }}</span>
            </div>
          </template>
        </NcSelect>
      </div>

      <!-- Configuration section -->
      <div v-if="selectedEngine && currentConfigSchema && Object.keys(currentConfigSchema).length > 0" class="engine-config-section">
        <div class="config-header">
          <Settings :size="18" />
          <h5>{{ t('agora', 'Configure settings') }}</h5>
        </div>

        <div class="config-fields">
          <div v-for="(schema, key) in currentConfigSchema" :key="key" class="config-field">
            <label class="config-label">
              {{ schema.label || key }}
              <span v-if="schema.description && schema.type !== 'fieldset'" class="field-hint">({{ schema.description }})</span>
            </label>

            <!-- Number with slider for min/max values -->
            <div v-if="schema.type === 'number' && schema.min !== undefined && schema.max !== undefined" class="range-field">
              <input
                :id="`config-${key}`"
                :value="getConfigValue(key)"
                type="range"
                :min="schema.min"
                :max="schema.max"
                :step="schema.step || 1"
                class="range-input"
                @input="updateConfigValue(key, $event.target.value)"
              />
              <div class="range-values">
                <span class="range-min">{{ schema.min }}</span>
                <span class="range-current">{{ getConfigValue(key) ?? schema.default ?? schema.min }}</span>
                <span class="range-max">{{ schema.max }}</span>
              </div>
            </div>

            <!-- Number without slider (simple number input) -->
            <input
              v-else-if="schema.type === 'number'"
              :id="`config-${key}`"
              :value="getConfigValue(key)"
              type="number"
              :min="schema.min"
              :max="schema.max"
              :step="schema.step || 1"
              class="number-input"
              @input="updateConfigValue(key, parseFloat($event.target.value))"
            />

            <!-- Text input -->
            <input
              v-else-if="schema.type === 'string'"
              :id="`config-${key}`"
              :value="getConfigValue(key)"
              type="text"
              :placeholder="schema.placeholder || ''"
              class="text-input"
              @input="updateConfigValue(key, $event.target.value)"
            />

            <!-- Select dropdown -->
            <NcSelect
              v-else-if="schema.type === 'select' && schema.options"
              :id="`config-${key}`"
              :model-value="getConfigValue(key)"
              :options="schema.options"
              :placeholder="schema.placeholder || t('agora', 'Select an option')"
              :aria-label="schema.label || key"
              class="config-select"
              @update:model-value="(val) => updateConfigValue(key, val)"
            />

            <!-- Radio group for choices -->
            <div v-else-if="schema.type === 'radio' && schema.options" class="radio-group">
              <NcCheckboxRadioSwitch
                v-for="option in schema.options"
                :key="option.value"
                :model-value="getConfigValue(key)"
                type="radio"
                :value="option.value"
                :aria-label="option.label"
                @update:model-value="(val) => val && updateConfigValue(key, option.value)"
              >
                {{ option.label }}
              </NcCheckboxRadioSwitch>
            </div>

            <!-- Boolean switch -->
            <div v-else-if="schema.type === 'boolean'" class="boolean-field">
              <NcCheckboxRadioSwitch
                :model-value="getConfigValue(key)"
                type="switch"
                :aria-label="schema.label || key"
                @update:model-value="(val) => updateConfigValue(key, val)"
              >
                {{ getConfigValue(key) ? t('agora', 'Enabled') : t('agora', 'Disabled') }}
              </NcCheckboxRadioSwitch>
            </div>

            <!-- Fieldset for grouped options -->
            <fieldset v-else-if="schema.type === 'fieldset' && schema.fields" class="config-fieldset">
              <legend>{{ schema.legend || schema.label }}</legend>
              <div v-for="(field, fieldKey) in schema.fields" :key="fieldKey" class="fieldset-field">
                <label class="fieldset-label">{{ field.label }}</label>
                
                <select
                  v-if="field.type === 'select' && field.options"
                  :value="getNestedConfigValue(key, fieldKey)"
                  class="select-input"
                  @change="updateNestedConfigValue(key, fieldKey, $event.target.value)"
                >
                  <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>

                <NcCheckboxRadioSwitch
                  v-else-if="field.type === 'boolean'"
                  :model-value="getNestedConfigValue(key, fieldKey)"
                  type="switch"
                  @update:model-value="(val) => updateNestedConfigValue(key, fieldKey, val)"
                >
                  {{ field.label }}
                </NcCheckboxRadioSwitch>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div v-else-if="selectedEngine && (!currentConfigSchema || Object.keys(currentConfigSchema).length === 0)" class="engine-info-section">
        <div class="info-message">
          <Info :size="18" />
          <span>{{ t('agora', 'This voting method requires no additional configuration.') }}</span>
        </div>
      </div>

      <div class="modal-footer">
        <NcButton
          variant="secondary"
          :aria-label="t('agora', 'Cancel voting method selection')"
          @click="$emit('close')"
        >
          {{ t('agora', 'Cancel') }}
        </NcButton>
        <NcButton
          variant="primary"
          :disabled="!selectedEngine"
          :aria-label="selectedEngine ? t('agora', 'Apply {engine} voting method', { engine: getEngineLabel(selectedEngine) }) : t('agora', 'Please select a voting method first')"
          @click="apply"
        >
          <template #icon>
            <Vote :size="16" />
          </template>
          {{ t('agora', 'Apply {engine}', { engine: getEngineLabel(selectedEngine) }) }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
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
  Trophy,
  GitBranch,
  ArrowUpDown,
} from 'lucide-vue-next'

interface ConfigSchemaField {
  type: 'number' | 'string' | 'boolean' | 'select' | 'radio' | 'fieldset'
  default?: unknown
  label?: string
  description?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  legend?: string
  fields?: Record<string, { type: string; label: string; options?: Array<{ value: string; label: string }> }>
}

interface EngineDefinition {
  label: string
  behavior: 'single' | 'multi' | 'flex'
  description: string
  constraints: {
    min_candidates?: number
    max_candidates?: number
    requires_weight_source?: boolean
  }
  config_schema?: Record<string, ConfigSchemaField>
}

interface Engine {
  id: string
  label: string
  behavior: string
  description: string
  constraints?: {
    min_candidates?: number
    max_candidates?: number
  }
}

const props = defineProps<{
  currentEngineId: string
  currentVariantId?: string
  currentConfig: Record<string, unknown>
  engines: Engine[]
  engineDefinitions: Record<string, EngineDefinition>
}>()

const emit = defineEmits<{
  close: []
  apply: [engineId: string, variantId: string | null, config: Record<string, unknown>]
}>()

const selectedEngine = ref(props.currentEngineId)
const selectedVariant = ref(props.currentVariantId || 'schulze')
const tempConfig = ref<Record<string, unknown>>({ ...props.currentConfig })

const availableEngines = computed(() => props.engines)

const condorcetVariants = [
  { id: 'schulze', label: 'Schulze Method', description: 'Also known as Beatpath method, considered one of the most robust Condorcet methods' },
  { id: 'copeland', label: 'Copeland Method', description: 'Simple method based on win-loss record against other candidates' },
  { id: 'minimax', label: 'Minimax', description: 'Also known as Simpson-Kramer method, minimizes the largest opposition' },
  { id: 'ranked_pairs', label: 'Ranked Pairs', description: 'Tideman method that builds a ranking from strongest to weakest majorities' },
  { id: 'kemeny_young', label: 'Kemeny-Young', description: 'Finds the most likely ranking based on voters preferences' },
]

const currentConfigSchema = computed(() => {
  if (!selectedEngine.value) return null
  
  const engine = props.engineDefinitions[selectedEngine.value]
  if (!engine?.config_schema) return null
  
  return engine.config_schema
})

// Helper methods to safely get and update config values
const getConfigValue = (key: string): unknown => tempConfig.value[key]

const updateConfigValue = (key: string, value: unknown): void => {
  tempConfig.value[key] = value
}

const getNestedConfigValue = (parentKey: string, childKey: string): unknown => {
  const parent = tempConfig.value[parentKey] as Record<string, unknown>
  return parent?.[childKey]
}

const updateNestedConfigValue = (parentKey: string, childKey: string, value: unknown): void => {
  if (!tempConfig.value[parentKey]) {
    tempConfig.value[parentKey] = {}
  }
  (tempConfig.value[parentKey] as Record<string, unknown>)[childKey] = value
}

const getEngineIcon = (engineId: string) => {
  const icons: Record<string, unknown> = {
    binary: ThumbsUp,
    ternary: Scale,
    reaction: Heart,
    star: Star,
    score: Star,
    approval: CheckCircle,
    ranked: TrendingUp,
    borda: Award,
    condorcet: Brain,
    majority_judgment: Gauge,
    token_weighted: Users,
    quadratic: TrendingUp,
    schulze: Brain,
    copeland: BarChart3,
    nauru: Hash,
    phased_voting: ListChecks,
    ranked_choice: TrendingUp,
    binary_voting: ThumbsUp,
    ternary_voting: Scale,
    star_voting: Star,
    approval_voting: CheckCircle,
    score_voting: Star,
    reaction_voting: Heart,
  }
  return icons[engineId] || Vote
}

const getVariantIcon = (variantId: string) => {
  const icons: Record<string, unknown> = {
    schulze: Brain,
    copeland: BarChart3,
    minimax: Gauge,
    ranked_pairs: GitBranch,
    kemeny_young: Trophy,
  }
  return icons[variantId] || ArrowUpDown
}

const getEngineLabel = (engineId: string): string => props.engineDefinitions[engineId]?.label || engineId

const getEngineDescription = (engineId: string): string => props.engineDefinitions[engineId]?.description || t('agora', 'Vote using this method')

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
  
  // Reset variant for condorcet
  if (engineId === 'condorcet') {
    selectedVariant.value = 'schulze'
  }

  const engine = props.engineDefinitions[engineId]
  if (engine?.config_schema) {
    const newConfig: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(engine.config_schema)) {
      newConfig[key] =
      value.default === undefined
        ? (
            value.type === 'number' ? 0 :
            value.type === 'boolean' ? false :
            value.type === 'select' && value.options?.[0]
            ? value.options[0].value
            : ''
        )
        : value.default
    }
    tempConfig.value = newConfig
  } else {
    tempConfig.value = {}
  }
}

const apply = (): void => {
  if (selectedEngine.value) {
    const variant = selectedEngine.value === 'condorcet' ? selectedVariant.value : null
    emit('apply', selectedEngine.value, variant, tempConfig.value)
    emit('close')
  }
}
</script>

<style scoped lang="scss">
.engine-selector-modal {
    padding: 0;
    max-width: 800px;
    background: var(--color-main-background);
    border-radius: 24px;
    overflow: hidden;

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
                font-size: 14px;
                font-weight: 600;
            }
        }

        .subtype-select {
            width: 100%;
        }

        .variant-option {
            display: flex;
            gap: 12px;
            align-items: center;
            padding: 8px 4px;

            .variant-icon {
                flex-shrink: 0;
                color: var(--color-primary-element);
            }

            .variant-content {
                flex: 1;

                .variant-label {
                    font-weight: 500;
                    font-size: 13px;
                    margin-bottom: 2px;
                }

                .variant-description {
                    font-size: 11px;
                    color: var(--color-text-lighter);
                }
            }
        }

        .selected-variant {
            display: flex;
            align-items: center;
            gap: 8px;

            .variant-icon {
                color: var(--color-primary-element);
            }
        }
    }

    .engine-config-section {
        margin: 0 24px 24px 24px;
        padding: 20px;
        background: var(--color-background-dark);
        border-radius: 16px;
        border: 1px solid var(--color-border);
        max-height: 400px;
        overflow-y: auto;

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
                margin-bottom: 24px;

                &:last-child {
                    margin-bottom: 0;
                }

                .config-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--color-main-text);

                    .field-hint {
                        font-size: 11px;
                        color: var(--color-text-lighter);
                        font-weight: normal;
                        margin-left: 4px;
                    }
                }

                .range-field {
                    .range-input {
                        width: 100%;
                        height: 6px;
                        -webkit-appearance: none;
                        background: var(--color-border);
                        border-radius: 3px;
                        outline: none;
                        margin: 16px 0 8px;

                        &::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                            background: var(--color-primary-element);
                            cursor: pointer;
                            transition: all 0.2s;

                            &:hover {
                                transform: scale(1.2);
                            }
                        }
                    }

                    .range-values {
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        color: var(--color-text-lighter);
                        padding: 0 4px;

                        .range-current {
                            font-weight: 600;
                            color: var(--color-primary-element);
                        }
                    }
                }

                .number-input, .text-input, .config-select {
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

                .radio-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 8px 0;
                }

                .boolean-field {
                    padding: 8px 0;
                }

                .config-fieldset {
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 16px;
                    margin: 8px 0;

                    legend {
                        padding: 0 12px;
                        font-size: 13px;
                        font-weight: 600;
                        width: auto;
                    }

                    .fieldset-field {
                        margin-bottom: 16px;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        .fieldset-label {
                            display: block;
                            font-size: 12px;
                            font-weight: 500;
                            margin-bottom: 6px;
                        }

                        .select-input {
                            width: 100%;
                            padding: 6px 10px;
                            border: 1px solid var(--color-border);
                            border-radius: 6px;
                            background: var(--color-main-background);
                            font-size: 12px;
                        }
                    }
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
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        background: var(--color-background-dark);
        border-top: 1px solid var(--color-border);
    }
}
</style>
