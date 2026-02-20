<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="inquiry-options-view">
    <!-- Family Tabs -->
    <div v-if="hasVisibleFamilies" class="family-tabs-container">
      <div class="family-tabs">
        {{ familiesWithOptions.value }}
        <button
          v-for="family in familiesWithOptions"
          :key="family.key"
          :class="[
            'family-tab',
            { 'active': activeFamily === family.key }
          ]"
          @click="setActiveFamily(family.key)"
        >
          <div class="tab-icon" :style="{ color: getFamilyColorHelper(family.key) }">
            <component :is="getFamilyIconHelper(family.key)" :size="18" />
          </div>
          <span class="tab-label">{{ family.label }}</span>
          <span v-if="familyCounts[family.key]" class="tab-count">
            {{ familyCounts[family.key] }}
          </span>
        </button>
      </div>
    </div>

    <!-- Family Content -->
    <div v-if="activeFamilyData" class="family-content">
      <!-- Family Header with Action Buttons -->
      <div class="family-header">
        <p class="family-text">{{ activeFamilyData.text }}</p>

        <!-- Action Bar for creating options -->
        <div v-if="activeFamilyData.optionTypes.length > 0" class="family-actions-bar">
          <NcButton
            v-for="optionType in activeFamilyData.optionTypes"
            :key="optionType.option_type"
            type="primary"
            :class="['create-option-btn', `type-${optionType.option_type}`]"
                @click.stop="openAddOptionModal(optionType.optionType)"
          >
            <template #icon>
              <!-- Direct icon lookup from InquiryOptionIcons -->
              <component :is="InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File" :size="18" />
            </template>
            + {{ optionType.label || optionType.optionType }}
          </NcButton>
        </div>
      </div>

      <!-- Family-specific layout -->
      <div class="family-layout">
        <!-- DEBATE Family Layout -->
        <div v-if="activeFamily === 'debate'" class="debate-layout">
          <!-- Positions Section -->
          <div class="debate-section positions-section">
            <h4 class="section-title">{{ t('agora', 'Positions') }}</h4>
            <div class="positions-grid">
              <!-- For Positions -->
              <div class="positions-column">
                <h5 class="column-title">
                  <component :is="InquiryOptionIcons.ThumbUp" :size="16" />
                  {{ t('agora', 'Position – For') }}
                </h5>
                <div class="options-list">
                  <OptionCard
                    v-for="option in positionsFor"
                    :key="option.id"
                    :option="option"
                    :inquiry-id="inquiryStore.id"
                    @click="openOptionDetail(option)"
                  />
                  <div v-if="positionsFor.length === 0" class="empty-column">
                    <p>{{ t('agora', 'No positions for yet') }}</p>
                  </div>
                </div>
              </div>

              <!-- Against Positions -->
              <div class="positions-column">
                <h5 class="column-title">
                  <component :is="InquiryOptionIcons.ThumbDown" :size="16" />
                  {{ t('agora', 'Position – Against') }}
                </h5>
                <div class="options-list">
                  <OptionCard
                    v-for="option in positionsAgainst"
                    :key="option.id"
                    :option="option"
                    :inquiry-id="inquiryStore.id"
                    @click="openOptionDetail(option)"
                  />
                  <div v-if="positionsAgainst.length === 0" class="empty-column">
                    <p>{{ t('agora', 'No positions against yet') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Arguments Section -->
          <div class="debate-section arguments-section">
            <h4 class="section-title">{{ t('agora', 'Arguments') }}</h4>
            <div class="arguments-grid">
              <div class="arguments-column">
                <h5 class="column-title">
                  <component :is="InquiryOptionIcons.MessagePlus" :size="16" />
                  {{ t('agora', 'For') }}
                </h5>
                <OptionCard
                  v-for="option in argumentsFor"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :compact="true"
                  @click="openOptionDetail(option)"
                />
              </div>
              <div class="arguments-column">
                <h5 class="column-title">
                  <component :is="InquiryOptionIcons.MessageMinus" :size="16" />
                  {{ t('agora', 'Against') }}
                </h5>
                <OptionCard
                  v-for="option in argumentsAgainst"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :compact="true"
                  @click="openOptionDetail(option)"
                />
              </div>
            </div>
          </div>

          <!-- Alternatives & Messages -->
          <div class="debate-section other-section">
            <div class="other-grid">
              <div class="other-column">
                <h5 class="column-title">
                  <component :is="InquiryOptionIcons.SwapHorizontal" :size="16" />
                  {{ t('agora', 'Alternatives') }}
                </h5>
                <OptionCard
                  v-for="option in alternatives"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :compact="true"
                  @click="openOptionDetail(option)"
                />
              </div>
              <div class="other-column">
                <h5 class="column-title">
                  <component :is="InquiryOptionIcons.MessageText" :size="16" />
                  {{ t('agora', 'Messages') }}
                </h5>
                <OptionCard
                  v-for="option in messages"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :compact="true"
                  @click="openOptionDetail(option)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- STRUCTURE Family Layout -->
        <div v-else-if="activeFamily === 'structure'" class="structure-layout">
          <OptionTreeNode
            :inquiry-id="inquiryStore.id"
            :use-title="true"
            :use-description="true"
          />
        </div>

        <!-- CONSENSUS Family Layout -->
        <div v-else-if="activeFamily === 'consensus'" class="consensus-layout">
          <!-- Blocking Objections -->
          <div v-if="objections.length > 0" class="consensus-section">
            <h4 class="section-title blocking">
              <component :is="InquiryOptionIcons.AlertCircle" :size="16" />
              {{ t('agora', 'Blocking Objections') }} ({{ objections.length }})
            </h4>
            <div class="options-list">
              <OptionCard
                v-for="option in objections"
                :key="option.id"
                :option="option"
                :inquiry-id="inquiryStore.id"
                :highlight="true"
                @click="openOptionDetail(option)"
              />
            </div>
          </div>

          <!-- Exceptions -->
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
                :inquiry-id="inquiryStore.id"
                @click="openOptionDetail(option)"
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
                :inquiry-id="inquiryStore.id"
                @click="openOptionDetail(option)"
              />
            </div>
          </div>
        </div>

        <!-- DECISION Family Layout -->
        <div v-else-if="activeFamily === 'decision'" class="decision-layout">
          <!-- Official Results -->
          <div class="decision-section">
            <h4 class="section-title">
              <component :is="InquiryOptionIcons.CheckCircle" :size="16" />
              {{ t('agora', 'Official Results') }}
            </h4>
            <div class="options-list">
              <OptionCard
                v-for="option in officialResults"
                :key="option.id"deliberative
                :option="option"
                :inquiry-id="inquiryStore.id"
                :official="true"
                @click="openOptionDetail(option)"
              />
            </div>
          </div>

          <!-- Poll Options -->
          <div v-if="pollOptions.length > 0" class="decision-section">
            <h4 class="section-title">
              <component :is="InquiryOptionIcons.BarChart2" :size="16" />
              {{ t('agora', 'Poll Options') }}
            </h4>
            <div class="options-list">
              <OptionCard
                v-for="option in pollOptions"
                :key="option.id"
                :option="option"
                :inquiry-id="inquiryStore.id"
                :show-poll="true"
                @click="openOptionDetail(option)"
              />
            </div>
          </div>
        </div>

        <!-- DEFAULT Layout for other families -->
        <div v-else class="default-layout">
          <div class="options-grid">
            <OptionCard
              v-for="option in activeFamilyOptions"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              @click="openOptionDetail(option)"
            />
          </div>
          <div v-if="activeFamilyOptions.length === 0" class="empty-state">
            <component :is="getFamilyIconHelper(activeFamily)" :size="48" />
            <h4>{{ t('agora', 'No options yet') }}</h4>
            <p>{{ t('agora', 'Be the first to contribute') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State when no families -->
    <div v-else-if="!hasVisibleFamilies && inquiryStore.type" class="no-families">
      <component :is="InquiryOptionIcons.Options" :size="64" />
      <h3>{{ t('agora', 'No option families available') }}</h3>
      <p>{{ t('agora', 'This inquiry type doesn\'t support any option families') }}</p>
    </div>

    <!-- Modals -->
    <AddOptionModal
      v-if="showAddOptionModal"
      :inquiry-id="inquiryStore.id"
      :option-type="selectedOptionTypeKey"
      :parent-id="selectedParentId"
      @close="closeAddOptionModal"
      @created="handleOptionCreated"
    />
    <OptionDetailModal
      v-if="showOptionDetail"
      :option-id="selectedOptionId"
      :inquiry-id="inquiryStore.id"
      @close="closeOptionDetail"
      @deleted="handleOptionDeleted"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryGeneralIcons, InquiryOptionIcons } from '../../utils/icons.ts'

// Import types
import type { InquiryType, OptionType, OptionFamily } from '../../Types/index.ts'

import OptionCard from './OptionCard.vue'
import AddOptionModal from './AddOptionModal.vue'
import OptionDetailModal from './OptionDetailModal.vue'
import OptionTreeNode from './OptionTreeNode.vue'
import {
  getFamiliesWithOptionTypes,
  getFamilyIconComponent,
  getFamilyColor as importedGetFamilyColor,
  findOptionType,
  getOptionTypeLabel,
  getOptionTypeIconComponent,
  getOptionTypeColor,
  getAllowedResponses,
  getAvailableResponseTypes,
  getOptionTypeFields,
  hasSupportFeature,
  allowsComments
} from '../../helpers/modules/InquiryOptionHelper'

// Props
const props = defineProps<{
  inquiryId?: number
}>()

// Stores
const inquiryStore = useInquiryStore()
const optionsStore = useOptionsStore()
const sessionStore = useSessionStore()

// State
const activeFamily = ref<string>('')
const showAddOptionModal = ref(false)
const showOptionDetail = ref(false)
const selectedOptionTypeKey = ref<string | null>(null)
const selectedParentId = ref<number | null>(null)
const selectedOptionId = ref<number | null>(null)

// Helper methods
const getFamilyIconHelper = (familyKey: string) => getFamilyIconComponent(familyKey)
const getFamilyColorHelper = (familyKey: string) => importedGetFamilyColor(familyKey)

// Computed
const allInquiryTypes = computed<InquiryType[]>(() =>
  sessionStore.appSettings?.inquiryTypeTab || []
)

const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

const allFamilies = computed<OptionFamily[]>(() =>
  sessionStore.appSettings?.optionFamilyTab || []
)

// Get families with their option types
const familiesWithOptions = computed(() => {
  const inquiryTypeKey = inquiryStore.type
  console.log(" INNNNNNNNNNNNNNNN ",inquiryTypeKey)
  console.log(" INNNNNNNNNNNNNNNN ",allInquiryTypes.value)
  console.log(" INNNNNNNNNNNNNNNN ",allOptionTypes.value)
  if (!inquiryTypeKey || !allInquiryTypes.value?.length || !allOptionTypes.value?.length) {
    return []
  }

  const families = getFamiliesWithOptionTypes(
    inquiryTypeKey,
    allInquiryTypes.value,
    allOptionTypes.value
  )
  console.log(" TOOOOOOOOOOOOOOOOOOOOOOOOOO ",families)

  let familiesFinal= families.map(family => ({
    ...family,
    name: t('agora', family.name),
    label: t('agora', family.label),
    description: t('agora', family.description)
  }))
  console.log(" TOOOOOOOOOOOOOOOOOOOOOOOOOO ",familiesFinal)
  return familiesFinal
})

const hasVisibleFamilies = computed(() => familiesWithOptions.value.length > 0)

const activeFamilyData = computed(() => {
  console.log(" ACTIVE FAMILY ",activeFamily.value)
  if (!activeFamily.value) return null
  return familiesWithOptions.value.find(f => f.key === activeFamily.value)
})

// Count options by family
const familyCounts = computed(() => {
  const counts: Record<string, number> = {}
  familiesWithOptions.value.forEach(family => {
    const familyOptionTypeKeys = family.optionTypes.map(opt => opt.option_type)
    counts[family.key] = optionsStore.options.filter(option =>
      familyOptionTypeKeys.includes(option.type)
    ).length
  })
  return counts
})

// Get options for active family
const activeFamilyOptions = computed(() => {
  console.log(" HERE WE DEBUG ", activeFamilyData.value)
  if (!activeFamilyData.value) return []

  const familyOptionTypeKeys = activeFamilyData.value.optionTypes.map(opt => opt.optionType)
  console.log(" HERE WE DEBUG ", familyOptionTypeKeys)

  return optionsStore.options.filter(option =>
    familyOptionTypeKeys.includes(option.type)
  )
})

// Family-specific computed properties
const positionsFor = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'position_for'))
const positionsAgainst = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'position_against'))
const argumentsFor = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'argument_for'))
const argumentsAgainst = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'argument_against'))
const alternatives = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'alternative'))
const messages = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'message'))
const chapters = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'chapter'))
const objections = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'objection'))
const exceptions = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'exception'))
const consultationQuestions = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'consultation_question'))
const officialResults = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'official_result'))
const pollOptions = computed(() => activeFamilyOptions.value.filter(opt => opt.type === 'poll_option'))

