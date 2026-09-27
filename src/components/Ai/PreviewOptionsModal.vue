<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcModal
    size="large"
    :name="t('agora', 'Generated Options')"
    @close="handleClose"
  >
    <div class="preview-modal">
      <div class="modal-header">
        <div class="header-icon success">
          <CheckCircle :size="32" />
        </div>
        <h3>{{ t('agora', 'Generated Options') }}</h3>
        <p class="modal-description">
          {{ t('agora', 'Select the options you want to create.') }}
        </p>
        <div class="selection-controls">
          <NcButton
            type="secondary"
            size="small"
            @click="selectAll"
          >
            {{ t('agora', 'Select All') }}
          </NcButton>
          <NcButton
            type="secondary"
            size="small"
            @click="deselectAll"
          >
            {{ t('agora', 'Deselect All') }}
          </NcButton>
          <span class="selection-count">
            {{ selectedCount }} / {{ options.length }} {{ t('agora', 'selected') }}
          </span>
        </div>
      </div>

      <div class="modal-content preview-content">
        <div v-if="loading" class="loading-state">
          <NcLoadingIcon :size="40" appearance="auto" />
          <p>{{ t('agora', 'Generating options...') }}</p>
        </div>
        <div v-else-if="options.length === 0" class="empty-state">
          <AlertCircle :size="40" />
          <p>{{ t('agora', 'No options were generated. Please try again.') }}</p>
        </div>
        <div v-else class="options-grid">
          <div
            v-for="(option, index) in options"
            :key="index"
            class="option-item"
            :class="{ selected: option.selected }"
            @click="toggleOption(index)"
          >
            <div class="option-checkbox">
              <NcCheckboxRadioSwitch
                :model-value="option.selected"
                type="checkbox"
                @update:model-value="toggleOption(index)"
              />
            </div>
            <div class="option-content">
              <div class="option-number">#{{ index + 1 }}</div>
              <div class="option-title">{{ option.title || option.text }}</div>
              <div v-if="option.description" class="option-description">
                {{ option.description }}
              </div>
              <div v-if="option.pros && option.pros.length" class="option-tags">
                <span v-for="pro in option.pros" :key="pro" class="tag pro">
                  👍 {{ pro }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <NcButton
          type="secondary"
          @click="handleClose"
        >
          {{ t('agora', 'Cancel') }}
        </NcButton>
        <NcButton
          type="secondary"
          @click="handleRegenerate"
          :disabled="loading"
        >
          <RefreshCw :size="16" />
          {{ t('agora', 'Regenerate') }}
        </NcButton>
        <NcButton
          type="primary"
          :disabled="selectedCount === 0 || loading"
          @click="handleImport"
        >
          <Plus :size="16" />
          {{ t('agora', 'Create {count} options', { count: selectedCount }) }}
        </NcButton>
      </div>
    </div>
  </NcModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import { CheckCircle, AlertCircle, RefreshCw, Plus } from 'lucide-vue-next'

interface Option {
  text: string
  title?: string
  description?: string
  pros?: string[]
  cons?: string[]
  tags?: string[]
  selected: boolean
}

const props = defineProps<{
  show: boolean
  options: Option[]
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  regenerate: []
  import: [options: Option[]]
}>()

const selectedCount = computed(() => 
  props.options.filter(opt => opt.selected).length
)

const toggleOption = (index: number) => {
  props.options[index].selected = !props.options[index].selected
}

const selectAll = () => {
  props.options.forEach(opt => opt.selected = true)
}

const deselectAll = () => {
  props.options.forEach(opt => opt.selected = false)
}

const handleClose = () => {
  emit('close')
}

const handleRegenerate = () => {
  emit('regenerate')
}

const handleImport = () => {
  const selected = props.options.filter(opt => opt.selected)
  if (selected.length > 0) {
    emit('import', selected)
  }
}
</script>

<style scoped lang="scss">
.preview-modal {
  padding: 0;
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
      background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-light) 100%);
      border-radius: 32px;
      margin-bottom: 16px;
      color: white;

      &.success {
        background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-light) 100%);
      }
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .modal-description {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-lighter);
    }

    .selection-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);

      .selection-count {
        font-size: 13px;
        color: var(--color-text-lighter);
        font-weight: 500;
      }
    }
  }

  .modal-content {
    padding: 24px;
    max-height: 500px;
    overflow-y: auto;

    .loading-state,
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 16px;
      color: var(--color-text-lighter);

      p {
        margin: 0;
        font-size: 14px;
      }
    }

    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .option-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: var(--color-background-dark);
        border: 2px solid var(--color-border);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: var(--color-primary-element-light);
        }

        &.selected {
          border-color: var(--color-primary-element);
          background: rgba(var(--color-primary-element-rgb), 0.05);
        }

        .option-checkbox {
          flex-shrink: 0;
          padding-top: 2px;

          :deep(.checkbox-radio-switch) {
            margin: 0;
          }
        }

        .option-content {
          flex: 1;
          min-width: 0;

          .option-number {
            font-size: 11px;
            font-weight: 600;
            color: var(--color-text-lighter);
            margin-bottom: 4px;
          }

          .option-title {
            font-size: 15px;
            font-weight: 600;
            color: var(--color-main-text);
            margin-bottom: 4px;
          }

          .option-description {
            font-size: 13px;
            color: var(--color-text-light);
            line-height: 1.4;
          }

          .option-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-top: 6px;

            .tag {
              font-size: 11px;
              padding: 2px 8px;
              border-radius: 12px;
              background: var(--color-background-hover);
              color: var(--color-text-light);

              &.pro {
                background: rgba(var(--color-success-rgb), 0.15);
                color: var(--color-success);
              }
            }
          }
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
  }
}
</style>
