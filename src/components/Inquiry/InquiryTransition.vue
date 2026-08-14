<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { showError } from '@nextcloud/dialogs'
import { Inquiry } from '../../Types/index.ts'
import { useInquiryStore } from '../../stores/inquiry.ts'
import InquiryItem from './InquiryItem.vue'
import { useSessionStore } from '../../stores/session.ts'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import { useCommentsStore } from '../../stores/comments'
import { usePreferencesStore } from '../..//stores/preferences.ts'
import {
  getInquiryTypeData
} from '../../helpers/modules/InquiryHelper.ts'
import { InquiryGeneralIcons } from '../../utils/icons.ts'

const props = defineProps({
  isLoadedParent: {
    type: Boolean,
    required: true,
  },
})

const inquiryParent = ref({
  id: null,
  title: '',
  type: '',
  parentId: 0,
  created: null,
  lastInteraction: null,
  owner: '',
  inquiryGroups: [],
  participatedCount: 0,
  commentCount: 0,
  supportCount: 0,
  coverId: null,
  inquiryStatus: 'active',
})

const inquiryStore = useInquiryStore()
const commentsStore = useCommentsStore()
const preferencesStore = usePreferencesStore()
const sessionStore = useSessionStore()

const isLoadedLocal = ref(false)
const isMobile = ref(window.innerWidth < 768)

// Sub mode (table/list) for children display
const subMode = ref('table-view')

// Handle sub mode change for children
function handleSubModeChange(mode: string) {
  subMode.value = mode
  // Optionally save to user preferences
  if (preferencesStore.user) {
    preferencesStore.user.defaultViewInquiry = mode
  }
}

const isGridView = computed(() => subMode.value === 'table-view')

// Computed for inquiry types from app settings
const inquiryTypes = computed(() => sessionStore.appSettings.inquiryTypeTab || [])

// Group children by their inquiry type with official preference order
const childrenByType = computed(() => {
  const grouped: Record<string, Inquiry[]> = {}
  
  // Get official preference types first, then others
  const officialTypes = inquiryTypes.value.filter(type => type.official).map(type => type.label)
  const otherTypes = inquiryTypes.value.filter(type => !type.official).map(type => type.label)
  const orderedTypes = [...officialTypes, ...otherTypes]
  
  // Initialize all groups
  orderedTypes.forEach(typeLabel => {
    grouped[typeLabel] = []
  })
  
  // Group children by type
  inquiryStore.childs.forEach(child => {
    const typeLabel = getInquiryTypeData(
      child.type, 
      sessionStore.appSettings.inquiryTypeTab || [], 
      child.type
    ).label
    
    if (!grouped[typeLabel]) {
      grouped[typeLabel] = []
    }
    grouped[typeLabel].push(child)
  })
  
  // Filter out empty groups and maintain order
  const result: Record<string, Inquiry[]> = {}
  orderedTypes.forEach(typeLabel => {
    if (grouped[typeLabel] && grouped[typeLabel].length > 0) {
      result[typeLabel] = grouped[typeLabel]
    }
  })
  
  // Add any remaining types not in the ordered list
  Object.keys(grouped).forEach(typeLabel => {
    if (!result[typeLabel] && grouped[typeLabel].length > 0) {
      result[typeLabel] = grouped[typeLabel]
    }
  })
  
  return result
})

// Get ordered child types for display
const childTypes = computed(() => Object.keys(childrenByType.value))

const emit = defineEmits(['editParent', 'routeChild'])

const editParent = () => {
  emit('editParent')
}

const routeChild = (inquiryId: number) => {
  emit('routeChild', inquiryId)
}