// Helper methods
const getChildOptions = (parentId: number, type?: string) => {
  const children = optionsStore.options.filter(opt => opt.parentId === parentId)
  if (type) {
    return children.filter(opt => opt.type === type)
  }
  return children
}

const getOptionTypeLabel = (optionTypeKey: string): string => {
  const optionType = allOptionTypes.value.find(opt =>
    opt.option_type === optionTypeKey || opt.optionType === optionTypeKey
  )
  return optionType?.label || optionTypeKey
}


const getOptionTypeIcon = (optionTypeKey: string) => {
  const optionType = allOptionTypes.value.find(opt =>
    opt.option_type === optionTypeKey || opt.optionType === optionTypeKey
  )

  if (optionType?.icon) {
    return InquiryOptionIcons[optionType.icon] || InquiryOptionIcons.File
  }

  return InquiryOptionIcons.File
}

const setActiveFamily = (familyKey: string) => {
  activeFamily.value = familyKey
}

const openAddOptionModal = (optionTypeKey: string, parentId?: number) => {
  if (!optionTypeKey) {
    console.error('Cannot open add option modal: optionTypeKey is undefined')
    return
  }
  selectedOptionTypeKey.value = optionTypeKey
  selectedParentId.value = parentId || null
  showAddOptionModal.value = true
}

