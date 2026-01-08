<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="inquiry-options-view">
    <!-- Family Tabs -->
    <div v-if="hasVisibleFamilies" class="family-tabs-container">
      <div class="family-tabs-header">
        <h3 class="section-subtitle">
          {{ t('agora', 'OPTIONS BY FAMILY') }}
        </h3>
        <p class="section-description">
          {{ t('agora', 'Explore different types of contributions') }}
        </p>
      </div>

      <div class="family-tabs">
        <button
          v-for="family in visibleFamilies"
          :key="family.key"
          :class="[
            'family-tab',
            { 'active': activeFamily === family.key },
            { 'has-new': hasNewOptions(family.key) }
          ]"
          @click="setActiveFamily(family.key)"
        >
          <div class="tab-icon" :style="{ color: getFamilyColor(family.key) }">
            <component :is="getFamilyIcon(family.key)" :size="18" />
          </div>
          <span class="tab-label">{{ getFamilyLabel(family.key) }}</span>
          <span v-if="familyCounts[family.key]" class="tab-count">
            {{ familyCounts[family.key] }}
          </span>
          <span v-if="hasUnreadComments(family.key)" class="tab-badge">
            <component :is="InquiryGeneralIcons.Comment" :size="12" />
          </span>
        </button>
      </div>
    </div>

    <!-- Family Content -->
    <div v-if="activeFamily" class="family-content">
      <!-- Family Header -->
      <div class="family-header">
        <div class="family-info">
          <div class="family-icon" :style="{ backgroundColor: getFamilyColor(activeFamily) + '20' }">
            <component :is="getFamilyIcon(activeFamily)" :size="24" :style="{ color: getFamilyColor(activeFamily) }" />
          </div>
          <div class="family-details">
            <h3 class="family-title">{{ getFamilyLabel(activeFamily) }}</h3>
            <p class="family-description">{{ getFamilyDescription(activeFamily) }}</p>
          </div>
        </div>

        <!-- Action Buttons for this family -->
        <div v-if="canAddOptions && allowedRootOptions.length > 0" class="family-actions">
          <NcButton
            v-for="optionTypeKey in allowedRootOptions"
            :key="optionTypeKey"
            type="primary"
            :class="['add-option-btn', `type-${optionTypeKey}`]"
            @click="openAddOptionModal(optionTypeKey)"
          >
            <template #icon>
              <component :is="getOptionTypeIcon(optionTypeKey)" :size="18" />
            </template>
            {{ getOptionTypeLabel(optionTypeKey) }}
          </NcButton>
        </div>
      </div>

      <!-- Family Statistics -->
      <div v-if="familyStats" class="family-stats">
        <div class="stat-item">
          <div class="stat-icon">
            <component :is="InquiryGeneralIcons.Users" :size="18" />
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ familyStats.totalOptions }}</span>
            <span class="stat-label">{{ t('agora', 'Options') }}</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <component :is="InquiryGeneralIcons.Support" :size="18" />
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ familyStats.totalSupports }}</span>
            <span class="stat-label">{{ t('agora', 'Supports') }}</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <component :is="InquiryGeneralIcons.Comment" :size="18" />
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ familyStats.totalComments }}</span>
            <span class="stat-label">{{ t('agora', 'Comments') }}</span>
          </div>
        </div>
      </div>

      <!-- Options Display -->
      <div class="options-container">
        <!-- Debate Family Layout -->
        <div v-if="activeFamily === 'debate'" class="debate-layout">
          <!-- Positions Section -->
          <div class="positions-section">
            <div class="positions-header">
              <h4 class="section-title">
                {{ t('agora', 'Positions') }}
              </h4>
              <div class="positions-tabs">
                <button
                  class="position-tab"
                  :class="{ active: debateView === 'for' }"
                  @click="debateView = 'for'"
                >
                  <component :is="InquiryGeneralIcons.ThumbUp" :size="16" />
                  {{ t('agora', 'For') }}
                  <span class="tab-count">{{ positionsFor.length }}</span>
                </button>
                <button
                  class="position-tab"
                  :class="{ active: debateView === 'against' }"
                  @click="debateView = 'against'"
                >
                  <component :is="InquiryGeneralIcons.ThumbDown" :size="16" />
                  {{ t('agora', 'Against') }}
                  <span class="tab-count">{{ positionsAgainst.length }}</span>
                </button>
              </div>
            </div>

            <div class="positions-content">
              <!-- For Positions -->
              <div v-if="debateView === 'for'" class="position-column">
                <OptionCard
                  v-for="option in positionsFor"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :show-responses="true"
                  @click="openOptionDetail(option)"
                  @support="handleSupport(option)"
                  @comment="handleComment(option)"
                />
                <div v-if="positionsFor.length === 0" class="empty-column">
                  <component :is="InquiryGeneralIcons.ThumbUp" :size="32" />
                  <p>{{ t('agora', 'No positions for yet') }}</p>
                </div>
              </div>

              <!-- Against Positions -->
              <div v-if="debateView === 'against'" class="position-column">
                <OptionCard
                  v-for="option in positionsAgainst"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :show-responses="true"
                  @click="openOptionDetail(option)"
                  @support="handleSupport(option)"
                  @comment="handleComment(option)"
                />
                <div v-if="positionsAgainst.length === 0" class="empty-column">
                  <component :is="InquiryGeneralIcons.ThumbDown" :size="32" />
                  <p>{{ t('agora', 'No positions against yet') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Arguments Section -->
          <div class="arguments-section">
            <div class="arguments-header">
              <h4 class="section-title">
                {{ t('agora', 'Arguments') }}
              </h4>
              <div class="arguments-tabs">
                <button
                  class="argument-tab"
                  :class="{ active: argumentView === 'for' }"
                  @click="argumentView = 'for'"
                >
                  <component :is="InquiryGeneralIcons.MessagePlus" :size="16" />
                  {{ t('agora', 'For') }}
                  <span class="tab-count">{{ argumentsFor.length }}</span>
                </button>
                <button
                  class="argument-tab"
                  :class="{ active: argumentView === 'against' }"
                  @click="argumentView = 'against'"
                >
                  <component :is="InquiryGeneralIcons.MessageMinus" :size="16" />
                  {{ t('agora', 'Against') }}
                  <span class="tab-count">{{ argumentsAgainst.length }}</span>
                </button>
              </div>
            </div>

            <div class="arguments-content">
              <!-- For Arguments -->
              <div v-if="argumentView === 'for'" class="argument-column">
                <OptionCard
                  v-for="option in argumentsFor"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :compact="true"
                  @click="openOptionDetail(option)"
                  @support="handleSupport(option)"
                  @comment="handleComment(option)"
                />
                <div v-if="argumentsFor.length === 0" class="empty-column">
                  <component :is="InquiryGeneralIcons.MessagePlus" :size="32" />
                  <p>{{ t('agora', 'No supporting arguments yet') }}</p>
                </div>
              </div>

              <!-- Against Arguments -->
              <div v-if="argumentView === 'against'" class="argument-column">
                <OptionCard
                  v-for="option in argumentsAgainst"
                  :key="option.id"
                  :option="option"
                  :inquiry-id="inquiryStore.id"
                  :compact="true"
                  @click="openOptionDetail(option)"
                  @support="handleSupport(option)"
                  @comment="handleComment(option)"
                />
                <div v-if="argumentsAgainst.length === 0" class="empty-column">
                  <component :is="InquiryGeneralIcons.MessageMinus" :size="32" />
                  <p>{{ t('agora', 'No opposing arguments yet') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Alternatives and Messages -->
          <div class="other-options-section">
            <div class="options-grid">
              <div class="options-column">
                <div class="column-header">
                  <h5 class="column-title">
                    <component :is="InquiryGeneralIcons.SwapHorizontal" :size="14" />
                    {{ t('agora', 'Alternatives') }}
                  </h5>
                  <span class="column-count">{{ alternatives.length }}</span>
                </div>
                <div class="column-content">
                  <OptionCard
                    v-for="option in alternatives"
                    :key="option.id"
                    :option="option"
                    :inquiry-id="inquiryStore.id"
                    :compact="true"
                    @click="openOptionDetail(option)"
                    @support="handleSupport(option)"
                    @comment="handleComment(option)"
                  />
                </div>
              </div>

              <div class="options-column">
                <div class="column-header">
                  <h5 class="column-title">
                    <component :is="InquiryGeneralIcons.MessageText" :size="14" />
                    {{ t('agora', 'Messages') }}
                  </h5>
                  <span class="column-count">{{ messages.length }}</span>
                </div>
                <div class="column-content">
                  <OptionCard
                    v-for="option in messages"
                    :key="option.id"
                    :option="option"
                    :inquiry-id="inquiryStore.id"
                    :compact="true"
                    @click="openOptionDetail(option)"
                    @support="handleSupport(option)"
                    @comment="handleComment(option)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Structure Family Layout -->
        <div v-else-if="activeFamily === 'structure'" class="hierarchical-layout">
          <div class="tree-view">
            <OptionTreeNode
              v-for="option in chapters"
              :key="option.id"
              :option="option"
              :depth="0"
              :children="getChildOptions(option.id)"
              @select="openOptionDetail"
              @add-child="openAddChildModal"
              @support="handleSupport"
              @comment="handleComment"
            />
          </div>
          <div v-if="chapters.length === 0" class="empty-state">
            <component :is="InquiryGeneralIcons.BookOpenVariant" :size="48" />
            <h4>{{ t('agora', 'No chapters yet') }}</h4>
            <p>{{ t('agora', 'Start by adding the first chapter') }}</p>
          </div>
        </div>

        <!-- Consensus Family Layout -->
        <div v-else-if="activeFamily === 'consensus'" class="consensus-layout">
          <div class="consultation-questions">
            <OptionCard
              v-for="option in consultationQuestions"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              :show-poll-options="true"
              @click="openOptionDetail(option)"
              @answer="handleAnswer(option)"
              @comment="handleComment(option)"
            />
            <div v-if="consultationQuestions.length === 0" class="empty-state">
              <component :is="InquiryGeneralIcons.HelpCircle" :size="48" />
              <h4>{{ t('agora', 'No consultation questions yet') }}</h4>
              <p>{{ t('agora', 'Be the first to ask a question') }}</p>
            </div>
          </div>

          <div v-if="objections.length > 0" class="objections-section">
            <h4 class="section-title">
              <component :is="InquiryGeneralIcons.AlertCircle" :size="16" />
              {{ t('agora', 'Formal Objections') }}
              <span class="section-count">{{ objections.length }}</span>
            </h4>
            <div class="objections-list">
              <OptionCard
                v-for="option in objections"
                :key="option.id"
                :option="option"
                :inquiry-id="inquiryStore.id"
                :highlight="option.miscFields?.blocking"
                @click="openOptionDetail(option)"
                @support="handleSupport(option)"
                @comment="handleComment(option)"
              />
            </div>
          </div>
        </div>

        <!-- Proposal Family Layout -->
        <div v-else-if="activeFamily === 'proposal'" class="proposal-layout">
          <div class="proposals-grid">
            <OptionCard
              v-for="option in proposals"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              @click="openOptionDetail(option)"
              @support="handleSupport(option)"
              @comment="handleComment(option)"
            />
          </div>
          <div v-if="proposals.length === 0" class="empty-state">
            <component :is="InquiryGeneralIcons.Lightbulb" :size="48" />
            <h4>{{ t('agora', 'No proposals yet') }}</h4>
            <p>{{ t('agora', 'Share your proposal') }}</p>
          </div>
        </div>

        <!-- Decision Family Layout -->
        <div v-else-if="activeFamily === 'decision'" class="decision-layout">
          <div class="official-results">
            <OptionCard
              v-for="option in officialResults"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              :official="true"
              @click="openOptionDetail(option)"
            />
            <div v-if="officialResults.length === 0" class="empty-state">
              <component :is="InquiryGeneralIcons.CheckCircle" :size="48" />
              <h4>{{ t('agora', 'No official results yet') }}</h4>
              <p>{{ t('agora', 'Results will appear here when published') }}</p>
            </div>
          </div>
        </div>

        <!-- Default Grid Layout for other families -->
        <div v-else class="default-layout">
          <div class="options-grid">
            <OptionCard
              v-for="option in familyOptions"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              @click="openOptionDetail(option)"
              @support="handleSupport(option)"
              @comment="handleComment(option)"
            />
          </div>
          <div v-if="familyOptions.length === 0" class="empty-state">
            <component :is="getFamilyIcon(activeFamily)" :size="48" />
            <h4>{{ t('agora', 'No options yet') }}</h4>
            <p>{{ t('agora', 'Be the first to contribute') }}</p>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMoreOptions" class="load-more">
        <NcButton type="secondary" @click="loadMoreOptions">
          <template #icon>
            <component :is="InquiryGeneralIcons.LoadMore" :size="18" />
          </template>
          {{ t('agora', 'Load more options') }}
        </NcButton>
      </div>
    </div>

    <!-- Empty State when no families -->
    <div v-else class="no-families">
      <component :is="InquiryGeneralIcons.Options" :size="64" />
      <h3>{{ t('agora', 'No option families available') }}</h3>
      <p>{{ t('agora', 'This inquiry type doesn\'t support any option families') }}</p>
    </div>

    <!-- Add Option Modal -->
    <AddOptionModal
      v-if="showAddOptionModal"
      :inquiry-id="inquiryStore.id"
      :option-type="selectedOptionTypeKey"
      :parent-id="selectedParentId"
      @close="closeAddOptionModal"
      @created="handleOptionCreated"
    />

    <!-- Option Detail Drawer -->
    <OptionDetailDrawer
      v-if="showOptionDetail"
      :option-id="selectedOptionId"
      :inquiry-id="inquiryStore.id"
      @close="closeOptionDetail"
      @updated="handleOptionUpdated"
      @deleted="handleOptionDeleted"
    />
  </div>
</template>
<!-- Updated script section - fixing the option type access -->
<!-- Updated script section using InquiryHelper.ts -->
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { getInquiryItemData, getInquiryTypeData, getAvailableResponseTypes } from '../../helpers/modules/InquiryHelper'

import OptionCard from './OptionCard.vue'
import OptionTreeNode from './OptionTreeNode.vue'
import AddOptionModal from './AddOptionModal.vue'
import OptionDetailDrawer from './OptionDetailDrawer.vue'

// Import types
import type { InquiryType, OptionType } from '../../Types/index.ts'

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
const debateView = ref<'for' | 'against'>('for')
const argumentView = ref<'for' | 'against'>('for')

// Computed
const allInquiryTypes = computed<InquiryType[]>(() => 
  // Get all inquiry types from app settings
   sessionStore.appSettings?.inquiryTypeTab || []
)

const allOptionTypes = computed<OptionType[]>(() => 
  // Option types might be stored in a different location
  // Check different possible locations
   sessionStore.appSettings?.inquiryOptionTypeTab || 
         []
)

const hasVisibleFamilies = computed(() => visibleFamilies.value.length > 0)

const visibleFamilies = computed(() => {
  // Get allowed option types for this inquiry type
  const allowedOptionTypes = allowedRootOptions.value
  
  // Get unique families from allowed option types
  const families = new Set<string>()
  allowedOptionTypes.forEach(optionTypeKey => {
    const optionConfig = getOptionTypeConfig(optionTypeKey)
    if (optionConfig) {
      // Get the family from the option type config
      const family = optionConfig.family || optionConfig.inquiry_type_family
      if (family) {
        families.add(family)
      }
    }
  })
  
  return Array.from(families).map(familyKey => {
    const familyData = getFamilyData(familyKey)
    return {
      key: familyKey,
      name: familyData.label,
      description: familyData.description,
      icon: familyData.icon,
      color: getFamilyColor(familyKey)
    }
  })
})

const allowedRootOptions = computed<string[]>(() => {
  const inquiryType = inquiryStore.type
  // Check if allowed_option_type exists in inquiryTypeTab
  const inquiryTypeConfig = allInquiryTypes.value.find(t => t.inquiry_type === inquiryType)
  
  if (inquiryTypeConfig?.allowed_option_type) {
    // Parse allowed_option_type if it's a string (JSON)
    if (typeof inquiryTypeConfig.allowed_option_type === 'string') {
      try {
        return JSON.parse(inquiryTypeConfig.allowed_option_type)
      } catch {
        return []
      }
    } else if (Array.isArray(inquiryTypeConfig.allowed_option_type)) {
      return inquiryTypeConfig.allowed_option_type
    }
  }
  
  return []
})

const activeFamilyInfo = computed(() => getFamilyData(activeFamily.value))

const familyCounts = computed(() => {
  const counts: Record<string, number> = {}
  visibleFamilies.value.forEach(family => {
    counts[family.key] = optionsStore.getOptionsByFamily(family.key).length
  })
  return counts
})

const familyStats = computed(() => {
  if (!activeFamily.value) return null
  
  const familyOptions = optionsStore.getOptionsByFamily(activeFamily.value)
  return {
    totalOptions: familyOptions.length,
    totalSupports: familyOptions.reduce((total, option) => 
      total + (option.currentUserStatus?.countSupports || 0), 0),
    totalComments: familyOptions.reduce((total, option) => 
      total + (option.currentUserStatus?.countComments || 0), 0)
  }
})

const canAddOptions = computed(() => inquiryStore.permissions.addOptions)

const allowedOptionTypesForFamily = computed(() => {
  if (!activeFamily.value) return []
  
  // Filter allowed root options by active family
  return allowedRootOptions.value.filter(optionTypeKey => {
    const optionConfig = getOptionTypeConfig(optionTypeKey)
    if (!optionConfig) return false
    
    const family = optionConfig.family || optionConfig.inquiry_type_family
    return family === activeFamily.value
  })
})

// Family-specific computed properties
const positionsFor = computed(() => optionsStore.getOptionsByType('position_for'))

const positionsAgainst = computed(() => optionsStore.getOptionsByType('position_against'))

const argumentsFor = computed(() => optionsStore.getOptionsByType('argument_for'))

const argumentsAgainst = computed(() => optionsStore.getOptionsByType('argument_against'))

const alternatives = computed(() => optionsStore.getOptionsByType('alternative'))

const messages = computed(() => optionsStore.getOptionsByType('message'))

const officialSummaries = computed(() => optionsStore.getOptionsByType('official_summary'))

const chapters = computed(() => optionsStore.getOptionsByType('chapter'))

const articles = computed(() => optionsStore.getOptionsByType('article'))

const amendments = computed(() => optionsStore.getOptionsByType('amendment'))

const consultationQuestions = computed(() => optionsStore.getOptionsByType('consultation_question'))

const pollOptions = computed(() => optionsStore.getOptionsByType('poll_option'))

const objections = computed(() => optionsStore.getOptionsByType('objection'))

const exceptions = computed(() => optionsStore.getOptionsByType('exception'))

const officialResults = computed(() => optionsStore.getOptionsByType('official_result'))

const proposals = computed(() => optionsStore.getOptionsByType('proposal'))

const familyOptions = computed(() => optionsStore.getOptionsByFamily(activeFamily.value))

const hasMoreOptions = computed(() => optionsStore.meta.loadedOptions < optionsStore.meta.totalOptions)

// Helper methods
const getFamilyData = (familyKey: string) => {
  const familyLabels: Record<string, string> = {
    'debate': t('agora', 'Debate'),
    'structure': t('agora', 'Structure'),
    'consensus': t('agora', 'Consensus'),
    'decision': t('agora', 'Decision'),
    'proposal': t('agora', 'Proposal')
  }
  
  const familyDescriptions: Record<string, string> = {
    'debate': t('agora', 'Debate positions, arguments, and alternatives'),
    'structure': t('agora', 'Structured documents with chapters and articles'),
    'consensus': t('agora', 'Consultation questions and consensus building'),
    'decision': t('agora', 'Official decisions and results'),
    'proposal': t('agora', 'Initial proposals and suggestions')
  }
  
  const familyIcons: Record<string, any> = {
    'debate': InquiryGeneralIcons.Discussion,
    'structure': InquiryGeneralIcons.Settings,
    'consensus': InquiryGeneralIcons.ThumbUp,
    'decision': InquiryGeneralIcons.Checkmark,
    'proposal': InquiryGeneralIcons.Lightbulb
  }
  
  return {
    name: familyLabels[familyKey] || familyKey,
    label: familyLabels[familyKey] || familyKey,
    description: familyDescriptions[familyKey] || '',
    icon: familyIcons[familyKey] || InquiryGeneralIcons.File
  }
}

const getFamilyColor = (familyKey: string): string => {
  const familyColors: Record<string, string> = {
    'debate': '#4a86e8',
    'structure': '#6aa84f',
    'consensus': '#3c8dbc',
    'decision': '#f1c232',
    'proposal': '#cc0000'
  }
  return familyColors[familyKey] || '#999999'
}

const getOptionTypeConfig = (optionTypeKey: string): OptionType | null => 
  // Find the option type configuration
   allOptionTypes.value.find((opt: OptionType) => 
    opt.option_type === optionTypeKey || 
    opt.inquiry_type === optionTypeKey
  ) || null


const getOptionTypeLabel = (optionTypeKey: string): string => {
  const config = getOptionTypeConfig(optionTypeKey)
  if (config) {
    return t('agora', config.label || config.name || optionTypeKey)
  }
  return optionTypeKey
}

const getOptionTypeIcon = (optionTypeKey: string) => {
  const config = getOptionTypeConfig(optionTypeKey)
  if (!config) return InquiryGeneralIcons.File
  
  const iconName = config.icon || ''
  const iconMap: Record<string, any> = {
    'ThumbUp': InquiryGeneralIcons.ThumbUp,
    'ThumbDown': InquiryGeneralIcons.ThumbDown,
    'MessagePlus': InquiryGeneralIcons.MessagePlus,
    'MessageMinus': InquiryGeneralIcons.MessageMinus,
    'SwapHorizontal': InquiryGeneralIcons.SwapHorizontal,
    'MessageText': InquiryGeneralIcons.MessageText,
    'CheckCircle': InquiryGeneralIcons.Checkmark,
    'BookOpenVariant': InquiryGeneralIcons.Book,
    'FileDocument': InquiryGeneralIcons.File,
    'FileDocumentEdit': InquiryGeneralIcons.Edit,
    'HelpCircle': InquiryGeneralIcons.Question,
    'BarChart2': InquiryGeneralIcons.Chart,
    'AlertCircle': InquiryGeneralIcons.Alert,
    'AlertOutline': InquiryGeneralIcons.Warning,
    'Lightbulb': InquiryGeneralIcons.Lightbulb,
  }
  return iconMap[iconName] || InquiryGeneralIcons.File
}

const setActiveFamily = (familyKey: string) => {
  activeFamily.value = familyKey
  // Reset views for debate
  if (familyKey === 'debate') {
    debateView.value = 'for'
    argumentView.value = 'for'
  }
  // Load options for this family if not already loaded
  if (optionsStore.getOptionsByFamily(familyKey).length === 0) {
    optionsStore.loadByType(familyKey, inquiryStore.id)
  }
}

const hasNewOptions = (familyKey: string) => 
  // Check if there are new options since last visit
   false


const hasUnreadComments = (familyKey: string) => 
  // Check for unread comments in this family
   false


const getChildOptions = (parentId: number) => optionsStore.childOptions(parentId).filter(opt => 
    optionsStore.getOptionsByFamily(activeFamily.value).includes(opt)
  )

const openAddOptionModal = (optionTypeKey: string, parentId?: number) => {
  selectedOptionTypeKey.value = optionTypeKey
  selectedParentId.value = parentId || null
  showAddOptionModal.value = true
}

const openAddChildModal = (parentOption: any) => {
  const config = getOptionTypeConfig(parentOption.type)
  if (config && config.allowed_response && config.allowed_response.length > 0) {
    // For now, just use the first allowed response type
    const childTypeKey = config.allowed_response[0]
    openAddOptionModal(childTypeKey, parentOption.id)
  }
}

const closeAddOptionModal = () => {
  showAddOptionModal.value = false
  selectedOptionTypeKey.value = null
  selectedParentId.value = null
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
  // Add the new option to the store
  optionsStore.options.push(newOption)
  optionsStore.organizeByFamily()
  closeAddOptionModal()
}

const handleOptionUpdated = (updatedOption: any) => {
  // Update the option in the store
  const index = optionsStore.options.findIndex(opt => opt.id === updatedOption.id)
  if (index >= 0) {
    optionsStore.options[index] = updatedOption
    optionsStore.organizeByFamily()
  }
}

const handleOptionDeleted = (deletedOptionId: number) => {
  // Remove the option from the store
  const index = optionsStore.options.findIndex(opt => opt.id === deletedOptionId)
  if (index >= 0) {
    optionsStore.options.splice(index, 1)
    optionsStore.organizeByFamily()
  }
  closeOptionDetail()
}

const handleSupport = (option: any) => {
  // Handle support toggle
  console.log('Toggle support for option:', option.id)
}

const handleComment = (option: any) => {
  // Open comment modal or drawer
  openOptionDetail(option)
}

const handleAnswer = (option: any) => {
  // Handle answer to question
  console.log('Answer question:', option.id)
}

const loadMoreOptions = () => {
  optionsStore.loadMore()
}

// Initialize
onMounted(() => {
  // Load options for the inquiry
  optionsStore.load(inquiryStore.id)
  
  // Set default active family
  if (visibleFamilies.value.length > 0) {
    activeFamily.value = visibleFamilies.value[0].key
  }
  
  // Debug log to understand the data structure
  console.log('Data structure check:', {
    inquiryType: inquiryStore.type,
    allInquiryTypes: allInquiryTypes.value,
    allOptionTypes: allOptionTypes.value,
    allowedRootOptions: allowedRootOptions.value,
    visibleFamilies: visibleFamilies.value
  })
})

// Watch for inquiry changes
watch(() => inquiryStore.id, (newId) => {
  if (newId) {
    optionsStore.load(newId)
  }
})

// Watch for inquiry type changes
watch(() => inquiryStore.type, (newType) => {
  // Reset active family when inquiry type changes
  activeFamily.value = ''
  if (visibleFamilies.value.length > 0) {
    activeFamily.value = visibleFamilies.value[0].key
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

  .family-tabs-header {
    margin-bottom: 20px;

    .section-subtitle {
      font-size: 14px;
      color: var(--color-text-lighter);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .section-description {
      font-size: 14px;
      color: var(--color-text-lighter);
      margin: 0;
      font-style: italic;
    }
  }

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

      &.has-new::after {
        content: '';
        position: absolute;
        top: 8px;
        right: 8px;
        width: 8px;
        height: 8px;
        background: var(--color-success);
        border-radius: 50%;
        animation: pulse 2s infinite;
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

      .tab-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: var(--color-error);
        color: white;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }
    }
  }
}

.family-content {
  .family-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--color-border);

    .family-info {
      display: flex;
      gap: 16px;
      align-items: flex-start;

      .family-icon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .family-details {
        .family-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--color-main-text);
        }

        .family-description {
          font-size: 14px;
          color: var(--color-text-lighter);
          margin: 0;
          max-width: 600px;
          line-height: 1.5;
        }
      }
    }

    .family-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      .add-option-btn {
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;

        &.type-position_for {
          background: linear-gradient(135deg, #4a86e8, #6aa84f);
          border-color: #4a86e8;
        }

        &.type-position_against {
          background: linear-gradient(135deg, #cc0000, #e69138);
          border-color: #cc0000;
        }

        &.type-argument_for {
          background: linear-gradient(135deg, #4a86e8, #3c8dbc);
          border-color: #4a86e8;
        }

        &.type-argument_against {
          background: linear-gradient(135deg, #cc0000, #e69138);
          border-color: #cc0000;
        }

        &.type-proposal {
          background: linear-gradient(135deg, #f1c232, #e69138);
          border-color: #f1c232;
        }

        &.type-consultation_question {
          background: linear-gradient(135deg, #3c8dbc, #4a86e8);
          border-color: #3c8dbc;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  .family-stats {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
    padding: 20px;
    background: var(--color-background-dark);
    border: 2px solid var(--color-border);
    border-radius: 16px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      background: var(--color-main-background);
      border-radius: 12px;
      flex: 1;

      .stat-icon {
        width: 40px;
        height: 40px;
        background: var(--color-background-darker);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
          color: var(--color-primary-element);
        }
      }

      .stat-content {
        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: var(--color-main-text);
          line-height: 1;
        }

        .stat-label {
          display: block;
          font-size: 12px;
          color: var(--color-text-lighter);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
      }
    }
  }

  .options-container {
    .debate-layout {
      display: flex;
      flex-direction: column;
      gap: 32px;

      .positions-section,
      .arguments-section {
        .positions-header,
        .arguments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--color-border);

          .section-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: var(--color-main-text);
          }

          .positions-tabs,
          .arguments-tabs {
            display: flex;
            gap: 8px;

            .position-tab,
            .argument-tab {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 8px 16px;
              background: var(--color-background-dark);
              border: 2px solid transparent;
              border-radius: 12px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;

              &:hover {
                background: var(--color-background-darker);
              }

              &.active {
                background: var(--color-primary-light);
                border-color: var(--color-primary-element);
                color: var(--color-primary-element);
              }

              .tab-count {
                background: var(--color-background-darker);
                padding: 2px 8px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 700;
              }
            }
          }
        }

        .positions-content,
        .arguments-content {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .position-column,
          .argument-column {
            .empty-column {
              text-align: center;
              padding: 40px 20px;
              background: var(--color-background-dark);
              border: 2px dashed var(--color-border);
              border-radius: 16px;

              svg {
                color: var(--color-text-lighter);
                margin-bottom: 16px;
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

      .other-options-section {
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;

          .options-column {
            .column-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 16px;
              padding-bottom: 8px;
              border-bottom: 2px solid var(--color-border);

              .column-title {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: var(--color-main-text);
              }

              .column-count {
                background: var(--color-background-dark);
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 700;
              }
            }

            .column-content {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
          }
        }
      }
    }

    .consensus-layout {
      .consultation-questions {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 32px;
      }

      .objections-section {
        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--color-main-text);

          .section-count {
            background: var(--color-background-dark);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        .objections-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }
    }

    .proposal-layout,
    .decision-layout,
    .default-layout {
      .proposals-grid,
      .official-results,
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

    .hierarchical-layout {
      .tree-view {
        padding: 20px;
        background: var(--color-background-dark);
        border: 2px solid var(--color-border);
        border-radius: 16px;
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

  .load-more {
    text-align: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 2px solid var(--color-border);
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

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .family-content {
    .family-header {
      flex-direction: column;
      gap: 20px;

      .family-actions {
        width: 100%;
        justify-content: center;
      }
    }

    .debate-layout {
      .other-options-section {
        .options-grid {
          grid-template-columns: 1fr;
        }
      }
    }
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

  .family-stats {
    flex-direction: column;
  }

  .options-container {
    .debate-layout {
      .positions-header,
      .arguments-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start !important;
      }

      .positions-tabs,
      .arguments-tabs {
        width: 100%;
        justify-content: space-between;
      }
    }

    .proposal-layout,
    .decision-layout,
    .default-layout {
      .proposals-grid,
      .official-results,
      .options-grid {
        grid-template-columns: 1fr !important;
      }
    }
  }
}
</style>
