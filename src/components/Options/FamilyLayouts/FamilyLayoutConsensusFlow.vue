<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="consensus-flow-layout">
    <!-- Blocking Objections -->
    <div v-if="objections.length > 0" class="consensus-section">
      <h4 class="section-title blocking">
        <component :is="InquiryOptionIcons.AlertCircle" :size="16" />
        {{ t('agora', 'Blocking Objections') }} ({{ objections.length }})
        <span v-if="quorumNeeded" class="quorum-badge">
          {{ t('agora', 'Quorum: {count}/{total}', { count: objectionsQuorum, total: quorumNeeded }) }}
        </span>
      </h4>
      <div class="options-list">
        <OptionCard
          v-for="option in objections"
          :key="option.id"
          :option="option"
          :inquiry-id="inquiryId"
          :highlight="true"
          :show-quorum="true"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>

    <!-- Exceptions (non-blocking) -->
    <div v-if="exceptions.length > 0" class="consensus-section">
      <h4 class="section-title non-blocking">
        <component :is="InquiryOptionIcons.AlertOutline" :size="16" />
        {{ t('agora', 'Exceptions') }} ({{ exceptions.length }})
      </h4>
      <div class="options-list">
        <OptionCard
          v-for="option in exceptions"
          :key="option.id"
          :option="option"
          :inquiry-id="inquiryId"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>

    <!-- Consent Given -->
    <div v-if="consents.length > 0" class="consensus-section">
      <h4 class="section-title consent">
        <component :is="InquiryOptionIcons.CheckCircle" :size="16" />
        {{ t('agora', 'Consent Given') }} ({{ consents.length }})
      </h4>
      <div class="options-list">
        <OptionCard
          v-for="option in consents"
          :key="option.id"
          :option="option"
          :inquiry-id="inquiryId"
          :show-support="true"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>

    <!-- Consultation Questions -->
    <div v-if="consultationQuestions.length > 0" class="consensus-section">
      <h4 class="section-title">
        <component :is="InquiryOptionIcons.HelpCircle" :size="16" />
        {{ t('agora', 'Consultation Questions') }} ({{ consultationQuestions.length }})
      </h4>
      <div class="options-list">
        <OptionCard
          v-for="option in consultationQuestions"
          :key="option.id"
          :option="option"
          :inquiry-id="inquiryId"
          @click="$emit('openDetail', option)"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="allOptions.length === 0" class="empty-state">
      <component :is="InquiryOptionIcons.AlertCircle" :size="48" />
      <h4>{{ t('agora', 'No consensus items yet') }}</h4>
      <p>{{ t('agora', 'Add objections, exceptions or consultation questions') }}</p>
      
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryOptionIcons } from '../../../utils/icons.ts'
import OptionCard from '../OptionCard.vue'
import { getOptionTypeIconComponent } from '../../../helpers/modules/InquiryOptionHelper'
import type { InquiryOptionType, Option, OptionFamily } from '../../Types/index.ts'

const props = defineProps<{
  options: Option[]
  family: OptionFamily
  inquiryId: number
  optionTypes: InquiryOptionType[]
  quorumNeeded?: number
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  'addOption': [optionType: string]
  'openDetail': [option: Option]
  'option-updated': [option: Option]
  'option-deleted': [optionId: number]
}>()

// Filter options by type
const objections = computed(() => 
  props.options.filter(opt => opt.type === 'objection' || opt.type === 'blocking_objection')
)

const exceptions = computed(() => 
  props.options.filter(opt => opt.type === 'exception' || opt.type === 'non_blocking_objection')
)

const consents = computed(() => 
  props.options.filter(opt => opt.type === 'consent' || opt.type === 'agreement')
)

const consultationQuestions = computed(() => 
  props.options.filter(opt => opt.type === 'consultation_question' || opt.type === 'question')
)

const allOptions = computed(() => props.options)

// Calculate quorum for objections
const objectionsQuorum = computed(() => 
  // This would come from a real calculation based on support/votes
   objections.value.reduce((sum, opt) => sum + (opt.supportCount || 0), 0)
)

// Available types from the family config
const availableTypes = computed(() => props.optionTypes.filter(type => 
    ['objection', 'exception', 'consultation_question'].includes(type.option_type)
  ))

const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, [])
</script>

<style scoped lang="scss">
.consensus-flow-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .consensus-section {
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      
      &.blocking {
        color: var(--color-error);
      }
      
      &.non-blocking {
        color: var(--color-warning);
      }
      
      &.consent {
        color: var(--color-success);
      }

      .quorum-badge {
        margin-left: auto;
        font-size: 14px;
        font-weight: normal;
        background: var(--color-background-dark);
        color: var(--color-text-light);
        padding: 4px 12px;
        border-radius: 20px;
      }
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
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