onMounted(async () => {
  if (props.isLoadedParent) {
    try {
      isLoadedLocal.value = false
      await loadInquiryData()
    } catch (error) {
      showError('Failed to load inquiry:', error)
    } finally {
      inquiryParent.value.id = inquiryStore.id
      inquiryParent.value.parentId = inquiryStore.parentId
      inquiryParent.value.title = inquiryStore.title
      inquiryParent.value.type = inquiryStore.type
      inquiryParent.value.owner = inquiryStore.owner
      inquiryParent.value.moderationStatus = inquiryStore.moderationStatus
      inquiryParent.value.status = inquiryStore.status
      inquiryParent.value.configuration = inquiryStore.configuration
      inquiryParent.value.currentUserStatus = inquiryStore.currentUserStatus
      inquiryParent.value.commentCount = commentsStore.comments.length
      inquiryParent.value.supportCount = inquiryStore.status.countSupports
      inquiryParent.value.inquiryGroups = inquiryStore.inquiryGroups
      inquiryParent.value.coverId = inquiryStore.coverId
      inquiryParent.value.inquiryStatus = inquiryStore.inquiryStatus

      isLoadedLocal.value = true
    }
  }

  // Initialize subMode from app settings
  if (preferencesStore.user.defaultViewInquiry) {
    subMode.value = preferencesStore.user.defaultViewInquiry
  } else {
    subMode.value = 'table-view'
  }

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

// Transform owner data for display and ensure all required fields
function transformOwner(obj) {
  if (obj.owner && typeof obj.owner === 'string') {
    obj.owner = {
      id: obj.owner,
      displayName: obj.owner,
    }
  }
  
  // Ensure coverId and inquiryStatus are present
  if (!Object.prototype.hasOwnProperty.call(obj, 'coverId')) {
    obj.coverId = null
  }

  if (!Object.prototype.hasOwnProperty.call(obj, 'inquiryStatus')) {
    obj.inquiryStatus = 'active'
  } 
  return obj
}

const loadInquiryData = async () => {
  // Transform all children owners and ensure required fields
  inquiryStore.childs = inquiryStore.childs.map(transformOwner)
  return true
}
</script>

<template>
  <div v-if="!isLoadedLocal" class="loading-container">
    <div class="loading-spinner" />
    <p>{{ t('agora', 'Loading inquiry') }}</p>
  </div>

  <div v-else class="transition-container">
    <!-- Parent Inquiry - Takes full width and distinguished from children -->
    <Transition name="fade">
      <div v-if="isLoadedLocal" class="parent-section">
        <div class="section-header">
          <h2 class="section-title">
            {{ t('agora', 'Main inquiry') }}
          </h2>
        </div>
        <div class="parent-inquiry-wrapper">
          <InquiryItem
            :key="inquiryParent.id"
            :inquiry="inquiryParent"
            :no-link="false"
            :grid-view="false"
            :is-parent="true"
            @click="editParent"
          />
        </div>
      </div>
    </Transition>

    <!-- Children Header with View Mode Controls -->
    <div class="children-header">
      <h2 class="children-title">
        {{ t('agora', 'Child inquiries') }}
      </h2>
      
      <!-- View Mode Switcher for Children -->
      <div class="view-mode-controls">
        <div class="mode-switcher">
          <NcCheckboxRadioSwitch
            :button-variant="true"
            :model-value="subMode"
            value="table-view"
            name="children_view_mode"
            type="radio"
            button-variant-grouped="horizontal"
            class="mode-switch"
            @update:model-value="handleSubModeChange"
          >
            <template #icon>
              <component :is="InquiryGeneralIcons.Table" size="16" />
            </template>
            {{ !isMobile ? t('agora', 'Grid') : '' }}
          </NcCheckboxRadioSwitch>
          
          <NcCheckboxRadioSwitch
            :button-variant="true"
            :model-value="subMode"
            value="list-view"
            name="children_view_mode"
            type="radio"
            button-variant-grouped="horizontal"
            class="mode-switch"
            @update:model-value="handleSubModeChange"
          >
            <template #icon>
              <component :is="InquiryGeneralIcons.ViewListOutline" size="16" />
            </template>
            {{ !isMobile ? t('agora', 'List') : '' }}
          </NcCheckboxRadioSwitch>
        </div>
      </div>
    </div>

    <!-- Children Sections - Grouped by type with official preference first -->
    <TransitionGroup name="slide-fade" tag="div" class="children-sections">
      <div 
        v-for="type in childTypes" 
        :key="type" 
        class="child-section"
      >
        <div class="section-header">
          <h3 class="section-title">
            {{ type }}
          </h3>
          <span class="section-count">
            {{ childrenByType[type].length }}
          </span>
        </div>
        
        <!-- Children displayed in grid or list based on subMode -->
        <div
:class="[
          'children-container',
          isGridView ? 'children-grid' : 'children-list'
        ]">
          <InquiryItem
            v-for="child in childrenByType[type]"
            :key="child.id"
            :inquiry="child"
            :no-link="false"
            :grid-view="isGridView"
            :is-parent="false"
            @click="routeChild(child.id)"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.transition-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--color-background-darker);
    border-top: 4px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    color: var(--color-text-lighter);
    font-size: 16px;
  }
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Children Header with View Mode Controls */
.children-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0 1.5rem 0;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-border);

  .children-title {
    margin: 0;
    color: var(--color-main-text);
    font-weight: 600;
    font-size: 1.5rem;
  }

  .view-mode-controls {
    .mode-switcher {
      display: flex;
      align-items: center;
      gap: 0;
      background: var(--color-background-dark);
      border-radius: 10px;
      padding: 4px;
      border: 1px solid var(--color-border);
      
      .mode-switch {
        margin: 0;
        
        :deep(.checkbox-radio-switch__label) {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 13px;
          transition: all 0.2s ease;
          
          &:hover {
            background: var(--color-background-hover);
          }
        }
        
        :deep(input:checked + .checkbox-radio-switch__label) {
          background: var(--color-primary-element);
          color: var(--color-primary-text);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        :deep(.material-design-icon) {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-border);

  .section-title {
    margin: 0;
    color: var(--color-main-text);
    font-weight: 600;
    font-size: 1.3rem;
  }

  .section-count {
    background: var(--color-primary-element);
    color: var(--color-primary-text);
    border-radius: 12px;
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 600;
  }
}

/* Parent section - takes full width and is clearly distinguished */
.parent-section {
  margin-bottom: 3rem;
  
  .parent-inquiry-wrapper {
    background: var(--color-main-background);
    border-radius: 12px;
    padding: 24px;
    border: 2px solid var(--color-primary-element);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    /* Make parent stand out */
    :deep(.inquiry-item) {
      background: transparent;
      border: none;
      padding: 0;
      
      .inquiry-item__header {
        .inquiry-item__title {
          font-size: 1.4rem;
          color: var(--color-primary-element);
        }
      }
    }
  }
}

.children-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.child-section {
  .children-container {
    width: 100%;
  }

  .children-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 0;
  }

  .children-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

/* Responsive Design */
@media (max-width: 1400px) {
  .child-section .children-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .transition-container {
    padding: 16px;
  }
  
  .child-section .children-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .section-header .section-title {
    font-size: 1.2rem;
  }
  
  .children-header .children-title {
    font-size: 1.3rem;
  }
  
  .parent-section .parent-inquiry-wrapper {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .transition-container {
    padding: 12px;
  }
  
  .children-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin: 1.5rem 0 1rem 0;
    
    .view-mode-controls {
      align-self: flex-end;
    }
  }
  
  .child-section .children-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .parent-section {
    margin-bottom: 2rem;
    
    .parent-inquiry-wrapper {
      padding: 16px;
    }
  }
  
  .children-sections {
    gap: 2rem;
  }
  
  .section-header {
    margin-bottom: 1rem;
    
    .section-title {
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 480px) {
  .transition-container {
    padding: 8px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    
    .section-count {
      align-self: flex-end;
    }
  }
  
  .parent-section .parent-inquiry-wrapper {
    padding: 12px;
  }
  
  .children-header .view-mode-controls .mode-switcher {
    width: 100%;
    justify-content: center;
    
    .mode-switch :deep(.checkbox-radio-switch__label) {
      flex: 1;
      justify-content: center;
      padding: 8px 10px;
      font-size: 12px;
      
      .material-design-icon {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