const closeAddOptionModal = () => {
  showAddOptionModal.value = false

}

const openOptionDetail = (option: any) => {
  selectedOptionId.value = option.id
  showOptionDetail.value = true
}

const closeOptionDetail = () => {
  showOptionDetail.value = false
  selectedOptionId.value = null
}

const handleOptionCreated = (newOption: any) => {
  optionsStore.options.push(newOption)
  closeAddOptionModal()
}

const handleOptionDeleted = (deletedOptionId: number) => {
  const index = optionsStore.options.findIndex(opt => opt.id === deletedOptionId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
  }
  closeOptionDetail()
}

// Initialize
onMounted(() => {
  console.log("OptionEditView mounted", { 
    inquiryId: inquiryStore.id,
    inquiryType: inquiryStore.type 
  })
  
  if (inquiryStore.id) {
    optionsStore.load(inquiryStore.id)
  }

  if (familiesWithOptions.value.length > 0) {
    activeFamily.value = familiesWithOptions.value[0].key
  }
})

// Watch for inquiry changes
watch(() => inquiryStore.id, (newId) => {
  if (newId) {
    optionsStore.load(newId)
  }
})

watch(() => inquiryStore.type, (newType) => {
  console.log("Inquiry type changed to:", newType)
  activeFamily.value = ''
  if (familiesWithOptions.value.length > 0) {
    activeFamily.value = familiesWithOptions.value[0].key
  }
})
</script>

