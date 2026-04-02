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

      <div v-if="selectedEngine && currentConfigSchema && Object.keys(currentConfigSchema).length > 0" class="engine-config-section">
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
              <input
                v-if="schema.type === 'number'"
                :id="`config-${key}`"
                v-model="tempConfig[key]"
                type="range"
                :min="schema.min ?? 0"
                :max="schema.max ?? 100"
                :step="schema.step ?? 1"
                class="range-input"
              />

              <!-- Text input -->
              <input
                v-else-if="schema.type === 'string'"
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

              <!-- Select dropdown -->
              <select
                v-else-if="schema.type === 'array' && schema.options"
                :id="`config-${key}`"
                v-model="tempConfig[key]"
                class="select-input"
              >
                <option v-for="opt in schema.options" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>

              <!-- Number display for range -->
              <div v-if="schema.type === 'number'" class="range-value">
                {{ tempConfig[key] ?? schema.default ?? 0 }}
              </div>
            </div>

            <p v-if="schema.description" class="field-description">
              {{ schema.description }}
            </p>
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
} from 'lucide-vue-next'

// Define types for engine definitions
interface ConfigSchemaField {
  type: string
  default?: unknown
  label?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  options?: string[]
  description?: string
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
  currentConfig: Record<string, unknown>
  engines: Engine[]
  engineDefinitions: Record<string, EngineDefinition>
}>()

const emit = defineEmits<{
  close: []
  apply: [engineId: string, config: Record<string, unknown>]
}>()

const selectedEngine = ref(props.currentEngineId)
const tempConfig = ref<Record<string, unknown>>({ ...props.currentConfig })

// Filter engines to show only those that are valid with current candidate count
// This will be passed from parent, but we'll compute available ones here as well
const availableEngines = computed(() => props.engines)

const currentConfigSchema = computed(() => {
  if (!selectedEngine.value) return null
  const engine = props.engineDefinitions[selectedEngine.value]
  return engine?.config_schema || null
})

// Map engine IDs to icon components
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
    score_voting: Star
  }
  return icons[engineId] || Vote
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

  // Reset config for the new engine
  const engine = props.engineDefinitions[engineId]
  if (engine?.config_schema) {
    const newConfig: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(engine.config_schema)) {
      newConfig[key] = value.default
    }
    tempConfig.value = newConfig
  } else {
    tempConfig.value = {}
  }
}

const apply = (): void => {
  if (selectedEngine.value) {
    emit('apply', selectedEngine.value, tempConfig.value)
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

          .range-input {
            width: 100%;
            height: 6px;
            -webkit-appearance: none;
            background: var(--color-border);
            border-radius: 3px;
            outline: none;

            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: var(--color-primary-element);
              cursor: pointer;
              transition: all 0.2s;

              &:hover {
                transform: scale(1.2);
              }
            }
          }

          .text-input, .select-input {
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

          .range-value {
            position: absolute;
            right: 0;
            top: -25px;
            font-size: 11px;
            color: var(--color-text-lighter);
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
