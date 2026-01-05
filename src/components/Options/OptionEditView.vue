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
          <div class="tab-icon" :style="{ color: family.color }">
            <component :is="getIcon(family.icon)" :size="18" />
          </div>
          <span class="tab-label">{{ family.name }}</span>
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
          <div class="family-icon" :style="{ backgroundColor: activeFamilyInfo.color + '20' }">
            <component :is="getIcon(activeFamilyInfo.icon)" :size="24" :style="{ color: activeFamilyInfo.color }" />
          </div>
          <div class="family-details">
            <h3 class="family-title">{{ activeFamilyInfo.name }}</h3>
            <p class="family-description">{{ activeFamilyInfo.description }}</p>
          </div>
        </div>

        <!-- Action Buttons for this family -->
        <div v-if="canAddOptions" class="family-actions">
          <NcButton
            v-for="optionType in allowedOptionTypesForFamily"
            :key="optionType.key"
            type="primary"
            :class="['add-option-btn', `type-${optionType.key}`]"
            @click="openAddOptionModal(optionType)"
          >
            <template #icon>
              <component :is="getIcon(optionType.icon)" :size="18" />
            </template>
            {{ t('agora', optionType.name) }}
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
        <!-- Debate Family - Two Column Layout -->
        <div v-if="activeFamily === 'deliberative'" class="debate-layout">
          <div class="debate-column">
            <div class="column-header" :style="{ borderColor: '#4a86e8' }">
              <h4 class="column-title">
                <component :is="InquiryGeneralIcons.ThumbUp" :size="16" />
                {{ t('agora', 'Arguments For') }}
              </h4>
              <span class="column-count">{{ argumentsForCount }}</span>
            </div>
            <div class="column-content">
              <OptionCard
                v-for="option in argumentsFor"
                :key="option.id"
                :option="option"
                :inquiry-id="inquiryStore.id"
                @click="openOptionDetail(option)"
                @support="handleSupport(option)"
                @comment="handleComment(option)"
              />
              <div v-if="argumentsFor.length === 0" class="empty-column">
                <component :is="InquiryGeneralIcons.ThumbUp" :size="32" />
                <p>{{ t('agora', 'No supporting arguments yet') }}</p>
              </div>
            </div>
          </div>

          <div class="debate-column">
            <div class="column-header" :style="{ borderColor: '#cc0000' }">
              <h4 class="column-title">
                <component :is="InquiryGeneralIcons.ThumbDown" :size="16" />
                {{ t('agora', 'Arguments Against') }}
              </h4>
              <span class="column-count">{{ argumentsAgainstCount }}</span>
            </div>
            <div class="column-content">
              <OptionCard
                v-for="option in argumentsAgainst"
                :key="option.id"
                :option="option"
                :inquiry-id="inquiryStore.id"
                @click="openOptionDetail(option)"
                @support="handleSupport(option)"
                @comment="handleComment(option)"
              />
              <div v-if="argumentsAgainst.length === 0" class="empty-column">
                <component :is="InquiryGeneralIcons.ThumbDown" :size="32" />
                <p>{{ t('agora', 'No opposing arguments yet') }}</p>
              </div>
            </div>
          </div>

          <div class="proposals-section">
            <div class="section-header">
              <h4 class="section-title">
                <component :is="InquiryGeneralIcons.Lightbulb" :size="16" />
                {{ t('agora', 'Proposals') }}
              </h4>
              <span class="section-count">{{ proposalsCount }}</span>
            </div>
            <div class="proposals-grid">
              <OptionCard
                v-for="option in proposals"
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

        <!-- Consultative Family - Q&A Layout -->
        <div v-else-if="activeFamily === 'consultative'" class="consultative-layout">
          <div class="questions-list">
            <OptionCard
              v-for="option in questions"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              :show-answers="true"
              @click="openOptionDetail(option)"
              @answer="handleAnswer(option)"
              @comment="handleComment(option)"
            />
            <div v-if="questions.length === 0" class="empty-state">
              <component :is="InquiryGeneralIcons.Question" :size="48" />
              <h4>{{ t('agora', 'No questions yet') }}</h4>
              <p>{{ t('agora', 'Be the first to ask a question') }}</p>
            </div>
          </div>
        </div>

        <!-- Creative Family - Ideas Grid -->
        <div v-else-if="activeFamily === 'creative'" class="creative-layout">
          <div class="ideas-grid">
            <OptionCard
              v-for="option in ideas"
              :key="option.id"
              :option="option"
              :inquiry-id="inquiryStore.id"
              :creative="true"
              @click="openOptionDetail(option)"
              @support="handleSupport(option)"
              @refine="handleRefine(option)"
              @comment="handleComment(option)"
            />
          </div>
          <div v-if="ideas.length === 0" class="empty-state">
            <component :is="InquiryGeneralIcons.Lightbulb" :size="48" />
            <h4>{{ t('agora', 'No ideas yet') }}</h4>
            <p>{{ t('agora', 'Share your creative ideas') }}</p>
          </div>
        </div>

        <!-- Hierarchical Family - Tree View -->
        <div v-else-if="activeFamily === 'administrative'" class="hierarchical-layout">
          <div class="tree-view">
            <OptionTreeNode
              v-for="option in parentOptions"
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
        </div>

        <!-- Default Grid Layout -->
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
            <component :is="getIcon(activeFamilyInfo.icon)" :size="48" />
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
      :option-type="selectedOptionType"
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

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

