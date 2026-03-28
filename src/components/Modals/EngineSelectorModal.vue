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
          v-for="engine in engines"
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
            <p>{{ engine.description }}</p>
          </div>

          <div v-if="selectedEngine === engine.id" class="engine-check">
            <CheckCircle :size="20" />
          </div>
        </div>
      </div>

      <div v-if="selectedEngine && currentConfigSchema" class="engine-config-section">
        <div class="config-header">
          <Settings :size="18" />
          <h5>{{ t('agora', 'Configure settings') }}</h5>
        </div>
        
        <div class="config-fields">
          <div v-for="(schema, key) in currentConfigSchema" :key="key" class="config-field">
            <label :for="`config-${key}`">
              {{ schema.label || key }}
              <span v-if="schema.type === 'number'" class="field-hint">
                {{ t('agora', '({min}-{max})', { min: schema.min || 0, max: schema.max || 100 }) }}
              </span>
            </label>
            
            <div class="field-input">
              <input
                v-if="schema.type === 'number'"
                :id="`config-${key}`"
                v-model="tempConfig[key]"
                type="range"
                :min="schema.min || 0"
                :max="schema.max || 100"
                :step="schema.step || 1"
                class="range-input"
              />
              <input
                v-else-if="schema.type === 'string'"
                :id="`config-${key}`"
                v-model="tempConfig[key]"
                type="text"
                :placeholder="schema.placeholder || ''"
                class="text-input"
              />
              
              <div v-else-if="schema.type === 'boolean'" class="boolean-field">
                <label class="toggle-switch">
                  <input v-model="tempConfig[key]" type="checkbox" />
                  <span class="toggle-slider"></span>
                </label>
                <span class="boolean-label">{{ tempConfig[key] ? t('agora', 'Enabled') : t('agora', 'Disabled') }}</span>
              </div>
              
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
              
              <div v-if="schema.type === 'number'" class="range-value">
                {{ tempConfig[key] || schema.default || 0 }}
              </div>
            </div>
            
            <p v-if="schema.description" class="field-description">
              {{ schema.description }}
            </p>
          </div>
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
import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import {
  Vote,
  CheckCircle,
  Settings,
  ThumbsUp,
  Scale,
  Heart,
  Star,
  TrendingUp,
  Award,
  Brain,
  Gauge,
  Users
} from 'lucide-vue-next'

const props = defineProps<{
  currentEngineId: string
  currentConfig: Record<string, any>
  engines: Array<{
    id: string
    label: string
    behavior: string
    description: string
  }>
  engineDefinitions: Record<string, any>
}>()

const emit = defineEmits<{
  close: []
  apply: [engineId: string, config: Record<string, any>]
}>()

const selectedEngine = ref(props.currentEngineId)
const tempConfig = ref<Record<string, any>>({ ...props.currentConfig })

const currentConfigSchema = computed(() => {
  if (!selectedEngine.value) return null
  const engine = props.engineDefinitions[selectedEngine.value]
  return engine?.config_schema || null
})

const getEngineIcon = (engineId: string) => {
  const icons: Record<string, any> = {
    binary: ThumbsUp,
    ternary: Scale,
    reaction: Heart,
    score: Star,
    approval: CheckCircle,
    ranked: TrendingUp,
    borda: Award,
    condorcet: Brain,
    majority_judgment: Gauge,
    token_weighted: Users,
    quadratic: TrendingUp
  }
  return icons[engineId] || Vote
}

const getEngineLabel = (engineId: string) => {
  return props.engineDefinitions[engineId]?.label || engineId
}

const getBehaviorLabel = (behavior: string) => {
  const labels = {
    single: t('agora', 'Single choice'),
    multi: t('agora', 'Multiple choices'),
    flex: t('agora', 'Flexible')
  }
  return labels[behavior as keyof typeof labels] || behavior
}

const selectEngine = (engineId: string) => {
  selectedEngine.value = engineId
  const schema = props.engineDefinitions[engineId]?.config_schema
  if (schema) {
    const newConfig: Record<string, any> = {}
    for (const [key, value] of Object.entries(schema)) {
      newConfig[key] = value.default
    }
    tempConfig.value = newConfig
  }
}

const apply = () => {
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
          margin: 0;
          font-size: 12px;
          color: var(--color-text-lighter);
          line-height: 1.4;
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
