<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="paired-layout" :class="`layout-${layoutStyle}`">
    <!-- Positions Section (top-level positions) -->
    <div v-if="hasPositions" class="paired-section positions-section">
      <h4 class="section-title">
        <component :is="InquiryOptionIcons.Scale" :size="18" />
        {{ t('agora', 'Positions') }}
      </h4>
      
      <div class="paired-grid">
        <!-- For Positions -->
        <div class="paired-column for-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.ThumbUp" :size="20" />
            <h5>{{ t('agora', 'For') }}</h5>
            <span class="column-count">{{ positionsFor.length }}</span>
          </div>
          
          <div class="column-content">
            <OptionCard
              v-for="option in positionsFor"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryId"
              :compact="layoutStyle === 'compact'"
              @click="$emit('openDetail', option)"
            />
            
            <!-- Quick add button -->
            <NcButton
              v-if="canAddPositionFor"
              type="tertiary"
              class="quick-add-btn"
              @click="$emit('addOption', 'position_for')"
            >
              <template #icon>
                <Plus :size="16" />
              </template>
              {{ t('agora', 'Add position') }}
            </NcButton>
            
            <div v-if="positionsFor.length === 0 && !canAddPositionFor" class="empty-column">
              <p>{{ t('agora', 'No positions for yet') }}</p>
            </div>
          </div>
        </div>

        <!-- Against Positions -->
        <div class="paired-column against-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.ThumbDown" :size="20" />
            <h5>{{ t('agora', 'Against') }}</h5>
            <span class="column-count">{{ positionsAgainst.length }}</span>
          </div>
          
          <div class="column-content">
            <OptionCard
              v-for="option in positionsAgainst"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryId"
              :compact="layoutStyle === 'compact'"
              @click="$emit('openDetail', option)"
            />
            
            <!-- Quick add button -->
            <NcButton
              v-if="canAddPositionAgainst"
              type="tertiary"
              class="quick-add-btn"
              @click="$emit('addOption', 'position_against')"
            >
              <template #icon>
                <Plus :size="16" />
              </template>
              {{ t('agora', 'Add position') }}
            </NcButton>
            
            <div v-if="positionsAgainst.length === 0 && !canAddPositionAgainst" class="empty-column">
              <p>{{ t('agora', 'No positions against yet') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Arguments Section -->
    <div v-if="hasArguments" class="paired-section arguments-section">
      <h4 class="section-title">
        <component :is="InquiryOptionIcons.MessageSquare" :size="18" />
        {{ t('agora', 'Arguments') }}
      </h4>
      
      <div class="paired-grid">
        <!-- For Arguments -->
        <div class="paired-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.MessagePlus" :size="20" />
            <h5>{{ t('agora', 'Supporting') }}</h5>
            <span class="column-count">{{ argumentsFor.length }}</span>
          </div>
          
          <div class="column-content">
            <OptionCard
              v-for="option in argumentsFor"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              @click="$emit('openDetail', option)"
            />
            
            <NcButton
              v-if="canAddArgumentFor"
              type="tertiary"
              class="quick-add-btn"
              @click="$emit('addOption', 'argument_for')"
            >
              <template #icon>
                <Plus :size="16" />
              </template>
              {{ t('agora', 'Add argument') }}
            </NcButton>
          </div>
        </div>

        <!-- Against Arguments -->
        <div class="paired-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.MessageMinus" :size="20" />
            <h5>{{ t('agora', 'Opposing') }}</h5>
            <span class="column-count">{{ argumentsAgainst.length }}</span>
          </div>
          
          <div class="column-content">
            <OptionCard
              v-for="option in argumentsAgainst"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              @click="$emit('openDetail', option)"
            />
            
            <NcButton
              v-if="canAddArgumentAgainst"
              type="tertiary"
              class="quick-add-btn"
              @click="$emit('addOption', 'argument_against')"
            >
              <template #icon>
                <Plus :size="16" />
              </template>
              {{ t('agora', 'Add argument') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Alternatives & Other -->
    <div v-if="hasOther" class="paired-section other-section">
      <div class="paired-grid">
        <!-- Alternatives -->
        <div v-if="alternatives.length > 0 || canAddAlternative" class="paired-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.SwapHorizontal" :size="20" />
            <h5>{{ t('agora', 'Alternatives') }}</h5>
            <span class="column-count">{{ alternatives.length }}</span>
          </div>
          
          <div class="column-content">
            <OptionCard
              v-for="option in alternatives"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              @click="$emit('openDetail', option)"
            />
            
            <NcButton
              v-if="canAddAlternative"
              type="tertiary"
              class="quick-add-btn"
              @click="$emit('addOption', 'alternative')"
            >
              <template #icon>
                <Plus :size="16" />
              </template>
              {{ t('agora', 'Add alternative') }}
            </NcButton>
          </div>
        </div>

        <!-- Messages / Comments -->
        <div v-if="messages.length > 0 || canAddMessage" class="paired-column">
          <div class="column-header">
            <component :is="InquiryOptionIcons.MessageText" :size="20" />
            <h5>{{ t('agora', 'Messages') }}</h5>
            <span class="column-count">{{ messages.length }}</span>
          </div>
          
          <div class="column-content">
            <OptionCard
              v-for="option in messages"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryId"
              :compact="true"
              @click="$emit('openDetail', option)"
            />
            
            <NcButton
              v-if="canAddMessage"
              type="tertiary"
              class="quick-add-btn"
              @click="$emit('addOption', 'message')"
            >
              <template #icon>
                <Plus :size="16" />
              </template>
              {{ t('agora', 'Add message') }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!hasPositions && !hasArguments && !hasOther" class="empty-state">
      <component :is="InquiryOptionIcons.Scale" :size="48" />
      <h4>{{ t('agora', 'No debate items yet') }}</h4>
      <p>{{ t('agora', 'Start the discussion by adding positions or arguments') }}</p>
      
      <!-- Quick add buttons -->
      <div class="quick-add-actions">
        <NcButton
          v-for="type in availableTypes"
          :key="type.option_type"
          type="secondary"
          @click="$emit('addOption', type.option_type)"
        >
          <template #icon>
            <component :is="getOptionTypeIcon(type.option_type)" :size="16" />
          </template>
          {{ type.label }}
        </NcButton>
      </div>
    </div>

    <!-- Layout style selector (if configured) -->
    <div v-if="hasMultipleLayoutStyles" class="layout-style-selector">
      <NcButton
        :type="layoutStyle === 'side-by-side' ? 'primary' : 'tertiary'"
        @click="layoutStyle = 'side-by-side'"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Columns" :size="16" />
        </template>
        {{ t('agora', 'Side by side') }}
      </NcButton>
      <NcButton
        :type="layoutStyle === 'vertical' ? 'primary' : 'tertiary'"
        @click="layoutStyle = 'vertical'"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Rows" :size="16" />
        </template>
        {{ t('agora', 'Vertical') }}
      </NcButton>
      <NcButton
        :type="layoutStyle === 'compact' ? 'primary' : 'tertiary'"
        @click="layoutStyle = 'compact'"
      >
        <template #icon>
          <component :is="InquiryOptionIcons.Collapse" :size="16" />
        </template>
        {{ t('agora', 'Compact') }}
      </NcButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Plus } from 'lucide-vue-next'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'
import { getOptionTypeIconComponent } from '../../../helpers/modules/InquiryOptionHelper'
import type { InquiryOptionType, Option , OptionFamily } from '../../Types/index.ts'

const props = defineProps<{
  options: Option[]
  family: OptionFamily
  inquiryId: number
  optionTypes: InquiryOptionType[]
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  'addOption': [optionType: string]
  'openDetail': [option: Option]
  'option-updated': [option: Option]
  'option-deleted': [optionId: number]
}>()

// Layout style
const layoutStyle = ref<'side-by-side' | 'vertical' | 'compact'>('side-by-side')

// Filter options by type
const positionsFor = computed(() => 
  props.options.filter(opt => opt.type === 'position_for')
)

const positionsAgainst = computed(() => 
  props.options.filter(opt => opt.type === 'position_against')
)

const argumentsFor = computed(() => 
  props.options.filter(opt => opt.type === 'argument_for')
)

const argumentsAgainst = computed(() => 
  props.options.filter(opt => opt.type === 'argument_against')
)

const alternatives = computed(() => 
  props.options.filter(opt => opt.type === 'alternative')
)

const messages = computed(() => 
  props.options.filter(opt => opt.type === 'message')
)

// Check if sections have content
const hasPositions = computed(() => 
  positionsFor.value.length > 0 || positionsAgainst.value.length > 0
)

const hasArguments = computed(() => 
  argumentsFor.value.length > 0 || argumentsAgainst.value.length > 0
)

const hasOther = computed(() => 
  alternatives.value.length > 0 || messages.value.length > 0
)

// Check if user can add items (based on permissions)
const canAddPositionFor = computed(() => true) // Replace with actual permission check
const canAddPositionAgainst = computed(() => true)
const canAddArgumentFor = computed(() => true)
const canAddArgumentAgainst = computed(() => true)
const canAddAlternative = computed(() => true)
const canAddMessage = computed(() => true)

// Available types from the family config
const availableTypes = computed(() => props.optionTypes.filter(type => 
    ['position_for', 'position_against', 'argument_for', 'argument_against', 'alternative', 'message'].includes(type.option_type)
  ))

// Check if multiple layout styles are available
const hasMultipleLayoutStyles = computed(() => props.family?.config?.layoutStyles?.length > 1 || false)

// Get option type icon
const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, [])
</script>

<style scoped lang="scss">
.paired-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &.layout-vertical {
    .paired-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  &.layout-compact {
    .paired-column {
      .column-content {
        gap: 4px;
      }
    }
  }

  .layout-style-selector {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  .paired-section {
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-main-text);
      padding-bottom: 12px;
      border-bottom: 2px solid var(--color-border);
    }
  }

  .paired-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .paired-column {
    background: var(--color-background-dark);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--color-border);

    .column-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: var(--color-background-darker);
      border-bottom: 1px solid var(--color-border);

      h5 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        flex: 1;
      }

      .column-count {
        background: var(--color-main-background);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .column-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 150px;
    }

    &.for-column {
      .column-header {
        color: var(--color-success);
      }
    }

    &.against-column {
      .column-header {
        color: var(--color-error);
      }
    }

    .quick-add-btn {
      width: 100%;
      margin-top: 8px;
      border: 2px dashed var(--color-border);
      
      &:hover {
        border-color: var(--color-primary-element);
        background: var(--color-primary-light);
      }
    }

    .empty-column {
      text-align: center;
      padding: 32px 16px;
      color: var(--color-text-lighter);
      font-style: italic;
      border: 2px dashed var(--color-border);
      border-radius: 12px;
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: var(--color-background-dark);
    border: 2px dashed var(--color-border);
    border-radius: 16px;

    svg {
      color: var(--color-text-lighter);
      margin-bottom: 20px;
    }

    h4 {
      margin: 0 0 8px 0;
      color: var(--color-main-text);
      font-size: 18px;
    }

    p {
      margin: 0 0 24px 0;
      color: var(--color-text-lighter);
      font-style: italic;
    }

    .quick-add-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}
</style>