import { useInquiryStore } from '../../stores/inquiry'
import { useOptionsStore } from '../../stores/options'
import { useSessionStore } from '../../stores/session'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { OptionTypeDefinition } from '../../stores/options.ts'

import OptionCard from './OptionCard.vue'
import OptionTreeNode from './OptionTreeNode.vue'
import AddOptionModal from './AddOptionModal.vue'
import OptionDetailDrawer from './OptionDetailDrawer.vue'

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
const selectedOptionType = ref<OptionTypeDefinition | null>(null)
const selectedParentId = ref<number | null>(null)
const selectedOptionId = ref<number | null>(null)

// Computed
const hasVisibleFamilies = computed(() => {
  return visibleFamilies.value.length > 0
})

const visibleFamilies = computed(() => {
  // Get families that are allowed for this inquiry type
  const inquiryType = inquiryStore.type
  const families = optionsStore.getFamilies
  
  // Filter families based on inquiry type configuration
  // (This would come from app settings in a real implementation)
  return families.filter(family => {
    // Check if family is enabled for this inquiry type
    const allowedFamilies = sessionStore.appSettings?.inquiryTypeRights?.[inquiryType]?.allowedOptionFamilies
    return !allowedFamilies || allowedFamilies.includes(family.key)
  })
})

const activeFamilyInfo = computed(() => {
  const family = visibleFamilies.value.find(f => f.key === activeFamily.value)
  if (family) {
    return {
      name: family.name,
      description: family.description,
      color: family.color,
      icon: family.icon
    }
  }
  return {
    name: '',
    description: '',
    color: '#999999',
    icon: 'icon-file'
  }
})

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

const canAddOptions = computed(() => {
  return inquiryStore.permissions.addOptions
})

const allowedOptionTypesForFamily = computed(() => {
  if (!activeFamily.value) return []
  
  const family = visibleFamilies.value.find(f => f.key === activeFamily.value)
  return family?.types || []
})

// Debate specific computed
const argumentsFor = computed(() => {
  return optionsStore.getOptionsByType('argument_for')
})

const argumentsAgainst = computed(() => {
  return optionsStore.getOptionsByType('argument_against')
})

const proposals = computed(() => {
  return optionsStore.getOptionsByType('proposal')
})

const questions = computed(() => {
  return optionsStore.getOptionsByType('question')
})

const ideas = computed(() => {
  return optionsStore.getOptionsByType('idea')
})

const familyOptions = computed(() => {
  return optionsStore.getOptionsByFamily(activeFamily.value)
})

const parentOptions = computed(() => {
  return optionsStore.parentOptions.filter(opt => 
    optionsStore.getOptionsByFamily(activeFamily.value).includes(opt)
  )
})

// Counts
const argumentsForCount = computed(() => argumentsFor.value.length)
const argumentsAgainstCount = computed(() => argumentsAgainst.value.length)
const proposalsCount = computed(() => proposals.value.length)

const hasMoreOptions = computed(() => {
  return optionsStore.meta.loadedOptions < optionsStore.meta.totalOptions
})