<style scoped lang="scss">
.inquiry-options-view {
  margin-top: 32px;
  padding: 24px;
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.family-tabs-container {
  margin-bottom: 32px;

  .family-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--color-border);

    .family-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: var(--color-background-dark);
      border: 2px solid transparent;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-light);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: var(--color-background-darker);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &.active {
        background: var(--color-primary-light);
        border-color: var(--color-primary-element);
        color: var(--color-primary-element);
        
        .tab-icon {
          background: var(--color-primary-element);
          color: white !important;
        }
      }

      .tab-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background-darker);
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .tab-label {
        white-space: nowrap;
      }

      .tab-count {
        background: var(--color-background-darker);
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
}

.family-content {
  .family-header {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--color-border);

    .family-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: var(--color-main-text);
    }

    .family-text {
      font-size: 16px;
      color: var(--color-text-lighter);
      margin: 0 0 20px 0;
      max-width: 600px;
      line-height: 1.5;
    }

    .family-actions-bar {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 16px;

      .create-option-btn {
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  .family-layout {
    .debate-layout,
    .structure-layout,
    .consensus-layout,
    .decision-layout,
    .default-layout {
      .debate-section,
      .consensus-section,
      .decision-section {
        margin-bottom: 32px;

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: var(--color-main-text);
          display: flex;
          align-items: center;
          gap: 8px;

          &.blocking {
            color: var(--color-error);
          }

          &.non-blocking {
            color: var(--color-warning);
          }
        }

        .positions-grid,
        .arguments-grid,
        .other-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        }

        .positions-column,
        .arguments-column,
        .other-column {
          .column-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: var(--color-text-light);
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .options-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .empty-column {
            text-align: center;
            padding: 40px 20px;
            background: var(--color-background-dark);
            border: 2px dashed var(--color-border);
            border-radius: 16px;
            color: var(--color-text-lighter);
            font-style: italic;
          }
        }
      }

      .tree-view {
        padding: 20px;
        background: var(--color-background-dark);
        border: 2px solid var(--color-border);
        border-radius: 16px;

        .tree-node {
          margin-bottom: 12px;

          &.child {
            margin-left: 24px;
            margin-top: 8px;
          }

          &.grandchild {
            margin-left: 48px;
            margin-top: 8px;
          }

          .node-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: var(--color-main-background);
            border-radius: 8px;
            border: 1px solid var(--color-border);

            .node-label {
              flex: 1;
              font-weight: 500;
            }
          }
        }
      }

      .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
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
          margin: 0;
          color: var(--color-text-lighter);
          font-style: italic;
        }
      }
    }
  }
}

.no-families {
  text-align: center;
  padding: 60px 20px;

  svg {
    color: var(--color-text-lighter);
    margin-bottom: 20px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: var(--color-main-text);
    font-size: 20px;
  }

  p {
    margin: 0;
    color: var(--color-text-lighter);
    font-style: italic;
  }
}

@media (max-width: 768px) {
  .inquiry-options-view {
    padding: 16px;
  }

  .family-tabs {
    overflow-x: auto;
    padding-bottom: 12px;

    .family-tab {
      white-space: nowrap;
      flex-shrink: 0;
    }
  }

  .family-actions-bar {
    flex-direction: column;
    
    .create-option-btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