// Methods
const getIcon = (iconName: string) => {
  // Map icon names to actual components
  const iconMap: Record<string, any> = {
    'icon-discussion': InquiryGeneralIcons.Discussion,
    'icon-question': InquiryGeneralIcons.Question,
    'icon-lightbulb': InquiryGeneralIcons.Lightbulb,
    'icon-settings': InquiryGeneralIcons.Settings,
    'icon-code': InquiryGeneralIcons.Code,
    'icon-category-other': InquiryGeneralIcons.CategoryOther,
    'icon-like': InquiryGeneralIcons.ThumbUp,
    'icon-dislike': InquiryGeneralIcons.ThumbDown,
    'icon-checkmark': InquiryGeneralIcons.Checkmark,
    // Add more mappings as needed
  }
  return iconMap[iconName] || InquiryGeneralIcons.File
}

const setActiveFamily = (familyKey: string) => {
  activeFamily.value = familyKey
  // Load options for this family if not already loaded
  if (optionsStore.getOptionsByFamily(familyKey).length === 0) {
    optionsStore.loadByType(familyKey, inquiryStore.id)
  }
}

const hasNewOptions = (familyKey: string) => {
  // Check if there are new options since last visit
  // This would require tracking user's last visit time
  return false
}

const hasUnreadComments = (familyKey: string) => {
  // Check for unread comments in this family
  // This would require tracking read status
  return false
}

const getChildOptions = (parentId: number) => {
  return optionsStore.childOptions(parentId).filter(opt => 
    optionsStore.getOptionsByFamily(activeFamily.value).includes(opt)
  )
}

const openAddOptionModal = (optionType: OptionTypeDefinition, parentId?: number) => {
  selectedOptionType.value = optionType
  selectedParentId.value = parentId || null
  showAddOptionModal.value = true
}

const openAddChildModal = (parentOption: any) => {
  const allowedChildTypes = parentOption.allowedChildTypes || []
  if (allowedChildTypes.length > 0) {
    // Open a modal to select child type
    // For simplicity, just use the first allowed type
    const childType = sessionStore.appSettings?.optionTypesTab?.[allowedChildTypes[0]]
    if (childType) {
      openAddOptionModal(childType, parentOption.id)
    }
  }
}

const closeAddOptionModal = () => {
  showAddOptionModal.value = false
  selectedOptionType.value = null
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
  // Could also focus on comment section
}

const handleAnswer = (option: any) => {
  // Handle answer to question
  console.log('Answer question:', option.id)
}

const handleRefine = (option: any) => {
  // Handle refinement of idea
  console.log('Refine idea:', option.id)
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
})

// Watch for inquiry changes
watch(() => inquiryStore.id, (newId) => {
  if (newId) {
    optionsStore.load(newId)
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

        &.type-argument_for {
          background: linear-gradient(135deg, #4a86e8, #6aa84f);
          border-color: #4a86e8;
        }

        &.type-argument_against {
          background: linear-gradient(135deg, #cc0000, #e69138);
          border-color: #cc0000;
        }

        &.type-proposal {
          background: linear-gradient(135deg, #6aa84f, #4a86e8);
          border-color: #6aa84f;
        }

        &.type-question {
          background: linear-gradient(135deg, #3c8dbc, #4a86e8);
          border-color: #3c8dbc;
        }

        &.type-idea {
          background: linear-gradient(135deg, #f1c232, #e69138);
          border-color: #f1c232;
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;

      .debate-column {
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          margin-bottom: 20px;
          border-bottom: 3px solid;

          .column-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            color: var(--color-main-text);
          }

          .column-count {
            background: var(--color-background-darker);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        .column-content {
          display: flex;
          flex-direction: column;
          gap: 16px;

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

      .proposals-section {
        grid-column: span 2;
        margin-top: 24px;

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;

          .section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            color: var(--color-main-text);
          }

          .section-count {
            background: var(--color-background-darker);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        .proposals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
      }
    }

    .consultative-layout,
    .creative-layout,
    .default-layout {
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

    .consultative-layout {
      .questions-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }

    .creative-layout {
      .ideas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
    }

    .hierarchical-layout {
      .tree-view {
        padding: 20px;
        background: var(--color-background-dark);
        border: 2px solid var(--color-border);
        border-radius: 16px;
      }
    }

    .default-layout {
      .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
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
      grid-template-columns: 1fr;
      
      .proposals-section {
        grid-column: span 1;
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
      .proposals-grid {
        grid-template-columns: 1fr !important;
      }
    }

    .creative-layout {
      .ideas-grid {
        grid-template-columns: 1fr !important;
      }
    }

    .default-layout {
      .options-grid {
        grid-template-columns: 1fr !important;
      }
    }
  }
}
</style>
